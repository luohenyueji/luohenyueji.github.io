import{_ as n,c as a,a as i,o as e}from"./app-CJwJJlha.js";const l={};function p(r,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="深度学习-fast-reid入门教程" tabindex="-1"><a class="header-anchor" href="#深度学习-fast-reid入门教程"><span>[深度学习] fast-reid入门教程</span></a></h1><h2 id="fast-reid入门教程" tabindex="-1"><a class="header-anchor" href="#fast-reid入门教程"><span>fast-reid入门教程</span></a></h2><p>ReID，全拼为Re-identification，目的是利用各种智能算法在图像数据库中找到与要搜索的目标相似的对象。ReID是图像检索的一个子任务，本质上是图像检索而不是图像分类。<a href="https://github.com/JDAI-CV/fast-reid" target="_blank" rel="noopener noreferrer">fast-reid</a>是一个强悍的目标重识别Reid开源库，由京东开源管理。本文主要是介绍fast-reid的使用，随着技术的发展，对于cv从业人员有必要了解不同智能算法技术的应用。而且ReID是相对下游的任务，了解ReID的相关技术应用能学到很多东西。</p><p>[toc]</p><p>以行人重识别Person re-identification为例，行人重识别主要目的是针对出现在监控摄像头内的某个目标行人，准确快速地从监控网络其他摄像头内的大量行人中将这个目标行人标识出来。如下图所示（图片来自网络）。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>工程上，最简单的行人重识别的技术流程如下所示。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>行人检测（目标识别） --&gt; 特征提取 --&gt; 行人跟踪（目标跟踪）--&gt; 跨镜头行人跟踪 --&gt; 向量存储与检索</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>简单的一个技术解决方案为：</p><ol><li>行人检测：通过Yolov5这类目标模型提取当前帧的行人图像。</li><li>特征提取：基于特征提取模型，如通过faster-reid基于度量学习训练得到的模型提取行人区域图片的特征向量。</li><li>目标跟踪：结合行人区域特征，通过<a href="https://github.com/mikel-brostrom/Yolov5_DeepSort_Pytorch" target="_blank" rel="noopener noreferrer">deepsort</a>进行行人跟踪</li><li>跨镜头行人跟踪：基于深度学习的全局特征和数据关联实现跨镜头行人目标跟踪。</li><li>向量存储与检索：对于给定的行人查询向量，与行人特征库中所有的待查询向量进行向量检索，即计算特征向量间的相似度。通常我们可以通过<a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noopener noreferrer">faiss</a>处理这部分的操作。</li></ol><p>在以上步骤中，特征提取是最关键的一环，它的作用是将输入的行人图片转化为固定维度的特征向量，以用于后续的目标跟踪和向量检索。好的特征需要具备良好的相似度保持性，即在特征空间中，相似度高的图片之间的向量距离比较近，而相似度低的图片对的向量距离比较远。通常用于训练这种模型的方式叫做度量学习，度量学习很简单可以自己查查。</p><p>fast-reid是一个面向学术界和工业界的ReID工具箱，是京东的开源项目之一。如果想要了解更多关于fast-reid的信息，可以直接去看作者的论文<a href="https://arxiv.org/abs/2006.02631" target="_blank" rel="noopener noreferrer">FastReID: A Pytorch Toolbox for Real-world Person Re-identification</a>。fast-reid基于python和pytorch实现各种模型，同时提供一些脚本将pytorch训练的模型转到caffe和TensorRT上。所以非常推荐使用fast-reid进行学习。</p><p>fast-reid是一个很不错的ReID工具箱，提供了丰富的代码接口，但是代码有许多小bug，使用的时候要多注意。本文只介绍了fast-reid的基础使用，没有进一步的介绍fast-red的工程项目，以及相关的理论知识。关于fast-reid的使用，最好多单步调试进入源代码，可以学到很多的东西。fast-reid项目中提供的工程示例代码也是值得一看的。</p><p>结合行人重识别和目标检测与跟踪的项目，可以看看下面的文章：</p><blockquote><p><a href="https://blog.csdn.net/zengwubbb/category_10504583.html" target="_blank" rel="noopener noreferrer">行人重识别 ReID</a></p></blockquote><p>详细介绍FastReID各部分代码结构的文章，可以看看：</p><blockquote><p><a href="https://blog.csdn.net/qq_34919792/article/details/108508941" target="_blank" rel="noopener noreferrer">详解ReID的各部分组成及Trick——基于FastReID</a></p></blockquote><p>本文所有代码见： github: <a href="https://github.com/luohenyueji/Python-Study-Notes/tree/master/Deep%20learning/fast-reid/fast-reid_tutorial" target="_blank" rel="noopener noreferrer">Python-Study-Notes</a></p><h2 id="_1-fast-reid介绍" tabindex="-1"><a class="header-anchor" href="#_1-fast-reid介绍"><span>1 fast-reid介绍</span></a></h2><h3 id="_1-1-fast-reid安装与项目结构" tabindex="-1"><a class="header-anchor" href="#_1-1-fast-reid安装与项目结构"><span>1.1 fast-reid安装与项目结构</span></a></h3><p>本文主要介绍fast-reid的基础使用，度量学习和ReID最新技术建议学习相关论文。本文的项目运行环境为Ubuntu18.01，Python3.8，Pytorch1.8.1+cu102。 对于fast-reid首先去官方仓库下载对应的代码到本地，仓库地址：<a href="https://github.com/JDAI-CV/fast-reid" target="_blank" rel="noopener noreferrer">fast-reid</a>，然后安装对应的Python库。具体代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>git clone https://github.com/JDAI-CV/fast-reid</span></span>
<span class="line"><span>cd fast-reid</span></span>
<span class="line"><span>python3 -m pip install -r docs/requirements.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于fast-reid开源项目结构如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中最主要的是configs文件夹，fastreid文件夹，projects文件夹，tools文件夹和MODEL_ZOO.md。configs文件夹提供了不同模型的结构和训练实现脚本。fastreid文件夹提供了fast-reid的源代码实现。projects提供了一些基于fast-reid的项目代码，里面所有的项目代码非常有用，建议都跑跑。tools文件夹提供了模型训练和部署代码。MODEL_ZOO.md提供了不同数据集下的预训练模型，可以down下来跑一跑。</p><p>此外为了加速索引速度，进入<a href="https://github.com/JDAI-CV/fast-reid/tree/master/fastreid/evaluation/rank_cylib" target="_blank" rel="noopener noreferrer">fast-reid/fastreid/evaluation/rank_cylib/</a>目录，输入make all编译文件以加速查询。如果发现编译所使用的python版本不是系统默认版本，比如我用的是python3.8，需要修改Makefile文件。如下所示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>all:</span></span>
<span class="line"><span>  ## python3 setup.py build_ext --inplace</span></span>
<span class="line"><span>  python3.8 setup.py build_ext --inplace</span></span>
<span class="line"><span>  rm -rf build</span></span>
<span class="line"><span>clean:</span></span>
<span class="line"><span>  rm -rf build</span></span>
<span class="line"><span>  rm -f rank_cy.c *.so</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-数据集和预训练模型" tabindex="-1"><a class="header-anchor" href="#_1-2-数据集和预训练模型"><span>1.2 数据集和预训练模型</span></a></h3><h4 id="_1-2-1-数据集介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-1-数据集介绍"><span>1.2.1 数据集介绍</span></a></h4><p>在<a href="https://github.com/JDAI-CV/fast-reid/tree/master/datasets" target="_blank" rel="noopener noreferrer">fast-reid/datasets/</a>目录提供了不同数据集的信息。可以自行下载。这里介绍其中最常用的Market-1501数据集。</p><p>Market-1501是用于行人重识别的大规模公共基准数据集。它包含由6个不同的摄像机捕获的1501个行人，以及32,668个行人图像边界框。数据集分为两部分：其中750人的图像用于训练，其余751人的图像用于测试。在官方测试协议中，选择3,368个查询图像作为查询集query，以在包含19,732张参考图像的gallery图像集中找到正确匹配。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Market-1501</span></span>
<span class="line"><span>　　├── bounding_box_test (750人的19732张图像用于测试)</span></span>
<span class="line"><span>　　　　　　　├── -1_c1s1_000401_03.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0071_c6s2_072893_01.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0071_c6s2_072918_02.jpg</span></span>
<span class="line"><span>　　├── bounding_box_train (751人的12936张图像用于训练)</span></span>
<span class="line"><span>　　　　　　　├── 0002_c1s1_000451_03.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0002_c1s1_000801_01.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0430_c5s1_109673_01.jpg</span></span>
<span class="line"><span>　　├── gt_bbox (25259张图像手动标注）</span></span>
<span class="line"><span>　　　　　　　├── 0001_c1s1_001051_00.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0001_c1s2_041171_00.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0933_c6s2_110943_00.jpg</span></span>
<span class="line"><span>　　├── gt_query (matlab格式，用于判断一个query的哪些图片是好的匹配和不好的匹配)</span></span>
<span class="line"><span>　　　　　　　├── 0001_c1s1_001051_00_good.mat</span></span>
<span class="line"><span>　　　　　　　├── 0794_c2s2_086182_00_good.mat</span></span>
<span class="line"><span>　　　　　　　├── 0001_c1s1_001051_00_junk.mat</span></span>
<span class="line"><span>　　├── query (750人的3368张图像用于查询)</span></span>
<span class="line"><span>　　　　　　　├── 0001_c1s1_001051_00.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0001_c2s1_000301_00.jpg</span></span>
<span class="line"><span>　　　　　　　├── 0001_c3s1_000551_00.jpg</span></span>
<span class="line"><span>　　└── readme.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>图像命名规则</strong></p><p>以0071_c6s2_072893_01.jpg 为例</p><ul><li>0071 表示当前行人的编号，编号范围为-1到1501，-1表示不包含在这1501人中的行人，0000表示背景；</li><li>c6 表示当前摄像机的编号，共有6个摄像机；</li><li>s2 表示当前摄像机的第几个片段，每个摄像机都有多个录像片段；</li><li>072893 表示c6s2的第072893帧图片，视频帧率为25fps；</li><li>01 表示0071_c6s2_072893这一帧上的第1个检测框，00表示手工标注框。</li></ul><p><strong>数据集使用</strong></p><p>通常都是用度量学习的方式来使用Market-1501数据集。一般使用bounding_box_train，bounding_box_tes和query数据集中的图像进行模型训练和测试。</p><ul><li>bounding_box_train：用来训练模型，使模型能够学习该集合的图像特征。</li><li>bounding_box_test：用来提供度量学习中的gallery数据。</li><li>query：与gallery中的数据进行距离匹配以测试模型的好坏。</li></ul><h4 id="_1-2-2-预训练模型" tabindex="-1"><a class="header-anchor" href="#_1-2-2-预训练模型"><span>1.2.2 预训练模型</span></a></h4><p>在<a href="https://github.com/JDAI-CV/fast-reid/blob/master/MODEL_ZOO.md" target="_blank" rel="noopener noreferrer">fast-reid/MODEL_ZOO.md</a>文件下提供了不同数据集下不同方法得到的sota模型。以最简单的Bot在Market1501中训练ResNet50模型为例。点击Method下的链接会转到模型配置文件路径，点击download会下载对应的预训练模型（大概300MB）。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于对应的config路径位于fast-reid/configs目录下，所用到的文件有两个：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>configs</span></span>
<span class="line"><span>　　├── Market1501</span></span>
<span class="line"><span>　　　　　　　├── bagtricks_R50.yml</span></span>
<span class="line"><span>　　├── Base-bagtricks.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行时会把Base-bagtricks.yml和bagtricks_R50.yml合并在一起。模型训练测试推理就是靠这两个文件，当然你可以手动把这两个文件并在一起。具体文件修改可以后续看看不同的config文件和官方代码，自己摸索摸索就可以入手。</p><p><strong>Base-bagtricks.yml</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>MODEL:</span></span>
<span class="line"><span>  META_ARCHITECTURE: Baseline</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  BACKBONE: ## 模型骨干结构</span></span>
<span class="line"><span>    NAME: build_resnet_backbone</span></span>
<span class="line"><span>    NORM: BN</span></span>
<span class="line"><span>    DEPTH: 50x</span></span>
<span class="line"><span>    LAST_STRIDE: 1</span></span>
<span class="line"><span>    FEAT_DIM: 2048</span></span>
<span class="line"><span>    WITH_IBN: False</span></span>
<span class="line"><span>    PRETRAIN: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  HEADS:  ## 模型头</span></span>
<span class="line"><span>    NAME: EmbeddingHead</span></span>
<span class="line"><span>    NORM: BN</span></span>
<span class="line"><span>    WITH_BNNECK: True</span></span>
<span class="line"><span>    POOL_LAYER: GlobalAvgPool</span></span>
<span class="line"><span>    NECK_FEAT: before</span></span>
<span class="line"><span>    CLS_LAYER: Linear</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  LOSSES: ## 训练loss</span></span>
<span class="line"><span>    NAME: (&quot;CrossEntropyLoss&quot;, &quot;TripletLoss&quot;,)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    CE:</span></span>
<span class="line"><span>      EPSILON: 0.1</span></span>
<span class="line"><span>      SCALE: 1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    TRI:</span></span>
<span class="line"><span>      MARGIN: 0.3</span></span>
<span class="line"><span>      HARD_MINING: True</span></span>
<span class="line"><span>      NORM_FEAT: False</span></span>
<span class="line"><span>      SCALE: 1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INPUT: ## 模型输入图像处理方式</span></span>
<span class="line"><span>  SIZE_TRAIN: [ 256, 128 ]</span></span>
<span class="line"><span>  SIZE_TEST: [ 256, 128 ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  REA:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span>    PROB: 0.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  FLIP:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  PADDING:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DATALOADER: ## 模型读取图像方式</span></span>
<span class="line"><span>  SAMPLER_TRAIN: NaiveIdentitySampler</span></span>
<span class="line"><span>  NUM_INSTANCE: 4</span></span>
<span class="line"><span>  NUM_WORKERS: 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SOLVER: ## 模型训练配置文件</span></span>
<span class="line"><span>  AMP:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span>  OPT: Adam</span></span>
<span class="line"><span>  MAX_EPOCH: 120</span></span>
<span class="line"><span>  BASE_LR: 0.00035</span></span>
<span class="line"><span>  WEIGHT_DECAY: 0.0005</span></span>
<span class="line"><span>  WEIGHT_DECAY_NORM: 0.0005</span></span>
<span class="line"><span>  IMS_PER_BATCH: 64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  SCHED: MultiStepLR</span></span>
<span class="line"><span>  STEPS: [ 40, 90 ]</span></span>
<span class="line"><span>  GAMMA: 0.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  WARMUP_FACTOR: 0.1</span></span>
<span class="line"><span>  WARMUP_ITERS: 2000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  CHECKPOINT_PERIOD: 30</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TEST: ## 模型测试配置</span></span>
<span class="line"><span>  EVAL_PERIOD: 30</span></span>
<span class="line"><span>  IMS_PER_BATCH: 128</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CUDNN_BENCHMARK: True</span></span>
<span class="line"><span>MODEL:</span></span>
<span class="line"><span>  META_ARCHITECTURE: Baseline</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  BACKBONE: ## 模型骨干结构</span></span>
<span class="line"><span>    NAME: build_resnet_backbone</span></span>
<span class="line"><span>    NORM: BN</span></span>
<span class="line"><span>    DEPTH: 50x</span></span>
<span class="line"><span>    LAST_STRIDE: 1</span></span>
<span class="line"><span>    FEAT_DIM: 2048</span></span>
<span class="line"><span>    WITH_IBN: False</span></span>
<span class="line"><span>    PRETRAIN: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  HEADS:  ## 模型头</span></span>
<span class="line"><span>    NAME: EmbeddingHead</span></span>
<span class="line"><span>    NORM: BN</span></span>
<span class="line"><span>    WITH_BNNECK: True</span></span>
<span class="line"><span>    POOL_LAYER: GlobalAvgPool</span></span>
<span class="line"><span>    NECK_FEAT: before</span></span>
<span class="line"><span>    CLS_LAYER: Linear</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  LOSSES: ## 训练loss</span></span>
<span class="line"><span>    NAME: (&quot;CrossEntropyLoss&quot;, &quot;TripletLoss&quot;,)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    CE:</span></span>
<span class="line"><span>      EPSILON: 0.1</span></span>
<span class="line"><span>      SCALE: 1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    TRI:</span></span>
<span class="line"><span>      MARGIN: 0.3</span></span>
<span class="line"><span>      HARD_MINING: True</span></span>
<span class="line"><span>      NORM_FEAT: False</span></span>
<span class="line"><span>      SCALE: 1.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INPUT: ## 模型输入图像处理方式</span></span>
<span class="line"><span>  SIZE_TRAIN: [ 256, 128 ]</span></span>
<span class="line"><span>  SIZE_TEST: [ 256, 128 ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  REA:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span>    PROB: 0.5</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  FLIP:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  PADDING:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DATALOADER: ## 模型读取图像方式</span></span>
<span class="line"><span>  SAMPLER_TRAIN: NaiveIdentitySampler</span></span>
<span class="line"><span>  NUM_INSTANCE: 4</span></span>
<span class="line"><span>  NUM_WORKERS: 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SOLVER: ## 模型训练配置文件</span></span>
<span class="line"><span>  AMP:</span></span>
<span class="line"><span>    ENABLED: True</span></span>
<span class="line"><span>  OPT: Adam</span></span>
<span class="line"><span>  MAX_EPOCH: 120</span></span>
<span class="line"><span>  BASE_LR: 0.00035</span></span>
<span class="line"><span>  WEIGHT_DECAY: 0.0005</span></span>
<span class="line"><span>  WEIGHT_DECAY_NORM: 0.0005</span></span>
<span class="line"><span>  IMS_PER_BATCH: 64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  SCHED: MultiStepLR</span></span>
<span class="line"><span>  STEPS: [ 40, 90 ]</span></span>
<span class="line"><span>  GAMMA: 0.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  WARMUP_FACTOR: 0.1</span></span>
<span class="line"><span>  WARMUP_ITERS: 2000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  CHECKPOINT_PERIOD: 30</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TEST: ## 模型测试配置</span></span>
<span class="line"><span>  EVAL_PERIOD: 30</span></span>
<span class="line"><span>  IMS_PER_BATCH: 128</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CUDNN_BENCHMARK: True</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>bagtricks_R50.yml</strong></p><p>注意我加了预训练模型路径。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>_BASE_: ../Base-bagtricks.yml ## 链接父目录下的Base-bagtricks.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DATASETS:</span></span>
<span class="line"><span>  NAMES: (&quot;Market1501&quot;,) ## 数据集路径</span></span>
<span class="line"><span>  TESTS: (&quot;Market1501&quot;,) ## 测试集路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>OUTPUT_DIR: logs/market1501/bagtricks_R50 ## 输出结果路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MODEL:</span></span>
<span class="line"><span>  WEIGHTS: model/market_bot_R50.pth ## 预训练模型路径，这句是我自己加的</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-fast-reid基础使用" tabindex="-1"><a class="header-anchor" href="#_2-fast-reid基础使用"><span>2 fast-reid基础使用</span></a></h2><p>这里我的示例代码结构如下所示，个人习惯为了方便调试和后续接口使用，和官方仓库不一样，实际可以不这样用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>　　├── configs（配置文件路径）</span></span>
<span class="line"><span>　　　　├── Market1501</span></span>
<span class="line"><span>　　　　　　├── bagtricks_R50.yml</span></span>
<span class="line"><span>　　　　├── Base-bagtricks.yml</span></span>
<span class="line"><span>　　├── datasets（数据集目录）</span></span>
<span class="line"><span>　　　　　　├── Market-1501-v15.09.15 （这个数据集名不要改）</span></span>
<span class="line"><span>　　　　　　　　├── bounding_box_test (750人的19732张图像用于测试)</span></span>
<span class="line"><span>　　　　　　　　├── bounding_box_train (751人的12936张图像用于训练)</span></span>
<span class="line"><span>　　　　　　　　├── query (750人的3368张图像用于查询)</span></span>
<span class="line"><span>　　├── fastreid</span></span>
<span class="line"><span>　　├── model（预训练模型目录），下载好的预训练模型存放在这</span></span>
<span class="line"><span>　　├── demo.py（提取图像的特征，并保存），来自原来的demo目录</span></span>
<span class="line"><span>　　├── predictor.py （模型加载文件），来自原来的demo目录</span></span>
<span class="line"><span>　　├── train_net.py （模型训练与测试封装版代码），来自原来的tools目录</span></span>
<span class="line"><span>　　├── visualize_result.py （可视化特征提取结果），来自原来的demo目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点关注几个py文件，我直接挪到根目录下了。还有模型文件的保存路径，config预训练模型地址，数据集的名字也要注意的。各个文件具体使用可以看看下面介绍，都有代码注释。</p><p>⚠⚠⚠<strong>特别注意，py文件为了方便调试，我直接在代码里面设置了args的参数，实际使用要特别注意。</strong></p><p><strong>demo.py</strong></p><p>这个代码就是加载模型（调用predictor.py），提取查询图像的特征，并保存为npy文件。保存在demo_output文件夹下，一张图像对一个npy文件。这些包含特征向量的npy文件可供后续向量检索使用。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image4.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>## encoding: utf-8</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>@author:  liaoxingyu</span></span>
<span class="line"><span>@contact: sherlockliao01@gmail.com</span></span>
<span class="line"><span>提取图像的特征，并保存</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import argparse</span></span>
<span class="line"><span>import glob</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import torch.nn.functional as F</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import tqdm</span></span>
<span class="line"><span>from torch.backends import cudnn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.path.append(&#39;.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from fastreid.config import get_cfg</span></span>
<span class="line"><span>from fastreid.utils.logger import setup_logger</span></span>
<span class="line"><span>from fastreid.utils.file_io import PathManager</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from predictor import FeatureExtractionDemo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## import some modules added in project like this below</span></span>
<span class="line"><span>## sys.path.append(&quot;projects/PartialReID&quot;)</span></span>
<span class="line"><span>## from partialreid import *</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cudnn.benchmark = True</span></span>
<span class="line"><span>setup_logger(name=&quot;fastreid&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 读取配置文件</span></span>
<span class="line"><span>def setup_cfg(args):</span></span>
<span class="line"><span>    ## load config from file and command-line arguments</span></span>
<span class="line"><span>    cfg = get_cfg()</span></span>
<span class="line"><span>    ## add_partialreid_config(cfg)</span></span>
<span class="line"><span>    cfg.merge_from_file(args.config_file)</span></span>
<span class="line"><span>    cfg.merge_from_list(args.opts)</span></span>
<span class="line"><span>    cfg.freeze()</span></span>
<span class="line"><span>    return cfg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_parser():</span></span>
<span class="line"><span>    parser = argparse.ArgumentParser(description=&quot;Feature extraction with reid models&quot;)</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--config-file&quot;,  ## config路径，通常包含模型配置文件</span></span>
<span class="line"><span>        metavar=&quot;FILE&quot;,</span></span>
<span class="line"><span>        help=&quot;path to config file&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--parallel&quot;,  ## 是否并行</span></span>
<span class="line"><span>        action=&#39;store_true&#39;,</span></span>
<span class="line"><span>        help=&#39;If use multiprocess for feature extraction.&#39;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--input&quot;,  ## 输入图像路径</span></span>
<span class="line"><span>        nargs=&quot;+&quot;,</span></span>
<span class="line"><span>        help=&quot;A list of space separated input images; &quot;</span></span>
<span class="line"><span>             &quot;or a single glob pattern such as &#39;directory/*.jpg&#39;&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--output&quot;,  ## 输出结果路径</span></span>
<span class="line"><span>        default=&#39;demo_output&#39;,</span></span>
<span class="line"><span>        help=&#39;path to save features&#39;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--opts&quot;,</span></span>
<span class="line"><span>        help=&quot;Modify config options using the command-line &#39;KEY VALUE&#39; pairs&quot;,</span></span>
<span class="line"><span>        default=[],</span></span>
<span class="line"><span>        nargs=argparse.REMAINDER,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    return parser</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def postprocess(features):</span></span>
<span class="line"><span>    ## Normalize feature to compute cosine distance</span></span>
<span class="line"><span>    features = F.normalize(features)  ## 特征归一化</span></span>
<span class="line"><span>    features = features.cpu().data.numpy()</span></span>
<span class="line"><span>    return features</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    args = get_parser().parse_args()  ## 解析输入参数</span></span>
<span class="line"><span>    ## 调试使用，使用的时候删除下面代码</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span>    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径</span></span>
<span class="line"><span>    args.input = &quot;./datasets/Market-1501-v15.09.15/query/*.jpg&quot;  ## 图像路径</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cfg = setup_cfg(args)  ## 读取cfg文件</span></span>
<span class="line"><span>    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  ## 加载特征提取器，也就是加载模型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    PathManager.mkdirs(args.output)  ## 创建输出路径</span></span>
<span class="line"><span>    if args.input:</span></span>
<span class="line"><span>        if PathManager.isdir(args.input[0]):  ## 判断输入的是否为路径</span></span>
<span class="line"><span>            ## args.input = glob.glob(os.path.expanduser(args.input[0])) ## 原来的代码有问题</span></span>
<span class="line"><span>            args.input = glob.glob(os.path.expanduser(args.input))  ## 获取输入路径下所有的文件路径</span></span>
<span class="line"><span>            assert args.input, &quot;The input path(s) was not found&quot;</span></span>
<span class="line"><span>        for path in tqdm.tqdm(args.input):  ## 逐张处理</span></span>
<span class="line"><span>            img = cv2.imread(path)</span></span>
<span class="line"><span>            feat = demo.run_on_image(img)  ## 提取图像特征</span></span>
<span class="line"><span>            feat = postprocess(feat)  ## 后处理主要是特征归一化</span></span>
<span class="line"><span>            np.save(os.path.join(args.output, os.path.basename(path).split(&#39;.&#39;)[0] + &#39;.npy&#39;), feat)  ## 保存图像对应的特征，以便下次使用</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>visualize_result.py</strong></p><p>这个代码就是加载模型（调用predictor.py），提取查询图像的特征，计算模型的各个精度指标。输出模型的ROC结果图，以及某张图像的匹配结果图像。输出目录为vis_rank_list。</p><p>ROC结果图如下图所示，ROC曲线下的面积AUC越大，表示模型效果越好。top1精度93.37左右。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image5.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>某张图像的匹配结果图像如下所示。每张图有1张查询图和5张查询结果图，左1为查询图像，其他为查询结果图。蓝色框表示查询结果错误，红色框表示查询结果正确。在查询结果图上有标题，比如0.976/false/cam1，表示当前查询结果图像和查询图像特征距离为0.976，查询结果为false(查询错误)，该查询结果来自cam1摄像头。查询图像上的标题，如0.9967/cam2，这里0.9967表示查询图像的查询结果精度指标，cam2表示查询图像来自cam2摄像头。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image6.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image7.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>## encoding: utf-8</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>@author:  xingyu liao</span></span>
<span class="line"><span>@contact: sherlockliao01@gmail.com</span></span>
<span class="line"><span>可视化特征提取结果</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import argparse</span></span>
<span class="line"><span>import logging</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span>import tqdm</span></span>
<span class="line"><span>from torch.backends import cudnn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.path.append(&#39;.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import torch.nn.functional as F</span></span>
<span class="line"><span>from fastreid.evaluation.rank import evaluate_rank</span></span>
<span class="line"><span>from fastreid.config import get_cfg</span></span>
<span class="line"><span>from fastreid.utils.logger import setup_logger</span></span>
<span class="line"><span>from fastreid.data import build_reid_test_loader</span></span>
<span class="line"><span>from predictor import FeatureExtractionDemo</span></span>
<span class="line"><span>from fastreid.utils.visualizer import Visualizer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## import some modules added in project</span></span>
<span class="line"><span>## for example, add partial reid like this below</span></span>
<span class="line"><span>## sys.path.append(&quot;projects/PartialReID&quot;)</span></span>
<span class="line"><span>## from partialreid import *</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cudnn.benchmark = True</span></span>
<span class="line"><span>setup_logger(name=&quot;fastreid&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>logger = logging.getLogger(&#39;fastreid.visualize_result&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 读取配置文件</span></span>
<span class="line"><span>def setup_cfg(args):</span></span>
<span class="line"><span>    ## load config from file and command-line arguments</span></span>
<span class="line"><span>    cfg = get_cfg()</span></span>
<span class="line"><span>    ## add_partialreid_config(cfg)</span></span>
<span class="line"><span>    cfg.merge_from_file(args.config_file)</span></span>
<span class="line"><span>    cfg.merge_from_list(args.opts)</span></span>
<span class="line"><span>    cfg.freeze()</span></span>
<span class="line"><span>    return cfg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_parser():</span></span>
<span class="line"><span>    parser = argparse.ArgumentParser(description=&quot;Feature extraction with reid models&quot;)</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--config-file&quot;,  ## config路径，通常包含模型配置文件</span></span>
<span class="line"><span>        metavar=&quot;FILE&quot;,</span></span>
<span class="line"><span>        help=&quot;path to config file&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &#39;--parallel&#39;,  ## 是否并行</span></span>
<span class="line"><span>        action=&#39;store_true&#39;,</span></span>
<span class="line"><span>        help=&#39;if use multiprocess for feature extraction.&#39;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--dataset-name&quot;,  ## 数据集名字</span></span>
<span class="line"><span>        help=&quot;a test dataset name for visualizing ranking list.&quot;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--output&quot;,  ## 输出结果路径</span></span>
<span class="line"><span>        default=&quot;./vis_rank_list&quot;,</span></span>
<span class="line"><span>        help=&quot;a file or directory to save rankling list result.&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--vis-label&quot;,  ## 输出结果是否查看</span></span>
<span class="line"><span>        action=&#39;store_true&#39;,</span></span>
<span class="line"><span>        help=&quot;if visualize label of query instance&quot;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--num-vis&quot;,  ## 挑选多少张图像用于结果展示</span></span>
<span class="line"><span>        default=1000,</span></span>
<span class="line"><span>        help=&quot;number of query images to be visualized&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--rank-sort&quot;,  ## 结果展示是相似度排序方式，默认从小到大排序</span></span>
<span class="line"><span>        default=&quot;ascending&quot;,</span></span>
<span class="line"><span>        help=&quot;rank order of visualization images by AP metric&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--label-sort&quot;,  ## label结果展示是相似度排序方式，默认从小到大排序</span></span>
<span class="line"><span>        default=&quot;ascending&quot;,</span></span>
<span class="line"><span>        help=&quot;label order of visualization images by cosine similarity metric&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--max-rank&quot;,  ## 显示topk的结果，默认显示前10个结果</span></span>
<span class="line"><span>        default=5,</span></span>
<span class="line"><span>        help=&quot;maximum number of rank list to be visualized&quot;,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    parser.add_argument(</span></span>
<span class="line"><span>        &quot;--opts&quot;,</span></span>
<span class="line"><span>        help=&quot;Modify config options using the command-line &#39;KEY VALUE&#39; pairs&quot;,</span></span>
<span class="line"><span>        default=[],</span></span>
<span class="line"><span>        nargs=argparse.REMAINDER,</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>    return parser</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    args = get_parser().parse_args()</span></span>
<span class="line"><span>    ## 调试使用，使用的时候删除下面代码</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span>    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径</span></span>
<span class="line"><span>    args.dataset_name = &#39;Market1501&#39;  ## 数据集名字</span></span>
<span class="line"><span>    args.vis_label = False  ## 是否显示正确label结果</span></span>
<span class="line"><span>    args.rank_sort = &#39;descending&#39;  ## 从大到小显示关联结果</span></span>
<span class="line"><span>    args.label_sort = &#39;descending&#39;  ## 从大到小显示关联结果</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    cfg = setup_cfg(args)</span></span>
<span class="line"><span>    ## 可以直接在代码中设置cfg中设置模型路径</span></span>
<span class="line"><span>    ## cfg[&quot;MODEL&quot;][&quot;WEIGHTS&quot;] = &#39;./configs/Market1501/bagtricks_R50.yml&#39;</span></span>
<span class="line"><span>    test_loader, num_query = build_reid_test_loader(cfg, dataset_name=args.dataset_name)  ## 创建测试数据集</span></span>
<span class="line"><span>    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  ## 加载特征提取器，也就是加载模型</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    logger.info(&quot;Start extracting image features&quot;)</span></span>
<span class="line"><span>    feats = []  ## 图像特征，用于保存每个行人的图像特征</span></span>
<span class="line"><span>    pids = []  ## 行人id，用于保存每个行人的id</span></span>
<span class="line"><span>    camids = []  ## 拍摄的摄像头，行人出现的摄像头id</span></span>
<span class="line"><span>    ## 逐张保存读入行人图像，并保存相关信息</span></span>
<span class="line"><span>    for (feat, pid, camid) in tqdm.tqdm(demo.run_on_loader(test_loader), total=len(test_loader)):</span></span>
<span class="line"><span>        feats.append(feat)</span></span>
<span class="line"><span>        pids.extend(pid)</span></span>
<span class="line"><span>        camids.extend(camid)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    feats = torch.cat(feats, dim=0)  ## 将feats转换为tensor的二维向量，向量维度为[图像数，特征维度]</span></span>
<span class="line"><span>    ## 这里把query和gallery数据放在一起了，需要切分query和gallery的数据</span></span>
<span class="line"><span>    q_feat = feats[:num_query]</span></span>
<span class="line"><span>    g_feat = feats[num_query:]</span></span>
<span class="line"><span>    q_pids = np.asarray(pids[:num_query])</span></span>
<span class="line"><span>    g_pids = np.asarray(pids[num_query:])</span></span>
<span class="line"><span>    q_camids = np.asarray(camids[:num_query])</span></span>
<span class="line"><span>    g_camids = np.asarray(camids[num_query:])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ## compute cosine distance 计算余弦距离</span></span>
<span class="line"><span>    q_feat = F.normalize(q_feat, p=2, dim=1)</span></span>
<span class="line"><span>    g_feat = F.normalize(g_feat, p=2, dim=1)</span></span>
<span class="line"><span>    distmat = 1 - torch.mm(q_feat, g_feat.t())  ## 这里distmat表示两张图像的距离，越小越接近</span></span>
<span class="line"><span>    distmat = distmat.numpy()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ## 计算各种评价指标 cmc[0]就是top1精度，应该是93%左右，这里精度会有波动</span></span>
<span class="line"><span>    logger.info(&quot;Computing APs for all query images ...&quot;)</span></span>
<span class="line"><span>    cmc, all_ap, all_inp = evaluate_rank(distmat, q_pids, g_pids, q_camids, g_camids)</span></span>
<span class="line"><span>    logger.info(&quot;Finish computing APs for all query images!&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    visualizer = Visualizer(test_loader.dataset)  ## 创建Visualizer类</span></span>
<span class="line"><span>    visualizer.get_model_output(all_ap, distmat, q_pids, g_pids, q_camids, g_camids)  ## 保存结果</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    logger.info(&quot;Start saving ROC curve ...&quot;)  ## 保存ROC曲线</span></span>
<span class="line"><span>    fpr, tpr, pos, neg = visualizer.vis_roc_curve(args.output)</span></span>
<span class="line"><span>    visualizer.save_roc_info(args.output, fpr, tpr, pos, neg)</span></span>
<span class="line"><span>    logger.info(&quot;Finish saving ROC curve!&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    logger.info(&quot;Saving rank list result ...&quot;)  ## 保存部分查询图像的关联结果，按照顺序排列</span></span>
<span class="line"><span>    query_indices = visualizer.vis_rank_list(args.output, args.vis_label, args.num_vis,</span></span>
<span class="line"><span>                                             args.rank_sort, args.label_sort, args.max_rank)</span></span>
<span class="line"><span>    logger.info(&quot;Finish saving rank list results!&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>train_net.py</strong></p><p>这段代码调用config文件，训练或者测试模型。训练模型设置args.eval_only = False，反之为测试模型。测试模型结果如下图所示。代码封装的很不错，把该有的测试指标都贴上去了。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image8.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>另外这是封装过多的代码，如果想知道清晰的训练代码查看<a href="https://github.com/JDAI-CV/fast-reid/blob/master/tools/plain_train_net.py" target="_blank" rel="noopener noreferrer">fast-reid/tools/plain_train_net.py</a>，这个文件提供了详细没有封装过多的训练代码。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span>## encoding: utf-8</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>@author:  sherlock</span></span>
<span class="line"><span>@contact: sherlockliao01@gmail.com</span></span>
<span class="line"><span>模型训练与测试封装版代码</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.path.append(&#39;.&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>from fastreid.config import get_cfg</span></span>
<span class="line"><span>from fastreid.engine import DefaultTrainer, default_argument_parser, default_setup, launch</span></span>
<span class="line"><span>from fastreid.utils.checkpoint import Checkpointer</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 读取配置文件</span></span>
<span class="line"><span>def setup(args):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Create configs and perform basic setups.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    cfg = get_cfg()</span></span>
<span class="line"><span>    cfg.merge_from_file(args.config_file)</span></span>
<span class="line"><span>    cfg.merge_from_list(args.opts)</span></span>
<span class="line"><span>    cfg.freeze()</span></span>
<span class="line"><span>    default_setup(cfg, args)</span></span>
<span class="line"><span>    return cfg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def main(args):</span></span>
<span class="line"><span>    cfg = setup(args)</span></span>
<span class="line"><span>    ## 模型测试</span></span>
<span class="line"><span>    if args.eval_only:</span></span>
<span class="line"><span>        cfg.defrost()</span></span>
<span class="line"><span>        cfg.MODEL.BACKBONE.PRETRAIN = False</span></span>
<span class="line"><span>        model = DefaultTrainer.build_model(cfg)</span></span>
<span class="line"><span>        ## 加载预训练模型</span></span>
<span class="line"><span>        Checkpointer(model).load(cfg.MODEL.WEIGHTS)  ## load trained model</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        res = DefaultTrainer.test(cfg, model)</span></span>
<span class="line"><span>        return res</span></span>
<span class="line"><span>    ## 模型训练</span></span>
<span class="line"><span>    trainer = DefaultTrainer(cfg)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    trainer.resume_or_load(resume=args.resume)</span></span>
<span class="line"><span>    return trainer.train()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    args = default_argument_parser().parse_args()</span></span>
<span class="line"><span>    ## 调试使用，使用的时候删除下面代码</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span>    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径</span></span>
<span class="line"><span>    args.eval_only = True  ## 是否测试模型,False表示训练模型，True表示测试模型</span></span>
<span class="line"><span>    ## ---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print(&quot;Command Line Args:&quot;, args)</span></span>
<span class="line"><span>    launch(</span></span>
<span class="line"><span>        main,</span></span>
<span class="line"><span>        args.num_gpus,</span></span>
<span class="line"><span>        num_machines=args.num_machines,</span></span>
<span class="line"><span>        machine_rank=args.machine_rank,</span></span>
<span class="line"><span>        dist_url=args.dist_url,</span></span>
<span class="line"><span>        args=(args,),</span></span>
<span class="line"><span>    )</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><h3 id="_3-1-代码库" tabindex="-1"><a class="header-anchor" href="#_3-1-代码库"><span>3.1 代码库</span></a></h3><ul><li><a href="https://github.com/JDAI-CV/fast-reid" target="_blank" rel="noopener noreferrer">fast-reid</a></li><li><a href="https://github.com/facebookresearch/faiss" target="_blank" rel="noopener noreferrer">faiss</a></li><li><a href="https://github.com/mikel-brostrom/Yolov5_DeepSort_Pytorch" target="_blank" rel="noopener noreferrer">Yolov5_deepsort</a></li></ul><h3 id="_3-2-文档" tabindex="-1"><a class="header-anchor" href="#_3-2-文档"><span>3.2 文档</span></a></h3><ul><li><a href="https://arxiv.org/abs/2006.02631" target="_blank" rel="noopener noreferrer">FastReID: A Pytorch Toolbox for Real-world Person Re-identification</a></li><li><a href="https://blog.csdn.net/zengwubbb/category_10504583.html" target="_blank" rel="noopener noreferrer">行人重识别 ReID</a></li><li><a href="https://blog.csdn.net/qq_34919792/article/details/108508941" target="_blank" rel="noopener noreferrer">详解ReID的各部分组成及Trick——基于FastReID</a></li></ul>`,76)]))}const c=n(l,[["render",p],["__file","2022-01-14-_深度学习_ fast-reid入门教程.html.vue"]]),t=JSON.parse('{"path":"/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2022-01-14-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20fast-reid%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html","title":"[深度学习] fast-reid入门教程","lang":"zh-CN","frontmatter":{"date":"2022-01-14T11:51:35.000Z","category":["深度学习"],"tag":["深度学习","Python"],"description":"[深度学习] fast-reid入门教程 fast-reid入门教程 ReID，全拼为Re-identification，目的是利用各种智能算法在图像数据库中找到与要搜索的目标相似的对象。ReID是图像检索的一个子任务，本质上是图像检索而不是图像分类。fast-reid是一个强悍的目标重识别Reid开源库，由京东开源管理。本文主要是介绍fast-rei...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2022-01-14-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20fast-reid%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[深度学习] fast-reid入门教程"}],["meta",{"property":"og:description","content":"[深度学习] fast-reid入门教程 fast-reid入门教程 ReID，全拼为Re-identification，目的是利用各种智能算法在图像数据库中找到与要搜索的目标相似的对象。ReID是图像检索的一个子任务，本质上是图像检索而不是图像分类。fast-reid是一个强悍的目标重识别Reid开源库，由京东开源管理。本文主要是介绍fast-rei..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2022-01-14T11:51:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[深度学习] fast-reid入门教程\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image1.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image2.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image3.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image4.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image5.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image6.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image7.jpg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image8.jpg\\"],\\"datePublished\\":\\"2022-01-14T11:51:35.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"fast-reid入门教程","slug":"fast-reid入门教程","link":"#fast-reid入门教程","children":[]},{"level":2,"title":"1 fast-reid介绍","slug":"_1-fast-reid介绍","link":"#_1-fast-reid介绍","children":[{"level":3,"title":"1.1 fast-reid安装与项目结构","slug":"_1-1-fast-reid安装与项目结构","link":"#_1-1-fast-reid安装与项目结构","children":[]},{"level":3,"title":"1.2 数据集和预训练模型","slug":"_1-2-数据集和预训练模型","link":"#_1-2-数据集和预训练模型","children":[]}]},{"level":2,"title":"2 fast-reid基础使用","slug":"_2-fast-reid基础使用","link":"#_2-fast-reid基础使用","children":[]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[{"level":3,"title":"3.1 代码库","slug":"_3-1-代码库","link":"#_3-1-代码库","children":[]},{"level":3,"title":"3.2 文档","slug":"_3-2-文档","link":"#_3-2-文档","children":[]}]}],"git":{},"readingTime":{"minutes":15.98,"words":4794},"filePathRelative":"blog/深度学习/深度学习笔记/2022-01-14-[深度学习] fast-reid入门教程.md","localizedDate":"2022年1月14日","excerpt":"\\n<h2>fast-reid入门教程</h2>\\n<p>ReID，全拼为Re-identification，目的是利用各种智能算法在图像数据库中找到与要搜索的目标相似的对象。ReID是图像检索的一个子任务，本质上是图像检索而不是图像分类。<a href=\\"https://github.com/JDAI-CV/fast-reid\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">fast-reid</a>是一个强悍的目标重识别Reid开源库，由京东开源管理。本文主要是介绍fast-reid的使用，随着技术的发展，对于cv从业人员有必要了解不同智能算法技术的应用。而且ReID是相对下游的任务，了解ReID的相关技术应用能学到很多东西。</p>","autoDesc":true}');export{c as comp,t as data};
