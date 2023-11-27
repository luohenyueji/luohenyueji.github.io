import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as r,c,a as i,b as a,d as e,e as n}from"./app-MsA2k2kn.js";const o={},v=i("h1",{id:"常用工具-mermaid学习笔记",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#常用工具-mermaid学习笔记","aria-hidden":"true"},"#"),a(" [常用工具] mermaid学习笔记")],-1),m={href:"https://mermaid-js.github.io/mermaid",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/mermaid-js/mermaid",target:"_blank",rel:"noopener noreferrer"},g=n('<p>[toc]</p><h2 id="_1-使用和部署mermaid" tabindex="-1"><a class="header-anchor" href="#_1-使用和部署mermaid" aria-hidden="true">#</a> 1 使用和部署mermaid</h2><h3 id="_1-1-部署" tabindex="-1"><a class="header-anchor" href="#_1-1-部署" aria-hidden="true">#</a> 1.1 部署</h3><p>mermaid有四种使用方式：</p><ol><li>使用mermaid网页版编辑器。</li><li>在您熟悉的程序中使用mermaid插件。</li><li>调用mermaid的Javascript API。</li><li>将mermaid部署为依赖项。</li></ol><h6 id="_1-1-1-使用mermaid网页版编辑器" tabindex="-1"><a class="header-anchor" href="#_1-1-1-使用mermaid网页版编辑器" aria-hidden="true">#</a> 1.1.1 使用mermaid网页版编辑器</h6>',6),b={href:"https://mermaid-js.github.io/mermaid-live-editor",target:"_blank",rel:"noopener noreferrer"},h=n('<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] mermaid学习笔记/image/1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>网页中各个部件的作用如下所示：</p><ul><li>Diagram presets: 预设待绘画的图表形式；</li><li>Code: 编辑mermaid的绘图代码；</li><li>Preview: 预览生成的图片；</li><li>Mermaid Configuration：Mermaid的配置设置；</li><li>Editing history：编辑历史；</li><li>Links：相关链接；</li><li>Actions：图片导出选项；</li></ul><h6 id="_1-1-2-使用mermaid插件" tabindex="-1"><a class="header-anchor" href="#_1-1-2-使用mermaid插件" aria-hidden="true">#</a> 1.1.2 使用mermaid插件</h6>',4),p={href:"https://mermaid-js.github.io/mermaid/#/./integrations",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mermaid-js.github.io/mermaid/#/usage",target:"_blank",rel:"noopener noreferrer"},A=n(`<h6 id="_1-1-3-调用mermaid的javascript-api。" tabindex="-1"><a class="header-anchor" href="#_1-1-3-调用mermaid的javascript-api。" aria-hidden="true">#</a> 1.1.3 调用mermaid的Javascript API。</h6><p>此方法可以与任何常见的Web服务器一起使用。Apache，IIS，nginx，node express，您可以自由选择。您还需要一个文本编辑工具（如Notepad ++）来生成html文件。然后，通过网络浏览器（例如Firefox，Chrome，Safari和Internet Explorer）进行部署。该API通过从源中提取渲染指令mermaid.js以渲染页面中的图表来工作。</p><p>在编写html文件时，我们在html代码中给web浏览器三条指令：</p><ol><li>通过mermaid.js或mermaid.min.js获取通过mermaid的渲染模块。具体为对外部CDN的引用或作为单独文件的mermaid.js的引用：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
  &lt;script src=&quot;https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>我们要创建的图表的mermaid代码。<strong>每个mermaid.图表/图形/图表定义都必须具有单独的div标签</strong></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
  Here is a mermaid diagram:
  &lt;div class=&quot;mermaid&quot;&gt;
    graph TD
    A[Client] --&gt; B[Load Balancer]
    B --&gt; C[Server01]
    B --&gt; D[Server02]
  &lt;/div&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>调用mermaid.initialize()以指示图的外观，或启动呈现过程。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;body&gt;
  &lt;script&gt;mermaid.initialize({startOnLoad:true});&lt;/script&gt;
&lt;/body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用实例例代码如下（创建html文件，输入以下代码）</p><ul><li>通过CDN调用mermaidAPI</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;html&gt;

&lt;body&gt;
    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;mermaid.initialize({ startOnLoad: true });&lt;/script&gt;

    Here is one mermaid diagram:
    &lt;div class=&quot;mermaid&quot;&gt;
        graph TD
        A[Client] --&gt; B[Load Balancer]
        B --&gt; C[Server1]
        B --&gt; D[Server2]
    &lt;/div&gt;

    And here is another:
    &lt;div class=&quot;mermaid&quot;&gt;
        graph TD
        A[Client] --&gt;|tcp_123| B(Load Balancer)
        B --&gt;|tcp_456| C[Server1]
        B --&gt;|tcp_456| D[Server2]
    &lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>将mermaid.js作为单独的JavaScript文件进行引用</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class=&quot;mermaid&quot;&gt;
        graph LR
        A --- B
        B--&gt;C[fa:fa-ban forbidden]
        B--&gt;D(fa:fa-spinner);
    &lt;/div&gt;
    &lt;div class=&quot;mermaid&quot;&gt;
        graph TD
        A[Client] --&gt; B[Load Balancer]
        B --&gt; C[Server1]
        B --&gt; D[Server2]
    &lt;/div&gt;
    &lt;script src=&quot;The\\Path\\In\\Your\\Package\\mermaid.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;mermaid.initialize({ startOnLoad: true });&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_1-1-4-将mermaid部署为依赖项" tabindex="-1"><a class="header-anchor" href="#_1-1-4-将mermaid部署为依赖项" aria-hidden="true">#</a> 1.1.4 将mermaid部署为依赖项</h6><p>具体步骤如下：</p><ol><li>安装node v10或12，其中将包含npm；</li><li>使用NPM下载yarn，并输入命令npm install -g yarn；</li><li>在yarn安装完成后，输入命令yarn add mermaid；</li><li>将mermaid添加为dev依赖项；</li></ol><h6 id="_1-1-5-markdown内嵌" tabindex="-1"><a class="header-anchor" href="#_1-1-5-markdown内嵌" aria-hidden="true">#</a> 1.1.5 markdown内嵌</h6><p>某些markdown编译器会内嵌mermaid，只要输入以下语法就可以直接渲染mermaid图。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] mermaid学习笔记/image/3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如下图所示，如果下面markdown展现为图表示支持该markdown编译器支持mermaid，否则不支持。</p>`,21),_=i("h3",{id:"_1-2-基础配置",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-2-基础配置","aria-hidden":"true"},"#"),a(" 1.2 基础配置")],-1),J=i("h6",{id:"_1-2-1-绘图类型",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-2-1-绘图类型","aria-hidden":"true"},"#"),a(" 1.2.1 绘图类型")],-1),L=i("p",null,"mermaid提供如下绘图类型。其中名字加粗的绘图类型在本文会提及到使用用法，其他绘图类型可以参看文档链接。",-1),S=i("thead",null,[i("tr",null,[i("th",null,"绘图类型"),i("th",null,"文档链接")])],-1),w=i("td",null,[i("strong",null,"流程图Flowcharts")],-1),D={href:"https://mermaid-js.github.io/mermaid/#/flowchart",target:"_blank",rel:"noopener noreferrer"},C=i("td",null,[i("strong",null,"时序图Sequence diagrams")],-1),f={href:"https://mermaid-js.github.io/mermaid/#/sequenceDiagram",target:"_blank",rel:"noopener noreferrer"},k=i("td",null,"类图Class diagrams",-1),y={href:"https://mermaid-js.github.io/mermaid/#/classDiagram",target:"_blank",rel:"noopener noreferrer"},F=i("td",null,[i("strong",null,"状态图State diagrams")],-1),M={href:"https://mermaid-js.github.io/mermaid/#/stateDiagram",target:"_blank",rel:"noopener noreferrer"},T=i("td",null,"实体关系图Entity Relationship Diagrams",-1),B={href:"https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram",target:"_blank",rel:"noopener noreferrer"},I=i("td",null,[i("strong",null,"用户历程图User Journey Diagram")],-1),U={href:"https://mermaid-js.github.io/mermaid/#/user-journey",target:"_blank",rel:"noopener noreferrer"},E=i("td",null,[i("strong",null,"甘特图Gantt diagrams")],-1),V={href:"https://mermaid-js.github.io/mermaid/#/gantt",target:"_blank",rel:"noopener noreferrer"},q=i("td",null,"饼图Pie chart diagrams",-1),K={href:"https://mermaid-js.github.io/mermaid/#/pie",target:"_blank",rel:"noopener noreferrer"},R=i("td",null,"需求图Requirement Diagram",-1),j={href:"https://mermaid-js.github.io/mermaid/#/requirementDiagram",target:"_blank",rel:"noopener noreferrer"},Y=i("h6",{id:"_1-2-2-configuration配置",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#_1-2-2-configuration配置","aria-hidden":"true"},"#"),a(" 1.2.2 configuration配置")],-1),z={href:"https://mermaid-js.github.io/mermaid/#/Setup",target:"_blank",rel:"noopener noreferrer"},Q=n(`<p><strong>主题设置</strong></p><p>对于主题设置，主要有&#39;default&#39;, &#39;forest&#39;, &#39;dark&#39;, &#39;neutral&#39;, &#39;null&#39;等选项。通过mermaid配置文件修改即可。在mermaid在线编辑器种修改方式如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[常用工具] mermaid学习笔记/image/2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>此外我们也可以直接在代码中修改主题配置，如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>%%{init: {&#39;theme&#39;:&#39;forest&#39;}}%%
  graph TD
    a --&gt; b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),N={href:"https://mermaid-js.github.io/mermaid/#/theming",target:"_blank",rel:"noopener noreferrer"},X=n(`<p><strong>注释</strong></p><p>可以在流程图中输入注释，解析器将忽略它们。注释必须自己一行，并且必须以%%（双百分号）开头。 注释开始到下一个换行符之后的所有文本都将被视为注释，包括任何绘图语法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
%% this is a comment A -- text --&gt; B{node}
   A -- text --&gt; B -- text2 --&gt; C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),G=n(`<h2 id="_2-绘图语法" tabindex="-1"><a class="header-anchor" href="#_2-绘图语法" aria-hidden="true">#</a> 2 绘图语法</h2><h3 id="_2-1-流程图flowcharts" tabindex="-1"><a class="header-anchor" href="#_2-1-流程图flowcharts" aria-hidden="true">#</a> 2.1 流程图Flowcharts</h3><p>所有流程图均由节点，几何形状和边缘，箭头或线条组成。mermaid代码定义了制作这些节点和边缘并进行交互的方式。它还可以适应不同的箭头类型，多向箭头以及与子图之间的链接。值得注意的是：不要将“end”作为流程图节点键入。将所有或任何一个字母大写，以防止流程图中断，即“End”或“END”。流程图各种部件如下介绍。</p><p><strong>节点node(默认)</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,5),O=n(`<p><strong>带有文本的节点</strong></p><p>也可以在框中设置与id不同的文本。如果多次执行此操作，则将使用为节点找到的最后一个文本。此外，如果稍后为节点定义边，则可以忽略文本定义。渲染时将使用前面定义的n那个。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1[This is the text in the box]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,3),P=n(`<p><strong>图形graph</strong></p><p>该语句声明了流程图的方向。这声明了图的方向是从上到下（TD或TB）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    Start --&gt; Stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,3),H=n(`<p>以下语句声明了图的方向是从左到右（LR）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    Start --&gt; Stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),W=n(`<p><strong>流程图方向</strong> 以下语句声明可能的流程图方向为：</p><ul><li>TB - top to bottom 从上到下</li><li>TD - top-down/ same as top to bottom 自顶向下/类似从上至下</li><li>BT - bottom to top 从下到上</li><li>RL - right to left 从右到左</li><li>LR - left to right 从左到右</li></ul><p><strong>节点形状</strong></p><ol><li>具有圆边的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1(This is the text in the box)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,5),Z=n(`<ol start="2"><li>体育场形状的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1([This is the text in the box])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),$=n(`<ol start="3"><li>子程序形状的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1[[This is the text in the box]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ee=n(`<ol start="4"><li>圆柱状的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1[(Database)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ie=n(`<ol start="5"><li>圆形式的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1((This is the text in the circle))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ne=n(`<ol start="6"><li>不对称形状的节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1&gt;This is the text in the box]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),de=n(`<ol start="7"><li>菱形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1{This is the text in the box}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ae=n(`<ol start="8"><li>六角形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1{{This is the text in the box}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),se=n(`<ol start="9"><li>平行四边形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    id1[/This is the text in the box/]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),te=n(`<ol start="10"><li>平行四边形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    id1[/This is the text in the box/]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),le=n(`<ol start="11"><li>梯形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    A[/Christmas\\]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),re=n(`<ol start="12"><li>梯形节点</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    B[\\Go shopping/]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ce=n(`<p><strong>节点之间的链接</strong></p><ol><li>带箭头的链接</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A--&gt;B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,3),oe=n(`<ol start="2"><li>开放链接</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A --- B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ve=n(`<ol start="3"><li>链接上的文本</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A-- This is the text! ---B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),me=n(`<p>或者</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A---|This is the text|B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ue=n(`<ol start="4"><li>带箭头和文本的链接</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A--&gt;|text|B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ge=n(`<p>或者</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    A-- text --&gt;B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),be=n(`<p><strong>点链接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR;
   A-.-&gt;B;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),he=n(`<p><strong>带文本的点链接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
   A-. text .-&gt; B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),pe=n(`<p><strong>粗链接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
   A ==&gt; B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),xe=n(`<p><strong>带文本的粗链接</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
   A == text ==&gt; B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ae=n(`<p><strong>多链接</strong> 可以按照以下方式在同一行中声明许多链接：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
   A -- text --&gt; B -- text2 --&gt; C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),_e=n(`<p>也可以根据以下情况在同一行中声明多个节点链接（&amp;表示和）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
   a --&gt; b &amp; c--&gt; d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Je=n(`<p>然后，您可以以一种非常有表现力的方式描述依赖关系。 像下面的单线：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TB
    A &amp; B--&gt; C &amp; D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Le=n(`<p>如果使用基本语法描述相同的图，则将花费四行。 一言以蔽之，这可能会使图表变得过分沉重，难以阅读。</p><p><strong>测试版本：新箭头类型</strong></p><p>使用flowchart而不是graph时，根据下文支持新类型的箭头(某些编译器可能不支持)：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>flowchart LR
    A --o B
    B --x C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),Se=n(`<p><strong>测试版本：多向箭头</strong></p><p>使用flowchart而不是graph时，有可能使用多向箭头。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>flowchart LR
    A o--o B
    B &lt;--&gt; C
    C x--x D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),we=n(`<p><strong>概括</strong></p><p>对于点链接或粗链接，要添加的字符等于符号或点，如下表所概括：</p><table><thead><tr><th>长度</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><td>正常</td><td>---</td><td>----</td><td>-----</td></tr><tr><td>带箭头</td><td>--&gt;</td><td>---&gt;</td><td>----&gt;</td></tr><tr><td>粗链接</td><td>===</td><td>====</td><td>=====</td></tr><tr><td>粗链接带箭头</td><td>==&gt;</td><td>===&gt;</td><td>====&gt;</td></tr><tr><td>点链接</td><td>-.-</td><td>-..-</td><td>-...-</td></tr><tr><td>点链接带箭头</td><td>-.-&gt;</td><td>-..-&gt;</td><td>-...-&gt;</td></tr></tbody></table><p><strong>特殊字符</strong></p><p>可以将文本放在引号中，以呈现更麻烦的字符。 如下例所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
    id1[&quot;This is the (text) in the box&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),De=n(`<p><strong>子图Subgraphs</strong></p><p>基础语法见</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>subgraph title
    graph definition
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TB
    c1--&gt;a2
    subgraph one
    a1--&gt;a2
    end
    subgraph two
    b1--&gt;b2
    end
    subgraph three
    c1--&gt;c2
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),Ce=n(`<p>您还可以为子图设置一个显式 ID。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TB
    c1--&gt;a2
    subgraph ide1 [one]
    a1--&gt;a2
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),fe=n(`<p>使用graphtype流程图，也可以如下图所示在子图之间设置边线。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>flowchart TB
    c1--&gt;a2
    subgraph one
    a1--&gt;a2
    end
    subgraph two
    b1--&gt;b2
    end
    subgraph three
    c1--&gt;c2
    end
    one --&gt; two
    three --&gt; two
    two --&gt; c2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ke=n(`<p><strong>fontawesome的支持</strong> 可以从字体中添加图标。图标通过语法fa:#icon class name#.访问。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
    B[&quot;fa:fa-twitter for peace&quot;]
    B--&gt;C[fa:fa-ban forbidden]
    B--&gt;D(fa:fa-spinner);
    B--&gt;E(A fa:fa-camera-retro perhaps?);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ye=n(`<h3 id="_2-2-时序图sequence-diagrams" tabindex="-1"><a class="header-anchor" href="#_2-2-时序图sequence-diagrams" aria-hidden="true">#</a> 2.2 时序图Sequence diagrams</h3><p>时序图是一种交互图，它显示了进程如何相互操作以及以什么顺序进行操作。mermaid基础时序图语法如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;&gt;John: Hello John, how are you?
    John--&gt;&gt;Alice: Great!
    Alice-)John: See you later!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),Fe=n(`<p>以下介绍基础语法。</p><p><strong>参与者</strong> 可以像在此页上的第一个示例中那样隐式定义参与者。参与者或演员在图表源文本中按出现顺序进行渲染。有时，您可能想以不同的顺序向参与者显示与第一条消息中的参与者不同的顺序。通过执行以下操作可以指定参与者的出现顺序：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    participant John
    participant Alice
    Alice-&gt;&gt;John: Hello John, how are you?
    John--&gt;&gt;Alice: Great!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),Me=n(`<p><strong>别名</strong> 参与者可以具有方便的标识符和描述性标签。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    participant A as Alice
    participant J as John
    A-&gt;&gt;J: Hello John, how are you?
    J-&gt;&gt;A: Great!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Te=n(`<p><strong>消息</strong> 消息可以是实线或虚线显示的两种。基础语法如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Actor][Arrow][Actor]:Message text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当前支持六种类型的箭头：</p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>-&gt;</td><td>实线无箭头</td></tr><tr><td>--&gt;</td><td>虚线无箭头</td></tr><tr><td>-&gt;&gt;</td><td>实线带箭头</td></tr><tr><td>--&gt;&gt;</td><td>虚线带箭头</td></tr><tr><td>-x</td><td>实线末端带有叉号</td></tr><tr><td>--x</td><td>虚线末端带有叉字</td></tr><tr><td>-)</td><td>实线末端带有空心箭头</td></tr><tr><td>--)</td><td>虚线末端带有空心箭头</td></tr></tbody></table><p><strong>激活方式</strong> 可以激活和停用参与者。激活和停用声明如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;&gt;John: Hello John, how are you?
    activate John
    John--&gt;&gt;Alice: Great!
    deactivate John
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),Be=n(`<p>通过在消息箭头后面添加+/-后缀，还有一种快捷方式表示法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;&gt;+John: Hello John, how are you?
    John--&gt;&gt;-Alice: Great!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ie=n(`<p>对于同一参与者可以堆叠激活：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;&gt;+John: Hello John, how are you?
    Alice-&gt;&gt;+John: John, can you hear me?
    John--&gt;&gt;-Alice: Hi Alice, I can hear you!
    John--&gt;&gt;-Alice: I feel great!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ue=n(`<p><strong>注解</strong> 可以在时序图中添加注解。添加的语法为Note [ right of | left of | over ] [Actor]</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    participant John
    Note right of John: Text in note
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ee=n(`<p>也可以创建跨越两个参与者的注解：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;John: Hello John, how are you?
    Note over Alice,John: A typical interaction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ve=n(`<p><strong>循环</strong> 可以在时序图中表达循环。语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>loop Loop text
... statements ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;John: Hello John, how are you?
    loop Every minute
        John--&gt;Alice: Great!
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),qe=n(`<p><strong>替代</strong> 可以在顺序图中表达替代路径。语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alt Describing text
... statements ...
else
... statements ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或是否有可选的序列（如果没有其他序列）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>opt Describing text
... statements ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请参见下面的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    Alice-&gt;&gt;Bob: Hello Bob, how are you?
    alt is sick
        Bob-&gt;&gt;Alice: Not so good :(
    else is well
        Bob-&gt;&gt;Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob-&gt;&gt;Alice: Thanks for asking
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),Ke=n(`<p><strong>平行</strong> 可以显示并行发生的动作。语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>par [Action 1]
... statements ...
and [Action 2]
... statements ...
and [Action N]
... statements ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请参见下面的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    par Alice to Bob
        Alice-&gt;&gt;Bob: Hello guys!
    and Alice to John
        Alice-&gt;&gt;John: Hello guys!
    end
    Bob--&gt;&gt;Alice: Hi Alice!
    John--&gt;&gt;Alice: Hi Alice!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),Re=n(`<p>也可以嵌套并行块。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    par Alice to Bob
        Alice-&gt;&gt;Bob: Go help John
    and Alice to John
        Alice-&gt;&gt;John: I want this done today
        par John to Charlie
            John-&gt;&gt;Charlie: Can we do this today?
        and John to Diana
            John-&gt;&gt;Diana: Can you help us today?
        end
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),je=n(`<p><strong>背景高亮</strong> 通过提供彩色背景可以高亮背景。颜色是使用rgb和rgba语法定义的。如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rect rgb(0, 255, 0)
... content ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rect rgba(0, 0, 255, .1)
... content ...
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请参阅以下示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sequenceDiagram
    participant Alice
    participant John

    rect rgb(191, 223, 255)
    note right of Alice: Alice calls John.
    Alice-&gt;&gt;+John: Hello John, how are you?
    rect rgb(200, 150, 255)
    Alice-&gt;&gt;+John: John, can you hear me?
    John--&gt;&gt;-Alice: Hi Alice, I can hear you!
    end
    John--&gt;&gt;-Alice: I feel great!
    end
    Alice -&gt;&gt;+ John: Did you want to go to the game tonight?
    John --&gt;&gt;- Alice: Yeah! See you there.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),Ye=n(`<h3 id="_2-3-状态图state-diagrams" tabindex="-1"><a class="header-anchor" href="#_2-3-状态图state-diagrams" aria-hidden="true">#</a> 2.3 状态图State diagrams</h3><p>状态图是计算机科学和相关领域中用来描述系统行为的一种图。状态图要求所描述的系统由有限个状态组成；有时，情况确实如此，而有时这是一种合理的抽象。 mermaid可以渲染状态图。该语法尝试与plantUml中使用的语法兼容，因为这将使用户更容易在mermaid和plantUml之间共享图。PlantUML是一个开源项目，支持绘制UML图。</p><p>具体语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    [*] --&gt; Still
    Still --&gt; [*]

    Still --&gt; Moving
    Moving --&gt; Still
    Moving --&gt; Crash
    Crash --&gt; [*]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),ze={href:"https://blog.csdn.net/lxd8731247769/article/details/48533091",target:"_blank",rel:"noopener noreferrer"},Qe=n(`<p><strong>状态</strong> 可以通过多种方式声明状态。最简单的方法是将状态ID定义为描述。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ne=n(`<p>另一种方法是使用state关键字，其说明如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    state &quot;This is a state description&quot; as s2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Xe=n(`<p>用描述定义状态的另一种方法是定义状态id，后跟冒号和描述：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    s2 : This is a state description
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ge=n(`<p><strong>过渡</strong> 过渡是一种状态进入另一种状态时的路径/边缘。使用文本箭头“-&gt;”表示。当您定义两个状态之间的转换并且尚未定义状态时，将使用转换中的ID来定义未定义状态。您以后可以在以这种方式定义的状态中添加描述。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    s1 --&gt; s2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Oe=n(`<p>可以向过渡添加文本。描述它代表什么。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    s1 --&gt; s2: A transition
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Pe=n(`<p><strong>开始和结束</strong> 有两种特殊状态指示图的开始和停止。这些是用[*]语法编写的，转换到它的方向将其定义为开始或停止状态。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    [*] --&gt; s1
    s1 --&gt; [*]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),He=n(`<p><strong>复合状态</strong> 在现实世界中使用状态图时，您通常会遇到多维图，因为一个状态可以具有多个内部状态。这些在本术语中称为复合状态。为了定义一个复合状态，您需要使用state关键字，后跟一个ID和{}之间的复合状态的主体。请参见下面的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    [*] --&gt; First
    state First {
        [*] --&gt; second
        second --&gt; [*]
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),We=n(`<p>您可以在多个层中执行此操作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    [*] --&gt; First

    state First {
        [*] --&gt; Second

        state Second {
            [*] --&gt; second
            second --&gt; Third

            state Third {
                [*] --&gt; third
                third --&gt; [*]
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),Ze=n(`<p>您还可以在复合状态之间定义过渡：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    [*] --&gt; First
    First --&gt; Second
    First --&gt; Third

    state First {
        [*] --&gt; fir
        fir --&gt; [*]
    }
    state Second {
        [*] --&gt; sec
        sec --&gt; [*]
    }
    state Third {
        [*] --&gt; thi
        thi --&gt; [*]
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),$e=n(`<p><strong>fork</strong> 可以使用&lt;&lt; fork &gt;&gt; &lt;&lt; join &gt;&gt;在图中指定一个fork。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   stateDiagram-v2
    state fork_state &lt;&lt;fork&gt;&gt;
      [*] --&gt; fork_state
      fork_state --&gt; State2
      fork_state --&gt; State3

      state join_state &lt;&lt;join&gt;&gt;
      State2 --&gt; join_state
      State3 --&gt; join_state
      join_state --&gt; State4
      State4 --&gt; [*]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ei=n(`<p><strong>注解</strong> 有时，没有什么比说注解更好的了。状态图中也是如此。在这里，您可以选择将注解放在节点的右侧或左侧。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --&gt; State2
    note left of State2 : This is the note to the left.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ii=n(`<h3 id="_2-4-用户历程图user-journey-diagram" tabindex="-1"><a class="header-anchor" href="#_2-4-用户历程图user-journey-diagram" aria-hidden="true">#</a> 2.4 用户历程图User Journey Diagram</h3><p>用户历程高度详细地描述了不同用户在系统，应用程序或网站内为完成特定任务所采取的步骤。该技术显示了当前（按原样）的用户工作流程，并揭示了将来的工作流程需要改进的地方。这个图mermaid提供的api不多，主要例子如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>journey
    title My working day
    section Go to work
      %% 任务语法为Task name: &lt;score&gt;: &lt;comma separated list of actors&gt;
      %% Make tea：参与者
      %% 5：分数评价，一般0到5，分数越高越好
      %% Me：参与者
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),ni=n(`<h3 id="_2-5-甘特图gantt-diagrams" tabindex="-1"><a class="header-anchor" href="#_2-5-甘特图gantt-diagrams" aria-hidden="true">#</a> 2.5 甘特图Gantt diagrams</h3><p>甘特图是一种条形图，它说明了一个项目进度表以及完成任何一个项目所需的时间。甘特图说明了项目的终端元素和摘要元素的开始日期和结束日期之间的天数。</p><p>甘特图会将每个计划的任务记录为一个从左到右延伸的连续条形图。x轴代表时间，y轴记录不同的任务以及完成任务的顺序。重要的是要记住，当“排除”特定于某个任务的日期，日期或日期集合时，甘特图将通过向右延长相等的天数来适应这些变化，而不是通过在内部形成间隙来适应这些变化。但是，如果排除的日期介于设置为连续开始的两个任务之间，则排除的日期将以图形方式跳过并留空，并且以下任务将在排除日期结束后开始。甘特图有助于跟踪项目完成前所需的时间，但也可以用于以图形方式表示“非工作日”，只需稍作调整。Mermaid可以将甘特图呈现为SVG，PNG或可以粘贴到文档中的MarkDown链接。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),di=n(`<p>具体语法如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>gantt
    %% 设定时间格式
    dateFormat  YYYY-MM-DD
    %% 标题
    title       Adding GANTT diagram functionality to mermaid
    %% excludes\`接受YYYY-MM-DD格式的特定日期、一周中的几天（“星期日”）或“周末”，但不接受“工作日”一词
    excludes    weekends
    %% (\`excludes\` accepts specific dates in YYYY-MM-DD format, days of the week (&quot;sunday&quot;) or &quot;weekends&quot;, but not the word &quot;weekdays&quot;.)

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ai=n(`<p><strong>基础语法</strong></p><p>基础语法如下，task表示任务，state表示状态。name表示任务别名，name可有可无。start time和end time表示开始结束时间，或者直接设定执行时间time。对于时间的设置具体看上面的语法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>task: state, name，start time, end time

or

task: state, name，time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于state值，主要有以下几种状态。</p><ul><li>done 完成</li><li>active 活跃</li><li>crit 关键</li><li>为空 未来任务</li></ul><p>对于状态值，可以两两组合，比如crit, active表示关键的活跃任务。如果是done,active只会表示为active。因为不可能出现某个任务既完成又活跃的情况。</p><p><strong>输入日期格式</strong> 默认输入日期格式为YYYY-MM-DD。您可以定义您的自定义dateFormat。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dateFormat YYYY-MM-DD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>支持以下格式选项：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Input       Example             Description:
YYYY        2014                4 digit year
YY          14                  2 digit year
Q           1..4                Quarter of year. Sets month to first month in quarter.
M MM        1..12               Month number
MMM MMMM    January..Dec        Month name in locale set by moment.locale()
D DD        1..31               Day of month
Do          1st..31st           Day of month with ordinal
DDD DDDD    1..365              Day of year
X           1410715640.579      Unix timestamp
x           1410715640579       Unix ms timestamp
H HH        0..23               24 hour time
h hh        1..12               12 hour time used with a A.
a A         am pm               Post or ante meridiem
m mm        0..59               Minutes
s ss        0..59               Seconds
S           0..9                Tenths of a second
SS          0..99               Hundreds of a second
SSS         0..999              Thousandths of a second
Z ZZ        +12:00              Offset from UTC as +-HH:mm, +-HHmm, or Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function si(ti,li){const s=t("ExternalLinkIcon"),d=t("Mermaid");return r(),c("div",null,[v,i("p",null,[a("mermaid是一个基于Javascript的图表绘制工具，类似markdown用文本语法，用于描述文档图形(流程图、 时序图、甘特图)，开发者可以通过一段mermaid文本来生成SVG或者PNG形式的图形。如果熟悉Markdown，则学习Mermaid的语法不会有任何问题。mermaid官方文档见"),i("a",m,[a("mermaid"),e(s)]),a("，mermaid官方仓库见"),i("a",u,[a("mermaid-js"),e(s)]),a("。")]),g,i("p",null,[a("mermaid的网页版编辑器地址如下："),i("a",b,[a("mermaid-live-editor"),e(s)]),a("。打开该网页后界面如下图所示：")]),h,i("p",null,[a("使用插件，您可以从流行的应用程序中生成mermaid图，就像使用实时编辑器一样。mermaid插件使用见"),i("a",p,[a("mermaid插件列表"),e(s)]),a("和"),i("a",x,[a("mermaid插件用法"),e(s)]),a("。")]),A,e(d,{id:"mermaid-187",code:"eJxTgIL0osSCDIUQFy6YgGO0c05mal5JrIKurp2CU7RPfmKKglNiTmJecmpRLFyZE1jaOTo4tagstcgQXcIFKmEUywUAYZsaUQ=="}),_,J,L,i("table",null,[S,i("tbody",null,[i("tr",null,[w,i("td",null,[i("a",D,[a("flowchart"),e(s)])])]),i("tr",null,[C,i("td",null,[i("a",f,[a("sequenceDiagram"),e(s)])])]),i("tr",null,[k,i("td",null,[i("a",y,[a("classDiagram"),e(s)])])]),i("tr",null,[F,i("td",null,[i("a",M,[a("stateDiagram"),e(s)])])]),i("tr",null,[T,i("td",null,[i("a",B,[a("entityRelationshipDiagram"),e(s)])])]),i("tr",null,[I,i("td",null,[i("a",U,[a("user-journey"),e(s)])])]),i("tr",null,[E,i("td",null,[i("a",V,[a("gantt"),e(s)])])]),i("tr",null,[q,i("td",null,[i("a",K,[a("pie"),e(s)])])]),i("tr",null,[R,i("td",null,[i("a",j,[a("requirementDiagram"),e(s)])])])])]),Y,i("p",null,[a("mermaid的configuration配置很多，具体见"),i("a",z,[a("mermaidAPI"),e(s)]),a("。")]),Q,e(d,{id:"mermaid-302",code:"eJxTVa3OzMsssVKoVi/JSM1NVbdST8svSi0uUa+tVVXlUlBIL0osyFAIcQEyFRQSFXR17RSSuADS8g9S"}),i("p",null,[a("关于自定义主题见"),i("a",N,[a("theming"),e(s)])]),X,e(d,{id:"mermaid-313",code:"eJxLL0osyFDwCeJSVVUoycgsVgCiRIXk/Nzc1LwSBUcFXV2FktSKEiBtp+BUnZefklrLpaCALgHjGYG5zlwAVRcX3w=="}),G,e(d,{id:"mermaid-327",code:"eJxLL0osyFDwCeJSAILMFC4AKWMEMg=="}),O,e(d,{id:"mermaid-335",code:"eJxLL0osyFDwCeJSAILMFMPokIzMYgUgKslIVShJrShRyMwDs5PyK2K5AFBZDrY="}),P,e(d,{id:"mermaid-343",code:"eJxLL0osyFAIceFSAILgksSiEgVdXTsgK7+ACwB17wfr"}),H,e(d,{id:"mermaid-348",code:"eJxLL0osyFDwCeJSAILgksSiEgVdXTsgK7+ACwB2ZQfx"}),W,e(d,{id:"mermaid-390",code:"eJxLL0osyFDwCeJSAILMFEONkIzMYgUgKslIVShJrShRyMwDs5PyKzS5AEn3Dk8="}),Z,e(d,{id:"mermaid-399",code:"eJxLL0osyFDwCeJSAILMFEON6JCMzGIFICrJSFUoSa0oUcjMA7OT8itiNbkAaLAPBw=="}),$,e(d,{id:"mermaid-408",code:"eJxLL0osyFDwCeJSAILMFMPo6JCMzGIFICrJSFUoSa0oUcjMA7OT8itiY7kAb3gPbg=="}),ee,e(d,{id:"mermaid-417",code:"eJxLL0osyFDwCeJSAILMFMNoDZfEksSkxOJUzVguAIBmCIE="}),ie,e(d,{id:"mermaid-426",code:"eJxLL0osyFDwCeJSAILMFEMNjZCMzGIFICrJSFUoSa0oUcjMA7OTM4uSc1I1NbkAkmQPyQ=="}),ne,e(d,{id:"mermaid-435",code:"eJxLL0osyFDwCeJSAILMFEO7kIzMYgUgKslIVShJrShRyMwDs5PyK2K5AEzzDpk="}),de,e(d,{id:"mermaid-444",code:"eJxLL0osyFDwCeJSAILMFMPqkIzMYgUgKslIVShJrShRyMwDs5PyK2q5AFRZDvY="}),ae,e(d,{id:"mermaid-453",code:"eJxLL0osyFDwCeJSAILMFMPq6pCMzGIFICrJSFUoSa0oUcjMA7OT8itqa7kAd/gP7g=="}),se,e(d,{id:"mermaid-462",code:"eJxLL0osyFAIceFSAILMFMNo/ZCMzGIFICrJSFUoSa0oUcjMA7OT8iv0Y7kAaKwPDg=="}),te,e(d,{id:"mermaid-471",code:"eJxLL0osyFAIceFSAILMFMNo/ZCMzGIFICrJSFUoSa0oUcjMA7OT8iv0Y7kAaKwPDg=="}),le,e(d,{id:"mermaid-480",code:"eJxLL0osyFAIceFSAALHaH3njKLM4pLcxOKYWC4AeOwIkQ=="}),re,e(d,{id:"mermaid-489",code:"eJxLL0osyFAIceFSAAKn6Bj3fIXijPyCgsy8dP1YLgCLSgki"}),ce,e(d,{id:"mermaid-501",code:"eJxLL0osyFDwCeJSAAJHXV07Jy4ANcoEgA=="}),oe,e(d,{id:"mermaid-510",code:"eJxLL0osyFDwCeJSAAJHBV1dXQUnLgA+lgSv"}),ve,e(d,{id:"mermaid-519",code:"eJxLL0osyFDwCeJSAAJHXV2FkIzMYgUgKslIVShJrShRVNDV1XXiAgDoXgsE"}),me,e(d,{id:"mermaid-524",code:"eJxLL0osyFDwCeJSAAJHXV3dmpCMzGIFICrJSFUoSa0oqXHiAgDNJgtB"}),ue,e(d,{id:"mermaid-533",code:"eJxLL0osyFDwCeJSAAJHXV27mpLUipIaJy4AXggHPQ=="}),ge,e(d,{id:"mermaid-538",code:"eJxLL0osyFDwCeJSAAJHXV2FktSKEgVdXTsnLgBoMAbf"}),be,e(d,{id:"mermaid-543",code:"eJxLL0osyFDwCbLmUlBQcNTV07VzsuYCAEEIBQQ="}),he,e(d,{id:"mermaid-548",code:"eJxLL0osyFDwCeJSUFBw1NVTKEmtKFHQ07VTcOICAGn7BuE="}),pe,e(d,{id:"mermaid-553",code:"eJxLL0osyFDwCeJSUFBwVLC1tVNw4gIAOy8EwA=="}),xe,e(d,{id:"mermaid-558",code:"eJxLL0osyFDwCeJSUFBwVLC1VShJrSgB0nYKTlwAcaQHPw=="}),Ae,e(d,{id:"mermaid-563",code:"eJxLL0osyFDwCeJSUFBwVNDVVShJrSgB0nYKTjCeEZjrzAUA+SAKqw=="}),_e,e(d,{id:"mermaid-568",code:"eJxLL0osyFDwCeJSUFBIVNDVtVNIUlBTSAYxUrgAcZ8GxQ=="}),Je,e(d,{id:"mermaid-573",code:"eJxLL0osyFAIceJSAAJHBTUFJ11dOwVnIMOFCwBksAXr"}),Le,e(d,{id:"mermaid-584",code:"eJxLy8kvT85ILCpR8AniUgACRwVd3XwFJzDbCciuUHDmAgDEmgjK"}),Se,e(d,{id:"mermaid-592",code:"eJxLy8kvT85ILCpR8AniUgACR4V8Xd18BScwx0nBRlfXTsEZzHFWqNDVrVBw4QIAZDML1g=="}),we,e(d,{id:"mermaid-710",code:"eJxLL0osyFDwCeJSAILMFMNopZCMzGIFICrJSFXQKEmtKNFUyMwD85LyK5RiuQCBAg9L"}),De,e(d,{id:"mermaid-722",code:"eJxLL0osyFAIceJSAIJkQ11du0QjMLu4NAkil5+XqqCq+nzNmic7Gp7sWPV07YSns/eBlSQiKU/NS0HVVlKeD9W2qwdVWxJIWxIubRlFqXD7OlE1gp2XjNAIAMYARFg="}),Ce,e(d,{id:"mermaid-727",code:"eJxLL0osyFAIceJSAIJkQ11du0QjMLu4NAkil5mSaqgQnZ+XGgsWT0RSk5qXwgUAOboQpw=="}),fe,e(d,{id:"mermaid-732",code:"eJxLy8kvT85ILCpRCHHiUgCCZENdXbtEIzC7uDQpvSixIEMhPy8VLJCIJJmal4KqqKQ8HyyQBFKUhEtRRlEqxCywRcmoyoD2KABF4UaBVaOKlOeD+UCNAP9rL9s="}),ke,e(d,{id:"mermaid-737",code:"eJxFzDsKgDAQRdHeVQxWWmQDCoq/HdiJxagTk8IkTAJu30hAX3su72R0CuYxg7h+ySVWEkW4dQjEIC2DI9wpX1MgRDMsqdnQvL7p4yDz81gk9k4bQ1zWn0xFB8l2vIhRMAW28Z8VOt/G8gGiGSpD"}),ye,e(d,{id:"mermaid-745",code:"eJwrTi0sTc1LTnXJTEwvSszlUgACx5zM5FRdOzuv/Iw8KwWP1JycfAUQW0chI79cIbEoVaEyv9QerBQkrAtUCtZipeBelJpYoohkiCbEjOBUsB6FnMSS1CJFLgCSZSQ5"}),Fe,e(d,{id:"mermaid-753",code:"eJwrTi0sTc1LTnXJTEwvSszlUgCCgsSikszkzILEvBIFr/yMPAxBx5zM5FSwKJila2cHUmal4JGak5MP1qKjkJFfrpBYlKpQmV9qD1YKEtYFKgVrsVJwL0pNLFHkAgChNSie"}),Me,e(d,{id:"mermaid-758",code:"eJxlyksKgCAUheF5qzjNawMNCiEo3MVFLimYmg+i3WdOO8Pz/Ymvwk7xauiIdHaoCxSzUSaQyxCgBGGN4h/Jj6TXrokY51lO2Nla394B2t+gyHh8WVojayMmbJEp990LlJUlYA=="}),Te,e(d,{id:"mermaid-848",code:"eJwrTi0sTc1LTnXJTEwvSszlUgACx5zM5FRdOzuv/Iw8KwWP1JycfAUQW0chI79cIbEoVaEyv9QerDQxuSSzLLEkFSwPFgExdIGawYZYKbgXpSaWKIJlUlJRVQMAiG8mfA=="}),Be,e(d,{id:"mermaid-853",code:"eJwrTi0sTc1LTnXJTEwvSszlUgACx5zM5FRdOzttr/yMPCsFj9ScnHwFEFtHISO/XCGxKFWhMr/UHqwWJKwLVKsL1mSl4F6UmliiyAUA1LYa9w=="}),Ie,e(d,{id:"mermaid-858",code:"eJxtzD0KhDAQhuHeU3zWay6whcvCFqu3GMKnCcQEoyLe3vy0TjUwzzsb14Ne82dljrI0SPN1VlP1/WsMxr/xp3MBee9gwgmJxBWOz5OtSovPAoYSsbDKfFJJqpKkt7bGHYYSFJyq9lEPmEiHOVL2trkBNf43JA=="}),Ue,e(d,{id:"mermaid-863",code:"eJw9jLEORVAQRHtfMY2feN1LVAqVThQ3N4tN2GUtUfh43IipJjNnZqVlI4lUcOgtTBluzcGcI89BHKUOksI8R6VOaGDcDw7tcGKk7nW6k6FF84+u1qZFwj/4OfqhpsPBArm77ALghigZ"}),Ee,e(d,{id:"mermaid-868",code:"eJwli0sOQEAQBfdO8Q7ABSyIxEIs3KEzeaGTMc0YxO39alWLqo3rzuDYqoxR5gwPjVfHouptCiU6em94PcdkJyQSl+31Vw6WCDsY/yf/lwbpWtSJh4bEKC6phewGTl0jTA=="}),Ve,e(d,{id:"mermaid-877",code:"eJwdjEsOQDAYhPdOMfZ6AQsiIcQtGiY0qf6UEren/VaTeZ08At3E1ujF6y3DT2PNRFWNsroSA60VRF1glQfaE6+EOjWtyI7upn+xGRcuJjcSB0pV6apE76mvPIV0c/YBpzAjhQ=="}),qe,e(d,{id:"mermaid-890",code:"eJxtTjtuwkAQ7XOK1yClSC7ggihREqVKlQtM7MFeedmBHSOgo6Ch4gBUiANQIoQElwEEt2C9CCqepph5ep9R7vbYpfxpKPfUfkLAuzUpvzabH/Kf4IetFYT1BYX0QZ4xlN5bFDYaOM52+83itFoetuPIka1gFGrSMt41gjvExdgEv1JBBblIhuQ5atgq16Z+6Hps+ma2xuVoedYC1pQMQkZGh9cAl90eOkyX59Gknvk6ctKp8DWoPCF4O+KUH1f8FeRKRUs8SMtQdk++ADcXXZI="}),Ke,e(d,{id:"mermaid-899",code:"eJwrTi0sTc1LTnXJTEwvSszlUgCCgsQiBceczORUhZJ8Baf8JLAgCIAFde3sgGJWCh6pOTn5CumllcWKYAWJeSkIXV75GXkY2kCCmPpS81LANNBQXaAisGKgqkyINogakE6skgDcezYs"}),Re,e(d,{id:"mermaid-904",code:"eJxtj00OwiAQhfee4l3AC3RRozUxeouxTISkDrWFNL29DCia6Gwg7+eDmfkRWXo+OrpNdN8gzUgT9oPrGcHj4K9Z1Mnitm2T1uDkYXkYcfFWcoLEfGpV/e6p2OCMhSQgWDfDeNG4obWG9XUNKqWzNA2Oq6ejXmK9rAYdCRZOpELMsF1t6KfetLSj0D9WNgpp9bGsFX9QLCbf9XwC5NxX+g=="}),je,e(d,{id:"mermaid-914",code:"eJxtULtOAzEQ7PMVkw7EXZQ7dAVXBCGlSGipKBdnY1vy2cFxFPH32GseCsTF2tqdmR3Pkd9P7BWvLelI0wz5HCgmq+yBfMKTs4r/dZ+D8TPpRlYJUb/ddA9dg76/z2UYbmXmQ2JEq01C2FelsV5Q5NxRZBYClW67Wt2V1ogNOxdk3MCEMygyPsLp8XJlv1w26IZcflb+0akKinxhwzBFTFxVyqjNyPbL18ZWcoOtEAScWXNBs99dZW2xZ3bQkSldIus/ixUhjVjbnbg4lwBTgA6lJsPQNHF++5LUrznInu/YXpnMHC8sORRW5MXsE5NNgoo="}),Ye,e(d,{id:"mermaid-925",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCaK1YBV1dO4XgksycHLAImAUWA8pxoQn55pdl5qWDBSFMNM1Igs5FicUZYEEwC24iALvaJAQ="}),i("p",null,[a("如上图所示，在状态图中，根据系统状态以及系统状态如何通过转换更改为另一个状态来描述系统。上面的示例图显示了三个状态：静止，移动和崩溃。您从静止状态开始。在“静止”中，您可以将状态更改为“移动中”。在“移动”中，您可以将状态更改回“静止”或“崩溃”。从“静止”到“崩溃”没有过渡。具体介绍见"),i("a",ze,[a("UML之状态图（State Diagram）"),e(s)])]),Qe,e(d,{id:"mermaid-933",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCYkMuAGIpBuQ="}),Ne,e(d,{id:"mermaid-938",code:"eJwrLkksSXXJTEwvSszVLTPiUgACsJiCUkhGZrECECVCBVJSi5OLMgtKMvPzlBQSixWKjbgAkbgUmA=="}),Xe,e(d,{id:"mermaid-943",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCYiMFK4WQjMxiBSBKVAArUUhJLU4uyiwoyczP4wIAzw4ReQ=="}),Ge,e(d,{id:"mermaid-948",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCYkMFXV07hWIjLgCY2whh"}),Oe,e(d,{id:"mermaid-953",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCYkMFXV07hWIjKwVHhZKixLzizJLM/DwuADOUDWc="}),Pe,e(d,{id:"mermaid-958",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCaK1YBV1dO4ViQzC32BDMA4pyAQA5GwuG"}),He,e(d,{id:"mermaid-963",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCaK1YBV1dOwW3zKLiErAIWBWEr1ANFkFWV5yanJ+XAheGcMEyQBVg4VouAPCGGvc="}),We,e(d,{id:"mermaid-968",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCaK1YBV1dOwW3zKLiEi6wEFgZREChGiyCrDA4NTk/LwWiEqEaIoqkHFlLMUQLshRECCwbkpFZhGQewkywBJqRyMaWgDWiy4JFwfJAdSiytXAehFXLBQAX8D49"}),Ze,e(d,{id:"mermaid-973",code:"eJwrLkksSXXJTEwvSszVLTPiUgCCaK1YBV1dOwW3zKLiErAImAUWC05Nzs9LQRMMycgsSuECC4LNg0pVg0WQTUzLLIKLAdlgMaAcWKwWST/EFiwGFKcmw8WAbJwGgF2ERX9JRiZcDMhG0w8ATgtA9w=="}),$e,e(d,{id:"mermaid-978",code:"eJxTUFAoLkksSXXJTEwvSszVLTPiAgpBxBTS8ouy4yFMGxsQx84OLKugEK0Vq6Cra4ekAiqBpAUkHwxiQYzELmfMBZWEiGflZ+bBbQRx4DZCTAJrRChCljPGLodkItxSE2R9JmBxoIe4AKE/TXI="}),ei,e(d,{id:"mermaid-983",code:"eJxFTjEOwjAM3PuK4wGtREcGJhZmWBgtSBtLJEaJod8ncVrV8nD2ne4uK6m7MM2JQv8bO5S51d/xhLt3MB4LqwchijpTVIDEs1fItOqNqHMNH0lKUcFxkhRIWeIBD/niSRFL4tVlc8qDnS6+9oTmib4/N9iaWe7bTXvsiNqTM8pq6WsKFcNVOHR/HCBFgw=="}),ii,e(d,{id:"mermaid-991",code:"eJxdjT0OgzAMRvee4jtAl6rqkrWVOmXqCaxiteYnRokR4vZAACnC43v2c61DDDxdsIyJtQw/YdTYSPihok0k/ppowFthmm3GgKeGYUwODwfPO13Whj4ZSUwO90K8tmOH2wqveJKd+3/tikylYzhC5YePWHYHnQF4ZDfD"}),ni,e(d,{id:"mermaid-1002",code:"eJxdTcsKwjAQvPcr5gNaaGJPuRWCnnrSi8fFxBq0CaT7/5hXERwC2Z3HzkqeuUMCO/5YzLhkBtrRGmkriiG25xA3YuCeMCzLoHWRdvtgFzyu9S/cDKb9nacGRaKHHMU0jCK9HqfRVKcP/LLx51f05LSTAHKiuo6O5i7cLSecz1rrOO4LmbNC1iz9N0BBTqb7AsZ9QLs="}),di,e(d,{id:"mermaid-1007",code:"eJyVU8FO4zAQvfMVo0hIIKWrpnRXbG9VK1YrLXviwg1jT1pDYlf2BOjfM7aTkLSAwCcn4/fmzZuZjTBEJ8BHCcIr62pBALd8JtfXk/U6hkhTheHCZ6mUNhv4s/x/cwNKi40TNZSNkaStEZWmPZCFGplIq4jGF1k1Cn24PyM+olE+Bk5P4eyui96BkBJ35MHvUOpSy6jIgzYDOVBGhTnH9h5sCbTFSApnmW8M/83OwTrIukRZDvcNgbGUnlqnUjAQZD/OT6ISj1E+LLtb/Luy9a5CQgUk/GNbfzwLZQ3m0TX0RQ6zaTGfTIvJ9FfeXy8jx5LpnvCIIHCIGGIW5pgNOH7ncJGcu2qoce+D+xuDL3IQJaFriX4egWefgOcDMBMxeOTIymnSUlSRJ7XtwBbuT3BWdg8rbRAW4ZO7FG0aujPfRo6/gaJGQ7ATznN2YRQ8aM8Z32QOOXqNwe1U4MohDwjwjPDQ8Fx0VKNSE0dn9Tu+svyx9DGyNfMol+PhQjfKtmh18YYMVuCgcd3b4sDntZVN8EP007dGzxLuEeKKgt9z8OWjGRJsy9CittAgJcG7TWVhCmvLXm3aUhcJJwqA0KrUnwAUvDTbwPgBlJdA9mkTfH65HZf1T3iWPtipr1WVKon036nkW+qD1lcDZWyX"}),ai])}const oi=l(o,[["render",si],["__file","2021-05-22-_常用工具_ mermaid学习笔记.html.vue"]]);export{oi as default};
