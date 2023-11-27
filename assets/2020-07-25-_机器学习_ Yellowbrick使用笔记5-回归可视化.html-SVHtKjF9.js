import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as l,c as p,a as n,b as a,d as e,e as t}from"./app-MsA2k2kn.js";const c={},r=n("h1",{id:"机器学习-yellowbrick使用笔记5-回归可视化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-yellowbrick使用笔记5-回归可视化","aria-hidden":"true"},"#"),a(" [机器学习] Yellowbrick使用笔记5-回归可视化")],-1),u={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/Yellowbrick%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"代码下载",-1),k=t(`<p>我们目前已经实施了三种回归评估：</p><ul><li>残差图Residuals Plot：绘制期望值与实际值之间的差</li><li>预测误差图Prediction Error Plot：在模型空间中绘制期望值与实际值</li><li>alpha选择：视觉调整正则化超参数</li><li>库克距离Cook’s Distance：描述了单个样本对整个回归模型的影响程度</li></ul><p>Estimator score Visualizer包装Scikit Learn estimators并公开Estimator API，以便它们具有fit（）、predict（）和score（）方法，这些方法在幕后调用适当的估计器方法。Score可视化工具可以包装一个估计器，并作为管道或VisualPipeline中的最后一步传入。 本文如果数据集下载不下来，查看下面地址，然后放入yellowbrick安装目录\\datasets\\fixtures文件夹:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-残差图residuals-plot" tabindex="-1"><a class="header-anchor" href="#_1-残差图residuals-plot" aria-hidden="true">#</a> 1 残差图Residuals Plot</h2><p>在回归模型的上下文中，残差是目标变量的观测值（y）与预测值（ŷ）之间的差，即预测的误差。残差图显示了垂直轴上的残差与水平轴上的因变量之间的差异，使您可以检测目标中可能会或多或少地产生误差的区域。</p><table><thead><tr><th>可视化器</th><th>ResidualsPlot</th></tr></thead><tbody><tr><td>快速使用方法</td><td>residuals_plot()</td></tr><tr><td>模型</td><td>回归</td></tr><tr><td>工作流程</td><td>模型评估</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-基础使用" tabindex="-1"><a class="header-anchor" href="#_1-1-基础使用" aria-hidden="true">#</a> 1.1 基础使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> Ridge
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> ResidualsPlot

<span class="token comment"># Load a regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Create the train and test data</span>
<span class="token comment"># 数据分离</span>
X_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> y_test <span class="token operator">=</span> train_test_split<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the linear model and visualizer</span>
<span class="token comment"># 初始化模型</span>
model <span class="token operator">=</span> Ridge<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 残差可视化</span>
visualizer <span class="token operator">=</span> ResidualsPlot<span class="token punctuation">(</span>model<span class="token punctuation">)</span>

<span class="token comment"># Fit the training data to the visualizer</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X_train<span class="token punctuation">,</span> y_train<span class="token punctuation">)</span>  
<span class="token comment"># Evaluate the model on the test data</span>
<span class="token comment"># 评价模型</span>
visualizer<span class="token punctuation">.</span>score<span class="token punctuation">(</span>X_test<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span>  
<span class="token comment"># Finalize and render the figure</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_4_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>残差图的常见用途是分析回归器的误差方差。如果这些点围绕水平轴随机分散，则通常适用于数据的线性回归模型；否则，非线性模型更为合适。在上述情况下，我们在二维图中看到相对于目标的残差相当随机，均匀的分布。这似乎表明我们的线性模型运行良好。从直方图中我们还可以看到，我们的误差通常在零附近分布，这通常也表明模型拟合良好。</p><p>请注意，如果不需要直方图，则可以使用hist=False标志将其关闭：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>visualizer <span class="token operator">=</span> ResidualsPlot<span class="token punctuation">(</span>model<span class="token punctuation">,</span> hist<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X_train<span class="token punctuation">,</span> y_train<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>score<span class="token punctuation">(</span>X_test<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_6_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_1-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_1-2-快速方法" aria-hidden="true">#</a> 1.2 快速方法</h3><p>使用关联的快速方法，可以在一行中实现与上述类似的功能residuals_plot。此方法将实例化ResidualsPlot可视化程序并将其适合于训练数据，然后将其在可选提供的测试数据（或未提供的训练数据）上评分</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>ensemble <span class="token keyword">import</span> RandomForestRegressor
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split <span class="token keyword">as</span> tts
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> residuals_plot
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete

<span class="token comment"># Load the dataset and split into train/test splits</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

X_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> y_test <span class="token operator">=</span> tts<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span> shuffle<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token comment"># Create the visualizer, fit, score, and show it</span>
viz <span class="token operator">=</span> residuals_plot<span class="token punctuation">(</span>RandomForestRegressor<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> X_train<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/ensemble/forest.py:248: FutureWarning: The default value of n_estimators will change from 10 in version 0.20 to 100 in 0.22.
  &quot;10 in version 0.20 to 100 in 0.22.&quot;, FutureWarning)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_8_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>预测误差图显示了数据集的实际目标与我们的模型生成的预测值之间的关系。这使我们可以看到模型中有多少方差。数据科学家可以通过与预测完全匹配模型的45度线进行比较，使用此图来诊断回归模型。</p><table><thead><tr><th>可视化器</th><th>PredictionError</th></tr></thead><tbody><tr><td>快速使用方法</td><td>prediction_error()</td></tr><tr><td>模型</td><td>回归</td></tr><tr><td>工作流程</td><td>模型评估</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> Lasso
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> PredictionError

<span class="token comment"># Load a regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Create the train and test data</span>
X_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> y_test <span class="token operator">=</span> train_test_split<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the linear model and visualizer</span>
model <span class="token operator">=</span> Lasso<span class="token punctuation">(</span><span class="token punctuation">)</span>
visualizer <span class="token operator">=</span> PredictionError<span class="token punctuation">(</span>model<span class="token punctuation">)</span>

<span class="token comment"># Fit the training data to the visualizer</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X_train<span class="token punctuation">,</span> y_train<span class="token punctuation">)</span>  
<span class="token comment"># Evaluate the model on the test data</span>
visualizer<span class="token punctuation">.</span>score<span class="token punctuation">(</span>X_test<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span>  
<span class="token comment"># Finalize and render the figure</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_10_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_2-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_2-2-快速方法" aria-hidden="true">#</a> 2.2 快速方法</h3><p>使用关联的快速方法可以实现相同的功能prediction_error。此方法将PredictionError使用关联的参数构建对象，将其拟合，然后（可选）立即显示可视化效果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> train_test_split
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> Lasso
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> prediction_error

<span class="token comment"># Load a regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Create the train and test data</span>
X_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> y_test <span class="token operator">=</span> train_test_split<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> test_size<span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">42</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the linear model and visualizer</span>
model <span class="token operator">=</span> Lasso<span class="token punctuation">(</span><span class="token punctuation">)</span>
visualizer <span class="token operator">=</span> prediction_error<span class="token punctuation">(</span>model<span class="token punctuation">,</span> X_train<span class="token punctuation">,</span> y_train<span class="token punctuation">,</span> X_test<span class="token punctuation">,</span> y_test<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_12_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-alpha选择" tabindex="-1"><a class="header-anchor" href="#_2-alpha选择" aria-hidden="true">#</a> 2 alpha选择</h2><p>正则化设计用来惩罚模型的复杂性，因此alpha越高，模型的复杂性就越低，从而减少了因方差（过拟合）引起的误差。另一方面，过高的Alpha会由于偏差（欠拟合）而增加误差。因此，重要的是选择一个最佳的alpha，以使两个方向的误差最小。</p><p>AlphaSelection可视化工具演示了在线性模型正则化过程中，alpha的不同值是如何影响模型选择的。一般来说，正则化对α的影响更大。</p><table><thead><tr><th>可视化器</th><th>AlphaSelection</th></tr></thead><tbody><tr><td>快速使用方法</td><td>alphas()</td></tr><tr><td>模型</td><td>回归</td></tr><tr><td>工作流程</td><td>模型选择，超参数调整</td></tr></tbody></table><h3 id="_3-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_3-1-基本使用" aria-hidden="true">#</a> 3.1 基本使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> LassoCV
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> AlphaSelection
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete

<span class="token comment"># Load the regression dataset</span>
<span class="token comment"># 加载数据集</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Create a list of alphas to cross-validate against</span>
<span class="token comment"># 创建不同的alphas值</span>
alphas <span class="token operator">=</span> np<span class="token punctuation">.</span>logspace<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate the linear model and visualizer</span>
model <span class="token operator">=</span> LassoCV<span class="token punctuation">(</span>alphas<span class="token operator">=</span>alphas<span class="token punctuation">)</span>
visualizer <span class="token operator">=</span> AlphaSelection<span class="token punctuation">(</span>model<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/model_selection/_split.py:1943: FutureWarning: You should specify a value for &#39;cv&#39; instead of relying on the default value. The default value will change from 3 to 5 in version 0.22.
  warnings.warn(CV_WARNING, FutureWarning)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_15_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_3-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_3-2-快速方法" aria-hidden="true">#</a> 3.2 快速方法</h3><p>上面的相同功能可以通过关联的快速方法alpha来实现。此方法将AlphaSelection使用关联的参数构建Visualizer对象，将其拟合，然后（可选）立即显示它。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> LassoCV
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor<span class="token punctuation">.</span>alphas <span class="token keyword">import</span> alphas

<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_energy

<span class="token comment"># Load dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_energy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Use the quick method and immediately show the figure</span>
alphas<span class="token punctuation">(</span>LassoCV<span class="token punctuation">(</span>random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> X<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/model_selection/_split.py:1943: FutureWarning: You should specify a value for &#39;cv&#39; instead of relying on the default value. The default value will change from 3 to 5 in version 0.22.
  warnings.warn(CV_WARNING, FutureWarning)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_17_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-库克距离cook-s-distance" tabindex="-1"><a class="header-anchor" href="#_3-库克距离cook-s-distance" aria-hidden="true">#</a> 3 库克距离Cook’s Distance</h2>`,42),m={href:"http://sofasofa.io/forum_main_post.php?postid=1000622",target:"_blank",rel:"noopener noreferrer"},v=t(`<table><thead><tr><th>可视化器</th><th>CooksDistance</th></tr></thead><tbody><tr><td>快速使用方法</td><td>cooks_distance()</td></tr><tr><td>模型</td><td>通用线性模型</td></tr><tr><td>工作流程</td><td>数据集/灵敏度分析</td></tr></tbody></table><h3 id="_4-1-基本使用" tabindex="-1"><a class="header-anchor" href="#_4-1-基本使用" aria-hidden="true">#</a> 4.1 基本使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> CooksDistance
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete

<span class="token comment"># Load the regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate and fit the visualizer</span>
visualizer <span class="token operator">=</span> CooksDistance<span class="token punctuation">(</span><span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_20_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h3 id="_4-2-快速方法" tabindex="-1"><a class="header-anchor" href="#_4-2-快速方法" aria-hidden="true">#</a> 4.2 快速方法</h3><p>使用关联的快速方法，可以在一行中实现与上述类似的功能class_prediction_error。此方法将实例化ClassPredictionError可视化程序并将其适合于训练数据，然后将其在可选提供的测试数据（或未提供的训练数据）上评分。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_concrete
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>regressor <span class="token keyword">import</span> cooks_distance

<span class="token comment"># Load the regression dataset</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_concrete<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Instantiate and fit the visualizer</span>
cooks_distance<span class="token punctuation">(</span>
    X<span class="token punctuation">,</span> y<span class="token punctuation">,</span>
    draw_threshold<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
    linefmt<span class="token operator">=</span><span class="token string">&quot;C0-&quot;</span><span class="token punctuation">,</span> markerfmt<span class="token operator">=</span><span class="token string">&quot;,&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记5-回归可视化/output_22_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,9),b={href:"https://www.scikit-yb.org/en/latest/api/regressor/residuals.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.scikit-yb.org/en/latest/api/regressor/peplot.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.scikit-yb.org/en/latest/api/regressor/alphas.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.scikit-yb.org/en/latest/api/regressor/influence.html",target:"_blank",rel:"noopener noreferrer"};function y(f,w){const s=i("ExternalLinkIcon");return l(),p("div",null,[r,n("p",null,[a("回归模型试图预测连续空间中的目标。回归计分可视化工具显示模型空间中的实例，以便更好地理解模型是如何进行预测的。"),n("a",u,[d,e(s)])]),k,n("p",null,[a("库克距离是对观察值或实例对线性回归的影响的度量。影响较大的实例可能是异常值，而具有大量高度影响点的数据集可能不是适合线性模型的良好预测指标。该CooksDistance可视化显示了索引的所有实例的干情节及其关联的距离分值，用启发式的阈值一起迅速显示该数据集的百分之多少可以影响OLS回归模型。库克距离具体介绍见： "),n("a",m,[a("http://sofasofa.io/forum_main_post.php?postid=1000622"),e(s)])]),v,n("ul",null,[n("li",null,[n("a",b,[a("https://www.scikit-yb.org/en/latest/api/regressor/residuals.html"),e(s)])]),n("li",null,[n("a",h,[a("https://www.scikit-yb.org/en/latest/api/regressor/peplot.html"),e(s)])]),n("li",null,[n("a",_,[a("https://www.scikit-yb.org/en/latest/api/regressor/alphas.html"),e(s)])]),n("li",null,[n("a",g,[a("https://www.scikit-yb.org/en/latest/api/regressor/influence.html"),e(s)])])])])}const x=o(c,[["render",y],["__file","2020-07-25-_机器学习_ Yellowbrick使用笔记5-回归可视化.html.vue"]]);export{x as default};
