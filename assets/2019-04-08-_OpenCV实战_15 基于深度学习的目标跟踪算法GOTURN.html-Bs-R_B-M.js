import{_ as t,c as n,a as r,o}from"./app-HB0Nuzez.js";const a={};function i(p,e){return o(),n("div",null,e[0]||(e[0]=[r(`<h1 id="opencv实战-15-基于深度学习的目标跟踪算法goturn" tabindex="-1"><a class="header-anchor" href="#opencv实战-15-基于深度学习的目标跟踪算法goturn"><span>[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN</span></a></h1><p>在这篇文章中，我们将学习一种基于深度学习的目标跟踪算法GOTURN。GOTURN在Caffe中搭建，现在已移植到OpenCV Tracking API，我们将使用此API在C ++和Python中使用GOTURN。</p><h2 id="_1-什么是对象跟踪和goturn" tabindex="-1"><a class="header-anchor" href="#_1-什么是对象跟踪和goturn"><span><strong>1 什么是对象跟踪和GOTURN</strong></span></a></h2><p>对象跟踪的目标是跟踪视频序列中的对象。使用视频序列的帧和边界框初始化跟踪算法，以获得我们感兴趣的对象的位置。跟踪算法输出所有后续帧的边界框。有关对象跟踪的更多详细信息，请查看我们关于OpenCV目标跟踪API的帖子。</p><p><a href="https://blog.csdn.net/LuohenYJ/article/details/89029816" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/LuohenYJ/article/details/89029816</a></p><p>GOTURN是Generic Object Tracking Using Regression Networks的缩写，是一种基于深度学习的跟踪算法。</p><p>大多数跟踪算法都以在线方式进行训练。换句话说，跟踪算法学习在运行时不停获取被跟踪对象的特点。因此，许多实时跟踪器依赖于在线学习算法，这些算法通常比基于深度学习的解决方案快得多。GOTURN通过以离线方式学习对象的运动，改变了我们将深度学习应用于跟踪问题的方式。GOTURN模型在数千个视频序列上进行训练，不需要在运行时进行任何学习。</p><p>GOTURN主要论文见：</p><p><a href="http://davheld.github.io/GOTURN/GOTURN.pdf" target="_blank" rel="noopener noreferrer"> http://davheld.github.io/GOTURN/GOTURN.pdf</a></p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN/20190408104316668.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如上图所示GOTURN将两个裁剪帧作为输入，并输出第二帧中对象周围的边界框。在第一帧（也称为前一帧）中对象的位置是已知的，裁剪前一帧并且被裁剪帧大小为对象边界框的两倍大小。第一个裁剪框中的对象始终居中。用于裁剪第一帧的边界框也用于裁剪第二帧中对象的位置（也称为当前帧）。由于对象可能已移动，因此对象不在第二帧中居中。训练卷积神经网络（CNN）以预测第二帧中边界框的位置。</p><p>下图所示为GOTURN的架构。如前所述，它需要两个裁剪框作为输入。请注意，底部为前一帧，上面为第二帧（当前帧）。我们的目标就是在当前帧画出目标的边界框。</p><p>两个帧都通过一组卷积层。即CaffeNet架构的前五个卷积层。这些卷积层的输出被连接成长度为4096的单个矢量。输出层的节点有四个，表示预测框的左上角顶点坐标和右下角顶点坐标。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN/20190408104316690.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-在opencv-中使用goturn" tabindex="-1"><a class="header-anchor" href="#_2-在opencv-中使用goturn"><span><strong>2 在OpenCV</strong> <strong>中使用GOTURN</strong></span></a></h2><p>作者发布了GOTURN的caffe模型。您可以使用Caffe尝试，但在本教程中，我们将使用OpenCV的跟踪API。步骤如下:</p><p>1）下载GOTURN模型文件</p><p>GOTURN的模型文件见： <a href="https://github.com/spmallick/goturn-files" target="_blank" rel="noopener noreferrer"> https://github.com/spmallick/goturn-files </a></p><p>需要下载的是GOTURN的caffemodel and prototxt文件。约370 MB。</p><p>2）把caffemodel和prototxt文件放到和函数调用文件cpp/py文件同一个目录下，文件名必须为goturn.caffemodel和goturn.prototxt，模型下载下来不用改名字就行了。</p><p>3）代码实现，类似其他OpenCV调用模块，OpenCV版本3.4.3以上</p><p>依然是创建跟踪函数模型，更新函数模型。当跟踪器失败时，tracker.update返回0（false）。如果我们将跟踪器与检测器一起使用，则可以使用此信息。当跟踪器发生故障时，检测器可用于检测对象并重新初始化跟踪器。</p><p>代码下载地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>代码如下：</p><p>C++:</p><pre><code>// GOTURN_SingleTracker.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/tracking.hpp&gt;

using namespace cv;
using namespace std;

int main()
{
	// Create tracker
	Ptr&lt;Tracker&gt; tracker = TrackerGOTURN::create();

	// Read video
	VideoCapture video(&quot;video/chaplin.mp4&quot;);

	// Exit if video is not opened
	if (!video.isOpened())
	{
		cout &lt;&lt; &quot;Could not read video file&quot; &lt;&lt; endl;
		return EXIT_FAILURE;
	}

	// Read first frame
	Mat frame;
	if (!video.read(frame))
	{
		cout &lt;&lt; &quot;Cannot read video file&quot; &lt;&lt; endl;
		return EXIT_FAILURE;
	}

	// Define initial boundibg box
	Rect2d bbox(287, 23, 86, 320);

	// Uncomment the line below to select a different bounding box
	//bbox = selectROI(frame, false);

	// Initialize tracker with first frame and bounding box
	tracker-&gt;init(frame, bbox);

	while (video.read(frame))
	{
		// Start timer
		double timer = (double)getTickCount();

		// Update the tracking result
		bool ok = tracker-&gt;update(frame, bbox);

		// Calculate Frames per second (FPS)
		float fps = getTickFrequency() / ((double)getTickCount() - timer);

		if (ok)
		{
			// Tracking success : Draw the tracked object
			rectangle(frame, bbox, Scalar(255, 0, 0), 2, 1);
		}
		else
		{
			// Tracking failure detected.
			putText(frame, &quot;Tracking failure detected&quot;, Point(100, 80), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 255), 2);
		}

		// Display tracker type on frame
		putText(frame, &quot;GOTURN Tracker&quot;, Point(100, 20), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50, 170, 50), 2);

		// Display FPS on frame
		putText(frame, &quot;FPS : &quot; + to_string(int(fps)), Point(100, 50), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50, 170, 50), 2);
		// Display frame.
		imshow(&quot;Tracking&quot;, frame);

		// Exit if ESC pressed.
		if (waitKey(1) == 27) break;
	}

	return 0;
}
</code></pre><p>python:</p><pre><code># Import modules
import cv2, sys, os

if  not (os.path.isfile(&#39;goturn.caffemodel&#39;) and os.path.isfile(&#39;goturn.prototxt&#39;)):
    errorMsg = &#39;&#39;&#39;
    Could not find GOTURN model in current directory.
    Please ensure goturn.caffemodel and goturn.prototxt are in the current directory
    &#39;&#39;&#39;

    print(errorMsg)
    sys.exit()

# Create tracker
tracker = cv2.TrackerGOTURN_create()   

# Read video
video = cv2.VideoCapture(&quot;chaplin.mp4&quot;)

# Exit if video not opened
if not video.isOpened():
    print(&quot;Could not open video&quot;)
    sys.exit()

# Read first frame
ok,frame = video.read()
if not ok:
    print(&quot;Cannot read video file&quot;)
    sys.exit()


# Define a bounding box
bbox = (276, 23, 86, 320)

# Uncomment the line below to select a different bounding box
bbox = cv2.selectROI(frame, False)

# Initialize tracker with first frame and bounding box
ok = tracker.init(frame,bbox)

while True:
    # Read a new frame
    ok, frame = video.read()
    if not ok:
        break

    # Start timer
    timer = cv2.getTickCount()

    # Update tracker
    ok, bbox = tracker.update(frame)

    # Calculate Frames per second (FPS)
    fps = cv2.getTickFrequency() / (cv2.getTickCount() - timer);

    # Draw bounding box
    if ok:
        # Tracking success
        p1 = (int(bbox[0]), int(bbox[1]))
        p2 = (int(bbox[0] + bbox[2]), int(bbox[1] + bbox[3]))
        cv2.rectangle(frame, p1, p2, (255,0,0), 2, 1)
    else :
        # Tracking failure
        cv2.putText(frame, &quot;Tracking failure detected&quot;, (100,80), cv2.FONT_HERSHEY_SIMPLEX, 0.75,(0,0,255),2)

    # Display tracker type on frame
    cv2.putText(frame, &quot;GOTURN Tracker&quot;, (100,20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50),2);

    # Display FPS on frame
    cv2.putText(frame, &quot;FPS : &quot; + str(int(fps)), (100,50), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50), 2);

    # Display result
    cv2.imshow(&quot;Tracking&quot;, frame)
 
    # Exit if ESC pressed
    k = cv2.waitKey(1) &amp; 0xff
    if k == 27:
        break
</code></pre><h2 id="_3-goturn-优缺点" tabindex="-1"><a class="header-anchor" href="#_3-goturn-优缺点"><span><strong>3 GOTURN</strong> <strong>优缺点</strong></span></a></h2><p>与其他基于深度学习的跟踪器相比，GOTURN速度更快。它在Caffe的GPU上以100FPS运行，在OpenCV CPU中以20FPS运行。即使跟踪器是通用的，理论上，通过使用特定类型的对象偏置训练集，可以在特定对象（例如行人）上获得优异的结果。</p><p>个人观点：</p><p>GOTURN速度和MIL水平差不多，如果是在特定对象上进行目标跟踪，精度能够达到KCF算法的水平。如果不是特定对象，精度和BOOSTING差不多。特定对象是指模型训练集的场景。总的来说GOTURN不推荐，还不如用KCF算法。除非你有大量数据训练GOTURN模型。不过有这个数据和算法还不如训练目标检测模型，每帧都检测。</p><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><p><a href="https://www.learnopencv.com/goturn-deep-learning-based-object-tracking/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/goturn-deep-learning-based-object-tracking/</a></p>`,35)]))}const l=t(a,[["render",i],["__file","2019-04-08-_OpenCV实战_15 基于深度学习的目标跟踪算法GOTURN.html.vue"]]),s=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-08-_OpenCV%E5%AE%9E%E6%88%98_15%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA%E7%AE%97%E6%B3%95GOTURN.html","title":"[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-08T10:47:10.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN 在这篇文章中，我们将学习一种基于深度学习的目标跟踪算法GOTURN。GOTURN在Caffe中搭建，现在已移植到OpenCV Tracking API，我们将使用此API在C ++和Python中使用GOTURN。 1 什么是对象跟踪和GOTURN 对象跟踪的目标是跟踪视频序列中的对象。...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-08-_OpenCV%E5%AE%9E%E6%88%98_15%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA%E7%AE%97%E6%B3%95GOTURN.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN"}],["meta",{"property":"og:description","content":"[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN 在这篇文章中，我们将学习一种基于深度学习的目标跟踪算法GOTURN。GOTURN在Caffe中搭建，现在已移植到OpenCV Tracking API，我们将使用此API在C ++和Python中使用GOTURN。 1 什么是对象跟踪和GOTURN 对象跟踪的目标是跟踪视频序列中的对象。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D15%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA%E7%AE%97%E6%B3%95GOTURN/20190408104316668.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2019-04-08T10:47:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D15%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA%E7%AE%97%E6%B3%95GOTURN/20190408104316668.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D15%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA%E7%AE%97%E6%B3%95GOTURN/20190408104316690.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-04-08T10:47:10.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 什么是对象跟踪和GOTURN","slug":"_1-什么是对象跟踪和goturn","link":"#_1-什么是对象跟踪和goturn","children":[]},{"level":2,"title":"2 在OpenCV 中使用GOTURN","slug":"_2-在opencv-中使用goturn","link":"#_2-在opencv-中使用goturn","children":[]},{"level":2,"title":"3 GOTURN 优缺点","slug":"_3-goturn-优缺点","link":"#_3-goturn-优缺点","children":[]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":5.96,"words":1787},"filePathRelative":"blog/opencv/opencv实战/2019-04-08-[OpenCV实战]15 基于深度学习的目标跟踪算法GOTURN.md","localizedDate":"2019年4月8日","excerpt":"\\n<p>在这篇文章中，我们将学习一种基于深度学习的目标跟踪算法GOTURN。GOTURN在Caffe中搭建，现在已移植到OpenCV Tracking API，我们将使用此API在C ++和Python中使用GOTURN。</p>\\n<h2><strong>1 什么是对象跟踪和GOTURN</strong></h2>\\n<p>对象跟踪的目标是跟踪视频序列中的对象。使用视频序列的帧和边界框初始化跟踪算法，以获得我们感兴趣的对象的位置。跟踪算法输出所有后续帧的边界框。有关对象跟踪的更多详细信息，请查看我们关于OpenCV目标跟踪API的帖子。</p>\\n<p><a href=\\"https://blog.csdn.net/LuohenYJ/article/details/89029816\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://blog.csdn.net/LuohenYJ/article/details/89029816</a></p>","autoDesc":true}');export{l as comp,s as data};
