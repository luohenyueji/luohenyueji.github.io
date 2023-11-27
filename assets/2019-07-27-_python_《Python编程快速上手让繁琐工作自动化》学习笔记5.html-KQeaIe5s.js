import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as p,c,a as n,b as s,d as o,e as i}from"./app-MsA2k2kn.js";const l={},r=n("h1",{id:"python-《python编程快速上手让繁琐工作自动化》学习笔记5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-《python编程快速上手让繁琐工作自动化》学习笔记5","aria-hidden":"true"},"#"),s(" [python]《Python编程快速上手让繁琐工作自动化》学习笔记5")],-1),u={id:"_1-处理csv文件笔记-第14章-代码下载",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#_1-处理csv文件笔记-第14章-代码下载","aria-hidden":"true"},"#",-1),k={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Automate%20the%20Boring%20Stuff%20with%20Python",target:"_blank",rel:"noopener noreferrer"},v=i(`<p>本文主要在python下介绍CSV文件，CSV 表示“Comma-Separated Values（逗号分隔的值）”，CSV文件是简化的电子表格，保存为纯文本文件。CSV 文件中的每行代表电子表格中的一行，逗号分割了该行中的单元格。Python 的csv模块让解析CSV 文件变得容易。CSV模块为Python自带库。常用函数如下:</p><table><thead><tr><th style="text-align:center;">函数</th><th style="text-align:center;">用途</th><th style="text-align:center;">备注</th></tr></thead><tbody><tr><td style="text-align:center;">exampleFile = open(path)</td><td style="text-align:center;">打开文件，返回file文件</td><td style="text-align:center;">非csv模块中的函数，但可以用于打开csv文件</td></tr><tr><td style="text-align:center;">csv.reader(exampleFile)</td><td style="text-align:center;">将file文件转换为一个Reader对象</td><td style="text-align:center;">不能直接将文件名字符串传递给csv.reader()函数</td></tr><tr><td style="text-align:center;">exampleData = list(exampleReader)</td><td style="text-align:center;">在Reader 对象上应用list()函数，将返回一个csv文件内容列表</td><td style="text-align:center;">非csv模块中的函数</td></tr><tr><td style="text-align:center;">outputFile = open(&#39;output.csv&#39;, &#39;w&#39;, newline=&#39;&#39;)</td><td style="text-align:center;">open()并传入&#39;w&#39;，以写模式打开一个文件</td><td style="text-align:center;">如果忘记设置newline关键字参数为空字符，output.csv中的行距将有两倍</td></tr><tr><td style="text-align:center;">outputWriter.writerow[lists]</td><td style="text-align:center;">将lists写入csv文件中</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">csv.writer(csvFile, delimiter=&#39;\\t&#39;)</td><td style="text-align:center;">将csv文件中的分隔符改为&#39;\\t&#39;</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">csv.writer(csvFile, lineterminator=&#39;\\n\\n&#39;)</td><td style="text-align:center;">将csv文件中的行终止字符改为&#39;\\n\\n&#39;</td><td style="text-align:center;"></td></tr></tbody></table><h2 id="_2-项目练习" tabindex="-1"><a class="header-anchor" href="#_2-项目练习" aria-hidden="true">#</a> 2. 项目练习</h2><h3 id="_2-1-项目-从csv-文件中删除表头" tabindex="-1"><a class="header-anchor" href="#_2-1-项目-从csv-文件中删除表头" aria-hidden="true">#</a> 2.1 项目：从CSV 文件中删除表头</h3><p>读取当前工作目录中所有扩展名为.csv 的文件，除掉第一行的内容重新写入同名的文件。用新的、无表头的内容替换CSV 文件的旧内容。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> csv
<span class="token keyword">import</span> os


<span class="token comment"># 创建文件夹，exist_ok=True表示文件夹如果存在则不报错</span>
os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span><span class="token string">&#39;headerRemoved&#39;</span><span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment"># Loop through every file in the current working directory.</span>
<span class="token comment"># 查找本地所有文件</span>
<span class="token keyword">for</span> csvFilename <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> csvFilename<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&#39;.csv&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
         <span class="token comment"># skip non-csv files 跳过不是csv文件</span>
        <span class="token keyword">continue</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Removing header from &#39;</span> <span class="token operator">+</span> csvFilename <span class="token operator">+</span> <span class="token string">&#39;...&#39;</span><span class="token punctuation">)</span>

    <span class="token comment"># Read the CSV file in (skipping first row). 读取文件跳过第一行</span>
    csvRows <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    csvFileObj <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>csvFilename<span class="token punctuation">)</span>
    readerObj <span class="token operator">=</span> csv<span class="token punctuation">.</span>reader<span class="token punctuation">(</span>csvFileObj<span class="token punctuation">)</span>
    <span class="token comment"># 读取每一行</span>
    <span class="token keyword">for</span> row <span class="token keyword">in</span> readerObj<span class="token punctuation">:</span>
        <span class="token comment"># 跳过第一行</span>
        <span class="token comment"># readerObj.line_num 表示行号从1开始</span>
        <span class="token keyword">if</span> readerObj<span class="token punctuation">.</span>line_num <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                 <span class="token comment"># skip first row</span>
            <span class="token keyword">continue</span>
        <span class="token comment"># 保存数据</span>
        csvRows<span class="token punctuation">.</span>append<span class="token punctuation">(</span>row<span class="token punctuation">)</span>
    csvFileObj<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># Write out the CSV file. 写文件</span>
    csvFileObj <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>
        <span class="token string">&#39;headerRemoved&#39;</span><span class="token punctuation">,</span> csvFilename<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span> newline<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
    csvWriter <span class="token operator">=</span> csv<span class="token punctuation">.</span>writer<span class="token punctuation">(</span>csvFileObj<span class="token punctuation">)</span>
    <span class="token keyword">for</span> row <span class="token keyword">in</span> csvRows<span class="token punctuation">:</span>
        csvWriter<span class="token punctuation">.</span>writerow<span class="token punctuation">(</span>row<span class="token punctuation">)</span>
    csvFileObj<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Removing header from example.csv...
</code></pre><h3 id="_2-2-excel-到csv-的转换程序" tabindex="-1"><a class="header-anchor" href="#_2-2-excel-到csv-的转换程序" aria-hidden="true">#</a> 2.2 Excel 到CSV 的转换程序</h3><p>将多个excel文件保存csv文件。一个Excel 文件可能包含多个工作表，必须为每个表创建一个CSV 文件。CSV文件的文件名应该是&lt;Excel 文件名&gt;_&lt;表标题&gt;.csv，其中&lt;Excel 文件名&gt;是没有扩展名的Excel 文件名（例如&#39;spam_data&#39;，而不是&#39;spam_data.xlsx&#39;），&lt;表标题&gt;是Worksheet 对象的title 变量中的字符串。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> openpyxl
<span class="token keyword">import</span> os
<span class="token keyword">import</span> csv

inputPath <span class="token operator">=</span> <span class="token string">&#39;./excelSpreadsheets&#39;</span>
outputPath <span class="token operator">=</span> <span class="token string">&#39;./outputSheets&#39;</span>

<span class="token comment"># 创建文件夹</span>
os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>outputPath<span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> excelFile <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>inputPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># Skip non-xlsx files, load the workbook object.</span>
    <span class="token comment"># 跳过不是xlsx的文件</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> excelFile<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&#39;xlsx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
    <span class="token comment"># 输入文件</span>
    inputFilePath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>inputPath<span class="token punctuation">,</span> excelFile<span class="token punctuation">)</span>
    <span class="token comment"># 打开xlsx文件</span>
    wb <span class="token operator">=</span> openpyxl<span class="token punctuation">.</span>load_workbook<span class="token punctuation">(</span>inputFilePath<span class="token punctuation">)</span>
    <span class="token comment"># 获得当前文件sheetName</span>
    <span class="token keyword">for</span> sheetName <span class="token keyword">in</span> wb<span class="token punctuation">.</span>sheetnames<span class="token punctuation">:</span>
        <span class="token comment"># 设置文件</span>
        csvFileName <span class="token operator">=</span> excelFile<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token string">&#39;_&#39;</span><span class="token operator">+</span>sheetName<span class="token operator">+</span><span class="token string">&#39;.csv&#39;</span>
        csvFile <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>outputPath<span class="token punctuation">,</span> csvFileName<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span> newline<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;current file is: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>csvFileName<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token comment"># 写csv文件</span>
        outputWriter <span class="token operator">=</span> csv<span class="token punctuation">.</span>writer<span class="token punctuation">(</span>csvFile<span class="token punctuation">)</span>
        sheet <span class="token operator">=</span> wb<span class="token punctuation">[</span>sheetName<span class="token punctuation">]</span>

        <span class="token comment"># 遍历每一行数据</span>
        <span class="token keyword">for</span> rowNum <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> sheet<span class="token punctuation">.</span>max_row<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment"># 保存每一行数据</span>
            rowData <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
            <span class="token keyword">for</span> colNum <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> sheet<span class="token punctuation">.</span>max_column<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token comment"># 保存每一列数据</span>
                rowData<span class="token punctuation">.</span>append<span class="token punctuation">(</span>sheet<span class="token punctuation">.</span>cell<span class="token punctuation">(</span>row<span class="token operator">=</span>rowNum<span class="token punctuation">,</span> column<span class="token operator">=</span>colNum<span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
            <span class="token comment"># 写入一行数据</span>
            outputWriter<span class="token punctuation">.</span>writerow<span class="token punctuation">(</span>rowData<span class="token punctuation">)</span>
        csvFile<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>current file is: spreadsheet-A_Sheet.csv
current file is: spreadsheet-B_Sheet.csv
current file is: spreadsheet-C_Sheet.csv
current file is: spreadsheet-D_Sheet.csv
current file is: spreadsheet-E_Sheet.csv
current file is: spreadsheet-F_Sheet.csv
current file is: spreadsheet-G_Sheet.csv
current file is: spreadsheet-H_Sheet.csv
current file is: spreadsheet-I_Sheet.csv
current file is: spreadsheet-J_Sheet.csv
current file is: spreadsheet-K_Sheet.csv
current file is: spreadsheet-L_Sheet.csv
current file is: spreadsheet-M_Sheet.csv
current file is: spreadsheet-N_Sheet.csv
current file is: spreadsheet-O_Sheet.csv
current file is: spreadsheet-P_Sheet.csv
current file is: spreadsheet-Q_Sheet.csv
current file is: spreadsheet-R_Sheet.csv
current file is: spreadsheet-S_Sheet.csv
current file is: spreadsheet-T_Sheet.csv
current file is: spreadsheet-U_Sheet.csv
current file is: spreadsheet-V_Sheet.csv
current file is: spreadsheet-W_Sheet.csv
current file is: spreadsheet-X_Sheet.csv
current file is: spreadsheet-Y_Sheet.csv
current file is: spreadsheet-Z_Sheet.csv
</code></pre>`,11);function m(h,b){const a=t("ExternalLinkIcon");return p(),c("div",null,[r,n("h2",u,[d,s(" 1. 处理CSV文件笔记（第14章） "),n("a",k,[s("(代码下载)"),o(a)])]),v])}const w=e(l,[["render",m],["__file","2019-07-27-_python_《Python编程快速上手让繁琐工作自动化》学习笔记5.html.vue"]]);export{w as default};
