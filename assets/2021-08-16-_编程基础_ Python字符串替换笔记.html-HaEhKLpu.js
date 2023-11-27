import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as l,c as i,a as n,b as s,d as e,e as t}from"./app-MsA2k2kn.js";const c={},r=t(`<h1 id="编程基础-python字符串替换笔记" tabindex="-1"><a class="header-anchor" href="#编程基础-python字符串替换笔记" aria-hidden="true">#</a> [编程基础] Python字符串替换笔记</h1><p>Python字符串替换笔记主要展示了如何在Python中替换字符串。Python中有以下几种替换字符串的方法，本文主要介绍前三种。</p><ol><li>replace方法（常用）</li><li>translate方法</li><li>re.sub方法</li><li>字符串切片（根据Python字符串切片方法替换字符）</li></ol><h2 id="_1-replace方法" tabindex="-1"><a class="header-anchor" href="#_1-replace方法" aria-hidden="true">#</a> 1 replace方法</h2><p>Python replace方法把字符串中的old（旧字符串） 替换成new(新字符串)，如果指定第三个参数max，则设置替换次数不超过 max 次。</p><blockquote><p>str.replace(old, new[, max])</p></blockquote><p><strong>示例1</strong></p><p>在该示例中，出现的两个单词Hello都被替换为Hi。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 原字符</span>
msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>

<span class="token comment"># 替换字符，字符串直接调用replace方法</span>
msg2 <span class="token operator">=</span> msg<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Hi world! Hi Python!
</code></pre><p><strong>示例2</strong></p><p>可以直接str.replace方法。它将我们进行替换的字符串作为第一个参数。结果和示例1一样。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>

msg2 <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span>msg<span class="token punctuation">,</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Hi world! Hi Python!
</code></pre><p><strong>示例3</strong></p><p>我们可以用换行符替换每个逗号，并设置替换次数</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data <span class="token operator">=</span> <span class="token string">&quot;1,2,3,4,5&quot;</span>

<span class="token comment"># 替换次数为3次</span>
data2 <span class="token operator">=</span> data<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>data2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
2
3
4,5
</code></pre><p><strong>示例4</strong></p>`,19),u={href:"https://www.runoob.com/python3/python3-string-rfind.html",target:"_blank",rel:"noopener noreferrer"},d=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>

<span class="token comment"># Python rfind()返回字符串最后一次出现的位置</span>
idx <span class="token operator">=</span> msg<span class="token punctuation">.</span>rfind<span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span>

<span class="token comment"># 提取前一部分字符不替换，取后一部分字符进行替换</span>
<span class="token comment"># 这里用到了字符串切片的方式</span>
msg2 <span class="token operator">=</span> msg<span class="token punctuation">[</span><span class="token punctuation">:</span>idx<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span> msg<span class="token punctuation">[</span>idx<span class="token punctuation">:</span><span class="token punctuation">]</span> <span class="token punctuation">,</span> <span class="token string">&quot;Hello&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Hi&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>13
Hello world! Hi Python!
</code></pre><p><strong>示例5</strong></p><p>我们可以将replace方法链接起来进行多次替换。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>

msg2 <span class="token operator">=</span> msg<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&#39;!&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Hi world. Hi Python.
</code></pre><h2 id="_2-translate方法" tabindex="-1"><a class="header-anchor" href="#_2-translate方法" aria-hidden="true">#</a> 2 translate方法</h2><p>Python的translate函数与replace函数一样，用于替换字符串的一部分。Translate只能处理单个字符，但translate可以同时进行多个替换任务。在使用translate函数进行转换之前。需要一个翻译表table，翻译表用于表示字符的替换关系，这个翻译表可以通过maketrans()方法获得。这个翻译表可翻译字符数为256，翻译表中的字符都要包含在ASCII码表（含扩展）中。translate()方法语法为：</p><blockquote><p>str.translate(table)</p></blockquote><p><strong>示例1</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>

<span class="token comment"># intab中的字符与outtab中的字符一一对应</span>
intab <span class="token operator">=</span> <span class="token string">&quot;aeiou&quot;</span>
outtab <span class="token operator">=</span> <span class="token string">&quot;12345&quot;</span>
<span class="token comment"># 制作翻译表</span>
trantab <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">.</span>maketrans<span class="token punctuation">(</span>intab<span class="token punctuation">,</span> outtab<span class="token punctuation">)</span>   
<span class="token comment"># trantab中的字符都会用ASCII码表示</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>trantab<span class="token punctuation">)</span>

msg2 <span class="token operator">=</span> msg<span class="token punctuation">.</span>translate<span class="token punctuation">(</span>trantab<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>msg2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{97: 49, 101: 50, 105: 51, 111: 52, 117: 53}
H2ll4 w4rld! H2ll4 Pyth4n!
</code></pre><h2 id="_3-re-sub-替换字符串" tabindex="-1"><a class="header-anchor" href="#_3-re-sub-替换字符串" aria-hidden="true">#</a> 3 re.sub 替换字符串</h2>`,13),k={href:"https://blog.csdn.net/LuohenYJ/article/details/93652495",target:"_blank",rel:"noopener noreferrer"},m=t(`<p><strong>示例1</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> re

msg <span class="token operator">=</span> <span class="token string">&quot;Hello world! Hello Python!&quot;</span>
<span class="token comment"># 设置要替换的字符</span>
namesRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;Hello&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 用&#39;Hi&#39;替换msg中已经设置好要替换的字符</span>
namesRegex<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;Hi&#39;</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Hi world! Hi Python!&#39;
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,4),v={href:"https://zetcode.com/python/replace-string/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.runoob.com/python3/python3-string.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.csdn.net/LuohenYJ/article/details/93652495",target:"_blank",rel:"noopener noreferrer"};function g(y,_){const a=p("ExternalLinkIcon");return l(),i("div",null,[r,n("p",null,[s("在该示例中，我们替换最后一次出现的单词Hello。需要结合Python rfind()方法。rfind()方法是指返回字符串最后一次出现的位置。rfind()使用介绍见"),n("a",u,[s("python3-string-rfind"),e(a)]),s("。")]),d,n("p",null,[s("我们可以使用正则表达式来替换字符串。Python的re库就是常用的正则表达式匹配库（建议学一学很有用）。re库使用见"),n("a",k,[s("模式匹配与正则表达式笔记"),e(a)]),s("。这里主要使用re.sub函数替换字符串。re.sub()方法需要传入两个参数。第一个参数是一个字符串，用于取代发现的匹配。第二个参数是一个字符串，即正则表达式。sub()方法返回替换完成后的字符串。")]),m,n("ul",null,[n("li",null,[n("a",v,[s("replace-string"),e(a)])]),n("li",null,[n("a",b,[s("python3-string"),e(a)])]),n("li",null,[n("a",h,[s("模式匹配与正则表达式笔记"),e(a)])])])])}const w=o(c,[["render",g],["__file","2021-08-16-_编程基础_ Python字符串替换笔记.html.vue"]]);export{w as default};
