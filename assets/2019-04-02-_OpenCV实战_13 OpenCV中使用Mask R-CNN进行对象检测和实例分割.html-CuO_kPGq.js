import{_ as e,c as n,a as o,o as a}from"./app-CJwJJlha.js";const r={};function s(i,t){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="opencv实战-13-opencv中使用mask-r-cnn进行对象检测和实例分割" tabindex="-1"><a class="header-anchor" href="#opencv实战-13-opencv中使用mask-r-cnn进行对象检测和实例分割"><span>[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割</span></a></h1><p>Mask R-CNN具体内容见：</p><p><a href="https://arxiv.org/pdf/1703.06870.pdf" target="_blank" rel="noopener noreferrer"> https://arxiv.org/pdf/1703.06870.pdf</a></p><p>Mask R-CNN最初于2017年11月由Facebook的AI研究团队使用Python和Caffe2推出。工程代码见：</p><p><a href="https://github.com/facebookresearch/Detectron" target="_blank" rel="noopener noreferrer"> https://github.com/facebookresearch/Detectron</a></p><p>后来Mask R-CNN被移植到Tensorflow，并且在共享了几个预先训练的模型，这些模型具有不同的训练架构，如InceptionV2，ResNet50，ResNet101和Inception- ResnetV2 。它们还为您提供培训自己模型的工具。</p><p><a href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md" target="_blank" rel="noopener noreferrer">https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md</a></p><p><a href="https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/instance_segmentation.md" target="_blank" rel="noopener noreferrer">https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/instance_segmentation.md</a></p><p>基于Inception训练的Mask R-CNN速度最快，甚至可以在CPU上使用它，因此我们在本教程中选择了它。该模型在MSCOCO数据集上进行了训练。我们将共享OpenCV(OpenCV 3.43以上版本)代码以在C ++和Python中加载和使用该模型。</p><h2 id="_1-背景介绍" tabindex="-1"><a class="header-anchor" href="#_1-背景介绍"><span><strong>1</strong> <strong>背景介绍</strong></span></a></h2><h3 id="_1-1-什么是图像分割和实例分割" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是图像分割和实例分割"><span><strong>1.1</strong> <strong>什么是图像分割和实例分割</strong></span></a></h3><p>在计算机视觉中，术语“图像分割”或简称“分割”意味着基于某些标准将图像分成像素区域。您可以根据颜色，纹理或您已决定的其他一些条件进行分割。这些区域有时也称为超像素区域。</p><p>进行图像分割有多种方法比如实例分割，语义分割，全景分割等。</p><p>具体区别见：</p><p><a href="https://zhuanlan.zhihu.com/p/50996404" target="_blank" rel="noopener noreferrer"> https://zhuanlan.zhihu.com/p/50996404 </a></p><p>在实例分割中，目标是检测图像中的特定对象并在感兴趣的对象周围创建掩模。实例分割也可以被认为是对象检测，其输出是掩码而不仅仅是边界框。与尝试对图像中的每个像素进行分类的语义分割不同，实例分割不仅仅在标记图像中的每个像素，还区分各个单体。下面我们看一个在非常相似的彩色背景上的两只绵羊的实例分割的例子。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/10/Mask-RCNN-results-1024x290.png" alt="https://www.learnopencv.com/wp-content/uploads/2018/10/Mask-RCNN-results-1024x290.png" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2018/10/Mask-RCNN-results-1024x290.png</figcaption></figure><h3 id="_1-2-mask-rcnn-原理" tabindex="-1"><a class="header-anchor" href="#_1-2-mask-rcnn-原理"><span><strong>1.2 Mask-RCNN</strong> <strong>原理</strong></span></a></h3><p>Mask-RCNN是对原始R-CNN论文的一系列改进结果，用于物体检测。R-CNN基于选择性搜索的方法生成候选框，然后使用卷积网络一次一个地处理每个候选框区域以输出对象标签及其边界框。</p><p>R-CNN具体见：</p><p><a href="https://arxiv.org/abs/1311.2524" target="_blank" rel="noopener noreferrer"> https://arxiv.org/abs/1311.2524 </a></p><p>Fast R-CNN通过使用ROIPool层在其CNN中一起处理所有提出的候选框区域，使得R-CNN算法更快。</p><p>Fast R-CNN具体见：</p><p><a href="https://arxiv.org/pdf/1504.08083.pdf" target="_blank" rel="noopener noreferrer"> https://arxiv.org/pdf/1504.08083.pdf</a></p><p>Faster R-CNN通过提取候选区域的网络RPN，代替了费时的选择性搜索，使得检测速度大幅提高。</p><p>Faster R-CNN具体见：</p><p><a href="https://arxiv.org/pdf/1506.01497.pdf" target="_blank" rel="noopener noreferrer"> https://arxiv.org/pdf/1506.01497.pdf</a></p><p>上述R-CNN及其优化版本简要原理见：</p><p><a href="https://www.cnblogs.com/skyfsm/p/6806246.html" target="_blank" rel="noopener noreferrer"> https://www.cnblogs.com/skyfsm/p/6806246.html</a></p><p>Mask R-CNN是对Faster RCNN的一种改进，它包括掩码预测与标签预测和边界框预测两个输出，如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割/20190402185014806.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Mask-RCNN网络有两个主要部分。</p><p>第一个是候选区域生成网络，每个图像生成大约300个候选区域。在训练期间，这些候选区域（ROI）中的每一个都通过第二部分，即目标检测和掩膜预测网络，如上所示。注意，由于掩模预测分支与分类框预测分支并行运行，因此对于每个给定的ROI，网络预测可能会获得属于任何类别的掩模。</p><p>在推理期间，候选区域会用非最大抑制性方法进行筛选，并且掩模预测分支仅处理最高得分100检测框。因此，对于100个ROI和90个对象类，网络的掩模预测部分输出尺寸为100x90x15x15的4D张量，其中每个掩模的大小为15×15。</p><p>对于上面显示的绵羊图像，网络检测到两个对象。对于每个对象，它输出一个数组，其中包含预测的类分数（表示对象属于预测类的概率），检测到的对象的边界框的左，上，右和下位置。从掩码预测分支的输出中提取相应分类的掩码。检测到的两个对象的掩码如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割/20190402185013714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>与Faster R-CNN一样，Mask R-CNN所用架构网络也很灵活。我们之所以选择InceptionV2是因为速度更快，但正如Mask R-CNN论文的作者所指出的那样，人们可以通过ResNeXt-101这样的更好的架构获得更好的结果。</p><p>与其他物体探测器（如YOLOv3）相比，Mask-RCNN网络可在更大的图像上运行。网络调整输入图像的大小，使得较小的边是800像素。下面我们将详细介绍获取实例分段结果所需的步骤。为了简化和清晰可视化，我们使用相同的颜色来表示同一类的对象，</p><p>Mask R-CNN简要理解见：</p><p><a href="https://www.cnblogs.com/wangyong/p/9305347.html" target="_blank" rel="noopener noreferrer"> https://www.cnblogs.com/wangyong/p/9305347.html</a></p><h2 id="_2-mask-rcnn-在opencv-中的使用" tabindex="-1"><a class="header-anchor" href="#_2-mask-rcnn-在opencv-中的使用"><span><strong>2 Mask-RCNN</strong> <strong>在OpenCV</strong> <strong>中的使用</strong></span></a></h2><h3 id="_2-1-模型下载" tabindex="-1"><a class="header-anchor" href="#_2-1-模型下载"><span><strong>2.1</strong> <strong>模型下载</strong></span></a></h3><p>模型下载地址：</p><p><a href="http://download.tensorflow.org/models/object_detection/mask_rcnn_inception_v2_coco_2018_01_28.tar.gz" target="_blank" rel="noopener noreferrer">http://download.tensorflow.org/models/object_detection/mask_rcnn_inception_v2_coco_2018_01_28.tar.gz </a></p><h3 id="_2-2-模型初始化" tabindex="-1"><a class="header-anchor" href="#_2-2-模型初始化"><span><strong>2.2</strong> <strong>模型初始化</strong></span></a></h3><p>Mask-RCNN算法输出生成为边界框。每个边界框与置信度分数相关联。置信度阈值参数以下的都将被忽略。从网络输出的对象掩码是灰度图像。由于我们在本教程中使用二值掩码，因此我们使用maskThreshold参数来阈值灰色掩码图像。降低其值将获取更大的掩模。有时这有助于包括在边界附近遗漏的部分，但同时，它还可能包括更尖的边界区域处的背景像素。</p><p>文件mscoco_labels.names包含训练模型的所有预测对象。colors.txt文件包含用于标记各种类对象的所有颜色。</p><p>接下来，我们使用这两个文件加载网络</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mask_rcnn_inception_v2_coco.pb：预先训练的权重；</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mask_rcnn_inception_v2_coco.pbtxt：模型结构文件；</span></span>
<span class="line"><span></span></span>
<span class="line"><span>下载后的文件有个frozen_inference_graph.pb文件，我改成了mask_rcnn_inception_v2_coco.pb。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>我们在这里将DNN后端设置为OpenCV，将目标设置为CPU。您可以尝试将首选目标设置为cv.dnn.DNN_TARGET_OPENCL以在GPU上运行它。当前OpenCV版本中的DNN模块仅使用英特尔的GPU进行测试。我们将读取图像，视频流或网络摄像头进行检测。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>C++代码如下：</p><pre><code>	//0-image,1-video,2-camera
	int read_file = 0;
	// Load names of classes 导入分类名文件
	string classesFile = &quot;./model/mscoco_labels.names&quot;;
	ifstream ifs(classesFile.c_str());
	string line;
	while (getline(ifs, line))
	{
		classes.push_back(line);
	}

	// Load the colors 导入颜色类文件
	string colorsFile = &quot;./model/colors.txt&quot;;
	ifstream colorFptr(colorsFile.c_str());
	while (getline(colorFptr, line))
	{
		char *pEnd;
		double r, g, b;
		//字符串转换成浮点数
		r = strtod(line.c_str(), &amp;pEnd);
		g = strtod(pEnd, NULL);
		b = strtod(pEnd, NULL);
		Scalar color = Scalar(r, g, b, 255.0);
		colors.push_back(Scalar(r, g, b, 255.0));
	}

	// Give the configuration and weight files for the model
	String textGraph = &quot;./model/mask_rcnn_inception_v2_coco.pbtxt&quot;;
	String modelWeights = &quot;./model/mask_rcnn_inception_v2_coco.pb&quot;;
</code></pre><h3 id="_2-3-模型加载" tabindex="-1"><a class="header-anchor" href="#_2-3-模型加载"><span>2.3 模型加载</span></a></h3><p>神经网络的输入图像需要采用称为blob的特定格式。这一点类似于其他OpenCV调用深度学习网络的架构。但是用于我们调用的是tensorflow的模型，所以swapRGB参数设置为true。Caffe模型就不需要。</p><p>然后将blob作为其输入传递到网络，但是我们需要事先设定获取网络的输出层名字。因为输出有两个。这个模型有detection_out_final和detection_masks两个输出层。 这两个输出层分别为预测框的输出结果层和掩模的输出结果层。我们将在下一节中滤除低置信度分数的框。</p><p>C++代码如下：</p><pre><code>	// Load the network 导入网络
	Net net = readNetFromTensorflow(modelWeights, textGraph);
	net.setPreferableBackend(DNN_BACKEND_OPENCV);
	//只使用CPU
	net.setPreferableTarget(DNN_TARGET_CPU);

	// Open a video file or an image file or a camera stream.
	string str, outputFile;
	VideoCapture cap;
	VideoWriter video;
	Mat frame, blob;

	try
	{
		//输出文件，默认是视频
		outputFile = &quot;mask_rcnn_out_cpp.avi&quot;;
		if (read_file == 0)
		{
			// Open the image file 打开图像文件
			str = &quot;image/cars.jpg&quot;;
			//cout &lt;&lt; &quot;Image file input : &quot; &lt;&lt; str &lt;&lt; endl;
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			frame = imread(str);
			str.replace(str.end() - 4, str.end(), &quot;_mask_rcnn_out.jpg&quot;);
			outputFile = str;
		}
		else if (read_file == 1)
		{
			// Open the video file 打开视频文件
			str = &quot;./image/cars.mp4&quot;;
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			cap.open(str);
			str.replace(str.end() - 4, str.end(), &quot;_mask_rcnn_out.avi&quot;);
			outputFile = str;
		}
		// Open the webcam 打开摄像头
		else
		{
			cap.open(0);
		}
	}
	catch (...)
	{
		cout &lt;&lt; &quot;Could not open the input image/video stream&quot; &lt;&lt; endl;
		return 0;
	}

	// Get the video writer initialized to save the output video 如果读入的不是图像，生成输出视频
	if (read_file != 0)
	{
		video.open(outputFile, VideoWriter::fourcc(&#39;M&#39;, &#39;J&#39;, &#39;P&#39;, &#39;G&#39;), 28,
				   Size(cap.get(CAP_PROP_FRAME_WIDTH), cap.get(CAP_PROP_FRAME_HEIGHT)));
	}

	// Create a window 显示窗口
	static const string kWinName = &quot;Deep learning object detection in OpenCV&quot;;

	//Process frames 处理图像
	while (waitKey(1) &lt; 0)
	{
		//如果是视频
		if (read_file != 0)
		{
			// get frame from the video 获取单帧图像
			cap &gt;&gt; frame;
		}

		// Stop the program if reached end of video 如果图像不存在
		if (frame.empty())
		{
			cout &lt;&lt; &quot;Done processing !!!&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;Output file is stored as &quot; &lt;&lt; outputFile &lt;&lt; endl;
			waitKey(0);
			break;
		}

		// Create a 4D blob from a frame 获得深度学习的输入图像
		blobFromImage(frame, blob, 1.0, Size(frame.cols, frame.rows), Scalar(), true, false);
		//blobFromImage(frame, blob);

		//Sets the input to the network 设置输入
		net.setInput(blob);

		// Runs the forward pass to get output from the output layers 获得输出层
		std::vector&lt;String&gt; outNames(2);
		outNames[0] = &quot;detection_out_final&quot;;
		outNames[1] = &quot;detection_masks&quot;;
		vector&lt;Mat&gt; outs;
		net.forward(outs, outNames);

		// Extract the bounding box and mask for each of the detected objects 提取预测框和掩模
		postprocess(frame, outs);

		// Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
		vector&lt;double&gt; layersTimes;
		double freq = getTickFrequency() / 1000;
		double t = net.getPerfProfile(layersTimes) / freq;
		string label = format(&quot;Mask-RCNN Inference time for a frame : %0.0f ms&quot;, t);
		putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 0, 0));

		// Write the frame with the detection boxes 保存结果
		Mat detectedFrame;
		frame.convertTo(detectedFrame, CV_8U);
		namedWindow(kWinName, WINDOW_NORMAL);
		imshow(kWinName, frame);
		//enter退出
		if (waitKey(1000) == 27)
		{
			break;
		}
		if (read_file == 0)
		{
			imwrite(outputFile, detectedFrame);
			break;
		}
		else
		{
			video.write(detectedFrame);
		}
	}
</code></pre><h3 id="_2-4-输出结果处理" tabindex="-1"><a class="header-anchor" href="#_2-4-输出结果处理"><span>2.4 输出结果处理</span></a></h3><p>网络的输出掩码对象是一个四维对象，其中第一维表示帧中检测到的框的数量，第二维表示模型中的类数，第三维和第四维表示掩模形状（15×15）。如果框的置信度小于给定阈值，则删除边界框并且不考虑进行进一步处理。</p><p>C++代码如下：</p><pre><code>/**
 * @brief For each frame, extract the bounding box and mask for each detected object 提取每张图像的预测框和掩模
 * 
 * @param frame 
 * @param outs 
 */
void postprocess(Mat &amp;frame, const vector&lt;Mat&gt; &amp;outs)
{
	//预测框结果
	Mat outDetections = outs[0];
	//掩模结果
	Mat outMasks = outs[1];

	// Output size of masks is NxCxHxW where
	// N - number of detected boxes
	// C - number of classes (excluding background)
	// HxW - segmentation shape
	//预测的框个数
	const int numDetections = outDetections.size[2];
	//类别数
	const int numClasses = outMasks.size[1];

	outDetections = outDetections.reshape(1, outDetections.total() / 7);
	//筛选预测框数
	for (int i = 0; i &lt; numDetections; ++i)
	{
		//提取预测框置信度
		float score = outDetections.at&lt;float&gt;(i, 2);
		//超过阈值
		if (score &gt; confThreshold)
		{
			// Extract the bounding box
			//类别
			int classId = static_cast&lt;int&gt;(outDetections.at&lt;float&gt;(i, 1));
			int left = static_cast&lt;int&gt;(frame.cols * outDetections.at&lt;float&gt;(i, 3));
			int top = static_cast&lt;int&gt;(frame.rows * outDetections.at&lt;float&gt;(i, 4));
			int right = static_cast&lt;int&gt;(frame.cols * outDetections.at&lt;float&gt;(i, 5));
			int bottom = static_cast&lt;int&gt;(frame.rows * outDetections.at&lt;float&gt;(i, 6));

			//防止框画在外面
			left = max(0, min(left, frame.cols - 1));
			top = max(0, min(top, frame.rows - 1));
			right = max(0, min(right, frame.cols - 1));
			bottom = max(0, min(bottom, frame.rows - 1));
			Rect box = Rect(left, top, right - left + 1, bottom - top + 1);

			// Extract the mask for the object 提取掩模
			Mat objectMask(outMasks.size[2], outMasks.size[3], CV_32F, outMasks.ptr&lt;float&gt;(i, classId));

			// Draw bounding box, colorize and show the mask on the image
			drawBox(frame, classId, score, box, objectMask);
		}
	}
}
</code></pre><h3 id="_2-5-画图" tabindex="-1"><a class="header-anchor" href="#_2-5-画图"><span>2.5 画图</span></a></h3><p>最后，我们在输入图像上绘制通过滤后的框，其中包含指定的类标签和置信度分数。我们还将彩色掩模与其物体轮廓叠加在框内。在此代码中，我们对属于同一类的所有对象使用相同的颜色，但您也可以对不同的实例进行不同的着色。</p><p>C++代码如下：</p><pre><code>/**
 * @brief  Draw the predicted bounding box, colorize and show the mask on the image 画图
 * 
 * @param frame 
 * @param classId 
 * @param conf 
 * @param box 
 * @param objectMask 
 */
void drawBox(Mat &amp;frame, int classId, float conf, Rect box, Mat &amp;objectMask)
{
	//Draw a rectangle displaying the bounding box 画预测框
	rectangle(frame, Point(box.x, box.y), Point(box.x + box.width, box.y + box.height), Scalar(255, 178, 50), 3);

	//Get the label for the class name and its confidence
	//置信度获取
	string label = format(&quot;%.2f&quot;, conf);
	//获取标签
	if (!classes.empty())
	{
		CV_Assert(classId &lt; (int)classes.size());
		label = classes[classId] + &quot;:&quot; + label;
	}

	//Display the label at the top of the bounding box
	int baseLine;
	//获取字符串的高度和宽度
	//标签，字体，文本大小的倍数，文本粗细，文本最低点对应的纵坐标
	Size labelSize = getTextSize(label, FONT_HERSHEY_SIMPLEX, 0.5, 1, &amp;baseLine);
	box.y = max(box.y, labelSize.height);
	//画框打标签
	rectangle(frame, Point(box.x, box.y - round(1.5 * labelSize.height)), Point(box.x + round(1.5 * labelSize.width), box.y + baseLine), Scalar(255, 255, 255), FILLED);
	putText(frame, label, Point(box.x, box.y), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 0), 1);
	//填充颜色
	Scalar color = colors[classId % colors.size()];

	// Resize the mask, threshold, color and apply it on the image 重置大小
	resize(objectMask, objectMask, Size(box.width, box.height));
	Mat mask = (objectMask &gt; maskThreshold);
	//叠加获得颜色掩模
	Mat coloredRoi = (0.3 * color + 0.7 * frame(box));
	coloredRoi.convertTo(coloredRoi, CV_8UC3);

	// Draw the contours on the image 画轮廓
	vector&lt;Mat&gt; contours;
	Mat hierarchy;
	mask.convertTo(mask, CV_8U);
	findContours(mask, contours, hierarchy, RETR_CCOMP, CHAIN_APPROX_SIMPLE);
	drawContours(coloredRoi, contours, -1, color, 5, LINE_8, hierarchy, 100);
	coloredRoi.copyTo(frame(box), mask);
}
</code></pre><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码"><span>3 结果和代码</span></a></h2><h3 id="_3-1-结果" tabindex="-1"><a class="header-anchor" href="#_3-1-结果"><span>3.1 结果</span></a></h3><p>Mask R-CNN精度不错，但是速度很慢。不过未来的应用趋势吧。下图是原图和结果，但是结果是debug模式下跑的，实际快很多。CPUI5标压无gpu下差不多5000ms一帧。</p><p>原图：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割/20190402185016632.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>检测结果图像：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割/20190402185017255.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-2-代码" tabindex="-1"><a class="header-anchor" href="#_3-2-代码"><span>3.2 代码</span></a></h3><p>代码地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>C++版本代码：</p><pre><code>// Mask R-CNN in OpenCV.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;iostream&gt;

#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;iostream&gt;
#include &lt;string.h&gt;

#include &lt;opencv2/dnn.hpp&gt;
#include &lt;opencv2/imgproc.hpp&gt;
#include &lt;opencv2/highgui.hpp&gt;

using namespace cv;
using namespace dnn;
using namespace std;

// Initialize the parameters
// Confidence threshold 置信度阈值
float confThreshold = 0.5;
// Mask threshold 掩模阈值
float maskThreshold = 0.3;

vector&lt;string&gt; classes;
vector&lt;Scalar&gt; colors;

// Draw the predicted bounding box
void drawBox(Mat &amp;frame, int classId, float conf, Rect box, Mat &amp;objectMask);

// Postprocess the neural network&#39;s output for each frame
void postprocess(Mat &amp;frame, const vector&lt;Mat&gt; &amp;outs);

int main()
{
	//0-image,1-video,2-camera
	int read_file = 0;
	// Load names of classes 导入分类名文件
	string classesFile = &quot;./model/mscoco_labels.names&quot;;
	ifstream ifs(classesFile.c_str());
	string line;
	while (getline(ifs, line))
	{
		classes.push_back(line);
	}

	// Load the colors 导入颜色类文件
	string colorsFile = &quot;./model/colors.txt&quot;;
	ifstream colorFptr(colorsFile.c_str());
	while (getline(colorFptr, line))
	{
		char *pEnd;
		double r, g, b;
		//字符串转换成浮点数
		r = strtod(line.c_str(), &amp;pEnd);
		g = strtod(pEnd, NULL);
		b = strtod(pEnd, NULL);
		Scalar color = Scalar(r, g, b, 255.0);
		colors.push_back(Scalar(r, g, b, 255.0));
	}

	// Give the configuration and weight files for the model
	String textGraph = &quot;./model/mask_rcnn_inception_v2_coco.pbtxt&quot;;
	String modelWeights = &quot;./model/mask_rcnn_inception_v2_coco.pb&quot;;

	// Load the network 导入网络
	Net net = readNetFromTensorflow(modelWeights, textGraph);
	net.setPreferableBackend(DNN_BACKEND_OPENCV);
	//只使用CPU
	net.setPreferableTarget(DNN_TARGET_CPU);

	// Open a video file or an image file or a camera stream.
	string str, outputFile;
	VideoCapture cap;
	VideoWriter video;
	Mat frame, blob;

	try
	{
		//输出文件，默认是视频
		outputFile = &quot;mask_rcnn_out_cpp.avi&quot;;
		if (read_file == 0)
		{
			// Open the image file 打开图像文件
			str = &quot;image/cars.jpg&quot;;
			//cout &lt;&lt; &quot;Image file input : &quot; &lt;&lt; str &lt;&lt; endl;
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			frame = imread(str);
			str.replace(str.end() - 4, str.end(), &quot;_mask_rcnn_out.jpg&quot;);
			outputFile = str;
		}
		else if (read_file == 1)
		{
			// Open the video file 打开视频文件
			str = &quot;./image/cars.mp4&quot;;
			ifstream ifile(str);
			if (!ifile)
			{
				throw(&quot;error&quot;);
			}
			cap.open(str);
			str.replace(str.end() - 4, str.end(), &quot;_mask_rcnn_out.avi&quot;);
			outputFile = str;
		}
		// Open the webcam 打开摄像头
		else
		{
			cap.open(0);
		}
	}
	catch (...)
	{
		cout &lt;&lt; &quot;Could not open the input image/video stream&quot; &lt;&lt; endl;
		return 0;
	}

	// Get the video writer initialized to save the output video 如果读入的不是图像，生成输出视频
	if (read_file != 0)
	{
		video.open(outputFile, VideoWriter::fourcc(&#39;M&#39;, &#39;J&#39;, &#39;P&#39;, &#39;G&#39;), 28,
				   Size(cap.get(CAP_PROP_FRAME_WIDTH), cap.get(CAP_PROP_FRAME_HEIGHT)));
	}

	// Create a window 显示窗口
	static const string kWinName = &quot;Deep learning object detection in OpenCV&quot;;

	//Process frames 处理图像
	while (waitKey(1) &lt; 0)
	{
		//如果是视频
		if (read_file != 0)
		{
			// get frame from the video 获取单帧图像
			cap &gt;&gt; frame;
		}

		// Stop the program if reached end of video 如果图像不存在
		if (frame.empty())
		{
			cout &lt;&lt; &quot;Done processing !!!&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;Output file is stored as &quot; &lt;&lt; outputFile &lt;&lt; endl;
			waitKey(0);
			break;
		}

		// Create a 4D blob from a frame 获得深度学习的输入图像
		blobFromImage(frame, blob, 1.0, Size(frame.cols, frame.rows), Scalar(), true, false);
		//blobFromImage(frame, blob);

		//Sets the input to the network 设置输入
		net.setInput(blob);

		// Runs the forward pass to get output from the output layers 获得输出层
		std::vector&lt;String&gt; outNames(2);
		outNames[0] = &quot;detection_out_final&quot;;
		outNames[1] = &quot;detection_masks&quot;;
		vector&lt;Mat&gt; outs;
		net.forward(outs, outNames);

		// Extract the bounding box and mask for each of the detected objects 提取预测框和掩模
		postprocess(frame, outs);

		// Put efficiency information. The function getPerfProfile returns the overall time for inference(t) and the timings for each of the layers(in layersTimes)
		vector&lt;double&gt; layersTimes;
		double freq = getTickFrequency() / 1000;
		double t = net.getPerfProfile(layersTimes) / freq;
		string label = format(&quot;Mask-RCNN Inference time for a frame : %0.0f ms&quot;, t);
		putText(frame, label, Point(0, 15), FONT_HERSHEY_SIMPLEX, 0.5, Scalar(0, 0, 0));

		// Write the frame with the detection boxes 保存结果
		Mat detectedFrame;
		frame.convertTo(detectedFrame, CV_8U);
		namedWindow(kWinName, WINDOW_NORMAL);
		imshow(kWinName, frame);
		//enter退出
		if (waitKey(1000) == 27)
		{
			break;
		}
		if (read_file == 0)
		{
			imwrite(outputFile, detectedFrame);
			break;
		}
		else
		{
			video.write(detectedFrame);
		}
	}

	cap.release();
	//释放生成的视频
	if (read_file != 0)
	{
		video.release();
	}

	return 0;
}

/**
 * @brief For each frame, extract the bounding box and mask for each detected object 提取每张图像的预测框和掩模
 * 
 * @param frame 
 * @param outs 
 */
void postprocess(Mat &amp;frame, const vector&lt;Mat&gt; &amp;outs)
{
	//预测框结果
	Mat outDetections = outs[0];
	//掩模结果
	Mat outMasks = outs[1];

	// Output size of masks is NxCxHxW where
	// N - number of detected boxes
	// C - number of classes (excluding background)
	// HxW - segmentation shape
	//预测的框个数
	const int numDetections = outDetections.size[2];
	//类别数
	const int numClasses = outMasks.size[1];

	outDetections = outDetections.reshape(1, outDetections.total() / 7);
	//筛选预测框数
	for (int i = 0; i &lt; numDetections; ++i)
	{
		//提取预测框置信度
		float score = outDetections.at&lt;float&gt;(i, 2);
		//超过阈值
		if (score &gt; confThreshold)
		{
			// Extract the bounding box
			//类别
			int classId = static_cast&lt;int&gt;(outDetections.at&lt;float&gt;(i, 1));
			int left = static_cast&lt;int&gt;(frame.cols * outDetections.at&lt;float&gt;(i, 3));
			int top = static_cast&lt;int&gt;(frame.rows * outDetections.at&lt;float&gt;(i, 4));
			int right = static_cast&lt;int&gt;(frame.cols * outDetections.at&lt;float&gt;(i, 5));
			int bottom = static_cast&lt;int&gt;(frame.rows * outDetections.at&lt;float&gt;(i, 6));

			//防止框画在外面
			left = max(0, min(left, frame.cols - 1));
			top = max(0, min(top, frame.rows - 1));
			right = max(0, min(right, frame.cols - 1));
			bottom = max(0, min(bottom, frame.rows - 1));
			Rect box = Rect(left, top, right - left + 1, bottom - top + 1);

			// Extract the mask for the object 提取掩模
			Mat objectMask(outMasks.size[2], outMasks.size[3], CV_32F, outMasks.ptr&lt;float&gt;(i, classId));

			// Draw bounding box, colorize and show the mask on the image
			drawBox(frame, classId, score, box, objectMask);
		}
	}
}

/**
 * @brief  Draw the predicted bounding box, colorize and show the mask on the image 画图
 * 
 * @param frame 
 * @param classId 
 * @param conf 
 * @param box 
 * @param objectMask 
 */
void drawBox(Mat &amp;frame, int classId, float conf, Rect box, Mat &amp;objectMask)
{
	//Draw a rectangle displaying the bounding box 画预测框
	rectangle(frame, Point(box.x, box.y), Point(box.x + box.width, box.y + box.height), Scalar(255, 178, 50), 3);

	//Get the label for the class name and its confidence
	//置信度获取
	string label = format(&quot;%.2f&quot;, conf);
	//获取标签
	if (!classes.empty())
	{
		CV_Assert(classId &lt; (int)classes.size());
		label = classes[classId] + &quot;:&quot; + label;
	}

	//Display the label at the top of the bounding box
	int baseLine;
	//获取字符串的高度和宽度
	//标签，字体，文本大小的倍数，文本粗细，文本最低点对应的纵坐标
	Size labelSize = getTextSize(label, FONT_HERSHEY_SIMPLEX, 0.5, 1, &amp;baseLine);
	box.y = max(box.y, labelSize.height);
	//画框打标签
	rectangle(frame, Point(box.x, box.y - round(1.5 * labelSize.height)), Point(box.x + round(1.5 * labelSize.width), box.y + baseLine), Scalar(255, 255, 255), FILLED);
	putText(frame, label, Point(box.x, box.y), FONT_HERSHEY_SIMPLEX, 0.75, Scalar(0, 0, 0), 1);
	//填充颜色
	Scalar color = colors[classId % colors.size()];

	// Resize the mask, threshold, color and apply it on the image 重置大小
	resize(objectMask, objectMask, Size(box.width, box.height));
	Mat mask = (objectMask &gt; maskThreshold);
	//叠加获得颜色掩模
	Mat coloredRoi = (0.3 * color + 0.7 * frame(box));
	coloredRoi.convertTo(coloredRoi, CV_8UC3);

	// Draw the contours on the image 画轮廓
	vector&lt;Mat&gt; contours;
	Mat hierarchy;
	mask.convertTo(mask, CV_8U);
	findContours(mask, contours, hierarchy, RETR_CCOMP, CHAIN_APPROX_SIMPLE);
	drawContours(coloredRoi, contours, -1, color, 5, LINE_8, hierarchy, 100);
	coloredRoi.copyTo(frame(box), mask);
}
</code></pre><p>Python版本代码：</p><pre><code>import cv2 as cv
import numpy as np
import os.path
import sys
import random

# Initialize the parameters
confThreshold = 0.5  # Confidence threshold
maskThreshold = 0.3  # Mask threshold



# Draw the predicted bounding box, colorize and show the mask on the image
def drawBox(frame, classId, conf, left, top, right, bottom, classMask):
    # Draw a bounding box.
    cv.rectangle(frame, (left, top), (right, bottom), (255, 178, 50), 3)
    
    # Print a label of class.
    label = &#39;%.2f&#39; % conf
    if classes:
        assert(classId &lt; len(classes))
        label = &#39;%s:%s&#39; % (classes[classId], label)
    
    # Display the label at the top of the bounding box
    labelSize, baseLine = cv.getTextSize(label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
    top = max(top, labelSize[1])
    cv.rectangle(frame, (left, top - round(1.5*labelSize[1])), (left + round(1.5*labelSize[0]), top + baseLine), (255, 255, 255), cv.FILLED)
    cv.putText(frame, label, (left, top), cv.FONT_HERSHEY_SIMPLEX, 0.75, (0,0,0), 1)

    # Resize the mask, threshold, color and apply it on the image
    classMask = cv.resize(classMask, (right - left + 1, bottom - top + 1))
    mask = (classMask &gt; maskThreshold)
    roi = frame[top:bottom+1, left:right+1][mask]

    # color = colors[classId%len(colors)]
    # Comment the above line and uncomment the two lines below to generate different instance colors
    colorIndex = random.randint(0, len(colors)-1)
    color = colors[colorIndex]

    frame[top:bottom+1, left:right+1][mask] = ([0.3*color[0], 0.3*color[1], 0.3*color[2]] + 0.7 * roi).astype(np.uint8)

    # Draw the contours on the image
    mask = mask.astype(np.uint8)
    contours, hierarchy = cv.findContours(mask,cv.RETR_TREE,cv.CHAIN_APPROX_SIMPLE)
    cv.drawContours(frame[top:bottom+1, left:right+1], contours, -1, color, 3, cv.LINE_8, hierarchy, 100)

# For each frame, extract the bounding box and mask for each detected object
def postprocess(boxes, masks):
    # Output size of masks is NxCxHxW where
    # N - number of detected boxes
    # C - number of classes (excluding background)
    # HxW - segmentation shape
    numClasses = masks.shape[1]
    numDetections = boxes.shape[2]

    frameH = frame.shape[0]
    frameW = frame.shape[1]

    for i in range(numDetections):
        box = boxes[0, 0, i]
        mask = masks[i]
        score = box[2]
        if score &gt; confThreshold:
            classId = int(box[1])
            
            # Extract the bounding box
            left = int(frameW * box[3])
            top = int(frameH * box[4])
            right = int(frameW * box[5])
            bottom = int(frameH * box[6])
            
            left = max(0, min(left, frameW - 1))
            top = max(0, min(top, frameH - 1))
            right = max(0, min(right, frameW - 1))
            bottom = max(0, min(bottom, frameH - 1))
            
            # Extract the mask for the object
            classMask = mask[classId]

            # Draw bounding box, colorize and show the mask on the image
            drawBox(frame, classId, score, left, top, right, bottom, classMask)


# Load names of classes
classesFile = &quot;./model/mscoco_labels.names&quot;;
classes = None
with open(classesFile, &#39;rt&#39;) as f:
   classes = f.read().rstrip(&#39;\\n&#39;).split(&#39;\\n&#39;)

# Give the textGraph and weight files for the model
textGraph = &quot;./model/mask_rcnn_inception_v2_coco.pbtxt&quot;;
modelWeights = &quot;./model/mask_rcnn_inception_v2_coco.pb&quot;;

# Load the network
net = cv.dnn.readNetFromTensorflow(modelWeights, textGraph);
net.setPreferableBackend(cv.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv.dnn.DNN_TARGET_CPU)

# Load the classes
colorsFile = &quot;./model/colors.txt&quot;;
with open(colorsFile, &#39;rt&#39;) as f:
    colorsStr = f.read().rstrip(&#39;\\n&#39;).split(&#39;\\n&#39;)
colors = [] #[0,0,0]
for i in range(len(colorsStr)):
    rgb = colorsStr[i].split(&#39; &#39;)
    color = np.array([float(rgb[0]), float(rgb[1]), float(rgb[2])])
    colors.append(color)

winName = &#39;Mask-RCNN Object detection and Segmentation in OpenCV&#39;
cv.namedWindow(winName, cv.WINDOW_NORMAL)

#image,video,none
input_file=&quot;image&quot;
input_file_name=&quot;./image/cars.jpg&quot;
outputFile = &quot;mask_rcnn_out_py.avi&quot;
if (input_file is &quot;image&quot;):
    # Open the image file
    if not os.path.isfile(input_file_name):
        print(&quot;Input image file &quot;, input_file_name, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(input_file_name)
    outputFile = input_file_name[:-4]+&#39;_mask_rcnn_out_py.jpg&#39;
elif (input_file is &quot;video&quot;):
    # Open the video file
    if not os.path.isfile(input_file_name):
        print(&quot;Input video file &quot;, input_file_name, &quot; doesn&#39;t exist&quot;)
        sys.exit(1)
    cap = cv.VideoCapture(input_file_name)
    outputFile = input_file_name[:-4]+&#39;_mask_rcnn_out_py.avi&#39;
else:
    # Webcam input
    cap = cv.VideoCapture(0)

# Get the video writer initialized to save the output video
if (input_file is not &quot;image&quot;):
    vid_writer = cv.VideoWriter(outputFile, cv.VideoWriter_fourcc(&#39;M&#39;,&#39;J&#39;,&#39;P&#39;,&#39;G&#39;), 28, (round(cap.get(cv.CAP_PROP_FRAME_WIDTH)),round(cap.get(cv.CAP_PROP_FRAME_HEIGHT))))

while cv.waitKey(1) &lt; 0:
    
    # Get frame from the video
    hasFrame, frame = cap.read()
    
    # Stop the program if reached end of video
    if not hasFrame:
        print(&quot;Done processing !!!&quot;)
        print(&quot;Output file is stored as &quot;, outputFile)
        cv.waitKey(3000)
        break

    # Create a 4D blob from a frame.
    blob = cv.dnn.blobFromImage(frame, swapRB=True, crop=False)

    # Set the input to the network
    net.setInput(blob)

    # Run the forward pass to get output from the output layers
    boxes, masks = net.forward([&#39;detection_out_final&#39;, &#39;detection_masks&#39;])

    # Extract the bounding box and mask for each of the detected objects
    postprocess(boxes, masks)

    # Put efficiency information.
    t, _ = net.getPerfProfile()
    label = &#39;Inference time for a frame : %0.0f ms&#39; % abs(t * 1000.0 / cv.getTickFrequency())
    cv.putText(frame, label, (0, 15), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0))

    # Write the frame with the detection boxes
    if (input_file is &quot;image&quot;):
        cv.imwrite(outputFile, frame.astype(np.uint8));
    else:
        vid_writer.write(frame.astype(np.uint8))

    cv.imshow(winName, frame)
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/deep-learning-based-object-detection-and-instance-segmentation-using-mask-r-cnn-in-opencv-python-c/" target="_blank" rel="noopener noreferrer">https://www.learnopencv.com/deep-learning-based-object-detection-and-instance-segmentation-using-mask-r-cnn-in-opencv-python-c/</a></li></ul>`,80)]))}const c=e(r,[["render",s],["__file","2019-04-02-_OpenCV实战_13 OpenCV中使用Mask R-CNN进行对象检测和实例分割.html.vue"]]),p=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-02-_OpenCV%E5%AE%9E%E6%88%98_13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2.html","title":"[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-02T19:38:15.000Z","tag":["OpenCV实战","OpenCV","深度学习"],"description":"[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割 Mask R-CNN具体内容见： https://arxiv.org/pdf/1703.06870.pdf Mask R-CNN最初于2017年11月由Facebook的AI研究团队使用Python和Caffe2推出。工程代码见： https://github.co...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-02-_OpenCV%E5%AE%9E%E6%88%98_13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割"}],["meta",{"property":"og:description","content":"[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割 Mask R-CNN具体内容见： https://arxiv.org/pdf/1703.06870.pdf Mask R-CNN最初于2017年11月由Facebook的AI研究团队使用Python和Caffe2推出。工程代码见： https://github.co..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.learnopencv.com/wp-content/uploads/2018/10/Mask-RCNN-results-1024x290.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2019-04-02T19:38:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割\\",\\"image\\":[\\"https://www.learnopencv.com/wp-content/uploads/2018/10/Mask-RCNN-results-1024x290.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2/20190402185014806.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2/20190402185013714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2/20190402185016632.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D13%20OpenCV%E4%B8%AD%E4%BD%BF%E7%94%A8Mask%20R-CNN%E8%BF%9B%E8%A1%8C%E5%AF%B9%E8%B1%A1%E6%A3%80%E6%B5%8B%E5%92%8C%E5%AE%9E%E4%BE%8B%E5%88%86%E5%89%B2/20190402185017255.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-04-02T19:38:15.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景介绍","slug":"_1-背景介绍","link":"#_1-背景介绍","children":[{"level":3,"title":"1.1 什么是图像分割和实例分割","slug":"_1-1-什么是图像分割和实例分割","link":"#_1-1-什么是图像分割和实例分割","children":[]},{"level":3,"title":"1.2 Mask-RCNN 原理","slug":"_1-2-mask-rcnn-原理","link":"#_1-2-mask-rcnn-原理","children":[]}]},{"level":2,"title":"2 Mask-RCNN 在OpenCV 中的使用","slug":"_2-mask-rcnn-在opencv-中的使用","link":"#_2-mask-rcnn-在opencv-中的使用","children":[{"level":3,"title":"2.1 模型下载","slug":"_2-1-模型下载","link":"#_2-1-模型下载","children":[]},{"level":3,"title":"2.2 模型初始化","slug":"_2-2-模型初始化","link":"#_2-2-模型初始化","children":[]},{"level":3,"title":"2.3 模型加载","slug":"_2-3-模型加载","link":"#_2-3-模型加载","children":[]},{"level":3,"title":"2.4 输出结果处理","slug":"_2-4-输出结果处理","link":"#_2-4-输出结果处理","children":[]},{"level":3,"title":"2.5 画图","slug":"_2-5-画图","link":"#_2-5-画图","children":[]}]},{"level":2,"title":"3 结果和代码","slug":"_3-结果和代码","link":"#_3-结果和代码","children":[{"level":3,"title":"3.1 结果","slug":"_3-1-结果","link":"#_3-1-结果","children":[]},{"level":3,"title":"3.2 代码","slug":"_3-2-代码","link":"#_3-2-代码","children":[]}]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":18.78,"words":5635},"filePathRelative":"blog/opencv/opencv实战/2019-04-02-[OpenCV实战]13 OpenCV中使用Mask R-CNN进行对象检测和实例分割.md","localizedDate":"2019年4月3日","excerpt":"\\n<p>Mask R-CNN具体内容见：</p>\\n<p><a href=\\"https://arxiv.org/pdf/1703.06870.pdf\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://arxiv.org/pdf/1703.06870.pdf</a></p>\\n<p>Mask R-CNN最初于2017年11月由Facebook的AI研究团队使用Python和Caffe2推出。工程代码见：</p>\\n<p><a href=\\"https://github.com/facebookresearch/Detectron\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://github.com/facebookresearch/Detectron</a></p>","autoDesc":true}');export{c as comp,p as data};
