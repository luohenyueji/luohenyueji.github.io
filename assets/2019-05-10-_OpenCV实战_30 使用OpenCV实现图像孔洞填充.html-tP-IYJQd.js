import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as r,c as _,a as e,b as n,d as i,e as l}from"./app-MsA2k2kn.js";const s={},p=l('<h1 id="opencv实战-30-使用opencv实现图像孔洞填充" tabindex="-1"><a class="header-anchor" href="#opencv实战-30-使用opencv实现图像孔洞填充" aria-hidden="true">#</a> [OpenCV实战]30 使用OpenCV实现图像孔洞填充</h1><p>在本教程中，我们将学习如何填充二值图像中的孔。考虑下图左侧的图像。假设我们想要找到一个二值掩模，它将硬币与背景分开，如下图右侧图像所示。在本教程中，包含硬币的圆形区域也将被称为前景。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]30 使用OpenCV实现图像孔洞填充/2019051014423981.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>请注意，硬币的边界是黑色的，与白色背景不同。因此，我们使用简单的图像阈值来将边界与背景分开。换句话说，我们说强度高于某个值（阈值）的像素是背景，其余像素是前景。上图中间图像显示通过阈值分割获得图像（黑色代表背景，白色代表前景）。不幸的是，即使边界被很好地提取（它是纯白色），硬币的内部也具有与背景类似的强度。因此，阈值操作不能将其与背景分开。我们如何用白色填充圆形边界内的所有像素？然后将其分开。</p><h2 id="_1-imfill-in-opencv" tabindex="-1"><a class="header-anchor" href="#_1-imfill-in-opencv" aria-hidden="true">#</a> <strong>1 imfill in OpenCV</strong></h2><p>MATLAB有一个名为imfill的函数，可以让你填充孔洞。OpenCV中没有imfill功能，但我们肯定可以写一个！我们知道像素点（0,0）连接到背景。因此，我们可以通过从像素（0,0）执行填充操作来提取背景。不受漫水填充操作影响的像素必然位于边界内。阈值图像与漫水填充图像或非运算后图像为前景掩模！</p><p>漫水填充算法是用来标记一片区域的：设置一个种子点，然后种子点附近的相似点都被填充同一种颜色。该算法应用性很广，比如目标识别，photoshop 的魔术棒功能等等，是填充类算法中应用最为广泛的一个算法。漫水填充也可以用来从输入图像获取掩码区域，掩码会加速处理过程，或者只处理掩码指定的像素点。其中掩膜Mask用于进一步控制那些区域将被填充颜色。漫水填充在OpenCV中通过floodfill函数实现，具体见：</p>',7),h={href:"https://blog.csdn.net/qq_37385726/article/details/82313004",target:"_blank",rel:"noopener noreferrer"},d=l('<p>在OpenCV中实现imfill结果类似下图，步骤如下：</p><p>1）读取图像，并转换为灰度图像，如下图1所示；</p><p>2）对输入图像进行阈值分割以获得二值图像，如下图2所示；</p><p>3）对于阈值分割后的图像进行漫水填充，从像素（0,0）填充颜色。请注意，步骤2和步骤3的输出之间的差异在于步骤3中的背景现在是白色的，如下图3所示。</p><p>4）反转漫水填充后的图像（即黑色变为白色，白色变为黑色），如下图4所示。</p><p>5）使用按位OR运算将阈值图像与反向漫水填充图像组合以获得填充有孔的最终前景掩模。步骤4中的图像在边界内具有一些黑色区域。根据设计，步骤2中的图像填充了这些孔。因此，我们将两者结合起来获得掩模，如下图5所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]30 使用OpenCV实现图像孔洞填充/20190510144239142.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-完整代码" tabindex="-1"><a class="header-anchor" href="#_2-完整代码" aria-hidden="true">#</a> 2 完整代码</h2><p>还有其他方法可以解决同样的问题。一种方法是使用形态学闭运算操作。但是，要进行形态学操作，您需要知道孔的最大尺寸。另一种方法是使用findContours查找轮廓，然后使用drawContours填充它。我更喜欢这篇文章中所描述的技术的简单性和速度。</p><p>本文所有代码见：</p>',10),c={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"C++:",-1),f=e("pre",null,[e("code",null,`#include "pch.h"
#include <opencv2/opencv.hpp>

using namespace cv;

int main()
{
    // Read image 读取图像
    Mat im_in = imread("./image/nickel.jpg", IMREAD_GRAYSCALE);

  
    // Threshold.
    // Set values equal to or above 220 to 0.
    // Set values below 220 to 255.
	//阈值分割
    Mat im_th;
    threshold(im_in, im_th, 220, 255, THRESH_BINARY_INV);
    
    // Floodfill from point (0, 0) 以点(0,0)为种子点，进行漫水填充
    Mat im_floodfill = im_th.clone();
    floodFill(im_floodfill, cv::Point(0,0), Scalar(255));
    
    // Invert floodfilled image 反转图像
    Mat im_floodfill_inv;
    bitwise_not(im_floodfill, im_floodfill_inv);
    
    // Combine the two images to get the foreground. 获得前景
    Mat im_out = (im_th | im_floodfill_inv);

    // Display images 图像展示
    imshow("Thresholded Image", im_th);
    imshow("Floodfilled Image", im_floodfill);
    imshow("Inverted Floodfilled Image", im_floodfill_inv);
    imshow("Foreground", im_out);
    waitKey(0);
	return 0;
}
`)],-1),u=e("p",null,"python：",-1),g=e("pre",null,[e("code",null,`#!/usr/bin/env python

import cv2;
import numpy as np;

# Read image
im_in = cv2.imread("./image/nickel.jpg", cv2.IMREAD_GRAYSCALE);

# Threshold.
# Set values equal to or above 220 to 0.
# Set values below 220 to 255.

th, im_th = cv2.threshold(im_in, 220, 255, cv2.THRESH_BINARY_INV);

# Copy the thresholded image.
im_floodfill = im_th.copy()

# Mask used to flood filling.
# Notice the size needs to be 2 pixels than the image.
h, w = im_th.shape[:2]
mask = np.zeros((h+2, w+2), np.uint8)

# Floodfill from point (0, 0)
cv2.floodFill(im_floodfill, mask, (0,0), 255);

# Invert floodfilled image
im_floodfill_inv = cv2.bitwise_not(im_floodfill)

# Combine the two images to get the foreground.
im_out = im_th | im_floodfill_inv

# Display images.
cv2.imshow("Thresholded Image", im_th)
cv2.imshow("Floodfilled Image", im_floodfill)
cv2.imshow("Inverted Floodfilled Image", im_floodfill_inv)
cv2.imshow("Foreground", im_out)
cv2.waitKey(0)
`)],-1),v=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),n(" 3 参考")],-1),b={href:"https://www.learnopencv.com/filling-holes-in-an-image-using-opencv-python-c/",target:"_blank",rel:"noopener noreferrer"};function w(C,V){const o=a("ExternalLinkIcon");return r(),_("div",null,[p,e("p",null,[e("a",h,[n(" https://blog.csdn.net/qq_37385726/article/details/82313004"),i(o)])]),d,e("p",null,[e("a",c,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),i(o)])]),m,f,u,g,v,e("p",null,[e("a",b,[n(" https://www.learnopencv.com/filling-holes-in-an-image-using-opencv-python-c/"),i(o)])])])}const I=t(s,[["render",w],["__file","2019-05-10-_OpenCV实战_30 使用OpenCV实现图像孔洞填充.html.vue"]]);export{I as default};
