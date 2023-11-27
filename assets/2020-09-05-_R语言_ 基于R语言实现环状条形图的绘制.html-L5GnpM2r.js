import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as s,c as r,a as e,b as t,d as a,e as i}from"./app-MsA2k2kn.js";const o={},c=e("h1",{id:"r语言-基于r语言实现环状条形图的绘制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#r语言-基于r语言实现环状条形图的绘制","aria-hidden":"true"},"#"),t(" [R语言] 基于R语言实现环状条形图的绘制")],-1),u={href:"https://www.r-graph-gallery.com/circular-barplot.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/tidyverse",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"安装命令如下：",-1),m=e("blockquote",null,[e("p",null,'install.packages("tidyverse")')],-1),p={href:"https://github.com/luohenyueji/R-Study-Notes/tree/master/Visualization",target:"_blank",rel:"noopener noreferrer"},h=e("hr",null,null,-1),g=e("p",null,"[toc]",-1),_=e("h2",{id:"_1-基础环状条形图绘制-basic-circular-barplot",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-基础环状条形图绘制-basic-circular-barplot","aria-hidden":"true"},"#"),t(" 1 基础环状条形图绘制 Basic circular barplot")],-1),f=e("h3",{id:"_1-1-最基础环状条形图的绘制-most-basic-circular-barplot",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1-最基础环状条形图的绘制-most-basic-circular-barplot","aria-hidden":"true"},"#"),t(" 1.1 最基础环状条形图的绘制 Most basic circular barplot")],-1),q={href:"https://www.cnblogs.com/business-analysis/p/3414997.html",target:"_blank",rel:"noopener noreferrer"},y=i(`<div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Libraries
# 导入包
library(tidyverse)
 
# Create dataset
# 创建数据
data &lt;- data.frame(
  id=seq(1,60),
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  value=sample( seq(10,100), 60, replace=T)
)
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 3</caption><thead><tr><th scope="col">id</th><th scope="col">individual</th><th scope="col">value</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>1</td><td>Mister 1</td><td>44</td></tr><tr><td>2</td><td>Mister 2</td><td>79</td></tr><tr><td>3</td><td>Mister 3</td><td>81</td></tr><tr><td>4</td><td>Mister 4</td><td>62</td></tr><tr><td>5</td><td>Mister 5</td><td>91</td></tr><tr><td>6</td><td>Mister 6</td><td>50</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Make the plot
# 画图
p &lt;- ggplot(data, aes(x=as.factor(id), y=value)) +       
    # This add the bars with a blue color
    # 添加蓝色条形，stat表示数据统计方式，也就是说identity提取横坐标x对应的y值
    geom_bar(stat=&quot;identity&quot;, fill=alpha(&quot;blue&quot;, 0.3)) +
    # The negative value controls the size of the inner circle, the positive one is useful to add size over each bar
    # 设置y的范围，负值设定内圆的大小，正值设定各个条柱的最高高度
    ylim(-100,120)+
    # theme_minimal简约主题
    theme_minimal() +
    # Custom the theme: no axis title and no cartesian grid
    # 自定义主题
    theme(
        # 移除标题坐标文字
        axis.text = element_blank(),
        axis.title = element_blank(),
        # 移除网格
        panel.grid = element_blank(),
        # This remove unnecessary margin around plot
        # 移除不必要空白
        plot.margin = unit(rep(-2,4), &quot;cm&quot;))+
    # This makes the coordinate polar instead of cartesian.
    # 使用极坐标系
    coord_polar(start = 0)
p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_3_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-给环状条形图添加标签-add-labels-to-circular-barplot" tabindex="-1"><a class="header-anchor" href="#_1-2-给环状条形图添加标签-add-labels-to-circular-barplot" aria-hidden="true">#</a> 1.2 给环状条形图添加标签 Add labels to circular barplot</h3><p>上节说明了如何制作基本的环状条形图。下一步是在每个条上添加标签，以便深入了解图形。这里我建议一种方法，在每个条的顶部添加标签，使用与条中心部分相同的角度。在下面的代码中，有一小段创建了一个带有每个标签特性的数据帧，然后我们可以在geom_text（）中调用它。 请注意，为了让标签的更好阅读，这就需要将其中一些标签翻转180度。</p><p><strong>首先添加数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Libraries
library(tidyverse)
 
# Create dataset
# 创建数据
data &lt;- data.frame(
  id=seq(1,60),
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  value=sample( seq(10,100), 60, replace=T)
)
# ----- This section prepare a dataframe for labels ---- #
# 准备数据标签
# Get the name and the y position of each label
label_data &lt;- data
# calculate the ANGLE of the labels
# 计算标签角度
number_of_bar &lt;- nrow(label_data)
number_of_bar

# I substract 0.5 because the letter must have the angle of the center of the bars. Not extreme right(1) or extreme left (0)
# 减去0.5是为了让标签位于条柱中心
# angle是标签角度
angle &lt;-  90 - 360 * (label_data$id-0.5) /number_of_bar 

# calculate the alignment of labels: right or left
# If I am on the left part of the plot, my labels have currently an angle &lt; -90
# 判断标签左对齐还是右对齐，也就是标签是朝向左边还是右边
label_data$hjust&lt;-ifelse( angle &lt; -90, 1, 0)
 
# flip angle BY to make them readable
# 翻转标签
label_data$angle&lt;-ifelse(angle &lt; -90, angle+180, angle)
# ----- ------------------------------------------- ---- #
head(label_data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>60</p><table><caption>A data.frame: 6 × 5</caption><thead><tr><th scope="col">id</th><th scope="col">individual</th><th scope="col">value</th><th scope="col">hjust</th><th scope="col">angle</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>1</td><td>Mister 1</td><td>86</td><td>0</td><td>87</td></tr><tr><td>2</td><td>Mister 2</td><td>81</td><td>0</td><td>81</td></tr><tr><td>3</td><td>Mister 3</td><td>27</td><td>0</td><td>75</td></tr><tr><td>4</td><td>Mister 4</td><td>48</td><td>0</td><td>69</td></tr><tr><td>5</td><td>Mister 5</td><td>57</td><td>0</td><td>63</td></tr><tr><td>6</td><td>Mister 6</td><td>49</td><td>0</td><td>57</td></tr></tbody></table><p><strong>开始绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
# Start the plot
# 开始绘图
p &lt;- ggplot(data, aes(x=as.factor(id), y=value)) +   
    # This add the bars with a bskyblue color
    # 添加蓝色条形，stat表示数据统计方式，也就是说identity提取横坐标x对应的y值
    geom_bar(stat=&quot;identity&quot;, fill=alpha(&quot;skyblue&quot;, 0.7)) +

    # The negative value controls the size of the inner circle, the positive one is useful to add size over each bar
    # 设置y的范围，负值设定内圆的大小，正值设定各个条柱的最高高度
    ylim(-100,120)+

    # theme_minimal简约主题
    theme_minimal() +
    # Custom the theme: no axis title and no cartesian grid
    # 自定义主题
    theme(
        # 移除标题坐标文字
        axis.text = element_blank(),
        axis.title = element_blank(),
        # 移除网格
        panel.grid = element_blank(),
        # This remove unnecessary margin around plot
        # 移除不必要空白
        plot.margin = unit(rep(-2,4), &quot;cm&quot;))+

    # This makes the coordinate polar instead of
    # 设置极坐标系
    coord_polar(start = 0) +

    # Add the labels, using the label_data dataframe that we have created before
    # 添加标签
    geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE ) 

p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_8_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-分组环状条形图-circular-barplot-with-groups" tabindex="-1"><a class="header-anchor" href="#_2-分组环状条形图-circular-barplot-with-groups" aria-hidden="true">#</a> 2 分组环状条形图 Circular barplot with groups</h2><h3 id="_2-1-在圆中添加间隙-add-a-gap-in-the-circle" tabindex="-1"><a class="header-anchor" href="#_2-1-在圆中添加间隙-add-a-gap-in-the-circle" aria-hidden="true">#</a> 2.1 在圆中添加间隙 Add a gap in the circle</h3><p>本节主要介绍在圆中添加间隙，其实大部分操作和上一节一样，只是在初始数据帧的末尾添加了几行空行就能添加间隙</p><p><strong>添加数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(tidyverse)
 
# Create dataset
# 添加数据
data &lt;- data.frame(
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  value=sample( seq(10,100), 60, replace=T)
)
 
# Set a number of &#39;empty bar&#39;
# 设置空白柱的个数
empty_bar &lt;- 10
 
# 在原始数据中添加空白数据
# Add lines to the initial dataset
to_add &lt;- matrix(NA, empty_bar, ncol(data))
colnames(to_add) &lt;- colnames(data)
data &lt;- rbind(data, to_add)
data$id &lt;- seq(1, nrow(data))

# Get the name and the y position of each label
# 和上一步一样，获得标签角度信息
label_data &lt;- data
number_of_bar &lt;- nrow(label_data)
angle &lt;- 90 - 360 * (label_data$id-0.5) /number_of_bar   
label_data$hjust &lt;- ifelse( angle &lt; -90, 1, 0)
label_data$angle &lt;- ifelse(angle &lt; -90, angle+180, angle)
head(label_data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 5</caption><thead><tr><th scope="col">individual</th><th scope="col">value</th><th scope="col">id</th><th scope="col">hjust</th><th scope="col">angle</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>Mister 1</td><td>18</td><td>1</td><td>0</td><td>87.42857</td></tr><tr><td>Mister 2</td><td>55</td><td>2</td><td>0</td><td>82.28571</td></tr><tr><td>Mister 3</td><td>69</td><td>3</td><td>0</td><td>77.14286</td></tr><tr><td>Mister 4</td><td>36</td><td>4</td><td>0</td><td>72.00000</td></tr><tr><td>Mister 5</td><td>46</td><td>5</td><td>0</td><td>66.85714</td></tr><tr><td>Mister 6</td><td>82</td><td>6</td><td>0</td><td>61.71429</td></tr></tbody></table><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Make the plot
# 绘图
p &lt;- ggplot(data, aes(x=as.factor(id), y=value)) +       # Note that id is a factor. If x is numeric, there is some space between the first bar
  geom_bar(stat=&quot;identity&quot;, fill=alpha(&quot;green&quot;, 0.3)) +
  ylim(-100,120) +
  theme_minimal() +
  theme(
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), &quot;cm&quot;) 
  ) +
  coord_polar(start = 0) + 
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE ) 
 
p;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 10 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 10 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_14_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-组间距设置-space-between-groups" tabindex="-1"><a class="header-anchor" href="#_2-2-组间距设置-space-between-groups" aria-hidden="true">#</a> 2.2 组间距设置 Space between groups</h3>`,24),x={href:"https://www.jianshu.com/p/c65dbce983dd",target:"_blank",rel:"noopener noreferrer"},A=i(`<p><strong>首先创建一个空白数组</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(tidyverse)
 
# Create dataset
# 创建数据集
data &lt;- data.frame(
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  group=c( rep(&#39;A&#39;, 10), rep(&#39;B&#39;, 30), rep(&#39;C&#39;, 14), rep(&#39;D&#39;, 6)) ,
  value=sample( seq(10,100), 60, replace=T)
)

# Set a number of &#39;empty bar&#39; to add at the end of each group
# 在原始数据中添加空白数据
# empty_bar 表示组之间的空白距离
empty_bar &lt;- 4
# 每一组之间4个空白
to_add &lt;- data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) &lt;- colnames(data)
# 为每个空白值提供组信息，rep函数的意思就是复制值，levels(data$group)为复制的对象，each为复制的次数
to_add$group &lt;- rep(levels(data$group), each=empty_bar)
head(to_add)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 3</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value</th></tr><tr><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;lgl&gt;</th></tr></thead><tbody><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>B</td><td>NA</td></tr><tr><td>NA</td><td>B</td><td>NA</td></tr></tbody></table><p><strong>然后将空白数组与原始数据绑定</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>colnames(to_add) &lt;- colnames(data)
to_add$group &lt;- rep(levels(data$group), each=empty_bar)
data &lt;- rbind(data, to_add)
# 管道操作类似 data&lt;-arrange(data,data$group)
data &lt;- data %&gt;% arrange(group)
# 设置id
data$id &lt;- seq(1, nrow(data))
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 4</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value</th><th scope="col">id</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>Mister 1</td><td>A</td><td>79</td><td>1</td></tr><tr><td>Mister 2</td><td>A</td><td>20</td><td>2</td></tr><tr><td>Mister 3</td><td>A</td><td>67</td><td>3</td></tr><tr><td>Mister 4</td><td>A</td><td>47</td><td>4</td></tr><tr><td>Mister 5</td><td>A</td><td>78</td><td>5</td></tr><tr><td>Mister 6</td><td>A</td><td>50</td><td>6</td></tr></tbody></table><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Get the name and the y position of each label
# 设定角度值
label_data &lt;- data
number_of_bar &lt;- nrow(label_data)
angle &lt;- 90 - 360 * (label_data$id-0.5) /number_of_bar    
label_data$hjust &lt;- ifelse( angle &lt; -90, 1, 0)
label_data$angle &lt;- ifelse(angle &lt; -90, angle+180, angle)
 
# Make the plot
# fill 按组填充颜色
p &lt;- ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +   
  geom_bar(stat=&quot;identity&quot;, alpha=0.5) +
  ylim(-100,120) +
  theme_minimal() +
  theme(
    legend.position = &quot;none&quot;,
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), &quot;cm&quot;) 
  ) +
  coord_polar() + 
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE ) 
p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 16 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 16 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_21_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-3-对柱状进行排序-order-bars" tabindex="-1"><a class="header-anchor" href="#_2-3-对柱状进行排序-order-bars" aria-hidden="true">#</a> 2.3 对柱状进行排序 Order bars</h3><p>在这里，观察结果是按每个组内的条形高度排序的。如果您的目标是了解组内和组间的最高/最低观察值是什么，那么这将非常有用。在上一节中修改一行代码即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># data = data %&gt;% arrange(group)
# 修改为
data = data %&gt;% arrange(group, value)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(tidyverse)
 
# Create dataset
# 创建数据集
data &lt;- data.frame(
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  group=c( rep(&#39;A&#39;, 10), rep(&#39;B&#39;, 30), rep(&#39;C&#39;, 14), rep(&#39;D&#39;, 6)) ,
  value=sample( seq(10,100), 60, replace=T)
)

# Set a number of &#39;empty bar&#39; to add at the end of each group
# 在原始数据中添加空白数据
# empty_bar 表示组之间的空白距离
empty_bar &lt;- 4
# 每一组之间4个空白
to_add &lt;- data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) &lt;- colnames(data)
# 为每个空白值提供组信息，rep函数的意思就是复制值，levels(data$group)为复制的对象，each为复制的次数
to_add$group &lt;- rep(levels(data$group), each=empty_bar)
head(to_add)

colnames(to_add) &lt;- colnames(data)
to_add$group &lt;- rep(levels(data$group), each=empty_bar)
data &lt;- rbind(data, to_add)
# 管道操作类似 data&lt;-arrange(data,data$group)
data &lt;- data %&gt;% arrange(group, value)
# 设置id
data$id &lt;- seq(1, nrow(data))
head(data)

# Get the name and the y position of each label
# 设定角度值
label_data &lt;- data
number_of_bar &lt;- nrow(label_data)
angle &lt;- 90 - 360 * (label_data$id-0.5) /number_of_bar    
label_data$hjust &lt;- ifelse( angle &lt; -90, 1, 0)
label_data$angle &lt;- ifelse(angle &lt; -90, angle+180, angle)
 
# Make the plot
# fill 按组填充颜色
p &lt;- ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +   
  geom_bar(stat=&quot;identity&quot;, alpha=0.5) +
  ylim(-100,120) +
  theme_minimal() +
  theme(
    legend.position = &quot;none&quot;,
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), &quot;cm&quot;) 
  ) +
  coord_polar() + 
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE ) 
p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 3</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value</th></tr><tr><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;lgl&gt;</th></tr></thead><tbody><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>A</td><td>NA</td></tr><tr><td>NA</td><td>B</td><td>NA</td></tr><tr><td>NA</td><td>B</td><td>NA</td></tr></tbody></table><table><caption>A data.frame: 6 × 4</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value</th><th scope="col">id</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>Mister 1 </td><td>A</td><td>20</td><td>1</td></tr><tr><td>Mister 10</td><td>A</td><td>20</td><td>2</td></tr><tr><td>Mister 7 </td><td>A</td><td>24</td><td>3</td></tr><tr><td>Mister 4 </td><td>A</td><td>30</td><td>4</td></tr><tr><td>Mister 3 </td><td>A</td><td>49</td><td>5</td></tr><tr><td>Mister 8 </td><td>A</td><td>64</td><td>6</td></tr></tbody></table><pre><code>Warning message:
&quot;Removed 16 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 16 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_23_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-4-环状条形图自定义-circular-barchart-customization" tabindex="-1"><a class="header-anchor" href="#_2-4-环状条形图自定义-circular-barchart-customization" aria-hidden="true">#</a> 2.4 环状条形图自定义 Circular barchart customization</h3><p>最后是，在图表中添加一些自定义项是非常明智的。这里我们添加组名（A、B、C和D），并添加一个刻度来帮助比较条形图的大小。代码有点长，但结果看来是值得的！</p><p><strong>首先准备数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(tidyverse)
 
# Create dataset
data &lt;- data.frame(
  individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
  group=c( rep(&#39;A&#39;, 10), rep(&#39;B&#39;, 30), rep(&#39;C&#39;, 14), rep(&#39;D&#39;, 6)) ,
  value=sample( seq(10,100), 60, replace=T)
)
 
# Set a number of &#39;empty bar&#39; to add at the end of each group
empty_bar &lt;- 3
to_add &lt;- data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) &lt;- colnames(data)
to_add$group &lt;- rep(levels(data$group), each=empty_bar)
data &lt;- rbind(data, to_add)
data &lt;- data %&gt;% arrange(group)
data$id &lt;- seq(1, nrow(data))

# Get the name and the y position of each label
label_data &lt;- data
number_of_bar &lt;- nrow(label_data)
angle &lt;- 90 - 360 * (label_data$id-0.5) /number_of_bar   
label_data$hjust &lt;- ifelse( angle &lt; -90, 1, 0)
label_data$angle &lt;- ifelse(angle &lt; -90, angle+180, angle)
head(label_data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 6</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value</th><th scope="col">id</th><th scope="col">hjust</th><th scope="col">angle</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>Mister 1</td><td>A</td><td>38</td><td>1</td><td>0</td><td>87.5</td></tr><tr><td>Mister 2</td><td>A</td><td>24</td><td>2</td><td>0</td><td>82.5</td></tr><tr><td>Mister 3</td><td>A</td><td>72</td><td>3</td><td>0</td><td>77.5</td></tr><tr><td>Mister 4</td><td>A</td><td>47</td><td>4</td><td>0</td><td>72.5</td></tr><tr><td>Mister 5</td><td>A</td><td>96</td><td>5</td><td>0</td><td>67.5</td></tr><tr><td>Mister 6</td><td>A</td><td>86</td><td>6</td><td>0</td><td>62.5</td></tr></tbody></table><p><strong>然后设置abcd刻度线信息</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># prepare a data frame for base lines
base_data &lt;- data %&gt;% 
  group_by(group) %&gt;% 
  summarize(start=min(id), end=max(id) - empty_bar) %&gt;% 
  rowwise() %&gt;% 
  mutate(title=mean(c(start, end)))
head(base_data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A rowwise_df: 4 × 4</caption><thead><tr><th scope="col">group</th><th scope="col">start</th><th scope="col">end</th><th scope="col">title</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>A</td><td> 1</td><td>10</td><td> 5.5</td></tr><tr><td>B</td><td>14</td><td>43</td><td>28.5</td></tr><tr><td>C</td><td>47</td><td>60</td><td>53.5</td></tr><tr><td>D</td><td>64</td><td>69</td><td>66.5</td></tr></tbody></table><p><strong>接着设置各组之间的间隔条</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># prepare a data frame for grid (scales)
grid_data &lt;- base_data
grid_data$end &lt;- grid_data$end[ c( nrow(grid_data), 1:nrow(grid_data)-1)] + 1
grid_data$start &lt;- grid_data$start - 1
grid_data &lt;- grid_data[-1,]
grid_data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A rowwise_df: 3 × 4</caption><thead><tr><th scope="col">group</th><th scope="col">start</th><th scope="col">end</th><th scope="col">title</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>B</td><td>13</td><td>11</td><td>28.5</td></tr><tr><td>C</td><td>46</td><td>44</td><td>53.5</td></tr><tr><td>D</td><td>63</td><td>61</td><td>66.5</td></tr></tbody></table><p><strong>最后就是绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Make the plot
p &lt;- ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +   
    # 添加条形图
    geom_bar(aes(x=as.factor(id), y=value, fill=group), stat=&quot;identity&quot;, alpha=0.5) +

    # 添加各组之间的线条，可以注释
    geom_segment(data=grid_data, aes(x = end, y = 80, xend = start, yend = 80), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
    geom_segment(data=grid_data, aes(x = end, y = 60, xend = start, yend = 60), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
    geom_segment(data=grid_data, aes(x = end, y = 40, xend = start, yend = 40), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
    geom_segment(data=grid_data, aes(x = end, y = 20, xend = start, yend = 20), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +

    # Add text showing the value of each 100/75/50/25 lines，设置值坐标，可以注释
    annotate(&quot;text&quot;, x = rep(max(data$id),4), y = c(20, 40, 60, 80), label = c(&quot;20&quot;, &quot;40&quot;, &quot;60&quot;, &quot;80&quot;) , color=&quot;grey&quot;, size=3 , angle=0, fontface=&quot;bold&quot;, hjust=1) +
    
    # 和前面一样
    ylim(-100,120) +
    theme_minimal() +
    theme(
        legend.position = &quot;none&quot;,
        axis.text = element_blank(),
        axis.title = element_blank(),
        panel.grid = element_blank(),
        plot.margin = unit(rep(-1,4), &quot;cm&quot;) 
    ) +
    coord_polar() + 
    geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE ) +

    # Add base line information
    # 添加下划线
    geom_segment(data=base_data, aes(x = start, y = -5, xend = end, yend = -5), colour = &quot;black&quot;, alpha=0.8, size=0.6 , inherit.aes = FALSE )  +
    # 添加各组的名字
    geom_text(data=base_data, aes(x = title, y = -18, label=group), hjust=c(1,1,0,0), colour = &quot;black&quot;, alpha=0.8, size=4, fontface=&quot;bold&quot;, inherit.aes = FALSE)
p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 12 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 12 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_32_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-堆积环状条形图-circular-stacked-barplot" tabindex="-1"><a class="header-anchor" href="#_3-堆积环状条形图-circular-stacked-barplot" aria-hidden="true">#</a> 3 堆积环状条形图 Circular stacked barplot</h2>`,34),R={href:"https://blog.csdn.net/six66667/article/details/84888644",target:"_blank",rel:"noopener noreferrer"},w=i(`<p>该段代码和前面不同在于数据创建以及创建各组之间的间距条</p><p><strong>首先创建数据集</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># library
library(tidyverse)
library(viridis)
 
# Create dataset
# 创建数据集
data &lt;- data.frame(
    individual=paste( &quot;Mister &quot;, seq(1,60), sep=&quot;&quot;),
    group=c( rep(&#39;A&#39;, 10), rep(&#39;B&#39;, 30), rep(&#39;C&#39;, 14), rep(&#39;D&#39;, 6)) ,
    value1=sample( seq(10,100), 60, replace=T),
    value2=sample( seq(10,100), 60, replace=T),
    value3=sample( seq(10,100), 60, replace=T)
)
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 5</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">value1</th><th scope="col">value2</th><th scope="col">value3</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>Mister 1</td><td>A</td><td>44</td><td>70</td><td>62</td></tr><tr><td>Mister 2</td><td>A</td><td>86</td><td>75</td><td>31</td></tr><tr><td>Mister 3</td><td>A</td><td>18</td><td>56</td><td>61</td></tr><tr><td>Mister 4</td><td>A</td><td>20</td><td>64</td><td>99</td></tr><tr><td>Mister 5</td><td>A</td><td>62</td><td>66</td><td>44</td></tr><tr><td>Mister 6</td><td>A</td><td>43</td><td>50</td><td>31</td></tr></tbody></table><p><strong>转换数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Transform data in a tidy format (long format)
# key表示观察的变量就是value1,value2,value3;value代表值,-c(1,2)表示不对第一列和第二列进行转换
data &lt;- data %&gt;% gather(key = &quot;observation&quot;, value=&quot;value&quot;, -c(1,2)) 
head(data)
dim(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 4</caption><thead><tr><th scope="col">individual</th><th scope="col">group</th><th scope="col">observation</th><th scope="col">value</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>Mister 1</td><td>A</td><td>value1</td><td>44</td></tr><tr><td>Mister 2</td><td>A</td><td>value1</td><td>86</td></tr><tr><td>Mister 3</td><td>A</td><td>value1</td><td>18</td></tr><tr><td>Mister 4</td><td>A</td><td>value1</td><td>20</td></tr><tr><td>Mister 5</td><td>A</td><td>value1</td><td>62</td></tr><tr><td>Mister 6</td><td>A</td><td>value1</td><td>43</td></tr></tbody></table><ol class="list-inline"><li>180</li><li>4</li></ol><p><strong>设置一系列绘图指标</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Set a number of &#39;empty bar&#39; to add at the end of each group
empty_bar &lt;- 2
nObsType &lt;- nlevels(as.factor(data$observation))
to_add &lt;- data.frame( matrix(NA, empty_bar*nlevels(data$group)*nObsType, ncol(data)) )
colnames(to_add) &lt;- colnames(data)
to_add$group &lt;- rep(levels(data$group), each=empty_bar*nObsType )
data &lt;- rbind(data, to_add)
data &lt;- data %&gt;% arrange(group, individual)
data$id &lt;- rep( seq(1, nrow(data)/nObsType) , each=nObsType)
 
# Get the name and the y position of each label
label_data &lt;- data %&gt;% group_by(id, individual) %&gt;% summarize(tot=sum(value))
number_of_bar &lt;- nrow(label_data)
angle &lt;- 90 - 360 * (label_data$id-0.5) /number_of_bar     
label_data$hjust &lt;- ifelse( angle &lt; -90, 1, 0)
label_data$angle &lt;- ifelse(angle &lt; -90, angle+180, angle)
 
# prepare a data frame for base lines
base_data &lt;- data %&gt;% 
  group_by(group) %&gt;% 
  summarize(start=min(id), end=max(id) - empty_bar) %&gt;% 
  rowwise() %&gt;% 
  mutate(title=mean(c(start, end)))
 
# prepare a data frame for grid (scales)
grid_data &lt;- base_data
grid_data$end &lt;- grid_data$end[ c( nrow(grid_data), 1:nrow(grid_data)-1)] + 1
grid_data$start &lt;- grid_data$start - 1
grid_data &lt;- grid_data[-1,]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Factor \`individual\` contains implicit NA, consider using \`forcats::fct_explicit_na\`&quot;
</code></pre><p><strong>绘图</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>
# Make the plot
p &lt;- ggplot(data) +      
  
  # Add the stacked bar
  geom_bar(aes(x=as.factor(id), y=value, fill=observation), stat=&quot;identity&quot;, alpha=0.5) +
  scale_fill_viridis(discrete=TRUE) +
  
  # Add a val=100/75/50/25 lines. I do it at the beginning to make sur barplots are OVER it.
  geom_segment(data=grid_data, aes(x = end, y = 0, xend = start, yend = 0), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
  geom_segment(data=grid_data, aes(x = end, y = 50, xend = start, yend = 50), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
  geom_segment(data=grid_data, aes(x = end, y = 100, xend = start, yend = 100), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
  geom_segment(data=grid_data, aes(x = end, y = 150, xend = start, yend = 150), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
  geom_segment(data=grid_data, aes(x = end, y = 200, xend = start, yend = 200), colour = &quot;grey&quot;, alpha=1, size=0.3 , inherit.aes = FALSE ) +
  
  # Add text showing the value of each 100/75/50/25 lines
  ggplot2::annotate(&quot;text&quot;, x = rep(max(data$id),5), y = c(0, 50, 100, 150, 200), label = c(&quot;0&quot;, &quot;50&quot;, &quot;100&quot;, &quot;150&quot;, &quot;200&quot;) , color=&quot;grey&quot;, size=6 , angle=0, fontface=&quot;bold&quot;, hjust=1) +
  
  ylim(-150,max(label_data$tot, na.rm=T)) +
  theme_minimal() +
  theme(
    legend.position = &quot;none&quot;,
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), &quot;cm&quot;) 
  ) +
  coord_polar() +
  
  # Add labels on top of each bar
  geom_text(data=label_data, aes(x=id, y=tot+10, label=individual, hjust=hjust), color=&quot;black&quot;, fontface=&quot;bold&quot;,alpha=0.6, size=5, angle= label_data$angle, inherit.aes = FALSE ) +
  
  # Add base line information
  geom_segment(data=base_data, aes(x = start, y = -5, xend = end, yend = -5), colour = &quot;black&quot;, alpha=0.8, size=0.6 , inherit.aes = FALSE )  +
  geom_text(data=base_data, aes(x = title, y = -18, label=group), hjust=c(1,1,0,0), colour = &quot;black&quot;, alpha=0.8, size=4, fontface=&quot;bold&quot;, inherit.aes = FALSE)

p
# 保存数据 Save at png
ggsave(p, file=&quot;output.png&quot;, width=10, height=10)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;Removed 24 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 9 rows containing missing values (geom_text).&quot;
Warning message:
&quot;Removed 24 rows containing missing values (position_stack).&quot;
Warning message:
&quot;Removed 9 rows containing missing values (geom_text).&quot;
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/Visualization/基于R语言实现环状条形图的绘制/output_41_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,16),k={href:"https://www.r-graph-gallery.com/circular-barplot.html",target:"_blank",rel:"noopener noreferrer"},M={href:"https://github.com/tidyverse",target:"_blank",rel:"noopener noreferrer"},$={href:"https://www.cnblogs.com/business-analysis/p/3414997.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.jianshu.com/p/c65dbce983dd",target:"_blank",rel:"noopener noreferrer"},N={href:"https://blog.csdn.net/six66667/article/details/84888644",target:"_blank",rel:"noopener noreferrer"};function S(j,T){const d=l("ExternalLinkIcon");return s(),r("div",null,[c,e("p",null,[t("环状条形图(Circular barplot)是条形图的变体，图如其名，环状条形图在视觉上很吸引人，但也必须小心使用，因为环状条形图使用的是极坐标系而不是笛卡尔坐标系，每一个类别不共享相同的Y轴。环状条形图非常适合于周期性数据，本文主要介绍基于R语言实现环状条形图的绘制。本文主要参考链接:"),e("a",u,[t("Circular barplot"),a(d)])]),e("p",null,[t("R语言的环状条形图主要基于tidyverse包实现，tidyverse是一组R包的集合，这些R包共享共同的原理并旨在无缝地协同工作，具体介绍见： "),e("a",v,[t("tidyverse"),a(d)])]),b,m,e("p",null,[t("本文所有代码见："),e("a",p,[t("R-Study-Notes"),a(d)])]),h,g,_,f,e("p",null,[t("环状条形图就是条形图，只不过环状条形图沿圆形而不是直线显示。 输入数据集与条形图的输入数据集相同：每个组需要一个数值（一个组=一个条形图）。（请参阅条形图部分的更多说明）。 基本上，这个方法和做一个经典的条形图是一样的。最后，我们调用coord_polar()使整个坐标系变为极坐标系，这样会使得图表呈圆形。注意，ylim()参数非常重要。如果它从0开始，这些条将从圆的中心开始。如果您提供负值，将出现一个白色的圆圈空格！此外会用到rep函数，具体介绍见"),e("a",q,[t("R中rep函数的使用"),a(d)])]),y,e("p",null,[t("组间距就是在各个组之间添加若干个空白柱，本节代码会用到R语言管道，具体介绍"),e("a",x,[t("R语言中的管道%>%"),a(d)])]),A,e("p",null,[t("本节旨在教你如何制作分组堆积的环状条形图。我强烈建议在深入研究这个代码之前先阅读前面的代码。本节会用到gather函数来处理数据，gather函数类似excel中的透视表，将数据压平。具体使用见 "),e("a",R,[t("R语言 tidyr包的三个重要函数：gather，spread，separate的用法和举例"),a(d)])]),w,e("ul",null,[e("li",null,[e("a",k,[t("Circular barplot"),a(d)])]),e("li",null,[e("a",M,[t("tidyverse"),a(d)])]),e("li",null,[e("a",$,[t("R中rep函数的使用"),a(d)])]),e("li",null,[e("a",z,[t("R语言中的管道%>%"),a(d)])]),e("li",null,[e("a",N,[t("R语言 tidyr包的三个重要函数：gather，spread，separate的用法和举例"),a(d)])])])])}const C=n(o,[["render",S],["__file","2020-09-05-_R语言_ 基于R语言实现环状条形图的绘制.html.vue"]]);export{C as default};
