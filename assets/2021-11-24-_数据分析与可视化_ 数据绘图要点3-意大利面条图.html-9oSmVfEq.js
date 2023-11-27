import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as i,c as n,a as t,b as l,d as r,e as s}from"./app-MsA2k2kn.js";const o={},c=s(`<h1 id="数据分析与可视化-数据绘图要点3-意大利面条图" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点3-意大利面条图" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点3-意大利面条图</h1><h2 id="数据绘图要点3-意大利面条图" tabindex="-1"><a class="header-anchor" href="#数据绘图要点3-意大利面条图" aria-hidden="true">#</a> 数据绘图要点3-意大利面条图</h2><p>线条太多的折线图通常变的不可读，这种图一般被称为意大利面条图。因此这种图几乎无法提供有关数据的信息。</p><h3 id="绘图实例" tabindex="-1"><a class="header-anchor" href="#绘图实例" aria-hidden="true">#</a> 绘图实例</h3><p>让我们以美国从1880年到2015年女性婴儿名字的演变为例。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
library(babynames)
library(viridis)
library(DT)
library(plotly)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 展示数据
data &lt;- babynames
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A tibble: 6 × 5</caption><thead><tr><th scope="col">year</th><th scope="col">sex</th><th scope="col">name</th><th scope="col">n</th><th scope="col">prop</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>1880</td><td>F</td><td>Mary </td><td>7065</td><td>0.07238359</td></tr><tr><td>1880</td><td>F</td><td>Anna </td><td>2604</td><td>0.02667896</td></tr><tr><td>1880</td><td>F</td><td>Emma </td><td>2003</td><td>0.02052149</td></tr><tr><td>1880</td><td>F</td><td>Elizabeth</td><td>1939</td><td>0.01986579</td></tr><tr><td>1880</td><td>F</td><td>Minnie </td><td>1746</td><td>0.01788843</td></tr><tr><td>1880</td><td>F</td><td>Margaret </td><td>1578</td><td>0.01616720</td></tr></tbody></table><p>1924665</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 挑选某些姓名的数据
data = filter(data,name %in% c(&quot;Mary&quot;,&quot;Emma&quot;, &quot;Ida&quot;, &quot;Ashley&quot;, &quot;Amanda&quot;, &quot;Jessica&quot;, &quot;Patricia&quot;, &quot;Linda&quot;, &quot;Deborah&quot;,   &quot;Dorothy&quot;, &quot;Betty&quot;, &quot;Helen&quot;))
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A tibble: 6 × 5</caption><thead><tr><th scope="col">year</th><th scope="col">sex</th><th scope="col">name</th><th scope="col">n</th><th scope="col">prop</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>1880</td><td>F</td><td>Mary </td><td>7065</td><td>0.07238359</td></tr><tr><td>1880</td><td>F</td><td>Emma </td><td>2003</td><td>0.02052149</td></tr><tr><td>1880</td><td>F</td><td>Ida </td><td>1472</td><td>0.01508119</td></tr><tr><td>1880</td><td>F</td><td>Helen </td><td> 636</td><td>0.00651606</td></tr><tr><td>1880</td><td>F</td><td>Amanda</td><td> 241</td><td>0.00246914</td></tr><tr><td>1880</td><td>F</td><td>Betty </td><td> 117</td><td>0.00119871</td></tr></tbody></table><p>2599</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 只要女性数据
data= filter(data,sex==&quot;F&quot;)
head(data)
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A tibble: 6 × 5</caption><thead><tr><th scope="col">year</th><th scope="col">sex</th><th scope="col">name</th><th scope="col">n</th><th scope="col">prop</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>1880</td><td>F</td><td>Mary </td><td>7065</td><td>0.07238359</td></tr><tr><td>1880</td><td>F</td><td>Emma </td><td>2003</td><td>0.02052149</td></tr><tr><td>1880</td><td>F</td><td>Ida </td><td>1472</td><td>0.01508119</td></tr><tr><td>1880</td><td>F</td><td>Helen </td><td> 636</td><td>0.00651606</td></tr><tr><td>1880</td><td>F</td><td>Amanda</td><td> 241</td><td>0.00246914</td></tr><tr><td>1880</td><td>F</td><td>Betty </td><td> 117</td><td>0.00119871</td></tr></tbody></table><p>1593</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
ggplot(data,aes(x=year, y=n, group=name, color=name)) +
geom_line() +
scale_color_viridis(discrete = TRUE) +
theme(
  plot.title = element_text(size=14)
) +
ggtitle(&quot;A spaghetti chart of baby names popularity&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点3-意大利面条图/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>从图中看到很难按照一条线来理解特定名称受欢迎程度的演变。另外，即使您设法遵循一条线显示结果，您也需要将其与更难的图例联系起来。让我们尝试找到一些解决方法来改进此图形。</p><h3 id="改进方法" tabindex="-1"><a class="header-anchor" href="#改进方法" aria-hidden="true">#</a> 改进方法</h3><h4 id="针对特定群体" tabindex="-1"><a class="header-anchor" href="#针对特定群体" aria-hidden="true">#</a> 针对特定群体</h4><p>假设您绘制了许多组，但实际原因是为了解释一个特定组与其他组相比的特征。然后一个好的解决方法是突出显示这个组：让它看起来不同，并给它一个适当的注释。在这里，Amanda的人气演变是显而易见的。保留其他名称很重要，因为它允许您将 Amanda 与所有其他名称进行比较</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 添加数据项
data =  mutate( data, highlight=ifelse(name==&quot;Amanda&quot;, &quot;Amanda&quot;, &quot;Other&quot;))
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A tibble: 6 × 6</caption><thead><tr><th scope="col">year</th><th scope="col">sex</th><th scope="col">name</th><th scope="col">n</th><th scope="col">prop</th><th scope="col">highlight</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>1880</td><td>F</td><td>Mary </td><td>7065</td><td>0.07238359</td><td>Other </td></tr><tr><td>1880</td><td>F</td><td>Emma </td><td>2003</td><td>0.02052149</td><td>Other </td></tr><tr><td>1880</td><td>F</td><td>Ida </td><td>1472</td><td>0.01508119</td><td>Other </td></tr><tr><td>1880</td><td>F</td><td>Helen </td><td> 636</td><td>0.00651606</td><td>Other </td></tr><tr><td>1880</td><td>F</td><td>Amanda</td><td> 241</td><td>0.00246914</td><td>Amanda</td></tr><tr><td>1880</td><td>F</td><td>Betty </td><td> 117</td><td>0.00119871</td><td>Other </td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data,aes(x=year, y=n, group=name, color=highlight, size=highlight)) +
geom_line() +
scale_color_manual(values = c(&quot;#69b3a2&quot;, &quot;lightgrey&quot;)) +
scale_size_manual(values=c(1.5,0.2)) +
theme(legend.position=&quot;none&quot;) +
ggtitle(&quot;Popularity of American names in the previous 30 years&quot;) +
geom_label( x=1990, y=55000, label=&quot;Amanda reached 3550\\nbabies in 1970&quot;, size=4, color=&quot;#69b3a2&quot;) +
theme(,
  plot.title = element_text(size=14)
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点3-意大利面条图/output_11_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="使用子图" tabindex="-1"><a class="header-anchor" href="#使用子图" aria-hidden="true">#</a> 使用子图</h4><p>面积图可用于对数据集进行更全面的概述，尤其是与子图结合使用时。在下面的图表中，可以很容易地瞥见任何名称的演变情况：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data,aes(x=year, y=n, group=name, fill=name)) +
geom_area() +
scale_fill_viridis(discrete = TRUE) +
theme(legend.position=&quot;none&quot;) +
ggtitle(&quot;Popularity of American names in the previous 30 years&quot;) +
theme(
  panel.spacing = unit(0.1, &quot;lines&quot;),
  strip.text.x = element_text(size = 8),
  plot.title = element_text(size=14)
) +
## 按名字分图
facet_wrap(~name)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点3-意大利面条图/output_13_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>从图上可以看到，Linda这个名字在很短的时间内是一个非常受欢迎的名字。另一方面，Ida 从来都不是很受欢迎，在几十年中较少被使用。</p><h4 id="组合方法" tabindex="-1"><a class="header-anchor" href="#组合方法" aria-hidden="true">#</a> 组合方法</h4><p>如果您想比较每条线与其他线的演变情况，您可以将针对特定群体和使用子图结合起来</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 复制列，name/name2分别有不同用处，一个用于显示子图中的数据，一个用于分列
tmp &lt;- data %&gt;%
  mutate(name2=name)
head(tmp)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A tibble: 6 × 7</caption><thead><tr><th scope="col">year</th><th scope="col">sex</th><th scope="col">name</th><th scope="col">n</th><th scope="col">prop</th><th scope="col">highlight</th><th scope="col">name2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>1880</td><td>F</td><td>Mary </td><td>7065</td><td>0.07238359</td><td>Other </td><td>Mary </td></tr><tr><td>1880</td><td>F</td><td>Emma </td><td>2003</td><td>0.02052149</td><td>Other </td><td>Emma </td></tr><tr><td>1880</td><td>F</td><td>Ida </td><td>1472</td><td>0.01508119</td><td>Other </td><td>Ida </td></tr><tr><td>1880</td><td>F</td><td>Helen </td><td> 636</td><td>0.00651606</td><td>Other </td><td>Helen </td></tr><tr><td>1880</td><td>F</td><td>Amanda</td><td> 241</td><td>0.00246914</td><td>Amanda</td><td>Amanda</td></tr><tr><td>1880</td><td>F</td><td>Betty </td><td> 117</td><td>0.00119871</td><td>Other </td><td>Betty </td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>tmp %&gt;%
ggplot( aes(x=year, y=n)) +
## 用name2显示数据
geom_line( data=tmp %&gt;% dplyr::select(-name), aes(group=name2), color=&quot;grey&quot;, size=0.5, alpha=0.5) +
geom_line( aes(color=name), color=&quot;#69b3a2&quot;, size=1.2 )+
scale_color_viridis(discrete = TRUE) +
theme(
  legend.position=&quot;none&quot;,
  plot.title = element_text(size=14),
  panel.grid = element_blank()
) +
ggtitle(&quot;A spaghetti chart of baby names popularity&quot;) +
## 用name分图
facet_wrap(~name)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点3-意大利面条图/output_17_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>`,37),h={href:"https://www.data-to-viz.com/caveat/spaghetti.html",target:"_blank",rel:"noopener noreferrer"};function u(m,p){const d=a("ExternalLinkIcon");return i(),n("div",null,[c,t("ul",null,[t("li",null,[t("a",h,[l("THE SPAGHETTI PLOT"),r(d)])])])])}const g=e(o,[["render",u],["__file","2021-11-24-_数据分析与可视化_ 数据绘图要点3-意大利面条图.html.vue"]]);export{g as default};
