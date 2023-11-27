import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as n,o as a,c as s,a as t,b as d,d as i,e as l}from"./app-MsA2k2kn.js";const o={},u=t("h1",{id:"r语言-基于r语言实现树形图的绘制",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#r语言-基于r语言实现树形图的绘制","aria-hidden":"true"},"#"),d(" [R语言] 基于R语言实现树形图的绘制")],-1),c={href:"https://blog.csdn.net/luohenyj/article/details/97949476",target:"_blank",rel:"noopener noreferrer"},g=t("p",null,"之所以还用R语言实现树形图的绘制，主要原因在于R语言所实现的树形图比python实现的更加多样。R语言树形图提供以下两种类型：",-1),p=t("ol",null,[t("li",null,"分层树形图：类似CEO管理团队领导管理员工等等。"),t("li",null,"聚类树形图：聚类将一组个体按相似性分组。它的结果可以可视化为一棵树。")],-1),v={href:"https://www.r-graph-gallery.com/dendrogram.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/luohenyueji/R-Study-Notes/tree/master/Visualization",target:"_blank",rel:"noopener noreferrer"},h=l(`<hr><h2 id="_1-分层树形图-dendrogram-from-hierarchical-data" tabindex="-1"><a class="header-anchor" href="#_1-分层树形图-dendrogram-from-hierarchical-data" aria-hidden="true">#</a> 1 分层树形图 DENDROGRAM FROM HIERARCHICAL DATA</h2><h3 id="_1-1-基于r语言和ggraph绘制树形图-introduction-to-tree-diagram-with-r-and-ggraph" tabindex="-1"><a class="header-anchor" href="#_1-1-基于r语言和ggraph绘制树形图-introduction-to-tree-diagram-with-r-and-ggraph" aria-hidden="true">#</a> 1.1 基于R语言和ggraph绘制树形图 Introduction to tree diagram with R and ggraph</h3><p>本节逐步介绍通过R语言和ggraph建立树形图，并提供了解释和可复制代码。ggraph包是用R从层次数据构建树形图的最佳选择，其遵循与ggplot2相同的逻辑。本节旨在使用ggraph库制作一个表示层次数据的基本树形图。考虑两种输入格式：</p><ul><li>基于边列表</li><li>基于嵌套数据</li></ul><h4 id="_1-1-1-通过边绘制树形图-dendrogram-from-edge-list" tabindex="-1"><a class="header-anchor" href="#_1-1-1-通过边绘制树形图-dendrogram-from-edge-list" aria-hidden="true">#</a> 1.1.1 通过边绘制树形图 Dendrogram from edge list</h4><p>基于边列表绘制树形图意思是给定每一个节点到另外一个节点的数据，来依次绘制树形图。边列表数据使用ggraph最方便的格式。数据结构如下图所示。每一行代表一条边，比如(origin,group1)表示从节点origin到group的边。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/imgonline/Hierarchical_network_2col.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>请遵循以下步骤：</p><ul><li>使用igraph库中的graph_from_data_frame()函数将输入数据帧转换为图形对象</li><li>使用ggraph的树形图布局，布局为&#39;dendrogram&#39;</li></ul><p>主要步骤依次讲解：</p><p><strong>创建数据</strong><br> 其中d1为根节点到第一层节点的数据，每一行代表一条边，比如(origin,group1)表示从节点origin到group的边，d2是第一层节点到第二层节点的数据。edges是对d1和d2的汇总</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># libraries
# 包
library(ggraph)
library(igraph)
library(tidyverse)
 
# create an edge list data frame giving the hierarchical structure of your individuals
# 创建层级数据
d1 &lt;- data.frame(from=&quot;origin&quot;, to=paste(&quot;group&quot;, seq(1,3), sep=&quot;&quot;))
d1
d2 &lt;- data.frame(from=rep(d1$to, each=3), to=paste(&quot;subgroup&quot;, seq(1,9), sep=&quot;_&quot;))
d2
# 汇总
edges &lt;- rbind(d1, d2)
edges
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 3 × 2</caption><thead><tr><th scope="col">from</th><th scope="col">to</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>origin</td><td>group1</td></tr><tr><td>origin</td><td>group2</td></tr><tr><td>origin</td><td>group3</td></tr></tbody></table><table><caption>A data.frame: 9 × 2</caption><thead><tr><th scope="col">from</th><th scope="col">to</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>group1</td><td>subgroup_1</td></tr><tr><td>group1</td><td>subgroup_2</td></tr><tr><td>group1</td><td>subgroup_3</td></tr><tr><td>group2</td><td>subgroup_4</td></tr><tr><td>group2</td><td>subgroup_5</td></tr><tr><td>group2</td><td>subgroup_6</td></tr><tr><td>group3</td><td>subgroup_7</td></tr><tr><td>group3</td><td>subgroup_8</td></tr><tr><td>group3</td><td>subgroup_9</td></tr></tbody></table><table><caption>A data.frame: 12 × 2</caption><thead><tr><th scope="col">from</th><th scope="col">to</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>origin</td><td>group1 </td></tr><tr><td>origin</td><td>group2 </td></tr><tr><td>origin</td><td>group3 </td></tr><tr><td>group1</td><td>subgroup_1</td></tr><tr><td>group1</td><td>subgroup_2</td></tr><tr><td>group1</td><td>subgroup_3</td></tr><tr><td>group2</td><td>subgroup_4</td></tr><tr><td>group2</td><td>subgroup_5</td></tr><tr><td>group2</td><td>subgroup_6</td></tr><tr><td>group3</td><td>subgroup_7</td></tr><tr><td>group3</td><td>subgroup_8</td></tr><tr><td>group3</td><td>subgroup_9</td></tr></tbody></table><p><strong>创建图形结构</strong></p><p>需要创建专用的图形结构，origin-&gt;group1表示从节点origin到节点group1</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Create a graph object 
mygraph &lt;- graph_from_data_frame( edges )
mygraph
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>IGRAPH 2c80675 DN-- 13 12 -- 
+ attr: name (v/c)
+ edges from 2c80675 (vertex names):
 [1] origin-&gt;group1     origin-&gt;group2     origin-&gt;group3     group1-&gt;subgroup_1
 [5] group1-&gt;subgroup_2 group1-&gt;subgroup_3 group2-&gt;subgroup_4 group2-&gt;subgroup_5
 [9] group2-&gt;subgroup_6 group3-&gt;subgroup_7 group3-&gt;subgroup_8 group3-&gt;subgroup_9
</code></pre><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Basic tree
# 基础树形图
# layout表示布局方式，circular表示是否为环状树形图
ggraph(mygraph, layout = &#39;dendrogram&#39;, circular = FALSE) + 
    # 画边
    geom_edge_diagonal() +
    # 画节点
    geom_node_point() +
    # 设置主题
    theme_void()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_1-1-2-通过嵌套数据绘制树形图-dendrogram-from-a-nested-dataframe" tabindex="-1"><a class="header-anchor" href="#_1-1-2-通过嵌套数据绘制树形图-dendrogram-from-a-nested-dataframe" aria-hidden="true">#</a> 1.1.2 通过嵌套数据绘制树形图 Dendrogram from a nested dataframe</h4><p>另一种常见格式是嵌套数据。下面的代码演示如何轻松地将数组转换为嵌套数据。嵌套数据结构如下图所示，嵌套数据每一列代表一个节点，行代表节点到节点的路径</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/imgonline/Nested_DataFrame.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>建立数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># libraries
library(ggraph)
library(igraph)
library(tidyverse)
 
# create a data frame 
data &lt;- data.frame(
  level1=&quot;CEO&quot;,
  level2=c( rep(&quot;boss1&quot;,4), rep(&quot;boss2&quot;,4)),
  level3=paste0(&quot;mister_&quot;, letters[1:8])
)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 8 × 3</caption><thead><tr><th scope="col">level1</th><th scope="col">level2</th><th scope="col">level3</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>CEO</td><td>boss1</td><td>mister_a</td></tr><tr><td>CEO</td><td>boss1</td><td>mister_b</td></tr><tr><td>CEO</td><td>boss1</td><td>mister_c</td></tr><tr><td>CEO</td><td>boss1</td><td>mister_d</td></tr><tr><td>CEO</td><td>boss2</td><td>mister_e</td></tr><tr><td>CEO</td><td>boss2</td><td>mister_f</td></tr><tr><td>CEO</td><td>boss2</td><td>mister_g</td></tr><tr><td>CEO</td><td>boss2</td><td>mister_h</td></tr></tbody></table><p><strong>将数据转换为边列表</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># transform it to a edge list!
edges_level1_2 &lt;- data %&gt;% select(level1, level2) %&gt;% unique %&gt;% rename(from=level1, to=level2)
edges_level2_3 &lt;- data %&gt;% select(level2, level3) %&gt;% unique %&gt;% rename(from=level2, to=level3)
edges_level1_2
edges_level2_3
edge_list=rbind(edges_level1_2, edges_level2_3)
edge_list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 2 × 2</caption><thead><tr><th></th><th scope="col">from</th><th scope="col">to</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>CEO</td><td>boss1</td></tr><tr><th scope="row">5</th><td>CEO</td><td>boss2</td></tr></tbody></table><table><caption>A data.frame: 8 × 2</caption><thead><tr><th scope="col">from</th><th scope="col">to</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>boss1</td><td>mister_a</td></tr><tr><td>boss1</td><td>mister_b</td></tr><tr><td>boss1</td><td>mister_c</td></tr><tr><td>boss1</td><td>mister_d</td></tr><tr><td>boss2</td><td>mister_e</td></tr><tr><td>boss2</td><td>mister_f</td></tr><tr><td>boss2</td><td>mister_g</td></tr><tr><td>boss2</td><td>mister_h</td></tr></tbody></table><table><caption>A data.frame: 10 × 2</caption><thead><tr><th></th><th scope="col">from</th><th scope="col">to</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>CEO </td><td>boss1 </td></tr><tr><th scope="row">5</th><td>CEO </td><td>boss2 </td></tr><tr><th scope="row">11</th><td>boss1</td><td>mister_a</td></tr><tr><th scope="row">2</th><td>boss1</td><td>mister_b</td></tr><tr><th scope="row">3</th><td>boss1</td><td>mister_c</td></tr><tr><th scope="row">4</th><td>boss1</td><td>mister_d</td></tr><tr><th scope="row">51</th><td>boss2</td><td>mister_e</td></tr><tr><th scope="row">6</th><td>boss2</td><td>mister_f</td></tr><tr><th scope="row">7</th><td>boss2</td><td>mister_g</td></tr><tr><th scope="row">8</th><td>boss2</td><td>mister_h</td></tr></tbody></table><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Now we can plot that
mygraph&lt;- graph_from_data_frame( edge_list )
ggraph(mygraph, layout = &#39;dendrogram&#39;, circular = FALSE) + 
    geom_edge_diagonal() +
    geom_node_point() +
    theme_void()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-使用r和ggraph自定义树形图-dendrogram-customization-with-r-and-ggraph" tabindex="-1"><a class="header-anchor" href="#_1-2-使用r和ggraph自定义树形图-dendrogram-customization-with-r-and-ggraph" aria-hidden="true">#</a> 1.2 使用R和ggraph自定义树形图 Dendrogram customization with R and ggraph</h3><p>本节旨在显示了如何自定义树形图：布局，边线样式，节点特征等</p><h4 id="_1-2-1-数据准备-data-preparation" tabindex="-1"><a class="header-anchor" href="#_1-2-1-数据准备-data-preparation" aria-hidden="true">#</a> 1.2.1 数据准备 Data preparation</h4><p>这里准备的是本节所用到的通用数据</p><p><strong>首先使用igraph包创建一个数据集和一个图形对象</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Libraries
library(ggraph)
library(igraph)
library(tidyverse)
theme_set(theme_void())
 
# data: edge list
# 边数据
d1 &lt;- data.frame(from=&quot;origin&quot;, to=paste(&quot;group&quot;, seq(1,7), sep=&quot;&quot;))
d2 &lt;- data.frame(from=rep(d1$to, each=7), to=paste(&quot;subgroup&quot;, seq(1,49), sep=&quot;_&quot;))
edges &lt;- rbind(d1, d2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;New theme missing the following elements: axis.title.x, axis.title.x.top, axis.title.y, axis.title.y.right, axis.text.x, axis.text.x.top, axis.text.y, axis.text.y.right, axis.ticks, axis.line, axis.line.x, axis.line.y, legend.background, legend.margin, legend.spacing, legend.spacing.x, legend.spacing.y, legend.key, legend.key.height, legend.key.width, legend.text.align, legend.title.align, legend.direction, legend.justification, legend.box.margin, legend.box.background, legend.box.spacing, panel.background, panel.border, panel.spacing.x, panel.spacing.y, panel.grid, panel.grid.minor, plot.background, strip.background, strip.placement, strip.text.x, strip.text.y&quot;
</code></pre><p><strong>为每个节点添加聚类信息和值信息</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># We can add a second data frame with information for each node!
# 为每个节点设置信息
name &lt;- unique(c(as.character(edges$from), as.character(edges$to)))
# 设置每个节点对应的聚类信息和值
vertices &lt;- data.frame(
  name=name,
  group=c( rep(NA,8) ,  rep( paste(&quot;group&quot;, seq(1,7), sep=&quot;&quot;), each=7)),
  cluster=sample(letters[1:4], length(name), replace=T),
  value=sample(seq(10,30), length(name), replace=T)
)
vertices[0:10,]
# Create a graph object
mygraph &lt;- graph_from_data_frame( edges, vertices=vertices)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 10 × 4</caption><thead><tr><th scope="col">name</th><th scope="col">group</th><th scope="col">cluster</th><th scope="col">value</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>origin </td><td>NA </td><td>b</td><td>11</td></tr><tr><td>group1 </td><td>NA </td><td>c</td><td>25</td></tr><tr><td>group2 </td><td>NA </td><td>c</td><td>10</td></tr><tr><td>group3 </td><td>NA </td><td>d</td><td>28</td></tr><tr><td>group4 </td><td>NA </td><td>b</td><td>25</td></tr><tr><td>group5 </td><td>NA </td><td>d</td><td>25</td></tr><tr><td>group6 </td><td>NA </td><td>c</td><td>26</td></tr><tr><td>group7 </td><td>NA </td><td>b</td><td>30</td></tr><tr><td>subgroup_1</td><td>group1</td><td>a</td><td>10</td></tr><tr><td>subgroup_2</td><td>group1</td><td>d</td><td>11</td></tr></tbody></table><h4 id="_1-2-2-环形或线形布局-circular-or-linear-layout" tabindex="-1"><a class="header-anchor" href="#_1-2-2-环形或线形布局-circular-or-linear-layout" aria-hidden="true">#</a> 1.2.2 环形或线形布局 Circular or linear layout</h4><p>首先，由于ggraph的layout参数，您可以使用circular选项来使用环形或线形布局。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 线形布局
ggraph(mygraph, layout = &#39;dendrogram&#39;, circular = FALSE) + 
  geom_edge_diagonal() 
# 环形布局
ggraph(mygraph, layout = &#39;dendrogram&#39;, circular = TRUE) + 
  geom_edge_diagonal()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_23_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_23_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_1-2-3-边的样式-edge-style" tabindex="-1"><a class="header-anchor" href="#_1-2-3-边的样式-edge-style" aria-hidden="true">#</a> 1.2.3 边的样式 Edge style</h4><p>然后你可以选择不同的边样式。ggraph软件包有两个主要功能：geom_edge_link和geom_edge_diagram。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 折线
ggraph(mygraph, layout = &#39;dendrogram&#39;) + 
  geom_edge_link()
# 弧线
ggraph(mygraph, layout = &#39;dendrogram&#39;) + 
  geom_edge_diagonal()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_25_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_25_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_1-2-4-标签和节点-labels-and-nodes" tabindex="-1"><a class="header-anchor" href="#_1-2-4-标签和节点-labels-and-nodes" aria-hidden="true">#</a> 1.2.4 标签和节点 Labels and Nodes</h4><p>您可能需要添加标签，以便对树有更深入的了解。最后是节点。这可以分别使用geom_node_text和geom_node_point来完成。但是对于环形树添加标签比较麻烦，下一节单独进行讲述。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggraph(mygraph, layout = &#39;dendrogram&#39;) + 
    # 设置边
    geom_edge_diagonal() +
    # 设置节点名，label表示节点名，filter=leaf表示跳过叶子节点，angle标签方向，hjust和nudge_y标签和节点距离
    geom_node_text(aes( label=name, filter=leaf) , angle=90 , hjust=1, nudge_y = -0.01) +
    # 设置y轴范围
    ylim(-.4, NA)

ggraph(mygraph, layout = &#39;dendrogram&#39;) + 
    geom_edge_diagonal() +
    geom_node_text(aes( label=name, filter=leaf) , angle=90 , hjust=1, nudge_y = -0.04) +
    # 为每个节点添加点
    geom_node_point(aes(filter=leaf) , alpha=0.6) +
    ylim(-.5, NA)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_27_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_27_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_1-2-5-自定义美学-customize-aesthetics" tabindex="-1"><a class="header-anchor" href="#_1-2-5-自定义美学-customize-aesthetics" aria-hidden="true">#</a> 1.2.5 自定义美学 Customize aesthetics</h4><p>在树形图中添加颜色或形状是一项常见的任务。它可以更清楚地显示数据集的组织结构。ggraph的工作原理与ggplot2相同。在每个组件的美学部分，可以使用初始数据帧的一列映射到形状、颜色、大小或其他。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggraph(mygraph, layout = &#39;dendrogram&#39;) + 
    geom_edge_diagonal() +
    geom_node_text(aes( label=name, filter=leaf, color=group) , angle=90 , hjust=1, nudge_y=-0.1) +
    geom_node_point(aes(filter=leaf, size=value, color=group) , alpha=0.6) +
    ylim(-.6, NA) +
    theme(legend.position=&quot;none&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_29_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-基于r和ggraph自定义环形树形图" tabindex="-1"><a class="header-anchor" href="#_1-3-基于r和ggraph自定义环形树形图" aria-hidden="true">#</a> 1.3 基于R和ggraph自定义环形树形图</h3><p>本节介绍通过R和ggraph自定义环形树形图。ggraph库的圆形树形图应有其专用页面，因为调整标签可能有些棘手。实际上，它们需要具有良好的角度，可以在图表的左侧上下翻转，并且还需要调整其对齐方式。以下分布介绍：</p><p><strong>创建数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Libraries
library(ggraph)
library(igraph)
library(tidyverse)
library(RColorBrewer) 

# 创建数据，类似前面的步骤
# create a data frame giving the hierarchical structure of your individuals
d1=data.frame(from=&quot;origin&quot;, to=paste(&quot;group&quot;, seq(1,5), sep=&quot;&quot;))
d2=data.frame(from=rep(d1$to, each=5), to=paste(&quot;subgroup&quot;, seq(1,25), sep=&quot;_&quot;))
edges=rbind(d1, d2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># create a vertices data.frame. One line per object of our hierarchy
# 为每个节点添加值
vertices = data.frame(
  name = unique(c(as.character(edges$from), as.character(edges$to))),
  # 正态分布随机取值,共获得31个值。如果是其他数据，去掉value = runif(31)，查看运行后的dim(vertices)就知道该填多少了
  value = runif(31)
) 
# Let&#39;s add a column with the group of each name. It will be useful later to color points
# 为每个节点添加分组信息
vertices$group = edges$from[ match( vertices$name, edges$to ) ]
dim(vertices)
head(vertices)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>31</li><li>3</li></ol><table><caption>A data.frame: 6 × 3</caption><thead><tr><th scope="col">name</th><th scope="col">value</th><th scope="col">group</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>origin</td><td>0.2694659</td><td>NA </td></tr><tr><td>group1</td><td>0.6816846</td><td>origin</td></tr><tr><td>group2</td><td>0.2849697</td><td>origin</td></tr><tr><td>group3</td><td>0.2955677</td><td>origin</td></tr><tr><td>group4</td><td>0.6879641</td><td>origin</td></tr><tr><td>group5</td><td>0.2655517</td><td>origin</td></tr></tbody></table><p><strong>添加绘图信息</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Let&#39;s add information concerning the label we are going to add: angle, horizontal adjustement and potential flip calculate the ANGLE of the labels
# 让我们添加有关我们将要添加的标签的信息：角度、水平调整和翻转，计算标签的角度
# 添加id值
vertices$id=NA
myleaves=which(is.na( match(vertices$name, edges$from) ))
nleaves=length(myleaves)
vertices$id[ myleaves ] = seq(1:nleaves)
# 添加角度
vertices$angle= -360 * vertices$id / nleaves
vertices
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 31 × 5</caption><thead><tr><th scope="col">name</th><th scope="col">value</th><th scope="col">group</th><th scope="col">id</th><th scope="col">angle</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>origin </td><td>0.26946595</td><td>NA </td><td>NA</td><td> NA</td></tr><tr><td>group1 </td><td>0.68168456</td><td>origin</td><td>NA</td><td> NA</td></tr><tr><td>group2 </td><td>0.28496969</td><td>origin</td><td>NA</td><td> NA</td></tr><tr><td>group3 </td><td>0.29556769</td><td>origin</td><td>NA</td><td> NA</td></tr><tr><td>group4 </td><td>0.68796411</td><td>origin</td><td>NA</td><td> NA</td></tr><tr><td>group5 </td><td>0.26555169</td><td>origin</td><td>NA</td><td> NA</td></tr><tr><td>subgroup_1 </td><td>0.13447919</td><td>group1</td><td> 1</td><td> -14.4</td></tr><tr><td>subgroup_2 </td><td>0.87993752</td><td>group1</td><td> 2</td><td> -28.8</td></tr><tr><td>subgroup_3 </td><td>0.73281460</td><td>group1</td><td> 3</td><td> -43.2</td></tr><tr><td>subgroup_4 </td><td>0.05199267</td><td>group1</td><td> 4</td><td> -57.6</td></tr><tr><td>subgroup_5 </td><td>0.95072049</td><td>group1</td><td> 5</td><td> -72.0</td></tr><tr><td>subgroup_6 </td><td>0.67968533</td><td>group2</td><td> 6</td><td> -86.4</td></tr><tr><td>subgroup_7 </td><td>0.60904665</td><td>group2</td><td> 7</td><td>-100.8</td></tr><tr><td>subgroup_8 </td><td>0.91107152</td><td>group2</td><td> 8</td><td>-115.2</td></tr><tr><td>subgroup_9 </td><td>0.56348062</td><td>group2</td><td> 9</td><td>-129.6</td></tr><tr><td>subgroup_10</td><td>0.78231794</td><td>group2</td><td>10</td><td>-144.0</td></tr><tr><td>subgroup_11</td><td>0.39831777</td><td>group3</td><td>11</td><td>-158.4</td></tr><tr><td>subgroup_12</td><td>0.39330663</td><td>group3</td><td>12</td><td>-172.8</td></tr><tr><td>subgroup_13</td><td>0.57479330</td><td>group3</td><td>13</td><td>-187.2</td></tr><tr><td>subgroup_14</td><td>0.61543980</td><td>group3</td><td>14</td><td>-201.6</td></tr><tr><td>subgroup_15</td><td>0.05581496</td><td>group3</td><td>15</td><td>-216.0</td></tr><tr><td>subgroup_16</td><td>0.34000915</td><td>group4</td><td>16</td><td>-230.4</td></tr><tr><td>subgroup_17</td><td>0.65765123</td><td>group4</td><td>17</td><td>-244.8</td></tr><tr><td>subgroup_18</td><td>0.63469281</td><td>group4</td><td>18</td><td>-259.2</td></tr><tr><td>subgroup_19</td><td>0.41069057</td><td>group4</td><td>19</td><td>-273.6</td></tr><tr><td>subgroup_20</td><td>0.07418380</td><td>group4</td><td>20</td><td>-288.0</td></tr><tr><td>subgroup_21</td><td>0.23007252</td><td>group5</td><td>21</td><td>-302.4</td></tr><tr><td>subgroup_22</td><td>0.86334833</td><td>group5</td><td>22</td><td>-316.8</td></tr><tr><td>subgroup_23</td><td>0.01567696</td><td>group5</td><td>23</td><td>-331.2</td></tr><tr><td>subgroup_24</td><td>0.53860661</td><td>group5</td><td>24</td><td>-345.6</td></tr><tr><td>subgroup_25</td><td>0.74063768</td><td>group5</td><td>25</td><td>-360.0</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># calculate the alignment of labels: right or left
# 判断标签是偏向左边还是右边
# hjust表示是否水平翻转
vertices$hjust&lt;-ifelse(vertices$angle &lt; -90 &amp; vertices$angle &gt; -270, 1, 0)
 
# flip angle BY to make them readable
# 是否翻转标签
vertices$angle&lt;-ifelse(vertices$angle &lt; -90 &amp; vertices$angle &gt; -270, vertices$angle+180, vertices$angle)
vertices[12:20,]
# Create a graph object
# 创建图
mygraph &lt;- graph_from_data_frame( edges, vertices=vertices )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 9 × 6</caption><thead><tr><th></th><th scope="col">name</th><th scope="col">value</th><th scope="col">group</th><th scope="col">id</th><th scope="col">angle</th><th scope="col">hjust</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">12</th><td>subgroup_6 </td><td>0.6796853</td><td>group2</td><td> 6</td><td>-86.4</td><td>0</td></tr><tr><th scope="row">13</th><td>subgroup_7 </td><td>0.6090466</td><td>group2</td><td> 7</td><td> 79.2</td><td>1</td></tr><tr><th scope="row">14</th><td>subgroup_8 </td><td>0.9110715</td><td>group2</td><td> 8</td><td> 64.8</td><td>1</td></tr><tr><th scope="row">15</th><td>subgroup_9 </td><td>0.5634806</td><td>group2</td><td> 9</td><td> 50.4</td><td>1</td></tr><tr><th scope="row">16</th><td>subgroup_10</td><td>0.7823179</td><td>group2</td><td>10</td><td> 36.0</td><td>1</td></tr><tr><th scope="row">17</th><td>subgroup_11</td><td>0.3983178</td><td>group3</td><td>11</td><td> 21.6</td><td>1</td></tr><tr><th scope="row">18</th><td>subgroup_12</td><td>0.3933066</td><td>group3</td><td>12</td><td> 7.2</td><td>1</td></tr><tr><th scope="row">19</th><td>subgroup_13</td><td>0.5747933</td><td>group3</td><td>13</td><td> -7.2</td><td>1</td></tr><tr><th scope="row">20</th><td>subgroup_14</td><td>0.6154398</td><td>group3</td><td>14</td><td>-21.6</td><td>1</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vertices
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 31 × 6</caption><thead><tr><th scope="col">name</th><th scope="col">value</th><th scope="col">group</th><th scope="col">id</th><th scope="col">angle</th><th scope="col">hjust</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>origin </td><td>0.26946595</td><td>NA </td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>group1 </td><td>0.68168456</td><td>origin</td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>group2 </td><td>0.28496969</td><td>origin</td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>group3 </td><td>0.29556769</td><td>origin</td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>group4 </td><td>0.68796411</td><td>origin</td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>group5 </td><td>0.26555169</td><td>origin</td><td>NA</td><td> NA</td><td>NA</td></tr><tr><td>subgroup_1 </td><td>0.13447919</td><td>group1</td><td> 1</td><td> -14.4</td><td> 0</td></tr><tr><td>subgroup_2 </td><td>0.87993752</td><td>group1</td><td> 2</td><td> -28.8</td><td> 0</td></tr><tr><td>subgroup_3 </td><td>0.73281460</td><td>group1</td><td> 3</td><td> -43.2</td><td> 0</td></tr><tr><td>subgroup_4 </td><td>0.05199267</td><td>group1</td><td> 4</td><td> -57.6</td><td> 0</td></tr><tr><td>subgroup_5 </td><td>0.95072049</td><td>group1</td><td> 5</td><td> -72.0</td><td> 0</td></tr><tr><td>subgroup_6 </td><td>0.67968533</td><td>group2</td><td> 6</td><td> -86.4</td><td> 0</td></tr><tr><td>subgroup_7 </td><td>0.60904665</td><td>group2</td><td> 7</td><td> 79.2</td><td> 1</td></tr><tr><td>subgroup_8 </td><td>0.91107152</td><td>group2</td><td> 8</td><td> 64.8</td><td> 1</td></tr><tr><td>subgroup_9 </td><td>0.56348062</td><td>group2</td><td> 9</td><td> 50.4</td><td> 1</td></tr><tr><td>subgroup_10</td><td>0.78231794</td><td>group2</td><td>10</td><td> 36.0</td><td> 1</td></tr><tr><td>subgroup_11</td><td>0.39831777</td><td>group3</td><td>11</td><td> 21.6</td><td> 1</td></tr><tr><td>subgroup_12</td><td>0.39330663</td><td>group3</td><td>12</td><td> 7.2</td><td> 1</td></tr><tr><td>subgroup_13</td><td>0.57479330</td><td>group3</td><td>13</td><td> -7.2</td><td> 1</td></tr><tr><td>subgroup_14</td><td>0.61543980</td><td>group3</td><td>14</td><td> -21.6</td><td> 1</td></tr><tr><td>subgroup_15</td><td>0.05581496</td><td>group3</td><td>15</td><td> -36.0</td><td> 1</td></tr><tr><td>subgroup_16</td><td>0.34000915</td><td>group4</td><td>16</td><td> -50.4</td><td> 1</td></tr><tr><td>subgroup_17</td><td>0.65765123</td><td>group4</td><td>17</td><td> -64.8</td><td> 1</td></tr><tr><td>subgroup_18</td><td>0.63469281</td><td>group4</td><td>18</td><td> -79.2</td><td> 1</td></tr><tr><td>subgroup_19</td><td>0.41069057</td><td>group4</td><td>19</td><td>-273.6</td><td> 0</td></tr><tr><td>subgroup_20</td><td>0.07418380</td><td>group4</td><td>20</td><td>-288.0</td><td> 0</td></tr><tr><td>subgroup_21</td><td>0.23007252</td><td>group5</td><td>21</td><td>-302.4</td><td> 0</td></tr><tr><td>subgroup_22</td><td>0.86334833</td><td>group5</td><td>22</td><td>-316.8</td><td> 0</td></tr><tr><td>subgroup_23</td><td>0.01567696</td><td>group5</td><td>23</td><td>-331.2</td><td> 0</td></tr><tr><td>subgroup_24</td><td>0.53860661</td><td>group5</td><td>24</td><td>-345.6</td><td> 0</td></tr><tr><td>subgroup_25</td><td>0.74063768</td><td>group5</td><td>25</td><td>-360.0</td><td> 0</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Make the plot
p&lt;-ggraph(mygraph, layout = &#39;dendrogram&#39;, circular = TRUE) + 
    # 设置边
    geom_edge_diagonal(colour=&quot;grey&quot;) +
    # 设置边的颜色
    scale_edge_colour_distiller(palette = &quot;RdPu&quot;) +
    # 设置点的标签
    geom_node_text(aes(x = x*1.15, y=y*1.15, filter = leaf, label=name, angle = angle, hjust=hjust, colour=group), size=2.7, alpha=1) +
    # 设置点的形状
    geom_node_point(aes(filter = leaf, x = x*1.07, y=y*1.07, colour=group, size=value, alpha=0.2)) +
    # 控制颜色
    scale_colour_manual(values= rep( brewer.pal(9,&quot;Paired&quot;) , 30)) +
    scale_size_continuous( range = c(0.1,10) ) +
    theme_void() +
    theme( 
        # 不显示图例
        legend.position=&quot;none&quot;,
        plot.margin=unit(c(0,0,0,0),&quot;cm&quot;),
    ) +
    expand_limits(x = c(-1.3, 1.3), y = c(-1.3, 1.3))
p
# 保存数据 Save at png
ggsave(p, file=&quot;output.png&quot;, width=10, height=10,dpi=300)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_38_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>另外对于标签角度的设置多说几句，不同的平台标签角度设置不一样。标签的角度设置主要有以下三行代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 添加角度
vertices$angle= -360 * vertices$id / nleaves
# hjust表示是否水平翻转
vertices$hjust&lt;-ifelse(vertices$angle &lt; -90 &amp; vertices$angle &gt; -270, 1, 0)
# 是否翻转标签
vertices$angle&lt;-ifelse(vertices$angle &lt; -90 &amp; vertices$angle &gt; -270, vertices$angle+180, vertices$angle)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一行代码指的是给每个标签赋予一个角度值，通常设置这一行，其他两行不设置，或者跳过，图形基本上就会完成。只不过在环形左半边标签是翻转的，就是字朝下。如果要字朝上就设置先水平反正左边的标签，然后180度旋转左边的标签，右边标签不变就行了。</p><p>比如通过第一行我们获得的角度值，subgroup_7到subgroup_18处于左半边，角度其实范围为-90到-270度，所以通过第二行和第三行代码只要设置-90度到-270度的点，水平翻转然后翻转标签就行了。</p><h2 id="_2-聚类结果的树形图-dendrogram-from-clustering-result" tabindex="-1"><a class="header-anchor" href="#_2-聚类结果的树形图-dendrogram-from-clustering-result" aria-hidden="true">#</a> 2 聚类结果的树形图 DENDROGRAM FROM CLUSTERING RESULT.</h2><p>层次聚类是数据科学中的一项常见任务，可以使用R中的hclust()函数来执行。下面的示例将指导您完成整个过程，演示如何准备数据、如何运行聚类以及如何构建适当的图表以可视化其结果。</p><h3 id="_2-1-用r进行聚类的最基本树形图-most-basic-dendrogram-for-clustering-with-r" tabindex="-1"><a class="header-anchor" href="#_2-1-用r进行聚类的最基本树形图-most-basic-dendrogram-for-clustering-with-r" aria-hidden="true">#</a> 2.1 用R进行聚类的最基本树形图 Most basic dendrogram for clustering with R</h3><p>聚类允许通过相似性将样本分组，并且其结果可以可视化为树形图。这篇文章描述了该hclust()函数的基本用法，并根据其输出构建树形图。对于层次聚类树形图有以下极大要素：</p><ul><li>输入数据集是一个矩阵，其中每一行是一个样本，每一列是一个变量。可以使用t()函数转置矩阵。</li><li>聚类是在提供样本之间距离的正方形矩阵（sample x sample）上执行的，距离矩阵可以使用dist()或cor()函数计算，具体取决于您提出的问题</li><li>hclust()函数用于执行分层聚类</li><li>它的输出可以用plot()函数直接可视化。请参阅可能的自定义。</li></ul><p><strong>首先产生数据集</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Dataset 
data &lt;- matrix( sample(seq(1,2000),200), ncol = 10 )
rownames(data) &lt;- paste0(&quot;sample_&quot; , seq(1,20))
colnames(data) &lt;- paste0(&quot;variable&quot;,seq(1,10))
data
dim(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A matrix: 20 × 10 of type int</caption><thead><tr><th></th><th scope="col">variable1</th><th scope="col">variable2</th><th scope="col">variable3</th><th scope="col">variable4</th><th scope="col">variable5</th><th scope="col">variable6</th><th scope="col">variable7</th><th scope="col">variable8</th><th scope="col">variable9</th><th scope="col">variable10</th></tr></thead><tbody><tr><th scope="row">sample_1</th><td> 49</td><td> 863</td><td> 888</td><td> 361</td><td>1285</td><td>1695</td><td> 258</td><td> 821</td><td> 459</td><td>1715</td></tr><tr><th scope="row">sample_2</th><td> 251</td><td> 673</td><td>1096</td><td> 963</td><td>1874</td><td>1837</td><td> 876</td><td>1329</td><td>1565</td><td>1286</td></tr><tr><th scope="row">sample_3</th><td> 156</td><td> 220</td><td> 73</td><td> 726</td><td>1356</td><td>1951</td><td> 108</td><td> 751</td><td>1218</td><td> 823</td></tr><tr><th scope="row">sample_4</th><td>1241</td><td> 363</td><td> 367</td><td>1097</td><td> 847</td><td> 275</td><td>1415</td><td> 582</td><td> 646</td><td> 711</td></tr><tr><th scope="row">sample_5</th><td> 533</td><td>1006</td><td> 440</td><td>1962</td><td> 510</td><td> 70</td><td> 732</td><td> 5</td><td> 584</td><td> 899</td></tr><tr><th scope="row">sample_6</th><td>1443</td><td>1758</td><td> 204</td><td>1216</td><td>1248</td><td> 307</td><td>1072</td><td>1975</td><td> 719</td><td>1776</td></tr><tr><th scope="row">sample_7</th><td> 412</td><td> 8</td><td>1983</td><td> 665</td><td> 197</td><td>1347</td><td> 612</td><td> 656</td><td> 557</td><td> 186</td></tr><tr><th scope="row">sample_8</th><td>1856</td><td>1850</td><td> 548</td><td> 957</td><td> 150</td><td> 296</td><td> 405</td><td>1340</td><td>1088</td><td> 672</td></tr><tr><th scope="row">sample_9</th><td> 994</td><td>1171</td><td> 233</td><td>1656</td><td>1732</td><td> 953</td><td>1651</td><td> 918</td><td> 60</td><td>1676</td></tr><tr><th scope="row">sample_10</th><td> 715</td><td> 272</td><td> 368</td><td> 670</td><td> 688</td><td>1743</td><td> 724</td><td>1956</td><td> 897</td><td>1974</td></tr><tr><th scope="row">sample_11</th><td> 820</td><td>1374</td><td> 934</td><td> 65</td><td> 842</td><td>1269</td><td> 917</td><td> 581</td><td> 324</td><td> 1</td></tr><tr><th scope="row">sample_12</th><td>1692</td><td> 915</td><td> 944</td><td> 824</td><td> 164</td><td> 378</td><td>1439</td><td>1298</td><td> 270</td><td> 389</td></tr><tr><th scope="row">sample_13</th><td> 128</td><td> 707</td><td> 286</td><td> 444</td><td>1893</td><td>1179</td><td> 28</td><td> 778</td><td>1172</td><td> 916</td></tr><tr><th scope="row">sample_14</th><td> 805</td><td>1847</td><td> 308</td><td>1536</td><td>1008</td><td> 236</td><td>1631</td><td> 628</td><td>1943</td><td>1270</td></tr><tr><th scope="row">sample_15</th><td>1585</td><td> 997</td><td>1933</td><td>1135</td><td> 651</td><td>1447</td><td>1598</td><td> 402</td><td>1205</td><td> 339</td></tr><tr><th scope="row">sample_16</th><td> 151</td><td> 216</td><td> 427</td><td> 735</td><td> 773</td><td>1001</td><td> 684</td><td>1700</td><td>1639</td><td>1782</td></tr><tr><th scope="row">sample_17</th><td> 408</td><td>1303</td><td> 449</td><td>1906</td><td>1965</td><td> 752</td><td> 381</td><td>1637</td><td>1894</td><td>1524</td></tr><tr><th scope="row">sample_18</th><td> 257</td><td>1859</td><td>1871</td><td> 81</td><td>1696</td><td>1886</td><td>1774</td><td>1845</td><td> 839</td><td> 152</td></tr><tr><th scope="row">sample_19</th><td> 840</td><td>1240</td><td>1188</td><td> 437</td><td>1125</td><td> 256</td><td> 960</td><td>1401</td><td> 193</td><td>1552</td></tr><tr><th scope="row">sample_20</th><td>1902</td><td>1087</td><td>1112</td><td>1481</td><td> 353</td><td> 407</td><td> 199</td><td> 71</td><td> 547</td><td> 404</td></tr></tbody></table><ol class="list-inline"><li>20</li><li>10</li></ol><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Euclidean distance
# 计算欧式距离
dist &lt;- dist(data[ , c(4:8)] , diag=TRUE)

# Hierarchical Clustering with hclust
# 分层聚类
hc &lt;- hclust(dist)

# Plot the result
plot(hc)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_44_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>对于层次聚类主要有以下几个原则：</p><ul><li>基于目标之间的距离。</li><li>寻找两个目标之间的最小距离。</li><li>将两个目标对象聚合在一个簇中。</li><li>用目标群的中心进行计算。直到只有一个簇包含每个点。</li></ul><h3 id="_2-2-放大分支-zoom-on-a-group" tabindex="-1"><a class="header-anchor" href="#_2-2-放大分支-zoom-on-a-group" aria-hidden="true">#</a> 2.2 放大分支 Zoom on a group</h3><p>我们可以放大树的特定部分。使用[[ ]]运算符选择感兴趣的枝条。例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 将上面的树形图存入dhc
dhc &lt;- as.dendrogram(hc)
dhc[[1]] 表示从上到下第一层，其中从左往右第一个枝条
dhc[[2]][[2]] 表示从上到下第二层，其中从左往右第二个枝条
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面代码，所示展示2.1节所画层次树第一层右边部分分支</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># store the dedrogram in an object
# 保存聚类结果为dhc变量
dhc &lt;- as.dendrogram(hc)

# set the margin
par(mar=c(4,4,2,2))
# 打印会告诉你分支情况
print(dhc[[2]])
# Plot the Second group
# 绘图
plot(dhc[[2]] , main= &quot;zoom on a part of the dendrogram&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;dendrogram&#39; with 2 branches and 14 members total, at height 2795.492 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_48_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>下面代码，所示展示2.1节所画层次树第一层右边部分的第二个分支</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># store the dedrogram in an object
dhc &lt;- as.dendrogram(hc)

# set the margin
par(mar=c(4,4,2,2))

print(dhc[[2]][[1]])
# Plot the Second group
plot(dhc[[2]][[1]] , main= &quot;zoom on a part of the dendrogram&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;dendrogram&#39; with 2 branches and 9 members total, at height 2107.407 
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_50_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-绘制带颜色和图例的树形图-dendrogram-with-color-and-legend-in-r" tabindex="-1"><a class="header-anchor" href="#_2-3-绘制带颜色和图例的树形图-dendrogram-with-color-and-legend-in-r" aria-hidden="true">#</a> 2.3 绘制带颜色和图例的树形图 Dendrogram with color and legend in R</h3><p>本节主要讲述基本树状图的自定义。展示了如何为叶子和样本名称添加特定的颜色。它允许检查在聚类之后是否确实找到了预期的类。</p><p><strong>首先生成数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Build dataset (just copy and paste, this is NOT interesting)
# 生成数据，可以跳过
sample &lt;- paste(rep(&quot;sample_&quot;,24) , seq(1,24) , sep=&quot;&quot;)
specie &lt;- c(rep(&quot;dicoccoides&quot; , 8) , rep(&quot;dicoccum&quot; , 8) , rep(&quot;durum&quot; , 8))
treatment &lt;- rep(c(rep(&quot;High&quot;,4 ) , rep(&quot;Low&quot;,4)),3)
data &lt;- data.frame(sample,specie,treatment)
for (i in seq(1:5)){
      gene=sample(c(1:40) , 24 )
      data=cbind(data , gene)
      colnames(data)[ncol(data)]=paste(&quot;gene_&quot;,i,sep=&quot;&quot;)
     }
data[data$treatment==&quot;High&quot; , c(4:8)]=data[data$treatment==&quot;High&quot; , c(4:8)]+100
data[data$specie==&quot;durum&quot; , c(4:8)]=data[data$specie==&quot;durum&quot; , c(4:8)]-30
rownames(data) &lt;- data[,1]    
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 8</caption><thead><tr><th></th><th scope="col">sample</th><th scope="col">specie</th><th scope="col">treatment</th><th scope="col">gene_1</th><th scope="col">gene_2</th><th scope="col">gene_3</th><th scope="col">gene_4</th><th scope="col">gene_5</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">sample_1</th><td>sample_1</td><td>dicoccoides</td><td>High</td><td>126</td><td>133</td><td>110</td><td>111</td><td>135</td></tr><tr><th scope="row">sample_2</th><td>sample_2</td><td>dicoccoides</td><td>High</td><td>130</td><td>130</td><td>111</td><td>121</td><td>113</td></tr><tr><th scope="row">sample_3</th><td>sample_3</td><td>dicoccoides</td><td>High</td><td>124</td><td>135</td><td>115</td><td>125</td><td>140</td></tr><tr><th scope="row">sample_4</th><td>sample_4</td><td>dicoccoides</td><td>High</td><td>111</td><td>109</td><td>135</td><td>135</td><td>132</td></tr><tr><th scope="row">sample_5</th><td>sample_5</td><td>dicoccoides</td><td>Low </td><td> 20</td><td> 34</td><td> 9</td><td> 17</td><td> 37</td></tr><tr><th scope="row">sample_6</th><td>sample_6</td><td>dicoccoides</td><td>Low </td><td> 32</td><td> 26</td><td> 21</td><td> 1</td><td> 24</td></tr></tbody></table><p><strong>然后聚类</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Compute Euclidean distance between samples
dist=dist(data[ , c(4:8)] , diag=TRUE)

# Perfor clustering with hclust
# 聚类并保存结果
hc &lt;- hclust(dist)
dhc &lt;- as.dendrogram(hc)
dhc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;dendrogram&#39; with 2 branches and 24 members total, at height 328.8632 
</code></pre><p>对于每个节点都有自己的属性</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Actually, each leaf of the tree has several attributes, like the color, the shape.. Have a look to it: 
# 选择特别的节点
specific_leaf &lt;- dhc[[1]][[1]][[1]]
specific_leaf
attributes(specific_leaf)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;dendrogram&#39; with 2 branches and 2 members total, at height 23.81176 
</code></pre><dl><dt>$members</dt><dd>2</dd><dt>$midpoint</dt><dd>0.5</dd><dt>$height</dt><dd>23.8117617995813</dd><dt>$class</dt><dd>&#39;dendrogram&#39;</dd></dl><p><strong>创建改变叶子节点属性函数</strong></p><p>如果想给树的每片叶子上色，必须改变每片叶子的属性。这可以使用dendrapply函数来完成。因此，创建了一个函数，向叶子节点添加属性。如果应用自己的数据，改变treatment和specie的值就行了。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>i=0
colLab&lt;-function(n)
{
    # 判断是否为节点
    if(is.leaf(n))
    {
        # 获得节点的属性
        a=attributes(n)
        
        # I deduce the line in the original data, and so the treatment and the specie.
        # 获得该点的信息
        ligne=match(attributes(n)$label,data[,1])
        # 根据自己的结果设置
        treatment=data[ligne,3];
            if(treatment==&quot;Low&quot;){col_treatment=&quot;blue&quot;};if(treatment==&quot;High&quot;){col_treatment=&quot;red&quot;}
        # 根据种类设置颜色，根据自己的结果设置
        specie=data[ligne,2];
            if(specie==&quot;dicoccoides&quot;){col_specie=&quot;red&quot;};if(specie==&quot;dicoccum&quot;){col_specie=&quot;Darkgreen&quot;};if(specie==&quot;durum&quot;){col_specie=&quot;blue&quot;}
        
        # M odification of leaf attribute
        # 修改节点的属性
        attr(n,&quot;nodePar&quot;)&lt;-c(a$nodePar,list(cex=1.5,lab.cex=1,pch=20,col=col_treatment,lab.col=col_specie,lab.font=1,lab.cex=1))
        }
    return(n)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 应用函数
dL &lt;- dendrapply(dhc, colLab)
 
# And the plot
plot(dL , main=&quot;structure of the population&quot;)
# 图例
legend(&quot;topright&quot;,
     # 文字
     legend = c(&quot;High Nitrogen&quot; , &quot;Low Nitrogen&quot; , &quot;Durum&quot; , &quot;Dicoccoides&quot; , &quot;Dicoccum&quot;), 
     # 颜色
     col = c(&quot;red&quot;, &quot;blue&quot; , &quot;blue&quot; , &quot;red&quot; , &quot;Darkgreen&quot;), 
     pch = c(20,20,4,4,4), bty = &quot;n&quot;,  pt.cex = 1.5, cex = 0.8 , 
     text.col = &quot;black&quot;, horiz = FALSE, inset = c(0, 0.1))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_61_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-使用dendextend绘制树形图-more-customization-with-dendextend" tabindex="-1"><a class="header-anchor" href="#_3-使用dendextend绘制树形图-more-customization-with-dendextend" aria-hidden="true">#</a> 3 使用DENDEXTEND绘制树形图 MORE CUSTOMIZATION WITH DENDEXTEND</h2><p>dendextend主要是自定义层次聚类图，对第二节的补充。dendextend包允许在树状图定制方面更进一步。这里有一组例子展示了主要的可能性，比如在底部添加颜色条，面对面绘制2棵树等等。</p><h3 id="_3-1-基础树形图绘制-basic-dendrogram" tabindex="-1"><a class="header-anchor" href="#_3-1-基础树形图绘制-basic-dendrogram" aria-hidden="true">#</a> 3.1 基础树形图绘制 Basic dendrogram</h3><p>DENDEXTEND首先需要绘制如下最基本的树形图，然后进行相应更改</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Library
library(tidyverse)
 
# Data
head(mtcars)
 
# Clusterisation using 3 variables
# 聚类，使用管道
mtcars %&gt;% 
  select(mpg, cyl, disp) %&gt;% 
  dist() %&gt;% 
  hclust() %&gt;% 
  as.dendrogram() -&gt; dend
 
# Plot
# 绘图
par(mar=c(7,3,1,1))  # Increase bottom margin to have the complete label
plot(dend)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 11</caption><thead><tr><th></th><th scope="col">mpg</th><th scope="col">cyl</th><th scope="col">disp</th><th scope="col">hp</th><th scope="col">drat</th><th scope="col">wt</th><th scope="col">qsec</th><th scope="col">vs</th><th scope="col">am</th><th scope="col">gear</th><th scope="col">carb</th></tr><tr><th></th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">Mazda RX4</th><td>21.0</td><td>6</td><td>160</td><td>110</td><td>3.90</td><td>2.620</td><td>16.46</td><td>0</td><td>1</td><td>4</td><td>4</td></tr><tr><th scope="row">Mazda RX4 Wag</th><td>21.0</td><td>6</td><td>160</td><td>110</td><td>3.90</td><td>2.875</td><td>17.02</td><td>0</td><td>1</td><td>4</td><td>4</td></tr><tr><th scope="row">Datsun 710</th><td>22.8</td><td>4</td><td>108</td><td> 93</td><td>3.85</td><td>2.320</td><td>18.61</td><td>1</td><td>1</td><td>4</td><td>1</td></tr><tr><th scope="row">Hornet 4 Drive</th><td>21.4</td><td>6</td><td>258</td><td>110</td><td>3.08</td><td>3.215</td><td>19.44</td><td>1</td><td>0</td><td>3</td><td>1</td></tr><tr><th scope="row">Hornet Sportabout</th><td>18.7</td><td>8</td><td>360</td><td>175</td><td>3.15</td><td>3.440</td><td>17.02</td><td>0</td><td>0</td><td>3</td><td>2</td></tr><tr><th scope="row">Valiant</th><td>18.1</td><td>6</td><td>225</td><td>105</td><td>2.76</td><td>3.460</td><td>20.22</td><td>1</td><td>0</td><td>3</td><td>1</td></tr></tbody></table><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_64_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-set函数-the-set-function" tabindex="-1"><a class="header-anchor" href="#_3-2-set函数-the-set-function" aria-hidden="true">#</a> 3.2 set函数 The set() function</h3><p>dendextend的set()函数允许修改树的特定部分的属性。例如，您可以为分支和标签自定义cex、lwd、col、lty。也可以自定义节点或叶。下面的代码说明了这一概念：</p><p><strong>自定义树枝和标签</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(dendextend)

# 绘图dend是设置函数
dend %&gt;% 
    # Custom branches
    # 自定义树枝的颜色
    set(&quot;branches_col&quot;, &quot;red&quot;) %&gt;% 
    # 自定义树枝宽度
    set(&quot;branches_lwd&quot;, 3) %&gt;%
    # Custom labels
    # 自定义标签颜色
    set(&quot;labels_col&quot;, &quot;blue&quot;) %&gt;% 
    # 自定义标签字体大小
    set(&quot;labels_cex&quot;, 0.8) %&gt;%
    plot()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_67_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>自定义树枝节点</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>dend %&gt;% 
    # 自定义树枝节点形状
    set(&quot;nodes_pch&quot;, 20)  %&gt;% 
    # 自定义树枝节点大小
    set(&quot;nodes_cex&quot;, 1.5) %&gt;% 
    # 自定义树枝节点颜色
    set(&quot;nodes_col&quot;, &quot;red&quot;) %&gt;% 
    plot()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_69_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>自定义叶子</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>dend %&gt;% 
    # 最后一层节点形状
    set(&quot;leaves_pch&quot;, 22)  %&gt;% 
    # 最后一层节点宽度
    set(&quot;leaves_cex&quot;, 1) %&gt;%
    # 最后一层节点颜色
    set(&quot;leaves_col&quot;, &quot;red&quot;) %&gt;% 
    plot()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_71_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-3-聚类结果突出-highlight-clusters" tabindex="-1"><a class="header-anchor" href="#_3-3-聚类结果突出-highlight-clusters" aria-hidden="true">#</a> 3.3 聚类结果突出 Highlight clusters</h3><p>dendextend库有一些很好的功能来突出树簇。可以根据分支的簇属性为分支和标签上色，指定所需的簇数。这个 rect.dendrogram()函数甚至允许用矩形突出显示一个或多个特定的簇。</p><p><strong>基于颜色突出聚类结果</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
par(mar=c(1,1,1,7))
dend %&gt;%
    # 根据第一层分支结果自定义标签颜色
    set(&quot;labels_col&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k=3) %&gt;%
    # 根据第一层分支结果自定义分支颜色
    set(&quot;branches_k_color&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k = 3) %&gt;%
    # horize是否水平放置,axes是否显示旁边的距离尺
    plot(horiz=TRUE, axes=FALSE)
# 画线条，v高度，lty线条类型
abline(v = 350, lty = 2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_74_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>基于矩形框突出聚类结果</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 使用
par(mar=c(9,1,1,1))
dend %&gt;%
    set(&quot;labels_col&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k=3) %&gt;%
    set(&quot;branches_k_color&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k = 3) %&gt;%
    plot(axes=FALSE)
# 画矩形框
# k表示将类切割为k个簇，lty矩形框线条类型，lwd矩形框线条宽度，col填充颜色,x表示从第几个类开始画簇
rect.dendrogram( dend, k=3, lty = 2, lwd = 5, x=17, col=rgb(0.1, 0.2, 0.4, 0.1) ) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_76_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-4-与预期的聚类结果相比较-comparing-with-an-expected-clustering" tabindex="-1"><a class="header-anchor" href="#_3-4-与预期的聚类结果相比较-comparing-with-an-expected-clustering" aria-hidden="true">#</a> 3.4 与预期的聚类结果相比较 Comparing with an expected clustering</h3><p>将得到的集群与预期的分布进行比较是一项常见的任务。在我们用来构建树状图的mtcars数据集中，有一个am列是一个二进制变量。如果我们可以用cluster()函数来检查与这个变量是否一致。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
# Create a vector of colors, darkgreen if am is 0, green if 1.
# 获得数据，如果am为0就是forestgreen颜色
my_colors &lt;- ifelse(mtcars$am==0, &quot;forestgreen&quot;, &quot;green&quot;)
 
# Make the dendrogram
# 设置图像空白区域
par(mar=c(10,1,1,1))
dend %&gt;%
    set(&quot;labels_col&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k=3) %&gt;%
    set(&quot;branches_k_color&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k = 3) %&gt;%
    set(&quot;leaves_pch&quot;, 19)  %&gt;% 
    set(&quot;nodes_cex&quot;, 0.7) %&gt;% 
    plot(axes=FALSE,horiz =FALSE)
 
# Add the colored bar
# 添加颜色bar
# colors颜色，dend聚类图，rowLabels名字
colored_bars(colors = my_colors, dend = dend, rowLabels = &quot;am&quot;,horiz =FALSE)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_78_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-5-基于tanglegram-比较2个树状图-comparing-2-dendrograms-with-tanglegram" tabindex="-1"><a class="header-anchor" href="#_3-5-基于tanglegram-比较2个树状图-comparing-2-dendrograms-with-tanglegram" aria-hidden="true">#</a> 3.5 基于tanglegram()比较2个树状图 Comparing 2 dendrograms with tanglegram()</h3><p>可以使用tanglegram()函数比较两个树状图。这里它说明了一个非常重要的概念：当你计算你的距离矩阵和当你运行你的层次聚类算法时，你不能简单地使用默认选项而不考虑你在做什么。看看两种不同的集群化方法之间的区别吧。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Make 2 dendrograms, using 2 different clustering methods
# 使用两种完全不同的聚类方法
d1 &lt;- USArrests %&gt;% dist() %&gt;% hclust( method=&quot;average&quot; ) %&gt;% as.dendrogram()
d2 &lt;- USArrests %&gt;% dist() %&gt;% hclust( method=&quot;complete&quot; ) %&gt;% as.dendrogram()
 
# Custom these kendo, and place them in a list
# 定制树列表
dl &lt;- dendlist(
  d1 %&gt;% 
    set(&quot;labels_col&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k=3) %&gt;%
    set(&quot;branches_lty&quot;, 1) %&gt;%
    set(&quot;branches_k_color&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k = 3),
  d2 %&gt;% 
    set(&quot;labels_col&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k=3) %&gt;%
    set(&quot;branches_lty&quot;, 1) %&gt;%
    set(&quot;branches_k_color&quot;, value = c(&quot;skyblue&quot;, &quot;orange&quot;, &quot;grey&quot;), k = 3)
)
 
# Plot them together
tanglegram(dl, 
            # 子树是否带颜色
            common_subtrees_color_lines = FALSE, 
            # 是否突出显示边
            highlight_distinct_edges  = TRUE, 
            # 是否突出分支
            highlight_branches_lwd=FALSE, 
            # 两个树的距离
            margin_inner=7,
            # 两个树之间线条宽度
            lwd=2
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现树形图的绘制/output_80_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,163),b={href:"https://www.r-graph-gallery.com/dendrogram.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/luohenyj/article/details/97949476",target:"_blank",rel:"noopener noreferrer"};function f(q,y){const e=n("ExternalLinkIcon");return a(),s("div",null,[u,t("p",null,[d("树状图（或树形图）是一种网络结构。它由一个根节点组成，根节点产生由边或分支连接的多个节点。层次结构的最后一个节点称为叶。本文主要基于R语言实现树形图的绘制。关于python实现树形图的绘制见："),t("a",c,[d("基于matplotlib实现树形图的绘制"),i(e)])]),g,p,t("p",null,[d("本文主要参考："),t("a",v,[d("Dendrogram"),i(e)])]),t("p",null,[d("本文所有代码见："),t("a",m,[d("R-Study-Notes"),i(e)])]),h,t("ul",null,[t("li",null,[t("a",b,[d("Dendrogram"),i(e)])]),t("li",null,[t("a",_,[d("基于matplotlib实现树形图的绘制"),i(e)])])])])}const w=r(o,[["render",f],["__file","2020-09-05-_R语言_ 基于R语言实现树形图的绘制.html.vue"]]);export{w as default};
