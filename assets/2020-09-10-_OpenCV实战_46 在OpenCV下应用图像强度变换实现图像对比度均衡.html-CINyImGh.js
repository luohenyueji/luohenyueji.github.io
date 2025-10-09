import{_ as a,c as s,a as e,o as i}from"./app-BNuIUq7T.js";const t={};function l(p,n){return i(),s("div",null,n[0]||(n[0]=[e(`<h1 id="opencv实战-46-在opencv下应用图像强度变换实现图像对比度均衡" tabindex="-1"><a class="header-anchor" href="#opencv实战-46-在opencv下应用图像强度变换实现图像对比度均衡"><span>[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡</span></a></h1><p>本文主要介绍基于图像强度变换算法来实现图像对比度均衡。通过图像对比度均衡能够抑制图像中的无效信息，使图像转换为更符合计算机或人处理分析的形式，以提高图像的视觉价值和使用价值。本文主要介绍通过OpenCV contrib中的intensity_transform模块实现图像对比度均衡。如果想了解具体相关方法原理见冈萨雷斯主编的图像处理经典书籍 <strong>数字图像处理Digital Image Processing</strong> 第四版第三章。</p><p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote><p>本文所有代码见：</p><blockquote><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">OpenCV-Practical-Exercise</a></p></blockquote><h2 id="_1-相关知识介绍" tabindex="-1"><a class="header-anchor" href="#_1-相关知识介绍"><span>1 相关知识介绍</span></a></h2><h3 id="_1-1-图像强度" tabindex="-1"><a class="header-anchor" href="#_1-1-图像强度"><span>1.1 图像强度</span></a></h3><p>图像强度的英文名称是image intensity，意思是单通道图像像素的值大小。在灰度图像中，图像强度是就是图像的灰度级。在RGB颜色空间中，可以理解为RGB三个通道的像素灰度值，即RGB包含三种图像强度。其他颜色空间也是同样的道理。</p><h3 id="_1-2-图像对比度" tabindex="-1"><a class="header-anchor" href="#_1-2-图像对比度"><span>1.2 图像对比度</span></a></h3><p>对比度是指图像中物体在亮度或颜色上的差异，对比度使图像中一个物体区别于同一视场内的其他物体。对比度越大，图像类各个物体的颜色差别就越大，图像也就越鲜艳。</p><p>如下图所示。显然，左图像的对比度较低，因为与右图像相比，很难识别图像中存在的细节。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/38df71b0ee517d8ed9529d96d893de6c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>现实生活中的例子可以是晴天和大雾天。在阳光明媚的日子里，我们觉得一切都很清晰，因此与雾天相比，一切看起来几乎都一样强烈（暗淡、灰暗）。晴天的图像代码对比度高，雾天代表对比度低。</p><p>一种更有效的检查图像对比度是低还是高的方法是绘制图像直方图，让我们为上面的图像绘制直方图。如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/9db5568b991afd0a73f65b5b21ad699c.png" alt="" loading="lazy"></p><p>很明显，从左边的图像直方图中，我们可以看到图像强度值位于一个狭窄的范围内。因为很难区分几乎相同的强度值，因此左图像的对比度较低。如果不理解可以看看下面灰度范围图，可以看到灰度变化范围越大，可视化区分度越好。因此，对于高对比度，图像直方图应该跨越整个动态范围。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/5f67064dc323dc47de603b6861e69873.png" alt="" loading="lazy"></p><p>到目前为止，我们讨论了对比度，但没有讨论低对比度图像的原因。低对比度图像可能是由于照明不足、成像传感器缺乏动态范围，甚至在图像采集过程中镜头光圈设置错误等原因造成的。因此我们需要对低对比度的图像进行图像增强。</p><h3 id="_1-3-opencv中基于图像强度的对比度增强算法" tabindex="-1"><a class="header-anchor" href="#_1-3-opencv中基于图像强度的对比度增强算法"><span>1.3 OpenCV中基于图像强度的对比度增强算法</span></a></h3><p>OpenCV contrib中的intensity_transform模块包含于图像强度的对比度增强算法。主要包括的算法有：</p><ul><li>自适应直方图均衡化 Autoscaling</li><li>对数变换 Log Transformations</li><li>gamma变换 Power-Law (Gamma) Transformations</li><li>对比度拉伸 Contrast Stretching</li><li>BIMEF, A Bio-Inspired Multi-Exposure Fusion Framework for Low-light Image enhancement</li></ul><p>OpenCV contrib的intensity_transform模块官方代码仓库见：<a href="https://github.com/opencv/opencv_contrib/tree/master/modules/intensity_transform" target="_blank" rel="noopener noreferrer">intensity_transform</a></p><p><strong>BIMEF算法，是一个C++实现的原始MATLAB算法。与原始代码相比，此实现速度稍慢，并且无法提供相同的结果。特别是，在一定条件下，对于明亮区域，图像增强的质量会降低，而且OpenCV需要engine库才能运行BIMEF算法，所以本文就不介绍该算法。</strong></p><p>关于图像强度的进一步详细介绍见：<a href="https://www.cnblogs.com/fydeblog/p/10734733.html" target="_blank" rel="noopener noreferrer">图像增强综述</a></p><h2 id="_2-代码与结果分析" tabindex="-1"><a class="header-anchor" href="#_2-代码与结果分析"><span>2 代码与结果分析</span></a></h2><h3 id="_2-1-调用接口说明" tabindex="-1"><a class="header-anchor" href="#_2-1-调用接口说明"><span>2.1 调用接口说明</span></a></h3><p>本文介绍OpenCV contrib的intensity_transform模块中四种图像强度增强算法。所有图像增加代码都在intensity_transform模块中。本文提供C++和Python版本的实现，不同图像强度增强算法调用接口如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// Apply intensity transformations</span></span>
<span class="line"><span>// 应用强度转换</span></span>
<span class="line"><span>Mat imgAutoscaled, imgLog;</span></span>
<span class="line"><span>// autoscaling</span></span>
<span class="line"><span>autoscaling(g_image, imgAutoscaled);</span></span>
<span class="line"><span>// gamma变换</span></span>
<span class="line"><span>gammaCorrection(g_image, g_imgGamma, g_gamma / 100.0f);</span></span>
<span class="line"><span>// 对数变换</span></span>
<span class="line"><span>logTransform(g_image, imgLog);</span></span>
<span class="line"><span>// 对比度拉伸</span></span>
<span class="line"><span>contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># Apply intensity transformations</span></span>
<span class="line"><span># 应用强度转换</span></span>
<span class="line"><span># autoscaling</span></span>
<span class="line"><span>imgAutoscaled = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>cv2.intensity_transform.autoscaling(g_image, imgAutoscaled)</span></span>
<span class="line"><span># gamma变换</span></span>
<span class="line"><span>g_imgGamma = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>cv2.intensity_transform.gammaCorrection(g_image, g_imgGamma, g_gamma / 100.0)</span></span>
<span class="line"><span># 对数变换</span></span>
<span class="line"><span>imgLog = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>cv2.intensity_transform.logTransform(g_image, imgLog)</span></span>
<span class="line"><span># 对比度拉伸</span></span>
<span class="line"><span>g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同的方法所需要设定的参数不同，具体如下：</p><ul><li>autoscaling：对输入图像进行自适应缩放以增强对比度，仅需要输入待增强的图像。</li><li>gamma变换：对输入图像进行伽马校正以增强对比度，需要输入待增强图像和参数gamma。</li><li>对数变换：对输入图像进行对数转换以增强对比度，仅需要输入待增强的图像。</li><li>对比度拉伸：对输入图像应用线性对比度拉伸以增强对比度，需要输入待增强图像和参数r1，s1，r2，s2，(r1,s1)和(r2,s2)为转换函数第一个点和第二个点的坐标。</li></ul><p><strong>此外为了比较不同图像强度增强方法的效果，加入了图像对比度计算方法</strong></p><p>图像对比度计算方法为RMS Contrast，来自于<a href="https://stackoverflow.com/questions/58821130/how-to-calculate-the-contrast-of-an-image" target="_blank" rel="noopener noreferrer">How to calculate the contrast of an image?</a></p><p>方法原理很简单,就是将图像变为灰度图，然后计算图像方差。</p><h3 id="_2-2-完整代码" tabindex="-1"><a class="header-anchor" href="#_2-2-完整代码"><span>2.2 完整代码</span></a></h3><p>代码功能很简单，就是获得输入图像，然后对输入图像应用不同的图像增强算法。对于可调参数的，创建滑动条以调整方法的输入参数。但是要注意的是，输入图像必须为三通道RGB图像。C++和Python代码如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/intensity_transform.hpp&gt;</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace cv::intensity_transform;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 计算对比度</span></span>
<span class="line"><span>double rmsContrast(Mat srcImg)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	Mat dstImg, dstImg_mean, dstImg_std;</span></span>
<span class="line"><span>	// 灰度化</span></span>
<span class="line"><span>	cvtColor(srcImg, dstImg, COLOR_BGR2GRAY);</span></span>
<span class="line"><span>	// 计算图像均值和方差</span></span>
<span class="line"><span>	meanStdDev(dstImg, dstImg_mean, dstImg_std);</span></span>
<span class="line"><span>	// 获得图像对比度</span></span>
<span class="line"><span>	double contrast = dstImg_std.at&lt;double&gt;(0, 0);</span></span>
<span class="line"><span>	return contrast;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 设置命名空间避免污染用户变量</span></span>
<span class="line"><span>namespace</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// global variables</span></span>
<span class="line"><span>	Mat g_image;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// gamma变换变量</span></span>
<span class="line"><span>	int g_gamma = 40;</span></span>
<span class="line"><span>	const int g_gammaMax = 500;</span></span>
<span class="line"><span>	Mat g_imgGamma;</span></span>
<span class="line"><span>	const std::string g_gammaWinName = &quot;Gamma Correction&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 对比度拉伸</span></span>
<span class="line"><span>	Mat g_contrastStretch;</span></span>
<span class="line"><span>	int g_r1 = 70;</span></span>
<span class="line"><span>	int g_s1 = 15;</span></span>
<span class="line"><span>	int g_r2 = 120;</span></span>
<span class="line"><span>	int g_s2 = 240;</span></span>
<span class="line"><span>	const std::string g_contrastWinName = &quot;Contrast Stretching&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 创建gamma变换滑动条</span></span>
<span class="line"><span>	static void onTrackbarGamma(int, void*)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		float gamma = g_gamma / 100.0f;</span></span>
<span class="line"><span>		gammaCorrection(g_image, g_imgGamma, gamma);</span></span>
<span class="line"><span>		imshow(g_gammaWinName, g_imgGamma);</span></span>
<span class="line"><span>		cout &lt;&lt; g_gammaWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_imgGamma) &lt;&lt; endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 创建对数变换滑动条</span></span>
<span class="line"><span>	static void onTrackbarContrastR1(int, void*)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span>
<span class="line"><span>		imshow(&quot;Contrast Stretching&quot;, g_contrastStretch);</span></span>
<span class="line"><span>		cout &lt;&lt; g_contrastWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_contrastStretch) &lt;&lt; endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	static void onTrackbarContrastS1(int, void*)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span>
<span class="line"><span>		imshow(&quot;Contrast Stretching&quot;, g_contrastStretch);</span></span>
<span class="line"><span>		cout &lt;&lt; g_contrastWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_contrastStretch) &lt;&lt; endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	static void onTrackbarContrastR2(int, void*)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span>
<span class="line"><span>		imshow(&quot;Contrast Stretching&quot;, g_contrastStretch);</span></span>
<span class="line"><span>		cout &lt;&lt; g_contrastWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_contrastStretch) &lt;&lt; endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	static void onTrackbarContrastS2(int, void*)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span>
<span class="line"><span>		imshow(&quot;Contrast Stretching&quot;, g_contrastStretch);</span></span>
<span class="line"><span>		cout &lt;&lt; g_contrastWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_contrastStretch) &lt;&lt; endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 图像路径</span></span>
<span class="line"><span>	const std::string inputFilename = &quot;./image/tree.jpg&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Read input image</span></span>
<span class="line"><span>	// 读图</span></span>
<span class="line"><span>	g_image = imread(inputFilename);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if (g_image.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		printf(&quot;image is empty&quot;);</span></span>
<span class="line"><span>		return 0;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Create trackbars</span></span>
<span class="line"><span>	// 创建滑动条</span></span>
<span class="line"><span>	namedWindow(g_gammaWinName);</span></span>
<span class="line"><span>	// 创建gamma变换筛选方法</span></span>
<span class="line"><span>	createTrackbar(&quot;Gamma value&quot;, g_gammaWinName, &amp;g_gamma, g_gammaMax, onTrackbarGamma);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 对比度拉伸 Contrast Stretching</span></span>
<span class="line"><span>	namedWindow(g_contrastWinName);</span></span>
<span class="line"><span>	createTrackbar(&quot;Contrast R1&quot;, g_contrastWinName, &amp;g_r1, 256, onTrackbarContrastR1);</span></span>
<span class="line"><span>	createTrackbar(&quot;Contrast S1&quot;, g_contrastWinName, &amp;g_s1, 256, onTrackbarContrastS1);</span></span>
<span class="line"><span>	createTrackbar(&quot;Contrast R2&quot;, g_contrastWinName, &amp;g_r2, 256, onTrackbarContrastR2);</span></span>
<span class="line"><span>	createTrackbar(&quot;Contrast S2&quot;, g_contrastWinName, &amp;g_s2, 256, onTrackbarContrastS2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Apply intensity transformations</span></span>
<span class="line"><span>	// 应用强度转换</span></span>
<span class="line"><span>	Mat imgAutoscaled, imgLog;</span></span>
<span class="line"><span>	// autoscaling</span></span>
<span class="line"><span>	autoscaling(g_image, imgAutoscaled);</span></span>
<span class="line"><span>	// gamma变换</span></span>
<span class="line"><span>	gammaCorrection(g_image, g_imgGamma, g_gamma / 100.0f);</span></span>
<span class="line"><span>	// 对数变换</span></span>
<span class="line"><span>	logTransform(g_image, imgLog);</span></span>
<span class="line"><span>	// 对比度拉伸</span></span>
<span class="line"><span>	contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// Display intensity transformation results</span></span>
<span class="line"><span>	// 展示结果</span></span>
<span class="line"><span>	imshow(&quot;Original Image&quot;, g_image);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Original Image: &quot; &lt;&lt; rmsContrast(g_image) &lt;&lt; endl;</span></span>
<span class="line"><span>	imshow(&quot;Autoscale&quot;, imgAutoscaled);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Autoscale: &quot; &lt;&lt; rmsContrast(imgAutoscaled) &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	imshow(g_gammaWinName, g_imgGamma);</span></span>
<span class="line"><span>	cout &lt;&lt; g_gammaWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_imgGamma) &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	imshow(&quot;Log Transformation&quot;, imgLog);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Log Transformation: &quot; &lt;&lt; rmsContrast(imgLog) &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	imshow(g_contrastWinName, g_contrastStretch);</span></span>
<span class="line"><span>	cout &lt;&lt; g_contrastWinName &lt;&lt; &quot;: &quot; &lt;&lt; rmsContrast(g_contrastStretch) &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	waitKey(0);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Thu Sep 10 18:48:56 2020</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 全局变量</span></span>
<span class="line"><span># 输入图片</span></span>
<span class="line"><span>g_image = np.zeros((3, 3, 3), np.uint8)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># gamma变换变量</span></span>
<span class="line"><span>g_gamma = 40</span></span>
<span class="line"><span>g_gammaMax = 500</span></span>
<span class="line"><span>g_gammaWinName = &quot;Gamma Correction&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 对比度拉伸</span></span>
<span class="line"><span>g_r1 = 70</span></span>
<span class="line"><span>g_s1 = 15</span></span>
<span class="line"><span>g_r2 = 120</span></span>
<span class="line"><span>g_s2 = 240</span></span>
<span class="line"><span>g_contrastWinName = &quot;Contrast Stretching&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建gamma变换滑动条</span></span>
<span class="line"><span>def onTrackbarGamma(x):</span></span>
<span class="line"><span>    g_gamma = x</span></span>
<span class="line"><span>    gamma = g_gamma / 100.0</span></span>
<span class="line"><span>    g_imgGamma = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.gammaCorrection(g_image, g_imgGamma, gamma)</span></span>
<span class="line"><span>    cv2.imshow(g_gammaWinName, g_imgGamma);</span></span>
<span class="line"><span>    print(g_gammaWinName + &quot;: &quot; + str(rmsContrast(g_imgGamma)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建对数变换滑动条</span></span>
<span class="line"><span>def onTrackbarContrastR1(x):</span></span>
<span class="line"><span>    g_r1 = x</span></span>
<span class="line"><span>    g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span>
<span class="line"><span>    cv2.imshow(&quot;Contrast Stretching&quot;, g_contrastStretch)</span></span>
<span class="line"><span>    print(g_contrastWinName + &quot;: &quot; + str(rmsContrast(g_contrastStretch)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def onTrackbarContrastS1(x):</span></span>
<span class="line"><span>    g_s1 = x</span></span>
<span class="line"><span>    g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span>
<span class="line"><span>    cv2.imshow(&quot;Contrast Stretching&quot;, g_contrastStretch)</span></span>
<span class="line"><span>    print(g_contrastWinName + &quot;: &quot; + str(rmsContrast(g_contrastStretch)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def onTrackbarContrastR2(x):</span></span>
<span class="line"><span>    g_r2 = x</span></span>
<span class="line"><span>    g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span>
<span class="line"><span>    cv2.imshow(&quot;Contrast Stretching&quot;, g_contrastStretch)</span></span>
<span class="line"><span>    print(g_contrastWinName + &quot;: &quot; + str(rmsContrast(g_contrastStretch)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def onTrackbarContrastS2(x):</span></span>
<span class="line"><span>    g_s2 = x</span></span>
<span class="line"><span>    g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span>
<span class="line"><span>    cv2.imshow(&quot;Contrast Stretching&quot;, g_contrastStretch)</span></span>
<span class="line"><span>    print(g_contrastWinName + &quot;: &quot; + str(rmsContrast(g_contrastStretch)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 计算对比度</span></span>
<span class="line"><span>def rmsContrast(scrImg):</span></span>
<span class="line"><span>    dstImg = cv2.cvtColor(scrImg, cv2.COLOR_BGR2GRAY)</span></span>
<span class="line"><span>    contrast = dstImg.std()</span></span>
<span class="line"><span>    return contrast</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # 图像路径</span></span>
<span class="line"><span>    inputFilename = &quot;./image/car.png&quot;</span></span>
<span class="line"><span>    # 读图</span></span>
<span class="line"><span>    global g_image</span></span>
<span class="line"><span>    g_image = cv2.imread(inputFilename)</span></span>
<span class="line"><span>    if g_image is None:</span></span>
<span class="line"><span>        print(&quot;image is empty&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 创建滑动条</span></span>
<span class="line"><span>    cv2.namedWindow(g_gammaWinName)</span></span>
<span class="line"><span>    # 创建gamma变换筛选方法</span></span>
<span class="line"><span>    cv2.createTrackbar(&quot;Gamma value&quot;, g_gammaWinName, g_gamma, g_gammaMax, onTrackbarGamma)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 对比度拉伸 Contrast Stretching</span></span>
<span class="line"><span>    cv2.namedWindow(g_contrastWinName)</span></span>
<span class="line"><span>    cv2.createTrackbar(&quot;Contrast R1&quot;, g_contrastWinName, g_r1, 256, onTrackbarContrastR1)</span></span>
<span class="line"><span>    cv2.createTrackbar(&quot;Contrast S1&quot;, g_contrastWinName, g_s1, 256, onTrackbarContrastS1)</span></span>
<span class="line"><span>    cv2.createTrackbar(&quot;Contrast R2&quot;, g_contrastWinName, g_r2, 256, onTrackbarContrastR2)</span></span>
<span class="line"><span>    cv2.createTrackbar(&quot;Contrast S2&quot;, g_contrastWinName, g_s2, 256, onTrackbarContrastS2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Apply intensity transformations</span></span>
<span class="line"><span>    # 应用强度转换</span></span>
<span class="line"><span>    # autoscaling</span></span>
<span class="line"><span>    imgAutoscaled = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.autoscaling(g_image, imgAutoscaled)</span></span>
<span class="line"><span>    # gamma变换</span></span>
<span class="line"><span>    g_imgGamma = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.gammaCorrection(g_image, g_imgGamma, g_gamma / 100.0)</span></span>
<span class="line"><span>    # 对数变换</span></span>
<span class="line"><span>    imgLog = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.logTransform(g_image, imgLog)</span></span>
<span class="line"><span>    # 对比度拉伸</span></span>
<span class="line"><span>    g_contrastStretch = np.zeros(g_image.shape, np.uint8)</span></span>
<span class="line"><span>    cv2.intensity_transform.contrastStretching(g_image, g_contrastStretch, g_r1, g_s1, g_r2, g_s2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 展示结果</span></span>
<span class="line"><span>    cv2.imshow(&quot;Original Image&quot;, g_image);</span></span>
<span class="line"><span>    print(&quot;Original Image: &quot; + str(rmsContrast(g_image)))</span></span>
<span class="line"><span>    cv2.imshow(&quot;Autoscale&quot;, imgAutoscaled)</span></span>
<span class="line"><span>    print(&quot;Autoscale: &quot; + str(rmsContrast(imgAutoscaled)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.imshow(g_gammaWinName, g_imgGamma)</span></span>
<span class="line"><span>    print(g_gammaWinName + &quot;: &quot; + str(rmsContrast(g_imgGamma)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.imshow(&quot;Log Transformation&quot;, imgLog)</span></span>
<span class="line"><span>    print(&quot;Log Transformation: &quot; + str(rmsContrast(imgLog)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.imshow(g_contrastWinName, g_contrastStretch)</span></span>
<span class="line"><span>    print(g_contrastWinName + &quot;: &quot; + str(rmsContrast(g_contrastStretch)))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.waitKey(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-测试与结果评价" tabindex="-1"><a class="header-anchor" href="#_2-3-测试与结果评价"><span>2.3 测试与结果评价</span></a></h3><h4 id="_2-3-1-测试结果" tabindex="-1"><a class="header-anchor" href="#_2-3-1-测试结果"><span>2.3.1 测试结果</span></a></h4><p>测试图片部分来自于<a href="https://github.com/furkankykc/intensity_transformations" target="_blank" rel="noopener noreferrer">intensity_transformations</a>。本文分别对四种不同场景进行了测试，其中Gamma Correction和Contrast Stretching是手动调整参数后个人觉得最好结果。具体结果如下：</p><p><strong>场景1 car</strong></p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/33a32025d80cd327560955505716e11a.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Autoscaling</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/50b3181905b303fc68de049ea4309992.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Gamma Correction</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/1d26a3d2082ae8e0f942d3d5d1430c90.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Contrast Stretching</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/23f8fab104bd12df2c77b67a8e35c410.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Log Transformations</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/e7450db3687b0cb58938f1d45b439ee8.png" alt="" loading="lazy"></td></tr></tbody></table><p><strong>场景2 tree</strong></p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/52d3ef94cab30cb03cd7546c96ddd3e5.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Autoscaling</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/23d2c811e0dc9dae47dd159762b5b5fe.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Gamma Correction</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/fde015ee97c4634927c66e3e6a5edf7d.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Contrast Stretching</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/9b1644b43163238ba9ca701e48320bb2.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Log Transformations</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/5fd8b65fada9f59be4daec9d07c45d7c.png" alt="" loading="lazy"></td></tr></tbody></table><p><strong>场景3 xray</strong></p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/41369ab26e3a18fc1d362b8fa37b1df2.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Autoscaling</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/517886712fef2ee4b38f964c005ae636.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Gamma Correction</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/f514f29843b9b98e298a39c1ed9d412e.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Contrast Stretching</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/50690bfd49cae0bced5ccbfbc0939e86.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Log Transformations</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/d4faecaf2a40ec1dc1c7c4c1877d2ee3.png" alt="" loading="lazy"></td></tr></tbody></table><p><strong>场景4 indicator</strong></p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/b16aceb4342a45a58f2e765eb4953a03.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Autoscaling</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/6fff20b91346eb6daf4bb56d7ba6cad7.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Gamma Correction</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/cda78ad4c4576276de45df4b0b4c9ab1.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Contrast Stretching</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/a18d39aeace7ba6e8eb609746dedd277.png" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">Log Transformations</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡/ca9dc48440d6e2de9053b67a31a30349.png" alt="" loading="lazy"></td></tr></tbody></table><h4 id="_2-3-2-结果评价" tabindex="-1"><a class="header-anchor" href="#_2-3-2-结果评价"><span>2.3.2 结果评价</span></a></h4><p>总结不同算法在四个场景表现如下：</p><ul><li>Autoscaling：Autoscaling适用于原始图像本身比较模糊的场景，如果原始图像不模糊则没什么太大改进，但各个环境下总体效果不错。</li><li>Gamma Correction：Gamma Correction所需要调整的参数仅有一个，在各种场景下稍微调整参数就能获得不错的结果。</li><li>Contrast Stretching：Contrast Stretching在各个场景都能获得特别好的效果，但是需要调整的参数太多。</li><li>Log Transformations：Log Transformations仅仅适用于亮度极低的场景，其他场景增强后对比度反而更差。</li></ul><p>总结来说，如果对比度影响不那么大或者需要自动化，autoscaling足以对付绝大部分场景，事实上autoscaling用的也算最多的方式。如果对图像对比度要求特别高，通常都是自动参数寻优+Contrast Stretching+图像对比度结果评价来应用，通过设定不同的参数，然后使用Contrast Stretching对图像进行处理，最后筛选图像对比度最高的一次作为最后结果，但是这种方式可能需要一定处理时间，不过确实是一个很不错的解决方案。在实际场景，结合autoscaling和Contrast Stretching自动寻找参，找对比度最好结果即可。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><h3 id="_3-1-参考代码" tabindex="-1"><a class="header-anchor" href="#_3-1-参考代码"><span>3.1 参考代码</span></a></h3><ul><li><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/intensity_transform" target="_blank" rel="noopener noreferrer">intensity_transform</a></li></ul><h3 id="_3-2-参考文章" tabindex="-1"><a class="header-anchor" href="#_3-2-参考文章"><span>3.2 参考文章</span></a></h3><ul><li><a href="https://docs.opencv.org/3.1.0/d5/daf/tutorial_py_histogram_equalization.html" target="_blank" rel="noopener noreferrer">Histogram Equalization</a></li><li><a href="https://theailearner.com/2019/01/30/what-is-contrast-in-image-processing/" target="_blank" rel="noopener noreferrer">What is Contrast in Image Processing?</a></li><li><a href="https://www.cnblogs.com/fydeblog/p/10734733.html" target="_blank" rel="noopener noreferrer">图像增强综述</a></li><li><a href="https://stackoverflow.com/questions/58821130/how-to-calculate-the-contrast-of-an-image" target="_blank" rel="noopener noreferrer">How to calculate the contrast of an image?</a></li><li><a href="https://github.com/furkankykc/intensity_transformations" target="_blank" rel="noopener noreferrer">intensity_transformations</a></li></ul>`,61)]))}const c=a(t,[["render",l],["__file","2020-09-10-_OpenCV实战_46 在OpenCV下应用图像强度变换实现图像对比度均衡.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-09-10-_OpenCV%E5%AE%9E%E6%88%98_46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1.html","title":"[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-09-10T19:42:47.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡 本文主要介绍基于图像强度变换算法来实现图像对比度均衡。通过图像对比度均衡能够抑制图像中的无效信息，使图像转换为更符合计算机或人处理分析的形式，以提高图像的视觉价值和使用价值。本文主要介绍通过OpenCV contrib中的intensity_transform模块实现图像对比...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-09-10-_OpenCV%E5%AE%9E%E6%88%98_46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡"}],["meta",{"property":"og:description","content":"[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡 本文主要介绍基于图像强度变换算法来实现图像对比度均衡。通过图像对比度均衡能够抑制图像中的无效信息，使图像转换为更符合计算机或人处理分析的形式，以提高图像的视觉价值和使用价值。本文主要介绍通过OpenCV contrib中的intensity_transform模块实现图像对比..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/38df71b0ee517d8ed9529d96d893de6c.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-09-10T19:42:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/38df71b0ee517d8ed9529d96d893de6c.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/9db5568b991afd0a73f65b5b21ad699c.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/5f67064dc323dc47de603b6861e69873.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/33a32025d80cd327560955505716e11a.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/50b3181905b303fc68de049ea4309992.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/1d26a3d2082ae8e0f942d3d5d1430c90.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/23f8fab104bd12df2c77b67a8e35c410.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/e7450db3687b0cb58938f1d45b439ee8.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/52d3ef94cab30cb03cd7546c96ddd3e5.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/23d2c811e0dc9dae47dd159762b5b5fe.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/fde015ee97c4634927c66e3e6a5edf7d.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/9b1644b43163238ba9ca701e48320bb2.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/5fd8b65fada9f59be4daec9d07c45d7c.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/41369ab26e3a18fc1d362b8fa37b1df2.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/517886712fef2ee4b38f964c005ae636.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/f514f29843b9b98e298a39c1ed9d412e.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/50690bfd49cae0bced5ccbfbc0939e86.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/d4faecaf2a40ec1dc1c7c4c1877d2ee3.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/b16aceb4342a45a58f2e765eb4953a03.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/6fff20b91346eb6daf4bb56d7ba6cad7.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/cda78ad4c4576276de45df4b0b4c9ab1.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/a18d39aeace7ba6e8eb609746dedd277.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D46%20%E5%9C%A8OpenCV%E4%B8%8B%E5%BA%94%E7%94%A8%E5%9B%BE%E5%83%8F%E5%BC%BA%E5%BA%A6%E5%8F%98%E6%8D%A2%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%AF%B9%E6%AF%94%E5%BA%A6%E5%9D%87%E8%A1%A1/ca9dc48440d6e2de9053b67a31a30349.png\\"],\\"datePublished\\":\\"2020-09-10T19:42:47.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 相关知识介绍","slug":"_1-相关知识介绍","link":"#_1-相关知识介绍","children":[{"level":3,"title":"1.1 图像强度","slug":"_1-1-图像强度","link":"#_1-1-图像强度","children":[]},{"level":3,"title":"1.2 图像对比度","slug":"_1-2-图像对比度","link":"#_1-2-图像对比度","children":[]},{"level":3,"title":"1.3 OpenCV中基于图像强度的对比度增强算法","slug":"_1-3-opencv中基于图像强度的对比度增强算法","link":"#_1-3-opencv中基于图像强度的对比度增强算法","children":[]}]},{"level":2,"title":"2 代码与结果分析","slug":"_2-代码与结果分析","link":"#_2-代码与结果分析","children":[{"level":3,"title":"2.1 调用接口说明","slug":"_2-1-调用接口说明","link":"#_2-1-调用接口说明","children":[]},{"level":3,"title":"2.2 完整代码","slug":"_2-2-完整代码","link":"#_2-2-完整代码","children":[]},{"level":3,"title":"2.3 测试与结果评价","slug":"_2-3-测试与结果评价","link":"#_2-3-测试与结果评价","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[{"level":3,"title":"3.1 参考代码","slug":"_3-1-参考代码","link":"#_3-1-参考代码","children":[]},{"level":3,"title":"3.2 参考文章","slug":"_3-2-参考文章","link":"#_3-2-参考文章","children":[]}]}],"git":{},"readingTime":{"minutes":15.22,"words":4565},"filePathRelative":"blog/opencv/opencv实战/2020-09-10-[OpenCV实战]46 在OpenCV下应用图像强度变换实现图像对比度均衡.md","localizedDate":"2020年9月11日","excerpt":"\\n<p>本文主要介绍基于图像强度变换算法来实现图像对比度均衡。通过图像对比度均衡能够抑制图像中的无效信息，使图像转换为更符合计算机或人处理分析的形式，以提高图像的视觉价值和使用价值。本文主要介绍通过OpenCV contrib中的intensity_transform模块实现图像对比度均衡。如果想了解具体相关方法原理见冈萨雷斯主编的图像处理经典书籍 <strong>数字图像处理Digital Image Processing</strong> 第四版第三章。</p>\\n<p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p>\\n<blockquote>\\n<p><a href=\\"https://blog.csdn.net/LuohenYJ/article/details/107944236\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">OpenCV_contrib库在windows下编译使用指南</a></p>\\n</blockquote>","autoDesc":true}');export{c as comp,d as data};
