import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o,c as i,a as n,b as a,d as p,e as c}from"./app-MsA2k2kn.js";const l={},u=c(`<h1 id="编程基础-python随机数生成模块总结" tabindex="-1"><a class="header-anchor" href="#编程基础-python随机数生成模块总结" aria-hidden="true">#</a> [编程基础] Python随机数生成模块总结</h1><p>Python随机数生成模块教程演示如何在Python中生成伪随机数。</p><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1 介绍</h2><h3 id="_1-1-随机数字生成器" tabindex="-1"><a class="header-anchor" href="#_1-1-随机数字生成器" aria-hidden="true">#</a> 1.1 随机数字生成器</h3><p>随机数生成器(RNG)生成一组在外观上不显示任何可区分模式的值。随机数生成器分为两类:硬件随机数生成器和伪随机数生成器。硬件随机数生成器被认为能产生真正的随机数。伪随机数生成器根据软件算法生成值。它们产生的值看起来是随机的。但这些值是确定性的，如果算法已知，可以重新生成。</p><p>在计算中，随机生成器用于游戏、模拟或密码学。为了安全起见，必须使用加密安全的伪随机数生成器。为了提高伪随机数生成器的质量，操作系统使用从设备驱动程序、用户输入延迟或来自一个或多个硬件组件的抖动中收集的环境噪声。这是加密安全伪随机数生成器的核心。</p><h3 id="_1-2-python-random-模块" tabindex="-1"><a class="header-anchor" href="#_1-2-python-random-模块" aria-hidden="true">#</a> 1.2 Python random 模块</h3><p>内置的Python random模块为各种分布实现伪随机数生成器。Python使用Mersenne Twister算法来生成伪随机数。这个模块安全性不高。对于安全相关的任务，推荐使用secrets模块。</p><h3 id="_1-3随机种子" tabindex="-1"><a class="header-anchor" href="#_1-3随机种子" aria-hidden="true">#</a> 1.3随机种子</h3><p>种子是初始化随机数生成器的值。随机数生成器通过对以前的值执行一些操作来生成值。当算法开始时，种子是生成器操作的初始值。生成器最重要和最困难的部分是提供接近真正随机数的种子。要注意的是同一种子产生相同的伪随机数集。</p><h2 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2 使用</h2><h3 id="_2-1-python-random模块同一随机种子使用" tabindex="-1"><a class="header-anchor" href="#_2-1-python-random模块同一随机种子使用" aria-hidden="true">#</a> 2.1 Python random模块同一随机种子使用</h3><p>在下面的示例中，我们使用相同的种子。相同的种子值产生相同的伪随机值。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


myseed <span class="token operator">=</span> <span class="token number">16</span>

<span class="token comment"># 设置随机种子</span>
random<span class="token punctuation">.</span>seed<span class="token punctuation">(</span>myseed<span class="token punctuation">)</span>

<span class="token comment"># 产生随机数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;********************************&#39;</span><span class="token punctuation">)</span>

random<span class="token punctuation">.</span>seed<span class="token punctuation">(</span>myseed<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0.36152277491407514
0.480480665601294
0.4169526266056648
********************************
0.36152277491407514
0.480480665601294
0.4169526266056648
</code></pre><h3 id="_2-2-python-random-randint" tabindex="-1"><a class="header-anchor" href="#_2-2-python-random-randint" aria-hidden="true">#</a> 2.2 Python random.randint</h3><p>random.randint函数在值[x，y]之间生成整数。以下示例生成数字1到10之间的四个随机整数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


val <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>5
6
3
10
</code></pre><h3 id="_2-3-python-random-randrange" tabindex="-1"><a class="header-anchor" href="#_2-3-python-random-randrange" aria-hidden="true">#</a> 2.3 Python random.randrange</h3><p>random.randrange函数排除了右边的区间。它选择[x，y)之间的值。以下示例生成数字1到10之间的四个随机整数，其中排除了值10。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


val <span class="token operator">=</span> random<span class="token punctuation">.</span>randrange<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randrange<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randrange<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>randrange<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>5
1
4
5
</code></pre><h3 id="_2-4-python-random-uniform" tabindex="-1"><a class="header-anchor" href="#_2-4-python-random-uniform" aria-hidden="true">#</a> 2.4 Python random.uniform</h3><p>random.uniform函数在值[x，y]之间生成随机浮点数。以下示例在数字1和10之间产生四个随机浮点数。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


val <span class="token operator">=</span> random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1.1833595562120247
2.3856384178156502
6.45443300907888
6.678603948997886
</code></pre><h3 id="_2-5-python-random-choice" tabindex="-1"><a class="header-anchor" href="#_2-5-python-random-choice" aria-hidden="true">#</a> 2.5 Python random.choice</h3><p>该random.choice函数从非空序列返回一个随机元素。该示例从列表中随机抽取一个单词四次。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;sky&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;storm&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rock&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;falcon&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;forest&#39;</span><span class="token punctuation">]</span>


val <span class="token operator">=</span> random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>

val <span class="token operator">=</span> random<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>falcon
falcon
forest
rock
</code></pre><h3 id="_2-6-python-random-shuffle" tabindex="-1"><a class="header-anchor" href="#_2-6-python-random-shuffle" aria-hidden="true">#</a> 2.6 Python random.shuffle</h3><p>random.shuffle函数可以将序列打乱。以下示例将单词列表随机打乱两次。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;sky&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;storm&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rock&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;falcon&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;forest&#39;</span><span class="token punctuation">]</span>


random<span class="token punctuation">.</span>shuffle<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span>

random<span class="token punctuation">.</span>shuffle<span class="token punctuation">(</span>words<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>words<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;sky&#39;, &#39;falcon&#39;, &#39;forest&#39;, &#39;rock&#39;, &#39;storm&#39;]
[&#39;storm&#39;, &#39;forest&#39;, &#39;falcon&#39;, &#39;sky&#39;, &#39;rock&#39;]
</code></pre><h3 id="_2-7-python-random-sample" tabindex="-1"><a class="header-anchor" href="#_2-7-python-random-sample" aria-hidden="true">#</a> 2.7 Python random.sample</h3><p>random.sample允许从一个序列中随机抽取n个唯一元素。以下示例从单词列表中两次随机抽取三个元素。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> random


words <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;sky&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;storm&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rock&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;falcon&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;forest&#39;</span><span class="token punctuation">]</span>


sample <span class="token operator">=</span> random<span class="token punctuation">.</span>sample<span class="token punctuation">(</span>words<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>sample<span class="token punctuation">)</span>

sample <span class="token operator">=</span> random<span class="token punctuation">.</span>sample<span class="token punctuation">(</span>words<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>sample<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&#39;storm&#39;, &#39;rock&#39;, &#39;forest&#39;]
[&#39;rock&#39;, &#39;falcon&#39;, &#39;storm&#39;]
</code></pre><h3 id="_2-8-python-secrets-模块" tabindex="-1"><a class="header-anchor" href="#_2-8-python-secrets-模块" aria-hidden="true">#</a> 2.8 Python secrets 模块</h3><p>secrets模块用于生成适合管理密码、帐户身份验证或安全令牌等数据的强随机数。sercets模块中token_hex函数返回一个随机的十六进制文本字符串。token_urlsafe函数返回一个url安全的随机文本字符串。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> secrets
<span class="token keyword">import</span> string

<span class="token comment"># 返回一个随机的十六进制文本字符串</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>secrets<span class="token punctuation">.</span>token_hex<span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 返回随机文本字符串</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>secrets<span class="token punctuation">.</span>token_urlsafe<span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 生成一个八个字符的字母数字密码</span>
alphabet <span class="token operator">=</span> string<span class="token punctuation">.</span>ascii_letters <span class="token operator">+</span> string<span class="token punctuation">.</span>digits
password <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>secrets<span class="token punctuation">.</span>choice<span class="token punctuation">(</span>alphabet<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>49a4c25d535581c0e1edaf71
_FHy1al7lB4fyVqU
JjLoiy7k
</code></pre><h3 id="_2-9-python-uuid模块" tabindex="-1"><a class="header-anchor" href="#_2-9-python-uuid模块" aria-hidden="true">#</a> 2.9 Python UUID模块</h3><p>通用唯一标识符(Universally Unique Identifier)UUID是指一台机器上生成的数字，UUID是128位的全局唯一标志，通常由32字节的字符串表示。UUID由以下几部分组成：</p><ul><li><p>时间戳uuid1()：根据时间或时钟序列生成字符串</p></li><li><p>分布式计算uuid2():根据分布式计算环境DCE生成字符串</p></li><li><p>机器识别号uuid3()：根据MAC地址或者IP生成字符串，没有网卡则通过其他方式生成。</p></li><li><p>随机数uuid4()：自动随机生成一组序列字符串</p></li><li><p>散列值uuid5()： 基于名字和SAHI值</p></li></ul><p>python中uuid模块提供UUID类，UUID类中通过函数uuid1(), uuid3(), uuid4(), uuid5()来生成1, 3, 4, 5各个版本的UUID ( python中没有uuid2()这个函数，但是UUID标识符中有该指示实现，原因uuid2和uuid1类似，所以uuid2极少使用）。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> uuid

name <span class="token operator">=</span> <span class="token string">&quot;test&quot;</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid3<span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>NAMESPACE_DNS<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid5<span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>NAMESPACE_DNS<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>62ecaf30-b61a-11ea-ac5b-0a58ac13091e
45a113ac-c7f2-30b0-90a5-a399ab912716
109e9212-e837-4cd9-9e21-3b48aba373fa
4be0643f-1d98-573b-97cd-ca98a65347dd
</code></pre><p>uuid1可保证生成全球范围的唯一性字符. 但通过该方法生成的字符中包含有主机的网络地址, 可能危及隐私，根据实验的结果，产生的UUID后面几段的数字会完全一样。uuid4使用随机数来生成UUID但是伪随机数有较低的重复概率。uuid3和uuid5类似，都是通过计算命名空间和名字的SHA-1散列值来生成UUID。</p><p>在实际使用uuid1和uuid4较多，uuid3和uuid5更适合唯一性更高的场合。</p><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,52),r={href:"http://zetcode.com/python/random-module/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.jianshu.com/p/f99737713c1b",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.cnblogs.com/iamjianghao/p/10764525.html",target:"_blank",rel:"noopener noreferrer"};function m(v,b){const s=t("ExternalLinkIcon");return o(),i("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[a("http://zetcode.com/python/random-module/"),p(s)])])]),n("blockquote",null,[n("p",null,[n("a",d,[a("https://www.jianshu.com/p/f99737713c1b"),p(s)])])]),n("blockquote",null,[n("p",null,[n("a",k,[a("https://www.cnblogs.com/iamjianghao/p/10764525.html"),p(s)])])])])}const _=e(l,[["render",m],["__file","2020-06-24-_编程基础_ Python随机数生成模块总结.html.vue"]]);export{_ as default};
