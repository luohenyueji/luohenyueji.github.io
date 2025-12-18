import{_ as e,c as r,a as n,o as a}from"./app-B1QbUTkN.js";const c={};function o(i,t){return a(),r("div",null,t[0]||(t[0]=[n(`<h1 id="opencv实战-16-使用opencv实现多目标跟踪" tabindex="-1"><a class="header-anchor" href="#opencv实战-16-使用opencv实现多目标跟踪"><span>[OpenCV实战]16 使用OpenCV实现多目标跟踪</span></a></h1><p>在这篇文章中，我们将介绍如何在OpenCV中使用MultiTracker类实现多目标跟踪API。在深入了解详细信息之前，请查看下面列出的关于目标跟踪的帖子，以了解在OpenCV中实现的单个目标跟踪器的基础知识。同时需要安装opencv_contrib库，详细见：</p><p><a href="https://blog.csdn.net/LuohenYJ/article/details/89029816" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/LuohenYJ/article/details/89029816</a></p><p><a href="https://blog.csdn.net/LuohenYJ/article/details/89083351" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/LuohenYJ/article/details/89083351</a></p><h2 id="_1-背景介绍" tabindex="-1"><a class="header-anchor" href="#_1-背景介绍"><span><strong>1</strong> <strong>背景介绍</strong></span></a></h2><p>计算机视觉和机器学习的大多数初学者都学习对象检测。如果您是初学者，您可能会想到为什么我们需要对象跟踪。我们不能只检测每一帧中的物体吗？</p><p>让我们探讨一下跟踪有用的几个原因。</p><p>首先，当在视频帧中检测到多个对象（比如人）时，跟踪有助于跨帧确定对象的身份。</p><p>其次，在某些情况下，目标检测可能会失败，但仍可能跟踪对象，因为跟踪会考虑前一帧中对象的位置和外观。</p><p>第三，一些跟踪算法非常快，因为它们进行本地搜索而不是全局搜索。因此，我们可以通过每第n帧执行目标检测并在中间帧中跟踪对象来为我们的系统获得非常高的性能。</p><p>那么，为什么不在第一次检测后无限期地跟踪对象呢？跟踪算法有时可能会丢失其正在跟踪的对象。例如，当对象的运动太大时，跟踪算法可能无法跟上。通常会在目标跟踪一段时间后再次目标检测。</p><p>在本教程中，我们将只关注跟踪部分。我们要跟踪的对象将通过指定它们周围的边界框来获取。</p><h2 id="_2-基于multitracker-的多目标跟踪" tabindex="-1"><a class="header-anchor" href="#_2-基于multitracker-的多目标跟踪"><span><strong>2</strong> <strong>基于MultiTracker</strong> <strong>的多目标跟踪</strong></span></a></h2><p>OpenCV中的多目标跟踪器MultiTracker类提供了多目标跟踪的实现。但是这只是一个初步的实现，因为它只处理跟踪对象，而不对被跟踪对象进行任何优化。</p><h3 id="_2-1-创建单个对象跟踪器" tabindex="-1"><a class="header-anchor" href="#_2-1-创建单个对象跟踪器"><span>2.1 创建单个对象跟踪器</span></a></h3><p>多对象跟踪器只是单个对象跟踪器的集合。我们首先定义一个将跟踪器类型作为输入并创建跟踪器对象的函数。OpenCV有8种不同的跟踪器类型：BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE，CSRT。本文不使用GOTURN跟踪器。一般我们先给定跟踪器类的名称，再返回单跟踪器对象，然后建立多跟踪器类。</p><p>C++代码：</p><pre><code>vector&lt;string&gt; trackerTypes = {&quot;BOOSTING&quot;, &quot;MIL&quot;, &quot;KCF&quot;, &quot;TLD&quot;, &quot;MEDIANFLOW&quot;, &quot;GOTURN&quot;, &quot;MOSSE&quot;, &quot;CSRT&quot;};

/**
 * @brief Create a Tracker By Name object 根据设定的类型初始化跟踪器
 * 
 * @param trackerType 
 * @return Ptr&lt;Tracker&gt; 
 */
Ptr&lt;Tracker&gt; createTrackerByName(string trackerType)
{
	Ptr&lt;Tracker&gt; tracker;
	if (trackerType == trackerTypes[0])
		tracker = TrackerBoosting::create();
	else if (trackerType == trackerTypes[1])
		tracker = TrackerMIL::create();
	else if (trackerType == trackerTypes[2])
		tracker = TrackerKCF::create();
	else if (trackerType == trackerTypes[3])
		tracker = TrackerTLD::create();
	else if (trackerType == trackerTypes[4])
		tracker = TrackerMedianFlow::create();
	else if (trackerType == trackerTypes[5])
		tracker = TrackerGOTURN::create();
	else if (trackerType == trackerTypes[6])
		tracker = TrackerMOSSE::create();
	else if (trackerType == trackerTypes[7])
		tracker = TrackerCSRT::create();
	else
	{
		cout &lt;&lt; &quot;Incorrect tracker name&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;Available trackers are: &quot; &lt;&lt; endl;
		for (vector&lt;string&gt;::iterator it = trackerTypes.begin(); it != trackerTypes.end(); ++it)
		{
			std::cout &lt;&lt; &quot; &quot; &lt;&lt; *it &lt;&lt; endl;
		}
	}
	return tracker;
}
</code></pre><p>python代码：</p><pre><code>from __future__ import print_function
import sys
import cv2
from random import randint
 
trackerTypes = [&#39;BOOSTING&#39;, &#39;MIL&#39;, &#39;KCF&#39;,&#39;TLD&#39;, &#39;MEDIANFLOW&#39;, &#39;GOTURN&#39;, &#39;MOSSE&#39;, &#39;CSRT&#39;]
 
def createTrackerByName(trackerType):
  # Create a tracker based on tracker name
  if trackerType == trackerTypes[0]:
    tracker = cv2.TrackerBoosting_create()
  elif trackerType == trackerTypes[1]: 
    tracker = cv2.TrackerMIL_create()
  elif trackerType == trackerTypes[2]:
    tracker = cv2.TrackerKCF_create()
  elif trackerType == trackerTypes[3]:
    tracker = cv2.TrackerTLD_create()
  elif trackerType == trackerTypes[4]:
    tracker = cv2.TrackerMedianFlow_create()
  elif trackerType == trackerTypes[5]:
    tracker = cv2.TrackerGOTURN_create()
  elif trackerType == trackerTypes[6]:
    tracker = cv2.TrackerMOSSE_create()
  elif trackerType == trackerTypes[7]:
    tracker = cv2.TrackerCSRT_create()
  else:
    tracker = None
    print(&#39;Incorrect tracker name&#39;)
    print(&#39;Available trackers are:&#39;)
    for t in trackerTypes:
      print(t)
     
  return tracker
</code></pre><h3 id="_2-2-读取视频的第一帧" tabindex="-1"><a class="header-anchor" href="#_2-2-读取视频的第一帧"><span>2.2 读取视频的第一帧</span></a></h3><p>多对象跟踪器需要两个输入即一个视频帧和我们想要跟踪的所有对象的位置（边界框）。</p><p>给定此信息，跟踪器在所有后续帧中跟踪这些指定对象的位置。在下面的代码中，我们首先使用VideoCapture类加载视频并读取第一帧。稍后将使用它来初始化MultiTracker。</p><p>C++代码：</p><pre><code>	// Set tracker type. Change this to try different trackers. 选择追踪器类型
	string trackerType = trackerTypes[6];

	// set default values for tracking algorithm and video 视频读取
	string videoPath = &quot;video/run.mp4&quot;;

	// Initialize MultiTracker with tracking algo 边界框
	vector&lt;Rect&gt; bboxes;

	// create a video capture object to read videos 读视频
	cv::VideoCapture cap(videoPath);
	Mat frame;

	// quit if unable to read video file
	if (!cap.isOpened())
	{
		cout &lt;&lt; &quot;Error opening video file &quot; &lt;&lt; videoPath &lt;&lt; endl;
		return -1;
	}

	// read first frame 读第一帧
	cap &gt;&gt; frame;
</code></pre><p>python代码：</p><pre><code># Set video to load
videoPath = &quot;video/run.mp4&quot;
 
# Create a video capture object to read videos
cap = cv2.VideoCapture(videoPath)
 
# Read first frame
success, frame = cap.read()
# quit if unable to read the video file
if not success:
  print(&#39;Failed to read video&#39;)
  sys.exit(1)
</code></pre><h3 id="_2-3-在第一帧中确定我们跟踪的对象" tabindex="-1"><a class="header-anchor" href="#_2-3-在第一帧中确定我们跟踪的对象"><span>2.3 在第一帧中确定我们跟踪的对象</span></a></h3><p>接下来，我们需要在第一帧中找到我们想要跟踪的对象。OpenCV提供了一个名为selectROIs的函数，它弹出一个GUI来选择边界框（也称为感兴趣区域（ROI））。在C++版本中可以通过selectROIs允许您获取多个边界框，但在Python版本中，只能通过selectROI获得一个边界框。因此，在Python版本中，我们需要一个循环来获取多个边界框。对于每个对象，我们还选择随机颜色来显示边界框。selectROI函数步骤为先在图像上画框，然后按ENTER确定完成画框画下一个框。按ESC退出画框开始执行程序</p><p>代码如下所示。</p><p>C++代码：</p><pre><code>// Get bounding boxes for first frame
// selectROI&#39;s default behaviour is to draw box starting from the center
// when fromCenter is set to false, you can draw box starting from top left corner
bool showCrosshair = true;
bool fromCenter = false;
cout &lt;&lt; &quot;\\n==========================================================\\n&quot;;
cout &lt;&lt; &quot;OpenCV says press c to cancel objects selection process&quot; &lt;&lt; endl;
cout &lt;&lt; &quot;It doesn&#39;t work. Press Escape to exit selection process&quot; &lt;&lt; endl;
cout &lt;&lt; &quot;\\n==========================================================\\n&quot;;
cv::selectROIs(&quot;MultiTracker&quot;, frame, bboxes, showCrosshair, fromCenter);
 
// quit if there are no objects to track
if(bboxes.size() &lt; 1)
  return 0;
 
vector&lt;Scalar&gt; colors;  
getRandomColors(colors, bboxes.size()); 


// Fill the vector with random colors
void getRandomColors(vector&lt;Scalar&gt;&amp; colors, int numColors)
{
  RNG rng(0);
  for(int i=0; i &lt; numColors; i++)
    colors.push_back(Scalar(rng.uniform(0,255), rng.uniform(0, 255), rng.uniform(0, 255))); 
}
</code></pre><p>python代码：</p><pre><code>## Select boxes
bboxes = []
colors = [] 
 
# OpenCV&#39;s selectROI function doesn&#39;t work for selecting multiple objects in Python
# So we will call this function in a loop till we are done selecting all objects
while True:
  # draw bounding boxes over objects
  # selectROI&#39;s default behaviour is to draw box starting from the center
  # when fromCenter is set to false, you can draw box starting from top left corner
  bbox = cv2.selectROI(&#39;MultiTracker&#39;, frame)
  bboxes.append(bbox)
  colors.append((randint(0, 255), randint(0, 255), randint(0, 255)))
  print(&quot;Press q to quit selecting boxes and start tracking&quot;)
  print(&quot;Press any other key to select next object&quot;)
  k = cv2.waitKey(0) &amp; 0xFF
  if (k == 113):  # q is pressed
    break
 
print(&#39;Selected bounding boxes {}&#39;.format(bboxes))
</code></pre><h3 id="_2-4-初始化multitrackerer" tabindex="-1"><a class="header-anchor" href="#_2-4-初始化multitrackerer"><span>2.4 初始化MultiTrackerer</span></a></h3><p>到目前为止，我们已经读取了第一帧并获得了对象周围的边界框。这是我们初始化多对象跟踪器所需的所有信息。我们首先创建一个MultiTracker对象，并添加你要跟踪目标数的单个对象跟踪器。在此示例中，我们使用CSRT单个对象跟踪器，但您可以通过将下面的trackerType变量更改为本文开头提到的8个跟踪器时间之一来尝试其他跟踪器类型。该CSRT跟踪器是不是最快的，但它产生在我们尝试很多情况下，最好的结果。</p><p>您也可以使用包含在同一MultiTracker中的不同跟踪器，但当然，它没有多大意义。能用的不多。CSRT精度最高，KCF速度精度综合最好，MOSSE速度最快。</p><p>MultiTracker类只是这些单个对象跟踪器的包装器。正如我们在上一篇文章中所知道的那样，使用第一帧和边界框初始化单个对象跟踪器，该边界框指示我们想要跟踪的对象的位置。MultiTracker将此信息传递给它内部包装的单个目标跟踪器。</p><p>C++代码：</p><pre><code>	// Create multitracker 创建多目标跟踪类
	Ptr&lt;MultiTracker&gt; multiTracker = cv::MultiTracker::create();

	// initialize multitracker 初始化
	for (int i = 0; i &lt; bboxes.size(); i++)
	{
		multiTracker-&gt;add(createTrackerByName(trackerType), frame, Rect2d(bboxes[i]));
	}
</code></pre><p>python代码：</p><pre><code># Specify the tracker type
trackerType = &quot;CSRT&quot;   
 
# Create MultiTracker object
multiTracker = cv2.MultiTracker_create()
 
# Initialize MultiTracker 
for bbox in bboxes:
  multiTracker.add(createTrackerByName(trackerType), frame, bbox)
</code></pre><h3 id="_2-5-更新multitracker和显示结果" tabindex="-1"><a class="header-anchor" href="#_2-5-更新multitracker和显示结果"><span>2.5 更新MultiTracker和显示结果</span></a></h3><p>最后，我们的MultiTracker准备就绪，我们可以在新的帧中跟踪多个对象。我们使用MultiTracker类的update方法在新帧中定位对象。每个被跟踪对象的每个边界框都使用不同的颜色绘制。</p><p>Update函数会返回true和false。update如果跟踪失败会返回false，C++代码加了判断，Python没有加。但是要注意的是update函数哪怕返回了false，也会继续更新函数，给出边界框。所以返回false，建议停止追踪。</p><p>C++代码：</p><pre><code>	while (cap.isOpened())
	{
		// get frame from the video 逐帧处理
		cap &gt;&gt; frame;

		// stop the program if reached end of video
		if (frame.empty())
		{
			break;
		}

		//update the tracking result with new frame 更新每一帧
		bool ok = multiTracker-&gt;update(frame);
		if (ok == true)
		{
			cout &lt;&lt; &quot;Tracking success&quot; &lt;&lt; endl;
		}
		else
		{
			cout &lt;&lt; &quot;Tracking failure&quot; &lt;&lt; endl;
		}
		// draw tracked objects 画框
		for (unsigned i = 0; i &lt; multiTracker-&gt;getObjects().size(); i++)
		{
			rectangle(frame, multiTracker-&gt;getObjects()[i], colors[i], 2, 1);
		}

		// show frame
		imshow(&quot;MultiTracker&quot;, frame);

		// quit on x button
		if (waitKey(1) == 27)
		{
			break;
		}
	}
</code></pre><p>python代码：</p><pre><code># Process video and track objects
while cap.isOpened():
  success, frame = cap.read()
  if not success:
    break
   
  # get updated location of objects in subsequent frames
  success, boxes = multiTracker.update(frame)
 
  # draw tracked objects
  for i, newbox in enumerate(boxes):
    p1 = (int(newbox[0]), int(newbox[1]))
    p2 = (int(newbox[0] + newbox[2]), int(newbox[1] + newbox[3]))
    cv2.rectangle(frame, p1, p2, colors[i], 2, 1)
 
  # show frame
  cv2.imshow(&#39;MultiTracker&#39;, frame)
   
 
  # quit on ESC button
  if cv2.waitKey(1) &amp; 0xFF == 27:  # Esc pressed
    break
</code></pre><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码"><span><strong>3 结果和代码</strong></span></a></h2><p>就结果而言，多目标跟踪就是生成多个单目标跟踪器，每个单目标跟踪器跟踪一个对象。如果你想和目标检测结合，其中的对象框如果要自己设定，push一个Rect对象就行了。</p><pre><code>//自己设定对象的检测框
//x,y,width,height
//bboxes.push_back(Rect(388, 155, 30, 40));
//bboxes.push_back(Rect(492, 205, 50, 80));
</code></pre><p>总体来说精度和单目标跟踪器差不多，所耗时间差不多5到7倍，不同算法不同。</p><p>代码下载地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><p>完整代码如下：</p><p>C++：</p><pre><code>// Opencv_MultiTracker.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/tracking.hpp&gt;

using namespace cv;
using namespace std;

vector&lt;string&gt; trackerTypes = {&quot;BOOSTING&quot;, &quot;MIL&quot;, &quot;KCF&quot;, &quot;TLD&quot;, &quot;MEDIANFLOW&quot;, &quot;GOTURN&quot;, &quot;MOSSE&quot;, &quot;CSRT&quot;};

/**
 * @brief Create a Tracker By Name object 根据设定的类型初始化跟踪器
 * 
 * @param trackerType 
 * @return Ptr&lt;Tracker&gt; 
 */
Ptr&lt;Tracker&gt; createTrackerByName(string trackerType)
{
	Ptr&lt;Tracker&gt; tracker;
	if (trackerType == trackerTypes[0])
		tracker = TrackerBoosting::create();
	else if (trackerType == trackerTypes[1])
		tracker = TrackerMIL::create();
	else if (trackerType == trackerTypes[2])
		tracker = TrackerKCF::create();
	else if (trackerType == trackerTypes[3])
		tracker = TrackerTLD::create();
	else if (trackerType == trackerTypes[4])
		tracker = TrackerMedianFlow::create();
	else if (trackerType == trackerTypes[5])
		tracker = TrackerGOTURN::create();
	else if (trackerType == trackerTypes[6])
		tracker = TrackerMOSSE::create();
	else if (trackerType == trackerTypes[7])
		tracker = TrackerCSRT::create();
	else
	{
		cout &lt;&lt; &quot;Incorrect tracker name&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;Available trackers are: &quot; &lt;&lt; endl;
		for (vector&lt;string&gt;::iterator it = trackerTypes.begin(); it != trackerTypes.end(); ++it)
		{
			std::cout &lt;&lt; &quot; &quot; &lt;&lt; *it &lt;&lt; endl;
		}
	}
	return tracker;
}

/**
 * @brief Get the Random Colors object 随机涂色
 * 
 * @param colors 
 * @param numColors 
 */
void getRandomColors(vector&lt;Scalar&gt; &amp;colors, int numColors)
{
	RNG rng(0);
	for (int i = 0; i &lt; numColors; i++)
	{
		colors.push_back(Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255)));
	}
}

int main(int argc, char *argv[])
{
	// Set tracker type. Change this to try different trackers. 选择追踪器类型
	string trackerType = trackerTypes[7];

	// set default values for tracking algorithm and video 视频读取
	string videoPath = &quot;video/run.mp4&quot;;

	// Initialize MultiTracker with tracking algo 边界框
	vector&lt;Rect&gt; bboxes;

	// create a video capture object to read videos 读视频
	cv::VideoCapture cap(videoPath);
	Mat frame;

	// quit if unable to read video file
	if (!cap.isOpened())
	{
		cout &lt;&lt; &quot;Error opening video file &quot; &lt;&lt; videoPath &lt;&lt; endl;
		return -1;
	}

	// read first frame 读第一帧
	cap &gt;&gt; frame;

	// draw bounding boxes over objects 在第一帧内确定对象框
	/*
		先在图像上画框，然后按ENTER确定画下一个框。按ESC退出画框开始执行程序
	*/
	cout &lt;&lt; &quot;\\n==========================================================\\n&quot;;
	cout &lt;&lt; &quot;OpenCV says press c to cancel objects selection process&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;It doesn&#39;t work. Press Esc to exit selection process&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;\\n==========================================================\\n&quot;;
	cv::selectROIs(&quot;MultiTracker&quot;, frame, bboxes, false);

	//自己设定对象的检测框
	//x,y,width,height
	//bboxes.push_back(Rect(388, 155, 30, 40));
	//bboxes.push_back(Rect(492, 205, 50, 80));
	// quit if there are no objects to track 如果没有选择对象
	if (bboxes.size() &lt; 1)
	{
		return 0;
	}

	vector&lt;Scalar&gt; colors;
	//给各个框涂色
	getRandomColors(colors, bboxes.size());

	// Create multitracker 创建多目标跟踪类
	Ptr&lt;MultiTracker&gt; multiTracker = cv::MultiTracker::create();

	// initialize multitracker 初始化
	for (int i = 0; i &lt; bboxes.size(); i++)
	{
		multiTracker-&gt;add(createTrackerByName(trackerType), frame, Rect2d(bboxes[i]));
	}

	// process video and track objects 开始处理图像
	cout &lt;&lt; &quot;\\n==========================================================\\n&quot;;
	cout &lt;&lt; &quot;Started tracking, press ESC to quit.&quot; &lt;&lt; endl;
	while (cap.isOpened())
	{
		// get frame from the video 逐帧处理
		cap &gt;&gt; frame;

		// stop the program if reached end of video
		if (frame.empty())
		{
			break;
		}

		//update the tracking result with new frame 更新每一帧
		bool ok = multiTracker-&gt;update(frame);
		if (ok == true)
		{
			cout &lt;&lt; &quot;Tracking success&quot; &lt;&lt; endl;
		}
		else
		{
			cout &lt;&lt; &quot;Tracking failure&quot; &lt;&lt; endl;
		}
		// draw tracked objects 画框
		for (unsigned i = 0; i &lt; multiTracker-&gt;getObjects().size(); i++)
		{
			rectangle(frame, multiTracker-&gt;getObjects()[i], colors[i], 2, 1);
		}

		// show frame
		imshow(&quot;MultiTracker&quot;, frame);

		// quit on x button
		if (waitKey(1) == 27)
		{
			break;
		}
	}
	waitKey(0);
	return 0;
}
</code></pre><p>Python：</p><pre><code>from __future__ import print_function
import sys
import cv2
from random import randint

trackerTypes = [&#39;BOOSTING&#39;, &#39;MIL&#39;, &#39;KCF&#39;,&#39;TLD&#39;, &#39;MEDIANFLOW&#39;, &#39;GOTURN&#39;, &#39;MOSSE&#39;, &#39;CSRT&#39;]

def createTrackerByName(trackerType):
  # Create a tracker based on tracker name
  if trackerType == trackerTypes[0]:
    tracker = cv2.TrackerBoosting_create()
  elif trackerType == trackerTypes[1]: 
    tracker = cv2.TrackerMIL_create()
  elif trackerType == trackerTypes[2]:
    tracker = cv2.TrackerKCF_create()
  elif trackerType == trackerTypes[3]:
    tracker = cv2.TrackerTLD_create()
  elif trackerType == trackerTypes[4]:
    tracker = cv2.TrackerMedianFlow_create()
  elif trackerType == trackerTypes[5]:
    tracker = cv2.TrackerGOTURN_create()
  elif trackerType == trackerTypes[6]:
    tracker = cv2.TrackerMOSSE_create()
  elif trackerType == trackerTypes[7]:
    tracker = cv2.TrackerCSRT_create()
  else:
    tracker = None
    print(&#39;Incorrect tracker name&#39;)
    print(&#39;Available trackers are:&#39;)
    for t in trackerTypes:
      print(t)
    
  return tracker

if __name__ == &#39;__main__&#39;:

  print(&quot;Default tracking algoritm is CSRT \\n&quot;
        &quot;Available tracking algorithms are:\\n&quot;)
  for t in trackerTypes:
      print(t)      

  trackerType = &quot;CSRT&quot;      

  # Set video to load
  videoPath = &quot;video/run.mp4&quot;
  
  # Create a video capture object to read videos
  cap = cv2.VideoCapture(videoPath)
 
  # Read first frame
  success, frame = cap.read()
  # quit if unable to read the video file
  if not success:
    print(&#39;Failed to read video&#39;)
    sys.exit(1)

  ## Select boxes
  bboxes = []
  colors = [] 

  # OpenCV&#39;s selectROI function doesn&#39;t work for selecting multiple objects in Python
  # So we will call this function in a loop till we are done selecting all objects
  while True:
    # draw bounding boxes over objects
    # selectROI&#39;s default behaviour is to draw box starting from the center
    # when fromCenter is set to false, you can draw box starting from top left corner
    bbox = cv2.selectROI(&#39;MultiTracker&#39;, frame)
    bboxes.append(bbox)
    colors.append((randint(64, 255), randint(64, 255), randint(64, 255)))
    print(&quot;Press q to quit selecting boxes and start tracking&quot;)
    print(&quot;Press any other key to select next object&quot;)
    k = cv2.waitKey(0) &amp; 0xFF
    if (k == 113):  # q is pressed
      break
  
  print(&#39;Selected bounding boxes {}&#39;.format(bboxes))

  ## Initialize MultiTracker
  # There are two ways you can initialize multitracker
  # 1. tracker = cv2.MultiTracker(&quot;CSRT&quot;)
  # All the trackers added to this multitracker
  # will use CSRT algorithm as default
  # 2. tracker = cv2.MultiTracker()
  # No default algorithm specified

  # Initialize MultiTracker with tracking algo
  # Specify tracker type
  
  # Create MultiTracker object
  multiTracker = cv2.MultiTracker_create()

  # Initialize MultiTracker 
  for bbox in bboxes:
    multiTracker.add(createTrackerByName(trackerType), frame, bbox)


  # Process video and track objects
  while cap.isOpened():
    success, frame = cap.read()
    if not success:
      break
    
    # get updated location of objects in subsequent frames
    success, boxes = multiTracker.update(frame)

    # draw tracked objects
    for i, newbox in enumerate(boxes):
      p1 = (int(newbox[0]), int(newbox[1]))
      p2 = (int(newbox[0] + newbox[2]), int(newbox[1] + newbox[3]))
      cv2.rectangle(frame, p1, p2, colors[i], 2, 1)

    # show frame
    cv2.imshow(&#39;MultiTracker&#39;, frame)
    

    # quit on ESC button
    if cv2.waitKey(1) &amp; 0xFF == 27:  # Esc pressed
      break
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span><strong>4 参考</strong></span></a></h2><ul><li><a href="https://www.learnopencv.com/multitracker-multiple-object-tracking-using-opencv-c-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/multitracker-multiple-object-tracking-using-opencv-c-python/ </a></li></ul>`,62)]))}const s=e(c,[["render",o],["__file","2019-04-08-_OpenCV实战_16 使用OpenCV实现多目标跟踪.html.vue"]]),p=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-08-_OpenCV%E5%AE%9E%E6%88%98_16%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%A4%9A%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA.html","title":"[OpenCV实战]16 使用OpenCV实现多目标跟踪","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-08T20:32:00.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]16 使用OpenCV实现多目标跟踪 在这篇文章中，我们将介绍如何在OpenCV中使用MultiTracker类实现多目标跟踪API。在深入了解详细信息之前，请查看下面列出的关于目标跟踪的帖子，以了解在OpenCV中实现的单个目标跟踪器的基础知识。同时需要安装opencv_contrib库，详细见： https://blog.csd...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-08-_OpenCV%E5%AE%9E%E6%88%98_16%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%A4%9A%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]16 使用OpenCV实现多目标跟踪"}],["meta",{"property":"og:description","content":"[OpenCV实战]16 使用OpenCV实现多目标跟踪 在这篇文章中，我们将介绍如何在OpenCV中使用MultiTracker类实现多目标跟踪API。在深入了解详细信息之前，请查看下面列出的关于目标跟踪的帖子，以了解在OpenCV中实现的单个目标跟踪器的基础知识。同时需要安装opencv_contrib库，详细见： https://blog.csd..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2019-04-08T20:32:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]16 使用OpenCV实现多目标跟踪\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-04-08T20:32:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景介绍","slug":"_1-背景介绍","link":"#_1-背景介绍","children":[]},{"level":2,"title":"2 基于MultiTracker 的多目标跟踪","slug":"_2-基于multitracker-的多目标跟踪","link":"#_2-基于multitracker-的多目标跟踪","children":[{"level":3,"title":"2.1 创建单个对象跟踪器","slug":"_2-1-创建单个对象跟踪器","link":"#_2-1-创建单个对象跟踪器","children":[]},{"level":3,"title":"2.2 读取视频的第一帧","slug":"_2-2-读取视频的第一帧","link":"#_2-2-读取视频的第一帧","children":[]},{"level":3,"title":"2.3 在第一帧中确定我们跟踪的对象","slug":"_2-3-在第一帧中确定我们跟踪的对象","link":"#_2-3-在第一帧中确定我们跟踪的对象","children":[]},{"level":3,"title":"2.4 初始化MultiTrackerer","slug":"_2-4-初始化multitrackerer","link":"#_2-4-初始化multitrackerer","children":[]},{"level":3,"title":"2.5 更新MultiTracker和显示结果","slug":"_2-5-更新multitracker和显示结果","link":"#_2-5-更新multitracker和显示结果","children":[]}]},{"level":2,"title":"3 结果和代码","slug":"_3-结果和代码","link":"#_3-结果和代码","children":[]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":11.79,"words":3537},"filePathRelative":"blog/opencv/opencv实战/2019-04-08-[OpenCV实战]16 使用OpenCV实现多目标跟踪.md","localizedDate":"2019年4月9日","excerpt":"\\n<p>在这篇文章中，我们将介绍如何在OpenCV中使用MultiTracker类实现多目标跟踪API。在深入了解详细信息之前，请查看下面列出的关于目标跟踪的帖子，以了解在OpenCV中实现的单个目标跟踪器的基础知识。同时需要安装opencv_contrib库，详细见：</p>\\n<p><a href=\\"https://blog.csdn.net/LuohenYJ/article/details/89029816\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://blog.csdn.net/LuohenYJ/article/details/89029816</a></p>","autoDesc":true}');export{s as comp,p as data};
