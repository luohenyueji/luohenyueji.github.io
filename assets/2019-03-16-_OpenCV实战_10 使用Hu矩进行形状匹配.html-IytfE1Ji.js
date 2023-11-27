import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as p,c as u,a as n,b as t,d as a,e as o}from"./app-MsA2k2kn.js";const l={},s=o('<h1 id="opencv实战-10-使用hu矩进行形状匹配" tabindex="-1"><a class="header-anchor" href="#opencv实战-10-使用hu矩进行形状匹配" aria-hidden="true">#</a> [OpenCV实战]10 使用Hu矩进行形状匹配</h1><p>在这篇文章中，我们将展示如何使用Hu Moments进行形状匹配。您将学习以下内容</p><ul><li>什么是图像矩？</li><li>如何计算图像矩？</li><li>什么是图像矩不变量（或Hu时刻）？</li><li>如何使用OpenCV计算图像的Hu图像矩？</li><li>如何使用Hu图像矩来找到两个形状之间的相似性。</li></ul><h2 id="_1-什么是图像矩" tabindex="-1"><a class="header-anchor" href="#_1-什么是图像矩" aria-hidden="true">#</a> <strong>1</strong> <strong>什么是图像矩？</strong></h2><p>图像矩是图像像素强度的加权平均值。让我们选择一个简单的例子来理解。</p><p>为简单起见，我们考虑单通道二进制图像 <em>I</em> 。位置处的像素强度（X，Y）为 <em>I</em> （X，Y）。二进制图像的I（X，Y）可以取值0或255。</p><p>最简单的图像矩可以这样计算：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220106.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们在上面的等式中所做的就是计算所有像素值的总和。换句话说，所有图像矩仅基于它们的值加权，而不是基于它们在图像中的位置。</p><p>对于二进制图像，可以以几种不同的方式解释上述矩:</p><ol><li>它是值白色像素的数量（即强度=255）。</li><li>它是代表图像中白色区域的面积。</li></ol><p>到目前为止，您可能不会对图像矩留下深刻印象，但这里有一些有趣的东西。图1包含三个二进制图像S（S0.png），旋转S（S5.png）和K（K0.png）</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>S图像和旋转S图像的图像矩非常接近，K的矩就大大不同。</p><p>对于两个相同的形状，上面的图像矩必然是相同的，但它不是一个充分的条件。我们可以很容易地构建两个图像，其中图像矩相同的，但它们看起来非常不同。</p><h2 id="_2-如何计算图像矩" tabindex="-1"><a class="header-anchor" href="#_2-如何计算图像矩" aria-hidden="true">#</a> <strong>2</strong> <strong>如何计算图像矩</strong></h2><h3 id="_2-1-质心获取" tabindex="-1"><a class="header-anchor" href="#_2-1-质心获取" aria-hidden="true">#</a> <strong>2.1</strong> <strong>质心获取</strong></h3><p>让我们看看一些更复杂的矩。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220118.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>i和j是整数。这种矩通常被称为图像几何矩，以区别于本文后面提到的中心矩。请注意，上述矩取决于像素的强度及其在图像中的位置。如此直观地说，这些矩正在捕捉一些形状的信息。</p><p>我们可以通过图像矩计算质心。使用以下公式计算质心：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220121.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220129.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其他信息查看：</p>',24),m={href:"https://blog.csdn.net/LuohenYJ/article/details/88599334",target:"_blank",rel:"noopener noreferrer"},c=o('<h3 id="_2-2-中心矩" tabindex="-1"><a class="header-anchor" href="#_2-2-中心矩" aria-hidden="true">#</a> <strong>2.2</strong> <strong>中心矩</strong></h3><p>中心矩非常类似于我们之前看到的几何矩，在几何矩的基础上我们需要减去质心坐标。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220139.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>请注意，上述中心矩是具有平移不变性的。换句话说，无论图像中的blob在哪里，如果形状相同，则中心矩是不变的。</p><p>如果我们还能让这个矩具有不变性，那会不会很酷？那么为此我们需要在中心矩添加标准化，得到中心归一化矩。如下所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220140.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>中心矩是平移不变的，中心归一化矩是平移和尺度不变的。三种矩总结如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/934484-20170713101542165-2053888115.png" alt="https://images2015.cnblogs.com/blog/934484/201707/934484-20170713101542165-2053888115.png" tabindex="0" loading="lazy"><figcaption>https://images2015.cnblogs.com/blog/934484/201707/934484-20170713101542165-2053888115.png</figcaption></figure><h3 id="_2-3-hu矩" tabindex="-1"><a class="header-anchor" href="#_2-3-hu矩" aria-hidden="true">#</a> 2.3 Hu矩</h3><p>中心矩具有很不错的特性，但是不足以用于特征匹配。我们想要计算对平移，缩放和旋转不变的矩，幸运的是，我们实际上可以计算出这样的矩，他们被称为Hu矩的7个不变量。如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220150.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Hu矩（或者更确切地说是Hu矩不变量）是使用对图像变换不变的中心矩计算的一组7个变量。事实证明，前6个矩不变量对于平移，缩放，旋转和映射都是不变的。而第7个矩会因为图像映射而改变。</p><p>Hu矩的理论你可参考论文：</p>',13),h={href:"https://www.researchgate.net/publication/224146066_Analysis_of_Hu's_moment_invariants_on_image_scaling_and_rotation",target:"_blank",rel:"noopener noreferrer"},g=o(`<h2 id="_3-基于hu-矩实现形状匹配" tabindex="-1"><a class="header-anchor" href="#_3-基于hu-矩实现形状匹配" aria-hidden="true">#</a> <strong>3</strong> <strong>基于Hu</strong> <strong>矩实现形状匹配</strong></h2><h3 id="_3-1-hu-矩的计算" tabindex="-1"><a class="header-anchor" href="#_3-1-hu-矩的计算" aria-hidden="true">#</a> <strong>3.1 Hu</strong> <strong>矩的计算</strong></h3><p>幸运的是，我们不需要在OpenCV中进行所有计算，因为我们有计算Hu矩的函数。在OpenCV中，我们HuMoments()用来计算输入图像中的Hu矩。</p><p>（1）我们先读取原图并将其转换为灰度图像</p><p>C++:</p><pre><code>// Read image as grayscale image

Mat im = imread(filename,IMREAD_GRAYSCALE);
</code></pre><p>Python:</p><pre><code># Threshold image

_,im = cv2.threshold(im, 128, 255, cv2.THRESH_BINARY)
</code></pre><p>（2）使用阈值处理对图像进行二值化：</p><p>C++：</p><pre><code>// Threshold image 阈值分割

threshold(im, im, 0, 255, THRESH_OTSU);
</code></pre><p>Python:</p><pre><code># Threshold image

_,im = cv2.threshold(im, 128, 255, cv2.THRESH_BINARY)
</code></pre><p>（3）基于OpenCV先计算图像中心矩，再计算图像Hu矩</p><p>C++:</p><pre><code>// Calculate Moments

Moments moments = moments(im, false);

// Calculate Hu Moments

double huMoments[7];

HuMoments(moments, huMoments);
</code></pre><p>Python:</p><pre><code># Calculate Moments

moments = cv2.moments(im)

# Calculate Hu Moments

huMoments = cv2.HuMoments(moments)
</code></pre><p>（4）在前一步骤中获得的Hu矩变化过大。例如k图像的Hu矩为：</p><pre><code>h[0] = 0.00162663

h[1] = 3.11619e-07

h[2] = 3.61005e-10

h[3] = 1.44485e-10

h[4] = -2.55279e-20

h[5] = -7.57625 e-14

h[6] = 2.09098e-20
</code></pre><p>请注意，hu [0]的大小与hu [6]不具有可比性。我们可以使用下面给出的对数转换将它们放在相同的范围内</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220146.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>转换后的结果如下：</p><pre><code>H[0] = 2.78871

H[1] = 6.50638

H[2] = 9.44249

H[3] = 9.84018

H[4] = -19.593

H[5] = -13.1205

H[6] = 19.6797
</code></pre><p>转换代码为：</p><p>C++:</p><pre><code>// Log scale hu moments

for(int i = 0; i &lt; 7; i++)

{

  huMoments[i] = -1 * copysign(1.0, huMoments[i]) * log10(abs(huMoments[i])); 

}
</code></pre><p>Python:</p><pre><code># Log scale hu moments

for i in range(0,7):

  huMoments[i] = -1* copysign(1.0, huMoments[i]) * log10(abs(huMoments[i])))
</code></pre><p>其中copysign函数的意思是将函数第一个变量的符号设置成第二个变量的正负数符号，然后输出第一个变量。例如若第二个变量为负数，则上式1变为负数-1，输出-1。</p><h3 id="_3-2-基于matchshapes函数计算两个图形之间的距离" tabindex="-1"><a class="header-anchor" href="#_3-2-基于matchshapes函数计算两个图形之间的距离" aria-hidden="true">#</a> 3.2 基于matchShapes函数计算两个图形之间的距离</h3><p>如前所述，所有7个Hu矩不变量不管图像缩放和旋转都是不变的。只有映射时比如图像翻转，那么第七个Hu矩正负符号就会变化。那不是很漂亮吗?</p><p>我们来看一个例子。在下表中我们有6张图片和他们的Hu矩。</p><p><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220757.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" loading="lazy"> 如您所见，我们在S1.png中移动字母S，并在S2.png中移动+缩放它。我们添加了一些旋转来制作S3.png并进一步翻转图像以制作S4.png。注意，S0，S1，S2，S3和S4的所有Hu矩在值上彼此接近，除了翻转S4的第七个Hu矩的符号。另外，请注意它们与K非常不同。</p><p>在本节中，我们将学习如何使用Hu Moments来找到两个形状之间的距离。如果距离小，则两个图形在外观上接近。</p><p>OpenCV提供了一个易于使用的名为matchShapes函数，它接收两个图像（或轮廓）并使用Hu矩找到它们之间的距离。所以，你只需将图像二值化并使用matchShapes即可。</p><p>用法如下所示</p><p>C++:</p><pre><code>double d1 = matchShapes(im1, im2, CONTOURS_MATCH_I1, 0);

double d2 = matchShapes(im1, im2, CONTOURS_MATCH_I2, 0);

double d3 = matchShapes(im1, im2, CONTOURS_MATCH_I3, 0);
</code></pre><p>Python:</p><pre><code>d1 = cv2.matchShapes(im1,im2,cv2.CONTOURS_MATCH_I1,0)

d2 = cv2.matchShapes(im1,im2,cv2.CONTOURS_MATCH_I2,0)

d3 = cv2.matchShapes(im1,im2,cv2.CONTOURS_MATCH_I3,0)
</code></pre><p>请注意，您可以通过第三个参数（CONTOURS_MATCH_I1，CONTOURS_MATCH_I2或CONTOURS_MATCH_I3）使用三种b不同的距离。如果上述距离很小，则两个图像（im1和im2）相似。您可以使用任何距离测量。它们通常产生类似的结果。个人喜欢第二种，因为好计算。</p><p>三种距离具体计算如下：</p><p>1 CONTOURS_MATCH_I1</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220194.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>2 CONTOURS_MATCH_I2</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220198.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>3 CONTOURS_MATCH_I3</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316191027194.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220195.png" alt="" loading="lazy"> 是图像A和B之间的距离， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220206.png" alt="" loading="lazy"> 和 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]10 使用Hu矩进行形状匹配/20190316185220197.png" alt="" loading="lazy"> 是图像A和B第i个Hu矩对数转换后的值。</p><p>当我们在图像上使用形状匹配时，如S0与S0,K0和S4，我们得到以下输出：</p><pre><code>S0和S0：0.0

S0和K0：0.10783054664091285

S0和S4：0.008484870268973932
</code></pre><p>如果您想在两个形状之间自定义距离。例如，您可能希望使用由给定的Hu Moments之间的欧几里德距离。首先，如前一节所述，计算对数变换的Hu矩，然后自己计算距离，而不是使用matchShapes。</p><h2 id="_4-代码" tabindex="-1"><a class="header-anchor" href="#_4-代码" aria-hidden="true">#</a> 4 代码</h2><p>代码地址：</p>`,55),d={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},_={href:"https://download.csdn.net/download/luohenyj/11026231",target:"_blank",rel:"noopener noreferrer"},f=o(`<p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><h3 id="_4-1-hu矩计算" tabindex="-1"><a class="header-anchor" href="#_4-1-hu矩计算" aria-hidden="true">#</a> 4.1 Hu矩计算</h3><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &quot;opencv2/opencv.hpp&quot;

using namespace cv;
using namespace std;

int main()
{
	//是否进行log转换
	bool showLogTransformedHuMoments = true;

	// Obtain filename 图像地址
	string filename(&quot;./image/s0.png&quot;);

	// Read Image 读图
	Mat im = imread(filename, IMREAD_GRAYSCALE);

	// Threshold image 阈值分割
	threshold(im, im, 0, 255, THRESH_OTSU);

	// Calculate Moments 计算矩
	//第二个参数True表示非零的像素都会按值1对待，也就是说相当于对图像进行了二值化处理，阈值为1
	Moments moment = moments(im, false);

	// Calculate Hu Moments 计算Hu矩
	double huMoments[7];
	HuMoments(moment, huMoments);

	// Print Hu Moments
	cout &lt;&lt; filename &lt;&lt; &quot;: &quot;;

	for (int i = 0; i &lt; 7; i++)
	{
		if (showLogTransformedHuMoments)
		{
			// Log transform Hu Moments to make squash the range
			cout &lt;&lt; -1 * copysign(1.0, huMoments[i]) * log10(abs(huMoments[i])) &lt;&lt; &quot; &quot;;
		}
		else
		{
			// Hu Moments without log transform.
			cout &lt;&lt; huMoments[i] &lt;&lt; &quot; &quot;;
		}
	}
	// One row per file
	cout &lt;&lt; endl;
}
</code></pre><p>Python:</p><pre><code>from math import copysign, log10

def main():
    showLogTransformedHuMoments = True

    # Obtain filename from command line argument
    filename = &#39;./image/s0.png&#39;

    # Read image
    im = cv2.imread(filename,cv2.IMREAD_GRAYSCALE)

    # Threshold image
    _,im = cv2.threshold(im, 128, 255, cv2.THRESH_BINARY)

    # Calculate Moments
    moment = cv2.moments(im)

    # Calculate Hu Moments
    huMoments = cv2.HuMoments(moment)

    # Print Hu Moments
    print(&quot;{}: &quot;.format(filename),end=&#39;&#39;)

    for i in range(0,7):
        if showLogTransformedHuMoments:
            # Log transform Hu Moments to make
            # squash the range
            print(&quot;{:.5f}&quot;.format(-1*copysign(1.0,\\
                    huMoments[i])*log10(abs(huMoments[i]))),\\
                    end=&#39; &#39;)
        else:
            # Hu Moments without log transform
            print(&quot;{:.5f}&quot;.format(huMoments[i]),end=&#39; &#39;)
    print()

if __name__ == &quot;__main__&quot;:
    main()
</code></pre><h3 id="_4-2-形状匹配" tabindex="-1"><a class="header-anchor" href="#_4-2-形状匹配" aria-hidden="true">#</a> 4.2 形状匹配</h3><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &quot;opencv2/opencv.hpp&quot;

using namespace cv;
using namespace std;

int main()
{
  Mat im1 = imread(&quot;./image/S0.png&quot;,IMREAD_GRAYSCALE);
  Mat im2 = imread(&quot;./image/K0.png&quot;,IMREAD_GRAYSCALE);
  Mat im3 = imread(&quot;./image/S4.png&quot;,IMREAD_GRAYSCALE);

  double m1 = matchShapes(im1, im1, CONTOURS_MATCH_I2, 0);
  double m2 = matchShapes(im1, im2, CONTOURS_MATCH_I2, 0);
  double m3 = matchShapes(im1, im3, CONTOURS_MATCH_I2, 0);

  cout &lt;&lt; &quot;Shape Distances Between &quot; &lt;&lt; endl &lt;&lt; &quot;-------------------------&quot; &lt;&lt; endl;
  cout &lt;&lt; &quot;S0.png and S0.png : &quot; &lt;&lt; m1 &lt;&lt; endl;
  cout &lt;&lt; &quot;S0.png and K0.png : &quot; &lt;&lt; m2 &lt;&lt; endl;
  cout &lt;&lt; &quot;S0.png and S4.png : &quot; &lt;&lt; m3 &lt;&lt; endl;
}
</code></pre><p>Python:</p><pre><code>import cv2

def main():

    im1 = cv2.imread(&quot;./image/S0.png&quot;,cv2.IMREAD_GRAYSCALE)
    im2 = cv2.imread(&quot;./image/K0.png&quot;,cv2.IMREAD_GRAYSCALE)
    im3 = cv2.imread(&quot;./images/S4.png&quot;,cv2.IMREAD_GRAYSCALE)

    m1 = cv2.matchShapes(im1,im1,cv2.CONTOURS_MATCH_I2,0)
    m2 = cv2.matchShapes(im1,im2,cv2.CONTOURS_MATCH_I2,0)
    m3 = cv2.matchShapes(im1,im3,cv2.CONTOURS_MATCH_I2,0)

    print(&quot;Shape Distances Between \\n-------------------------&quot;)

    print(&quot;S0.png and S0.png : {}&quot;.format(m1))
    print(&quot;S0.png and K0.png : {}&quot;.format(m2))
    print(&quot;S0.png and S4.png : {}&quot;.format(m3))

if __name__ == &quot;__main__&quot;:
    main()
</code></pre><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2>`,12),H={href:"https://www.learnopencv.com/shape-matching-using-hu-moments-c-python/",target:"_blank",rel:"noopener noreferrer"};function b(S,C){const e=r("ExternalLinkIcon");return p(),u("div",null,[s,n("p",null,[n("a",m,[t(" https://blog.csdn.net/LuohenYJ/article/details/88599334"),a(e)])]),c,n("p",null,[n("a",h,[t("https://www.researchgate.net/publication/224146066_Analysis_of_Hu's_moment_invariants_on_image_scaling_and_rotation"),a(e)])]),g,n("p",null,[n("a",d,[t(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),a(e)])]),n("p",null,[n("a",_,[t(" https://download.csdn.net/download/luohenyj/11026231 "),a(e)])]),f,n("ul",null,[n("li",null,[n("a",H,[t(" https://www.learnopencv.com/shape-matching-using-hu-moments-c-python/"),a(e)])])])])}const w=i(l,[["render",b],["__file","2019-03-16-_OpenCV实战_10 使用Hu矩进行形状匹配.html.vue"]]);export{w as default};
