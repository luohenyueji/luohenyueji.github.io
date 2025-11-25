import{_ as i,c as a,a as e,d as c,f as t,b as l,o as r,r as p}from"./app-CJwJJlha.js";const u={};function h(s,n){const o=p("VPIcon");return r(),a("div",null,[n[2]||(n[2]=e(`<h1 id="opencv实战-28-基于opencv的gui库cvui" tabindex="-1"><a class="header-anchor" href="#opencv实战-28-基于opencv的gui库cvui"><span>[OpenCV实战]28 基于OpenCV的GUI库cvui</span></a></h1><p>有很多很棒的GUI库，例如Qt和imgui，可以与OpenCV一起使用，允许您在运行时调整参数。但是，在某些情况下，您可能没有（或不希望）此类库的依赖关系，例如，您没有使用Qt支持编译OpenCV，或者您无法使用OpenGL。在这种情况下，您只需要一种快速，轻松的方式来创建GUI来调整算法。</p><p>这就是cvui的目的。它是一个基于OpenCV绘图基元构建的跨平台GUI库，仅需使用头文件就可以搭建。除了OpenCV本身（您可能已经在使用）之外，它没有依赖关系。Cvui在C++下通过.h文件实现全部功能，在Python下直接提供.py文件。本文仅仅讲述cvui在C++下的构建，python通常用的少。</p><p>cvui遵循一行代码就可以在屏幕上产生一个UI组件的规则。cvui具有友好的C类API，没有类/对象和多个组件，例如，跟踪栏，按钮，文字等等。cvui界面如下所示，</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui.png" alt="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui.png" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2017/06/cvui.png</figcaption></figure><p>cvui相关使用见：</p><p><a href="https://dovyski.github.io/cvui/" target="_blank" rel="noopener noreferrer"> https://dovyski.github.io/cvui/ </a></p><p>工程文件及下载见：</p><p><a href="https://github.com/Dovyski/cvui" target="_blank" rel="noopener noreferrer"> https://github.com/Dovyski/cvui </a></p><h2 id="_1-cvui-的使用" tabindex="-1"><a class="header-anchor" href="#_1-cvui-的使用"><span><strong>1 cvui</strong> <strong>的使用</strong></span></a></h2><h3 id="_1-1-如何在您的应用程序中添加cvui" tabindex="-1"><a class="header-anchor" href="#_1-1-如何在您的应用程序中添加cvui"><span><strong>1.1</strong> <strong>如何在您的应用程序中添加cvui</strong></span></a></h3><p>为了使用cvui，你只需要把cvui.h文件放到工程目录下，包含头文件就行了。但是对于比较新的版本，本文用的是cvui2.7版本则需要在cvui.h前加入</p><blockquote><p>#define CVUI_IMPLEMENTATION</p></blockquote><p>具体如下所示：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
</code></pre><h3 id="_1-2-基本的-hello-world-应用程序" tabindex="-1"><a class="header-anchor" href="#_1-2-基本的-hello-world-应用程序"><span>1.2 基本的“hello world”应用程序</span></a></h3><p>让我们通过创建一个带有一些UI交互功能的简单hello- world应用程序来了解cvui的功能。该应用程序包含一个按钮和一个可视界面，可视界面显示该按钮被单击的次数。代码如下：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
 
#define WINDOW_NAME &quot;CVUI Hello World!&quot;
 
int main(void)
{
    cv::Mat frame = cv::Mat(200, 500, CV_8UC3);
    int count = 0;
 
    // Init a OpenCV window and tell cvui to use it.
    cv::namedWindow(WINDOW_NAME);
    cvui::init(WINDOW_NAME);
 
    while (true) {
        // Fill the frame with a nice color
        frame = cv::Scalar(49, 52, 49);
 
        // Show a button at position (110, 80)
        if (cvui::button(frame, 110, 80, &quot;Hello, world!&quot;)) {
            // The button was clicked, so let&#39;s increment our counter.
            count++;
        }
 
        // Show how many times the button has been clicked.
        // Text at position (250, 90), sized 0.4, in red.
        cvui::printf(frame, 250, 90, 0.4, 0xff0000, &quot;Button click count: %d&quot;, count);
 
        // Update cvui internal stuff
        cvui::update();
 
        // Show everything on the screen
        cv::imshow(WINDOW_NAME, frame);
 
        // Check if ESC key was pressed
        if (cv::waitKey(20) == 27) {
            break;
        }
    }
    return 0;
}
</code></pre><p>上面代码的结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]28 基于OpenCV的GUI库cvui/20190508174312652.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>确保cvui与您的项目正常工作：</p><p>cvui::init()在创建任何组件之前调用初始化函数。</p><p>cvui::update() 在创建所有组件后调用一次。</p>`,23)),c("p",null,[n[0]||(n[0]=t("关于上面代码中使用的组件， 每次单击按钮时cvui")),l(o,{icon:`button()
函数都会返回true，因此您可以方便地在if语句中使用它。该cvui`}),n[1]||(n[1]=t("printf()功能与标准C功能的工作方式类似printf()，%d and %s.分别表示文字和数字。您还可以使用十六进制值选择文本的颜色0xRRGGBB，例如0xFF0000（红色），0x00FF00（绿色）和0x0000FF（蓝色）。具体看代码就知道了。"))]),n[3]||(n[3]=e(`<h2 id="_2-更高级的应用" tabindex="-1"><a class="header-anchor" href="#_2-更高级的应用"><span><strong>2</strong> <strong>更高级的应用</strong></span></a></h2><p>现在让我们构建一些更复杂的东西，但就像以前一样容易。该应用程序将Canny Edge算法应用于图像，允许用户启用/禁用该技术并调整其阈值。Canny边缘算法详细见：</p><p><a href="https://en.wikipedia.org/wiki/Canny_edge_detector" target="_blank" rel="noopener noreferrer"> https://en.wikipedia.org/wiki/Canny_edge_detector </a></p><p>(1) 基础</p><p>我们首先创建一个没有UI元素的应用程序。Canny Edge算法的使用由布尔变量（use_canny）定义，而算法阈值由两个整数（low_threshold和high_threshold）定义。使用这种方法，我们必须在每次要启用/禁用canny或调整low_threshold和high_threshold时重新编译代码。</p><p>该部分代码如下：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
 
#define WINDOW_NAME &quot;CVUI Canny Edge&quot;
 
int main(int argc, const char *argv[])
{
    cv::Mat lena = cv::imread(&quot;lena.jpg&quot;);
    cv::Mat frame = lena.clone();
    int low_threshold = 50, high_threshold = 150;
    bool use_canny = false;
 
    cv::namedWindow(WINDOW_NAME);
 
    while (true) {
        // Should we apply Canny edge?
        if (use_canny) {
            // Yes, we should apply it.
            cv::cvtColor(lena, frame, CV_BGR2GRAY);
            cv::Canny(frame, frame, low_threshold, high_threshold, 3);
        } else {
            // No, so just copy the original image to the displaying frame.
            lena.copyTo(frame);
        }
 
        // Show everything on the screen
        cv::imshow(WINDOW_NAME, frame);
 
        // Check if ESC was pressed
        if (cv::waitKey(30) == 27) {
            break;
        }
    }
    return 0;
}
</code></pre><p>结果在应用程序显示原始图像（use_canny设置为false）或显示检测到的边缘图像（use_canny设置true）。结果如下：</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-manual-small.png" alt="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-manual-small.png" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-manual-small.png</figcaption></figure><p>(2)动态启用/禁用边缘检测</p><p>让我们通过使用cvui并添加一个复选框来控制值use_canny。使用该方法，用户可以在应用程序仍在运行时启用/禁用Canny Edge。我们添加所需的cvui代码并使用该cvui::checkbox函数：</p><p>仅仅这个小修改就可以节省测试应用程序的时间，而无需重新编译所有内容。代码如下：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
 
#define WINDOW_NAME &quot;CVUI Canny Edge&quot;
 
int main(void)
{
    cv::Mat lena = cv::imread(&quot;lena.jpg&quot;);
    cv::Mat frame = lena.clone();
    int low_threshold = 50, high_threshold = 150;
    bool use_canny = false;
 
    // Init a OpenCV window and tell cvui to use it.
    cv::namedWindow(WINDOW_NAME);
    cvui::init(WINDOW_NAME);
 
    while (true) {
        // Should we apply Canny edge?
        if (use_canny) {
            // Yes, we should apply it.
            cv::cvtColor(lena, frame, CV_BGR2GRAY);
            cv::Canny(frame, frame, low_threshold, high_threshold, 3);
        } else {
            // No, so just copy the original image to the displaying frame.
            lena.copyTo(frame);
        }
         
        // Checkbox to enable/disable the use of Canny edge
        cvui::checkbox(frame, 15, 80, &quot;Use Canny Edge&quot;, &amp;use_canny);
 
        // Update cvui internal stuff
        cvui::update();
 
        // Show everything on the screen
        cv::imshow(WINDOW_NAME, frame);
 
        // Check if ESC was pressed
        if (cv::waitKey(30) == 27) {
            break;
        }
    }
    return 0;
}
</code></pre><p>结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]28 基于OpenCV的GUI库cvui/20190508174530181.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>复选框及其标签显示效果取决于所使用的图像，某些背景下复选框可能无法显示。我们可以通过创建一个cvui::window() 用来容纳复选框的窗口来防止这个问题。代码如下：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
 
#define WINDOW_NAME &quot;CVUI Canny Edge&quot;
 
int main(void)
{
    cv::Mat lena = cv::imread(&quot;lena.jpg&quot;);
    cv::Mat frame = lena.clone();
    int low_threshold = 50, high_threshold = 150;
    bool use_canny = false;
 
    // Init a OpenCV window and tell cvui to use it.
    cv::namedWindow(WINDOW_NAME);
    cvui::init(WINDOW_NAME);
 
    while (true) {
        // Should we apply Canny edge?
        if (use_canny) {
            // Yes, we should apply it.
            cv::cvtColor(lena, frame, CV_BGR2GRAY);
            cv::Canny(frame, frame, low_threshold, high_threshold, 3);
        } else {
            // No, so just copy the original image to the displaying frame.
            lena.copyTo(frame);
        }
 
        // Render the settings window to house the UI
        cvui::window(frame, 10, 50, 180, 180, &quot;Settings&quot;);
         
        // Checkbox to enable/disable the use of Canny edge
        cvui::checkbox(frame, 15, 80, &quot;Use Canny Edge&quot;, &amp;use_canny);
 
        // Update cvui internal stuff
        cvui::update();
 
        // Show everything on the screen
        cv::imshow(WINDOW_NAME, frame);
 
        // Check if ESC was pressed
        if (cv::waitKey(30) == 27) {
            break;
        }
    }
    return 0;
}
</code></pre><p>结果如下：</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-decent-ui.png" alt="https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-decent-ui.png" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-decent-ui.png</figcaption></figure><p>(3) 调整阈值</p><p>是时候允许用户在运行时选择low_threashold和high_threashold的值。由于这些参数可以在一个间隔内变化，我们可以cvui::trackbar()用来创建一个滑动窗口栏。代码如下：</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;
 
#define WINDOW_NAME &quot;CVUI Canny Edge&quot;
 
int main(void)
{
    cv::Mat lena = cv::imread(&quot;lena.jpg&quot;);
    cv::Mat frame = lena.clone();
    int low_threshold = 50, high_threshold = 150;
    bool use_canny = false;
 
    // Init a OpenCV window and tell cvui to use it.
    cv::namedWindow(WINDOW_NAME);
    cvui::init(WINDOW_NAME);
 
    while (true) {
        // Should we apply Canny edge?
        if (use_canny) {
            // Yes, we should apply it.
            cv::cvtColor(lena, frame, CV_BGR2GRAY);
            cv::Canny(frame, frame, low_threshold, high_threshold, 3);
        } else {
            // No, so just copy the original image to the displaying frame.
            lena.copyTo(frame);
        }
 
        // Render the settings window to house the UI
        cvui::window(frame, 10, 50, 180, 180, &quot;Settings&quot;);
         
        // Checkbox to enable/disable the use of Canny edge
        cvui::checkbox(frame, 15, 80, &quot;Use Canny Edge&quot;, &amp;use_canny);
 
        // Two trackbars to control the low and high threshold values
        // for the Canny edge algorithm.
        cvui::trackbar(frame, 15, 110, 165, &amp;low_threshold, 5, 150);
        cvui::trackbar(frame, 15, 180, 165, &amp;high_threshold, 80, 300);
 
        // Update cvui internal stuff
        cvui::update();
 
        // Show everything on the screen
        cv::imshow(WINDOW_NAME, frame);
 
        // Check if ESC was pressed
        if (cv::waitKey(30) == 27) {
            break;
        }
    }
    return 0;
}
</code></pre><p>该 cvui::trackbar() 函数接受指定轨迹栏允许的最小值和最大值的参数。在上面的例子中，它们分别是[5,150] low_threshold和[80,300] high_threshold。结果是一个完全交互式的应用程序，允许用户快速，轻松地探索Canny Edge参数的调整，以及启用/禁用它的使用。效果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]28 基于OpenCV的GUI库cvui/20190508174721447.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-代码" tabindex="-1"><a class="header-anchor" href="#_3-代码"><span>3 代码</span></a></h2><p>以下是此应用程序的完整代码，您不需要多行代码就可以为您的应用程序生成最小（且有用）的UI界面。该cvui并非旨在成为复杂图形应用程序开发的完整解决方案。它在很多方面都很简单并且有限。但是，它实用，易于使用，可以为您节省数小时的挫折和繁琐的工作。如果实际工程应用推荐QT而不是MFC(个人观点)。</p><p>本文所有代码和cvui头文件见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>hello world代码：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;

//cvui界面名字
#define WINDOW_NAME &quot;CVUI Hello World!&quot;

int main()
{
	cv::Mat frame = cv::Mat(200, 500, CV_8UC3);
	int count = 0;

	// Init a OpenCV window and tell cvui to use it.
	//创建cvui窗口
	cv::namedWindow(WINDOW_NAME);
	//初始化窗口
	cvui::init(WINDOW_NAME);

	//必须要用无限循环，每次变动cvui会生成新的一个图像，看起来界面变化了
	while (true)
	{
		// Fill the frame with a nice color 创建程序窗口背景图像
		frame = cv::Scalar(49, 52, 49);

		// Buttons will return true if they were clicked
		//在背景图像(110,80)点添加按钮(按钮的左上角顶点坐标，所有的cvui坐标都是左上角顶点)，按钮显示名字为“hello,world”
		//当按钮被点击时，会返回true
		if (cvui::button(frame, 110, 80, &quot;Hello, world!&quot;))
		{
			// The button was clicked, so let&#39;s increment our counter.
			//统计按钮被点击次数
			count++;
		}

		// Sometimes you want to show text that is not that simple, e.g. strings + numbers.
		// You can use cvui::printf for that. It accepts a variable number of parameter, pretty
		// much like printf does.
		// Let&#39;s show how many times the button has been clicked.
		//在frame(250,90)点添加一个文本框，文本框字体大小为0.5,颜色为0xff0000
		//显示的内容为&quot;Button click count: %d&quot;, count
		cvui::printf(frame, 250, 90, 0.5, 0xff0000, &quot;Button click count: %d&quot;, count);

		// This function must be called *AFTER* all UI components. It does
		// all the behind the scenes magic to handle mouse clicks, etc.
		//更新cvui界面
		cvui::update();

		// Show everything on the screen
		//把所有的东西显示出来
		cv::imshow(WINDOW_NAME, frame);
		// Check if ESC key was pressed
		//ESC退出循环
		if (cv::waitKey(20) == 27)
		{
			break;
		}
	}

	return 0;
}
</code></pre><p>canny算子代码：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#define CVUI_IMPLEMENTATION
#include &quot;cvui.h&quot;

//cvui界面名字
#define WINDOW_NAME	&quot;CVUI Canny Edge&quot;

int main()
{
	//读图像
	cv::Mat lena = cv::imread(&quot;lena.jpg&quot;);
	//背景图像
	cv::Mat frame = lena.clone();
	//canny阈值
	int low_threshold = 50, high_threshold = 150;
	//是否使用边缘检测
	bool use_canny = false;

	// Init a OpenCV window and tell cvui to use it.
	// If cv::namedWindow() is not used, mouse events will
	// not be captured by cvui.
	//创建cvui窗口
	cv::namedWindow(WINDOW_NAME);
	//初始化窗口
	cvui::init(WINDOW_NAME);

	while (true)
	{
		// Should we apply Canny edge?
		//是否使用边缘检测
		if (use_canny) 
		{
			// Yes, we should apply it.
			cv::cvtColor(lena, frame, CV_BGR2GRAY);
			cv::Canny(frame, frame, low_threshold, high_threshold, 3);
			cv::cvtColor(frame, frame, CV_GRAY2BGR);
		} 
		else 
		{
			// No, so just copy the original image to the displaying frame.
			//直接显示图像
			lena.copyTo(frame);
		}

		// Render the settings window to house the checkbox
		// and the trackbars below.
		//debug下可能有bug
		//主要问题在于cvui.h，void window函数问题，解决办法aOverlay = theBlock.where.clone();
		//在frame(10,50)处设置一个长宽180，180的名为Settings窗口
		cvui::window(frame, 10, 50, 180, 180, &quot;Settings&quot;);
		
		// Checkbox to enable/disable the use of Canny edge
		//在frame(15,80)点添加复选框，复选框文本名&quot;Use Canny Edge&quot;，调整参数use_canny
		cvui::checkbox(frame, 15, 80, &quot;Use Canny Edge&quot;, &amp;use_canny);

		// Two trackbars to control the low and high threshold values
		// for the Canny edge algorithm
		//滑动条控制最低分割阈值
		//在frame(15,110)点添加滑动条，滑动条宽165，控制值low_threshold，值变化范围5到150
		cvui::trackbar(frame, 15, 110, 165, &amp;low_threshold, 5, 150);
		//滑动条控制最高分割阈值
		cvui::trackbar(frame, 15, 180, 165, &amp;high_threshold, 80, 300);

		// This function must be called *AFTER* all UI components. It does
		// all the behind the scenes magic to handle mouse clicks, etc.
		//更新ui界面
		cvui::update();

		// Show everything on the screen
		//把所有的东西显示出来
		cv::imshow(WINDOW_NAME, frame);

		// Check if ESC was pressed
		//ESC退出
		if (cv::waitKey(30) == 27) 
		{
			break;
		}
	}

	return 0;
}
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/cvui-gui-lib-built-on-top-of-opencv-drawing-primitives/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/cvui-gui-lib-built-on-top-of-opencv-drawing-primitives/ </a></li></ul>`,34))])}const v=i(u,[["render",h],["__file","2019-05-08-_OpenCV实战_28 基于OpenCV的GUI库cvui.html.vue"]]),g=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-08-_OpenCV%E5%AE%9E%E6%88%98_28%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84GUI%E5%BA%93cvui.html","title":"[OpenCV实战]28 基于OpenCV的GUI库cvui","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-05-08T17:49:44.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]28 基于OpenCV的GUI库cvui 有很多很棒的GUI库，例如Qt和imgui，可以与OpenCV一起使用，允许您在运行时调整参数。但是，在某些情况下，您可能没有（或不希望）此类库的依赖关系，例如，您没有使用Qt支持编译OpenCV，或者您无法使用OpenGL。在这种情况下，您只需要一种快速，轻松的方式来创建GUI来调整算法。...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-08-_OpenCV%E5%AE%9E%E6%88%98_28%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84GUI%E5%BA%93cvui.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]28 基于OpenCV的GUI库cvui"}],["meta",{"property":"og:description","content":"[OpenCV实战]28 基于OpenCV的GUI库cvui 有很多很棒的GUI库，例如Qt和imgui，可以与OpenCV一起使用，允许您在运行时调整参数。但是，在某些情况下，您可能没有（或不希望）此类库的依赖关系，例如，您没有使用Qt支持编译OpenCV，或者您无法使用OpenGL。在这种情况下，您只需要一种快速，轻松的方式来创建GUI来调整算法。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.learnopencv.com/wp-content/uploads/2017/06/cvui.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-05-08T17:49:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]28 基于OpenCV的GUI库cvui\\",\\"image\\":[\\"https://www.learnopencv.com/wp-content/uploads/2017/06/cvui.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D28%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84GUI%E5%BA%93cvui/20190508174312652.gif\\",\\"https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-manual-small.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D28%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84GUI%E5%BA%93cvui/20190508174530181.gif\\",\\"https://www.learnopencv.com/wp-content/uploads/2017/06/cvui-canny-decent-ui.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D28%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84GUI%E5%BA%93cvui/20190508174721447.gif\\"],\\"datePublished\\":\\"2019-05-08T17:49:44.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 cvui 的使用","slug":"_1-cvui-的使用","link":"#_1-cvui-的使用","children":[{"level":3,"title":"1.1 如何在您的应用程序中添加cvui","slug":"_1-1-如何在您的应用程序中添加cvui","link":"#_1-1-如何在您的应用程序中添加cvui","children":[]},{"level":3,"title":"1.2 基本的“hello world”应用程序","slug":"_1-2-基本的-hello-world-应用程序","link":"#_1-2-基本的-hello-world-应用程序","children":[]}]},{"level":2,"title":"2 更高级的应用","slug":"_2-更高级的应用","link":"#_2-更高级的应用","children":[]},{"level":2,"title":"3 代码","slug":"_3-代码","link":"#_3-代码","children":[]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":10.18,"words":3055},"filePathRelative":"blog/opencv/opencv实战/2019-05-08-[OpenCV实战]28 基于OpenCV的GUI库cvui.md","localizedDate":"2019年5月9日","excerpt":"\\n<p>有很多很棒的GUI库，例如Qt和imgui，可以与OpenCV一起使用，允许您在运行时调整参数。但是，在某些情况下，您可能没有（或不希望）此类库的依赖关系，例如，您没有使用Qt支持编译OpenCV，或者您无法使用OpenGL。在这种情况下，您只需要一种快速，轻松的方式来创建GUI来调整算法。</p>\\n<p>这就是cvui的目的。它是一个基于OpenCV绘图基元构建的跨平台GUI库，仅需使用头文件就可以搭建。除了OpenCV本身（您可能已经在使用）之外，它没有依赖关系。Cvui在C++下通过.h文件实现全部功能，在Python下直接提供.py文件。本文仅仅讲述cvui在C++下的构建，python通常用的少。</p>","autoDesc":true}');export{v as comp,g as data};
