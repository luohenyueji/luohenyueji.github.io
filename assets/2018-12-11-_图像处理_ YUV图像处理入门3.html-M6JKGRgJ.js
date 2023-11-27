import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as a,c as h,a as t,b as i,d as e,e as u}from"./app-MsA2k2kn.js";const p={},d=u(`<h1 id="图像处理-yuv图像处理入门3" tabindex="-1"><a class="header-anchor" href="#图像处理-yuv图像处理入门3" aria-hidden="true">#</a> [图像处理] YUV图像处理入门3</h1><h2 id="_5-yuv420格式的灰阶测试图" tabindex="-1"><a class="header-anchor" href="#_5-yuv420格式的灰阶测试图" aria-hidden="true">#</a> 5 yuv420格式的灰阶测试图</h2><p>本程序中的函数主要是为YUV420P视频数据流的第一帧图像添加边框。函数的代码如下所示： /** * @file 5 yuv_graybar.cpp * @author luohen * @brief gray scale bar of yuv * @date 2018-12-07 * */</p><pre><code>#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;iostream&gt;

using namespace std;

/**
 * @brief
 *
 * @param width		width of input yuv420p file
 * @param height	height of input yuv420p file
 * @param ymin		minimum value of y
 * @param ymax		maximum value of y
 * @param barnum 	Number of bars
 * @param url		location of input yuv420p file
 * @return int
 */
int yuv420_graybar(int width, int height, int ymin, int ymax, int barnum, const char *url)
{
	//每个灰度条的宽度
	int barwidth;
	//每个灰度阶次范围
	float lum_inc;
	//计算Y值
	unsigned char lum_temp;
	//uv分量宽高
	int uv_width, uv_height;
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
	FILE *output_fp = fopen(&quot;video_result/gray_test.yuv&quot;, &quot;wb+&quot;);

	int t = 0, i = 0, j = 0;

	//每个灰度条的宽度
	barwidth = width / barnum;
	//每个灰度阶次范围
	lum_inc = ((float)(ymax - ymin)) / ((float)(barnum - 1));
	//uv分量宽高
	uv_width = width / 2;
	uv_height = height / 2;

	unsigned char *data_y = new unsigned char[width * height];
	unsigned char *data_u = new unsigned char[uv_width * uv_height];
	unsigned char *data_v = new unsigned char[uv_width * uv_height];

	//Output Info
	//输出信息
	printf(&quot;Y, U, V value from picture&#39;s left to right:\\n&quot;);
	for (t = 0; t &lt; (width / barwidth); t++)
	{
		//计算Y值
		lum_temp = ymin + (char)(t * lum_inc);
		printf(&quot;%3d, 128, 128\\n&quot;, lum_temp);
	}
	//保存数据
	for (j = 0; j &lt; height; j++)
	{
		for (i = 0; i &lt; width; i++)
		{
			t = i / barwidth;
			lum_temp = ymin + (char)(t * lum_inc);
			data_y[j * width + i] = lum_temp;
		}
	}
	for (j = 0; j &lt; uv_height; j++)
	{
		for (i = 0; i &lt; uv_width; i++)
		{
			data_u[j * uv_width + i] = 128;
		}
	}
	for (j = 0; j &lt; uv_height; j++)
	{
		for (i = 0; i &lt; uv_width; i++)
		{
			data_v[j * uv_width + i] = 128;
		}
	}

	fwrite(data_y, width * height, sizeof(unsigned char), output_fp);
	fwrite(data_u, uv_width * uv_height, sizeof(unsigned char), output_fp);
	fwrite(data_v, uv_width * uv_height, sizeof(unsigned char), output_fp);
	fclose(input_fp);
	fclose(output_fp);

	delete[] data_y;
	delete[] data_u;
	delete[] data_v;
	return 0;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	int state = yuv420_graybar(640, 360, 0, 255, 10, &quot;video/graybar.yuv&quot;);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_graybar(int width, int height, int ymin, int ymax, int barnum, const char *url);
</code></pre><p>实际上这部分代码和前面代码差不多，先取得YUV数据流，类似一个一维数组，读第一帧图像，然后依次读到y，u，v三个分量起始位置，再对y，u，v的像素值分别进行处理。</p><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门3/2018121116501186.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_6-两张yuv420p图像的峰值信噪比-psnr-计算" tabindex="-1"><a class="header-anchor" href="#_6-两张yuv420p图像的峰值信噪比-psnr-计算" aria-hidden="true">#</a> 6 两张yuv420p图像的峰值信噪比（psnr）计算</h2><p>本程序中的函数主要是比较两张yuv420p图像的峰值信噪。函数的代码如下所示：</p><pre><code>/**
 * @file 6 yuv420_psnr.cpp
 * @author luohen
 * @brief Compute the PSNR values of two yuv files
 * @date 2018-12-08
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
 * @param url1	location of input yuv420p file1
 * @param url2	location of input yuv420p file2
 * @param w		width of input yuv420p file
 * @param h		height of input yuv420p file
 * @return int
 */
int yuv420_psnr(const char *url1, const char *url2, int w, int h)
{
	//reading yuv iamges
	FILE *fp1 = fopen(url1, &quot;rb+&quot;);
	FILE *fp2 = fopen(url2, &quot;rb+&quot;);

	unsigned char *pic1 = new unsigned char[w * h];
	unsigned char *pic2 = new unsigned char[w * h];

	fread(pic1, 1, w * h, fp1);
	fread(pic2, 1, w * h, fp2);

	double mse_sum = 0, mse = 0, psnr = 0;
	//computing mse
	for (int j = 0; j &lt; w * h; j++)
	{
		mse_sum += pow((double)(pic1[j] - pic2[j]), 2);
	}
	mse = mse_sum / (w * h);
	//computing psnr
	psnr = 10 * log10(255.0 * 255.0 / mse);
	printf(&quot;%5.3f\\n&quot;, psnr);

	delete[] pic1;
	delete[] pic2;
	fclose(fp1);
	fclose(fp2);
	return 0;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	int state = yuv420_psnr(&quot;video/akiyo.yuv&quot;, &quot;video/distort_akiyo.yuv&quot;, 352, 288);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_psnr(const char *url1, const char *url2, int w, int h);
</code></pre><p>这段代码主要是计算两张图像的接近程度，psnr值具体介绍可以见文章：</p>`,16),_={href:"https://www.cnblogs.com/ranjiewen/p/6390846.html",target:"_blank",rel:"noopener noreferrer"},s=u(`<p>本文所用的两张图像一张是akiyo视频流首帧图像，另外一张是前面为akiyo加上边框的图像。两张图像的psnr值为13.497。一般psnr值越大两张图像越接近。</p><h2 id="_7-yuv420图像顺时针旋转90度" tabindex="-1"><a class="header-anchor" href="#_7-yuv420图像顺时针旋转90度" aria-hidden="true">#</a> 7 yuv420图像顺时针旋转90度</h2><p>本程序中的函数主要是将YUV420P视频数据流的第一帧图像顺时针旋转90度。函数的代码如下所示：</p><pre><code>/**
 * @file 7 yuv_Rotation90.cpp
 * @author luohen
 * @brief 90 degree rotation of yuv420 images
 * @date 2018-12-08
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
 * @brief Pre-defined image size
 *
 */
#define image_h 288
#define image_w 352

/**
  * @brief
  *
  * @param url location of input yuv420p file
  * @return int
  */
int yuv420_Rotation90(const char *url)
{
	//reading yuv files
	FILE *input_fp;
	//writingyuv files
	FILE *output_fp = fopen(&quot;video_result/output_rotation.yuv&quot;, &quot;wb+&quot;);

	//reading yuv datas
	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return -1;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	//Input image array definition
	unsigned char input_Y[image_h][image_w];
	unsigned char input_U[image_h / 2][image_w / 2];
	unsigned char input_V[image_h / 2][image_w / 2];

	//Output image array definition
	unsigned char output_Y[image_w][image_h];
	unsigned char output_U[image_w / 2][image_h / 2];
	unsigned char output_V[image_w / 2][image_h / 2];

	int w = image_w;
	int h = image_h;

	fread(input_Y, sizeof(unsigned char), w * h, input_fp);
	fread(input_U, sizeof(unsigned char), w / 2 * h / 2, input_fp);
	fread(input_V, sizeof(unsigned char), w / 2 * h / 2, input_fp);

	//Y 90 degree rotation
	for (int x = 0; x &lt; h; x++)
	{
		for (int y = 0; y &lt; w; y++)
		{
			//旋转之后，输出的x值等于输入的y坐标值
			//y值等于输入列高-输入x坐标值-1
			output_Y[y][h - x - 1] = input_Y[x][y];
		}
	}

	//u 90 degree rotation
	for (int x = 0; x &lt; h / 2; x++)
	{
		for (int y = 0; y &lt; w / 2; y++)
		{
			//旋转之后，输出的x值等于输入的y坐标值
			//y值等于输入列高-输入x坐标值-1
			output_U[y][h / 2 - x - 1] = input_U[x][y];
		}
	}

	//v 90 degree rotation
	for (int x = 0; x &lt; h / 2; x++)
	{
		for (int y = 0; y &lt; w / 2; y++)
		{
			//旋转之后，输出的x值等于输入的y坐标值
			//y值等于输入列高-输入x坐标值-1
			output_V[y][h / 2 - x - 1] = input_V[x][y];
		}
	}

	fwrite(output_Y, sizeof(unsigned char), w * h, output_fp);
	fwrite(output_U, sizeof(unsigned char), w / 2 * h / 2, output_fp);
	fwrite(output_V, sizeof(unsigned char), w / 2 * h / 2, output_fp);

	fclose(input_fp);
	fclose(output_fp);

	return 0;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	int state = yuv420_Rotation90(&quot;video/akiyo.yuv&quot;);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_Rotation90(const char *url);
</code></pre><p>这段代码主要是分别提取yuv分量，然后将y，u，v分量分别旋转90度。但是提取yuv分量和以前的代码有所不同。</p><p>首先是建立yuv三个分量输入的静态二维数组，相比使用动态数组，这种方式处理数据简单很多，但是需要实现确定输入图像的大小。</p><pre><code>unsigned char input_Y[image_h][image_w];

unsigned char input_U[image_h / 2][image_w / 2];

unsigned char input_V[image_h / 2][image_w / 2];
</code></pre><p>然后建立旋转后的输出数组，输出数组定义是，由于是旋转90度，长宽进行了对调。</p><pre><code>unsigned char output_Y[image_w][image_h];

unsigned char output_U[image_w / 2][image_h / 2];

unsigned char output_V[image_w / 2][image_h / 2];
</code></pre><p>其他旋转操作，就是图像赋值过程。旋转后akiyo图像尺寸变为（288，352）</p><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门3/20181211165011228.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_8-yuv420图像大小重置" tabindex="-1"><a class="header-anchor" href="#_8-yuv420图像大小重置" aria-hidden="true">#</a> 8 yuv420图像大小重置</h2><p>本程序中的函数主要是对YUV420P视频数据流的第一帧图像进行缩放或者放大。类似opencv中的resize函数，函数的代码如下所示：</p><pre><code>/**
 * @file 8 yuv_resize.cpp
 * @author luohen
 * @brief adjusting yuv image size
 * @date 2018-12-08
 *
 */

#include &quot;stdafx.h&quot;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;
#include &lt;math.h&gt;
#include &lt;string.h&gt;
#include &lt;iostream&gt;

using namespace std;

#define HEIGHT 288
#define WIDTH 352

/**
 * @brief 
 * 
 * @param url			location of input yuv420p file
 * @param out_width		output image width
 * @param out_height	output image height
 * @return int 
 */
int yuv420_resize(const char *url, int out_width, int out_height)
{
	//input array
	unsigned char yin[HEIGHT][WIDTH];
	unsigned char uin[HEIGHT / 2][WIDTH / 2];
	unsigned char vin[HEIGHT / 2][WIDTH / 2];
	//output array
	unsigned char *yout = new unsigned char[out_width * out_height];
	unsigned char *uout = new unsigned char[out_width / 2 * out_height / 2];
	unsigned char *vout = new unsigned char[out_width / 2 * out_height / 2];
	///reading yuv file
	FILE *input_fp;
	//writing yuv file
	FILE *output_fp = fopen(&quot;video_result/output_resize.yuv&quot;, &quot;wb+&quot;);

	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return -1;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	fread(yin, sizeof(unsigned char), HEIGHT * WIDTH, input_fp);
	fread(uin, sizeof(unsigned char), HEIGHT * WIDTH / 4, input_fp);
	fread(vin, sizeof(unsigned char), HEIGHT * WIDTH / 4, input_fp);

	//Y
	for (int i = 0; i &lt; out_height; i++)
	{
		for (int j = 0; j &lt; out_width; j++)
		{
			int i_in = round(i * HEIGHT / out_height);
			int j_in = round(j * WIDTH / out_width);
			yout[i * out_width + j] = yin[i_in][j_in];
		}
	}

	//U
	for (int i = 0; i &lt; out_height / 2; i++)
	{
		for (int j = 0; j &lt; out_width / 2; j++)
		{
			int i_in = round(i * (HEIGHT / 2) / (out_height / 2));
			int j_in = round(j * (WIDTH / 2) / (out_width / 2));
			uout[i * out_width / 2 + j] = uin[i_in][j_in];
		}
	}

	//V
	for (int i = 0; i &lt; out_height / 2; i++)
	{
		for (int j = 0; j &lt; out_width / 2; j++)
		{
			int i_in = round(i * (HEIGHT / 2) / (out_height / 2));
			int j_in = round(j * (WIDTH / 2) / (out_width / 2));
			vout[i * out_width / 2 + j] = vin[i_in][j_in];
		}
	}

	fwrite(yout, sizeof(unsigned char), out_width * out_height, output_fp);
	fwrite(uout, sizeof(unsigned char), out_width * out_height / 4, output_fp);
	fwrite(vout, sizeof(unsigned char), out_width * out_height / 4, output_fp);

	delete[] yout;
	delete[] uout;
	delete[] vout;
	fclose(input_fp);
	fclose(output_fp);

	return 0;
}

/**
 * @brief main
 *
 * @return int
 */
int main()
{
	int state = yuv420_resize(&quot;video/akiyo.yuv&quot;, 288, 352);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_resize(const char *url, int out_width, int out_height);
</code></pre><p>这段代码也是通过事先设定yuv输入输出的静态二维数组来进行处理的。其中out_width, out_height</p><p>是输出图像的宽高，这段代码中输出图像的宽高可以设定为任意值。所用图像resize方法是最简单的最邻近插值法。</p><p>插值方法见文章：</p>`,23),l={href:"https://blog.csdn.net/caomin1hao/article/details/81092134",target:"_blank",rel:"noopener noreferrer"},c=t("p",null,"当设置调整后的图像宽高为288，352时，结果如下：",-1),f=t("figure",null,[t("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门3/20181211183412340.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),t("figcaption")],-1);function g(m,y){const n=o("ExternalLinkIcon");return a(),h("div",null,[d,t("p",null,[t("a",_,[i(" https://www.cnblogs.com/ranjiewen/p/6390846.html"),e(n)])]),s,t("p",null,[t("a",l,[i(" https://blog.csdn.net/caomin1hao/article/details/81092134"),e(n)])]),c,f])}const b=r(p,[["render",g],["__file","2018-12-11-_图像处理_ YUV图像处理入门3.html.vue"]]);export{b as default};
