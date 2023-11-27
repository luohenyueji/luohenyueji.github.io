import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as e,b as t,d as s,e as a}from"./app-MsA2k2kn.js";const p={},l=e("h1",{id:"opencv实战-35-使用tesseract和opencv实现文本识别",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-35-使用tesseract和opencv实现文本识别","aria-hidden":"true"},"#"),t(" [OpenCV实战]35 使用Tesseract和OpenCV实现文本识别")],-1),d=e("p",null,"在今天的文章中，我们将学习如何使用名为Tesseract和OpenCV的开源工具识别图像中的文本。从图像中提取文本的方法也称为光学字符识别（OCR）或有时简称为文本识别。Tesseract是由Hewlett Packard Labs开发的专有软件。2005年，惠普与内华达拉斯维加斯大学合作开源。自2006年以来，它一直由谷歌和许多开源贡献者积极开发。",-1),h=e("p",null,"当Tesseract开始支持许多图像格式并逐渐添加大量脚本（语言）时，Tesseract在3.x版本中逐渐完善。Tesseract 3.x基于传统的计算机视觉算法。在过去几年中，基于深度学习的方法在计算机视觉的许多领域中在准确性方面已经超越了传统的机器学习技术。手写识别是一个突出的例子。因此，Tesseract也有一个基于深度学习的识别引擎只是时间问题。在Tesseract4版本中，Tesseract实现了基于长短期记忆（LSTM）的识别引擎。LSTM是一种递归神经网络（RNN）。",-1),u=e("p",null,"注意要识别包含单个字符的图像，我们通常使用卷积神经网络（CNN）。任意长度的文本是字符序列，并且使用RNN解决这些问题，并且LSTM是RNN的流行形式。阅读以下文章以了解有关LSTM的更多信息。",-1),_={href:"http://colah.github.io/posts/2015-08-Understanding-LSTMs/",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"Tesseract的第4版也有Tesseract 3的传统OCR引擎，但是LSTM引擎是默认的，我们在这篇文章中专门使用它。Tesseract库附带了一个名为tesseract的便捷命令行工具。我们可以使用此工具对图像执行OCR，输出存储在文本文件中。如果我们想在我们的C ++或Python代码中集成Tesseract，我们将使用Tesseract的API。用法在第2节中介绍，但我们首先从安装说明开始。",-1),m=e("h2",{id:"_1-如何在ubuntu和windows上安装tesseract",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-如何在ubuntu和windows上安装tesseract","aria-hidden":"true"},"#"),t(" 1 如何在Ubuntu和windows上安装Tesseract")],-1),b=e("p",null,"详细安装操作见：",-1),T={href:"https://github.com/tesseract-ocr/tesseract/wiki",target:"_blank",rel:"noopener noreferrer"},f=a(`<p>我们将安装：</p><p>Tesseract库（libtesseract）</p><p>命令行Tesseract工具（tesseract-ocr）</p><p>用于tesseract的Python包装器（pytesseract）</p><p>在本教程的后面部分，我们将讨论如何为英语以外的语言安装语言和脚本文件。</p><h3 id="_1-1-在ubuntu18-04上安装tesseract4" tabindex="-1"><a class="header-anchor" href="#_1-1-在ubuntu18-04上安装tesseract4" aria-hidden="true">#</a> 1.1 在ubuntu18.04上安装Tesseract4</h3><p>Tesseract 4包含在Ubuntu 18.04中，因此我们将使用Ubuntu软件包管理器直接安装它。具体命令见：</p><pre><code>sudo apt install tesseract-ocr

sudo apt install libtesseract-dev

sudo pip install pytesseract
</code></pre><h3 id="_1-2-在ubuntu-14-04-16-04-17-04-17-10上安装tesseract-4-0" tabindex="-1"><a class="header-anchor" href="#_1-2-在ubuntu-14-04-16-04-17-04-17-10上安装tesseract-4-0" aria-hidden="true">#</a> 1.2 在Ubuntu 14.04,16.04,17.04,17.10上安装Tesseract 4.0</h3><p>由于某些依赖性，只有Tesseract 3可从官方发布渠道获得，适用于早于18.04的Ubuntu版本。幸运的是Ubuntu PPA - alex-p / tesseract-ocr为Ubuntu版本14.04,16.04,17.04,17.10维护Tesseract 4。我们将这个PPA添加到我们的Ubuntu机器并安装Tesseract。如果您拥有除此之外的Ubuntu版本，则必须从源代码编译Tesseract。具体命令见：</p><pre><code>sudo add-apt-repository ppa:alex-p/tesseract-ocr

sudo apt-get update

sudo apt install tesseract-ocr

sudo apt install libtesseract-dev

sudo pip install pytesseract
</code></pre><h3 id="_1-3-在windows下安装tesseract-4-0" tabindex="-1"><a class="header-anchor" href="#_1-3-在windows下安装tesseract-4-0" aria-hidden="true">#</a> 1.3 在windows下安装Tesseract 4.0</h3><p>Tesseract本身没有windows的安装包，不过它指定了一个第三方的封装的windows安装包，在其wiki上有说明，大家可直接到这个地址进行下载：</p>`,13),O={href:"https://digi.bib.uni-mannheim.de/tesseract/",target:"_blank",rel:"noopener noreferrer"},w=e("figure",null,[e("img",{src:"https://img2018.cnblogs.com/blog/753333/201810/753333-20181030134114956-498729297.png",alt:"https://img2018.cnblogs.com/blog/753333/201810/753333-20181030134114956-498729297.png",tabindex:"0",loading:"lazy"}),e("figcaption",null,"https://img2018.cnblogs.com/blog/753333/201810/753333-20181030134114956-498729297.png")],-1),x=e("p",null,"其中文件名中带有 dev 的为开发版本，不带 dev 的为稳定版本。",-1),C=e("p",null,"下载后就是一个exe安装包，直接右击安装即可，安装完成之后，配置一下环境变量，编辑 系统变量里面 path，添加下面的安装路径：",-1),S=e("p",null,"C:\\Program Files (x86)\\Tesseract-OCR",-1),M=e("p",null,"具体使用安装见：",-1),P={href:"https://www.cnblogs.com/gl1573/p/9876397.html",target:"_blank",rel:"noopener noreferrer"},L={href:"https://blog.csdn.net/qq_35531549/article/details/95191677",target:"_blank",rel:"noopener noreferrer"},y=a(`<h3 id="_1-4-检查tesseract版本" tabindex="-1"><a class="header-anchor" href="#_1-4-检查tesseract版本" aria-hidden="true">#</a> 1.4 检查Tesseract版本</h3><p>要检查前面的步骤中是否一切正常，请在命令行上尝试以下操作</p><pre><code>tesseract –version
</code></pre><p>你会看到输出类似于</p><pre><code>tesseract 4.0.0-beta.1-306-g45b11

leptonica-1.76.0

libjpeg 9c : libpng 1.6.34 : libtiff 4.0.9 : zlib 1.2.8

Found AVX2

Found AVX

Found SSE
</code></pre><h2 id="_2-tesseract基本用法" tabindex="-1"><a class="header-anchor" href="#_2-tesseract基本用法" aria-hidden="true">#</a> 2 Tesseract基本用法</h2><p>如前所述，我们可以使用命令行实用程序或使用Tesseract API将其集成到我们的C ++和Python应用程序中。在最基本的用法中，我们指定以下内容</p><p>(1) 输入文件名：我们在下面的例子中使用image.jpg。</p><p>(2) OCR语言：我们基本示例中的语言设置为英语（eng）。在命令行和pytesseract上，使用-l选项指定它。</p><p>(3) OCR引擎模式（oem）：Tesseract 4有两个OCR引擎 - 1）Legacy Tesseract引擎2）LSTM引擎。使用该-- oem选项可以选择四种操作模式。0仅限传统引擎、1神经网络仅限LSTM引擎、2 Legacy + LSTM引擎、3默认，基于可用的内容。</p><p>(4) 页面分段模式（psm）：当您有关于文本结构的其他信息时，PSM非常有用。我们将在后续教程中介绍其中一些模式。在本教程中，我们将坚持使用psm = 3（即PSM_AUTO）。注意如果未指定PSM，则在命令行和python版本中默认为3，但在C ++ API中默认为6。如果使用命令行版本和C ++ API未获得相同的结果，请显式设置PSM。</p><p>如果你想查看具体参数，命令行输入</p><pre><code>tesseract --help-psm

或者tesseract –help-oem
</code></pre><p>PSM命令详解：</p><pre><code>0 = Orientation and script detection (OSD) only.

1 = Automatic page segmentation with OSD.

2 = Automatic page segmentation, but no OSD, or OCR

3 = Fully automatic page segmentation, but no OSD. (Default)

4 = Assume a single column of text of variable sizes.

5 = Assume a single uniform block of vertically aligned text.

6 = Assume a single uniform block of text.

7 = Treat the image as a single text line.

8 = Treat the image as a single word.

9 = Treat the image as a single word in a circle.

10 = Treat the image as a single character.
</code></pre><h3 id="_2-1-命令行用法" tabindex="-1"><a class="header-anchor" href="#_2-1-命令行用法" aria-hidden="true">#</a> 2.1 命令行用法</h3><p>以下示例显示了如何使用tesseract命令行工具执行OCR。选择语言为英语，OCR引擎模式设置为1（即仅限LSTM）。</p><pre><code># Output to terminal 输出到终端

tesseract image.jpg stdout -l eng --oem 1 --psm 3

# Output to output.txt 输出到到txt文档

tesseract image.jpg output -l eng --oem 1 --psm 3
</code></pre><h3 id="_2-2-使用pytesseract" tabindex="-1"><a class="header-anchor" href="#_2-2-使用pytesseract" aria-hidden="true">#</a> 2.2 使用pytesseract</h3><p>在Python中，我们使用pytesseract模块。它只是命令行工具的包装器，其中使用config参数指定了命令行选项。基本使用要求我们先阅读使用OpenCV的图像，并通过图像image_to_string的pytesseract类的方法与语言（ENG）一起。Pytesseract通过pip install Pytesseract就可以安装。详细使用代码见：</p><pre><code>import cv2
import pytesseract


# 图像路径
imPath = &#39;image/computer-vision.jpg&#39;


# 命令
config = (&#39;-l eng --oem 1 --psm 3&#39;)

# Read image from disk 获得彩色图像
im = cv2.imread(imPath, cv2.IMREAD_COLOR)

# Run tesseract OCR on image
text = pytesseract.image_to_string(im, config=config)

# Print recognized text
print(text)
</code></pre><h3 id="_2-3-使用c-api" tabindex="-1"><a class="header-anchor" href="#_2-3-使用c-api" aria-hidden="true">#</a> 2.3 使用C ++ API</h3><p>在C ++版本中，我们首先需要包括tesseract / baseapi.h和leptonica/allheaders.h。然后，我们创建一个指向TessBaseAPI类实例的指针。我们将语言初始化为英语（eng），将OCR引擎初始化为tesseract:: OEM_LSTM_ONLY（这相当于命令行选项 --oem1）。最后，我们使用OpenCV读取图像，并使用其SetImage方法将此图像传递给OCR引擎。使用GetUTF8Text（）读出输出文本。详细使用代码下：</p><pre><code>#include &lt;string&gt;
#include &lt;tesseract/baseapi.h&gt;
#include &lt;leptonica/allheaders.h&gt;
#include &lt;opencv2/opencv.hpp&gt;

using namespace std;
using namespace cv;

int main()
{
    string outText;
    string imPath = &quot;image/receipt.png&quot;;

    // Create Tesseract object
    tesseract::TessBaseAPI *ocr = new tesseract::TessBaseAPI();
  
    /*
     Initialize OCR engine to use English (eng) and The LSTM 
     OCR engine.
     
     
     There are four OCR Engine Mode (oem) available
     
     OEM_TESSERACT_ONLY             Legacy engine only.
     OEM_LSTM_ONLY                  Neural nets LSTM engine only.
     OEM_TESSERACT_LSTM_COMBINED    Legacy + LSTM engines.
     OEM_DEFAULT                    Default, based on what is available.
    */
    // 初始化
    ocr-&gt;Init(NULL, &quot;eng&quot;, tesseract::OEM_LSTM_ONLY);
  
  
    // Set Page segmentation mode to PSM_AUTO (3)
    // Other important psm modes will be discussed in a future post.
    // 设置分割模式
    ocr-&gt;SetPageSegMode(tesseract::PSM_AUTO);
  

    // Open input image using OpenCV
    Mat im = cv::imread(imPath, IMREAD_COLOR);
  
    // Set image data
    ocr-&gt;SetImage(im.data, im.cols, im.rows, 3, im.step);
    
    // Run Tesseract OCR on image
    outText = string(ocr-&gt;GetUTF8Text());

    // print recognized text
    cout &lt;&lt; outText &lt;&lt; endl;

    // Destroy used object and release memory
    ocr-&gt;End();
  
    return 0;
}
</code></pre><p>Windows下使用tesseract需要编译后使用，编译教程见：</p>`,25),R={href:"http://www.dengb.com/cjjc/1345780.html",target:"_blank",rel:"noopener noreferrer"},v=e("h3",{id:"_2-4-语言包错误",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-4-语言包错误","aria-hidden":"true"},"#"),t(" 2.4 语言包错误")],-1),E=e("p",null,"您可能会遇到错误Error opening data file tessdata/eng.traineddata",-1),A=e("p",null,"它只是意味着语言包（tessdata / eng.traineddata）不在正确的路径中。您可以通过两种方式解决此问题。",-1),k=e("p",null,"1：确保文件位于预期路径中（例如，在linux上，路径为/usr/share/tesseract-ocr/4.00/tessdata/eng.traineddata）。",-1),N=e("p",null,"2：创建目录tessdata，下载eng.traineddata并将文件保存到tessdata/eng.traineddata。然后，您可以指示Tesseract使用查找此目录中的语言包。(这种方法不推荐问题很多)。",-1),U=e("p",null,"如果你想下载新的语言库，下载地址见：",-1),V={href:"https://github.com/tesseract-ocr/tessdata",target:"_blank",rel:"noopener noreferrer"},I=e("h2",{id:"_3-结果与评价",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-结果与评价","aria-hidden":"true"},"#"),t(" 3 结果与评价")],-1),j=e("p",null,"Tesseract是一种通用的OCR引擎，但是当我们在普通字体的纯白色背景上使用干净的黑色文本时，它最有效。当文本大致水平且文本高度至少为20像素时，它也可以很好地工作。如果文本具有周围边界，则可以将其检测为一些随机文本。具体使用类似于平常OCR软件。如果能够联网建议使用百度云OCR。",-1),D=e("p",null,"所有代码见：",-1),q={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},B=e("p",null,"具体评测见：",-1),F={href:"https://segmentfault.com/a/1190000012861561?utm_source=tag-newest",target:"_blank",rel:"noopener noreferrer"},z=e("p",null,"如果使用tesseract，在实际工程tesseract错误率很高，识别率极差。一般需要对图像进行各种图像处理后再用tesseract识别，最后根据错误类型进行二次识别。tesseract的错误还是具有一定规律的。另外tesseract识别中文效果并不好，你要制作专门的中文训练集通过jTessBoxEditor.jar去训练它，但是整个制作流程较为复杂。具体见：",-1),Y={href:"https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00",target:"_blank",rel:"noopener noreferrer"},G=e("p",null,"tesseract要想有好的识别效果，就必须有大量的训练样本。但是tesseract对英文支持还是不错的。",-1),X=e("h2",{id:"_4-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-参考","aria-hidden":"true"},"#"),t(" 4 参考")],-1),H={href:"https://www.learnopencv.com/deep-learning-based-text-recognition-ocr-using-tesseract-and-opencv/",target:"_blank",rel:"noopener noreferrer"};function W(J,K){const n=o("ExternalLinkIcon");return c(),i("div",null,[l,d,h,u,e("p",null,[e("a",_,[t(" http://colah.github.io/posts/2015-08-Understanding-LSTMs/"),s(n)])]),g,m,b,e("p",null,[e("a",T,[t(" https://github.com/tesseract-ocr/tesseract/wiki"),s(n)])]),f,e("p",null,[e("a",O,[t(" https://digi.bib.uni-mannheim.de/tesseract/ "),s(n)])]),w,x,C,S,M,e("p",null,[e("a",P,[t(" https://www.cnblogs.com/gl1573/p/9876397.html"),s(n)])]),e("p",null,[e("a",L,[t(" https://blog.csdn.net/qq_35531549/article/details/95191677"),s(n)])]),y,e("p",null,[e("a",R,[t(" http://www.dengb.com/cjjc/1345780.html"),s(n)])]),v,E,A,k,N,U,e("p",null,[e("a",V,[t(" https://github.com/tesseract-ocr/tessdata "),s(n)])]),I,j,D,e("p",null,[e("a",q,[t(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),s(n)])]),B,e("p",null,[e("a",F,[t(" https://segmentfault.com/a/1190000012861561?utm_source=tag-newest"),s(n)])]),z,e("p",null,[e("a",Y,[t(" https://github.com/tesseract-ocr/tesseract/wiki/TrainingTesseract-4.00"),s(n)])]),G,X,e("ul",null,[e("li",null,[e("a",H,[t(" https://www.learnopencv.com/deep-learning-based-text-recognition-ocr-using-tesseract-and-opencv/ "),s(n)])])])])}const $=r(p,[["render",W],["__file","2019-07-16-_OpenCV实战_35 使用Tesseract和OpenCV实现文本识别.html.vue"]]);export{$ as default};
