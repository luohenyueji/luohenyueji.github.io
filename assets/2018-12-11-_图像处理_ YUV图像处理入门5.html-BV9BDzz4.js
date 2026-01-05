import{_ as e,c as n,a as i,o as a}from"./app-BOswGe5u.js";const o={};function u(l,t){return a(),n("div",null,t[0]||(t[0]=[i(`<h1 id="图像处理-yuv图像处理入门5" tabindex="-1"><a class="header-anchor" href="#图像处理-yuv图像处理入门5"><span>[图像处理] YUV图像处理入门5</span></a></h1><h2 id="_12-yuv420转换为rgb-opencv-mat" tabindex="-1"><a class="header-anchor" href="#_12-yuv420转换为rgb-opencv-mat"><span>12 yuv420转换为rgb(opencv mat)</span></a></h2><p>yuv格式具有亮度信息和色彩信息分离的特点，但大多数图像处理操作都是基于RGB格式，而且自己造轮子工作量太大。因此通常都会将yuv转换为rgb，再用opencv等视觉库进行图像处理。</p><p>yuv转换为rgb有多种方法，比如公式法。但是推荐使用第三方库进行转换，比如ffmpeg，libyuv，opencv。其中ffmpeg是专门的视频音频处理软件，libyuv是谷歌开发的专门用于yuv基本图像处理（如旋转，缩放，格式转换）的视频库，libyuv主要用于android端。</p><p>ffmpeg，libyuv，opencv都是开源的。可以在网上查找资料。</p><p>本文简单介绍ffmpeg和libyuv的安装，opencv的安装教程很多就不介绍了。具体见文章：</p><p><a href="https://blog.csdn.net/weixin_39393712/article/details/79583274" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/weixin_39393712/article/details/79583274</a></p><h3 id="ffmpeg和libyuv-的安装" tabindex="-1"><a class="header-anchor" href="#ffmpeg和libyuv-的安装"><span><strong>ffmpeg和libyuv</strong> <strong>的安装：</strong></span></a></h3><p>下载最新的ffmpeg的dev版和share版，ffmpeg严格区分x64和x86。下载网站为：</p><p><a href="http://ffmpeg.zeranoe.com/builds/" target="_blank" rel="noopener noreferrer"> http://ffmpeg.zeranoe.com/builds/ </a></p><p>Libyuv需要编译源文件，源文件地址：</p><p><a href="https://chromium.googlesource.com/libyuv/libyuv/" target="_blank" rel="noopener noreferrer"> https://chromium.googlesource.com/libyuv/libyuv/ </a></p><p><a href="https://github.com/seungrye/libyuv" target="_blank" rel="noopener noreferrer"> https://github.com/seungrye/libyuv </a> 。</p><p>编译步骤见：</p><p><a href="https://blog.csdn.net/aabcd123456/article/details/78982528" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/aabcd123456/article/details/78982528 </a></p><p>获得源文件后先建立vs工程，然后将ffmpegdev版本文件夹中的include和lib整个目录复制到vs工程目录下。如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920285.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于libyuv的libyuv文件和lib文件，将其分别复制到vs工程目录下的include目录和lib目录。如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170919579.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920107.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通常include中包含的是所调用库头文件，lib包含的是静态链接库，当然ffmpeg需要将其动态链接库复制到vs工程目录下，即将ffmpeg，share版本文件夹中bin目录下对应的所有dll复制到项目路径下如图所示：：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920340.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Dll和lib是windows系统下的动态链接库和静态链接库，linux系统下的静态链接库以.a结尾，linux系统下的动态链接库以.so或.so.y结尾。具体可以见文章：</p><p><a href="https://www.cnblogs.com/general001/articles/3567446.html" target="_blank" rel="noopener noreferrer"> https://www.cnblogs.com/general001/articles/3567446.html </a></p><p>对于ffmpeg，libyuv在linux系统下的编译使用，通过编译下载相关源代码，通过cmake或者make命令进行项目构建。推荐使用cmake软件，cmake非常有用，应用十分广泛。入门教程见：</p><p><a href="http://www.cnblogs.com/52php/p/5681745.html" target="_blank" rel="noopener noreferrer"> http://www.cnblogs.com/52php/p/5681745.html </a></p><p>在windows平台下，通过vs就能够减少大量工作。vs平台链接ffmpeg和libyuv的头文件和lib文件，先在项目工程属性&gt;C/C++&gt;常规&gt;附加包含目录，添加include目录，但是ffmpeg有许多错误，vs通常会开启SDL检查后，某些警告会成为错误。所以将sdl检查置为否。如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170921296.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接着在在项目工程属性&gt;链接器&gt;常规&gt;附加库目录下，添加lib文件夹，如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170921318.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最后如果使用ffmpeg和libyuv库，需要添加头文件完成整个工作的配置。代码如下：</p><pre><code>extern &quot;C&quot;

{

#include &quot;include\\libavcodec\\avcodec.h&quot;

#include &quot;include\\libavformat\\avformat.h&quot;

#include &quot;include\\libavutil\\channel_layout.h&quot;

#include &quot;include\\libavutil\\common.h&quot;

#include &quot;include\\libavutil\\imgutils.h&quot;

#include &quot;include\\libswscale\\swscale.h&quot;

#include &quot;include\\libavutil\\imgutils.h&quot;

#include &quot;include\\libavutil\\opt.h&quot;

#include &quot;include\\libavutil\\mathematics.h&quot;

#include &quot;include\\libavutil\\samplefmt.h&quot;

//libyuv

#include &quot;include\\libyuv\\libyuv.h&quot;

};

#pragma comment(lib, &quot;avcodec.lib&quot;)

#pragma comment(lib, &quot;avformat.lib&quot;)

#pragma comment(lib, &quot;avdevice.lib&quot;)

#pragma comment(lib, &quot;avfilter.lib&quot;)

#pragma comment(lib, &quot;avutil.lib&quot;)

#pragma comment(lib, &quot;postproc.lib&quot;)

#pragma comment(lib, &quot;swresample.lib&quot;)

#pragma comment(lib, &quot;swscale.lib&quot;)

//libyuv

#pragma comment(lib, &quot;yuv.lib&quot;)
</code></pre><hr><h3 id="yuv420转rgb" tabindex="-1"><a class="header-anchor" href="#yuv420转rgb"><span>yuv420转rgb</span></a></h3><p>接下来通过ffmpeg，libyuv，opencv实现yuv420转rgb，并进行性能分析。函数的代码如下所示：</p><pre><code>/**
 * @file 12 yuv_transform.cpp
 * @author luohen
 * @brief YUV image transform to opencv rgb image
 * @date 2018-12-11
 * 
 */

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;time.h&gt;

extern &quot;C&quot;
{
#include &quot;include\\libavcodec\\avcodec.h&quot;
#include &quot;include\\libavformat\\avformat.h&quot;
#include &quot;include\\libavutil\\channel_layout.h&quot;
#include &quot;include\\libavutil\\common.h&quot;
#include &quot;include\\libavutil\\imgutils.h&quot;
#include &quot;include\\libswscale\\swscale.h&quot;
#include &quot;include\\libavutil\\imgutils.h&quot;
#include &quot;include\\libavutil\\opt.h&quot;
#include &quot;include\\libavutil\\mathematics.h&quot;
#include &quot;include\\libavutil\\samplefmt.h&quot;
//libyuv
#include &quot;include\\libyuv\\libyuv.h&quot;
};
#pragma comment(lib, &quot;avcodec.lib&quot;)
#pragma comment(lib, &quot;avformat.lib&quot;)
#pragma comment(lib, &quot;avdevice.lib&quot;)
#pragma comment(lib, &quot;avfilter.lib&quot;)
#pragma comment(lib, &quot;avutil.lib&quot;)
#pragma comment(lib, &quot;postproc.lib&quot;)
#pragma comment(lib, &quot;swresample.lib&quot;)
#pragma comment(lib, &quot;swscale.lib&quot;)
//libyuv
#pragma comment(lib, &quot;yuv.lib&quot;)

using namespace std;
using namespace cv;

/**
 * @brief
 *
 * @param pYUV		input yuv420 image
 * @param pBGR24 	output bgr24 image
 * @param width		width of input yuv420p image
 * @param height	height of input yuv420p image
 * @return
 */
bool ffmpeg_yuv2bgr(unsigned char *pYUV, unsigned char *pBGR24, int width, int height)
{
	AVPicture pFrameYUV, pFrameBGR;

	avpicture_fill(&amp;pFrameYUV, pYUV, AV_PIX_FMT_YUV420P, width, height);
	avpicture_fill(&amp;pFrameBGR, pBGR24, AV_PIX_FMT_BGR24, width, height);

	struct SwsContext *imgCtx = NULL;
	//初始化函数
	//原图高，宽，图像类型；输出图高，宽，图像类型；算法种类；其他
	imgCtx = sws_getContext(width, height, AV_PIX_FMT_YUV420P, width, height, AV_PIX_FMT_BGR24, SWS_BILINEAR, 0, 0, 0);

	if (imgCtx != NULL)
	{
		//执行函数
		//函数返回值；输入图像指针数组，图像颜色通道数组；扫描起点；扫描行数；输出图像指针数组，图像颜色通道数组；
		sws_scale(imgCtx, pFrameYUV.data, pFrameYUV.linesize, 0, height, pFrameBGR.data, pFrameBGR.linesize);
		//end
		if (imgCtx)
		{
			sws_freeContext(imgCtx);
			imgCtx = NULL;
		}
		return true;
	}
	else
	{
		sws_freeContext(imgCtx);
		imgCtx = NULL;
		return false;
	}
}

/**
 * @brief		transform function of ffmpeg
 *
 * @param w		width of input yuv420p image
 * @param h		height of input yuv420p image
 * @param pic	input yuv image
 * @return Mat	output rgb image(opencv mat)
 */
Mat yuv420_ffmpeg(int w, int h, unsigned char *pic)
{
	Mat bgrImg(h, w, CV_8UC3);
	unsigned char *pBGR24 = new unsigned char[w * h * 3];
	ffmpeg_yuv2bgr(pic, bgrImg.data, w, h);

	return bgrImg;
}

/**
 * @brief		transform function of libyuv
 *
 * @param w		width of input yuv420p image
 * @param h		height of input yuv420p image
 * @param pic	input yuv image
 * @return Mat	output rgb image(opencv mat)
 */
Mat yuv420_libyuv(int w, int h, unsigned char *pic)
{
	int size_src = w * h * 3 / 2;
	int size_dest = w * h * 4;

	//BGRA, A:Alpha(transparency，透明度)
	Mat matI420 = cv::Mat(h, w, CV_8UC4);

	libyuv::I420ToARGB((const uint8 *)pic, w,
					   (const uint8 *)(pic + w * h), w / 2,
					   (const uint8 *)(pic + w * h * 5 / 4), w / 2,
					   matI420.data, w * 4, w, h);
	//bgr
	Mat bgrImg;
	cvtColor(matI420, bgrImg, COLOR_BGRA2BGR);
	return bgrImg;
}

/**
 * @brief
 *
 * @param w
 * @param h
 * @param pic
 * @return Mat
 */
Mat yuv420_opencv(int w, int h, unsigned char *pic)
{
	//创建YUV mat
	cv::Mat yuvImg;
	yuvImg.create(h * 3 / 2, w, CV_8UC1);
	//数据保存为yuvImg.data
	memcpy(yuvImg.data, pic, w * h * 3 / 2 * sizeof(unsigned char));

	//转化为RGB图像
	cv::Mat bgrImg;
	cv::cvtColor(yuvImg, bgrImg, CV_YUV2BGR_I420);

	return bgrImg;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	clock_t start, end;
	double endtime;
	//Frequency of reading image
	int count_frame = 300;
	//视频路径
	char *url = (char *)&quot;video/akiyo.yuv&quot;;
	int w = 352, h = 288;
	FILE *input_fp;
	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return -1;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	unsigned char *pYuvBuf = new unsigned char[w * h * 3 / 2];

	fseek(input_fp, 0, SEEK_SET);
	//Timing starts
	start = clock();
	Mat ffmpeg_mat;
	for (int i = 0; i &lt; count_frame; i++)
	{
		fread(pYuvBuf, sizeof(unsigned char), w * h * 3 / 2, input_fp);
		ffmpeg_mat = yuv420_ffmpeg(w, h, pYuvBuf);
	}

	//Timing end
	end = clock();
	endtime = (double)(end - start) / CLOCKS_PER_SEC;
	cout &lt;&lt; &quot;ffmpeg Total time:&quot; &lt;&lt; endtime &lt;&lt; &quot;s&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;ffmpeg Total time:&quot; &lt;&lt; endtime * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

	fseek(input_fp, 0, SEEK_SET);
	start = clock();
	Mat libyuv_mat;
	for (int i = 0; i &lt; count_frame; i++)
	{
		fread(pYuvBuf, sizeof(unsigned char), w * h * 3 / 2, input_fp);
		libyuv_mat = yuv420_libyuv(w, h, pYuvBuf);
	}
	end = clock();
	endtime = (double)(end - start) / CLOCKS_PER_SEC;
	cout &lt;&lt; &quot;libyuv Total time:&quot; &lt;&lt; endtime &lt;&lt; &quot;s&quot; &lt;&lt; endl;			//s为单位
	cout &lt;&lt; &quot;libyuv Total time:&quot; &lt;&lt; endtime * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl; //ms为单位

	fseek(input_fp, 0, SEEK_SET);
	start = clock();
	Mat opencv_mat;
	for (int i = 0; i &lt; count_frame; i++)
	{
		fread(pYuvBuf, sizeof(unsigned char), w * h * 3 / 2, input_fp);
		opencv_mat = yuv420_opencv(w, h, pYuvBuf);
	}
	end = clock();
	endtime = (double)(end - start) / CLOCKS_PER_SEC;
	cout &lt;&lt; &quot;opencv Total time:&quot; &lt;&lt; endtime &lt;&lt; &quot;s&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;opencv Total time:&quot; &lt;&lt; endtime * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

	system(&quot;pause&quot;);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>Mat yuv420_ffmpeg(int w, int h, unsigned char *pic);

Mat yuv420_libyuv(int w, int h, unsigned char *pic);

Mat yuv420_opencv(int w, int h, unsigned char *pic);
</code></pre><p>这段代码主要是分别用ffmpeg，libyuv，opencv实现yuv420转换为rgb，每种方法转换300张yuv420图像。对比三种方法转换所用时间，结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920288.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>综合三种方法来说，ffmpeg速度最快，且ffmpeg最常用，因此推荐使用ffmpeg。如果仅仅对yuv图像进行处理或者android端，libyuv最为推荐。如果是安装ffmpeg或者libyuv较为麻烦，仅限于研究项目，建议使用opencv。</p>`,41)]))}const p=e(o,[["render",u],["__file","2018-12-11-_图像处理_ YUV图像处理入门5.html.vue"]]),c=JSON.parse('{"path":"/blog/%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86/YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A8/2018-12-11-_%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86_%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85.html","title":"[图像处理] YUV图像处理入门5","lang":"zh-CN","frontmatter":{"date":"2018-12-11T17:36:03.000Z","category":["图像处理"],"tag":["图像处理"],"description":"[图像处理] YUV图像处理入门5 12 yuv420转换为rgb(opencv mat) yuv格式具有亮度信息和色彩信息分离的特点，但大多数图像处理操作都是基于RGB格式，而且自己造轮子工作量太大。因此通常都会将yuv转换为rgb，再用opencv等视觉库进行图像处理。 yuv转换为rgb有多种方法，比如公式法。但是推荐使用第三方库进行转换，比如f...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86/YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A8/2018-12-11-_%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86_%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[图像处理] YUV图像处理入门5"}],["meta",{"property":"og:description","content":"[图像处理] YUV图像处理入门5 12 yuv420转换为rgb(opencv mat) yuv格式具有亮度信息和色彩信息分离的特点，但大多数图像处理操作都是基于RGB格式，而且自己造轮子工作量太大。因此通常都会将yuv转换为rgb，再用opencv等视觉库进行图像处理。 yuv转换为rgb有多种方法，比如公式法。但是推荐使用第三方库进行转换，比如f..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170920285.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2018-12-11T17:36:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[图像处理] YUV图像处理入门5\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170920285.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170919579.jpeg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170920107.jpeg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170920340.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170921296.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170921318.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A85/20181211170920288.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2018-12-11T17:36:03.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"12 yuv420转换为rgb(opencv mat)","slug":"_12-yuv420转换为rgb-opencv-mat","link":"#_12-yuv420转换为rgb-opencv-mat","children":[{"level":3,"title":"ffmpeg和libyuv 的安装：","slug":"ffmpeg和libyuv-的安装","link":"#ffmpeg和libyuv-的安装","children":[]},{"level":3,"title":"yuv420转rgb","slug":"yuv420转rgb","link":"#yuv420转rgb","children":[]}]}],"git":{},"readingTime":{"minutes":7.01,"words":2104},"filePathRelative":"blog/图像处理/YUV图像处理入门/2018-12-11-[图像处理] YUV图像处理入门5.md","localizedDate":"2018年12月12日","excerpt":"\\n<h2>12 yuv420转换为rgb(opencv mat)</h2>\\n<p>yuv格式具有亮度信息和色彩信息分离的特点，但大多数图像处理操作都是基于RGB格式，而且自己造轮子工作量太大。因此通常都会将yuv转换为rgb，再用opencv等视觉库进行图像处理。</p>\\n<p>yuv转换为rgb有多种方法，比如公式法。但是推荐使用第三方库进行转换，比如ffmpeg，libyuv，opencv。其中ffmpeg是专门的视频音频处理软件，libyuv是谷歌开发的专门用于yuv基本图像处理（如旋转，缩放，格式转换）的视频库，libyuv主要用于android端。</p>\\n<p>ffmpeg，libyuv，opencv都是开源的。可以在网上查找资料。</p>","autoDesc":true}');export{p as comp,c as data};
