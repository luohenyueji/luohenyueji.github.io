import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as s,c as l,a as e,b as i,d as a,e as t}from"./app-MsA2k2kn.js";const v={},c=e("h1",{id:"python-python模块graphviz使用入门",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#python-python模块graphviz使用入门","aria-hidden":"true"},"#"),i(" [python] python模块graphviz使用入门")],-1),o=e("p",null,"Graphviz是一款能够自动排版的流程图绘图软件。python graphviz则是graphviz的python实现。我们可以通过python graphviz实现轻松完成各种流程图的绘制。",-1),p=e("h2",{id:"_1-安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-安装","aria-hidden":"true"},"#"),i(" 1 安装")],-1),u=e("p",null,"该软件包在Python 2.7和3.5+下运行，请使用pip进行安装：",-1),g=e("blockquote",null,[e("p",null,"pip install graphviz")],-1),m={href:"https://www.graphviz.org/download/",target:"_blank",rel:"noopener noreferrer"},h=t(`<h2 id="_2-快速入门" tabindex="-1"><a class="header-anchor" href="#_2-快速入门" aria-hidden="true">#</a> 2 快速入门</h2><h3 id="_2-1-基本用法" tabindex="-1"><a class="header-anchor" href="#_2-1-基本用法" aria-hidden="true">#</a> 2.1 基本用法</h3><p>该graphviz模块提供了两个类：Graph和 Digraph。它们分别以DOT语言为无向图和有向图创建图描述。它们具有相同的 API。通过实例化一个new Graph或 Digraphobject 创建一个图形：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph

dot = Digraph(comment=&#39;The Round Table&#39;)

print(dot)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// The Round Table
digraph {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以添加点和边，通过node()和edge()或edges()来实现。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph

dot = Digraph(comment=&#39;The Round Table&#39;)
dot.node(&#39;A&#39;, &#39;King Arthur&#39;)
dot.node(&#39;B&#39;, &#39;Sir Bedevere the Wise&#39;)
dot.node(&#39;L&#39;, &#39;Sir Lancelot the Brave&#39;)

dot.edges([&#39;AB&#39;, &#39;AL&#39;])
dot.edge(&#39;B&#39;, &#39;L&#39;, constraint=&#39;false&#39;)
print(dot.source)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成的源代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// The Round Table
digraph {
    A [label=&quot;King Arthur&quot;]
    B [label=&quot;Sir Bedevere the Wise&quot;]
    L [label=&quot;Sir Lancelot the Brave&quot;]
    A -&gt; B
    A -&gt; L
    B -&gt; L [constraint=false]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们可以通过如下代码保存图像pdf文件，并显示。通过设置view=True将自动使用系统默认的文件类型的查看器应用程序打开生成的文件（PDF，PNG，SVG等）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dot.render(&#39;test-output/round-table.gv&#39;, view=True)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115351203.jpg#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="_2-2-输出图像格式" tabindex="-1"><a class="header-anchor" href="#_2-2-输出图像格式" aria-hidden="true">#</a> 2.2 输出图像格式</h3><p>要使用与默认PDF 不同的输出文件格式，请format在创建Graph或 Digraph对象时使用参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Graph

g = Graph(format=&#39;png&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在基本用法的例子中在输出中添加format=&#39;jpg&#39;便可以获得jpg图像。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dot.render(&#39;test-output/round-table.gv&#39;,format=&#39;jpg&#39;, view=True)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是想设置输出图像的dpi，需要在创建Graph或Digraph对象时，设置dpi参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Graph

g = Graph(format=&#39;png&#39;)
g.graph_attr[&#39;dpi&#39;] = &#39;300&#39;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-图像style设置" tabindex="-1"><a class="header-anchor" href="#_2-3-图像style设置" aria-hidden="true">#</a> 2.3 图像style设置</h3><p>使用graph_attr，node_attr和 edge_attr参数更改默认外观的图表，点和连接线。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph

ps = Digraph(name=&#39;pet-shop&#39;, node_attr={&#39;shape&#39;: &#39;plaintext&#39;},format=&#39;png&#39;)
ps.node(&#39;parrot&#39;)
ps.node(&#39;dead&#39;)
ps.edge(&#39;parrot&#39;, &#39;dead&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115410224.png#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="_2-4-属性" tabindex="-1"><a class="header-anchor" href="#_2-4-属性" aria-hidden="true">#</a> 2.4 属性</h3><p>要设置图中的所有后续图形，点或边的树形，请使用attr()方法，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph
from graphviz import Graph
ni = Graph(&#39;ni&#39;,format=&#39;jpg&#39;)

ni.attr(&#39;node&#39;, shape=&#39;rarrow&#39;)
ni.node(&#39;1&#39;, &#39;Ni!&#39;)
ni.node(&#39;2&#39;, &#39;Ni!&#39;)

ni.node(&#39;3&#39;, &#39;Ni!&#39;, shape=&#39;egg&#39;)

ni.attr(&#39;node&#39;, shape=&#39;star&#39;)
ni.node(&#39;4&#39;, &#39;Ni!&#39;)
ni.node(&#39;5&#39;, &#39;Ni!&#39;)
ni.attr(rankdir=&#39;LR&#39;)

ni.edges([&#39;12&#39;, &#39;23&#39;, &#39;34&#39;, &#39;45&#39;])
print(ni.source) 
ni.view()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115426180.jpg#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h3 id="_2-5-子图和聚类" tabindex="-1"><a class="header-anchor" href="#_2-5-子图和聚类" aria-hidden="true">#</a> 2.5 子图和聚类</h3><p>图和有向图对象有一个subgraph（）-用于向实例添加子图的方法。 有两种方法可以使用它：使用与唯一参数（其内容作为子图添加）类型相同的现成图形对象，或者省略图形参数（返回上下文管理器，以便在with块中更优雅地定义子图内容）。 第一个用法选项，只有graph作为参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph
from graphviz import Graph
p = Graph(name=&#39;parent&#39;, node_attr={&#39;shape&#39;: &#39;plaintext&#39;},format=&#39;png&#39;)
p.edge(&#39;spam&#39;, &#39;eggs&#39;)

c = Graph(name=&#39;child&#39;, node_attr={&#39;shape&#39;: &#39;box&#39;})
c.edge(&#39;foo&#39;, &#39;bar&#39;)

p.subgraph(c)
p.view()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二次使用，带有with-block（忽略graph参数）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>p = Graph(name=&#39;parent&#39;)
p.edge(&#39;spam&#39;, &#39;eggs&#39;)

with p.subgraph(name=&#39;child&#39;, node_attr={&#39;shape&#39;: &#39;box&#39;}) as c:
    c.edge(&#39;foo&#39;, &#39;bar&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两者结果相同如下图所示：<br><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115439963.png#pic_center" alt="在这里插入图片描述" loading="lazy"></p><h2 id="_3-实例" tabindex="-1"><a class="header-anchor" href="#_3-实例" aria-hidden="true">#</a> 3 实例</h2><p>代表的实例图像如下所示</p><ol><li>有向图 代码</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Digraph

g = Digraph(&#39;G&#39;, filename=&#39;hello.gv&#39;,format=&#39;png&#39;)

g.edge(&#39;Hello&#39;, &#39;World&#39;)

g.view()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115449693.png#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><ol start="2"><li>无向图 代码</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from graphviz import Graph

g = Graph(&#39;G&#39;, filename=&#39;process.gv&#39;, engine=&#39;sfdp&#39;,format=&#39;png&#39;)

g.edge(&#39;run&#39;, &#39;intr&#39;)
g.edge(&#39;intr&#39;, &#39;runbl&#39;)
g.edge(&#39;runbl&#39;, &#39;run&#39;)
g.edge(&#39;run&#39;, &#39;kernel&#39;)
g.edge(&#39;kernel&#39;, &#39;zombie&#39;)
g.edge(&#39;kernel&#39;, &#39;sleep&#39;)
g.edge(&#39;kernel&#39;, &#39;runmem&#39;)
g.edge(&#39;sleep&#39;, &#39;swap&#39;)
g.edge(&#39;swap&#39;, &#39;runswap&#39;)
g.edge(&#39;runswap&#39;, &#39;new&#39;)
g.edge(&#39;runswap&#39;, &#39;runmem&#39;)
g.edge(&#39;new&#39;, &#39;runmem&#39;)
g.edge(&#39;sleep&#39;, &#39;runmem&#39;)

g.view()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/20200517115503997.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><ol start="3"><li>子图</li></ol><p>代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
from graphviz import Digraph

g = Digraph(&#39;G&#39;, filename=&#39;cluster.gv&#39;,format=&#39;png&#39;)



with g.subgraph(name=&#39;cluster_0&#39;) as c:
    c.attr(style=&#39;filled&#39;, color=&#39;lightgrey&#39;)
    c.node_attr.update(style=&#39;filled&#39;, color=&#39;white&#39;)
    c.edges([(&#39;a0&#39;, &#39;a1&#39;), (&#39;a1&#39;, &#39;a2&#39;), (&#39;a2&#39;, &#39;a3&#39;)])
    c.attr(label=&#39;process #1&#39;)

with g.subgraph(name=&#39;cluster_1&#39;) as c:
    c.attr(color=&#39;blue&#39;)
    c.node_attr[&#39;style&#39;] = &#39;filled&#39;
    c.edges([(&#39;b0&#39;, &#39;b1&#39;), (&#39;b1&#39;, &#39;b2&#39;), (&#39;b2&#39;, &#39;b3&#39;)])
    c.attr(label=&#39;process #2&#39;)

g.edge(&#39;start&#39;, &#39;a0&#39;)
g.edge(&#39;start&#39;, &#39;b0&#39;)
g.edge(&#39;a1&#39;, &#39;b3&#39;)
g.edge(&#39;b2&#39;, &#39;a3&#39;)
g.edge(&#39;a3&#39;, &#39;a0&#39;)
g.edge(&#39;a3&#39;, &#39;end&#39;)
g.edge(&#39;b3&#39;, &#39;end&#39;)

g.node(&#39;start&#39;, shape=&#39;Mdiamond&#39;)
g.node(&#39;end&#39;, shape=&#39;Msquare&#39;)

g.view()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[python] python模块graphviz使用入门/2020051711551559.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h1 id="_4-如何进一步使用python-graphviz" tabindex="-1"><a class="header-anchor" href="#_4-如何进一步使用python-graphviz" aria-hidden="true">#</a> 4 如何进一步使用python graphviz</h1><p>python graphviz官方文档如下：</p><blockquote><p>https://graphviz.readthedocs.io/en/stable/index.html</p></blockquote><p>在实际使用时，参考官方实例就行。但是python graphviz文档介绍不全，很多graphviz软件参数使用没有说清楚。如果不会graphviz语法，无法很好地使用python graphviz。一些python graphviz特性可以参考文档，然后对照使用。</p>`,53),b={href:"https://www.cnblogs.com/shuqin/p/11897207.html",target:"_blank",rel:"noopener noreferrer"},_=e("br",null,null,-1),x={href:"https://www.cnblogs.com/born2run/p/9581386.html",target:"_blank",rel:"noopener noreferrer"},f=e("br",null,null,-1),y={href:"https://blog.csdn.net/youwen21/article/details/98302482?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522158682936919195239813546%2522%252C%2522scm%2522%253A%252220140713.130056874..%2522%257D&request_id=158682936919195239813546&biz_id=0&utm_source=distribute.pc_search_result.none-task-blog-blog_SOOPENSEARCH-1",target:"_blank",rel:"noopener noreferrer"},z=e("p",null,"实际上graphviz画一些流程图即可，而且需要较大的调整参数。因此如果非紧急绘图建议使用visio。",-1);function w(G,k){const n=d("ExternalLinkIcon");return s(),l("div",null,[c,o,p,u,g,e("p",null,[i("要渲染生成的可在Graphviz软件使用DOT源代码，您还需要安装Graphviz"),e("a",m,[i("(下载页面)"),a(n)]),i("，并确保包含dot可执行文件的目录在系统路径上。")]),h,e("blockquote",null,[e("p",null,[e("a",b,[i("Graphviz 画图的一些总结"),a(n)]),_,e("a",x,[i("Graphviz入门"),a(n)]),f,e("a",y,[i("GraphViz DOT有向图 (一)元素说明"),a(n)])])]),z])}const L=r(v,[["render",w],["__file","2020-05-17-_python_ python模块graphviz使用入门.html.vue"]]);export{L as default};
