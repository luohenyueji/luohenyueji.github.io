import{_ as e,c as n,a as o,o as a}from"./app-CJwJJlha.js";const i={};function p(r,t){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="opencv实战-12-使用深度学习和opencv进行手部关键点检测" tabindex="-1"><a class="header-anchor" href="#opencv实战-12-使用深度学习和opencv进行手部关键点检测"><span>[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测</span></a></h1><p>手部关键点检测是在手指上找到关节以及在给定图像中找到指尖的过程。它类似于在脸部（面部关键点检测）或身体（人体姿势估计）上找到关键点。但是手部检测不同的地方在于，我们将整个手部视为一个对象。</p><p>美国卡耐基梅隆大学智能感知实验室(CMU Perceptual Computing Lab)发布了手的关键点检测模型。详情见：</p><p><a href="https://arxiv.org/pdf/1704.07809.pdf" target="_blank" rel="noopener noreferrer"> https://arxiv.org/pdf/1704.07809.pdf</a></p><p>我们将在本文介绍如何调用该模型。</p><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span><strong>1</strong> <strong>背景</strong></span></a></h2><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165421835.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图出自上面说的论文</p><p>他们从一小组标记的手部图像开始，并使用神经网络（卷积姿势分析机 <a href="https://arxiv.org/pdf/1602.00134.pdf" target="_blank" rel="noopener noreferrer"> https://arxiv.org/pdf/1602.00134.pdf</a> 来粗略估计手部关键点。他们设置了一个多视图系统可以从31个高清摄像头获取来自不同视点或角度的图像。</p><p>他们将这些图像传递通过检测器，以获得许多粗略的关键点预测。一旦从不同视图获得同一手的检测到的关键点，就会执行关键点三角测量以获得关键点的3D位置。关键点的3D位置用于通过从3D到2D的重投影来稳健地预测关键点。这对于难以预测关键点的图像尤其重要。通过这种方式，他们可以在几次迭代中获得更好的检测器。</p><p>总之，他们使用关键点检测器和多视图图像来提出改进的检测器。改进的主要来源是标记的图像集的多视图图像。</p><p>该模型产生22个关键点。手有21个关键点(0到20号关键点)，而第22个关键点代表背景。关键点位置如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422310.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-实现" tabindex="-1"><a class="header-anchor" href="#_2-实现"><span>2 实现</span></a></h2><p>从此链接下载该模型：</p><p><a href="http://posefs1.perception.cs.cmu.edu/OpenPose/models/hand/pose_iter_102000.caffemodel" target="_blank" rel="noopener noreferrer">http://posefs1.perception.cs.cmu.edu/OpenPose/models/hand/pose_iter_102000.caffemodel</a></p><p>这是一个caffe模型。</p><p>模型读取预测代码和其他caffe模型一样，如下所示：</p><pre><code>	//模型文件位置
	string protoFile = &quot;./model/pose_deploy.prototxt&quot;;
	string weightsFile = &quot;./model/pose_iter_102000.caffemodel&quot;;

	// read image 读取图像
	string imageFile = &quot;./image/hand.jpg&quot;;
	Mat frame = imread(imageFile);
	if (frame.empty())
	{
		cout &lt;&lt; &quot;check image&quot; &lt;&lt; endl;
		return 0;
	}
	//复制图像
	Mat frameCopy = frame.clone();
	//读取图像长宽
	int frameWidth = frame.cols;
	int frameHeight = frame.rows;

	float thresh = 0.01;

	//原图宽高比
	float aspect_ratio = frameWidth / (float)frameHeight;
	int inHeight = 368;
	//缩放图像
	int inWidth = (int(aspect_ratio*inHeight) * 8) / 8;

	cout &lt;&lt; &quot;inWidth = &quot; &lt;&lt; inWidth &lt;&lt; &quot; ; inHeight = &quot; &lt;&lt; inHeight &lt;&lt; endl;

	double t = (double)cv::getTickCount();
	//调用caffe模型
	Net net = readNetFromCaffe(protoFile, weightsFile);
	Mat inpBlob = blobFromImage(frame, 1.0 / 255, Size(inWidth, inHeight), Scalar(0, 0, 0), false, false);
	net.setInput(inpBlob);
	Mat output = net.forward();

	int H = output.size[2];
	int W = output.size[3];
</code></pre><p>输出有22个矩阵，每个矩阵是关键点的概率图。为了找到确切的关键点，首先，我们将概率图缩放到原始图像的大小。然后通过查找概率图的最大值来找到关键点的位置。这是使用OpenCV中的minmaxLoc函数完成的。我们绘制检测到的点以及图像上的编号。我们将使用检测到的点来获取关键点形成的骨架并将其绘制在图像上。画骨架代码如下：</p><pre><code>	// find the position of the body parts 找到各点的位置
	vector&lt;Point&gt; points(nPoints);
	for (int n = 0; n &lt; nPoints; n++)
	{
		// Probability map of corresponding body&#39;s part. 第一个特征点的预测矩阵
		Mat probMap(H, W, CV_32F, output.ptr(0, n));
		//放大预测矩阵
		resize(probMap, probMap, Size(frameWidth, frameHeight));

		Point maxLoc;
		double prob;
		//寻找预测矩阵，最大值概率以及最大值的坐标位置
		minMaxLoc(probMap, 0, &amp;prob, 0, &amp;maxLoc);
		if (prob &gt; thresh)
		{
			//画图
			circle(frameCopy, cv::Point((int)maxLoc.x, (int)maxLoc.y), 8, Scalar(0, 255, 255), -1);
			cv::putText(frameCopy, cv::format(&quot;%d&quot;, n), cv::Point((int)maxLoc.x, (int)maxLoc.y), cv::FONT_HERSHEY_COMPLEX, 1, cv::Scalar(0, 0, 255), 2);
		}
		//保存特征点的坐标
		points[n] = maxLoc;
	}

	//获取要画的骨架线个数
	int nPairs = sizeof(POSE_PAIRS) / sizeof(POSE_PAIRS[0]);

	//连接点，画骨架
	for (int n = 0; n &lt; nPairs; n++)
	{
		// lookup 2 connected body/hand parts
		Point2f partA = points[POSE_PAIRS[n][0]];
		Point2f partB = points[POSE_PAIRS[n][1]];

		if (partA.x &lt;= 0 || partA.y &lt;= 0 || partB.x &lt;= 0 || partB.y &lt;= 0)
			continue;

		//画骨条线
		line(frame, partA, partB, Scalar(0, 255, 255), 8);
		circle(frame, partA, 8, Scalar(0, 0, 255), -1);
		circle(frame, partB, 8, Scalar(0, 0, 255), -1);
	}
</code></pre><p>结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422350.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422357.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码"><span>3 结果和代码</span></a></h2><p>需要注意的一点是，检测器需要手周围的边界框来预测关键点。因此，为了获得更好的效果，手应靠近相机，反正总而言之手的位置要清楚，在屏幕中央。现在的深度学习只能这样。精度不怎么高，只能在特定场合下使用，就是先确定关键点，然后训练模型，基于统计进行检测。</p><p>代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>C++代码：</p><pre><code>// HandPoints_detection.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;

using namespace std;
using namespace cv;
using namespace cv::dnn;

//各个部位连接线坐标，比如(0，1)表示第0特征点和第1特征点连接线为拇指
const int POSE_PAIRS[20][2] =
{
	{0,1}, {1,2}, {2,3}, {3,4},         // thumb
	{0,5}, {5,6}, {6,7}, {7,8},         // index
	{0,9}, {9,10}, {10,11}, {11,12},    // middle
	{0,13}, {13,14}, {14,15}, {15,16},  // ring
	{0,17}, {17,18}, {18,19}, {19,20}   // small
};

int nPoints = 22;

int main()
{
	//模型文件位置
	string protoFile = &quot;./model/pose_deploy.prototxt&quot;;
	string weightsFile = &quot;./model/pose_iter_102000.caffemodel&quot;;

	// read image 读取图像
	string imageFile = &quot;./image/hand.jpg&quot;;
	Mat frame = imread(imageFile);
	if (frame.empty())
	{
		cout &lt;&lt; &quot;check image&quot; &lt;&lt; endl;
		return 0;
	}
	//复制图像
	Mat frameCopy = frame.clone();
	//读取图像长宽
	int frameWidth = frame.cols;
	int frameHeight = frame.rows;

	float thresh = 0.01;

	//原图宽高比
	float aspect_ratio = frameWidth / (float)frameHeight;
	int inHeight = 368;
	//缩放图像
	int inWidth = (int(aspect_ratio*inHeight) * 8) / 8;

	cout &lt;&lt; &quot;inWidth = &quot; &lt;&lt; inWidth &lt;&lt; &quot; ; inHeight = &quot; &lt;&lt; inHeight &lt;&lt; endl;

	double t = (double)cv::getTickCount();
	//调用caffe模型
	Net net = readNetFromCaffe(protoFile, weightsFile);
	Mat inpBlob = blobFromImage(frame, 1.0 / 255, Size(inWidth, inHeight), Scalar(0, 0, 0), false, false);
	net.setInput(inpBlob);
	Mat output = net.forward();

	int H = output.size[2];
	int W = output.size[3];

	// find the position of the body parts 找到各点的位置
	vector&lt;Point&gt; points(nPoints);
	for (int n = 0; n &lt; nPoints; n++)
	{
		// Probability map of corresponding body&#39;s part. 第一个特征点的预测矩阵
		Mat probMap(H, W, CV_32F, output.ptr(0, n));
		//放大预测矩阵
		resize(probMap, probMap, Size(frameWidth, frameHeight));

		Point maxLoc;
		double prob;
		//寻找预测矩阵，最大值概率以及最大值的坐标位置
		minMaxLoc(probMap, 0, &amp;prob, 0, &amp;maxLoc);
		if (prob &gt; thresh)
		{
			//画图
			circle(frameCopy, cv::Point((int)maxLoc.x, (int)maxLoc.y), 8, Scalar(0, 255, 255), -1);
			cv::putText(frameCopy, cv::format(&quot;%d&quot;, n), cv::Point((int)maxLoc.x, (int)maxLoc.y), cv::FONT_HERSHEY_COMPLEX, 1, cv::Scalar(0, 0, 255), 2);
		}
		//保存特征点的坐标
		points[n] = maxLoc;
	}

	//获取要画的骨架线个数
	int nPairs = sizeof(POSE_PAIRS) / sizeof(POSE_PAIRS[0]);

	//连接点，画骨架
	for (int n = 0; n &lt; nPairs; n++)
	{
		// lookup 2 connected body/hand parts
		Point2f partA = points[POSE_PAIRS[n][0]];
		Point2f partB = points[POSE_PAIRS[n][1]];

		if (partA.x &lt;= 0 || partA.y &lt;= 0 || partB.x &lt;= 0 || partB.y &lt;= 0)
			continue;

		//画骨条线
		line(frame, partA, partB, Scalar(0, 255, 255), 8);
		circle(frame, partA, 8, Scalar(0, 0, 255), -1);
		circle(frame, partB, 8, Scalar(0, 0, 255), -1);
	}

	//计算运行时间
	t = ((double)cv::getTickCount() - t) / cv::getTickFrequency();
	cout &lt;&lt; &quot;Time Taken = &quot; &lt;&lt; t &lt;&lt; endl;
	imshow(&quot;Output-Keypoints&quot;, frameCopy);
	imshow(&quot;Output-Skeleton&quot;, frame);
	imwrite(&quot;Output-Skeleton.jpg&quot;, frame);

	waitKey();

	return 0;
}
</code></pre><p>python代码：</p><pre><code>from __future__ import division
import cv2
import time
import numpy as np

protoFile = &quot;./model/pose_deploy.prototxt&quot;
weightsFile = &quot;./model/pose_iter_102000.caffemodel&quot;
nPoints = 22
POSE_PAIRS = [ [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20] ]
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

frame = cv2.imread(&quot;./image/hand.jpg&quot;)
frameCopy = np.copy(frame)
frameWidth = frame.shape[1]
frameHeight = frame.shape[0]
aspect_ratio = frameWidth/frameHeight

threshold = 0.1

t = time.time()
# input image dimensions for the network
inHeight = 368
inWidth = int(((aspect_ratio*inHeight)*8)//8)
inpBlob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (inWidth, inHeight), (0, 0, 0), swapRB=False, crop=False)

net.setInput(inpBlob)

output = net.forward()
print(&quot;time taken by network : {:.3f}&quot;.format(time.time() - t))

# Empty list to store the detected keypoints
points = []

for i in range(nPoints):
    # confidence map of corresponding body&#39;s part.
    probMap = output[0, i, :, :]
    probMap = cv2.resize(probMap, (frameWidth, frameHeight))

    # Find global maxima of the probMap.
    minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)

    if prob &gt; threshold :
        cv2.circle(frameCopy, (int(point[0]), int(point[1])), 8, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        cv2.putText(frameCopy, &quot;{}&quot;.format(i), (int(point[0]), int(point[1])), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, lineType=cv2.LINE_AA)

        # Add the point to the list if the probability is greater than the threshold
        points.append((int(point[0]), int(point[1])))
    else :
        points.append(None)

# Draw Skeleton
for pair in POSE_PAIRS:
    partA = pair[0]
    partB = pair[1]

    if points[partA] and points[partB]:
        cv2.line(frame, points[partA], points[partB], (0, 255, 255), 2)
        cv2.circle(frame, points[partA], 8, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)
        cv2.circle(frame, points[partB], 8, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)


cv2.imshow(&#39;Output-Keypoints&#39;, frameCopy)
cv2.imshow(&#39;Output-Skeleton&#39;, frame)


cv2.imwrite(&#39;Output-Keypoints.jpg&#39;, frameCopy)
cv2.imwrite(&#39;Output-Skeleton.jpg&#39;, frame)

print(&quot;Total time taken : {:.3f}&quot;.format(time.time() - t))

cv2.waitKey(0)
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><p>手部特征点识别</p><p><a href="https://www.learnopencv.com/hand-keypoint-detection-using-deep-learning-and-opencv/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/hand-keypoint-detection-using-deep-learning-and-opencv/ </a></p><p>其他身体特征点识别，一样的套路</p><p><a href="https://www.learnopencv.com/deep-learning-based-human-pose-estimation-using-opencv-cpp-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/deep-learning-based-human-pose-estimation-using-opencv-cpp-python/ </a></p>`,37)]))}const c=e(i,[["render",p],["__file","2019-03-27-_OpenCV实战_12 使用深度学习和OpenCV进行手部关键点检测.html.vue"]]),s=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-27-_OpenCV%E5%AE%9E%E6%88%98_12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B.html","title":"[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-03-27T17:06:41.000Z","tag":["OpenCV实战","OpenCV","深度学习"],"description":"[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测 手部关键点检测是在手指上找到关节以及在给定图像中找到指尖的过程。它类似于在脸部（面部关键点检测）或身体（人体姿势估计）上找到关键点。但是手部检测不同的地方在于，我们将整个手部视为一个对象。 美国卡耐基梅隆大学智能感知实验室(CMU Perceptual Computing Lab)...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-27-_OpenCV%E5%AE%9E%E6%88%98_12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测"}],["meta",{"property":"og:description","content":"[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测 手部关键点检测是在手指上找到关节以及在给定图像中找到指尖的过程。它类似于在脸部（面部关键点检测）或身体（人体姿势估计）上找到关键点。但是手部检测不同的地方在于，我们将整个手部视为一个对象。 美国卡耐基梅隆大学智能感知实验室(CMU Perceptual Computing Lab)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B/20190327165421835.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2019-03-27T17:06:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B/20190327165421835.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B/20190327165422310.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B/20190327165422350.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D12%20%E4%BD%BF%E7%94%A8%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E6%89%8B%E9%83%A8%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8B/20190327165422357.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-03-27T17:06:41.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[]},{"level":2,"title":"2 实现","slug":"_2-实现","link":"#_2-实现","children":[]},{"level":2,"title":"3 结果和代码","slug":"_3-结果和代码","link":"#_3-结果和代码","children":[]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":7.99,"words":2397},"filePathRelative":"blog/opencv/opencv实战/2019-03-27-[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测.md","localizedDate":"2019年3月28日","excerpt":"\\n<p>手部关键点检测是在手指上找到关节以及在给定图像中找到指尖的过程。它类似于在脸部（面部关键点检测）或身体（人体姿势估计）上找到关键点。但是手部检测不同的地方在于，我们将整个手部视为一个对象。</p>\\n<p>美国卡耐基梅隆大学智能感知实验室(CMU Perceptual Computing Lab)发布了手的关键点检测模型。详情见：</p>\\n<p><a href=\\"https://arxiv.org/pdf/1704.07809.pdf\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://arxiv.org/pdf/1704.07809.pdf</a></p>","autoDesc":true}');export{c as comp,s as data};
