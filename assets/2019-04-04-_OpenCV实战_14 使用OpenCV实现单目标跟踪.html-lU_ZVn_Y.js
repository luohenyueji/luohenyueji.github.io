import{_ as t,c as n,a as r,o as a}from"./app-CJwJJlha.js";const p={};function o(c,e){return a(),n("div",null,e[0]||(e[0]=[r(`<h1 id="opencv实战-14-使用opencv实现单目标跟踪" tabindex="-1"><a class="header-anchor" href="#opencv实战-14-使用opencv实现单目标跟踪"><span>[OpenCV实战]14 使用OpenCV实现单目标跟踪</span></a></h1><p>在本教程中，我们将了解OpenCV 3中引入的OpenCV目标跟踪API。我们将学习如何以及何时使用OpenCV 3中提供的8种不同的跟踪器BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE和CSRT。我们还将学习目前跟踪算法的通用原理。OpenCV版本至少OpenCV3.4.1以上。同时需要调用opencv_contrib库，OpenCV大量的算法存放在opencv_contrib目录下面的未稳定功能模块里，release版本没有。</p><p>正如下面这个完美的实时面部跟踪器所示！动画演示了我们想要的理想目标跟踪器：速度，准确性和鲁棒性。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2017/02/real-time-face-tracking.gif" alt="Real time face tracking solved!" tabindex="0" loading="lazy"><figcaption>Real time face tracking solved!</figcaption></figure><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span><strong>1 背景</strong></span></a></h2><h3 id="_1-1-什么是目标跟踪" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是目标跟踪"><span><strong>1.1</strong> <strong>什么是目标跟踪</strong></span></a></h3><p>简而言之，在视频的连续帧中定位对象称为跟踪。该定义听起来很直接，但在计算机视觉和机器学习中，跟踪是一个非常广泛的术语，概念上相似但实现的技术却大大不同。例如，通常在目标跟踪有以下方法：</p><p>1）密集光流：这些算法有助于估计视频帧中每个像素的运动情况。</p><p>2）稀疏光流：这些算法，如Kanade-Lucas-Tomashi（KLT）特征跟踪器，跟踪图像中几个特征点的位置。</p><p>3）卡尔曼滤波：一种非常流行的信号处理算法，用于根据先前的运动信息预测运动物体的位置。该算法的早期应用之一是导弹制导！还提到这里，阿波罗11号登月舱的降落到月球车载计算机有一个卡尔曼滤波器。 <a href="https://www.cs.unc.edu/~welch/kalman/siam_cipra.html" target="_blank" rel="noopener noreferrer"> https://www.cs.unc.edu/~welch/kalman/siam_cipra.html</a></p><p>4）均值偏移(Meanshift)和Camshift(Meanshift的改进，连续自适应的MeanShift算法)：这些是用于定位密度函数的最大值的算法。它们也用于跟踪。</p><p>5）单目标跟踪算法：在此类跟踪器中，第一帧使用矩形表示我们要跟踪的对象的位置。然后使用跟踪算法在后续帧中跟踪对象。在大多数实际应用中，这些跟踪器与目标检测算法结合使用。</p><p>6）多目标跟踪算法：在我们有快速对象检测器的情况下，检测每个帧中的多个对象然后运行跟踪查找算法来识别一个帧中的哪个矩形对应于下一帧中的矩形是很有效的。</p><h3 id="_1-2-跟踪与检测" tabindex="-1"><a class="header-anchor" href="#_1-2-跟踪与检测"><span><strong>1.2</strong> <strong>跟踪与检测</strong></span></a></h3><p>如果你曾经用过OpenCV人脸检测，你知道它可以实时工作，你可以轻松地在每一帧中检测到脸部。那么，为什么你需要首先进行跟踪？让我们探讨一下您可能想要进行视频跟踪的原因，而不仅仅是重复检测。</p><p>1）跟踪比检测更快：通常跟踪算法比检测算法更快。原因很简单。当您跟踪在前一帧中检测到的对象时，您对该对象的外观了解很多。您还可以知道前一帧中的位置以及其运动的方向和速度。因此，在下一帧中，您可以使用所有这些信息来预测下一帧中对象的位置，并围绕对象的预期位置进行小搜索，以准确定位对象。一个好的跟踪算法将使用它对该对象的所有信息，而检测算法总是从头开始。因此，在设计高效的系统时，通常在每第n帧上运行物体检测，而在之间的n-1帧中采用跟踪算法。</p><p>为什么我们不直接检测第一帧中的对象并随后跟踪？确实，跟踪可以从它拥有的额外信息中获益，如果它们移动速度太快以至于跟踪算法无法赶上时，您也可能失去对象的跟踪。跟踪算法累积错误也很常见，跟踪对象的边界框会慢慢偏离其正在跟踪的对象。为了通过跟踪算法解决这些问题，每隔一段时间运行一次检测算法。</p><p>2）当检测失败时，跟踪可以提供帮助：如果您在视频上运行人脸检测器并且人脸被对象遮挡，则人脸检测器很可能会失败。另一方面，良好的跟踪算法将处理某种程度的遮挡。</p><p>3）跟踪保留标识：对象检测的输出是包含对象的矩形数组。但是，该对象没有附加标识。例如在第一张图检测到多个对象会画检测框，但是第二张图又检测多个对象。但是不知道哪个矩形对应于哪个对象。</p><h2 id="_2-opencv的目标跟踪函数" tabindex="-1"><a class="header-anchor" href="#_2-opencv的目标跟踪函数"><span>2 OpenCV的目标跟踪函数</span></a></h2><h3 id="_2-1-函数调用" tabindex="-1"><a class="header-anchor" href="#_2-1-函数调用"><span>2.1 函数调用</span></a></h3><p>OpenCV的扩展库OpenCV_contrib有一个目标跟踪API，其中包含许多单个对象跟踪算法的实现。OpenCV中有8种不同的跟踪器，分别是BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE和CSRT。本文只讲其中7种，GOTURN涉及到深度学习以后再讲。其他算法可以直接用OpenCV contrib库函数调用。</p><p>但是如果使用OpenCV_contrib函数库需要重新编译源代码。</p><p>C++需要编译源代码，具体见：</p><p>windows</p><p><a href="https://blog.csdn.net/weixin_42012977/article/details/82992962" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/weixin_42012977/article/details/82992962</a></p><p>linux</p><p><a href="https://blog.csdn.net/haoqimao_hard/article/details/82049565" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/haoqimao_hard/article/details/82049565 </a></p><p>Python稍微很简单，先卸载安装的Opencv，然后直接pip/pip3安装contrib库：</p><pre><code>pip uninstall opencv-python

pip install opencv-contrib-python
</code></pre><p>在我们提供算法的简要描述之前，让我们看一下参数设置和用法。在下面的注释代码中，我们首先通过选择跟踪器类型来设置跟踪器,BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE或CSRT。然后我们打开一个视频并逐帧读图。我们定义一个包含第一帧对象的边界框，并用第一帧和边界框初始化跟踪器。最后，我们从视频中读取帧更新跟踪器以获得当前帧的新边界框，并显示结果。</p><p>代码下载地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>代码如下：</p><p>C++：</p><pre><code>// Opencv_Tracker.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/tracking.hpp&gt;
#include &lt;opencv2/core/ocl.hpp&gt;

using namespace cv;
using namespace std;

int main()
{
	//跟踪算法类型
	string trackerTypes[7] = { &quot;BOOSTING&quot;, &quot;MIL&quot;, &quot;KCF&quot;, &quot;TLD&quot;,&quot;MEDIANFLOW&quot;, &quot;MOSSE&quot;, &quot;CSRT&quot; };

	// Create a tracker 创建跟踪器
	string trackerType = trackerTypes[5];

	Ptr&lt;Tracker&gt; tracker;

	if (trackerType == &quot;BOOSTING&quot;)
		tracker = TrackerBoosting::create();
	if (trackerType == &quot;MIL&quot;)
		tracker = TrackerMIL::create();
	if (trackerType == &quot;KCF&quot;)
		tracker = TrackerKCF::create();
	if (trackerType == &quot;TLD&quot;)
		tracker = TrackerTLD::create();
	if (trackerType == &quot;MEDIANFLOW&quot;)
		tracker = TrackerMedianFlow::create();
	if (trackerType == &quot;MOSSE&quot;)
		tracker = TrackerMOSSE::create();
	if (trackerType == &quot;CSRT&quot;)
		tracker = TrackerCSRT::create();

	// Read video 读视频
	VideoCapture video(&quot;video/chaplin.mp4&quot;);

	// Exit if video is not opened 如果没有视频文件
	if (!video.isOpened())
	{
		cout &lt;&lt; &quot;Could not read video file&quot; &lt;&lt; endl;
		return 1;
	}

	// Read first frame 读图
	Mat frame;
	bool ok = video.read(frame);

	// Define initial boundibg box 初始检测框
	Rect2d bbox(287, 23, 86, 320);

	// Uncomment the line below to select a different bounding box 手动在图像上画矩形框
	//bbox = selectROI(frame, false);

	// Display bounding box 展示画的2边缘框
	rectangle(frame, bbox, Scalar(255, 0, 0), 2, 1);
	imshow(&quot;Tracking&quot;, frame);

	//跟踪器初始化
	tracker-&gt;init(frame, bbox);

	while (video.read(frame))
	{
		// Start timer 开始计时
		double timer = (double)getTickCount();

		// Update the tracking result 跟新跟踪器算法
		bool ok = tracker-&gt;update(frame, bbox);

		// Calculate Frames per second (FPS) 计算FPS
		float fps = getTickFrequency() / ((double)getTickCount() - timer);

		if (ok)
		{
			// Tracking success : Draw the tracked object 如果跟踪到目标画框
			rectangle(frame, bbox, Scalar(255, 0, 0), 2, 1);
		}
		else
		{
			// Tracking failure detected. 没有就输出跟踪失败
			putText(frame, &quot;Tracking failure detected&quot;, Point(100, 80), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 255), 2);
		}

		// Display tracker type on frame 展示检测算法类型
		putText(frame, trackerType + &quot; Tracker&quot;, Point(100, 20), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50, 170, 50), 2);

		// Display FPS on frame 表示FPS
		putText(frame, &quot;FPS : &quot; + to_string(int(fps)), Point(100, 50), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(50, 170, 50), 2);

		// Display frame.
		imshow(&quot;Tracking&quot;, frame);

		// Exit if ESC pressed.
		int k = waitKey(1);
		if (k == 27)
		{
			break;
		}
	}
	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import sys


if __name__ == &#39;__main__&#39; :

    # Set up tracker.
    # Instead of MIL, you can also use

    tracker_types = [&#39;BOOSTING&#39;, &#39;MIL&#39;,&#39;KCF&#39;, &#39;TLD&#39;, &#39;MEDIANFLOW&#39;, &#39;MOSSE&#39;, &#39;CSRT&#39;]
    tracker_type = tracker_types[4]


    if tracker_type == &#39;BOOSTING&#39;:
        tracker = cv2.TrackerBoosting_create()
    if tracker_type == &#39;MIL&#39;:
        tracker = cv2.TrackerMIL_create()
    if tracker_type == &#39;KCF&#39;:
        tracker = cv2.TrackerKCF_create()
    if tracker_type == &#39;TLD&#39;:
        tracker = cv2.TrackerTLD_create()
    if tracker_type == &#39;MEDIANFLOW&#39;:
        tracker = cv2.TrackerMedianFlow_create()
    if tracker_type == &quot;CSRT&quot;:
        tracker = cv2.TrackerCSRT_create()
    if tracker_type == &quot;MOSSE&quot;:
    tracker = cv2.TrackerMOSSE_create()
    # Read video
    video = cv2.VideoCapture(&quot;video/chaplin.mp4&quot;)

    # Exit if video not opened.
    if not video.isOpened():
        print(&quot;Could not open video&quot;)
        sys.exit()

    # Read first frame.
    ok, frame = video.read()
    if not ok:
        print(&#39;Cannot read video file&#39;)
        sys.exit()
    
    # Define an initial bounding box
    bbox = (287, 23, 86, 320)

    # Uncomment the line below to select a different bounding box
    bbox = cv2.selectROI(frame, False)

    # Initialize tracker with first frame and bounding box
    ok = tracker.init(frame, bbox)

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
        cv2.putText(frame, tracker_type + &quot; Tracker&quot;, (100,20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50),2);
    
        # Display FPS on frame
        cv2.putText(frame, &quot;FPS : &quot; + str(int(fps)), (100,50), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50), 2);


        # Display result
        cv2.imshow(&quot;Tracking&quot;, frame)

        # Exit if ESC pressed
        k = cv2.waitKey(1) &amp; 0xff
        if k == 27 : break
</code></pre><h3 id="_2-2-函数详解" tabindex="-1"><a class="header-anchor" href="#_2-2-函数详解"><span>2.2 函数详解</span></a></h3><p>在本节中，我们将深入研究不同的跟踪算法。目标不是要对每个跟踪器有深入的理论理解，而是从实际的角度理解它们。</p><p>在跟踪中，我们的目标是在当前帧中找到前一帧已经识别或者跟踪到的一个对象。由于我们已经跟踪了当前帧的对象，因此我们知道它是如何移动的。换句话说，我们知道运动模型的参数。运动模型只是一种有效的方式，表示你知道前一帧中该物体的位置和速度。如果您对该对象一无所知，则可以根据当前运动模型预测新位置，并且获得的结果将非常接近对象的新位置。</p><p>当我们有更多物体的信息，我们可以构建一个外观模型来表示对象的外观。该外观模型可用于在由运动模型预测的位置的小邻域中搜索，以更准确地预测对象的位置。运动模型预测对象的大致位置。外观模型可以精确调整此估计值，以便根据外观提供更准确的估计。如果目标对象非常简单并且外观变化不大，我们可以使用一个简单的模板作为外观模型并查找该模板。然而，现实生活并非那么简单。对象的外观可能会发生巨大变化。为了解决这个问题，在许多现代目标跟踪器中，外观模型是以在线方式训练的分类器。</p><p>分类器的工作是将图像的矩形区域分类为对象或背景。分类器将图像块作为输入，并返回0到1之间的分数，以表示图像块包含对象的概率。当绝对确定图像块是背景时得分为0，当绝对确定图像块是前景对象时得分为1。在机器学习中，我们使用“在线”一词来指代在运行时即时训练的算法。一个离线分类可能需要成千上万的例子训练分类，而是一个在线分类器使用很少的例子在运行时进行训练。通过将其分为正（对象）和负（背景）示例来训练分类器。如果你想建立一个用于检测猫的分类器，你可以使用包含猫的数千张图像和数千张不含猫的图像来训练它。通过这种方式，分类器学会区分什么是猫而不是什么。但在构建在线分类器的同时，我们没有数千个正面和负面类的例子。所以我们需要通过在线训练跟踪器，来实现目标跟踪。</p><ol><li>BOOSTING Tracker/集成学习跟踪器</li></ol><p>该跟踪器基于AdaBoost的在线版本，即基于HAAR级联的检测器法。需要在运行时使用对象的正负示例训练此分类器。由用户（或另一个对象检测算法）提供的初始边界框被视为对象的正例，并且边界框外的许多图像块被视为背景。给定新帧，分类器在先前位置的邻域中的每个像素上运行，并且记录分类器的分数。对象的新位置是得分最大的位置。所以现在我们又有了一个分类器的正面例子。随着更多帧进入，分类器将使用此数据进行更新。</p><p>优点：没有。这个算法已有十年之久，并且运行正常，但我找不到使用它的充分理由，特别是当基于类似原理的其他高级跟踪器（MIL，KCF）可用时。</p><p>缺点：跟踪效果很普通，而且无法确定是否跟踪失败。</p><ol start="2"><li>MIL Tracker/多实例学习跟踪器</li></ol><p>该跟踪器在概念上类似于上述的BOOSTING跟踪器。最大的区别在于，不仅考虑对象的当前位置作为正例，而是在当前位置周围的小邻域产生若干潜在的正例。您可能认为这是一个坏主意，因为在大多数这些正样本的例子中，对象不是居中的。</p><p>这是多实例学习跟踪器（MIL）要解决的问题。在MIL中，您没有指定正负样本的图像块，而是正负例的图像集合。正图像集合中的图像块并非都是正例。意思就是正图像集中有若干图像块，但只需要其中一个图像块是正例。在我们的示例中，正图像集以对象当前位置为中心的图像块，以及在其周围的小邻域中的图像块。即使被跟踪对象的当前位置不准确，当来自当前位置真正的样本图像块被放入正图像集中，该正图像集能够至少包含一个正确的图像块。具体算法见： <a href="http://vision.ucsd.edu/~bbabenko/new/project_miltrack.shtml" target="_blank" rel="noopener noreferrer"> http://vision.ucsd.edu/~bbabenko/new/project_miltrack.shtml</a></p><p>优点：表现非常好。它不会像BOOSTING跟踪器那样结果漂移，并且在部分遮挡下可以完成合理的工作。但是相对KCF更好，不过MIL低版本的OpenCV也能使用，KCF版本要求更高。</p><p>缺点：无法检测是否跟踪失败，速度慢，且无法处理遮挡物体。</p><ol start="3"><li>KCF Tracker/核相关滤波跟踪器</li></ol><p>KCF跟踪器基于前两个跟踪器的思想，该跟踪器利用MIL跟踪器中使用的多个正样本具有大的重叠区域的特性。这种重叠的数据导致了一些很好的数学属性，这个属性被跟踪器利用，实现更快，更准确地跟踪。</p><p>优点：准确性和速度都优于MIL，同时会报告跟踪失败。</p><p>缺点：完全遮挡下效果不好。</p><ol start="4"><li>TLD Tracker/单目标长时间跟踪器</li></ol><p>顾名思义TLD表示跟踪，学习和检测，该跟踪器将长期跟踪任务分解为三个部分跟踪，学习和检测。跟踪器在帧与帧之间跟踪对象。并获取所有物体的外观并在必要时纠正跟踪器。学习估计跟踪器的错误并更新它以避免将来出现这些错误。这个跟踪器的输出往往会跳跃一下。例如，如果您正在跟踪行人并且场景中还有其他行人，则此跟踪器有时可以临时跟踪与您要跟踪的行人不同的行人。从积极的方面来说，这种追踪器算法可以在更大运动和遮挡范围跟踪物体。如果您有一个视频序列，其中对象隐藏在另一个对象后面，则此跟踪器可能是一个不错的选择。</p><p>优点：在多帧的遮挡下工作效果最佳，对于缩放的图像效果也不错。</p><p>缺点：很多误报使它几乎无法使用。</p><ol start="5"><li>MEDIANFLOW Tracker</li></ol><p>在内部，该跟踪器在时间上向前和向后方向上跟踪对象，并且测量这两个轨迹之间的差异。 最小化该ForwardBackward错误使它们能够可靠地检测跟踪失败并在视频序列中选择可靠的轨迹。</p><p>优点：跟踪失败会进行报告，当运动是可预测的并且没有遮挡时效果很好。</p><p>缺点：在大规模运动下失败。</p><ol start="6"><li>MOSSE tracker/相关滤波跟踪</li></ol><p>MOSSE使用自适应相关性进行目标跟踪，当使用单个帧初始化时产生稳定的相关滤波器。并最小化实际输出的卷积和期望输出卷积之间的方差来更新获得合适的滤波器。</p><p>优点：速度很快，容易实现</p><p>缺点：性能不那么好。速度不快。</p><ol start="7"><li>CSRT tracker/判别相关滤波器跟踪</li></ol><p>基于判别相关滤波器（DCF-CSR）中，是现在应用最广的跟踪算法。</p><p>优点：精度很高，比KCF快一点</p><p>缺点：速度很慢</p><h3 id="_2-3-综合评价" tabindex="-1"><a class="header-anchor" href="#_2-3-综合评价"><span>2.3 综合评价</span></a></h3><p>追踪器选择方法：</p><p>如果追求高准确度，又能忍受慢一些的速度，那么就用CSRT；</p><p>如果对准确度的要求不苛刻，想追求速度，那么就选KCF；</p><p>纯粹想节省时间就用MOSSE。</p><p>下表总结了不同版本的OpenCV中可使用的追踪器和具体速度情况。FPS在CPU(I5)下对640X360的视频进行跟踪所获得的平均结果。</p><table><thead><tr><th>Tracker</th><th>FPS</th><th>OpenCV Version</th></tr></thead><tbody><tr><td>BOOSTING</td><td>43.9</td><td>OpenCV 3.0+</td></tr><tr><td>MIL</td><td>11.0</td><td>OpenCV 3.0</td></tr><tr><td>KCF</td><td>48.0</td><td>OpenCV 3.2+</td></tr><tr><td>TLD</td><td>23.0</td><td>OpenCV 3.0</td></tr><tr><td>MEDIANFLOW</td><td>277.5</td><td>OpenCV 3.0+</td></tr><tr><td>MOSSE</td><td>144.2</td><td>OpenCV 3.1+</td></tr><tr><td>CSRT</td><td>16.3</td><td>OpenCV 3.43</td></tr></tbody></table><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><p><a href="https://www.learnopencv.com/object-tracking-using-opencv-cpp-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/object-tracking-using-opencv-cpp-python/</a></p></li><li><p><a href="https://www.jqr.com/article/000383" target="_blank" rel="noopener noreferrer"> https://www.jqr.com/article/000383 </a></p></li></ul>`,81)]))}const l=t(p,[["render",o],["__file","2019-04-04-_OpenCV实战_14 使用OpenCV实现单目标跟踪.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-04-_OpenCV%E5%AE%9E%E6%88%98_14%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%8D%95%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA.html","title":"[OpenCV实战]14 使用OpenCV实现单目标跟踪","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-04T17:37:23.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]14 使用OpenCV实现单目标跟踪 在本教程中，我们将了解OpenCV 3中引入的OpenCV目标跟踪API。我们将学习如何以及何时使用OpenCV 3中提供的8种不同的跟踪器BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE和CSRT。我们还将学习目前跟踪算法的通用原理。OpenCV版本至少...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-04-_OpenCV%E5%AE%9E%E6%88%98_14%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%8D%95%E7%9B%AE%E6%A0%87%E8%B7%9F%E8%B8%AA.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]14 使用OpenCV实现单目标跟踪"}],["meta",{"property":"og:description","content":"[OpenCV实战]14 使用OpenCV实现单目标跟踪 在本教程中，我们将了解OpenCV 3中引入的OpenCV目标跟踪API。我们将学习如何以及何时使用OpenCV 3中提供的8种不同的跟踪器BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE和CSRT。我们还将学习目前跟踪算法的通用原理。OpenCV版本至少..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.learnopencv.com/wp-content/uploads/2017/02/real-time-face-tracking.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2019-04-04T17:37:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]14 使用OpenCV实现单目标跟踪\\",\\"image\\":[\\"https://www.learnopencv.com/wp-content/uploads/2017/02/real-time-face-tracking.gif\\"],\\"datePublished\\":\\"2019-04-04T17:37:23.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[{"level":3,"title":"1.1 什么是目标跟踪","slug":"_1-1-什么是目标跟踪","link":"#_1-1-什么是目标跟踪","children":[]},{"level":3,"title":"1.2 跟踪与检测","slug":"_1-2-跟踪与检测","link":"#_1-2-跟踪与检测","children":[]}]},{"level":2,"title":"2 OpenCV的目标跟踪函数","slug":"_2-opencv的目标跟踪函数","link":"#_2-opencv的目标跟踪函数","children":[{"level":3,"title":"2.1 函数调用","slug":"_2-1-函数调用","link":"#_2-1-函数调用","children":[]},{"level":3,"title":"2.2 函数详解","slug":"_2-2-函数详解","link":"#_2-2-函数详解","children":[]},{"level":3,"title":"2.3 综合评价","slug":"_2-3-综合评价","link":"#_2-3-综合评价","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":14.91,"words":4472},"filePathRelative":"blog/opencv/opencv实战/2019-04-04-[OpenCV实战]14 使用OpenCV实现单目标跟踪.md","localizedDate":"2019年4月5日","excerpt":"\\n<p>在本教程中，我们将了解OpenCV 3中引入的OpenCV目标跟踪API。我们将学习如何以及何时使用OpenCV 3中提供的8种不同的跟踪器BOOSTING，MIL，KCF，TLD，MEDIANFLOW，GOTURN，MOSSE和CSRT。我们还将学习目前跟踪算法的通用原理。OpenCV版本至少OpenCV3.4.1以上。同时需要调用opencv_contrib库，OpenCV大量的算法存放在opencv_contrib目录下面的未稳定功能模块里，release版本没有。</p>\\n<p>正如下面这个完美的实时面部跟踪器所示！动画演示了我们想要的理想目标跟踪器：速度，准确性和鲁棒性。</p>","autoDesc":true}');export{l as comp,d as data};
