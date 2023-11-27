import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o,c as i,a as n,b as s,d as t,e as c}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"图像处理-基于图像哈希构建图像相似度对比算法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#图像处理-基于图像哈希构建图像相似度对比算法","aria-hidden":"true"},"#"),s(" [图像处理] 基于图像哈希构建图像相似度对比算法")],-1),r={href:"https://blog.csdn.net/LuohenYJ/article/details/108267229",target:"_blank",rel:"noopener noreferrer"},k=n("h2",{id:"_1-介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-介绍","aria-hidden":"true"},"#"),s(" 1 介绍")],-1),d=n("p",null,"基于图像哈希构建图像相似度对比算法本质就是根据两张图像的hash值距离来判断图像是否相似。具体步骤如下：",-1),m=n("ol",null,[n("li",null,"计算需要检测图像的hash值，存入本地。"),n("li",null,"从本地读取各个图像的hash值，计算图像间的hash值距离。"),n("li",null,"图像间的hash值距离小于某个阈值，就是相似图像。")],-1),v={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"},h=c(`<p><strong>下面代码展示4张测试图像，img1和img2是相似的，其他两两不相似。</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> cv2<span class="token punctuation">,</span>os
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt
<span class="token comment">## opencv版本</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current opencv-contrib version is : {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>cv2<span class="token punctuation">.</span>__version__<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 图像路径</span>
imgpath <span class="token operator">=</span> <span class="token string">&#39;img&#39;</span>
<span class="token keyword">for</span> filename <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>imgpath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
    filepath<span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>imgpath<span class="token punctuation">,</span>filename<span class="token punctuation">)</span>
    img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
    img <span class="token operator">=</span> img<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span><span class="token punctuation">:</span><span class="token punctuation">,</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>current opencv-contrib version is : 4.5.3
img1.jpg
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/output_3_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>img2.jpg
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/output_3_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>img3.jpg
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/output_3_5.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>img4.jpg
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/output_3_7.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-读取图像计算hash值" tabindex="-1"><a class="header-anchor" href="#_2-读取图像计算hash值" aria-hidden="true">#</a> 2 读取图像计算hash值</h2><p>以下代码用于多线程读取图像计算hash值，这里用的PHash，可以换成其他hash计算算法。因为计算hash值很费时，所以用了生产者消费者模型。1个生产者线程用于读取图像，4个消费者模型计算图像的hash值。计算hash值后，将各个图像的hash用numpy文件的方式存入本地。下次再计算图像hash值，可以跳过已经计算过hash值的图像从而加快运算速度，但是这里把跳过代码放在了消费者函数中，最好放在生产者函数中。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## -*- coding: utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
Created on Wed Aug  4 18:25:51 2021

读取图像计算hash值
@author: luohenyueji
&quot;&quot;&quot;</span>

<span class="token keyword">import</span> threading
<span class="token keyword">import</span> queue
<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> os
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np


<span class="token comment">## 计算图像hash值</span>
<span class="token keyword">def</span> <span class="token function">consume</span><span class="token punctuation">(</span>threadName<span class="token punctuation">,</span> q<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        fileName<span class="token punctuation">,</span> img <span class="token operator">=</span> q<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">## 图像不存在已有结果中就重新计算</span>
        <span class="token comment">## 判断图像是否有hash记录可以读取图像函数中，执行更高效。</span>
        <span class="token comment">## 放在这里主要是担心图像出问题</span>
        <span class="token keyword">if</span> <span class="token builtin">str</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span> <span class="token keyword">not</span> <span class="token keyword">in</span> result<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            phashValue <span class="token operator">=</span> cv2<span class="token punctuation">.</span>img_hash<span class="token punctuation">.</span>PHash_create<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>compute<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
            result<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> phashValue
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{} processing img: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>threadName<span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
        q<span class="token punctuation">.</span>task_done<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment">## 读取图像</span>
<span class="token keyword">def</span> <span class="token function">produce</span><span class="token punctuation">(</span>threadName<span class="token punctuation">,</span> q<span class="token punctuation">,</span> imgPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>imgPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> i<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token punctuation">[</span><span class="token string">&#39;jpg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;png&#39;</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            fileName <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>imgPath<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
            img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
            <span class="token keyword">if</span> img <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>
            q<span class="token punctuation">.</span>put<span class="token punctuation">(</span><span class="token punctuation">[</span>fileName<span class="token punctuation">,</span> img<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{} reading img: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>threadName<span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
    q<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span>imgPath<span class="token punctuation">,</span> savePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 结果</span>
    result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">## 读取已有结果加快速度</span>
    <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>savePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        result <span class="token operator">=</span> np<span class="token punctuation">.</span>load<span class="token punctuation">(</span>savePath<span class="token punctuation">,</span> allow_pickle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>

    q <span class="token operator">=</span> queue<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 1个读图线程</span>
    p <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>produce<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;producer&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">,</span> imgPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">## 4个计算线程</span>
    c1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>consume<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;consumer1&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span>
    c2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>consume<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;consumer2&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span>
    c3 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>consume<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;consumer3&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span>
    c4 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>consume<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;consumer4&quot;</span><span class="token punctuation">,</span> q<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">)</span>

    c1<span class="token punctuation">.</span>setDaemon<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    c2<span class="token punctuation">.</span>setDaemon<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    c3<span class="token punctuation">.</span>setDaemon<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    c4<span class="token punctuation">.</span>setDaemon<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token comment">## 启线程</span>
    p<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c3<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c4<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

    p<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 保存结果</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span>savePath<span class="token punctuation">,</span> result<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment">## 检测文件夹</span>
    imgPath <span class="token operator">=</span> <span class="token string">&quot;img&quot;</span>
    <span class="token comment">## 结果保存路径</span>
    savePath <span class="token operator">=</span> <span class="token string">&quot;hash_result.npy&quot;</span>
    main<span class="token punctuation">(</span>imgPath<span class="token punctuation">,</span> savePath<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>producer reading img: img\\img1.jpg
consumer1 processing img: img\\img1.jpg
producer reading img: img\\img2.jpg
consumer2 processing img: img\\img2.jpg
producer reading img: img\\img3.jpgconsumer3 processing img: img\\img3.jpg

producer reading img: img\\img4.jpg
consumer4 processing img: img\\img4.jpg
</code></pre><h2 id="_3-获得相似图像" tabindex="-1"><a class="header-anchor" href="#_3-获得相似图像" aria-hidden="true">#</a> 3 获得相似图像</h2><p>获得相似图像就是读取图像hash值，循环遍历计算距离，距离小于给定阈值就是相似图像。这里阈值设置为5。最后相似的图像移动或复制到指定文件夹similarImg。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## -*- coding: utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
Created on Wed Aug  4 19:15:19 2021

获得相似图像
@author: luohenyueji
&quot;&quot;&quot;</span>

<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> shutil
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> os


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span>hashPath<span class="token punctuation">,</span> savePath<span class="token punctuation">,</span> pashThre<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 读取图像哈希列表数据</span>
    hashList <span class="token operator">=</span> np<span class="token punctuation">.</span>load<span class="token punctuation">(</span>hashPath<span class="token punctuation">,</span> allow_pickle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 创建图像结果保存文件夹</span>
    os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>savePath<span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token comment">## pash计算结构</span>
    phashStruct <span class="token operator">=</span> cv2<span class="token punctuation">.</span>img_hash<span class="token punctuation">.</span>PHash_create<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token builtin">len</span><span class="token punctuation">(</span>hashList<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 取keys</span>
        now_keys <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>hashList<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token comment">## 还剩多少图像</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;待处理图像{}张&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>hashList<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        nowKeyValue <span class="token operator">=</span> hashList<span class="token punctuation">.</span>pop<span class="token punctuation">(</span>now_keys<span class="token punctuation">)</span>

        <span class="token comment">## 相同图像存储</span>
        similarFilename <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

        <span class="token comment">## 循环计算值</span>
        <span class="token keyword">for</span> keys <span class="token keyword">in</span> hashList<span class="token punctuation">:</span>
            pashValue <span class="token operator">=</span> phashStruct<span class="token punctuation">.</span>compare<span class="token punctuation">(</span>nowKeyValue<span class="token punctuation">,</span> hashList<span class="token punctuation">[</span>keys<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> pashValue <span class="token operator">&lt;=</span> pashThre<span class="token punctuation">:</span>
                similarFilename<span class="token punctuation">.</span>append<span class="token punctuation">(</span>keys<span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token comment">## 移动图像</span>
            <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>similarFilename<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>

                <span class="token comment">## 获得关键key名字</span>
                nowKeyFilename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>now_keys<span class="token punctuation">)</span>
                <span class="token comment">## 创建的保存文件路径</span>
                saveFilePath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>savePath<span class="token punctuation">,</span> nowKeyFilename<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>saveFilePath<span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
                <span class="token comment">## 移动关键keys图像</span>
                <span class="token comment">## shutil.move(now_keys,os.path.join(saveFilePath,nowKeyFilename))</span>

                <span class="token comment">## 从字典中移除值，并移动或者复制图像</span>
                <span class="token keyword">for</span> i <span class="token keyword">in</span> similarFilename<span class="token punctuation">:</span>
                    hashList<span class="token punctuation">.</span>pop<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
                    <span class="token comment">## 获得key名字</span>
                    keyFilename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
                    <span class="token comment">## 复制图像，移动图像就把copy改为move</span>
                    shutil<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>i<span class="token punctuation">,</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>saveFilePath<span class="token punctuation">,</span> keyFilename<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment">## hash文件路径</span>
    hashPath <span class="token operator">=</span> <span class="token string">&quot;hash_result.npy&quot;</span>
    savePath <span class="token operator">=</span> <span class="token string">&quot;similarImg&quot;</span>
    <span class="token comment">## hash距离低于该值的都判定为相似图像</span>
    pashThre <span class="token operator">=</span> <span class="token number">5</span>
    main<span class="token punctuation">(</span>hashPath<span class="token punctuation">,</span> savePath<span class="token punctuation">,</span> pashThre<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>待处理图像4张
待处理图像2张
待处理图像1张
</code></pre><p>运行代码结果如下图所示。第一张图像表示similarImg文件夹中最后结果只有img1图像有相似图像。第二张图像表示与img1相似的图像只有img2。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/result1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[图像处理] 基于图像哈希构建图像相似度对比算法/result2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,22),b={href:"https://blog.csdn.net/LuohenYJ/article/details/108267229",target:"_blank",rel:"noopener noreferrer"},g={href:"https://blog.csdn.net/LuohenYJ/article/details/107944236",target:"_blank",rel:"noopener noreferrer"};function _(y,f){const a=e("ExternalLinkIcon");return o(),i("div",null,[u,n("p",null,[s("在"),n("a",r,[s("基于OpenCV实现图像哈希算法"),t(a)]),s("一文中描述了如何通过OpenCV实现图像哈希算法。进一步我们可以基于图像哈希构建图像相似度对比算法（用图像哈希构建相似度对比算法精度不高，粗略筛选还是可以用的）。")]),k,d,m,n("p",null,[s("本文通过Python实现图像相似度对比算法，C++版本直接按流程重构代码即可。此外需要OpenCV4 contrib 版本，关于OpenCV-Contrib安装见"),n("a",v,[s("OpenCV_contrib库在windows下编译使用指南"),t(a)]),s("。")]),h,n("ul",null,[n("li",null,[n("a",b,[s("基于OpenCV实现图像哈希算法"),t(a)])]),n("li",null,[n("a",g,[s("OpenCV_contrib库在windows下编译使用指南"),t(a)])])])])}const j=p(l,[["render",_],["__file","2021-08-04-_图像处理_ 基于图像哈希构建图像相似度对比算法.html.vue"]]);export{j as default};
