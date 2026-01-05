import{_ as e,c as n,a as o,o as r}from"./app-BOswGe5u.js";const a={};function s(p,t){return r(),n("div",null,t[0]||(t[0]=[o(`<h1 id="opencv实战-5-基于深度学习的文本检测" tabindex="-1"><a class="header-anchor" href="#opencv实战-5-基于深度学习的文本检测"><span>[OpenCV实战]5 基于深度学习的文本检测</span></a></h1><p>在这篇文章中，我们将逐字逐句地尝试找到图片中的单词！基于最近的一篇论文进行文字检测。</p><p>EAST: An Efficient and Accurate Scene Text Detector.</p><ul><li><p><a href="https://arxiv.org/abs/1704.03155v2" target="_blank" rel="noopener noreferrer"> https://arxiv.org/abs/1704.03155v2 </a></p></li><li><p><a href="https://github.com/argman/EAST" target="_blank" rel="noopener noreferrer"> https://github.com/argman/EAST </a></p></li></ul><p>应该注意，文本检测不同于文本识别。在文本检测中，我们只检测文本周围的边界框。但是，在文本识别中，我们实际上找到了框中所写的内容。例如，在下面给出的图像中，文本检测将为您提供单词周围的边界框，文本识别将告诉您该框包含单词STOP。本文只进行文本检测。</p><p>本文基于tensorflow模型，基于OpenCV调用tensorflow模型。我们将逐步讨论算法是如何工作的。您将需要OpenCV3.4.3以上版本来运行代码。其他opencv DNN模型读取也类似这样步骤。</p><p>涉及的步骤如下：</p><ol><li>下载EAST模型</li><li>将模型加载到内存中</li><li>准备输入图像</li><li>正向传递blob通过网络</li><li>处理输出</li></ol><h2 id="_1-网络加载" tabindex="-1"><a class="header-anchor" href="#_1-网络加载"><span><strong>1</strong> <strong>网络加载</strong></span></a></h2><p>我们将使用cv :: dnn ::readnet(C++版本)或cv2.dnn.ReadNet(python版本)函数将网络加载到内存中。它会根据指定的文件名自动检测配置和框架。在我们的例子中，它是一个pb文件，因此，它将假定要加载Tensorflow网络。和加载图像不大一样，没有模型结构描述文件。</p><p>C++</p><pre><code>Net net = readNet(model);
</code></pre><p>Python</p><pre><code>net = cv.dnn.readNet(model)
</code></pre><h2 id="_2-读取图像" tabindex="-1"><a class="header-anchor" href="#_2-读取图像"><span><strong>2</strong> <strong>读取图像</strong></span></a></h2><p>我们需要创建一个4-D输入blob，用于将图像输送到网络。这是使用blobFromImage函数完成的。</p><p>C++</p><pre><code>blobFromImage(frame, blob, 1.0, Size(inpWidth, inpHeight), Scalar(123.68, 116.78, 103.94), true, false);
</code></pre><p>Python</p><pre><code>blob = cv.dnn.blobFromImage(frame, 1.0, (inpWidth, inpHeight), (123.68, 116.78, 103.94), True, False)
</code></pre><p>我们需要为此函数指定一些参数。它们如下：</p><ol><li>第一个参数是图像本身。</li><li>第二个参数指定每个像素值的缩放。在这种情况下，它不是必需的。因此我们将其保持为1。</li><li>第三个参数是设定网络的默认输入为320×320。因此，我们需要在创建blob时指定它。最好和网络输入一致。</li><li>第四个参数是训练时候设定的模型均值。需要减去模型均值。</li><li>第五个参数是我们是否要交换R和B通道。这是必需的，因为OpenCV使用BGR格式，Tensorflow使用RGB格式，caffe模型使用BGR格式。</li><li>最后一个参数是我们是否要裁剪图像并采取中心裁剪。在这种情况下我们指定False。</li></ol><h2 id="_3-前向传播" tabindex="-1"><a class="header-anchor" href="#_3-前向传播"><span><strong>3</strong> <strong>前向传播</strong></span></a></h2><p>现在我们已准备好输入，我们将通过网络传递它。网络有两个输出。一个指定文本框的位置，另一个指定检测到的框的置信度分数。两个输出层如下：</p><p>feature_fusion/concat_3</p><p>feature_fusion/Conv_7/Sigmoid</p><p>这两个输出可以直接用netron这个软件打开pb模型，看到最后输出结果。Netron是一个模型结构可视化神器，支持tf, caffe, keras,mxnet等多种框架。Netron下载地址：</p><p><a href="https://github.com/lutzroeder/Netron" target="_blank" rel="noopener noreferrer"> https://github.com/lutzroeder/Netron</a></p><p>c++读取输出代码如下：</p><pre><code>std::vector&lt;String&gt; outputLayers(2);

outputLayers[0] = &quot;feature_fusion/Conv_7/Sigmoid&quot;;

outputLayers[1] = &quot;feature_fusion/concat_3&quot;;
</code></pre><p>python读取输出代码如下：</p><pre><code>outputLayers = []

outputLayers.append(&quot;feature_fusion/Conv_7/Sigmoid&quot;)

outputLayers.append(&quot;feature_fusion/concat_3&quot;)
</code></pre><p>接下来，我们通过将输入图像传递到网络来获得输出。如前所述，输出由两部分组成：置信度和位置。</p><p>C++</p><pre><code>std::vector&lt;Mat&gt; output;

net.setInput(blob);

net.forward(output, outputLayers);

Mat scores = output[0];

Mat geometry = output[1];
</code></pre><p>python:</p><pre><code>net.setInput(blob)

output = net.forward(outputLayers)

scores = output[0]

geometry = output[1]
</code></pre><h2 id="_4-处理输出" tabindex="-1"><a class="header-anchor" href="#_4-处理输出"><span><strong>4</strong> <strong>处理输出</strong></span></a></h2><p>如前所述，我们将使用两个层的输出并解码文本框的位置及其方向。我们可能会得到许多文本框。因此，我们需要从该批次中筛选出看起来最好的文本框。这是使用非极大值抑制算法完成的。</p><p>非极大值抑制算法在目标检测中应用很广泛，具体可以参考</p><p><a href="http://www.it610.com/article/5215825.htm" target="_blank" rel="noopener noreferrer"> http://www.it610.com/article/5215825.htm</a></p><p><a href="https://blog.csdn.net/qq_14845119/article/details/52064928" target="_blank" rel="noopener noreferrer"><em>https://blog.csdn.net/qq_14845119/article/details/5206492</em> 8</a></p><p>1 解码</p><p>C++:</p><pre><code>std::vector&lt;RotatedRect&gt; boxes;

std::vector&lt;float&gt; confidences;

decode(scores, geometry, confThreshold, boxes, confidences);
</code></pre><p>python:</p><pre><code>[boxes, confidences] = decode(scores, geometry, confThreshold)
</code></pre><p>2 非极大值抑制</p><p>我们使用OpenCV函数NMSBoxes（C ++）或NMSBoxesRotated（Python）来过滤掉误报并获得最终预测。</p><p>C++:</p><pre><code>std::vector&lt;int&gt; indices;

NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);
</code></pre><p>Python:</p><pre><code>indices = cv.dnn.NMSBoxesRotated(boxes, confidences, confThreshold, nmsThreshold)
</code></pre><h2 id="_5-结果和代码" tabindex="-1"><a class="header-anchor" href="#_5-结果和代码"><span>5 结果和代码</span></a></h2><h3 id="_5-1-结果" tabindex="-1"><a class="header-anchor" href="#_5-1-结果"><span>5.1 结果</span></a></h3><p>在VS2017下运行了C++代码，其中OpenCV版本至少要3.4.5以上。不然模型读取会有问题。模型文件太大，见下载链接：</p><p><a href="https://download.csdn.net/download/luohenyj/11003000" target="_blank" rel="noopener noreferrer"> https://download.csdn.net/download/luohenyj/11003000</a></p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><p>或者梯子直接下载模型：</p><p><a href="https://www.dropbox.com/s/r2ingd0l3zt8hxs/frozen_east_text_detection.tar.gz?dl=1" target="_blank" rel="noopener noreferrer">https://www.dropbox.com/s/r2ingd0l3zt8hxs/frozen_east_text_detection.tar.gz?dl=1</a></p><p>结果如下，效果还不错，速度也还好。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop2.jpg" alt="https://www.learnopencv.com/wp-content/uploads/2019/01/east-outstop2.jpg" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2019/01/east-outstop2.jpg</figcaption></figure><figure><img src="https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop1.jpg" alt="https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop1.jpg" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop1.jpg</figcaption></figure><figure><img src="https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-cards.jpg" alt="https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-cards.jpg" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-cards.jpg</figcaption></figure><h3 id="_5-2-代码" tabindex="-1"><a class="header-anchor" href="#_5-2-代码"><span>5.2 代码</span></a></h3><p>C++代码有所更改，python没有。对文本检测不熟悉，注释不多，但是实际代码不需要太大变化。</p><p>C++代码：</p><pre><code>// text_detection.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;

using namespace std;
using namespace cv;
using namespace cv::dnn;

//解码
void decode(const Mat &amp;scores, const Mat &amp;geometry, float scoreThresh,
	std::vector&lt;RotatedRect&gt; &amp;detections, std::vector&lt;float&gt; &amp;confidences);

/**
 * @brief
 *
 * @param srcImg 检测图像
 * @param inpWidth 深度学习图像输入宽
 * @param inpHeight 深度学习图像输入高
 * @param confThreshold 置信度
 * @param nmsThreshold 非极大值抑制算法阈值
 * @param net
 * @return Mat
 */
Mat text_detect(Mat srcImg, int inpWidth, int inpHeight, float confThreshold, float nmsThreshold, Net net)
{
	//输出
	std::vector&lt;Mat&gt; output;
	std::vector&lt;String&gt; outputLayers(2);
	outputLayers[0] = &quot;feature_fusion/Conv_7/Sigmoid&quot;;
	outputLayers[1] = &quot;feature_fusion/concat_3&quot;;

	//检测图像
	Mat frame, blob;
	frame = srcImg.clone();
	//获取深度学习模型的输入
	blobFromImage(frame, blob, 1.0, Size(inpWidth, inpHeight), Scalar(123.68, 116.78, 103.94), true, false);
	net.setInput(blob);
	//输出结果
	net.forward(output, outputLayers);

	//置信度
	Mat scores = output[0];
	//位置参数
	Mat geometry = output[1];

	// Decode predicted bounding boxes， 对检测框进行解码，获取文本框位置方向
	//文本框位置参数
	std::vector&lt;RotatedRect&gt; boxes;
	//文本框置信度
	std::vector&lt;float&gt; confidences;
	decode(scores, geometry, confThreshold, boxes, confidences);

	// Apply non-maximum suppression procedure， 应用非极大性抑制算法
	//符合要求的文本框
	std::vector&lt;int&gt; indices;
	NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);

	// Render detections. 输出预测
	//缩放比例
	Point2f ratio((float)frame.cols / inpWidth, (float)frame.rows / inpHeight);
	for (size_t i = 0; i &lt; indices.size(); ++i)
	{
		RotatedRect &amp;box = boxes[indices[i]];

		Point2f vertices[4];
		box.points(vertices);
		//还原坐标点
		for (int j = 0; j &lt; 4; ++j)
		{
			vertices[j].x *= ratio.x;
			vertices[j].y *= ratio.y;
		}
		//画框
		for (int j = 0; j &lt; 4; ++j)
		{
			line(frame, vertices[j], vertices[(j + 1) % 4], Scalar(0, 255, 0), 2, LINE_AA);
		}
	}

	// Put efficiency information. 时间
	std::vector&lt;double&gt; layersTimes;
	double freq = getTickFrequency() / 1000;
	double t = net.getPerfProfile(layersTimes) / freq;
	std::string label = format(&quot;Inference time: %.2f ms&quot;, t);
	putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 255, 0));

	return frame;
}

//模型地址
auto model = &quot;./model/frozen_east_text_detection.pb&quot;;
//检测图像
auto detect_image = &quot;./image/patient.jpg&quot;;
//输入框尺寸
auto inpWidth = 320;
auto inpHeight = 320;
//置信度阈值
auto confThreshold = 0.5;
//非极大值抑制算法阈值
auto nmsThreshold = 0.4;

int main()
{
	//读取模型
	Net net = readNet(model);
	//读取检测图像
	Mat srcImg = imread(detect_image);
	if (!srcImg.empty())
	{
		cout &lt;&lt; &quot;read image success!&quot; &lt;&lt; endl;
	}
	Mat resultImg = text_detect(srcImg, inpWidth, inpHeight, confThreshold, nmsThreshold, net);
	imshow(&quot;result&quot;, resultImg);
	waitKey();
	return 0;
}

/**
 * @brief 输出检测到的文本框相关信息
 *
 * @param scores 置信度
 * @param geometry 位置信息
 * @param scoreThresh 置信度阈值
 * @param detections 位置
 * @param confidences 分类概率
 */
void decode(const Mat &amp;scores, const Mat &amp;geometry, float scoreThresh,
	std::vector&lt;RotatedRect&gt; &amp;detections, std::vector&lt;float&gt; &amp;confidences)
{
	detections.clear();
	//判断是不是符合提取要求
	CV_Assert(scores.dims == 4);
	CV_Assert(geometry.dims == 4);
	CV_Assert(scores.size[0] == 1);
	CV_Assert(geometry.size[0] == 1);
	CV_Assert(scores.size[1] == 1);
	CV_Assert(geometry.size[1] == 5);
	CV_Assert(scores.size[2] == geometry.size[2]);
	CV_Assert(scores.size[3] == geometry.size[3]);

	const int height = scores.size[2];
	const int width = scores.size[3];
	for (int y = 0; y &lt; height; ++y)
	{
		//识别概率
		const float *scoresData = scores.ptr&lt;float&gt;(0, 0, y);
		//文本框坐标
		const float *x0_data = geometry.ptr&lt;float&gt;(0, 0, y);
		const float *x1_data = geometry.ptr&lt;float&gt;(0, 1, y);
		const float *x2_data = geometry.ptr&lt;float&gt;(0, 2, y);
		const float *x3_data = geometry.ptr&lt;float&gt;(0, 3, y);
		//文本框角度
		const float *anglesData = geometry.ptr&lt;float&gt;(0, 4, y);
		//遍历所有检测到的检测框
		for (int x = 0; x &lt; width; ++x)
		{
			float score = scoresData[x];
			//低于阈值忽略该检测框
			if (score &lt; scoreThresh)
			{
				continue;
			}

			// Decode a prediction.
			// Multiple by 4 because feature maps are 4 time less than input image.
			float offsetX = x * 4.0f, offsetY = y * 4.0f;
			//角度及相关正余弦计算
			float angle = anglesData[x];
			float cosA = std::cos(angle);
			float sinA = std::sin(angle);
			float h = x0_data[x] + x2_data[x];
			float w = x1_data[x] + x3_data[x];

			Point2f offset(offsetX + cosA * x1_data[x] + sinA * x2_data[x],
				offsetY - sinA * x1_data[x] + cosA * x2_data[x]);
			Point2f p1 = Point2f(-sinA * h, -cosA * h) + offset;
			Point2f p3 = Point2f(-cosA * w, sinA * w) + offset;
			//旋转矩形，分别输入中心点坐标，图像宽高，角度
			RotatedRect r(0.5f * (p1 + p3), Size2f(w, h), -angle * 180.0f / (float)CV_PI);
			//保存检测框
			detections.push_back(r);
			//保存检测框的置信度
			confidences.push_back(score);
		}
	}
}
</code></pre><p>Python代码：</p><pre><code># Import required modules
import cv2 as cv
import math
import argparse

parser = argparse.ArgumentParser(description=&#39;Use this script to run text detection deep learning networks using OpenCV.&#39;)
# Input argument
parser.add_argument(&#39;--input&#39;, help=&#39;Path to input image or video file. Skip this argument to capture frames from a camera.&#39;)
# Model argument
parser.add_argument(&#39;--model&#39;, default=&quot;./model/frozen_east_text_detection.pb&quot;,
                    help=&#39;Path to a binary .pb file of model contains trained weights.&#39;
                    )
# Width argument
parser.add_argument(&#39;--width&#39;, type=int, default=320,
                    help=&#39;Preprocess input image by resizing to a specific width. It should be multiple by 32.&#39;
                   )
# Height argument
parser.add_argument(&#39;--height&#39;,type=int, default=320,
                    help=&#39;Preprocess input image by resizing to a specific height. It should be multiple by 32.&#39;
                   )
# Confidence threshold
parser.add_argument(&#39;--thr&#39;,type=float, default=0.5,
                    help=&#39;Confidence threshold.&#39;
                   )
# Non-maximum suppression threshold
parser.add_argument(&#39;--nms&#39;,type=float, default=0.4,
                    help=&#39;Non-maximum suppression threshold.&#39;
                   )

args = parser.parse_args()


############ Utility functions ############
def decode(scores, geometry, scoreThresh):
    detections = []
    confidences = []

    ############ CHECK DIMENSIONS AND SHAPES OF geometry AND scores ############
    assert len(scores.shape) == 4, &quot;Incorrect dimensions of scores&quot;
    assert len(geometry.shape) == 4, &quot;Incorrect dimensions of geometry&quot;
    assert scores.shape[0] == 1, &quot;Invalid dimensions of scores&quot;
    assert geometry.shape[0] == 1, &quot;Invalid dimensions of geometry&quot;
    assert scores.shape[1] == 1, &quot;Invalid dimensions of scores&quot;
    assert geometry.shape[1] == 5, &quot;Invalid dimensions of geometry&quot;
    assert scores.shape[2] == geometry.shape[2], &quot;Invalid dimensions of scores and geometry&quot;
    assert scores.shape[3] == geometry.shape[3], &quot;Invalid dimensions of scores and geometry&quot;
    height = scores.shape[2]
    width = scores.shape[3]
    for y in range(0, height):

        # Extract data from scores
        scoresData = scores[0][0][y]
        x0_data = geometry[0][0][y]
        x1_data = geometry[0][1][y]
        x2_data = geometry[0][2][y]
        x3_data = geometry[0][3][y]
        anglesData = geometry[0][4][y]
        for x in range(0, width):
            score = scoresData[x]

            # If score is lower than threshold score, move to next x
            if(score &lt; scoreThresh):
                continue

            # Calculate offset
            offsetX = x * 4.0
            offsetY = y * 4.0
            angle = anglesData[x]

            # Calculate cos and sin of angle
            cosA = math.cos(angle)
            sinA = math.sin(angle)
            h = x0_data[x] + x2_data[x]
            w = x1_data[x] + x3_data[x]

            # Calculate offset
            offset = ([offsetX + cosA * x1_data[x] + sinA * x2_data[x], offsetY - sinA * x1_data[x] + cosA * x2_data[x]])

            # Find points for rectangle
            p1 = (-sinA * h + offset[0], -cosA * h + offset[1])
            p3 = (-cosA * w + offset[0],  sinA * w + offset[1])
            center = (0.5*(p1[0]+p3[0]), 0.5*(p1[1]+p3[1]))
            detections.append((center, (w,h), -1*angle * 180.0 / math.pi))
            confidences.append(float(score))

    # Return detections and confidences
    return [detections, confidences]

if __name__ == &quot;__main__&quot;:
    # Read and store arguments
    confThreshold = args.thr
    nmsThreshold = args.nms
    inpWidth = args.width
    inpHeight = args.height
    model = args.model

    # Load network
    net = cv.dnn.readNet(model)

    # Create a new named window
    kWinName = &quot;EAST: An Efficient and Accurate Scene Text Detector&quot;
    outputLayers = []
    outputLayers.append(&quot;feature_fusion/Conv_7/Sigmoid&quot;)
    outputLayers.append(&quot;feature_fusion/concat_3&quot;)

    # Read frame
    frame = cv.imread(&quot;./image/stop1.jpg&quot;)


    # Get frame height and width
    height_ = frame.shape[0]
    width_ = frame.shape[1]
    rW = width_ / float(inpWidth)
    rH = height_ / float(inpHeight)

    # Create a 4D blob from frame.
    blob = cv.dnn.blobFromImage(frame, 1.0, (inpWidth, inpHeight), (123.68, 116.78, 103.94), True, False)

    # Run the model
    net.setInput(blob)
    output = net.forward(outputLayers)
    t, _ = net.getPerfProfile()
    label = &#39;Inference time: %.2f ms&#39; % (t * 1000.0 / cv.getTickFrequency())

    # Get scores and geometry
    scores = output[0]
    geometry = output[1]
    [boxes, confidences] = decode(scores, geometry, confThreshold)
    # Apply NMS
    indices = cv.dnn.NMSBoxesRotated(boxes, confidences, confThreshold,nmsThreshold)
    for i in indices:
        # get 4 corners of the rotated rect
        vertices = cv.boxPoints(boxes[i[0]])
        # scale the bounding box coordinates based on the respective ratios
        for j in range(4):
            vertices[j][0] *= rW
            vertices[j][1] *= rH
        for j in range(4):
            p1 = (vertices[j][0], vertices[j][1])
            p2 = (vertices[(j + 1) % 4][0], vertices[(j + 1) % 4][1])
            cv.line(frame, p1, p2, (0, 255, 0), 2, cv.LINE_AA);
            # cv.putText(frame, &quot;{:.3f}&quot;.format(confidences[i[0]]), (vertices[0][0], vertices[0][1]), cv.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1, cv.LINE_AA)

    # Put efficiency information
    cv.putText(frame, label, (0, 15), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255))

    # Display the frame
    cv.imshow(&quot;result&quot;,frame)
    cv.waitKey(0)
</code></pre><h2 id="_6-参考" tabindex="-1"><a class="header-anchor" href="#_6-参考"><span>6 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/deep-learning-based-text-detection-using-opencv-c-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/deep-learning-based-text-detection-using-opencv-c-python/ </a></li></ul>`,73)]))}const c=e(a,[["render",s],["__file","2019-03-06-_OpenCV实战_5 基于深度学习的文本检测.html.vue"]]),l=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-06-_OpenCV%E5%AE%9E%E6%88%98_5%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E6%96%87%E6%9C%AC%E6%A3%80%E6%B5%8B.html","title":"[OpenCV实战]5 基于深度学习的文本检测","lang":"zh-CN","frontmatter":{"date":"2019-03-06T19:00:45.000Z","tag":["OpenCV实战","OpenCV"],"category":["OpenCV"],"description":"[OpenCV实战]5 基于深度学习的文本检测 在这篇文章中，我们将逐字逐句地尝试找到图片中的单词！基于最近的一篇论文进行文字检测。 EAST: An Efficient and Accurate Scene Text Detector. https://arxiv.org/abs/1704.03155v2 https://github.com/arg...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-06-_OpenCV%E5%AE%9E%E6%88%98_5%20%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E6%96%87%E6%9C%AC%E6%A3%80%E6%B5%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]5 基于深度学习的文本检测"}],["meta",{"property":"og:description","content":"[OpenCV实战]5 基于深度学习的文本检测 在这篇文章中，我们将逐字逐句地尝试找到图片中的单词！基于最近的一篇论文进行文字检测。 EAST: An Efficient and Accurate Scene Text Detector. https://arxiv.org/abs/1704.03155v2 https://github.com/arg..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop2.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-03-06T19:00:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]5 基于深度学习的文本检测\\",\\"image\\":[\\"https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop2.jpg\\",\\"https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-stop1.jpg\\",\\"https://www.learnopencv.com/wp-content/uploads/2019/01/east-out-cards.jpg\\"],\\"datePublished\\":\\"2019-03-06T19:00:45.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 网络加载","slug":"_1-网络加载","link":"#_1-网络加载","children":[]},{"level":2,"title":"2 读取图像","slug":"_2-读取图像","link":"#_2-读取图像","children":[]},{"level":2,"title":"3 前向传播","slug":"_3-前向传播","link":"#_3-前向传播","children":[]},{"level":2,"title":"4 处理输出","slug":"_4-处理输出","link":"#_4-处理输出","children":[]},{"level":2,"title":"5 结果和代码","slug":"_5-结果和代码","link":"#_5-结果和代码","children":[{"level":3,"title":"5.1 结果","slug":"_5-1-结果","link":"#_5-1-结果","children":[]},{"level":3,"title":"5.2 代码","slug":"_5-2-代码","link":"#_5-2-代码","children":[]}]},{"level":2,"title":"6 参考","slug":"_6-参考","link":"#_6-参考","children":[]}],"git":{},"readingTime":{"minutes":9.53,"words":2858},"filePathRelative":"blog/opencv/opencv实战/2019-03-06-[OpenCV实战]5 基于深度学习的文本检测.md","localizedDate":"2019年3月7日","excerpt":"\\n<p>在这篇文章中，我们将逐字逐句地尝试找到图片中的单词！基于最近的一篇论文进行文字检测。</p>\\n<p>EAST: An Efficient and Accurate Scene Text Detector.</p>\\n<ul>\\n<li>\\n<p><a href=\\"https://arxiv.org/abs/1704.03155v2\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://arxiv.org/abs/1704.03155v2 </a></p>\\n</li>\\n<li>\\n<p><a href=\\"https://github.com/argman/EAST\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://github.com/argman/EAST </a></p>\\n</li>\\n</ul>","autoDesc":true}');export{c as comp,l as data};
