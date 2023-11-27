import{_ as u}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as l,c as r,a as t,b as n,d as i,e as o}from"./app-MsA2k2kn.js";const c={},p=t("h1",{id:"图像处理-yuv图像处理入门5",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#图像处理-yuv图像处理入门5","aria-hidden":"true"},"#"),n(" [图像处理] YUV图像处理入门5")],-1),m=t("h2",{id:"_12-yuv420转换为rgb-opencv-mat",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_12-yuv420转换为rgb-opencv-mat","aria-hidden":"true"},"#"),n(" 12 yuv420转换为rgb(opencv mat)")],-1),s=t("p",null,"yuv格式具有亮度信息和色彩信息分离的特点，但大多数图像处理操作都是基于RGB格式，而且自己造轮子工作量太大。因此通常都会将yuv转换为rgb，再用opencv等视觉库进行图像处理。",-1),g=t("p",null,"yuv转换为rgb有多种方法，比如公式法。但是推荐使用第三方库进行转换，比如ffmpeg，libyuv，opencv。其中ffmpeg是专门的视频音频处理软件，libyuv是谷歌开发的专门用于yuv基本图像处理（如旋转，缩放，格式转换）的视频库，libyuv主要用于android端。",-1),d=t("p",null,"ffmpeg，libyuv，opencv都是开源的。可以在网上查找资料。",-1),h=t("p",null,"本文简单介绍ffmpeg和libyuv的安装，opencv的安装教程很多就不介绍了。具体见文章：",-1),b={href:"https://blog.csdn.net/weixin_39393712/article/details/79583274",target:"_blank",rel:"noopener noreferrer"},f=t("h3",{id:"ffmpeg和libyuv-的安装",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#ffmpeg和libyuv-的安装","aria-hidden":"true"},"#"),n(),t("strong",null,"ffmpeg和libyuv"),n(),t("strong",null,"的安装：")],-1),_=t("p",null,"下载最新的ffmpeg的dev版和share版，ffmpeg严格区分x64和x86。下载网站为：",-1),v={href:"http://ffmpeg.zeranoe.com/builds/",target:"_blank",rel:"noopener noreferrer"},q=t("p",null,"Libyuv需要编译源文件，源文件地址：",-1),y={href:"https://chromium.googlesource.com/libyuv/libyuv/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/seungrye/libyuv",target:"_blank",rel:"noopener noreferrer"},x=t("p",null,"编译步骤见：",-1),F={href:"https://blog.csdn.net/aabcd123456/article/details/78982528",target:"_blank",rel:"noopener noreferrer"},V=o('<p>获得源文件后先建立vs工程，然后将ffmpegdev版本文件夹中的include和lib整个目录复制到vs工程目录下。如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920285.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于libyuv的libyuv文件和lib文件，将其分别复制到vs工程目录下的include目录和lib目录。如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170919579.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920107.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通常include中包含的是所调用库头文件，lib包含的是静态链接库，当然ffmpeg需要将其动态链接库复制到vs工程目录下，即将ffmpeg，share版本文件夹中bin目录下对应的所有dll复制到项目路径下如图所示：：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920340.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Dll和lib是windows系统下的动态链接库和静态链接库，linux系统下的静态链接库以.a结尾，linux系统下的动态链接库以.so或.so.y结尾。具体可以见文章：</p>',8),C={href:"https://www.cnblogs.com/general001/articles/3567446.html",target:"_blank",rel:"noopener noreferrer"},G=t("p",null,"对于ffmpeg，libyuv在linux系统下的编译使用，通过编译下载相关源代码，通过cmake或者make命令进行项目构建。推荐使用cmake软件，cmake非常有用，应用十分广泛。入门教程见：",-1),k={href:"http://www.cnblogs.com/52php/p/5681745.html",target:"_blank",rel:"noopener noreferrer"},L=o(`<p>在windows平台下，通过vs就能够减少大量工作。vs平台链接ffmpeg和libyuv的头文件和lib文件，先在项目工程属性&gt;C/C++&gt;常规&gt;附加包含目录，添加include目录，但是ffmpeg有许多错误，vs通常会开启SDL检查后，某些警告会成为错误。所以将sdl检查置为否。如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170921296.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接着在在项目工程属性&gt;链接器&gt;常规&gt;附加库目录下，添加lib文件夹，如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170921318.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最后如果使用ffmpeg和libyuv库，需要添加头文件完成整个工作的配置。代码如下：</p><pre><code>extern &quot;C&quot;

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
</code></pre><hr><h3 id="yuv420转rgb" tabindex="-1"><a class="header-anchor" href="#yuv420转rgb" aria-hidden="true">#</a> yuv420转rgb</h3><p>接下来通过ffmpeg，libyuv，opencv实现yuv420转rgb，并进行性能分析。函数的代码如下所示：</p><pre><code>/**
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
</code></pre><p>这段代码主要是分别用ffmpeg，libyuv，opencv实现yuv420转换为rgb，每种方法转换300张yuv420图像。对比三种方法转换所用时间，结果如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门5/20181211170920288.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>综合三种方法来说，ffmpeg速度最快，且ffmpeg最常用，因此推荐使用ffmpeg。如果仅仅对yuv图像进行处理或者android端，libyuv最为推荐。如果是安装ffmpeg或者libyuv较为麻烦，仅限于研究项目，建议使用opencv。</p>`,15);function U(Y,B){const e=a("ExternalLinkIcon");return l(),r("div",null,[p,m,s,g,d,h,t("p",null,[t("a",b,[n(" https://blog.csdn.net/weixin_39393712/article/details/79583274"),i(e)])]),f,_,t("p",null,[t("a",v,[n(" http://ffmpeg.zeranoe.com/builds/ "),i(e)])]),q,t("p",null,[t("a",y,[n(" https://chromium.googlesource.com/libyuv/libyuv/ "),i(e)])]),t("p",null,[t("a",w,[n(" https://github.com/seungrye/libyuv "),i(e)]),n(" 。")]),x,t("p",null,[t("a",F,[n(" https://blog.csdn.net/aabcd123456/article/details/78982528 "),i(e)])]),V,t("p",null,[t("a",C,[n(" https://www.cnblogs.com/general001/articles/3567446.html "),i(e)])]),G,t("p",null,[t("a",k,[n(" http://www.cnblogs.com/52php/p/5681745.html "),i(e)])]),L])}const M=u(c,[["render",U],["__file","2018-12-11-_图像处理_ YUV图像处理入门5.html.vue"]]);export{M as default};
