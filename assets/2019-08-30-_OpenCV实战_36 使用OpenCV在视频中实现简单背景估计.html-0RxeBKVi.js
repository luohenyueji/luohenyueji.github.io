import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c as m,a as e,b as n,d as a,e as c}from"./app-MsA2k2kn.js";const s={},l=c(`<h1 id="opencv实战-36-使用opencv在视频中实现简单背景估计" tabindex="-1"><a class="header-anchor" href="#opencv实战-36-使用opencv在视频中实现简单背景估计" aria-hidden="true">#</a> [OpenCV实战]36 使用OpenCV在视频中实现简单背景估计</h1><p>许多计算机视觉应用中，硬件配置往往较低。在这种情况下，我们必须使用简单而有效的技术。在这篇文章中，我们将介绍一种这样的技术，用于在摄像机静态并且场景中有一些移动物体时估计场景的背景。这种情况并不罕见。例如，许多交通和监控摄像机都是严格固定的。</p><h2 id="_1-时间中值滤波" tabindex="-1"><a class="header-anchor" href="#_1-时间中值滤波" aria-hidden="true">#</a> 1 时间中值滤波</h2><p>为了理解我们将在本文中描述的想法，让我们考虑一维中的一个更简单的问题。假设我们每10毫秒估算一个数量（比如房间的温度）。比方说，房间的温度是华氏70度。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]36 使用OpenCV在视频中实现简单背景估计/20190830162140696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在上图中，我们显示了两个温度计的测量结果，一个好的温度计和一个坏的温度计。左边显示的好温度计报告70度，有一定程度的高斯噪声。为了更准确地估算温度，我们可以简单地在几秒钟内对这些值进行平均。由于噪声是具有正值和负值的高斯噪声，因此平均值将抵消噪声。实际上，这个特定情况下的平均值是70.01。</p><p>另一方面，坏温度计在大多数情况下表现得像好温度计，但有时，数字完全错误。事实上，如果我们采用坏温度计报告的平均值，我们得到71.07度。这显然是高估了。</p><p>我们还能得到很好的温度估算吗？答案是肯定的。当数据包含异常值时，中位数是我们试图估计的值的更稳健估计。当按升序或降序排序时，中位数是数据的中间值。上面右边显示的曲线的中值是70.05度，这是一个比71.07度更好的估计值。唯一的缺点是，与平均值相比，中位数的计算成本更高。</p><h2 id="_2-使用中值进行背景估计" tabindex="-1"><a class="header-anchor" href="#_2-使用中值进行背景估计" aria-hidden="true">#</a> 2 使用中值进行背景估计</h2><p>现在，让我们回到相机静止时估计背景的问题。</p><p>我们可以假设大多数时候，每个像素都看到同一块背景，因为相机没有移动。偶尔，汽车或其他移动物体会出现在前方并遮挡背景。对于视频序列，我们可以随机采样几帧（比如25帧）。</p><p>换句话说，对于每个像素，我们现在有25个背景估计值。只要一个像素没有被汽车或其他移动物体覆盖超过50％的时间，这些像素的中值将给出该像素背景的良好估计。我们可以为每个像素重复此操作并恢复整个背景。代码如下：</p><p>C++版本</p><pre><code>#include &lt;opencv2/opencv.hpp&gt;
#include &lt;iostream&gt;
#include &lt;random&gt;
 
using namespace std;
using namespace cv;

int computeMedian(vector&lt;int&gt; elements) 
{
  nth_element(elements.begin(), elements.begin()+elements.size()/2, elements.end());
 
  //sort(elements.begin(),elements.end());
  return elements[elements.size()/2];
}
 
cv::Mat compute_median(std::vector&lt;cv::Mat&gt; vec) 
{
  // Note: Expects the image to be CV_8UC3
  cv::Mat medianImg(vec[0].rows, vec[0].cols, CV_8UC3, cv::Scalar(0, 0, 0));
 
  for(int row=0; row&lt;vec[0].rows; row++) 
  {
    for(int col=0; col&lt;vec[0].cols; col++) 
    {
      std::vector&lt;int&gt; elements_B;
      std::vector&lt;int&gt; elements_G;
      std::vector&lt;int&gt; elements_R;
 
      for(int imgNumber=0; imgNumber&lt;vec.size(); imgNumber++) 
      {
        int B = vec[imgNumber].at&lt;cv::Vec3b&gt;(row, col)[0];
        int G = vec[imgNumber].at&lt;cv::Vec3b&gt;(row, col)[1];
        int R = vec[imgNumber].at&lt;cv::Vec3b&gt;(row, col)[2];
 
        elements_B.push_back(B);
        elements_G.push_back(G);
        elements_R.push_back(R);
      }
 
      medianImg.at&lt;cv::Vec3b&gt;(row, col)[0]= computeMedian(elements_B);
      medianImg.at&lt;cv::Vec3b&gt;(row, col)[1]= computeMedian(elements_G);
      medianImg.at&lt;cv::Vec3b&gt;(row, col)[2]= computeMedian(elements_R);
    }
  }
  return medianImg;
}

int main(int argc, char const *argv[])
{
  std::string video_file;
  // Read video file
  if(argc &gt; 1)
  {
    video_file = argv[1];
  } else
  {
    video_file = &quot;video.mp4&quot;;
  }
 
  VideoCapture cap(video_file);
  if(!cap.isOpened())
    cerr &lt;&lt; &quot;Error opening video file\\n&quot;;
 
  // Randomly select 25 frames
  default_random_engine generator;
  uniform_int_distribution&lt;int&gt;distribution(0, 
  cap.get(CAP_PROP_FRAME_COUNT));
 
  vector&lt;Mat&gt; frames;
  Mat frame;
 
  for(int i=0; i&lt;25; i++) 
  {
    int fid = distribution(generator);
    cap.set(CAP_PROP_POS_FRAMES, fid);
    Mat frame;
    cap &gt;&gt; frame;
    if(frame.empty())
      continue;
    frames.push_back(frame);
  }
  // Calculate the median along the time axis
  Mat medianFrame = compute_median(frames);
 
  // Display median frame
  imshow(&quot;frame&quot;, medianFrame);
  waitKey(0);
}
</code></pre><p>python版本</p><pre><code>import numpy as np
import cv2
from skimage import data, filters
 
# Open Video
cap = cv2.VideoCapture(&#39;video.mp4&#39;)
 
# Randomly select 25 frames
frameIds = cap.get(cv2.CAP_PROP_FRAME_COUNT) * np.random.uniform(size=25)
 
# Store selected frames in an array
frames = []
for fid in frameIds:
    cap.set(cv2.CAP_PROP_POS_FRAMES, fid)
    ret, frame = cap.read()
    frames.append(frame)
 
# Calculate the median along the time axis
medianFrame = np.median(frames, axis=0).astype(dtype=np.uint8)    
 
# Display median frame
cv2.imshow(&#39;frame&#39;, medianFrame)
cv2.waitKey(0)
</code></pre><p>如您所见，我们随机选择25帧并计算25帧内每个像素的中位数。只要每个像素至少有50％的时间看到背景，这个中间帧就是对背景的良好估计。</p><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]36 使用OpenCV在视频中实现简单背景估计/20190830162140725.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-帧差分" tabindex="-1"><a class="header-anchor" href="#_3-帧差分" aria-hidden="true">#</a> 3 帧差分</h2><p>显而易见的下一个问题是，我们是否可以为每个帧创建一个掩码，该掩码显示运动中的图像部分。这可以通过以下步骤完成：</p><ol><li>将中间帧转换为灰度。</li><li>循环播放视频中的所有帧。提取当前帧并将其转换为灰度。</li><li>计算当前帧和中间帧之间的绝对差值。</li><li>对上面的图像进行阈值化以消除噪音并将输出二值化。</li></ol><p>我们来看看代码吧。</p><p>C++版本</p><pre><code>//  Reset frame number to 0
cap.set(CAP_PROP_POS_FRAMES, 0);
 
// Convert background to grayscale
Mat grayMedianFrame;
cvtColor(medianFrame, grayMedianFrame, COLOR_BGR2GRAY);
 
// Loop over all frames
while(1) 
{
  // Read frame
  cap &gt;&gt; frame;
 
  if (frame.empty())
    break;
 
  // Convert current frame to grayscale
  cvtColor(frame, frame, COLOR_BGR2GRAY);
 
  // Calculate absolute difference of current frame and the median frame
  Mat dframe;
  absdiff(frame, grayMedianFrame, dframe);
 
  // Threshold to binarize
  threshold(dframe, dframe, 30, 255, THRESH_BINARY);
 
  // Display Image
  imshow(&quot;frame&quot;, dframe);
  waitKey(20);
}
 
  cap.release();
  return 0;
}
</code></pre><p>python版本</p><pre><code># Reset frame number to 0
cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
 
# Convert background to grayscale
grayMedianFrame = cv2.cvtColor(medianFrame, cv2.COLOR_BGR2GRAY)
 
# Loop over all frames
ret = True
while(ret):
 
  # Read frame
  ret, frame = cap.read()
  # Convert current frame to grayscale
  frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
  # Calculate absolute difference of current frame and 
  # the median frame
  dframe = cv2.absdiff(frame, grayMedianFrame)
  # Treshold to binarize
  th, dframe = cv2.threshold(dframe, 30, 255, cv2.THRESH_BINARY)
  # Display image
  cv2.imshow(&#39;frame&#39;, dframe)
  cv2.waitKey(20)
 
# Release video object
cap.release()
 
# Destroy all windows
cv2.destroyAllWindows()
</code></pre><h2 id="_4-总结和代码" tabindex="-1"><a class="header-anchor" href="#_4-总结和代码" aria-hidden="true">#</a> 4 总结和代码</h2><p>对于本文描述的方法，如文章题目一样简单背景估计，用于做运动检测非常不准确，所选择的中间帧不一定能够完整代表实际环境（如果大部分都是运动的物体就完蛋了）。此外中间帧选取时计算量过大，速度太慢，不推荐使用，运动检测还是老老实实用混合高斯或者vibe。</p><p>本文所有代码见：</p>`,30),d={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"具体代码如下：",-1),f=e("p",null,"C++：",-1),_=e("pre",null,[e("code",null,`#include "pch.h"
#include <opencv2/opencv.hpp>
#include <iostream>
#include <random>

using namespace std;
using namespace cv;

// 计算中值
int computeMedian(vector<int> elements)
{
	// 对图像进行排序，并返回中间值
	nth_element(elements.begin(), elements.begin() + elements.size() / 2, elements.end());
	//sort(elements.begin(),elements.end());

	return elements[elements.size() / 2];
}

// 获得中值图像
cv::Mat compute_median(std::vector<cv::Mat> vec)
{
	// Note: Expects the image to be CV_8UC3
	// 中值图像
	cv::Mat medianImg(vec[0].rows, vec[0].cols, CV_8UC3, cv::Scalar(0, 0, 0));

	// 循环遍历每一个像素点
	for (int row = 0; row < vec[0].rows; row++)
	{
		for (int col = 0; col < vec[0].cols; col++)
		{
			std::vector<int> elements_B;
			std::vector<int> elements_G;
			std::vector<int> elements_R;

			// 遍历所有图像
			for (int imgNumber = 0; imgNumber < vec.size(); imgNumber++)
			{
				// 提取当前点BGR值
				int B = vec[imgNumber].at<cv::Vec3b>(row, col)[0];
				int G = vec[imgNumber].at<cv::Vec3b>(row, col)[1];
				int R = vec[imgNumber].at<cv::Vec3b>(row, col)[2];

				elements_B.push_back(B);
				elements_G.push_back(G);
				elements_R.push_back(R);
			}

			// 计算中值
			medianImg.at<cv::Vec3b>(row, col)[0] = computeMedian(elements_B);
			medianImg.at<cv::Vec3b>(row, col)[1] = computeMedian(elements_G);
			medianImg.at<cv::Vec3b>(row, col)[2] = computeMedian(elements_R);
		}
	}
	return medianImg;
}

int main()
{
	// 视频地址
	std::string video_file = "./video/video.mp4";

	// 打开视频文件
	VideoCapture cap(video_file);

	if (!cap.isOpened())
	{
		cerr << "Error opening video file\\n";
	}

	// Randomly select 25 frames
	// 随机选取25帧图像
	default_random_engine generator;
	// cap.get(CAP_PROP_FRAME_COUNT)视频帧数
	uniform_int_distribution<int> distribution(0, cap.get(CAP_PROP_FRAME_COUNT));

	// 25张图像集合
	vector<Mat> frames;
	Mat frame;

	// 随机从视频片段中挑选25张图像
	for (int i = 0; i < 25; i++)
	{
		// 获取序号
		int fid = distribution(generator);
		cap.set(CAP_PROP_POS_FRAMES, fid);
		Mat frame;
		cap >> frame;
		if (frame.empty())
		{
			continue;
		}
		frames.push_back(frame);
	}

	// Calculate the median along the time axis
	Mat medianFrame = compute_median(frames);

	// Display median frame
	// 显示中值图像帧
	imshow("frame", medianFrame);
	waitKey(0);

	//  Reset frame number to 0
	// 重新从第0帧开始
	cap.set(CAP_PROP_POS_FRAMES, 0);

	// Convert background to grayscale
	// 将背景转换为灰度图
	Mat grayMedianFrame;
	cvtColor(medianFrame, grayMedianFrame, COLOR_BGR2GRAY);

	// Loop over all frames
	while (1)
	{
		// Read frame
		// 读取帧
		cap >> frame;

		if (frame.empty())
		{
			break;
		}

		// Convert current frame to grayscale
		// 将图转换为灰度图
		cvtColor(frame, frame, COLOR_BGR2GRAY);

		// Calculate absolute difference of current frame and the median frame
		Mat dframe;
		// 差分
		absdiff(frame, grayMedianFrame, dframe);

		// Threshold to binarize
		// 二值化
		threshold(dframe, dframe, 30, 255, THRESH_BINARY);

		// Display Image
		imshow("frame", dframe);
		waitKey(20);
	}

	cap.release();
	return 0;
}
`)],-1),u=e("p",null,"python：",-1),v=e("pre",null,[e("code",null,`import numpy as np
import cv2

# Open Video
cap = cv2.VideoCapture('video/video.mp4')

# Randomly select 25 frames
frameIds = cap.get(cv2.CAP_PROP_FRAME_COUNT) * np.random.uniform(size=25)

# Store selected frames in an array
frames = []
for fid in frameIds:
    cap.set(cv2.CAP_PROP_POS_FRAMES, fid)
    ret, frame = cap.read()
    frames.append(frame)

# Calculate the median along the time axis
medianFrame = np.median(frames, axis=0).astype(dtype=np.uint8)

# Display median frame
cv2.imshow('frame', medianFrame)
cv2.waitKey(0)

# Reset frame number to 0
cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

# Convert background to grayscale
grayMedianFrame = cv2.cvtColor(medianFrame, cv2.COLOR_BGR2GRAY)

# Loop over all frames
ret = True
while(ret):

    # Read frame
    ret, frame = cap.read()
    if frame is None:
        break
    # Convert current frame to grayscale
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # Calculate absolute difference of current frame and
    # the median frame
    dframe = cv2.absdiff(frame, grayMedianFrame)
    # Treshold to binarize
    th, dframe = cv2.threshold(dframe, 30, 255, cv2.THRESH_BINARY)
    # Display image
    cv2.imshow('frame', dframe)
    cv2.waitKey(20)

# Release video object
cap.release()

# Destroy all windows
cv2.destroyAllWindows()
`)],-1),g=e("h2",{id:"_5-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_5-参考","aria-hidden":"true"},"#"),n(" 5 参考")],-1),h={href:"https://www.learnopencv.com/simple-background-estimation-in-videos-using-opencv-c-python/",target:"_blank",rel:"noopener noreferrer"};function b(R,C){const t=i("ExternalLinkIcon");return o(),m("div",null,[l,e("p",null,[e("a",d,[n(" https://github.com/luohenyueji/OpenCV-Practical-Exercise "),a(t)])]),p,f,_,u,v,g,e("ul",null,[e("li",null,[e("a",h,[n(" https://www.learnopencv.com/simple-background-estimation-in-videos-using-opencv-c-python/ "),a(t)])])])])}const O=r(s,[["render",b],["__file","2019-08-30-_OpenCV实战_36 使用OpenCV在视频中实现简单背景估计.html.vue"]]);export{O as default};
