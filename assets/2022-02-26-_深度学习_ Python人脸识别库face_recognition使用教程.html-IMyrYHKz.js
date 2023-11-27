import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o,c as i,a as n,b as s,d as t,e as c}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"深度学习-python人脸识别库face-recognition使用教程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深度学习-python人脸识别库face-recognition使用教程","aria-hidden":"true"},"#"),s(" [深度学习] Python人脸识别库face_recognition使用教程")],-1),r={href:"https://github.com/ageitgey/face_recognition",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/ageitgey/face_recognition/blob/master/README_Simplified_Chinese.md",target:"_blank",rel:"noopener noreferrer"},k={href:"https://face-recognition.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/davisking/dlib",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"总体而言这个项目的人脸识别模型是基于成年人的，在孩子身上效果可能会一般。face_recognition一般学习代码使用或者研究源代码比较好，离工程应用还是有一定的距离。",-1),b=n("p",null,"本文所有代码见：",-1),_={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Deep%20learning/face%20detection",target:"_blank",rel:"noopener noreferrer"},g=n("hr",null,null,-1),f=n("h2",{id:"_1-face-recognition安装与相关知识",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-face-recognition安装与相关知识","aria-hidden":"true"},"#"),s(" 1 face_recognition安装与相关知识")],-1),h={href:"https://blog.csdn.net/LuohenYJ/article/details/116069422",target:"_blank",rel:"noopener noreferrer"},y=c(`<p>当dlib安装好后，输入以下命令安装face_recognition。</p><blockquote><p>pip install face_recognition</p></blockquote><p>人脸识别通用流程一般有人脸检测，人脸对齐和人脸识别三步：</p><ul><li>1 人脸检测/人脸定位 face detection and location：人脸检测就是在图片中找到人脸的具体位置，并输出包含人脸位置的边界矩形框。某些检测算法可以同时输出人脸相应的关键点。</li><li>2 人脸对齐 face alignment：所谓的人脸对齐就是有时候人脸的角度不正，根据关键点检测结果通过图像变换或其他方法，将人脸上对准到一个预设的固定位置上（通常是正脸）。这样使得不同人脸的眼睛，鼻子都被放在同一个位置，大大提高识别精度。</li><li>3 人脸识别 face recognition：人脸识别有很多应用方向，但是目的都是识别当前人脸对应哪个人。</li></ul><p>简单的人脸识别通用流程示意图如下图所示。在face_recognition中所有代码都有涉及这些步骤；但是人脸对齐是直接调用dlib代码，没有实例说明。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/img/img1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然在成熟的商业工程应用不只有这三个部分，比如还有人脸质量判断，活体检测之类的，但是一般的项目都包含这三大步骤。关于人脸识别的更多介绍见：https://www.cnblogs.com/xiaoyh/p/11874270.html</p><h2 id="_2-人脸检测-定位" tabindex="-1"><a class="header-anchor" href="#_2-人脸检测-定位" aria-hidden="true">#</a> 2 人脸检测/定位</h2><p>本部分主要是对人脸进行检测和定位，并输出人脸相应的矩形框。主要用到的face_recognition内置函数有：</p><ul><li><p>face_recognition.api.face_locations(img, number_of_times_to_upsample=1, model=&#39;hog&#39;)</p><ul><li>用途：人脸检测，返回图像中人脸边界框的数组</li><li>img：输入图像，numpy数组</li><li>number_of_times_to_upsample：对图像进行上采样次数以找到更小的人脸，默认为1</li><li>model：检测模型，默认是hog机器学习模型，另外可设置cnn选择卷积神经网络模型以提高检测精度</li><li>返回：包含多张人脸边界框的list数组，边界框数据以人脸(top, right, bottom, left) 顺序表示</li></ul></li><li><p>face_recognition.api.load_image_file(file, mode=&#39;RGB&#39;)</p><ul><li>用途：加载图像</li><li>file：图像路径名</li><li>mode：图像颜色类型，设置RGB表示返回RGB图像，设置&#39;L&#39;表示返回灰度图像</li><li>返回：numpy数组</li></ul></li></ul><h3 id="_2-1-基于机器学习实现人脸检测" tabindex="-1"><a class="header-anchor" href="#_2-1-基于机器学习实现人脸检测" aria-hidden="true">#</a> 2.1 基于机器学习实现人脸检测</h3><p>来自examples/find_faces_in_picture.py</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt 
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> face_recognition

<span class="token comment">## 通过PIL加载图片</span>
image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 基于hog机器学习模型进行人脸识别，不能使用gpu加速</span>
face_locations <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>image<span class="token punctuation">)</span>

<span class="token comment">## 找到几张人脸</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;I found {} face(s) in this photograph.&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>face_locations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> face_location <span class="token keyword">in</span> face_locations<span class="token punctuation">:</span>

    <span class="token comment">## 打印人脸信息</span>
    top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left <span class="token operator">=</span> face_location
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> left<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 提取人脸</span>
    face_image <span class="token operator">=</span> image<span class="token punctuation">[</span>top<span class="token punctuation">:</span>bottom<span class="token punctuation">,</span> left<span class="token punctuation">:</span>right<span class="token punctuation">]</span>
    pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>fromarray<span class="token punctuation">(</span>face_image<span class="token punctuation">)</span>
    <span class="token comment">## jupyter 绘图</span>
    <span class="token comment">## pil_image.show()</span>
    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>    
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>I found 1 face(s) in this photograph.
A face is located at pixel location Top: 142, Left: 349, Bottom: 409, Right: 617
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_4_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-基于卷积神经网络实现人脸检测" tabindex="-1"><a class="header-anchor" href="#_2-2-基于卷积神经网络实现人脸检测" aria-hidden="true">#</a> 2.2 基于卷积神经网络实现人脸检测</h3><p>来自examples/find_faces_in_picture_cnn.py</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt 
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> face_recognition

<span class="token comment">## 通过PIL加载图片</span>
image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 基于cnn识别人脸,是否使用gpu看装机环境</span>
face_locations <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>image<span class="token punctuation">,</span> number_of_times_to_upsample<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> model<span class="token operator">=</span><span class="token string">&quot;cnn&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;I found {} face(s) in this photograph.&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>face_locations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> face_location <span class="token keyword">in</span> face_locations<span class="token punctuation">:</span>

    <span class="token comment">## 打印人脸信息</span>
    top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left <span class="token operator">=</span> face_location
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>top<span class="token punctuation">,</span> left<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 提取人脸</span>
    face_image <span class="token operator">=</span> image<span class="token punctuation">[</span>top<span class="token punctuation">:</span>bottom<span class="token punctuation">,</span> left<span class="token punctuation">:</span>right<span class="token punctuation">]</span>
    pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>fromarray<span class="token punctuation">(</span>face_image<span class="token punctuation">)</span>
    <span class="token comment">## jupyter 绘图</span>
    <span class="token comment">## pil_image.show()</span>
    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>    
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>I found 1 face(s) in this photograph.
A face is located at pixel location Top: 154, Left: 375, Bottom: 390, Right: 611
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_6_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-人脸马赛克" tabindex="-1"><a class="header-anchor" href="#_2-3-人脸马赛克" aria-hidden="true">#</a> 2.3 人脸马赛克</h3><p>来自examples/blur_faces_on_webcam.py</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> face_recognition
<span class="token keyword">import</span> cv2

frame <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 缩小图像以加快速度</span>
small_frame <span class="token operator">=</span> cv2<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>frame<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fx<span class="token operator">=</span><span class="token number">0.25</span><span class="token punctuation">,</span> fy<span class="token operator">=</span><span class="token number">0.25</span><span class="token punctuation">)</span>

<span class="token comment">## 找到人脸</span>
face_locations <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>small_frame<span class="token punctuation">,</span> model<span class="token operator">=</span><span class="token string">&quot;cnn&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left <span class="token keyword">in</span> face_locations<span class="token punctuation">:</span>
    <span class="token comment">## 提取边界框在原图比例的边界框</span>
    top <span class="token operator">*=</span> <span class="token number">4</span>
    right <span class="token operator">*=</span> <span class="token number">4</span>
    bottom <span class="token operator">*=</span> <span class="token number">4</span>
    left <span class="token operator">*=</span> <span class="token number">4</span>

<span class="token comment">## 提取人脸</span>
face_image <span class="token operator">=</span> frame<span class="token punctuation">[</span>top<span class="token punctuation">:</span>bottom<span class="token punctuation">,</span> left<span class="token punctuation">:</span>right<span class="token punctuation">]</span>

<span class="token comment">## 高斯模糊人脸</span>
face_image <span class="token operator">=</span> cv2<span class="token punctuation">.</span>GaussianBlur<span class="token punctuation">(</span>face_image<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">99</span><span class="token punctuation">,</span> <span class="token number">99</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>

<span class="token comment">## 原图人脸替换</span>
frame<span class="token punctuation">[</span>top<span class="token punctuation">:</span>bottom<span class="token punctuation">,</span> left<span class="token punctuation">:</span>right<span class="token punctuation">]</span> <span class="token operator">=</span> face_image

<span class="token comment">## 展示图像</span>
img <span class="token operator">=</span> frame<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span><span class="token punctuation">:</span><span class="token punctuation">,</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> 
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;matplotlib.image.AxesImage at 0x2139a75cdf0&gt;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_8_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-人脸关键点识别" tabindex="-1"><a class="header-anchor" href="#_3-人脸关键点识别" aria-hidden="true">#</a> 3 人脸关键点识别</h2><p>本部分主要是对人脸进行关键点识别，并输出人脸特征位置。主要用到的face_recognition内置函数有：</p><ul><li>face_recognition.api.face_landmarks(face_image, face_locations=None, model=&#39;large&#39;) <ul><li>用途：人脸关键点识别，返回图像人脸特征位置的字典</li><li>face_image：输入图像，numpy数组</li><li>face_locations：要识别的位置列表（可选）</li><li>model：使用的识别模型。默认值为large表示大模型。small表示小模型，但只返回五个特征点</li><li>返回：特征位置（眼睛、鼻子等）的字典列表</li></ul></li></ul><h3 id="_3-1-提取图像中的人脸关键点" tabindex="-1"><a class="header-anchor" href="#_3-1-提取图像中的人脸关键点" aria-hidden="true">#</a> 3.1 提取图像中的人脸关键点</h3><p>来自examples/find_facial_features_in_picture.py</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt 
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">import</span> face_recognition

<span class="token comment">## 通过PIL加载图片</span>
image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/two_people.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 找到图像中所有人脸的所有面部特征，返回字典</span>
face_landmarks_list <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_landmarks<span class="token punctuation">(</span>image<span class="token punctuation">)</span>

<span class="token comment">## 发现人脸数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;I found {} face(s) in this photograph.&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>face_landmarks_list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 创建展示结果的图像</span>
pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>fromarray<span class="token punctuation">(</span>image<span class="token punctuation">)</span>
d <span class="token operator">=</span> ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>

<span class="token comment">## 绘制关键点</span>
<span class="token keyword">for</span> face_landmarks <span class="token keyword">in</span> face_landmarks_list<span class="token punctuation">:</span>

    <span class="token comment">## 打印此图像中每个面部特征的位置</span>
    <span class="token comment">## for facial_feature in face_landmarks.keys():</span>
       <span class="token comment">## print(&quot;The {} in this face has the following points: {}&quot;.format(facial_feature, face_landmarks[facial_feature]))</span>

    <span class="token comment">## 用一条线勾勒出图像中的每个面部特征</span>
    <span class="token keyword">for</span> facial_feature <span class="token keyword">in</span> face_landmarks<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span>facial_feature<span class="token punctuation">]</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>


<span class="token comment">## jupyter 绘图</span>
<span class="token comment">## pil_image.show()</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>    
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>I found 2 face(s) in this photograph.
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_11_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-人脸涂色" tabindex="-1"><a class="header-anchor" href="#_3-2-人脸涂色" aria-hidden="true">#</a> 3.2 人脸涂色</h3><p>来自examples/digital_makeup.py</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">import</span> face_recognition

<span class="token comment">## 通过PIL加载图片</span>
image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/two_people.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 找到图像中所有人脸的所有面部特征，返回字典</span>
face_landmarks_list <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_landmarks<span class="token punctuation">(</span>image<span class="token punctuation">)</span>

pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>fromarray<span class="token punctuation">(</span>image<span class="token punctuation">)</span>

<span class="token comment">## 绘图</span>
<span class="token keyword">for</span> face_landmarks <span class="token keyword">in</span> face_landmarks_list<span class="token punctuation">:</span>
    d <span class="token operator">=</span> ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>pil_image<span class="token punctuation">,</span> <span class="token string">&#39;RGBA&#39;</span><span class="token punctuation">)</span>

    <span class="token comment">## 眉毛涂色</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;left_eyebrow&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">39</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;right_eyebrow&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">39</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;left_eyebrow&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">39</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;right_eyebrow&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">68</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">39</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>

    <span class="token comment">## 嘴唇涂色</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;top_lip&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;bottom_lip&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;top_lip&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;bottom_lip&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">)</span>

    <span class="token comment">## 眼睛涂色</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;left_eye&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>polygon<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;right_eye&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 眼线涂色</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;left_eye&#39;</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">[</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;left_eye&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span>
    d<span class="token punctuation">.</span>line<span class="token punctuation">(</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;right_eye&#39;</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">[</span>face_landmarks<span class="token punctuation">[</span><span class="token string">&#39;right_eye&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">110</span><span class="token punctuation">)</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span>

<span class="token comment">## jupyter 绘图</span>
<span class="token comment">## pil_image.show()</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_13_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-3-人眼睁闭状态识别" tabindex="-1"><a class="header-anchor" href="#_3-3-人眼睁闭状态识别" aria-hidden="true">#</a> 3.3 人眼睁闭状态识别</h3><p>来自examples / blink_detection.py</p><p>该部分代码作用为根据人眼关键点数据计算人眼的纵横比。人眼睁开的时候纵横比较高，人眼闭上的时候纵横比较小。如果眼睛闭上次数超过设定阈值，则输出人眼处于闭眼状态。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pylab <span class="token keyword">as</span> plt
<span class="token keyword">import</span> face_recognition
<span class="token keyword">import</span> cv2
<span class="token keyword">from</span> scipy<span class="token punctuation">.</span>spatial <span class="token keyword">import</span> distance <span class="token keyword">as</span> dist

<span class="token comment">## 这是一个检测眼睛状态的演示</span>
<span class="token comment">## 人眼闭上次数超过设定阈值EYES_CLOSED_SECONDS，判定人眼处于闭眼状态</span>
EYES_CLOSED_SECONDS <span class="token operator">=</span> <span class="token number">2</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 闭眼次数</span>
    closed_count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment">## 读取两张图像模仿人睁闭眼</span>
    img_eye_opened <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&#39;test_img/eye_opened.jpg&#39;</span><span class="token punctuation">)</span>
    img_eye_closed <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&#39;test_img/eye_closed.jpg&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">## 设置图像输入序列，前1张睁眼，中间3张闭眼，最后1张睁眼</span>
    frame_inputs <span class="token operator">=</span> <span class="token punctuation">[</span>img_eye_opened<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">[</span>img_eye_closed<span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token punctuation">[</span>img_eye_opened<span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">1</span>

    <span class="token keyword">for</span> frame_num<span class="token punctuation">,</span> frame <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>frame_inputs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 缩小图片</span>
        small_frame <span class="token operator">=</span> cv2<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>frame<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fx<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> fy<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span>
        <span class="token comment">## bgr通道变为rgb通道</span>
        rgb_small_frame <span class="token operator">=</span> small_frame<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token comment">## 人脸关键点检测</span>
        face_landmarks_list <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_landmarks<span class="token punctuation">(</span>rgb_small_frame<span class="token punctuation">)</span>
        <span class="token comment">## 没有检测到关键点</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>face_landmarks_list<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>

        <span class="token comment">## 获得人眼特征点位置</span>
        <span class="token keyword">for</span> face_landmark <span class="token keyword">in</span> face_landmarks_list<span class="token punctuation">:</span>
            <span class="token comment">## 每只眼睛有六个关键点，以眼睛最左边顺时针顺序排列</span>
            left_eye <span class="token operator">=</span> face_landmark<span class="token punctuation">[</span><span class="token string">&#39;left_eye&#39;</span><span class="token punctuation">]</span>
            right_eye <span class="token operator">=</span> face_landmark<span class="token punctuation">[</span><span class="token string">&#39;right_eye&#39;</span><span class="token punctuation">]</span>

            <span class="token comment">## 计算眼睛的纵横比ear，ear这里不是耳朵的意思</span>
            ear_left <span class="token operator">=</span> get_ear<span class="token punctuation">(</span>left_eye<span class="token punctuation">)</span>
            ear_right <span class="token operator">=</span> get_ear<span class="token punctuation">(</span>right_eye<span class="token punctuation">)</span>
            <span class="token comment">## 判断眼睛是否闭上</span>
            <span class="token comment">## 如果两只眼睛纵横比小于0.2，视为眼睛闭上</span>
            closed <span class="token operator">=</span> ear_left <span class="token operator">&lt;</span> <span class="token number">0.2</span> <span class="token keyword">and</span> ear_right <span class="token operator">&lt;</span> <span class="token number">0.2</span>
            <span class="token comment">## 设置眼睛检测闭上次数</span>
            <span class="token keyword">if</span> closed<span class="token punctuation">:</span>
                closed_count <span class="token operator">+=</span> <span class="token number">1</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                closed_count <span class="token operator">=</span> <span class="token number">0</span>
            <span class="token comment">## 如果眼睛检测闭上次数大于EYES_CLOSED_SECONDS，输出眼睛闭上</span>
            <span class="token keyword">if</span> closed_count <span class="token operator">&gt;</span> EYES_CLOSED_SECONDS<span class="token punctuation">:</span>
                eye_status <span class="token operator">=</span> <span class="token string">&quot;frame {} | EYES CLOSED&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>frame_num<span class="token punctuation">)</span>
            <span class="token keyword">elif</span> closed_count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
                eye_status <span class="token operator">=</span> <span class="token string">&quot;frame {} | MAYBE EYES CLOSED &quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>frame_num<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                eye_status <span class="token operator">=</span> <span class="token string">&quot;frame {} | EYES OPENED &quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>frame_num<span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>eye_status<span class="token punctuation">)</span>

            plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>rgb_small_frame<span class="token punctuation">)</span>
            <span class="token comment">## 左右眼轮廓第一个关键点颜色为red，最后一个关键点颜色为blue，其他关键点为yellow</span>
            color <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;red&#39;</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token string">&#39;yellow&#39;</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>left_eye<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">[</span><span class="token string">&#39;blue&#39;</span><span class="token punctuation">]</span>
            <span class="token comment">## 按照顺序依次绘制眼睛关键点</span>
            <span class="token keyword">for</span> index <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>left_eye<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                leye <span class="token operator">=</span> left_eye<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
                reye <span class="token operator">=</span> right_eye<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
                plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>leye<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> leye<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;bo&#39;</span><span class="token punctuation">,</span> color<span class="token operator">=</span>color<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
                plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>reye<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> reye<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;bo&#39;</span><span class="token punctuation">,</span> color<span class="token operator">=</span>color<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span>
                plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span>eye_status<span class="token punctuation">)</span>

            plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 计算人眼纵横比</span>
<span class="token keyword">def</span> <span class="token function">get_ear</span><span class="token punctuation">(</span>eye<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 计算眼睛轮廓垂直方向上下关键点的距离</span>
    A <span class="token operator">=</span> dist<span class="token punctuation">.</span>euclidean<span class="token punctuation">(</span>eye<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> eye<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    B <span class="token operator">=</span> dist<span class="token punctuation">.</span>euclidean<span class="token punctuation">(</span>eye<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> eye<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">## 计算水平方向上的关键点的距离</span>
    C <span class="token operator">=</span> dist<span class="token punctuation">.</span>euclidean<span class="token punctuation">(</span>eye<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> eye<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">## 计算眼睛的纵横比</span>
    ear <span class="token operator">=</span> <span class="token punctuation">(</span>A <span class="token operator">+</span> B<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">2.0</span> <span class="token operator">*</span> C<span class="token punctuation">)</span>

    <span class="token comment">## 返回眼睛的纵横比</span>
    <span class="token keyword">return</span> ear


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>frame 0 | EYES OPENED 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_15_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>frame 1 | MAYBE EYES CLOSED 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_15_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>frame 2 | MAYBE EYES CLOSED 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_15_5.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>frame 3 | EYES CLOSED
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_15_7.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>frame 4 | EYES OPENED 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_15_9.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-人脸识别" tabindex="-1"><a class="header-anchor" href="#_4-人脸识别" aria-hidden="true">#</a> 4 人脸识别</h2><p>本部分主要是对人脸进行识别，提供多种实际任务案例。主要用到的face_recognition内置函数有：</p><ul><li><p>face_recognition.api.face_encodings(face_image, known_face_locations=None, num_jitters=1, model=&#39;small&#39;)</p><ul><li>用途：返回图像中每个人脸的128维人脸特征</li><li>face_image：输入图像，numpy数组</li><li>known_face_locations：每个人脸的边界框（可选），能够大大提高识别速度</li><li>num_jitters：计算人脸特征时重新采样人脸的次数。更高更准确，但更慢，即设置为100慢100倍</li><li>model：使用的识别模型，默认值为small表示小模型，只返回五个特征点；可设置为large</li><li>返回：包含人脸特征的列表</li></ul></li><li><p>face_recognition.api.compare_faces(known_face_encodings, face_encoding_to_check, tolerance=0.6)</p><ul><li>用途：将人脸特征与候选人脸特征进行比较，以查看它们是否匹配。</li><li>known_face_encodings：已知人脸特征列表</li><li>face_encoding_to_check：与已知人脸特征列表进行比较的单个人脸特征</li><li>tolerance：人脸距离越小表示人脸越相近，当人脸距离小于tolerance，表示是同一个人；0.6是默认值，也是作者认为的最佳值（实际有所出入）</li><li>返回：包含True或者False的列表，以表示是否为同一个人脸</li></ul></li><li><p>face_recognition.api.face_distance(face_encodings, face_to_compare)</p><ul><li>用途：给定一个人脸特征列表，将它们与已知的人脸特征进行比较，并获得人脸特征向量之间的欧几里德距离，距离越小面孔越相似。</li><li>face_encodings：已知的人脸特征列表</li><li>face_to_compare：未知的人脸特征列表</li><li>返回：代表距离的numpy数组，和face_encodings的排序方式一样</li></ul></li></ul><h3 id="_4-1-人脸比对" tabindex="-1"><a class="header-anchor" href="#_4-1-人脸比对" aria-hidden="true">#</a> 4.1 人脸比对</h3><p>来自examples/recognize_faces_in_pictures.py</p><p>该部分代码就是输入两张已知人脸图像和一张未知人脸图像，看未知人脸图像和已知人脸的哪一张图像表示的是同一个人。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">import</span> face_recognition

<span class="token comment">## 通过PIL加载图片</span>
biden_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/biden.jpg&quot;</span><span class="token punctuation">)</span>
obama_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>
unknown_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama2.jpg&quot;</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>biden_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;biden&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>obama_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;obama&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>unknown_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;unknown&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 获取输入图像文件中每个人脸的人脸特征，人脸特征维度为128</span>
<span class="token comment">## 由于输入图像中可能有多张脸，因此它会返回一个特征列表。</span>
<span class="token comment">## 默认输入图像只有一张人脸，只关心每个图像中的第一个特征，所以设置特征获取索引为0</span>
<span class="token comment">## 建议单步看看该函数运行机制</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    biden_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>biden_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    obama_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>obama_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    unknown_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>unknown_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">except</span> IndexError<span class="token punctuation">:</span>
    <span class="token comment">## 没有找到人脸的情况</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;I wasn&#39;t able to locate any faces in at least one of the images. Check the image files. Aborting...&quot;</span><span class="token punctuation">)</span>
    quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 已知人脸列表，按照顺序为拜登的人脸特征，奥巴马的人脸特征</span>
known_faces <span class="token operator">=</span> <span class="token punctuation">[</span>
    biden_face_encoding<span class="token punctuation">,</span>
    obama_face_encoding
<span class="token punctuation">]</span>

<span class="token comment">## 如果未知人脸与已知人脸数组中的某个人匹配，则匹配结果为真</span>
<span class="token comment">## 这个函数调用了face_distance人脸特征距离计算函数，可以单步调试看看源代码</span>
results <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>compare_faces<span class="token punctuation">(</span>known_faces<span class="token punctuation">,</span> unknown_face_encoding<span class="token punctuation">)</span>

<span class="token comment">## 是否和第一个人匹配</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Is the unknown face a picture of Biden? {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 是否和第二个人匹配</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Is the unknown face a picture of Obama? {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>results<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 这张人脸是否曾经见过</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Is the unknown face a new person that we&#39;ve never seen before? {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token keyword">not</span> <span class="token boolean">True</span> <span class="token keyword">in</span> results<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_18_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_18_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_18_2.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>Is the unknown face a picture of Biden? False
Is the unknown face a picture of Obama? True
Is the unknown face a new person that we&#39;ve never seen before? False
</code></pre><h3 id="_4-2-人脸识别之后在原图上画框并标注姓名" tabindex="-1"><a class="header-anchor" href="#_4-2-人脸识别之后在原图上画框并标注姓名" aria-hidden="true">#</a> 4.2 人脸识别之后在原图上画框并标注姓名</h3><p>来自examples/identify_and_draw_boxes_on_faces.py</p><p>该部分代码就是输入两张已知人脸图像和一张未知人脸图像，然后进行人脸识别并在未知人脸图像标注各个人脸身份信息</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> face_recognition
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token comment">## 加载第一张示例图片并提取特征</span>
obama_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>
obama_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>obama_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

<span class="token comment">## 加载第二张示例图片并提取特征</span>
biden_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/biden.jpg&quot;</span><span class="token punctuation">)</span>
biden_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>biden_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

<span class="token comment">## 创建已知人脸特征和其名字的数据</span>
known_face_encodings <span class="token operator">=</span> <span class="token punctuation">[</span>
    obama_face_encoding<span class="token punctuation">,</span>
    biden_face_encoding
<span class="token punctuation">]</span>
known_face_names <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;Barack Obama&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Joe Biden&quot;</span>
<span class="token punctuation">]</span>

<span class="token comment">## 加载未知人脸图片</span>
unknown_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/two_people.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 人脸检测</span>
face_locations <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>unknown_image<span class="token punctuation">)</span>
<span class="token comment">## 人脸特征提取</span>
face_encodings <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>unknown_image<span class="token punctuation">,</span> face_locations<span class="token punctuation">)</span>

<span class="token comment">## 查看输入图像</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>biden_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;biden&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>obama_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;obama&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>unknown_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;unknown&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 绘图</span>
pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>fromarray<span class="token punctuation">(</span>unknown_image<span class="token punctuation">)</span>
draw <span class="token operator">=</span> ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>

<span class="token comment">## 未知人脸图片中每张人脸处理</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">)</span><span class="token punctuation">,</span> face_encoding <span class="token keyword">in</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>face_locations<span class="token punctuation">,</span> face_encodings<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 判断和哪张人脸匹配</span>
    matches <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>compare_faces<span class="token punctuation">(</span>known_face_encodings<span class="token punctuation">,</span> face_encoding<span class="token punctuation">)</span>

    name <span class="token operator">=</span> <span class="token string">&quot;Unknown&quot;</span>

    <span class="token comment">## 结果匹配方式1</span>
    <span class="token comment">## 有多张人脸匹配成功，只以匹配的第一张人脸为结果</span>
    <span class="token comment">## if True in matches:</span>
    <span class="token comment">##     first_match_index = matches.index(True)</span>
    <span class="token comment">##     name = known_face_names[first_match_index]</span>

    <span class="token comment">## 结果匹配方式2</span>
    <span class="token comment">## 一种更好的结果匹配方式，使用距离新面孔最小的已知面孔为结果</span>
    <span class="token comment">## 计算已知人脸和未知人脸特征向量的距离，距离越小表示两张人脸为同一个人的可能性越大</span>
    face_distances <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_distance<span class="token punctuation">(</span>known_face_encodings<span class="token punctuation">,</span> face_encoding<span class="token punctuation">)</span>
    <span class="token comment">## 提取和未知人脸距离最小的已知人脸编号</span>
    best_match_index <span class="token operator">=</span> np<span class="token punctuation">.</span>argmin<span class="token punctuation">(</span>face_distances<span class="token punctuation">)</span>
    <span class="token comment">## 提取匹配的已知人脸名</span>
    <span class="token keyword">if</span> matches<span class="token punctuation">[</span>best_match_index<span class="token punctuation">]</span><span class="token punctuation">:</span>
        name <span class="token operator">=</span> known_face_names<span class="token punctuation">[</span>best_match_index<span class="token punctuation">]</span>

    <span class="token comment">## 为人脸画边界框</span>
    draw<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> top<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>right<span class="token punctuation">,</span> bottom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> outline<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 在人脸边界框下方绘制该人脸所属人的名字</span>
    text_width<span class="token punctuation">,</span> text_height <span class="token operator">=</span> draw<span class="token punctuation">.</span>textsize<span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    draw<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> bottom <span class="token operator">-</span> text_height <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>right<span class="token punctuation">,</span> bottom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span> outline<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    draw<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">,</span> bottom <span class="token operator">-</span> text_height <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">del</span> draw

<span class="token comment">## jupyter 绘图</span>
<span class="token comment">## pil_image.show()</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 保存识别结果</span>
<span class="token comment">## pil_image.save(&quot;image_with_boxes.jpg&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_20_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_20_2.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_20_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-3-在不同精度上进行人脸比对" tabindex="-1"><a class="header-anchor" href="#_4-3-在不同精度上进行人脸比对" aria-hidden="true">#</a> 4.3 在不同精度上进行人脸比对</h3><p>来自examples/face_distance.py</p><p>该部分代码功能类似4.1，区别在于根据人脸特征向量的距离和不同距离阈值来判断两张人脸是否表示的是同一个人</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> face_recognition

<span class="token comment">## 加载图像</span>
known_obama_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama.jpg&quot;</span><span class="token punctuation">)</span>
known_biden_image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/biden.jpg&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 获得人脸图像特征</span>
obama_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>known_obama_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
biden_face_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>known_biden_image<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

known_encodings <span class="token operator">=</span> <span class="token punctuation">[</span>
    obama_face_encoding<span class="token punctuation">,</span>
    biden_face_encoding
<span class="token punctuation">]</span>

<span class="token comment">## 加载未知人脸图像</span>
image_to_test <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span><span class="token string">&quot;test_img/obama2.jpg&quot;</span><span class="token punctuation">)</span>
image_to_test_encoding <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>image_to_test<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

<span class="token comment">## 计算未知人脸和已知人脸的距离</span>
face_distances <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_distance<span class="token punctuation">(</span>known_encodings<span class="token punctuation">,</span> image_to_test_encoding<span class="token punctuation">)</span>

<span class="token comment">## 查看不同距离阈值下的人脸匹配结果</span>
<span class="token keyword">for</span> i<span class="token punctuation">,</span> face_distance <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>face_distances<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 打印距离</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;The test image has a distance of {:.2} from known image #{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>face_distance<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">## 当阈值为0.6，是否匹配</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;- With a normal cutoff of 0.6, would the test image match the known image? {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>face_distance <span class="token operator">&lt;</span> <span class="token number">0.6</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">## 当阈值为更严格的0.5，是否匹配</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;- With a very strict cutoff of 0.5, would the test image match the known image? {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
        face_distance <span class="token operator">&lt;</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>The test image has a distance of 0.35 from known image #0
- With a normal cutoff of 0.6, would the test image match the known image? True
- With a very strict cutoff of 0.5, would the test image match the known image? True

The test image has a distance of 0.82 from known image #1
- With a normal cutoff of 0.6, would the test image match the known image? False
- With a very strict cutoff of 0.5, would the test image match the known image? False
</code></pre><h3 id="_4-4-基于k最近邻knn分类算法进行人脸识别" tabindex="-1"><a class="header-anchor" href="#_4-4-基于k最近邻knn分类算法进行人脸识别" aria-hidden="true">#</a> 4.4 基于K最近邻KNN分类算法进行人脸识别</h3><p>来自examples/face_recognition_knn.py</p><p>该部分代码和前面部分代码是一样的，只是最后提取人脸特征后用KNN近邻算法进行分类，而不是用距离来判断。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">%</span>matplotlib inline
<span class="token triple-quoted-string string">&quot;&quot;&quot;
使用k-最近邻（KNN）算法进行人脸识别的示例
&quot;&quot;&quot;</span>

<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> math
<span class="token keyword">from</span> sklearn <span class="token keyword">import</span> neighbors
<span class="token keyword">import</span> os
<span class="token keyword">import</span> os<span class="token punctuation">.</span>path
<span class="token keyword">import</span> pickle
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">import</span> face_recognition
<span class="token keyword">from</span> face_recognition<span class="token punctuation">.</span>face_recognition_cli <span class="token keyword">import</span> image_files_in_folder

ALLOWED_EXTENSIONS <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;png&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jpg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jpeg&#39;</span><span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">train</span><span class="token punctuation">(</span>train_dir<span class="token punctuation">,</span> model_save_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> n_neighbors<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> knn_algo<span class="token operator">=</span><span class="token string">&#39;ball_tree&#39;</span><span class="token punctuation">,</span> verbose<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    训练k近邻分类器进行人脸识别。
    :param train_dir: 包含每个已知人员及其人脸的目录。
     Structure:
        &lt;train_dir&gt;/
        ├── &lt;person1&gt;/
        │   ├── &lt;somename1&gt;.jpeg
        │   ├── &lt;somename2&gt;.jpeg
        │   ├── ...
        ├── &lt;person2&gt;/
        │   ├── &lt;somename1&gt;.jpeg
        │   └── &lt;somename2&gt;.jpeg
        └── ...
    :param model_save_path: (可选) 模型保存目录
    :param n_neighbors: (可选) 分类中要加权的邻居数。如果未指定，则自动选择，就是k-NN的k的值，选取最近的k个点
    :param knn_algo: (可选) knn底层的搜索算法
    :param verbose: 打印训练信息
    :return: 返回训练好的模型
    &quot;&quot;&quot;</span>
    X <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    y <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">## 读取人员路径</span>
    <span class="token keyword">for</span> class_dir <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>train_dir<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>train_dir<span class="token punctuation">,</span> class_dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>

        <span class="token comment">## 读取当前人员的人脸图片</span>
        <span class="token keyword">for</span> img_path <span class="token keyword">in</span> image_files_in_folder<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>train_dir<span class="token punctuation">,</span> class_dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment">## 加载图片</span>
            image <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span>img_path<span class="token punctuation">)</span>
            <span class="token comment">## 人脸检测</span>
            face_bounding_boxes <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>image<span class="token punctuation">)</span>

            <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>face_bounding_boxes<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">:</span>
                <span class="token comment">## 没有人就跳过当前图片</span>
                <span class="token keyword">if</span> verbose<span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Image {} not suitable for training: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>img_path<span class="token punctuation">,</span> <span class="token string">&quot;Didn&#39;t find a face&quot;</span> <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>
                        face_bounding_boxes<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token keyword">else</span> <span class="token string">&quot;Found more than one face&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token comment">## 保存人脸特征和类别</span>
                X<span class="token punctuation">.</span>append<span class="token punctuation">(</span>face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>image<span class="token punctuation">,</span> known_face_locations<span class="token operator">=</span>face_bounding_boxes<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                y<span class="token punctuation">.</span>append<span class="token punctuation">(</span>class_dir<span class="token punctuation">)</span>

    <span class="token comment">## 自定设置n_neighbors</span>
    <span class="token keyword">if</span> n_neighbors <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        n_neighbors <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">round</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> verbose<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Chose n_neighbors automatically:&quot;</span><span class="token punctuation">,</span> n_neighbors<span class="token punctuation">)</span>

    <span class="token comment">## 训练KNN分类器</span>
    knn_clf <span class="token operator">=</span> neighbors<span class="token punctuation">.</span>KNeighborsClassifier<span class="token punctuation">(</span>n_neighbors<span class="token operator">=</span>n_neighbors<span class="token punctuation">,</span> algorithm<span class="token operator">=</span>knn_algo<span class="token punctuation">,</span> weights<span class="token operator">=</span><span class="token string">&#39;distance&#39;</span><span class="token punctuation">)</span>
    knn_clf<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

    <span class="token comment">## 保存分类器</span>
    <span class="token keyword">if</span> model_save_path <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>model_save_path<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>knn_clf<span class="token punctuation">,</span> f<span class="token punctuation">)</span>

    <span class="token keyword">return</span> knn_clf


<span class="token keyword">def</span> <span class="token function">predict</span><span class="token punctuation">(</span>X_img_path<span class="token punctuation">,</span> knn_clf<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> model_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> distance_threshold<span class="token operator">=</span><span class="token number">0.6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    使用经过训练的KNN分类器识别给定图像中的人脸
    :param X_img_path: 输入图像
    :param knn_clf: (可选) knn模型，和model_path必须有一个可用
    :param model_path: (可选) knn模型路径，和knn_clf必须有一个可用
    :param distance_threshold: (可选) 人脸分类的距离阈值。阈值越大，就越容易误报。
    :return: 人脸对应的人名和其边界框
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isfile<span class="token punctuation">(</span>X_img_path<span class="token punctuation">)</span> <span class="token keyword">or</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>splitext<span class="token punctuation">(</span>X_img_path<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token keyword">not</span> <span class="token keyword">in</span> ALLOWED_EXTENSIONS<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span><span class="token string">&quot;Invalid image path: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>X_img_path<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> knn_clf <span class="token keyword">is</span> <span class="token boolean">None</span> <span class="token keyword">and</span> model_path <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span><span class="token string">&quot;Must supply knn classifier either thourgh knn_clf or model_path&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">## 加载模型</span>
    <span class="token keyword">if</span> knn_clf <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>model_path<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            knn_clf <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>

    <span class="token comment">## 读取图片和进行人脸检测</span>
    X_img <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>load_image_file<span class="token punctuation">(</span>X_img_path<span class="token punctuation">)</span>
    X_face_locations <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_locations<span class="token punctuation">(</span>X_img<span class="token punctuation">)</span>

    <span class="token comment">## 如果没有检测到人脸就返回空list</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>X_face_locations<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token comment">## 提取人脸特征</span>
    faces_encodings <span class="token operator">=</span> face_recognition<span class="token punctuation">.</span>face_encodings<span class="token punctuation">(</span>X_img<span class="token punctuation">,</span> known_face_locations<span class="token operator">=</span>X_face_locations<span class="token punctuation">)</span>

    <span class="token comment">## 使用K近邻进行分类</span>
    closest_distances <span class="token operator">=</span> knn_clf<span class="token punctuation">.</span>kneighbors<span class="token punctuation">(</span>faces_encodings<span class="token punctuation">,</span> n_neighbors<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
    are_matches <span class="token operator">=</span> <span class="token punctuation">[</span>closest_distances<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> distance_threshold <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>X_face_locations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

    <span class="token comment">## 返回预测结果</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">(</span>pred<span class="token punctuation">,</span> loc<span class="token punctuation">)</span> <span class="token keyword">if</span> rec <span class="token keyword">else</span> <span class="token punctuation">(</span><span class="token string">&quot;unknown&quot;</span><span class="token punctuation">,</span> loc<span class="token punctuation">)</span> <span class="token keyword">for</span> pred<span class="token punctuation">,</span> loc<span class="token punctuation">,</span> rec <span class="token keyword">in</span>
            <span class="token builtin">zip</span><span class="token punctuation">(</span>knn_clf<span class="token punctuation">.</span>predict<span class="token punctuation">(</span>faces_encodings<span class="token punctuation">)</span><span class="token punctuation">,</span> X_face_locations<span class="token punctuation">,</span> are_matches<span class="token punctuation">)</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">show_prediction_labels_on_image</span><span class="token punctuation">(</span>img_path<span class="token punctuation">,</span> predictions<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    预测结果可视化
    :param img_path: 预测图像
    :param predictions: 预测结果
    :return:
    &quot;&quot;&quot;</span>
    pil_image <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>img_path<span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&quot;RGB&quot;</span><span class="token punctuation">)</span>
    draw <span class="token operator">=</span> ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>

    <span class="token keyword">for</span> name<span class="token punctuation">,</span> <span class="token punctuation">(</span>top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">)</span> <span class="token keyword">in</span> predictions<span class="token punctuation">:</span>
        <span class="token comment">## 画框</span>
        draw<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> top<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>right<span class="token punctuation">,</span> bottom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> outline<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment">## 设置名字，需要用uft-8编码</span>
        name <span class="token operator">=</span> name<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span>

        <span class="token comment">## 标注人名</span>
        text_width<span class="token punctuation">,</span> text_height <span class="token operator">=</span> draw<span class="token punctuation">.</span>textsize<span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        draw<span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> bottom <span class="token operator">-</span> text_height <span class="token operator">-</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>right<span class="token punctuation">,</span> bottom<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span> outline<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        draw<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">(</span>left <span class="token operator">+</span> <span class="token number">6</span><span class="token punctuation">,</span> bottom <span class="token operator">-</span> text_height <span class="token operator">-</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> fill<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">del</span> draw

    <span class="token comment">## jupyter 绘图</span>
    <span class="token comment">## pil_image.show()</span>
    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>pil_image<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token comment">## 训练图片下载地址：https://github.com/ageitgey/face_recognition/tree/master/examples/knn_examples</span>
    <span class="token comment">## STEP 1 训练KNN分类器</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Training KNN classifier...&quot;</span><span class="token punctuation">)</span>
    classifier <span class="token operator">=</span> train<span class="token punctuation">(</span><span class="token string">&quot;./test_img/knn_examples/train&quot;</span><span class="token punctuation">,</span> model_save_path<span class="token operator">=</span><span class="token string">&quot;trained_knn_model.clf&quot;</span><span class="token punctuation">,</span> n_neighbors<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Training complete!&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">## STEP 2 使用训练好的KNN分类器对测试的人脸图像进行识别</span>
    <span class="token keyword">for</span> image_file <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span><span class="token string">&quot;./test_img/knn_examples/test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 待测试人脸图像路径</span>
        full_file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">&quot;./test_img/knn_examples/test&quot;</span><span class="token punctuation">,</span> image_file<span class="token punctuation">)</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Looking for faces in {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>image_file<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment">## 用经过训练的分类器模型查找图像中的所有人</span>
        predictions <span class="token operator">=</span> predict<span class="token punctuation">(</span>full_file_path<span class="token punctuation">,</span> model_path<span class="token operator">=</span><span class="token string">&quot;trained_knn_model.clf&quot;</span><span class="token punctuation">)</span>

        <span class="token comment">## 打印结果</span>
        <span class="token keyword">for</span> name<span class="token punctuation">,</span> <span class="token punctuation">(</span>top<span class="token punctuation">,</span> right<span class="token punctuation">,</span> bottom<span class="token punctuation">,</span> left<span class="token punctuation">)</span> <span class="token keyword">in</span> predictions<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;- Found {} at ({}, {})&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> left<span class="token punctuation">,</span> top<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment">## 展示结果</span>
        show_prediction_labels_on_image<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">&quot;./test_img/knn_examples/test&quot;</span><span class="token punctuation">,</span> image_file<span class="token punctuation">)</span><span class="token punctuation">,</span> predictions<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Training KNN classifier...
Training complete!
Looking for faces in alex_lacamoire1.jpg
- Found alex_lacamoire at (633, 206)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_24_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>Looking for faces in johnsnow_test1.jpg
- Found kit_harington at (262, 180)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_24_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>Looking for faces in kit_with_rose.jpg
- Found rose_leslie at (79, 130)
- Found kit_harington at (247, 92)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_24_5.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>Looking for faces in obama1.jpg
- Found obama at (546, 204)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_24_7.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>Looking for faces in obama_and_biden.jpg
- Found biden at (737, 449)
- Found obama at (1133, 390)
- Found unknown at (1594, 1062)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/Face/[深度学习] Python人脸识别库face_recognition使用教程/output/output_24_9.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-5-基准性能测试" tabindex="-1"><a class="header-anchor" href="#_4-5-基准性能测试" aria-hidden="true">#</a> 4.5 基准性能测试</h3><p>来自examples/benchmark.py</p><p>该部分代码实现一个非常简单的基准测试，可以让您了解人脸识别的每一步在您的系统上运行的速度</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> timeit

<span class="token comment">## 这是一个非常简单的基准测试，可以让您了解人脸识别的每一步在您的系统上运行的速度。请注意，在较大的图像大小下，人脸检测变得非常缓慢</span>
TEST_IMAGES <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;test_img/obama-240p.jpg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;test_img/obama-480p.jpg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;test_img/obama-720p.jpg&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;test_img/obama-1080p.jpg&quot;</span>
<span class="token punctuation">]</span>


<span class="token comment">## 测试函数</span>
<span class="token keyword">def</span> <span class="token function">run_test</span><span class="token punctuation">(</span>setup<span class="token punctuation">,</span> test<span class="token punctuation">,</span> iterations_per_test<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> tests_to_run<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    :param setup: 数据加载函数
    :param test: 数据测试函数
    :param iterations_per_test: 测试次数
    :param tests_to_run: 每轮测试调用函数多少次
    :return: execution_time单次函数推理时间，fps每秒处理次数
    &quot;&quot;&quot;</span>
    fastest_execution <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span>timeit<span class="token punctuation">.</span>Timer<span class="token punctuation">(</span>test<span class="token punctuation">,</span> setup<span class="token operator">=</span>setup<span class="token punctuation">)</span><span class="token punctuation">.</span>repeat<span class="token punctuation">(</span>tests_to_run<span class="token punctuation">,</span> iterations_per_test<span class="token punctuation">)</span><span class="token punctuation">)</span>
    execution_time <span class="token operator">=</span> fastest_execution <span class="token operator">/</span> iterations_per_test
    fps <span class="token operator">=</span> <span class="token number">1.0</span> <span class="token operator">/</span> execution_time
    <span class="token keyword">return</span> execution_time<span class="token punctuation">,</span> fps


<span class="token comment">## 以下设置不同的测试函数代码</span>
<span class="token comment">## setup开头的是数据加载代码，test开头的是函数测试代码</span>
setup_locate_faces <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
import face_recognition

image = face_recognition.load_image_file(&quot;{}&quot;)
&quot;&quot;&quot;</span>

test_locate_faces <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
face_locations = face_recognition.face_locations(image)
&quot;&quot;&quot;</span>

setup_face_landmarks <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
import face_recognition

image = face_recognition.load_image_file(&quot;{}&quot;)
face_locations = face_recognition.face_locations(image)
&quot;&quot;&quot;</span>

test_face_landmarks <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
landmarks = face_recognition.face_landmarks(image, face_locations=face_locations)[0]
&quot;&quot;&quot;</span>

setup_encode_face <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
import face_recognition

image = face_recognition.load_image_file(&quot;{}&quot;)
face_locations = face_recognition.face_locations(image)
&quot;&quot;&quot;</span>

test_encode_face <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
encoding = face_recognition.face_encodings(image, known_face_locations=face_locations)[0]
&quot;&quot;&quot;</span>

setup_end_to_end <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
import face_recognition

image = face_recognition.load_image_file(&quot;{}&quot;)
&quot;&quot;&quot;</span>

test_end_to_end <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
encoding = face_recognition.face_encodings(image)[0]
&quot;&quot;&quot;</span>

<span class="token comment">## 所有的基准测试都只使用一个CPU核心</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Benchmarks (Note: All benchmarks are only using a single CPU core)&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> image <span class="token keyword">in</span> TEST_IMAGES<span class="token punctuation">:</span>
    size <span class="token operator">=</span> image<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Timings at {}:&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 测试人脸检测</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot; - Face locations: {:.4f}s ({:.2f} fps)&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
        <span class="token operator">*</span>run_test<span class="token punctuation">(</span>setup_locate_faces<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">,</span> test_locate_faces<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot; - Face landmarks: {:.4f}s ({:.2f} fps)&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
        <span class="token operator">*</span>run_test<span class="token punctuation">(</span>setup_face_landmarks<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">,</span> test_face_landmarks<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot; - Encode face (inc. landmarks): {:.4f}s ({:.2f} fps)&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
        <span class="token operator">*</span>run_test<span class="token punctuation">(</span>setup_encode_face<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">,</span> test_encode_face<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot; - End-to-end: {:.4f}s ({:.2f} fps)&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token operator">*</span>run_test<span class="token punctuation">(</span>setup_end_to_end<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">,</span> test_end_to_end<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Benchmarks (Note: All benchmarks are only using a single CPU core)

Timings at 240p:
 - Face locations: 0.0819s (12.21 fps)
 - Face landmarks: 0.0029s (344.69 fps)
 - Encode face (inc. landmarks): 0.4879s (2.05 fps)
 - End-to-end: 0.5978s (1.67 fps)

Timings at 480p:
 - Face locations: 0.3257s (3.07 fps)
 - Face landmarks: 0.0028s (362.23 fps)
 - Encode face (inc. landmarks): 0.4959s (2.02 fps)
 - End-to-end: 0.8203s (1.22 fps)

Timings at 720p:
 - Face locations: 0.7046s (1.42 fps)
 - Face landmarks: 0.0028s (355.30 fps)
 - Encode face (inc. landmarks): 0.4993s (2.00 fps)
 - End-to-end: 1.1888s (0.84 fps)

Timings at 1080p:
 - Face locations: 1.5179s (0.66 fps)
 - Face landmarks: 0.0030s (334.93 fps)
 - Encode face (inc. landmarks): 0.4838s (2.07 fps)
 - End-to-end: 1.9404s (0.52 fps)
</code></pre><h3 id="_4-6-多线程人脸识别" tabindex="-1"><a class="header-anchor" href="#_4-6-多线程人脸识别" aria-hidden="true">#</a> 4.6 多线程人脸识别</h3><p>来自facerec_from_webcam_multiprocessing.py</p><p>该部分代码实现多线程读取视频进行人脸识别，很简单但是实际不这样写，看看代码就好。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import face_recognition
import cv2
from multiprocessing import Process, Manager, cpu_count, set_start_method
import time
import numpy
import threading
import platform


## 多线程运行人脸识别
## 获取下一个线程的id
def next_id(current_id, worker_num):
    if current_id == worker_num:
        return 1
    else:
        return current_id + 1


## 获取上一个线程的id
def prev_id(current_id, worker_num):
    if current_id == 1:
        return worker_num
    else:
        return current_id - 1


## 读图线程
def capture(read_frame_list, Global, worker_num):
    ## 读取视频
    video_capture = cv2.VideoCapture(&#39;./test_img/short_hamilton_clip.mp4&#39;)
    print(&quot;Width: %d, Height: %d, FPS: %d&quot; % (video_capture.get(3), video_capture.get(4), video_capture.get(5)))

    while not Global.is_exit:
        ## 判断是否该读图 确保当前缓存图像的线程和下一个处理图像的线程不是一个线程，以确保在处理线程开始前缓存图像
        if Global.buff_num != next_id(Global.read_num, worker_num):
            ## 读取一张图像
            ret, frame = video_capture.read()
            read_frame_list[Global.buff_num] = frame ## 保存对应图像处理线程要处理的图像
            Global.buff_num = next_id(Global.buff_num, worker_num) ## 下一个要缓存图像的图像处理线程
        else:
            time.sleep(0.01)

    ## 释放视频
    video_capture.release()


## 图片处理线程
def process(worker_id, read_frame_list, write_frame_list, Global, worker_num):
    known_face_encodings = Global.known_face_encodings
    known_face_names = Global.known_face_names
    while not Global.is_exit:

        ## 等待读取图片 当线程是需要处理图像的线程时开始处理图像，同时要确保图像已经缓存
        while Global.read_num != worker_id or Global.read_num != prev_id(Global.buff_num, worker_num):
            ## 判断是否退出
            if Global.is_exit:
                break

            time.sleep(0.01)

        ## 延迟读取保证计算量
        time.sleep(Global.frame_delay)

        ## 读取一张图像
        frame_process = read_frame_list[worker_id]

        ## 设置下一个读取视频的线程
        Global.read_num = next_id(Global.read_num, worker_num)

        ## 交换通道
        rgb_frame = frame_process[:, :, ::-1]

        ## 人脸识别
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        ## 人脸绘图
        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            ## 是否和已知人脸匹配
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)

            name = &quot;Unknown&quot;

            ## 如果有匹配人脸，就替换为匹配到人脸的名字
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_names[first_match_index]

            ## 绘制边界框
            cv2.rectangle(frame_process, (left, top), (right, bottom), (0, 0, 255), 2)

            ## 绘制人脸标签
            cv2.rectangle(frame_process, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame_process, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        ## 当前线程是否允许保存图像
        while Global.write_num != worker_id:
            time.sleep(0.01)

        ## 保存结果
        write_frame_list[worker_id] = frame_process

        ## 下一个保存图像的图像处理线程
        Global.write_num = next_id(Global.write_num, worker_num)


if __name__ == &#39;__main__&#39;:

    ## Macos设置
    if platform.system() == &#39;Darwin&#39;:
        set_start_method(&#39;forkserver&#39;)

    ## 全局变量
    Global = Manager().Namespace()
    Global.buff_num = 1 ## 正在缓存图像的图像处理线程
    Global.read_num = 1 ## 正在处理图像的图像线程
    Global.write_num = 1 ## 正在保存结果的图像处理线程
    Global.frame_delay = 0 ## 延迟时间
    Global.is_exit = False ## 是否退出
    read_frame_list = Manager().dict()
    write_frame_list = Manager().dict()

    ## 处理线程数
    if cpu_count() &gt; 2:
        ## 减1是为了留出一个线程读取视频
        worker_num = cpu_count() - 1
    else:
        worker_num = 2

    ## 子线程列表
    p = []

    ## 创建一个线程来捕获帧（如果使用子线程，它将在Mac上崩溃）
    ## 线程0为读图线程
    p.append(threading.Thread(target=capture, args=(read_frame_list, Global, worker_num,)))
    p[0].start()

    ## 读取已有图像
    obama_image = face_recognition.load_image_file(&quot;./test_img/obama.jpg&quot;)
    obama_face_encoding = face_recognition.face_encodings(obama_image)[0]
    biden_image = face_recognition.load_image_file(&quot;./test_img/lin-manuel-miranda.png&quot;)
    biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

    ## 创建已有数据信息
    Global.known_face_encodings = [
        obama_face_encoding,
        biden_face_encoding
    ]
    Global.known_face_names = [
        &quot;Barack Obama&quot;,
        &quot;lin-manuel-miranda.&quot;
    ]

    ## 创建图像处理子线程
    for worker_id in range(1, worker_num + 1):
        p.append(Process(target=process, args=(worker_id, read_frame_list, write_frame_list, Global, worker_num,)))
        p[worker_id].start()

    ## 开始读取视频
    last_num = 1 ## 已经处理好的图像序列号
    fps_list = []
    tmp_time = time.time()
    while not Global.is_exit:
        while Global.write_num != last_num:
            last_num = int(Global.write_num)

            ## 计算FPS
            delay = time.time() - tmp_time
            tmp_time = time.time()
            fps_list.append(delay)
            if len(fps_list) &gt; 5 * worker_num:
                fps_list.pop(0)
            fps = len(fps_list) / numpy.sum(fps_list)
            print(&quot;fps: %.2f&quot; % fps)

            ## 根据延时动态调整检测性能
            if fps &lt; 6:
                Global.frame_delay = (1 / fps) * 0.75
            elif fps &lt; 20:
                Global.frame_delay = (1 / fps) * 0.5
            elif fps &lt; 30:
                Global.frame_delay = (1 / fps) * 0.25
            else:
                Global.frame_delay = 0

            ## 展示结果
            cv2.imshow(&#39;Video&#39;, write_frame_list[prev_id(Global.write_num, worker_num)])

        ## 退出
        if cv2.waitKey(1) &amp; 0xFF == ord(&#39;q&#39;):
            Global.is_exit = True
            break

        time.sleep(0.01)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2><h3 id="_5-1-代码" tabindex="-1"><a class="header-anchor" href="#_5-1-代码" aria-hidden="true">#</a> 5.1 代码</h3>`,100),w={href:"https://github.com/ageitgey/face_recognition",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/davisking/dlib",target:"_blank",rel:"noopener noreferrer"},x={href:"https://face-recognition.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"},E=n("h3",{id:"_5-2-文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-2-文档","aria-hidden":"true"},"#"),s(" 5.2 文档")],-1),P={href:"https://github.com/ageitgey/face_recognition/blob/master/README_Simplified_Chinese.md",target:"_blank",rel:"noopener noreferrer"},N={href:"https://blog.csdn.net/LuohenYJ/article/details/116069422",target:"_blank",rel:"noopener noreferrer"},j={href:"https://www.cnblogs.com/xiaoyh/p/11874270.html",target:"_blank",rel:"noopener noreferrer"};function S(F,I){const a=p("ExternalLinkIcon");return o(),i("div",null,[u,n("p",null,[s("face_recognition号称是世界上最简单的开源人脸识别库，可以通过Python或命令行识别和操作人脸。face_recognition提供了十分完整的技术文档和应用实例，人脸识别初学者建议研究该库上手。face_recognition的官方代码仓库为："),n("a",r,[s("face_recognition"),t(a)]),s("。face_recognition也有自己的官方中文文档，该文档详情见："),n("a",d,[s("face_recognition中文使用说明"),t(a)]),s("。")]),n("p",null,[s("本文所有的代码和大部分测试图像来自于face_recognition官方代码仓库的examples文件夹。实际使用建议看看官方文档的函数接口说明"),n("a",k,[s("face_recognition函数接口"),t(a)]),s("。")]),n("p",null,[s("face_recognition中的人脸识别模型来自开源的机器学习库Dlib，Dlib的官方代码仓库见："),n("a",m,[s("dlib"),t(a)]),s("。大部分模型用Labeled Faces in the Wild人脸数据集进行测试，有高达99.38%的准确率。但对小孩和亚洲人脸的识别准确率尚待提升。Labeled Faces in the Wild是美国麻省大学安姆斯特分校（University of Massachusetts Amherst)制作的人脸数据集，该数据集包含了从网络收集的13,000多张面部图像。该数据集算是一个非常小型的人脸数据集。")]),v,b,n("p",null,[s("github: "),n("a",_,[s("Python-Study-Notes"),t(a)])]),g,f,n("p",null,[s("face_recognition支持linux，mac和windows系统，推荐linux系统使用face_recognition。安装face_recognition库之前需要安装dlib的python库。dlib的python库具体安装说明见："),n("a",h,[s("[常用工具] dlib编译调用指南"),t(a)]),s("中的第四节。注意windows下的dlib库安装不那么容易，多查查文档。")]),y,n("ul",null,[n("li",null,[n("a",w,[s("face_recognition"),t(a)])]),n("li",null,[n("a",q,[s("dlib"),t(a)])]),n("li",null,[n("a",x,[s("face_recognition函数接口"),t(a)])])]),E,n("ul",null,[n("li",null,[n("a",P,[s("face_recognition中文使用说明"),t(a)])]),n("li",null,[n("a",N,[s("[常用工具] dlib编译调用指南"),t(a)])]),n("li",null,[n("a",j,[s("人脸检测和人脸识别原理"),t(a)])])])])}const T=e(l,[["render",S],["__file","2022-02-26-_深度学习_ Python人脸识别库face_recognition使用教程.html.vue"]]);export{T as default};
