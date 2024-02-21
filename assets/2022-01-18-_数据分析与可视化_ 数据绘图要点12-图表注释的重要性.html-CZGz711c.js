import{_ as l,r as t,o as s,c as r,a as e,b as n,d as a,e as d}from"./app-CD_-ggd_.js";const u={},E=d(`<h1 id="数据分析与可视化-数据绘图要点12-图表注释的重要性" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点12-图表注释的重要性"><span>[数据分析与可视化] 数据绘图要点12-图表注释的重要性</span></a></h1><p>图表注释是数据可视化的关键组成部分。它可以将枯燥的图形变成一种有趣且富有洞察力的信息传达方式。我们目前在网上看东西的注意力平均不到五秒。因此，如果您无法在五秒钟内吸引某人的注意力，那么您可能已经失去了观众。添加准确的注释可以极大地帮助吸引观众的注意力。使用关键字、形状、颜色和其他视觉效果来帮助他们直奔主题。注释是一个通用概念，存在数百种不同的图表注释方法，具体使用取决于实际内容，让我们来看看几个例子。</p><h2 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1"><span>示例 1</span></a></h2><p>绘制折线图时的主要危险是最终会得到意大利面条图：太多的组通常会导致图表混乱，很难读取任何有效信息，如下图所示。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## Libraries
library(tidyverse)
library(hrbrthemes)
library(babynames)
library(viridis)

## 读取数据
data &lt;- babynames %&gt;% 
  filter(name %in% c(&quot;Mary&quot;,&quot;Emma&quot;, &quot;Ida&quot;, &quot;Ashley&quot;, &quot;Amanda&quot;, &quot;Jessica&quot;,    &quot;Patricia&quot;, &quot;Linda&quot;, &quot;Deborah&quot;,   &quot;Dorothy&quot;, &quot;Betty&quot;, &quot;Helen&quot;)) %&gt;%
  filter(sex==&quot;F&quot;)

## 绘图
data %&gt;%
  ggplot( aes(x=year, y=n, group=name, color=name)) +
    geom_line() +
    scale_color_viridis(discrete = TRUE) +
    theme(
      legend.position=&quot;none&quot;,
      plot.title = element_text(size=14)
    ) +
    ggtitle(&quot;A spaghetti chart of baby names popularity&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_2_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>您可能想突出您的主要观点，而不是向您的观众展示此图形。那么只展示某个变量数据更有意义：</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>data %&gt;%
  mutate( highlight=ifelse(name==&quot;Amanda&quot;, &quot;Amanda&quot;, &quot;Other&quot;)) %&gt;%
  ## color设置特定数据
  ggplot( aes(x=year, y=n, group=name, color=highlight, size=highlight)) +
    geom_line() +
    scale_color_manual(values = c(&quot;#69b3a2&quot;, &quot;lightgrey&quot;)) +
    scale_size_manual(values=c(1.5,0.2)) +
    theme(legend.position=&quot;none&quot;) +
    ggtitle(&quot;Popularity of American names in the previous 30 years&quot;) +
    geom_label( x=1990, y=55000, label=&quot;Amanda reached 3550\\nbabies in 1970&quot;, size=4, color=&quot;#69b3a2&quot;) +
    theme(
      legend.position=&quot;none&quot;,
      plot.title = element_text(size=14)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="示例2" tabindex="-1"><a class="header-anchor" href="#示例2"><span>示例2</span></a></h2><p>当你向观众展示几个图形。报告由以下部分组成：1个barplot图显示公司的五个产品总量，1个折线图显示在过去十年被这五种款产品所产生的利益的演变：</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 读取库
library(tidyverse)
library(hrbrthemes)
library(patchwork)
library(viridis)

## 创建数据
data &lt;- data.frame(
  product = LETTERS[1:5],
  value = c(10, 14, 18, 6, 15)
)

## 绘图
a &lt;- data %&gt;%
  ggplot( aes(x=product, y=value, fill=product)) +
    geom_bar(stat=&quot;identity&quot;, width=0.5) +
    scale_fill_viridis(discrete=TRUE) +
    ggtitle(&quot;How much the products cost&quot;) +
    theme(
      plot.title = element_text(size=12),
      legend.position = &quot;none&quot;
    ) +
    xlab(&quot;&quot;) +
    ylab(&quot;Cost in M$&quot;)

## 创建数据
data &lt;- data.frame(
  year = rep( seq(1,10), 5 ),
  product = rep(LETTERS[1:5], each=10 ),
  value = c( 
    seq(1,10) + sample( 1:3, 10, replace = TRUE), 
    seq(5,14) + sample( 4:10, 10, replace=TRUE), 
    seq(10,1)*2 + sample( 3:5, 10, replace=TRUE), 
    seq(20,11) + sample( 12:17, 10, replace=TRUE), 
    seq(1,10) + sample( 40:10, 10))
)

## 绘图
b &lt;- data %&gt;%
  ggplot( aes(x=year, y=value, color=product)) +
    geom_line() +
    scale_color_discrete() +
    scale_x_continuous(breaks=c(1:10)) +
    ggtitle(&quot;How much the products make&quot;) +
    theme(
      plot.title = element_text(size=12)
    ) +
    xlab(&quot;Year&quot;) +
    ylab(&quot;Benefit in M$&quot;)

## Show
a + b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>可以看到，很难在两个图表之间建立联系，因为每个图表使用的调色板是不同的。产品A在左侧图形中为深紫色，在右侧图形中为红色。因此当您有多个图形时，在整个报告中为同一项目使用相同的颜色。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>data &lt;- data.frame(
  product = LETTERS[1:5],
  value = c(10, 14, 18, 6, 15)
)

a &lt;- data %&gt;%
  ggplot( aes(x=product, y=value, fill=product)) +
    geom_bar(stat=&quot;identity&quot;, width=0.5) +
    scale_fill_viridis(discrete=TRUE) +
    ggtitle(&quot;How much the products cost&quot;) +
    theme(
      plot.title = element_text(size=12),
      legend.position = &quot;none&quot;
    ) +
    xlab(&quot;&quot;) +
    ylab(&quot;Cost in M$&quot;)

data &lt;- data.frame(
  year = rep( seq(1,10), 5 ),
  product = rep(LETTERS[1:5], each=10 ),
  value = c( 
    seq(1,10) + sample( 1:3, 10, replace = TRUE), 
    seq(5,14) + sample( 4:10, 10, replace=TRUE), 
    seq(10,1)*2 + sample( 3:5, 10, replace=TRUE), 
    seq(20,11) + sample( 12:17, 10, replace=TRUE), 
    seq(1,10) + sample( 40:10, 10))
)

b &lt;- data %&gt;%
  ggplot( aes(x=year, y=value, color=product)) +
    geom_line() +
    scale_color_viridis(discrete=TRUE) +
    scale_x_continuous(breaks=c(1:10)) +
    ggtitle(&quot;How much the products make&quot;) +
    theme(
      plot.title = element_text(size=12)
    ) +
    xlab(&quot;Year&quot;) +
    ylab(&quot;Benefit in M$&quot;)

## Show
a + b

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_8_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="示例3" tabindex="-1"><a class="header-anchor" href="#示例3"><span>示例3</span></a></h2><p>图形的宽度与高度的比率。它可以对从您的图形中获得的见解产生重大影响。</p><p>下图是一个折线图示例，其中显示了从 1749 年到 1983 年的年度太阳黑子数量。在太阳活动周期是这个数字相当明显。太阳黑子数量遵循太阳活动的这种 11 年周期性变化，使这条线有规律地上下波动。很明显，一些峰值高于其他峰值，最大平滑太阳黑子数在 50 到 180 之间。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>library(tidyverse)
library(hrbrthemes)

## 读取数据
data &lt;- data.frame(
  Year = as.numeric(time(sunspot.year)),
  Sunspots = as.numeric(sunspot.year)
)

## 绘图
data %&gt;%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle(&quot;Number of sunspots per year&quot;) +
    theme(
      plot.title = element_text(size=12)
    )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>现在让我们改变这个图形的纵横比，使它更宽和更低。为了夸大效果，将图形放大到1800年到1900年。这里可以看到新的结果。太阳黑子数量增加的速度快于减少的速度。因此尝试几种不同的纵横比。这种探索极大地提高了图形的价值：</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>
data %&gt;%
  filter(Year&gt;1800 &amp; Year&lt;1900) %&gt;%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle(&quot;Number of sunspots per year&quot;) +
    theme(
      plot.title = element_text(size=12)
    )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点12-图表注释的重要性/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,25),o={href:"https://www.data-to-viz.com/caveat/annotation.html",target:"_blank",rel:"noopener noreferrer"},c={href:"https://www.data-to-viz.com/caveat/aspect_ratio.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.data-to-viz.com/caveat/mental_calculation.html",target:"_blank",rel:"noopener noreferrer"};function m(b,p){const i=t("ExternalLinkIcon");return s(),r("div",null,[E,e("ul",null,[e("li",null,[e("a",o,[n("ANNOTATION IS CRUCIAL FOR YOUR DATAVIZ"),a(i)])]),e("li",null,[e("a",c,[n("MIND THE ASPECT RATIO"),a(i)])]),e("li",null,[e("a",v,[n("MENTAL ARITHMETIC IN DATAVIZ"),a(i)])])])])}const B=l(u,[["render",m],["__file","2022-01-18-_数据分析与可视化_ 数据绘图要点12-图表注释的重要性.html.vue"]]),A=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2022-01-18-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7.html","title":"[数据分析与可视化] 数据绘图要点12-图表注释的重要性","lang":"zh-CN","frontmatter":{"date":"2022-01-18T11:40:23.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","R语言"],"description":"[数据分析与可视化] 数据绘图要点12-图表注释的重要性 图表注释是数据可视化的关键组成部分。它可以将枯燥的图形变成一种有趣且富有洞察力的信息传达方式。我们目前在网上看东西的注意力平均不到五秒。因此，如果您无法在五秒钟内吸引某人的注意力，那么您可能已经失去了观众。添加准确的注释可以极大地帮助吸引观众的注意力。使用关键字、形状、颜色和其他视觉效果来帮助他...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2022-01-18-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据分析与可视化] 数据绘图要点12-图表注释的重要性"}],["meta",{"property":"og:description","content":"[数据分析与可视化] 数据绘图要点12-图表注释的重要性 图表注释是数据可视化的关键组成部分。它可以将枯燥的图形变成一种有趣且富有洞察力的信息传达方式。我们目前在网上看东西的注意力平均不到五秒。因此，如果您无法在五秒钟内吸引某人的注意力，那么您可能已经失去了观众。添加准确的注释可以极大地帮助吸引观众的注意力。使用关键字、形状、颜色和其他视觉效果来帮助他..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_2_0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"[数据分析与可视化] 数据绘图要点12-图表注释的重要性"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"R语言"}],["meta",{"property":"article:published_time","content":"2022-01-18T11:40:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据分析与可视化] 数据绘图要点12-图表注释的重要性\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_2_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_4_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_6_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_8_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_10_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B912-%E5%9B%BE%E8%A1%A8%E6%B3%A8%E9%87%8A%E7%9A%84%E9%87%8D%E8%A6%81%E6%80%A7/output_12_0.png\\"],\\"datePublished\\":\\"2022-01-18T11:40:23.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"示例 1","slug":"示例-1","link":"#示例-1","children":[]},{"level":2,"title":"示例2","slug":"示例2","link":"#示例2","children":[]},{"level":2,"title":"示例3","slug":"示例3","link":"#示例3","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{},"readingTime":{"minutes":6.65,"words":1994},"filePathRelative":"blog/数据分析与可视化/数据绘图要点/2022-01-18-[数据分析与可视化] 数据绘图要点12-图表注释的重要性.md","localizedDate":"2022年1月18日","excerpt":"\\n<p>图表注释是数据可视化的关键组成部分。它可以将枯燥的图形变成一种有趣且富有洞察力的信息传达方式。我们目前在网上看东西的注意力平均不到五秒。因此，如果您无法在五秒钟内吸引某人的注意力，那么您可能已经失去了观众。添加准确的注释可以极大地帮助吸引观众的注意力。使用关键字、形状、颜色和其他视觉效果来帮助他们直奔主题。注释是一个通用概念，存在数百种不同的图表注释方法，具体使用取决于实际内容，让我们来看看几个例子。</p>\\n<h2>示例 1</h2>\\n<p>绘制折线图时的主要危险是最终会得到意大利面条图：太多的组通常会导致图表混乱，很难读取任何有效信息，如下图所示。</p>\\n<div class=\\"language-R\\" data-ext=\\"R\\" data-title=\\"R\\"><pre class=\\"language-R\\"><code>## Libraries\\nlibrary(tidyverse)\\nlibrary(hrbrthemes)\\nlibrary(babynames)\\nlibrary(viridis)\\n\\n## 读取数据\\ndata &lt;- babynames %&gt;% \\n  filter(name %in% c(\\"Mary\\",\\"Emma\\", \\"Ida\\", \\"Ashley\\", \\"Amanda\\", \\"Jessica\\",    \\"Patricia\\", \\"Linda\\", \\"Deborah\\",   \\"Dorothy\\", \\"Betty\\", \\"Helen\\")) %&gt;%\\n  filter(sex==\\"F\\")\\n\\n## 绘图\\ndata %&gt;%\\n  ggplot( aes(x=year, y=n, group=name, color=name)) +\\n    geom_line() +\\n    scale_color_viridis(discrete = TRUE) +\\n    theme(\\n      legend.position=\\"none\\",\\n      plot.title = element_text(size=14)\\n    ) +\\n    ggtitle(\\"A spaghetti chart of baby names popularity\\")\\n</code></pre></div>","autoDesc":true}');export{B as comp,A as data};
