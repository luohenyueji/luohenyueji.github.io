import{_ as p,r as o,o as i,c as l,a as n,b as s,d as t,e}from"./app-DrqaGevo.js";const c={},u=n("h1",{id:"python-《python编程快速上手让繁琐工作自动化》学习笔记3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-《python编程快速上手让繁琐工作自动化》学习笔记3"},[n("span",null,"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3")])],-1),r={id:"_1-组织文件笔记-第9章-代码下载",tabindex:"-1"},d={class:"header-anchor",href:"#_1-组织文件笔记-第9章-代码下载"},k={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Automate%20the%20Boring%20Stuff%20with%20Python",target:"_blank",rel:"noopener noreferrer"},m=e(`<h3 id="_1-1-文件与文件路径" tabindex="-1"><a class="header-anchor" href="#_1-1-文件与文件路径"><span><strong>1.1 文件与文件路径</strong></span></a></h3><p>通过import shutil调用shutil模块操作目录，shutil模块能够在Python 程序中实现文件复制、移动、改名和删除；同时也介绍部分os操作文件的函数。常用函数如下：</p><table><thead><tr><th>函数</th><th>用途</th><th>备注</th></tr></thead><tbody><tr><td>shutil.copy(source, destination)</td><td>复制文件</td><td></td></tr><tr><td>shutil.copytree(source, destination)</td><td>复制文件夹</td><td>如果文件夹不存在，则创建文件夹</td></tr><tr><td>shutil.move(source, destination)</td><td>移动文件</td><td>返回新位置的绝对路径的字符串，且会覆写文件</td></tr><tr><td>os.unlink(path)</td><td>删除path处的文件</td><td></td></tr><tr><td>os.rmdir(path)</td><td>删除path处的文件夹</td><td>该文件夹必须为空，其中没有任何文件和文件</td></tr><tr><td>shutil.rmtree(path)</td><td>删除path处的文件夹</td><td>包含的所有文件和文件夹都会被删除</td></tr><tr><td>os.walk(path)</td><td>遍历path下所有文件夹和文件</td><td>返回3个值：当前文件夹名称，当前文件夹子文件夹的字符串列表，当前文件夹文件的字符串列表</td></tr><tr><td>os.rename(path)</td><td>path处文件重命名</td><td></td></tr></tbody></table><h3 id="_1-2-用zipfile-模块压缩文件" tabindex="-1"><a class="header-anchor" href="#_1-2-用zipfile-模块压缩文件"><span><strong>1.2 用zipfile 模块压缩文件</strong></span></a></h3><p>通过import zipfile，利用zipfile模块中的函数，Python 程序可以创建和打开（或解压）ZIP 文件。常用函数如下：</p><table><thead><tr><th>函数</th><th>用途</th><th>备注</th></tr></thead><tbody><tr><td>exampleZip=zipfile.ZipFile(&#39;example.zip&#39;)</td><td>创建一个ZipFile对象</td><td>example.zip表示.zip 文件的文件名</td></tr><tr><td>exampleZip.namelist()</td><td>返回ZIP 文件中包含的所有文件和文件夹的字符串的列表</td><td></td></tr><tr><td>spamInfo = exampleZip.getinfo(&#39;example.txt&#39;)</td><td>返回一个关于特定文件的ZipInfo 对象</td><td>example.txt为压缩文件中的某一文件</td></tr><tr><td>spamInfo.file_size</td><td>返回源文件大小</td><td>单位字节</td></tr><tr><td>spamInfo.compress_size</td><td>返回压缩后文件大小</td><td>单位字节</td></tr><tr><td>exampleZip.extractall(path))</td><td>解压压缩文件到path目录</td><td>path不写，默认为当前目录</td></tr><tr><td>exampleZip.extract(&#39;spam.txt&#39;, path)</td><td>提取某一压缩文件当path目录</td><td>path不写，默认为当前目录</td></tr><tr><td>newZip = zipfile.ZipFile(&#39;new.zip&#39;, &#39;w&#39;)</td><td>以“写模式”打开ZipFile 对象</td><td></td></tr><tr><td>newZip.write(&#39;spam.txt&#39;, compress_type=zipfile.ZIP_DEFLATED)</td><td>压缩文件</td><td>第一个参数是要添加的文件。第二个参数是“压缩类型”参数</td></tr><tr><td>newZip.close()</td><td>关闭ZipFile对象</td><td></td></tr></tbody></table><h2 id="_2-项目练习" tabindex="-1"><a class="header-anchor" href="#_2-项目练习"><span>2. 项目练习</span></a></h2><h3 id="_2-1-将带有美国风格日期的文件改名为欧洲风格日期" tabindex="-1"><a class="header-anchor" href="#_2-1-将带有美国风格日期的文件改名为欧洲风格日期"><span>2.1 将带有美国风格日期的文件改名为欧洲风格日期</span></a></h3><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 导入模块</span>
<span class="token keyword">import</span> shutil
<span class="token keyword">import</span> os
<span class="token keyword">import</span> re
<span class="token comment"># Renames filenames with American MM-DD-YYYY date format to European DD-MM-YYYY.</span>

<span class="token comment"># 含美国风格的日期</span>
<span class="token comment"># Create a regex that matches files with the American date format.</span>
datePattern <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span>
    <span class="token comment"># 匹配文件名开始处、日期出现之前的任何文本</span>
    <span class="token triple-quoted-string string">r&quot;&quot;&quot;^(.*?) # all text before the date
        # 匹配月份
        ((0|1)?\\d)- # one or two digits for the month
        # 匹配日期
        ((0|1|2|3)?\\d)- # one or two digits for the day
        # 匹配年份
        ((19|20)\\d\\d) # four digits for the year
        (.*?)$ # all text after the date
        &quot;&quot;&quot;</span><span class="token punctuation">,</span> re<span class="token punctuation">.</span>VERBOSE<span class="token punctuation">)</span>

<span class="token comment"># 查找路径</span>
searchPath<span class="token operator">=</span><span class="token string">&#39;d:/&#39;</span>

<span class="token keyword">for</span> amerFilename <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>searchPath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    mo <span class="token operator">=</span> datePattern<span class="token punctuation">.</span>search<span class="token punctuation">(</span>amerFilename<span class="token punctuation">)</span>
    <span class="token comment"># Skip files without a date.</span>
    <span class="token keyword">if</span> mo <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
    <span class="token comment"># Get the different parts of the filename.</span>
    <span class="token comment"># 识别日期</span>
    beforePart <span class="token operator">=</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    monthPart <span class="token operator">=</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    dayPart <span class="token operator">=</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
    yearPart <span class="token operator">=</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
    afterPart <span class="token operator">=</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>

    <span class="token comment"># Form the European-style filename. 改为欧洲式命名</span>
    euroFilename <span class="token operator">=</span> beforePart <span class="token operator">+</span> dayPart <span class="token operator">+</span> <span class="token string">&#39;-&#39;</span> <span class="token operator">+</span> \\
        monthPart <span class="token operator">+</span> <span class="token string">&#39;-&#39;</span> <span class="token operator">+</span> yearPart <span class="token operator">+</span> afterPart
    <span class="token comment"># Get the full, absolute file paths.</span>
    <span class="token comment"># 返回绝对路径</span>
    absWorkingDir <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>searchPath<span class="token punctuation">)</span>
    <span class="token comment"># 原文件名</span>
    amerFilename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>absWorkingDir<span class="token punctuation">,</span> amerFilename<span class="token punctuation">)</span>
    <span class="token comment"># 改后文件名</span>
    euroFilename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>absWorkingDir<span class="token punctuation">,</span> euroFilename<span class="token punctuation">)</span>
    <span class="token comment"># Rename the files.</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Renaming &quot;%s&quot; to &quot;%s&quot;...&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>amerFilename<span class="token punctuation">,</span> euroFilename<span class="token punctuation">)</span><span class="token punctuation">)</span>
    shutil<span class="token punctuation">.</span>move<span class="token punctuation">(</span>amerFilename<span class="token punctuation">,</span> euroFilename<span class="token punctuation">)</span>  <span class="token comment"># uncomment after testing</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Renaming &quot;d:\\今天是06-28-2019.txt&quot; to &quot;d:\\今天是28-06-2019.txt&quot;...
</code></pre><h3 id="_2-2-将一个文件夹备份到一个zip-文件" tabindex="-1"><a class="header-anchor" href="#_2-2-将一个文件夹备份到一个zip-文件"><span>2.2 将一个文件夹备份到一个ZIP 文件</span></a></h3><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>
<span class="token keyword">import</span> zipfile
<span class="token keyword">import</span> os


<span class="token comment"># 弄清楚ZIP 文件的名称</span>
<span class="token keyword">def</span> <span class="token function">backupToZip</span><span class="token punctuation">(</span>folder<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># Backup the entire contents of &quot;folder&quot; into a ZIP file.</span>
    <span class="token comment"># 获得文件夹绝对路径</span>
    folder <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>folder<span class="token punctuation">)</span>  <span class="token comment"># make sure folder is absolute</span>
    <span class="token comment"># Figure out the filename this code should use based on</span>
    <span class="token comment"># what files already exist.</span>
    number <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token comment"># 压缩文件名</span>
        zipFilename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>folder<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;_&#39;</span> <span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;.zip&#39;</span>
        <span class="token comment"># 如果压缩文件不存在</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>zipFilename<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>
        number <span class="token operator">=</span> number <span class="token operator">+</span> <span class="token number">1</span>

    <span class="token comment"># Create the ZIP file.</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Creating %s...&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>zipFilename<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 创建新ZIP 文件</span>
    backupZip <span class="token operator">=</span> zipfile<span class="token punctuation">.</span>ZipFile<span class="token punctuation">(</span>zipFilename<span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># TODO: Walk the entire folder tree and compress the files in each folder.</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Done.&#39;</span><span class="token punctuation">)</span>

    <span class="token comment"># 提取文件目录</span>
    <span class="token comment"># 一层一层获得目录</span>
    <span class="token comment"># Walk the entire folder tree and compress the files in each folder.</span>
    <span class="token keyword">for</span> foldername<span class="token punctuation">,</span> subfolders<span class="token punctuation">,</span> filenames <span class="token keyword">in</span> os<span class="token punctuation">.</span>walk<span class="token punctuation">(</span>folder<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Adding files in %s...&#39;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>foldername<span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment"># 压缩文件夹</span>
        <span class="token comment"># Add the current folder to the ZIP file.</span>
        backupZip<span class="token punctuation">.</span>write<span class="token punctuation">(</span>foldername<span class="token punctuation">)</span>

        <span class="token comment"># Add all the files in this folder to the ZIP file.</span>
        <span class="token keyword">for</span> filename <span class="token keyword">in</span> filenames<span class="token punctuation">:</span>
            newBase <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>folder<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;_&#39;</span>
            <span class="token comment"># 判断文件是否是压缩文件</span>
            <span class="token keyword">if</span> filename<span class="token punctuation">.</span>startswith<span class="token punctuation">(</span>newBase<span class="token punctuation">)</span> <span class="token keyword">and</span> filename<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&#39;.zip&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">continue</span>  <span class="token comment"># don&#39;t backup the backup ZIP files</span>
            backupZip<span class="token punctuation">.</span>write<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>foldername<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">)</span>
    backupZip<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Done.&#39;</span><span class="token punctuation">)</span>


backupToZip<span class="token punctuation">(</span><span class="token string">&#39;image&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Creating image_1.zip...
Done.
Done.
</code></pre><h3 id="_2-3-选择性拷贝" tabindex="-1"><a class="header-anchor" href="#_2-3-选择性拷贝"><span>2.3 选择性拷贝</span></a></h3><p>编写一个程序，遍历一个目录树，查找特定扩展名的文件（诸如.pdf 或.jpg）。不论这些文件的位置在哪里，将它们拷贝到一个新的文件夹中。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> shutil
<span class="token keyword">import</span> os


<span class="token keyword">def</span> <span class="token function">searchFile</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> savepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 判断要保存的文件夹路径是否存在</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>savepath<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 创建要保存的文件夹</span>
        os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>savepath<span class="token punctuation">)</span>
    <span class="token comment"># 遍历文件夹</span>
    <span class="token keyword">for</span> foldername<span class="token punctuation">,</span> subfolders<span class="token punctuation">,</span> filenames <span class="token keyword">in</span> os<span class="token punctuation">.</span>walk<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> filename <span class="token keyword">in</span> filenames<span class="token punctuation">:</span>
            <span class="token comment"># 判断是不是txt或者pdf文件</span>
            <span class="token keyword">if</span> filename<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&#39;txt&#39;</span><span class="token punctuation">)</span> <span class="token keyword">or</span> filename<span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">&#39;pdf&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                inputFile <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>foldername<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
                <span class="token comment"># 保存文件路径</span>
                outputFile <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>savepath<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
                <span class="token comment"># 文件保存</span>
                shutil<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>inputFile<span class="token punctuation">,</span> outputFile<span class="token punctuation">)</span>


searchFile<span class="token punctuation">(</span><span class="token string">&quot;mytest&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;save&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-删除不需要的文件" tabindex="-1"><a class="header-anchor" href="#_2-4-删除不需要的文件"><span>2.4 删除不需要的文件</span></a></h3><p>编写一个程序，遍历一个目录树，查找特别大的文件或文件夹。将这些文件的绝对路径打印到屏幕上。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>
<span class="token keyword">import</span> os


<span class="token keyword">def</span> <span class="token function">deletefile</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> foldername<span class="token punctuation">,</span> subfolders<span class="token punctuation">,</span> filenames <span class="token keyword">in</span> os<span class="token punctuation">.</span>walk<span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> filename <span class="token keyword">in</span> filenames<span class="token punctuation">:</span>
            <span class="token comment"># 绝对路径</span>
            filepath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>foldername<span class="token punctuation">,</span> filename<span class="token punctuation">)</span>
            <span class="token comment"># 如果文件大于100MB</span>
            <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>getsize<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">1024</span><span class="token operator">/</span><span class="token number">1024</span> <span class="token operator">&gt;</span> <span class="token number">100</span><span class="token punctuation">:</span>
                <span class="token comment"># 获得绝对路径</span>
                filepath <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>
                <span class="token comment"># 删除文件</span>
                os<span class="token punctuation">.</span>unlink<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span>


deletefile<span class="token punctuation">(</span><span class="token string">&quot;mytest&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),v={id:"_1-模式匹配与正则表达式笔记-第7章-代码下载",tabindex:"-1"},b={class:"header-anchor",href:"#_1-模式匹配与正则表达式笔记-第7章-代码下载"},h={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Automate%20the%20Boring%20Stuff%20with%20Python",target:"_blank",rel:"noopener noreferrer"},g=e(`<p>正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE），计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。</p><p><strong>1.1 正则表达式匹配步骤</strong><br> 虽然在Python 中使用正则表达式有几个步骤，但每一步都相当简单。</p><ol><li>用import re 导入正则表达式模块。</li><li>用re.compile()函数创建一个Regex 对象（记得使用原始字符串）。</li><li>向Regex 对象的search()方法传入想查找的字符串。它返回一个Match 对象。</li><li>调用Match 对象的group()方法，返回实际匹配文本的字符。</li></ol><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 用import re 导入正则表达式模块</span>
<span class="token keyword">import</span> re
<span class="token comment"># 创建了一个Regex对象</span>
phoneNumRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 匹配字符串</span>
mo <span class="token operator">=</span> phoneNumRegex<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">&#39;My number is 415-555-4242.&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># group()方法返回实际匹配的字符串</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;phone num found is: &#39;</span> <span class="token operator">+</span> mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>phone num found is: 415-555-4242
</code></pre><p><strong>1.2 正则表达式匹配更多模式</strong></p><ol><li>利用括号分组<br> 添加括号将在正则表达式中创建“分组”(\\d\\d\\d)-(\\d\\d\\d-\\d\\d\\d\\d)。然后可以使用group()匹配对象方法，从一个分组中获取匹配的文本。</li><li>用管道匹配多个分组<br> 字符|称为“管道”。希望匹配许多表达式中的一个时，就可以使用它。例如，正则表达式r&#39;Batman|Tina Fey&#39;将匹配&#39;Batman&#39;或&#39;Tina Fey&#39;。</li><li>用问号实现可选匹配<br> 有时候，想匹配的模式是可选的。就是说，不论这段文本在不在，正则表达式都会认为匹配。字符?表明它前面的分组在这个模式中是可选的。也可以理解为匹配这个问号之前的分组零次或一次。</li><li>用星号匹配零次或多次<br> *（称为星号）意味着“匹配零次或多次”，即星号之前的分组，可以在文本中出现任意次。它可以完全不存在，或一次又一次地重复。</li><li>用加号匹配一次或多次<br> 加号+前面的分组必须“至少出现一次</li><li>用花括号匹配特定次数 <ul><li>如果想要一个分组重复特定次数，就在正则表达式中该分组的后面，跟上花括号包围的数字。例如，正则表达式(Ha){3}将匹配字符串&#39;HaHaHa&#39;。</li><li>除了一个数字，还可以指定一个范围，即在花括号中写下一个最小值、一个逗号和一个最大值。例如，正则表达式(Ha){1,2}将匹配 &#39;Ha&#39; 和 &#39;HaHa&#39;。</li><li>也可以不写花括号中的第一个或第二个数字，不限定最小值或最大值。例如，(Ha){3,}将匹配3 次或更多次实例。</li></ul></li><li>用花括号和问号匹配非贪心模式<br> Python 的正则表达式默认是“贪心”的，这表示在有二义的情况下，它们会尽可能匹配最长的字符串。花括号的“非贪心”版本匹配尽可能最短的字符串，即在 结束的花括号后跟着一个问号。</li></ol><p><strong>1.3 findall()方法</strong><br> search()将返回一个Match对象，包含被查找字符串中的“第一次”匹配的文本，而findall()方法将返回一组字符串，包含被查找字符串中的所有匹配。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
phoneNumRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># search返回第一次匹配</span>
mo <span class="token operator">=</span> phoneNumRegex<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">&#39;Cell: 415-555-9999 Work: 212-555-0000&#39;</span><span class="token punctuation">)</span>
mo<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;415-555-9999&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># findall返回所有结果</span>
phoneNumRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d&#39;</span><span class="token punctuation">)</span>
phoneNumRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;Cell: 415-555-9999 Work: 212-555-0000&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;415-555-9999&#39;, &#39;212-555-0000&#39;]
</code></pre><p><strong>1.4 字符分类</strong></p><table><thead><tr><th>缩写字符分类</th><th>表示</th></tr></thead><tbody><tr><td>\\d</td><td>0 到9 的任何数字</td></tr><tr><td>\\D</td><td>除0 到9 的数字以外的任何字符</td></tr><tr><td>\\w</td><td>任何字母、数字或下划线字符（可以认为是匹配“单词”字符）</td></tr><tr><td>\\W</td><td>除字母、数字和下划线以外的任何字符</td></tr><tr><td>\\s</td><td>空格、制表符或换行符（可以认为是匹配“空白”字符）</td></tr><tr><td>\\S</td><td>除空格、制表符和换行符以外的任何字符</td></tr></tbody></table><p><strong>1.5 建立自己的字符分类</strong></p><ul><li>有时候你想匹配一组字符，但缩写的字符分类（\\d、\\w、\\s 等）太宽泛。你可 以用方括号定义自己的字符分类。例如，字符分类[aeiouAEIOU]将匹配所有元音字 符，不论大小写。</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
vowelRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;[aeiouAEIOU]&#39;</span><span class="token punctuation">)</span>
vowelRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;RoboCop eats baby food. BABY FOOD.&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;o&#39;, &#39;o&#39;, &#39;o&#39;, &#39;e&#39;, &#39;a&#39;, &#39;a&#39;, &#39;o&#39;, &#39;o&#39;, &#39;A&#39;, &#39;O&#39;, &#39;O&#39;]
</code></pre><ul><li>可以使用短横表示字母或数字的范围。例如，字符分类[a-zA-Z0-9]将匹配所有小写字母、大写字母和数字。</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
vowelRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;[a-zA-Z0-9]&#39;</span><span class="token punctuation">)</span>
vowelRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;RoboCop eats baby food. BABY FOOD.&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;R&#39;,
 &#39;o&#39;,
 &#39;b&#39;,
 &#39;o&#39;,
 &#39;C&#39;,
 &#39;o&#39;,
 &#39;p&#39;,
 &#39;e&#39;,
 &#39;a&#39;,
 &#39;t&#39;,
 &#39;s&#39;,
 &#39;b&#39;,
 &#39;a&#39;,
 &#39;b&#39;,
 &#39;y&#39;,
 &#39;f&#39;,
 &#39;o&#39;,
 &#39;o&#39;,
 &#39;d&#39;,
 &#39;B&#39;,
 &#39;A&#39;,
 &#39;B&#39;,
 &#39;Y&#39;,
 &#39;F&#39;,
 &#39;O&#39;,
 &#39;O&#39;,
 &#39;D&#39;]
</code></pre><ul><li>通过在字符分类的左方括号后加上一个插入字符（^），就可以得到“非字符类”。非字符类将匹配不在这个字符类中的所有字符。</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
consonantRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;[^aeiouAEIOU]&#39;</span><span class="token punctuation">)</span>
consonantRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;RoboCop eats baby food. BABY FOOD.&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;R&#39;,
 &#39;b&#39;,
 &#39;C&#39;,
 &#39;p&#39;,
 &#39; &#39;,
 &#39;t&#39;,
 &#39;s&#39;,
 &#39; &#39;,
 &#39;b&#39;,
 &#39;b&#39;,
 &#39;y&#39;,
 &#39; &#39;,
 &#39;f&#39;,
 &#39;d&#39;,
 &#39;.&#39;,
 &#39; &#39;,
 &#39;B&#39;,
 &#39;B&#39;,
 &#39;Y&#39;,
 &#39; &#39;,
 &#39;F&#39;,
 &#39;D&#39;,
 &#39;.&#39;]
</code></pre><ul><li>插入字符和美元字符<br> 正则表达式的开始处使用插入符号（^），表明匹配必须发生在被查找文本开始处。 正则表达式的末尾加上美元符号，表示该字符串必须以这个正则表达式的模式结束。可以同时使用^和$，表明整个字符串必须匹配该模式。</li></ul><p><strong>1.6 通配字符</strong></p><ol><li>.(句点)字符称为“通配符”。它匹配除了换行之外的所有字符。</li><li>用点-星（.*）表示“任意文本”。</li><li>通过传入re.DOTALL 作为re.compile()的第二个参数，可以让句点字符匹配所有字符，包括换行字符。</li></ol><p><strong>1.7 正则表达式符号总结</strong></p><p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvUmVnZXgvNy4xMC5wbmc?x-oss-process=image/format,png" alt="img" loading="lazy"><strong>1.8 sub() 替换字符串</strong></p><p>Regex对象的sub()方法需要传入两个参数。第一个参数是一个字符串，用于取代发现的匹配。第二个参数是一个字符串，即正则表达式。sub()方法返回替换完成后的字符串。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
namesRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;Agent \\w+&#39;</span><span class="token punctuation">)</span>
namesRegex<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;CENSORED&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Agent Alice gave the secret documents to Agent Bob.&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;CENSORED gave the secret documents to CENSORED.&#39;
</code></pre><p><strong>1.9 compile的第二个参数</strong></p><ol><li>re.IGNORECASE 忽视大小写</li><li>re.VERBOSE 编写注释</li><li>re.DOTALL 句点表示所有字符（没有这个则表示除换行符外的所有字符）</li></ol><h2 id="_2-项目练习-1" tabindex="-1"><a class="header-anchor" href="#_2-项目练习-1"><span>2. 项目练习</span></a></h2><h3 id="_2-1-电话号码和e-mail-地址提取程序" tabindex="-1"><a class="header-anchor" href="#_2-1-电话号码和e-mail-地址提取程序"><span>2.1 电话号码和E-mail 地址提取程序</span></a></h3><p>功能：在剪贴板的文本中查找电话号码和E-mail 地址，按一下Ctrl-A 选择所有文本，按下Ctrl-C 将它复制到剪贴板，然后运行程序。找到电话号码和E-mail地址，替换掉剪贴板中的文本。<br> 文本例子地址：http://www.nostarch.com/contactus</p><p><strong>主要步骤:</strong><br> 第1步：为电话号码创建一个正则表达式<br> 第2步：为E-mail 地址创建一个正则表达式<br> 第3步：在剪贴板文本中找到所有匹配<br> 第4步：所有匹配连接成一个字符串，复制到剪贴板</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">#! python3</span>
<span class="token comment"># Finds phone numbers and email addresses on the clipboard.</span>
<span class="token comment"># text:</span>
<span class="token triple-quoted-string string">&#39;&#39;&#39;
Contact Us

No Starch Press, Inc.
245 8th Street
San Francisco, CA 94103 USA
Phone: 800.420.7240 or +1 415.863.9900 (9 a.m. to 5 p.m., M-F, PST)
Fax: +1 415.863.9950

Reach Us by Email

General inquiries: info@nostarch.com
Media requests: media@nostarch.com
Academic requests: academic@nostarch.com (Please see this page for academic review requests)
Help with your order: info@nostarch.com
Reach Us on Social Media
Twitter
Facebook
Instagram
Pinterest
100.420.7240 x 123
&#39;&#39;&#39;</span>

<span class="token keyword">import</span> pyperclip
<span class="token keyword">import</span> re

<span class="token comment"># 为电话号码创建一个正则表达式</span>
<span class="token comment"># 电话号码 phone</span>
phoneRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token triple-quoted-string string">r&#39;&#39;&#39;(
        (\\d{3}|\\(\\d{3}\\))? # area code
        (\\s|-|\\.)? # separator
        (\\d{3}) # first 3 digits
        (\\s|-|\\.) # separator
        (\\d{4}) # last 4 digits
        (\\s*(ext|x|ext.)\\s*(\\d{2,5}))? # extension
        )&#39;&#39;&#39;</span><span class="token punctuation">,</span> re<span class="token punctuation">.</span>VERBOSE<span class="token punctuation">)</span>

<span class="token comment"># 为E-mail 地址创建一个正则表达式</span>
<span class="token comment"># Create email regex. 邮件</span>
emailRegex <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token triple-quoted-string string">r&#39;&#39;&#39;(
    [a-zA-Z0-9._%+-]+ # username
    @ # @ symbol
    [a-zA-Z0-9.-]+ # domain name
    (\\.[a-zA-Z]{2,4}) # dot-something
    )&#39;&#39;&#39;</span><span class="token punctuation">,</span> re<span class="token punctuation">.</span>VERBOSE<span class="token punctuation">)</span>
<span class="token comment"># TODO: Create email regex.</span>
<span class="token comment"># TODO: Find matches in clipboard text.</span>
<span class="token comment"># TODO: Copy results to the clipboard.</span>


<span class="token comment"># Find matches in clipboard text.</span>
<span class="token comment"># 获得剪切板文件</span>
text <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>pyperclip<span class="token punctuation">.</span>paste<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
matches <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
a <span class="token operator">=</span> phoneRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token keyword">for</span> groups <span class="token keyword">in</span> phoneRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 读取数字</span>
    phoneNum <span class="token operator">=</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">[</span>groups<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> groups<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> groups<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token comment"># 如果没有分号</span>
    <span class="token keyword">if</span> groups<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">:</span>
        phoneNum <span class="token operator">+=</span> <span class="token string">&#39; x&#39;</span> <span class="token operator">+</span> groups<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span>
    matches<span class="token punctuation">.</span>append<span class="token punctuation">(</span>phoneNum<span class="token punctuation">)</span>
<span class="token keyword">for</span> groups <span class="token keyword">in</span> emailRegex<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    matches<span class="token punctuation">.</span>append<span class="token punctuation">(</span>groups<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># Copy results to the clipboard.</span>
<span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>matches<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
    pyperclip<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>matches<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Copied to clipboard:&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>matches<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;No phone numbers or email addresses found.&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Copied to clipboard:
800-420-7240
415-863-9900
415-863-9950
100-420-7240 x123
info@nostarch.com
media@nostarch.com
academic@nostarch.com
info@nostarch.com
</code></pre><h3 id="_2-2-强口令检测" tabindex="-1"><a class="header-anchor" href="#_2-2-强口令检测"><span>2.2 强口令检测</span></a></h3><p>写一个函数，它使用正则表达式，确保传入的口令字符串是强口令。强口令的定义是：长度不少于8 个字符，同时包含大写和小写字符，至少有一位数字。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re
<span class="token keyword">import</span> pyperclip

<span class="token keyword">def</span> <span class="token function">detect</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">8</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>
    test1<span class="token operator">=</span>re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;([0-9])&#39;</span><span class="token punctuation">)</span>
    result1<span class="token operator">=</span>test1<span class="token punctuation">.</span>search<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    <span class="token keyword">if</span> result1<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>
            
    test2<span class="token operator">=</span>re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;([A-Z])&#39;</span><span class="token punctuation">)</span>
    result2<span class="token operator">=</span>test2<span class="token punctuation">.</span>search<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    <span class="token keyword">if</span> result2<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>       
    
    test3<span class="token operator">=</span>re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&#39;([a-z])&#39;</span><span class="token punctuation">)</span>
    result3<span class="token operator">=</span>test3<span class="token punctuation">.</span>search<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    <span class="token keyword">if</span> result3<span class="token operator">==</span><span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">False</span>
    
    <span class="token keyword">return</span> <span class="token boolean">True</span>        
            
text<span class="token operator">=</span><span class="token string">&#39;uusssZmi0546&#39;</span>
status<span class="token operator">=</span>detect<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>True
</code></pre><h3 id="_2-3-strip-的正则表达式版本" tabindex="-1"><a class="header-anchor" href="#_2-3-strip-的正则表达式版本"><span>2.3 strip()的正则表达式版本</span></a></h3><p>写一个函数，它接受一个字符串，做的事情和strip()字符串方法一样。如果只传入了要去除的字符串，没有其他参数，那么就从该字符串首尾去除空白字符。否 则，函数第二个参数指定的字符将从该字符串中去除。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> re

<span class="token keyword">def</span> <span class="token function">my_strip</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span>param<span class="token operator">=</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">1</span><span class="token punctuation">:</span>
        param<span class="token operator">=</span><span class="token string">&#39;\\s&#39;</span>
    params_begin<span class="token operator">=</span> <span class="token string">r&#39;^[{}]*&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    params_end<span class="token operator">=</span> <span class="token string">r&#39;[{}]*$&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    my_begin<span class="token operator">=</span>re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span>params_begin<span class="token punctuation">,</span>re<span class="token punctuation">.</span>I<span class="token punctuation">)</span>
    my_end<span class="token operator">=</span>re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span>params_end<span class="token punctuation">,</span>re<span class="token punctuation">.</span>I<span class="token punctuation">)</span>
    my<span class="token operator">=</span>my_begin<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span>
    text<span class="token operator">=</span>my_end<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> my<span class="token punctuation">)</span>
    <span class="token keyword">return</span> text
text<span class="token operator">=</span><span class="token string">&#39;SpamSpamBaconSpamEggsSpamSpam&#39;</span>
param<span class="token operator">=</span><span class="token string">&#39;SPAM&#39;</span>    
text<span class="token operator">=</span>my_strip<span class="token punctuation">(</span>text<span class="token punctuation">,</span><span class="token string">&#39;SPAM&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>BaconSpamEgg
</code></pre><p>fileList = [] numList = []</p><h1 id="寻找文件" tabindex="-1"><a class="header-anchor" href="#寻找文件"><span>寻找文件</span></a></h1><p>pattern = re.compile(&#39;spam(\\d{3}).txt&#39;) for file in os.listdir(path): mo = pattern.search(file) if mo != None: fileList.append(file) numList.append(mo.group(1))</p><h1 id="对存储的文件排序" tabindex="-1"><a class="header-anchor" href="#对存储的文件排序"><span>对存储的文件排序</span></a></h1><p>fileList.sort() numList.sort()</p><h1 id="开始缺失的文件编号" tabindex="-1"><a class="header-anchor" href="#开始缺失的文件编号"><span>开始缺失的文件编号</span></a></h1><h1 id="编号从1开始" tabindex="-1"><a class="header-anchor" href="#编号从1开始"><span>编号从1开始</span></a></h1><p>index = 1</p><h1 id="打印不连续的文件" tabindex="-1"><a class="header-anchor" href="#打印不连续的文件"><span>打印不连续的文件</span></a></h1><p>for i in range(len(numList)): # 如果文件编号不连续 if int(numList[i]) != i+index: inputFile = os.path.join(path, fileList[i]) print(&quot;the missing number file is {}:&quot;.format(inputFile)) outputFile = os.path.join(path, &#39;spam&#39;+&#39;%03d&#39; % (i+1)+&#39;.txt&#39;) os.rename(inputFile, outputFile)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
    the missing number file is .\\spam005.txt:
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,59);function y(f,x){const a=o("ExternalLinkIcon");return i(),l("div",null,[u,n("h2",r,[n("a",d,[n("span",null,[s("1. 组织文件笔记（第9章）"),n("a",k,[s("(代码下载)"),t(a)])])])]),m,n("h2",v,[n("a",b,[n("span",null,[s("1. 模式匹配与正则表达式笔记（第7章）"),n("a",h,[s("(代码下载)"),t(a)])])])]),g])}const w=p(c,[["render",y],["__file","2019-06-28-_python_《Python编程快速上手让繁琐工作自动化》学习笔记3.html.vue"]]),E=JSON.parse('{"path":"/blog/python/python%E7%BC%96%E7%A8%8B%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/2019-06-28-_python_%E3%80%8APython%E7%BC%96%E7%A8%8B%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E8%AE%A9%E7%B9%81%E7%90%90%E5%B7%A5%E4%BD%9C%E8%87%AA%E5%8A%A8%E5%8C%96%E3%80%8B%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B03.html","title":"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3","lang":"zh-CN","frontmatter":{"date":"2019-06-28T14:28:06.000Z","category":["Python"],"tag":["Python"],"description":"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3 1. 组织文件笔记（第9章）(代码下载) 1.1 文件与文件路径 通过import shutil调用shutil模块操作目录，shutil模块能够在Python 程序中实现文件复制、移动、改名和删除；同时也介绍部分os操作文件的函数。常用函数如下： 1.2 用zipfile 模块压...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/python/python%E7%BC%96%E7%A8%8B%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/2019-06-28-_python_%E3%80%8APython%E7%BC%96%E7%A8%8B%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E8%AE%A9%E7%B9%81%E7%90%90%E5%B7%A5%E4%BD%9C%E8%87%AA%E5%8A%A8%E5%8C%96%E3%80%8B%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B03.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3"}],["meta",{"property":"og:description","content":"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3 1. 组织文件笔记（第9章）(代码下载) 1.1 文件与文件路径 通过import shutil调用shutil模块操作目录，shutil模块能够在Python 程序中实现文件复制、移动、改名和删除；同时也介绍部分os操作文件的函数。常用函数如下： 1.2 用zipfile 模块压..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvUmVnZXgvNy4xMC5wbmc?x-oss-process=image/format,png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2019-06-28T14:28:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[python]《Python编程快速上手让繁琐工作自动化》学习笔记3\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvUmVnZXgvNy4xMC5wbmc?x-oss-process=image/format,png\\"],\\"datePublished\\":\\"2019-06-28T14:28:06.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1. 组织文件笔记（第9章）(代码下载)","slug":"_1-组织文件笔记-第9章-代码下载","link":"#_1-组织文件笔记-第9章-代码下载","children":[{"level":3,"title":"1.1 文件与文件路径","slug":"_1-1-文件与文件路径","link":"#_1-1-文件与文件路径","children":[]},{"level":3,"title":"1.2 用zipfile 模块压缩文件","slug":"_1-2-用zipfile-模块压缩文件","link":"#_1-2-用zipfile-模块压缩文件","children":[]}]},{"level":2,"title":"2. 项目练习","slug":"_2-项目练习","link":"#_2-项目练习","children":[{"level":3,"title":"2.1 将带有美国风格日期的文件改名为欧洲风格日期","slug":"_2-1-将带有美国风格日期的文件改名为欧洲风格日期","link":"#_2-1-将带有美国风格日期的文件改名为欧洲风格日期","children":[]},{"level":3,"title":"2.2 将一个文件夹备份到一个ZIP 文件","slug":"_2-2-将一个文件夹备份到一个zip-文件","link":"#_2-2-将一个文件夹备份到一个zip-文件","children":[]},{"level":3,"title":"2.3 选择性拷贝","slug":"_2-3-选择性拷贝","link":"#_2-3-选择性拷贝","children":[]},{"level":3,"title":"2.4 删除不需要的文件","slug":"_2-4-删除不需要的文件","link":"#_2-4-删除不需要的文件","children":[]}]},{"level":2,"title":"1. 模式匹配与正则表达式笔记（第7章）(代码下载)","slug":"_1-模式匹配与正则表达式笔记-第7章-代码下载","link":"#_1-模式匹配与正则表达式笔记-第7章-代码下载","children":[]},{"level":2,"title":"2. 项目练习","slug":"_2-项目练习-1","link":"#_2-项目练习-1","children":[{"level":3,"title":"2.1 电话号码和E-mail 地址提取程序","slug":"_2-1-电话号码和e-mail-地址提取程序","link":"#_2-1-电话号码和e-mail-地址提取程序","children":[]},{"level":3,"title":"2.2 强口令检测","slug":"_2-2-强口令检测","link":"#_2-2-强口令检测","children":[]},{"level":3,"title":"2.3 strip()的正则表达式版本","slug":"_2-3-strip-的正则表达式版本","link":"#_2-3-strip-的正则表达式版本","children":[]}]}],"git":{},"readingTime":{"minutes":13.03,"words":3908},"filePathRelative":"blog/python/python编程快速上手/2019-06-28-[python]《Python编程快速上手让繁琐工作自动化》学习笔记3.md","localizedDate":"2019年6月28日","excerpt":"\\n<h2><a class=\\"header-anchor\\" href=\\"#_1-组织文件笔记-第9章-代码下载\\"><span>1. 组织文件笔记（第9章）</span></a><a href=\\"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Automate%20the%20Boring%20Stuff%20with%20Python\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">(代码下载)</a></h2>\\n<h3><strong>1.1 文件与文件路径</strong></h3>","autoDesc":true}');export{w as comp,E as data};
