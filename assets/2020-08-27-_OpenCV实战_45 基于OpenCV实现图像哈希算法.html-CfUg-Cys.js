import{_ as a,r as s,o as r,c as d,a as e,b as t,d as i,e as l}from"./app-7i6QNW5x.js";const o={},c=e("h1",{id:"opencv实战-45-基于opencv实现图像哈希算法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-45-基于opencv实现图像哈希算法"},[e("span",null,"[OpenCV实战]45 基于OpenCV实现图像哈希算法")])],-1),h=e("p",null,"目前有许多算法来衡量两幅图像的相似性，本文主要介绍在工程领域最常用的图像相似性算法评价算法：图像哈希算法(img hash)。图像哈希算法通过获取图像的哈希值并比较两幅图像的哈希值的汉明距离来衡量两幅图像是否相似。两幅图像越相似，其哈希值的汉明距离越小，通过这种方式就能够比较两幅图像是否相似。在实际应用中，图像哈希算法可以用于图片检索，重复图片剔除，以图搜图以及图片相似度比较。",-1),u=e("p",null,"为什么图像哈希算法能够评估两幅图像的相似性，这就需要从哈希值说起，哈希值计算算法的本质就是对原始数据进行有损压缩，有损压缩后的固定字长能够作为唯一标识来标识原始数据，这个唯一标识就是哈希值。通常改变原始数据任意一个部分，哈希值都将不同。关于哈希值的具体介绍见：",-1),m={href:"https://zhuanlan.zhihu.com/p/49435564",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"但是计算图像哈希值的方法并不唯一，因此有不同的图像哈希计算方法。OpenCV contrib库中的img_hash模块提供计算两种图像的哈希值并比较两张图像相似性的算法。img_hash模块主要移植自PHash库，其官方代码仓库介绍见：",-1),p={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/img_hash",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"img_hash模块提供了多种图像哈希算法，具体介绍如下：",-1),b=e("ul",null,[e("li",null,"Average hash (also called Different hash)"),e("li",null,"PHash (also called Perceptual hash)"),e("li",null,"Marr Hildreth Hash"),e("li",null,"Radial Variance Hash"),e("li",null,"Block Mean Hash (modes 0 and 1)"),e("li",null,"Color Moment Hash (this is the one and only hash algorithm resist to rotation attack(-90~90 degree))")],-1),_=e("p",null,"PHash是工程实践最常用的图像哈希算法。本文主要介绍img_hash中的几种哈希算法的使用，关于图像哈希进一步介绍见：",-1),E={href:"https://blog.csdn.net/zhaoidong/article/details/100969837",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,"本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：",-1),q={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},H=e("p",null,"本文所有代码见：",-1),k={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},C=l('<h2 id="_1-方法说明与代码实现" tabindex="-1"><a class="header-anchor" href="#_1-方法说明与代码实现"><span>1 方法说明与代码实现</span></a></h2><h3 id="_1-1-方法说明" tabindex="-1"><a class="header-anchor" href="#_1-1-方法说明"><span>1.1 方法说明</span></a></h3><p>图像哈希算法计算过程如下图所示，以pHash为例，先将将图片缩小到8x8的尺寸，总共64个像素，然后通过pHash函数计算hash值，得到一个唯一标识码hash码，hash码包括8个uint8数值，组合在一起，就构成了一个64位的整数。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]45 基于OpenCV实现图像哈希算法/20200827192903640.jpg" alt="在这里插入图片描述" loading="lazy"></p><p>pHash可以比较不同大小图像的hash值。通过计算两幅图像hash码的汉明距离，得到结果如下表所示：</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">img1</th><th style="text-align:center;">img2</th><th style="text-align:center;">img3</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>img1</strong></td><td style="text-align:center;">0</td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><strong>img2</strong></td><td style="text-align:center;">1.0</td><td style="text-align:center;">0</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><strong>img3</strong></td><td style="text-align:center;">29.0</td><td style="text-align:center;">30.0</td><td style="text-align:center;">0</td></tr></tbody></table><p>汉明距离越小，表示两幅图像越接近，可以看到img1和img2最相近，img2为img1的灰色版本。</p><p>OpenCV img_hash模块各种哈希算法的特点和文献如下所示：</p>',7),V={href:"http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html",target:"_blank",rel:"noopener noreferrer"},y={href:"http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.mendeley.com/catalogue/6b08cb28-43a1-3e2f-b0df-3e2b436ee5f2/",target:"_blank",rel:"noopener noreferrer"},A={href:"http://www.phash.org/docs/pubs/thesis_zauner.pdf",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.mendeley.com/catalogue/6b08cb28-43a1-3e2f-b0df-3e2b436ee5f2/",target:"_blank",rel:"noopener noreferrer"},w={href:"http://www.phash.org/docs/pubs/thesis_zauner.pdf",target:"_blank",rel:"noopener noreferrer"},M=l(`<p>本文提供img_hash模块的C++和Python代码示例。实际调用方法如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 创建AverageHash类
Ptr&lt;AverageHash&gt; func= AverageHash::create;
// 计算图a的哈希值
func-&gt;compute(a, hashA);
// 计算图b的哈希值
func-&gt;compute(b, hashB);
// 比较两张图像哈希值的距离
func-&gt;compare(hashA, hashB);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 创建类
hashFun = cv2.img_hash.AverageHash_create()
# 计算图a的哈希值
hashA = hashFun.compute(a)
# 计算图b的哈希值
hashB = hashFun.compute(b)
# 比较两张图像哈希值的距离
hashFun.compare(hashA, hashB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-代码实现" tabindex="-1"><a class="header-anchor" href="#_1-2-代码实现"><span>1.2 代码实现</span></a></h3><p>C++和Python实现都分别提供，结果如1.1所示，但是C++代码用了类模板。通过ImgHashBase基础类，能够实现代码重复使用。</p><p>代码测试的图像已经在1.1部分展示，img1为基准图像，img2为img1的灰色版本，img3是另外一张完全不同的彩色图。</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/img_hash.hpp&gt;

#include &lt;iostream&gt;

using namespace cv;
using namespace cv::img_hash;
using namespace std;

template &lt;typename T&gt;
inline void test_one(const std::string &amp;title, const Mat &amp;a, const Mat &amp;b)
{
	cout &lt;&lt; &quot;=== &quot; &lt;&lt; title &lt;&lt; &quot; ===&quot; &lt;&lt; endl;
	TickMeter tick;
	Mat hashA, hashB;
	// 模板方便重复利用
	Ptr&lt;ImgHashBase&gt; func;
	func = T::create();

	tick.reset();
	tick.start();
	// 计算图a的哈希值
	func-&gt;compute(a, hashA);
	tick.stop();
	cout &lt;&lt; &quot;compute1: &quot; &lt;&lt; tick.getTimeMilli() &lt;&lt; &quot; ms&quot; &lt;&lt; endl;

	tick.reset();
	tick.start();
	// 计算图b的哈希值
	func-&gt;compute(b, hashB);
	tick.stop();
	cout &lt;&lt; &quot;compute2: &quot; &lt;&lt; tick.getTimeMilli() &lt;&lt; &quot; ms&quot; &lt;&lt; endl;

	// 比较两张图像哈希值的距离
	cout &lt;&lt; &quot;compare: &quot; &lt;&lt; func-&gt;compare(hashA, hashB) &lt;&lt; endl &lt;&lt; endl;
}

int main()
{
	// 打开两张图像进行相似度比较
	Mat input = imread(&quot;./image/img1.jpg&quot;);
	Mat target = imread(&quot;./image/img2.jpg&quot;);

	// 通过不同方法比较图像相似性
	test_one&lt;AverageHash&gt;(&quot;AverageHash&quot;, input, target);
	test_one&lt;PHash&gt;(&quot;PHash&quot;, input, target);
	test_one&lt;MarrHildrethHash&gt;(&quot;MarrHildrethHash&quot;, input, target);
	test_one&lt;RadialVarianceHash&gt;(&quot;RadialVarianceHash&quot;, input, target);
	test_one&lt;BlockMeanHash&gt;(&quot;BlockMeanHash&quot;, input, target);
	test_one&lt;ColorMomentHash&gt;(&quot;ColorMomentHash&quot;, input, target);

	system(&quot;pause&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Thu Aug 27 19:03:21 2020

@author: luohenyueji
&quot;&quot;&quot;

import cv2


def test_one(title, a, b):
    # 创建类
    if &quot;AverageHash&quot; == title:
        hashFun = cv2.img_hash.AverageHash_create()
    elif &quot;PHash&quot; == title:
        hashFun = cv2.img_hash.PHash_create()
    elif &quot;MarrHildrethHash&quot; == title:
        hashFun = cv2.img_hash.MarrHildrethHash_create()
    elif &quot;RadialVarianceHash&quot; == title:
        hashFun = cv2.img_hash.RadialVarianceHash_create()
    elif &quot;BlockMeanHash&quot; == title:
        hashFun = cv2.img_hash.BlockMeanHash_create()
    elif &quot;ColorMomentHash&quot; == title:
        hashFun = cv2.img_hash.ColorMomentHash_create()

    tick = cv2.TickMeter()
    print(&quot;=== &quot; + title + &quot; ===&quot;)

    tick.reset()
    tick.start()
    # # 计算图a的哈希值
    hashA = hashFun.compute(a)
    tick.stop()
    print(&quot;compute1: &quot; + str(tick.getTimeMilli()) + &quot; ms&quot;)

    tick.reset()
    tick.start()
    # 计算图b的哈希值
    hashB = hashFun.compute(b)
    tick.stop()
    print(&quot;compute2: &quot; + str(tick.getTimeMilli()) + &quot; ms&quot;)
    # 比较两张图像哈希值的距离
    print(&quot;compare: &quot; + str(hashFun.compare(hashA, hashB)))


def main():
    inputImg = cv2.imread(&quot;./image/img1.jpg&quot;)
    targetImg = cv2.imread(&quot;./image/img2.jpg&quot;)

    if inputImg is None or targetImg is None:
        print(&quot;check input image&quot;)
        return

    test_one(&quot;AverageHash&quot;, inputImg, targetImg)
    test_one(&quot;PHash&quot;, inputImg, targetImg)
    test_one(&quot;MarrHildrethHash&quot;, inputImg, targetImg)
    test_one(&quot;RadialVarianceHash&quot;, inputImg, targetImg)
    test_one(&quot;BlockMeanHash&quot;, inputImg, targetImg)
    test_one(&quot;ColorMomentHash&quot;, inputImg, targetImg)


if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-方法比较与选择" tabindex="-1"><a class="header-anchor" href="#_1-3-方法比较与选择"><span>1.3 方法比较与选择</span></a></h3><p>以img1为基准，img2与img1对比结果和img3与img1对比结果如下表所示。可以看到RadialVarianceHash和ColorMomentHash结果与事实不符，这主要因为RadialVarianceHash和ColorMomentHash通过像素点颜色值信息来计算哈希值，img2是灰色图与img1相差过大。</p><p>此外可以看到各种图像哈希算法的计算速度，在实际中PHash是个很不错的选择，快速且效果好。</p><table><thead><tr><th></th><th>img1/img2</th><th>img1/img3</th><th>result</th><th>speed/ms</th></tr></thead><tbody><tr><td>AverageHash</td><td>3</td><td>31</td><td>TRUE</td><td>0.0565</td></tr><tr><td>PHash</td><td>1</td><td>29</td><td>TRUE</td><td>0.072</td></tr><tr><td>MarrHildrethHash</td><td>28</td><td>283</td><td>TRUE</td><td>9.8433</td></tr><tr><td>RadialVarianceHash</td><td>0.989896</td><td>0.543267</td><td><strong>FALSE</strong></td><td>1.0259</td></tr><tr><td>BlockMeanHash</td><td>10</td><td>113</td><td>TRUE</td><td>0.694</td></tr><tr><td>ColorMomentHash</td><td>45.4928</td><td>16.7632</td><td><strong>FALSE</strong></td><td>3.39</td></tr></tbody></table><p>然而，PHash常用，并不代表其他算法没用。比如如果将img1水平翻转得到img4，如下图所示。那么将会得到完全不一样的结果，如下表所示。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]45 基于OpenCV实现图像哈希算法/20200827192923137.jpg?ref_type=heads" alt="在这里插入图片描述" loading="lazy"></p><table><thead><tr><th></th><th>img1/img3</th><th>img1/img4</th><th>result</th></tr></thead><tbody><tr><td>AverageHash</td><td>31</td><td>36</td><td>FALSE</td></tr><tr><td>PHash</td><td>29</td><td>36</td><td>FALSE</td></tr><tr><td>MarrHildrethHash</td><td>283</td><td>301</td><td>FALSE</td></tr><tr><td>RadialVarianceHash</td><td>0.543267</td><td>0.285715</td><td><strong>TRUE</strong></td></tr><tr><td>BlockMeanHash</td><td>113</td><td>139</td><td>FALSE</td></tr><tr><td>ColorMomentHash</td><td>16.7632</td><td>0.270448</td><td><strong>TRUE</strong></td></tr></tbody></table><p>导致以上情况的主要原因是，RadialVarianceHash和ColorMomentHash基于全局信息来计算hash值，其他算法基于局部信息来计算hash值。</p><p>总之在实际应用中，通过图像哈希值计算图像相似性比较粗糙，但是图像哈希值也是比较常用的图像相似性比较算法。现在图像相似性比较算法效果都很一般，即使用了深度学习如Siamese Network，效果也没有太大提高。因此在计算相似性前，都会进行图像对准和颜色转换，这一点是非常必要的。不过图像哈希算法在实际中计算固定场景效果还是很不错的。</p><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考"><span>2 参考</span></a></h2><h3 id="_2-1-参考代码" tabindex="-1"><a class="header-anchor" href="#_2-1-参考代码"><span>2.1 参考代码</span></a></h3>`,22),O={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/img_hash",target:"_blank",rel:"noopener noreferrer"},F=e("h3",{id:"_2-2-相关文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-2-相关文档"},[e("span",null,"2.2 相关文档")])],-1),I={href:"https://docs.opencv.org/master/d4/d93/group__img__hash.html",target:"_blank",rel:"noopener noreferrer"},P={href:"https://zhuanlan.zhihu.com/p/49435564",target:"_blank",rel:"noopener noreferrer"},R={href:"https://blog.csdn.net/zhaoidong/article/details/100969837",target:"_blank",rel:"noopener noreferrer"},T=e("h3",{id:"_2-3-相关文献",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-3-相关文献"},[e("span",null,"2.3 相关文献")])],-1),j={href:"http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html",target:"_blank",rel:"noopener noreferrer"},L={href:"http://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.mendeley.com/catalogue/6b08cb28-43a1-3e2f-b0df-3e2b436ee5f2/",target:"_blank",rel:"noopener noreferrer"},N={href:"http://www.phash.org/docs/pubs/thesis_zauner.pdf",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.mendeley.com/catalogue/6b08cb28-43a1-3e2f-b0df-3e2b436ee5f2/",target:"_blank",rel:"noopener noreferrer"},D={href:"http://www.phash.org/docs/pubs/thesis_zauner.pdf",target:"_blank",rel:"noopener noreferrer"};function U(Z,J){const n=s("ExternalLinkIcon");return r(),d("div",null,[c,h,u,e("blockquote",null,[e("p",null,[e("a",m,[t("通俗地理解哈希函数"),i(n)])])]),v,e("blockquote",null,[e("p",null,[e("a",p,[t("Image Hashing algorithms"),i(n)])])]),g,b,_,e("blockquote",null,[e("p",null,[e("a",E,[t("图片哈希概述（image hash）"),i(n)])])]),f,e("blockquote",null,[e("p",null,[e("a",q,[t("OpenCV_contrib库在windows下编译使用指南"),i(n)])])]),H,e("blockquote",null,[e("p",null,[e("a",k,[t("OpenCV-Practical-Exercise"),i(n)])])]),C,e("ol",null,[e("li",null,[e("a",V,[t("AverageHash"),i(n)]),t(" 基于像素均值计算哈希值，一种快速的图像哈希算法，但仅适用于简单情况。")]),e("li",null,[e("a",y,[t("PHash"),i(n)]),t(" AverageHash的改进版，比AverageHash慢，但可以适应更多的情况。")]),e("li",null,[e("a",B,[t("MarrHildrethHash"),i(n)]),t(" 基于Marr-Hildreth边缘算子计算哈希值，速度最慢，但更具区分性。")]),e("li",null,[e("a",A,[t("RadialVarianceHash"),i(n)]),t(" 基于Radon变换计算哈希值")]),e("li",null,[e("a",x,[t("BlockMeanHash"),i(n)]),t(" 基于块均值计算哈希值，与MarrHildrethHash在同一篇文章介绍。")]),e("li",null,[e("a",w,[t("ColorMomentHash"),i(n)]),t(" 基于颜色矩计算哈希值，与RadialVarianceHash在同一篇文章介绍。")])]),M,e("ul",null,[e("li",null,[e("blockquote",null,[e("p",null,[e("a",O,[t("Image Hashing algorithms"),i(n)])])])])]),F,e("ul",null,[e("li",null,[e("blockquote",null,[e("p",null,[e("a",I,[t("OpenCV img_hash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",P,[t("通俗地理解哈希函数"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",R,[t("图片哈希概述（image hash）"),i(n)])])])])]),T,e("ul",null,[e("li",null,[e("blockquote",null,[e("p",null,[e("a",j,[t("AverageHash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",L,[t("PHash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",z,[t("MarrHildrethHash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",N,[t("RadialVarianceHash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",S,[t("BlockMeanHash"),i(n)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",D,[t("ColorMomentHash"),i(n)])])])])])])}const G=a(o,[["render",U],["__file","2020-08-27-_OpenCV实战_45 基于OpenCV实现图像哈希算法.html.vue"]]),K=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-27-_OpenCV%E5%AE%9E%E6%88%98_45%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95.html","title":"[OpenCV实战]45 基于OpenCV实现图像哈希算法","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2020-08-27T19:32:15.000Z","tag":["OpenCV实战","OpenCV","图像处理"],"description":"[OpenCV实战]45 基于OpenCV实现图像哈希算法 目前有许多算法来衡量两幅图像的相似性，本文主要介绍在工程领域最常用的图像相似性算法评价算法：图像哈希算法(img hash)。图像哈希算法通过获取图像的哈希值并比较两幅图像的哈希值的汉明距离来衡量两幅图像是否相似。两幅图像越相似，其哈希值的汉明距离越小，通过这种方式就能够比较两幅图像是否相似。...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2020-08-27-_OpenCV%E5%AE%9E%E6%88%98_45%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]45 基于OpenCV实现图像哈希算法"}],["meta",{"property":"og:description","content":"[OpenCV实战]45 基于OpenCV实现图像哈希算法 目前有许多算法来衡量两幅图像的相似性，本文主要介绍在工程领域最常用的图像相似性算法评价算法：图像哈希算法(img hash)。图像哈希算法通过获取图像的哈希值并比较两幅图像的哈希值的汉明距离来衡量两幅图像是否相似。两幅图像越相似，其哈希值的汉明距离越小，通过这种方式就能够比较两幅图像是否相似。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D45%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95/20200827192903640.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2020-08-27T19:32:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]45 基于OpenCV实现图像哈希算法\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D45%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95/20200827192903640.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D45%20%E5%9F%BA%E4%BA%8EOpenCV%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%83%8F%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95/20200827192923137.jpg?ref_type=heads\\"],\\"datePublished\\":\\"2020-08-27T19:32:15.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 方法说明与代码实现","slug":"_1-方法说明与代码实现","link":"#_1-方法说明与代码实现","children":[{"level":3,"title":"1.1 方法说明","slug":"_1-1-方法说明","link":"#_1-1-方法说明","children":[]},{"level":3,"title":"1.2 代码实现","slug":"_1-2-代码实现","link":"#_1-2-代码实现","children":[]},{"level":3,"title":"1.3 方法比较与选择","slug":"_1-3-方法比较与选择","link":"#_1-3-方法比较与选择","children":[]}]},{"level":2,"title":"2 参考","slug":"_2-参考","link":"#_2-参考","children":[{"level":3,"title":"2.1 参考代码","slug":"_2-1-参考代码","link":"#_2-1-参考代码","children":[]},{"level":3,"title":"2.2 相关文档","slug":"_2-2-相关文档","link":"#_2-2-相关文档","children":[]},{"level":3,"title":"2.3 相关文献","slug":"_2-3-相关文献","link":"#_2-3-相关文献","children":[]}]}],"git":{},"readingTime":{"minutes":7.06,"words":2118},"filePathRelative":"blog/opencv/opencv实战/2020-08-27-[OpenCV实战]45 基于OpenCV实现图像哈希算法.md","localizedDate":"2020年8月28日","excerpt":"\\n<p>目前有许多算法来衡量两幅图像的相似性，本文主要介绍在工程领域最常用的图像相似性算法评价算法：图像哈希算法(img hash)。图像哈希算法通过获取图像的哈希值并比较两幅图像的哈希值的汉明距离来衡量两幅图像是否相似。两幅图像越相似，其哈希值的汉明距离越小，通过这种方式就能够比较两幅图像是否相似。在实际应用中，图像哈希算法可以用于图片检索，重复图片剔除，以图搜图以及图片相似度比较。</p>\\n<p>为什么图像哈希算法能够评估两幅图像的相似性，这就需要从哈希值说起，哈希值计算算法的本质就是对原始数据进行有损压缩，有损压缩后的固定字长能够作为唯一标识来标识原始数据，这个唯一标识就是哈希值。通常改变原始数据任意一个部分，哈希值都将不同。关于哈希值的具体介绍见：</p>","autoDesc":true}');export{G as comp,K as data};
