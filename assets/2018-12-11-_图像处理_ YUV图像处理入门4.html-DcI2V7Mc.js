import{_ as n,c as e,a as i,o as r}from"./app-TQoR7mvJ.js";const a={};function p(o,t){return r(),e("div",null,t[0]||(t[0]=[i(`<h1 id="图像处理-yuv图像处理入门4" tabindex="-1"><a class="header-anchor" href="#图像处理-yuv图像处理入门4"><span>[图像处理] YUV图像处理入门4</span></a></h1><h2 id="_9-yuv420图像截取" tabindex="-1"><a class="header-anchor" href="#_9-yuv420图像截取"><span>9 yuv420图像截取</span></a></h2><p>本程序中的函数主要是对YUV420P视频数据流的第一帧图像进行截取。类似opencv中的rect函数，函数的代码如下所示：</p><pre><code>/**
 * @file 9 yuv_clip.cpp
 * @author luohen
 * @brief yuv image clip
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
 * @param w width of input yuv420p file
 * @param h height of input yuv420p file
 * @param sx clipped initial position x of origin y image
 * @param sy clipped initial position y of origin y image
 * @param sw wdith of clipped image
 * @param sh height of clipped image
 * @param url location of input yuv420p file
 * @return int
 */
int yuv420_clip(int w, int h, int sx, int sy, int sw, int sh, const char *url)
{
	//reading yuv file
	FILE *input_fp;
	//writing yuv file
	FILE *output_fp = fopen(&quot;video_result/output_clip.yuv&quot;, &quot;wb+&quot;);

	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return -1;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	//origin image
	unsigned char *pic = new unsigned char[w * h * 3 / 2];
	//clipped image
	unsigned char *pic_clip = new unsigned char[sw * sh * 3 / 2];

	// y length of origin image
	int size_y = w * h;
	// yu length of origin image
	int size_yu = w * h + w * h / 4;
	// y length of clipped image
	int size_sy = sw * sh;
	// yu length of clipped image
	int size_syu = sw * sh + sw * sh / 4;

	fread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);

	//y clip
	for (int j = 0; j &lt; sh; j++)
	{
		for (int k = 0; k &lt; sw; k++)
		{
			pic_clip[j * sw + k] = pic[(sx + j) * w + (sy + k)];
		}
	}

	//sw_uv,sh_uv
	int sw_uv = sw / 2;
	int sh_uv = sh / 2;

	//u clip
	for (int j = 0; j &lt; sh_uv; j++)
	{
		for (int k = 0; k &lt; sw_uv; k++)
		{
			pic_clip[size_sy + j * sw_uv + k] = pic[size_y + (sx / 2 + j) * w / 2 + (sy / 2 + k)];
		}
	}

	//v clip
	for (int j = 0; j &lt; sh_uv; j++)
	{
		for (int k = 0; k &lt; sw_uv; k++)
		{
			pic_clip[size_syu + j * sw_uv + k] = pic[size_yu + (sx / 2 + j) * w / 2 + (sy / 2 + k)];
		}
	}

	fwrite(pic_clip, 1, sw * sh * 3 / 2, output_fp);

	delete[] pic;
	delete[] pic_clip;
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
	int state = yuv420_clip(352, 288, 60, 50, 176, 144, &quot;video/akiyo.yuv&quot;);
	return 0;
}
</code></pre><p>调用函数为：</p><pre><code>int yuv420_clip(int w, int h, int sx, int sy, int sw, int sh, const char *url);
</code></pre><p>这段代码指的是对于宽高为w，h的yuv图像，相对于y分量来说截取宽为sw，高为sh的部分，截取部分左上角顶点坐标为(sx，sy)；对于uv分量来截取宽高分别为sw/2，sh/2，截取部分左上角顶点坐标为(sx/2，sy/2)。然后分别对y，u，v分量截图。</p><p>这段程序sx=60，sy=50，sw=176，sh=144。最终的结果如下图：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/20181211183530454.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><h2 id="_10-yuv420图像帧差法运动检测" tabindex="-1"><a class="header-anchor" href="#_10-yuv420图像帧差法运动检测"><span>10 yuv420图像帧差法运动检测</span></a></h2><p>本程序中的函数主要是截取YUV420P视频数据流的第1帧图像和第200图像，通过帧差法对两幅图像的y分量进行对比实现运动检测。类似opencv中的absdiff函数，函数的代码如下所示：</p><pre><code>/**
 * @file 10 yuv_framedifference.cpp
 * @author luohen
 * @brief Frame difference method of y
 * @date 2018-12-10
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

/**
 * @brief
 *
 * @param pFrame1		the first frame
 * @param pFrame2		the second frame
 * @param pResult		the result image
 * @param w				width of input yuv420p file
 * @param h				height of input yuv420p file
 * @param yThreshold	threshold value
 */
void yuv420_Framedifference(unsigned char *pFrame1, unsigned char *pFrame2, unsigned char *pResult, int w, int h, int yThreshold)
{
	//the first frame
	unsigned char *Y1 = new unsigned char[w * h];
	//the second frame
	unsigned char *Y2 = new unsigned char[w * h];

	//copy y
	memcpy(Y1, pFrame1, w * h);
	memcpy(Y2, pFrame2, w * h);
	for (int y = 0; y &lt; h; y++)
	{
		for (int x = 0; x &lt; w; x++)
		{
			int i = y * w + x;
			//diff
			int temp = abs((int)Y1[i] - (int)Y2[i]);
			if (temp &gt; yThreshold)
			{
				pResult[i] = 255;
			}
			else
			{
				pResult[i] = 0;
			}
		}
	}
	delete[] Y1;
	delete[] Y2;
}

/**
 * @brief main function
 *
 * @return int
 */
int main()
{
	//the yuv image size
	int w = 352, h = 288;

	//reading yuv file
	FILE *input_fp;
	//writing yuv file
	//the first yuv image
	FILE *fp1 = fopen(&quot;video_result/akiyo1.yuv&quot;, &quot;wb+&quot;);
	//the second yuv image
	FILE *fp2 = fopen(&quot;video_result/akiyo2.yuv&quot;, &quot;wb+&quot;);
	//the binary image of frame difference
	FILE *fp3 = fopen(&quot;video_result/output_diff.y&quot;, &quot;wb+&quot;);

	const char * url = &quot;video/akiyo.yuv&quot;;
	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return 0;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	//result
	unsigned char *pResult = new unsigned char[w * h];
	//the first image
	unsigned char *pFrame1 = new unsigned char[w * h * 3 / 2];
	//the second image
	unsigned char *pFrame2 = new unsigned char[w * h * 3 / 2];

	//used for read frames
	unsigned char originalFrame[352 * 288 * 3 / 2];
	//reading image for a loop
	for (int i = 0; i &lt; 200; i++)
	{
		//fread function automatically moves the pointer
		//take the first frame
		if (i == 0)
		{
			fread(pFrame1, w * h * 3 / 2, 1, input_fp);
		}
		//take the second frame
		if (i == 199)
		{
			fread(pFrame2, w * h * 3 / 2, 1, input_fp);
		}
		//Skip intermediate frame
		else
		{
			fread(originalFrame, w * h * 3 / 2, 1, input_fp);
		}
	}

	/* another way to read images
	fread(pFrame1, w * h * 3 / 2, 1, input_fp);
	int p = 199 * w*h * 3 / 2;
	//move the pointer
	fseek(input_fp, p, SEEK_SET);
	fread(pFrame2, w * h * 3 / 2, 1, input_fp);
	*/

	//the threshold is 30
	yuv420_Framedifference(pFrame1, pFrame2, pResult, w, h, 30);

	fwrite(pFrame1, 1, w * h * 3 / 2, fp1);
	fwrite(pFrame2, 1, w * h * 3 / 2, fp2);
	fwrite(pResult, 1, w * h, fp3);

	delete[] pResult;
	delete[] pFrame1;
	delete[] pFrame2;

	fclose(input_fp);
	fclose(fp1);
	fclose(fp2);
	fclose(fp3);
}
</code></pre><p>调用函数为：</p><pre><code> void yuv420_Framedifference(unsigned char *pFrame1, unsigned char *pFrame2, unsigned char *pResult, int w, int h, int yThreshold);
</code></pre><p>这段代码中忽略了uv分量的影响。计算第一帧y分量与第二帧y分量的差。然后通过类似opencv中的threshold函数，对于帧差得到的图像中像素值大于给定阈值yThreshold的点，其像素值置为255，小于阈值的点像素值置为0。也就是说像素值为255的区域就是运动区域，为0的区域就是背景区域。这是最基本的运动检测算法，当然这段代码改进的地方有：通过uv分量的差综合得到背景区域；或者引入三帧差法。</p><p>对于主函数中，由于akiyo.yuv是一个视频流，通过fread函数每读完一张图像，fread中的文件指针会直接移动到当前文件读取位置，这样就可以用fread函数读完视频中所有的图像。</p><p>当然这种方式比较傻，可以直接通过下列代码，先读取第一帧图像，然后通过fseek函数，将fread的文件指针，从SEEK_SET(文件开始处)移动到第199帧图像的结尾处，再用fread函数读取第200帧图像。</p><pre><code>fseek(input_fp, p, SEEK_SET);

fread(pFrame1, w * h * 3 / 2, 1, input_fp);

int p = 199 * w*h * 3 / 2;

fseek(input_fp, p, SEEK_SET);

fread(pFrame2, w * h * 3 / 2, 1, input_fp);
</code></pre><p>所提取的第1帧图像、第200帧图像以及帧差结果的二值图如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/20181211165756400.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/2018121118360216.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/20181211183622511.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_11-二值图像膨胀和腐蚀" tabindex="-1"><a class="header-anchor" href="#_11-二值图像膨胀和腐蚀"><span>11 二值图像膨胀和腐蚀</span></a></h2><p>本程序中的函数主要是对帧差法提取的运动区域二值图像进行膨胀和腐蚀操作，函数的代码如下所示：</p><pre><code>/**
 * @file 11 yuv_dilate_erode.cpp
 * @author luohen
 * @brief dilate and erode of yuv image
 * @date 2018-12-10
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

/**
 * @brief erode
 * 
 * @param pFrame		the input binary image
 * @param pdilateResult	the output binary image
 * @param kernel		kernel of erode
 * @param w				width of image
 * @param h				height of image
 */
void yuv420_erode(unsigned char *pFrame, unsigned char *pErodeResult, int kernel, int w, int h)
{
	//copy data
	unsigned char *srcImg = new unsigned char[w * h];
	memcpy((char *)srcImg, (char *)pFrame, w * h);

	//kernel除中心之外像素点个数
	int nErodeThreshold = kernel * kernel - 1;
	//对于中点要erode像素区域步长
	int erodeDist = (kernel - 1) / 2;
	//ignore edge point
	for (int i = erodeDist; i &lt; h - erodeDist; i++)
	{
		for (int j = erodeDist; j &lt; w - erodeDist; j++)
		{
			// 如果值不为0才进行处理
			if (srcImg[i * w + j] != 0)
			{
				int iPointCount = 0;
				// 根据此点的邻域判断此点是否需要删除
				for (int r = -erodeDist; r &lt;= erodeDist; r++)
				{
					for (int c = -erodeDist; c &lt;= erodeDist; c++)
					{
						//统计不为0的个数
						if (srcImg[(i + r) * w + j + c] != 0)
						{
							iPointCount++;
						}
					}
				}
				// 如果邻域中不为0的个数小于阈值，则中心点像素值设置为0
				if (iPointCount &lt; nErodeThreshold)
				{
					pErodeResult[i * w + j] = 0;
				}
				else
				{
					pErodeResult[i * w + j] = 255;
				}
			}
			else
			{
				pErodeResult[i * w + j] = 0;
			}
		}
	}
	delete[] srcImg;
	return;
}

/**
 * @brief dilate
 * 
 * @param pFrame		the input binary image
 * @param pdilateResult	the output binary image
 * @param kernel		kernel of dilate
 * @param w				width of image
 * @param h				height of image
 */
void yuv420_dilate(unsigned char *pFrame, unsigned char *pdilateResult, int kernel, int w, int h)
{
	//copy data
	unsigned char *srcImg = new unsigned char[w * h];
	memcpy((char *)srcImg, (char *)pFrame, w * h);

	//对于中点要erode像素区域步长
	int erodeDist = (kernel - 1) / 2;
	//ignore edge point
	for (int i = erodeDist; i &lt; h - erodeDist; i++)
	{
		for (int j = erodeDist; j &lt; w - erodeDist; j++)
		{
			//对所有点进行判断
			int iPointCount = 0;
			// 根据此点的邻域判断此点是否需要删除
			for (int r = -erodeDist; r &lt;= erodeDist; r++)
			{
				for (int c = -erodeDist; c &lt;= erodeDist; c++)
				{
					//统计不为0的个数
					if (srcImg[(i + r) * w + j + c] != 0)
					{
						iPointCount++;
					}
				}
			}
			// 如果邻域中各像素点值都为0，则中心点像素值设置为0
			if (iPointCount == 0)
			{
				pdilateResult[i * w + j] = 0;
			}
			else
			{
				pdilateResult[i * w + j] = 255;
			}
		}
	}
	delete[] srcImg;
	return;
}

/**
 * @brief
 *
 * @param pFrame1		the first frame
 * @param pFrame2		the second frame
 * @param pResult		the result image
 * @param w				width of input yuv420p file
 * @param h				height of input yuv420p file
 * @param yThreshold	threshold value
 */
void yuv420_Framedifference(unsigned char *pFrame1, unsigned char *pFrame2, unsigned char *pResult, int w, int h, int yThreshold)
{
	//the first frame
	unsigned char *Y1 = new unsigned char[w * h];
	//the second frame
	unsigned char *Y2 = new unsigned char[w * h];
	;
	//copy y
	memcpy(Y1, pFrame1, w * h);
	memcpy(Y2, pFrame2, w * h);
	for (int y = 0; y &lt; h; y++)
	{
		for (int x = 0; x &lt; w; x++)
		{
			int i = y * w + x;
			//diff
			int temp = abs((int)Y1[i] - (int)Y2[i]);
			if (temp &gt; yThreshold)
			{
				pResult[i] = 255;
			}
			else
			{
				pResult[i] = 0;
			}
		}
	}
	delete[] Y1;
	delete[] Y2;
}

/**
 * @brief main function
 *
 * @return int
 */
int main()
{
	//the yuv image size
	int w = 352, h = 288;

	//reading yuv file
	FILE *input_fp;
	//writing yuv file
	//the first yuv image
	FILE *fp1 = fopen(&quot;video_result/akiyo1.yuv&quot;, &quot;wb+&quot;);
	//the second yuv image
	FILE *fp2 = fopen(&quot;video_result/akiyo2.yuv&quot;, &quot;wb+&quot;);
	//the binary image of frame difference
	FILE *fp3 = fopen(&quot;video_result/akiyo_erode.y&quot;, &quot;wb+&quot;);

	const char *url = &quot;video/akiyo.yuv&quot;;
	if ((input_fp = fopen(url, &quot;rb&quot;)) == NULL)
	{
		printf(&quot;%s open error!\\n&quot;, url);
		return 0;
	}
	else
	{
		printf(&quot;%s open.\\n&quot;, url);
	}

	//result
	unsigned char *pResult = new unsigned char[w * h];
	//the first image
	unsigned char *pFrame1 = new unsigned char[w * h * 3 / 2];
	//the second image
	unsigned char *pFrame2 = new unsigned char[w * h * 3 / 2];

	//used for read frames
	unsigned char originalFrame[352 * 288 * 3 / 2];
	//reading image for a loop
	for (int i = 0; i &lt; 200; i++)
	{
		//fread function automatically moves the pointer
		//take the first frame
		if (i == 0)
		{
			fread(pFrame1, w * h * 3 / 2, 1, input_fp);
		}
		//take the second frame
		if (i == 199)
		{
			fread(pFrame2, w * h * 3 / 2, 1, input_fp);
		}
		//Skip intermediate frame
		else
		{
			fread(originalFrame, w * h * 3 / 2, 1, input_fp);
		}
	}

	/* another way to read images
	fread(pFrame1, w * h * 3 / 2, 1, input_fp);
	int p = 199 * w*h * 3 / 2;
	//move the pointer
	fseek(input_fp, p, SEEK_SET);
	fread(pFrame2, w * h * 3 / 2, 1, input_fp);
	*/

	//the threshold is 30
	yuv420_Framedifference(pFrame1, pFrame2, pResult, w, h, 30);

	//kernel size is 3 X 3.
	yuv420_erode(pResult, pResult, 3, w, h);
	//yuv420_dilate(pResult, pResult, 3, w, h);

	fwrite(pFrame1, 1, w * h * 3 / 2, fp1);
	fwrite(pFrame2, 1, w * h * 3 / 2, fp2);
	fwrite(pResult, 1, w * h, fp3);

	delete[] pResult;
	delete[] pFrame1;
	delete[] pFrame2;

	fclose(input_fp);
	fclose(fp1);
	fclose(fp2);
	fclose(fp3);
}
</code></pre><p>函数调用代码为：</p><pre><code>void yuv420_dilate(unsigned char *pFrame, unsigned char *pdilateResult, int kernel, int w, int h);

void yuv420_erode(unsigned char *pFrame, unsigned char *pErodeResult, int kernel, int w, int h);
</code></pre><p>腐蚀膨胀的原理和作用见文章；</p><p><a href="https://blog.csdn.net/qq_25847123/article/details/73744575" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/qq_25847123/article/details/73744575</a></p><p>简单。这段代码是opencv中dilate和erode函数中的简化版。不同之处是，这段代码所用处理核只能是矩形的。此外对于边缘点，opencv中会用类似深度学习卷积神经网络中的padding操作，在周围填充点；这段代码就忽略边缘的点，直接处理中间的像素点。</p><p>代码很简单，通常对yuv图像处理就是读图，分离yuv分量，然后分别对像素点进行处理。</p><p>膨胀腐蚀的结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/20181211183651281.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[图像处理] YUV图像处理入门4/20181211183706205.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,35)]))}const u=n(a,[["render",p],["__file","2018-12-11-_图像处理_ YUV图像处理入门4.html.vue"]]),l=JSON.parse('{"path":"/blog/%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86/YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A8/2018-12-11-_%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86_%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84.html","title":"[图像处理] YUV图像处理入门4","lang":"zh-CN","frontmatter":{"date":"2018-12-11T17:35:44.000Z","category":["图像处理"],"tag":["图像处理"],"description":"[图像处理] YUV图像处理入门4 9 yuv420图像截取 本程序中的函数主要是对YUV420P视频数据流的第一帧图像进行截取。类似opencv中的rect函数，函数的代码如下所示： 调用函数为： 这段代码指的是对于宽高为w，h的yuv图像，相对于y分量来说截取宽为sw，高为sh的部分，截取部分左上角顶点坐标为(sx，sy)；对于uv分量来截取宽高分...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86/YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A8/2018-12-11-_%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86_%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[图像处理] YUV图像处理入门4"}],["meta",{"property":"og:description","content":"[图像处理] YUV图像处理入门4 9 yuv420图像截取 本程序中的函数主要是对YUV420P视频数据流的第一帧图像进行截取。类似opencv中的rect函数，函数的代码如下所示： 调用函数为： 这段代码指的是对于宽高为w，h的yuv图像，相对于y分量来说截取宽为sw，高为sh的部分，截取部分左上角顶点坐标为(sx，sy)；对于uv分量来截取宽高分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211183530454.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"图像处理"}],["meta",{"property":"article:published_time","content":"2018-12-11T17:35:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[图像处理] YUV图像处理入门4\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211183530454.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211165756400.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/2018121118360216.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211183622511.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211183651281.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5B%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%5D%20YUV%E5%9B%BE%E5%83%8F%E5%A4%84%E7%90%86%E5%85%A5%E9%97%A84/20181211183706205.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2018-12-11T17:35:44.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"9 yuv420图像截取","slug":"_9-yuv420图像截取","link":"#_9-yuv420图像截取","children":[]},{"level":2,"title":"10 yuv420图像帧差法运动检测","slug":"_10-yuv420图像帧差法运动检测","link":"#_10-yuv420图像帧差法运动检测","children":[]},{"level":2,"title":"11 二值图像膨胀和腐蚀","slug":"_11-二值图像膨胀和腐蚀","link":"#_11-二值图像膨胀和腐蚀","children":[]}],"git":{},"readingTime":{"minutes":9.71,"words":2913},"filePathRelative":"blog/图像处理/YUV图像处理入门/2018-12-11-[图像处理] YUV图像处理入门4.md","localizedDate":"2018年12月12日","excerpt":"\\n<h2>9 yuv420图像截取</h2>\\n<p>本程序中的函数主要是对YUV420P视频数据流的第一帧图像进行截取。类似opencv中的rect函数，函数的代码如下所示：</p>\\n<pre><code>/**\\n * @file 9 yuv_clip.cpp\\n * @author luohen\\n * @brief yuv image clip\\n * @date 2018-12-08\\n *\\n */\\n\\n#include \\"stdafx.h\\"\\n#include &lt;stdio.h&gt;\\n#include &lt;stdlib.h&gt;\\n#include &lt;string.h&gt;\\n#include &lt;math.h&gt;\\n#include &lt;iostream&gt;\\n\\nusing namespace std;\\n\\n/**\\n * @brief\\n *\\n * @param w width of input yuv420p file\\n * @param h height of input yuv420p file\\n * @param sx clipped initial position x of origin y image\\n * @param sy clipped initial position y of origin y image\\n * @param sw wdith of clipped image\\n * @param sh height of clipped image\\n * @param url location of input yuv420p file\\n * @return int\\n */\\nint yuv420_clip(int w, int h, int sx, int sy, int sw, int sh, const char *url)\\n{\\n\\t//reading yuv file\\n\\tFILE *input_fp;\\n\\t//writing yuv file\\n\\tFILE *output_fp = fopen(\\"video_result/output_clip.yuv\\", \\"wb+\\");\\n\\n\\tif ((input_fp = fopen(url, \\"rb\\")) == NULL)\\n\\t{\\n\\t\\tprintf(\\"%s open error!\\\\n\\", url);\\n\\t\\treturn -1;\\n\\t}\\n\\telse\\n\\t{\\n\\t\\tprintf(\\"%s open.\\\\n\\", url);\\n\\t}\\n\\n\\t//origin image\\n\\tunsigned char *pic = new unsigned char[w * h * 3 / 2];\\n\\t//clipped image\\n\\tunsigned char *pic_clip = new unsigned char[sw * sh * 3 / 2];\\n\\n\\t// y length of origin image\\n\\tint size_y = w * h;\\n\\t// yu length of origin image\\n\\tint size_yu = w * h + w * h / 4;\\n\\t// y length of clipped image\\n\\tint size_sy = sw * sh;\\n\\t// yu length of clipped image\\n\\tint size_syu = sw * sh + sw * sh / 4;\\n\\n\\tfread(pic, sizeof(unsigned char), w * h * 3 / 2, input_fp);\\n\\n\\t//y clip\\n\\tfor (int j = 0; j &lt; sh; j++)\\n\\t{\\n\\t\\tfor (int k = 0; k &lt; sw; k++)\\n\\t\\t{\\n\\t\\t\\tpic_clip[j * sw + k] = pic[(sx + j) * w + (sy + k)];\\n\\t\\t}\\n\\t}\\n\\n\\t//sw_uv,sh_uv\\n\\tint sw_uv = sw / 2;\\n\\tint sh_uv = sh / 2;\\n\\n\\t//u clip\\n\\tfor (int j = 0; j &lt; sh_uv; j++)\\n\\t{\\n\\t\\tfor (int k = 0; k &lt; sw_uv; k++)\\n\\t\\t{\\n\\t\\t\\tpic_clip[size_sy + j * sw_uv + k] = pic[size_y + (sx / 2 + j) * w / 2 + (sy / 2 + k)];\\n\\t\\t}\\n\\t}\\n\\n\\t//v clip\\n\\tfor (int j = 0; j &lt; sh_uv; j++)\\n\\t{\\n\\t\\tfor (int k = 0; k &lt; sw_uv; k++)\\n\\t\\t{\\n\\t\\t\\tpic_clip[size_syu + j * sw_uv + k] = pic[size_yu + (sx / 2 + j) * w / 2 + (sy / 2 + k)];\\n\\t\\t}\\n\\t}\\n\\n\\tfwrite(pic_clip, 1, sw * sh * 3 / 2, output_fp);\\n\\n\\tdelete[] pic;\\n\\tdelete[] pic_clip;\\n\\tfclose(input_fp);\\n\\tfclose(output_fp);\\n\\treturn 0;\\n}\\n\\n/**\\n * @brief main\\n *\\n * @return int\\n */\\nint main()\\n{\\n\\tint state = yuv420_clip(352, 288, 60, 50, 176, 144, \\"video/akiyo.yuv\\");\\n\\treturn 0;\\n}\\n</code></pre>","autoDesc":true}');export{u as comp,l as data};
