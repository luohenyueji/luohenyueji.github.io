import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as l,c as i,a as n,d as e,b as s,e as t}from"./app-MsA2k2kn.js";const c={},r=n("h1",{id:"机器学习-特征选择笔记3-递归式特征消除",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-特征选择笔记3-递归式特征消除","aria-hidden":"true"},"#"),s(" [机器学习] 特征选择笔记3-递归式特征消除")],-1),u={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/%E7%89%B9%E5%BE%81%E9%80%89%E6%8B%A9%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},d=n("strong",null,"代码下载",-1),k={href:"https://scikit-learn.org/stable/modules/feature_selection.html",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,"递归式特征消除Recursive feature elimination(RFE)",-1),m={href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFE.html#sklearn.feature_selection.RFE",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-基本使用介绍" tabindex="-1"><a class="header-anchor" href="#_1-基本使用介绍" aria-hidden="true">#</a> 1 基本使用介绍</h2><p>对于RFE函数，主要参数如下：</p><ul><li>estimator：一种监督学习估计器，其fit方法通过coef_ 属性或feature_importances_属性提供有关要素重要性的信息</li><li>n_features_to_select：要保留的特征数量，默认保留一半</li><li>step：为整数时表示每次要删除的特征数量；小于1时表示每次去除权重最小的特征，默认为1</li></ul><p>以下示例说明了，如何通过RFE函数挑选5个最佳特征</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> make_friedman1
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> RFE
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> SVR
X<span class="token punctuation">,</span> y <span class="token operator">=</span> make_friedman1<span class="token punctuation">(</span>n_samples<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> n_features<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
estimator <span class="token operator">=</span> SVR<span class="token punctuation">(</span>kernel<span class="token operator">=</span><span class="token string">&quot;linear&quot;</span><span class="token punctuation">)</span>
selector <span class="token operator">=</span> RFE<span class="token punctuation">(</span>estimator<span class="token punctuation">,</span> n_features_to_select<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span> step<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
selector <span class="token operator">=</span> selector<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

<span class="token comment"># 哪些特征入选最后特征，true表示入选</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>support_<span class="token punctuation">)</span>

<span class="token comment"># 每个特征的得分排名，特征得分越低（1最好），表示特征越好</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>ranking_<span class="token punctuation">)</span>

<span class="token comment">#  挑选了几个特征</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>n_features_<span class="token punctuation">)</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[ True  True  True  True  True False False False False False]
[1 1 1 1 1 6 4 3 2 5]
5
</code></pre>`,7),_={href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFECV.html#sklearn.feature_selection.RFECV",target:"_blank",rel:"noopener noreferrer"},f=t(`<p>对于RFECV函数，主要参数如下：</p><ul><li>estimator：一种监督学习估计器，其fit方法通过coef_ 属性或feature_importances_属性提供有关要素重要性的信息</li><li>step：为整数时表示每次要删除的特征数量；小于1时表示每次去除权重最小的特征，默认为1</li><li>min_features_to_select：保留的最少的特征数（但是如果模型有特征数量限制，如随机森林设置了最大特征数，该变量需要大于等于随机森林设定的最大特征数），默认为1。</li><li>cv：指定交叉验证的折数，默认为5</li></ul><p>以下示例说明了，如何通过RFECV挑选特征。如果减少特征会造成性能损失，那么将不会去除任何特征</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> make_friedman1
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> RFECV
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> SVR

<span class="token comment"># 生成样本</span>
<span class="token comment"># X维度(50，20)，Y维度(50,1)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> make_friedman1<span class="token punctuation">(</span>n_samples<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">,</span> n_features<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>

estimator <span class="token operator">=</span> SVR<span class="token punctuation">(</span>kernel<span class="token operator">=</span><span class="token string">&quot;linear&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 5折交叉</span>
selector <span class="token operator">=</span> RFECV<span class="token punctuation">(</span>estimator<span class="token punctuation">,</span> step<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> cv<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>
selector <span class="token operator">=</span> selector<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

<span class="token comment"># 哪些特征入选最后特征，true表示入选</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>support_<span class="token punctuation">)</span>

<span class="token comment"># 每个特征的得分排名，特征得分越低（1最好），表示特征越好</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>ranking_<span class="token punctuation">)</span>

<span class="token comment">#  挑选了几个特征</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>n_features_<span class="token punctuation">)</span>
<span class="token comment"># 每次交叉迭代各个特征得分</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>selector<span class="token punctuation">.</span>grid_scores_<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[ True  True  True  True  True False False False False False]
[1 1 1 1 1 6 4 3 2 5]
5
[0.2119209  0.34014969 0.32498071 0.39840786 0.44286114 0.42111785
 0.38499244 0.393591   0.39398469 0.38667796]
</code></pre><p>详细来说K折交叉验证，就是将数据集等比例划分成K份，以其中的一份作为测试数据，其他的K-1份数据作为训练数据。交叉验证实际是把实验重复做了K次，每次实验都是从K个部分选取一份不同的数据部分作为测试数据（保证K个部分的数据都分别做过测试数据），剩下的K-1个当作训练数据，最后把得到的K个实验结果进行平分。然是RFECV不是这样的，RFEC由RFE和CV(Cross-validation)组成， RFECV源代码如下，在每次实验针对部分特征进行RFE计算。我们在所有CV上保留每个功能得分的平均值。然后，我们使用平均得分计算要删除的要素数量，然后使用整个数据集删除该数量的要素，这就是源代码所表达的意思。 举个例子如果有a，b，c三个特征，交叉认证每次提取部分特征，比如第一次提取特征(a,b)与y建模，计算在测试集的得分。第二次提取特征(a,c)进行建模，第三次对（a,b,c）进行建模。如5折交叉验证会得到5个分数数组，会对5个分数数组进行对应元素求和，得到各个特征数量下的总分，求出最高总分，以及多少特征才能达到最高分，那么就可以求得应该删多少特征，然后针对整个数据进行RFE。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 提取X,y
X, y = check_X_y(X, y, &quot;csr&quot;, ensure_min_features=2)

# Initialization
# k折交叉
cv = check_cv(self.cv, y, is_classifier(self.estimator))
scorer = check_scoring(self.estimator, scoring=self.scoring)
n_features = X.shape[1]

if 0.0 &lt; self.step &lt; 1.0:
    step = int(max(1, self.step * n_features))
else:
    step = int(self.step)
if step &lt;= 0:
    raise ValueError(&quot;Step must be &gt;0&quot;)

# Build an RFE object, which will evaluate and score each possible
# feature count, down to self.min_features_to_select
rfe = RFE(estimator=self.estimator,
          n_features_to_select=self.min_features_to_select,
          step=self.step, verbose=self.verbose)

# Determine the number of subsets of features by fitting across
# the train folds and choosing the &quot;features_to_select&quot; parameter
# that gives the least averaged error across all folds.

# Note that joblib raises a non-picklable error for bound methods
# even if n_jobs is set to 1 with the default multiprocessing
# backend.
# This branching is done so that to
# make sure that user code that sets n_jobs to 1
# and provides bound methods as scorers is not broken with the
# addition of n_jobs parameter in version 0.18.

if effective_n_jobs(self.n_jobs) == 1:
    parallel, func = list, _rfe_single_fit
else:
    parallel = Parallel(n_jobs=self.n_jobs)
    func = delayed(_rfe_single_fit)

# k折交叉认证
scores = parallel(
    func(rfe, self.estimator, X, y, train, test, scorer)
    for train, test in cv.split(X, y, groups))

# 计算各个交叉认证下各个元素的分数之和
scores = np.sum(scores, axis=0)
scores_rev = scores[::-1]
# 判断第几次交叉认证取得评分最大值
argmax_idx = len(scores) - np.argmax(scores_rev) - 1
# 根据设定参数step，到argmax_idx每次减少step个元素，这样能求出保留几个袁术
n_features_to_select = max(
    n_features - (argmax_idx * step),
    self.min_features_to_select)

# Re-execute an elimination with best_k over the whole set
rfe = RFE(estimator=self.estimator,
          n_features_to_select=n_features_to_select, step=self.step,
          verbose=self.verbose)

rfe.fit(X, y)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-应用实例" tabindex="-1"><a class="header-anchor" href="#_2-应用实例" aria-hidden="true">#</a> 2 应用实例</h2><p>下面的实例为一个递归特征消除RFE函数示例，显示了数字分类任务中像素的重要性。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> SVC
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_digits
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> RFE
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token comment"># Load the digits dataset</span>
<span class="token comment"># 读取数据集</span>
digits <span class="token operator">=</span> load_digits<span class="token punctuation">(</span><span class="token punctuation">)</span>
X <span class="token operator">=</span> digits<span class="token punctuation">.</span>images<span class="token punctuation">.</span>reshape<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>digits<span class="token punctuation">.</span>images<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
y <span class="token operator">=</span> digits<span class="token punctuation">.</span>target
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;训练图像集的维度&quot;</span><span class="token punctuation">,</span>X<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>

<span class="token comment"># Create the RFE object and rank each pixel</span>
svc <span class="token operator">=</span> SVC<span class="token punctuation">(</span>kernel<span class="token operator">=</span><span class="token string">&quot;linear&quot;</span><span class="token punctuation">,</span> C<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># n_features_to_select=1表示每次都删除一个特征。比如X的图像为8*8的尺寸。共64个像素，对64个像素都进行排名</span>
rfe <span class="token operator">=</span> RFE<span class="token punctuation">(</span>estimator<span class="token operator">=</span>svc<span class="token punctuation">,</span> n_features_to_select<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> step<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
rfe<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;图像各个像素点的重要性排名：&quot;</span><span class="token punctuation">,</span>rfe<span class="token punctuation">.</span>ranking_<span class="token punctuation">)</span>
<span class="token comment"># 大小重置</span>
ranking <span class="token operator">=</span> rfe<span class="token punctuation">.</span>ranking_<span class="token punctuation">.</span>reshape<span class="token punctuation">(</span>digits<span class="token punctuation">.</span>images<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>shape<span class="token punctuation">)</span>


<span class="token comment"># Plot pixel ranking</span>
<span class="token comment"># 颜色越浅表明该像素点对于手写数字图像分类越重要</span>
plt<span class="token punctuation">.</span>matshow<span class="token punctuation">(</span>ranking<span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>Blues<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>colorbar<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;Ranking of pixels with RFE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>训练图像集的维度 (1797, 64)
图像各个像素点的重要性排名： [64 50 31 23 10 17 34 51 57 37 30 43 14 32 44 52 54 41 19 15 28  8 39 53
 55 45  9 18 20 38  1 59 63 42 25 35 29 16  2 62 61 40  5 11 13  6  4 58
 56 47 26 36 24  3 22 48 60 49  7 27 33 21 12 46]
</code></pre><p>下面为一个递归特征消除示例，该示例通过交叉验证自动调整所选特征的数量。最好画出选用各个特征数量下，分类集的交叉认证分数。可以看到RFECV能够自动选择适合分类的有效特征数</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> SVC
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>model_selection <span class="token keyword">import</span> StratifiedKFold
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> RFECV
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> make_classification

<span class="token comment"># Build a classification task using 3 informative features</span>
<span class="token comment"># 建立特征，X有25个特征，其中有效特征3个。</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> make_classification<span class="token punctuation">(</span>n_samples<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span> n_features<span class="token operator">=</span><span class="token number">25</span><span class="token punctuation">,</span> n_informative<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span>
                           n_redundant<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> n_repeated<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> n_classes<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">,</span>
                           n_clusters_per_class<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;X维度&quot;</span><span class="token punctuation">,</span> X<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;y维度&quot;</span><span class="token punctuation">,</span>y<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>


<span class="token comment"># Create the RFE object and compute a cross-validated score.</span>
<span class="token comment"># 创建分类器</span>
svc <span class="token operator">=</span> SVC<span class="token punctuation">(</span>kernel<span class="token operator">=</span><span class="token string">&quot;linear&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># The &quot;accuracy&quot; scoring is proportional to the number of correct</span>
<span class="token comment"># classifications</span>
<span class="token comment"># 分类</span>
rfecv <span class="token operator">=</span> RFECV<span class="token punctuation">(</span>estimator<span class="token operator">=</span>svc<span class="token punctuation">,</span> step<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> cv<span class="token operator">=</span>StratifiedKFold<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
              scoring<span class="token operator">=</span><span class="token string">&#39;accuracy&#39;</span><span class="token punctuation">)</span>
rfecv<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;RFEC挑选了几个特征 : %d&quot;</span> <span class="token operator">%</span> rfecv<span class="token punctuation">.</span>n_features_<span class="token punctuation">)</span>

<span class="token comment"># Plot number of features VS. cross-validation scores</span>
<span class="token comment"># 画出不同特征数量下交叉认证验证得分</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">#  选择的特征数量</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&quot;Number of features selected&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 交叉验证得分</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&quot;Cross validation score (nb of correct classifications)&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 画出各个特征的得分</span>
plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>rfecv<span class="token punctuation">.</span>grid_scores_<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rfecv<span class="token punctuation">.</span>grid_scores_<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>X维度 (1000, 25)
y维度 (1000,)
RFEC挑选了几个特征 : 3
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVvaGVueXVlamkvYXJ0aWNsZV9waWN0dXJlX3dhcmVob3VzZS9yYXcvbWFzdGVyL0NTRE4vJTVCJUU2JTlDJUJBJUU1JTk5JUE4JUU1JUFEJUE2JUU0JUI5JUEwJTVEJTIwJUU3JTg5JUI5JUU1JUJFJTgxJUU5JTgwJTg5JUU2JThCJUE5JUU3JUFDJTk0JUU4JUFFJUIwMy0lRTklODAlOTIlRTUlQkQlOTIlRTUlQkMlOEYlRTclODklQjklRTUlQkUlODElRTYlQjYlODglRTklOTklQTQvb3V0cHV0XzEzXzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,16),h={href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFE.html#sklearn.feature_selection.RFE",target:"_blank",rel:"noopener noreferrer"},g={href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFECV.html#sklearn.feature_selection.RFECV",target:"_blank",rel:"noopener noreferrer"},y={href:"http://www.minxueyu.com/2020/03/29/RFE%E4%B8%8ERFECV%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://blog.csdn.net/sunshunli/article/details/82355395",target:"_blank",rel:"noopener noreferrer"},F={href:"https://stackoverflow.com/questions/34703051/score-of-rfecv-in-python-scikit-learn",target:"_blank",rel:"noopener noreferrer"},R={href:"https://blog.csdn.net/teng_zz/article/details/98027712",target:"_blank",rel:"noopener noreferrer"};function w(V,q){const a=p("ExternalLinkIcon");return l(),i("div",null,[r,n("p",null,[n("a",u,[d,e(a)]),s(" 本文主要介绍sklearn中进行特征选择的方法。 "),n("a",k,[s("sklearn.feature_selection"),e(a)]),s("模块中的类可用于样本集的特征选择/降维，以提高估计量的准确性得分或提高其在超高维数据集上的性能。")]),v,n("p",null,[s("给定一个为特征(如线性模型的系数)分配权重的外部估计量，递归特征消除("),n("a",m,[s("RFE"),e(a)]),s(")就是通过递归地考虑越来越小的特征集来选择特征。首先，对初始特征集训练估计器，通过coef_属性或feature_importances_属性获得每个特征的重要性。然后，从当前的特征集中删除最不重要的特征。在经过修剪的集合上递归地重复这个过程，直到最终达到所需的特征数量。 说简单点，递归式特征消除的主要思路是反复建立多种模型，每一次根据系数的不挑出差的特征，并去除挑出来的特征，然后在剩余的特征上重复该过程，直到遍历了所有的特征。所以递归式特征消除效果如果很看选用的模型。")]),b,n("p",null,[s("sklearn中"),n("a",_,[s("RFECV"),e(a)]),s("函数在交叉验证循环中执行RFE，以找到最佳数量的特征。RFE的稳定性很大程度上取决于迭代时用的哪种模型。RFECV 通过交叉验证的方式来执行RFE。 RFE需要一个指定数量的特性来保留，但是通常事先不知道有多少特性是有效的。为了寻找最佳特征数，采用RFE对不同特征子集进行交叉验证，并选择出最优的特征评分集合，但是如果删除特征会导致性能损失就不删除特征。这就是RFECV的原理。")]),f,n("blockquote",null,[n("p",null,[n("a",h,[s("https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFE.html#sklearn.feature_selection.RFE"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",g,[s("https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFECV.html#sklearn.feature_selection.RFECV"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",y,[s("http://www.minxueyu.com/2020/03/29/RFE%E4%B8%8ERFECV%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",E,[s("https://blog.csdn.net/sunshunli/article/details/82355395"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",F,[s("https://stackoverflow.com/questions/34703051/score-of-rfecv-in-python-scikit-learn"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",R,[s("https://blog.csdn.net/teng_zz/article/details/98027712"),e(a)])])])])}const J=o(c,[["render",w],["__file","2020-07-09-_机器学习_ 特征选择笔记3-递归式特征消除.html.vue"]]);export{J as default};
