import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as s,c as r,a as e,b as n,d as t,e as d}from"./app-MsA2k2kn.js";const v={},c=e("h1",{id:"opencv实战-1-基于深度学习识别人脸性别和年龄",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#opencv实战-1-基于深度学习识别人脸性别和年龄","aria-hidden":"true"},"#"),n(" [OpenCV实战]1 基于深度学习识别人脸性别和年龄")],-1),o={href:"https://talhassner.github.io/home/publication/2015_CVPR",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"[toc]",-1),m=e("h2",{id:"_1-基于cnn的性别分类建模原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-基于cnn的性别分类建模原理","aria-hidden":"true"},"#"),n(" 1 基于CNN的性别分类建模原理")],-1),b=e("p",null,"作者使用非常简单的卷积神经网络结构，类似于Caffenet和Alexnet。网络使用3个卷积层、2个全连接层和一个最终的输出层。下面给出了这些层的细节。COV1：第一卷积层具有96个内核大小7的节点。COV2：第二个卷积层Conv层具有256个具有内核大小5的节点。CONV3：第三个CONV层具有384个内核大小为3的节点。两个完全连接的层各自具有512个节点。",-1),g={href:"https://talhassner.github.io/home/projects/Adience/Adience-data.html",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"检测程序主要有四块：检测人脸检测、性别检测、年龄显示和输出。",-1),f=e("h3",{id:"_1-1-人脸识别",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1-人脸识别","aria-hidden":"true"},"#"),n(" 1.1 人脸识别")],-1),h=e("p",null,"我们将使用人脸检测器（tensorflow模型）进行人脸检测。该模型很简单，即使在CPU上也是相当快的。详细见论文：",-1),_={href:"https://arxiv.org/pdf/1502.00046.pdf",target:"_blank",rel:"noopener noreferrer"},x=d('<h3 id="_1-2-性别预测" tabindex="-1"><a class="header-anchor" href="#_1-2-性别预测" aria-hidden="true">#</a> 1.2 性别预测</h3><p>将性别预测设定为一个分类问题。性别预测网络（caffe模型）中的输出层类型为两类，2个节点表示“男性”和“女性”两类。以这两个输出的最大值作为最终的性别。</p><h3 id="_1-3-年龄预测" tabindex="-1"><a class="header-anchor" href="#_1-3-年龄预测" aria-hidden="true">#</a> 1.3 年龄预测</h3><p>理想情况下，年龄预测应该作为一个回归问题来处理。然而通过回归准确估计年龄是很有挑战性的。即使是人类也无法通过观察一个人来准确预测年龄。但是我们能够知道他们是20多岁还是30多岁。由于这个原因，把这个问题描述为一个分类问题是明智的，因为我们试图估计这个人所处的年龄组。例如，0-2范围内的年龄是一个类，4-6是另一个类，依此类推。因此数据集分为以下8个年龄组[(0-2)、(4-6)、(8-12)、(15-20)、(25-32)、(38-43)、(48-53)、(60-100)]。因此，年龄预测网络在最后一层有8个节点，表示所述年龄范围。</p><p>应该记住，从一幅图像中预测年龄并不是一个很容易解决的问题，因为感知到的年龄取决于许多因素，而同龄的人在世界各地可能看起来很不一样。而且，人们非常努力地隐藏他们的真实年龄！</p><p>我们加载年龄网络（caffe模型）并使用前向通道获得输出。由于网络结构类似于性别网络，所以我们可以从所有输出中提取出最大值来得到预测的年龄组</p><h3 id="_1-4-结果" tabindex="-1"><a class="header-anchor" href="#_1-4-结果" aria-hidden="true">#</a> 1.4 结果</h3><p>尽管性别预测网络表现良好，但年龄预测网络仍未达到我们的预期。所以添加人脸对齐算法或者数据样本很多时候，可以通过回归的模型来检测。但是性别人脸检测还是很准确的。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]1 基于深度学习识别人脸性别和年龄/1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]1 基于深度学习识别人脸性别和年龄/2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[OpenCV实战]1 基于深度学习识别人脸性别和年龄/3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-代码" tabindex="-1"><a class="header-anchor" href="#_2-代码" aria-hidden="true">#</a> 2 代码</h2><p>在VS2017下运行了C++代码，其中OpenCV版本至少要3.4.5以上。不然模型读取会有问题。三个模型文件太大，见下载链接：</p>',13),q={href:"https://download.csdn.net/download/luohenyj/10993309",target:"_blank",rel:"noopener noreferrer"},N={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},w=d(`<p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><p>其中tensorflow和caffe模型都可以用opencv中的readnet函数读取，流程很简单。看看代码就会。</p><p>代码提供了C++和Python版本，但是python版本没有运行，原因opencv版本太低，不想升级。代码都有详细的注释。</p><p>C++版本：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    
    #include &lt;tuple&gt;
    #include &lt;iostream&gt;
    #include &lt;opencv2/opencv.hpp&gt;
    #include &lt;opencv2/dnn.hpp&gt;
    #include &lt;iterator&gt;
    using namespace cv;
    using namespace cv::dnn;
    using namespace std;
    
    /**
     * @brief Get the Face Box object 人脸定位
     *
     * @param net 人脸检测网络
     * @param frame 检测图像
     * @param conf_threshold 阈值
     * @return tuple&lt;Mat, vector&lt;vector&lt;int&gt;&gt;&gt; 元组容器，可返回多个值
     */
    tuple&lt;Mat, vector&lt;vector&lt;int&gt;&gt;&gt; getFaceBox(Net net, Mat &amp;frame, double conf_threshold)
    {
    	//图像复制
    	Mat frameOpenCVDNN = frame.clone();
    	int frameHeight = frameOpenCVDNN.rows;
    	int frameWidth = frameOpenCVDNN.cols;
    	//缩放尺寸
    	double inScaleFactor = 1.0;
    	//检测图大小
    	Size size = Size(300, 300);
    	// std::vector&lt;int&gt; meanVal = {104, 117, 123};
    	Scalar meanVal = Scalar(104, 117, 123);
    
    	cv::Mat inputBlob;
    	inputBlob = cv::dnn::blobFromImage(frameOpenCVDNN, inScaleFactor, size, meanVal, true, false);
    	net.setInput(inputBlob, &quot;data&quot;);
    	//四维矩阵输出
    	cv::Mat detection = net.forward(&quot;detection_out&quot;);
    	//提取结果信息
    	cv::Mat detectionMat(detection.size[2], detection.size[3], CV_32F, detection.ptr&lt;float&gt;());
    
    	vector&lt;vector&lt;int&gt;&gt; bboxes;
    
    	for (int i = 0; i &lt; detectionMat.rows; i++)
    	{
    		//预测概率
    		float confidence = detectionMat.at&lt;float&gt;(i, 2);
    
    		if (confidence &gt; conf_threshold)
    		{
    			//左上角点，坐标被归一化
    			int x1 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 3) * frameWidth);
    			int y1 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 4) * frameHeight);
    			//右下角角点，坐标被归一化
    			int x2 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 5) * frameWidth);
    			int y2 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 6) * frameHeight);
    			vector&lt;int&gt; box = { x1, y1, x2, y2 };
    			//人脸坐标
    			bboxes.push_back(box);
    			//图像框选
    			cv::rectangle(frameOpenCVDNN, cv::Point(x1, y1), cv::Point(x2, y2), cv::Scalar(0, 255, 0), 2, 4);
    		}
    	}
    
    	return make_tuple(frameOpenCVDNN, bboxes);
    }
    
    int main(void)
    {
    	//人脸模型
    	string faceProto = &quot;model/opencv_face_detector.pbtxt&quot;;
    	string faceModel = &quot;model/opencv_face_detector_uint8.pb&quot;;
    
    	//年龄模型
    	string ageProto = &quot;model/age_deploy.prototxt&quot;;
    	string ageModel = &quot;model/age_net.caffemodel&quot;;
    
    	//性别模型
    	string genderProto = &quot;model/gender_deploy.prototxt&quot;;
    	string genderModel = &quot;model/gender_net.caffemodel&quot;;
    
    	//均值
    	Scalar MODEL_MEAN_VALUES = Scalar(78.4263377603, 87.7689143744, 114.895847746);
    
    	//年龄段标签
    	vector&lt;string&gt; ageList = { &quot;(0-2)&quot;, &quot;(4-6)&quot;, &quot;(8-12)&quot;, &quot;(15-20)&quot;, &quot;(25-32)&quot;,
    		&quot;(38-43)&quot;, &quot;(48-53)&quot;, &quot;(60-100)&quot; };
    
    	//性别标签
    	vector&lt;string&gt; genderList = { &quot;Male&quot;, &quot;Female&quot; };
    
    	//导入网络
    	Net ageNet = cv::dnn::readNet(ageProto, ageModel);
    	Net genderNet = cv::dnn::readNet(genderProto, genderModel);
    	Net faceNet = cv::dnn::readNetFromTensorflow(faceModel, faceProto);
    
    	//打开摄像头
    	VideoCapture cap;
    	cap.open(0);
    	if (cap.isOpened())
    	{
    		cout &lt;&lt; &quot;camera is opened!&quot; &lt;&lt; endl;
    	}
    	else
    	{
    		return 0;
    	}
    
    	int padding = 20;
    	while (waitKey(1) &lt; 0)
    	{
    		// read frame 读图
    		Mat frame;
    		cap.read(frame);
    		if (frame.empty())
    		{
    			waitKey();
    			break;
    		}
    		frame = imread(&quot;./images/couple1.jpg&quot;);
    		//人脸坐标
    		vector&lt;vector&lt;int&gt;&gt; bboxes;
    		//人脸检测结果图
    		Mat frameFace;
    		//人脸定位
    		//tie()函数解包frameFace和bboxes
    		tie(frameFace, bboxes) = getFaceBox(faceNet, frame, 0.7);
    		//人脸判断
    		if (bboxes.size() == 0)
    		{
    			cout &lt;&lt; &quot;No face detected, checking next frame.&quot; &lt;&lt; endl;
    			continue;
    		}
    		//逐个提取人脸检测
    		for (auto it = begin(bboxes); it != end(bboxes); ++it)
    		{
    			//框选人脸
    			Rect rec(it-&gt;at(0) - padding, it-&gt;at(1) - padding, it-&gt;at(2) - it-&gt;at(0) + 2 * padding, it-&gt;at(3) - it-&gt;at(1) + 2 * padding);
    			//避免人脸框选超过图像边缘
    			rec.width = ((rec.x + rec.width) &gt; frame.cols) ? (frame.cols - rec.x - 1) : rec.width;
    			rec.height = ((rec.y + rec.height) &gt; frame.rows) ? (frame.rows - rec.y - 1) : rec.height;
    
    			// take the ROI of box on the frame,原图中提取人脸
    			Mat face = frame(rec);
    
    			//性别检测
    			Mat blob;
    			blob = blobFromImage(face, 1, Size(227, 227), MODEL_MEAN_VALUES, false);
    			genderNet.setInput(blob);
    			// string gender_preds; 获取前向传播softmax结果
    			vector&lt;float&gt; genderPreds = genderNet.forward();
    			// find max element index max_element用于找寻最大值
    			// distance function does the argmax() work in C++ distance返回最大值和第一个值下标的距离
    			int max_index_gender = std::distance(genderPreds.begin(), max_element(genderPreds.begin(), genderPreds.end()));
    			//获得检测结果
    			string gender = genderList[max_index_gender];
    			cout &lt;&lt; &quot;Gender: &quot; &lt;&lt; gender &lt;&lt; endl;
    
    			//年龄识别
    			ageNet.setInput(blob);
    			vector&lt;float&gt; agePreds = ageNet.forward();
    			// finding maximum indicd in the age_preds vector 找到年龄预测最大下表
    			int max_indice_age = std::distance(agePreds.begin(), max_element(agePreds.begin(), agePreds.end()));
    			string age = ageList[max_indice_age];
    			cout &lt;&lt; &quot;Age: &quot; &lt;&lt; age &lt;&lt; endl;
    
    			// label 输出标签
    			string label = gender + &quot;, &quot; + age;
    			//在人脸定位图上显示结果
    			cv::putText(frameFace, label, Point(it-&gt;at(0), it-&gt;at(1) - 15), cv::FONT_HERSHEY_SIMPLEX, 0.9, Scalar(0, 255, 255), 2, cv::LINE_AA);
    		}
    		//保存结果
    		imshow(&quot;Frame&quot;, frameFace);
    		imwrite(&quot;out.jpg&quot;, frameFace);
    	}
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python版本：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    
    # Import required modules
    import cv2 as cv
    import time
    import argparse
    
    def getFaceBox(net, frame, conf_threshold=0.7):
        frameOpencvDnn = frame.copy()
        frameHeight = frameOpencvDnn.shape[0]
        frameWidth = frameOpencvDnn.shape[1]
        blob = cv.dnn.blobFromImage(frameOpencvDnn, 1.0, (300, 300), [104, 117, 123], True, False)
    
        net.setInput(blob)
        detections = net.forward()
        bboxes = []
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence &gt; conf_threshold:
                x1 = int(detections[0, 0, i, 3] * frameWidth)
                y1 = int(detections[0, 0, i, 4] * frameHeight)
                x2 = int(detections[0, 0, i, 5] * frameWidth)
                y2 = int(detections[0, 0, i, 6] * frameHeight)
                bboxes.append([x1, y1, x2, y2])
                cv.rectangle(frameOpencvDnn, (x1, y1), (x2, y2), (0, 255, 0), int(round(frameHeight/150)), 8)
        return frameOpencvDnn, bboxes
    
    
    parser = argparse.ArgumentParser(description=&#39;Use this script to run age and gender recognition using OpenCV.&#39;)
    parser.add_argument(&#39;--input&#39;, help=&#39;Path to input image or video file. Skip this argument to capture frames from a camera.&#39;)
    
    args = parser.parse_args()
    
    faceProto = &quot;age_gender/model/opencv_face_detector.pbtxt&quot;
    faceModel = &quot;age_gender/model/opencv_face_detector_uint8.pb&quot;
    
    ageProto = &quot;age_gender/model/age_deploy.prototxt&quot;
    ageModel = &quot;age_gender/model/age_net.caffemodel&quot;
    
    genderProto = &quot;age_gender/model/gender_deploy.prototxt&quot;
    genderModel = &quot;age_gender/model/gender_net.caffemodel&quot;
    
    MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
    ageList = [&#39;(0-2)&#39;, &#39;(4-6)&#39;, &#39;(8-12)&#39;, &#39;(15-20)&#39;, &#39;(25-32)&#39;, &#39;(38-43)&#39;, &#39;(48-53)&#39;, &#39;(60-100)&#39;]
    genderList = [&#39;Male&#39;, &#39;Female&#39;]
    
    # Load network
    ageNet = cv.dnn.readNet(ageModel, ageProto)
    genderNet = cv.dnn.readNet(genderModel, genderProto)
    faceNet = cv.dnn.readNet(faceModel, faceProto)
    
    # Open a video file or an image file or a camera stream
    cap = cv.VideoCapture(args.input if args.input else 0)
    padding = 20
    while cv.waitKey(1) &lt; 0:
        # Read frame
        t = time.time()
        hasFrame, frame = cap.read()
        if not hasFrame:
            cv.waitKey()
            break
    
        frameFace, bboxes = getFaceBox(faceNet, frame)
        if not bboxes:
            print(&quot;No face Detected, Checking next frame&quot;)
            continue
    
        for bbox in bboxes:
            # print(bbox)
            face = frame[max(0,bbox[1]-padding):min(bbox[3]+padding,frame.shape[0]-1),max(0,bbox[0]-padding):min(bbox[2]+padding, frame.shape[1]-1)]
    
            blob = cv.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
            genderNet.setInput(blob)
            genderPreds = genderNet.forward()
            gender = genderList[genderPreds[0].argmax()]
            # print(&quot;Gender Output : {}&quot;.format(genderPreds))
            print(&quot;Gender : {}, conf = {:.3f}&quot;.format(gender, genderPreds[0].max()))
    
            ageNet.setInput(blob)
            agePreds = ageNet.forward()
            age = ageList[agePreds[0].argmax()]
            print(&quot;Age Output : {}&quot;.format(agePreds))
            print(&quot;Age : {}, conf = {:.3f}&quot;.format(age, agePreds[0].max()))
    
            label = &quot;{},{}&quot;.format(gender, age)
            cv.putText(frameFace, label, (bbox[0], bbox[1]-10), cv.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2, cv.LINE_AA)
            cv.imshow(&quot;Age Gender Demo&quot;, frameFace)
            # cv.imwrite(&quot;age-gender-out-{}&quot;.format(args.input),frameFace)
        print(&quot;time : {:.3f}&quot;.format(time.time() - t))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,8),M={href:"https://www.learnopencv.com/age-gender-classification-using-opencv-deep-learning-c-python/",target:"_blank",rel:"noopener noreferrer"};function P(y,C){const i=l("ExternalLinkIcon");return s(),r("div",null,[c,e("p",null,[n("本教程中，我们将讨论应用于面部的深层学习的有趣应用。我们将估计年龄，并从单个图像中找出该人的性别。模型由GilLevi和TalHassner训练（"),e("a",o,[n("2015_CVPR"),t(i)]),n(")。本文介绍了如何在OpenCV中使用该模型的步骤说明。Opencv版本3.4.3以上。代码教程代码可以分为四个部分：")]),u,m,b,e("p",null,[n("训练数据来源："),e("a",g,[n(" https://talhassner.github.io/home/projects/Adience/Adience-data.html "),t(i)])]),p,f,h,e("p",null,[e("a",_,[n(" https://arxiv.org/pdf/1502.00046.pdf "),t(i)])]),x,e("ul",null,[e("li",null,[e("a",q,[n("https://download.csdn.net/download/luohenyj/10993309"),t(i)])]),e("li",null,[n("​​​​​"),e("a",N,[n("https://github.com/luohenyueji/OpenCV-Practical-Exercise"),t(i)])])]),w,e("ul",null,[e("li",null,[e("a",M,[n("https://www.learnopencv.com/age-gender-classification-using-opencv-deep-learning-c-python/ "),t(i)])])])])}const F=a(v,[["render",P],["__file","2019-03-04-_OpenCV实战_1 基于深度学习识别人脸性别和年龄.html.vue"]]);export{F as default};
