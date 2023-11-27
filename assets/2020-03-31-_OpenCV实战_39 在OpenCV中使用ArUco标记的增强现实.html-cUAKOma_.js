import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as a,c as l,a as e,b as i,d as t,e as s}from"./app-MsA2k2kn.js";const c={},v=e("h1",{id:"opencv实战-39-在opencv中使用aruco标记的增强现实",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-39-在opencv中使用aruco标记的增强现实","aria-hidden":"true"},"#"),i(" [OpenCV实战]39 在OpenCV中使用ArUco标记的增强现实")],-1),m=e("p",null,"在本文中，我们将解释什么是ArUco标记以及如何使用OpenCV将其用于简单的增强现实任务。ArUco标记器已在增强现实，相机姿态估计和相机校准中使用了一段时间。让我们进一步了解它们。",-1),u=e("h2",{id:"_1-什么是aruco标记",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-什么是aruco标记","aria-hidden":"true"},"#"),i(" 1 什么是ArUco标记？")],-1),o=e("p",null,"ArUco标记最初由S.Garrido-Jurado等人于2014年开发，具体见文献：",-1),b={href:"https://www.researchgate.net/publication/260251570_Automatic_generation_and_detection_of_highly_reliable_fiducial_markers_under_occlusion",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"ArUco代表科尔多瓦大学的增强现实图书馆。这就是它在西班牙开发的地方。下面是一些ArUco标记的例子。",-1),h=e("figure",null,[e("img",{src:"https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzAzL2FydWNvLW1hcmtlcnMtZXhhbXBsZXMuanBn?x-oss-process=image/format,png#pic_center",alt:"在这里插入图片描述",tabindex:"0",loading:"lazy"}),e("figcaption",null,"在这里插入图片描述")],-1),g=e("p",null,[i("aruco标记是放置在被成像的对象或场景上的基准标记。它是一个具有黑色背景和边界的二元正方形，其内部生成的白色图案唯一地标识了它。黑边界有助于他们更容易被发现。它们可以产生多种大小。根据对象大小和场景选择大小，以便成功检测。如果很小的标记没有被检测到，仅仅增加它们的大小就可以使它们的检测更容易。"),e("br"),i(" 想法是您打印这些标记并将其放置在现实世界中。您可以拍摄现实世界并独特地检测这些标记。如果您是初学者，您可能会在想这有什么用？让我们看几个用例。"),e("br"),i(" 在我们在帖子中分享的示例中，我们将打印的内容和标记放在相框的角上。当我们唯一地标识标记时，我们可以用任意视频或图像替换相框。当我们移动相机时，新图片具有正确的透视失真。 在机器人应用程序中，您可以将这些标记沿着配备有摄像头的仓库机器人的路径放置。当安装在机器人上的摄像头检测到一个这些标记时，它可以知道它在仓库中的精确位置，因为每个标记都有一个唯一的ID，我们知道标记在仓库中的位置。")],-1),_=e("h2",{id:"_2-在opencv中生成aruco标记",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-在opencv中生成aruco标记","aria-hidden":"true"},"#"),i(" 2 在OpenCV中生成ArUco标记")],-1),f={href:"https://docs.opencv.org/4.2.0/d9/d6a/group__aruco.html#gac84398a9ed9dd01306592dd616c2c975",target:"_blank",rel:"noopener noreferrer"},k=s(`<p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Import the aruco module in OpenCV
#include &lt;opencv2/aruco.hpp&gt;

Mat markerImage;
// Load the predefined dictionary
Ptr&lt;cv::aruco::Dictionary&gt; dictionary = aruco::getPredefinedDictionary(cv::aruco::DICT_6X6_250);

// Generate the marker
aruco::drawMarker(dictionary, 33, 200, markerImage, 1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import cv2 as cv
import numpy as np

# Load the predefined dictionary
dictionary = cv.aruco.Dictionary_get(cv.aruco.DICT_6X6_250)

# Generate the marker
markerImage = np.zeros((200, 200), dtype=np.uint8)
markerImage = cv.aruco.drawMarker(dictionary, 33, 200, markerImage, 1);

cv.imwrite(&quot;marker33.png&quot;, markerImage);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的drawMarker函数允许我们从标号为0到249的标记集合中选择具有给定id的标记（第二个参数为33）。函数的第三个参数决定了所生成标记的大小。在上面的例子中，它将生成200×200像素的图像。第四个参数表示将存储生成的标记的对象（上面的markerImage）。最后，第五个参数是宽度参数，它决定了在生成的二值模式中应该添加多少块作为边界。 drawMarker函数的结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void cv::aruco::drawMarker(
    const Ptr&lt;Dictionary&gt; &amp;dictionary,
    int id,
    int sidePixels,
    OutputArray img,
    int borderBits = 1 
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体参数如下：</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>dictionary</td><td>指示标记类型的标记词典</td></tr><tr><td>id</td><td>将返回的标记的标识符，它必须是指定字典中的有效id</td></tr><tr><td>sidePixels</td><td>图像的像素大小</td></tr><tr><td>img</td><td>用标记器输出图像</td></tr><tr><td>borderBits</td><td>标记边框的宽度</td></tr></tbody></table><p>在上面的例子中，将在6×6生成的图案周围添加1位的边界，以在200×200像素的图像中生成7×7位的图像。使用上述代码生成的标记将类似于下图。 <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzAyL21hcmtlcjMzLnBuZw?x-oss-process=image/format,png" alt="" loading="lazy"></p><h2 id="_3-检测aruco标记" tabindex="-1"><a class="header-anchor" href="#_3-检测aruco标记" aria-hidden="true">#</a> 3 检测Aruco标记</h2><p>用aruco标记为场景成像后，我们需要检测它们并将其用于进一步处理。下面我们展示了如何检测标记。</p><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Load the dictionary that was used to generate the markers.
Ptr&lt;Dictionary&gt; dictionary = getPredefinedDictionary(DICT_6X6_250);

// Initialize the detector parameters using default values
Ptr&lt;DetectorParameters&gt; parameters = DetectorParameters::create();
            
// Declare the vectors that would contain the detected marker corners and the rejected marker candidates
vector&lt;vector&lt;Point2f&gt;&gt; markerCorners, rejectedCandidates;

// The ids of the detected markers are stored in a vector
vector&lt;int&gt; markerIds;
            
// Detect the markers in the image
detectMarkers(frame, dictionary, markerCorners, markerIds, parameters, rejectedCandidates);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#Load the dictionary that was used to generate the markers.
dictionary = cv.aruco.Dictionary_get(cv.aruco.DICT_6X6_250)

# Initialize the detector parameters using default values
parameters =  cv.aruco.DetectorParameters_create()

# Detect the markers in the image
markerCorners, markerIds, rejectedCandidates = cv.aruco.detectMarkers(frame, dictionary, parameters=parameters)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先加载与用于生成标记的字典类似的字典。使用DetectorParameters::create()检测初始参数集。OpenCV允许我们在检测过程中更改多个参数。在大多数情况下，默认参数效果很好，OpenCV建议使用这些参数。因此，我们将坚持默认参数。 对于每次成功的标记检测，将按从左上，右上，右下和左下的顺序检测标记的四个角点。在C ++中，将这4个检测到的角点存储为点矢量，并将图像中的多个标记一起存储在点矢量中。在Python中，它们存储为Numpy数组数组。<br> 该detectMarkers功能用于检测和定位标记的角。第一个参数是带有标记的场景图像。第二个参数是用于生成标记的字典。成功检测到的标记将存储在中markerCorners，其ID存储在中markerIds。先前初始化的DetectorParameters对象也作为参数传递。最后，被拒绝的候选人存储在中rejectedCandidates。<br> 在将标记打印，剪切和放置在场景中时，重要的是我们在标记的黑色边界周围保留一些白色边框，以便可以轻松检测到它们。</p><h2 id="_4-增强现实应用" tabindex="-1"><a class="header-anchor" href="#_4-增强现实应用" aria-hidden="true">#</a> 4 增强现实应用</h2><p>ArUco标记器主要是为解决包括增强现实在内的各种应用的相机姿态估计问题而开发的。OpenCV在其文档中详细描述了姿势估计过程。</p><blockquote><p>https://docs.opencv.org/trunk/d5/dae/tutorial_aruco_detection.html</p></blockquote><p>在此博客文章中，我们将把它们用于增强现实应用程序，该应用程序允许我们将任何新场景叠加到现有图像或视频上。我们在家中选择一个带有大型相框的场景，并希望用新的相框替换相框中的图片，以查看它们在墙上的外观。然后，我们继续尝试在影片中插入视频。为此，我们将大型的aruco标记打印，剪切并粘贴到图像区域的角落，如下图所示，然后捕获视频。捕获的视频在博客顶部的视频左侧。然后，我们按顺序分别处理视频的每一帧。 <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzAzL21hcmtlci1kZXRlY3Rpb24tb3V0cHV0cy1kcmF3bi5qcGc?x-oss-process=image/format,png" alt="" loading="lazy"> 对于每个图像，首先检测标记。下图显示了以绿色绘制的检测到的标记。第一点标记有一个红色小圆圈。可以通过顺时针移动标记的边界来访问第二，第三和第四点。 输入图像和新场景图像中的四个对应点集用于计算单应性。我们在较早的一篇文章中解释了单应性。文章地址如下：</p>`,20),y={href:"https://blog.csdn.net/LuohenYJ/article/details/89334249",target:"_blank",rel:"noopener noreferrer"},w=s(`<p>给定场景不同视图中的对应点，单应性是将一个对应点映射到另一对应点的变换。 <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzAzL2hvbW9ncmFwaHktMTUzNng5ODguanBn?x-oss-process=image/format,png#pic_center" alt="在这里插入图片描述" loading="lazy"> 在我们的案例中，单应性矩阵用于将新场景图像扭曲为由我们捕获的图像中的标记定义的四边形。我们在下面的代码中展示了如何做到这一点。 <strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Compute homography from source and destination points
Mat h = cv::findHomography(pts_src, pts_dst);

// Warped image
Mat warpedImage;
            
// Warp source image to destination based on homography
warpPerspective(im_src, warpedImage, h, frame.size(), INTER_CUBIC);
        
// Prepare a mask representing region to copy from the warped image into the original frame.
Mat mask = Mat::zeros(frame.rows, frame.cols, CV_8UC1);
fillConvexPoly(mask, pts_dst, Scalar(255, 255, 255));
            
// Erode the mask to not copy the boundary effects from the warping
Mat element = getStructuringElement( MORPH_RECT, Size(3,3) );
erode(mask, mask, element);

// Copy the masked warped image into the original frame in the mask region.
Mat imOut = frame.clone();
warpedImage.copyTo(imOut, mask);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Calculate Homography
h, status = cv.findHomography(pts_src, pts_dst)
        
# Warp source image to destination based on homography
warped_image = cv.warpPerspective(im_src, h, (frame.shape[1],frame.shape[0]))
        
# Prepare a mask representing region to copy from the warped image into the original frame.
mask = np.zeros([frame.shape[0], frame.shape[1]], dtype=np.uint8);
cv.fillConvexPoly(mask, np.int32([pts_dst_m]), (255, 255, 255), cv.LINE_AA);

# Erode the mask to not copy the boundary effects from the warping
element = cv.getStructuringElement(cv.MORPH_RECT, (3,3));
mask = cv.erode(mask, element, iterations=3);

# Copy the mask into 3 channels.
warped_image = warped_image.astype(float)
mask3 = np.zeros_like(warped_image)
for i in range(0, 3):
    mask3[:,:,i] = mask/255

# Copy the masked warped image into the original frame in the mask region.
warped_image_masked = cv.multiply(warped_image, mask3)
frame_masked = cv.multiply(frame.astype(float), 1-mask3)
im_out = cv.add(warped_image_masked, frame_masked)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将新的场景图像角点用作源点（pts_src），并将捕获的图像中的相框内部相应的图像角点用作目标点（dst_src）。OpenCV函数findHomography计算源点和目标点之间的单应性函数h。单应性矩阵然后用于使新图像变形以适合目标框架。变形的图像被遮罩并复制到目标帧中。对于视频，此过程在每个帧上重复。</p><h2 id="_5-总结和代码" tabindex="-1"><a class="header-anchor" href="#_5-总结和代码" aria-hidden="true">#</a> 5 总结和代码</h2><p>本文只是简单的介绍下aruco标记，还有很多关于aruco的知识没有说。具体应用还需要看文档。进一步了解更多见opencv官方文档：</p>`,7),P={href:"https://docs.opencv.org/4.2.0/d9/d6d/tutorial_table_of_content_aruco.html",target:"_blank",rel:"noopener noreferrer"},C=s(`<p>本文所有代码见：</p><p>https://github.com/luohenyueji/OpenCV-Practical-Exercise</p><p>具体代码如下</p><h3 id="_5-1-生成aruco标记" tabindex="-1"><a class="header-anchor" href="#_5-1-生成aruco标记" aria-hidden="true">#</a> 5.1 生成aruco标记</h3><p>C++</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 生成aruco标志
#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/aruco.hpp&gt;

using namespace cv;

// 用于生成aruco图标
int main()
{
	Mat markerImage;
	// 生成字典
	Ptr&lt;cv::aruco::Dictionary&gt; dictionary = aruco::getPredefinedDictionary(cv::aruco::DICT_6X6_250);
	// 生成图像
	// 参数分别为字典，第几个标识，图像输出大小为200X200,输出图像，标记边框的宽度
	aruco::drawMarker(dictionary, 33, 200, markerImage, 1);

	imwrite(&quot;marker33.png&quot;, markerImage);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 生成aruco标记

import cv2 as cv
import numpy as np


# Load the predefined dictionary
dictionary = cv.aruco.Dictionary_get(cv.aruco.DICT_6X6_250)

# Generate the marker
markerImage = np.zeros((200, 200), dtype=np.uint8)
markerImage = cv.aruco.drawMarker(dictionary, 33, 200, markerImage, 1)

cv.imwrite(&quot;marker33.png&quot;, markerImage)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-使用aruco增强现实" tabindex="-1"><a class="header-anchor" href="#_5-2-使用aruco增强现实" aria-hidden="true">#</a> 5.2 使用aruco增强现实</h3><p><strong>C++</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// This code is written by Sunita Nayak at BigVision LLC. It is based on the OpenCV project. It is subject to the license terms in the LICENSE file found in this distribution and at http://opencv.org/license.html
// 虚拟现实

#include &quot;pch.h&quot;
#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;iostream&gt;

#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/aruco.hpp&gt;

using namespace cv;
using namespace aruco;
using namespace std;

int main()
{
	// Open a video file or an image file or a camera stream.
	string str, outputFile;
	VideoCapture cap;
	VideoWriter video;
	Mat frame, blob;

	// 新场景图像
	Mat im_src = imread(&quot;./image/new_scenery.jpg&quot;);
	// 检测类型
	String detectType = &quot;video&quot;;
	String detectPath = &quot;./video/test.mp4&quot;;

	try
	{
		// 输出文件名
		outputFile = &quot;ar_out_cpp.avi&quot;;
		// 如果检测类型是图像
		if (detectType == &quot;image&quot;)
		{
			// Open the image file
			str = detectPath;
			// 判断文件是否存在
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			cap.open(str);
			// 重命名
			str.replace(str.end() - 4, str.end(), &quot;_ar_out_cpp.jpg&quot;);
			// 输出文件
			outputFile = str;
		}
		// 如果检测类型是视频
		else if (detectType == &quot;video&quot;)
		{
			// Open the video file
			// 打开视频
			str = detectPath;
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			cap.open(str);
			str.replace(str.end() - 4, str.end(), &quot;_ar_out_cpp.avi&quot;);
			outputFile = str;
		}
		// Open the webcaom
		// 打开网络摄像头
		else
			cap.open(0);
	}
	// 错误解决办法
	catch (...)
	{
		cout &lt;&lt; &quot;Could not open the input image/video stream&quot; &lt;&lt; endl;
		return 0;
	}

	// Get the video writer initialized to save the output video
	// 如果检测类别不是图像，则生成输出视频
	if (detectType != &quot;image&quot;)
	{
		video.open(outputFile, VideoWriter::fourcc(&#39;M&#39;, &#39;J&#39;, &#39;P&#39;, &#39;G&#39;), 28, Size(2 * cap.get(CAP_PROP_FRAME_WIDTH), cap.get(CAP_PROP_FRAME_HEIGHT)));
	}

	// Create a window
	// 创建显示窗口
	static const string kWinName = &quot;Augmented Reality using Aruco markers in OpenCV&quot;;
	namedWindow(kWinName, WINDOW_NORMAL);

	// Process frames.
	// 逐帧处理
	while (waitKey(1) &lt; 0)
	{
		// get frame from the video
		cap &gt;&gt; frame;

		try
		{
			// Stop the program if reached end of video
			// 如果到了视频的结尾
			if (frame.empty())
			{
				cout &lt;&lt; &quot;Done processing !!!&quot; &lt;&lt; endl;
				cout &lt;&lt; &quot;Output file is stored as &quot; &lt;&lt; outputFile &lt;&lt; endl;
				waitKey(3000);
				break;
			}

			vector&lt;int&gt; markerIds;

			// Load the dictionary that was used to generate the markers.
			// 加载用于标记的词典
			Ptr&lt;Dictionary&gt; dictionary = getPredefinedDictionary(DICT_6X6_250);

			// Declare the vectors that would contain the detected marker corners and the rejected marker candidates
			// 声明标记到的角点和没有被标记到的角点
			vector&lt;vector&lt;Point2f&gt;&gt; markerCorners, rejectedCandidates;

			// Initialize the detector parameters using default values
			// 使用默认值初始化检测器参数
			Ptr&lt;DetectorParameters&gt; parameters = DetectorParameters::create();

			// Detect the markers in the image
			// 检测标记
			/**
			*	frame 待检测marker的图像
			*	dictionary 字典对象
			*	markerCorners 检测出的图像的角的列表，从左下角顺时针开始，返回角的各个顶点的坐标
			*	markerIds markerCorners检测出的maker的id列表
			*	parameters 检测器参数
			*	rejectedCandidates 返回不是有效的角相关信息
			*/
			detectMarkers(frame, dictionary, markerCorners, markerIds, parameters, rejectedCandidates);

			// Using the detected markers, locate the quadrilateral on the target frame where the new scene is going to be displayed.、
			// 使用检测到的标记，在目标帧上定位要显示新场景的四边形。
			vector&lt;Point&gt; pts_dst;
			// 0.015;
			// 计算缩减距离
			float scalingFac = 0.02;

			Point refPt1, refPt2, refPt3, refPt4;

			// finding top left corner point of the target quadrilateral
			// 寻找目标四边形的左上角点

			// 查找字典中id为25的标志，返回一个vector
			std::vector&lt;int&gt;::iterator it = std::find(markerIds.begin(), markerIds.end(), 25);
			// 返回markerIds中25的下标
			int index = std::distance(markerIds.begin(), it);
			// 返回markerIds中25的左上角坐标
			refPt1 = markerCorners.at(index).at(1);

			// finding top right corner point of the target quadrilateral
			// 求目标四边形的右上角点

			// 查找字典中id为33的标志，返回一个vector
			it = std::find(markerIds.begin(), markerIds.end(), 33);
			// 返回markerIds中33的下标
			index = std::distance(markerIds.begin(), it);
			// 返回markerIds中33的右上角坐标
			refPt2 = markerCorners.at(index).at(2);

			// 返回欧式距离
			float distance = norm(refPt1 - refPt2);
			// 将缩减后的坐标放入标记点容器
			pts_dst.push_back(Point(refPt1.x - round(scalingFac * distance), refPt1.y - round(scalingFac * distance)));

			pts_dst.push_back(Point(refPt2.x + round(scalingFac * distance), refPt2.y - round(scalingFac * distance)));

			// finding bottom right corner point of the target quadrilateral
			// 求目标四边形的右下角点
			it = std::find(markerIds.begin(), markerIds.end(), 30);
			index = std::distance(markerIds.begin(), it);
			refPt3 = markerCorners.at(index).at(0);
			pts_dst.push_back(Point(refPt3.x + round(scalingFac * distance), refPt3.y + round(scalingFac * distance)));

			// finding bottom left corner point of the target quadrilateral
			// 寻找目标四边形的左下角点
			it = std::find(markerIds.begin(), markerIds.end(), 23);
			index = std::distance(markerIds.begin(), it);
			refPt4 = markerCorners.at(index).at(0);
			pts_dst.push_back(Point(refPt4.x - round(scalingFac * distance), refPt4.y + round(scalingFac * distance)));

			// Get the corner points of the new scene image.
			// 全新图像的角点
			vector&lt;Point&gt; pts_src;
			// 从左上角开始顺时针存入pts_src中
			pts_src.push_back(Point(0, 0));
			pts_src.push_back(Point(im_src.cols, 0));
			pts_src.push_back(Point(im_src.cols, im_src.rows));
			pts_src.push_back(Point(0, im_src.rows));

			// Compute homography from source and destination points
			// 计算单应性矩阵
			Mat h = cv::findHomography(pts_src, pts_dst);

			// Warped image
			// 仿射变换后的图像
			Mat warpedImage;

			// Warp source image to destination based on homography
			// 基于单应性矩阵映射图像
			warpPerspective(im_src, warpedImage, h, frame.size(), INTER_CUBIC);

			// Prepare a mask representing region to copy from the warped image into the original frame.
			// 准备一个表示要从仿射图像图像复制到原始帧中的区域的遮罩。
			Mat mask = Mat::zeros(frame.rows, frame.cols, CV_8UC1);
			// 计算单应性矩阵
			fillConvexPoly(mask, pts_dst, Scalar(255, 255, 255), LINE_AA);

			// Erode the mask to not copy the boundary effects from the warping
			// 侵蚀mask以不复制仿射图像的边界效果
			Mat element = getStructuringElement(MORPH_RECT, Size(5, 5));
			// Mat element = getStructuringElement( MORPH_RECT, Size(3,3));
			erode(mask, mask, element);

			// Copy the warped image into the original frame in the mask region.
			// 将仿射的图像复制到遮罩区域中的原始帧中。
			Mat imOut = frame.clone();
			warpedImage.copyTo(imOut, mask);

			// Showing the original image and the new output image side by side
			Mat concatenatedOutput;
			// 并排显示原始图像和新输出图像
			hconcat(frame, imOut, concatenatedOutput);

			// 保存图像
			if (detectType == &quot;image&quot;)
			{
				imwrite(outputFile, concatenatedOutput);
			}
			// 写视频
			else
			{
				video.write(concatenatedOutput);
			}
			imshow(kWinName, concatenatedOutput);
		}
		// 输出错误
		catch (const std::exception &amp;e)
		{
			cout &lt;&lt; endl
				&lt;&lt; &quot; e : &quot; &lt;&lt; e.what() &lt;&lt; endl;
			cout &lt;&lt; &quot;Could not do homography !! &quot; &lt;&lt; endl;
			// return 0;
		}
	}

	cap.release();
	video.release();

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>python</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># This code is written by Sunita Nayak at BigVision LLC. It is based on the OpenCV project. It is subject to the license terms in the LICENSE file found in this distribution and at http://opencv.org/license.html
# 增强现实

import cv2 as cv
#from cv2 import aruco
import sys
import os.path
import numpy as np

# image or video or other
detectType = &#39;video&#39;
detectPath = &#39;video/test.mp4&#39;
im_src = cv.imread(&quot;image/new_scenery.jpg&quot;)

outputFile = &quot;ar_out_py.avi&quot;
if (detectType is &quot;image&quot;):
    # Open the image file
    if not os.path.isfile(detectPath):
        print(&quot;Input image file &quot;, detectPath, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(detectPath)
    outputFile = detectPath[:-4]+&#39;_ar_out_py.jpg&#39;
elif (detectType is &quot;video&quot;):
    # Open the video file
    if not os.path.isfile(detectPath):
        print(&quot;Input video file &quot;, detectPath, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(detectPath)
    outputFile = detectPath[:-4]+&#39;_ar_out_py.avi&#39;
    print(&quot;Storing it as :&quot;, outputFile)
else:
    # Webcam input
    cap = cv.VideoCapture(0)

# Get the video writer initialized to save the output video
if (detectType is not &quot;image&quot;):
    vid_writer = cv.VideoWriter(outputFile, cv.VideoWriter_fourcc(&#39;M&#39;, &#39;J&#39;, &#39;P&#39;, &#39;G&#39;), 28, (round(
        2*cap.get(cv.CAP_PROP_FRAME_WIDTH)), round(cap.get(cv.CAP_PROP_FRAME_HEIGHT))))

winName = &quot;Augmented Reality using Aruco markers in OpenCV&quot;

while cv.waitKey(1) &lt; 0:
    try:
        # get frame from the video
        hasFrame, frame = cap.read()

        # Stop the program if reached end of video
        if not hasFrame:
            print(&quot;Done processing !!!&quot;)
            print(&quot;Output file is stored as &quot;, outputFile)
            cv.waitKey(3000)
            break

        # Load the dictionary that was used to generate the markers.
        dictionary = cv.aruco.Dictionary_get(cv.aruco.DICT_6X6_250)

        # Initialize the detector parameters using default values
        parameters = cv.aruco.DetectorParameters_create()

        # Detect the markers in the image
        markerCorners, markerIds, rejectedCandidates = cv.aruco.detectMarkers(
            frame, dictionary, parameters=parameters)

        index = np.squeeze(np.where(markerIds == 25))
        refPt1 = np.squeeze(markerCorners[index[0]])[1]

        index = np.squeeze(np.where(markerIds == 33))
        refPt2 = np.squeeze(markerCorners[index[0]])[2]

        distance = np.linalg.norm(refPt1-refPt2)

        scalingFac = 0.02
        pts_dst = [
            [refPt1[0] - round(scalingFac*distance), refPt1[1] - round(scalingFac*distance)]]
        pts_dst = pts_dst + \\
            [[refPt2[0] + round(scalingFac*distance),
              refPt2[1] - round(scalingFac*distance)]]

        index = np.squeeze(np.where(markerIds == 30))
        refPt3 = np.squeeze(markerCorners[index[0]])[0]
        pts_dst = pts_dst + \\
            [[refPt3[0] + round(scalingFac*distance),
              refPt3[1] + round(scalingFac*distance)]]

        index = np.squeeze(np.where(markerIds == 23))
        refPt4 = np.squeeze(markerCorners[index[0]])[0]
        pts_dst = pts_dst + \\
            [[refPt4[0] - round(scalingFac*distance),
              refPt4[1] + round(scalingFac*distance)]]

        pts_src = [[0, 0], [im_src.shape[1], 0], [
            im_src.shape[1], im_src.shape[0]], [0, im_src.shape[0]]]

        pts_src_m = np.asarray(pts_src)
        pts_dst_m = np.asarray(pts_dst)

        # Calculate Homography
        h, status = cv.findHomography(pts_src_m, pts_dst_m)

        # Warp source image to destination based on homography
        warped_image = cv.warpPerspective(
            im_src, h, (frame.shape[1], frame.shape[0]))

        # Prepare a mask representing region to copy from the warped image into the original frame.
        mask = np.zeros([frame.shape[0], frame.shape[1]], dtype=np.uint8)
        cv.fillConvexPoly(mask, np.int32(
            [pts_dst_m]), (255, 255, 255), cv.LINE_AA)

        # Erode the mask to not copy the boundary effects from the warping
        element = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
        mask = cv.erode(mask, element, iterations=3)

        # Copy the mask into 3 channels.
        warped_image = warped_image.astype(float)
        mask3 = np.zeros_like(warped_image)
        for i in range(0, 3):
            mask3[:, :, i] = mask/255

        # Copy the warped image into the original frame in the mask region.
        warped_image_masked = cv.multiply(warped_image, mask3)
        frame_masked = cv.multiply(frame.astype(float), 1-mask3)
        im_out = cv.add(warped_image_masked, frame_masked)

        # Showing the original image and the new output image side by side
        concatenatedOutput = cv.hconcat([frame.astype(float), im_out])
        cv.imshow(&quot;AR using Aruco markers&quot;,
                  concatenatedOutput.astype(np.uint8))

        # Write the frame with the detection boxes
        if (detectType is &quot;image&quot;):
            cv.imwrite(outputFile, concatenatedOutput.astype(np.uint8))
        else:
            vid_writer.write(concatenatedOutput.astype(np.uint8))

    except Exception as inst:
        print(inst)

cv.destroyAllWindows()
if &#39;vid_writer&#39; in locals():
    vid_writer.release()
    print(&#39;Video writer released..&#39;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-参考" tabindex="-1"><a class="header-anchor" href="#_6-参考" aria-hidden="true">#</a> 6 参考</h2>`,14),x={href:"https://www.learnopencv.com/augmented-reality-using-aruco-markers-in-opencv-c-python/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.learnopencv.com/?s=homography",target:"_blank",rel:"noopener noreferrer"};function I(O,M){const n=r("ExternalLinkIcon");return a(),l("div",null,[v,m,u,o,e("blockquote",null,[e("p",null,[e("a",b,[i("Automatic generation and detection of highly reliable fiducial markers under occlusion"),t(n)])])]),p,h,g,_,e("p",null,[i("我们可以使用OpenCV很容易地生成这些标记。OpenCV中的aruco模块共有"),e("a",f,[i("25个预定义的标记字典"),t(n)]),i("。字典中的所有标记包含相同数量的块或位（4×4、5×5、6×6或7×7），每个字典包含固定数量的标记（50、100、250或1000）。下面我们将展示如何在C++和Python中生成和检测各种ARUCO标记。我们将需要在代码中使用aruco模块。 下面的函数调用getPredefinedDictionary演示如何加载一个包含250个标记的字典，其中每个标记包含一个6×6位二进制模式。")]),k,e("blockquote",null,[e("p",null,[e("a",y,[i("Opencv中的单应性矩阵Homography"),t(n)])])]),w,e("blockquote",null,[e("p",null,[e("a",P,[i("https://docs.opencv.org/4.2.0/d9/d6d/tutorial_table_of_content_aruco.html"),t(n)])])]),C,e("blockquote",null,[e("p",null,[e("a",x,[i("https://www.learnopencv.com/augmented-reality-using-aruco-markers-in-opencv-c-python/"),t(n)])])]),e("blockquote",null,[e("p",null,[e("a",q,[i("https://www.learnopencv.com/?s=homography"),t(n)])])])])}const F=d(c,[["render",I],["__file","2020-03-31-_OpenCV实战_39 在OpenCV中使用ArUco标记的增强现实.html.vue"]]);export{F as default};
