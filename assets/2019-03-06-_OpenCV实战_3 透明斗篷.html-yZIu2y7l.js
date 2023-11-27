import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as l,c,a as n,b as a,d as e,e as t}from"./app-MsA2k2kn.js";const o={},u=t(`<h1 id="opencv实战-3-透明斗篷" tabindex="-1"><a class="header-anchor" href="#opencv实战-3-透明斗篷" aria-hidden="true">#</a> [OpenCV实战]3 透明斗篷</h1><p>弄出哈利波特电影里一样效果的透明斗篷。也就是一个视频里，将红布弄成透明。类似下面的效果。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/1.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>基本思想如下：</p><p>1寻找和存储背景帧。</p><p>2用颜色检测算法检测红色布。</p><p>3提取红色区域。</p><p>4背景帧红布区域替换当前帧红布区域。</p><h2 id="_1-寻找和存储背景帧" tabindex="-1"><a class="header-anchor" href="#_1-寻找和存储背景帧" aria-hidden="true">#</a> 1 寻找和存储背景帧</h2><p>算法关键思想是用背景像素替换与布相对应的当前帧像我们需提取和存储背景帧。背景帧检测算法很简单，实际上算不上背景帧建模算法。仅仅设定视频第31帧为背景图像。如果想了解背景帧提取算法可以看看背景建模算法，比如混合高斯背景建模算法。</p><p>C++代码如下:</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    	Mat background;
    	//跳过前30帧
    	for (int i = 0; i &lt; 30; i++)
    	{
    		cap &gt;&gt; background;
    	}
    	//沿Y轴翻转图像
    	flip(background, background, 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-红色区域检测" tabindex="-1"><a class="header-anchor" href="#_2-红色区域检测" aria-hidden="true">#</a> 2 红色区域检测</h2><p>事实上基于RGB空间检测红色很困难，因为红色是RGB综合获得的。正确的方法是将图像从RGB颜色空间转到HSV空间。HSV对颜色的定义更接近人的视觉系统。对于颜色检测来说，HSV空间中，</p><p>HSV空间各个参数如下：</p><p>色调Hue：用角度度量，取值范围为0-度360度。可以认为0度对应于红色，120度对应于绿色，240度对应于蓝色。</p><p>饱和度Saturation：饱和度表示颜色的强度和纯度。例如，粉红色不如大红色饱和。</p><p>明度Value：表示颜色的明暗程度，取值范围为0.0(黑色)～1.0(白色)。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>颜色仅由色调Hue决定。在OpenCV中色调不是0到360度，而被量化为0到180。</p><p>其中红色以0-30和150-180表示。</p><p>红色区域检测主要原理如下：</p><p>基于OpenCV中的inRange函数筛选颜色。其中红色Hue值的范围为0-10和170-180，以避免发现皮肤为红色。因为红布应该是高度饱和的红色。所以S值设定为120到255。明度设置为70到255。根据以上能够获得红色Hue值的范围为0-10和170-180d的两个红色区域。然后对其做并操作提取图像红色区域(红布区域)范围二值图像。所获得二值图像中白色部分(像素值为255)表示红布，黑色部分（像素值为0）表示背景。结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/3.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>c++代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    		//检测帧
    		Mat frame;
    
    		// Capture frame-by-frame
    		cap &gt;&gt; frame;
    
    		// If the frame is empty, break immediately
    		if (frame.empty())
    		{
    			break;
    		}
    		//hsv图像
    		Mat hsv;
    		flip(frame, frame, 1);
    		cvtColor(frame, hsv, COLOR_BGR2HSV);
    
    		//红色区域1，红色区域2
    		Mat mask1, mask2;
    		//红色区域
    		Mat mask_red;
    		//背景区域
    		Mat mask_background;
    		//过滤颜色
    		//二值图，其中黑色0表示无红色，白色1表示红色区域。
    		inRange(hsv, Scalar(0, 120, 70), Scalar(10, 255, 255), mask1);
    		inRange(hsv, Scalar(170, 120, 70), Scalar(180, 255, 255), mask2);
    		mask_red = mask1 + mask2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-提取红色区域" tabindex="-1"><a class="header-anchor" href="#_3-提取红色区域" aria-hidden="true">#</a> 3 提取红色区域</h2><p>主要是通过红布区域范围二值图像提取红色区域图像(背景为黑色)，并将背景图像中红布区域置为黑色。结果分别如下图所示</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/4.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]3 透明斗篷/5.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>c++代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    		//去除噪声
    		Mat kernel = Mat::ones(3, 3, CV_32F);
    		morphologyEx(mask_red, mask_red, cv::MORPH_OPEN, kernel);
    		morphologyEx(mask_red, mask_red, cv::MORPH_DILATE, kernel);
    
    		//将mask_red中0，1互换，得到背景区域范围。
    		bitwise_not(mask_red, mask_background);
    		Mat res1, res2, final_output;
    		//从当前帧抠出背景区域res1,红布区域被涂成黑色。
    		bitwise_and(frame, frame, res1, mask_background);
    		//从背景帧提取红布区域覆盖的背景res2
    		bitwise_and(background, background, res2, mask_red);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-背景帧红布区域替换当前帧红布区域。" tabindex="-1"><a class="header-anchor" href="#_4-背景帧红布区域替换当前帧红布区域。" aria-hidden="true">#</a> 4 背景帧红布区域替换当前帧红布区域。</h2><p>最后通过 addWeighted 函数将上面两张图融合。这样就能弄出透明的效果。只能针对特定视频，所用视频及代码见：</p>`,35),r={href:"https://download.csdn.net/download/luohenyj/11001759",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。pch是预编译文件。视频有红布出现在第250帧后。</p><h2 id="_5-工程代码" tabindex="-1"><a class="header-anchor" href="#_5-工程代码" aria-hidden="true">#</a> 5 工程代码</h2><p>实际上这种方法只有在特定场合实用，来练手还是挺适合的。全部代码如下：</p><p>C++版本</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    
    #include &quot;pch.h&quot;
    #include &lt;iostream&gt;
    #include &lt;opencv2/opencv.hpp&gt;
    
    using namespace std;
    using namespace cv;
    
    int main()
    {
    	//打开视频
    	VideoCapture cap(&quot;video/detect.mp4&quot;);
    
    	// 检查视频是否打开
    	if (!cap.isOpened())
    	{
    		cout &lt;&lt; &quot;Error opening video stream or file&quot; &lt;&lt; endl;
    		return -1;
    	}
    
    	Mat background;
    	//跳过前30帧
    	for (int i = 0; i &lt; 30; i++)
    	{
    		cap &gt;&gt; background;
    	}
    	//沿Y轴翻转图像
    	flip(background, background, 1);
    	//红布第251帧才出现，跳过前250帧
    	for (int i = 0; i &lt; 220; i++)
    	{
    		Mat frame_slip;
    		cap &gt;&gt; frame_slip;
    		continue;
    	}
    
    
    	//图像读取
    	while (1)
    	{
    		//检测帧
    		Mat frame;
    
    		// Capture frame-by-frame
    		cap &gt;&gt; frame;
    
    		// If the frame is empty, break immediately
    		if (frame.empty())
    		{
    			break;
    		}
    		//hsv图像
    		Mat hsv;
    		flip(frame, frame, 1);
    		cvtColor(frame, hsv, COLOR_BGR2HSV);
    
    		//红色区域1，红色区域2
    		Mat mask1, mask2;
    		//红色区域
    		Mat mask_red;
    		//背景区域
    		Mat mask_background;
    		//过滤颜色
    		//二值图，其中黑色0表示无红色，白色1表示红色区域。
    		inRange(hsv, Scalar(0, 120, 70), Scalar(10, 255, 255), mask1);
    		inRange(hsv, Scalar(170, 120, 70), Scalar(180, 255, 255), mask2);
    		mask_red = mask1 + mask2;
    
    		//去除噪声
    		Mat kernel = Mat::ones(3, 3, CV_32F);
    		morphologyEx(mask_red, mask_red, cv::MORPH_OPEN, kernel);
    		morphologyEx(mask_red, mask_red, cv::MORPH_DILATE, kernel);
    
    		//将mask_red中0，1互换，得到背景区域范围。
    		bitwise_not(mask_red, mask_background);
    		Mat res1, res2, final_output;
    		//从当前帧抠出背景区域res1,红布区域被涂成黑色。
    		bitwise_and(frame, frame, res1, mask_background);
    		//从背景帧提取红布区域覆盖的背景res2
    		bitwise_and(background, background, res2, mask_red);
    
    		addWeighted(res1, 1, res2, 1, 0, final_output);
    		//展示图像
    		imshow(&quot;Magic !!!&quot;, final_output);
    		// Press  ESC on keyboard to exit
    		char c = (char)waitKey(1);
    		if (c == 27)
    		{
    			break;
    		}
    	}
    
    	return 0;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python代码：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
    <span class="token keyword">import</span> cv2
    <span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
    <span class="token keyword">import</span> time
    
    
    <span class="token comment"># Creating an VideoCapture object</span>
    <span class="token comment"># This will be used for image acquisition later in the code.</span>
    cap <span class="token operator">=</span> cv2<span class="token punctuation">.</span>VideoCapture<span class="token punctuation">(</span><span class="token string">&#39;video/detect.mp4&#39;</span><span class="token punctuation">)</span>
    
    <span class="token keyword">if</span> cap<span class="token punctuation">.</span>isOpened<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;your video is opened&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># We give some time for the camera to setup</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    count <span class="token operator">=</span> <span class="token number">0</span>
    background<span class="token operator">=</span><span class="token number">0</span>
    
    <span class="token comment"># Capturing and storing the static background frame</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    	ret<span class="token punctuation">,</span>background <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    background <span class="token operator">=</span> np<span class="token punctuation">.</span>flip<span class="token punctuation">(</span>background<span class="token punctuation">,</span>axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
    
        
    <span class="token comment">#跳帧</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        slip_frame <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>cap<span class="token punctuation">.</span>isOpened<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    
    	ret<span class="token punctuation">,</span> img <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    	<span class="token keyword">if</span> <span class="token keyword">not</span> ret<span class="token punctuation">:</span>
    		<span class="token keyword">break</span>
    	count<span class="token operator">+=</span><span class="token number">1</span>
    	img <span class="token operator">=</span> np<span class="token punctuation">.</span>flip<span class="token punctuation">(</span>img<span class="token punctuation">,</span>axis<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
    	
    	<span class="token comment"># Converting the color space from BGR to HSV</span>
    	hsv <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>img<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    
    	<span class="token comment"># Generating mask to detect red color</span>
    	lower_red <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">120</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    	upper_red <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">255</span><span class="token punctuation">,</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    	mask1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>inRange<span class="token punctuation">(</span>hsv<span class="token punctuation">,</span>lower_red<span class="token punctuation">,</span>upper_red<span class="token punctuation">)</span>
    
    	lower_red <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">170</span><span class="token punctuation">,</span><span class="token number">120</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    	upper_red <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">180</span><span class="token punctuation">,</span><span class="token number">255</span><span class="token punctuation">,</span><span class="token number">255</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    	mask2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>inRange<span class="token punctuation">(</span>hsv<span class="token punctuation">,</span>lower_red<span class="token punctuation">,</span>upper_red<span class="token punctuation">)</span>
    
    	mask1 <span class="token operator">=</span> mask1<span class="token operator">+</span>mask2
    
    	<span class="token comment"># Refining the mask corresponding to the detected red color</span>
    	mask1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>morphologyEx<span class="token punctuation">(</span>mask1<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>MORPH_OPEN<span class="token punctuation">,</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>np<span class="token punctuation">.</span>uint8<span class="token punctuation">)</span><span class="token punctuation">,</span>iterations<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    	mask1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dilate<span class="token punctuation">(</span>mask1<span class="token punctuation">,</span>np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>np<span class="token punctuation">.</span>uint8<span class="token punctuation">)</span><span class="token punctuation">,</span>iterations <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
    	mask2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>bitwise_not<span class="token punctuation">(</span>mask1<span class="token punctuation">)</span>
    
    	<span class="token comment"># Generating the final output</span>
    	res1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>bitwise_and<span class="token punctuation">(</span>background<span class="token punctuation">,</span>background<span class="token punctuation">,</span>mask<span class="token operator">=</span>mask1<span class="token punctuation">)</span>
    	res2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>bitwise_and<span class="token punctuation">(</span>img<span class="token punctuation">,</span>img<span class="token punctuation">,</span>mask<span class="token operator">=</span>mask2<span class="token punctuation">)</span>
    	final_output <span class="token operator">=</span> cv2<span class="token punctuation">.</span>addWeighted<span class="token punctuation">(</span>res1<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span>res2<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
    
    	cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&#39;Magic !!!&#39;</span><span class="token punctuation">,</span>final_output<span class="token punctuation">)</span>
    	k <span class="token operator">=</span> cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
    	<span class="token keyword">if</span> k <span class="token operator">==</span> <span class="token number">27</span><span class="token punctuation">:</span>
    		<span class="token keyword">break</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-参考" tabindex="-1"><a class="header-anchor" href="#_6-参考" aria-hidden="true">#</a> 6 参考</h2>`,8),m={href:"https://www.learnopencv.com/invisibility-cloak-using-color-detection-and-segmentation-with-opencv/",target:"_blank",rel:"noopener noreferrer"};function k(b,g){const s=p("ExternalLinkIcon");return l(),c("div",null,[u,n("p",null,[n("a",r,[a(" https://download.csdn.net/download/luohenyj/11001759 "),e(s)])]),n("p",null,[n("a",d,[a(" https://github.com/luohenyueji/OpenCV-Practical-Exercise"),e(s)])]),v,n("ul",null,[n("li",null,[n("a",m,[a(" https://www.learnopencv.com/invisibility-cloak-using-color-detection-and-segmentation-with-opencv/ "),e(s)])])])])}const f=i(o,[["render",k],["__file","2019-03-06-_OpenCV实战_3 透明斗篷.html.vue"]]);export{f as default};
