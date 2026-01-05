import{_ as t,c as n,a,o as i}from"./app-BOswGe5u.js";const o={};function r(s,e){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="opencv实战-22-使用eigenfaces进行人脸重建" tabindex="-1"><a class="header-anchor" href="#opencv实战-22-使用eigenfaces进行人脸重建"><span>[OpenCV实战]22 使用EigenFaces进行人脸重建</span></a></h1><p>在这篇文章中，我们将学习如何使用EigenFaces实现人脸重建。我们需要了解主成分分析（PCA）和EigenFaces。</p><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span><strong>1</strong> <strong>背景</strong></span></a></h2><h3 id="_1-1-什么是-eigenfaces" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是-eigenfaces"><span><strong>1.1</strong> <strong>什么是</strong> <strong>EigenFaces</strong> <strong>？</strong></span></a></h3><p>在我们之前的文章中，我们解释了Eigenfaces是可以添加到平均（平均）面部以创建新的面部图像的图像。我们可以用数学方式写这个，</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190424162700654.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中</p><p>F是一张新生成的脸部图像;</p><p>Fm是平均人脸图像;</p><p>Fi是一个EigenFace(特征脸);</p><p><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190423194122119.png" alt="https://img-blog.csdnimg.cn/20190423194122119.png" loading="lazy"> 是我们可以选择创建新图的标量系数权重，可正可负。</p><p>在我们之前的文章中，我们解释了如何计算EigenFaces，如何解释它们以及如何通过改变权重来创建新面孔。</p><p>现在假设，我们将获得一张新的面部照片，如下图所示。我们如何使用EigenFaces重建照片F？换句话说，我们如何找到在上面的等式中使用的权重将产生面部图像作为输出？这正是本文所涉及的问题，但在我们尝试这样做之前，我们需要一些线性代数背景。下图左侧是原始图像。左边的第二个图像是使用250个EigenFaces构建的，第三个图像使用1000个Eigenfaces，最右边的图像使用4000个Eigenfaces。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190424162700745.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_1-2-坐标的变化" tabindex="-1"><a class="header-anchor" href="#_1-2-坐标的变化"><span><strong>1.2</strong> <strong>坐标的变化</strong></span></a></h3><p>在一个三维坐标系中，坐标轴x，y，z由下图中黑色线条表示。您可以想象相对于原始的x，y，z帧，以（xo, yo,zo）点进行旋转和平移，获得另一组垂直轴。在图2中，我们以蓝色显示该旋转和平移坐标系的轴X&#39;Y&#39;Z’。在X，Y，Z坐标系的点（x，y，z）用红点表示。我们如何找到X&#39;Y&#39;Z&#39;坐标系中点（x&#39;，y&#39;，z&#39;）的坐标？这可以分两步完成。</p><p>转换：首先，我们可以以原坐标系点（x，y，z）通过减去新坐标系的原点（xo，yo，zo）来实现平移，所以我们有了一个新的向量（x-xo，y-yo，z-zo）。</p><p>投影：接下来，我们需要将（x-xo，y-yo，z-zo）投影到x&#39;，y&#39;，z&#39;上，它只是（x-xo，y-yo，z-zo）的点积，方向分别为x&#39;，y&#39;和z&#39;。下图中的绿线显示了红点到Z&#39;轴上的投影。让我们看看这种技术如何应用于人脸重建。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190424162700737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-面部重建" tabindex="-1"><a class="header-anchor" href="#_2-面部重建"><span><strong>2</strong> <strong>面部重建</strong></span></a></h2><h3 id="_2-1-计算新面部图像的-pca-权重" tabindex="-1"><a class="header-anchor" href="#_2-1-计算新面部图像的-pca-权重"><span><strong>2.1</strong> <strong>计算新面部图像的</strong> <strong>PCA</strong> <strong>权重</strong></span></a></h3><p>正如我们在上一篇文章中所看到的，为了计算面部数据的主要成分，我们将面部图像转换为长矢量。例如，如果我们有一组尺寸为100x100x3的对齐面部图像，则每个图像可以被认为是长度为100x100x3=30000的矢量。就像三个数字的元组（x，y，z）代表3D空间中的一个点一样，我们可以说长度为30,000的向量是30,000维空间中的一个点。这个高维空间的轴线就像维坐标轴xyz彼此垂直一样。主成分（特征向量）在这个高维空间中形成一个新的坐标系，新的原点是主成分分析向量平均值。</p><p>给定一个新图像，我们找到权重流程如下：</p><p>1）矢量化图像：我们首先从图像数据创建一个长矢量。这很简单，重新排列数据只需要一行或两行代码。</p><p>2）减去平均向量.</p><p>3）主成分映射：这可以通过计算每个主分量与平均向量的差的点积来实现。所给出的点积结果就是权重 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190424162700755.png" alt="" loading="lazy"> 。</p><p>4）组合向量：一旦计算了权重，我们可以简单地将每个权重乘以主成分并将它们加在一起。最后，我们需要将平均人脸向量添加到此总和中。</p><p>5）将矢量重置为人脸图像：作为上一步的结果，我们获得了一个30k长的矢量，并且可以将其重新整形为100 x 100 x 3图像。这是最终的图像。</p><p>在我们的示例中，100 x 100 x3图像具有30k尺寸。在对2000个图像进行PCA之后，我们可以获得2000维的空间，并且能够以合理的精度水平重建新面部。过去采用30k数字表示的内容现在仅使用2k个数字表示。换句话说，我们只是使用PCA来减少面部空间的尺寸。</p><h3 id="_2-2-使用-eigenfaces-进行面部重建" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-eigenfaces-进行面部重建"><span><strong>2.2</strong> <strong>使用</strong> <strong>EigenFaces</strong> <strong>进行面部重建</strong></span></a></h3><p>假设您已下载代码，我们将查看代码的重要部分。首先，在文件createPCAModel.cpp和createPCAModel.py中共享用于计算平均人脸和EigenFaces的代码。我们在上一篇文章中解释了该方法，因此我们将跳过该解释。相反，我们将讨论reconstructFace.cpp和reconstructFace.py。</p><p>代码如下：</p><p>C++:</p><pre><code>#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;stdlib.h&gt;
#include &lt;time.h&gt;

using namespace cv;
using namespace std;


// Matrices for average (mean) and eigenvectors
Mat averageFace;
Mat output;
vector&lt;Mat&gt; eigenFaces;
Mat imVector, meanVector, eigenVectors, im, display;

// Display result
// Left = Original Image
// Right = Reconstructed Face
void displayResult( Mat &amp;left, Mat &amp;right)
{
	hconcat(left,right, display); 	
	resize(display, display, Size(), 4, 4);
	imshow(&quot;Result&quot;, display);
}

// Recontruct face using mean face and EigenFaces
void reconstructFace(int sliderVal, void*)
{
	// Start with the mean / average face
	Mat output = averageFace.clone();
	for (int i = 0;  i &lt; sliderVal; i++)
	{
		// The weight is the dot product of the mean subtracted
		// image vector with the EigenVector
		double weight = imVector.dot(eigenVectors.row(i)); 

		// Add weighted EigenFace to the output
		output = output + eigenFaces[i] * weight; 
	}

	displayResult(im, output);
}
	

int main(int argc, char **argv)
{

	// Read model file
	string modelFile(&quot;pcaParams.yml&quot;);
	cout &lt;&lt; &quot;Reading model file &quot; &lt;&lt; modelFile &lt;&lt; &quot; ... &quot; ; 

	FileStorage file(modelFile, FileStorage::READ);
	
	// Extract mean vector
	meanVector = file[&quot;mean&quot;].mat();

	// Extract Eigen Vectors
	eigenVectors = file[&quot;eigenVectors&quot;].mat();

	// Extract size of the images used in training. 
	Mat szMat = file[&quot;size&quot;].mat();
	Size sz = Size(szMat.at&lt;double&gt;(1,0),szMat.at&lt;double&gt;(0,0));

	// Extract maximum number of EigenVectors. 
	// This is the max(numImagesUsedInTraining, w * h * 3)
	// where w = width, h = height of the training images. 
	int numEigenFaces = eigenVectors.size().height; 
	cout &lt;&lt;  &quot;DONE&quot; &lt;&lt; endl; 

	cout &lt;&lt; &quot;Extracting mean face and eigen faces ... &quot;; 
	// Extract mean vector and reshape it to obtain average face
	averageFace = meanVector.reshape(3,sz.height);
	
	// Reshape Eigenvectors to obtain EigenFaces
	for(int i = 0; i &lt; numEigenFaces; i++)
	{
			Mat row = eigenVectors.row(i); 
			Mat eigenFace = row.reshape(3,sz.height);
			eigenFaces.push_back(eigenFace);
	}
	cout &lt;&lt; &quot;DONE&quot; &lt;&lt; endl; 

	// Read new test image. This image was not used in traning. 
	string imageFilename(&quot;test/satya1.jpg&quot;);
	cout &lt;&lt; &quot;Read image &quot; &lt;&lt; imageFilename &lt;&lt; &quot; and vectorize ... &quot;;
	im = imread(imageFilename);
	im.convertTo(im, CV_32FC3, 1/255.0);
	
	// Reshape image to one long vector and subtract the mean vector
	imVector = im.clone(); 
	imVector = imVector.reshape(1, 1) - meanVector; 
	cout &lt;&lt; &quot;DONE&quot; &lt;&lt; endl; 


	// Show mean face first
	output = averageFace.clone(); 

	cout &lt;&lt; &quot;Usage:&quot; &lt;&lt; endl 
	&lt;&lt; &quot;\\tChange the slider to change the number of EigenFaces&quot; &lt;&lt; endl
	&lt;&lt; &quot;\\tHit ESC to terminate program.&quot; &lt;&lt; endl;
	
	namedWindow(&quot;Result&quot;, CV_WINDOW_AUTOSIZE);
	int sliderValue; 

	// Changing the slider value changes the number of EigenVectors
	// used in reconstructFace.
	createTrackbar( &quot;No. of EigenFaces&quot;, &quot;Result&quot;, &amp;sliderValue, numEigenFaces, reconstructFace);
	
	// Display original image and the reconstructed image size by side
	displayResult(im, output);
	

	waitKey(0);
	destroyAllWindows(); 
	return 0;
}
</code></pre><p>Python:</p><pre><code># Import necessary packages
import os
import sys
import cv2
import numpy as np

&#39;&#39;&#39;
 Display result
 Left = Original Image
 Right = Reconstructed Face
&#39;&#39;&#39;
def displayResult(left, right)	:
	output = np.hstack((left,right))	
	output = cv2.resize(output, (0,0), fx=4, fy=4)
	cv2.imshow(&quot;Result&quot;, output)

# Recontruct face using mean face and EigenFaces
def reconstructFace(*args):
	# Start with the mean / average face
	output = averageFace
	
	for i in range(0,args[0]):
		&#39;&#39;&#39;
		The weight is the dot product of the mean subtracted
		image vector with the EigenVector
		&#39;&#39;&#39;
		weight = np.dot(imVector, eigenVectors[i])
		output = output + eigenFaces[i] * weight

	
	displayResult(im, output)
    


if __name__ == &#39;__main__&#39;:

	# Read model file
	modelFile = &quot;pcaParams.yml&quot;
	print(&quot;Reading model file &quot; + modelFile, end=&quot; ... &quot;, flush=True)
	file = cv2.FileStorage(modelFile, cv2.FILE_STORAGE_READ)
	
	# Extract mean vector
	mean = file.getNode(&quot;mean&quot;).mat()
	
	# Extract Eigen Vectors
	eigenVectors = file.getNode(&quot;eigenVectors&quot;).mat()
	
	# Extract size of the images used in training.
	sz = file.getNode(&quot;size&quot;).mat()
	sz = (int(sz[0,0]), int(sz[1,0]), int(sz[2,0]))
	
	&#39;&#39;&#39; 
	Extract maximum number of EigenVectors. 
	This is the max(numImagesUsedInTraining, w * h * 3)
	where w = width, h = height of the training images. 
	&#39;&#39;&#39;

	numEigenFaces = eigenVectors.shape[0]
	print(&quot;DONE&quot;)

	# Extract mean vector and reshape it to obtain average face
	averageFace = mean.reshape(sz)

	# Reshape Eigenvectors to obtain EigenFaces
	eigenFaces = [] 
	for eigenVector in eigenVectors:
		eigenFace = eigenVector.reshape(sz)
		eigenFaces.append(eigenFace)


	# Read new test image. This image was not used in traning. 
	imageFilename = &quot;test/satya2.jpg&quot;
	print(&quot;Read image &quot; + imageFilename + &quot; and vectorize &quot;, end=&quot; ... &quot;);
	im = cv2.imread(imageFilename)
	im = np.float32(im)/255.0

	# Reshape image to one long vector and subtract the mean vector
	imVector = im.flatten() - mean; 
	print(&quot;Done&quot;);
	
	# Show mean face first
	output = averageFace
	
	# Create window for displaying result
	cv2.namedWindow(&quot;Result&quot;, cv2.WINDOW_AUTOSIZE)

	# Changing the slider value changes the number of EigenVectors
	# used in reconstructFace.
	cv2.createTrackbar( &quot;No. of EigenFaces&quot;, &quot;Result&quot;, 0, numEigenFaces, reconstructFace)

	# Display original image and the reconstructed image size by side
	displayResult(im, output)

	cv2.waitKey(0)
	cv2.destroyAllWindows()
</code></pre><p>您可以创建模型pcaParams.yml使用createPCAModel.cpp和createPCAModel.py。该代码使用CelebA数据集的前1000个图像，并将它们首先缩放到一半大小。所以这个PCA模型是在大小（89x109）的图像上训练的。除了1000张图像之外，代码还使用了原始图像的垂直翻转版本，因此我们使用2000张图像进行训练。。但是createPCAModel文件里面没有reisze函数，要自己缩放为89X109分辨率。生成了pcaParams.yml文件，再通过reconstructFace获取人脸。</p><p>本文所有代码包括createPCAModel文件见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><p>但是图像没有列出，从CelebA数据集下载</p><p><a href="http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html" target="_blank" rel="noopener noreferrer"> http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html </a></p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/face-reconstruction-using-eigenfaces-cpp-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/face-reconstruction-using-eigenfaces-cpp-python/</a></li></ul>`,43)]))}const g=t(o,[["render",r],["__file","2019-04-24-_OpenCV实战_22 使用EigenFaces进行人脸重建.html.vue"]]),l=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-24-_OpenCV%E5%AE%9E%E6%88%98_22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA.html","title":"[OpenCV实战]22 使用EigenFaces进行人脸重建","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-04-24T16:31:50.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]22 使用EigenFaces进行人脸重建 在这篇文章中，我们将学习如何使用EigenFaces实现人脸重建。我们需要了解主成分分析（PCA）和EigenFaces。 1 背景 1.1 什么是 EigenFaces ？ 在我们之前的文章中，我们解释了Eigenfaces是可以添加到平均（平均）面部以创建新的面部图像的图像。我们可以用...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-04-24-_OpenCV%E5%AE%9E%E6%88%98_22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]22 使用EigenFaces进行人脸重建"}],["meta",{"property":"og:description","content":"[OpenCV实战]22 使用EigenFaces进行人脸重建 在这篇文章中，我们将学习如何使用EigenFaces实现人脸重建。我们需要了解主成分分析（PCA）和EigenFaces。 1 背景 1.1 什么是 EigenFaces ？ 在我们之前的文章中，我们解释了Eigenfaces是可以添加到平均（平均）面部以创建新的面部图像的图像。我们可以用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190424162700654.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-04-24T16:31:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]22 使用EigenFaces进行人脸重建\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190424162700654.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190423194122119.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190424162700745.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190424162700737.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D22%20%E4%BD%BF%E7%94%A8EigenFaces%E8%BF%9B%E8%A1%8C%E4%BA%BA%E8%84%B8%E9%87%8D%E5%BB%BA/20190424162700755.png\\"],\\"datePublished\\":\\"2019-04-24T16:31:50.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[{"level":3,"title":"1.1 什么是 EigenFaces ？","slug":"_1-1-什么是-eigenfaces","link":"#_1-1-什么是-eigenfaces","children":[]},{"level":3,"title":"1.2 坐标的变化","slug":"_1-2-坐标的变化","link":"#_1-2-坐标的变化","children":[]}]},{"level":2,"title":"2 面部重建","slug":"_2-面部重建","link":"#_2-面部重建","children":[{"level":3,"title":"2.1 计算新面部图像的 PCA 权重","slug":"_2-1-计算新面部图像的-pca-权重","link":"#_2-1-计算新面部图像的-pca-权重","children":[]},{"level":3,"title":"2.2 使用 EigenFaces 进行面部重建","slug":"_2-2-使用-eigenfaces-进行面部重建","link":"#_2-2-使用-eigenfaces-进行面部重建","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":7.88,"words":2364},"filePathRelative":"blog/opencv/opencv实战/2019-04-24-[OpenCV实战]22 使用EigenFaces进行人脸重建.md","localizedDate":"2019年4月25日","excerpt":"\\n<p>在这篇文章中，我们将学习如何使用EigenFaces实现人脸重建。我们需要了解主成分分析（PCA）和EigenFaces。</p>\\n<h2><strong>1</strong> <strong>背景</strong></h2>\\n<h3><strong>1.1</strong> <strong>什么是</strong> <strong>EigenFaces</strong> <strong>？</strong></h3>\\n<p>在我们之前的文章中，我们解释了Eigenfaces是可以添加到平均（平均）面部以创建新的面部图像的图像。我们可以用数学方式写这个，</p>\\n<figure><img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]22 使用EigenFaces进行人脸重建/20190424162700654.png\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{g as comp,l as data};
