import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as p,c as l,a as n,d as e,b as s,e as t}from"./app-MsA2k2kn.js";const c={},r=n("h1",{id:"机器学习-yellowbrick使用笔记2-模型选择",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#机器学习-yellowbrick使用笔记2-模型选择","aria-hidden":"true"},"#"),s(" [机器学习] Yellowbrick使用笔记2-模型选择")],-1),u=n("p",null,"在本教程中，我们将查看各种Scikit Learn模型的分数，并使用Yellowbrick的可视化诊断工具对它们进行比较，以便为我们的数据选择最佳的模型。",-1),d={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Documents/Yellowbrick%E4%BD%BF%E7%94%A8%E7%AC%94%E8%AE%B0",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"代码下载",-1),m=t('<h2 id="_1-使用说明" tabindex="-1"><a class="header-anchor" href="#_1-使用说明" aria-hidden="true">#</a> 1 使用说明</h2><h3 id="_1-1-模型选择三原则" tabindex="-1"><a class="header-anchor" href="#_1-1-模型选择三原则" aria-hidden="true">#</a> 1.1 模型选择三原则</h3><p>关于机器学习的讨论通常以单一的模型选择为特点。不管是logistic回归、随机森林、贝叶斯方法，还是人工神经网络，机器学习的实践者通常很快就能表达他们的偏好。原因主要是历史原因。尽管现代的第三方机器学习库使得多个模型的部署变得几乎微不足道，但传统上，即使是其中一个算法的应用和调整都需要多年的研究。因此，机器学习的实践者往往对特定的（可能更熟悉的）模型有强烈的偏好。 然而，模型选择要比简单地选择“正确”或“错误”算法更为微妙。实际上，工作流程包括：</p><ul><li>选择和/或工程最小和最具预测性的特征集</li><li>从模型族中选择一组算法</li><li>调整算法超参数以优化性能</li></ul><p>最近，通过网格搜索方法、标准化的api和基于GUI的应用程序，这个工作流的大部分已经实现了自动化。然而，在实践中，人类的直觉和指导比穷尽搜索更有效地磨练质量模型。通过可视化模型选择过程，数据科学家可以转向最终的、可解释的模型，并避免陷阱。</p><p>Yellowbrick库是一种用于机器学习的诊断可视化平台，它使数据科学家可以控制模型的选择过程。Yellowbrick通过新的核心对象：Visualizer扩展了Scikit-Learn API。可视化工具允许在Scikit-Learn流水线过程中对可视模型进行拟合和转换，从而在整个高维数据转换过程中提供可视化诊断。</p><h3 id="_1-2-关于数据" tabindex="-1"><a class="header-anchor" href="#_1-2-关于数据" aria-hidden="true">#</a> 1.2 关于数据</h3>',7),v={href:"http://archive.ics.uci.edu/ml/",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>Yellowbrick的数据包含3个属性的信息和8124个蘑菇实例的目标值（4208个可食，3916个有毒）。</p><p>让我们加载数据：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>datasets <span class="token keyword">import</span> load_mushroom

X<span class="token punctuation">,</span> y <span class="token operator">=</span> load_mushroom<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># inspect the first five rows</span>
<span class="token comment"># 查看前五行数据</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>X<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>    shape surface   color
0  convex  smooth  yellow
1    bell  smooth   white
2  convex   scaly   white
3  convex  smooth    gray
4  convex   scaly  yellow
</code></pre><h3 id="_1-3-特征提取" tabindex="-1"><a class="header-anchor" href="#_1-3-特征提取" aria-hidden="true">#</a> 1.3 特征提取</h3>`,5),b={href:"http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html",target:"_blank",rel:"noopener noreferrer"},h={href:"http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html",target:"_blank",rel:"noopener noreferrer"},_=t(`<p>我们将结合使用scikit-learn的Pipeline对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, LabelEncoder

# Label-encode targets before modeling
# 标记编码目标
y = LabelEncoder().fit_transform(y)

# One-hot encode columns before modeling
# 建立一个热编码建模器
model = Pipeline([
 (&#39;one_hot_encoder&#39;, OneHotEncoder()),
 (&#39;estimator&#39;, estimator)
])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-建模与评估" tabindex="-1"><a class="header-anchor" href="#_1-4-建模与评估" aria-hidden="true">#</a> 1.4 建模与评估</h3><h6 id="_1-4-1-评估分类器的通用指标" tabindex="-1"><a class="header-anchor" href="#_1-4-1-评估分类器的通用指标" aria-hidden="true">#</a> 1.4.1 评估分类器的通用指标</h6><p>精确度是正确阳性结果的数量除以所有阳性结果的数量（例如，我们预测的蘑菇中实际有多少可以食用？）。 召回率是正确的阳性结果数除以应该返回的阳性结果数（例如，我们准确预测了多少有毒的蘑菇是有毒的？）。 F1成绩是测试准确性的一个衡量标准。它同时考虑了测试的精确性和召回率来计算分数。F1分数可以解释为精确度和召回率的加权平均值，F1分数在1时达到最佳值，最差值在0时达到最差值。</p><p>其计算公式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>precision = true positives / (true positives + false positives)

recall = true positives / (false negatives + true positives)

F1 score = 2 * ((precision * recall) / (precision + recall))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们准备做出一些预测！</p><p>让我们建立一种评估多个估计量的方法-首先使用传统的数字评分（稍后将与Yellowbrick库中的某些视觉诊断进行比较）。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>metrics <span class="token keyword">import</span> f1_score
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>pipeline <span class="token keyword">import</span> Pipeline
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>svm <span class="token keyword">import</span> LinearSVC<span class="token punctuation">,</span> NuSVC<span class="token punctuation">,</span> SVC
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>neighbors <span class="token keyword">import</span> KNeighborsClassifier
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>preprocessing <span class="token keyword">import</span> OneHotEncoder<span class="token punctuation">,</span> LabelEncoder
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>linear_model <span class="token keyword">import</span> LogisticRegressionCV<span class="token punctuation">,</span> LogisticRegression<span class="token punctuation">,</span> SGDClassifier
<span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>ensemble <span class="token keyword">import</span> BaggingClassifier<span class="token punctuation">,</span> ExtraTreesClassifier<span class="token punctuation">,</span> RandomForestClassifier


models <span class="token operator">=</span> <span class="token punctuation">[</span>
    SVC<span class="token punctuation">(</span>gamma<span class="token operator">=</span><span class="token string">&#39;auto&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> NuSVC<span class="token punctuation">(</span>gamma<span class="token operator">=</span><span class="token string">&#39;auto&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> LinearSVC<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    SGDClassifier<span class="token punctuation">(</span>max_iter<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span> tol<span class="token operator">=</span><span class="token number">1e-3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> KNeighborsClassifier<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    LogisticRegression<span class="token punctuation">(</span>solver<span class="token operator">=</span><span class="token string">&#39;lbfgs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> LogisticRegressionCV<span class="token punctuation">(</span>cv<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    BaggingClassifier<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ExtraTreesClassifier<span class="token punctuation">(</span>n_estimators<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    RandomForestClassifier<span class="token punctuation">(</span>n_estimators<span class="token operator">=</span><span class="token number">300</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">score_model</span><span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> estimator<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    Test various estimators.
    &quot;&quot;&quot;</span>
    y <span class="token operator">=</span> LabelEncoder<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
    model <span class="token operator">=</span> Pipeline<span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">(</span><span class="token string">&#39;one_hot_encoder&#39;</span><span class="token punctuation">,</span> OneHotEncoder<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token string">&#39;estimator&#39;</span><span class="token punctuation">,</span> estimator<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment"># Instantiate the classification model and visualizer</span>
    <span class="token comment"># 初始化模型</span>
    model<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

    <span class="token comment"># 真实值</span>
    expected  <span class="token operator">=</span> y
    <span class="token comment"># 预测值</span>
    predicted <span class="token operator">=</span> model<span class="token punctuation">.</span>predict<span class="token punctuation">(</span>X<span class="token punctuation">)</span>

    <span class="token comment"># Compute and return F1 (harmonic mean of precision and recall)</span>
    <span class="token comment">#   #计算并返回F1（精度和召回率的平均值）</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;{}: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>estimator<span class="token punctuation">.</span>__class__<span class="token punctuation">.</span>__name__<span class="token punctuation">,</span> f1_score<span class="token punctuation">(</span>expected<span class="token punctuation">,</span> predicted<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> model <span class="token keyword">in</span> models<span class="token punctuation">:</span>
    score_model<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> model<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>SVC: 0.6624286455630514
NuSVC: 0.6726016476215785
LinearSVC: 0.6583804143126177
SGDClassifier: 0.6343612334801763
KNeighborsClassifier: 0.6581185045215279
LogisticRegression: 0.6580434509606933


/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/linear_model/logistic.py:757: ConvergenceWarning: lbfgs failed to converge. Increase the number of iterations.
  &quot;of iterations.&quot;, ConvergenceWarning)


LogisticRegressionCV: 0.6583804143126177
BaggingClassifier: 0.6873056644585642
ExtraTreesClassifier: 0.6871364804544838
RandomForestClassifier: 0.6874746655857316
</code></pre><p>初步模型评估看来，根据上述F1分数的结果，哪种模型表现最好？</p><p>SGDClassifier</p><h6 id="_1-4-2-视觉模型评估" tabindex="-1"><a class="header-anchor" href="#_1-4-2-视觉模型评估" aria-hidden="true">#</a> 1.4.2 视觉模型评估</h6><p>现在，让我们重构我们的模型评估函数，以使用Yellowbrick的ClassificationReport类，一个显示精度、召回率和F1分数的模型可视化工具。这个可视化的模型分析工具集成了数字分数和彩色编码的热图，以支持简单的解释和检测，特别是I型和II型错误的细微差别，它们与我们的用例非常相关（甚至可以挽救生命）！</p><p>I型错误（或“假阳性”）是指检测不存在的影响（例如，当蘑菇事实上可以食用时，但判断为蘑菇有毒）。<br> II错误（或“假阴性”）是指未能检测到存在的影响（例如，蘑菇实际上有毒，但可判断为以食用）。</p><p>因此我们通过一下代码显示了各个模型的混淆矩阵</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> sklearn<span class="token punctuation">.</span>pipeline <span class="token keyword">import</span> Pipeline
<span class="token keyword">from</span> yellowbrick<span class="token punctuation">.</span>classifier <span class="token keyword">import</span> ClassificationReport


<span class="token keyword">def</span> <span class="token function">visualize_model</span><span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> estimator<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    Test various estimators.
    &quot;&quot;&quot;</span>
    y <span class="token operator">=</span> LabelEncoder<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>fit_transform<span class="token punctuation">(</span>y<span class="token punctuation">)</span>
    model <span class="token operator">=</span> Pipeline<span class="token punctuation">(</span><span class="token punctuation">[</span>
        <span class="token punctuation">(</span><span class="token string">&#39;one_hot_encoder&#39;</span><span class="token punctuation">,</span> OneHotEncoder<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token string">&#39;estimator&#39;</span><span class="token punctuation">,</span> estimator<span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment"># Instantiate the classification model and visualizer</span>
    visualizer <span class="token operator">=</span> ClassificationReport<span class="token punctuation">(</span>
        model<span class="token punctuation">,</span> classes<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;edible&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;poisonous&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        cmap<span class="token operator">=</span><span class="token string">&quot;YlGn&quot;</span><span class="token punctuation">,</span> size<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">360</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">**</span>kwargs
    <span class="token punctuation">)</span>
    visualizer<span class="token punctuation">.</span>fit<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
    visualizer<span class="token punctuation">.</span>score<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
    visualizer<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> model <span class="token keyword">in</span> models<span class="token punctuation">:</span>
    visualize_model<span class="token punctuation">(</span>X<span class="token punctuation">,</span> y<span class="token punctuation">,</span> model<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_0.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_1.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_2.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_3.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_4.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_5.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><pre><code>/opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages/sklearn/linear_model/logistic.py:757: ConvergenceWarning: lbfgs failed to converge. Increase the number of iterations.
  &quot;of iterations.&quot;, ConvergenceWarning)
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_7.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_8.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_9.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[机器学习] Yellowbrick使用笔记2-模型选择/output_9_10.png" alt="png" tabindex="0" loading="lazy"><figcaption>png</figcaption></figure><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,30),f={href:"https://www.scikit-yb.org/en/latest/tutorial.html#modeling-and-evaluation",target:"_blank",rel:"noopener noreferrer"};function y(w,C){const a=o("ExternalLinkIcon");return p(),l("div",null,[r,u,n("p",null,[n("a",d,[k,e(a)])]),m,n("p",null,[s("本教程使用Yellowbrick 示例数据集模块中的蘑菇数据。我们的目标是根据蘑菇的特征来预测蘑菇是否有毒或可食用。蘑菇数据的YB版本不同于"),n("a",v,[s("UCI机器学习存储库"),e(a)]),s("中的蘑菇数据集。Yellowbrick版本已被有意修改，使建模更具挑战性。这些数据包括对蘑菇和麻风菌科23种有鳃蘑菇的假设样本的描述。每一个物种都被确定为绝对可食用，绝对有毒，或未知的食用性和不推荐（后一类是与有毒的一类相结合）。")]),g,n("p",null,[s("我们的数据（包括目标）是分类的。我们将需要将这些值更改为数字值以进行机器学习。为了从数据集中提取数据，我们必须使用scikit-learn转换器将输入数据集转换为适合模型的数据。幸运的是，scikit-learn确实提供了将类别标签转换为数字整数的转换器："),n("a",b,[s("sklearn.preprocessing.LabelEncoder"),e(a)]),s("和"),n("a",h,[s("sklearn.preprocessing.OneHotEncoder"),e(a)]),s("。")]),_,n("p",null,[n("a",f,[s("https://www.scikit-yb.org/en/latest/tutorial.html#modeling-and-evaluation"),e(a)])])])}const E=i(c,[["render",y],["__file","2020-07-25-_机器学习_ Yellowbrick使用笔记2-模型选择.html.vue"]]);export{E as default};
