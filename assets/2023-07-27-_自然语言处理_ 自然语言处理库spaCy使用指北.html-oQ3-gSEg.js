import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as e,e as t}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"自然语言处理-自然语言处理库spacy使用指北",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#自然语言处理-自然语言处理库spacy使用指北","aria-hidden":"true"},"#"),s(" [自然语言处理] 自然语言处理库spaCy使用指北")],-1),r={href:"https://github.com/explosion/spaCy",target:"_blank",rel:"noopener noreferrer"},d={href:"https://spacy.io",target:"_blank",rel:"noopener noreferrer"},k=t('<p>[toc]</p><h2 id="_1-背景介绍与spacy安装" tabindex="-1"><a class="header-anchor" href="#_1-背景介绍与spacy安装" aria-hidden="true">#</a> 1 背景介绍与spaCy安装</h2><h3 id="_1-1-自然语言处理简介" tabindex="-1"><a class="header-anchor" href="#_1-1-自然语言处理简介" aria-hidden="true">#</a> 1.1 自然语言处理简介</h3><p>自然语言处理（Natural Language Processing，简称NLP）是一门研究人类语言与计算机之间交互的领域，旨在使计算机能够理解、解析、生成和处理人类语言。NLP结合了计算机科学、人工智能和语言学的知识，通过各种算法和技术来处理和分析文本数据。近年来，随着深度学习技术的发展，神经网络模型在自然语言处理（NLP）领域取得了重大的突破。其中，循环神经网络（RNN）、长短时记忆网络（LSTM）和Transformer等模型都发挥了关键作用。这些模型为NLP任务带来了更好的性能和效果，推动了NLP的发展和应用。</p><p>NLP主要知识结构如下图所示，图片来自网络。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[自然语言处理] 自然语言处理库spaCy使用指北/image/img1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>NLP的应用非常广泛，涵盖了多个领域，如机器翻译、信息提取、文本分类、情感分析、自动摘要、问答系统、语音识别和语音合成等。以下是NLP常用的技术和方法：</p><ul><li>分词：将连续的文本分割成有意义的词语或标记，是许多NLP任务的基础。</li><li>词性标注：为文本中的每个词语赋予其相应的词性，如名词、动词、形容词等。</li><li>句法分析：分析句子的语法结构，识别出句子中的短语、修饰语和依存关系等。</li><li>语义分析：理解文本的意义和语义关系，包括命名实体识别、语义角色标注和语义解析等。</li><li>机器翻译：将一种语言的文本自动翻译成另一种语言。</li><li>文本分类：将文本按照预定义的类别进行分类，如垃圾邮件分类、情感分类等。</li><li>信息提取：从结构化和非结构化文本中提取出特定的信息，如实体关系抽取、事件抽取等。</li><li>问答系统：通过对用户提出的问题进行理解和回答，提供准确的答案或相关信息。</li><li>情感分析：识别和分析文本中的情感倾向，如正面、负面或中性情感。</li><li>文本生成：使用NLP技术生成自然语言文本，如自动摘要生成、对话系统和机器作文等。</li></ul>',8),m={href:"https://spacy.io/usage/models",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/huggingface/transformers",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/PaddlePaddle/PaddleNLP",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/nltk/nltk",target:"_blank",rel:"noopener noreferrer"},y=n("h3",{id:"_1-2-spacy安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-2-spacy安装","aria-hidden":"true"},"#"),s(" 1.2 spaCy安装")],-1),h=n("p",null,"spaCy采用采用模块和语言模块一起安装的模式。spaCy的设计目标之一是模块化和可定制性。它允许用户仅安装必需的模块和语言数据，以减少安装的整体大小和减轻资源负担。如果使用spaCy的模型，需要通过pip安装模型所需的模型包来使用预训练模型。这是因为spaCy的模型包含了训练后的权重参数和其他必要的文件，这些文件在安装时被存储在特定位置，而不是以单个文件的形式存在。如果需要进行模型训练和gpu运行则需要选定对应的安装包。将模块和语言模块一起安装，可以简化spaCy的配置过程。用户无需单独下载和配置语言数据，也不需要手动指定要使用的语言模型。这样可以减少用户的工作量和安装过程中的潜在错误。但是可定制性就很弱了，所以spaCy适合精度要求不高的简单使用，工程应用选择其他大型自然语言处理库更加合适。",-1),_={href:"https://spacy.io/usage",target:"_blank",rel:"noopener noreferrer"},f=t(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[自然语言处理] 自然语言处理库spaCy使用指北/image/img2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>spaCy安装完毕后，运行以下代码即可判断spaCy及相对应的语言模型是否安装成功。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## jupyter notebook环境去除warning</span>
<span class="token keyword">import</span> warnings
warnings<span class="token punctuation">.</span>filterwarnings<span class="token punctuation">(</span><span class="token string">&quot;ignore&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">import</span> spacy
spacy<span class="token punctuation">.</span>__version__
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;3.6.0&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

<span class="token comment">## 加载已安装的中文模型</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&#39;zh_core_web_sm&#39;</span><span class="token punctuation">)</span>

<span class="token comment">## 执行一些简单的NLP任务</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;早上好!&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> doc<span class="token punctuation">:</span>
    <span class="token comment">## token.text表示标记的原始文本，token.pos_表示标记的词性（part-of-speech），token.dep_表示标记与其他标记之间的句法依存关系</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">,</span> token<span class="token punctuation">.</span>pos_<span class="token punctuation">,</span> token<span class="token punctuation">.</span>dep_<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>早上 NOUN nmod:tmod
好 VERB ROOT
! PUNCT punct
</code></pre><h2 id="_2-spacy快速入门" tabindex="-1"><a class="header-anchor" href="#_2-spacy快速入门" aria-hidden="true">#</a> 2 spaCy快速入门</h2>`,7),x={href:"https://spacy.io/usage/spacy-101",target:"_blank",rel:"noopener noreferrer"},q=t(`<table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td>Tokenization</td><td>将文本分割成单词、标点符号等。</td></tr><tr><td>Part-of-speech (POS) Tagging</td><td>给标记分配词性，如动词或名词。</td></tr><tr><td>Dependency Parsing</td><td>分配句法依存标签，描述个别标记之间的关系，如主语或宾语。</td></tr><tr><td>Lemmatization</td><td>分配单词的基本形式。例如，“was”的基本形式是“be”，“rats”的基本形式是“rat”。</td></tr><tr><td>Sentence Boundary Detection (SBD)</td><td>查找和分割单个句子。</td></tr><tr><td>Named Entity Recognition (NER)</td><td>对命名的“现实世界”对象进行标记，如人物、公司或地点。</td></tr><tr><td>Entity Linking (EL)</td><td>将文本实体与知识库中的唯一标识符进行消岐。</td></tr><tr><td>Similarity</td><td>比较单词、文本片段和文档之间的相似程度。</td></tr><tr><td>Text Classification</td><td>为整个文档或文档的部分分配类别或标签。</td></tr><tr><td>Rule-based Matching</td><td>根据其文本和语言注释查找标记序列，类似于正则表达式。</td></tr><tr><td>Training</td><td>更新和改进统计模型的预测能力。</td></tr><tr><td>Serialization</td><td>将对象保存到文件或字节字符串中。</td></tr></tbody></table><h3 id="_2-1-分词" tabindex="-1"><a class="header-anchor" href="#_2-1-分词" aria-hidden="true">#</a> 2.1 分词</h3><p>在处理过程中，spaCy首先对文本进行标记，即将其分段为单词、标点符号等Token。这是通过应用每种语言特有的规则来实现的。Token表示自然语言文本的最小单位。每个Token都代表着文本中的一个原子元素，通常是单词或标点符号。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 使对文本进行一键处理</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;南京长江大桥是金陵四十景之一！&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 遍历doc中的每个Token</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> doc<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>南京
长江
大桥
是
金陵
四十
景
之一
！
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;en_core_web_sm&quot;</span><span class="token punctuation">)</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;Apple is looking at buying U.K. startup for $1 billion&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> doc<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Apple
is
looking
at
buying
U.K.
startup
for
$
1
billion
</code></pre><p>对于中文分词有时会出现专有名词被拆分，比如南京长江大桥被拆分为南京、长江、大桥。我们可以添加自定义词典来解决该问题，但是要注意的是自定义词典添加只针对某些语言模型。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 添加自定义词汇</span>
nlp<span class="token punctuation">.</span>tokenizer<span class="token punctuation">.</span>pkuseg_update_user_dict<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;南京长江大桥&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;金陵四十景&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;南京长江大桥是金陵四十景之一！&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> doc<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>南京长江大桥
是
金陵四十景
之一
！
</code></pre><h3 id="_2-2-词性标注与依存关系" tabindex="-1"><a class="header-anchor" href="#_2-2-词性标注与依存关系" aria-hidden="true">#</a> 2.2 词性标注与依存关系</h3><p>spaCy在分词后，会对句子中每个词进行词性标注以及确定句子中单词之间的语法关系，要注意这些关系具体范围取决于所使用的模型。示例代码如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;en_core_web_sm&quot;</span><span class="token punctuation">)</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;Apple is looking at buying U.K. startup for $1 billion&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## token.text: 单词的原始形式。</span>
<span class="token comment">## token.lemma_: 单词的基本形式（或词干）。例如，“running”的词干是“run”。</span>
<span class="token comment">## token.pos_: 单词的粗粒度的词性标注，如名词、动词、形容词等。</span>
<span class="token comment">## token.tag_: 单词的细粒度的词性标注，提供更多的语法信息。</span>
<span class="token comment">## token.dep_: 单词在句子中的依存关系角色，例如主语、宾语等。</span>
<span class="token comment">## token.shape_: 单词的形状信息，例如，单词的大小写，是否有标点符号等。</span>
<span class="token comment">## token.is_alpha: 这是一个布尔值，用于检查token是否全部由字母组成。</span>
<span class="token comment">## token.is_stop: 这是一个布尔值，用于检查token是否为停用词（如“the”、“is”等在英语中非常常见但通常不包含太多信息的词）。</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> doc<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">,</span> token<span class="token punctuation">.</span>lemma_<span class="token punctuation">,</span> token<span class="token punctuation">.</span>pos_<span class="token punctuation">,</span> token<span class="token punctuation">.</span>tag_<span class="token punctuation">,</span> token<span class="token punctuation">.</span>dep_<span class="token punctuation">,</span>
            token<span class="token punctuation">.</span>shape_<span class="token punctuation">,</span> token<span class="token punctuation">.</span>is_alpha<span class="token punctuation">,</span> token<span class="token punctuation">.</span>is_stop<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Apple Apple PROPN NNP nsubj Xxxxx True False
is be AUX VBZ aux xx True True
looking look VERB VBG ROOT xxxx True False
at at ADP IN prep xx True True
buying buy VERB VBG pcomp xxxx True False
U.K. U.K. PROPN NNP dobj X.X. False False
startup startup NOUN NN advcl xxxx True False
for for ADP IN prep xxx True True
$ $ SYM $ quantmod $ False False
1 1 NUM CD compound d False False
billion billion NUM CD pobj xxxx True False
</code></pre><p>在上述代码中pos_所用是常见的单词词性标注。tag_所支持的词性标注及解释如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 获取所有词性标注（tag_）和它们的描述</span>
tag_descriptions <span class="token operator">=</span> <span class="token punctuation">{</span>tag<span class="token punctuation">:</span> spacy<span class="token punctuation">.</span>explain<span class="token punctuation">(</span>tag<span class="token punctuation">)</span> <span class="token keyword">for</span> tag <span class="token keyword">in</span> nlp<span class="token punctuation">.</span>get_pipe<span class="token punctuation">(</span><span class="token string">&#39;tagger&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>labels<span class="token punctuation">}</span>
<span class="token comment">## 打印词性标注（tag_）及其描述</span>
<span class="token comment">## print(&quot;词性标注 (TAG) 及其描述：&quot;)</span>
<span class="token comment">## for tag, description in tag_descriptions.items():</span>
<span class="token comment">##     print(f&quot;{tag}: {description}&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dep__所支持的依存关系及解释如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 获取所有依存关系标注和它们的描述</span>
par_descriptions <span class="token operator">=</span> <span class="token punctuation">{</span>par<span class="token punctuation">:</span> spacy<span class="token punctuation">.</span>explain<span class="token punctuation">(</span>par<span class="token punctuation">)</span> <span class="token keyword">for</span> par <span class="token keyword">in</span> nlp<span class="token punctuation">.</span>get_pipe<span class="token punctuation">(</span><span class="token string">&#39;parser&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>labels<span class="token punctuation">}</span>
<span class="token comment">## print(&quot;依存关系及其描述：&quot;)</span>
<span class="token comment">## for par, description in par_descriptions.items():</span>
<span class="token comment">##     print(f&quot;{par}: {description}&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-命名实体识别" tabindex="-1"><a class="header-anchor" href="#_2-3-命名实体识别" aria-hidden="true">#</a> 2.3 命名实体识别</h3><p>命名实体识别(Named Entity Recognition, 简称NER)是自然语言处理中的一项基础任务，应用范围非常广泛。 NER是指识别文本中具有特定意义或者指代性强的实体，通常包括人名、地名、机构名、日期时间、专有名词等。spaCy使用如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 添加自定义词汇</span>
nlp<span class="token punctuation">.</span>tokenizer<span class="token punctuation">.</span>pkuseg_update_user_dict<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;东方明珠&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 自定义词汇可能不会进入实体识别。</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;东方明珠是一座位于中国上海市的标志性建筑，建造于1991年，是一座高度为468米的电视塔。&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> ent <span class="token keyword">in</span> doc<span class="token punctuation">.</span>ents<span class="token punctuation">:</span>
    <span class="token comment">## 实体文本，开始位置，结束位置，实体标签</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>ent<span class="token punctuation">.</span>text<span class="token punctuation">,</span> ent<span class="token punctuation">.</span>start_char<span class="token punctuation">,</span> ent<span class="token punctuation">.</span>end_char<span class="token punctuation">,</span> ent<span class="token punctuation">.</span>label_<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>中国上海市 9 14 GPE
1991年 24 29 DATE
468米 36 40 QUANTITY
</code></pre><p>如果想知道所有的实体以及其对应的含义，可以执行以下代码：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 获取命名实体标签及其含义</span>
entity_labels <span class="token operator">=</span> nlp<span class="token punctuation">.</span>get_pipe<span class="token punctuation">(</span><span class="token string">&#39;ner&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>labels

<span class="token comment">## 打印输出所有命名实体及其含义</span>
<span class="token keyword">for</span> label <span class="token keyword">in</span> entity_labels<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;{}: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>label<span class="token punctuation">,</span>spacy<span class="token punctuation">.</span>explain<span class="token punctuation">(</span>label<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>CARDINAL: Numerals that do not fall under another type
DATE: Absolute or relative dates or periods
EVENT: Named hurricanes, battles, wars, sports events, etc.
FAC: Buildings, airports, highways, bridges, etc.
GPE: Countries, cities, states
LANGUAGE: Any named language
LAW: Named documents made into laws.
LOC: Non-GPE locations, mountain ranges, bodies of water
MONEY: Monetary values, including unit
NORP: Nationalities or religious or political groups
ORDINAL: &quot;first&quot;, &quot;second&quot;, etc.
ORG: Companies, agencies, institutions, etc.
PERCENT: Percentage, including &quot;%&quot;
PERSON: People, including fictional
PRODUCT: Objects, vehicles, foods, etc. (not services)
QUANTITY: Measurements, as of weight or distance
TIME: Times smaller than a day
WORK_OF_ART: Titles of books, songs, etc.
</code></pre><h3 id="_2-4-词向量与相似性" tabindex="-1"><a class="header-anchor" href="#_2-4-词向量与相似性" aria-hidden="true">#</a> 2.4 词向量与相似性</h3><p>词向量是自然语言处理中一种重要的表示方式，它将单词映射为实数向量。这种表示方式能够捕捉单词之间的语义关系，并将语义信息转化为计算机能够处理的数值形式。</p><p>传统的自然语言处理方法往往将文本表示为离散的符号，例如独热编码或者词袋模型。然而，这种方法忽略了单词之间的语义相似性，而且维度过高，造成稀疏性问题。相比之下，词向量通过将每个单词映射到连续的向量空间中，可以更好地捕捉单词之间的语义关系，并且降低了特征空间的维度，使得文本处理更加高效。通过计算两个词向量之间的距离或夹角可以衡量词向量的相似性。</p><p>提取句子中每一个词的词向量代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

<span class="token comment">## 加载中文模型&quot;zh_core_web_sm&quot;</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 对给定文本进行分词和词性标注</span>
tokens <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;东方明珠是一座位于中国上海市的标志性建筑！&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 遍历分词后的每个词语</span>
<span class="token keyword">for</span> token <span class="token keyword">in</span> tokens<span class="token punctuation">:</span>
    <span class="token comment">## 输出词语的文本内容、是否有对应的向量表示、向量范数和是否为未登录词（Out-of-vocabulary，即不在词向量词典中的词）</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>text<span class="token punctuation">,</span> token<span class="token punctuation">.</span>has_vector<span class="token punctuation">,</span> token<span class="token punctuation">.</span>vector_norm<span class="token punctuation">,</span> token<span class="token punctuation">.</span>is_oov<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>东方 True 11.572288 True
明珠 True 10.620552 True
是 True 12.337883 True
一 True 12.998204 True
座位 True 10.186406 True
于 True 13.540245 True
中国 True 12.459145 True
上海市 True 12.004954 True
的 True 12.90457 True
标志性 True 13.601862 True
建筑 True 10.46621 True
！ True 12.811246 True
</code></pre><p>如果想得到某个句子或者某个词的词向量，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 该词向量没有归一化</span>
tokens<span class="token punctuation">.</span>vector<span class="token punctuation">.</span>shape
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>(96,)
</code></pre><p>spaCy提供了similarity函数以计算两个文本向量的相似度。 示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

<span class="token comment">## 为了方便这里使用小模型，推荐使用更大的模型</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>  
doc1 <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;东方明珠是一座位于中国上海市的标志性建筑&quot;</span><span class="token punctuation">)</span>
doc2 <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;南京长江大桥是金陵四十景之一！&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 计算两个文本的相似度</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>doc1<span class="token punctuation">,</span> <span class="token string">&quot;&lt;-&gt;&quot;</span><span class="token punctuation">,</span> doc2<span class="token punctuation">,</span> doc1<span class="token punctuation">.</span>similarity<span class="token punctuation">(</span>doc2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>东方明珠是一座位于中国上海市的标志性建筑 &lt;-&gt; 南京长江大桥是金陵四十景之一！ 0.5743045135827821
</code></pre>`,37),w={href:"https://github.com/explosion/sense2vec",target:"_blank",rel:"noopener noreferrer"},T=t(`<p>此外如果仅仅使用spacy提取文本向量，可以用numpy手动计算文本相似度，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> spacy
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>  
doc1 <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;东方明珠是一座位于中国上海市的标志性建筑&quot;</span><span class="token punctuation">)</span>
doc2 <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;南京长江大桥是金陵四十景之一！&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 获取doc1和doc2的词向量</span>
vec1 <span class="token operator">=</span> doc1<span class="token punctuation">.</span>vector
vec2 <span class="token operator">=</span> doc2<span class="token punctuation">.</span>vector

<span class="token comment">## 使用NumPy计算相似度得分，np.linalg.norm(vec1)就是doc1.vector_norm</span>
similarity_score <span class="token operator">=</span> np<span class="token punctuation">.</span>dot<span class="token punctuation">(</span>vec1<span class="token punctuation">,</span> vec2<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token punctuation">(</span>np<span class="token punctuation">.</span>linalg<span class="token punctuation">.</span>norm<span class="token punctuation">(</span>vec1<span class="token punctuation">)</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>linalg<span class="token punctuation">.</span>norm<span class="token punctuation">(</span>vec2<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>doc1<span class="token punctuation">,</span> <span class="token string">&quot;&lt;-&gt;&quot;</span><span class="token punctuation">,</span> doc2<span class="token punctuation">,</span>similarity_score<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>东方明珠是一座位于中国上海市的标志性建筑 &lt;-&gt; 南京长江大桥是金陵四十景之一！ 0.5743046
</code></pre><h2 id="_3-spacy结构体系" tabindex="-1"><a class="header-anchor" href="#_3-spacy结构体系" aria-hidden="true">#</a> 3 spaCy结构体系</h2><h3 id="_3-1-spacy处理流程" tabindex="-1"><a class="header-anchor" href="#_3-1-spacy处理流程" aria-hidden="true">#</a> 3.1 spaCy处理流程</h3><p>当在一个文本上调用nlp模型时，spaCy首先对文本进行分词处理，生成一个Doc对象。接着，Doc对象将在几个不同的步骤中进行处理。训练好的处理流程通常包括词性标注器、依存句法解析器和实体识别器等处理组件。这些组件相互独立，每个处理流程组件都会返回处理后的Doc对象，然后将其传递给下一个组件。 最终生成的Doc对象是一个包含了所有单词和标点符号的序列，每个单词被表示为Token对象。每个Token对象包含了单词本身的内容、词性标注、词形还原后的形式等信息。以下图片解释了使用spaCy进行文本处理的过程。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[自然语言处理] 自然语言处理库spaCy使用指北/image/img3.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如上图所示，模型管道中所涉及到的模块主要取决于该模型的结构和训练方式。其中分词tokenizer是一个特殊的组件且独立于其他组件之外，这是因为其他组件模块在调用前都会先调用tokenizer以对字符串进行分词。所有支持主要的模块如下，这些模块的使用已在前一章进行介绍。</p><table><thead><tr><th>名称</th><th>组件</th><th>创建</th><th>描述</th></tr></thead><tbody><tr><td>tokenizer</td><td>Tokenizer</td><td>Doc</td><td>将文本分割为标记。</td></tr><tr><td>tagger</td><td>Tagger</td><td>Token.tag</td><td>为标记分配词性标签。</td></tr><tr><td>parser</td><td>DependencyParser</td><td>Token.head,Token.dep,Doc.sents,Doc.noun_chunks</td><td>分配依赖关系标签。</td></tr><tr><td>ner</td><td>EntityRecognizer</td><td>Doc.ents,Token.ent_iob,Token.ent_type</td><td>检测和标记命名实体。</td></tr><tr><td>lemmatizer</td><td>Lemmatizer</td><td>Token.lemma</td><td>分配单词的基本形式。</td></tr><tr><td>textcat</td><td>TextCategorizer</td><td>Doc.cats</td><td>分配文档标签。</td></tr><tr><td>custom</td><td>自定义组件</td><td>Doc.<em>.xxx,Token.</em>.xxx,Span._.xxx</td><td>分配自定义属性、方法或属性。</td></tr></tbody></table><p>一个spacy的模型所支持的文本处理组件查看方式如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

<span class="token comment">## 加载中文模型&quot;zh_core_web_sm&quot;</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
<span class="token comment">## 查看所支持的组件</span>
nlp<span class="token punctuation">.</span>pipe_names
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;tok2vec&#39;, &#39;tagger&#39;, &#39;parser&#39;, &#39;attribute_ruler&#39;, &#39;ner&#39;]
</code></pre><p>基于以下代码可以控制组件的选择和使用，以加快执行速度：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 加载不包含命名实体识别器（NER）的管道</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">,</span> exclude<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;ner&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">## 查看所支持的组件</span>
nlp<span class="token punctuation">.</span>pipe_names
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;tok2vec&#39;, &#39;tagger&#39;, &#39;parser&#39;, &#39;attribute_ruler&#39;]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 只启用tagger管道</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">,</span>enable<span class="token operator">=</span><span class="token punctuation">[</span> <span class="token string">&quot;tagger&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
nlp<span class="token punctuation">.</span>pipe_names
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;tagger&#39;]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 加载词性标注器（tagger）和依存句法解析器（parser），但不启用它们</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">,</span> disable<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;tagger&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;parser&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">)</span>
<span class="token comment">## 禁用某些组件</span>
nlp<span class="token punctuation">.</span>disable_pipe<span class="token punctuation">(</span><span class="token string">&quot;ner&quot;</span><span class="token punctuation">)</span>
nlp<span class="token punctuation">.</span>pipe_names
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;tok2vec&#39;, &#39;attribute_ruler&#39;]
</code></pre><h3 id="_3-2-spacy工程结构" tabindex="-1"><a class="header-anchor" href="#_3-2-spacy工程结构" aria-hidden="true">#</a> 3.2 spaCy工程结构</h3><p>spaCy中的中心数据结构是Language类、Vocab和Doc对象。Language类用于处理文本并将其转换为Doc对象。它通常存储为一个名为nlp的变量。Doc对象拥有令牌序列及其所有注释。通过在Vocab中集中字符串、词向量和词法属性。这些主要类和对象的介绍如下所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[自然语言处理] 自然语言处理库spaCy使用指北/image/img4.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>常用模块的介绍如下：</p><p><strong>Doc</strong></p><p>Doc是spaCy中一个重要的对象，它代表了一个文本文档，并包含了文本中的所有信息，如单词、标点、词性、依赖关系等。可以通过spaCy的Language对象对文本进行处理，得到一个Doc对象。</p><p><strong>DocBin</strong></p><p>DocBin 是用于高效序列化和反序列化Doc对象的数据结构，以在不同的过程中保存和加载Doc对象。使用代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 导入所需的库</span>
<span class="token keyword">import</span> spacy
<span class="token keyword">from</span> spacy<span class="token punctuation">.</span>tokens <span class="token keyword">import</span> DocBin

<span class="token comment">## 加载英文预训练模型</span>
nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;en_core_web_sm&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 定义待处理文本</span>
texts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;This is sentence 1.&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;And this is sentence 2.&quot;</span><span class="token punctuation">]</span>

<span class="token comment">## 将每个文本转化为Doc对象，用nlp处理并保存到docs列表中</span>
docs <span class="token operator">=</span> <span class="token punctuation">[</span>nlp<span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token keyword">for</span> text <span class="token keyword">in</span> texts<span class="token punctuation">]</span>

<span class="token comment">## 创建一个新的DocBin对象，用于保存文档数据，并启用存储用户数据的功能</span>
docbin <span class="token operator">=</span> DocBin<span class="token punctuation">(</span>store_user_data<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token comment">## 将每个Doc对象添加到DocBin中</span>
<span class="token keyword">for</span> doc <span class="token keyword">in</span> docs<span class="token punctuation">:</span>
    docbin<span class="token punctuation">.</span>add<span class="token punctuation">(</span>doc<span class="token punctuation">)</span>

<span class="token comment">## 将DocBin保存到文件中</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;documents.spacy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>docbin<span class="token punctuation">.</span>to_bytes<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 从文件中加载DocBin</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;documents.spacy&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;rb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    bytes_data <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 从字节数据中恢复加载DocBin对象</span>
loaded_docbin <span class="token operator">=</span> DocBin<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>from_bytes<span class="token punctuation">(</span>bytes_data<span class="token punctuation">)</span>

<span class="token comment">## 使用nlp.vocab获取词汇表，并通过DocBin获取所有加载的文档</span>
loaded_docs <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span>loaded_docbin<span class="token punctuation">.</span>get_docs<span class="token punctuation">(</span>nlp<span class="token punctuation">.</span>vocab<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 输出加载的文档</span>
loaded_docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[This is sentence 1., And this is sentence 2.]
</code></pre><p><strong>Example</strong></p>`,30),C={href:"https://spacy.io/usage/training",target:"_blank",rel:"noopener noreferrer"},N=t(`<p><strong>Language</strong></p><p>Language是spaCy的核心对象之一，它负责处理文本的预处理、词性标注、句法分析等任务。可以通过spacy.load()来加载一个具体的语言模型，获取对应的Language对象。</p><p><strong>Lexeme</strong></p><p>Lexeme 是一个单词在词汇表中的表示，它包含了关于该单词的各种信息，如词性、词频等。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;en_core_web_sm&quot;</span><span class="token punctuation">)</span>

<span class="token comment">## 定义一个单词</span>
word <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span>

<span class="token comment">## 获取单词对应的词元（lexeme）</span>
lexeme <span class="token operator">=</span> nlp<span class="token punctuation">.</span>vocab<span class="token punctuation">[</span>word<span class="token punctuation">]</span>

<span class="token comment">## 打印词元的文本内容、是否为字母（alphabetical）</span>
<span class="token comment">## 是否为停用词（stopword）\\是否为字母（is_alpha），是否为数字（is_digit），是否为标题（is_title），语言（lang_）</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>lexeme<span class="token punctuation">.</span>text<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>is_alpha<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>is_stop<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>is_alpha<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>is_digit<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>is_title<span class="token punctuation">,</span> lexeme<span class="token punctuation">.</span>lang_<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>hello True False True False False en
</code></pre><p>事实上对于Lexeme，只要可能，spaCy就会尝试将数据存储在一个词汇表Vocab中，该词汇表将由多个模型共享。为了节省内存，spaCy还将所有字符串编码为哈希值。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[自然语言处理] 自然语言处理库spaCy使用指北/image/img5.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如下所示，不同模型下“coffee”的哈希值为3197928453018144401。但是注意的是只是spaCy这样做，其他自然语言处理库不一定这样做。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;I love coffee&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span>vocab<span class="token punctuation">.</span>strings<span class="token punctuation">[</span><span class="token string">&quot;coffee&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">## 3197928453018144401</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span>vocab<span class="token punctuation">.</span>strings<span class="token punctuation">[</span><span class="token number">3197928453018144401</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">## &#39;coffee&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>3197928453018144401
coffee
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> spacy

nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;en_core_web_sm&quot;</span><span class="token punctuation">)</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span><span class="token string">&quot;I love coffee&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span>vocab<span class="token punctuation">.</span>strings<span class="token punctuation">[</span><span class="token string">&quot;coffee&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">## 3197928453018144401</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span>vocab<span class="token punctuation">.</span>strings<span class="token punctuation">[</span><span class="token number">3197928453018144401</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment">## &#39;coffee&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>3197928453018144401
coffee
</code></pre><p><strong>Span</strong></p><p>Span 是一个连续的文本片段，可以由一个或多个Token组成。它通常用于标记实体或短语。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>nlp <span class="token operator">=</span> spacy<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token string">&quot;zh_core_web_sm&quot;</span><span class="token punctuation">)</span>
text <span class="token operator">=</span> <span class="token string">&quot;东方明珠是一座位于中国上海市的标志性建筑！&quot;</span>
doc <span class="token operator">=</span> nlp<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

<span class="token comment">## 从doc中选择了第0个和第1个词元（token）组成的片段。</span>
<span class="token comment">## 注意，spaCy中的词元是文本的基本单元，可能是单词、标点符号或其它词汇单位。</span>
<span class="token comment">## 这里东方、明珠是前两个词</span>
span <span class="token operator">=</span> doc<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">2</span><span class="token punctuation">]</span>  
<span class="token keyword">print</span><span class="token punctuation">(</span>span<span class="token punctuation">.</span>text<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>东方明珠
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,18),P={href:"https://github.com/explosion/spaCy",target:"_blank",rel:"noopener noreferrer"},D={href:"https://spacy.io",target:"_blank",rel:"noopener noreferrer"},L={href:"https://spacy.io/usage/models",target:"_blank",rel:"noopener noreferrer"},z={href:"https://github.com/huggingface/transformers",target:"_blank",rel:"noopener noreferrer"},E={href:"https://github.com/PaddlePaddle/PaddleNLP",target:"_blank",rel:"noopener noreferrer"},A={href:"https://github.com/nltk/nltk",target:"_blank",rel:"noopener noreferrer"},R={href:"https://spacy.io/usage",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/explosion/sense2vec",target:"_blank",rel:"noopener noreferrer"},O={href:"https://spacy.io/usage/training",target:"_blank",rel:"noopener noreferrer"};function F(S,U){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("spaCy是一个基于Python编写的开源自然语言处理库。基于自然处理领域的最新研究，spaCy提供了一系列高效且易用的工具，用于文本预处理、文本解析、命名实体识别、词性标注、句法分析和文本分类等任务。 spaCy的官方仓库地址为："),n("a",r,[s("spaCy-github"),e(a)]),s("。本文主要参考其官方网站的文档，spaCy的官方网站地址为："),n("a",d,[s("spaCy"),e(a)]),s("。")]),k,n("p",null,[s("在众多自然语言处理库中，spaCy库提供了超过73种语言的支持，并为25种语言提供了训练代码。该库提供了一系列简单易用的模型和函数接口，包括分词、词性标注等功能。用户还可以使用PyTorch、TensorFlow等框架在spaCy创建自定义模型，以满足特定需求。spaCy支持的语言模型见"),n("a",m,[s("spaCy-models"),e(a)]),s("。")]),n("p",null,[s("事实上，有一些自然语言处理开源库，例如HuggingFace的"),n("a",v,[s("Transformers"),e(a)]),s("、"),n("a",b,[s("PaddleNLP"),e(a)]),s("和"),n("a",g,[s("NLTK"),e(a)]),s("，相较于spaCy来说更为专业且性能更好。然而，对于简单的应用而言，spaCy更为适合，因为它具有简单易用、功能全面，同时也提供了大量面向多语言预训练模型的优点。此外，随着以GPT-3为代表的语言大模型在自然语言处理领域取得了巨大的突破和成功，原本一些自然语言处理库在精度上实际不如语言大模型。然而，使用语言大模型需要庞大的推理资源，而在对精度要求不高的场景中，使用spaCy这类小巧的自然语言处理库依然是很合适的选择。")]),y,h,n("p",null,[s("为了实现这一目标，spaCy提供了配置化的安装指令选择页面供用户使用。安装指令选择页面地址为"),n("a",_,[s("spaCy-usage"),e(a)]),s("。下图展示了本文的安装配置项，本文采用了最简单的cpu推理模式。")]),f,n("p",null,[s("该部分内容和图片主要来自于"),n("a",x,[s("spacy-101"),e(a)]),s("的总结。spaCy提供的主要函数模块分为以下模块，接下来分别对这些模块进行介绍。")]),q,n("p",null,[s("在上面代码中相似度计算方式默认使用余弦相似度。余弦相似度范围为0到1，数值越高表明词向量越相似。一般来说词向量相似度使用spacy通用模型准确度可能很低，可以尝试使用专用模型或者自行训练模型，spacy推荐使用"),n("a",w,[s("sense2vec"),e(a)]),s("来计算模型相似度。")]),T,n("p",null,[s("Example用于训练spaCy模型，它包含了一个输入文本(Doc)和其对应的标注数据。关于spaCy模型的训练，见:"),n("a",C,[s("spaCy-training"),e(a)])]),N,n("ul",null,[n("li",null,[n("a",P,[s("spaCy-github"),e(a)])]),n("li",null,[n("a",D,[s("spaCy"),e(a)])]),n("li",null,[n("a",L,[s("spaCy-models"),e(a)])]),n("li",null,[n("a",z,[s("Transformers"),e(a)])]),n("li",null,[n("a",E,[s("PaddleNLP"),e(a)])]),n("li",null,[n("a",A,[s("NLTK"),e(a)])]),n("li",null,[n("a",R,[s("spaCy-usage"),e(a)])]),n("li",null,[n("a",B,[s("sense2vec"),e(a)])]),n("li",null,[n("a",O,[s("spaCy-training"),e(a)])])])])}const j=p(l,[["render",F],["__file","2023-07-27-_自然语言处理_ 自然语言处理库spaCy使用指北.html.vue"]]);export{j as default};
