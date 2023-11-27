import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as l,c as s,a as e,b as i,d as n,e as r}from"./app-MsA2k2kn.js";const c={},u=r(`<h1 id="数据分析与可视化-数据绘图要点4-饼图的问题" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点4-饼图的问题" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点4-饼图的问题</h1><p>本文让我们了解有史以来被批评最多的图表类型：饼图。</p><h2 id="坏的定义" tabindex="-1"><a class="header-anchor" href="#坏的定义" aria-hidden="true">#</a> 坏的定义</h2><p>饼图是一个圆，分为多个部分，每个部分代表整体的一部分。它通常用于显示百分比，其中扇区的总和等于100%。问题是人类在阅读角度方面非常糟糕。在相邻的饼图中，尝试找出最大的一组，并尝试按值对它们进行排序。您可能很难这样做，这就是必须避免使用饼图的原因。让我们尝试比较3个饼图。尝试了解在这3个图形中哪个组的值最高。此外，尝试弄清楚群体之间的价值演变是什么。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

## create 3 data frame 创建数据
data1 &lt;- data.frame( name=letters[1:5], value=c(17,18,20,22,24) )
data2 &lt;- data.frame( name=letters[1:5], value=c(20,18,21,20,20) )
data3 &lt;- data.frame( name=letters[1:5], value=c(24,23,21,19,18) )
## 查看数据
data1
data2
data3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 5 × 2</caption><thead><tr><th scope="col">name</th><th scope="col">value</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>a</td><td>17</td></tr><tr><td>b</td><td>18</td></tr><tr><td>c</td><td>20</td></tr><tr><td>d</td><td>22</td></tr><tr><td>e</td><td>24</td></tr></tbody></table><table class="dataframe"><caption>A data.frame: 5 × 2</caption><thead><tr><th scope="col">name</th><th scope="col">value</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>a</td><td>20</td></tr><tr><td>b</td><td>18</td></tr><tr><td>c</td><td>21</td></tr><tr><td>d</td><td>20</td></tr><tr><td>e</td><td>20</td></tr></tbody></table><table class="dataframe"><caption>A data.frame: 5 × 2</caption><thead><tr><th scope="col">name</th><th scope="col">value</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>a</td><td>24</td></tr><tr><td>b</td><td>23</td></tr><tr><td>c</td><td>21</td></tr><tr><td>d</td><td>19</td></tr><tr><td>e</td><td>18</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 定义绘图函数
plot_pie &lt;- function(data, vec){

ggplot(data, aes(x=&quot;name&quot;, y=value, fill=name)) +
  ## 饼图要先绘制条形图
  geom_bar(width = 1, stat = &quot;identity&quot;) +
  ## 改为极坐标系
  coord_polar(&quot;y&quot;, start=0, direction = -1) +
  ## 设置填充颜色
  scale_fill_viridis(discrete = TRUE,  direction=-1) + 
  ## 显示文字  
  geom_text(aes(y = vec, label = rev(name), size=4, color=c( &quot;white&quot;, rep(&quot;black&quot;, 4)))) +
  scale_color_manual(values=c(&quot;black&quot;, &quot;white&quot;)) +
  theme(
    legend.position=&quot;none&quot;,
    plot.title = element_text(size=14),
    panel.grid = element_blank(),
    axis.text = element_blank()
  ) +
  xlab(&quot;&quot;) +
  ylab(&quot;&quot;)
}

a &lt;- plot_pie(data1, c(10,35,55,75,93))
b &lt;- plot_pie(data2, c(10,35,53,75,93))
c &lt;- plot_pie(data3, c(10,29,50,75,93))
a + b + c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点4-饼图的问题/output_3_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>现在，让我们使用条形图barplot表示完全相同的数据：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 定义绘图函数
plot_bar  &lt;- function(data){

ggplot(data, aes(x=name, y=value, fill=name)) +
  ## 绘制条形图
  geom_bar(stat = &quot;identity&quot;) +
  ## 设置填充颜色
  scale_fill_viridis(discrete = TRUE,  direction=-1) + 
  scale_color_manual(values=c(&quot;black&quot;, &quot;white&quot;)) +
  theme(
    legend.position=&quot;none&quot;,
    plot.title = element_text(size=14),
    panel.grid = element_blank(),
  ) +
  ylim(0,25) +
  xlab(&quot;&quot;) +
  ylab(&quot;&quot;)

}

a &lt;- plot_bar (data1)
b &lt;- plot_bar (data2)
c &lt;- plot_bar (data3)
a + b + c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点4-饼图的问题/output_5_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>让我们谈谈使用图表的原因。</p><ul><li>图表是获取信息并使其更易于理解的一种方式。</li><li>一般来说，图表的目的是更容易比较不同的数据集。</li><li>图表能够在不增加复杂性的情况下传达越多越好的信息。</li></ul><p>正如您通过对比图片可以看到，饼图难以直观表现数据间的差异，而条形图正好相反，可以清晰看到不同数据的差别。饼图没法比较各种不同的值，而且也没法传达更多的信息。</p><h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2><p>条形图，柱状图是饼图的最佳替代品。如果你有很多值要显示，你也可以考虑一个在我看来更优雅一点的棒棒糖图。以下是基于世界上少数国家/地区销售的重要物品数量的展示示例：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 从github加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv&quot;, header=TRUE, sep=&quot;,&quot;)
## 清除空值数据
data &lt;- filter(data,!is.na(Value))
nrow(data)
head(data)
## 排列数据
data&lt;- arrange(data,Value)
## 将Contry转换为factor项，来表示分类数据
data&lt;- mutate(data,Country=factor(Country, Country))
## 绘图
ggplot(data,aes(x=Country, y=Value) ) +
## 定义数据轴
geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color=&quot;grey&quot;) +
## 绘制点
geom_point(size=3, color=&quot;#69b3a2&quot;) +
## x,y轴调换
coord_flip() +
## 设置主题
theme(
    ## 将内部线条设置为空
    panel.grid.minor.y = element_blank(),
    panel.grid.major.y = element_blank(),
    legend.position=&quot;none&quot;
) +
## 原来x轴也就是现在图像中y轴的轴标题设置为空
xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>38</p><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">Country</th><th scope="col">Value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>United States </td><td>12394</td></tr><tr><th scope="row">2</th><td>Russia </td><td> 6148</td></tr><tr><th scope="row">3</th><td>Germany (FRG) </td><td> 1653</td></tr><tr><th scope="row">4</th><td>France </td><td> 2162</td></tr><tr><th scope="row">5</th><td>United Kingdom</td><td> 1214</td></tr><tr><th scope="row">6</th><td>China </td><td> 1131</td></tr></tbody></table><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点4-饼图的问题/output_8_2.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果您的目标是描述整体的组成，另一种可能性是创建树状图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## Package
## 导入专门的包
library(treemap)

## Plot 绘图
treemap(data,    
        ## data
        index=&quot;Country&quot;,
        vSize=&quot;Value&quot;,
        type=&quot;index&quot;,

        ## 设置颜色
        title=&quot;&quot;,
        palette=&quot;Dark2&quot;,

        ## Border 边界框设置
        border.col=c(&quot;black&quot;),
        ## 边界框线宽
        border.lwds=3,                         

        ## Labels 设置标签颜色
        fontcolor.labels=&quot;white&quot;,
        ## 设置字体
        fontface.labels=2,
        ## 设置标签位置
        align.labels=c(&quot;left&quot;, &quot;top&quot;),
        ## 设置面积越大，标签越大
        inflate.labels=T,
        ## 设置显示标签等级，越小显示的标签越少
        fontsize.labels=5
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点4-饼图的问题/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,26),o={href:"https://www.data-to-viz.com/caveat/pie.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.businessinsider.com.au/pie-charts-are-the-worst-2013-6?r=US&IR=T",target:"_blank",rel:"noopener noreferrer"};function m(b,p){const t=d("ExternalLinkIcon");return l(),s("div",null,[u,e("ul",null,[e("li",null,[e("a",o,[i("THE ISSUE WITH PIE CHART"),n(t)])]),e("li",null,[e("a",v,[i("pie-charts-are-the-worst"),n(t)])])])])}const g=a(c,[["render",m],["__file","2021-12-01-_数据分析与可视化_ 数据绘图要点4-饼图的问题.html.vue"]]);export{g as default};
