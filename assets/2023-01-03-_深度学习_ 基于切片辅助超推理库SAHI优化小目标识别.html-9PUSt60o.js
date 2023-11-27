import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as c,c as i,a as n,b as s,d as t,e as o}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"深度学习-基于切片辅助超推理库sahi优化小目标识别",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深度学习-基于切片辅助超推理库sahi优化小目标识别","aria-hidden":"true"},"#"),s(" [深度学习] 基于切片辅助超推理库SAHI优化小目标识别")],-1),r=n("p",null,"对象检测是迄今为止计算机视觉中最重要的应用领域。然而，小物体的检测和大图像的推理仍然是实际使用中的主要问题，这是因为小目标物体有效特征少，覆盖范围少。小目标物体的定义通常有两种方式。一种是绝对尺度定义，即以物体的像素尺寸来判断是否为小目标，如在COCO数据集中，尺寸小于32×32像素的目标被判定为小目标。另外一种是相对尺度定义，即以物体在图像中的占比面积比例来判断是否为小目标，例如国际光学工程学会SPIE定义，若目标尺寸小于原图的0.12%则可以判定成小目标。 SAHI: Slicing Aided Hyper Inference（切片辅助超推理）通过图像切片的方式来检测小目标。SAHI检测过程可以描述为：通过滑动窗口将图像切分成若干区域，各个区域分别进行预测，同时也对整张图片进行推理。然后将各个区域的预测结果和整张图片的预测结果合并，最后用NMS（非极大值抑制）进行过滤。用动图表示该识别过程如下：",-1),d=n("figure",null,[n("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/image/sliced_inference.gif",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),k={href:"https://github.com/obss/sahi",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/obss/sahi/tree/main/demo",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/obss/sahi/tree/main/docs",target:"_blank",rel:"noopener noreferrer"},b={href:"https://arxiv.org/abs/2202.06934",target:"_blank",rel:"noopener noreferrer"},_=n("blockquote",null,[n("p",null,"pip install sahi")],-1),g=n("p",null,"本文所有算法展示效果和代码见：",-1),h={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Deep%20learning/%E5%9F%BA%E4%BA%8E%E5%88%87%E7%89%87%E8%BE%85%E5%8A%A9%E8%B6%85%E6%8E%A8%E7%90%86%E5%BA%93SAHI%E4%BC%98%E5%8C%96%E5%B0%8F%E7%9B%AE%E6%A0%87%E8%AF%86%E5%88%AB",target:"_blank",rel:"noopener noreferrer"},y=o(`<h2 id="_1-sahi使用" tabindex="-1"><a class="header-anchor" href="#_1-sahi使用" aria-hidden="true">#</a> 1 SAHI使用</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> sahi
<span class="token comment">## 打印sahi版本</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>sahi<span class="token punctuation">.</span>__version__<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0.11.6
</code></pre><h3 id="_1-1-图像切片" tabindex="-1"><a class="header-anchor" href="#_1-1-图像切片" aria-hidden="true">#</a> 1.1 图像切片</h3><p>SAHI提供了封装好的函数接口，以切分输入图像和其标注数据。切分后的子图及其标注数据可以用于识别，或者保存为本地数据以供模型训练。</p><h4 id="_1-1-1-单张图像切片" tabindex="-1"><a class="header-anchor" href="#_1-1-1-单张图像切片" aria-hidden="true">#</a> 1.1.1 单张图像切片</h4><p>SAHI提供slice_image函数以切分单张图片及其标注文件（仅支持coco标注文件），slice_image函数接口介绍如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 返回SAHI的图像分片结果类SliceImageResult</span>
<span class="token keyword">def</span> <span class="token function">slice_image</span><span class="token punctuation">(</span>
    image<span class="token punctuation">:</span> Union<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Image<span class="token punctuation">.</span>Image<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">## 单张图像地址或单个pillow image对象，必填参数</span>
    coco_annotation_list<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span>CocoAnnotation<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## coco标注文件</span>
    output_file_name<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 输出文件名前缀</span>
    output_dir<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 输出文件地址</span>
    slice_height<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 子图切分高度</span>
    slice_width<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 子图切分宽度</span>
    overlap_height_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 子图高度间的重叠率</span>
    overlap_width_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 子图宽度间的重叠率</span>
    auto_slice_resolution<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token comment">## 如果没有设置slice_height和slice_width，则自动确定slice_height、slice_width、overlap_height_ratio、overlap_width_ratio</span>
    min_area_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token comment">## 子图中标注框小于原始标注框占比，则放弃该标注框</span>
    out_ext<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 图像后缀格式</span>
    verbose<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token comment">## 是否打印详细信息</span>
<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),f={href:"https://github.com/obss/sahi/blob/main/sahi/slicing.py",target:"_blank",rel:"noopener noreferrer"},x=o(`<ol><li><p>获得pillow image图像对象</p></li><li><p>调用get_slice_bboxes函数切分图像</p><ul><li>获得切分参数</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">if</span> slice_height <span class="token keyword">and</span> slice_width<span class="token punctuation">:</span>
    <span class="token comment">## 计算重叠像素</span>
    y_overlap <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>overlap_height_ratio <span class="token operator">*</span> slice_height<span class="token punctuation">)</span>
    x_overlap <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>overlap_width_ratio <span class="token operator">*</span> slice_width<span class="token punctuation">)</span>
<span class="token keyword">elif</span> auto_slice_resolution<span class="token punctuation">:</span>
    x_overlap<span class="token punctuation">,</span> y_overlap<span class="token punctuation">,</span> slice_width<span class="token punctuation">,</span> slice_height <span class="token operator">=</span> get_auto_slice_params<span class="token punctuation">(</span>height<span class="token operator">=</span>image_height<span class="token punctuation">,</span> width<span class="token operator">=</span>image_width<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>循环切分图像</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 行循环</span>
<span class="token keyword">while</span> y_max <span class="token operator">&lt;</span> image_height<span class="token punctuation">:</span>
    <span class="token comment">## 设置起始切分坐标</span>
    x_min <span class="token operator">=</span> x_max <span class="token operator">=</span> <span class="token number">0</span>
    y_max <span class="token operator">=</span> y_min <span class="token operator">+</span> slice_height
    <span class="token comment">## 列循环</span>
    <span class="token keyword">while</span> x_max <span class="token operator">&lt;</span> image_width<span class="token punctuation">:</span>
        x_max <span class="token operator">=</span> x_min <span class="token operator">+</span> slice_width
        <span class="token comment">## 如果图像不够切分，框往左或往上移动</span>
        <span class="token keyword">if</span> y_max <span class="token operator">&gt;</span> image_height <span class="token keyword">or</span> x_max <span class="token operator">&gt;</span> image_width<span class="token punctuation">:</span>
            xmax <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span>image_width<span class="token punctuation">,</span> x_max<span class="token punctuation">)</span>
            ymax <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span>image_height<span class="token punctuation">,</span> y_max<span class="token punctuation">)</span>
            xmin <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> xmax <span class="token operator">-</span> slice_width<span class="token punctuation">)</span>
            ymin <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> ymax <span class="token operator">-</span> slice_height<span class="token punctuation">)</span>
            slice_bboxes<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span>xmin<span class="token punctuation">,</span> ymin<span class="token punctuation">,</span> xmax<span class="token punctuation">,</span> ymax<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            slice_bboxes<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span>x_min<span class="token punctuation">,</span> y_min<span class="token punctuation">,</span> x_max<span class="token punctuation">,</span> y_max<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token comment">## 下一次切分从本次切分图像x_max-x_overlap开始</span>
        x_min <span class="token operator">=</span> x_max <span class="token operator">-</span> x_overlap
    y_min <span class="token operator">=</span> y_max <span class="token operator">-</span> y_overlap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>保存图片结果和标注结果，并包装返回SliceImageResult对象</p></li></ol><p>以下代码演示了对单张图片进行切片，并将切分后的子图保存到本地。</p><p><strong>展示原图</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 展示输入图片</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token comment">## 图像地址：https://github.com/obss/sahi/tree/main/demo/demo_data</span>
image_path <span class="token operator">=</span> <span class="token string">&quot;image/small-vehicles1.jpeg&quot;</span>
img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>image_path<span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&#39;RGB&#39;</span><span class="token punctuation">)</span>
img
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>切分图片</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>slicing <span class="token keyword">import</span> slice_image

<span class="token comment">## 输出文件名前缀</span>
output_file_name <span class="token operator">=</span> <span class="token string">&quot;slice&quot;</span>
<span class="token comment">## 输出文件夹</span>
output_dir <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span>

<span class="token comment">## 切分图像</span>
slice_image_result <span class="token operator">=</span> slice_image<span class="token punctuation">(</span>
    image<span class="token operator">=</span>image_path<span class="token punctuation">,</span>
    output_file_name<span class="token operator">=</span>output_file_name<span class="token punctuation">,</span>
    output_dir<span class="token operator">=</span>output_dir<span class="token punctuation">,</span>
    slice_height<span class="token operator">=</span><span class="token number">256</span><span class="token punctuation">,</span>
    slice_width<span class="token operator">=</span><span class="token number">256</span><span class="token punctuation">,</span>
    overlap_height_ratio<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span>
    overlap_width_ratio<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span>
    verbose<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;原图宽{}，高{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>slice_image_result<span class="token punctuation">.</span>original_image_width<span class="token punctuation">,</span> slice_image_result<span class="token punctuation">.</span>original_image_height<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 切分后的子图以形式：图像前缀_所在原图顶点坐标来保存文件</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;切分子图{}张&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>slice_image_result<span class="token punctuation">.</span>filenames<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>原图宽1068，高580
切分子图15张
</code></pre><p><strong>展示切分后的子图</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> math
<span class="token keyword">import</span> os

axarr_row <span class="token operator">=</span> <span class="token number">3</span>
axarr_col <span class="token operator">=</span> math<span class="token punctuation">.</span>ceil<span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>slice_image_result<span class="token punctuation">.</span>filenames<span class="token punctuation">)</span><span class="token operator">/</span>axarr_row<span class="token punctuation">)</span>
f<span class="token punctuation">,</span> axarr <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span>axarr_row<span class="token punctuation">,</span> axarr_col<span class="token punctuation">,</span> figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span> <span class="token builtin">file</span> <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>slice_image_result<span class="token punctuation">.</span>filenames<span class="token punctuation">)</span><span class="token punctuation">:</span>
    img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>slice_image_result<span class="token punctuation">.</span>image_dir<span class="token punctuation">,</span><span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    axarr<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">(</span>index<span class="token operator">/</span>axarr_col<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span>index<span class="token operator">%</span>axarr_col<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_1-1-2-coco数据集切片" tabindex="-1"><a class="header-anchor" href="#_1-1-2-coco数据集切片" aria-hidden="true">#</a> 1.1.2 COCO数据集切片</h4><p>SAHI提供slice_coco函数以切分coco数据集（仅支持coco数据集）。slice_coco函数接口介绍如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 返回切片后的coco标注字典文件，coco文件保存地址</span>
<span class="token keyword">def</span> <span class="token function">slice_coco</span><span class="token punctuation">(</span>
    coco_annotation_file_path<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token comment">## coco标注文件</span>
    image_dir<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token comment">## coco图像集地址</span>
    output_coco_annotation_file_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token comment">## 输出coco标注集文件名，不需要加文件类型后缀</span>
    output_dir<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 输出文件地址</span>
    ignore_negative_samples<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token comment">## 是否忽略没有标注框的子图</span>
    slice_height<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">512</span><span class="token punctuation">,</span> <span class="token comment">## 切分子图高度</span>
    slice_width<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">512</span><span class="token punctuation">,</span> <span class="token comment">## 切分子图宽度</span>
    overlap_height_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token comment">## 子图高度之间的重叠率</span>
    overlap_width_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token comment">## 子图宽度之间的重叠率</span>
    min_area_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">,</span> <span class="token comment">## 如果没有设置slice_height和slice_width，则自动确定slice_height、slice_width、overlap_height_ratio、overlap_width_ratio</span>
    out_ext<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span>  <span class="token comment">## 保存图像的扩展</span>
    verbose<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token comment">## 是否打印详细信息</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),w={href:"https://github.com/obss/sahi/blob/main/sahi/slicing.py",target:"_blank",rel:"noopener noreferrer"},q=o(`<ol><li>读取coco文件和图片信息</li><li>循环读取coco数据集的图片，每张图片调用get_slice_bboxes函数切分图像</li><li>创建coco dict结果并保存文件</li></ol><p>以下代码演示了对coco数据集进行切片，并将切分后的子图和标注文件保存到本地。coco数据集可以包含若干张图片，但是以下代码示例中只包含一张图片，方便演示。</p><p><strong>展示数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 展示图像</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image<span class="token punctuation">,</span> ImageDraw
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> load_json
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> os

<span class="token comment">## coco图像集地址</span>
image_path <span class="token operator">=</span> <span class="token string">&quot;image&quot;</span>
<span class="token comment">## coco标注文件</span>
coco_annotation_file_path<span class="token operator">=</span><span class="token string">&quot;image/terrain2_coco.json&quot;</span>
<span class="token comment">## 加载数据集</span>
coco_dict <span class="token operator">=</span> load_json<span class="token punctuation">(</span>coco_annotation_file_path<span class="token punctuation">)</span>

f<span class="token punctuation">,</span> axarr <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## 读取图像</span>
img_ind <span class="token operator">=</span> <span class="token number">0</span>
img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>image_path<span class="token punctuation">,</span>coco_dict<span class="token punctuation">[</span><span class="token string">&quot;images&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>img_ind<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;file_name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&#39;RGBA&#39;</span><span class="token punctuation">)</span>
<span class="token comment">## 绘制标注框</span>
<span class="token keyword">for</span> ann_ind <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    xywh <span class="token operator">=</span> coco_dict<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>ann_ind<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;bbox&quot;</span><span class="token punctuation">]</span>
    xyxy <span class="token operator">=</span> <span class="token punctuation">[</span>xywh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> xywh<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> xywh<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token string">&#39;RGBA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span>xyxy<span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>
axarr<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;matplotlib.image.AxesImage at 0x210a7583250&gt;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_13_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>切分数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>slicing <span class="token keyword">import</span> slice_coco

<span class="token comment">## 保存的coco数据集标注文件名</span>
output_coco_annotation_file_name<span class="token operator">=</span><span class="token string">&quot;sliced&quot;</span>
<span class="token comment">## 输出文件夹</span>
output_dir <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span>

<span class="token comment">## 切分数据集</span>
coco_dict<span class="token punctuation">,</span> coco_path <span class="token operator">=</span> slice_coco<span class="token punctuation">(</span>
    coco_annotation_file_path<span class="token operator">=</span>coco_annotation_file_path<span class="token punctuation">,</span>
    image_dir<span class="token operator">=</span>image_path<span class="token punctuation">,</span>
    output_coco_annotation_file_name<span class="token operator">=</span>output_coco_annotation_file_name<span class="token punctuation">,</span>
    ignore_negative_samples<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
    output_dir<span class="token operator">=</span>output_dir<span class="token punctuation">,</span>
    slice_height<span class="token operator">=</span><span class="token number">320</span><span class="token punctuation">,</span>
    slice_width<span class="token operator">=</span><span class="token number">320</span><span class="token punctuation">,</span>
    overlap_height_ratio<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span>
    overlap_width_ratio<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span>
    min_area_ratio<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span>
    verbose<span class="token operator">=</span><span class="token boolean">False</span>
<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;切分子图{}张&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&#39;images&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;获得标注框{}个&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&#39;annotations&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|█████████████████████████████████████████████████████████| 1/1 [00:00&lt;00:00, 334.21it/s]
100%|████████████████████████████████████████████████████████████████████████████████████| 1/1 [00:00&lt;00:00, 11.80it/s]

切分子图12张
获得标注框18个
</code></pre><p><strong>展示切分后的子图和标注框</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>axarr_row <span class="token operator">=</span> <span class="token number">3</span>
axarr_col <span class="token operator">=</span> math<span class="token punctuation">.</span>ceil<span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&#39;images&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">/</span> axarr_row<span class="token punctuation">)</span>
f<span class="token punctuation">,</span> axarr <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span>axarr_row<span class="token punctuation">,</span> axarr_col<span class="token punctuation">,</span> figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> index<span class="token punctuation">,</span> img <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&#39;images&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>output_dir<span class="token punctuation">,</span> img<span class="token punctuation">[</span><span class="token string">&quot;file_name&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> ann_ind <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>coco_dict<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 搜索与当前图像匹配的边界框</span>
        <span class="token keyword">if</span> coco_dict<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>ann_ind<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;image_id&quot;</span><span class="token punctuation">]</span> <span class="token operator">==</span> coco_dict<span class="token punctuation">[</span><span class="token string">&quot;images&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            xywh <span class="token operator">=</span> coco_dict<span class="token punctuation">[</span><span class="token string">&quot;annotations&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>ann_ind<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;bbox&quot;</span><span class="token punctuation">]</span>
            xyxy <span class="token operator">=</span> <span class="token punctuation">[</span>xywh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> xywh<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> xywh<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> xywh<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
            <span class="token comment">## 绘图</span>
            ImageDraw<span class="token punctuation">.</span>Draw<span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token string">&#39;RGBA&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>rectangle<span class="token punctuation">(</span>xyxy<span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>
    axarr<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">(</span>index <span class="token operator">/</span> axarr_col<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span>index <span class="token operator">%</span> axarr_col<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>img<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_17_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-图像预测" tabindex="-1"><a class="header-anchor" href="#_1-2-图像预测" aria-hidden="true">#</a> 1.2 图像预测</h3><h4 id="_1-2-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-1-接口介绍" aria-hidden="true">#</a> 1.2.1 接口介绍</h4><p>SHAI提供了图像切片预测的封装接口，具体的函数接口如下：</p><p><strong>AutoDetectionModel类</strong></p>`,16),j={href:"https://github.com/obss/sahi/tree/main/sahi/models",target:"_blank",rel:"noopener noreferrer"},A=o(`<p><strong>模型预测</strong></p><ul><li><p>基于get_prediction函数调用模型预测单张图片，也就是直接调用AutoDetectionModel类提供的模型，直接推理单张图片。</p></li><li><p>基于get_sliced_prediction函数以切分图片的方式进行预测。在get_sliced_prediction函数内部会先切分图片，然后对每个子图单独进行模型推理；如果设置了对整张原图进行推理，那么也会整合原图推理的结果以增加模型精度。最后对所有的预测结果进行nms整合，相近的两个预测框也会进行合并。get_sliced_prediction函数接口如下：</p></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">get_sliced_prediction</span><span class="token punctuation">(</span>
    image<span class="token punctuation">,</span>
    detection_model<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>
    slice_height<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
    slice_width<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
    overlap_height_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    overlap_width_ratio<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    perform_standard_pred<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token comment">## 是否单独对原图进行识别</span>
    postprocess_type<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;GREEDYNMM&quot;</span><span class="token punctuation">,</span> <span class="token comment">## 合并结果的方式，可选&#39;NMM&#39;, &#39;GRREDYNMM&#39;， &#39;NMS&#39;</span>
    postprocess_match_metric<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;IOS&quot;</span><span class="token punctuation">,</span> <span class="token comment">## NMS匹配方式IOU或者IOS</span>
    postprocess_match_threshold<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token comment">## 匹配置信度</span>
    postprocess_class_agnostic<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token comment">## 在合并结果时，是否将不同类别的检测框放在一起处理</span>
    verbose<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> 
    merge_buffer_length<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment">## 低配设备使用，以加快处理</span>
    auto_slice_resolution<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>基于predict函数进行批处理，predict函数进一步封装了识别代码，如果想使用该函数，阅读predict源代码参数接口即可。</li></ul><h4 id="_1-2-2-应用实例" tabindex="-1"><a class="header-anchor" href="#_1-2-2-应用实例" aria-hidden="true">#</a> 1.2.2 应用实例</h4><p><strong>直接预测图片</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi <span class="token keyword">import</span> AutoDetectionModel
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>predict <span class="token keyword">import</span> get_prediction

<span class="token comment">## 初始化检测模型，缺少yolov5代码，pip install yolov5即可</span>
detection_model <span class="token operator">=</span> AutoDetectionModel<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>
    model_type<span class="token operator">=</span><span class="token string">&#39;yolov5&#39;</span><span class="token punctuation">,</span> <span class="token comment">## 模型类型</span>
    model_path<span class="token operator">=</span><span class="token string">&#39;./yolov5n.pt&#39;</span><span class="token punctuation">,</span> <span class="token comment">## 模型文件路径</span>
    confidence_threshold<span class="token operator">=</span><span class="token number">0.3</span><span class="token punctuation">,</span> <span class="token comment">## 检测阈值</span>
    device<span class="token operator">=</span><span class="token string">&quot;cpu&quot;</span><span class="token punctuation">,</span>  <span class="token comment">## or &#39;cuda:0&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
image <span class="token operator">=</span> <span class="token string">&#39;image/small-vehicles1.jpeg&#39;</span>

<span class="token comment">## 获得模型直接预测结果</span>
result <span class="token operator">=</span> get_prediction<span class="token punctuation">(</span>image<span class="token punctuation">,</span> detection_model<span class="token punctuation">)</span>

<span class="token comment">## result是SAHI的PredictionResult对象，可获得推理时间，检测图像，检测图像尺寸，检测结果</span>
<span class="token comment">## 查看标注框，可以用于保存为其他格式</span>
<span class="token keyword">for</span> pred <span class="token keyword">in</span> result<span class="token punctuation">.</span>object_prediction_list<span class="token punctuation">:</span>
    bbox <span class="token operator">=</span> pred<span class="token punctuation">.</span>bbox  <span class="token comment">## 标注框BoundingBox对象，可以获得边界框的坐标、面积</span>
    category <span class="token operator">=</span> pred<span class="token punctuation">.</span>category  <span class="token comment">## 类别Category对象，可获得类别id和类别名</span>
    score <span class="token operator">=</span> pred<span class="token punctuation">.</span>score<span class="token punctuation">.</span>value  <span class="token comment">## 预测置信度</span>

<span class="token comment">## 保存文件结果</span>
export_dir <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span>
file_name <span class="token operator">=</span> <span class="token string">&quot;res&quot;</span>
result<span class="token punctuation">.</span>export_visuals<span class="token punctuation">(</span>export_dir<span class="token operator">=</span>export_dir<span class="token punctuation">,</span> file_name<span class="token operator">=</span>file_name<span class="token punctuation">)</span>

<span class="token comment">## 展示结果</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> os
image_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>export_dir<span class="token punctuation">,</span>file_name<span class="token operator">+</span><span class="token string">&#39;.png&#39;</span><span class="token punctuation">)</span>
img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>image_path<span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&#39;RGB&#39;</span><span class="token punctuation">)</span>
img
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>切片预测图片</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi <span class="token keyword">import</span> AutoDetectionModel
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>predict <span class="token keyword">import</span> get_sliced_prediction

<span class="token comment">## 初始化检测模型</span>
detection_model <span class="token operator">=</span> AutoDetectionModel<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>
    model_type<span class="token operator">=</span><span class="token string">&#39;yolov5&#39;</span><span class="token punctuation">,</span>
    model_path<span class="token operator">=</span><span class="token string">&#39;yolov5n.pt&#39;</span><span class="token punctuation">,</span>
    confidence_threshold<span class="token operator">=</span><span class="token number">0.3</span><span class="token punctuation">,</span>
    device<span class="token operator">=</span><span class="token string">&quot;cpu&quot;</span><span class="token punctuation">,</span>  <span class="token comment">## or &#39;cuda:0&#39;</span>
<span class="token punctuation">)</span>
image <span class="token operator">=</span> <span class="token string">&#39;image/small-vehicles1.jpeg&#39;</span>


result <span class="token operator">=</span> get_sliced_prediction<span class="token punctuation">(</span>
    image<span class="token punctuation">,</span>
    detection_model<span class="token punctuation">,</span>
    slice_height <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">,</span>
    slice_width <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">,</span>
    overlap_height_ratio <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    overlap_width_ratio <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    perform_standard_pred <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment">## result是SAHI的PredictionResult对象，可获得推理时间，检测图像，检测图像尺寸，检测结果</span>
<span class="token comment">## 查看标注框，可以用于保存为其他格式</span>
<span class="token keyword">for</span> pred <span class="token keyword">in</span> result<span class="token punctuation">.</span>object_prediction_list<span class="token punctuation">:</span>
    bbox <span class="token operator">=</span> pred<span class="token punctuation">.</span>bbox  <span class="token comment">## 标注框BoundingBox对象，可以获得边界框的坐标、面积</span>
    category <span class="token operator">=</span> pred<span class="token punctuation">.</span>category  <span class="token comment">## 类别Category对象，可获得类别id和类别名</span>
    score <span class="token operator">=</span> pred<span class="token punctuation">.</span>score<span class="token punctuation">.</span>value  <span class="token comment">## 预测置信度</span>

<span class="token comment">## 保存文件结果</span>
export_dir <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span>
file_name <span class="token operator">=</span> <span class="token string">&quot;res&quot;</span>
result<span class="token punctuation">.</span>export_visuals<span class="token punctuation">(</span>export_dir<span class="token operator">=</span>export_dir<span class="token punctuation">,</span> file_name<span class="token operator">=</span>file_name<span class="token punctuation">)</span>
<span class="token comment">## 结果导出为coco标注形式</span>
coco_anno <span class="token operator">=</span> result<span class="token punctuation">.</span>to_coco_annotations<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 结果导出为coco预测形式</span>
coco_pred <span class="token operator">=</span> result<span class="token punctuation">.</span>to_coco_predictions<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 展示结果</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> os
image_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>export_dir<span class="token punctuation">,</span>file_name<span class="token operator">+</span><span class="token string">&#39;.png&#39;</span><span class="token punctuation">)</span>
img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>image_path<span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&#39;RGB&#39;</span><span class="token punctuation">)</span>
img

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Performing prediction on 15 number of slices.
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_22_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>相对单张图片直接识别，通过切片的方式能够识别到更多的小目标。由于使用的模型是yolov5n，可以看到一些识别结果不正确，比如同一辆车在不同子图被分别识别为卡车或汽车，一种好的解决办法是将postprocess_class_agnostic参数设置为True，将不同类别的检测框放在一起进行合并，同时降低 postprocess_match_threshold以滤除结果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>image <span class="token operator">=</span> <span class="token string">&#39;image/small-vehicles1.jpeg&#39;</span>


result <span class="token operator">=</span> get_sliced_prediction<span class="token punctuation">(</span>
    image<span class="token punctuation">,</span>
    detection_model<span class="token punctuation">,</span>
    slice_height <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">,</span>
    slice_width <span class="token operator">=</span> <span class="token number">256</span><span class="token punctuation">,</span>
    overlap_height_ratio <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    overlap_width_ratio <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    perform_standard_pred <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
    postprocess_match_threshold <span class="token operator">=</span> <span class="token number">0.2</span><span class="token punctuation">,</span>
    postprocess_class_agnostic <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>


<span class="token comment">## 保存文件结果</span>
export_dir <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span>
file_name <span class="token operator">=</span> <span class="token string">&quot;res&quot;</span>
result<span class="token punctuation">.</span>export_visuals<span class="token punctuation">(</span>export_dir<span class="token operator">=</span>export_dir<span class="token punctuation">,</span> file_name<span class="token operator">=</span>file_name<span class="token punctuation">)</span>

<span class="token comment">## 展示结果</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> os
image_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>export_dir<span class="token punctuation">,</span>file_name<span class="token operator">+</span><span class="token string">&#39;.png&#39;</span><span class="token punctuation">)</span>
img <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>image_path<span class="token punctuation">)</span><span class="token punctuation">.</span>convert<span class="token punctuation">(</span><span class="token string">&#39;RGB&#39;</span><span class="token punctuation">)</span>
img
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Performing prediction on 15 number of slices.
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/[深度学习] 基于切片辅助超推理库SAHI优化小目标识别/output_24_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-sahi工具函数" tabindex="-1"><a class="header-anchor" href="#_1-3-sahi工具函数" aria-hidden="true">#</a> 1.3 SAHI工具函数</h3>`,17),I={href:"https://github.com/obss/sahi/blob/main/docs/coco.md",target:"_blank",rel:"noopener noreferrer"},C=o(`<h4 id="_1-3-1-coco数据集制作与精度分析" tabindex="-1"><a class="header-anchor" href="#_1-3-1-coco数据集制作与精度分析" aria-hidden="true">#</a> 1.3.1 coco数据集制作与精度分析</h4><p>以下代码创建了coco标注数据，并保存到本地</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco<span class="token punctuation">,</span> CocoCategory<span class="token punctuation">,</span> CocoImage<span class="token punctuation">,</span> CocoAnnotation<span class="token punctuation">,</span>CocoPrediction


<span class="token comment">## 创建coco对象</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 添加类</span>
coco<span class="token punctuation">.</span>add_category<span class="token punctuation">(</span>CocoCategory<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&#39;human&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
coco<span class="token punctuation">.</span>add_category<span class="token punctuation">(</span>CocoCategory<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&#39;vehicle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 循环遍历图像</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 创建单个图像</span>
    coco_image <span class="token operator">=</span> CocoImage<span class="token punctuation">(</span>
        file_name<span class="token operator">=</span><span class="token string">&quot;image{}.jpg&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> height<span class="token operator">=</span><span class="token number">1080</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">1920</span><span class="token punctuation">)</span>

    <span class="token comment">## 添加图像对应的标注</span>
    coco_image<span class="token punctuation">.</span>add_annotation<span class="token punctuation">(</span>
        CocoAnnotation<span class="token punctuation">(</span>
            <span class="token comment">## [x_min, y_min, width, height]</span>
            bbox<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            category_id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
            category_name<span class="token operator">=</span><span class="token string">&#39;human&#39;</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    coco_image<span class="token punctuation">.</span>add_annotation<span class="token punctuation">(</span>
        CocoAnnotation<span class="token punctuation">(</span>
            bbox<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            category_id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
            category_name<span class="token operator">=</span><span class="token string">&#39;vehicle&#39;</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    
    <span class="token comment">## 添加图像预测数据</span>
    coco_image<span class="token punctuation">.</span>add_prediction<span class="token punctuation">(</span>
      CocoPrediction<span class="token punctuation">(</span>
        score<span class="token operator">=</span><span class="token number">0.864434</span><span class="token punctuation">,</span>
        bbox<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">,</span> <span class="token number">150</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        category_id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
        category_name<span class="token operator">=</span><span class="token string">&#39;human&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    coco_image<span class="token punctuation">.</span>add_prediction<span class="token punctuation">(</span>
      CocoPrediction<span class="token punctuation">(</span>
        score<span class="token operator">=</span><span class="token number">0.653424</span><span class="token punctuation">,</span>
        bbox<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">250</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        category_id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
        category_name<span class="token operator">=</span><span class="token string">&#39;vehicle&#39;</span>
      <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
    <span class="token comment">## 将图像添加到coco对象</span>
    coco<span class="token punctuation">.</span>add_image<span class="token punctuation">(</span>coco_image<span class="token punctuation">)</span>

<span class="token comment">## 提取json标注数据，不会保存图像预测结果</span>
coco_json <span class="token operator">=</span> coco<span class="token punctuation">.</span>json

<span class="token comment">## 将json标注数据保存为json本地文件</span>
save_json<span class="token punctuation">(</span>coco_json<span class="token punctuation">,</span> <span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 提取预测结果json文件，并保存到本地</span>
predictions_array <span class="token operator">=</span> coco<span class="token punctuation">.</span>prediction_array
save_json<span class="token punctuation">(</span>predictions_array<span class="token punctuation">,</span> <span class="token string">&quot;coco_predictions.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),S={href:"https://github.com/cocodataset/cocoapi",target:"_blank",rel:"noopener noreferrer"},D=o(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 需要单独安装pycocotools</span>
<span class="token keyword">from</span> pycocotools<span class="token punctuation">.</span>cocoeval <span class="token keyword">import</span> COCOeval
<span class="token keyword">from</span> pycocotools<span class="token punctuation">.</span>coco <span class="token keyword">import</span> COCO

coco_ground_truth <span class="token operator">=</span> COCO<span class="token punctuation">(</span>annotation_file<span class="token operator">=</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>
coco_predictions <span class="token operator">=</span> coco_ground_truth<span class="token punctuation">.</span>loadRes<span class="token punctuation">(</span><span class="token string">&quot;coco_predictions.json&quot;</span><span class="token punctuation">)</span>

coco_evaluator <span class="token operator">=</span> COCOeval<span class="token punctuation">(</span>coco_ground_truth<span class="token punctuation">,</span> coco_predictions<span class="token punctuation">,</span> <span class="token string">&quot;bbox&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 进行匹配计算</span>
coco_evaluator<span class="token punctuation">.</span>evaluate<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 进行结果的累加</span>
coco_evaluator<span class="token punctuation">.</span>accumulate<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 输出结果</span>
coco_evaluator<span class="token punctuation">.</span>summarize<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>loading annotations into memory...
Done (t=0.00s)
creating index...
index created!
Loading and preparing results...
DONE (t=0.00s)
creating index...
index created!
Running per image evaluation...
Evaluate annotation type *bbox*
DONE (t=0.00s).
Accumulating evaluation results...
DONE (t=0.01s).
 Average Precision  (AP) @[ IoU=0.50:0.95 | area=   all | maxDets=100 ] = 0.200
 Average Precision  (AP) @[ IoU=0.50      | area=   all | maxDets=100 ] = 1.000
 Average Precision  (AP) @[ IoU=0.75      | area=   all | maxDets=100 ] = 0.000
 Average Precision  (AP) @[ IoU=0.50:0.95 | area= small | maxDets=100 ] = -1.000
 Average Precision  (AP) @[ IoU=0.50:0.95 | area=medium | maxDets=100 ] = -1.000
 Average Precision  (AP) @[ IoU=0.50:0.95 | area= large | maxDets=100 ] = 0.200
 Average Recall     (AR) @[ IoU=0.50:0.95 | area=   all | maxDets=  1 ] = 0.200
 Average Recall     (AR) @[ IoU=0.50:0.95 | area=   all | maxDets= 10 ] = 0.200
 Average Recall     (AR) @[ IoU=0.50:0.95 | area=   all | maxDets=100 ] = 0.200
 Average Recall     (AR) @[ IoU=0.50:0.95 | area= small | maxDets=100 ] = -1.000
 Average Recall     (AR) @[ IoU=0.50:0.95 | area=medium | maxDets=100 ] = -1.000
 Average Recall     (AR) @[ IoU=0.50:0.95 | area= large | maxDets=100 ] = 0.200
</code></pre><p><strong>统计数据集标注信息</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco

coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 获得数据集状态，指标说明看字段名就能懂</span>
stats <span class="token operator">=</span> coco<span class="token punctuation">.</span>stats
stats
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1504.59it/s]





{&#39;num_images&#39;: 3,
 &#39;num_annotations&#39;: 6,
 &#39;num_categories&#39;: 2,
 &#39;num_negative_images&#39;: 0,
 &#39;num_images_per_category&#39;: {&#39;human&#39;: 3, &#39;vehicle&#39;: 3},
 &#39;num_annotations_per_category&#39;: {&#39;human&#39;: 3, &#39;vehicle&#39;: 3},
 &#39;min_num_annotations_in_image&#39;: 2,
 &#39;max_num_annotations_in_image&#39;: 2,
 &#39;avg_num_annotations_in_image&#39;: 2.0,
 &#39;min_annotation_area&#39;: 40000,
 &#39;max_annotation_area&#39;: 90000,
 &#39;avg_annotation_area&#39;: 65000.0,
 &#39;min_annotation_area_per_category&#39;: {&#39;human&#39;: 40000, &#39;vehicle&#39;: 90000},
 &#39;max_annotation_area_per_category&#39;: {&#39;human&#39;: 40000, &#39;vehicle&#39;: 90000}}
</code></pre><p><strong>预测结果过滤</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> remove_invalid_coco_results

<span class="token comment">## 去除预测结果中的无效边界框，如边界框坐标为负的结果</span>
coco_results <span class="token operator">=</span> remove_invalid_coco_results<span class="token punctuation">(</span><span class="token string">&quot;coco_predictions.json&quot;</span><span class="token punctuation">)</span>

save_json<span class="token punctuation">(</span>coco_results<span class="token punctuation">,</span> <span class="token string">&quot;fixed_coco_result.json&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 根据数据集实际标注信息，进一步去除边界框坐标超过图像长宽的结果</span>
coco_results <span class="token operator">=</span> remove_invalid_coco_results<span class="token punctuation">(</span><span class="token string">&quot;coco_predictions.json&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-2-coco数据集处理" tabindex="-1"><a class="header-anchor" href="#_1-3-2-coco数据集处理" aria-hidden="true">#</a> 1.3.2 coco数据集处理</h4><p><strong>切分数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco

<span class="token comment">## 指定coco文件</span>
coco_path <span class="token operator">=</span> <span class="token string">&quot;coco_dataset.json&quot;</span>

<span class="token comment">## 初始coco对象</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span>coco_path<span class="token punctuation">)</span>

<span class="token comment">## 拆分数据集为训练集和验证集，训练集图像占比0.85</span>
result <span class="token operator">=</span> coco<span class="token punctuation">.</span>split_coco_as_train_val<span class="token punctuation">(</span>
  train_split_rate<span class="token operator">=</span><span class="token number">0.85</span>
<span class="token punctuation">)</span>

<span class="token comment">## 保存训练集和验证集</span>
save_json<span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token string">&quot;train_coco&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;train_split.json&quot;</span><span class="token punctuation">)</span>
save_json<span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token string">&quot;val_coco&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;val_split.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 3005.95it/s]
</code></pre><p><strong>修改标注类别</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json


coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;标注类别：{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>coco<span class="token punctuation">.</span>category_mapping<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 修改数据集类别</span>
<span class="token comment">## 将标注中human类的索引改为3，将原先vehicle类的标注删除</span>
<span class="token comment">## 新加big_vehicle类和car类</span>
desired_name2id <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;big_vehicle&quot;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token string">&quot;car&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token string">&quot;human&quot;</span><span class="token punctuation">:</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token comment">## 更新标注类别</span>
coco<span class="token punctuation">.</span>update_categories<span class="token punctuation">(</span>desired_name2id<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;修改后标注类别：{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>coco<span class="token punctuation">.</span>category_mapping<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 保存结果</span>
save_json<span class="token punctuation">(</span>coco<span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;updated_coco.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1002.78it/s]

标注类别：{0: &#39;human&#39;, 1: &#39;vehicle&#39;}
修改后标注类别：{1: &#39;big_vehicle&#39;, 2: &#39;car&#39;, 3: &#39;human&#39;}
</code></pre><p><strong>按照标注框面积过滤数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json

<span class="token comment">## 打开标注数据</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 过滤包含标注框面积小于min的图像</span>
area_filtered_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_area_filtered_coco<span class="token punctuation">(</span><span class="token builtin">min</span><span class="token operator">=</span><span class="token number">50000</span><span class="token punctuation">)</span>
<span class="token comment">## 过滤标注框面积不在[min,max]的图像</span>
area_filtered_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_area_filtered_coco<span class="token punctuation">(</span><span class="token builtin">min</span><span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token builtin">max</span><span class="token operator">=</span><span class="token number">80000</span><span class="token punctuation">)</span>
<span class="token comment">## 筛选同时符合多个类别面积要求的图像</span>
intervals_per_category <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;human&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;min&quot;</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token string">&quot;max&quot;</span><span class="token punctuation">:</span> <span class="token number">30000</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&quot;vehicle&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&quot;min&quot;</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">&quot;max&quot;</span><span class="token punctuation">:</span> <span class="token number">90000</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
area_filtered_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_area_filtered_coco<span class="token punctuation">(</span>intervals_per_category<span class="token operator">=</span>intervals_per_category<span class="token punctuation">)</span>

<span class="token comment">## 导出数据</span>
save_json<span class="token punctuation">(</span>area_filtered_coco<span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;area_filtered_coco.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1503.69it/s]
</code></pre><p><strong>过滤无标注的图片</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json
<span class="token comment">## 去除无标注框的图片</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">,</span> ignore_negative_samples<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment">## 导出数据</span>
<span class="token comment">## save_json(coco.json, &quot;coco_ignore_negative.json&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 3007.39it/s]
</code></pre><p><strong>裁剪标注框</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json


coco_path <span class="token operator">=</span> <span class="token string">&quot;coco_dataset.json&quot;</span>

<span class="token comment">## 将溢出边界框剪裁为图像宽度和高度</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span>coco_path<span class="token punctuation">,</span> clip_bboxes_to_img_dims<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token comment">## 对已有coco对象，将溢出边界框剪裁为图像宽度和高度</span>
coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_coco_with_clipped_bboxes<span class="token punctuation">(</span><span class="token punctuation">)</span>

save_json<span class="token punctuation">(</span>coco<span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;coco.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1007.04it/s]
</code></pre><p><strong>合并coco数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## from sahi.utils.coco import Coco</span>
<span class="token comment">## from sahi.utils.file import save_json</span>

<span class="token comment">## coco_1 = Coco.from_coco_dict_or_path(&quot;coco1.json&quot;, image_dir=&quot;images_1/&quot;)</span>
<span class="token comment">## coco_2 = Coco.from_coco_dict_or_path(&quot;coco2.json&quot;, image_dir=&quot;images_2/&quot;)</span>

<span class="token comment">## ## 合并数据集</span>
<span class="token comment">## coco_1.merge(coco_2)</span>

<span class="token comment">## ## 保存</span>
<span class="token comment">## save_json(coco_1.json, &quot;merged_coco.json&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>下采样数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json
coco_path <span class="token operator">=</span> <span class="token string">&quot;coco_dataset.json&quot;</span>

coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span>coco_path<span class="token punctuation">)</span>

<span class="token comment">## 用1/10的图像创建Coco对象</span>
<span class="token comment">## subsample_ratio表示每10张图像取1张图像</span>
subsampled_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_subsampled_coco<span class="token punctuation">(</span>subsample_ratio<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>

<span class="token comment">## 仅对包含标注框为category_id的图像进行下采样,category_i=-1时表示负样本</span>
subsampled_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_subsampled_coco<span class="token punctuation">(</span>subsample_ratio<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> category_id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token comment">## 保存数据集</span>
save_json<span class="token punctuation">(</span>subsampled_coco<span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;subsampled_coco.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1512.19it/s]
</code></pre><p><strong>上采样数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco
<span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token keyword">import</span> save_json
coco_path <span class="token operator">=</span> <span class="token string">&quot;coco_dataset.json&quot;</span>

coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span>coco_path<span class="token punctuation">)</span>

<span class="token comment">## 每个样本重复10次</span>
upsampled_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_upsampled_coco<span class="token punctuation">(</span>upsample_ratio<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>


<span class="token comment">## 仅对包含标注框为category_id的图像进行采样,category_i=-1时表示负样本</span>
subsampled_coco <span class="token operator">=</span> coco<span class="token punctuation">.</span>get_upsampled_coco<span class="token punctuation">(</span>upsample_ratio<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> category_id<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>


<span class="token comment">## 导出数据集</span>
save_json<span class="token punctuation">(</span>upsampled_coco<span class="token punctuation">.</span>json<span class="token punctuation">,</span> <span class="token string">&quot;upsampled_coco.json&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1503.51it/s]
</code></pre><h4 id="_1-3-3-coco数据集转换" tabindex="-1"><a class="header-anchor" href="#_1-3-3-coco数据集转换" aria-hidden="true">#</a> 1.3.3 coco数据集转换</h4><p><strong>导出为yolov5格式并分割数据集</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco

<span class="token comment">## 注意image_dir路径</span>
coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;coco_dataset.json&quot;</span><span class="token punctuation">,</span> image_dir<span class="token operator">=</span><span class="token string">&quot;images/&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 导出为yolov5数据集格式，train_split_rate设置训练集数据比例</span>
<span class="token comment">## coco.export_as_yolov5(</span>
<span class="token comment">##   output_dir=&quot;output/&quot;,</span>
<span class="token comment">##   train_split_rate=0.85</span>
<span class="token comment">## )</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 3/3 [00:00&lt;00:00, 1002.22it/s]
</code></pre><p><strong>将训练集和验证集导出为yolov5格式</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sahi<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>coco <span class="token keyword">import</span> Coco<span class="token punctuation">,</span> export_coco_as_yolov5

<span class="token comment">## 注意image_dir路径</span>
train_coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;train_split.json&quot;</span><span class="token punctuation">,</span> image_dir<span class="token operator">=</span><span class="token string">&quot;images/&quot;</span><span class="token punctuation">)</span>
val_coco <span class="token operator">=</span> Coco<span class="token punctuation">.</span>from_coco_dict_or_path<span class="token punctuation">(</span><span class="token string">&quot;val_split.json&quot;</span><span class="token punctuation">,</span> image_dir<span class="token operator">=</span><span class="token string">&quot;images/&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 导出数据集</span>
<span class="token comment">## data_yml_path = export_coco_as_yolov5(</span>
<span class="token comment">##   output_dir=&quot;output&quot;,</span>
<span class="token comment">##   train_coco=train_coco,</span>
<span class="token comment">##   val_coco=val_coco</span>
<span class="token comment">## )</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 2/2 [00:00&lt;00:00, 1002.34it/s]


indexing coco dataset annotations...


Loading coco annotations: 100%|████████████████████████████████████████████████████████| 1/1 [00:00&lt;00:00, 1003.42it/s]
</code></pre><h3 id="_1-4-总结" tabindex="-1"><a class="header-anchor" href="#_1-4-总结" aria-hidden="true">#</a> 1.4 总结</h3><p>目标检测过程中，通过对高分辨率小目标图像进行滑动窗口切片，能够有效提高大分辨率小目标图像的识别精度。但是滑动切片识别有需要注意的地方：</p><ul><li>需要图像数据集是否符合通用的高分辨小目标图像标准，如果对普通数据集进行切片识别容易拆分已有目标物体，这样做浪费推理时间也会导致最终检测结果精度不高。</li><li>滑动切片对识别模型的精度有一定的要求，一般来说模型越大精度越高，但是切片识别所花费的推理时间也越长。所以需要平衡模型精度和模型推理时间，而且也要确定滑动切片的尺度。</li><li>滑动切片识别在识别目标类别较少的任务中，识别精度更高，因为后处理能过滤很多重复识别检测框。</li></ul>`,41),H={href:"https://github.com/PaddlePaddle/PaddleDetection/tree/develop/configs/smalldet",target:"_blank",rel:"noopener noreferrer"},N=n("h2",{id:"_2-参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-参考","aria-hidden":"true"},"#"),s(" 2 参考")],-1),P={href:"https://github.com/obss/sahi",target:"_blank",rel:"noopener noreferrer"},E={href:"https://github.com/obss/sahi/tree/main/demo",target:"_blank",rel:"noopener noreferrer"},O={href:"https://github.com/obss/sahi/tree/main/docs",target:"_blank",rel:"noopener noreferrer"},R={href:"https://arxiv.org/abs/2202.06934",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/obss/sahi/blob/main/sahi/slicing.py",target:"_blank",rel:"noopener noreferrer"},L={href:"https://github.com/obss/sahi/tree/main/sahi/models",target:"_blank",rel:"noopener noreferrer"},M={href:"https://github.com/obss/sahi/blob/main/docs/coco.md",target:"_blank",rel:"noopener noreferrer"},U={href:"https://github.com/cocodataset/cocoapi",target:"_blank",rel:"noopener noreferrer"},F={href:"https://github.com/PaddlePaddle/PaddleDetection/tree/develop/configs/smalldet",target:"_blank",rel:"noopener noreferrer"};function z(T,G){const a=p("ExternalLinkIcon");return c(),i("div",null,[u,r,d,n("p",null,[s("SAHI的官方仓库地址为："),n("a",k,[s("sahi"),t(a)]),s("。关于SAHI的使用可以阅读官方demo和官方文档："),n("a",m,[s("sahi-demo"),t(a)]),s("和"),n("a",v,[s("sahi-docs"),t(a)]),s("。如果想进一步了解SAHI具体工作性能和原理，可以阅读官方发表的论文："),n("a",b,[s("Slicing Aided Hyper Inference and Fine-Tuning for Small Object Detection"),t(a)]),s("。 SAHI安装指令如下：")]),_,g,n("p",null,[s("github: "),n("a",h,[s("Python-Study-Notes"),t(a)])]),y,n("p",null,[s("slice_image函数源代码位于"),n("a",f,[s("sahi/slicing.py"),t(a)]),s("中，这段代码可以单步调试看看怎么运行的，主要逻辑如下：")]),x,n("p",null,[s("slice_coco函数源代码位于"),n("a",w,[s("sahi/slicing.py"),t(a)]),s("中，这段代码可以单步调试看看怎么做的，主要逻辑如下：")]),q,n("p",null,[s("SAHI基于AutoDetectionModel类的from_pretrained函数加载深度学习模型。目前支持YOLOv5 models, MMDetection models, Detectron2 models和HuggingFace object detection models等深度学习模型库，如果想支持新的模型库,可以参考"),n("a",j,[s("sahi/models"),t(a)]),s("目录下的模型文件，新建模型检测类。")]),A,n("p",null,[s("SAHI提供多个工具函数以处理COCO数据集，具体使用可以阅读"),n("a",I,[s("sahi-docs-coco"),t(a)]),s("。")]),C,n("p",null,[s("当我们获得了预测数据，我们可以基于pycocotools工具分析预测数据的精度，pycocotools是目标检测必备工具，官方仓库地址为"),n("a",S,[s("cocoapi"),t(a)]),s("，结果分析代码如下：")]),D,n("p",null,[s("如果想了解其他的小目标识别方案，可以看看paddle家的"),n("a",H,[s("paddledetection-smalldet"),t(a)]),s("。paddle提供了基于原图和基于切图的小目标识别方案，也提供了统计数据集尺寸分布的代码（该统计代码对某些特定的数据集效果不好，具体原因看看代码）。推荐看看PaddleDetection的小目标识别方案，做的很不错。")]),N,n("ul",null,[n("li",null,[n("a",P,[s("sahi"),t(a)])]),n("li",null,[n("a",E,[s("sahi-demo"),t(a)])]),n("li",null,[n("a",O,[s("sahi-docs"),t(a)])]),n("li",null,[n("a",R,[s("Slicing Aided Hyper Inference and Fine-Tuning for Small Object Detection"),t(a)])]),n("li",null,[n("a",B,[s("sahi/slicing.py"),t(a)])]),n("li",null,[n("a",L,[s("sahi/models"),t(a)])]),n("li",null,[n("a",M,[s("sahi-docs-coco"),t(a)])]),n("li",null,[n("a",U,[s("cocoapi"),t(a)])]),n("li",null,[n("a",F,[s("paddledetection-smalldet"),t(a)])])])])}const J=e(l,[["render",z],["__file","2023-01-03-_深度学习_ 基于切片辅助超推理库SAHI优化小目标识别.html.vue"]]);export{J as default};
