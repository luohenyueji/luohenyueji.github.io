import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as p,c as l,a as n,d as e,b as a,e as t}from"./app-MsA2k2kn.js";const c={},r=n("h1",{id:"机器学习-yellowbrick使用笔记3-特征分析可视化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-yellowbrick使用笔记3-特征分析可视化","aria-hidden":"true"},"#"),a(" [机器学习] Yellowbrick使用笔记3-特征分析可视化")],-1),u=n("p",null,"特征分析可视化工具设计用于在数据空间中可视化实例，以便检测可能影响下游拟合的特征或目标。因为ML操作高维数据集（通常至少35个），可视化工具将重点放在聚合、优化和其他技术上，以提供对数据的概述。这是Yellowbrick的意图，指导过程将允许数据科学家缩放和过滤，并探索他们的实例和维度之间的关系。",-1),d={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/Yellowbrick%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"代码下载",-1),v=t(`<p>目前，我们实现了以下功能分析可视化工具：</p><ul><li>特征排名Rank Features：对单个特征和成对特征进行排名以检测协方差</li><li>RadViz Visualizer：沿围绕圆形排列的轴绘制数据点以检测可分离性</li><li>平行坐标Parallel Coordinates：沿垂直轴将样本绘制为线以检测类或聚类</li><li>PCA投影：使用PCA将更高维投影到可视空间中</li><li>流形可视化Manifold Visualization：使用流形学习可视化高维数据</li><li>双变量关系图：（又名Jointplots）绘制特征和目标之间的二维相关性</li></ul><p>功能分析可视化工具Transformer从scikit-learn 实现API，这意味着它们可以用作Pipeline（尤其是a VisualPipeline）中的中间转换步骤。它们以相同的方式实例化，然后在它们上调用fit和transform，从而正确绘制了实例。最后show被调用以完成并显示图像。 头文件调用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Feature Analysis Imports
# NOTE that all these are available for import directly from the \`\`yellowbrick.features\`\` module
from yellowbrick.features.rankd import Rank1D, Rank2D
from yellowbrick.features.radviz import RadViz
from yellowbrick.features.pcoords import ParallelCoordinates
from yellowbrick.features.jointplot import JointPlotVisualizer
from yellowbrick.features.pca import PCADecomposition
from yellowbrick.features.manifold import Manifold
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本文如果数据集下载不下来，查看下面地址，然后放入yellowbrick安装目录\\datasets\\fixtures文件夹:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;bikeshare&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/bikeshare.zip&quot;,
    &quot;signature&quot;: &quot;4ed07a929ccbe0171309129e6adda1c4390190385dd6001ba9eecc795a21eef2&quot;
  },
  &quot;hobbies&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/hobbies.zip&quot;,
    &quot;signature&quot;: &quot;6114e32f46baddf049a18fb05bad3efa98f4e6a0fe87066c94071541cb1e906f&quot;
  },
  &quot;concrete&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/concrete.zip&quot;,
    &quot;signature&quot;: &quot;5807af2f04e14e407f61e66a4f3daf910361a99bb5052809096b47d3cccdfc0a&quot;
  },
  &quot;credit&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/credit.zip&quot;,
    &quot;signature&quot;: &quot;2c6f5821c4039d70e901cc079d1404f6f49c3d6815871231c40348a69ae26573&quot;
  },
  &quot;energy&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/energy.zip&quot;,
    &quot;signature&quot;: &quot;174eca3cd81e888fc416c006de77dbe5f89d643b20319902a0362e2f1972a34e&quot;
  },
  &quot;game&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/game.zip&quot;,
    &quot;signature&quot;: &quot;ce799d1c55fcf1985a02def4d85672ac86c022f8f7afefbe42b20364fba47d7a&quot;
  },
  &quot;mushroom&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/mushroom.zip&quot;,
    &quot;signature&quot;: &quot;f79fdbc33b012dabd06a8f3cb3007d244b6aab22d41358b9aeda74417c91f300&quot;
  },
  &quot;occupancy&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/occupancy.zip&quot;,
    &quot;signature&quot;: &quot;0b390387584586a05f45c7da610fdaaf8922c5954834f323ae349137394e6253&quot;
  },
  &quot;spam&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/spam.zip&quot;,
    &quot;signature&quot;: &quot;000309ac2b61090a3001de3e262a5f5319708bb42791c62d15a08a2f9f7cb30a&quot;
  },
  &quot;walking&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/walking.zip&quot;,
    &quot;signature&quot;: &quot;7a36615978bc3bb74a2e9d5de216815621bd37f6a42c65d3fc28b242b4d6e040&quot;
  },
  &quot;nfl&quot;: {
    &quot;url&quot;: &quot;https://s3.amazonaws.com/ddl-data-lake/yellowbrick/v1.0/nfl.zip&quot;,
    &quot;signature&quot;: &quot;4989c66818ea18217ee0fe3a59932b963bd65869928c14075a5c50366cb81e1f&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-特征排名rank-features" tabindex="-1"><a class="header-anchor" href="#_1-特征排名rank-features" aria-hidden="true">#</a> 1 特征排名Rank Features</h2><p>Rank1D和Rank2D使用各种指标对单个要素或要素对进行评估，这些指标以[-1，1]或[0，1]等级对要素进行评分，从而可以对它们进行排名。数在左下角的三角形热图上可视化，因此可以轻松识别特征对之间的模式以进行下游分析。Rank1D， Rank2D具体对比如下：</p><table><thead><tr><th>展示器</th><th>Rank1D， Rank2D</th></tr></thead><tbody><tr><td>快速使用方法</td><td>rank1d()， rank2d()</td></tr><tr><td>模型</td><td>通用线性模型</td></tr><tr><td>工作流程</td><td>特征工程和模型选择</td></tr></tbody></table><p>在此示例中，我们将使用UCI机器学习存储库中的credit默认数据集来对特征进行排名。下面的代码创建我们的实例矩阵和目标向量。</p><h3 id="_1-1-rank-1d使用" tabindex="-1"><a class="header-anchor" href="#_1-1-rank-1d使用" aria-hidden="true">#</a> 1.1 Rank 1D使用</h3><p>特征的一维分级利用了一次仅考虑单个特征的分级算法（例如直方图分析）。默认情况下，我们使用Shapiro-Wilk算法来评估相对于特征的实例分布的正态性。然后绘制一个条形图，显示每个特征的相对等级。Shapiro-Wilk检验是由S.S.Shapiro与M.B.Wilk提出的，又被称之为W检验，主要检验研究对象是否符合正态分布。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_credit
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Rank1D

<span class="token comment"># Load the credit dataset</span>
<span class="token comment"># 导入数据</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape
y<span class="token punctuation">.</span>shape
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(30000, 23)






(30000,)
</code></pre><p>然后我们可以进行绘图，其中排名评分越高，表示该特征越接近正态分布</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token comment"># Instantiate the 1D visualizer with the Sharpiro ranking algorithm</span>
<span class="token comment"># 使用Sharpiro排名算法实例化1D可视化工具</span>
visualizer <span class="token operator">=</span> Rank1D<span class="token punctuation">(</span>algorithm<span class="token operator">=</span><span class="token string">&#39;shapiro&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
<span class="token comment"># 可视化工具拟合</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>     

<span class="token comment"># Transform the data</span>
<span class="token comment"># 转换数据     </span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>         

<span class="token comment"># Finalize and render the figure</span>
<span class="token comment"># 显示图片    </span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/scipy/stats/morestats.py:1660: UserWarning: p-value may not be accurate for N &gt; 5000.
  warnings.warn(&quot;p-value may not be accurate for N &gt; 5000.&quot;)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_6_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-rank-2d" tabindex="-1"><a class="header-anchor" href="#_1-2-rank-2d" aria-hidden="true">#</a> 1.2 Rank 2D</h3><p>特征的二维排序使用一种一次考虑成对特征的排序算法（例如联合图分析）。然后根据分数对特征对进行排序，并使用特征共生矩阵的左下三角可视化。默认情况下，Rank2D可视化器利用Pearson相关评分检测共线性关系。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_credit
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Rank2D

X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># Instantiate the visualizer with the Pearson ranking algorithm</span>
visualizer <span class="token operator">=</span> Rank2D<span class="token punctuation">(</span>algorithm<span class="token operator">=</span><span class="token string">&#39;pearson&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
<span class="token comment"># 可视化工具拟合</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>     

<span class="token comment"># Transform the data</span>
<span class="token comment"># 转换数据     </span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>         

<span class="token comment"># Finalize and render the figure</span>
<span class="token comment"># 显示图片    </span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_8_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>或者，我们可以利用协方差排序算法，该算法尝试计算变量与其各自均值的偏差乘积的平均值。协方差松散地尝试检测特征之间的共线性关系。将上面的Pearson的输出与下面的协方差排名进行比较。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_credit
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Rank2D


X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer with the Covariance ranking algorithm</span>
<span class="token comment"># #使用协方差排序算法实例化可视化工具</span>
visualizer <span class="token operator">=</span> Rank2D<span class="token punctuation">(</span> algorithm<span class="token operator">=</span><span class="token string">&#39;covariance&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
<span class="token comment"># 可视化工具拟合</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>     

<span class="token comment"># Transform the data</span>
<span class="token comment"># 转换数据     </span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>         

<span class="token comment"># Finalize and render the figure</span>
<span class="token comment"># 显示图片    </span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-3-快速方法" tabindex="-1"><a class="header-anchor" href="#_1-3-快速方法" aria-hidden="true">#</a> 1.3 快速方法</h3><p>可以使用一个线快速方法来实现类似的功能，rank1d和rank2d。这些函数实例化它们各自的可视化工具并将其显示在数据上，并立即显示它，而无需使用基于类的API。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> rank1d<span class="token punctuation">,</span> rank2d
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt

<span class="token comment"># Load the concrete dataset</span>
X<span class="token punctuation">,</span> _ <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

_<span class="token punctuation">,</span> axes <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplots<span class="token punctuation">(</span>ncols<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> figsize<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

rank1d<span class="token punctuation">(</span>X<span class="token punctuation">,</span> ax<span class="token operator">=</span>axes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> show<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
rank2d<span class="token punctuation">(</span>X<span class="token punctuation">,</span> ax<span class="token operator">=</span>axes<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> show<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-radviz-visualizer" tabindex="-1"><a class="header-anchor" href="#_2-radviz-visualizer" aria-hidden="true">#</a> 2 RadViz Visualizer</h2><p>RadViz是一种多元数据可视化算法，该算法围绕圆的圆周均匀地绘制每个要素维，然后在圆的内部绘制点，以使该点将其值从中心到每个圆弧归一化。该机制允许将尽可能多的尺寸轻松地装配在圆上，从而大大扩展了可视化效果的尺寸。 数据科学家使用这种方法来检测类之间的可分性。E、 g.是否有机会从特征集中学习，或者只是噪音太大？</p>`,32),m={href:"https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>RadViz Visualizer具体信息如下</p><table><thead><tr><th>可视化器</th><th>RadialVisualizer</th></tr></thead><tbody><tr><td>快速使用方法</td><td>radviz()</td></tr><tr><td>模型</td><td>分类，回归</td></tr><tr><td>工作流程</td><td>特征工程</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> RadViz

<span class="token comment"># Load the classification dataset</span>
<span class="token comment"># 导入分类数据</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape
y<span class="token punctuation">.</span>shape
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(20560, 5)






(20560,)
</code></pre><h3 id="_2-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-1-基础使用" aria-hidden="true">#</a> 2.1 基础使用</h3><p>下面代码在圆内绘制各点分类信息</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># Specify the target classes</span>
<span class="token comment"># 设定分类类别</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> RadViz<span class="token punctuation">(</span>classes<span class="token operator">=</span>classes<span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>       
<span class="token comment"># Transform the data    </span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>   
<span class="token comment"># Finalize and render the figure    </span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>         
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_16_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>对于回归，RadViz可视化工具应该使用颜色序列来显示目标信息，而不是离散的颜色。</p><h3 id="_2-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_2-2-快速方法" aria-hidden="true">#</a> 2.2 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现radviz。此方法将RadViz使用关联的参数构建对象，将其拟合，然后（可选）立即显示可视化效果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features<span class="token punctuation">.</span>radviz <span class="token keyword">import</span> radviz
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy

<span class="token comment">#Load the classification dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Specify the target classes</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
radviz<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> classes<span class="token operator">=</span>classes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_19_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-平行坐标parallel-coordinates" tabindex="-1"><a class="header-anchor" href="#_3-平行坐标parallel-coordinates" aria-hidden="true">#</a> 3 平行坐标Parallel Coordinates</h2>`,14),h={href:"https://blog.csdn.net/wyfcode/article/details/82587440",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>Parallel Coordinates具体信息如下：</p><table><thead><tr><th>可视化器</th><th>ParallelCoordinates</th></tr></thead><tbody><tr><td>快速使用方法</td><td>parallel_coordinates()</td></tr><tr><td>模型</td><td>分类</td></tr><tr><td>工作流程</td><td>特征分析</td></tr></tbody></table><h3 id="_3-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_3-1-基础使用" aria-hidden="true">#</a> 3.1 基础使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> ParallelCoordinates
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy

<span class="token comment"># Load the classification data set</span>
<span class="token comment"># 载入房屋使用率数据库</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Specify the features of interest and the classes of the target</span>
<span class="token comment"># 感兴趣特征</span>
features <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;relative humidity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;light&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CO2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;humidity&quot;</span>
<span class="token punctuation">]</span>

<span class="token comment"># 分类结果</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># 可视化</span>

<span class="token comment"># feature表示要可视化的特征，</span>
<span class="token comment"># sample表示指定要从数据显示多少个示例。如果为int，则指定要显示的最大样本数。如果为floa则指定要显示的百分比。</span>
<span class="token comment"># shuffle表示是否随机选择样本</span>
visualizer <span class="token operator">=</span> ParallelCoordinates<span class="token punctuation">(</span>
    classes<span class="token operator">=</span>classes<span class="token punctuation">,</span> features<span class="token operator">=</span>features<span class="token punctuation">,</span> sample<span class="token operator">=</span><span class="token number">0.05</span><span class="token punctuation">,</span> shuffle<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token punctuation">)</span>

<span class="token comment"># Fit and transform the data to the visualizer</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

<span class="token comment"># Finalize the title and axes then display the visualization</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_22_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>但是不幸的是，当我们检查这个类时，我们可以看到每个特性的域可能使可视化难以解释。在上面的可视化中，light特征的区域变化范围远远大于为temperature的变化范围范围。为了解决这个问题，每个特征都应该被缩放或规范化，使它们近似在同一个域中。</p><p>可以使用normalize参数直接将规范化技术应用于可视化工具，而无需预先转换数据（尽管也可以这样做）。有几种normalize选择器可用；尝试使用minmax、maxabs、standard、l1或l2标准化来更改平行坐标中的透视图，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> ParallelCoordinates
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy

<span class="token comment"># Load the classification data set</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Specify the features of interest and the classes of the target</span>
features <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;relative humidity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;light&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CO2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;humidity&quot;</span>
<span class="token punctuation">]</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> ParallelCoordinates<span class="token punctuation">(</span>
    classes<span class="token operator">=</span>classes<span class="token punctuation">,</span> features<span class="token operator">=</span>features<span class="token punctuation">,</span>
    normalize<span class="token operator">=</span><span class="token string">&#39;standard&#39;</span><span class="token punctuation">,</span> sample<span class="token operator">=</span><span class="token number">0.05</span><span class="token punctuation">,</span> shuffle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment"># Fit the visualizer and display it</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_24_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>现在我们可以看到每个特征都在[-3，3]范围内，其中特征的平均值设置为零，每个特征的单位方差在[-1，1]之间应用（因为我们通过标准normalize参数使用StandardScaler）。这个版本的平行坐标可以让我们更好地理解特征的分布。</p><h3 id="_3-2-加速平行坐标图绘制" tabindex="-1"><a class="header-anchor" href="#_3-2-加速平行坐标图绘制" aria-hidden="true">#</a> 3.2 加速平行坐标图绘制</h3><p>绘制平行坐标可能需要很长时间，因为每个实例都由每个特征的一条线表示。更糟糕的是，这段时间花得不好，因为可视化中的大量重叠使平行坐标变得不易理解。对此，我们提出两种解决方案：</p><ol><li>使用sample=0.2和shuffle=True参数可以对图上绘制的数据集进行混洗和采样。sample参数将对数据执行统一的随机抽样，选择指定的百分比。</li><li>使用该ast=True参数启用“快速绘制模式”。</li></ol><p>“快速”绘制模式通过按类绘制每个线段，而不是分别绘制每个实例，极大地提高了平行坐标绘制算法的性能。但是，这种改进的性能需要付出一定的代价，因为所产生的可视化效果略有不同。在下面的快速绘图模式下可视化效果：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> ParallelCoordinates
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy

<span class="token comment"># Load the classification data set</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Specify the features of interest and the classes of the target</span>
features <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;relative humidity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;light&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CO2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;humidity&quot;</span>
<span class="token punctuation">]</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> ParallelCoordinates<span class="token punctuation">(</span>
    classes<span class="token operator">=</span>classes<span class="token punctuation">,</span> features<span class="token operator">=</span>features<span class="token punctuation">,</span>
    normalize<span class="token operator">=</span><span class="token string">&#39;standard&#39;</span><span class="token punctuation">,</span> sample<span class="token operator">=</span><span class="token number">0.05</span><span class="token punctuation">,</span> faster<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>shuffle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment"># Fit the visualizer and display it</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_27_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-3-快速方法" tabindex="-1"><a class="header-anchor" href="#_3-3-快速方法" aria-hidden="true">#</a> 3.3 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现parallel_coordinates。此方法将ParallelCoordinates使用关联的参数构建对象，将其拟合，然后（可选）立即显示它。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features<span class="token punctuation">.</span>pcoords <span class="token keyword">import</span> parallel_coordinates
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy

<span class="token comment"># Load the classification data set</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Specify the features of interest and the classes of the target</span>
features <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;temperature&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;relative humidity&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;light&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;CO2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;humidity&quot;</span>
<span class="token punctuation">]</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> parallel_coordinates<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> classes<span class="token operator">=</span>classes<span class="token punctuation">,</span> features<span class="token operator">=</span>features<span class="token punctuation">,</span>sample<span class="token operator">=</span><span class="token number">0.05</span><span class="token punctuation">,</span>shuffle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_29_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-pca投影" tabindex="-1"><a class="header-anchor" href="#_4-pca投影" aria-hidden="true">#</a> 4 PCA投影</h2><p>可视化工具利用主成分分析PCA将每个主成分分解成两个高维散度的实例。PCA的使用意味着可以沿着主变差轴分析投影数据集，并可以解释为确定是否可以使用球面距离度量。</p><p>PCA具体信息如下：</p><table><thead><tr><th>可视化器</th><th>PCA</th></tr></thead><tbody><tr><td>快速使用方法</td><td>pca_decomposition()</td></tr><tr><td>模型</td><td>分类/回归</td></tr><tr><td>工作流程</td><td>特征工程/选择</td></tr></tbody></table><h3 id="_4-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_4-1-基本使用" aria-hidden="true">#</a> 4.1 基本使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_credit
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> PCA

<span class="token comment"># Specify the features of interest and the target</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;account in default&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;current with bills&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># scale表示是否可视化,降维为两个维度</span>
visualizer <span class="token operator">=</span> PCA<span class="token punctuation">(</span>scale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> classes<span class="token operator">=</span>classes<span class="token punctuation">)</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/preprocessing/data.py:617: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.partial_fit(X, y)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/base.py:462: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.fit(X, **fit_params).transform(X)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/pipeline.py:451: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  Xt = transform.transform(Xt)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_32_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>也可以在三个维度上绘制PCA投影，以尝试可视化更多主要成分并更好地了解高维度上的分布。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_credit
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> PCA

X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;account in default&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;current with bills&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># projection表示维度，只有二维和三维</span>
visualizer <span class="token operator">=</span> PCA<span class="token punctuation">(</span>
    scale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> projection<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span> classes<span class="token operator">=</span>classes
<span class="token punctuation">)</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/preprocessing/data.py:617: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.partial_fit(X, y)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/base.py:462: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.fit(X, **fit_params).transform(X)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/pipeline.py:451: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  Xt = transform.transform(Xt)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_34_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-2-双标图biplot" tabindex="-1"><a class="header-anchor" href="#_4-2-双标图biplot" aria-hidden="true">#</a> 4.2 双标图Biplot</h3>`,33),f={href:"https://bbs.pinggu.org/thread-1384773-1-1.html#opennewwindow",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> PCA

<span class="token comment"># Load the concrete dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

visualizer <span class="token operator">=</span> PCA<span class="token punctuation">(</span>scale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> proj_features<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/preprocessing/data.py:617: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  return self.partial_fit(X, y)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/base.py:462: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  return self.fit(X, **fit_params).transform(X)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/pipeline.py:451: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  Xt = transform.transform(Xt)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_36_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>三维biplot如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> PCA

X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

visualizer <span class="token operator">=</span> PCA<span class="token punctuation">(</span>scale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> proj_features<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> projection<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>
result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/preprocessing/data.py:617: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  return self.partial_fit(X, y)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/base.py:462: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  return self.fit(X, **fit_params).transform(X)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/pipeline.py:451: DataConversionWarning: Data with input dtype int64, float64 were all converted to float64 by StandardScaler.
  Xt = transform.transform(Xt)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_38_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-3-快速方法" tabindex="-1"><a class="header-anchor" href="#_4-3-快速方法" aria-hidden="true">#</a> 4.3 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现pca_decomposition。此方法将PCA使用关联的参数构建对象，将其拟合，然后（可选）立即显示它。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> pca_decomposition

<span class="token comment"># Specify the features of interest and the target</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_credit<span class="token punctuation">(</span><span class="token punctuation">)</span>
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;account in default&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;current with bills&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># Create, fit, and show the visualizer</span>
pca_decomposition<span class="token punctuation">(</span>
    X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> scale<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> classes<span class="token operator">=</span>classes
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/preprocessing/data.py:617: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.partial_fit(X, y)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/base.py:462: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  return self.fit(X, **fit_params).transform(X)
/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/pipeline.py:451: DataConversionWarning: Data with input dtype int64 were all converted to float64 by StandardScaler.
  Xt = transform.transform(Xt)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_40_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_5-流形可视化manifold-visualization" tabindex="-1"><a class="header-anchor" href="#_5-流形可视化manifold-visualization" aria-hidden="true">#</a> 5 流形可视化Manifold Visualization</h2>`,13),w={href:"https://www.cnblogs.com/lzhu/p/9146976.html",target:"_blank",rel:"noopener noreferrer"},_=t(`<p>流形可视化工具使用流形学习提供高维可视化，将由多个维度描述的实例嵌入到2维，从而允许创建显示数据中潜在结构的散点图。与PCA和SVD等分解方法不同，流形通常使用最近邻方法进行嵌入，这样就可以捕捉到否则会丢失的非线性结构。然后，可以分析产生的投影的噪声或可分性，以确定是否可以在数据中创建决策空间。</p><p>流形可视化具体信息如下：</p><table><thead><tr><th>可视化器</th><th>Manifold</th></tr></thead><tbody><tr><td>快速使用方法</td><td>manifold_embedding()</td></tr><tr><td>模型</td><td>分类/回归</td></tr><tr><td>工作流程</td><td>特征工程</td></tr></tbody></table><p>通过将流形指定为可视化工具的字符串，流形可视化工具允许访问所有当前可用的scikit流行方法实现。当前实现的默认流形方法如下：</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>&quot;lle&quot;</td><td>局部线性嵌入（LLE）使用许多局部线性分解来保留全局非线性结构。</td></tr><tr><td>&quot;ltsa&quot;</td><td>LTSA LLE：局部切线空间对齐与LLE相似，因为它使用局部性来保留邻域距离。</td></tr><tr><td>&quot;hessian&quot;</td><td>Hessian LLE一种LLE正则化方法，该方法在每个邻域应用基于hessian的二次形式</td></tr><tr><td>&quot;modified&quot;</td><td>修改后的LLE将正则化参数应用于LLE。</td></tr><tr><td>&quot;isomap&quot;</td><td>Isomap寻求较低维的嵌入，以保持每个实例之间的几何距离。</td></tr><tr><td>&quot;mds&quot;</td><td>MDS：多维缩放使用相似性来绘制在嵌入中彼此靠近的点。</td></tr><tr><td>&quot;spectral&quot;</td><td>频谱使用图形表示嵌入低维流形的离散逼近。</td></tr><tr><td>&quot;tsne&quot;</td><td>t-SNE：将点的相似度转换为概率，然后使用这些概率创建嵌入。</td></tr></tbody></table><p>每种流形算法产生不同的嵌入，并利用底层数据的不同属性。一般来说，它需要对新数据进行多次尝试，以确定最适合数据中潜在结构的流形。但是请注意，不同的流形算法有不同的时间、复杂性和资源需求。流形可以用于许多类型的问题，散点图中使用的颜色可以描述目标实例。在无监督或聚类问题中，使用单一颜色来显示结构和重叠。在分类问题中，每一类都使用离散颜色。在回归问题中，颜色图可以用来描述点作为回归值的热图。</p><h3 id="_5-1-离散目标" tabindex="-1"><a class="header-anchor" href="#_5-1-离散目标" aria-hidden="true">#</a> 5.1 离散目标</h3><p>在分类或聚类问题中，实例可以用离散的标签来描述——监督问题中的类或类别，或者在无监督版本中它们所属的簇。流形通过为每个标签指定颜色并在图例中显示标签来可视化这一点。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Manifold
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split

<span class="token comment"># Load the classification dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># 数据集太大，影响速度，所以提取部分数据</span>
_<span class="token punctuation">,</span> X<span class="token punctuation">,</span>  _<span class="token punctuation">,</span> y <span class="token operator">=</span> train_test_split<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">,</span> random_state <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># manifold选择实例方法</span>
viz <span class="token operator">=</span> Manifold<span class="token punctuation">(</span>manifold<span class="token operator">=</span><span class="token string">&quot;tsne&quot;</span><span class="token punctuation">,</span> classes<span class="token operator">=</span>classes<span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
result<span class="token operator">=</span>viz<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>  
<span class="token comment"># Finalize and render the figure</span>
viz<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_45_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>可视化还显示生成嵌入所需的时间；如您所见，即使对于相对较小的数据集，这也可能需要很长时间。一个技巧是使用StandardScalar缩放数据；另一个技巧是对实例进行采样（例如使用train_test_split来保持类分层），或者过滤特征以减少数据集中的稀疏性。</p><p>一种常见的机制是用于SelectKBest选择与目标数据集具有统计相关性的要素。例如，我们可以使用f_classif分数在入住数据集中找到3个最佳特征。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>pipeline <span class="token keyword">import</span> Pipeline
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> f_classif<span class="token punctuation">,</span> SelectKBest

<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Manifold
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split

<span class="token comment"># Load the classification dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape
classes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># 数据集太大，影响速度，所以提取部分数据</span>
_<span class="token punctuation">,</span> X<span class="token punctuation">,</span>  _<span class="token punctuation">,</span> y <span class="token operator">=</span> train_test_split<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">,</span> random_state <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape

<span class="token comment"># Create a pipeline</span>
model <span class="token operator">=</span> Pipeline<span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">(</span><span class="token string">&quot;selectk&quot;</span><span class="token punctuation">,</span> SelectKBest<span class="token punctuation">(</span>k<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span> score_func<span class="token operator">=</span>f_classif<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token string">&quot;viz&quot;</span><span class="token punctuation">,</span> Manifold<span class="token punctuation">(</span>manifold<span class="token operator">=</span><span class="token string">&quot;tsne&quot;</span><span class="token punctuation">,</span> classes<span class="token operator">=</span>classes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>

result<span class="token operator">=</span>model<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>          <span class="token comment"># Fit the data to the model</span>
model<span class="token punctuation">.</span>named_steps<span class="token punctuation">[</span><span class="token string">&#39;viz&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment"># Finalize and render the figure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_47_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_5-2-连续目标" tabindex="-1"><a class="header-anchor" href="#_5-2-连续目标" aria-hidden="true">#</a> 5.2 连续目标</h3><p>对于回归目标或将颜色指定为连续值的热图，请指定target_type=&quot;continuous&quot;。请注意，默认情况下target_type=&quot;auto&quot;已设置参数，该参数 通过计算中的唯一值的数量来确定目标是离散的还是连续的y。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> Manifold
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete

<span class="token comment"># Load the regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># 许多流形算法都是基于最近邻居的，对于这些算法，此参数指定要在嵌入中使用的邻居的数量。</span>
<span class="token comment"># 如果未为这些嵌入指定n_neighbors，则将其设置为5并发出警告。如果流形算法不使用最近的邻居，则忽略此参数。</span>
viz <span class="token operator">=</span> Manifold<span class="token punctuation">(</span>manifold<span class="token operator">=</span><span class="token string">&quot;isomap&quot;</span><span class="token punctuation">,</span> n_neighbors<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>

result<span class="token operator">=</span>viz<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>  <span class="token comment"># Fit the data to the visualizer</span>
viz<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>               <span class="token comment"># Finalize and render the figure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_49_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>&lt;matplotlib.axes._subplots.AxesSubplot at 0x7f4869e8afd0&gt;
</code></pre><h3 id="_5-3-快速方法" tabindex="-1"><a class="header-anchor" href="#_5-3-快速方法" aria-hidden="true">#</a> 5.3 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现manifold_embedding。此方法将Manifold使用关联的参数构建对象，将其拟合，然后（可选）立即显示可视化效果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> manifold_embedding
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete

<span class="token comment"># Load the regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
manifold_embedding<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> manifold<span class="token operator">=</span><span class="token string">&quot;isomap&quot;</span><span class="token punctuation">,</span> n_neighbors<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_51_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_6-双变量关系图" tabindex="-1"><a class="header-anchor" href="#_6-双变量关系图" aria-hidden="true">#</a> 6 双变量关系图</h2><p>有时对于特征分析，您只需要一个散点图来确定数据的分布。机器学习对高维数据进行操作，因此必须降维。因此，这些可视化通常用作大型可视化工具的基础；但是，您也可以使用它们在机器学习分析期间快速绘制数据。JointPlotVisualizer根据目标绘制一个特征，并通过每个轴上的直方图显示每个特征的分布。</p><p>流形可视化具体信息如下：</p><table><thead><tr><th>可视化器</th><th>JointPlot</th></tr></thead><tbody><tr><td>快速使用方法</td><td>joint_plot()</td></tr><tr><td>模型</td><td>分类/回归</td></tr><tr><td>工作流程</td><td>特征工程/选择</td></tr></tbody></table><h3 id="_6-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_6-1-基础使用" aria-hidden="true">#</a> 6.1 基础使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> JointPlotVisualizer

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># columns表示指定的特征名</span>
visualizer <span class="token operator">=</span> JointPlotVisualizer<span class="token punctuation">(</span>columns<span class="token operator">=</span><span class="token string">&quot;cement&quot;</span><span class="token punctuation">)</span>

result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>        <span class="token comment"># Fit and transform the data</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>                     <span class="token comment"># Finalize and render the figure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_54_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>&lt;matplotlib.axes._subplots.AxesSubplot at 0x7f486ed49810&gt;
</code></pre><p>该JointPlotVisualizer还可以用来比较两个特征。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> JointPlotVisualizer

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> JointPlotVisualizer<span class="token punctuation">(</span>columns<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;cement&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ash&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>        <span class="token comment"># Fit and transform the data</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>                     <span class="token comment"># Finalize and render the figure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_56_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>&lt;matplotlib.axes._subplots.AxesSubplot at 0x7f486e7c0090&gt;
</code></pre><p>另外，在JointPlotVisualizer很多点的情况下，可以用六边形绘制。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> JointPlotVisualizer

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># kind设置点的显示方法，scatter或者hexbin。默认scatter</span>
visualizer <span class="token operator">=</span> JointPlotVisualizer<span class="token punctuation">(</span>columns<span class="token operator">=</span><span class="token string">&quot;cement&quot;</span><span class="token punctuation">,</span> kind<span class="token operator">=</span><span class="token string">&quot;hexbin&quot;</span><span class="token punctuation">)</span>

result<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>        <span class="token comment"># Fit and transform the data</span>
<span class="token comment"># Finalize and render the figure</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_58_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_6-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_6-2-快速方法" aria-hidden="true">#</a> 6.2 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现joint_plot。此方法将JointPlot使用关联的参数构建对象，将其拟合，然后（可选）立即显示它。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>features <span class="token keyword">import</span> joint_plot

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> joint_plot<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> columns<span class="token operator">=</span><span class="token string">&quot;cement&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记3-特征分析可视化/output_60_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_7-参考" tabindex="-1"><a class="header-anchor" href="#_7-参考" aria-hidden="true">#</a> 7 参考</h2>`,43),q={href:"https://www.jianshu.com/p/e202069489a6",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.scikit-yb.org/en/latest/api/features/rankd.html",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.scikit-yb.org/en/latest/api/features/radviz.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.scikit-yb.org/en/latest/api/features/pcoords.html",target:"_blank",rel:"noopener noreferrer"},X={href:"https://www.scikit-yb.org/en/latest/api/features/pca.html",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.scikit-yb.org/en/latest/api/features/manifold.html",target:"_blank",rel:"noopener noreferrer"},D={href:"https://www.scikit-yb.org/en/latest/api/features/jointplot.html",target:"_blank",rel:"noopener noreferrer"};function P(j,L){const s=o("ExternalLinkIcon");return p(),l("div",null,[r,u,n("p",null,[n("a",d,[k,e(s)])]),v,n("p",null,[a("如果您的数据包含缺失值（numpy.nan）的行，则将不会绘制那些缺失值。换句话说，您可能无法完全了解数据。RadViz会提示DataWarning您丢失的百分比。如果确实收到此警告，则可能需要查看数据插补策略。"),n("a",m,[a("scikit-learn Imputer"),e(s)]),a("是一个很好的起点。")]),b,n("p",null,[a("平行坐标系是一种多维特征可视化技术，其中每个特征的垂直轴是水平复制的。实例显示为从每个垂直轴绘制到表示其在该特征值的位置的一条线段。这使得许多维度可以同时可视化；事实上，给定无限的水平空间（例如滚动窗口），技术上可以显示无限多个维度！数据科学家使用这种方法来检测具有相似类的实例簇，并记录具有高方差或不同分布的特征。我们可以在第一次加载占用分类数据集之后看到这一点。 平行坐标主要解决了在多维（大于三维）情况下数据特征无法可视化的问题。一般来说，用不同的颜色线条代表不同的类别，横轴为不同特征。纵轴为该特征的值。 若在某个特征上相同颜色折线较为集中，不同颜色有一定的间距，则说明该属性对于预测标签类别有较大的帮助。若某个属性上线条混乱，颜色混杂，则较大可能该属性对于标签类别判定没有价值。详细说明见"),n("a",h,[a("数据可视化---平行坐标图的定义及解读方式"),e(s)])]),g,n("p",null,[a("PCA投影可以增强为一个双点图，其点是投影实例，其向量表示高维空间中的数据结构。通过使用proj_features=True，数据集中每个特征的向量都会在散点图上沿着该特征的最大方差方向绘制。这些结构可以用来分析特征对降维的重要性，或者找到相关方差的特征，以便进一步分析。PCA的双标图具体解释见"),n("a",f,[a("https://bbs.pinggu.org/thread-1384773-1-1.html#opennewwindow"),e(s)])]),y,n("p",null,[a("流行学习简单来说就是降维方法的一种，具体介绍见"),n("a",w,[a("流形学习(manifold learning)综述"),e(s)]),a("。")]),_,n("ul",null,[n("li",null,[n("a",q,[a("https://www.jianshu.com/p/e202069489a6"),e(s)])]),n("li",null,[n("a",z,[a("https://www.scikit-yb.org/en/latest/api/features/rankd.html"),e(s)])]),n("li",null,[n("a",x,[a("https://www.scikit-yb.org/en/latest/api/features/radviz.html"),e(s)])]),n("li",null,[n("a",S,[a("https://www.scikit-yb.org/en/latest/api/features/pcoords.html"),e(s)])]),n("li",null,[n("a",X,[a("https://www.scikit-yb.org/en/latest/api/features/pca.html"),e(s)])]),n("li",null,[n("a",C,[a("https://www.scikit-yb.org/en/latest/api/features/manifold.html"),e(s)])]),n("li",null,[n("a",D,[a("https://www.scikit-yb.org/en/latest/api/features/jointplot.html"),e(s)])])])])}const A=i(c,[["render",P],["__file","2020-07-25-_机器学习_ Yellowbrick使用笔记3-特征分析可视化.html.vue"]]);export{A as default};
