import{_ as s,c as a,a as e,o as i}from"./app-BNuIUq7T.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="opencv实战-47-基于opencv实现视觉显著性检测" tabindex="-1"><a class="header-anchor" href="#opencv实战-47-基于opencv实现视觉显著性检测"><span>[OpenCV实战]47 基于OpenCV实现视觉显著性检测</span></a></h1><p>人类具有一种视觉注意机制，即当面对一个场景时，会选择性地忽略不感兴趣的区域，聚焦于感兴趣的区域。这些感兴趣的区域称为显著性区域。视觉显著性检测（Visual Saliency Detection，VSD）则是一种模拟人类视觉并从图像中提取显著性区域的智能算法。如下面左边的图所示，人眼在观看该图片时会首先注意其中的小狗，自动忽略背景区域，小狗所在区域就是显著性区域。通过计算机视觉算法对左边的图像进行视觉显著性检测能够得到下图右边的结果，其中黑色区域为不显著区域，白色为显著区域，显著性检测在机器人领域、目标检测领域和图像识别领域有大量应用。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/image/dog.jpg" alt="" loading="lazy"></p><p>本文主要介绍基于OpenCV contrib库中的saliency模块实现视觉显著性检测算法，OpenCV contrib库中的saliency模块官方仓库见<a href="https://github.com/opencv/opencv_contrib/tree/master/modules/saliency" target="_blank" rel="noopener noreferrer">saliency</a>。关于视觉显著性检测算法更多详细介绍见：<a href="https://blog.csdn.net/u010736662/article/details/88930849" target="_blank" rel="noopener noreferrer">图像显著性检测论文及代码汇总</a></p><p>本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：</p><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote><p>本文所有代码见：</p><blockquote><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">OpenCV-Practical-Exercise</a></p></blockquote><hr><h2 id="_1-opencv显著性算法背景介绍" tabindex="-1"><a class="header-anchor" href="#_1-opencv显著性算法背景介绍"><span>1 OpenCV显著性算法背景介绍</span></a></h2><h3 id="_1-1-opencv显著性检测算法相关信息介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-opencv显著性检测算法相关信息介绍"><span>1.1 OpenCV显著性检测算法相关信息介绍</span></a></h3><p>OpenCV contrib库中的saliency模块提供四种显著性检测算法。本节主要介绍这四种方法的相关信息。</p><h4 id="_1-1-1-staticsaliencyspectralresidual" tabindex="-1"><a class="header-anchor" href="#_1-1-1-staticsaliencyspectralresidual"><span>1.1.1 StaticSaliencySpectralResidual</span></a></h4><ul><li>原理：该方法从自然图像统计原理出发，模拟注意前视觉搜索的行为。该算法对每幅图像的对数谱进行分析，得到谱残差SR (Spectral Residual)。然后将谱残差进行空间变换，得到显著性图，该显著性图显示了感兴趣目标的位置。</li><li>论文：<a href="http://bcmi.sjtu.edu.cn/~zhangliqing/Papers/2007CVPR_Houxiaodi_04270292.pdf" target="_blank" rel="noopener noreferrer">Saliency Detection: A Spectral Residual Approach</a></li><li>提出时间：2007</li><li>检测方式：单张图片检测</li></ul><p>调用接口如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = StaticSaliencySpectralResidual::create();</span></span>
<span class="line"><span>// 计算显著性</span></span>
<span class="line"><span>bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = cv2.saliency.StaticSaliencySpectralResidual_create()</span></span>
<span class="line"><span># 计算显著性</span></span>
<span class="line"><span>success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-2-staticsaliencyfinegrained" tabindex="-1"><a class="header-anchor" href="#_1-1-2-staticsaliencyfinegrained"><span>1.1.2 StaticSaliencyFineGrained</span></a></h4><ul><li>原理：该方法基于空间尺度差异center-surround differences计算显著性。利用积分图像integral images.实时生成高分辨率显著性图。</li><li>论文：<a href="https://www.sciencedirect.com/science/article/abs/pii/S0262885609001371" target="_blank" rel="noopener noreferrer">Human detection using a mobile platform and novel features derived from a visual saliency mechanism</a></li><li>提出时间：2010</li><li>检测方式：单张图片检测</li></ul><p>调用接口如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = StaticSaliencyFineGrained::create();</span></span>
<span class="line"><span>// 计算显著性</span></span>
<span class="line"><span>bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = cv2.saliency.StaticSaliencyFineGrained_create()</span></span>
<span class="line"><span># 计算显著性</span></span>
<span class="line"><span>success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-3-objectnessbing" tabindex="-1"><a class="header-anchor" href="#_1-1-3-objectnessbing"><span>1.1.3 ObjectnessBING</span></a></h4><ul><li>原理：基于二值化梯度特征(BING features)进行物体检测</li><li>论文：<a href="https://mmcheng.net/bing/" target="_blank" rel="noopener noreferrer">BING: Binarized Normed Gradients for Objectness Estimation at 300fps</a></li><li>提出时间：2014</li><li>检测方式：加载模型，单张图片检测</li></ul><p>调用接口如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = ObjectnessBING::create();</span></span>
<span class="line"><span>vector&lt;Vec4i&gt; saliencyMap;</span></span>
<span class="line"><span>// 提取模型文件参数</span></span>
<span class="line"><span>saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setTrainingPath(training_path);</span></span>
<span class="line"><span>// 将算法检测结果保存在Results文件夹内</span></span>
<span class="line"><span>saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setBBResDir(&quot;Results&quot;);</span></span>
<span class="line"><span>// 计算显著性</span></span>
<span class="line"><span>bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = cv2.saliency.ObjectnessBING_create()</span></span>
<span class="line"><span># 提取模型文件参数</span></span>
<span class="line"><span>saliencyAlgorithm.setTrainingPath(training_path)</span></span>
<span class="line"><span># 将算法检测结果保存在Results文件夹内</span></span>
<span class="line"><span>saliencyAlgorithm.setBBResDir(&quot;Results&quot;)</span></span>
<span class="line"><span># 计算显著性</span></span>
<span class="line"><span>success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-4-binwangapr2014" tabindex="-1"><a class="header-anchor" href="#_1-1-4-binwangapr2014"><span>1.1.4 BinWangApr2014</span></a></h4><ul><li>原理：基于运动背景减除法实现显著性区域检测</li><li>论文：<a href="https://ieeexplore.ieee.org/document/6910012/" target="_blank" rel="noopener noreferrer">A Fast Self-Tuning Background Subtraction Algorithm</a></li><li>提出时间：2014</li><li>检测方式：基于多张图片初始化模型，然后进行单张图片检测</li></ul><p>调用接口如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = MotionSaliencyBinWangApr2014::create();</span></span>
<span class="line"><span>// 设置数据结构大小</span></span>
<span class="line"><span>saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;setImagesize(image.cols, image.rows);</span></span>
<span class="line"><span>// 初始化</span></span>
<span class="line"><span>saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;init();</span></span>
<span class="line"><span>saliencyAlgorithm-&gt;computeSaliency(frame, saliencyMap);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>saliencyAlgorithm = cv2.saliency.MotionSaliencyBinWangApr2014_create()</span></span>
<span class="line"><span># 设置数据结构大小</span></span>
<span class="line"><span>saliencyAlgorithm.setImagesize(image.shape[1], image.shape[0])</span></span>
<span class="line"><span># 初始化</span></span>
<span class="line"><span>saliencyAlgorithm.init()</span></span>
<span class="line"><span>success, saliencyMap = saliencyAlgorithm.computeSaliency(frame)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-opencv-saliency模块整体说明" tabindex="-1"><a class="header-anchor" href="#_1-2-opencv-saliency模块整体说明"><span>1.2 OpenCV saliency模块整体说明</span></a></h3><p>显著性检测算法与目标检测算法大大不同。显著性检测算法，只是判断图中有显著目标的区域，这些区域可能包含目标也可能不包含目标，因方法而异。类比人眼的观察方式，显著性检测算法是许多计算机视觉任务的第一步，检测出显著性区域后，对这些显著性区域进行进一步判断和预测。显著性检测算法通常检测速度较快，某些计算量大的算法如深度学习图像分类算法，可以只在显著性区域上运行，以缩小检测范围，加快检测速度，提高检测精度。</p><p>OpenCV saliency模块提供了四种不同的显著性检测方法，但是按方法类别只有三种。OpenCV saliency模块的类关系如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/image/ClassRelation.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>OpenCV saliency模块提供的三种不同方法类别模块介绍如下：</p><ul><li>Motion saliency模块：这类算法输入为连续的图像帧，通过运动检测算法对连续图像帧进行处理，然后对运动目标进行跟踪，最终将运动目标设置为显著区域。代表为BinWangApr2014算法。该类算法容易出现丢帧和鬼影情况，运动检测效果不如主流的运动检测算法，实际图像显著性检测效果一般。</li><li>Objectness模块：这类算法输入为单帧图像，通过计算得到大量的建议区域，并将这些建议区域作为显著性区域。代表为ObjectnessBING算法。该类算法检测速度较慢，实际检测出来的建议区域可能上万个，需要进行筛选，总体效果一般。</li><li>Static saliency模块：这类算法输入为单帧图像，通过图像特征和统计量来定位图像中的显著性区域。代表为StaticSaliencySpectralResidual和StaticSaliencyFineGrained。该类算法检测速度非常快，不过效果总体一般。</li></ul><p>更多关于OpenCV saliency模块的介绍可以见：<a href="https://zhuanlan.zhihu.com/p/115002897" target="_blank" rel="noopener noreferrer">OpenCV中的显著性检测（Saliency Detection）</a>和<a href="https://blog.csdn.net/wsp_1138886114/article/details/103211054" target="_blank" rel="noopener noreferrer">OpenCV—python 显着性检测二</a></p><h2 id="_2-代码实现与结果分析" tabindex="-1"><a class="header-anchor" href="#_2-代码实现与结果分析"><span>2 代码实现与结果分析</span></a></h2><h3 id="_2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-1-代码实现"><span>2.1 代码实现</span></a></h3><p>本文所提供的代码可以对视频或者图像进行显著性检测，BinWangApr2014只能对视频进行显著性检测。本文提供C++和Python代码实现，代码如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/saliency.hpp&gt;</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using namespace std;</span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace saliency;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 显著性检测算法</span></span>
<span class="line"><span>	// 可选：SPECTRAL_RESIDUAL，FINE_GRAINED，BING，BinWangApr2014</span></span>
<span class="line"><span>	String saliency_algorithm = &quot;FINE_GRAINED&quot;;</span></span>
<span class="line"><span>	// 检测视频或者图像</span></span>
<span class="line"><span>	String video_name = &quot;video/vtest.avi&quot;;</span></span>
<span class="line"><span>	// String video_name = &quot;video/dog.jpg&quot;;</span></span>
<span class="line"><span>	// 起始帧</span></span>
<span class="line"><span>	int start_frame = 0;</span></span>
<span class="line"><span>	// 模型路径</span></span>
<span class="line"><span>	String training_path = &quot;ObjectnessTrainedModel&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 如果算法名和视频名为空，停止检测</span></span>
<span class="line"><span>	if (saliency_algorithm.empty() || video_name.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		cout &lt;&lt; &quot;Please set saliency_algorithm and video_name&quot;;</span></span>
<span class="line"><span>		return -1;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// open the capture</span></span>
<span class="line"><span>	VideoCapture cap;</span></span>
<span class="line"><span>	// 打开视频</span></span>
<span class="line"><span>	cap.open(video_name);</span></span>
<span class="line"><span>	// 设置视频起始帧</span></span>
<span class="line"><span>	cap.set(CAP_PROP_POS_FRAMES, start_frame);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 输入图像</span></span>
<span class="line"><span>	Mat frame;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// instantiates the specific Saliency</span></span>
<span class="line"><span>	// 实例化saliencyAlgorithm结构</span></span>
<span class="line"><span>	Ptr&lt;Saliency&gt; saliencyAlgorithm;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 二值化检测结果</span></span>
<span class="line"><span>	Mat binaryMap;</span></span>
<span class="line"><span>	// 检测图像</span></span>
<span class="line"><span>	Mat image;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 读图</span></span>
<span class="line"><span>	cap &gt;&gt; frame;</span></span>
<span class="line"><span>	if (frame.empty())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		return 0;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	frame.copyTo(image);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 根据输入的方法确定检测类型</span></span>
<span class="line"><span>	// StaticSaliencySpectralResidual</span></span>
<span class="line"><span>	if (saliency_algorithm.find(&quot;SPECTRAL_RESIDUAL&quot;) == 0)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 检测结果，白色区域表示显著区域</span></span>
<span class="line"><span>		Mat saliencyMap;</span></span>
<span class="line"><span>		saliencyAlgorithm = StaticSaliencySpectralResidual::create();</span></span>
<span class="line"><span>		// 计算显著性</span></span>
<span class="line"><span>		double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>		bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span>
<span class="line"><span>		double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>		cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		if (success)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			StaticSaliencySpectralResidual spec;</span></span>
<span class="line"><span>			// 二值化图像</span></span>
<span class="line"><span>			double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>			spec.computeBinaryMap(saliencyMap, binaryMap);</span></span>
<span class="line"><span>			double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>			cout &lt;&lt; &quot;computeBinaryMap cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			imshow(&quot;Original Image&quot;, image);</span></span>
<span class="line"><span>			imshow(&quot;Saliency Map&quot;, saliencyMap);</span></span>
<span class="line"><span>			imshow(&quot;Binary Map&quot;, binaryMap);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			// 转换格式才能保存图片</span></span>
<span class="line"><span>			saliencyMap.convertTo(saliencyMap, CV_8UC3, 256);</span></span>
<span class="line"><span>			imwrite(&quot;Results/SPECTRAL_RESIDUAL_saliencyMap.jpg&quot;, saliencyMap);</span></span>
<span class="line"><span>			imwrite(&quot;Results/SPECTRAL_RESIDUAL_binaryMap.jpg&quot;, binaryMap);</span></span>
<span class="line"><span>			waitKey(0);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// StaticSaliencyFineGrained</span></span>
<span class="line"><span>	else if (saliency_algorithm.find(&quot;FINE_GRAINED&quot;) == 0)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		Mat saliencyMap;</span></span>
<span class="line"><span>		saliencyAlgorithm = StaticSaliencyFineGrained::create();</span></span>
<span class="line"><span>		// 计算显著性</span></span>
<span class="line"><span>		double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>		bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span>
<span class="line"><span>		double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>		cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		if (success)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			StaticSaliencyFineGrained spec;</span></span>
<span class="line"><span>			// 二值化图像</span></span>
<span class="line"><span>			// 二值化图像</span></span>
<span class="line"><span>			double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>			spec.computeBinaryMap(saliencyMap, binaryMap);</span></span>
<span class="line"><span>			double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>			cout &lt;&lt; &quot;computeBinaryMap cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			imshow(&quot;Saliency Map&quot;, saliencyMap);</span></span>
<span class="line"><span>			imshow(&quot;Original Image&quot;, image);</span></span>
<span class="line"><span>			imshow(&quot;Binary Map&quot;, binaryMap);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			// 转换格式才能保存图片</span></span>
<span class="line"><span>			saliencyMap.convertTo(saliencyMap, CV_8UC3, 256);</span></span>
<span class="line"><span>			imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap);</span></span>
<span class="line"><span>			imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap);</span></span>
<span class="line"><span>			waitKey(0);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// ObjectnessBING</span></span>
<span class="line"><span>	else if (saliency_algorithm.find(&quot;BING&quot;) == 0)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 判断模型是否存在</span></span>
<span class="line"><span>		if (training_path.empty())</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			cout &lt;&lt; &quot;Path of trained files missing! &quot; &lt;&lt; endl;</span></span>
<span class="line"><span>			return -1;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			saliencyAlgorithm = ObjectnessBING::create();</span></span>
<span class="line"><span>			vector&lt;Vec4i&gt; saliencyMap;</span></span>
<span class="line"><span>			// 提取模型文件参数</span></span>
<span class="line"><span>			saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setTrainingPath(training_path);</span></span>
<span class="line"><span>			// 将算法检测结果保存在Results文件夹内</span></span>
<span class="line"><span>			saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setBBResDir(&quot;Results&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			// 计算显著性</span></span>
<span class="line"><span>			double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>			bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);</span></span>
<span class="line"><span>			double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>			cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			if (success)</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				// saliencyMap获取检测到的目标个数</span></span>
<span class="line"><span>				int ndet = int(saliencyMap.size());</span></span>
<span class="line"><span>				std::cout &lt;&lt; &quot;Objectness done &quot; &lt;&lt; ndet &lt;&lt; std::endl;</span></span>
<span class="line"><span>				// The result are sorted by objectness. We only use the first maxd boxes here.</span></span>
<span class="line"><span>				// 目标按可能性从大到小排列，maxd为显示前5个目标，step设置颜色，jitter设置矩形框微调</span></span>
<span class="line"><span>				int maxd = 5, step = 255 / maxd, jitter = 9;</span></span>
<span class="line"><span>				Mat draw = image.clone();</span></span>
<span class="line"><span>				for (int i = 0; i &lt; std::min(maxd, ndet); i++)</span></span>
<span class="line"><span>				{</span></span>
<span class="line"><span>					// 获得矩形框坐标点</span></span>
<span class="line"><span>					Vec4i bb = saliencyMap[i];</span></span>
<span class="line"><span>					// 设定颜色</span></span>
<span class="line"><span>					Scalar col = Scalar(((i*step) % 255), 50, 255 - ((i*step) % 255));</span></span>
<span class="line"><span>					// 矩形框微调</span></span>
<span class="line"><span>					Point off(theRNG().uniform(-jitter, jitter), theRNG().uniform(-jitter, jitter));</span></span>
<span class="line"><span>					// 画矩形</span></span>
<span class="line"><span>					rectangle(draw, Point(bb[0] + off.x, bb[1] + off.y), Point(bb[2] + off.x, bb[3] + off.y), col, 2);</span></span>
<span class="line"><span>					// mini temperature scale</span></span>
<span class="line"><span>					// 颜色标注</span></span>
<span class="line"><span>					rectangle(draw, Rect(20, 20 + i * 10, 10, 10), col, -1);</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span>				imshow(&quot;BING&quot;, draw);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>				// 保存图片</span></span>
<span class="line"><span>				imwrite(&quot;Results/BING_draw.jpg&quot;, draw);</span></span>
<span class="line"><span>				waitKey();</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>			else</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				std::cout &lt;&lt; &quot;No saliency found for &quot; &lt;&lt; video_name &lt;&lt; std::endl;</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// BinWangApr2014</span></span>
<span class="line"><span>	else if (saliency_algorithm.find(&quot;BinWangApr2014&quot;) == 0)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		saliencyAlgorithm = MotionSaliencyBinWangApr2014::create();</span></span>
<span class="line"><span>		// 设置数据结构大小</span></span>
<span class="line"><span>		saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;setImagesize(image.cols, image.rows);</span></span>
<span class="line"><span>		// 初始化</span></span>
<span class="line"><span>		saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;init();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		bool paused = false;</span></span>
<span class="line"><span>		for (;; )</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			if (!paused)</span></span>
<span class="line"><span>			{</span></span>
<span class="line"><span>				cap &gt;&gt; frame;</span></span>
<span class="line"><span>				if (frame.empty())</span></span>
<span class="line"><span>				{</span></span>
<span class="line"><span>					return 0;</span></span>
<span class="line"><span>				}</span></span>
<span class="line"><span>				cvtColor(frame, frame, COLOR_BGR2GRAY);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>				Mat saliencyMap;</span></span>
<span class="line"><span>				// 计算</span></span>
<span class="line"><span>				double start = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span>				saliencyAlgorithm-&gt;computeSaliency(frame, saliencyMap);</span></span>
<span class="line"><span>				double duration = ((double)getTickCount() - start) / getTickFrequency();</span></span>
<span class="line"><span>				cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>				imshow(&quot;image&quot;, frame);</span></span>
<span class="line"><span>				// 显示</span></span>
<span class="line"><span>				imshow(&quot;saliencyMap&quot;, saliencyMap * 255);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			char c = (char)waitKey(2);</span></span>
<span class="line"><span>			if (c == &#39;q&#39;)</span></span>
<span class="line"><span>				break;</span></span>
<span class="line"><span>			if (c == &#39;p&#39;)</span></span>
<span class="line"><span>				paused = !paused;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	destroyAllWindows();</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Mon Sep 15 19:22:58 2020</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import random</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # 显著性检测算法</span></span>
<span class="line"><span>    # 可选：SPECTRAL_RESIDUAL，FINE_GRAINED，BING，BinWangApr2014</span></span>
<span class="line"><span>    saliency_algorithm = &quot;FINE_GRAINED&quot;</span></span>
<span class="line"><span>    # 检测视频或者图像</span></span>
<span class="line"><span>    video_name = &quot;video/vtest.avi&quot;</span></span>
<span class="line"><span>    # video_name = &quot;video/dog.jpg&quot;;</span></span>
<span class="line"><span>    # 起始帧</span></span>
<span class="line"><span>    start_frame = 0</span></span>
<span class="line"><span>    # 模型路径</span></span>
<span class="line"><span>    training_path = &quot;ObjectnessTrainedModel&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 如果算法名和视频名为空，停止检测</span></span>
<span class="line"><span>    if saliency_algorithm is None or video_name is None:</span></span>
<span class="line"><span>        print(&quot;Please set saliency_algorithm and video_name&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # open the capture</span></span>
<span class="line"><span>    cap = cv2.VideoCapture(video_name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 设置视频起始帧</span></span>
<span class="line"><span>    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 读图</span></span>
<span class="line"><span>    _, frame = cap.read()</span></span>
<span class="line"><span>    if frame is None:</span></span>
<span class="line"><span>        print(&quot;Please set saliency_algorithm and video_name&quot;)</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    image = frame.copy()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 根据输入的方法确定检测类型</span></span>
<span class="line"><span>    if saliency_algorithm.find(&quot;SPECTRAL_RESIDUAL&quot;) == 0:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 检测结果，白色区域表示显著区域</span></span>
<span class="line"><span>        saliencyAlgorithm = cv2.saliency.StaticSaliencySpectralResidual_create()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 计算显著性</span></span>
<span class="line"><span>        start = cv2.getTickCount()</span></span>
<span class="line"><span>        success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span>
<span class="line"><span>        duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()</span></span>
<span class="line"><span>        print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if success:</span></span>
<span class="line"><span>            # 二值化图像</span></span>
<span class="line"><span>            start = cv2.getTickCount()</span></span>
<span class="line"><span>            _, binaryMap = saliencyAlgorithm.computeBinaryMap(saliencyMap)</span></span>
<span class="line"><span>            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()</span></span>
<span class="line"><span>            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            cv2.imshow(&quot;Saliency Map&quot;, saliencyMap)</span></span>
<span class="line"><span>            cv2.imshow(&quot;Original Image&quot;, image)</span></span>
<span class="line"><span>            cv2.imshow(&quot;Binary Map&quot;, binaryMap)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 转换格式才能保存图片</span></span>
<span class="line"><span>            saliencyMap = (saliencyMap * 255)</span></span>
<span class="line"><span>            cv2.imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap)</span></span>
<span class="line"><span>            cv2.imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap)</span></span>
<span class="line"><span>            cv2.waitKey(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # FINE_GRAINED</span></span>
<span class="line"><span>    elif saliency_algorithm.find(&quot;FINE_GRAINED&quot;) == 0:</span></span>
<span class="line"><span>        saliencyAlgorithm = cv2.saliency.StaticSaliencyFineGrained_create()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 计算显著性</span></span>
<span class="line"><span>        start = cv2.getTickCount()</span></span>
<span class="line"><span>        success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span>
<span class="line"><span>        duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()</span></span>
<span class="line"><span>        print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span>        if success:</span></span>
<span class="line"><span>            # 二值化图像</span></span>
<span class="line"><span>            start = cv2.getTickCount()</span></span>
<span class="line"><span>            _, binaryMap = saliencyAlgorithm.computeBinaryMap(saliencyMap)</span></span>
<span class="line"><span>            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()</span></span>
<span class="line"><span>            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            cv2.imshow(&quot;Saliency Map&quot;, saliencyMap)</span></span>
<span class="line"><span>            cv2.imshow(&quot;Original Image&quot;, image)</span></span>
<span class="line"><span>            cv2.imshow(&quot;Binary Map&quot;, binaryMap)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 转换格式才能保存图片</span></span>
<span class="line"><span>            saliencyMap = (saliencyMap * 255)</span></span>
<span class="line"><span>            cv2.imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap)</span></span>
<span class="line"><span>            cv2.imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap)</span></span>
<span class="line"><span>            cv2.waitKey(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    elif saliency_algorithm.find(&quot;BING&quot;) == 0:</span></span>
<span class="line"><span>        # 判断模型是否存在</span></span>
<span class="line"><span>        if training_path is None:</span></span>
<span class="line"><span>            print(&quot;Path of trained files missing! &quot;)</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            saliencyAlgorithm = cv2.saliency.ObjectnessBING_create()</span></span>
<span class="line"><span>            # 提取模型文件参数</span></span>
<span class="line"><span>            saliencyAlgorithm.setTrainingPath(training_path)</span></span>
<span class="line"><span>            # 将算法检测结果保存在Results文件夹内</span></span>
<span class="line"><span>            saliencyAlgorithm.setBBResDir(&quot;Results&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 计算显著性</span></span>
<span class="line"><span>            start = cv2.getTickCount()</span></span>
<span class="line"><span>            success, saliencyMap = saliencyAlgorithm.computeSaliency(image)</span></span>
<span class="line"><span>            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()</span></span>
<span class="line"><span>            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span>            if success:</span></span>
<span class="line"><span>                # saliencyMap获取检测到的目标个数</span></span>
<span class="line"><span>                ndet = saliencyMap.shape[0]</span></span>
<span class="line"><span>                print(&quot;Objectness done &quot;, ndet)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                # The result are sorted by objectness. We only use the first maxd boxes here.</span></span>
<span class="line"><span>                # 目标按可能性从大到小排列，maxd为显示前5个目标，step设置颜色，jitter设置矩形框微调</span></span>
<span class="line"><span>                maxd = 5</span></span>
<span class="line"><span>                step = 255 / maxd</span></span>
<span class="line"><span>                jitter = 9</span></span>
<span class="line"><span>                draw = image.copy()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                for i in range(0, min(maxd, ndet)):</span></span>
<span class="line"><span>                    # 获得矩形框坐标点</span></span>
<span class="line"><span>                    bb = saliencyMap[i][0]</span></span>
<span class="line"><span>                    # 设定颜色</span></span>
<span class="line"><span>                    col = ((i * step) % 255), 50, 255 - ((i * step) % 255)</span></span>
<span class="line"><span>                    # 矩形框微调</span></span>
<span class="line"><span>                    off = random.randint(-jitter,</span></span>
<span class="line"><span>                                         jitter), random.randint(-jitter, jitter)</span></span>
<span class="line"><span>                    # 画矩形</span></span>
<span class="line"><span>                    cv2.rectangle(draw, (bb[0] + off[0], bb[1] + off[1]),</span></span>
<span class="line"><span>                                  (bb[2] + off[0], bb[3] + off[1]), col, 2)</span></span>
<span class="line"><span>                    # mini temperature scale</span></span>
<span class="line"><span>                    # 颜色标注</span></span>
<span class="line"><span>                    cv2.rectangle(draw, (20, 20 + i * 10, 10, 10), col, -1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                # 保存图片</span></span>
<span class="line"><span>                cv2.imwrite(&quot;Results/BING_draw.jpg&quot;, draw)</span></span>
<span class="line"><span>                cv2.imshow(&quot;BING&quot;, draw)</span></span>
<span class="line"><span>                cv2.waitKey(0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 需要传入图像建模</span></span>
<span class="line"><span>    elif saliency_algorithm.find(&quot;BinWangApr2014&quot;) == 0:</span></span>
<span class="line"><span>        saliencyAlgorithm = cv2.saliency.MotionSaliencyBinWangApr2014_create()</span></span>
<span class="line"><span>        # 设置数据结构大小</span></span>
<span class="line"><span>        saliencyAlgorithm.setImagesize(image.shape[1], image.shape[0])</span></span>
<span class="line"><span>        # 初始化</span></span>
<span class="line"><span>        saliencyAlgorithm.init()</span></span>
<span class="line"><span>        paused = False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        while True:</span></span>
<span class="line"><span>            if not paused:</span></span>
<span class="line"><span>                _, frame = cap.read()</span></span>
<span class="line"><span>                if frame is None:</span></span>
<span class="line"><span>                    break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)</span></span>
<span class="line"><span>                # 计算显著性</span></span>
<span class="line"><span>                start = cv2.getTickCount()</span></span>
<span class="line"><span>                success, saliencyMap = saliencyAlgorithm.computeSaliency(frame)</span></span>
<span class="line"><span>                duration = (cv2.getTickCount() - start) / \\</span></span>
<span class="line"><span>                    cv2.getTickFrequency()</span></span>
<span class="line"><span>                print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))</span></span>
<span class="line"><span>                cv2.imshow(&quot;image&quot;, frame)</span></span>
<span class="line"><span>                # 显示</span></span>
<span class="line"><span>                cv2.imshow(&quot;saliencyMap&quot;, saliencyMap * 255)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            c = cv2.waitKey(2)</span></span>
<span class="line"><span>            c = chr(c) if c != -1 else 0</span></span>
<span class="line"><span>            if c == &#39;q&#39;:</span></span>
<span class="line"><span>                break</span></span>
<span class="line"><span>            if c == &#39;p&#39;:</span></span>
<span class="line"><span>                paused = not paused</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.destroyAllWindows()</span></span>
<span class="line"><span>    return</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-结果分析" tabindex="-1"><a class="header-anchor" href="#_2-2-结果分析"><span>2.2 结果分析</span></a></h3><h4 id="_2-2-1-图片检测结果" tabindex="-1"><a class="header-anchor" href="#_2-2-1-图片检测结果"><span>2.2.1 图片检测结果</span></a></h4><p>对单张图片检测进行显著性区域检测后的结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片(487X365)</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/dog.jpg" alt="" loading="lazy"></td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/SPECTRAL_RESIDUAL_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">2.8</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/FINE_GRAINED_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">53.7</td></tr><tr><td style="text-align:center;">ObjectnessBING</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/BING_draw.jpg" alt="" loading="lazy"></td><td style="text-align:center;">411.7</td></tr></tbody></table><p>此外为了提高可视化结果，对StaticSaliencySpectralResidual和StaticSaliencyFineGrained的显著性检测结果图片进行了二值化，主要通过StaticSaliency::computeBinaryMap实现，即先聚类然后阈值分割。结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/SPECTRAL_RESIDUAL_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">48.4</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/FINE_GRAINED_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">52.4</td></tr></tbody></table><h4 id="_2-2-2-视频检测结果" tabindex="-1"><a class="header-anchor" href="#_2-2-2-视频检测结果"><span>2.2.2 视频检测结果</span></a></h4><p>对视频进行检测，StaticSaliencySpectralResidual，StaticSaliencyFineGrained，ObjectnessBING就是对每帧进行检测；MotionSaliencyBinWangApr2014就是对每帧图片进行运动建模和显著性检测。取视频第100帧显著性检测结果，结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片(768X576)</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/origin.jpg" alt="" loading="lazy"></td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/SPECTRAL_RESIDUAL_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">3.2</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/FINE_GRAINED_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">119.2</td></tr><tr><td style="text-align:center;">ObjectnessBING</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/BING_draw.jpg" alt="" loading="lazy"></td><td style="text-align:center;">986.5</td></tr><tr><td style="text-align:center;">MotionSaliencyBinWangApr2014</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/BinWangApr2014_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">65.1</td></tr></tbody></table><p>二值化结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/SPECTRAL_RESIDUAL_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">120.125</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/FINE_GRAINED_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">138.783</td></tr></tbody></table><h4 id="_2-2-3-效果评价" tabindex="-1"><a class="header-anchor" href="#_2-2-3-效果评价"><span>2.2.3 效果评价</span></a></h4><p>可以很认真的说，OpenCV contrib库中的saliency模块所提供的视觉显著性检测算法效果都很差，这个效果很差主要是现实落地上的意义，可以进行大规模测试。具体来说OpenCV提供的视觉显著性检测算法都只能应用于简单场景，复杂场景很容易出错，而且精度不如直接用目标识别来的快。当然现有的视觉显著性检测算法效果都很差，都无法实用，具体介绍可见：<a href="http://www.jsjkx.com/CN/10.11896/jsjkx.190900006" target="_blank" rel="noopener noreferrer">视觉图像显著性检测综述</a></p><p>如果非要对OpenCV contrib库中的saliency模块所提供的视觉显著性检测算法进行评价，个人感觉如下：</p><ol><li>按速度而言StaticSaliencySpectralResidual效果最好，但是效果很差。ObjectnessBING速度上最慢，但是实际画框太多，靠运气成分决定效果。</li><li>StaticSaliencyFineGrained效果和速度都还不错，但是StaticSaliencyFineGrained获得的结果是一个高维图像，需要进行二值化转换。模块自带的computeBinaryMap函数进行二值化效果很不错，但是耗时，如果想要快速获得结果，直接阈值化即可。</li><li>MotionSaliencyBinWangApr2014加入了运动检测，效果和速度都很不错，但是建模时间过长，而且很容易出现鬼影，所以实际使用可以建模一段时间再使用，当运动检测算法也不错。</li><li>几乎所有的显著性检测算法随着图像分辨率变大，检测时间变的越长，所以将图片预处理缩小到一定分辨率以提高检测速度是很有必要的。</li><li>如果是复杂场景，最好不要用显著性检测算法，效果极差。</li></ol><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><h3 id="_3-1-参考代码" tabindex="-1"><a class="header-anchor" href="#_3-1-参考代码"><span>3.1 参考代码</span></a></h3><ul><li><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/saliency" target="_blank" rel="noopener noreferrer">saliency</a></li></ul><h3 id="_3-2-参考论文" tabindex="-1"><a class="header-anchor" href="#_3-2-参考论文"><span>3.2 参考论文</span></a></h3><ul><li><a href="http://bcmi.sjtu.edu.cn/~zhangliqing/Papers/2007CVPR_Houxiaodi_04270292.pdf" target="_blank" rel="noopener noreferrer">Saliency Detection: A Spectral Residual Approach</a></li><li><a href="https://www.sciencedirect.com/science/article/abs/pii/S0262885609001371" target="_blank" rel="noopener noreferrer">Human detection using a mobile platform and novel features derived from a visual saliency mechanism</a></li><li><a href="https://mmcheng.net/bing/" target="_blank" rel="noopener noreferrer">BING: Binarized Normed Gradients for Objectness Estimation at 300fps</a></li><li><a href="https://ieeexplore.ieee.org/document/6910012/" target="_blank" rel="noopener noreferrer">A Fast Self-Tuning Background Subtraction Algorithm</a></li><li><a href="http://www.jsjkx.com/CN/10.11896/jsjkx.190900006" target="_blank" rel="noopener noreferrer">视觉图像显著性检测综述</a></li></ul><h3 id="_3-2-参考文档" tabindex="-1"><a class="header-anchor" href="#_3-2-参考文档"><span>3.2 参考文档</span></a></h3><ul><li><a href="https://blog.csdn.net/u010736662/article/details/88930849" target="_blank" rel="noopener noreferrer">图像显著性检测论文及代码汇总</a></li><li><a href="https://zhuanlan.zhihu.com/p/115002897" target="_blank" rel="noopener noreferrer">OpenCV中的显著性检测（Saliency Detection）</a></li><li><a href="https://blog.csdn.net/wsp_1138886114/article/details/103211054" target="_blank" rel="noopener noreferrer">OpenCV—python 显着性检测二</a></li></ul>`,75)]))}const r=s(l,[["render",p],["__file","2020-09-15-_OpenCV实战_47 基于OpenCV实现视觉显著性检测.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-09-15-_OpenCV%E5%AE%9E%E6%88%98_47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B.html","title":"[OpenCV实战]47 基于OpenCV实现视觉显著性检测","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-09-15T19:54:28.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]47 基于OpenCV实现视觉显著性检测 人类具有一种视觉注意机制，即当面对一个场景时，会选择性地忽略不感兴趣的区域，聚焦于感兴趣的区域。这些感兴趣的区域称为显著性区域。视觉显著性检测（Visual Saliency Detection，VSD）则是一种模拟人类视觉并从图像中提取显著性区域的智能算法。如下面左边的图所示，人眼在观看该...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-09-15-_OpenCV%E5%AE%9E%E6%88%98_47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]47 基于OpenCV实现视觉显著性检测"}],["meta",{"property":"og:description","content":"[OpenCV实战]47 基于OpenCV实现视觉显著性检测 人类具有一种视觉注意机制，即当面对一个场景时，会选择性地忽略不感兴趣的区域，聚焦于感兴趣的区域。这些感兴趣的区域称为显著性区域。视觉显著性检测（Visual Saliency Detection，VSD）则是一种模拟人类视觉并从图像中提取显著性区域的智能算法。如下面左边的图所示，人眼在观看该..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/image/dog.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-09-15T19:54:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]47 基于OpenCV实现视觉显著性检测\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/image/dog.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/image/ClassRelation.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/dog.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/SPECTRAL_RESIDUAL_saliencyMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/FINE_GRAINED_saliencyMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/BING_draw.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/SPECTRAL_RESIDUAL_binaryMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/dog/FINE_GRAINED_binaryMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/video/origin.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/video/SPECTRAL_RESIDUAL_saliencyMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result//video/FINE_GRAINED_saliencyMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result//video/BING_draw.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result//video/BinWangApr2014_saliencyMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/video/SPECTRAL_RESIDUAL_binaryMap.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D47%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E8%A7%86%E8%A7%89%E6%98%BE%E8%91%97%E6%80%A7%E6%A3%80%E6%B5%8B/result/video/FINE_GRAINED_binaryMap.jpg\\"],\\"datePublished\\":\\"2020-09-15T19:54:28.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 OpenCV显著性算法背景介绍","slug":"_1-opencv显著性算法背景介绍","link":"#_1-opencv显著性算法背景介绍","children":[{"level":3,"title":"1.1 OpenCV显著性检测算法相关信息介绍","slug":"_1-1-opencv显著性检测算法相关信息介绍","link":"#_1-1-opencv显著性检测算法相关信息介绍","children":[]},{"level":3,"title":"1.2 OpenCV saliency模块整体说明","slug":"_1-2-opencv-saliency模块整体说明","link":"#_1-2-opencv-saliency模块整体说明","children":[]}]},{"level":2,"title":"2 代码实现与结果分析","slug":"_2-代码实现与结果分析","link":"#_2-代码实现与结果分析","children":[{"level":3,"title":"2.1 代码实现","slug":"_2-1-代码实现","link":"#_2-1-代码实现","children":[]},{"level":3,"title":"2.2 结果分析","slug":"_2-2-结果分析","link":"#_2-2-结果分析","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[{"level":3,"title":"3.1 参考代码","slug":"_3-1-参考代码","link":"#_3-1-参考代码","children":[]},{"level":3,"title":"3.2 参考论文","slug":"_3-2-参考论文","link":"#_3-2-参考论文","children":[]},{"level":3,"title":"3.2 参考文档","slug":"_3-2-参考文档","link":"#_3-2-参考文档","children":[]}]}],"git":{},"readingTime":{"minutes":15.39,"words":4617},"filePathRelative":"blog/opencv/opencv实战/2020-09-15-[OpenCV实战]47 基于OpenCV实现视觉显著性检测.md","localizedDate":"2020年9月16日","excerpt":"\\n<p>人类具有一种视觉注意机制，即当面对一个场景时，会选择性地忽略不感兴趣的区域，聚焦于感兴趣的区域。这些感兴趣的区域称为显著性区域。视觉显著性检测（Visual Saliency Detection，VSD）则是一种模拟人类视觉并从图像中提取显著性区域的智能算法。如下面左边的图所示，人眼在观看该图片时会首先注意其中的小狗，自动忽略背景区域，小狗所在区域就是显著性区域。通过计算机视觉算法对左边的图像进行视觉显著性检测能够得到下图右边的结果，其中黑色区域为不显著区域，白色为显著区域，显著性检测在机器人领域、目标检测领域和图像识别领域有大量应用。\\n<img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/image/dog.jpg\\" alt=\\"\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{r as comp,d as data};
