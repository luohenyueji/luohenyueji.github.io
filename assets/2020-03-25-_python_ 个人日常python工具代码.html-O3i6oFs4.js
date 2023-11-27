import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as d,c,a as n,b as e,d as i,e as a}from"./app-MsA2k2kn.js";const r={},v=a(`<h1 id="python-个人日常python工具代码" tabindex="-1"><a class="header-anchor" href="#python-个人日常python工具代码" aria-hidden="true">#</a> [python] 个人日常python工具代码</h1><h2 id="生成文件目录结构" tabindex="-1"><a class="header-anchor" href="#生成文件目录结构" aria-hidden="true">#</a> 生成文件目录结构</h2><p>生成文件夹或文件的目录结构，并保存结果。可选是否滤除目录，特定文件以及可以设定最大查找文件结构深度。效果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root:[z:/]
|--a.py
|--image
|      |--cat1.jpg
|      |--cat2.jpg
|      |--cat3.jpg
|      |--cat4.jpg
|      |--cat5.jpg
|      |--cat6.jpg
|--result
|      |--result.jpg
|--save.txt
|--test.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参考</strong></p>`,5),u={href:"https://blog.csdn.net/feizai1208917009/article/details/88396501",target:"_blank",rel:"noopener noreferrer"},o=a(`<p>代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> os<span class="token punctuation">.</span>path

<span class="token comment"># 结果保存路径</span>
txtFilePath<span class="token operator">=</span><span class="token string">&quot;save.txt&quot;</span>
savetxtFile <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>txtFilePath<span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 文件查找路径</span>
findFilePath<span class="token operator">=</span><span class="token string">&quot;z:/&quot;</span>

<span class="token comment"># 是否只显示目录</span>
isShowDir <span class="token operator">=</span> <span class="token boolean">False</span>

<span class="token comment"># 最大子目录文件深度</span>
maxDepth <span class="token operator">=</span> <span class="token number">3</span> 

<span class="token comment"># 需要跳过的文件目录和文件</span>
skipFile <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;.git&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;doc&quot;</span><span class="token punctuation">]</span>
<span class="token comment"># 需要跳过的文件类型</span>
<span class="token comment">#skipFileType = [&quot;.txt&quot;,&quot;.MOV&quot;]</span>
skipFileType<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">def</span> <span class="token function">saveFile</span><span class="token punctuation">(</span>depth<span class="token punctuation">,</span>item<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 保存的内容</span>
    saveCotent<span class="token operator">=</span><span class="token string">&quot;|      &quot;</span> <span class="token operator">*</span> depth <span class="token operator">+</span> <span class="token string">&quot;|--&quot;</span> <span class="token operator">+</span> item      
    <span class="token keyword">print</span><span class="token punctuation">(</span>saveCotent<span class="token punctuation">)</span>      
    savetxtFile<span class="token punctuation">.</span>write<span class="token punctuation">(</span> saveCotent<span class="token punctuation">)</span>
    savetxtFile<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">listDir</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> depth<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 获得绝对路径</span>
    absPath<span class="token operator">=</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token keyword">if</span> depth <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;root:[&quot;</span> <span class="token operator">+</span> path <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span>
        savetxtFile<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;root:[&quot;</span> <span class="token operator">+</span> path <span class="token operator">+</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span>
        savetxtFile<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># 超过最大深度</span>
    <span class="token keyword">if</span> depth <span class="token operator">&gt;</span> maxDepth<span class="token punctuation">:</span>
        <span class="token keyword">return</span>
 
    <span class="token comment"># 展开目录文件</span>
    <span class="token keyword">for</span> item <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 跳过指定的文件目录和文件</span>
        <span class="token keyword">if</span> item <span class="token keyword">not</span> <span class="token keyword">in</span> skipFile<span class="token punctuation">:</span>
            <span class="token comment"># 跳过指定的后缀文件</span>
            <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>splitext<span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">in</span> skipFileType<span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            <span class="token comment"># 获得项目绝对目录地址</span>
            absItem<span class="token operator">=</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>absPath<span class="token punctuation">,</span>item<span class="token punctuation">)</span>
            
            <span class="token comment"># 是否只显示目录</span>
            <span class="token keyword">if</span> isShowDir <span class="token keyword">is</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>absItem<span class="token punctuation">)</span> <span class="token keyword">is</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
                    saveFile<span class="token punctuation">(</span>depth<span class="token punctuation">,</span>item<span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                saveFile<span class="token punctuation">(</span>depth<span class="token punctuation">,</span>item<span class="token punctuation">)</span>
            
            <span class="token comment"># 查找子项</span>
            <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>absItem<span class="token punctuation">)</span><span class="token punctuation">:</span>
                listDir<span class="token punctuation">(</span>absItem<span class="token punctuation">,</span> depth <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>
 
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>

    listDir<span class="token punctuation">(</span>findFilePath<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>    
    savetxtFile<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多图合并" tabindex="-1"><a class="header-anchor" href="#多图合并" aria-hidden="true">#</a> 多图合并</h2><p>将多图合并为一张图像，并添加图像对应文字，效果如下： <img src="https://img-blog.csdnimg.cn/20200405092011981.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" loading="lazy"></p><p><strong>参考</strong></p>`,5),p={href:"https://blog.csdn.net/qq_37598011/article/details/101551593",target:"_blank",rel:"noopener noreferrer"},m={href:"https://cloud.tencent.com/developer/ask/204503",target:"_blank",rel:"noopener noreferrer"},b=a(`<p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import os
import numpy as np
from PIL import ImageFont, ImageDraw, Image, ExifTags


# 创建字体文件
# 文字名
def creat_font_img(value):
    # 设置空白图像
    img = Image.new(&#39;RGB&#39;, (TEXTWIDTH, TEXTHEIGHT), &quot;white&quot;)
    # 设置需要显示的字体 宋体
    fontpath = TEXTFONT
    # 32为字体大小
    font = ImageFont.truetype(fontpath, TEXTSIZE)
    # 绘图
    img_pil = img
    draw = ImageDraw.Draw(img_pil)
    # 获取字体宽度
    sum_width = 0
    sum_height = 0
    # 添加文字
    for char in value:
        width, height = draw.textsize(char, font)
        sum_width += width
        sum_height = height
    # 绘制文字信息
    # 文字居中
    draw.text(((img_pil.size[0] - sum_width) / 2, (img_pil.size[1] -
                                                   sum_height) / 2 + TEXTOFFSET), value, font=font, fill=(0, 0, 0))
    return img_pil

# 创建单个带标题和图像的文字
def create_single_img(path):

    # 提取图片
    img = Image.open(path)
    
    # 提取图像名
    text = img.filename.split(&quot;.&quot;)[0]
    # 防止图片旋转
    for orientation in ExifTags.TAGS.keys():
        if ExifTags.TAGS[orientation]==&#39;Orientation&#39;:
            break
    try:
        exif=dict(img._getexif().items())
        if exif[orientation] == 3:
            img=img.rotate(180, expand=True)
        elif exif[orientation] == 6:
            img=img.rotate(270, expand=True)
        elif exif[orientation] == 8:
            img=img.rotate(90, expand=True)
    except (AttributeError, KeyError, IndexError):
        # 如果没有EXIF数据或者没有Orientation标签，则不做任何操作
        pass

    imgFont = creat_font_img(text)
    # 图像大小重置
    img = img.resize((IMGWIDTH, IMGHEIGHT))

    # 合并的图像
    mergeImg = Image.new(
        &quot;RGB&quot;, (IMGWIDTH+IMAGESPACE, IMGHEIGHT+TEXTHEIGHT), &quot;white&quot;)

    mergeImg.paste(imgFont, (0, 0))
    # 贴图
    mergeImg.paste(img, (0, TEXTHEIGHT))

    return mergeImg


def create_multi_img(dirpath):
    # 转到工作目录
    dirpath = os.path.realpath(dirpath)
    os.chdir(dirpath)
    mergeImgs = []
    for dirname in os.listdir(dirpath):
        if dirname.split(&quot;.&quot;)[-1].lower() == &#39;jpg&#39;:
            # print(dirname)
            mergeImgs.append(create_single_img(dirname))

    if ROW*COL is not len(mergeImgs):
        print(&quot;错误，请检查图像数量&quot;)

    # 单个图像尺寸
    mergeW, mergeH = mergeImgs[0].size
    finalImg = Image.new(&quot;RGB&quot;, (mergeW*COL, mergeH*ROW), &quot;white&quot;)

    # 第几张图
    num = 0

    # 排列图像
    for top in range(0, mergeH*ROW, mergeH):
        for left in range(0, mergeW*COL, mergeW):
            #print(left, top)
            finalImg.paste(mergeImgs[num], (left, top))
            num = num+1

    return finalImg


# -----------------
# 全局变量

# 图片排列方式
ROW = 5
COL = 8

# 单个图像大小
IMGWIDTH, IMGHEIGHT = 600, 600

# 图像间距
IMAGESPACE = 10

# 文字图像尺寸 文字图像宽需要与单张输入图像等宽
TEXTWIDTH, TEXTHEIGHT = IMGWIDTH, 100

# 文字大小和文字上下偏移量
TEXTSIZE, TEXTOFFSET = 64, 5

# 文字字体名
# simsun宋体， msyh.ttc微软雅黑
TEXTFONT = &quot;font/msyh.ttc&quot;


if __name__ == &#39;__main__&#39;:
    # image路径下存放图片
    finalImg = create_multi_img(&quot;./image&quot;)
    # 保存图像
    finalImg.save(&quot;../result.jpg&quot;, dpi=(300.0, 300.0))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="找出文件夹中相似图像" tabindex="-1"><a class="header-anchor" href="#找出文件夹中相似图像" aria-hidden="true">#</a> 找出文件夹中相似图像</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># -*- coding: utf-8 -*-
&quot;&quot;&quot;
Created on Thu Apr  8 06:18:17 2021

@author: luohenyueji
&quot;&quot;&quot;

import threading
import time
import queue
import cv2
import os
import numpy as np
import cv2
import shutil
import numpy as np
import os

# 计算hash值


def consume(thread_name, q, result):
    while True:
        filename, img = q.get()
        phash_value = cv2.img_hash.PHash_create().compute(img)
        result[str(filename)] = phash_value
        q.task_done()

# 读取图像
def produce(thread_name, q, imgPath):
    for i in os.listdir(imgPath):
        if i.split(&#39;.&#39;)[-1] == &#39;jpg&#39;:
            filename = os.path.join(imgPath, i)
            imgfile = cv2.imread(filename)
            if imgfile is None:
                continue
            q.put([filename, imgfile])
            print(filename)
    q.join()


# 结果
result = {}
imgpath = &quot;save&quot;

q = queue.Queue()

p = threading.Thread(target=produce, args=(&quot;producer&quot;, q, imgpath))
c1 = threading.Thread(target=consume, args=(&quot;consumer1&quot;, q, result))
c2 = threading.Thread(target=consume, args=(&quot;consumer2&quot;, q, result))
c3 = threading.Thread(target=consume, args=(&quot;consumer3&quot;, q, result))
c4 = threading.Thread(target=consume, args=(&quot;consumer4&quot;, q, result))

c1.setDaemon(True)
c2.setDaemon(True)
c3.setDaemon(True)
c4.setDaemon(True)

p.start()
c1.start()
c2.start()
c3.start()
c4.start()

p.join()
np.save(&quot;file.npy&quot;, result)


filehash = np.load(&#39;file.npy&#39;, allow_pickle=True).item()

save_file = &quot;save_similar&quot;
os.makedirs(save_file, exist_ok=True)

# pash计算结构
phash_create = cv2.img_hash.PHash_create()
# 阈值
pash_thre = 10

while (len(filehash)):
    # 取keys
    now_keys = list(filehash.keys())[0]
    # 还剩多少图片
    print(&quot;还剩{}图片&quot;.format(len(filehash.keys())))
    now_keys_value = filehash.pop(now_keys)

    # 相同图像存储
    similar_filename = []

    # 循环计算值
    for keys in filehash:
        pash_value = phash_create.compare(now_keys_value, filehash[keys])
        if pash_value &lt; pash_thre:
            similar_filename.append(keys)
    try:
        # 移动图像
        if len(similar_filename) &gt; 0:

            # 获得关键key名字
            now_keys_filename = os.path.basename(now_keys)
            # 创建的保存文件路径
            save_file_path = os.path.join(save_file, now_keys_filename[:-4])
            os.makedirs(save_file_path, exist_ok=True)
            # 移动关键keys图片
            shutil.move(now_keys,os.path.join(save_file_path,now_keys_filename))

            # 从字典中移除值，并移动图片
            for i in similar_filename:
                filehash.pop(i)
                # 获得key名字
                keys_filename = os.path.basename(i)
                # 移动图片
                shutil.move(i, os.path.join(save_file_path, keys_filename))
    except:
        continue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function k(h,g){const s=t("ExternalLinkIcon");return d(),c("div",null,[v,n("blockquote",null,[n("p",null,[n("a",u,[e("https://blog.csdn.net/feizai1208917009/article/details/88396501"),i(s)])])]),o,n("blockquote",null,[n("p",null,[n("a",p,[e("https://blog.csdn.net/qq_37598011/article/details/101551593"),i(s)]),n("a",m,[e("https://cloud.tencent.com/developer/ask/204503"),i(s)])])]),b])}const q=l(r,[["render",k],["__file","2020-03-25-_python_ 个人日常python工具代码.html.vue"]]);export{q as default};
