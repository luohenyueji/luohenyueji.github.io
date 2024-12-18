import{_ as a,r as e,o as t,c as p,a as n,b as o,d as i,e as c}from"./app-DrqaGevo.js";const l={},u=c(`<h1 id="编程基础-python装饰器入门总结" tabindex="-1"><a class="header-anchor" href="#编程基础-python装饰器入门总结"><span>[编程基础] Python装饰器入门总结</span></a></h1><p>Python装饰器教程展示了如何在Python中使用装饰器基本功能。</p><h2 id="_1-使用教程" tabindex="-1"><a class="header-anchor" href="#_1-使用教程"><span>1 使用教程</span></a></h2><p>Python函数是一等公民。这意味着函数与Python中的其他对象具有同等的状态。可以将函数分配给变量，存储在集合中，动态创建和删除或作为参数传递。嵌套函数也称为内部函数，指的是在另一个函数中定义的函数。 Python decorator扩展并修改可调用函数的行为，而不修改可调用函数本身。decorator是修饰（或包装）其他函数并在包装函数运行前后执行代码的函数。Python装饰器通常用于日志记录，身份验证和授权，计时和缓存中。</p><h3 id="_1-1-python装饰器简单示例" tabindex="-1"><a class="header-anchor" href="#_1-1-python装饰器简单示例"><span>1.1 Python装饰器简单示例</span></a></h3><p>在这个示例中，简单创建一个简单的装饰器示例。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 以函数作为参数</span>
<span class="token keyword">def</span> <span class="token function">enclose</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token comment"># wrapper*()用星号装饰传递过来的函数，将返回包装函数。</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>
        fun<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># 返回包装函数</span>
    <span class="token keyword">return</span> wrapper

<span class="token comment"># 这是要装饰的常规函数</span>
<span class="token keyword">def</span> <span class="token function">myfun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;myfun&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># enclose()函数是类似decorator，它通过在输出中添加星形符号来扩展myfun函数的输出。</span>
<span class="token comment"># myfun被传递给enclosure()函数，在该函数中对其进行了扩展。将返回并调用包装函数。</span>
enc <span class="token operator">=</span> enclose<span class="token punctuation">(</span>myfun<span class="token punctuation">)</span>
<span class="token comment"># 调用包装函数</span>
enc<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>***************************
myfun
***************************
</code></pre><h3 id="_1-2-带-符号的python装饰器" tabindex="-1"><a class="header-anchor" href="#_1-2-带-符号的python装饰器"><span>1.2 带@符号的Python装饰器</span></a></h3><p>Python允许使用@符号来标记要用decorator装饰的方法。从功能上讲，该示例与上一个示例相同。仅使用不同的语法。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">enclose</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>
        fun<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> wrapper

<span class="token comment"># @enclose 就是enc = enclose(myfun)简写</span>
<span class="token comment"># 表明调用enclose函数修饰myufun函数，并返回修饰函数</span>
<span class="token decorator annotation punctuation">@enclose</span>
<span class="token keyword">def</span> <span class="token function">myfun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;myfun&quot;</span><span class="token punctuation">)</span>

myfun<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>***************************
myfun
***************************
</code></pre><h3 id="_1-3-用参数修饰函数" tabindex="-1"><a class="header-anchor" href="#_1-3-用参数修饰函数"><span>1.3 用参数修饰函数</span></a></h3><p>下面的示例演示如何装饰带有参数的函数。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">enclose</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>
        fun<span class="token punctuation">(</span>val<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> wrapper

<span class="token decorator annotation punctuation">@enclose</span>
<span class="token keyword">def</span> <span class="token function">myfun</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;myfun with </span><span class="token interpolation"><span class="token punctuation">{</span>val<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

myfun<span class="token punctuation">(</span><span class="token string">&#39;falcon&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>***************************
myfun with falcon
***************************
</code></pre><p>以下例子展示了如何使用*args，**kwargs语法处理可变数量的参数。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">enclose</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>
        fun<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;***************************&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> wrapper

<span class="token decorator annotation punctuation">@enclose</span>
<span class="token keyword">def</span> <span class="token function">myfun</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;</span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> is </span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string"> years old&#39;</span></span><span class="token punctuation">)</span>

myfun<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&#39;Peter&#39;</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">32</span><span class="token punctuation">)</span>
myfun<span class="token punctuation">(</span><span class="token string">&#39;Roman&#39;</span><span class="token punctuation">,</span> <span class="token number">29</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>***************************
Peter is 32 years old
***************************
***************************
Roman is 29 years old
***************************
</code></pre><h3 id="_1-4-python装饰器修改数据" tabindex="-1"><a class="header-anchor" href="#_1-4-python装饰器修改数据"><span>1.4 Python装饰器修改数据</span></a></h3><p>decorator函数可以修改修饰函数的数据。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">uppercase</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token comment"># 在包装函数内部，修改并返回了文本</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

        res <span class="token operator">=</span> fun<span class="token punctuation">(</span><span class="token punctuation">)</span>
        modified <span class="token operator">=</span> res<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">return</span> modified
    <span class="token keyword">return</span> wrapper

<span class="token comment"># @uppercase decorator将返回的文本更改为大写</span>
<span class="token decorator annotation punctuation">@uppercase</span>
<span class="token keyword">def</span> <span class="token function">gen_message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&#39;Hello there!&#39;</span>

msg <span class="token operator">=</span> gen_message<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>HELLO THERE!
</code></pre><h3 id="_1-5-python多层装饰器" tabindex="-1"><a class="header-anchor" href="#_1-5-python多层装饰器"><span>1.5 Python多层装饰器</span></a></h3><p>可以在一个函数上应用多个装饰器。以下示例在文本上应用了两个HTML标签。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">strong</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&#39;&lt;strong&gt;</span><span class="token interpolation"><span class="token punctuation">{</span>fun<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&lt;/strong&gt;&#39;</span></span>
    <span class="token keyword">return</span> wrapper

<span class="token keyword">def</span> <span class="token function">em</span><span class="token punctuation">(</span>fun<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&#39;&lt;em&gt;</span><span class="token interpolation"><span class="token punctuation">{</span>fun<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&lt;/em&gt;&#39;</span></span>

    <span class="token keyword">return</span> wrapper

<span class="token comment"># 先调用em装饰器，再调用strong装饰器</span>
<span class="token decorator annotation punctuation">@strong</span>
<span class="token decorator annotation punctuation">@em</span>
<span class="token keyword">def</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&#39;This is some message&#39;</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;strong&gt;&lt;em&gt;This is some message&lt;/em&gt;&lt;/strong&gt;
</code></pre><h3 id="_1-6-python装饰器计时示例" tabindex="-1"><a class="header-anchor" href="#_1-6-python装饰器计时示例"><span>1.6 Python装饰器计时示例</span></a></h3><p>在下面的示例中，我们在函数上应用计时器装饰器。下面示例使用decorator计算factoria()函数运行的时间。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> math

<span class="token keyword">def</span> <span class="token function">timer</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token comment"># 在函数运行之前，我们获得了开始时间。</span>
        begin <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>

        f <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        
        <span class="token comment"># 获得结束时间</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Total time taken in : &quot;</span><span class="token punctuation">,</span> func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> end <span class="token operator">-</span> begin<span class="token punctuation">)</span>

        <span class="token keyword">return</span> f

    <span class="token keyword">return</span> wrapper


<span class="token decorator annotation punctuation">@timer</span>
<span class="token keyword">def</span> <span class="token function">factorial</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">return</span> math<span class="token punctuation">.</span>factorial<span class="token punctuation">(</span>num<span class="token punctuation">)</span>

f <span class="token operator">=</span> factorial<span class="token punctuation">(</span><span class="token number">4580</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Total time taken in :  factorial 0.0005843639373779297
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考"><span>2 参考</span></a></h2>`,32),r={href:"http://zetcode.com/python/python-decorators/",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=e("ExternalLinkIcon");return t(),p("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[o("http://zetcode.com/python/python-decorators/"),i(s)])])])])}const y=a(l,[["render",d],["__file","2020-06-25-_编程基础_ Python装饰器入门总结.html.vue"]]),h=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-06-25-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20Python%E8%A3%85%E9%A5%B0%E5%99%A8%E5%85%A5%E9%97%A8%E6%80%BB%E7%BB%93.html","title":"[编程基础] Python装饰器入门总结","lang":"zh-CN","frontmatter":{"date":"2020-06-25T17:12:53.000Z","category":["编程基础"],"tag":["编程基础","Python"],"description":"[编程基础] Python装饰器入门总结 Python装饰器教程展示了如何在Python中使用装饰器基本功能。 1 使用教程 Python函数是一等公民。这意味着函数与Python中的其他对象具有同等的状态。可以将函数分配给变量，存储在集合中，动态创建和删除或作为参数传递。嵌套函数也称为内部函数，指的是在另一个函数中定义的函数。 Python deco...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-06-25-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20Python%E8%A3%85%E9%A5%B0%E5%99%A8%E5%85%A5%E9%97%A8%E6%80%BB%E7%BB%93.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] Python装饰器入门总结"}],["meta",{"property":"og:description","content":"[编程基础] Python装饰器入门总结 Python装饰器教程展示了如何在Python中使用装饰器基本功能。 1 使用教程 Python函数是一等公民。这意味着函数与Python中的其他对象具有同等的状态。可以将函数分配给变量，存储在集合中，动态创建和删除或作为参数传递。嵌套函数也称为内部函数，指的是在另一个函数中定义的函数。 Python deco..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2020-06-25T17:12:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] Python装饰器入门总结\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-25T17:12:53.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 使用教程","slug":"_1-使用教程","link":"#_1-使用教程","children":[{"level":3,"title":"1.1 Python装饰器简单示例","slug":"_1-1-python装饰器简单示例","link":"#_1-1-python装饰器简单示例","children":[]},{"level":3,"title":"1.2 带@符号的Python装饰器","slug":"_1-2-带-符号的python装饰器","link":"#_1-2-带-符号的python装饰器","children":[]},{"level":3,"title":"1.3 用参数修饰函数","slug":"_1-3-用参数修饰函数","link":"#_1-3-用参数修饰函数","children":[]},{"level":3,"title":"1.4 Python装饰器修改数据","slug":"_1-4-python装饰器修改数据","link":"#_1-4-python装饰器修改数据","children":[]},{"level":3,"title":"1.5 Python多层装饰器","slug":"_1-5-python多层装饰器","link":"#_1-5-python多层装饰器","children":[]},{"level":3,"title":"1.6 Python装饰器计时示例","slug":"_1-6-python装饰器计时示例","link":"#_1-6-python装饰器计时示例","children":[]}]},{"level":2,"title":"2 参考","slug":"_2-参考","link":"#_2-参考","children":[]}],"git":{},"readingTime":{"minutes":2.99,"words":898},"filePathRelative":"blog/编程基础/学习笔记/2020-06-25-[编程基础] Python装饰器入门总结.md","localizedDate":"2020年6月26日","excerpt":"\\n<p>Python装饰器教程展示了如何在Python中使用装饰器基本功能。</p>\\n<h2>1 使用教程</h2>\\n<p>Python函数是一等公民。这意味着函数与Python中的其他对象具有同等的状态。可以将函数分配给变量，存储在集合中，动态创建和删除或作为参数传递。嵌套函数也称为内部函数，指的是在另一个函数中定义的函数。\\nPython decorator扩展并修改可调用函数的行为，而不修改可调用函数本身。decorator是修饰（或包装）其他函数并在包装函数运行前后执行代码的函数。Python装饰器通常用于日志记录，身份验证和授权，计时和缓存中。</p>\\n<h3>1.1 Python装饰器简单示例</h3>","autoDesc":true}');export{y as comp,h as data};
