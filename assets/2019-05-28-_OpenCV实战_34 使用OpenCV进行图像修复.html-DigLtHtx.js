import{_ as n,c as t,a,o as i}from"./app-B1QbUTkN.js";const p={};function o(s,e){return i(),t("div",null,e[0]||(e[0]=[a(`<h1 id="opencv实战-34-使用opencv进行图像修复" tabindex="-1"><a class="header-anchor" href="#opencv实战-34-使用opencv进行图像修复"><span>[OpenCV实战]34 使用OpenCV进行图像修复</span></a></h1><p>本文将描述一类称为图像修复的区域填充算法。想象一下找一张旧的家庭照片。你扫描它，它看起来很棒，除了一些划痕。当然，你可以在photoshop中加载照片并修复划痕。除此之外可以编写10行代码以使用OpenCV中的修复算法来解决问题。</p><h2 id="_1-什么是图像修复" tabindex="-1"><a class="header-anchor" href="#_1-什么是图像修复"><span>1 什么是图像修复</span></a></h2><p>图像修复是计算机视觉中的一类算法，其目标是填充图像或视频内的区域。该区域使用二进制掩模进行标识，填充通常根据需要填充的区域边界信息来完成。图像修复的最常见应用是恢复旧的扫描照片。它还用于删除图像中的小的不需要的对象。</p><p>在本节中，我们将简要讨论在OpenCV中实现的两种修复算法。</p><h3 id="_1-1-inpaint-ns-navier-stokes-based-inpainting" tabindex="-1"><a class="header-anchor" href="#_1-1-inpaint-ns-navier-stokes-based-inpainting"><span>1.1 INPAINT_NS : Navier-Stokes based Inpainting</span></a></h3><p>该方法于2001年发表在题为Navier-Stokes, Fluid Dynamics, and Image and Video Inpainting的论文。论文见：</p><p><a href="http://www.math.ucla.edu/~bertozzi/papers/cvpr01.pdf" target="_blank" rel="noopener noreferrer"> http://www.math.ucla.edu/~bertozzi/papers/cvpr01.pdf</a></p><p>有时我觉得计算机视觉领域是一个来自其他领域的移民领域，如电子工程，计算机科学，物理和数学。他们将自己的想法带到现场，以非常有趣和独特的方式解决同样的问题。电气工程师可以将图像看作2D信号，并应用信号处理理论来解决计算机视觉问题。另一方面，数学家可以将图像看作连通图并使用图论解决计算机视觉问题。因此，为流体动力学开发的理论也可以用于计算机视觉，这并不奇怪。在下图中，我们的目标是填充暗区并获得一个看起来像右边的图像。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]34 使用OpenCV进行图像修复/20190528154024747.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们如何填补这个黑色区域？我们想要的一个约束是边缘进入点A应该连接边缘离开点B。我们可能想要的另一个约束是连接A和B的曲线右边的区域应该是白色，而左边的区域应该是蓝色的。</p><p>以上两个约束基本上要求：保留渐变（即边缘特征）和继续在平滑区域中传播颜色信息。</p><p>作者建立了一个偏微分方程（PDE）来更新具有上述约束的区域内的图像强度。</p><h3 id="_1-2-inpaint-telea-fast-marching-method-based" tabindex="-1"><a class="header-anchor" href="#_1-2-inpaint-telea-fast-marching-method-based"><span>1.2 INPAINT_TELEA : Fast Marching Method based</span></a></h3><p>该方法基于论文An Image Inpainting Technique Based on the Fast Marching Method。论文作者Alexandru Telea。论文见：</p><p><a href="https://pdfs.semanticscholar.org/622d/5f432e515da69f8f220fb92b17c8426d0427.pdf" target="_blank" rel="noopener noreferrer">https://pdfs.semanticscholar.org/622d/5f432e515da69f8f220fb92b17c8426d0427.pdf </a></p><p>该方法实现使用不同的技术解决了相同的约束。作者不使用图像拉普拉斯算子作为平滑度的估计，而是使用像素的已知图像邻域上的加权平均值来补绘。已知的邻域像素和梯度用于估计要修复的像素的颜色。</p><h3 id="_1-3-方法比较与函数实现" tabindex="-1"><a class="header-anchor" href="#_1-3-方法比较与函数实现"><span>1.3 方法比较与函数实现</span></a></h3><p>根据理论和论文，基于Navier-Stokes的修复应该更慢，并且倾向于产生比fast marching method的方法更模糊的结果。在实践中，我们没有发现这种情况。INPAINT_NS在我们的测试中产生了更好的结果，速度也略高于INPAINT_TELEA。</p><p>在OpenCV中，使用函数inpaint实现了修复算法。函数接口如下：</p><p>C++:</p><pre><code>void inpaint( const Mat&amp; src, const Mat&amp; inpaintMask, Mat&amp; dst, double inpaintRange, int flags );
</code></pre><p>Python:</p><pre><code>dst = cv2.inpaint(src, inpaintMask, inpaintRadius, flags)
</code></pre><p>Src：源图像</p><p>inpaintMask：二进制掩码，指示要修复的像素。</p><p>Dst：结果图像</p><p>inpaintRadius：表示修复的半径</p><p>flags : 修复算法，主要有INPAINT_NS (Navier-Stokes based method) or INPAINT_TELEA (Fast marching based method)</p><h2 id="_2-结果与代码" tabindex="-1"><a class="header-anchor" href="#_2-结果与代码"><span>2 结果与代码</span></a></h2><h3 id="_2-1-结果" tabindex="-1"><a class="header-anchor" href="#_2-1-结果"><span>2.1 结果</span></a></h3><p>让我们来看看对林肯总统的历史形象进行修复的结果。这张照片背后有一段引人入胜的历史，我从维基百科借来的：</p><p>1865年2月5日星期日，在华盛顿特区的加德纳画廊，亚历山大·加德纳拍摄了几张总统的多镜头照片。在本届会议结束之前，加德纳要求总统最后一个姿势。他把相机拉得更近，拍了一张林肯头部，肩膀和胸部的照片。神秘的玻璃板破裂。加德纳小心翼翼地将它带到了他的黑暗房间，并且能够制作一张印刷品，但在林肯的脸上有一个不祥的裂缝。在这个印刷品完全破碎并被弃用。但这种印刷品，即O-118，至今仍然存在。多年来，许多人将这一裂缝与10周后等待林肯的刺客子弹的象征性预言联系在一起。</p><p><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]34 使用OpenCV进行图像修复/20190528154024813.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" loading="lazy"> ​</p><p>修复结果：上图左边的第一个图像是输入图像，第二个图像是掩模，第三个图像是INPAINT_TELEA的结果，第四个图像是INPAINT_NS的结果。</p><p>让我们来看一个更复杂的例子。我们已经在一个花园的图像上草草写了很多，但是结果仍然非常引人注目。结果如下：</p><p><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]34 使用OpenCV进行图像修复/20190528154025387.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" loading="lazy"> ​ 上图中，左：带有潦草文字的原始图像。中：使用INPAINT_TELEA方法修复，右：使用INPAINT_NS。</p><h3 id="_2-2-代码" tabindex="-1"><a class="header-anchor" href="#_2-2-代码"><span>2.2 代码</span></a></h3><p>所有代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>两种算法修复效果都还不错，但是都需要事先准备修复模板的掩模mask,也就是inpaintMask这个参数。例子里面用鼠标在图片上划线，划线的结果就是mask，而真正应用的时候需要事先设计好这个mask。例子程序中在划线确定mask后，不同按键有不同效果。按t选择INPAINT_TELEA处理，按n选择INPAINT_NS处理，按r查看原图，按ESC退出。</p><p>具体代码如下：</p><p>C++：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/photo.hpp&gt;

#include &lt;iostream&gt;

using namespace cv;
using namespace std;

// Declare Mat objects for original image and mask for inpainting
Mat img, inpaintMask;
// Mat object for result output
Mat res;
Point prevPt(-1, -1);

// onMouse function for Mouse Handling
// Used to draw regions required to inpaint
// 调用鼠标事件
static void onMouse(int event, int x, int y, int flags, void*)
{
	if (event == EVENT_LBUTTONUP || !(flags &amp; EVENT_FLAG_LBUTTON))
		prevPt = Point(-1, -1);
	else if (event == EVENT_LBUTTONDOWN)
		prevPt = Point(x, y);
	else if (event == EVENT_MOUSEMOVE &amp;&amp; (flags &amp; EVENT_FLAG_LBUTTON))
	{
		Point pt(x, y);
		if (prevPt.x &lt; 0)
			prevPt = pt;
		line(inpaintMask, prevPt, pt, Scalar::all(255), 5, 8, 0);
		line(img, prevPt, pt, Scalar::all(255), 5, 8, 0);
		prevPt = pt;
		imshow(&quot;image&quot;, img);
		imshow(&quot;image: mask&quot;, inpaintMask);
	}
}

int main()
{
	string filename = &quot;./image/flower-garden.jpg&quot;;
	// Read image in color mode 读图
	img = imread(filename);
	Mat img_mask;
	// Return error if image not read properly
	if (img.empty())
	{
		cout &lt;&lt; &quot;Failed to load image: &quot; &lt;&lt; filename &lt;&lt; endl;
		return 0;
	}

	namedWindow(&quot;image&quot;);

	// Create a copy for the original image 复制原图像
	img_mask = img.clone();
	// Initialize mask (black image)
	inpaintMask = Mat::zeros(img_mask.size(), CV_8U);

	// Show the original image
	imshow(&quot;image&quot;, img);
	//调用鼠标在图像上画圈
	setMouseCallback(&quot;image&quot;, onMouse, NULL);

	for (;;)
	{
		char c = (char)waitKey();
		//按t选择INPAINT_TELEA处理
		if (c == &#39;t&#39;)
		{
			// Use Algorithm proposed by Alexendra Telea
			inpaint(img, inpaintMask, res, 3, INPAINT_TELEA);
			imshow(&quot;Inpaint Output using FMM&quot;, res);
		}
		//按n选择INPAINT_NS处理
		if (c == &#39;n&#39;)
		{
			// Use Algorithm proposed by Bertalmio et. al.
			inpaint(img, inpaintMask, res, 3, INPAINT_NS);
			imshow(&quot;Inpaint Output using NS Technique&quot;, res);
		}
		//按r查看原图
		if (c == &#39;r&#39;)
		{
			inpaintMask = Scalar::all(0);
			img_mask.copyTo(img);
			imshow(&quot;image&quot;, inpaintMask);
		}
		//按ESC退出
		if (c == 27)
		{
			break;
		}
	}
	return 0;
}
</code></pre><p>Python：</p><pre><code>import numpy as np
import cv2 as cv
# OpenCV Utility Class for Mouse Handling
class Sketcher:
    def __init__(self, windowname, dests, colors_func):
        self.prev_pt = None
        self.windowname = windowname
        self.dests = dests
        self.colors_func = colors_func
        self.dirty = False
        self.show()
        cv.setMouseCallback(self.windowname, self.on_mouse)

    def show(self):
        cv.imshow(self.windowname, self.dests[0])
        cv.imshow(self.windowname + &quot;: mask&quot;, self.dests[1])

    # onMouse function for Mouse Handling
    def on_mouse(self, event, x, y, flags, param):
        pt = (x, y)
        if event == cv.EVENT_LBUTTONDOWN:
            self.prev_pt = pt
        elif event == cv.EVENT_LBUTTONUP:
            self.prev_pt = None

        if self.prev_pt and flags &amp; cv.EVENT_FLAG_LBUTTON:
            for dst, color in zip(self.dests, self.colors_func()):
                cv.line(dst, self.prev_pt, pt, color, 5)
            self.dirty = True
            self.prev_pt = pt
            self.show()


def main():

    print(&quot;Usage: python inpaint &lt;image_path&gt;&quot;)
    print(&quot;Keys: &quot;)
    print(&quot;t - inpaint using FMM&quot;)
    print(&quot;n - inpaint using NS technique&quot;)
    print(&quot;r - reset the inpainting mask&quot;)
    print(&quot;ESC - exit&quot;)

    # Read image in color mode
    img = cv.imread(&quot;./image/Lincoln.jpg&quot;)

    # If image is not read properly, return error
    if img is None:
        return

    # Create a copy of original image
    img_mask = img.copy()
    # Create a black copy of original image
    # Acts as a mask
    inpaintMask = np.zeros(img.shape[:2], np.uint8)
    # Create sketch using OpenCV Utility Class: Sketcher
    sketch = Sketcher(&#39;image&#39;, [img_mask, inpaintMask], lambda : ((255, 255, 255), 255))

    while True:
        ch = cv.waitKey()
        if ch == 27:
            break
        if ch == ord(&#39;t&#39;):
            # Use Algorithm proposed by Alexendra Telea: Fast Marching Method (2004)
            # Reference: https://pdfs.semanticscholar.org/622d/5f432e515da69f8f220fb92b17c8426d0427.pdf
            res = cv.inpaint(src=img_mask, inpaintMask=inpaintMask, inpaintRadius=3, flags=cv.INPAINT_TELEA)
            cv.imshow(&#39;Inpaint Output using FMM&#39;, res)
        if ch == ord(&#39;n&#39;):
            # Use Algorithm proposed by Bertalmio, Marcelo, Andrea L. Bertozzi, and Guillermo Sapiro: Navier-Stokes, Fluid Dynamics, and Image and Video Inpainting (2001)
            res = cv.inpaint(src=img_mask, inpaintMask=inpaintMask, inpaintRadius=3, flags=cv.INPAINT_NS)
            cv.imshow(&#39;Inpaint Output using NS Technique&#39;, res)
        if ch == ord(&#39;r&#39;):
            img_mask[:] = img
            inpaintMask[:] = 0
            sketch.show()

    print(&#39;Completed&#39;)


if __name__ == &#39;__main__&#39;:
    main()
    cv.destroyAllWindows()
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><p><a href="https://www.learnopencv.com/image-inpainting-with-opencv-c-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/image-inpainting-with-opencv-c-python/</a></p>`,48)]))}const l=n(p,[["render",o],["__file","2019-05-28-_OpenCV实战_34 使用OpenCV进行图像修复.html.vue"]]),c=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-28-_OpenCV%E5%AE%9E%E6%88%98_34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D.html","title":"[OpenCV实战]34 使用OpenCV进行图像修复","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-05-28T16:53:38.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]34 使用OpenCV进行图像修复 本文将描述一类称为图像修复的区域填充算法。想象一下找一张旧的家庭照片。你扫描它，它看起来很棒，除了一些划痕。当然，你可以在photoshop中加载照片并修复划痕。除此之外可以编写10行代码以使用OpenCV中的修复算法来解决问题。 1 什么是图像修复 图像修复是计算机视觉中的一类算法，其目标是填充...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-28-_OpenCV%E5%AE%9E%E6%88%98_34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]34 使用OpenCV进行图像修复"}],["meta",{"property":"og:description","content":"[OpenCV实战]34 使用OpenCV进行图像修复 本文将描述一类称为图像修复的区域填充算法。想象一下找一张旧的家庭照片。你扫描它，它看起来很棒，除了一些划痕。当然，你可以在photoshop中加载照片并修复划痕。除此之外可以编写10行代码以使用OpenCV中的修复算法来解决问题。 1 什么是图像修复 图像修复是计算机视觉中的一类算法，其目标是填充..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D/20190528154024747.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-05-28T16:53:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]34 使用OpenCV进行图像修复\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D/20190528154024747.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D/20190528154024813.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D34%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E4%BF%AE%E5%A4%8D/20190528154025387.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-05-28T16:53:38.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 什么是图像修复","slug":"_1-什么是图像修复","link":"#_1-什么是图像修复","children":[{"level":3,"title":"1.1 INPAINT_NS : Navier-Stokes based Inpainting","slug":"_1-1-inpaint-ns-navier-stokes-based-inpainting","link":"#_1-1-inpaint-ns-navier-stokes-based-inpainting","children":[]},{"level":3,"title":"1.2 INPAINT_TELEA : Fast Marching Method based","slug":"_1-2-inpaint-telea-fast-marching-method-based","link":"#_1-2-inpaint-telea-fast-marching-method-based","children":[]},{"level":3,"title":"1.3 方法比较与函数实现","slug":"_1-3-方法比较与函数实现","link":"#_1-3-方法比较与函数实现","children":[]}]},{"level":2,"title":"2 结果与代码","slug":"_2-结果与代码","link":"#_2-结果与代码","children":[{"level":3,"title":"2.1 结果","slug":"_2-1-结果","link":"#_2-1-结果","children":[]},{"level":3,"title":"2.2 代码","slug":"_2-2-代码","link":"#_2-2-代码","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":7.4,"words":2221},"filePathRelative":"blog/opencv/opencv实战/2019-05-28-[OpenCV实战]34 使用OpenCV进行图像修复.md","localizedDate":"2019年5月29日","excerpt":"\\n<p>本文将描述一类称为图像修复的区域填充算法。想象一下找一张旧的家庭照片。你扫描它，它看起来很棒，除了一些划痕。当然，你可以在photoshop中加载照片并修复划痕。除此之外可以编写10行代码以使用OpenCV中的修复算法来解决问题。</p>\\n<h2>1 什么是图像修复</h2>\\n<p>图像修复是计算机视觉中的一类算法，其目标是填充图像或视频内的区域。该区域使用二进制掩模进行标识，填充通常根据需要填充的区域边界信息来完成。图像修复的最常见应用是恢复旧的扫描照片。它还用于删除图像中的小的不需要的对象。</p>\\n<p>在本节中，我们将简要讨论在OpenCV中实现的两种修复算法。</p>\\n<h3>1.1 INPAINT_NS : Navier-Stokes based Inpainting</h3>","autoDesc":true}');export{l as comp,c as data};
