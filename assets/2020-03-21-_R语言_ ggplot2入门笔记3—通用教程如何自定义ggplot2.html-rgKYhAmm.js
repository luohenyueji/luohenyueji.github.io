import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as a,c as l,a as e,d as s,b as d,e as o}from"./app-MsA2k2kn.js";const r={},c=e("h1",{id:"r语言-ggplot2入门笔记3—通用教程如何自定义ggplot2",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#r语言-ggplot2入门笔记3—通用教程如何自定义ggplot2","aria-hidden":"true"},"#"),d(" [R语言] ggplot2入门笔记3—通用教程如何自定义ggplot2")],-1),u={href:"https://github.com/luohenyueji/R-Study-Notes/blob/master/ggplot2%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B0/%5BR%E8%AF%AD%E8%A8%80%5D%20ggplot2%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B03%E2%80%94%E9%80%9A%E7%94%A8%E6%95%99%E7%A8%8B%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89ggplot2.ipynb",target:"_blank",rel:"noopener noreferrer"},g=e("strong",null,"代码下载地址",-1),m=o(`<p>以前，我们看到了使用ggplot2软件包制作图表的简短教程。它很快涉及制作ggplot的各个方面。现在，这是一个完整而完整的教程。现在讨论如何构造和自定义几乎所有ggplot。它涉及的原则，步骤和微妙之处，使图像的情节有效和更具视觉吸引力。因此，出于实用目的，我希望本教程可以作为书签参考，对您日常的绘图工作很有用。 这是ggplot2的三部分通用教程的第1部分，ggplot2是R中的美观（非常流行）的图形框架。该教程主要针对具有R编程语言的一些基本知识并希望制作复杂且美观的图表的用户与R ggplot2。</p><ul><li>ggplot2简介(Introduction to ggplot2)</li><li>自定义外观(Customizing the Look and Feel)</li><li>前50个ggplot2可视化效果(top 50 ggplot2 Visualizations)</li></ul><p>ggplot2简介涵盖了有关构建简单ggplot以及修改组件和外观的基本知识；自定义外观是关于图像的自定义，如使用多图，自定义布局操作图例、注释；前50个ggplot2可视化效果应用在第1部分和第2部分中学到的知识来构造其他类型的ggplot，例如条形图，箱形图等。</p><p>在本教程中，我将讨论如何自定义一个情节的6个最重要美学的外观。总而言之，它提供了一个相当全面的列表，详细说明了如何完成自定义任务。该章节主要内容有：</p><ol><li>添加图和轴标题(Adding Plot and Axis Titles)</li><li>修改图例(Modifying Legend)</li><li>添加文本，标签和注释(Adding Text, Label and Annotation)</li><li>翻转和反转X和Y轴(Flipping and Reversing X and Y Axis)</li><li>分面：在一个图形中绘制多个图(Faceting: Draw multiple plots within one figure)</li><li>修改图背景，长轴和短轴(Modifying Plot Background, Major and Minor Axis)</li></ol><p><strong>参考文档</strong></p><blockquote><p>http://r-statistics.co/Complete-Ggplot2-Tutorial-Part1-With-R-Code.html</p></blockquote><p>让我们从midwest数据集中的人口相对于面积的散点图开始。点的颜色和大小分别基于state（类别）和popdensity（连续）列而变化。我们已经在之前的ggplot2教程中做了类似的事情。下面的图表很好地包含了必要的组件，例如标题，轴标签和图例设置。但是如何修改外观？使用该theme()功能可以实现与外观有关的大多数要求。它接受大量参数。R控制台键入?theme，然后自己查看相关参数。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Setup
options(scipen=999)
library(ggplot2)
data(&quot;midwest&quot;, package = &quot;ggplot2&quot;)
theme_set(theme_bw())

# Add plot components --------------------------------
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# Call plot ------------------------------------------
plot(gg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggplot2&#39; was built under R version 3.6.1&quot;
Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zXzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>传递给theme()组件的参数需要使用特殊element_type()功能进行设置。它们有4种主要类型：</p><ul><li>element_text()：由于标题，副标题是文本项，element_text()因此使用函数进行设置。</li><li>element_line()：同样element_line()用于修改基于线的组件，例如轴线，主要和次要网格线等。</li><li>element_rect()：修改矩形组件，例如绘图和面板背景。</li><li>element_blank()：关闭显示主题项目。</li></ul><p>有关更多信息，请参见即将进行的讨论。让我们讨论许多与更改绘图输出有关的任务，从修改标题和轴文本开始。</p><h2 id="_1-添加图和轴标题-adding-plot-and-axis-titles" tabindex="-1"><a class="header-anchor" href="#_1-添加图和轴标题-adding-plot-and-axis-titles" aria-hidden="true">#</a> 1. 添加图和轴标题(Adding Plot and Axis Titles)</h2><p>绘图和轴标题以及轴文本是绘图主题的一部分。因此，可以使用theme()功能对其进行修改。该theme()函数接受上述四个element_type()函数之一作为参数。由于图和轴标题是文本组成部分，因此element_text()可用于对其进行修改。在下面，我更改了大小，颜色，面和线高。可以通过更改来旋转轴文本angle。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot 基础绘图
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

library(showtext)
showtext.auto(enable = TRUE)
# 添加字体
font.add(&#39;SimSun&#39;, &#39;simsun.ttc&#39;)

# Modify theme components 
# 修改主题
gg + theme(
    # 设置标题
    plot.title=element_text(size=20, # 字体大小
                            face=&quot;bold&quot;, # 字体加粗
                            family=&quot;SimSun&quot;, # 字体类型
                            color=&quot;tomato&quot;, # 字体颜色
                            hjust=0.5, # 标题离左边距距离
                            lineheight=1.2),  # 线条高度
    # 设置子标题
    plot.subtitle=element_text(size=15, # 字体大小
                               family=&quot;SimSun&quot;, # 字体类型
                               face=&quot;bold&quot;, # 字体加粗
                               hjust=0.5),  # 标题离左边距距离
    # caption 注释
    plot.caption=element_text(size=15),  
    # X axis title X轴标题
    axis.title.x=element_text(vjust=0,
                              size=15), 
    # Y axis title Y轴标题
    axis.title.y=element_text(size=15),
    # X axis text X轴文字
    axis.text.x=element_text(size=10,
                             angle = 30,
                             vjust=.5),
    # Y axis text Y轴文字
    axis.text.y=element_text(size=10))  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;showtext&#39; was built under R version 3.6.2&quot;
Loading required package: sysfonts

Warning message:
&quot;package &#39;sysfonts&#39; was built under R version 3.6.2&quot;
Loading required package: showtextdb

Warning message:
&quot;package &#39;showtextdb&#39; was built under R version 3.6.2&quot;
&#39;showtext.auto()&#39; is now renamed to &#39;showtext_auto()&#39;
The old version still works, but consider using the new function in future code

&#39;font.add()&#39; is now renamed to &#39;font_add()&#39;
The old version still works, but consider using the new function in future code

Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF82XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>上面的示例涵盖了一些经常使用的主题修改，并且实际列表太长。如果要更改任何组件的外观，?theme这就是您要查看的第一处。比较常见参数如下：</p><ul><li>vjust，控制标题（或标签）和绘图之间的垂直间距。</li><li>hjust，控制水平间距。将其设置为0.5可使标题居中。</li><li>family，用于设置新字体</li><li>face，设置字体(“plain”, “italic”, “bold”, “bold.italic”)</li></ul><h2 id="_2-修改图例-modifying-legend" tabindex="-1"><a class="header-anchor" href="#_2-修改图例-modifying-legend" aria-hidden="true">#</a> 2. 修改图例(Modifying Legend)</h2><p>无论何时将绘图的几何图形(如点、线、条等)设置为基于另一列更改美学(填充、大小、列、形状或描边)，如geom_point(aes(ol=state，size=popensity))，都会自动绘制图例。如果要创建美学不变的几何图形，则默认情况下不会绘制图例。在这种情况下，您可能需要手动创建自己的图例。以下示例适用于自动创建图例的情况。<br> 本节主要内容有：</p><ul><li>如何更改图例标题(How to Change the Legend Title)</li><li>如何更改类别的图例标签和点颜色(How to Change Legend Labels and Point Colors for Categories)</li><li>更改图例顺序(Change the Order of Legend)</li><li>如何设置图例标题、文本和键的样式(How to Style the Legend Title, Text and Key)</li><li>如何删除图例和更改图例位置(How to Remove the Legend and Change Legend Positions)</li></ul><h3 id="_2-1-如何更改图例标题-how-to-change-the-legend-title" tabindex="-1"><a class="header-anchor" href="#_2-1-如何更改图例标题-how-to-change-the-legend-title" aria-hidden="true">#</a> 2.1 如何更改图例标题(How to Change the Legend Title)</h3><p>现在让我们更改图例标题。我们有两个图例，颜色和大小。大小基于连续变量，而颜色基于分类（离散）变量。有3种方法可以更改图例标题。</p><p><strong>方法1：使用 labs()</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# modify legend title
# 单独调用labs修改颜色和字体
gg + labs(color=&quot;State&quot;, size=&quot;Density&quot;)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8xMV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>方法2：使用 guides()</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# modify legend title
# 修改legend
gg &lt;- gg + guides(color=guide_legend(&quot;State&quot;), size=guide_legend(&quot;Density&quot;))
plot(gg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8xM18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>方法3：使用scale_aesthetic_vartype()格式</strong><br> scale_estheic_vartype()的格式允许您关闭一种特定美学的图例，而保留其余部分。这只需设置GUIDE=FALSE即可。例如，如果图例用于基于连续变量的点大小，则SCALE_SIZE_CONTINUOUE()函数将是正确的。如果您有形状图例并且基于分类变量，您能猜出要使用什么功能吗？</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# Modify Legend 修改图例
# guide = FALSE turn off legend for size 关闭size的图例
# scale_color_discrete(name=&quot;States&quot;) 设置离散颜色变量的图例
gg + scale_color_discrete(name=&quot;States&quot;) + scale_size_continuous(name = &quot;Density&quot;, guide = FALSE)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8xNV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-如何更改类别的图例标签和点颜色-how-to-change-legend-labels-and-point-colors-for-categories" tabindex="-1"><a class="header-anchor" href="#_2-2-如何更改类别的图例标签和点颜色-how-to-change-legend-labels-and-point-colors-for-categories" aria-hidden="true">#</a> 2.2 如何更改类别的图例标签和点颜色(How to Change Legend Labels and Point Colors for Categories)</h3><p>可以使用相应的scale_aesthetic_manual()功能来完成。新的图例标签将作为字符向量提供给自labels变量。如果要更改类别的颜色，可以将其分配给自values变量，如下例所示：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

gg + scale_color_manual(name=&quot;State&quot;, 
                        # 设置标签
                        labels = c(&quot;Illinois&quot;, 
                                   &quot;Indiana&quot;, 
                                   &quot;Michigan&quot;, 
                                   &quot;Ohio&quot;, 
                                   &quot;Wisconsin&quot;), 
                        # 设置标签对应的颜色
                        values = c(&quot;IL&quot;=&quot;blue&quot;, 
                                   &quot;IN&quot;=&quot;red&quot;, 
                                   &quot;MI&quot;=&quot;green&quot;, 
                                   &quot;OH&quot;=&quot;brown&quot;, 
                                   &quot;WI&quot;=&quot;orange&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8xN18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-更改图例顺序-change-the-order-of-legend" tabindex="-1"><a class="header-anchor" href="#_2-3-更改图例顺序-change-the-order-of-legend" aria-hidden="true">#</a> 2.3 更改图例顺序(Change the Order of Legend)</h3><p>如果要在大小（密度）之前显示颜色（状态）的图例，可以使用guides（）函数完成。图例的顺序order 必须根据需要设置。如果要更改图例中标签的位置，请按照上一示例中所示的要求顺序进行设置。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# order设置位置顺序
gg + guides(colour = guide_legend(order = 2), size = guide_legend(order = 1))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8xOV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-4-如何设置图例标题、文本和键的样式-how-to-style-the-legend-title-text-and-key" tabindex="-1"><a class="header-anchor" href="#_2-4-如何设置图例标题、文本和键的样式-how-to-style-the-legend-title-text-and-key" aria-hidden="true">#</a> 2.4 如何设置图例标题、文本和键的样式(How to Style the Legend Title, Text and Key)</h3><p>图例标题，文本，键和指南的样式也可以调整。图例的键是一个类似元素的图形，因此必须使用element_rect()功能进行设置。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

gg + theme(
    # 设置图例标题字体颜色和大小
    legend.title = element_text(size=12, color = &quot;firebrick&quot;), 
    # 设置图例内容文字大小
    legend.text = element_text(size=10),
    # 设置背景色
    legend.key=element_rect(fill=&#39;springgreen&#39;)) +
# 设置内部图例圆圈大小和间距
guides(colour = guide_legend(override.aes = list(size=2, stroke=1.5))) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yMV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-5-如何删除图例和更改图例位置-how-to-remove-the-legend-and-change-legend-positions" tabindex="-1"><a class="header-anchor" href="#_2-5-如何删除图例和更改图例位置-how-to-remove-the-legend-and-change-legend-positions" aria-hidden="true">#</a> 2.5 如何删除图例和更改图例位置(How to Remove the Legend and Change Legend Positions)</h3><p>图像在情节中的位置是theme的一个方面。因此可以使用theme（）函数对其进行修改。如果要将图例放置在绘图中，还可以使用legend.justification控制图例的铰点。Legend.position是图表区域中的x轴和y轴位置，其中(0，0)是图表的左下角，(1，1)是右上角。同样，legend.justification是指图例内部的铰链点。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# No legend 
# 无图例
gg + theme(legend.position=&quot;None&quot;) + labs(subtitle=&quot;No Legend&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yM18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Legend to the left 图例位置在左边
gg + theme(legend.position=&quot;left&quot;) + labs(subtitle=&quot;Legend on the Left&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yNF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># legend at the bottom and horizontal
# 图例位于图像底部，图例水平摆放
gg + theme(legend.position=&quot;bottom&quot;, legend.box = &quot;horizontal&quot;) + labs(subtitle=&quot;Legend at Bottom&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yNV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># legend at bottom-right, inside the plot
# 图例位于图像内部右下角
gg + theme(
    # 设置图像标题
    legend.title = element_text(size=12, color = &quot;salmon&quot;, face=&quot;bold&quot;),
    # 设置图像铰点为图内左下角
    legend.justification=c(1,0), 
    # 图例位置
    legend.position=c(0.95, 0.05), 
    # 图例背景
    legend.background = element_blank(),
    # 图例填充颜色
    legend.key = element_blank()) + 
labs(subtitle=&quot;Legend: Bottom-Right Inside the Plot&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yNl8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># legend at top-left, inside the plot 
# 图例位于图像内部左上角
gg + theme(
    # 设置标题名
    legend.title = element_text(size=12, color = &quot;salmon&quot;, face=&quot;bold&quot;),
    # 设置图像铰点为图内右上角
    legend.justification=c(0,1), 
    legend.position=c(0.05, 0.95),
    legend.background = element_blank(),
    legend.key = element_blank()) + 
labs(subtitle=&quot;Legend: Top-Left Inside the Plot&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8yN18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-添加文本-标签和注释-adding-text-label-and-annotation" tabindex="-1"><a class="header-anchor" href="#_3-添加文本-标签和注释-adding-text-label-and-annotation" aria-hidden="true">#</a> 3. 添加文本，标签和注释(Adding Text, Label and Annotation)</h2><p>本节主要内容有：</p><ul><li>如何在点周围添加文本和标签(How to Add Text and Label around the Points)</li><li>如何在绘图中的任何地方添加注释(How to Add Annotations Anywhere inside Plot)</li></ul><h3 id="_3-1-如何在点周围添加文本和标签-how-to-add-text-and-label-around-the-points" tabindex="-1"><a class="header-anchor" href="#_3-1-如何在点周围添加文本和标签-how-to-add-text-and-label-around-the-points" aria-hidden="true">#</a> 3.1 如何在点周围添加文本和标签(How to Add Text and Label around the Points)</h3><p>让我们试着添加一些文本。我们将只向人口超过40万的县添加文本。为了实现这一点，我创建了另一个子集数据框（中西部子数据框），其中只包含符合上述条件的县。然后用这个新的数据框作为数据源绘制geom文本和geom标签。这将确保仅为新数据帧中包含的点添加标签（geom label）。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Filter required rows.
# 获取数据
midwest_sub &lt;- midwest[midwest$poptotal &gt; 300000, ]
midwest_sub$large_county &lt;- ifelse(midwest_sub$poptotal &gt; 300000, midwest_sub$county, &quot;&quot;)

# Base Plot
# 基础绘图
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot text and label
# 添加标签
gg + geom_text(aes(label=large_county), size=2, data=midwest_sub) + 
# 小标题
labs(subtitle=&quot;With ggplot2::geom_text&quot;) + 
# 无图例
theme(legend.position = &quot;None&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
Warning message:
&quot;Removed 14 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zMV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 添加标签和透明度
gg + geom_label(aes(label=large_county), size=2, data=midwest_sub, alpha=0.25) + 
labs(subtitle=&quot;With ggplot2::geom_label&quot;) + 
theme(legend.position = &quot;None&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
Warning message:
&quot;Removed 14 rows containing missing values (geom_label).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zMl8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggrepel)
# 调用ggrepel库添加标签
gg + geom_text_repel(aes(label=large_county), size=2, data=midwest_sub) + 
labs(subtitle=&quot;With ggrepel::geom_text_repel&quot;) + theme(legend.position = &quot;None&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
Warning message:
&quot;Removed 14 rows containing missing values (geom_text_repel).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zM18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>gg + geom_label_repel(aes(label=large_county), size=2, data=midwest_sub) + 
labs(subtitle=&quot;With ggrepel::geom_label_repel&quot;) + theme(legend.position = &quot;None&quot;)   # label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
Warning message:
&quot;Removed 14 rows containing missing values (geom_label_repel).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zNF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-如何在绘图中的任何地方添加注释-how-to-add-annotations-anywhere-inside-plot" tabindex="-1"><a class="header-anchor" href="#_3-2-如何在绘图中的任何地方添加注释-how-to-add-annotations-anywhere-inside-plot" aria-hidden="true">#</a> 3.2 如何在绘图中的任何地方添加注释(How to Add Annotations Anywhere inside Plot)</h3><p>让我们看看如何向图表的任何特定点添加批注。它可以使用annotation_custom()函数完成，该函数接受grob作为参数。所以，让我们创建一个grob来保存您想要使用grid包显示的文本。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
# 基础绘图
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;)

# Define and add annotation
library(grid)
#文本
my_text &lt;- &quot;This text is at x=0.7 and y=0.8!&quot;
#my_grob = grid.text(my_text, x=0.7 and y=0.8, gp=gpar(col=&quot;firebrick&quot;, fontsize=14, fontface=&quot;bold&quot;))
#gg + annotation_custom(my_grob)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-翻转和反转x和y轴-flipping-and-reversing-x-and-y-axis" tabindex="-1"><a class="header-anchor" href="#_4-翻转和反转x和y轴-flipping-and-reversing-x-and-y-axis" aria-hidden="true">#</a> 4. 翻转和反转X和Y轴(Flipping and Reversing X and Y Axis)</h2><p>本节主要内容有：</p><ul><li>如何翻转X和Y轴？(How to flip the X and Y axis?)</li><li>如何反转轴？(How to reverse the scale of an axis?)</li></ul><h3 id="_4-1-如何翻转x和y轴-how-to-flip-the-x-and-y-axis" tabindex="-1"><a class="header-anchor" href="#_4-1-如何翻转x和y轴-how-to-flip-the-x-and-y-axis" aria-hidden="true">#</a> 4.1 如何翻转X和Y轴？(How to flip the X and Y axis?)</h3><p>只需添加即可coord_flip()。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;, subtitle=&quot;X and Y axis Flipped&quot;) + 
theme(legend.position = &quot;None&quot;)

# Flip the X and Y axis -------------------------------------------------
# 翻转X和Y轴
gg + coord_flip()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF8zOV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-2-如何反转轴-how-to-reverse-the-scale-of-an-axis" tabindex="-1"><a class="header-anchor" href="#_4-2-如何反转轴-how-to-reverse-the-scale-of-an-axis" aria-hidden="true">#</a> 4.2 如何反转轴？(How to reverse the scale of an axis?)</h3><p>这很简单。使用scale_x_reverse()反转X轴和scale_y_reverse()反转Y轴。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
geom_point(aes(col=state, size=popdensity)) + 
geom_smooth(method=&quot;loess&quot;, se=F) + xlim(c(0, 0.1)) + ylim(c(0, 500000)) + 
labs(title=&quot;Area Vs Population&quot;, y=&quot;Population&quot;, x=&quot;Area&quot;, caption=&quot;Source: midwest&quot;, subtitle=&quot;Axis Scales Reversed&quot;) + 
theme(legend.position = &quot;None&quot;)

# Reverse the X and Y Axis ---------------------------
# 反转X轴和Y轴
gg + scale_x_reverse() + scale_y_reverse()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Scale for &#39;x&#39; is already present. Adding another scale for &#39;x&#39;, which will
replace the existing scale.

Scale for &#39;y&#39; is already present. Adding another scale for &#39;y&#39;, which will
replace the existing scale.
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF80MV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_5-分面-在一个图形中绘制多个图-faceting-draw-multiple-plots-within-one-figure" tabindex="-1"><a class="header-anchor" href="#_5-分面-在一个图形中绘制多个图-faceting-draw-multiple-plots-within-one-figure" aria-hidden="true">#</a> 5. 分面：在一个图形中绘制多个图(Faceting: Draw multiple plots within one figure)</h2><p>让我们对此使用mpg数据集，它位于ggplot2包中。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
# 载入数据
data(mpg, package=&quot;ggplot2&quot;)
# 展示数据
head(mpg)
# 画图
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
geom_point() + 
labs(title=&quot;hwy vs displ&quot;, caption = &quot;Source: mpg&quot;) +
geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
theme_bw()
plot(g)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A tibble: 6 × 11</caption><thead><tr><th scope="col">manufacturer</th><th scope="col">model</th><th scope="col">displ</th><th scope="col">year</th><th scope="col">cyl</th><th scope="col">trans</th><th scope="col">drv</th><th scope="col">cty</th><th scope="col">hwy</th><th scope="col">fl</th><th scope="col">class</th></tr><tr><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>audi</td><td>a4</td><td>1.8</td><td>1999</td><td>4</td><td>auto(l5) </td><td>f</td><td>18</td><td>29</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>1.8</td><td>1999</td><td>4</td><td>manual(m5)</td><td>f</td><td>21</td><td>29</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.0</td><td>2008</td><td>4</td><td>manual(m6)</td><td>f</td><td>20</td><td>31</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.0</td><td>2008</td><td>4</td><td>auto(av) </td><td>f</td><td>21</td><td>30</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.8</td><td>1999</td><td>6</td><td>auto(l5) </td><td>f</td><td>16</td><td>26</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.8</td><td>1999</td><td>6</td><td>manual(m5)</td><td>f</td><td>18</td><td>26</td><td>p</td><td>compact</td></tr></tbody></table><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF80M18xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>对于整个数据集，我们有一个简单的公路行驶里程(hwy)与发动机排量的图表(displ)。但是，如果您想研究这种关系对于不同类型的车辆如何变化？本文具体介绍以下两种分面方式：</p><ul><li>Facet Wrap</li><li>Facet Grid</li></ul><h3 id="_5-1-facet-wrap" tabindex="-1"><a class="header-anchor" href="#_5-1-facet-wrap" aria-hidden="true">#</a> 5.1 Facet Wrap</h3><p>facet_wrap()用于针对各个类别将一个大图分解为多个小图。它以公式为主要参数。~左边的项目形成行，右边的项目形成列。默认情况下，所有的图在x轴和y轴上共享相同的标度。您可以通过设置scales=“free”来释放它们，但这样就很难在组之间进行比较。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
      geom_point() + 
      geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
      theme_bw()

# Facet wrap with common scales
# 分面
# 以为class为列，分为3行
g + facet_wrap( ~ class, nrow=3) + 
# 共享标尺
labs(title=&quot;hwy vs displ&quot;, caption = &quot;Source: mpg&quot;, subtitle=&quot;Ggplot2 - Faceting - Multiple plots in one figure&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF80Nl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Facet wrap with free scales
# 以列作为分块
g + facet_wrap( ~ class, scales = &quot;free&quot;) + 
labs(title=&quot;hwy vs displ&quot;, caption = &quot;Source: mpg&quot;, subtitle=&quot;Ggplot2 - Faceting - Multiple plots in one figure with free scales&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF80N18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>那么，您从中得出什么呢？首先，大多数2座汽车的发动机排量较高，而小型货车和紧凑型汽车的排量较低。从沿X轴放置点的位置可以明显看出这一点。另外，随着发动机排量的增加，高速公路里程在所有路段上均下降。在小型和超小型车辆中，这种下降似乎更为明显。</p><h3 id="_5-2-facet-grid" tabindex="-1"><a class="header-anchor" href="#_5-2-facet-grid" aria-hidden="true">#</a> 5.2 Facet Grid</h3><p>中间行和底部行的标题占据了相当大的空间。facet_grid()将去掉它，并为图表提供更多的区域。facet_grid的主要区别在于不能选择网格中的行数和列数。好了，让我们创建一个网格以查看其随制造商的变化。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
geom_point() + 
labs(title=&quot;hwy vs displ&quot;, caption = &quot;Source: mpg&quot;, subtitle=&quot;Ggplot2 - Faceting - Multiple plots in one figure&quot;) +
geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
theme_bw()
# Add Facet Grid
# manufacturer in rows and class in columns
# 添加分面，列为class，行为manufacturer
g1 &lt;- g + facet_grid(manufacturer ~ class)  
plot(g1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81MF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>好吧，让我们创建一个网格，看看它是如何随cylinder而变化的。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
geom_point() + 
geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
labs(title=&quot;hwy vs displ&quot;, caption = &quot;Source: mpg&quot;, subtitle=&quot;Ggplot2 - Facet Grid - Multiple plots in one figure&quot;) +
theme_bw()

# Add Facet Grid
# cyl in rows and class in columns.
g2 &lt;- g + facet_grid(cyl ~ class)  
plot(g2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81Ml8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>很好，可以在示例面板中同时布局这两个图表，但我更喜欢gridExtra（）包。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Draw Multiple plots in same figure.
library(gridExtra)
gridExtra::grid.arrange(g1, g2, ncol=2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81NF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_6-修改图背景-长轴和短轴-modifying-plot-background-major-and-minor-axis" tabindex="-1"><a class="header-anchor" href="#_6-修改图背景-长轴和短轴-modifying-plot-background-major-and-minor-axis" aria-hidden="true">#</a> 6. 修改图背景，长轴和短轴(Modifying Plot Background, Major and Minor Axis)</h2><p>本节主要内容有:</p><ul><li>如何更改绘图背景(How to Change Plot background)</li><li>如何删除主要和次要网格，更改边框，轴标题，文本和标题(How to Remove Major and Minor Grid, Change Border, Axis Title, Text and Ticks)</li><li>主题组件的继承结构(Inheritance Structure of Theme Components)</li></ul><h3 id="_6-1-如何更改绘图背景-how-to-change-plot-background" tabindex="-1"><a class="header-anchor" href="#_6-1-如何更改绘图背景-how-to-change-plot-background" aria-hidden="true">#</a> 6.1 如何更改绘图背景(How to Change Plot background)</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
# 基础绘图
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
geom_point() + 
geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
theme_bw()  
g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81N18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Change Plot Background elements
# 改变图像背景
g + theme(
    # 设置背景色
    panel.background = element_rect(fill = &#39;khaki&#39;),
    # 设置图像网格主间隔
    panel.grid.major = element_line(colour = &quot;burlywood&quot;, size=1.5),
    # 设置图像网格次间隔
    panel.grid.minor = element_line(colour = &quot;tomato&quot;, size=.25, linetype = &quot;dashed&quot;),
    # 设置图像边缘
    panel.border = element_blank(),
    # x轴颜色宽度
    axis.line.x = element_line(colour = &quot;darkorange&quot;, size=1.5, lineend = &quot;butt&quot;),
    # y轴颜色宽度
    axis.line.y = element_line(colour = &quot;darkorange&quot;, size=1.5)) +
labs(title=&quot;Modified Background&quot;, subtitle=&quot;How to Change Major and Minor grid, Axis Lines, No Border&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81OF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Change Plot Margins 
g + theme(plot.background=element_rect(fill=&quot;salmon&quot;), 
          # top, right, bottom, left
          # 设置图像边缘
          plot.margin = unit(c(2, 2, 1, 1), &quot;cm&quot;)) +
labs(title=&quot;Modified Background&quot;, subtitle=&quot;How to Change Plot Margin&quot;)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF81OV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-2-如何删除主要和次要网格-更改边框-轴标题-文本和标题-how-to-remove-major-and-minor-grid-change-border-axis-title-text-and-ticks" tabindex="-1"><a class="header-anchor" href="#_6-2-如何删除主要和次要网格-更改边框-轴标题-文本和标题-how-to-remove-major-and-minor-grid-change-border-axis-title-text-and-ticks" aria-hidden="true">#</a> 6.2 如何删除主要和次要网格，更改边框，轴标题，文本和标题(How to Remove Major and Minor Grid, Change Border, Axis Title, Text and Ticks）</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)

# Base Plot
# 基础绘图
g &lt;- ggplot(mpg, aes(x=displ, y=hwy)) + 
geom_point() + 
geom_smooth(method=&quot;lm&quot;, se=FALSE) + 
theme_bw()

g + theme(
    # 主网格空白
    panel.grid.major = element_blank(), 
    # 次网格空白
    panel.grid.minor = element_blank(), 
    # 边缘空白
    panel.border = element_blank(),
    # 标题空白
    axis.title = element_blank(), 
    # 轴文字空白
    axis.text = element_blank(),
    axis.ticks = element_blank()) +

labs(title=&quot;Modified Background&quot;, subtitle=&quot;How to remove major and minor axis grid, border, axis title, text and ticks&quot;) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC8zL291dHB1dF82MV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-3-主题组件的继承结构-inheritance-structure-of-theme-components" tabindex="-1"><a class="header-anchor" href="#_6-3-主题组件的继承结构-inheritance-structure-of-theme-components" aria-hidden="true">#</a> 6.3 主题组件的继承结构(Inheritance Structure of Theme Components)</h3><figure><img src="https://imgconvert.csdnimg.cn/aHR0cDovL3Itc3RhdGlzdGljcy5jby9zY3JlZW5zaG90cy9nZ3Bsb3RfdHV0b3JpYWxfY3VzdG9taXplX3RoZW1lXzI5LnBuZw?x-oss-process=image/format,png#pic_center" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>`,143);function v(p,b){const n=t("ExternalLinkIcon");return a(),l("div",null,[c,e("p",null,[e("a",u,[g,s(n)])]),m])}const q=i(r,[["render",v],["__file","2020-03-21-_R语言_ ggplot2入门笔记3—通用教程如何自定义ggplot2.html.vue"]]);export{q as default};
