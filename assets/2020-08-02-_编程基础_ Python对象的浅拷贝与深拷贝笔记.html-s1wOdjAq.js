import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o,c,a as n,b as s,d as e,e as i}from"./app-MsA2k2kn.js";const l={},u=i(`<h1 id="编程基础-python对象的浅拷贝与深拷贝笔记" tabindex="-1"><a class="header-anchor" href="#编程基础-python对象的浅拷贝与深拷贝笔记" aria-hidden="true">#</a> [编程基础] Python对象的浅拷贝与深拷贝笔记</h1><p>Python中的赋值语句不创建对象的副本，它们只将名称绑定到对象。对于不可变的对象，这通常没有什么区别。但是对于处理可变对象或可变对象的集合，您可能需要寻找一种方法来创建这些对象的“真实副本”或“克隆”。从本质上讲，您有时会希望拷贝可以在不自动修改原始副本的情况下进行修改。在本文中，我将向您简要介绍如何在Python3中复制或“克隆”对象，以及一些相关的注意事项。此外，在复制对象方面，Python 2和3之间没有什么区别。</p><p>让我们先看看如何复制Python的内置集合。Python内置的可变集合，如列表、字典和集合，可以通过在现有集合上调用它们的工厂函数来复制:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new_list = list(original_list)
new_dict = dict(original_dict)
new_set = set(original_set)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，这种方法不适用于自定义对象，而且，除此之外，它只创建浅层副本。对于像列表、dict和set这样的复合对象，浅拷贝和深拷贝有一个重要区别：</p><ul><li>浅拷贝意味着构造一个新的集合对象，然后用对原始集合中的子对象的引用填充它。本质上，复制过程不会递归，因此不会创建子对象本身的副本。</li><li>深度复制使得复制过程是递归的。这意味着首先构造一个新的集合对象，然后用在原始集合中找到的子对象的副本递归地填充该对象。以这种方式复制对象，遍历整个对象树，以创建原始对象及其所有子对象的完全独立克隆。</li></ul><p>我知道，这有点拗口。所以让我们看一些例子来说明深拷贝和浅拷贝之间的区别。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1浅拷贝与深拷贝" tabindex="-1"><a class="header-anchor" href="#_1浅拷贝与深拷贝" aria-hidden="true">#</a> １浅拷贝与深拷贝</h2><h3 id="_1-1-进行浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-1-进行浅拷贝" aria-hidden="true">#</a> 1.1 进行浅拷贝</h3><p>在下面的例子中，我们将创建一个新的嵌套列表，然后用list()工厂函数简单地复制它:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token comment"># Make a shallow copy，进行浅复制 </span>
ys <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>xs<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着ys它将成为一个新的独立对象，其内容与相同xs。您可以通过检查两个对象来验证这一点：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs
ys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[1, 2, 3], [4, 5, 6], [7, 8, 9]]






[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
</code></pre><p>为了确定ys确实与原始版本无关，让我们进行一些实验。您可以尝试向原始（xs）添加新的子列表，然后检查以确保此修改不会影响副本（ys）：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;new sublist&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
xs
ys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[1, 2, 3], [4, 5, 6], [7, 8, 9], [&#39;new sublist&#39;]]






[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
</code></pre><p>如您所见，这产生了预期的效果。在“表面”级别修改复制的列表完全没有问题。但是，由于我们只创建了原始列表的一个浅拷贝，ys仍然包含对xs中存储的原始子对象的引用。但是对于浅复制，子对象没有被复制。他们只是在复制的名单中再次被引用。因此，当您修改xs中的一个子对象时，这个修改也会反映在ys中，这是因为两个列表共享相同的子对象。拷贝只是浅拷贝，一级深拷贝：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;X&#39;</span>
xs
ys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[1, 2, 3], [&#39;X&#39;, 5, 6], [7, 8, 9], [&#39;new sublist&#39;]]






[[1, 2, 3], [&#39;X&#39;, 5, 6], [7, 8, 9]]
</code></pre><p>在上面的示例中，我们（似乎）只对xs进行了更改。但事实证明，xs和ys中索引1处的两个子列表都被修改了。同样，这是因为我们只创建了原始列表的一个浅拷贝。如果我们在第一步中创建了一个xs的深拷贝，那么这两个对象将完全独立。这就是对象的浅拷贝和深拷贝之间的实际区别。现在您知道了如何创建一些内置集合类的浅拷贝就是用内置工厂函数(list,set,dict)，并且知道了浅拷贝和深拷贝之间的区别。我们仍然需要答案的问题是：</p><ul><li>如何创建内置集合的深度副本</li><li>如何创建任意对象（包括自定义类）的副本（浅拷贝和深拷贝）</li></ul><p>这些问题的答案在Python标准库中的copy模块中。这个模块提供了一个简单的接口，用于创建任意Python对象的浅拷贝和深拷贝。</p><h3 id="_1-2-进行深拷贝" tabindex="-1"><a class="header-anchor" href="#_1-2-进行深拷贝" aria-hidden="true">#</a> 1.2 进行深拷贝</h3><p>让我们重复前面的列表复制示例，但是有一个重要的区别。这一次，我们将使用复制模块中定义的deepcopy()函数来创建深度副本:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> copy
xs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
zs <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>xs<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当你检查我们用copy.deepcopy()创建的xs和它的克隆zs时，你会发现它们看起来又一样了——就像前面的例子一样:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs
zs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[1, 2, 3], [4, 5, 6], [7, 8, 9]]






[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
</code></pre><p>但是，如果您对原始对象（xs）中的一个子对象进行了修改，则会看到此修改不会影响深层复制（zs）。两个对象，原始对象和副本，这次是完全独立的。xs被递归地克隆，包括它的所有子对象：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>xs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;X&#39;</span>
xs
zs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[1, 2, 3], [&#39;X&#39;, 5, 6], [7, 8, 9]]






[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
</code></pre><p>现在您可能需要花些时间坐下来与Python解释器一起演示这些示例。当您亲身体验并使用示例时，复制对象会更容易。顺便说一下，您还可以使用copy模块中的函数创建浅拷贝。函数的作用是:创建对象的浅拷贝。如果您需要清楚地说明您正在代码中的某个地方创建一个浅拷贝，那么这是非常有用的。使用copy.copy()可以表明这一事实。但是，对于内置的集合，简单地使用list、dict和set factory函数来创建浅拷贝被认为更符合python风格。</p><h2 id="_2-复制任意python对象" tabindex="-1"><a class="header-anchor" href="#_2-复制任意python对象" aria-hidden="true">#</a> 2 复制任意Python对象</h2><p>我们仍然需要回答的问题是如何创建任意对象(包括自定义类)的拷贝(浅拷贝和深拷贝)。现在让我们来看看。 copy.copy() and copy.deepcopy()可以复制任意对象。 同样，理解如何使用这些方法的最好方法是通过一个简单的实验。我将以前面的列表复制示例为基础。首先定义一个简单的二维点类：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Point</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>x <span class="token operator">=</span> x
        self<span class="token punctuation">.</span>y <span class="token operator">=</span> y

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&#39;Point(</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>x<span class="token conversion-option punctuation">!r</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>y<span class="token conversion-option punctuation">!r</span><span class="token punctuation">}</span></span><span class="token string">)&#39;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码添加了一个__repr__()实现，以便我们可以轻松地在Python解释器中检查从此类创建的对象。接下来，我们将创建一个Point实例，然后（使用copy模块）（浅）复制该实例：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> Point<span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span>
b <span class="token operator">=</span> copy<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果检查原始Point对象及其（浅）克隆的内容，则会看到期望的结果：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a
b
a <span class="token keyword">is</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Point(23, 42)






Point(23, 42)






False
</code></pre><p>还有一些事情要记住。因为我们的point对象使用不可变类型（int）作为其坐标，所以在这种情况下，浅拷贝和深拷贝没有区别。但我稍后将扩展示例。让我们继续一个更复杂的例子。我将定义另一个类来表示2D矩形。我将以允许我们创建更复杂的对象层次结构的方式来进行操作-我的矩形将使用Point对象来表示其坐标：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Rectangle</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> topleft<span class="token punctuation">,</span> bottomright<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>topleft <span class="token operator">=</span> topleft
        self<span class="token punctuation">.</span>bottomright <span class="token operator">=</span> bottomright

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Rectangle(</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>topleft<span class="token conversion-option punctuation">!r</span><span class="token punctuation">}</span></span><span class="token string">, &#39;</span></span>
                <span class="token string-interpolation"><span class="token string">f&#39;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>bottomright<span class="token conversion-option punctuation">!r</span><span class="token punctuation">}</span></span><span class="token string">)&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，首先我们将尝试创建矩形实例的浅拷贝：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>rect <span class="token operator">=</span> Rectangle<span class="token punctuation">(</span>Point<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Point<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
srect <span class="token operator">=</span> copy<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>rect<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果检查原始矩形及其副本，则会看到__repr__()效果很好，并且浅复制过程按预期工作：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>rect
srect
rect <span class="token keyword">is</span> srect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Rectangle(Point(0, 1), Point(5, 6))






Rectangle(Point(0, 1), Point(5, 6))






False
</code></pre><p>还记得前面的列表示例如何说明深拷贝和浅拷贝之间的区别吗?这里我将使用相同的方法。我将修改一个更深层次的对象，然后你会看到这个变化反映在(浅)复制:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>rect<span class="token punctuation">.</span>topleft<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">999</span>
rect
srect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Rectangle(Point(999, 1), Point(5, 6))






Rectangle(Point(999, 1), Point(5, 6))
</code></pre><p>我希望这件事像你期望的那样。接下来，我将创建原始矩形的深拷贝。然后我将应用另一个修改，你会看到哪些对象受到影响:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>drect <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>srect<span class="token punctuation">)</span>
drect<span class="token punctuation">.</span>topleft<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">222</span>
drect
rect
srect
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Rectangle(Point(222, 1), Point(5, 6))






Rectangle(Point(999, 1), Point(5, 6))






Rectangle(Point(999, 1), Point(5, 6))
</code></pre>`,55),r={href:"https://docs.python.org/3/library/copy.html",target:"_blank",rel:"noopener noreferrer"},d=n("h2",{id:"_3-总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-总结","aria-hidden":"true"},"#"),s(" 3 总结")],-1),k=n("ul",null,[n("li",null,"做一个对象的浅拷贝不会克隆子对象。因此，副本并不完全独立于原件。"),n("li",null,"对象的深层副本将递归地克隆子对象。克隆完全独立于原始副本，但创建深度副本的速度较慢。"),n("li",null,"您可以使用copy模块复制任意对象(包括自定义类)。")],-1),v=n("h2",{id:"_4-参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-参考","aria-hidden":"true"},"#"),s(" 4 参考")],-1),m={href:"https://realpython.com/copying-python-objects/",target:"_blank",rel:"noopener noreferrer"};function b(h,y){const a=p("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("瞧!这一次，深拷贝(drect)完全独立于原始拷贝(rect)和浅拷贝(srect)。这里我们已经讨论了很多内容，还有一些关于复制对象的细节。 详细见"),n("a",r,[s("copy模块文档"),e(a)])]),d,k,v,n("p",null,[n("a",m,[s("https://realpython.com/copying-python-objects/"),e(a)])])])}const x=t(l,[["render",b],["__file","2020-08-02-_编程基础_ Python对象的浅拷贝与深拷贝笔记.html.vue"]]);export{x as default};
