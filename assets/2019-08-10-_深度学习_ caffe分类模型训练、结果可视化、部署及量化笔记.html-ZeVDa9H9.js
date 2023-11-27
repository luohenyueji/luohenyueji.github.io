import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as i,a as n,b as s,d as t,e}from"./app-MsA2k2kn.js";const c={},u=e(`<h1 id="深度学习-caffe分类模型训练、结果可视化、部署及量化笔记" tabindex="-1"><a class="header-anchor" href="#深度学习-caffe分类模型训练、结果可视化、部署及量化笔记" aria-hidden="true">#</a> [深度学习] caffe分类模型训练、结果可视化、部署及量化笔记</h1><p>本文为本人caffe分类网络训练、结果可视化、部署及量化具体过程的心得笔记。caffe目前官方已经停止支持了，但是caffe是目前工业落地最常用的深度学习框架，用的人挺多。其实主要怕自己忘了，弄个备份，弄caffe很久了，怕不用东西都忘了，但是本文主要是讲述caffe下的分类网络。caffe默认已经配置好了，而且尽可能是linux系统，本文基于ubuntu18系统。如果有错误，希望积极指正。</p><h2 id="_1-训练" tabindex="-1"><a class="header-anchor" href="#_1-训练" aria-hidden="true">#</a> 1 训练</h2><h3 id="_1-1-数据准备" tabindex="-1"><a class="header-anchor" href="#_1-1-数据准备" aria-hidden="true">#</a> 1.1 数据准备</h3><p>首先在caffe/data路径建立example_data文件夹，在example_data里建立三个文件夹。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808153723769.png" alt="在这里插入图片描述" loading="lazy"> train文件为训练文件数据，val为验证文件数据，dataSet为最后生成caffe所用数据存放文件夹。这里准备五类数据，分别放在文件夹0-4。标号必须为0到4。val文件夹也是一样的。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808154146203.png" alt="在这里插入图片描述" loading="lazy"> 0到4文件夹存放各类图像，各类图像编号类似如下：<img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808164240294.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 然后调用label.py创建数据集标签名，分别在train目录和val目录生成数据集标签文件，创建数据集的txt文件，如果是训练集命名为train.txt，如果是验证集命名为val.txt。label.py代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os 
<span class="token comment">## 各类分类文件夹名</span>
dealPaths<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;4&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 创建数据集的txt文件，如果是训练集命名为train.txt如果是验证集命名为val.txt</span>
imageData<span class="token operator">=</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;imageData.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> dealPath <span class="token keyword">in</span> dealPaths<span class="token punctuation">:</span>
    <span class="token keyword">for</span> filename <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>dealPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        imageData<span class="token punctuation">.</span>write<span class="token punctuation">(</span>filename<span class="token operator">+</span><span class="token string">&#39; &#39;</span><span class="token operator">+</span>dealPath<span class="token operator">+</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
        
imageData<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的数据标签文件如下，这个数据标签文件包含所有训练集图像数据标签，图像必须是jpg文件。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808164923269.png" alt="在这里插入图片描述" loading="lazy"> 然后将所有单个分类也就是0到4文件夹里面的数据放入一个文件夹。这里通过imageMove.py将所有图像移动到自己设定的set文件夹。但是如果是训练数据集，将set文件夹重命名为imageTrain，然后上一步得到的train.txt文件移动到imageTrain里面，然后将验证集数据集得到的set文件夹重命名为imageVal，把上一部得到的val.txt移动到imageVal文件夹里面。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> os
<span class="token keyword">import</span> shutil

movePaths<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;4&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 保存的文件夹</span>
dstPath<span class="token operator">=</span><span class="token string">&#39;set&#39;</span>
os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>dstPath<span class="token punctuation">,</span>exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

imageCount<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">for</span> movePath <span class="token keyword">in</span> movePaths<span class="token punctuation">:</span>
    imageCount<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>movePath<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;current path is {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>movePath<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> filename <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>movePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        srcFile<span class="token operator">=</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>movePath<span class="token punctuation">,</span>filename<span class="token punctuation">)</span>
        dstFile<span class="token operator">=</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>dstPath<span class="token punctuation">,</span>filename<span class="token punctuation">)</span>
        shutil<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>srcFile<span class="token punctuation">,</span>dstFile<span class="token punctuation">)</span>
        
<span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>dstPath<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>imageCount<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;move sucess!&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于建立图像训练集可能会出现jpg文件损坏以及其他问题，一些小工具可以见：</p><blockquote><p>https://blog.csdn.net/LuohenYJ/article/details/86574451</p></blockquote><h3 id="_1-2-创建lmdb文件" tabindex="-1"><a class="header-anchor" href="#_1-2-创建lmdb文件" aria-hidden="true">#</a> 1.2 创建lmdb文件</h3><p>将上一节得到的imageTrain文件夹和imageVal文件夹移动到dataSet目录。如下所示： 其中create_data.sh用于创建lmbdb文件，make_data_mean.sh用于创建均值文件。首先在caffe根目录下运行create_data.sh文件，命令如下： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808170404250.png" alt="在这里插入图片描述" loading="lazy"> create_data.sh脚本具体内容如下，具体要改的参数都有标明，都是在caffe目录下使用相对路径名，绝对路径名容易出错。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env sh</span>
<span class="token comment">## Create the imagenet lmdb inputs</span>
<span class="token comment">## N.B. set the path to the imagenet train + val data dirs</span>
<span class="token builtin">set</span> <span class="token operator">-</span>e

<span class="token comment">## 数据文件根目录</span>
EXAMPLE<span class="token operator">=</span>data<span class="token operator">/</span>example_data
<span class="token comment">## 数据文件目录</span>
DATA<span class="token operator">=</span>data<span class="token operator">/</span>example_data<span class="token operator">/</span>dataSet
<span class="token comment">## 生成lmdb文件所用到目录</span>
TOOLS<span class="token operator">=</span>build<span class="token operator">/</span>tools

<span class="token comment">## 生成的train.val的lmdb文件保存目录</span>
TRAIN_DATA_ROOT<span class="token operator">=</span>data<span class="token operator">/</span>example_data<span class="token operator">/</span>dataSet<span class="token operator">/</span>imageTrain<span class="token operator">/</span>
VAL_DATA_ROOT<span class="token operator">=</span>data<span class="token operator">/</span>example_data<span class="token operator">/</span>dataSet<span class="token operator">/</span>imageVal<span class="token operator">/</span>

<span class="token comment">## Set RESIZE=true to resize the images to 256x256. Leave as false if images have</span>
<span class="token comment">## already been resized using another tool.</span>
RESIZE<span class="token operator">=</span>true
<span class="token comment">## 改一改深度学习模型要求输入图像的大小</span>
<span class="token keyword">if</span> $RESIZE<span class="token punctuation">;</span> then
  RESIZE_HEIGHT<span class="token operator">=</span><span class="token number">227</span>
  RESIZE_WIDTH<span class="token operator">=</span><span class="token number">227</span>
<span class="token keyword">else</span>
  RESIZE_HEIGHT<span class="token operator">=</span><span class="token number">0</span>
  RESIZE_WIDTH<span class="token operator">=</span><span class="token number">0</span>
fi

<span class="token keyword">if</span> <span class="token punctuation">[</span> ! <span class="token operator">-</span>d <span class="token string">&quot;$TRAIN_DATA_ROOT&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> then
  echo <span class="token string">&quot;Error: TRAIN_DATA_ROOT is not a path to a directory: $TRAIN_DATA_ROOT&quot;</span>
  echo <span class="token string">&quot;Set the TRAIN_DATA_ROOT variable in create_imagenet.sh to the path&quot;</span> \\
       <span class="token string">&quot;where the ImageNet training data is stored.&quot;</span>
  exit <span class="token number">1</span>
fi

<span class="token keyword">if</span> <span class="token punctuation">[</span> ! <span class="token operator">-</span>d <span class="token string">&quot;$VAL_DATA_ROOT&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> then
  echo <span class="token string">&quot;Error: VAL_DATA_ROOT is not a path to a directory: $VAL_DATA_ROOT&quot;</span>
  echo <span class="token string">&quot;Set the VAL_DATA_ROOT variable in create_imagenet.sh to the path&quot;</span> \\
       <span class="token string">&quot;where the ImageNet validation data is stored.&quot;</span>
  exit <span class="token number">1</span>
fi

echo <span class="token string">&quot;Creating train lmdb...&quot;</span>

GLOG_logtostderr<span class="token operator">=</span><span class="token number">1</span> $TOOLS<span class="token operator">/</span>convert_imageset \\
    <span class="token operator">-</span><span class="token operator">-</span>resize_height<span class="token operator">=</span>$RESIZE_HEIGHT \\
    <span class="token operator">-</span><span class="token operator">-</span>resize_width<span class="token operator">=</span>$RESIZE_WIDTH \\
    <span class="token comment">## 打乱图像</span>
    <span class="token operator">-</span><span class="token operator">-</span>shuffle<span class="token operator">=</span>true \\
    $TRAIN_DATA_ROOT \\
    <span class="token comment">## 训练集文件标签</span>
    $DATA<span class="token operator">/</span>imageTrain<span class="token operator">/</span>train<span class="token punctuation">.</span>txt \\
    $EXAMPLE<span class="token operator">/</span>example_data_train_lmdb

echo <span class="token string">&quot;Creating val lmdb...&quot;</span>

GLOG_logtostderr<span class="token operator">=</span><span class="token number">1</span> $TOOLS<span class="token operator">/</span>convert_imageset \\
    <span class="token operator">-</span><span class="token operator">-</span>resize_height<span class="token operator">=</span>$RESIZE_HEIGHT \\
    <span class="token operator">-</span><span class="token operator">-</span>resize_width<span class="token operator">=</span>$RESIZE_WIDTH \\
    <span class="token operator">-</span><span class="token operator">-</span>shuffle \\
    $VAL_DATA_ROOT \\
    <span class="token comment">## 测试集文件标签</span>
    $DATA<span class="token operator">/</span>imageVal<span class="token operator">/</span>val<span class="token punctuation">.</span>txt \\
    $EXAMPLE<span class="token operator">/</span>example_data_val_lmdb

echo <span class="token string">&quot;Done.&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成lmdb文件后，然后生成均值文件也就是example_data_mean.binaryproto文件</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env sh</span>
<span class="token comment">## Compute the mean image from the imagenet training lmdb</span>
<span class="token comment">## N.B. this is available in data/ilsvrc12</span>
<span class="token comment">## 和前面一样</span>
EXAMPLE<span class="token operator">=</span>data<span class="token operator">/</span>example_data
DATA<span class="token operator">=</span>data<span class="token operator">/</span>example_data
TOOLS<span class="token operator">=</span>build<span class="token operator">/</span>tools

$TOOLS<span class="token operator">/</span>compute_image_mean $EXAMPLE<span class="token operator">/</span>example_data_train_lmdb \\
  $DATA<span class="token operator">/</span>example_data_mean<span class="token punctuation">.</span>binaryproto

echo <span class="token string">&quot;Done.&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们会得到均值数据文件，分别是BGR通道训练样本均值。记得把这三个值记一下以后要用到。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808171456251.png" alt="在这里插入图片描述" loading="lazy"> 所得到的文件lmdb和均值文件可以在example_data根目录下找到。训练模型用这三个文件就行了。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808171346570.png" alt="在这里插入图片描述" loading="lazy"></p><h3 id="_1-3-模型训练" tabindex="-1"><a class="header-anchor" href="#_1-3-模型训练" aria-hidden="true">#</a> 1.3 模型训练</h3><p>训练时还需要solver文件来对参数进行更新， 同时还需要网络结构文件。在caffe/examples下建立example_data文件夹下进行训练。将前面的lmdb文件和均值文件复制到改文件夹下，如下图所示。橙色框选的文件是上步所获得的，红色框选的文件是网络结构参数文件和调参文件。backup是生成用于保存训练模型的文件夹，caffe.log是训练时生成的日志文件。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808192523910.png" alt="在这里插入图片描述" loading="lazy"> solver文件就用示例的配置alexnet文件。solver文件主要参数搜索就用，其中net值得是模型结构文件路径，训练习惯以caffe为根目录，snapshot_prefix为模型保存目录。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 网络结构地址</span>
net<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/alexnet_train_val.prototxt&quot;</span>
test_iter<span class="token punctuation">:</span> <span class="token number">200</span>
test_interval<span class="token punctuation">:</span> <span class="token number">200</span>
base_lr<span class="token punctuation">:</span> <span class="token number">0.0001</span>
lr_policy<span class="token punctuation">:</span> <span class="token string">&quot;step&quot;</span>
gamma<span class="token punctuation">:</span> <span class="token number">0.1</span>
stepsize<span class="token punctuation">:</span> <span class="token number">1000</span>
display<span class="token punctuation">:</span> <span class="token number">100</span>
max_iter<span class="token punctuation">:</span> <span class="token number">3000</span>
momentum<span class="token punctuation">:</span> <span class="token number">0.9</span>
weight_decay<span class="token punctuation">:</span> <span class="token number">0.0005</span>
snapshot<span class="token punctuation">:</span> <span class="token number">1000</span>
<span class="token comment">## 模型保存文件</span>
snapshot_prefix<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/backup/&quot;</span>
solver_mode<span class="token punctuation">:</span> GPU
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于train_val模型文件，有两部分需要改，第一部分是开头的data文件，需要配置lmdb文件，train和val都配置。其次是均值部分，一种方法是类似配置lmdb文件一样，设定mean_file路径，另外一种是直接给出均值，把前面BGR均值用mean_value:给出。batch_size的修改具体见搜索。lmdb图像输入大小需要和crop_size对应。如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>name<span class="token punctuation">:</span> <span class="token string">&quot;AlexNet&quot;</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  include <span class="token punctuation">{</span>
    phase<span class="token punctuation">:</span> TRAIN
  <span class="token punctuation">}</span>
  transform_param <span class="token punctuation">{</span>
    mirror<span class="token punctuation">:</span> true
    crop_size<span class="token punctuation">:</span> <span class="token number">227</span>
    mean_file<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_mean.binaryproto&quot;</span>
    <span class="token comment">#mean_value: 85.0205</span>
    <span class="token comment">#mean_value: 85.0205</span>
    <span class="token comment">#mean_value: 85.0205</span>
  <span class="token punctuation">}</span>
  data_param <span class="token punctuation">{</span>
    source<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_train_lmdb&quot;</span>
    batch_size<span class="token punctuation">:</span> <span class="token number">4</span>
    backend<span class="token punctuation">:</span> LMDB
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  include <span class="token punctuation">{</span>
    phase<span class="token punctuation">:</span> TEST
  <span class="token punctuation">}</span>
  transform_param <span class="token punctuation">{</span>
    mirror<span class="token punctuation">:</span> false
    crop_size<span class="token punctuation">:</span> <span class="token number">227</span>
    mean_file<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_mean.binaryproto&quot;</span>
    <span class="token comment">#mean_value: 85.0205</span>
    <span class="token comment">#mean_value: 85.0205</span>
    <span class="token comment">#mean_value: 85.0205</span>
  <span class="token punctuation">}</span>
  data_param <span class="token punctuation">{</span>
    source<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_val_lmdb&quot;</span>
    batch_size<span class="token punctuation">:</span> <span class="token number">8</span>
    backend<span class="token punctuation">:</span> LMDB
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一个要改的就是结尾的num_output，将最后一个num_output改为分类个数，本文有5类所以num_output:5</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;conv10&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Convolution&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;fire9/concat&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;conv10&quot;</span>
  convolution_param <span class="token punctuation">{</span>
  	<span class="token comment">## 输出，按照分类个数确定</span>
    num_output<span class="token punctuation">:</span> <span class="token number">5</span>
    kernel_size<span class="token punctuation">:</span> <span class="token number">1</span>
    weight_filler <span class="token punctuation">{</span>
      <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;gaussian&quot;</span>
      mean<span class="token punctuation">:</span> <span class="token number">0.0</span>
      std<span class="token punctuation">:</span> <span class="token number">0.01</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;relu_conv10&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;ReLU&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;conv10&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;conv10&quot;</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;pool10&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Pooling&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;conv10&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;pool10&quot;</span>
  pooling_param <span class="token punctuation">{</span>
    pool<span class="token punctuation">:</span> AVE
    global_pooling<span class="token punctuation">:</span> true
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;loss&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;SoftmaxWithLoss&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;pool10&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;loss&quot;</span>
  <span class="token comment">#include {</span>
  <span class="token comment">##  phase: TRAIN</span>
  <span class="token comment">#}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;accuracy&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Accuracy&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;pool10&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;accuracy&quot;</span>
  <span class="token comment">#include {</span>
  <span class="token comment">##  phase: TEST</span>
  <span class="token comment">#}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后进行训练时还是在caffe根目录下输入以下指令。第一个训练指令就是直接训练文件，输出结果打印在命令行。推荐用第二个训练命令，在结果打印在命令行同时，也将结果保存为log日志文件方便以后分析使用。其中-solver表示训练参数，后面跟训练参数文件。如果用到gpu设置 -gpu=0选择用哪个gpu。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">.</span><span class="token operator">/</span>build<span class="token operator">/</span>tools<span class="token operator">/</span>caffe train <span class="token operator">-</span>solver examples<span class="token operator">/</span>example_data<span class="token operator">/</span>alexnet_solver<span class="token punctuation">.</span>prototxt 

<span class="token punctuation">.</span><span class="token operator">/</span>build<span class="token operator">/</span>tools<span class="token operator">/</span>caffe train <span class="token operator">-</span>solver examples<span class="token operator">/</span>example_data<span class="token operator">/</span>alexnet_solver<span class="token punctuation">.</span>prototxt <span class="token number">2</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token operator">|</span> tee examples<span class="token operator">/</span>example_data<span class="token operator">/</span>caffe<span class="token punctuation">.</span>log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一种训练方式，就是用已有模型进行微调 finetune。如果你不是自己设计模型，这种方式比直接训练要好得多。比如获得squeezenet的solver.prototxt，train_val.prototxt以及模型文件。类似前面直接训练修改solver.protoxt，train_val.prototxt。对于train_val.prototxt修改，只需要修改source处data文件，由于是用别人的模型微调不要改mean值，直接用人家的mean值不要用自己的mean值。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  include <span class="token punctuation">{</span>
    phase<span class="token punctuation">:</span> TRAIN
  <span class="token punctuation">}</span>
  transform_param <span class="token punctuation">{</span>
    crop_size<span class="token punctuation">:</span> <span class="token number">227</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">104</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">117</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">123</span>
  <span class="token punctuation">}</span>
  data_param <span class="token punctuation">{</span>
    source<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_train_lmdb&quot;</span>
    batch_size<span class="token punctuation">:</span> <span class="token number">32</span>
    backend<span class="token punctuation">:</span> LMDB
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  include <span class="token punctuation">{</span>
    phase<span class="token punctuation">:</span> TEST
  <span class="token punctuation">}</span>
  transform_param <span class="token punctuation">{</span>
    crop_size<span class="token punctuation">:</span> <span class="token number">227</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">104</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">117</span>
    mean_value<span class="token punctuation">:</span> <span class="token number">123</span>
  <span class="token punctuation">}</span>
  data_param <span class="token punctuation">{</span>
    source<span class="token punctuation">:</span> <span class="token string">&quot;examples/example_data/example_data_train_lmdb&quot;</span>
    batch_size<span class="token punctuation">:</span> <span class="token number">25</span> <span class="token comment">#not *iter_size</span>
    backend<span class="token punctuation">:</span> LMDB
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于train_val最后的输出，如果想微调的层就把名字改了，一般都是从后往前改。名字不改的层就不会训练。loss和accuray层不需要改，由于不需要top5输出。accuracy_top5层就被删除了。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>layer <span class="token punctuation">{</span>
  <span class="token comment">#原来是conv10</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;conv10_example&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Convolution&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;fire9/concat&quot;</span>
  <span class="token comment">#原来是conv10</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;conv10_example&quot;</span>
  convolution_param <span class="token punctuation">{</span>
    num_output<span class="token punctuation">:</span> <span class="token number">5</span>
    kernel_size<span class="token punctuation">:</span> <span class="token number">1</span>
    weight_filler <span class="token punctuation">{</span>
      <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;gaussian&quot;</span>
      mean<span class="token punctuation">:</span> <span class="token number">0.0</span>
      std<span class="token punctuation">:</span> <span class="token number">0.01</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  <span class="token comment">#原来是relu_conv10</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;relu_conv10_example&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;ReLU&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;conv10_example&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;conv10_example&quot;</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  <span class="token comment">#原来是pool10</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;pool10_example&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Pooling&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;conv10_example&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;pool10_example&quot;</span>
  pooling_param <span class="token punctuation">{</span>
    pool<span class="token punctuation">:</span> AVE
    global_pooling<span class="token punctuation">:</span> true
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;loss&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;SoftmaxWithLoss&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;pool10_example&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;loss&quot;</span>
  <span class="token comment">#include {</span>
  <span class="token comment">##  phase: TRAIN</span>
  <span class="token comment">#}</span>
<span class="token punctuation">}</span>
layer <span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">&quot;accuracy&quot;</span>
  <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token string">&quot;Accuracy&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;pool10_example&quot;</span>
  bottom<span class="token punctuation">:</span> <span class="token string">&quot;label&quot;</span>
  top<span class="token punctuation">:</span> <span class="token string">&quot;accuracy&quot;</span>
  <span class="token comment">#include {</span>
  <span class="token comment">##  phase: TEST</span>
  <span class="token comment">#}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用参数如下，只是加了weight命令，指向微调网络的模型。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">.</span><span class="token operator">/</span>build<span class="token operator">/</span>tools<span class="token operator">/</span>caffe train <span class="token operator">-</span>solver examples<span class="token operator">/</span>example_data<span class="token operator">/</span>solver<span class="token punctuation">.</span>prototxt <span class="token operator">-</span>weights examples<span class="token operator">/</span>example_data<span class="token operator">/</span>squeezenet_v1<span class="token punctuation">.</span><span class="token number">1</span><span class="token punctuation">.</span>caffemodel <span class="token number">2</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span><span class="token number">1</span><span class="token operator">|</span> tee examples<span class="token operator">/</span>example_data<span class="token operator">/</span>caffe<span class="token punctuation">.</span>log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从训练日志可以看到，训练时会忽视名字改动的层，进行微调。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190808202030178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 训练结束后，可以对训练好的模型进行Testing。还是在caffe根目录下输入以下命令进行测试。model表示模型结构参数文件，weights表示模型权重文件路径。会输出当前模型在test数据下准确率和loss。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">.</span><span class="token operator">/</span>build<span class="token operator">/</span>tools<span class="token operator">/</span>caffe test <span class="token operator">-</span>model examples<span class="token operator">/</span>example_data<span class="token operator">/</span>train_val<span class="token punctuation">.</span>prototxt <span class="token operator">-</span>weights examples<span class="token operator">/</span>example_data<span class="token operator">/</span>backup<span class="token operator">/</span>solver_iter_100<span class="token punctuation">.</span>caffemodel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-4-训练部分参考文件" tabindex="-1"><a class="header-anchor" href="#_1-4-训练部分参考文件" aria-hidden="true">#</a> 1.4 训练部分参考文件</h3><p>除了官方文件外，参考的内容有：</p>`,35),r={href:"https://www.cnblogs.com/wktwj/p/6715110.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/cham_3/article/details/72141753",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/hongbin_xu/article/details/79363134",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/u014381600/article/details/54428599",target:"_blank",rel:"noopener noreferrer"},v={href:"https://zhuanlan.zhihu.com/p/48462756",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/u010402786/article/details/70141261",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.cnblogs.com/louyihang-loves-baiyan/p/5038758.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.csdn.net/Angela_qin/article/details/79428987",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/nongfu_spring/article/details/51514040",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/d5224/article/details/77100268",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/SnailTyan/caffe-model-zoo",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/mrgloom/kaggle-dogs-vs-cats-solution",target:"_blank",rel:"noopener noreferrer"},x=e(`<h2 id="_2-结果可视化" tabindex="-1"><a class="header-anchor" href="#_2-结果可视化" aria-hidden="true">#</a> 2 结果可视化</h2><h3 id="_2-1-训练数据展示" tabindex="-1"><a class="header-anchor" href="#_2-1-训练数据展示" aria-hidden="true">#</a> 2.1 训练数据展示</h3><p>在caffe的训练过程中，需要图形化训练数据结果。caffe中自带了工具显示结果。在examples/example_data下建立analyze文件，然后把训练过程生成的caffe.log移动到该文件夹。然后将caffe根目录tools/extra文件夹下的extract_seconds.py、parse_log.py、parse_log.sh和plot_training_log.py.example文件移动到该文件夹下。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809094044741.png" alt="在这里插入图片描述" loading="lazy"> 在analyze当前目录下输入以下指令就可以可视化训练日志</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">.</span><span class="token operator">/</span>plot_training_log<span class="token punctuation">.</span>py<span class="token punctuation">.</span>example <span class="token number">0</span>  save<span class="token punctuation">.</span>png caffe<span class="token punctuation">.</span>log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面0表示可视化的类型，save.png表示可视化保存的图像名，caffe.log表示日志文件。 可视化类型具体参数如下。0、1、2等序号表示可视化类型，vs为横坐标参数，vs右边为纵坐标参数</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>    <span class="token number">0</span><span class="token punctuation">:</span> Test accuracy  vs<span class="token punctuation">.</span> Iters
    <span class="token number">1</span><span class="token punctuation">:</span> Test accuracy  vs<span class="token punctuation">.</span> Seconds
    <span class="token number">2</span><span class="token punctuation">:</span> Test loss  vs<span class="token punctuation">.</span> Iters
    <span class="token number">3</span><span class="token punctuation">:</span> Test loss  vs<span class="token punctuation">.</span> Seconds
    <span class="token number">4</span><span class="token punctuation">:</span> Train learning rate  vs<span class="token punctuation">.</span> Iters
    <span class="token number">5</span><span class="token punctuation">:</span> Train learning rate  vs<span class="token punctuation">.</span> Seconds
    <span class="token number">6</span><span class="token punctuation">:</span> Train loss  vs<span class="token punctuation">.</span> Iters
    <span class="token number">7</span><span class="token punctuation">:</span> Train loss  vs<span class="token punctuation">.</span> Seconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>绘图结果如下： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809095136228.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 这种方法所画出来的图每次都是随机样式且无法定制参数。如果要定制可视化图像，在analyze当前目录下，输入以下参数提取log文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token punctuation">.</span><span class="token operator">/</span>parse_log<span class="token punctuation">.</span>py caffe<span class="token punctuation">.</span>log <span class="token punctuation">.</span><span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样将得到以下两个文件，分别表示训练数据和测试数据</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>caffe<span class="token punctuation">.</span>log<span class="token punctuation">.</span>train
caffe<span class="token punctuation">.</span>log<span class="token punctuation">.</span>test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法和前面可视化命令都会得到这两个文件，但是实质内容有所区别。通过parse_log.py得到的文件内容更规则。如caffe.log.test具体内容如下： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809100419856.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 然后在当前文件夹下建立drawCaffe.py文件可视化训练log。drawCaffe.py内容如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token comment">#训练文件</span>
train_log <span class="token operator">=</span> pd<span class="token punctuation">.</span>read_csv<span class="token punctuation">(</span><span class="token string">&quot;caffe.log.train&quot;</span><span class="token punctuation">)</span>
<span class="token comment">#测试文件</span>
test_log <span class="token operator">=</span> pd<span class="token punctuation">.</span>read_csv<span class="token punctuation">(</span><span class="token string">&quot;caffe.log.test&quot;</span><span class="token punctuation">)</span>


_<span class="token punctuation">,</span> ax1 <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 可可视化参数NumIters,Seconds,LearningRate,accuracy,loss</span>
ax1<span class="token punctuation">.</span>set_title<span class="token punctuation">(</span><span class="token string">&quot;train loss and test loss&quot;</span><span class="token punctuation">)</span>
ax1<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>train_log<span class="token punctuation">[</span><span class="token string">&quot;NumIters&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> train_log<span class="token punctuation">[</span><span class="token string">&quot;loss&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span>
ax1<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>test_log<span class="token punctuation">[</span><span class="token string">&quot;NumIters&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> test_log<span class="token punctuation">[</span><span class="token string">&quot;loss&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span>
ax1<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>train_log<span class="token punctuation">[</span><span class="token string">&quot;NumIters&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> train_log<span class="token punctuation">[</span><span class="token string">&quot;accuracy&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span>
ax1<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>test_log<span class="token punctuation">[</span><span class="token string">&quot;NumIters&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> test_log<span class="token punctuation">[</span><span class="token string">&quot;accuracy&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span>

ax1<span class="token punctuation">.</span>set_xlabel<span class="token punctuation">(</span><span class="token string">&#39;NumIters&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>legend<span class="token punctuation">(</span>loc<span class="token operator">=</span><span class="token string">&#39;best&#39;</span><span class="token punctuation">)</span>

<span class="token comment">## 保存图像</span>
plt<span class="token punctuation">.</span>savefig<span class="token punctuation">(</span><span class="token string">&quot;save.png&quot;</span><span class="token punctuation">,</span> dpi<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

dfTrain<span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span>data<span class="token operator">=</span>train_log<span class="token punctuation">,</span> columns<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;NumIters&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;loss&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;accuracy&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
dfTest <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span>data<span class="token operator">=</span>test_log<span class="token punctuation">,</span> columns<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;NumIters&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;loss&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;accuracy&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

dfTrain<span class="token punctuation">.</span>to_csv<span class="token punctuation">(</span><span class="token string">&#39;train.csv&#39;</span><span class="token punctuation">)</span>
dfTest<span class="token punctuation">.</span>to_csv<span class="token punctuation">(</span><span class="token string">&#39;val.csv&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;done&quot;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过以上代码能够分析log文件，同时把训练参数结果保存为train.csv和val.csv。其他就是matplotlib美化图像。绘图结果如下： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809101320162.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h3 id="_2-2-网络模型可视化" tabindex="-1"><a class="header-anchor" href="#_2-2-网络模型可视化" aria-hidden="true">#</a> 2.2 网络模型可视化</h3><p>通过netscope可以可视化caffe模型。打开下面链接的网页，打开Editor，将网络结构的prototxt文件复制到网页左侧编辑框后，shift+enter，就可以直接显示网络结构。非常的简单和方便。同时将鼠标选中某层 将可视化其参数。</p><blockquote><p>http://ethereon.github.io/netscope/quickstart.html 如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809101922599.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p></blockquote><p>当然这种方式可视化很简单。但是目前深度学习网络框架很多，但不同框架之间可视化网络层方法差别。一个深度学习模型结构可视化神器Netron，可以直接可视化不同框架下网络的模型。Netron支持tf, caffe, keras,mxnet等多种框架模型的可视化，具体地址如下：</p><blockquote><p>https://github.com/lutzroeder/Netron</p></blockquote><p>Netron安装很简单，具体看官方例子。Netron使用也非常简单，View设置显示内容，点击具体某个层可以看到该层具体参数。通过File-export可是导出网络结构为png图像或者svg图像。Netron具体界面如下： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809103410955.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h3 id="_2-3-roc曲线绘制" tabindex="-1"><a class="header-anchor" href="#_2-3-roc曲线绘制" aria-hidden="true">#</a> 2.3 ROC曲线绘制</h3><h4 id="_2-3-1-二分类roc曲线绘制" tabindex="-1"><a class="header-anchor" href="#_2-3-1-二分类roc曲线绘制" aria-hidden="true">#</a> 2.3.1 二分类ROC曲线绘制</h4><p>ROC曲线中的主要两个指标就是真正率和假正率，。其中横坐标为假正率（FPR），纵坐标为真正率（TPR)。ROC用于评价模型的预测能力，基于混淆矩阵得出的。TPR越高，同时FPR越低（即ROC曲线越陡），那么模型的性能就越好。曲线下面积AOC（Area Under Curve）被定义为ROC曲线下的面积，使用AUC值作为评价标准是因为很多时候ROC曲线并不能清晰的说明哪个分类器的效果更好，而作为一个数值，对应AUC更大的分类器效果更好。 AUC的一般判断标准： 0.5 - 0.7：效果较低，但用于预测股票已经很不错了； 0.7 - 0.85：效果一般； 0.85 - 0.95：效果很好； 0.95 - 1：效果非常好，但一般不太可能。 本文主要通过sklearn.metrics中的roc_curve, auc函数，并通过opencv中的DNN模块调用caffe模型实现分类。主要计算ROC时，输入的是真实样本标签和判断为正样本的概率。二分类ROC曲线绘制python代码(caffe_roc.py)如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token triple-quoted-string string">&#39;&#39;&#39;
opencv调用caffe并计算roc
&#39;&#39;&#39;</span>
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token triple-quoted-string string">&#39;&#39;&#39;
opencv调用caffe并计算roc
&#39;&#39;&#39;</span>
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> os
<span class="token keyword">from</span> sklearn <span class="token keyword">import</span> metrics


<span class="token comment">## 真实图像标签为0的图像路径</span>
imagePath_0 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 真实图像标签为1的图像路径</span>
imagePath_1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">]</span>

<span class="token comment">## 正类标签</span>
poslabel <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">## 模型路径</span>
prototxtFile <span class="token operator">=</span> <span class="token string">&#39;deploy_227.prototxt&#39;</span>
modelFile <span class="token operator">=</span> <span class="token string">&#39;model_227.caffemodel&#39;</span>

<span class="token comment">## 真实分类结果</span>
trueResult <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">## 检测结果</span>
detectProbs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment">## 图像检测</span>


<span class="token keyword">def</span> <span class="token function">detectCaffe</span><span class="token punctuation">(</span>srcImg<span class="token punctuation">)</span><span class="token punctuation">:</span>
    detectImg <span class="token operator">=</span> srcImg<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
    blob <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>blobFromImage<span class="token punctuation">(</span>
        detectImg<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">227</span><span class="token punctuation">,</span> <span class="token number">227</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">92.713</span><span class="token punctuation">,</span> <span class="token number">106.446</span><span class="token punctuation">,</span> <span class="token number">118.115</span><span class="token punctuation">)</span><span class="token punctuation">,</span> swapRB<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

    net <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>readNetFromCaffe<span class="token punctuation">(</span>prototxtFile<span class="token punctuation">,</span> modelFile<span class="token punctuation">)</span>

    net<span class="token punctuation">.</span>setInput<span class="token punctuation">(</span>blob<span class="token punctuation">)</span>
    detections <span class="token operator">=</span> net<span class="token punctuation">.</span>forward<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 分类结果</span>
    order <span class="token operator">=</span> detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>argmax<span class="token punctuation">(</span><span class="token punctuation">)</span>
    prob <span class="token operator">=</span> detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token builtin">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">#print(&#39;the predict class is:&#39;,order)</span>
    <span class="token comment">#print(&#39;the positive class prob is: &#39;, prob)</span>
    <span class="token comment">## 返回分类结果和概率</span>
    <span class="token keyword">return</span> order<span class="token punctuation">,</span> prob

<span class="token comment">## 图像检测</span>


<span class="token keyword">def</span> <span class="token function">imageDetect</span><span class="token punctuation">(</span>detectImagePath<span class="token punctuation">,</span> trueLabel<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> imageFileName <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>detectImagePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        imageFilePath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>detectImagePath<span class="token punctuation">,</span> imageFileName<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current detect image is: &quot;</span><span class="token punctuation">,</span> imageFileName<span class="token punctuation">)</span>
        srcImg <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imageFilePath<span class="token punctuation">)</span>
        <span class="token keyword">if</span> srcImg <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;error image is: &quot;</span><span class="token punctuation">,</span> imageFilePath<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        detectOrder<span class="token punctuation">,</span> detectProb <span class="token operator">=</span> detectCaffe<span class="token punctuation">(</span>srcImg<span class="token punctuation">)</span>
        trueResult<span class="token punctuation">.</span>append<span class="token punctuation">(</span>trueLabel<span class="token punctuation">)</span>
        <span class="token comment">## 如果正样本编号和检测结果标签一致直接保存分类概率</span>
        <span class="token keyword">if</span> detectOrder <span class="token operator">==</span> poslabel<span class="token punctuation">:</span>
            detectProbs<span class="token punctuation">.</span>append<span class="token punctuation">(</span>detectProb<span class="token punctuation">)</span>
        <span class="token comment">## 如果不一致保存正样本的分类概率</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            detectProbs<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">-</span>detectProb<span class="token punctuation">)</span>


<span class="token comment">## 画ROC图，输入真实标签，正样本模型分类概率，正样本编号</span>
<span class="token keyword">def</span> <span class="token function">drawROC</span><span class="token punctuation">(</span>trueResult<span class="token punctuation">,</span> detectProbs<span class="token punctuation">,</span> poslabel<span class="token punctuation">)</span><span class="token punctuation">:</span>
    fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> thresholds <span class="token operator">=</span> metrics<span class="token punctuation">.</span>roc_curve<span class="token punctuation">(</span>
        trueResult<span class="token punctuation">,</span> detectProbs<span class="token punctuation">,</span> pos_label<span class="token operator">=</span>poslabel<span class="token punctuation">)</span>
    <span class="token comment">#auc = metrics.roc_auc_score(y, scores)</span>
    roc_auc <span class="token operator">=</span> metrics<span class="token punctuation">.</span>auc<span class="token punctuation">(</span>fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">)</span>

    <span class="token comment">## 计算约登指数Youden Index（TPR-FPR或者TPR+TNR-1）</span>
    tpr_fpr <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>tpr<span class="token operator">-</span>fpr<span class="token punctuation">)</span>
    bestIndex <span class="token operator">=</span> tpr_fpr<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token builtin">max</span><span class="token punctuation">(</span>tpr_fpr<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;约登指数为{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">max</span><span class="token punctuation">(</span>tpr_fpr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    tprBest <span class="token operator">=</span> tpr<span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
    fprBest <span class="token operator">=</span> fpr<span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
    thresholdsBest <span class="token operator">=</span> thresholds<span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;最佳约登指数阈值为:&quot;</span><span class="token punctuation">,</span> thresholdsBest<span class="token punctuation">)</span>

    <span class="token comment">## 假正率为横坐标，真正率为纵坐标做曲线</span>
    plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">&#39;darkorange&#39;</span><span class="token punctuation">,</span>
             label<span class="token operator">=</span><span class="token string">&#39;ROC curve (area = %0.2f)&#39;</span> <span class="token operator">%</span> roc_auc<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">&#39;navy&#39;</span><span class="token punctuation">,</span> linestyle<span class="token operator">=</span><span class="token string">&#39;--&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">#plt.xlim([0.0, 1.0])</span>
    <span class="token comment">#plt.ylim([0.0, 1.05])</span>
    plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&#39;False Positive Rate&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&#39;True Positive Rate&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;Receiver operating characteristic example&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>legend<span class="token punctuation">(</span>loc<span class="token operator">=</span><span class="token string">&quot;lower right&quot;</span><span class="token punctuation">)</span>
    <span class="token comment">## 画出约登指数最大值</span>
    plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>fprBest<span class="token punctuation">,</span> tprBest<span class="token punctuation">,</span> <span class="token string">&quot;ro&quot;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>savefig<span class="token punctuation">(</span><span class="token string">&quot;roc.png&quot;</span><span class="token punctuation">,</span> dpi<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> thresholds<span class="token punctuation">,</span> bestIndex


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 0标签图像遍历</span>
    <span class="token keyword">for</span> imagePath <span class="token keyword">in</span> imagePath_0<span class="token punctuation">:</span>
        imageDetect<span class="token punctuation">(</span>imagePath<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> imagePath <span class="token keyword">in</span> imagePath_1<span class="token punctuation">:</span>
        imageDetect<span class="token punctuation">(</span>imagePath<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token comment">## poslabel正例标签</span>
    fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> thresholds<span class="token punctuation">,</span> bestIndex <span class="token operator">=</span> drawROC<span class="token punctuation">(</span>
        trueResult<span class="token punctuation">,</span> detectProbs<span class="token punctuation">,</span> poslabel<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;fpr.npy&#39;</span><span class="token punctuation">,</span> fpr<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;tpr.npy&#39;</span><span class="token punctuation">,</span> tpr<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;thresholds&#39;</span><span class="token punctuation">,</span> thresholds<span class="token punctuation">)</span>
    <span class="token keyword">return</span> fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> thresholds


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span> thresholds <span class="token operator">=</span> main<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时计算约登指数Youden Index（TPR-FPR或者TPR+TNR-1），取使得约登指数最大的阈值为最佳阈值。二分类ROC曲线绘制结果如下图所示，area为AUC值。另外二分类ROC曲线detectProbs 用的是分类概率和真实标签对比绘制ROC曲线。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809181849755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h4 id="_2-3-2-多分类roc曲线绘制" tabindex="-1"><a class="header-anchor" href="#_2-3-2-多分类roc曲线绘制" aria-hidden="true">#</a> 2.3.2 多分类ROC曲线绘制</h4><p>由于ROC曲线是针对二分类的情况，对于多分类问题，先将分类标签转换为独热编码。比如n=3时标签转换为：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token number">0</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token number">100</span>
<span class="token number">1</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token number">010</span>
<span class="token number">2</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token number">001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多分类ROC曲线绘制有两种方法：</p><ol><li>每种类别下，都可以得到m个测试样本为该类别的概率（矩阵P中的列）。所以，根据概率矩阵P和标签矩阵L中对应的每一列，可以计算出各个阈值下的假正例率（FPR）和真正例率（TPR），从而绘制出一条ROC曲线。这样总共可以绘制出n条ROC曲线。最后对n条ROC曲线取平均，即可得到最终的ROC曲线。</li><li>首先，对于一个测试样本：1）标签只由0和1组成，1的位置表明了它的类别（可对应二分类问题中的‘’正’’），0就表示其他类别（‘’负‘’）；2）要是分类器对该测试样本分类正确，则该样本标签中1对应的位置在概率矩阵P中的值是大于0对应的位置的概率值的。基于这两点，将标签矩阵L和概率矩阵P分别按行展开，转置后形成两列，这就得到了一个二分类的结果。所以，此方法经过计算后可以直接得到最终的ROC曲线。</li></ol><p>上面的两个方法得到的ROC曲线是不同的，当然曲线下的面积AUC也是不一样的。 在python中，方法1和方法2分别对应sklearn.metrics.roc_auc_score函数中参数average值为&#39;macro&#39;和&#39;micro&#39;的情况。本文主要是应用方法2，方法1太麻烦。方法1可以见：</p><blockquote><p>https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html</p></blockquote><p>caffe下绘制多分类ROC曲线代码(caffe_roc_multi.cpp)如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token triple-quoted-string string">&#39;&#39;&#39;
opencv调用caffe并计算多分类roc
&#39;&#39;&#39;</span>
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> os
<span class="token keyword">from</span> sklearn <span class="token keyword">import</span> metrics
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>preprocessing <span class="token keyword">import</span> label_binarize


<span class="token comment">## 真实图像标签为0的图像路径</span>
imagePath_0 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 真实图像标签为1的图像路径</span>
imagePath_1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 真实图像标签2的图像路径</span>
imagePath_2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">]</span>

<span class="token comment">## 图像分类标签</span>
imageClass <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
<span class="token comment">## 图像分类颜色</span>
classColor <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;aqua&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;darkorange&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;cornflowerblue&#39;</span><span class="token punctuation">]</span>

<span class="token comment">## 模型路径</span>
prototxtFile <span class="token operator">=</span> <span class="token string">&#39;deploy.prototxt&#39;</span>
modelFile <span class="token operator">=</span> <span class="token string">&#39;model.caffemodel&#39;</span>

<span class="token comment">## 真实分类结果</span>
trueResult <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">## 检测分类结果</span>
detectResult <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment">## 最佳阈值结果</span>
thresholdsBest <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">*</span><span class="token builtin">len</span><span class="token punctuation">(</span>imageClass<span class="token punctuation">)</span>


<span class="token comment">## 图像检测</span>
<span class="token keyword">def</span> <span class="token function">detectCaffe</span><span class="token punctuation">(</span>srcImg<span class="token punctuation">)</span><span class="token punctuation">:</span>
    detectImg <span class="token operator">=</span> srcImg<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 自己输入均值</span>
    blob <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>blobFromImage<span class="token punctuation">(</span>
        detectImg<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">227</span><span class="token punctuation">,</span> <span class="token number">227</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">101.897</span><span class="token punctuation">,</span> <span class="token number">111.704</span><span class="token punctuation">,</span> <span class="token number">121.366</span><span class="token punctuation">)</span><span class="token punctuation">,</span> swapRB<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

    net <span class="token operator">=</span> cv2<span class="token punctuation">.</span>dnn<span class="token punctuation">.</span>readNetFromCaffe<span class="token punctuation">(</span>prototxtFile<span class="token punctuation">,</span> modelFile<span class="token punctuation">)</span>

    net<span class="token punctuation">.</span>setInput<span class="token punctuation">(</span>blob<span class="token punctuation">)</span>
    detections <span class="token operator">=</span> net<span class="token punctuation">.</span>forward<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 分类结果</span>
    order <span class="token operator">=</span> detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>argmax<span class="token punctuation">(</span><span class="token punctuation">)</span>
    prob <span class="token operator">=</span> detections<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token builtin">max</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">#print(&#39;the predict class is:&#39;,order)</span>
    <span class="token comment">#print(&#39;the predict class prob is: &#39;, prob)</span>
    <span class="token comment">## 返回分类结果和概率</span>
    <span class="token keyword">return</span> order<span class="token punctuation">,</span> prob

<span class="token comment">## 图像检测</span>
<span class="token keyword">def</span> <span class="token function">imageDetect</span><span class="token punctuation">(</span>detectImagePath<span class="token punctuation">,</span> trueLabel<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> imageFileName <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>detectImagePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        imageFilePath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>detectImagePath<span class="token punctuation">,</span> imageFileName<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current detect image is: &quot;</span><span class="token punctuation">,</span> imageFileName<span class="token punctuation">)</span>
        srcImg <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>imageFilePath<span class="token punctuation">)</span>
        <span class="token keyword">if</span> srcImg <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;error image is: &quot;</span><span class="token punctuation">,</span> imageFilePath<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        detectOrder<span class="token punctuation">,</span> detectProb <span class="token operator">=</span> detectCaffe<span class="token punctuation">(</span>srcImg<span class="token punctuation">)</span>
        trueResult<span class="token punctuation">.</span>append<span class="token punctuation">(</span>trueLabel<span class="token punctuation">)</span>
        <span class="token comment">## 如果真实标签和检测结果标签一直直接保存分类概率</span>
        detectResult<span class="token punctuation">.</span>append<span class="token punctuation">(</span>detectOrder<span class="token punctuation">)</span>


<span class="token comment">## 画ROC图，输入真实标签，模型分类标签</span>
<span class="token keyword">def</span> <span class="token function">drawROC</span><span class="token punctuation">(</span>trueResult<span class="token punctuation">,</span> detectResult<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 将图像标签二值化</span>
    trueResultBinary <span class="token operator">=</span> label_binarize<span class="token punctuation">(</span>trueResult<span class="token punctuation">,</span> classes<span class="token operator">=</span>imageClass<span class="token punctuation">)</span>
    detectResultBinary <span class="token operator">=</span> label_binarize<span class="token punctuation">(</span>detectResult<span class="token punctuation">,</span> classes<span class="token operator">=</span>imageClass<span class="token punctuation">)</span>

    <span class="token comment">## 计算每一类的ROC</span>
    fpr <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    tpr <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    roc_auc <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    thresholds <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 单独计算每一类ROC值</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>imageClass<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 提取第i类预测数据</span>
        fpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> tpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> thresholds<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> metrics<span class="token punctuation">.</span>roc_curve<span class="token punctuation">(</span>
            trueResultBinary<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> i<span class="token punctuation">]</span><span class="token punctuation">,</span> detectResultBinary<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        roc_auc<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> metrics<span class="token punctuation">.</span>auc<span class="token punctuation">(</span>fpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> tpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment">## Compute micro-average ROC curve and ROC area</span>
    <span class="token comment">## micro法计算总的roc</span>
    fprMicro<span class="token punctuation">,</span> tprMicro<span class="token punctuation">,</span> _ <span class="token operator">=</span> metrics<span class="token punctuation">.</span>roc_curve<span class="token punctuation">(</span>
        trueResultBinary<span class="token punctuation">.</span>ravel<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> detectResultBinary<span class="token punctuation">.</span>ravel<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">## 计算auc值</span>
    roc_aucMircro <span class="token operator">=</span> metrics<span class="token punctuation">.</span>auc<span class="token punctuation">(</span>fprMicro<span class="token punctuation">,</span> tprMicro<span class="token punctuation">)</span>

    plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 假正率为横坐标，真正率为纵坐标做曲线</span>
    plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>fprMicro<span class="token punctuation">,</span> tprMicro<span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">&#39;deeppink&#39;</span><span class="token punctuation">,</span> label<span class="token operator">=</span><span class="token string">&#39;ROC curve (area = {:0.2f})&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>roc_aucMircro<span class="token punctuation">)</span><span class="token punctuation">,</span>
             linestyle<span class="token operator">=</span><span class="token string">&#39;:&#39;</span><span class="token punctuation">,</span> linewidth<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">)</span>

    <span class="token comment">## 画出每一类的ROC曲线</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>imageClass<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>fpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> tpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> color<span class="token operator">=</span>classColor<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>
                 label<span class="token operator">=</span><span class="token string">&#39;ROC curve of class{} (area = {:0.2f})&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>
                     i<span class="token punctuation">,</span> roc_auc<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                 <span class="token punctuation">)</span>
        <span class="token comment">## 计算约登指数Youden Index（TPR-FPR或者TPR+TNR-1）</span>
        tpr_fpr <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>tpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-</span>fpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        bestIndex <span class="token operator">=</span> tpr_fpr<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token builtin">max</span><span class="token punctuation">(</span>tpr_fpr<span class="token punctuation">)</span><span class="token punctuation">)</span>
        tprBest <span class="token operator">=</span> tpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
        fprBest <span class="token operator">=</span> fpr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
        thresholdsBest<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> thresholds<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>bestIndex<span class="token punctuation">]</span>
        <span class="token comment">## 画出约登指数最大值</span>
        plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>fprBest<span class="token punctuation">,</span> tprBest<span class="token punctuation">,</span> <span class="token string">&quot;ro&quot;</span><span class="token punctuation">,</span> color<span class="token operator">=</span>classColor<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

    plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;k--&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&#39;False Positive Rate&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&#39;True Positive Rate&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;Some extension of Receiver operating characteristic to multi-class&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>legend<span class="token punctuation">(</span>loc<span class="token operator">=</span><span class="token string">&quot;best&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">## 保存图像</span>
    plt<span class="token punctuation">.</span>savefig<span class="token punctuation">(</span><span class="token string">&quot;multi_roc.png&quot;</span><span class="token punctuation">,</span> dpi<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span>trueResultBinary<span class="token punctuation">,</span>detectResultBinary


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 0标签图像遍历</span>
    <span class="token keyword">for</span> imagePath <span class="token keyword">in</span> imagePath_0<span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>imagePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        imageDetect<span class="token punctuation">(</span>imagePath<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> imagePath <span class="token keyword">in</span> imagePath_1<span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>imagePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        imageDetect<span class="token punctuation">(</span>imagePath<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> imagePath <span class="token keyword">in</span> imagePath_2<span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isdir<span class="token punctuation">(</span>imagePath<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        imageDetect<span class="token punctuation">(</span>imagePath<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

    fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span>trueResultBinary<span class="token punctuation">,</span>detectResultBinary <span class="token operator">=</span> drawROC<span class="token punctuation">(</span>trueResult<span class="token punctuation">,</span> detectResult<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;fpr.npy&#39;</span><span class="token punctuation">,</span> fpr<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;tpr.npy&#39;</span><span class="token punctuation">,</span> tpr<span class="token punctuation">)</span>
    np<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;thresholdsBest.npy&#39;</span><span class="token punctuation">,</span> thresholdsBest<span class="token punctuation">)</span>
    <span class="token keyword">return</span> fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span>trueResultBinary<span class="token punctuation">,</span>detectResultBinary


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    fpr<span class="token punctuation">,</span> tpr<span class="token punctuation">,</span>trueResultBinary<span class="token punctuation">,</span>detectResultBinary <span class="token operator">=</span> main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于单个分类曲线计算约登指数Youden Index（TPR-FPR或者TPR+TNR-1），取使得约登指数最大的阈值为最佳阈值。多分类ROC曲线绘制结果如下图所示，area为AUC值。另外多分类ROC曲线detectResult 用的是预测标签和真实标签对比绘制ROC曲线。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190809192312664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"></p><h3 id="_2-4-结果可视化部分参考文件" tabindex="-1"><a class="header-anchor" href="#_2-4-结果可视化部分参考文件" aria-hidden="true">#</a> 2.4 结果可视化部分参考文件</h3>`,35),w={href:"https://blog.csdn.net/u013078356/article/details/51154847",target:"_blank",rel:"noopener noreferrer"},R={href:"https://blog.csdn.net/zziahgf/article/details/79215862",target:"_blank",rel:"noopener noreferrer"},F={href:"http://ethereon.github.io/netscope/#/editor",target:"_blank",rel:"noopener noreferrer"},P={href:"https://github.com/lutzroeder/Netron",target:"_blank",rel:"noopener noreferrer"},T={href:"https://www.jianshu.com/p/82903edb58dc",target:"_blank",rel:"noopener noreferrer"},O={href:"https://www.cnblogs.com/dlml/p/4403482.html",target:"_blank",rel:"noopener noreferrer"},N={href:"https://blog.csdn.net/xyz1584172808/article/details/81839230",target:"_blank",rel:"noopener noreferrer"},C={href:"https://blog.csdn.net/YE1215172385/article/details/79443552",target:"_blank",rel:"noopener noreferrer"},z=e(`<h2 id="_3-部署和量化" tabindex="-1"><a class="header-anchor" href="#_3-部署和量化" aria-hidden="true">#</a> 3 部署和量化</h2><h3 id="_3-1-部署" tabindex="-1"><a class="header-anchor" href="#_3-1-部署" aria-hidden="true">#</a> 3.1 部署</h3><p>部署有三种推荐方式，OpenCV DNN模块调用caffe模型/mini-caffe/ncnn。本文主要介绍DNN调用caffe模型和ncnn。 OpenCV调用caffe模型代码(dnn_test.cpp)如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;pch.h&quot;
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;opencv2/dnn.hpp&gt; //dnn模块
#include &lt;time.h&gt;

using namespace std;
using namespace cv;
using namespace ::dnn; //调用DNN命名空间
clock_t start, finish;

String model_file = &quot;model/model.caffemodel&quot;; //模型结构文件
String model_text = &quot;model/deploy.prototxt&quot;;  //模型数据

//图像深度学习检测
double detect_NN(Mat detectImg, Net net)
{
	if (net.empty())
	{
		cout &lt;&lt; &quot;no model!&quot; &lt;&lt; endl;
		return -1;
	}

	//initialize images(输入图像初始化)
	Mat src = detectImg.clone();
	if (src.empty())
	{
		return -1;
	}

	//图像识别转换
	//第一个参数输入图像，第二个参数图像放缩大小，第三个参数输入图像尺寸,第四个参数模型训练图像三个通道RGB的均值（均值文件）
	start = clock();

	Mat inputBlob;

	//resize(src, src, Size(227, 227));
	// 参数分别为输入图像，归一化参数，模型大小，BGR均值
	inputBlob = blobFromImage(src, 1.0, Size(227, 227), Scalar(92.71, 106.44, 118.11));

	Mat prob; //输出结果
		//循环
	for (int i = 0; i &lt; 1; i++)
	{
		net.setInput(inputBlob, &quot;data&quot;);
		prob = net.forward(&quot;prob&quot;); //输出层2
	}
	Mat probMat = prob.reshape(1, 1); //转化为1行2列
	Point classNumber;				  //最大值的位置
	double classProb;
	//最大值多少
	//最大最小值查找，忽略最小值
	minMaxLoc(probMat, NULL, &amp;classProb, NULL, &amp;classNumber);
	int classidx = classNumber.x;
	printf(&quot;classidx is:%d\\n&quot;, classidx);
	printf(&quot;prob is %f\\n&quot;, classProb);
	finish = clock();
	double duration = (double)(finish - start);
	printf(&quot;run time is %f ms\\n&quot;, duration);
	return duration;
}

int main()
{
	Net net = readNetFromCaffe(model_text, model_file);
	Mat detectImg = imread(&quot;image/cat.jpg&quot;);
	double runTime = detect_NN(detectImg, net);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上只是caffe简单调用分类模型。其他网络调用可以参见以下链接：</p><blockquote><p>https://docs.opencv.org/4.1.1/d6/d0f/group__dnn.html https://blog.csdn.net/LuohenYJ/column/info/34751</p></blockquote><p>另外一种就是通过ncnn，ncnn调用已经写过博客，可以参见以下链接：</p><blockquote><p>https://github.com/Tencent/ncnn/wiki/ncnn-%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8C%97-alexnet https://blog.csdn.net/LuohenYJ/article/details/97031156</p></blockquote><p>实际ncnn使用参考ncnn在github/examples目录文件调用。地址如下： https://github.com/Tencent/ncnn/tree/master/examples 但是不管ncnn都需要输入模型均值，输入图像后要减去训练均值。如果不知道均值，只有binaryproto文件，可以建立mean.py读取binaryproto文件里面的信息,获得BGR均值。代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#coding=utf-8</span>
<span class="token keyword">import</span> caffe
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token comment">## 待转换的pb格式图像均值文件路径</span>
MEAN_PROTO_PATH <span class="token operator">=</span> <span class="token string">&#39;mean.binaryproto&#39;</span>
<span class="token comment">## 转换后的numpy格式图像均值文件路径</span>
MEAN_NPY_PATH <span class="token operator">=</span> <span class="token string">&#39;mean.npy&#39;</span>

<span class="token comment">## 创建protobuf blob</span>
blob <span class="token operator">=</span> caffe<span class="token punctuation">.</span>proto<span class="token punctuation">.</span>caffe_pb2<span class="token punctuation">.</span>BlobProto<span class="token punctuation">(</span><span class="token punctuation">)</span>           
<span class="token comment">## 读入mean.binaryproto文件内容</span>
data <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>MEAN_PROTO_PATH<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>         
<span class="token comment">## 解析文件内容到blob</span>
blob<span class="token punctuation">.</span>ParseFromString<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token comment">## 将blob中的均值转换成numpy格式，array的shape （mean_number，channel, hight, width）</span>
array <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>caffe<span class="token punctuation">.</span>io<span class="token punctuation">.</span>blobproto_to_array<span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 一个array中可以有多组均值存在，故需要通过下标选择其中一组均值</span>
mean_npy <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>mean_npy<span class="token punctuation">.</span>mean<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>mean<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
np<span class="token punctuation">.</span>save<span class="token punctuation">(</span>MEAN_NPY_PATH <span class="token punctuation">,</span>mean_npy<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-量化" tabindex="-1"><a class="header-anchor" href="#_3-2-量化" aria-hidden="true">#</a> 3.2 量化</h3><p>caffe模型太大，速度太慢。可通过float32转int8进行模型压缩和速度提升。量化的意思就是一般而言，神经网络模型的参数都是用的32bit长度的浮点型数表示，实际上不需要保留那么高的精度，可以通过量化，比如用0~255表示原来32个bit所表示的精度，通过牺牲精度来降低每一个权值所需要占用的空间。常用量化方法为int8量化，float 32进行int 8量化，能够使模型尺寸更小、推断更快、耗电更低。唯一的缺点，模型精度会下降。 int8量化主要方法可以见下图(图来自网上): <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190810100516419.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 本文主要在ncnn下实现caffe的int8量化。caffe的int8量化项目地址为：</p><blockquote><p>https://github.com/BUG1989/caffe-int8-convert-tools</p></blockquote><p>量化方法非常简单,首先</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>git clone https<span class="token punctuation">:</span><span class="token operator">//</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>BUG1989<span class="token operator">/</span>caffe<span class="token operator">-</span>int8<span class="token operator">-</span>convert<span class="token operator">-</span>tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后进入caffe-int8-convert-tools，把验证集和caffe模型参数放入该目录，输入以下命令实现量化：</p><div class="language-ptyhon line-numbers-mode" data-ext="ptyhon"><pre class="language-ptyhon"><code>python caffe-int8-convert-tool-dev-weight.py --proto=model/deploy.prototxt --model=model/deploy.caffemodel --mean 92.713 106.446 118.15 --images=val/ --output=model.table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>官方教程命令为：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>python caffe<span class="token operator">-</span>int8<span class="token operator">-</span>convert<span class="token operator">-</span>tool<span class="token operator">-</span>dev<span class="token operator">-</span>weight<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>proto<span class="token operator">=</span>test<span class="token operator">/</span>models<span class="token operator">/</span>mobilenet_v1<span class="token punctuation">.</span>prototxt <span class="token operator">-</span><span class="token operator">-</span>model<span class="token operator">=</span>test<span class="token operator">/</span>models<span class="token operator">/</span>mobilenet_v1<span class="token punctuation">.</span>caffemodel <span class="token operator">-</span><span class="token operator">-</span>mean <span class="token number">103.94</span> <span class="token number">116.78</span> <span class="token number">123.68</span> <span class="token operator">-</span><span class="token operator">-</span>norm<span class="token operator">=</span><span class="token number">0.017</span> <span class="token operator">-</span><span class="token operator">-</span>images<span class="token operator">=</span>test<span class="token operator">/</span>images<span class="token operator">/</span> output<span class="token operator">=</span>mobilenet_v1<span class="token punctuation">.</span>table <span class="token operator">-</span><span class="token operator">-</span>group<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">-</span><span class="token operator">-</span>gpu<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用教程如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>$ python caffe<span class="token operator">-</span>int8<span class="token operator">-</span>convert<span class="token operator">-</span>tool<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span><span class="token builtin">help</span>
usage<span class="token punctuation">:</span> caffe<span class="token operator">-</span>int8<span class="token operator">-</span>convert<span class="token operator">-</span>tool<span class="token punctuation">.</span>py <span class="token punctuation">[</span><span class="token operator">-</span>h<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>proto PROTO<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>model MODEL<span class="token punctuation">]</span>
                                  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>mean MEAN MEAN MEAN<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>norm NORM<span class="token punctuation">]</span>
                                  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>images IMAGES<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>output OUTPUT<span class="token punctuation">]</span>
                                  <span class="token punctuation">[</span><span class="token operator">-</span><span class="token operator">-</span>gpu GPU<span class="token punctuation">]</span>

find the pretrained caffe models int8 quantize scale value

optional arguments<span class="token punctuation">:</span>
  <span class="token operator">-</span>h<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token operator">-</span><span class="token builtin">help</span>            show this <span class="token builtin">help</span> message <span class="token keyword">and</span> exit
  <span class="token operator">-</span><span class="token operator">-</span>proto PROTO         path to deploy prototxt<span class="token punctuation">.</span>
  <span class="token operator">-</span><span class="token operator">-</span>model MODEL         path to pretrained weights
  <span class="token operator">-</span><span class="token operator">-</span>mean MEAN           value of mean
  <span class="token operator">-</span><span class="token operator">-</span>norm NORM           value of normalize
  <span class="token operator">-</span><span class="token operator">-</span>images IMAGES       path to calibration images
  <span class="token operator">-</span><span class="token operator">-</span>output OUTPUT       path to output calibration table <span class="token builtin">file</span>
  <span class="token operator">-</span><span class="token operator">-</span>gpu GPU             use gpu to forward
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>proto/model是caffe模型参数文件，mean为BGR均值，norm是caffe模型归一化参数，有些模型没有归一化就不要填，image是用于校准图像目录(jpg图像)。量化时需要校准，具体原理见:</p><blockquote><p>https://arleyzhang.github.io/articles/923e2c40/</p></blockquote><p>这样量化后获得输出文件model.table，在将caff模型转换为ncnn模型时，加入model.table，如下所示，就可以得到量化的模型。</p><blockquote><p>./caffe2ncnn deploy.prototxt model.caffemodel model_int8.param model_int8.bin 256 model.table</p></blockquote><p>上面256指的是quantizelevel量化级别，如果为0就不进行量化。如果某些层不想量化，打开model.table，输出那一层的量化参数。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] caffe分类模型训练、结果可视化、部署及量化笔记/20190810110419375.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="在这里插入图片描述" loading="lazy"> 调用int量化后的模型，和原来ncnn调用不量化的模型一样，ncnn会自动调用量化模型。 如果不行量化模型或者模型量化后精度较低，可以在ncnn下对模型优化ncnnoptimize。也就是合并模型某些层，比如conv层和relu层，具体如下： https://github.com/Tencent/ncnn/wiki/model-optimize 调用命令很简单如下所示，其中65536表示2的16次方，即FP16，这表示模型优化还会将模型从float32转为float16。</p><div class="language-path line-numbers-mode" data-ext="path"><pre class="language-path"><code>ncnnoptimize model.param model.bin model-opt.param model-opt.bin 65536
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于squeezenet，就精度而言model和model-opt精度差不多，model_int8精度越降5%。就速度而言model-opt为model的95%，model_int8为model的90%。正常使用情况推荐： model&gt;model-opt&gt;model_int8</p><h3 id="_3-4-部署和量化部分参考文件" tabindex="-1"><a class="header-anchor" href="#_3-4-部署和量化部分参考文件" aria-hidden="true">#</a> 3.4 部署和量化部分参考文件</h3>`,29),I={href:"https://blog.csdn.net/shanglianlm/article/details/80030569",target:"_blank",rel:"noopener noreferrer"},A={href:"https://www.jianshu.com/p/fdf9c3b70dd4",target:"_blank",rel:"noopener noreferrer"},L={href:"https://github.com/opencv/opencv/tree/master/samples/dnn",target:"_blank",rel:"noopener noreferrer"},E={href:"https://blog.csdn.net/weixin_45250844/article/details/94910897",target:"_blank",rel:"noopener noreferrer"},G={href:"https://blog.csdn.net/qq_36982160/article/details/79929869",target:"_blank",rel:"noopener noreferrer"},B={href:"https://blog.csdn.net/u014644466/article/details/83278954",target:"_blank",rel:"noopener noreferrer"},Z={href:"https://blog.csdn.net/qq_33431368/article/details/85029041",target:"_blank",rel:"noopener noreferrer"},M={href:"https://zhuanlan.zhihu.com/p/71881443",target:"_blank",rel:"noopener noreferrer"},D=n("h2",{id:"_4-总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-总结","aria-hidden":"true"},"#"),s(" 4 总结")],-1),S=n("p",null,"本文只写了caffe分类模型的相关笔记，目标检测就没写了。因为用darknet的yolo比较多。有空在写caffe目标检测的笔记。",-1);function V(H,j){const a=o("ExternalLinkIcon");return l(),i("div",null,[u,n("ul",null,[n("li",null,[n("a",r,[s("训练自己的数据集"),t(a)])]),n("li",null,[n("a",d,[s("caffe入门"),t(a)])]),n("li",null,[n("a",k,[s("caffe官方教程"),t(a)])]),n("li",null,[n("a",m,[s("solver参数设置"),t(a)])]),n("li",null,[n("a",v,[s("solver参数说明"),t(a)])]),n("li",null,[n("a",b,[s("模型微调1"),t(a)])]),n("li",null,[n("a",g,[s("模型微调2"),t(a)])]),n("li",null,[n("a",h,[s("模型微调3"),t(a)])]),n("li",null,[n("a",_,[s("模型微调4"),t(a)])]),n("li",null,[n("a",f,[s("经典网络总结"),t(a)])]),n("li",null,[n("a",y,[s("经典网络模型"),t(a)])]),n("li",null,[n("a",q,[s("caffe猫狗大战训练"),t(a)])])]),x,n("ul",null,[n("li",null,[n("a",w,[s("caffe训练日志可视化1"),t(a)])]),n("li",null,[n("a",R,[s("caffe训练日志可视化2"),t(a)])]),n("li",null,[n("a",F,[s("Netscope"),t(a)])]),n("li",null,[n("a",P,[s("Netron"),t(a)])]),n("li",null,[n("a",T,[s("ROC理论1"),t(a)])]),n("li",null,[n("a",O,[s("ROC理论2"),t(a)])]),n("li",null,[n("a",N,[s("ROC曲线绘制1"),t(a)])]),n("li",null,[n("a",C,[s("ROC曲线绘制2"),t(a)])])]),z,n("ul",null,[n("li",null,[n("a",I,[s("OpenCV调用Caffe1"),t(a)])]),n("li",null,[n("a",A,[s("OpenCV调用Caffe2"),t(a)])]),n("li",null,[n("a",L,[s("OpenCV深度学习调用实例"),t(a)])]),n("li",null,[n("a",E,[s("ncnn入门1"),t(a)])]),n("li",null,[n("a",G,[s("ncnn入门2"),t(a)])]),n("li",null,[n("a",B,[s("caffe量化1"),t(a)])]),n("li",null,[n("a",Z,[s("caffe量化2"),t(a)])]),n("li",null,[n("a",M,[s("ncnn量化详解"),t(a)])])]),D,S])}const W=p(c,[["render",V],["__file","2019-08-10-_深度学习_ caffe分类模型训练、结果可视化、部署及量化笔记.html.vue"]]);export{W as default};
