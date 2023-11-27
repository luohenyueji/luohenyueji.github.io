import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as a,c as r,a as e,b as t,d as i,e as l}from"./app-MsA2k2kn.js";const o={},u=e("h1",{id:"深度学习-ccpd车牌数据集介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#深度学习-ccpd车牌数据集介绍","aria-hidden":"true"},"#"),t(" [深度学习] CCPD车牌数据集介绍")],-1),c=e("p",null,[t("CCPD是一个大型的、多样化的、经过仔细标注的中国城市车牌开源数据集。CCPD数据集主要分为CCPD2019数据集和CCPD2020(CCPD-Green)数据集。CCPD2019数据集车牌类型仅有普通车牌(蓝色车牌)，CCPD2020数据集车牌类型仅有新能源车牌(绿色车牌)。 "),e("strong",null,"在CCPD数据集中，每张图片仅包含一张车牌，车牌的车牌省份主要为皖。CCPD中的每幅图像都包含大量的标注信息，但是CCPD数据集没有专门的标注文件，每张图像的文件名就是该图像对应的数据标注"),t("。标注最困难的部分是注释四个顶点的位置。为了完成这项任务，数据发布者首先在10k图像上手动标记四个顶点的位置。然后设计了一个基于深度学习的检测模型，在对该网络进行良好训练后，对每幅图像的四个顶点位置进行自动标注。最后，数据发布者雇佣了7名兼职工人在两周内纠正这些标注。CCPD提供了超过250k个独特的车牌图像和详细的注释。每张图像的分辨率为720(宽度)× 1160(高)× 3(通道)。实际上，这种分辨率足以保证每张图像中的车牌清晰可辨,但是该数据有些图片标注可能不准。不过总的来说CCPD数据集非常推荐研究车牌识别算法的人员学习使用。")],-1),v={href:"https://github.com/detectRecog/CCPD",target:"_blank",rel:"noopener noreferrer"},m={href:"https://openaccess.thecvf.com/content_ECCV_2018/papers/Zhenbo_Xu_Towards_End-to-End_License_ECCV_2018_paper.pdf",target:"_blank",rel:"noopener noreferrer"},b=l('<h2 id="ccpd数据集介绍" tabindex="-1"><a class="header-anchor" href="#ccpd数据集介绍" aria-hidden="true">#</a> CCPD数据集介绍</h2><h3 id="ccpd2019数据集" tabindex="-1"><a class="header-anchor" href="#ccpd2019数据集" aria-hidden="true">#</a> CCPD2019数据集</h3><p>CCPD2019数据集主要采集于合肥市停车场，采集时间为上午7:30到晚上10:00，停车场采集人员手持Android POS机对停车场的车辆拍照进行数据采集。所拍摄的车牌照片涉及多种复杂环境，包括模糊、倾斜、雨天、雪天等。CCPD2019数据集包含了25万多幅中国城市车牌图像和车牌检测与识别信息的标注。主要介绍如下：</p><table><thead><tr><th style="text-align:center;">类别</th><th style="text-align:center;">描述</th><th style="text-align:center;">图片数</th></tr></thead><tbody><tr><td style="text-align:center;">CCPD-Base</td><td style="text-align:center;">通用车牌图片</td><td style="text-align:center;">200k</td></tr><tr><td style="text-align:center;">CCPD-FN</td><td style="text-align:center;">车牌离摄像头拍摄位置相对较近或较远</td><td style="text-align:center;">20k</td></tr><tr><td style="text-align:center;">CCPD-DB</td><td style="text-align:center;">车牌区域亮度较亮、较暗或者不均匀</td><td style="text-align:center;">20k</td></tr><tr><td style="text-align:center;">CCPD-Rotate</td><td style="text-align:center;">车牌水平倾斜20到50度，竖直倾斜-10到10度</td><td style="text-align:center;">10k</td></tr><tr><td style="text-align:center;">CCPD-Tilt</td><td style="text-align:center;">车牌水平倾斜15到45度，竖直倾斜15到45度</td><td style="text-align:center;">10k</td></tr><tr><td style="text-align:center;">CCPD-Weather</td><td style="text-align:center;">车牌在雨雪雾天气拍摄得到</td><td style="text-align:center;">10k</td></tr><tr><td style="text-align:center;">CCPD-Challenge</td><td style="text-align:center;">在车牌检测识别任务中较有挑战性的图片</td><td style="text-align:center;">10k</td></tr><tr><td style="text-align:center;">CCPD-Blur</td><td style="text-align:center;">由于摄像机镜头抖动导致的模糊车牌图片</td><td style="text-align:center;">5k</td></tr><tr><td style="text-align:center;">CCPD-NP</td><td style="text-align:center;">没有安装车牌的新车图片</td><td style="text-align:center;">5k</td></tr></tbody></table><p>CCPD2019/CCPD-Base中的图像被拆分为train/val数据集。使用CCPD2019中的子数据集(CCPD-DB、CCPD-Blur、CCPD-FN、CCPD-Rotate、CCPD-Tilt、CCPD-Challenge)进行测试。CCPD2019数据集(数据大小12.26G)下载地址：</p>',5),q={href:"https://drive.google.com/open?id=1rdEsCUcIUaYOVRkx5IMTRNA7PcGMmSgc",target:"_blank",rel:"noopener noreferrer"},C={href:"https://pan.baidu.com/share/init?surl=i5AOjAbtkwb17Zy-NQGqkw",target:"_blank",rel:"noopener noreferrer"},_=e("p",null,[t("CCPD2019中部分图片如下图所示： "),e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] CCPD车牌数据集介绍/image/ccpd2019.png",alt:"",loading:"lazy"})],-1),p=e("h3",{id:"ccpd2020数据集",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ccpd2020数据集","aria-hidden":"true"},"#"),t(" CCPD2020数据集")],-1),h=e("p",null,"CCPD2020数据集采集方法应该和CCPD2019数据集类似。CCPD2020仅仅有新能源车牌图片，包含不同亮度，不同倾斜角度，不同天气环境下的车牌。CCPD2020中的图像被拆分为train/val/test数据集，train/val/test数据集中图片数分别为5769/1001/5006。CCPD2020数据集(数据大小865.7MB)下载地址：",-1),g={href:"https://drive.google.com/file/d/1m8w1kFxnCEiqz_-t2vTcgrgqNIv986PR/view?usp=sharing",target:"_blank",rel:"noopener noreferrer"},D={href:"https://pan.baidu.com/s/1JSpc9BZXFlPkXxRK4qUCyw",target:"_blank",rel:"noopener noreferrer"},P=e("p",null,[t("CCPD2020中部分图片如下图所示： "),e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] CCPD车牌数据集介绍/image/ccpd2020.png",alt:"",loading:"lazy"})],-1),x=e("h2",{id:"ccpd数据集标注处理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ccpd数据集标注处理","aria-hidden":"true"},"#"),t(" CCPD数据集标注处理")],-1),y=e("p",null,"CCPD数据集没有专门的标注文件，每张图像的文件名就是该图像对应的数据标注。例如图片3061158854166666665-97_100-159&434_586&578-558&578_173&523_159&434_586&474-0_0_3_24_33_32_28_30-64-233.jpg的文件名可以由分割符'-'分为多个部分：",-1),f=e("li",null,"3061158854166666665为区域（这个值可能有问题，可以不管）；",-1),w={href:"http://www.ccsenet.org/journal/index.php/cis/article/download/1843/1751",target:"_blank",rel:"noopener noreferrer"},k=e("li",null,"159&434_586&578对应边界框左上角和右下角坐标:左上(159, 434), 右下(586, 578)；",-1),F=e("li",null,"558&578_173&523_159&434_586&474对应车牌四个顶点坐标(右下角开始顺时针排列)：右下(558, 578)，左下(173, 523)，左上(159, 434)，右上(586, 474)；",-1),I=e("li",null,"0_0_3_24_33_32_28_30为车牌号码（第一位为省份缩写），在CCPD2019中这个参数为7位，CCPD2020中为8位，有对应的关系表；",-1),N=e("li",null,"64为亮度，数值越大车牌越亮（可能不准确，仅供参考）；",-1),j=e("li",null,"233为模糊度，数值越小车牌越模糊（可能不准确，仅供参考）。",-1),B=l(`<p>对于每张图片的标注信息直接字符分割即可。一个展示CCPD数据集单张图片标注的Python代码如下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Wed Jun  9 18:24:10 2021

@author: luohenyueji
&quot;&quot;&quot;

from PIL import Image, ImageDraw, ImageFont
import os


provincelist = [
    &quot;皖&quot;, &quot;沪&quot;, &quot;津&quot;, &quot;渝&quot;, &quot;冀&quot;,
    &quot;晋&quot;, &quot;蒙&quot;, &quot;辽&quot;, &quot;吉&quot;, &quot;黑&quot;,
    &quot;苏&quot;, &quot;浙&quot;, &quot;京&quot;, &quot;闽&quot;, &quot;赣&quot;,
    &quot;鲁&quot;, &quot;豫&quot;, &quot;鄂&quot;, &quot;湘&quot;, &quot;粤&quot;,
    &quot;桂&quot;, &quot;琼&quot;, &quot;川&quot;, &quot;贵&quot;, &quot;云&quot;,
    &quot;西&quot;, &quot;陕&quot;, &quot;甘&quot;, &quot;青&quot;, &quot;宁&quot;,
    &quot;新&quot;]

wordlist = [
    &quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot;,
    &quot;F&quot;, &quot;G&quot;, &quot;H&quot;, &quot;J&quot;, &quot;K&quot;,
    &quot;L&quot;, &quot;M&quot;, &quot;N&quot;, &quot;P&quot;, &quot;Q&quot;,
    &quot;R&quot;, &quot;S&quot;, &quot;T&quot;, &quot;U&quot;, &quot;V&quot;,
    &quot;W&quot;, &quot;X&quot;, &quot;Y&quot;, &quot;Z&quot;, &quot;0&quot;,
    &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;,
    &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;]

## --- 绘制边界框


def DrawBox(im, box):
    draw = ImageDraw.Draw(im)
    draw.rectangle([tuple(box[0]), tuple(box[1])],  outline=&quot;#FFFFFF&quot;, width=3)

## --- 绘制四个关键点


def DrawPoint(im, points):

    draw = ImageDraw.Draw(im)

    for p in points:
        center = (p[0], p[1])
        radius = 5
        right = (center[0]+radius, center[1]+radius)
        left = (center[0]-radius, center[1]-radius)
        draw.ellipse((left, right), fill=&quot;#FF0000&quot;)

## --- 绘制车牌


def DrawLabel(im, label):
    draw = ImageDraw.Draw(im)
   ## draw.multiline_text((30,30), label.encode(&quot;utf-8&quot;), fill=&quot;#FFFFFF&quot;)
    font = ImageFont.truetype(&#39;simsun.ttc&#39;, 64)
    draw.text((30, 30), label, font=font)

## --- 图片可视化


def ImgShow(imgpath, box, points, label):
    ## 打开图片
    im = Image.open(imgpath)
    DrawBox(im, box)
    DrawPoint(im, points)
    DrawLabel(im, label)
    ## 显示图片
    im.show()
    im.save(&#39;result.jpg&#39;)


def main():
    ## 图像路径
    imgpath = &#39;ccpd_green/val/0136360677083-95_103-255&amp;434_432&amp;512-432&amp;512_267&amp;494_255&amp;434_424&amp;449-0_0_3_25_30_24_24_32-98-218.jpg&#39;

    ## 图像名
    imgname = os.path.basename(imgpath).split(&#39;.&#39;)[0]

    ## 根据图像名分割标注
    _, _, box, points, label, brightness, blurriness = imgname.split(&#39;-&#39;)

    ## --- 边界框信息
    box = box.split(&#39;_&#39;)
    box = [list(map(int, i.split(&#39;&amp;&#39;))) for i in box]

    ## --- 关键点信息
    points = points.split(&#39;_&#39;)
    points = [list(map(int, i.split(&#39;&amp;&#39;))) for i in points]
    ## 将关键点的顺序变为从左上顺时针开始
    points = points[-2:]+points[:2]

    ## --- 读取车牌号
    label = label.split(&#39;_&#39;)
    ## 省份缩写
    province = provincelist[int(label[0])]
    ## 车牌信息
    words = [wordlist[int(i)] for i in label[1:]]
    ## 车牌号
    label = province+&#39;&#39;.join(words)

    ## --- 图片可视化
    ImgShow(imgpath, box, points, label)


main()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码读取了CCPD中的一张图片，并绘制了其车牌的边界框，关键点，车牌名。结果如下所示</p><table><thead><tr><th style="text-align:center;">类型</th><th style="text-align:center;">图片</th></tr></thead><tbody><tr><td style="text-align:center;">原图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] CCPD车牌数据集介绍/image/src.jpg" alt="" loading="lazy"></td></tr><tr><td style="text-align:center;">标注展示图</td><td style="text-align:center;"><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] CCPD车牌数据集介绍/image/result.jpg" alt="" loading="lazy"></td></tr></tbody></table>`,4);function E(S,L){const n=d("ExternalLinkIcon");return a(),r("div",null,[u,c,e("p",null,[t("CCPD官方开源仓库地址为"),e("a",v,[t("CCPD"),i(n)]),t("，该仓库介绍了CCPD2019和CCPD2020的相关信息和下载地址。关于CCPD数据集更详细的介绍见其ECCV2018发表论文，地址为"),e("a",m,[t("Towards End-to-End License Plate Detection and Recognition: A Large Dataset"),i(n)]),t("。")]),b,e("ul",null,[e("li",null,[e("a",q,[t("谷歌云盘"),i(n)])]),e("li",null,[e("a",C,[t("百度云盘(代码：hm0u)"),i(n)])])]),_,p,h,e("ul",null,[e("li",null,[e("a",g,[t("谷歌云盘"),i(n)])]),e("li",null,[e("a",D,[t("百度云盘(代码：ol3j)"),i(n)])])]),P,x,y,e("ol",null,[f,e("li",null,[t("97_100对应车牌的两个倾斜角度-水平倾斜角和垂直倾斜角, 水平倾斜97度, 竖直倾斜100度。水平倾斜度是车牌与水平线之间的夹角。二维旋转后，垂直倾斜角为车牌左边界线与水平线的夹角。CCPD数据集中这个参数标注可能不那么准，这个指标具体参考了论文"),e("a",w,[t("Hough Transform and Its Application in Vehicle License Plate Tilt Correction"),i(n)]),t("；")]),k,F,I,N,j]),B])}const R=s(o,[["render",E],["__file","2021-06-09-_深度学习_ CCPD车牌数据集介绍.html.vue"]]);export{R as default};
