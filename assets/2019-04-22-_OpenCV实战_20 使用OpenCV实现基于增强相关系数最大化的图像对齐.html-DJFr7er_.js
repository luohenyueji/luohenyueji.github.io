import{_ as t,c as n,a,o as i}from"./app-CJwJJlha.js";const r={};function o(p,e){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="opencv实战-20-使用opencv实现基于增强相关系数最大化的图像对齐" tabindex="-1"><a class="header-anchor" href="#opencv实战-20-使用opencv实现基于增强相关系数最大化的图像对齐"><span>[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐</span></a></h1><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165115444.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上面左边的图像是由Prokudin-Gorskii拍摄的历史系列照片中的一部分。这张照片是由一位俄罗斯摄影师在20世纪初使用早期的彩色相机拍摄的。由于相机的机械性质，图像的颜色通道未对准。右侧的图像是同一图像的一个版本，其中的通道使用OpenCV3中提供的函数进行对齐。</p><p>在这篇文章中，我们了解彩色的摄影历史，同时了解该过程中的图像对齐。本文所有代码图像见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span><strong>1</strong> <strong>背景</strong></span></a></h2><h3 id="_1-1-彩色摄影的一个简短而不完整的历史" tabindex="-1"><a class="header-anchor" href="#_1-1-彩色摄影的一个简短而不完整的历史"><span><strong>1.1</strong> <strong>彩色摄影的一个简短而不完整的历史</strong></span></a></h3><p>您可以使用三个主要滤色镜（红色，绿色，蓝色）拍摄三张不同照片并将它们组合以获得彩色图像，这个想法最初由James Clerk Maxwell（是的，麦克斯韦尔）在1855年提出。六年后，在1861年，英国摄影师Thomas Sutton通过将马克斯韦尔的理论付诸实践，制作了第一张彩色照片。他使用三个不同的彩色滤镜拍摄了三张彩带的灰度图像（参见下图），然后使用配备相同滤色镜的三台投影仪叠加图像。当时可用的照相材料对蓝光敏感，但对绿光不敏感，对红光几乎不敏感。虽然它的时代是革命性的，但这种方法并不实用。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165114570.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>到20世纪初，照相材料的灵敏度已经大大提高，并且在20世纪的前十年，一些不同的实用相机可用于彩色摄影。也许这些相机中最受欢迎的是Autochrome。Autochrome详细见：</p><p><a href="http://www.nphoto.net/news/2016-06/15/31621980c7927bea4.shtml" target="_blank" rel="noopener noreferrer"> http://www.nphoto.net/news/2016-06/15/31621980c7927bea4.shtml</a></p><p>其竞争相机系统是由Adolf Miethe设计的，最后由Wilhelm Bermpohl打造，因此称之为&quot;Professor Dr. Miethe’s Dreifarben-Camera. &quot;在德国，单词 &quot;Dreifarben&quot; 也称之为“三原色”，这款相机也被称之为&quot;Miethe-Bermpohl&quot;,它是由一张长的玻璃板和三个不同的滤镜构成的，因此它能同时捕获三张照片。通过这种技术拍摄的图像见：</p><p><a href="http://www.vintagephoto.tv/mb.shtml" target="_blank" rel="noopener noreferrer"> http://www.vintagephoto.tv/mb.shtml </a></p><p>在Sergey Prokudin-Gorskii手中，Miethe-Bermpohl相机（或其变体）将在俄罗斯历史上获得一个特殊的位置。1909年，在沙皇尼古拉二世的资助下，Prokudin-Gorskii开始了长达十年的俄罗斯彩色征途！他拍了超过10,000张彩色照片。他的照片中最引人注目的是Leo Tolstoy(列夫 托尔斯泰)唯一已知的彩色照片。</p><p>对我们来说幸运的是，美国国会图书馆于1948年购买了大量的Prokudin- Gorskii的照片。他们现在处于公开状态，我们有机会重建俄罗斯的历史！这些照片见：</p><p><a href="http://www.loc.gov/pictures/collection/prok/" target="_blank" rel="noopener noreferrer"> http://www.loc.gov/pictures/collection/prok/ </a></p><p>从这些黑白图像生成彩色图像并非易事（如下图所示）。Miethe- Bermpohl相机是一种机械设备，可以在2-6秒的时间内拍摄这三张照片。因此，三个通道经常是错位的，并且天真地将它们堆叠起来导致非常不令人满意的结果(本文第一张图)。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165116449.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-2-opencv-中的运动模型" tabindex="-1"><a class="header-anchor" href="#_1-2-opencv-中的运动模型"><span><strong>1.2 OpenCV</strong> <strong>中的运动模型</strong></span></a></h3><p>在典型的图像对齐问题中，我们有两个场景图像，它们通过运动模型相关联。不同的图像对准算法旨在使用不同的技巧和假设来估计这些运动模型的参数。一旦知道这些参数，将一个图像变形以使其与另一个图像对齐是非常容易的。让我们快速了解这些运动模型的样子。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165115403.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>表示这些模型的OpenCV常量具有前缀MOTION。</p><p>(1)平移（MOTION_TRANSLATION）：上图Original图像对坐标点（x，y）变换以获得TRANSLATION图像。我们只需要估算两个参数x和y。</p><p>(2)欧几里德（MOTION_EUCLIDEAN）：上图EUCLIDEAN图像是Original图像的旋转和移位版本。所以有三个参数x，y和角度。您将注意到当一个正方形经历欧几里德变换时，尺寸不会改变，平行线保持平行，并且在转换后直角保持不变。</p><p>(3)仿射（MOTION_AFFINE）：仿射变换是旋转，平移（移位），缩放和剪切的组合。该变换有六个参数。当正方形经历仿射变换时，平行线保持平行，但是以直角相交的线不再保持正交。</p><p>(4)Homography（MOTION_HOMOGRAPHY）：上述所有变换都是2D变换。它们不考虑3D效果。另一方面，单应性变换可以解释一些3D效果（但不是全部）。该变换有8个参数。使用Homography转换时的正方形可以更改为任何四边形。</p><p>在OpenCV中，仿射变换存储在2×3大小的矩阵中。翻译和欧几里德变换是仿射变换的特例。在平移中，旋转，比例和剪切参数为零，而在欧几里德变换中，比例和剪切参数为零。因此，平移和欧几里德变换也存储在2×3矩阵中。一旦估计了这个矩阵（我们将在下一节中看到），就可以使用函数warpAffine使图像对齐。另一方面，Homography存储在3×3矩阵中。一旦估计了Homography，就可以使用warpPerspective使图像对齐。</p><h2 id="_2-使用增强相关系数最大化-ecc-的图像对齐" tabindex="-1"><a class="header-anchor" href="#_2-使用增强相关系数最大化-ecc-的图像对齐"><span><strong>2</strong> <strong>使用增强相关系数最大化(ECC）的图像对齐</strong></span></a></h2><p>OpenCV 3中引入的ECC图像对齐算法基于2008年论文题为使用增强相关系数最大化的参数图像对齐，他们建议使用称为增强相关系数（ECC）的新相似性度量来估计运动模型的参数。使用他们的方法有两个好处：1）与像素强度差异的传统相似性度量不同，ECC对比度和亮度的光度失真不变；2）虽然目标函数是参数的非线性函数，但它们为解决优化问题而开发的迭代方案是线性的。换句话说，他们在表面上遇到了计算成本昂贵的问题，但找到了一种迭代求解的简单方法。</p><p>论文见：</p><p><a href="http://xanthippi.ceid.upatras.gr/people/evangelidis/george_files/PAMI_2008.pdf" target="_blank" rel="noopener noreferrer">http://xanthippi.ceid.upatras.gr/people/evangelidis/george_files/PAMI_2008.pdf</a></p><h3 id="_2-1-findtransformecc在opencv中的示例" tabindex="-1"><a class="header-anchor" href="#_2-1-findtransformecc在opencv中的示例"><span>2.1 findTransformECC在OpenCV中的示例</span></a></h3><p>在OpenCV 3中，使用函数findTransformECC估计ECC图像对齐的运动模型。以下是使用findTransformECC的步骤：1）读取图像；2）将原图转换为灰度图像；3）选择您要估算的运动模型；4）分配空间（warp_matrix）以存储运动模型；5）定义一个终止条件，告诉算法何时停止；6）使用findTransformECC估算warp矩阵；7）将变换矩阵应用于其中一个图像，使其与另一个图像对齐。</p><p>具体代码如下：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &quot;opencv2/opencv.hpp&quot;

using namespace cv;
using namespace std;

int main()
{
	// Read the images to be aligned 读取仿射图像
	//im1参考图像，im2要处理的图像
	Mat im1 = imread(&quot;image/image1.jpg&quot;);
	Mat im2 = imread(&quot;image/image2.jpg&quot;);

	// Convert images to gray scale 转换为灰度图像
	Mat im1_gray, im2_gray;
	cvtColor(im1, im1_gray, CV_BGR2GRAY);
	cvtColor(im2, im2_gray, CV_BGR2GRAY);

	// Define the motion model 定义运动模型
	const int warp_mode = MOTION_EUCLIDEAN;

	// Set a 2x3 or 3x3 warp matrix depending on the motion model. 变换矩阵
	Mat warp_matrix;

	// Initialize the matrix to identity
	if (warp_mode == MOTION_HOMOGRAPHY)
	{
		warp_matrix = Mat::eye(3, 3, CV_32F);
	}
	else
	{
		warp_matrix = Mat::eye(2, 3, CV_32F);
	}

	// Specify the number of iterations. 算法迭代次数
	int number_of_iterations = 5000;

	// Specify the threshold of the increment
	// in the correlation coefficient between two iterations 设定阈值
	double termination_eps = 1e-10;

	// Define termination criteria 定义终止条件
	TermCriteria criteria(TermCriteria::COUNT + TermCriteria::EPS, number_of_iterations, termination_eps);

	// Run the ECC algorithm. The results are stored in warp_matrix. ECC算法
	findTransformECC
	(
		im1_gray,
		im2_gray,
		warp_matrix,
		warp_mode,
		criteria
	);

	// Storage for warped image.
	Mat im2_aligned;

	if (warp_mode != MOTION_HOMOGRAPHY)
	{
		// Use warpAffine for Translation, Euclidean and Affine
		warpAffine(im2, im2_aligned, warp_matrix, im1.size(), INTER_LINEAR + WARP_INVERSE_MAP);
	}
	else
	{
		// Use warpPerspective for Homography
		warpPerspective(im2, im2_aligned, warp_matrix, im1.size(), INTER_LINEAR + WARP_INVERSE_MAP);
	}

	// Show final result
	imshow(&quot;Image 1&quot;, im1);
	imshow(&quot;Image 2&quot;, im2);
	imshow(&quot;Image 2 Aligned&quot;, im2_aligned);
	waitKey(0);

	return 0;
}
</code></pre><p>python:</p><pre><code>import cv2
import numpy as np


if __name__ == &#39;__main__&#39;:
    
    # Read the images to be aligned
    im1 =  cv2.imread(&quot;image/image1.jpg&quot;);
    im2 =  cv2.imread(&quot;image/image2.jpg&quot;);
    
    # Convert images to grayscale
    im1_gray = cv2.cvtColor(im1,cv2.COLOR_BGR2GRAY)
    im2_gray = cv2.cvtColor(im2,cv2.COLOR_BGR2GRAY)

    # Find size of image1
    sz = im1.shape

    # Define the motion model
    warp_mode = cv2.MOTION_TRANSLATION

    # Define 2x3 or 3x3 matrices and initialize the matrix to identity
    if warp_mode == cv2.MOTION_HOMOGRAPHY :
        warp_matrix = np.eye(3, 3, dtype=np.float32)
    else :
        warp_matrix = np.eye(2, 3, dtype=np.float32)

    # Specify the number of iterations.
    number_of_iterations = 5000;
    
    # Specify the threshold of the increment
    # in the correlation coefficient between two iterations
    termination_eps = 1e-10;
    
    # Define termination criteria
    criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, number_of_iterations,  termination_eps)

    # Run the ECC algorithm. The results are stored in warp_matrix.
    (cc, warp_matrix) = cv2.findTransformECC (im1_gray,im2_gray,warp_matrix, warp_mode, criteria)


    if warp_mode == cv2.MOTION_HOMOGRAPHY :
        # Use warpPerspective for Homography
        im2_aligned = cv2.warpPerspective (im2, warp_matrix, (sz[1],sz[0]), flags=cv2.INTER_LINEAR + cv2.WARP_INVERSE_MAP)
    else :
        # Use warpAffine for Translation, Euclidean and Affine
        im2_aligned = cv2.warpAffine(im2, warp_matrix, (sz[1],sz[0]), flags=cv2.INTER_LINEAR + cv2.WARP_INVERSE_MAP);

    # Show final results
    cv2.imshow(&quot;Image 1&quot;, im1)
    cv2.imshow(&quot;Image 2&quot;, im2)
    cv2.imshow(&quot;Aligned Image 2&quot;, im2_aligned)
    cv2.waitKey(0)
</code></pre><p>结果如下，第一张是参考图像，第二张对准图像，第三张结果图像。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165116422.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165116421.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165116352.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-2-重建prokudin-gorskii系列图像" tabindex="-1"><a class="header-anchor" href="#_2-2-重建prokudin-gorskii系列图像"><span>2.2 重建Prokudin-Gorskii系列图像</span></a></h3><p>上图也是Prokudin-Gorskii系列的一部分。左边是带有未对齐RGB通道的图像，右边是对齐后的图像。此照片显示20世纪早期的照相底片就足以捕获光谱。鲜艳的红色，蓝色和绿色令人惊叹。上一节中的代码可用于解决简单问题。但是，如果你用它来重建上面的图像，你会非常失望。现实世界中的计算机视觉是艰难的，事情往往不是真正开箱即用的。</p><p>问题是，图像中的红色、绿色和蓝色通道在像素强度上的相关性不如您所猜测的那么强。例如，如下图中emir穿着的蓝色礼服。在这三个频道中，它看起来很不一样。然而，尽管强度不同，但三个通道中的某些东西是相似的，因为人眼很容易分辨出这是同一个场景。</p><p>事实证明，图像的三个通道在梯度域中更强相关。这并不奇怪，因为即使三个通道中的强度可能不同，由对象和颜色边界生成的边缘图也是一致的。所以我们先计算图像梯度的近似值然后对梯度做仿射变换。具体代码如下：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &quot;opencv2/opencv.hpp&quot;

using namespace cv;
using namespace std;

/**
 * @brief Get the Gradient object 计算梯度
 *
 * @param src_gray 输入灰度图
 * @return Mat
 */
Mat GetGradient(Mat src_gray)
{
	Mat grad_x, grad_y;
	Mat abs_grad_x, abs_grad_y;

	int scale = 1;
	int delta = 0;
	int ddepth = CV_32FC1;
	;

	// Calculate the x and y gradients using Sobel operator
	//计算sobel算子
	Sobel(src_gray, grad_x, ddepth, 1, 0, 3, scale, delta, BORDER_DEFAULT);
	//使用线性变换转换输入数组元素成8位无符号整型
	convertScaleAbs(grad_x, abs_grad_x);

	Sobel(src_gray, grad_y, ddepth, 0, 1, 3, scale, delta, BORDER_DEFAULT);
	convertScaleAbs(grad_y, abs_grad_y);

	// Combine the two gradients
	Mat grad;
	//合并算子
	addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0, grad);

	return grad;
}

int main()
{
	// Read 8-bit color image.
	// This is an image in which the three channels are
	// concatenated vertically.
	//输入一个灰度图
	Mat im = imread(&quot;image/bridge.jpg&quot;, IMREAD_GRAYSCALE);

	// Find the width and height of the color image 获取图像宽高
	Size sz = im.size();
	int height = sz.height / 3;
	int width = sz.width;

	// Extract the three channels from the gray scale image 通道分离
	vector&lt;Mat&gt; channels;
	channels.push_back(im(Rect(0, 0, width, height)));
	channels.push_back(im(Rect(0, height, width, height)));
	channels.push_back(im(Rect(0, 2 * height, width, height)));

	// Merge the three channels into one color image 通道合并，将图像合并成一张图
	Mat im_color;
	merge(channels, im_color);

	// Set space for aligned image 设置对齐图像
	vector&lt;Mat&gt; aligned_channels;
	aligned_channels.push_back(Mat(height, width, CV_8UC1));
	aligned_channels.push_back(Mat(height, width, CV_8UC1));

	// The blue and green channels will be aligned to the red channel.
	// So copy the red channel
	aligned_channels.push_back(channels[2].clone());

	// Define motion model 确定运动模型
	const int warp_mode = MOTION_AFFINE;

	// Set space for warp matrix 变换矩阵
	Mat warp_matrix;

	// Set the warp matrix to identity.
	if (warp_mode == MOTION_HOMOGRAPHY)
	{
		warp_matrix = Mat::eye(3, 3, CV_32F);
	}
	else
	{
		warp_matrix = Mat::eye(2, 3, CV_32F);
	}
	// Set the stopping criteria for the algorithm. 设置迭代次数和阈值
	int number_of_iterations = 5000;
	double termination_eps = 1e-10;

	TermCriteria criteria(TermCriteria::COUNT + TermCriteria::EPS,
		number_of_iterations, termination_eps);

	// Warp the blue and green channels to the red channel
	for (int i = 0; i &lt; 2; i++)
	{
		double cc = findTransformECC
		(
			GetGradient(channels[2]),
			GetGradient(channels[i]),
			warp_matrix,
			warp_mode,
			criteria);

		cout &lt;&lt; &quot;warp_matrix : &quot; &lt;&lt; warp_matrix &lt;&lt; endl;
		cout &lt;&lt; &quot;CC &quot; &lt;&lt; cc &lt;&lt; endl;
		if (cc == -1)
		{
			cerr &lt;&lt; &quot;The execution was interrupted. The correlation value is going to be minimized.&quot; &lt;&lt; endl;
			cerr &lt;&lt; &quot;Check the warp initialization and/or the size of images.&quot; &lt;&lt; endl
				&lt;&lt; flush;
		}

		if (warp_mode == MOTION_HOMOGRAPHY)
		{
			// Use Perspective warp when the transformation is a Homography
			warpPerspective(channels[i], aligned_channels[i], warp_matrix, aligned_channels[0].size(), INTER_LINEAR + WARP_INVERSE_MAP);
		}
		else
		{
			// Use Affine warp when the transformation is not a Homography
			warpAffine(channels[i], aligned_channels[i], warp_matrix, aligned_channels[0].size(), INTER_LINEAR + WARP_INVERSE_MAP);
		}
	}

	// Merge the three channels 合并通道
	Mat im_aligned;
	merge(aligned_channels, im_aligned);

	// Show final output
	imshow(&quot;Color Image&quot;, im_color);
	imshow(&quot;Aligned Image&quot;, im_aligned);
	waitKey(0);
	return 0;
}
</code></pre><p>python代码：</p><pre><code>import cv2
import numpy as np

def get_gradient(im) :
    # Calculate the x and y gradients using Sobel operator
    grad_x = cv2.Sobel(im,cv2.CV_32F,1,0,ksize=3)
    grad_y = cv2.Sobel(im,cv2.CV_32F,0,1,ksize=3)
    # Combine the two gradients
    grad = cv2.addWeighted(np.absolute(grad_x), 0.5, np.absolute(grad_y), 0.5, 0)
    return grad


if __name__ == &#39;__main__&#39;:
    
    
    # Read 8-bit color image.
    # This is an image in which the three channels are
    # concatenated vertically.
    
    im =  cv2.imread(&quot;image/girls.jpg&quot;, cv2.IMREAD_GRAYSCALE);

    # Find the width and height of the color image
    sz = im.shape
    print(sz)
    height = int(sz[0] / 3);
    width = sz[1]

    # Extract the three channels from the gray scale image
    # and merge the three channels into one color image
    im_color = np.zeros((height,width,3), dtype=np.uint8 )
    for i in range(0,3) :
        im_color[:,:,i] = im[ i * height:(i+1) * height,:]

    # Allocate space for aligned image
    im_aligned = np.zeros((height,width,3), dtype=np.uint8 )

    # The blue and green channels will be aligned to the red channel.
    # So copy the red channel
    im_aligned[:,:,2] = im_color[:,:,2]

    # Define motion model
    warp_mode = cv2.MOTION_HOMOGRAPHY

    # Set the warp matrix to identity.
    if warp_mode == cv2.MOTION_HOMOGRAPHY :
            warp_matrix = np.eye(3, 3, dtype=np.float32)
    else :
            warp_matrix = np.eye(2, 3, dtype=np.float32)

    # Set the stopping criteria for the algorithm.
    criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 50,  1e-10)

    # Warp the blue and green channels to the red channel
    for i in range(0,2) :
        (cc, warp_matrix) = cv2.findTransformECC (get_gradient(im_color[:,:,2]), get_gradient(im_color[:,:,i]),warp_matrix, warp_mode, criteria)
    
        if warp_mode == cv2.MOTION_HOMOGRAPHY :
            # Use Perspective warp when the transformation is a Homography
            im_aligned[:,:,i] = cv2.warpPerspective (im_color[:,:,i], warp_matrix, (width,height), flags=cv2.INTER_LINEAR + cv2.WARP_INVERSE_MAP)
        else :
            # Use Affine warp when the transformation is not a Homography
            im_aligned[:,:,i] = cv2.warpAffine(im_color[:,:,i], warp_matrix, (width, height), flags=cv2.INTER_LINEAR + cv2.WARP_INVERSE_MAP);
        print(warp_matrix)

    # Show final output
    cv2.imshow(&quot;Color Image&quot;, im_color)
    cv2.imshow(&quot;Aligned Image&quot;, im_aligned)
    cv2.waitKey(0)
</code></pre><p>结果就是本文一张图的效果。</p><p>如果您要实际制作商业图像注册产品，则需要做的比我的代码更多。例如，当对齐错误很多时，此代码可能会失败。在这种情况下，您需要在较低分辨率版本的图像上估计变换参数，并使用低分辨率版本中估计的参数初始化较高分辨率版本的变换矩阵。此外，findTransformECC估计单个全局变换以进行对齐。当图像中存在局部运动时（例如，主体在两张照片中移动了一点），这种运动模型显然是不够的。在这种情况下，需要使用基于光流的方法来进行额外的局部对准。另外这个算法计算很慢，注意图像分辨率。如果想提高精度，改变阈值增加算法迭代次数。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/image-alignment-ecc-in-opencv-c-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/image-alignment-ecc-in-opencv-c-python/</a></li></ul>`,54)]))}const c=t(r,[["render",o],["__file","2019-04-22-_OpenCV实战_20 使用OpenCV实现基于增强相关系数最大化的图像对齐.html.vue"]]),s=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-22-_OpenCV%E5%AE%9E%E6%88%98_20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90.html","title":"[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-22T16:58:50.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐 上面左边的图像是由Prokudin-Gorskii拍摄的历史系列照片中的一部分。这张照片是由一位俄罗斯摄影师在20世纪初使用早期的彩色相机拍摄的。由于相机的机械性质，图像的颜色通道未对准。右侧的图像是同一图像的一个版本，其中的通道使用OpenCV3中提供的函数进行对齐。 在...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-22-_OpenCV%E5%AE%9E%E6%88%98_20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐"}],["meta",{"property":"og:description","content":"[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐 上面左边的图像是由Prokudin-Gorskii拍摄的历史系列照片中的一部分。这张照片是由一位俄罗斯摄影师在20世纪初使用早期的彩色相机拍摄的。由于相机的机械性质，图像的颜色通道未对准。右侧的图像是同一图像的一个版本，其中的通道使用OpenCV3中提供的函数进行对齐。 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165115444.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-04-22T16:58:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165115444.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165114570.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165116449.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165115403.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165116422.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165116421.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D20%20%E4%BD%BF%E7%94%A8OpenCV%E5%AE%9E%E7%8E%B0%E5%9F%BA%E4%BA%8E%E5%A2%9E%E5%BC%BA%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E6%9C%80%E5%A4%A7%E5%8C%96%E7%9A%84%E5%9B%BE%E5%83%8F%E5%AF%B9%E9%BD%90/20190422165116352.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-04-22T16:58:50.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[{"level":3,"title":"1.1 彩色摄影的一个简短而不完整的历史","slug":"_1-1-彩色摄影的一个简短而不完整的历史","link":"#_1-1-彩色摄影的一个简短而不完整的历史","children":[]},{"level":3,"title":"1.2 OpenCV 中的运动模型","slug":"_1-2-opencv-中的运动模型","link":"#_1-2-opencv-中的运动模型","children":[]}]},{"level":2,"title":"2 使用增强相关系数最大化(ECC）的图像对齐","slug":"_2-使用增强相关系数最大化-ecc-的图像对齐","link":"#_2-使用增强相关系数最大化-ecc-的图像对齐","children":[{"level":3,"title":"2.1 findTransformECC在OpenCV中的示例","slug":"_2-1-findtransformecc在opencv中的示例","link":"#_2-1-findtransformecc在opencv中的示例","children":[]},{"level":3,"title":"2.2 重建Prokudin-Gorskii系列图像","slug":"_2-2-重建prokudin-gorskii系列图像","link":"#_2-2-重建prokudin-gorskii系列图像","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":13.98,"words":4194},"filePathRelative":"blog/opencv/opencv实战/2019-04-22-[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐.md","localizedDate":"2019年4月23日","excerpt":"\\n<figure><img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]20 使用OpenCV实现基于增强相关系数最大化的图像对齐/20190422165115444.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{c as comp,s as data};
