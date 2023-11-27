import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as i,c as d,a as n,b as l,d as t,e as o}from"./app-MsA2k2kn.js";const p={},r=o(`<h1 id="编程基础-python模块和包使用笔记" tabindex="-1"><a class="header-anchor" href="#编程基础-python模块和包使用笔记" aria-hidden="true">#</a> [编程基础] Python模块和包使用笔记</h1><p>本文探讨Python模块和Python包，这两种机制有助于模块化编程。 模块化编程是指将大型笨拙的编程任务分解为单独的，较小的，更易于管理的子任务或模块的过程。然后可以像构建模块一样将各个模块拼凑在一起以创建更大的应用程序。</p><p>在大型应用程序中模块化代码有几个优点：</p><ul><li>简单性：模块通常只关注问题的一个相对较小的部分，而不是关注手头的整个问题。如果你是在一个模块上工作，你将有一个更小的问题域来解决。这使得开发更容易，也不容易出错。</li><li>可维护性：模块通常经过设计，以便它们在不同问题域之间建立逻辑边界。如果以最小化相互依赖性的方式编写模块，则对单个模块的修改将对程序的其他部分产生影响的可能性降低。（您甚至可以在不了解模块外部应用程序的情况下，对模块进行更改。）这使得由许多程序员组成的团队在大型应用程序上协同工作更加可行。</li><li>可重用性：在单个模块中定义的功能可以很容易地被应用程序的其他部分重用（通过适当定义的接口）。这样就不需要重复代码了。</li><li>作用域：模块通常定义一个单独的名称空间，这有助于避免程序不同区域中的标识符之间发生冲突。</li></ul><p>函数，模块和包都是Python中促进代码模块化的构造。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-python模块概述" tabindex="-1"><a class="header-anchor" href="#_1-python模块概述" aria-hidden="true">#</a> 1 Python模块概述</h2><p>实际上，在Python中定义模块的方式有三种：</p><ol><li>可以使用Python本身编写模块。</li><li>可以使用C语言编写模块，并在运行时动态加载该模块，例如re（正则表达式）模块。</li><li>内置模块本质上包含在解释器中，就像itertools模块一样。</li></ol><p>在所有三种情况下，都以相同的方式访问模块的内容：使用import语句。在这里，重点将主要放在用Python编写的模块上。用Python编写的模块的妙处在于它们的构建极其简单。您需要做的就是创建一个包含合法Python代码的文件，然后为该文件命名并带有.py扩展名。</p><p>例如，假设有一个mod.py文件包含以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>s = &quot;Hello world!&quot;
a = [100, 200, 300]

def foo(arg):
    print(f&#39;arg = {arg}&#39;)

class Foo:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在mod.py中定义了以下几个对象：</p><ul><li>s （字符串）</li><li>a （列表）</li><li>foo() （函数）</li><li>Foo （类）</li></ul><p>假设mod.py位于适当的位置，稍后您将了解更多信息，可以通过以下方式导入模块来访问这些对象：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mod
<span class="token keyword">print</span><span class="token punctuation">(</span>mod<span class="token punctuation">.</span>s<span class="token punctuation">)</span>
mod<span class="token punctuation">.</span>a
mod<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;quux&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;corge&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;grault&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
arg <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;quux&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;corge&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;grault&#39;</span><span class="token punctuation">]</span>
x <span class="token operator">=</span> mod<span class="token punctuation">.</span>Foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Hello world!
arg = [&#39;quux&#39;, &#39;corge&#39;, &#39;grault&#39;]





[100, 200, 300]
</code></pre><h2 id="_2-使用说明" tabindex="-1"><a class="header-anchor" href="#_2-使用说明" aria-hidden="true">#</a> 2 使用说明</h2><h3 id="_2-1-模块搜索路径" tabindex="-1"><a class="header-anchor" href="#_2-1-模块搜索路径" aria-hidden="true">#</a> 2.1 模块搜索路径</h3><p>继续上面的示例，让我们看一下Python执行该语句时发生的情况：</p><blockquote><p>import mod</p></blockquote><p>当解释器执行上面的import语句时，它会在一个目录列表中搜索mod.py，这些目录由以下来源组成:</p><ul><li>运行输入脚本的目录或当前目录（如果解释器正在交互运行）</li><li>PYTHONPATH环境变量（如果已设置）中包含的目录列表。（其格式PYTHONPATH取决于操作系统，但应模仿PATH环境变量。）</li><li>安装Python时配置的与安装有关的目录列表</li></ul><p>结果搜索路径可在Python变量中访问，该变量sys.path从名为的模块获取sys：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> sys
sys<span class="token punctuation">.</span>path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;/home/aistudio&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python37.zip&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/lib-dynload&#39;,
 &#39;&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/IPython/extensions&#39;,
 &#39;/home/aistudio/.ipython&#39;]
</code></pre><p>的确切内容sys.path取决于安装。几乎可以肯定，上述内容在您的计算机上看起来会稍有不同。因此，为了确保找到您的模块，您需要执行以下操作之一：</p><ul><li>如果交互的话，将mod.py放在输入脚本所在的目录或当前目录中</li><li>在启动解释器之前，修改PYTHONPATH环境变量以包含其所在的目录mod.py</li><li>将mod.py放在已经包含在PYTHONPATH变量中的一个目录中</li><li>放入mod.py一个取决于安装的目录，您可能会或可能不会具有写访问权，具体取决于操作系统</li></ul><p>实际上，还有一个附加选项：您可以将模块文件放在您选择的任何目录中，然后sys.path在运行时进行修改，使其包含该目录。例如，在这种情况下，您可以放入目录./data，然后输入以下语句：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">r&#39;./data&#39;</span><span class="token punctuation">)</span>
sys<span class="token punctuation">.</span>path
<span class="token keyword">import</span> mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;/home/aistudio&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python37.zip&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/lib-dynload&#39;,
 &#39;&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages&#39;,
 &#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/IPython/extensions&#39;,
 &#39;/home/aistudio/.ipython&#39;,
 &#39;./data&#39;]
</code></pre><p>导入模块后，您可以使用模块的__file__属性确定找到模块的位置：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mod
mod<span class="token punctuation">.</span>__file__

<span class="token keyword">import</span> re
re<span class="token punctuation">.</span>__file__
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;/home/aistudio/mod.py&#39;






&#39;/opt/conda/envs/python35-paddle120-env/lib/python3.7/re.py&#39;
</code></pre><h3 id="_2-2-import声明" tabindex="-1"><a class="header-anchor" href="#_2-2-import声明" aria-hidden="true">#</a> 2.2 import声明</h3><p>import语句可将模块内容提供给调用方。该import语句采用许多不同的形式，如下所示。</p><p><strong>import &lt;module_name&gt;</strong></p><p>最简单的形式是上面已经显示的形式。请注意，这不会使调用者可以直接访问模块内容。每个模块都有其自己的专用符号表，该符号表用作模块中定义的所有对象的全局符号表。因此，模块已经创建了一个单独的名称空间。该语句import &lt;module_name&gt;仅放置&lt;module_name&gt;在调用者的符号表中。模块中定义的对象保留在模块的专用符号表中。该段话的意思就是你调用的模块变量和本地变量不冲突。</p><p>从调用方来看，只有通过点表示法以&lt;module_name&gt;作为前缀，才能访问模块中的对象，如下所示。在下面的import语句之后，mod被放置到本地符号表中。因此，mod在调用方的本地上下文中有意义:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mod
mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;module &#39;mod&#39; from &#39;/home/aistudio/mod.py&#39;&gt;
</code></pre><p>但是s并且foo保留在模块的专用符号表中，并且在本地上下文中没有意义：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>s
foo<span class="token punctuation">(</span><span class="token string">&#39;quux&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>---------------------------------------------------------------------------

NameError                                 Traceback (most recent call last)

&lt;ipython-input-7-25b38fc580f1&gt; in &lt;module&gt;
----&gt; 1 s
      2 foo(&#39;quux&#39;)


NameError: name &#39;s&#39; is not defined
</code></pre><p>要在本地上下文中访问，模块中定义的对象名称必须加上mod前缀:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>mod<span class="token punctuation">.</span>s
mod<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token string">&#39;quux&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Hello world!&#39;



arg = quux
</code></pre><p>此外，在一个import语句中可以指定几个逗号分隔的模块:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import &lt;module_name&gt;[, &lt;module_name&gt; ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>from &lt;module_name&gt; import &lt;name(s)&gt;</strong></p><p>import语句的另一种形式允许模块中的单个对象直接导入到调用者的符号表中:</p><blockquote><p>from &lt;module_name&gt; import &lt;name(s)&gt;</p></blockquote><p>执行完以上语句后，&lt;name(s)&gt;可以在调用者的环境中引用而无需添加&lt;module_name&gt;前缀：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> mod <span class="token keyword">import</span> s<span class="token punctuation">,</span> foo<span class="token punctuation">,</span>Foo
s
foo<span class="token punctuation">(</span><span class="token string">&#39;quux&#39;</span><span class="token punctuation">)</span>
x <span class="token operator">=</span> Foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Hello world!&#39;



arg = quux





&lt;mod.Foo at 0x7f829d754350&gt;
</code></pre><p>因为这种形式的导入将对象名称直接放入调用者的符号表中，所以任何已经存在的同名对象都将被覆盖，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;baz&#39;</span><span class="token punctuation">]</span>
a
<span class="token keyword">from</span> mod <span class="token keyword">import</span> a
a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;]






[100, 200, 300]
</code></pre><p>它甚至可以不加选择地从一个模块导入所有内容:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from &lt;module_name&gt; import *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这会将把&lt;module_name&gt;所有对象的名称放入本地符号表，但以下划线（_）字符开头的对象除外。例如：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> mod <span class="token keyword">import</span> <span class="token operator">*</span>
s
a
foo
Foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Hello world!&#39;






[100, 200, 300]






&lt;function mod.foo(arg)&gt;






mod.Foo
</code></pre><p>在大规模生产代码中并不推荐这样做。这有点危险，因为您是在将名称全部输入到本地符号表中。除非您对它们都很了解，并且确信不会发生冲突，否则您很有可能会不小心覆盖现有的名称。但是，当您只是为了测试或发现的目的而随意使用交互式解释器时，这种语法非常方便，因为它可以让您快速访问模块必须提供的所有内容，而无需大量输入。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>**from &lt;module_name&gt; import &lt;name&gt; as &lt;alt_name&gt;**
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以导入单独的对象，但是使用替代名称将它们输入到本地符号表中:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from &lt;module_name&gt; import &lt;name&gt; as &lt;alt_name&gt;[, &lt;name&gt; as &lt;alt_name&gt; …]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就可以将名称直接放置在本地符号表中，但可以避免与以前存在的名称冲突：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>s <span class="token operator">=</span> <span class="token string">&#39;foo&#39;</span>
a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;baz&#39;</span><span class="token punctuation">]</span>
<span class="token keyword">from</span> mod <span class="token keyword">import</span> s <span class="token keyword">as</span> string<span class="token punctuation">,</span> a <span class="token keyword">as</span> alist
s
string
a
alist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;foo&#39;






&#39;Hello world!&#39;






[&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;]






[100, 200, 300]
</code></pre><p><strong>import &lt;module_name&gt; as &lt;alt_name&gt;</strong></p><p>您也可以使用备用名称导入整个模块：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import &lt;module_name&gt; as &lt;alt_name&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mod <span class="token keyword">as</span> my_module
my_module<span class="token punctuation">.</span>a
my_module<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token string">&#39;qux&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[100, 200, 300]



arg = qux
</code></pre><p>可以从函数定义中导入模块内容。在这种情况下，import只有在调用该函数后，才会发生：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> mod <span class="token keyword">import</span> foo
    foo<span class="token punctuation">(</span><span class="token string">&#39;corge&#39;</span><span class="token punctuation">)</span>
bar<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>arg = corge
</code></pre><p>但是，Python 3不允许在函数内任意导入*的语法，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">from</span> mod <span class="token keyword">import</span> <span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>  File &quot;&lt;ipython-input-16-86f331738b46&gt;&quot;, line 4
SyntaxError: import * only allowed at module level
</code></pre><p>最后，一个带有except ImportError子句的try语句可以用来防止不成功的导入尝试:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token comment"># Non-existent module</span>
    <span class="token keyword">import</span> baz
<span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Module not found&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Module not found
</code></pre><h3 id="_2-3-dir-函数" tabindex="-1"><a class="header-anchor" href="#_2-3-dir-函数" aria-hidden="true">#</a> 2.3 dir()函数</h3><p>内置函数dir()返回一个名称空间中定义的名称列表。如果没有参数，它会在当前本地符号表中产生一个按字母顺序排序的名称列表:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token builtin">dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>[&#39;Foo&#39;, &#39;In&#39;, &#39;InteractiveShell&#39;, &#39;Out&#39;, &#39;_&#39;]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>qux <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token builtin">dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;get_ipython&#39;, &#39;mod&#39;, &#39;my_module&#39;, &#39;quit&#39;, &#39;qux&#39;, &#39;re&#39;, &#39;s&#39;, &#39;string&#39;, &#39;sys&#39;]
</code></pre><p>注意dir()上面的第一个调用是如何列出几个自动定义的名称的，这些名称在解释器启动时已经存在于名称空间中。随着新的名称定义（qux），它们出现在的后续，调用dir()。这对于识别由import语句确切添加到名称空间的内容很有用。当给定参数作为模块名称时，dir()列出模块中定义的名称：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mod
<span class="token builtin">dir</span><span class="token punctuation">(</span>mod<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;Foo&#39;,
 &#39;__builtins__&#39;,
 &#39;__cached__&#39;,
 &#39;__doc__&#39;,
 &#39;__file__&#39;,
 &#39;__loader__&#39;,
 &#39;__name__&#39;,
 &#39;__package__&#39;,
 &#39;__spec__&#39;,
 &#39;a&#39;,
 &#39;foo&#39;,
 &#39;s&#39;]
</code></pre><h3 id="_2-4-将模块作为脚本执行" tabindex="-1"><a class="header-anchor" href="#_2-4-将模块作为脚本执行" aria-hidden="true">#</a> 2.4 将模块作为脚本执行</h3><p>任何.py包含模块的文件本质上也是Python 脚本，没有任何理由它不能像一个脚本一样执行。 这里还是mod.py，正如上面定义的那样。比如命令行：</p><blockquote><p>python mod.py</p></blockquote><p>此外在mod.py文件中添加输出内容，如下所示:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>s = &quot;Hello world!&quot;
a = [100, 200, 300]

def foo(arg):
    print(f&#39;arg = {arg}&#39;)

class Foo:
    pass
    
print(s)
print(a)
foo(&#39;quux&#39;)
x = Foo()
print(x)     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在输出如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Hello world!
[100, 200, 300]
arg = quux
&lt;__main__.Foo object at 0x7f1e792b9e50&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不幸的是，现在当作为模块导入时，它还会生成输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import mod
Hello world!
[100, 200, 300]
arg = quux
&lt;mod.Foo object at 0x7f7db3aba310&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能不是您想要的。导入模块时，模块通常不生成输出。如果您可以区分文件是作为模块加载时还是作为独立脚本运行时，这不是很好吗？</p><p>将.py文件导入为模块时，Python 会将特殊的dunder变量设置为模块__name__的名称。但是，如果文件作为独立脚本运行，__name__则（创造性地）设置为string &#39;__main__&#39;。利用这个事实，您可以识别出运行时是哪种情况，并相应地更改mod.py为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>s = &quot;Hello world!&quot;
a = [100, 200, 300]

def foo(arg):
    print(f&#39;arg = {arg}&#39;)

class Foo:
    pass

if (__name__ == &#39;__main__&#39;):
    print(&#39;Executing as standalone script&#39;)
    print(s)
    print(a)
    foo(&#39;quux&#39;)
    x = Foo()
    print(x)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-重新加载模块" tabindex="-1"><a class="header-anchor" href="#_2-5-重新加载模块" aria-hidden="true">#</a> 2.5 重新加载模块</h3><p>为了提高效率，每个解释器会话仅加载一次模块。对于函数和类定义来说，这很好，它们通常占模块内容的大部分。但是一个模块也可以包含可执行语句，通常用于初始化。请注意，这些语句仅在第一次导入模块时执行。</p><p>考虑以下文件mod.py：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a = [100, 200, 300]
print(&#39;a =&#39;, a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用mod模块会以下结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; import mod
a = [100, 200, 300]
&gt;&gt;&gt; import mod
&gt;&gt;&gt; import mod

&gt;&gt;&gt; mod.a
[100, 200, 300]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该print()语句不会在后续导入上执行。（就此而言，赋值语句也不是，而是作为mod.ashows 值的最终显示，这无关紧要。完成赋值后，它会保留下来。）如果对模块进行了更改并需要重新加载，则需要重新启动解释器或使用reload()从module 调用的函数importlib：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; import mod
a = [100, 200, 300]

&gt;&gt;&gt; import mod

&gt;&gt;&gt; import importlib
&gt;&gt;&gt; importlib.reload(mod)
a = [100, 200, 300]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-python包" tabindex="-1"><a class="header-anchor" href="#_3-python包" aria-hidden="true">#</a> 3 Python包</h2><h3 id="_3-1-python包的使用" tabindex="-1"><a class="header-anchor" href="#_3-1-python包的使用" aria-hidden="true">#</a> 3.1 Python包的使用</h3><p>假设您开发了一个非常大的应用程序，其中包含许多模块。随着模块数量的增加，如果将它们倾倒到一个位置，则很难跟踪所有模块。如果它们具有相似的名称或功能，则尤其如此。您可能希望有一种分组和组织的方法。 包允许使用点表示法对模块名称空间进行分层结构。就像模块帮助避免全局变量名之间的冲突一样，包帮助避免模块名之间的冲突。</p><p>创建软件包非常简单，因为它利用了操作系统固有的分层文件结构。考虑以下结构目录安排：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- work
  - mod1.py
  - mod2.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod1.py：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def foo():
    print(&#39;[mod1] foo()&#39;)

class Foo:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod2.py:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def bar():
    print(&#39;[mod2] bar()&#39;)

class Bar:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于这种结构，如果mod1.py和mod2.py为workd文件夹下，你可以使用点符号引用这两个模块(work.mod1, work.mod2)，并使用你已经熟悉的语法导入它们:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import &lt;module_name&gt;[, &lt;module_name&gt; ...]
from &lt;module_name&gt; import &lt;name(s)&gt;
from &lt;module_name&gt; import &lt;name&gt; as &lt;alt_name&gt;
from &lt;package_name&gt; import &lt;modules_name&gt;[, &lt;module_name&gt; ...]
from &lt;package_name&gt; import &lt;module_name&gt; as &lt;alt_name&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> work<span class="token punctuation">.</span>mod1<span class="token punctuation">,</span> work<span class="token punctuation">.</span>mod2
work<span class="token punctuation">.</span>mod1<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
x <span class="token operator">=</span> work<span class="token punctuation">.</span>mod2<span class="token punctuation">.</span>Bar<span class="token punctuation">(</span><span class="token punctuation">)</span>
x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[mod1] foo()





&lt;work.mod2.Bar at 0x7f5944642c10&gt;
</code></pre><p>也可以直接导入包</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> work
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但这没有用。尽管严格来说，这是语法上正确的Python语句，但它并没有做任何有用的事情。特别是，它不会将work任何模块放入本地名称空间中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; import work
&gt;&gt;&gt; work.mod1
Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;
AttributeError: module &#39;work&#39; has no attribute &#39;mod1&#39;
&gt;&gt;&gt; work.mod2
Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;
AttributeError: module &#39;work&#39; has no attribute &#39;mod2&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要实际导入模块或其内容，您需要使用上面显示的形式之一。</p><h3 id="_3-2-包初始化" tabindex="-1"><a class="header-anchor" href="#_3-2-包初始化" aria-hidden="true">#</a> 3.2 包初始化</h3><p>如果包目录中存在一个名为__init__.py的文件，则在导入包或包中的模块时将调用该文件。这可用于执行程序包初始化代码，例如程序包级数据的初始化。 例如，考虑以下__init__.py文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>print(f&#39;Invoking __init__.py for {__name__}&#39;)
A = [&#39;quux&#39;, &#39;corge&#39;, &#39;grault&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们从上面的例子将这个文件添加到work目录:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- work
  - __init__.py
  - mod1.py
  - mod2.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当导入包时，将A初始化全局列表：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> work
work<span class="token punctuation">.</span>A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Invoking __init__.py for work





[&#39;quux&#39;, &#39;corge&#39;, &#39;grault&#39;]
</code></pre><p>包中的模块可以通过依次导入全局变量来访问全局变量，让我们修改mod1.py</p><p>mod1.py</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def foo():
    from work import A
    print(&#39;[mod1] foo() / A = &#39;, A)

class Foo:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> work <span class="token keyword">import</span> mod1
mod1<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[mod1] foo()
</code></pre><p>__init__.py也可以用于从软件包中自动导入模块。例如，在前面您已经看到，该语句import work仅将名称work放置在调用者的本地符号表中，而不会导入任何模块。但是，如果__init__.py在work目录中包含以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>print(f&#39;Invoking __init__.py for {__name__}&#39;)
import work.mod1, work.mod2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>模块mod1和mod2会自动导入</p><h3 id="_3-3-从包中导入" tabindex="-1"><a class="header-anchor" href="#_3-3-从包中导入" aria-hidden="true">#</a> 3.3 从包中导入</h3><p>出于以下讨论的目的，先前定义的程序包已扩展为包含一些其他模块：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- work
  - mod1.py
  - mod2.py
  - mod3.py
  - mod4.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，work目录中定义了四个模块。它们的内容如下所示：</p><p>mod1.py</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def foo():
    print(&#39;[mod1] foo()&#39;)

class Foo:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod2.py</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def bar():
    print(&#39;[mod2] bar()&#39;)

class Bar:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod3.py</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def baz():
    print(&#39;[mod3] baz()&#39;)

class Baz:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod4.py</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def qux():
    print(&#39;[mod4] qux()&#39;)

class Qux:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您已经看到，当import *用于模块时，模块中的所有对象都将导入到本地符号表中，除了那些名称以下划线开头的对象外，与往常一样。ython遵循以下约定：如果package目录中的__init__.py文件包含名为__all__的列表，则这个列表中视为要导入的模块。</p><p>对于本示例，假设您在work录中创建一个__init__.py：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__all__ = [
        &#39;mod1&#39;,
        &#39;mod2&#39;,
        &#39;mod3&#39;,
        &#39;mod4&#39;
        ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将会在from work import *自动导入所有四个模块</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> work <span class="token keyword">import</span> <span class="token operator">*</span>
mod1
mod2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;module &#39;work.mod2&#39; from &#39;/home/aistudio/work/mod2.py&#39;&gt;
</code></pre><p>顺便说一句，__all__也可以在模块中定义它，并且具有相同的目的：控制使用导入的内容import *。例如，修改mod1.py如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>__all__ = [&#39;foo&#39;]

def foo():
    print(&#39;[mod1] foo()&#39;)

class Foo:
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>from work.mod1 import *只会导入__all__中的内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from work.mod1 import *
&gt;&gt;&gt; foo()
[mod1] foo()
&gt;&gt;&gt; Foo
Traceback (most recent call last):
  File &quot;&lt;pyshell#37&gt;&quot;, line 1, in &lt;module&gt;
    Foo
NameError: name &#39;Foo&#39; is not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，包和模块__all__都使用它来控制在指定时导入的内容。但是默认行为不同：import *</p><ul><li>对于包，当__all__未定义时，import *不会导入任何内容。</li><li>对于__all__未定义的模块，将import *导入所有内容（除非您猜对了，否则名称会以下划线开头）</li></ul><h3 id="_3-4-子包" tabindex="-1"><a class="header-anchor" href="#_3-4-子包" aria-hidden="true">#</a> 3.4 子包</h3><p>程序包可以包含嵌套子程序包到任意深度。例如，让我们对示例包目录进行如下修改：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- work
  - subpackage1
    - mod1.py
    - mod2.py
  - subpackage2
    - mod3.py
    - mod4.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mod1等四个模块如先前定义，但引入两个子包。导入仍然与之前显示的相同。语法类似，但是使用其他点号将包名与子包名分开：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> work<span class="token punctuation">.</span>subpackage1<span class="token punctuation">.</span>mod1
work<span class="token punctuation">.</span>subpackage1<span class="token punctuation">.</span>mod1<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">from</span> work<span class="token punctuation">.</span>subpackage1 <span class="token keyword">import</span> mod2
mod2<span class="token punctuation">.</span>bar<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">from</span> work<span class="token punctuation">.</span>subpackage2<span class="token punctuation">.</span>mod3 <span class="token keyword">import</span> baz
baz<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">from</span> work<span class="token punctuation">.</span>subpackage2<span class="token punctuation">.</span>mod4 <span class="token keyword">import</span> qux <span class="token keyword">as</span> grault
grault<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[mod1] foo()
[mod2] bar()
[mod1] foo()
[mod3] baz()
[mod4] qux()
</code></pre><p>此外，一个子包中的模块可以引用同级子包中的对象(如果同级包中包含您需要的某些功能)。例如，假设您希望从模块mod3中导入和执行函数foo()(在模块mod1中定义)。你可以使用绝对导入:</p><p>work/subpackage2/mod3.py中的内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def baz():
    print(&#39;[mod3] baz()&#39;)

class Baz:
    pass

from work.subpackage1.mod1 import foo
foo()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> work<span class="token punctuation">.</span>subpackage2 <span class="token keyword">import</span> mod3
mod3<span class="token punctuation">.</span>foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[mod1] foo()
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,183),c={href:"https://realpython.com/python-modules-packages/",target:"_blank",rel:"noopener noreferrer"};function u(m,v){const e=s("ExternalLinkIcon");return i(),d("div",null,[r,n("p",null,[n("a",c,[l("https://realpython.com/python-modules-packages/"),t(e)])])])}const k=a(p,[["render",u],["__file","2020-08-01-_编程基础_ Python模块和包使用笔记.html.vue"]]);export{k as default};
