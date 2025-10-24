import{_ as n,c as e,a as r,o as i}from"./app-HB0Nuzez.js";const p={};function a(o,t){return i(),e("div",null,t[0]||(t[0]=[r(`<h1 id="opencv实战-31-使用opencv将一个三角形仿射变换到另一个三角形" tabindex="-1"><a class="header-anchor" href="#opencv实战-31-使用opencv将一个三角形仿射变换到另一个三角形"><span>[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形</span></a></h1><p>在本文中，我们会看到如何将一个三角形仿射变换到另一个三角形。在图形学的研究中，研究者常常进行三角形之间的变换操作，因为任意的3D表面都可以用多个三角形去近似表示。同样的，图像也可以分解成多个三角形来表示。但是在OpenCV中并没有直接将三角形仿射变换成另一个三角形的函数。本教程将逐步说明如何将下图中左图中的三角形转换为右图。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030150.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在我们深入研究代码之前，我们需要了解仿射变换是什么。</p><h2 id="_1-什么是仿射变换" tabindex="-1"><a class="header-anchor" href="#_1-什么是仿射变换"><span><strong>1 什么是仿射变换？</strong></span></a></h2><p>仿射变换是将一个3个点的点集（即三角形）来转换到任意3个点另一点集的最简单的方法。它包含平移（移动），缩放，旋转和裁剪等操作。下图说明了如何使用仿射变换来改变正方形的形状。请注意，使用仿射变换，您可以在任何方向和比例下将正方形的形状更改为平行四边形。然而，仿射变换不够灵活，无法将方形变换为任意四边形。换句话说，在仿射变换之后，平行线继续平行。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030193.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在OpenCV中，仿射变换可以用一个2×3的矩阵表示，这个矩阵的前两列表示旋转、缩放、裁剪操作，后两列表示平移操作。如下公式所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030196.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>给定一点 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030180.png" alt="" loading="lazy">，上面的仿射变换使用下面给出的等式得到点 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030182.png" alt="" loading="lazy"> ：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030195.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-使用opencv-进行三角形仿射变换" tabindex="-1"><a class="header-anchor" href="#_2-使用opencv-进行三角形仿射变换"><span><strong>2</strong> <strong>使用OpenCV</strong> <strong>进行三角形仿射变换</strong></span></a></h2><p>我们现在知道，要将三角形变形到另一个三角形，我们将需要使用仿射变换。在OpenCV中，warpAffine函数允许您对图像应用仿射变换，但不能对图像内的三角形区域应用仿射变换。</p><p>为了克服这个限制，我们在源三角形周围找到一个边界框，并从源图像中裁剪出矩形区域。然后，我们将仿射变换应用于裁剪图像以获得输出图像。前一步是至关重要的，因为它允许我们将仿射变换应用于图像的某一区域，从而提高计算性能。最后，我们通过用白色填充输出三角形内的像素来创建三角形掩模。与输出图像相乘时，此掩模将三角形外部的所有像素变为黑色，同时保留三角形内所有像素的颜色。在我们进入细节之前，让我们读入输入和输出图像，并定义输入和输出三角形。对于本教程，我们的输出图像只是白色，但如果您愿意，可以读取另一个图像。</p><h3 id="_2-1-定义输入和输出" tabindex="-1"><a class="header-anchor" href="#_2-1-定义输入和输出"><span>2.1 定义输入和输出</span></a></h3><p>我们现在需要定义输入图像和输出图像，以及输入输出三角形坐标。我们已准备好完成将输入三角形内的所有像素转换为输出三角形所需的步骤。输入输出设定代码如下：</p><p>C++:</p><pre><code>// Read input image and convert to float
Mat img1 = imread(&quot;robot.jpg&quot;);
img1.convertTo(img1, CV_32FC3, 1/255.0);
 
// Output image is set to white
Mat imgOut = Mat::ones(imgIn.size(), imgIn.type());
imgOut = Scalar(1.0,1.0,1.0);
 
// Input triangle
vector &lt;Point2f&gt; tri1;
tri1.push_back(Point2f(360,200));
tri1.push_back(Point2d(60,250));
tri1.push_back(Point2f(450,400));
     
// Output triangle
vector &lt;Point2f&gt; triOut;
tri2.push_back(Point2f(400,200));
tri2.push_back(Point2f(160,270));
tri2.push_back(Point2f(400,400));
</code></pre><p>Python:</p><pre><code># Read input image and convert to float
img1 = cv2.imread(&quot;robot.jpg&quot;)
 
# Output image is set to white
img2 = 255 * np.ones(img_in.shape, dtype = img_in.dtype)
 
# Define input and output triangles 
tri1 = np.float32([[[360,200], [60,250], [450,400]]])
tri2 = np.float32([[[400,200], [160,270], [400,400]]])
</code></pre><h3 id="_2-2-计算边界框" tabindex="-1"><a class="header-anchor" href="#_2-2-计算边界框"><span>2.2 计算边界框</span></a></h3><p>在此步骤中，我们计算三角形周围的边界框。这个想法只是扭曲图像的一小部分而不是整个图像以提高效率。通过boundingRect()得到包覆此三角形的最小正矩形。代码如下：</p><p>C++:</p><pre><code>// Find bounding rectangle for each triangle
Rect r1 = boundingRect(tri1);
Rect r2 = boundingRect(tri2);
</code></pre><p>Python:</p><pre><code># Find bounding box. 
r1 = cv2.boundingRect(tri1)
r2 = cv2.boundingRect(tri2)
</code></pre><h3 id="_2-3-裁剪图像和更改坐标" tabindex="-1"><a class="header-anchor" href="#_2-3-裁剪图像和更改坐标"><span>2.3 裁剪图像和更改坐标</span></a></h3><p>要有效地将仿射变换应用于图像而不是整个图像，我们将根据上一步中计算的边界框裁剪输入图像。还需要修改三角形的坐标以反映它们在新裁剪图像中的位置。这是通过从三角形的x和y坐标减去边界框左上角顶点的x和y坐标来完成的。代码如下：</p><p>C++:</p><pre><code>// Offset points by left top corner of the respective rectangles
vector&lt;Point2f&gt; tri1Cropped, tri2Cropped;
vector&lt;Point&gt; tri2CroppedInt;
 
for(int i = 0; i &lt; 3; i++)
{
    tri1Cropped.push_back( Point2f( tri1[i].x - r1.x, tri1[i].y -  r1.y) );
    tri2Cropped.push_back( Point2f( tri2[i].x - r2.x, tri2[i].y - r2.y) );
 
    // fillConvexPoly needs a vector of Point and not Point2f
    tri2CroppedInt.push_back( Point((int)(tri2[i].x - r2.x), (int)(tri2[i].y - r2.y)) );
}
 
// Apply warpImage to small rectangular patches
Mat img1Cropped;
img1(r1).copyTo(img1Cropped);
</code></pre><p>Python:</p><pre><code># Offset points by left top corner of the 
# respective rectangles
 
tri1Cropped = []
tri2Cropped = []
     
for i in xrange(0, 3):
  tri1Cropped.append(((tri1[0][i][0] - r1[0]),(tri1[0][i][1] - r1[1])))
  tri2Cropped.append(((tri2[0][i][0] - r2[0]),(tri2[0][i][1] - r2[1])))
 
# Apply warpImage to small rectangular patches
img1Cropped = img1[r1[1]:r1[1] + r1[3], r1[0]:r1[0] + r1[2]]
</code></pre><h3 id="_2-4-计算仿射变换矩形" tabindex="-1"><a class="header-anchor" href="#_2-4-计算仿射变换矩形"><span>2.4 计算仿射变换矩形</span></a></h3><p>我们刚刚在裁剪的输入和输出图像中获得了输入和输出三角形的坐标。使用这两个三角形，我们可以找到仿射变换，它将使用以下代码将输入三角形转换为裁剪图像中的输出三角形。</p><p>C++:</p><pre><code>// Given a pair of triangles, find the affine transform.
Mat warpMat = getAffineTransform( tri1Cropped, tri2Cropped );
</code></pre><p>Python:</p><pre><code># Given a pair of triangles, find the affine transform.
warpMat = cv2.getAffineTransform( np.float32(tri1Cropped), np.float32(tri2Cropped) )
</code></pre><h3 id="_2-5-应用仿射变换到三角形" tabindex="-1"><a class="header-anchor" href="#_2-5-应用仿射变换到三角形"><span>2.5 应用仿射变换到三角形</span></a></h3><p>将上一步骤中找到的仿射变换矩阵应用于裁剪的输入图像，以获得裁剪的输出图像。在OpenCV中，您可以使用warpAffine将仿射变换应用于图像。代码如下：</p><p>C++:</p><pre><code>// Apply the Affine Transform just found to the src image
Mat img2Cropped = Mat::zeros(r2.height, r2.width, img1Cropped.type());
warpAffine( img1Cropped, img2Cropped, warpMat, img2Cropped.size(), INTER_LINEAR, BORDER_REFLECT_101);
</code></pre><p>Python:</p><pre><code># Apply the Affine Transform just found to the src image
img2Cropped = cv2.warpAffine( img1Cropped, warpMat, (r2[2], r2[3]), None, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101 )
</code></pre><h3 id="_2-6-屏蔽三角形外的像素" tabindex="-1"><a class="header-anchor" href="#_2-6-屏蔽三角形外的像素"><span>2.6 屏蔽三角形外的像素</span></a></h3><p>在上一步中，我们获得了输出矩形图像。但是，我们对矩形区域内的三角形感兴趣。因此，我们使用fillConvexPoly创建一个掩模，用于遮蔽三角形外的所有像素。这个新的裁剪图像最终可以使用输出边界矩形的左上角坐标点置于输出图像中的正确位置。</p><p>C++:</p><pre><code>// Get mask by filling triangle
Mat mask = Mat::zeros(r2.height, r2.width, CV_32FC3);
fillConvexPoly(mask, tri2CroppedInt, Scalar(1.0, 1.0, 1.0), 16, 0);
     
// Copy triangular region of the rectangular patch to the output image
multiply(img2Cropped,mask, img2Cropped);
multiply(img2(r2), Scalar(1.0,1.0,1.0) - mask, img2(r2));
img2(r2) = img2(r2) + img2Cropped;
</code></pre><p>Python:</p><pre><code># Get mask by filling triangle
mask = np.zeros((r2[3], r2[2], 3), dtype = np.float32)
cv2.fillConvexPoly(mask, np.int32(tri2Cropped), (1.0, 1.0, 1.0), 16, 0);
 
# Apply mask to cropped region
img2Cropped = img2Cropped * mask
 
# Copy triangular region of the rectangular patch to the output image
img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] = img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] * ( (1.0, 1.0, 1.0) - mask )
     
img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] = img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] + img2Cropped
</code></pre><h2 id="_3-代码" tabindex="-1"><a class="header-anchor" href="#_3-代码"><span>3 代码</span></a></h2><p>本文所有代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;stdlib.h&gt;

using namespace cv;
using namespace std;

/**
 * @brief Warps and alpha blends triangular regions from img1 and img2 to img 图像仿射变换
 * 
 * 
 * @param img1 输入图像
 * @param img2 输出图像
 * @param tri1 输入三角形坐标点
 * @param tri2 输出三角形坐标点
 */
void warpTriangle(Mat &amp;img1, Mat &amp;img2, vector&lt;Point2f&gt; tri1, vector&lt;Point2f&gt; tri2)
{
	// Find bounding rectangle for each triangle
	//得到每个三角形的最小外接矩形
	Rect r1 = boundingRect(tri1);
	Rect r2 = boundingRect(tri2);

	// Offset points by left top corner of the respective rectangles
	// 获得剪裁后的坐标点
	//输入和输出三角形坐标点
	vector&lt;Point2f&gt; tri1Cropped, tri2Cropped;
	//输出三角形坐标点int形式
	vector&lt;Point&gt; tri2CroppedInt;
	for (int i = 0; i &lt; 3; i++)
	{
		tri1Cropped.push_back(Point2f(tri1[i].x - r1.x, tri1[i].y - r1.y));
		tri2Cropped.push_back(Point2f(tri2[i].x - r2.x, tri2[i].y - r2.y));

		// fillConvexPoly needs a vector of Point and not Point2f
		tri2CroppedInt.push_back(Point((int)(tri2[i].x - r2.x), (int)(tri2[i].y - r2.y)));
	}

	// Apply warpImage to small rectangular patches 应用仿射变换到三角形外接矩形
	Mat img1Cropped;
	//提取外接矩形区域
	img1(r1).copyTo(img1Cropped);

	// Given a pair of triangles, find the affine transform.
	// 提取仿射变换矩阵
	Mat warpMat = getAffineTransform(tri1Cropped, tri2Cropped);

	// Apply the Affine Transform just found to the src image
	Mat img2Cropped = Mat::zeros(r2.height, r2.width, img1Cropped.type());
	// 应用仿射变换
	warpAffine(img1Cropped, img2Cropped, warpMat, img2Cropped.size(), INTER_LINEAR, BORDER_REFLECT_101);

	// Get mask by filling triangle 获得掩模
	Mat mask = Mat::zeros(r2.height, r2.width, CV_32FC3);
	//填充多边形
	fillConvexPoly(mask, tri2CroppedInt, Scalar(1.0, 1.0, 1.0), 16, 0);

	// Copy triangular region of the rectangular patch to the output image
	// 应用掩模，获得输出图
	// 提取掩模对应的图像区域
	multiply(img2Cropped, mask, img2Cropped);
	// 获得输出图像掩模区域
	multiply(img2(r2), Scalar(1.0, 1.0, 1.0) - mask, img2(r2));
	// 保存仿射变换结果
	img2(r2) = img2(r2) + img2Cropped;
}

int main()
{
	// Read input image and convert to float
	// 读取图像，并将图像转换为float
	Mat imgIn = imread(&quot;./image/robot.jpg&quot;);
	imgIn.convertTo(imgIn, CV_32FC3, 1 / 255.0);

	// Output image is set to white
	Mat imgOut = Mat::ones(imgIn.size(), imgIn.type());
	//设定输出，输出为纯白色图像
	imgOut = Scalar(1.0, 1.0, 1.0);

	// Input triangle 输入三角形坐标点
	vector&lt;Point2f&gt; triIn;
	triIn.push_back(Point2f(360, 200));
	triIn.push_back(Point2d(60, 250));
	triIn.push_back(Point2f(450, 400));

	// Output triangle 输出三角形坐标点
	vector&lt;Point2f&gt; triOut;
	triOut.push_back(Point2f(400, 200));
	triOut.push_back(Point2f(160, 270));
	triOut.push_back(Point2f(400, 400));

	// Warp all pixels inside input triangle to output triangle 仿射变换
	warpTriangle(imgIn, imgOut, triIn, triOut);

	// Draw triangle on the input and output image.

	// Convert back to uint because OpenCV antialiasing
	// does not work on image of type CV_32FC3

	//保存为INT型
	imgIn.convertTo(imgIn, CV_8UC3, 255.0);
	imgOut.convertTo(imgOut, CV_8UC3, 255.0);

	// Draw triangle using this color
	Scalar color = Scalar(255, 150, 0);

	// cv::polylines needs vector of type Point and not Point2f
	vector&lt;Point&gt; triInInt, triOutInt;
	for (int i = 0; i &lt; 3; i++)
	{
		triInInt.push_back(Point(triIn[i].x, triIn[i].y));
		triOutInt.push_back(Point(triOut[i].x, triOut[i].y));
	}

	// Draw triangles in input and output images
	//在图中画出三角形
	polylines(imgIn, triInInt, true, color, 2, 16);
	polylines(imgOut, triOutInt, true, color, 2, 16);

	imshow(&quot;Input&quot;, imgIn);
	imshow(&quot;Output&quot;, imgOut);
	waitKey(0);

	return 0;
}
</code></pre><p>Python:</p><pre><code>#!/usr/bin/env python

# Copyright (c) 2016 Satya Mallick &lt;spmallick@learnopencv.com&gt;
# All rights reserved. No warranty, explicit or implicit, provided.

import cv2
import numpy as np


# Warps and alpha blends triangular regions from img1 and img2 to img
def warpTriangle(img1, img2, tri1, tri2) :
    
    # Find bounding rectangle for each triangle
    r1 = cv2.boundingRect(tri1)
    r2 = cv2.boundingRect(tri2)
    
    # Offset points by left top corner of the respective rectangles
    tri1Cropped = []
    tri2Cropped = []
    
    for i in range(0, 3):
        tri1Cropped.append(((tri1[0][i][0] - r1[0]),(tri1[0][i][1] - r1[1])))
        tri2Cropped.append(((tri2[0][i][0] - r2[0]),(tri2[0][i][1] - r2[1])))

    # Crop input image
    img1Cropped = img1[r1[1]:r1[1] + r1[3], r1[0]:r1[0] + r1[2]]

    # Given a pair of triangles, find the affine transform.
    warpMat = cv2.getAffineTransform( np.float32(tri1Cropped), np.float32(tri2Cropped) )
    
    # Apply the Affine Transform just found to the src image
    img2Cropped = cv2.warpAffine( img1Cropped, warpMat, (r2[2], r2[3]), None, flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101 )

    # Get mask by filling triangle
    mask = np.zeros((r2[3], r2[2], 3), dtype = np.float32)
    cv2.fillConvexPoly(mask, np.int32(tri2Cropped), (1.0, 1.0, 1.0), 16, 0);

    img2Cropped = img2Cropped * mask
    
    # Copy triangular region of the rectangular patch to the output image
    img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] = img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] * ( (1.0, 1.0, 1.0) - mask )
    
    img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] = img2[r2[1]:r2[1]+r2[3], r2[0]:r2[0]+r2[2]] + img2Cropped


if __name__ == &#39;__main__&#39; :

    # Read input image
    imgIn = cv2.imread(&quot;./image/robot.jpg&quot;)
    
    # Output image is set to white
    imgOut = 255 * np.ones(imgIn.shape, dtype = imgIn.dtype)
    
    # Input triangle
    triIn = np.float32([[[360,200], [60,250], [450,400]]])
    
    # Output triangle
    triOut = np.float32([[[400,200], [160,270], [400,400]]])
    
    # Warp all pixels inside input triangle to output triangle
    warpTriangle(imgIn, imgOut, triIn, triOut)

    # Draw triangle using this color
    color = (255, 150, 0)

    # Draw triangles in input and output images.
    cv2.polylines(imgIn, triIn.astype(int), True, color, 2, 16)
    cv2.polylines(imgOut, triOut.astype(int), True, color, 2, 16)

    cv2.imshow(&quot;Input&quot;, imgIn)
    cv2.imshow(&quot;Output&quot;, imgOut)
    
    
    cv2.waitKey(0)
</code></pre><h1 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h1><ul><li><a href="https://www.learnopencv.com/warp-one-triangle-to-another-using-opencv-c-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/warp-one-triangle-to-another-using-opencv-c-python/ </a></li></ul>`,59)]))}const g=n(p,[["render",a],["__file","2019-05-23-_OpenCV实战_31 使用OpenCV将一个三角形仿射变换到另一个三角形.html.vue"]]),c=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-23-_OpenCV%E5%AE%9E%E6%88%98_31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2.html","title":"[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-05-23T10:58:10.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形 在本文中，我们会看到如何将一个三角形仿射变换到另一个三角形。在图形学的研究中，研究者常常进行三角形之间的变换操作，因为任意的3D表面都可以用多个三角形去近似表示。同样的，图像也可以分解成多个三角形来表示。但是在OpenCV中并没有直接将三角形仿射变换成另一个三角形的函数。本教...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-23-_OpenCV%E5%AE%9E%E6%88%98_31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形"}],["meta",{"property":"og:description","content":"[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形 在本文中，我们会看到如何将一个三角形仿射变换到另一个三角形。在图形学的研究中，研究者常常进行三角形之间的变换操作，因为任意的3D表面都可以用多个三角形去近似表示。同样的，图像也可以分解成多个三角形来表示。但是在OpenCV中并没有直接将三角形仿射变换成另一个三角形的函数。本教..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030150.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-05-23T10:58:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030150.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030193.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030196.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030180.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030182.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D31%20%E4%BD%BF%E7%94%A8OpenCV%E5%B0%86%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2/20190523105030195.png\\"],\\"datePublished\\":\\"2019-05-23T10:58:10.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 什么是仿射变换？","slug":"_1-什么是仿射变换","link":"#_1-什么是仿射变换","children":[]},{"level":2,"title":"2 使用OpenCV 进行三角形仿射变换","slug":"_2-使用opencv-进行三角形仿射变换","link":"#_2-使用opencv-进行三角形仿射变换","children":[{"level":3,"title":"2.1 定义输入和输出","slug":"_2-1-定义输入和输出","link":"#_2-1-定义输入和输出","children":[]},{"level":3,"title":"2.2 计算边界框","slug":"_2-2-计算边界框","link":"#_2-2-计算边界框","children":[]},{"level":3,"title":"2.3 裁剪图像和更改坐标","slug":"_2-3-裁剪图像和更改坐标","link":"#_2-3-裁剪图像和更改坐标","children":[]},{"level":3,"title":"2.4 计算仿射变换矩形","slug":"_2-4-计算仿射变换矩形","link":"#_2-4-计算仿射变换矩形","children":[]},{"level":3,"title":"2.5 应用仿射变换到三角形","slug":"_2-5-应用仿射变换到三角形","link":"#_2-5-应用仿射变换到三角形","children":[]},{"level":3,"title":"2.6 屏蔽三角形外的像素","slug":"_2-6-屏蔽三角形外的像素","link":"#_2-6-屏蔽三角形外的像素","children":[]}]},{"level":2,"title":"3 代码","slug":"_3-代码","link":"#_3-代码","children":[]}],"git":{},"readingTime":{"minutes":11,"words":3299},"filePathRelative":"blog/opencv/opencv实战/2019-05-23-[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形.md","localizedDate":"2019年5月23日","excerpt":"\\n<p>在本文中，我们会看到如何将一个三角形仿射变换到另一个三角形。在图形学的研究中，研究者常常进行三角形之间的变换操作，因为任意的3D表面都可以用多个三角形去近似表示。同样的，图像也可以分解成多个三角形来表示。但是在OpenCV中并没有直接将三角形仿射变换成另一个三角形的函数。本教程将逐步说明如何将下图中左图中的三角形转换为右图。</p>\\n<figure><img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]31 使用OpenCV将一个三角形仿射变换到另一个三角形/20190523105030150.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{g as comp,c as data};
