import{_ as l,c as e,a as i,g as n,d as a,o as t}from"./app-TQoR7mvJ.js";const p={};function d(r,s){return t(),e("div",null,[s[0]||(s[0]=i(`<h1 id="数据与分析可视化-d3入门教程1-d3基础知识" tabindex="-1"><a class="header-anchor" href="#数据与分析可视化-d3入门教程1-d3基础知识"><span>[数据与分析可视化] D3入门教程1-d3基础知识</span></a></h1><p>d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 本文档展示了多个交互式示例，说明了d3.js的关键概念，从而生成了第一个基本散点图。</p><h2 id="_1-html介绍" tabindex="-1"><a class="header-anchor" href="#_1-html介绍"><span>1 HTML介绍</span></a></h2><h3 id="_1-1-什么是html" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是html"><span>1.1 什么是HTML？</span></a></h3><p>HTML介绍：</p><ul><li>HTML代表超文本标记语言。基本上，它是任何网站背后的语言。Mozilla 或 Safari 等 Web 浏览器会读取此类文件并将其翻译到网页中</li><li>在HTML文件中，组成网页的元素被创建，并由标签描述。例如，级别1的标题由h1标签表示，带有标签的段落，由p标签表示图像img</li><li>如果没有 html 的基本知识，就不可能学会d3.js</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加标题 --&gt;</span></span>
<span class="line"><span>&lt;h1&gt;First html document&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加一行文字 --&gt;</span></span>
<span class="line"><span>&lt;p&gt;This is my first sentence&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加链接--&gt;</span></span>
<span class="line"><span>&lt;p&gt;This is &lt;a href=&quot;https://www.d3-graph-gallery.com&quot;&gt;a link to the d3 graph gallery&lt;/a&gt;&lt;/p&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),n(" 添加标题 "),s[1]||(s[1]=a("h1",null,"First html document",-1)),n(" 添加一行文字 "),s[2]||(s[2]=a("p",null,"This is my first sentence",-1)),n(" 添加链接"),s[3]||(s[3]=i(`<p>This is <a href="https://www.d3-graph-gallery.com">a link to the d3 graph gallery</a></p><p>将上面的代码复制并粘贴到本地文件中。称之为test.html，便构建一个简单的网页。</p><h3 id="_1-2-自定义文档样式css" tabindex="-1"><a class="header-anchor" href="#_1-2-自定义文档样式css"><span>1.2 自定义文档样式CSS</span></a></h3><p>CSS代表级联样式表，它允许将特定样式应用于使用html创建的元素。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;!-- 将特定样式应用于inGreen类的元素 --&gt;</span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>  .inRed { color: red; }</span></span>
<span class="line"><span>  .inFont { font-size: 20px}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加标题，并添加相应的类 --&gt;</span></span>
<span class="line"><span>&lt;h1 class=&quot;inFont&quot;&gt;First html document&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加一行文字 --&gt;</span></span>
<span class="line"><span>&lt;p class=&quot;inRed&quot;&gt;This is my first sentence&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加链接 --&gt;</span></span>
<span class="line"><span>&lt;p&gt;This is &lt;a href=&quot;https://www.d3-graph-gallery.com&quot;&gt;a link to the d3 graph gallery&lt;/a&gt;&lt;/p&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)),n(" 将特定样式应用于inGreen类的元素 "),n(" 添加标题，并添加相应的类 "),s[4]||(s[4]=a("h1",{class:"inFont"},"First html document",-1)),n(" 添加一行文字 "),s[5]||(s[5]=a("p",{class:"inRed"},"This is my first sentence",-1)),n(" 添加链接 "),s[6]||(s[6]=i(`<p>This is <a href="https://www.d3-graph-gallery.com">a link to the d3 graph gallery</a></p><h3 id="_1-3-构建svg图形" tabindex="-1"><a class="header-anchor" href="#_1-3-构建svg图形"><span>1.3 构建svg图形</span></a></h3><ul><li>svg代表可缩放矢量图形。它是一种矢量图像格式。基本上，它是一种允许使用代码构建形状的语言</li><li>d3.js图表实际上是一组svg组合在一起的形状</li><li>d3.js展示了不同形状的svg</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;!-- 添加标题 --&gt;</span></span>
<span class="line"><span>&lt;h1&gt;First html document&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加一行文字 --&gt;</span></span>
<span class="line"><span>&lt;p&gt;This is my first sentence&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 添加svg形状 --&gt;</span></span>
<span class="line"><span>&lt;svg&gt;</span></span>
<span class="line"><span>  &lt;circle style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=50 cy=50 r=40&gt;&lt;/circle&gt;</span></span>
<span class="line"><span>&lt;/svg&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n(" 添加标题 "),s[7]||(s[7]=a("h1",null,"First html document",-1)),n(" 添加一行文字 "),s[8]||(s[8]=a("p",null,"This is my first sentence",-1)),n(" 添加svg形状 "),s[9]||(s[9]=i(`<svg><circle style="fill:#69b3a2;" stroke="black" cx="50" cy="50" r="40"></circle></svg><h2 id="_2-d3绘图入门" tabindex="-1"><a class="header-anchor" href="#_2-d3绘图入门"><span>2 d3绘图入门</span></a></h2><h3 id="_2-1-使用javascript和d3-js修改元素" tabindex="-1"><a class="header-anchor" href="#_2-1-使用javascript和d3-js修改元素"><span>2.1 使用Javascript和d3.js修改元素</span></a></h3><p>JavaScript是前端的三大核心技术之一。它实现了网页的交互性。d3.js是一个javascript库，对数据可视化特别有用。它允许创建、选择和修改元素。在下面的示例中， d3用于选择目标圆形并修改其stroke-width。虽然它还不是很令人印象深刻，但是我们将使用相同的过程来设置数百个圆的位置并得到散点图。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    &lt;h1&gt;First html document&lt;/h1&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 添加标题 --&gt;</span></span>
<span class="line"><span>    &lt;p&gt;This is my first sentence&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 添加svg形状 --&gt;</span></span>
<span class="line"><span>    &lt;svg&gt;</span></span>
<span class="line"><span>        &lt;circle class=&quot;target&quot; style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=50 cy=50 r=40&gt;&lt;/circle&gt;</span></span>
<span class="line"><span>    &lt;/svg&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3 --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        d3</span></span>
<span class="line"><span>            .select(&quot;.target&quot;)  // 选择target类</span></span>
<span class="line"><span>            .style(&quot;stroke-width&quot;, 8) // 修改svg图形轮廓</span></span>
<span class="line"><span>            .style(&quot;opacity&quot;, 0.5) // 修改svg图形透明度</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img1.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-2-console-log" tabindex="-1"><a class="header-anchor" href="#_2-2-console-log"><span>2.2 Console.log()</span></a></h3><p>浏览器运行Html，css和Javascript并将结果显示为网页，如果出现问题，会在浏览器控制台中发出通知，你可以在右键单击页面打开-&gt;检查-&gt;console，打开控制台，或者直接按F1。比如在控制台中输入，console.log(&quot;sometext&quot;)，就可以打印sometext字符串。</p><h3 id="_2-3-坐标系" tabindex="-1"><a class="header-anchor" href="#_2-3-坐标系"><span>2.3 坐标系</span></a></h3><p>构建d3.js图表首先创建一个svg元素。这个元素有width和height两个参数来控制大小，以像素为单位。左上角的坐标为x=0和y=0，左下角的坐标x=0和y=height，右上角的坐标x=width和height=0，和常见的图片坐标表示一样。显示三个圆的代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 添加一个空的svg图片 --&gt;</span></span>
<span class="line"><span>    &lt;svg id=&quot;dataviz_area&quot; height=200 width=450&gt;&lt;/svg&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3.js --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        var svg = d3.select(&quot;#dataviz_area&quot;)</span></span>
<span class="line"><span>        // 添加圆，cx和cy为圆心坐标，r为半径</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, 2).attr(&quot;cy&quot;, 2).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, 120).attr(&quot;cy&quot;, 70).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, 300).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img2.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-4-比例尺" tabindex="-1"><a class="header-anchor" href="#_2-4-比例尺"><span>2.4 比例尺</span></a></h3><p>如果想用百分比来表示svg中元素的位置，那么就需要用到比例尺，比例尺就是一个将像素值范围转换为位置百分比的函数。它被称为scale。如果我的数据是百分比并且我的svg区域是400px宽度。那么0%代表0px，100%代表400像素。50%代表200像素。比例尺有domain和range两个属性，range设置像素值范围，domain设置位置百分比。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    &lt;!-- 添加一个空的svg图片 --&gt;</span></span>
<span class="line"><span>    &lt;svg id=&quot;viz_area&quot; height=200 width=450&gt;&lt;/svg&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3.js --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        // 选择svg绘图区域</span></span>
<span class="line"><span>        var svg = d3.select(&quot;#viz_area&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建比例尺</span></span>
<span class="line"><span>        // 将0到400像素映射到0%到100%</span></span>
<span class="line"><span>        var x = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([0, 400]);</span></span>
<span class="line"><span>        // 尝试console.log(x(25))以查看x函数的用途。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 以百分比设置图片尺寸</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(10)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(50)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(100)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img3.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-5-添加轴" tabindex="-1"><a class="header-anchor" href="#_2-5-添加轴"><span>2.5 添加轴</span></a></h3><p>d3提供了一些自动绘制轴的功能。这些轴始终与比例尺scale对应。axisBottom()创建一个水平轴，底部带有刻度和标签。axisLeft()将用于Y 轴。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    &lt;!-- 添加一个空的svg图片 --&gt;</span></span>
<span class="line"><span>    &lt;svg id=&quot;viz_area&quot; height=200 width=450&gt;&lt;/svg&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3.js --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span>        // 选择svg绘图区域</span></span>
<span class="line"><span>        var svg = d3.select(&quot;#viz_area&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建比例尺</span></span>
<span class="line"><span>        var x = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([0, 400]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 显示与此比例对应的轴</span></span>
<span class="line"><span>        svg.call(d3.axisBottom(x));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 以百分比设置图片尺寸</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(10)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(50)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);</span></span>
<span class="line"><span>        svg.append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, x(100)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img4.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-6-边距和偏移" tabindex="-1"><a class="header-anchor" href="#_2-6-边距和偏移"><span>2.6 边距和偏移</span></a></h3><p>轴位置经常需要调整，例如，X轴通常位于图表的底部。这归功于translation函数，应用.attr(&quot;transform&quot;, &quot;translate(20,50)&quot;)到一个元素，将其向右平移 20 像素，向底部平移 50 像素。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 添加一个空的svg图片 --&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;Area&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3.js --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置图形的尺寸和边距</span></span>
<span class="line"><span>        var margin = { top: 10, right: 40, bottom: 30, left: 30 },</span></span>
<span class="line"><span>            width = 450 - margin.left - margin.right,</span></span>
<span class="line"><span>            height = 400 - margin.top - margin.bottom;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 将svg对象附加到页面主体</span></span>
<span class="line"><span>        var svg = d3.select(&quot;#Area&quot;)</span></span>
<span class="line"><span>            .append(&quot;svg&quot;)</span></span>
<span class="line"><span>            // 留下空白</span></span>
<span class="line"><span>            .attr(&quot;width&quot;, width + margin.left + margin.right)</span></span>
<span class="line"><span>            .attr(&quot;height&quot;, height + margin.top + margin.bottom)</span></span>
<span class="line"><span>            .append(&quot;g&quot;) // 添加标尺</span></span>
<span class="line"><span>            .attr(&quot;transform&quot;, &quot;translate(&quot; + margin.left + &quot;,&quot; + margin.top + &quot;)&quot;); // 平移图像</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建x轴比例尺</span></span>
<span class="line"><span>        var x = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([0, width]);</span></span>
<span class="line"><span>        svg.append(&#39;g&#39;)</span></span>
<span class="line"><span>            .attr(&quot;transform&quot;, &quot;translate(0,&quot; + height + &quot;)&quot;)</span></span>
<span class="line"><span>            .call(d3.axisBottom(x));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建y轴比例尺</span></span>
<span class="line"><span>        var y = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([height, 0]);</span></span>
<span class="line"><span>        svg.append(&#39;g&#39;)</span></span>
<span class="line"><span>            .call(d3.axisLeft(y));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img5.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-7-数据绑定" tabindex="-1"><a class="header-anchor" href="#_2-7-数据绑定"><span>2.7 数据绑定</span></a></h3><p>将数据绑定到svg元素是我们完成散点图所需的最后一步。在我看来，这也是最难理解的部分。它始终遵循相同的步骤：</p><ul><li>svg: 选择图表所在的 svg 区域</li><li>.selectAll(&quot;whatever&quot;): 选择所有尚未创建的元素，我知道这很奇怪。</li><li>.data(data): 指定要使用的数据。</li><li>.enter(): 开始数据循环。以下代码将应用于data[0]，data[1]依此类推。</li><li>.append(&quot;circle&quot;)：对于每次迭代，添加一个圆圈。</li><li>.attr(&quot;cx&quot;, function(d){ return x(d.x) }): 给出圆的x位置。这里d将是data[0]，然后data[1]等等。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    &lt;!-- 添加一个空的svg图片 --&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;scatter_area&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 加载d3.js --&gt;</span></span>
<span class="line"><span>    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 设置图形的尺寸和边距</span></span>
<span class="line"><span>        var margin = { top: 10, right: 40, bottom: 30, left: 30 },</span></span>
<span class="line"><span>            width = 450 - margin.left - margin.right,</span></span>
<span class="line"><span>            height = 400 - margin.top - margin.bottom;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 将svg对象附加到页面主体</span></span>
<span class="line"><span>        var svG = d3.select(&quot;#scatter_area&quot;)</span></span>
<span class="line"><span>            .append(&quot;svg&quot;)</span></span>
<span class="line"><span>            .attr(&quot;width&quot;, width + margin.left + margin.right)</span></span>
<span class="line"><span>            .attr(&quot;height&quot;, height + margin.top + margin.bottom)</span></span>
<span class="line"><span>            .append(&quot;g&quot;)</span></span>
<span class="line"><span>            .attr(&quot;transform&quot;,</span></span>
<span class="line"><span>                &quot;translate(&quot; + margin.left + &quot;,&quot; + margin.top + &quot;)&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建数据</span></span>
<span class="line"><span>        var data = [{ x: 10, y: 20 }, { x: 40, y: 90 }, { x: 80, y: 50 }]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建x轴比例尺</span></span>
<span class="line"><span>        var x = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([0, width]);</span></span>
<span class="line"><span>        svG.append(&#39;g&#39;)</span></span>
<span class="line"><span>            .attr(&quot;transform&quot;, &quot;translate(0,&quot; + height + &quot;)&quot;)</span></span>
<span class="line"><span>            .call(d3.axisBottom(x));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 创建y轴比例尺</span></span>
<span class="line"><span>        var y = d3.scaleLinear()</span></span>
<span class="line"><span>            .domain([0, 100])</span></span>
<span class="line"><span>            .range([height, 0]);</span></span>
<span class="line"><span>        svG.append(&#39;g&#39;)</span></span>
<span class="line"><span>            .call(d3.axisLeft(y));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 添加数据</span></span>
<span class="line"><span>        svG.selectAll(&quot;whatever&quot;)</span></span>
<span class="line"><span>            .data(data)</span></span>
<span class="line"><span>            .enter()</span></span>
<span class="line"><span>            .append(&quot;circle&quot;)</span></span>
<span class="line"><span>            .attr(&quot;cx&quot;, function (d) { return x(d.x) })</span></span>
<span class="line"><span>            .attr(&quot;cy&quot;, function (d) { return y(d.y) })</span></span>
<span class="line"><span>            .attr(&quot;r&quot;, 7)</span></span>
<span class="line"><span>    &lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img6.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考"><span>3 参考</span></a></h2><ul><li><a href="https://www.d3-graph-gallery.com/intro_d3js.html" target="_blank" rel="noopener noreferrer">intro_d3js</a></li></ul>`,31))])}const u=l(p,[["render",d],["__file","2021-11-21-_数据与分析可视化_ D3入门教程1-d3基础知识.html.vue"]]),v=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-11-21-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1-d3%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html","title":"[数据与分析可视化] D3入门教程1-d3基础知识","lang":"zh-CN","frontmatter":{"date":"2021-11-21T12:56:20.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","编程基础","web"],"description":"[数据与分析可视化] D3入门教程1-d3基础知识 d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 本文档展示了多个交互式示例，说明了d3.js的关键概念，从而生成了第一个基本散点图。 1 HTML介绍 1.1 什么是HTML？ HTML介绍： HTML代表超文本标记语言。基本上，它是任何网站背后的语言。Mozi...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-11-21-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1-d3%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据与分析可视化] D3入门教程1-d3基础知识"}],["meta",{"property":"og:description","content":"[数据与分析可视化] D3入门教程1-d3基础知识 d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 本文档展示了多个交互式示例，说明了d3.js的关键概念，从而生成了第一个基本散点图。 1 HTML介绍 1.1 什么是HTML？ HTML介绍： HTML代表超文本标记语言。基本上，它是任何网站背后的语言。Mozi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:tag","content":"web"}],["meta",{"property":"article:published_time","content":"2021-11-21T12:56:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据与分析可视化] D3入门教程1-d3基础知识\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img1.svg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img2.svg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img3.svg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img4.svg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img5.svg\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B1/image/img6.svg\\"],\\"datePublished\\":\\"2021-11-21T12:56:20.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 HTML介绍","slug":"_1-html介绍","link":"#_1-html介绍","children":[{"level":3,"title":"1.1 什么是HTML？","slug":"_1-1-什么是html","link":"#_1-1-什么是html","children":[]},{"level":3,"title":"1.2 自定义文档样式CSS","slug":"_1-2-自定义文档样式css","link":"#_1-2-自定义文档样式css","children":[]},{"level":3,"title":"1.3 构建svg图形","slug":"_1-3-构建svg图形","link":"#_1-3-构建svg图形","children":[]}]},{"level":2,"title":"2 d3绘图入门","slug":"_2-d3绘图入门","link":"#_2-d3绘图入门","children":[{"level":3,"title":"2.1 使用Javascript和d3.js修改元素","slug":"_2-1-使用javascript和d3-js修改元素","link":"#_2-1-使用javascript和d3-js修改元素","children":[]},{"level":3,"title":"2.2 Console.log()","slug":"_2-2-console-log","link":"#_2-2-console-log","children":[]},{"level":3,"title":"2.3 坐标系","slug":"_2-3-坐标系","link":"#_2-3-坐标系","children":[]},{"level":3,"title":"2.4 比例尺","slug":"_2-4-比例尺","link":"#_2-4-比例尺","children":[]},{"level":3,"title":"2.5 添加轴","slug":"_2-5-添加轴","link":"#_2-5-添加轴","children":[]},{"level":3,"title":"2.6 边距和偏移","slug":"_2-6-边距和偏移","link":"#_2-6-边距和偏移","children":[]},{"level":3,"title":"2.7 数据绑定","slug":"_2-7-数据绑定","link":"#_2-7-数据绑定","children":[]}]},{"level":2,"title":"3 参考","slug":"_3-参考","link":"#_3-参考","children":[]}],"git":{},"readingTime":{"minutes":8.99,"words":2698},"filePathRelative":"blog/数据分析与可视化/D3入门教程/2021-11-21-[数据与分析可视化] D3入门教程1-d3基础知识.md","localizedDate":"2021年11月21日","excerpt":"\\n<p>d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 本文档展示了多个交互式示例，说明了d3.js的关键概念，从而生成了第一个基本散点图。</p>\\n<h2>1 HTML介绍</h2>\\n<h3>1.1 什么是HTML？</h3>\\n<p>HTML介绍：</p>\\n<ul>\\n<li>HTML代表超文本标记语言。基本上，它是任何网站背后的语言。Mozilla 或 Safari 等 Web 浏览器会读取此类文件并将其翻译到网页中</li>\\n<li>在HTML文件中，组成网页的元素被创建，并由标签描述。例如，级别1的标题由h1标签表示，带有标签的段落，由p标签表示图像img</li>\\n<li>如果没有 html 的基本知识，就不可能学会d3.js</li>\\n</ul>","autoDesc":true}');export{u as comp,v as data};
