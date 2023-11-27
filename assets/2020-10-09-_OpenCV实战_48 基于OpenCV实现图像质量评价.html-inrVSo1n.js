import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as s,c as d,a as e,b as t,d as n,e as r}from"./app-MsA2k2kn.js";const c={},u=e("h1",{id:"opencv实战-48-基于opencv实现图像质量评价",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-48-基于opencv实现图像质量评价","aria-hidden":"true"},"#"),t(" [OpenCV实战]48 基于OpenCV实现图像质量评价")],-1),v=e("p",null,"本文主要介绍基于OpenCV contrib中的quality模块实现图像质量评价。图像质量评估Image Quality Analysis简称IQA，主要通过数学度量方法来评价图像质量的好坏。",-1),m=e("p",null,"本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：",-1),o={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"本文所有代码见：",-1),g={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},p=e("h2",{id:"_1-opencv中图像质量评价算法介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-opencv中图像质量评价算法介绍","aria-hidden":"true"},"#"),t(" 1 OpenCV中图像质量评价算法介绍")],-1),y=e("h3",{id:"_1-1-相关背景",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1-相关背景","aria-hidden":"true"},"#"),t(" 1.1 相关背景")],-1),_=e("p",null,"图像质量评价(IQA)算法以任意图像作为输入，输出质量分数作为输出。有三种类型的IQA：",-1),h=e("ol",null,[e("li",null,"全参考图像质量评价，适用情形：一个“干净”参考(非扭曲)图像以衡量扭曲图像的质量。此度量可用于评估图像压缩算法的质量。"),e("li",null,"半参考图像质量评价，适用情形：如果没有参考图像，而是具有一些选择性信息的图像(例如，水印图像)来比较和测量失真图像的质量。"),e("li",null,"无参考图像质量评价，适用情形：算法得到的唯一输入是要测量其质量的图像。")],-1),x={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/quality",target:"_blank",rel:"noopener noreferrer"},S=e("ul",null,[e("li",null,"均方误差 Mean squared error (MSE)"),e("li",null,"峰值信噪比 Peak signal-to-noise ratio (PSNR)"),e("li",null,"结构相似性 Structural similarity (SSIM)"),e("li",null,"梯度幅度相似性偏差 Gradient Magnitude Similarity Deviation (GMSD)"),e("li",null,"盲/无参考图像空间质量评估器 Blind/Referenceless Image Spatial Quality Evaluation (BRISQUE)")],-1),q=e("p",null,"这5种图像质量评价算法中，除了BRISQUE是无参考图像质量评价算法外，其他都是全参考图像质量评价。本文不具体介绍这些算法的原理，仅介绍这些算法的应用。想知道具体原理见链接：",-1),M=e("br",null,null,-1),f={href:"https://blog.csdn.net/baidu_33216040/article/details/97373480",target:"_blank",rel:"noopener noreferrer"},Q=e("br",null,null,-1),E={href:"https://blog.csdn.net/xiaoxifei/article/details/88222485",target:"_blank",rel:"noopener noreferrer"},I=e("br",null,null,-1),R={href:"https://blog.csdn.net/LuohenYJ/article/details/104582701",target:"_blank",rel:"noopener noreferrer"},C=e("strong",null,"就全参考图像质量评价算法而言，一般情况下GMSD效果比其他全参考图像质量评价算法效果好",-1),B={href:"https://blog.csdn.net/xiaoxifei/category_9282438.html",target:"_blank",rel:"noopener noreferrer"},V=e("h3",{id:"_1-2-opencv中图像质量评价算法接口介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-2-opencv中图像质量评价算法接口介绍","aria-hidden":"true"},"#"),t(" 1.2 OpenCV中图像质量评价算法接口介绍")],-1),j={href:"https://blog.csdn.net/LuohenYJ/article/details/104582701",target:"_blank",rel:"noopener noreferrer"},P={href:"https://blog.csdn.net/LuohenYJ/article/details/104582701",target:"_blank",rel:"noopener noreferrer"},O=r(`<h4 id="_1-2-1-opencv-contrib中全参考图像质量评价算法具体接口" tabindex="-1"><a class="header-anchor" href="#_1-2-1-opencv-contrib中全参考图像质量评价算法具体接口" aria-hidden="true">#</a> 1.2.1 opencv_contrib中全参考图像质量评价算法具体接口</h4><p><strong>C++/静态方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// output quality map
// 质量结果图
// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像
cv::Mat quality_map;
// compute MSE via static method
// cv::noArray() if not interested in output quality maps
// 静态方法，一步到位
// 如果不想获得质量结果图，将quality_map替换为noArray()
cv::Scalar result_static = quality::QualityMSE::compute(img1, img2, quality_map);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C++/实例方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// alternatively, compute MSE via instance
cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityMSE::create(img1);
// compute MSE, compare img1 vs img2
cv::Scalar result = ptr-&gt;compute(img2);
ptr-&gt;getQualityMap(quality_map);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/静态方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 静态方法，一步到位
# 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果
result_static, quality_map = cv2.quality.QualityMSE_compute(img1, img2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/实例方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>obj = cv2.quality.QualityMSE_create(img1)
result = obj.compute(img2)
quality_map = obj.getQualityMap()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-opencv-contrib中无参考图像质量评价算法具体接口" tabindex="-1"><a class="header-anchor" href="#_1-2-2-opencv-contrib中无参考图像质量评价算法具体接口" aria-hidden="true">#</a> 1.2.2 opencv_contrib中无参考图像质量评价算法具体接口</h4><p><strong>C++/静态方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// path to the trained model
cv::String model_path = &quot;./model/brisque_model_live.yml&quot;;
// path to range file
cv::String range_path = &quot;./model/brisque_range_live.yml&quot;;
// 静态计算方法
cv::Scalar result_static = quality::QualityBRISQUE::compute(img, model_path, range_path);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C++/实例方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityBRISQUE::create(model_path, range_path);
// computes BRISQUE score for img
cv::Scalar result = ptr-&gt;compute(img)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/静态方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># path to the trained model
model_path = &quot;./model/brisque_model_live.yml&quot;
# path to range file
range_path = &quot;./model/brisque_range_live.yml&quot;
# 静态计算方法
result_static = cv2.quality.QualityBRISQUE_compute(img, model_path, range_path)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/实例方法</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>obj = cv2.quality.QualityBRISQUE_create(model_path, range_path)
result = obj.compute(img)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-opencv-contrib中图像质量评价算法输出参数介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-3-opencv-contrib中图像质量评价算法输出参数介绍" aria-hidden="true">#</a> 1.2.3 opencv_contrib中图像质量评价算法输出参数介绍</h4><p>对于静态方法和实例方法输出结果一样的，都是输出在不同颜色通道下的结果，比如对于全参考图像质量评价算法而言RGB图就是分别输出R、G、B三个通道的结果，所以最后需要求均值。对BRISQUE而言不管是彩色图还是灰度图都只输出一个0到100之间的数。各个算法的结果特点如下表所示：</p><table><thead><tr><th style="text-align:center;">算法</th><th style="text-align:center;">输出结果特点</th></tr></thead><tbody><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">结果越小，检测图像和基准图像的差距越小</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">结果越小，检测图像和基准图像的差距越大</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">结果为一个0到100之间的数，越小表示检测图像质量越好</td></tr></tbody></table><h2 id="_2-代码实现与结果分析" tabindex="-1"><a class="header-anchor" href="#_2-代码实现与结果分析" aria-hidden="true">#</a> 2 代码实现与结果分析</h2><h3 id="_2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-1-代码实现" aria-hidden="true">#</a> 2.1 代码实现</h3><p>本文所提供的代码可以对图像进行质量评价。本文提供C++和Python代码实现，但是MSE的Python实例计算代码可能有问题，可以用Python静态方法代替，所有代码如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/quality.hpp&gt;

using namespace std;
using namespace cv;

// 计算结果均值
double calMEAN(Scalar result)
{
	int i = 0;
	double sum = 0;
	// 计算总和
	for (auto val : result.val)
	{
		if (0 == val || isinf(val))
		{
			break;
		}
		sum += val;
		i++;
	}
	return sum / i;
}

// 均方误差 MSE
double MSE(Mat img1, Mat img2)
{
	// output quality map
	// 质量结果图
	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像
	cv::Mat quality_map;
	// compute MSE via static method
	// cv::noArray() if not interested in output quality maps
	// 静态方法，一步到位
	// 如果不想获得质量结果图，将quality_map替换为noArray()
	cv::Scalar result_static = quality::QualityMSE::compute(img1, img2, quality_map);

	/* 另外一种动态计算的方法
	// alternatively, compute MSE via instance
	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityMSE::create(img1);
	// compute MSE, compare img1 vs img2
	cv::Scalar result = ptr-&gt;compute(img2);
	ptr-&gt;getQualityMap(quality_map);
	*/

	return calMEAN(result_static);
}

// 峰值信噪比 PSNR
double PSNR(Mat img1, Mat img2)
{
	// 质量结果图
	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像
	cv::Mat quality_map;
	// 静态方法，一步到位
	// 如果不想获得质量结果图，将quality_map替换为noArray()
	// 第四个参数为PSNR计算公式中的MAX，即图片可能的最大像素值，通常为255
	cv::Scalar result_static = quality::QualityPSNR::compute(img1, img2, quality_map, 255.0);

	/* 另外一种动态计算的方法
	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityPSNR::create(img1, 255.0);
	cv::Scalar result = ptr-&gt;compute(img2);
	ptr-&gt;getQualityMap(quality_map);*/

	return calMEAN(result_static);
}

// 梯度幅度相似性偏差 GMSD
double GMSD(Mat img1, Mat img2)
{
	// 质量结果图
	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像
	cv::Mat quality_map;
	// 静态方法，一步到位
	// 如果不想获得质量结果图，将quality_map替换为noArray()
	cv::Scalar result_static = quality::QualityGMSD::compute(img1, img2, quality_map);
	/* 另外一种动态计算的方法
	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityGMSD::create(img1);
	cv::Scalar result = ptr-&gt;compute(img2);
	ptr-&gt;getQualityMap(quality_map);*/
	return calMEAN(result_static);
}

// 结构相似性 SSIM
double SSIM(Mat img1, Mat img2)
{
	// 质量结果图
	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像
	cv::Mat quality_map;
	// 静态方法，一步到位
	// 如果不想获得质量结果图，将quality_map替换为noArray()
	cv::Scalar result_static = quality::QualitySSIM::compute(img1, img2, quality_map);
	/* 另外一种动态计算的方法
	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualitySSIM::create(img1);
	cv::Scalar result = ptr-&gt;compute(img2);
	ptr-&gt;getQualityMap(quality_map);*/
	return calMEAN(result_static);
}

// 盲/无参考图像空间质量评估器 BRISQUE
double BRISQUE(Mat img)
{
	// path to the trained model
	cv::String model_path = &quot;./model/brisque_model_live.yml&quot;;
	// path to range file
	cv::String range_path = &quot;./model/brisque_range_live.yml&quot;;
	// 静态计算方法
	cv::Scalar result_static = quality::QualityBRISQUE::compute(img, model_path, range_path);
	/* 另外一种动态计算的方法
	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityBRISQUE::create(model_path, range_path);
	// computes BRISQUE score for img
	cv::Scalar result = ptr-&gt;compute(img);*/
	return calMEAN(result_static);
}

void qualityCompute(String methodType, Mat img1, Mat img2)
{
	// 算法结果和算法耗时
	double result;
	TickMeter costTime;

	costTime.start();
	if (&quot;MSE&quot; == methodType)
		result = MSE(img1, img2);
	else if (&quot;PSNR&quot; == methodType)
		result = PSNR(img1, img2);
	else if (&quot;PSNR&quot; == methodType)
		result = PSNR(img1, img2);
	else if (&quot;GMSD&quot; == methodType)
		result = GMSD(img1, img2);
	else if (&quot;SSIM&quot; == methodType)
		result = SSIM(img1, img2);
	else if (&quot;BRISQUE&quot; == methodType)
		result = BRISQUE(img2);
	costTime.stop();
	cout &lt;&lt; methodType &lt;&lt; &quot;_result is: &quot; &lt;&lt; result &lt;&lt; endl;
	cout &lt;&lt; methodType &lt;&lt; &quot;_cost time is: &quot; &lt;&lt; costTime.getTimeSec() / costTime.getCounter() &lt;&lt; &quot; s&quot; &lt;&lt; endl;
}

int main()
{
	// img1为基准图像，img2为检测图像
	cv::Mat img1, img2;
	img1 = cv::imread(&quot;image/original-rotated-image.jpg&quot;);
	img2 = cv::imread(&quot;image/noise-version.jpg&quot;);

	if (img1.empty() || img2.empty())
	{
		cout &lt;&lt; &quot;img empty&quot; &lt;&lt; endl;
		return 0;
	}

	// 结果越小，检测图像和基准图像的差距越小
	qualityCompute(&quot;MSE&quot;, img1, img2);
	// 结果越小，检测图像和基准图像的差距越大
	qualityCompute(&quot;PSNR&quot;, img1, img2);
	// 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大
	qualityCompute(&quot;GMSD&quot;, img1, img2);
	// 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小
	qualityCompute(&quot;SSIM&quot;, img1, img2);
	// BRISQUE不需要基准图像
	// 结果为一个0到100之间的数，越小表示检测图像质量越好
	qualityCompute(&quot;BRISQUE&quot;, cv::Mat{}, img2);
	system(&quot;pause&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Fri Oct  9 05:27:28 2020

@author: luohenyueji
&quot;&quot;&quot;

import cv2
import numpy as np
import time

# ----- 时间装饰器，打印运行结果和运行时间
def usetime(func):
    def inner(*args, **kwargs):
        time_start = time.time()
        # 装饰的函数在此运行
        result = func(*args, **kwargs)
        time_run = time.time() - time_start
        # 打印结果
        print(func.__name__ + &#39;_result is: {:.3f}&#39;.format(result))
        # 打印运行时间
        print(func.__name__ + &#39;_cost time is: {:.3f} s&#39;.format(time_run))

    return inner


# ----- 均方误差 MSE
@usetime
def MSE(img1, img2):
    # 静态方法，一步到位
    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果
    result_static, quality_map = cv2.quality.QualityMSE_compute(img1, img2)
    # 另外一种动态计算的方法，但是MSE的计算可能有问题
    # obj = cv2.quality.QualityMSE_create(img1)
    # result = obj.compute(img2)
    # quality_map = obj.getQualityMap()
    # 计算均值
    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])
    score = 0 if np.isnan(score) else score
    return score


# ----- 峰值信噪比 PSNR
@usetime
def PSNR(img1, img2):
    # 静态方法，一步到位
    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果
    # maxPixelValue参数为PSNR计算公式中的MAX，即图片可能的最大像素值，通常为255
    result_static, quality_map = cv2.quality.QualityPSNR_compute(img1, img2, maxPixelValue=255)
    # 另外一种动态计算的方法
    # obj = cv2.quality.QualityPSNR_create(img1, maxPixelValue=255)
    # result = obj.compute(img2)
    # quality_map = obj.getQualityMap()
    # 计算均值
    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])
    return score


# ----- 梯度幅度相似性偏差 GMSD
@usetime
def GMSD(img1, img2):
    # 静态方法，一步到位
    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果
    result_static, quality_map = cv2.quality.QualityGMSD_compute(img1, img2)
    # 另外一种动态计算的方法
    # obj = cv2.quality.QualityGMSD_create(img1)
    # result = obj.compute(img2)
    # quality_map = obj.getQualityMap()
    # 计算均值
    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])
    score = 0 if np.isnan(score) else score
    return score


# ----- 结构相似性 SSIM
@usetime
def SSIM(img1, img2):
    # 静态方法，一步到位
    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果
    result_static, quality_map = cv2.quality.QualitySSIM_compute(img1, img2)
    # 另外一种动态计算的方法
    # obj = cv2.quality.QualitySSIM_create(img1)
    # result = obj.compute(img2)
    # quality_map = obj.getQualityMap()
    # 计算均值
    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])
    score = 0 if np.isnan(score) else score
    return score


# ----- 盲/无参考图像空间质量评估器 BRISQUE
@usetime
def BRISQUE(img):
    # path to the trained model
    model_path = &quot;./model/brisque_model_live.yml&quot;
    # path to range file
    range_path = &quot;./model/brisque_range_live.yml&quot;
    # 静态计算方法
    result_static = cv2.quality.QualityBRISQUE_compute(img, model_path, range_path)
    # # 另外一种动态计算的方法
    # obj = cv2.quality.QualityBRISQUE_create(model_path, range_path)
    # result = obj.compute(img)
    # 计算均值
    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])
    score = 0 if np.isnan(score) else score
    return score


def main():
    # img1为基准图像，img2为检测图像
    img1 = cv2.imread(&quot;image/cut-original-rotated-image.jpg&quot;)
    img2 = cv2.imread(&quot;image/cut-noise-version.jpg&quot;)
    if img1 is None or img2 is None:
        print(&quot;img empty&quot;)
        return
    # 结果越小，检测图像和基准图像的差距越小
    MSE(img1, img2)
    # 结果越小，检测图像和基准图像的差距越大
    PSNR(img1, img2)
    # 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大
    GMSD(img1, img2)
    # 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小
    SSIM(img1, img2)
    # 结果为一个0到100之间的数，越小表示检测图像质量越好
    BRISQUE(img2)


if __name__ == &#39;__main__&#39;:
    main()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-结果分析" tabindex="-1"><a class="header-anchor" href="#_2-2-结果分析" aria-hidden="true">#</a> 2.2 结果分析</h3><p>上面的代码实现了对不同图片的图像质量诊断，并输出各种方法在不同图像下的评分和方法检测速度。速度计算主要基于C++代码。 具体检测结果如下表所示，其中-nan(ind)表示结果出错，通常是两张图像一样。原图下的结果是原图和原图比，模糊图片和噪声图片是与原图为基准图片比较的结果。按清晰度而言，原图&gt;模糊图片&gt;噪声图片。 下面分别显示分辨率为612x816和中心裁剪分辨率305x305的结果。</p><table><thead><tr><th style="text-align:center;">结果</th><th style="text-align:center;">原图/分辨率612x816</th><th style="text-align:center;">模糊图片/分辨率612x816</th><th style="text-align:center;">噪声图片/分辨率612x816</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">1490.28</td><td style="text-align:center;">1734.03</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">16.3989</td><td style="text-align:center;">15.7454</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">0.209512</td><td style="text-align:center;">0.199491</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">1</td><td style="text-align:center;">0.30256</td><td style="text-align:center;">0.482258</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">53.3901</td><td style="text-align:center;">63.4859</td><td style="text-align:center;">71.2059</td></tr></tbody></table><table><thead><tr><th style="text-align:center;">结果</th><th style="text-align:center;">原图/分辨率305x305</th><th style="text-align:center;">模糊图片/分辨率305x305</th><th style="text-align:center;">噪声图片/分辨率305x305</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">1303.96</td><td style="text-align:center;">984.486</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">16.9784</td><td style="text-align:center;">18.2243</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">0.111176</td><td style="text-align:center;">0.113035</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">1</td><td style="text-align:center;">0.30256</td><td style="text-align:center;">0.687856</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">56.1736</td><td style="text-align:center;">42.0616</td><td style="text-align:center;">73.3258</td></tr></tbody></table><p>各个方法具体检测速度如下表所示：</p><table><thead><tr><th style="text-align:center;">速度/s</th><th style="text-align:center;">原图/分辨率612x816</th><th style="text-align:center;">模糊图片/分辨率612x816</th><th style="text-align:center;">噪声图片/分辨率612x816</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">0.029</td><td style="text-align:center;">0.021</td><td style="text-align:center;">0.020</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">0.017</td><td style="text-align:center;">0.019</td><td style="text-align:center;">0.019</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">0.032</td><td style="text-align:center;">0.031</td><td style="text-align:center;">0.032</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">0.084</td><td style="text-align:center;">0.086</td><td style="text-align:center;">0.084</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">0.068</td><td style="text-align:center;">0.073</td><td style="text-align:center;">0.071</td></tr></tbody></table><table><thead><tr><th style="text-align:center;">速度/s</th><th style="text-align:center;">原图/分辨率305x305</th><th style="text-align:center;">模糊图片/分辨率305x305</th><th style="text-align:center;">噪声图片/分辨率305x305</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">0.006</td><td style="text-align:center;">0.005</td><td style="text-align:center;">0.005</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">0.004</td><td style="text-align:center;">0.005</td><td style="text-align:center;">0.004</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">0.012</td><td style="text-align:center;">0.011</td><td style="text-align:center;">0.012</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">0.025</td><td style="text-align:center;">0.031</td><td style="text-align:center;">0.033</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">0.027</td><td style="text-align:center;">0.028</td><td style="text-align:center;">0.028</td></tr></tbody></table><p>从上面的结果可以得到如下分析：</p>`,36),U=e("li",null,"对于612x816分辨率图片，结果正确的有MSE，GMSD，BRISQUE；对于305x305分辨率图片，如果从局部上来看，噪声图片和模糊图片清晰图差不太多，结果正确的有PSNR，GMSD。然而对于BRISQUE模糊图片的清晰度评分比原图高。所以通常情况下，有参考图片，GMSD准确率最高，其他方法并不靠谱，BRISQUE需要更加完整的大图才有好的效果。",-1),N=e("li",null,"就速度而言，图像分辨率越高，各个方法耗时也越多，毕竟都是靠图像像素点差值公式计算的，不过都能在1s以内获得结果。",-1),G={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/quality/samples",target:"_blank",rel:"noopener noreferrer"},D=e("p",null,"总而言之，现在图像质量评价算法都只能针对某种特定环境使用，在实际最好针对每一种图像噪声情况设定一种判定算法，现在各个视频检测平台也都是这样做的。如果普通使用看看GMSD和BRISQUE即可。",-1),k=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),t(" 3 参考")],-1),A=e("h3",{id:"_3-1-参考代码",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-1-参考代码","aria-hidden":"true"},"#"),t(" 3.1 参考代码")],-1),w={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/quality",target:"_blank",rel:"noopener noreferrer"},T=e("h3",{id:"_3-2-参考文章",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-2-参考文章","aria-hidden":"true"},"#"),t(" 3.2 参考文章")],-1),z={href:"https://blog.csdn.net/baidu_33216040/article/details/97373480",target:"_blank",rel:"noopener noreferrer"},L={href:"https://blog.csdn.net/xiaoxifei/article/details/88222485",target:"_blank",rel:"noopener noreferrer"},J={href:"https://blog.csdn.net/LuohenYJ/article/details/104582701",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://blog.csdn.net/xiaoxifei/category_9282438.html",target:"_blank",rel:"noopener noreferrer"};function X(F,H){const i=a("ExternalLinkIcon");return s(),d("div",null,[u,v,m,e("blockquote",null,[e("p",null,[e("a",o,[t("OpenCV_contrib库在windows下编译使用指南"),n(i)])])]),b,e("blockquote",null,[e("p",null,[e("a",g,[t("OpenCV-Practical-Exercise"),n(i)])])]),p,y,_,h,e("p",null,[t("在OpenCV contrib的quality模块中一共有提供了5种图像质量评价算法，按上面的类别分仅提供全参考图像质量评价和无参考图像质量评价两种类别的算法，没有半参考图像质量评价算法。官方代码地址见"),e("a",x,[t("quality"),n(i)]),t("，其中包含的5种图像质量评价算法具体如下：")]),S,q,e("ul",null,[e("li",null,[e("p",null,[t("MSE/PSNR/SSIM"),M,e("a",f,[t("MSE/PSNR/SSIM"),n(i)])])]),e("li",null,[e("p",null,[t("GMSD"),Q,e("a",E,[t("图像质量评估指标(5) 梯度幅相似性偏差 GMSD"),n(i)])])]),e("li",null,[e("p",null,[t("BRISQUE"),I,e("a",R,[t("[OpenCV实战]37 图像质量评价BRISQUE"),n(i)])])])]),e("p",null,[t("事实上，各种图像质量评估算法都是寻找不同数学公式给出一个评判结果，差异并不那么大，仅知道使用即可。"),C,t("。无参考图形质量评价以BRISQUE为代表。半参考图像质量评价更多用于发论文，实际应用不多。近年来也有深度学习应用于图像质量评估，但是效果还不错，但速度太慢。关于图像质量评估算法具体进一步研究可参考链接："),e("a",B,[t("图像质量评估指标（Image Quality Assessment，IQA)"),n(i)])]),V,e("p",null,[t("OpenCV中图像质量评价算法接口分为静态方法和实例方法，静态方法固定快捷，实例方法灵活性强。其中全参考图像质量评价算法接口类似，只需要更改函数名即可，因为各种参考图像质量算法其实都数学公式应用变换数学公式即可。BRISQUE在"),e("a",j,[t("[OpenCV实战]37 图像质量评价BRISQUE"),n(i)]),t("中已经提到如何使用，不过用起来相对opencv_contrib库中的quality模块麻烦，唯一好处"),e("a",P,[t("[OpenCV实战]37 图像质量评价BRISQUE"),n(i)]),t("提到的方法不需要编译opencv_contrib库，但是实际建议使用opencv_contrib库的quality模块来实现图像质量评估算法。")]),O,e("ol",null,[U,N,e("li",null,[t("如果有有参图像，最好用GMSD。BRISQUE更适合高分辨率图片，如果要低分辨率使用，建议自己重新训练模型，毕竟BRISQUE的模型太老了。关于BRISQUE模型训练见："),e("a",G,[t("quality/samples"),n(i)])])]),D,k,A,e("ul",null,[e("li",null,[e("a",w,[t("quality"),n(i)])])]),T,e("ul",null,[e("li",null,[e("a",z,[t("MSE/PSNR/SSIM"),n(i)])]),e("li",null,[e("a",L,[t("图像质量评估指标(5) 梯度幅相似性偏差 GMSD"),n(i)])]),e("li",null,[e("a",J,[t("[OpenCV实战]37 图像质量评价BRISQUE"),n(i)])]),e("li",null,[e("a",Y,[t("图像质量评估指标（Image Quality Assessment，IQA)"),n(i)])])])])}const Z=l(c,[["render",X],["__file","2020-10-09-_OpenCV实战_48 基于OpenCV实现图像质量评价.html.vue"]]);export{Z as default};
