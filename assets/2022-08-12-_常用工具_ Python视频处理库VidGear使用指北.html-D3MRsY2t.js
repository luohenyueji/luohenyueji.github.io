import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as l,c as v,a as e,b as i,d as s,e as d}from"./app-MsA2k2kn.js";const t={},u=e("h1",{id:"常用工具-python视频处理库vidgear使用指北",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#常用工具-python视频处理库vidgear使用指北","aria-hidden":"true"},"#"),i(" [常用工具] Python视频处理库VidGear使用指北")],-1),m=e("p",null,"VidGear是一个高性能的Python视频处理库，它在预载多个专业视频图像处理库的基础上，如OpenCV、FFmpeg、ZeroMQ、picamera、starlette、yt_dlp、pyscreenshot、aiortc和Python mss等，提供了一个易于使用、高度可扩展、彻底优化的多线程且异步的API框架。VidGear主要关注简单性，让软件开发人员只需几行代码即可轻松集成和执行复杂的视频处理任务，同时提供稳健的错误处理和实时处理性能。",-1),c=e("p",null,"以下功能框图清楚地描述了 VidGear API 的一般功能，简单来说就是在客户端的各种设备上采集视频图像数据，然后转换为视频流，通过网络传输或者云端传输返回给远端高性能服务器，进行人工智能识别。然后远端服务器再将识别结果传输给本地客户端，达到实时检测显示的效果。在这个过程中VidGear可以实时读取、写入、处理、发送和接收来自各种设备的视频文件/帧/流。",-1),o=e("figure",null,[e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] Python视频处理库VidGear使用指北/image/img1.jpg",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),b={href:"https://github.com/abhiTronix/vidgear",target:"_blank",rel:"noopener noreferrer"},p={href:"https://abhitronix.github.io/vidgear/latest/",target:"_blank",rel:"noopener noreferrer"},g=d(`<p>[toc]</p><h2 id="_1-前置知识" tabindex="-1"><a class="header-anchor" href="#_1-前置知识" aria-hidden="true">#</a> 1 前置知识</h2><h3 id="_1-1-安装" tabindex="-1"><a class="header-anchor" href="#_1-1-安装" aria-hidden="true">#</a> 1.1 安装</h3><p>对于VidGear，python版本需要高于3.7。VidGear支持以下系统：</p><ul><li>2016以后的linux版本，推荐使用linux系统运行VidGear</li><li>Windows 7及以上版本</li><li>MacOS 10.12.6及以上版本</li></ul><p>在安装VidGear需要安装依赖库：</p><ul><li>安装opencv-python <blockquote><p>pip install opencv-python</p></blockquote></li><li>linux下安装uvloop，使得系统获得更好性能： <blockquote><p>pip install uvloop</p></blockquote></li><li>安装ffmpeg，其它系统自行搜索安装方法，ubuntu下直接输入： <blockquote><p>sudo apt install ffmpeg</p></blockquote></li></ul><p>VidGear直接使用pip安装即可，具体如下：</p><ul><li>安装核心库（对机器性能要求较低）： <blockquote><p>pip install -U vidgear[core]</p></blockquote></li><li>安装核心库和异步依赖项（对机器性能要求较高）： <blockquote><p>pip install -U vidgear[asyncio]</p></blockquote></li></ul><h3 id="_1-2-opencv-python视频读写升级" tabindex="-1"><a class="header-anchor" href="#_1-2-opencv-python视频读写升级" aria-hidden="true">#</a> 1.2 OpenCV-Python视频读写升级</h3><p>OpenCV-Python中提供了视频读写接口，但是相比OpenCV-Python，VidGear在OpenCV基础上提供了更稳定，更高效的视频读写接口。</p><p>OpenCV和VidGear视频读取接口对比见：</p><table><thead><tr><th>任务</th><th>OpenCV</th><th>VidGear</th></tr></thead><tbody><tr><td>初始化</td><td>stream = cv2.VideoCapture(path)</td><td>stream = CamGear(source=path).start()</td></tr><tr><td>取帧</td><td>(grabbed, frame) = stream.read()</td><td>frame = stream.read()</td></tr><tr><td>状态</td><td>if not grabbed:</td><td>if frame is None:</td></tr><tr><td>终止</td><td>stream.release()</td><td>stream.stop()</td></tr></tbody></table><p>以下是OpenCV读取本机摄像头的代码，读取100帧平均每帧耗时33.31ms。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
import cv2
import time


stream = cv2.VideoCapture(0)

totalTime = 0
num = 100

# 循环读取100帧
for i in range(num):

    start = time.time()
    (grabbed, frame) = stream.read()

    end = time.time()
    totalTime += (end-start)

    if not grabbed:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    # 按q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

print(&quot;平均每帧读取时间为{:.2f}ms&quot;.format(1000.0*totalTime/num))

# 关闭窗口
cv2.destroyAllWindows()

# 释放视频流
stream.release()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是VidGear读取本机摄像头的代码，读取100帧平均每帧耗时30.22ms。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
from vidgear.gears import CamGear
import cv2
import time


stream = CamGear(source=0).start()

totalTime = 0
num = 100

# 循环读取100帧
for i in range(num):

    start = time.time()
    frame = stream.read()

    end = time.time()
    totalTime += (end-start)

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    # 按q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

print(&quot;平均每帧读取时间为{:.2f}ms&quot;.format(1000.0*totalTime/num))

# 关闭窗口
cv2.destroyAllWindows()

# 释放视频流
stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OpenCV和VidGear视频写入接口对比见：</p><table><thead><tr><th>任务</th><th>OpenCV</th><th>VidGear</th></tr></thead><tbody><tr><td>初始化</td><td>cv2.VideoWriter(&#39;output.avi&#39;, cv2.VideoWriter_fourcc(*&#39;XVID&#39;), 20.0, (640, 480))</td><td>writer = WriteGear(output_filename=&#39;Output.mp4&#39;)</td></tr><tr><td>写入</td><td>writer.write(frame)</td><td>writer.write(frame)</td></tr><tr><td>状态</td><td>if not grabbed:</td><td>if frame is None:</td></tr><tr><td>终止</td><td>stream.release()</td><td>writer.close()</td></tr></tbody></table><p>以下是OpenCV写入视频的代码，平均每帧写入耗时4.69ms。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
import cv2
import time

stream = cv2.VideoCapture(0)

# 指定视频编码格式
fourcc = cv2.VideoWriter_fourcc(*&#39;XVID&#39;)
# 初始化，视频存储地址，编码格式，帧率，图像大小
writer = cv2.VideoWriter(&#39;output.avi&#39;, fourcc, 20.0, (640, 480))

totalTime = 0
num = 100

# 循环读取100帧
for i in range(num):

    (grabbed, frame) = stream.read()

    if not grabbed:
        break

    start = time.time()
    # 写入图像
    writer.write(frame)
    end = time.time()

    cv2.imshow(&quot;Output&quot;, frame)

    totalTime += (end-start)

    # 按q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

print(&quot;平均每帧写入时间为{:.2f}ms&quot;.format(1000.0*totalTime/num))

# 关闭窗口
cv2.destroyAllWindows()

# 释放视频流
stream.release()

# 关闭文件对象
writer.release()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是VidGear写入视频的代码，平均每帧写入耗时2.42ms。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
from vidgear.gears import CamGear
from vidgear.gears import WriteGear

import cv2
import time


stream = CamGear(source=0).start()

totalTime = 0
num = 100

# 初始化
writer = WriteGear(output_filename=&#39;Output.mp4&#39;)


# 循环读取100帧
for i in range(num):

    frame = stream.read()

    if frame is None:
        break

    start = time.time()
    writer.write(frame)
    end = time.time()
    totalTime += (end-start)
    
    cv2.imshow(&quot;Output&quot;, frame)
    
    # 按q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break
    
print(&quot;平均每帧写入时间为{:.2f}ms&quot;.format(1000.0*totalTime/num))

# 关闭窗口
cv2.destroyAllWindows()

# 释放视频流
stream.stop()

# 关闭写入
writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-vidgear模块介绍" tabindex="-1"><a class="header-anchor" href="#_1-3-vidgear模块介绍" aria-hidden="true">#</a> 1.3 VidGear模块介绍</h3><p>VidGear也即video gear，VidGear包含多个模块，在VideGear中这些模块被称为gear api。每个Gears专门用于处理/控制/处理不同数据特定和设备特定的视频流、网络流和媒体编码器/解码器，并提供独立的api接口。</p><p>按照用途这些gear可分为以下几类：</p><ul><li>视频读取：从各种来源读取图像，转换为numpy.ndarray格式 <ul><li>CamGear: 针对各种USB摄像头/网络流/流媒体站点的多线程API</li><li>PiGear：针对各种Raspberry Pi摄像机模块的多线程API</li><li>VideoGear：针对视频稳流的API</li><li>ScreenGear：针对截屏的多线程API</li></ul></li><li>视频写入：将numpy.ndarray格式图像写入到视频文件或网络流 <ul><li>WriteGear：针对图像写入视频的API</li></ul></li><li>流媒体传输：转发或广播用于流媒体的文件 <ul><li>StreamGear：将源视频/音频文件和实时视频帧转为各种格式的视频流</li><li>WebGear：异步接口，用于广播实时MJPEG数据</li><li>WebGear_RTC：异步接口，用于广播WEBRTC数据</li></ul></li><li>网络传输：通过连接的网络发送或接收数据 <ul><li>NetGear: 用于处理互连网络系统之间的高性能数据传输</li><li>NetGear_Async：NetGear的异步版本</li></ul></li></ul><h2 id="_2-camgear" tabindex="-1"><a class="header-anchor" href="#_2-camgear" aria-hidden="true">#</a> 2 CamGear</h2><p>CamGear支持多种视频流，几乎可以处理或控制任何IP/USB摄像机、多媒体视频文件格式（测试高达4k）、任何网络流URL，如http（s）、rtp、rstp、rtmp、mms等。此外，它还支持各种直播视频流网站，如YouTube等。 下图展示了CamGear的功能，CamGear实际就是包装了OpenCV的VideoCapture API，允许同时解析多个视频，然后进行线程优化，提高稳定性和可用性。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] Python视频处理库VidGear使用指北/image/img2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-1-基础使用" aria-hidden="true">#</a> 2.1 基础使用</h3><p>以下代码为读取本地视频和摄像头示例</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
from vidgear.gears import CamGear
import cv2


# 打开视频
# stream = CamGear(source=0).start() # 打开摄像头
stream = CamGear(source=&quot;test.mp4&quot;).start()

# 循环播放
while True:

    # 读图
    frame = stream.read()

    # 读图是否成功
    if frame is None:
        break

    # 图像处理

    # 展示图片
    cv2.imshow(&quot;Output&quot;, frame)

    # q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

# 关闭窗口
cv2.destroyAllWindows()

# 关闭视频
stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-读取流媒体" tabindex="-1"><a class="header-anchor" href="#_2-2-读取流媒体" aria-hidden="true">#</a> 2.2 读取流媒体</h3>`,34),h={href:"https://github.com/yt-dlp/yt-dlp",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/yt-dlp/yt-dlp/tree/66cf3e1001b6d9a2829fe834c3f9103b0890918e/yt_dlp/extractor",target:"_blank",rel:"noopener noreferrer"},f=d(`<div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
from vidgear.gears import CamGear
import cv2


# STREAM_RESOLUTION设置清晰度：360p, 720p, best, worst
# nocheckcertificate设置不采用SSL验证
# THREAD_TIMEOUT设置超时时间为300s
options = {&quot;STREAM_RESOLUTION&quot;: &quot;720p&quot;, &quot;STREAM_PARAMS&quot;: {&quot;nocheckcertificate&quot;: True}, &quot;THREAD_TIMEOUT&quot;: 300}

# stream_mode设置打开媒体网站
stream = CamGear(
    source=&quot;https://abcnews.go.com/US/video/climate-change-forest-management-make-wildfires-harder-73318307&quot;, 
    stream_mode=True,
    **options).start()

# 循环播放
while True:

    # 读图
    frame = stream.read()

    # 读图是否成功
    if frame is None:
        break

    # 图像处理

    # 展示图片
    cv2.imshow(&quot;Output&quot;, frame)

    # q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

# 关闭窗口
cv2.destroyAllWindows()

# 关闭视频
stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-与opencv互通" tabindex="-1"><a class="header-anchor" href="#_2-3-与opencv互通" aria-hidden="true">#</a> 2.3 与OpenCV互通</h3>`,2),y={href:"https://abhitronix.github.io/vidgear/latest/gears/camgear/advanced/source_params/",target:"_blank",rel:"noopener noreferrer"},G=d(`<div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 加载库
from vidgear.gears import CamGear
import cv2


# 设置OpenCV VideoCapture参数，有些参数可能不起作用，主要取决相机
options = {
    &quot;CAP_PROP_FRAME_WIDTH&quot;: 1000, 
    &quot;CAP_PROP_FRAME_HEIGHT&quot;: 240,
    &quot;CAP_PROP_FPS&quot;: 10, 
}

# logging输出日志
stream = CamGear(source=0, logging=True, **options).start()

# 循环播放
while True:

    # 读图
    frame = stream.read()

    # 读图是否成功
    if frame is None:
        break

    # 图像处理

    # 展示图片
    cv2.imshow(&quot;Output&quot;, frame)

    # q退出
    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

# 关闭窗口
cv2.destroyAllWindows()

# 关闭视频
stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-色彩空间转换" tabindex="-1"><a class="header-anchor" href="#_2-4-色彩空间转换" aria-hidden="true">#</a> 2.4 色彩空间转换</h3><p>在获取图像时可以直接进行图像色彩空间转换，实际就是vidgear在函数内部调用opencv的cvtcolor方法，好处就是速度比opencv实现快一点。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import CamGear
import cv2

# 直接读取图像得到的是OpenCV的BGR图像，设置colorspace即可转换图像空间。
stream = CamGear(source=0, colorspace=&quot;COLOR_BGR2HSV&quot;, logging=True).start()


while True:

    frame = stream.read()

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF

    # 按w将图像空间转为gray
    if key == ord(&quot;w&quot;):
        stream.color_space = cv2.COLOR_BGR2GRAY  
    # 按e转换图像空间为lab
    if key == ord(&quot;e&quot;):
        stream.color_space = cv2.COLOR_BGR2LAB  

    # 按s不转换图像空间
    if key == ord(&quot;s&quot;):
        stream.color_space = None  

    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-同时播放视频" tabindex="-1"><a class="header-anchor" href="#_2-5-同时播放视频" aria-hidden="true">#</a> 2.5 同时播放视频</h3><p>vidgear可以同时并行播放多个视频，至于播放多少个视频取决于机器性能。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from vidgear.gears import CamGear
import cv2
import time

# 视频流1
stream1 = CamGear(source=0, logging=True).start() 

# 视频流2
stream2 = CamGear(source=&quot;test.mp4&quot;, logging=True).start() 


while True:

    # 分别读取视频
    frameA = stream1.read()

    frameB = stream2.read()

    # 检测视频
    if frameA is None or frameB is None:
        break

    # 分别显示视频
    cv2.imshow(&quot;Output Frame1&quot;, frameA)
    cv2.imshow(&quot;Output Frame2&quot;, frameB)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

    # 按w设置不同功能
    if key == ord(&quot;w&quot;):
        # 保存图像到本地
        cv2.imwrite(&quot;Image-1.jpg&quot;, frameA)
        cv2.imwrite(&quot;Image-2.jpg&quot;, frameB)
        # break   # 退出

# 关闭窗口
cv2.destroyAllWindows()

# 关闭视频
stream1.stop()
stream2.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-视频流读取" tabindex="-1"><a class="header-anchor" href="#_2-6-视频流读取" aria-hidden="true">#</a> 2.6 视频流读取</h3>`,8),k={href:"https://blog.csdn.net/LuohenYJ/article/details/89403227",target:"_blank",rel:"noopener noreferrer"},w=d(`<ul><li>rtsp流：rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4，来源于https://www.wowza.com/developer/rtsp-stream-test</li><li>http流：http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8，来源于苹果提供的测试源</li></ul><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import CamGear
import cv2
import datetime
import time


class Reconnecting_CamGear:
    def __init__(self, cam_address, reset_attempts=50, reset_delay=5):
        self.cam_address = cam_address # 视频流地址
        self.reset_attempts = reset_attempts
        self.reset_delay = reset_delay
        self.source = CamGear(source=self.cam_address).start()
        self.running = True # 是否运行
        self.frame = None # 读取的帧

    def read(self):
        # 如果没有读到图
        if self.source is None:
            return None
        if self.running and self.reset_attempts &gt; 0:
            frame = self.source.read() # 读图
            if frame is None:
                self.source.stop() # 没有读到图就停止
                self.reset_attempts -= 1 # 重新连接
                # 打印重新连接信息
                print(
                    &quot;Re-connection Attempt-{} occured at time:{}&quot;.format(
                        str(self.reset_attempts),
                        datetime.datetime.now().strftime(&quot;%m-%d-%Y %I:%M:%S%p&quot;),
                    )
                )
                time.sleep(self.reset_delay)
                self.source = CamGear(source=self.cam_address).start()
                # 返回前一帧
                return self.frame
            else:
                self.frame = frame # 返回结果
                return frame
        else:
            return None

    def stop(self):
        self.running = False
        self.reset_attempts = 0
        self.frame = None
        if not self.source is None:
            self.source.stop()


if __name__ == &quot;__main__&quot;:
    # 打开可用视频流
    stream = Reconnecting_CamGear(
        cam_address=&quot;rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&quot;, # 视频流地址
        reset_attempts= 5, # 重连次数
        reset_delay=3, # 重连后等待时间s
    )

    # 循环读取
    while True:

        # 读图
        frame = stream.read()

        # 判断图像是否存在
        if frame is None:
            break


        cv2.imshow(&quot;Output&quot;, frame)

        key = cv2.waitKey(1) &amp; 0xFF
        if key == ord(&quot;q&quot;):
            break

    cv2.destroyAllWindows()

    stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-videogear" tabindex="-1"><a class="header-anchor" href="#_3-videogear" aria-hidden="true">#</a> 3 VideoGear</h2><h3 id="_3-1-videogear的使用" tabindex="-1"><a class="header-anchor" href="#_3-1-videogear的使用" aria-hidden="true">#</a> 3.1 VideoGear的使用</h3>`,4),x={href:"https://blog.csdn.net/LuohenYJ/article/details/88355444",target:"_blank",rel:"noopener noreferrer"},P=d(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] Python视频处理库VidGear使用指北/image/img3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>VideoGear内部封装了CamGear和视频稳像的代码，其函数调用和CamGear差不多，可以设置的参数也是一样的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 调用库
from vidgear.gears import VideoGear
import cv2

# VideoGear和CamGear调用方法一样，参数设置也是一样
stream = VideoGear(source=0, colorspace=&quot;COLOR_BGR2HSV&quot;, logging=True).start()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外VideoGear还支持和ROS机器人操作系统一起使用，可以处理rtsp等视频流。但是VideoGear速度很慢，如果没有视频稳流的需求，可以仅使用CamGear。</p><h3 id="_3-2-stabilizer的使用" tabindex="-1"><a class="header-anchor" href="#_3-2-stabilizer的使用" aria-hidden="true">#</a> 3.2 Stabilizer的使用</h3><p>可以不使用VideoGear直接调用VidGear中的Stabilizer类实现视频稳像。Stabilizer类能够以最小延迟实现vidgear的视频稳定，并且几乎不需要额外的计算需求。其基本思想是跟踪并保存给定帧数的显著特征阵列，然后使用这些定位点来抵消队列中传入帧相对于它的所有扰动。处理低频抖动，Stabilizer类效果还不错，高频的话效果很差。</p><p><strong>基础使用</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears.stabilizer import Stabilizer
import cv2

# 打开摄像头
stream = cv2.VideoCapture(0)

# 打开stabilizer稳定器
# smoothing_radius默认为25，用于平滑帧间距离，数值越大，平滑效果越明显，但是延迟越大
# crop_n_zoom用于稳定数据
# border_size扩展边框大小的值，以补偿稳定期间黑色边框的减少
stab = Stabilizer(smoothing_radius=30, crop_n_zoom=True, border_size=5, logging=True)

while True:

    # 读图
    (grabbed, frame) = stream.read()

    if not grabbed:
        break

    # 稳定图像，初始几帧可能不会输出结果，因为要统计数据
    stabilized_frame = stab.stabilize(frame)

    if stabilized_frame is None:
        continue

    cv2.imshow(&quot;Stabilized Frame&quot;, stabilized_frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

stab.clean()

stream.release()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-screengear" tabindex="-1"><a class="header-anchor" href="#_4-screengear" aria-hidden="true">#</a> 4 ScreenGear</h2><p>ScreenGear专为超快屏幕播放而设计，这意味着它在尽可能缩小时间延迟的情况下，通过在计算机屏幕上定义一个区域或全屏来实时抓取监视器中的图像。ScreenGear主要是基于pyscreenshot和python-mss实现的。</p><h3 id="_4-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_4-1-基础使用" aria-hidden="true">#</a> 4.1 基础使用</h3><p>以下代码为ScreenGear截取本机全屏屏幕的示例，延迟还是有点高。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import ScreenGear
import cv2
# 开始截屏
stream = ScreenGear().start()

# 循环播放
while True:

    # 读图
    frame = stream.read()

    # 读图是否成功
    if frame is None:
        break

    # 图像处理

    # 展示图片
    cv2.imshow(&quot;Output&quot;, frame)

    # q退出
    key = cv2.waitKey(100) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

# 关闭窗口
cv2.destroyAllWindows()

# 关闭视频
stream.stop()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-参数设置" tabindex="-1"><a class="header-anchor" href="#_4-2-参数设置" aria-hidden="true">#</a> 4.2 参数设置</h3><p>我们可以通过不同参数的设置来实现不同的功能。</p><p><strong>设置截屏区域</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>options = {&quot;top&quot;: 40, &quot;left&quot;: 0, &quot;width&quot;: 100, &quot;height&quot;: 100}
stream = ScreenGear(**options).start()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他参数设置</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># monitor表示屏幕编号，backend表示选择不同的截屏后端，colorspace表示选择颜色空间
stream = ScreenGear(monitor=1,backend=&quot;mss&quot;,colorspace=&quot;COLOR_BGR2HSV&quot;).start()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-writegear" tabindex="-1"><a class="header-anchor" href="#_5-writegear" aria-hidden="true">#</a> 5 WriteGear</h2><p>WriteGear API围绕领先的多媒体框架FFmpeg提供了一个完整、灵活和健壮的包装器。WriteGear可以将实时帧处理为具有任何合适要求如比特率、编解码器、帧率、分辨率、字幕等）的无损压缩视频文件。除此之外，WriteGear还提供了对OpenCV的VideoWriter API工具的灵活访问，用于无压缩的视频帧编码。因此WriterGear提供了两种不同的模式以供使用：</p><ul><li><p>压缩模式：在这种模式下，WriteGear利用功能强大的FFmpeg内置编码器对无损多媒体文件进行编码。这种模式使我们能够轻松灵活地利用FFmpeg中几乎任何可用的参数，并且在这样做的同时，它能够稳健地安静地处理所有错误/警告。</p></li><li><p>无压缩模式：在这种模式下，WriteGear利用了基本的OpenCV内置的VideoWriter API工具。该模式还支持OpenCV的VideoWriter API中可用的所有参数转换，但它缺乏操作编码参数和其他重要功能（如视频压缩、音频编码等）的能力。</p></li></ul><p>WriteGear的运行模式如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] Python视频处理库VidGear使用指北/image/img4.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-1-压缩模式" tabindex="-1"><a class="header-anchor" href="#_5-1-压缩模式" aria-hidden="true">#</a> 5.1 压缩模式</h3>`,25),T={href:"https://abhitronix.github.io/vidgear/latest/gears/writegear/compression/advanced/cciw/",target:"_blank",rel:"noopener noreferrer"},C=d(`<p>对于压缩模型，要注意不要提供任何具有不同尺寸或通道的帧给 WriteGear，此外当视频持续时间太短（&lt;60 秒）时使用-disable_force_termination标志，否则WriteGear将不会产生任何有效输出。</p><h6 id="_5-1-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_5-1-1-基础使用" aria-hidden="true">#</a> 5.1.1 基础使用</h6><p>最基础的WriteGear调用方法，如下所示。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import CamGear
from vidgear.gears import WriteGear
import cv2

# 打开视频
stream = CamGear(source=&quot;test.mp4&quot;).start()

# 初始化视频编写器，compression_mode默认为True
writer = WriteGear(output_filename=&quot;Output.mp4&quot;,logging=True,compression_mode=True)


while True:

    # 读图
    frame = stream.read()

    if frame is None:
        break

    # 保存图片
    writer.write(frame)

    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

stream.stop()

writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-2-rgb模式" tabindex="-1"><a class="header-anchor" href="#_5-1-2-rgb模式" aria-hidden="true">#</a> 5.1.2 RGB模式</h6><p>如果要写入的图像通道顺序是RGB，而不是OpenCV默认的BGR格式，在写视频时可以设置为rgb_mode=True)，指定传入帧为RGB格式。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import VideoGear
from vidgear.gears import WriteGear
import cv2

stream = VideoGear(source=0).start()

writer = WriteGear(output_filename=&quot;Output.mp4&quot;)

while True:

    frame = stream.read()

    if frame is None:
        break

    # 模拟rgb图
    frame_rgb = frame[:, :, ::-1]

    # rgb图模式保存
    writer.write(frame_rgb, rgb_mode=True)  

    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

stream.stop()

writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-3-指定参数" tabindex="-1"><a class="header-anchor" href="#_5-1-3-指定参数" aria-hidden="true">#</a> 5.1.3 指定参数</h6><p>通过设置-input_framerate参数指定视频写入器的帧率，如stream.framerate表示为输入流的帧率。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import required libraries
from vidgear.gears import CamGear
from vidgear.gears import WriteGear
import cv2

stream = CamGear(source=0).start()
# 读取视频流的帧率
print(stream.framerate)

# 设置视频写入器的帧率
output_params = {&quot;-input_framerate&quot;: stream.framerate}

writer = WriteGear(output_filename=&quot;Output.mp4&quot;, **output_params)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外可以设置参数与硬件编码器同时使用，但是这个需要比较了解FFmpeg。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 指定编码器
output_params = {
    &quot;-vcodec&quot;: &quot;h264_vaapi&quot;,
    &quot;-vaapi_device&quot;: &quot;/dev/dri/renderD128&quot;,
    &quot;-vf&quot;: &quot;format=nv12,hwupload&quot;,
}

writer = WriteGear(output_filename=&quot;Output.mp4&quot;, **output_params)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果装了声卡及其驱动，也可以通过WriteGear在保存视频的时候保存音频。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>stream = VideoGear(source=0).start()

# 设置ffmpeg参数
output_params = {
    &quot;-input_framerate&quot;: stream.framerate,
    &quot;-thread_queue_size&quot;: &quot;512&quot;,
    &quot;-ac&quot;: &quot;2&quot;,
    &quot;-ar&quot;: &quot;48000&quot;,
    &quot;-f&quot;: &quot;alsa&quot;, # 这个参数必须要放在-i前面
    &quot;-i&quot;: &quot;hw:1&quot;,
}
writer = WriteGear(output_filename=&quot;Output.mp4&quot;, logging=True, **output_params)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以设置ffmpeg参数保存视频片段。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># ffmpeg视频分割参数
output_params = {
    &quot;-c:v&quot;: &quot;libx264&quot;,
    &quot;-crf&quot;: 22,
    &quot;-map&quot;: 0,
    &quot;-segment_time&quot;: 9,
    &quot;-g&quot;: 9,
    &quot;-sc_threshold&quot;: 0,
    &quot;-force_key_frames&quot;: &quot;expr:gte(t,n_forced*9)&quot;,
    &quot;-clones&quot;: [&quot;-f&quot;, &quot;segment&quot;],
}

# output_filename命名规则
writer = WriteGear(output_filename=&quot;output%03d.mp4&quot;, logging=True, **output_params)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-1-4-发送数据给流媒体服务器" tabindex="-1"><a class="header-anchor" href="#_5-1-4-发送数据给流媒体服务器" aria-hidden="true">#</a> 5.1.4 发送数据给流媒体服务器</h6>`,17),V={href:"https://github.com/aler9/rtsp-simple-server",target:"_blank",rel:"noopener noreferrer"},N={href:"https://blog.csdn.net/qq_43994782/article/details/118941373",target:"_blank",rel:"noopener noreferrer"},W=d(`<div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>stream = CamGear(source=&quot;test.mp4&quot;).start()

# 设置ffmpeg推流参数
output_params = {&quot;-f&quot;: &quot;rtsp&quot;, &quot;-rtsp_transport&quot;: &quot;tcp&quot;}

# 将视频推给rtsp服务器
writer = WriteGear(
    output_filename=&quot;rtsp://localhost:8554/mystream&quot;, logging=True, **output_params
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-无压缩模式" tabindex="-1"><a class="header-anchor" href="#_5-2-无压缩模式" aria-hidden="true">#</a> 5.2 无压缩模式</h3><p>无压缩模式直接调用OpenCV的写视频接口，但是缺乏控制输出质量、压缩和其他重要功能。因为没有用到ffmpeg内部能力，因此，与压缩模式相比，生成的输出视频文件大小将大很多。具体示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 设置OpenCV中的参数
output_params = {&quot;-fourcc&quot;: &quot;MJPG&quot;, &quot;-fps&quot;: 30}

# compression_mode设置为False
writer = WriteGear(output_filename=&quot;Output.mp4&quot;, compression_mode=False, logging=True, **output_params)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-netgear" tabindex="-1"><a class="header-anchor" href="#_6-netgear" aria-hidden="true">#</a> 6 NetGear</h2><p>NetGear用于通过网络实时发送和接受视频帧，并同时提供JPEG帧压缩功能。</p><h3 id="_6-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_6-1-基础使用" aria-hidden="true">#</a> 6.1 基础使用</h3><p>在本机环境，可以通过服务端代码传递数据，客户端收取数据。</p><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
import cv2

# receive_mode = True表示为接收数据
client = NetGear(receive_mode=True)


while True:

    # 从网络读图
    frame = client.recv()

    if frame is None:
        break

    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

client.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from vidgear.gears import VideoGear
from vidgear.gears import NetGear

stream = VideoGear(source=&quot;test.mp4&quot;).start()

# 开启Netgear服务
server = NetGear()
while True:

    try:

        frame = stream.read()

        if frame is None:
            break

        # 传递图像
        server.send(frame)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-参数设置" tabindex="-1"><a class="header-anchor" href="#_6-2-参数设置" aria-hidden="true">#</a> 6.2 参数设置</h3><p>设置不同参数以应对不同环境。</p><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from vidgear.gears import NetGear
import cv2

# 设置，这里都是消息接收的方式，直接默认就行了，不用管。
options = {&quot;flag&quot;: 0, &quot;copy&quot;: False, &quot;track&quot;: False}

# address设置为客户端的ip，port设置为客户端的端口
client = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=1,
    receive_mode=True,
    logging=True,
    **options
)

while True:
    # 收取数据
    frame = client.recv()

    if frame is None:
        break

    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

client.close()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import required libraries
from vidgear.gears import VideoGear
from vidgear.gears import NetGear

# 定义参数
options = {&quot;flag&quot;: 0, &quot;copy&quot;: False, &quot;track&quot;: False}

stream = VideoGear(source=0).start()

# address设置为客户端的ip，port设置为客户端的端口
# pattern表示设置服务器/客户端之间支持的消息传递模式
server = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=1,
    logging=True,
    **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        server.send(frame)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-多服务端模式" tabindex="-1"><a class="header-anchor" href="#_6-3-多服务端模式" aria-hidden="true">#</a> 6.3 多服务端模式</h3><p>NetGear可以同时通过多个服务端向一个客户端传递数据。</p><h6 id="_6-3-1-单向传输" tabindex="-1"><a class="header-anchor" href="#_6-3-1-单向传输" aria-hidden="true">#</a> 6.3.1 单向传输</h6><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
# 一个整合opencv，numpy，matplotlib基本操作的库
from imutils import build_montages
import cv2

# 多服务器模式
options = {&quot;multiserver_mode&quot;: True}

# address客户端ip
# port双端口读取
client = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=(5566, 5567),
    protocol=&quot;tcp&quot;,
    pattern=1,
    receive_mode=True,
    **options
)

# 设置收取的图像为固定大小
imgSize = (576, 704)

# 保存数据
frame_dict = {}

# 这里读取不同端口图像是按照顺序依次读取
while True:

    try:
        # 每次从一个端口读取一张图
        data = client.recv()

        if data is None:
            break

        # 提取端口地址，文本和图像
        unique_address, extracted_data, frame = data

        # 统一图像大小，因为不同源的图像大小可能不一样，使得展示统一
        frame = cv2.resize(frame, imgSize)

        # 绘制文字
        cv2.putText(frame, extracted_data, (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 2)

        (h, w) = frame.shape[:2]

        # 保存数据用于展示
        frame_dict[unique_address] = frame

        montages = build_montages(frame_dict.values(), (w, h), (2, 1))

        for (i, montage) in enumerate(montages):

            cv2.imshow(&quot;Montage Footage {}&quot;.format(i), montage)

        key = cv2.waitKey(1) &amp; 0xFF
        if key == ord(&quot;q&quot;):
            break

    except KeyboardInterrupt:
        break

cv2.destroyAllWindows()

client.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端1</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
from vidgear.gears import CamGear

# 读取视频
stream = CamGear(source=0).start()

# 设置多服务器模式
options = {&quot;multiserver_mode&quot;: True}

# address设置为客户端的ip，port设置为客户端的端口
server = NetGear(
    address=&quot;0.0.0.0&quot;, port=&quot;5566&quot;, protocol=&quot;tcp&quot;, pattern=1, **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        text = &quot;Port: 5566&quot;

        # 发送数据
        server.send(frame, message=text)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端2</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
from vidgear.gears import CamGear

# 读取视频
stream = CamGear(source=&#39;test.mp4&#39;).start()

# 设置多服务器模式
options = {&quot;multiserver_mode&quot;: True}

# address设置为客户端的ip，port设置为客户端的端口
server = NetGear(
    address=&quot;0.0.0.0&quot;, port=&quot;5567&quot;, protocol=&quot;tcp&quot;, pattern=1, **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        text = &quot;Port: 5567&quot;

        # 发送数据
        server.send(frame, message=text)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_6-3-2-双向传输" tabindex="-1"><a class="header-anchor" href="#_6-3-2-双向传输" aria-hidden="true">#</a> 6.3.2 双向传输</h6><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
# 一个整合opencv，numpy，matplotlib基本操作的库
from imutils import build_montages
import cv2

# 多服务器和双向连接模式，但是延迟可能较大
options = {&quot;multiserver_mode&quot;: True, &quot;bidirectional_mode&quot;: True}


client = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=(5566, 5567),
    protocol=&quot;tcp&quot;,
    pattern=1,
    receive_mode=True,
    logging=True,
    **options
)

# 设置收取的图像为固定大小
imgSize = (576, 704)

frame_dict = {}


while True:

    try:
        target_data = &quot;已经收到数据&quot;
        data = client.recv(return_data=target_data)
        # 每次从一个端口读取一张图，并返回数据
        data = client.recv(return_data=target_data)

        if data is None:
            break

        # 提取端口地址，文本和图像
        unique_address, extracted_data, frame = data

        # 统一图像大小，因为不同源的图像大小可能不一样，使得展示统一
        frame = cv2.resize(frame, imgSize)

        # 绘制文字
        cv2.putText(frame, extracted_data, (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 2)

        (h, w) = frame.shape[:2]

        # 保存数据用于展示
        frame_dict[unique_address] = frame

        montages = build_montages(frame_dict.values(), (w, h), (2, 1))

        for (i, montage) in enumerate(montages):

            cv2.imshow(&quot;Montage Footage {}&quot;.format(i), montage)

        key = cv2.waitKey(1) &amp; 0xFF
        if key == ord(&quot;q&quot;):
            break

    except KeyboardInterrupt:
        break

cv2.destroyAllWindows()

client.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端1</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
from vidgear.gears import CamGear

# 读取视频
stream = CamGear(source=0).start()

# 多服务器和双向连接模式，但是延迟可能较大
options = {&quot;multiserver_mode&quot;: True,&quot;bidirectional_mode&quot;: True}

# address设置为客户端的ip，port设置为客户端的端口
server = NetGear(
    address=&quot;0.0.0.0&quot;, port=&quot;5566&quot;, protocol=&quot;tcp&quot;, pattern=1, **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        text = &quot;Port: 5566&quot;

        # 发送数据
        recv_data = server.send(frame, message=text)
        
        if recv_data is not None:
            print(recv_data)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端2</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import NetGear
from vidgear.gears import CamGear

# 读取视频
stream = CamGear(source=&quot;test.mp4&quot;).start()

# 多服务器和双向连接模式，但是延迟可能较大
options = {&quot;multiserver_mode&quot;: True, &quot;bidirectional_mode&quot;: True}

# address设置为客户端的ip，port设置为客户端的端口
server = NetGear(
    address=&quot;0.0.0.0&quot;, port=&quot;5567&quot;, protocol=&quot;tcp&quot;, pattern=1, **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        text = &quot;Port: 5567&quot;

        # 发送数据
        recv_data = server.send(frame, message=text)

        if recv_data is not None:
            print(recv_data)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-多客户端模式" tabindex="-1"><a class="header-anchor" href="#_6-4-多客户端模式" aria-hidden="true">#</a> 6.4 多客户端模式</h3>`,35),F={href:"https://abhitronix.github.io/vidgear/latest/gears/netgear/advanced/multi_client/",target:"_blank",rel:"noopener noreferrer"},O=d(`<h3 id="_6-5-双向模式" tabindex="-1"><a class="header-anchor" href="#_6-5-双向模式" aria-hidden="true">#</a> 6.5 双向模式</h3><p>该模式下，服务端和客户端都可以相互传递数据。</p><p><strong>服务端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import required libraries
from vidgear.gears import NetGear
from vidgear.gears import CamGear
stream = CamGear(source=&quot;test.mp4&quot;).start()

options = {&quot;bidirectional_mode&quot;: True}

server = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=1,
    logging=True,
    **options
)

while True:

    try:
        frame = stream.read()

        if frame is None:
            break

        target_data = &quot;Hello, I am a Server.&quot;
        # 发送数据，并接收数据
        recv_data = server.send(frame, message=target_data)

        if not (recv_data is None):
            print(recv_data)

    except KeyboardInterrupt:
        break

stream.stop()

server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import required libraries
from vidgear.gears import NetGear
import cv2

options = {&quot;bidirectional_mode&quot;: True}

client = NetGear(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=1,
    receive_mode=True,
    logging=True,
    **options
)

while True:

    target_data = &quot;Hi, I am a Client here.&quot;

    data = client.recv(return_data=target_data)

    if data is None:
        break

    server_data, frame = data

    if frame is None:
        break

    if not (server_data is None):
        print(server_data)

    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

client.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-6-其他模式设置" tabindex="-1"><a class="header-anchor" href="#_6-6-其他模式设置" aria-hidden="true">#</a> 6.6 其他模式设置</h3><p><strong>安全模式</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># secure_mode可选值为0，1，2。数字越大越安全，但是越慢，0为默认值
options = {
    &quot;secure_mode&quot;: 2,
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>帧压缩</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 色彩空间转换
options = {&quot;jpeg_compression&quot;: &quot;GRAY&quot;}
# 压缩jgp图像质量，jpeg_compression_quality越大图像越清晰
options = {&quot;jpeg_compression&quot;: True, &quot;jpeg_compression_quality&quot;: 95}
# jpeg_compression_fastdct加快解码速度，默认为True
options = {&quot;jpeg_compression&quot;: True, &quot;jpeg_compression_fastdct&quot;: True}
# jpeg_compression_fastupsample加快采样速度，默认为False
options = {&quot;jpeg_compression&quot;: True, &quot;jpeg_compression_fastupsample&quot;: True}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-7-netgear-async" tabindex="-1"><a class="header-anchor" href="#_6-7-netgear-async" aria-hidden="true">#</a> 6.7 NetGear_Async</h3><p>NetGear_Async通过异步的方式以大约三分之一的内存消耗产生与NetGear API相同的性能，并且还提供完整的服务器-客户端处理，以及使用类似于NetGear的可变协议/模式的各种选项，但缺乏灵活性，因为它仅支持部分NetGear的模式。但是要使用Async模式，比如安装vidgear[asyncio]。安装代码如下：</p><blockquote><p>pip install vidgear[asyncio]</p></blockquote><p><strong>客户端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import libraries
from vidgear.gears.asyncio import NetGear_Async
from vidgear.gears import WriteGear
import cv2
import asyncio

# receive_mode=True接收数据
client = NetGear_Async(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=2,
    receive_mode=True,
    logging=True,
).launch()
# 写视频
writer = WriteGear(output_filename=&quot;Output.mp4&quot;, logging=True)


# 异步函数，处理数据
async def main():
    async for frame in client.recv_generator():
        writer.write(frame)

        cv2.imshow(&quot;Output Frame&quot;, frame)
        key = cv2.waitKey(1) &amp; 0xFF

        # 等待数据
        await asyncio.sleep(0)


if __name__ == &quot;__main__&quot;:
    asyncio.set_event_loop(client.loop)
    try:
        client.loop.run_until_complete(main())
    except (KeyboardInterrupt, SystemExit):
        pass

    cv2.destroyAllWindows()
    client.close()
    writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># import libraries
from vidgear.gears.asyncio import NetGear_Async
import asyncio

# address客户端IP
server = NetGear_Async(
    source=&#39;test.mp4&#39;,
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=2,
    stabilize=True,
    logging=True,
).launch()

if __name__ == &quot;__main__&quot;:
    asyncio.set_event_loop(server.loop)
    try:
        # 循环运行
        server.loop.run_until_complete(server.task)
    except (KeyboardInterrupt, SystemExit):
        pass
    finally:
        server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-streamgear" tabindex="-1"><a class="header-anchor" href="#_7-streamgear" aria-hidden="true">#</a> 7 StreamGear</h2><p>SteamGear 是一种开箱即用的解决方案，用于对源视频/音频文件和实时视频帧进行转码，并将它们分解成一系列具有适当长度的多个片段。这些片段可以以不同的质量级别（不同的比特率或空间分辨率）流式传输视频。</p><p>StreamGear主要在以下独立的转码模式下运行：</p><ul><li>单源模式：将整个视频文件 （而不是逐帧）转码为多个较小的序列以进行流式传输。</li><li>实时帧模式：直接逐帧转码（而不是整个视频文件），转成多个小块/小段的序列用于流媒体。</li></ul><p>StreamGear的基本流程如下图所示，基于ffmpeg切分视频和音频为若干片段，通过http协议传输给不同应用端。StreamGear的使用必须要基于ffmpeg，如果本地环境没有安装ffmpeg将会报错。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] Python视频处理库VidGear使用指北/image/img5.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-1-单源模式" tabindex="-1"><a class="header-anchor" href="#_7-1-单源模式" aria-hidden="true">#</a> 7.1 单源模式</h3><p><strong>基础使用</strong></p><p>下面的代码就是将一个视频直接切分为若干片段。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import StreamGear

# 使用有效的视频输入激活单源模式
stream_params = {&quot;-video_source&quot;: &quot;test.mp4&quot;}
# livestream为True表示启用直播
# stream_params = {&quot;-video_source&quot;: 0, &quot;-livestream&quot;: True}
# 设置输出模式，会在目录下生成若干片段
streamer = StreamGear(output=&quot;dash_out.mpd&quot;, **stream_params)
# 切分整个视频
streamer.transcode_source()
# 结束
streamer.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>设置不同参数的流</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears import StreamGear

# 定义各种流
stream_params = {
    &quot;-video_source&quot;: &quot;test.mp4&quot;,
    &quot;-streams&quot;: [
        {&quot;-resolution&quot;: &quot;1920x1080&quot;, &quot;-video_bitrate&quot;: &quot;4000k&quot;}, 
        {&quot;-resolution&quot;: &quot;1280x720&quot;, &quot;-framerate&quot;: 30.0}, 
        {&quot;-resolution&quot;: &quot;640x360&quot;, &quot;-framerate&quot;: 60.0},  
        {&quot;-resolution&quot;: &quot;320x240&quot;, &quot;-video_bitrate&quot;: &quot;500k&quot;}, 
    ],
}

streamer = StreamGear(output=&quot;dash_out.mpd&quot;, **stream_params)
# 设置不同参数格式
# streamer = StreamGear(output=&quot;hls_out.m3u8&quot;, format = &quot;hls&quot;, **stream_params)
streamer.transcode_source()
streamer.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ffmpeg参数设置</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>stream_params = {
    &quot;-video_source&quot;: &quot;test.mp4&quot;,
    &quot;-vcodec&quot;: &quot;libx265&quot;, 
    &quot;-x265-params&quot;: &quot;lossless=1&quot;, 
    &quot;-crf&quot;: 25,
    &quot;-bpp&quot;: &quot;0.15&quot;,
    &quot;-streams&quot;: [
        {&quot;-resolution&quot;: &quot;1280x720&quot;, &quot;-video_bitrate&quot;: &quot;4000k&quot;},
        {&quot;-resolution&quot;: &quot;640x360&quot;, &quot;-framerate&quot;: 60.0},  
    ],
    &quot;-audio&quot;: &quot;/home/foo/foo1.aac&quot;,  # 设置音频
    &quot;-acodec&quot;: &quot;libfdk_aac&quot;, 
    &quot;-vbr&quot;: 4,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-实时帧模式" tabindex="-1"><a class="header-anchor" href="#_7-2-实时帧模式" aria-hidden="true">#</a> 7.2 实时帧模式</h3><p>实时帧模式并不是直接开启视频直播，因为不流畅。如果想开启直播模式，设置livestream为True。</p><p><strong>基础使用</strong></p><p>下面代码实现逐帧切分图像。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from vidgear.gears import CamGear
from vidgear.gears import StreamGear
import cv2

stream = CamGear(source=&#39;test.mp4&#39;).start() 
streamer = StreamGear(output=&quot;dash_out.mpd&quot;)

# 设置格式参数
# streamer = StreamGear(output=&quot;hls_out.m3u8&quot;, format = &quot;hls&quot;)

# 设置为直播模式
# stream = CamGear(source=0).start()
# stream_params = {&quot;-input_framerate&quot;: stream.framerate, &quot;-livestream&quot;: True}

while True:

    frame = stream.read()

    if frame is None:
        break

    # 发送图像给streamer，进行转换
    streamer.stream(frame)
    # 设置传入帧的RGB通道格式
    # streamer.stream(frame_rgb, rgb_mode = True) 
    cv2.imshow(&quot;Output Frame&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

stream.stop()

streamer.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数设置</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 设置帧率，stream.framerate表示从网络摄像头中读取帧率，如果没有设置帧率则默认为25
# stream_params = {&quot;-input_framerate&quot;:stream.framerate}

# 设置不同流
# stream_params = {
#     &quot;-streams&quot;: [
#         {&quot;-resolution&quot;: &quot;1280x720&quot;, &quot;-framerate&quot;: 30.0}, 
#         {&quot;-resolution&quot;: &quot;640x360&quot;, &quot;-framerate&quot;: 60.0}, 
#         {&quot;-resolution&quot;: &quot;320x240&quot;, &quot;-video_bitrate&quot;: &quot;500k&quot;},
#     ],
# }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-webgear" tabindex="-1"><a class="header-anchor" href="#_8-webgear" aria-hidden="true">#</a> 8 WebGear</h2><p>WebGear简单来说用于将实时视频帧传输到网络中的任何网络浏览器。不过这个只是普通的demo展示，实际工程不会这样使用。此外WebGear的代码都应该在命令行下运行。</p><h3 id="_8-1-webgear的使用" tabindex="-1"><a class="header-anchor" href="#_8-1-webgear的使用" aria-hidden="true">#</a> 8.1 WebGear的使用</h3><p>WebGear依赖于带有asyncio支持的VidGear，安装方式如下：</p><blockquote><p>pip install vidgear[asyncio]</p></blockquote><p><strong>基础使用</strong></p>`,45),A={href:"https://www.uvicorn.org/",target:"_blank",rel:"noopener noreferrer"},S=d(`<div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import uvicorn
from vidgear.gears.asyncio import WebGear

# 参数设置
options = {
    &quot;frame_size_reduction&quot;: 40, # frame尺寸减少40%
    &quot;jpeg_compression_quality&quot;: 80, # jpeg图质量
    &quot;jpeg_compression_fastdct&quot;: True, # 使用fastdct快速编码
    &quot;jpeg_compression_fastupsample&quot;: False,
}

# 初始化
web = WebGear(source=&quot;test.mp4&quot;, logging=True, **options)

# 利用Uvicorn创建服务器播放视频，地址：http://localhost:8000/
uvicorn.run(web(), host=&quot;localhost&quot;, port=8000)

# 关闭
web.shutdown()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>与OpenCV一同使用</strong></p><p>WebGear自定义视频源，如设置从OpenCV获得图像。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import uvicorn, asyncio, cv2
from vidgear.gears.asyncio import WebGear
from vidgear.gears.asyncio.helper import reducer

# 初始化，自定义输入源无法使用配置参数
web = WebGear(logging=True)


async def my_frame_producer():
    
    stream = cv2.VideoCapture(0)
    while True:
        (grabbed, frame) = stream.read()
        if not grabbed:
            break

        # 图像尺寸减少比例为30%
        frame = await reducer(frame, percentage=30, interpolation=cv2.INTER_AREA)  
        # 图像编码
        encodedImage = cv2.imencode(&quot;.jpg&quot;, frame)[1].tobytes()
        # 发送图片
        yield (b&quot;--frame\\r\\nContent-Type:image/jpeg\\r\\n\\r\\n&quot; + encodedImage + b&quot;\\r\\n&quot;)
        await asyncio.sleep(0)
    stream.release()


# 自定义图像生成器
web.config[&quot;generator&quot;] = my_frame_producer

uvicorn.run(web(), host=&quot;localhost&quot;, port=8000)

web.shutdown()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>添加网页路由</strong></p><p>添加网页路由就是在指定网站中添加一个新的网页，比如hello.html中的内容如下。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>header</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>This is Hello world page<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>header</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>你好，世界！<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下代码实现当输入http://localhost:8000/hello可打开hello.html。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import uvicorn, asyncio
from starlette.templating import Jinja2Templates
from starlette.routing import Route
from vidgear.gears.asyncio import WebGear

# 设置网页文件根目录
template = Jinja2Templates(directory=&quot;./myweb&quot;)

# 设置另外一个网页，hello.html位于./myweb目录下
async def hello_world(request):
    page = &quot;hello.html&quot;
    context = {&quot;request&quot;: request}
    return template.TemplateResponse(page, context)


# 配置参数
options = {
    &quot;frame_size_reduction&quot;: 40,
    &quot;jpeg_compression_quality&quot;: 80,
    &quot;jpeg_compression_fastdct&quot;: True,
    &quot;jpeg_compression_fastupsample&quot;: False,
}

web = WebGear(
    source=&quot;test.mp4&quot;, logging=True, **options
) 

# 添加路由，即打开http://localhost:8000/hello访问hello.html中的内容
web.routes.append(Route(&quot;/hello&quot;, endpoint=hello_world))

uvicorn.run(web(), host=&quot;localhost&quot;, port=8000)

web.shutdown()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将NetGear_Async与WebGear一起使用</strong></p><p>以下代码通过NetGear_Async传输服务端的数据给客户端，然后客户端展示数据。</p><p>服务端代码如下：</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears.asyncio import NetGear_Async
import cv2, asyncio

# 初始化服务端
# address写客户端的ip
server = NetGear_Async(
    source=None,
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    protocol=&quot;tcp&quot;,
    pattern=1,
    logging=True,
)

# 自定义数据
async def my_frame_generator():

    # 打开视频
    stream = cv2.VideoCapture(0)

    # 读取视频
    while True:

        (grabbed, frame) = stream.read()

        if not grabbed:
            break

        yield frame
        await asyncio.sleep(0)

    stream.release()


if __name__ == &quot;__main__&quot;:
    asyncio.set_event_loop(server.loop)
    # 设置数据来源
    server.config[&quot;generator&quot;] = my_frame_generator()
    # 启动服务
    server.launch()
    try:
        server.loop.run_until_complete(server.task)
    except (KeyboardInterrupt, SystemExit):
        pass
    finally:
        server.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端代码如下：</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from vidgear.gears.asyncio import NetGear_Async
from vidgear.gears.asyncio import WebGear
from vidgear.gears.asyncio.helper import reducer
import uvicorn, asyncio, cv2


client = NetGear_Async(
    address=&quot;0.0.0.0&quot;,
    port=&quot;5454&quot;,
    receive_mode=True,
    pattern=1,
    logging=True,
).launch()


async def my_frame_producer():

    async for frame in client.recv_generator():
        # 压缩得到的图片
        frame = await reducer(
            frame, percentage=30, interpolation=cv2.INTER_AREA
        )  

        encodedImage = cv2.imencode(&quot;.jpg&quot;, frame)[1].tobytes()
        yield (b&quot;--frame\\r\\nContent-Type:image/jpeg\\r\\n\\r\\n&quot; + encodedImage + b&quot;\\r\\n&quot;)
        await asyncio.sleep(0)


if __name__ == &quot;__main__&quot;:
    asyncio.set_event_loop(client.loop)

    web = WebGear(logging=True)

    web.config[&quot;generator&quot;] = my_frame_producer

    # http://localhost:8000/展示数据
    uvicorn.run(web(), host=&quot;localhost&quot;, port=8000)

    client.close()

    web.shutdown()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-webgear-rtc" tabindex="-1"><a class="header-anchor" href="#_8-2-webgear-rtc" aria-hidden="true">#</a> 8.2 WebGear_RTC</h3><p>WebGear_RTC在许多方面与WeGear相似，但在底层使用WebRTC技术，这使其适用性更好。WebGear_RTC必须使用vidgear[asyncio]安装代码如下：</p><blockquote><p>pip install vidgear[asyncio]</p></blockquote><p>此外WebGear_RTC也需要aiortc，aiortc需要使用Microsoft Visual C++ 14.0。安装如下：</p><blockquote><p>pip install aiortc</p></blockquote><p><strong>基础使用</strong></p><p>打开网站后会多一个视频控制条。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import uvicorn
from vidgear.gears.asyncio import WebGear_RTC

# 设置视频参数
options = {
    &quot;frame_size_reduction&quot;: 25,
}

web = WebGear_RTC(source=&quot;test.mp4&quot;, logging=True, **options)
# 打开http://localhost:8000访问内容
uvicorn.run(web(), host=&quot;localhost&quot;, port=8000)

web.shutdown()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启用实时播放</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>import uvicorn
from vidgear.gears.asyncio import WebGear_RTC

# enable_live_broadcast设置直播流
options = {
    &quot;frame_size_reduction&quot;: 30,
    &quot;enable_live_broadcast&quot;: True,
}


web = WebGear_RTC(source=&quot;test.mp4&quot;, logging=True, **options)

# 打开http://localhost:8000/播放视频
uvicorn.run(web(), host=&quot;0.0.0.0&quot;, port=8000)


web.shutdown()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-help方法" tabindex="-1"><a class="header-anchor" href="#_9-help方法" aria-hidden="true">#</a> 9 help方法</h2><p>下面代码展示了vidgear常用工具方法的使用。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># asyncio版本
# from vidgear.gears.asyncio.helper import *

from vidgear.gears.helper import *
import cv2
# 打印opencv大版本号
print(check_CV_version())
# 检查OpenCV是否使用Gstreamer
print(check_gstreamer_support())
# 安全创建文件夹
mkdir_safe(dir_path=&quot;build&quot;)
# 安全删除文件夹build中的demo.py文件
delete_ext_safe(dir_path=&quot;build&quot;, extensions=&quot;demo.py&quot;)

# 将opencv图像的宽高缩小百分之percentage
img = cv2.imread(&quot;test.jpg&quot;)
img_ = reducer(img, percentage=30)
print(&#39;w ratio is:{}, h ratio is:{}&#39;.format(img_.shape[1]/img.shape[1],
      img_.shape[0]/img.shape[0]))

# 创建一个和img一样尺寸的纯黑图像（所有像素值为0）
img_ = create_blank_frame(img)
# 创建一个和img一样尺寸的纯黑图像，然后在图中绘制文字text
img_ = create_blank_frame(img, text=&quot;hello&quot;)

# 把dict类型转换为arg列表
param = {&quot;first&quot;: 1, &quot;second&quot;: 2}
param_arg = dict2Args(param)
print(param_arg)

# 判断指定路径是否有读写权限,is_windows表示当前为windows系统
print(check_WriteAccess(&quot;./&quot;, is_windows=True))

# 查看指定address的port是否被占用
print(check_open_port(&#39;127.0.0.1&#39;, 135))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-参考" tabindex="-1"><a class="header-anchor" href="#_10-参考" aria-hidden="true">#</a> 10 参考</h2><h3 id="vidgear基础" tabindex="-1"><a class="header-anchor" href="#vidgear基础" aria-hidden="true">#</a> VidGear基础</h3>`,30),R={href:"https://github.com/abhiTronix/vidgear",target:"_blank",rel:"noopener noreferrer"},I={href:"https://abhitronix.github.io/vidgear/latest/",target:"_blank",rel:"noopener noreferrer"},z=e("h3",{id:"camgear",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#camgear","aria-hidden":"true"},"#"),i(" CamGear")],-1),j={href:"https://github.com/yt-dlp/yt-dlp",target:"_blank",rel:"noopener noreferrer"},K={href:"https://github.com/yt-dlp/yt-dlp/tree/66cf3e1001b6d9a2829fe834c3f9103b0890918e/yt_dlp/extractor",target:"_blank",rel:"noopener noreferrer"},E={href:"https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md",target:"_blank",rel:"noopener noreferrer"},B={href:"https://abhitronix.github.io/vidgear/latest/gears/camgear/advanced/source_params/",target:"_blank",rel:"noopener noreferrer"},L={href:"https://blog.csdn.net/LuohenYJ/article/details/89403227",target:"_blank",rel:"noopener noreferrer"},M=e("h3",{id:"videogear",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#videogear","aria-hidden":"true"},"#"),i(" VideoGear")],-1),H={href:"https://blog.csdn.net/LuohenYJ/article/details/88355444",target:"_blank",rel:"noopener noreferrer"},D=e("h3",{id:"writegear",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#writegear","aria-hidden":"true"},"#"),i(" WriteGear")],-1),U={href:"https://abhitronix.github.io/vidgear/latest/gears/writegear/compression/advanced/cciw/",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://github.com/aler9/rtsp-simple-server",target:"_blank",rel:"noopener noreferrer"},J={href:"https://blog.csdn.net/qq_43994782/article/details/118941373",target:"_blank",rel:"noopener noreferrer"},X=e("h3",{id:"netgear",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#netgear","aria-hidden":"true"},"#"),i(" NetGear")],-1),Q={href:"https://abhitronix.github.io/vidgear/latest/gears/netgear/advanced/multi_client/",target:"_blank",rel:"noopener noreferrer"},Z=e("h3",{id:"webgear",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#webgear","aria-hidden":"true"},"#"),i(" WebGear")],-1),$={href:"https://www.uvicorn.org/",target:"_blank",rel:"noopener noreferrer"};function ee(ie,ne){const n=a("ExternalLinkIcon");return l(),v("div",null,[u,m,c,o,e("p",null,[i("VidGear的官方仓库见"),e("a",b,[i("vidgear"),s(n)]),i("，VideGear官方文档库见："),e("a",p,[i("vidgear_doc"),s(n)])]),g,e("p",null,[i("在设置视频源的时候指定stream_mode=True，表示设置读取流媒体，可以从各种视频网站和音乐网站读取数据。该功能主要通过"),e("a",h,[i("yt-dlp"),s(n)]),i("实现，yt-dlp是一个非常出名用于网络媒体网站下载的python库。yt-dlp支持读取的网络媒体网站见："),e("a",q,[i("yt-dlp-supportedsites"),s(n)]),i("，由于一些原因，其中支持的网络媒体网站可能无法读取。yt-dlp支持的媒体网站链接实例可以见"),e("a",_,[i("yt_dlp|extractor"),s(n)]),i("，每个py文件代表一个网站读取实例，打开某个py文件后有调用链接示例。")]),f,e("p",null,[i("通过设置Options可以设置OpenCV中VideoCapture的CAP_PROP类别参数，但是参数是否起作用取决摄像头。具体支持的参数介绍见："),e("a",y,[i("CamGear视频设置参数"),s(n)])]),G,e("p",null,[i("在这篇文章中"),e("a",k,[i("OpenCV获取网络摄像头实时视频流"),s(n)]),i("描述了如何用OpenCV获取实时视频流，但是这种方式不稳定。vidgear提供了更加稳定的视频流读取方案。具体的demo如下，在下面的demo中其实用CamGear就可以直接读取视频流，但是视频流经常中断，所以增加了重连代码。视频流可以是rtmp，rtsp，http等主流协议。相关公开测试视频流地址为：")]),w,e("p",null,[i("下图展示了VideoGear的功能，即读取视频，然后进行视频稳流。想要知道视频稳流具体如何实现可以阅读："),e("a",x,[i("基于特征点匹配的视频稳像"),s(n)])]),P,e("p",null,[i("WriteGear的压缩模式基于FFmpeg内置编码器对无损多媒体文件进行编码，通过execute_ffmpeg_cmd可以设置不同的FFmpeg参数。但是如果运行环境没有安装ffempeg，那么即使设置为压缩模型，也会切换为无压缩模式。关于的使用见"),e("a",T,[i("execute_ffmpeg_cmd"),s(n)]),i("。")]),C,e("p",null,[i("在vidgear的0.2.6以上版本，可以通过WriteGear推流给流服务器如rtsp服务器。但是首先需要搭建一个rtsp服务器，可以通过"),e("a",V,[i("rtsp-simple-server"),s(n)]),i("搭建一个非常简单的流媒体服务器。如何搭建rtsp-simple-server，可以看看"),e("a",N,[i("windows环境下python使用ffmpeg rtsp推流"),s(n)]),i("。当然也可以通过ffmpeg直接推流，vidgear只是提供了快捷接口，如果真心想从事音视频流媒体开发，ffmpeg必学。此外rtsp-simple-server是基于go语言开发的，好处就是开发效率高，有垃圾回收。但是主流的rtsp服务器搭建，都是基于C++语言，好处在于C++相关的流媒体现成库多，而且C++调用ffmpeg非常方便。")]),W,e("p",null,[i("用VidGear驱动多客户端模式有点不太稳定，具体的使用见"),e("a",F,[i("netgear_multi_client"),s(n)]),i("，这里不进行介绍。")]),O,e("p",null,[i("以下代码通过uvicorn创建web服务器播放视频（以图片形式展示），打开地址http://localhost:8000/即可看到结果。uvicorn是非常轻量快速的Python异步web框架，详情使用见"),e("a",A,[i("uvicorn"),s(n)]),i("。")]),S,e("ul",null,[e("li",null,[e("a",R,[i("vidgear"),s(n)])]),e("li",null,[e("a",I,[i("vidgear_doc"),s(n)])])]),z,e("ul",null,[e("li",null,[e("a",j,[i("yt-dlp"),s(n)])]),e("li",null,[e("a",K,[i("yt_dlp|extractor"),s(n)])]),e("li",null,[e("a",E,[i("yt-dlp-supportedsites"),s(n)])]),e("li",null,[e("a",B,[i("CamGear视频设置参数"),s(n)])]),e("li",null,[e("a",L,[i("OpenCV获取网络摄像头实时视频流"),s(n)])])]),M,e("ul",null,[e("li",null,[e("a",H,[i("基于特征点匹配的视频稳像"),s(n)])])]),D,e("ul",null,[e("li",null,[e("a",U,[i("execute_ffmpeg_cmd"),s(n)])]),e("li",null,[e("a",Y,[i("rtsp-simple-server"),s(n)])]),e("li",null,[e("a",J,[i("windows环境下python使用ffmpeg rtsp推流"),s(n)])])]),X,e("ul",null,[e("li",null,[e("a",Q,[i("netgear_multi_client"),s(n)])])]),Z,e("ul",null,[e("li",null,[e("a",$,[i("uvicorn"),s(n)])])])])}const re=r(t,[["render",ee],["__file","2022-08-12-_常用工具_ Python视频处理库VidGear使用指北.html.vue"]]);export{re as default};
