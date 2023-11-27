import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c,a as n,b as s,d as t,e as p}from"./app-MsA2k2kn.js";const l={},r=n("h1",{id:"编程基础-python数据生成库faker总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编程基础-python数据生成库faker总结","aria-hidden":"true"},"#"),s(" [编程基础] Python数据生成库Faker总结")],-1),u=n("p",null,"Python Faker教程展示了如何使用Faker软件包在Python中生成伪数据。我们使用joke2k/faker包。",-1),k=n("h2",{id:"_1-介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-介绍","aria-hidden":"true"},"#"),s(" 1 介绍")],-1),d=n("p",null,"Faker是一个生成假数据的Python库。伪数据通常用于测试或用一些伪数据填充数据库。Python Faker很大程度上受到了PHP的Faker、Perl的Data::Faker和Ruby的Faker的启发。该软件包与composer一起安装。另外，我们安装了Dumper，它在转储变量时提供更好的控制台输出。",-1),m={href:"https://github.com/joke2k/faker",target:"_blank",rel:"noopener noreferrer"},v={href:"https://faker.readthedocs.io/en/master/index.html",target:"_blank",rel:"noopener noreferrer"},b=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># pip install Faker</span>
<span class="token comment"># pip install Dumper</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),g={href:"https://faker.readthedocs.io/en/master/locales.html",target:"_blank",rel:"noopener noreferrer"},f=p(`<h3 id="_1-1-简单的使用" tabindex="-1"><a class="header-anchor" href="#_1-1-简单的使用" aria-hidden="true">#</a> 1.1 简单的使用</h3><p>下面示例输出假名称，地址和文本。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;address: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>address<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;text: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>name: Sara Hood
address: 5550 Soto Extension
Katherinetown, HI 43412
text: Personal onto section structure. Song thing prove blue answer ok left sure.
Talk situation ahead soon parent score.
She break rather couple enjoy to. Relate prove possible wrong.
</code></pre>`,4),h={href:"https://faker.readthedocs.io/en/master/locales.html",target:"_blank",rel:"noopener noreferrer"},y=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

<span class="token comment"># 默认是en_US</span>
faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;address: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>address<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;text: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>name: 萧坤
address: 新疆维吾尔自治区阳县锡山杭州街Y座 851331
text: 当然看到帮助汽车的话在线.位置但是不是.欢迎不是所以通过计划为了.
提高特别手机.中心一直我们.
正在经营手机以后一样情况.特别网上这里介绍.
到了科技阅读.当前经营主要.注册投资时候.
影响这种公司软件社区记者大小资料.支持那些一种客户有限人民日期今天.建设历史计划公司活动那么所以.
认为文章新闻一般中文帖子.文章主要那个发展增加所有.
经验发布广告比较历史应该.单位需要系统他们.
</code></pre><h3 id="_1-2-faking-names" tabindex="-1"><a class="header-anchor" href="#_1-2-faking-names" aria-hidden="true">#</a> 1.2 Faking names</h3><p>在下面示例中，我们伪造与用户名有关的数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 名字</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;First name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>first_name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 姓</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Last name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>last_name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;--------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 男人名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Male name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>name_male<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 女人名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Female name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>name_female<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Name: 马淑英
First name: 玉英
Last name: 罗
--------------------------
Male name: 黄小红
Female name: 黄建华
</code></pre><h3 id="_1-3-faking-jobs" tabindex="-1"><a class="header-anchor" href="#_1-3-faking-jobs" aria-hidden="true">#</a> 1.3 Faking jobs</h3><p>使用job()接口生成假的工作。使用如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>faker<span class="token punctuation">.</span>job<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>网站编辑
呼叫中心客服
招聘专员/助理
测试员
畜牧师
水工
</code></pre><h3 id="_1-4-faking-currencies" tabindex="-1"><a class="header-anchor" href="#_1-4-faking-currencies" aria-hidden="true">#</a> 1.4 Faking currencies</h3><p>下面的示例为货币创建假数据</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 仅支持英文输出</span>
<span class="token comment"># 生成货币</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;currency: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>currency<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 货币名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;currency name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>currency_name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 货币代号</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;currency code: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>currency_code<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>currency: (&#39;FJD&#39;, &#39;Fijian dollar&#39;)
currency name: Tanzanian shilling
currency code: PYG
</code></pre><h3 id="_1-5-faking-words" tabindex="-1"><a class="header-anchor" href="#_1-5-faking-words" aria-hidden="true">#</a> 1.5 Faking words</h3><p>下面的示例为单词创建假数据</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 创建一个单词</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;a word: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>word<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 创建六个单词</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;six words: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>words<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;春天&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;夏天&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;秋天&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;冬天&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;白天&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;黑天&#39;</span><span class="token punctuation">]</span>
<span class="token comment"># 从预定义的单词列表中创建假单词</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;customized unique words: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>words<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> words<span class="token punctuation">,</span> <span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>a word: 而且
six words: [&#39;如何&#39;, &#39;如果&#39;, &#39;自己&#39;, &#39;单位&#39;, &#39;同时&#39;, &#39;来自&#39;]
customized unique words: [&#39;春天&#39;, &#39;冬天&#39;]
</code></pre><h3 id="_1-6-faking-profiles" tabindex="-1"><a class="header-anchor" href="#_1-6-faking-profiles" aria-hidden="true">#</a> 1.6 Faking profiles</h3><p>Faker可以使用simple_profile()创建简单的虚拟配置文件，使用profile()创建扩展配置文件。通过profile可以生成信息概要文件，该示例为男性和女性创建虚拟概要文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker
<span class="token keyword">import</span> dumper

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

profile1 <span class="token operator">=</span> faker<span class="token punctuation">.</span>simple_profile<span class="token punctuation">(</span><span class="token punctuation">)</span>
dumper<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>profile1<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;--------------------------&#39;</span><span class="token punctuation">)</span>

profile2 <span class="token operator">=</span> faker<span class="token punctuation">.</span>simple_profile<span class="token punctuation">(</span><span class="token string">&#39;M&#39;</span><span class="token punctuation">)</span>
dumper<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>profile2<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;--------------------------&#39;</span><span class="token punctuation">)</span>

profile3 <span class="token operator">=</span> faker<span class="token punctuation">.</span>profile<span class="token punctuation">(</span>sex<span class="token operator">=</span><span class="token string">&#39;F&#39;</span><span class="token punctuation">)</span>
dumper<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>profile3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;dict at 0x7f4ebfa51730&gt;:
  username: &#39;napeng&#39;
  name: &#39;林冬梅&#39;
  sex: &#39;M&#39;
  address: &#39;甘肃省荆门县白云李街w座 407872&#39;
  mail: &#39;rbai@yahoo.com&#39;
  birthdate: &lt;str at 0x7f4ebf6ec530&gt;: &#39;datetime.date(1908, 11, 20)&#39;
--------------------------
&lt;dict at 0x7f4ebefbe6e0&gt;:
  username: &#39;zhaojing&#39;
  name: &#39;郑璐&#39;
  sex: &#39;M&#39;
  address: &#39;广西壮族自治区桂英县魏都武汉路o座 706400&#39;
  mail: &#39;fanwei@yahoo.com&#39;
  birthdate: &lt;str at 0x7f4ebeea08f0&gt;: &#39;datetime.date(1953, 9, 22)&#39;
--------------------------
&lt;dict at 0x7f4ebf5aa8c0&gt;:
  job: &#39;股票/期货操盘手&#39;
  company: &#39;合联电子科技有限公司&#39;
  ssn: &#39;211403193711125294&#39;
  residence: &#39;山东省利县清河舒路N座 674496&#39;
  current_location: &lt;tuple at 0x7f4ebf705460&gt;
    0: &lt;str at 0x7f4ebeea0df0&gt;: &quot;Decimal(&#39;23.160202&#39;)&quot;
    1: &lt;str at 0x7f4ebeea0df0&gt;: &quot;Decimal(&#39;-132.788799&#39;)&quot;
  blood_group: &#39;A+&#39;
  website: [&#39;https://www.wp.cn/&#39;, &#39;https://www.pingshao.cn/&#39;]
  username: &#39;kdai&#39;
  name: &#39;王玲&#39;
  sex: &#39;F&#39;
  address: &#39;西藏自治区磊县白云济南街h座 652495&#39;
  mail: &#39;fang20@hotmail.com&#39;
  birthdate: &lt;str at 0x7f4ebeea08f0&gt;: &#39;datetime.date(1985, 10, 18)&#39;
</code></pre><h3 id="_1-7-faking-numbers" tabindex="-1"><a class="header-anchor" href="#_1-7-faking-numbers" aria-hidden="true">#</a> 1.7 Faking numbers</h3><p>Faker允许生成随机数字和整数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 随机数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Random int: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>random_int<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># random_int()中指定生成0到100数字</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Random int: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>random_int<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 生成数字0到9</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Random digit: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>random_digit<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Random int: 837
Random int: 72
Random digit: 1
</code></pre><h3 id="_1-8-faking-hashes-and-uuids" tabindex="-1"><a class="header-anchor" href="#_1-8-faking-hashes-and-uuids" aria-hidden="true">#</a> 1.8 Faking hashes and uuids</h3><p>hashes和uuids的伪造支持。下面示例生成三个伪哈希和一个uuid值</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;md5: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>md5<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;sha1: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>sha1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;sha256: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>sha256<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;uuid4: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>md5: 01c570bf837bd5dd4a0d1f21d2d1005f
sha1: 005a8185c78d72bfb6174f672ebcc65e92b3a2c8
sha256: 0157d784e175bbcacef6334b4b840634b1af721212a9a582681dcd0a65435d6d
uuid4: 013bd385-9d37-4ecb-bd33-2afafb8b1350
</code></pre><h3 id="_1-9-faking-internet-related-data" tabindex="-1"><a class="header-anchor" href="#_1-9-faking-internet-related-data" aria-hidden="true">#</a> 1.9 Faking internet related data</h3><p>Faker有多个用于伪造Internet相关数据的访问器。下面示例显示了各种与Internet相关的数据，包括电子邮件，域名，段，IP地址和URL。其中一些数据是真实存在的，只是伪造随机选择了互联网的数据，如url可以直接打开。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Email: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>email<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Safe email: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>safe_email<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Free email: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>free_email<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Company email: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>company_email<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;------------------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Host name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>hostname<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Domain name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>domain_name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Domain word: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>domain_word<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;TLD: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>tld<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;------------------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;IPv4: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>ipv4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;IPv6: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>ipv6<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;MAC address: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>mac_address<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;------------------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Slug: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>slug<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Image URL: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>image_url<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Email: juan03@yahoo.com
Safe email: dingxiuying@example.com
Free email: xiulanfeng@hotmail.com
Company email: tao55@yangxiuying.cn
------------------------------------
Host name: srv-22.yanping.cn
Domain name: zou.cn
Domain word: 96
TLD: cn
------------------------------------
IPv4: 219.38.223.8
IPv6: 247e:c6c6:eaaa:2466:b17f:ab9b:cb64:3d86
MAC address: f4:89:6f:d4:6c:69
------------------------------------
Slug: 
Image URL: https://placeimg.com/654/868/any
</code></pre><h3 id="_1-10-faking-date-and-time" tabindex="-1"><a class="header-anchor" href="#_1-10-faking-date-and-time" aria-hidden="true">#</a> 1.10 Faking date and time</h3><p>Faker有很多伪造日期和时间值的方法。</p><p>下面示例显示了伪造的生日，日期时间部分，时区和AM / PM方法</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 生日</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Date of birth: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_of_birth<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 世纪</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Century: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>century<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 年</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Year: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>year<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 月</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Month: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>month<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 英文月名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Month name: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>month_name<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 星期名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Day of week: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>day_of_week<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 日号</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Day of month: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>day_of_month<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 时区</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Time zone: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>timezone<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 上午下午</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;AM/PM: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>am_pm<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Date of birth: 1962-01-19
Century: IX
Year: 1988
Month: 08
Month name: April
Day of week: Thursday
Day of month: 10
Time zone: Pacific/Galapagos
AM/PM: AM
</code></pre><p>第二个示例显示了在当前世纪，十年，年份或月份中生成日期时间值的方法。它还包括时间序列值的生成。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> faker <span class="token keyword">import</span> Faker

faker <span class="token operator">=</span> Faker<span class="token punctuation">(</span><span class="token string">&#39;zh_CN&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 本世纪的日期时间</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Datetime this century: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_time_this_century<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 近十年的日期时间</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Datetime this decade: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_time_this_decade<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 今年的日期时间</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Datetime this year: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_time_this_year<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 本月的日期时间</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Datetime this month: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_time_this_month<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># # 本世纪的日期</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Date this century: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_this_century<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 近十年的日期</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Date this decade: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_this_decade<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 今年的日期</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Date this year: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_this_year<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 本月的日期</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Date this month: </span><span class="token interpolation"><span class="token punctuation">{</span>faker<span class="token punctuation">.</span>date_this_month<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-------------------------&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 时间间隔</span>
TOTAL_SECONDS <span class="token operator">=</span> <span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">24</span><span class="token operator">*</span><span class="token number">2</span> <span class="token comment"># two days</span>
<span class="token comment"># 伪造到现在为止时间间隔为两天的序列</span>
series <span class="token operator">=</span> faker<span class="token punctuation">.</span>time_series<span class="token punctuation">(</span>start_date<span class="token operator">=</span><span class="token string">&#39;-12d&#39;</span><span class="token punctuation">,</span> end_date<span class="token operator">=</span><span class="token string">&#39;now&#39;</span><span class="token punctuation">,</span> precision<span class="token operator">=</span>TOTAL_SECONDS<span class="token punctuation">)</span>

<span class="token keyword">for</span> val <span class="token keyword">in</span> series<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Datetime this century: 2013-01-08 02:27:47
Datetime this decade: 2020-03-01 18:24:33
Datetime this year: 2020-06-20 01:18:59
Datetime this month: 2020-06-08 01:25:48
-------------------------
Date this century: 2012-06-16
Date this decade: 2020-02-25
Date this year: 2020-04-23
Date this month: 2020-06-14
-------------------------
2020-06-09 11:51:25
2020-06-11 11:51:25
2020-06-13 11:51:25
2020-06-15 11:51:25
2020-06-17 11:51:25
2020-06-19 11:51:25
</code></pre><h3 id="_1-11-faker函数列表" tabindex="-1"><a class="header-anchor" href="#_1-11-faker函数列表" aria-hidden="true">#</a> 1.11 faker函数列表</h3>`,43),_={href:"https://faker.readthedocs.io/en/master/providers.html",target:"_blank",rel:"noopener noreferrer"},w=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token triple-quoted-string string">&#39;&#39;&#39;
faker.providers
faker.providers.address
faker.providers.automotive
faker.providers.bank
faker.providers.barcode
faker.providers.color
faker.providers.company
faker.providers.credit_card
faker.providers.currency
faker.providers.date_time
faker.providers.file
faker.providers.geo
faker.providers.internet
faker.providers.isbn
faker.providers.job
faker.providers.lorem
faker.providers.misc
faker.providers.person
faker.providers.phone_number
faker.providers.profile
faker.providers.python
faker.providers.ssn
faker.providers.user_agent
&#39;&#39;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,2),x={href:"http://zetcode.com/python/faker/",target:"_blank",rel:"noopener noreferrer"},F={href:"https://faker.readthedocs.io/en/master/index.html",target:"_blank",rel:"noopener noreferrer"};function D(z,P){const a=o("ExternalLinkIcon");return i(),c("div",null,[r,u,k,d,n("p",null,[s("官方项目地址见： "),n("a",m,[s("https://github.com/joke2k/faker"),t(a)])]),n("p",null,[s("官方文档地址见： "),n("a",v,[s("https://faker.readthedocs.io/en/master/index.html"),t(a)])]),b,n("p",null,[s("通过faker.Faker()创建并初始化faker数据生成器，该生成器可以通过访问以数据类型命名的属性来生成数据。 Faker将数据生成委托给提供者。默认提供程序使用英语区域设置。Faker支持其他地区语言（包括中文）；它们的完成程度不同。支持的语言列表见： "),n("a",g,[s("https://faker.readthedocs.io/en/master/locales.html"),t(a)])]),f,n("p",null,[s("当然可以在创建Faker生成器时通过语言代号指定语言，如下所示。常用支持的语言代号见： "),n("a",h,[s("https://faker.readthedocs.io/en/master/locales.html"),t(a)])]),y,n("p",null,[s("faker提供许多函数接口，本文并没有全部列出，具体见官方文档。可用的函数列表如下。直接在官方文档地址 "),n("a",_,[s("https://faker.readthedocs.io/en/master/providers.html"),t(a)]),s("，点击对应的函数列表链接，便有对应的使用说明。")]),w,n("blockquote",null,[n("p",null,[n("a",x,[s("http://zetcode.com/python/faker/"),t(a)])])]),n("blockquote",null,[n("p",null,[n("a",F,[s("https://faker.readthedocs.io/en/master/index.html"),t(a)])])])])}const M=e(l,[["render",D],["__file","2020-06-21-_编程基础_ Python数据生成库Faker总结.html.vue"]]);export{M as default};
