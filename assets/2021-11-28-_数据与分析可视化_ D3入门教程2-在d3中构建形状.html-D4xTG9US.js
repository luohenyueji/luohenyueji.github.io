import{_ as e,o as t,c as i,e as n}from"./app-DrqaGevo.js";const l={},s=n(`<h1 id="数据与分析可视化-d3入门教程2-在d3中构建形状" tabindex="-1"><a class="header-anchor" href="#数据与分析可视化-d3入门教程2-在d3中构建形状"><span>[数据与分析可视化] D3入门教程2-在d3中构建形状</span></a></h1><p>[toc]</p><p>d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 d3.js允许绘制形状，然后将各种形状构建一个图形。本文档描述了一些函数，可以更有效地从数据中绘制svg。</p><h2 id="形状的添加" tabindex="-1"><a class="header-anchor" href="#形状的添加"><span>形状的添加</span></a></h2><h3 id="圆形的添加" tabindex="-1"><a class="header-anchor" href="#圆形的添加"><span>圆形的添加</span></a></h3><p>在svg中绘制圆形。需要三个参数：分别代表圆心x位置的cx、圆心y位置的cy和半径的r。基础调用函数如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;circle style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=100 cy=100 r=40&gt;&lt;/circle&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们用javascript来实现它，这基本上是相同的过程。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 直接绘图 --&gt;
    &lt;svg&gt;
        &lt;circle style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; cx=100 cy=100 r=40&gt;&lt;/circle&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;circle&quot;&gt;&lt;/svg&gt;
    &lt;script&gt;
        // 创建svg元素
        var svg = d3.select(&quot;#circle&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, 200).attr(&quot;height&quot;, 200)

        // 设置属性
        // stroke设置轮廓颜色
        svg.append(&#39;circle&#39;).attr(&#39;cx&#39;, 100).attr(&#39;cy&#39;, 100).attr(&#39;r&#39;, 30).attr(&#39;stroke&#39;, &#39;black&#39;).attr(&#39;fill&#39;, &#39;red&#39;)
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色圆是由html绘图元素创建，红色圆是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="矩形的添加" tabindex="-1"><a class="header-anchor" href="#矩形的添加"><span>矩形的添加</span></a></h3><p>在svg中绘制矩形，四个参数是必需的：x，y，width和height。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;rect style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; x=10 y=100, width=300 height=40&gt;&lt;/rect&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们用javascript来实现它，这基本上是相同的过程。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 直接绘图 --&gt;
    &lt;svg&gt;
        &lt;rect style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; x=10 y=100, width=300 height=40&gt;&lt;/rect&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;rect&quot;&gt;&lt;/svg&gt;


    &lt;script&gt;
        // 创建svg元素
        var svg = d3.select(&quot;#rect&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, 800).attr(&quot;height&quot;, 200)

        // 设置属性
        svg.append(&#39;rect&#39;)
            .attr(&#39;x&#39;, 10)
            .attr(&#39;y&#39;, 120)
            .attr(&#39;width&#39;, 600)
            .attr(&#39;height&#39;, 40)
            .attr(&#39;stroke&#39;, &#39;black&#39;)
            .attr(&#39;fill&#39;, &#39;red&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色矩形是由html绘图元素创建，红色矩形是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="线段的添加" tabindex="-1"><a class="header-anchor" href="#线段的添加"><span>线段的添加</span></a></h3><p>在svg中绘制线段，四个参数是必需的：x0，y0，x1和y1（线段的两个顶点坐标）。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;line stroke=&quot;#69b3a2&quot; x0=10 y0=10, x1=500 y1=100&gt;&lt;/line&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们用javascript来实现它，这基本上是相同的过程。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 直接绘图 --&gt;
    &lt;svg&gt;
        &lt;line stroke=&quot;#69b3a2&quot; x0=10 y0=10, x1=300 y1=100&gt;&lt;/line&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;segment&quot;&gt;&lt;/svg&gt;

    &lt;script&gt;

        // 创建svg元素
        var svg = d3.select(&quot;#segment&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, 800).attr(&quot;height&quot;, 200)

        // 设置属性
        svg.append(&#39;line&#39;)
            .attr(&#39;x1&#39;, 10)
            .attr(&#39;y1&#39;, 10)
            .attr(&#39;x2&#39;, 700)
            .attr(&#39;y2&#39;, 100)
            .attr(&#39;stroke&#39;, &#39;red&#39;)
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色线段是由html绘图元素创建，红色线段是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="文本的添加" tabindex="-1"><a class="header-anchor" href="#文本的添加"><span>文本的添加</span></a></h3><p>在svg中添加文本，需要三个参数：x,y和text。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;text stroke=&quot;#69b3a2&quot; style=&quot;font-size: 19px&quot; x=100 y=50&gt;I&#39;m a piece of text&lt;/text&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们用javascript来实现它，这基本上是相同的过程。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 直接绘图 --&gt;
    &lt;svg&gt;
        &lt;text stroke=&quot;#69b3a2&quot; style=&quot;font-size: 19px&quot; x=100 y=80&gt;I&#39;m a piece of text&lt;/text&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;text&quot;&gt;&lt;/svg&gt;

    &lt;script&gt;

        // 创建svg元素
        var svg = d3.select(&quot;#text&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, 800).attr(&quot;height&quot;, 200)

        //设置属性
        svg.append(&#39;text&#39;)
            .attr(&#39;x&#39;, 60)
            .attr(&#39;y&#39;, 50)
            .attr(&#39;stroke&#39;, &#39;red&#39;)
            .style(&quot;font-size&quot;, 19)
            .text(&quot;I&#39;m another piece of text&quot;)
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色文本是由html绘图元素创建，红色文本是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="折线的添加" tabindex="-1"><a class="header-anchor" href="#折线的添加"><span>折线的添加</span></a></h3><p>在svg添加文本，参数比较复杂。具体如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;path style=&quot;fill: none&quot; stroke=&quot;black&quot; d=&quot;M0 20 L150 150 L300 100 L450 20 L600 130&quot;&gt;&lt;/path&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>幸运的是，d3.js提供可以更有效地绘制折线的函数</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 直接绘图 --&gt;
    &lt;svg height=200 width=600&gt;
        &lt;path style=&quot;fill: none&quot; stroke=&quot;#69b3a2&quot; d=&quot;M0 20 L150 150 L300 100 L450 20 L600 130&quot;&gt;&lt;/path&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;line&quot; height=200 width=600&gt;&lt;/svg&gt;

    &lt;script&gt;

        // 创建svg元素
        var svg = d3.select(&quot;#line&quot;).append(&quot;svg&quot;)

        // 创建数据，多个点连接成折线
        var data = [{ x: 0, y: 20 }, { x: 150, y: 150 }, { x: 300, y: 100 }, { x: 450, y: 20 }, { x: 600, y: 130 }]

        // 创建连接函数
        var lineFunc = d3.line()
            .x(function (d) { return d.x })
            .y(function (d) { return d.y })

        // 添加元素
        svg.append(&#39;path&#39;)
            .attr(&#39;d&#39;, lineFunc(data))
            .attr(&#39;stroke&#39;, &#39;red&#39;)
            .attr(&#39;fill&#39;, &#39;none&#39;);
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色线条是由html绘图元素创建，红色线条是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然可以设置线条类型，如下所示</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;curve&quot; height=300 width=600&gt;&lt;/svg&gt;

    &lt;script&gt;

        // 创建数据
        var data = [{ x: 0, y: 20 }, { x: 150, y: 150 }, { x: 300, y: 100 }, { x: 450, y: 20 }, { x: 600, y: 130 }]

        // 创建svg元素
        var svg = d3.select(&quot;#curve&quot;).append(&quot;svg&quot;).attr(&quot;width&quot;, 1800).attr(&quot;height&quot;, 200)

        // 创建辅助函数
        var curveFunc = d3.line()
            // 设置线条类型，具体设置参考官方文档，可以尝试curveStep.
            .curve(d3.curveBasis)
            .x(function (d) { return d.x })
            .y(function (d) { return d.y })

        svg.append(&#39;path&#39;)
            .attr(&#39;d&#39;, curveFunc(data))
            .attr(&#39;stroke&#39;, &#39;black&#39;)
            .attr(&#39;fill&#39;, &#39;none&#39;);

    &lt;/script&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="区域的添加" tabindex="-1"><a class="header-anchor" href="#区域的添加"><span>区域的添加</span></a></h3><p>html的svg标签原生语法画区域很麻烦，还是用js容易。原生代码如下所示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;path style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; d=&quot;M0 200 L0 20 L150 150 L300 100 L450 20 L600 130 L600 200&quot;&gt;&lt;/path&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>js代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
    &lt;!-- 原生绘图 --&gt;
    &lt;svg height=300 width=800&gt;
        &lt;path style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; d=&quot;M0 200 L0 20 L150 150 L300 100 L450 20 L600 130 L600 200&quot;&gt;&lt;/path&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;area&quot; height=300 width=800&gt;&lt;/svg&gt;

    &lt;script&gt;

        // 创建数据
        var data = [{ x: 0, y: 20 }, { x: 150, y: 150 }, { x: 300, y: 100 }, { x: 450, y: 20 }, { x: 600, y: 130 }]

        // 创建svg元素
        var svg = d3.select(&quot;#area&quot;).append(&quot;svg&quot;)

        // 创建辅助函数
        var curveFunc = d3.area()
            .x(function (d) { return d.x })
            .y1(function (d) { return d.y })     // 区域上边界坐标
            .y0(200)                             // 区域下边界坐标

        // 添加属性
        svg.append(&#39;path&#39;)
            .attr(&#39;d&#39;, curveFunc(data))
            .attr(&#39;stroke&#39;, &#39;black&#39;)
            .attr(&#39;fill&#39;, &#39;red&#39;);

    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="圆弧的添加" tabindex="-1"><a class="header-anchor" href="#圆弧的添加"><span>圆弧的添加</span></a></h3><p>圆弧的添加也是一样，js最好。原生代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;path style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; transform=&quot;translate(400,200)&quot; d=&quot;M0,149 A150,150,0,0,1,-0.47,-149.9 L-0.3,-99.9 A100,100,0,0,0,0.15,99.9Z&quot;&gt;&lt;/path&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们使用d3.arc()辅助函数来绘制相同类型的形状。我们需要提供4个参数：innerRadius、outerRadius、startAngle、endAngle</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
    &lt;!-- 原生绘图 --&gt;
    &lt;svg height=400 width=400&gt;
        &lt;path style=&quot;fill: #69b3a2&quot; stroke=&quot;black&quot; transform=&quot;translate(400,200)&quot;
            d=&quot;M0,149 A150,150,0,0,1,-0.47,-149.9 L-0.3,-99.9 A100,100,0,0,0,0.15,99.9Z&quot;&gt;&lt;/path&gt;
    &lt;/svg&gt;

    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;!-- 添加一个空的svg图片 --&gt;
    &lt;svg id=&quot;arc&quot; height=400 width=400&gt;&lt;/svg&gt;

    &lt;script&gt;
        // 创建svg元素
        var svg = d3.select(&quot;#arc&quot;).append(&quot;svg&quot;)
        // 添加弧形
        svg
            .append(&quot;path&quot;)
            .attr(&quot;transform&quot;, &quot;translate(400,100)&quot;) // 平移距离
            .attr(&quot;d&quot;, d3.arc()
                .innerRadius(100) // 内圈半径
                .outerRadius(150) // 外圈半径
                .startAngle(3.14)     // 开始角度（弧度），最下方为3.14
                .endAngle(3.14 * 1.6)       // 结束角度（弧度）
            )
            .attr(&#39;stroke&#39;, &#39;black&#39;)
            .attr(&#39;fill&#39;, &#39;red&#39;);
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中蓝色圆弧是由html绘图元素创建，红色圆弧是通过js创建</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程2/image/img8.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2><p>https://www.d3-graph-gallery.com/graph/shape.html</p>`,57),a=[s];function d(r,v){return t(),i("div",null,a)}const c=e(l,[["render",d],["__file","2021-11-28-_数据与分析可视化_ D3入门教程2-在d3中构建形状.html.vue"]]),o=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-11-28-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2-%E5%9C%A8d3%E4%B8%AD%E6%9E%84%E5%BB%BA%E5%BD%A2%E7%8A%B6.html","title":"[数据与分析可视化] D3入门教程2-在d3中构建形状","lang":"zh-CN","frontmatter":{"date":"2021-11-28T15:28:15.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","编程基础","web"],"description":"[数据与分析可视化] D3入门教程2-在d3中构建形状 [toc] d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 d3.js允许绘制形状，然后将各种形状构建一个图形。本文档描述了一些函数，可以更有效地从数据中绘制svg。 形状的添加 圆形的添加 在svg中绘制圆形。需要三个参数：分别代表圆心x位置的cx、圆心y...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-11-28-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2-%E5%9C%A8d3%E4%B8%AD%E6%9E%84%E5%BB%BA%E5%BD%A2%E7%8A%B6.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据与分析可视化] D3入门教程2-在d3中构建形状"}],["meta",{"property":"og:description","content":"[数据与分析可视化] D3入门教程2-在d3中构建形状 [toc] d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 d3.js允许绘制形状，然后将各种形状构建一个图形。本文档描述了一些函数，可以更有效地从数据中绘制svg。 形状的添加 圆形的添加 在svg中绘制圆形。需要三个参数：分别代表圆心x位置的cx、圆心y..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:tag","content":"web"}],["meta",{"property":"article:published_time","content":"2021-11-28T15:28:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据与分析可视化] D3入门教程2-在d3中构建形状\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img1.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img2.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img3.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img4.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img5.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img6.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img7.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B2/image/img8.png\\"],\\"datePublished\\":\\"2021-11-28T15:28:15.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"形状的添加","slug":"形状的添加","link":"#形状的添加","children":[{"level":3,"title":"圆形的添加","slug":"圆形的添加","link":"#圆形的添加","children":[]},{"level":3,"title":"矩形的添加","slug":"矩形的添加","link":"#矩形的添加","children":[]},{"level":3,"title":"线段的添加","slug":"线段的添加","link":"#线段的添加","children":[]},{"level":3,"title":"文本的添加","slug":"文本的添加","link":"#文本的添加","children":[]},{"level":3,"title":"折线的添加","slug":"折线的添加","link":"#折线的添加","children":[]},{"level":3,"title":"区域的添加","slug":"区域的添加","link":"#区域的添加","children":[]},{"level":3,"title":"圆弧的添加","slug":"圆弧的添加","link":"#圆弧的添加","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{},"readingTime":{"minutes":7.85,"words":2354},"filePathRelative":"blog/数据分析与可视化/D3入门教程/2021-11-28-[数据与分析可视化] D3入门教程2-在d3中构建形状.md","localizedDate":"2021年11月28日","excerpt":"\\n<p>[toc]</p>\\n<p>d3.js是一个用于绘图的JavaScript 库。 它可以可视化展示任何类型的数据。 d3.js允许绘制形状，然后将各种形状构建一个图形。本文档描述了一些函数，可以更有效地从数据中绘制svg。</p>\\n<h2>形状的添加</h2>\\n<h3>圆形的添加</h3>\\n<p>在svg中绘制圆形。需要三个参数：分别代表圆心x位置的cx、圆心y位置的cy和半径的r。基础调用函数如下：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>&lt;circle style=\\"fill: #69b3a2\\" stroke=\\"black\\" cx=100 cy=100 r=40&gt;&lt;/circle&gt;\\n</code></pre></div>","autoDesc":true}');export{c as comp,o as data};
