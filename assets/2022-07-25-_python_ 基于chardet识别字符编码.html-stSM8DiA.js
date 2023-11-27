import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o,c,a as n,b as s,d as e,e as i}from"./app-MsA2k2kn.js";const l={},d=n("h1",{id:"python-基于chardet识别字符编码",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-基于chardet识别字符编码","aria-hidden":"true"},"#"),s(" [python] 基于chardet识别字符编码")],-1),u={href:"https://www.runoob.com/w3cnote/charset-encoding.html",target:"_blank",rel:"noopener noreferrer"},r={href:"https://github.com/chardet/chardet",target:"_blank",rel:"noopener noreferrer"},k=i(`<blockquote><p>pip install chardet</p></blockquote><h2 id="_1-使用" tabindex="-1"><a class="header-anchor" href="#_1-使用" aria-hidden="true">#</a> 1 使用</h2><p><strong>基础使用</strong></p><p>chardet提供detect函数接口实现字符编码的自动检测。detect函数接受一个参数，即非Unicode字符串。它返回一个字典，其中包含自动检测到的字符编码和范围为0到1的置信度，还有语言类型。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 导入库</span>
<span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request
<span class="token keyword">import</span> chardet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 读取网站</span>
rawdata <span class="token operator">=</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span><span class="token string">&#39;http://baidu.com/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 可以看到使用的是ascii编码</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>rawdata<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: &#39;ascii&#39;, &#39;confidence&#39;: 1.0, &#39;language&#39;: &#39;&#39;}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 读取网站</span>
rawdata <span class="token operator">=</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span><span class="token string">&#39;http://en.people.cn/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 可以看到使用的是utf-8编码</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>rawdata<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: &#39;utf-8&#39;, &#39;confidence&#39;: 0.99, &#39;language&#39;: &#39;&#39;}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建utf-8字节类型数据</span>
data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;hello, world&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>b&#39;hello, world&#39;





{&#39;encoding&#39;: &#39;ascii&#39;, &#39;confidence&#39;: 1.0, &#39;language&#39;: &#39;&#39;}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># bytes类型可以直接通过python的decode函数进行解码</span>
data<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">&#39;ascii&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;hello, world&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建utf-8字节类型数据，这里可以看到utf-8是最高效的编码方式。</span>
data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;hello, world!你好世界！&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>b&#39;hello, world!\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd\\xe4\\xb8\\x96\\xe7\\x95\\x8c\\xef\\xbc\\x81&#39;





{&#39;encoding&#39;: &#39;utf-8&#39;, &#39;confidence&#39;: 0.9690625, &#39;language&#39;: &#39;&#39;}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># bytes类型可以直接通过python的decode函数进行解码</span>
data<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;hello, world!你好世界！&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;你好世界&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;GBK&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 识别可能错误</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: None, &#39;confidence&#39;: 0.0, &#39;language&#39;: None}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 需要更丰富的字符数据提高识别率</span>
data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;你好世界，你好&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;GBK&#39;</span><span class="token punctuation">)</span>
chardet<span class="token punctuation">.</span>detect<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: &#39;GB2312&#39;, &#39;confidence&#39;: 0.99, &#39;language&#39;: &#39;Chinese&#39;}
</code></pre><p><strong>大量文本识别</strong></p><p>如果您正在处理大量文本，您可以调用UniversalDetector，以加快识别速度。下面的代码首先创建一个UniversalDetector对象，然后对大型文本分块识别，每个文本块用其检测方法feed。如果检测器达到最小置信阈值，它将设置detector.done为True，进而输出当前文本的字符编码。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request
<span class="token keyword">from</span> chardet<span class="token punctuation">.</span>universaldetector <span class="token keyword">import</span> UniversalDetector

usock <span class="token operator">=</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span><span class="token string">&#39;http://baidu.com/&#39;</span><span class="token punctuation">)</span>
detector <span class="token operator">=</span> UniversalDetector<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> line <span class="token keyword">in</span> usock<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    detector<span class="token punctuation">.</span>feed<span class="token punctuation">(</span>line<span class="token punctuation">)</span>
    <span class="token keyword">if</span> detector<span class="token punctuation">.</span>done<span class="token punctuation">:</span> <span class="token keyword">break</span>
detector<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
usock<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>detector<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: &#39;ascii&#39;, &#39;confidence&#39;: 1.0, &#39;language&#39;: &#39;&#39;}
</code></pre><p>对于多个文件或多个字符串，也可以使用UniversalDetector加快识别速度。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">from</span> chardet<span class="token punctuation">.</span>universaldetector <span class="token keyword">import</span> UniversalDetector

texta <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;hello, world&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
textb <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;你好世界，你好&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;GBK&#39;</span><span class="token punctuation">)</span>

detector <span class="token operator">=</span> UniversalDetector<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> data <span class="token keyword">in</span> <span class="token punctuation">[</span>texta<span class="token punctuation">,</span>textb<span class="token punctuation">]</span><span class="token punctuation">:</span>
    <span class="token comment"># 检测器重置</span>
    detector<span class="token punctuation">.</span>reset<span class="token punctuation">(</span><span class="token punctuation">)</span>
    detector<span class="token punctuation">.</span>feed<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">if</span> detector<span class="token punctuation">.</span>done<span class="token punctuation">:</span> <span class="token keyword">break</span>
    detector<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>detector<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;encoding&#39;: &#39;ascii&#39;, &#39;confidence&#39;: 1.0, &#39;language&#39;: &#39;&#39;}
{&#39;encoding&#39;: &#39;GB2312&#39;, &#39;confidence&#39;: 0.99, &#39;language&#39;: &#39;Chinese&#39;}
</code></pre><p><strong>UnicodeDammit的使用</strong></p><p>UnicodeDammit是beautifulsoup的内置库, 用于猜测字符编码。在UnicodeDammit中集成了chardet模块使得我们可以快速获取字符编码。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> bs4 <span class="token keyword">import</span> UnicodeDammit
 
data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">&#39;你好世界，你好&#39;</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">&#39;GBK&#39;</span><span class="token punctuation">)</span>
dammit <span class="token operator">=</span> UnicodeDammit<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token comment"># 解码结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dammit<span class="token punctuation">.</span>unicode_markup<span class="token punctuation">)</span>
<span class="token comment"># 打印编码结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dammit<span class="token punctuation">.</span>original_encoding<span class="token punctuation">)</span>
<span class="token comment"># 或直接调用chardet</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dammit<span class="token punctuation">.</span>detector<span class="token punctuation">.</span>chardet_encoding<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>你好世界，你好
gb2312
GB2312
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,33),v={href:"https://github.com/chardet/chardet",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.runoob.com/w3cnote/charset-encoding.html",target:"_blank",rel:"noopener noreferrer"};function b(h,g){const a=p("ExternalLinkIcon");return o(),c("div",null,[d,n("p",null,[s("对于人类能够识别的字符，计算机会根据某一对应关系将其转换为二进制形式进行保存。这个对应关系就是字符编码表，即什么样的字符对应什么样的二进制编码。这种字符编码表往往是多种多样的，因此，如果我们想要将一个未知编码的二进制文件转换为可读文本进行显示，就需要考其使用的是什么类型的字符编码。关于字符编码的进一步介绍见文章"),n("a",u,[s("字符集和字符编码"),e(a)]),s("。")]),n("p",null,[s("现实中，往往根据各种字符编码的特征字符来猜测当前文件使用的是什么类型的字符编码。但是许多字符对于不同字符编码是通用的，区别在于每种编码可能使用不同的字节序列来存储同一字符，根据这一特性再进一步处理。在Python中，chardet库能够提供了实现字符编码自动检测的函数。chardet支持绝大部分常见字符编码的识别，其官方仓库见："),n("a",r,[s("chardet"),e(a)]),s("。chardet安装指令如下：")]),k,n("ul",null,[n("li",null,[n("a",v,[s("chardet"),e(a)])]),n("li",null,[n("a",m,[s("字符集和字符编码"),e(a)])])])])}const f=t(l,[["render",b],["__file","2022-07-25-_python_ 基于chardet识别字符编码.html.vue"]]);export{f as default};
