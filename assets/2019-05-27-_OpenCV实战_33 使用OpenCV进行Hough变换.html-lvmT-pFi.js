import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as l,c as g,a as e,b as t,d as a,e as i}from"./app-MsA2k2kn.js";const c={},p=i('<h1 id="opencv实战-33-使用opencv进行hough变换" tabindex="-1"><a class="header-anchor" href="#opencv实战-33-使用opencv进行hough变换" aria-hidden="true">#</a> [OpenCV实战]33 使用OpenCV进行Hough变换</h1><h2 id="_1-什么是霍夫变换" tabindex="-1"><a class="header-anchor" href="#_1-什么是霍夫变换" aria-hidden="true">#</a> <strong>1</strong> <strong>什么是霍夫变换</strong></h2><p>霍夫变换是用于检测图像中的简单形状（诸如圆形，线条等）的特征提取方法。“简单”形状是可以仅由几个参数表示的形状。例如，一条线可以用两个参数（斜率，截距）表示，一个圆有三个参数：中心坐标和半径（x，y，r）。霍夫变换在图像中找到这样的形状方面做得很好。使用Hough变换的主要优点是它对遮挡不敏感。让我们通过一个例子来看看霍夫变换是如何工作的。</p><h3 id="_1-1-应用霍夫变换以检测图像中的线条" tabindex="-1"><a class="header-anchor" href="#_1-1-应用霍夫变换以检测图像中的线条" aria-hidden="true">#</a> 1.1 应用霍夫变换以检测图像中的线条</h3><p>极坐标中的线条方程如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491059.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910100.png" alt="" loading="lazy"> 表示线与原点的垂直距离（以像素为单位），<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491092.png" alt="" loading="lazy"> 是以弧度为单位测量的角度，如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491097.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>您可能会想问我们为什么不使用下面给出的熟悉的等式：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491091.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>原因是斜率m可以取- <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491090.png" alt="" loading="lazy"> 到+<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491087.png" alt="" loading="lazy">之间的值。对于Hough变换，参数需要有界限。您可能还有一个后续问题。在 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491064.png" alt="" loading="lazy"> 形式上， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491098.png" alt="" loading="lazy"> 是有界的，但是 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491092.png" alt="" loading="lazy"> 能取0到+ <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491093.png" alt="" loading="lazy"> 之间的值吗？这在理论上可能是正确的，但在实践中，<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491093.png" alt="" loading="lazy"> 也是有限的，因为图像本身是有限的。</p><h3 id="_1-2-累加器" tabindex="-1"><a class="header-anchor" href="#_1-2-累加器" aria-hidden="true">#</a> 1.2 累加器</h3><p>当我们说二维空间中的一条线用参数化 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910106.png" alt="" loading="lazy"> 和<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491094.png" alt="" loading="lazy"> 表达时，意味着如果我们选择一个<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491094.png" alt="" loading="lazy"> ，它就对应一条线。想象一个二维数组，想象一个二维数组，其中x轴具有所有可能的 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/2019052716491087.png" alt="" loading="lazy">值，y轴具有所有可能的 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910100.png" alt="" loading="lazy">值。该2D阵列中的任何点坐标对应于一条线。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这个2D数组称为累加器，因为我们将使用此数组的bin来收集有关图像中存在哪些线条的信息。左上角的单元格对应于（-R，0），右下角对应于（R，<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910120.png" alt="" loading="lazy"> ）。稍后我们将看到bin（<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910131.png" alt="" loading="lazy"> ， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910122.png" alt="" loading="lazy"> ）内的值随着参数 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910118.png" alt="" loading="lazy"> 和 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910130.png" alt="" loading="lazy"> 而改变。</p><h3 id="_1-3-线条检测" tabindex="-1"><a class="header-anchor" href="#_1-3-线条检测" aria-hidden="true">#</a> 1.3 线条检测</h3><p>执行以下步骤以检测图像中的线。</p><p>(1) 首先，我们需要创建一个累加器数组。您选择的单元格数量是一个设计决策。假设您选择了10×10累加器。这意味着 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910131.png" alt="" loading="lazy"> 和 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910122.png" alt="" loading="lazy">获取10个不同的值。因此您将能够检测100种完全不同的线条。累加器的大小也取决于图像的分辨率。但如果你刚刚开始，不要担心完全正确。选择一个20×20的数字，看看你得到了什么结果。</p><p>(2) 检测边缘</p><p>现在我们已经设置了累加器，我们希望收集累加器的每个单元的信息，因为累加器的每个单元对应于一行。我们如何通过获取单元的信息，如果图像中有一条可见的线，边缘检测器应该在这条线的边界检测到边缘像素点。这些边缘像素为线条的存在提供了证据。边缘检测的输出是边缘像素的阵列 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910151.png" alt="" loading="lazy"></p><p>(3) 边缘像素投票</p><p>对于上述数组中的每个边缘像素（x，y），我们改变 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910156.png" alt="" loading="lazy"> 从0到 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910153.png" alt="" loading="lazy"> 的值，并根据线条极坐标公式计算 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910166.png" alt="" loading="lazy"> 。我们改变三个像素点的 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910373.png" alt="" loading="lazy"> （由三条彩色曲线表示），并获得对应 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910171.png" alt="" loading="lazy"> 的值。如下图所示。下图中三条线代表三个像素点不同<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910174.png" alt="" loading="lazy"> 和 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910191.png" alt="" loading="lazy"> 的取值，其中横坐标为 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910217.png" alt="" loading="lazy"> 值，纵坐标为 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910205.png" alt="" loading="lazy"> 值（r值）。如果三个点在一条直线上，那么三个点的<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910214.png" alt="" loading="lazy"> 和 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910224.png" alt="" loading="lazy"> 曲线就会相交于一点。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910242.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通常，我们有数百个边缘像素，越多的曲线交于一点就意味着这个交点表示的直线由更多的点组成，通过累加器统计交于一点的曲线数，并设定阈值来决定是否检测到一条直线。</p><p>更多霍夫曼变换说明见：</p>',25),s={href:"https://blog.csdn.net/u013263891/article/details/82867251",target:"_blank",rel:"noopener noreferrer"},h=i('<p>在OpenCV中，使用Hough变换的线检测在函数HoughLines和HoughLinesP中实现。此函数采用以下参数：</p><ul><li><em>edge</em> ：边缘检测器的输出(灰度图)。</li><li><em>lines</em> ：用于存储行开头和结尾坐标的向量。</li><li><em>rho</em> <em>：图像单位</em> 分辨率参数， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910243.png" alt="" loading="lazy"> 以像素为单位。我们选择2像素点</li><li><em>theta</em> ： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910255.png" alt="" loading="lazy"> 以弧度表示的参数单位分辨率。我们选择2度</li><li><em>阈值</em> ：检测线的最小交叉点数。</li></ul><p>下面我们展示了使用霍夫变换进行线检测的结果。请记住，检测到的线条的质量在很大程度上取决于边缘图的质量。因此，在现实世界中，当您可以控制环境并因此获得一致的边缘图时，或者当您可以为您正在寻找的特定类型的边缘训练边缘检测器时，使用Hough变换。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910827.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-4-圆环的检测" tabindex="-1"><a class="header-anchor" href="#_1-4-圆环的检测" aria-hidden="true">#</a> 1.4 圆环的检测</h3><p>在线Hough变换的情况下，我们需要两个参数，（ <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910737.png" alt="" loading="lazy"> ， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910744.png" alt="" loading="lazy"> ）但是为了检测圆，我们需要三个参数</p><ul><li><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910741.png" alt="" loading="lazy"> 圆心的坐标。</li><li>半径。</li></ul><p>可以想象，圆形探测器需要一个3D累加器，每个参数一个。</p><p>圆的方程由下式给出：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910809.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>按照以下步骤检测图像中的圆圈：</p><p>1.借助边缘检测器（Canny）找到给定图像中的边缘。</p><p>2.为了检测图像中的圆，我们设置半径的最大值和最小值的阈值。</p><p>3.信息收集在3D累加器阵列中，以确定是否存在具有不同中心和半径的圆。</p><p>在OpenCV中使用HoughCircles函数来检测图像中的圆圈。它需要以下参数：</p><p>image：输入图像。</p><p>methods：检测方法。</p><p>dp：累加器分辨率和图像分辨率的反比。</p><p>mindst：检测到圆圈的中心之间的最小距离。</p><p>param_1和param_2：这些是特定于方法的参数。</p><p>min_Radius：要检测的圆的最小半径（以像素为单位）。</p><p>max_Radius：要检测的最大半径（以像素为单位）。</p><p>使用Hough变换的圆检测结果如下所示。结果的质量在很大程度上取决于您可以找到的边缘质量，以及您对要检测的圆的大小有多少先验知识。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]33 使用OpenCV进行Hough变换/20190527164910885.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-代码" tabindex="-1"><a class="header-anchor" href="#_2-代码" aria-hidden="true">#</a> 2 代码</h2><p>所有代码见：</p>',26),u={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},m=i(`<p>线条检测：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;stdio.h&gt;
#include &lt;iostream&gt;

using namespace cv;
using namespace std;

// variables to store images
Mat dst, cimg, gray, img, edges;

int initThresh;
const int maxThresh = 1000;
double th1, th2;

// create a vector to store points of line
vector&lt;Vec4i&gt; lines;

void onTrackbarChange(int, void*)
{
	//复制目标图像
	cimg = img.clone();
	//结果图像
	dst = img.clone();

	th1 = initThresh;
	th2 = th1 * 0.4;
	//canny边缘检测
	Canny(img, edges, th1, th2);

	// apply hough line transform 霍夫曼变换
	HoughLinesP(edges, lines, 2, CV_PI / 180, 50, 10, 100);

	// draw lines on the detected points 画线
	for (size_t i = 0; i &lt; lines.size(); i++)
	{
		//提取线条坐标点
		Vec4i l = lines[i];
		line(dst, Point(l[0], l[1]), Point(l[2], l[3]), Scalar(0, 0, 255), 1, LINE_AA);
	}

	// show the resultant image
	imshow(&quot;Result Image&quot;, dst);
	imshow(&quot;Edges&quot;, edges);
}

int main()
{
	// Read image (color mode) 读图
	img = imread(&quot;./image/lanes.jpg&quot;, 1);
	dst = img.clone();

	if (img.empty())
	{
		cout &lt;&lt; &quot;Error in reading image&quot; &lt;&lt; endl;
		return -1;
	}

	// Convert to gray-scale 转换为灰度图像
	cvtColor(img, gray, COLOR_BGR2GRAY);

	// Detect edges using Canny Edge Detector
	// Canny(gray, dst, 50, 200, 3);

	// Make a copy of original image
	// cimg = img.clone();

	// Will hold the results of the detection
	namedWindow(&quot;Edges&quot;, 1);
	namedWindow(&quot;Result Image&quot;, 1);

	// Declare thresh to vary the max_radius of circles to be detected in hough transform
	// 霍夫曼变换阈值
	initThresh = 500;

	// Create trackbar to change threshold values
	//滑动条
	createTrackbar(&quot;threshold&quot;, &quot;Result Image&quot;, &amp;initThresh, maxThresh, onTrackbarChange);
	onTrackbarChange(initThresh, 0);

	while (true)
	{
		int key;
		key = waitKey(1);
		if ((char)key == 27)
		{
			break;
		}
	}
	destroyAllWindows();
	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np

def onTrackbarChange(max_slider):
	global img
	global dst
	global gray

	dst = np.copy(img)

	th1 = max_slider 
	th2 = th1 * 0.4
	edges = cv2.Canny(img, th1, th2)
	
	# Apply probabilistic hough line transform
	lines = cv2.HoughLinesP(edges, 2, np.pi/180.0, 50, minLineLength=10, maxLineGap=100)

	# Draw lines on the detected points
	for line in lines:
		x1, y1, x2, y2 = line[0]
		cv2.line(dst, (x1, y1), (x2, y2), (0,0,255), 1)

	cv2.imshow(&quot;Result Image&quot;, dst)	
	cv2.imshow(&quot;Edges&quot;,edges)

if __name__ == &quot;__main__&quot;:
	
	# Read image
	img = cv2.imread(&#39;./image/lanes.jpg&#39;)
	
	# Create a copy for later usage
	dst = np.copy(img)

	# Convert image to gray
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

	# Create display windows
	cv2.namedWindow(&quot;Edges&quot;)
	cv2.namedWindow(&quot;Result Image&quot;)
	  

	# Initialize threshold value
	initThresh = 500

	# Maximum threshold value
	maxThresh = 1000

	cv2.createTrackbar(&quot;threshold&quot;, &quot;Result Image&quot;, initThresh, maxThresh, onTrackbarChange)
	onTrackbarChange(initThresh)

	while True:
		key = cv2.waitKey(1)
		if key == 27:
			break

	cv2.destroyAllWindows()
</code></pre><p>圆环检测：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;stdio.h&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;

using namespace cv;
using namespace std;

// Declare variables to store images
Mat gray, cimg, img, edges;

int initThresh;
const int maxThresh = 200;
double p1, p2;

// Vector to store circle points
vector&lt;Vec3f&gt; circles;

void onTrackbarChange(int, void*)
{
	cimg = img.clone();

	p1 = initThresh;
	p2 = initThresh * 0.4;

	// Detect circles using HoughCircles transform 霍夫曼变换
	HoughCircles(gray, circles, HOUGH_GRADIENT, 1, cimg.rows / 64, p1, p2, 25, 50);

	//画圆
	for (size_t i = 0; i &lt; circles.size(); i++)
	{
		Point center(cvRound(circles[i][0]), cvRound(circles[i][1]));
		int radius = cvRound(circles[i][2]);
		// Draw the outer circle
		circle(cimg, center, radius, Scalar(0, 255, 0), 2);
		// Draw the center of the circle
		circle(cimg, center, 2, Scalar(0, 0, 255), 3);
	}

	// Display output image
	imshow(&quot;Image&quot;, cimg);

	// Edge image for debugging
	Canny(gray, edges, p1, p2);
	imshow(&quot;Edges&quot;, edges);
}

int main()
{
	//读图
	img = imread(&quot;./image/brown-eyes.jpg&quot;, IMREAD_COLOR);

	if (img.empty())
	{
		cout &lt;&lt; &quot;Error reading image&quot; &lt;&lt; endl;
		return -1;
	}

	// Convert to gray-scale 转换为灰度图
	cvtColor(img, gray, COLOR_BGR2GRAY);

	// Will hold the results of the detection
	namedWindow(&quot;Edges&quot;, 1);
	namedWindow(&quot;Image&quot;, 1);

	//初始阈值
	initThresh = 105;
	//滑动条
	createTrackbar(&quot;Threshold&quot;, &quot;Image&quot;, &amp;initThresh, maxThresh, onTrackbarChange);
	onTrackbarChange(initThresh, 0);

	imshow(&quot;Image&quot;, img);
	while (true)
	{
		int key;
		key = waitKey(0);
		if ((char)key == 27)
		{
			break;
		}
	}

	destroyAllWindows();
	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np
import sys

def onTrackbarChange(max_slider):
    cimg = np.copy(img)

    p1 = max_slider
    p2 = max_slider * 0.4

    # Detect circles using HoughCircles transform
    circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1, cimg.shape[0]/64, param1=p1, param2=p2, minRadius=25, maxRadius=50)

    # If at least 1 circle is detected
    if circles is not None:
        cir_len = circles.shape[1] # store length of circles found
        circles = np.uint16(np.around(circles))
        for i in circles[0, :]:
            # Draw the outer circle
            cv2.circle(cimg, (i[0], i[1]), i[2], (0, 255, 0), 2)
            # Draw the center of the circle
            cv2.circle(cimg, (i[0], i[1]), 2, (0, 0, 255), 3)
    else:
        cir_len = 0 # no circles detected
    
    # Display output image
    cv2.imshow(&#39;Image&#39;, cimg)    

    # Edge image for debugging
    edges = cv2.Canny(gray, p1, p2)
    cv2.imshow(&#39;Edges&#39;, edges)

    

    
if __name__ == &quot;__main__&quot;:
    # Read image
    img = cv2.imread(&quot;./image/brown-eyes.jpg&quot;)

    # Convert to gray-scale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Create display windows
    cv2.namedWindow(&quot;Edges&quot;)
    cv2.namedWindow(&quot;Image&quot;)
    

    # Trackbar will be used for changing threshold for edge 
    initThresh = 105 
    maxThresh = 200 

    # Create trackbar
    cv2.createTrackbar(&quot;Threshold&quot;, &quot;Image&quot;, initThresh, maxThresh, onTrackbarChange)
    onTrackbarChange(initThresh)
    
    while True:
        key = cv2.waitKey(1)
        if key == 27:
            break

    cv2.destroyAllWindows()
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,11),d={href:"https://www.learnopencv.com/hough-transform-with-opencv-c-python/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/u013263891/article/details/82867251",target:"_blank",rel:"noopener noreferrer"};function b(y,w){const n=r("ExternalLinkIcon");return l(),g("div",null,[p,e("p",null,[e("a",s,[t(" https://blog.csdn.net/u013263891/article/details/82867251 "),a(n)])]),h,e("p",null,[e("a",u,[t(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),a(n)])]),m,e("ul",null,[e("li",null,[e("p",null,[e("a",d,[t(" https://www.learnopencv.com/hough-transform-with-opencv-c-python/"),a(n)])])]),e("li",null,[e("p",null,[e("a",_,[t(" https://blog.csdn.net/u013263891/article/details/82867251"),a(n)])])])])])}const O=o(c,[["render",b],["__file","2019-05-27-_OpenCV实战_33 使用OpenCV进行Hough变换.html.vue"]]);export{O as default};
