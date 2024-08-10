import{_ as e,r as p,o,c,a as n,b as a,d as t,e as i}from"./app-7i6QNW5x.js";const l={},u=n("h1",{id:"python-基于tablib库处理表格数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-基于tablib库处理表格数据"},[n("span",null,"[python] 基于Tablib库处理表格数据")])],-1),d={href:"https://github.com/jazzband/tablib",target:"_blank",rel:"noopener noreferrer"},r={href:"https://tablib.readthedocs.io/en/stable/",target:"_blank",rel:"noopener noreferrer"},k=i(`<p>Tablib需要在Python3.6+版本下安装，安装命令如下：</p><blockquote><p>pip install tablib</p></blockquote><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> tablib
<span class="token comment">## 查看版本</span>
tablib<span class="token punctuation">.</span>__version__
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;3.4.0&#39;
</code></pre><p>[toc]</p><h2 id="_1-tablib使用" tabindex="-1"><a class="header-anchor" href="#_1-tablib使用"><span>1 Tablib使用</span></a></h2><h3 id="_1-1-表格创建" tabindex="-1"><a class="header-anchor" href="#_1-1-表格创建"><span>1.1 表格创建</span></a></h3><p><strong>创建数据结构</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建表</span>
data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token builtin">type</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>tablib.core.Dataset
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 查看表格名字，默认为空</span>
data<span class="token punctuation">.</span>title 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 设置表的名字</span>
data<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&#39;data&#39;</span>
data<span class="token punctuation">.</span>title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;data&#39;
</code></pre><p><strong>数据添加</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 添加行</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Jane&#39;</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 查看数据,list格式</span>
data<span class="token punctuation">.</span><span class="token builtin">dict</span>
<span class="token comment">## 或者</span>
<span class="token comment">## print(data)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[[&#39;John&#39;, 28], [&#39;Tom&#39;, 16], [&#39;Jane&#39;, 32]]
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 添加标题行</span>
data<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## data.dict</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
John|28 
Tom |16 
Jane|32 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 添加列</span>
<span class="token comment">## 需要和当前行数一致</span>
data<span class="token punctuation">.</span>append_col<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;USA&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;UK&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;UK&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> header<span class="token operator">=</span><span class="token string">&#39;Country&#39;</span><span class="token punctuation">)</span>
<span class="token comment">## data.dict</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age|Country
----|---|-------
John|28 |USA    
Tom |16 |UK     
Jane|32 |UK     
</code></pre><p><strong>选择行或列</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 选择第一行</span>
data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(&#39;John&#39;, 28, &#39;USA&#39;)
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 选择第一行第三列</span>
data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;USA&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 选择列</span>
data<span class="token punctuation">[</span><span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[28, 16, 32]
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 获得表头</span>
data<span class="token punctuation">.</span>headers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;Name&#39;, &#39;Age&#39;, &#39;Country&#39;]
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 基于索引获得列</span>
data<span class="token punctuation">.</span>get_col<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;John&#39;, &#39;Tom&#39;, &#39;Jane&#39;]
</code></pre><p><strong>删除行或列</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 删除列</span>
<span class="token keyword">del</span> data<span class="token punctuation">[</span><span class="token string">&#39;Country&#39;</span><span class="token punctuation">]</span>
<span class="token comment">## 删除行</span>
<span class="token comment">## del data[:-1]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
John|28 
Tom |16 
Jane|32 
</code></pre><p><strong>行列高级操作</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 表格转置</span>
transposed_data <span class="token operator">=</span> data<span class="token punctuation">.</span>transpose<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>transposed_data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|John|Tom|Jane
----|----|---|----
Age |28  |16 |32  
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 读取数据维度</span>
data<span class="token punctuation">.</span>width<span class="token punctuation">,</span>data<span class="token punctuation">.</span>height
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(2, 3)
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 按照字段排序</span>
<span class="token comment">## 年龄从大到小排序</span>
data <span class="token operator">=</span> data<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token string">&quot;Age&quot;</span><span class="token punctuation">,</span>reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
Jane|32 
John|28 
Tom |16 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 计算平均年龄</span>
ages <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
<span class="token builtin">float</span><span class="token punctuation">(</span><span class="token builtin">sum</span><span class="token punctuation">(</span>ages<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">len</span><span class="token punctuation">(</span>ages<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>25.333333333333332
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 移除第一行</span>
tmp <span class="token operator">=</span> data<span class="token punctuation">.</span>lpop<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
John|28 
Tom |16 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 第一行添加数据</span>
data<span class="token punctuation">.</span>lpush<span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>tmp<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
Jane|32 
John|28 
Tom |16 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 在最左侧插入一列数据</span>
new_column <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Engineer&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Doctor&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;Doctor&#39;</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>lpush_col<span class="token punctuation">(</span>new_column<span class="token punctuation">,</span> header<span class="token operator">=</span><span class="token string">&#39;Profession&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Profession|Name|Age
----------|----|---
Engineer  |Jane|32 
Doctor    |John|28 
Doctor    |Tom |16 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 移除最后一行</span>
<span class="token comment">## data.pop()</span>
<span class="token comment">## print(data)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 移除重复行</span>
<span class="token comment">## 创建数据集</span>
data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">## 重复行</span>

<span class="token comment">## 去除重复行，必须所有列值一样</span>
data<span class="token punctuation">.</span>remove_duplicates<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name |Age
-----|---
Alice|25 
Alice|30 
</code></pre><p><strong>表格合并</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建两个表格</span>
data1 <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
data1<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
data1<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data1<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

data2 <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
data2<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Occupation&#39;</span><span class="token punctuation">]</span>
data2<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Engineer&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data2<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Doctor&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 按行合并</span>
<span class="token comment">## 使用stack方法合并两个表格</span>
stacked_data <span class="token operator">=</span> data1<span class="token punctuation">.</span>stack<span class="token punctuation">(</span>data2<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>stacked_data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name |Age     
-----|--------
Alice|25      
Bob  |30      
Alice|Engineer
Bob  |Doctor  
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 按列合并</span>
<span class="token comment">## 两个表格行数需要一致</span>
<span class="token comment">## 使用stack_cols方法合并两个表格的列</span>
stacked_cols_data <span class="token operator">=</span> data1<span class="token punctuation">.</span>stack_cols<span class="token punctuation">(</span>data2<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>stacked_cols_data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name |Age|Name |Occupation
-----|---|-----|----------
Alice|25 |Alice|Engineer  
Bob  |30 |Bob  |Doctor    
</code></pre><h3 id="_1-2-数据导入与导出" tabindex="-1"><a class="header-anchor" href="#_1-2-数据导入与导出"><span>1.2 数据导入与导出</span></a></h3><p><strong>数据导出</strong></p><p>Tablib使得用户可以根据具体需求将数据灵活地导出到不同的环境中，并与其他工具进行无缝集成和交互。<strong>转换的结果是这些格式的对象表示而不是存为本地文件</strong>。这些格式包括但不限于：</p><ul><li>CSV：常见的电子表格格式，每个字段由逗号分隔。</li><li>JSON：一种常见的数据交换格式，以键值对的形式存储数据。</li><li>Excel：电子表格格式，需要额外安装库，可以包含多个工作表，并支持公式和图表等功能。</li><li>YAML：一种易读的数据序列化格式，常用于配置文件。</li><li>HTML：用于创建网页的标记语言。</li><li>Pandas DataFrame：Pandas是另一个Python库，用于数据处理和分析。Tablib支持将数据导出为Pandas DataFrame。</li></ul><p>Tablib提供了两种方式将数据导出为其他格式，一种是调用export函数，一种是调用自带属性。如下所示data.export(&#39;csv&#39;) 和data.csv都可以用于获取Dataset数据的CSV表示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>data.export(&#39;csv&#39;)
data.csv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>具体示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建表格</span>
data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Tom&#39;</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Jane&#39;</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 导出为csv字符流</span>
data_csv <span class="token operator">=</span> data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;csv&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>data_csv<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 导出数据到本地csv文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.csv&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data_csv<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;class &#39;str&#39;&gt;
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 导出为json字符串</span>
data_json <span class="token operator">=</span> data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">)</span>
<span class="token builtin">type</span><span class="token punctuation">(</span>data_json<span class="token punctuation">)</span>

<span class="token comment">## 将json字符串解析为Python对象</span>
<span class="token keyword">import</span> json
data_json <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>data_json<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data_json<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[{&#39;Name&#39;: &#39;John&#39;, &#39;Age&#39;: 28}, {&#39;Name&#39;: &#39;Tom&#39;, &#39;Age&#39;: 16}, {&#39;Name&#39;: &#39;Jane&#39;, &#39;Age&#39;: 32}]
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 将数据集对象保存为json文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.json&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 保存为yaml文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.yml&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;yaml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 将数据集保存为xls文件，注意使用wb模式</span>
<span class="token comment">## 需要安装额外库</span>
<span class="token comment">## pip install xlrd</span>
<span class="token comment">## pip install xlwt</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.xls&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;xls&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.xlsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;xlsx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 转换为html</span>
<span class="token comment">## 需要安装MarkupPy库</span>
<span class="token comment">## pip install MarkupPy </span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 转换为pandas的dataframe</span>
<span class="token comment">## 需要安装Pandas库</span>
df <span class="token operator">=</span> data<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;df&#39;</span><span class="token punctuation">)</span>
df<span class="token punctuation">.</span>head<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>Name</th><th>Age</th></tr></thead><tbody><tr><th>0</th><td>John</td><td>28</td></tr><tr><th>1</th><td>Tom</td><td>16</td></tr><tr><th>2</th><td>Jane</td><td>32</td></tr></tbody></table></div><p><strong>数据导入</strong></p><p>我们可以使用tablib库导入多种格式的文件，以初始化tablib的数据对象。如下所示：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.csv&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    imported_data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span>fh<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>imported_data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
John|28 
Tom |16 
Jane|32 
</code></pre><p>对于表格类格式，如csv格式，也可以不导入标题行，即不将第一行作为标题行，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.csv&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    <span class="token comment">## headers=False不导入标题行</span>
    imported_data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span>fh<span class="token punctuation">,</span>headers<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>imported_data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
John|28 
Tom |16 
Jane|32 
</code></pre><p>对于支持多表的xls、xlsx，当前默认打开第一个表，注意使用rb模式。多表管理见下一节。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.xls&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    imported_data <span class="token operator">=</span>  tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span>fh<span class="token punctuation">,</span> <span class="token string">&#39;xls&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>imported_data<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age 
----|----
John|28.0
Tom |16.0
Jane|32.0
</code></pre><h3 id="_1-3-多表管理" tabindex="-1"><a class="header-anchor" href="#_1-3-多表管理"><span>1.3 多表管理</span></a></h3><p>在Tablib中，Databook是一种数据结构，用于组织和管理多个数据表（Data Table。Databook提供了一种方便的方式来操作和处理多个数据表</p><p><strong>创建Databook</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建Databook</span>
databook <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Databook<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建第一个数据表</span>
data_table1 <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 设置数据表的列和数据</span>
data_table1<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
data_table1<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data_table1<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 设置表名</span>
data_table1<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&quot;table1&quot;</span>

<span class="token comment">## 添加数据表到 Databook</span>
databook<span class="token punctuation">.</span>add_sheet<span class="token punctuation">(</span>data_table1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建二个数据表</span>
data_table2 <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 设置数据表的列和数据</span>
data_table2<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">]</span>
data_table2<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Jane&#39;</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data_table2<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Mike&#39;</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 设置表名</span>
data_table2<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token string">&quot;table2&quot;</span>

<span class="token comment">## 添加数据表到 Databook</span>
databook<span class="token punctuation">.</span>add_sheet<span class="token punctuation">(</span>data_table2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 可以利用现有表一次性创建Databoook</span>
tablib<span class="token punctuation">.</span>Databook<span class="token punctuation">(</span><span class="token punctuation">(</span>data_table1<span class="token punctuation">,</span> data_table2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;databook object&gt;
</code></pre><p><strong>查看databook</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 查看子表数量</span>
databook<span class="token punctuation">.</span>size
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 查看各表</span>
databook<span class="token punctuation">.</span>sheets<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&lt;table1 dataset&gt;, &lt;table2 dataset&gt;]
</code></pre><p>根据索引获得表</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">for</span> index<span class="token punctuation">,</span>table <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>databook<span class="token punctuation">.</span>sheets<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot; \\ntable</span><span class="token interpolation"><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>table<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>table0
Name |Age
-----|---
John |25 
Alice|30 
 
table1
Name|Age
----|---
Jane|34 
Mike|14 
</code></pre><p><strong>保存与导入</strong></p><p>databook支持保存xlsx和xls文件，但是导入仅支持xlsx文件。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 保存为xlsx文件</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;databook.xlsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>databook<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;xlsx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 多表导入</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">r&#39;databook.xlsx&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    databook <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Databook<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span>fh<span class="token punctuation">,</span> <span class="token string">&#39;xlsx&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>databook<span class="token punctuation">.</span>sheets<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&lt;table1 dataset&gt;, &lt;table2 dataset&gt;]
</code></pre><h3 id="_1-4-进阶使用" tabindex="-1"><a class="header-anchor" href="#_1-4-进阶使用"><span>1.4 进阶使用</span></a></h3><p><strong>动态列</strong></p><p>Talblib允许在数据表格中随意创建和管理动态列。这些列不需要预先定义，可以根据需要随时添加、删除和修改。如下所示根据随机函数设置列：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 导入数据</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;data.csv&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load<span class="token punctuation">(</span>fh<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age
----|---
John|28 
Tom |16 
Jane|32 
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> random

<span class="token comment">## 随机设置分数</span>
<span class="token keyword">def</span> <span class="token function">random_grade</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 根据传入的行设置不同数据标准</span>
    <span class="token keyword">if</span> <span class="token builtin">int</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">30</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">59</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">100.0</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">100.0</span><span class="token punctuation">)</span>

data<span class="token punctuation">.</span>append_col<span class="token punctuation">(</span>random_grade<span class="token punctuation">,</span> header<span class="token operator">=</span><span class="token string">&#39;Grade&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name|Age|Grade
----|---|-----
John|28 |0.65 
Tom |16 |0.99 
Jane|32 |0.79 
</code></pre><p><strong>数据过滤</strong></p><p>Tablib提供了filter方法，以根据数据集的标签(tags)来过滤数据。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>fruits <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>  

fruits<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;color&#39;</span><span class="token punctuation">]</span> 
<span class="token comment">## 添加tags为fruit与sour的行</span>
fruits<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;tomato&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> tags<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;fruit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sour&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> 
fruits<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;strawberry&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> tags<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;fruit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sweet&#39;</span> <span class="token punctuation">]</span><span class="token punctuation">)</span> 
fruits<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;corn&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;yellow&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> tags<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;vegetable&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sweet&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> 

<span class="token comment">## 转换为其他格式，tags属性不会跟随转换</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>fruits<span class="token punctuation">.</span>yaml<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>- {color: red, name: tomato}
- {color: red, name: strawberry}
- {color: yellow, name: corn}
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 过滤出标签为vegetable的数据</span>
fruits<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;vegetable&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>df  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>name</th><th>color</th></tr></thead><tbody><tr><th>0</th><td>corn</td><td>yellow</td></tr></tbody></table></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 过滤出标签为vegetable或sweet的数据</span>
fruits<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;vegetable&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;sweet&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>df  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>name</th><th>color</th></tr></thead><tbody><tr><th>0</th><td>strawberry</td><td>red</td></tr><tr><th>1</th><td>corn</td><td>yellow</td></tr></tbody></table></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 先过滤出标签为fruit,再过滤为sour的数据</span>
fruits<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;fruit&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;sour&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>df  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>name</th><th>color</th></tr></thead><tbody><tr><th>0</th><td>tomato</td><td>red</td></tr></tbody></table></div><p><strong>分割符</strong></p><p>Tablib提供了append_separator函数，以在excel表格中添加分隔符，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## Daniel和Suzie的测试数据</span>
daniel_tests <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">(</span><span class="token string">&#39;11/24/09&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Apple&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Red&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token string">&#39;05/24/10&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Banana&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Yellow&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>

suzie_tests <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">(</span><span class="token string">&#39;11/24/09&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token string">&#39;05/24/10&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Purple&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>

<span class="token comment">## 创建新的数据集</span>
tests <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
tests<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Date&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Fruit Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Color&#39;</span><span class="token punctuation">]</span>

<span class="token comment">## 添加分隔符</span>
tests<span class="token punctuation">.</span>append_separator<span class="token punctuation">(</span><span class="token string">&#39;Fruits A&#39;</span><span class="token punctuation">)</span>  
<span class="token keyword">for</span> test_row <span class="token keyword">in</span> daniel_tests<span class="token punctuation">:</span>
   tests<span class="token punctuation">.</span>append<span class="token punctuation">(</span>test_row<span class="token punctuation">)</span>

<span class="token comment">## 添加分隔符</span>
tests<span class="token punctuation">.</span>append_separator<span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>  
<span class="token keyword">for</span> test_row <span class="token keyword">in</span> suzie_tests<span class="token punctuation">:</span>
   tests<span class="token punctuation">.</span>append<span class="token punctuation">(</span>test_row<span class="token punctuation">)</span>

<span class="token comment">## 将数据集写入磁盘，以xls格式存储</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;fruits.xls&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>tests<span class="token punctuation">.</span>export<span class="token punctuation">(</span><span class="token string">&#39;xls&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过展示xls数据，可以看到在某些行添加了空行数据。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>
<span class="token comment">## 导入pandas库</span>
<span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token comment">## 从xls文件中读取数据，并将其存储在DataFrame中</span>
pd<span class="token punctuation">.</span>read_excel<span class="token punctuation">(</span><span class="token string">&#39;fruits.xls&#39;</span><span class="token punctuation">,</span> keep_default_na<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>Date</th><th>Fruit Name</th><th>Color</th></tr></thead><tbody><tr><th>0</th><td>Fruits A</td><td></td><td></td></tr><tr><th>1</th><td>11/24/09</td><td>Apple</td><td>Red</td></tr><tr><th>2</th><td>05/24/10</td><td>Banana</td><td>Yellow</td></tr><tr><th>3</th><td></td><td></td><td></td></tr><tr><th>4</th><td>11/24/09</td><td>Orange</td><td>Orange</td></tr><tr><th>5</th><td>05/24/10</td><td>Grapes</td><td>Purple</td></tr></tbody></table></div><p><strong>格式化列</strong></p><p>Tablib提供add_formatter函数用于向Dataset对象添加自定义格式化程序，以便在导出数据时按照指定格式进行格式化。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建一个空的 Dataset 对象</span>
data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 添加数据到 Dataset</span>
data<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;role&#39;</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;John&#39;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token string">&#39;Developer&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Amy&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token string">&#39;Designer&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 定义一个自定义的格式化函数</span>
<span class="token keyword">def</span> <span class="token function">custom_formatter</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&#39;Age: </span><span class="token interpolation"><span class="token punctuation">{</span>val<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span>
    <span class="token keyword">elif</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> val<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">str</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

<span class="token comment">## 添加自定义格式化函数到 Dataset</span>
<span class="token comment">## 第一个参数可以为列号</span>
data<span class="token punctuation">.</span>add_formatter<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>custom_formatter<span class="token punctuation">)</span>
<span class="token comment">## 如果有列名，也可以指定列名</span>
data<span class="token punctuation">.</span>add_formatter<span class="token punctuation">(</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">,</span>custom_formatter<span class="token punctuation">)</span>

<span class="token comment">## 导出数据并应用自定义格式化函数</span>
data<span class="token punctuation">.</span>df
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>name</th><th>age</th><th>role</th></tr></thead><tbody><tr><th>0</th><td>JOHN</td><td>Age: 28</td><td>Developer</td></tr><tr><th>1</th><td>AMY</td><td>Age: 25</td><td>Designer</td></tr></tbody></table></div><p><strong>创建子表格</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">## 创建表格</span>
data <span class="token operator">=</span> tablib<span class="token punctuation">.</span>Dataset<span class="token punctuation">(</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Age&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;Profession&#39;</span><span class="token punctuation">]</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token string">&#39;Doctor&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token string">&#39;Doctor&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Jack&#39;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token string">&#39;Engineer&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## subset方法用于从现有的数据集中选择子集</span>
<span class="token comment">## rows表示行号，rows=[0, 2]表示选择第0行和第2行</span>
sub_data <span class="token operator">=</span> data<span class="token punctuation">.</span>subset<span class="token punctuation">(</span>rows<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> cols<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Profession&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
sub_data<span class="token punctuation">.</span>df
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div><table border="1" class="dataframe"><thead><tr style="text-align:right;"><th></th><th>Name</th><th>Profession</th></tr></thead><tbody><tr><th>0</th><td>Alice</td><td>Doctor</td></tr><tr><th>1</th><td>Jack</td><td>Engineer</td></tr></tbody></table></div><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考"><span>2 参考</span></a></h2>`,138),v={href:"https://github.com/jazzband/tablib",target:"_blank",rel:"noopener noreferrer"},m={href:"https://tablib.readthedocs.io/en/stable/",target:"_blank",rel:"noopener noreferrer"};function b(g,h){const s=p("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[a("Tablib是一个用于处理电子表格（如 Excel，CSV，JSON）的Python 库。它提供了一种简单而强大的方式来操作和处理数据。利用Tablib，我们可以轻松地读取、写入、过滤和转换各种类型的电子表格数据。Tablib 具有一致且易于使用的 API，以在不同的数据格式之间进行无缝转换。比如，Tablib可以将数据从Excel表格导入为Python对象，然后将其转换为JSON或CSV格式，并进行相应的操作和分析。此外Tablib还支持对数据进行排序、筛选和合并等常见操作。Tablib官方仓库地址为："),n("a",d,[a("tablib"),t(s)]),a("，Tablib官方文档地址为："),n("a",r,[a("tablib-doc"),t(s)]),a("。")]),k,n("ul",null,[n("li",null,[n("a",v,[a("tablib"),t(s)])]),n("li",null,[n("a",m,[a("tablib-doc"),t(s)]),a("。")])])])}const _=e(l,[["render",b],["__file","2023-11-30-_python_ 基于Tablib库处理表格数据.html.vue"]]),x=JSON.parse('{"path":"/blog/python/python%E5%AD%A6%E4%B9%A0/2023-11-30-_python_%20%E5%9F%BA%E4%BA%8ETablib%E5%BA%93%E5%A4%84%E7%90%86%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE.html","title":"[python] 基于Tablib库处理表格数据","lang":"zh-CN","frontmatter":{"date":"2023-11-30T11:53:00.000Z","tag":["Python","常用工具"],"category":["Python"],"description":"[python] 基于Tablib库处理表格数据 Tablib是一个用于处理电子表格（如 Excel，CSV，JSON）的Python 库。它提供了一种简单而强大的方式来操作和处理数据。利用Tablib，我们可以轻松地读取、写入、过滤和转换各种类型的电子表格数据。Tablib 具有一致且易于使用的 API，以在不同的数据格式之间进行无缝转换。比如，Ta...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/python/python%E5%AD%A6%E4%B9%A0/2023-11-30-_python_%20%E5%9F%BA%E4%BA%8ETablib%E5%BA%93%E5%A4%84%E7%90%86%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[python] 基于Tablib库处理表格数据"}],["meta",{"property":"og:description","content":"[python] 基于Tablib库处理表格数据 Tablib是一个用于处理电子表格（如 Excel，CSV，JSON）的Python 库。它提供了一种简单而强大的方式来操作和处理数据。利用Tablib，我们可以轻松地读取、写入、过滤和转换各种类型的电子表格数据。Tablib 具有一致且易于使用的 API，以在不同的数据格式之间进行无缝转换。比如，Ta..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:tag","content":"常用工具"}],["meta",{"property":"article:published_time","content":"2023-11-30T11:53:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[python] 基于Tablib库处理表格数据\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-30T11:53:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 Tablib使用","slug":"_1-tablib使用","link":"#_1-tablib使用","children":[{"level":3,"title":"1.1 表格创建","slug":"_1-1-表格创建","link":"#_1-1-表格创建","children":[]},{"level":3,"title":"1.2 数据导入与导出","slug":"_1-2-数据导入与导出","link":"#_1-2-数据导入与导出","children":[]},{"level":3,"title":"1.3 多表管理","slug":"_1-3-多表管理","link":"#_1-3-多表管理","children":[]},{"level":3,"title":"1.4 进阶使用","slug":"_1-4-进阶使用","link":"#_1-4-进阶使用","children":[]}]},{"level":2,"title":"2 参考","slug":"_2-参考","link":"#_2-参考","children":[]}],"git":{},"readingTime":{"minutes":9.57,"words":2871},"filePathRelative":"blog/python/python学习/2023-11-30-[python] 基于Tablib库处理表格数据.md","localizedDate":"2023年11月30日","excerpt":"\\n<p>Tablib是一个用于处理电子表格（如 Excel，CSV，JSON）的Python 库。它提供了一种简单而强大的方式来操作和处理数据。利用Tablib，我们可以轻松地读取、写入、过滤和转换各种类型的电子表格数据。Tablib 具有一致且易于使用的 API，以在不同的数据格式之间进行无缝转换。比如，Tablib可以将数据从Excel表格导入为Python对象，然后将其转换为JSON或CSV格式，并进行相应的操作和分析。此外Tablib还支持对数据进行排序、筛选和合并等常见操作。Tablib官方仓库地址为：<a href=\\"https://github.com/jazzband/tablib\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">tablib</a>，Tablib官方文档地址为：<a href=\\"https://tablib.readthedocs.io/en/stable/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">tablib-doc</a>。</p>","autoDesc":true}');export{_ as comp,x as data};
