import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as d,c as o,a as e,b as n,d as i,e as l}from"./app-MsA2k2kn.js";const s={},c=l('<h1 id="音视频处理-ffmpeg使用指北1-视频解码" tabindex="-1"><a class="header-anchor" href="#音视频处理-ffmpeg使用指北1-视频解码" aria-hidden="true">#</a> [音视频处理] FFmpeg使用指北1-视频解码</h1><p>本文将详细介绍如何使用ffmpeg 4.4在C++中解码多种格式的媒体文件，这些媒体文件可以是视频、视频流、图片，或是桌面截屏或USB摄像头的实时图片。解码文件后，还将每帧图片转换为OpenCV的Mat格式以供后续使用。</p><p>[toc]</p><h2 id="_1-基于ffmpeg的媒体文件解码" tabindex="-1"><a class="header-anchor" href="#_1-基于ffmpeg的媒体文件解码" aria-hidden="true">#</a> 1 基于ffmpeg的媒体文件解码</h2><h3 id="_1-1-简介" tabindex="-1"><a class="header-anchor" href="#_1-1-简介" aria-hidden="true">#</a> 1.1 简介</h3>',5),u={href:"https://blog.csdn.net/HW140701/article/details/84193760",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/wuhaohong123/article/details/119057769",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/0_hello_world.c",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/README-cn.md#%E7%AB%A0%E8%8A%820---%E8%87%AD%E5%90%8D%E6%98%AD%E8%91%97%E7%9A%84-hello-world",target:"_blank",rel:"noopener noreferrer"},p={href:"https://blog.jackeylea.com/ffmpeg/ffmpeg-learning-indexes",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/leixiaohua1020/article/details/84606540",target:"_blank",rel:"noopener noreferrer"},f=l(`<p>涉及的步骤如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[音视频处理] FFmpeg使用指北1-视频解码/image1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>解封装</strong></p><p>在音视频处理过程中，解封装是指将输入的音视频文件进行解析，提取出音频流和视频流等多种流媒体数据，以便后续的数据处理和解码。在解封装过程中，首先需要判断输入源的格式，即判断输入的音视频文件是属于哪种格式。然后打开文件，查找流信息和视频索引。</p><p><strong>解码</strong></p><p>解码是指将音视频数据进行解码，将压缩后的数据转换成原始的音视频数据，以便后续的数据处理和播放。在解码过程中，需要初始化解码器，并打开解码器。本文只解码视频，音频则不进行处理。</p><p><strong>取数据</strong></p><p>在取数据过程中，需要初始化数据结构，读取视频帧，并将视频帧发送给解码器。随后，从解码器获取解码结果。</p><p><strong>数据处理</strong></p><p>数据处理是指对音视频数据进行各种处理，比如色彩空间转换、图像尺寸变换、图像格式转换等。</p><p><strong>释放资源</strong></p><p>在完成解码和数据处理后，需要释放结构体，以释放资源。释放资源是指对音视频处理过程中占用的各种资源进行释放，包括解码器、数据结构、缓冲区等。</p><h3 id="_1-2-详细代码" tabindex="-1"><a class="header-anchor" href="#_1-2-详细代码" aria-hidden="true">#</a> 1.2 详细代码</h3><p>详细代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>/**
 * @brief 代码主要参考https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/0_hello_world.c
 *
 */

extern &quot;C&quot;
{
#include &quot;libavcodec/avcodec.h&quot;
#include &quot;libavfilter/avfilter.h&quot;
#include &quot;libavformat/avformat.h&quot;
#include &quot;libavutil/avutil.h&quot;
#include &quot;libavutil/ffversion.h&quot;
#include &quot;libavutil/opt.h&quot;
#include &quot;libavutil/imgutils.h&quot;
#include &quot;libavutil/time.h&quot;
#include &quot;libswresample/swresample.h&quot;
#include &quot;libswscale/swscale.h&quot;
#include &quot;libavdevice/avdevice.h&quot;
}
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;chrono&gt;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;stdarg.h&gt;
#include &lt;string.h&gt;
#include &lt;inttypes.h&gt;

// 日志打印宏
#define LOG(msg, ...)\\
fprintf(stderr,&quot;LOG [line %d] &quot;,__LINE__);\\
fprintf(stderr,msg, ##__VA_ARGS__);\\
fprintf(stderr, &quot;\\n&quot;);

// 支持的输入文件形式
enum URLType { file, usbcam, desktop, yuvfile };

// usb摄像头读取函数
void usbcam_get(const char * url, AVInputFormat ** ifmt);

// 解码函数
static int decode_packet(AVPacket *pPacket, AVCodecContext *pCodecContext, AVFrame *pFrame, int skip = 0);

/**
 * 涉及到结构体
 * AVFormatContext	存储媒体文件所有信息的结构体
 * AVInputFormat 存储媒体文件的格式信息
 * AVStream	表示音视频流信息的结构体
 * AVCodecContext	存储解码音视频所有信息的结构体
 * AVCodec	存储视频或音频的编解码器的结构体
 * AVCodecParameters	存储音视频编解码器的相关参数信息的结构体
 * AVPacket	储存解码前数据的结构体
 * AVFrame	存储解码后数据的结构体
 * AVRational	表示有理数的结构体
 * SwsContext	用于图像转换的结构体
 */
int main()
{
	// 设置数据类型
	URLType urltype = yuvfile;
	// 初始化结构体
	const char *url = NULL;
	AVFormatContext *pFormatContext = NULL;
	AVInputFormat *ifmt = NULL;
	AVDictionary *options = NULL;
	// AVCodec负责编解码音视频流
	AVCodecContext *pCodecContext = NULL;
	AVCodec *pCodec = NULL;
	AVCodecParameters *pCodecParameters = NULL;
	// 负责保存数据
	AVPacket *pPacket = NULL;
	AVFrame *pFrame = NULL;

	LOG(&quot;FFMPEG VERSION: %s&quot;, av_version_info());
	LOG(&quot;开始运行&quot;);

	// 存储音视频封装格式中包含的信息
	// avformat_alloc_context初始化AVFormatContext结构体
	pFormatContext = avformat_alloc_context();

	if (!pFormatContext)
	{
		LOG(&quot;pFormatContext分配内存失败&quot;);
		return -1;
	}

	// 注册能操作的输入输出设备
	avdevice_register_all();
	if (urltype == file)
	{
		// rtsp流
		//url = &quot;rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&quot;;
		// 输入图片
		// url = &quot;demo.png&quot;;
		// 输入视频
		url = &quot;demo.mp4&quot;;
		// 设置超时时间为5秒
		av_dict_set(&amp;options, &quot;stimeout&quot;, &quot;5000000&quot;, 0);
	}
	else if (urltype == usbcam)
	{
		url = &quot;0&quot;;
		// 如果使用以下方式读取本机摄像头，需要自行获得摄像头名称
		// 使用指令：ffmpeg -list_devices true -f dshow -i dummy
		//url = &quot;video=HD WebCam&quot;;
		// 输出ffmpeg版本
		usbcam_get(url, &amp;ifmt);
		// 设置图片尺寸
		av_dict_set(&amp;options, &quot;video_size&quot;, &quot;640x480&quot;, 0);
		av_dict_set(&amp;options, &quot;framerate&quot;, &quot;30&quot;, 0);
	}
	else if (urltype == desktop)
	{
		// Windows
#ifdef _WIN32
	// 根据不同的url选择不同的格式
		url = &quot;desktop&quot;;
		ifmt = av_find_input_format(&quot;gdigrab&quot;);
		// linux处理
#elif defined linux
		// linux命令行输入echo $DISPALY获得
		url = &quot;:1&quot;;
		ifmt = av_find_input_format(&quot;x11grab&quot;);
#endif
		av_dict_set(&amp;options, &quot;video_size&quot;, &quot;1920x1080&quot;, 0);
		av_dict_set(&amp;options, &quot;framerate&quot;, &quot;15&quot;, 0);
	}
	else if (urltype == yuvfile)
	{
		url = &quot;akiyo_cif.yuv&quot;;
		// yuv图像尺寸需要提前设置
		av_dict_set(&amp;options, &quot;video_size&quot;, &quot;352x288&quot;, 0);
	}

	// avformat_open_input打开输入的媒体文件
	if (avformat_open_input(&amp;pFormatContext, url, ifmt, &amp;options) != 0)
	{
		LOG(&quot;打开文件失败&quot;);
		return -1;
	}

	LOG(&quot;打开文件 %s&quot;, url);

	// 读取文件音视频编解码器的信息
	LOG(&quot;文件格式 %s, 文件时长 %lld us, 比特率 %lld bit/s&quot;,
		pFormatContext-&gt;iformat-&gt;name,
		pFormatContext-&gt;duration,
		pFormatContext-&gt;bit_rate);

	LOG(&quot;获取输入音视频文件的流信息&quot;);
	// avformat_find_stream_info获取输入音视频文件的流信息
	if (avformat_find_stream_info(pFormatContext, NULL) &lt; 0)
	{
		LOG(&quot;无法获取流信息&quot;);
		return -1;
	}

	// 设置是否读取到视频流
	int video_stream_index = -1;

	// 循环浏览所有流并打印其主要信息
	for (int i = 0; i &lt; int(pFormatContext-&gt;nb_streams); i++)
	{
		AVCodecParameters *pLocalCodecParameters = NULL;
		// 提取当前流的编解码器参数
		pLocalCodecParameters = pFormatContext-&gt;streams[i]-&gt;codecpar;

		AVCodec *pLocalCodec = NULL;

		// 查找指定编解码器的解码器
		pLocalCodec = avcodec_find_decoder(pLocalCodecParameters-&gt;codec_id);

		if (pLocalCodec == NULL)
		{
			LOG(&quot;不支持该解码器！&quot;);
			continue;
		}

		// 当流是视频时，我们存储其索引、解码器和编解码器参数
		if (pLocalCodecParameters-&gt;codec_type == AVMEDIA_TYPE_VIDEO)
		{
			if (video_stream_index == -1)
			{
				video_stream_index = i;
				pCodec = pLocalCodec;
				pCodecParameters = pLocalCodecParameters;
			}

			LOG(&quot;视频编解码器类型： %s ID： %d&quot;, pLocalCodec-&gt;name, pLocalCodec-&gt;id);
			LOG(&quot;视频流帧率为：%f&quot;, av_q2d(pFormatContext-&gt;streams[i]-&gt;r_frame_rate));
			LOG(&quot;视频流共有：%d帧&quot;, pFormatContext-&gt;streams[i]-&gt;nb_frames);
			LOG(&quot;视频图像分辨率为：(%d,%d)&quot;, pLocalCodecParameters-&gt;width, pLocalCodecParameters-&gt;height);
		}
		else if (pLocalCodecParameters-&gt;codec_type == AVMEDIA_TYPE_AUDIO)
		{
			LOG(&quot;音频编解码器类型： %s ID： %d&quot;, pLocalCodec-&gt;name, pLocalCodec-&gt;id);
			LOG(&quot;音频通道数：%d channels, 采样率：%d&quot;, pLocalCodecParameters-&gt;channels, pLocalCodecParameters-&gt;sample_rate);
		}
	}

	if (video_stream_index == -1)
	{
		LOG(&quot;%s文件不包含视频流!&quot;, url);
		return -1;
	}

	// 分配AVCodecContext结构体并进行初始化
	pCodecContext = avcodec_alloc_context3(pCodec);
	if (!pCodecContext)
	{
		LOG(&quot;AVCodecContext初始失败&quot;);
		return -1;
	}

	// 将AVCodecParameters中的参数设置到AVCodecContext中
	if (avcodec_parameters_to_context(pCodecContext, pCodecParameters) &lt; 0)
	{
		LOG(&quot;AVCodecParameters参数拷贝失败&quot;);
		return -1;
	}

	// 打开解码器
	if (avcodec_open2(pCodecContext, pCodec, NULL) &lt; 0)
	{
		LOG(&quot;打开解码器失败&quot;);
		return -1;
	}

	// 创建AVPacket
	pPacket = av_packet_alloc();
	if (!pPacket)
	{
		LOG(&quot;AVPacket初始化失败&quot;);
		return -1;
	}

	// 创建AVFrame
	pFrame = av_frame_alloc();
	if (!pFrame)
	{
		LOG(&quot;AVFrame初始化失败&quot;);
		return -1;
	}

	int response = 0;
	// 最多读取帧数
	int how_many_packets_to_process = 500;
	// 帧处理跨度
	int skip_span = 50;

	// 读取媒体文件中的音视频帧
	while (av_read_frame(pFormatContext, pPacket) &gt;= 0)
	{
		// 判断是否为视频帧
		if (pPacket-&gt;stream_index == video_stream_index)
		{
			// 只解码关键帧，关键帧不依赖于其他帧进行解码，所以可以跳过其他帧

			// 关键帧间隔由媒体流数据源决定
			// if (!(pPacket-&gt;flags &amp; AV_PKT_FLAG_KEY)) {
			//	continue;
			//}
			int skip = 1;
			// 如果已读取帧数除以skip_span为0，则下一帧进行处理
			if (pCodecContext-&gt;frame_number % skip_span == 0)
			{
				skip = 0;
			}

			// 计算时间
			auto start = std::chrono::system_clock::now();
			// 图像解码函数
			response = decode_packet(pPacket, pCodecContext, pFrame, skip);
			auto end = std::chrono::system_clock::now();
			auto duration = std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(end - start).count();
			if (skip == 0)
			{
				LOG(&quot;解码和处理一帧图像耗时：%d ms&quot;, duration);
			}
			else
			{
				LOG(&quot;仅解码一帧图像耗时：%d ms&quot;, duration);
			}
			// 图像解码状态判定
			if (response &lt; 0)
				break;
			// 超过读取图像上限
			if (--how_many_packets_to_process &lt;= 0)
			{
				LOG(&quot;读图完毕！&quot;);
				break;
			}
		}
		// 释放AVPacket结构体中的内存
		av_packet_unref(pPacket);
	}

	LOG(&quot;销毁所有结构体&quot;);

	// 销毁结构体
	avformat_close_input(&amp;pFormatContext);
	av_packet_free(&amp;pPacket);
	av_frame_free(&amp;pFrame);
	avcodec_free_context(&amp;pCodecContext);
	av_dict_free(&amp;options);
	system(&quot;pause&quot;);
	return 0;
}

void usbcam_get(const char * url, AVInputFormat ** ifmt)
{
	// Windows
#ifdef _WIN32
	// 根据不同的url选择不同的格式
	if (url == &quot;0&quot;)
		*ifmt = av_find_input_format(&quot;vfwcap&quot;);
	else
		*ifmt = av_find_input_format(&quot;dshow&quot;);
	// linux
#elif defined linux
	url = &quot;/dev/video0&quot;;
	*ifmt = av_find_input_format(&quot;video4linux2&quot;);
#endif
}

static int decode_packet(AVPacket *pPacket, AVCodecContext *pCodecContext, AVFrame *pFrame, int skip)
{
	// 将pPacket数据送入pCodecContext进行解码
	int response = avcodec_send_packet(pCodecContext, pPacket);

	if (response &lt; 0)
	{
		return response;
	}

	while (response &gt;= 0)
	{
		// 用于从解码器中获取解码后的视频帧
		response = avcodec_receive_frame(pCodecContext, pFrame);
		if (response == AVERROR(EAGAIN) || response == AVERROR_EOF)
		{
			break;
		}
		else if (response &lt; 0)
		{
			LOG(&quot;读图出错: %d&quot;, response);
			return response;
		}

		// 仅读取当前帧
		if (skip != 0)
		{
			return 0;
		}
		if (response &gt;= 0)
		{
			LOG(&quot;Frame %d，帧类型=%c，视频格式=%d，pts=%d，是否为关键帧=%d&quot;,
				pCodecContext-&gt;frame_number,
				av_get_picture_type_char(pFrame-&gt;pict_type),
				pFrame-&gt;format,
				pFrame-&gt;pts,
				pFrame-&gt;key_frame);

			// 图像保存名
			char frame_filename[1024];
			snprintf(frame_filename, sizeof(frame_filename), &quot;%s-%d.jpg&quot;, &quot;frame&quot;, pCodecContext-&gt;frame_number);

			// 将解码后的帧转换为BGR格式
			// 创建图像转换器，设置图像尺寸缩小一倍
			int dst_w = int(pCodecContext-&gt;width / 2);
			int dst_h = int(pCodecContext-&gt;height / 2);
			SwsContext *swsCtx = sws_getContext(
				pCodecContext-&gt;width, pCodecContext-&gt;height, (AVPixelFormat)pCodecContext-&gt;pix_fmt,
				dst_w, dst_h, AV_PIX_FMT_BGR24,
				SWS_POINT, NULL, NULL, NULL);
			cv::Mat bgrMat(dst_h, dst_w, CV_8UC3);
			// 拿出opencv的数据
			uint8_t *dest[1] = { bgrMat.data };
			int destStride[1] = { int(bgrMat.step) };
			// 执行格式转换
			sws_scale(swsCtx, pFrame-&gt;data, pFrame-&gt;linesize, 0, pFrame-&gt;height, dest, destStride);
			// 保存图片
			cv::imwrite(frame_filename, bgrMat);
			// 释放swsCtx数据
			sws_freeContext(swsCtx);
		}
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),g={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/img/decoding.png",target:"_blank",rel:"noopener noreferrer"},h=l(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[音视频处理] FFmpeg使用指北1-视频解码/image2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果是linux下使用该代码文件还需编写CMakeLists.txt，CMakeLists.txt内容如下：</p><div class="language-CMAKE line-numbers-mode" data-ext="CMAKE"><pre class="language-CMAKE"><code>## 最低cmake版本
cmake_minimum_required(VERSION 3.2)
## 工程名
project(ffmpeg_demo)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(EXECUTABLE_OUTPUT_PATH \${PROJECT_SOURCE_DIR})

## --- opencv
find_package(OpenCV REQUIRED)

## --- ffmpeg
set(FFMPEG_INCLUDE_DIRS &quot;/usr/local/include/&quot;)
set(FFMPEG_LIB_DIRS &quot;/usr/local/lib/&quot;)
set(FFMPEG_LIBS &quot;avcodec;avformat;avutil;swresample;avdevice;swscale&quot;)

include_directories(\${FFMPEG_INCLUDE_DIRS})
link_directories(\${FFMPEG_LIB_DIRS})

## 生成可执行文件
add_executable(ffmpeg_demo demo.cpp)
target_link_libraries(ffmpeg_demo  \${FFMPEG_LIBS} \${OpenCV_LIBS} pthread)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-ffmpeg函数解释" tabindex="-1"><a class="header-anchor" href="#_2-ffmpeg函数解释" aria-hidden="true">#</a> 2 ffmpeg函数解释</h2><h3 id="_2-1-解封装" tabindex="-1"><a class="header-anchor" href="#_2-1-解封装" aria-hidden="true">#</a> 2.1 解封装</h3><p>解封装的作用是从输入的封装格式数据（例如MP4、AVI、MKV）中提取视频流压缩编码数据和音频流压缩编码数据。封装格式的作用是将已经压缩编码的视频数据和音频数据按照一定的格式放在一起。例如，将MP4封装格式的数据输出H.264编码格式的视频流和AAC格式的音频流。一般解封装的流程如下：</p><ol><li>在使用FFmpeg解码音视频文件时，需要通过AVFormatContext来获取文件信息和流信息。AVFormatContext中包含AVInputFormat结构体指针，指向当前媒体文件的输入格式。</li><li>AVInputFormat结构体描述了媒体文件的封装格式，如MP4、AVI、MKV等。</li><li>avformat_alloc_context用于创建并初始化AVFormatContext结构体，为后续的音视频文件解码或编码做好准备。</li><li>avformat_open_input用于打开音视频文件并读取文件信息到AVFormatContext结构体中。</li><li>avformat_find_stream_info用于获取音视频流信息并存储到AVFormatContext结构体中。</li><li>avformat_close_input用于关闭音视频文件并释放AVFormatContext结构体占用的内存空间。</li></ol><h4 id="avformatcontext" tabindex="-1"><a class="header-anchor" href="#avformatcontext" aria-hidden="true">#</a> AVFormatContext</h4>`,8),x={href:"http://ffmpeg.org/doxygen/trunk/structAVFormatContext.html",target:"_blank",rel:"noopener noreferrer"},A=l("<ul><li><code>AVInputFormat *iformat</code>：输入格式结构体指针，用于指定输入文件的格式，一般由FFmpeg自动探测获取。</li><li><code>AVOutputFormat *oformat</code>：输出封装格式的结构体指针。</li><li><code>AVIOContext *pb</code>：输入输出的AVIOContext结构体指针。</li><li><code>unsigned int nb_streams</code>：音视频流个数。</li><li><code>int64_t duration</code>：音视频文件的时长，单位为微秒（μs），一般由FFmpeg解析后赋值。</li><li><code>int64_t bit_rate</code>：音视频文件的码率，单位为bit/s，一般由FFmpeg解析后赋值。</li><li><code>AVStream **streams</code>：音视频流列表的指针数组。</li><li><code>AVDictionary *metadata</code>：元数据信息，例如标题、作者、描述等等。</li></ul><p>该结构体涉及以下函数：</p><p><strong>avformat_alloc_context</strong></p>",3),V={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__core.html#gac7a91abf2f59648d995894711f070f62",target:"_blank",rel:"noopener noreferrer"},C=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`AVFormatContext *avformat_alloc_context(void);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),k=e("p",null,[e("strong",null,"avformat_open_input")],-1),F={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gac05d61a2b492ae3985c658f34622c19d",target:"_blank",rel:"noopener noreferrer"},q=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int avformat_open_input(AVFormatContext ** ps,
                        const char * url, 
                        const AVInputFormat * fmt,
                        AVDictionary ** options )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>**ps</code>：指向AVFormatContext结构体指针的指针，用于存放打开的媒体文件的相关信息。</li><li><code>*url</code>：输入媒体文件的URL地址。可以是本地文件路径或者网络地址。</li><li><code>*fmt</code>：输入媒体文件的格式，如果为NULL，则根据URL自动探测输入媒体的格式。</li><li><code>**options</code>：输入媒体文件的选项参数。</li></ul><p><strong>avformat_find_stream_info</strong></p>`,3),y={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gad42172e27cddafb81096939783b157bb",target:"_blank",rel:"noopener noreferrer"},P=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int avformat_find_stream_info(AVFormatContext *ic, AVDictionary **options);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>ic</code>：指向<code>AVFormatContext</code>结构体的指针。</li><li><code>options</code>：指向<code>AVDictionary</code>结构体指针的指针，用于传递选项给解复用器。</li></ul><p><strong>avformat_close_input</strong></p>`,3),L={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gae804b99aec044690162b8b9b110236a4",target:"_blank",rel:"noopener noreferrer"},w=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`void avformat_close_input(AVFormatContext **ps);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),S=e("ul",null,[e("li",null,[e("code",null,"ps"),n("：指向AVFormatContext结构体指针的指针，该指针会在函数执行完毕后被置为NULL。")])],-1),I=e("p",null,[e("strong",null,"avformat_free_context")],-1),E={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__core.html#gac2990b13b68e831a408fce8e1d0d6445",target:"_blank",rel:"noopener noreferrer"},R=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>
void avformat_free_context(AVFormatContext * s)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>ps</code>：指向AVFormatContext结构体的指针。</li></ul><h4 id="avinputformat" tabindex="-1"><a class="header-anchor" href="#avinputformat" aria-hidden="true">#</a> AVInputFormat</h4>`,3),D={href:"http://ffmpeg.org/doxygen/trunk/structAVInputFormat.html",target:"_blank",rel:"noopener noreferrer"},O=l('<ul><li><code>const char * name</code>：输入文件类型的名称。</li><li><code>const char * long_name</code>：输入文件类型的详细描述。</li><li><code>const char * extensions</code>：输入文件类型的扩展名列表。</li></ul><h3 id="_2-2-解码" tabindex="-1"><a class="header-anchor" href="#_2-2-解码" aria-hidden="true">#</a> 2.2 解码</h3><p>解码的作用是将视频或音频压缩编码数据转换成为非压缩的视频或音频原始数据。例如将H.264的视频压缩数据解码为逐帧YUV图像数据。一般解码的流程如下：</p><ol><li>每个AVStream结构都存储一个视频/音频流的相关数据，例如流的编号、流的类型、流的码率等等。AVStream结构中还包含一个指向对应AVCodecContext结构的指针，该结构用于存储该视频/音频流解码方式的所有信息，如编码器的名称、编码器的属性、编码器的状态等等。</li><li>AVCodecContext结构中又包含一个指向对应AVCodec结构的指针，AVCodec结构包含该视频/音频对应的解码器的基本信息，如编码器的名称、编码器的类型、编码器的能力等。当需要使用某个编解码器时，需要先通过编解码器的名称来查找对应的AVCodec结构体，然后再将这个结构体中的信息赋值给AVCodecContext结构体中的相应字段。</li><li>AVCodecParameters结构体是一个描述编解码器参数结构体，它包含了一个编解码器的参数信息，如编码器的宽度、编码器的高度、编码器的码率等等。对一个视频或音频流进行编解码时，需要使用AVCodecParameters结构体来描述这个流的参数信息，然后再将这个结构体中的信息赋值给AVCodecContext结构体中的相应字段。</li></ol><h4 id="avstream" tabindex="-1"><a class="header-anchor" href="#avstream" aria-hidden="true">#</a> AVStream</h4>',5),U={href:"https://ffmpeg.org/doxygen/trunk/structAVStream.html",target:"_blank",rel:"noopener noreferrer"},G=l('<ul><li><code>AVCodecParameters *codecpar</code>：指向AVCodecParameters结构体的指针，存储了该流的编解码器参数。</li><li><code>AVRational ime_base</code>：时间基准，表示每个采样的持续时间，以分数形式表示。</li><li><code>int64_t start_time</code>：流的开始时间，以时间戳的形式表示。</li><li><code>int64_t duration</code>：流的持续时间，以时间戳的形式表示。</li><li><code>int64_t nb_frames</code>：该流中的帧数。</li><li><code>AVRational r_frame_rate</code>：用于表示实际帧率的AVRational结构体。</li><li><code>AVRational avg_frame_rate</code>： 用于表示平均帧率的AVRational结构体。</li></ul><h4 id="avcodeccontext" tabindex="-1"><a class="header-anchor" href="#avcodeccontext" aria-hidden="true">#</a> AVCodecContext</h4>',2),N={href:"https://ffmpeg.org/doxygen/trunk/structAVCodecContext.html",target:"_blank",rel:"noopener noreferrer"},M=l("<ul><li><code>enum AVCodecID codec_id</code>：指定音视频编解码器的ID。</li><li><code>AVRational time_base</code>：音视频帧的时间基准，用于计算时间戳等。</li><li><code>int64_t bit_rate</code>：音视频的比特率，影响编码后的文件大小和质量。</li><li><code>int width</code>和<code>int height</code>：视频的宽高。</li><li><code>int sample_rate</code>和<code>int channels</code>：音频的采样率和声道数。</li><li><code>enum AVPixelFormat pix_fmt</code>：视频的像素格式，如YUV420P、RGB24等。</li><li><code>attribute_deprecated int frame_number</code>：获得已处理帧数，但是该属性已经被废弃，因为如果编码/解码导致错误，则计数器不递增。</li></ul><p>该结构体涉及以下函数：</p><p><strong>avcodec_alloc_context3</strong></p>",3),T={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#gae80afec6f26df6607eaacf39b561c315",target:"_blank",rel:"noopener noreferrer"},B=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`AVCodecContext *avcodec_alloc_context3(const AVCodec *codec);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),W=e("ul",null,[e("li",null,[e("code",null,"codec"),n("：指向AVCodec结构体的指针，表示要使用的解码器。")])],-1),Y=e("p",null,[e("strong",null,"avcodec_parameters_to_context")],-1),H={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#gac7b282f51540ca7a99416a3ba6ee0d16",target:"_blank",rel:"noopener noreferrer"},z=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`int avcodec_parameters_to_context(AVCodecContext *codec, const AVCodecParameters *par);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),K=e("ul",null,[e("li",null,[e("code",null,"AVCodecContext *codec"),n("：需要设置参数的AVCodecContext结构体指针。")]),e("li",null,[e("code",null,"const AVCodecParameters *par"),n("：需要从中获取参数的AVCodecParameters结构体指针。")])],-1),j=e("p",null,[e("strong",null,"avcodec_open2")],-1),$={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#ga11f785a188d7d9df71621001465b0f1d",target:"_blank",rel:"noopener noreferrer"},X=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int avcodec_open2(AVCodecContext *avctx, const AVCodec *codec, AVDictionary **options);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>avctx</code>：指向一个已经分配好内存的<code>AVCodecContext</code>结构体。</li><li><code>codec</code>：指向一个已经注册好的编码器或解码器的<code>AVCodec</code>结构体。</li><li><code>options</code>：指向一个<code>AVDictionary</code>类型的指针，用于传递打开编码器或解码器时的参数，可以为NULL。</li></ul><p><strong>avcodec_send_packet</strong></p>`,3),J={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__decoding.html#ga58bc4bf1e0ac59e27362597e467efff3",target:"_blank",rel:"noopener noreferrer"},Q=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`int avcodec_send_packet(AVCodecContext *avctx, const AVPacket *avpkt);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),Z=e("ul",null,[e("li",null,[e("code",null,"avctx"),n("：已经被打开的编解码器。")]),e("li",null,[e("code",null,"avpkt"),n("：待解码的AVPacket。")])],-1),ee=e("p",null,[e("strong",null,"avcodec_receive_frame")],-1),ne={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__decoding.html#ga11e6542c4e66d3028668788a1a74217c",target:"_blank",rel:"noopener noreferrer"},te=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int avcodec_receive_frame(AVCodecContext *avctx, AVFrame *frame);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>avctx</code>：解码器对象。</li><li><code>frame</code>：存放解码后的视频帧的AVFrame对象。</li></ul><p>返回值表示获取到的视频帧的状态，具体取值如下：</p><ul><li><code>0</code>：成功获取到一帧视频帧。</li><li><code>AVERROR(EAGAIN)</code>：缓冲区中没有可用的视频帧，需要再次调用该函数。</li><li><code>AVERROR_EOF</code>：解码器中的所有视频帧都已经读取完成。</li></ul><p><strong>avcodec_free_context</strong></p>`,5),ie={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#gaf869d0829ed607cec3a4a02a1c7026b3",target:"_blank",rel:"noopener noreferrer"},le=l('<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void avcodec_free_context(AVCodecContext **avctx);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>avctx</code>: 指向需要释放的AVCodecContext结构体指针。`</li></ul><h4 id="avcodec" tabindex="-1"><a class="header-anchor" href="#avcodec" aria-hidden="true">#</a> AVCodec</h4>',3),ae={href:"http://ffmpeg.org/doxygen/trunk/structAVCodec.html",target:"_blank",rel:"noopener noreferrer"},re=l("<ul><li><code>const char * name</code>：编解码器的名称。</li><li><code>const char * long_name</code>：编解码器的详细描述。</li><li><code>enum AVMediaType type</code>：表示编解码器的类型，可以是视频、音频或其他类型。</li><li><code>enum AVCodecID id</code>：表示编解码器的ID。</li><li><code>int capabilities</code>：表示编解码器的功能特性，例如是否支持多线程等。</li><li><code>const AVRational * supported_framerates</code>：表示编解码器支持的帧率列表。</li><li><code>enum AVPixelFormat * pix_fmts</code>：表示编解码器支持的像素格式列表。</li><li><code>const int * supported_samplerates</code>：表示编解码器支持的采样率列表。</li><li><code>enum AVSampleFormat * sample_fmts</code>：表示编解码器支持的采样格式列表。</li></ul><p>该结构体涉及以下函数：</p><p><strong>avcodec_find_decoder</strong></p>",3),de={href:"http://ffmpeg.org/doxygen/trunk/group__lavc__core.html#ga51e35d01da2b3833b3afa839212c58fa",target:"_blank",rel:"noopener noreferrer"},oe=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>AVCodec *avcodec_find_decoder(enum AVCodecID id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>id</code>：要查找的解码器的AVCodecID格式codec_id，AVCodecID 是一个枚举类型表示不同的编解码器。。</li></ul><h4 id="avcodecparameters" tabindex="-1"><a class="header-anchor" href="#avcodecparameters" aria-hidden="true">#</a> AVCodecParameters</h4>`,3),se={href:"https://ffmpeg.org/doxygen/trunk/structAVCodecParameters.html",target:"_blank",rel:"noopener noreferrer"},ce=l('<ul><li><code>enum AVMediaType codec_type</code>：音视频流类型。</li><li><code>enum AVCodecID codec_id</code>：指定解码器的ID，如AV_CODEC_ID_H264表示使用H.264解码器。</li><li><code>int64_t bit_rate</code>：指定音视频的比特率，单位为bps。</li><li><code>int width</code>和<code>int height</code>：指定视频的宽度和高度。</li><li><code>int channels</code>：表示声道数</li><li><code>int sample_rate</code>：指定音频采样率，单位为Hz。</li><li><code>uint8_t * extradata/int extradata_size</code>：指定音视频流的附加数据和附加数据的大小。</li></ul><h3 id="_2-3-数据存储" tabindex="-1"><a class="header-anchor" href="#_2-3-数据存储" aria-hidden="true">#</a> 2.3 数据存储</h3><p>AVPacket用于保存解码前的数据，AVFrame则用于保存解码后的数据。在解码器中，AVPacket中的数据会被解码成AVFrame。在编码器中，AVFrame中的数据会被编码成AVPacket。</p><h4 id="avpacket" tabindex="-1"><a class="header-anchor" href="#avpacket" aria-hidden="true">#</a> AVPacket</h4>',4),ue={href:"https://ffmpeg.org/doxygen/trunk/structAVPacket.html",target:"_blank",rel:"noopener noreferrer"},ve=l("<ul><li><code>uint8_t* data</code>：指向音视频数据帧的指针。</li><li><code>int size</code>：音视频数据帧的大小。</li><li><code>int64_t pts</code>：音视频数据帧的显示时间。</li><li><code>int64_t dts</code>：音视频数据帧的解码时间。</li><li><code>int stream_index</code>：音视频数据帧所属的流的索引。</li><li><code>int flags</code>：用于描述AVPacket的一些特性。常见选项如下： <ul><li>AV_PKT_FLAG_KEY：表示该AVPacket所包含的数据是一个关键帧。</li><li>AV_PKT_FLAG_CORRUPT：表示该AVPacket所包含的数据可能已经损坏。当解码器无法正确解码一个AVPacket时，就会设置该标志位，通知应用程序此AVPacket已经损坏。</li><li>AV_PKT_FLAG_DISCARD：表示该AVPacket所包含的数据可以被丢弃。当解码器对于某些时刻无法解码出正确的图像时，就会设置该标志位。可以选择丢弃该AVPacket，以保证视频的流畅性。</li><li>AV_PKT_FLAG_TRUSTED：表示该AVPacket所包含的数据是可信的。当解码器在解码AVPacket时，会校验AVPacket的CRC校验码，如果校验码正确，则会设置该标志位。这个标志位通常用于保证视频的完整性，以防止篡改或者损坏。</li></ul></li></ul><p>该结构体涉及以下函数：</p><p><strong>av_packet_alloc</strong></p>",3),me={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#gaaf85aa950695631e0217a16062289b66",target:"_blank",rel:"noopener noreferrer"},_e=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`AVPacket *av_packet_alloc(void);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),pe=e("p",null,[e("strong",null,"av_packet_unref")],-1),be={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#ga63d5a489b419bd5d45cfd09091cbcbc2",target:"_blank",rel:"noopener noreferrer"},fe=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`void av_packet_unref(AVPacket *pkt);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),ge=e("ul",null,[e("li",null,[e("code",null,"pkt"),n("：AVPacket结构体指针。")])],-1),he=e("p",null,[e("strong",null,"av_packet_free")],-1),xe={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#ga1066464e7cdd1f215df6940db94e5d8e",target:"_blank",rel:"noopener noreferrer"},Ae=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void av_packet_free(AVPacket **pkt);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>pkt</code>：指向AVPacket结构体指针的指针。</li></ul><h4 id="avframe" tabindex="-1"><a class="header-anchor" href="#avframe" aria-hidden="true">#</a> AVFrame</h4>`,3),Ve={href:"https://ffmpeg.org/doxygen/trunk/structAVFrame.html",target:"_blank",rel:"noopener noreferrer"},Ce=l("<ul><li><code>uint8_t * data</code>：指向一个指针数组，其中包含了这一帧的所有数据。对于视频帧，通常包含了YUV或RGB数据；对于音频帧，通常包含了PCM数据。具体的数据格式和分布，可以通过其他参数进行描述。</li><li><code>int linesize</code>：指向一个整型数组，用于描述每个数据平面的行大小（即每一行占用的字节数）。对于视频帧，通常会有三个数据平面（分别对应Y、U、V或R、G、B三个分量）；对于音频帧，通常只有一个数据平面。linesize数组的大小应该与data数组的大小相同。</li><li><code>uint8_t ** extended_data</code>：指向一个指针数组，其中包含了所有数据平面的指针。对于一些特殊的数据格式，data数组可能无法直接描述所有数据平面。这时，extended_data可以用于补充缺失的数据平面。</li><li><code>int width</code>和<code>int height</code>：分别表示这一帧的宽度和高度。对于音频帧，这两个参数均为0。</li><li><code>int format</code>：表示这一帧的数据格式。对于视频帧，常用的格式有YUV420、YUV422、YUV444、RGB24等；对于音频帧，常用的格式有PCM_S16LE、PCM_S16BE、PCM_F32LE等。</li><li><code>int64_t pts</code>：表示这一帧在整个多媒体流中的时间戳（Presentation Time Stamp）。它通常以视频帧率或音频采样率为单位，用于确定这一帧的播放时间。</li><li><code>int64_t pkt_pts</code>和<code>int64_t pkt_dts</code>：分别表示这一帧所属的AVPacket中的时间戳和解码时间戳（Decode Time Stamp）。它们与pts的含义类似，但是它们是从AVPacket中直接获取的，可能会存在一些偏差或不准确的情况。</li><li><code>int sample_rate</code>和<code>int channel_layout</code>：仅用于音频帧，分别表示采样率和声道布局。其中，channel_layout可以用于指定声道数和声道位置的具体信息。</li><li><code>enum AVPictureType pict_type</code>：表示帧的图像类型是I帧、P帧、B帧还是S帧。关键帧（I帧）是一种特殊的帧，它包含完整的图像信息，不依赖于前面或后面的帧。P帧（预测帧）和B帧（双向预测帧）则只包含部分图像信息，需要参考前面或后面的帧才能正确解码。通过使用关键帧，可以提高视频的压缩比以及解码效率。S帧是跳帧，它直接复制前一帧的图像，用于视频压缩。</li><li><code>int key_frame</code>：表示当前帧是否为关键帧。</li></ul><p>该结构体涉及以下函数：</p><p><strong>av_frame_alloc</strong></p>",3),ke={href:"https://ffmpeg.org/doxygen/trunk/group__lavu__frame.html#gac700017c5270c79c1e1befdeeb008b2f",target:"_blank",rel:"noopener noreferrer"},Fe=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`AVFrame *av_frame_alloc(void);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),qe=e("p",null,[e("strong",null,"av_read_frame")],-1),ye={href:"https://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#ga4fdb3084415a82e3810de6ee60e46a61",target:"_blank",rel:"noopener noreferrer"},Pe=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`int av_read_frame(AVFormatContext *s, AVPacket *pkt);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),Le=e("ul",null,[e("li",null,[e("code",null,"s"),n(": 指向表示媒体文件AVFormatContext结构体的指针。")]),e("li",null,[e("code",null,"pkt"),n(": 指向AVPacket结构体的指针，用于存储读取到的音视频帧的数据。")])],-1),we=e("p",null,[e("strong",null,"av_frame_free")],-1),Se={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__frame.html#ga979d73f3228814aee56aeca0636e37cc",target:"_blank",rel:"noopener noreferrer"},Ie=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void av_frame_free(AVFrame **frame);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>frame</code>：需要释放的AVFrame结构体指针的地址。</li></ul><h3 id="_2-4-功能结构" tabindex="-1"><a class="header-anchor" href="#_2-4-功能结构" aria-hidden="true">#</a> 2.4 功能结构</h3><h4 id="avrational" tabindex="-1"><a class="header-anchor" href="#avrational" aria-hidden="true">#</a> AVRational</h4>`,4),Ee={href:"https://ffmpeg.org/doxygen/trunk/structAVRational.html",target:"_blank",rel:"noopener noreferrer"},Re=e("ul",null,[e("li",null,[e("code",null,"int num"),n(": 有理数值的分子")]),e("li",null,[e("code",null,"int den"),n(": 有理数值的分母")])],-1),De=e("p",null,"该结构体涉及以下函数：",-1),Oe=e("p",null,[e("strong",null,"av_q2d")],-1),Ue={href:"https://ffmpeg.org/doxygen/trunk/group__lavu__math__rational.html#ga935dbbf6bde8dfe5fa7ddb1da582eb07",target:"_blank",rel:"noopener noreferrer"},Ge=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>double av_q2d(AVRational a);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>a</code>：需要转换的AVRational类型的数值。</li></ul><h4 id="swscontext" tabindex="-1"><a class="header-anchor" href="#swscontext" aria-hidden="true">#</a> SwsContext</h4>`,3),Ne={href:"https://ffmpeg.org/doxygen/trunk/structSwsContext.html",target:"_blank",rel:"noopener noreferrer"},Me=e("code",null,"swscale_internal.h",-1),Te=l("<ul><li><code>int srcW</code>和<code>int srcH</code>：源图像的宽度和高度。</li><li><code>int dstW</code>和<code>int dstH</code>：目标图像的宽度和高度。</li><li><code>enum AVPixelFormat srcFormat</code>和<code>enum AVPixelFormat dstFormat</code>：源图像和目标图像的像素格式。</li><li><code>int flags</code>：图像转换时的一些特殊选项，如是否进行区间缩放等。</li><li><code>double param</code>：一些额外的参数，如亮度、对比度等。</li></ul>",1),Be={href:"https://blog.csdn.net/LuohenYJ/article/details/84957101",target:"_blank",rel:"noopener noreferrer"},We=e("p",null,"该结构体涉及以下函数：",-1),Ye=e("p",null,[e("strong",null,"sws_getContext")],-1),He={href:"https://ffmpeg.org/doxygen/trunk/group__libsws.html#gaf360d1a9e0e60f906f74d7d44f9abfdd",target:"_blank",rel:"noopener noreferrer"},ze=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>struct SwsContext *sws_getContext(
    int srcW,
    int srcH,
    enum AVPixelFormat srcFormat,
    int dstW,
    int dstH,
    enum AVPixelFormat dstFormat,
    int flags,
    SwsFilter *srcFilter,
    SwsFilter *dstFilter,
    const double *param
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>srcW</code>：输入图像宽度。</li><li><code>srcH</code>：输入图像高度。</li><li><code>srcFormat</code>：输入图像像素格式。</li><li><code>dstW</code>：输出图像宽度。</li><li><code>dstH</code>：输出图像高度。</li><li><code>dstFormat</code>：输出图像像素格式。</li><li><code>flags</code>：转换标志，用于指定转换算法和参数。常用设置如下： <ul><li>SWS_FAST_BILINEAR：较快的双线性转换，适用于实时应用，但可能会有些失真。</li><li>SWS_BILINEAR：双线性转换，速度较快，但输出质量较低。</li><li>SWS_BICUBIC：双三次转换，速度较慢，但输出质量较高。</li><li>SWS_X：可自定义的转换算法，速度和质量取决于具体实现。</li><li>SWS_POINT：转换的速度非常快的最近邻插值算法，但是转换后的图像质量相对其他方法低。因为SWS_POINT将目标像素点映射到图像时，直接使用最近的像素点来进行映射，会导致转换后的图像出现锯齿状的边缘，而且图像的细节信息也会丢失。</li></ul></li><li><code>srcFilter</code>：输入图像过滤器，用于图像缩放和裁剪。</li><li><code>dstFilter</code>：输出图像过滤器，用于图像缩放和裁剪。</li><li><code>param</code>：转换参数，用于指定转换算法的参数。</li></ul><p><strong>sws_scale</strong></p>`,3),Ke={href:"http://ffmpeg.org/doxygen/trunk/group__libsws.html#gae531c9754c9205d90ad6800015046d74",target:"_blank",rel:"noopener noreferrer"},je=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int sws_scale(struct SwsContext *c, const uint8_t *const srcSlice[],
              const int srcStride[], int srcSliceY, int srcSliceH,
              uint8_t *const dst[], const int dstStride[]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>c</code>：可以通过sws_getContext函数获取。</li><li><code>srcSlice[]</code>：输入图像数据指针数组。</li><li><code>srcStride[]</code>：输入图像每行的字节数组。</li><li><code>srcSliceY</code>：输入图像的起始行。</li><li><code>srcSliceH</code>：输入图像的高度。</li><li><code>dst[]</code>：输出图像数据指针数组。</li><li><code>dstStride[]</code>：输出图像每行的字节数组。</li></ul><p><strong>sws_freeContext</strong></p>`,3),$e={href:"http://ffmpeg.org/doxygen/trunk/group__libsws.html#gad3af0ca76f071dbe0173444db9882932",target:"_blank",rel:"noopener noreferrer"},Xe=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void sws_freeContext(struct SwsContext *context);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>context</code>：要释放的SwsContext结构体指针。</li></ul><h4 id="avdictionary" tabindex="-1"><a class="header-anchor" href="#avdictionary" aria-hidden="true">#</a> AVDictionary</h4>`,3),Je={href:"http://ffmpeg.org/doxygen/trunk/structAVDictionary.html",target:"_blank",rel:"noopener noreferrer"},Qe=e("ul",null,[e("li",null,[e("code",null,"int count"),n("：AVDictionary中键值对的数量。")]),e("li",null,[e("code",null,"AVDictionaryEntry * elems"),n("：指向AVDictionaryEntry结构体数组的指针，每个元素包含一个键值对。")])],-1),Ze=e("p",null,"该结构体涉及以下函数：",-1),en=e("p",null,[e("strong",null,"av_dict_set")],-1),nn={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__dict.html#ga8d9c2de72b310cef8e6a28c9cd3acbbe",target:"_blank",rel:"noopener noreferrer"},tn=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int av_dict_set(AVDictionary **pm, const char *key, const char *value, int flags)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>pm</code>：指向字典指针的指针。</li><li><code>key</code>：要添加或修改的键名。</li><li><code>value</code>：要添加或修改的键值。</li><li><code>flags</code>：标志位，控制键名是否可以覆盖已存在的键名。</li></ul><p><strong>av_dict_free</strong></p>`,3),ln={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__dict.html#ga1bafd682b1fbb90e48a4cc3814b820f7",target:"_blank",rel:"noopener noreferrer"},an=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void av_dict_free(AVDictionary **m)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>m</code>：指向AVDictionary指针的指针。</li></ul><h4 id="其他函数" tabindex="-1"><a class="header-anchor" href="#其他函数" aria-hidden="true">#</a> 其他函数</h4><p><strong>avdevice_register_all</strong></p>`,4),rn={href:"http://ffmpeg.org/doxygen/trunk/group__lavd.html#ga7c90a3585267b55941ae2f7388c006b6",target:"_blank",rel:"noopener noreferrer"},dn=e("div",{class:"language-c++ line-numbers-mode","data-ext":"c++"},[e("pre",{class:"language-c++"},[e("code",null,`void avdevice_register_all(void);
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),on=e("p",null,[e("strong",null,"av_find_input_format")],-1),sn={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#ga40034b6d64d372e1c989e16dde4b459a",target:"_blank",rel:"noopener noreferrer"},cn=l(`<div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>AVInputFormat *av_find_input_format(const char *short_name);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>short_name</code>是待查找的输入流格式的短名称。短名称是该格式的简称，例如: <ul><li>mp4：表示MP4格式。</li><li>vfwcap：是一个视频捕获设备的输入格式，用于Windows平台。它使用VFW（Video for Windows）API来捕获视频数据。</li><li>dshow：是一个视频捕获设备的输入格式，用于Windows平台。它使用DirectShow API来捕获视频数据。</li><li>video4linux2：是一个视频捕获设备的输入格式，用于Linux平台。它使用Video4Linux2 API来捕获视频数据。</li><li>gdigrab：用于在Windows上捕获屏幕的输入格式。</li><li>x11grab：用于在Linux上捕获屏幕的输入格式。</li></ul></li></ul><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2><h3 id="_3-1-参考文章" tabindex="-1"><a class="header-anchor" href="#_3-1-参考文章" aria-hidden="true">#</a> 3.1 参考文章</h3>`,4),un={href:"https://blog.csdn.net/HW140701/article/details/84193760",target:"_blank",rel:"noopener noreferrer"},vn={href:"https://blog.csdn.net/wuhaohong123/article/details/119057769",target:"_blank",rel:"noopener noreferrer"},mn={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/0_hello_world.c",target:"_blank",rel:"noopener noreferrer"},_n={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/README-cn.md#%E7%AB%A0%E8%8A%820---%E8%87%AD%E5%90%8D%E6%98%AD%E8%91%97%E7%9A%84-hello-world",target:"_blank",rel:"noopener noreferrer"},pn={href:"https://blog.jackeylea.com/ffmpeg/ffmpeg-learning-indexes",target:"_blank",rel:"noopener noreferrer"},bn={href:"https://blog.csdn.net/leixiaohua1020/article/details/84606540",target:"_blank",rel:"noopener noreferrer"},fn={href:"https://github.com/leandromoreira/ffmpeg-libav-tutorial/blob/master/img/decoding.png",target:"_blank",rel:"noopener noreferrer"},gn={href:"https://blog.csdn.net/LuohenYJ/article/details/84957101",target:"_blank",rel:"noopener noreferrer"},hn=e("h3",{id:"_3-2-ffmpeg结构体",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-2-ffmpeg结构体","aria-hidden":"true"},"#"),n(" 3.2 ffmpeg结构体")],-1),xn={href:"http://ffmpeg.org/doxygen/trunk/structAVFormatContext.html",target:"_blank",rel:"noopener noreferrer"},An={href:"http://ffmpeg.org/doxygen/trunk/structAVInputFormat.html",target:"_blank",rel:"noopener noreferrer"},Vn={href:"https://ffmpeg.org/doxygen/trunk/structAVStream.html",target:"_blank",rel:"noopener noreferrer"},Cn={href:"https://ffmpeg.org/doxygen/trunk/structAVCodecContext.html",target:"_blank",rel:"noopener noreferrer"},kn={href:"http://ffmpeg.org/doxygen/trunk/structAVCodec.html",target:"_blank",rel:"noopener noreferrer"},Fn={href:"https://ffmpeg.org/doxygen/trunk/structAVCodecParameters.html",target:"_blank",rel:"noopener noreferrer"},qn={href:"https://ffmpeg.org/doxygen/trunk/structAVPacket.html",target:"_blank",rel:"noopener noreferrer"},yn={href:"https://ffmpeg.org/doxygen/trunk/structAVFrame.html",target:"_blank",rel:"noopener noreferrer"},Pn={href:"https://ffmpeg.org/doxygen/trunk/structAVRational.html",target:"_blank",rel:"noopener noreferrer"},Ln={href:"https://ffmpeg.org/doxygen/trunk/structSwsContext.html",target:"_blank",rel:"noopener noreferrer"},wn={href:"http://ffmpeg.org/doxygen/trunk/structAVDictionary.html",target:"_blank",rel:"noopener noreferrer"},Sn=e("h3",{id:"_3-3-ffmpeg函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-3-ffmpeg函数","aria-hidden":"true"},"#"),n(" 3.3 ffmpeg函数")],-1),In={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__core.html#gac7a91abf2f59648d995894711f070f62",target:"_blank",rel:"noopener noreferrer"},En={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gac05d61a2b492ae3985c658f34622c19d",target:"_blank",rel:"noopener noreferrer"},Rn={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gad42172e27cddafb81096939783b157bb",target:"_blank",rel:"noopener noreferrer"},Dn={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#gae804b99aec044690162b8b9b110236a4",target:"_blank",rel:"noopener noreferrer"},On={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__core.html#gac2990b13b68e831a408fce8e1d0d6445",target:"_blank",rel:"noopener noreferrer"},Un={href:"http://ffmpeg.org/doxygen/trunk/group__lavc__core.html#ga51e35d01da2b3833b3afa839212c58fa",target:"_blank",rel:"noopener noreferrer"},Gn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#gac7b282f51540ca7a99416a3ba6ee0d16",target:"_blank",rel:"noopener noreferrer"},Nn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#ga11f785a188d7d9df71621001465b0f1d",target:"_blank",rel:"noopener noreferrer"},Mn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__decoding.html#ga58bc4bf1e0ac59e27362597e467efff3",target:"_blank",rel:"noopener noreferrer"},Tn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__decoding.html#ga11e6542c4e66d3028668788a1a74217c",target:"_blank",rel:"noopener noreferrer"},Bn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__core.html#gaf869d0829ed607cec3a4a02a1c7026b3",target:"_blank",rel:"noopener noreferrer"},Wn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#gaaf85aa950695631e0217a16062289b66",target:"_blank",rel:"noopener noreferrer"},Yn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#ga63d5a489b419bd5d45cfd09091cbcbc2",target:"_blank",rel:"noopener noreferrer"},Hn={href:"https://ffmpeg.org/doxygen/trunk/group__lavc__packet.html#ga1066464e7cdd1f215df6940db94e5d8e",target:"_blank",rel:"noopener noreferrer"},zn={href:"https://ffmpeg.org/doxygen/trunk/group__lavu__frame.html#gac700017c5270c79c1e1befdeeb008b2f",target:"_blank",rel:"noopener noreferrer"},Kn={href:"https://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#ga4fdb3084415a82e3810de6ee60e46a61",target:"_blank",rel:"noopener noreferrer"},jn={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__frame.html#ga979d73f3228814aee56aeca0636e37cc",target:"_blank",rel:"noopener noreferrer"},$n={href:"https://ffmpeg.org/doxygen/trunk/group__lavu__math__rational.html#ga935dbbf6bde8dfe5fa7ddb1da582eb07",target:"_blank",rel:"noopener noreferrer"},Xn={href:"https://ffmpeg.org/doxygen/trunk/group__libsws.html#gaf360d1a9e0e60f906f74d7d44f9abfdd",target:"_blank",rel:"noopener noreferrer"},Jn={href:"http://ffmpeg.org/doxygen/trunk/group__libsws.html#gae531c9754c9205d90ad6800015046d74",target:"_blank",rel:"noopener noreferrer"},Qn={href:"http://ffmpeg.org/doxygen/trunk/group__libsws.html#gad3af0ca76f071dbe0173444db9882932",target:"_blank",rel:"noopener noreferrer"},Zn={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__dict.html#ga8d9c2de72b310cef8e6a28c9cd3acbbe",target:"_blank",rel:"noopener noreferrer"},et={href:"http://ffmpeg.org/doxygen/trunk/group__lavu__dict.html#ga1bafd682b1fbb90e48a4cc3814b820f7",target:"_blank",rel:"noopener noreferrer"},nt={href:"http://ffmpeg.org/doxygen/trunk/group__lavd.html#ga7c90a3585267b55941ae2f7388c006b6",target:"_blank",rel:"noopener noreferrer"},tt={href:"http://ffmpeg.org/doxygen/trunk/group__lavf__decoding.html#ga40034b6d64d372e1c989e16dde4b459a",target:"_blank",rel:"noopener noreferrer"};function it(lt,at){const t=r("ExternalLinkIcon");return d(),o("div",null,[c,e("p",null,[n("在开始之前，需要先安装FFmpeg。对于Windows用户，可以参考"),e("a",u,[n("FFmpeg + Visual studio 开发环境搭建"),i(t)]),n("；对于Linux用户，可以参考"),e("a",v,[n("FFmpeg4.4编译"),i(t)]),n("。")]),e("p",null,[n("本文主要参考了"),e("a",m,[n("ffmpeg-libav-tutorial/0_hello_world.c"),i(t)]),n("提供的代码。值得注意的是，由于FFmpeg版本变化较大，本文所使用的FFmpeg接口和以往有所不同。如果想进一步学习FFmpeg代码的使用，可以阅读"),e("a",_,[n("FFmpeg-libav-tutorial"),i(t)]),n("、"),e("a",p,[n("ffmpeg-learning-indexes"),i(t)]),n("和"),e("a",b,[n("视音频编解码技术零基础学习方法"),i(t)]),n("(由于作者雷霄骅不幸英年早逝，哀悼！该文主要基于旧ffmpeg版本，但是仍然有很好的学习价值)。")]),f,e("p",null,[n("以上代码参考下图阅读最好。图片来自"),e("a",g,[n("ffmpeg-libav-tutorial/decoding.png"),i(t)]),n("。")]),h,e("p",null,[e("a",x,[n("AVFormatContext"),i(t)]),n("是一个存储流媒体相关信息的上下文结构体(统领相关操作全局的结构体)。几乎所有的音视频操作都需要先创建一个AVFormatContext对象。AVFormatContext使用完毕需要手动释放内存。AVFormatContext的主要属性及使用说明：")]),A,e("p",null,[e("a",V,[n("avformat_alloc_context"),i(t)]),n("用于分配AVFormatContext结构体并初始化。该函数返回一个指向AVFormatContext结构体的指针，如果分配失败则返回NULL。")]),C,k,e("p",null,[e("a",F,[n("avformat_open_input"),i(t)]),n("用于打开输入的媒体文件，将音视频文件的元数据信息读取到AVFormatContext结构体中。函数返回0表示成功打开文件。")]),q,e("p",null,[e("a",y,[n("avformat_find_stream_info"),i(t)]),n("用于获取输入文件的流信息。它会读取输入文件的所有数据包，并尝试从中获取流的参数，如流的编解码器、帧率、分辨率等等。在调用avformat_find_stream_info之后，可以通过 AVFormatContext结构体中的streams字段访问到每个流的详细信息。函数返回值大于等于0表示成功。")]),P,e("p",null,[e("a",L,[n("avformat_close_input"),i(t)]),n("用于关闭AVFormatContext文件并释放相关资源。一般情况下avformat_close_input和avformat_open_input成对使用，该函数也在内部会调用avformat_free_context函数释放AVFormatContext结构体。")]),w,S,I,e("p",null,[e("a",E,[n("avformat_free_context"),i(t)]),n("用于释放AVFormatContext结构体。")]),R,e("p",null,[e("a",D,[n("AVInputFormat"),i(t)]),n("用于表示输入的媒体文件的格式。主要作用为通过解析输入的媒体文件，并将其转换成FFmpeg内部所使用的数据结构。AVInputFormat结构体的内存由FFmpeg库自动分配和释放，在调用avformat_close_input函数后，FFmpeg库将自动释放AVInputFormat结构体。AVInputFormat的主要属性及使用说明：")]),O,e("p",null,[e("a",U,[n("AVStream"),i(t)]),n("是FFmpeg中表示音视频流的结构体，每个AVStream结构体都对应一个视频或音频流的相关数据。AVStream结构体的内存由FFmpeg库自动分配和释放。AVStream的主要属性及使用说明：")]),G,e("p",null,[e("a",N,[n("AVCodecContext"),i(t)]),n("包含解码音视频所有信息的上下文结构体。在进行音视频编解码时，通过对AVCodecContext的相关参数进行设置，来控制编解码器的行为。AVCodecContext使用完毕需要手动释放内存。AVCodecContext的一些常用参数包括：")]),M,e("p",null,[e("a",T,[n("avcodec_alloc_context3"),i(t)]),n("函数用于分配AVCodecContext结构体并进行初始化。该函数返回一个指向AVCodecContext结构体的指针，如果分配失败则返回NULL。")]),B,W,Y,e("p",null,[e("a",H,[n("avcodec_parameters_to_context"),i(t)]),n("函数的作用是将AVCodecParameters中的参数设置到AVCodecContext中。返回值小于0表示设置失败。")]),z,K,j,e("p",null,[e("a",$,[n("avcodec_open2"),i(t)]),n("用于打开AVCodec并初始化AVCodecContext。返回0表示成功，否则表示失败。")]),X,e("p",null,[e("a",J,[n("avcodec_send_packet"),i(t)]),n("函数用于将一个未解码的AVPacket数据送入解码器AVCodecContext进行解码。该函数执行成功后，解码器AVCodecContext内部的缓存将会被填充上相应的数据，可以通过调用avcodec_receive_frame函数来获取解码结果。返回值为0表示成功，否则表示失败。")]),Q,Z,ee,e("p",null,[e("a",ne,[n("avcodec_receive_frame"),i(t)]),n("用于从解码器中获取解码后的视频帧。avcodec_receive_frame一般会外嵌while循环，可以保证在没有接收到可用帧之前不会退出循环，从而避免数据包丢失或者解码错误的情况发生。")]),te,e("p",null,[e("a",ie,[n("avcodec_free_context"),i(t)]),n("函数用于释放AVCodecContext结构体所占用的内存。")]),le,e("p",null,[e("a",ae,[n("AVCodec"),i(t)]),n("用于表示视频或音频的编解码器。AVCodec数据结构的内存由FFmpeg库自动分配和释放。AVCodec的主要属性及使用说明：")]),re,e("p",null,[e("a",de,[n("avcodec_find_decoder"),i(t)]),n("用于通过codec_id查找指定已经注册的解码器。 如果找到了指定的解码器，返回指向该解码器的AVCodec指针。如果未找到指定的解码器，返回 NULL。")]),oe,e("p",null,[e("a",se,[n("AVCodecParameters"),i(t)]),n("主要用于存储音视频编解码器的相关参数信息。AVCodecParameters数据结构的内存由FFmpeg库自动分配和释放。AVCodecParameters常用属性介绍：")]),ce,e("p",null,[e("a",ue,[n("AVPacket"),i(t)]),n("是用于存储压缩音频或视频数据的结构体。它包含了一段压缩后的数据和对应的时间戳信息，以及一些其他的附加信息，如数据流索引、关键帧标识等。在解码过程中，AVPacket会被送到解码器中进行解码，得到AVFrame。AVPacket使用完毕需要手动释放内存。AVPacket的主要属性如下：")]),ve,e("p",null,[e("a",me,[n("av_packet_alloc"),i(t)]),n("用于创建AVPacket结构体并为其分配内存空间。函数返回一个指向新分配的AVPacket结构体的指针。如果分配失败，则返回NULL。")]),_e,pe,e("p",null,[e("a",be,[n("av_packet_unref"),i(t)]),n("函数用于清除AVPacket结构体中的数据，但是并不会释放这个结构体本身，以便可以重新使用或销毁AVPacket结构体。")]),fe,ge,he,e("p",null,[e("a",xe,[n("av_packet_free"),i(t)]),n("用于释放AVPacket结构体所占用内存。")]),Ae,e("p",null,[e("a",Ve,[n("AVFrame"),i(t)]),n("是用于存储解码后的数据的结构体。它包含了一帧图像或音频解码后的数据，以及一些相关的信息，如宽度、高度、像素格式等。在解码过程中，AVFrame是解码器输出的数据，它可以被送到渲染器中进行渲染，也可以被编码器编码成新的AVPacket。AVFrame使用完毕需要手动释放内存。AVFrame结构体中常用的属性介绍和说明：")]),Ce,e("p",null,[e("a",ke,[n("av_frame_alloc"),i(t)]),n("用于创建AVFrame结构体并为其分配内存空间。函数返回一个指向新分配的AVFrame结构体的指针。如果分配失败，则返回NULL。")]),Fe,qe,e("p",null,[e("a",ye,[n("av_read_frame"),i(t)]),n("用于从AVFormatContext中读取媒体文件中的音频或视频帧，并将数据存储到AVPacket中。返回值为0表示读取成功，为负数表示读取失败。")]),Pe,Le,we,e("p",null,[e("a",Se,[n("av_frame_free"),i(t)]),n("函数用于释放AVFrame结构体占用的内存空间。")]),Ie,e("p",null,[e("a",Ee,[n("AVRational"),i(t)]),n("结构体是FFmpeg中表示有理数的结构体，用于表示时间戳、帧率、采样率等一些基本的时间和频率相关的属性。AVRational结构体包含两个整型成员，num和den，分别表示分子和分母。用AVRational结构体表示的有理数值为num/den。AVRational结构体中的成员变量由FFmpeg内部自动分配和释放。AVRational属性如下：")]),Re,De,Oe,e("p",null,[e("a",Ue,[n("av_q2d"),i(t)]),n("是一个用于将AVRational转换为double类型的函数，也就是将AVRational中的分子和分母相除。")]),Ge,e("p",null,[e("a",Ne,[n("SwsContext"),i(t)]),n("是FFmpeg中用于图像转换的数据结构，它包含了图像转换所需的所有参数。要注意的是该结构体的原始定义在"),Me,n("文件中，普通编译的ffmpeg工程没有该文件。所以该结构体一般仅仅是使用。SwsContext使用完毕需要手动释放内存。SwsContext的主要参数如下：")]),Te,e("p",null,[n("在使用FFmpeg解码时，默认解码后图像的颜色格式为YUV420p，关于YUV420p介绍见"),e("a",Be,[n("YUV图像处理入门1"),i(t)]),n("。")]),We,Ye,e("p",null,[e("a",He,[n("sws_getContext"),i(t)]),n("的作用是创建一个用于图像转换的SwsContext结构体。如果创建成功，返回一个指向SwsContext结构体的指针，否则返回NULL。函数原型如下：")]),ze,e("p",null,[e("a",Ke,[n("sws_scale"),i(t)]),n("用于执行多种不同的像素格式转换。sws_scale函数的返回值为输出图像的高度，返回值小于等于0表示转换失败。")]),je,e("p",null,[e("a",$e,[n("sws_freeContext"),i(t)]),n("的作用是释放SwsContext结构体占用的内存空间，避免内存泄露。")]),Xe,e("p",null,[e("a",Je,[n("AVDictionary"),i(t)]),n("是FFmpeg中的一个字典结构体，用于存储键值对数据。AVDictionary使用后一般不需要手动释放内存，但是建议手动释放内存。以下是AVDictionary属性的说明：")]),Qe,Ze,en,e("p",null,[e("a",nn,[n("av_dict_set"),i(t)]),n("用于向字典中添加或修改键值对。该函数的返回值为0表示成功，否则表示失败。av_dict_set可以设置的有效键值对需要参阅。")]),tn,e("p",null,[e("a",ln,[n("av_dict_free"),i(t)]),n("用于释放字典（dictionary）结构体占用的内存空间。")]),an,e("p",null,[e("a",rn,[n("avdevice_register_all"),i(t)]),n("用于注册所有可用的音视频输入/输出设备，以方便进行数据采集。")]),dn,on,e("p",null,[e("a",sn,[n("av_find_input_format"),i(t)]),n("用于查找输入视频流格式。该函数返回值是一个指向AVInputFormat结构体的指针。")]),cn,e("ul",null,[e("li",null,[e("a",un,[n("FFmpeg + Visual studio 开发环境搭建"),i(t)])]),e("li",null,[e("a",vn,[n("ffmpeg4.4编译"),i(t)])]),e("li",null,[e("a",mn,[n("ffmpeg-libav-tutorial/0_hello_world.c"),i(t)])]),e("li",null,[e("a",_n,[n("ffmpeg-libav-tutorial"),i(t)])]),e("li",null,[e("a",pn,[n("ffmpeg-learning-indexes"),i(t)])]),e("li",null,[e("a",bn,[n("视音频编解码技术零基础学习方法"),i(t)])]),e("li",null,[e("a",fn,[n("ffmpeg-libav-tutorial/decoding.png"),i(t)])]),e("li",null,[e("a",gn,[n("YUV图像处理入门1"),i(t)])])]),hn,e("ul",null,[e("li",null,[e("a",xn,[n("AVFormatContext"),i(t)])]),e("li",null,[e("a",An,[n("AVInputFormat"),i(t)])]),e("li",null,[e("a",Vn,[n("AVStream"),i(t)])]),e("li",null,[e("a",Cn,[n("AVCodecContext"),i(t)])]),e("li",null,[e("a",kn,[n("AVCodec"),i(t)])]),e("li",null,[e("a",Fn,[n("AVCodecParameters"),i(t)])]),e("li",null,[e("a",qn,[n("AVPacket"),i(t)])]),e("li",null,[e("a",yn,[n("AVFrame"),i(t)])]),e("li",null,[e("a",Pn,[n("AVRational"),i(t)])]),e("li",null,[e("a",Ln,[n("SwsContext"),i(t)])]),e("li",null,[e("a",wn,[n("AVDictionary"),i(t)])])]),Sn,e("ul",null,[e("li",null,[e("a",In,[n("avformat_alloc_context"),i(t)])]),e("li",null,[e("a",En,[n("avformat_open_input"),i(t)])]),e("li",null,[e("a",Rn,[n("avformat_find_stream_info"),i(t)])]),e("li",null,[e("a",Dn,[n("avformat_close_input"),i(t)])]),e("li",null,[e("a",On,[n("avformat_free_context"),i(t)])]),e("li",null,[e("a",Un,[n("avcodec_find_decoder"),i(t)])]),e("li",null,[e("a",Gn,[n("avcodec_parameters_to_context"),i(t)])]),e("li",null,[e("a",Nn,[n("avcodec_open2"),i(t)])]),e("li",null,[e("a",Mn,[n("avcodec_send_packet"),i(t)])]),e("li",null,[e("a",Tn,[n("avcodec_receive_frame"),i(t)])]),e("li",null,[e("a",Bn,[n("avcodec_free_context"),i(t)])]),e("li",null,[e("a",Wn,[n("av_packet_alloc"),i(t)])]),e("li",null,[e("a",Yn,[n("av_packet_unref"),i(t)])]),e("li",null,[e("a",Hn,[n("av_packet_free"),i(t)])]),e("li",null,[e("a",zn,[n("av_frame_alloc"),i(t)])]),e("li",null,[e("a",Kn,[n("av_read_frame"),i(t)])]),e("li",null,[e("a",jn,[n("av_frame_free"),i(t)])]),e("li",null,[e("a",$n,[n("av_q2d"),i(t)])]),e("li",null,[e("a",Xn,[n("sws_getContext"),i(t)])]),e("li",null,[e("a",Jn,[n("sws_scale"),i(t)])]),e("li",null,[e("a",Qn,[n("sws_freeContext"),i(t)])]),e("li",null,[e("a",Zn,[n("av_dict_set"),i(t)])]),e("li",null,[e("a",et,[n("av_dict_free"),i(t)])]),e("li",null,[e("a",nt,[n("avdevice_register_all"),i(t)])]),e("li",null,[e("a",tt,[n("av_find_input_format"),i(t)])])])])}const ot=a(s,[["render",it],["__file","2023-05-31-_音视频处理_ FFmpeg使用指北1-视频解码.html.vue"]]);export{ot as default};
