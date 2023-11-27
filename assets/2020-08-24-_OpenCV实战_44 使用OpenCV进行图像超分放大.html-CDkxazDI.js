import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as r,c as a,a as e,b as n,d as i,e as l}from"./app-MsA2k2kn.js";const u={},c=e("h1",{id:"opencv实战-44-使用opencv进行图像超分放大",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-44-使用opencv进行图像超分放大","aria-hidden":"true"},"#"),n(" [OpenCV实战]44 使用OpenCV进行图像超分放大")],-1),v=e("p",null,"图像超分辨率（Image Super Resolution）是指从低分辨率图像或图像序列得到高分辨率图像。图像超分辨率是计算机视觉领域中一个非常重要的研究问题，广泛应用于医学图像分析、生物识别、视频监控和安全等领域。随着深度学习技术的发展，基于深度学习的图像超分方法在多个测试任务上，相比传统图像超分方法，取得了更优的性能和效果。 关于基于深度学习的图像超分辨率的综述可以见文章：",-1),o=e("blockquote",null,[e("p",null,[e("a",{href:"https:_www.cnblogs.com_carsonzhu_p_10860594"},"【超分辨率】—图像超分辨率(Super-Resolution)技术研究")])],-1),m=e("p",null,"关于基于深度学习的图像超分辨率放大的介绍和最新进展可以见文章：",-1),b=e("blockquote",null,[e("p",null,[e("a",{href:"https:_www.cnblogs.com_carsonzhu_p_11122244"},"【超分辨率】—基于深度学习的图像超分辨率最新进展与趋势")])],-1),p=e("p",null,"OpenCV contrib库中dnn_superres模块用于实现基于深度学习的图像超分放大，本文主要介绍使用此模块进行超分放大。关于dnn_superres模块的代码介绍可以见：",-1),g={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/dnn_superres",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：",-1),_={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},q=e("p",null,"本文所有代码见：",-1),y={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"_1-opencv-dnn-superres模块介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-opencv-dnn-superres模块介绍","aria-hidden":"true"},"#"),n(" 1 OpenCV dnn_superres模块介绍")],-1),S=e("p",null,[n("dnn_superres包含四种基于深度学习的算法，用于放大图像，这些模型能让图像放大2~4倍。具体模型介绍如下： "),e("strong",null,"EDSR")],-1),f={href:"https://github.com/Saafke/EDSR_Tensorflow/tree/master/models",target:"_blank",rel:"noopener noreferrer"},C={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},w=e("li",null,"模型大小：〜38.5MB。这是一个量化版本，因此可以将其上传到GitHub。（原始模型大小为150MB。）",-1),N=e("li",null,"模型参数：提供x2，x3，x4训练模型",-1),R=e("li",null,"优点：高精度",-1),O=e("li",null,"缺点：模型文件大且运行速度慢",-1),V=e("li",null,"速度：在Intel i7-9700K CPU上的256x256图像，每个放大比例所需时间均小于3秒。",-1),E=e("p",null,[e("strong",null,"ESPCN")],-1),z={href:"https://github.com/fannymonori/TF-ESPCN/tree/master/export",target:"_blank",rel:"noopener noreferrer"},I={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},k=e("li",null,"模型大小：〜100kb",-1),M=e("li",null,"模型参数：提供x2，x3，x4训练模型",-1),P=e("li",null,"优点：体积小，速度快，并且仍然表现良好",-1),T=e("li",null,"缺点：与更新的、更健壮的模型相比，在视觉上表现更差。",-1),j=e("li",null,"速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.01秒。",-1),L=e("p",null,[e("strong",null,"FSRCNN")],-1),A={href:"https://github.com/Saafke/FSRCNN_Tensorflow",target:"_blank",rel:"noopener noreferrer"},D=e("li",null,[n("论文："),e("a",{href:"http:_mmlab.ie.cuhk.edu.hk_projects_fsrcnn"},"Accelerating the Super-Resolution Convolutional Neural Network")],-1),B=e("li",null,"模型大小：〜40KB（对于FSRCNN-small，约为9kb）",-1),F=e("li",null,"模型参数：提供x2，x3，x4训练模型和small训练模型",-1),W=e("li",null,"优点：快速，小巧",-1),H=e("li",null,"缺点：不够准确",-1),U=e("li",null,"速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.01秒。",-1),K=e("li",null,"其他：FSRCNN-small具有较少的参数，因此精度较低，但速度更快。",-1),Q=e("p",null,[e("strong",null,"LapSRN")],-1),Z={href:"https://github.com/fannymonori/TF-LAPSRN",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},G=e("li",null,"模型大小：1-5Mb之间",-1),J=e("li",null,"模型参数：提供x2，x4，x8训练模型",-1),X=e("li",null,"优点：该模型可以通过一次向前传递进行多尺度超分辨率。可以支持2x，4x，8x和[2x，4x]和[2x，4x，8x]超分辨率。",-1),$=e("li",null,"缺点：它比ESPCN和FSRCNN慢，并且精度比EDSR差。",-1),ee=e("li",null,"速度：在Intel i7-9700K CPU上的256x256图像上，每个放大比例所需时间均小于0.1秒。。",-1),ne=l(`<h2 id="_2-opencv-dnn-superres模块使用" tabindex="-1"><a class="header-anchor" href="#_2-opencv-dnn-superres模块使用" aria-hidden="true">#</a> 2 OpenCV dnn_superres模块使用</h2><h3 id="_2-1-图像超分放大单输出" tabindex="-1"><a class="header-anchor" href="#_2-1-图像超分放大单输出" aria-hidden="true">#</a> 2.1 图像超分放大单输出</h3><h4 id="_2-1-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_2-1-1-接口介绍" aria-hidden="true">#</a> 2.1.1 接口介绍</h4><p>在本节中，我们将学习如何使用dnn_superres中的函数，通过已有训练的神经网络对图像进行放大。实际上就是调用模型构造模型，只不过dnn_superres对这些模型的调用函数进行了封装，并且建立了通用接口。调用方法如下： <strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Make dnn super resolution instance
    // 创建dnn超分辨率对象
    DnnSuperResImpl sr;
    // 读取模型
    sr.readModel(path);
    // 设定算法和放大比例
    sr.setModel(algorithm, scale);
    // 放大图像
    sr.upsample(img, img_new);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 创建模型
    sr = dnn_superres.DnnSuperResImpl_create()
    # 读取模型
    sr.readModel(path)
    #  设定算法和放大比例
    sr.setModel(algorithm, scale)
    # 放大图像
    img_new = sr.upsample(img)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-1-2-示例代码" aria-hidden="true">#</a> 2.1.2 示例代码</h4><p>主要展示通过OpenCV自带resize函数或调用深度学习将一张图像发大指定倍数，C++代码和Python代码如下。 <strong>C++/dnn_superres.cpp</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 图像超分放大单输出
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/dnn_superres.hpp&gt;
using namespace std;
using namespace cv;
using namespace dnn;
using namespace dnn_superres;
int main()
{
	string img_path = string(&quot;./image/image.png&quot;);
	// 可选择算法，bilinear, bicubic, edsr, espcn, fsrcnn or lapsrn
	string algorithm = string(&quot;fsrcnn&quot;);
	// 放大比例，可输入值2，3，4
	int scale = 4;
	// 模型路径
	string path = &quot;./model/FSRCNN-small_x4.pb&quot;;
	// Load the image
	// 载入图像
	Mat img = cv::imread(img_path);
	// 如果输入的图像为空
	if (img.empty())
	{
		std::cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;
		return -2;
	}
	Mat original_img(img);
	// Make dnn super resolution instance
	// 创建dnn超分辨率对象
	DnnSuperResImpl sr;
	// 超分放大后的图像
	Mat img_new;
	// 双线性插值
	if (algorithm == &quot;bilinear&quot;)
	{
		resize(img, img_new, Size(), scale, scale, cv::INTER_LINEAR);
	}
	// 双三次插值
	else if (algorithm == &quot;bicubic&quot;)
	{
		resize(img, img_new, Size(), scale, scale, cv::INTER_CUBIC);
	}
	else if (algorithm == &quot;edsr&quot; || algorithm == &quot;espcn&quot; || algorithm == &quot;fsrcnn&quot; || algorithm == &quot;lapsrn&quot;)
	{
		// 读取模型
		sr.readModel(path);
		// 设定算法和放大比例
		sr.setModel(algorithm, scale);
		// 放大图像
		sr.upsample(img, img_new);
	}
	else
	{
		std::cerr &lt;&lt; &quot;Algorithm not recognized. \\n&quot;;
	}
	// 如果失败
	if (img_new.empty())
	{
		// 放大失败
		std::cerr &lt;&lt; &quot;Upsampling failed. \\n&quot;;
		return -3;
	}
	cout &lt;&lt; &quot;Upsampling succeeded. \\n&quot;;
	// Display image
	// 展示图片
	cv::namedWindow(&quot;Initial Image&quot;, WINDOW_AUTOSIZE);
	// 初始化图片
	cv::imshow(&quot;Initial Image&quot;, img_new);
	//cv::imwrite(&quot;./saved.jpg&quot;, img_new);
	cv::waitKey(0);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres.py</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Fri Aug 20 20:08:22 2020
@author: luohenyueji
图像超分放大单输出
&quot;&quot;&quot;
import cv2
from cv2 import dnn_superres
def main():
    img_path = &quot;./image/image.png&quot;
    # 可选择算法，bilinear, bicubic, edsr, espcn, fsrcnn or lapsrn
    algorithm = &quot;bilinear&quot;
    # 放大比例，可输入值2，3，4
    scale = 4
    # 模型路径
    path = &quot;./model/LapSRN_x4.pb&quot;
    # 载入图像
    img = cv2.imread(img_path)
    # 如果输入的图像为空
    if img is None:
        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))
        return
    original_img = img.copy()
    # 创建模型
    sr = dnn_superres.DnnSuperResImpl_create()
    if algorithm == &quot;bilinear&quot;:
        img_new = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)
    elif algorithm == &quot;bicubic&quot;:
        img_new = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    elif algorithm == &quot;edsr&quot; or algorithm == &quot;espcn&quot; or algorithm == &quot;fsrcnn&quot; or algorithm == &quot;lapsrn&quot;:
        # 读取模型
        sr.readModel(path)
        #  设定算法和放大比例
        sr.setModel(algorithm, scale)
        # 放大图像
        img_new = sr.upsample(img)
    else:
        print(&quot;Algorithm not recognized&quot;)
    # 如果失败
    if img_new is None:
        print(&quot;Upsampling failed&quot;)
    print(&quot;Upsampling succeeded. \\n&quot;)
    # Display
    # 展示图片
    cv2.namedWindow(&quot;Initial Image&quot;, cv2.WINDOW_AUTOSIZE)
    # 初始化图片
    cv2.imshow(&quot;Initial Image&quot;, img_new)
    cv2.imwrite(&quot;./saved.jpg&quot;, img_new)
    cv2.waitKey(0)
if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-结果" tabindex="-1"><a class="header-anchor" href="#_2-1-3-结果" aria-hidden="true">#</a> 2.1.3 结果</h4><p>放大四倍，不同算法效果如下所示：</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1src.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">bilinear</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1bilinear.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">bicubic</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1bicubic.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">edsr</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1edsr.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">espcn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1espcn.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">fsrcnn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1fsrcnn.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">fsrcnn-small</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1fsrcnn-small.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">lapsrn</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1lapsrn.jpg" alt="" loading="lazy"></td></tr></tbody></table><h3 id="_2-2-图像超分放大多输出" tabindex="-1"><a class="header-anchor" href="#_2-2-图像超分放大多输出" aria-hidden="true">#</a> 2.2 图像超分放大多输出</h3><h4 id="_2-2-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_2-2-1-接口介绍" aria-hidden="true">#</a> 2.2.1 接口介绍</h4><p>本节主要介绍如何通过LapSRN多输出来放大图像。如果给出了节点的名称，OpenCV的dnn模块支持一次推断访问多个节点。LapSRN模型可以在一次推理运行中提供更多输出。现在，LapSRN模型可以支持2x，4x，8x和（2x，4x）和（2x，4x，8x）超分辨率。经过训练的LapSRN模型文件具有以下输出节点名称：</p><ul><li>2x模型：NCHW_output</li><li>4x模型：NCHW_output_2x，NCHW_output_4x</li><li>8x模型：NCHW_output_2x，NCHW_output_4x，NCHW_output_8x</li></ul><p>其次这个功能用处不那么大，LapSRN效果很一般。不过看看挺好的。 由于Python相关实现代码有所问题，因此该部分只提供C++代码。调用方法如下。相比单输出放大，需要设定输出层名字并通过upsampleMultioutput输出各输出层的放大结果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 可选多输入放大比例2，4，8。&#39;,&#39;分隔放大比例
    string scales_str = string(&quot;2,4,8&quot;);
    // 可选模型输出放大层比例名，NCHW_output_2x,NCHW_output_4x，NCHW_output_8x
    // 需要根据模型和输入放大比例共同确定确定
    string output_names_str = string(&quot;NCHW_output_2x,NCHW_output_4x,NCHW_output_8x&quot;);
    // 创建Dnn Superres对象
    DnnSuperResImpl sr;
    // 获得最大放大比例
    int scale = *max_element(scales.begin(), scales.end());
    std::vector&lt;Mat&gt; outputs;
    // 读取模型
    sr.readModel(path);
    // 设定模型输出
    sr.setModel(&quot;lapsrn&quot;, scale);
    // 多输出超分放大图像
    sr.upsampleMultioutput(img, outputs, scales, node_names);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-2-2-示例代码" aria-hidden="true">#</a> 2.2.2 示例代码</h4><p><strong>C++/dnn_superres_multioutput.cpp</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 图像超分放大多输出
#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/dnn_superres.hpp&gt;
using namespace std;
using namespace cv;
using namespace dnn_superres;
int main()
{
	// 图像路径
	string img_path = string(&quot;./image/image.png&quot;);
	if (img_path.empty())
	{
		printf(&quot;image is empty!&quot;);
	}
	// 可选多输入放大比例2，4，8。&#39;,&#39;分隔放大比例
	string scales_str = string(&quot;2,4,8&quot;);
	// 可选模型输出放大层比例名，NCHW_output_2x,NCHW_output_4x，NCHW_output_8x
	// 需要根据模型和输入放大比例共同确定确定
	string output_names_str = string(&quot;NCHW_output_2x,NCHW_output_4x,NCHW_output_8x&quot;);
	// 模型路径
	std::string path = string(&quot;./model/LapSRN_x8.pb&quot;);
	// Parse the scaling factors
	// 解析放大比例因子
	std::vector&lt;int&gt; scales;
	char delim = &#39;,&#39;;
	{
		std::stringstream ss(scales_str);
		std::string token;
		while (std::getline(ss, token, delim))
		{
			scales.push_back(atoi(token.c_str()));
		}
	}
	// Parse the output node names
	// 解析模型放大层参数
	std::vector&lt;String&gt; node_names;
	{
		std::stringstream ss(output_names_str);
		std::string token;
		while (std::getline(ss, token, delim))
		{
			node_names.push_back(token);
		}
	}
	// Load the image
	// 导入图片
	Mat img = cv::imread(img_path);
	Mat original_img(img);
	if (img.empty())
	{
		std::cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;
		return -2;
	}
	// Make dnn super resolution instance
	// 创建Dnn Superres对象
	DnnSuperResImpl sr;
	// 获得最大放大比例
	int scale = *max_element(scales.begin(), scales.end());
	std::vector&lt;Mat&gt; outputs;
	// 读取模型
	sr.readModel(path);
	// 设定模型输出
	sr.setModel(&quot;lapsrn&quot;, scale);
	// 多输出超分放大图像
	sr.upsampleMultioutput(img, outputs, scales, node_names);
	for (unsigned int i = 0; i &lt; outputs.size(); i++)
	{
		cv::namedWindow(&quot;Upsampled image&quot;, WINDOW_AUTOSIZE);
		// 在图上显示当前放大比例
		cv::putText(outputs[i], format(&quot;Scale %d&quot;, scales[i]), Point(10, 30), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);
		cv::imshow(&quot;Upsampled image&quot;, outputs[i]);
		cv::imwrite(to_string(i) + &quot;.jpg&quot;, outputs[i]);
		cv::waitKey(-1);
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3-结果" tabindex="-1"><a class="header-anchor" href="#_2-2-3-结果" aria-hidden="true">#</a> 2.2.3 结果</h4><p>放大二倍、四倍、八倍的LapSRN算法效果如下所示：</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_1src.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x2</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn2.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x4</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn4.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">LapSRN_x8</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_2lapsrn8.jpg" alt="" loading="lazy"></td></tr></tbody></table><h3 id="_2-3-视频超分放大" tabindex="-1"><a class="header-anchor" href="#_2-3-视频超分放大" aria-hidden="true">#</a> 2.3 视频超分放大</h3><p>实际视频超分放大输出，就是把视频每一帧提取出来，超分放大每一帧图像。代码如下，实际上如果电脑配置很一般不建议视频超分放大，对电脑配置性能要求很高，建议使用opencv cuda进行运算。 <strong>C++/dnn_superres_video.cpp</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 视频超分放大多输出
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/dnn_superres.hpp&gt;
using namespace std;
using namespace cv;
using namespace dnn_superres;
int main()
{
	string input_path = string(&quot;./video/chaplin.mp4&quot;);
	string output_path = string(&quot;./video/https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_chaplin.mp4&quot;);
	// 选择模型 edsr, espcn, fsrcnn or lapsrn
	string algorithm = string(&quot;lapsrn&quot;);
	// 放大比例，2，3，4，8，根据模型结构选择
	int scale = 2;
	// 模型路径
	string path = string(&quot;./model/LapSRN_x2.pb&quot;);
	// 打开视频
	VideoCapture input_video(input_path);
	// 输入图像编码尺寸
	int ex = static_cast&lt;int&gt;(input_video.get(CAP_PROP_FOURCC));
	// 获得输出视频图像尺寸
	Size S = Size((int)input_video.get(CAP_PROP_FRAME_WIDTH) * scale,
		(int)input_video.get(CAP_PROP_FRAME_HEIGHT) * scale);
	VideoWriter output_video;
	output_video.open(output_path, ex, input_video.get(CAP_PROP_FPS), S, true);
	// 如果视频没有打开
	if (!input_video.isOpened())
	{
		std::cerr &lt;&lt; &quot;Could not open the video.&quot; &lt;&lt; std::endl;
		return -1;
	}
	// 读取超分放大模型
	DnnSuperResImpl sr;
	sr.readModel(path);
	sr.setModel(algorithm, scale);
	for (;;)
	{
		Mat frame, output_frame;
		input_video &gt;&gt; frame;
		if (frame.empty())
			break;
		// 上采样图像
		sr.upsample(frame, output_frame);
		output_video &lt;&lt; output_frame;
		namedWindow(&quot;Upsampled video&quot;, WINDOW_AUTOSIZE);
		imshow(&quot;Upsampled video&quot;, output_frame);
		namedWindow(&quot;Original video&quot;, WINDOW_AUTOSIZE);
		imshow(&quot;Original video&quot;, frame);
		char c = (char)waitKey(1);
		// esc退出
		if (c == 27)
		{
			break;
		}
	}
	input_video.release();
	output_video.release();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_video.py</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Fri Aug 20 21:08:22 2020
@author: luohenyueji
视频超分放大
&quot;&quot;&quot;
import cv2
from cv2 import dnn_superres
def main():
    input_path = &quot;./video/chaplin.mp4&quot;
    output_path = &quot;./video/https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D44%20%E4%BD%BF%E7%94%A8OpenCV%E8%BF%9B%E8%A1%8C%E5%9B%BE%E5%83%8F%E8%B6%85%E5%88%86%E6%94%BE%E5%A4%A7/out_chaplin.mp4&quot;
    # 选择模型 edsr, espcn, fsrcnn or lapsrn
    algorithm = &quot;lapsrn&quot;
    # 放大比例，2，3，4，8，根据模型结构选择
    scale = 2
    # 模型路径
    path = &quot;./model/LapSRN_x2.pb&quot;
    # 打开视频
    input_video = cv2.VideoCapture(input_path)
    # 输入图像编码尺寸
    ex = int(input_video.get(cv2.CAP_PROP_FOURCC))
    # 获得输出视频图像尺寸
    # 如果视频没有打开
    if input_video is None:
        print(&quot;Could not open the video.&quot;)
        return
    S = (
    int(input_video.get(cv2.CAP_PROP_FRAME_WIDTH)) * scale, int(input_video.get(cv2.CAP_PROP_FRAME_HEIGHT)) * scale)
    output_video = cv2.VideoWriter(output_path, ex, input_video.get(cv2.CAP_PROP_FPS), S, True)
    # 读取超分放大模型
    sr = dnn_superres.DnnSuperResImpl_create()
    sr.readModel(path)
    sr.setModel(algorithm, scale)
    while True:
        ret, frame = input_video.read()  # 捕获一帧图像
        if not ret:
            print(&quot;read video error&quot;)
            return
        # 上采样图像
        output_frame = sr.upsample(frame)
        output_video.write(output_frame)
        cv2.namedWindow(&quot;Upsampled video&quot;, cv2.WINDOW_AUTOSIZE);
        cv2.imshow(&quot;Upsampled video&quot;, output_frame)
        cv2.namedWindow(&quot;Original video&quot;, cv2.WINDOW_AUTOSIZE);
        cv2.imshow(&quot;Original video&quot;, frame)
        c = cv2.waitKey(1);
        # esc退出
        if 27 == c:
            break
    input_video.release()
    output_video.release()
if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-不同图像超分算法性能比较" tabindex="-1"><a class="header-anchor" href="#_3-不同图像超分算法性能比较" aria-hidden="true">#</a> 3 不同图像超分算法性能比较</h2><h3 id="_3-1-不同图像超分算法效果评估" tabindex="-1"><a class="header-anchor" href="#_3-1-不同图像超分算法效果评估" aria-hidden="true">#</a> 3.1 不同图像超分算法效果评估</h3><p>通过PSNR和SSIM来评估图像放大后的效果，PSNR越大，图像失真越小。SSIM也是越大，图像失真越小。PSNR和SSIM介绍见博客：<a href="https:_www.cnblogs.com_vincent2012_archive_2012_10_13_2723152">PSNR和SSIM</a> 本节对比四类算法放大图像后的PSNR值和SSIM值，因为电脑性能原因只放大2倍。具体放大倍数可自行调试。代码如下： <strong>C++/dnn_superres_benchmark_quality.cpp</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 不同图像超分算法效果评估
#include &lt;iostream&gt;
#include &lt;opencv2/opencv_modules.hpp&gt;
#include &lt;opencv2/dnn_superres.hpp&gt;
#include &lt;opencv2/quality.hpp&gt;
#include &lt;opencv2/imgproc.hpp&gt;
#include &lt;opencv2/highgui.hpp&gt;
using namespace std;
using namespace cv;
using namespace dnn_superres;
// 展示图片
static void showBenchmark(vector&lt;Mat&gt; images, string title, Size imageSize,
	const vector&lt;String&gt; imageTitles,
	const vector&lt;double&gt; psnrValues,
	const vector&lt;double&gt; ssimValues)
{
	// 文字信息
	int fontFace = FONT_HERSHEY_COMPLEX_SMALL;
	int fontScale = 1;
	Scalar fontColor = Scalar(255, 255, 255);
	// 图像数量
	int len = static_cast&lt;int&gt;(images.size());
	int cols = 2, rows = 2;
	// 建立背景图像
	Mat fullImage = Mat::zeros(Size((cols * 10) + imageSize.width * cols, (rows * 10) + imageSize.height * rows),
		images[0].type());
	stringstream ss;
	int h_ = -1;
	// 拼接显示图片
	for (int i = 0; i &lt; len; i++)
	{
		int fontStart = 15;
		int w_ = i % cols;
		if (i % cols == 0)
			h_++;
		Rect ROI((w_ * (10 + imageSize.width)), (h_ * (10 + imageSize.height)), imageSize.width, imageSize.height);
		Mat tmp;
		resize(images[i], tmp, Size(ROI.width, ROI.height));
		ss &lt;&lt; imageTitles[i];
		putText(tmp,
			ss.str(),
			Point(5, fontStart),
			fontFace,
			fontScale,
			fontColor,
			1,
			16);
		ss.str(&quot;&quot;);
		fontStart += 20;
		ss &lt;&lt; &quot;PSNR: &quot; &lt;&lt; psnrValues[i];
		putText(tmp,
			ss.str(),
			Point(5, fontStart),
			fontFace,
			fontScale,
			fontColor,
			1,
			16);
		ss.str(&quot;&quot;);
		fontStart += 20;
		ss &lt;&lt; &quot;SSIM: &quot; &lt;&lt; ssimValues[i];
		putText(tmp,
			ss.str(),
			Point(5, fontStart),
			fontFace,
			fontScale,
			fontColor,
			1,
			16);
		ss.str(&quot;&quot;);
		fontStart += 20;
		tmp.copyTo(fullImage(ROI));
	}
	namedWindow(title, 1);
	imshow(title, fullImage);
	imwrite(&quot;save.jpg&quot;, fullImage);
	waitKey();
}
static Vec2d getQualityValues(Mat orig, Mat upsampled)
{
	double psnr = PSNR(upsampled, orig);
	// 前两个参数为对比图片，第三个参数为输出数组
	Scalar q = quality::QualitySSIM::compute(upsampled, orig, noArray());
	double ssim = mean(Vec3d((q[0]), q[1], q[2]))[0];
	return Vec2d(psnr, ssim);
}
int main()
{
	// 图片路径
	string img_path = string(&quot;./image/image.png&quot;);
	// 算法名称 edsr, espcn, fsrcnn or lapsrn
	string algorithm = string(&quot;lapsrn&quot;);
	// 模型路径，根据算法确定
	string model = string(&quot;./model/LapSRN_x2.pb&quot;);
	// 放大系数
	int scale = 2;
	Mat img = imread(img_path);
	if (img.empty())
	{
		cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img_path &lt;&lt; &quot;\\n&quot;;
		return -2;
	}
	// Crop the image so the images will be aligned
	// 裁剪图像，使图像对齐
	int width = img.cols - (img.cols % scale);
	int height = img.rows - (img.rows % scale);
	Mat cropped = img(Rect(0, 0, width, height));
	// Downscale the image for benchmarking
	// 缩小图像，以实现基准质量测试
	Mat img_downscaled;
	resize(cropped, img_downscaled, Size(), 1.0 / scale, 1.0 / scale);
	// Make dnn super resolution instance
	// 超分模型初始化
	DnnSuperResImpl sr;
	vector&lt;Mat&gt; allImages;
	// 放大后的图片
	Mat img_new;
	// Read and set the dnn model
	// 读取和设定模型
	sr.readModel(model);
	sr.setModel(algorithm, scale);
	// 放大图像
	sr.upsample(img_downscaled, img_new);
	vector&lt;double&gt; psnrValues = vector&lt;double&gt;();
	vector&lt;double&gt; ssimValues = vector&lt;double&gt;();
	// DL MODEL
	// 获得模型质量评估值
	Vec2f quality = getQualityValues(cropped, img_new);
	// 模型质量评价PSNR
	psnrValues.push_back(quality[0]);
	// 模型质量评价SSIM
	ssimValues.push_back(quality[1]);
	// 数值越大图像质量越好
	cout &lt;&lt; sr.getAlgorithm() &lt;&lt; &quot;:&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;
	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;
	// BICUBIC
	// INTER_CUBIC - 三次样条插值放大图像
	Mat bicubic;
	resize(img_downscaled, bicubic, Size(), scale, scale, INTER_CUBIC);
	quality = getQualityValues(cropped, bicubic);
	psnrValues.push_back(quality[0]);
	ssimValues.push_back(quality[1]);
	cout &lt;&lt; &quot;Bicubic &quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;
	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;
	// NEAREST NEIGHBOR
	// INTER_NEAREST - 最近邻插值
	Mat nearest;
	resize(img_downscaled, nearest, Size(), scale, scale, INTER_NEAREST);
	quality = getQualityValues(cropped, nearest);
	psnrValues.push_back(quality[0]);
	ssimValues.push_back(quality[1]);
	cout &lt;&lt; &quot;Nearest neighbor&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;
	cout &lt;&lt; &quot;----------------------&quot; &lt;&lt; endl;
	// LANCZOS
	// Lanczos插值放大图像
	Mat lanczos;
	resize(img_downscaled, lanczos, Size(), scale, scale, INTER_LANCZOS4);
	quality = getQualityValues(cropped, lanczos);
	psnrValues.push_back(quality[0]);
	ssimValues.push_back(quality[1]);
	cout &lt;&lt; &quot;Lanczos&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;PSNR: &quot; &lt;&lt; quality[0] &lt;&lt; &quot; SSIM: &quot; &lt;&lt; quality[1] &lt;&lt; endl;
	cout &lt;&lt; &quot;-----------------------------------------------&quot; &lt;&lt; endl;
	// 要显示的图片
	vector&lt;Mat&gt; imgs{ img_new, bicubic, nearest, lanczos };
	// 要显示的标题
	vector&lt;String&gt; titles{ sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot; };
	showBenchmark(imgs, &quot;Quality benchmark&quot;, Size(bicubic.cols, bicubic.rows), titles, psnrValues, ssimValues);
	waitKey(0);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_benchmark_quality.py</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Fri Aug 20 22:08:22 2020
@author: luohenyueji
不同图像超分算法效果评估
&quot;&quot;&quot;
import cv2
from cv2 import dnn_superres
import numpy as np
# TODO 绘图
def showBenchmark(imgs, titles, psnrValues, ssimValues):
    # 绘图
    for i in range(0, len(imgs)):
        # 标题绘图
        cv2.putText(imgs[i], titles[i], (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (255, 0, 255), 2, cv2.LINE_AA)
        # psnr值
        cv2.putText(imgs[i], &quot;PSNR: &quot; + str(psnrValues[i]), (10, 60), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (255, 0, 255), 2, cv2.LINE_AA)
        # ssim值
        cv2.putText(imgs[i], &quot;SSIM: &quot; + str(ssimValues[i]), (10, 90), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (255, 0, 255), 2, cv2.LINE_AA)
    # 图片拼接展示
    img = np.vstack([np.hstack([imgs[0], imgs[1]]), np.hstack([imgs[2], imgs[3]])])
    cv2.imshow(&quot;Quality benchmark&quot;, img)
    cv2.waitKey(0)
# TODO 图像质量评估
def getQualityValues(upsampled, orig):
    psnr = cv2.PSNR(upsampled, orig)
    q, _ = cv2.quality.QualitySSIM_compute(upsampled, orig)
    ssim = (q[0] + q[1] + q[2]) / 3
    return round(psnr, 3), round(ssim, 3)
def main():
    # 图片路径
    img_path = &quot;./image/butterfly.png&quot;
    # 算法名称 edsr, espcn, fsrcnn or lapsrn
    algorithm = &quot;lapsrn&quot;
    # 模型路径，根据算法确定
    model = &quot;./model/LapSRN_x2.pb&quot;
    # 放大系数
    scale = 2
    psnrValues = []
    ssimValues = []
    img = cv2.imread(img_path)
    if img is None:
        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))
    # Crop the image so the images will be aligned
    # 裁剪图像，使图像对齐
    width = img.shape[0] - (img.shape[0] % scale)
    height = img.shape[1] - (img.shape[1] % scale)
    cropped = img[0:width, 0:height]
    # Downscale the image for benchmarking
    # 缩小图像，以实现基准质量测试
    img_downscaled = cv2.resize(cropped, None, fx=1.0 / scale, fy=1.0 / scale)
    # Make dnn super resolution instance
    # 超分模型初始化
    sr = dnn_superres.DnnSuperResImpl_create()
    # Read and set the dnn model
    # 读取和设定模型
    sr.readModel(model)
    sr.setModel(algorithm, scale)
    # 放大图像
    img_new = sr.upsample(img_downscaled)
    # DL MODEL
    # 获得模型质量评估值
    psnr, ssim = getQualityValues(cropped, img_new)
    psnrValues.append(psnr)
    ssimValues.append(ssim)
    print(sr.getAlgorithm() + &quot;\\n&quot;)
    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)
    print(&quot;-&quot; * 50)
    # INTER_CUBIC - 三次样条插值放大图像
    bicubic = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    psnr, ssim = getQualityValues(cropped, bicubic)
    psnrValues.append(psnr)
    ssimValues.append(ssim)
    print(&quot;Bicubic \\n&quot;)
    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)
    print(&quot;-&quot; * 50)
    # INTER_NEAREST - 最近邻插值
    nearest = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)
    psnr, ssim = getQualityValues(cropped, nearest)
    psnrValues.append(psnr)
    ssimValues.append(ssim)
    print(&quot;Nearest neighbor \\n&quot;)
    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)
    print(&quot;-&quot; * 50)
    # Lanczos插值放大图像
    lanczos = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4);
    psnr, ssim = getQualityValues(cropped, lanczos)
    psnrValues.append(psnr)
    ssimValues.append(ssim)
    print(&quot;Lanczos \\n&quot;)
    print(&quot;PSNR: &quot; + str(psnr) + &quot; SSIM: &quot; + str(ssim) + &quot;\\n&quot;)
    print(&quot;-&quot; * 50)
    imgs = [img_new, bicubic, nearest, lanczos]
    titles = [sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot;]
    showBenchmark(imgs, titles, psnrValues, ssimValues)
if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过lapsrn模型进行超分放大，结果如图所示。可以知道的是lapsrn模型效果实际最好，但是实际中resize函数调用不同选项也会有类似结果，差距没有想象那么大。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_3quality.jpg" alt="" loading="lazy"></p><h3 id="_3-2-不同图像超分算法速度评估" tabindex="-1"><a class="header-anchor" href="#_3-2-不同图像超分算法速度评估" aria-hidden="true">#</a> 3.2 不同图像超分算法速度评估</h3><p>本节对比四类算法差分放大所需时间，因为电脑性能原因只放大2倍。具体放大倍数可自行调试。代码如下： <strong>C++/dnn_superres_benchmark_time.cpp</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 不同图像超分算法速度评估
#include &lt;iostream&gt;
#include &lt;opencv2/dnn_superres.hpp&gt;
#include &lt;opencv2/imgproc.hpp&gt;
#include &lt;opencv2/highgui.hpp&gt;
using namespace std;
using namespace cv;
using namespace dnn_superres;
static void showBenchmark(vector&lt;Mat&gt; images, string title, Size imageSize,
	const vector&lt;String&gt; imageTitles,
	const vector&lt;double&gt; perfValues)
{
	int fontFace = FONT_HERSHEY_COMPLEX_SMALL;
	int fontScale = 1;
	Scalar fontColor = Scalar(255, 255, 255);
	int len = static_cast&lt;int&gt;(images.size());
	int cols = 2, rows = 2;
	Mat fullImage = Mat::zeros(Size((cols * 10) + imageSize.width * cols, (rows * 10) + imageSize.height * rows),
		images[0].type());
	stringstream ss;
	int h_ = -1;
	for (int i = 0; i &lt; len; i++)
	{
		int fontStart = 15;
		int w_ = i % cols;
		if (i % cols == 0)
			h_++;
		Rect ROI((w_ * (10 + imageSize.width)), (h_ * (10 + imageSize.height)), imageSize.width, imageSize.height);
		Mat tmp;
		resize(images[i], tmp, Size(ROI.width, ROI.height));
		ss &lt;&lt; imageTitles[i];
		putText(tmp,
			ss.str(),
			Point(5, fontStart),
			fontFace,
			fontScale,
			fontColor,
			1,
			16);
		ss.str(&quot;&quot;);
		fontStart += 20;
		ss &lt;&lt; perfValues[i];
		putText(tmp,
			ss.str(),
			Point(5, fontStart),
			fontFace,
			fontScale,
			fontColor,
			1,
			16);
		ss.str(&quot;&quot;);
		tmp.copyTo(fullImage(ROI));
	}
	namedWindow(title, 1);
	imshow(title, fullImage);
	imwrite(&quot;save.jpg&quot;, fullImage);
	waitKey();
}
int main()
{
	// 图片路径
	string img_path = string(&quot;./image/butterfly.png&quot;);
	// 算法名称 edsr, espcn, fsrcnn or lapsrn
	string algorithm = string(&quot;lapsrn&quot;);
	// 模型路径，根据算法确定
	string model = string(&quot;./model/LapSRN_x2.pb&quot;);
	// 放大系数
	int scale = 2;
	Mat img = imread(img_path);
	if (img.empty())
	{
		cerr &lt;&lt; &quot;Couldn&#39;t load image: &quot; &lt;&lt; img &lt;&lt; &quot;\\n&quot;;
		return -2;
	}
	// Crop the image so the images will be aligned
	// 对齐图像
	int width = img.cols - (img.cols % scale);
	int height = img.rows - (img.rows % scale);
	Mat cropped = img(Rect(0, 0, width, height));
	// Downscale the image for benchmarking
	// 缩小图像，以实现基准测试
	Mat img_downscaled;
	resize(cropped, img_downscaled, Size(), 1.0 / scale, 1.0 / scale);
	// Make dnn super resolution instance
	DnnSuperResImpl sr;
	Mat img_new;
	// Read and set the dnn model
	// 读取模型
	sr.readModel(model);
	sr.setModel(algorithm, scale);
	double elapsed = 0.0;
	vector&lt;double&gt; perf;
	TickMeter tm;
	// DL MODEL
	// 计算时间
	tm.start();
	sr.upsample(img_downscaled, img_new);
	tm.stop();
	// 运行时间s
	elapsed = tm.getTimeSec() / tm.getCounter();
	perf.push_back(elapsed);
	cout &lt;&lt; sr.getAlgorithm() &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;
	// BICUBIC
	Mat bicubic;
	tm.start();
	resize(img_downscaled, bicubic, Size(), scale, scale, INTER_CUBIC);
	tm.stop();
	elapsed = tm.getTimeSec() / tm.getCounter();
	perf.push_back(elapsed);
	cout &lt;&lt; &quot;Bicubic&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;
	// NEAREST NEIGHBOR
	Mat nearest;
	tm.start();
	resize(img_downscaled, nearest, Size(), scale, scale, INTER_NEAREST);
	tm.stop();
	elapsed = tm.getTimeSec() / tm.getCounter();
	perf.push_back(elapsed);
	cout &lt;&lt; &quot;Nearest&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;
	// LANCZOS
	Mat lanczos;
	tm.start();
	resize(img_downscaled, lanczos, Size(), scale, scale, INTER_LANCZOS4);
	tm.stop();
	elapsed = tm.getTimeSec() / tm.getCounter();
	perf.push_back(elapsed);
	cout &lt;&lt; &quot;Lanczos&quot; &lt;&lt; &quot; : &quot; &lt;&lt; elapsed &lt;&lt; endl;
	vector &lt;Mat&gt; imgs{ img_new, bicubic, nearest, lanczos };
	vector &lt;String&gt; titles{ sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot; };
	showBenchmark(imgs, &quot;Time benchmark&quot;, Size(bicubic.cols, bicubic.rows), titles, perf);
	waitKey(0);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python/dnn_superres_benchmark_time.py</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Fri Aug 20 22:38:22 2020
@author: luohenyueji
不同图像超分算法速度评估
&quot;&quot;&quot;
import cv2
from cv2 import dnn_superres
import numpy as np
# TODO 绘图
def showBenchmark(imgs, titles, perf):
    # 绘图
    for i in range(0, len(imgs)):
        # 标题绘图
        cv2.putText(imgs[i], titles[i], (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (255, 0, 255), 2, cv2.LINE_AA)
        # psnr值
        cv2.putText(imgs[i], str(round(perf[i], 3)), (10, 60), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (255, 0, 255), 2, cv2.LINE_AA)
    # 图片拼接展示
    img = np.vstack([np.hstack([imgs[0], imgs[1]]), np.hstack([imgs[2], imgs[3]])])
    cv2.imshow(&quot;Quality benchmark&quot;, img)
    cv2.waitKey(0)
def main():
    # 图片路径
    img_path = &quot;./image/image.png&quot;
    # 算法名称 edsr, espcn, fsrcnn or lapsrn
    algorithm = &quot;lapsrn&quot;
    # 模型路径，根据算法确定
    model = &quot;./model/LapSRN_x2.pb&quot;
    # 放大系数
    scale = 2
    # 时间系数
    perf = []
    
    img = cv2.imread(img_path)
    
    if img is None:
        print(&quot;Couldn&#39;t load image: &quot; + str(img_path))
    
    # Crop the image so the images will be aligned
    # 裁剪图像，使图像对齐
    width = img.shape[0] - (img.shape[0] % scale)
    height = img.shape[1] - (img.shape[1] % scale)
    cropped = img[0:width, 0:height]
    
    # Downscale the image for benchmarking
    # 缩小图像，以实现基准质量测试
    img_downscaled = cv2.resize(cropped, None, fx=1.0 / scale, fy=1.0 / scale)
    
    # Make dnn super resolution instance
    # 超分模型初始化
    sr = dnn_superres.DnnSuperResImpl_create()
    
    # Read and set the dnn model
    # 读取和设定模型
    sr.readModel(model)
    sr.setModel(algorithm, scale)
    
    timer = cv2.TickMeter()
    timer.start()
    # 放大图像
    img_new = sr.upsample(img_downscaled)
    timer.stop()
    # 运行时间s
    elapsed = timer.getTimeSec() / timer.getCounter()
    perf.append(elapsed)
    print(sr.getAlgorithm() + &quot; : &quot; + str(elapsed))
    
    # INTER_CUBIC - 三次样条插值放大图像
    timer.start()
    bicubic = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    timer.stop()
    # 运行时间s
    elapsed = timer.getTimeSec() / timer.getCounter()
    perf.append(elapsed)
    print(&quot;Bicubic&quot; + &quot; : &quot; + str(elapsed))
    
    # INTER_NEAREST - 最近邻插值
    timer.start()
    nearest = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_NEAREST)
    timer.stop()
    # 运行时间s
    elapsed = timer.getTimeSec() / timer.getCounter()
    perf.append(elapsed)
    print(&quot;Nearest&quot; + &quot; : &quot; + str(elapsed))
    
    # Lanczos插值放大图像
    timer.start()
    lanczos = cv2.resize(img_downscaled, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4);
    timer.stop()
    # 运行时间s
    elapsed = timer.getTimeSec() / timer.getCounter()
    perf.append(elapsed)
    print(&quot;Lanczos&quot; + &quot; : &quot; + str(elapsed))
    
    imgs = [img_new, bicubic, nearest, lanczos]
    titles = [sr.getAlgorithm(), &quot;Bicubic&quot;, &quot;Nearest neighbor&quot;, &quot;Lanczos&quot;]
    showBenchmark(imgs, titles, perf)
if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过lapsrn模型进行超分放大，结果如图所示。图中单位为秒/s。lapsrn是OpenCV提供速度最快和精度最低的DNN超分模块，比resize普通算法效果更好都是耗时更多。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/out_3time.jpg" alt="" loading="lazy"></p><h3 id="_3-3-官方超分放大基准测试" tabindex="-1"><a class="header-anchor" href="#_3-3-官方超分放大基准测试" aria-hidden="true">#</a> 3.3 官方超分放大基准测试</h3><p>OpenCV官方文档给了数据集下的基础测试结果，具体见：<a href="https:_docs.opencv.org_master_dc_d69_tutorial_dnn_superres_benchmark">Super-resolution benchmarking</a> 在Ubuntu 18.04.02 OS的Intel i7-9700K CPU上数据集超分放大算法结果如下所示。 <strong>2倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.008795</strong></td><td>32.7059</td><td>0.9276</td></tr><tr><td>EDSR</td><td>5.923450</td><td><strong>34.1300</strong></td><td><strong>0.9447</strong></td></tr><tr><td>FSRCNN</td><td>0.021741</td><td>32.8886</td><td>0.9301</td></tr><tr><td>LapSRN</td><td>0.114812</td><td>32.2681</td><td>0.9248</td></tr><tr><td>Bicubic</td><td>0.000208</td><td>32.1638</td><td>0.9305</td></tr><tr><td>Nearest neighbor</td><td>0.000114</td><td>29.1665</td><td>0.9049</td></tr><tr><td>Lanczos</td><td>0.001094</td><td>32.4687</td><td>0.9327</td></tr></tbody></table><p><strong>3倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.005495</strong></td><td>28.4229</td><td>0.8474</td></tr><tr><td>EDSR</td><td>2.455510</td><td><strong>29.9828</strong></td><td><strong>0.8801</strong></td></tr><tr><td>FSRCNN</td><td>0.008807</td><td>28.3068</td><td>0.8429</td></tr><tr><td>LapSRN</td><td>0.282575</td><td>26.7330</td><td>0.8862</td></tr><tr><td>Bicubic</td><td>0.000311</td><td>26.0635</td><td>0.8754</td></tr><tr><td>Nearest neighbor</td><td>0.000148</td><td>23.5628</td><td>0.8174</td></tr><tr><td>Lanczos</td><td>0.001012</td><td>25.9115</td><td>0.8706</td></tr></tbody></table><p><strong>4倍超分放大</strong></p><table><thead><tr><th>方法</th><th>平均时间(s)/cpu</th><th>平均PSNR</th><th>平均SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td><strong>0.004311</strong></td><td>26.6870</td><td>0.7891</td></tr><tr><td>EDSR</td><td>1.607570</td><td><strong>28.1552</strong></td><td><strong>0.8317</strong></td></tr><tr><td>FSRCNN</td><td>0.005302</td><td>26.6088</td><td>0.7863</td></tr><tr><td>LapSRN</td><td>0.121229</td><td>26.7383</td><td>0.7896</td></tr><tr><td>Bicubic</td><td>0.000311</td><td>26.0635</td><td>0.8754</td></tr><tr><td>Nearest neighbor</td><td>0.000148</td><td>23.5628</td><td>0.8174</td></tr><tr><td>Lanczos</td><td>0.001012</td><td>25.9115</td><td>0.8706</td></tr></tbody></table><p>此外，官方也给出了不同图片在不同算法和不同比例下超分放大的结果，如下所示： <strong>4倍放大一张768x512大小的图像</strong></p><table><thead><tr><th>方法</th><th style="text-align:center;">时间(s)/cpu</th><th style="text-align:right;">SNR</th><th style="text-align:right;">SSIM</th></tr></thead><tbody><tr><td>ESPCN</td><td style="text-align:center;">0.01159</td><td style="text-align:right;">26.5471</td><td style="text-align:right;">0.88116</td></tr><tr><td>EDSR</td><td style="text-align:center;">3.26758</td><td style="text-align:right;"><strong>29.2404</strong></td><td style="text-align:right;"><strong>0.92112</strong></td></tr><tr><td>FSRCNN</td><td style="text-align:center;">0.01298</td><td style="text-align:right;">26.5646</td><td style="text-align:right;">0.88064</td></tr><tr><td>LapSRN</td><td style="text-align:center;">0.28257</td><td style="text-align:right;">26.7330</td><td style="text-align:right;">0.88622</td></tr><tr><td>Bicubic</td><td style="text-align:center;">0.00031</td><td style="text-align:right;">26.0635</td><td style="text-align:right;">0.87537</td></tr><tr><td>Nearest neighbor</td><td style="text-align:center;"><strong>0.00014</strong></td><td style="text-align:right;">23.5628</td><td style="text-align:right;">0.81741</td></tr><tr><td>Lanczos</td><td style="text-align:center;">0.00101</td><td style="text-align:right;">25.9115</td><td style="text-align:right;">0.87057</td></tr></tbody></table><p><strong>2倍放大一张256x256大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Set5: butterfly.png</th><th style="text-align:center;">size: 256x256</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_butterfly.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_butterfly.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_butterfly.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_butterfly.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">26.6645 / 0.9048 / 0.000201</td><td style="text-align:center;">23.6854 / 0.8698 / <strong>0.000075</strong></td><td style="text-align:center;"><strong>26.9476</strong> / <strong>0.9075</strong> / 0.001039</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_butterfly.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_butterfly.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_butterfly.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_butterfly.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">29.0341 / 0.9354 / <strong>0.004157</strong></td><td style="text-align:center;">29.0077 / 0.9345 / 0.006325</td><td style="text-align:center;">27.8212 / 0.9230 / 0.037937</td><td style="text-align:center;"><strong>30.0347</strong> / <strong>0.9453</strong> / 2.077280</td></tr></tbody></table><p><strong>3倍放大一张1024x644大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Urban100: img_001.png</th><th style="text-align:center;">size: 1024x644</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_urban.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_urban.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_urban.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_urban.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">27.0474 / <strong>0.8484</strong> / 0.000391</td><td style="text-align:center;">26.0842 / 0.8353 / <strong>0.000236</strong></td><td style="text-align:center;"><strong>27.0704</strong> / 0.8483 / 0.002234</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_urban.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_urban.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;">LapSRN无三倍放大</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_urban.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">28.0118 / 0.8588 / <strong>0.030748</strong></td><td style="text-align:center;">28.0184 / 0.8597 / 0.094173</td><td style="text-align:center;"></td><td style="text-align:center;"><strong>30.5671</strong> / <strong>0.9019</strong> / 9.517580</td></tr></tbody></table><p><strong>4倍放大一张250x361大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Set14: comic.png</th><th style="text-align:center;">size: 250x361</th><th style="text-align:center;"></th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_comic.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_comic.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_comic.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_comic.jpg" alt="Lanczos interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td><td style="text-align:center;">Lanczos interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;"><strong>19.6766</strong> / <strong>0.6413</strong> / 0.000262</td><td style="text-align:center;">18.5106 / 0.5879 / <strong>0.000085</strong></td><td style="text-align:center;">19.4948 / 0.6317 / 0.001098</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/espcn_comic.jpg" alt="ESPCN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/fsrcnn_comic.jpg" alt="FSRCNN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_comic.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/edsr_comic.jpg" alt="EDSR" loading="lazy"></td></tr><tr><td style="text-align:center;">ESPCN</td><td style="text-align:center;">FSRCNN</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;">EDSR</td></tr><tr><td style="text-align:center;">20.0417 / 0.6302 / <strong>0.001894</strong></td><td style="text-align:center;">20.0885 / 0.6384 / 0.002103</td><td style="text-align:center;">20.0676 / 0.6339 / 0.061640</td><td style="text-align:center;"><strong>20.5233</strong> / <strong>0.6901</strong> / 0.665876</td></tr></tbody></table><p><strong>4倍放大一张1356x2040大小的图像</strong></p><table><thead><tr><th style="text-align:center;">Div2K: 0006.png</th><th style="text-align:center;">size: 1356x2040</th><th style="text-align:center;"></th></tr></thead><tbody><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/orig_div2k.jpg" alt="Original" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/bicubic_div2k.jpg" alt="Bicubic interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/nearest_div2k.jpg" alt="Nearest neighbor interpolation" loading="lazy"></td></tr><tr><td style="text-align:center;">Original</td><td style="text-align:center;">Bicubic interpolation</td><td style="text-align:center;">Nearest neighbor interpolation</td></tr><tr><td style="text-align:center;">PSRN / SSIM / Speed (CPU)</td><td style="text-align:center;">26.3139 / <strong>0.8033</strong> / 0.001107</td><td style="text-align:center;">23.8291 / 0.7340 / <strong>0.000611</strong></td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lanczos_div2k.jpg" alt="Lanczos interpolation" loading="lazy"></td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]44 使用OpenCV进行图像超分放大/images/lapsrn_div2k.jpg" alt="LapSRN" loading="lazy"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">Lanczos interpolation</td><td style="text-align:center;">LapSRN</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">26.1565 / 0.7962 / 0.004782</td><td style="text-align:center;"><strong>26.7046</strong> / 0.7987 / 2.274290</td><td style="text-align:center;"></td></tr></tbody></table><h3 id="_3-4-超分算法选择总结" tabindex="-1"><a class="header-anchor" href="#_3-4-超分算法选择总结" aria-hidden="true">#</a> 3.4 超分算法选择总结</h3><p>OpenCV中的dnn_superres模块提供的四种图像超分放大深度学习模型，在实践中用的最多的就是EDSR模型。其他三类模型和OpenCV自带的resize函数视觉上差别并不大。但是EDSR模型推理速度太慢，2倍放大和4倍放大可以使用ESPCN代替，4倍和8倍放大可以使用LapSRN。但是总体来说还是使用EDSR为好，毕竟超分放大需要高性能运算，还是用高性能显卡运算较为合适。 此外OpenCV的dnn_superres模块不适用于移动端设备或嵌入式设备，因为OpenCV对设备性能有一定要求。所以移动端可以看看ncnn的超分放大实现。具体见：</p>`,64),te={href:"https://zhuanlan.zhihu.com/p/109687817",target:"_blank",rel:"noopener noreferrer"},ie=e("p",null,"ncnn用的是srmd超分放大模型，srmd官方代码和ncnn官方实现代码见",-1),le={href:"https://github.com/cszn/SRMD",target:"_blank",rel:"noopener noreferrer"},se={href:"https://github.com/nihui/srmd-ncnn-vulkan",target:"_blank",rel:"noopener noreferrer"},de=e("p",null,[e("strong",null,"事实上srmd超分放大性能效果高于OpenCV提供的EDSR模型，但SRMD需要显卡进行运算，ncnn在移动端使用vulkan实现加速运算，在PC端如果有显卡也通过ncnn调用SRMD模型。")],-1),re=e("h2",{id:"_4-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-参考","aria-hidden":"true"},"#"),n(" 4 参考")],-1),ae=e("h3",{id:"_4-1-相关论文",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-1-相关论文","aria-hidden":"true"},"#"),n(" 4.1 相关论文")],-1),ue={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},ce={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},ve=e("a",{href:"http:_mmlab.ie.cuhk.edu.hk_projects_fsrcnn"},"Accelerating the Super-Resolution Convolutional Neural Network",-1),oe={href:"https://arxiv.org/pdf/1707.02921.pdf",target:"_blank",rel:"noopener noreferrer"},me=e("h3",{id:"_4-2-参考代码",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-2-参考代码","aria-hidden":"true"},"#"),n(" 4.2 参考代码")],-1),be={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/dnn_superres",target:"_blank",rel:"noopener noreferrer"},pe={href:"https://github.com/Saafke/EDSR_Tensorflow/tree/master/models",target:"_blank",rel:"noopener noreferrer"},ge={href:"https://github.com/fannymonori/TF-ESPCN/tree/master/export",target:"_blank",rel:"noopener noreferrer"},he={href:"https://github.com/Saafke/FSRCNN_Tensorflow",target:"_blank",rel:"noopener noreferrer"},_e={href:"https://github.com/fannymonori/TF-LAPSRN",target:"_blank",rel:"noopener noreferrer"},qe={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},ye={href:"https://github.com/cszn/SRMD",target:"_blank",rel:"noopener noreferrer"},xe={href:"https://github.com/nihui/srmd-ncnn-vulkan",target:"_blank",rel:"noopener noreferrer"},Se=e("h3",{id:"_4-3-参考文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-3-参考文档","aria-hidden":"true"},"#"),n(" 4.3 参考文档")],-1),fe=l('<a href="https:_github.com_fengzhenhit_opencv-contrib-module-chinese-tutorials_blob_master_chapter%209_%e8%b6%85%e5%88%86%e8%be%a8%e7%8e%87%e5%9f%ba%e5%87%86%e6%b5%8b%e8%af%95">超分辨率基准测试</a><a href="https:_docs.opencv.org_master_dc_d69_tutorial_dnn_superres_benchmark">Super-resolution benchmarking</a><a href="https:_www.cnblogs.com_carsonzhu_p_10860594">【超分辨率】—图像超分辨率(Super-Resolution)技术研究</a><a href="https:_www.cnblogs.com_carsonzhu_p_11122244">【超分辨率】—基于深度学习的图像超分辨率最新进展与趋势</a><a href="https:_www.cnblogs.com_vincent2012_archive_2012_10_13_2723152">PSNR和SSIM</a>',5),Ce={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},we={href:"https://zhuanlan.zhihu.com/p/109687817",target:"_blank",rel:"noopener noreferrer"};function Ne(Re,Oe){const t=d("ExternalLinkIcon");return r(),a("div",null,[c,v,o,m,b,p,e("blockquote",null,[e("p",null,[e("a",g,[n("Super Resolution using Convolutional Neural Networks"),i(t)])])]),h,e("blockquote",null,[e("p",null,[e("a",_,[n("OpenCV_contrib库在windows下编译使用指南"),i(t)])])]),q,e("blockquote",null,[e("p",null,[e("a",y,[n("OpenCV-Practical-Exercise"),i(t)])])]),x,S,e("ul",null,[e("li",null,[n("模型和官方代码地址："),e("a",f,[n("EDSR_Tensorflow"),i(t)])]),e("li",null,[n("论文："),e("a",C,[n("Enhanced Deep Residual Networks for Single Image Super-Resolution"),i(t)])]),w,N,R,O,V]),E,e("ul",null,[e("li",null,[n("模型和官方代码地址："),e("a",z,[n("TF-ESPCN"),i(t)])]),e("li",null,[n("论文："),e("a",I,[n("Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network"),i(t)])]),k,M,P,T,j]),L,e("ul",null,[e("li",null,[n("模型和官方代码地址："),e("a",A,[n("FSRCNN_Tensorflow"),i(t)])]),D,B,F,W,H,U,K]),Q,e("ul",null,[e("li",null,[n("模型和官方代码地址："),e("a",Z,[n("TF-LAPSRN"),i(t)])]),e("li",null,[n("论文："),e("a",Y,[n("Deep laplacian pyramid networks for fast and accurate super-resolution"),i(t)])]),G,J,X,$,ee]),ne,e("blockquote",null,[e("p",null,[e("a",te,[n("srmd ncnn vulkan 通用图片超分放大工具"),i(t)])])]),ie,e("blockquote",null,[e("p",null,[e("a",le,[n("SRMD"),i(t)]),e("a",se,[n("srmd-ncnn-vulkan"),i(t)])])]),de,re,ae,e("blockquote",null,[e("p",null,[e("a",ue,[n("Enhanced Deep Residual Networks for Single Image Super-Resolution"),i(t)]),e("a",ce,[n("Real-Time Single Image and Video Super-Resolution Using an Efficient Sub-Pixel Convolutional Neural Network"),i(t)]),ve,e("a",oe,[n("Deep laplacian pyramid networks for fast and accurate super-resolution"),i(t)])])]),me,e("blockquote",null,[e("p",null,[e("a",be,[n("Super Resolution using Convolutional Neural Networks"),i(t)]),e("a",pe,[n("EDSR_Tensorflow"),i(t)]),e("a",ge,[n("TF-ESPCN"),i(t)]),e("a",he,[n("FSRCNN_Tensorflow"),i(t)]),e("a",_e,[n("TF-LAPSRN"),i(t)]),e("a",qe,[n("OpenCV-Practical-Exercise"),i(t)]),e("a",ye,[n("SRMD"),i(t)]),e("a",xe,[n("srmd-ncnn-vulkan"),i(t)])])]),Se,e("blockquote",null,[e("p",null,[fe,e("a",Ce,[n("OpenCV_contrib库在windows下编译使用指南"),i(t)]),e("a",we,[n("srmd ncnn vulkan 通用图片超分放大工具"),i(t)])])])])}const ze=s(u,[["render",Ne],["__file","2020-08-24-_OpenCV实战_44 使用OpenCV进行图像超分放大.html.vue"]]);export{ze as default};
