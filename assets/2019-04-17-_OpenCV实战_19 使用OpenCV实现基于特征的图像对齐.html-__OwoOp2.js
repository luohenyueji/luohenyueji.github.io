import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as s,c as p,a as e,b as n,d as a,e as i}from"./app-MsA2k2kn.js";const c={},h=i('<h1 id="opencv实战-19-使用opencv实现基于特征的图像对齐" tabindex="-1"><a class="header-anchor" href="#opencv实战-19-使用opencv实现基于特征的图像对齐" aria-hidden="true">#</a> [OpenCV实战]19 使用OpenCV实现基于特征的图像对齐</h1><p>在这篇文章中，我们将学习如何使用OpenCV执行基于特征的图像对齐。我们将使用移动电话拍摄的表格的照片与表格的模板对齐。我们将使用的技术通常被称为“基于特征图像对齐”，因为在该技术中，在一个图像中检测稀疏的特征集并且在另一图像中进行特征匹配。然后基于这些匹配特征将原图像映射到另一个图像，实现图像对齐。如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]19 使用OpenCV实现基于特征的图像对齐/20190417110516427.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景" aria-hidden="true">#</a> <strong>1</strong> <strong>背景</strong></h2><h3 id="_1-1-什么是图像对齐或图像对准" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是图像对齐或图像对准" aria-hidden="true">#</a> <strong>1.1</strong> <strong>什么是图像对齐或图像对准？</strong></h3><p>在许多应用程序中，我们有两个相同场景或同一文档的图像，但它们没有对齐。换句话说，如果您在一个图像上选择一个特征（例如白纸的一个边角），则另一个图像中同一个边角的坐标会有很大差异。图像对齐（也称为图像配准）是使一个图像（或两个图像）进行变换的方法，使得两个图像中的特征完美地对齐。入戏</p><p>下面是一个例子，中间的表是手机拍摄的表格，左边的表是原始文档。中间的表在经过图像对齐技术处理之后结果如右图所示，可以和左边的模板一样。对齐之后就可以根据模板的格式对用户填写的内容进行分析了。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]19 使用OpenCV实现基于特征的图像对齐/20190417110517250.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-2-图像对齐的应用" tabindex="-1"><a class="header-anchor" href="#_1-2-图像对齐的应用" aria-hidden="true">#</a> <strong>1.2</strong> <strong>图像对齐的应用</strong></h3><p>图像对齐有许多应用。</p><p>在许多文档处理应用程序中，第一步是将扫描或拍摄的文档与模板对齐。例如，如果要编写自动表单阅读器，最好先将表单与其模板对齐，然后根据模板中的固定位置读取字段。</p><p>在一些医学应用中，可以把多次拍摄的照片拼接起来。</p><p>图像对齐最有趣的应用可能是创建全景图。在这种情况下，两个图像不是平面的图像而是3D场景的图像。通常，3D对齐需要深度信息。然而，当通过围绕其光轴旋转相机拍摄两个图像时（如全景图的情况），我们可以使用本教程中描述的技术来对齐全景图的两张图像。</p><h3 id="_1-3-图像对齐基础理论" tabindex="-1"><a class="header-anchor" href="#_1-3-图像对齐基础理论" aria-hidden="true">#</a> 1.3 图像对齐基础理论</h3><p>图像对齐技术的核心是一个简单的3×3矩阵，称为Homography(单应性变换)。具体见：</p>',15),m={href:"https://blog.csdn.net/LuohenYJ/article/details/89334249",target:"_blank",rel:"noopener noreferrer"},l={href:"https://en.wikipedia.org/wiki/Homography",target:"_blank",rel:"noopener noreferrer"},d={href:"https://mp.weixin.qq.com/s/-XrjAjf8ItNMkQyqvcjATQ",target:"_blank",rel:"noopener noreferrer"},g=i('<p>我们来看看用法。</p><p>C ++</p><blockquote><p>findHomography(points1, points2, h)</p></blockquote><p>python</p><blockquote><p>h, status = cv2.findHomography(points1, points2)</p></blockquote><p>其中，points1和points2是矢量/对应点的阵列，以及ħ是单应性矩阵。</p><h3 id="_1-4-如何找到对应点" tabindex="-1"><a class="header-anchor" href="#_1-4-如何找到对应点" aria-hidden="true">#</a> 1.4 如何找到对应点</h3><p>在许多计算机视觉应用中，我们经常需要识别图像中有趣的稳定点。这些点称为关键点或特征点。在OpenCV中实现了几个关键点检测器（例如SIFT，SURF和ORB）。在本教程中，我们将使用ORB特征检测器，因为SIFT和SURF已获得专利，如果您想在实际应用中使用它，则需要支付许可费。ORB快速，准确且无许可证！ORB关键点使用圆圈显示在下图中。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]19 使用OpenCV实现基于特征的图像对齐/20190417110518138.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>ORB代表Oriented FAST和Rotated BRIEF；让我们看看FAST和BRIEF是什么意思。</p><p>特征点检测器有两个部分</p><p>(1) 定位器</p><p>识别图像上在图像变换下稳定不变的点，如平移（移位），缩放（增大/减小）和旋转。定位器找到这些点的x，y坐标。ORB检测器使用的定位器称为FAST。详细信息见：</p>',13),_={href:"https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_feature2d/py_fast/py_fast.html",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"(2) 特征描述子",-1),f=e("p",null,"上述步骤中的定位器只能告诉我们有趣的点在哪里。特征检测器的第二部分是特征描述子，它对点的外观进行编码，以便我们可以分辨不同的特征点。在特征点评估的特征描述只是一个数字数组。理想情况下，两个图像中的相同物理点应具有相同的特征描述。ORB使用名为BRISK的特征描述子。详细信息见：",-1),y={href:"https://www.robots.ox.ac.uk/~vgg/rg/papers/brisk.pdf",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"定位器和特征描述子应用很广泛。计算机视觉的许多应用中，我们分两步解决识别问题a）定位；2）识别。例如，为了实现面部识别系统，我们首先需要一个面部检测器，其输出面部所在矩形的坐标。检测器不知道或不关心该人是谁。唯一的工作就是找到一张脸。系统的第二部分是识别算法。原始图像被裁剪为检测到的面部矩形，并且该裁剪的图像反馈送到最终识别该人的面部识别算法。特征检测器的定位器就像面部检测器。描述子类似识别器。",-1),R=e("p",null,"只有当我们知道两个图像中的对应特征时，才能计算出与两个图像相关的单应性。因此，使用匹配算法来查找一个图像中的哪些特征与另一图像中的特征匹配。为此，将一个图像中的每个特征的描述子与第二个图像中的每个特征的描述子进行比较，以找到良好的匹配点。也就是说我们可以通过描述子找到要匹配的特征点，然后根据这些匹配的特征点，计算两个图像相关的单应性，实现图像映射。",-1),v=e("p",null,"ORB其他信息可以见",-1),w={href:"https://www.jianshu.com/p/387b8ac04c94",target:"_blank",rel:"noopener noreferrer"},C=i('<h2 id="_2-opencv的图像对齐" tabindex="-1"><a class="header-anchor" href="#_2-opencv的图像对齐" aria-hidden="true">#</a> 2 OpenCV的图像对齐</h2><h3 id="_2-1-基于特征的图像对齐的步骤" tabindex="-1"><a class="header-anchor" href="#_2-1-基于特征的图像对齐的步骤" aria-hidden="true">#</a> 2.1 基于特征的图像对齐的步骤</h3><p>现在我们可以总结图像对齐所涉及的步骤。</p><p>Step1读图</p><p>我们首先在C ++中和Python中读取参考图像（或模板图像）和我们想要与此模板对齐的图像。</p><p>Step2寻找特征点</p><p>我们检测两个图像中的ORB特征。虽然我们只需要4个特征来计算单应性，但通常在两个图像中检测到数百个特征。我们使用Python和C ++代码中的参数MAX_FEATURES来控制功能的数量。</p><p>Step3 特征点匹配</p><p>我们在两个图像中找到匹配的特征，按匹配的评分对它们进行排序，并保留一小部分原始匹配。我们使用汉明距离（hamming distance）作为两个特征描述符之间相似性的度量。请注意，我们有许多不正确的匹配。</p><p>Step4 计算Homography</p><p>当我们在两个图像中有4个或更多对应点时，可以计算单应性。上一节中介绍的自动功能匹配并不总能产生100％准确的匹配。20-30％的比赛不正确并不罕见。幸运的是，findHomography方法利用称为随机抽样一致性算法（RANSAC）的强大估计技术，即使在存在大量不良匹配的情况下也能产生正确的结果。RANSAC具体介绍见：</p>',11),F={href:"https://www.cnblogs.com/xingshansi/p/6763668.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/zinnc/article/details/52319716",target:"_blank",rel:"noopener noreferrer"},O=e("p",null,"Step5 图像映射",-1),M=e("p",null,"一旦计算出准确的单应性，我可以应用于一个图像中的所有像素，以将其映射到另一个图像。这是使用OpenCV中的warpPerspective函数完成的。",-1),x=e("h3",{id:"_2-2-代码",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-2-代码","aria-hidden":"true"},"#"),n(" 2.2 代码")],-1),A=e("p",null,"在本节中，我们将使用OpenCV呈现用于图像对齐的C++和Python代码。所处理的对象为对本文第二张图所示的三张图。其中第一张图为参考图像，第二张图为用于对齐的图，第三张图为结果图像。第一张图和第二张图特征点匹配的结果如下图所示：",-1),G=e("figure",null,[e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]19 使用OpenCV实现基于特征的图像对齐/20190417110520395.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),V=e("p",null,"所有代码见：",-1),E={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,"C++代码如下：",-1),B=e("pre",null,[e("code",null,`// OpenCV_Align.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include "pch.h"
#include <iostream>

#include <opencv2/opencv.hpp>
#include "opencv2/xfeatures2d.hpp"
#include "opencv2/features2d.hpp"

using namespace std;
using namespace cv;
using namespace cv::xfeatures2d;

//最大特征点数
const int MAX_FEATURES = 500;
//好的特征点数
const float GOOD_MATCH_PERCENT = 0.15f;

/**
 * @brief 图像对齐
 *
 * @param im1 对齐图像
 * @param im2 模板图像
 * @param im1Reg 输出图像
 * @param h
 */
void alignImages(Mat &im1, Mat &im2, Mat &im1Reg, Mat &h)
{
	// Convert images to grayscale
	Mat im1Gray, im2Gray;
	//转换为灰度图
	cvtColor(im1, im1Gray, CV_BGR2GRAY);
	cvtColor(im2, im2Gray, CV_BGR2GRAY);

	// Variables to store keypoints and descriptors
	//关键点
	std::vector<KeyPoint> keypoints1, keypoints2;
	//特征描述符
	Mat descriptors1, descriptors2;

	// Detect ORB features and compute descriptors. 计算ORB特征和描述子
	Ptr<Feature2D> orb = ORB::create(MAX_FEATURES);
	orb->detectAndCompute(im1Gray, Mat(), keypoints1, descriptors1);
	orb->detectAndCompute(im2Gray, Mat(), keypoints2, descriptors2);

	// Match features. 特征点匹配
	std::vector<DMatch> matches;
	//汉明距离进行特征点匹配
	Ptr<DescriptorMatcher> matcher = DescriptorMatcher::create("BruteForce-Hamming");
	matcher->match(descriptors1, descriptors2, matches, Mat());

	// Sort matches by score 按照特征点匹配结果从优到差排列
	std::sort(matches.begin(), matches.end());

	// Remove not so good matches 移除不好的特征点
	const int numGoodMatches = matches.size() * GOOD_MATCH_PERCENT;
	matches.erase(matches.begin() + numGoodMatches, matches.end());

	// Draw top matches
	Mat imMatches;
	//画出特征点匹配图
	drawMatches(im1, keypoints1, im2, keypoints2, matches, imMatches);
	imwrite("matches.jpg", imMatches);

	// Extract location of good matches
	std::vector<Point2f> points1, points2;

	//保存对应点
	for (size_t i = 0; i < matches.size(); i++)
	{
		//queryIdx是对齐图像的描述子和特征点的下标。
		points1.push_back(keypoints1[matches[i].queryIdx].pt);
		//queryIdx是是样本图像的描述子和特征点的下标。
		points2.push_back(keypoints2[matches[i].trainIdx].pt);
	}

	// Find homography 计算Homography，RANSAC随机抽样一致性算法
	h = findHomography(points1, points2, RANSAC);

	// Use homography to warp image 映射
	warpPerspective(im1, im1Reg, h, im2.size());
}

int main()
{
	// Read reference image 读取参考图像
	string refFilename("./image/form.jpg");
	cout << "Reading reference image : " << refFilename << endl;
	Mat imReference = imread(refFilename);

	// Read image to be aligned 读取对准图像
	string imFilename("./image/scanned-form.jpg");
	cout << "Reading image to align : " << imFilename << endl;
	Mat im = imread(imFilename);

	// Registered image will be resotred in imReg.
	// The estimated homography will be stored in h.
	//结果图像，单应性矩阵
	Mat imReg, h;

	// Align images
	cout << "Aligning images ..." << endl;
	alignImages(im, imReference, imReg, h);

	// Write aligned image to disk.
	string outFilename("aligned.jpg");
	cout << "Saving aligned image : " << outFilename << endl;
	imwrite(outFilename, imReg);

	// Print estimated homography
	cout << "Estimated homography : \\n" << h << endl;
	return 0;
}
`)],-1),T=e("p",null,"Python代码如下：",-1),j=e("pre",null,[e("code",null,`from __future__ import print_function
import cv2
import numpy as np


MAX_MATCHES = 500
GOOD_MATCH_PERCENT = 0.15


def alignImages(im1, im2):

  # Convert images to grayscale
  im1Gray = cv2.cvtColor(im1, cv2.COLOR_BGR2GRAY)
  im2Gray = cv2.cvtColor(im2, cv2.COLOR_BGR2GRAY)
  
  # Detect ORB features and compute descriptors.
  orb = cv2.ORB_create(MAX_MATCHES)
  keypoints1, descriptors1 = orb.detectAndCompute(im1Gray, None)
  keypoints2, descriptors2 = orb.detectAndCompute(im2Gray, None)
  
  # Match features.
  matcher = cv2.DescriptorMatcher_create(cv2.DESCRIPTOR_MATCHER_BRUTEFORCE_HAMMING)
  matches = matcher.match(descriptors1, descriptors2, None)
  
  # Sort matches by score
  matches.sort(key=lambda x: x.distance, reverse=False)

  # Remove not so good matches
  numGoodMatches = int(len(matches) * GOOD_MATCH_PERCENT)
  matches = matches[:numGoodMatches]

  # Draw top matches
  imMatches = cv2.drawMatches(im1, keypoints1, im2, keypoints2, matches, None)
  cv2.imwrite("matches.jpg", imMatches)
  
  # Extract location of good matches
  points1 = np.zeros((len(matches), 2), dtype=np.float32)
  points2 = np.zeros((len(matches), 2), dtype=np.float32)

  for i, match in enumerate(matches):
    points1[i, :] = keypoints1[match.queryIdx].pt
    points2[i, :] = keypoints2[match.trainIdx].pt
  
  # Find homography
  h, mask = cv2.findHomography(points1, points2, cv2.RANSAC)

  # Use homography
  height, width, channels = im2.shape
  im1Reg = cv2.warpPerspective(im1, h, (width, height))
  
  return im1Reg, h


if __name__ == '__main__':
  
  # Read reference image
  refFilename = "./image/form.jpg"
  print("Reading reference image : ", refFilename)
  imReference = cv2.imread(refFilename, cv2.IMREAD_COLOR)

  # Read image to be aligned
  imFilename = "./image/scanned-form.jpg"
  print("Reading image to align : ", imFilename);  
  im = cv2.imread(imFilename, cv2.IMREAD_COLOR)
  
  print("Aligning images ...")
  # Registered image will be resotred in imReg. 
  # The estimated homography will be stored in h. 
  imReg, h = alignImages(im, imReference)
  
  # Write aligned image to disk. 
  outFilename = "aligned.jpg"
  print("Saving aligned image : ", outFilename); 
  cv2.imwrite(outFilename, imReg)

  # Print estimated homography
  print("Estimated homography : \\n",  h)
`)],-1),H=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),n(" 3 参考")],-1),I={href:"https://www.learnopencv.com/image-alignment-feature-based-using-opencv-c-python/",target:"_blank",rel:"noopener noreferrer"};function N(P,z){const t=r("ExternalLinkIcon");return s(),p("div",null,[h,e("p",null,[e("a",m,[n(" https://blog.csdn.net/LuohenYJ/article/details/89334249"),a(t)])]),e("p",null,[e("a",l,[n(" https://en.wikipedia.org/wiki/Homography"),a(t)])]),e("p",null,[e("a",d,[n(" https://mp.weixin.qq.com/s/-XrjAjf8ItNMkQyqvcjATQ"),a(t)])]),g,e("p",null,[e("a",_,[n("https://docs.opencv.org/3.0-beta/doc/py_tutorials/py_feature2d/py_fast/py_fast.html "),a(t)])]),u,f,e("p",null,[e("a",y,[n(" https://www.robots.ox.ac.uk/~vgg/rg/papers/brisk.pdf "),a(t)])]),b,R,v,e("p",null,[e("a",w,[n(" https://www.jianshu.com/p/387b8ac04c94"),a(t)])]),C,e("p",null,[e("a",F,[n(" https://www.cnblogs.com/xingshansi/p/6763668.html "),a(t)])]),e("p",null,[e("a",k,[n(" https://blog.csdn.net/zinnc/article/details/52319716 "),a(t)])]),O,M,x,A,G,V,e("p",null,[e("a",E,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),a(t)])]),S,B,T,j,H,e("ul",null,[e("li",null,[e("a",I,[n(" https://www.learnopencv.com/image-alignment-feature-based-using-opencv-c-python/ "),a(t)])])])])}const q=o(c,[["render",N],["__file","2019-04-17-_OpenCV实战_19 使用OpenCV实现基于特征的图像对齐.html.vue"]]);export{q as default};
