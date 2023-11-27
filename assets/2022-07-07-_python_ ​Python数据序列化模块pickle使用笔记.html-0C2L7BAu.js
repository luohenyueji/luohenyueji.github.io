import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-MsA2k2kn.js";const l={},u=p('<h1 id="python-​python数据序列化模块pickle使用笔记" tabindex="-1"><a class="header-anchor" href="#python-​python数据序列化模块pickle使用笔记" aria-hidden="true">#</a> [python] ​Python数据序列化模块pickle使用笔记</h1><p>pickle是一个Python的内置模块，用于在Python中实现对象结构序列化和反序列化。Python序列化是一个将Python对象层次结构转换为可以本地存储或者网络传输的字节流的过程，反序列化则是将字节流还原为将Python对象层次结构。</p><p>数据序列化的功能简单理解为把不能直接存储的数据存储到磁盘中，从而延长对象的生命周期。Python的常用序列化库有两个，即json和pickle。json库和pickle库的主要区别有两点：</p><ul><li>pickle可以序列化Python中所有的数据类型，包括类，函数，一般存储为二进制文件。而json只能序列化Python基本的数据类型，转储结果非常容易阅读。</li><li>pickle只能在Python中使用，而json是能够在不同语言之间交换数据的。</li></ul><p>pickle一般情况下比json慢，尤其是数据量很大的情况下。pickle和json都有四种基础方法：</p><table><thead><tr><th>方法</th><th>作用</th></tr></thead><tbody><tr><td>dump</td><td>序列化写入文件</td></tr><tr><td>load</td><td>读取文件反序列化</td></tr><tr><td>dumps</td><td>序列化返回对象</td></tr><tr><td>loads</td><td>反序列化对象</td></tr></tbody></table><h2 id="_1-pickle使用" tabindex="-1"><a class="header-anchor" href="#_1-pickle使用" aria-hidden="true">#</a> 1 pickle使用</h2><p>pickle.dump()函数用于将python结构序列化，并存为二进制文件。 pickle.dump函数接受三个参数，其中第一个参数包含要存储在文件中的对象，第二个参数给出以二进制模式写入所需文件时获得的文件对象。第三个参数表示序列化协议。</p>',8),k={href:"https://python.readthedocs.io/en/stable/library/pickle.html",target:"_blank",rel:"noopener noreferrer"},d=p(`<ul><li>协议版本0是原始的“人类可读”协议，与Python的早期版本向后兼容。</li><li>协议版本1是一种旧的二进制格式，也与Python的早期版本兼容。</li><li>协议版本2于Python2.3引入，提供了更为有效的序列化方式。</li><li>协议版本3于Python3.0引入。它明确支持bytes对象，这也是Python的默认协议，也是需要与其他Python3版本兼容时的推荐协议。</li><li>协议版本4于Python3.4引入。它增加了对超大对象的支持，对更多类型的对象进行序列化，并对一些数据格式优化。</li></ul><p>通过0到4可以设置不同的协议，该协议参数默认为None，None表示使用Python版本使用的默认协议。选择-1表示最高协议。此外可以通过常量设置该协议，分别是：</p><ul><li>pickle.HIGHEST_PROTOCOL：表示最高协议。</li><li>pickle.DEFAULT_PROTOCOL：表示默认协议。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pickle
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;当前python环境最高序列化协议版本为：{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>pickle<span class="token punctuation">.</span>HIGHEST_PROTOCOL<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;当前python环境默认序列化协议版本为：{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>pickle<span class="token punctuation">.</span>DEFAULT_PROTOCOL<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>当前python环境最高序列化协议版本为：4
当前python环境默认序列化协议版本为：3
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 序列化实例</span>
<span class="token keyword">import</span> pickle
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;data struct&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;number&quot;</span><span class="token punctuation">:</span> <span class="token number">123.456</span><span class="token punctuation">,</span>
    <span class="token string">&quot;tuple&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;first&quot;</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token number">10.01</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">&quot;numpy_data&quot;</span><span class="token punctuation">:</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span>np<span class="token punctuation">.</span>uint8<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 保存到本地，这个文件名包含后缀可以随意命名，反正是二进制文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.bin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 设置最底层协议</span>
    pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token comment"># 查看文件大小</span>
!du <span class="token operator">-</span>h data<span class="token punctuation">.</span><span class="token builtin">bin</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;---分界线---&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 查看文件前十行，发现有可读文字</span>
!cat data<span class="token punctuation">.</span><span class="token builtin">bin</span> <span class="token operator">|</span> head <span class="token operator">-</span>n <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4.0K	data.bin
---分界线---
(dp0
Vname
p1
Vdata struct
p2
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 保存到本地，这个文件名包含后缀可以随意命名，反正是二进制文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.bin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 设置最底层协议</span>
    pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># 查看文件大小</span>
!du <span class="token operator">-</span>h data<span class="token punctuation">.</span><span class="token builtin">bin</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;---分界线---&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 查看文件前2行</span>
!cat data<span class="token punctuation">.</span><span class="token builtin">bin</span> <span class="token operator">|</span> head <span class="token operator">-</span>n <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4.0K	data.bin
---分界线---
}q (X   nameqX\v   data structqX   numberqG@^�/��wX   tupleq(X   firstqI00
G@$�Q�tqX
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 保存到本地，这个文件名包含后缀可以随意命名，反正是二进制文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.bin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 设置默认协议</span>
    pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> pickle<span class="token punctuation">.</span>DEFAULT_PROTOCOL<span class="token punctuation">)</span>

<span class="token comment"># 查看文件大小</span>
!du <span class="token operator">-</span>h data<span class="token punctuation">.</span><span class="token builtin">bin</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;---分界线---&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 查看文件前2行</span>
!cat data<span class="token punctuation">.</span><span class="token builtin">bin</span> <span class="token operator">|</span> head <span class="token operator">-</span>n <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4.0K	data.bin
---分界线---
�}q (X   nameqX\v   data structqX   numberqG@^�/��wX   tupleqX   firstq�G@$�Q녇qX
   numpy_dataq\x07cnumpy.core.multiarray
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 保存到本地，这个文件名包含后缀可以随意命名，反正是二进制文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.bin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 设置默认协议</span>
    pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>

<span class="token comment"># 查看文件大小</span>
!du <span class="token operator">-</span>h data<span class="token punctuation">.</span><span class="token builtin">bin</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;---分界线---&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 查看文件前2行</span>
!cat data<span class="token punctuation">.</span><span class="token builtin">bin</span> <span class="token operator">|</span> head <span class="token operator">-</span>n <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4.0K	data.bin
---分界线---
��/      }�(�name��\vdata struct��number�G@^�/��w�tuple��first��G@$�Q녇��
numpy_data��numpy.core.multiarray��\f_reconstruct����numpy��\x07ndarray���K ��Cb���R�(KK	K	��h\v�dtype����u1�����R�(K�|�NNNJ����J����K t�b�CQ�t�bu.
</code></pre><p>如果想反序列化，重新读入文件，直接用pickle.load函数就行了。序列化协议是自动检测的，不需要指定。此外还有两个参数encoding和errors告诉pickle如何反序列低于当前python版本的序列化文件，默认值就行了。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pickle

<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.bin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    data <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;class &#39;dict&#39;&gt;
data struct
dict_keys([&#39;name&#39;, &#39;number&#39;, &#39;tuple&#39;, &#39;numpy_data&#39;])
</code></pre><p>通过dumps函数将对象的序列化表示作为bytes对象返回，而不是将其写入文件。通过loads函数则将bytes对象反序列化。注意bytes是 Python3新增的类型，bytes只负责以二进制形式来存储数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>

<span class="token comment"># 序列化，返回bytes对象</span>
dumped <span class="token operator">=</span> pickle<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dumped<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>dumped<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>dumped<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 反序列化</span>
loaded <span class="token operator">=</span> pickle<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>dumped<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loaded<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>b&#39;\\x80\\x03]q\\x00(K\\x01K\\x02K\\x03e.&#39;
&lt;class &#39;bytes&#39;&gt;
14
[1, 2, 3]
</code></pre><p>序列化和反序列化的过程可以通过__getstate__ 和__setstate__函数来影响。其中__getstate__函数在序列化时调用，__setstate__函数在反序列化时调用。</p><p>一个实例如下，在序列化时指定序列化某些参数，反序列化时恢复参数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pickle

<span class="token keyword">class</span> <span class="token class-name">MyData</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">:</span>

        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> self<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>x<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">sqrt</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> x<span class="token operator">**</span>x

    <span class="token keyword">def</span> <span class="token function">__getstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&quot;ok&quot;</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;enter getstate&quot;</span><span class="token punctuation">)</span>
        <span class="token comment">#  self.__dict__存储关于self.xxx的一些东西</span>
        odict <span class="token operator">=</span> self<span class="token punctuation">.</span>__dict__<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">del</span> odict<span class="token punctuation">[</span><span class="token string">&#39;y&#39;</span><span class="token punctuation">]</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>odict<span class="token punctuation">)</span>
        <span class="token keyword">return</span> odict

    <span class="token keyword">def</span> <span class="token function">__setstate__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;enter setstate&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">[</span><span class="token string">&#39;x&#39;</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> self<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>self<span class="token punctuation">.</span>x<span class="token punctuation">)</span>

obj <span class="token operator">=</span> MyData<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment"># 序列化</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;序列化&quot;</span><span class="token punctuation">)</span>
dumped <span class="token operator">=</span> pickle<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token comment"># 反序列化</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;反序列化&quot;</span><span class="token punctuation">)</span>
loaded <span class="token operator">=</span> pickle<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>dumped<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;反序列化结果&quot;</span><span class="token punctuation">,</span> loaded<span class="token punctuation">.</span>y<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>序列化
enter getstate
{&#39;x&#39;: 3, &#39;state&#39;: &#39;ok&#39;}
反序列化
enter setstate
{&#39;x&#39;: 3, &#39;state&#39;: &#39;ok&#39;}
反序列化结果 27
</code></pre><h2 id="_2-pickle加速" tabindex="-1"><a class="header-anchor" href="#_2-pickle加速" aria-hidden="true">#</a> 2 pickle加速</h2><p>当要序列化的对象特别大时，pickle加载和保存序列化对象会成为代码的性能瓶颈。一般有三种办法加速pickle序列化过程。主要有：</p><ul><li>使用更高的协议版本</li><li>使用cPickle代替pickle</li><li>禁用垃圾收集器</li></ul><p>下面几个例子会给出使用方法，不过加速效果不明显，因为数据量不大，写个代码mark下。</p><p><strong>直接使用pickle</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> pickle
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> os 
<span class="token keyword">def</span> <span class="token function">time_count</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{}用时:{}秒&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span>end<span class="token operator">-</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_dump</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_load</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        data <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
    <span class="token keyword">return</span> data

data <span class="token operator">=</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;file.dat&quot;</span>
pickle_dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span>
pickle_load<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>pickle_dump用时:1.7647628784179688秒
pickle_load用时:1.7913622856140137秒
</code></pre><p><strong>使用pickle最高协议</strong></p><p>将参数协议指定为-1，即可，但是加速可能效果不明显。具体看数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> pickle
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> os

<span class="token keyword">def</span> <span class="token function">time_count</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{}用时:{}秒&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span>end<span class="token operator">-</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_dump</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment"># 使用最高版本协议</span>
        pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_load</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        data <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
    <span class="token keyword">return</span> data

data <span class="token operator">=</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;file.dat&quot;</span>
pickle_dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span>
pickle_load<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>pickle_dump用时:1.731525182723999秒
pickle_load用时:1.7664134502410889秒
</code></pre><p><strong>用cPickle代替pickle</strong></p><p>最简单方式是使用cPickle而不是pickle。cPickle与pickle是完全相同的模块，具有相同的功能、相同的参数。唯一区别是cPickle用C语言编写的，这使cPickle速度更快。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token comment"># python3 导入cPickle方式</span>
<span class="token keyword">import</span> _pickle <span class="token keyword">as</span> cPickle
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> os

<span class="token keyword">def</span> <span class="token function">time_count</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{}用时:{}秒&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span>end<span class="token operator">-</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_dump</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment"># 使用最高版本协议</span>
        cPickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_load</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        data <span class="token operator">=</span> cPickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
    <span class="token keyword">return</span> data

data <span class="token operator">=</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;file.dat&quot;</span>
pickle_dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span>
pickle_load<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>pickle_dump用时:1.7443737983703613秒
pickle_load用时:1.7894999980926514秒
</code></pre><p><strong>禁用垃圾回收</strong></p><p>垃圾收集器会减慢处理速度，禁用它可以提高性能。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> pickle
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> os
<span class="token keyword">import</span> gc

<span class="token comment"># 禁用垃圾回收</span>
gc<span class="token punctuation">.</span>disable<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">time_count</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{}用时:{}秒&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span>end<span class="token operator">-</span>start<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_dump</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment"># 使用最高版本协议</span>
        pickle<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@time_count</span>
<span class="token keyword">def</span> <span class="token function">pickle_load</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        data <span class="token operator">=</span> pickle<span class="token punctuation">.</span>load<span class="token punctuation">(</span>f<span class="token punctuation">)</span>
    <span class="token keyword">return</span> data

data <span class="token operator">=</span> np<span class="token punctuation">.</span>ones<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;file.dat&quot;</span>
pickle_dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span>filepath<span class="token punctuation">)</span>
pickle_load<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
os<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

<span class="token comment"># 开启垃圾回收</span>
gc<span class="token punctuation">.</span>enable<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>pickle_dump用时:1.8271889686584473秒
pickle_load用时:1.7800366878509521秒
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,44),r={href:"https://www.tutorialandexample.com/python-pickle",target:"_blank",rel:"noopener noreferrer"},v={href:"https://zetcode.com/python/pickle/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://vmartin.fr/how-to-make-pickle-faster.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://python.readthedocs.io/en/stable/library/pickle.html",target:"_blank",rel:"noopener noreferrer"};function y(h,f){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("对于pickle的协议选取，目前有5种不同的协议可用(出自"),n("a",k,[s("Python object serialization"),t(a)]),s(")。使用的协议越高，读取生成的pickle所需的Python版本越新。这些协议包括：")]),d,n("ul",null,[n("li",null,[n("a",r,[s("Python Pickle"),t(a)])]),n("li",null,[n("a",v,[s("Python pickle"),t(a)])]),n("li",null,[n("a",m,[s("How to make pickle faster?"),t(a)])]),n("li",null,[n("a",b,[s("Python object serialization"),t(a)])])])])}const g=e(l,[["render",y],["__file","2022-07-07-_python_ ​Python数据序列化模块pickle使用笔记.html.vue"]]);export{g as default};
