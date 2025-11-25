import{_ as t,c as n,a,o as r}from"./app-CJwJJlha.js";const o={};function i(p,e){return r(),n("div",null,e[0]||(e[0]=[a(`<h1 id="常用工具-深度学习caffe处理工具" tabindex="-1"><a class="header-anchor" href="#常用工具-深度学习caffe处理工具"><span>[常用工具] 深度学习Caffe处理工具</span></a></h1><p>对于机器学习、图像处理有时要对图像数据进行分割处理。用python写了一些常用小工具代码。</p><h2 id="_1-caffe数据集txt文本制作" tabindex="-1"><a class="header-anchor" href="#_1-caffe数据集txt文本制作"><span>1 Caffe数据集txt文本制作</span></a></h2><p>很多时候要建立如下数据集txt文本，类似图片所示（图片网上找的)</p><figure><img src="https://img-blog.csdnimg.cn/20190121145819354.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>生成代码如下：</p><pre><code>&quot;&quot;&quot;
caffe数据集txt文本制作
&quot;&quot;&quot;

import os

#文件保存路径
f =open(r&#39;d:/val.txt&#39;,&quot;w&quot;)
path = &#39;D:/smoke_datasets/val/0&#39;
for filename in os.listdir(path) :
    #数据标签
    count = 0
    ff = filename+&quot; &quot;+ &quot;0&quot;+&quot;\\n&quot;
    f.write(ff)
print(&#39;{} class: {}&#39;.format(filename,count))

   
path = &#39;D:/smoke_datasets/val/1&#39;
for filename in os.listdir(path) :
    #数据标签
    count = 1
    ff = filename+&quot; &quot;+ &quot;1&quot;+&quot;\\n&quot;
    f.write(ff)
print(&#39;{} class: {}&#39;.format(filename,count))

f.close()
</code></pre><h2 id="_2-jpg图像完整性检测" tabindex="-1"><a class="header-anchor" href="#_2-jpg图像完整性检测"><span>2 jpg图像完整性检测</span></a></h2><p>有时爬虫所获得图像可能不完整，需要进行图像完整性检测。代码如下：</p><pre><code>&quot;&quot;&quot;
jpg图像完整性检测
&quot;&quot;&quot;

from skimage import io
from PIL import Image
import numpy as np
import os


def is_valid_jpg(path):  
    #判断JPG文件下载是否完整 
    if path.split(&#39;.&#39;)[-1].lower() == &#39;jpg&#39;:  
        with open(path, &#39;rb&#39;) as fr:  
            fr.seek(-2, 2)
             #判定jpg是否包含结束字段
            return fr.read() == &#39;\\xff\\xd9&#39; 
    else:  
        return False

#文件头的方式
def is_jpg(path):
    data = open(path,&#39;rb&#39;).read(11)
    if data[:4] != &#39;\\xff\\xd8\\xff\\xe0&#39; and data[:4]!=&#39;\\xff\\xd8\\xff\\xe1&#39;: 
        return False
    if data[6:] != &#39;JFIF\\0&#39; and data[6:] != &#39;Exif\\0&#39;: 
        return False
    return True


def check_pic_PIL(path):
    try:
        Image.open(path).load()
        Image.open(path).verify()
    except:
        return False
    
    try:
        img = Image.open(path)
        img = np.array(img, dtype=np.float32)
    except:
            return False
    
    if len(img.shape)!=3:
        return False
    
    return True
    
def check_pic_skimage(path):
    try:
        img = io.imread(path)
    except:
        return False
    
    try:
        img = np.array(img, dtype=np.float32)
    except:
        return False
    
    if len(img.shape)!=3:
        return False
    
    return True


if __name__ == &#39;__main__&#39;:
    #结果
    f =open(r&#39;d:/state.txt&#39;,&quot;w&quot;)
    #路径
    paths = [&quot;d:/train&quot;]
    for path in paths:
        print(&#39;the current path is : {}\\n&#39;.format(path))
        
        #path = &quot;D:/smoke_data/datas/deal/smoke_auto_aug&quot;
        
        #文件头检测
        
        #精细检测
        for filename in os.listdir(path):
            #print(&#39;current jpg is {}&#39;.format(path+&quot;/&quot;+filename))
            #文件头检测
            status_valid_jpg = is_valid_jpg(path+&quot;/&quot;+filename)
            status_jpg = is_jpg(path+&quot;/&quot;+filename)
            if( status_valid_jpg == False or status_jpg == False):
                ff = filename+&quot;\\n&quot;
                f.write(ff)
                print(&#39;{} \\n&#39;.format(path+&quot;/&quot;+filename))
                continue

            #状态检测
            status_PIL = check_pic_PIL(path+&quot;/&quot;+filename)
            status_skimage = check_pic_skimage(path+&quot;/&quot;+filename)
            if (status_PIL == False or status_skimage == False):
                ff = filename+&quot;\\n&quot;
                f.write(ff)
                
                print(&quot;=&quot; * 50)     
                print(&#39;{} \\n&#39;.format(path+&quot;/&quot;+filename))
                print(&quot;=&quot; * 50)    
        #分割线    
        print(&quot;*&quot; * 50)           
    print(&quot;end!&quot;)
    f.close()
</code></pre><h2 id="_3-图像随机移动复制" tabindex="-1"><a class="header-anchor" href="#_3-图像随机移动复制"><span>3 图像随机移动复制</span></a></h2><p>对于windows系统，移动太慢，也费时。linux也差不多。通过python可以快速移动/复制大量图像，代码如下：</p><pre><code>&quot;&quot;&quot;
图像随机移动复制
&quot;&quot;&quot;

import os, random, shutil

def moveFile(fileDir, tarDir, picknumber):
    #取图像原始路径
    pathDir = os.listdir(fileDir)
    filenumber = len(pathDir)
    if filenumber &lt; picknumber:
        picknumber = filenumber
    #抽取一定比例
    sample = random.sample(pathDir, picknumber)
    print(sample)
    for name in sample:
        shutil.move(fileDir+name, tarDir+name)
    return

def copyFile(fileDir, tarDir, picknumber):
    #取图像原始路径
    pathDir = os.listdir(fileDir)
    filenumber = len(pathDir)
    if filenumber &lt; picknumber:
        picknumber = filenumber
    #抽取一定比例
    sample = random.sample(pathDir, picknumber)
    print(sample)
    for name in sample:
        shutil.copy(fileDir+name, tarDir+name)
    return

if __name__ == &#39;__main__&#39;:
    #图像路径
    fileDir = &#39;D:/datasets/train/&#39;
    #移动路径
    tarDir = &#39;D:/datasets/move/&#39;
    #从fileDir随机移动500张图像到tarDir文件夹
    moveFile(fileDir, tarDir, 500)
    #从fileDir随机复制500张图像到tarDir文件夹
    copyFile(fileDir, tarDir, 500)
</code></pre><h2 id="_4-图像尺寸统计" tabindex="-1"><a class="header-anchor" href="#_4-图像尺寸统计"><span>4 图像尺寸统计</span></a></h2><p>主要是统计图像尺寸，可以添加过滤条件，滤掉尺寸过小或者过大的图像。代码如下：</p><pre><code>&quot;&quot;&quot;
统计数据集下图像尺寸
&quot;&quot;&quot;


import os
from PIL import Image
import pandas as pd

#数据集路径
path = &#39;D:/test/&#39;
#存入列表
f = os.listdir(path)

count = 0

df = pd.DataFrame(columns=[&#39;width&#39;,&#39;height&#39;])
for i in f:
    #旧文件名
    oldname=path+f[count]
    im = Image.open(oldname)
    df.loc[count,&#39;width&#39;]=im.width
    df.loc[count,&#39;height&#39;]=im.height
    print(oldname)
    count += 1

#保存结果
df.to_csv(&#39;test.csv&#39;)
f.close()
</code></pre><h2 id="_5-图像名字后缀重命名" tabindex="-1"><a class="header-anchor" href="#_5-图像名字后缀重命名"><span>5 图像名字后缀重命名</span></a></h2><p>对图像的名字以及后缀名重新命名，代码如下：</p><pre><code>&quot;&quot;&quot;
图像名称后缀重命名
&quot;&quot;&quot;

import os

#图像路径
path = &#39;D:/train/&#39;
#保存路径
save_path = &#39;D:/result/&#39;
#存入列表
f = os.listdir(path)

count = 0

for i in f:
    #旧文件名
    oldname=path+f[count]
    print(oldname)
    #新文件名
    newname=save_path+&#39;smoke.&#39;+str(count)+&#39;.jpg&#39;
    os.rename(oldname,newname)
    count += 1
</code></pre><h2 id="_6-两文件夹文件比对" tabindex="-1"><a class="header-anchor" href="#_6-两文件夹文件比对"><span>6 两文件夹文件比对</span></a></h2><p>判断两个文件夹里面文件的文件名是不是相互对应，并移动文件名不对应的文件</p><pre><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
判断两个文件夹里面文件的文件名是不是相互对应，并移动不对应的文件
&quot;&quot;&quot;

import os,shutil


# 文件少的文件夹路径  传入存储的list
def listdir(path, list_name):
    for file in os.listdir(path):  
        list_name.append(file.split(&#39;.&#39;)[0])  

def del_dir(checkpath,input_name,savepath):
    if not os.path.exists(savepath):
        os.makedirs(savepath)                
    for file in os.listdir(checkpath):  
        check_name=file.split(&#39;.&#39;)[0]
        if check_name in input_name:
            print(&#39;{} 在列表中&#39;.format(check_name))
        #不在列表中，移动文件
        else:
            srcfile=os.path.join(checkpath, file)
            shutil.move(srcfile,savepath) 
            
name=[]
#保存路径
listdir(&#39;./2&#39;,name)
del_dir(&#39;./1&#39;,name,&#39;./3&#39;)
</code></pre><h2 id="_7-绘制caffe模型的roc曲线-二分类" tabindex="-1"><a class="header-anchor" href="#_7-绘制caffe模型的roc曲线-二分类"><span>7 绘制caffe模型的ROC曲线(二分类)</span></a></h2><p>主要原理为通过OpenCV DNN 调用caffe模型，其他模型一样套路。然后对每张图像进行检测，保存该图像真实标签，以及该标签分类的模型预测概率。调用sklearn绘制ROC，并计算AUC值。通过约登指数获得ROC曲线中最佳阈值。最后通过matplotlib绘图。约登指数为TPR- FPR或者TPR+TNR-1。具体ROC原理可参考：</p><p><a href="https://www.jianshu.com/p/c61ae11cc5f6" target="_blank" rel="noopener noreferrer"> https://www.jianshu.com/p/c61ae11cc5f6 </a></p><p><a href="https://www.jianshu.com/p/82903edb58dc" target="_blank" rel="noopener noreferrer"> https://www.jianshu.com/p/82903edb58dc </a></p><p><a href="https://blog.csdn.net/u014264373/article/details/80487766" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/u014264373/article/details/80487766 </a></p><pre><code>&#39;&#39;&#39;
opencv调用caffe并计算roc
&#39;&#39;&#39;
import numpy as np
import matplotlib.pyplot as plt
import cv2
import os
from sklearn import metrics


# 真实图像标签为0的图像路径
imagePath_0 = [&#39;0&#39;]
# 真实图像标签为1的图像路径
imagePath_1 = [&#39;1&#39;]

# 正类标签
poslabel = 1
# 模型路径
prototxtFile = &#39;deploy_227.prototxt&#39;
modelFile = &#39;model_227.caffemodel&#39;

# 真实分类结果
trueResult = []
# 检测结果
detectProbs = []

# 图像检测


def detectCaffe(srcImg):
    detectImg = srcImg.copy()
    blob = cv2.dnn.blobFromImage(
        detectImg, 1, (227, 227), (92.713, 106.446, 118.115), swapRB=False)

    net = cv2.dnn.readNetFromCaffe(prototxtFile, modelFile)

    net.setInput(blob)
    detections = net.forward()

    # 分类结果
    order = detections[0].argmax()
    prob = detections[0].max()
    #print(&#39;the predict class is:&#39;,order)
    #print(&#39;the positive class prob is: &#39;, prob)
    # 返回分类结果和概率
    return order, prob

# 图像检测


def imageDetect(detectImagePath, trueLabel):
    for imageFileName in os.listdir(detectImagePath):
        imageFilePath = os.path.join(detectImagePath, imageFileName)
        print(&quot;current detect image is: &quot;, imageFileName)
        srcImg = cv2.imread(imageFilePath)
        if srcImg is None:
            print(&quot;error image is: &quot;, imageFilePath)
            continue
        detectOrder, detectProb = detectCaffe(srcImg)
        trueResult.append(trueLabel)
        # 如果正样本编号和检测结果标签一致直接保存分类概率
        if detectOrder == poslabel:
            detectProbs.append(detectProb)
        # 如果不一致保存正样本的分类概率
        else:
            detectProbs.append(1-detectProb)


# 画ROC图，输入真实标签，正样本模型分类概率，正样本编号
def drawROC(trueResult, detectProbs, poslabel):
    fpr, tpr, thresholds = metrics.roc_curve(
        trueResult, detectProbs, pos_label=poslabel)
    #auc = metrics.roc_auc_score(y, scores)
    roc_auc = metrics.auc(fpr, tpr)

    # 计算约登指数Youden Index（TPR-FPR或者TPR+TNR-1）
    tpr_fpr = list(tpr-fpr)
    bestIndex = tpr_fpr.index(max(tpr_fpr))
    print(&quot;约登指数为{}&quot;.format(max(tpr_fpr)))
    tprBest = tpr[bestIndex]
    fprBest = fpr[bestIndex]
    thresholdsBest = thresholds[bestIndex]
    print(&quot;最佳约登指数阈值为:&quot;, thresholdsBest)

    # 假正率为横坐标，真正率为纵坐标做曲线
    plt.plot(fpr, tpr, color=&#39;darkorange&#39;,
             label=&#39;ROC curve (area = %0.2f)&#39; % roc_auc)
    plt.plot([0, 1], [0, 1], color=&#39;navy&#39;, linestyle=&#39;--&#39;)
    #plt.xlim([0.0, 1.0])
    #plt.ylim([0.0, 1.05])
    plt.xlabel(&#39;False Positive Rate&#39;)
    plt.ylabel(&#39;True Positive Rate&#39;)
    plt.title(&#39;Receiver operating characteristic example&#39;)
    plt.legend(loc=&quot;lower right&quot;)
    # 画出约登指数最大值
    plt.plot(fprBest, tprBest, &quot;ro&quot;)
    plt.savefig(&quot;roc.png&quot;, dpi=300)
    plt.show()

    return fpr, tpr, thresholds, bestIndex


def main():
    # 0标签图像遍历
    for imagePath in imagePath_0:
        imageDetect(imagePath, 0)
    for imagePath in imagePath_1:
        imageDetect(imagePath, 1)
    # poslabel正例标签
    fpr, tpr, thresholds, bestIndex = drawROC(
        trueResult, detectProbs, poslabel)
    np.save(&#39;fpr.npy&#39;, fpr)
    np.save(&#39;tpr.npy&#39;, tpr)
    np.save(&#39;thresholds&#39;, thresholds)
    return fpr, tpr, thresholds


if __name__ == &#39;__main__&#39;:
    fpr, tpr, thresholds = main()
</code></pre><p>结果如图所示：</p><figure><img src="https://img-blog.csdnimg.cn/20190806135744661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,30)]))}const l=t(o,[["render",i],["__file","2019-01-21-_常用工具_ 深度学习Caffe处理工具.html.vue"]]),c=JSON.parse('{"path":"/blog/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/2019-01-21-_%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7_%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0Caffe%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7.html","title":"[常用工具] 深度学习Caffe处理工具","lang":"zh-CN","frontmatter":{"date":"2019-01-21T15:06:59.000Z","category":["常用工具"],"tag":["常用工具","深度学习","OpenCV","Python"],"description":"[常用工具] 深度学习Caffe处理工具 对于机器学习、图像处理有时要对图像数据进行分割处理。用python写了一些常用小工具代码。 1 Caffe数据集txt文本制作 很多时候要建立如下数据集txt文本，类似图片所示（图片网上找的) 生成代码如下： 2 jpg图像完整性检测 有时爬虫所获得图像可能不完整，需要进行图像完整性检测。代码如下： 3 图像随...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/2019-01-21-_%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7_%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0Caffe%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[常用工具] 深度学习Caffe处理工具"}],["meta",{"property":"og:description","content":"[常用工具] 深度学习Caffe处理工具 对于机器学习、图像处理有时要对图像数据进行分割处理。用python写了一些常用小工具代码。 1 Caffe数据集txt文本制作 很多时候要建立如下数据集txt文本，类似图片所示（图片网上找的) 生成代码如下： 2 jpg图像完整性检测 有时爬虫所获得图像可能不完整，需要进行图像完整性检测。代码如下： 3 图像随..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdnimg.cn/20190121145819354.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"常用工具"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2019-01-21T15:06:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[常用工具] 深度学习Caffe处理工具\\",\\"image\\":[\\"https://img-blog.csdnimg.cn/20190121145819354.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\",\\"https://img-blog.csdnimg.cn/20190806135744661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\"],\\"datePublished\\":\\"2019-01-21T15:06:59.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 Caffe数据集txt文本制作","slug":"_1-caffe数据集txt文本制作","link":"#_1-caffe数据集txt文本制作","children":[]},{"level":2,"title":"2 jpg图像完整性检测","slug":"_2-jpg图像完整性检测","link":"#_2-jpg图像完整性检测","children":[]},{"level":2,"title":"3 图像随机移动复制","slug":"_3-图像随机移动复制","link":"#_3-图像随机移动复制","children":[]},{"level":2,"title":"4 图像尺寸统计","slug":"_4-图像尺寸统计","link":"#_4-图像尺寸统计","children":[]},{"level":2,"title":"5 图像名字后缀重命名","slug":"_5-图像名字后缀重命名","link":"#_5-图像名字后缀重命名","children":[]},{"level":2,"title":"6 两文件夹文件比对","slug":"_6-两文件夹文件比对","link":"#_6-两文件夹文件比对","children":[]},{"level":2,"title":"7 绘制caffe模型的ROC曲线(二分类)","slug":"_7-绘制caffe模型的roc曲线-二分类","link":"#_7-绘制caffe模型的roc曲线-二分类","children":[]}],"git":{},"readingTime":{"minutes":5.82,"words":1747},"filePathRelative":"blog/常用工具/2019-01-21-[常用工具] 深度学习Caffe处理工具.md","localizedDate":"2019年1月21日","excerpt":"\\n<p>对于机器学习、图像处理有时要对图像数据进行分割处理。用python写了一些常用小工具代码。</p>\\n<h2>1 Caffe数据集txt文本制作</h2>\\n<p>很多时候要建立如下数据集txt文本，类似图片所示（图片网上找的)</p>\\n<figure><img src=\\"https://img-blog.csdnimg.cn/20190121145819354.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{l as comp,c as data};
