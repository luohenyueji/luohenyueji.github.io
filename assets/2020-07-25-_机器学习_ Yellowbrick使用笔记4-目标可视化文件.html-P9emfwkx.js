import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as p,a as n,b as a,d as e,e as t}from"./app-MsA2k2kn.js";const c={},r=n("h1",{id:"机器学习-yellowbrick使用笔记4-目标可视化文件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-yellowbrick使用笔记4-目标可视化文件","aria-hidden":"true"},"#"),a(" [机器学习] Yellowbrick使用笔记4-目标可视化文件")],-1),u={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/Yellowbrick%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"代码下载",-1),k=t(`<ul><li>平衡箱可视化Balanced Binning：生成带有垂直线的直方图，垂直线显示推荐值点，以将数据装箱到均匀分布的箱中。</li><li>类平衡Class Balance：可视化来检查目标，以显示每个类对最终估计器的支持。</li><li>特征相关Feature Correlation：绘制特征和因变量之间的相关性。</li></ul><p>[toc]</p><p>头文件调用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Target Visualizers Imports
from yellowbrick.target import BalancedBinningReference
from yellowbrick.target import ClassBalance
from yellowbrick.target import FeatureCorrelatio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本文如果数据集下载不下来，查看下面地址，然后放入yellowbrick安装目录\\datasets\\fixtures文件夹:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-平衡箱可视化balanced-binning" tabindex="-1"><a class="header-anchor" href="#_1-平衡箱可视化balanced-binning" aria-hidden="true">#</a> 1 平衡箱可视化Balanced Binning</h2><p>通常，现实世界中的机器学习问题会受到维数诅咒的影响；训练实例比预期的要少，而且预测信号分布在许多不同的特征上。有时，当目标变量连续赋值时，根本没有足够的实例来预测这些值达到回归的精度。在这种情况下，我们有时可以将问题转化为连续的分类问题。</p><p>为了帮助用户选择最佳的仓位数量，BalancedBiningReference visualizer将目标变量y作为输入，并生成一个直方图，其中竖线表示建议的值点，以确保数据均匀地分布到每个仓位中。</p><table><thead><tr><th>可视化器</th><th>BalancedBinningReference</th></tr></thead><tbody><tr><td>快速使用方法</td><td>balanced_binning_reference()</td></tr><tr><td>模型</td><td>分类</td></tr><tr><td>工作流程</td><td>特征分析，目标分析，模型选择</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-1-基本使用" aria-hidden="true">#</a> 1.1 基本使用</h3>`,12),m={href:"https://blog.csdn.net/yangwangnndd/article/details/89489946",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> BalancedBinningReference
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token comment"># Load the concrete dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># 可视化器，求各个区间的平均值</span>
visualizer <span class="token operator">=</span> BalancedBinningReference<span class="token punctuation">(</span>bins<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
<span class="token comment"># 拟合数据</span>
a<span class="token operator">=</span>visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
<span class="token comment"># 显示数据     </span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;Figure size 800x550 with 1 Axes&gt;
</code></pre><h3 id="_1-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_1-2-快速方法" aria-hidden="true">#</a> 1.2 快速方法</h3><p>上面的相同功能可以通过关联的快速方法来实现balanced_binning_reference。此方法将BalancedBinningReference使用关联的参数构建对象，将其拟合，然后（可选）立即显示它。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> balanced_binning_reference

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Use the quick method and immediately show the figure</span>
balanced_binning_reference<span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-类平衡class-balance" tabindex="-1"><a class="header-anchor" href="#_2-类平衡class-balance" aria-hidden="true">#</a> 2 类平衡Class Balance</h2><p>分类模型面临的最大挑战之一是训练数据中类的不平衡。严重的类不平衡可能被相对较好的F1和准确度分数掩盖-分类器只是猜测大多数类，而不对代表性不足的类进行任何评估。</p><p>有几种处理类不平衡的技术，例如分层抽样，对多数类进行下采样，加权等。但是，在采取这些措施之前，了解训练数据中的类平衡是什么很重要。ClassBalance visualizer通过为每个类创建支持的条形图来支持这一点，即数据集中类表示的频率。</p><table><thead><tr><th>可视化器</th><th>ClassBalance</th></tr></thead><tbody><tr><td>快速使用方法</td><td>class_balance()</td></tr><tr><td>模型</td><td>分类</td></tr><tr><td>工作流程</td><td>特征分析，目标分析，模型选择</td></tr></tbody></table><h3 id="_2-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_2-1-基本使用" aria-hidden="true">#</a> 2.1 基本使用</h3><p>结果图使我们能够诊断余额问题的严重性。 在此图中，我们可以看到“ win”类主导了其他两个类。 一种可能的解决方案是创建一个二进制分类器：“ win”与“ not win”，并将“ loss”和“ draw”类组合为一个类。ClassBalance函数的功能就是计算各个类下样本数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_game
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> ClassBalance

<span class="token comment"># Load the classification dataset</span>
<span class="token comment"># 载入分类数据库</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_game<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># ClassBalance函数的功能就是计算各个类下样本数。</span>
visualizer <span class="token operator">=</span> ClassBalance<span class="token punctuation">(</span>labels<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;draw&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;loss&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;win&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>y<span class="token punctuation">)</span>        <span class="token comment"># Fit the data to the visualizer</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment"># Finalize and render the figure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>如果在评估期间必须保持类别不平衡(例如，被分类的事件实际上如频率所暗示的那样罕见)，则应使用分层抽样来创建训练和测试集。 这确保了测试数据与训练数据具有大致相同的类比例。虽然SCRICIT-LEARN默认在Train_Test_Split和其他cv方法中执行此操作，但是比较两个Split中每个类的支持情况可能是有用的。</p><p>ClassBalance可视化工具具有“比较”模式，在该模式下，可以将训练和测试数据传递给FIT()，从而创建并排条形图而不是单个条形图，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> TimeSeriesSplit

<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_occupancy
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> ClassBalance

<span class="token comment"># Load the classification dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_occupancy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Create the training and test data</span>
<span class="token comment"># 时间分割序列数据</span>
tscv <span class="token operator">=</span> TimeSeriesSplit<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> train_index<span class="token punctuation">,</span> test_index <span class="token keyword">in</span> tscv<span class="token punctuation">.</span>split<span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token punctuation">:</span>
    X_train<span class="token punctuation">,</span> X_test <span class="token operator">=</span> X<span class="token punctuation">.</span>iloc<span class="token punctuation">[</span>train_index<span class="token punctuation">]</span><span class="token punctuation">,</span> X<span class="token punctuation">.</span>iloc<span class="token punctuation">[</span>test_index<span class="token punctuation">]</span>
    y_train<span class="token punctuation">,</span> y_test <span class="token operator">=</span> y<span class="token punctuation">.</span>iloc<span class="token punctuation">[</span>train_index<span class="token punctuation">]</span><span class="token punctuation">,</span> y<span class="token punctuation">.</span>iloc<span class="token punctuation">[</span>test_index<span class="token punctuation">]</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> ClassBalance<span class="token punctuation">(</span>labels<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;unoccupied&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;occupied&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>y_train<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span>        <span class="token comment"># Fit the data to the visualizer</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/model_selection/_split.py:752: FutureWarning: You should specify a value for &#39;n_splits&#39; instead of relying on the default value. The default value will change from 3 to 5 in version 0.22.
  warnings.warn(NSPLIT_WARNING, FutureWarning)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_12_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>这种可视化使我们可以快速检查，以确保每个类在两个拆分中的比例大致相似。这种可视化应该是第一步，尤其是当评估指标在不同的分割中高度可变时。</p><h3 id="_2-2-快速使用" tabindex="-1"><a class="header-anchor" href="#_2-2-快速使用" aria-hidden="true">#</a> 2.2 快速使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_game
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> class_balance

<span class="token comment"># Load the dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_game<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Use the quick method and immediately show the figure</span>
class_balance<span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_15_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-特征相关feature-correlation" tabindex="-1"><a class="header-anchor" href="#_3-特征相关feature-correlation" aria-hidden="true">#</a> 3 特征相关Feature Correlation</h2><p>该可视化工具计算皮尔逊相关系数和特征与因变量之间的互信息。 这种可视化可以用于特征选择，以识别与因变量具有高相关性或大互信息的特征。</p><p>默认计算是Pearson相关性，这是使用scipy.stats.Pearsonr执行的。</p><table><thead><tr><th>可视化器</th><th>FeatureCorrelation</th></tr></thead><tbody><tr><td>快速使用方法</td><td>feature_correlation()</td></tr><tr><td>模型</td><td>回归/分类/聚类</td></tr><tr><td>工作流程</td><td>特征分析/模型选择</td></tr></tbody></table><h3 id="_3-1-person分析" tabindex="-1"><a class="header-anchor" href="#_3-1-person分析" aria-hidden="true">#</a> 3.1 Person分析</h3><p>FeatureCorrelation通过method设置来确定分析方法，默认是person分析，除此之外还有mutual_info-regression，通过sklearn.feature_selection中的mutual_info-regression计算，还有mutual_info-classification，通过sklearn.feature_selection中的mutual_info_classif计算。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn <span class="token keyword">import</span> datasets
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> FeatureCorrelation

<span class="token comment"># Load the regression dataset</span>
data <span class="token operator">=</span> datasets<span class="token punctuation">.</span>load_diabetes<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">[</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># Create a list of the feature names</span>
features <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">&#39;feature_names&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the visualizer</span>
<span class="token comment"># 计算x中的每个特征与y的相关性</span>
visualizer <span class="token operator">=</span> FeatureCorrelation<span class="token punctuation">(</span>labels<span class="token operator">=</span>features<span class="token punctuation">)</span>

<span class="token comment"># Fit the data to the visualizer</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>        
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_18_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-mutual-information-regression分析" tabindex="-1"><a class="header-anchor" href="#_3-2-mutual-information-regression分析" aria-hidden="true">#</a> 3.2 Mutual Information Regression分析</h3>`,32),b={href:"https://www.cntofu.com/book/48/shu-xue-ji-chu/xin-xi-lun/hu-xin-xi.md",target:"_blank",rel:"noopener noreferrer"},h={href:"https://blog.csdn.net/gdanskamir/article/details/54913233",target:"_blank",rel:"noopener noreferrer"},g={href:"http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.mutual_info_classif.html",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn <span class="token keyword">import</span> datasets
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> FeatureCorrelation
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token comment"># Load the regression dataset</span>
data <span class="token operator">=</span> datasets<span class="token punctuation">.</span>load_diabetes<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">[</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># Create a list of the feature names</span>
features <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">&#39;feature_names&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># Create a list of the discrete features</span>
<span class="token comment"># 创建离散变量列表</span>
discrete <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">False</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>features<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token comment"># discrete为age需要变为离散变量</span>
discrete<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>

<span class="token comment"># Instantiate the visualizer</span>
visualizer <span class="token operator">=</span> FeatureCorrelation<span class="token punctuation">(</span>method<span class="token operator">=</span><span class="token string">&#39;mutual_info-regression&#39;</span><span class="token punctuation">,</span> labels<span class="token operator">=</span>features<span class="token punctuation">)</span>

visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> discrete_features<span class="token operator">=</span>discrete<span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-3-mutual-information-classification分析" tabindex="-1"><a class="header-anchor" href="#_3-3-mutual-information-classification分析" aria-hidden="true">#</a> 3.3 Mutual Information Classification分析</h3><p>通过与pandas DataFrame配合，可以从列名称中自动获取功能标签。该可视化器还允许根据计算出互信息（或Pearson相关系数）对条形图进行排序，并通过指定特征名称或特征索引来选择要绘制的特征。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token keyword">from</span> sklearn <span class="token keyword">import</span> datasets
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target <span class="token keyword">import</span> FeatureCorrelation

<span class="token comment"># Load the regression dataset</span>
<span class="token comment"># 导入分类数据</span>
data <span class="token operator">=</span> datasets<span class="token punctuation">.</span>load_wine<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">[</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">]</span>
X_pd <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span>X<span class="token punctuation">,</span> columns<span class="token operator">=</span>data<span class="token punctuation">[</span><span class="token string">&#39;feature_names&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># Create a list of the features to plot</span>
features <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;alcohol&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ash&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;proline&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;total_phenols&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># Instaniate the visualizer</span>
<span class="token comment"># sort设置是否排序</span>
visualizer <span class="token operator">=</span> FeatureCorrelation<span class="token punctuation">(</span>
    method<span class="token operator">=</span><span class="token string">&#39;mutual_info-classification&#39;</span><span class="token punctuation">,</span> feature_names<span class="token operator">=</span>features<span class="token punctuation">,</span> sort<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token punctuation">)</span>

visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X_pd<span class="token punctuation">,</span> y<span class="token punctuation">)</span>        <span class="token comment"># Fit the data to the visualizer</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_22_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-4-快速使用" tabindex="-1"><a class="header-anchor" href="#_3-4-快速使用" aria-hidden="true">#</a> 3.4 快速使用</h3><p>上面的相同功能可以通过关联的快速方法来实现feature_correlation。此方法将FeatureCorrelation使用关联的参数构建对象，将其拟合，然后（可选）立即显示它</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">from</span> sklearn <span class="token keyword">import</span> datasets
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>target<span class="token punctuation">.</span>feature_correlation <span class="token keyword">import</span> feature_correlation

<span class="token comment">#Load the diabetes dataset</span>
data <span class="token operator">=</span> datasets<span class="token punctuation">.</span>load_iris<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">[</span><span class="token string">&#39;target&#39;</span><span class="token punctuation">]</span>

features <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">&#39;feature_names&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
visualizer <span class="token operator">=</span> feature_correlation<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> labels<span class="token operator">=</span>features<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>tight_layout<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记4-目标可视化文件/output_24_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>&lt;Figure size 432x288 with 0 Axes&gt;
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,12),_={href:"https://www.scikit-yb.org/en/latest/api/target/binning.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.scikit-yb.org/en/latest/api/target/class_balance.html",target:"_blank",rel:"noopener noreferrer"},w={href:"https://blog.csdn.net/gdanskamir/article/details/54913233",target:"_blank",rel:"noopener noreferrer"},q={href:"https://www.scikit-yb.org/en/latest/api/target/feature_correlation.html#yellowbrick.target.feature_correlation.FeatureCorrelation",target:"_blank",rel:"noopener noreferrer"};function x(z,C){const s=o("ExternalLinkIcon");return l(),p("div",null,[r,n("p",null,[a("目标可视化工具专门用于直观地描述用于监督建模的因变量，通常称为y目标。 "),n("a",u,[d,e(s)]),a(" 当前实现了以下可视化：")]),k,n("p",null,[a("BalancedBinningReference实际就是应用numpy中的histogram进行数据可视化,histogram()会对区间中数组所对应的权值进行求和，bins决定分箱个数。关于numpy中的histogram函数具体见： "),n("a",m,[a("numpy之histogram"),e(s)])]),v,n("p",null,[a("互信息详细见："),n("a",b,[a("https://www.cntofu.com/book/48/shu-xue-ji-chu/xin-xi-lun/hu-xin-xi.md"),e(s)])]),n("p",null,[a("互信息与相关性的区别见："),n("a",h,[a("https://blog.csdn.net/gdanskamir/article/details/54913233"),e(s)])]),n("p",null,[a("但是回归中，连续数据需要转换为离散数据。特征和因变量之间的相互信息是使用sklearn.feature_selection.mutual_info_classifwhen method='mutual_info-classification'和mutual_info_regressionwhen 计算的method='mutual_info-regression'。在计算互信息时，指定离散特征非常重要，因为连续变量和离散变量的计算是不同的。sklearn中参考文档见"),n("a",g,[a("http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.mutual_info_classif.html"),e(s)])]),f,n("ul",null,[n("li",null,[n("a",_,[a("https://www.scikit-yb.org/en/latest/api/target/binning.html"),e(s)])]),n("li",null,[n("a",y,[a("https://www.scikit-yb.org/en/latest/api/target/class_balance.html"),e(s)])]),n("li",null,[n("a",w,[a("https://blog.csdn.net/gdanskamir/article/details/54913233"),e(s)])]),n("li",null,[n("a",q,[a("https://www.scikit-yb.org/en/latest/api/target/feature_correlation.html#yellowbrick.target.feature_correlation.FeatureCorrelation"),e(s)])])])])}const S=i(c,[["render",x],["__file","2020-07-25-_机器学习_ Yellowbrick使用笔记4-目标可视化文件.html.vue"]]);export{S as default};
