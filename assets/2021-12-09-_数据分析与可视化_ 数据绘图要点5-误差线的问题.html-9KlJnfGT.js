import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as s,c as r,a as e,b as i,d as n,e as a}from"./app-MsA2k2kn.js";const o={},c=a(`<h1 id="数据分析与可视化-数据绘图要点5-误差线的问题" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点5-误差线的问题" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点5-误差线的问题</h1><p>[toc]</p><p>误差线给出了测量精确度的一般概念，真实（无误差）值可能与报告值相差多远。如果条形图上显示的值是聚合的结果（如多个数据点的平均值），您可能需要显示误差线。但我们必须要谨慎使用误差线，具体原因将在后续给出。</p><h2 id="误差线的绘制" tabindex="-1"><a class="header-anchor" href="#误差线的绘制" aria-hidden="true">#</a> 误差线的绘制</h2><p>在下图中，报告了5个group。条形高度代表它们的平均值。黑色误差线提供有关单个观测值如何分散在平均值周围的信息。例如，似乎groupB中的测量结果比groupE中的更精确。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 加载库
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

## 创建数据
data &lt;- data.frame(
    ## 创建小写数字
    name=letters[1:5],
    value=sample(seq(4,15),5),
    sd=c(1,0.2,3,2,4)
)

## 展示数据
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 5 × 3</caption><thead><tr><th></th><th scope="col">name</th><th scope="col">value</th><th scope="col">sd</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>a</td><td>10</td><td>1.0</td></tr><tr><th scope="row">2</th><td>b</td><td> 5</td><td>0.2</td></tr><tr><th scope="row">3</th><td>c</td><td>12</td><td>3.0</td></tr><tr><th scope="row">4</th><td>d</td><td> 9</td><td>2.0</td></tr><tr><th scope="row">5</th><td>e</td><td> 7</td><td>4.0</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
ggplot(data) +
## 绘制条形
geom_bar( aes(x=name, y=value), stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;, alpha=0.7, width=0.5) +
## 绘制误差线
geom_errorbar( aes(x=name, ymin=value-sd, ymax=value+sd), width=0.4, colour=&quot;black&quot;, alpha=0.9, size=1) +
theme(
  legend.position=&quot;none&quot;,
  plot.title = element_text(size=11)
) +
ggtitle(&quot;A barplot with error bar&quot;) +
xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点5-误差线的问题/output_3_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="误差线中的问题" tabindex="-1"><a class="header-anchor" href="#误差线中的问题" aria-hidden="true">#</a> 误差线中的问题</h2><h2 id="误差线隐藏信息" tabindex="-1"><a class="header-anchor" href="#误差线隐藏信息" aria-hidden="true">#</a> 误差线隐藏信息</h2>`,11),u={href:"http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128",target:"_blank",rel:"noopener noreferrer"},v=a(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img5_1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>因此，带有误差线的相同条形图实际上可以讲述非常不同的故事，对读者来说这些数据是隐藏的。所以尽可能显示个人数据信息。</p><h4 id="误差线的计算方式" tabindex="-1"><a class="header-anchor" href="#误差线的计算方式" aria-hidden="true">#</a> 误差线的计算方式</h4><p>误差线的第二个问题是误差线有多种计算方式，并且并不总是清楚显示的是哪一个。误差线通常使用三种不同的计算方式，选择不同的计算方式有时给出非常不同的结果。下面是它们的定义以及如何在R上计算。</p><p><strong>标准偏差(SD)</strong></p><p>表示变量的分散量。计算公式为方差的平方根</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 计算方差
sd &lt;- sd(vec)
## 计算平方根
sd &lt;- sqrt(var(vec))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>标准误差(SE)</strong></p><p>表示变量均值的标准偏差，计算方法为SD除以样本大小的平方根。通过计算方法，SE小于SD。对于非常大的样本量，SE趋向于0。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>se = sd(vec) / sqrt(length(vec))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>置信区间(CI)</strong></p><p>表示使某个值存在于其内的特定概率。它计算为t*SE，其中t值是t检验在特定显著水平alpha下的统计量值。其值在具有较大的样本量时通常四舍五入到1.96。但是，如果样本量很大或分布不正态，则最好使用bootstrap方法计算CI。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alpha=0.05
t=qt((1-alpha)/2 + .5, length(vec)-1)   
## 数据量很大是取为1.96
## t = 1.96
CI=t*se
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上3个指标在著名的Iris数据集上应用时。三种鸢尾花的平均萼片长度和平均长度用误差线表示的结果完全不同。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 读取数据
data &lt;- iris %&gt;% select(Species, Sepal.Length) 
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">Species</th><th scope="col">Sepal.Length</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>setosa</td><td>5.1</td></tr><tr><th scope="row">2</th><td>setosa</td><td>4.9</td></tr><tr><th scope="row">3</th><td>setosa</td><td>4.7</td></tr><tr><th scope="row">4</th><td>setosa</td><td>4.6</td></tr><tr><th scope="row">5</th><td>setosa</td><td>5.0</td></tr><tr><th scope="row">6</th><td>setosa</td><td>5.4</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 分别计算标准偏差，标准误差，置信区间
my_sum &lt;- data %&gt;%
  group_by(Species) %&gt;%
  summarise( 
    n=n(),
    mean=mean(Sepal.Length),
    sd=sd(Sepal.Length)
  ) %&gt;%
  mutate( se=sd/sqrt(n))  %&gt;%
  mutate( ic=se * qt((1-0.05)/2 + .5, n-1))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
## 标准偏差
p1 &lt;- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;, alpha=0.7, width=0.6) + 
  geom_errorbar( aes(x=Species, ymin=mean-sd, ymax=mean+sd), width=0.4, colour=&quot;black&quot;, alpha=0.9, size=1) +
  ggtitle(&quot;standard deviation&quot;) +
  theme(
    plot.title = element_text(size=6)
  ) +
  xlab(&quot;&quot;) +
  ylab(&quot;Sepal Length&quot;)
 
## 标准误差
p2 &lt;- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;, alpha=0.7, width=0.6) + 
  geom_errorbar( aes(x=Species, ymin=mean-se, ymax=mean+se),width=0.4, colour=&quot;black&quot;, alpha=0.9, size=1) +
  ggtitle(&quot;standard error&quot;) +
  theme(
    plot.title = element_text(size=6)
  ) +
  xlab(&quot;&quot;) +
  ylab(&quot;Sepal Length&quot;)
 
## 置信区间
p3 &lt;- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;, alpha=0.7, width=0.6) + 
  geom_errorbar( aes(x=Species, ymin=mean-ic, ymax=mean+ic), width=0.4, colour=&quot;black&quot;, alpha=0.9, size=1) +
  ggtitle(&quot;confidence interval&quot;) +
  theme(
    plot.title = element_text(size=6)
  ) +
  xlab(&quot;&quot;) +
  ylab(&quot;Sepal Length&quot;)

p1 + p2 + p3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点5-误差线的问题/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>很明显，这 3 个指标报告了非常不同的可视化和结论。所以应该始终指定用于误差线的指标。</p><h4 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h4><p>最好尽可能避免误差线。当然，如果您只有汇总统计数据，这是不可能的。但是，如果您知道各个数据点，请显示它们。有几种解决方法是可能的。带有散点信息的箱形图适用于相对少量的数据。当数据量较多时，使用小提琴数据图是另一种办法。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data,aes(x=Species, y=Sepal.Length)) +
## 绘图,notch为TRUE表示绘制小提琴图，否则为绘制箱形图
geom_boxplot( fill=&quot;#69b3a2&quot;, notch=T) +
## 绘制数据点信息
geom_jitter( size=0.9, color=&quot;orange&quot;, width=0.1) +
ggtitle(&quot;confidence interval&quot;) +
theme(
  plot.title = element_text(size=6)
) +
xlab(&quot;&quot;) +
ylab(&quot;Sepal Length&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点5-误差线的问题/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,25),m={href:"http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.data-to-viz.com/caveat/error_bar.html",target:"_blank",rel:"noopener noreferrer"};function h(p,g){const t=l("ExternalLinkIcon");return s(),r("div",null,[c,e("p",null,[i("误差线可能会隐藏很多信息。如下图所示，这是PLOS Biology期刊一篇论文"),e("a",u,[i("Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm"),n(t)]),i("中的图。它说明完整的数据可能暗示与汇总统计数据不同的结论。其中A图是一张用于汇总数据带有误差线的条形图。但是从A图中，我们并不能得到A图中两个数据组明确的数据分布信息，因为A图可能对应不同数据组分布信息。A可能会对应B，C，D，E四张图，而这四张图表示了完全不同的数据分布信息。B图表示两个数据组具有相同类型的数据分布，C图表示第二个数据组有异常值，D图表示两组数据分布不同，E图表示两组数据样本数不同。")]),v,e("ul",null,[e("li",null,[e("a",m,[i("Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm"),n(t)])]),e("li",null,[e("a",b,[i("THE ISSUE WITH ERROR BARS"),n(t)])])])])}const x=d(o,[["render",h],["__file","2021-12-09-_数据分析与可视化_ 数据绘图要点5-误差线的问题.html.vue"]]);export{x as default};
