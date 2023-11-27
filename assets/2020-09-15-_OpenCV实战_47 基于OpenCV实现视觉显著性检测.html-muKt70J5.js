import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as d,c as r,a as e,b as i,d as t,e as l}from"./app-MsA2k2kn.js";const c={},u=e("h1",{id:"opencv实战-47-基于opencv实现视觉显著性检测",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-47-基于opencv实现视觉显著性检测","aria-hidden":"true"},"#"),i(" [OpenCV实战]47 基于OpenCV实现视觉显著性检测")],-1),v=e("p",null,[i("人类具有一种视觉注意机制，即当面对一个场景时，会选择性地忽略不感兴趣的区域，聚焦于感兴趣的区域。这些感兴趣的区域称为显著性区域。视觉显著性检测（Visual Saliency Detection，VSD）则是一种模拟人类视觉并从图像中提取显著性区域的智能算法。如下面左边的图所示，人眼在观看该图片时会首先注意其中的小狗，自动忽略背景区域，小狗所在区域就是显著性区域。通过计算机视觉算法对左边的图像进行视觉显著性检测能够得到下图右边的结果，其中黑色区域为不显著区域，白色为显著区域，显著性检测在机器人领域、目标检测领域和图像识别领域有大量应用。 "),e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/image/dog.jpg",alt:"",loading:"lazy"})],-1),o={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/saliency",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/u010736662/article/details/88930849",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"本文需要OpenCV contrib库，OpenCV contrib库的编译安装见：",-1),p={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"本文所有代码见：",-1),h={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},y=l('<hr><h2 id="_1-opencv显著性算法背景介绍" tabindex="-1"><a class="header-anchor" href="#_1-opencv显著性算法背景介绍" aria-hidden="true">#</a> 1 OpenCV显著性算法背景介绍</h2><h3 id="_1-1-opencv显著性检测算法相关信息介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-opencv显著性检测算法相关信息介绍" aria-hidden="true">#</a> 1.1 OpenCV显著性检测算法相关信息介绍</h3><p>OpenCV contrib库中的saliency模块提供四种显著性检测算法。本节主要介绍这四种方法的相关信息。</p><h4 id="_1-1-1-staticsaliencyspectralresidual" tabindex="-1"><a class="header-anchor" href="#_1-1-1-staticsaliencyspectralresidual" aria-hidden="true">#</a> 1.1.1 StaticSaliencySpectralResidual</h4>',5),_=e("li",null,"原理：该方法从自然图像统计原理出发，模拟注意前视觉搜索的行为。该算法对每幅图像的对数谱进行分析，得到谱残差SR (Spectral Residual)。然后将谱残差进行空间变换，得到显著性图，该显著性图显示了感兴趣目标的位置。",-1),f={href:"http://bcmi.sjtu.edu.cn/~zhangliqing/Papers/2007CVPR_Houxiaodi_04270292.pdf",target:"_blank",rel:"noopener noreferrer"},q=e("li",null,"提出时间：2007",-1),S=e("li",null,"检测方式：单张图片检测",-1),x=l(`<p>调用接口如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = StaticSaliencySpectralResidual::create();
// 计算显著性
bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = cv2.saliency.StaticSaliencySpectralResidual_create()
# 计算显著性
success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-2-staticsaliencyfinegrained" tabindex="-1"><a class="header-anchor" href="#_1-1-2-staticsaliencyfinegrained" aria-hidden="true">#</a> 1.1.2 StaticSaliencyFineGrained</h4>`,6),M=e("li",null,"原理：该方法基于空间尺度差异center-surround differences计算显著性。利用积分图像integral images.实时生成高分辨率显著性图。",-1),A={href:"https://www.sciencedirect.com/science/article/abs/pii/S0262885609001371",target:"_blank",rel:"noopener noreferrer"},C=e("li",null,"提出时间：2010",-1),w=e("li",null,"检测方式：单张图片检测",-1),R=l(`<p>调用接口如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = StaticSaliencyFineGrained::create();
// 计算显著性
bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = cv2.saliency.StaticSaliencyFineGrained_create()
# 计算显著性
success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-3-objectnessbing" tabindex="-1"><a class="header-anchor" href="#_1-1-3-objectnessbing" aria-hidden="true">#</a> 1.1.3 ObjectnessBING</h4>`,6),j=e("li",null,"原理：基于二值化梯度特征(BING features)进行物体检测",-1),O={href:"https://mmcheng.net/bing/",target:"_blank",rel:"noopener noreferrer"},B=e("li",null,"提出时间：2014",-1),I=e("li",null,"检测方式：加载模型，单张图片检测",-1),N=l(`<p>调用接口如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = ObjectnessBING::create();
vector&lt;Vec4i&gt; saliencyMap;
// 提取模型文件参数
saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setTrainingPath(training_path);
// 将算法检测结果保存在Results文件夹内
saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setBBResDir(&quot;Results&quot;);
// 计算显著性
bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = cv2.saliency.ObjectnessBING_create()
# 提取模型文件参数
saliencyAlgorithm.setTrainingPath(training_path)
# 将算法检测结果保存在Results文件夹内
saliencyAlgorithm.setBBResDir(&quot;Results&quot;)
# 计算显著性
success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-4-binwangapr2014" tabindex="-1"><a class="header-anchor" href="#_1-1-4-binwangapr2014" aria-hidden="true">#</a> 1.1.4 BinWangApr2014</h4>`,6),V=e("li",null,"原理：基于运动背景减除法实现显著性区域检测",-1),k={href:"https://ieeexplore.ieee.org/document/6910012/",target:"_blank",rel:"noopener noreferrer"},G=e("li",null,"提出时间：2014",-1),E=e("li",null,"检测方式：基于多张图片初始化模型，然后进行单张图片检测",-1),T=l(`<p>调用接口如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = MotionSaliencyBinWangApr2014::create();
// 设置数据结构大小
saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;setImagesize(image.cols, image.rows);
// 初始化
saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;init();
saliencyAlgorithm-&gt;computeSaliency(frame, saliencyMap);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>saliencyAlgorithm = cv2.saliency.MotionSaliencyBinWangApr2014_create()
# 设置数据结构大小
saliencyAlgorithm.setImagesize(image.shape[1], image.shape[0])
# 初始化
saliencyAlgorithm.init()
success, saliencyMap = saliencyAlgorithm.computeSaliency(frame)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-opencv-saliency模块整体说明" tabindex="-1"><a class="header-anchor" href="#_1-2-opencv-saliency模块整体说明" aria-hidden="true">#</a> 1.2 OpenCV saliency模块整体说明</h3><p>显著性检测算法与目标检测算法大大不同。显著性检测算法，只是判断图中有显著目标的区域，这些区域可能包含目标也可能不包含目标，因方法而异。类比人眼的观察方式，显著性检测算法是许多计算机视觉任务的第一步，检测出显著性区域后，对这些显著性区域进行进一步判断和预测。显著性检测算法通常检测速度较快，某些计算量大的算法如深度学习图像分类算法，可以只在显著性区域上运行，以缩小检测范围，加快检测速度，提高检测精度。</p><p>OpenCV saliency模块提供了四种不同的显著性检测方法，但是按方法类别只有三种。OpenCV saliency模块的类关系如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/image/ClassRelation.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>OpenCV saliency模块提供的三种不同方法类别模块介绍如下：</p><ul><li>Motion saliency模块：这类算法输入为连续的图像帧，通过运动检测算法对连续图像帧进行处理，然后对运动目标进行跟踪，最终将运动目标设置为显著区域。代表为BinWangApr2014算法。该类算法容易出现丢帧和鬼影情况，运动检测效果不如主流的运动检测算法，实际图像显著性检测效果一般。</li><li>Objectness模块：这类算法输入为单帧图像，通过计算得到大量的建议区域，并将这些建议区域作为显著性区域。代表为ObjectnessBING算法。该类算法检测速度较慢，实际检测出来的建议区域可能上万个，需要进行筛选，总体效果一般。</li><li>Static saliency模块：这类算法输入为单帧图像，通过图像特征和统计量来定位图像中的显著性区域。代表为StaticSaliencySpectralResidual和StaticSaliencyFineGrained。该类算法检测速度非常快，不过效果总体一般。</li></ul>`,11),F={href:"https://zhuanlan.zhihu.com/p/115002897",target:"_blank",rel:"noopener noreferrer"},P={href:"https://blog.csdn.net/wsp_1138886114/article/details/103211054",target:"_blank",rel:"noopener noreferrer"},D=l(`<h2 id="_2-代码实现与结果分析" tabindex="-1"><a class="header-anchor" href="#_2-代码实现与结果分析" aria-hidden="true">#</a> 2 代码实现与结果分析</h2><h3 id="_2-1-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-1-代码实现" aria-hidden="true">#</a> 2.1 代码实现</h3><p>本文所提供的代码可以对视频或者图像进行显著性检测，BinWangApr2014只能对视频进行显著性检测。本文提供C++和Python代码实现，代码如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/saliency.hpp&gt;
#include &lt;iostream&gt;

using namespace std;
using namespace cv;
using namespace saliency;

int main()
{
	// 显著性检测算法
	// 可选：SPECTRAL_RESIDUAL，FINE_GRAINED，BING，BinWangApr2014
	String saliency_algorithm = &quot;FINE_GRAINED&quot;;
	// 检测视频或者图像
	String video_name = &quot;video/vtest.avi&quot;;
	// String video_name = &quot;video/dog.jpg&quot;;
	// 起始帧
	int start_frame = 0;
	// 模型路径
	String training_path = &quot;ObjectnessTrainedModel&quot;;

	// 如果算法名和视频名为空，停止检测
	if (saliency_algorithm.empty() || video_name.empty())
	{
		cout &lt;&lt; &quot;Please set saliency_algorithm and video_name&quot;;
		return -1;
	}

	// open the capture
	VideoCapture cap;
	// 打开视频
	cap.open(video_name);
	// 设置视频起始帧
	cap.set(CAP_PROP_POS_FRAMES, start_frame);

	// 输入图像
	Mat frame;

	// instantiates the specific Saliency
	// 实例化saliencyAlgorithm结构
	Ptr&lt;Saliency&gt; saliencyAlgorithm;

	// 二值化检测结果
	Mat binaryMap;
	// 检测图像
	Mat image;

	// 读图
	cap &gt;&gt; frame;
	if (frame.empty())
	{
		return 0;
	}

	frame.copyTo(image);

	// 根据输入的方法确定检测类型
	// StaticSaliencySpectralResidual
	if (saliency_algorithm.find(&quot;SPECTRAL_RESIDUAL&quot;) == 0)
	{
		// 检测结果，白色区域表示显著区域
		Mat saliencyMap;
		saliencyAlgorithm = StaticSaliencySpectralResidual::create();
		// 计算显著性
		double start = static_cast&lt;double&gt;(getTickCount());
		bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
		double duration = ((double)getTickCount() - start) / getTickFrequency();
		cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

		if (success)
		{
			StaticSaliencySpectralResidual spec;
			// 二值化图像
			double start = static_cast&lt;double&gt;(getTickCount());
			spec.computeBinaryMap(saliencyMap, binaryMap);
			double duration = ((double)getTickCount() - start) / getTickFrequency();
			cout &lt;&lt; &quot;computeBinaryMap cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

			imshow(&quot;Original Image&quot;, image);
			imshow(&quot;Saliency Map&quot;, saliencyMap);
			imshow(&quot;Binary Map&quot;, binaryMap);

			// 转换格式才能保存图片
			saliencyMap.convertTo(saliencyMap, CV_8UC3, 256);
			imwrite(&quot;Results/SPECTRAL_RESIDUAL_saliencyMap.jpg&quot;, saliencyMap);
			imwrite(&quot;Results/SPECTRAL_RESIDUAL_binaryMap.jpg&quot;, binaryMap);
			waitKey(0);
		}
	}

	// StaticSaliencyFineGrained
	else if (saliency_algorithm.find(&quot;FINE_GRAINED&quot;) == 0)
	{
		Mat saliencyMap;
		saliencyAlgorithm = StaticSaliencyFineGrained::create();
		// 计算显著性
		double start = static_cast&lt;double&gt;(getTickCount());
		bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
		double duration = ((double)getTickCount() - start) / getTickFrequency();
		cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

		if (success)
		{
			StaticSaliencyFineGrained spec;
			// 二值化图像
			// 二值化图像
			double start = static_cast&lt;double&gt;(getTickCount());
			spec.computeBinaryMap(saliencyMap, binaryMap);
			double duration = ((double)getTickCount() - start) / getTickFrequency();
			cout &lt;&lt; &quot;computeBinaryMap cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

			imshow(&quot;Saliency Map&quot;, saliencyMap);
			imshow(&quot;Original Image&quot;, image);
			imshow(&quot;Binary Map&quot;, binaryMap);

			// 转换格式才能保存图片
			saliencyMap.convertTo(saliencyMap, CV_8UC3, 256);
			imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap);
			imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap);
			waitKey(0);
		}
	}

	// ObjectnessBING
	else if (saliency_algorithm.find(&quot;BING&quot;) == 0)
	{
		// 判断模型是否存在
		if (training_path.empty())
		{
			cout &lt;&lt; &quot;Path of trained files missing! &quot; &lt;&lt; endl;
			return -1;
		}

		else
		{
			saliencyAlgorithm = ObjectnessBING::create();
			vector&lt;Vec4i&gt; saliencyMap;
			// 提取模型文件参数
			saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setTrainingPath(training_path);
			// 将算法检测结果保存在Results文件夹内
			saliencyAlgorithm.dynamicCast&lt;ObjectnessBING&gt;()-&gt;setBBResDir(&quot;Results&quot;);

			// 计算显著性
			double start = static_cast&lt;double&gt;(getTickCount());
			bool success = saliencyAlgorithm-&gt;computeSaliency(image, saliencyMap);
			double duration = ((double)getTickCount() - start) / getTickFrequency();
			cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

			if (success)
			{
				// saliencyMap获取检测到的目标个数
				int ndet = int(saliencyMap.size());
				std::cout &lt;&lt; &quot;Objectness done &quot; &lt;&lt; ndet &lt;&lt; std::endl;
				// The result are sorted by objectness. We only use the first maxd boxes here.
				// 目标按可能性从大到小排列，maxd为显示前5个目标，step设置颜色，jitter设置矩形框微调
				int maxd = 5, step = 255 / maxd, jitter = 9;
				Mat draw = image.clone();
				for (int i = 0; i &lt; std::min(maxd, ndet); i++)
				{
					// 获得矩形框坐标点
					Vec4i bb = saliencyMap[i];
					// 设定颜色
					Scalar col = Scalar(((i*step) % 255), 50, 255 - ((i*step) % 255));
					// 矩形框微调
					Point off(theRNG().uniform(-jitter, jitter), theRNG().uniform(-jitter, jitter));
					// 画矩形
					rectangle(draw, Point(bb[0] + off.x, bb[1] + off.y), Point(bb[2] + off.x, bb[3] + off.y), col, 2);
					// mini temperature scale
					// 颜色标注
					rectangle(draw, Rect(20, 20 + i * 10, 10, 10), col, -1);
				}
				imshow(&quot;BING&quot;, draw);

				// 保存图片
				imwrite(&quot;Results/BING_draw.jpg&quot;, draw);
				waitKey();
			}
			else
			{
				std::cout &lt;&lt; &quot;No saliency found for &quot; &lt;&lt; video_name &lt;&lt; std::endl;
			}
		}
	}

	// BinWangApr2014
	else if (saliency_algorithm.find(&quot;BinWangApr2014&quot;) == 0)
	{
		saliencyAlgorithm = MotionSaliencyBinWangApr2014::create();
		// 设置数据结构大小
		saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;setImagesize(image.cols, image.rows);
		// 初始化
		saliencyAlgorithm.dynamicCast&lt;MotionSaliencyBinWangApr2014&gt;()-&gt;init();

		bool paused = false;
		for (;; )
		{
			if (!paused)
			{
				cap &gt;&gt; frame;
				if (frame.empty())
				{
					return 0;
				}
				cvtColor(frame, frame, COLOR_BGR2GRAY);

				Mat saliencyMap;
				// 计算
				double start = static_cast&lt;double&gt;(getTickCount());
				saliencyAlgorithm-&gt;computeSaliency(frame, saliencyMap);
				double duration = ((double)getTickCount() - start) / getTickFrequency();
				cout &lt;&lt; &quot;computeSaliency cost time is: &quot; &lt;&lt; duration * 1000 &lt;&lt; &quot;ms&quot; &lt;&lt; endl;

				imshow(&quot;image&quot;, frame);
				// 显示
				imshow(&quot;saliencyMap&quot;, saliencyMap * 255);
			}

			char c = (char)waitKey(2);
			if (c == &#39;q&#39;)
				break;
			if (c == &#39;p&#39;)
				paused = !paused;
		}
	}

	destroyAllWindows();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Mon Sep 15 19:22:58 2020

@author: luohenyueji
&quot;&quot;&quot;

import cv2
import random


def main():
    # 显著性检测算法
    # 可选：SPECTRAL_RESIDUAL，FINE_GRAINED，BING，BinWangApr2014
    saliency_algorithm = &quot;FINE_GRAINED&quot;
    # 检测视频或者图像
    video_name = &quot;video/vtest.avi&quot;
    # video_name = &quot;video/dog.jpg&quot;;
    # 起始帧
    start_frame = 0
    # 模型路径
    training_path = &quot;ObjectnessTrainedModel&quot;

    # 如果算法名和视频名为空，停止检测
    if saliency_algorithm is None or video_name is None:
        print(&quot;Please set saliency_algorithm and video_name&quot;)
        return

    # open the capture
    cap = cv2.VideoCapture(video_name)

    # 设置视频起始帧
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    # 读图
    _, frame = cap.read()
    if frame is None:
        print(&quot;Please set saliency_algorithm and video_name&quot;)
        return

    image = frame.copy()

    # 根据输入的方法确定检测类型
    if saliency_algorithm.find(&quot;SPECTRAL_RESIDUAL&quot;) == 0:

        # 检测结果，白色区域表示显著区域
        saliencyAlgorithm = cv2.saliency.StaticSaliencySpectralResidual_create()

        # 计算显著性
        start = cv2.getTickCount()
        success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
        duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()
        print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))

        if success:
            # 二值化图像
            start = cv2.getTickCount()
            _, binaryMap = saliencyAlgorithm.computeBinaryMap(saliencyMap)
            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()
            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))

            cv2.imshow(&quot;Saliency Map&quot;, saliencyMap)
            cv2.imshow(&quot;Original Image&quot;, image)
            cv2.imshow(&quot;Binary Map&quot;, binaryMap)

            # 转换格式才能保存图片
            saliencyMap = (saliencyMap * 255)
            cv2.imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap)
            cv2.imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap)
            cv2.waitKey(0)

    # FINE_GRAINED
    elif saliency_algorithm.find(&quot;FINE_GRAINED&quot;) == 0:
        saliencyAlgorithm = cv2.saliency.StaticSaliencyFineGrained_create()

        # 计算显著性
        start = cv2.getTickCount()
        success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
        duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()
        print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))
        if success:
            # 二值化图像
            start = cv2.getTickCount()
            _, binaryMap = saliencyAlgorithm.computeBinaryMap(saliencyMap)
            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()
            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))

            cv2.imshow(&quot;Saliency Map&quot;, saliencyMap)
            cv2.imshow(&quot;Original Image&quot;, image)
            cv2.imshow(&quot;Binary Map&quot;, binaryMap)

            # 转换格式才能保存图片
            saliencyMap = (saliencyMap * 255)
            cv2.imwrite(&quot;Results/FINE_GRAINED_saliencyMap.jpg&quot;, saliencyMap)
            cv2.imwrite(&quot;Results/FINE_GRAINED_binaryMap.jpg&quot;, binaryMap)
            cv2.waitKey(0)

    elif saliency_algorithm.find(&quot;BING&quot;) == 0:
        # 判断模型是否存在
        if training_path is None:
            print(&quot;Path of trained files missing! &quot;)
            return
        else:
            saliencyAlgorithm = cv2.saliency.ObjectnessBING_create()
            # 提取模型文件参数
            saliencyAlgorithm.setTrainingPath(training_path)
            # 将算法检测结果保存在Results文件夹内
            saliencyAlgorithm.setBBResDir(&quot;Results&quot;)

            # 计算显著性
            start = cv2.getTickCount()
            success, saliencyMap = saliencyAlgorithm.computeSaliency(image)
            duration = (cv2.getTickCount() - start) / cv2.getTickFrequency()
            print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))
            if success:
                # saliencyMap获取检测到的目标个数
                ndet = saliencyMap.shape[0]
                print(&quot;Objectness done &quot;, ndet)

                # The result are sorted by objectness. We only use the first maxd boxes here.
                # 目标按可能性从大到小排列，maxd为显示前5个目标，step设置颜色，jitter设置矩形框微调
                maxd = 5
                step = 255 / maxd
                jitter = 9
                draw = image.copy()

                for i in range(0, min(maxd, ndet)):
                    # 获得矩形框坐标点
                    bb = saliencyMap[i][0]
                    # 设定颜色
                    col = ((i * step) % 255), 50, 255 - ((i * step) % 255)
                    # 矩形框微调
                    off = random.randint(-jitter,
                                         jitter), random.randint(-jitter, jitter)
                    # 画矩形
                    cv2.rectangle(draw, (bb[0] + off[0], bb[1] + off[1]),
                                  (bb[2] + off[0], bb[3] + off[1]), col, 2)
                    # mini temperature scale
                    # 颜色标注
                    cv2.rectangle(draw, (20, 20 + i * 10, 10, 10), col, -1)

                # 保存图片
                cv2.imwrite(&quot;Results/BING_draw.jpg&quot;, draw)
                cv2.imshow(&quot;BING&quot;, draw)
                cv2.waitKey(0)

    # 需要传入图像建模
    elif saliency_algorithm.find(&quot;BinWangApr2014&quot;) == 0:
        saliencyAlgorithm = cv2.saliency.MotionSaliencyBinWangApr2014_create()
        # 设置数据结构大小
        saliencyAlgorithm.setImagesize(image.shape[1], image.shape[0])
        # 初始化
        saliencyAlgorithm.init()
        paused = False

        while True:
            if not paused:
                _, frame = cap.read()
                if frame is None:
                    break

                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                # 计算显著性
                start = cv2.getTickCount()
                success, saliencyMap = saliencyAlgorithm.computeSaliency(frame)
                duration = (cv2.getTickCount() - start) / \\
                    cv2.getTickFrequency()
                print(&quot;computeBinaryMap cost time is: {} ms&quot;.format(duration * 1000))
                cv2.imshow(&quot;image&quot;, frame)
                # 显示
                cv2.imshow(&quot;saliencyMap&quot;, saliencyMap * 255)

            c = cv2.waitKey(2)
            c = chr(c) if c != -1 else 0
            if c == &#39;q&#39;:
                break
            if c == &#39;p&#39;:
                paused = not paused

    cv2.destroyAllWindows()
    return


if __name__ == &#39;__main__&#39;:
    main()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-结果分析" tabindex="-1"><a class="header-anchor" href="#_2-2-结果分析" aria-hidden="true">#</a> 2.2 结果分析</h3><h4 id="_2-2-1-图片检测结果" tabindex="-1"><a class="header-anchor" href="#_2-2-1-图片检测结果" aria-hidden="true">#</a> 2.2.1 图片检测结果</h4><p>对单张图片检测进行显著性区域检测后的结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片(487X365)</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/dog.jpg" alt="" loading="lazy"></td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/SPECTRAL_RESIDUAL_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">2.8</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/FINE_GRAINED_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">53.7</td></tr><tr><td style="text-align:center;">ObjectnessBING</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/BING_draw.jpg" alt="" loading="lazy"></td><td style="text-align:center;">411.7</td></tr></tbody></table><p>此外为了提高可视化结果，对StaticSaliencySpectralResidual和StaticSaliencyFineGrained的显著性检测结果图片进行了二值化，主要通过StaticSaliency::computeBinaryMap实现，即先聚类然后阈值分割。结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/SPECTRAL_RESIDUAL_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">48.4</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/dog/FINE_GRAINED_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">52.4</td></tr></tbody></table><h4 id="_2-2-2-视频检测结果" tabindex="-1"><a class="header-anchor" href="#_2-2-2-视频检测结果" aria-hidden="true">#</a> 2.2.2 视频检测结果</h4><p>对视频进行检测，StaticSaliencySpectralResidual，StaticSaliencyFineGrained，ObjectnessBING就是对每帧进行检测；MotionSaliencyBinWangApr2014就是对每帧图片进行运动建模和显著性检测。取视频第100帧显著性检测结果，结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片(768X576)</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/origin.jpg" alt="" loading="lazy"></td><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/SPECTRAL_RESIDUAL_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">3.2</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/FINE_GRAINED_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">119.2</td></tr><tr><td style="text-align:center;">ObjectnessBING</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/BING_draw.jpg" alt="" loading="lazy"></td><td style="text-align:center;">986.5</td></tr><tr><td style="text-align:center;">MotionSaliencyBinWangApr2014</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result//video/BinWangApr2014_saliencyMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">65.1</td></tr></tbody></table><p>二值化结果如下所示：</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片</th><th style="text-align:center;">单帧处理时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">StaticSaliencySpectralResidual</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/SPECTRAL_RESIDUAL_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">120.125</td></tr><tr><td style="text-align:center;">StaticSaliencyFineGrained</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]47 基于OpenCV实现视觉显著性检测/result/video/FINE_GRAINED_binaryMap.jpg" alt="" loading="lazy"></td><td style="text-align:center;">138.783</td></tr></tbody></table><h4 id="_2-2-3-效果评价" tabindex="-1"><a class="header-anchor" href="#_2-2-3-效果评价" aria-hidden="true">#</a> 2.2.3 效果评价</h4>`,19),z={href:"http://www.jsjkx.com/CN/10.11896/jsjkx.190900006",target:"_blank",rel:"noopener noreferrer"},L=l('<p>如果非要对OpenCV contrib库中的saliency模块所提供的视觉显著性检测算法进行评价，个人感觉如下：</p><ol><li>按速度而言StaticSaliencySpectralResidual效果最好，但是效果很差。ObjectnessBING速度上最慢，但是实际画框太多，靠运气成分决定效果。</li><li>StaticSaliencyFineGrained效果和速度都还不错，但是StaticSaliencyFineGrained获得的结果是一个高维图像，需要进行二值化转换。模块自带的computeBinaryMap函数进行二值化效果很不错，但是耗时，如果想要快速获得结果，直接阈值化即可。</li><li>MotionSaliencyBinWangApr2014加入了运动检测，效果和速度都很不错，但是建模时间过长，而且很容易出现鬼影，所以实际使用可以建模一段时间再使用，当运动检测算法也不错。</li><li>几乎所有的显著性检测算法随着图像分辨率变大，检测时间变的越长，所以将图片预处理缩小到一定分辨率以提高检测速度是很有必要的。</li><li>如果是复杂场景，最好不要用显著性检测算法，效果极差。</li></ol><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2><h3 id="_3-1-参考代码" tabindex="-1"><a class="header-anchor" href="#_3-1-参考代码" aria-hidden="true">#</a> 3.1 参考代码</h3>',4),W={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/saliency",target:"_blank",rel:"noopener noreferrer"},U=e("h3",{id:"_3-2-参考论文",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-2-参考论文","aria-hidden":"true"},"#"),i(" 3.2 参考论文")],-1),K={href:"http://bcmi.sjtu.edu.cn/~zhangliqing/Papers/2007CVPR_Houxiaodi_04270292.pdf",target:"_blank",rel:"noopener noreferrer"},H={href:"https://www.sciencedirect.com/science/article/abs/pii/S0262885609001371",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://mmcheng.net/bing/",target:"_blank",rel:"noopener noreferrer"},X={href:"https://ieeexplore.ieee.org/document/6910012/",target:"_blank",rel:"noopener noreferrer"},J={href:"http://www.jsjkx.com/CN/10.11896/jsjkx.190900006",target:"_blank",rel:"noopener noreferrer"},Q=e("h3",{id:"_3-2-参考文档",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-2-参考文档","aria-hidden":"true"},"#"),i(" 3.2 参考文档")],-1),Z={href:"https://blog.csdn.net/u010736662/article/details/88930849",target:"_blank",rel:"noopener noreferrer"},$={href:"https://zhuanlan.zhihu.com/p/115002897",target:"_blank",rel:"noopener noreferrer"},ee={href:"https://blog.csdn.net/wsp_1138886114/article/details/103211054",target:"_blank",rel:"noopener noreferrer"};function ie(ne,te){const n=s("ExternalLinkIcon");return d(),r("div",null,[u,v,e("p",null,[i("本文主要介绍基于OpenCV contrib库中的saliency模块实现视觉显著性检测算法，OpenCV contrib库中的saliency模块官方仓库见"),e("a",o,[i("saliency"),t(n)]),i("。关于视觉显著性检测算法更多详细介绍见："),e("a",m,[i("图像显著性检测论文及代码汇总"),t(n)])]),b,e("blockquote",null,[e("p",null,[e("a",p,[i("OpenCV_contrib库在windows下编译使用指南"),t(n)])])]),g,e("blockquote",null,[e("p",null,[e("a",h,[i("OpenCV-Practical-Exercise"),t(n)])])]),y,e("ul",null,[_,e("li",null,[i("论文："),e("a",f,[i("Saliency Detection: A Spectral Residual Approach"),t(n)])]),q,S]),x,e("ul",null,[M,e("li",null,[i("论文："),e("a",A,[i("Human detection using a mobile platform and novel features derived from a visual saliency mechanism"),t(n)])]),C,w]),R,e("ul",null,[j,e("li",null,[i("论文："),e("a",O,[i("BING: Binarized Normed Gradients for Objectness Estimation at 300fps"),t(n)])]),B,I]),N,e("ul",null,[V,e("li",null,[i("论文："),e("a",k,[i("A Fast Self-Tuning Background Subtraction Algorithm"),t(n)])]),G,E]),T,e("p",null,[i("更多关于OpenCV saliency模块的介绍可以见："),e("a",F,[i("OpenCV中的显著性检测（Saliency Detection）"),t(n)]),i("和"),e("a",P,[i("OpenCV—python 显着性检测二"),t(n)])]),D,e("p",null,[i("可以很认真的说，OpenCV contrib库中的saliency模块所提供的视觉显著性检测算法效果都很差，这个效果很差主要是现实落地上的意义，可以进行大规模测试。具体来说OpenCV提供的视觉显著性检测算法都只能应用于简单场景，复杂场景很容易出错，而且精度不如直接用目标识别来的快。当然现有的视觉显著性检测算法效果都很差，都无法实用，具体介绍可见："),e("a",z,[i("视觉图像显著性检测综述"),t(n)])]),L,e("ul",null,[e("li",null,[e("a",W,[i("saliency"),t(n)])])]),U,e("ul",null,[e("li",null,[e("a",K,[i("Saliency Detection: A Spectral Residual Approach"),t(n)])]),e("li",null,[e("a",H,[i("Human detection using a mobile platform and novel features derived from a visual saliency mechanism"),t(n)])]),e("li",null,[e("a",Y,[i("BING: Binarized Normed Gradients for Objectness Estimation at 300fps"),t(n)])]),e("li",null,[e("a",X,[i("A Fast Self-Tuning Background Subtraction Algorithm"),t(n)])]),e("li",null,[e("a",J,[i("视觉图像显著性检测综述"),t(n)])])]),Q,e("ul",null,[e("li",null,[e("a",Z,[i("图像显著性检测论文及代码汇总"),t(n)])]),e("li",null,[e("a",$,[i("OpenCV中的显著性检测（Saliency Detection）"),t(n)])]),e("li",null,[e("a",ee,[i("OpenCV—python 显着性检测二"),t(n)])])])])}const se=a(c,[["render",ie],["__file","2020-09-15-_OpenCV实战_47 基于OpenCV实现视觉显著性检测.html.vue"]]);export{se as default};
