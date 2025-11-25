import{_ as n,c as a,a as t,o}from"./app-CJwJJlha.js";const i={};function p(l,e){return o(),a("div",null,e[0]||(e[0]=[t(`<h1 id="opencv实战-29-使用opencv实现红眼自动去除" tabindex="-1"><a class="header-anchor" href="#opencv实战-29-使用opencv实现红眼自动去除"><span>[OpenCV实战]29 使用OpenCV实现红眼自动去除</span></a></h1><p>在本教程中，我们将学习如何完全自动地从照片中消除红眼。如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150754666.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当我们晚上拍摄的照片有红眼效果时，带着血腥眼睛的微笑的人会让人想起德古拉。使用照片编辑工具可以删除红眼，但是需要很长的时间来学习。构建一个可用于各种图像的强大的红眼消除应用程序超出了本文的范围。但是，我们将学习基本原理并验证效果。</p><p>什么原因导致闪光灯拍照中的红眼效应？</p><p>当你在一个黑暗的房间里时，你的瞳孔会扩张（放大）以获得更多光线帮助你看得更清楚。大多数相机的闪光灯都非常靠近镜头。当您使用闪光灯拍摄照片时，来自闪光灯的光线会通过放大的瞳孔传到眼球的后部，然后通过瞳孔返回到相机的镜头中。眼球的后部称为眼底。由于眼底血液供应充足，它呈红色。</p><p>眼底的图像显示在下面。检查眼底可以揭示很多关于一个人的健康。您甚至可以获得智能手机应用程序，帮助您通过附件查看眼底。大多数相机持续闪烁几秒，使瞳孔收缩，从而减少红眼的可能性。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150754691.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_1-红眼消除" tabindex="-1"><a class="header-anchor" href="#_1-红眼消除"><span>1 红眼消除</span></a></h2><p>在本节中，我们将逐步介绍用于自动消除红眼的算法。</p><h3 id="_1-1-眼部检测" tabindex="-1"><a class="header-anchor" href="#_1-1-眼部检测"><span>1.1 眼部检测</span></a></h3><p>第一步是自动检测眼睛。我们使用标准的OpenCV Haar探测器（haarcascade_eye.xml）来寻找眼睛。有时，首先运行面部检测器然后检测面部区域内的眼睛是有意义的。为了简单起见，我们直接在图像上运行眼睛检测器。当输入图像是人像拍摄，或者您有眼睛的特写镜头时，跳过面部检测器。</p><p>您也可以按照此处的说明训练您自己的HAAR物体探测器。</p><p><a href="https://www.learnopencv.com/training-better-haar-lbp-cascade-eye-detector-opencv" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/training-better-haar-lbp-cascade-eye-detector-opencv </a></p><p>人眼检测模型调用代码如下：</p><p>C++:</p><pre><code>// Read image
Mat img = imread(&quot;red_eyes.jpg&quot;,CV_LOAD_IMAGE_COLOR);
 
// Output image
Mat imgOut = img.clone();
     
// Load HAAR cascade 
CascadeClassifier eyes_cascade(&quot;haarcascade_eye.xml&quot;);
 
// A vector of Rect for storing bounding boxes for eyes.
std::vector&lt;Rect&gt; eyes;
 
// Detect eyes. 
eyesCascade.detectMultiScale( img, eyes, 1.3, 4, 0 | CASCADE_SCALE_IMAGE, Size(100, 100) );
</code></pre><p>Python：</p><pre><code># Read image
img = cv2.imread(&quot;red_eyes.jpg&quot;, cv2.IMREAD_COLOR)
 
# Output image
imgOut = img.copy()
     
# Load HAAR cascade
eyesCascade = cv2.CascadeClassifier(&quot;haarcascade_eye.xml&quot;)
 
# Detect eyes
eyes = eyesCascade.detectMultiScale(img,scaleFactor=1.3, minNeighbors=4, minSize=(100, 100))
</code></pre><h3 id="_1-2-红眼遮掩" tabindex="-1"><a class="header-anchor" href="#_1-2-红眼遮掩"><span>1.2 红眼遮掩</span></a></h3><p>接下来，我们需要找到受红眼影响的瞳孔部分。有许多不同的方法可以找到红色的东西。需要注意的一点是，我们的颜色不仅仅是红色，而是鲜红色！您可以将图像转换为HSV色彩空间并根据色调和亮度设定阈值。在这篇文章中，我们使用了一个更简单的启发式方法。红色通道值大于阈值，阈值为绿色和蓝色通道的总和时，则判断当前颜色为红色。出于概念验证系统的目的，这个方法是足够的，但如果你想为商业软件包建立自动防红眼，你需要收集成千上万的红眼图像来提出更好的东西。</p><p>在下面的代码中，我们遍历我们在上一步中检测到的所有眼睛矩形。然后我们使用命令split将彩色图像分割成三个通道。最后对于每个像素点，如果红色通道高于阈值（150），且红色通道大于绿色和蓝色通道的总和，则该点值设为255，否则为0。则得到掩模图像，掩模图像中红眼位置为白色，其他位置为黑色。代码如下：</p><p>C++:</p><pre><code>for( size_t i = 0; i &amp;lt; eyes.size(); i++ )
{
     
  // Extract eye from the image.
  Mat eye = img(eyes[i]);
         
  // Split eye image into 3 channels.
  vector&lt;Mat&gt;bgr(3);
  split(eye,bgr);
 
  // Simple red eye detector
  Mat mask = (bgr[2] &gt; 150) &amp;amp; (bgr[2] &amp;gt; ( bgr[1] + bgr[0] ));
}
</code></pre><p>Python:</p><pre><code>for (x, y, w, h) in eyes:
   
  # Extract eye from the image.
  eye = img[y:y+h, x:x+w]
   
  # Split eye image into 3 channels
  b = eye[:, :, 0]
  g = eye[:, :, 1]
  r = eye[:, :, 2]
 
  # Add the green and blue channels. 
  bg = cv2.add(b, g)
 
  # Simple red eye detector
  mask = (r &gt; 150) &amp;  (r &gt; bg)
   
  # Convert the mask to uint8 format. 
  mask = mask.astype(np.uint8)*255
</code></pre><h3 id="_1-3-清除瞳孔掩模空洞" tabindex="-1"><a class="header-anchor" href="#_1-3-清除瞳孔掩模空洞"><span>1.3 清除瞳孔掩模空洞</span></a></h3><p>在上一步中创建的掩模中很可能会有洞。下图中的左图显示了使用颜色处理获得的原始掩模处理步骤。首先获得有孔洞的掩模，然后填充孔洞，最后扩充孔洞。此外，扩大面罩是一个好主意，因此它覆盖了稍大的区域。这是因为在边界处颜色逐渐消失，并且在我们的原始掩模中可能没有捕捉到一些红色区域。在下图中，右图是扩大的掩模。我们使用下面代码删除了掩码中的漏洞并生成扩张掩码。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150754677.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>代码如下：</p><p>C++:</p><pre><code>void fillHoles(Mat &amp;amp;mask)
{
     
  Mat mask_floodfill = mask.clone();
  floodFill(mask_floodfill, cv::Point(0,0), Scalar(255));
  Mat mask2;
  bitwise_not(mask_floodfill, mask2);
  mask = (mask2 | mask);
 
}

// Clean up mask by filling holes and dilating
fillHoles(mask);
dilate(mask, mask, Mat(), Point(-1, -1), 3, 1, 1);
</code></pre><p>Python:</p><pre><code>def fillHoles(mask):
    maskFloodfill = mask.copy()
    h, w = maskFloodfill.shape[:2]
    maskTemp = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(maskFloodfill, maskTemp, (0, 0), 255)
    mask2 = cv2.bitwise_not(maskFloodfill)
    return mask2 | mask
# Clean up mask by filling holes and dilating
mask = fillHoles(mask)
mask = cv2.dilate(mask, None, anchor=(-1, -1), iterations=3, borderType=1, borderValue=1)
</code></pre><h3 id="_1-4-红眼修复" tabindex="-1"><a class="header-anchor" href="#_1-4-红眼修复"><span>1.4 红眼修复</span></a></h3><p>现在我们有一个只包含每只眼睛红色区域的面具。我们接下来展示如何处理这个面具内的区域来修复红眼。</p><p>我们知道红眼睛会使图像中的红色通道饱和。换句话说，红色通道中的所有信息都被破坏。我们怎样才能恢复一些这些信息呢？修复红眼时，我们不需要在红色通道中检索真正的底层信息; 我们只需要找到合理的信息。幸运的是，红眼效果仅在红色通道中破坏眼球信息; 蓝色和绿色通道仍然很好。您可以在下图中看到图像的红色，绿色和蓝色通道下的眼球信息。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150755672.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以使用绿色和蓝色通道的组合来提供合理的红色通道。例如，我们可以创建一个红色通道，它是图像中绿色和蓝色通道的平均值。然而，这样做可能会给眼球一点点色调，看起来不错，但不是很好。注意中心图像中间图像的紫色。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150755606.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这给我们带来了一个重要的问题。瞳孔的颜色应该是多少？眼睛的内部是完全黑色的。因此，瞳孔应该是无色的（灰度）和黑暗的。我们不是仅替换瞳孔区域中的红色通道，而是用绿色和蓝色通道的平均值替换所有通道。这消除了紫色调。如上图第三张图像。最后一步是合并三个通道以创建RGB图像，然后将此固定的眼睛区域替换原始图像眼睛区域中。</p><p>代码如下：</p><p>C++:</p><pre><code>// Calculate the mean channel by averaging
// the green and blue channels
Mat mean = (bgr[0]+bgr[1])/2;
 
// Copy the mean image to blue channel with mask.
mean.copyTo(bgr[0], mask);
 
// Copy the mean image to green channel with mask.
mean.copyTo(bgr[1], mask);
 
// Copy the mean image to red channel with mask.
mean.copyTo(bgr[2], mask);
// Merge the three channels
Mat eyeOut;
merge(bgr,eyeOut);
         
// Copy the fixed eye to the output image. 
eyeOut.copyTo(imgOut(eyes[i]));
</code></pre><p>python:</p><pre><code># Calculate the mean channel by averaging
# the green and blue channels. Recall, bg = cv2.add(b, g)
mean = bg / 2
mask = mask.astype(np.bool)[:, :, np.newaxis]
mean = mean[:, :, np.newaxis]
 
# Copy the eye from the original image. 
eyeOut = eye.copy()
 
# Copy the mean image to the output image. 
np.copyto(eyeOut, mean, where=mask)
# Copy the fixed eye to the output image. 
imgOut[y:y+h, x:x+w, :] = eyeOut
</code></pre><h2 id="_2-结果与完整代码" tabindex="-1"><a class="header-anchor" href="#_2-结果与完整代码"><span>2 结果与完整代码</span></a></h2><h3 id="_2-1-结果" tabindex="-1"><a class="header-anchor" href="#_2-1-结果"><span>2.1 结果</span></a></h3><p>我们首先在开始的示例图像上显示结果。结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150755678.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>请注意，从瞳孔区域移除所有颜色会使图像看起来很漂亮，因为眼睛中心的点是完全白色的。还要注意，在瞳孔的边界上，红色消失，但是由于扩张操作，我们仍然捕获该区域。</p><p>接下来，我们在眼睛的特写照片上显示结果，如下图所示。如果我们使用了人脸检测器，它就不会检测到人脸，并且自动眼睛检测器不会起作用。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150755689.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-2-代码" tabindex="-1"><a class="header-anchor" href="#_2-2-代码"><span>2.2 代码</span></a></h3><p>本文所有代码和人眼检测模型见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>完整代码如下：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;

using namespace std;
using namespace cv;

//孔洞填充
void fillHoles(Mat &amp;mask)
{
	Mat maskFloodfill = mask.clone();
	//漫水填充
	floodFill(maskFloodfill, cv::Point(0, 0), Scalar(255));
	Mat mask2;
	//反色
	bitwise_not(maskFloodfill, mask2);
	//或运算
	mask = (mask2 | mask);
}

int main()
{
	// Read image 读彩色图像
	Mat img = imread(&quot;./image/red_eyes.jpg&quot;, CV_LOAD_IMAGE_COLOR);

	// Output image 输出图像
	Mat imgOut = img.clone();

	// Load HAAR cascade 读取haar分类器
	CascadeClassifier eyesCascade(&quot;./model/haarcascade_eye.xml&quot;);

	// Detect eyes 检测眼睛
	std::vector&lt;Rect&gt; eyes;
	//前四个参数：输入图像，眼睛结果，表示每次图像尺寸减小的比例，表示每一个目标至少要被检测到4次才算是真的
	//后两个参数：0 | CASCADE_SCALE_IMAGE表示不同的检测模式，最小检测尺寸
	eyesCascade.detectMultiScale(img, eyes, 1.3, 4, 0 | CASCADE_SCALE_IMAGE, Size(100, 100));

	// For every detected eye 每只眼睛都进行处理
	for (size_t i = 0; i &lt; eyes.size(); i++)
	{
		// Extract eye from the image. 提取眼睛图像
		Mat eye = img(eyes[i]);

		// Split eye image into 3 channels. 颜色分离
		vector&lt;Mat&gt;bgr(3);
		split(eye, bgr);

		// Simple red eye detector 红眼检测器，获得结果掩模
		Mat mask = (bgr[2] &gt; 150) &amp; (bgr[2] &gt; (bgr[1] + bgr[0]));

		// Clean mask 清理掩模
		//填充孔洞
		fillHoles(mask);
		//扩充孔洞
		dilate(mask, mask, Mat(), Point(-1, -1), 3, 1, 1);

		// Calculate the mean channel by averaging the green and blue channels
		//计算b通道和g通道的均值
		Mat mean = (bgr[0] + bgr[1]) / 2;
		//用该均值图像覆盖原图掩模部分图像
		mean.copyTo(bgr[2], mask);
		mean.copyTo(bgr[0], mask);
		mean.copyTo(bgr[1], mask);

		// Merge channels
		Mat eyeOut;
		//图像合并
		cv::merge(bgr, eyeOut);

		// Copy the fixed eye to the output image.
		// 眼部图像替换
		eyeOut.copyTo(imgOut(eyes[i]));
	}

	// Display Result
	imshow(&quot;Red Eyes&quot;, img);
	imshow(&quot;Red Eyes Removed&quot;, imgOut);
	waitKey(0);
	return 0;
} 
</code></pre><p>python:</p><pre><code>import cv2
import numpy as np


def fillHoles(mask):

    maskFloodfill = mask.copy()
    h, w = maskFloodfill.shape[:2]
    maskTemp = np.zeros((h+2, w+2), np.uint8)
    cv2.floodFill(maskFloodfill, maskTemp, (0, 0), 255)
    mask2 = cv2.bitwise_not(maskFloodfill)
    return mask2 | mask

if __name__ == &#39;__main__&#39; :

    # Read image
    img = cv2.imread(&quot;./image/red_eyes.jpg&quot;, cv2.IMREAD_COLOR)
    
    # Output image
    imgOut = img.copy()
    
    # Load HAAR cascade
    eyesCascade = cv2.CascadeClassifier(&quot;./model/haarcascade_eye.xml&quot;)
    
    # Detect eyes
    eyes = eyesCascade.detectMultiScale(img, scaleFactor=1.3, minNeighbors=4, minSize=(100, 100))
    
    # For every detected eye
    for (x, y, w, h) in eyes:

        # Extract eye from the image
        eye = img[y:y+h, x:x+w]

        # Split eye image into 3 channels
        b = eye[:, :, 0]
        g = eye[:, :, 1]
        r = eye[:, :, 2]
        
        # Add the green and blue channels.
        bg = cv2.add(b, g)

        # Simple red eye detector.
        mask = (r &gt; 150) &amp;  (r &gt; bg)
        
        # Convert the mask to uint8 format.
        mask = mask.astype(np.uint8)*255

        # Clean mask -- 1) File holes 2) Dilate (expand) mask.
        mask = fillHoles(mask)
        mask = cv2.dilate(mask, None, anchor=(-1, -1), iterations=3, borderType=1, borderValue=1)

        # Calculate the mean channel by averaging
        # the green and blue channels
        mean = bg / 2
        mask = mask.astype(np.bool)[:, :, np.newaxis]
        mean = mean[:, :, np.newaxis]

        # Copy the eye from the original image.
        eyeOut = eye.copy()

        # Copy the mean image to the output image.
        #np.copyto(eyeOut, mean, where=mask)
        eyeOut = np.where(mask, mean, eyeOut)

        # Copy the fixed eye to the output image.
        imgOut[y:y+h, x:x+w, :] = eyeOut

    # Display Result
    cv2.imshow(&#39;Red Eyes&#39;, img)
    cv2.imshow(&#39;Red Eyes Removed&#39;, imgOut)
    cv2.waitKey(0)
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/automatic-red-eye-remover-using-opencv-cpp-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/automatic-red-eye-remover-using-opencv-cpp-python/ </a></li></ul>`,63)]))}const s=n(i,[["render",p],["__file","2019-05-09-_OpenCV实战_29 使用OpenCV实现红眼自动去除.html.vue"]]),c=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-09-_OpenCV%E5%AE%9E%E6%88%98_29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4.html","title":"[OpenCV实战]29 使用OpenCV实现红眼自动去除","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-05-09T15:30:53.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]29 使用OpenCV实现红眼自动去除 在本教程中，我们将学习如何完全自动地从照片中消除红眼。如下图所示： 当我们晚上拍摄的照片有红眼效果时，带着血腥眼睛的微笑的人会让人想起德古拉。使用照片编辑工具可以删除红眼，但是需要很长的时间来学习。构建一个可用于各种图像的强大的红眼消除应用程序超出了本文的范围。但是，我们将学习基本原理并验证效...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-09-_OpenCV%E5%AE%9E%E6%88%98_29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]29 使用OpenCV实现红眼自动去除"}],["meta",{"property":"og:description","content":"[OpenCV实战]29 使用OpenCV实现红眼自动去除 在本教程中，我们将学习如何完全自动地从照片中消除红眼。如下图所示： 当我们晚上拍摄的照片有红眼效果时，带着血腥眼睛的微笑的人会让人想起德古拉。使用照片编辑工具可以删除红眼，但是需要很长的时间来学习。构建一个可用于各种图像的强大的红眼消除应用程序超出了本文的范围。但是，我们将学习基本原理并验证效..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150754666.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-05-09T15:30:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]29 使用OpenCV实现红眼自动去除\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150754666.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150754691.jpeg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150754677.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150755672.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150755606.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150755678.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D29%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E7%BA%A2%E7%9C%BC%E8%87%AA%E5%8A%A8%E5%8E%BB%E9%99%A4/20190509150755689.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-05-09T15:30:53.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 红眼消除","slug":"_1-红眼消除","link":"#_1-红眼消除","children":[{"level":3,"title":"1.1 眼部检测","slug":"_1-1-眼部检测","link":"#_1-1-眼部检测","children":[]},{"level":3,"title":"1.2 红眼遮掩","slug":"_1-2-红眼遮掩","link":"#_1-2-红眼遮掩","children":[]},{"level":3,"title":"1.3 清除瞳孔掩模空洞","slug":"_1-3-清除瞳孔掩模空洞","link":"#_1-3-清除瞳孔掩模空洞","children":[]},{"level":3,"title":"1.4 红眼修复","slug":"_1-4-红眼修复","link":"#_1-4-红眼修复","children":[]}]},{"level":2,"title":"2 结果与完整代码","slug":"_2-结果与完整代码","link":"#_2-结果与完整代码","children":[{"level":3,"title":"2.1 结果","slug":"_2-1-结果","link":"#_2-1-结果","children":[]},{"level":3,"title":"2.2 代码","slug":"_2-2-代码","link":"#_2-2-代码","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":10.6,"words":3181},"filePathRelative":"blog/opencv/opencv实战/2019-05-09-[OpenCV实战]29 使用OpenCV实现红眼自动去除.md","localizedDate":"2019年5月9日","excerpt":"\\n<p>在本教程中，我们将学习如何完全自动地从照片中消除红眼。如下图所示：</p>\\n<figure><img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]29 使用OpenCV实现红眼自动去除/20190509150754666.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{s as comp,c as data};
