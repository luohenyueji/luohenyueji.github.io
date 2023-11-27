import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o,c,a as n,b as a,d as e,e as l}from"./app-MsA2k2kn.js";const i={},u=l(`<h1 id="python-python-map函数总结" tabindex="-1"><a class="header-anchor" href="#python-python-map函数总结" aria-hidden="true">#</a> [python] Python map函数总结</h1><p>本文主要介绍如何使用Python（Python3版本）的内置map()函数。简单来说map()函数会将指定的函数依次作用于某个序列的每个元素，并返回一个迭代器对象。map语法如下，其中function表示我们指定的函数，iterable表示要作用的序列，这个序列可以是一个也可以是多个。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>map(function, iterable, ...)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面实例具体介绍map()的使用方法。关于map函数的更多使用介绍见本文参考部分。</p><h2 id="_1-使用" tabindex="-1"><a class="header-anchor" href="#_1-使用" aria-hidden="true">#</a> 1 使用</h2><h3 id="_1-1-基础示例" tabindex="-1"><a class="header-anchor" href="#_1-1-基础示例" aria-hidden="true">#</a> 1.1 基础示例</h3><p>应用map()在整数列表上</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个函数</span>
<span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span> 

    <span class="token keyword">return</span> x<span class="token operator">**</span><span class="token number">2</span> 

<span class="token comment"># 序列</span>
nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span> 

<span class="token comment"># 对nums序列每个数求平方，返回迭代器</span>
nums_squared <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span>square<span class="token punctuation">,</span> nums<span class="token punctuation">)</span> 

<span class="token comment"># 输出结果</span>
<span class="token keyword">for</span> num <span class="token keyword">in</span> nums_squared<span class="token punctuation">:</span> 

    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
4
9
16
25
</code></pre><p>如果要实现和以上map函数同等功能，需要自定义函数，例子如下，</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个函数</span>
<span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">return</span> x <span class="token operator">*</span> x

<span class="token comment"># 序列</span>
<span class="token keyword">def</span> <span class="token function">mymap</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> iterable<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> iterable<span class="token punctuation">:</span>
        <span class="token keyword">yield</span> func<span class="token punctuation">(</span>i<span class="token punctuation">)</span>

nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>

<span class="token comment"># 对nums序列每个数求平方，返回迭代器</span>
nums_squared <span class="token operator">=</span> mymap<span class="token punctuation">(</span>square<span class="token punctuation">,</span> nums<span class="token punctuation">)</span>

<span class="token keyword">for</span> num <span class="token keyword">in</span> nums_squared<span class="token punctuation">:</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
4
9
16
25
</code></pre><p><strong>当然我们也可以将上面例子中的square函数用lambda代码，例子如下：</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span> 

nums_squared <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token operator">*</span>x<span class="token punctuation">,</span> nums<span class="token punctuation">)</span> 

<span class="token keyword">for</span> num <span class="token keyword">in</span> nums_squared<span class="token punctuation">:</span> 
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
4
9
16
25
</code></pre><h3 id="_1-2-具有多个可迭代对象的-python-映射" tabindex="-1"><a class="header-anchor" href="#_1-2-具有多个可迭代对象的-python-映射" aria-hidden="true">#</a> 1.2 具有多个可迭代对象的 Python 映射</h3><p>我们可以将多个可迭代对象传递给map()函数，然后map函数将这两个迭代对象传入指定的函数。注意map函数必须采用与可迭代对象一样多的参数，具体如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个函数</span>
<span class="token comment"># 该函数必须采用两个参数，因为有两个可迭代对象传递给map()</span>
<span class="token keyword">def</span> <span class="token function">multiply</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">return</span> x <span class="token operator">*</span> y

<span class="token comment"># 序列1</span>
nums1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token comment"># 序列2</span>
nums2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span>

<span class="token comment"># 每次从nums1和nums2中取值</span>
mult <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span>multiply<span class="token punctuation">,</span> nums1<span class="token punctuation">,</span> nums2<span class="token punctuation">)</span>

<span class="token keyword">for</span> num <span class="token keyword">in</span> mult<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>6
14
24
36
50
</code></pre><h3 id="_1-3-python映射多个函数" tabindex="-1"><a class="header-anchor" href="#_1-3-python映射多个函数" aria-hidden="true">#</a> 1.3 Python映射多个函数</h3><p>在以下示例中，我们将展示如何在 Python中使用map()映射多个函数。我们遍历for循环中的元素。在每个循环中，我们创建一个包含两个值的列表，这些结果是通过对传入参数应用add()和square()函数来计算的。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 函数1</span>
<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> x

<span class="token comment"># 函数2</span>
<span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> x

<span class="token comment"># 数据</span>
nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>

<span class="token comment"># 逐个取数处理</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> nums<span class="token punctuation">:</span>
    
    <span class="token comment"># lambda为处理函数，分别将add和square传给lambda</span>
    vals <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>add<span class="token punctuation">,</span> square<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>vals<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[2, 1]
[4, 4]
[6, 9]
[8, 16]
[10, 25]
</code></pre><h3 id="_1-4-基于列表推导实现map函数" tabindex="-1"><a class="header-anchor" href="#_1-4-基于列表推导实现map函数" aria-hidden="true">#</a> 1.4 基于列表推导实现map函数</h3><p>Python的map()也可以通过Python列表推导来实现。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义函数</span>
<span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">return</span> x <span class="token operator">*</span> x

nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>


<span class="token comment"># 列表推导式相当于每次从nums中取一个数放入square中</span>
nums_squared <span class="token operator">=</span> <span class="token punctuation">[</span>square<span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token keyword">for</span> num <span class="token keyword">in</span> nums<span class="token punctuation">]</span>

<span class="token keyword">for</span> num <span class="token keyword">in</span> nums_squared<span class="token punctuation">:</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
4
9
16
25
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,28),r={href:"https://zetcode.com/python/python-map/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.runoob.com/python/python-func-map.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/LuohenYJ/article/details/106955155",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const s=t("ExternalLinkIcon");return o(),c("div",null,[u,n("ul",null,[n("li",null,[n("a",r,[a("Python map"),e(s)])]),n("li",null,[n("a",d,[a("Python map() 函数"),e(s)])]),n("li",null,[n("a",k,[a("[编程基础] Python lambda函数总结"),e(s)])])])])}const _=p(i,[["render",m],["__file","2021-07-21-_python_ Python map函数总结.html.vue"]]);export{_ as default};
