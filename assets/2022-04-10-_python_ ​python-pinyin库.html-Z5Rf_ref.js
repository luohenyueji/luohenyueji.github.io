import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c as l,a as n,b as s,d as e,e as p}from"./app-tQFRrlV7.js";const c={},r=n("h1",{id:"python-​python-pinyin库",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-​python-pinyin库","aria-hidden":"true"},"#"),s(" [python] ​python-pinyin库")],-1),u=n("p",null,"python-pinyin库是一个汉字拼音转换工具，其主要功能有：",-1),d=n("ul",null,[n("li",null,"根据词组智能匹配最正确的拼音。"),n("li",null,"支持多音字。"),n("li",null,"简单的繁体支持, 注音支持。"),n("li",null,"支持多种不同拼音风格。")],-1),k=n("p",null,[s("安装命令为："),n("code",null,"pip install pypinyin")],-1),v={href:"https://github.com/mozillazg/python-pinyin",target:"_blank",rel:"noopener noreferrer"},y={href:"https://pypinyin.readthedocs.io/zh_CN/master/",target:"_blank",rel:"noopener noreferrer"},m=p(`<h2 id="_1-api使用" tabindex="-1"><a class="header-anchor" href="#_1-api使用" aria-hidden="true">#</a> 1 api使用</h2><h3 id="_1-1-pypinyin-pinyin" tabindex="-1"><a class="header-anchor" href="#_1-1-pypinyin-pinyin" aria-hidden="true">#</a> 1.1 pypinyin.pinyin</h3><p>pypinyin的常用函数为pinyin，即将汉字转换为拼音，返回汉字的拼音列表。</p><blockquote><p>pypinyin.pinyin(hans, style=Style.TONE, heteronym=False, errors=&#39;default&#39;, strict=True, v_to_u=False, neutral_tone_with_five=False)</p></blockquote><p>pinyin的参数介绍如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>参数
hans：(unicode 字符串或字符串列表) – 汉字字符串( &#39;你好吗&#39; )或列表( [&#39;你好&#39;, &#39;吗&#39;] )。

style：指定拼音风格，默认是 TONE（标注拼音） 风格。 

errors：指定如何处理没有拼音的字符。

heteronym： 是否启用多音字。

strict ：只获取声母或只获取韵母相关拼音风格的返回结果时，是否严格遵照《汉语拼音方案》来处理声母和韵母。

v_to_u (bool)：无声调相关拼音风格下的结果是否使用 ü 代替原来的 v ，当为False时结果中将使用 v 表示 ü。

neutral_tone_with_five (bool)：声调风格下是否用5表示轻声。

返回：拼音列表。

返回类型：list。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拼音风格style的可选参数列表如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#: 普通风格，不带声调。如： 中国 -&gt; \`\`zhong guo\`\`
NORMAL = 0
#: 标准声调风格，拼音声调在韵母第一个字母上（默认风格）。如： 中国 -&gt; \`\`zhōng guó\`\`
TONE = 1
#: 声调风格2，即拼音声调在各个韵母之后，用数字 [1-4] 进行表示。如： 中国 -&gt; \`\`zho1ng guo2\`\`
TONE2 = 2
#: 声调风格3，即拼音声调在各个拼音之后，用数字 [1-4] 进行表示。如： 中国 -&gt; \`\`zhong1 guo2\`\`
TONE3 = 8
#: 声母风格，只返回各个拼音的声母部分（注：有的拼音没有声母，详见 \`#27\`_）。如： 中国 -&gt; \`\`zh g\`\`
INITIALS = 3
#: 首字母风格，只返回拼音的首字母部分。如： 中国 -&gt; \`\`z g\`\`
FIRST_LETTER = 4
#: 韵母风格，只返回各个拼音的韵母部分，不带声调。如： 中国 -&gt; \`\`ong uo\`\`
FINALS = 5
#: 标准韵母风格，带声调，声调在韵母第一个字母上。如：中国 -&gt; \`\`ōng uó\`\`
FINALS_TONE = 6
#: 韵母风格2，带声调，声调在各个韵母之后，用数字 [1-4] 进行表示。如： 中国 -&gt; \`\`o1ng uo2\`\`
FINALS_TONE2 = 7
#: 韵母风格3，带声调，声调在各个拼音之后，用数字 [1-4] 进行表示。如： 中国 -&gt; \`\`ong1 uo2\`\`
FINALS_TONE3 = 9
#: 注音风格，带声调，阴平（第一声）不标。如： 中国 -&gt; \`\`ㄓㄨㄥ ㄍㄨㄛˊ\`\`
BOPOMOFO = 10
#: 注音风格，仅首字母。如： 中国 -&gt; \`\`ㄓ ㄍ\`\`
BOPOMOFO_FIRST = 11
#: 汉语拼音与俄语字母对照风格，声调在各个拼音之后，用数字 [1-4] 进行表示。如： 中国 -&gt; \`\`чжун1 го2\`\`
CYRILLIC = 12
#: 汉语拼音与俄语字母对照风格，仅首字母。如： 中国 -&gt; \`\`ч г\`\`
CYRILLIC_FIRST = 13
#: 威妥玛拼音/韦氏拼音/威式拼音风格，无声调
WADEGILES = 14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>errors处理方式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&#39;default&#39;: 保留原始字符

&#39;ignore&#39;: 忽略该字符

&#39;replace&#39;: 替换为去掉 \\u 的 unicode 编码字符串 (&#39;\\u90aa&#39; =&gt; &#39;90aa&#39;)

callable对象: 回调函数之类的可调用对象。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体函数和参数使用如下：</p><p><strong>基础使用</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> pinyin
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中毒&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;class &#39;list&#39;&gt;
[[&#39;zhōng&#39;], [&#39;xīn&#39;]]
[[&#39;zhòng&#39;], [&#39;dú&#39;]]
</code></pre><p><strong>启用多音字模式</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span> heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中毒&#39;</span><span class="token punctuation">,</span> heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;, &#39;zhòng&#39;], [&#39;xīn&#39;]]
[[&#39;zhòng&#39;], [&#39;dú&#39;]]
</code></pre><p><strong>设置拼音风格</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> pinyin<span class="token punctuation">,</span> Style
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>INITIALS<span class="token punctuation">)</span> <span class="token comment"># 声母风格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>FIRST_LETTER<span class="token punctuation">)</span> <span class="token comment"># 首字母风格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment"># 韵母风格</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zh&#39;], [&#39;x&#39;]]
[[&#39;z&#39;], [&#39;x&#39;]]
[[&#39;ong&#39;], [&#39;in&#39;]]
</code></pre><p><strong>v_to_u</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 使用 ü 代替原来的 v</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;战略&#39;</span><span class="token punctuation">,</span> v_to_u<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>NORMAL<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;战略&#39;</span><span class="token punctuation">,</span> v_to_u<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>NORMAL<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhan&#39;], [&#39;lüe&#39;]]
[[&#39;zhan&#39;], [&#39;lve&#39;]]
</code></pre><p><strong>neutral_tone_with_five</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 声调风格下是否用5表示轻声</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;衣裳&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE3<span class="token punctuation">,</span> neutral_tone_with_five<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;衣裳&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE3<span class="token punctuation">,</span> neutral_tone_with_five<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;yi1&#39;], [&#39;shang5&#39;]]
[[&#39;yi1&#39;], [&#39;shang&#39;]]
</code></pre><p><strong>处理不包含拼音的字符</strong></p><p>根据errors 参数的值做相应的处理即可。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># default (默认行为): 不做任何处理，原样返回:</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心center&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;], [&#39;xīn&#39;], [&#39;center&#39;]]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># ignore : 忽略该字符</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心center&#39;</span><span class="token punctuation">,</span> errors<span class="token operator">=</span><span class="token string">&#39;ignore&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;], [&#39;xīn&#39;]]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># replace : 替换为去掉 \\u 的 unicode 编码:</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心center&#39;</span><span class="token punctuation">,</span> errors<span class="token operator">=</span><span class="token string">&#39;replace&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;], [&#39;xīn&#39;], [&#39;63656e746572&#39;]]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># callable 对象 : 提供一个回调函数，接受无拼音字符(串)作为参数, 支持的返回值类型: unicode 或 list 或 None 。</span>
result <span class="token operator">=</span>pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心center&#39;</span><span class="token punctuation">,</span> errors<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token string">&#39;other&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;], [&#39;xīn&#39;], [&#39;other&#39;]]
</code></pre><p><strong>strict参数的影响</strong></p><p>strict 参数用于控制处理声母和韵母时是否严格遵循 《汉语拼音方案》 标准</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;迂&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>FINALS_TONE<span class="token punctuation">,</span>strict<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;迂&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>FINALS_TONE<span class="token punctuation">,</span>strict<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;ū&#39;]]
[[&#39;ǖ&#39;]]
</code></pre><h3 id="_1-2-pypinyin-lazy-pinyin" tabindex="-1"><a class="header-anchor" href="#_1-2-pypinyin-lazy-pinyin" aria-hidden="true">#</a> 1.2 pypinyin.lazy_pinyin</h3><p>lazy_pinyin()将汉字转换为拼音，返回不包含多音字结果的拼音列表，与 pinyin()的区别是返回的拼音是个字符串， 并且每个字只包含一个读音。</p><blockquote><p>pypinyin.lazy_pinyin(hans, style=Style.NORMAL, errors=&#39;default&#39;, strict=True, v_to_u=False, neutral_tone_with_five=False, tone_sandhi=False)</p></blockquote><p>lazy_pinyin与pinyin大部分参数是一样的，除了tone_sandhi。tone_sandhi表示是否按照声调变调规则对拼音进行处理。</p><p><strong>示例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 注意返回的是读音字符串</span>
<span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> lazy_pinyin<span class="token punctuation">,</span> Style
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;中毒&#39;</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;zhong&#39;, &#39;xin&#39;]
[&#39;zhong&#39;, &#39;du&#39;]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 是否按照声调变调规则对拼音进行处理</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;你好&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE2<span class="token punctuation">,</span> tone_sandhi<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;你好&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE2<span class="token punctuation">,</span> tone_sandhi<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;ni2&#39;, &#39;ha3o&#39;]
[&#39;ni3&#39;, &#39;ha3o&#39;]
</code></pre><h3 id="_1-3-load-single-dict和load-phrases-dict" tabindex="-1"><a class="header-anchor" href="#_1-3-load-single-dict和load-phrases-dict" aria-hidden="true">#</a> 1.3 load_single_dict和load_phrases_dict</h3><p>pypinyin.load_single_dict用于载入用户自定义的单字拼音库。</p><blockquote><p>pypinyin.load_single_dict(pinyin_dict, style=&#39;default&#39;)</p></blockquote><p>pypinyin.load_single_dict的参数介绍如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pinyin_dict (dict) – 单字拼音库。比如： {0x963F: u&quot;ā,ē&quot;}
style – pinyin_dict 参数值的拼音库风格. 支持 ‘default’, ‘tone2’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>pypinyin.load_phrases_dict用于载入用户自定义的词语拼音库。</p><blockquote><p>pypinyin.load_phrases_dict(phrases_dict, style=&#39;default&#39;)</p></blockquote><p>pypinyin.load_phrases_dict的参数介绍如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>phrases_dict (dict) – 词语拼音库。比如： {u&quot;阿爸&quot;: [[u&quot;ā&quot;], [u&quot;bà&quot;]]}
style – phrases_dict 参数值的拼音库风格. 支持 ‘default’, ‘tone2’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>具体函数和参数使用如下：</p><p><strong>增加单字</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> lazy_pinyin<span class="token punctuation">,</span> load_phrases_dict<span class="token punctuation">,</span> Style<span class="token punctuation">,</span> load_single_dict
hans <span class="token operator">=</span> <span class="token string">&#39;还没&#39;</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span>hans<span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE3<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
load_single_dict<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token builtin">ord</span><span class="token punctuation">(</span><span class="token string">&#39;还&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token string">&#39;huán, hái&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment"># 调整 &quot;还&quot; 字的拼音顺序或覆盖默认拼音</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;还没&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE3<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;hai2&#39;, &#39;mei2&#39;]
[&#39;huan2&#39;, &#39;mei2&#39;]
</code></pre><p><strong>增加词组</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> lazy_pinyin<span class="token punctuation">,</span> load_phrases_dict<span class="token punctuation">,</span> Style<span class="token punctuation">,</span> load_single_dict

hans <span class="token operator">=</span> <span class="token string">&#39;桔子&#39;</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span>hans<span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE2<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
load_phrases_dict<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;桔子&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;jú&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;zǐ&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment"># 增加 &quot;桔子&quot; 词组</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span>hans<span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>TONE2<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;ju2&#39;, &#39;zi&#39;]
[&#39;ju2&#39;, &#39;zi3&#39;]
</code></pre><p><strong>pypinyin-dict</strong></p>`,66),b={href:"https://github.com/mozillazg/pypinyin-dict",target:"_blank",rel:"noopener noreferrer"},g=p(`<blockquote><p>pip install pypinyin-dict</p></blockquote><p><strong>示例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> pinyin
result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span>heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token comment"># 使用 phrase-pinyin-data 项目中 cc_cedict.txt 文件中的拼音数据优化结果</span>
<span class="token keyword">from</span> pypinyin_dict<span class="token punctuation">.</span>phrase_pinyin_data <span class="token keyword">import</span> cc_cedict
cc_cedict<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span>

result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;中心&#39;</span><span class="token punctuation">,</span>heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;zhōng&#39;, &#39;zhòng&#39;], [&#39;xīn&#39;]]
[[&#39;zhōng&#39;], [&#39;xīn&#39;]]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> pinyin

result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;扔&#39;</span><span class="token punctuation">,</span> heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token comment"># 使用 pinyin-data 项目中 cc_cedict.txt 文件中的拼音数据优化结果</span>
<span class="token keyword">from</span> pypinyin_dict<span class="token punctuation">.</span>pinyin_data <span class="token keyword">import</span> kxhc1983
kxhc1983<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span>

result <span class="token operator">=</span> pinyin<span class="token punctuation">(</span><span class="token string">&#39;扔&#39;</span><span class="token punctuation">,</span> heteronym<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;rēng&#39;, &#39;rèng&#39;]]
[[&#39;rēng&#39;]]
</code></pre><h3 id="_1-4-pypinyin-slug" tabindex="-1"><a class="header-anchor" href="#_1-4-pypinyin-slug" aria-hidden="true">#</a> 1.4 pypinyin.slug</h3><p>pypinyin.slug将汉字转换为拼音，然后生成slug字符串。</p><blockquote><p>pypinyin.slug(hans, style=Style.NORMAL, heteronym=False, separator=&#39;-&#39;, errors=&#39;default&#39;, strict=True)</p></blockquote><p>pypinyin.slug的参数介绍如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hans (unicode 字符串或字符串列表) – 汉字字符串( &#39;你好吗&#39; )或列表( [&#39;你好&#39;, &#39;吗&#39;] ). 可以使用自己喜爱的分词模块对字符串进行分词处理, 只需将经过分词处理的字符串列表传进来就可以了。
style – 指定拼音风格，默认是 NORMAL 风格。 更多拼音风格详见 Style
heteronym – 是否启用多音字
separator – 两个拼音间的分隔符/连接符
errors – 指定如何处理没有拼音的字符，详情请参考 pinyin()
strict – 只获取声母或只获取韵母相关拼音风格的返回结果 是否严格遵照《汉语拼音方案》来处理声母和韵母， 详见 strict 参数的影响

返回：slug字符串.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pypinyin
<span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> Style
result <span class="token operator">=</span> pypinyin<span class="token punctuation">.</span>slug<span class="token punctuation">(</span><span class="token string">&#39;你我他&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>

result <span class="token operator">=</span> pypinyin<span class="token punctuation">.</span>slug<span class="token punctuation">(</span><span class="token string">&#39;你我他&#39;</span><span class="token punctuation">,</span> separator<span class="token operator">=</span><span class="token string">&#39;|&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

result <span class="token operator">=</span> pypinyin<span class="token punctuation">.</span>slug<span class="token punctuation">(</span><span class="token string">&#39;你我他&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span>Style<span class="token punctuation">.</span>FIRST_LETTER<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>ni-wo-ta
&lt;class &#39;str&#39;&gt;
ni|wo|ta
n-w-t
</code></pre><h3 id="_1-5-pypinyin-style-register" tabindex="-1"><a class="header-anchor" href="#_1-5-pypinyin-style-register" aria-hidden="true">#</a> 1.5 pypinyin.style.register</h3><p>pypinyin.style.register用于注册一个拼音风格实现。示例注册方式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@register(&#39;echo&#39;)
def echo(pinyin, **kwargs):
    return pinyin

# or
register(&#39;echo&#39;, echo)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体使用看示例代码理解：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pypinyin <span class="token keyword">import</span> lazy_pinyin
<span class="token keyword">from</span> pypinyin<span class="token punctuation">.</span>style <span class="token keyword">import</span> register

<span class="token decorator annotation punctuation">@register</span><span class="token punctuation">(</span><span class="token string">&#39;kiss&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">kiss</span><span class="token punctuation">(</span>pinyin<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&#39;😘 {0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>pinyin<span class="token punctuation">)</span>

result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;么么&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
result <span class="token operator">=</span> lazy_pinyin<span class="token punctuation">(</span><span class="token string">&#39;么么&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span><span class="token string">&#39;kiss&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;me&#39;, &#39;me&#39;]
[&#39;😘 me&#39;, &#39;😘 me&#39;]
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,21),h={href:"https://github.com/mozillazg/python-pinyin",target:"_blank",rel:"noopener noreferrer"},_={href:"https://pypinyin.readthedocs.io/zh_CN/master/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/mozillazg/pypinyin-dict",target:"_blank",rel:"noopener noreferrer"};function w(f,z){const a=i("ExternalLinkIcon");return o(),l("div",null,[r,u,d,k,n("p",null,[s("官方仓库为："),n("a",v,[s("python-pinyin"),e(a)])]),n("p",null,[s("官方中文文档为："),n("a",y,[s("pypinyin文档"),e(a)])]),m,n("p",null,[s("使用"),n("a",b,[s("pypinyin-dict"),e(a)]),s("项目提供的自定义拼音库可以纠正结果。但是需要安装该自定义拼音库。")]),g,n("ul",null,[n("li",null,[n("p",null,[n("a",h,[s("python-pinyin"),e(a)])])]),n("li",null,[n("p",null,[n("a",_,[s("pypinyin文档"),e(a)])])]),n("li",null,[n("p",null,[n("a",x,[s("pypinyin-dict"),e(a)])])])])])}const S=t(c,[["render",w],["__file","2022-04-10-_python_ ​python-pinyin库.html.vue"]]);export{S as default};
