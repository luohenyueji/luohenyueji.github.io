import{_ as n,c as i,a,o as l}from"./app-CJwJJlha.js";const e={};function p(t,s){return l(),i("div",null,s[0]||(s[0]=[a(`<h1 id="python-个人日常python工具代码" tabindex="-1"><a class="header-anchor" href="#python-个人日常python工具代码"><span>[python] 个人日常python工具代码</span></a></h1><h2 id="生成文件目录结构" tabindex="-1"><a class="header-anchor" href="#生成文件目录结构"><span>生成文件目录结构</span></a></h2><p>生成文件夹或文件的目录结构，并保存结果。可选是否滤除目录，特定文件以及可以设定最大查找文件结构深度。效果如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>root:[z:/]</span></span>
<span class="line"><span>|--a.py</span></span>
<span class="line"><span>|--image</span></span>
<span class="line"><span>|      |--cat1.jpg</span></span>
<span class="line"><span>|      |--cat2.jpg</span></span>
<span class="line"><span>|      |--cat3.jpg</span></span>
<span class="line"><span>|      |--cat4.jpg</span></span>
<span class="line"><span>|      |--cat5.jpg</span></span>
<span class="line"><span>|      |--cat6.jpg</span></span>
<span class="line"><span>|--result</span></span>
<span class="line"><span>|      |--result.jpg</span></span>
<span class="line"><span>|--save.txt</span></span>
<span class="line"><span>|--test.py</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参考</strong></p><blockquote><p><a href="https://blog.csdn.net/feizai1208917009/article/details/88396501" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/feizai1208917009/article/details/88396501</a></p></blockquote><p>代码如下：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os.path</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 结果保存路径</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">txtFilePath</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;save.txt&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">savetxtFile </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(txtFilePath, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;w&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">encoding</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;utf-8&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 文件查找路径</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">findFilePath</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;z:/&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 是否只显示目录</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">isShowDir </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> False</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 最大子目录文件深度</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">maxDepth </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 需要跳过的文件目录和文件</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">skipFile </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;.git&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;doc&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 需要跳过的文件类型</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#skipFileType = [&quot;.txt&quot;,&quot;.MOV&quot;]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">skipFileType</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> saveFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">depth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">item</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 保存的内容</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    saveCotent</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;|      &quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> *</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> depth </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;|--&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> item      </span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(saveCotent)      </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    savetxtFile.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">( saveCotent)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    savetxtFile.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> listDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> depth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 获得绝对路径</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    absPath</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">os.path.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">abspath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(path)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> depth </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;root:[&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> path </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;]&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        savetxtFile.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;root:[&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> path </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;]&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        savetxtFile.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 超过最大深度</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> depth </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> maxDepth:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    # 展开目录文件</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> item </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">listdir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(path):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        # 跳过指定的文件目录和文件</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> item </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">not</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> skipFile:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            # 跳过指定的后缀文件</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os.path.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">splitext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(item)[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> skipFileType:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                continue</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            # 获得项目绝对目录地址</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            absItem</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">os.path.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(absPath,item)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            # 是否只显示目录</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> isShowDir </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os.path.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">isdir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(absItem) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">                    saveFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(depth,item)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">                saveFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(depth,item)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            # 查找子项</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os.path.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">isdir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(absItem):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">                listDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(absItem, depth </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> __name__</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;__main__&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">    listDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(findFilePath, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    savetxtFile.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多图合并" tabindex="-1"><a class="header-anchor" href="#多图合并"><span>多图合并</span></a></h2><p>将多图合并为一张图像，并添加图像对应文字，效果如下： <img src="https://img-blog.csdnimg.cn/20200405092011981.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" loading="lazy"></p><p><strong>参考</strong></p><blockquote><p><a href="https://blog.csdn.net/qq_37598011/article/details/101551593" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_37598011/article/details/101551593</a><a href="https://cloud.tencent.com/developer/ask/204503" target="_blank" rel="noopener noreferrer">https://cloud.tencent.com/developer/ask/204503</a></p></blockquote><p>代码如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import os</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>from PIL import ImageFont, ImageDraw, Image, ExifTags</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建字体文件</span></span>
<span class="line"><span># 文字名</span></span>
<span class="line"><span>def creat_font_img(value):</span></span>
<span class="line"><span>    # 设置空白图像</span></span>
<span class="line"><span>    img = Image.new(&#39;RGB&#39;, (TEXTWIDTH, TEXTHEIGHT), &quot;white&quot;)</span></span>
<span class="line"><span>    # 设置需要显示的字体 宋体</span></span>
<span class="line"><span>    fontpath = TEXTFONT</span></span>
<span class="line"><span>    # 32为字体大小</span></span>
<span class="line"><span>    font = ImageFont.truetype(fontpath, TEXTSIZE)</span></span>
<span class="line"><span>    # 绘图</span></span>
<span class="line"><span>    img_pil = img</span></span>
<span class="line"><span>    draw = ImageDraw.Draw(img_pil)</span></span>
<span class="line"><span>    # 获取字体宽度</span></span>
<span class="line"><span>    sum_width = 0</span></span>
<span class="line"><span>    sum_height = 0</span></span>
<span class="line"><span>    # 添加文字</span></span>
<span class="line"><span>    for char in value:</span></span>
<span class="line"><span>        width, height = draw.textsize(char, font)</span></span>
<span class="line"><span>        sum_width += width</span></span>
<span class="line"><span>        sum_height = height</span></span>
<span class="line"><span>    # 绘制文字信息</span></span>
<span class="line"><span>    # 文字居中</span></span>
<span class="line"><span>    draw.text(((img_pil.size[0] - sum_width) / 2, (img_pil.size[1] -</span></span>
<span class="line"><span>                                                   sum_height) / 2 + TEXTOFFSET), value, font=font, fill=(0, 0, 0))</span></span>
<span class="line"><span>    return img_pil</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建单个带标题和图像的文字</span></span>
<span class="line"><span>def create_single_img(path):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 提取图片</span></span>
<span class="line"><span>    img = Image.open(path)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 提取图像名</span></span>
<span class="line"><span>    text = img.filename.split(&quot;.&quot;)[0]</span></span>
<span class="line"><span>    # 防止图片旋转</span></span>
<span class="line"><span>    for orientation in ExifTags.TAGS.keys():</span></span>
<span class="line"><span>        if ExifTags.TAGS[orientation]==&#39;Orientation&#39;:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        exif=dict(img._getexif().items())</span></span>
<span class="line"><span>        if exif[orientation] == 3:</span></span>
<span class="line"><span>            img=img.rotate(180, expand=True)</span></span>
<span class="line"><span>        elif exif[orientation] == 6:</span></span>
<span class="line"><span>            img=img.rotate(270, expand=True)</span></span>
<span class="line"><span>        elif exif[orientation] == 8:</span></span>
<span class="line"><span>            img=img.rotate(90, expand=True)</span></span>
<span class="line"><span>    except (AttributeError, KeyError, IndexError):</span></span>
<span class="line"><span>        # 如果没有EXIF数据或者没有Orientation标签，则不做任何操作</span></span>
<span class="line"><span>        pass</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    imgFont = creat_font_img(text)</span></span>
<span class="line"><span>    # 图像大小重置</span></span>
<span class="line"><span>    img = img.resize((IMGWIDTH, IMGHEIGHT))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 合并的图像</span></span>
<span class="line"><span>    mergeImg = Image.new(</span></span>
<span class="line"><span>        &quot;RGB&quot;, (IMGWIDTH+IMAGESPACE, IMGHEIGHT+TEXTHEIGHT), &quot;white&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mergeImg.paste(imgFont, (0, 0))</span></span>
<span class="line"><span>    # 贴图</span></span>
<span class="line"><span>    mergeImg.paste(img, (0, TEXTHEIGHT))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return mergeImg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def create_multi_img(dirpath):</span></span>
<span class="line"><span>    # 转到工作目录</span></span>
<span class="line"><span>    dirpath = os.path.realpath(dirpath)</span></span>
<span class="line"><span>    os.chdir(dirpath)</span></span>
<span class="line"><span>    mergeImgs = []</span></span>
<span class="line"><span>    for dirname in os.listdir(dirpath):</span></span>
<span class="line"><span>        if dirname.split(&quot;.&quot;)[-1].lower() == &#39;jpg&#39;:</span></span>
<span class="line"><span>            # print(dirname)</span></span>
<span class="line"><span>            mergeImgs.append(create_single_img(dirname))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if ROW*COL is not len(mergeImgs):</span></span>
<span class="line"><span>        print(&quot;错误，请检查图像数量&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 单个图像尺寸</span></span>
<span class="line"><span>    mergeW, mergeH = mergeImgs[0].size</span></span>
<span class="line"><span>    finalImg = Image.new(&quot;RGB&quot;, (mergeW*COL, mergeH*ROW), &quot;white&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 第几张图</span></span>
<span class="line"><span>    num = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 排列图像</span></span>
<span class="line"><span>    for top in range(0, mergeH*ROW, mergeH):</span></span>
<span class="line"><span>        for left in range(0, mergeW*COL, mergeW):</span></span>
<span class="line"><span>            #print(left, top)</span></span>
<span class="line"><span>            finalImg.paste(mergeImgs[num], (left, top))</span></span>
<span class="line"><span>            num = num+1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return finalImg</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># -----------------</span></span>
<span class="line"><span># 全局变量</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 图片排列方式</span></span>
<span class="line"><span>ROW = 5</span></span>
<span class="line"><span>COL = 8</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 单个图像大小</span></span>
<span class="line"><span>IMGWIDTH, IMGHEIGHT = 600, 600</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 图像间距</span></span>
<span class="line"><span>IMAGESPACE = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文字图像尺寸 文字图像宽需要与单张输入图像等宽</span></span>
<span class="line"><span>TEXTWIDTH, TEXTHEIGHT = IMGWIDTH, 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文字大小和文字上下偏移量</span></span>
<span class="line"><span>TEXTSIZE, TEXTOFFSET = 64, 5</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 文字字体名</span></span>
<span class="line"><span># simsun宋体， msyh.ttc微软雅黑</span></span>
<span class="line"><span>TEXTFONT = &quot;font/msyh.ttc&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    # image路径下存放图片</span></span>
<span class="line"><span>    finalImg = create_multi_img(&quot;./image&quot;)</span></span>
<span class="line"><span>    # 保存图像</span></span>
<span class="line"><span>    finalImg.save(&quot;../result.jpg&quot;, dpi=(300.0, 300.0))</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="找出文件夹中相似图像" tabindex="-1"><a class="header-anchor" href="#找出文件夹中相似图像"><span>找出文件夹中相似图像</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># -*- coding: utf-8 -*-</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>Created on Thu Apr  8 06:18:17 2021</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@author: luohenyueji</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import threading</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import queue</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import cv2</span></span>
<span class="line"><span>import shutil</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 计算hash值</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def consume(thread_name, q, result):</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        filename, img = q.get()</span></span>
<span class="line"><span>        phash_value = cv2.img_hash.PHash_create().compute(img)</span></span>
<span class="line"><span>        result[str(filename)] = phash_value</span></span>
<span class="line"><span>        q.task_done()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 读取图像</span></span>
<span class="line"><span>def produce(thread_name, q, imgPath):</span></span>
<span class="line"><span>    for i in os.listdir(imgPath):</span></span>
<span class="line"><span>        if i.split(&#39;.&#39;)[-1] == &#39;jpg&#39;:</span></span>
<span class="line"><span>            filename = os.path.join(imgPath, i)</span></span>
<span class="line"><span>            imgfile = cv2.imread(filename)</span></span>
<span class="line"><span>            if imgfile is None:</span></span>
<span class="line"><span>                continue</span></span>
<span class="line"><span>            q.put([filename, imgfile])</span></span>
<span class="line"><span>            print(filename)</span></span>
<span class="line"><span>    q.join()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 结果</span></span>
<span class="line"><span>result = {}</span></span>
<span class="line"><span>imgpath = &quot;save&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>q = queue.Queue()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p = threading.Thread(target=produce, args=(&quot;producer&quot;, q, imgpath))</span></span>
<span class="line"><span>c1 = threading.Thread(target=consume, args=(&quot;consumer1&quot;, q, result))</span></span>
<span class="line"><span>c2 = threading.Thread(target=consume, args=(&quot;consumer2&quot;, q, result))</span></span>
<span class="line"><span>c3 = threading.Thread(target=consume, args=(&quot;consumer3&quot;, q, result))</span></span>
<span class="line"><span>c4 = threading.Thread(target=consume, args=(&quot;consumer4&quot;, q, result))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>c1.setDaemon(True)</span></span>
<span class="line"><span>c2.setDaemon(True)</span></span>
<span class="line"><span>c3.setDaemon(True)</span></span>
<span class="line"><span>c4.setDaemon(True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p.start()</span></span>
<span class="line"><span>c1.start()</span></span>
<span class="line"><span>c2.start()</span></span>
<span class="line"><span>c3.start()</span></span>
<span class="line"><span>c4.start()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>p.join()</span></span>
<span class="line"><span>np.save(&quot;file.npy&quot;, result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>filehash = np.load(&#39;file.npy&#39;, allow_pickle=True).item()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>save_file = &quot;save_similar&quot;</span></span>
<span class="line"><span>os.makedirs(save_file, exist_ok=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># pash计算结构</span></span>
<span class="line"><span>phash_create = cv2.img_hash.PHash_create()</span></span>
<span class="line"><span># 阈值</span></span>
<span class="line"><span>pash_thre = 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while (len(filehash)):</span></span>
<span class="line"><span>    # 取keys</span></span>
<span class="line"><span>    now_keys = list(filehash.keys())[0]</span></span>
<span class="line"><span>    # 还剩多少图片</span></span>
<span class="line"><span>    print(&quot;还剩{}图片&quot;.format(len(filehash.keys())))</span></span>
<span class="line"><span>    now_keys_value = filehash.pop(now_keys)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 相同图像存储</span></span>
<span class="line"><span>    similar_filename = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 循环计算值</span></span>
<span class="line"><span>    for keys in filehash:</span></span>
<span class="line"><span>        pash_value = phash_create.compare(now_keys_value, filehash[keys])</span></span>
<span class="line"><span>        if pash_value &lt; pash_thre:</span></span>
<span class="line"><span>            similar_filename.append(keys)</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        # 移动图像</span></span>
<span class="line"><span>        if len(similar_filename) &gt; 0:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 获得关键key名字</span></span>
<span class="line"><span>            now_keys_filename = os.path.basename(now_keys)</span></span>
<span class="line"><span>            # 创建的保存文件路径</span></span>
<span class="line"><span>            save_file_path = os.path.join(save_file, now_keys_filename[:-4])</span></span>
<span class="line"><span>            os.makedirs(save_file_path, exist_ok=True)</span></span>
<span class="line"><span>            # 移动关键keys图片</span></span>
<span class="line"><span>            shutil.move(now_keys,os.path.join(save_file_path,now_keys_filename))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 从字典中移除值，并移动图片</span></span>
<span class="line"><span>            for i in similar_filename:</span></span>
<span class="line"><span>                filehash.pop(i)</span></span>
<span class="line"><span>                # 获得key名字</span></span>
<span class="line"><span>                keys_filename = os.path.basename(i)</span></span>
<span class="line"><span>                # 移动图片</span></span>
<span class="line"><span>                shutil.move(i, os.path.join(save_file_path, keys_filename))</span></span>
<span class="line"><span>    except:</span></span>
<span class="line"><span>        continue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const h=n(e,[["render",p],["__file","2020-03-25-_python_ 个人日常python工具代码.html.vue"]]),r=JSON.parse('{"path":"/blog/python/python%E5%AD%A6%E4%B9%A0/2020-03-25-_python_%20%E4%B8%AA%E4%BA%BA%E6%97%A5%E5%B8%B8python%E5%B7%A5%E5%85%B7%E4%BB%A3%E7%A0%81.html","title":"[python] 个人日常python工具代码","lang":"zh-CN","frontmatter":{"date":"2020-03-25T09:14:22.000Z","category":["Python"],"tag":["Python","常用工具"],"description":"[python] 个人日常python工具代码 生成文件目录结构 生成文件夹或文件的目录结构，并保存结果。可选是否滤除目录，特定文件以及可以设定最大查找文件结构深度。效果如下： 参考 https://blog.csdn.net/feizai1208917009/article/details/88396501 代码如下： 多图合并 将多图合并为一张图像...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/python/python%E5%AD%A6%E4%B9%A0/2020-03-25-_python_%20%E4%B8%AA%E4%BA%BA%E6%97%A5%E5%B8%B8python%E5%B7%A5%E5%85%B7%E4%BB%A3%E7%A0%81.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[python] 个人日常python工具代码"}],["meta",{"property":"og:description","content":"[python] 个人日常python工具代码 生成文件目录结构 生成文件夹或文件的目录结构，并保存结果。可选是否滤除目录，特定文件以及可以设定最大查找文件结构深度。效果如下： 参考 https://blog.csdn.net/feizai1208917009/article/details/88396501 代码如下： 多图合并 将多图合并为一张图像..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdnimg.cn/20200405092011981.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:tag","content":"常用工具"}],["meta",{"property":"article:published_time","content":"2020-03-25T09:14:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[python] 个人日常python工具代码\\",\\"image\\":[\\"https://img-blog.csdnimg.cn/20200405092011981.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center\\"],\\"datePublished\\":\\"2020-03-25T09:14:22.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"生成文件目录结构","slug":"生成文件目录结构","link":"#生成文件目录结构","children":[]},{"level":2,"title":"多图合并","slug":"多图合并","link":"#多图合并","children":[]},{"level":2,"title":"找出文件夹中相似图像","slug":"找出文件夹中相似图像","link":"#找出文件夹中相似图像","children":[]}],"git":{},"readingTime":{"minutes":4.06,"words":1217},"filePathRelative":"blog/python/python学习/2020-03-25-[python] 个人日常python工具代码.md","localizedDate":"2020年3月25日","excerpt":"\\n<h2>生成文件目录结构</h2>\\n<p>生成文件夹或文件的目录结构，并保存结果。可选是否滤除目录，特定文件以及可以设定最大查找文件结构深度。效果如下：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>root:[z:/]</span></span>\\n<span class=\\"line\\"><span>|--a.py</span></span>\\n<span class=\\"line\\"><span>|--image</span></span>\\n<span class=\\"line\\"><span>|      |--cat1.jpg</span></span>\\n<span class=\\"line\\"><span>|      |--cat2.jpg</span></span>\\n<span class=\\"line\\"><span>|      |--cat3.jpg</span></span>\\n<span class=\\"line\\"><span>|      |--cat4.jpg</span></span>\\n<span class=\\"line\\"><span>|      |--cat5.jpg</span></span>\\n<span class=\\"line\\"><span>|      |--cat6.jpg</span></span>\\n<span class=\\"line\\"><span>|--result</span></span>\\n<span class=\\"line\\"><span>|      |--result.jpg</span></span>\\n<span class=\\"line\\"><span>|--save.txt</span></span>\\n<span class=\\"line\\"><span>|--test.py</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{h as comp,r as data};
