import{_ as t,c as n,a as o,o as a}from"./app-BOswGe5u.js";const p={};function r(c,e){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="opencv实战-11-基于opencv的二维码扫描器" tabindex="-1"><a class="header-anchor" href="#opencv实战-11-基于opencv的二维码扫描器"><span>[OpenCV实战]11 基于OpenCV的二维码扫描器</span></a></h1><p>在这篇文章中，我们将看到如何使用OpenCV扫描二维码。您将需要OpenCV3.4.4或4.0.0及更高版本来运行代码。</p><h2 id="_1-二维码-qrcode-扫描" tabindex="-1"><a class="header-anchor" href="#_1-二维码-qrcode-扫描"><span>1 二维码(QRCode)扫描</span></a></h2><p>在OpenCV中扫描二维码很简单。我们首先读取图像。然后，我们实例化QRCodeDetector对象并使用detectAndDecode方法来查找QR码的数据和位置。最后，我们进行结果显示。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/11/qrcode-feature.jpg" alt="QR Code scanner image" tabindex="0" loading="lazy"><figcaption>QR Code scanner image</figcaption></figure><p>具体代码如下：</p><p>C++：</p><pre><code>// QRCode_scanner.cpp

#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;iostream&gt;

using namespace cv;
using namespace std;

/**
 * @brief 用于显示检测到的QR码周围的框
 * 
 * @param im 
 * @param bbox 
 */
void display(Mat &amp;im, Mat &amp;bbox)
{
	int n = bbox.rows;
	for (int i = 0; i &lt; n; i++)
	{
		line(im, Point2i(bbox.at&lt;float&gt;(i, 0), bbox.at&lt;float&gt;(i, 1)),
			 Point2i(bbox.at&lt;float&gt;((i + 1) % n, 0), bbox.at&lt;float&gt;((i + 1) % n, 1)), Scalar(255, 0, 0), 3);
	}
	imshow(&quot;Result&quot;, im);
}

int main()
{
	// Read image
	Mat inputImage = imread(&quot;./image/demo.jpg&quot;);

	//QR检测器
	QRCodeDetector qrDecoder = QRCodeDetector::QRCodeDetector();

	//二维码边框坐标，提取出来的二维码
	Mat bbox, rectifiedImage;

	//检测二维码
	std::string data = qrDecoder.detectAndDecode(inputImage, bbox, rectifiedImage);

	//获取二维码中的数据链接
	if (data.length() &gt; 0)
	{
		cout &lt;&lt; &quot;Decoded Data : &quot; &lt;&lt; data &lt;&lt; endl;
		display(inputImage, bbox);
		rectifiedImage.convertTo(rectifiedImage, CV_8UC3);
		//展示二维码
		imshow(&quot;Rectified QRCode&quot;, rectifiedImage);

		waitKey(0);
	}
	else
	{
		cout &lt;&lt; &quot;QR Code not detected&quot; &lt;&lt; endl;
	}
	return 0;
}
</code></pre><p>Python:</p><pre><code>import cv2
import numpy as np
import time


inputImage = cv2.imread(&quot;./image/demo.jpg&quot;)

# Display barcode and QR code location
def display(im, bbox):
    n = len(bbox)
    for j in range(n):
        cv2.line(im, tuple(bbox[j][0]), tuple(bbox[ (j+1) % n][0]), (255,0,0), 3)

    # Display results
    cv2.imshow(&quot;Results&quot;, im)

# Create a qrCodeDetector Object
qrDecoder = cv2.QRCodeDetector()

# Detect and decode the qrcode
t = time.time()
data,bbox,rectifiedImage = qrDecoder.detectAndDecode(inputImage)
print(&quot;Time Taken for Detect and Decode : {:.3f} seconds&quot;.format(time.time() - t))
if len(data)&gt;0:
    print(&quot;Decoded Data : {}&quot;.format(data))
    display(inputImage, bbox)
    rectifiedImage = np.uint8(rectifiedImage);
    cv2.imshow(&quot;Rectified QRCode&quot;, rectifiedImage);
else:
    print(&quot;QR Code not detected&quot;)
    cv2.imshow(&quot;Results&quot;, inputImage)
cv2.imwrite(&quot;output.jpg&quot;,inputImage)
cv2.waitKey(0)
cv2.destroyAllWindows()
</code></pre><h2 id="_2-结果" tabindex="-1"><a class="header-anchor" href="#_2-结果"><span>2 结果</span></a></h2><p>二维码定位画框：</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/11/output.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>命令行输出，也就是提取的二维码链接：</p><pre><code>Decoded Data : http://LearnOpenCV.com
</code></pre><p>所获取的二维码点图：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]11 基于OpenCV的二维码扫描器/20190319154822137.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>总体来说OpenCV检测的效果只能作为研究用。所有的代码见：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise</a></p><p>实际用还是用ZBar比较好，ZBar还支持条形码的识别，OpenCV只有二维码的识别。</p><p>ZBar具体应用见：</p><p><a href="http://zbar.sourceforge.net/" target="_blank" rel="noopener noreferrer"> http://zbar.sourceforge.net/ </a></p><p><a href="https://blog.csdn.net/qq_38712026/article/details/78674665" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/qq_38712026/article/details/78674665</a></p><p><a href="https://blog.csdn.net/dcrmg/article/details/52132313" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/dcrmg/article/details/52132313</a></p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><p>OpenCV自带二维码识别：</p><p><a href="https://www.learnopencv.com/opencv-qr-code-scanner-c-and-python/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/opencv-qr-code-scanner-c-and-python/</a></p><p>OpenCV上使用ZBar进行二维码和条形码识别：</p><p><a href="https://www.learnopencv.com/barcode-and-qr-code-scanner-using-zbar-and-opencv/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/barcode-and-qr-code-scanner-using-zbar-and-opencv/</a></p>`,29)]))}const d=t(p,[["render",r],["__file","2019-03-19-_OpenCV实战_11 基于OpenCV的二维码扫描器.html.vue"]]),l=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-19-_OpenCV%E5%AE%9E%E6%88%98_11%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84%E4%BA%8C%E7%BB%B4%E7%A0%81%E6%89%AB%E6%8F%8F%E5%99%A8.html","title":"[OpenCV实战]11 基于OpenCV的二维码扫描器","lang":"zh-CN","frontmatter":{"category":["OpenCV"],"date":"2019-03-19T16:00:17.000Z","tag":["OpenCV实战","OpenCV"],"description":"[OpenCV实战]11 基于OpenCV的二维码扫描器 在这篇文章中，我们将看到如何使用OpenCV扫描二维码。您将需要OpenCV3.4.4或4.0.0及更高版本来运行代码。 1 二维码(QRCode)扫描 在OpenCV中扫描二维码很简单。我们首先读取图像。然后，我们实例化QRCodeDetector对象并使用detectAndDecode方法来...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-19-_OpenCV%E5%AE%9E%E6%88%98_11%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84%E4%BA%8C%E7%BB%B4%E7%A0%81%E6%89%AB%E6%8F%8F%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]11 基于OpenCV的二维码扫描器"}],["meta",{"property":"og:description","content":"[OpenCV实战]11 基于OpenCV的二维码扫描器 在这篇文章中，我们将看到如何使用OpenCV扫描二维码。您将需要OpenCV3.4.4或4.0.0及更高版本来运行代码。 1 二维码(QRCode)扫描 在OpenCV中扫描二维码很简单。我们首先读取图像。然后，我们实例化QRCodeDetector对象并使用detectAndDecode方法来..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.learnopencv.com/wp-content/uploads/2018/11/qrcode-feature.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-03-19T16:00:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]11 基于OpenCV的二维码扫描器\\",\\"image\\":[\\"https://www.learnopencv.com/wp-content/uploads/2018/11/qrcode-feature.jpg\\",\\"https://www.learnopencv.com/wp-content/uploads/2018/11/output.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D11%20%E5%9F%BA%E4%BA%8EOpenCV%E7%9A%84%E4%BA%8C%E7%BB%B4%E7%A0%81%E6%89%AB%E6%8F%8F%E5%99%A8/20190319154822137.jpg\\"],\\"datePublished\\":\\"2019-03-19T16:00:17.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 二维码(QRCode)扫描","slug":"_1-二维码-qrcode-扫描","link":"#_1-二维码-qrcode-扫描","children":[]},{"level":2,"title":"2 结果","slug":"_2-结果","link":"#_2-结果","children":[]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"blog/opencv/opencv实战/2019-03-19-[OpenCV实战]11 基于OpenCV的二维码扫描器.md","localizedDate":"2019年3月20日","excerpt":"\\n<p>在这篇文章中，我们将看到如何使用OpenCV扫描二维码。您将需要OpenCV3.4.4或4.0.0及更高版本来运行代码。</p>\\n<h2>1 二维码(QRCode)扫描</h2>\\n<p>在OpenCV中扫描二维码很简单。我们首先读取图像。然后，我们实例化QRCodeDetector对象并使用detectAndDecode方法来查找QR码的数据和位置。最后，我们进行结果显示。</p>\\n<figure><img src=\\"https://www.learnopencv.com/wp-content/uploads/2018/11/qrcode-feature.jpg\\" alt=\\"QR Code scanner image\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>QR Code scanner image</figcaption></figure>","autoDesc":true}');export{d as comp,l as data};
