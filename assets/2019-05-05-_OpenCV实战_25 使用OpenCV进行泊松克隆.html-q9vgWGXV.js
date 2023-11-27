import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as i,c as l,a as e,b as n,d as o,e as a}from"./app-MsA2k2kn.js";const c={},p=a('<h1 id="opencv实战-25-使用opencv进行泊松克隆" tabindex="-1"><a class="header-anchor" href="#opencv实战-25-使用opencv进行泊松克隆" aria-hidden="true">#</a> [OpenCV实战]25 使用OpenCV进行泊松克隆</h1><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165539423.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>OpenCV3中引入的令人兴奋的新功能之一称为泊松克隆Seamless cloning (有人也叫无缝克隆)。使用此新功能，您可以从一个图像复制对象，并将其粘贴到另一个图像中，使组合看起来无缝且自然。上面的图像是使用天空和飞机的场景创建的。如果我简单地将飞机图像覆盖在天空图像的顶部，结果将显得荒谬见下图。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165539594.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然，没有人会做那样的组合。你显然会小心地掩盖图像，也许在Photoshop中花了半天之后会得到一幅下图所示的图像。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165539596.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果你是一名艺术家，你将花费另外半天时间，仔细调整飞机上的颜色，使其与天空背景融为一体，并创造出美丽的构图。但是有两个问题。首先，你没有半天的时间。其次，你可能不是艺术家！</p><p>如果您可以在飞机周围制作一个非常粗糙的掩膜，并创建一个类似于第一张图的漂亮组合，这不是很酷吗?如果只需要10行代码呢?这不仅很酷，而且很厉害！</p><p>现在让我们看看我用来生成上面图像的代码。本文所有代码见：</p>',9),m={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},u=a(`<h2 id="_1-seamless-cloning-实现" tabindex="-1"><a class="header-anchor" href="#_1-seamless-cloning-实现" aria-hidden="true">#</a> <strong>1 Seamless Cloning</strong> <strong>实现</strong></h2><h3 id="_1-1-seamless-cloning-实例" tabindex="-1"><a class="header-anchor" href="#_1-1-seamless-cloning-实例" aria-hidden="true">#</a> <strong>1.1 Seamless Cloning</strong> <strong>实例</strong></h3><p>快速浏览一下Seamless Cloning的用法</p><p>C++：</p><pre><code>seamlessClone(Mat src, Mat dst, Mat mask, Point center, Mat output, int flags)
</code></pre><p>Python：</p><pre><code>output = cv2.seamlessClone(src, dst, mask, center, flags)
</code></pre><p>详细参数介绍如下：</p><p>1)src目标图像，在本次给出的示例中是飞机。</p><p>2)dst背景图像，在本次示例中是天空。</p><p>3)mask目标图像上的掩模，表示目标图像上那些区域是感兴趣区域。如果只对飞机感兴趣，那么mask上就只有飞机所在的区域。</p><p>4)center 目标图像的中心在背景图像上的坐标！注意是目标图像的中心！</p><p>5)flags 选择融合的方式，目前有NORMAL_CLONE、MIXED_CLONE和MONOCHROME_TRANSFER三种方法。</p><p>6)output 输出图像。</p><p>现在让我们看看我用来生成上面图像的代码。</p><p>C++:</p><pre><code>// OpenCV_SeamlessCloning.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;

using namespace cv;
using namespace std;

int main()
{
	// Read images : src image will be cloned into dst 
	//目标图像
	Mat src = imread(&quot;image/airplane.jpg&quot;);
	//背景图像
	Mat dst = imread(&quot;image/sky.jpg&quot;);

	// Create a rough mask around the airplane. 创建掩模
	Mat src_mask = Mat::zeros(src.rows, src.cols, src.depth());

	// Define the mask as a closed polygon 定义轮廓类似目标物体的多边形
	Point poly[1][7];
	poly[0][0] = Point(4, 80);
	poly[0][1] = Point(30, 54);
	poly[0][2] = Point(151, 63);
	poly[0][3] = Point(254, 37);
	poly[0][4] = Point(298, 90);
	poly[0][5] = Point(272, 134);
	poly[0][6] = Point(43, 122);

	const Point* polygons[1] = { poly[0] };
	int num_points[] = { 7 };

	// Create mask by filling the polygon 填充多边形
	fillPoly(src_mask, polygons, num_points, 1, Scalar(255, 255, 255));

	// The location of the center of the src in the dst 目标图像在背景图像中心点左边
	Point center(800, 100);

	// Seamlessly clone src into dst and put the results in output
	Mat output;
	seamlessClone(src, dst, src_mask, center, output, NORMAL_CLONE);

	// Write result
	imwrite(&quot;opencv-seamless-cloning-example.jpg&quot;, output);
	imshow(&quot;result&quot;, output);
	waitKey(0);
	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np 

# Read images
src = cv2.imread(&quot;image/airplane.jpg&quot;)
dst = cv2.imread(&quot;image/sky.jpg&quot;)


# Create a rough mask around the airplane.
src_mask = np.zeros(src.shape, src.dtype)
poly = np.array([ [4,80], [30,54], [151,63], [254,37], [298,90], [272,134], [43,122] ], np.int32)
cv2.fillPoly(src_mask, [poly], (255, 255, 255))

# This is where the CENTER of the airplane will be placed
center = (800,100)

# Clone seamlessly.
output = cv2.seamlessClone(src, dst, src_mask, center, cv2.NORMAL_CLONE)

# Write result
cv2.imwrite(&quot;opencv-seamless-cloning-example.jpg&quot;, output);
</code></pre><p>在上面的例子中，我使用的克隆类型（标志）是NORMAL_CLONE。还有另一种类型MIXED_CLONE，与NORMAL_CLONE略有不同。让我们看看这两种类型在细节上有何不同。</p><h3 id="_1-2正常克隆-normal-clone-与混合克隆-mixed-clone" tabindex="-1"><a class="header-anchor" href="#_1-2正常克隆-normal-clone-与混合克隆-mixed-clone" aria-hidden="true">#</a> 1.2正常克隆((NORMAL_CLONE)与混合克隆(MIXED_CLONE）</h3><p>我有一个5岁的儿子，如果我善待他，他会给我一张“I love you”的纸条，如下图所示。曾经有一段时间，孩子们渴望得到父母的认可，但现在父母必须尽最大努力去赢得“I love you”的纸条。不管怎样，回到克隆。我将使用其中一个“I love you”的纸条来说明不同融合方式的区别。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165538871.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>让我们尝试将这个图像克隆到下图所示的木质纹理图像上。我们将是使用全白的掩模将源图像克隆在木质纹理图像的中心。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165538944.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>代码如下：</p><p>C++：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;

using namespace cv;
using namespace std;

int main()
{
    // Read images : src image will be cloned into dst
	//目标图像
    Mat src = imread(&quot;image/iloveyouticket.jpg&quot;);
	//背景图像
    Mat dst = imread(&quot;image/wood-texture.jpg&quot;);
    
    // Create an all white mask 白色掩模
    Mat src_mask = 255 * Mat::ones(src.rows, src.cols, src.depth());
    
    // The location of the center of the src in the dst 图像中心
    Point center(dst.cols/2,dst.rows/2);
    
    // Seamlessly clone src into dst and put the results in output
    Mat normal_clone;
    Mat mixed_clone;
	Mat nonochrome_clone;

    seamlessClone(src, dst, src_mask, center, normal_clone, NORMAL_CLONE);
    seamlessClone(src, dst, src_mask, center, mixed_clone, MIXED_CLONE);
	seamlessClone(src, dst, src_mask, center, nonochrome_clone, MONOCHROME_TRANSFER);

    // Write results
    imwrite(&quot;opencv-normal-clone-example.jpg&quot;, normal_clone);
    imwrite(&quot;opencv-mixed-clone-example.jpg&quot;, mixed_clone);
	imwrite(&quot;opencv-nonochrome-clone-example.jpg&quot;, nonochrome_clone);

	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np

# Read images : src image will be cloned into dst
im = cv2.imread(&quot;image/wood-texture.jpg&quot;)
obj= cv2.imread(&quot;image/iloveyouticket.jpg&quot;)

# Create an all white mask
mask = 255 * np.ones(obj.shape, obj.dtype)

# The location of the center of the src in the dst
width, height, channels = im.shape
center = (int(height/2), int(width/2))

# Seamlessly clone src into dst and put the results in output
normal_clone = cv2.seamlessClone(obj, im, mask, center, cv2.NORMAL_CLONE)
mixed_clone = cv2.seamlessClone(obj, im, mask, center, cv2.MIXED_CLONE)
monochrome_clone = cv2.seamlessClone(obj, im, mask, center, cv2.MONOCHROME_TRANSFER)
# Write results
cv2.imwrite(&quot;opencv-normal-clone-example.jpg&quot;, normal_clone)
cv2.imwrite(&quot;opencv-mixed-clone-example.jpg&quot;, mixed_clone)
cv2.imwrite(&quot;opencv-monochrome-clone-example.jpg&quot;, monochrome_clone)
</code></pre><h4 id="_1-2-1-normal-cloning-result" tabindex="-1"><a class="header-anchor" href="#_1-2-1-normal-cloning-result" aria-hidden="true">#</a> <strong>1.2.1 Normal Cloning Result</strong></h4><p>如果我们使用NORMAL_CLONE标志使用Normal Cloning，我们将得到下图所示的结果。现在我们没有使用好的掩码，你可以看到单词“I”和“Love”之间以及“you”之间的过度平滑“和”Paa“。也就是这些字之间没有纹理背景。当然我们很懒。我们可以创建一个粗糙的掩码并改进结果。但如果你懒惰而聪明，你会使用混合克隆。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165538943.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_1-2-2-mixed-cloning-result" tabindex="-1"><a class="header-anchor" href="#_1-2-2-mixed-cloning-result" aria-hidden="true">#</a> <strong>1.2.2 Mixed Cloning Result</strong></h4><p>在“正常克隆”中，源图像的纹理（渐变）将保留在克隆区域中。在混合克隆中，克隆区域的纹理（梯度）由源图像和目标图像的组合确定。混合克隆不会产生平滑区域，因为它会选择源图像和目标图像之间的主要纹理（渐变）。混合克隆的结果下图所示。请注意，“I”和“Love”，“you”和“Paa”之间的纹理不再平滑。懒人欢呼！</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165538947.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_1-2-3-monochrome-transfer-result" tabindex="-1"><a class="header-anchor" href="#_1-2-3-monochrome-transfer-result" aria-hidden="true">#</a> 1.2.3 MONOCHROME TRANSFER Result</h4><p>MONOCHROME_TRANSFER融合方式类似于NORMAL_CLONE，只是用单色融合。结果下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]25 使用OpenCV进行泊松克隆/20190505165538996.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-seamless-cloning-相关介绍" tabindex="-1"><a class="header-anchor" href="#_2-seamless-cloning-相关介绍" aria-hidden="true">#</a> <strong>2 Seamless Cloning</strong> <strong>相关介绍</strong></h2><p>OpenCV中的泊松克隆是由Patrick Perez，Michel Gangnet和Andrew Blake撰写的具有影响力的SIGGRAPH 2003论文题为Poisson Image Editing的实现。论文见：</p>`,41),g={href:"http://www.irisa.fr/vista/Papers/2003_siggraph_perez.pdf",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"该论文的理论和实现细节实际上非常酷，但超出了本文的范围。详细可见：",-1),d={href:"https://blog.csdn.net/hjimce/article/details/45716603",target:"_blank",rel:"noopener noreferrer"},_=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),n(" 3 参考")],-1),b={href:"https://www.learnopencv.com/seamless-cloning-using-opencv-python-cpp/",target:"_blank",rel:"noopener noreferrer"};function f(C,y){const t=r("ExternalLinkIcon");return i(),l("div",null,[p,e("p",null,[e("a",m,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),o(t)])]),u,e("p",null,[e("a",g,[n(" http://www.irisa.fr/vista/Papers/2003_siggraph_perez.pdf"),o(t)])]),h,e("p",null,[e("a",d,[n(" https://blog.csdn.net/hjimce/article/details/45716603"),o(t)])]),_,e("ul",null,[e("li",null,[e("a",b,[n(" https://www.learnopencv.com/seamless-cloning-using-opencv-python-cpp/"),o(t)])])])])}const O=s(c,[["render",f],["__file","2019-05-05-_OpenCV实战_25 使用OpenCV进行泊松克隆.html.vue"]]);export{O as default};
