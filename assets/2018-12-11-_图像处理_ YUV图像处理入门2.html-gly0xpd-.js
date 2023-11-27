import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as u,c as o,a as t,b as p,d as a,e as n}from"./app-MsA2k2kn.js";const l={},c=n(`<h1 id="图像处理-yuv图像处理入门2" tabindex="-1"><a class="header-anchor" href="#图像处理-yuv图像处理入门2" aria-hidden="true">#</a> [图像处理] YUV图像处理入门2</h1><h2 id="_1-分离yuv420中yuv分量" tabindex="-1"><a class="header-anchor" href="#_1-分离yuv420中yuv分量" aria-hidden="true">#</a> <strong>1 分离YUV420中YUV分量</strong></h2><p>本程序中的函数主要是将YUV420P视频数据流的第一帧图像中的Y、U、V三个分量分离开并保存成三个文件。函数的代码如下所示：</p><pre><code>/**
 * @file	1 yuv_split.cpp
 * @author	luohen
 * @brief	split of yuv
 * @date	2018-12-07
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param url	location of input yuv420p file
 * @param w		width of input yuv420p file
 * @param h 	height of input yuv420p file
 * @return	int
 */
int yuv420_split(const char *url, int w, int h)
{
	//reading yuv image
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

	//writing yuv image
	FILE *outputY_fp = fopen(&quot;video_result/output_420_y.y&quot;, &quot;wb+&quot;);
	FILE *outputU_fp = fopen(&quot;video_result/output_420_u.y&quot;, &quot;wb+&quot;);
	FILE *outputV_fp = fopen(&quot;video_result/output_420_v.y&quot;, &quot;wb+&quot;);

	unsigned char *pic = new unsigned char[w * h * 3 / 2];

	//读数据，每次读取的字节数为sizeof(unsigned char)=1，共读取w*h*3/2次
	//reading data
	fread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);
	//writing data
	//Y
	fwrite(pic, sizeof(unsigned char), w * h, outputY_fp);
	//U
	fwrite(pic + w * h, sizeof(unsigned char), w * h / 4, outputU_fp);
	//V
	fwrite(pic + w * h * 5 / 4, sizeof(unsigned char), w * h / 4, outputV_fp);

	//memory release and files closing
	delete[] pic;
	fclose(input_fp);
	fclose(outputY_fp);
	fclose(outputU_fp);
	fclose(outputV_fp);

	return 0;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	//Setting YUV information
	int state = yuv420_split(&quot;video/akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_split(const char *url, int w, int h);
</code></pre><p>从代码可以看出，程序先是读入一段视频数据流。通过fread函数读取w<em>h</em>3/2个unsigned char长度的数据实现第一帧图像的读取，unsigned char占一个字节（通过sizeof(unsigned char）可以查看到)，也就是说fread函数读取w<em>h</em>3/2字节的数据就可以实现一帧图像的读取。</p><p>其中这段代码的fread函数是指每次读取1个字节的数据，一共读取w<em>h(y的长度)+(w/2</em>h/2)(u的长度)+ (w/2<em>h/2)(v的长度)=w</em>h*3/2次。</p><pre><code>fread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);
</code></pre><p>写成下列形式也是一样的。</p><pre><code>fread(pic, w * h * 3 / 2*sizeof(unsigned char), 1, input_fp);
</code></pre><p>fwrite函数也是一样的用法。先存Y，再存UV。对于Y，U，Y分离后存储的格式可以是yuv格式也可以是单独的y格式。分离后的Y分量（352，288），U分量（176，144），V分量（176，144）。结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437587.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437547.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437546.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_2-yuv420灰度化" tabindex="-1"><a class="header-anchor" href="#_2-yuv420灰度化" aria-hidden="true">#</a> 2 YUV420灰度化</h2><p>本程序中的函数主要是将YUV420P视频数据流的第一帧图像变为灰度图像。函数的代码如下所示：</p><pre><code>/**
 * @file 2 yuv_gray.cpp
 * @author luohen
 * @brief gray scale of yuv
 * @date 2018-12-07
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param url	location of input yuv420p file
 * @param w		width of input yuv420p file
 * @param h 	height of input yuv420p file
 * @return	int
 */
int yuv420_gray(const char *url, int w, int h)
{
	//reading yuv image
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
	//writing yuv image
	FILE *outputGray_fp = fopen(&quot;video_result/output_gray.yuv&quot;, &quot;wb+&quot;);

	unsigned char *pic = new unsigned char[w * h * 3 / 2];

	fread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);
	//Gray
	//把pic+w*h开始所有的数据置为128，色度分量取值范围是-128至127，量化后范围为0至255
	//uv=128，实现灰度化
	memset(pic + w * h, 128, w * h / 2);
	fwrite(pic, sizeof(unsigned char), w * h * 3 / 2, outputGray_fp);

	delete[] pic;
	fclose(input_fp);
	fclose(outputGray_fp);
	return 0;
}

/**
 * @brief main函数
 *
 * @return int
 */
int main()
{
	int state = yuv420_gray(&quot;video/akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_gray(const char *url, int w, int h);
</code></pre><p>这段函数主要是将U、V分量置为128，从而得到灰度图像。将U、V置为128而不是0，主要原因是U、V本来的取值范围大概是-127到128（可能更大），因为YUV的数据流是无符号的，所以将其量化为0到255。UV的最初取值范围可以通过RGB与YUV的转换公式理解。具体见文章：</p>`,22),d={href:"https://www.cnblogs.com/armlinux/archive/2012/02/15/2396763.html",target:"_blank",rel:"noopener noreferrer"},h=n(`<p>最终得到的YUV灰度图像，UV分量都存在只是为128而已。事实上只提取出Y分量效果也是一样的。结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437627.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_3-yuv420亮度减半" tabindex="-1"><a class="header-anchor" href="#_3-yuv420亮度减半" aria-hidden="true">#</a> 3 YUV420亮度减半</h2><p>本程序中的函数主要是将YUV420P视频数据流的第一帧图像亮度减半。函数的代码如下所示：</p><pre><code>/**
 * @file 3 yuv_halfy.cpp
 * @author luohen
 * @brief Half of Y value
 * @date 2018-12-07
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param url	location of input yuv420p file
 * @param w		width of input yuv420p file
 * @param h 	height of input yuv420p file
 * @return	int
 */
int yuv420_half(const char *url, int w, int h)
{
	//reading yuv image
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

	//writing yuv image
	FILE *output_fp = fopen(&quot;video_result/output_half.yuv&quot;, &quot;wb+&quot;);

	unsigned char *pic = new unsigned char[w * h * 3 / 2];

	fread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);
	//half of Y
	for (int j = 0; j &lt; w * h; j++)
	{
		unsigned char temp = pic[j] / 2;
		//printf(&quot;%d,\\n&quot;,temp);
		pic[j] = temp;
	}
	fwrite(pic, 1, w * h * 3 / 2, output_fp);

	delete[] pic;
	fclose(input_fp);
	fclose(output_fp);
	return 0;
}

/**
 * @brief main函数
 *
 * @return int
 */
int main()
{
	int state = yuv420_half(&quot;video/akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_half(const char *url, int w, int h);
</code></pre><p>这段函数主要是将Y分量减半，从而得到灰度图像。而其他UV分量不需要调整。实际上YUV图像处理套路就是将YUV三个分量分别看成三张灰度图像，分别进行图像处理。除了YUV分量大小不一，其他与RGB像素处理一样。结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437622.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_4-yuv420添加边框" tabindex="-1"><a class="header-anchor" href="#_4-yuv420添加边框" aria-hidden="true">#</a> 4 YUV420添加边框</h2><p>本程序中的函数主要是为YUV420P视频数据流的第一帧图像添加边框。函数的代码如下所示：</p><pre><code>/**
 * @file 4 yuv_border.cpp
 * @author luohen
 * @brief  add a border to yuv
 * @date 2018-12-07
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param url	location of input yuv420p file
 * @param w		width of input yuv420p file
 * @param h 	height of input yuv420p file
 * @return	int
 */
int yuv420_border(const char *url, int w, int h)
{
	//reading yuv image
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

	//writing yuv image
	FILE *output_fp = fopen(&quot;video_result/output_border.yuv&quot;, &quot;wb+&quot;);

	//border width
	int border = 30;
	unsigned char *pic = new unsigned char[w * h * 3 / 2];

	//reading y
	fread(pic, 1, w * h * 3 / 2, input_fp);
	//y
	for (int j = 0; j &lt; h; j++)
	{
		for (int k = 0; k &lt; w; k++)
		{
			if (k &lt; border || k &gt;(w - border) || j &lt; border || j &gt;(h - border))
			{
				//0最暗，255最亮
				pic[j * w + k] = 0;
				//pic[j*w+k]=255;
			}
		}
	}

	fwrite(pic, 1, w * h * 3 / 2, output_fp);
	delete[] pic;
	fclose(input_fp);
	fclose(output_fp);
	return 0;
}

/**
 * @brief main函数
 *
 * @return int
 */
int main()
{
	int state = yuv420_border(&quot;video/akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_border(const char *url, int w, int h);
</code></pre><p>这段函数主要是调整图像边缘的Y分量数值，从而为图像添加边框。其中Y的初始值就是0-255，和灰度图一样，y为0时图像最暗，为255图像最暗。但是这段程序并没有实现严格意义上的添加图像边框，应该使得uv分量相同位置处的值为128（因为copy雷神代码。就懒得自己写了）。</p><p>结果如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437638.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但是想了下，还是不能全copy雷神的代码。uv分量相同位置处的值为128，代码如下：</p><pre><code>/**
 * @file 4 yuv_border.cpp
 * @author luohen
 * @brief  add a border to yuv
 * @date 2018-12-07
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param url	location of input yuv420p file
 * @param w		width of input yuv420p file
 * @param h 	height of input yuv420p file
 * @return	int
 */
int yuv420_border(const char *url, int w, int h)
{
	//reading yuv image
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

	//writing yuv image
	FILE *output_fp = fopen(&quot;video_result/output_border.yuv&quot;, &quot;wb+&quot;);

	//border width
	int border = 30;
	unsigned char *pic = new unsigned char[w * h * 3 / 2];

	//reading y
	fread(pic, 1, w * h * 3 / 2, input_fp);
	//y
	for (int j = 0; j &lt; h; j++)
	{
		for (int k = 0; k &lt; w; k++)
		{
			if (k &lt; border || k &gt;(w - border) || j &lt; border || j &gt;(h - border))
			{
				//0最暗，255最亮
				pic[j * w + k] = 0;
				//pic[j*w+k]=255;
			}
		}
	}
	//u
	for (int j = 0; j &lt; h / 2; j++)
	{
		for (int k = 0; k &lt; w / 2; k++)
		{
			if (k &lt; border / 2 || k &gt;(w / 2 - border / 2) || j &lt; border / 2 || j &gt;(h / 2 - border / 2))
			{
				pic[w*h + j * w / 2 + k] = 128;
				//pic[j*w+k]=255;
			}
		}
	}
	//v
	for (int j = 0; j &lt; h / 2; j++)
	{
		for (int k = 0; k &lt; w / 2; k++)
		{
			if (k &lt; border / 2 || k &gt;(w / 2 - border / 2) || j &lt; border / 2 || j &gt;(h / 2 - border / 2))
			{
				pic[w*h + w / 2 * h / 2 + j * w / 2 + k] = 128;
				//pic[j*w+k]=255;
			}
		}
	}

	fwrite(pic, 1, w * h * 3 / 2, output_fp);
	delete[] pic;
	fclose(input_fp);
	fclose(output_fp);
	return 0;
}

/**
 * @brief main函数
 *
 * @return int
 */
int main()
{
	int state = yuv420_border(&quot;video/akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>其中对uv处理时border要除以2，因u、v只有y的四分之一大小。</p><p>对u,v赋值代码如下，因为yuv420是以数据流依次存储。所以u处理时数据u从pic[w<em>h]开始，而处理v从pic[w</em>h+w/2*h/2]开始。</p><pre><code>pic[w*h + j * w / 2 + k] = 128;

pic[w*h + w / 2 * h / 2 + j * w / 2 + k] = 128;
</code></pre><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门2/20181211163437646.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,26);function f(s,_){const e=r("ExternalLinkIcon");return u(),o("div",null,[c,t("p",null,[t("a",d,[p(" https://www.cnblogs.com/armlinux/archive/2012/02/15/2396763.html"),a(e)])]),h])}const w=i(l,[["render",f],["__file","2018-12-11-_图像处理_ YUV图像处理入门2.html.vue"]]);export{w as default};
