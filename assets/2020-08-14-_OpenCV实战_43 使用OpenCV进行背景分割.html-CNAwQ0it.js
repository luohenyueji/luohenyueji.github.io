import{_ as s,c as a,a as e,o as i}from"./app-B1QbUTkN.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="opencv实战-43-使用opencv进行背景分割" tabindex="-1"><a class="header-anchor" href="#opencv实战-43-使用opencv进行背景分割"><span>[OpenCV实战]43 使用OpenCV进行背景分割</span></a></h1><p>运动背景分割法Background Segment主要是指通过不同方法拟合模型建立背景图像，将当前帧与背景图像进行相减比较获得运动区域。下图所示为检测图像： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resframe.jpg?ref_type=heads" alt="" loading="lazy"></p><p>通过前面的检测帧建立背景模型，获得背景图像。然后检测图像与背景图像相减即为运动图像，黑色区域为背景，白色区域为运动目标，如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resmog.jpg?ref_type=heads" alt="" loading="lazy"></p><p>在OpenCV标注库中有两种背景分割器：KNN，MOG2。但是实际上OpenCV_contrib库的bgsegm模块中还有其他几种背景分割器。本文主要介绍OpenCV_contrib中的运动背景分割模型及其用法，并对不同检测模型的性能和效果进行对比。</p><p>@[toc]</p><h2 id="_1-方法介绍" tabindex="-1"><a class="header-anchor" href="#_1-方法介绍"><span>1 方法介绍</span></a></h2><p>OpenCV_contrib中bgsegm模块主要有GMG, CNT, KNN, MOG, MOG2, GSOC, LSBP等7种背景分割器，其中KNN,MOG2可以在OpenCV标准库中直接使用，其他需要在OpenCV_contrib库中使用。具体各个方法介绍如下：</p><ul><li>GMG：基于像素颜色进行背景建模</li><li>CNT：基于像素点计数进行背景建模</li><li>KNN：基于K最近邻进行背景建模</li><li>MOG：基于混合高斯进行背景建模</li><li>MOG2：基于混合高斯进行背景建模，MOG的升级版本</li><li>GSOC：类似LSBP</li><li>LSBP：基于LBP进行背景建模</li></ul><p>各个方法提出时间、相关论文和OpenCV函数接口介绍如下表所示：</p><table><thead><tr><th>方法</th><th style="text-align:center;">提出时间</th><th>OpenCV函数接口介绍</th></tr></thead><tbody><tr><td>GMG</td><td style="text-align:center;"><a href="https://www.researchgate.net/publication/261311764_Visual_tracking_of_human_visitors_under_variable-lighting_conditions_for_a_responsive_audio_art_installation" target="_blank" rel="noopener noreferrer">2012</a></td><td><a href="https://docs.opencv.org/master/d1/d5c/classcv_1_1bgsegm_1_1BackgroundSubtractorGMG.html" target="_blank" rel="noopener noreferrer">BackgroundSubtractorGMG</a></td></tr><tr><td>CNT</td><td style="text-align:center;"><a href="https://github.com/sagi-z/BackgroundSubtractorCNT" target="_blank" rel="noopener noreferrer">2016</a></td><td><a href="https://docs.opencv.org/master/de/dca/classcv_1_1bgsegm_1_1BackgroundSubtractorCNT.html" target="_blank" rel="noopener noreferrer">BackgroundSubtractorCNT</a></td></tr><tr><td>KNN</td><td style="text-align:center;"><a href="https://www.sciencedirect.com/science/article/abs/pii/S0167865505003521" target="_blank" rel="noopener noreferrer">2006</a></td><td><a href="https://docs.opencv.org/master/db/d88/classcv_1_1BackgroundSubtractorKNN.html#details" target="_blank" rel="noopener noreferrer">BackgroundSubtractorKNN</a></td></tr><tr><td>MOG</td><td style="text-align:center;"><a href="http://www.ee.surrey.ac.uk/CVSSP/Publications/papers/KaewTraKulPong-AVBS01.pdf" target="_blank" rel="noopener noreferrer">2001</a></td><td><a href="https://docs.opencv.org/master/d6/da7/classcv_1_1bgsegm_1_1BackgroundSubtractorMOG.html" target="_blank" rel="noopener noreferrer">BackgroundSubtractorMOG</a></td></tr><tr><td>MOG2</td><td style="text-align:center;"><a href="http://ieeexplore.ieee.org/xpls/icp.jsp?arnumber=1333992" target="_blank" rel="noopener noreferrer">2004</a></td><td><a href="https://docs.opencv.org/master/d7/d7b/classcv_1_1BackgroundSubtractorMOG2.html#details" target="_blank" rel="noopener noreferrer">BackgroundSubtractorMOG2</a></td></tr><tr><td>GSOC</td><td style="text-align:center;">2016</td><td><a href="https://docs.opencv.org/master/d4/dd5/classcv_1_1bgsegm_1_1BackgroundSubtractorGSOC.html#details" target="_blank" rel="noopener noreferrer">BackgroundSubtractorGSOC</a></td></tr><tr><td>LSBP</td><td style="text-align:center;"><a href="https://www.cv-foundation.org/openaccess/content_cvpr_2016_workshops/w24/papers/Guo_Background_Subtraction_Using_CVPR_2016_paper.pdf" target="_blank" rel="noopener noreferrer">2016</a></td><td><a href="https://docs.opencv.org/master/de/d4c/classcv_1_1bgsegm_1_1BackgroundSubtractorLSBP.html#details" target="_blank" rel="noopener noreferrer">BackgroundSubtractorLSBP</a></td></tr></tbody></table><p>OpenCV contrib库的编译安装见：</p><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote><h2 id="_2-代码与方法评估" tabindex="-1"><a class="header-anchor" href="#_2-代码与方法评估"><span>2 代码与方法评估</span></a></h2><h3 id="_2-1-代码" tabindex="-1"><a class="header-anchor" href="#_2-1-代码"><span>2.1 代码</span></a></h3><p>下述代码介绍了OpenCV_contrib的bgsegm模块中不同背景分割方法C++和Python的调用。对比了不同背景分割方法在示例视频下，单线程和多线程的效果。</p><p>代码和示例视频下载地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer">https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><p>完整代码如下：</p><p><strong>C++</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;opencv2/opencv.hpp&gt;</span></span>
<span class="line"><span>#include &lt;opencv2/bgsegm.hpp&gt;</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>using namespace cv;</span></span>
<span class="line"><span>using namespace cv::bgsegm;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const String algos[7] = { &quot;GMG&quot;, &quot;CNT&quot;, &quot;KNN&quot;, &quot;MOG&quot;, &quot;MOG2&quot;, &quot;GSOC&quot;, &quot;LSBP&quot; };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 创建不同的背景分割识别器</span></span>
<span class="line"><span>static Ptr&lt;BackgroundSubtractor&gt; createBGSubtractorByName(const String&amp; algoName)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	Ptr&lt;BackgroundSubtractor&gt; algo;</span></span>
<span class="line"><span>	if (algoName == String(&quot;GMG&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorGMG(20, 0.7);</span></span>
<span class="line"><span>	else if (algoName == String(&quot;CNT&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorCNT();</span></span>
<span class="line"><span>	else if (algoName == String(&quot;KNN&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorKNN();</span></span>
<span class="line"><span>	else if (algoName == String(&quot;MOG&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorMOG();</span></span>
<span class="line"><span>	else if (algoName == String(&quot;MOG2&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorMOG2();</span></span>
<span class="line"><span>	else if (algoName == String(&quot;GSOC&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorGSOC();</span></span>
<span class="line"><span>	else if (algoName == String(&quot;LSBP&quot;))</span></span>
<span class="line"><span>		algo = createBackgroundSubtractorLSBP();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return algo;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 视频路径</span></span>
<span class="line"><span>	String videoPath = &quot;./video/vtest.avi&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 背景分割识别器序号</span></span>
<span class="line"><span>	int algo_index = 0;</span></span>
<span class="line"><span>	// 创建背景分割识别器</span></span>
<span class="line"><span>	Ptr&lt;BackgroundSubtractor&gt; bgfs = createBGSubtractorByName(algos[algo_index]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 打开视频</span></span>
<span class="line"><span>	VideoCapture cap;</span></span>
<span class="line"><span>	cap.open(videoPath);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 如果视频没有打开</span></span>
<span class="line"><span>	if (!cap.isOpened())</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cerr &lt;&lt; &quot;Cannot read video. Try moving video file to sample directory.&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>		return -1;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 输入图像</span></span>
<span class="line"><span>	Mat frame;</span></span>
<span class="line"><span>	// 运动前景</span></span>
<span class="line"><span>	Mat fgmask;</span></span>
<span class="line"><span>	// 最后显示的图像</span></span>
<span class="line"><span>	Mat segm;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 延迟等待时间</span></span>
<span class="line"><span>	int delay = 30;</span></span>
<span class="line"><span>	// 获得运行环境CPU的核心数</span></span>
<span class="line"><span>	int nthreads = getNumberOfCPUs();</span></span>
<span class="line"><span>	// 设置线程数</span></span>
<span class="line"><span>	setNumThreads(nthreads);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 是否显示运动前景</span></span>
<span class="line"><span>	bool show_fgmask = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 平均执行时间</span></span>
<span class="line"><span>	float average_Time = 0.0;</span></span>
<span class="line"><span>	// 当前帧数</span></span>
<span class="line"><span>	int frame_num = 0;</span></span>
<span class="line"><span>	// 总执行时间</span></span>
<span class="line"><span>	float sum_Time = 0.0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	for (;;)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 提取帧</span></span>
<span class="line"><span>		cap &gt;&gt; frame;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 如果图片为空</span></span>
<span class="line"><span>		if (frame.empty())</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			// CAP_PROP_POS_FRAMES表示当前帧</span></span>
<span class="line"><span>			// 本句话表示将当前帧设定为第0帧</span></span>
<span class="line"><span>			cap.set(CAP_PROP_POS_FRAMES, 0);</span></span>
<span class="line"><span>			cap &gt;&gt; frame;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		double time0 = static_cast&lt;double&gt;(getTickCount());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 背景建模</span></span>
<span class="line"><span>		bgfs-&gt;apply(frame, fgmask);</span></span>
<span class="line"><span>		time0 = ((double)getTickCount() - time0) / getTickFrequency();</span></span>
<span class="line"><span>		// 总执行时间</span></span>
<span class="line"><span>		sum_Time += time0;</span></span>
<span class="line"><span>		// 平均每帧执行时间</span></span>
<span class="line"><span>		average_Time = sum_Time / (frame_num + 1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		if (show_fgmask)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			segm = fgmask;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			// 根据segm = alpha * frame + beta改变图片</span></span>
<span class="line"><span>			// 参数分别为，输出图像，输出图像格式，alpha值，beta值</span></span>
<span class="line"><span>			frame.convertTo(segm, CV_8U, 0.5);</span></span>
<span class="line"><span>			// 图像叠加</span></span>
<span class="line"><span>			// 参数分别为，输入图像/颜色1，输入图像/颜色2，输出图像，掩膜</span></span>
<span class="line"><span>			// 掩膜表示叠加范围</span></span>
<span class="line"><span>			add(frame, Scalar(100, 100, 0), segm, fgmask);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 显示当前方法</span></span>
<span class="line"><span>		cv::putText(segm, algos[algo_index], Point(10, 30), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);</span></span>
<span class="line"><span>		// 显示当前线程数</span></span>
<span class="line"><span>		cv::putText(segm, format(&quot;%d threads&quot;, nthreads), Point(10, 60), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);</span></span>
<span class="line"><span>		// 显示当前每帧执行时间</span></span>
<span class="line"><span>		cv::putText(segm, format(&quot;averageTime %f s&quot;, average_Time), Point(10, 90), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		cv::imshow(&quot;FG Segmentation&quot;, segm);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		int c = waitKey(delay);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 修改等待时间</span></span>
<span class="line"><span>		if (c == &#39; &#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			delay = delay == 30 ? 1 : 30;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 按C背景分割识别器</span></span>
<span class="line"><span>		if (c == &#39;c&#39; || c == &#39;C&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			algo_index++;</span></span>
<span class="line"><span>			if (algo_index &gt; 6)</span></span>
<span class="line"><span>				algo_index = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			bgfs = createBGSubtractorByName(algos[algo_index]);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 设置线程数</span></span>
<span class="line"><span>		if (c == &#39;n&#39; || c == &#39;N&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			nthreads++;</span></span>
<span class="line"><span>			if (nthreads &gt; 8)</span></span>
<span class="line"><span>				nthreads = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			setNumThreads(nthreads);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 是否显示背景</span></span>
<span class="line"><span>		if (c == &#39;m&#39; || c == &#39;M&#39;)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			show_fgmask = !show_fgmask;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 退出</span></span>
<span class="line"><span>		if (c == &#39;q&#39; || c == &#39;Q&#39; || c == 27)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 当前帧数增加</span></span>
<span class="line"><span>		frame_num++;</span></span>
<span class="line"><span>		if (100 == frame_num)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			String strSave = &quot;out_&quot; + algos[algo_index] + &quot;.jpg&quot;;</span></span>
<span class="line"><span>			imwrite(strSave, segm);</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Wed Aug 12 19:20:56 2020</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>from time import *</span></span>
<span class="line"><span></span></span>
<span class="line"><span># TODO 背景减除算法集合</span></span>
<span class="line"><span>ALGORITHMS_TO_EVALUATE = [</span></span>
<span class="line"><span>    (cv2.bgsegm.createBackgroundSubtractorGMG(20, 0.7), &#39;GMG&#39;),</span></span>
<span class="line"><span>    (cv2.bgsegm.createBackgroundSubtractorCNT(), &#39;CNT&#39;),</span></span>
<span class="line"><span>    (cv2.createBackgroundSubtractorKNN(), &#39;KNN&#39;),</span></span>
<span class="line"><span>    (cv2.bgsegm.createBackgroundSubtractorMOG(), &#39;MOG&#39;),</span></span>
<span class="line"><span>    (cv2.createBackgroundSubtractorMOG2(), &#39;MOG2&#39;),</span></span>
<span class="line"><span>    (cv2.bgsegm.createBackgroundSubtractorGSOC(), &#39;GSOC&#39;),</span></span>
<span class="line"><span>    (cv2.bgsegm.createBackgroundSubtractorLSBP(), &#39;LSBP&#39;),</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># TODO 主函数</span></span>
<span class="line"><span>def main():</span></span>
<span class="line"><span>    # 背景分割识别器序号</span></span>
<span class="line"><span>    algo_index = 0</span></span>
<span class="line"><span>    subtractor = ALGORITHMS_TO_EVALUATE[algo_index][0]</span></span>
<span class="line"><span>    videoPath = &quot;./video/vtest.avi&quot;</span></span>
<span class="line"><span>    show_fgmask = False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 获得运行环境CPU的核心数</span></span>
<span class="line"><span>    nthreads = cv2.getNumberOfCPUs()</span></span>
<span class="line"><span>    # 设置线程数</span></span>
<span class="line"><span>    cv2.setNumThreads(nthreads)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 读取视频</span></span>
<span class="line"><span>    capture = cv2.VideoCapture(videoPath)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 当前帧数</span></span>
<span class="line"><span>    frame_num = 0</span></span>
<span class="line"><span>    # 总执行时间</span></span>
<span class="line"><span>    sum_Time = 0.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        ret, frame = capture.read()</span></span>
<span class="line"><span>        if not ret:</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>        begin_time = time()</span></span>
<span class="line"><span>        fgmask = subtractor.apply(frame)</span></span>
<span class="line"><span>        end_time = time()</span></span>
<span class="line"><span>        run_time = end_time - begin_time</span></span>
<span class="line"><span>        sum_Time = sum_Time + run_time</span></span>
<span class="line"><span>        # 平均执行时间</span></span>
<span class="line"><span>        average_Time = sum_Time / (frame_num + 1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if show_fgmask:</span></span>
<span class="line"><span>            segm = fgmask</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            segm = (frame * 0.5).astype(&#39;uint8&#39;)</span></span>
<span class="line"><span>            cv2.add(frame, (100, 100, 0, 0), segm, fgmask)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 显示当前方法</span></span>
<span class="line"><span>        cv2.putText(segm, ALGORITHMS_TO_EVALUATE[algo_index][1], (10, 30), cv2.FONT_HERSHEY_PLAIN, 2.0, (255, 0, 255),</span></span>
<span class="line"><span>                    2,</span></span>
<span class="line"><span>                    cv2.LINE_AA)</span></span>
<span class="line"><span>        # 显示当前线程数</span></span>
<span class="line"><span>        cv2.putText(segm, str(nthreads) + &quot; threads&quot;, (10, 60), cv2.FONT_HERSHEY_PLAIN, 2.0, (255, 0, 255), 2,</span></span>
<span class="line"><span>                    cv2.LINE_AA)</span></span>
<span class="line"><span>        # 显示当前每帧执行时间</span></span>
<span class="line"><span>        cv2.putText(segm, &quot;averageTime {} s&quot;.format(average_Time), (10, 90), cv2.FONT_HERSHEY_PLAIN, 2.0,</span></span>
<span class="line"><span>                    (255, 0, 255), 2, cv2.LINE_AA);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cv2.imshow(&#39;some&#39;, segm)</span></span>
<span class="line"><span>        key = cv2.waitKey(1) &amp; 0xFF</span></span>
<span class="line"><span>        frame_num = frame_num + 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 按&#39;q&#39;健退出循环</span></span>
<span class="line"><span>        if key == ord(&#39;q&#39;):</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cv2.destroyAllWindows()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    main()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-评价" tabindex="-1"><a class="header-anchor" href="#_2-2-评价"><span>2.2 评价</span></a></h3><p>在i5六代CPU(太渣就不具体介绍)，12G内存，VS2017 C++ Release平台下，各种方法处理速度如下表所示。</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">单线程单帧处理平均时间/ms</th><th style="text-align:center;">四线程单帧处理平均时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">GMG</td><td style="text-align:center;">38.6</td><td style="text-align:center;">31.3</td></tr><tr><td style="text-align:center;">CNT</td><td style="text-align:center;">4.6</td><td style="text-align:center;">2.9</td></tr><tr><td style="text-align:center;">KNN</td><td style="text-align:center;">19.8</td><td style="text-align:center;">9.3</td></tr><tr><td style="text-align:center;">MOG</td><td style="text-align:center;">16.3</td><td style="text-align:center;">15.6</td></tr><tr><td style="text-align:center;">MOG2</td><td style="text-align:center;">15.3</td><td style="text-align:center;">7.7</td></tr><tr><td style="text-align:center;">GSOC</td><td style="text-align:center;">66.3</td><td style="text-align:center;">49.4</td></tr><tr><td style="text-align:center;">LSBP</td><td style="text-align:center;">193.8</td><td style="text-align:center;">94.9</td></tr></tbody></table><p>各个方法，个人评价如下：</p><ul><li><p>GMG 初始建模帧会快速变化，导致全屏运动，对邻近运动目标检测效果一般，GMG需要自行设定参数（所以新的OpenCV标准库移除了GMG）总体效果一般。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_GMG.jpg" alt="" loading="lazy"></p></li><li><p>CNT 初始建模帧在一段时间持续变化导致全屏运动，运动目标过快可能会出现鬼影，低端设备速度很快，高端硬件速度和MOG2相近，总体效果不错。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_CNT.jpg" alt="" loading="lazy"></p></li><li><p>KNN 初始建模在一段时间持续变化导致全屏运动，运动目标都能较好检测出来，速度也还不错，总体效果不错。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_KNN.jpg" alt="" loading="lazy"></p></li><li><p>MOG 建模会丢失运动目标，速度不错，总体效果不错。效果如图所示：</p></li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_MOG.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>MOG2 运动区域过大，容易出现细微变化区域，总体效果最好，MOG的升级版本，运动区域基本能检测出来，不过需要自行设定参数。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_MOG2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>GSOC 建模时间过短出现鬼影，随着建模时间越来越长，检测效果会变好，会逐渐消除鬼影，LSBP的升级版本，相对还行。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_GSOC.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>LSBP 极易出现鬼影，建模次数越多，建模消耗时间有所减少，但是鬼影会偶尔出现。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_LSBP.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-3-方法选择" tabindex="-1"><a class="header-anchor" href="#_2-3-方法选择"><span>2.3 方法选择</span></a></h3><ul><li><p>追求速度 CNT or MOG2 or KNN 如果是低端设备或者并行任务多毫无疑问是CNT最好,高端设备还是MOG2更好，毕竟MOG2检测效果优于CNT，KNN也是不错的选择。</p></li><li><p>追求质量 MOG2 or KNN or GSOC 检测质量MOG2和KNN差不多，GSOC建模时间长会很不错，但是GSOC太慢了。如果不在意速度GSOC很好，其他还是MOG2和KNN。</p></li><li><p>平衡质量和速度 MOG2 or KNN 质量和速度均衡MOG2和KNN最不错，不然为什么MOG2和KNN放在标准库，其他在contrib库。MOG2需要调整参数，不过速度和质量优于KNN。如果图省心，不想调整参数，选KNN最好。</p></li></ul><p>总的来说实际应用中，MOG2用的最多，KNN其次，CNT一般用于树莓派和多检测任务中。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><blockquote><p><a href="https://docs.opencv.org/master/d2/d55/group__bgsegm.html#gga1a5838fa2d2697ac455b136bfcdb4600ad8f108b7815d6bcccd32b849063e0a9c" target="_blank" rel="noopener noreferrer">OpenCV官方背景分割介绍</a></p></blockquote></li><li><blockquote><p><a href="https://github.com/opencv/opencv_contrib/tree/master/modules/bgsegm" target="_blank" rel="noopener noreferrer">OpenCV bgsegm官方仓库</a></p></blockquote></li><li><blockquote><p><a href="https://blog.csdn.net/LuohenYJ/article/details/107944236" target="_blank" rel="noopener noreferrer">OpenCV_contrib库在windows下编译使用指南</a></p></blockquote></li><li><blockquote><p><a href="https://blog.csdn.net/Anderson_Y/article/details/82082095" target="_blank" rel="noopener noreferrer">背景减除(Background Segment)</a></p></blockquote></li></ul>`,39)]))}const c=s(l,[["render",p],["__file","2020-08-14-_OpenCV实战_43 使用OpenCV进行背景分割.html.vue"]]),d=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-14-_OpenCV%E5%AE%9E%E6%88%98_43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2.html","title":"[OpenCV实战]43 使用OpenCV进行背景分割","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-08-14T13:16:18.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]43 使用OpenCV进行背景分割 运动背景分割法Background Segment主要是指通过不同方法拟合模型建立背景图像，将当前帧与背景图像进行相减比较获得运动区域。下图所示为检测图像： 通过前面的检测帧建立背景模型，获得背景图像。然后检测图像与背景图像相减即为运动图像，黑色区域为背景，白色区域为运动目标，如下图所示： 在Op...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-14-_OpenCV%E5%AE%9E%E6%88%98_43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]43 使用OpenCV进行背景分割"}],["meta",{"property":"og:description","content":"[OpenCV实战]43 使用OpenCV进行背景分割 运动背景分割法Background Segment主要是指通过不同方法拟合模型建立背景图像，将当前帧与背景图像进行相减比较获得运动区域。下图所示为检测图像： 通过前面的检测帧建立背景模型，获得背景图像。然后检测图像与背景图像相减即为运动图像，黑色区域为背景，白色区域为运动目标，如下图所示： 在Op..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_resframe.jpg?ref_type=heads"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-08-14T13:16:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]43 使用OpenCV进行背景分割\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_resframe.jpg?ref_type=heads\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_resmog.jpg?ref_type=heads\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_GMG.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_CNT.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_KNN.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_MOG.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_MOG2.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_GSOC.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D43%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E8%83%8C%E6%99%AF%E5%88%86%E5%89%B2/out_LSBP.jpg\\"],\\"datePublished\\":\\"2020-08-14T13:16:18.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 方法介绍","slug":"_1-方法介绍","link":"#_1-方法介绍","children":[]},{"level":2,"title":"2 代码与方法评估","slug":"_2-代码与方法评估","link":"#_2-代码与方法评估","children":[{"level":3,"title":"2.1 代码","slug":"_2-1-代码","link":"#_2-1-代码","children":[]},{"level":3,"title":"2.2 评价","slug":"_2-2-评价","link":"#_2-2-评价","children":[]},{"level":3,"title":"2.3 方法选择","slug":"_2-3-方法选择","link":"#_2-3-方法选择","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":8.39,"words":2517},"filePathRelative":"blog/opencv/opencv实战/2020-08-14-[OpenCV实战]43 使用OpenCV进行背景分割.md","localizedDate":"2020年8月14日","excerpt":"\\n<p>运动背景分割法Background Segment主要是指通过不同方法拟合模型建立背景图像，将当前帧与背景图像进行相减比较获得运动区域。下图所示为检测图像：\\n<img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resframe.jpg?ref_type=heads\\" alt=\\"\\" loading=\\"lazy\\"></p>\\n<p>通过前面的检测帧建立背景模型，获得背景图像。然后检测图像与背景图像相减即为运动图像，黑色区域为背景，白色区域为运动目标，如下图所示：\\n<img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resmog.jpg?ref_type=heads\\" alt=\\"\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{c as comp,d as data};
