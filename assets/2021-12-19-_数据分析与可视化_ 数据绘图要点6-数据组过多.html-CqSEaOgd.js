import{_ as a,r as l,o as s,c as d,a as e,b as i,d as n,e as r}from"./app-BFw6ZVWV.js";const o={},E=r(`<h1 id="数据分析与可视化-数据绘图要点6-数据组过多" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点6-数据组过多"><span>[数据分析与可视化] 数据绘图要点6-数据组过多</span></a></h1><p>比较几个数值变量的分布是数据展示中的一项常见任务。变量的分布可以使用直方图或密度图来表示，在同一轴上表示适量数据的组是非常有吸引力的。但是数据组过多将严重影响图表信息表现。</p><h2 id="数据分布绘图实例" tabindex="-1"><a class="header-anchor" href="#数据分布绘图实例"><span>数据分布绘图实例</span></a></h2><p>下面是一个示例，展示了人们如何感知词汇。短语“Highly likely”表示什么情况的概率问题。以下是人们给出概率分数分布结果。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 加载库
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

## 加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv&quot;, header=TRUE, sep=&quot;,&quot;)
## 处理数据
data &lt;- data %&gt;% 
  gather(key=&quot;text&quot;, value=&quot;value&quot;) %&gt;%
  mutate(text = gsub(&quot;\\\\.&quot;, &quot; &quot;,text)) %&gt;%
  mutate(value = round(as.numeric(value),0))
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">text</th><th scope="col">value</th></tr><tr><th></th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">2</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">3</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">4</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">5</th><td>Almost Certainly</td><td>98</td></tr><tr><th scope="row">6</th><td>Almost Certainly</td><td>95</td></tr></tbody></table><p>782</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 建立数据标注框
annot &lt;- data.frame(
  text = c(&quot;Almost No Chance&quot;, &quot;About Even&quot;, &quot;Probable&quot;, &quot;Almost Certainly&quot;),
  x = c(5, 53, 65, 79),
  y = c(0.15, 0.4, 0.06, 0.1)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 提取部分数据进行展示
data1 &lt;-filter(data,text %in% c(&quot;Almost No Chance&quot;, &quot;About Even&quot;, &quot;Probable&quot;, &quot;Almost Certainly&quot;)) 
data1 &lt;-mutate(data1,text = fct_reorder(text, value))
head(data1)
nrow(data1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">text</th><th scope="col">value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">2</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">3</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">4</th><td>Almost Certainly</td><td>95</td></tr><tr><th scope="row">5</th><td>Almost Certainly</td><td>98</td></tr><tr><th scope="row">6</th><td>Almost Certainly</td><td>95</td></tr></tbody></table><p>184</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 绘图
ggplot(data1, aes(x=value, color=text, fill=text)) +
geom_density(alpha=0.6) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
geom_text( data=annot, aes(x=x, y=y, label=text, color=text), hjust=0, size=4.5) +
theme(
  legend.position=&quot;none&quot;,
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_5_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>在这种情况下，图形非常整洁。人们给&quot;Highly likely&quot;表示&quot;Almost No chance&quot;这句话的概率在0%到20%之间，而表示&quot;Almost Certainly&quot;这句话的概率在 75%到100% 之间。但是当我们看看表示更多数据组会发生什么。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## Plot
data2&lt;-mutate(data,text = fct_reorder(text, value)) 
ggplot(data2,aes(x=value, color=text, fill=text)) +
## 绘制密度图
geom_density(alpha=0.6) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
theme(
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_7_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>现在可以看到这个图过于杂乱了，无法区分组：在同一个图形上表示的数据组太多。如何避免这种情况？我们将在下一节介绍几种解决办法。</p><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法"><span>解决方法</span></a></h2><h3 id="箱形图" tabindex="-1"><a class="header-anchor" href="#箱形图"><span>箱形图</span></a></h3><p>表示这种数据集的最常见方法是boxplot。它总结了每个组的主要特征，从而实现了高效的分布。请注意一些陷阱。对组进行排序以使图表更易于阅读通常是有意义的。如果组标签很长，请考虑使标签可读的水平版本。不过箱形图箱隐藏了样本大小的基本分布等信息，可以使用不显眼的点显示各个数据点。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>ggplot(data2, aes(x=text, y=value, fill=text)) +
## 绘制箱形图
geom_boxplot() +
## 添加数据点
geom_jitter(color=&quot;grey&quot;, alpha=0.3, size=0.9) +
scale_fill_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;
) +
## xy轴翻转
coord_flip() +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="小提琴图" tabindex="-1"><a class="header-anchor" href="#小提琴图"><span>小提琴图</span></a></h3><p>只要样本量足够大，小提琴图通常是箱形图的良好替代品。它与箱形图非常接近，只是它通过定义更准确地描述了组分布。如果你有很多组，小提琴图可能不是最好的选择，因为小提琴图中每个数据组的展示结果往往都非常纤细，这使得很难想象其分布。在这种情况下，一个很好的替代方案是山脊图，这将在本文中进一步描述。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>ggplot(data2,  aes(x=text, y=value, fill=text, color=text)) +
geom_violin(width=2.1, size=0.2) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;
) +
coord_flip() +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;position_dodge requires non-overlapping x intervals&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_12_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="密度图" tabindex="-1"><a class="header-anchor" href="#密度图"><span>密度图</span></a></h3><p>如果只有几组，可以在同一密度图上比较。这里只选择了四组来说明这个想法。如果有更多的组，图形就会变得杂乱无章，难以阅读。这个示例在前面也有提过，但是只能数据组少的情况合适。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 绘图
ggplot(data1, aes(x=value, color=text, fill=text)) +
geom_density(alpha=0.6) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
geom_text( data=annot, aes(x=x, y=y, label=text, color=text), hjust=0, size=4.5) +
theme(
  legend.position=&quot;none&quot;,
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_14_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>但是，如果您有超过4个组，图形会变得过于混乱。如果想用密度图，用分组子图绘图的方式更加合适。这是分别研究每个组分布的好方法。但是，由于它们不共享相同的X轴，因此很难将组放在一起进行比较。一切都取决于您要回答的问题是什么。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>ggplot(data2,aes(x=value, color=text, fill=text)) +
geom_density(alpha=0.6) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;,
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;) +
## 分组绘图
facet_wrap(~text, scale=&quot;free_y&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="直方图" tabindex="-1"><a class="header-anchor" href="#直方图"><span>直方图</span></a></h3><p>直方图和密度图非常接近，表现处理方式也是类似，使用子图。但是直方图在这个例子的Y刻度对于每个组都是相同的，这与密度图上的先前示例不同。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>ggplot(data2, aes(x=value, color=text, fill=text)) +
geom_histogram(alpha=0.6, binwidth = 5) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;,
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;) +
facet_wrap(~text)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_18_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="山脊图" tabindex="-1"><a class="header-anchor" href="#山脊图"><span>山脊图</span></a></h3><p>在这个例子中，最好的选择可能是山脊图。它有小提琴图的所有优势，但避免了空间松散，因为组之间存在重叠。有效地描述了个体分布和组之间的比较。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 加载专门的绘图库
library(ggridges)

ggplot(data2, aes(y=text, x=value,  fill=text)) +
geom_density_ridges(alpha=0.6, bandwidth=4) +
scale_fill_viridis(discrete=TRUE) +
scale_color_viridis(discrete=TRUE) +
theme(
  legend.position=&quot;none&quot;,
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8)
) +
xlab(&quot;&quot;) +
ylab(&quot;Assigned Probability (%)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点6-数据组过多/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,43),u={href:"https://www.data-to-viz.com/caveat/multi_distribution.html",target:"_blank",rel:"noopener noreferrer"},c={href:"https://www.data-to-viz.com/story/OneNumOneCatSeveralObs.html",target:"_blank",rel:"noopener noreferrer"};function v(p,m){const t=l("ExternalLinkIcon");return s(),d("div",null,[E,e("ul",null,[e("li",null,[e("a",u,[i("TOO MANY DISTRIBUTIONS"),n(t)])]),e("li",null,[e("a",c,[i("PERCEPTION OF PROBABILITY"),n(t)])])])])}const g=a(o,[["render",v],["__file","2021-12-19-_数据分析与可视化_ 数据绘图要点6-数据组过多.html.vue"]]),h=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2021-12-19-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A.html","title":"[数据分析与可视化] 数据绘图要点6-数据组过多","lang":"zh-CN","frontmatter":{"date":"2021-12-19T12:02:03.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","R语言"],"description":"[数据分析与可视化] 数据绘图要点6-数据组过多 比较几个数值变量的分布是数据展示中的一项常见任务。变量的分布可以使用直方图或密度图来表示，在同一轴上表示适量数据的组是非常有吸引力的。但是数据组过多将严重影响图表信息表现。 数据分布绘图实例 下面是一个示例，展示了人们如何感知词汇。短语“Highly likely”表示什么情况的概率问题。以下是人们给出...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2021-12-19-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据分析与可视化] 数据绘图要点6-数据组过多"}],["meta",{"property":"og:description","content":"[数据分析与可视化] 数据绘图要点6-数据组过多 比较几个数值变量的分布是数据展示中的一项常见任务。变量的分布可以使用直方图或密度图来表示，在同一轴上表示适量数据的组是非常有吸引力的。但是数据组过多将严重影响图表信息表现。 数据分布绘图实例 下面是一个示例，展示了人们如何感知词汇。短语“Highly likely”表示什么情况的概率问题。以下是人们给出..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_5_0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"R语言"}],["meta",{"property":"article:published_time","content":"2021-12-19T12:02:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据分析与可视化] 数据绘图要点6-数据组过多\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_5_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_7_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_10_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_12_1.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_14_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_16_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_18_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B96-%E6%95%B0%E6%8D%AE%E7%BB%84%E8%BF%87%E5%A4%9A/output_20_0.png\\"],\\"datePublished\\":\\"2021-12-19T12:02:03.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"数据分布绘图实例","slug":"数据分布绘图实例","link":"#数据分布绘图实例","children":[]},{"level":2,"title":"解决方法","slug":"解决方法","link":"#解决方法","children":[{"level":3,"title":"箱形图","slug":"箱形图","link":"#箱形图","children":[]},{"level":3,"title":"小提琴图","slug":"小提琴图","link":"#小提琴图","children":[]},{"level":3,"title":"密度图","slug":"密度图","link":"#密度图","children":[]},{"level":3,"title":"直方图","slug":"直方图","link":"#直方图","children":[]},{"level":3,"title":"山脊图","slug":"山脊图","link":"#山脊图","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{},"readingTime":{"minutes":8.44,"words":2533},"filePathRelative":"blog/数据分析与可视化/数据绘图要点/2021-12-19-[数据分析与可视化] 数据绘图要点6-数据组过多.md","localizedDate":"2021年12月19日","excerpt":"\\n<p>比较几个数值变量的分布是数据展示中的一项常见任务。变量的分布可以使用直方图或密度图来表示，在同一轴上表示适量数据的组是非常有吸引力的。但是数据组过多将严重影响图表信息表现。</p>\\n<h2>数据分布绘图实例</h2>\\n<p>下面是一个示例，展示了人们如何感知词汇。短语“Highly likely”表示什么情况的概率问题。以下是人们给出概率分数分布结果。</p>\\n<div class=\\"language-R\\" data-ext=\\"R\\" data-title=\\"R\\"><pre class=\\"language-R\\"><code>## 加载库\\nlibrary(tidyverse)\\nlibrary(hrbrthemes)\\nlibrary(viridis)\\nlibrary(patchwork)\\n\\n## 加载数据\\ndata &lt;- read.table(\\"https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv\\", header=TRUE, sep=\\",\\")\\n## 处理数据\\ndata &lt;- data %&gt;% \\n  gather(key=\\"text\\", value=\\"value\\") %&gt;%\\n  mutate(text = gsub(\\"\\\\\\\\.\\", \\" \\",text)) %&gt;%\\n  mutate(value = round(as.numeric(value),0))\\nhead(data)\\nnrow(data)\\n</code></pre></div>","autoDesc":true}');export{g as comp,h as data};
