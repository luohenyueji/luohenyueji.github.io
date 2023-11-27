import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as n,c as s,a as l,b as t,d as e,e as r}from"./app-MsA2k2kn.js";const c={},o=l("h1",{id:"r语言-r语言快速入门教程",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#r语言-r语言快速入门教程","aria-hidden":"true"},"#"),t(" [R语言] R语言快速入门教程")],-1),u=l("p",null,"本文主要是为了从零开始学习和理解R语言，简要介绍了该语言的最重要部分，以快速入门。主要参考文章：",-1),v={href:"http://r-statistics.co/R-Tutorial.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://blog.csdn.net/qq_43198568/article/details/105641104",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/luohenyj/category_9152388.html",target:"_blank",rel:"noopener noreferrer"},h=r(`<h2 id="_1-入门基础" tabindex="-1"><a class="header-anchor" href="#_1-入门基础" aria-hidden="true">#</a> 1 入门基础</h2><h3 id="_1-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_1-1-基础使用" aria-hidden="true">#</a> 1.1 基础使用</h3><p><strong>运算符</strong></p><p>R语言程序都可以当成计算器使用，#在R语言中是注释符，R忽略#之后的一切。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>2 + 3 # 加法 5
2 * 3 # 乘法 6
sqrt(36) # 开根号 6
log10(100) # 10为底的对数运算 2
10 / 3 # 除法 3.33333333333333
10 %/% 3 # 整除 3
10 %% 3 # 求余 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5</p><p>6</p><p>6</p><p>2</p><p>3.33333333333333</p><p>3</p><p>1</p><p><strong>赋值运算符</strong></p><p>与大多数其他语言不同，R除了使用通常的=运算符赋值外，还使用&lt;-或者-&gt;运算符。在R语言中&lt;-或者-&gt;运算符就相当于=号，唯一的区别是&lt;-和-&gt;指明了运算方向。==表示是否相等，=表示赋值。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a &lt;- 10  # 把10赋值给a
a = 10  # 把10赋值给a
10 -&gt; a  # 把10赋值给a
# 10 = a  # 出错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>数据类型</strong><br> R语言没有专门的步骤来定义变量的类型。R会在后台直观地进行判断变量的类型。我们可以通过class函数来查看变量的数据类型</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>class(a) # numeric类型
class(1.1) # numeric类型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;numeric&#39;</p><p>&#39;numeric&#39;</p><p>根据分配给变量a的值，R决定将a分配为numeric类型。如果您选择将其更改为字符&#39;10&#39;而不是数字10，则可以执行以下操作：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a &lt;- as.character(a) # 转换a为字符串
print(a)  # 打印a &quot;10&quot;
class(a)  # 数据类型 &quot;character&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1] &quot;10&quot;
</code></pre><p>&#39;character&#39;</p><p>当然我们也可以将a从字符串变为数字</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a &lt;- as.numeric(a)
print(a)  # 打印a 10
class(a)  # 数据类型 &quot;numeric&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1] 10
</code></pre><p>&#39;numeric&#39;</p><p>常用的R语言类如下<br><strong>变量</strong></p><ul><li>character 字符串</li><li>integer 整数</li><li>numeric 整数+分数</li><li>factor 分类变量，其中每个级别都是一个类别</li><li>logical 布尔</li><li>complex 复数</li></ul><p><strong>数据类别</strong></p><ul><li>vector 同类元素的集合</li><li>matrix 矩阵</li><li>data.frame 类似excel中的二维表</li><li>list 列表</li></ul><p>我们可以通过as.类型名来改变变量类型</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a&lt;-as.matrix(a)
print(a)
class(a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>     [,1]
[1,]   10
</code></pre><p>&#39;matrix&#39;</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a&lt;-as.logical(a)
print(a)
class(a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1] TRUE
</code></pre><p>&#39;logical&#39;</p><h3 id="_1-2-软件包的安装" tabindex="-1"><a class="header-anchor" href="#_1-2-软件包的安装" aria-hidden="true">#</a> 1.2 软件包的安装</h3><p>首次安装时，R附带有一组内置软件包，可以直接从R控制台调用它们。但是，由于R是一种开放源代码语言，因此任何人都可以通过编写软件包来为其功能做出贡献。多年来，这些贡献已导致超过5K软件包的清单不断增加。这是从R控制台中安装软件包的方法。注意不要在jupyter notebook中使用该代码，因为要选择cran镜像，很容易崩溃的。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>#install.packages(&quot;car&quot;)  # install car package 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在已经安装了该软件包，您需要对其进行初始化，然后才能调用已安装的软件包随附的函数和数据集。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(car)  # 初始化包
require(car)  # 另一种初始化方法
#library()  # 查看已经安装好的包
#library(help=car)  # 查看car包的帮助信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;car&#39; was built under R version 3.6.1&quot;
Loading required package: carData

Warning message:
&quot;package &#39;carData&#39; was built under R version 3.6.1&quot;
</code></pre><p><strong>对于R语言可以直接输入代码查询包和函数的介绍信息</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>#help(merge)  # 查看merge的帮助信息
#?merge  # 从安装包中查找merge信息,和help类似
#??merge  # 模糊搜索
example(merge)  # 展示示例代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>merge&gt; authors &lt;- data.frame(
merge+     ## I(*) : use character columns of names to get sensible sort order
merge+     surname = I(c(&quot;Tukey&quot;, &quot;Venables&quot;, &quot;Tierney&quot;, &quot;Ripley&quot;, &quot;McNeil&quot;)),
merge+     nationality = c(&quot;US&quot;, &quot;Australia&quot;, &quot;US&quot;, &quot;UK&quot;, &quot;Australia&quot;),
merge+     deceased = c(&quot;yes&quot;, rep(&quot;no&quot;, 4)))

merge&gt; authorN &lt;- within(authors, { name &lt;- surname; rm(surname) })

merge&gt; books &lt;- data.frame(
merge+     name = I(c(&quot;Tukey&quot;, &quot;Venables&quot;, &quot;Tierney&quot;,
merge+              &quot;Ripley&quot;, &quot;Ripley&quot;, &quot;McNeil&quot;, &quot;R Core&quot;)),
merge+     title = c(&quot;Exploratory Data Analysis&quot;,
merge+               &quot;Modern Applied Statistics ...&quot;,
merge+               &quot;LISP-STAT&quot;,
merge+               &quot;Spatial Statistics&quot;, &quot;Stochastic Simulation&quot;,
merge+               &quot;Interactive Data Analysis&quot;,
merge+               &quot;An Introduction to R&quot;),
merge+     other.author = c(NA, &quot;Ripley&quot;, NA, NA, NA, NA,
merge+                      &quot;Venables &amp; Smith&quot;))

merge&gt; (m0 &lt;- merge(authorN, books))
      name nationality deceased                         title other.author
1   McNeil   Australia       no     Interactive Data Analysis         &lt;NA&gt;
2   Ripley          UK       no            Spatial Statistics         &lt;NA&gt;
3   Ripley          UK       no         Stochastic Simulation         &lt;NA&gt;
4  Tierney          US       no                     LISP-STAT         &lt;NA&gt;
5    Tukey          US      yes     Exploratory Data Analysis         &lt;NA&gt;
6 Venables   Australia       no Modern Applied Statistics ...       Ripley

merge&gt; (m1 &lt;- merge(authors, books, by.x = &quot;surname&quot;, by.y = &quot;name&quot;))
   surname nationality deceased                         title other.author
1   McNeil   Australia       no     Interactive Data Analysis         &lt;NA&gt;
2   Ripley          UK       no            Spatial Statistics         &lt;NA&gt;
3   Ripley          UK       no         Stochastic Simulation         &lt;NA&gt;
4  Tierney          US       no                     LISP-STAT         &lt;NA&gt;
5    Tukey          US      yes     Exploratory Data Analysis         &lt;NA&gt;
6 Venables   Australia       no Modern Applied Statistics ...       Ripley

merge&gt;  m2 &lt;- merge(books, authors, by.x = &quot;name&quot;, by.y = &quot;surname&quot;)

merge&gt; stopifnot(exprs = {
merge+    identical(m0, m2[, names(m0)])
merge+    as.character(m1[, 1]) == as.character(m2[, 1])
merge+    all.equal(m1[, -1], m2[, -1][ names(m1)[-1] ])
merge+    identical(dim(merge(m1, m2, by = NULL)),
merge+              c(nrow(m1)*nrow(m2), ncol(m1)+ncol(m2)))
merge+ })

merge&gt; ## &quot;R core&quot; is missing from authors and appears only here :
merge&gt; merge(authors, books, by.x = &quot;surname&quot;, by.y = &quot;name&quot;, all = TRUE)
   surname nationality deceased                         title     other.author
1   McNeil   Australia       no     Interactive Data Analysis             &lt;NA&gt;
2   R Core        &lt;NA&gt;     &lt;NA&gt;          An Introduction to R Venables &amp; Smith
3   Ripley          UK       no            Spatial Statistics             &lt;NA&gt;
4   Ripley          UK       no         Stochastic Simulation             &lt;NA&gt;
5  Tierney          US       no                     LISP-STAT             &lt;NA&gt;
6    Tukey          US      yes     Exploratory Data Analysis             &lt;NA&gt;
7 Venables   Australia       no Modern Applied Statistics ...           Ripley

merge&gt; ## example of using &#39;incomparables&#39;
merge&gt; x &lt;- data.frame(k1 = c(NA,NA,3,4,5), k2 = c(1,NA,NA,4,5), data = 1:5)

merge&gt; y &lt;- data.frame(k1 = c(NA,2,NA,4,5), k2 = c(NA,NA,3,4,5), data = 1:5)

merge&gt; merge(x, y, by = c(&quot;k1&quot;,&quot;k2&quot;)) # NA&#39;s match
  k1 k2 data.x data.y
1  4  4      4      4
2  5  5      5      5
3 NA NA      2      1

merge&gt; merge(x, y, by = &quot;k1&quot;) # NA&#39;s match, so 6 rows
  k1 k2.x data.x k2.y data.y
1  4    4      4    4      4
2  5    5      5    5      5
3 NA    1      1   NA      1
4 NA    1      1    3      3
5 NA   NA      2   NA      1
6 NA   NA      2    3      3

merge&gt; merge(x, y, by = &quot;k2&quot;, incomparables = NA) # 2 rows
  k2 k1.x data.x k1.y data.y
1  4    4      4    4      4
2  5    5      5    5      5
</code></pre><p><strong>设置工作目录</strong></p><p>工作目录是R可以直接访问以读取文件的参考目录。您可以在不使用完整文件路径的情况下直接将文件读取和写入文件到工作目录。目录名称应使用正斜杠/或反斜杠分隔\\，对于Windows也应如此。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># getwd()  # 获得当前工作目录
# setwd(dirname)  # 设置工作目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如何导入和导出数据</strong></p><p>将数据引入R的最常见，最方便的方法是通过.csv文件。有一些软件包可以从excel文件（.xlsx）和数据库中导入数据，但此处不介绍。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>a &lt;- 1:3
b &lt;- (1:3)/5
c &lt;- c(&quot;row1&quot;, &quot;row2&quot;, &quot;row3&quot;)
# 建立dataframe
data &lt;- data.frame(a, b, c)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 3 × 3</caption><thead><tr><th scope="col">a</th><th scope="col">b</th><th scope="col">c</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>1</td><td>0.2</td><td>row1</td></tr><tr><td>2</td><td>0.4</td><td>row2</td></tr><tr><td>3</td><td>0.6</td><td>row3</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 将data保存为csv文件
write.csv(data, file=&quot;d:/data.csv&quot;, row.names = FALSE)
# 将data保存为txt文件,sep表示用sep分割列
write.table(data, file =&quot;d:/data.txt&quot;, sep =&quot;,&quot;, row.names =FALSE)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 读取csv文件
data &lt;- read.csv(&quot;d:/data.csv&quot;, header=FALSE)
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 3</caption><thead><tr><th scope="col">V1</th><th scope="col">V2</th><th scope="col">V3</th></tr><tr><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>a</td><td>b </td><td>c </td></tr><tr><td>1</td><td>0.2</td><td>row1</td></tr><tr><td>2</td><td>0.4</td><td>row2</td></tr><tr><td>3</td><td>0.6</td><td>row3</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 读取txt文件
data &lt;- read.table(file =&quot;d:/data.txt&quot;, header = TRUE, sep=&quot;,&quot;, colClasses=c(&quot;integer&quot;,&quot;numeric&quot;,&quot;character&quot;))
data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 3 × 3</caption><thead><tr><th scope="col">a</th><th scope="col">b</th><th scope="col">c</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;chr&gt;</th></tr></thead><tbody><tr><td>1</td><td>0.2</td><td>row1</td></tr><tr><td>2</td><td>0.4</td><td>row2</td></tr><tr><td>3</td><td>0.6</td><td>row3</td></tr></tbody></table><p>R将直观地找出应该为dataframe中的列分配哪种数据类型。如果要手动分配，则可以通过在read.csv或read.table中使用colClasses参数进行设置，实际上，建议这样做，因为它可以提高导入过程的效率。</p><h2 id="_2-复杂变量" tabindex="-1"><a class="header-anchor" href="#_2-复杂变量" aria-hidden="true">#</a> 2 复杂变量</h2><h3 id="_2-1-向量基础" tabindex="-1"><a class="header-anchor" href="#_2-1-向量基础" aria-hidden="true">#</a> 2.1 向量基础</h3><p><strong>如何创建一个向量</strong></p><p>可以使用Combine函数即c()创建向量。该向量中可以包含的所有类型元素。此外，向量只能保存一种类型的数据，例如字符，数字，逻辑。如果尝试在向量内创建数据类型的混合，例如字符和数字，所有数字都会自动转换为字符。因为数字都可以转换为字符，但是字符不都能转换为数字，如&#39;a&#39;。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1 &lt;- c(10, 20, 15, 40)  # 数字向量
vec1
vec2 &lt;- c(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, NA)  # 字符向量
vec2
vec3 &lt;- c(TRUE, FALSE, TRUE, TRUE)  # 逻辑向量
vec3
vec4 &lt;- gl(4, 1, 4, label = c(&quot;l1&quot;, &quot;l2&quot;, &quot;l3&quot;, &quot;l4&quot;))  # 因子向量
vec4
vec5 &lt;- c(4111, &quot;2&quot;, 4)  # 混合变量
vec5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><ol class="list-inline"><li>&#39;a&#39;</li><li>&#39;b&#39;</li><li>&#39;c&#39;</li><li>NA</li></ol><ol class="list-inline"><li>TRUE</li><li>FALSE</li><li>TRUE</li><li>TRUE</li></ol><ol class="list-inline"><li>l1</li><li>l2</li><li>l3</li><li>l4</li></ol><details><summary style="display:list-item;cursor:pointer;"><strong>Levels</strong>: </summary><ol class="list-inline"><li>&#39;l1&#39;</li><li>&#39;l2&#39;</li><li>&#39;l3&#39;</li><li>&#39;l4&#39;</li></ol></details><ol class="list-inline"><li>&#39;4111&#39;</li><li>&#39;2&#39;</li><li>&#39;4&#39;</li></ol><p><strong>如何引用向量的元素？</strong></p><p>向量的元素可以使用其索引进行访问。向量的第一个元素的索引为1，最后一个元素的索引值为length(vectorName)。这一点和其他语言不一样，R语言索引从1开始。索引变量名[i,j]表示索引从i到j的值。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1
length(vec1)  # 4
print(vec1[1])  # 10
print(vec1[1:3])  # 10, 20, 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><p>4</p><pre><code>[1] 10
[1] 10 20 15
</code></pre><p>此外有时候我们需要初始化一个定长的向量，做法如下。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 生成长度为10的向量，用0填充
numericVector &lt;- numeric(10)
numericVector
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li><li>0</li></ol><h3 id="_2-2-操纵向量" tabindex="-1"><a class="header-anchor" href="#_2-2-操纵向量" aria-hidden="true">#</a> 2.2 操纵向量</h3><p><strong>子集</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1
logic1 &lt;- vec1 &lt; 16  # 创建一个逻辑向量，小于16为true，反之false
logic1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><ol class="list-inline"><li>TRUE</li><li>FALSE</li><li>TRUE</li><li>FALSE</li></ol><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1[logic1]  # 读取位置为true的元素
vec1[1:2]  # 读取第一个和第二个元素
vec1[c(1,3)]  # 读取第一个和第三个元素
vec1[-1]  # 返回所有元素，除了第一个。-1表示排除第一个元素，和其他语言不一样。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>15</li></ol><ol class="list-inline"><li>10</li><li>20</li></ol><ol class="list-inline"><li>10</li><li>15</li></ol><ol class="list-inline"><li>20</li><li>15</li><li>40</li></ol><p><strong>排序</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>sort(vec1)  # 从小到大排序
sort(vec1, decreasing = TRUE)  # 从大到小排序 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>15</li><li>20</li><li>40</li></ol><ol class="list-inline"><li>40</li><li>20</li><li>15</li><li>10</li></ol><p>排序也可以使用order()函数实现，该函数以升序返回元素的索引。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1[order(vec1)]  # 从小到大
vec1[rev(order(vec1))]  # 从大到小
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>15</li><li>20</li><li>40</li></ol><ol class="list-inline"><li>40</li><li>20</li><li>15</li><li>10</li></ol><p><strong>创建向量序列和重复值</strong></p><p>seq()和rep()函数用于创建自定义向量序列。rep()函数也可用于生成重复字符。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>seq(1, 10, by = 2)  # 创建1到10的向量序列，步长为2
seq(1, 10, length=5)  # 创建1到10的向量序列，等间隔获得5个值
rep(1, 5)  # 重复1，次数5次
rep(1:3, 2)  # 重复1到3，次数两次
rep(1:3, each=2)  # 重复1到3，每个数字重复两次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>1</li><li>3</li><li>5</li><li>7</li><li>9</li></ol><ol class="list-inline"><li>1</li><li>3.25</li><li>5.5</li><li>7.75</li><li>10</li></ol><ol class="list-inline"><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li></ol><ol class="list-inline"><li>1</li><li>2</li><li>3</li><li>1</li><li>2</li><li>3</li></ol><ol class="list-inline"><li>1</li><li>1</li><li>2</li><li>2</li><li>3</li><li>3</li></ol><p><strong>如何删除缺失值</strong></p><p>可以使用is.na()函数来处理缺失值，该函数会在缺失值（NA）的位置返回逻辑值为TRUE的逻辑向量</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec2 &lt;- c(&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, NA)  # character vector
is.na(vec2)  # missing TRUE
!is.na(vec2)  # missing FALSE
vec2[!is.na(vec2)]  # 返回非NA的元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>FALSE</li><li>FALSE</li><li>FALSE</li><li>TRUE</li></ol><ol class="list-inline"><li>TRUE</li><li>TRUE</li><li>TRUE</li><li>FALSE</li></ol><ol class="list-inline"><li>&#39;a&#39;</li><li>&#39;b&#39;</li><li>&#39;c&#39;</li></ol><p><strong>采样</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>set.seed(42)  # 设置随机数种子，以
vec1
sample(vec1)  # 随机从vec1中抽取所有数
sample(vec1, 3)  # 随机不放回从vec1中抽取3个数
sample(vec1, 5, replace=T)  # 随机放回从vec1中抽取5个数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><ol class="list-inline"><li>10</li><li>40</li><li>15</li><li>20</li></ol><ol class="list-inline"><li>20</li><li>40</li><li>15</li></ol><ol class="list-inline"><li>10</li><li>40</li><li>15</li><li>40</li><li>15</li></ol><h3 id="_2-3-数据框dataframe" tabindex="-1"><a class="header-anchor" href="#_2-3-数据框dataframe" aria-hidden="true">#</a> 2.3 数据框dataframe</h3><p><strong>创建数据框并访问行和列</strong></p><p>数据框是执行各种分析的方便且流行的数据对象。诸如read.csv（）之类的导入语句会将数据作为数据帧导入R中，因此保持这种方式很方便。现在，使用我们之前创建的向量创建一个数据框。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>vec1
vec2
vec3
vec4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><ol class="list-inline"><li>&#39;a&#39;</li><li>&#39;b&#39;</li><li>&#39;c&#39;</li><li>NA</li></ol><ol class="list-inline"><li>TRUE</li><li>FALSE</li><li>TRUE</li><li>TRUE</li></ol><ol class="list-inline"><li>l1</li><li>l2</li><li>l3</li><li>l4</li></ol><details><summary style="display:list-item;cursor:pointer;"><strong>Levels</strong>: </summary><ol class="list-inline"><li>&#39;l1&#39;</li><li>&#39;l2&#39;</li><li>&#39;l3&#39;</li><li>&#39;l4&#39;</li></ol></details><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 每一个向量组成一列
myDf1 &lt;- data.frame(vec1, vec2)  
myDf1
myDf2 &lt;- data.frame(vec1, vec3, vec4)
myDf2
myDf3 &lt;- data.frame(vec1, vec2, vec3)
myDf3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><table><caption>A data.frame: 4 × 3</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec3</th><th scope="col">vec4</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td> TRUE</td><td>l1</td></tr><tr><td>20</td><td>FALSE</td><td>l2</td></tr><tr><td>15</td><td> TRUE</td><td>l3</td></tr><tr><td>40</td><td> TRUE</td><td>l4</td></tr></tbody></table><table><caption>A data.frame: 4 × 3</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th><th scope="col">vec3</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;lgl&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td><td> TRUE</td></tr><tr><td>20</td><td>b </td><td>FALSE</td></tr><tr><td>15</td><td>c </td><td> TRUE</td></tr><tr><td>40</td><td>NA</td><td> TRUE</td></tr></tbody></table><p><strong>内置数据集和基本操作</strong></p><p>R带有一组内置数据。为了进一步说明，我们将使用airquality数据集</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>library(datasets) # 初始化
#library(help=datasets) # 展示数据集信息
# 展示数据集头部六行
head(airquality)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 6</caption><thead><tr><th scope="col">Ozone</th><th scope="col">Solar.R</th><th scope="col">Wind</th><th scope="col">Temp</th><th scope="col">Month</th><th scope="col">Day</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>41</td><td>190</td><td> 7.4</td><td>67</td><td>5</td><td>1</td></tr><tr><td>36</td><td>118</td><td> 8.0</td><td>72</td><td>5</td><td>2</td></tr><tr><td>12</td><td>149</td><td>12.6</td><td>74</td><td>5</td><td>3</td></tr><tr><td>18</td><td>313</td><td>11.5</td><td>62</td><td>5</td><td>4</td></tr><tr><td>NA</td><td> NA</td><td>14.3</td><td>56</td><td>5</td><td>5</td></tr><tr><td>28</td><td> NA</td><td>14.9</td><td>66</td><td>5</td><td>6</td></tr></tbody></table><p>接来介绍数据集data.frame基础操作</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>class(airquality)  # dataframe类型
sapply(airquality, class)  # 获得dataframe每一列的类型
str(airquality)  # dataframe的结构
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;data.frame&#39;</p><dl class="dl-horizontal"><dt>Ozone</dt><dd>&#39;integer&#39;</dd><dt>Solar.R</dt><dd>&#39;integer&#39;</dd><dt>Wind</dt><dd>&#39;numeric&#39;</dd><dt>Temp</dt><dd>&#39;integer&#39;</dd><dt>Month</dt><dd>&#39;integer&#39;</dd><dt>Day</dt><dd>&#39;integer&#39;</dd></dl><pre><code>&#39;data.frame&#39;:	153 obs. of  6 variables:
 $ Ozone  : int  41 36 12 18 NA 28 23 19 8 NA ...
 $ Solar.R: int  190 118 149 313 NA NA 299 99 19 194 ...
 $ Wind   : num  7.4 8 12.6 11.5 14.3 14.9 8.6 13.8 20.1 8.6 ...
 $ Temp   : int  67 72 74 62 56 66 65 59 61 69 ...
 $ Month  : int  5 5 5 5 5 5 5 5 5 5 ...
 $ Day    : int  1 2 3 4 5 6 7 8 9 10 ...
</code></pre><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>summary(airquality)  # 数据集各列总结
#fix(airquality)  # 类似excel的方式展示数据集
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>     Ozone           Solar.R           Wind             Temp      
 Min.   :  1.00   Min.   :  7.0   Min.   : 1.700   Min.   :56.00  
 1st Qu.: 18.00   1st Qu.:115.8   1st Qu.: 7.400   1st Qu.:72.00  
 Median : 31.50   Median :205.0   Median : 9.700   Median :79.00  
 Mean   : 42.13   Mean   :185.9   Mean   : 9.958   Mean   :77.88  
 3rd Qu.: 63.25   3rd Qu.:258.8   3rd Qu.:11.500   3rd Qu.:85.00  
 Max.   :168.00   Max.   :334.0   Max.   :20.700   Max.   :97.00  
 NA&#39;s   :37       NA&#39;s   :7                                       
     Month            Day      
 Min.   :5.000   Min.   : 1.0  
 1st Qu.:6.000   1st Qu.: 8.0  
 Median :7.000   Median :16.0  
 Mean   :6.993   Mean   :15.8  
 3rd Qu.:8.000   3rd Qu.:23.0  
 Max.   :9.000   Max.   :31.0  
</code></pre><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>rownames(airquality)  # dataframe行名
colnames(airquality)  # dataframe列名
nrow(airquality) # 行数
ncol(airquality) # 列数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>&#39;1&#39;</li><li>&#39;2&#39;</li><li>&#39;3&#39;</li><li>&#39;4&#39;</li><li>&#39;5&#39;</li><li>&#39;6&#39;</li><li>&#39;7&#39;</li><li>&#39;8&#39;</li><li>&#39;9&#39;</li><li>&#39;10&#39;</li><li>&#39;11&#39;</li><li>&#39;12&#39;</li><li>&#39;13&#39;</li><li>&#39;14&#39;</li><li>&#39;15&#39;</li><li>&#39;16&#39;</li><li>&#39;17&#39;</li><li>&#39;18&#39;</li><li>&#39;19&#39;</li><li>&#39;20&#39;</li><li>&#39;21&#39;</li><li>&#39;22&#39;</li><li>&#39;23&#39;</li><li>&#39;24&#39;</li><li>&#39;25&#39;</li><li>&#39;26&#39;</li><li>&#39;27&#39;</li><li>&#39;28&#39;</li><li>&#39;29&#39;</li><li>&#39;30&#39;</li><li>&#39;31&#39;</li><li>&#39;32&#39;</li><li>&#39;33&#39;</li><li>&#39;34&#39;</li><li>&#39;35&#39;</li><li>&#39;36&#39;</li><li>&#39;37&#39;</li><li>&#39;38&#39;</li><li>&#39;39&#39;</li><li>&#39;40&#39;</li><li>&#39;41&#39;</li><li>&#39;42&#39;</li><li>&#39;43&#39;</li><li>&#39;44&#39;</li><li>&#39;45&#39;</li><li>&#39;46&#39;</li><li>&#39;47&#39;</li><li>&#39;48&#39;</li><li>&#39;49&#39;</li><li>&#39;50&#39;</li><li>&#39;51&#39;</li><li>&#39;52&#39;</li><li>&#39;53&#39;</li><li>&#39;54&#39;</li><li>&#39;55&#39;</li><li>&#39;56&#39;</li><li>&#39;57&#39;</li><li>&#39;58&#39;</li><li>&#39;59&#39;</li><li>&#39;60&#39;</li><li>&#39;61&#39;</li><li>&#39;62&#39;</li><li>&#39;63&#39;</li><li>&#39;64&#39;</li><li>&#39;65&#39;</li><li>&#39;66&#39;</li><li>&#39;67&#39;</li><li>&#39;68&#39;</li><li>&#39;69&#39;</li><li>&#39;70&#39;</li><li>&#39;71&#39;</li><li>&#39;72&#39;</li><li>&#39;73&#39;</li><li>&#39;74&#39;</li><li>&#39;75&#39;</li><li>&#39;76&#39;</li><li>&#39;77&#39;</li><li>&#39;78&#39;</li><li>&#39;79&#39;</li><li>&#39;80&#39;</li><li>&#39;81&#39;</li><li>&#39;82&#39;</li><li>&#39;83&#39;</li><li>&#39;84&#39;</li><li>&#39;85&#39;</li><li>&#39;86&#39;</li><li>&#39;87&#39;</li><li>&#39;88&#39;</li><li>&#39;89&#39;</li><li>&#39;90&#39;</li><li>&#39;91&#39;</li><li>&#39;92&#39;</li><li>&#39;93&#39;</li><li>&#39;94&#39;</li><li>&#39;95&#39;</li><li>&#39;96&#39;</li><li>&#39;97&#39;</li><li>&#39;98&#39;</li><li>&#39;99&#39;</li><li>&#39;100&#39;</li><li>&#39;101&#39;</li><li>&#39;102&#39;</li><li>&#39;103&#39;</li><li>&#39;104&#39;</li><li>&#39;105&#39;</li><li>&#39;106&#39;</li><li>&#39;107&#39;</li><li>&#39;108&#39;</li><li>&#39;109&#39;</li><li>&#39;110&#39;</li><li>&#39;111&#39;</li><li>&#39;112&#39;</li><li>&#39;113&#39;</li><li>&#39;114&#39;</li><li>&#39;115&#39;</li><li>&#39;116&#39;</li><li>&#39;117&#39;</li><li>&#39;118&#39;</li><li>&#39;119&#39;</li><li>&#39;120&#39;</li><li>&#39;121&#39;</li><li>&#39;122&#39;</li><li>&#39;123&#39;</li><li>&#39;124&#39;</li><li>&#39;125&#39;</li><li>&#39;126&#39;</li><li>&#39;127&#39;</li><li>&#39;128&#39;</li><li>&#39;129&#39;</li><li>&#39;130&#39;</li><li>&#39;131&#39;</li><li>&#39;132&#39;</li><li>&#39;133&#39;</li><li>&#39;134&#39;</li><li>&#39;135&#39;</li><li>&#39;136&#39;</li><li>&#39;137&#39;</li><li>&#39;138&#39;</li><li>&#39;139&#39;</li><li>&#39;140&#39;</li><li>&#39;141&#39;</li><li>&#39;142&#39;</li><li>&#39;143&#39;</li><li>&#39;144&#39;</li><li>&#39;145&#39;</li><li>&#39;146&#39;</li><li>&#39;147&#39;</li><li>&#39;148&#39;</li><li>&#39;149&#39;</li><li>&#39;150&#39;</li><li>&#39;151&#39;</li><li>&#39;152&#39;</li><li>&#39;153&#39;</li></ol><ol class="list-inline"><li>&#39;Ozone&#39;</li><li>&#39;Solar.R&#39;</li><li>&#39;Wind&#39;</li><li>&#39;Temp&#39;</li><li>&#39;Month&#39;</li><li>&#39;Day&#39;</li></ol><p>153</p><p>6</p><p><strong>用cbind和rbind增加数据</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1
myDf2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><table><caption>A data.frame: 4 × 3</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec3</th><th scope="col">vec4</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td> TRUE</td><td>l1</td></tr><tr><td>20</td><td>FALSE</td><td>l2</td></tr><tr><td>15</td><td> TRUE</td><td>l3</td></tr><tr><td>40</td><td> TRUE</td><td>l4</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>cbind(myDf1, myDf2)  # 按列合并
rbind(myDf1, myDf1)  # 按行合并
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 5</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th><th scope="col">vec1</th><th scope="col">vec3</th><th scope="col">vec4</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td><td>10</td><td> TRUE</td><td>l1</td></tr><tr><td>20</td><td>b </td><td>20</td><td>FALSE</td><td>l2</td></tr><tr><td>15</td><td>c </td><td>15</td><td> TRUE</td><td>l3</td></tr><tr><td>40</td><td>NA</td><td>40</td><td> TRUE</td><td>l4</td></tr></tbody></table><table><caption>A data.frame: 8 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><p><strong>dataframe索引</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1$vec1  # 提取列vec1
myDf1[, 2]  # 提取数据df[row.num, col.num]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol><ol class="list-inline"><li>a</li><li>b</li><li>c</li><li>&lt;NA&gt;</li></ol><details><summary style="display:list-item;cursor:pointer;"><strong>Levels</strong>: </summary><ol class="list-inline"><li>&#39;a&#39;</li><li>&#39;b&#39;</li><li>&#39;c&#39;</li></ol></details><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1[, c(1,2)]  # 提取第一列和第二列
myDf1[c(1:5), c(1)]  # 提取第一列的1到5行，
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li><li>&lt;NA&gt;</li></ol><p><strong>subset和which函数</strong></p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>head(airquality)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 6</caption><thead><tr><th scope="col">Ozone</th><th scope="col">Solar.R</th><th scope="col">Wind</th><th scope="col">Temp</th><th scope="col">Month</th><th scope="col">Day</th></tr><tr><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><td>41</td><td>190</td><td> 7.4</td><td>67</td><td>5</td><td>1</td></tr><tr><td>36</td><td>118</td><td> 8.0</td><td>72</td><td>5</td><td>2</td></tr><tr><td>12</td><td>149</td><td>12.6</td><td>74</td><td>5</td><td>3</td></tr><tr><td>18</td><td>313</td><td>11.5</td><td>62</td><td>5</td><td>4</td></tr><tr><td>NA</td><td> NA</td><td>14.3</td><td>56</td><td>5</td><td>5</td></tr><tr><td>28</td><td> NA</td><td>14.9</td><td>66</td><td>5</td><td>6</td></tr></tbody></table><p>下面代码选择day==1的列，但结果不显示Temp列</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>subset(airquality, Day == 1, select = -Temp) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 5 × 5</caption><thead><tr><th></th><th scope="col">Ozone</th><th scope="col">Solar.R</th><th scope="col">Wind</th><th scope="col">Month</th><th scope="col">Day</th></tr><tr><th></th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td> 41</td><td>190</td><td>7.4</td><td>5</td><td>1</td></tr><tr><th scope="row">32</th><td> NA</td><td>286</td><td>8.6</td><td>6</td><td>1</td></tr><tr><th scope="row">62</th><td>135</td><td>269</td><td>4.1</td><td>7</td><td>1</td></tr><tr><th scope="row">93</th><td> 39</td><td> 83</td><td>6.9</td><td>8</td><td>1</td></tr><tr><th scope="row">124</th><td> 96</td><td>167</td><td>6.9</td><td>9</td><td>1</td></tr></tbody></table><p>which函数选择day==1的列的索引</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>which(airquality$Day==1)
airquality[which(airquality$Day==1), -c(4)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>1</li><li>32</li><li>62</li><li>93</li><li>124</li></ol><table><caption>A data.frame: 5 × 5</caption><thead><tr><th></th><th scope="col">Ozone</th><th scope="col">Solar.R</th><th scope="col">Wind</th><th scope="col">Month</th><th scope="col">Day</th></tr><tr><th></th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td> 41</td><td>190</td><td>7.4</td><td>5</td><td>1</td></tr><tr><th scope="row">32</th><td> NA</td><td>286</td><td>8.6</td><td>6</td><td>1</td></tr><tr><th scope="row">62</th><td>135</td><td>269</td><td>4.1</td><td>7</td><td>1</td></tr><tr><th scope="row">93</th><td> 39</td><td> 83</td><td>6.9</td><td>8</td><td>1</td></tr><tr><th scope="row">124</th><td> 96</td><td>167</td><td>6.9</td><td>9</td><td>1</td></tr></tbody></table><p><strong>采样</strong></p><p>随机从dataframe里分割样本，比如分割训练集和测试集</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>set.seed(100)
trainIndex &lt;- sample(c(1:nrow(airquality)), size=nrow(airquality)*0.7, replace=F)  # 获得验证集数据，比例0.7
trainIndex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>102</li><li>112</li><li>151</li><li>4</li><li>55</li><li>70</li><li>98</li><li>135</li><li>7</li><li>43</li><li>140</li><li>51</li><li>25</li><li>2</li><li>68</li><li>139</li><li>48</li><li>32</li><li>85</li><li>91</li><li>121</li><li>16</li><li>116</li><li>93</li><li>45</li><li>30</li><li>128</li><li>130</li><li>87</li><li>95</li><li>97</li><li>124</li><li>29</li><li>92</li><li>31</li><li>54</li><li>41</li><li>105</li><li>117</li><li>24</li><li>144</li><li>145</li><li>63</li><li>65</li><li>9</li><li>153</li><li>20</li><li>14</li><li>78</li><li>88</li><li>3</li><li>36</li><li>27</li><li>46</li><li>59</li><li>100</li><li>69</li><li>47</li><li>149</li><li>96</li><li>138</li><li>12</li><li>142</li><li>132</li><li>56</li><li>22</li><li>82</li><li>53</li><li>103</li><li>5</li><li>44</li><li>28</li><li>52</li><li>141</li><li>42</li><li>15</li><li>57</li><li>79</li><li>37</li><li>26</li><li>114</li><li>120</li><li>109</li><li>122</li><li>111</li><li>35</li><li>58</li><li>74</li><li>137</li><li>123</li><li>90</li><li>118</li><li>75</li><li>127</li><li>101</li><li>18</li><li>8</li><li>99</li><li>77</li><li>143</li><li>19</li><li>119</li><li>23</li><li>72</li><li>66</li><li>84</li><li>106</li></ol><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 训练数据
nrow(airquality[trainIndex, ])
# 测试数据
nrow(airquality[-trainIndex, ])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>107</p><p>46</p><p><strong>合并数据</strong></p><p>dataframe可以由公共列变量合并。在执行合并之前，不必对数据帧进行排序。如果“by”列具有不同的名称，则可以使用by.x和by.y指定它们。内部/外部联接、左联接和右联接可以使用merge()的all、all.x、all.y参数完成。在R控制台中查看更多关于example(merge)的信息。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1
myDf2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><table><caption>A data.frame: 4 × 3</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec3</th><th scope="col">vec4</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td> TRUE</td><td>l1</td></tr><tr><td>20</td><td>FALSE</td><td>l2</td></tr><tr><td>15</td><td> TRUE</td><td>l3</td></tr><tr><td>40</td><td> TRUE</td><td>l4</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>merge(myDf1, myDf2, by=&quot;vec1&quot;)  # 以vec1合并
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 4</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th><th scope="col">vec3</th><th scope="col">vec4</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;lgl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td><td> TRUE</td><td>l1</td></tr><tr><td>15</td><td>c </td><td> TRUE</td><td>l3</td></tr><tr><td>20</td><td>b </td><td>FALSE</td><td>l2</td></tr><tr><td>40</td><td>NA</td><td> TRUE</td><td>l4</td></tr></tbody></table><h2 id="_3-高级函数" tabindex="-1"><a class="header-anchor" href="#_3-高级函数" aria-hidden="true">#</a> 3 高级函数</h2><h3 id="_3-1-paste函数" tabindex="-1"><a class="header-anchor" href="#_3-1-paste函数" aria-hidden="true">#</a> 3.1 paste函数</h3><p>paste()是一种拼接字符串并使用分隔符进行自定义的方法。有了清晰的理解，就可以方便地创建可以动态修改的长而复杂的字符串。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>paste(&quot;a&quot;, &quot;b&quot;)  # 拼接字符串&#39;a&#39;和&#39;b&#39;包含空格 &quot;a b&quot;
paste0(&quot;a&quot;, &quot;b&quot;)  # 无空格拼接字符串&#39;a&#39;和&#39;b&#39;, &quot;ab&quot;
paste(&quot;a&quot;, &quot;b&quot;, sep=&quot;&quot;)  # sep设置拼接符是什么，类似paste0
paste(c(1:4), c(5:8), sep=&quot;&quot;)  # &quot;15&quot; &quot;26&quot; &quot;37&quot; &quot;48&quot;
paste(c(1:4), c(5:8), sep=&quot;&quot;, collapse=&quot;&quot;)  # &quot;15263748&quot;
paste0(c(&quot;var&quot;), c(1:5))  # &quot;var1&quot; &quot;var2&quot; &quot;var3&quot; &quot;var4&quot; &quot;var5&quot;
paste0(c(&quot;var&quot;, &quot;pred&quot;), c(1:3))  # &quot;var1&quot; &quot;pred2&quot; &quot;var3&quot;
paste0(c(&quot;var&quot;, &quot;pred&quot;), rep(1:3, each=2))  # &quot;var1&quot; &quot;pred1&quot; &quot;var2&quot; &quot;pred2&quot; &quot;var3&quot; &quot;pred3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;a b&#39;</p><p>&#39;ab&#39;</p><p>&#39;ab&#39;</p><ol class="list-inline"><li>&#39;15&#39;</li><li>&#39;26&#39;</li><li>&#39;37&#39;</li><li>&#39;48&#39;</li></ol><p>&#39;15263748&#39;</p><ol class="list-inline"><li>&#39;var1&#39;</li><li>&#39;var2&#39;</li><li>&#39;var3&#39;</li><li>&#39;var4&#39;</li><li>&#39;var5&#39;</li></ol><ol class="list-inline"><li>&#39;var1&#39;</li><li>&#39;pred2&#39;</li><li>&#39;var3&#39;</li></ol><ol class="list-inline"><li>&#39;var1&#39;</li><li>&#39;pred1&#39;</li><li>&#39;var2&#39;</li><li>&#39;pred2&#39;</li><li>&#39;var3&#39;</li><li>&#39;pred3&#39;</li></ol><h3 id="_3-2-处理日期" tabindex="-1"><a class="header-anchor" href="#_3-2-处理日期" aria-hidden="true">#</a> 3.2 处理日期</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>dateString &lt;- &quot;07/02/2021&quot;
myDate &lt;- as.Date(dateString, format=&quot;%d/%m/%Y&quot;) # 设置字符串
class(myDate)  # 类别 &quot;date&quot;
myDate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&#39;Date&#39;</p><p><time datetime="2021-02-07">2021-02-07</time></p><h3 id="_3-3-制作列连表" tabindex="-1"><a class="header-anchor" href="#_3-3-制作列连表" aria-hidden="true">#</a> 3.3 制作列连表</h3><p>通过R语言的table函数可以制作列连表。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myDf1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><caption>A data.frame: 4 × 2</caption><thead><tr><th scope="col">vec1</th><th scope="col">vec2</th></tr><tr><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;fct&gt;</th></tr></thead><tbody><tr><td>10</td><td>a </td></tr><tr><td>20</td><td>b </td></tr><tr><td>15</td><td>c </td></tr><tr><td>40</td><td>NA</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>table(myDf1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>    vec2
vec1 a b c
  10 1 0 0
  15 0 0 1
  20 0 1 0
  40 0 0 0
</code></pre><p>同样，对于dataframe，要在行中显示的变量将作为table()的第一个参数，而列变量将作为第二个参数。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>table(airquality$Month[c(1:60)], airquality$Temp[c(1:60)])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>    56 57 58 59 61 62 64 65 66 67 68 69 72 73 74 75 76 77 78 79 80 81 82 84 85
  5  1  3  2  2  3  2  1  1  3  2  2  2  1  1  2  0  1  0  0  1  0  1  0  0  0
  6  0  0  0  0  0  0  0  1  0  1  0  0  1  2  1  1  4  3  2  2  2  0  2  1  1
   
    87 90 92 93
  5  0  0  0  0
  6  2  1  1  1
</code></pre><h3 id="_3-4-列表" tabindex="-1"><a class="header-anchor" href="#_3-4-列表" aria-hidden="true">#</a> 3.4 列表</h3><p>列表非常重要。如果需要捆绑不同长度和类别的对象，则可以使用列表来实现。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myList &lt;- list(vec1, vec2, vec3, vec4)
myList
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><ol class="list-inline"><li>10</li><li>20</li><li>15</li><li>40</li></ol></li><li><ol class="list-inline"><li>&#39;a&#39;</li><li>&#39;b&#39;</li><li>&#39;c&#39;</li><li>NA</li></ol></li><li><ol class="list-inline"><li>TRUE</li><li>FALSE</li><li>TRUE</li><li>TRUE</li></ol></li><li><ol class="list-inline"><li>l1</li><li>l2</li><li>l3</li><li>l4</li></ol><details><summary style="display:list-item;cursor:pointer;"><strong>Levels</strong>: </summary><ol class="list-inline"><li>&#39;l1&#39;</li><li>&#39;l2&#39;</li><li>&#39;l3&#39;</li><li>&#39;l4&#39;</li></ol></details></li></ol><h3 id="_3-5-if-else语句" tabindex="-1"><a class="header-anchor" href="#_3-5-if-else语句" aria-hidden="true">#</a> 3.5 If-Else语句</h3><p>if else语句结构如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(checkConditionIfTrue) {
  ....statements..
  ....statements..
} else {   # place the &#39;else&#39; in same line as &#39;}&#39;
  ....statements..
  ....statements..
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>x&lt;-2
if(x&gt;1)
    {
    print(x)
}else
    {
    print(&quot;None&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1] 2
</code></pre><h3 id="_3-6-for循环" tabindex="-1"><a class="header-anchor" href="#_3-6-for循环" aria-hidden="true">#</a> 3.6 for循环</h3><p>格式如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(counterVar in c(1:n)){
  .... statements..
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>for (x in c(1:5))
    {
    print(x)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
</code></pre><h3 id="_3-7-apply类别函数" tabindex="-1"><a class="header-anchor" href="#_3-7-apply类别函数" aria-hidden="true">#</a> 3.7 apply类别函数</h3><p><strong>apply</strong></p><p>apply()：按数据行或矩阵按行或列应用函数。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>myData &lt;- matrix(seq(1,16), 4, 4)  # 生成一个矩阵
myData
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A matrix: 4 × 4 of type int</caption><tbody><tr><td>1</td><td>5</td><td> 9</td><td>13</td></tr><tr><td>2</td><td>6</td><td>10</td><td>14</td></tr><tr><td>3</td><td>7</td><td>11</td><td>15</td></tr><tr><td>4</td><td>8</td><td>12</td><td>16</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>apply(myData, 1, FUN=min)  # 1代表行，按行应用min函数
apply(myData, 2, FUN=min)  # 2代表列，按列应用min函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>1</li><li>2</li><li>3</li><li>4</li></ol><ol class="list-inline"><li>1</li><li>5</li><li>9</li><li>13</li></ol><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>apply(data.frame(1:5), 1, FUN=function(x) {x^2} ) # square of 1,2,3,4,5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol class="list-inline"><li>1</li><li>4</li><li>9</li><li>16</li><li>25</li></ol><p><strong>lapply()</strong></p><p>lapply()：将函数应用于列表中的每个元素，或将其应用于数据框的列，并将结果作为列表返回</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>lapply(airquality, class)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><dl><dt>$Ozone</dt><dd>&#39;integer&#39;</dd><dt>$Solar.R</dt><dd>&#39;integer&#39;</dd><dt>$Wind</dt><dd>&#39;numeric&#39;</dd><dt>$Temp</dt><dd>&#39;integer&#39;</dd><dt>$Month</dt><dd>&#39;integer&#39;</dd><dt>$Day</dt><dd>&#39;integer&#39;</dd></dl><p><strong>sapply</strong></p><p>sapply()：将函数应用于列表的每个元素，或将其应用于dataframe的列，并将结果作为向量返回。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>sapply(airquality, class) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><dl class="dl-horizontal"><dt>Ozone</dt><dd>&#39;integer&#39;</dd><dt>Solar.R</dt><dd>&#39;integer&#39;</dd><dt>Wind</dt><dd>&#39;numeric&#39;</dd><dt>Temp</dt><dd>&#39;integer&#39;</dd><dt>Month</dt><dd>&#39;integer&#39;</dd><dt>Day</dt><dd>&#39;integer&#39;</dd></dl><h3 id="_3-8-使用trycatch-处理错误" tabindex="-1"><a class="header-anchor" href="#_3-8-使用trycatch-处理错误" aria-hidden="true">#</a> 3.8 使用tryCatch()处理错误</h3><p>该trycatch()函数在花括号内编写了三个块，try()我们前面看到的函数一样，可以在第一组花括号内使用多行代码。如果在第一个块的任何一条语句中遇到错误，则生成的错误消息将存储在err错误处理函数使用的变量（请参见下面的代码）中。您可以选择打印出此错误消息，进行其他计算或执行任何所需的操作。您甚至还可以在此函数内执行一组完全不同的逻辑，而不涉及错误消息。最后一组finally而不管是否发生错误，都必须执行。您可以选择忽略将任何语句完全添加到此部分。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>tryCatch(
    {1 &lt;- 1; print(&quot;Lets create an error&quot;)
    }, # First block
error=function(err){
    print(err); print(&quot;Error Line&quot;)
},  # Second Block(optional)
finally = {
    print(&quot;finally print this&quot;)}
)# Third Block(optional)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;simpleError in 1 &lt;- 1: (do_set)赋值公式左手不对&gt;
[1] &quot;Error Line&quot;
[1] &quot;finally print this&quot;
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,250),b={href:"http://r-statistics.co/R-Tutorial.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://blog.csdn.net/qq_43198568/article/details/105641104",target:"_blank",rel:"noopener noreferrer"},R={href:"https://blog.csdn.net/luohenyj/category_9152388.html",target:"_blank",rel:"noopener noreferrer"};function q(y,f){const i=a("ExternalLinkIcon");return n(),s("div",null,[o,u,l("blockquote",null,[l("p",null,[l("a",v,[t("R-Tutorial"),e(i)])])]),l("p",null,[t("R语言程序的编写需要安装R或RStudio，通常是在RStudio中键入代码。但是RStudio个人感觉并不好用，因此本人编写的R语言程序都是在Jupyter Notebook平台使用。具体可以见"),l("a",p,[t("在 Jupyter Notebook 中使用R语言"),e(i)]),t("。R语言和Python，matlab一样都是解释型语言，语法差别不大，容易入门。其他进阶内容见"),l("a",m,[t("R语言个人笔记"),e(i)])]),h,l("ul",null,[l("li",null,[l("a",b,[t("R-Tutorial"),e(i)])]),l("li",null,[l("a",g,[t("在 Jupyter Notebook 中使用R语言"),e(i)])]),l("li",null,[l("a",R,[t("R语言个人笔记"),e(i)])])])])}const N=d(c,[["render",q],["__file","2021-02-05-_R语言_ R语言快速入门教程.html.vue"]]);export{N as default};
