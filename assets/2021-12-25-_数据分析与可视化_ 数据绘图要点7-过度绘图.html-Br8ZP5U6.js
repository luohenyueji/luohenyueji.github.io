import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as d,c as l,a as e,b as s,d as r,e as t}from"./app-MsA2k2kn.js";const o={},u=t(`<h1 id="数据分析与可视化-数据绘图要点7-过度绘图" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点7-过度绘图" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点7-过度绘图</h1><p>过度绘图是数据绘图中的一个常见问题。当您的数据集很大时，散点图的点往往会重叠，使图形不可读。在这篇文章中，将给出多种解决方法来避免过度绘图。</p><h2 id="过度绘图实例" tabindex="-1"><a class="header-anchor" href="#过度绘图实例" aria-hidden="true">#</a> 过度绘图实例</h2><p>下面的散点图中说明了过度绘图存在的问题。乍一看可能会得出这样的结论：X 和 Y 之间没有明显的关系。但后续我们将证明这个结论是多么错误。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## ## 加载库
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

## Dataset:
a &lt;- data.frame( x=rnorm(20000, 10, 1.2), y=rnorm(20000, 10, 1.2), group=rep(&quot;A&quot;,20000))
b &lt;- data.frame( x=rnorm(20000, 14.5, 1.2), y=rnorm(20000, 14.5, 1.2), group=rep(&quot;B&quot;,20000))
c &lt;- data.frame( x=rnorm(20000, 9.5, 1.5), y=rnorm(20000, 15.5, 1.5), group=rep(&quot;C&quot;,20000))
## 拼接数据
data &lt;- do.call(rbind, list(a,b,c))               

## 绘图
ggplot(data,aes(x=x, y=y)) +
geom_point(color=&quot;#69b3a2&quot;, size=2) +
theme(
  legend.position=&quot;none&quot;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_2_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h2><h3 id="减少点的尺寸" tabindex="-1"><a class="header-anchor" href="#减少点的尺寸" aria-hidden="true">#</a> 减少点的尺寸</h3><p>最简单的解决方法可能是减少点的尺寸，它可以提供非常令人满意的结果。在这里可以清楚地看到存在3个集群，这在上图中被隐藏了。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data,aes(x=x, y=y)) +
## 减少点的尺寸
geom_point(color=&quot;#69b3a2&quot;, size=0.02) +
theme(
  legend.position=&quot;none&quot;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="透明度" tabindex="-1"><a class="header-anchor" href="#透明度" aria-hidden="true">#</a> 透明度</h3><p>结合减小点的大小，使用透明度还可以进一步解决过度绘图问题。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data,aes(x=x, y=y)) +
## 设置透明度
geom_point(color=&quot;#69b3a2&quot;, size=2, alpha=0.01) +
theme(
  legend.position=&quot;none&quot;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2维密度图" tabindex="-1"><a class="header-anchor" href="#_2维密度图" aria-hidden="true">#</a> 2维密度图</h3><p>二维密度图基本上计算二维空间特定区域内的观察次数，并用颜色表示此计数，可以清晰看出点的分布情况</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘制2维密度图
ggplot(data, aes(x=x, y=y) ) +
  stat_density_2d(aes(fill = ..density..), geom = &quot;raster&quot;, contour = FALSE) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  scale_fill_viridis() +
  theme(
    legend.position=&#39;none&#39;
  )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_8_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="数据采样" tabindex="-1"><a class="header-anchor" href="#数据采样" aria-hidden="true">#</a> 数据采样</h3><p>有时少即是多。仅绘制一小部分数据（此处为 5%）可以大大减少计算时间并有助于避免过度绘制：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>sample_data &lt;- sample_frac(data, 0.05)
ggplot(sample_data, aes(x=x, y=y)) +
geom_point(color=&quot;#69b3a2&quot;, size=2) +
theme(
  legend.position=&quot;none&quot;
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="突出显示特定组" tabindex="-1"><a class="header-anchor" href="#突出显示特定组" aria-hidden="true">#</a> 突出显示特定组</h3><p>降低图形复杂性的另一种方法是突出显示特定组。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot( data,aes(x=x, y=y)) +
geom_point(color=&quot;grey&quot;, size=2) +
## 突出显示组B
geom_point(data = data %&gt;% filter(group==&quot;B&quot;), color=&quot;#69b3a2&quot;, size=2) +
theme(
  legend.position=&quot;none&quot;,
  plot.title = element_text(size=12)
) +
ggtitle(&#39;Behavior of the group B&#39;) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="分组" tabindex="-1"><a class="header-anchor" href="#分组" aria-hidden="true">#</a> 分组</h3><p>如果数据有分组的话，可以用不同颜色表示不同组的点。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data, aes(x=x, y=y, color=group)) +
geom_point( size=2, alpha=0.1) +
scale_color_viridis(discrete=TRUE) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_14_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="分图" tabindex="-1"><a class="header-anchor" href="#分图" aria-hidden="true">#</a> 分图</h3><p>一旦您的图中有多个组，另一种方法是使用分图，每次突出显示一个组。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data, aes(x=x, y=y)) +
## 画突出显示类别的点
geom_point( aes( color=group) , size=2, alpha=0.1) +
## 画不突出显示类别的点
geom_point( data=data %&gt;% select(-group), size=1, alpha=0.05, color=&quot;grey&quot;) +
scale_color_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;,
) +
## 分图
facet_wrap(~group)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="三维图" tabindex="-1"><a class="header-anchor" href="#三维图" aria-hidden="true">#</a> 三维图</h3><p>使用三维图来显示密度，在这种情况下，各组的位置变得明显。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>library(plotly)
library(MASS)

kd &lt;- with(data, MASS::kde2d(x, y, n = 50))

plot_ly(x = kd$x, y = kd$y, z = kd$z) %&gt;% add_surface()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="边缘分布" tabindex="-1"><a class="header-anchor" href="#边缘分布" aria-hidden="true">#</a> 边缘分布</h3><p>添加边缘分布允许您检测隐藏在图形过度绘制部分中的分布。您可以在边缘中添加箱形图、直方图或密度图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggExtra)

## 创建散点图
p &lt;- ggplot(data, aes(x=x, y=y)) +
    geom_point(color=&quot;#69b3a2&quot;, size=2, alpha=0.01) +
    theme(
      legend.position=&quot;none&quot;
    )

## 添加边缘直方图
ggExtra::ggMarginal(p, type = &quot;histogram&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点7-过度绘图/output_19_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,43),c={href:"https://www.data-to-viz.com/caveat/overplotting.html",target:"_blank",rel:"noopener noreferrer"};function v(g,m){const i=a("ExternalLinkIcon");return d(),l("div",null,[u,e("ul",null,[e("li",null,[e("a",c,[s("HOW TO AVOID OVERPLOTTING"),r(i)])])])])}const h=n(o,[["render",v],["__file","2021-12-25-_数据分析与可视化_ 数据绘图要点7-过度绘图.html.vue"]]);export{h as default};
