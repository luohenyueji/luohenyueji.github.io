import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"opencv实战-2-人脸识别算法对比",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#opencv实战-2-人脸识别算法对比","aria-hidden":"true"},"#"),s(" [OpenCV实战]2 人脸识别算法对比")],-1),r=n("p",null,"在本教程中，我们将讨论各种人脸检测方法，并对各种方法进行比较。下面是主要的人脸检测方法：",-1),d=n("p",null,"1 OpenCV中的Haar Cascade人脸分类器；",-1),k=n("p",null,"2 OpenCV中的深度学习人脸分类器；",-1),v=n("p",null,"3 Dlib中的hog人脸分类器；",-1),m=n("p",null,"4 Dlib中的深度学习人脸分类器。",-1),b={href:"http://dlib.net/",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"本文不涉及任何原理，只讲具体的应用。所有代码模型见：",-1),h={href:"https://download.csdn.net/download/luohenyj/10997489",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},g=n("br",null,null,-1),w=n("h2",{id:"_1-opencv中的haar-cascade人脸分类器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-opencv中的haar-cascade人脸分类器","aria-hidden":"true"},"#"),s(" 1 OpenCV中的Haar Cascade人脸分类器")],-1),y=n("p",null,"基于Haar Cascade的人脸检测器自2001年提出以来，一直是人脸检测领域的研究热点。这种模型和其变种在这里找到：",-1),C={href:"https://github.com/opencv/opencv/tree/master/data/haarcascades",target:"_blank",rel:"noopener noreferrer"},x=e(`<p>这种方法优点在CPU上几乎是实时工作的，方法简单可以在不同的尺度上检测人脸。实际就是一个级联分类器，参数可以调整，网上有相关资料。但是不管怎么调整误报率很高，而且人脸框选结果不是那么准确。</p><p>代码</p><p>C++:</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    #include &quot;pch.h&quot;
    #include &quot;face_detection.h&quot;
    
    /**
     * @brief 人脸检测haar级联
     * 
     * @param frame 原图
     * @param faceCascadePath 模型文件 
     * @return Mat 
     */
    Mat detectFaceHaar(Mat frame, string faceCascadePath)
    {
    	//图像缩放
    	auto inHeight = 300;
    	auto inWidth = 0;
    	if (!inWidth)
    	{
    		inWidth = (int)(((float)frame.cols / (float)frame.rows) * inHeight);
    	}
    	resize(frame, frame, Size(inWidth, inHeight));
    
    	//转换为灰度图
    	Mat frameGray = frame.clone();
    	//cvtColor(frame, frameGray, CV_BGR2GRAY);
    
    	//级联分类器
    	CascadeClassifier faceCascade;
    	faceCascade.load(faceCascadePath);
    	std::vector&lt;Rect&gt; faces;
    	faceCascade.detectMultiScale(frameGray, faces);
    
    	for (size_t i = 0; i &lt; faces.size(); i++)
    	{
    		int x1 = faces[i].x;
    		int y1 = faces[i].y;
    		int x2 = faces[i].x + faces[i].width;
    		int y2 = faces[i].y + faces[i].height;
    		Rect face_rect(Point2i(x1, y1), Point2i(x2, y2));
    		rectangle(frameGray, face_rect, cv::Scalar(0, 255, 0), 2, 4);
    	}
    	return frameGray;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>    
    <span class="token keyword">from</span> __future__ <span class="token keyword">import</span> division
    <span class="token keyword">import</span> cv2
    <span class="token keyword">import</span> time
    <span class="token keyword">import</span> sys
    
    <span class="token keyword">def</span> <span class="token function">detectFaceOpenCVHaar</span><span class="token punctuation">(</span>faceCascade<span class="token punctuation">,</span> frame<span class="token punctuation">,</span> inHeight<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">,</span> inWidth<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        frameOpenCVHaar <span class="token operator">=</span> frame<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
        frameHeight <span class="token operator">=</span> frameOpenCVHaar<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        frameWidth <span class="token operator">=</span> frameOpenCVHaar<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> inWidth<span class="token punctuation">:</span>
            inWidth <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token punctuation">(</span>frameWidth <span class="token operator">/</span> frameHeight<span class="token punctuation">)</span> <span class="token operator">*</span> inHeight<span class="token punctuation">)</span>
    
        scaleHeight <span class="token operator">=</span> frameHeight <span class="token operator">/</span> inHeight
        scaleWidth <span class="token operator">=</span> frameWidth <span class="token operator">/</span> inWidth
    
        frameOpenCVHaarSmall <span class="token operator">=</span> cv2<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>frameOpenCVHaar<span class="token punctuation">,</span> <span class="token punctuation">(</span>inWidth<span class="token punctuation">,</span> inHeight<span class="token punctuation">)</span><span class="token punctuation">)</span>
        frameGray <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>frameOpenCVHaarSmall<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2GRAY<span class="token punctuation">)</span>
    
        faces <span class="token operator">=</span> faceCascade<span class="token punctuation">.</span>detectMultiScale<span class="token punctuation">(</span>frameGray<span class="token punctuation">)</span>
        bboxes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> w<span class="token punctuation">,</span> h<span class="token punctuation">)</span> <span class="token keyword">in</span> faces<span class="token punctuation">:</span>
            x1 <span class="token operator">=</span> x
            y1 <span class="token operator">=</span> y
            x2 <span class="token operator">=</span> x <span class="token operator">+</span> w
            y2 <span class="token operator">=</span> y <span class="token operator">+</span> h
            cvRect <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">(</span>x1 <span class="token operator">*</span> scaleWidth<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span>y1 <span class="token operator">*</span> scaleHeight<span class="token punctuation">)</span><span class="token punctuation">,</span>
                      <span class="token builtin">int</span><span class="token punctuation">(</span>x2 <span class="token operator">*</span> scaleWidth<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span>y2 <span class="token operator">*</span> scaleHeight<span class="token punctuation">)</span><span class="token punctuation">]</span>
            bboxes<span class="token punctuation">.</span>append<span class="token punctuation">(</span>cvRect<span class="token punctuation">)</span>
            cv2<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span>frameOpenCVHaar<span class="token punctuation">,</span> <span class="token punctuation">(</span>cvRect<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> cvRect<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>cvRect<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> cvRect<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                          <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">round</span><span class="token punctuation">(</span>frameHeight <span class="token operator">/</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> frameOpenCVHaar<span class="token punctuation">,</span> bboxes
    
    <span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span> <span class="token punctuation">:</span>
        source <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
            source <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    
        faceCascade <span class="token operator">=</span> cv2<span class="token punctuation">.</span>CascadeClassifier<span class="token punctuation">(</span><span class="token string">&#39;./haarcascade_frontalface_default.xml&#39;</span><span class="token punctuation">)</span>
    
        cap <span class="token operator">=</span> cv2<span class="token punctuation">.</span>VideoCapture<span class="token punctuation">(</span>source<span class="token punctuation">)</span>
        hasFrame<span class="token punctuation">,</span> frame <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
        vid_writer <span class="token operator">=</span> cv2<span class="token punctuation">.</span>VideoWriter<span class="token punctuation">(</span><span class="token string">&#39;output-haar-{}.avi&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>cv2<span class="token punctuation">.</span>VideoWriter_fourcc<span class="token punctuation">(</span><span class="token string">&#39;M&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;J&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;P&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;G&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>frame<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>frame<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
        frame_count <span class="token operator">=</span> <span class="token number">0</span>
        tt_opencvHaar <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            hasFrame<span class="token punctuation">,</span> frame <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> hasFrame<span class="token punctuation">:</span>
                <span class="token keyword">break</span>
            frame_count <span class="token operator">+=</span> <span class="token number">1</span>
    
            t <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            outOpencvHaar<span class="token punctuation">,</span> bboxes <span class="token operator">=</span> detectFaceOpenCVHaar<span class="token punctuation">(</span>faceCascade<span class="token punctuation">,</span> frame<span class="token punctuation">)</span>
            tt_opencvHaar <span class="token operator">+=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> t
            fpsOpencvHaar <span class="token operator">=</span> frame_count <span class="token operator">/</span> tt_opencvHaar
    
            label <span class="token operator">=</span> <span class="token string">&quot;OpenCV Haar ; FPS : {:.2f}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>fpsOpencvHaar<span class="token punctuation">)</span>
            cv2<span class="token punctuation">.</span>putText<span class="token punctuation">(</span>outOpencvHaar<span class="token punctuation">,</span> label<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>FONT_HERSHEY_SIMPLEX<span class="token punctuation">,</span> <span class="token number">1.4</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>LINE_AA<span class="token punctuation">)</span>
    
            cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;Face Detection Comparison&quot;</span><span class="token punctuation">,</span> outOpencvHaar<span class="token punctuation">)</span>
    
            vid_writer<span class="token punctuation">.</span>write<span class="token punctuation">(</span>outOpencvHaar<span class="token punctuation">)</span>
            <span class="token keyword">if</span> frame_count <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                tt_opencvHaar <span class="token operator">=</span> <span class="token number">0</span>
            
            k <span class="token operator">=</span> cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> k <span class="token operator">==</span> <span class="token number">27</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span>
        cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
        vid_writer<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-opencv中的深度学习人脸分类器" tabindex="-1"><a class="header-anchor" href="#_2-opencv中的深度学习人脸分类器" aria-hidden="true">#</a> 2 OpenCV中的深度学习人脸分类器</h2>`,7),O={href:"https://arxiv.org/abs/1512.02325",target:"_blank",rel:"noopener noreferrer"},H=e(`<p>但是提供了两种不同的模型。一种是16位浮点数的caffe人脸模型(5.4MB)，另外一种是8bit量化后的tensorflow人脸模型(2.7MB)。量化是指比如可以用0~255表示原来32个bit所表示的精度，通过牺牲精度来降低每一个权值所需要占用的空间。通常情况深度学习模型会有冗余计算量，冗余性决定了参数个数。因此合理的量化网络也可保证精度的情况下减小模型的存储体积，不会对网络的精度造成影响。具体可以看看深度学习fine- tuning的论文。通常这种操作可以稍微降低精度，提高速度，大大减少模型体积。</p><p>这种方法速度慢了点，但是精度不错。对于调用模型代码写的很清楚。但是tensorflow模型有点小问题，可能只能在opencv3.4.3以上版本通过readNet函数调用。</p><p>代码</p><p>C++:</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>    #include &quot;pch.h&quot;
    #include &quot;face_detection.h&quot;
    
    //检测图像宽高
    const size_t inWidth = 300;
    const size_t inHeight = 300;
    //缩放比例
    const double inScaleFactor = 1.0;
    //阈值
    const double confidenceThreshold = 0.7;
    //均值
    const cv::Scalar meanVal(104.0, 177.0, 123.0);
    
    /**
     * @brief 人脸检测Opencv ssd
     * 
     * @param frame 原图
     * @param configFile 模型结构定义文件
     * @param weightFile 模型文件
     * @return Mat 
     */
    Mat detectFaceOpenCVDNN(Mat frame, string configFile, string weightFile)
    {
    	Mat frameOpenCVDNN = frame.clone();
    	Net net;
    	Mat inputBlob;
    	int frameHeight = frameOpenCVDNN.rows;
    	int frameWidth = frameOpenCVDNN.cols;
    	//获取文件后缀
    	string suffixStr = configFile.substr(configFile.find_last_of(&#39;.&#39;) + 1);
    	//判断是caffe模型还是tensorflow模型
    	if (suffixStr == &quot;prototxt&quot;)
    	{
    		net = dnn::readNetFromCaffe(configFile, weightFile);
    		inputBlob = cv::dnn::blobFromImage(frameOpenCVDNN, inScaleFactor, cv::Size(inWidth, inHeight), meanVal, false, false);
    	}
    	else
    	{
    		//bug
    		//net = dnn::readNetFromTensorflow(configFile, weightFile);
    		net = dnn::readNet(configFile, weightFile);
    		inputBlob = cv::dnn::blobFromImage(frameOpenCVDNN, inScaleFactor, cv::Size(inWidth, inHeight), meanVal, true, false);
    	}
    
    	//读图检测
    	net.setInput(inputBlob, &quot;data&quot;);
    	cv::Mat detection = net.forward(&quot;detection_out&quot;);
    	cv::Mat detectionMat(detection.size[2], detection.size[3], CV_32F, detection.ptr&lt;float&gt;());
    
    	for (int i = 0; i &lt; detectionMat.rows; i++)
    	{
    		//分类精度
    		float confidence = detectionMat.at&lt;float&gt;(i, 2);
    		if (confidence &gt; confidenceThreshold)
    		{
    			//左上角坐标
    			int x1 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 3) * frameWidth);
    			int y1 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 4) * frameHeight);
    			//右下角坐标
    			int x2 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 5) * frameWidth);
    			int y2 = static_cast&lt;int&gt;(detectionMat.at&lt;float&gt;(i, 6) * frameHeight);
    			//画框
    			cv::rectangle(frameOpenCVDNN, cv::Point(x1, y1), cv::Point(x2, y2), cv::Scalar(0, 255, 0), 2, 4);
    		}
    	}
    	return frameOpenCVDNN;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>    
    <span class="token keyword">from</span> __future__ <span class="token keyword">import</span> division
    <span class="token keyword">import</span> cv2
    <span class="token keyword">import</span> time
    <span class="token keyword">import</span> sys
    
    <span class="token keyword">def</span> <span class="token function">detectFaceOpenCVDnn</span><span class="token punctuation">(</span>net<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>
        frameOpencvDnn <span class="token operator">=</span> frame<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
        frameHeight <span class="token operator">=</span> frameOpencvDnn<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        frameWidth <span class="token operator">=</span> frameOpencvDnn<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
        blob <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>blobFromImage<span class="token punctuation">(</span>frameOpencvDnn<span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">104</span><span class="token punctuation">,</span> <span class="token number">117</span><span class="token punctuation">,</span> <span class="token number">123</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
    
        net<span class="token punctuation">.</span>setInput<span class="token punctuation">(</span>blob<span class="token punctuation">)</span>
        detections <span class="token operator">=</span> net<span class="token punctuation">.</span>forward<span class="token punctuation">(</span><span class="token punctuation">)</span>
        bboxes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>detections<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            confidence <span class="token operator">=</span> detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
            <span class="token keyword">if</span> confidence <span class="token operator">&gt;</span> conf_threshold<span class="token punctuation">:</span>
                x1 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">*</span> frameWidth<span class="token punctuation">)</span>
                y1 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">*</span> frameHeight<span class="token punctuation">)</span>
                x2 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">*</span> frameWidth<span class="token punctuation">)</span>
                y2 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span> <span class="token operator">*</span> frameHeight<span class="token punctuation">)</span>
                bboxes<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">,</span> x2<span class="token punctuation">,</span> y2<span class="token punctuation">]</span><span class="token punctuation">)</span>
                cv2<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span>frameOpencvDnn<span class="token punctuation">,</span> <span class="token punctuation">(</span>x1<span class="token punctuation">,</span> y1<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>x2<span class="token punctuation">,</span> y2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">round</span><span class="token punctuation">(</span>frameHeight<span class="token operator">/</span><span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> frameOpencvDnn<span class="token punctuation">,</span> bboxes
    
    <span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span> <span class="token punctuation">:</span>
    
        <span class="token comment"># OpenCV DNN supports 2 networks.</span>
        <span class="token comment"># 1. FP16 version of the original caffe implementation ( 5.4 MB )</span>
        <span class="token comment"># 2. 8 bit Quantized version using Tensorflow ( 2.7 MB )</span>
        DNN <span class="token operator">=</span> <span class="token string">&quot;TF&quot;</span>
        <span class="token keyword">if</span> DNN <span class="token operator">==</span> <span class="token string">&quot;CAFFE&quot;</span><span class="token punctuation">:</span>
            modelFile <span class="token operator">=</span> <span class="token string">&quot;models/res10_300x300_ssd_iter_140000_fp16.caffemodel&quot;</span>
            configFile <span class="token operator">=</span> <span class="token string">&quot;models/deploy.prototxt&quot;</span>
            net <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>readNetFromCaffe<span class="token punctuation">(</span>configFile<span class="token punctuation">,</span> modelFile<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            modelFile <span class="token operator">=</span> <span class="token string">&quot;models/opencv_face_detector_uint8.pb&quot;</span>
            configFile <span class="token operator">=</span> <span class="token string">&quot;models/opencv_face_detector.pbtxt&quot;</span>
            net <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>readNetFromTensorflow<span class="token punctuation">(</span>modelFile<span class="token punctuation">,</span> configFile<span class="token punctuation">)</span>
    
        conf_threshold <span class="token operator">=</span> <span class="token number">0.7</span>
    
        source <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
            source <span class="token operator">=</span> sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    
        cap <span class="token operator">=</span> cv2<span class="token punctuation">.</span>VideoCapture<span class="token punctuation">(</span>source<span class="token punctuation">)</span>
        hasFrame<span class="token punctuation">,</span> frame <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
        vid_writer <span class="token operator">=</span> cv2<span class="token punctuation">.</span>VideoWriter<span class="token punctuation">(</span><span class="token string">&#39;output-dnn-{}.avi&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>cv2<span class="token punctuation">.</span>VideoWriter_fourcc<span class="token punctuation">(</span><span class="token string">&#39;M&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;J&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;P&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;G&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>frame<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>frame<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
        frame_count <span class="token operator">=</span> <span class="token number">0</span>
        tt_opencvDnn <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            hasFrame<span class="token punctuation">,</span> frame <span class="token operator">=</span> cap<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> hasFrame<span class="token punctuation">:</span>
                <span class="token keyword">break</span>
            frame_count <span class="token operator">+=</span> <span class="token number">1</span>
    
            t <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            outOpencvDnn<span class="token punctuation">,</span> bboxes <span class="token operator">=</span> detectFaceOpenCVDnn<span class="token punctuation">(</span>net<span class="token punctuation">,</span>frame<span class="token punctuation">)</span>
            tt_opencvDnn <span class="token operator">+=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> t
            fpsOpencvDnn <span class="token operator">=</span> frame_count <span class="token operator">/</span> tt_opencvDnn
            label <span class="token operator">=</span> <span class="token string">&quot;OpenCV DNN ; FPS : {:.2f}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>fpsOpencvDnn<span class="token punctuation">)</span>
            cv2<span class="token punctuation">.</span>putText<span class="token punctuation">(</span>outOpencvDnn<span class="token punctuation">,</span> label<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>FONT_HERSHEY_SIMPLEX<span class="token punctuation">,</span> <span class="token number">1.4</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>LINE_AA<span class="token punctuation">)</span>
    
            cv2<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span><span class="token string">&quot;Face Detection Comparison&quot;</span><span class="token punctuation">,</span> outOpencvDnn<span class="token punctuation">)</span>
    
            vid_writer<span class="token punctuation">.</span>write<span class="token punctuation">(</span>outOpencvDnn<span class="token punctuation">)</span>
            <span class="token keyword">if</span> frame_count <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                tt_opencvDnn <span class="token operator">=</span> <span class="token number">0</span>
    
            k <span class="token operator">=</span> cv2<span class="token punctuation">.</span>waitKey<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> k <span class="token operator">==</span> <span class="token number">27</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span>
        cv2<span class="token punctuation">.</span>destroyAllWindows<span class="token punctuation">(</span><span class="token punctuation">)</span>
        vid_writer<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-dlib中的hog人脸分类器和dlib中的hog人脸分类器" tabindex="-1"><a class="header-anchor" href="#_3-dlib中的hog人脸分类器和dlib中的hog人脸分类器" aria-hidden="true">#</a> 3 Dlib中的hog人脸分类器和Dlib中的hog人脸分类器</h2><p>Dlib就没有运行了，因为要编译嫌麻烦。而且opencv自带的已经足够了。Dlib里面人脸分类器调用和opencv一样。</p><p>Dlib所用的人脸数据见：</p><p>Hog(2825张图像):</p>`,11),F={href:"http://dlib.net/files/data/dlib_face_detector_training_data.tar.gz",target:"_blank",rel:"noopener noreferrer"},V=n("p",null,"dnn(7220张图像)：",-1),D={href:"http://dlib.net/files/data/dlib_face_detection_dataset-2016-09-30.tar.gz",target:"_blank",rel:"noopener noreferrer"},N=e('<h2 id="_4-方法比较" tabindex="-1"><a class="header-anchor" href="#_4-方法比较" aria-hidden="true">#</a> 4 方法比较</h2><p>OpencvDNN综合来说是最好的方法。不过要opencv3.43以上，对尺寸要求不高，速度精度都不错。如果追求高精度用caffe模型就行了，opencv3.4.1以上就可以了。OpenCV DNN低版本对tensorflow模型支持不好。</p><p>Dlib Hog在CPU下，检测速度最快但是小图像(人脸像素70以下)是无效的。因此第二个推荐是Hog。</p><p>Dlib DNN在GPU下，应该是最好的选择，精度都是最高的，但是有点慢。</p><p>Haar Cascade不推荐太古老了，而且错误率很高。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result1-e1539872861105.jpg" alt="https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result1-e1539872861105.jpg" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result1-e1539872861105.jpg</figcaption></figure><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result3-e1539872783684.jpg" alt="https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result3-e1539872783684.jpg" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2018/10/fd-acc-result3-e1539872783684.jpg</figcaption></figure><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2>',8),q={href:"https://www.learnopencv.com/face-detection-opencv-dlib-and-deep-learning-c-python/",target:"_blank",rel:"noopener noreferrer"};function W(M,S){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,r,d,k,v,m,n("p",null,[s("Dlib是一个C++工具包（也有python版本），代码地址： "),n("a",b,[s(" http://dlib.net/ "),t(a)])]),f,n("p",null,[n("a",h,[s(" https://download.csdn.net/download/luohenyj/10997489"),t(a)])]),n("p",null,[n("a",_,[s(" https://github.com/luohenyueji/OpenCV-Practical-Exercise"),t(a)]),g,s(" 如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。pch是预编译文件。Opencv版本3.4.3以上。")]),w,y,n("p",null,[n("a",C,[s(" https://github.com/opencv/opencv/tree/master/data/haarcascades "),t(a)])]),x,n("p",null,[s("OpenCV3.3以上版本就有该分类器的模型。模型来自论文： "),n("a",O,[s(" https://arxiv.org/abs/1512.02325 "),t(a)])]),H,n("p",null,[n("a",F,[s(" http://dlib.net/files/data/dlib_face_detector_training_data.tar.gz"),t(a)])]),V,n("p",null,[n("a",D,[s(" http://dlib.net/files/data/dlib_face_detection_dataset-2016-09-30.tar.gz"),t(a)])]),N,n("ul",null,[n("li",null,[n("a",q,[s(" https://www.learnopencv.com/face-detection-opencv-dlib-and-deep-learning-c-python/ "),t(a)])])])])}const R=p(l,[["render",W],["__file","2019-03-05-_OpenCV实战_2 人脸识别算法对比.html.vue"]]);export{R as default};
