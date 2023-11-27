import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as p,c as l,a as e,b as n,d as i,e as o}from"./app-MsA2k2kn.js";const s={},u=e("h1",{id:"opencv实战-24-使用opencv进行曝光融合",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-24-使用opencv进行曝光融合","aria-hidden":"true"},"#"),n(" [OpenCV实战]24 使用OpenCV进行曝光融合")],-1),g=e("p",null,"本教程中，我们将了解使用OpenCV的Exposure Fusion（曝光融合）。",-1),m=e("h2",{id:"_1-什么是曝光融合",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-什么是曝光融合","aria-hidden":"true"},"#"),n(),e("strong",null,"1"),n(),e("strong",null,"什么是曝光融合")],-1),c=e("p",null,"曝光融合是一种将使用不同曝光设置拍摄的图像合成为一张看起来像色调映射的高动态范围（HDR）图像的图像的方法。当我们使用相机拍摄照片时，每个颜色通道只有8位来表示场景的亮度。然而，我们周围世界的亮度理论上可以从0（黑色）到几乎无限（直视太阳）。因此，傻瓜相机或移动相机根据场景决定曝光设置，以便使用相机的动态范围（0-255值）来表示图像中最有趣的部分。例如，在许多相机中，使用面部检测来查找面部并设置曝光，使得面部看起来很好。这引出了一个问题-我们可以在不同的曝光设置下拍摄多张照片并拍摄更大范围的场景亮度吗？答案是肯定的。传统上使用HDR成像然后进行色调映射的方式。具体见上篇文章：",-1),d={href:"https://blog.csdn.net/LuohenYJ/article/details/89712234",target:"_blank",rel:"noopener noreferrer"},_=o('<p>HDR成像要求我们知道精确的曝光时间。HDR图像本身看起来很暗，看起来不太漂亮。DR图像中的最小强度为0，但理论上没有最大值。所以我们需要将其值映射到0到255之间，以便我们可以显示它。将HDR图像映射到常规的每通道8位彩色图像的过程称为色调映射。如您所见，组装HDR图像和色调映射有点麻烦。我们不能不使用HDR就使用多个图像创建色调映射图像。结果证明我们可以用曝光融合来实现。</p><h2 id="_2-曝光融合的原理" tabindex="-1"><a class="header-anchor" href="#_2-曝光融合的原理" aria-hidden="true">#</a> <strong>2</strong> <strong>曝光融合的原理</strong></h2><p>应用曝光融合的步骤如下所述：</p><p>(1) 使用不同曝光拍摄多张图像</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401573.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>首先，我们需要在不移动相机的情况下捕获同一场景的一系列图像。如上所示，序列中的图像具有不同的曝光。这是通过改变相机的快门速度来实现的。通常，我们选择一些曝光不足的图像，一些曝光过度的图像和一个正确曝光的图像。</p><p>在“正确”曝光的图像中，选择快门速度（由相机或摄影师自动选择），以便每通道8位动态范围用于表示图像中最有趣的部分。太暗的区域被剪切为0，而太亮的区域被饱和到255。</p><p>在曝光不足的图像中，快门速度很快，图像很暗。因此，图像的8位用于捕获亮区域，而暗区域被剪切为0。在曝光过度的图像中，快门速度较慢，因此传感器捕获的光线更多，因此图像更亮。传感器的8位用于捕获暗区域的强度，而亮区域饱和到255的值。大多数单反相机都有一个称为自动曝光包围（AEB）的功能，只需按一下按钮，我们就可以在不同曝光下拍摄多张照片。当我们在iPhone中使用HDR模式时，它需要三张照片(安卓可以下载超级相机这个软件)。</p><p>(2) 图像对齐</p><p>即使使用三脚架获取序列中的图像也需要对齐，因为即使较小的相机抖动也会降低最终图像的质量。OpenCV提供了一种使用对齐这些图像的简便方法AlignMTB。该算法将所有图像转换为中值阈值位图（MTB）。通过将值1分配给比中值亮度更亮的像素来计算图像的MTB，否则为0。MTB对曝光时间不变。因此，可以对准MTB而无需我们指定曝光时间。</p><p>(3) 图像融合</p><p>具有不同曝光的图像捕获不同范围的场景亮度。根据Tom Mertens，Jan Kautz和Frank Van Reeth 题为Exposure Fusion的论文。论文见：</p>',12),h={href:"http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.64.7616&rep=rep1&type=pdf",target:"_blank",rel:"noopener noreferrer"},q=o('<p>曝光融合通过仅保留多重曝光图像序列中的“最佳”部分来计算所需图像。</p><p>作者提出了三个质量指标：</p><p>1曝光良好：如果序列中的图像中的像素接近零或接近255，则不应使用该图像来查找最终像素值。其值接近中间强度（128）的像素是比较合适的。</p><p>2对比度：高对比度通常意味着高品质。因此，对于该像素，给予特定像素的对比度值高的图像具有更高的权重。</p><p>3饱和度：类似地，更饱和的颜色更少被淘汰并且代表更高质量的像素。因此，特定像素的饱和度高的图像被赋予该像素的更高权重。</p><p>三种质量度量用于创建权重图 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401564.png" alt="" loading="lazy"> ，该权重图表示<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401561.png" alt="" loading="lazy"> 图像在位置处的像素的最终强度中的贡献<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401574.png" alt="" loading="lazy"> 。对权重图 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401567.png" alt="" loading="lazy"> 进行归一化，使得对于任何像素 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401565.png" alt="" loading="lazy"> ，所有图像的贡献总计为1。</p><p>结合权重图使用以下等式组合图像是很有效的：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401571.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中， <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401569.png" alt="" loading="lazy"> 是原始图像，<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401563.png" alt="" loading="lazy">是输出图像。问题在于，由于像素是从不同曝光的图像中拍摄的，因此 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103401582.png" alt="" loading="lazy">使用上述等式获得的输出图像将显示许多裂缝。该论文的作者使用拉普拉斯金字塔来混合图像。我们将在以后的文章中介绍这项技术的细节。</p><p>幸运的是使用OpenCV，这种图像曝光融合合并只是使用MergeMertens该类的两行代码。请注意，这个名字取决于Exposure Fusion论文的第一作者Tom Mertens 。</p><h2 id="_3-代码与结果" tabindex="-1"><a class="header-anchor" href="#_3-代码与结果" aria-hidden="true">#</a> 3 代码与结果</h2><p>代码地址：</p>',12),f={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},b=o(`<p>C++：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;vector&gt;
#include &lt;fstream&gt;
using namespace cv;
using namespace std;

// Read Images
void readImages(vector&lt;Mat&gt; &amp;images)
{
	int numImages = 16;
	static const char* filenames[] =
	{
	  &quot;image/memorial0061.jpg&quot;,
	  &quot;image/memorial0062.jpg&quot;,
	  &quot;image/memorial0063.jpg&quot;,
	  &quot;image/memorial0064.jpg&quot;,
	  &quot;image/memorial0065.jpg&quot;,
	  &quot;image/memorial0066.jpg&quot;,
	  &quot;image/memorial0067.jpg&quot;,
	  &quot;image/memorial0068.jpg&quot;,
	  &quot;image/memorial0069.jpg&quot;,
	  &quot;image/memorial0070.jpg&quot;,
	  &quot;image/memorial0071.jpg&quot;,
	  &quot;image/memorial0072.jpg&quot;,
	  &quot;image/memorial0073.jpg&quot;,
	  &quot;image/memorial0074.jpg&quot;,
	  &quot;image/memorial0075.jpg&quot;,
	  &quot;image/memorial0076.jpg&quot;
	};
	//读图
	for (int i = 0; i &lt; numImages; i++)
	{
		Mat im = imread(filenames[i]);
		images.push_back(im);
	}
}

int main()
{
	// Read images 读取图像
	cout &lt;&lt; &quot;Reading images ... &quot; &lt;&lt; endl;
	vector&lt;Mat&gt; images;

	//是否图像映射
	bool needsAlignment = true;

	// Read example images 读取例子图像
	readImages(images);
	//needsAlignment = false;

	// Align input images
	if (needsAlignment)
	{
		cout &lt;&lt; &quot;Aligning images ... &quot; &lt;&lt; endl;
		Ptr&lt;AlignMTB&gt; alignMTB = createAlignMTB();
		alignMTB-&gt;process(images, images);
	}
	else
	{
		cout &lt;&lt; &quot;Skipping alignment ... &quot; &lt;&lt; endl;
	}

	// Merge using Exposure Fusion 图像融合
	cout &lt;&lt; &quot;Merging using Exposure Fusion ... &quot; &lt;&lt; endl;
	Mat exposureFusion;
	Ptr&lt;MergeMertens&gt; mergeMertens = createMergeMertens();
	mergeMertens-&gt;process(images, exposureFusion);

	// Save output image 图像保存
	cout &lt;&lt; &quot;Saving output ... exposure-fusion.jpg&quot; &lt;&lt; endl;
	imwrite(&quot;exposure-fusion.jpg&quot;, exposureFusion * 255);

	return 0;
}
</code></pre><p>Python：</p><pre><code>import cv2
import numpy as np
import sys


def readImagesAndTimes():
  
  filenames = [
               &quot;image/memorial0061.jpg&quot;,
               &quot;image/memorial0062.jpg&quot;,
               &quot;image/memorial0063.jpg&quot;,
               &quot;image/memorial0064.jpg&quot;,
               &quot;image/memorial0065.jpg&quot;,
               &quot;image/memorial0066.jpg&quot;,
               &quot;image/memorial0067.jpg&quot;,
               &quot;image/memorial0068.jpg&quot;,
               &quot;image/memorial0069.jpg&quot;,
               &quot;image/memorial0070.jpg&quot;,
               &quot;image/memorial0071.jpg&quot;,
               &quot;image/memorial0072.jpg&quot;,
               &quot;image/memorial0073.jpg&quot;,
               &quot;image/memorial0074.jpg&quot;,
               &quot;image/memorial0075.jpg&quot;,
               &quot;image/memorial0076.jpg&quot;
               ]

  images = []
  for filename in filenames:
    im = cv2.imread(filename)
    images.append(im)
  
  return images

if __name__ == &#39;__main__&#39;:
  
  # Read images
  print(&quot;Reading images ... &quot;)
  
  if len(sys.argv) &gt; 1:
    # Read images from the command line
    images = []
    for filename in sys.argv[1:]:
      im = cv2.imread(filename)
      images.append(im)
    needsAlignment = False
  else :
    # Read example images
    images = readImagesAndTimes()
    needsAlignment = False
  
  # Align input images
  if needsAlignment:
    print(&quot;Aligning images ... &quot;)
    alignMTB = cv2.createAlignMTB()
    alignMTB.process(images, images)
  else :
    print(&quot;Skipping alignment ... &quot;)
  
  # Merge using Exposure Fusion
  print(&quot;Merging using Exposure Fusion ... &quot;);
  mergeMertens = cv2.createMergeMertens()
  exposureFusion = mergeMertens.process(images)

  # Save output image
  print(&quot;Saving output ... exposure-fusion.jpg&quot;)
  cv2.imwrite(&quot;exposure-fusion.jpg&quot;, exposureFusion * 255)
</code></pre><p>本文第一张图获得的不同曝光的图像，通过这种方法所得结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103719765.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在输入图像中，我们可以获得过度曝光图像中光线昏暗区域和曝光不足图像中明亮区域的细节。但是，在合并的输出图像中，像素在图像的每个部分都具有明亮的细节。我们还可以在之前的帖子中看到我们用于HDR成像的图像的这种效果。用于产生最终输出的四个图像显示在左侧，输出图像显示在右侧。结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]24 使用OpenCV进行曝光融合/20190505103402185.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>正如您在本文中所看到的，Exposure Fusion允许我们在不明确计算HDR图像的情况下实现类似于HDR + Tonemapping的效果。因此，我们不需要知道每张图像的曝光时间，但我们能够获得非常合理的结果。那么，为什么要费心去做HDR呢？好吧，在很多情况下，Exposure Fusion产生的输出可能不符合您的喜好。没有旋钮可以调整以使其变得不同或更好。另一方面，HDR图像捕获场景的原始亮度。如果您不喜欢色调映射的HDR图像，请尝试使用不同的色调映射算法。总之，Exposure Fusion代表了一种权衡。在速度和不太严格的要求下使得算法更加灵活（例如，不需要暴露时间）</p><h1 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h1>`,10),j={href:"https://www.learnopencv.com/exposure-fusion-using-opencv-cpp-python/",target:"_blank",rel:"noopener noreferrer"};function x(V,w){const t=r("ExternalLinkIcon");return p(),l("div",null,[u,g,m,c,e("p",null,[e("a",d,[n(" https://blog.csdn.net/LuohenYJ/article/details/89712234"),i(t)])]),_,e("p",null,[e("a",h,[n("http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.64.7616&rep=rep1&type=pdf"),i(t)])]),q,e("p",null,[e("a",f,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),i(t)])]),b,e("ul",null,[e("li",null,[e("a",j,[n(" https://www.learnopencv.com/exposure-fusion-using-opencv-cpp-python/"),i(t)])])])])}const C=a(s,[["render",x],["__file","2019-05-05-_OpenCV实战_24 使用OpenCV进行曝光融合.html.vue"]]);export{C as default};
