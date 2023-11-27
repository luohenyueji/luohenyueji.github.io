import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as n,c as l,a as e,d as a,b as s,e as r}from"./app-MsA2k2kn.js";const c={},o=e("h1",{id:"r语言-ggplot2入门笔记4—前50个ggplot2可视化效果",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#r语言-ggplot2入门笔记4—前50个ggplot2可视化效果","aria-hidden":"true"},"#"),s(" [R语言] ggplot2入门笔记4—前50个ggplot2可视化效果")],-1),u={href:"https://github.com/luohenyueji/R-Study-Notes/blob/master/ggplot2%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B0/%5BR%E8%AF%AD%E8%A8%80%5D%20ggplot2%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B04%E2%80%94%E5%89%8D50%E4%B8%AAggplot2%E5%8F%AF%E8%A7%86%E5%8C%96%E6%95%88%E6%9E%9C.ipynb",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"代码下载地址",-1),m=r(`<p>以前，我们看到了使用ggplot2软件包制作图表的简短教程。它很快涉及制作ggplot的各个方面。现在，这是一个完整而完整的教程。现在讨论如何构造和自定义几乎所有ggplot。它涉及的原则，步骤和微妙之处，使图像的情节有效和更具视觉吸引力。因此，出于实用目的，我希望本教程可以作为书签参考，对您日常的绘图工作很有用。 这是ggplot2的三部分通用教程的第1部分，ggplot2是R中的美观（非常流行）的图形框架。该教程主要针对具有R编程语言的一些基本知识并希望制作复杂且美观的图表的用户与R ggplot2。</p><ul><li>ggplot2简介(Introduction to ggplot2)</li><li>自定义外观(Customizing the Look and Feel)</li><li>前50个ggplot2可视化效果(top 50 ggplot2 Visualizations)</li></ul><p>ggplot2简介涵盖了有关构建简单ggplot以及修改组件和外观的基本知识；自定义外观是关于图像的自定义，如使用多图，自定义布局操作图例、注释；前50个ggplot2可视化效果应用在第1部分和第2部分中学到的知识来构造其他类型的ggplot，例如条形图，箱形图等。</p><p>有效美观的图表特点为：</p><ol><li>传达正确的信息而不会扭曲事实。</li><li>简单但优雅。它不应该迫使您为获得它而想太多。</li><li>美学支持信息而不是遮蔽信息。</li><li>没有过多的信息。</li></ol><p>本章节介绍了有关构建8种基本类型图像的方法，该章节主要内容有：</p><ol><li>相关性(Correlation)</li><li>偏差(Deviation)</li><li>排名(Ranking)</li><li>分布(Distribution)</li><li>组成(Composition)</li><li>变化(Change)</li><li>群组(Groups)</li></ol><p><strong>参考文档</strong></p><blockquote><p>http://r-statistics.co/Top50-Ggplot2-Visualizations-MasterList-R-Code.html</p></blockquote><h2 id="_1-相关性-correlation" tabindex="-1"><a class="header-anchor" href="#_1-相关性-correlation" aria-hidden="true">#</a> 1 相关性(Correlation)</h2><p>相关性图有助于检查两个变量之间的相关程度。 本节主要内容有：</p><ul><li>散点图(Scatterplot)</li><li>带边界的散点图(Scatterplot With Encircling)</li><li>抖动图(Jitter Plot)</li><li>计数图(Counts Chart)</li><li>气泡图(Bubble Plot)</li><li>边际直方图/箱线图(Marginal Histogram / Boxplot)</li><li>相关图(Correlogram)</li></ul><h3 id="_1-1-散点图-scatterplot" tabindex="-1"><a class="header-anchor" href="#_1-1-散点图-scatterplot" aria-hidden="true">#</a> 1.1 散点图(Scatterplot)</h3><p>数据分析中最常用的图无疑是散点图。每当您想了解两个变量之间关系的性质时，首选始终是散点图。<br> 它可以使用geom_point（）绘制。此外，geom_smooth默认情况下会绘制一条平滑线（基于损失），可以通过设置method=&#39;lm&#39;来调整以绘制最佳拟合线。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># install.packages(&quot;ggplot2&quot;)
# load package and data

# turn-off scientific notation like 1e+48 关闭科学计数法
options(scipen=999)  
library(ggplot2)
# pre-set the bw theme. 设置主题
theme_set(theme_bw())  
# 调用数据集
data(&quot;midwest&quot;, package = &quot;ggplot2&quot;)
# midwest &lt;- read.csv(&quot;http://goo.gl/G1K41K&quot;)  # bkup data source
head(midwest)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggplot2&#39; was built under R version 3.6.1&quot;
</code></pre><table><caption>A tibble: 6 × 28</caption><thead><tr><th scope="col">PID</th><th scope="col">county</th><th scope="col">state</th><th scope="col">area</th><th scope="col">poptotal</th><th scope="col">popdensity</th><th scope="col">popwhite</th><th scope="col">popblack</th><th scope="col">popamerindian</th><th scope="col">popasian</th><th scope="col">...</th><th scope="col">percollege</th><th scope="col">percprof</th><th scope="col">poppovertyknown</th><th scope="col">percpovertyknown</th><th scope="col">percbelowpoverty</th><th scope="col">percchildbelowpovert</th><th scope="col">percadultpoverty</th><th scope="col">percelderlypoverty</th><th scope="col">inmetro</th><th scope="col">category</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>561</td><td>ADAMS </td><td>IL</td><td>0.052</td><td>66090</td><td>1270.9615</td><td>63917</td><td>1702</td><td>98</td><td>249</td><td>...</td><td>19.63139</td><td>4.355859</td><td>63628</td><td>96.27478</td><td>13.151443</td><td>18.01172</td><td>11.009776</td><td>12.443812</td><td>0</td><td>AAR</td></tr><tr><td>562</td><td>ALEXANDER</td><td>IL</td><td>0.014</td><td>10626</td><td> 759.0000</td><td> 7054</td><td>3496</td><td>19</td><td> 48</td><td>...</td><td>11.24331</td><td>2.870315</td><td>10529</td><td>99.08714</td><td>32.244278</td><td>45.82651</td><td>27.385647</td><td>25.228976</td><td>0</td><td>LHR</td></tr><tr><td>563</td><td>BOND </td><td>IL</td><td>0.022</td><td>14991</td><td> 681.4091</td><td>14477</td><td> 429</td><td>35</td><td> 16</td><td>...</td><td>17.03382</td><td>4.488572</td><td>14235</td><td>94.95697</td><td>12.068844</td><td>14.03606</td><td>10.852090</td><td>12.697410</td><td>0</td><td>AAR</td></tr><tr><td>564</td><td>BOONE </td><td>IL</td><td>0.017</td><td>30806</td><td>1812.1176</td><td>29344</td><td> 127</td><td>46</td><td>150</td><td>...</td><td>17.27895</td><td>4.197800</td><td>30337</td><td>98.47757</td><td> 7.209019</td><td>11.17954</td><td> 5.536013</td><td> 6.217047</td><td>1</td><td>ALU</td></tr><tr><td>565</td><td>BROWN </td><td>IL</td><td>0.018</td><td> 5836</td><td> 324.2222</td><td> 5264</td><td> 547</td><td>14</td><td> 5</td><td>...</td><td>14.47600</td><td>3.367680</td><td> 4815</td><td>82.50514</td><td>13.520249</td><td>13.02289</td><td>11.143211</td><td>19.200000</td><td>0</td><td>AAR</td></tr><tr><td>566</td><td>BUREAU </td><td>IL</td><td>0.050</td><td>35688</td><td> 713.7600</td><td>35157</td><td> 50</td><td>65</td><td>195</td><td>...</td><td>18.90462</td><td>3.275891</td><td>35107</td><td>98.37200</td><td>10.399635</td><td>14.15882</td><td> 8.179287</td><td>11.008586</td><td>0</td><td>AAR</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Scatterplot
# 画散点图
gg &lt;- ggplot(midwest, aes(x=area, y=poptotal)) + 
  geom_point(aes(col=state, size=popdensity)) + 
  # 画平滑曲线
  geom_smooth(method=&quot;loess&quot;, se=F) + 
  xlim(c(0, 0.1)) + 
  ylim(c(0, 500000)) + 
  labs(subtitle=&quot;Area Vs Population&quot;, 
       y=&quot;Population&quot;, 
       x=&quot;Area&quot;, 
       title=&quot;Scatterplot&quot;, 
       caption = &quot;Source: midwest&quot;)

plot(gg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF81XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-带边界的散点图-scatterplot-with-encircling" tabindex="-1"><a class="header-anchor" href="#_1-2-带边界的散点图-scatterplot-with-encircling" aria-hidden="true">#</a> 1.2 带边界的散点图(Scatterplot With Encircling)</h3><p>在介绍结果时，有时我会在图表中加上某些特殊的点或区域组，以便引起人们对那些特殊情况的注意。使用ggalt包中的geom_encircle()可以方便地完成此操作。在geom_encircle（）中，将数据设置为仅包含点（行）或兴趣点的新数据帧。此外，还可以展开曲线，以便仅在点之外通过。曲线的颜色和大小（厚度）也可以修改。请参见下面的示例。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># install &#39;ggalt&#39; pkg
# devtools::install_github(&quot;hrbrmstr/ggalt&quot;)
options(scipen = 999)
library(ggplot2)
library(ggalt)

# 筛选符合要求的点
midwest_select &lt;- midwest[midwest$poptotal &gt; 350000 &amp; 
                            midwest$poptotal &lt;= 500000 &amp; 
                            midwest$area &gt; 0.01 &amp; 
                            midwest$area &lt; 0.1, ]

head(midwest_select)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggalt&#39; was built under R version 3.6.3&quot;
Registered S3 methods overwritten by &#39;ggalt&#39;:
  method                  from   
  grid.draw.absoluteGrob  ggplot2
  grobHeight.absoluteGrob ggplot2
  grobWidth.absoluteGrob  ggplot2
  grobX.absoluteGrob      ggplot2
  grobY.absoluteGrob      ggplot2
</code></pre><table><caption>A tibble: 6 × 28</caption><thead><tr><th scope="col">PID</th><th scope="col">county</th><th scope="col">state</th><th scope="col">area</th><th scope="col">poptotal</th><th scope="col">popdensity</th><th scope="col">popwhite</th><th scope="col">popblack</th><th scope="col">popamerindian</th><th scope="col">popasian</th><th scope="col">...</th><th scope="col">percollege</th><th scope="col">percprof</th><th scope="col">poppovertyknown</th><th scope="col">percpovertyknown</th><th scope="col">percbelowpoverty</th><th scope="col">percchildbelowpovert</th><th scope="col">percadultpoverty</th><th scope="col">percelderlypoverty</th><th scope="col">inmetro</th><th scope="col">category</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td> 659</td><td>WILL </td><td>IL</td><td>0.050</td><td>357313</td><td> 7146.260</td><td>303420</td><td> 38361</td><td> 692</td><td>4774</td><td>...</td><td>24.75686</td><td> 5.887232</td><td>348384</td><td>97.50107</td><td> 6.03472</td><td> 7.463085</td><td> 4.799198</td><td> 8.563398</td><td>1</td><td>HLU</td></tr><tr><td> 707</td><td>LAKE </td><td>IN</td><td>0.030</td><td>475594</td><td>15853.133</td><td>334203</td><td>116688</td><td> 865</td><td>2772</td><td>...</td><td>17.66861</td><td> 4.939173</td><td>469774</td><td>98.77627</td><td>13.80515</td><td>21.511037</td><td>11.093432</td><td> 9.955780</td><td>1</td><td>AAU</td></tr><tr><td>1221</td><td>GENESEE</td><td>MI</td><td>0.037</td><td>430459</td><td>11634.027</td><td>336651</td><td> 84257</td><td>3132</td><td>2902</td><td>...</td><td>20.14542</td><td> 4.802019</td><td>425331</td><td>98.80871</td><td>16.46318</td><td>25.235707</td><td>13.843950</td><td> 9.706895</td><td>1</td><td>AAU</td></tr><tr><td>2056</td><td>LUCAS </td><td>OH</td><td>0.021</td><td>462361</td><td>22017.191</td><td>380155</td><td> 68456</td><td>1164</td><td>4981</td><td>...</td><td>23.55043</td><td> 6.005897</td><td>454351</td><td>98.26759</td><td>15.26881</td><td>21.491653</td><td>13.494457</td><td>11.422802</td><td>1</td><td>AAU</td></tr><tr><td>2084</td><td>STARK </td><td>OH</td><td>0.034</td><td>367585</td><td>10811.324</td><td>339421</td><td> 25052</td><td> 950</td><td>1529</td><td>...</td><td>18.98960</td><td> 4.620303</td><td>359231</td><td>97.72733</td><td>11.06057</td><td>16.399197</td><td> 9.510669</td><td> 8.458447</td><td>1</td><td>AAU</td></tr><tr><td>2993</td><td>DANE </td><td>WI</td><td>0.073</td><td>367085</td><td> 5028.562</td><td>344617</td><td> 10511</td><td>1201</td><td>8666</td><td>...</td><td>43.62645</td><td>13.471521</td><td>351558</td><td>95.77019</td><td>10.49301</td><td> 8.767781</td><td>12.168011</td><td> 4.974351</td><td>1</td><td>HAU</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot
ggplot(midwest, aes(x=area, y=poptotal)) + 
  geom_point(aes(col=state, size=popdensity)) +   # draw points
  geom_smooth(method=&quot;loess&quot;, se=F) + 
  xlim(c(0, 0.1)) + 
  # draw smoothing line
  ylim(c(0, 500000)) +  
  # encircle 画边界
  geom_encircle(aes(x=area, y=poptotal), 
                data=midwest_select, 
                color=&quot;red&quot;, 
                size=2, 
                expand=0.08) +   #
  labs(subtitle=&quot;Area Vs Population&quot;, 
       y=&quot;Population&quot;, 
       x=&quot;Area&quot;, 
       title=&quot;Scatterplot + Encircle&quot;, 
       caption=&quot;Source: midwest&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 15 rows containing non-finite values (stat_smooth).&quot;
Warning message:
&quot;Removed 15 rows containing missing values (geom_point).&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF84XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-抖动图-jitter-plot" tabindex="-1"><a class="header-anchor" href="#_1-3-抖动图-jitter-plot" aria-hidden="true">#</a> 1.3 抖动图(Jitter Plot)</h3><p>让我们看一个新的数据来绘制散点图。这一次，我将使用mpg数据集来绘制城市里程（cty）与公路里程（hwy）。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># load package and data
library(ggplot2)
data(mpg, package=&quot;ggplot2&quot;) 
# pre-set the bw theme. 提前设置主题
theme_set(theme_bw())  

g &lt;- ggplot(mpg, aes(cty, hwy))

# Scatterplot
g + geom_point() + 
  geom_smooth(method=&quot;lm&quot;, se=F) +
  labs(subtitle=&quot;mpg: city vs highway mileage&quot;, 
       y=&quot;hwy&quot;, 
       x=&quot;cty&quot;, 
       title=&quot;Scatterplot with overlapping points&quot;, 
       caption=&quot;Source: midwest&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>我们这里有一个城市和公路里程的散点图在mpg数据集。我们看到了一个类似的散点图，这个图看起来很整洁，清楚地说明了城市里程（cty）和公路里程（hwy）之间的关系。但是，这个图像隐藏了一些东西。你能查出来吗？</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>dim(mpg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol class="list-inline"><li>234</li><li>11</li></ol><p>原始数据有234个数据点，但图表显示的数据点似乎较少。发生了什么事？这是因为有许多重叠点显示为一个点。cty和hwy都是源数据集中的整数，这使得隐藏此细节更加方便。所以下次用整数绘制散点图时要格外小心。那怎么处理呢？几乎没有选择。我们可以用jitter_geom（）绘制抖动图。顾名思义，重叠点是基于由width参数控制的阈值围绕其原始位置随机抖动的。宽度越大，点从其原始位置抖动的位置就越多。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># load package and data
library(ggplot2)
data(mpg, package=&quot;ggplot2&quot;)
# mpg &lt;- read.csv(&quot;http://goo.gl/uEeRGu&quot;)

# Scatterplot
# pre-set the bw theme.
theme_set(theme_bw())  
g &lt;- ggplot(mpg, aes(cty, hwy))
# 画抖动图
g + geom_jitter(width = 0.5, size=1) +
  labs(subtitle=&quot;mpg: city vs highway mileage&quot;, 
       y=&quot;hwy&quot;, 
       x=&quot;cty&quot;, 
       title=&quot;Jittered Points&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xNF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-4-计数图-counts-chart" tabindex="-1"><a class="header-anchor" href="#_1-4-计数图-counts-chart" aria-hidden="true">#</a> 1.4 计数图(Counts Chart)</h3><p>克服数据点重叠问题的第二种方法是使用所谓的计数图。如果重叠的点越多，圆的大小就越大。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># load package and data
library(ggplot2)
data(mpg, package=&quot;ggplot2&quot;)
# mpg &lt;- read.csv(&quot;http://goo.gl/uEeRGu&quot;)

# Scatterplot
# pre-set the bw theme.
theme_set(theme_bw())  
g &lt;- ggplot(mpg, aes(cty, hwy))
# 画计数图，show.legent设置图例
g + geom_count(col=&quot;tomato3&quot;, show.legend=F) +
  labs(subtitle=&quot;mpg: city vs highway mileage&quot;, 
       y=&quot;hwy&quot;, 
       x=&quot;cty&quot;, 
       title=&quot;Counts Plot&quot;)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xNl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-5-气泡图-bubble-plot" tabindex="-1"><a class="header-anchor" href="#_1-5-气泡图-bubble-plot" aria-hidden="true">#</a> 1.5 气泡图(Bubble Plot)</h3><p>尽管散点图可让您比较2个连续变量之间的关系，但如果您想基于以下内容理解基础组内的关系，则气泡图非常有用。</p><ol><li>分类变量（通过更改颜色）</li><li>另一个连续变量（通过更改点的大小）</li></ol><p>用简单的话来说，如果您有4维数据，其中两个是数字（X和Y），另一个是分类（颜色），另一个是数字变量（大小），则气泡图更适合。<br> 下图气泡图清楚地区分了制造商之间的显示范围以及最佳拟合线的斜率如何变化，从而提供了组之间更好的视觉比较。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># load package and data
library(ggplot2)
data(mpg, package=&quot;ggplot2&quot;)
# mpg &lt;- read.csv(&quot;http://goo.gl/uEeRGu&quot;)

mpg_select &lt;- mpg[mpg$manufacturer %in% c(&quot;audi&quot;, &quot;ford&quot;, &quot;honda&quot;, &quot;hyundai&quot;), ]

# Scatterplot
theme_set(theme_bw())  # pre-set the bw theme.
g &lt;- ggplot(mpg_select, aes(displ, cty)) + 
  labs(subtitle=&quot;mpg: Displacement vs City Mileage&quot;,
       title=&quot;Bubble chart&quot;)

g + geom_jitter(aes(col=manufacturer, size=hwy)) + 
  # 画平滑曲线
  geom_smooth(aes(col=manufacturer), method=&quot;lm&quot;, se=F)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xOF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-6-边际直方图-箱线图-marginal-histogram-boxplot" tabindex="-1"><a class="header-anchor" href="#_1-6-边际直方图-箱线图-marginal-histogram-boxplot" aria-hidden="true">#</a> 1.6 边际直方图/箱线图(Marginal Histogram / Boxplot)</h3><p>如果要在同一图表中显示关系和分布，请使用边际直方图。它在散点图的边缘处具有X和Y变量的直方图。 可以使用ggMarginal()&#39; ggExtra&#39;包中的函数来实现。除了histogram之外，您还可以通过设置相应的选项type来选择绘制箱形图boxplot或density绘图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># load package and data
library(ggplot2)
library(ggExtra)
data(mpg, package=&quot;ggplot2&quot;)
# mpg &lt;- read.csv(&quot;http://goo.gl/uEeRGu&quot;)

# Scatterplot
theme_set(theme_bw())  # pre-set the bw theme.
mpg_select &lt;- mpg[mpg$hwy &gt;= 35 &amp; mpg$cty &gt; 27, ]
g &lt;- ggplot(mpg, aes(cty, hwy)) + 
  # 绘制计数图
  geom_count() + 
  # se是否绘制置信区间
  geom_smooth(method=&quot;lm&quot;, se=FALSE)

plot(g)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggExtra&#39; was built under R version 3.6.3&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8yMF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 绘制边际直方图
ggMarginal(g, type = &quot;histogram&quot;, fill=&quot;transparent&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8yMV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 绘制边际箱形图
ggMarginal(g, type = &quot;boxplot&quot;, fill=&quot;transparent&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8yMl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 绘制边际核密度图
ggMarginal(g, type = &quot;density&quot;, fill=&quot;transparent&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8yM18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-7-相关图-correlogram" tabindex="-1"><a class="header-anchor" href="#_1-7-相关图-correlogram" aria-hidden="true">#</a> 1.7 相关图(Correlogram)</h3><p>相关图让您检查同一数据帧中存在的多个连续变量的相关性。使用ggcorrplot包可以方便地实现。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># devtools::install_github(&quot;kassambara/ggcorrplot&quot;)
library(ggplot2)
library(ggcorrplot)

# Correlation matrix
data(mtcars)
# 计算相关性结果
corr &lt;- round(cor(mtcars), 1)
corr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggcorrplot&#39; was built under R version 3.6.3&quot;
</code></pre><table><caption>A matrix: 11 × 11 of type dbl</caption><thead><tr><th></th><th scope="col">mpg</th><th scope="col">cyl</th><th scope="col">disp</th><th scope="col">hp</th><th scope="col">drat</th><th scope="col">wt</th><th scope="col">qsec</th><th scope="col">vs</th><th scope="col">am</th><th scope="col">gear</th><th scope="col">carb</th></tr></thead><tbody><tr><th scope="row">mpg</th><td> 1.0</td><td>-0.9</td><td>-0.8</td><td>-0.8</td><td> 0.7</td><td>-0.9</td><td> 0.4</td><td> 0.7</td><td> 0.6</td><td> 0.5</td><td>-0.6</td></tr><tr><th scope="row">cyl</th><td>-0.9</td><td> 1.0</td><td> 0.9</td><td> 0.8</td><td>-0.7</td><td> 0.8</td><td>-0.6</td><td>-0.8</td><td>-0.5</td><td>-0.5</td><td> 0.5</td></tr><tr><th scope="row">disp</th><td>-0.8</td><td> 0.9</td><td> 1.0</td><td> 0.8</td><td>-0.7</td><td> 0.9</td><td>-0.4</td><td>-0.7</td><td>-0.6</td><td>-0.6</td><td> 0.4</td></tr><tr><th scope="row">hp</th><td>-0.8</td><td> 0.8</td><td> 0.8</td><td> 1.0</td><td>-0.4</td><td> 0.7</td><td>-0.7</td><td>-0.7</td><td>-0.2</td><td>-0.1</td><td> 0.7</td></tr><tr><th scope="row">drat</th><td> 0.7</td><td>-0.7</td><td>-0.7</td><td>-0.4</td><td> 1.0</td><td>-0.7</td><td> 0.1</td><td> 0.4</td><td> 0.7</td><td> 0.7</td><td>-0.1</td></tr><tr><th scope="row">wt</th><td>-0.9</td><td> 0.8</td><td> 0.9</td><td> 0.7</td><td>-0.7</td><td> 1.0</td><td>-0.2</td><td>-0.6</td><td>-0.7</td><td>-0.6</td><td> 0.4</td></tr><tr><th scope="row">qsec</th><td> 0.4</td><td>-0.6</td><td>-0.4</td><td>-0.7</td><td> 0.1</td><td>-0.2</td><td> 1.0</td><td> 0.7</td><td>-0.2</td><td>-0.2</td><td>-0.7</td></tr><tr><th scope="row">vs</th><td> 0.7</td><td>-0.8</td><td>-0.7</td><td>-0.7</td><td> 0.4</td><td>-0.6</td><td> 0.7</td><td> 1.0</td><td> 0.2</td><td> 0.2</td><td>-0.6</td></tr><tr><th scope="row">am</th><td> 0.6</td><td>-0.5</td><td>-0.6</td><td>-0.2</td><td> 0.7</td><td>-0.7</td><td>-0.2</td><td> 0.2</td><td> 1.0</td><td> 0.8</td><td> 0.1</td></tr><tr><th scope="row">gear</th><td> 0.5</td><td>-0.5</td><td>-0.6</td><td>-0.1</td><td> 0.7</td><td>-0.6</td><td>-0.2</td><td> 0.2</td><td> 0.8</td><td> 1.0</td><td> 0.3</td></tr><tr><th scope="row">carb</th><td>-0.6</td><td> 0.5</td><td> 0.4</td><td> 0.7</td><td>-0.1</td><td> 0.4</td><td>-0.7</td><td>-0.6</td><td> 0.1</td><td> 0.3</td><td> 1.0</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot
# 画相关系图
ggcorrplot(corr,
           # hc.order是否对相关性矩阵排序
           hc.order = FALSE, 
           # 下三角形显示
           type = &quot;lower&quot;,
           # 是否显示图中数字
           lab = TRUE, 
           # 图中点的大小
           lab_size = 3, 
           # 点的形状square or circle
           method=&quot;circle&quot;, 
           # 颜色
           colors = c(&quot;tomato2&quot;, &quot;white&quot;, &quot;springgreen3&quot;), 
           title=&quot;Correlogram of mtcars&quot;, 
           ggtheme=theme_bw)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8yNl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-偏差-deviation" tabindex="-1"><a class="header-anchor" href="#_2-偏差-deviation" aria-hidden="true">#</a> 2 偏差(Deviation)</h2><p>比较少量项目（或类别）与固定引用值之间的变化用偏差图最好。本节主要内容有：</p><ul><li>发散条形图(Diverging bars)</li><li>发散棒棒糖图(Diverging Lollipop Chart)</li><li>发散点图(Diverging Dot Plot)</li><li>面积图(Area Chart)</li></ul><h3 id="_2-1-发散条形图-diverging-bars" tabindex="-1"><a class="header-anchor" href="#_2-1-发散条形图-diverging-bars" aria-hidden="true">#</a> 2.1 发散条形图(Diverging bars)</h3><p>发散条形图是可以处理负值和正值的条形图。这可以通过使用进行智能调整来实现geom_bar()。但是使用的用法geom_bar()可能会很混乱。那是因为，它可以用来制作条形图和直方图。让我解释。<br> 默认情况下，geom_bar()将stat设置为count。这意味着，当您仅提供连续的X变量（而不提供Y变量）时，它将尝试从数据中生成直方图。为了使条形图创建条形而不是直方图，您需要做两件事。</p><ol><li>设置stat=identity</li><li>同时提供x和y</li></ol><p>为了确保您获得的条形不只是条形，请确保分类变量具有2个类别，这些类别会在连续变量的某个阈值处更改值。在下面的示例中，mpg通过计算z得分对来自mtcars数据集进行归一化。mpg高于零的车辆标记为绿色，低于mpg的车辆标记为红色。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())  

# Data Prep
# load data 加载数据
data(&quot;mtcars&quot;)  
mtcars$\`car name\` &lt;- rownames(mtcars)  # create new column for car names
mtcars$mpg_z &lt;- round((mtcars$mpg - mean(mtcars$mpg))/sd(mtcars$mpg), 2)  # compute normalized mpg
# # above / below avg flag
mtcars$mpg_type &lt;- ifelse(mtcars$mpg_z &lt; 0, &quot;below&quot;, &quot;above&quot;)  
mtcars &lt;- mtcars[order(mtcars$mpg_z), ]  # sort
mtcars$\`car name\` &lt;- factor(mtcars$\`car name\`, levels = mtcars$\`car name\`)  # convert to factor to retain sorted order in plot.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
# Diverging Barcharts
ggplot(mtcars, aes(x=\`car name\`, y=mpg_z, label=mpg_z)) + 
  #条形图
  geom_bar(stat=&#39;identity&#39;, aes(fill=mpg_type), width=.5)  +
  # 自定义颜色
  scale_fill_manual(name=&quot;Mileage&quot;, 
                    labels = c(&quot;Above Average&quot;, &quot;Below Average&quot;), 
                    values = c(&quot;above&quot;=&quot;#00ba38&quot;, &quot;below&quot;=&quot;#f8766d&quot;)) + 
  labs(subtitle=&quot;Normalised mileage from &#39;mtcars&#39;&quot;, 
       title= &quot;Diverging Bars&quot;) + 
  # 翻转坐标轴
  coord_flip()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8zMF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-发散棒棒糖图-diverging-lollipop-chart" tabindex="-1"><a class="header-anchor" href="#_2-2-发散棒棒糖图-diverging-lollipop-chart" aria-hidden="true">#</a> 2.2 发散棒棒糖图(Diverging Lollipop Chart)</h3><p>棒棒糖图表传达的信息与条形图和分散条形图相同。除了看起来更现代。我使用geom_point和geom_segment来代替棒棒糖，而不是geom_bar 。让我们使用在上一个分支示例中准备的相同数据绘制一个棒棒糖图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

ggplot(mtcars, aes(x=\`car name\`, y=mpg_z, label=mpg_z)) + 
  geom_point(stat=&#39;identity&#39;, fill=&quot;black&quot;, size=6)  +
  # 绘制点x,y到xend,yend的直线
  geom_segment(aes(y = 0, 
                   x = \`car name\`, 
                   yend = mpg_z, 
                   xend = \`car name\`), 
               color = &quot;black&quot;) +
  geom_text(color=&quot;white&quot;, size=2) +
  labs(title=&quot;Diverging Lollipop Chart&quot;, 
       subtitle=&quot;Normalized mileage from &#39;mtcars&#39;: Lollipop&quot;) + 
  ylim(-2.5, 2.5) +
  coord_flip()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8zMl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-发散点图-diverging-dot-plot" tabindex="-1"><a class="header-anchor" href="#_2-3-发散点图-diverging-dot-plot" aria-hidden="true">#</a> 2.3 发散点图(Diverging Dot Plot)</h3><p>点图传达了类似的信息。除了仅使用点外，原理与在发散条形图中看到的图案相同。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

# Plot
ggplot(mtcars, aes(x=\`car name\`, y=mpg_z, label=mpg_z)) + 
  geom_point(stat=&#39;identity&#39;, aes(col=mpg_type), size=6)  +
  scale_color_manual(name=&quot;Mileage&quot;, 
                     labels = c(&quot;Above Average&quot;, &quot;Below Average&quot;), 
                     values = c(&quot;above&quot;=&quot;#00ba38&quot;, &quot;below&quot;=&quot;#f8766d&quot;)) + 
  geom_text(color=&quot;white&quot;, size=2) +
  labs(title=&quot;Diverging Dot Plot&quot;, 
       subtitle=&quot;Normalized mileage from &#39;mtcars&#39;: Dotplot&quot;) + 
  ylim(-2.5, 2.5) +
  coord_flip()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8zNF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-4-面积图-area-chart" tabindex="-1"><a class="header-anchor" href="#_2-4-面积图-area-chart" aria-hidden="true">#</a> 2.4 面积图(Area Chart)</h3><p>面积图通常用于可视化特定指标（如股票回报率百分比）与特定基线的比较。其他类型的%returns或%change数据也常用。geom_area（）实现了这一点。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(quantmod)
data(&quot;economics&quot;, package = &quot;ggplot2&quot;)

# Compute % Returns
economics$returns_perc &lt;- c(0, diff(economics$psavert)/economics$psavert[-length(economics$psavert)])

# Create break points and labels for axis ticks
brks &lt;- economics$date[seq(1, length(economics$date), 12)]
lbls &lt;- lubridate::year(economics$date[seq(1, length(economics$date), 12)])

# Plot
ggplot(economics[1:100, ], aes(date, returns_perc)) + 
 # 画面积图
  geom_area() + 
  scale_x_date(breaks=brks, labels=lbls) + 
  theme(axis.text.x = element_text(angle=90)) + 
  labs(title=&quot;Area Chart&quot;, 
       subtitle = &quot;Perc Returns for Personal Savings&quot;, 
       y=&quot;% Returns for Personal savings&quot;, 
       caption=&quot;Source: economics&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8zNl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-排名-ranking" tabindex="-1"><a class="header-anchor" href="#_3-排名-ranking" aria-hidden="true">#</a> 3. 排名(Ranking)</h2><p>排名用于比较多个项目彼此之间的位置或性能。但实际值比排名重要。本节主要内容有：</p><ul><li>有序条形图(Ordered Bar Chart)</li><li>棒棒糖图(Lollipop Chart)</li><li>点图(Dot Plot)</li><li>坡度图(Slope Chart)</li><li>哑铃图(Dumbbell Plot)</li></ul><h3 id="_3-1-有序条形图" tabindex="-1"><a class="header-anchor" href="#_3-1-有序条形图" aria-hidden="true">#</a> 3.1 有序条形图</h3><p>有序条形图是由Y轴变量排序的条形图。仅仅按感兴趣的变量对数据帧进行排序不足以对条形图进行排序。为了使条形图保持行的顺序，必须将X轴变量（即类别）转换为因子。让我们从mpg数据集中绘制每个制造商的平均城市里程。首先，汇总数据并对其进行排序，然后再绘制绘图。最后，将X变量转换为因子。让我们看看如何完成</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Prepare data: group mean city mileage by manufacturer.
cty_mpg &lt;- aggregate(mpg$cty, by=list(mpg$manufacturer), FUN=mean)  # aggregate
colnames(cty_mpg) &lt;- c(&quot;make&quot;, &quot;mileage&quot;)  # change column names
cty_mpg &lt;- cty_mpg[order(cty_mpg$mileage), ]  # sort
cty_mpg$make &lt;- factor(cty_mpg$make, levels = cty_mpg$make)  # to retain the order in plot.
head(cty_mpg, 4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th></th><th scope="col">make</th><th scope="col">mileage</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">9</th><td>lincoln </td><td>11.33333</td></tr><tr><th scope="row">8</th><td>land rover</td><td>11.50000</td></tr><tr><th scope="row">3</th><td>dodge </td><td>13.13514</td></tr><tr><th scope="row">10</th><td>mercury </td><td>13.25000</td></tr></tbody></table><p>X变量现在是一个因子，让我们绘图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

# Draw plot
ggplot(cty_mpg, aes(x=make, y=mileage)) + 
  geom_bar(stat=&quot;identity&quot;, width=.5, fill=&quot;tomato3&quot;) + 
  labs(title=&quot;Ordered Bar Chart&quot;, 
       subtitle=&quot;Make Vs Avg. Mileage&quot;, 
       caption=&quot;source: mpg&quot;) + 
  theme(axis.text.x = element_text(angle=65, vjust=0.6))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF80MV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-棒棒糖图-lollipop-chart" tabindex="-1"><a class="header-anchor" href="#_3-2-棒棒糖图-lollipop-chart" aria-hidden="true">#</a> 3.2 棒棒糖图(Lollipop Chart)</h3><p>棒棒糖图表传达的信息与条形图相同。通过将粗条减少为细线，可以减少混乱，并更加重视该值。看起来不错，很现代。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

# Plot
ggplot(cty_mpg, aes(x=make, y=mileage)) + 
  geom_point(size=3) + 
  geom_segment(aes(x=make, 
                   xend=make, 
                   y=0, 
                   yend=mileage)) + 
  labs(title=&quot;Lollipop Chart&quot;, 
       subtitle=&quot;Make Vs Avg. Mileage&quot;, 
       caption=&quot;source: mpg&quot;) + 
  theme(axis.text.x = element_text(angle=65, vjust=0.6))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF80M18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-3-点图-dot-plot" tabindex="-1"><a class="header-anchor" href="#_3-3-点图-dot-plot" aria-hidden="true">#</a> 3.3 点图(Dot Plot)</h3><p>点图与棒棒糖非常相似，但是没有线条，而是翻转到水平位置。它更加强调了项目相对于实际值的等级排序以及实体之间的距离。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(scales)
theme_set(theme_classic())

# Plot
ggplot(cty_mpg, aes(x=make, y=mileage)) + 
  geom_point(col=&quot;tomato2&quot;, size=3) +   # Draw points
  geom_segment(aes(x=make, 
                   xend=make, 
                   y=min(mileage), 
                   yend=max(mileage)), 
               linetype=&quot;dashed&quot;, 
               size=0.1) +   # Draw dashed lines
  labs(title=&quot;Dot Plot&quot;, 
       subtitle=&quot;Make Vs Avg. Mileage&quot;, 
       caption=&quot;source: mpg&quot;) +  
  coord_flip()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;scales&#39; was built under R version 3.6.1&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF80NV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-4-坡度图-slope-chart" tabindex="-1"><a class="header-anchor" href="#_3-4-坡度图-slope-chart" aria-hidden="true">#</a> 3.4 坡度图(Slope Chart)</h3><p>坡度图是比较2个时间点之间的位置位置的绝佳方法。目前，没有内置函数可以构造此函数。以下代码可作为您如何实现此目标的指南。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(scales)
theme_set(theme_classic())

# prep data
df &lt;- read.csv(&quot;https://raw.githubusercontent.com/selva86/datasets/master/gdppercap.csv&quot;)
colnames(df) &lt;- c(&quot;continent&quot;, &quot;1952&quot;, &quot;1957&quot;)
left_label &lt;- paste(df$continent, round(df$\`1952\`),sep=&quot;, &quot;)
right_label &lt;- paste(df$continent, round(df$\`1957\`),sep=&quot;, &quot;)
df$class &lt;- ifelse((df$\`1957\` - df$\`1952\`) &lt; 0, &quot;red&quot;, &quot;green&quot;)

# Plot
p &lt;- ggplot(df) + geom_segment(aes(x=1, xend=2, y=\`1952\`, yend=\`1957\`, col=class), size=.75, show.legend=F) + 
                  geom_vline(xintercept=1, linetype=&quot;dashed&quot;, size=.1) + 
                  geom_vline(xintercept=2, linetype=&quot;dashed&quot;, size=.1) +
                  scale_color_manual(labels = c(&quot;Up&quot;, &quot;Down&quot;), 
                                     values = c(&quot;green&quot;=&quot;#00ba38&quot;, &quot;red&quot;=&quot;#f8766d&quot;)) +  # color of lines
                  labs(x=&quot;&quot;, y=&quot;Mean GdpPerCap&quot;) +  # Axis labels
                  xlim(.5, 2.5) + ylim(0,(1.1*(max(df$\`1952\`, df$\`1957\`))))  # X and Y axis limits

# Add texts
p &lt;- p + geom_text(label=left_label, y=df$\`1952\`, x=rep(1, NROW(df)), hjust=1.1, size=3.5)
p &lt;- p + geom_text(label=right_label, y=df$\`1957\`, x=rep(2, NROW(df)), hjust=-0.1, size=3.5)
p &lt;- p + geom_text(label=&quot;Time 1&quot;, x=1, y=1.1*(max(df$\`1952\`, df$\`1957\`)), hjust=1.2, size=5)  # title
p &lt;- p + geom_text(label=&quot;Time 2&quot;, x=2, y=1.1*(max(df$\`1952\`, df$\`1957\`)), hjust=-0.1, size=5)  # title

# Minify theme
p + theme(panel.background = element_blank(), 
           panel.grid = element_blank(),
           axis.ticks = element_blank(),
           axis.text.x = element_blank(),
           panel.border = element_blank(),
           plot.margin = unit(c(1,2,1,2), &quot;cm&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF80N18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-5-哑铃图-dumbbell-plot" tabindex="-1"><a class="header-anchor" href="#_3-5-哑铃图-dumbbell-plot" aria-hidden="true">#</a> 3.5 哑铃图(Dumbbell Plot)</h3><p>哑铃图表是一个很好的工具，如果你想：1。想象两个时间点之间的相对位置（如增长和下降）。2。比较两个类别之间的距离。 为了得到哑铃的正确顺序，Y变量应该是一个因子，因子变量的级别应该与它在图中出现的顺序相同。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># devtools::install_github(&quot;hrbrmstr/ggalt&quot;)
library(ggplot2)
library(ggalt)
theme_set(theme_classic())

health &lt;- read.csv(&quot;https://raw.githubusercontent.com/selva86/datasets/master/health.csv&quot;)
health$Area &lt;- factor(health$Area, levels=as.character(health$Area))  # for right ordering of the dumbells

# health$Area &lt;- factor(health$Area)
gg &lt;- ggplot(health, aes(x=pct_2013, xend=pct_2014, y=Area, group=Area)) +
        # 画哑铃图
        geom_dumbbell(color=&quot;#a3c4dc&quot;, 
                      size=0.75, 
                      point.colour.l=&quot;#0e668b&quot;) + 
        scale_x_continuous(label=percent) + 
        labs(x=NULL, 
             y=NULL, 
             title=&quot;Dumbbell Chart&quot;, 
             subtitle=&quot;Pct Change: 2013 vs 2014&quot;, 
             caption=&quot;Source: https://github.com/hrbrmstr/ggalt&quot;) +
        theme(plot.title = element_text(hjust=0.5, face=&quot;bold&quot;),
              plot.background=element_rect(fill=&quot;#f7f7f7&quot;),
              panel.background=element_rect(fill=&quot;#f7f7f7&quot;),
              panel.grid.minor=element_blank(),
              panel.grid.major.y=element_blank(),
              panel.grid.major.x=element_line(),
              axis.ticks=element_blank(),
              legend.position=&quot;top&quot;,
              panel.border=element_blank())
plot(gg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Ignoring unknown parameters: point.colour.l&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF80OV8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-分布-distribution" tabindex="-1"><a class="header-anchor" href="#_4-分布-distribution" aria-hidden="true">#</a> 4 分布(Distribution)</h2><p>当您有很多数据点并且想要研究数据点的位置和分布方式时,推荐使用分布类型的图。本节主要内容有：</p><ul><li>直方图(Histogram)</li><li>密度图(Density Plot)</li><li>箱形图(Box Plot)</li><li>点+箱形图(Dot + Box Plot)</li><li>簇状箱形图(Tufte Boxplot)</li><li>小提琴图(Violin Plot)</li><li>人口金字塔(Population Pyramid)</li></ul><h3 id="_4-1-直方图-histogram" tabindex="-1"><a class="header-anchor" href="#_4-1-直方图-histogram" aria-hidden="true">#</a> 4.1 直方图(Histogram)</h3><p>默认情况下，如果只提供一个变量，geom_bar（）会尝试计算计数。为了使它像条形图一样工作，必须设置stat=identity选项，并且必须提供x和y值。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Histogram on a Continuous (Numeric) Variable
g &lt;- ggplot(mpg, aes(displ)) + 
# 设置颜色
scale_fill_brewer(palette = &quot;Spectral&quot;)

g + geom_histogram(aes(fill=class), 
                   binwidth = .1, 
                   col=&quot;black&quot;, 
                   size=.1) +  # change binwidth
  labs(title=&quot;Histogram with Auto Binning&quot;, 
       subtitle=&quot;Engine Displacement across Vehicle Classes&quot;) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF81Ml8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>此外连续变量的直方图可以使用geom_bar（）或geom_Histogram（）来完成。使用geom_histogram（）时，可以使用bin选项控制条数。否则，可以使用binwidth设置每个bin所覆盖的范围。binwidth的值与构建直方图的连续变量的比例相同。由于geom_直方图提供了控制bin数量和bin宽度的功能，因此在连续变量上创建直方图是首选方法。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>g + geom_histogram(aes(fill=class), 
                   bins=5, 
                   col=&quot;black&quot;, 
                   size=.1) +   # change number of bins
  labs(title=&quot;Histogram with Fixed Bins&quot;, 
       subtitle=&quot;Engine Displacement across Vehicle Classes&quot;) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF81NF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>分类变量的直方图将产生一个频率图，显示每个类别的条形图。通过调整宽度，可以调整bar的厚度。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Histogram on a Categorical variable
g &lt;- ggplot(mpg, aes(manufacturer))
g + geom_bar(aes(fill=class), width = 0.5) + 
  theme(axis.text.x = element_text(angle=65, vjust=0.6)) + 
  labs(title=&quot;Histogram on Categorical Variable&quot;, 
       subtitle=&quot;Manufacturer across Vehicle Classes&quot;) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF81Nl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-3-密度图-density-plot" tabindex="-1"><a class="header-anchor" href="#_4-3-密度图-density-plot" aria-hidden="true">#</a> 4.3 密度图(Density plot)</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Plot
g &lt;- ggplot(mpg, aes(cty))
# 密度图
g + geom_density(aes(fill=factor(cyl)), alpha=0.8) + 
    labs(title=&quot;Density plot&quot;, 
         subtitle=&quot;City Mileage Grouped by Number of cylinders&quot;,
         caption=&quot;Source: mpg&quot;,
         x=&quot;City Mileage&quot;,
         fill=&quot;# Cylinders&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF81OF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-4-箱形图-box-plot" tabindex="-1"><a class="header-anchor" href="#_4-4-箱形图-box-plot" aria-hidden="true">#</a> 4.4 箱形图(Box Plot)</h3><p>箱形图是研究分布的绝佳工具。它还可以显示多个组内的分布，以及中位数，范围和离群值（如果有）。 框内的黑线代表中位数。盒子的顶部是75％位数，盒子的底部是25％位数。线的端点的距离为1.5 * IQR，其中IQR或四分位数间距是第25和第75个百分位数之间的距离。端点外的点标记为点，通常被视为极限点。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>head(mpg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A tibble: 6 × 11</caption><thead><tr><th scope="col">manufacturer</th><th scope="col">model</th><th scope="col">displ</th><th scope="col">year</th><th scope="col">cyl</th><th scope="col">trans</th><th scope="col">drv</th><th scope="col">cty</th><th scope="col">hwy</th><th scope="col">fl</th><th scope="col">class</th></tr><tr><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>audi</td><td>a4</td><td>1.8</td><td>1999</td><td>4</td><td>auto(l5) </td><td>f</td><td>18</td><td>29</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>1.8</td><td>1999</td><td>4</td><td>manual(m5)</td><td>f</td><td>21</td><td>29</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.0</td><td>2008</td><td>4</td><td>manual(m6)</td><td>f</td><td>20</td><td>31</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.0</td><td>2008</td><td>4</td><td>auto(av) </td><td>f</td><td>21</td><td>30</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.8</td><td>1999</td><td>6</td><td>auto(l5) </td><td>f</td><td>16</td><td>26</td><td>p</td><td>compact</td></tr><tr><td>audi</td><td>a4</td><td>2.8</td><td>1999</td><td>6</td><td>manual(m5)</td><td>f</td><td>18</td><td>26</td><td>p</td><td>compact</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Plot
g &lt;- ggplot(mpg, aes(class, cty))
g + geom_boxplot(varwidth=T, fill=&quot;plum&quot;) + 
    labs(title=&quot;Box plot&quot;, 
         subtitle=&quot;City Mileage grouped by Class of vehicle&quot;,
         caption=&quot;Source: mpg&quot;,
         x=&quot;Class of Vehicle&quot;,
         y=&quot;City Mileage&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF82MV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggthemes)
g &lt;- ggplot(mpg, aes(class, cty))
g + geom_boxplot(aes(fill=factor(cyl))) + 
  theme(axis.text.x = element_text(angle=65, vjust=0.6)) + 
  labs(title=&quot;Box plot&quot;, 
       subtitle=&quot;City Mileage grouped by Class of vehicle&quot;,
       caption=&quot;Source: mpg&quot;,
       x=&quot;Class of Vehicle&quot;,
       y=&quot;City Mileage&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggthemes&#39; was built under R version 3.6.3&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF82Ml8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-5-点-箱形图-dot-box-plot" tabindex="-1"><a class="header-anchor" href="#_4-5-点-箱形图-dot-box-plot" aria-hidden="true">#</a> 4.5 点+箱形图(Dot + Box Plot)</h3><p>除了箱形图提供的信息外，点图还可以按每个组的摘要统计信息的形式提供更清晰的信息。这些点交错排列，以使每个点代表一个观测值。因此，在下图中，给定制造商的点数将与源数据中该制造商的行数匹配。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

# plot
g &lt;- ggplot(mpg, aes(manufacturer, cty))
g + geom_boxplot() + 
  # binaxis bin x or y
  # stackdir 点在箱形图的位置
  geom_dotplot(binaxis=&#39;y&#39;, 
               stackdir=&#39;center&#39;, 
               dotsize = .5, 
               fill=&quot;red&quot;) +
  theme(axis.text.x = element_text(angle=65, vjust=0.6)) + 
  labs(title=&quot;Box plot + Dot plot&quot;, 
       subtitle=&quot;City Mileage vs Class: Each dot represents 1 row in source data&quot;,
       caption=&quot;Source: mpg&quot;,
       x=&quot;Class of Vehicle&quot;,
       y=&quot;City Mileage&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>\`stat_bindot()\` using \`bins = 30\`. Pick better value with \`binwidth\`.
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF82NF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-6-簇状箱形图-tufte-boxplot" tabindex="-1"><a class="header-anchor" href="#_4-6-簇状箱形图-tufte-boxplot" aria-hidden="true">#</a> 4.6 簇状箱形图(Tufte Boxplot)</h3><p>由ggthemes软件包提供的簇状箱形图灵感来自爱德华•簇绒的作品。Tufte的方块图只是一个极简的方块图，具有视觉吸引力。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggthemes)
library(ggplot2)
theme_set(theme_tufte())  # from ggthemes

# plot
g &lt;- ggplot(mpg, aes(manufacturer, cty))
g + geom_tufteboxplot() + 
      theme(axis.text.x = element_text(angle=65, vjust=0.6)) + 
      labs(title=&quot;Tufte Styled Boxplot&quot;, 
           subtitle=&quot;City Mileage grouped by Class of vehicle&quot;,
           caption=&quot;Source: mpg&quot;,
           x=&quot;Class of Vehicle&quot;,
           y=&quot;City Mileage&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF82Nl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-7-小提琴图-violin-plot" tabindex="-1"><a class="header-anchor" href="#_4-7-小提琴图-violin-plot" aria-hidden="true">#</a> 4.7 小提琴图(Violin Plot)</h3><p>小提琴图类似于箱形图，但显示了组内的密度。没有像箱形图那样提供太多信息。可以使用geom_violin()绘制。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_bw())

# plot
g &lt;- ggplot(mpg, aes(class, cty))
g + geom_violin() + 
  labs(title=&quot;Violin plot&quot;, 
       subtitle=&quot;City Mileage vs Class of vehicle&quot;,
       caption=&quot;Source: mpg&quot;,
       x=&quot;Class of Vehicle&quot;,
       y=&quot;City Mileage&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF82OV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-8-人口金字塔-population-pyramid" tabindex="-1"><a class="header-anchor" href="#_4-8-人口金字塔-population-pyramid" aria-hidden="true">#</a> 4.8 人口金字塔(Population Pyramid)</h3><p>人口金字塔提供了一种独特的方式来可视化有多少人口或人口百分比属于某一类别。下面的金字塔是一个很好的例子，说明在电子邮件营销活动漏斗的每个阶段都保留了多少用户。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(ggthemes)
# turns of scientific notations like 1e+40 不使用科学计数
options(scipen = 999)  

# Read data
email_campaign_funnel &lt;- read.csv(&quot;https://raw.githubusercontent.com/selva86/datasets/master/email_campaign_funnel.csv&quot;)

# X Axis Breaks and Labels 
brks &lt;- seq(-15000000, 15000000, 5000000)
lbls = paste0(as.character(c(seq(15, 0, -5), seq(5, 15, 5))), &quot;m&quot;)

# Plot
ggplot(email_campaign_funnel, aes(x = Stage, y = Users, fill = Gender)) +   # Fill column
                             # draw the bars 绘柱状图
                              geom_bar(stat = &quot;identity&quot;, width = .6) +   
                              scale_y_continuous(breaks = brks,   # Breaks
                                                 labels = lbls) + # Labels
                              coord_flip() +  # Flip axes
                              labs(title=&quot;Email Campaign Funnel&quot;) +
                              theme_tufte() +  # Tufte theme from ggfortify
                              theme(plot.title = element_text(hjust = .5), 
                                    axis.ticks = element_blank()) +   # Centre plot title
                              scale_fill_brewer(palette = &quot;Dark2&quot;)  # Color palette
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF83MV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_5-组成-composition" tabindex="-1"><a class="header-anchor" href="#_5-组成-composition" aria-hidden="true">#</a> 5 组成(Composition)</h2><p>本节主要内容有：</p><ul><li>华夫饼图(Waffle Chart)</li><li>饼图(Pie Chart)</li><li>矩形树图(Treemap)</li><li>条形图(Bar Chart)</li></ul><h3 id="_5-1-华夫饼图-waffle-chart" tabindex="-1"><a class="header-anchor" href="#_5-1-华夫饼图-waffle-chart" aria-hidden="true">#</a> 5.1 华夫饼图(Waffle Chart)</h3><p>华夫饼图又名方格百分比图。华夫饼图是显示总人口分类组成的一种很好的方法。虽然没有直接的函数，但是可以通过使用geom_tile（）函数巧妙地操纵ggplot2来表达。下面的模板应该可以帮助您创建自己的华夫饼。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>var &lt;- mpg$class  # the categorical data 

## Prep data (nothing to change here)
nrows &lt;- 10
df &lt;- expand.grid(y = 1:nrows, x = 1:nrows)
categ_table &lt;- round(table(var) * ((nrows*nrows)/(length(var))))
categ_table
#&gt;   2seater    compact    midsize    minivan     pickup subcompact        suv 
#&gt;         2         20         18          5         14         15         26 

# 打印数据
df$category &lt;- factor(rep(names(categ_table), categ_table))  
# NOTE: if sum(categ_table) is not 100 (i.e. nrows^2), it will need adjustment to make the sum to 100.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>var
   2seater    compact    midsize    minivan     pickup subcompact        suv 
         2         20         18          5         14         15         26 
</code></pre><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
## Plot
ggplot(df, aes(x = x, y = y, fill = category)) + 
        # 画热图
        geom_tile(color = &quot;black&quot;, size = 0.5) +
        scale_x_continuous(expand = c(0, 0)) +
        scale_y_continuous(expand = c(0, 0), trans = &#39;reverse&#39;) +
        scale_fill_brewer(palette = &quot;Set3&quot;) +
        labs(title=&quot;Waffle Chart&quot;, subtitle=&quot;&#39;Class&#39; of vehicles&quot;,
             caption=&quot;Source: mpg&quot;) + 
        theme(panel.border = element_rect(size = 2),
              plot.title = element_text(size = rel(1.2)),
              axis.text = element_blank(),
              axis.title = element_blank(),
              axis.ticks = element_blank(),
              legend.title = element_blank(),
              legend.position = &quot;right&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF83NV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_5-2-饼图-pie-chart" tabindex="-1"><a class="header-anchor" href="#_5-2-饼图-pie-chart" aria-hidden="true">#</a> 5.2 饼图(Pie Chart)</h3><p>饼图，一种典型的显示构图的方法，就所传达的信息而言，相当于华夫饼图。但是在ggplot2中使用coord_polar（）实现起来有点棘手。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Source: Frequency table
df &lt;- as.data.frame(table(mpg$class))
colnames(df) &lt;- c(&quot;class&quot;, &quot;freq&quot;)
pie &lt;- ggplot(df, aes(x = &quot;&quot;, y=freq, fill = factor(class))) + 
  geom_bar(width = 1, stat = &quot;identity&quot;) +
  theme(axis.line = element_blank(), 
        plot.title = element_text(hjust=0.5)) + 
  labs(fill=&quot;class&quot;, 
       x=NULL, 
       y=NULL, 
       title=&quot;Pie Chart of class&quot;, 
       caption=&quot;Source: mpg&quot;)

pie + coord_polar(theta = &quot;y&quot;, start=0)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF83N18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
# Source: Categorical variable.
# mpg$class
pie &lt;- ggplot(mpg, aes(x = &quot;&quot;, fill = factor(class))) + 
  geom_bar(width = 1) +
  theme(axis.line = element_blank(), 
        plot.title = element_text(hjust=0.5)) + 
  labs(fill=&quot;class&quot;, 
       x=NULL, 
       y=NULL, 
       title=&quot;Pie Chart of class&quot;, 
       caption=&quot;Source: mpg&quot;)
  
pie + coord_polar(theta = &quot;y&quot;, start=0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF83OF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_5-3-矩形树图-treemap" tabindex="-1"><a class="header-anchor" href="#_5-3-矩形树图-treemap" aria-hidden="true">#</a> 5.3 矩形树图(Treemap)</h3><p>Treemap是一种使用嵌套矩形显示分层数据的好方法。treemapify包提供了必要的功能，可以将数据转换为所需的格式（treemapify）并绘制实际的绘图（ggplotify）。 为了创建树形图，必须使用将数据转换为所需的格式treemapify()。重要的要求是，您的数据必须具有一个变量，每个变量描述area图块的，fill颜色变量，具有图块的变量label以及最后一个父级group。主要用treemap包实现，具体见：</p><blockquote><p>https://github.com/wilkox/treemapify</p></blockquote><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(treemapify)
head(G20)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;treemapify&#39; was built under R version 3.6.3&quot;
</code></pre><table><caption>A data.frame: 6 × 6</caption><thead><tr><th scope="col">region</th><th scope="col">country</th><th scope="col">gdp_mil_usd</th><th scope="col">hdi</th><th scope="col">econ_classification</th><th scope="col">hemisphere</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>Africa </td><td>South Africa </td><td> 384315</td><td>0.629</td><td>Developing</td><td>Southern</td></tr><tr><td>North America</td><td>United States</td><td>15684750</td><td>0.937</td><td>Advanced </td><td>Northern</td></tr><tr><td>North America</td><td>Canada </td><td> 1819081</td><td>0.911</td><td>Advanced </td><td>Northern</td></tr><tr><td>North America</td><td>Mexico </td><td> 1177116</td><td>0.775</td><td>Developing</td><td>Northern</td></tr><tr><td>South America</td><td>Brazil </td><td> 2395968</td><td>0.730</td><td>Developing</td><td>Southern</td></tr><tr><td>South America</td><td>Argentina </td><td> 474954</td><td>0.811</td><td>Developing</td><td>Southern</td></tr></tbody></table><h4 id="_5-3-1简单的矩形树形图" tabindex="-1"><a class="header-anchor" href="#_5-3-1简单的矩形树形图" aria-hidden="true">#</a> 5.3.1简单的矩形树形图</h4><p>在树形图中，每个图块代表一个观察值，图块的面积与变量成比例。让我们首先绘制一个树状图，每个图块代表一个G-20国家。瓷砖的面积将映射到该国的GDP，瓷砖的填充色将映射到其HDI（人类发展指数）。geom_treemap是用于此目的的基本几何图形。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(G20, aes(area = gdp_mil_usd, fill = hdi)) +
  geom_treemap()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF84Ml8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果不知道每个图块所代表的国家/地区，该图就不是很有用。geom_treemap_text可用于向每个图块添加文本标签。它使用 ggfittext包来调整文本大小，使其适合图块。除了您将在geom_text，fontface或中使用的标准文本格式美观colour之外，我们还可以传递特定于ggfittext的其他选项。例如，我们可以使用将文本放置在图块的中央place = &quot;centre&quot;，然后使用grow = TRUE展开文本以填充尽可能多的图块。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(G20, aes(area = gdp_mil_usd, fill = hdi, label = country)) +
  geom_treemap() +
  geom_treemap_text(fontface = &quot;italic&quot;, colour = &quot;white&quot;, place = &quot;centre&quot;,
                    grow = TRUE)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF84NF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_5-3-2-分组平铺" tabindex="-1"><a class="header-anchor" href="#_5-3-2-分组平铺" aria-hidden="true">#</a> 5.3.2 分组平铺</h4><p>geom_treemap通过传递子组美学支持在treemap中对瓷砖进行子组化。让我们按地区对国家分组，用geom treemap_subgroup_border在每个子组周围画一个边界，并用geom treemap_subgroup_文本标记每个子组。geom_treemap_subgroup_text对于文本放置和大小调整采用与geom_treemap_text相同的参数。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(G20, aes(area = gdp_mil_usd, fill = hdi, label = country,
                subgroup = region)) +
  geom_treemap() +
  geom_treemap_subgroup_border() +
  geom_treemap_subgroup_text(place = &quot;centre&quot;, grow = T, alpha = 0.5, colour =
                             &quot;black&quot;, fontface = &quot;italic&quot;, min.size = 0) +
  geom_treemap_text(colour = &quot;white&quot;, place = &quot;topleft&quot;, reflow = T)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF84Nl8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>注意阿根廷没有标签。geom_treemap_文本将隐藏不适合平铺的文本标签，除非缩小到最小大小以下（默认为4个点）。这可以使用min.size参数进行调整。 subgroup2和subgroup3美学支持多达三个嵌套级别的子组。这些子组的边框和文本标签可以使用geom treemap_subgroup2_border等绘制。请注意，ggplot2按照添加的顺序绘制打印层。这意味着可能会意外地将子组边界的一层与另一层隐藏起来。通常，最好按从深到浅的顺序添加边界层，即geom_treemap_subgroup3_border然后geom_treemap_subgroup2_border然后geom_treemap_subgroup2_border。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(G20, aes(area = 1, label = country, subgroup = hemisphere,
                subgroup2 = region, subgroup3 = econ_classification)) +
  geom_treemap() +
  geom_treemap_subgroup3_border(colour = &quot;blue&quot;, size = 1) +
  geom_treemap_subgroup2_border(colour = &quot;white&quot;, size = 3) +
  geom_treemap_subgroup_border(colour = &quot;red&quot;, size = 5) +
  geom_treemap_subgroup_text(place = &quot;middle&quot;, colour = &quot;red&quot;, alpha = 0.5, grow = T) +
  geom_treemap_subgroup2_text(colour = &quot;white&quot;, alpha = 0.5, fontface = &quot;italic&quot;) +
  geom_treemap_subgroup3_text(place = &quot;top&quot;, colour = &quot;blue&quot;, alpha = 0.5) +
  geom_treemap_text(colour = &quot;white&quot;, place = &quot;middle&quot;, reflow = T)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF84OF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如上图所示，并不能保证最终的情节会好看。 与任何ggplot2绘图一样，treemapify绘图可以分面、缩放、主题化等。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggplot(G20, aes(area = gdp_mil_usd, fill = region, label = country, subgroup = region)) +
  geom_treemap() +
  geom_treemap_text(grow = T, reflow = T, colour = &quot;black&quot;) +
  facet_wrap( ~ hemisphere) +
  scale_fill_brewer(palette = &quot;Set1&quot;) +
  theme(legend.position = &quot;bottom&quot;) +
  labs(
    title = &quot;The G-20 major economies by hemisphere&quot;,
    caption = &quot;The area of each tile represents the country&#39;s GDP as a
      proportion of all countries in that hemisphere&quot;,
    fill = &quot;Region&quot;
  )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF85MF8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_5-4-条形图-bar-chart" tabindex="-1"><a class="header-anchor" href="#_5-4-条形图-bar-chart" aria-hidden="true">#</a> 5.4 条形图(Bar Chart)</h3><p>默认情况下，geom_bar()将stat设置为count。这意味着，当您仅提供连续的X变量（而不提供Y变量）时，它将尝试从数据中生成直方图。为了使条形图创建条形而不是直方图，您需要做两件事。</p><ol><li>设置stat=identity</li><li>同时提供x和y</li></ol><p>条形图可以从分类列变量或单独的频率表中绘制。通过调整width，您可以调整bar的厚度。如果您的数据源是频率表，也就是说，如果您不希望ggplot计算计数，则需要stat=identity在内设置geom_bar()。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>freqtable &lt;- table(mpg$manufacturer)
df &lt;- as.data.frame.table(freqtable)
head(df)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 2</caption><thead><tr><th scope="col">Var1</th><th scope="col">Freq</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>audi </td><td>18</td></tr><tr><td>chevrolet</td><td>19</td></tr><tr><td>dodge </td><td>37</td></tr><tr><td>ford </td><td>25</td></tr><tr><td>honda </td><td> 9</td></tr><tr><td>hyundai </td><td>14</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># plot
library(ggplot2)
theme_set(theme_classic())

# Plot
g &lt;- ggplot(df, aes(Var1, Freq))
g + geom_bar(stat=&quot;identity&quot;, width = 0.5, fill=&quot;tomato2&quot;) + 
      labs(title=&quot;Bar Chart&quot;, 
           subtitle=&quot;Manufacturer of vehicles&quot;, 
           caption=&quot;Source: Frequency of Manufacturers from &#39;mpg&#39; dataset&quot;) +
      theme(axis.text.x = element_text(angle=65, vjust=0.6))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF85M18wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>它也可以直接从列变量计算。在这种情况下，只提供X，而没有设置stat=identity。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># From on a categorical column variable
g &lt;- ggplot(mpg, aes(manufacturer))
g + geom_bar(aes(fill=class), width = 0.5) + 
  theme(axis.text.x = element_text(angle=65, vjust=0.6)) +
  labs(title=&quot;Categorywise Bar Chart&quot;, 
       subtitle=&quot;Manufacturer of vehicles&quot;, 
       caption=&quot;Source: Manufacturers from &#39;mpg&#39; dataset&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF85NV8wLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_6-变化-change" tabindex="-1"><a class="header-anchor" href="#_6-变化-change" aria-hidden="true">#</a> 6 变化(Change)</h2><p>本节主要内容有：</p><ul><li>时间序列图(Time Series Plot)</li><li>堆积面积图(Stacked Area Chart)</li><li>日历热图(Calendar Heatmap)</li><li>季节性地块(Seasonal Plot)</li></ul><h3 id="_6-1-时间序列图-time-series-plot" tabindex="-1"><a class="header-anchor" href="#_6-1-时间序列图-time-series-plot" aria-hidden="true">#</a> 6.1 时间序列图(Time Series Plot)</h3><p>ggfortify程序包允许自动绘图直接从时间序列对象（ts）自动绘图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## From Timeseries object (ts)
library(ggplot2)
library(ggfortify)
theme_set(theme_classic())

economics$returns_perc &lt;- c(0, diff(economics$psavert)/economics$psavert[-length(economics$psavert)])

# Plot 
autoplot(AirPassengers) + 
  labs(title=&quot;AirPassengers&quot;) + 
  theme(plot.title = element_text(hjust=0.5))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggfortify&#39; was built under R version 3.6.1&quot;
Registered S3 method overwritten by &#39;ggfortify&#39;:
  method        from 
  fortify.table ggalt
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF85OF8xLnBuZw?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_6-1-1-数据帧中的时间序列图" tabindex="-1"><a class="header-anchor" href="#_6-1-1-数据帧中的时间序列图" aria-hidden="true">#</a> 6.1.1 数据帧中的时间序列图</h4><p>使用geom_line()，也可以从中绘制时间序列（或折线图）data.frame。X轴断点默认情况下生成。在下面的示例中，中断每10年形成一次。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
theme_set(theme_classic())

# Allow Default X Axis Labels
ggplot(economics, aes(x=date)) + 
  geom_line(aes(y=returns_perc)) + 
  labs(title=&quot;Time Series Chart&quot;, 
       subtitle=&quot;Returns Percentage from &#39;Economics&#39; Dataset&quot;, 
       caption=&quot;Source: Economics&quot;, 
       y=&quot;Returns %&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMDBfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_6-1-2-时间序列图对于月度时间序列" tabindex="-1"><a class="header-anchor" href="#_6-1-2-时间序列图对于月度时间序列" aria-hidden="true">#</a> 6.1.2 时间序列图对于月度时间序列</h4><p>如果要在X轴上设置自己的时间间隔（间隔），则需要使用scale_x_date()来设置间隔和标签。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(lubridate)
theme_set(theme_bw())

economics_m &lt;- economics[1:24, ]

# labels and breaks for X axis text
lbls &lt;- paste0(month.abb[month(economics_m$date)], &quot; &quot;, lubridate::year(economics_m$date))
brks &lt;- economics_m$date

# plot
ggplot(economics_m, aes(x=date)) + 
  geom_line(aes(y=returns_perc)) + 
  labs(title=&quot;Monthly Time Series&quot;, 
       subtitle=&quot;Returns Percentage from Economics Dataset&quot;, 
       caption=&quot;Source: Economics&quot;, 
       y=&quot;Returns %&quot;) +  # title and caption
  scale_x_date(labels = lbls, 
               breaks = brks) +  # change to monthly ticks and labels
  theme(axis.text.x = element_text(angle = 90, vjust=0.5),  # rotate x axis text
        panel.grid.minor = element_blank())  # turn off minor grid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;lubridate&#39; was built under R version 3.6.3&quot;

Attaching package: &#39;lubridate&#39;


The following object is masked from &#39;package:base&#39;:

    date
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMDJfMS5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_6-1-3-时间序列图对于年度时间序列" tabindex="-1"><a class="header-anchor" href="#_6-1-3-时间序列图对于年度时间序列" aria-hidden="true">#</a> 6.1.3 时间序列图对于年度时间序列</h4><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(lubridate)
theme_set(theme_bw())

economics_y &lt;- economics[1:90, ]

# labels and breaks for X axis text
brks &lt;- economics_y$date[seq(1, length(economics_y$date), 12)]
lbls &lt;- lubridate::year(brks)

# plot
ggplot(economics_y, aes(x=date)) + 
  geom_line(aes(y=returns_perc)) + 
  labs(title=&quot;Yearly Time Series&quot;, 
       subtitle=&quot;Returns Percentage from Economics Dataset&quot;, 
       caption=&quot;Source: Economics&quot;, 
       y=&quot;Returns %&quot;) +  # title and caption
  scale_x_date(labels = lbls, 
               breaks = brks) +  # change to monthly ticks and labels
  theme(axis.text.x = element_text(angle = 90, vjust=0.5),  # rotate x axis text
        panel.grid.minor = element_blank())  # turn off minor grid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMDRfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_6-1-4-长数据格式的时间序列图-同一数据帧列中的多个时间序列" tabindex="-1"><a class="header-anchor" href="#_6-1-4-长数据格式的时间序列图-同一数据帧列中的多个时间序列" aria-hidden="true">#</a> 6.1.4 长数据格式的时间序列图：同一数据帧列中的多个时间序列</h4><p>在本例中，我从长数据格式构造ggplot。这就是说，所有列的列名和各自的值仅堆叠在两个变量中（变量和值分别）。如果您要将此数据转换为宽格式，它看起来就像经济学数据集。 在下面的示例中，为值列绘制geom_线，并将aes（col）设置为variable。这样，只需调用一次geom_line，就可以绘制多条彩色线，每个彩色线对应变量列中的每个唯一值。scale_x_date（）更改x轴打断和标签，scale_color_手动更改线的颜色。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>data(economics_long, package = &quot;ggplot2&quot;)
head(economics_long)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A tibble: 6 × 4</caption><thead><tr><th scope="col">date</th><th scope="col">variable</th><th scope="col">value</th><th scope="col">value01</th></tr><tr><th scope="col">&lt;date&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>1967-07-01</td><td>pce</td><td>506.7</td><td>0.0000000000</td></tr><tr><td>1967-08-01</td><td>pce</td><td>509.8</td><td>0.0002652497</td></tr><tr><td>1967-09-01</td><td>pce</td><td>515.6</td><td>0.0007615234</td></tr><tr><td>1967-10-01</td><td>pce</td><td>512.2</td><td>0.0004706043</td></tr><tr><td>1967-11-01</td><td>pce</td><td>517.4</td><td>0.0009155394</td></tr><tr><td>1967-12-01</td><td>pce</td><td>525.1</td><td>0.0015743854</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(lubridate)
theme_set(theme_bw())

df &lt;- economics_long[economics_long$variable %in% c(&quot;psavert&quot;, &quot;uempmed&quot;), ]
df &lt;- df[lubridate::year(df$date) %in% c(1967:1981), ]

# labels and breaks for X axis text
brks &lt;- df$date[seq(1, length(df$date), 12)]
lbls &lt;- lubridate::year(brks)

# plot
ggplot(df, aes(x=date)) + 
  geom_line(aes(y=value, col=variable)) + 
  labs(title=&quot;Time Series of Returns Percentage&quot;, 
       subtitle=&quot;Drawn from Long Data format&quot;, 
       caption=&quot;Source: Economics&quot;, 
       y=&quot;Returns %&quot;, 
       color=NULL) +  # title and caption
  scale_x_date(labels = lbls, breaks = brks) +  # change to monthly ticks and labels
  scale_color_manual(labels = c(&quot;psavert&quot;, &quot;uempmed&quot;), 
                     values = c(&quot;psavert&quot;=&quot;#00ba38&quot;, &quot;uempmed&quot;=&quot;#f8766d&quot;)) +  # line color
  theme(axis.text.x = element_text(angle = 90, vjust=0.5, size = 8),  # rotate x axis text
        panel.grid.minor = element_blank())  # turn off minor grid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMDdfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_6-1-5-宽数据格式的时间序列图-数据框中多列的数据" tabindex="-1"><a class="header-anchor" href="#_6-1-5-宽数据格式的时间序列图-数据框中多列的数据" aria-hidden="true">#</a> 6.1.5 宽数据格式的时间序列图：数据框中多列的数据</h4><p>如果要从宽数据格式创建时间序列（甚至其他类型的绘图），则必须通过为每一行调用geom_line（）来手动绘制每一行。因此，默认情况下不会绘制图例。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(lubridate)
theme_set(theme_bw())

df &lt;- economics[, c(&quot;date&quot;, &quot;psavert&quot;, &quot;uempmed&quot;)]
df &lt;- df[lubridate::year(df$date) %in% c(1967:1981), ]

# labels and breaks for X axis text
brks &lt;- df$date[seq(1, length(df$date), 12)]
lbls &lt;- lubridate::year(brks)

# plot
ggplot(df, aes(x=date)) + 
  geom_line(aes(y=psavert, col=&quot;psavert&quot;)) + 
  geom_line(aes(y=uempmed, col=&quot;uempmed&quot;)) + 
  labs(title=&quot;Time Series of Returns Percentage&quot;, 
       subtitle=&quot;Drawn From Wide Data format&quot;, 
       caption=&quot;Source: Economics&quot;, y=&quot;Returns %&quot;) +  # title and caption
  scale_x_date(labels = lbls, breaks = brks) +  # change to monthly ticks and labels
  scale_color_manual(name=&quot;&quot;, 
                     values = c(&quot;psavert&quot;=&quot;#00ba38&quot;, &quot;uempmed&quot;=&quot;#f8766d&quot;)) +  # line color
  theme(panel.grid.minor = element_blank())  # turn off minor grid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMDlfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-2-堆积面积图-stacked-area-chart" tabindex="-1"><a class="header-anchor" href="#_6-2-堆积面积图-stacked-area-chart" aria-hidden="true">#</a> 6.2 堆积面积图(Stacked Area Chart)</h3><p>堆积面积图就像折线图一样，只不过图下的区域全部是彩色的。通常在以下情况下使用：</p><ul><li>您想描述数量或体积（而不是价格）随时间变化的方式</li><li>您有许多数据点。对于很少的数据点，请考虑绘制条形图。</li><li>您想要显示各个组件的贡献。</li></ul><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(lubridate)
theme_set(theme_bw())

df &lt;- economics[, c(&quot;date&quot;, &quot;psavert&quot;, &quot;uempmed&quot;)]
df &lt;- df[lubridate::year(df$date) %in% c(1967:1981), ]

# labels and breaks for X axis text
brks &lt;- df$date[seq(1, length(df$date), 12)]
lbls &lt;- lubridate::year(brks)

# plot
ggplot(df, aes(x=date)) + 
  geom_area(aes(y=psavert+uempmed, fill=&quot;psavert&quot;)) + 
  geom_area(aes(y=uempmed, fill=&quot;uempmed&quot;)) + 
  labs(title=&quot;Area Chart of Returns Percentage&quot;, 
       subtitle=&quot;From Wide Data format&quot;, 
       caption=&quot;Source: Economics&quot;, 
       y=&quot;Returns %&quot;) +  # title and caption
  scale_x_date(labels = lbls, breaks = brks) +  # change to monthly ticks and labels
  scale_fill_manual(name=&quot;&quot;, 
                    values = c(&quot;psavert&quot;=&quot;#00ba38&quot;, &quot;uempmed&quot;=&quot;#f8766d&quot;)) +  # line color
  theme(panel.grid.minor = element_blank())  # turn off minor grid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMTFfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-3-日历热图-calendar-heatmap" tabindex="-1"><a class="header-anchor" href="#_6-3-日历热图-calendar-heatmap" aria-hidden="true">#</a> 6.3 日历热图(Calendar Heatmap)</h3><p>当您想在实际日历本身上查看诸如股价之类的度量标准的变化时，尤其是高点和低点时，日历热图是一个很好的工具。它在视觉上强调随时间变化，而不是实际值本身。可以使用来实现geom_tile。但是，以正确的格式获取数据更多地与数据准备有关，而不是与绘图本身有关。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># http://margintale.blogspot.in/2012/04/ggplot2-time-series-heatmaps.html
library(ggplot2)
library(plyr)
library(scales)
library(zoo)

df &lt;- read.csv(&quot;https://raw.githubusercontent.com/selva86/datasets/master/yahoo.csv&quot;)
df$date &lt;- as.Date(df$date)  # format date
df &lt;- df[df$year &gt;= 2012, ]  # filter reqd years

# Create Month Week
df$yearmonth &lt;- as.yearmon(df$date)
df$yearmonthf &lt;- factor(df$yearmonth)
df &lt;- ddply(df,.(yearmonthf), transform, monthweek=1+week-min(week))  # compute week number of month
df &lt;- df[, c(&quot;year&quot;, &quot;yearmonthf&quot;, &quot;monthf&quot;, &quot;week&quot;, &quot;monthweek&quot;, &quot;weekdayf&quot;, &quot;VIX.Close&quot;)]
head(df)
#&gt;   year yearmonthf monthf week monthweek weekdayf VIX.Close
#&gt; 1 2012   Jan 2012    Jan    1         1      Tue     22.97
#&gt; 2 2012   Jan 2012    Jan    1         1      Wed     22.22
#&gt; 3 2012   Jan 2012    Jan    1         1      Thu     21.48
#&gt; 4 2012   Jan 2012    Jan    1         1      Fri     20.63
#&gt; 5 2012   Jan 2012    Jan    2         2      Mon     21.07
#&gt; 6 2012   Jan 2012    Jan    2         2      Tue     20.69


# Plot
ggplot(df, aes(monthweek, weekdayf, fill = VIX.Close)) + 
  geom_tile(colour = &quot;white&quot;) + 
  facet_grid(year~monthf) + 
  scale_fill_gradient(low=&quot;red&quot;, high=&quot;green&quot;) +
  labs(x=&quot;Week of Month&quot;,
       y=&quot;&quot;,
       title = &quot;Time-Series Calendar Heatmap&quot;, 
       subtitle=&quot;Yahoo Closing Price&quot;, 
       fill=&quot;Close&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 7</caption><thead><tr><th scope="col">year</th><th scope="col">yearmonthf</th><th scope="col">monthf</th><th scope="col">week</th><th scope="col">monthweek</th><th scope="col">weekdayf</th><th scope="col">VIX.Close</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>1</td><td>1</td><td>Tue</td><td>22.97</td></tr><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>1</td><td>1</td><td>Wed</td><td>22.22</td></tr><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>1</td><td>1</td><td>Thu</td><td>21.48</td></tr><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>1</td><td>1</td><td>Fri</td><td>20.63</td></tr><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>2</td><td>2</td><td>Mon</td><td>21.07</td></tr><tr><td>2012</td><td>1月 2012</td><td>Jan</td><td>2</td><td>2</td><td>Tue</td><td>20.69</td></tr></tbody></table><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMTNfMS5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-4-季节性地块-seasonal-plot" tabindex="-1"><a class="header-anchor" href="#_6-4-季节性地块-seasonal-plot" aria-hidden="true">#</a> 6.4 季节性地块(Seasonal Plot)</h3><p>如果使用的是类ts或xts的时间序列对象，则可以通过使用forecast：：ggseasyplot绘制的季节图查看季节性波动。下面是使用AirPassengers和nottem时间序列的示例。你可以看到航空乘客的交通量逐年增加，同时交通量的季节性规律也在不断重复。诺丁汉的整体气温多年来没有上升，但绝对遵循季节性规律。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(ggplot2)
library(forecast)
theme_set(theme_classic())

# Subset data
nottem_small &lt;- window(nottem, start=c(1920, 1), end=c(1925, 12))  # subset a smaller timewindow

# Plot
ggseasonplot(AirPassengers) + labs(title=&quot;Seasonal plot: International Airline Passengers&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;forecast&#39; was built under R version 3.6.3&quot;
Registered S3 methods overwritten by &#39;forecast&#39;:
  method                 from     
  autoplot.Arima         ggfortify
  autoplot.acf           ggfortify
  autoplot.ar            ggfortify
  autoplot.bats          ggfortify
  autoplot.decomposed.ts ggfortify
  autoplot.ets           ggfortify
  autoplot.forecast      ggfortify
  autoplot.stl           ggfortify
  autoplot.ts            ggfortify
  fitted.ar              ggfortify
  fortify.ts             ggfortify
  residuals.ar           ggfortify
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMTVfMS5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>ggseasonplot(nottem_small) + labs(title=&quot;Seasonal plot: Air temperatures at Nottingham Castle&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMTZfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_7-群组-groups" tabindex="-1"><a class="header-anchor" href="#_7-群组-groups" aria-hidden="true">#</a> 7 群组(Groups)</h2><p>本节主要内容有：</p><ul><li>分层树状图(Dendrogram)</li><li>聚类(Clusters)</li></ul><h3 id="_7-1-分层树状图-dendrogram" tabindex="-1"><a class="header-anchor" href="#_7-1-分层树状图-dendrogram" aria-hidden="true">#</a> 7.1 分层树状图(Dendrogram)</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># install.packages(&quot;ggdendro&quot;)
library(ggplot2)
library(ggdendro)
theme_set(theme_bw())

hc &lt;- hclust(dist(USArrests), &quot;ave&quot;)  # hierarchical clustering

# plot
ggdendrogram(hc, rotate = TRUE, size = 2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;ggdendro&#39; was built under R version 3.6.3&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMTlfMS5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_7-2-聚类-clusters" tabindex="-1"><a class="header-anchor" href="#_7-2-聚类-clusters" aria-hidden="true">#</a> 7.2 聚类(Clusters)</h3><p>可以使用geom_encircle（）显示不同的簇或组。如果数据集具有多个弱特征，则可以计算主成分，并使用PC1和PC2作为X和Y轴绘制散点图。 geom_encircle（）可用于包围所需的组。唯一需要注意的是geom_circle（）的数据参数。您需要提供一个仅包含属于该组的观察（行）的子集数据帧作为数据参数。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># devtools::install_github(&quot;hrbrmstr/ggalt&quot;)
library(ggplot2)
library(ggalt)
library(ggfortify)
theme_set(theme_classic())

# Compute data with principal components ------------------
df &lt;- iris[c(1, 2, 3, 4)]
pca_mod &lt;- prcomp(df)  # compute principal components

# Data frame of principal components ----------------------
df_pc &lt;- data.frame(pca_mod$x, Species=iris$Species)  # dataframe of principal components
df_pc_vir &lt;- df_pc[df_pc$Species == &quot;virginica&quot;, ]  # df for &#39;virginica&#39;
df_pc_set &lt;- df_pc[df_pc$Species == &quot;setosa&quot;, ]  # df for &#39;setosa&#39;
df_pc_ver &lt;- df_pc[df_pc$Species == &quot;versicolor&quot;, ]  # df for &#39;versicolor&#39;
 
# Plot ----------------------------------------------------
ggplot(df_pc, aes(PC1, PC2, col=Species)) + 
  geom_point(aes(shape=Species), size=2) +   # draw points
  labs(title=&quot;Iris Clustering&quot;, 
       subtitle=&quot;With principal components PC1 and PC2 as X and Y axis&quot;,
       caption=&quot;Source: Iris&quot;) + 
  coord_cartesian(xlim = 1.2 * c(min(df_pc$PC1), max(df_pc$PC1)), 
                  ylim = 1.2 * c(min(df_pc$PC2), max(df_pc$PC2))) +   # change axis limits
  geom_encircle(data = df_pc_vir, aes(x=PC1, y=PC2)) +   # draw circles
  geom_encircle(data = df_pc_set, aes(x=PC1, y=PC2)) + 
  geom_encircle(data = df_pc_ver, aes(x=PC1, y=PC2))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL2dncGxvdCVFNSU4NSVBNSVFOSU5NyVBOCVFNyVBQyU5NCVFOCVBRSVCMC80L291dHB1dF8xMjFfMC5wbmc?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure>`,265);function g(b,p){const t=d("ExternalLinkIcon");return n(),l("div",null,[o,e("p",null,[e("a",u,[v,a(t)])]),m])}const f=i(c,[["render",g],["__file","2020-03-21-_R语言_ ggplot2入门笔记4—前50个ggplot2可视化效果.html.vue"]]);export{f as default};
