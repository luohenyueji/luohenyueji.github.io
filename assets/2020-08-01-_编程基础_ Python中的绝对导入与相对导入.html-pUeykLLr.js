import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as t,c as r,a as e,b as n,d as i,e as s}from"./app-MsA2k2kn.js";const o={},p=s(`<h1 id="编程基础-python中的绝对导入与相对导入" tabindex="-1"><a class="header-anchor" href="#编程基础-python中的绝对导入与相对导入" aria-hidden="true">#</a> [编程基础] Python中的绝对导入与相对导入</h1><p>如果您从事的Python项目有多个文件，那么您以前可能不得不使用import语句。即使对于拥有多个项目的Python重度使用者（比如我），import也可能会造成混淆！您可能正在阅读本文，因为您想对Python中的import（尤其是绝对导入和相对导入）有更深入的了解。</p><p>在本教程中，您将学习两者之间的区别以及它们的优缺点。让我们潜入吧！</p><h2 id="_1-imports快速介绍" tabindex="-1"><a class="header-anchor" href="#_1-imports快速介绍" aria-hidden="true">#</a> 1 Imports快速介绍</h2><p>Python模块是具有.py扩展名的文件，而Python包是其中具有模块的任何文件夹（或者在Python 2中是包含__init__.py文件的文件夹）。当一个模块中的代码需要访问另一模块或程序包中的代码时，你需要导入它。</p><p>但是如何一个模块，假设您像这样导入os模块：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import os
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Python要做的第一件事是在 sys.modules中查找名为os系统模块. 这是以前导入的所有模块的缓存。sys模块提供了一系列关于Python运行环境的变量和函数。如果在模块缓存中找不到该名称，Python将继续搜索内置模块的列表。这些模块与Python一起预装，可以在Python标准库中找到。如果在内置模块中仍然找不到该名称，Python就会在sys.path定义的目录列表中搜索它。该列表通常包括当前目录，首先搜索该目录。</p><p>总结来说，Python寻找一个模块主要有以下三个步骤：</p><ul><li>1 通过sys.modules从已经加载的模块中寻找</li><li>2 从Python标准库中寻找，Python标注库就是那些通过pip install安装来的模块</li><li>3 通过sys.path包含的目录列表寻找，sys.path通常会自动导入当前目录，当然sys.path也可以添加自己指定的路径</li></ul><p>当Python找到该模块时，它将其绑定到本地范围内的一个名称。这意味着现在已经定义了os，并且可以在当前文件中使用os，而不会抛出ModuleNotFoundError。如果没找到模块就抛出ModuleNotFoundError，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是要注意的另外一个问题是，导入模块，会出现安全问题。请注意，Python的导入系统存在一些重大的安全风险。这主要是由于其灵活性。例如，模块缓存是可写的，并且可以使用导入系统覆盖Python的核心功能。从第三方程序包导入还会使您的应用程序面临安全威胁。</p><h2 id="_2-import语句的语法" tabindex="-1"><a class="header-anchor" href="#_2-import语句的语法" aria-hidden="true">#</a> 2 import语句的语法</h2><p>现在您知道了导入语句的工作原理，让我们探究它们的语法。您可以导入软件包和模块。（请注意，导入软件包实际上是将软件包的__init__.py文件作为模块导入。）您还可以从软件包或模块中导入特定的对象。</p><p>通常有两种类型的导入语法。直接使用模块时，可以直接导入模块，如下所示：</p><h3 id="_2-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_2-1-基本使用" aria-hidden="true">#</a> 2.1 基本使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>os可以是包或模块。当您使用第二种语法时，您将从另一个包或模块中导入。下面是是一个实例</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> os <span class="token keyword">import</span> path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>path可以是模块，子包或对象，例如类或函数。您还可以选择重命名导入的资源，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os <span class="token keyword">as</span> so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将把导入的os重命名为so。现在必须将其引用为so，否则将无法识别它。</p><h3 id="_2-2-导入声明的样式" tabindex="-1"><a class="header-anchor" href="#_2-2-导入声明的样式" aria-hidden="true">#</a> 2.2 导入声明的样式</h3>`,24),c={href:"https://pep8.org/#imports",target:"_blank",rel:"noopener noreferrer"},u=s(`<ol><li>导入应始终写在文件顶部，在任何模块注释和文档字符串之后。</li><li>import应该根据用途分为以下三类： <ul><li>标准库导入（Python的内置模块）</li><li>相关的第三方导入（已安装但不属于当前应用程序的模块）</li><li>本地应用程序导入（属于当前应用程序的模块）</li></ul></li><li>每个import都要用空格分隔</li></ol><p>在每个导入组中按字母顺序排列导入也是一个好主意。这使得查找特定导入变得更加容易，特别是当一个文件中有许多导入时。以下是如何设置导入语句样式的示例。以下的import语句分为三个不同的组，用空格隔开。在每个组中，它们也按字母顺序排列。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token triple-quoted-string string">&#39;&#39;&#39;
    格式化的import如下所示
&#39;&#39;&#39;</span>
<span class="token comment"># 标准库</span>
<span class="token keyword">import</span> datetime
<span class="token keyword">import</span> os

<span class="token comment"># 第三方库</span>
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask

<span class="token comment"># 本地库</span>
<span class="token comment"># import local_module</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-绝对import和相对import" tabindex="-1"><a class="header-anchor" href="#_3-绝对import和相对import" aria-hidden="true">#</a> 3 绝对import和相对import</h2><h3 id="_3-1-绝对import" tabindex="-1"><a class="header-anchor" href="#_3-1-绝对import" aria-hidden="true">#</a> 3.1 绝对import</h3><p>您已经掌握了如何编写import语句以及如何像专业人士那样设计它们的样式。现在是时候学习一点关于绝对导入的知识了。绝对导入指定要导入的资源使用其从项目根文件夹中的完整路径。</p><p>假设您具有以下目录结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>└── project
    ├── package1
    │   ├── module1.py
    │   └── module2.py
    └── package2
        ├── __init__.py
        ├── module3.py
        ├── module4.py
        └── subpackage1
            └── module5.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当前目录project其中包含两个子目录package1和package2。该package1目录有两个文件，module1.py和module2.py。</p><p>该package2目录包含三个文件：两个模块module3.py和module4.py，以及一个初始化文件__init__.py。它还包含一个目录，subpackage该目录又包含一个文件module5.py。</p><p>让我们假设以下内容：</p><ul><li>package1/module2.py包含一个函数function1。</li><li>package2/__init__.py包含一个类class1。</li><li>package2/subpackage1/module5.py包含一个函数function2。</li></ul><p>以下是绝对导入的实际示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from package1 import module1
from package1.module2 import function1
from package2 import class1
from package2.subpackage1.module5 import function2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>module2中的内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def function1():
    passs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>package2中__init__.py中的内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class class1():
    def __init__():
        return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package2.subpackage1.module5中的内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>def function2():
    pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，必须为每个包或文件提供来自顶级包文件夹的详细路径。这有点类似于它的文件路径，但是我们使用点(.)而不是斜杠(/)。</p><p>对导入是首选，因为它们非常清楚和直接。仅通过查看语句，就可以很容易地准确知道导入的资源在哪里。此外，即使import语句的当前位置发生更改，绝对导入仍然有效。实际上，PEP 8明确建议绝对导入。</p><p>但是，有时绝对导入可能会变得非常冗长，具体取决于目录结构的复杂性。想象一下这样的声明：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from package1.subpackage2.subpackage3.subpackage4.module5 import function6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>太荒谬了吧？幸运的是，在这种情况下，相对导入是一个不错的选择！</p><h3 id="_3-2-相对导入" tabindex="-1"><a class="header-anchor" href="#_3-2-相对导入" aria-hidden="true">#</a> 3.2 相对导入</h3><p>相对导入指定相对于当前位置（即import语句所在的位置）要导入的资源。有两种类型的相对导入：隐式和显式。隐式相对导入在Python3中已被弃用，因此我将不在这里介绍它们。</p><p>相对导入的语法取决于当前位置以及要导入的模块，包或对象的位置。以下是相对导入的一些示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from .some_module import some_class
from ..some_package import some_function
from . import some_class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以看到在上面的每个import语句中至少有一个点。相对导入使用点表示法来指定位置。</p><p>单点表示所引用的模块或软件包与当前位置位于同一目录中。两个点表示它位于当前位置的父目录中，即上面的目录中。三个点表示它位于祖父母目录中，依此类推。如果您使用类似Unix的操作系统，这可能对您来说很熟悉！</p><p>假设您具有与以前相同的目录结构：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>└── project
    ├── package1
    │   ├── module1.py
    │   └── module2.py
    └── package2
        ├── __init__.py
        ├── module3.py
        ├── module4.py
        └── subpackage1
            └── module5.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以function1通过package1/module1.py以下方式导入文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># package1/module1.py

from .module2 import function1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以将class1和function2导入到package2/module3.py文件中:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># package2/module3.py

from . import class1
from .subpackage1.module5 import function2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在第一个import语句中，单点表示您正在class1从当前包中导入。请记住，导入软件包实际上会将软件包的__init__.py文件导入为模块。</p><p>在第二个import语句中，您将再次使用一个点，因为subpackage1它与当前模块位于同一目录中module3.py。</p><p>当然这种方法有个极大问题，可能会报错，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ModuleNotFoundError: No module named &#39;__main__.module2&#39;; &#39;__main__&#39; is not a package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是相对导入只有在父模块已经在当前运行环境中被导入过才有用，所以尽可能用绝对导入。解决办法见：</p><p>相对导入的利与弊 相对导入的一个明显优势是它们非常简洁。根据当前位置，他们可以将您之前看到的可笑的冗长的import语句变成如下所示的简单内容：</p><blockquote><p>from ..subpackage4.module5 import function6</p></blockquote><p>不幸的是，相对导入可能会很混乱，尤其是对于目录结构可能会更改的共享项目。相对导入也不如绝对导入更易读，而且很难说出导入资源的位置。</p><p><strong>总的来说，通常应该选择绝对导入而不是相对导入，除非路径复杂并且会使语句过长。</strong></p><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,47),m={href:"https://realpython.com/absolute-vs-relative-python-imports/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/kdongyi/article/details/102906185",target:"_blank",rel:"noopener noreferrer"};function h(b,g){const a=l("ExternalLinkIcon");return t(),r("div",null,[p,e("p",null,[n("PEP 8 是Python的官方样式指南，在编写导入语句时有一些提示。PEP 8详细见"),e("a",c,[n("https://pep8.org/#imports"),i(a)]),n("。 总结如下：")]),u,e("blockquote",null,[e("p",null,[e("a",m,[n("https://realpython.com/absolute-vs-relative-python-imports/"),i(a)])])]),e("blockquote",null,[e("p",null,[e("a",v,[n("https://blog.csdn.net/kdongyi/article/details/102906185"),i(a)])])])])}const k=d(o,[["render",h],["__file","2020-08-01-_编程基础_ Python中的绝对导入与相对导入.html.vue"]]);export{k as default};
