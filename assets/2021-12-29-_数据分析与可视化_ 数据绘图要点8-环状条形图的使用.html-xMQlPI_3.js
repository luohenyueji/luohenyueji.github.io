import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as l,c as r,a as e,b as a,d as n,e as s}from"./app-MsA2k2kn.js";const o={},u=s(`<h1 id="数据分析与可视化-数据绘图要点8-环状条形图的使用" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点8-环状条形图的使用" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点8-环状条形图的使用</h1><p>环状条形图RADIAL BAR CHARTS是指用极坐标而不是笛卡尔平面绘制的条形图，RADIAL BAR CHARTS没有规定的中文翻译，有些人翻译为环状条形图，有些人翻译为径向条形图。</p><h2 id="绘图实例" tabindex="-1"><a class="header-anchor" href="#绘图实例" aria-hidden="true">#</a> 绘图实例</h2><p>下图是显示2017年某一商品前6大国家的出口数量。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 导入库
library(tidyverse)
library(hrbrthemes)

## 加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv&quot;, header=TRUE, sep=&quot;,&quot;)
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">Country</th><th scope="col">Value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>United States </td><td>12394</td></tr><tr><th scope="row">2</th><td>Russia </td><td> 6148</td></tr><tr><th scope="row">3</th><td>Germany (FRG) </td><td> 1653</td></tr><tr><th scope="row">4</th><td>France </td><td> 2162</td></tr><tr><th scope="row">5</th><td>United Kingdom</td><td> 1214</td></tr><tr><th scope="row">6</th><td>China </td><td> 1131</td></tr></tbody></table><p>51</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 删除空值数据
data &lt;-filter(data,!is.na(Value))
## 数据从小到大排序
data &lt;-arrange(data,Value)
## 提取尾部6位数据
data &lt;-tail(data,6)
## 建立数据表
data &lt;-mutate(data,Country=factor(Country, Country))
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">Country</th><th scope="col">Value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">33</th><td>United Kingdom</td><td> 1214</td></tr><tr><th scope="row">34</th><td>Israel </td><td> 1263</td></tr><tr><th scope="row">35</th><td>Germany (FRG) </td><td> 1653</td></tr><tr><th scope="row">36</th><td>France </td><td> 2162</td></tr><tr><th scope="row">37</th><td>Russia </td><td> 6148</td></tr><tr><th scope="row">38</th><td>United States </td><td>12394</td></tr></tbody></table><p>6</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
ggplot(data, aes(x=Country, y=Value) ) +
geom_bar(fill=&quot;#69b3a2&quot;, stat=&quot;identity&quot;) +
geom_text(hjust = 1, size = 3, aes( y = 0, label = paste(Country,&quot; &quot;))) +
theme(
  panel.grid.minor.y = element_blank(),
  panel.grid.major.y = element_blank(),
  legend.position=&quot;none&quot;,
  axis.text = element_blank()
) +
xlab(&quot;&quot;) +
ylab(&quot;&quot;) +
## 使用极坐标
coord_polar(theta = &quot;y&quot;) +
ylim(0,15000) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点8-环状条形图的使用/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>显而易见这种图形的优点是非常引人注目。但是，由于条形图绘制在极轴的不同径向点上，因此它们具有不同的半径，无法通过长度进行比较。此图上还存在其他问题，如缺少Y轴。具体原因如下图所示。下图中如果想要知道第一幅环状条形图中各个条形数值关系，一般都是通过条形长度来判断。但是条形拉伸成弧长时会发生变形，导致比较结果为第二幅所示，但是实际各个条形数值关系结果为第三幅图。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img8_1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h2><p>如果很关注数据量的展示，我们可以给环状条形图添加数值标签或者使用条形图，棒棒糖图。</p><h3 id="添加数值标签" tabindex="-1"><a class="header-anchor" href="#添加数值标签" aria-hidden="true">#</a> 添加数值标签</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
ggplot(data, aes(x=Country, y=Value) ) +
geom_bar(fill=&quot;#69b3a2&quot;, stat=&quot;identity&quot;) +
geom_text(hjust = 1, size = 3, aes( y = 0, label = paste(Country,&quot; &quot;,Value,&quot; &quot;))) +
theme(
  panel.grid.minor.y = element_blank(),
  panel.grid.major.y = element_blank(),
  legend.position=&quot;none&quot;,
  axis.text = element_blank()
) +
xlab(&quot;&quot;) +
ylab(&quot;&quot;) +
## 使用极坐标
coord_polar(theta = &quot;y&quot;) +
ylim(0,15000) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点8-环状条形图的使用/output_8_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="棒棒糖图" tabindex="-1"><a class="header-anchor" href="#棒棒糖图" aria-hidden="true">#</a> 棒棒糖图</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data, aes(x=Country, y=Value) ) +
## 画线
geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color=&quot;grey&quot;) +
geom_point(size=3, color=&quot;#69b3a2&quot;) +
## 翻转轴
coord_flip() +
theme(
  panel.grid.minor.y = element_blank(),
  panel.grid.major.y = element_blank(),
  legend.position=&quot;none&quot;
) +
xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点8-环状条形图的使用/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,23),c={href:"https://www.data-to-viz.com/caveat/circular_barplot_accordeon.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.visualisingdata.com/2017/09/problems-barc-charts/",target:"_blank",rel:"noopener noreferrer"};function m(h,b){const t=d("ExternalLinkIcon");return l(),r("div",null,[u,e("ul",null,[e("li",null,[e("a",c,[a("MIND THE RADIAL BAR CHARTS"),n(t)])]),e("li",null,[e("a",v,[a("problems-barc-charts"),n(t)])])])])}const _=i(o,[["render",m],["__file","2021-12-29-_数据分析与可视化_ 数据绘图要点8-环状条形图的使用.html.vue"]]);export{_ as default};
