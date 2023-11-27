import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as c,c as o,a as n,b as s,d as t,e}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"opencv实战-52-在opencv中使用颜色直方图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#opencv实战-52-在opencv中使用颜色直方图","aria-hidden":"true"},"#"),s(" [OpenCV实战]52 在OpenCV中使用颜色直方图")],-1),r={href:"https://cloud.tencent.com/developer/article/1769742",target:"_blank",rel:"noopener noreferrer"},d={href:"https://docs.opencv.org/4.4.0/d6/dc7/group__imgproc__hist.html#gad689d2607b7b3889453804f414ab1018",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"[toc]",-1),m=n("p",null,"本文所有代码见：",-1),k={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},b={href:"https://gitee.com/luohenyueji/OpenCV-Practical-Exercise-Gitee",target:"_blank",rel:"noopener noreferrer"},h=e(`<h2 id="_1-颜色直方图的计算" tabindex="-1"><a class="header-anchor" href="#_1-颜色直方图的计算" aria-hidden="true">#</a> 1 颜色直方图的计算</h2><p>opencv使用内置calcHist函数计算图像的颜色直方图，calcHist函数c++接口如下，python接口类似。</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void cv::calcHist(const Mat * images, int nimages, const int * channels,
	InputArray mask, OutputArray hist, int dims, const int * histSize,
	const float ** ranges, bool uniform = true, bool accumulate = false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数说明如下：</p><ul><li>images：输入的图像；</li><li>nimages：输入图像数；</li><li>channels：用输入图像的第几个颜色通道进行计算；</li><li>mask：掩模，掩膜的作用为只计算图片中某一区域的直方图，而忽略其他区域；</li><li>hist：直方图输出结果；</li><li>dims：输出直方图的维度；</li><li>histSize：直方图像素值范围分为多少区间（直方图条形个数）；</li><li>ranges：直方图像素值统计范围；</li><li>uniform=true：是否对得到的直方图数组进行归一化处理；</li><li>accumulate=false：当输入多个图像时，是否累积计算像素值的个数；</li></ul><p>通过calcHist函数能够计算出每个像素范围下的像素点个数，其中histSize表示有多少个像素点区间。比如像素值范围为0到255，如果histSize设置为256，则表示每一个像素值区间跨度为1。如果histSize设置为128，表示每一个像素值区间跨度为256/128=2。以下代码展示了calcHist函数使用方法，分为calcHist计算和结果绘图。结果绘图代码看着很复杂，因为OpenCV绘图功能很一般。可以通过其他的方式绘制图片。</p><p><strong>C++</strong></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/highgui.hpp&quot;
#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/imgproc.hpp&quot;
#include &lt;iostream&gt;
using namespace std;
using namespace cv;

int main()
{
	auto imgpath = &quot;image/lena.jpg&quot;;
	// 读取彩色图片
	Mat src = imread(imgpath, IMREAD_COLOR);
	if (src.empty())
	{
		return -1;
	}
	vector&lt;Mat&gt; bgr_planes;
	// 图像RGB颜色通道分离
	split(src, bgr_planes);
	// 将直方图像素值分为多少个区间/直方图有多少根柱子
	int histSize = 256;
	// 256不会被使用
	float range[] = { 0, 256 };
	const float* histRange = { range };
	// 一些默认参数，一般不变
	bool uniform = true, accumulate = false;
	Mat b_hist, g_hist, r_hist;
	// 参数依次为：
	// 输入图像: &amp;bgr_planes[0]
	// 输入图像个数：1
	// 使用输入图像的第几个通道：0
	// 掩膜：Mat()
	// 直方图计算结果：b_hist，b_hist存储histSize个区间的像素值个数
	// 直方图维度：1
	// 直方图像素值范围分为多少区间（直方图条形个数）：256
	// 是否对得到的直方图数组进行归一化处理；uniform
	// 当输入多个图像时，是否累积计算像素值的个数accumulate
	calcHist(&amp;bgr_planes[0], 1, 0, Mat(), b_hist, 1, &amp;histSize, &amp;histRange, uniform, accumulate);
	calcHist(&amp;bgr_planes[1], 1, 0, Mat(), g_hist, 1, &amp;histSize, &amp;histRange, uniform, accumulate);
	calcHist(&amp;bgr_planes[2], 1, 0, Mat(), r_hist, 1, &amp;histSize, &amp;histRange, uniform, accumulate);

	// b_hist表示每个像素范围的像素值个数，其总和等于输入图像长乘宽。
	// 如果要统计每个像素范围的像素值百分比，计算方式如下
	// b_hist /= (float)(cv::sum(b_hist)[0]);
	// g_hist /= (float)(cv::sum(g_hist)[0]);
	// r_hist /= (float)(cv::sum(r_hist)[0]);

	/* 以下的参数都是跟直方图展示有关，c++展示图片不那么容易*/
	// 一些绘图参数
	int hist_w = 512, hist_h = 400;
	int bin_w = cvRound((double)hist_w / histSize);
	// 创建一张黑色背景图像，用于展示直方图绘制结果
	Mat histImage(hist_h, hist_w, CV_8UC3, Scalar(0, 0, 0));
	// 将直方图归一化到0到histImage.rows，最后两个参数默认就好。
	normalize(b_hist, b_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());
	normalize(g_hist, g_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());
	normalize(r_hist, r_hist, 0, histImage.rows, NORM_MINMAX, -1, Mat());
	for (int i = 1; i &lt; histSize; i++)
	{
		//遍历hist元素（注意hist中是float类型）
		// 绘制蓝色分量
		line(histImage, Point(bin_w*(i - 1), hist_h - cvRound(b_hist.at&lt;float&gt;(i - 1))),
			Point(bin_w*(i), hist_h - cvRound(b_hist.at&lt;float&gt;(i))),
			Scalar(255, 0, 0), 2, 8, 0);
		// 绘制绿色分量
		line(histImage, Point(bin_w*(i - 1), hist_h - cvRound(g_hist.at&lt;float&gt;(i - 1))),
			Point(bin_w*(i), hist_h - cvRound(g_hist.at&lt;float&gt;(i))),
			Scalar(0, 255, 0), 2, 8, 0);
		// 绘制红色分量
		line(histImage, Point(bin_w*(i - 1), hist_h - cvRound(r_hist.at&lt;float&gt;(i - 1))),
			Point(bin_w*(i), hist_h - cvRound(r_hist.at&lt;float&gt;(i))),
			Scalar(0, 0, 255), 2, 8, 0);
	}
	imshow(&quot;src image&quot;, src);
	imshow(&quot;dst image&quot;, histImage);
	waitKey(0);
	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> cv2
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    imgpath <span class="token operator">=</span> <span class="token string">&quot;image/lena.jpg&quot;</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgpath<span class="token punctuation">)</span>
    <span class="token keyword">if</span> src <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the image:&#39;</span><span class="token punctuation">,</span> imgpath<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    bgr_planes <span class="token operator">=</span> cv2<span class="token punctuation">.</span>split<span class="token punctuation">(</span>src<span class="token punctuation">)</span>
    histSize <span class="token operator">=</span> <span class="token number">256</span>
    <span class="token comment"># 256会被排除</span>
    histRange <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span>
    accumulate <span class="token operator">=</span> <span class="token boolean">False</span>
    b_hist <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span>bgr_planes<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
                         histSize<span class="token punctuation">]</span><span class="token punctuation">,</span> histRange<span class="token punctuation">,</span> accumulate<span class="token operator">=</span>accumulate<span class="token punctuation">)</span>
    g_hist <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span>bgr_planes<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
                         histSize<span class="token punctuation">]</span><span class="token punctuation">,</span> histRange<span class="token punctuation">,</span> accumulate<span class="token operator">=</span>accumulate<span class="token punctuation">)</span>
    r_hist <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span>bgr_planes<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
                         histSize<span class="token punctuation">]</span><span class="token punctuation">,</span> histRange<span class="token punctuation">,</span> accumulate<span class="token operator">=</span>accumulate<span class="token punctuation">)</span>
    
	<span class="token comment"># b_hist表示每个像素范围的像素值个数，其总和等于输入图像长乘宽。</span>
	<span class="token comment"># 如果要统计每个像素范围的像素值百分比，计算方式如下</span>
    <span class="token keyword">assert</span><span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">(</span>b_hist<span class="token punctuation">)</span> <span class="token operator">==</span> src<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span>src<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment"># b_hist /= sum(b_hist)</span>
    <span class="token comment"># g_hist /= sum(g_hist)</span>
    <span class="token comment"># r_hist /= sum(r_hist)</span>
    <span class="token comment"># assert(sum(b_hist) == 1)</span>
    
    <span class="token comment"># 以下是绘图代码</span>
    hist_w <span class="token operator">=</span> <span class="token number">512</span>
    hist_h <span class="token operator">=</span> <span class="token number">400</span>
    bin_w <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">round</span><span class="token punctuation">(</span>hist_w<span class="token operator">/</span>histSize<span class="token punctuation">)</span><span class="token punctuation">)</span>
    histImage <span class="token operator">=</span> np<span class="token punctuation">.</span>zeros<span class="token punctuation">(</span><span class="token punctuation">(</span>hist_h<span class="token punctuation">,</span> hist_w<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>uint8<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>b_hist<span class="token punctuation">,</span> b_hist<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span>hist_h<span class="token punctuation">,</span>
                 norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>g_hist<span class="token punctuation">,</span> g_hist<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span>hist_h<span class="token punctuation">,</span>
                 norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>r_hist<span class="token punctuation">,</span> r_hist<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span>hist_h<span class="token punctuation">,</span>
                 norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> histSize<span class="token punctuation">)</span><span class="token punctuation">:</span>
        cv2<span class="token punctuation">.</span>line<span class="token punctuation">(</span>histImage<span class="token punctuation">,</span> <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>b_hist<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>b_hist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> thickness<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
        cv2<span class="token punctuation">.</span>line<span class="token punctuation">(</span>histImage<span class="token punctuation">,</span> <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>g_hist<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>g_hist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> thickness<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
        cv2<span class="token punctuation">.</span>line<span class="token punctuation">(</span>histImage<span class="token punctuation">,</span> <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>r_hist<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span>bin_w<span class="token operator">*</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> hist_h <span class="token operator">-</span> <span class="token builtin">int</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">round</span><span class="token punctuation">(</span>r_hist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span> thickness<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&#39;src image&#39;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&#39;dst image&#39;</span><span class="token punctuation">,</span> histImage<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    
    cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">0</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下所示，展示了图片每一个通道的颜色信息。如果是输入是灰度图，稍微修改下代码即可。</p><table><thead><tr><th>类型</th><th>颜色直方图</th></tr></thead><tbody><tr><td>输入图片</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img1_1.jpg" alt="" loading="lazy"></td></tr><tr><td>输出图片</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img1_2.jpg" alt="" loading="lazy"></td></tr></tbody></table><h2 id="_2-图像均衡化" tabindex="-1"><a class="header-anchor" href="#_2-图像均衡化" aria-hidden="true">#</a> 2 图像均衡化</h2>`,13),_={href:"https://zhuanlan.zhihu.com/p/382430357",target:"_blank",rel:"noopener noreferrer"},g=e(`<p>以下代码展示了equalizeHist函数的使用。</p><p><strong>C++</strong></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/highgui.hpp&quot;
#include &quot;opencv2/imgproc.hpp&quot;
#include &lt;iostream&gt;
using namespace cv;
using namespace std;
int main()
{
	auto imgpath = &quot;image/lena.jpg&quot;;
	// 读取彩色图片
	Mat src = imread(imgpath, IMREAD_COLOR);
	if (src.empty())
	{
		return -1;
	}
	// 变为灰度图
	cvtColor(src, src, COLOR_BGR2GRAY);
	Mat dst;
	equalizeHist(src, dst);
	imshow(&quot;src image&quot;, src);
	imshow(&quot;dst Image&quot;, dst);
	waitKey(0);
	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> cv2

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    imgpath <span class="token operator">=</span> <span class="token string">&quot;image/lena.jpg&quot;</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgpath<span class="token punctuation">)</span>
    <span class="token keyword">if</span> src <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the image:&#39;</span><span class="token punctuation">,</span> imgpath<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2GRAY<span class="token punctuation">)</span>
    dst <span class="token operator">=</span> cv2<span class="token punctuation">.</span>equalizeHist<span class="token punctuation">(</span>src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;src image&quot;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;dst image&quot;</span><span class="token punctuation">,</span> dst<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">0</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下所示，可以看到直方图均衡的作用是扩大颜色直方图像素区间的分布范围，使得分布更加均匀。</p><table><thead><tr><th>类型</th><th>图片</th><th>颜色直方图</th></tr></thead><tbody><tr><td>输入图片</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_1.jpg" alt="" loading="lazy"></td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_2.jpg" alt="" loading="lazy"></td></tr><tr><td>直方图均衡</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_3.jpg" alt="" loading="lazy"></td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_4.jpg" alt="" loading="lazy"></td></tr><tr><td>自适应直方图均衡</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_5.jpg" alt="" loading="lazy"></td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_6.jpg" alt="" loading="lazy"></td></tr></tbody></table>`,7),w={href:"https://www.cnblogs.com/Imageshop/archive/2013/04/07/3006334.html",target:"_blank",rel:"noopener noreferrer"},y=e(`<p><strong>C++</strong></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/highgui.hpp&quot;
#include &quot;opencv2/imgproc.hpp&quot;
#include &lt;iostream&gt;
using namespace cv;
using namespace std;
int main()
{
	auto imgpath = &quot;image/lena.jpg&quot;;
	// 读取彩色图片
	Mat src = imread(imgpath, IMREAD_COLOR);
	if (src.empty())
	{
		return -1;
	}
	// 变为灰度图
	cvtColor(src, src, COLOR_BGR2GRAY);
	Mat dst;
	cv::Ptr&lt;CLAHE&gt; clahe = cv::createCLAHE();
	// 设置对比度限制阈值
	clahe-&gt;setClipLimit(2);
	// 设置划分网格数量
	clahe-&gt;setTilesGridSize(cv::Size(16, 16));
	clahe-&gt;apply(src, dst);
	imshow(&quot;src image&quot;, src);
	imshow(&quot;dst Image&quot;, dst);
	waitKey(0);
	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> cv2

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    imgpath <span class="token operator">=</span> <span class="token string">&quot;image/lena.jpg&quot;</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgpath<span class="token punctuation">)</span>
    <span class="token keyword">if</span> src <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the image:&#39;</span><span class="token punctuation">,</span> imgpath<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2GRAY<span class="token punctuation">)</span>
    clahe <span class="token operator">=</span> cv2<span class="token punctuation">.</span>createCLAHE<span class="token punctuation">(</span>clipLimit<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> tileGridSize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    dst <span class="token operator">=</span> clahe<span class="token punctuation">.</span><span class="token builtin">apply</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;src image&quot;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;dst image&quot;</span><span class="token punctuation">,</span> dst<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">0</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),C={href:"https://blog.csdn.net/LuohenYJ/article/details/84957101",target:"_blank",rel:"noopener noreferrer"},q={href:"https://blog.csdn.net/LuohenYJ/article/details/88237008",target:"_blank",rel:"noopener noreferrer"},f=e(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/highgui.hpp&quot;
#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/imgproc.hpp&quot;
#include &lt;iostream&gt;
using namespace std;
using namespace cv;

// 颜色通道分别进行均衡化
Mat equalizeHistChannel(const Mat inputImage)
{
	// 分离通道
	vector&lt;Mat&gt; channels;
	split(inputImage, channels);

	// 各个通道图像进行直方图均衡
	equalizeHist(channels[0], channels[0]);
	equalizeHist(channels[1], channels[1]);
	equalizeHist(channels[2], channels[2]);

	// 合并结果
	Mat result;
	merge(channels, result);

	return result;
}

// 仅对亮度通道进行均衡化
Mat equalizeHistIntensity(const Mat inputImage)
{
	Mat yuv;

	// 将bgr格式转换为yuv444
	cvtColor(inputImage, yuv, COLOR_BGR2YUV);

	vector&lt;Mat&gt; channels;
	split(yuv, channels);
	// 均衡化亮度通道
	equalizeHist(channels[0], channels[0]);

	Mat result;
	merge(channels, yuv);

	cvtColor(yuv, result, COLOR_YUV2BGR);

	return result;
}

int main()
{
	auto imgpath = &quot;image/lena.jpg&quot;;
	// 读取彩色图片
	Mat src = imread(imgpath, IMREAD_COLOR);
	if (src.empty())
	{
		return -1;
	}
	Mat dstChannel, dstIntensity;
	dstChannel = equalizeHistChannel(src);
	dstIntensity = equalizeHistIntensity(src);
	imshow(&quot;src image&quot;, src);
	imshow(&quot;dstChannel image&quot;, dstChannel);
	imshow(&quot;dstIntensity image&quot;, dstIntensity);
	waitKey(0);
	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> cv2

<span class="token comment"># 颜色通道分别进行均衡化</span>
<span class="token keyword">def</span> <span class="token function">equalizeHistChannel</span><span class="token punctuation">(</span>inputImage<span class="token punctuation">)</span><span class="token punctuation">:</span>
    channels <span class="token operator">=</span> cv2<span class="token punctuation">.</span>split<span class="token punctuation">(</span>inputImage<span class="token punctuation">)</span>

    <span class="token comment"># 各个通道图像进行直方图均衡</span>
    cv2<span class="token punctuation">.</span>equalizeHist<span class="token punctuation">(</span>channels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>equalizeHist<span class="token punctuation">(</span>channels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>equalizeHist<span class="token punctuation">(</span>channels<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment"># 合并结果</span>
    result <span class="token operator">=</span> cv2<span class="token punctuation">.</span>merge<span class="token punctuation">(</span>channels<span class="token punctuation">)</span>

    <span class="token keyword">return</span> result

<span class="token comment"># 仅对亮度通道进行均衡化</span>
<span class="token keyword">def</span> <span class="token function">equalizeHistIntensity</span><span class="token punctuation">(</span>inputImage<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 将bgr格式转换为yuv444</span>
    inputImage <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>inputImage<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2YUV<span class="token punctuation">)</span>

    channels <span class="token operator">=</span> cv2<span class="token punctuation">.</span>split<span class="token punctuation">(</span>inputImage<span class="token punctuation">)</span>
    <span class="token comment"># 均衡化亮度通道</span>
    cv2<span class="token punctuation">.</span>equalizeHist<span class="token punctuation">(</span>channels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment"># 合并结果</span>
    result <span class="token operator">=</span> cv2<span class="token punctuation">.</span>merge<span class="token punctuation">(</span>channels<span class="token punctuation">)</span>
    result <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>result<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_YUV2BGR<span class="token punctuation">)</span>

    <span class="token keyword">return</span> result


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    imgpath <span class="token operator">=</span> <span class="token string">&quot;image/lena.jpg&quot;</span>
    src <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgpath<span class="token punctuation">)</span>
    <span class="token keyword">if</span> src <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the image:&#39;</span><span class="token punctuation">,</span> imgpath<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    dstChannel <span class="token operator">=</span> equalizeHistChannel<span class="token punctuation">(</span>src<span class="token punctuation">)</span>
    dstIntensity <span class="token operator">=</span> equalizeHistIntensity<span class="token punctuation">(</span>src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;src image&quot;</span><span class="token punctuation">,</span> src<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;dstChannel image&quot;</span><span class="token punctuation">,</span> dstChannel<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;dstIntensity image&quot;</span><span class="token punctuation">,</span> dstIntensity<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">0</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下所示，可以看到颜色通道分别均衡化会导致最终合成的图片颜色失真，而仅对亮度通道均衡化则不会。这是因为R、G、B的值是表示亮度，通过对RGB的变化以及它们相互之间的叠加可以得到不同颜色。256级的RGB色彩能够组合约1678（2的24次方）万种色彩，通常简称为千万色或24位色。颜色均衡化是非线性过程，对RGB分别进行均衡化会产生不同的效应，最终导致合成的颜色出现变化。</p><table><thead><tr><th>类型</th><th>结果</th></tr></thead><tbody><tr><td>输入图片</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img1_1.jpg" alt="" loading="lazy"></td></tr><tr><td>颜色通道分别均衡化</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_7.jpg" alt="" loading="lazy"></td></tr><tr><td>仅对亮度通道均衡化</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/img2_8.jpg" alt="" loading="lazy"></td></tr></tbody></table><h2 id="_3-直方图比较" tabindex="-1"><a class="header-anchor" href="#_3-直方图比较" aria-hidden="true">#</a> 3 直方图比较</h2><p>我们可以通过比较两幅图片的直方图来衡量两张图片之间的相似程度。OpenCV提供了compareHist函数来实现直方图的比较，也提供了多种直方图度量标准。这些度量标准的取值如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>enum HistCompMethods {
    HISTCMP_CORREL        = 0,  // 相关性比较
    HISTCMP_CHISQR        = 1,  // 卡方比较
    HISTCMP_INTERSECT     = 2, // 交集比较
    HISTCMP_BHATTACHARYYA = 3, // 巴氏距离
    HISTCMP_HELLINGER     = HISTCMP_BHATTACHARYYA, // 等同于巴氏距离
    HISTCMP_CHISQR_ALT    = 4, // 替代卡方：通常用于纹理比较。
    HISTCMP_KL_DIV        = 5 //  KL散度
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),O={href:"https://blog.csdn.net/LuohenYJ/article/details/119392091",target:"_blank",rel:"noopener noreferrer"},M=e(`<p>下面的代码展示了compareHist函数的使用方式，代码综合hsv空间的h通道（色调）和s通道（饱和度）计算图像的颜色直方图。</p><p><strong>C++</strong></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/highgui.hpp&quot;
#include &quot;opencv2/imgproc.hpp&quot;
#include &lt;iostream&gt;
using namespace std;
using namespace cv;

int main()
{
	string imgs[] = { &quot;image/lena.jpg&quot;, &quot;image/lena_resize.jpg&quot;, &quot;image/lena_flip.jpg&quot;,&quot;image/test.jpg&quot; };
	Mat src_base = imread(imgs[0]);
	Mat src_test1 = imread(imgs[1]);
	Mat src_test2 = imread(imgs[2]);
	Mat src_test3 = imread(imgs[3]);
	if (src_base.empty() || src_test1.empty() || src_test2.empty() || src_test3.empty())
	{
		cout &lt;&lt; &quot;Could not open or find the images!\\n&quot; &lt;&lt; endl;
		return -1;
	}
	// 将图片转换到hsv空间
	Mat hsv_base, hsv_test1, hsv_test2, hsv_test3;
	cvtColor(src_base, hsv_base, COLOR_BGR2HSV);
	cvtColor(src_test1, hsv_test1, COLOR_BGR2HSV);
	cvtColor(src_test2, hsv_test2, COLOR_BGR2HSV);
	cvtColor(src_test3, hsv_test3, COLOR_BGR2HSV);
	int h_bins = 50, s_bins = 60;
	int histSize[] = { h_bins, s_bins };
	// hue值变化范围为0到179，saturation值变化范围为0到255
	float h_ranges[] = { 0, 180 };
	float s_ranges[] = { 0, 256 };
	const float* ranges[] = { h_ranges, s_ranges };
	// 使用前两个通道计算直方图
	int channels[] = { 0, 1 };
	Mat hist_base, hist_half_down, hist_test1, hist_test2, hist_test3;
	calcHist(&amp;hsv_base, 1, channels, Mat(), hist_base, 2, histSize, ranges, true, false);
	normalize(hist_base, hist_base, 0, 1, NORM_MINMAX, -1, Mat());
	calcHist(&amp;hsv_test1, 1, channels, Mat(), hist_test1, 2, histSize, ranges, true, false);
	normalize(hist_test1, hist_test1, 0, 1, NORM_MINMAX, -1, Mat());
	calcHist(&amp;hsv_test2, 1, channels, Mat(), hist_test2, 2, histSize, ranges, true, false);
	normalize(hist_test2, hist_test2, 0, 1, NORM_MINMAX, -1, Mat());
	calcHist(&amp;hsv_test3, 1, channels, Mat(), hist_test3, 2, histSize, ranges, true, false);
	normalize(hist_test3, hist_test3, 0, 1, NORM_MINMAX, -1, Mat());
	// 可以查看枚举变量HistCompMethods中有多少种compare_method方法;
	for (int compare_method = 0; compare_method &lt; 6; compare_method++)
	{
		// 不同方法的结果表示含义不一样
		double base_base = compareHist(hist_base, hist_base, compare_method);
		double base_test1 = compareHist(hist_base, hist_test1, compare_method);
		double base_test2 = compareHist(hist_base, hist_test2, compare_method);
		double base_test3 = compareHist(hist_base, hist_test3, compare_method);
		printf(&quot;method[%d]: base_base : %.3f \\t base_test1: %.3f \\t base_test2: %.3f \\t base_test3: %.3f \\n&quot;, compare_method, base_base, base_test1, base_test2, base_test3);
	}
	printf(&quot;Done \\n&quot;);
	system(&quot;pause&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> cv2

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    imgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;image/lena.jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;image/lena_resize.jpg&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;image/lena_flip.jpg&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;image/test.jpg&quot;</span><span class="token punctuation">]</span>
    src_base <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    src_test1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    src_test2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    src_test3 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imgs<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> src_base <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> src_test1 <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> src_test2 <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> src_test3 <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the images!&#39;</span><span class="token punctuation">)</span>
        exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment"># 将图片转换到hsv空间</span>
    hsv_base <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src_base<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    hsv_test1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src_test1<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    hsv_test2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src_test2<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    hsv_test3 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>src_test3<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    h_bins <span class="token operator">=</span> <span class="token number">50</span>
    s_bins <span class="token operator">=</span> <span class="token number">60</span>
    histSize <span class="token operator">=</span> <span class="token punctuation">[</span>h_bins<span class="token punctuation">,</span> s_bins<span class="token punctuation">]</span>
    <span class="token comment"># hue值变化范围为0到179，saturation值变化范围为0到255</span>
    h_ranges <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">]</span>
    s_ranges <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">]</span>
    <span class="token comment"># 合并</span>
    ranges <span class="token operator">=</span> h_ranges <span class="token operator">+</span> s_ranges  
    <span class="token comment"># 使用前两个通道计算直方图</span>
    channels <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
    hist_base <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span><span class="token punctuation">[</span>hsv_base<span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
                            histSize<span class="token punctuation">,</span> ranges<span class="token punctuation">,</span> accumulate<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>hist_base<span class="token punctuation">,</span> hist_base<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    hist_test1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span><span class="token punctuation">[</span>hsv_test1<span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
                             histSize<span class="token punctuation">,</span> ranges<span class="token punctuation">,</span> accumulate<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>hist_test1<span class="token punctuation">,</span> hist_test1<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    hist_test2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span><span class="token punctuation">[</span>hsv_test2<span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
                             histSize<span class="token punctuation">,</span> ranges<span class="token punctuation">,</span> accumulate<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>hist_test2<span class="token punctuation">,</span> hist_test2<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    hist_test3 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span><span class="token punctuation">[</span>hsv_test3<span class="token punctuation">]</span><span class="token punctuation">,</span> channels<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
                             histSize<span class="token punctuation">,</span> ranges<span class="token punctuation">,</span> accumulate<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>hist_test3<span class="token punctuation">,</span> hist_test3<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> beta<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> norm_type<span class="token operator">=</span>cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    <span class="token keyword">for</span> compare_method <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        base_base <span class="token operator">=</span> cv2<span class="token punctuation">.</span>compareHist<span class="token punctuation">(</span>hist_base<span class="token punctuation">,</span> hist_base<span class="token punctuation">,</span> compare_method<span class="token punctuation">)</span>
        base_test1 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>compareHist<span class="token punctuation">(</span>hist_base<span class="token punctuation">,</span> hist_test1<span class="token punctuation">,</span> compare_method<span class="token punctuation">)</span>
        base_test2 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>compareHist<span class="token punctuation">(</span>hist_base<span class="token punctuation">,</span> hist_test2<span class="token punctuation">,</span> compare_method<span class="token punctuation">)</span>
        base_test3 <span class="token operator">=</span> cv2<span class="token punctuation">.</span>compareHist<span class="token punctuation">(</span>hist_base<span class="token punctuation">,</span> hist_test3<span class="token punctuation">,</span> compare_method<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;method[%s]: base_base : %.3f \\t base_test1: %.3f \\t base_test2: %.3f \\t base_test3: %.3f \\n&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>
            compare_method<span class="token punctuation">,</span> base_base<span class="token punctuation">,</span> base_test1<span class="token punctuation">,</span> base_test2<span class="token punctuation">,</span> base_test3<span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Done \\n&quot;</span><span class="token punctuation">)</span>
    
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所对比的图片及其在代码中的标识如下所示。其中base图片和test1、test2图片较为相似。test1为base的缩放图，test2是base的水平翻转结果，test3是另外一张完全不同于base的图片。</p><table><thead><tr><th>名字</th><th>图片</th><th>标识</th></tr></thead><tbody><tr><td>lena.jpg</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/lena.jpg" alt="" loading="lazy"></td><td>base</td></tr><tr><td>lena_resize.jpg</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/lena_resize.jpg" alt="" loading="lazy"></td><td>test1</td></tr><tr><td>lena_flip.jpg</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/lena_flip.jpg" alt="" loading="lazy"></td><td>test2</td></tr><tr><td>test.jpg</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/test.jpg" alt="" loading="lazy"></td><td>test3</td></tr></tbody></table><p>识别结果如下，各种方法的评价方式不一样。其中base_base表示base图和base图比较的结果，识别结果大体正确。关于base与test1、test2的对比结果，可以看出来颜色直方图对于图像大小、旋转具有尺寸不变性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>method[0]: base_base : 1.000     base_test1: 0.995       base_test2: 0.998       base_test3: -0.005
method[1]: base_base : 0.000     base_test1: 3.911       base_test2: 0.525       base_test3: 40.661
method[2]: base_base : 40.661    base_test1: 33.850      base_test2: 38.536      base_test3: 0.000
method[3]: base_base : 0.000     base_test1: 0.087       base_test2: 0.046       base_test3: 1.000
method[4]: base_base : 0.000     base_test1: 2.814       base_test2: 0.622       base_test3: 83.835
method[5]: base_base : 0.000     base_test1: 8.674       base_test2: 2.128       base_test3: 864.505
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-反向投影" tabindex="-1"><a class="header-anchor" href="#_4-反向投影" aria-hidden="true">#</a> 4 反向投影</h2>`,10),R={href:"https://ieeexplore.ieee.org/document/139558",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.cnblogs.com/bjxqmy/p/12452420.html",target:"_blank",rel:"noopener noreferrer"},H={href:"https://blog.csdn.net/hysterisis/article/details/113097507",target:"_blank",rel:"noopener noreferrer"},V=e(`<p><strong>C++</strong></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;opencv2/imgproc.hpp&quot;
#include &quot;opencv2/imgcodecs.hpp&quot;
#include &quot;opencv2/highgui.hpp&quot;
#include &lt;iostream&gt;
using namespace cv;
using namespace std;
int main()
{
	// 感兴趣区域图片
	string roipath = &quot;image/test3.jpg&quot;;
	// 目标图片
	string targetpath = &quot;image/test2.jpg&quot;;
	Mat target = imread(targetpath);
	Mat roi = imread(roipath);
	if (target.empty() || roi.empty())
	{
		cout &lt;&lt; &quot;Could not open or find the images!\\n&quot; &lt;&lt; endl;
		return -1;
	}

	Mat hsv, hsvt;
	cvtColor(roi, hsv, COLOR_BGR2HSV);
	cvtColor(target, hsvt, COLOR_BGR2HSV);
	// 使用前两个通道计算直方图
	int channels[] = { 0, 1 };
	// 计算颜色直方图
	Mat roihist;
	int h_bins = 180, s_bins = 256;
	int histSize[] = { h_bins, s_bins };
	// hue值变化范围为0到179，saturation值变化范围为0到255
	float h_ranges[] = { 0, 180 };
	float s_ranges[] = { 0, 256 };
	const float* ranges[] = { h_ranges, s_ranges };
	calcHist(&amp;hsv, 1, channels, Mat(), roihist, 2, histSize, ranges, true, false);
	// 归一化图片
	normalize(roihist, roihist, 0, 255, NORM_MINMAX, -1, Mat());

	// 返回匹配结果图像，dst为一张二值图，白色区域表示匹配到的目标
	Mat dst;
	calcBackProject(&amp;hsvt, 1, channels, roihist, dst, ranges, 1);

	// 应用线性滤波器，理解成去噪就行了
	Mat disc = getStructuringElement(MORPH_ELLIPSE, Size(7, 7));
	filter2D(dst, dst, -1, disc);

	// 阈值过滤
	Mat thresh;
	threshold(dst, thresh, 50, 255, 0);

	// 将thresh转换为3通道图
	Mat thresh_group[3] = { thresh, thresh, thresh };
	cv::merge(thresh_group, 3, thresh);
	imwrite(&quot;thresh.jpg&quot;, thresh);
	// 从图片中提取感兴趣区域
	Mat res;
	bitwise_and(target, thresh, res);
	imshow(&quot;target&quot;, target);
	imshow(&quot;thresh&quot;, thresh);
	imshow(&quot;res&quot;, res);
	waitKey(0);
	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> cv2


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 感兴趣区域图片</span>
    roi <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&#39;image/test3.jpg&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 目标图片</span>
    target <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&#39;image/test2.jpg&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> roi <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">or</span> target <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Could not open or find the images!&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
    hsv <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>roi<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    hsvt <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>target<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2HSV<span class="token punctuation">)</span>
    <span class="token comment"># 计算颜色直方图</span>
    roihist <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcHist<span class="token punctuation">(</span><span class="token punctuation">[</span>hsv<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">180</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment"># 归一化图片</span>
    cv2<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span>roihist<span class="token punctuation">,</span> roihist<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>NORM_MINMAX<span class="token punctuation">)</span>
    <span class="token comment"># 返回匹配结果图像，dst为一张二值图，白色区域表示匹配到的目标</span>
    dst <span class="token operator">=</span> cv2<span class="token punctuation">.</span>calcBackProject<span class="token punctuation">(</span><span class="token punctuation">[</span>hsvt<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> roihist<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">180</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment"># 应用线性滤波器，理解成去噪就行了</span>
    disc <span class="token operator">=</span> cv2<span class="token punctuation">.</span>getStructuringElement<span class="token punctuation">(</span>cv2<span class="token punctuation">.</span>MORPH_ELLIPSE<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>filter2D<span class="token punctuation">(</span>dst<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> disc<span class="token punctuation">,</span> dst<span class="token punctuation">)</span>
    <span class="token comment"># 阈值过滤</span>
    ret<span class="token punctuation">,</span> thresh <span class="token operator">=</span> cv2<span class="token punctuation">.</span>threshold<span class="token punctuation">(</span>dst<span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token comment"># 将thresh转换为3通道图</span>
    thresh <span class="token operator">=</span> cv2<span class="token punctuation">.</span>merge<span class="token punctuation">(</span><span class="token punctuation">(</span>thresh<span class="token punctuation">,</span> thresh<span class="token punctuation">,</span> thresh<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 从图片中提取感兴趣区域</span>
    res <span class="token operator">=</span> cv2<span class="token punctuation">.</span>bitwise_and<span class="token punctuation">(</span>target<span class="token punctuation">,</span> thresh<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">,</span> target<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;thresh&quot;</span><span class="token punctuation">,</span> thresh<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;res&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token number">0</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下所示，可以看到反向投影结果是不太准的，毕竟是很简单也是很古老的的算法，了解下就好。真正想要实现图像分割，还是看看深度学习。</p><table><thead><tr><th>类型</th><th>结果</th></tr></thead><tbody><tr><td>感兴趣对象</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/test3.jpg" alt="" loading="lazy"></td></tr><tr><td>输入对象</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/test2.jpg" alt="" loading="lazy"></td></tr><tr><td>反向投影结果</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/thresh.jpg" alt="" loading="lazy"></td></tr><tr><td>匹配结果</td><td><img src="https://gitcode.net/LuohenYJ/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]52 在OpenCV中使用颜色直方图/image/res.jpg" alt="" loading="lazy"></td></tr></tbody></table><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2>`,7),S={href:"https://cloud.tencent.com/developer/article/1769742",target:"_blank",rel:"noopener noreferrer"},I={href:"https://docs.opencv.org/4.4.0/d6/dc7/group__imgproc__hist.html#gad689d2607b7b3889453804f414ab1018",target:"_blank",rel:"noopener noreferrer"},N={href:"https://zhuanlan.zhihu.com/p/382430357",target:"_blank",rel:"noopener noreferrer"},L={href:"https://www.cnblogs.com/Imageshop/archive/2013/04/07/3006334.html",target:"_blank",rel:"noopener noreferrer"},j={href:"https://blog.csdn.net/LuohenYJ/article/details/84957101",target:"_blank",rel:"noopener noreferrer"},A={href:"https://blog.csdn.net/LuohenYJ/article/details/88237008",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://blog.csdn.net/LuohenYJ/article/details/119392091",target:"_blank",rel:"noopener noreferrer"},x={href:"https://ieeexplore.ieee.org/document/139558",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.cnblogs.com/bjxqmy/p/12452420.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://blog.csdn.net/hysterisis/article/details/113097507",target:"_blank",rel:"noopener noreferrer"};function P(D,E){const a=p("ExternalLinkIcon");return c(),o("div",null,[u,n("p",null,[s("颜色直方图是一种常见的图像特征，顾名思义颜色直方图就是用来反映图像颜色组成分布的直方图。颜色直方图的横轴表示像素值或像素值范围，纵轴表示该像素值范围内像素点的个数或出现频率。颜色直方图属于计算机视觉中的基础概念，其常常被应用于图像相似度计算，"),n("a",r,[s("视觉词袋"),t(a)]),s("，图像颜色平衡等。颜色直方图可以基于不同的颜色空间和坐标系来实现，本文主要基于RGB颜色空间和直角坐标系计算颜色直方图。")]),n("p",null,[s("颜色直方图是图像的一种全局颜色特征，优点为方法简单、计算迅速、对旋转和尺度等变化不敏感，缺点是忽略了图像的空间分布信息以及用于相似度对比时往往不那么准确。当然对于颜色直方图有一些改进的变种算法，但是本文只介绍最原始的颜色直方图计算方法。因为改进过的算法提效不高，还不如直接用深度学习。本文主要内容有：颜色直方图的计算、图像均衡化、直方图比较和反向投影，涉及到用于直方图计算的OpenCV函数出自"),n("a",d,[s("OpenCV_Histograms"),t(a)]),s("。")]),v,m,n("ul",null,[n("li",null,[s("github: "),n("a",k,[s("OpenCV-Practical-Exercise"),t(a)])]),n("li",null,[s("gitee(备份，主要是下载速度快): "),n("a",b,[s("OpenCV-Practical-Exercise-gitee"),t(a)])])]),h,n("p",null,[s("图像均衡化是一种提高图像对比度的方法，通过变换函数将原图像的直方图修正为分布比较均匀的直方图，从而改变图像整体偏暗或整体偏亮，灰度层次不丰富的情况。图像均衡化的具体原理见："),n("a",_,[s("直方图均衡化详解"),t(a)]),s("。在OpenCV中提供equalizeHist函数实现直方图的均衡化，但是equalizeHist函数只对灰度图进行运算。")]),g,n("p",null,[s("但是标准的直方图均衡会导致图中部分区域由于对比度增强过大而成为噪点；或导致一些区域调整后变得更暗/更亮而丢失细节信息。所以面对这种情况，OpenCV提供自适应直方图均衡以获得更好的结果。 自适应直方图均衡的工作原理是将图像划分为MxN个网格，然后将直方图均衡局部应用于每个网格，同时设置对比度限制阈值。结果是输出图像总体上具有更高的对比度（理想情况下）并抑制噪声。OpenCV实现自适应直方图的代码结果如上所示，可以看到直方图分布更加平滑。自适应直方图均衡缺点是效果很依靠手动调整参数（传统图像算法的通病），其具体原理见"),n("a",w,[s("限制对比度自适应直方图均衡化算法原理、实现及效果"),t(a)]),s("，实现代码如下：")]),y,n("p",null,[s("如果想对彩色图进行直方图均衡化，则有两种办法：1）分别对RGB三通道均衡化，再组合通道图输出结果；2）将图像颜色空间转化为YUV，YCbCr等颜色空间，仅对亮度通道进行均衡化，最后组合通道图并转回RGB空间。在这里推荐使用第二种办法，具体原因看下面示例代码的结果。所用的转换颜色空间是YUV颜色空间，想要进一步了解YUV颜色空间见"),n("a",C,[s("YUV图像处理入门1"),t(a)]),s("及其他颜色空间见"),n("a",q,[s("OpenCV中的颜色空间"),t(a)]),s("。")]),f,n("p",null,[s("以上评价指标可以自行搜索查询相关含义，具体使用哪个评价指标好完全取决于数据集和目标，所以需要通过实验来确定效果最佳的指标。当然也可以自己设计评价指标，不过通过用直方图比较来衡量图片相似性本身效果不太好，各种评价指标都大差不差。直方图比较特点就是快，简单但是不太准。如果想了解其他基于图像处理算法的图片相似度比较方法可以参考"),n("a",O,[s("基于图像哈希构建图像相似度对比算法"),t(a)]),s("。")]),M,n("p",null,[s("反向投影（Histogram Backprojection）于1990年在论文"),n("a",R,[s("Indexing via color histograms"),t(a)]),s("提出。反向投影的作用简单来说，就是进行图像分割或在图像中查找感兴趣的对象。通过创建了一个与输入图像大小相同（但只有一个通道）的图像，该图片每个像素对应于该像素属于该兴趣对象的概率。一般步骤为计算某一感兴趣区域特征的直方图模型，然后使用这个直方图模型去寻找图像中和该特征相似的区域。在OpenCV中使用calcBackProject函数来实现反向投影。关于calcBackProject函数介绍见"),n("a",z,[s("calcBackProject 反向投影"),t(a)]),s("。")]),n("p",null,[s("下面示例展示了反向投影的代码，代码以某块草地图片为感兴趣对象，检索输入图像中包含类似草地的区域。代码中涉及到的fliter2D函数使用见"),n("a",H,[s("cv.filter2D()函数详解"),t(a)]),s("。")]),V,n("ul",null,[n("li",null,[n("a",S,[s("视觉词袋"),t(a)])]),n("li",null,[n("a",I,[s("OpenCV_Histograms"),t(a)])]),n("li",null,[n("a",N,[s("图像直方图均衡化详解"),t(a)])]),n("li",null,[n("a",L,[s("限制对比度自适应直方图均衡化算法原理、实现及效果"),t(a)])]),n("li",null,[n("a",j,[s("YUV图像处理入门1"),t(a)])]),n("li",null,[n("a",A,[s("OpenCV中的颜色空间"),t(a)])]),n("li",null,[n("a",Y,[s("基于图像哈希构建图像相似度对比算法"),t(a)])]),n("li",null,[n("a",x,[s("Indexing via color histograms"),t(a)])]),n("li",null,[n("a",B,[s("calcBackProject 反向投影"),t(a)])]),n("li",null,[n("a",G,[s("cv.filter2D() 函数详解"),t(a)])])])])}const X=i(l,[["render",P],["__file","2022-12-01-_OpenCV实战_52 在OpenCV中使用颜色直方图.html.vue"]]);export{X as default};
