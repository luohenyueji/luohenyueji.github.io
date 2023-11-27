import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as s,c as d,a as e,b as i,d as n,e as t}from"./app-MsA2k2kn.js";const o={},u=t('<h1 id="数据分析与可视化-数据绘图要点9-颜色的选择" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点9-颜色的选择" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点9-颜色的选择</h1><p>颜色是数据可视化中传达信息的主要媒介之一。它们允许我们适当突出显示组或变量，但颜色错误的选择可能会造成混淆或误导。本文主要介绍如何在绘图时选择合适的颜色。</p><h2 id="颜色绘图要点" tabindex="-1"><a class="header-anchor" href="#颜色绘图要点" aria-hidden="true">#</a> 颜色绘图要点</h2><h3 id="准确选择图表类型" tabindex="-1"><a class="header-anchor" href="#准确选择图表类型" aria-hidden="true">#</a> 准确选择图表类型</h3><p>如下图所示，左图选择使用渐变色表现变量值的变化趋势，但是渐变色很难体现实际值之间的差异。因此推荐使用条形、位置（如在点图中）甚至区域来显示最重要的值，而颜色仅用于显示类别，如右图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>此外如果图表中显示超过七种颜色，应该考虑使用其他图表类型或将类别组合在一起。如下图所示。左图颜色过多导致图片难以阅读，我们可以通过考虑使用另一种图表类型如右图所示，更好展示数据。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="如何做出更好的颜色选择" tabindex="-1"><a class="header-anchor" href="#如何做出更好的颜色选择" aria-hidden="true">#</a> 如何做出更好的颜色选择</h3><p><strong>考虑对相同的变量使用相同的颜色</strong></p><p>如下图所使，同一个变量在不同图表类型中应该使用同样的颜色。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>准确表示颜色表示的信息</strong></p><p>应准确解释颜色代表的信息，如条形的高度是什么意思？符圆圈的大小代表什么？颜色也是如此。下图就是一个典型实例。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>对图表中不太重要的元素使用灰色</strong></p><p>对图表中不太重要的元素使用灰色会使您的突出显示颜色（最重要的数据点）更加突出。灰色对于一般上下文数据、不太重要的注释、用户未选择的内容或使图表的整体视觉印象平静下来很有帮助。由于灰色看起来有点冷，请考虑将其与暖色一起使用。如下图左图所示，过多数据容易导致颜色混乱。右图通过灰色表示不重要数据，展示效果要好很多。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>使用直观的颜色</strong></p><p>选择调色板时，请考虑它们在目标受众文化中的意义。如果可能，使用读者无论如何都会与您的数据相关联的颜色，例如自然色：森林=绿色，湖泊=蓝色；或学习颜色：红色 = 注意力/停止/坏，绿色 = 好（运行）。在对性别数据进行颜色选择时，为了不完全混淆您的读者，请为男性尝试冷色（例如蓝色或紫色），为女性尝试暖色（例如黄色、橙色或暖绿色）。如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>对低值使用浅色，对高值使用深色</strong></p><p>使用颜色渐变时，请确保亮色代表低值，而深色代表高值。这对大多数读者来说是最直观的。如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>不要对类别使用渐变调色板，反之亦然</strong></p><p>许多人会将深色与“多/高”联系起来，将亮色与“少/低”联系起来，这样的调色板将暗示您的类别排名。为您的类别使用不同的色调（绿色、黄色、粉红色等）以避免这种情况。但是如果发现图表过于丰富多彩，请考虑为您的数据使用另一种图表类型。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_8.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>考虑为渐变使用两种色调，而不仅仅是一种</strong></p><p>如果通过亮度和两个或三个精心挑选的色调进行颜色显示，读者将能够更好地区渐变色。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/image/img9_9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>学术绘图</strong></p>',31),c={href:"https://blog.csdn.net/LuohenYJ/article/details/118268302",target:"_blank",rel:"noopener noreferrer"},g=t(`<h3 id="绘图实例" tabindex="-1"><a class="header-anchor" href="#绘图实例" aria-hidden="true">#</a> 绘图实例</h3><p>总之颜色的选择最重要的一点就是，用最合适的颜色突出最有用的信息。下面介绍一个应用实例，关于某个商品各个国家出口数据展示。让我们看看如何更加有效展示颜色信息。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 加载库
library(tidyverse)
library(hrbrthemes)
library(viridis)

## ## 加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv&quot;, header=TRUE, sep=&quot;,&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建颜色调色板
mycolors &lt;- colors()[sample(1:400, nrow(data))]

## 处理数据
data&lt;-filter(data,!is.na(Value))
data&lt;-arrange(data,Value)
data&lt;-tail(data,20)
data&lt;-mutate(data,Country=factor(Country, Country))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
ggplot(data,aes(x=Country, y=Value, fill=Country) ) +
geom_bar(stat=&quot;identity&quot;) +
scale_fill_manual( values = mycolors ) +
coord_flip() +
theme(
  panel.grid.minor.y = element_blank(),
  panel.grid.major.y = element_blank(),
  legend.position=&quot;none&quot;
) +
xlab(&quot;&quot;) +
ylab(&quot;Weapon quantity (SIPRI trend-indicator value)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点9-颜色的选择/output_14_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>由上图可以看到颜色过于复杂，各组的颜色都是随机表示，会导致数据信息难以阅读。你的目的是让观众了解数据信息，一种好的办法就是用同样的颜色显示各组信息。如下图所示，这是使用单一颜色的相同图形。在我看来，它更好地传达了信息：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data, aes(x=Country, y=Value) ) +
geom_bar(stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;) +
coord_flip() +
theme(
panel.grid.minor.y = element_blank(),
panel.grid.major.y = element_blank(),
legend.position=&quot;none&quot;
) +
xlab(&quot;&quot;) +
ylab(&quot;Weapon quantity (SIPRI trend-indicator value)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点9-颜色的选择/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>当然，可以使用突出颜色显示所选某些重要数据，这是一种常见的做法。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(data, aes(x=Country, y=Value, fill=Value) ) +
geom_bar(stat=&quot;identity&quot;) +
scale_fill_viridis() +
coord_flip() +
theme(
  panel.grid.minor.y = element_blank(),
  panel.grid.major.y = element_blank(),
  legend.position=&quot;none&quot;
) +
xlab(&quot;&quot;) +
ylab(&quot;Weapon quantity (SIPRI trend-indicator value)&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点9-颜色的选择/output_18_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,13),p={href:"https://www.data-to-viz.com/caveat/color_com_nothing.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.datawrapper.de/colors/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/LuohenYJ/article/details/118268302",target:"_blank",rel:"noopener noreferrer"};function b(_,h){const a=r("ExternalLinkIcon");return s(),d("div",null,[u,e("p",null,[i("关于学术绘图和考虑色盲区分图片，可以看看文章"),e("a",c,[i("[数据分析与可视化] 科技论文配色心得"),n(a)])]),g,e("ul",null,[e("li",null,[e("a",p,[i("DON’T USE COLOR IF THEY COMMUNICATE NOTHING"),n(a)])]),e("li",null,[e("a",m,[i("What to consider when choosing colors for data visualization"),n(a)])]),e("li",null,[e("a",v,[i("[数据分析与可视化] 科技论文配色心得"),n(a)])])])])}const x=l(o,[["render",b],["__file","2022-01-01-_数据分析与可视化_ 数据绘图要点9-颜色的选择.html.vue"]]);export{x as default};
