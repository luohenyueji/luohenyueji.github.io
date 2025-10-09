import{_ as e,c as n,a as o,o as a}from"./app-BNuIUq7T.js";const i={};function r(s,t){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="opencv实战-7-使用yolov3和opencv进行基于深度学习的目标检测" tabindex="-1"><a class="header-anchor" href="#opencv实战-7-使用yolov3和opencv进行基于深度学习的目标检测"><span>[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测</span></a></h1><p>在这篇文章中，我们将学习如何在OpenCV上使用YOLOv3（目标检测网络）。YOLOv3是检测算法YOLO的最新变种已发布的模型可识别图像和视频中的80个不同对象，但最重要的是它具有超快速且几乎与Single Shot MultiBox（SSD）一样准确。从OpenCV 3.4.2开始，您可以在自己的OpenCV应用程序中轻松使用YOLOv3模型。</p><p>我们可以将对象检测器视为对象定位器和对象识别器的组合。</p><h2 id="_1-yolo-介绍" tabindex="-1"><a class="header-anchor" href="#_1-yolo-介绍"><span><strong>1 YOLO</strong> <strong>介绍</strong></span></a></h2><h3 id="_1-1-yolov3-原理" tabindex="-1"><a class="header-anchor" href="#_1-1-yolov3-原理"><span><strong>1.1 YOLOv3</strong> <strong>原理</strong></span></a></h3><p>在传统的计算机视觉方法中，使用滑动窗口来寻找不同位置和尺度的物体。因为这是非常耗时的操作，所以通常假设物体的纵横比是固定的。基于早期深度学习的对象检测算法（如R- CNN和Fast R-CNN）使用称为选择性搜索的方法来扫描图像。另一种称为Overfeat的方法涉及使用卷积式滑动窗口机制在多个尺度上扫描图像。紧随其后的是更快的R- CNN，它使用区域提议网络（RPN）来识别需要测试的边界框。通过巧妙的设计，提取用于识别对象的特征也被RPN用于提出潜在的边界框，从而节省了大量的计算。</p><p>Faster R-CNN使用区域候选网络（RPN）来识别需要测试的边界框。通过巧妙的设计，提取用于识别对象的特征也被RPN用于提出潜在的边界框，从而节省了大量的计算。以上的目标检测网络都是两阶段检测器，目标定位和分类是分开的。</p><p>接下来说说单阶段检测器，也就是ssd和mobilenet。另一方面，YOLO以完全不同的方式处理对象检测问题。SSD是另一种物体检测算法。YOLOv3和ssd只要获取图像就能直接得到目标检测结果，但YOLOv3比SSD快得多，同时实现了非常不错的精度。YOLOv3在M40，TitanX或1080 Ti GPU上速度很快。</p><p>YOLO目标检测器首先，它将图像划分为13×13的单元格。这169个单元的大小取决于输入的大小。对于我们在实验中使用的416×416输入尺寸，单元尺寸为32×32。然后每个单元格作为一个边界框进行一次检测。对于每个边界框，网络还预测边界框实际包围对象的置信度，以分类的概率。大多数这些边界框都被消除了，因为它们的置信度很低，或者因为它们与另一个具有非常高置信度得分的边界框包围相同的对象。该技术称为非极大值抑制。</p><p>YOLOv3作者使YOLOv3比以前的作品YOLOv2更快，更准确。YOLOv3可以更好地进行多个尺度检测。他们还通过增加网络来改进网络。</p><h3 id="_1-2-为什么要将opencv-用于yolo" tabindex="-1"><a class="header-anchor" href="#_1-2-为什么要将opencv-用于yolo"><span><strong>1.2</strong> <strong>为什么要将OpenCV</strong> <strong>用于YOLO</strong> <strong>？</strong></span></a></h3><p>以下是您可能希望将OpenCV用于YOLO的几个原因:</p><ol><li>与OpenCV应用程序轻松集成：如果您的应用程序已经使用OpenCV并且您只想使用YOLOv3，则无需担心编译和构建额外的Darknet代码。</li><li>OpenCV CPU版本快9倍：OpenCV的DNN模块CPU实现速度惊人。例如，与OpenMP一起使用时，Darknet在CPU上花费大约2秒钟来对单个图像进行推理。相比之下，OpenCV的实现只需0.22秒！查看下表。</li><li>Python支持：Darknet是用C语言编写的，并没有正式支持Python。相比之下，OpenCV确实如此。虽然有Darknet可用的python端口。</li></ol><h3 id="_1-3-在darknet-和opencv-上对yolov3-进行速度测试" tabindex="-1"><a class="header-anchor" href="#_1-3-在darknet-和opencv-上对yolov3-进行速度测试"><span><strong>1.3</strong> <strong>在Darknet</strong> <strong>和OpenCV</strong> <strong>上对YOLOv3</strong> <strong>进行速度测试</strong></span></a></h3><p>下表显示了YOLOv3在Darknet与OpenCV上的性能。所有情况下的输入大小为416×416。毫无疑问，Darknet的GPU版本优于其他任何东西。使用OpenMP（并行计算工具）的Darknet比没有OpenMP的Darknet工作得更好也不足为奇，因为OpenMP允许使用多个处理器。令人惊讶的是，OpenCV的DNN CPU实现速度比使用OpenML的Darknet快9倍。</p><table><thead><tr><th>OS</th><th>Framework</th><th>CPU/GPU</th><th>Time(ms)/Frame</th></tr></thead><tbody><tr><td>Linux 16.04</td><td>Darknet</td><td>12x Intel Core i7-6850K CPU @ 3.60GHz</td><td>9370</td></tr><tr><td>Linux 16.04</td><td>Darknet + OpenMP</td><td>12x Intel Core i7-6850K CPU @ 3.60GHz</td><td>1942</td></tr><tr><td>Linux 16.04</td><td>OpenCV [CPU]</td><td>12x Intel Core i7-6850K CPU @ 3.60GHz</td><td>220</td></tr><tr><td>Linux 16.04</td><td>Darknet</td><td>NVIDIA GeForce 1080 Ti GPU</td><td>23</td></tr><tr><td>macOS</td><td>DarkNet</td><td>2.5 GHz Intel Core i7 CPU</td><td>7260</td></tr><tr><td>macOS</td><td>OpenCV [CPU]</td><td>2.5 GHz Intel Core i7 CPU</td><td>400</td></tr></tbody></table><p>OpenCV的DNN GPU仅使用英特尔的GPU进行测试，因此如果您没有英特尔GPU，代码会将您切换回CPU。所以A卡就算了。</p><h2 id="_2-使用yolov3-进行对象检测-c-python" tabindex="-1"><a class="header-anchor" href="#_2-使用yolov3-进行对象检测-c-python"><span><strong>2</strong> <strong>使用YOLOv3</strong> <strong>进行对象检测（C++/Python</strong> <strong>）</strong></span></a></h2><h3 id="_2-1-模型及配置文件下载" tabindex="-1"><a class="header-anchor" href="#_2-1-模型及配置文件下载"><span><strong>2.1</strong> <strong>模型及配置文件下载</strong></span></a></h3><p>首先进行检测需要下载yolov3.weights文件（包含预先训练的网络权重），yolov3.cfg文件（包含网络配置）和coco.names文件，其中包含COCO数据集中使用的80个不同的类名。下载地址分别如下：</p><p><a href="https://pjreddie.com/media/files/yolov3.weights" target="_blank" rel="noopener noreferrer"> https://pjreddie.com/media/files/yolov3.weights</a></p><p><a href="https://github.com/pjreddie/darknet/blob/master/cfg/yolov3.cfg" target="_blank" rel="noopener noreferrer"> https://github.com/pjreddie/darknet/blob/master/cfg/yolov3.cfg</a></p><p><a href="https://github.com/pjreddie/darknet/blob/master/data/coco.names" target="_blank" rel="noopener noreferrer"> https://github.com/pjreddie/darknet/blob/master/data/coco.names</a></p><h3 id="_2-2-初始化参数" tabindex="-1"><a class="header-anchor" href="#_2-2-初始化参数"><span><strong>2.2</strong> <strong>初始化参数</strong></span></a></h3><p>YOLOv3算法会生成检测框作为预测的输出。每个预测的框都有一个置信度。在第一阶段，忽略置信度较低的框以进行进一步处理。其余的框基于非极大性抑制，这消除了多余的重叠边界框。非最大抑制由参数nmsThreshold控制。您可以尝试更改这些值，并查看输出预测框的数量如何变化。</p><p>检测之前，我们会设置网络输入图像的输入宽度（inpWidth）和高度（inpHeight）的默认值。我们将宽高设置为416，以便我们可以将我们的运行与YOLOv3作者给出的Darknet的C代码进行比较。您也可以将它们更改为320以获得更快的结果，或者更改为608以获得更准确的结果。</p><h3 id="_2-3-加载模型和获取输入图像" tabindex="-1"><a class="header-anchor" href="#_2-3-加载模型和获取输入图像"><span><strong>2.3</strong> <strong>加载模型和获取输入图像</strong></span></a></h3><p>文件coco.names包含训练模型的所有类别名。接下来，我们加载网络有两个部分：</p><p>yolov3.weights：预训练的重量。</p><p>yolov3.cfg：配置文件。</p><p>我们在这里将DNN后端设置为OpenCV，将目标设置为CPU。您可以尝试将首选目标设置为cv.dnn.DNN_TARGET_OPENCL以在GPU上运行它。但请记住，目前的OpenCV版本仅使用英特尔的GPU进行测试，如果您没有英特尔GPU，它会自动切换到CPU。</p><p>然后我们将读取图像，视频流或网络摄像头图像。此外，我们还保存检测结果。</p><p>C++代码如下：</p><pre><code>	// Give the configuration and weight files for the model 模型参数文件
	String modelConfiguration = &quot;./model/yolov3.cfg&quot;;
	String modelWeights = &quot;./model/yolov3.weights&quot;;
	// Load names of classes 读取分类类名
	string classesFile = &quot;./model/coco.names&quot;;
	ifstream ifs(classesFile.c_str());
	string line;
	while (getline(ifs, line))
	{
		classes.push_back(line);
	}

	// Load the network 导入网络
	Net net = readNetFromDarknet(modelConfiguration, modelWeights);
	net.setPreferableBackend(DNN_BACKEND_OPENCV);
	//仅仅使用CPU
	net.setPreferableTarget(DNN_TARGET_CPU);
</code></pre><h3 id="_2-4-单帧图像处理" tabindex="-1"><a class="header-anchor" href="#_2-4-单帧图像处理"><span>2.4 单帧图像处理</span></a></h3><p>神经网络的输入图像需要采用称为blob的特定格式。</p><p>从输入图像或视频流中读取帧后，将通过blobFromImage函数将其转换为神经网络的输入blob。在此过程中，它使用比例因子1/255将图像像素值缩放到0到1的目标范围。它还将图像的大小调整为给定大小（416,416）而不进行裁剪。请注意，我们不在此处执行任何均值减法，因此将[0,0,0]传递给函数的mean参数，并将swapRB参数保持为其默认值1(即交换R和B)。</p><p>然后输出blob作为输入传递到网络，并正向传播以获得预测边界框作为网络输出。这些框经过后处理步骤，滤除低置信度的方框。我们将在下一节中更详细地介绍后处理步骤。我们在图像左上角打印出每帧的检测时间。然后将具有最终边界框的图像保存到本地。</p><p>C++代码如下：</p><pre><code>	Mat blob;
	clock_t start, finish;
	//读图
	Mat frame = imread(&quot;bird.jpg&quot;);
	//根据需求决定是不是重置图像
	//resize(frame, frame, Size(300, 300));

	start = clock();
	// Create a 4D blob from a frame. 创建神经网络输入图像
	blobFromImage(frame, blob, 1 / 255.0, cvSize(inpWidth, inpHeight), Scalar(0, 0, 0), true, false);

	//Sets the input to the network 设置输出
	net.setInput(blob);

	// Runs the forward pass to get output of the output layers 获取输出层结果
	vector&lt;Mat&gt; outs;
	net.forward(outs, getOutputsNames(net));

	// Remove the bounding boxes with low confidence
	postprocess(frame, outs);
	finish = clock();

	cout &lt;&lt; &quot;time is &quot; &lt;&lt; double(finish - start) / CLOCKS_PER_SEC &lt;&lt; endl;
	// Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
	//输出前向传播的时间
	vector&lt;double&gt; layersTimes;
	double freq = getTickFrequency() / 1000;
	double t = net.getPerfProfile(layersTimes) / freq;
	string label = format(&quot;Inference time for a frame : %.2f ms&quot;, t);
	putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 0, 255));
</code></pre><h4 id="_2-4-1-获取输出层的名称" tabindex="-1"><a class="header-anchor" href="#_2-4-1-获取输出层的名称"><span>2.4.1 获取输出层的名称</span></a></h4><p>OpenCV的Net类中的forward函数需要输出层，它应该在网络中运行。由于我们想要遍历整个网络，我们需要确定网络的最后一层。我们通过使用函数getUnconnectedOutLayers()来实现这一点，该函数给出了未连接的输出层的名称，这些输出层基本上是网络的最后一层。然后我们进行网络的正向传递以从输出层获得输出。</p><p>获得输出层是因为yolov3有三个输出层，所以要确定输出层。</p><p>C++代码：</p><pre><code>// Get the names of the output layers 获取输出层
/**
 * @brief Get the Outputs Names object
 *
 * @param net
 * @return vector&lt;String&gt;
 */
vector&lt;String&gt; getOutputsNames(const Net&amp; net)
{
	//输出
	static vector&lt;String&gt; names;
	if (names.empty())
	{
		//Get the indices of the output layers, i.e. the layers with unconnected outputs
		vector&lt;int&gt; outLayers = net.getUnconnectedOutLayers();

		//get the names of all the layers in the network
		vector&lt;String&gt; layersNames = net.getLayerNames();

		// Get the names of the output layers in names
		names.resize(outLayers.size());
		for (size_t i = 0; i &lt; outLayers.size(); ++i)
		{
			names[i] = layersNames[outLayers[i] - 1];
		}
	}
	return names;
}
</code></pre><h4 id="_2-4-2-处理网络的输出" tabindex="-1"><a class="header-anchor" href="#_2-4-2-处理网络的输出"><span>2.4.2 处理网络的输出</span></a></h4><p>网络输出边界框每个都由包含5个元素的向量表示。前4个元素代表对象的中心点坐标center_x，center_y，width和height。第五个元素表示检测框包围对象的置信度。该框被分配到与该框的分类概率最大的类。检测框的最大分类概率就是置信度。如果框的置信度小于给定阈值，则删除检测框并且不考虑进行进一步处理。然后对其置信度等于或大于置信度阈值的框进行非最大抑制。这将减少重叠框的数量。</p><p>非最大性抑制由nmsThreshold参数控制。如果nmsThreshold设置得太低，例如0.1，我们可能无法检测到相同或不同类的重叠对象。但如果设置得太高，例如1，那么我们会为同一个对象获得多个框。所以我们在上面的代码中使用了0.4的中间值。下面的gif显示了改变NMS阈值的效果。</p><p>C++代码如下：</p><pre><code>/**
 * @brief Remove the bounding boxes with low confidence using non-maxima suppression 基于非极大性抑制去除边框
 *
 * @param frame 视频图像
 * @param outs 输出层结果
 */
void postprocess(Mat&amp; frame, const vector&lt;Mat&gt;&amp; outs)
{
	//输出类
	vector&lt;int&gt; classIds;
	//置信度
	vector&lt;float&gt; confidences;
	vector&lt;Rect&gt; boxes;

	//遍历所有的输出层
	for (size_t i = 0; i &lt; outs.size(); ++i)
	{
		// Scan through all the bounding boxes output from the network and keep only the
		// ones with high confidence scores. Assign the box&#39;s class label as the class
		// with the highest score for the box.
		//扫描所有来自网络的边界框输出，只保留具有高置信度分数的边界框。将框的类标签指定为框得分最高的类。
		//读取框
		float* data = (float*)outs[i].data;
		for (int j = 0; j &lt; outs[i].rows; ++j, data += outs[i].cols)
		{
			Mat scores = outs[i].row(j).colRange(5, outs[i].cols);
			Point classIdPoint;
			double confidence;
			// Get the value and location of the maximum score 获取置信度和位置参数
			minMaxLoc(scores, 0, &amp;confidence, 0, &amp;classIdPoint);
			//如果大于置信度阈值
			if (confidence &gt; confThreshold)
			{
				//获取坐标
				int centerX = (int)(data[0] * frame.cols);
				int centerY = (int)(data[1] * frame.rows);
				int width = (int)(data[2] * frame.cols);
				int height = (int)(data[3] * frame.rows);
				int left = centerX - width / 2;
				int top = centerY - height / 2;

				classIds.push_back(classIdPoint.x);
				confidences.push_back((float)confidence);
				boxes.push_back(Rect(left, top, width, height));
			}
		}
	}

	// Perform non maximum suppression to eliminate redundant overlapping boxes with
	// lower confidences
	//输出非极大性抑制结果，按置信度从大到小输出
	vector&lt;int&gt; indices;
	//非极大性抑制
	NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);
	//绘图
	for (size_t i = 0; i &lt; indices.size(); ++i)
	{
		int idx = indices[i];
		Rect box = boxes[idx];
		//类，置信度
		drawPred(classIds[idx], confidences[idx], box.x, box.y,
			box.x + box.width, box.y + box.height, frame);
	}
}
</code></pre><h4 id="_2-4-3-画预测结果框格" tabindex="-1"><a class="header-anchor" href="#_2-4-3-画预测结果框格"><span>2.4.3 画预测结果框格</span></a></h4><p>最后，我们在输入框架上绘制通过非最大性抑制过滤的框，并指定类别标签和置信度分数。</p><p>C++代码如下：</p><pre><code>/**
 * @brief Draw the predicted bounding box 画框
 *
 * @param classId 类别
 * @param conf 置信度
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @param frame
 */
void drawPred(int classId, float conf, int left, int top, int right, int bottom, Mat&amp; frame)
{
	//Draw a rectangle displaying the bounding box
	rectangle(frame, Point(left, top), Point(right, bottom), Scalar(255, 178, 50), 3);

	//Get the label for the class name and its confidence
	string label = format(&quot;%.2f&quot;, conf);
	if (!classes.empty())
	{
		CV_Assert(classId &lt; (int)classes.size());
		label = classes[classId] + &quot;:&quot; + label;
	}

	//Display the label at the top of the bounding box 在每个框左上角标上标签
	int baseLine;
	Size labelSize = getTextSize(label, FONT_HERSHEY_SIMPLEX, 0.5, 1, &amp;baseLine);
	top = max(top, labelSize.height);
	rectangle(frame, Point(left, top - round(1.5*labelSize.height)), Point(left + round(1.5*labelSize.width), top + baseLine), Scalar(255, 255, 255), FILLED);
	putText(frame, label, Point(left, top), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 0), 1);
}
</code></pre><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码"><span>3 结果和代码</span></a></h2><h3 id="_3-1-结果" tabindex="-1"><a class="header-anchor" href="#_3-1-结果"><span>3.1 结果</span></a></h3><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测/1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测/2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测/3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测/4.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>yolov3很强大，上面是在debug模型跑的。但是yolov3参数还是要学会调整。</p><h3 id="_3-2-代码" tabindex="-1"><a class="header-anchor" href="#_3-2-代码"><span>3.2 代码</span></a></h3><p>代码地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p><a href="https://download.csdn.net/download/luohenyj/11017030" target="_blank" rel="noopener noreferrer"> https://download.csdn.net/download/luohenyj/11017030 </a></p><p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><p>代码提供了C++和Python版本，但是python版本没有运行，原因opencv版本太低，不想升级。代码都有详细的注释。</p><p>C++代码：</p><pre><code>#include &quot;pch.h&quot;
#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;iostream&gt;
#include &lt;time.h&gt;
#include &lt;opencv2/dnn.hpp&gt;
#include &lt;opencv2/imgproc.hpp&gt;
#include &lt;opencv2/highgui.hpp&gt;

;
using namespace cv;
using namespace dnn;
using namespace std;

// Initialize the parameters 初始参数
 // Confidence threshold 置信度阈值
float confThreshold = 0.5;
// Non-maximum suppression threshold 非极大性抑制阈值
float nmsThreshold = 0.4;
//检测图像宽高
int inpWidth = 416;
int inpHeight = 416;
//类别参数
vector&lt;string&gt; classes;

// Remove the bounding boxes with low confidence using non-maxima suppression
// 基于非极大性抑制去除低置信度的检测框
void postprocess(Mat&amp; frame, const vector&lt;Mat&gt;&amp; out);

// 画预测框
void drawPred(int classId, float conf, int left, int top, int right, int bottom, Mat&amp; frame);

// 提取输出输出层
vector&lt;String&gt; getOutputsNames(const Net&amp; net);

int main()
{
	// Give the configuration and weight files for the model 模型参数文件
	String modelConfiguration = &quot;./model/yolov3.cfg&quot;;
	String modelWeights = &quot;./model/yolov3.weights&quot;;
	// Load names of classes 读取分类类名
	string classesFile = &quot;./model/coco.names&quot;;
	ifstream ifs(classesFile.c_str());
	string line;
	while (getline(ifs, line))
	{
		classes.push_back(line);
	}

	// Load the network 导入网络
	Net net = readNetFromDarknet(modelConfiguration, modelWeights);
	net.setPreferableBackend(DNN_BACKEND_OPENCV);
	//仅仅使用CPU
	net.setPreferableTarget(DNN_TARGET_CPU);

	// Open a video file or an image file or a camera stream.
	string str, outputFile;
	Mat blob;
	clock_t start, finish;
	//读图
	Mat frame = imread(&quot;test.jpg&quot;);
	//根据需求决定是不是重置图像
	//resize(frame, frame, Size(300, 300));

	start = clock();
	// Create a 4D blob from a frame. 创建神经网络输入图像
	blobFromImage(frame, blob, 1 / 255.0, cvSize(inpWidth, inpHeight), Scalar(0, 0, 0), true, false);

	//Sets the input to the network 设置输出
	net.setInput(blob);

	// Runs the forward pass to get output of the output layers 获取输出层结果
	vector&lt;Mat&gt; outs;
	net.forward(outs, getOutputsNames(net));

	// Remove the bounding boxes with low confidence
	postprocess(frame, outs);
	finish = clock();

	cout &lt;&lt; &quot;time is &quot; &lt;&lt; double(finish - start) / CLOCKS_PER_SEC &lt;&lt; endl;
	// Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
	//输出前向传播的时间
	vector&lt;double&gt; layersTimes;
	double freq = getTickFrequency() / 1000;
	double t = net.getPerfProfile(layersTimes) / freq;
	string label = format(&quot;Inference time for a frame : %.2f ms&quot;, t);
	putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 0, 255));

	imshow(&quot;result&quot;, frame);
	//保存图像
	imwrite(&quot;result.jpg&quot;, frame);
	waitKey(0);

	return 0;
}

/**
 * @brief Remove the bounding boxes with low confidence using non-maxima suppression 基于非极大性抑制去除边框
 *
 * @param frame 视频图像
 * @param outs 输出层结果
 */
void postprocess(Mat&amp; frame, const vector&lt;Mat&gt;&amp; outs)
{
	//输出类
	vector&lt;int&gt; classIds;
	//置信度
	vector&lt;float&gt; confidences;
	vector&lt;Rect&gt; boxes;

	//遍历所有的输出层
	for (size_t i = 0; i &lt; outs.size(); ++i)
	{
		// Scan through all the bounding boxes output from the network and keep only the
		// ones with high confidence scores. Assign the box&#39;s class label as the class
		// with the highest score for the box.
		//扫描所有来自网络的边界框输出，只保留具有高置信度分数的边界框。将框的类标签指定为框得分最高的类。
		//读取框
		float* data = (float*)outs[i].data;
		for (int j = 0; j &lt; outs[i].rows; ++j, data += outs[i].cols)
		{
			Mat scores = outs[i].row(j).colRange(5, outs[i].cols);
			Point classIdPoint;
			double confidence;
			// Get the value and location of the maximum score 获取置信度和位置参数
			minMaxLoc(scores, 0, &amp;confidence, 0, &amp;classIdPoint);
			//如果大于置信度阈值
			if (confidence &gt; confThreshold)
			{
				//获取坐标
				int centerX = (int)(data[0] * frame.cols);
				int centerY = (int)(data[1] * frame.rows);
				int width = (int)(data[2] * frame.cols);
				int height = (int)(data[3] * frame.rows);
				int left = centerX - width / 2;
				int top = centerY - height / 2;

				classIds.push_back(classIdPoint.x);
				confidences.push_back((float)confidence);
				boxes.push_back(Rect(left, top, width, height));
			}
		}
	}

	// Perform non maximum suppression to eliminate redundant overlapping boxes with
	// lower confidences
	//输出非极大性抑制结果，按置信度从大到小输出
	vector&lt;int&gt; indices;
	//非极大性抑制
	NMSBoxes(boxes, confidences, confThreshold, nmsThreshold, indices);
	//绘图
	for (size_t i = 0; i &lt; indices.size(); ++i)
	{
		int idx = indices[i];
		Rect box = boxes[idx];
		//类，置信度
		drawPred(classIds[idx], confidences[idx], box.x, box.y,
			box.x + box.width, box.y + box.height, frame);
	}
}

/**
 * @brief Draw the predicted bounding box 画框
 *
 * @param classId 类别
 * @param conf 置信度
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @param frame
 */
void drawPred(int classId, float conf, int left, int top, int right, int bottom, Mat&amp; frame)
{
	//Draw a rectangle displaying the bounding box
	rectangle(frame, Point(left, top), Point(right, bottom), Scalar(255, 178, 50), 3);

	//Get the label for the class name and its confidence
	string label = format(&quot;%.2f&quot;, conf);
	if (!classes.empty())
	{
		CV_Assert(classId &lt; (int)classes.size());
		label = classes[classId] + &quot;:&quot; + label;
	}

	//Display the label at the top of the bounding box 在每个框左上角标上标签
	int baseLine;
	Size labelSize = getTextSize(label, FONT_HERSHEY_SIMPLEX, 0.5, 1, &amp;baseLine);
	top = max(top, labelSize.height);
	rectangle(frame, Point(left, top - round(1.5*labelSize.height)), Point(left + round(1.5*labelSize.width), top + baseLine), Scalar(255, 255, 255), FILLED);
	putText(frame, label, Point(left, top), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 0), 1);
}

// Get the names of the output layers 获取输出层
/**
 * @brief Get the Outputs Names object
 *
 * @param net
 * @return vector&lt;String&gt;
 */
vector&lt;String&gt; getOutputsNames(const Net&amp; net)
{
	//输出
	static vector&lt;String&gt; names;
	if (names.empty())
	{
		//Get the indices of the output layers, i.e. the layers with unconnected outputs
		vector&lt;int&gt; outLayers = net.getUnconnectedOutLayers();

		//get the names of all the layers in the network
		vector&lt;String&gt; layersNames = net.getLayerNames();

		// Get the names of the output layers in names
		names.resize(outLayers.size());
		for (size_t i = 0; i &lt; outLayers.size(); ++i)
		{
			names[i] = layersNames[outLayers[i] - 1];
		}
	}
	return names;
}
</code></pre><p>python代码：</p><pre><code># This code is written at BigVision LLC. It is based on the OpenCV project. It is subject to the license terms in the LICENSE file found in this distribution and at http://opencv.org/license.html

# Usage example:  python3 object_detection_yolo.py --video=run.mp4
#                 python3 object_detection_yolo.py --image=bird.jpg

import cv2 as cv
import argparse
import sys
import numpy as np
import os.path

# Initialize the parameters
confThreshold = 0.5  #Confidence threshold
nmsThreshold = 0.4   #Non-maximum suppression threshold
inpWidth = 416       #Width of network&#39;s input image
inpHeight = 416      #Height of network&#39;s input image

parser = argparse.ArgumentParser(description=&#39;Object Detection using YOLO in OPENCV&#39;)
parser.add_argument(&#39;--image&#39;, help=&#39;Path to image file.&#39;)
parser.add_argument(&#39;--video&#39;, help=&#39;Path to video file.&#39;)
args = parser.parse_args()
        
# Load names of classes
classesFile = &quot;coco.names&quot;;
classes = None
with open(classesFile, &#39;rt&#39;) as f:
    classes = f.read().rstrip(&#39;\\n&#39;).split(&#39;\\n&#39;)

# Give the configuration and weight files for the model and load the network using them.
modelConfiguration = &quot;yolov3.cfg&quot;;
modelWeights = &quot;yolov3.weights&quot;;

net = cv.dnn.readNetFromDarknet(modelConfiguration, modelWeights)
net.setPreferableBackend(cv.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv.dnn.DNN_TARGET_CPU)

# Get the names of the output layers
def getOutputsNames(net):
    # Get the names of all the layers in the network
    layersNames = net.getLayerNames()
    # Get the names of the output layers, i.e. the layers with unconnected outputs
    return [layersNames[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# Draw the predicted bounding box
def drawPred(classId, conf, left, top, right, bottom):
    # Draw a bounding box.
    cv.rectangle(frame, (left, top), (right, bottom), (255, 178, 50), 3)
    
    label = &#39;%.2f&#39; % conf
        
    # Get the label for the class name and its confidence
    if classes:
        assert(classId &lt; len(classes))
        label = &#39;%s:%s&#39; % (classes[classId], label)

    #Display the label at the top of the bounding box
    labelSize, baseLine = cv.getTextSize(label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
    top = max(top, labelSize[1])
    cv.rectangle(frame, (left, top - round(1.5*labelSize[1])), (left + round(1.5*labelSize[0]), top + baseLine), (255, 255, 255), cv.FILLED)
    cv.putText(frame, label, (left, top), cv.FONT_HERSHEY_SIMPLEX, 0.75, (0,0,0), 1)

# Remove the bounding boxes with low confidence using non-maxima suppression
def postprocess(frame, outs):
    frameHeight = frame.shape[0]
    frameWidth = frame.shape[1]

    # Scan through all the bounding boxes output from the network and keep only the
    # ones with high confidence scores. Assign the box&#39;s class label as the class with the highest score.
    classIds = []
    confidences = []
    boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            classId = np.argmax(scores)
            confidence = scores[classId]
            if confidence &gt; confThreshold:
                center_x = int(detection[0] * frameWidth)
                center_y = int(detection[1] * frameHeight)
                width = int(detection[2] * frameWidth)
                height = int(detection[3] * frameHeight)
                left = int(center_x - width / 2)
                top = int(center_y - height / 2)
                classIds.append(classId)
                confidences.append(float(confidence))
                boxes.append([left, top, width, height])

    # Perform non maximum suppression to eliminate redundant overlapping boxes with
    # lower confidences.
    indices = cv.dnn.NMSBoxes(boxes, confidences, confThreshold, nmsThreshold)
    for i in indices:
        i = i[0]
        box = boxes[i]
        left = box[0]
        top = box[1]
        width = box[2]
        height = box[3]
        drawPred(classIds[i], confidences[i], left, top, left + width, top + height)

# Process inputs
winName = &#39;Deep learning object detection in OpenCV&#39;
cv.namedWindow(winName, cv.WINDOW_NORMAL)

outputFile = &quot;yolo_out_py.avi&quot;
if (args.image):
    # Open the image file
    if not os.path.isfile(args.image):
        print(&quot;Input image file &quot;, args.image, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(args.image)
    outputFile = args.image[:-4]+&#39;_yolo_out_py.jpg&#39;
elif (args.video):
    # Open the video file
    if not os.path.isfile(args.video):
        print(&quot;Input video file &quot;, args.video, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(args.video)
    outputFile = args.video[:-4]+&#39;_yolo_out_py.avi&#39;
else:
    # Webcam input
    cap = cv.VideoCapture(0)

# Get the video writer initialized to save the output video
if (not args.image):
    vid_writer = cv.VideoWriter(outputFile, cv.VideoWriter_fourcc(&#39;M&#39;,&#39;J&#39;,&#39;P&#39;,&#39;G&#39;), 30, (round(cap.get(cv.CAP_PROP_FRAME_WIDTH)),round(cap.get(cv.CAP_PROP_FRAME_HEIGHT))))

while cv.waitKey(1) &lt; 0:
    
    # get frame from the video
    hasFrame, frame = cap.read()
    
    # Stop the program if reached end of video
    if not hasFrame:
        print(&quot;Done processing !!!&quot;)
        print(&quot;Output file is stored as &quot;, outputFile)
        cv.waitKey(3000)
        # Release device
        cap.release()
        break

    # Create a 4D blob from a frame.
    blob = cv.dnn.blobFromImage(frame, 1/255, (inpWidth, inpHeight), [0,0,0], 1, crop=False)

    # Sets the input to the network
    net.setInput(blob)

    # Runs the forward pass to get output of the output layers
    outs = net.forward(getOutputsNames(net))

    # Remove the bounding boxes with low confidence
    postprocess(frame, outs)

    # Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
    t, _ = net.getPerfProfile()
    label = &#39;Inference time: %.2f ms&#39; % (t * 1000.0 / cv.getTickFrequency())
    cv.putText(frame, label, (0, 15), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255))

    # Write the frame with the detection boxes
    if (args.image):
        cv.imwrite(outputFile, frame.astype(np.uint8));
    else:
        vid_writer.write(frame.astype(np.uint8))

    cv.imshow(winName, frame)
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/deep-learning-based-object-detection-using-yolov3-with-opencv-python-c/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/deep-learning-based-object-detection-using-yolov3-with-opencv-python-c/ </a></li></ul>`,74)]))}const c=e(i,[["render",r],["__file","2019-03-13-_OpenCV实战_7 使用YOLOv3和OpenCV进行基于深度学习的目标检测.html.vue"]]),p=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-13-_OpenCV%E5%AE%9E%E6%88%98_7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B.html","title":"[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测","lang":"zh-CN","frontmatter":{"date":"2019-03-13T17:37:53.000Z","tag":["OpenCV实战","OpenCV","深度学习"],"category":["OpenCV"],"description":"[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测 在这篇文章中，我们将学习如何在OpenCV上使用YOLOv3（目标检测网络）。YOLOv3是检测算法YOLO的最新变种已发布的模型可识别图像和视频中的80个不同对象，但最重要的是它具有超快速且几乎与Single Shot MultiBox（SSD）一样准确。从OpenCV...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-13-_OpenCV%E5%AE%9E%E6%88%98_7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测"}],["meta",{"property":"og:description","content":"[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测 在这篇文章中，我们将学习如何在OpenCV上使用YOLOv3（目标检测网络）。YOLOv3是检测算法YOLO的最新变种已发布的模型可识别图像和视频中的80个不同对象，但最重要的是它具有超快速且几乎与Single Shot MultiBox（SSD）一样准确。从OpenCV..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2019-03-13T17:37:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/1.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/2.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/3.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D7%20%E4%BD%BF%E7%94%A8YOLOv3%E5%92%8COpenCV%E8%BF%9B%E8%A1%8C%E5%9F%BA%E4%BA%8E%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9A%84%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B/4.jpg\\"],\\"datePublished\\":\\"2019-03-13T17:37:53.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 YOLO 介绍","slug":"_1-yolo-介绍","link":"#_1-yolo-介绍","children":[{"level":3,"title":"1.1 YOLOv3 原理","slug":"_1-1-yolov3-原理","link":"#_1-1-yolov3-原理","children":[]},{"level":3,"title":"1.2 为什么要将OpenCV 用于YOLO ？","slug":"_1-2-为什么要将opencv-用于yolo","link":"#_1-2-为什么要将opencv-用于yolo","children":[]},{"level":3,"title":"1.3 在Darknet 和OpenCV 上对YOLOv3 进行速度测试","slug":"_1-3-在darknet-和opencv-上对yolov3-进行速度测试","link":"#_1-3-在darknet-和opencv-上对yolov3-进行速度测试","children":[]}]},{"level":2,"title":"2 使用YOLOv3 进行对象检测（C++/Python ）","slug":"_2-使用yolov3-进行对象检测-c-python","link":"#_2-使用yolov3-进行对象检测-c-python","children":[{"level":3,"title":"2.1 模型及配置文件下载","slug":"_2-1-模型及配置文件下载","link":"#_2-1-模型及配置文件下载","children":[]},{"level":3,"title":"2.2 初始化参数","slug":"_2-2-初始化参数","link":"#_2-2-初始化参数","children":[]},{"level":3,"title":"2.3 加载模型和获取输入图像","slug":"_2-3-加载模型和获取输入图像","link":"#_2-3-加载模型和获取输入图像","children":[]},{"level":3,"title":"2.4 单帧图像处理","slug":"_2-4-单帧图像处理","link":"#_2-4-单帧图像处理","children":[]}]},{"level":2,"title":"3 结果和代码","slug":"_3-结果和代码","link":"#_3-结果和代码","children":[{"level":3,"title":"3.1 结果","slug":"_3-1-结果","link":"#_3-1-结果","children":[]},{"level":3,"title":"3.2 代码","slug":"_3-2-代码","link":"#_3-2-代码","children":[]}]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":18.62,"words":5586},"filePathRelative":"blog/opencv/opencv实战/2019-03-13-[OpenCV实战]7 使用YOLOv3和OpenCV进行基于深度学习的目标检测.md","localizedDate":"2019年3月14日","excerpt":"\\n<p>在这篇文章中，我们将学习如何在OpenCV上使用YOLOv3（目标检测网络）。YOLOv3是检测算法YOLO的最新变种已发布的模型可识别图像和视频中的80个不同对象，但最重要的是它具有超快速且几乎与Single Shot MultiBox（SSD）一样准确。从OpenCV 3.4.2开始，您可以在自己的OpenCV应用程序中轻松使用YOLOv3模型。</p>\\n<p>我们可以将对象检测器视为对象定位器和对象识别器的组合。</p>\\n<h2><strong>1 YOLO</strong> <strong>介绍</strong></h2>\\n<h3><strong>1.1 YOLOv3</strong> <strong>原理</strong></h3>","autoDesc":true}');export{c as comp,p as data};
