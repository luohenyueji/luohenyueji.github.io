import{_ as s,c as a,a as e,o as i}from"./app-BNuIUq7T.js";const l={};function t(p,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="opencv实战-44-使用opencv进行图像超分放大" tabindex="-1"><a class="header-anchor" href="#opencv实战-44-使用opencv进行图像超分放大"><span>[OpenCV实战]44 使用OpenCV进行图像超分放大</span></a></h1><p>图像超分辨率（Image Super Resolution）是指从低分辨率图像或图像序列得到高分辨率图像。图像超分辨率是计算机视觉领域中一个非常重要的研究问题，广泛应用于医学图像分析、生物识别、视频监控和安全等领域。随着深度学习技术的发展，基于深度学习的图像超分方法在多个测试任务上，相比传统图像超分方法，取得了更优的性能和效果。 关于基于深度学习的图像超分辨率的综述可以见文章：</p><blockquote><p><a href="https:_www.cnblogs.com_carsonzhu_p_10860594" target="_blank" rel="noopener noreferrer">【超分辨率】—图像超分辨率(Super-Resolution)技术研究</a></p></blockquote><p>关于基于深度学习的图像超分辨率放大的介绍和最新进展可以见文章：</p><blockquote><p><a href="https:_www.cnblogs.com_carsonzhu_p_11122244" target="_blank" rel="noopener noreferrer">【超分辨率】—基于深度学习的图像超分辨率最新进展与趋势</a></p></blockquote><p>OpenCV contrib库中dnn_superres模块用于实现基于深度学习的图像超分放大，本文主要介绍使用此模块进行超分放大。关于dnn_superres模块的代码介绍可以见：</p><blockquote><p><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/dnn_superres" target="_blank" rel="noopener noreferrer">Super Resolution using Convolutional Neural Networks</a></p></blockquote><p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote><p>本文所有代码见：</p><blockquote><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">OpenCV-Practical-Exercise</a></p></blockquote><h2 id="_1-opencv-dnn-superres模块介绍" tabindex="-1"><a class="header-anchor" href="#_1-opencv-dnn-superres模块介绍"><span>1 OpenCV dnn_superres模块介绍</span></a></h2><p>dnn_superres包含四种基于深度学习的算法，用于放大图像，这些模型能让图像放大2~4倍。具体模型介绍如下： <strong>EDSR</strong></p><ul><li>模型和官方代码地址：<a href="https://github.com/Saafke/EDSR_Tensorflow/tree/master/models" target="_blank" rel="noopener noreferrer">EDSR_Tensorflow</a></li><li>论文：<a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Enhanced Deep Residual Networks for Single Image Super-Resolution</a></li><li>模型大小：〜38.5MB。这是一个量化版本，因此可以将其上传到GitHub。（原始模型大小为150MB。）</li><li>模型参数：提供x2，x3，x4训练模型</li><li>优点：高精度</li><li>缺点：模型文件大且运行速度慢</li><li>速度：在Intel i7-9700K CPU上的256x256图像，每个放大比例所需时间均小于3秒。</li></ul><p><strong>ESPCN</strong></p><ul><li>模型和官方代码地址：<a href="https://github.com/fannymonori/TF-ESPCN/tree/master/export" target="_blank" rel="noopener noreferrer">TF-ESPCN</a></li><li>论文：<a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network</a></li><li>模型大小：〜100kb</li><li>模型参数：提供x2，x3，x4训练模型</li><li>优点：体积小，速度快，并且仍然表现良好</li><li>缺点：与更新的、更健壮的模型相比，在视觉上表现更差。</li><li>速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.01秒。</li></ul><p><strong>FSRCNN</strong></p><ul><li>模型和官方代码地址：<a href="https://github.com/Saafke/FSRCNN_Tensorflow" target="_blank" rel="noopener noreferrer">FSRCNN_Tensorflow</a></li><li>论文：<a href="http:_mmlab.ie.cuhk.edu.hk_projects_fsrcnn" target="_blank" rel="noopener noreferrer">Accelerating the Super-Resolution Convolutional Neural Network</a></li><li>模型大小：〜40KB（对于FSRCNN-small，约为9kb）</li><li>模型参数：提供x2，x3，x4训练模型和small训练模型</li><li>优点：快速，小巧</li><li>缺点：不够准确</li><li>速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.01秒。</li><li>其他：FSRCNN-small具有较少的参数，因此精度较低，但速度更快。</li></ul><p><strong>LapSRN</strong></p><ul><li>模型和官方代码地址：<a href="https://github.com/fannymonori/TF-LAPSRN" target="_blank" rel="noopener noreferrer">TF-LAPSRN</a></li><li>论文：<a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Deep laplacian pyramid networks for fast and accurate super-resolution</a></li><li>模型大小：1-5Mb之间</li><li>模型参数：提供x2，x4，x8训练模型</li><li>优点：该模型可以通过一次向前传递进行多尺度超分辨率。可以支持2x，4x，8x和[2x，4x]和[2x，4x，8x]超分辨率。</li><li>缺点：它比ESPCN和FSRCNN慢，并且精度比EDSR差。</li><li>速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.1秒。。</li></ul><h2 id="_2-opencv-dnn-superres模块使用" tabindex="-1"><a class="header-anchor" href="#_2-opencv-dnn-superres模块使用"><span>2 OpenCV dnn_superres模块使用</span></a></h2><h3 id="_2-1-图像超分放大单输出" tabindex="-1"><a class="header-anchor" href="#_2-1-图像超分放大单输出"><span>2.1 图像超分放大单输出</span></a></h3><h4 id="_2-1-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-1-接口介绍"><span>2.1.1 接口介绍</span></a></h4><p>在本节中，我们将学习如何使用dnn_superres中的函数，通过已有训练的神经网络对图像进行放大。实际上就是调用模型构造模型，只不过dnn_superres对这些模型的调用函数进行了封装，并且建立了通用接口。调用方法如下： <strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// Make dnn super resolution instance</span></span>
<span class="line"><span>    // 创建dnn超分辨率对象</span></span>
<span class="line"><span>    DnnSuperResImpl sr;</span></span>
<span class="line"><span>    // 读取模型</span></span>
<span class="line"><span>    sr.readModel(path);</span></span>
<span class="line"><span>    // 设定算法和放大比例</span></span>
<span class="line"><span>    sr.setModel(algorithm, scale);</span></span>
<span class="line"><span>    // 放大图像</span></span>
<span class="line"><span>    sr.upsample(img, img_new);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 创建模型</span></span>
<span class="line"><span>    sr = dnn_superres.DnnSuperResImpl_create()</span></span>
<span class="line"><span>    # 读取模型</span></span>
<span class="line"><span>    sr.readModel(path)</span></span>
<span class="line"><span>    #  设定算法和放大比例</span></span>
<span class="line"><span>    sr.setModel(algorithm, scale)</span></span>
<span class="line"><span>    # 放大图像</span></span>
<span class="line"><span>    img_new = sr.upsample(img)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-1-2-示例代码"><span>2.1.2 示例代码</span></a></h4><p>主要展示通过OpenCV自带resize函数或调用深度学习将一张图像发大指定倍数，C++代码和Python代码如下。 <strong>C++/dnn_superres.cpp</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 图像超分放大单输出</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/dnn_superres.hpp&gt;</span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace dnn;</span></span>
<span class="line"><span>using namespace dnn_superres;</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	string img_path = string(&quot;./image/image.png&quot;);</span></span>
<span class="line"><span>	// 可选择算法，bilinear, bicubic, edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>	string algorithm = string(&quot;fsrcnn&quot;);</span></span>
<span class="line"><span>	// 放大比例，可输入值2，3，4</span></span>
<span class="line"><span>	int scale = 4;</span></span>
<span class="line"><span>	// 模型路径</span></span>
<span class="line"><span>	string path = &quot;./model/FSRCNN-small_x4.pb&quot;;</span></span>
<span class="line"><span>	// Load the image</span></span>
<span class="line"><span>	// 载入图像</span></span>
<span class="line"><span>	Mat img = cv::imread(img_path);</span></span>
<span class="line"><span>	// 如果输入的图像为空</span></span>
<span class="line"><span>	if (img.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;</span></span>
<span class="line"><span>		return -2;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	Mat original_img(img);</span></span>
<span class="line"><span>	// Make dnn super resolution instance</span></span>
<span class="line"><span>	// 创建dnn超分辨率对象</span></span>
<span class="line"><span>	DnnSuperResImpl sr;</span></span>
<span class="line"><span>	// 超分放大后的图像</span></span>
<span class="line"><span>	Mat img_new;</span></span>
<span class="line"><span>	// 双线性插值</span></span>
<span class="line"><span>	if (algorithm == &quot;bilinear&quot;)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		resize(img, img_new, Size(), scale, scale, cv::INTER_LINEAR);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 双三次插值</span></span>
<span class="line"><span>	else if (algorithm == &quot;bicubic&quot;)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		resize(img, img_new, Size(), scale, scale, cv::INTER_CUBIC);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	else if (algorithm == &quot;edsr&quot; || algorithm == &quot;espcn&quot; || algorithm == &quot;fsrcnn&quot; || algorithm == &quot;lapsrn&quot;)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 读取模型</span></span>
<span class="line"><span>		sr.readModel(path);</span></span>
<span class="line"><span>		// 设定算法和放大比例</span></span>
<span class="line"><span>		sr.setModel(algorithm, scale);</span></span>
<span class="line"><span>		// 放大图像</span></span>
<span class="line"><span>		sr.upsample(img, img_new);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Algorithm not recognized. \\n&quot;;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 如果失败</span></span>
<span class="line"><span>	if (img_new.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 放大失败</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Upsampling failed. \\n&quot;;</span></span>
<span class="line"><span>		return -3;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Upsampling succeeded. \\n&quot;;</span></span>
<span class="line"><span>	// Display image</span></span>
<span class="line"><span>	// 展示图片</span></span>
<span class="line"><span>	cv::namedWindow(&quot;Initial Image&quot;, WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>	// 初始化图片</span></span>
<span class="line"><span>	cv::imshow(&quot;Initial Image&quot;, img_new);</span></span>
<span class="line"><span>	//cv::imwrite(&quot;./saved.jpg&quot;, img_new);</span></span>
<span class="line"><span>	cv::waitKey(0);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres.py</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Fri Aug 20 20:08:22 2020</span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>图像超分放大单输出</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>from cv2 import dnn_superres</span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    img_path = &quot;./image/image.png&quot;</span></span>
<span class="line"><span>    # 可选择算法，bilinear, bicubic, edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>    algorithm = &quot;bilinear&quot;</span></span>
<span class="line"><span>    # 放大比例，可输入值2，3，4</span></span>
<span class="line"><span>    scale = 4</span></span>
<span class="line"><span>    # 模型路径</span></span>
<span class="line"><span>    path = &quot;./model/LapSRN_x4.pb&quot;</span></span>
<span class="line"><span>    # 载入图像</span></span>
<span class="line"><span>    img = cv2.imread(img_path)</span></span>
<span class="line"><span>    # 如果输入的图像为空</span></span>
<span class="line"><span>    if img is None:</span></span>
<span class="line"><span>        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    original_img = img.copy()</span></span>
<span class="line"><span>    # 创建模型</span></span>
<span class="line"><span>    sr = dnn_superres.DnnSuperResImpl_create()</span></span>
<span class="line"><span>    if algorithm == &quot;bilinear&quot;:</span></span>
<span class="line"><span>        img_new = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)</span></span>
<span class="line"><span>    elif algorithm == &quot;bicubic&quot;:</span></span>
<span class="line"><span>        img_new = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)</span></span>
<span class="line"><span>    elif algorithm == &quot;edsr&quot; or algorithm == &quot;espcn&quot; or algorithm == &quot;fsrcnn&quot; or algorithm == &quot;lapsrn&quot;:</span></span>
<span class="line"><span>        # 读取模型</span></span>
<span class="line"><span>        sr.readModel(path)</span></span>
<span class="line"><span>        #  设定算法和放大比例</span></span>
<span class="line"><span>        sr.setModel(algorithm, scale)</span></span>
<span class="line"><span>        # 放大图像</span></span>
<span class="line"><span>        img_new = sr.upsample(img)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&quot;Algorithm not recognized&quot;)</span></span>
<span class="line"><span>    # 如果失败</span></span>
<span class="line"><span>    if img_new is None:</span></span>
<span class="line"><span>        print(&quot;Upsampling failed&quot;)</span></span>
<span class="line"><span>    print(&quot;Upsampling succeeded. \\n&quot;)</span></span>
<span class="line"><span>    # Display</span></span>
<span class="line"><span>    # 展示图片</span></span>
<span class="line"><span>    cv2.namedWindow(&quot;Initial Image&quot;, cv2.WINDOW_AUTOSIZE)</span></span>
<span class="line"><span>    # 初始化图片</span></span>
<span class="line"><span>    cv2.imshow(&quot;Initial Image&quot;, img_new)</span></span>
<span class="line"><span>    cv2.imwrite(&quot;./saved.jpg&quot;, img_new)</span></span>
<span class="line"><span>    cv2.waitKey(0)</span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-结果" tabindex="-1"><a class="header-anchor" href="#_2-1-3-结果"><span>2.1.3 结果</span></a></h4><p>放大四倍，不同算法效果如下所示：</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1src.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">bilinear</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1bilinear.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">bicubic</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1bicubic.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">edsr</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1edsr.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">espcn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1espcn.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">fsrcnn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1fsrcnn.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">fsrcnn-small</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1fsrcnn-small.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">lapsrn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1lapsrn.jpg" alt="" loading="lazy"></td></tr></tbody></table><h3 id="_2-2-图像超分放大多输出" tabindex="-1"><a class="header-anchor" href="#_2-2-图像超分放大多输出"><span>2.2 图像超分放大多输出</span></a></h3><h4 id="_2-2-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_2-2-1-接口介绍"><span>2.2.1 接口介绍</span></a></h4><p>本节主要介绍如何通过LapSRN多输出来放大图像。如果给出了节点的名称，OpenCV的dnn模块支持一次推断访问多个节点。LapSRN模型可以在一次推理运行中提供更多输出。现在，LapSRN模型可以支持2x，4x，8x和（2x，4x）和（2x，4x，8x）超分辨率。经过训练的LapSRN模型文件具有以下输出节点名称：</p><ul><li>2x模型：NCHW_output</li><li>4x模型：NCHW_output_2x，NCHW_output_4x</li><li>8x模型：NCHW_output_2x，NCHW_output_4x，NCHW_output_8x</li></ul><p>其次这个功能用处不那么大，LapSRN效果很一般。不过看看挺好的。 由于Python相关实现代码有所问题，因此该部分只提供C++代码。调用方法如下。相比单输出放大，需要设定输出层名字并通过upsampleMultioutput输出各输出层的放大结果。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 可选多输入放大比例2，4，8。&#39;,&#39;分隔放大比例</span></span>
<span class="line"><span>    string scales_str = string(&quot;2,4,8&quot;);</span></span>
<span class="line"><span>    // 可选模型输出放大层比例名，NCHW_output_2x,NCHW_output_4x，NCHW_output_8x</span></span>
<span class="line"><span>    // 需要根据模型和输入放大比例共同确定确定</span></span>
<span class="line"><span>    string output_names_str = string(&quot;NCHW_output_2x,NCHW_output_4x,NCHW_output_8x&quot;);</span></span>
<span class="line"><span>    // 创建Dnn Superres对象</span></span>
<span class="line"><span>    DnnSuperResImpl sr;</span></span>
<span class="line"><span>    // 获得最大放大比例</span></span>
<span class="line"><span>    int scale = *max_element(scales.begin(), scales.end());</span></span>
<span class="line"><span>    std::vector&lt;Mat&gt; outputs;</span></span>
<span class="line"><span>    // 读取模型</span></span>
<span class="line"><span>    sr.readModel(path);</span></span>
<span class="line"><span>    // 设定模型输出</span></span>
<span class="line"><span>    sr.setModel(&quot;lapsrn&quot;, scale);</span></span>
<span class="line"><span>    // 多输出超分放大图像</span></span>
<span class="line"><span>    sr.upsampleMultioutput(img, outputs, scales, node_names);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-2-2-示例代码"><span>2.2.2 示例代码</span></a></h4><p><strong>C++/dnn_superres_multioutput.cpp</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 图像超分放大多输出</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;sstream&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/dnn_superres.hpp&gt;</span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace dnn_superres;</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 图像路径</span></span>
<span class="line"><span>	string img_path = string(&quot;./image/image.png&quot;);</span></span>
<span class="line"><span>	if (img_path.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		printf(&quot;image is empty!&quot;);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 可选多输入放大比例2，4，8。&#39;,&#39;分隔放大比例</span></span>
<span class="line"><span>	string scales_str = string(&quot;2,4,8&quot;);</span></span>
<span class="line"><span>	// 可选模型输出放大层比例名，NCHW_output_2x,NCHW_output_4x，NCHW_output_8x</span></span>
<span class="line"><span>	// 需要根据模型和输入放大比例共同确定确定</span></span>
<span class="line"><span>	string output_names_str = string(&quot;NCHW_output_2x,NCHW_output_4x,NCHW_output_8x&quot;);</span></span>
<span class="line"><span>	// 模型路径</span></span>
<span class="line"><span>	std::string path = string(&quot;./model/LapSRN_x8.pb&quot;);</span></span>
<span class="line"><span>	// Parse the scaling factors</span></span>
<span class="line"><span>	// 解析放大比例因子</span></span>
<span class="line"><span>	std::vector&lt;int&gt; scales;</span></span>
<span class="line"><span>	char delim = &#39;,&#39;;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::stringstream ss(scales_str);</span></span>
<span class="line"><span>		std::string token;</span></span>
<span class="line"><span>		while (std::getline(ss, token, delim))</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			scales.push_back(atoi(token.c_str()));</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Parse the output node names</span></span>
<span class="line"><span>	// 解析模型放大层参数</span></span>
<span class="line"><span>	std::vector&lt;String&gt; node_names;</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::stringstream ss(output_names_str);</span></span>
<span class="line"><span>		std::string token;</span></span>
<span class="line"><span>		while (std::getline(ss, token, delim))</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			node_names.push_back(token);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Load the image</span></span>
<span class="line"><span>	// 导入图片</span></span>
<span class="line"><span>	Mat img = cv::imread(img_path);</span></span>
<span class="line"><span>	Mat original_img(img);</span></span>
<span class="line"><span>	if (img.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;</span></span>
<span class="line"><span>		return -2;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Make dnn super resolution instance</span></span>
<span class="line"><span>	// 创建Dnn Superres对象</span></span>
<span class="line"><span>	DnnSuperResImpl sr;</span></span>
<span class="line"><span>	// 获得最大放大比例</span></span>
<span class="line"><span>	int scale = *max_element(scales.begin(), scales.end());</span></span>
<span class="line"><span>	std::vector&lt;Mat&gt; outputs;</span></span>
<span class="line"><span>	// 读取模型</span></span>
<span class="line"><span>	sr.readModel(path);</span></span>
<span class="line"><span>	// 设定模型输出</span></span>
<span class="line"><span>	sr.setModel(&quot;lapsrn&quot;, scale);</span></span>
<span class="line"><span>	// 多输出超分放大图像</span></span>
<span class="line"><span>	sr.upsampleMultioutput(img, outputs, scales, node_names);</span></span>
<span class="line"><span>	for (unsigned int i = 0; i &lt; outputs.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cv::namedWindow(&quot;Upsampled image&quot;, WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>		// 在图上显示当前放大比例</span></span>
<span class="line"><span>		cv::putText(outputs[i], format(&quot;Scale %d&quot;, scales[i]), Point(10, 30), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);</span></span>
<span class="line"><span>		cv::imshow(&quot;Upsampled image&quot;, outputs[i]);</span></span>
<span class="line"><span>		cv::imwrite(to_string(i) + &quot;.jpg&quot;, outputs[i]);</span></span>
<span class="line"><span>		cv::waitKey(-1);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3-结果" tabindex="-1"><a class="header-anchor" href="#_2-2-3-结果"><span>2.2.3 结果</span></a></h4><p>放大二倍、四倍、八倍的LapSRN算法效果如下所示：</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1src.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x2</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn2.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x4</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn4.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x8</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn8.jpg" alt="" loading="lazy"></td></tr></tbody></table><h3 id="_2-3-视频超分放大" tabindex="-1"><a class="header-anchor" href="#_2-3-视频超分放大"><span>2.3 视频超分放大</span></a></h3><p>实际视频超分放大输出，就是把视频每一帧提取出来，超分放大每一帧图像。代码如下，实际上如果电脑配置很一般不建议视频超分放大，对电脑配置性能要求很高，建议使用opencv cuda进行运算。 <strong>C++/dnn_superres_video.cpp</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 视频超分放大多输出</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/dnn_superres.hpp&gt;</span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace dnn_superres;</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	string input_path = string(&quot;./video/chaplin.mp4&quot;);</span></span>
<span class="line"><span>	string output_path = string(&quot;./video/https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_chaplin.mp4&quot;);</span></span>
<span class="line"><span>	// 选择模型 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>	string algorithm = string(&quot;lapsrn&quot;);</span></span>
<span class="line"><span>	// 放大比例，2，3，4，8，根据模型结构选择</span></span>
<span class="line"><span>	int scale = 2;</span></span>
<span class="line"><span>	// 模型路径</span></span>
<span class="line"><span>	string path = string(&quot;./model/LapSRN_x2.pb&quot;);</span></span>
<span class="line"><span>	// 打开视频</span></span>
<span class="line"><span>	VideoCapture input_video(input_path);</span></span>
<span class="line"><span>	// 输入图像编码尺寸</span></span>
<span class="line"><span>	int ex = static_cast&lt;int&gt;(input_video.get(CAP_PROP_FOURCC));</span></span>
<span class="line"><span>	// 获得输出视频图像尺寸</span></span>
<span class="line"><span>	Size S = Size((int)input_video.get(CAP_PROP_FRAME_WIDTH) * scale,</span></span>
<span class="line"><span>		(int)input_video.get(CAP_PROP_FRAME_HEIGHT) * scale);</span></span>
<span class="line"><span>	VideoWriter output_video;</span></span>
<span class="line"><span>	output_video.open(output_path, ex, input_video.get(CAP_PROP_FPS), S, true);</span></span>
<span class="line"><span>	// 如果视频没有打开</span></span>
<span class="line"><span>	if (!input_video.isOpened())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Could not open the video.&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>		return -1;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// 读取超分放大模型</span></span>
<span class="line"><span>	DnnSuperResImpl sr;</span></span>
<span class="line"><span>	sr.readModel(path);</span></span>
<span class="line"><span>	sr.setModel(algorithm, scale);</span></span>
<span class="line"><span>	for (;;)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		Mat frame, output_frame;</span></span>
<span class="line"><span>		input_video &gt;&gt; frame;</span></span>
<span class="line"><span>		if (frame.empty())</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		// 上采样图像</span></span>
<span class="line"><span>		sr.upsample(frame, output_frame);</span></span>
<span class="line"><span>		output_video &lt;&lt; output_frame;</span></span>
<span class="line"><span>		namedWindow(&quot;Upsampled video&quot;, WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>		imshow(&quot;Upsampled video&quot;, output_frame);</span></span>
<span class="line"><span>		namedWindow(&quot;Original video&quot;, WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>		imshow(&quot;Original video&quot;, frame);</span></span>
<span class="line"><span>		char c = (char)waitKey(1);</span></span>
<span class="line"><span>		// esc退出</span></span>
<span class="line"><span>		if (c == 27)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	input_video.release();</span></span>
<span class="line"><span>	output_video.release();</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_video.py</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Fri Aug 20 21:08:22 2020</span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>视频超分放大</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>from cv2 import dnn_superres</span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    input_path = &quot;./video/chaplin.mp4&quot;</span></span>
<span class="line"><span>    output_path = &quot;./video/https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_chaplin.mp4&quot;</span></span>
<span class="line"><span>    # 选择模型 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>    algorithm = &quot;lapsrn&quot;</span></span>
<span class="line"><span>    # 放大比例，2，3，4，8，根据模型结构选择</span></span>
<span class="line"><span>    scale = 2</span></span>
<span class="line"><span>    # 模型路径</span></span>
<span class="line"><span>    path = &quot;./model/LapSRN_x2.pb&quot;</span></span>
<span class="line"><span>    # 打开视频</span></span>
<span class="line"><span>    input_video = cv2.VideoCapture(input_path)</span></span>
<span class="line"><span>    # 输入图像编码尺寸</span></span>
<span class="line"><span>    ex = int(input_video.get(cv2.CAP_PROP_FOURCC))</span></span>
<span class="line"><span>    # 获得输出视频图像尺寸</span></span>
<span class="line"><span>    # 如果视频没有打开</span></span>
<span class="line"><span>    if input_video is None:</span></span>
<span class="line"><span>        print(&quot;Could not open the video.&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    S = (</span></span>
<span class="line"><span>    int(input_video.get(cv2.CAP_PROP_FRAME_WIDTH)) * scale, int(input_video.get(cv2.CAP_PROP_FRAME_HEIGHT)) * scale)</span></span>
<span class="line"><span>    output_video = cv2.VideoWriter(output_path, ex, input_video.get(cv2.CAP_PROP_FPS), S, True)</span></span>
<span class="line"><span>    # 读取超分放大模型</span></span>
<span class="line"><span>    sr = dnn_superres.DnnSuperResImpl_create()</span></span>
<span class="line"><span>    sr.readModel(path)</span></span>
<span class="line"><span>    sr.setModel(algorithm, scale)</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        ret, frame = input_video.read()  # 捕获一帧图像</span></span>
<span class="line"><span>        if not ret:</span></span>
<span class="line"><span>            print(&quot;read video error&quot;)</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        # 上采样图像</span></span>
<span class="line"><span>        output_frame = sr.upsample(frame)</span></span>
<span class="line"><span>        output_video.write(output_frame)</span></span>
<span class="line"><span>        cv2.namedWindow(&quot;Upsampled video&quot;, cv2.WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>        cv2.imshow(&quot;Upsampled video&quot;, output_frame)</span></span>
<span class="line"><span>        cv2.namedWindow(&quot;Original video&quot;, cv2.WINDOW_AUTOSIZE);</span></span>
<span class="line"><span>        cv2.imshow(&quot;Original video&quot;, frame)</span></span>
<span class="line"><span>        c = cv2.waitKey(1);</span></span>
<span class="line"><span>        # esc退出</span></span>
<span class="line"><span>        if 27 == c:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>    input_video.release()</span></span>
<span class="line"><span>    output_video.release()</span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-不同图像超分算法性能比较" tabindex="-1"><a class="header-anchor" href="#_3-不同图像超分算法性能比较"><span>3 不同图像超分算法性能比较</span></a></h2><h3 id="_3-1-不同图像超分算法效果评估" tabindex="-1"><a class="header-anchor" href="#_3-1-不同图像超分算法效果评估"><span>3.1 不同图像超分算法效果评估</span></a></h3><p>通过PSNR和SSIM来评估图像放大后的效果，PSNR越大，图像失真越小。SSIM也是越大，图像失真越小。PSNR和SSIM介绍见博客：<a href="https:_www.cnblogs.com_vincent2012_archive_2012_10_13_2723152" target="_blank" rel="noopener noreferrer">PSNR和SSIM</a> 本节对比四类算法放大图像后的PSNR值和SSIM值，因为电脑性能原因只放大2倍。具体放大倍数可自行调试。代码如下： <strong>C++/dnn_superres_benchmark_quality.cpp</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 不同图像超分算法效果评估</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/opencv_modules.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/dnn_superres.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/quality.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/imgproc.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/highgui.hpp&gt;</span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace dnn_superres;</span></span>
<span class="line"><span>// 展示图片</span></span>
<span class="line"><span>static void showBenchmark(vector&lt;Mat&gt; images, string title, Size imageSize,</span></span>
<span class="line"><span>	const vector&lt;String&gt; imageTitles,</span></span>
<span class="line"><span>	const vector&lt;double&gt; psnrValues,</span></span>
<span class="line"><span>	const vector&lt;double&gt; ssimValues)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 文字信息</span></span>
<span class="line"><span>	int fontFace = FONT_HERSHEY_COMPLEX_SMALL;</span></span>
<span class="line"><span>	int fontScale = 1;</span></span>
<span class="line"><span>	Scalar fontColor = Scalar(255, 255, 255);</span></span>
<span class="line"><span>	// 图像数量</span></span>
<span class="line"><span>	int len = static_cast&lt;int&gt;(images.size());</span></span>
<span class="line"><span>	int cols = 2, rows = 2;</span></span>
<span class="line"><span>	// 建立背景图像</span></span>
<span class="line"><span>	Mat fullImage = Mat::zeros(Size((cols * 10) + imageSize.width * cols, (rows * 10) + imageSize.height * rows),</span></span>
<span class="line"><span>		images[0].type());</span></span>
<span class="line"><span>	stringstream ss;</span></span>
<span class="line"><span>	int h_ = -1;</span></span>
<span class="line"><span>	// 拼接显示图片</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int fontStart = 15;</span></span>
<span class="line"><span>		int w_ = i % cols;</span></span>
<span class="line"><span>		if (i % cols == 0)</span></span>
<span class="line"><span>			h_++;</span></span>
<span class="line"><span>		Rect ROI((w_ * (10 + imageSize.width)), (h_ * (10 + imageSize.height)), imageSize.width, imageSize.height);</span></span>
<span class="line"><span>		Mat tmp;</span></span>
<span class="line"><span>		resize(images[i], tmp, Size(ROI.width, ROI.height));</span></span>
<span class="line"><span>		ss &lt;&lt; imageTitles[i];</span></span>
<span class="line"><span>		putText(tmp,</span></span>
<span class="line"><span>			ss.str(),</span></span>
<span class="line"><span>			Point(5, fontStart),</span></span>
<span class="line"><span>			fontFace,</span></span>
<span class="line"><span>			fontScale,</span></span>
<span class="line"><span>			fontColor,</span></span>
<span class="line"><span>			1,</span></span>
<span class="line"><span>			16);</span></span>
<span class="line"><span>		ss.str(&quot;&quot;);</span></span>
<span class="line"><span>		fontStart += 20;</span></span>
<span class="line"><span>		ss &lt;&lt; &quot;PSNR: &quot; &lt;&lt; psnrValues[i];</span></span>
<span class="line"><span>		putText(tmp,</span></span>
<span class="line"><span>			ss.str(),</span></span>
<span class="line"><span>			Point(5, fontStart),</span></span>
<span class="line"><span>			fontFace,</span></span>
<span class="line"><span>			fontScale,</span></span>
<span class="line"><span>			fontColor,</span></span>
<span class="line"><span>			1,</span></span>
<span class="line"><span>			16);</span></span>
<span class="line"><span>		ss.str(&quot;&quot;);</span></span>
<span class="line"><span>		fontStart += 20;</span></span>
<span class="line"><span>		ss &lt;&lt; &quot;SSIM: &quot; &lt;&lt; ssimValues[i];</span></span>
<span class="line"><span>		putText(tmp,</span></span>
<span class="line"><span>			ss.str(),</span></span>
<span class="line"><span>			Point(5, fontStart),</span></span>
<span class="line"><span>			fontFace,</span></span>
<span class="line"><span>			fontScale,</span></span>
<span class="line"><span>			fontColor,</span></span>
<span class="line"><span>			1,</span></span>
<span class="line"><span>			16);</span></span>
<span class="line"><span>		ss.str(&quot;&quot;);</span></span>
<span class="line"><span>		fontStart += 20;</span></span>
<span class="line"><span>		tmp.copyTo(fullImage(ROI));</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	namedWindow(title, 1);</span></span>
<span class="line"><span>	imshow(title, fullImage);</span></span>
<span class="line"><span>	imwrite(&quot;save.jpg&quot;, fullImage);</span></span>
<span class="line"><span>	waitKey();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>static Vec2d getQualityValues(Mat orig, Mat upsampled)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	double psnr = PSNR(upsampled, orig);</span></span>
<span class="line"><span>	// 前两个参数为对比图片，第三个参数为输出数组</span></span>
<span class="line"><span>	Scalar q = quality::QualitySSIM::compute(upsampled, orig, noArray());</span></span>
<span class="line"><span>	double ssim = mean(Vec3d((q[0]), q[1], q[2]))[0];</span></span>
<span class="line"><span>	return Vec2d(psnr, ssim);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 图片路径</span></span>
<span class="line"><span>	string img_path = string(&quot;./image/image.png&quot;);</span></span>
<span class="line"><span>	// 算法名称 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>	string algorithm = string(&quot;lapsrn&quot;);</span></span>
<span class="line"><span>	// 模型路径，根据算法确定</span></span>
<span class="line"><span>	string model = string(&quot;./model/LapSRN_x2.pb&quot;);</span></span>
<span class="line"><span>	// 放大系数</span></span>
<span class="line"><span>	int scale = 2;</span></span>
<span class="line"><span>	Mat img = imread(img_path);</span></span>
<span class="line"><span>	if (img.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img_path &lt;&lt; &quot;\\n&quot;;</span></span>
<span class="line"><span>		return -2;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Crop the image so the images will be aligned</span></span>
<span class="line"><span>	// 裁剪图像，使图像对齐</span></span>
<span class="line"><span>	int width = img.cols - (img.cols % scale);</span></span>
<span class="line"><span>	int height = img.rows - (img.rows % scale);</span></span>
<span class="line"><span>	Mat cropped = img(Rect(0, 0, width, height));</span></span>
<span class="line"><span>	// Downscale the image for benchmarking</span></span>
<span class="line"><span>	// 缩小图像，以实现基准质量测试</span></span>
<span class="line"><span>	Mat img_downscaled;</span></span>
<span class="line"><span>	resize(cropped, img_downscaled, Size(), 1.0 / scale, 1.0 / scale);</span></span>
<span class="line"><span>	// Make dnn super resolution instance</span></span>
<span class="line"><span>	// 超分模型初始化</span></span>
<span class="line"><span>	DnnSuperResImpl sr;</span></span>
<span class="line"><span>	vector&lt;Mat&gt; allImages;</span></span>
<span class="line"><span>	// 放大后的图片</span></span>
<span class="line"><span>	Mat img_new;</span></span>
<span class="line"><span>	// Read and set the dnn model</span></span>
<span class="line"><span>	// 读取和设定模型</span></span>
<span class="line"><span>	sr.readModel(model);</span></span>
<span class="line"><span>	sr.setModel(algorithm, scale);</span></span>
<span class="line"><span>	// 放大图像</span></span>
<span class="line"><span>	sr.upsample(img_downscaled, img_new);</span></span>
<span class="line"><span>	vector&lt;double&gt; psnrValues = vector&lt;double&gt;();</span></span>
<span class="line"><span>	vector&lt;double&gt; ssimValues = vector&lt;double&gt;();</span></span>
<span class="line"><span>	// DL MODEL</span></span>
<span class="line"><span>	// 获得模型质量评估值</span></span>
<span class="line"><span>	Vec2f quality = getQualityValues(cropped, img_new);</span></span>
<span class="line"><span>	// 模型质量评价PSNR</span></span>
<span class="line"><span>	psnrValues.push_back(quality[0]);</span></span>
<span class="line"><span>	// 模型质量评价SSIM</span></span>
<span class="line"><span>	ssimValues.push_back(quality[1]);</span></span>
<span class="line"><span>	// 数值越大图像质量越好</span></span>
<span class="line"><span>	cout &lt;&lt; sr.getAlgorithm() &lt;&lt; &quot;:&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	// BICUBIC</span></span>
<span class="line"><span>	// INTER_CUBIC - 三次样条插值放大图像</span></span>
<span class="line"><span>	Mat bicubic;</span></span>
<span class="line"><span>	resize(img_downscaled, bicubic, Size(), scale, scale, INTER_CUBIC);</span></span>
<span class="line"><span>	quality = getQualityValues(cropped, bicubic);</span></span>
<span class="line"><span>	psnrValues.push_back(quality[0]);</span></span>
<span class="line"><span>	ssimValues.push_back(quality[1]);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Bicubic &quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	// NEAREST NEIGHBOR</span></span>
<span class="line"><span>	// INTER_NEAREST - 最近邻插值</span></span>
<span class="line"><span>	Mat nearest;</span></span>
<span class="line"><span>	resize(img_downscaled, nearest, Size(), scale, scale, INTER_NEAREST);</span></span>
<span class="line"><span>	quality = getQualityValues(cropped, nearest);</span></span>
<span class="line"><span>	psnrValues.push_back(quality[0]);</span></span>
<span class="line"><span>	ssimValues.push_back(quality[1]);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Nearest neighbor&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	// LANCZOS</span></span>
<span class="line"><span>	// Lanczos插值放大图像</span></span>
<span class="line"><span>	Mat lanczos;</span></span>
<span class="line"><span>	resize(img_downscaled, lanczos, Size(), scale, scale, INTER_LANCZOS4);</span></span>
<span class="line"><span>	quality = getQualityValues(cropped, lanczos);</span></span>
<span class="line"><span>	psnrValues.push_back(quality[0]);</span></span>
<span class="line"><span>	ssimValues.push_back(quality[1]);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Lanczos&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;-----------------------------------------------&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>	// 要显示的图片</span></span>
<span class="line"><span>	vector&lt;Mat&gt; imgs{ img_new, bicubic, nearest, lanczos };</span></span>
<span class="line"><span>	// 要显示的标题</span></span>
<span class="line"><span>	vector&lt;String&gt; titles{ sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot; };</span></span>
<span class="line"><span>	showBenchmark(imgs, &quot;Quality benchmark&quot;, Size(bicubic.cols, bicubic.rows), titles, psnrValues, ssimValues);</span></span>
<span class="line"><span>	waitKey(0);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_benchmark_quality.py</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Fri Aug 20 22:08:22 2020</span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>不同图像超分算法效果评估</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>from cv2 import dnn_superres</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span># TODO 绘图</span></span>
<span class="line"><span>def showBenchmark(imgs, titles, psnrValues, ssimValues):</span></span>
<span class="line"><span>    # 绘图</span></span>
<span class="line"><span>    for i in range(0, len(imgs)):</span></span>
<span class="line"><span>        # 标题绘图</span></span>
<span class="line"><span>        cv2.putText(imgs[i], titles[i], (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA)</span></span>
<span class="line"><span>        # psnr值</span></span>
<span class="line"><span>        cv2.putText(imgs[i], &quot;PSNR: &quot; + str(psnrValues[i]), (10, 60), cv2.FONT_HERSHEY_PLAIN, 1.5,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA)</span></span>
<span class="line"><span>        # ssim值</span></span>
<span class="line"><span>        cv2.putText(imgs[i], &quot;SSIM: &quot; + str(ssimValues[i]), (10, 90), cv2.FONT_HERSHEY_PLAIN, 1.5,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA)</span></span>
<span class="line"><span>    # 图片拼接展示</span></span>
<span class="line"><span>    img = np.vstack([np.hstack([imgs[0], imgs[1]]), np.hstack([imgs[2], imgs[3]])])</span></span>
<span class="line"><span>    cv2.imshow(&quot;Quality benchmark&quot;, img)</span></span>
<span class="line"><span>    cv2.waitKey(0)</span></span>
<span class="line"><span># TODO 图像质量评估</span></span>
<span class="line"><span>def getQualityValues(upsampled, orig):</span></span>
<span class="line"><span>    psnr = cv2.PSNR(upsampled, orig)</span></span>
<span class="line"><span>    q, _ = cv2.quality.QualitySSIM_compute(upsampled, orig)</span></span>
<span class="line"><span>    ssim = (q[0] + q[1] + q[2]) / 3</span></span>
<span class="line"><span>    return round(psnr, 3), round(ssim, 3)</span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # 图片路径</span></span>
<span class="line"><span>    img_path = &quot;./image/butterfly.png&quot;</span></span>
<span class="line"><span>    # 算法名称 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>    algorithm = &quot;lapsrn&quot;</span></span>
<span class="line"><span>    # 模型路径，根据算法确定</span></span>
<span class="line"><span>    model = &quot;./model/LapSRN_x2.pb&quot;</span></span>
<span class="line"><span>    # 放大系数</span></span>
<span class="line"><span>    scale = 2</span></span>
<span class="line"><span>    psnrValues = []</span></span>
<span class="line"><span>    ssimValues = []</span></span>
<span class="line"><span>    img = cv2.imread(img_path)</span></span>
<span class="line"><span>    if img is None:</span></span>
<span class="line"><span>        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))</span></span>
<span class="line"><span>    # Crop the image so the images will be aligned</span></span>
<span class="line"><span>    # 裁剪图像，使图像对齐</span></span>
<span class="line"><span>    width = img.shape[0] - (img.shape[0] % scale)</span></span>
<span class="line"><span>    height = img.shape[1] - (img.shape[1] % scale)</span></span>
<span class="line"><span>    cropped = img[0:width, 0:height]</span></span>
<span class="line"><span>    # Downscale the image for benchmarking</span></span>
<span class="line"><span>    # 缩小图像，以实现基准质量测试</span></span>
<span class="line"><span>    img_downscaled = cv2.resize(cropped, None, fx=1.0 / scale, fy=1.0 / scale)</span></span>
<span class="line"><span>    # Make dnn super resolution instance</span></span>
<span class="line"><span>    # 超分模型初始化</span></span>
<span class="line"><span>    sr = dnn_superres.DnnSuperResImpl_create()</span></span>
<span class="line"><span>    # Read and set the dnn model</span></span>
<span class="line"><span>    # 读取和设定模型</span></span>
<span class="line"><span>    sr.readModel(model)</span></span>
<span class="line"><span>    sr.setModel(algorithm, scale)</span></span>
<span class="line"><span>    # 放大图像</span></span>
<span class="line"><span>    img_new = sr.upsample(img_downscaled)</span></span>
<span class="line"><span>    # DL MODEL</span></span>
<span class="line"><span>    # 获得模型质量评估值</span></span>
<span class="line"><span>    psnr, ssim = getQualityValues(cropped, img_new)</span></span>
<span class="line"><span>    psnrValues.append(psnr)</span></span>
<span class="line"><span>    ssimValues.append(ssim)</span></span>
<span class="line"><span>    print(sr.getAlgorithm() + &quot;\\n&quot;)</span></span>
<span class="line"><span>    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)</span></span>
<span class="line"><span>    print(&quot;-&quot; * 50)</span></span>
<span class="line"><span>    # INTER_CUBIC - 三次样条插值放大图像</span></span>
<span class="line"><span>    bicubic = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)</span></span>
<span class="line"><span>    psnr, ssim = getQualityValues(cropped, bicubic)</span></span>
<span class="line"><span>    psnrValues.append(psnr)</span></span>
<span class="line"><span>    ssimValues.append(ssim)</span></span>
<span class="line"><span>    print(&quot;Bicubic \\n&quot;)</span></span>
<span class="line"><span>    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)</span></span>
<span class="line"><span>    print(&quot;-&quot; * 50)</span></span>
<span class="line"><span>    # INTER_NEAREST - 最近邻插值</span></span>
<span class="line"><span>    nearest = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)</span></span>
<span class="line"><span>    psnr, ssim = getQualityValues(cropped, nearest)</span></span>
<span class="line"><span>    psnrValues.append(psnr)</span></span>
<span class="line"><span>    ssimValues.append(ssim)</span></span>
<span class="line"><span>    print(&quot;Nearest neighbor \\n&quot;)</span></span>
<span class="line"><span>    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)</span></span>
<span class="line"><span>    print(&quot;-&quot; * 50)</span></span>
<span class="line"><span>    # Lanczos插值放大图像</span></span>
<span class="line"><span>    lanczos = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4);</span></span>
<span class="line"><span>    psnr, ssim = getQualityValues(cropped, lanczos)</span></span>
<span class="line"><span>    psnrValues.append(psnr)</span></span>
<span class="line"><span>    ssimValues.append(ssim)</span></span>
<span class="line"><span>    print(&quot;Lanczos \\n&quot;)</span></span>
<span class="line"><span>    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)</span></span>
<span class="line"><span>    print(&quot;-&quot; * 50)</span></span>
<span class="line"><span>    imgs = [img_new, bicubic, nearest, lanczos]</span></span>
<span class="line"><span>    titles = [sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot;]</span></span>
<span class="line"><span>    showBenchmark(imgs, titles, psnrValues, ssimValues)</span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过lapsrn模型进行超分放大，结果如图所示。可以知道的是lapsrn模型效果实际最好，但是实际中resize函数调用不同选项也会有类似结果，差距没有想象那么大。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_3quality.jpg" alt="" loading="lazy"></p><h3 id="_3-2-不同图像超分算法速度评估" tabindex="-1"><a class="header-anchor" href="#_3-2-不同图像超分算法速度评估"><span>3.2 不同图像超分算法速度评估</span></a></h3><p>本节对比四类算法差分放大所需时间，因为电脑性能原因只放大2倍。具体放大倍数可自行调试。代码如下： <strong>C++/dnn_superres_benchmark_time.cpp</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 不同图像超分算法速度评估</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/dnn_superres.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/imgproc.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/highgui.hpp&gt;</span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace dnn_superres;</span></span>
<span class="line"><span>static void showBenchmark(vector&lt;Mat&gt; images, string title, Size imageSize,</span></span>
<span class="line"><span>	const vector&lt;String&gt; imageTitles,</span></span>
<span class="line"><span>	const vector&lt;double&gt; perfValues)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int fontFace = FONT_HERSHEY_COMPLEX_SMALL;</span></span>
<span class="line"><span>	int fontScale = 1;</span></span>
<span class="line"><span>	Scalar fontColor = Scalar(255, 255, 255);</span></span>
<span class="line"><span>	int len = static_cast&lt;int&gt;(images.size());</span></span>
<span class="line"><span>	int cols = 2, rows = 2;</span></span>
<span class="line"><span>	Mat fullImage = Mat::zeros(Size((cols * 10) + imageSize.width * cols, (rows * 10) + imageSize.height * rows),</span></span>
<span class="line"><span>		images[0].type());</span></span>
<span class="line"><span>	stringstream ss;</span></span>
<span class="line"><span>	int h_ = -1;</span></span>
<span class="line"><span>	for (int i = 0; i &lt; len; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int fontStart = 15;</span></span>
<span class="line"><span>		int w_ = i % cols;</span></span>
<span class="line"><span>		if (i % cols == 0)</span></span>
<span class="line"><span>			h_++;</span></span>
<span class="line"><span>		Rect ROI((w_ * (10 + imageSize.width)), (h_ * (10 + imageSize.height)), imageSize.width, imageSize.height);</span></span>
<span class="line"><span>		Mat tmp;</span></span>
<span class="line"><span>		resize(images[i], tmp, Size(ROI.width, ROI.height));</span></span>
<span class="line"><span>		ss &lt;&lt; imageTitles[i];</span></span>
<span class="line"><span>		putText(tmp,</span></span>
<span class="line"><span>			ss.str(),</span></span>
<span class="line"><span>			Point(5, fontStart),</span></span>
<span class="line"><span>			fontFace,</span></span>
<span class="line"><span>			fontScale,</span></span>
<span class="line"><span>			fontColor,</span></span>
<span class="line"><span>			1,</span></span>
<span class="line"><span>			16);</span></span>
<span class="line"><span>		ss.str(&quot;&quot;);</span></span>
<span class="line"><span>		fontStart += 20;</span></span>
<span class="line"><span>		ss &lt;&lt; perfValues[i];</span></span>
<span class="line"><span>		putText(tmp,</span></span>
<span class="line"><span>			ss.str(),</span></span>
<span class="line"><span>			Point(5, fontStart),</span></span>
<span class="line"><span>			fontFace,</span></span>
<span class="line"><span>			fontScale,</span></span>
<span class="line"><span>			fontColor,</span></span>
<span class="line"><span>			1,</span></span>
<span class="line"><span>			16);</span></span>
<span class="line"><span>		ss.str(&quot;&quot;);</span></span>
<span class="line"><span>		tmp.copyTo(fullImage(ROI));</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	namedWindow(title, 1);</span></span>
<span class="line"><span>	imshow(title, fullImage);</span></span>
<span class="line"><span>	imwrite(&quot;save.jpg&quot;, fullImage);</span></span>
<span class="line"><span>	waitKey();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 图片路径</span></span>
<span class="line"><span>	string img_path = string(&quot;./image/butterfly.png&quot;);</span></span>
<span class="line"><span>	// 算法名称 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>	string algorithm = string(&quot;lapsrn&quot;);</span></span>
<span class="line"><span>	// 模型路径，根据算法确定</span></span>
<span class="line"><span>	string model = string(&quot;./model/LapSRN_x2.pb&quot;);</span></span>
<span class="line"><span>	// 放大系数</span></span>
<span class="line"><span>	int scale = 2;</span></span>
<span class="line"><span>	Mat img = imread(img_path);</span></span>
<span class="line"><span>	if (img.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;</span></span>
<span class="line"><span>		return -2;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Crop the image so the images will be aligned</span></span>
<span class="line"><span>	// 对齐图像</span></span>
<span class="line"><span>	int width = img.cols - (img.cols % scale);</span></span>
<span class="line"><span>	int height = img.rows - (img.rows % scale);</span></span>
<span class="line"><span>	Mat cropped = img(Rect(0, 0, width, height));</span></span>
<span class="line"><span>	// Downscale the image for benchmarking</span></span>
<span class="line"><span>	// 缩小图像，以实现基准测试</span></span>
<span class="line"><span>	Mat img_downscaled;</span></span>
<span class="line"><span>	resize(cropped, img_downscaled, Size(), 1.0 / scale, 1.0 / scale);</span></span>
<span class="line"><span>	// Make dnn super resolution instance</span></span>
<span class="line"><span>	DnnSuperResImpl sr;</span></span>
<span class="line"><span>	Mat img_new;</span></span>
<span class="line"><span>	// Read and set the dnn model</span></span>
<span class="line"><span>	// 读取模型</span></span>
<span class="line"><span>	sr.readModel(model);</span></span>
<span class="line"><span>	sr.setModel(algorithm, scale);</span></span>
<span class="line"><span>	double elapsed = 0.0;</span></span>
<span class="line"><span>	vector&lt;double&gt; perf;</span></span>
<span class="line"><span>	TickMeter tm;</span></span>
<span class="line"><span>	// DL MODEL</span></span>
<span class="line"><span>	// 计算时间</span></span>
<span class="line"><span>	tm.start();</span></span>
<span class="line"><span>	sr.upsample(img_downscaled, img_new);</span></span>
<span class="line"><span>	tm.stop();</span></span>
<span class="line"><span>	// 运行时间s</span></span>
<span class="line"><span>	elapsed = tm.getTimeSec() / tm.getCounter();</span></span>
<span class="line"><span>	perf.push_back(elapsed);</span></span>
<span class="line"><span>	cout &lt;&lt; sr.getAlgorithm() &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;</span></span>
<span class="line"><span>	// BICUBIC</span></span>
<span class="line"><span>	Mat bicubic;</span></span>
<span class="line"><span>	tm.start();</span></span>
<span class="line"><span>	resize(img_downscaled, bicubic, Size(), scale, scale, INTER_CUBIC);</span></span>
<span class="line"><span>	tm.stop();</span></span>
<span class="line"><span>	elapsed = tm.getTimeSec() / tm.getCounter();</span></span>
<span class="line"><span>	perf.push_back(elapsed);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Bicubic&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;</span></span>
<span class="line"><span>	// NEAREST NEIGHBOR</span></span>
<span class="line"><span>	Mat nearest;</span></span>
<span class="line"><span>	tm.start();</span></span>
<span class="line"><span>	resize(img_downscaled, nearest, Size(), scale, scale, INTER_NEAREST);</span></span>
<span class="line"><span>	tm.stop();</span></span>
<span class="line"><span>	elapsed = tm.getTimeSec() / tm.getCounter();</span></span>
<span class="line"><span>	perf.push_back(elapsed);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Nearest&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;</span></span>
<span class="line"><span>	// LANCZOS</span></span>
<span class="line"><span>	Mat lanczos;</span></span>
<span class="line"><span>	tm.start();</span></span>
<span class="line"><span>	resize(img_downscaled, lanczos, Size(), scale, scale, INTER_LANCZOS4);</span></span>
<span class="line"><span>	tm.stop();</span></span>
<span class="line"><span>	elapsed = tm.getTimeSec() / tm.getCounter();</span></span>
<span class="line"><span>	perf.push_back(elapsed);</span></span>
<span class="line"><span>	cout &lt;&lt; &quot;Lanczos&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;</span></span>
<span class="line"><span>	vector &lt;Mat&gt; imgs{ img_new, bicubic, nearest, lanczos };</span></span>
<span class="line"><span>	vector &lt;String&gt; titles{ sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot; };</span></span>
<span class="line"><span>	showBenchmark(imgs, &quot;Time benchmark&quot;, Size(bicubic.cols, bicubic.rows), titles, perf);</span></span>
<span class="line"><span>	waitKey(0);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_benchmark_time.py</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Fri Aug 20 22:38:22 2020</span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>不同图像超分算法速度评估</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>from cv2 import dnn_superres</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span># TODO 绘图</span></span>
<span class="line"><span>def showBenchmark(imgs, titles, perf):</span></span>
<span class="line"><span>    # 绘图</span></span>
<span class="line"><span>    for i in range(0, len(imgs)):</span></span>
<span class="line"><span>        # 标题绘图</span></span>
<span class="line"><span>        cv2.putText(imgs[i], titles[i], (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA)</span></span>
<span class="line"><span>        # psnr值</span></span>
<span class="line"><span>        cv2.putText(imgs[i], str(round(perf[i], 3)), (10, 60), cv2.FONT_HERSHEY_PLAIN, 1.5,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA)</span></span>
<span class="line"><span>    # 图片拼接展示</span></span>
<span class="line"><span>    img = np.vstack([np.hstack([imgs[0], imgs[1]]), np.hstack([imgs[2], imgs[3]])])</span></span>
<span class="line"><span>    cv2.imshow(&quot;Quality benchmark&quot;, img)</span></span>
<span class="line"><span>    cv2.waitKey(0)</span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # 图片路径</span></span>
<span class="line"><span>    img_path = &quot;./image/image.png&quot;</span></span>
<span class="line"><span>    # 算法名称 edsr, espcn, fsrcnn or lapsrn</span></span>
<span class="line"><span>    algorithm = &quot;lapsrn&quot;</span></span>
<span class="line"><span>    # 模型路径，根据算法确定</span></span>
<span class="line"><span>    model = &quot;./model/LapSRN_x2.pb&quot;</span></span>
<span class="line"><span>    # 放大系数</span></span>
<span class="line"><span>    scale = 2</span></span>
<span class="line"><span>    # 时间系数</span></span>
<span class="line"><span>    perf = []</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    img = cv2.imread(img_path)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if img is None:</span></span>
<span class="line"><span>        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Crop the image so the images will be aligned</span></span>
<span class="line"><span>    # 裁剪图像，使图像对齐</span></span>
<span class="line"><span>    width = img.shape[0] - (img.shape[0] % scale)</span></span>
<span class="line"><span>    height = img.shape[1] - (img.shape[1] % scale)</span></span>
<span class="line"><span>    cropped = img[0:width, 0:height]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Downscale the image for benchmarking</span></span>
<span class="line"><span>    # 缩小图像，以实现基准质量测试</span></span>
<span class="line"><span>    img_downscaled = cv2.resize(cropped, None, fx=1.0 / scale, fy=1.0 / scale)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Make dnn super resolution instance</span></span>
<span class="line"><span>    # 超分模型初始化</span></span>
<span class="line"><span>    sr = dnn_superres.DnnSuperResImpl_create()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Read and set the dnn model</span></span>
<span class="line"><span>    # 读取和设定模型</span></span>
<span class="line"><span>    sr.readModel(model)</span></span>
<span class="line"><span>    sr.setModel(algorithm, scale)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    timer = cv2.TickMeter()</span></span>
<span class="line"><span>    timer.start()</span></span>
<span class="line"><span>    # 放大图像</span></span>
<span class="line"><span>    img_new = sr.upsample(img_downscaled)</span></span>
<span class="line"><span>    timer.stop()</span></span>
<span class="line"><span>    # 运行时间s</span></span>
<span class="line"><span>    elapsed = timer.getTimeSec() / timer.getCounter()</span></span>
<span class="line"><span>    perf.append(elapsed)</span></span>
<span class="line"><span>    print(sr.getAlgorithm() + &quot; : &quot; + str(elapsed))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # INTER_CUBIC - 三次样条插值放大图像</span></span>
<span class="line"><span>    timer.start()</span></span>
<span class="line"><span>    bicubic = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)</span></span>
<span class="line"><span>    timer.stop()</span></span>
<span class="line"><span>    # 运行时间s</span></span>
<span class="line"><span>    elapsed = timer.getTimeSec() / timer.getCounter()</span></span>
<span class="line"><span>    perf.append(elapsed)</span></span>
<span class="line"><span>    print(&quot;Bicubic&quot; + &quot; : &quot; + str(elapsed))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # INTER_NEAREST - 最近邻插值</span></span>
<span class="line"><span>    timer.start()</span></span>
<span class="line"><span>    nearest = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)</span></span>
<span class="line"><span>    timer.stop()</span></span>
<span class="line"><span>    # 运行时间s</span></span>
<span class="line"><span>    elapsed = timer.getTimeSec() / timer.getCounter()</span></span>
<span class="line"><span>    perf.append(elapsed)</span></span>
<span class="line"><span>    print(&quot;Nearest&quot; + &quot; : &quot; + str(elapsed))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Lanczos插值放大图像</span></span>
<span class="line"><span>    timer.start()</span></span>
<span class="line"><span>    lanczos = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4);</span></span>
<span class="line"><span>    timer.stop()</span></span>
<span class="line"><span>    # 运行时间s</span></span>
<span class="line"><span>    elapsed = timer.getTimeSec() / timer.getCounter()</span></span>
<span class="line"><span>    perf.append(elapsed)</span></span>
<span class="line"><span>    print(&quot;Lanczos&quot; + &quot; : &quot; + str(elapsed))</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    imgs = [img_new, bicubic, nearest, lanczos]</span></span>
<span class="line"><span>    titles = [sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot;]</span></span>
<span class="line"><span>    showBenchmark(imgs, titles, perf)</span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过lapsrn模型进行超分放大，结果如图所示。图中单位为秒/s。lapsrn是OpenCV提供速度最快和精度最低的DNN超分模块，比resize普通算法效果更好都是耗时更多。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_3time.jpg" alt="" loading="lazy"></p><h3 id="_3-3-官方超分放大基准测试" tabindex="-1"><a class="header-anchor" href="#_3-3-官方超分放大基准测试"><span>3.3 官方超分放大基准测试</span></a></h3><p>OpenCV官方文档给了数据集下的基础测试结果，具体见：<a href="https:_docs.opencv.org_master_dc_d69_tutorial_dnn_superres_benchmark" target="_blank" rel="noopener noreferrer">Super-resolution benchmarking</a> 在Ubuntu 18.04.02 OS的Intel i7-9700K CPU上数据集超分放大算法结果如下所示。 <strong>2倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.008795</strong></td><td>32.7059</td><td>0.9276</td></tr><tr><td>EDSR</td><td>5.923450</td><td><strong>34.1300</strong></td><td><strong>0.9447</strong></td></tr><tr><td>FSRCNN</td><td>0.021741</td><td>32.8886</td><td>0.9301</td></tr><tr><td>LapSRN</td><td>0.114812</td><td>32.2681</td><td>0.9248</td></tr><tr><td>Bicubic</td><td>0.000208</td><td>32.1638</td><td>0.9305</td></tr><tr><td>Nearest neighbor</td><td>0.000114</td><td>29.1665</td><td>0.9049</td></tr><tr><td>Lanczos</td><td>0.001094</td><td>32.4687</td><td>0.9327</td></tr></tbody></table><p><strong>3倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.005495</strong></td><td>28.4229</td><td>0.8474</td></tr><tr><td>EDSR</td><td>2.455510</td><td><strong>29.9828</strong></td><td><strong>0.8801</strong></td></tr><tr><td>FSRCNN</td><td>0.008807</td><td>28.3068</td><td>0.8429</td></tr><tr><td>LapSRN</td><td>0.282575</td><td>26.7330</td><td>0.8862</td></tr><tr><td>Bicubic</td><td>0.000311</td><td>26.0635</td><td>0.8754</td></tr><tr><td>Nearest neighbor</td><td>0.000148</td><td>23.5628</td><td>0.8174</td></tr><tr><td>Lanczos</td><td>0.001012</td><td>25.9115</td><td>0.8706</td></tr></tbody></table><p><strong>4倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.004311</strong></td><td>26.6870</td><td>0.7891</td></tr><tr><td>EDSR</td><td>1.607570</td><td><strong>28.1552</strong></td><td><strong>0.8317</strong></td></tr><tr><td>FSRCNN</td><td>0.005302</td><td>26.6088</td><td>0.7863</td></tr><tr><td>LapSRN</td><td>0.121229</td><td>26.7383</td><td>0.7896</td></tr><tr><td>Bicubic</td><td>0.000311</td><td>26.0635</td><td>0.8754</td></tr><tr><td>Nearest neighbor</td><td>0.000148</td><td>23.5628</td><td>0.8174</td></tr><tr><td>Lanczos</td><td>0.001012</td><td>25.9115</td><td>0.8706</td></tr></tbody></table><p>此外，官方也给出了不同图片在不同算法和不同比例下超分放大的结果，如下所示： <strong>4倍放大一张768x512大小的图像</strong></p><table><thead><tr><th>方法</th><th style="text-align:center;">时间(s)/cpu</th><th style="text-align:right;">SNR</th><th style="text-align:right;">SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td style="text-align:center;">0.01159</td><td style="text-align:right;">26.5471</td><td style="text-align:right;">0.88116</td></tr><tr><td>EDSR</td><td style="text-align:center;">3.26758</td><td style="text-align:right;"><strong>29.2404</strong></td><td style="text-align:right;"><strong>0.92112</strong></td></tr><tr><td>FSRCNN</td><td style="text-align:center;">0.01298</td><td style="text-align:right;">26.5646</td><td style="text-align:right;">0.88064</td></tr><tr><td>LapSRN</td><td style="text-align:center;">0.28257</td><td style="text-align:right;">26.7330</td><td style="text-align:right;">0.88622</td></tr><tr><td>Bicubic</td><td style="text-align:center;">0.00031</td><td style="text-align:right;">26.0635</td><td style="text-align:right;">0.87537</td></tr><tr><td>Nearest neighbor</td><td style="text-align:center;"><strong>0.00014</strong></td><td style="text-align:right;">23.5628</td><td style="text-align:right;">0.81741</td></tr><tr><td>Lanczos</td><td style="text-align:center;">0.00101</td><td style="text-align:right;">25.9115</td><td style="text-align:right;">0.87057</td></tr></tbody></table><p><strong>2倍放大一张256x256大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Set5: butterfly.png</th><th style="text-align:center;">size: 256x256</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_butterfly.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_butterfly.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_butterfly.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_butterfly.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">26.6645 / 0.9048 / 0.000201</td><td style="text-align:center;">23.6854 / 0.8698 / <strong>0.000075</strong></td><td style="text-align:center;"><strong>26.9476</strong> / <strong>0.9075</strong> / 0.001039</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_butterfly.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_butterfly.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_butterfly.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_butterfly.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">29.0341 / 0.9354 / <strong>0.004157</strong></td><td style="text-align:center;">29.0077 / 0.9345 / 0.006325</td><td style="text-align:center;">27.8212 / 0.9230 / 0.037937</td><td style="text-align:center;"><strong>30.0347</strong> / <strong>0.9453</strong> / 2.077280</td></tr></tbody></table><p><strong>3倍放大一张1024x644大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Urban100: img_001.png</th><th style="text-align:center;">size: 1024x644</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_urban.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_urban.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_urban.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_urban.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">27.0474 / <strong>0.8484</strong> / 0.000391</td><td style="text-align:center;">26.0842 / 0.8353 / <strong>0.000236</strong></td><td style="text-align:center;"><strong>27.0704</strong> / 0.8483 / 0.002234</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_urban.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_urban.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;">LapSRN无三倍放大</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_urban.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">28.0118 / 0.8588 / <strong>0.030748</strong></td><td style="text-align:center;">28.0184 / 0.8597 / 0.094173</td><td style="text-align:center;"></td><td style="text-align:center;"><strong>30.5671</strong> / <strong>0.9019</strong> / 9.517580</td></tr></tbody></table><p><strong>4倍放大一张250x361大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Set14: comic.png</th><th style="text-align:center;">size: 250x361</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_comic.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_comic.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_comic.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_comic.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;"><strong>19.6766</strong> / <strong>0.6413</strong> / 0.000262</td><td style="text-align:center;">18.5106 / 0.5879 / <strong>0.000085</strong></td><td style="text-align:center;">19.4948 / 0.6317 / 0.001098</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_comic.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_comic.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_comic.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_comic.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">20.0417 / 0.6302 / <strong>0.001894</strong></td><td style="text-align:center;">20.0885 / 0.6384 / 0.002103</td><td style="text-align:center;">20.0676 / 0.6339 / 0.061640</td><td style="text-align:center;"><strong>20.5233</strong> / <strong>0.6901</strong> / 0.665876</td></tr></tbody></table><p><strong>4倍放大一张1356x2040大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Div2K: 0006.png</th><th style="text-align:center;">size: 1356x2040</th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_div2k.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_div2k.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_div2k.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">26.3139 / <strong>0.8033</strong> / 0.001107</td><td style="text-align:center;">23.8291 / 0.7340 / <strong>0.000611</strong></td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_div2k.jpg" alt="Lanczos interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_div2k.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">Lanczos interpolation</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">26.1565 / 0.7962 / 0.004782</td><td style="text-align:center;"><strong>26.7046</strong> / 0.7987 / 2.274290</td><td style="text-align:center;"></td></tr></tbody></table><h3 id="_3-4-超分算法选择总结" tabindex="-1"><a class="header-anchor" href="#_3-4-超分算法选择总结"><span>3.4 超分算法选择总结</span></a></h3><p>OpenCV中的dnn_superres模块提供的四种图像超分放大深度学习模型，在实践中用的最多的就是EDSR模型。其他三类模型和OpenCV自带的resize函数视觉上差别并不大。但是EDSR模型推理速度太慢，2倍放大和4倍放大可以使用ESPCN代替，4倍和8倍放大可以使用LapSRN。但是总体来说还是使用EDSR为好，毕竟超分放大需要高性能运算，还是用高性能显卡运算较为合适。 此外OpenCV的dnn_superres模块不适用于移动端设备或嵌入式设备，因为OpenCV对设备性能有一定要求。所以移动端可以看看ncnn的超分放大实现。具体见：</p><blockquote><p><a href="https://zhuanlan.zhihu.com/p/109687817" target="_blank" rel="noopener noreferrer">srmd ncnn vulkan 通用图片超分放大工具</a></p></blockquote><p>ncnn用的是srmd超分放大模型，srmd官方代码和ncnn官方实现代码见</p><blockquote><p><a href="https://github.com/cszn/SRMD" target="_blank" rel="noopener noreferrer">SRMD</a><a href="https://github.com/nihui/srmd-ncnn-vulkan" target="_blank" rel="noopener noreferrer">srmd-ncnn-vulkan</a></p></blockquote><p><strong>事实上srmd超分放大性能效果高于OpenCV提供的EDSR模型，但SRMD需要显卡进行运算，ncnn在移动端使用vulkan实现加速运算，在PC端如果有显卡也通过ncnn调用SRMD模型。</strong></p><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><h3 id="_4-1-相关论文" tabindex="-1"><a class="header-anchor" href="#_4-1-相关论文"><span>4.1 相关论文</span></a></h3><blockquote><p><a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Enhanced Deep Residual Networks for Single Image Super-Resolution</a><a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network</a><a href="http:_mmlab.ie.cuhk.edu.hk_projects_fsrcnn" target="_blank" rel="noopener noreferrer">Accelerating the Super-Resolution Convolutional Neural Network</a><a href="https://arxiv.org/pdf/1707.02921.pdf" target="_blank" rel="noopener noreferrer">Deep laplacian pyramid networks for fast and accurate super-resolution</a></p></blockquote><h3 id="_4-2-参考代码" tabindex="-1"><a class="header-anchor" href="#_4-2-参考代码"><span>4.2 参考代码</span></a></h3><blockquote><p><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/dnn_superres" target="_blank" rel="noopener noreferrer">Super Resolution using Convolutional Neural Networks</a><a href="https://github.com/Saafke/EDSR_Tensorflow/tree/master/models" target="_blank" rel="noopener noreferrer">EDSR_Tensorflow</a><a href="https://github.com/fannymonori/TF-ESPCN/tree/master/export" target="_blank" rel="noopener noreferrer">TF-ESPCN</a><a href="https://github.com/Saafke/FSRCNN_Tensorflow" target="_blank" rel="noopener noreferrer">FSRCNN_Tensorflow</a><a href="https://github.com/fannymonori/TF-LAPSRN" target="_blank" rel="noopener noreferrer">TF-LAPSRN</a><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">OpenCV-Practical-Exercise</a><a href="https://github.com/cszn/SRMD" target="_blank" rel="noopener noreferrer">SRMD</a><a href="https://github.com/nihui/srmd-ncnn-vulkan" target="_blank" rel="noopener noreferrer">srmd-ncnn-vulkan</a></p></blockquote><h3 id="_4-3-参考文档" tabindex="-1"><a class="header-anchor" href="#_4-3-参考文档"><span>4.3 参考文档</span></a></h3><blockquote><p><a href="https:_github.com_fengzhenhit_opencv-contrib-module-chinese-tutorials_blob_master_chapter%209_%e8%b6%85%e5%88%86%e8%be%a8%e7%8e%87%e5%9f%ba%e5%87%86%e6%b5%8b%e8%af%95" target="_blank" rel="noopener noreferrer">超分辨率基准测试</a><a href="https:_docs.opencv.org_master_dc_d69_tutorial_dnn_superres_benchmark" target="_blank" rel="noopener noreferrer">Super-resolution benchmarking</a><a href="https:_www.cnblogs.com_carsonzhu_p_10860594" target="_blank" rel="noopener noreferrer">【超分辨率】—图像超分辨率(Super-Resolution)技术研究</a><a href="https:_www.cnblogs.com_carsonzhu_p_11122244" target="_blank" rel="noopener noreferrer">【超分辨率】—基于深度学习的图像超分辨率最新进展与趋势</a><a href="https:_www.cnblogs.com_vincent2012_archive_2012_10_13_2723152" target="_blank" rel="noopener noreferrer">PSNR和SSIM</a><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a><a href="https://zhuanlan.zhihu.com/p/109687817" target="_blank" rel="noopener noreferrer">srmd ncnn vulkan 通用图片超分放大工具</a></p></blockquote>`,95)]))}const c=s(l,[["render",t],["__file","2020-08-24-_OpenCV实战_44 使用OpenCV进行图像超分放大.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-24-_OpenCV%E5%AE%9E%E6%88%98_44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7.html","title":"[OpenCV实战]44 使用OpenCV进行图像超分放大","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-08-24T20:19:35.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]44 使用OpenCV进行图像超分放大 图像超分辨率（Image Super Resolution）是指从低分辨率图像或图像序列得到高分辨率图像。图像超分辨率是计算机视觉领域中一个非常重要的研究问题，广泛应用于医学图像分析、生物识别、视频监控和安全等领域。随着深度学习技术的发展，基于深度学习的图像超分方法在多个测试任务上，相比传统图...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-24-_OpenCV%E5%AE%9E%E6%88%98_44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]44 使用OpenCV进行图像超分放大"}],["meta",{"property":"og:description","content":"[OpenCV实战]44 使用OpenCV进行图像超分放大 图像超分辨率（Image Super Resolution）是指从低分辨率图像或图像序列得到高分辨率图像。图像超分辨率是计算机视觉领域中一个非常重要的研究问题，广泛应用于医学图像分析、生物识别、视频监控和安全等领域。随着深度学习技术的发展，基于深度学习的图像超分方法在多个测试任务上，相比传统图..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1src.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-08-24T20:19:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]44 使用OpenCV进行图像超分放大\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1src.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1bilinear.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1bicubic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1edsr.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1espcn.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1fsrcnn.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1fsrcnn-small.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1lapsrn.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_1src.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_2lapsrn2.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_2lapsrn4.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_2lapsrn8.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_3quality.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_3time.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/orig_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/bicubic_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/nearest_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lanczos_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/espcn_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/fsrcnn_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lapsrn_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/edsr_butterfly.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/orig_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/bicubic_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/nearest_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lanczos_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/espcn_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/fsrcnn_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/edsr_urban.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/orig_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/bicubic_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/nearest_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lanczos_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/espcn_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/fsrcnn_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lapsrn_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/edsr_comic.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/orig_div2k.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/bicubic_div2k.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/nearest_div2k.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lanczos_div2k.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/images/lapsrn_div2k.jpg\\"],\\"datePublished\\":\\"2020-08-24T20:19:35.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 OpenCV dnn_superres模块介绍","slug":"_1-opencv-dnn-superres模块介绍","link":"#_1-opencv-dnn-superres模块介绍","children":[]},{"level":2,"title":"2 OpenCV dnn_superres模块使用","slug":"_2-opencv-dnn-superres模块使用","link":"#_2-opencv-dnn-superres模块使用","children":[{"level":3,"title":"2.1 图像超分放大单输出","slug":"_2-1-图像超分放大单输出","link":"#_2-1-图像超分放大单输出","children":[]},{"level":3,"title":"2.2 图像超分放大多输出","slug":"_2-2-图像超分放大多输出","link":"#_2-2-图像超分放大多输出","children":[]},{"level":3,"title":"2.3 视频超分放大","slug":"_2-3-视频超分放大","link":"#_2-3-视频超分放大","children":[]}]},{"level":2,"title":"3 不同图像超分算法性能比较","slug":"_3-不同图像超分算法性能比较","link":"#_3-不同图像超分算法性能比较","children":[{"level":3,"title":"3.1 不同图像超分算法效果评估","slug":"_3-1-不同图像超分算法效果评估","link":"#_3-1-不同图像超分算法效果评估","children":[]},{"level":3,"title":"3.2 不同图像超分算法速度评估","slug":"_3-2-不同图像超分算法速度评估","link":"#_3-2-不同图像超分算法速度评估","children":[]},{"level":3,"title":"3.3 官方超分放大基准测试","slug":"_3-3-官方超分放大基准测试","link":"#_3-3-官方超分放大基准测试","children":[]},{"level":3,"title":"3.4 超分算法选择总结","slug":"_3-4-超分算法选择总结","link":"#_3-4-超分算法选择总结","children":[]}]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[{"level":3,"title":"4.1 相关论文","slug":"_4-1-相关论文","link":"#_4-1-相关论文","children":[]},{"level":3,"title":"4.2 参考代码","slug":"_4-2-参考代码","link":"#_4-2-参考代码","children":[]},{"level":3,"title":"4.3 参考文档","slug":"_4-3-参考文档","link":"#_4-3-参考文档","children":[]}]}],"git":{},"readingTime":{"minutes":27.7,"words":8309},"filePathRelative":"blog/opencv/opencv实战/2020-08-24-[OpenCV实战]44 使用OpenCV进行图像超分放大.md","localizedDate":"2020年8月25日","excerpt":"\\n<p>图像超分辨率（Image Super Resolution）是指从低分辨率图像或图像序列得到高分辨率图像。图像超分辨率是计算机视觉领域中一个非常重要的研究问题，广泛应用于医学图像分析、生物识别、视频监控和安全等领域。随着深度学习技术的发展，基于深度学习的图像超分方法在多个测试任务上，相比传统图像超分方法，取得了更优的性能和效果。\\n关于基于深度学习的图像超分辨率的综述可以见文章：</p>\\n<blockquote>\\n<p><a href=\\"https:_www.cnblogs.com_carsonzhu_p_10860594\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">【超分辨率】—图像超分辨率(Super-Resolution)技术研究</a></p>\\n</blockquote>","autoDesc":true}');export{c as comp,d as data};
