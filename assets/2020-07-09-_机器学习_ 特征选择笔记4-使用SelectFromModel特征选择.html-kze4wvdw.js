import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c,a as n,d as e,b as s,e as t}from"./app-MsA2k2kn.js";const i={},u=n("h1",{id:"机器学习-特征选择笔记4-使用selectfrommodel特征选择",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-特征选择笔记4-使用selectfrommodel特征选择","aria-hidden":"true"},"#"),s(" [机器学习] 特征选择笔记4-使用SelectFromModel特征选择")],-1),r={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/%E7%89%B9%E5%BE%81%E9%80%89%E6%8B%A9%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"代码下载",-1),d={href:"https://scikit-learn.org/stable/modules/feature_selection.html",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>SelectFromModel 是一个基础分类器，其根据重要性权重选择特征。可与拟合后具有coef_或feature_importances_属性的任何估计器一起使用。如果相应的coef_或feature_importances_值低于提供的threshold参数，则这些特征可以认为不重要或者删除。除了指定数值阈值参数，还可以使用字符串参数查找阈值，参数包括：“mean”, “median” 以及这两个参数的浮点数乘积，例如“0.1*mean”。与threshold标准结合使用时，可以通过max_features参数限制选择的特征数量。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 多行输出</span>
<span class="token keyword">from</span> IPython<span class="token punctuation">.</span>core<span class="token punctuation">.</span>interactiveshell <span class="token keyword">import</span> InteractiveShell
InteractiveShell<span class="token punctuation">.</span>ast_node_interactivity <span class="token operator">=</span> <span class="token string">&quot;all&quot;</span>
<span class="token keyword">import</span> warnings
warnings<span class="token punctuation">.</span>filterwarnings<span class="token punctuation">(</span><span class="token string">&quot;ignore&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-selectfrommodel基础使用" tabindex="-1"><a class="header-anchor" href="#_1-selectfrommodel基础使用" aria-hidden="true">#</a> 1 SelectFromModel基础使用</h2><p>主要参数说明如下：</p><ul><li>threshold：用于特征选择的阈值。保留重要性更高或相等的特征，而其特征则被丢弃。threshold为特征重要性的mean或者median，如果为None，并且估计器的参数惩罚显式或隐式设置为l1（例如Lasso），则使用的阈值为1e-5。否则，默认情况下使用mean。</li><li>prefit：预设模型是否期望直接传递给构造函数。</li><li>norm_order：在估算器threshold的coef_属性为维度2 的情况下，用于过滤以下系数矢量的范数的顺序</li><li>max_features：要选择的最大特征数</li></ul><p>基础使用方法如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> SelectFromModel
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> LogisticRegression
X <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token number">0.87</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1.34</span><span class="token punctuation">,</span>  <span class="token number">0.31</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">2.79</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.02</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.85</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1.34</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.48</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2.55</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token punctuation">[</span> <span class="token number">1.92</span><span class="token punctuation">,</span>  <span class="token number">1.48</span><span class="token punctuation">,</span>  <span class="token number">0.65</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
y <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment"># 建立评估器</span>
selector <span class="token operator">=</span> SelectFromModel<span class="token punctuation">(</span>estimator<span class="token operator">=</span>LogisticRegression<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token comment"># estimator的模型参数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;estimator的模型参数&quot;</span><span class="token punctuation">,</span>selector<span class="token punctuation">.</span>estimator_<span class="token punctuation">.</span>coef_<span class="token punctuation">)</span>

<span class="token comment"># 根据estimator中特征重要性均值获得阈值</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;用于特征选择的阈值；&quot;</span><span class="token punctuation">,</span>selector<span class="token punctuation">.</span>threshold_<span class="token punctuation">)</span>

<span class="token comment"># 哪些特征入选最后特征，true表示入选</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;特征是否保留&quot;</span><span class="token punctuation">,</span>selector<span class="token punctuation">.</span>get_support<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 获得最后结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;特征提取结果&quot;</span><span class="token punctuation">,</span>selector<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>estimator的模型参数 [[-0.32857694  0.83411609  0.46668853]]
用于特征选择的阈值； 0.5431271870420733
特征是否保留 [False  True False]
特征提取结果 [[-1.34]
 [-0.02]
 [-0.48]
 [ 1.48]]
</code></pre><p><strong>下面演示从糖尿病数据集中选择两个最重要的特征，而无需事先知道阈值。</strong></p><p>使用SelectFromModel和Lasso回归模型可以从糖尿病数据集中选择最佳的特征。由于L1规范促进了特征的稀疏性，我们可能只对从数据集中选择最有趣特征的子集感兴趣。本示例说明如何从糖尿病数据集中选择两个最有趣的特征。</p><p>糖尿病数据集由从442名糖尿病患者中收集的10个变量（特征）组成。此示例显示了如何使用SelectFromModel和LassoCv查找预测从基线开始一年后疾病进展的最佳两个特征。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np

<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_diabetes
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> SelectFromModel
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> LassoCV
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，让我们加载sklearn中可用的糖尿病数据集。然后，我们将看看为糖尿病患者收集了哪些特征：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>diabetes <span class="token operator">=</span> load_diabetes<span class="token punctuation">(</span><span class="token punctuation">)</span>

X <span class="token operator">=</span> diabetes<span class="token punctuation">.</span>data
y <span class="token operator">=</span> diabetes<span class="token punctuation">.</span>target

feature_names <span class="token operator">=</span> diabetes<span class="token punctuation">.</span>feature_names
<span class="token keyword">print</span><span class="token punctuation">(</span>feature_names<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;age&#39;, &#39;sex&#39;, &#39;bmi&#39;, &#39;bp&#39;, &#39;s1&#39;, &#39;s2&#39;, &#39;s3&#39;, &#39;s4&#39;, &#39;s5&#39;, &#39;s6&#39;]
</code></pre>`,15),v={href:"https://www.jianshu.com/p/6a818b53a37e",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>clf <span class="token operator">=</span> LassoCV<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token comment"># 模型参数的绝对值</span>
importance <span class="token operator">=</span> np<span class="token punctuation">.</span><span class="token builtin">abs</span><span class="token punctuation">(</span>clf<span class="token punctuation">.</span>coef_<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;十个特征的重要性：&quot;</span><span class="token punctuation">,</span>importance<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>十个特征的重要性： [  0.         226.2375274  526.85738059 314.44026013 196.92164002
   1.48742026 151.78054083 106.52846989 530.58541123  64.50588257]
</code></pre><p>接下来我们可以从具有最高分数的模型特征中过滤特征。现在我们要选择两个最重要特征electFromModel()允许设置阈值。仅保留coef_高于阈值的特征。在这里，我们希望将阈值设置为略高于coef_。LassoCV()根据数据计算出高于第三高特征的高阈值。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 对重要性进行排名</span>
idx_third <span class="token operator">=</span> importance<span class="token punctuation">.</span>argsort<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">]</span>
threshold <span class="token operator">=</span> importance<span class="token punctuation">[</span>idx_third<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">0.01</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;阈值为&#39;</span><span class="token punctuation">,</span>threshold<span class="token punctuation">)</span>
idx_features <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">-</span>importance<span class="token punctuation">)</span><span class="token punctuation">.</span>argsort<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>
name_features <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>feature_names<span class="token punctuation">)</span><span class="token punctuation">[</span>idx_features<span class="token punctuation">]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;重要性第三大的特征: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name_features<span class="token punctuation">)</span><span class="token punctuation">)</span>

sfm <span class="token operator">=</span> SelectFromModel<span class="token punctuation">(</span>clf<span class="token punctuation">,</span> threshold<span class="token operator">=</span>threshold<span class="token punctuation">)</span><span class="token punctuation">;</span>
sfm<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>

<span class="token comment"># X_transform为特征提取结果</span>
X_transform <span class="token operator">=</span> sfm<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>
<span class="token comment"># 提取的特征数</span>
n_features <span class="token operator">=</span> sfm<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>阈值为 314.4502601292063
重要性第三大的特征: [&#39;s5&#39; &#39;bmi&#39;]





SelectFromModel(estimator=LassoCV(alphas=None, copy_X=True, cv=&#39;warn&#39;, eps=0.001, fit_intercept=True,
    max_iter=1000, n_alphas=100, n_jobs=None, normalize=False,
    positive=False, precompute=&#39;auto&#39;, random_state=None,
    selection=&#39;cyclic&#39;, tol=0.0001, verbose=False),
        max_features=None, norm_order=1, prefit=False,
        threshold=314.4502601292063)
</code></pre><p>最后，我们将绘制从数据中选择的两个特征。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span>
    <span class="token string">&quot;Features from diabets using SelectFromModel with &quot;</span>
    <span class="token string">&quot;threshold %0.3f.&quot;</span> <span class="token operator">%</span> sfm<span class="token punctuation">.</span>threshold<span class="token punctuation">)</span>
feature1 <span class="token operator">=</span> X_transform<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span>
feature2 <span class="token operator">=</span> X_transform<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>feature1<span class="token punctuation">,</span> feature2<span class="token punctuation">,</span> <span class="token string">&#39;r.&#39;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">&quot;First feature: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name_features<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">&quot;Second feature: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name_features<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylim<span class="token punctuation">(</span><span class="token punctuation">[</span>np<span class="token punctuation">.</span><span class="token builtin">min</span><span class="token punctuation">(</span>feature2<span class="token punctuation">)</span><span class="token punctuation">,</span> np<span class="token punctuation">.</span><span class="token builtin">max</span><span class="token punctuation">(</span>feature2<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVvaGVueXVlamkvYXJ0aWNsZV9waWN0dXJlX3dhcmVob3VzZS9yYXcvbWFzdGVyL0NTRE4vJTVCJUU2JTlDJUJBJUU1JTk5JUE4JUU1JUFEJUE2JUU0JUI5JUEwJTVEJTIwJUU3JTg5JUI5JUU1JUJFJTgxJUU5JTgwJTg5JUU2JThCJUE5JUU3JUFDJTk0JUU4JUFFJUIwNC0lRTQlQkQlQkYlRTclOTQlQThTZWxlY3RGcm9tTW9kZWwlRTclODklQjklRTUlQkUlODElRTklODAlODklRTYlOEIlQTkvb3V0cHV0XzE0XzAucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-selectfrommodel中不同的特征选择方法" tabindex="-1"><a class="header-anchor" href="#_2-selectfrommodel中不同的特征选择方法" aria-hidden="true">#</a> 2 SelectFromModel中不同的特征选择方法</h2><h3 id="_2-1-基于l1范式进行特征选择" tabindex="-1"><a class="header-anchor" href="#_2-1-基于l1范式进行特征选择" aria-hidden="true">#</a> 2.1 基于L1范式进行特征选择</h3><p>用L1范数惩罚的线性模型具有稀疏解：它们的许多估计系数为零。当目标是减少数据的维数以用于另一个分类器时，它们可以与特征一起使用。L1正则化将系数l1范数作为惩罚项添加损失函数上，由于正则项非零，这就迫使那些弱的特征所对应的系数变成0。因此L1正则化往往会使学到的模型很稀疏（系数w经常为0），这个使得L1正则化成为一种常用的征选择方法。特别的用于此目的的稀疏估计量是linear_model.Lasso用于回归，和linear_model.LogisticRegression以及svm.LinearSVC 用于分类。</p><p>简单实例如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> LinearSVC
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_iris
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> SelectFromModel
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_iris<span class="token punctuation">(</span>return_X_y<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape

lsvc <span class="token operator">=</span> LinearSVC<span class="token punctuation">(</span>C<span class="token operator">=</span><span class="token number">0.01</span><span class="token punctuation">,</span> penalty<span class="token operator">=</span><span class="token string">&quot;l1&quot;</span><span class="token punctuation">,</span> dual<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
model <span class="token operator">=</span> SelectFromModel<span class="token punctuation">(</span>lsvc<span class="token punctuation">,</span> prefit<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
X_new <span class="token operator">=</span> model<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>
X_new<span class="token punctuation">.</span>shape

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(150, 4)
(150, 3)
</code></pre><p>对于SVM和logistic回归，参数C控制稀疏性：C越小，选择的特征就越少。使用Lasso，alpha参数越高，选择的特征就越少。</p><h3 id="_2-2-基于树的特征选择" tabindex="-1"><a class="header-anchor" href="#_2-2-基于树的特征选择" aria-hidden="true">#</a> 2.2 基于树的特征选择</h3><p>基于树的评估器可以被用来计算特征的重要性，然后可以根据特征的重要性去除不相关的特征 (当配合sklearn.feature_selection.SelectFromModel meta-transformer):</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>ensemble <span class="token keyword">import</span> ExtraTreesClassifier
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_iris
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>feature_selection <span class="token keyword">import</span> SelectFromModel
X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_iris<span class="token punctuation">(</span>return_X_y<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
X<span class="token punctuation">.</span>shape

clf <span class="token operator">=</span> ExtraTreesClassifier<span class="token punctuation">(</span>n_estimators<span class="token operator">=</span><span class="token number">50</span><span class="token punctuation">)</span>
clf <span class="token operator">=</span> clf<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;特征重要性&quot;</span><span class="token punctuation">,</span>clf<span class="token punctuation">.</span>feature_importances_<span class="token punctuation">)</span>  

model <span class="token operator">=</span> SelectFromModel<span class="token punctuation">(</span>clf<span class="token punctuation">,</span> prefit<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
X_new <span class="token operator">=</span> model<span class="token punctuation">.</span>transform<span class="token punctuation">(</span>X<span class="token punctuation">)</span>
<span class="token comment"># 最后保留的特征数</span>
X_new<span class="token punctuation">.</span>shape     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(150, 4)



特征重要性 [0.07293638 0.06131363 0.44503667 0.42071333]





(150, 2)
</code></pre><p>以下例子展示了如何使用随机森林来评估人工分类任务中特征的重要性。红色柱状表示特征的重要性及标准差。不出所料，该图表明3个特征是有信息的，而其余特征则没有。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> make_classification
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>ensemble <span class="token keyword">import</span> ExtraTreesClassifier

<span class="token comment"># Build a classification task using 3 informative features</span>
<span class="token comment"># 构造一个数据集，特征数为10，但是有效特征只有三个</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> make_classification<span class="token punctuation">(</span>n_samples<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span>
                           n_features<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">,</span>
                           n_informative<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span>
                           n_redundant<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
                           n_repeated<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
                           n_classes<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span>
                           random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>
                           shuffle<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

<span class="token comment"># Build a forest and compute the impurity-based feature importances</span>
<span class="token comment"># 通过随机森林进行分类，并计算各个特征的重要性</span>
forest <span class="token operator">=</span> ExtraTreesClassifier<span class="token punctuation">(</span>n_estimators<span class="token operator">=</span><span class="token number">250</span><span class="token punctuation">,</span>
                              random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>

forest<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token comment"># 获得重要性</span>
importances <span class="token operator">=</span> forest<span class="token punctuation">.</span>feature_importances_
<span class="token comment"># 计算标准差</span>
std <span class="token operator">=</span> np<span class="token punctuation">.</span>std<span class="token punctuation">(</span><span class="token punctuation">[</span>tree<span class="token punctuation">.</span>feature_importances_ <span class="token keyword">for</span> tree <span class="token keyword">in</span> forest<span class="token punctuation">.</span>estimators_<span class="token punctuation">]</span><span class="token punctuation">,</span>
             axis<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>
indices <span class="token operator">=</span> np<span class="token punctuation">.</span>argsort<span class="token punctuation">(</span>importances<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

<span class="token comment"># Print the feature ranking</span>
<span class="token comment"># 获得特征排名结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Feature ranking:&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> f <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>X<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;%d. feature %d (%f)&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>f <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> indices<span class="token punctuation">[</span>f<span class="token punctuation">]</span><span class="token punctuation">,</span> importances<span class="token punctuation">[</span>indices<span class="token punctuation">[</span>f<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># Plot the impurity-based feature importances of the forest</span>
<span class="token comment"># 画出各个特征的重要性</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;Feature importances&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>bar<span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span>X<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> importances<span class="token punctuation">[</span>indices<span class="token punctuation">]</span><span class="token punctuation">,</span>
        color<span class="token operator">=</span><span class="token string">&quot;r&quot;</span><span class="token punctuation">,</span> yerr<span class="token operator">=</span>std<span class="token punctuation">[</span>indices<span class="token punctuation">]</span><span class="token punctuation">,</span> align<span class="token operator">=</span><span class="token string">&quot;center&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xticks<span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span>X<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> indices<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlim<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> X<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Feature ranking:
1. feature 1 (0.295902)
2. feature 2 (0.208351)
3. feature 0 (0.177632)
4. feature 3 (0.047121)
5. feature 6 (0.046303)
6. feature 8 (0.046013)
7. feature 7 (0.045575)
8. feature 4 (0.044614)
9. feature 9 (0.044577)
10. feature 5 (0.043912)
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVvaGVueXVlamkvYXJ0aWNsZV9waWN0dXJlX3dhcmVob3VzZS9yYXcvbWFzdGVyL0NTRE4vJTVCJUU2JTlDJUJBJUU1JTk5JUE4JUU1JUFEJUE2JUU0JUI5JUEwJTVEJTIwJUU3JTg5JUI5JUU1JUJFJTgxJUU5JTgwJTg5JUU2JThCJUE5JUU3JUFDJTk0JUU4JUFFJUIwNC0lRTQlQkQlQkYlRTclOTQlQThTZWxlY3RGcm9tTW9kZWwlRTclODklQjklRTUlQkUlODElRTklODAlODklRTYlOEIlQTkvb3V0cHV0XzIzXzEucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><p>以下示例显示了在图像分类任务（面部）中使用随机森林评估像素点中特征的重要性。像素的热值越高，表明该点对于人脸分类越重要。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> time <span class="token keyword">import</span> time
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt

<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> fetch_olivetti_faces
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>ensemble <span class="token keyword">import</span> ExtraTreesClassifier

<span class="token comment"># Number of cores to use to perform parallel fitting of the forest model</span>
n_jobs <span class="token operator">=</span> <span class="token number">1</span>

<span class="token comment"># Load the faces dataset</span>
data <span class="token operator">=</span> fetch_olivetti_faces<span class="token punctuation">(</span><span class="token punctuation">)</span>
X<span class="token punctuation">,</span> y <span class="token operator">=</span> data<span class="token punctuation">.</span>data<span class="token punctuation">,</span> data<span class="token punctuation">.</span>target

mask <span class="token operator">=</span> y <span class="token operator">&lt;</span> <span class="token number">5</span>  <span class="token comment"># Limit to 5 classes</span>
X <span class="token operator">=</span> X<span class="token punctuation">[</span>mask<span class="token punctuation">]</span>
y <span class="token operator">=</span> y<span class="token punctuation">[</span>mask<span class="token punctuation">]</span>

<span class="token comment"># Build a forest and compute the pixel importances</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Fitting ExtraTreesClassifier on faces data with %d cores...&quot;</span> <span class="token operator">%</span> n_jobs<span class="token punctuation">)</span>
t0 <span class="token operator">=</span> time<span class="token punctuation">(</span><span class="token punctuation">)</span>
forest <span class="token operator">=</span> ExtraTreesClassifier<span class="token punctuation">(</span>n_estimators<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">,</span>
                              max_features<span class="token operator">=</span><span class="token number">128</span><span class="token punctuation">,</span>
                              n_jobs<span class="token operator">=</span>n_jobs<span class="token punctuation">,</span>
                              random_state<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>

forest<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;done in %0.3fs&quot;</span> <span class="token operator">%</span> <span class="token punctuation">(</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> t0<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 获得各点的重要性</span>
importances <span class="token operator">=</span> forest<span class="token punctuation">.</span>feature_importances_
importances <span class="token operator">=</span> importances<span class="token punctuation">.</span>reshape<span class="token punctuation">(</span>data<span class="token punctuation">.</span>images<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>shape<span class="token punctuation">)</span>

<span class="token comment"># Plot pixel importances</span>
plt<span class="token punctuation">.</span>matshow<span class="token punctuation">(</span>importances<span class="token punctuation">,</span> cmap<span class="token operator">=</span>plt<span class="token punctuation">.</span>cm<span class="token punctuation">.</span>hot<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&quot;Pixel importances with forests of trees&quot;</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Fitting ExtraTreesClassifier on faces data with 1 cores...





ExtraTreesClassifier(bootstrap=False, class_weight=None, criterion=&#39;gini&#39;,
           max_depth=None, max_features=128, max_leaf_nodes=None,
           min_impurity_decrease=0.0, min_impurity_split=None,
           min_samples_leaf=1, min_samples_split=2,
           min_weight_fraction_leaf=0.0, n_estimators=1000, n_jobs=1,
           oob_score=False, random_state=0, verbose=0, warm_start=False)



done in 1.018s





&lt;matplotlib.image.AxesImage at 0x7feaf2f1f4d0&gt;






Text(0.5,1.05,&#39;Pixel importances with forests of trees&#39;)
</code></pre><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVvaGVueXVlamkvYXJ0aWNsZV9waWN0dXJlX3dhcmVob3VzZS9yYXcvbWFzdGVyL0NTRE4vJTVCJUU2JTlDJUJBJUU1JTk5JUE4JUU1JUFEJUE2JUU0JUI5JUEwJTVEJTIwJUU3JTg5JUI5JUU1JUJFJTgxJUU5JTgwJTg5JUU2JThCJUE5JUU3JUFDJTk0JUU4JUFFJUIwNC0lRTQlQkQlQkYlRTclOTQlQThTZWxlY3RGcm9tTW9kZWwlRTclODklQjklRTUlQkUlODElRTklODAlODklRTYlOEIlQTkvb3V0cHV0XzI1XzUucG5n?x-oss-process=image/format,png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,28),f={href:"https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.SelectFromModel.html#sklearn.feature_selection.SelectFromModelhttps://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.SelectFromModel.html#sklearn.feature_selection.SelectFromModel",target:"_blank",rel:"noopener noreferrer"},_={href:"https://scikit-learn.org/stable/auto_examples/feature_selection/plot_select_from_model_diabetes.html#sphx-glr-auto-examples-feature-selection-plot-select-from-model-diabetes-py",target:"_blank",rel:"noopener noreferrer"},h={href:"https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances.html#sphx-glr-auto-examples-ensemble-plot-forest-importances-py",target:"_blank",rel:"noopener noreferrer"},g={href:"https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances_faces.html#sphx-glr-auto-examples-ensemble-plot-forest-importances-faces-py",target:"_blank",rel:"noopener noreferrer"};function y(J,w){const a=o("ExternalLinkIcon");return l(),c("div",null,[u,n("p",null,[n("a",r,[k,e(a)]),s(" 本文主要介绍sklearn中进行特征选择的方法。 "),n("a",d,[s("sklearn.feature_selection"),e(a)]),s("模块中的类可用于样本集的特征选择/降维，以提高估计量的准确性得分或提高其在超高维数据集上的性能。")]),m,n("p",null,[s("为了确定功能的重要性，我们将使用LassoCV估计器。具有最高绝对值的特征coef_被认为是最重要的。sklearn中coef_说明见："),n("a",v,[s("https://www.jianshu.com/p/6a818b53a37e"),e(a)])]),b,n("blockquote",null,[n("p",null,[n("a",f,[s("https://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.SelectFromModel.html#sklearn.feature_selection.SelectFromModel"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",_,[s("https://scikit-learn.org/stable/auto_examples/feature_selection/plot_select_from_model_diabetes.html#sphx-glr-auto-examples-feature-selection-plot-select-from-model-diabetes-py"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",h,[s("https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances.html#sphx-glr-auto-examples-ensemble-plot-forest-importances-py"),e(a)])])]),n("blockquote",null,[n("p",null,[n("a",g,[s("https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_importances_faces.html#sphx-glr-auto-examples-ensemble-plot-forest-importances-faces-py"),e(a)])])])])}const T=p(i,[["render",y],["__file","2020-07-09-_机器学习_ 特征选择笔记4-使用SelectFromModel特征选择.html.vue"]]);export{T as default};
