import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o,c as s,a as e,b as i,d as t,e as p}from"./app-MsA2k2kn.js";const l={},c=e("h1",{id:"opencv实战-32-使用opencv进行非真实感渲染",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-32-使用opencv进行非真实感渲染","aria-hidden":"true"},"#"),i(" [OpenCV实战]32 使用OpenCV进行非真实感渲染")],-1),_=e("figure",null,[e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152213957.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),g=e("p",null,"有人认为使用高斯内核简单地模糊图像，检测边缘，并将两个图像组合以获得上面所示卡通化图像。虽然在大多数区域中所有图像看起来都很平滑之后，边缘会被保留。结果看起来很荒谬; 这是一个糟糕的主意。通过双边滤波可以完成这项工作，双边滤波可能是计算机视觉中最常用的边缘平滑滤波器，但它很慢。你永远不会在实时应用程序中使用它。我很高兴看到在OpenCV 3中非常快速地实现了保边滤波器。结果与双边滤波非常相似，但速度更快。这是SIGGRAPH 2011论文Domain transform for edge-aware image and video processing实现。论文作者为Eduardo Gastal and Manuel Oliveira。论文见：",-1),d={href:"http://www.inf.ufrgs.br/~eslgastal/DomainTransform/Gastal_Oliveira_SIGGRAPH2011_Domain_Transform.pdf",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"保边滤波器详细见：",-1),h={href:"https://blog.csdn.net/eejieyang/article/details/52333112",target:"_blank",rel:"noopener noreferrer"},u=e("h2",{id:"_1-保边滤波的频域变换",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-保边滤波的频域变换","aria-hidden":"true"},"#"),i(" 1 保边滤波的频域变换")],-1),f=e("p",null,"作者Eduardo Gastal在他的项目页面上提供了很多材料来解释论文及其应用。详细链接见：",-1),F={href:"http://www.inf.ufrgs.br/~eslgastal/DomainTransform/",target:"_blank",rel:"noopener noreferrer"},b=p(`<p>在OpenCV 3中，本文使用Photo模块下的Computational Photography子模块中的四个函数实现。以下部分通过示例解释这些功能及其参数。在所有示例中，我们将使用下面的图像作为输入图像。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152214675.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-1-保边滤波器edge-preserving-filter" tabindex="-1"><a class="header-anchor" href="#_1-1-保边滤波器edge-preserving-filter" aria-hidden="true">#</a> 1.1 保边滤波器Edge Preserving Filter</h3><h4 id="_1-1-1-函数调用" tabindex="-1"><a class="header-anchor" href="#_1-1-1-函数调用" aria-hidden="true">#</a> 1.1.1 函数调用</h4><p>OpenCV中保边滤波器调用函数为edgePreservingFilter。</p><p>函数具体调用如下：</p><p>C++:</p><pre><code>edgePreservingFilter(Mat src, Mat dst, int flags=1, float sigma_s=60, float sigma_r=0.4f)
</code></pre><p>Python:</p><pre><code>dst = cv2.edgePreservingFilter(src, flags=1, sigma_s=60, sigma_r=0.4)
</code></pre><p>函数具体参数如下：</p><p>SRC：8位3通道输入图像</p><p>DST：8位3通道输出图像</p><p>Flag：保变滤波器类型。取值RECURS_FILTER（递归滤波）= 1和NORMCONV_FILTER（归一化卷积）=2。使用RECURS_FILTER选项比NORMCONV_FILTER快约3.5倍。但NORMCONV_FILTER产生边缘锐化。当不希望锐化时，要求速度应该使用RECURS_FILTER。</p><p>sigma_s：范围在0到200之间（详见下文）</p><p>sigma_r：范围在0到1之间（详见下文）</p><p>参数sigma_s和sigma_r是什么意思？</p><p>图像处理和计算机视觉中的大多数平滑滤波器（例如高斯滤波器或盒式滤波器）具有称为sigma_s（用于Sigma_Spatial）的参数，其确定平滑量。典型的平滑滤波器通过其邻居的加权和来替换像素的值。邻域越大，过滤后的图像越平滑。邻域的大小与参数sigma_s成正比。</p><p>在保边滤波器中，有两个相互竞争的目标：a）平滑图像b）不平滑边缘/颜色边界。换句话说，我们不能简单地用它的邻居的加权和来代替像素的颜色。相反，我们想要将像素中的颜色值替换为邻域中的像素的平均值，使其也具有与像素类似的颜色。所以我们有两个参数：sigma_s和sigma_r。就像其他平滑滤波器一样，sigma_s控制邻域的大小，sigma_r（用于sigma_range）控制邻域内的不同颜色的平均值。较大的sigma_r导致大面积的恒定颜色区域。</p><h4 id="_1-1-2-edgepreservingfilter结果" tabindex="-1"><a class="header-anchor" href="#_1-1-2-edgepreservingfilter结果" aria-hidden="true">#</a> 1.1.2 edgePreservingFilter结果</h4><p>将edgePreservingFilter与RECURS_FILTER一起应用的结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152214597.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>施加edgePreservingFilter与NORMCONV_FILTER的结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152214595.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>正如您所看到的，两个结果非常接近，因此我建议使用 RECURS_FILTER， 因为它比NORMCONV_FILTER快。</p><h3 id="_1-2-细节增强" tabindex="-1"><a class="header-anchor" href="#_1-2-细节增强" aria-hidden="true">#</a> 1.2 细节增强</h3><p>顾名思义，过滤器可以增强细节，使图像更清晰。调用参数如下：</p><p>C++:</p><pre><code>detailEnhance(Mat src, Mat dst, float sigma_s=10, float sigma_r=0.15f)
</code></pre><p>Python:</p><pre><code>dst = cv2.detailEnhance(src, sigma_s=10, sigma_r=0.15)
</code></pre><p>参数与保边滤波器调用相同。下图显示了结果细节增强过滤器。请注意，整个图像比输入图像更清晰。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152215397.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-3-素描滤波器" tabindex="-1"><a class="header-anchor" href="#_1-3-素描滤波器" aria-hidden="true">#</a> 1.3 素描滤波器</h3><p>此过滤器生成的输出看起来像铅笔草图。有两个输出，一个是将滤镜应用于彩色输入图像的结果，另一个是将其应用于输入图像的灰度版本的结果。坦率地说，我对这个过滤器印象不深，因为结果看起来不太棒。调用如下：</p><p>C++:</p><pre><code>pencilSketch(Mat src, Mat dst_gray, Mat dst_color, float sigma_s=60, float sigma_r=0.07f, float shade_factor=0.02f)
</code></pre><p>Python:</p><pre><code>dst_gray, dst_color = cv2.pencilSketch(src, sigma_s=60, sigma_r=0.07, shade_factor=0.05)
</code></pre><p>参数与边缘增强滤镜相同。shade_factor（范围0到0.1）是输出图像强度的简单缩放。值越高，结果越亮。</p><p>将pencilSketch滤镜应用于输入图像的结果如下所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152214968.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152215419.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-4-风格化滤波器" tabindex="-1"><a class="header-anchor" href="#_1-4-风格化滤波器" aria-hidden="true">#</a> 1.4 风格化滤波器</h3><p>风格化过滤器产生的输出看起来像使用水彩绘制的图像。调用函数如下：</p><p>C++:</p><pre><code>stylization(Mat src, Mat dst, float sigma_s=60, float sigma_r=0.45f)
</code></pre><p>Python:</p><pre><code>dst = cv2.stylization(src, sigma_s=60, sigma_r=0.07)
</code></pre><p>参数与边缘增强滤镜相同。应用于输入图像的结果如下所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]32 使用OpenCV进行非真实感渲染/20190524152214814.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-代码" tabindex="-1"><a class="header-anchor" href="#_2-代码" aria-hidden="true">#</a> <strong>2 代码</strong></h2><p>所有代码见：</p>`,53),w={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"C++:",-1),y=e("pre",null,[e("code",null,`#include "pch.h"
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

int main()
{
	// Read image 读取图像
	Mat im = imread("./image/cow.jpg");
	Mat imout, imout_gray;

	// Edge preserving filter with two different flags. 保边滤波器
	edgePreservingFilter(im, imout, RECURS_FILTER);
	imwrite("edge-preserving-recursive-filter.jpg", imout);

	edgePreservingFilter(im, imout, NORMCONV_FILTER);
	imwrite("edge-preserving-normalized-convolution-filter.jpg", imout);

	// Detail enhance filter 边缘增强滤波器
	detailEnhance(im, imout);
	imwrite("detail-enhance.jpg", imout);

	// Pencil sketch filter 素描滤波器
	pencilSketch(im, imout_gray, imout);
	imwrite("pencil-sketch.jpg", imout_gray);
	imwrite("pencil-sketch-color.jpg", imout_gray);

	// Stylization filter 风格化滤波器
	stylization(im, imout);
	imwrite("stylization.jpg", imout);

	return 0;
}
`)],-1),V=e("p",null,"Python:",-1),x=e("pre",null,[e("code",null,`import cv2

# Read image
im = cv2.imread("./image/cow.jpg");

# Edge preserving filter with two different flags.
imout = cv2.edgePreservingFilter(im, flags=cv2.RECURS_FILTER);
cv2.imwrite("edge-preserving-recursive-filter.jpg", imout);

imout = cv2.edgePreservingFilter(im, flags=cv2.NORMCONV_FILTER);
cv2.imwrite("edge-preserving-normalized-convolution-filter.jpg", imout);

# Detail enhance filter
imout = cv2.detailEnhance(im);
cv2.imwrite("detail-enhance.jpg", imout);

# Pencil sketch filter
imout_gray, imout = cv2.pencilSketch(im, sigma_s=60, sigma_r=0.07, shade_factor=0.05);
cv2.imwrite("pencil-sketch.jpg", imout_gray);
cv2.imwrite("pencil-sketch-color.jpg", imout);

# Stylization filter
cv2.stylization(im,imout);
cv2.imwrite("stylization.jpg", imout);
`)],-1),C=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),i(" 3 参考")],-1),R={href:"https://www.learnopencv.com/non-photorealistic-rendering-using-opencv-python-c/",target:"_blank",rel:"noopener noreferrer"};function O(G,L){const a=r("ExternalLinkIcon");return o(),s("div",null,[c,_,g,e("p",null,[e("a",d,[i("http://www.inf.ufrgs.br/~eslgastal/DomainTransform/Gastal_Oliveira_SIGGRAPH2011_Domain_Transform.pdf"),t(a)])]),m,e("p",null,[e("a",h,[i(" https://blog.csdn.net/eejieyang/article/details/52333112 "),t(a)])]),u,f,e("p",null,[e("a",F,[i(" http://www.inf.ufrgs.br/~eslgastal/DomainTransform/ "),t(a)])]),b,e("p",null,[e("a",w,[i(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),t(a)])]),v,y,V,x,C,e("ul",null,[e("li",null,[e("a",R,[i(" https://www.learnopencv.com/non-photorealistic-rendering-using-opencv-python-c/ "),t(a)])])])])}const j=n(l,[["render",O],["__file","2019-05-24-_OpenCV实战_32 使用OpenCV进行非真实感渲染.html.vue"]]);export{j as default};
