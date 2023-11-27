import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as r,c as p,a as t,b as n,d as o,e as c}from"./app-MsA2k2kn.js";const s={},l=t("h1",{id:"opencv实战-12-使用深度学习和opencv进行手部关键点检测",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#opencv实战-12-使用深度学习和opencv进行手部关键点检测","aria-hidden":"true"},"#"),n(" [OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测")],-1),m=t("p",null,"手部关键点检测是在手指上找到关节以及在给定图像中找到指尖的过程。它类似于在脸部（面部关键点检测）或身体（人体姿势估计）上找到关键点。但是手部检测不同的地方在于，我们将整个手部视为一个对象。",-1),d=t("p",null,"美国卡耐基梅隆大学智能感知实验室(CMU Perceptual Computing Lab)发布了手的关键点检测模型。详情见：",-1),h={href:"https://arxiv.org/pdf/1704.07809.pdf",target:"_blank",rel:"noopener noreferrer"},f=t("p",null,"我们将在本文介绍如何调用该模型。",-1),_=t("h2",{id:"_1-背景",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-背景","aria-hidden":"true"},"#"),n(),t("strong",null,"1"),n(),t("strong",null,"背景")],-1),u=t("figure",null,[t("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165421835.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),t("figcaption")],-1),g=t("p",null,"上图出自上面说的论文",-1),b={href:"https://arxiv.org/pdf/1602.00134.pdf",target:"_blank",rel:"noopener noreferrer"},y=t("p",null,"他们将这些图像传递通过检测器，以获得许多粗略的关键点预测。一旦从不同视图获得同一手的检测到的关键点，就会执行关键点三角测量以获得关键点的3D位置。关键点的3D位置用于通过从3D到2D的重投影来稳健地预测关键点。这对于难以预测关键点的图像尤其重要。通过这种方式，他们可以在几次迭代中获得更好的检测器。",-1),x=t("p",null,"总之，他们使用关键点检测器和多视图图像来提出改进的检测器。改进的主要来源是标记的图像集的多视图图像。",-1),v=t("p",null,"该模型产生22个关键点。手有21个关键点(0到20号关键点)，而第22个关键点代表背景。关键点位置如下图所示：",-1),F=t("figure",null,[t("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422310.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),t("figcaption")],-1),P=t("h2",{id:"_2-实现",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_2-实现","aria-hidden":"true"},"#"),n(" 2 实现")],-1),w=t("p",null,"从此链接下载该模型：",-1),S={href:"http://posefs1.perception.cs.cmu.edu/OpenPose/models/hand/pose_iter_102000.caffemodel",target:"_blank",rel:"noopener noreferrer"},L=c(`<p>这是一个caffe模型。</p><p>模型读取预测代码和其他caffe模型一样，如下所示：</p><pre><code>	//模型文件位置
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
</code></pre><p>结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422350.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]12 使用深度学习和OpenCV进行手部关键点检测/20190327165422357.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码" aria-hidden="true">#</a> 3 结果和代码</h2><p>需要注意的一点是，检测器需要手周围的边界框来预测关键点。因此，为了获得更好的效果，手应靠近相机，反正总而言之手的位置要清楚，在屏幕中央。现在的深度学习只能这样。精度不怎么高，只能在特定场合下使用，就是先确定关键点，然后训练模型，基于统计进行检测。</p><p>代码见：</p>`,11),C={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},k=t("p",null,"C++代码：",-1),O=t("pre",null,[t("code",null,`// HandPoints_detection.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include "pch.h"
#include <iostream>
#include <opencv2/opencv.hpp>

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
	string protoFile = "./model/pose_deploy.prototxt";
	string weightsFile = "./model/pose_iter_102000.caffemodel";

	// read image 读取图像
	string imageFile = "./image/hand.jpg";
	Mat frame = imread(imageFile);
	if (frame.empty())
	{
		cout << "check image" << endl;
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

	cout << "inWidth = " << inWidth << " ; inHeight = " << inHeight << endl;

	double t = (double)cv::getTickCount();
	//调用caffe模型
	Net net = readNetFromCaffe(protoFile, weightsFile);
	Mat inpBlob = blobFromImage(frame, 1.0 / 255, Size(inWidth, inHeight), Scalar(0, 0, 0), false, false);
	net.setInput(inpBlob);
	Mat output = net.forward();

	int H = output.size[2];
	int W = output.size[3];

	// find the position of the body parts 找到各点的位置
	vector<Point> points(nPoints);
	for (int n = 0; n < nPoints; n++)
	{
		// Probability map of corresponding body's part. 第一个特征点的预测矩阵
		Mat probMap(H, W, CV_32F, output.ptr(0, n));
		//放大预测矩阵
		resize(probMap, probMap, Size(frameWidth, frameHeight));

		Point maxLoc;
		double prob;
		//寻找预测矩阵，最大值概率以及最大值的坐标位置
		minMaxLoc(probMap, 0, &prob, 0, &maxLoc);
		if (prob > thresh)
		{
			//画图
			circle(frameCopy, cv::Point((int)maxLoc.x, (int)maxLoc.y), 8, Scalar(0, 255, 255), -1);
			cv::putText(frameCopy, cv::format("%d", n), cv::Point((int)maxLoc.x, (int)maxLoc.y), cv::FONT_HERSHEY_COMPLEX, 1, cv::Scalar(0, 0, 255), 2);
		}
		//保存特征点的坐标
		points[n] = maxLoc;
	}

	//获取要画的骨架线个数
	int nPairs = sizeof(POSE_PAIRS) / sizeof(POSE_PAIRS[0]);

	//连接点，画骨架
	for (int n = 0; n < nPairs; n++)
	{
		// lookup 2 connected body/hand parts
		Point2f partA = points[POSE_PAIRS[n][0]];
		Point2f partB = points[POSE_PAIRS[n][1]];

		if (partA.x <= 0 || partA.y <= 0 || partB.x <= 0 || partB.y <= 0)
			continue;

		//画骨条线
		line(frame, partA, partB, Scalar(0, 255, 255), 8);
		circle(frame, partA, 8, Scalar(0, 0, 255), -1);
		circle(frame, partB, 8, Scalar(0, 0, 255), -1);
	}

	//计算运行时间
	t = ((double)cv::getTickCount() - t) / cv::getTickFrequency();
	cout << "Time Taken = " << t << endl;
	imshow("Output-Keypoints", frameCopy);
	imshow("Output-Skeleton", frame);
	imwrite("Output-Skeleton.jpg", frame);

	waitKey();

	return 0;
}
`)],-1),H=t("p",null,"python代码：",-1),M=t("pre",null,[t("code",null,`from __future__ import division
import cv2
import time
import numpy as np

protoFile = "./model/pose_deploy.prototxt"
weightsFile = "./model/pose_iter_102000.caffemodel"
nPoints = 22
POSE_PAIRS = [ [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],[0,17],[17,18],[18,19],[19,20] ]
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

frame = cv2.imread("./image/hand.jpg")
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
print("time taken by network : {:.3f}".format(time.time() - t))

# Empty list to store the detected keypoints
points = []

for i in range(nPoints):
    # confidence map of corresponding body's part.
    probMap = output[0, i, :, :]
    probMap = cv2.resize(probMap, (frameWidth, frameHeight))

    # Find global maxima of the probMap.
    minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)

    if prob > threshold :
        cv2.circle(frameCopy, (int(point[0]), int(point[1])), 8, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        cv2.putText(frameCopy, "{}".format(i), (int(point[0]), int(point[1])), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, lineType=cv2.LINE_AA)

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


cv2.imshow('Output-Keypoints', frameCopy)
cv2.imshow('Output-Skeleton', frame)


cv2.imwrite('Output-Keypoints.jpg', frameCopy)
cv2.imwrite('Output-Skeleton.jpg', frame)

print("Total time taken : {:.3f}".format(time.time() - t))

cv2.waitKey(0)
`)],-1),V=t("h2",{id:"_4-参考",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_4-参考","aria-hidden":"true"},"#"),n(" 4 参考")],-1),E=t("p",null,"手部特征点识别",-1),A={href:"https://www.learnopencv.com/hand-keypoint-detection-using-deep-learning-and-opencv/",target:"_blank",rel:"noopener noreferrer"},z=t("p",null,"其他身体特征点识别，一样的套路",-1),W={href:"https://www.learnopencv.com/deep-learning-based-human-pose-estimation-using-opencv-cpp-python/",target:"_blank",rel:"noopener noreferrer"};function B(I,R){const e=a("ExternalLinkIcon");return r(),p("div",null,[l,m,d,t("p",null,[t("a",h,[n(" https://arxiv.org/pdf/1704.07809.pdf"),o(e)])]),f,_,u,g,t("p",null,[n("他们从一小组标记的手部图像开始，并使用神经网络（卷积姿势分析机 "),t("a",b,[n(" https://arxiv.org/pdf/1602.00134.pdf"),o(e)]),n(" 来粗略估计手部关键点。他们设置了一个多视图系统可以从31个高清摄像头获取来自不同视点或角度的图像。")]),y,x,v,F,P,w,t("p",null,[t("a",S,[n("http://posefs1.perception.cs.cmu.edu/OpenPose/models/hand/pose_iter_102000.caffemodel"),o(e)])]),L,t("p",null,[t("a",C,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),o(e)])]),k,O,H,M,V,E,t("p",null,[t("a",A,[n(" https://www.learnopencv.com/hand-keypoint-detection-using-deep-learning-and-opencv/ "),o(e)])]),z,t("p",null,[t("a",W,[n(" https://www.learnopencv.com/deep-learning-based-human-pose-estimation-using-opencv-cpp-python/ "),o(e)])])])}const j=i(s,[["render",B],["__file","2019-03-27-_OpenCV实战_12 使用深度学习和OpenCV进行手部关键点检测.html.vue"]]);export{j as default};
