import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"深度学习-pytorch模型转换为onnx模型笔记",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深度学习-pytorch模型转换为onnx模型笔记","aria-hidden":"true"},"#"),s(" [深度学习] Pytorch模型转换为onnx模型笔记")],-1),r={href:"https://github.com/luohenyueji/Python-Study-Notes/blob/master/Documents",target:"_blank",rel:"noopener noreferrer"},d=p(`<h2 id="_1-使用说明" tabindex="-1"><a class="header-anchor" href="#_1-使用说明" aria-hidden="true">#</a> 1 使用说明</h2><p>本文示例为调用pytorch预训练的mobilenetv2模型，将其导出为onnx模型。主要步骤如下：</p><ol><li>读取模型</li><li>检测图像</li><li>导出为onnx模型</li><li>模型测试</li><li>模型简化</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 需要调用的头文件</span>
<span class="token keyword">import</span> torch
<span class="token keyword">from</span> torchvision <span class="token keyword">import</span> models
<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">from</span> torchsummary <span class="token keyword">import</span> summary
<span class="token keyword">import</span> onnxruntime
<span class="token keyword">from</span> onnxsim <span class="token keyword">import</span> simplify
<span class="token keyword">import</span> onnx
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt

<span class="token comment">## 判断使用CPU还是GPU</span>
device <span class="token operator">=</span> torch<span class="token punctuation">.</span>device<span class="token punctuation">(</span><span class="token string">&quot;cuda:0&quot;</span> <span class="token keyword">if</span> torch<span class="token punctuation">.</span>cuda<span class="token punctuation">.</span>is_available<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token string">&quot;cpu&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-读取模型" tabindex="-1"><a class="header-anchor" href="#_1-1-读取模型" aria-hidden="true">#</a> 1.1 读取模型</h3><p>该部分主要为调用训练好的模型。主要内容如下</p><ol><li>直接读取预训练模型</li><li>将模型转换为推理模型</li><li>查看模型的结构</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ----- 1 读取模型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 1 读取模型 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 载入模型并读取权重</span>
model <span class="token operator">=</span> models<span class="token punctuation">.</span>mobilenet_v2<span class="token punctuation">(</span>pretrained<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment">## 将模型转换为推理模式</span>
model<span class="token punctuation">.</span><span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 查看模型的结构，(3,224,224)为模型的图像输入</span>
summary<span class="token punctuation">(</span>model<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 1 读取模型 -----
----------------------------------------------------------------
        Layer (type)               Output Shape         Param #
================================================================
            Conv2d-1         [-1, 32, 112, 112]             864
       BatchNorm2d-2         [-1, 32, 112, 112]              64
             ReLU6-3         [-1, 32, 112, 112]               0
            Conv2d-4         [-1, 32, 112, 112]             288
       BatchNorm2d-5         [-1, 32, 112, 112]              64
             ReLU6-6         [-1, 32, 112, 112]               0
            Conv2d-7         [-1, 16, 112, 112]             512
       BatchNorm2d-8         [-1, 16, 112, 112]              32
  InvertedResidual-9         [-1, 16, 112, 112]               0
           Conv2d-10         [-1, 96, 112, 112]           1,536
      BatchNorm2d-11         [-1, 96, 112, 112]             192
            ReLU6-12         [-1, 96, 112, 112]               0
           Conv2d-13           [-1, 96, 56, 56]             864
      BatchNorm2d-14           [-1, 96, 56, 56]             192
            ReLU6-15           [-1, 96, 56, 56]               0
           Conv2d-16           [-1, 24, 56, 56]           2,304
      BatchNorm2d-17           [-1, 24, 56, 56]              48
 InvertedResidual-18           [-1, 24, 56, 56]               0
           Conv2d-19          [-1, 144, 56, 56]           3,456
      BatchNorm2d-20          [-1, 144, 56, 56]             288
            ReLU6-21          [-1, 144, 56, 56]               0
           Conv2d-22          [-1, 144, 56, 56]           1,296
      BatchNorm2d-23          [-1, 144, 56, 56]             288
            ReLU6-24          [-1, 144, 56, 56]               0
           Conv2d-25           [-1, 24, 56, 56]           3,456
      BatchNorm2d-26           [-1, 24, 56, 56]              48
 InvertedResidual-27           [-1, 24, 56, 56]               0
           Conv2d-28          [-1, 144, 56, 56]           3,456
      BatchNorm2d-29          [-1, 144, 56, 56]             288
            ReLU6-30          [-1, 144, 56, 56]               0
           Conv2d-31          [-1, 144, 28, 28]           1,296
      BatchNorm2d-32          [-1, 144, 28, 28]             288
            ReLU6-33          [-1, 144, 28, 28]               0
           Conv2d-34           [-1, 32, 28, 28]           4,608
      BatchNorm2d-35           [-1, 32, 28, 28]              64
 InvertedResidual-36           [-1, 32, 28, 28]               0
           Conv2d-37          [-1, 192, 28, 28]           6,144
      BatchNorm2d-38          [-1, 192, 28, 28]             384
            ReLU6-39          [-1, 192, 28, 28]               0
           Conv2d-40          [-1, 192, 28, 28]           1,728
      BatchNorm2d-41          [-1, 192, 28, 28]             384
            ReLU6-42          [-1, 192, 28, 28]               0
           Conv2d-43           [-1, 32, 28, 28]           6,144
      BatchNorm2d-44           [-1, 32, 28, 28]              64
 InvertedResidual-45           [-1, 32, 28, 28]               0
           Conv2d-46          [-1, 192, 28, 28]           6,144
      BatchNorm2d-47          [-1, 192, 28, 28]             384
            ReLU6-48          [-1, 192, 28, 28]               0
           Conv2d-49          [-1, 192, 28, 28]           1,728
      BatchNorm2d-50          [-1, 192, 28, 28]             384
            ReLU6-51          [-1, 192, 28, 28]               0
           Conv2d-52           [-1, 32, 28, 28]           6,144
      BatchNorm2d-53           [-1, 32, 28, 28]              64
 InvertedResidual-54           [-1, 32, 28, 28]               0
           Conv2d-55          [-1, 192, 28, 28]           6,144
      BatchNorm2d-56          [-1, 192, 28, 28]             384
            ReLU6-57          [-1, 192, 28, 28]               0
           Conv2d-58          [-1, 192, 14, 14]           1,728
      BatchNorm2d-59          [-1, 192, 14, 14]             384
            ReLU6-60          [-1, 192, 14, 14]               0
           Conv2d-61           [-1, 64, 14, 14]          12,288
      BatchNorm2d-62           [-1, 64, 14, 14]             128
 InvertedResidual-63           [-1, 64, 14, 14]               0
           Conv2d-64          [-1, 384, 14, 14]          24,576
      BatchNorm2d-65          [-1, 384, 14, 14]             768
            ReLU6-66          [-1, 384, 14, 14]               0
           Conv2d-67          [-1, 384, 14, 14]           3,456
      BatchNorm2d-68          [-1, 384, 14, 14]             768
            ReLU6-69          [-1, 384, 14, 14]               0
           Conv2d-70           [-1, 64, 14, 14]          24,576
      BatchNorm2d-71           [-1, 64, 14, 14]             128
 InvertedResidual-72           [-1, 64, 14, 14]               0
           Conv2d-73          [-1, 384, 14, 14]          24,576
      BatchNorm2d-74          [-1, 384, 14, 14]             768
            ReLU6-75          [-1, 384, 14, 14]               0
           Conv2d-76          [-1, 384, 14, 14]           3,456
      BatchNorm2d-77          [-1, 384, 14, 14]             768
            ReLU6-78          [-1, 384, 14, 14]               0
           Conv2d-79           [-1, 64, 14, 14]          24,576
      BatchNorm2d-80           [-1, 64, 14, 14]             128
 InvertedResidual-81           [-1, 64, 14, 14]               0
           Conv2d-82          [-1, 384, 14, 14]          24,576
      BatchNorm2d-83          [-1, 384, 14, 14]             768
            ReLU6-84          [-1, 384, 14, 14]               0
           Conv2d-85          [-1, 384, 14, 14]           3,456
      BatchNorm2d-86          [-1, 384, 14, 14]             768
            ReLU6-87          [-1, 384, 14, 14]               0
           Conv2d-88           [-1, 64, 14, 14]          24,576
      BatchNorm2d-89           [-1, 64, 14, 14]             128
 InvertedResidual-90           [-1, 64, 14, 14]               0
           Conv2d-91          [-1, 384, 14, 14]          24,576
      BatchNorm2d-92          [-1, 384, 14, 14]             768
            ReLU6-93          [-1, 384, 14, 14]               0
           Conv2d-94          [-1, 384, 14, 14]           3,456
      BatchNorm2d-95          [-1, 384, 14, 14]             768
            ReLU6-96          [-1, 384, 14, 14]               0
           Conv2d-97           [-1, 96, 14, 14]          36,864
      BatchNorm2d-98           [-1, 96, 14, 14]             192
 InvertedResidual-99           [-1, 96, 14, 14]               0
          Conv2d-100          [-1, 576, 14, 14]          55,296
     BatchNorm2d-101          [-1, 576, 14, 14]           1,152
           ReLU6-102          [-1, 576, 14, 14]               0
          Conv2d-103          [-1, 576, 14, 14]           5,184
     BatchNorm2d-104          [-1, 576, 14, 14]           1,152
           ReLU6-105          [-1, 576, 14, 14]               0
          Conv2d-106           [-1, 96, 14, 14]          55,296
     BatchNorm2d-107           [-1, 96, 14, 14]             192
InvertedResidual-108           [-1, 96, 14, 14]               0
          Conv2d-109          [-1, 576, 14, 14]          55,296
     BatchNorm2d-110          [-1, 576, 14, 14]           1,152
           ReLU6-111          [-1, 576, 14, 14]               0
          Conv2d-112          [-1, 576, 14, 14]           5,184
     BatchNorm2d-113          [-1, 576, 14, 14]           1,152
           ReLU6-114          [-1, 576, 14, 14]               0
          Conv2d-115           [-1, 96, 14, 14]          55,296
     BatchNorm2d-116           [-1, 96, 14, 14]             192
InvertedResidual-117           [-1, 96, 14, 14]               0
          Conv2d-118          [-1, 576, 14, 14]          55,296
     BatchNorm2d-119          [-1, 576, 14, 14]           1,152
           ReLU6-120          [-1, 576, 14, 14]               0
          Conv2d-121            [-1, 576, 7, 7]           5,184
     BatchNorm2d-122            [-1, 576, 7, 7]           1,152
           ReLU6-123            [-1, 576, 7, 7]               0
          Conv2d-124            [-1, 160, 7, 7]          92,160
     BatchNorm2d-125            [-1, 160, 7, 7]             320
InvertedResidual-126            [-1, 160, 7, 7]               0
          Conv2d-127            [-1, 960, 7, 7]         153,600
     BatchNorm2d-128            [-1, 960, 7, 7]           1,920
           ReLU6-129            [-1, 960, 7, 7]               0
          Conv2d-130            [-1, 960, 7, 7]           8,640
     BatchNorm2d-131            [-1, 960, 7, 7]           1,920
           ReLU6-132            [-1, 960, 7, 7]               0
          Conv2d-133            [-1, 160, 7, 7]         153,600
     BatchNorm2d-134            [-1, 160, 7, 7]             320
InvertedResidual-135            [-1, 160, 7, 7]               0
          Conv2d-136            [-1, 960, 7, 7]         153,600
     BatchNorm2d-137            [-1, 960, 7, 7]           1,920
           ReLU6-138            [-1, 960, 7, 7]               0
          Conv2d-139            [-1, 960, 7, 7]           8,640
     BatchNorm2d-140            [-1, 960, 7, 7]           1,920
           ReLU6-141            [-1, 960, 7, 7]               0
          Conv2d-142            [-1, 160, 7, 7]         153,600
     BatchNorm2d-143            [-1, 160, 7, 7]             320
InvertedResidual-144            [-1, 160, 7, 7]               0
          Conv2d-145            [-1, 960, 7, 7]         153,600
     BatchNorm2d-146            [-1, 960, 7, 7]           1,920
           ReLU6-147            [-1, 960, 7, 7]               0
          Conv2d-148            [-1, 960, 7, 7]           8,640
     BatchNorm2d-149            [-1, 960, 7, 7]           1,920
           ReLU6-150            [-1, 960, 7, 7]               0
          Conv2d-151            [-1, 320, 7, 7]         307,200
     BatchNorm2d-152            [-1, 320, 7, 7]             640
InvertedResidual-153            [-1, 320, 7, 7]               0
          Conv2d-154           [-1, 1280, 7, 7]         409,600
     BatchNorm2d-155           [-1, 1280, 7, 7]           2,560
           ReLU6-156           [-1, 1280, 7, 7]               0
         Dropout-157                 [-1, 1280]               0
          Linear-158                 [-1, 1000]       1,281,000
================================================================
Total params: 3,504,872
Trainable params: 3,504,872
Non-trainable params: 0
----------------------------------------------------------------
Input size (MB): 0.57
Forward/backward pass size (MB): 152.87
Params size (MB): 13.37
Estimated Total Size (MB): 166.81
----------------------------------------------------------------
</code></pre><h3 id="_1-2-检测图像" tabindex="-1"><a class="header-anchor" href="#_1-2-检测图像" aria-hidden="true">#</a> 1.2 检测图像</h3><p>该部分主要为检测图像，查看模型结果。一般来说pytorch导出的onnx模型都是用于C++调用，所以基于OpenCV直接读取图像，进行图像通道转换以及图像归一化以模拟实际C++调用情况，而不是用pillow和pytorch的transform。一般来说C++提供的图像都是经由OpenCV调用而来。主要内容如下：</p><ol><li>基于OpenCV读取图像,进行通道转换</li><li>将图像进行归一化</li><li>进行模型推理，查看结果</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ----- 2 检测图像</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 2 检测图像 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 待检测图像路径 </span>
img_path <span class="token operator">=</span> <span class="token string">&#39;./image/rabbit.jpg&#39;</span>

<span class="token comment">## 读取图像</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>img_path<span class="token punctuation">)</span>
<span class="token comment">## 图像通道转换</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>img<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2RGB<span class="token punctuation">)</span>
<span class="token comment">## 展示图像</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 图像大小重置为模型输入图像大小</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 图像归一化</span>
mean <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.485</span><span class="token punctuation">,</span> <span class="token number">0.456</span><span class="token punctuation">,</span> <span class="token number">0.406</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>
std <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.229</span><span class="token punctuation">,</span> <span class="token number">0.224</span><span class="token punctuation">,</span> <span class="token number">0.225</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>
img <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">(</span>img <span class="token operator">/</span> <span class="token number">255.0</span> <span class="token operator">-</span> mean<span class="token punctuation">)</span> <span class="token operator">/</span> std<span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>

<span class="token comment">## 图像通道转换</span>
img <span class="token operator">=</span> img<span class="token punctuation">.</span>transpose<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 获得pytorch需要的输入图像格式NCHW</span>
img_ <span class="token operator">=</span> torch<span class="token punctuation">.</span>from_numpy<span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">.</span>unsqueeze<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
img_ <span class="token operator">=</span> img_<span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
<span class="token comment">## 推理</span>
outputs <span class="token operator">=</span> model<span class="token punctuation">(</span>img_<span class="token punctuation">)</span>

<span class="token comment">## 得到预测结果，并且按概率从大到小排序</span>
_<span class="token punctuation">,</span> indices <span class="token operator">=</span> torch<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>outputs<span class="token punctuation">,</span> descending<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment">## 返回top5每个预测标签的百分数</span>
percentage <span class="token operator">=</span> torch<span class="token punctuation">.</span>nn<span class="token punctuation">.</span>functional<span class="token punctuation">.</span>softmax<span class="token punctuation">(</span>outputs<span class="token punctuation">,</span> dim<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">100</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;预测标签为: {},预测概率为:{};&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> percentage<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> idx <span class="token keyword">in</span> indices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 保存/载入整个pytorch模型</span>
<span class="token comment">## torch.save(model, &#39;model.ckpt&#39;)</span>
<span class="token comment">## model = torch.load(&#39;model.ckpt&#39;)</span>

<span class="token comment">## 仅仅保存/载入pytorch模型的参数</span>
<span class="token comment">## torch.save(model.state_dict(), &#39;params.ckpt&#39;)</span>
<span class="token comment">## model.load_state_dict(torch.load(&#39;params.ckpt&#39;))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 2 检测图像 -----
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] Pytorch模型转换为onnx模型笔记/20201209202924553.png?ref_type=heads" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><pre><code>[&#39;预测标签为: 331,预测概率为:54.409969329833984;&#39;, &#39;预测标签为: 330,预测概率为:33.62083435058594;&#39;, &#39;预测标签为: 332,预测概率为:11.84182071685791;&#39;, &#39;预测标签为: 263,预测概率为:0.05221949517726898;&#39;, &#39;预测标签为: 264,预测概率为:0.027525480836629868;&#39;]
</code></pre><h3 id="_1-3-导出为onnx模型" tabindex="-1"><a class="header-anchor" href="#_1-3-导出为onnx模型" aria-hidden="true">#</a> 1.3 导出为onnx模型</h3><p>该部分主要为导出onnx模型，两行代码就可以搞定,onnx模型导出路径为当前目录下mobilenet_v2.onnx。具体如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>x <span class="token operator">=</span> torch<span class="token punctuation">.</span>rand<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span>
torch_out <span class="token operator">=</span> torch<span class="token punctuation">.</span>onnx<span class="token punctuation">.</span>_export<span class="token punctuation">(</span>model<span class="token punctuation">,</span> x<span class="token punctuation">,</span> output_name<span class="token punctuation">,</span> export_params<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                               input_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> output_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;output&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ---- 3 导出为onnx模型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 3 导出为onnx模型 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## An example input you would normally provide to your model&#39;s forward() method</span>
<span class="token comment">## x为输入图像，格式为pytorch的NCHW格式；1为图像数一般不需要修改；3为通道数；224，224为图像高宽；</span>
x <span class="token operator">=</span> torch<span class="token punctuation">.</span>rand<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span>
<span class="token comment">## 模型输出名</span>
output_name <span class="token operator">=</span> <span class="token string">&quot;mobilenet_v2.onnx&quot;</span>
<span class="token comment">## Export the model</span>
<span class="token comment">## 导出为onnx模型</span>
<span class="token comment">## model为模型，x为模型输入，&quot;mobilenet_v2.onnx&quot;为onnx输出名，export_params表示是否保存模型参数</span>
<span class="token comment">## input_names为onnx模型输入节点名字，需要输入列表</span>
<span class="token comment">## output_names为onnx模型输出节点名字，需要输入列表；如果是多输出修改为output_names=[&quot;output1&quot;,&quot;output2&quot;]</span>
torch_out <span class="token operator">=</span> torch<span class="token punctuation">.</span>onnx<span class="token punctuation">.</span>_export<span class="token punctuation">(</span>model<span class="token punctuation">,</span> x<span class="token punctuation">,</span> output_name<span class="token punctuation">,</span> export_params<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                               input_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> output_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;output&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型导出成功&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 3 导出为onnx模型 -----
模型导出成功
</code></pre><h3 id="_1-4-模型测试" tabindex="-1"><a class="header-anchor" href="#_1-4-模型测试" aria-hidden="true">#</a> 1.4 模型测试</h3>`,22),k={href:"https://github.com/lutzroeder/Netron",target:"_blank",rel:"noopener noreferrer"},m=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ---- 4 模型测试(可跳过)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 4 模型测试 -----&quot;</span><span class="token punctuation">)</span>


<span class="token comment">## 可以跳过该步骤，一般不会有问题</span>

<span class="token comment">## 检查输出</span>
<span class="token keyword">def</span> <span class="token function">check_onnx_output</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> input_data<span class="token punctuation">,</span> torch_output<span class="token punctuation">)</span><span class="token punctuation">:</span>
    session <span class="token operator">=</span> onnxruntime<span class="token punctuation">.</span>InferenceSession<span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
    input_name <span class="token operator">=</span> session<span class="token punctuation">.</span>get_inputs<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name
    result <span class="token operator">=</span> session<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>input_name<span class="token punctuation">:</span> input_data<span class="token punctuation">.</span>numpy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> test_result<span class="token punctuation">,</span> gold_result <span class="token keyword">in</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> torch_output<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        np<span class="token punctuation">.</span>testing<span class="token punctuation">.</span>assert_almost_equal<span class="token punctuation">(</span>
            gold_result<span class="token punctuation">.</span>cpu<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>numpy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> test_result<span class="token punctuation">,</span> decimal<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>
    <span class="token keyword">return</span> result


<span class="token comment">## 检查模型</span>
<span class="token keyword">def</span> <span class="token function">check_onnx_model</span><span class="token punctuation">(</span>model<span class="token punctuation">,</span> onnx_filename<span class="token punctuation">,</span> input_image<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> torch<span class="token punctuation">.</span>no_grad<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        torch_out <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;output&quot;</span><span class="token punctuation">:</span> model<span class="token punctuation">(</span>input_image<span class="token punctuation">)</span><span class="token punctuation">}</span>
    check_onnx_output<span class="token punctuation">(</span>onnx_filename<span class="token punctuation">,</span> input_image<span class="token punctuation">,</span> torch_out<span class="token punctuation">)</span>
    onnx_model <span class="token operator">=</span> onnx<span class="token punctuation">.</span>load<span class="token punctuation">(</span>onnx_filename<span class="token punctuation">)</span>
    onnx<span class="token punctuation">.</span>checker<span class="token punctuation">.</span>check_model<span class="token punctuation">(</span>onnx_model<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型测试成功&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> onnx_model

<span class="token comment">## 检测导出的onnx模型是否完整</span>
<span class="token comment">## 一般出现问题程序直接报错，不过很少出现问题</span>
onnx_model <span class="token operator">=</span> check_onnx_model<span class="token punctuation">(</span>model<span class="token punctuation">,</span> output_name<span class="token punctuation">,</span> x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 4 模型测试 -----
模型测试成功
</code></pre><h3 id="_1-5-模型简化" tabindex="-1"><a class="header-anchor" href="#_1-5-模型简化" aria-hidden="true">#</a> 1.5 模型简化</h3>`,3),v={href:"https://github.com/daquexian/onnx-simplifier",target:"_blank",rel:"noopener noreferrer"},b=n("li",null,"调用代码，调用onnx-simplifier的simplify接口",-1),h=n("li",null,"命令行简化，直接输入python3 -m onnxsim input_onnx_model output_onnx_model",-1),_={href:"https://github.com/daquexian/onnx-simplifier",target:"_blank",rel:"noopener noreferrer"},x={href:"https://convertmodel.com/",target:"_blank",rel:"noopener noreferrer"},y=p(`<p>具体来说推荐第三种在线使用，第三种在线调用方便，还能将onnx模型转换为ncnn,mnn等模型格式。</p><p>P.S. onnx-simplifier对于高版本pytorch不那么支持，转换可能失败，所以设置skip_fuse_bn=True跳过融合bn层。这种情况下onnx-simplifier转换出来的onnx模型可能比转换前的模型大，原因是补充了shape信息。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ----- 5 模型简化</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 5 模型简化 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 基于onnx-simplifier简化模型，https://github.com/daquexian/onnx-simplifier</span>
<span class="token comment">## 也可以命令行输入python3 -m onnxsim input_onnx_model output_onnx_model</span>
<span class="token comment">## 或者使用在线网站直接转换https://convertmodel.com/</span>

<span class="token comment">## 输出模型名</span>
filename <span class="token operator">=</span> output_name <span class="token operator">+</span> <span class="token string">&quot;sim.onnx&quot;</span>
<span class="token comment">## 简化模型</span>
<span class="token comment">## 设置skip_fuse_bn=True表示跳过融合bn层，pytorch高版本融合bn层会出错</span>
simplified_model<span class="token punctuation">,</span> check <span class="token operator">=</span> simplify<span class="token punctuation">(</span>onnx_model<span class="token punctuation">,</span> skip_fuse_bn<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
onnx<span class="token punctuation">.</span>save_model<span class="token punctuation">(</span>simplified_model<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
onnx<span class="token punctuation">.</span>checker<span class="token punctuation">.</span>check_model<span class="token punctuation">(</span>simplified_model<span class="token punctuation">)</span>
<span class="token comment">## 如果出错</span>
<span class="token keyword">assert</span> check<span class="token punctuation">,</span> <span class="token string">&quot;简化模型失败&quot;</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型简化成功&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 5 模型简化 -----
模型简化成功
</code></pre><h3 id="_1-6-全部代码" tabindex="-1"><a class="header-anchor" href="#_1-6-全部代码" aria-hidden="true">#</a> 1.6 全部代码</h3><p>全部工程代码如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## -*- coding: utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
Created on Tue Dec  8 19:44:42 2020

@author: luohenyueji
&quot;&quot;&quot;</span>

<span class="token keyword">import</span> torch
<span class="token keyword">from</span> torchvision <span class="token keyword">import</span> models
<span class="token keyword">import</span> cv2
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">from</span> torchsummary <span class="token keyword">import</span> summary
<span class="token keyword">import</span> onnxruntime
<span class="token keyword">from</span> onnxsim <span class="token keyword">import</span> simplify
<span class="token keyword">import</span> onnx
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt

<span class="token comment">## 判断使用CPU还是GPU</span>
device <span class="token operator">=</span> torch<span class="token punctuation">.</span>device<span class="token punctuation">(</span><span class="token string">&quot;cuda:0&quot;</span> <span class="token keyword">if</span> torch<span class="token punctuation">.</span>cuda<span class="token punctuation">.</span>is_available<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token string">&quot;cpu&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## ----- 1 读取模型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 1 读取模型 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 载入模型并读取权重</span>
model <span class="token operator">=</span> models<span class="token punctuation">.</span>mobilenet_v2<span class="token punctuation">(</span>pretrained<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment">## 将模型转换为推理模式</span>
model<span class="token punctuation">.</span><span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 查看模型的结构，(3,224,224)为模型的图像输入</span>
<span class="token comment">## summary(model, (3, 224, 224))</span>

<span class="token comment">## ----- 2 检测图像</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 2 检测图像 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 待检测图像路径 </span>
img_path <span class="token operator">=</span> <span class="token string">&#39;./image/rabbit.jpg&#39;</span>

<span class="token comment">## 读取图像</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>imread<span class="token punctuation">(</span>img_path<span class="token punctuation">)</span>
<span class="token comment">## 图像通道转换</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>cvtColor<span class="token punctuation">(</span>img<span class="token punctuation">,</span> cv2<span class="token punctuation">.</span>COLOR_BGR2RGB<span class="token punctuation">)</span>
<span class="token comment">## 展示图像</span>
<span class="token comment">## plt.imshow(img)</span>
<span class="token comment">## plt.show()</span>
<span class="token comment">## 图像大小重置为模型输入图像大小</span>
img <span class="token operator">=</span> cv2<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 图像归一化</span>
mean <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.485</span><span class="token punctuation">,</span> <span class="token number">0.456</span><span class="token punctuation">,</span> <span class="token number">0.406</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>
std <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.229</span><span class="token punctuation">,</span> <span class="token number">0.224</span><span class="token punctuation">,</span> <span class="token number">0.225</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>
img <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">(</span>img <span class="token operator">/</span> <span class="token number">255.0</span> <span class="token operator">-</span> mean<span class="token punctuation">)</span> <span class="token operator">/</span> std<span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>

<span class="token comment">## 图像通道转换</span>
img <span class="token operator">=</span> img<span class="token punctuation">.</span>transpose<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 获得pytorch需要的输入图像格式NCHW</span>
img_ <span class="token operator">=</span> torch<span class="token punctuation">.</span>from_numpy<span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">.</span>unsqueeze<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
img_ <span class="token operator">=</span> img_<span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
<span class="token comment">## 推理</span>
outputs <span class="token operator">=</span> model<span class="token punctuation">(</span>img_<span class="token punctuation">)</span>

<span class="token comment">## 得到预测结果，并且按概率从大到小排序</span>
_<span class="token punctuation">,</span> indices <span class="token operator">=</span> torch<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>outputs<span class="token punctuation">,</span> descending<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment">## 返回top5每个预测标签的百分数</span>
percentage <span class="token operator">=</span> torch<span class="token punctuation">.</span>nn<span class="token punctuation">.</span>functional<span class="token punctuation">.</span>softmax<span class="token punctuation">(</span>outputs<span class="token punctuation">,</span> dim<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token number">100</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;预测标签为: {},预测概率为:{};&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> percentage<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">.</span>item<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> idx <span class="token keyword">in</span> indices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 保存/载入整个pytorch模型</span>
<span class="token comment">## torch.save(model, &#39;model.ckpt&#39;)</span>
<span class="token comment">## model = torch.load(&#39;model.ckpt&#39;)</span>

<span class="token comment">## 仅仅保存/载入pytorch模型的参数</span>
<span class="token comment">## torch.save(model.state_dict(), &#39;params.ckpt&#39;)</span>
<span class="token comment">## model.load_state_dict(torch.load(&#39;params.ckpt&#39;))</span>

<span class="token comment">## ---- 3 导出为onnx模型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 3 导出为onnx模型 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## An example input you would normally provide to your model&#39;s forward() method</span>
<span class="token comment">## x为输入图像，格式为pytorch的NCHW格式；1为图像数一般不需要修改；3为通道数；224，224为图像高宽；</span>
x <span class="token operator">=</span> torch<span class="token punctuation">.</span>rand<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">,</span> <span class="token number">224</span><span class="token punctuation">)</span>
<span class="token comment">## 模型输出名</span>
output_name <span class="token operator">=</span> <span class="token string">&quot;mobilenet_v2.onnx&quot;</span>
<span class="token comment">## Export the model</span>
<span class="token comment">## 导出为onnx模型</span>
<span class="token comment">## model为模型，x为模型输入，&quot;mobilenet_v2.onnx&quot;为onnx输出名，export_params表示是否保存模型参数</span>
<span class="token comment">## input_names为onnx模型输入节点名字，需要输入列表</span>
<span class="token comment">## output_names为onnx模型输出节点名字，需要输入列表；如果是多输出修改为output_names=[&quot;output1&quot;,&quot;output2&quot;]</span>
torch_out <span class="token operator">=</span> torch<span class="token punctuation">.</span>onnx<span class="token punctuation">.</span>_export<span class="token punctuation">(</span>model<span class="token punctuation">,</span> x<span class="token punctuation">,</span> output_name<span class="token punctuation">,</span> export_params<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                               input_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;input&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> output_names<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;output&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型导出成功&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## ---- 4 模型测试(可跳过)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 4 模型测试 -----&quot;</span><span class="token punctuation">)</span>


<span class="token comment">## 可以跳过该步骤，一般不会有问题</span>

<span class="token comment">## 检查输出</span>
<span class="token keyword">def</span> <span class="token function">check_onnx_output</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> input_data<span class="token punctuation">,</span> torch_output<span class="token punctuation">)</span><span class="token punctuation">:</span>
    session <span class="token operator">=</span> onnxruntime<span class="token punctuation">.</span>InferenceSession<span class="token punctuation">(</span>filename<span class="token punctuation">)</span>
    input_name <span class="token operator">=</span> session<span class="token punctuation">.</span>get_inputs<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name
    result <span class="token operator">=</span> session<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>input_name<span class="token punctuation">:</span> input_data<span class="token punctuation">.</span>numpy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> test_result<span class="token punctuation">,</span> gold_result <span class="token keyword">in</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> torch_output<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        np<span class="token punctuation">.</span>testing<span class="token punctuation">.</span>assert_almost_equal<span class="token punctuation">(</span>
            gold_result<span class="token punctuation">.</span>cpu<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>numpy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> test_result<span class="token punctuation">,</span> decimal<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span>
    <span class="token keyword">return</span> result


<span class="token comment">## 检查模型</span>
<span class="token keyword">def</span> <span class="token function">check_onnx_model</span><span class="token punctuation">(</span>model<span class="token punctuation">,</span> onnx_filename<span class="token punctuation">,</span> input_image<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> torch<span class="token punctuation">.</span>no_grad<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        torch_out <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;output&quot;</span><span class="token punctuation">:</span> model<span class="token punctuation">(</span>input_image<span class="token punctuation">)</span><span class="token punctuation">}</span>
    check_onnx_output<span class="token punctuation">(</span>onnx_filename<span class="token punctuation">,</span> input_image<span class="token punctuation">,</span> torch_out<span class="token punctuation">)</span>
    onnx_model <span class="token operator">=</span> onnx<span class="token punctuation">.</span>load<span class="token punctuation">(</span>onnx_filename<span class="token punctuation">)</span>
    onnx<span class="token punctuation">.</span>checker<span class="token punctuation">.</span>check_model<span class="token punctuation">(</span>onnx_model<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型测试成功&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> onnx_model


<span class="token comment">## 检测导出的onnx模型是否完整</span>
<span class="token comment">## 一般出现问题程序直接报错，不过很少出现问题</span>
onnx_model <span class="token operator">=</span> check_onnx_model<span class="token punctuation">(</span>model<span class="token punctuation">,</span> output_name<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

<span class="token comment">## ----- 5 模型简化</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;----- 5 模型简化 -----&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 基于onnx-simplifier简化模型，https://github.com/daquexian/onnx-simplifier</span>
<span class="token comment">## 也可以命令行输入python3 -m onnxsim input_onnx_model output_onnx_model</span>
<span class="token comment">## 或者使用在线网站直接转换https://convertmodel.com/</span>

<span class="token comment">## 输出模型名</span>
filename <span class="token operator">=</span> output_name <span class="token operator">+</span> <span class="token string">&quot;sim.onnx&quot;</span>
<span class="token comment">## 简化模型</span>
<span class="token comment">## 设置skip_fuse_bn=True表示跳过融合bn层，pytorch高版本融合bn层会出错</span>
simplified_model<span class="token punctuation">,</span> check <span class="token operator">=</span> simplify<span class="token punctuation">(</span>onnx_model<span class="token punctuation">,</span> skip_fuse_bn<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
onnx<span class="token punctuation">.</span>save_model<span class="token punctuation">(</span>simplified_model<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
onnx<span class="token punctuation">.</span>checker<span class="token punctuation">.</span>check_model<span class="token punctuation">(</span>simplified_model<span class="token punctuation">)</span>
<span class="token comment">## 如果出错</span>
<span class="token keyword">assert</span> check<span class="token punctuation">,</span> <span class="token string">&quot;简化模型失败&quot;</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;模型简化成功&quot;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>----- 1 读取模型 -----
----- 2 检测图像 -----
[&#39;预测标签为: 331,预测概率为:54.409969329833984;&#39;, &#39;预测标签为: 330,预测概率为:33.62083435058594;&#39;, &#39;预测标签为: 332,预测概率为:11.84182071685791;&#39;, &#39;预测标签为: 263,预测概率为:0.05221949517726898;&#39;, &#39;预测标签为: 264,预测概率为:0.027525480836629868;&#39;]
----- 3 导出为onnx模型 -----
模型导出成功
----- 4 模型测试 -----
模型测试成功
----- 5 模型简化 -----
模型简化成功
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,9),g={href:"https://github.com/lutzroeder/Netron",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/Tencent/ncnn/wiki/use-ncnn-with-pytorch-or-onnx",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.learnopencv.com/pytorch-to-coreml-model-conversion/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/daquexian/onnx-simplifier",target:"_blank",rel:"noopener noreferrer"},C={href:"https://convertmodel.com/",target:"_blank",rel:"noopener noreferrer"};function N(B,R){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("本文主要介绍将pytorch模型准确导出为可用的onnx模型。以方便OpenCV Dnn,NCNN,MNN,TensorRT等框架调用。所有代码见："),n("a",r,[s("Python-Study-Notes"),t(a)])]),d,n("p",null,[s("该部分主要为测试模型，一般可以跳过，不需要这部分代码，通常模型转换不会出错。另外onnx模型可以通过"),n("a",k,[s("Netron"),t(a)]),s("查看结构。")]),m,n("p",null,[s("一般来说导出后的onnx模型会有一堆冗余操作，需要简化。推荐使用"),n("a",v,[s("onnx-simplifier"),t(a)]),s("进行onnx模型简化。onnx简化模型导出路径为当前目录下mobilenet_v2.onnxsim.onnx 调用onnx-simplifier有三种办法：")]),n("ol",null,[b,h,n("li",null,[s("在线调用，调用"),n("a",_,[s("onnx-simplifier"),t(a)]),s("作者的"),n("a",x,[s("https://convertmodel.com/"),t(a)]),s("直接进行模型简化。")])]),y,n("ul",null,[n("li",null,[n("a",g,[s("Netron"),t(a)])]),n("li",null,[n("a",f,[s("use ncnn with pytorch or onnx"),t(a)])]),n("li",null,[n("a",q,[s("PyTorch to CoreML model conversion"),t(a)])]),n("li",null,[n("a",w,[s("onnx-simplifier"),t(a)])]),n("li",null,[n("a",C,[s("https://convertmodel.com/"),t(a)])])])])}const I=e(l,[["render",N],["__file","2020-12-09-_深度学习_ Pytorch模型转换为onnx模型笔记.html.vue"]]);export{I as default};
