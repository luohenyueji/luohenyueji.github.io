import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as e,c as o,a as n,d as c,b as s,e as l}from"./app-MsA2k2kn.js";const i={},u=n("h1",{id:"python-networkx实例",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-networkx实例","aria-hidden":"true"},"#"),s(" [python] NetworkX实例")],-1),r={href:"https://github.com/luohenyueji/Python-Study-Notes/blob/master/Plot%20Items/NetworkX%E5%AE%9E%E4%BE%8B.ipynb",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"代码下载地址",-1),d=n("br",null,null,-1),m=l(`<ol><li>基础Basic</li><li>绘图Drawing</li><li>图标Graph</li></ol><p>本文参考：</p><blockquote><p>https://networkx.github.io/documentation/stable/auto_examples/index.html</p></blockquote><h2 id="_1-基础basic" tabindex="-1"><a class="header-anchor" href="#_1-基础basic" aria-hidden="true">#</a> 1. 基础Basic</h2><ul><li>读写图 Read and write graphs</li><li>属性 Properties</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 读写图 Read and write graphs</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token comment">#    Copyright (C) 2004-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token comment"># 生成网格</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>grid_2d_graph<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment"># 5x5 grid</span>

<span class="token comment"># print the adjacency list</span>
<span class="token comment"># 打印网络</span>
<span class="token keyword">for</span> line <span class="token keyword">in</span> nx<span class="token punctuation">.</span>generate_adjlist<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>
<span class="token comment"># write edgelist to grid.edgelist</span>
<span class="token comment"># 写数据</span>
<span class="token comment">#nx.write_edgelist(G, path=&quot;grid.edgelist&quot;, delimiter=&quot;:&quot;)</span>
<span class="token comment"># read edgelist from grid.edgelist</span>
<span class="token comment"># 读数据</span>
<span class="token comment">#H = nx.read_edgelist(path=&quot;grid.edgelist&quot;, delimiter=&quot;:&quot;)</span>

nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(0, 0) (1, 0) (0, 1)
(0, 1) (1, 1) (0, 2)
(0, 2) (1, 2) (0, 3)
(0, 3) (1, 3) (0, 4)
(0, 4) (1, 4)
(1, 0) (2, 0) (1, 1)
(1, 1) (2, 1) (1, 2)
(1, 2) (2, 2) (1, 3)
(1, 3) (2, 3) (1, 4)
(1, 4) (2, 4)
(2, 0) (3, 0) (2, 1)
(2, 1) (3, 1) (2, 2)
(2, 2) (3, 2) (2, 3)
(2, 3) (3, 3) (2, 4)
(2, 4) (3, 4)
(3, 0) (4, 0) (3, 1)
(3, 1) (4, 1) (3, 2)
(3, 2) (4, 2) (3, 3)
(3, 3) (4, 3) (3, 4)
(3, 4) (4, 4)
(4, 0) (4, 1)
(4, 1) (4, 2)
(4, 2) (4, 3)
(4, 3) (4, 4)
(4, 4)
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yXzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 属性 Properties</span>

<span class="token comment">#    Copyright (C) 2004-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> networkx <span class="token keyword">import</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>lollipop_graph<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>

pathlengths <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;source vertex {target:length, }&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> v <span class="token keyword">in</span> G<span class="token punctuation">.</span>nodes<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    spl <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>single_source_shortest_path_length<span class="token punctuation">(</span>G<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{} {} &#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> spl<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> p <span class="token keyword">in</span> spl<span class="token punctuation">:</span>
        pathlengths<span class="token punctuation">.</span>append<span class="token punctuation">(</span>spl<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;average shortest path length %s&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">(</span>pathlengths<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">len</span><span class="token punctuation">(</span>pathlengths<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># histogram of path lengths</span>
dist <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">for</span> p <span class="token keyword">in</span> pathlengths<span class="token punctuation">:</span>
    <span class="token keyword">if</span> p <span class="token keyword">in</span> dist<span class="token punctuation">:</span>
        dist<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        dist<span class="token punctuation">[</span>p<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;length #paths&quot;</span><span class="token punctuation">)</span>
verts <span class="token operator">=</span> dist<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> d <span class="token keyword">in</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>verts<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;%s %d&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>d<span class="token punctuation">,</span> dist<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;radius: %d&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>radius<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;diameter: %d&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>diameter<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;eccentricity: %s&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>eccentricity<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;center: %s&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>center<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;periphery: %s&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>periphery<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;density: %s&quot;</span> <span class="token operator">%</span> nx<span class="token punctuation">.</span>density<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>

nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>source vertex {target:length, }
0 {0: 0, 1: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7} 
1 {1: 0, 0: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7} 
2 {2: 0, 0: 1, 1: 1, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7} 
3 {3: 0, 0: 1, 1: 1, 2: 1, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6} 
4 {4: 0, 5: 1, 3: 1, 6: 2, 0: 2, 1: 2, 2: 2, 7: 3, 8: 4, 9: 5} 
5 {5: 0, 4: 1, 6: 1, 3: 2, 7: 2, 0: 3, 1: 3, 2: 3, 8: 3, 9: 4} 
6 {6: 0, 5: 1, 7: 1, 4: 2, 8: 2, 3: 3, 9: 3, 0: 4, 1: 4, 2: 4} 
7 {7: 0, 6: 1, 8: 1, 5: 2, 9: 2, 4: 3, 3: 4, 0: 5, 1: 5, 2: 5} 
8 {8: 0, 7: 1, 9: 1, 6: 2, 5: 3, 4: 4, 3: 5, 0: 6, 1: 6, 2: 6} 
9 {9: 0, 8: 1, 7: 2, 6: 3, 5: 4, 4: 5, 3: 6, 0: 7, 1: 7, 2: 7} 

average shortest path length 2.86

length #paths
0 10
1 24
2 16
3 14
4 12
5 10
6 8
7 6
radius: 4
diameter: 7
eccentricity: {0: 7, 1: 7, 2: 7, 3: 6, 4: 5, 5: 4, 6: 4, 7: 5, 8: 6, 9: 7}
center: [5, 6]
periphery: [0, 1, 2, 9]
density: 0.26666666666666666
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8zXzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-绘图drawing" tabindex="-1"><a class="header-anchor" href="#_2-绘图drawing" aria-hidden="true">#</a> 2. 绘图Drawing</h2><ul><li>简单路径Simple Path</li><li>节点颜色Node Colormap</li><li>边的颜色 Edge Colormap</li><li>带颜色的房子 House With Colors</li><li>环形树Circular Tree</li><li>等级排列Degree Rank</li><li>谱嵌入Spectral Embedding</li><li>四宫格Four Grids</li><li>自我中心网络Ego Graph</li><li>度直方图Degree histogram</li><li>随机几何图形Random Geometric Graph</li><li>加权图Weighted Graph</li><li>有向图Directed Graph</li><li>标签和颜色Labels And Colors</li><li>最大连通分支Giant Component</li><li>地图集Atlas</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 简单路径Simple Path</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>path_graph<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF81XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 节点颜色Node Colormap</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>cycle_graph<span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span>
<span class="token comment"># 设置排列位置，iterations迭代次数</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">,</span> iterations<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">)</span>
<span class="token comment"># node_color节点颜色</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">800</span><span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Blues<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF82XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 边的颜色 Edge Colormap</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>star_graph<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
colors <span class="token operator">=</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token comment"># edge_color边的颜色</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;#A0CBE2&#39;</span><span class="token punctuation">,</span> edge_color<span class="token operator">=</span>colors<span class="token punctuation">,</span>
        width<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">,</span> edge_cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Blues<span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF83XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 带颜色的房子 House With Colors</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>house_graph<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># explicitly set positions</span>
pos <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token number">1</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token number">2</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token number">3</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
       <span class="token number">4</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">}</span>

<span class="token comment"># 画节点</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">2000</span><span class="token punctuation">,</span> nodelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">3000</span><span class="token punctuation">,</span> nodelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 画线条</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF84XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 环形树Circular Tree</span>
<span class="token comment"># 管理员权限下 pip install pydot</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx
<span class="token keyword">import</span> pydot
<span class="token keyword">from</span> networkx<span class="token punctuation">.</span>drawing<span class="token punctuation">.</span>nx_pydot <span class="token keyword">import</span> graphviz_layout

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>balanced_tree<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
<span class="token comment"># 设置环形布置</span>
pos <span class="token operator">=</span> graphviz_layout<span class="token punctuation">(</span>G<span class="token punctuation">,</span> prog<span class="token operator">=</span><span class="token string">&#39;twopi&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span>figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&quot;blue&quot;</span><span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF85XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 等级排列Degree Rank</span>

<span class="token comment"># Author: Aric Hagberg &lt;aric.hagberg@gmail.com&gt;</span>
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>gnp_random_graph<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">)</span>

degree_sequence <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span><span class="token punctuation">[</span>d <span class="token keyword">for</span> n<span class="token punctuation">,</span> d <span class="token keyword">in</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment"># print &quot;Degree sequence&quot;, degree_sequence</span>
dmax <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span>degree_sequence<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>loglog<span class="token punctuation">(</span>degree_sequence<span class="token punctuation">,</span> <span class="token string">&#39;b-&#39;</span><span class="token punctuation">,</span> marker<span class="token operator">=</span><span class="token string">&#39;o&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;Degree rank plot&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&quot;degree&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&quot;rank&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># draw graph in inset</span>
plt<span class="token punctuation">.</span>axes<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.45</span><span class="token punctuation">,</span> <span class="token number">0.45</span><span class="token punctuation">,</span> <span class="token number">0.45</span><span class="token punctuation">,</span> <span class="token number">0.45</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
Gcc <span class="token operator">=</span> G<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>connected_components<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token builtin">len</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>Gcc<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>Gcc<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>Gcc<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.4</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xMF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 谱嵌入Spectral Embedding</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx


options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;node_color&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;C0&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;node_size&#39;</span><span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>grid_2d_graph<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">332</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">334</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">335</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">336</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">337</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">338</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

G<span class="token punctuation">.</span>remove_edge<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">339</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_spectral<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xMV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 四宫格Four Grids</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token comment">#    Copyright (C) 2004-2019</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token comment"># 生成四宫格点</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>grid_2d_graph<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>  <span class="token comment"># 4x4 grid</span>

<span class="token comment"># 点排列</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">,</span> iterations<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">221</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> font_size<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">222</span><span class="token punctuation">)</span>
<span class="token comment"># node_color节点的颜色</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;k&#39;</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">223</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;g&#39;</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">250</span><span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token number">224</span><span class="token punctuation">)</span>
<span class="token comment"># 设置为有向图</span>
H <span class="token operator">=</span> G<span class="token punctuation">.</span>to_directed<span class="token punctuation">(</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>H<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xMl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 自我中心网络Ego Graph</span>

<span class="token comment"># Author:  Drew Conway (drew.conway@nyu.edu)</span>

<span class="token keyword">from</span> operator <span class="token keyword">import</span> itemgetter

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment"># Create a BA model graph</span>
    n <span class="token operator">=</span> <span class="token number">1000</span>
    m <span class="token operator">=</span> <span class="token number">2</span>
    G <span class="token operator">=</span> nx<span class="token punctuation">.</span>generators<span class="token punctuation">.</span>barabasi_albert_graph<span class="token punctuation">(</span>n<span class="token punctuation">,</span> m<span class="token punctuation">)</span>
    <span class="token comment"># find node with largest degree</span>
    node_and_degree <span class="token operator">=</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">(</span>largest_hub<span class="token punctuation">,</span> degree<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>node_and_degree<span class="token punctuation">,</span> key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token comment"># Create ego graph of main hub</span>
    hub_ego <span class="token operator">=</span> nx<span class="token punctuation">.</span>ego_graph<span class="token punctuation">(</span>G<span class="token punctuation">,</span> largest_hub<span class="token punctuation">)</span>
    <span class="token comment"># Draw graph</span>
    pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>hub_ego<span class="token punctuation">)</span>
    nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>hub_ego<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    <span class="token comment"># Draw ego as large and red</span>
    nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>hub_ego<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> nodelist<span class="token operator">=</span><span class="token punctuation">[</span>largest_hub<span class="token punctuation">]</span><span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xM18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 度直方图Degree histogram</span>

<span class="token keyword">import</span> collections
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>gnp_random_graph<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">0.02</span><span class="token punctuation">)</span>

degree_sequence <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span><span class="token punctuation">[</span>d <span class="token keyword">for</span> n<span class="token punctuation">,</span> d <span class="token keyword">in</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>  <span class="token comment"># degree sequence</span>
<span class="token comment"># print &quot;Degree sequence&quot;, degree_sequence</span>
degreeCount <span class="token operator">=</span> collections<span class="token punctuation">.</span>Counter<span class="token punctuation">(</span>degree_sequence<span class="token punctuation">)</span>
deg<span class="token punctuation">,</span> cnt <span class="token operator">=</span> <span class="token builtin">zip</span><span class="token punctuation">(</span><span class="token operator">*</span>degreeCount<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

fig<span class="token punctuation">,</span> ax <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>bar<span class="token punctuation">(</span>deg<span class="token punctuation">,</span> cnt<span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">0.80</span><span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;Degree Histogram&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&quot;Count&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&quot;Degree&quot;</span><span class="token punctuation">)</span>
ax<span class="token punctuation">.</span>set_xticks<span class="token punctuation">(</span><span class="token punctuation">[</span>d <span class="token operator">+</span> <span class="token number">0.4</span> <span class="token keyword">for</span> d <span class="token keyword">in</span> deg<span class="token punctuation">]</span><span class="token punctuation">)</span>
ax<span class="token punctuation">.</span>set_xticklabels<span class="token punctuation">(</span>deg<span class="token punctuation">)</span>

<span class="token comment"># draw graph in inset</span>
plt<span class="token punctuation">.</span>axes<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
Gcc <span class="token operator">=</span> G<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>connected_components<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token builtin">len</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.4</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xNF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 随机几何图形Random Geometric Graph</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>random_geometric_graph<span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">0.125</span><span class="token punctuation">)</span>
<span class="token comment"># position is stored as node attribute data for random_geometric_graph</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>get_node_attributes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token string">&#39;pos&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># find node near center (0.5,0.5)</span>
dmin <span class="token operator">=</span> <span class="token number">1</span>
ncenter <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">for</span> n <span class="token keyword">in</span> pos<span class="token punctuation">:</span>
    x<span class="token punctuation">,</span> y <span class="token operator">=</span> pos<span class="token punctuation">[</span>n<span class="token punctuation">]</span>
    d <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span>y <span class="token operator">-</span> <span class="token number">0.5</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">2</span>
    <span class="token keyword">if</span> d <span class="token operator">&lt;</span> dmin<span class="token punctuation">:</span>
        ncenter <span class="token operator">=</span> n
        dmin <span class="token operator">=</span> d

<span class="token comment"># color by path length from node near center</span>
p <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>single_source_shortest_path_length<span class="token punctuation">(</span>G<span class="token punctuation">,</span> ncenter<span class="token punctuation">)</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span>figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> nodelist<span class="token operator">=</span><span class="token punctuation">[</span>ncenter<span class="token punctuation">]</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.4</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> nodelist<span class="token operator">=</span><span class="token builtin">list</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                       node_size<span class="token operator">=</span><span class="token number">80</span><span class="token punctuation">,</span>
                       node_color<span class="token operator">=</span><span class="token builtin">list</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                       cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Reds_r<span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>xlim<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.05</span><span class="token punctuation">,</span> <span class="token number">1.05</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylim<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.05</span><span class="token punctuation">,</span> <span class="token number">1.05</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xNV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 加权图Weighted Graph</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>Graph<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 确定边</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.6</span><span class="token punctuation">)</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">)</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.1</span><span class="token punctuation">)</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.7</span><span class="token punctuation">)</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.9</span><span class="token punctuation">)</span>
G<span class="token punctuation">.</span>add_edge<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> weight<span class="token operator">=</span><span class="token number">0.3</span><span class="token punctuation">)</span>

<span class="token comment"># 长边 权重大于0.5</span>
elarge <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token keyword">for</span> <span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token keyword">in</span> G<span class="token punctuation">.</span>edges<span class="token punctuation">(</span>data<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> <span class="token keyword">if</span> d<span class="token punctuation">[</span><span class="token string">&#39;weight&#39;</span><span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token number">0.5</span><span class="token punctuation">]</span>
<span class="token comment"># 短边 权重小于0.5</span>
esmall <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token keyword">for</span> <span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">,</span> d<span class="token punctuation">)</span> <span class="token keyword">in</span> G<span class="token punctuation">.</span>edges<span class="token punctuation">(</span>data<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span> <span class="token keyword">if</span> d<span class="token punctuation">[</span><span class="token string">&#39;weight&#39;</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">0.5</span><span class="token punctuation">]</span>

<span class="token comment"># 设置位置</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>  <span class="token comment"># positions for all nodes</span>

<span class="token comment"># nodes</span>
<span class="token comment"># 画节点</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span><span class="token number">700</span><span class="token punctuation">)</span>

<span class="token comment"># edges</span>
<span class="token comment"># 画边</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> edgelist<span class="token operator">=</span>elarge<span class="token punctuation">,</span>width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span>
<span class="token comment"># style边的样式</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> edgelist<span class="token operator">=</span>esmall<span class="token punctuation">,</span>width<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> edge_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> style<span class="token operator">=</span><span class="token string">&#39;dashed&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># labels</span>
<span class="token comment"># 画标签</span>
nx<span class="token punctuation">.</span>draw_networkx_labels<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> font_size<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">,</span> font_family<span class="token operator">=</span><span class="token string">&#39;sans-serif&#39;</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xNl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 有向图Directed Graph</span>

<span class="token comment"># Author: Rodrigo Dorantes-Gilardi (rodgdor@gmail.com)</span>

<span class="token keyword">import</span> matplotlib <span class="token keyword">as</span> mpl
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>generators<span class="token punctuation">.</span>directed<span class="token punctuation">.</span>random_k_out_graph<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">)</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>

node_sizes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span> <span class="token operator">+</span> <span class="token number">10</span> <span class="token operator">*</span> i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
M <span class="token operator">=</span> G<span class="token punctuation">.</span>number_of_edges<span class="token punctuation">(</span><span class="token punctuation">)</span>
edge_colors <span class="token operator">=</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> M <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>
edge_alphas <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">+</span> i<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>M <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>M<span class="token punctuation">)</span><span class="token punctuation">]</span>

nodes <span class="token operator">=</span> nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span>node_sizes<span class="token punctuation">,</span> node_color<span class="token operator">=</span><span class="token string">&#39;blue&#39;</span><span class="token punctuation">)</span>
edges <span class="token operator">=</span> nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> node_size<span class="token operator">=</span>node_sizes<span class="token punctuation">,</span> arrowstyle<span class="token operator">=</span><span class="token string">&#39;-&gt;&#39;</span><span class="token punctuation">,</span>
                               arrowsize<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> edge_color<span class="token operator">=</span>edge_colors<span class="token punctuation">,</span>
                               edge_cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Blues<span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment"># set alpha value for each edge</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>M<span class="token punctuation">)</span><span class="token punctuation">:</span>
    edges<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>set_alpha<span class="token punctuation">(</span>edge_alphas<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

pc <span class="token operator">=</span> mpl<span class="token punctuation">.</span>collections<span class="token punctuation">.</span>PatchCollection<span class="token punctuation">(</span>edges<span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Blues<span class="token punctuation">)</span>
pc<span class="token punctuation">.</span>set_array<span class="token punctuation">(</span>edge_colors<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>colorbar<span class="token punctuation">(</span>pc<span class="token punctuation">)</span>

ax <span class="token operator">=</span> plt<span class="token punctuation">.</span>gca<span class="token punctuation">(</span><span class="token punctuation">)</span>
ax<span class="token punctuation">.</span>set_axis_off<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xN18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 标签和颜色Labels And Colors</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token comment"># 生成立体图</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>cubical_graph<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 确定位置</span>
pos <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>  <span class="token comment"># positions for all nodes</span>

<span class="token comment"># nodes</span>
<span class="token comment"># 画节点</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                       nodelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                       node_color<span class="token operator">=</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>
                       node_size<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span>
                       alpha<span class="token operator">=</span><span class="token number">0.8</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_nodes<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                       nodelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                       node_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span>
                       node_size<span class="token operator">=</span><span class="token number">500</span><span class="token punctuation">,</span>
                       alpha<span class="token operator">=</span><span class="token number">0.8</span><span class="token punctuation">)</span>

<span class="token comment"># edges</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> width<span class="token operator">=</span><span class="token number">1.0</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                       edgelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                       width<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> edge_color<span class="token operator">=</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>
nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                       edgelist<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                       width<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">,</span> alpha<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">,</span> edge_color<span class="token operator">=</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>


<span class="token comment"># some math labels</span>
labels <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
labels<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$a$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$b$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$c$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$d$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$\\alpha$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$\\beta$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$\\gamma$&#39;</span>
labels<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">r&#39;$\\delta$&#39;</span>
<span class="token comment"># 填写标签</span>
nx<span class="token punctuation">.</span>draw_networkx_labels<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span> labels<span class="token punctuation">,</span> font_size<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">)</span>

plt<span class="token punctuation">.</span>axis<span class="token punctuation">(</span><span class="token string">&#39;off&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xOF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 最大连通分支Giant Component </span>

<span class="token comment">#    Copyright (C) 2006-2019</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> math

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> pygraphviz
    <span class="token keyword">from</span> networkx<span class="token punctuation">.</span>drawing<span class="token punctuation">.</span>nx_agraph <span class="token keyword">import</span> graphviz_layout
    layout <span class="token operator">=</span> graphviz_layout
<span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">import</span> pydot
        <span class="token keyword">from</span> networkx<span class="token punctuation">.</span>drawing<span class="token punctuation">.</span>nx_pydot <span class="token keyword">import</span> graphviz_layout
        layout <span class="token operator">=</span> graphviz_layout
    <span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;PyGraphviz and pydot not found;\\n&quot;</span>
              <span class="token string">&quot;drawing with spring layout;\\n&quot;</span>
              <span class="token string">&quot;will be slow.&quot;</span><span class="token punctuation">)</span>
        layout <span class="token operator">=</span> nx<span class="token punctuation">.</span>spring_layout


n <span class="token operator">=</span> <span class="token number">150</span>  <span class="token comment"># 150 nodes</span>
<span class="token comment"># p value at which giant component (of size log(n) nodes) is expected</span>
p_giant <span class="token operator">=</span> <span class="token number">1.0</span> <span class="token operator">/</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># p value at which graph is expected to become completely connected</span>
p_conn <span class="token operator">=</span> math<span class="token punctuation">.</span>log<span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">float</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>

<span class="token comment"># the following range of p values should be close to the threshold</span>
pvals <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0.003</span><span class="token punctuation">,</span> <span class="token number">0.006</span><span class="token punctuation">,</span> <span class="token number">0.008</span><span class="token punctuation">,</span> <span class="token number">0.015</span><span class="token punctuation">]</span>

region <span class="token operator">=</span> <span class="token number">220</span>  <span class="token comment"># for pylab 2x2 subplot layout</span>
plt<span class="token punctuation">.</span>subplots_adjust<span class="token punctuation">(</span>left<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> right<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> bottom<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> top<span class="token operator">=</span><span class="token number">0.95</span><span class="token punctuation">,</span> wspace<span class="token operator">=</span><span class="token number">0.01</span><span class="token punctuation">,</span> hspace<span class="token operator">=</span><span class="token number">0.01</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> p <span class="token keyword">in</span> pvals<span class="token punctuation">:</span>
    G <span class="token operator">=</span> nx<span class="token punctuation">.</span>binomial_graph<span class="token punctuation">(</span>n<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
    pos <span class="token operator">=</span> layout<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
    region <span class="token operator">+=</span> <span class="token number">1</span>
    plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span>region<span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;p = %6.3f&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span>
    nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
            with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
            node_size<span class="token operator">=</span><span class="token number">10</span>
           <span class="token punctuation">)</span>
    <span class="token comment"># identify largest connected component</span>
    Gcc <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>connected_components<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token builtin">len</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    G0 <span class="token operator">=</span> G<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span>Gcc<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G0<span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                           with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
                           edge_color<span class="token operator">=</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>
                           width<span class="token operator">=</span><span class="token number">6.0</span>
                          <span class="token punctuation">)</span>
    <span class="token comment"># show other connected components</span>
    <span class="token keyword">for</span> Gi <span class="token keyword">in</span> Gcc<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>Gi<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">:</span>
            nx<span class="token punctuation">.</span>draw_networkx_edges<span class="token punctuation">(</span>G<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span>Gi<span class="token punctuation">)</span><span class="token punctuation">,</span> pos<span class="token punctuation">,</span>
                                   with_labels<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>
                                   edge_color<span class="token operator">=</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>
                                   alpha<span class="token operator">=</span><span class="token number">0.3</span><span class="token punctuation">,</span>
                                   width<span class="token operator">=</span><span class="token number">5.0</span>
                                  <span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8xOV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 地图集Atlas</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token comment">#    Copyright (C) 2004-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> random

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> pygraphviz
    <span class="token keyword">from</span> networkx<span class="token punctuation">.</span>drawing<span class="token punctuation">.</span>nx_agraph <span class="token keyword">import</span> graphviz_layout
<span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">import</span> pydot
        <span class="token keyword">from</span> networkx<span class="token punctuation">.</span>drawing<span class="token punctuation">.</span>nx_pydot <span class="token keyword">import</span> graphviz_layout
    <span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> ImportError<span class="token punctuation">(</span><span class="token string">&quot;This example needs Graphviz and either &quot;</span>
                          <span class="token string">&quot;PyGraphviz or pydot.&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx
<span class="token keyword">from</span> networkx<span class="token punctuation">.</span>algorithms<span class="token punctuation">.</span>isomorphism<span class="token punctuation">.</span>isomorph <span class="token keyword">import</span> graph_could_be_isomorphic <span class="token keyword">as</span> isomorphic
<span class="token keyword">from</span> networkx<span class="token punctuation">.</span>generators<span class="token punctuation">.</span>atlas <span class="token keyword">import</span> graph_atlas_g


<span class="token keyword">def</span> <span class="token function">atlas6</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; Return the atlas of all connected graphs of 6 nodes or less.
        Attempt to check for isomorphisms and remove.
    &quot;&quot;&quot;</span>

    Atlas <span class="token operator">=</span> graph_atlas_g<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">208</span><span class="token punctuation">]</span>  <span class="token comment"># 208</span>
    <span class="token comment"># remove isolated nodes, only connected graphs are left</span>
    U <span class="token operator">=</span> nx<span class="token punctuation">.</span>Graph<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># graph for union of all graphs in atlas</span>
    <span class="token keyword">for</span> G <span class="token keyword">in</span> Atlas<span class="token punctuation">:</span>
        zerodegree <span class="token operator">=</span> <span class="token punctuation">[</span>n <span class="token keyword">for</span> n <span class="token keyword">in</span> G <span class="token keyword">if</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> n <span class="token keyword">in</span> zerodegree<span class="token punctuation">:</span>
            G<span class="token punctuation">.</span>remove_node<span class="token punctuation">(</span>n<span class="token punctuation">)</span>
        U <span class="token operator">=</span> nx<span class="token punctuation">.</span>disjoint_union<span class="token punctuation">(</span>U<span class="token punctuation">,</span> G<span class="token punctuation">)</span>

    <span class="token comment"># iterator of graphs of all connected components</span>
    C <span class="token operator">=</span> <span class="token punctuation">(</span>U<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token keyword">for</span> c <span class="token keyword">in</span> nx<span class="token punctuation">.</span>connected_components<span class="token punctuation">(</span>U<span class="token punctuation">)</span><span class="token punctuation">)</span>

    UU <span class="token operator">=</span> nx<span class="token punctuation">.</span>Graph<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># do quick isomorphic-like check, not a true isomorphism checker</span>
    nlist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  <span class="token comment"># list of nonisomorphic graphs</span>
    <span class="token keyword">for</span> G <span class="token keyword">in</span> C<span class="token punctuation">:</span>
        <span class="token comment"># check against all nonisomorphic graphs so far</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> iso<span class="token punctuation">(</span>G<span class="token punctuation">,</span> nlist<span class="token punctuation">)</span><span class="token punctuation">:</span>
            nlist<span class="token punctuation">.</span>append<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
            UU <span class="token operator">=</span> nx<span class="token punctuation">.</span>disjoint_union<span class="token punctuation">(</span>UU<span class="token punctuation">,</span> G<span class="token punctuation">)</span>  <span class="token comment"># union the nonisomorphic graphs</span>
    <span class="token keyword">return</span> UU


<span class="token keyword">def</span> <span class="token function">iso</span><span class="token punctuation">(</span>G1<span class="token punctuation">,</span> glist<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Quick and dirty nonisomorphism checker used to check isomorphisms.&quot;&quot;&quot;</span>
    <span class="token keyword">for</span> G2 <span class="token keyword">in</span> glist<span class="token punctuation">:</span>
        <span class="token keyword">if</span> isomorphic<span class="token punctuation">(</span>G1<span class="token punctuation">,</span> G2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>
    <span class="token keyword">return</span> <span class="token boolean">False</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    G <span class="token operator">=</span> atlas6<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;graph has %d nodes with %d edges&quot;</span>
          <span class="token operator">%</span> <span class="token punctuation">(</span>nx<span class="token punctuation">.</span>number_of_nodes<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">,</span> nx<span class="token punctuation">.</span>number_of_edges<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>number_connected_components<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;connected components&quot;</span><span class="token punctuation">)</span>

    plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># layout graphs with positions using graphviz neato</span>
    pos <span class="token operator">=</span> graphviz_layout<span class="token punctuation">(</span>G<span class="token punctuation">,</span> prog<span class="token operator">=</span><span class="token string">&quot;neato&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># color nodes the same in each connected subgraph</span>
    C <span class="token operator">=</span> <span class="token punctuation">(</span>G<span class="token punctuation">.</span>subgraph<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token keyword">for</span> c <span class="token keyword">in</span> nx<span class="token punctuation">.</span>connected_components<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> g <span class="token keyword">in</span> C<span class="token punctuation">:</span>
        c <span class="token operator">=</span> <span class="token punctuation">[</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">*</span> nx<span class="token punctuation">.</span>number_of_nodes<span class="token punctuation">(</span>g<span class="token punctuation">)</span>  <span class="token comment"># random color...</span>
        nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>g<span class="token punctuation">,</span>
                pos<span class="token punctuation">,</span>
                node_size<span class="token operator">=</span><span class="token number">40</span><span class="token punctuation">,</span>
                node_color<span class="token operator">=</span>c<span class="token punctuation">,</span>
                vmin<span class="token operator">=</span><span class="token number">0.0</span><span class="token punctuation">,</span>
                vmax<span class="token operator">=</span><span class="token number">1.0</span><span class="token punctuation">,</span>
                with_labels<span class="token operator">=</span><span class="token boolean">False</span>
               <span class="token punctuation">)</span>
    plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>graph has 779 nodes with 1073 edges
137 connected components
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yMF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h1 id="_3-图标graph" tabindex="-1"><a class="header-anchor" href="#_3-图标graph" aria-hidden="true">#</a> 3. 图标Graph</h1><ul><li>空手道俱乐部Karate Club</li><li>ER随机图Erdos Renyi</li><li>度序列Degree Sequence</li><li>足球football</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 空手道俱乐部Karate Club</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

<span class="token comment"># 俱乐部数据</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>karate_club_graph<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Node Degree&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> v <span class="token keyword">in</span> G<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;%s %s&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>v<span class="token punctuation">,</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 画环形，其中节点表示会员</span>
nx<span class="token punctuation">.</span>draw_circular<span class="token punctuation">(</span>G<span class="token punctuation">,</span> with_labels<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Node Degree
0 16
1 9
2 10
3 6
4 3
5 4
6 4
7 4
8 5
9 2
10 3
11 1
12 2
13 5
14 2
15 2
16 2
17 2
18 2
19 3
20 2
21 2
22 2
23 5
24 3
25 3
26 2
27 4
28 3
29 4
30 4
31 6
32 12
33 17
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yMl8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## ER随机图Erdos Renyi</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token comment">#    Copyright (C) 2004-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> networkx <span class="token keyword">import</span> nx

n <span class="token operator">=</span> <span class="token number">10</span>  <span class="token comment"># 10 nodes</span>
m <span class="token operator">=</span> <span class="token number">20</span>  <span class="token comment"># 20 edges</span>

G <span class="token operator">=</span> nx<span class="token punctuation">.</span>gnm_random_graph<span class="token punctuation">(</span>n<span class="token punctuation">,</span> m<span class="token punctuation">)</span>

<span class="token comment"># some properties</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;node degree clustering&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> v <span class="token keyword">in</span> nx<span class="token punctuation">.</span>nodes<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;%s %d %f&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>v<span class="token punctuation">,</span> nx<span class="token punctuation">.</span>degree<span class="token punctuation">(</span>G<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">,</span> nx<span class="token punctuation">.</span>clustering<span class="token punctuation">(</span>G<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># print the adjacency list</span>
<span class="token keyword">for</span> line <span class="token keyword">in</span> nx<span class="token punctuation">.</span>generate_adjlist<span class="token punctuation">(</span>G<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>

nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>node degree clustering
0 2 1.000000
1 2 0.000000
2 3 0.333333
3 5 0.500000
4 5 0.500000
5 3 0.333333
6 4 0.500000
7 5 0.400000
8 5 0.300000
9 6 0.466667
0 9 8
1 7 6
2 4 5 8
3 7 4 9 5 6
4 6 9 7
5 8
6 9
7 9 8
8 9
9
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yM18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 度序列Degree Sequence</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>
<span class="token comment"># Date: 2004-11-03 08:11:09 -0700 (Wed, 03 Nov 2004)</span>
<span class="token comment"># Revision: 503</span>

<span class="token comment">#    Copyright (C) 2004-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> networkx <span class="token keyword">import</span> nx

z <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>nx<span class="token punctuation">.</span>is_graphical<span class="token punctuation">(</span>z<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Configuration model&quot;</span><span class="token punctuation">)</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>configuration_model<span class="token punctuation">(</span>z<span class="token punctuation">)</span>  <span class="token comment"># configuration model</span>
degree_sequence <span class="token operator">=</span> <span class="token punctuation">[</span>d <span class="token keyword">for</span> n<span class="token punctuation">,</span> d <span class="token keyword">in</span> G<span class="token punctuation">.</span>degree<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  <span class="token comment"># degree sequence</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Degree sequence %s&quot;</span> <span class="token operator">%</span> degree_sequence<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Degree histogram&quot;</span><span class="token punctuation">)</span>
hist <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">for</span> d <span class="token keyword">in</span> degree_sequence<span class="token punctuation">:</span>
    <span class="token keyword">if</span> d <span class="token keyword">in</span> hist<span class="token punctuation">:</span>
        hist<span class="token punctuation">[</span>d<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        hist<span class="token punctuation">[</span>d<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;degree #nodes&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> d <span class="token keyword">in</span> hist<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;%d %d&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>d<span class="token punctuation">,</span> hist<span class="token punctuation">[</span>d<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>True
Configuration model
Degree sequence [5, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1]
Degree histogram
degree #nodes
5 1
3 4
2 3
1 3
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yNF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 足球football</span>

<span class="token comment"># Author: Aric Hagberg (hagberg@lanl.gov)</span>

<span class="token comment">#    Copyright (C) 2007-2019 by</span>
<span class="token comment">#    Aric Hagberg &lt;hagberg@lanl.gov&gt;</span>
<span class="token comment">#    Dan Schult &lt;dschult@colgate.edu&gt;</span>
<span class="token comment">#    Pieter Swart &lt;swart@lanl.gov&gt;</span>
<span class="token comment">#    All rights reserved.</span>
<span class="token comment">#    BSD license.</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>  <span class="token comment"># Python 3.x</span>
    <span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request <span class="token keyword">as</span> urllib
<span class="token keyword">except</span> ImportError<span class="token punctuation">:</span>  <span class="token comment"># Python 2.x</span>
    <span class="token keyword">import</span> urllib
<span class="token keyword">import</span> io
<span class="token keyword">import</span> zipfile

<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> networkx <span class="token keyword">as</span> nx

url <span class="token operator">=</span> <span class="token string">&quot;http://www-personal.umich.edu/~mejn/netdata/football.zip&quot;</span>

sock <span class="token operator">=</span> urllib<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span>url<span class="token punctuation">)</span>  <span class="token comment"># open URL</span>
s <span class="token operator">=</span> io<span class="token punctuation">.</span>BytesIO<span class="token punctuation">(</span>sock<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># read into BytesIO &quot;file&quot;</span>
sock<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

zf <span class="token operator">=</span> zipfile<span class="token punctuation">.</span>ZipFile<span class="token punctuation">(</span>s<span class="token punctuation">)</span>  <span class="token comment"># zipfile object</span>
txt <span class="token operator">=</span> zf<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;football.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># read info file</span>
gml <span class="token operator">=</span> zf<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;football.gml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># read gml data</span>
<span class="token comment"># throw away bogus first line with # from mejn files</span>
gml <span class="token operator">=</span> gml<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
G <span class="token operator">=</span> nx<span class="token punctuation">.</span>parse_gml<span class="token punctuation">(</span>gml<span class="token punctuation">)</span>  <span class="token comment"># parse gml data</span>

<span class="token comment">#print(txt)</span>
<span class="token comment"># print degree for each team - number of games</span>
<span class="token comment">#for n, d in G.degree():</span>
<span class="token comment">#    print(&#39;%s %d&#39; % (n, d))</span>

options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;node_color&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;black&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;node_size&#39;</span><span class="token punctuation">:</span> <span class="token number">50</span><span class="token punctuation">,</span>
    <span class="token string">&#39;line_color&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;grey&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;linewidths&#39;</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token string">&#39;width&#39;</span><span class="token punctuation">:</span> <span class="token number">0.1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
nx<span class="token punctuation">.</span>draw<span class="token punctuation">(</span>G<span class="token punctuation">,</span> <span class="token operator">**</span>options<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvTmV0d29ya1glMjBFeGFtcGxlL291dHB1dF8yNV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure>`,59);function v(b,g){const a=t("ExternalLinkIcon");return e(),o("div",null,[u,n("p",null,[n("a",r,[k,c(a)]),d,s(" NetworkX 2.4版本的通用示例性示例。本教程介绍了约定和基本的图形操作。具体章节内容如下：")]),m])}const w=p(i,[["render",v],["__file","2019-10-31-_python_ NetworkX实例.html.vue"]]);export{w as default};
