import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as a,c as d,a as e,b as n,d as t,e as l}from"./app-MsA2k2kn.js";const c={},v=l('<h1 id="opencv实战-43-使用opencv进行背景分割" tabindex="-1"><a class="header-anchor" href="#opencv实战-43-使用opencv进行背景分割" aria-hidden="true">#</a> [OpenCV实战]43 使用OpenCV进行背景分割</h1><p>运动背景分割法Background Segment主要是指通过不同方法拟合模型建立背景图像，将当前帧与背景图像进行相减比较获得运动区域。下图所示为检测图像： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resframe.jpg?ref_type=heads" alt="" loading="lazy"></p><p>通过前面的检测帧建立背景模型，获得背景图像。然后检测图像与背景图像相减即为运动图像，黑色区域为背景，白色区域为运动目标，如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_resmog.jpg?ref_type=heads" alt="" loading="lazy"></p><p>在OpenCV标注库中有两种背景分割器：KNN，MOG2。但是实际上OpenCV_contrib库的bgsegm模块中还有其他几种背景分割器。本文主要介绍OpenCV_contrib中的运动背景分割模型及其用法，并对不同检测模型的性能和效果进行对比。</p><p>@[toc]</p><h2 id="_1-方法介绍" tabindex="-1"><a class="header-anchor" href="#_1-方法介绍" aria-hidden="true">#</a> 1 方法介绍</h2><p>OpenCV_contrib中bgsegm模块主要有GMG, CNT, KNN, MOG, MOG2, GSOC, LSBP等7种背景分割器，其中KNN,MOG2可以在OpenCV标准库中直接使用，其他需要在OpenCV_contrib库中使用。具体各个方法介绍如下：</p><ul><li>GMG：基于像素颜色进行背景建模</li><li>CNT：基于像素点计数进行背景建模</li><li>KNN：基于K最近邻进行背景建模</li><li>MOG：基于混合高斯进行背景建模</li><li>MOG2：基于混合高斯进行背景建模，MOG的升级版本</li><li>GSOC：类似LSBP</li><li>LSBP：基于LBP进行背景建模</li></ul><p>各个方法提出时间、相关论文和OpenCV函数接口介绍如下表所示：</p>',9),u=e("thead",null,[e("tr",null,[e("th",null,"方法"),e("th",{style:{"text-align":"center"}},"提出时间"),e("th",null,"OpenCV函数接口介绍")])],-1),o=e("td",null,"GMG",-1),m={style:{"text-align":"center"}},b={href:"https://www.researchgate.net/publication/261311764_Visual_tracking_of_human_visitors_under_variable-lighting_conditions_for_a_responsive_audio_art_installation",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.opencv.org/master/d1/d5c/classcv_1_1bgsegm_1_1BackgroundSubtractorGMG.html",target:"_blank",rel:"noopener noreferrer"},_=e("td",null,"CNT",-1),p={style:{"text-align":"center"}},h={href:"https://github.com/sagi-z/BackgroundSubtractorCNT",target:"_blank",rel:"noopener noreferrer"},f={href:"https://docs.opencv.org/master/de/dca/classcv_1_1bgsegm_1_1BackgroundSubtractorCNT.html",target:"_blank",rel:"noopener noreferrer"},O=e("td",null,"KNN",-1),N={style:{"text-align":"center"}},S={href:"https://www.sciencedirect.com/science/article/abs/pii/S0167865505003521",target:"_blank",rel:"noopener noreferrer"},C={href:"https://docs.opencv.org/master/db/d88/classcv_1_1BackgroundSubtractorKNN.html#details",target:"_blank",rel:"noopener noreferrer"},G=e("td",null,"MOG",-1),k={style:{"text-align":"center"}},y={href:"http://www.ee.surrey.ac.uk/CVSSP/Publications/papers/KaewTraKulPong-AVBS01.pdf",target:"_blank",rel:"noopener noreferrer"},x={href:"https://docs.opencv.org/master/d6/da7/classcv_1_1bgsegm_1_1BackgroundSubtractorMOG.html",target:"_blank",rel:"noopener noreferrer"},M=e("td",null,"MOG2",-1),T={style:{"text-align":"center"}},q={href:"http://ieeexplore.ieee.org/xpls/icp.jsp?arnumber=1333992",target:"_blank",rel:"noopener noreferrer"},B={href:"https://docs.opencv.org/master/d7/d7b/classcv_1_1BackgroundSubtractorMOG2.html#details",target:"_blank",rel:"noopener noreferrer"},V=e("td",null,"GSOC",-1),P=e("td",{style:{"text-align":"center"}},"2016",-1),w={href:"https://docs.opencv.org/master/d4/dd5/classcv_1_1bgsegm_1_1BackgroundSubtractorGSOC.html#details",target:"_blank",rel:"noopener noreferrer"},L=e("td",null,"LSBP",-1),A={style:{"text-align":"center"}},E={href:"https://www.cv-foundation.org/openaccess/content_cvpr_2016_workshops/w24/papers/Guo_Background_Subtraction_Using_CVPR_2016_paper.pdf",target:"_blank",rel:"noopener noreferrer"},K={href:"https://docs.opencv.org/master/de/d4c/classcv_1_1bgsegm_1_1BackgroundSubtractorLSBP.html#details",target:"_blank",rel:"noopener noreferrer"},j=e("p",null,"OpenCV contrib库的编译安装见：",-1),I={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},H=e("h2",{id:"_2-代码与方法评估",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-代码与方法评估","aria-hidden":"true"},"#"),n(" 2 代码与方法评估")],-1),R=e("h3",{id:"_2-1-代码",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-1-代码","aria-hidden":"true"},"#"),n(" 2.1 代码")],-1),F=e("p",null,"下述代码介绍了OpenCV_contrib的bgsegm模块中不同背景分割方法C++和Python的调用。对比了不同背景分割方法在示例视频下，单线程和多线程的效果。",-1),z=e("p",null,"代码和示例视频下载地址：",-1),U={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},Y=l(`<p>完整代码如下：</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/bgsegm.hpp&gt;
#include &lt;iostream&gt;

using namespace cv;
using namespace cv::bgsegm;

const String algos[7] = { &quot;GMG&quot;, &quot;CNT&quot;, &quot;KNN&quot;, &quot;MOG&quot;, &quot;MOG2&quot;, &quot;GSOC&quot;, &quot;LSBP&quot; };

// 创建不同的背景分割识别器
static Ptr&lt;BackgroundSubtractor&gt; createBGSubtractorByName(const String&amp; algoName)
{
	Ptr&lt;BackgroundSubtractor&gt; algo;
	if (algoName == String(&quot;GMG&quot;))
		algo = createBackgroundSubtractorGMG(20, 0.7);
	else if (algoName == String(&quot;CNT&quot;))
		algo = createBackgroundSubtractorCNT();
	else if (algoName == String(&quot;KNN&quot;))
		algo = createBackgroundSubtractorKNN();
	else if (algoName == String(&quot;MOG&quot;))
		algo = createBackgroundSubtractorMOG();
	else if (algoName == String(&quot;MOG2&quot;))
		algo = createBackgroundSubtractorMOG2();
	else if (algoName == String(&quot;GSOC&quot;))
		algo = createBackgroundSubtractorGSOC();
	else if (algoName == String(&quot;LSBP&quot;))
		algo = createBackgroundSubtractorLSBP();

	return algo;
}

int main()
{
	// 视频路径
	String videoPath = &quot;./video/vtest.avi&quot;;

	// 背景分割识别器序号
	int algo_index = 0;
	// 创建背景分割识别器
	Ptr&lt;BackgroundSubtractor&gt; bgfs = createBGSubtractorByName(algos[algo_index]);

	// 打开视频
	VideoCapture cap;
	cap.open(videoPath);

	// 如果视频没有打开
	if (!cap.isOpened())
	{
		std::cerr &lt;&lt; &quot;Cannot read video. Try moving video file to sample directory.&quot; &lt;&lt; std::endl;
		return -1;
	}

	// 输入图像
	Mat frame;
	// 运动前景
	Mat fgmask;
	// 最后显示的图像
	Mat segm;

	// 延迟等待时间
	int delay = 30;
	// 获得运行环境CPU的核心数
	int nthreads = getNumberOfCPUs();
	// 设置线程数
	setNumThreads(nthreads);

	// 是否显示运动前景
	bool show_fgmask = false;

	// 平均执行时间
	float average_Time = 0.0;
	// 当前帧数
	int frame_num = 0;
	// 总执行时间
	float sum_Time = 0.0;

	for (;;)
	{
		// 提取帧
		cap &gt;&gt; frame;

		// 如果图片为空
		if (frame.empty())
		{
			// CAP_PROP_POS_FRAMES表示当前帧
			// 本句话表示将当前帧设定为第0帧
			cap.set(CAP_PROP_POS_FRAMES, 0);
			cap &gt;&gt; frame;
		}

		double time0 = static_cast&lt;double&gt;(getTickCount());

		// 背景建模
		bgfs-&gt;apply(frame, fgmask);
		time0 = ((double)getTickCount() - time0) / getTickFrequency();
		// 总执行时间
		sum_Time += time0;
		// 平均每帧执行时间
		average_Time = sum_Time / (frame_num + 1);

		if (show_fgmask)
		{
			segm = fgmask;
		}
		else
		{
			// 根据segm = alpha * frame + beta改变图片
			// 参数分别为，输出图像，输出图像格式，alpha值，beta值
			frame.convertTo(segm, CV_8U, 0.5);
			// 图像叠加
			// 参数分别为，输入图像/颜色1，输入图像/颜色2，输出图像，掩膜
			// 掩膜表示叠加范围
			add(frame, Scalar(100, 100, 0), segm, fgmask);
		}

		// 显示当前方法
		cv::putText(segm, algos[algo_index], Point(10, 30), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);
		// 显示当前线程数
		cv::putText(segm, format(&quot;%d threads&quot;, nthreads), Point(10, 60), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);
		// 显示当前每帧执行时间
		cv::putText(segm, format(&quot;averageTime %f s&quot;, average_Time), Point(10, 90), FONT_HERSHEY_PLAIN, 2.0, Scalar(255, 0, 255), 2, LINE_AA);

		cv::imshow(&quot;FG Segmentation&quot;, segm);

		int c = waitKey(delay);

		// 修改等待时间
		if (c == &#39; &#39;)
		{
			delay = delay == 30 ? 1 : 30;
		}

		// 按C背景分割识别器
		if (c == &#39;c&#39; || c == &#39;C&#39;)
		{
			algo_index++;
			if (algo_index &gt; 6)
				algo_index = 0;

			bgfs = createBGSubtractorByName(algos[algo_index]);
		}

		// 设置线程数
		if (c == &#39;n&#39; || c == &#39;N&#39;)
		{
			nthreads++;
			if (nthreads &gt; 8)
				nthreads = 1;

			setNumThreads(nthreads);
		}

		// 是否显示背景
		if (c == &#39;m&#39; || c == &#39;M&#39;)
		{
			show_fgmask = !show_fgmask;
		}

		// 退出
		if (c == &#39;q&#39; || c == &#39;Q&#39; || c == 27)
		{
			break;
		}

		// 当前帧数增加
		frame_num++;
		if (100 == frame_num)
		{
			String strSave = &quot;out_&quot; + algos[algo_index] + &quot;.jpg&quot;;
			imwrite(strSave, segm);
		}
	}

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Wed Aug 12 19:20:56 2020

@author: luohenyueji
&quot;&quot;&quot;

import cv2
from time import *

# TODO 背景减除算法集合
ALGORITHMS_TO_EVALUATE = [
    (cv2.bgsegm.createBackgroundSubtractorGMG(20, 0.7), &#39;GMG&#39;),
    (cv2.bgsegm.createBackgroundSubtractorCNT(), &#39;CNT&#39;),
    (cv2.createBackgroundSubtractorKNN(), &#39;KNN&#39;),
    (cv2.bgsegm.createBackgroundSubtractorMOG(), &#39;MOG&#39;),
    (cv2.createBackgroundSubtractorMOG2(), &#39;MOG2&#39;),
    (cv2.bgsegm.createBackgroundSubtractorGSOC(), &#39;GSOC&#39;),
    (cv2.bgsegm.createBackgroundSubtractorLSBP(), &#39;LSBP&#39;),
]


# TODO 主函数
def main():
    # 背景分割识别器序号
    algo_index = 0
    subtractor = ALGORITHMS_TO_EVALUATE[algo_index][0]
    videoPath = &quot;./video/vtest.avi&quot;
    show_fgmask = False

    # 获得运行环境CPU的核心数
    nthreads = cv2.getNumberOfCPUs()
    # 设置线程数
    cv2.setNumThreads(nthreads)

    # 读取视频
    capture = cv2.VideoCapture(videoPath)

    # 当前帧数
    frame_num = 0
    # 总执行时间
    sum_Time = 0.0

    while True:
        ret, frame = capture.read()
        if not ret:
            return
        begin_time = time()
        fgmask = subtractor.apply(frame)
        end_time = time()
        run_time = end_time - begin_time
        sum_Time = sum_Time + run_time
        # 平均执行时间
        average_Time = sum_Time / (frame_num + 1)

        if show_fgmask:
            segm = fgmask
        else:
            segm = (frame * 0.5).astype(&#39;uint8&#39;)
            cv2.add(frame, (100, 100, 0, 0), segm, fgmask)

        # 显示当前方法
        cv2.putText(segm, ALGORITHMS_TO_EVALUATE[algo_index][1], (10, 30), cv2.FONT_HERSHEY_PLAIN, 2.0, (255, 0, 255),
                    2,
                    cv2.LINE_AA)
        # 显示当前线程数
        cv2.putText(segm, str(nthreads) + &quot; threads&quot;, (10, 60), cv2.FONT_HERSHEY_PLAIN, 2.0, (255, 0, 255), 2,
                    cv2.LINE_AA)
        # 显示当前每帧执行时间
        cv2.putText(segm, &quot;averageTime {} s&quot;.format(average_Time), (10, 90), cv2.FONT_HERSHEY_PLAIN, 2.0,
                    (255, 0, 255), 2, cv2.LINE_AA);

        cv2.imshow(&#39;some&#39;, segm)
        key = cv2.waitKey(1) &amp; 0xFF
        frame_num = frame_num + 1

        # 按&#39;q&#39;健退出循环
        if key == ord(&#39;q&#39;):
            break

    cv2.destroyAllWindows()


if __name__ == &#39;__main__&#39;:
    main()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-评价" tabindex="-1"><a class="header-anchor" href="#_2-2-评价" aria-hidden="true">#</a> 2.2 评价</h3><p>在i5六代CPU(太渣就不具体介绍)，12G内存，VS2017 C++ Release平台下，各种方法处理速度如下表所示。</p><table><thead><tr><th style="text-align:center;">方法</th><th style="text-align:center;">单线程单帧处理平均时间/ms</th><th style="text-align:center;">四线程单帧处理平均时间/ms</th></tr></thead><tbody><tr><td style="text-align:center;">GMG</td><td style="text-align:center;">38.6</td><td style="text-align:center;">31.3</td></tr><tr><td style="text-align:center;">CNT</td><td style="text-align:center;">4.6</td><td style="text-align:center;">2.9</td></tr><tr><td style="text-align:center;">KNN</td><td style="text-align:center;">19.8</td><td style="text-align:center;">9.3</td></tr><tr><td style="text-align:center;">MOG</td><td style="text-align:center;">16.3</td><td style="text-align:center;">15.6</td></tr><tr><td style="text-align:center;">MOG2</td><td style="text-align:center;">15.3</td><td style="text-align:center;">7.7</td></tr><tr><td style="text-align:center;">GSOC</td><td style="text-align:center;">66.3</td><td style="text-align:center;">49.4</td></tr><tr><td style="text-align:center;">LSBP</td><td style="text-align:center;">193.8</td><td style="text-align:center;">94.9</td></tr></tbody></table><p>各个方法，个人评价如下：</p><ul><li><p>GMG 初始建模帧会快速变化，导致全屏运动，对邻近运动目标检测效果一般，GMG需要自行设定参数（所以新的OpenCV标准库移除了GMG）总体效果一般。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_GMG.jpg" alt="" loading="lazy"></p></li><li><p>CNT 初始建模帧在一段时间持续变化导致全屏运动，运动目标过快可能会出现鬼影，低端设备速度很快，高端硬件速度和MOG2相近，总体效果不错。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_CNT.jpg" alt="" loading="lazy"></p></li><li><p>KNN 初始建模在一段时间持续变化导致全屏运动，运动目标都能较好检测出来，速度也还不错，总体效果不错。效果如图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_KNN.jpg" alt="" loading="lazy"></p></li><li><p>MOG 建模会丢失运动目标，速度不错，总体效果不错。效果如图所示：</p></li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_MOG.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>MOG2 运动区域过大，容易出现细微变化区域，总体效果最好，MOG的升级版本，运动区域基本能检测出来，不过需要自行设定参数。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_MOG2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>GSOC 建模时间过短出现鬼影，随着建模时间越来越长，检测效果会变好，会逐渐消除鬼影，LSBP的升级版本，相对还行。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_GSOC.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>LSBP 极易出现鬼影，建模次数越多，建模消耗时间有所减少，但是鬼影会偶尔出现。效果如图所示：</li></ul><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]43 使用OpenCV进行背景分割/out_LSBP.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-3-方法选择" tabindex="-1"><a class="header-anchor" href="#_2-3-方法选择" aria-hidden="true">#</a> 2.3 方法选择</h3><ul><li><p>追求速度 CNT or MOG2 or KNN 如果是低端设备或者并行任务多毫无疑问是CNT最好,高端设备还是MOG2更好，毕竟MOG2检测效果优于CNT，KNN也是不错的选择。</p></li><li><p>追求质量 MOG2 or KNN or GSOC 检测质量MOG2和KNN差不多，GSOC建模时间长会很不错，但是GSOC太慢了。如果不在意速度GSOC很好，其他还是MOG2和KNN。</p></li><li><p>平衡质量和速度 MOG2 or KNN 质量和速度均衡MOG2和KNN最不错，不然为什么MOG2和KNN放在标准库，其他在contrib库。MOG2需要调整参数，不过速度和质量优于KNN。如果图省心，不想调整参数，选KNN最好。</p></li></ul><p>总的来说实际应用中，MOG2用的最多，KNN其次，CNT一般用于树莓派和多检测任务中。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,21),D={href:"https://docs.opencv.org/master/d2/d55/group__bgsegm.html#gga1a5838fa2d2697ac455b136bfcdb4600ad8f108b7815d6bcccd32b849063e0a9c",target:"_blank",rel:"noopener noreferrer"},J={href:"https://github.com/opencv/opencv_contrib/tree/master/modules/bgsegm",target:"_blank",rel:"noopener noreferrer"},W={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://blog.csdn.net/Anderson_Y/article/details/82082095",target:"_blank",rel:"noopener noreferrer"};function X(Z,$){const i=r("ExternalLinkIcon");return a(),d("div",null,[v,e("table",null,[u,e("tbody",null,[e("tr",null,[o,e("td",m,[e("a",b,[n("2012"),t(i)])]),e("td",null,[e("a",g,[n("BackgroundSubtractorGMG"),t(i)])])]),e("tr",null,[_,e("td",p,[e("a",h,[n("2016"),t(i)])]),e("td",null,[e("a",f,[n("BackgroundSubtractorCNT"),t(i)])])]),e("tr",null,[O,e("td",N,[e("a",S,[n("2006"),t(i)])]),e("td",null,[e("a",C,[n("BackgroundSubtractorKNN"),t(i)])])]),e("tr",null,[G,e("td",k,[e("a",y,[n("2001"),t(i)])]),e("td",null,[e("a",x,[n("BackgroundSubtractorMOG"),t(i)])])]),e("tr",null,[M,e("td",T,[e("a",q,[n("2004"),t(i)])]),e("td",null,[e("a",B,[n("BackgroundSubtractorMOG2"),t(i)])])]),e("tr",null,[V,P,e("td",null,[e("a",w,[n("BackgroundSubtractorGSOC"),t(i)])])]),e("tr",null,[L,e("td",A,[e("a",E,[n("2016"),t(i)])]),e("td",null,[e("a",K,[n("BackgroundSubtractorLSBP"),t(i)])])])])]),j,e("blockquote",null,[e("p",null,[e("a",I,[n("OpenCV_contrib库在windows下编译使用指南"),t(i)])])]),H,R,F,z,e("p",null,[e("a",U,[n("https://github.com/luohenyueji/OpenCV-Practical-Exercise"),t(i)])]),Y,e("ul",null,[e("li",null,[e("blockquote",null,[e("p",null,[e("a",D,[n("OpenCV官方背景分割介绍"),t(i)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",J,[n("OpenCV bgsegm官方仓库"),t(i)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",W,[n("OpenCV_contrib库在windows下编译使用指南"),t(i)])])])]),e("li",null,[e("blockquote",null,[e("p",null,[e("a",Q,[n("背景减除(Background Segment)"),t(i)])])])])])])}const ie=s(c,[["render",X],["__file","2020-08-14-_OpenCV实战_43 使用OpenCV进行背景分割.html.vue"]]);export{ie as default};
