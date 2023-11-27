import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as c,c as a,a as n,b as t,d as o,e as s}from"./app-MsA2k2kn.js";const l={},p=n("h1",{id:"opencv实战-9-使用opencv寻找平面图形的质心",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#opencv实战-9-使用opencv寻找平面图形的质心","aria-hidden":"true"},"#"),t(" [OpenCV实战]9 使用OpenCV寻找平面图形的质心")],-1),u=n("p",null,"在中学，我们学习了几何的中各种平面图形。找到标准平面图形的中心(几何中心)比较容易，如圆形，方形，三角形，椭圆形等。中心是几何名词，质心是物理名词。质心是针对实物体而言的，而几何中心是针对抽象几何体而言的，对于密度均匀标准形状的物体，质心和几何中心重合。",-1),g=n("p",null,"但是当要找到任意形状的质心时，就不那么容易了。",-1),m=n("p",null,"在处理图像时，很多时候需要找到质心。在这篇文章中，我们将首先讨论如何找到任意形状blob的质心，然后我们将转向多个blob的情况。",-1),h=n("p",null,"工程代码：",-1),d={href:"https://download.csdn.net/download/luohenyj/11025933",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},f=s(`<h2 id="_1-名词解释" tabindex="-1"><a class="header-anchor" href="#_1-名词解释" aria-hidden="true">#</a> <strong>1 名词解释</strong></h2><p>（1）blob</p><p>blob在机器视觉中是指图像中的具有相似颜色、纹理等特征所组成的一块连通区域。。在这篇文章中，我们的目标是在Python和C ++中使用OpenCV找到blob的中心。</p><p>（2）质心</p><p>一个平面图形的质心是平面图形所有点的算术平均值（即平均值）。假设一个平面图形由n个点xi组成，那么质心由下式给出</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在图像处理和计算机视觉领域中，每个平面图形由像素点构成，并且质心坐标为构成平面图形的所有像素点坐标的加权平均。</p><p>（3）图像矩</p><p>在OpenCV，我们用blob来称呼平面图形。我们可以在OpenCV中使用图像矩找到blob的中心。图像矩是图像像素值的加权平均值，借助它我们可以找到图像的一些特定属性，如半径，面积，质心等。为了找到图像的质心，我们通常将其二值化然后找到它的质心。质心由下式给出：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Cx是质心的x坐标，Cy是质心的y坐标。M表示图像几何矩。注意M00可能等于0</p><p>其中图像矩计算如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-在opencv-中查找blob-质心的步骤" tabindex="-1"><a class="header-anchor" href="#_2-在opencv-中查找blob-质心的步骤" aria-hidden="true">#</a> <strong>2</strong> <strong>在OpenCV</strong> <strong>中查找Blob</strong> <strong>质心的步骤</strong></h2><p>要找到blob的质心，我们将执行以下步骤： -</p><p>1.将图像转换为灰度图。</p><p>2.对图像执行二值化。</p><p>3.计算图像矩后找到图像的中心。</p><p>单个blob的质心寻找。pch为预编译文件</p><p>C++代码：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;iostream&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

using namespace cv;
using namespace std;


int main()
{
	String img_path = &quot;./image/circle.png&quot;;
	Mat src, gray, thr;
	
	src = imread(img_path);

	// convert image to grayscale 获取灰度图
	cvtColor(src, gray, COLOR_BGR2GRAY);

	// convert grayscale to binary image 二值化
	threshold(gray, thr, 0, 255, THRESH_OTSU);

	// find moments of the image 提取二值图像矩，true表示图像二值化了
	Moments m = moments(thr, true);
	Point p(m.m10 / m.m00, m.m01 / m.m00);

	// coordinates of centroid 质心坐标
	cout &lt;&lt; Mat(p) &lt;&lt; endl;

	// show the image with a point mark at the centroid 画出质心
	circle(src, p, 5, Scalar(128, 0, 0), -1);
	imshow(&quot;show&quot;, src);
	waitKey(0);
	return 0;
}
</code></pre><p>python代码：</p><pre><code>#coding=utf-8
import cv2
import numpy as np


# read image through command line 
img = cv2.imread(&#39;./image/circle.png&#39;)

# convert image to grayscale image
gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
 
# convert the grayscale image to binary image
ret,thresh = cv2.threshold(gray_image,127,255,0)
 
# calculate moments of binary image
M = cv2.moments(thresh)
 
# calculate x,y coordinate of center
cX = int(M[&quot;m10&quot;] / M[&quot;m00&quot;])
cY = int(M[&quot;m01&quot;] / M[&quot;m00&quot;])
 
# put text and highlight the center
cv2.circle(img, (cX, cY), 5, (255, 255, 255), -1)
cv2.putText(img, &quot;centroid&quot;, (cX - 25, cY - 25),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
 
# display the image
cv2.imshow(&quot;Image&quot;, img)
cv2.waitKey(0)
</code></pre><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-图像多个blob-下的质心获取" tabindex="-1"><a class="header-anchor" href="#_3-图像多个blob-下的质心获取" aria-hidden="true">#</a> <strong>3</strong> <strong>图像多个blob</strong> <strong>下的质心获取</strong></h2><p>找到一个blob的质心非常容易，但是如果Image中有多个blob，我们将不得不使用findContours来查找图像中的轮廓数量并找到每个轮廓的中心。然后再计算几何矩。</p><p>C++代码：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;iostream&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

using namespace cv;
using namespace std;

RNG rng(12345);

void find_moments(Mat src);

int main()
{
	String img_path = &quot;./image/multiple.png&quot;;
	/// Load source image, convert it to gray
	Mat src, gray;
	src = imread(img_path);

	cvtColor(src, gray, COLOR_BGR2GRAY);

	//显示原图
	namedWindow(&quot;Source&quot;, WINDOW_AUTOSIZE);
	imshow(&quot;Source&quot;, src);

	// call function to find_moments 寻质心函数
	find_moments(gray);

	waitKey(0);
	return(0);
}

void find_moments(Mat gray)
{
	Mat canny_output;
	//各个轮廓的点集合
	vector&lt;vector&lt;Point&gt; &gt; contours;
	//轮廓输出结果向量
	vector&lt;Vec4i&gt; hierarchy;

	/// Detect edges using canny 边缘算子提取轮廓
	Canny(gray, canny_output, 50, 150, 3);
	// Find contours 寻找轮廓 RETR_TREE表示提取所有轮廓
	findContours(canny_output, contours, hierarchy, RETR_TREE, CHAIN_APPROX_SIMPLE, Point(0, 0));

	/// Get the moments 图像矩
	vector&lt;Moments&gt; mu(contours.size());
	//求取每个轮廓的矩
	for (int i = 0; i &lt; contours.size(); i++)
	{
		mu[i] = moments(contours[i], false);
	}

	///  Get the centroid of figures. 轮廓质点
	vector&lt;Point2f&gt; mc(contours.size());
	for (int i = 0; i &lt; contours.size(); i++)
	{
		mc[i] = Point2f(mu[i].m10 / mu[i].m00, mu[i].m01 / mu[i].m00);
	}

	/// Draw contours
	//画轮廓
	Mat drawing(canny_output.size(), CV_8UC3, Scalar(255, 255, 255));

	for (int i = 0; i &lt; contours.size(); i++)
	{
		Scalar color = Scalar(167, 151, 0);
		//画轮廓
		drawContours(drawing, contours, i, color, 2, 8, hierarchy, 0, Point());
		//画质心
		circle(drawing, mc[i], 4, color, -1, 7, 0);
	}

	/// Show the resultant image
	namedWindow(&quot;Contours&quot;, WINDOW_AUTOSIZE);
	imshow(&quot;Contours&quot;, drawing);
	waitKey(0);
}
</code></pre><p>python代码：</p><pre><code>#coding=utf-8
import cv2
import numpy as np


img = cv2.imread(&#39;./image/multiple.png&#39;)

# convert the image to grayscale
gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# convert the grayscale image to binary image
ret,thresh = cv2.threshold(gray_image,127,255,0)

# find contour in the binary image
contours, hierarchy = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
# find contour in the binary image(opencv4)
#binary, contours, opt  = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
for c in contours:
	# calculate moments for each contour
	M = cv2.moments(c)
	cX = int(M[&quot;m10&quot;] / M[&quot;m00&quot;])
	cY = int(M[&quot;m01&quot;] / M[&quot;m00&quot;])
	
	
    # calculate x,y coordinate of center
	cv2.circle(img, (cX, cY), 5, (255, 255, 255), -1)
	cv2.putText(img, &quot;centroid&quot;, (cX - 25, cY - 25),cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)


# 3.4.1 im2, contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
# 3.2.0 im2, contours, hierarchy = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE) 	

# display the image
cv2.imshow(&quot;Image&quot;, img)
cv2.waitKey(0)
</code></pre><p>结果：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]9 使用OpenCV寻找平面图形的质心/7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> <strong>4 参考</strong></h2>`,36),b={href:"https://www.learnopencv.com/find-center-of-blob-centroid-using-opencv-cpp-python/",target:"_blank",rel:"noopener noreferrer"};function y(v,C){const e=r("ExternalLinkIcon");return c(),a("div",null,[p,u,g,m,h,n("p",null,[n("a",d,[t(" https://download.csdn.net/download/luohenyj/11025933"),o(e)])]),n("p",null,[n("a",_,[t(" https://github.com/luohenyueji/OpenCV-Practical-Exercise"),o(e)])]),f,n("ul",null,[n("li",null,[n("a",b,[t(" https://www.learnopencv.com/find-center-of-blob-centroid-using-opencv-cpp-python/ "),o(e)])])])])}const q=i(l,[["render",y],["__file","2019-03-16-_OpenCV实战_9 使用OpenCV寻找平面图形的质心.html.vue"]]);export{q as default};
