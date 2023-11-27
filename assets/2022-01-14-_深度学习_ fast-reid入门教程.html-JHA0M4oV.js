import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as r,c as t,a as i,b as e,d as s,e as l}from"./app-MsA2k2kn.js";const v={},u=i("h1",{id:"深度学习-fast-reid入门教程",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#深度学习-fast-reid入门教程","aria-hidden":"true"},"#"),e(" [深度学习] fast-reid入门教程")],-1),c=i("h2",{id:"fast-reid入门教程",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#fast-reid入门教程","aria-hidden":"true"},"#"),e(" fast-reid入门教程")],-1),m={href:"https://github.com/JDAI-CV/fast-reid",target:"_blank",rel:"noopener noreferrer"},o=l(`<p>[toc]</p><p>以行人重识别Person re-identification为例，行人重识别主要目的是针对出现在监控摄像头内的某个目标行人，准确快速地从监控网络其他摄像头内的大量行人中将这个目标行人标识出来。如下图所示（图片来自网络）。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>工程上，最简单的行人重识别的技术流程如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>行人检测（目标识别） --&gt; 特征提取 --&gt; 行人跟踪（目标跟踪）--&gt; 跨镜头行人跟踪 --&gt; 向量存储与检索 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>简单的一个技术解决方案为：</p>`,6),b=i("li",null,"行人检测：通过Yolov5这类目标模型提取当前帧的行人图像。",-1),g=i("li",null,"特征提取：基于特征提取模型，如通过faster-reid基于度量学习训练得到的模型提取行人区域图片的特征向量。",-1),_={href:"https://github.com/mikel-brostrom/Yolov5_DeepSort_Pytorch",target:"_blank",rel:"noopener noreferrer"},p=i("li",null,"跨镜头行人跟踪：基于深度学习的全局特征和数据关联实现跨镜头行人目标跟踪。",-1),f={href:"https://github.com/facebookresearch/faiss",target:"_blank",rel:"noopener noreferrer"},h=i("p",null,"在以上步骤中，特征提取是最关键的一环，它的作用是将输入的行人图片转化为固定维度的特征向量，以用于后续的目标跟踪和向量检索。好的特征需要具备良好的相似度保持性，即在特征空间中，相似度高的图片之间的向量距离比较近，而相似度低的图片对的向量距离比较远。通常用于训练这种模型的方式叫做度量学习，度量学习很简单可以自己查查。",-1),q={href:"https://arxiv.org/abs/2006.02631",target:"_blank",rel:"noopener noreferrer"},E=i("p",null,"fast-reid是一个很不错的ReID工具箱，提供了丰富的代码接口，但是代码有许多小bug，使用的时候要多注意。本文只介绍了fast-reid的基础使用，没有进一步的介绍fast-red的工程项目，以及相关的理论知识。关于fast-reid的使用，最好多单步调试进入源代码，可以学到很多的东西。fast-reid项目中提供的工程示例代码也是值得一看的。",-1),y=i("p",null,"结合行人重识别和目标检测与跟踪的项目，可以看看下面的文章：",-1),R={href:"https://blog.csdn.net/zengwubbb/category_10504583.html",target:"_blank",rel:"noopener noreferrer"},A=i("p",null,"详细介绍FastReID各部分代码结构的文章，可以看看：",-1),x={href:"https://blog.csdn.net/qq_34919792/article/details/108508941",target:"_blank",rel:"noopener noreferrer"},T={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Deep%20learning/fast-reid/fast-reid_tutorial",target:"_blank",rel:"noopener noreferrer"},k=i("h2",{id:"_1-fast-reid介绍",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-fast-reid介绍","aria-hidden":"true"},"#"),e(" 1 fast-reid介绍")],-1),I=i("h3",{id:"_1-1-fast-reid安装与项目结构",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-1-fast-reid安装与项目结构","aria-hidden":"true"},"#"),e(" 1.1 fast-reid安装与项目结构")],-1),D={href:"https://github.com/JDAI-CV/fast-reid",target:"_blank",rel:"noopener noreferrer"},N=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://github.com/JDAI-CV/fast-reid
cd fast-reid
python3 -m pip install -r docs/requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于fast-reid开源项目结构如下图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其中最主要的是configs文件夹，fastreid文件夹，projects文件夹，tools文件夹和MODEL_ZOO.md。configs文件夹提供了不同模型的结构和训练实现脚本。fastreid文件夹提供了fast-reid的源代码实现。projects提供了一些基于fast-reid的项目代码，里面所有的项目代码非常有用，建议都跑跑。tools文件夹提供了模型训练和部署代码。MODEL_ZOO.md提供了不同数据集下的预训练模型，可以down下来跑一跑。</p>`,4),M={href:"https://github.com/JDAI-CV/fast-reid/tree/master/fastreid/evaluation/rank_cylib",target:"_blank",rel:"noopener noreferrer"},S=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>all:
  ## python3 setup.py build_ext --inplace
  python3.8 setup.py build_ext --inplace
  rm -rf build
clean:
  rm -rf build
  rm -f rank_cy.c *.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-数据集和预训练模型" tabindex="-1"><a class="header-anchor" href="#_1-2-数据集和预训练模型" aria-hidden="true">#</a> 1.2 数据集和预训练模型</h3><h4 id="_1-2-1-数据集介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-1-数据集介绍" aria-hidden="true">#</a> 1.2.1 数据集介绍</h4>`,3),P={href:"https://github.com/JDAI-CV/fast-reid/tree/master/datasets",target:"_blank",rel:"noopener noreferrer"},C=l(`<p>Market-1501是用于行人重识别的大规模公共基准数据集。它包含由6个不同的摄像机捕获的1501个行人，以及32,668个行人图像边界框。数据集分为两部分：其中750人的图像用于训练，其余751人的图像用于测试。在官方测试协议中，选择3,368个查询图像作为查询集query，以在包含19,732张参考图像的gallery图像集中找到正确匹配。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Market-1501
　　├── bounding_box_test (750人的19732张图像用于测试)
　　　　　　　├── -1_c1s1_000401_03.jpg
　　　　　　　├── 0071_c6s2_072893_01.jpg
　　　　　　　├── 0071_c6s2_072918_02.jpg
　　├── bounding_box_train (751人的12936张图像用于训练)
　　　　　　　├── 0002_c1s1_000451_03.jpg
　　　　　　　├── 0002_c1s1_000801_01.jpg
　　　　　　　├── 0430_c5s1_109673_01.jpg
　　├── gt_bbox (25259张图像手动标注）
　　　　　　　├── 0001_c1s1_001051_00.jpg
　　　　　　　├── 0001_c1s2_041171_00.jpg
　　　　　　　├── 0933_c6s2_110943_00.jpg
　　├── gt_query (matlab格式，用于判断一个query的哪些图片是好的匹配和不好的匹配)
　　　　　　　├── 0001_c1s1_001051_00_good.mat
　　　　　　　├── 0794_c2s2_086182_00_good.mat
　　　　　　　├── 0001_c1s1_001051_00_junk.mat
　　├── query (750人的3368张图像用于查询)
　　　　　　　├── 0001_c1s1_001051_00.jpg
　　　　　　　├── 0001_c2s1_000301_00.jpg
　　　　　　　├── 0001_c3s1_000551_00.jpg
　　└── readme.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>图像命名规则</strong></p><p>以0071_c6s2_072893_01.jpg 为例</p><ul><li>0071 表示当前行人的编号，编号范围为-1到1501，-1表示不包含在这1501人中的行人，0000表示背景；</li><li>c6 表示当前摄像机的编号，共有6个摄像机；</li><li>s2 表示当前摄像机的第几个片段，每个摄像机都有多个录像片段；</li><li>072893 表示c6s2的第072893帧图片，视频帧率为25fps；</li><li>01 表示0071_c6s2_072893这一帧上的第1个检测框，00表示手工标注框。</li></ul><p><strong>数据集使用</strong></p><p>通常都是用度量学习的方式来使用Market-1501数据集。一般使用bounding_box_train，bounding_box_tes和query数据集中的图像进行模型训练和测试。</p><ul><li>bounding_box_train：用来训练模型，使模型能够学习该集合的图像特征。</li><li>bounding_box_test：用来提供度量学习中的gallery数据。</li><li>query：与gallery中的数据进行距离匹配以测试模型的好坏。</li></ul><h4 id="_1-2-2-预训练模型" tabindex="-1"><a class="header-anchor" href="#_1-2-2-预训练模型" aria-hidden="true">#</a> 1.2.2 预训练模型</h4>`,9),L={href:"https://github.com/JDAI-CV/fast-reid/blob/master/MODEL_ZOO.md",target:"_blank",rel:"noopener noreferrer"},O=l(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对于对应的config路径位于fast-reid/configs目录下，所用到的文件有两个：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>configs
　　├── Market1501
　　　　　　　├── bagtricks_R50.yml
　　├── Base-bagtricks.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行时会把Base-bagtricks.yml和bagtricks_R50.yml合并在一起。模型训练测试推理就是靠这两个文件，当然你可以手动把这两个文件并在一起。具体文件修改可以后续看看不同的config文件和官方代码，自己摸索摸索就可以入手。</p><p><strong>Base-bagtricks.yml</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>MODEL:
  META_ARCHITECTURE: Baseline

  BACKBONE: ## 模型骨干结构
    NAME: build_resnet_backbone
    NORM: BN
    DEPTH: 50x
    LAST_STRIDE: 1
    FEAT_DIM: 2048
    WITH_IBN: False
    PRETRAIN: True

  HEADS:  ## 模型头
    NAME: EmbeddingHead
    NORM: BN
    WITH_BNNECK: True
    POOL_LAYER: GlobalAvgPool
    NECK_FEAT: before
    CLS_LAYER: Linear

  LOSSES: ## 训练loss
    NAME: (&quot;CrossEntropyLoss&quot;, &quot;TripletLoss&quot;,)

    CE:
      EPSILON: 0.1
      SCALE: 1.

    TRI:
      MARGIN: 0.3
      HARD_MINING: True
      NORM_FEAT: False
      SCALE: 1.

INPUT: ## 模型输入图像处理方式
  SIZE_TRAIN: [ 256, 128 ]
  SIZE_TEST: [ 256, 128 ]

  REA:
    ENABLED: True
    PROB: 0.5

  FLIP:
    ENABLED: True

  PADDING:
    ENABLED: True

DATALOADER: ## 模型读取图像方式
  SAMPLER_TRAIN: NaiveIdentitySampler
  NUM_INSTANCE: 4
  NUM_WORKERS: 8

SOLVER: ## 模型训练配置文件
  AMP:
    ENABLED: True
  OPT: Adam
  MAX_EPOCH: 120
  BASE_LR: 0.00035
  WEIGHT_DECAY: 0.0005
  WEIGHT_DECAY_NORM: 0.0005
  IMS_PER_BATCH: 64

  SCHED: MultiStepLR
  STEPS: [ 40, 90 ]
  GAMMA: 0.1

  WARMUP_FACTOR: 0.1
  WARMUP_ITERS: 2000

  CHECKPOINT_PERIOD: 30

TEST: ## 模型测试配置
  EVAL_PERIOD: 30
  IMS_PER_BATCH: 128

CUDNN_BENCHMARK: True
MODEL:
  META_ARCHITECTURE: Baseline

  BACKBONE: ## 模型骨干结构
    NAME: build_resnet_backbone
    NORM: BN
    DEPTH: 50x
    LAST_STRIDE: 1
    FEAT_DIM: 2048
    WITH_IBN: False
    PRETRAIN: True

  HEADS:  ## 模型头
    NAME: EmbeddingHead
    NORM: BN
    WITH_BNNECK: True
    POOL_LAYER: GlobalAvgPool
    NECK_FEAT: before
    CLS_LAYER: Linear

  LOSSES: ## 训练loss
    NAME: (&quot;CrossEntropyLoss&quot;, &quot;TripletLoss&quot;,)

    CE:
      EPSILON: 0.1
      SCALE: 1.

    TRI:
      MARGIN: 0.3
      HARD_MINING: True
      NORM_FEAT: False
      SCALE: 1.

INPUT: ## 模型输入图像处理方式
  SIZE_TRAIN: [ 256, 128 ]
  SIZE_TEST: [ 256, 128 ]

  REA:
    ENABLED: True
    PROB: 0.5

  FLIP:
    ENABLED: True

  PADDING:
    ENABLED: True

DATALOADER: ## 模型读取图像方式
  SAMPLER_TRAIN: NaiveIdentitySampler
  NUM_INSTANCE: 4
  NUM_WORKERS: 8

SOLVER: ## 模型训练配置文件
  AMP:
    ENABLED: True
  OPT: Adam
  MAX_EPOCH: 120
  BASE_LR: 0.00035
  WEIGHT_DECAY: 0.0005
  WEIGHT_DECAY_NORM: 0.0005
  IMS_PER_BATCH: 64

  SCHED: MultiStepLR
  STEPS: [ 40, 90 ]
  GAMMA: 0.1

  WARMUP_FACTOR: 0.1
  WARMUP_ITERS: 2000

  CHECKPOINT_PERIOD: 30

TEST: ## 模型测试配置
  EVAL_PERIOD: 30
  IMS_PER_BATCH: 128

CUDNN_BENCHMARK: True
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>bagtricks_R50.yml</strong></p><p>注意我加了预训练模型路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>_BASE_: ../Base-bagtricks.yml ## 链接父目录下的Base-bagtricks.yml

DATASETS:
  NAMES: (&quot;Market1501&quot;,) ## 数据集路径
  TESTS: (&quot;Market1501&quot;,) ## 测试集路径

OUTPUT_DIR: logs/market1501/bagtricks_R50 ## 输出结果路径

MODEL:
  WEIGHTS: model/market_bot_R50.pth ## 预训练模型路径，这句是我自己加的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-fast-reid基础使用" tabindex="-1"><a class="header-anchor" href="#_2-fast-reid基础使用" aria-hidden="true">#</a> 2 fast-reid基础使用</h2><p>这里我的示例代码结构如下所示，个人习惯为了方便调试和后续接口使用，和官方仓库不一样，实际可以不这样用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>　　├── configs（配置文件路径）
　　　　├── Market1501
　　　　　　├── bagtricks_R50.yml
　　　　├── Base-bagtricks.yml
　　├── datasets（数据集目录）
　　　　　　├── Market-1501-v15.09.15 （这个数据集名不要改）
　　　　　　　　├── bounding_box_test (750人的19732张图像用于测试)
　　　　　　　　├── bounding_box_train (751人的12936张图像用于训练)
　　　　　　　　├── query (750人的3368张图像用于查询)
　　├── fastreid
　　├── model（预训练模型目录），下载好的预训练模型存放在这
　　├── demo.py（提取图像的特征，并保存），来自原来的demo目录
　　├── predictor.py （模型加载文件），来自原来的demo目录
　　├── train_net.py （模型训练与测试封装版代码），来自原来的tools目录
　　├── visualize_result.py （可视化特征提取结果），来自原来的demo目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点关注几个py文件，我直接挪到根目录下了。还有模型文件的保存路径，config预训练模型地址，数据集的名字也要注意的。各个文件具体使用可以看看下面介绍，都有代码注释。</p><p>⚠⚠⚠<strong>特别注意，py文件为了方便调试，我直接在代码里面设置了args的参数，实际使用要特别注意。</strong></p><p><strong>demo.py</strong></p><p>这个代码就是加载模型（调用predictor.py），提取查询图像的特征，并保存为npy文件。保存在demo_output文件夹下，一张图像对一个npy文件。这些包含特征向量的npy文件可供后续向量检索使用。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image4.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## encoding: utf-8
&quot;&quot;&quot;
@author:  liaoxingyu
@contact: sherlockliao01@gmail.com
提取图像的特征，并保存
&quot;&quot;&quot;

import argparse
import glob
import os
import sys

import torch.nn.functional as F
import cv2
import numpy as np
import tqdm
from torch.backends import cudnn

sys.path.append(&#39;.&#39;)

from fastreid.config import get_cfg
from fastreid.utils.logger import setup_logger
from fastreid.utils.file_io import PathManager

from predictor import FeatureExtractionDemo

## import some modules added in project like this below
## sys.path.append(&quot;projects/PartialReID&quot;)
## from partialreid import *

cudnn.benchmark = True
setup_logger(name=&quot;fastreid&quot;)


## 读取配置文件
def setup_cfg(args):
    ## load config from file and command-line arguments
    cfg = get_cfg()
    ## add_partialreid_config(cfg)
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    return cfg


def get_parser():
    parser = argparse.ArgumentParser(description=&quot;Feature extraction with reid models&quot;)
    parser.add_argument(
        &quot;--config-file&quot;,  ## config路径，通常包含模型配置文件
        metavar=&quot;FILE&quot;,
        help=&quot;path to config file&quot;,
    )
    parser.add_argument(
        &quot;--parallel&quot;,  ## 是否并行
        action=&#39;store_true&#39;,
        help=&#39;If use multiprocess for feature extraction.&#39;
    )
    parser.add_argument(
        &quot;--input&quot;,  ## 输入图像路径
        nargs=&quot;+&quot;,
        help=&quot;A list of space separated input images; &quot;
             &quot;or a single glob pattern such as &#39;directory/*.jpg&#39;&quot;,
    )
    parser.add_argument(
        &quot;--output&quot;,  ## 输出结果路径
        default=&#39;demo_output&#39;,
        help=&#39;path to save features&#39;
    )
    parser.add_argument(
        &quot;--opts&quot;,
        help=&quot;Modify config options using the command-line &#39;KEY VALUE&#39; pairs&quot;,
        default=[],
        nargs=argparse.REMAINDER,
    )
    return parser


def postprocess(features):
    ## Normalize feature to compute cosine distance
    features = F.normalize(features)  ## 特征归一化
    features = features.cpu().data.numpy()
    return features


if __name__ == &#39;__main__&#39;:
    args = get_parser().parse_args()  ## 解析输入参数
    ## 调试使用，使用的时候删除下面代码
    ## ---
    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径
    args.input = &quot;./datasets/Market-1501-v15.09.15/query/*.jpg&quot;  ## 图像路径
    ## ---

    cfg = setup_cfg(args)  ## 读取cfg文件
    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  ## 加载特征提取器，也就是加载模型

    PathManager.mkdirs(args.output)  ## 创建输出路径
    if args.input:
        if PathManager.isdir(args.input[0]):  ## 判断输入的是否为路径
            ## args.input = glob.glob(os.path.expanduser(args.input[0])) ## 原来的代码有问题
            args.input = glob.glob(os.path.expanduser(args.input))  ## 获取输入路径下所有的文件路径
            assert args.input, &quot;The input path(s) was not found&quot;
        for path in tqdm.tqdm(args.input):  ## 逐张处理
            img = cv2.imread(path)
            feat = demo.run_on_image(img)  ## 提取图像特征
            feat = postprocess(feat)  ## 后处理主要是特征归一化
            np.save(os.path.join(args.output, os.path.basename(path).split(&#39;.&#39;)[0] + &#39;.npy&#39;), feat)  ## 保存图像对应的特征，以便下次使用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>visualize_result.py</strong></p><p>这个代码就是加载模型（调用predictor.py），提取查询图像的特征，计算模型的各个精度指标。输出模型的ROC结果图，以及某张图像的匹配结果图像。输出目录为vis_rank_list。</p><p>ROC结果图如下图所示，ROC曲线下的面积AUC越大，表示模型效果越好。top1精度93.37左右。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image5.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>某张图像的匹配结果图像如下所示。每张图有1张查询图和5张查询结果图，左1为查询图像，其他为查询结果图。蓝色框表示查询结果错误，红色框表示查询结果正确。在查询结果图上有标题，比如0.976/false/cam1，表示当前查询结果图像和查询图像特征距离为0.976，查询结果为false(查询错误)，该查询结果来自cam1摄像头。查询图像上的标题，如0.9967/cam2，这里0.9967表示查询图像的查询结果精度指标，cam2表示查询图像来自cam2摄像头。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image6.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image7.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## encoding: utf-8
&quot;&quot;&quot;
@author:  xingyu liao
@contact: sherlockliao01@gmail.com
可视化特征提取结果
&quot;&quot;&quot;

import argparse
import logging
import sys

import numpy as np
import torch
import tqdm
from torch.backends import cudnn

sys.path.append(&#39;.&#39;)

import torch.nn.functional as F
from fastreid.evaluation.rank import evaluate_rank
from fastreid.config import get_cfg
from fastreid.utils.logger import setup_logger
from fastreid.data import build_reid_test_loader
from predictor import FeatureExtractionDemo
from fastreid.utils.visualizer import Visualizer

## import some modules added in project
## for example, add partial reid like this below
## sys.path.append(&quot;projects/PartialReID&quot;)
## from partialreid import *

cudnn.benchmark = True
setup_logger(name=&quot;fastreid&quot;)

logger = logging.getLogger(&#39;fastreid.visualize_result&#39;)


## 读取配置文件
def setup_cfg(args):
    ## load config from file and command-line arguments
    cfg = get_cfg()
    ## add_partialreid_config(cfg)
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    return cfg


def get_parser():
    parser = argparse.ArgumentParser(description=&quot;Feature extraction with reid models&quot;)
    parser.add_argument(
        &quot;--config-file&quot;,  ## config路径，通常包含模型配置文件
        metavar=&quot;FILE&quot;,
        help=&quot;path to config file&quot;,
    )
    parser.add_argument(
        &#39;--parallel&#39;,  ## 是否并行
        action=&#39;store_true&#39;,
        help=&#39;if use multiprocess for feature extraction.&#39;
    )
    parser.add_argument(
        &quot;--dataset-name&quot;,  ## 数据集名字
        help=&quot;a test dataset name for visualizing ranking list.&quot;
    )
    parser.add_argument(
        &quot;--output&quot;,  ## 输出结果路径
        default=&quot;./vis_rank_list&quot;,
        help=&quot;a file or directory to save rankling list result.&quot;,

    )
    parser.add_argument(
        &quot;--vis-label&quot;,  ## 输出结果是否查看
        action=&#39;store_true&#39;,
        help=&quot;if visualize label of query instance&quot;
    )
    parser.add_argument(
        &quot;--num-vis&quot;,  ## 挑选多少张图像用于结果展示
        default=1000,
        help=&quot;number of query images to be visualized&quot;,
    )
    parser.add_argument(
        &quot;--rank-sort&quot;,  ## 结果展示是相似度排序方式，默认从小到大排序
        default=&quot;ascending&quot;,
        help=&quot;rank order of visualization images by AP metric&quot;,
    )
    parser.add_argument(
        &quot;--label-sort&quot;,  ## label结果展示是相似度排序方式，默认从小到大排序
        default=&quot;ascending&quot;,
        help=&quot;label order of visualization images by cosine similarity metric&quot;,
    )
    parser.add_argument(
        &quot;--max-rank&quot;,  ## 显示topk的结果，默认显示前10个结果
        default=5,
        help=&quot;maximum number of rank list to be visualized&quot;,
    )
    parser.add_argument(
        &quot;--opts&quot;,
        help=&quot;Modify config options using the command-line &#39;KEY VALUE&#39; pairs&quot;,
        default=[],
        nargs=argparse.REMAINDER,
    )
    return parser


if __name__ == &#39;__main__&#39;:
    args = get_parser().parse_args()
    ## 调试使用，使用的时候删除下面代码
    ## ---
    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径
    args.dataset_name = &#39;Market1501&#39;  ## 数据集名字
    args.vis_label = False  ## 是否显示正确label结果
    args.rank_sort = &#39;descending&#39;  ## 从大到小显示关联结果
    args.label_sort = &#39;descending&#39;  ## 从大到小显示关联结果
    ## ---

    cfg = setup_cfg(args)
    ## 可以直接在代码中设置cfg中设置模型路径
    ## cfg[&quot;MODEL&quot;][&quot;WEIGHTS&quot;] = &#39;./configs/Market1501/bagtricks_R50.yml&#39;
    test_loader, num_query = build_reid_test_loader(cfg, dataset_name=args.dataset_name)  ## 创建测试数据集
    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  ## 加载特征提取器，也就是加载模型

    logger.info(&quot;Start extracting image features&quot;)
    feats = []  ## 图像特征，用于保存每个行人的图像特征
    pids = []  ## 行人id，用于保存每个行人的id
    camids = []  ## 拍摄的摄像头，行人出现的摄像头id
    ## 逐张保存读入行人图像，并保存相关信息
    for (feat, pid, camid) in tqdm.tqdm(demo.run_on_loader(test_loader), total=len(test_loader)):
        feats.append(feat)
        pids.extend(pid)
        camids.extend(camid)

    feats = torch.cat(feats, dim=0)  ## 将feats转换为tensor的二维向量，向量维度为[图像数，特征维度]
    ## 这里把query和gallery数据放在一起了，需要切分query和gallery的数据
    q_feat = feats[:num_query]
    g_feat = feats[num_query:]
    q_pids = np.asarray(pids[:num_query])
    g_pids = np.asarray(pids[num_query:])
    q_camids = np.asarray(camids[:num_query])
    g_camids = np.asarray(camids[num_query:])

    ## compute cosine distance 计算余弦距离
    q_feat = F.normalize(q_feat, p=2, dim=1)
    g_feat = F.normalize(g_feat, p=2, dim=1)
    distmat = 1 - torch.mm(q_feat, g_feat.t())  ## 这里distmat表示两张图像的距离，越小越接近
    distmat = distmat.numpy()

    ## 计算各种评价指标 cmc[0]就是top1精度，应该是93%左右，这里精度会有波动
    logger.info(&quot;Computing APs for all query images ...&quot;)
    cmc, all_ap, all_inp = evaluate_rank(distmat, q_pids, g_pids, q_camids, g_camids)
    logger.info(&quot;Finish computing APs for all query images!&quot;)

    visualizer = Visualizer(test_loader.dataset)  ## 创建Visualizer类
    visualizer.get_model_output(all_ap, distmat, q_pids, g_pids, q_camids, g_camids)  ## 保存结果

    logger.info(&quot;Start saving ROC curve ...&quot;)  ## 保存ROC曲线
    fpr, tpr, pos, neg = visualizer.vis_roc_curve(args.output)
    visualizer.save_roc_info(args.output, fpr, tpr, pos, neg)
    logger.info(&quot;Finish saving ROC curve!&quot;)

    logger.info(&quot;Saving rank list result ...&quot;)  ## 保存部分查询图像的关联结果，按照顺序排列
    query_indices = visualizer.vis_rank_list(args.output, args.vis_label, args.num_vis,
                                             args.rank_sort, args.label_sort, args.max_rank)
    logger.info(&quot;Finish saving rank list results!&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>train_net.py</strong></p><p>这段代码调用config文件，训练或者测试模型。训练模型设置args.eval_only = False，反之为测试模型。测试模型结果如下图所示。代码封装的很不错，把该有的测试指标都贴上去了。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/ReID/fast-reid_tutorial/img/image8.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,29),B={href:"https://github.com/JDAI-CV/fast-reid/blob/master/tools/plain_train_net.py",target:"_blank",rel:"noopener noreferrer"},j=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/usr/bin/env python
## encoding: utf-8
&quot;&quot;&quot;
@author:  sherlock
@contact: sherlockliao01@gmail.com
模型训练与测试封装版代码
&quot;&quot;&quot;

import sys

sys.path.append(&#39;.&#39;)

from fastreid.config import get_cfg
from fastreid.engine import DefaultTrainer, default_argument_parser, default_setup, launch
from fastreid.utils.checkpoint import Checkpointer


## 读取配置文件
def setup(args):
    &quot;&quot;&quot;
    Create configs and perform basic setups.
    &quot;&quot;&quot;
    cfg = get_cfg()
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    default_setup(cfg, args)
    return cfg


def main(args):
    cfg = setup(args)
    ## 模型测试
    if args.eval_only:
        cfg.defrost()
        cfg.MODEL.BACKBONE.PRETRAIN = False
        model = DefaultTrainer.build_model(cfg)
        ## 加载预训练模型
        Checkpointer(model).load(cfg.MODEL.WEIGHTS)  ## load trained model

        res = DefaultTrainer.test(cfg, model)
        return res
    ## 模型训练
    trainer = DefaultTrainer(cfg)

    trainer.resume_or_load(resume=args.resume)
    return trainer.train()


if __name__ == &quot;__main__&quot;:
    args = default_argument_parser().parse_args()
    ## 调试使用，使用的时候删除下面代码
    ## ---
    args.config_file = &quot;./configs/Market1501/bagtricks_R50.yml&quot;  ## config路径
    args.eval_only = True  ## 是否测试模型,False表示训练模型，True表示测试模型
    ## ---

    print(&quot;Command Line Args:&quot;, args)
    launch(
        main,
        args.num_gpus,
        num_machines=args.num_machines,
        machine_rank=args.machine_rank,
        dist_url=args.dist_url,
        args=(args,),
    )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2><h3 id="_3-1-代码库" tabindex="-1"><a class="header-anchor" href="#_3-1-代码库" aria-hidden="true">#</a> 3.1 代码库</h3>`,3),F={href:"https://github.com/JDAI-CV/fast-reid",target:"_blank",rel:"noopener noreferrer"},z={href:"https://github.com/facebookresearch/faiss",target:"_blank",rel:"noopener noreferrer"},H={href:"https://github.com/mikel-brostrom/Yolov5_DeepSort_Pytorch",target:"_blank",rel:"noopener noreferrer"},w=i("h3",{id:"_3-2-文档",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_3-2-文档","aria-hidden":"true"},"#"),e(" 3.2 文档")],-1),V={href:"https://arxiv.org/abs/2006.02631",target:"_blank",rel:"noopener noreferrer"},U={href:"https://blog.csdn.net/zengwubbb/category_10504583.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://blog.csdn.net/qq_34919792/article/details/108508941",target:"_blank",rel:"noopener noreferrer"};function W(K,Y){const n=a("ExternalLinkIcon");return r(),t("div",null,[u,c,i("p",null,[e("ReID，全拼为Re-identification，目的是利用各种智能算法在图像数据库中找到与要搜索的目标相似的对象。ReID是图像检索的一个子任务，本质上是图像检索而不是图像分类。"),i("a",m,[e("fast-reid"),s(n)]),e("是一个强悍的目标重识别Reid开源库，由京东开源管理。本文主要是介绍fast-reid的使用，随着技术的发展，对于cv从业人员有必要了解不同智能算法技术的应用。而且ReID是相对下游的任务，了解ReID的相关技术应用能学到很多东西。")]),o,i("ol",null,[b,g,i("li",null,[e("目标跟踪：结合行人区域特征，通过"),i("a",_,[e("deepsort"),s(n)]),e("进行行人跟踪")]),p,i("li",null,[e("向量存储与检索：对于给定的行人查询向量，与行人特征库中所有的待查询向量进行向量检索，即计算特征向量间的相似度。通常我们可以通过"),i("a",f,[e("faiss"),s(n)]),e("处理这部分的操作。")])]),h,i("p",null,[e("fast-reid是一个面向学术界和工业界的ReID工具箱，是京东的开源项目之一。如果想要了解更多关于fast-reid的信息，可以直接去看作者的论文"),i("a",q,[e("FastReID: A Pytorch Toolbox for Real-world Person Re-identification"),s(n)]),e("。fast-reid基于python和pytorch实现各种模型，同时提供一些脚本将pytorch训练的模型转到caffe和TensorRT上。所以非常推荐使用fast-reid进行学习。")]),E,y,i("blockquote",null,[i("p",null,[i("a",R,[e("行人重识别 ReID"),s(n)])])]),A,i("blockquote",null,[i("p",null,[i("a",x,[e("详解ReID的各部分组成及Trick——基于FastReID"),s(n)])])]),i("p",null,[e("本文所有代码见： github: "),i("a",T,[e("Python-Study-Notes"),s(n)])]),k,I,i("p",null,[e("本文主要介绍fast-reid的基础使用，度量学习和ReID最新技术建议学习相关论文。本文的项目运行环境为Ubuntu18.01，Python3.8，Pytorch1.8.1+cu102。 对于fast-reid首先去官方仓库下载对应的代码到本地，仓库地址："),i("a",D,[e("fast-reid"),s(n)]),e("，然后安装对应的Python库。具体代码如下：")]),N,i("p",null,[e("此外为了加速索引速度，进入"),i("a",M,[e("fast-reid/fastreid/evaluation/rank_cylib/"),s(n)]),e("目录，输入make all编译文件以加速查询。如果发现编译所使用的python版本不是系统默认版本，比如我用的是python3.8，需要修改Makefile文件。如下所示：")]),S,i("p",null,[e("在"),i("a",P,[e("fast-reid/datasets/"),s(n)]),e("目录提供了不同数据集的信息。可以自行下载。这里介绍其中最常用的Market-1501数据集。")]),C,i("p",null,[e("在"),i("a",L,[e("fast-reid/MODEL_ZOO.md"),s(n)]),e("文件下提供了不同数据集下不同方法得到的sota模型。以最简单的Bot在Market1501中训练ResNet50模型为例。点击Method下的链接会转到模型配置文件路径，点击download会下载对应的预训练模型（大概300MB）。")]),O,i("p",null,[e("另外这是封装过多的代码，如果想知道清晰的训练代码查看"),i("a",B,[e("fast-reid/tools/plain_train_net.py"),s(n)]),e("，这个文件提供了详细没有封装过多的训练代码。")]),j,i("ul",null,[i("li",null,[i("a",F,[e("fast-reid"),s(n)])]),i("li",null,[i("a",z,[e("faiss"),s(n)])]),i("li",null,[i("a",H,[e("Yolov5_deepsort"),s(n)])])]),w,i("ul",null,[i("li",null,[i("a",V,[e("FastReID: A Pytorch Toolbox for Real-world Person Re-identification"),s(n)])]),i("li",null,[i("a",U,[e("行人重识别 ReID"),s(n)])]),i("li",null,[i("a",G,[e("详解ReID的各部分组成及Trick——基于FastReID"),s(n)])])])])}const X=d(v,[["render",W],["__file","2022-01-14-_深度学习_ fast-reid入门教程.html.vue"]]);export{X as default};
