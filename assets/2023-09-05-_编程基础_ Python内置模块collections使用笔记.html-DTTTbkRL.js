import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as e,e as t}from"./app-MsA2k2kn.js";const l={},u=t('<h1 id="编程基础-python内置模块collections使用笔记" tabindex="-1"><a class="header-anchor" href="#编程基础-python内置模块collections使用笔记" aria-hidden="true">#</a> [编程基础] Python内置模块collections使用笔记</h1><p>collections是Python标准库中的一个内置模块，它提供了一些额外的数据结构类型，用于增强Python基础类型如列表（list）、元组（tuple）和字典（dict）等。以下是对collections模块中主要数据结构类的概述：</p><ul><li>namedtuple：命名元组，创建一个带有名称的tuple，并且可以通过名称访问元素。</li><li>deque：双端队列，可以在两端高效地执行插入和删除操作。</li><li>Counter：计数器，用于计算可迭代对象中元素的出现次数。</li><li>defaultdict：默认字典，类似于普通字典，但是在访问不存在的键时会返回一个默认值。</li><li>OrderedDict：有序字典，可以设置字典键值的顺序。</li><li>ChainMap：将多个字典或映射组合在一起的类。</li><li>UserList：列表的包装器类，用于创建自定义列表。</li><li>UserString：字符串的包装器类，用于创建自定义字符串。</li><li>UserDict：字典的包装器类，用于创建自定义字典。</li></ul>',3),d={href:"https://docs.python.org/zh-cn/3.8/library/collections.html",target:"_blank",rel:"noopener noreferrer"},r=t(`<p>[toc]</p><h2 id="_1-namedtuple" tabindex="-1"><a class="header-anchor" href="#_1-namedtuple" aria-hidden="true">#</a> 1 namedtuple</h2><p>namedtuple类似于元组（tuple），但是可以通过为每个元素指定名称，从而实现使用元素字段名来引用其元素，而不仅仅依赖于位置索引。</p><p>以下代码展示了namedtuple的使用</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple

<span class="token comment"># 定义一个名为Person的namedtuple类型，包含name和age两个字段</span>
Person <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">&#39;Person&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;age&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># Person = namedtuple(&#39;Person&#39;,&#39;age name&#39;) # 另一种创建方式</span>

<span class="token comment"># 创建一个Person对象</span>
person1 <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span>

<span class="token comment"># 访问字段值</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment"># Alice</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person1<span class="token punctuation">.</span>age<span class="token punctuation">)</span> <span class="token comment"># 17</span>

<span class="token comment"># 也可以通过索引访问字段值</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># Alice </span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 17  </span>

<span class="token comment"># namedtuple字段值是不可变的，不能直接修改字段值</span>
<span class="token comment"># person1.name = &#39;Bob&#39;  # 这行会抛出异常</span>

<span class="token comment"># 通过_replace方法创建一个新的命名元组，并替换特定字段的值</span>
person2 <span class="token operator">=</span> person1<span class="token punctuation">.</span>_replace<span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&#39;Bob&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person2<span class="token punctuation">)</span> <span class="token comment"># Person(name=&#39;Bob&#39;, age=17)</span>
<span class="token comment"># 打印字段名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person2<span class="token punctuation">.</span>_fields<span class="token punctuation">)</span> <span class="token comment"># (&#39;name&#39;, &#39;age&#39;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Alice
17
Alice
17
Person(name=&#39;Bob&#39;, age=17)
(&#39;name&#39;, &#39;age&#39;)
</code></pre><p>从以上代码可以看到namedtuple和Python字典类型有一些相似之处，但它们在实现和使用方式上存在很大的差异，需要根据具体的需求和情况选择合适的数据类型。如果需要保持字段的顺序、提高访问速度和内存效率，可以选择namedtuple。而如果需要动态地添加、删除和修改键值对，并且需要使用字典提供的更多内置方法和功能，那么字典类型可能更适合。相比字典类型，namedtuple优劣如下：</p><p>namedtuple优势：</p><ul><li>访问速度快：<code>namedtuple</code>内部使用整数索引访问字段，因此比字典更高效。</li><li>内存效率高：<code>namedtuple</code>采用紧凑的内存布局，相比字典更节省内存。</li><li>字段顺序固定：<code>namedtuple</code>定义时可以指定字段的顺序，并且不可变。这对于涉及字段顺序的操作非常有用。</li></ul><p>namedtuple劣势：</p><ul><li>不可变性：<code>namedtuple</code>的字段是不可变的，一旦创建就不能修改。而字典可以动态地添加、删除和修改键值对。</li><li>灵活性较差：字典提供了更多的内置方法和功能，例如迭代、查找、更新等。<code>namedtuple</code>相对简化，没有这些额外的功能。</li></ul><p>以下代码展示了namedtuple和普通字典占用空间大小的效果对比：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random
<span class="token keyword">import</span> sys
<span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple

<span class="token comment"># 创建字典</span>
person_dict <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">:</span> <span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;John Doe&#39;</span><span class="token punctuation">}</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;person_dict占用的空间大小：&#39;</span><span class="token punctuation">,</span> sys<span class="token punctuation">.</span>getsizeof<span class="token punctuation">(</span>person_dict<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 将字典转换为namedtuple</span>
Person <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">&#39;Person&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
person_tuple <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token operator">**</span>person_dict<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;person_tuple占用的空间大小：&#39;</span><span class="token punctuation">,</span> sys<span class="token punctuation">.</span>getsizeof<span class="token punctuation">(</span>person_tuple<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>person_dict占用的空间大小： 248
person_tuple占用的空间大小： 72
</code></pre><h2 id="_2-deque" tabindex="-1"><a class="header-anchor" href="#_2-deque" aria-hidden="true">#</a> 2 deque</h2><p>deque（双端队列）是一种具有队列和栈性质的数据结构，它允许从两端快速地添加和删除元素。deque类似列表list，但deque在插入和删除元素时具有更好的性能，尤其是在操作频繁的情况下。以下代码展示了deque的使用。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> deque

<span class="token comment"># 创建一个空的双端队列</span>
my_deque <span class="token operator">=</span> deque<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 创建一个包含元素的双端队列</span>
my_deque <span class="token operator">=</span> deque<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># 创建一个指定最大长度的双端队列，多余的元素会被丢弃</span>
my_deque <span class="token operator">=</span> deque<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> maxlen<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>

<span class="token comment"># 在队列的右侧添加一个元素</span>
my_deque<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># 在队列的左侧添加一个元素</span>
my_deque<span class="token punctuation">.</span>appendleft<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

<span class="token comment"># 移除并返回队列中的最右侧元素</span>
right_element <span class="token operator">=</span> my_deque<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 移除并返回队列中的最左侧元素</span>
left_element <span class="token operator">=</span> my_deque<span class="token punctuation">.</span>popleft<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 输出当前队列中的所有元素</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([1, 2, 3], maxlen=5)</span>
<span class="token comment"># 输出队列中的第一个元素</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 1</span>

<span class="token comment"># deque不支持切片操作，需要转换为list</span>
<span class="token comment"># print(my_deque[:-1])</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># [1, 2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>deque([1, 2, 3], maxlen=5)
1
[1, 2]
</code></pre><p>deque也支持基于字符串或列表来添加元素，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> deque

<span class="token comment"># 创建一个空的deque对象</span>
my_deque <span class="token operator">=</span> deque<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 使用extend/extendleft添加元素</span>
my_deque<span class="token punctuation">.</span>extend<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([1, 2, 3])</span>

<span class="token comment"># 使用extend/extendleft添加字符串</span>
my_deque<span class="token punctuation">.</span>extendleft<span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([&#39;o&#39;, &#39;l&#39;, &#39;l&#39;, &#39;e&#39;, &#39;H&#39;, 1, 2, 3])</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>deque([1, 2, 3])
deque([&#39;o&#39;, &#39;l&#39;, &#39;l&#39;, &#39;e&#39;, &#39;H&#39;, 1, 2, 3])
</code></pre><p>deque一些常用函数操作如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> deque

<span class="token comment"># 创建一个空的deque对象</span>
my_deque <span class="token operator">=</span> deque<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 在左侧扩展字符串&quot;Hello&quot;，将其拆分为字符并逐个添加到deque的左侧</span>
my_deque<span class="token punctuation">.</span>extendleft<span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 打印deque的长度</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 5</span>
<span class="token comment"># 统计字符&quot;l&quot;在deque中出现的次数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">&quot;l&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 2</span>

<span class="token comment"># 在deque的左侧插入字符串&quot;123&quot;</span>
my_deque<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([&#39;123&#39;, &#39;o&#39;, &#39;l&#39;, &#39;l&#39;, &#39;e&#39;, &#39;H&#39;])</span>

<span class="token comment"># 将deque中的元素从右端取两个元素，并把它们移动到左端</span>
<span class="token comment"># 如果为负数，则从左侧取元素</span>
my_deque<span class="token punctuation">.</span>rotate<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([&#39;e&#39;, &#39;H&#39;, &#39;123&#39;, &#39;o&#39;, &#39;l&#39;, &#39;l&#39;])</span>

<span class="token comment"># 反转队列</span>
my_deque<span class="token punctuation">.</span>reverse<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span> <span class="token comment"># deque([&#39;l&#39;, &#39;l&#39;, &#39;o&#39;, &#39;123&#39;, &#39;H&#39;, &#39;e&#39;])</span>

<span class="token comment"># 清空deque中的所有元素</span>
my_deque<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_deque<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>5
2
deque([&#39;123&#39;, &#39;o&#39;, &#39;l&#39;, &#39;l&#39;, &#39;e&#39;, &#39;H&#39;])
deque([&#39;e&#39;, &#39;H&#39;, &#39;123&#39;, &#39;o&#39;, &#39;l&#39;, &#39;l&#39;])
deque([&#39;l&#39;, &#39;l&#39;, &#39;o&#39;, &#39;123&#39;, &#39;H&#39;, &#39;e&#39;])
deque([])
</code></pre><h2 id="_3-counter" tabindex="-1"><a class="header-anchor" href="#_3-counter" aria-hidden="true">#</a> 3 Counter</h2><p>Counter用于计算可迭代对象中元素的出现次数，这些可迭代对象可以是列表、字符串、元组等。</p><p>以下代码展示了Counter的使用。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> Counter

<span class="token comment"># 创建一个Counter对象来统计列表中各元素的数量</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Counter<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 1})</span>

<span class="token comment"># 创建一个Counter对象来统计字符串中各字符的数量</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Counter<span class="token punctuation">(</span><span class="token string">&#39;aabbacdd&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;a&#39;: 3, &#39;b&#39;: 2, &#39;d&#39;: 2, &#39;c&#39;: 1})</span>

<span class="token comment"># 创建一个Counter对象来统计字符串中各字符的数量</span>
string_count <span class="token operator">=</span> Counter<span class="token punctuation">(</span><span class="token string">&#39;aabbacdd&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Counter对象转换为字典，遍历输出键值对</span>
<span class="token keyword">for</span> num<span class="token punctuation">,</span> count <span class="token keyword">in</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>string_count<span class="token punctuation">)</span><span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> count<span class="token punctuation">)</span>

<span class="token comment"># 遍历Counter对象中的项，输出键值对</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> string_count<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 1})
Counter({&#39;a&#39;: 3, &#39;b&#39;: 2, &#39;d&#39;: 2, &#39;c&#39;: 1})
a 3
b 2
c 1
d 2
(&#39;a&#39;, 3)
(&#39;b&#39;, 2)
(&#39;c&#39;, 1)
(&#39;d&#39;, 2)
</code></pre><p>若分别计算字符串中词的出现次数和字符的出现次数，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> Counter

line <span class="token operator">=</span> <span class="token string">&#39;你好 世界 你好 ！&#39;</span>

<span class="token comment"># 将字符串按空格拆分成单词列表</span>
list_of_words <span class="token operator">=</span> line<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span> 
<span class="token comment"># 计算每个单词出现的次数</span>
word_count <span class="token operator">=</span> Counter<span class="token punctuation">(</span>list_of_words<span class="token punctuation">)</span>
<span class="token comment"># 打印每个单词及其出现的次数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;你好&#39;: 2, &#39;世界&#39;: 1, &#39;！&#39;: 1})</span>

line <span class="token operator">=</span> <span class="token string">&#39;你好 世界 你好 ！&#39;</span>

<span class="token comment"># 计算每个字符出现的次数</span>
string_count <span class="token operator">=</span> Counter<span class="token punctuation">(</span>line<span class="token punctuation">)</span>
<span class="token comment"># 打印每个字符及其出现的次数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>string_count<span class="token punctuation">)</span> <span class="token comment"># Counter({&#39; &#39;: 3, &#39;你&#39;: 2, &#39;好&#39;: 2, &#39;世&#39;: 1, &#39;界&#39;: 1, &#39;！&#39;: 1})</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Counter({&#39;你好&#39;: 2, &#39;世界&#39;: 1, &#39;！&#39;: 1})
Counter({&#39; &#39;: 3, &#39;你&#39;: 2, &#39;好&#39;: 2, &#39;世&#39;: 1, &#39;界&#39;: 1, &#39;！&#39;: 1})
</code></pre><p>Counter相关功能函数d的使用如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> Counter

<span class="token comment"># 创建一个Counter对象，用于统计元素出现的次数</span>
word_count <span class="token operator">=</span> Counter<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 统计出现次数最多的两个元素并打印结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>most_common<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># [(&#39;a&#39;, 2), (&#39;c&#39;, 2)]</span>
<span class="token comment"># 若不指定个数，则列出全部元素及其出现次数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>most_common<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># [(&#39;a&#39;, 2), (&#39;c&#39;, 2), (&#39;d&#39;, 2), (&#39;b&#39;, 1)]</span>

<span class="token comment"># 打印Counter对象中的元素迭代器</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>elements<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># &lt;itertools.chain object at 0x7fd228db2110&gt;</span>
<span class="token comment"># 将元素迭代器转换为列表并打印</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>elements<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># [&#39;a&#39;, &#39;a&#39;, &#39;c&#39;, &#39;c&#39;, &#39;d&#39;, &#39;d&#39;, &#39;b&#39;]</span>
<span class="token comment"># 将元素迭代器排序后打印</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>elements<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># [&#39;a&#39;, &#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;c&#39;, &#39;d&#39;, &#39;d&#39;]</span>
<span class="token comment"># 对Counter对象进行排序后打印（按元素字典序排序）</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>word_count<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;]</span>
<span class="token comment"># 打印Counter对象的键（即元素）</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># dict_keys([&#39;a&#39;, &#39;c&#39;, &#39;d&#39;, &#39;b&#39;])</span>
<span class="token comment"># 打印Counter对象的值（即元素出现的次数）</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># dict_values([2, 2, 2, 1])</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[(&#39;a&#39;, 2), (&#39;c&#39;, 2)]
[(&#39;a&#39;, 2), (&#39;c&#39;, 2), (&#39;d&#39;, 2), (&#39;b&#39;, 1)]
&lt;itertools.chain object at 0x7efe4809fcd0&gt;
[&#39;a&#39;, &#39;a&#39;, &#39;c&#39;, &#39;c&#39;, &#39;d&#39;, &#39;d&#39;, &#39;b&#39;]
[&#39;a&#39;, &#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;c&#39;, &#39;d&#39;, &#39;d&#39;]
[&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;]
dict_keys([&#39;a&#39;, &#39;c&#39;, &#39;d&#39;, &#39;b&#39;])
dict_values([2, 2, 2, 1])
</code></pre><p>对Counter中单个元素的操作，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> Counter

<span class="token comment"># 创建一个 Counter 对象，统计列表中各元素的出现次数</span>
word_count <span class="token operator">=</span> Counter<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 输出字母&quot;c&quot;的出现次数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">[</span><span class="token string">&quot;c&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 2</span>

<span class="token comment"># 更新 Counter 对象，添加新的元素并重新统计出现次数</span>
word_count<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2, &#39;e&#39;: 1})</span>

<span class="token comment"># 删除 Counter 对象中的元素&quot;e&quot;</span>
<span class="token keyword">del</span> word_count<span class="token punctuation">[</span><span class="token string">&quot;e&quot;</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2})</span>

<span class="token comment"># 将字母&quot;f&quot;的出现次数增加3</span>
word_count<span class="token punctuation">[</span><span class="token string">&#39;f&#39;</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">3</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>word_count<span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;f&#39;: 3, &#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2})</span>

<span class="token comment"># 计算两个Counter对象的交集</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Counter<span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> Counter<span class="token punctuation">(</span><span class="token string">&#39;bde&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;b&#39;: 1})</span>
<span class="token comment"># 计算两个 Counter 对象的并集</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Counter<span class="token punctuation">(</span><span class="token string">&#39;abc&#39;</span><span class="token punctuation">)</span> <span class="token operator">|</span> Counter<span class="token punctuation">(</span><span class="token string">&#39;bde&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># Counter({&#39;a&#39;: 1, &#39;b&#39;: 1, &#39;c&#39;: 1, &#39;d&#39;: 1, &#39;e&#39;: 1})</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2
Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2, &#39;e&#39;: 1})
Counter({&#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2})
Counter({&#39;f&#39;: 3, &#39;a&#39;: 2, &#39;c&#39;: 2, &#39;d&#39;: 2, &#39;b&#39;: 2})
Counter({&#39;b&#39;: 1})
Counter({&#39;a&#39;: 1, &#39;b&#39;: 1, &#39;c&#39;: 1, &#39;d&#39;: 1, &#39;e&#39;: 1})
</code></pre><h2 id="_4-defaultdict、ordereddict" tabindex="-1"><a class="header-anchor" href="#_4-defaultdict、ordereddict" aria-hidden="true">#</a> 4 defaultdict、OrderedDict</h2><h3 id="_4-1-defaultdict" tabindex="-1"><a class="header-anchor" href="#_4-1-defaultdict" aria-hidden="true">#</a> 4.1 defaultdict</h3><p>defaultdict是Python标准库collections模块中的一个类，它是dict类的一个子类。defaultdict的作用是创建一个字典，当访问字典中不存在的键时，不会抛出KeyError异常，而是返回一个默认值。defaultdict用法如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> defaultdict

<span class="token comment"># 创建一个默认值为0的defaultdict对象d</span>
d <span class="token operator">=</span> defaultdict<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>

<span class="token comment"># 打印d中键&#39;a&#39;对应的值，由于键&#39;a&#39;不存在，所以返回默认值0</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># 0</span>

<span class="token comment"># 将键&#39;b&#39;赋值为2</span>
d<span class="token punctuation">[</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token comment"># defaultdict(&lt;class &#39;int&#39;&gt;, {&#39;a&#39;: 0, &#39;b&#39;: 2})</span>

<span class="token comment"># 将键&#39;c&#39;对应的值加1</span>
d<span class="token punctuation">[</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token comment"># defaultdict(&lt;class &#39;int&#39;&gt;, {&#39;a&#39;: 0, &#39;b&#39;: 2, &#39;c&#39;: 1})</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0
defaultdict(&lt;class &#39;int&#39;&gt;, {&#39;a&#39;: 0, &#39;b&#39;: 2})
defaultdict(&lt;class &#39;int&#39;&gt;, {&#39;a&#39;: 0, &#39;b&#39;: 2, &#39;c&#39;: 1})
</code></pre><h3 id="_4-2-ordereddict" tabindex="-1"><a class="header-anchor" href="#_4-2-ordereddict" aria-hidden="true">#</a> 4.2 OrderedDict</h3><p>OrderedDict的使用方法与普通字典dict类似，唯一的区别是它可以设置元素的顺序。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> OrderedDict

<span class="token comment"># 创建一个空的有序字典，按照元素添加的顺序进行遍历和访问</span>
order_dict <span class="token operator">=</span> OrderedDict<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 添加键值对</span>
order_dict<span class="token punctuation">[</span><span class="token string">&#39;apple&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3</span>
order_dict<span class="token punctuation">[</span><span class="token string">&#39;banana&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span>
order_dict<span class="token punctuation">[</span><span class="token string">&#39;orange&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>order_dict<span class="token punctuation">)</span> <span class="token comment"># OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])</span>

<span class="token comment"># 创建一个字典fruits</span>
fruits <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;banana&#39;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;apple&#39;</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;orange&#39;</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span>

<span class="token comment"># 按照键对字典进行排序并将其转换为有序字典</span>
order_dict <span class="token operator">=</span> OrderedDict<span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>fruits<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>order_dict<span class="token punctuation">)</span> <span class="token comment"># OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])</span>

<span class="token comment"># 按照值对字典进行排序并将其转换为有序字典</span>
order_dict <span class="token operator">=</span> OrderedDict<span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>fruits<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>order_dict<span class="token punctuation">)</span> <span class="token comment"># OrderedDict([(&#39;banana&#39;, 2), (&#39;apple&#39;, 3), (&#39;orange&#39;, 5)])</span>

<span class="token comment"># 按照键的长度对字典进行排序并将其转换为有序字典</span>
order_dict <span class="token operator">=</span> OrderedDict<span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>fruits<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token builtin">len</span><span class="token punctuation">(</span>x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>order_dict<span class="token punctuation">)</span> <span class="token comment"># OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])
OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])
OrderedDict([(&#39;banana&#39;, 2), (&#39;apple&#39;, 3), (&#39;orange&#39;, 5)])
OrderedDict([(&#39;apple&#39;, 3), (&#39;banana&#39;, 2), (&#39;orange&#39;, 5)])
</code></pre><h2 id="_5-chainmap" tabindex="-1"><a class="header-anchor" href="#_5-chainmap" aria-hidden="true">#</a> 5 ChainMap</h2><p>ChainMap用于方便地合并多个字典或映射对象，使它们作为一个整体进行操作。具体使用方法如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> ChainMap

employee1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Mary&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;002&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;David&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;003&#39;</span><span class="token punctuation">}</span>
employee2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Lisa&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;004&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Michael&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;005&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Sarah&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;006&#39;</span><span class="token punctuation">}</span>
employee3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Peter&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;007&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Emily&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;008&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Ryan&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;009&#39;</span><span class="token punctuation">}</span>

<span class="token comment"># 创建ChainMap对象</span>
combined_employees <span class="token operator">=</span> ChainMap<span class="token punctuation">(</span>employee1<span class="token punctuation">,</span> employee2<span class="token punctuation">,</span> employee3<span class="token punctuation">)</span>

<span class="token comment"># 打印出ChainMap中所有的字典，按照添加顺序</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>maps<span class="token punctuation">)</span>

<span class="token comment"># 打印出ChainMap中所有键的列表，按照添加顺序</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 打印出ChainMap中所有值的列表，按照添加顺序</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[{&#39;John&#39;: &#39;001&#39;, &#39;Mary&#39;: &#39;002&#39;, &#39;David&#39;: &#39;003&#39;}, {&#39;Lisa&#39;: &#39;004&#39;, &#39;Michael&#39;: &#39;005&#39;, &#39;Sarah&#39;: &#39;006&#39;}, {&#39;Peter&#39;: &#39;007&#39;, &#39;Emily&#39;: &#39;008&#39;, &#39;Ryan&#39;: &#39;009&#39;}]
[&#39;Peter&#39;, &#39;Emily&#39;, &#39;Ryan&#39;, &#39;Lisa&#39;, &#39;Michael&#39;, &#39;Sarah&#39;, &#39;John&#39;, &#39;Mary&#39;, &#39;David&#39;]
[&#39;007&#39;, &#39;008&#39;, &#39;009&#39;, &#39;004&#39;, &#39;005&#39;, &#39;006&#39;, &#39;001&#39;, &#39;002&#39;, &#39;003&#39;]
</code></pre><p>如果要合并的对象中出现键值重合，使用ChainMap时将按照添加顺序，以最先添加的字典为准。在这种情况下，相同的键值经过合并后，会取第一个字典中的值作为重复键的值。具体示例如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> ChainMap

<span class="token comment"># John项重复</span>
employee1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Mary&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;002&#39;</span><span class="token punctuation">}</span>
employee2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Lisa&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;004&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;005&#39;</span><span class="token punctuation">}</span>

<span class="token comment"># 创建ChainMap对象</span>
combined_employees <span class="token operator">=</span> ChainMap<span class="token punctuation">(</span>employee1<span class="token punctuation">,</span> employee2<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>maps<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[{&#39;John&#39;: &#39;001&#39;, &#39;Mary&#39;: &#39;002&#39;}, {&#39;Lisa&#39;: &#39;004&#39;, &#39;John&#39;: &#39;005&#39;}]
[&#39;Lisa&#39;, &#39;John&#39;, &#39;Mary&#39;]
[&#39;004&#39;, &#39;001&#39;, &#39;002&#39;]
</code></pre><p>在创建ChainMap对象后，也可以为其添加新的字典类型子项。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> ChainMap

employee1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Mary&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;002&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;David&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;003&#39;</span><span class="token punctuation">}</span>
employee2 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Mary&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;004&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Michael&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;005&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Sarah&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;006&#39;</span><span class="token punctuation">}</span>
employee3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Peter&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;007&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Emily&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;008&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Ryan&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;009&#39;</span><span class="token punctuation">}</span>

combined_employees <span class="token operator">=</span> ChainMap<span class="token punctuation">(</span>employee1<span class="token punctuation">,</span> employee2<span class="token punctuation">,</span> employee3<span class="token punctuation">)</span>

<span class="token comment"># 创建字典employee4，包含员工编号信息</span>
employee4 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&#39;Jack&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;010&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Halr&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;011&#39;</span><span class="token punctuation">}</span>
<span class="token comment"># 使用new_child方法将employee4添加到combined_employees中</span>
combined_employees <span class="token operator">=</span> combined_employees<span class="token punctuation">.</span>new_child<span class="token punctuation">(</span>employee4<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>combined_employees<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>ChainMap({&#39;Jack&#39;: &#39;010&#39;, &#39;Halr&#39;: &#39;011&#39;}, {&#39;John&#39;: &#39;001&#39;, &#39;Mary&#39;: &#39;002&#39;, &#39;David&#39;: &#39;003&#39;}, {&#39;Mary&#39;: &#39;004&#39;, &#39;Michael&#39;: &#39;005&#39;, &#39;Sarah&#39;: &#39;006&#39;}, {&#39;Peter&#39;: &#39;007&#39;, &#39;Emily&#39;: &#39;008&#39;, &#39;Ryan&#39;: &#39;009&#39;})
</code></pre><h2 id="_6-userlist、userstring、userdict" tabindex="-1"><a class="header-anchor" href="#_6-userlist、userstring、userdict" aria-hidden="true">#</a> 6 UserList、UserString、UserDict</h2><h3 id="_6-1-userlist" tabindex="-1"><a class="header-anchor" href="#_6-1-userlist" aria-hidden="true">#</a> 6.1 UserList</h3><p>UserList是list的包装类，用于创建一个自定义的列表类。如下所示，UserList可以像普通list一样操作：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> UserList

<span class="token comment"># 创建一个普通的Python列表</span>
my_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span>

<span class="token comment"># 使用UserList类构造函数创建一个自定义列表对象，传入普通列表作为参数</span>
<span class="token comment"># my_list可以通过UserList.data方法访问。</span>
user_list <span class="token operator">=</span> UserList<span class="token punctuation">(</span>my_list<span class="token punctuation">)</span>

<span class="token comment"># 打印自定义列表对象</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>user_list<span class="token punctuation">)</span> <span class="token comment"># [13, 4, 1, 5, 7]</span>

<span class="token comment"># 打印自定义列表对象的Python列表数据</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>user_list<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token comment"># [13, 4, 1, 5, 7]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>user_list<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># [13, 4, 1, 5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[13, 4, 1, 5, 7]
[13, 4, 1, 5, 7]
[13, 4, 1, 5]
</code></pre><p>UserList的好处在于可以创建一个继承自UserList的子类，以便自定义列表的各个方法。下面是重写了append方法的简单示例：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> UserList

<span class="token keyword">class</span> <span class="token class-name">MyList</span><span class="token punctuation">(</span>UserList<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> initialdata<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>initialdata<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">append</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 在添加元素时打印一条消息</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Appending&quot;</span><span class="token punctuation">,</span> item<span class="token punctuation">)</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>append<span class="token punctuation">(</span>item<span class="token punctuation">)</span>


<span class="token comment"># 创建一个MyList对象并添加元素</span>
my_list <span class="token operator">=</span> MyList<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
my_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_list<span class="token punctuation">)</span> <span class="token comment"># [1, 2, 3, 4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Appending 4
[1, 2, 3, 4]
</code></pre><h3 id="_6-2-userstring" tabindex="-1"><a class="header-anchor" href="#_6-2-userstring" aria-hidden="true">#</a> 6.2 UserString</h3><p>UserString用于创建自定义字符串类。通过继承UserString类，可以创建自定义的可变字符串对象，并且可以使用各种字符串操作方法。如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> UserString

 <span class="token comment"># 自定义user_string类，继承自UserString类</span>
<span class="token keyword">class</span> <span class="token class-name">user_string</span><span class="token punctuation">(</span>UserString<span class="token punctuation">)</span><span class="token punctuation">:</span>
   
    <span class="token comment"># 定义append方法，用于向字符串后追加内容</span>
    <span class="token keyword">def</span> <span class="token function">append</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> new<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>data <span class="token operator">=</span> self<span class="token punctuation">.</span>data <span class="token operator">+</span> new

    <span class="token comment"># 定义remove方法，用于删除字符串中的指定内容</span>
    <span class="token keyword">def</span> <span class="token function">remove</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>data <span class="token operator">=</span> self<span class="token punctuation">.</span>data<span class="token punctuation">.</span>replace<span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

text <span class="token operator">=</span> <span class="token string">&#39;dog cat lion elephant&#39;</span>

animals <span class="token operator">=</span> user_string<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
animals<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">&quot;monkey&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> word <span class="token keyword">in</span> <span class="token punctuation">[</span><span class="token string">&#39;cat&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;elephant&#39;</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
    animals<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>word<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>animals<span class="token punctuation">)</span> <span class="token comment"># dog  lion monkey</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>dog  lion monkey
</code></pre><h3 id="_6-3-userdict" tabindex="-1"><a class="header-anchor" href="#_6-3-userdict" aria-hidden="true">#</a> 6.3 UserDict</h3><p>UserDic是一个字典类型的包装类，用于创建自定义字典类。通过继承UserDict类，可以创建自定义的字典对象。如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> UserDict

<span class="token keyword">class</span> <span class="token class-name">MyDict</span><span class="token punctuation">(</span>UserDict<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> initialdata<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>initialdata<span class="token punctuation">)</span>
    
    <span class="token keyword">def</span> <span class="token function">__setitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 在设置键值对时，将所有键转为大写</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__setitem__<span class="token punctuation">(</span>key<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>

<span class="token comment"># 创建自定义字典对象</span>
my_dict <span class="token operator">=</span> MyDict<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 添加键值对</span>
my_dict<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;Alice&#39;</span>
my_dict<span class="token punctuation">[</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">25</span>

<span class="token comment"># 输出字典内容</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>my_dict<span class="token punctuation">)</span> <span class="token comment"># {&#39;NAME&#39;: &#39;Alice&#39;, &#39;AGE&#39;: 25}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;NAME&#39;: &#39;Alice&#39;, &#39;AGE&#39;: 25}
</code></pre><h2 id="_7-参考" tabindex="-1"><a class="header-anchor" href="#_7-参考" aria-hidden="true">#</a> 7 参考</h2>`,74),k={href:"https://docs.python.org/zh-cn/3.8/library/collections.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.machinelearningplus.com/python-collections-guide",target:"_blank",rel:"noopener noreferrer"},v={href:"https://vegibit.com/python-collections-tutorial/",target:"_blank",rel:"noopener noreferrer"};function b(y,g){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("本文主要介绍这些数据类的基础使用方法，以更好地利用Python的collections模块来处理不同类型的数据。关于collections模块更详细的使用介绍可以参考Python官方文档："),n("a",d,[s("python-collections"),e(a)]),s("。")]),r,n("ul",null,[n("li",null,[n("a",k,[s("python-collections"),e(a)])]),n("li",null,[n("a",m,[s("python-collections-guide"),e(a)])]),n("li",null,[n("a",v,[s("python-collections-tutorial"),e(a)])])])])}const w=p(l,[["render",b],["__file","2023-09-05-_编程基础_ Python内置模块collections使用笔记.html.vue"]]);export{w as default};
