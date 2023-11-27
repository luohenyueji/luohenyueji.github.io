import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as t,c as l,a as n,b as s,d as e,e as c}from"./app-MsA2k2kn.js";const i={},r=n("h1",{id:"python-python枚举模块enum总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-python枚举模块enum总结","aria-hidden":"true"},"#"),s(" [python] Python枚举模块enum总结")],-1),u={href:"https://docs.python.org/3/library/enum.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://zetcode.com/python/enum/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.cnblogs.com/AzeHan/p/17305113.html",target:"_blank",rel:"noopener noreferrer"},k=c(`<p>[toc]</p><h2 id="_1-语法介绍" tabindex="-1"><a class="header-anchor" href="#_1-语法介绍" aria-hidden="true">#</a> 1 语法介绍</h2><p><strong>基础示例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 引入 Enum 模块，用于创建枚举</span>
<span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum

<span class="token comment"># 创建一个枚举类Color，从Python内置的枚举类Enum继承</span>
<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 定义 RED 数值为 1</span>
    RED <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token comment"># 定义 GREEN 数值为 2</span>
    GREEN <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token comment"># 定义 BLUE 数值为 3</span>
    BLUE <span class="token operator">=</span> <span class="token number">3</span>


col <span class="token operator">=</span> Color<span class="token punctuation">.</span>RED
<span class="token comment"># 输出Color.RED</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>col<span class="token punctuation">)</span>

<span class="token keyword">if</span> col <span class="token operator">==</span> Color<span class="token punctuation">.</span>RED<span class="token punctuation">:</span>
    <span class="token comment"># 判断 col 是否为 Color.RED，若是则输出 &quot;Red&quot;</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Red&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 输出 Color 枚举类的所有成员：[&lt;Color.RED: 1&gt;, &lt;Color.GREEN: 2&gt;, &lt;Color.BLUE: 3&gt;]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>Color<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 判断col是否为Color类型</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">isinstance</span><span class="token punctuation">(</span>col<span class="token punctuation">,</span> Color<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 输出 col 的类型：&lt;enum &#39;Color&#39;&gt;</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>col<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 输出 col 的字符串表示形式：&lt;Color.RED: 1&gt;</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>col<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 通过 Color[&#39;RED&#39;] 获取 Color.RED</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">[</span><span class="token string">&#39;RED&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 通过 Color(1) 获取 Color.RED</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Color.RED
Red
[&lt;Color.RED: 1&gt;, &lt;Color.GREEN: 2&gt;, &lt;Color.BLUE: 3&gt;]
True
&lt;enum &#39;Color&#39;&gt;
&lt;Color.RED: 1&gt;
Color.RED
Color.RED
</code></pre><p><strong>函数式API创建枚举类</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 引入枚举类型</span>
<span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum

<span class="token comment"># 使用functional API创建枚举类，定义三个枚举常量，分别为 RED, GREEN, BLUE，从数字2开始标号</span>
Color <span class="token operator">=</span> Enum<span class="token punctuation">(</span><span class="token string">&#39;Color&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;RED GREEN BLUE&#39;</span><span class="token punctuation">,</span> start<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment"># 或使用以下形式</span>
<span class="token comment"># Color = Enum(&#39;Color&#39;, [(&#39;RED&#39;, 1), (&#39;BLUE&#39;, 2), (&#39;GREEN&#39;, 3)])</span>

<span class="token comment"># 将 col 设为 GREEN</span>
col <span class="token operator">=</span> Color<span class="token punctuation">.</span>GREEN

<span class="token comment"># 输出 col 的值：Color.GREEN</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>col<span class="token punctuation">)</span>

<span class="token comment"># 比较 col 和 GREEN 是否相等，如果相等则输出 &quot;Green&quot;</span>
<span class="token keyword">if</span> col <span class="token operator">==</span> Color<span class="token punctuation">.</span>GREEN<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Green&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 遍历枚举</span>
<span class="token keyword">for</span> color <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span>
<span class="token comment"># 使用 name 和 value 属性获取枚举名称和值</span>
<span class="token keyword">for</span> color <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span>name<span class="token punctuation">,</span> color<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

<span class="token comment"># 使用 __members__ 属性获取枚举类型 Color 中的所有枚举常量和名称</span>
<span class="token keyword">for</span> name<span class="token punctuation">,</span> member <span class="token keyword">in</span> Color<span class="token punctuation">.</span>__members__<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> member<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Color.GREEN
Green
Color.RED
Color.GREEN
Color.BLUE
RED 2
GREEN 3
BLUE 4
RED Color.RED
GREEN Color.GREEN
BLUE Color.BLUE
</code></pre><p><strong>自动赋值</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 导入枚举和自动赋值模块</span>
<span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum<span class="token punctuation">,</span> auto

<span class="token comment"># 定义一个颜色的枚举类</span>
<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 自动赋值，RED 的值为 1，后面的枚举类值依次加 1</span>
    RED <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    BLUE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    GREEN <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 遍历 Color 枚举类，输出每个枚举值</span>
<span class="token keyword">for</span> color <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span>

<span class="token comment"># 遍历 Color 枚举类，输出每个枚举值的名称和值</span>
<span class="token keyword">for</span> color <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span>name<span class="token punctuation">,</span> color<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Color.RED
Color.BLUE
Color.GREEN
RED 1
BLUE 2
GREEN 3
</code></pre><p><strong>异类值</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum

<span class="token comment"># 枚举成员的值类型可以不一样，但是非常不推荐这样做</span>
<span class="token keyword">class</span> <span class="token class-name">UserResponse</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    YES <span class="token operator">=</span> <span class="token number">1</span>
    NO <span class="token operator">=</span> <span class="token string">&quot;No&quot;</span>
    MAYBE <span class="token operator">=</span> <span class="token string">&quot;Maybe&quot;</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>UserResponse<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&lt;UserResponse.YES: 1&gt;, &lt;UserResponse.NO: &#39;No&#39;&gt;, &lt;UserResponse.MAYBE: &#39;Maybe&#39;&gt;]
</code></pre><p><strong>混合枚举</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum

<span class="token comment"># 通过多重继承创建支持整数比较的枚举</span>
<span class="token keyword">class</span> <span class="token class-name">Size</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    S <span class="token operator">=</span> <span class="token number">1</span>
    M <span class="token operator">=</span> <span class="token number">2</span>
    L <span class="token operator">=</span> <span class="token number">3</span>
    XL <span class="token operator">=</span> <span class="token number">4</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>Size<span class="token punctuation">.</span>S <span class="token operator">&gt;</span> Size<span class="token punctuation">.</span>M<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>False
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 实现和上述代码一样的功能</span>
<span class="token keyword">from</span> enum <span class="token keyword">import</span> IntEnum

<span class="token comment"># 通过IntEnum创建支持整数比较的枚举</span>
<span class="token keyword">class</span> <span class="token class-name">Size</span><span class="token punctuation">(</span>IntEnum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    S <span class="token operator">=</span> <span class="token number">1</span>
    M <span class="token operator">=</span> <span class="token number">2</span>
    L <span class="token operator">=</span> <span class="token number">3</span>
    XL <span class="token operator">=</span> <span class="token number">4</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>Size<span class="token punctuation">.</span>S <span class="token operator">&gt;</span> Size<span class="token punctuation">.</span>M<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>False
</code></pre><p><strong>强制唯一值</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum<span class="token punctuation">,</span> unique

<span class="token comment"># 当成员值不唯一，如果不添加unique装饰器，则代码运行成功，但只保留第一个出现具有相同值的成员。</span>
<span class="token comment"># 如果添加unique，则运行报错</span>
<span class="token comment"># @unique</span>
<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    RED <span class="token operator">=</span> <span class="token number">1</span>
    GREEN <span class="token operator">=</span> <span class="token number">2</span>
    BLUE <span class="token operator">=</span> <span class="token number">3</span>
    ORANGE <span class="token operator">=</span> <span class="token number">3</span>
    WHITE <span class="token operator">=</span> <span class="token number">3</span>

<span class="token keyword">for</span> color <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Color.RED
Color.GREEN
Color.BLUE
</code></pre><p><strong>基于位掩码的枚举类型enum.Flag</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> IntFlag<span class="token punctuation">,</span> Flag<span class="token punctuation">,</span> auto

<span class="token comment"># 创建基于位掩码的枚举类型，注意成员值为2的幂，最好不要自定义</span>
<span class="token comment"># 如果想创建整数枚举继承IntFlag即可</span>
<span class="token keyword">class</span> <span class="token class-name">Permissions</span><span class="token punctuation">(</span>Flag<span class="token punctuation">)</span><span class="token punctuation">:</span>
    READ <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 定义读权限</span>
    WRITE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 定义写权限</span>
    EXECUTE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 定义执行权限</span>
    DELETE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 定义删除权限</span>

<span class="token comment"># 使用 name 和 value 属性获取枚举名称和值</span>
<span class="token comment"># 可以看到各个成员的值是2的幂</span>
<span class="token keyword">for</span> p <span class="token keyword">in</span> Permissions<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>name<span class="token punctuation">,</span> p<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

<span class="token comment"># 使用枚举成员</span>
perms_rw <span class="token operator">=</span> Permissions<span class="token punctuation">.</span>READ <span class="token operator">|</span> Permissions<span class="token punctuation">.</span>WRITE  <span class="token comment"># 用户拥有读和写权限</span>
<span class="token comment"># 可以看到perms_rw的值为3</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>perms_rw<span class="token punctuation">.</span>name<span class="token punctuation">,</span>perms_rw<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

<span class="token comment"># 检查是否有某个权限</span>
<span class="token comment"># 使用&amp;运算符来判断一个枚举值中是否包含某个特定的枚举值</span>
<span class="token keyword">if</span> perms_rw <span class="token operator">&amp;</span> Permissions<span class="token punctuation">.</span>READ<span class="token punctuation">:</span>  <span class="token comment"># 如果用户拥有读权限</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;用户拥有读权限&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> perms_rw <span class="token operator">&amp;</span> Permissions<span class="token punctuation">.</span>WRITE<span class="token punctuation">:</span>  <span class="token comment"># 如果用户拥有写权限</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;用户拥有写权限&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> perms_rw <span class="token operator">&amp;</span> Permissions<span class="token punctuation">.</span>EXECUTE<span class="token punctuation">:</span>  <span class="token comment"># 如果用户拥有执行权限</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;用户拥有执行权限&quot;</span><span class="token punctuation">)</span>

 <span class="token comment"># 遍历所有权限</span>
<span class="token keyword">for</span> perm <span class="token keyword">in</span> Permissions<span class="token punctuation">:</span> 
    <span class="token keyword">print</span><span class="token punctuation">(</span>perm<span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>READ 1
WRITE 2
EXECUTE 4
DELETE 8
None 3
用户拥有读权限
用户拥有写权限
Permissions.READ
Permissions.WRITE
Permissions.EXECUTE
Permissions.DELETE
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,26),v={href:"https://docs.python.org/3/library/enum.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://zetcode.com/python/enum/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.cnblogs.com/AzeHan/p/17305113.html",target:"_blank",rel:"noopener noreferrer"};function y(h,g){const a=p("ExternalLinkIcon");return t(),l("div",null,[r,n("p",null,[s("枚举是一种数据类型，在编程中用于表示一组相关的常量。枚举中的每个常量都有一个名称和一个对应的值，可以用于增强代码的可读性和可维护性。在Python中，枚举是由enum模块提供的，而不是Python提供专用的枚举语法。关于enum模块介绍见："),n("a",u,[s("enum"),e(a)]),s("。如需详细了解Python的enum模块，参见文章："),n("a",d,[s("Python enum"),e(a)]),s("和"),n("a",m,[s("枚举(enum)介绍"),e(a)]),s("。")]),k,n("ul",null,[n("li",null,[n("a",v,[s("enum"),e(a)])]),n("li",null,[n("a",b,[s("Python enum"),e(a)])]),n("li",null,[n("a",E,[s("枚举(enum)介绍"),e(a)])])])])}const _=o(i,[["render",y],["__file","2023-04-17-_python_ Python枚举模块enum总结.html.vue"]]);export{_ as default};
