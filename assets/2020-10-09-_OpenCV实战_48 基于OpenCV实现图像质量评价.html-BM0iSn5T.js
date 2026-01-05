import{_ as s,c as a,a as e,o as i}from"./app-BOswGe5u.js";const l={};function t(p,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="opencv实战-48-基于opencv实现图像质量评价" tabindex="-1"><a class="header-anchor" href="#opencv实战-48-基于opencv实现图像质量评价"><span>[OpenCV实战]48 基于OpenCV实现图像质量评价</span></a></h1><p>本文主要介绍基于OpenCV contrib中的quality模块实现图像质量评价。图像质量评估Image Quality Analysis简称IQA，主要通过数学度量方法来评价图像质量的好坏。</p><p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote><p>本文所有代码见：</p><blockquote><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">OpenCV-Practical-Exercise</a></p></blockquote><h2 id="_1-opencv中图像质量评价算法介绍" tabindex="-1"><a class="header-anchor" href="#_1-opencv中图像质量评价算法介绍"><span>1 OpenCV中图像质量评价算法介绍</span></a></h2><h3 id="_1-1-相关背景" tabindex="-1"><a class="header-anchor" href="#_1-1-相关背景"><span>1.1 相关背景</span></a></h3><p>图像质量评价(IQA)算法以任意图像作为输入，输出质量分数作为输出。有三种类型的IQA：</p><ol><li>全参考图像质量评价，适用情形：一个“干净”参考(非扭曲)图像以衡量扭曲图像的质量。此度量可用于评估图像压缩算法的质量。</li><li>半参考图像质量评价，适用情形：如果没有参考图像，而是具有一些选择性信息的图像(例如，水印图像)来比较和测量失真图像的质量。</li><li>无参考图像质量评价，适用情形：算法得到的唯一输入是要测量其质量的图像。</li></ol><p>在OpenCV contrib的quality模块中一共有提供了5种图像质量评价算法，按上面的类别分仅提供全参考图像质量评价和无参考图像质量评价两种类别的算法，没有半参考图像质量评价算法。官方代码地址见<a href="https://github.com/opencv/opencv_contrib/tree/master/modules/quality" target="_blank" rel="noopener noreferrer">quality</a>，其中包含的5种图像质量评价算法具体如下：</p><ul><li>均方误差 Mean squared error (MSE)</li><li>峰值信噪比 Peak signal-to-noise ratio (PSNR)</li><li>结构相似性 Structural similarity (SSIM)</li><li>梯度幅度相似性偏差 Gradient Magnitude Similarity Deviation (GMSD)</li><li>盲/无参考图像空间质量评估器 Blind/Referenceless Image Spatial Quality Evaluation (BRISQUE)</li></ul><p>这5种图像质量评价算法中，除了BRISQUE是无参考图像质量评价算法外，其他都是全参考图像质量评价。本文不具体介绍这些算法的原理，仅介绍这些算法的应用。想知道具体原理见链接：</p><ul><li><p>MSE/PSNR/SSIM<br><a href="https://blog.csdn.net/baidu_33216040/article/details/97373480" target="_blank" rel="noopener noreferrer">MSE/PSNR/SSIM</a></p></li><li><p>GMSD<br><a href="https://blog.csdn.net/xiaoxifei/article/details/88222485" target="_blank" rel="noopener noreferrer">图像质量评估指标(5) 梯度幅相似性偏差 GMSD</a></p></li><li><p>BRISQUE<br><a href="https://blog.csdn.net/LuohenYJ/article/details/104582701" target="_blank" rel="noopener noreferrer">[OpenCV实战]37 图像质量评价BRISQUE</a></p></li></ul><p>事实上，各种图像质量评估算法都是寻找不同数学公式给出一个评判结果，差异并不那么大，仅知道使用即可。<strong>就全参考图像质量评价算法而言，一般情况下GMSD效果比其他全参考图像质量评价算法效果好</strong>。无参考图形质量评价以BRISQUE为代表。半参考图像质量评价更多用于发论文，实际应用不多。近年来也有深度学习应用于图像质量评估，但是效果还不错，但速度太慢。关于图像质量评估算法具体进一步研究可参考链接：<a href="https://blog.csdn.net/xiaoxifei/category_9282438.html" target="_blank" rel="noopener noreferrer">图像质量评估指标（Image Quality Assessment，IQA)</a></p><h3 id="_1-2-opencv中图像质量评价算法接口介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-opencv中图像质量评价算法接口介绍"><span>1.2 OpenCV中图像质量评价算法接口介绍</span></a></h3><p>OpenCV中图像质量评价算法接口分为静态方法和实例方法，静态方法固定快捷，实例方法灵活性强。其中全参考图像质量评价算法接口类似，只需要更改函数名即可，因为各种参考图像质量算法其实都数学公式应用变换数学公式即可。BRISQUE在<a href="https://blog.csdn.net/LuohenYJ/article/details/104582701" target="_blank" rel="noopener noreferrer">[OpenCV实战]37 图像质量评价BRISQUE</a>中已经提到如何使用，不过用起来相对opencv_contrib库中的quality模块麻烦，唯一好处<a href="https://blog.csdn.net/LuohenYJ/article/details/104582701" target="_blank" rel="noopener noreferrer">[OpenCV实战]37 图像质量评价BRISQUE</a>提到的方法不需要编译opencv_contrib库，但是实际建议使用opencv_contrib库的quality模块来实现图像质量评估算法。</p><h4 id="_1-2-1-opencv-contrib中全参考图像质量评价算法具体接口" tabindex="-1"><a class="header-anchor" href="#_1-2-1-opencv-contrib中全参考图像质量评价算法具体接口"><span>1.2.1 opencv_contrib中全参考图像质量评价算法具体接口</span></a></h4><p><strong>C++/静态方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// output quality map</span></span>
<span class="line"><span>// 质量结果图</span></span>
<span class="line"><span>// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像</span></span>
<span class="line"><span>cv::Mat quality_map;</span></span>
<span class="line"><span>// compute MSE via static method</span></span>
<span class="line"><span>// cv::noArray() if not interested in output quality maps</span></span>
<span class="line"><span>// 静态方法，一步到位</span></span>
<span class="line"><span>// 如果不想获得质量结果图，将quality_map替换为noArray()</span></span>
<span class="line"><span>cv::Scalar result_static = quality::QualityMSE::compute(img1, img2, quality_map);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C++/实例方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// alternatively, compute MSE via instance</span></span>
<span class="line"><span>cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityMSE::create(img1);</span></span>
<span class="line"><span>// compute MSE, compare img1 vs img2</span></span>
<span class="line"><span>cv::Scalar result = ptr-&gt;compute(img2);</span></span>
<span class="line"><span>ptr-&gt;getQualityMap(quality_map);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/静态方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 静态方法，一步到位</span></span>
<span class="line"><span># 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果</span></span>
<span class="line"><span>result_static, quality_map = cv2.quality.QualityMSE_compute(img1, img2)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/实例方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>obj = cv2.quality.QualityMSE_create(img1)</span></span>
<span class="line"><span>result = obj.compute(img2)</span></span>
<span class="line"><span>quality_map = obj.getQualityMap()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-opencv-contrib中无参考图像质量评价算法具体接口" tabindex="-1"><a class="header-anchor" href="#_1-2-2-opencv-contrib中无参考图像质量评价算法具体接口"><span>1.2.2 opencv_contrib中无参考图像质量评价算法具体接口</span></a></h4><p><strong>C++/静态方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// path to the trained model</span></span>
<span class="line"><span>cv::String model_path = &quot;./model/brisque_model_live.yml&quot;;</span></span>
<span class="line"><span>// path to range file</span></span>
<span class="line"><span>cv::String range_path = &quot;./model/brisque_range_live.yml&quot;;</span></span>
<span class="line"><span>// 静态计算方法</span></span>
<span class="line"><span>cv::Scalar result_static = quality::QualityBRISQUE::compute(img, model_path, range_path);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C++/实例方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityBRISQUE::create(model_path, range_path);</span></span>
<span class="line"><span>// computes BRISQUE score for img</span></span>
<span class="line"><span>cv::Scalar result = ptr-&gt;compute(img)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/静态方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># path to the trained model</span></span>
<span class="line"><span>model_path = &quot;./model/brisque_model_live.yml&quot;</span></span>
<span class="line"><span># path to range file</span></span>
<span class="line"><span>range_path = &quot;./model/brisque_range_live.yml&quot;</span></span>
<span class="line"><span># 静态计算方法</span></span>
<span class="line"><span>result_static = cv2.quality.QualityBRISQUE_compute(img, model_path, range_path)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/实例方法</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>obj = cv2.quality.QualityBRISQUE_create(model_path, range_path)</span></span>
<span class="line"><span>result = obj.compute(img)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-opencv-contrib中图像质量评价算法输出参数介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-3-opencv-contrib中图像质量评价算法输出参数介绍"><span>1.2.3 opencv_contrib中图像质量评价算法输出参数介绍</span></a></h4><p>对于静态方法和实例方法输出结果一样的，都是输出在不同颜色通道下的结果，比如对于全参考图像质量评价算法而言RGB图就是分别输出R、G、B三个通道的结果，所以最后需要求均值。对BRISQUE而言不管是彩色图还是灰度图都只输出一个0到100之间的数。各个算法的结果特点如下表所示：</p><table><thead><tr><th style="text-align:center;">算法</th><th style="text-align:center;">输出结果特点</th></tr></thead><tbody><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">结果越小，检测图像和基准图像的差距越小</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">结果越小，检测图像和基准图像的差距越大</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">结果为一个0到100之间的数，越小表示检测图像质量越好</td></tr></tbody></table><h2 id="_2-代码实现与结果分析" tabindex="-1"><a class="header-anchor" href="#_2-代码实现与结果分析"><span>2 代码实现与结果分析</span></a></h2><h3 id="_2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-1-代码实现"><span>2.1 代码实现</span></a></h3><p>本文所提供的代码可以对图像进行质量评价。本文提供C++和Python代码实现，但是MSE的Python实例计算代码可能有问题，可以用Python静态方法代替，所有代码如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/quality.hpp&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 计算结果均值</span></span>
<span class="line"><span>double calMEAN(Scalar result)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int i = 0;</span></span>
<span class="line"><span>	double sum = 0;</span></span>
<span class="line"><span>	// 计算总和</span></span>
<span class="line"><span>	for (auto val : result.val)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if (0 == val || isinf(val))</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		sum += val;</span></span>
<span class="line"><span>		i++;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return sum / i;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 均方误差 MSE</span></span>
<span class="line"><span>double MSE(Mat img1, Mat img2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// output quality map</span></span>
<span class="line"><span>	// 质量结果图</span></span>
<span class="line"><span>	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像</span></span>
<span class="line"><span>	cv::Mat quality_map;</span></span>
<span class="line"><span>	// compute MSE via static method</span></span>
<span class="line"><span>	// cv::noArray() if not interested in output quality maps</span></span>
<span class="line"><span>	// 静态方法，一步到位</span></span>
<span class="line"><span>	// 如果不想获得质量结果图，将quality_map替换为noArray()</span></span>
<span class="line"><span>	cv::Scalar result_static = quality::QualityMSE::compute(img1, img2, quality_map);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	/* 另外一种动态计算的方法</span></span>
<span class="line"><span>	// alternatively, compute MSE via instance</span></span>
<span class="line"><span>	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityMSE::create(img1);</span></span>
<span class="line"><span>	// compute MSE, compare img1 vs img2</span></span>
<span class="line"><span>	cv::Scalar result = ptr-&gt;compute(img2);</span></span>
<span class="line"><span>	ptr-&gt;getQualityMap(quality_map);</span></span>
<span class="line"><span>	*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return calMEAN(result_static);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 峰值信噪比 PSNR</span></span>
<span class="line"><span>double PSNR(Mat img1, Mat img2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 质量结果图</span></span>
<span class="line"><span>	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像</span></span>
<span class="line"><span>	cv::Mat quality_map;</span></span>
<span class="line"><span>	// 静态方法，一步到位</span></span>
<span class="line"><span>	// 如果不想获得质量结果图，将quality_map替换为noArray()</span></span>
<span class="line"><span>	// 第四个参数为PSNR计算公式中的MAX，即图片可能的最大像素值，通常为255</span></span>
<span class="line"><span>	cv::Scalar result_static = quality::QualityPSNR::compute(img1, img2, quality_map, 255.0);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	/* 另外一种动态计算的方法</span></span>
<span class="line"><span>	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityPSNR::create(img1, 255.0);</span></span>
<span class="line"><span>	cv::Scalar result = ptr-&gt;compute(img2);</span></span>
<span class="line"><span>	ptr-&gt;getQualityMap(quality_map);*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return calMEAN(result_static);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 梯度幅度相似性偏差 GMSD</span></span>
<span class="line"><span>double GMSD(Mat img1, Mat img2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 质量结果图</span></span>
<span class="line"><span>	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像</span></span>
<span class="line"><span>	cv::Mat quality_map;</span></span>
<span class="line"><span>	// 静态方法，一步到位</span></span>
<span class="line"><span>	// 如果不想获得质量结果图，将quality_map替换为noArray()</span></span>
<span class="line"><span>	cv::Scalar result_static = quality::QualityGMSD::compute(img1, img2, quality_map);</span></span>
<span class="line"><span>	/* 另外一种动态计算的方法</span></span>
<span class="line"><span>	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityGMSD::create(img1);</span></span>
<span class="line"><span>	cv::Scalar result = ptr-&gt;compute(img2);</span></span>
<span class="line"><span>	ptr-&gt;getQualityMap(quality_map);*/</span></span>
<span class="line"><span>	return calMEAN(result_static);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 结构相似性 SSIM</span></span>
<span class="line"><span>double SSIM(Mat img1, Mat img2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 质量结果图</span></span>
<span class="line"><span>	// 质量结果图quality_map就是检测图像和基准图像各个像素点差值图像</span></span>
<span class="line"><span>	cv::Mat quality_map;</span></span>
<span class="line"><span>	// 静态方法，一步到位</span></span>
<span class="line"><span>	// 如果不想获得质量结果图，将quality_map替换为noArray()</span></span>
<span class="line"><span>	cv::Scalar result_static = quality::QualitySSIM::compute(img1, img2, quality_map);</span></span>
<span class="line"><span>	/* 另外一种动态计算的方法</span></span>
<span class="line"><span>	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualitySSIM::create(img1);</span></span>
<span class="line"><span>	cv::Scalar result = ptr-&gt;compute(img2);</span></span>
<span class="line"><span>	ptr-&gt;getQualityMap(quality_map);*/</span></span>
<span class="line"><span>	return calMEAN(result_static);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 盲/无参考图像空间质量评估器 BRISQUE</span></span>
<span class="line"><span>double BRISQUE(Mat img)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// path to the trained model</span></span>
<span class="line"><span>	cv::String model_path = &quot;./model/brisque_model_live.yml&quot;;</span></span>
<span class="line"><span>	// path to range file</span></span>
<span class="line"><span>	cv::String range_path = &quot;./model/brisque_range_live.yml&quot;;</span></span>
<span class="line"><span>	// 静态计算方法</span></span>
<span class="line"><span>	cv::Scalar result_static = quality::QualityBRISQUE::compute(img, model_path, range_path);</span></span>
<span class="line"><span>	/* 另外一种动态计算的方法</span></span>
<span class="line"><span>	cv::Ptr&lt;quality::QualityBase&gt; ptr = quality::QualityBRISQUE::create(model_path, range_path);</span></span>
<span class="line"><span>	// computes BRISQUE score for img</span></span>
<span class="line"><span>	cv::Scalar result = ptr-&gt;compute(img);*/</span></span>
<span class="line"><span>	return calMEAN(result_static);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void qualityCompute(String methodType, Mat img1, Mat img2)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 算法结果和算法耗时</span></span>
<span class="line"><span>	double result;</span></span>
<span class="line"><span>	TickMeter costTime;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	costTime.start();</span></span>
<span class="line"><span>	if (&quot;MSE&quot; == methodType)</span></span>
<span class="line"><span>		result = MSE(img1, img2);</span></span>
<span class="line"><span>	else if (&quot;PSNR&quot; == methodType)</span></span>
<span class="line"><span>		result = PSNR(img1, img2);</span></span>
<span class="line"><span>	else if (&quot;PSNR&quot; == methodType)</span></span>
<span class="line"><span>		result = PSNR(img1, img2);</span></span>
<span class="line"><span>	else if (&quot;GMSD&quot; == methodType)</span></span>
<span class="line"><span>		result = GMSD(img1, img2);</span></span>
<span class="line"><span>	else if (&quot;SSIM&quot; == methodType)</span></span>
<span class="line"><span>		result = SSIM(img1, img2);</span></span>
<span class="line"><span>	else if (&quot;BRISQUE&quot; == methodType)</span></span>
<span class="line"><span>		result = BRISQUE(img2);</span></span>
<span class="line"><span>	costTime.stop();</span></span>
<span class="line"><span>	cout &lt;&lt; methodType &lt;&lt; &quot;_result is: &quot; &lt;&lt; result &lt;&lt; endl;</span></span>
<span class="line"><span>	cout &lt;&lt; methodType &lt;&lt; &quot;_cost time is: &quot; &lt;&lt; costTime.getTimeSec() / costTime.getCounter() &lt;&lt; &quot; s&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// img1为基准图像，img2为检测图像</span></span>
<span class="line"><span>	cv::Mat img1, img2;</span></span>
<span class="line"><span>	img1 = cv::imread(&quot;image/original-rotated-image.jpg&quot;);</span></span>
<span class="line"><span>	img2 = cv::imread(&quot;image/noise-version.jpg&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	if (img1.empty() || img2.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cout &lt;&lt; &quot;img empty&quot; &lt;&lt; endl;</span></span>
<span class="line"><span>		return 0;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 结果越小，检测图像和基准图像的差距越小</span></span>
<span class="line"><span>	qualityCompute(&quot;MSE&quot;, img1, img2);</span></span>
<span class="line"><span>	// 结果越小，检测图像和基准图像的差距越大</span></span>
<span class="line"><span>	qualityCompute(&quot;PSNR&quot;, img1, img2);</span></span>
<span class="line"><span>	// 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大</span></span>
<span class="line"><span>	qualityCompute(&quot;GMSD&quot;, img1, img2);</span></span>
<span class="line"><span>	// 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小</span></span>
<span class="line"><span>	qualityCompute(&quot;SSIM&quot;, img1, img2);</span></span>
<span class="line"><span>	// BRISQUE不需要基准图像</span></span>
<span class="line"><span>	// 结果为一个0到100之间的数，越小表示检测图像质量越好</span></span>
<span class="line"><span>	qualityCompute(&quot;BRISQUE&quot;, cv::Mat{}, img2);</span></span>
<span class="line"><span>	system(&quot;pause&quot;);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Fri Oct  9 05:27:28 2020</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 时间装饰器，打印运行结果和运行时间</span></span>
<span class="line"><span>def usetime(func):</span></span>
<span class="line"><span>    def inner(*args, **kwargs):</span></span>
<span class="line"><span>        time_start = time.time()</span></span>
<span class="line"><span>        # 装饰的函数在此运行</span></span>
<span class="line"><span>        result = func(*args, **kwargs)</span></span>
<span class="line"><span>        time_run = time.time() - time_start</span></span>
<span class="line"><span>        # 打印结果</span></span>
<span class="line"><span>        print(func.__name__ + &#39;_result is: {:.3f}&#39;.format(result))</span></span>
<span class="line"><span>        # 打印运行时间</span></span>
<span class="line"><span>        print(func.__name__ + &#39;_cost time is: {:.3f} s&#39;.format(time_run))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return inner</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 均方误差 MSE</span></span>
<span class="line"><span>@usetime</span></span>
<span class="line"><span>def MSE(img1, img2):</span></span>
<span class="line"><span>    # 静态方法，一步到位</span></span>
<span class="line"><span>    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果</span></span>
<span class="line"><span>    result_static, quality_map = cv2.quality.QualityMSE_compute(img1, img2)</span></span>
<span class="line"><span>    # 另外一种动态计算的方法，但是MSE的计算可能有问题</span></span>
<span class="line"><span>    # obj = cv2.quality.QualityMSE_create(img1)</span></span>
<span class="line"><span>    # result = obj.compute(img2)</span></span>
<span class="line"><span>    # quality_map = obj.getQualityMap()</span></span>
<span class="line"><span>    # 计算均值</span></span>
<span class="line"><span>    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])</span></span>
<span class="line"><span>    score = 0 if np.isnan(score) else score</span></span>
<span class="line"><span>    return score</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 峰值信噪比 PSNR</span></span>
<span class="line"><span>@usetime</span></span>
<span class="line"><span>def PSNR(img1, img2):</span></span>
<span class="line"><span>    # 静态方法，一步到位</span></span>
<span class="line"><span>    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果</span></span>
<span class="line"><span>    # maxPixelValue参数为PSNR计算公式中的MAX，即图片可能的最大像素值，通常为255</span></span>
<span class="line"><span>    result_static, quality_map = cv2.quality.QualityPSNR_compute(img1, img2, maxPixelValue=255)</span></span>
<span class="line"><span>    # 另外一种动态计算的方法</span></span>
<span class="line"><span>    # obj = cv2.quality.QualityPSNR_create(img1, maxPixelValue=255)</span></span>
<span class="line"><span>    # result = obj.compute(img2)</span></span>
<span class="line"><span>    # quality_map = obj.getQualityMap()</span></span>
<span class="line"><span>    # 计算均值</span></span>
<span class="line"><span>    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])</span></span>
<span class="line"><span>    return score</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 梯度幅度相似性偏差 GMSD</span></span>
<span class="line"><span>@usetime</span></span>
<span class="line"><span>def GMSD(img1, img2):</span></span>
<span class="line"><span>    # 静态方法，一步到位</span></span>
<span class="line"><span>    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果</span></span>
<span class="line"><span>    result_static, quality_map = cv2.quality.QualityGMSD_compute(img1, img2)</span></span>
<span class="line"><span>    # 另外一种动态计算的方法</span></span>
<span class="line"><span>    # obj = cv2.quality.QualityGMSD_create(img1)</span></span>
<span class="line"><span>    # result = obj.compute(img2)</span></span>
<span class="line"><span>    # quality_map = obj.getQualityMap()</span></span>
<span class="line"><span>    # 计算均值</span></span>
<span class="line"><span>    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])</span></span>
<span class="line"><span>    score = 0 if np.isnan(score) else score</span></span>
<span class="line"><span>    return score</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 结构相似性 SSIM</span></span>
<span class="line"><span>@usetime</span></span>
<span class="line"><span>def SSIM(img1, img2):</span></span>
<span class="line"><span>    # 静态方法，一步到位</span></span>
<span class="line"><span>    # 质量结果图quality_map就是检测图像和基准图像各个像素点差值结果</span></span>
<span class="line"><span>    result_static, quality_map = cv2.quality.QualitySSIM_compute(img1, img2)</span></span>
<span class="line"><span>    # 另外一种动态计算的方法</span></span>
<span class="line"><span>    # obj = cv2.quality.QualitySSIM_create(img1)</span></span>
<span class="line"><span>    # result = obj.compute(img2)</span></span>
<span class="line"><span>    # quality_map = obj.getQualityMap()</span></span>
<span class="line"><span>    # 计算均值</span></span>
<span class="line"><span>    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])</span></span>
<span class="line"><span>    score = 0 if np.isnan(score) else score</span></span>
<span class="line"><span>    return score</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ----- 盲/无参考图像空间质量评估器 BRISQUE</span></span>
<span class="line"><span>@usetime</span></span>
<span class="line"><span>def BRISQUE(img):</span></span>
<span class="line"><span>    # path to the trained model</span></span>
<span class="line"><span>    model_path = &quot;./model/brisque_model_live.yml&quot;</span></span>
<span class="line"><span>    # path to range file</span></span>
<span class="line"><span>    range_path = &quot;./model/brisque_range_live.yml&quot;</span></span>
<span class="line"><span>    # 静态计算方法</span></span>
<span class="line"><span>    result_static = cv2.quality.QualityBRISQUE_compute(img, model_path, range_path)</span></span>
<span class="line"><span>    # # 另外一种动态计算的方法</span></span>
<span class="line"><span>    # obj = cv2.quality.QualityBRISQUE_create(model_path, range_path)</span></span>
<span class="line"><span>    # result = obj.compute(img)</span></span>
<span class="line"><span>    # 计算均值</span></span>
<span class="line"><span>    score = np.mean([i for i in result_static if (i != 0 and not np.isinf(i))])</span></span>
<span class="line"><span>    score = 0 if np.isnan(score) else score</span></span>
<span class="line"><span>    return score</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # img1为基准图像，img2为检测图像</span></span>
<span class="line"><span>    img1 = cv2.imread(&quot;image/cut-original-rotated-image.jpg&quot;)</span></span>
<span class="line"><span>    img2 = cv2.imread(&quot;image/cut-noise-version.jpg&quot;)</span></span>
<span class="line"><span>    if img1 is None or img2 is None:</span></span>
<span class="line"><span>        print(&quot;img empty&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    # 结果越小，检测图像和基准图像的差距越小</span></span>
<span class="line"><span>    MSE(img1, img2)</span></span>
<span class="line"><span>    # 结果越小，检测图像和基准图像的差距越大</span></span>
<span class="line"><span>    PSNR(img1, img2)</span></span>
<span class="line"><span>    # 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越大</span></span>
<span class="line"><span>    GMSD(img1, img2)</span></span>
<span class="line"><span>    # 结果为一个0到1之间的数，越大表示检测图像和基准图像的差距越小</span></span>
<span class="line"><span>    SSIM(img1, img2)</span></span>
<span class="line"><span>    # 结果为一个0到100之间的数，越小表示检测图像质量越好</span></span>
<span class="line"><span>    BRISQUE(img2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-结果分析" tabindex="-1"><a class="header-anchor" href="#_2-2-结果分析"><span>2.2 结果分析</span></a></h3><p>上面的代码实现了对不同图片的图像质量诊断，并输出各种方法在不同图像下的评分和方法检测速度。速度计算主要基于C++代码。 具体检测结果如下表所示，其中-nan(ind)表示结果出错，通常是两张图像一样。原图下的结果是原图和原图比，模糊图片和噪声图片是与原图为基准图片比较的结果。按清晰度而言，原图&gt;模糊图片&gt;噪声图片。 下面分别显示分辨率为612x816和中心裁剪分辨率305x305的结果。</p><table><thead><tr><th style="text-align:center;">结果</th><th style="text-align:center;">原图/分辨率612x816</th><th style="text-align:center;">模糊图片/分辨率612x816</th><th style="text-align:center;">噪声图片/分辨率612x816</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">1490.28</td><td style="text-align:center;">1734.03</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">16.3989</td><td style="text-align:center;">15.7454</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">0.209512</td><td style="text-align:center;">0.199491</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">1</td><td style="text-align:center;">0.30256</td><td style="text-align:center;">0.482258</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">53.3901</td><td style="text-align:center;">63.4859</td><td style="text-align:center;">71.2059</td></tr></tbody></table><table><thead><tr><th style="text-align:center;">结果</th><th style="text-align:center;">原图/分辨率305x305</th><th style="text-align:center;">模糊图片/分辨率305x305</th><th style="text-align:center;">噪声图片/分辨率305x305</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">1303.96</td><td style="text-align:center;">984.486</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">16.9784</td><td style="text-align:center;">18.2243</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">-nan(ind)</td><td style="text-align:center;">0.111176</td><td style="text-align:center;">0.113035</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">1</td><td style="text-align:center;">0.30256</td><td style="text-align:center;">0.687856</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">56.1736</td><td style="text-align:center;">42.0616</td><td style="text-align:center;">73.3258</td></tr></tbody></table><p>各个方法具体检测速度如下表所示：</p><table><thead><tr><th style="text-align:center;">速度/s</th><th style="text-align:center;">原图/分辨率612x816</th><th style="text-align:center;">模糊图片/分辨率612x816</th><th style="text-align:center;">噪声图片/分辨率612x816</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/originImage/noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">0.029</td><td style="text-align:center;">0.021</td><td style="text-align:center;">0.020</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">0.017</td><td style="text-align:center;">0.019</td><td style="text-align:center;">0.019</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">0.032</td><td style="text-align:center;">0.031</td><td style="text-align:center;">0.032</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">0.084</td><td style="text-align:center;">0.086</td><td style="text-align:center;">0.084</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">0.068</td><td style="text-align:center;">0.073</td><td style="text-align:center;">0.071</td></tr></tbody></table><table><thead><tr><th style="text-align:center;">速度/s</th><th style="text-align:center;">原图/分辨率305x305</th><th style="text-align:center;">模糊图片/分辨率305x305</th><th style="text-align:center;">噪声图片/分辨率305x305</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>方法</strong></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-original-rotated-image.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-blur-vision.jpg" alt="" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]48 基于OpenCV实现图像质量评价/cutImage/cut-noise-version.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">MSE</td><td style="text-align:center;">0.006</td><td style="text-align:center;">0.005</td><td style="text-align:center;">0.005</td></tr><tr><td style="text-align:center;">PSNR</td><td style="text-align:center;">0.004</td><td style="text-align:center;">0.005</td><td style="text-align:center;">0.004</td></tr><tr><td style="text-align:center;">GMSD</td><td style="text-align:center;">0.012</td><td style="text-align:center;">0.011</td><td style="text-align:center;">0.012</td></tr><tr><td style="text-align:center;">SSIM</td><td style="text-align:center;">0.025</td><td style="text-align:center;">0.031</td><td style="text-align:center;">0.033</td></tr><tr><td style="text-align:center;">BRISQUE</td><td style="text-align:center;">0.027</td><td style="text-align:center;">0.028</td><td style="text-align:center;">0.028</td></tr></tbody></table><p>从上面的结果可以得到如下分析：</p><ol><li>对于612x816分辨率图片，结果正确的有MSE，GMSD，BRISQUE；对于305x305分辨率图片，如果从局部上来看，噪声图片和模糊图片清晰图差不太多，结果正确的有PSNR，GMSD。然而对于BRISQUE模糊图片的清晰度评分比原图高。所以通常情况下，有参考图片，GMSD准确率最高，其他方法并不靠谱，BRISQUE需要更加完整的大图才有好的效果。</li><li>就速度而言，图像分辨率越高，各个方法耗时也越多，毕竟都是靠图像像素点差值公式计算的，不过都能在1s以内获得结果。</li><li>如果有有参图像，最好用GMSD。BRISQUE更适合高分辨率图片，如果要低分辨率使用，建议自己重新训练模型，毕竟BRISQUE的模型太老了。关于BRISQUE模型训练见：<a href="https://github.com/opencv/opencv_contrib/tree/master/modules/quality/samples" target="_blank" rel="noopener noreferrer">quality/samples</a></li></ol><p>总而言之，现在图像质量评价算法都只能针对某种特定环境使用，在实际最好针对每一种图像噪声情况设定一种判定算法，现在各个视频检测平台也都是这样做的。如果普通使用看看GMSD和BRISQUE即可。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><h3 id="_3-1-参考代码" tabindex="-1"><a class="header-anchor" href="#_3-1-参考代码"><span>3.1 参考代码</span></a></h3><ul><li><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/quality" target="_blank" rel="noopener noreferrer">quality</a></li></ul><h3 id="_3-2-参考文章" tabindex="-1"><a class="header-anchor" href="#_3-2-参考文章"><span>3.2 参考文章</span></a></h3><ul><li><a href="https://blog.csdn.net/baidu_33216040/article/details/97373480" target="_blank" rel="noopener noreferrer">MSE/PSNR/SSIM</a></li><li><a href="https://blog.csdn.net/xiaoxifei/article/details/88222485" target="_blank" rel="noopener noreferrer">图像质量评估指标(5) 梯度幅相似性偏差 GMSD</a></li><li><a href="https://blog.csdn.net/LuohenYJ/article/details/104582701" target="_blank" rel="noopener noreferrer">[OpenCV实战]37 图像质量评价BRISQUE</a></li><li><a href="https://blog.csdn.net/xiaoxifei/category_9282438.html" target="_blank" rel="noopener noreferrer">图像质量评估指标（Image Quality Assessment，IQA)</a></li></ul>`,60)]))}const c=s(l,[["render",t],["__file","2020-10-09-_OpenCV实战_48 基于OpenCV实现图像质量评价.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-10-09-_OpenCV%E5%AE%9E%E6%88%98_48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7.html","title":"[OpenCV实战]48 基于OpenCV实现图像质量评价","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-10-09T19:07:13.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]48 基于OpenCV实现图像质量评价 本文主要介绍基于OpenCV contrib中的quality模块实现图像质量评价。图像质量评估Image Quality Analysis简称IQA，主要通过数学度量方法来评价图像质量的好坏。 本文需要OpenCV contrib库，OpenCV contrib库的编译安装见： OpenCV...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-10-09-_OpenCV%E5%AE%9E%E6%88%98_48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]48 基于OpenCV实现图像质量评价"}],["meta",{"property":"og:description","content":"[OpenCV实战]48 基于OpenCV实现图像质量评价 本文主要介绍基于OpenCV contrib中的quality模块实现图像质量评价。图像质量评估Image Quality Analysis简称IQA，主要通过数学度量方法来评价图像质量的好坏。 本文需要OpenCV contrib库，OpenCV contrib库的编译安装见： OpenCV..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/original-rotated-image.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-10-09T19:07:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]48 基于OpenCV实现图像质量评价\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/original-rotated-image.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/blur-vision.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/noise-version.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-original-rotated-image.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-blur-vision.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-noise-version.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/original-rotated-image.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/blur-vision.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/blob/main/blog/[OpenCV%E5%AE%9E%E6%88%98]48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/originImage/noise-version.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-original-rotated-image.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-blur-vision.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D48%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E8%B4%A8%E9%87%8F%E8%AF%84%E4%BB%B7/cutImage/cut-noise-version.jpg\\"],\\"datePublished\\":\\"2020-10-09T19:07:13.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 OpenCV中图像质量评价算法介绍","slug":"_1-opencv中图像质量评价算法介绍","link":"#_1-opencv中图像质量评价算法介绍","children":[{"level":3,"title":"1.1 相关背景","slug":"_1-1-相关背景","link":"#_1-1-相关背景","children":[]},{"level":3,"title":"1.2 OpenCV中图像质量评价算法接口介绍","slug":"_1-2-opencv中图像质量评价算法接口介绍","link":"#_1-2-opencv中图像质量评价算法接口介绍","children":[]}]},{"level":2,"title":"2 代码实现与结果分析","slug":"_2-代码实现与结果分析","link":"#_2-代码实现与结果分析","children":[{"level":3,"title":"2.1 代码实现","slug":"_2-1-代码实现","link":"#_2-1-代码实现","children":[]},{"level":3,"title":"2.2 结果分析","slug":"_2-2-结果分析","link":"#_2-2-结果分析","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[{"level":3,"title":"3.1 参考代码","slug":"_3-1-参考代码","link":"#_3-1-参考代码","children":[]},{"level":3,"title":"3.2 参考文章","slug":"_3-2-参考文章","link":"#_3-2-参考文章","children":[]}]}],"git":{},"readingTime":{"minutes":15.75,"words":4724},"filePathRelative":"blog/opencv/opencv实战/2020-10-09-[OpenCV实战]48 基于OpenCV实现图像质量评价.md","localizedDate":"2020年10月10日","excerpt":"\\n<p>本文主要介绍基于OpenCV contrib中的quality模块实现图像质量评价。图像质量评估Image Quality Analysis简称IQA，主要通过数学度量方法来评价图像质量的好坏。</p>\\n<p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p>\\n<blockquote>\\n<p><a href=\\"https://blog.csdn.net/LuohenYJ/article/details/107944236\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">OpenCV_contrib库在windows下编译使用指南</a></p>\\n</blockquote>","autoDesc":true}');export{c as comp,d as data};
