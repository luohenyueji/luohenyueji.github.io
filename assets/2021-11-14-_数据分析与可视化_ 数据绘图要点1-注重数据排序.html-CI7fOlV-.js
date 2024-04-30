import{_ as i,r as d,o as r,c as l,a as e,b as a,d as n,e as s}from"./app-DFbKURJL.js";const o={},c=s(`<h1 id="数据分析与可视化-数据绘图要点1-注重数据排序" tabindex="-1"><a class="header-anchor" href="#数据分析与可视化-数据绘图要点1-注重数据排序"><span>[数据分析与可视化] 数据绘图要点1-注重数据排序</span></a></h1><h2 id="数据绘图要点1-注重数据排序" tabindex="-1"><a class="header-anchor" href="#数据绘图要点1-注重数据排序"><span>数据绘图要点1-注重数据排序</span></a></h2><p>默认情况下，大多数数据可视化工具将使用字母顺序或使用输入表中的出现顺序对分类变量组进行排序。当显示多个实体项的值时，对它们进行排序会使得图表更具洞察力。</p><h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h3><h4 id="无序棒棒糖图" tabindex="-1"><a class="header-anchor" href="#无序棒棒糖图"><span>无序棒棒糖图</span></a></h4><p>让我们从一个无序棒棒糖图开始，下面代码展示了一些国家出口的某一重要物品的数量。这里每一行代表一个国家，X 轴显示2017 年销售的重要物品数量。默认情况下，国家按字母顺序排列。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>
## Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = &quot;html&quot;)

## 从github加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv&quot;, header=TRUE, sep=&quot;,&quot;)
## 展示数据
head(data,10)
## 长度
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table class="dataframe"><caption>A data.frame: 10 × 2</caption><thead><tr><th></th><th scope="col">Country</th><th scope="col">Value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>United States </td><td>12394</td></tr><tr><th scope="row">2</th><td>Russia </td><td> 6148</td></tr><tr><th scope="row">3</th><td>Germany (FRG) </td><td> 1653</td></tr><tr><th scope="row">4</th><td>France </td><td> 2162</td></tr><tr><th scope="row">5</th><td>United Kingdom</td><td> 1214</td></tr><tr><th scope="row">6</th><td>China </td><td> 1131</td></tr><tr><th scope="row">7</th><td>Soviet Union </td><td> NA</td></tr><tr><th scope="row">8</th><td>Netherlands </td><td> 1167</td></tr><tr><th scope="row">9</th><td>Italy </td><td> 660</td></tr><tr><th scope="row">10</th><td>Israel </td><td> 1263</td></tr></tbody></table><p>51</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 清除空值数据
data &lt;- filter(data,!is.na(Value))
nrow(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>38</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 绘图
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点1-注重数据排序/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>很明显，美国和俄罗斯出售物品数量比其他国家多得多。然而，很难看出任何其他国家之间的差异，读者必须从一个国家到另一个国家进行比较。这是很多工作，肯定会放弃对您的图形的关注。</p><h4 id="有序棒棒糖图" tabindex="-1"><a class="header-anchor" href="#有序棒棒糖图"><span>有序棒棒糖图</span></a></h4><p>相反，让我们制作完全相同的图表，但使用它们的值重新排序每个组。</p><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = &quot;html&quot;)

## 从github加载数据
data &lt;- read.table(&quot;https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv&quot;, header=TRUE, sep=&quot;,&quot;)
## 清除空值数据
data &lt;- filter(data,!is.na(Value))
nrow(data)
head(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>38</p><table class="dataframe"><caption>A data.frame: 6 × 2</caption><thead><tr><th></th><th scope="col">Country</th><th scope="col">Value</th></tr><tr><th></th><th scope="col">&lt;fct&gt;</th><th scope="col">&lt;int&gt;</th></tr></thead><tbody><tr><th scope="row">1</th><td>United States </td><td>12394</td></tr><tr><th scope="row">2</th><td>Russia </td><td> 6148</td></tr><tr><th scope="row">3</th><td>Germany (FRG) </td><td> 1653</td></tr><tr><th scope="row">4</th><td>France </td><td> 2162</td></tr><tr><th scope="row">5</th><td>United Kingdom</td><td> 1214</td></tr><tr><th scope="row">6</th><td>China </td><td> 1131</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 排列数据
data&lt;- arrange(data,Value)
## 将Contry转换为factor项，来表示分类数据
data&lt;- mutate(data,Country=factor(Country, Country)) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R" data-title="R"><pre class="language-R"><code>## 绘图
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/[数据分析与可视化] 数据绘图要点/[数据分析与可视化] 数据绘图要点1-注重数据排序/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>这个数字现在更具洞察力，法国是第三大出口国，其次是德国、以色列和英国。当然，请注意，将每个国家的人口归一化该图形以获得更多可比数据是有意义的。重新排序数据是构建图表时应始终考虑的简单步骤。当然，有时组的顺序必须由它们的特征而不是它们的值来设置，例如一年中的几个月，这是值得考虑。</p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h3>`,24),E={href:"https://www.data-to-viz.com/caveat/order_data.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.zhihu.com/question/48472404",target:"_blank",rel:"noopener noreferrer"};function h(m,v){const t=d("ExternalLinkIcon");return r(),l("div",null,[c,e("ul",null,[e("li",null,[e("a",E,[a("WHY YOU SHOULD ORDER YOUR DATA"),n(t)])]),e("li",null,[e("a",u,[a("如何理解R中因子(factor)的概念"),n(t)])])])])}const b=i(o,[["render",h],["__file","2021-11-14-_数据分析与可视化_ 数据绘图要点1-注重数据排序.html.vue"]]),g=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2021-11-14-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B91-%E6%B3%A8%E9%87%8D%E6%95%B0%E6%8D%AE%E6%8E%92%E5%BA%8F.html","title":"[数据分析与可视化] 数据绘图要点1-注重数据排序","lang":"zh-CN","frontmatter":{"date":"2021-11-14T10:45:06.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","R语言"],"description":"[数据分析与可视化] 数据绘图要点1-注重数据排序 数据绘图要点1-注重数据排序 默认情况下，大多数数据可视化工具将使用字母顺序或使用输入表中的出现顺序对分类变量组进行排序。当显示多个实体项的值时，对它们进行排序会使得图表更具洞察力。 实例 无序棒棒糖图 让我们从一个无序棒棒糖图开始，下面代码展示了一些国家出口的某一重要物品的数量。这里每一行代表一个国...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/2021-11-14-_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96_%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B91-%E6%B3%A8%E9%87%8D%E6%95%B0%E6%8D%AE%E6%8E%92%E5%BA%8F.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据分析与可视化] 数据绘图要点1-注重数据排序"}],["meta",{"property":"og:description","content":"[数据分析与可视化] 数据绘图要点1-注重数据排序 数据绘图要点1-注重数据排序 默认情况下，大多数数据可视化工具将使用字母顺序或使用输入表中的出现顺序对分类变量组进行排序。当显示多个实体项的值时，对它们进行排序会使得图表更具洞察力。 实例 无序棒棒糖图 让我们从一个无序棒棒糖图开始，下面代码展示了一些国家出口的某一重要物品的数量。这里每一行代表一个国..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B91-%E6%B3%A8%E9%87%8D%E6%95%B0%E6%8D%AE%E6%8E%92%E5%BA%8F/output_4_0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"R语言"}],["meta",{"property":"article:published_time","content":"2021-11-14T10:45:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据分析与可视化] 数据绘图要点1-注重数据排序\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B91-%E6%B3%A8%E9%87%8D%E6%95%B0%E6%8D%AE%E6%8E%92%E5%BA%8F/output_4_0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/R-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B9/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20%E6%95%B0%E6%8D%AE%E7%BB%98%E5%9B%BE%E8%A6%81%E7%82%B91-%E6%B3%A8%E9%87%8D%E6%95%B0%E6%8D%AE%E6%8E%92%E5%BA%8F/output_9_0.png\\"],\\"datePublished\\":\\"2021-11-14T10:45:06.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"数据绘图要点1-注重数据排序","slug":"数据绘图要点1-注重数据排序","link":"#数据绘图要点1-注重数据排序","children":[{"level":3,"title":"实例","slug":"实例","link":"#实例","children":[]},{"level":3,"title":"参考","slug":"参考","link":"#参考","children":[]}]}],"git":{},"readingTime":{"minutes":4.37,"words":1310},"filePathRelative":"blog/数据分析与可视化/数据绘图要点/2021-11-14-[数据分析与可视化] 数据绘图要点1-注重数据排序.md","localizedDate":"2021年11月14日","excerpt":"\\n<h2>数据绘图要点1-注重数据排序</h2>\\n<p>默认情况下，大多数数据可视化工具将使用字母顺序或使用输入表中的出现顺序对分类变量组进行排序。当显示多个实体项的值时，对它们进行排序会使得图表更具洞察力。</p>\\n<h3>实例</h3>\\n<h4>无序棒棒糖图</h4>\\n<p>让我们从一个无序棒棒糖图开始，下面代码展示了一些国家出口的某一重要物品的数量。这里每一行代表一个国家，X 轴显示2017 年销售的重要物品数量。默认情况下，国家按字母顺序排列。</p>\\n<div class=\\"language-R\\" data-ext=\\"R\\" data-title=\\"R\\"><pre class=\\"language-R\\"><code>\\n## Libraries\\nlibrary(tidyverse)\\nlibrary(hrbrthemes)\\nlibrary(kableExtra)\\noptions(knitr.table.format = \\"html\\")\\n\\n## 从github加载数据\\ndata &lt;- read.table(\\"https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv\\", header=TRUE, sep=\\",\\")\\n## 展示数据\\nhead(data,10)\\n## 长度\\nnrow(data)\\n</code></pre></div>","autoDesc":true}');export{b as comp,g as data};
