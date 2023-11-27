import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as i,c as a,a as t,b as n,d as s,e as o}from"./app-MsA2k2kn.js";const c={},r=o(`<h1 id="数据分析与可视化-数据绘图要点11-雷达图的注意事项" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点11-雷达图的注意事项" aria-hidden="true">#</a> [数据分析与可视化] 数据绘图要点11-雷达图的注意事项</h1><p>准确通过雷达图表现数据有许多值得需要思考的地方，本文主要介绍雷达图的一些注意事项。</p><p>[toc]</p><h2 id="雷达图绘制" tabindex="-1"><a class="header-anchor" href="#雷达图绘制" aria-hidden="true">#</a> 雷达图绘制</h2><h3 id="基础雷达图" tabindex="-1"><a class="header-anchor" href="#基础雷达图" aria-hidden="true">#</a> 基础雷达图</h3><p>雷达图又称蜘蛛图或网络图，是一种二维图表类型，设计用于绘制多个定量变量的一个或多个数值系列。每个变量都有自己的轴，所有轴都连接在图形的中心。让我们考虑一个学生的考试成绩。他在数学、体育、统计学等十个主题上的得分范围为 0 到 20。雷达图为每个主题提供一个轴。通过该形状，您可以查看学生在哪些主题上表现出色或表现不佳。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 加载库
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(fmsb)
library(colormap)


## 创建数据
#设计随机种子
set.seed(42) 
## 设计数据
data &lt;- as.data.frame(matrix( sample( 2:20 , 10 , replace=T) , ncol=10)) 
## 添加列名
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
## 在数据中添加每一列的最大范围和最小范围
data &lt;- rbind(rep(20,10) , rep(0,10) , data)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 3 × 10</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th><th scope="col">data-viz</th><th scope="col">french</th><th scope="col">physic</th><th scope="col">statistic</th><th scope="col">sport</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td>18</td><td> 6</td><td> 2</td><td>11</td><td> 5</td><td>19</td><td>18</td><td>16</td><td> 8</td><td> 5</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
## 创建雷达图
par(mar=c(0,0,0,0))
radarchart( data, axistype=1, 
           ## 自定义雷达图四边形
           ## pcol设置四边形边框颜色，pfcol设置四边形填充颜色，plwd设置边框粗细
           pcol=rgb(0.9,0.6,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , plwd=4, 
           ## 自定义网格
           ## cglcol设置网格线条颜色，cglty设置网格线条类型，axislabcol设置轴标签字体颜色
           ## caxislabels设置轴的范围，cglwd设置网格线条粗细
           cglcol=&quot;black&quot;, cglty=2, axislabcol=&quot;blue&quot;, caxislabels=seq(0,20,5), cglwd=0.8,
           ## vlcex设置类别标签位置大小
           vlcex=1.2 
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_3_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="多类别雷达图" tabindex="-1"><a class="header-anchor" href="#多类别雷达图" aria-hidden="true">#</a> 多类别雷达图</h3><p>在上一个图表中，只绘制了一个系列，显示了一名学生的表现。一个常见的任务是比较几个人。只需几个系列，就可以在同一图表上显示每个组。如下图所示，很明显，Shirley综合表现优于Sonia，除了在运动、英语和 R 编码方面。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( c( sample( 2:20 , 10 , replace=T), sample( 2:9 , 10 , replace=T)) , ncol=10, byrow=TRUE))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
## 设置第二行第二列数据为19
data[2,2]=19
## 在数据中添加每一列的最大范围和最小范围
data &lt;- rbind(rep(20,10) , rep(0,10) , data)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 4 × 10</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th><th scope="col">data-viz</th><th scope="col">french</th><th scope="col">physic</th><th scope="col">statistic</th><th scope="col">sport</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 5</td><td> 8</td><td> 2</td><td> 3</td><td>12</td><td>15</td><td>19</td><td>20</td><td> 2</td><td>11</td></tr><tr><td> 7</td><td>19</td><td> 3</td><td> 8</td><td> 2</td><td> 8</td><td> 6</td><td> 6</td><td> 2</td><td> 2</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 设置颜色
colors_border=c( rgb(0.2,0.5,0.5,0.9), rgb(0.8,0.2,0.5,0.9)  )
colors_in=c( rgb(0.2,0.5,0.5,0.4), rgb(0.8,0.2,0.5,0.4)  )

## 创建雷达图
radarchart( data, axistype=1, 
           ## 自定义四边形
           pcol=colors_border , pfcol=colors_in , plwd=4, plty=1 , 
           ## 自定义网格
           cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=1.1,
           ## 自定义标签
           vlcex=0.8 )

## 设置图例
## bty设置图例文字外边框样式，pch设置图例图标样式，col设置图例图标颜色
## text.col设置图例文字颜色，cex设置图例文字大小，pt.cex设置图例图标大小
legend(x=0.85, y=1, legend = c(&quot;Shirley&quot;, &quot;Sonia&quot;), bty = &quot;n&quot;, pch=20 , col=colors_border , text.col = &quot;black&quot;, cex=0.9, pt.cex=1.6)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>对于两个或三个以上的系列，使用多子图是一个很好的做法，以避免出现杂乱的数字。每个学生都有自己的雷达图。很容易理解特定个体的特征，寻找形状的相似性可以让您找到具有相似特征的学生。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( sample( 2:20 , 60 , replace=T) , ncol=10, byrow=TRUE))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
## 在数据中添加每一列的最大范围和最小范围
data &lt;- rbind(rep(20,10) , rep(0,10) , data)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 8 × 10</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th><th scope="col">data-viz</th><th scope="col">french</th><th scope="col">physic</th><th scope="col">statistic</th><th scope="col">sport</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 5</td><td> 8</td><td> 2</td><td> 3</td><td>12</td><td>15</td><td>19</td><td>20</td><td> 2</td><td>11</td></tr><tr><td>15</td><td>11</td><td> 8</td><td>10</td><td>16</td><td> 6</td><td>10</td><td>15</td><td> 6</td><td> 6</td></tr><tr><td> 3</td><td>11</td><td>13</td><td>16</td><td> 2</td><td> 4</td><td> 7</td><td>11</td><td>11</td><td> 7</td></tr><tr><td>16</td><td>13</td><td> 7</td><td> 9</td><td>13</td><td> 7</td><td> 8</td><td>20</td><td>11</td><td> 7</td></tr><tr><td>15</td><td> 3</td><td>14</td><td>19</td><td>15</td><td> 7</td><td> 2</td><td>20</td><td>20</td><td> 9</td></tr><tr><td> 7</td><td>13</td><td> 7</td><td> 9</td><td> 8</td><td>12</td><td>18</td><td> 5</td><td>14</td><td> 9</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 设置颜色
colors_border=colormap(colormap=colormaps$viridis, nshades=6, alpha=1)
colors_in=colormap(colormap=colormaps$viridis, nshades=6, alpha=0.3)

## 设置标题
mytitle &lt;- c(&quot;Max&quot;, &quot;George&quot;, &quot;Xue&quot;, &quot;Tom&quot;, &quot;Alice&quot;, &quot;bob&quot;)

## 设置子图
par(mar=rep(0.8,4))
par(mfrow=c(2,3))

## 依次绘图
for(i in 1:6){
    radarchart( data[c(1,2,i+2),], axistype=1, 
    pcol=colors_border[i] , pfcol=colors_in[i] , plwd=4, plty=1 , 
    cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8,
    vlcex=0.8,
    title=mytitle[i]
    )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="雷达图存在的问题与解决方案" tabindex="-1"><a class="header-anchor" href="#雷达图存在的问题与解决方案" aria-hidden="true">#</a> 雷达图存在的问题与解决方案</h2><h3 id="雷达图存在的问题" tabindex="-1"><a class="header-anchor" href="#雷达图存在的问题" aria-hidden="true">#</a> 雷达图存在的问题</h3><p><strong>1 圆形布局表示更难阅读</strong></p><p>沿着单个垂直或水平轴布局时，定量值更容易比较。这是对圆形布局的普遍指责。下图仅考虑一名学生的数据。比较条形图中的值更容易，也更准确。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( sample( 2:20 , 10 , replace=T) , ncol=10))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )

## 在数据中添加每一列的最大范围和最小范围
data &lt;-rbind(rep(20,10) , rep(0,10) , data)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 3 × 10</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th><th scope="col">data-viz</th><th scope="col">french</th><th scope="col">physic</th><th scope="col">statistic</th><th scope="col">sport</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 5</td><td> 8</td><td> 2</td><td> 3</td><td>12</td><td>15</td><td>19</td><td>20</td><td> 2</td><td>11</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建雷达图
par(mar=c(0,0,0,0))
p1 &lt;- radarchart( data, axistype=1, 
                 pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , plwd=4 , 
                 cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8,vlcex=1.3 )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
## 创建条形图
data %&gt;% slice(3) %&gt;% t() %&gt;% as.data.frame() %&gt;% add_rownames() %&gt;% arrange(V1) %&gt;% mutate(rowname=factor(rowname, rowname)) %&gt;%
  ggplot( aes(x=rowname, y=V1)) +
    geom_segment( aes(x=rowname ,xend=rowname, y=0, yend=V1), color=&quot;grey&quot;) +
    geom_point(size=5, color=&quot;#69b3a2&quot;) +
    coord_flip() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      axis.text = element_text( size=32),
      legend.position=&quot;none&quot;
    ) +
    ylim(0,20) +
    ylab(&quot;mark&quot;) +
    xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_13_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>2 不支持排名</strong></p><p>在上面的例子中，棒棒糖图是有序的。它使您可以立即查看哪个主题的得分最高以及每个主题的排名。对于没有起点和终点的雷达图，这更加困难。</p><p><strong>3 类别排序有巨大的影响</strong></p><p>雷达图的读者可能会关注观察到的形状。这可能会产生误导，因为这种形状高度依赖于周围类别的顺序。查看使用相同数据制作的这些图表，以下三张图数据一样，但更改了类别排序。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(7)
data &lt;- as.data.frame(matrix( sample( 2:20 , 10 , replace=T) , ncol=10))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
data[1,1:3]=rep(19,3)
data[1,6:8]=rep(4,3)
data &lt;- rbind(rep(20,10) , rep(0,10) , data)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 3 × 10</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th><th scope="col">data-viz</th><th scope="col">french</th><th scope="col">physic</th><th scope="col">statistic</th><th scope="col">sport</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td>19</td><td>19</td><td>19</td><td> 3</td><td>16</td><td> 4</td><td> 4</td><td> 4</td><td>16</td><td> 9</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 改变排序创建其他数据
data2 &lt;- data[,sample(1:10,10, replace=FALSE)]
data2
data3 &lt;- data[,sample(1:10,10, replace=FALSE)]
data3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 3 × 10</caption><thead><tr><th scope="col">sport</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">english</th><th scope="col">data-viz</th><th scope="col">statistic</th><th scope="col">math</th><th scope="col">R-coding</th><th scope="col">french</th><th scope="col">physic</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 9</td><td>19</td><td> 3</td><td>19</td><td> 4</td><td>16</td><td>19</td><td>16</td><td> 4</td><td> 4</td></tr></tbody></table><table class="dataframe"><caption>A data.frame: 3 × 10</caption><thead><tr><th scope="col">french</th><th scope="col">english</th><th scope="col">music</th><th scope="col">data-viz</th><th scope="col">biology</th><th scope="col">physic</th><th scope="col">math</th><th scope="col">sport</th><th scope="col">statistic</th><th scope="col">R-coding</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 4</td><td>19</td><td> 3</td><td> 4</td><td>19</td><td> 4</td><td>19</td><td> 9</td><td>16</td><td>16</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
par(mar=c(0,0,0,0))
par(mfrow=c(3,1))
radarchart( data, axistype=1, pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , plwd=4 ,   
           cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8, vlcex=0.8  )
radarchart( data2, axistype=1, pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , plwd=4 ,  
           cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8, vlcex=0.8  )
radarchart( data3, axistype=1, pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , plwd=4 ,   
           cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8, vlcex=0.8  )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_17_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p><strong>4 不确定的数值比例</strong></p><p>雷达图显示几个定量变量的值，所有变量都表示在一个轴上。在前面的示例中，所有变量（范围从0 到 20的）共享相同的比例和相同的单位。但雷达图也可以显示完全不同的变量。在这种情况下，不要忘记为每个显示一个明显的比例：否则读者会期望相同的比例。</p><p><strong>5 对差异的过度评估</strong></p><p>雷达图中形状的面积也呈二次而非线性增加，这可能会导致观看者认为微小的变化比实际情况更重要。在下面的示例中，左边的学生在每个主题上的得分为 7，而右边的学生在每个主题上的得分为 14。但是，右图的面积是左图面积的两倍多。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
data &lt;- as.data.frame(matrix( c(7,7,7,7,7) , ncol=5))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;)
data &lt;- rbind(rep(20,10) , rep(0,10) , data)
data
data2 &lt;- data
data2[3,] &lt;- rep(14,5)
data2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 3 × 5</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td> 7</td><td> 7</td><td> 7</td><td> 7</td><td> 7</td></tr></tbody></table><table class="dataframe"><caption>A data.frame: 3 × 5</caption><thead><tr><th scope="col">math</th><th scope="col">english</th><th scope="col">biology</th><th scope="col">music</th><th scope="col">R-coding</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>20</td><td>20</td><td>20</td><td>20</td><td>20</td></tr><tr><td> 0</td><td> 0</td><td> 0</td><td> 0</td><td> 0</td></tr><tr><td>14</td><td>14</td><td>14</td><td>14</td><td>14</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 绘图
par(mar=rep(0,4))
par(mfrow=c(2,1))
radarchart( data, axistype=1, pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , 
           plwd=4 , cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8, vlcex=0.8  )
radarchart( data2, axistype=1, pcol=rgb(0.2,0.5,0.5,0.9) , pfcol=rgb(0.2,0.5,0.5,0.5) , 
           plwd=4 , cglcol=&quot;grey&quot;, cglty=1, axislabcol=&quot;grey&quot;, caxislabels=seq(0,20,5), cglwd=0.8, vlcex=0.8  )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h3><p>如果您要显示单个系列并且所有定量变量都具有相同的比例，则使用条形图或棒棒糖图，对变量进行排名：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( sample( 2:20 , 10 , replace=T) , ncol=10))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
data &lt;-rbind(rep(20,10) , rep(0,10) , data)

## 绘制条形图
data %&gt;% slice(3) %&gt;% t() %&gt;% as.data.frame() %&gt;% add_rownames() %&gt;% arrange(V1) %&gt;% mutate(rowname=factor(rowname, rowname)) %&gt;%
  ggplot( aes(x=rowname, y=V1)) +
    geom_segment( aes(x=rowname ,xend=rowname, y=0, yend=V1), color=&quot;grey&quot;) +
    geom_point(size=5, color=&quot;#69b3a2&quot;) +
    coord_flip() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      axis.text = element_text( size=32 ),
      legend.position=&quot;none&quot;
    ) +
    ylim(0,20) +
    ylab(&quot;mark&quot;) +
    xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_23_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果您有两个系列要绘制，您仍然可以使用条形图和棒棒糖图。这是一个有2个系列的例子。它侧重于第一个学生（深色），并让您可以看到另一个学生（浅色）的表现如何。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( sample( 2:20 , 20 , replace=T) , ncol=10))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
data &lt;-rbind(rep(20,10) , rep(0,10) , data)

## 绘图
data %&gt;% slice(c(3,4)) %&gt;% t() %&gt;% as.data.frame() %&gt;% add_rownames() %&gt;% arrange(V1) %&gt;% mutate(rowname=factor(rowname, rowname)) %&gt;%
  ggplot( aes(x=rowname, y=V1)) +
    ## 绘制线条
    geom_segment( aes(x=rowname ,xend=rowname, y=V2, yend=V1), color=&quot;grey&quot;) +
    geom_point(size=5, color=&quot;#69b3a2&quot;) +
    ## 设置透明度
    geom_point(aes(y=V2), size=5, color=&quot;#69b3a2&quot;, alpha=0.5) +
    coord_flip() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      axis.text = element_text( size=32 )
    ) +
    ylim(0,20) +
    ylab(&quot;mark&quot;) +
    xlab(&quot;&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_25_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果你有超过2个系列要绘制，使用条形图或棒棒糖图的分面也许可以解决问题：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>## 创建数据
set.seed(1)
data &lt;-as.data.frame(matrix( sample( 2:20 , 40 , replace=T) , ncol=10))
colnames(data) &lt;- c(&quot;math&quot; , &quot;english&quot; , &quot;biology&quot; , &quot;music&quot; , &quot;R-coding&quot;, &quot;data-viz&quot; , &quot;french&quot; , &quot;physic&quot;, &quot;statistic&quot;, &quot;sport&quot; )
data &lt;-rbind(rep(20,10) , rep(0,10) , data)
rownames(data) &lt;- c(&quot;-&quot;, &quot;--&quot;, &quot;John&quot;, &quot;Angli&quot;, &quot;Baptiste&quot;, &quot;Alfred&quot;)

## 绘图数据
data &lt;- data %&gt;% slice(c(3:6)) %&gt;% 
  t() %&gt;% 
  as.data.frame() %&gt;% 
  add_rownames() %&gt;% 
  arrange() %&gt;% 
  mutate(rowname=factor(rowname, rowname)) %&gt;% 
  gather(key=name, value=mark, -1)

## 编制数据
data$name &lt;- recode(data$name, V1 = &quot;John&quot;, V2 = &quot;Angli&quot;, V3 = &quot;Baptiste&quot;, V4 = &quot;Alfred&quot;)

## 绘图
data %&gt;% ggplot( aes(x=rowname, y=mark)) +
    geom_bar(stat=&quot;identity&quot;, fill=&quot;#69b3a2&quot;, width=0.6) +
    coord_flip() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      axis.text = element_text( size=16 )
    ) +
    ylim(0,20) +
    ylab(&quot;mark&quot;) +
    xlab(&quot;&quot;) +
    facet_wrap(~name, ncol=4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_27_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果您有很多系列要绘制，或者您的变量没有相同的比例，那么最好的选择可能是切换到平行坐标图。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(GGally)
## 导入iris数据
data &lt;- iris

## 绘图
data %&gt;% 
ggparcoord(
columns = 1:4, groupColumn = 5, order = &quot;anyClass&quot;,
showPoints = TRUE, 
title = &quot;Parallel Coordinate Plot for the Iris Data&quot;,
alphaLines = 0.3
) + 
scale_color_viridis(discrete=TRUE) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点11-雷达图的注意事项/output_29_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,65),u={href:"https://www.data-to-viz.com/caveat/spider.html",target:"_blank",rel:"noopener noreferrer"};function v(h,m){const d=l("ExternalLinkIcon");return i(),a("div",null,[r,t("ul",null,[t("li",null,[t("a",u,[n("THE RADAR CHART AND ITS CAVEATS"),s(d)])])])])}const g=e(c,[["render",v],["__file","2022-01-12-_数据分析与可视化_ 数据绘图要点11-雷达图的注意事项.html.vue"]]);export{g as default};
