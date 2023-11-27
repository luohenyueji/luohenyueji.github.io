import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o,c as i,a as n,b as s,d as t,e as l}from"./app-MsA2k2kn.js";const c={},u=n("h1",{id:"python-基于wordcloud库绘制词云图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-基于wordcloud库绘制词云图","aria-hidden":"true"},"#"),s(" [python] 基于wordcloud库绘制词云图")],-1),r={href:"https://github.com/amueller/word_cloud",target:"_blank",rel:"noopener noreferrer"},d=l(`<blockquote><p>pip install wordcloud</p></blockquote><p>[toc]</p><h2 id="_0-wordcloud绘图说明" tabindex="-1"><a class="header-anchor" href="#_0-wordcloud绘图说明" aria-hidden="true">#</a> 0 wordcloud绘图说明</h2><p>wordcloud库关于绘制词云的相关函数均由其内置类WordCloud提供。</p><p>WordCloud类初始函数如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>WordCloud<span class="token punctuation">(</span>font_path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">400</span><span class="token punctuation">,</span> height<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">,</span> margin<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>
          ranks_only<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> prefer_horizontal<span class="token operator">=</span><span class="token number">.9</span><span class="token punctuation">,</span> mask<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> scale<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
          color_func<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">,</span> min_font_size<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">,</span>
          stopwords<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> background_color<span class="token operator">=</span><span class="token string">&#39;black&#39;</span><span class="token punctuation">,</span>
          max_font_size<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> font_step<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">&quot;RGB&quot;</span><span class="token punctuation">,</span>
          relative_scaling<span class="token operator">=</span><span class="token string">&#39;auto&#39;</span><span class="token punctuation">,</span> regexp<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> collocations<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
          colormap<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> normalize_plurals<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> contour_width<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
          contour_color<span class="token operator">=</span><span class="token string">&#39;black&#39;</span><span class="token punctuation">,</span> repeat<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
          include_numbers<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> min_word_length<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> collocation_threshold<span class="token operator">=</span><span class="token number">30</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始函数参数介绍如下：</p><table><thead><tr><th>参数</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>font_path</td><td>str</td><td>字体路径，中文词云绘制必须要提供字体路径</td></tr><tr><td>width</td><td>int</td><td>输出画布宽度</td></tr><tr><td>height</td><td>int</td><td>输出画布高度</td></tr><tr><td>margin</td><td>int</td><td>输出画布每个词汇边框边距</td></tr><tr><td>prefer_horizontal</td><td>float</td><td>词汇水平方向排版出现的频率</td></tr><tr><td>mask</td><td>numpy-array</td><td>为空使用默认mask绘制词云，非空用给定mask绘制词云且宽高值将被忽略</td></tr><tr><td>scale</td><td>float</td><td>按照比例放大画布长宽</td></tr><tr><td>color_func</td><td>func</td><td>颜色设置函数</td></tr><tr><td>max_words</td><td>int</td><td>最大统计词数</td></tr><tr><td>min_font_size</td><td>int</td><td>最小字体尺寸</td></tr><tr><td>stopwords</td><td>list</td><td>绘图要过滤的词</td></tr><tr><td>random_state</td><td>int</td><td>随机数，主要用于设置颜色</td></tr><tr><td>background_color</td><td>str</td><td>背景颜色</td></tr><tr><td>max_font_size</td><td>int</td><td>最大字体尺寸</td></tr><tr><td>font_step</td><td>int</td><td>字体步长</td></tr><tr><td>mode</td><td>str</td><td>pillow image的绘图模式</td></tr><tr><td>relative_scaling</td><td>float</td><td>词频和字体大小的关联性</td></tr><tr><td>regexp</td><td>str</td><td>使用正则表达式分隔输入的文本</td></tr><tr><td>collocations</td><td>bool</td><td>是否包括两个词的搭配</td></tr><tr><td>colormap</td><td>str</td><td>给每个单词随机分配颜色，若指定color_func，则忽略该方法</td></tr><tr><td>normalize_plurals</td><td>bool</td><td>英文单词是否用单数替换复数</td></tr><tr><td>contour_width</td><td>int</td><td>词云轮廓尺寸</td></tr><tr><td>contour_color</td><td>str</td><td>词云轮廓颜色</td></tr><tr><td>repeat</td><td>bool</td><td>是否重复输入文本直到允许的最大词数</td></tr><tr><td>include_numbers</td><td>bool</td><td>是否包含数字作为短语</td></tr><tr><td>min_word_length</td><td>int</td><td>单词包含最少字母数</td></tr></tbody></table><p>WordCloud类提供的主要函数接口如下：</p><ul><li>generate_from_frequencies(frequencies)：根据词频生成词云</li><li>fit_words(frequencies)：等同generate_from_frequencies函数</li><li>process_text(text)：分词</li><li>generate_from_text(text)：根据文本生成词云</li><li>generate(text)：等同generate_from_text</li><li>to_image：输出绘图结果为pillow image</li><li>recolor：重置颜色</li><li>to_array：输出绘图结果为numpy array</li><li>to_file(filename)：保存为文件</li><li>to_svg：保存为svg文件</li></ul><h2 id="_1-绘图实例" tabindex="-1"><a class="header-anchor" href="#_1-绘图实例" aria-hidden="true">#</a> 1 绘图实例</h2><h3 id="_1-1-单个单词绘制词云" tabindex="-1"><a class="header-anchor" href="#_1-1-单个单词绘制词云" aria-hidden="true">#</a> 1.1 单个单词绘制词云</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud

text <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>

<span class="token comment"># 返回两个数组，只不过数组维度分别为n*1 和 1* m</span>
x<span class="token punctuation">,</span> y <span class="token operator">=</span> np<span class="token punctuation">.</span>ogrid<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token punctuation">:</span><span class="token number">300</span><span class="token punctuation">]</span>

<span class="token comment"># 设置绘图区域</span>
mask <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">-</span> <span class="token number">150</span><span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span>y <span class="token operator">-</span> <span class="token number">150</span><span class="token punctuation">)</span> <span class="token operator">**</span> <span class="token number">2</span> <span class="token operator">&gt;</span> <span class="token number">130</span> <span class="token operator">**</span> <span class="token number">2</span>
mask <span class="token operator">=</span> <span class="token number">255</span> <span class="token operator">*</span> mask<span class="token punctuation">.</span>astype<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>

<span class="token comment"># 绘制词云，repeat表示重复输入文本直到允许的最大词数max_words，scale设置放大比例</span>
wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>background_color<span class="token operator">=</span><span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span> repeat<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>max_words<span class="token operator">=</span><span class="token number">32</span><span class="token punctuation">,</span> mask<span class="token operator">=</span>mask<span class="token punctuation">,</span>scale<span class="token operator">=</span><span class="token number">1.5</span><span class="token punctuation">)</span>
wc<span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 输出到文件</span>
_ <span class="token operator">=</span> wc<span class="token punctuation">.</span>to_file<span class="token punctuation">(</span><span class="token string">&quot;result.jpg&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-基础绘制" tabindex="-1"><a class="header-anchor" href="#_1-2-基础绘制" aria-hidden="true">#</a> 1.2 基础绘制</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud

<span class="token comment"># 文本地址</span>
text_path <span class="token operator">=</span> <span class="token string">&#39;test.txt&#39;</span>
<span class="token comment"># 示例文本</span>
scr_text <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren&#39;t special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you&#39;re Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it&#39;s a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let&#39;s do more of those!&#39;&#39;&#39;</span>

<span class="token comment"># 保存示例文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>scr_text<span class="token punctuation">)</span>

<span class="token comment"># 读取文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 这里text是一个字符串</span>
    text <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 生成词云， WordCloud对输入的文本text进行切词展示。</span>
wordcloud <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wordcloud<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&#39;bilinear&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 修改显示的最大的字体大小</span>
wordcloud <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>max_font_size<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment"># 另外一种展示结果方式</span>
image <span class="token operator">=</span> wordcloud<span class="token punctuation">.</span>to_image<span class="token punctuation">(</span><span class="token punctuation">)</span>
image<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_7_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-自定义词云形状" tabindex="-1"><a class="header-anchor" href="#_1-3-自定义词云形状" aria-hidden="true">#</a> 1.3 自定义词云形状</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud<span class="token punctuation">,</span> STOPWORDS

<span class="token comment"># 文本地址</span>
text_path <span class="token operator">=</span> <span class="token string">&#39;test.txt&#39;</span>
<span class="token comment"># 示例文本</span>
scr_text <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren&#39;t special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you&#39;re Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it&#39;s a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let&#39;s do more of those!&#39;&#39;&#39;</span>

<span class="token comment"># 保存示例文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>scr_text<span class="token punctuation">)</span>

<span class="token comment"># 读取文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 这里text是一个字符串</span>
    text <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 想生成带特定形状的词云，首先得准备具备该形状的mask图片</span>
<span class="token comment"># 在mask图片中除了目标形状外，其他地方都是空白的</span>
mask <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;mask.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 要跳过的词</span>
stopwords <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span>STOPWORDS<span class="token punctuation">)</span>
<span class="token comment"># 去除better</span>
stopwords<span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token string">&quot;better&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># contour_width绘制mask边框宽度，contour_color设置mask区域颜色</span>
<span class="token comment"># 如果mask边框绘制不准，设置contour_width=0表示不绘制边框</span>
wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>background_color<span class="token operator">=</span><span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">2000</span><span class="token punctuation">,</span> mask<span class="token operator">=</span>mask<span class="token punctuation">,</span>
               stopwords<span class="token operator">=</span>stopwords<span class="token punctuation">,</span> contour_width<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> contour_color<span class="token operator">=</span><span class="token string">&#39;red&#39;</span><span class="token punctuation">,</span>scale<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>repeat<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token comment"># 生成图片</span>
wc<span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment"># 存储文件</span>
wc<span class="token punctuation">.</span>to_file<span class="token punctuation">(</span><span class="token string">&quot;result.png&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 展示词云结果</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&#39;bilinear&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 展示mask图片</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>mask<span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>gray<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&#39;bilinear&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_9_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-4-使用词频字典绘图" tabindex="-1"><a class="header-anchor" href="#_1-4-使用词频字典绘图" aria-hidden="true">#</a> 1.4 使用词频字典绘图</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># pip install multidict安装</span>
<span class="token keyword">import</span> multidict <span class="token keyword">as</span> multidict

<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token keyword">import</span> re
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token comment"># 统计词频</span>
<span class="token keyword">def</span> <span class="token function">getFrequencyDictForText</span><span class="token punctuation">(</span>sentence<span class="token punctuation">)</span><span class="token punctuation">:</span>
    fullTermsDict <span class="token operator">=</span> multidict<span class="token punctuation">.</span>MultiDict<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tmpDict <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment"># 按照空格分词</span>
    <span class="token keyword">for</span> text <span class="token keyword">in</span> sentence<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 如果匹配到相关词，就跳过，这样做可以获得定制度更高的结果</span>
        <span class="token keyword">if</span> re<span class="token punctuation">.</span><span class="token keyword">match</span><span class="token punctuation">(</span><span class="token string">&quot;a|the|an|the|to|in|for|of|or|by|with|is|on|that|be&quot;</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">continue</span>
        val <span class="token operator">=</span> tmpDict<span class="token punctuation">.</span>get<span class="token punctuation">(</span>text<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
        tmpDict<span class="token punctuation">[</span>text<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> val <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token comment"># 生成词频字典</span>
    <span class="token keyword">for</span> key <span class="token keyword">in</span> tmpDict<span class="token punctuation">:</span>
        fullTermsDict<span class="token punctuation">.</span>add<span class="token punctuation">(</span>key<span class="token punctuation">,</span> tmpDict<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> fullTermsDict


<span class="token keyword">def</span> <span class="token function">makeImage</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    mask <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;mask.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>background_color<span class="token operator">=</span><span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span> mask<span class="token operator">=</span>mask<span class="token punctuation">,</span> repeat<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    wc<span class="token punctuation">.</span>generate_from_frequencies<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

    plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>



<span class="token comment"># 文本地址</span>
text_path <span class="token operator">=</span> <span class="token string">&#39;test.txt&#39;</span>
<span class="token comment"># 示例文本</span>
scr_text <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren&#39;t special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you&#39;re Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it&#39;s a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let&#39;s do more of those!&#39;&#39;&#39;</span>

<span class="token comment"># 保存示例文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>scr_text<span class="token punctuation">)</span>

<span class="token comment"># 读取文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 这里text是一个字符串</span>
    text <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 获得词频字典</span>
fullTermsDict <span class="token operator">=</span> getFrequencyDictForText<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token comment"># 绘图</span>
makeImage<span class="token punctuation">(</span>fullTermsDict<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_11_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-5-颜色更改" tabindex="-1"><a class="header-anchor" href="#_1-5-颜色更改" aria-hidden="true">#</a> 1.5 颜色更改</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud<span class="token punctuation">,</span> STOPWORDS<span class="token punctuation">,</span> ImageColorGenerator

<span class="token comment"># 文本地址</span>
text_path <span class="token operator">=</span> <span class="token string">&#39;test.txt&#39;</span>
<span class="token comment"># 示例文本</span>
scr_text <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren&#39;t special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you&#39;re Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it&#39;s a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let&#39;s do more of those!&#39;&#39;&#39;</span>

<span class="token comment"># 保存示例文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>scr_text<span class="token punctuation">)</span>

<span class="token comment"># 读取文本</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>text_path<span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 这里text是一个字符串</span>
    text <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 图片地址https://github.com/amueller/word_cloud/blob/master/examples/alice_color.png</span>
alice_coloring <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;alice_color.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
stopwords <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span>STOPWORDS<span class="token punctuation">)</span>
stopwords<span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token string">&quot;better&quot;</span><span class="token punctuation">)</span>

wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>background_color<span class="token operator">=</span><span class="token string">&quot;white&quot;</span><span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span> mask<span class="token operator">=</span>alice_coloring<span class="token punctuation">,</span>
               stopwords<span class="token operator">=</span>stopwords<span class="token punctuation">,</span> max_font_size<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">,</span>repeat<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment"># 生成词云结果</span>
wc<span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token comment"># 绘制</span>
image <span class="token operator">=</span> wc<span class="token punctuation">.</span>to_image<span class="token punctuation">(</span><span class="token punctuation">)</span>
image<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment"># 绘制类似alice_coloring颜色的词云图片</span>
<span class="token comment"># 从图片中提取颜色</span>
image_colors <span class="token operator">=</span> ImageColorGenerator<span class="token punctuation">(</span>alice_coloring<span class="token punctuation">)</span>
<span class="token comment"># 重新设置词云颜色</span>
wc<span class="token punctuation">.</span>recolor<span class="token punctuation">(</span>color_func<span class="token operator">=</span>image_colors<span class="token punctuation">)</span>
<span class="token comment"># 绘制</span>
image <span class="token operator">=</span> wc<span class="token punctuation">.</span>to_image<span class="token punctuation">(</span><span class="token punctuation">)</span>
image<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 展示mask图片</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>alice_coloring<span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>gray<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&#39;bilinear&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_13_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_13_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_13_2.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-6-为特定词设置颜色" tabindex="-1"><a class="header-anchor" href="#_1-6-为特定词设置颜色" aria-hidden="true">#</a> 1.6 为特定词设置颜色</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> <span class="token punctuation">(</span>WordCloud<span class="token punctuation">,</span> get_single_color_func<span class="token punctuation">)</span>
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt


<span class="token comment"># 直接赋色函数</span>
<span class="token keyword">class</span> <span class="token class-name">SimpleGroupedColorFunc</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> color_to_words<span class="token punctuation">,</span> default_color<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 特定词颜色</span>
        self<span class="token punctuation">.</span>word_to_color <span class="token operator">=</span> <span class="token punctuation">{</span>word<span class="token punctuation">:</span> color
                              <span class="token keyword">for</span> <span class="token punctuation">(</span>color<span class="token punctuation">,</span> words<span class="token punctuation">)</span> <span class="token keyword">in</span> color_to_words<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span>
                              <span class="token keyword">for</span> word <span class="token keyword">in</span> words<span class="token punctuation">}</span>
        <span class="token comment"># 默认词颜色</span>
        self<span class="token punctuation">.</span>default_color <span class="token operator">=</span> default_color

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> word<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>word_to_color<span class="token punctuation">.</span>get<span class="token punctuation">(</span>word<span class="token punctuation">,</span> self<span class="token punctuation">.</span>default_color<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">GroupedColorFunc</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> color_to_words<span class="token punctuation">,</span> default_color<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>color_func_to_words <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token punctuation">(</span>get_single_color_func<span class="token punctuation">(</span>color<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">set</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span>color<span class="token punctuation">,</span> words<span class="token punctuation">)</span> <span class="token keyword">in</span> color_to_words<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

        self<span class="token punctuation">.</span>default_color_func <span class="token operator">=</span> get_single_color_func<span class="token punctuation">(</span>default_color<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">get_color_func</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Returns a single_color_func associated with the word&quot;&quot;&quot;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            color_func <span class="token operator">=</span> <span class="token builtin">next</span><span class="token punctuation">(</span>
                color_func <span class="token keyword">for</span> <span class="token punctuation">(</span>color_func<span class="token punctuation">,</span> words<span class="token punctuation">)</span> <span class="token keyword">in</span> self<span class="token punctuation">.</span>color_func_to_words
                <span class="token keyword">if</span> word <span class="token keyword">in</span> words<span class="token punctuation">)</span>
        <span class="token keyword">except</span> StopIteration<span class="token punctuation">:</span>
            color_func <span class="token operator">=</span> self<span class="token punctuation">.</span>default_color_func

        <span class="token keyword">return</span> color_func

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> word<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>get_color_func<span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">(</span>word<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>


text <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;The Zen of Python, by Tim Peters
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren&#39;t special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you&#39;re Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it&#39;s a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let&#39;s do more of those!&quot;&quot;&quot;</span>

<span class="token comment"># 直接输入文本时，在统计数据时是否包括两个词的搭配</span>
wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>collocations<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 为特定词设置颜色</span>
color_to_words <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;green&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;beautiful&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;explicit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;simple&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sparse&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;readability&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rules&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;practicality&#39;</span><span class="token punctuation">,</span>
                <span class="token string">&#39;explicitly&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;one&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;now&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;easy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;obvious&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;better&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">&#39;#FF00FF&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;ugly&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;implicit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;complex&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;complicated&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;nested&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;dense&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;special&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;errors&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;silently&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ambiguity&#39;</span><span class="token punctuation">,</span>
            <span class="token string">&#39;guess&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hard&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 设置除特定词外其他词的颜色为grey</span>
default_color <span class="token operator">=</span> <span class="token string">&#39;grey&#39;</span>

<span class="token comment"># 直接赋色函数，直接按照color_to_words设置的RGB颜色绘图，输出的颜色不够精细</span>
<span class="token comment"># grouped_color_simple = SimpleGroupedColorFunc(color_to_words, default_color)</span>

<span class="token comment"># 更精细的赋色函数，将color_to_words设置的RGB颜色转到hsv空间，然后进行绘图</span>
grouped_color <span class="token operator">=</span> GroupedColorFunc<span class="token punctuation">(</span>color_to_words<span class="token punctuation">,</span> default_color<span class="token punctuation">)</span>

<span class="token comment"># 应用颜色函数</span>
wc<span class="token punctuation">.</span>recolor<span class="token punctuation">(</span>color_func<span class="token operator">=</span>grouped_color<span class="token punctuation">)</span>

<span class="token comment"># 绘图</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_15_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-7-绘制中文词云" tabindex="-1"><a class="header-anchor" href="#_1-7-绘制中文词云" aria-hidden="true">#</a> 1.7 绘制中文词云</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> jieba
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> wordcloud <span class="token keyword">import</span> WordCloud<span class="token punctuation">,</span> ImageColorGenerator
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token comment"># 读取文本</span>
<span class="token comment"># 下载地址https://github.com/amueller/word_cloud/blob/master/examples/wc_cn/CalltoArms.txt</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;CalltoArms.txt&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    text <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 中文必须设置字体文件</span>
<span class="token comment"># 下载地址https://github.com/amueller/word_cloud/blob/master/examples/fonts/SourceHanSerif/SourceHanSerifK-Light.otf</span>
font_path <span class="token operator">=</span>  <span class="token string">&#39;SourceHanSerifK-Light.otf&#39;</span>

<span class="token comment"># 不用于绘制词云的词汇列表</span>
<span class="token comment"># 下载地址https://github.com/amueller/word_cloud/blob/master/examples/wc_cn/stopwords_cn_en.txt</span>
stopwords_path <span class="token operator">=</span> <span class="token string">&#39;stopwords_cn_en.txt&#39;</span>
<span class="token comment"># 词云</span>
<span class="token comment"># 模板图片</span>
back_coloring <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;alice_color.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 向jieba分词词典添加新的词语</span>
userdict_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;阿Ｑ&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;孔乙己&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;单四嫂子&#39;</span><span class="token punctuation">]</span>


<span class="token comment"># 分词</span>
<span class="token keyword">def</span> <span class="token function">jieba_processing_txt</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> word <span class="token keyword">in</span> userdict_list<span class="token punctuation">:</span>
        jieba<span class="token punctuation">.</span>add_word<span class="token punctuation">(</span>word<span class="token punctuation">)</span>

    mywordlist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment"># 分词</span>
    seg_list <span class="token operator">=</span> jieba<span class="token punctuation">.</span>cut<span class="token punctuation">(</span>text<span class="token punctuation">,</span> cut_all<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    liststr <span class="token operator">=</span> <span class="token string">&quot;/ &quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>seg_list<span class="token punctuation">)</span>

    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>stopwords_path<span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f_stop<span class="token punctuation">:</span>
        f_stop_text <span class="token operator">=</span> f_stop<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
        f_stop_seg_list <span class="token operator">=</span> f_stop_text<span class="token punctuation">.</span>splitlines<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> myword <span class="token keyword">in</span> liststr<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token punctuation">(</span>myword<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">in</span> f_stop_seg_list<span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token builtin">len</span><span class="token punctuation">(</span>myword<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
            mywordlist<span class="token punctuation">.</span>append<span class="token punctuation">(</span>myword<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>mywordlist<span class="token punctuation">)</span>
<span class="token comment"># 文字处理</span>
text <span class="token operator">=</span> jieba_processing_txt<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment"># margin设置词云每个词汇边框边距</span>
wc <span class="token operator">=</span> WordCloud<span class="token punctuation">(</span>font_path<span class="token operator">=</span>font_path<span class="token punctuation">,</span> background_color<span class="token operator">=</span><span class="token string">&quot;black&quot;</span><span class="token punctuation">,</span> max_words<span class="token operator">=</span><span class="token number">2000</span><span class="token punctuation">,</span> mask<span class="token operator">=</span>back_coloring<span class="token punctuation">,</span>
               max_font_size<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span> height<span class="token operator">=</span><span class="token number">860</span><span class="token punctuation">,</span> margin<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span>
               contour_width<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>contour_color<span class="token operator">=</span><span class="token string">&#39;blue&#39;</span><span class="token punctuation">)</span>


wc<span class="token punctuation">.</span>generate<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment"># 获得颜色</span>
image_colors_byImg <span class="token operator">=</span> ImageColorGenerator<span class="token punctuation">(</span>back_coloring<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>wc<span class="token punctuation">.</span>recolor<span class="token punctuation">(</span>color_func<span class="token operator">=</span>image_colors_byImg<span class="token punctuation">)</span><span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>imshow<span class="token punctuation">(</span>back_coloring<span class="token punctuation">,</span> interpolation<span class="token operator">=</span><span class="token string">&quot;bilinear&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&quot;off&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_17_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] 基于wordcloud库绘制词云图/output_17_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,39),k={href:"https://github.com/amueller/word_cloud",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.cnblogs.com/delav/articles/7837975.html",target:"_blank",rel:"noopener noreferrer"};function v(b,g){const a=p("ExternalLinkIcon");return o(),i("div",null,[u,n("p",null,[s("词云Wordcloud是文本数据的一种可视化表示方式。它通过设置不同的字体大小或颜色来表现每个术语的重要性。词云在社交媒体中被广泛使用，因为它能够让读者快速感知最突出的术语。然而，词云的输出结果没有统一的标准，也缺乏逻辑性。对于词频相差较大的词汇有较好的区分度，但对于颜色相近、频次相近的词汇来说效果并不好。因此词云不适合应用于科学绘图。本文基于python库"),n("a",r,[s("wordcloud"),t(a)]),s("来绘制词云。wordcloud安装方式如下：")]),d,n("ul",null,[n("li",null,[n("a",k,[s("wordcloud"),t(a)])]),n("li",null,[n("a",m,[s("Wordcloud各参数含义"),t(a)])])])])}const w=e(c,[["render",v],["__file","2022-12-07-_python_ 基于wordcloud库绘制词云图.html.vue"]]);export{w as default};
