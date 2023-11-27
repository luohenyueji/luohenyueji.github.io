import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as n,o as l,c as s,a as t,d as a,b as e,e as o}from"./app-MsA2k2kn.js";const c={},r=t("h1",{id:"r语言-wgcna入门教程",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#r语言-wgcna入门教程","aria-hidden":"true"},"#"),e(" [R语言] WGCNA入门教程")],-1),u={href:"https://github.com/luohenyueji/R-Study-Notes/blob/master/WGCNA/wgcna_tutorial.ipynb",target:"_blank",rel:"noopener noreferrer"},m=t("strong",null,"代码下载地址",-1),v=o(`<ol><li>数据输入和清理</li><li>建设表达网络与模块检测</li><li>筛选与表型相关的模块</li><li>使用WGCNA进行网络可视化</li><li>参考</li></ol><p><strong>WGCNA的安装</strong> 前置软件包安装如果是R语言3.5及以上版本，安装命令如下：</p><blockquote><p>install.packages(&quot;BiocManager&quot;)<br> BiocManager::install(c(&quot;AnnotationDbi&quot;, &quot;impute&quot;,&quot;GO.db&quot;, &quot;preprocessCore&quot;)) install.packages(c(&quot;matrixStats&quot;, &quot;Hmisc&quot;,&quot;foreach&quot;, &quot;doParallel&quot;, &quot;fastcluster&quot;, &quot;dynamicTreeCut&quot;, &quot;survival&quot;)) install.packages(c(&quot;WGCNA&quot;, &quot;stringr&quot;, &quot;reshape2&quot;))</p></blockquote><p>如果R语言3.5以下版本，安装命令如下：</p><blockquote><p>source(&quot;https://bioconductor.org/biocLite.R&quot;) biocLite(c(&quot;AnnotationDbi&quot;, &quot;impute&quot;,&quot;GO.db&quot;, &quot;preprocessCore&quot;)) install.packages(c(&quot;matrixStats&quot;, &quot;Hmisc&quot;,&quot;foreach&quot;, &quot;doParallel&quot;, &quot;fastcluster&quot;, &quot;dynamicTreeCut&quot;, &quot;survival&quot;)) install.packages(c(&quot;WGCNA&quot;, &quot;stringr&quot;, &quot;reshape2&quot;))</p></blockquote><p><strong>专有名词</strong></p><ul><li>共表达网络：定义为加权基因网络。点代表基因，边代表基因表达相关性；</li><li>Module(模块)：高度內连的基因集。在无向网络中，模块内是高度相关的基因。在有向网络中，模块内是高度正相关的基因；</li><li>邻接矩阵(Adjacency matrix)：基因和基因之间的加权相关性值构成的矩阵;</li><li>软阈值：相关性值进行幂次运算幂次的值也就是软阈值;</li><li>连接度(Connectivity)：类似于网络中 &quot;度&quot;degree)的概念。每个基因的连接度是与其相连的基因的边属性之和;</li></ul><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 加载库
library(WGCNA);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message:
&quot;package &#39;WGCNA&#39; was built under R version 3.6.1&quot;Loading required package: dynamicTreeCut
Loading required package: fastcluster

Attaching package: &#39;fastcluster&#39;

The following object is masked from &#39;package:stats&#39;:

    hclust



Attaching package: &#39;WGCNA&#39;

The following object is masked from &#39;package:stats&#39;:

    cor
</code></pre><h2 id="_1-数据输入和清洗" tabindex="-1"><a class="header-anchor" href="#_1-数据输入和清洗" aria-hidden="true">#</a> 1 数据输入和清洗</h2><p>主要步骤如下：</p><ol><li>加载基因表达数据</li><li>数据清洗</li><li>加载临床特征数据</li></ol><h3 id="_1-1-加载基因表达数据" tabindex="-1"><a class="header-anchor" href="#_1-1-加载基因表达数据" aria-hidden="true">#</a> 1.1 加载基因表达数据</h3><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 读取文件
# The following setting is important, do not omit.
# 如果没有显式地指定“stringsAsFactors=FALSE”,默认会将所有的字符串转换为因子,导致数据处理速度较慢
options(stringsAsFactors = FALSE)
# Read in the female liver data set 读取135个雌性小鼠的数据
femData = read.csv(&quot;./data/LiverFemale3600.csv&quot;)
# Take a quick look at what is in the data set:
# 查看数据的维度
dim(femData)
# 预览数据
head(femData)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>3600</li><li>143</li></ol><table><caption>A data.frame: 6 × 143</caption><thead><tr><th scope="col">substanceBXH</th><th scope="col">gene_symbol</th><th scope="col">LocusLinkID</th><th scope="col">ProteomeID</th><th scope="col">cytogeneticLoc</th><th scope="col">CHROMOSOME</th><th scope="col">StartPosition</th><th scope="col">EndPosition</th><th scope="col">F2_2</th><th scope="col">F2_3</th><th scope="col">...</th><th scope="col">F2_324</th><th scope="col">F2_325</th><th scope="col">F2_326</th><th scope="col">F2_327</th><th scope="col">F2_328</th><th scope="col">F2_329</th><th scope="col">F2_330</th><th scope="col">F2_332</th><th scope="col">F2_355</th><th scope="col">F2_357</th></tr><tr><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>MMT00000044</td><td>1700007N18Rik</td><td> 69339</td><td>286025</td><td>0 </td><td>16</td><td> 50911260</td><td> 50912491</td><td>-0.01810</td><td> 0.0642</td><td>...</td><td> 0.047700</td><td>-0.0488</td><td> 0.0168</td><td>-0.0309</td><td> 0.02740</td><td>-0.0310</td><td> 0.0660</td><td>-0.0199</td><td>-0.0146</td><td> 0.065000</td></tr><tr><td>MMT00000046</td><td>Mast2 </td><td> 17776</td><td>157466</td><td>0 </td><td> 4</td><td>115215318</td><td>115372404</td><td>-0.07730</td><td>-0.0297</td><td>...</td><td>-0.049200</td><td>-0.0350</td><td>-0.0738</td><td>-0.1730</td><td>-0.07380</td><td>-0.2010</td><td>-0.0820</td><td>-0.0939</td><td> 0.0192</td><td>-0.049900</td></tr><tr><td>MMT00000051</td><td>Ankrd32 </td><td>105377</td><td>321939</td><td>0 </td><td>13</td><td> 74940309</td><td> 74982847</td><td>-0.02260</td><td> 0.0617</td><td>...</td><td> 0.000612</td><td> 0.1210</td><td> 0.0996</td><td> 0.1090</td><td> 0.02730</td><td> 0.1200</td><td>-0.0629</td><td>-0.0395</td><td> 0.1090</td><td> 0.000253</td></tr><tr><td>MMT00000076</td><td>0 </td><td>383154</td><td> 0</td><td>0 </td><td>16</td><td> 49345114</td><td> 49477048</td><td>-0.00924</td><td>-0.1450</td><td>...</td><td>-0.270000</td><td> 0.0803</td><td> 0.0424</td><td> 0.1610</td><td> 0.05120</td><td> 0.2410</td><td> 0.3890</td><td> 0.0251</td><td>-0.0348</td><td> 0.114000</td></tr><tr><td>MMT00000080</td><td>Ldb2 </td><td> 16826</td><td>157383</td><td>0 </td><td> 5</td><td> 43546124</td><td> 43613704</td><td>-0.04870</td><td> 0.0582</td><td>...</td><td> 0.113000</td><td>-0.0859</td><td>-0.1340</td><td> 0.0639</td><td> 0.00731</td><td> 0.1240</td><td>-0.0212</td><td> 0.0870</td><td> 0.0512</td><td> 0.024300</td></tr><tr><td>MMT00000102</td><td>Rdhs </td><td>216453</td><td> 0</td><td>10_70.0_cM</td><td>10</td><td> 1337265</td><td> 1347607</td><td> 0.17600</td><td>-0.1890</td><td>...</td><td>-0.080000</td><td>-0.1200</td><td> 0.1230</td><td> 0.1870</td><td> 0.05410</td><td> 0.0699</td><td> 0.0708</td><td> 0.1450</td><td>-0.0399</td><td> 0.037500</td></tr></tbody></table><p>提供的基因表达数据中，还有额外的冗余数据，需要把多余注释信息去除，代码如下：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>#  删除冗余数据-c(1:8)删除前8列数据，t()转置数据
datExpr0 = as.data.frame(t(femData[, -c(1:8)]));
head(datExpr0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 3600</caption><thead><tr><th></th><th scope="col">V1</th><th scope="col">V2</th><th scope="col">V3</th><th scope="col">V4</th><th scope="col">V5</th><th scope="col">V6</th><th scope="col">V7</th><th scope="col">V8</th><th scope="col">V9</th><th scope="col">V10</th><th scope="col">...</th><th scope="col">V3591</th><th scope="col">V3592</th><th scope="col">V3593</th><th scope="col">V3594</th><th scope="col">V3595</th><th scope="col">V3596</th><th scope="col">V3597</th><th scope="col">V3598</th><th scope="col">V3599</th><th scope="col">V3600</th></tr><tr><th></th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">F2_2</th><td>-0.0181000</td><td>-0.0773</td><td>-0.02260000</td><td>-0.00924</td><td>-0.04870000</td><td> 0.17600000</td><td>0.07680000</td><td>-0.14800000</td><td> 0.06870000</td><td> 0.06090000</td><td>...</td><td> 0.0135000</td><td>-0.15400000</td><td>-0.0218000</td><td> 0.0310000</td><td>0.1290000</td><td> 0.0467000</td><td> 0.00991000</td><td> 0.0291000</td><td>-0.00927</td><td> 0.0436000</td></tr><tr><th scope="row">F2_3</th><td> 0.0642000</td><td>-0.0297</td><td> 0.06170000</td><td>-0.14500</td><td> 0.05820000</td><td>-0.18900000</td><td>0.18600000</td><td> 0.17700000</td><td> 0.10100000</td><td> 0.05570000</td><td>...</td><td>-0.0097100</td><td>-0.07410000</td><td> 0.0900000</td><td> 0.0106000</td><td>0.1130000</td><td>-0.0252000</td><td> 0.03190000</td><td> 0.0408000</td><td>-0.12100</td><td> 0.0827000</td></tr><tr><th scope="row">F2_14</th><td> 0.0000644</td><td> 0.1120</td><td>-0.12900000</td><td> 0.02870</td><td>-0.04830000</td><td>-0.06500000</td><td>0.21400000</td><td>-0.13200000</td><td> 0.10900000</td><td> 0.19100000</td><td>...</td><td> 0.0709000</td><td>-0.13900000</td><td> 0.0277000</td><td>-0.1310000</td><td>0.2550000</td><td>-0.1230000</td><td> 0.08800000</td><td> 0.0892000</td><td>-0.11400</td><td>-0.0872000</td></tr><tr><th scope="row">F2_15</th><td>-0.0580000</td><td>-0.0589</td><td> 0.08710000</td><td>-0.04390</td><td>-0.03710000</td><td>-0.00846000</td><td>0.12000000</td><td> 0.10700000</td><td>-0.00858000</td><td>-0.12100000</td><td>...</td><td>-0.0313000</td><td>-0.07250000</td><td> 0.0178000</td><td> 0.0882000</td><td>0.0790000</td><td> 0.0002760</td><td>-0.04820000</td><td> 0.0493000</td><td>-0.05010</td><td>-0.0390000</td></tr><tr><th scope="row">F2_19</th><td> 0.0483000</td><td> 0.0443</td><td>-0.11500000</td><td> 0.00425</td><td> 0.02510000</td><td>-0.00574000</td><td>0.02100000</td><td>-0.11900000</td><td> 0.10500000</td><td> 0.05410000</td><td>...</td><td> 0.0695000</td><td>-0.11500000</td><td> 0.0618000</td><td> 0.2950000</td><td>0.1270000</td><td>-0.0560000</td><td>-0.02890000</td><td>-0.0389000</td><td> 0.00718</td><td> 0.0710000</td></tr><tr><th scope="row">F2_20</th><td>-0.1519741</td><td>-0.0938</td><td>-0.06502607</td><td>-0.23610</td><td> 0.08504274</td><td>-0.01807182</td><td>0.06222751</td><td>-0.05497686</td><td>-0.02441415</td><td> 0.06343181</td><td>...</td><td> 0.1743492</td><td>-0.09405315</td><td> 0.1176646</td><td> 0.1161963</td><td>0.1180381</td><td>-0.1171272</td><td>-0.09774204</td><td>-0.0745188</td><td> 0.31857</td><td> 0.2047701</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 将原数据的行列名复制过来
names(datExpr0) = femData$substanceBXH;
rownames(datExpr0) = names(femData)[-c(1:8)];
head(datExpr0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><caption>A data.frame: 6 × 3600</caption><thead><tr><th></th><th scope="col">MMT00000044</th><th scope="col">MMT00000046</th><th scope="col">MMT00000051</th><th scope="col">MMT00000076</th><th scope="col">MMT00000080</th><th scope="col">MMT00000102</th><th scope="col">MMT00000149</th><th scope="col">MMT00000159</th><th scope="col">MMT00000207</th><th scope="col">MMT00000212</th><th scope="col">...</th><th scope="col">MMT00082822</th><th scope="col">MMT00082828</th><th scope="col">MMT00082829</th><th scope="col">MMT00082832</th><th scope="col">MMT00082847</th><th scope="col">MMT00082850</th><th scope="col">MMT00082869</th><th scope="col">MMT00082877</th><th scope="col">MMT00082899</th><th scope="col">MMT00082906</th></tr><tr><th></th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><th scope="row">F2_2</th><td>-0.0181000</td><td>-0.0773</td><td>-0.02260000</td><td>-0.00924</td><td>-0.04870000</td><td> 0.17600000</td><td>0.07680000</td><td>-0.14800000</td><td> 0.06870000</td><td> 0.06090000</td><td>...</td><td> 0.0135000</td><td>-0.15400000</td><td>-0.0218000</td><td> 0.0310000</td><td>0.1290000</td><td> 0.0467000</td><td> 0.00991000</td><td> 0.0291000</td><td>-0.00927</td><td> 0.0436000</td></tr><tr><th scope="row">F2_3</th><td> 0.0642000</td><td>-0.0297</td><td> 0.06170000</td><td>-0.14500</td><td> 0.05820000</td><td>-0.18900000</td><td>0.18600000</td><td> 0.17700000</td><td> 0.10100000</td><td> 0.05570000</td><td>...</td><td>-0.0097100</td><td>-0.07410000</td><td> 0.0900000</td><td> 0.0106000</td><td>0.1130000</td><td>-0.0252000</td><td> 0.03190000</td><td> 0.0408000</td><td>-0.12100</td><td> 0.0827000</td></tr><tr><th scope="row">F2_14</th><td> 0.0000644</td><td> 0.1120</td><td>-0.12900000</td><td> 0.02870</td><td>-0.04830000</td><td>-0.06500000</td><td>0.21400000</td><td>-0.13200000</td><td> 0.10900000</td><td> 0.19100000</td><td>...</td><td> 0.0709000</td><td>-0.13900000</td><td> 0.0277000</td><td>-0.1310000</td><td>0.2550000</td><td>-0.1230000</td><td> 0.08800000</td><td> 0.0892000</td><td>-0.11400</td><td>-0.0872000</td></tr><tr><th scope="row">F2_15</th><td>-0.0580000</td><td>-0.0589</td><td> 0.08710000</td><td>-0.04390</td><td>-0.03710000</td><td>-0.00846000</td><td>0.12000000</td><td> 0.10700000</td><td>-0.00858000</td><td>-0.12100000</td><td>...</td><td>-0.0313000</td><td>-0.07250000</td><td> 0.0178000</td><td> 0.0882000</td><td>0.0790000</td><td> 0.0002760</td><td>-0.04820000</td><td> 0.0493000</td><td>-0.05010</td><td>-0.0390000</td></tr><tr><th scope="row">F2_19</th><td> 0.0483000</td><td> 0.0443</td><td>-0.11500000</td><td> 0.00425</td><td> 0.02510000</td><td>-0.00574000</td><td>0.02100000</td><td>-0.11900000</td><td> 0.10500000</td><td> 0.05410000</td><td>...</td><td> 0.0695000</td><td>-0.11500000</td><td> 0.0618000</td><td> 0.2950000</td><td>0.1270000</td><td>-0.0560000</td><td>-0.02890000</td><td>-0.0389000</td><td> 0.00718</td><td> 0.0710000</td></tr><tr><th scope="row">F2_20</th><td>-0.1519741</td><td>-0.0938</td><td>-0.06502607</td><td>-0.23610</td><td> 0.08504274</td><td>-0.01807182</td><td>0.06222751</td><td>-0.05497686</td><td>-0.02441415</td><td> 0.06343181</td><td>...</td><td> 0.1743492</td><td>-0.09405315</td><td> 0.1176646</td><td> 0.1161963</td><td>0.1180381</td><td>-0.1171272</td><td>-0.09774204</td><td>-0.0745188</td><td> 0.31857</td><td> 0.2047701</td></tr></tbody></table><h3 id="_1-2-数据清洗" tabindex="-1"><a class="header-anchor" href="#_1-2-数据清洗" aria-hidden="true">#</a> 1.2 数据清洗</h3><p>我们首先检查缺失值过多的基因和样本，通过goodSamplesGenes检查缺失值，verbose详细程度。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>gsg = goodSamplesGenes(datExpr0, verbose = 3)
gsg$allOK;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code> Flagging genes and samples with too many missing values...
  ..step 1
</code></pre><p>TRUE</p><p>如果样本检查语句返回TRUE，那么没有缺失值。如果不是的话，我们会移除那些有问题的基因和样本。通过以下代码来移除缺失值</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>if (!gsg$allOK)
{
    # Optionally, print the gene and sample names that were removed:
    # 打印删除的基因和样本名称
    if (sum(!gsg$goodGenes)&gt;0)
        printFlush(paste(&quot;Removing genes:&quot;, paste(names(datExpr0)[!gsg$goodGenes], collapse = &quot;, &quot;)));
    if (sum(!gsg$goodSamples)&gt;0)
        printFlush(paste(&quot;Removing samples:&quot;, paste(rownames(datExpr0)[!gsg$goodSamples], collapse = &quot;, &quot;)));
    # Remove the offending genes and samples from the data:
    # 从数据中删除有问题的基因和样本
    datExpr0 = datExpr0[gsg$goodSamples, gsg$goodGenes]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们对样本进行聚类（与随后的基因聚类相比），看看是否有明显的异常值。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># hclusts聚类算法, dist计算基因之间的距离
sampleTree = hclust(dist(datExpr0), method = &quot;average&quot;);
# Plot the sample tree: Open a graphic output window of size 12 by 9 inches
# The user should change the dimensions if the window is too large or too small.
# 绘制聚类树，sizeGrWindow设置绘图窗口大小
# sizeGrWindow(16,9)
pdf(file = &quot;./plot/sampleClustering.pdf&quot;, width = 12, height = 9);
# 设置文字大小
par(cex = 0.5);
# 设置图像边距c(bottom, left, top, right) 
# par(mar = c(0,4,2,0))
# 画图 main标题，sub子标题，xlab x轴标题，cex.lab标题字体大小，cex.axis坐标轴刻度大小，cex.main主标题字体
plot(sampleTree, main = &quot;Sample clustering to detect outliers&quot;, sub=&quot;&quot;, xlab=&quot;&quot;, cex.lab = 1.5, cex.axis = 1.5, cex.main = 2)
dev.off()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>png:</strong> 2</p><p>由上图图能够看出，F2_221 这个样本和其他样本差距非常大，需要将该样本过滤掉。过滤代码如下</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot a line to show the cut
# 设置文字大小
par(cex = 0.5);
plot(sampleTree, main = &quot;Sample clustering to detect outliers&quot;, sub=&quot;&quot;, xlab=&quot;&quot;, cex.lab = 1.5, cex.axis = 1.5, cex.main = 2)
# 在上图上画红线
abline(h = 15, col = &quot;red&quot;);
# Determine cluster under the line
# 剪枝算法，cutHeight 修剪树枝的高度 minSize集群最小数
clust = cutreeStatic(sampleTree, cutHeight = 15, minSize = 10)
# 剪枝结果
table(clust)
# clust 1 contains the samples we want to keep
keepSamples = (clust==1)
# 符合要求的数据
datExpr = datExpr0[keepSamples, ]
# 提取行
nSamples = nrow(datExpr)
# 提取列
nGenes = ncol(datExpr)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>clust
  0   1 
  1 134 
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzE3XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-加载临床特征数据" tabindex="-1"><a class="header-anchor" href="#_1-3-加载临床特征数据" aria-hidden="true">#</a> 1.3 加载临床特征数据</h3><p>我们现在读取性状数据，并将测量它们的样本与表达样本相匹配。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>traitData = read.csv(&quot;./data/ClinicalTraits.csv&quot;);
dim(traitData)
#names(traitData)
# remove columns that hold information we do not need.
# 删除不需要的列
allTraits = traitData[, -c(31, 16)];
allTraits = allTraits[, c(2, 11:36) ];
dim(allTraits)
head(allTraits)
# names(allTraits)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>361</li><li>38</li></ol><ol class="list-inline"><li>361</li><li>27</li></ol><table><caption>A data.frame: 6 × 27</caption><thead><tr><th scope="col">Mice</th><th scope="col">weight_g</th><th scope="col">length_cm</th><th scope="col">ab_fat</th><th scope="col">other_fat</th><th scope="col">total_fat</th><th scope="col">X100xfat_weight</th><th scope="col">Trigly</th><th scope="col">Total_Chol</th><th scope="col">HDL_Chol</th><th scope="col">...</th><th scope="col">Leptin_pg_ml</th><th scope="col">Adiponectin</th><th scope="col">Aortic.lesions</th><th scope="col">Aneurysm</th><th scope="col">Aortic_cal_M</th><th scope="col">Aortic_cal_L</th><th scope="col">CoronaryArtery_Cal</th><th scope="col">Myocardial_cal</th><th scope="col">BMD_all_limbs</th><th scope="col">BMD_femurs_only</th></tr><tr><th scope="col">&lt;chr&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">...</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;int&gt;</th><th scope="col">&lt;dbl&gt;</th><th scope="col">&lt;dbl&gt;</th></tr></thead><tbody><tr><td>F2_290</td><td>36.9</td><td> 9.9</td><td>2.53</td><td>2.26</td><td>4.79</td><td>12.981030</td><td> 53</td><td>1167</td><td>50</td><td>...</td><td>245462.00</td><td>11.274</td><td>496250</td><td>16</td><td> 0</td><td>17</td><td>0</td><td> 0</td><td> NA</td><td> NA</td></tr><tr><td>F2_291</td><td>48.5</td><td>10.7</td><td>2.90</td><td>2.97</td><td>5.87</td><td>12.103093</td><td> 61</td><td>1230</td><td>32</td><td>...</td><td> 84420.88</td><td> 7.099</td><td> NA</td><td>16</td><td> 4</td><td> 0</td><td>2</td><td> 4</td><td>0.0548</td><td>0.07730</td></tr><tr><td>F2_292</td><td>45.7</td><td>10.4</td><td>1.04</td><td>2.31</td><td>3.35</td><td> 7.330416</td><td> 41</td><td>1285</td><td>81</td><td>...</td><td>105889.76</td><td> 5.795</td><td>218500</td><td> 0</td><td> 0</td><td>11</td><td>0</td><td> 0</td><td>0.0554</td><td>0.08065</td></tr><tr><td>F2_293</td><td>50.3</td><td>10.9</td><td>0.91</td><td>1.89</td><td>2.80</td><td> 5.566600</td><td>271</td><td>1299</td><td>64</td><td>...</td><td>100398.68</td><td> 5.495</td><td> 61250</td><td> 0</td><td> 0</td><td> 0</td><td>0</td><td>236</td><td>0.0597</td><td>0.08680</td></tr><tr><td>F2_294</td><td>44.8</td><td> 9.8</td><td>1.22</td><td>2.47</td><td>3.69</td><td> 8.236607</td><td>114</td><td>1410</td><td>50</td><td>...</td><td>130846.30</td><td> 6.868</td><td>243750</td><td>12</td><td>10</td><td> 0</td><td>0</td><td> 0</td><td> NA</td><td> NA</td></tr><tr><td>F2_295</td><td>39.2</td><td>10.2</td><td>3.06</td><td>2.49</td><td>5.55</td><td>14.158163</td><td> 72</td><td>1533</td><td>18</td><td>...</td><td> 75166.22</td><td>17.328</td><td>104250</td><td>17</td><td> 2</td><td> 0</td><td>0</td><td> 0</td><td>0.0557</td><td>0.07700</td></tr></tbody></table><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 形成一个类似于表达数据的数据框架，以保存临床特征
# 提取行名
femaleSamples = rownames(datExpr)
# 数据匹配 返回匹配行
traitRows = match(femaleSamples, allTraits$Mice);
# 提取指定要求行
datTraits = allTraits[traitRows, -1];
# 提取行名
rownames(datTraits) = allTraits[traitRows, 1];
# 垃圾回收
collectGarbage();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们有了变量datExpr中的表达式数据，以及变量dattitries中相应的临床特征。在我们继续进行网络构建和模块检测之前，我们将可视化临床特征与样本树状图的关系。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Re-cluster samples
# 画聚类图
sampleTree2 = hclust(dist(datExpr), method = &quot;average&quot;)
# Convert traits to a color representation: white means low, red means high, grey means missing entry
# 画表型的热图
# 将特征转换为颜色表示：白色表示低，红色表示高，灰色表示缺少条目
# 如果signed为true 以绿色开头代表最大负值，以白色开头代表零附近的值，然后变为红色代表正值
traitColors = numbers2colors(datTraits, signed =FALSE);
# Plot the sample dendrogram and the colors underneath.
# 绘制出树状图和下面的颜色 
plotDendroAndColors(sampleTree2, traitColors,groupLabels = names(datTraits),main = &quot;Sample dendrogram and trait heatmap&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzIyXzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-建设表达网络与模块检测" tabindex="-1"><a class="header-anchor" href="#_2-建设表达网络与模块检测" aria-hidden="true">#</a> 2 建设表达网络与模块检测</h2><p>此步骤是使用WGCNA方法进行所有网络分析的基础。我们提出三种不同的方法构建网络并识别模块：</p><ul><li>使用方便的一步网络结构和模块检测功能，适合希望以最小努力达到结果的用户；</li><li>为希望使用定制/替代方法进行实验的用户逐步构建网络和模块检测；</li><li>一种自动分块网络结构和模块检测方法，适用于希望分析太大而无法同时分析的数据集的用户。</li></ul><p>主要步骤如下：</p><ol><li>自动一步构建网络与模块检测</li><li>其他检测算法</li></ol><h3 id="_2-1-自动一步构建网络与模块检测" tabindex="-1"><a class="header-anchor" href="#_2-1-自动一步构建网络与模块检测" aria-hidden="true">#</a> 2.1 自动一步构建网络与模块检测</h3><p>在本教程中，我们将演示一步式自动网络构建和模块检测，主要步骤有：</p><ol><li>软阈值的选择：网络拓扑分析</li><li>一步构建网络与模块检测</li></ol><h4 id="_2-1-1-软阈值的选择-网络拓扑分析" tabindex="-1"><a class="header-anchor" href="#_2-1-1-软阈值的选择-网络拓扑分析" aria-hidden="true">#</a> 2.1.1 软阈值的选择：网络拓扑分析</h4><p>构建一个加权基因网络需要选择软阈值幂β来计算邻接矩阵权重参数,即将基因间的相关系数进行乘方运算来表征其相关性，首先需要确定乘方的值</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Choose a set of soft-thresholding powers
# 给出候选的β值，c(1:10)表示1到10；seq(from = 12, to=20, by=2)表示从12开始间隔两个数到20
powers = c(c(1:10), seq(from = 12, to=20, by=2))
powers
# Call the network topology analysis function 调用网络拓扑分析函数
# verbose表示输出结果详细程度
sft = pickSoftThreshold(datExpr, powerVector = powers, verbose = 0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>12</li><li>14</li><li>16</li><li>18</li><li>20</li></ol><pre><code>Warning message:
&quot;executing %dopar% sequentially: no parallel backend registered&quot;

   Power SFT.R.sq  slope truncated.R.sq mean.k. median.k. max.k.
1      1   0.0278  0.345          0.456  747.00  762.0000 1210.0
2      2   0.1260 -0.597          0.843  254.00  251.0000  574.0
3      3   0.3400 -1.030          0.972  111.00  102.0000  324.0
4      4   0.5060 -1.420          0.973   56.50   47.2000  202.0
5      5   0.6810 -1.720          0.940   32.20   25.1000  134.0
6      6   0.9020 -1.500          0.962   19.90   14.5000   94.8
7      7   0.9210 -1.670          0.917   13.20    8.6800   84.1
8      8   0.9040 -1.720          0.876    9.25    5.3900   76.3
9      9   0.8590 -1.700          0.836    6.80    3.5600   70.5
10    10   0.8330 -1.660          0.831    5.19    2.3800   65.8
11    12   0.8530 -1.480          0.911    3.33    1.1500   58.1
12    14   0.8760 -1.380          0.949    2.35    0.5740   51.9
13    16   0.9070 -1.300          0.970    1.77    0.3090   46.8
14    18   0.9120 -1.240          0.973    1.39    0.1670   42.5
15    20   0.9310 -1.210          0.977    1.14    0.0951   38.7
</code></pre><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># sft这中保存了每个powers值计算出来的网络特征,其中powerEstimate就是最佳power值，fitIndices保存了每个power对应的网络的特征。
str(sft)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>List of 2
 $ powerEstimate: num 6
 $ fitIndices   :&#39;data.frame&#39;:	15 obs. of  7 variables:
  ..$ Power         : num [1:15] 1 2 3 4 5 6 7 8 9 10 ...
  ..$ SFT.R.sq      : num [1:15] 0.0278 0.1264 0.3404 0.5062 0.6807 ...
  ..$ slope         : num [1:15] 0.345 -0.597 -1.03 -1.422 -1.716 ...
  ..$ truncated.R.sq: num [1:15] 0.456 0.843 0.972 0.973 0.94 ...
  ..$ mean.k.       : num [1:15] 747 254.5 111 56.5 32.2 ...
  ..$ median.k.     : num [1:15] 761.7 250.8 101.7 47.2 25.1 ...
  ..$ max.k.        : num [1:15] 1206 574 324 202 134 ...
</code></pre><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot the results 结果绘图
# 设置窗格大小
#sizeGrWindow(9, 5)
# 设置图的显示一行两列
# par(mfrow = c(1,2));
cex1 = 0.9;
# Scale-free topology fit index as a function of the soft-thresholding power
# 生成阈值和网络的特征之间的关系函数
plot(sft$fitIndices[,1], -sign(sft$fitIndices[,3])*sft$fitIndices[,2],
xlab=&quot;Soft Threshold (power)&quot;,ylab=&quot;Scale Free Topology Model Fit,signed R^2&quot;,type=&quot;n&quot;,
main = paste(&quot;Scale independence&quot;))
text(sft$fitIndices[,1], -sign(sft$fitIndices[,3])*sft$fitIndices[,2],
labels=powers,cex=cex1,col=&quot;red&quot;);
# this line corresponds to using an R^2 cut-off of h
abline(h=0.90,col=&quot;red&quot;)

# sft$fitIndices 保存了每个power构建的相关性网络中的连接度的统计值，k就是连接度值，每个power值提供了max, median, max3种连接度的统计量
# 对连接度的均值进行可视化
# Mean connectivity as a function of the soft-thresholding power
plot(sft$fitIndices[,1], sft$fitIndices[,5],
xlab=&quot;Soft Threshold (power)&quot;,ylab=&quot;Mean Connectivity&quot;, type=&quot;n&quot;,
main = paste(&quot;Mean connectivity&quot;))
text(sft$fitIndices[,1], sft$fitIndices[,5], labels=powers, cex=cex1,col=&quot;red&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzI5XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzI5XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h4 id="_2-1-2-一步构建网络与模块检测" tabindex="-1"><a class="header-anchor" href="#_2-1-2-一步构建网络与模块检测" aria-hidden="true">#</a> 2.1.2 一步构建网络与模块检测</h4><p>确定好power值即可构建基因网络，构建基因网络和识别模块现在是一个简单的函数调用：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># datExpr表达数据，TOMType拓扑重叠矩阵计算方式，minModuleSize用于模块检测的最小模块尺寸,
# reassignThreshold 是否在模块之间重新分配基因的p值比率阈值，mergeCutHeight 树状图切割高度
# numericLabels 返回的模块应该用颜色（FALSE）还是数字（TRUE）标记,pamRespectsDendro树状图相关参数
# saveTOMs 字符串的向量，saveTOMFileBase 包含包含共识拓扑重叠文件的文件名库的字符串
net = blockwiseModules(datExpr, power = sft$powerEstimate,TOMType = &quot;unsigned&quot;, minModuleSize = 30,reassignThreshold = 0, 
                       mergeCutHeight = 0.25,numericLabels = TRUE, pamRespectsDendro = FALSE,saveTOMs = TRUE,
                       saveTOMFileBase = &quot;femaleMouseTOM&quot;,verbose = 3)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code> Calculating module eigengenes block-wise from all genes
   Flagging genes and samples with too many missing values...
    ..step 1
Cluster size 3600 broken into 2108 1492 
Cluster size 2108 broken into 1126 982 
Done cluster 1126 
Done cluster 982 
Done cluster 2108 
Done cluster 1492 
 ..Working on block 1 .
    TOM calculation: adjacency..
    ..will not use multithreading.
     Fraction of slow calculations: 0.396405
    ..connectivity..
    ..matrix multiplication (system BLAS)..
    ..normalization..
    ..done.
   ..saving TOM for block 1 into file femaleMouseTOM-block.1.RData
 ....clustering..
 ....detecting modules..
 ....calculating module eigengenes..
 ....checking kME in modules..
     ..removing 1 genes from module 1 because their KME is too low.
     ..removing 1 genes from module 7 because their KME is too low.
     ..removing 1 genes from module 8 because their KME is too low.
     ..removing 1 genes from module 21 because their KME is too low.
 ..merging modules that are too close..
     mergeCloseModules: Merging modules whose distance is less than 0.25
       Calculating new MEs...
</code></pre><p>我们现在回到网络分析。要查看标识了多少个模块以及模块大小</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code> table(net$colors)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18 
 99 609 460 409 316 312 221 211 157 123 106 100  94  91  77  76  58  47  34 
</code></pre><p>指示有18个模块，按大小降序标记为1至18，大小范围为609至34个基因。 标签0保留用于所有模块外部的基因。 用于模块识别的分层聚类树状图（树）以net $ dendrograms [[1]]返回； 可以使用以下代码将树状图与颜色分配一起显示：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># open a graphics window
# sizeGrWindow(12, 9)
# Convert labels to colors for plotting
# 将标签转化为绘图颜色
mergedColors = labels2colors(net$colors)
# Plot the dendrogram and the module colors underneath
# 绘制树状图和下面的模块颜色
# dendroLabels树状图标签。设置为FALSE完全禁用树状图标签；设置为NULL使用的行标签datExpr
# addGuide是否应在树状图中添加垂直的“指导线”？线条使识别单个样本的颜色代码更加容易。
plotDendroAndColors(net$dendrograms[[1]], mergedColors[net$blockGenes[[1]]],&quot;Module colors&quot;,
                    dendroLabels = FALSE, hang = 0.03,addGuide = TRUE, guideHang = 0.05)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzM2XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>结果图如上图所示。我们注意到，如果用户想更改条件，则该软件包提供了recutBlockwiseTrees函数，该函数可以应用修改后的条件而不必重新计算网络和聚类树状图。 这样可以节省大量时间。 现在，我们保存后续分析所需的模块分配和模块本征信息。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>moduleLabels = net$colors
moduleColors = labels2colors(net$colors)
MEs = net$MEs;
geneTree = net$dendrograms[[1]];
save(MEs, moduleLabels, moduleColors, geneTree,
file = &quot;FemaleLiver-02-networkConstruction-auto.RData&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-其他检测算法" tabindex="-1"><a class="header-anchor" href="#_2-2-其他检测算法" aria-hidden="true">#</a> 2.2 其他检测算法</h3><p>其他算法包括分步网络构建和模块检测、处理大型数据集：逐块网络构建和模块检测就不再表述具体见下列链接：</p><blockquote><p>https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/Tutorials/FemaleLiver-02-networkConstr-man.pdf https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/Tutorials/FemaleLiver-02-networkConstr-blockwise.pdf</p></blockquote><h2 id="_3-筛选与表型相关的模块" tabindex="-1"><a class="header-anchor" href="#_3-筛选与表型相关的模块" aria-hidden="true">#</a> 3 筛选与表型相关的模块</h2><p>主要步骤如下：</p><ol><li>量化模块-特质关联</li><li>基因与性状和重要模块的关系：基因重要性和模块成员</li><li>模块内分析：鉴定具有高GS和MM的基因</li><li>网络分析结果总结</li></ol><h3 id="_3-1-量化模块-特质关联" tabindex="-1"><a class="header-anchor" href="#_3-1-量化模块-特质关联" aria-hidden="true">#</a> 3.1 量化模块-特质关联</h3><p>在此分析中，我们想确定与所测量的临床特征显着相关的模块。 由于我们已经为每个模块建立了一个概要文件（特征基因），因此我们只需将特征基因与外部特征相关联，然后寻找最重要的关联，实际上是计算模块的ME值与表型的相关系数：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Define numbers of genes and samples
# 获得基因数和样本数
nGenes = ncol(datExpr);
nSamples = nrow(datExpr);

# Recalculate MEs with color labels
# 用彩色标签重新计算MEs
# 在给定的单个数据集中计算模块的模块本征基因
MEs0 = moduleEigengenes(datExpr, moduleColors)$eigengenes
# 对给定的（特征）向量进行重新排序，以使相似的向量（通过相关性度量）彼此相邻
MEs = orderMEs(MEs0)

# 计算module的ME值与表型的相关系数
moduleTraitCor = cor(MEs, datTraits, use = &quot;p&quot;);
moduleTraitPvalue = corPvalueStudent(moduleTraitCor, nSamples);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们的模块和特征数量适中，因此合适的图形表示形式将有助于阅读表格。 我们通过相关值对每个关联进行颜色编码：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>names(MEs)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol class="list-inline"><li>&#39;MEmagenta&#39;</li><li>&#39;MEblack&#39;</li><li>&#39;MEturquoise&#39;</li><li>&#39;MEgreen&#39;</li><li>&#39;MElightcyan&#39;</li><li>&#39;MEblue&#39;</li><li>&#39;MEbrown&#39;</li><li>&#39;MEred&#39;</li><li>&#39;MEsalmon&#39;</li><li>&#39;MEyellow&#39;</li><li>&#39;MElightgreen&#39;</li><li>&#39;MEgreenyellow&#39;</li><li>&#39;MEgrey60&#39;</li><li>&#39;MEpink&#39;</li><li>&#39;MEpurple&#39;</li><li>&#39;MEtan&#39;</li><li>&#39;MEcyan&#39;</li><li>&#39;MEmidnightblue&#39;</li><li>&#39;MEgrey&#39;</li></ol><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># sizeGrWindow(10,6)
# 显示相关性及其p值
textMatrix = paste(signif(moduleTraitCor, 2), &quot;\\n(&quot;,signif(moduleTraitPvalue, 1), &quot;)&quot;, sep = &quot;&quot;);
dim(textMatrix) = dim(moduleTraitCor)
par(mar = c(6, 8.5, 3, 3));
# Display the correlation values within a heatmap plot\\
# ySymbols 当ylabels使用时所使用的其他标签； colorLabels 应该使用颜色标签吗
# colors 颜色； textMatrix 单元格名字
labeledHeatmap(Matrix = moduleTraitCor,xLabels = names(datTraits),yLabels = names(MEs),ySymbols = names(MEs),
               colorLabels = FALSE,colors = greenWhiteRed(50),textMatrix = textMatrix,setStdMargins = FALSE,
               cex.text = 0.4,zlim = c(-1,1),
main = paste(&quot;Module-trait relationships&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message in greenWhiteRed(50):
&quot;WGCNA::greenWhiteRed: this palette is not suitable for people
with green-red color blindness (the most common kind of color blindness).
Consider using the function blueWhiteRed instead.&quot;
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzQ1XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>sizeGrWindow(10,6)
# Will display correlations and their p-values

dim(textMatrix) = dim(moduleTraitCor)
par(mar = c(6, 8.5, 3, 3));
# Display the correlation values within a heatmap plot
labeledHeatmap(Matrix = moduleTraitCor,
xLabels = names(datTraits),
yLabels = names(MEs),
ySymbols = names(MEs),
colorLabels = FALSE,
colors = greenWhiteRed(50),
textMatrix = textMatrix,
setStdMargins = FALSE,
cex.text = 0.5,
zlim = c(-1,1),
main = paste(&quot;Module-trait relationships&quot;))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Warning message in greenWhiteRed(50):
&quot;WGCNA::greenWhiteRed: this palette is not suitable for people
with green-red color blindness (the most common kind of color blindness).
Consider using the function blueWhiteRed instead.&quot;
</code></pre><h3 id="_3-2-基因与性状和重要模块的关系-基因重要性和模块成员" tabindex="-1"><a class="header-anchor" href="#_3-2-基因与性状和重要模块的关系-基因重要性和模块成员" aria-hidden="true">#</a> 3.2 基因与性状和重要模块的关系：基因重要性和模块成员</h3><p>我们量化阵列上所有基因与每个模块的相似性寻找重要模块</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Define variable weight containing the weight column of datTrait
# 定义包含数据特征权重列的变量权重
weight = as.data.frame(datTraits$weight_g);
names(weight) = &quot;weight&quot;
geneModuleMembership = as.data.frame(cor(datExpr, MEs, use = &quot;p&quot;));
# 模块的名称(颜色) substring提取文本从第3个字母开始
modNames = substring(names(MEs), 3)
# 基因和模块的相关系数
geneModuleMembership = as.data.frame(cor(datExpr, MEs, use = &quot;p&quot;));
MMPvalue = as.data.frame(corPvalueStudent(as.matrix(geneModuleMembership), nSamples));
names(geneModuleMembership) = paste(&quot;MM&quot;, modNames, sep=&quot;&quot;);
names(MMPvalue) = paste(&quot;p.MM&quot;, modNames, sep=&quot;&quot;);

#gene和性状的关系
geneTraitSignificance = as.data.frame(cor(datExpr, weight, use = &quot;p&quot;));
GSPvalue = as.data.frame(corPvalueStudent(as.matrix(geneTraitSignificance), nSamples));
names(geneTraitSignificance) = paste(&quot;GS.&quot;, names(weight), sep=&quot;&quot;);
names(GSPvalue) = paste(&quot;p.GS.&quot;, names(weight), sep=&quot;&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-模内分析-鉴定具有高gs和mm的基因" tabindex="-1"><a class="header-anchor" href="#_3-3-模内分析-鉴定具有高gs和mm的基因" aria-hidden="true">#</a> 3.3 模内分析：鉴定具有高GS和MM的基因</h3><p>使用GS和MM度量，我们可以鉴定出对体重以及在感兴趣的模块中具有较高模块成员性具有重要意义的基因。 例如，我们看一下与重量关联最高的棕色模块。 我们在棕色模块中绘制了基因重要性与模块成员关系的散点图。 在此模块中，GS和MM之间存在高度显着的相关性。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 模型颜色
module = &quot;brown&quot;
# 匹配列
column = match(module, modNames);
moduleGenes = moduleColors==module;
#sizeGrWindow(7, 7);
par(mfrow = c(1,1));
# 画散点图
verboseScatterplot(abs(geneModuleMembership[moduleGenes, column]),
                    abs(geneTraitSignificance[moduleGenes, 1]),
                    xlab = paste(&quot;Module Membership in&quot;, module, &quot;module&quot;),
                    ylab = &quot;Gene significance for body weight&quot;,
                    main = paste(&quot;Module membership vs. gene significance\\n&quot;),
                    cex.main = 1.2, cex.lab = 1.2, cex.axis = 1.2, col = module)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzUxXzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-4-网络分析结果总结" tabindex="-1"><a class="header-anchor" href="#_3-4-网络分析结果总结" aria-hidden="true">#</a> 3.4 网络分析结果总结</h3><p>我们发现模块与我们的兴趣特征高度相关，并通过模块成员度量标准确定了其主要参与者。 现在，我们将此统计信息与基因注释合并，并写出一个文件，该文件总结了最重要的结果，并且可以在标准电子表格软件（例如MS Excel或Open Office Calc）中进行检查。 我们的表达式数据仅由探针ID名称注释：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 提取表带数据样本名称
# names(datExpr);
# 指定颜色数据名称
# names(datExpr)[moduleColors==&quot;brown&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># 基因注释数据
annot = read.csv(file = &quot;./data/GeneAnnotation.csv&quot;);
dim(annot)
names(annot)
probes = names(datExpr)
probes2annot = match(probes, annot$substanceBXH)
# The following is the number or probes without annotation:
sum(is.na(probes2annot))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol class="list-inline"><li>23388</li><li>34</li></ol><ol class="list-inline"><li>&#39;X&#39;</li><li>&#39;ID&#39;</li><li>&#39;arrayname&#39;</li><li>&#39;substanceBXH&#39;</li><li>&#39;gene_symbol&#39;</li><li>&#39;LocusLinkID&#39;</li><li>&#39;OfficialGeneSymbol&#39;</li><li>&#39;OfficialGeneName&#39;</li><li>&#39;LocusLinkSymbol&#39;</li><li>&#39;LocusLinkName&#39;</li><li>&#39;ProteomeShortDescription&#39;</li><li>&#39;UnigeneCluster&#39;</li><li>&#39;LocusLinkCode&#39;</li><li>&#39;ProteomeID&#39;</li><li>&#39;ProteomeCode&#39;</li><li>&#39;SwissprotID&#39;</li><li>&#39;OMIMCode&#39;</li><li>&#39;DirectedTilingPriority&#39;</li><li>&#39;AlternateSymbols&#39;</li><li>&#39;AlternateNames&#39;</li><li>&#39;SpeciesID&#39;</li><li>&#39;cytogeneticLoc&#39;</li><li>&#39;Organism&#39;</li><li>&#39;clustername&#39;</li><li>&#39;reporterid&#39;</li><li>&#39;probeid&#39;</li><li>&#39;sequenceid&#39;</li><li>&#39;clusterid&#39;</li><li>&#39;chromosome&#39;</li><li>&#39;startcoordinate&#39;</li><li>&#39;endcoordinate&#39;</li><li>&#39;strand&#39;</li><li>&#39;sequence_3_to_5_prime&#39;</li><li>&#39;sequence_5_to_3_prime&#39;</li></ol><p>0</p><p>现在，我们创建一个数据框，其中包含所有探针的以下信息：探针ID，基因符号，基因座ID（Entrez码），模块颜色，重量的基因重要性以及模块中所有模块的成员和p值。 这些模块将按照其重量的重要性进行排序，而最重要的模块则位于左侧。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Create the starting data frame
geneInfo0 = data.frame(substanceBXH = probes,
geneSymbol = annot$gene_symbol[probes2annot],
LocusLinkID = annot$LocusLinkID[probes2annot],
moduleColor = moduleColors,
geneTraitSignificance,
GSPvalue)
# Order modules by their significance for weight
modOrder = order(-abs(cor(MEs, weight, use = &quot;p&quot;)));
# Add module membership information in the chosen order
for (mod in 1:ncol(geneModuleMembership))
{
    oldNames = names(geneInfo0)
    geneInfo0 = data.frame(geneInfo0, geneModuleMembership[, modOrder[mod]],
    MMPvalue[, modOrder[mod]]);
    names(geneInfo0) = c(oldNames, paste(&quot;MM.&quot;, modNames[modOrder[mod]], sep=&quot;&quot;),
    paste(&quot;p.MM.&quot;, modNames[modOrder[mod]], sep=&quot;&quot;))
}
# Order the genes in the geneInfo variable first by module color, then by geneTraitSignificance
geneOrder = order(geneInfo0$moduleColor, -abs(geneInfo0$GS.weight));
geneInfo = geneInfo0[geneOrder, ]
write.csv(geneInfo, file = &quot;geneInfo.csv&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用wgcna进行网络可视化" tabindex="-1"><a class="header-anchor" href="#_4-使用wgcna进行网络可视化" aria-hidden="true">#</a> 4 使用WGCNA进行网络可视化</h2><p>主要步骤如下：</p><ol><li>显示基因网络</li><li>可视化特征基因网络</li></ol><h2 id="_4-1-显示基因网络" tabindex="-1"><a class="header-anchor" href="#_4-1-显示基因网络" aria-hidden="true">#</a> 4.1 显示基因网络</h2><p>可视化加权网络的一种方法是绘制其热图，热图的每一行和每一列都对应一个基因。 热图可以描述邻接或拓扑重叠，浅色表示低邻接（重叠），而深色表示更高的邻接（重叠）。 另外，沿着热图的顶部和左侧绘制了基因树状图和模块颜色。</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Calculate topological overlap anew: this could be done more efficiently by saving the TOM
# calculated during module detection, but let us do it again here.
# 重新计算拓扑重叠：通过保存TOM可以更有效地完成此操作
# 是在模块检测期间计算的，但让我们在这里再次进行。
dissTOM = 1-TOMsimilarityFromExpr(datExpr, power = 6);
# Transform dissTOM with a power to make moderately strong connections more visible in the heatmap
# 变换dissTOM
plotTOM = dissTOM^7;
# Set diagonal to NA for a nicer plot
diag(plotTOM) = NA;
# Call the plot function
# sizeGrWindow(9,9)
# 基因的聚类树聚类时的距离为1-TOM值结合基因间的距离，即1-TOM值，用热图展示
# TOMplot(plotTOM, geneTree, moduleColors, main = &quot;Network heatmap plot, all genes&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>TOM calculation: adjacency..
..will not use multithreading.
 Fraction of slow calculations: 0.396405
..connectivity..
..matrix multiplication (system BLAS)..
..normalization..
..done.
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzU5XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>请注意，生成热图图可能要花费大量时间。 可以限制基因数量以加快绘图速度。 但是，一个基因子集的基因树状图通常看起来与所有基因的基因树状图不同。 在以下示例中，我们将绘制的基因数限制为400：</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code>nSelect = 400
# For reproducibility, we set the random seed
set.seed(10);
select = sample(nGenes, size = nSelect);
selectTOM = dissTOM[select, select];
# There’s no simple way of restricting a clustering tree to a subset of genes, so we must re-cluster.
# 重新画聚类图
selectTree = hclust(as.dist(selectTOM), method = &quot;average&quot;)
selectColors = moduleColors[select];
# Open a graphical window
# sizeGrWindow(9,9)
# Taking the dissimilarity to a power, say 10, makes the plot more informative by effectively changing
# the color palette; setting the diagonal to NA also improves the clarity of the plot
plotDiss = selectTOM^7;
diag(plotDiss) = NA;
TOMplot(plotDiss, selectTree, selectColors, main = &quot;Network heatmap plot, selected genes&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzYxXzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-2-可视化特征基因网络" tabindex="-1"><a class="header-anchor" href="#_4-2-可视化特征基因网络" aria-hidden="true">#</a> 4.2 可视化特征基因网络</h3><p>研究找到的模块之间的关系通常很有趣。 可以使用特征基因作为代表特征，并通过特征基因相关性来量化模块相似性。 该软件包包含一个方便的函数plotEigengeneNetworks，该函数生成特征基因网络的摘要图。 通常，向特征基因添加临床特征（或多个特征）以了解特征如何适合特征基因网络是有益的</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Recalculate module eigengenes
# 重新计算基因特征值
MEs = moduleEigengenes(datExpr, moduleColors)$eigengenes
# Isolate weight from the clinical traits
weight = as.data.frame(datTraits$weight_g);
names(weight) = &quot;weight&quot;
# Add the weight to existing module eigengenes
MET = orderMEs(cbind(MEs, weight))
# Plot the relationships among the eigengenes and the trait
#sizeGrWindow(5,7.5);
par(cex = 0.9)
# 画树形图
# marDendro给出树状图的边距设置，marHeatmap热图边距设置
plotEigengeneNetworks(MET, &quot;&quot;, marDendro = c(0,4,1,2), marHeatmap = c(3,4,1,2), cex.lab = 0.8, xLabelsAngle= 90)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzY0XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>该函数生成特征基因和特征的树状图，以及它们之间关系的热图。 要拆分树状图和热图图，我们可以使用以下代码</p><div class="language-R line-numbers-mode" data-ext="R"><pre class="language-R"><code># Plot the dendrogram
# sizeGrWindow(6,6);
par(cex = 1.0)
plotEigengeneNetworks(MET, &quot;Eigengene dendrogram&quot;, marDendro = c(0,4,2,0),
plotHeatmaps = FALSE)
# Plot the heatmap matrix (note: this plot will overwrite the dendrogram plot)
par(cex = 1.0)
plotEigengeneNetworks(MET, &quot;Eigengene adjacency heatmap&quot;, marHeatmap = c(3,4,2,2),plotDendrograms = FALSE, xLabelsAngle = 90)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzY2XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9SLVN0dWR5LU5vdGVzL1dHQ05BJTIwVFVUT1JJQUwvb3V0cHV0XzY2XzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>上图为上述代码的输出。本征基因树状图和热图识别了被称为元模块的相关本征基因群。例如，树状图表明，红、棕、蓝三个模块具有高度的相关性，它们之间的相互关系强于它们与体重的相关性。</p><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2><blockquote><p>https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/Tutorials/<br> https://www.jianshu.com/p/e9cc3f43441d<br> https://blog.csdn.net/weixin_43569478/article/details/83747303<br> https://www.jianshu.com/p/25905a905086</p></blockquote>`,130);function h(p,b){const d=n("ExternalLinkIcon");return l(),s("div",null,[r,t("p",null,[t("a",u,[m,a(d)]),e(" 本文主要参考WGCNA官网的教程1。整个分析流程可以分为以下几个步骤：")]),v])}const q=i(c,[["render",h],["__file","2020-01-10-_R语言_ WGCNA入门教程.html.vue"]]);export{q as default};
