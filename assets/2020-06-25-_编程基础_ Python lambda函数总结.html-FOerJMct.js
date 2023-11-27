import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o,c,a as n,b as a,d as p,e as l}from"./app-MsA2k2kn.js";const i={},u=l(`<h1 id="编程基础-python-lambda函数总结" tabindex="-1"><a class="header-anchor" href="#编程基础-python-lambda函数总结" aria-hidden="true">#</a> [编程基础] Python lambda函数总结</h1><p>Python lambda函数教程展示了如何在Python中创建匿名函数。Python中的匿名函数是使用lambda关键字创建的。</p><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1 介绍</h2><p>Python lambda函数也称为匿名函数，是没有名称的内联函数。它们是用lambda关键字创建的。这是内置Python的函数范型的一部分。 Python lambda函数仅限于一个表达式。它们可以在任何可以使用正常功能的地方使用。</p><p>Python lambda具有以下语法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>z = lambda x: x * y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语句使用lambda关键字创建匿名函数。函数将两个值相乘。x是传递给lambda函数的参数。参数x后面跟着一个冒号字符。冒号右边的代码是在调用lambda函数时执行的表达式。lambda函数被分配给z变量。</p><h3 id="_1-1-简单使用" tabindex="-1"><a class="header-anchor" href="#_1-1-简单使用" aria-hidden="true">#</a> 1.1 简单使用</h3><p>在下面示例中，我们有两个函数对一个值求平方。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    
    <span class="token keyword">return</span> x <span class="token operator">*</span> x

<span class="token comment"># 这里我们用lambda定义一个匿名的内联函数。请注意，该函数没有名称。sqr_fun是保存创建的lambda函数的变量的名称</span>
sqr_fun <span class="token operator">=</span> <span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">*</span> x

<span class="token keyword">print</span><span class="token punctuation">(</span>square<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>sqr_fun<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>9
16
</code></pre><p>lambda函数也可以不输入，示例如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">constant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token number">1</span>

<span class="token comment"># lambda本质是一个匿名函数</span>
constant_fun <span class="token operator">=</span> <span class="token keyword">lambda</span><span class="token punctuation">:</span> <span class="token number">1</span> 

<span class="token keyword">print</span><span class="token punctuation">(</span>constant<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>constant_fun<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
1
</code></pre><p>lambda函数也可以多输入参数，示例如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">product</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    
    <span class="token keyword">return</span> x <span class="token operator">*</span> y

<span class="token comment"># 冒号左边输入两个参数</span>
product_fun <span class="token operator">=</span> <span class="token keyword">lambda</span> x<span class="token punctuation">,</span>y <span class="token punctuation">:</span> x <span class="token operator">*</span> y

<span class="token keyword">print</span><span class="token punctuation">(</span>product<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>product_fun<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>12
12
</code></pre><h3 id="_1-2-python-lambda与map" tabindex="-1"><a class="header-anchor" href="#_1-2-python-lambda与map" aria-hidden="true">#</a> 1.2 Python lambda与map</h3><p>Python lambda函数对于该map() 函数很有用。我们可以创建更简洁的代码。Python map() 是一个内置函数，它将给定的函数应用于迭代器iterable的每一项，并返回一个迭代器iterator对象。 注意的是Python2 map函数返回列表，Python3 map函数返回迭代器。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> x

<span class="token comment"># 计算列表各个元素的平方</span>
result<span class="token operator">=</span><span class="token builtin">map</span><span class="token punctuation">(</span>square<span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token comment"># 需要遍历迭代器</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> result<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;map object at 0x7fc638814c10&gt;
1
4
9
16
25
</code></pre><p>Python lambda函数对于map()函数很有用。我们可以创建更简洁的代码。Python map()是一个内置函数，它将给定的函数应用于iterable的每个项，并返回一个迭代器对象。 以下示例为map()创建了一个内联函数作为参数。使用map()函数，我们将lambda函数应用于列表的每个元素。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span>

nums_squared <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">*</span> x<span class="token punctuation">,</span> nums<span class="token punctuation">)</span>

<span class="token keyword">for</span> num <span class="token keyword">in</span> nums_squared<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
4
9
16
25
36
</code></pre><p>当然lambada函数可以结合map()函数，输入两个参数，以下示例提供了两个列表，对两个列表中相同位置的数据进行相加</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>num_add <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">,</span> y<span class="token punctuation">:</span> x <span class="token operator">+</span> y<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> num <span class="token keyword">in</span> num_add<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>3
7
11
15
19
</code></pre><h3 id="_1-3-python-lambda与filter" tabindex="-1"><a class="header-anchor" href="#_1-3-python-lambda与filter" aria-hidden="true">#</a> 1.3 Python lambda与filter</h3><p>Python lambda函数可以与filter()函数一起使用。函数的作用是：从iterable中返回true的元素构造一个列表。</p><p>filte()函数为python自带函数，主要用于过滤掉不符合设定条件的元素，并返回符合条件元素组成的迭代器iterable。该函数有两个输入参数，第一个参数为处理函数，第二个参数为要处理的序列。序列的每个元素作为参数给函数进行判断，返回True或 False，过滤到返回False的参数，并将返回 True 的元素放到迭代器中。</p><p>下面示例展示通过使用filter()滤除奇数示例如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">is_even</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span>

result <span class="token operator">=</span> <span class="token builtin">filter</span><span class="token punctuation">(</span>is_even<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> result<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;filter object at 0x7fc638548650&gt;
2
4
6
8
10
</code></pre><p>以下示例中，lambda函数结合filter函数过滤了整数列表。新列表仅包含奇数整数。filter()中第一个函数为处理列表元素的函数，也就是lambda函数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nums <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span>

nums_filtered <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>nums_filtered<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1, 3, 5, 7, 9, 11]
</code></pre><h3 id="_1-4-python-lambda与sort" tabindex="-1"><a class="header-anchor" href="#_1-4-python-lambda与sort" aria-hidden="true">#</a> 1.4 Python lambda与sort</h3><p>Python列表有一个内置的列表排序()就地修改列表的方法。该方法有一个关键参数，用于在进行比较之前指定要在每个列表元素上调用的函数。在这里我们可以使用lambda函数。以下示例展示了使用lambda函数，按照用户的出生日期以相反的顺序对其进行排序。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>users <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;John Doe&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">:</span> <span class="token number">1987</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Jane Doe&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">:</span> <span class="token number">1996</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Robert Brown&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">:</span> <span class="token number">1977</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Lucia Smith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">:</span> <span class="token number">2002</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Patrick Dempsey&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">:</span> <span class="token number">1994</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment"># 获取列表的date_of_birth对应的值</span>
<span class="token keyword">def</span> <span class="token function">takeBirth</span><span class="token punctuation">(</span>elem<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> elem<span class="token punctuation">[</span><span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># 从小到大排列</span>
users<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>key<span class="token operator">=</span>takeBirth<span class="token punctuation">)</span>
<span class="token keyword">for</span> user <span class="token keyword">in</span> users<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>

<span class="token comment"># list.sort()中reverse表示从大到小排列，key表示指定列表中的某个元素进行排列</span>
users<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> e<span class="token punctuation">:</span> e<span class="token punctuation">[</span><span class="token string">&#39;date_of_birth&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> 

<span class="token keyword">for</span> user <span class="token keyword">in</span> users<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;name&#39;: &#39;Robert Brown&#39;, &#39;date_of_birth&#39;: 1977}
{&#39;name&#39;: &#39;John Doe&#39;, &#39;date_of_birth&#39;: 1987}
{&#39;name&#39;: &#39;Patrick Dempsey&#39;, &#39;date_of_birth&#39;: 1994}
{&#39;name&#39;: &#39;Jane Doe&#39;, &#39;date_of_birth&#39;: 1996}
{&#39;name&#39;: &#39;Lucia Smith&#39;, &#39;date_of_birth&#39;: 2002}
--------------------------------------------------
{&#39;name&#39;: &#39;Lucia Smith&#39;, &#39;date_of_birth&#39;: 2002}
{&#39;name&#39;: &#39;Jane Doe&#39;, &#39;date_of_birth&#39;: 1996}
{&#39;name&#39;: &#39;Patrick Dempsey&#39;, &#39;date_of_birth&#39;: 1994}
{&#39;name&#39;: &#39;John Doe&#39;, &#39;date_of_birth&#39;: 1987}
{&#39;name&#39;: &#39;Robert Brown&#39;, &#39;date_of_birth&#39;: 1977}
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,41),r={href:"http://zetcode.com/python/lambda/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.runoob.com/python/python-built-in-functions.html",target:"_blank",rel:"noopener noreferrer"};function k(m,b){const s=t("ExternalLinkIcon");return o(),c("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[a("http://zetcode.com/python/lambda/"),p(s)])])]),n("blockquote",null,[n("p",null,[n("a",d,[a("https://www.runoob.com/python/python-built-in-functions.html"),p(s)])])])])}const y=e(i,[["render",k],["__file","2020-06-25-_编程基础_ Python lambda函数总结.html.vue"]]);export{y as default};
