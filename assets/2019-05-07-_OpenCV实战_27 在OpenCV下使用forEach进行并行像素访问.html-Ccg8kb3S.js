import{_ as e,c as n,a,o}from"./app-TQoR7mvJ.js";const r={};function l(i,t){return o(),n("div",null,t[0]||(t[0]=[a(`<h1 id="opencv实战-27-在opencv下使用foreach进行并行像素访问" tabindex="-1"><a class="header-anchor" href="#opencv实战-27-在opencv下使用foreach进行并行像素访问"><span>[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问</span></a></h1><p>C++11扩展了for语句的语法。用这个新写法forEach，forEach可以遍历C类型的数组、初始化列表以及任何重载了非成员的begin()和end()函数的类型。OpenCV的Mat数据结构中有用到ForEach的写法。在本教程中，我们将比较Mat类的forEach方法与OpenCV中访问和转换像素值的其他方法的性能。我们将展示forEach如何比使用at方法或甚至有效地使用指针算法更快。因此本文只有C++ forEach用法介绍。Python下实现容易多，搜索即可。</p><p>OpenCV中有隐藏的功能，有时候并不是很有名。其中一个隐藏的功能是Mat类的forEach方法，它利用机器上的所有核心在每个像素上处理任何功能。</p><p>我们先来定义一个函数complexThreshold。它接收RGB像素值并对其应用复杂的阈值分割。代码如下：</p><pre><code>// Define a pixel 
typedef Point3_&lt;uint8_t&gt; Pixel;
 
// A complicated threshold is defined so 
// a non-trivial amount of computation 
// is done at each pixel. 
void complicatedThreshold(Pixel &amp;pixel)
{
  if (pow(double(pixel.x)/10,2.5) &gt; 100)
  {
    pixel.x = 255;
    pixel.y = 255;
    pixel.z = 255;
  }
  else
  {
    pixel.x = 0;
    pixel.y = 0;
    pixel.z = 0;
  }
}
</code></pre><p>与简单阈值相比，该函数在计算量要多得多。这样我们不仅可以测试像素访问时间，还可以了解每个像素操作在计算量很大时forEach如何使用CPU所有核心。接下来，我们将介绍将四种不同的方法应用于图像中的每个像素并检查相对性能。</p><h2 id="_1-mat像素访问" tabindex="-1"><a class="header-anchor" href="#_1-mat像素访问"><span><strong>1 Mat像素访问</strong></span></a></h2><h3 id="_1-1-使用at-方法直接进行像素访问" tabindex="-1"><a class="header-anchor" href="#_1-1-使用at-方法直接进行像素访问"><span><strong>1.1</strong> <strong>使用at</strong> <strong>方法直接进行像素访问</strong></span></a></h3><p>Mat类有一个方便的方法，用于访问图像中位置（行，列）的像素。以下代码使用at方法访问每个像素并对其应用complexThreshold。代码如下：</p><pre><code>	//循环测试numTrials次
	for (int n = 0; n &lt; numTrials; n++)
	{
		// Naive pixel access at方法直接读取数据
		// Loop over all rows 遍历行
		for (int r = 0; r &lt; image.rows; r++)
		{
			// Loop over all columns 遍历列
			for (int c = 0; c &lt; image.cols; c++)
			{
				// Obtain pixel at (r, c) 直接访问像素数据
				Pixel pixel = image.at&lt;Pixel&gt;(r, c);
				// Apply complicatedTreshold 阈值分割
				complicatedThreshold(pixel);
				// Put result back 保存结果
				image.at&lt;Pixel&gt;(r, c) = pixel;
			}
		}
	}
</code></pre><p>上述方法被认为是低效的，因为每次调用at方法时都会计算存储器中像素的位置。这涉及乘法运算，而不使用像素位于连续的存储器块中相关特性。</p><h3 id="_1-2-使用指针进行像素访问" tabindex="-1"><a class="header-anchor" href="#_1-2-使用指针进行像素访问"><span><strong>1.2</strong> <strong>使用指针进行像素访问</strong></span></a></h3><p>在OpenCV中，一行中的所有像素都存储在一个连续的内存块中。如果使用create创建Mat对象，则所有像素都存储在一个连续的内存块中。由于我们正在从磁盘读取图像的imread方法会使用create方法创建一个Mat对象，因此我们可以使用不需要乘法，而通过简单指针算法简单地遍历所有像素。代码如下：</p><pre><code>	//通过指针访问像素点，类似YUV图像处理，前提图像存储是连续的
	for (int n = 0; n &lt; numTrials; n++)
	{
		// Get pointer to first pixel
		//初始指针
		Pixel *pixel = image1.ptr&lt;Pixel&gt;(0, 0);

		// Mat objects created using the create method are stored
		// in one continous memory block.
		// 访问像素点位置
		const Pixel *endPixel = pixel + image1.cols * image1.rows;

		// Loop over all pixels
		for (; pixel != endPixel; pixel++)
		{
			complicatedThreshold(*pixel);
		}
	}
</code></pre><p>这种方式是很有效的一种方法，实际较为常用，但是速度并没有达到最优，比at快不了多少，而且指针直接操作容易出错。</p><h3 id="_1-3-使用foreach-方法进行像素访问" tabindex="-1"><a class="header-anchor" href="#_1-3-使用foreach-方法进行像素访问"><span><strong>1.3</strong> <strong>使用forEach</strong> <strong>方法进行像素访问</strong></span></a></h3><p>Mat类的forEach方法接受一个函数运算符Operator。用法如下：</p><pre><code>void cv::Mat::forEach   (const Functor &amp;operation)  
</code></pre><p>理解上述用法的最简单方法是通过下面的示例。我们定义了一个与forEach一起使用的函数对象（Operator）。代码如下：</p><pre><code>// Parallel execution with function object.
struct Operator
{
  void operator ()(Pixel &amp;pixel, const int * position) const
  {
    // Perform a simple threshold operation
    complicatedThreshold(pixel);
  }
};
</code></pre><p>调用forEach很简单，只需一行代码即可完成</p><pre><code>// Call forEach
image2.forEach&lt;Pixel&gt;(Operator());
</code></pre><p>这种方法速度很快，操作很简单。</p><h3 id="_1-4-将foreach-与c-11-lambda-一起使用" tabindex="-1"><a class="header-anchor" href="#_1-4-将foreach-与c-11-lambda-一起使用"><span><strong>1.4</strong> <strong>将forEach</strong> <strong>与C ++ 11 Lambda</strong> <strong>一起使用</strong></span></a></h3><p>Lambda是C++11的新特性，具体使用见：</p><p><a href="https://blog.csdn.net/lixiaogang_theanswer/article/details/80905445" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/lixiaogang_theanswer/article/details/80905445</a></p><p>代码如下：</p><pre><code>	for (int n = 0; n &lt; numTrials; n++)
	{
		// Parallel execution using C++11 lambda.
		image3.forEach&lt;Pixel&gt;([](Pixel &amp;pixel, const int *position) -&gt; void {
			complicatedThreshold(pixel);
		});
	}
</code></pre><p>这种方式就不需要创建函数运算符，速度相比forEach不相上下。</p><h2 id="_2-性能比较与代码" tabindex="-1"><a class="header-anchor" href="#_2-性能比较与代码"><span><strong>2</strong> <strong>性能比较与代码</strong></span></a></h2><h3 id="_2-1-性能比较" tabindex="-1"><a class="header-anchor" href="#_2-1-性能比较"><span>2.1 性能比较</span></a></h3><p>通过函数complicatedThreshold处理大小9000X6750的大图像。实验中使用的2.3 GHz Intel Core i5处理器有四个内核。获得以下时间。请注意，使用forEach使代码比使用Naive Pixel Access或Pointer Arithmetic方法快五倍。</p><table><thead><tr><th>方法</th><th>时间/ms</th></tr></thead><tbody><tr><td>at方法</td><td>10960.8</td></tr><tr><td>指针</td><td>10171.9</td></tr><tr><td>forEach</td><td>2686.1</td></tr><tr><td>forEach (C++11 Lambda)</td><td>2747.2</td></tr></tbody></table><p>如果是处理300X225的小图像时，结果如下：</p><table><thead><tr><th>方法</th><th>时间/ms</th></tr></thead><tbody><tr><td>at方法</td><td>13.2</td></tr><tr><td>指针</td><td>11.3</td></tr><tr><td>forEach</td><td>4.6</td></tr><tr><td>forEach (C++11 Lambda)</td><td>2.9</td></tr></tbody></table><p>可以看到小图像或大图像使用指针算法和at直接访问效果差距不大。而直接使用forEach适合大图像，forEach+Lambda特性更适合于小图像。用Lamdba特性处理小图像要比forEach处理快的原因在于，lambda特性更适用于不太耗时的操作使用，如普通for循环，纯CPU计算类型的操作，函数处理时间少的情况。数据库的IO操作，多线程充分利用CPU资源，lambda就不那么适合，可能时间开销更大。</p><h3 id="_2-2-代码" tabindex="-1"><a class="header-anchor" href="#_2-2-代码"><span>2.2 代码</span></a></h3><p>所有代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>C++：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;

// Use cv and std namespaces
using namespace cv;
using namespace std;

// Define a pixel 定义Pixel结构
typedef Point3_&lt;uint8_t&gt; Pixel;

/**
 * @brief tic is called to start timer 开始函数运行时间计算
 *
 * @param t
 */
void tic(double &amp;t)
{
	t = (double)getTickCount();
}

/**
 * @brief toc is called to end timer 结束函数运行时间计算
 *
 * @param t
 * @return double 返回值运行时间ms
 */
double toc(double &amp;t)
{
	return ((double)getTickCount() - t) / getTickFrequency() * 1000;
}

/**
 * @brief 阈值分割
 *
 * @param pixel
 */
void complicatedThreshold(Pixel &amp;pixel)
{
	//x,y,z分别代表三个通道的值
	if (pow(double(pixel.x) / 10, 2.5) &gt; 100)
	{
		pixel.x = 255;
		pixel.y = 255;
		pixel.z = 255;
	}
	else
	{
		pixel.x = 0;
		pixel.y = 0;
		pixel.z = 0;
	}
}

/**
 * @brief Parallel execution with function object. 并行处理函数结构体
 *
 */
struct Operator
{
	//处理函数
	void operator()(Pixel &amp;pixel, const int *position) const
	{
		// Perform a simple threshold operation
		complicatedThreshold(pixel);
	}
};

int main()
{
	// Read image 读图
	Mat image = imread(&quot;./image/butterfly.jpg&quot;);

	// Scale image 30x 将图像扩大为30倍，长宽都变大30倍
	resize(image, image, Size(), 30, 30);

	// Print image size 打印图像尺寸
	cout &lt;&lt; &quot;Image size &quot; &lt;&lt; image.size() &lt;&lt; endl;

	// Number of trials 测试次数
	int numTrials = 5;

	// Print number of trials 测试次数
	cout &lt;&lt; &quot;Number of trials : &quot; &lt;&lt; numTrials &lt;&lt; endl;

	// Make two copies 图像复制
	Mat image1 = image.clone();
	Mat image2 = image.clone();
	Mat image3 = image.clone();

	// Start timer 时间函数,单位为ms
	double t;
	//开始计算时间
	tic(t);

	//循环测试numTrials次
	for (int n = 0; n &lt; numTrials; n++)
	{
		// Naive pixel access at方法直接读取数据
		// Loop over all rows 遍历行
		for (int r = 0; r &lt; image.rows; r++)
		{
			// Loop over all columns 遍历列
			for (int c = 0; c &lt; image.cols; c++)
			{
				// Obtain pixel at (r, c) 直接访问像素数据
				Pixel pixel = image.at&lt;Pixel&gt;(r, c);
				// Apply complicatedTreshold 阈值分割
				complicatedThreshold(pixel);
				// Put result back 保存结果
				image.at&lt;Pixel&gt;(r, c) = pixel;
			}
		}
	}
	//计算函数执行时间
	cout &lt;&lt; &quot;Naive way: &quot; &lt;&lt; toc(t) &lt;&lt; endl;

	// Start timer
	tic(t);

	// image1 is guaranteed to be continous, but
	// if you are curious uncomment the line below
	//需要判断图像连续存储，1表示图像连续，0不连续
	//cout &lt;&lt; &quot;Image 1 is continous : &quot; &lt;&lt; image1.isContinuous() &lt;&lt; endl;

	//通过指针访问像素点，类似YUV图像处理，前提图像存储是连续的
	for (int n = 0; n &lt; numTrials; n++)
	{
		// Get pointer to first pixel
		//初始指针
		Pixel *pixel = image1.ptr&lt;Pixel&gt;(0, 0);

		// Mat objects created using the create method are stored
		// in one continous memory block.
		// 访问像素点位置
		const Pixel *endPixel = pixel + image1.cols * image1.rows;

		// Loop over all pixels
		for (; pixel != endPixel; pixel++)
		{
			complicatedThreshold(*pixel);
		}
	}
	cout &lt;&lt; &quot;Pointer Arithmetic &quot; &lt;&lt; toc(t) &lt;&lt; endl;

	tic(t);
	//forEach遍历像素
	for (int n = 0; n &lt; numTrials; n++)
	{
		image2.forEach&lt;Pixel&gt;(Operator());
	}
	cout &lt;&lt; &quot;forEach : &quot; &lt;&lt; toc(t) &lt;&lt; endl;

	//C++版本
	cout &lt;&lt; __cplusplus &lt;&lt; endl;

	//使用C++11 lambda特性
	tic(t);
	for (int n = 0; n &lt; numTrials; n++)
	{
		// Parallel execution using C++11 lambda.
		image3.forEach&lt;Pixel&gt;([](Pixel &amp;pixel, const int *position) -&gt; void {
			complicatedThreshold(pixel);
		});
	}
	cout &lt;&lt; &quot;forEach C++11 : &quot; &lt;&lt; toc(t) &lt;&lt; endl;

	return 0;
}
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/parallel-pixel-access-in-opencv-using-foreach/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/parallel-pixel-access-in-opencv-using-foreach/</a></li></ul>`,43)]))}const p=e(r,[["render",l],["__file","2019-05-07-_OpenCV实战_27 在OpenCV下使用forEach进行并行像素访问.html.vue"]]),s=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-07-_OpenCV%E5%AE%9E%E6%88%98_27%20%E5%9C%A8OpenCV%E4%B8%8B%E4%BD%BF%E7%94%A8forEach%E8%BF%9B%E8%A1%8C%E5%B9%B6%E8%A1%8C%E5%83%8F%E7%B4%A0%E8%AE%BF%E9%97%AE.html","title":"[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-05-07T14:42:11.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问 C++11扩展了for语句的语法。用这个新写法forEach，forEach可以遍历C类型的数组、初始化列表以及任何重载了非成员的begin()和end()函数的类型。OpenCV的Mat数据结构中有用到ForEach的写法。在本教程中，我们将比较Mat类的forEach方法...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-05-07-_OpenCV%E5%AE%9E%E6%88%98_27%20%E5%9C%A8OpenCV%E4%B8%8B%E4%BD%BF%E7%94%A8forEach%E8%BF%9B%E8%A1%8C%E5%B9%B6%E8%A1%8C%E5%83%8F%E7%B4%A0%E8%AE%BF%E9%97%AE.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问"}],["meta",{"property":"og:description","content":"[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问 C++11扩展了for语句的语法。用这个新写法forEach，forEach可以遍历C类型的数组、初始化列表以及任何重载了非成员的begin()和end()函数的类型。OpenCV的Mat数据结构中有用到ForEach的写法。在本教程中，我们将比较Mat类的forEach方法..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-05-07T14:42:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-05-07T14:42:11.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 Mat像素访问","slug":"_1-mat像素访问","link":"#_1-mat像素访问","children":[{"level":3,"title":"1.1 使用at 方法直接进行像素访问","slug":"_1-1-使用at-方法直接进行像素访问","link":"#_1-1-使用at-方法直接进行像素访问","children":[]},{"level":3,"title":"1.2 使用指针进行像素访问","slug":"_1-2-使用指针进行像素访问","link":"#_1-2-使用指针进行像素访问","children":[]},{"level":3,"title":"1.3 使用forEach 方法进行像素访问","slug":"_1-3-使用foreach-方法进行像素访问","link":"#_1-3-使用foreach-方法进行像素访问","children":[]},{"level":3,"title":"1.4 将forEach 与C ++ 11 Lambda 一起使用","slug":"_1-4-将foreach-与c-11-lambda-一起使用","link":"#_1-4-将foreach-与c-11-lambda-一起使用","children":[]}]},{"level":2,"title":"2 性能比较与代码","slug":"_2-性能比较与代码","link":"#_2-性能比较与代码","children":[{"level":3,"title":"2.1 性能比较","slug":"_2-1-性能比较","link":"#_2-1-性能比较","children":[]},{"level":3,"title":"2.2 代码","slug":"_2-2-代码","link":"#_2-2-代码","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":6.96,"words":2087},"filePathRelative":"blog/opencv/opencv实战/2019-05-07-[OpenCV实战]27 在OpenCV下使用forEach进行并行像素访问.md","localizedDate":"2019年5月7日","excerpt":"\\n<p>C++11扩展了for语句的语法。用这个新写法forEach，forEach可以遍历C类型的数组、初始化列表以及任何重载了非成员的begin()和end()函数的类型。OpenCV的Mat数据结构中有用到ForEach的写法。在本教程中，我们将比较Mat类的forEach方法与OpenCV中访问和转换像素值的其他方法的性能。我们将展示forEach如何比使用at方法或甚至有效地使用指针算法更快。因此本文只有C++ forEach用法介绍。Python下实现容易多，搜索即可。</p>\\n<p>OpenCV中有隐藏的功能，有时候并不是很有名。其中一个隐藏的功能是Mat类的forEach方法，它利用机器上的所有核心在每个像素上处理任何功能。</p>","autoDesc":true}');export{p as comp,s as data};
