import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as a,c as d,f as i,a as e,b as r,d as u,e as t}from"./app-MsA2k2kn.js";const v={},c=t(`<h1 id="数据与分析可视化-d3入门教程1-d3基础知识" tabindex="-1"><a class="header-anchor" href="#数据与分析可视化-d3入门教程1-d3基础知识" aria-hidden="true">#</a> [数据与分析可视化] D3入门教程1-d3基础知识</h1><p>d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 本文档展示了多个交互式示例，说明了d3.js的关键概念，从而生成了第一个基本散点图。</p><h2 id="_1-html介绍" tabindex="-1"><a class="header-anchor" href="#_1-html介绍" aria-hidden="true">#</a> 1 HTML介绍</h2><h3 id="_1-1-什么是html" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是html" aria-hidden="true">#</a> 1.1 什么是HTML？</h3><p>HTML介绍：</p><ul><li>HTML代表超文本标记语言。基本上，它是任何网站背后的语言。Mozilla 或 Safari 等 Web 浏览器会读取此类文件并将其翻译到网页中</li><li>在HTML文件中，组成网页的元素被创建，并由标签描述。例如，级别1的标题由h1标签表示，带有标签的段落，由p标签表示图像img</li><li>如果没有 html 的基本知识，就不可能学会d3.js</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;

&lt;!-- 添加标题 --&gt;
&lt;h1&gt;First html document&lt;/h1&gt;

&lt;!-- 添加一行文字 --&gt;
&lt;p&gt;This is my first sentence&lt;/p&gt;

&lt;!-- 添加链接--&gt;
&lt;p&gt;This is &lt;a href=&quot;https://www.d3-graph-gallery.com&quot;&gt;a link to the d3 graph gallery&lt;/a&gt;&lt;/p&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=e("h1",null,"First html document",-1),m=e("p",null,"This is my first sentence",-1),g=t(`<p>This is <a href="https://www.d3-graph-gallery.com">a link to the d3 graph gallery</a></p><p>将上面的代码复制并粘贴到本地文件中。称之为test.html，便构建一个简单的网页。</p><h3 id="_1-2-自定义文档样式css" tabindex="-1"><a class="header-anchor" href="#_1-2-自定义文档样式css" aria-hidden="true">#</a> 1.2 自定义文档样式CSS</h3><p>CSS代表级联样式表，它允许将特定样式应用于使用html创建的元素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
&lt;!DOCTYPE html&gt;
&lt;!-- 将特定样式应用于inGreen类的元素 --&gt;
&lt;style&gt;
  .inRed { color: red; }
  .inFont { font-size: 20px}
&lt;/style&gt;

&lt;!-- 添加标题，并添加相应的类 --&gt;
&lt;h1 class=&quot;inFont&quot;&gt;First html document&lt;/h1&gt;

&lt;!-- 添加一行文字 --&gt;
&lt;p class=&quot;inRed&quot;&gt;This is my first sentence&lt;/p&gt;

&lt;!-- 添加链接 --&gt;
&lt;p&gt;This is &lt;a href=&quot;https://www.d3-graph-gallery.com&quot;&gt;a link to the d3 graph gallery&lt;/a&gt;&lt;/p&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),b=e("h1",{class:"inFont"},"First html document",-1),h=e("p",{class:"inRed"},"This is my first sentence",-1),q=t(`<p>This is <a href="https://www.d3-graph-gallery.com">a link to the d3 graph gallery</a></p><h3 id="_1-3-构建svg图形" tabindex="-1"><a class="header-anchor" href="#_1-3-构建svg图形" aria-hidden="true">#</a> 1.3 构建svg图形</h3><ul><li>svg代表可缩放矢量图形。它是一种矢量图像格式。基本上，它是一种允许使用代码构建形状的语言</li><li>d3.js图表实际上是一组svg组合在一起的形状</li><li>d3.js展示了不同形状的svg</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE html&gt;
&lt;!-- 添加标题 --&gt;
&lt;h1&gt;First html document&lt;/h1&gt;

&lt;!-- 添加一行文字 --&gt;
&lt;p&gt;This is my first sentence&lt;/p&gt;

&lt;!-- 添加svg形状 --&gt;
&lt;svg&gt;
  &lt;circle style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=50 cy=50 r=40&gt;&lt;/circle&gt;
&lt;/svg&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p=e("h1",null,"First html document",-1),x=e("p",null,"This is my first sentence",-1),_=t(`<svg><circle style="fill:#69b3a2;" stroke="black" cx="50" cy="50" r="40"></circle></svg><h2 id="_2-d3绘图入门" tabindex="-1"><a class="header-anchor" href="#_2-d3绘图入门" aria-hidden="true">#</a> 2 d3绘图入门</h2><h3 id="_2-1-使用javascript和d3-js修改元素" tabindex="-1"><a class="header-anchor" href="#_2-1-使用javascript和d3-js修改元素" aria-hidden="true">#</a> 2.1 使用Javascript和d3.js修改元素</h3><p>JavaScript是前端的三大核心技术之一。它实现了网页的交互性。d3.js是一个javascript库，对数据可视化特别有用。它允许创建、选择和修改元素。在下面的示例中， d3用于选择目标圆形并修改其stroke-width。虽然它还不是很令人印象深刻，但是我们将使用相同的过程来设置数百个圆的位置并得到散点图。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;h1&gt;First html document&lt;/h1&gt;

    &lt;!-- 添加标题 --&gt;
    &lt;p&gt;This is my first sentence&lt;/p&gt;

    &lt;!-- 添加svg形状 --&gt;
    &lt;svg&gt;
        &lt;circle class=&quot;target&quot; style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=50 cy=50 r=40&gt;&lt;/circle&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        d3
            .select(&quot;.target&quot;)  // 选择target类
            .style(&quot;stroke-width&quot;, 8) // 修改svg图形轮廓
            .style(&quot;opacity&quot;, 0.5) // 修改svg图形透明度
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img1.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-2-console-log" tabindex="-1"><a class="header-anchor" href="#_2-2-console-log" aria-hidden="true">#</a> 2.2 Console.log()</h3><p>浏览器运行Html，css和Javascript并将结果显示为网页，如果出现问题，会在浏览器控制台中发出通知，你可以在右键单击页面打开-&gt;检查-&gt;console，打开控制台，或者直接按F1。比如在控制台中输入，console.log(&quot;sometext&quot;)，就可以打印sometext字符串。</p><h3 id="_2-3-坐标系" tabindex="-1"><a class="header-anchor" href="#_2-3-坐标系" aria-hidden="true">#</a> 2.3 坐标系</h3><p>构建d3.js图表首先创建一个svg元素。这个元素有width和height两个参数来控制大小，以像素为单位。左上角的坐标为x=0和y=0，左下角的坐标x=0和y=height，右上角的坐标x=width和height=0，和常见的图片坐标表示一样。显示三个圆的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;dataviz_area&quot; height=200 width=450&gt;&lt;/svg&gt;

    &lt;!-- 加载d3.js --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        var svg = d3.select(&quot;#dataviz_area&quot;)
        // 添加圆，cx和cy为圆心坐标，r为半径
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, 2).attr(&quot;cy&quot;, 2).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, 120).attr(&quot;cy&quot;, 70).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, 300).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);
    &lt;/script&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img2.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-4-比例尺" tabindex="-1"><a class="header-anchor" href="#_2-4-比例尺" aria-hidden="true">#</a> 2.4 比例尺</h3><p>如果想用百分比来表示svg中元素的位置，那么就需要用到比例尺，比例尺就是一个将像素值范围转换为位置百分比的函数。它被称为scale。如果我的数据是百分比并且我的svg区域是400px宽度。那么0%代表0px，100%代表400像素。50%代表200像素。比例尺有domain和range两个属性，range设置像素值范围，domain设置位置百分比。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;viz_area&quot; height=200 width=450&gt;&lt;/svg&gt;

    &lt;!-- 加载d3.js --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        // 选择svg绘图区域
        var svg = d3.select(&quot;#viz_area&quot;)

        // 创建比例尺
        // 将0到400像素映射到0%到100%
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);
        // 尝试console.log(x(25))以查看x函数的用途。

        // 以百分比设置图片尺寸
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(10)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(50)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(100)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img3.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-5-添加轴" tabindex="-1"><a class="header-anchor" href="#_2-5-添加轴" aria-hidden="true">#</a> 2.5 添加轴</h3><p>d3提供了一些自动绘制轴的功能。这些轴始终与比例尺scale对应。axisBottom()创建一个水平轴，底部带有刻度和标签。axisLeft()将用于Y 轴。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;viz_area&quot; height=200 width=450&gt;&lt;/svg&gt;

    &lt;!-- 加载d3.js --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        // 选择svg绘图区域
        var svg = d3.select(&quot;#viz_area&quot;)

        // 创建比例尺
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);

        // 显示与此比例对应的轴
        svg.call(d3.axisBottom(x));

        // 以百分比设置图片尺寸
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(10)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;blue&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(50)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;red&quot;);
        svg.append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, x(100)).attr(&quot;cy&quot;, 100).attr(&quot;r&quot;, 40).style(&quot;fill&quot;, &quot;green&quot;);
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img4.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-6-边距和偏移" tabindex="-1"><a class="header-anchor" href="#_2-6-边距和偏移" aria-hidden="true">#</a> 2.6 边距和偏移</h3><p>轴位置经常需要调整，例如，X轴通常位于图表的底部。这归功于translation函数，应用.attr(&quot;transform&quot;, &quot;translate(20,50)&quot;)到一个元素，将其向右平移 20 像素，向底部平移 50 像素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;div id=&quot;Area&quot;&gt;&lt;/div&gt;

    &lt;!-- 加载d3.js --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;

        // 设置图形的尺寸和边距
        var margin = { top: 10, right: 40, bottom: 30, left: 30 },
            width = 450 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // 将svg对象附加到页面主体
        var svg = d3.select(&quot;#Area&quot;)
            .append(&quot;svg&quot;)
            // 留下空白
            .attr(&quot;width&quot;, width + margin.left + margin.right)
            .attr(&quot;height&quot;, height + margin.top + margin.bottom)
            .append(&quot;g&quot;) // 添加标尺
            .attr(&quot;transform&quot;, &quot;translate(&quot; + margin.left + &quot;,&quot; + margin.top + &quot;)&quot;); // 平移图像

        // 创建x轴比例尺
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
        svg.append(&#39;g&#39;)
            .attr(&quot;transform&quot;, &quot;translate(0,&quot; + height + &quot;)&quot;)
            .call(d3.axisBottom(x));

        // 创建y轴比例尺
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        svg.append(&#39;g&#39;)
            .call(d3.axisLeft(y));

    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img5.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-7-数据绑定" tabindex="-1"><a class="header-anchor" href="#_2-7-数据绑定" aria-hidden="true">#</a> 2.7 数据绑定</h3><p>将数据绑定到svg元素是我们完成散点图所需的最后一步。在我看来，这也是最难理解的部分。它始终遵循相同的步骤：</p><ul><li>svg: 选择图表所在的 svg 区域</li><li>.selectAll(&quot;whatever&quot;): 选择所有尚未创建的元素，我知道这很奇怪。</li><li>.data(data): 指定要使用的数据。</li><li>.enter(): 开始数据循环。以下代码将应用于data[0]，data[1]依此类推。</li><li>.append(&quot;circle&quot;)：对于每次迭代，添加一个圆圈。</li><li>.attr(&quot;cx&quot;, function(d){ return x(d.x) }): 给出圆的x位置。这里d将是data[0]，然后data[1]等等。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;div id=&quot;scatter_area&quot;&gt;&lt;/div&gt;

    &lt;!-- 加载d3.js --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;

        // 设置图形的尺寸和边距
        var margin = { top: 10, right: 40, bottom: 30, left: 30 },
            width = 450 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // 将svg对象附加到页面主体
        var svG = d3.select(&quot;#scatter_area&quot;)
            .append(&quot;svg&quot;)
            .attr(&quot;width&quot;, width + margin.left + margin.right)
            .attr(&quot;height&quot;, height + margin.top + margin.bottom)
            .append(&quot;g&quot;)
            .attr(&quot;transform&quot;,
                &quot;translate(&quot; + margin.left + &quot;,&quot; + margin.top + &quot;)&quot;);

        // 创建数据
        var data = [{ x: 10, y: 20 }, { x: 40, y: 90 }, { x: 80, y: 50 }]

        // 创建x轴比例尺
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
        svG.append(&#39;g&#39;)
            .attr(&quot;transform&quot;, &quot;translate(0,&quot; + height + &quot;)&quot;)
            .call(d3.axisBottom(x));

        // 创建y轴比例尺
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        svG.append(&#39;g&#39;)
            .call(d3.axisLeft(y));

        // 添加数据
        svG.selectAll(&quot;whatever&quot;)
            .data(data)
            .enter()
            .append(&quot;circle&quot;)
            .attr(&quot;cx&quot;, function (d) { return x(d.x) })
            .attr(&quot;cy&quot;, function (d) { return y(d.y) })
            .attr(&quot;r&quot;, 7)
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程1/image/img6.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,30),f={href:"https://www.d3-graph-gallery.com/intro_d3js.html",target:"_blank",rel:"noopener noreferrer"};function y(w,j){const n=s("ExternalLinkIcon");return a(),d("div",null,[c,i("DOCTYPE html"),i(" 添加标题 "),o,i(" 添加一行文字 "),m,i(" 添加链接"),g,i(" 将特定样式应用于inGreen类的元素 "),i(" 添加标题，并添加相应的类 "),b,i(" 添加一行文字 "),h,i(" 添加链接 "),q,i(" 添加标题 "),p,i(" 添加一行文字 "),x,i(" 添加svg形状 "),_,e("ul",null,[e("li",null,[e("a",f,[r("intro_d3js"),u(n)])])])])}const k=l(v,[["render",y],["__file","2021-11-21-_数据与分析可视化_ D3入门教程1-d3基础知识.html.vue"]]);export{k as default};
