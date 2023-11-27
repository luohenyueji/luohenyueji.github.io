import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c,a as n,b as s,d as t,e}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"深度学习-imgaug边界框增强笔记",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深度学习-imgaug边界框增强笔记","aria-hidden":"true"},"#"),s(" [深度学习] imgaug边界框增强笔记")],-1),r={href:"https://blog.csdn.net/LuohenYJ/article/details/109254943",target:"_blank",rel:"noopener noreferrer"},d=e(`<h2 id="_0-示例图像和标注文件" tabindex="-1"><a class="header-anchor" href="#_0-示例图像和标注文件" aria-hidden="true">#</a> 0 示例图像和标注文件</h2><p>示例图像如图所示</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/demo.jpg" alt="demo" tabindex="0" loading="lazy"><figcaption>demo</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 对应的标注文件</span>
!cat demo<span class="token punctuation">.</span>xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;?xml version=&quot;1.0&quot; ?&gt;
&lt;annotation&gt;
&lt;folder&gt;demo&lt;/folder&gt;
&lt;filename&gt;demo.jpg&lt;/filename&gt;
&lt;path&gt;demo.jpg&lt;/path&gt;
&lt;source&gt;
    &lt;database&gt;Unknown&lt;/database&gt;
&lt;/source&gt;
&lt;size&gt;
    &lt;width&gt;640&lt;/width&gt;
    &lt;height&gt;424&lt;/height&gt;
    &lt;depth&gt;3&lt;/depth&gt;
&lt;/size&gt;

&lt;segmented&gt;0&lt;/segmented&gt;
    &lt;object&gt;
    &lt;name&gt;person&lt;/name&gt;
    &lt;pose&gt;Unspecified&lt;/pose&gt;
    &lt;truncated&gt;0&lt;/truncated&gt;
    &lt;difficult&gt;0&lt;/difficult&gt;
    &lt;bndbox&gt;
        &lt;xmin&gt;187&lt;/xmin&gt;
        &lt;ymin&gt;93&lt;/ymin&gt;
        &lt;xmax&gt;276&lt;/xmax&gt;
        &lt;ymax&gt;378&lt;/ymax&gt;
    &lt;/bndbox&gt;
&lt;/object&gt;
    &lt;object&gt;
    &lt;name&gt;horse&lt;/name&gt;
    &lt;pose&gt;Unspecified&lt;/pose&gt;
    &lt;truncated&gt;0&lt;/truncated&gt;
    &lt;difficult&gt;0&lt;/difficult&gt;
    &lt;bndbox&gt;
        &lt;xmin&gt;390&lt;/xmin&gt;
        &lt;ymin&gt;138&lt;/ymin&gt;
        &lt;xmax&gt;602&lt;/xmax&gt;
        &lt;ymax&gt;345&lt;/ymax&gt;
    &lt;/bndbox&gt;
&lt;/object&gt;
    &lt;object&gt;
    &lt;name&gt;dog&lt;/name&gt;
    &lt;pose&gt;Unspecified&lt;/pose&gt;
    &lt;truncated&gt;0&lt;/truncated&gt;
    &lt;difficult&gt;0&lt;/difficult&gt;
    &lt;bndbox&gt;
        &lt;xmin&gt;61&lt;/xmin&gt;
        &lt;ymin&gt;256&lt;/ymin&gt;
        &lt;xmax&gt;207&lt;/xmax&gt;
        &lt;ymax&gt;348&lt;/ymax&gt;
    &lt;/bndbox&gt;
&lt;/object&gt;
&lt;/annotation&gt;
</code></pre><h2 id="_1-imgaug加载图像和标注数据" tabindex="-1"><a class="header-anchor" href="#_1-imgaug加载图像和标注数据" aria-hidden="true">#</a> 1 imgaug加载图像和标注数据</h2>`,6),k={href:"https://cuiqingcai.com/5548.html",target:"_blank",rel:"noopener noreferrer"},m=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> bs4 <span class="token keyword">import</span> BeautifulSoup
<span class="token keyword">import</span> imgaug <span class="token keyword">as</span> ia
<span class="token keyword">import</span> imageio
<span class="token keyword">from</span> imgaug<span class="token punctuation">.</span>augmentables<span class="token punctuation">.</span>bbs <span class="token keyword">import</span> BoundingBox<span class="token punctuation">,</span> BoundingBoxesOnImage
<span class="token keyword">from</span> imgaug <span class="token keyword">import</span> augmenters <span class="token keyword">as</span> iaa 

<span class="token comment">## 打开标注文件</span>
soup <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;demo.xml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;lxml&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 导入图像</span>
image <span class="token operator">=</span> imageio<span class="token punctuation">.</span>imread<span class="token punctuation">(</span><span class="token string">&quot;demo.jpg&quot;</span><span class="token punctuation">)</span>


<span class="token comment">## 用于存放标注文件边界框信息</span>
bbsOnImg<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">## 找到所有包含框选目标的节点</span>
<span class="token keyword">for</span> objects <span class="token keyword">in</span> soup<span class="token punctuation">.</span>find_all<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 获得当前边界框的分类名</span>
    object_name <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span>find<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>string<span class="token punctuation">)</span>
    <span class="token comment">## 提取坐标点信息</span>
    xmin <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span>xmin<span class="token punctuation">.</span>string<span class="token punctuation">)</span>
    ymin <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span>ymin<span class="token punctuation">.</span>string<span class="token punctuation">)</span>
    xmax <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span>xmax<span class="token punctuation">.</span>string<span class="token punctuation">)</span>
    ymax <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>objects<span class="token punctuation">.</span>ymax<span class="token punctuation">.</span>string<span class="token punctuation">)</span>
    <span class="token comment">## 保存该边界框的信息</span>
    bbsOnImg<span class="token punctuation">.</span>append<span class="token punctuation">(</span>BoundingBox<span class="token punctuation">(</span>x1<span class="token operator">=</span>xmin<span class="token punctuation">,</span> x2<span class="token operator">=</span>xmax<span class="token punctuation">,</span> y1<span class="token operator">=</span>ymin<span class="token punctuation">,</span> y2<span class="token operator">=</span>ymax<span class="token punctuation">,</span>label<span class="token operator">=</span>object_name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 初始化imgaug的标选框数据</span>
bbs <span class="token operator">=</span> BoundingBoxesOnImage<span class="token punctuation">(</span> bbsOnImg<span class="token punctuation">,</span>shape<span class="token operator">=</span>image<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>
<span class="token comment">## 展示结果</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-边界框增强" tabindex="-1"><a class="header-anchor" href="#_2-边界框增强" aria-hidden="true">#</a> 2 边界框增强</h2><p>imgaug中的边界框增强有两种办法，一种是对整张图像增强，另外一种是根据边界框信息，图像部分区域增强。</p><h3 id="_2-1-整张图像增强" tabindex="-1"><a class="header-anchor" href="#_2-1-整张图像增强" aria-hidden="true">#</a> 2.1 整张图像增强</h3>`,5),g={href:"https://imgaug.readthedocs.io/en/latest/source/overview_of_augmenters.html",target:"_blank",rel:"noopener noreferrer"},b=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 增强效果</span>
seq <span class="token operator">=</span> iaa<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span><span class="token punctuation">[</span>
    iaa<span class="token punctuation">.</span>GammaContrast<span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    iaa<span class="token punctuation">.</span>Fliplr<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    iaa<span class="token punctuation">.</span>Cutout<span class="token punctuation">(</span>fill_mode<span class="token operator">=</span><span class="token string">&quot;constant&quot;</span><span class="token punctuation">,</span> cval<span class="token operator">=</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    iaa<span class="token punctuation">.</span>CoarseDropout<span class="token punctuation">(</span><span class="token number">0.02</span><span class="token punctuation">,</span> size_percent<span class="token operator">=</span><span class="token number">0.15</span><span class="token punctuation">,</span> per_channel<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 输入增强前的图像和边框，得到增强后的图像和边框</span>
image_aug<span class="token punctuation">,</span> bbs_aug <span class="token operator">=</span> seq<span class="token punctuation">(</span>image<span class="token operator">=</span>image<span class="token punctuation">,</span> bounding_boxes<span class="token operator">=</span>bbs<span class="token punctuation">)</span>
<span class="token comment">## 可视化，size边框的宽度</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-图像部分区域增强" tabindex="-1"><a class="header-anchor" href="#_2-2-图像部分区域增强" aria-hidden="true">#</a> 2.2 图像部分区域增强</h3><p>imgaug可以只对边界框框选区域或者除边界框的区域进行图像增强，通过imgaug的BlendAlphaBoundingBoxes类实现。BlendAlphaBoundingBoxes类的接口说明如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>classimgaug.augmenters.blend.BlendAlphaBoundingBoxes(labels, foreground=None, background=None, nb_sample_labels=None, seed=None, name=None, random_state=&#39;deprecated&#39;, deterministic=&#39;deprecated&#39;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该类的常用参数为labels，foreground，background。labels表示对哪一类或哪几类的边界框进行处理，为None表示所有标签都处理。foreground设置对labels标注的边界框区域增强效果。background设置对除边界库区域增强效果。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## demo1</span>
seq <span class="token operator">=</span> iaa<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token comment">## background设置除了dog和person标选框之外的区域都涂黑</span>
    iaa<span class="token punctuation">.</span>BlendAlphaBoundingBoxes<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;dog&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;person&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>background<span class="token operator">=</span>iaa<span class="token punctuation">.</span>Multiply<span class="token punctuation">(</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">## 对整张图进行增强</span>
    <span class="token comment">#iaa.Cartoon()</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 输入增强前的图像和边框，得到增强后的图像和边框</span>
image_aug<span class="token punctuation">,</span> bbs_aug <span class="token operator">=</span> seq<span class="token punctuation">(</span>image<span class="token operator">=</span>image<span class="token punctuation">,</span> bounding_boxes<span class="token operator">=</span>bbs<span class="token punctuation">)</span>
<span class="token comment">## 可视化，size边框的宽度</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_11_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## demo2</span>
seq <span class="token operator">=</span> iaa<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token comment">## label=None表示不选择特定标签，即对所以标签进行处理</span>
    iaa<span class="token punctuation">.</span>BlendAlphaBoundingBoxes<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span>foreground<span class="token operator">=</span>iaa<span class="token punctuation">.</span>Fog<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 输入增强前的图像和边框，得到增强后的图像和边框</span>
image_aug<span class="token punctuation">,</span> bbs_aug <span class="token operator">=</span> seq<span class="token punctuation">(</span>image<span class="token operator">=</span>image<span class="token punctuation">,</span> bounding_boxes<span class="token operator">=</span>bbs<span class="token punctuation">)</span>
<span class="token comment">## 可视化，size边框的宽度</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## demo3</span>
seq <span class="token operator">=</span> iaa<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token comment">## 前后景分别处理</span>
    iaa<span class="token punctuation">.</span>BlendAlphaBoundingBoxes<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;dog&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;person&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>foreground<span class="token operator">=</span>iaa<span class="token punctuation">.</span>Fog<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>background<span class="token operator">=</span>iaa<span class="token punctuation">.</span>Cartoon<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">## 整张图片增强效果</span>
    iaa<span class="token punctuation">.</span>Fliplr<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 输入增强前的图像和边框，得到增强后的图像和边框</span>
image_aug<span class="token punctuation">,</span> bbs_aug <span class="token operator">=</span> seq<span class="token punctuation">(</span>image<span class="token operator">=</span>image<span class="token punctuation">,</span> bounding_boxes<span class="token operator">=</span>bbs<span class="token punctuation">)</span>
<span class="token comment">## 可视化，size边框的宽度</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_13_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-边界框超出图像范围解决办法" tabindex="-1"><a class="header-anchor" href="#_2-3-边界框超出图像范围解决办法" aria-hidden="true">#</a> 2.3 边界框超出图像范围解决办法</h3>`,13),v={href:"https://blog.csdn.net/LuohenYJ/article/details/109254943",target:"_blank",rel:"noopener noreferrer"},h=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>seq <span class="token operator">=</span> iaa<span class="token punctuation">.</span>Sequential<span class="token punctuation">(</span><span class="token punctuation">[</span>
    iaa<span class="token punctuation">.</span>Affine<span class="token punctuation">(</span>rotate<span class="token operator">=</span><span class="token number">80</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>


<span class="token comment">## 输入增强前的图像和边框，得到增强后的图像和边框</span>
image_aug<span class="token punctuation">,</span> bbs_aug <span class="token operator">=</span> seq<span class="token punctuation">(</span>image<span class="token operator">=</span>image<span class="token punctuation">,</span> bounding_boxes<span class="token operator">=</span>bbs<span class="token punctuation">)</span>
<span class="token comment">## 可视化，size边框的宽度</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 显示边界框结果，可以看到dog和horse的边界框范围超过图像。</span>
bbs_aug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_15_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>BoundingBoxesOnImage([BoundingBox(x1=133.4267, y1=60.3564, x2=429.5516, y2=197.4940, label=person), BoundingBox(x1=201.1759, y1=268.0866, x2=441.8446, y2=512.8110, label=horse), BoundingBox(x1=141.0913, y1=-35.4247, x2=257.0462, y2=124.3329, label=dog)], shape=(424, 640, 3))
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 删除超过图像范围的边界框范围</span>
bbs_aug_clip <span class="token operator">=</span>bbs_aug<span class="token punctuation">.</span>clip_out_of_image<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 可视化</span>
ia<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>bbs_aug_clip<span class="token punctuation">.</span>draw_on_image<span class="token punctuation">(</span>image_aug<span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
bbs_aug_clip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] imgaug边界框增强笔记/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>BoundingBoxesOnImage([BoundingBox(x1=133.4267, y1=60.3564, x2=429.5516, y2=197.4940, label=person), BoundingBox(x1=201.1759, y1=268.0866, x2=441.8446, y2=424.0000, label=horse), BoundingBox(x1=141.0913, y1=0.0000, x2=257.0462, y2=124.3329, label=dog)], shape=(424, 640, 3))
</code></pre><h2 id="_3-保存增强图像和标注文件" tabindex="-1"><a class="header-anchor" href="#_3-保存增强图像和标注文件" aria-hidden="true">#</a> 3 保存增强图像和标注文件</h2>`,7),_={href:"https://blog.csdn.net/u014090429/article/details/94613764",target:"_blank",rel:"noopener noreferrer"},x=e(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## xml文件生成代码</span>
<span class="token keyword">from</span> lxml <span class="token keyword">import</span> etree

<span class="token comment">## ---- 创建标注</span>
<span class="token keyword">class</span> <span class="token class-name">CreateAnnotations</span><span class="token punctuation">:</span>
    <span class="token comment">## ----- 初始化</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> flodername<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>root <span class="token operator">=</span> etree<span class="token punctuation">.</span>Element<span class="token punctuation">(</span><span class="token string">&quot;annotation&quot;</span><span class="token punctuation">)</span>

        child1 <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;folder&quot;</span><span class="token punctuation">)</span>
        child1<span class="token punctuation">.</span>text <span class="token operator">=</span> flodername

        child2 <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;filename&quot;</span><span class="token punctuation">)</span>
        child2<span class="token punctuation">.</span>text <span class="token operator">=</span> filename

        child3 <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;path&quot;</span><span class="token punctuation">)</span>
        child3<span class="token punctuation">.</span>text <span class="token operator">=</span> filename

        child4 <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;source&quot;</span><span class="token punctuation">)</span>

        child5 <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>child4<span class="token punctuation">,</span> <span class="token string">&quot;database&quot;</span><span class="token punctuation">)</span>
        child5<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">&quot;Unknown&quot;</span>

    <span class="token comment">## ----- 设置size</span>
    <span class="token keyword">def</span> <span class="token function">set_size</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> imgshape<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token punctuation">(</span>height<span class="token punctuation">,</span> witdh<span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token operator">=</span> imgshape
        size <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;size&quot;</span><span class="token punctuation">)</span>
        widthn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>size<span class="token punctuation">,</span> <span class="token string">&quot;width&quot;</span><span class="token punctuation">)</span>
        widthn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>witdh<span class="token punctuation">)</span>
        heightn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>size<span class="token punctuation">,</span> <span class="token string">&quot;height&quot;</span><span class="token punctuation">)</span>
        heightn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>height<span class="token punctuation">)</span>
        channeln <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>size<span class="token punctuation">,</span> <span class="token string">&quot;depth&quot;</span><span class="token punctuation">)</span>
        channeln<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span>

    <span class="token comment">## ----- 保存文件</span>
    <span class="token keyword">def</span> <span class="token function">savefile</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">:</span>
        tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>ElementTree<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">)</span>
        tree<span class="token punctuation">.</span>write<span class="token punctuation">(</span>filename<span class="token punctuation">,</span> pretty_print<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> xml_declaration<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">add_pic_attr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> label<span class="token punctuation">,</span> xmin<span class="token punctuation">,</span> ymin<span class="token punctuation">,</span> xmax<span class="token punctuation">,</span> ymax<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">object</span> <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>self<span class="token punctuation">.</span>root<span class="token punctuation">,</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">)</span>
        namen <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
        namen<span class="token punctuation">.</span>text <span class="token operator">=</span> label
        bndbox <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">,</span> <span class="token string">&quot;bndbox&quot;</span><span class="token punctuation">)</span>
        xminn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>bndbox<span class="token punctuation">,</span> <span class="token string">&quot;xmin&quot;</span><span class="token punctuation">)</span>
        xminn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>xmin<span class="token punctuation">)</span>
        yminn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>bndbox<span class="token punctuation">,</span> <span class="token string">&quot;ymin&quot;</span><span class="token punctuation">)</span>
        yminn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>ymin<span class="token punctuation">)</span>
        xmaxn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>bndbox<span class="token punctuation">,</span> <span class="token string">&quot;xmax&quot;</span><span class="token punctuation">)</span>
        xmaxn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>xmax<span class="token punctuation">)</span>
        ymaxn <span class="token operator">=</span> etree<span class="token punctuation">.</span>SubElement<span class="token punctuation">(</span>bndbox<span class="token punctuation">,</span> <span class="token string">&quot;ymax&quot;</span><span class="token punctuation">)</span>
        ymaxn<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>ymax<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 从imgaug中提取边界框信息并保存</span>

foldername <span class="token operator">=</span> <span class="token string">&quot;demo&quot;</span>
filename <span class="token operator">=</span> <span class="token string">&quot;demo_aug.jpg&quot;</span>

<span class="token comment">## 创建保存类</span>
anno <span class="token operator">=</span> CreateAnnotations<span class="token punctuation">(</span>foldername<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
<span class="token comment">## </span>
anno<span class="token punctuation">.</span>set_size<span class="token punctuation">(</span>image_aug<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>
<span class="token comment">## 循环提取</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span>bb <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>bbs_aug_clip<span class="token punctuation">)</span><span class="token punctuation">:</span>
    xmin <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>bb<span class="token punctuation">.</span>x1<span class="token punctuation">)</span>
    ymin <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>bb<span class="token punctuation">.</span>y1<span class="token punctuation">)</span>
    xmax <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>bb<span class="token punctuation">.</span>x2<span class="token punctuation">)</span>
    ymax <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>bb<span class="token punctuation">.</span>y2<span class="token punctuation">)</span>
    label <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>bb<span class="token punctuation">.</span>label<span class="token punctuation">)</span>
    anno<span class="token punctuation">.</span>add_pic_attr<span class="token punctuation">(</span>label<span class="token punctuation">,</span> xmin<span class="token punctuation">,</span> ymin<span class="token punctuation">,</span> xmax<span class="token punctuation">,</span> ymax<span class="token punctuation">)</span>
<span class="token comment">## 保存标注文件</span>
anno<span class="token punctuation">.</span>savefile<span class="token punctuation">(</span><span class="token string">&quot;{}.xml&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>filename<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 保存增强图像</span>
imageio<span class="token punctuation">.</span>imsave<span class="token punctuation">(</span>filename<span class="token punctuation">,</span> image_aug<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,3),f={href:"https://blog.csdn.net/LuohenYJ/article/details/109254943",target:"_blank",rel:"noopener noreferrer"},y={href:"https://cuiqingcai.com/5548.html",target:"_blank",rel:"noopener noreferrer"},q={href:"https://imgaug.readthedocs.io/en/latest/source/overview_of_augmenters.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://blog.csdn.net/u014090429/article/details/94613764",target:"_blank",rel:"noopener noreferrer"};function B(S,j){const a=o("ExternalLinkIcon");return i(),c("div",null,[u,n("p",null,[s("imgaug边界框增强笔记主要是讲述基于imgaug库对目标检测图像的边界框进行图像增强。本文需要掌握imgaug库的基本使用，imgaug库的基本使用见"),n("a",r,[s("[深度学习] imgaug库使用笔记"),t(a)]),s("。")]),d,n("p",null,[s("标注文件的数据信息需要从外部读取后放入imgaug的BoundingBox类中，本文标注文件的数据信息通过BeautifulSoup读取。BeautifulSoup学习文章见"),n("a",k,[s("使用 Beautiful Soup"),t(a)]),s("。具体代码如下。")]),m,n("p",null,[s("直接对整张图像进行增强，直接从"),n("a",g,[s("imgaug增强效果示例"),t(a)]),s("中找示例代码，然后添加到iaa.Sequential()中叠加就可以实现图像增强。")]),b,n("p",null,[s("在"),n("a",v,[s("[深度学习] imgaug库使用笔记"),t(a)]),s("中有提到不要图像旋转来增强边界框，很容易出现边界框超出图像范围，在imgaug中也提供了相应的解决办法， 通过clip_out_of_image函数即可解决。尽管这样，还是不建议使用图像旋转增强边界框。")]),h,n("p",null,[s("xml标注文件保存参考"),n("a",_,[s("python如何读取&生成voc xml格式标注信息"),t(a)]),s("。可自行修改相关代码。本文保存代码如下。")]),x,n("ul",null,[n("li",null,[n("a",f,[s("[深度学习] imgaug库使用笔记"),t(a)])]),n("li",null,[n("a",y,[s("使用 Beautiful Soup"),t(a)])]),n("li",null,[n("a",q,[s("imgaug增强效果示例"),t(a)])]),n("li",null,[n("a",w,[s("python如何读取&生成voc xml格式标注信息"),t(a)])])])])}const N=p(l,[["render",B],["__file","2021-02-02-_深度学习_ imgaug边界框增强笔记.html.vue"]]);export{N as default};
