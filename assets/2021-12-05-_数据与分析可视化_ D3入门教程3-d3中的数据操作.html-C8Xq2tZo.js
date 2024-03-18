import{_ as n,r as t,o as l,c as a,a as e,b as s,d,e as r}from"./app-Bf4gfzXW.js";const u={},c=r(`<h1 id="数据与分析可视化-d3入门教程3-d3中的数据操作" tabindex="-1"><a class="header-anchor" href="#数据与分析可视化-d3入门教程3-d3中的数据操作"><span>[数据与分析可视化] D3入门教程3-d3中的数据操作</span></a></h1><p>d3.js是一个用于绘图的JavaScript库。 它可以可视化展示任何类型的数据。 这篇文章介绍d3.js最常见的数据操作任务，包括排序、过滤、分组、嵌套等。</p><h3 id="数学操作" tabindex="-1"><a class="header-anchor" href="#数学操作"><span>数学操作</span></a></h3><p>d3.max和d3.min就是获取数据每一列的最大值和最小值的函数，示例代码如下</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        var data = [[1,2,3],[4,5,6]];
        // 获取最大值
        var max_value = d3.max(data);
        // 获取第一列元素最小值
        var min_value = d3.min(data, function(d) { return d[0]});
        console.log(max_value); // 输出4,5,6
        console.log(min_value); // 输出1
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象和数组" tabindex="-1"><a class="header-anchor" href="#对象和数组"><span>对象和数组</span></a></h3><p>JavaScript的objects对象是被命名值的容器。我们可以用对象元素的名字来调用对象的任何元素，或者调用函数操作任何对象数值。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        // 1 调用元素
        var myObject = { name: &quot;Nicolas&quot;, sex: &quot;Male&quot;, age: 34 };
        console.log(myObject.name); // 输出Nicolas
        console.log(myObject[&quot;sex&quot;]); // 输出Male

        // 2 数组操作
        var myArray = [12, 34, 23, 12, 89]
        console.log(myArray[2]) // 输出23
        console.log(myArray[myArray.length - 1]) // 输出最后一个数值89
        myArray.pop(); // 删除数组的最后一个元素
        console.log(myArray[myArray.length - 1]) // 输出最后一个数值12
        myArray.push(34) // 数组末尾添加一个元素
        console.log(myArray[myArray.length - 1]) // 输出最后一个数值34
        console.log(myArray.indexOf(34)) // 输出数值34第一次出现的位置
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过滤filtering" tabindex="-1"><a class="header-anchor" href="#过滤filtering"><span>过滤Filtering</span></a></h3><p>d3中的数据过滤方法和常用计算机语言一样</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        var data = [&quot;first&quot;, &quot;second&quot;, &quot;third&quot;, &quot;fourth&quot;, &quot;first&quot;]
        var result = data.filter(function (d) { return d == &quot;first&quot; }) // 返回包含first的数组 
        console.log(result) // 输出[&quot;first&quot;,&quot;first&quot;]
        result = data.filter(function (d) { return d != &quot;first&quot; }) // 返回不包含first的数组 
        console.log(result) // 输出[&quot;second&quot;, &quot;third&quot;, &quot;fourth&quot;]
        result = data.filter(function (d) { return [&quot;first&quot;, &quot;third&quot;].includes(d) }) // 返回包含first和third的数组 
        console.log(result) // 输出[&quot;first&quot;,&quot;third&quot;, &quot;first&quot;]
        result = data.filter(function (d) { return ![&quot;first&quot;, &quot;third&quot;].includes(d) }) // 返回不包含first和third的数组 
        console.log(result) // 输出[&quot;second&quot;,&quot;fourth&quot;]
        var tokeep = [&quot;1&quot;, &quot;second&quot;, &quot;3&quot;] // 另外一种方法过滤
        result = data.filter(function (d) { return tokeep.indexOf(d) &gt;= 0 }) // 返回包含second的数组
        console.log(result) // 输出[&quot;second&quot;]
        result = data.filter(function (d, i) { return i &lt; 2 }) // 返回包含data前两个元素的数组
        console.log(result) // 输出[&quot;first&quot;,&quot;second&quot;]
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序sorting" tabindex="-1"><a class="header-anchor" href="#排序sorting"><span>排序Sorting</span></a></h3><p>d3中的数据排序方法和常用计算机语言一样</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        var data = [0, 3, 2, 4, 1, 2];
        var result1 = [0, 3, 2, 4, 1, 2].sort(function (a, b) { return a - b }) // 对data从小到大排序
        console.log(result1) // 输出 [0,1,2,2,3,4]
        var result2 = data.sort(function (a, b) { return b - a }) // 对data从大到小排序
        console.log(result2) // 输出 [4,3,2,2,1]
        var result3 = data.sort(function (a, b) { return d3.ascending(a, b) }) // 对data从小到大排序
        console.log(result3) // 输出 [0,1,2,2,3,4]
        var result4 = data.sort(function (a, b) { return d3.descending(a, b) }) // 对data从大到小排序
        console.log(result4) // 输出 [4,3,2,2,1]
        dataset = [
            { &#39;name&#39;: &quot;first&quot;, &#39;value&#39;: 1 },
            { &#39;name&#39;: &quot;third&quot;, &#39;value&#39;: 3 },
            { &#39;name&#39;: &quot;first&quot;, &#39;value&#39;: 10 },
            { &#39;name&#39;: &quot;second&quot;, &#39;value&#39;: 2 },
        ]
        // 根据dataset中name属性对dataset排序
        var result5 = dataset.sort(function (a, b) { return d3.ascending(a.name, b.name); });
        console.log(result5)
        // 根据dataset中value属性对dataset排序
        var result6 = dataset.sort(function (a, b) { return a.value - b.value })
        console.log(result6)
    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="映射group" tabindex="-1"><a class="header-anchor" href="#映射group"><span>映射group</span></a></h3><p>d3.map可以不改变原数组的情况下创建一个新的数组</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;!-- 加载d3 --&gt;
&lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

&lt;script&gt;
    data = [
        { &#39;name&#39;: &quot;first&quot;, &#39;value&#39;: 1 },
        { &#39;name&#39;: &quot;third&quot;, &#39;value&#39;: 3 },
        { &#39;name&#39;: &quot;first&quot;, &#39;value&#39;: 10 },
        { &#39;name&#39;: &quot;second&quot;, &#39;value&#39;: 2 },
    ]
    var allGroup = d3.map(data, function (d) { return (d.name) }) // 会去除重复元素
    // 输出[&#39;first&#39;,&#39;third&#39;,&#39;second&#39;]
    console.log(allGroup.keys()) // d3.map会自动给每个元素加上以索引为key的对象。
    console.log(allGroup.values()) // 输出值
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="循环loop" tabindex="-1"><a class="header-anchor" href="#循环loop"><span>循环loop</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;!-- 加载d3 --&gt;
&lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

&lt;script&gt;
    // for循环，输出0到9
    var i;
    for (i = 0; i &lt; 10; i++) {
        console.log(i)
    }

    // 打印列表元素的索引
    var allGroup = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];
    // 输出是0,1,2不是a,b,c
    for (i in allGroup) {
        console.log(i)
    }

    // while循环，输出0到9
    i = 0;
    while (i &lt; 10) {
        console.log(i)
        i++;
    }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重塑reshape" tabindex="-1"><a class="header-anchor" href="#重塑reshape"><span>重塑Reshape</span></a></h3><p>有的时候我们需要将数据长表变为宽表，如下图所示。在Python中可以通过pandas中的pivot_table实现，R语言中通过tidyr实现。在js则需要自行编写代码。所以强烈建议在js之外执行数据整理步骤。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程3/image/img0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们下面读取csv的数据如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程3/image/img1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        d3.csv(&quot;https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_correlogram.csv&quot;, function (data) {

            // Going from wide to long format
            var data_long = [];
            // 提取每一行数据
            data.forEach(function (d) {
                // 提取行名
                var x = d[&quot;&quot;];
                // 删除行名
                delete d[&quot;&quot;];
                for (prop in d) {
                    // 提取列名
                    var y = prop;
                    // 提取值
                    value = d[prop];
                    data_long.push({
                        x: x,
                        y: y,
                        value: +value
                    });
                }
            });

            // 展示结果
            console.log(data_long)
        });

    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="堆叠stack" tabindex="-1"><a class="header-anchor" href="#堆叠stack"><span>堆叠Stack</span></a></h3><p>有时我们需要堆叠数据（如第二行数据堆叠在原来第一行数据上展示），特别是对于条形图和面积图，可以通过d3.stack()实现。但是还是推荐数据处理放在js之外执行。下面的代码示例步骤如下图所示。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/[数据分析与可视化] D3入门教程/[数据与分析可视化] D3入门教程3/image/img2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    &lt;!-- 加载d3 --&gt;
    &lt;script src=&quot;https://d3js.org/d3.v4.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        d3.csv(&quot;https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv&quot;, function (data) {

            // 打印数据
            console.log(data)

            // 从第一列开始提取列名
            var subgroups = data.columns.slice(1)

            // 提取每一行数据
            var groups = d3.map(data, function (d) { return (d.group) }).keys()

            // 堆叠数据
            var stackedData = d3.stack()
                .keys(subgroups)
                (data)

            // 打印数据
            console.log(stackedData)

        })

    &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,30),o={href:"https://www.d3-graph-gallery.com/graph/basic_datamanipulation.html",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const i=t("ExternalLinkIcon");return l(),a("div",null,[c,e("ul",null,[e("li",null,[e("a",o,[s("Data manipulation in d3.js"),d(i)])])])])}const p=n(u,[["render",v],["__file","2021-12-05-_数据与分析可视化_ D3入门教程3-d3中的数据操作.html.vue"]]),E=JSON.parse('{"path":"/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-12-05-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3-d3%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C.html","title":"[数据与分析可视化] D3入门教程3-d3中的数据操作","lang":"zh-CN","frontmatter":{"date":"2021-12-05T17:57:54.000Z","category":["数据分析与可视化"],"tag":["数据分析与可视化","web","编程基础"],"description":"[数据与分析可视化] D3入门教程3-d3中的数据操作 d3.js是一个用于绘图的JavaScript库。 它可以可视化展示任何类型的数据。 这篇文章介绍d3.js最常见的数据操作任务，包括排序、过滤、分组、嵌套等。 数学操作 d3.max和d3.min就是获取数据每一列的最大值和最小值的函数，示例代码如下 对象和数组 JavaScript的objec...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96/D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/2021-12-05-_%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96_%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3-d3%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[数据与分析可视化] D3入门教程3-d3中的数据操作"}],["meta",{"property":"og:description","content":"[数据与分析可视化] D3入门教程3-d3中的数据操作 d3.js是一个用于绘图的JavaScript库。 它可以可视化展示任何类型的数据。 这篇文章介绍d3.js最常见的数据操作任务，包括排序、过滤、分组、嵌套等。 数学操作 d3.max和d3.min就是获取数据每一列的最大值和最小值的函数，示例代码如下 对象和数组 JavaScript的objec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3/image/img0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"数据分析与可视化"}],["meta",{"property":"article:tag","content":"web"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2021-12-05T17:57:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[数据与分析可视化] D3入门教程3-d3中的数据操作\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3/image/img0.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3/image/img1.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/web-Study-Notes/%5B%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E4%B8%8E%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/%5B%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%88%86%E6%9E%90%E5%8F%AF%E8%A7%86%E5%8C%96%5D%20D3%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B3/image/img2.png\\"],\\"datePublished\\":\\"2021-12-05T17:57:54.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":3,"title":"数学操作","slug":"数学操作","link":"#数学操作","children":[]},{"level":3,"title":"对象和数组","slug":"对象和数组","link":"#对象和数组","children":[]},{"level":3,"title":"过滤Filtering","slug":"过滤filtering","link":"#过滤filtering","children":[]},{"level":3,"title":"排序Sorting","slug":"排序sorting","link":"#排序sorting","children":[]},{"level":3,"title":"映射group","slug":"映射group","link":"#映射group","children":[]},{"level":3,"title":"循环loop","slug":"循环loop","link":"#循环loop","children":[]},{"level":3,"title":"重塑Reshape","slug":"重塑reshape","link":"#重塑reshape","children":[]},{"level":3,"title":"堆叠Stack","slug":"堆叠stack","link":"#堆叠stack","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{},"readingTime":{"minutes":5.35,"words":1606},"filePathRelative":"blog/数据分析与可视化/D3入门教程/2021-12-05-[数据与分析可视化] D3入门教程3-d3中的数据操作.md","localizedDate":"2021年12月6日","excerpt":"\\n<p>d3.js是一个用于绘图的JavaScript库。 它可以可视化展示任何类型的数据。 这篇文章介绍d3.js最常见的数据操作任务，包括排序、过滤、分组、嵌套等。</p>\\n<h3>数学操作</h3>\\n<p>d3.max和d3.min就是获取数据每一列的最大值和最小值的函数，示例代码如下</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>    &lt;!-- 加载d3 --&gt;\\n    &lt;script src=\\"https://d3js.org/d3.v4.js\\"&gt;&lt;/script&gt;\\n\\n    &lt;script&gt;\\n        var data = [[1,2,3],[4,5,6]];\\n        // 获取最大值\\n        var max_value = d3.max(data);\\n        // 获取第一列元素最小值\\n        var min_value = d3.min(data, function(d) { return d[0]});\\n        console.log(max_value); // 输出4,5,6\\n        console.log(min_value); // 输出1\\n    &lt;/script&gt;\\n</code></pre></div>","autoDesc":true}');export{p as comp,E as data};
