import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as i,c,a as e,b as t,d as o,e as d}from"./app-MsA2k2kn.js";const p={},l=d(`<h1 id="opencv实战-11-基于opencv的二维码扫描器" tabindex="-1"><a class="header-anchor" href="#opencv实战-11-基于opencv的二维码扫描器" aria-hidden="true">#</a> [OpenCV实战]11 基于OpenCV的二维码扫描器</h1><p>在这篇文章中，我们将看到如何使用OpenCV扫描二维码。您将需要OpenCV3.4.4或4.0.0及更高版本来运行代码。</p><h2 id="_1-二维码-qrcode-扫描" tabindex="-1"><a class="header-anchor" href="#_1-二维码-qrcode-扫描" aria-hidden="true">#</a> 1 二维码(QRCode)扫描</h2><p>在OpenCV中扫描二维码很简单。我们首先读取图像。然后，我们实例化QRCodeDetector对象并使用detectAndDecode方法来查找QR码的数据和位置。最后，我们进行结果显示。</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/11/qrcode-feature.jpg" alt="QR Code scanner image" tabindex="0" loading="lazy"><figcaption>QR Code scanner image</figcaption></figure><p>具体代码如下：</p><p>C++：</p><pre><code>// QRCode_scanner.cpp

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
</code></pre><h2 id="_2-结果" tabindex="-1"><a class="header-anchor" href="#_2-结果" aria-hidden="true">#</a> 2 结果</h2><p>二维码定位画框：</p><figure><img src="https://www.learnopencv.com/wp-content/uploads/2018/11/output.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>命令行输出，也就是提取的二维码链接：</p><pre><code>Decoded Data : http://LearnOpenCV.com
</code></pre><p>所获取的二维码点图：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]11 基于OpenCV的二维码扫描器/20190319154822137.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>总体来说OpenCV检测的效果只能作为研究用。所有的代码见：</p>`,18),s={href:"https://github.com/luohenyueji/OpenCV-Practical-Exercise",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"实际用还是用ZBar比较好，ZBar还支持条形码的识别，OpenCV只有二维码的识别。",-1),m=e("p",null,"ZBar具体应用见：",-1),g={href:"http://zbar.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.csdn.net/qq_38712026/article/details/78674665",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/dcrmg/article/details/52132313",target:"_blank",rel:"noopener noreferrer"},f=e("h2",{id:"_3-参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-参考","aria-hidden":"true"},"#"),t(" 3 参考")],-1),b=e("p",null,"OpenCV自带二维码识别：",-1),q={href:"https://www.learnopencv.com/opencv-qr-code-scanner-c-and-python/",target:"_blank",rel:"noopener noreferrer"},C=e("p",null,"OpenCV上使用ZBar进行二维码和条形码识别：",-1),v={href:"https://www.learnopencv.com/barcode-and-qr-code-scanner-using-zbar-and-opencv/",target:"_blank",rel:"noopener noreferrer"};function w(x,D){const n=r("ExternalLinkIcon");return i(),c("div",null,[l,e("p",null,[e("a",s,[t(" https://github.com/luohenyueji/OpenCV-Practical-Exercise"),o(n)])]),u,m,e("p",null,[e("a",g,[t(" http://zbar.sourceforge.net/ "),o(n)])]),e("p",null,[e("a",h,[t(" https://blog.csdn.net/qq_38712026/article/details/78674665"),o(n)])]),e("p",null,[e("a",_,[t(" https://blog.csdn.net/dcrmg/article/details/52132313"),o(n)])]),f,b,e("p",null,[e("a",q,[t(" https://www.learnopencv.com/opencv-qr-code-scanner-c-and-python/"),o(n)])]),C,e("p",null,[e("a",v,[t(" https://www.learnopencv.com/barcode-and-qr-code-scanner-using-zbar-and-opencv/"),o(n)])])])}const y=a(p,[["render",w],["__file","2019-03-19-_OpenCV实战_11 基于OpenCV的二维码扫描器.html.vue"]]);export{y as default};
