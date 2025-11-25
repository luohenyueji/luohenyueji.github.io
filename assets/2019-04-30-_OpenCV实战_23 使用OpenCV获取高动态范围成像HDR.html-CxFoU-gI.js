import{_ as t,c as n,a,o}from"./app-CJwJJlha.js";const r={};function i(p,e){return o(),n("div",null,e[0]||(e[0]=[a(`<h1 id="opencv实战-23-使用opencv获取高动态范围成像hdr" tabindex="-1"><a class="header-anchor" href="#opencv实战-23-使用opencv获取高动态范围成像hdr"><span>[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR</span></a></h1><p>在本教程中，我们将学习如何使用不同曝光设置拍摄的多张图像创建高动态范围图像（HDR）。</p><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span><strong>1</strong> <strong>背景</strong></span></a></h2><h3 id="_1-1-什么是高动态范围-hdr-成像" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是高动态范围-hdr-成像"><span><strong>1.1</strong> <strong>什么是高动态范围（HDR</strong> <strong>）成像？</strong></span></a></h3><p>大多数数码相机和显示器将彩色图像捕获或显示为24位矩阵。每个颜色通道有8位，一共三个通道，因此每个通道的像素值在0到255之间。换句话说，普通相机或显示器具有有限的动态范围。</p><p>然而，我们周围的世界颜色有一个非常大的变化范围。当灯关闭时，车库会变黑；太阳照射下，车库看起来变得非常明亮。即使不考虑这些极端情况，在日常情况下，8位也几乎不足以捕捉场景。因此，相机会尝试估计光线并自动设置曝光，以使图像中最有用的部分具有良好的动态颜色范围，而太暗和太亮的部分分别被设置为0和255。</p><p>在下图中，左侧的图像是正常曝光的图像。请注意，背景中的天空已完全消失，因为相机决定使用一个能够让小孩被正确拍摄而明亮的天空被忽略的设置。右侧图像是iPhone生成的HDR图像。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163546578.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>iPhone如何捕获HDR图像？它实际上在三种不同的曝光下拍摄3张图像。图像是连续快速拍摄的，因此三次拍摄之间几乎没有偏移。然后组合三个图像以产生HDR图像。</p><h3 id="_1-2-高动态范围-hdr-成像如何工作" tabindex="-1"><a class="header-anchor" href="#_1-2-高动态范围-hdr-成像如何工作"><span><strong>1.2</strong> <strong>高动态范围（HDR</strong> <strong>）成像如何工作？</strong></span></a></h3><p>在本节中，我们将介绍使用OpenCV创建HDR图像的步骤。</p><p>1)使用不同曝光设置拍摄多张图像</p><p>当我们使用相机拍照时，每个通道只有8位来表示场景的动态范围（亮度范围）。但是我们可以通过改变快门速度在不同曝光下拍摄场景的多个图像。大多数单反相机都有一个称为自动包围曝光（AEB）的功能，只需按一下按钮，我们就可以在不同曝光下拍摄多张照片。在相机上使用AEB或在手机上使用自动包围应用程序，我们可以一个接一个地快速拍摄多张照片，因此场景不会改变。当我们在iPhone中使用HDR模式时，它需要三张照片(安卓可以下载超级相机这个软件)。</p><p>1曝光不足的图像：此图片比正确的曝光图像暗。目标是拍摄非常明亮的图像部分。</p><p>2正确曝光的图像：这是相机根据估计的照明度拍摄的常规图像。</p><p>3过度曝光的图像：此图片比正确的曝光图像亮。目标是捕捉非常黑暗的图像部分。</p><p>但是，如果场景的动态范围非常大，我们可以拍摄三张以上的图片来构成HDR图像。在本教程中，我们将使用曝光时间为1/30,0.25,2.5和15秒拍摄的4张图像。缩略图如下所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163546592.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>有关SLR相机或手机使用的曝光时间和其他设置的信息通常存储在JPEG文件的EXIF元数据中。通过以下链接可学习查看存储在Windows和Mac中的JPEG文件中的EXIF元数据。</p><p><a href="https://www.howtogeek.com/289712/how-to-see-an-images-exif-data-in-windows-and-macos" target="_blank" rel="noopener noreferrer"> https://www.howtogeek.com/289712/how-to-see-an-images-exif-data-in-windows-and-macos </a></p><p>windows下右键图片-属性-详细信息，有图像具体信息。如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163547392.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>或者，您可以使用我最喜欢的名为EXIFTOOL的EXIF命令行实用程序。</p><p>EXIF: <a href="https://www.sno.phy.queensu.ca/~phil/exiftool/" target="_blank" rel="noopener noreferrer"> https://www.sno.phy.queensu.ca/~phil/exiftool/ </a></p><h2 id="_2-代码" tabindex="-1"><a class="header-anchor" href="#_2-代码"><span><strong>2</strong> <strong>代码</strong></span></a></h2><h3 id="_2-1-运行环境配置" tabindex="-1"><a class="header-anchor" href="#_2-1-运行环境配置"><span><strong>2.1</strong> <strong>运行环境配置</strong></span></a></h3><p>由于本文所用代码涉及到opencv非免费代码，createTonemapMantiuk这部分算法都是申请专利需要收费（本文可以不要这段代码）。在使用时编译opencv和opencv_contrib需要选择OPENCV_ENABLE_NONFREE。具体见：</p><p><a href="https://www.cnblogs.com/gengyi/p/10499964.html" target="_blank" rel="noopener noreferrer"> https://www.cnblogs.com/gengyi/p/10499964.html</a></p><p>如果是python，直接安装指定版本opencv就行了：</p><p>pip install opencv-contrib-python==3.4.2.17</p><p>在使用非免费代码</p><p>头文件和命名空间如下：</p><pre><code>#include &lt;opencv2/xphoto.hpp&gt;

using namespace xphoto;
</code></pre><h3 id="_2-2-读取图像和曝光时间" tabindex="-1"><a class="header-anchor" href="#_2-2-读取图像和曝光时间"><span><strong>2.2</strong> <strong>读取图像和曝光时间</strong></span></a></h3><p>手动输入图像，曝光时间以及图像个数。</p><p>代码如下：<br> C++：</p><pre><code>/**
 * @brief 读图
 *
 * @param images
 * @param times
 */
void readImagesAndTimes(vector&lt;Mat&gt; &amp;images, vector&lt;float&gt; &amp;times)
{
	//图像个数
	int numImages = 3;
	//图像曝光时间
	static const float timesArray[] = { 1.0 / 25 ,1.0 / 17, 1.0 / 13 };
	times.assign(timesArray, timesArray + numImages);

	static const char* filenames[] = { &quot;1_25.jpg&quot;, &quot;1_17.jpg&quot;, &quot;1_13.jpg&quot;};
	//读取图像
	for (int i = 0; i &lt; numImages; i++)
	{
		Mat im = imread(filenames[i]);
		images.push_back(im);
	}
}
</code></pre><p>python：</p><pre><code>def readImagesAndTimes():
  # List of exposure times
  times = np.array([ 1/30.0, 0.25, 2.5, 15.0 ], dtype=np.float32)
   
  # List of image filenames
  filenames = [&quot;img_0.033.jpg&quot;, &quot;img_0.25.jpg&quot;, &quot;img_2.5.jpg&quot;, &quot;img_15.jpg&quot;]
  images = []
  for filename in filenames:
    im = cv2.imread(filename)
    images.append(im)
   
  return images, times
</code></pre><h3 id="_2-3-图像对齐" tabindex="-1"><a class="header-anchor" href="#_2-3-图像对齐"><span><strong>2.3</strong> <strong>图像对齐</strong></span></a></h3><p>用于合成HDR图像的原始图像未对准可能导致严重的伪影。在下图中，左侧图像是使用未对齐图像组成的HDR图像，右侧图像是使用对齐图像的图像。通过放大图像的一部分，使用红色圆圈显示，我们在左图像中看到严重的重影瑕疵。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548542.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然，在拍摄用于创建HDR图像的照片时，专业摄影师将相机安装在三脚架上。他们还使用一种称为反光镜锁死的功能来减少额外的振动。即使这样，图像也可能无法完美对齐，因为无法保证无振动的环境。使用手持相机或手机拍摄图像时，对齐问题会变得更糟。</p><p>幸运的是，OpenCV 提供了一种简单的方法，使用AlignMTB对齐这些图像。该算法将所有图像转换为中值阈值位图median threshold bitmaps（MTB）。图像的MTB生成方式为将比中值亮度亮的点分配为1，其余为0。MTB不随曝光时间的改变而改变。因此不需要我们指定曝光时间就可以对齐MTB。</p><p>代码如下：</p><p>C++：</p><pre><code>// Align input images
Ptr&lt;AlignMTB&gt; alignMTB = createAlignMTB();
alignMTB-&gt;process(images, images);
</code></pre><p>python：</p><pre><code># Align input images
alignMTB = cv2.createAlignMTB()
alignMTB.process(images, images)
</code></pre><h3 id="_2-4-恢复相机响应功能" tabindex="-1"><a class="header-anchor" href="#_2-4-恢复相机响应功能"><span><strong>2.4</strong> <strong>恢复相机响应功能</strong></span></a></h3><p>典型相机的响应与场景亮度不是线性的。那是什么意思？假设，一个摄像机拍摄了两个物体，其中一个物体的亮度是现实世界中的两倍。当您测量照片中两个对象的像素强度时，较亮对象的像素值将不会是较暗对象的两倍。在不估计相机响应函数（CRF）的情况下，我们将无法将图像合并为一个HDR图像。将多个曝光图像合并为HDR图像意味着什么？</p><p>在图像的某个位置（x，y）仅考虑一个像素。如果CRF是线性的，则像素值将与曝光时间成正比，除非像素在特定图像中太暗（即接近0）或太亮（即接近255）。我们可以过滤出这些不好的像素（太暗或太亮），并且将像素值除以曝光时间来估计像素的亮度，然后在像素不差的所有图像（太暗或太亮）上对亮度值取平均。我们可以对所有像素进行这样的处理，并通过对“好”像素进行平均来获得所有像素的单张图像。但是CRF不是线性的，我们需要在评估CRF前把图像强度变成线性。</p><p>好消息是，如果我们知道每张图像的曝光时间，可以从图像中估算CRF。与计算机视觉中的许多问题一样，找到CRF的问题被设置为优化问题，其中目标是最小化由数据项和平滑项组成的目标函数。这些问题通常会减少到使用奇异值分解（SVD）求解的线性最小二乘问题，而奇异值分解是所有线性代数包的一部分。CRF恢复算法细节见论文Recovering High Dynamic Range Radiance Maps from Photographs。 <a href="http://www.pauldebevec.com/Research/HDR/debevec-siggraph97.pdf" target="_blank" rel="noopener noreferrer"> http://www.pauldebevec.com/Research/HDR/debevec-siggraph97.pdf </a></p><p>使用CalibrateDebevec或在OpenCV中仅使用两行代码来查找CRF CalibrateRobertson。在本教程中我们将使用CalibrateDebevec。</p><p>代码如下：</p><p>C++：</p><pre><code>// Obtain Camera Response Function (CRF)
Mat responseDebevec;
Ptr&lt;CalibrateDebevec&gt; calibrateDebevec = createCalibrateDebevec();
calibrateDebevec-&gt;process(images, responseDebevec, times);
</code></pre><p>python：</p><pre><code># Obtain Camera Response Function (CRF)
calibrateDebevec = cv2.createCalibrateDebevec()
responseDebevec = calibrateDebevec.process(images, times)
</code></pre><p>下图显示了使用红色，绿色和蓝色通道图像恢复的CRF。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163547960.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-5-合并图像" tabindex="-1"><a class="header-anchor" href="#_2-5-合并图像"><span><strong>2.5</strong> <strong>合并图像</strong></span></a></h3><p>一旦估计了CRF，我们就可以将曝光图像合并为一个HDR图像MergeDebevec。C ++和Python代码如下所示。</p><p>C++:</p><pre><code>// Merge images into an HDR linear image
Mat hdrDebevec;
Ptr&lt;MergeDebevec&gt; mergeDebevec = createMergeDebevec();
mergeDebevec-&gt;process(images, hdrDebevec, times, responseDebevec);
// Save HDR image.
imwrite(&quot;hdrDebevec.hdr&quot;, hdrDebevec);
</code></pre><p>Python:</p><pre><code># Merge images into an HDR linear image
mergeDebevec = cv2.createMergeDebevec()
hdrDebevec = mergeDebevec.process(images, times, responseDebevec)
# Save HDR image.
cv2.imwrite(&quot;hdrDebevec.hdr&quot;, hdrDebevec)
</code></pre><p>上面保存的HDR图像可以在Photoshop中加载并进行色调映射。一个例子如下所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548722.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-6-色调映射" tabindex="-1"><a class="header-anchor" href="#_2-6-色调映射"><span><strong>2.6</strong> <strong>色调映射</strong></span></a></h3><p>现在我们将曝光图像合并为一个HDR图像。你能猜出这张图片的最小和最大像素值吗？对于漆黑条件，最小值显然为0。什么是理论最大值？无穷！实际上，不同情况下的最大值是不同的。如果场景包含非常明亮的光源，我们将看到非常大的最大值。尽管我们已经使用多个图像恢复了相对亮度信息，但我们现在面临的挑战是将此信息保存为24位图像以用于显示。</p><p>色调映射：将高动态范围（HDR）图像转换为每通道8位图像同时保留尽可能多的细节的过程称为色调映射。</p><p>有几种色调映射算法。OpenCV实现了其中的四个。要记住的是，没有正确的方法来进行色调映射。通常，我们希望在色调映射图像中看到比在任何一个曝光图像中更多的细节。有时，色调映射的目标是产生逼真的图像，并且通常目标是产生超现实的图像。在OpenCV中实现的算法倾向于产生逼真的，因此不那么引人注目的结果。</p><p>我们来看看各种选项。下面列出了不同色调映射算法的一些常见参数。</p><p>1）伽马gamma：此参数通过应用伽马校正来压缩动态范围。当gamma等于1时，不应用校正。小于1的灰度会使图像变暗，而大于1的灰度会使图像变亮。</p><p>2）饱和度saturation：此参数用于增加或减少饱和度。当饱和度高时，颜色更丰富，更强烈。饱和度值接近零，使颜色渐渐变为灰度。</p><p>3）对比度contrast：控制输出图像的对比度（即log（maxPixelValue / minPixelValue））。</p><p>让我们来探索OpenCV中可用的四种色调映射算法</p><p>(1) Drago Tonemap</p><p>Drago Tonemap的参数如下所示：</p><pre><code>createTonemapDrago

(

float   gamma = 1.0f,

float   saturation = 1.0f,

float   bias = 0.85f

)
</code></pre><p>这里，bias是[0,1]范围内偏置函数的值。从0.7到0.9的值通常会得到最好的结果。默认值为0.85。有关更多技术细节，请参阅此文章。参数通过反复试验获得。最终输出乘以3只是因为它给出了最令人满意的结果。更多的技术细节见：</p><p><a href="http://resources.mpi-inf.mpg.de/tmo/logmap/logmap.pdf" target="_blank" rel="noopener noreferrer"> http://resources.mpi-inf.mpg.de/tmo/logmap/logmap.pdf </a></p><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548711.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>(2) Durand Tonemap</p><p>Durand Tonemap的参数如下所示：</p><pre><code>createTonemapDurand

(  

  float     gamma = 1.0f,

  float     contrast = 4.0f,

  float     saturation = 1.0f,

  float     sigma_space = 2.0f,

  float     sigma_color = 2.0f

);
</code></pre><p>该算法基于将图像分解为基础层和细节层。使用称为双边滤波器的边缘保留滤波器获得基础层。sigma_space和sigma_color是双边滤波器的参数，分别控制空间域和颜色域中的平滑量。更多的技术细节见：</p><p><a href="https://people.csail.mit.edu/fredo/PUBLI/Siggraph2002/DurandBilateral.pdf" target="_blank" rel="noopener noreferrer"> https://people.csail.mit.edu/fredo/PUBLI/Siggraph2002/DurandBilateral.pdf</a></p><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548702.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>(3) Reinhard Tonemap</p><p>Reinhard Tonemap的参数如下所示：</p><pre><code>createTonemapReinhard

(

float   gamma = 1.0f,

float   intensity = 0.0f,

float   light_adapt = 1.0f,

float   color_adapt = 0.0f

)
</code></pre><p>参数intensity应在[-8,8]范围内。强度值越大，结果越明亮。参数light_adapt控制灯光适应并且在[0,1]范围内。值1表示仅基于像素值的自适应，值0表示全局自适应。中间值可以用于两者的加权组合。参数color_adapt控制色度适应并且在[0,1]范围内。如果值设置为1，则独立处理通道，如果值设置为0，则每个通道的适应级别相同。中间值可用于两者的加权组合。更多的技术细节见：</p><p><a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.106.8100&amp;rep=rep1&amp;type=pdf" target="_blank" rel="noopener noreferrer"> http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.106.8100&amp;rep=rep1&amp;type=pdf </a></p><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548689.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>(4) Mantiuk Tonemap</p><p>Mantiuk Tonemap的参数如下所示：</p><pre><code>createTonemapMantiuk

(  

float   gamma = 1.0f,

float   scale = 0.7f,

float   saturation = 1.0f

)
</code></pre><p>scale是对比度比例因子。从0.6到0.9的值产生最佳结果。更多的技术细节见：</p><p><a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.4077&amp;rep=rep1&amp;type=pdf" target="_blank" rel="noopener noreferrer">http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.4077&amp;rep=rep1&amp;type=pdf</a></p><p>结果如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR/20190430163548645.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上面所有色调映射代码见：</p><p>C++:</p><pre><code>	// Tonemap using Drago&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Drago&#39;s method ... &quot;;
	Mat ldrDrago;
	Ptr&lt;TonemapDrago&gt; tonemapDrago = createTonemapDrago(1.0, 0.7);
	tonemapDrago-&gt;process(hdrDebevec, ldrDrago);
	ldrDrago = 3 * ldrDrago;
	imwrite(&quot;ldr-Drago.jpg&quot;, ldrDrago * 255);
	cout &lt;&lt; &quot;saved ldr-Drago.jpg&quot; &lt;&lt; endl;

	// Tonemap using Durand&#39;s method obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Durand&#39;s method ... &quot;;
	Mat ldrDurand;
	Ptr&lt;TonemapDurand&gt; tonemapDurand = createTonemapDurand(1.5, 4, 1.0, 1, 1);
	tonemapDurand-&gt;process(hdrDebevec, ldrDurand);
	ldrDurand = 3 * ldrDurand;
	imwrite(&quot;ldr-Durand.jpg&quot;, ldrDurand * 255);
	cout &lt;&lt; &quot;saved ldr-Durand.jpg&quot; &lt;&lt; endl;

	// Tonemap using Reinhard&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Reinhard&#39;s method ... &quot;;
	Mat ldrReinhard;
	Ptr&lt;TonemapReinhard&gt; tonemapReinhard = createTonemapReinhard(1.5, 0, 0, 0);
	tonemapReinhard-&gt;process(hdrDebevec, ldrReinhard);
	imwrite(&quot;ldr-Reinhard.jpg&quot;, ldrReinhard * 255);
	cout &lt;&lt; &quot;saved ldr-Reinhard.jpg&quot; &lt;&lt; endl;

	// Tonemap using Mantiuk&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Mantiuk&#39;s method ... &quot;;
	Mat ldrMantiuk;
	Ptr&lt;TonemapMantiuk&gt; tonemapMantiuk = createTonemapMantiuk(2.2, 0.85, 1.2);
	tonemapMantiuk-&gt;process(hdrDebevec, ldrMantiuk);
	ldrMantiuk = 3 * ldrMantiuk;
	imwrite(&quot;ldr-Mantiuk.jpg&quot;, ldrMantiuk * 255);
	cout &lt;&lt; &quot;saved ldr-Mantiuk.jpg&quot; &lt;&lt; endl;
</code></pre><p>Python:</p><pre><code>  # Tonemap using Drago&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Drago&#39;s method ... &quot;)
  tonemapDrago = cv2.createTonemapDrago(1.0, 0.7)
  ldrDrago = tonemapDrago.process(hdrDebevec)
  ldrDrago = 3 * ldrDrago
  cv2.imwrite(&quot;ldr-Drago.jpg&quot;, ldrDrago * 255)
  print(&quot;saved ldr-Drago.jpg&quot;)
  
  # Tonemap using Durand&#39;s method obtain 24-bit color image
  print(&quot;Tonemaping using Durand&#39;s method ... &quot;)
  tonemapDurand = cv2.createTonemapDurand(1.5,4,1.0,1,1)
  ldrDurand = tonemapDurand.process(hdrDebevec)
  ldrDurand = 3 * ldrDurand
  cv2.imwrite(&quot;ldr-Durand.jpg&quot;, ldrDurand * 255)
  print(&quot;saved ldr-Durand.jpg&quot;)
  
  # Tonemap using Reinhard&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Reinhard&#39;s method ... &quot;)
  tonemapReinhard = cv2.createTonemapReinhard(1.5, 0,0,0)
  ldrReinhard = tonemapReinhard.process(hdrDebevec)
  cv2.imwrite(&quot;ldr-Reinhard.jpg&quot;, ldrReinhard * 255)
  print(&quot;saved ldr-Reinhard.jpg&quot;)
  
  # Tonemap using Mantiuk&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Mantiuk&#39;s method ... &quot;)
  tonemapMantiuk = cv2.createTonemapMantiuk(2.2,0.85, 1.2)
  ldrMantiuk = tonemapMantiuk.process(hdrDebevec)
  ldrMantiuk = 3 * ldrMantiuk
  cv2.imwrite(&quot;ldr-Mantiuk.jpg&quot;, ldrMantiuk * 255)
  print(&quot;saved ldr-Mantiuk.jpg&quot;)
</code></pre><h3 id="_2-7-工程代码" tabindex="-1"><a class="header-anchor" href="#_2-7-工程代码"><span><strong>2.7</strong> <strong>工程代码</strong></span></a></h3><p>本文所有代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/xphoto.hpp&gt;
#include &lt;vector&gt;
#include &lt;iostream&gt;
#include &lt;fstream&gt;
using namespace cv;
using namespace std;
using namespace xphoto;

/**
 * @brief 读图
 *
 * @param images
 * @param times
 */
void readImagesAndTimes(vector&lt;Mat&gt; &amp;images, vector&lt;float&gt; &amp;times)
{
	//图像个数
	int numImages = 3;
	//图像曝光时间
	static const float timesArray[] = { 1.0 / 25 ,1.0 / 17, 1.0 / 13 };
	times.assign(timesArray, timesArray + numImages);

	static const char* filenames[] = { &quot;1_25.jpg&quot;, &quot;1_17.jpg&quot;, &quot;1_13.jpg&quot;};
	//读取图像
	for (int i = 0; i &lt; numImages; i++)
	{
		Mat im = imread(filenames[i]);
		images.push_back(im);
	}
}

int main()
{
	// Read images and exposure times 读取图像和图像曝光时间
	cout &lt;&lt; &quot;Reading images ... &quot; &lt;&lt; endl;
	//图像
	vector&lt;Mat&gt; images;
	//曝光时间
	vector&lt;float&gt; times;
	//读取图像和图像曝光时间
	readImagesAndTimes(images, times);

	// Align input images 图像对齐
	cout &lt;&lt; &quot;Aligning images ... &quot; &lt;&lt; endl;
	Ptr&lt;AlignMTB&gt; alignMTB = createAlignMTB();
	alignMTB-&gt;process(images, images);

	// Obtain Camera Response Function (CRF) 获得CRF
	cout &lt;&lt; &quot;Calculating Camera Response Function (CRF) ... &quot; &lt;&lt; endl;
	Mat responseDebevec;
	Ptr&lt;CalibrateDebevec&gt; calibrateDebevec = createCalibrateDebevec();
	calibrateDebevec-&gt;process(images, responseDebevec, times);

	// Merge images into an HDR linear image 图像合并为HDR图像
	cout &lt;&lt; &quot;Merging images into one HDR image ... &quot;;
	Mat hdrDebevec;
	Ptr&lt;MergeDebevec&gt; mergeDebevec = createMergeDebevec();
	mergeDebevec-&gt;process(images, hdrDebevec, times, responseDebevec);
	// Save HDR image. 保存HDR图像
	imwrite(&quot;hdrDebevec.hdr&quot;, hdrDebevec);
	cout &lt;&lt; &quot;saved hdrDebevec.hdr &quot; &lt;&lt; endl;

	// Tonemap using Drago&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Drago&#39;s method ... &quot;;
	Mat ldrDrago;
	Ptr&lt;TonemapDrago&gt; tonemapDrago = createTonemapDrago(1.0, 0.7);
	tonemapDrago-&gt;process(hdrDebevec, ldrDrago);
	ldrDrago = 3 * ldrDrago;
	imwrite(&quot;ldr-Drago.jpg&quot;, ldrDrago * 255);
	cout &lt;&lt; &quot;saved ldr-Drago.jpg&quot; &lt;&lt; endl;

	// Tonemap using Durand&#39;s method obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Durand&#39;s method ... &quot;;
	Mat ldrDurand;
	Ptr&lt;TonemapDurand&gt; tonemapDurand = createTonemapDurand(1.5, 4, 1.0, 1, 1);
	tonemapDurand-&gt;process(hdrDebevec, ldrDurand);
	ldrDurand = 3 * ldrDurand;
	imwrite(&quot;ldr-Durand.jpg&quot;, ldrDurand * 255);
	cout &lt;&lt; &quot;saved ldr-Durand.jpg&quot; &lt;&lt; endl;

	// Tonemap using Reinhard&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Reinhard&#39;s method ... &quot;;
	Mat ldrReinhard;
	Ptr&lt;TonemapReinhard&gt; tonemapReinhard = createTonemapReinhard(1.5, 0, 0, 0);
	tonemapReinhard-&gt;process(hdrDebevec, ldrReinhard);
	imwrite(&quot;ldr-Reinhard.jpg&quot;, ldrReinhard * 255);
	cout &lt;&lt; &quot;saved ldr-Reinhard.jpg&quot; &lt;&lt; endl;

	// Tonemap using Mantiuk&#39;s method to obtain 24-bit color image 色调映射算法
	cout &lt;&lt; &quot;Tonemaping using Mantiuk&#39;s method ... &quot;;
	Mat ldrMantiuk;
	Ptr&lt;TonemapMantiuk&gt; tonemapMantiuk = createTonemapMantiuk(2.2, 0.85, 1.2);
	tonemapMantiuk-&gt;process(hdrDebevec, ldrMantiuk);
	ldrMantiuk = 3 * ldrMantiuk;
	imwrite(&quot;ldr-Mantiuk.jpg&quot;, ldrMantiuk * 255);
	cout &lt;&lt; &quot;saved ldr-Mantiuk.jpg&quot; &lt;&lt; endl;

	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np


def readImagesAndTimes():
  
  times = np.array([ 1/30.0, 0.25, 2.5, 15.0 ], dtype=np.float32)
  
  filenames = [&quot;img_0.033.jpg&quot;, &quot;img_0.25.jpg&quot;, &quot;img_2.5.jpg&quot;, &quot;img_15.jpg&quot;]

  images = []
  for filename in filenames:
    im = cv2.imread(filename)
    images.append(im)
  
  return images, times

if __name__ == &#39;__main__&#39;:
  # Read images and exposure times
  print(&quot;Reading images ... &quot;)

  images, times = readImagesAndTimes()
  
  
  # Align input images
  print(&quot;Aligning images ... &quot;)
  alignMTB = cv2.createAlignMTB()
  alignMTB.process(images, images)
  
  # Obtain Camera Response Function (CRF)
  print(&quot;Calculating Camera Response Function (CRF) ... &quot;)
  calibrateDebevec = cv2.createCalibrateDebevec()
  responseDebevec = calibrateDebevec.process(images, times)
  
  # Merge images into an HDR linear image
  print(&quot;Merging images into one HDR image ... &quot;)
  mergeDebevec = cv2.createMergeDebevec()
  hdrDebevec = mergeDebevec.process(images, times, responseDebevec)
  # Save HDR image.
  cv2.imwrite(&quot;hdrDebevec.hdr&quot;, hdrDebevec)
  print(&quot;saved hdrDebevec.hdr &quot;)
  
  # Tonemap using Drago&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Drago&#39;s method ... &quot;)
  tonemapDrago = cv2.createTonemapDrago(1.0, 0.7)
  ldrDrago = tonemapDrago.process(hdrDebevec)
  ldrDrago = 3 * ldrDrago
  cv2.imwrite(&quot;ldr-Drago.jpg&quot;, ldrDrago * 255)
  print(&quot;saved ldr-Drago.jpg&quot;)
  
  # Tonemap using Durand&#39;s method obtain 24-bit color image
  print(&quot;Tonemaping using Durand&#39;s method ... &quot;)
  tonemapDurand = cv2.createTonemapDurand(1.5,4,1.0,1,1)
  ldrDurand = tonemapDurand.process(hdrDebevec)
  ldrDurand = 3 * ldrDurand
  cv2.imwrite(&quot;ldr-Durand.jpg&quot;, ldrDurand * 255)
  print(&quot;saved ldr-Durand.jpg&quot;)
  
  # Tonemap using Reinhard&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Reinhard&#39;s method ... &quot;)
  tonemapReinhard = cv2.createTonemapReinhard(1.5, 0,0,0)
  ldrReinhard = tonemapReinhard.process(hdrDebevec)
  cv2.imwrite(&quot;ldr-Reinhard.jpg&quot;, ldrReinhard * 255)
  print(&quot;saved ldr-Reinhard.jpg&quot;)
  
  # Tonemap using Mantiuk&#39;s method to obtain 24-bit color image
  print(&quot;Tonemaping using Mantiuk&#39;s method ... &quot;)
  tonemapMantiuk = cv2.createTonemapMantiuk(2.2,0.85, 1.2)
  ldrMantiuk = tonemapMantiuk.process(hdrDebevec)
  ldrMantiuk = 3 * ldrMantiuk
  cv2.imwrite(&quot;ldr-Mantiuk.jpg&quot;, ldrMantiuk * 255)
  print(&quot;saved ldr-Mantiuk.jpg&quot;)
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><p><a href="https://www.learnopencv.com/high-dynamic-range-hdr-imaging-using-opencv-cpp-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/high-dynamic-range-hdr-imaging-using-opencv-cpp-python/ </a></p></li><li><p><a href="https://www.imooc.com/article/36723" target="_blank" rel="noopener noreferrer"> https://www.imooc.com/article/36723 </a></p></li></ul>`,120)]))}const l=t(r,[["render",i],["__file","2019-04-30-_OpenCV实战_23 使用OpenCV获取高动态范围成像HDR.html.vue"]]),g=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-30-_OpenCV%E5%AE%9E%E6%88%98_23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR.html","title":"[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-30T16:44:58.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR 在本教程中，我们将学习如何使用不同曝光设置拍摄的多张图像创建高动态范围图像（HDR）。 1 背景 1.1 什么是高动态范围（HDR ）成像？ 大多数数码相机和显示器将彩色图像捕获或显示为24位矩阵。每个颜色通道有8位，一共三个通道，因此每个通道的像素值在0到255之间。换句话说，普通相...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-30-_OpenCV%E5%AE%9E%E6%88%98_23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR"}],["meta",{"property":"og:description","content":"[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR 在本教程中，我们将学习如何使用不同曝光设置拍摄的多张图像创建高动态范围图像（HDR）。 1 背景 1.1 什么是高动态范围（HDR ）成像？ 大多数数码相机和显示器将彩色图像捕获或显示为24位矩阵。每个颜色通道有8位，一共三个通道，因此每个通道的像素值在0到255之间。换句话说，普通相..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163546578.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-04-30T16:44:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163546578.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163546592.jpeg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163547392.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548542.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163547960.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548722.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548711.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548702.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548689.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D23%20%E4%BD%BF%E7%94%A8OpenCV%E8%8E%B7%E5%8F%96%E9%AB%98%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4%E6%88%90%E5%83%8FHDR/20190430163548645.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-04-30T16:44:58.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[{"level":3,"title":"1.1 什么是高动态范围（HDR ）成像？","slug":"_1-1-什么是高动态范围-hdr-成像","link":"#_1-1-什么是高动态范围-hdr-成像","children":[]},{"level":3,"title":"1.2 高动态范围（HDR ）成像如何工作？","slug":"_1-2-高动态范围-hdr-成像如何工作","link":"#_1-2-高动态范围-hdr-成像如何工作","children":[]}]},{"level":2,"title":"2 代码","slug":"_2-代码","link":"#_2-代码","children":[{"level":3,"title":"2.1 运行环境配置","slug":"_2-1-运行环境配置","link":"#_2-1-运行环境配置","children":[]},{"level":3,"title":"2.2 读取图像和曝光时间","slug":"_2-2-读取图像和曝光时间","link":"#_2-2-读取图像和曝光时间","children":[]},{"level":3,"title":"2.3 图像对齐","slug":"_2-3-图像对齐","link":"#_2-3-图像对齐","children":[]},{"level":3,"title":"2.4 恢复相机响应功能","slug":"_2-4-恢复相机响应功能","link":"#_2-4-恢复相机响应功能","children":[]},{"level":3,"title":"2.5 合并图像","slug":"_2-5-合并图像","link":"#_2-5-合并图像","children":[]},{"level":3,"title":"2.6 色调映射","slug":"_2-6-色调映射","link":"#_2-6-色调映射","children":[]},{"level":3,"title":"2.7 工程代码","slug":"_2-7-工程代码","link":"#_2-7-工程代码","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":16.46,"words":4937},"filePathRelative":"blog/opencv/opencv实战/2019-04-30-[OpenCV实战]23 使用OpenCV获取高动态范围成像HDR.md","localizedDate":"2019年5月1日","excerpt":"\\n<p>在本教程中，我们将学习如何使用不同曝光设置拍摄的多张图像创建高动态范围图像（HDR）。</p>\\n<h2><strong>1</strong> <strong>背景</strong></h2>\\n<h3><strong>1.1</strong> <strong>什么是高动态范围（HDR</strong> <strong>）成像？</strong></h3>\\n<p>大多数数码相机和显示器将彩色图像捕获或显示为24位矩阵。每个颜色通道有8位，一共三个通道，因此每个通道的像素值在0到255之间。换句话说，普通相机或显示器具有有限的动态范围。</p>\\n<p>然而，我们周围的世界颜色有一个非常大的变化范围。当灯关闭时，车库会变黑；太阳照射下，车库看起来变得非常明亮。即使不考虑这些极端情况，在日常情况下，8位也几乎不足以捕捉场景。因此，相机会尝试估计光线并自动设置曝光，以使图像中最有用的部分具有良好的动态颜色范围，而太暗和太亮的部分分别被设置为0和255。</p>","autoDesc":true}');export{l as comp,g as data};
