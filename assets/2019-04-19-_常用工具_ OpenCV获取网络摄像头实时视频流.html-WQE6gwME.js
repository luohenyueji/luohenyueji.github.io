import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o,c as i,a as n,b as t,d as r,e as c}from"./app-MsA2k2kn.js";const d={},s=c(`<h1 id="常用工具-opencv获取网络摄像头实时视频流" tabindex="-1"><a class="header-anchor" href="#常用工具-opencv获取网络摄像头实时视频流" aria-hidden="true">#</a> [常用工具] OpenCV获取网络摄像头实时视频流</h1><h1 id="所需要硬件及软件环境" tabindex="-1"><a class="header-anchor" href="#所需要硬件及软件环境" aria-hidden="true">#</a> 所需要硬件及软件环境：</h1><p>python 3/OpenCV3.4 or C++11/OpenCV3.4</p><h2 id="_1-rtsp协议" tabindex="-1"><a class="header-anchor" href="#_1-rtsp协议" aria-hidden="true">#</a> <strong>1 RTSP协议</strong></h2><p>RTSP (Real Time Streaming Protocol)，是一种语法和操作类似 HTTP 协议，专门用于音频和视频的应用层协议。 和 HTTP类似，RTSP 也使用 URL地址。同时我们也要了解到摄像机传输数据用的是码流，高清网络摄像机产品编码器都会产生两个编码格式，称为主码流和子码流。这就叫双码流技术。目的是用于解决监控录像的本地存储和网络传输的图像的质量问题。双码流能实现本地和远程传输的两种不同的带宽码流需求，本地传输可以用主码流，能获得更清晰的存储录像，远程传输就因为带宽限制的原因，而使用子码流来获得流畅的图像和录像。通过RTSP协议传输不同的码流，但是各大摄像头厂家的RTSP协议地址不大一样。通常你只要知道摄像头IP地址，用户名密码就行了。</p><p>海康的RTSP协议地址如下：</p><pre><code>rtsp://[username]:[password]@[ip]:[port]/[codec]/[channel]/[subtype]/av_stream
1) username  用户名，常用 admin
2) password  密码，常用 12345
3) ip        摄像头IP，如 192.0.0.64
4) port      端口号，默认为 554，可以不写
5) codec     视频编码模式，有 h264、MPEG-4、mpeg4 等，可以不写
6) channel   通道号，起始为1，例如通道1，则为 ch1
7) subtype   码流类型，主码流为 main，辅码流为 sub
</code></pre><p>大华的RTSP协议地址如下：</p><pre><code>rtsp://[username]:[password]@[ip]:[port]/cam/realmonitor?[channel=1]&amp;[subtype=1] 
1) username、password、ip、port 同上
2) channel  通道号，起始为1，例如通道2，则为 channel=2
3) subtype  码流类型，主码流为0（即 subtype=0），辅码流为1（即 subtype=1）
</code></pre><p>宇视的RTSP协议地址如下：</p><pre><code>rtsp://{用户名}:{密码}@{ip}:{port}/video1/2/3，
1）video1/2/3表示主码流，子码流，三码流（可以不用）
2）其他一样
</code></pre><h2 id="_2-opencv中读取网络摄像头" tabindex="-1"><a class="header-anchor" href="#_2-opencv中读取网络摄像头" aria-hidden="true">#</a> 2 OpenCV中读取网络摄像头</h2><p>OpenCV读取网络摄像头很简单，直接用url设定rtsp地址，用VideoCapture读取视频就行了。但是RTSP有些许问题，所以在最后通过TCP传输协议上承载RTSP，保证稳定性。就在rtsp地址后面加？tcp</p><pre><code>    String url = &quot;rtsp://admin:123456@114.114.114.114/ch1-s1?tcp&quot;;
    //海康
    //&quot;rtsp://admin:123456@114.114.114.114/ch1-s1?tcp&quot;
    //大华
    //“rtsp://admin:123456@114.114.114.114/cam/realmonitor?channel=1&amp;subtype=1?tcp”
    //宇视
    //&quot;rtsp://admin:123456@114.114.114.114/video1?tcp&quot;

    VideoCapture cap(url);
    Mat frame;
    cap&gt;&gt;frame;
</code></pre><p>但是直接按上面的方法来读取视频，会出问题，通常都是error while decoding，读不了码流，也就是读到一半就失败。这个会导致程序异常。</p><figure><img src="https://img-blog.csdnimg.cn/20190419170043195.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这是由于OpenCV中FFMPEG Lib对在rtsp协议中的H264 vidos不支持或者OpenCV版本太低，所以处理办法就是自己写两个不同的线程单独去处理接收每一帧的图像，然后另一个线程处理这每一帧的图像。思路如下：使用队列，基于pthread类采取先入先出策略，在一个线程中开始接收数据，在另一个线程中处理逐帧数据。</p><p>这样就可以实时获得网络摄像头数据啦，获得Mat格式图像，具体代码如下：</p><p>C++代码：</p><pre><code>//并行
#include &lt;thread&gt;
//互斥访问
#include &lt;mutex&gt;


//是否打开视频
bool captureOpen = false;
//读取的每张图像
Mat image;
VideoCapture capture;

//网络链接地址
String url = &quot;rtsp://admin:123456@114.114.114.114/ch1-s1?tcp&quot;;

//加锁器
mutex mtx;
//是否读图成功
bool imgready = false;

/**
 * @brief 读图
 * 
 * @return Mat 
 */
Mat captureThread()
{
	if (captureOpen == false || image.empty())
	{
		//打开图像
		capture.open(url);
	}
	while (1)
	{
		//加锁
		mtx.lock();

		capture &gt;&gt; image;
		//读图成功
		imgready = true;

		//解锁
		mtx.unlock();

		return image;
	}
}

/**
 * @brief 处理函数
 * 
 * @param image 输入图像
 */
void processingThread(Mat image)
{
	//如果读图成功
	if (imgready)
	{
		//如果图像为空
		if (image.empty())
		{
			return;
		}
		mtx.lock();
		//你的处理函数
        //your function
		mtx.unlock();
		return;
	}
}


int main()
{
	//读图
	thread t1(captureThread);
	t1.join();
	//已经读图
	captureOpen = true;
	//并行处理
	thread t2(processingThread, image);
	t2.join();

	return 0;
}
</code></pre><p>Python代码：</p><pre><code>import cv2
import queue
import time
import threading
q=queue.Queue()
 
def Receive():
    print(&quot;start Reveive&quot;)
    cap = cv2.VideoCapture(&quot;rtsp://admin:admin_123@172.0.0.0&quot;)
    ret, frame = cap.read()
    q.put(frame)
    while ret:
        ret, frame = cap.read()
        q.put(frame)
 
 
def Display():
     print(&quot;Start Displaying&quot;)
     while True:
         if q.empty() !=True:
            frame=q.get()
            cv2.imshow(&quot;frame1&quot;, frame)
         if cv2.waitKey(1) &amp; 0xFF == ord(&#39;q&#39;):
                break
 
if __name__==&#39;__main__&#39;:
    p1=threading.Thread(target=Receive)
    p2 = threading.Thread(target=Display)
    p1.start()
    p2.start()
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,23),u={href:"https://www.cnblogs.com/xinxue/p/7153003.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/darkeyers/article/details/84865363",target:"_blank",rel:"noopener noreferrer"};function h(l,_){const e=p("ExternalLinkIcon");return o(),i("div",null,[s,n("p",null,[n("a",u,[t(" https://www.cnblogs.com/xinxue/p/7153003.html"),r(e)])]),n("p",null,[n("a",m,[t(" https://blog.csdn.net/darkeyers/article/details/84865363"),r(e)])])])}const b=a(d,[["render",h],["__file","2019-04-19-_常用工具_ OpenCV获取网络摄像头实时视频流.html.vue"]]);export{b as default};
