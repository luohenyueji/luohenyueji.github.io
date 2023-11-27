import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o,c as i,a as n,b as s,d as t,e as c}from"./app-MsA2k2kn.js";const l={},r=n("h1",{id:"编程基础-python配置文件读取库configparser总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编程基础-python配置文件读取库configparser总结","aria-hidden":"true"},"#"),s(" [编程基础] Python配置文件读取库ConfigParser总结")],-1),u=n("p",null,"Python ConfigParser教程显示了如何使用ConfigParser在Python中使用配置文件。",-1),d=n("h2",{id:"_1-介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-介绍","aria-hidden":"true"},"#"),s(" 1 介绍")],-1),k=n("p",null,"ConfigParser是一个Python类，为Python程序实现基本的配置语言。它提供类似于Microsoft Windows INI文件的结构。ConfigParser允许编写可由最终用户轻松定制的Python程序。",-1),v=n("p",null,"配置文件由选项的键/值对组成。节名由[]字符分隔。这些键值对用:或=分隔。注释以#或;开头。",-1),g={href:"https://docs.python.org/3/library/configparser.html",target:"_blank",rel:"noopener noreferrer"},m=c(`<p>本文所用python语言环境为python3。python2和python3中configparser包名不一样。 configparser为python3中的包名 ConfigParser为python2中的包名</p><h3 id="_1-1-python-configparser读取文件" tabindex="-1"><a class="header-anchor" href="#_1-1-python-configparser读取文件" aria-hidden="true">#</a> 1.1 Python ConfigParser读取文件</h3><p>在下面示例中，我们从文件中读取配置数据。配置文件db.ini内容如下。由两部分数据组成。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysql]
host = localhost
user = user7
passwd = s$cret
db = ydb

[postgresql]
host = localhost
user = user8
passwd = mypwd$7
db = testdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下示例读取MySQL和PostgreSQL的配置数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

<span class="token comment"># 启动ConfigParse</span>
config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 使用read()读取文件。</span>
config<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;db.ini&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 从mysql部分访问数据</span>
host <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">]</span>
user <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span>
passwd <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;passwd&#39;</span><span class="token punctuation">]</span>
db <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;db&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;MySQL configuration:&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Host: </span><span class="token interpolation"><span class="token punctuation">{</span>host<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;User: </span><span class="token interpolation"><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Password: </span><span class="token interpolation"><span class="token punctuation">{</span>passwd<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Database: </span><span class="token interpolation"><span class="token punctuation">{</span>db<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 从postgresql部分访问数据</span>
host2 <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">]</span>
user2 <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span>
passwd2 <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;passwd&#39;</span><span class="token punctuation">]</span>
db2 <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;postgresql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;db&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;PostgreSQL configuration:&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Host: </span><span class="token interpolation"><span class="token punctuation">{</span>host2<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;User: </span><span class="token interpolation"><span class="token punctuation">{</span>user2<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Password: </span><span class="token interpolation"><span class="token punctuation">{</span>passwd2<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Database: </span><span class="token interpolation"><span class="token punctuation">{</span>db2<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>MySQL configuration:
Host: localhost
User: user7
Password: s$cret
Database: ydb
PostgreSQL configuration:
Host: localhost
User: user8
Password: mypwd$7
Database: testdb
</code></pre><h3 id="_1-2-python-configparser中的节" tabindex="-1"><a class="header-anchor" href="#_1-2-python-configparser中的节" aria-hidden="true">#</a> 1.2 Python ConfigParser中的节</h3><p>配置数据分为多个节。在sections()读取所有节和has_section()检查是否有指定的节。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
config<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;db.ini&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 获得节名</span>
sections <span class="token operator">=</span> config<span class="token punctuation">.</span>sections<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Sections: </span><span class="token interpolation"><span class="token punctuation">{</span>sections<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

sections<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">&#39;sqlite&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> section <span class="token keyword">in</span> sections<span class="token punctuation">:</span>

    <span class="token comment"># 判断是否有该节名</span>
    <span class="token keyword">if</span> config<span class="token punctuation">.</span>has_section<span class="token punctuation">(</span>section<span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Config file has section </span><span class="token interpolation"><span class="token punctuation">{</span>section<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
      <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Config file does not have section </span><span class="token interpolation"><span class="token punctuation">{</span>section<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Sections: [&#39;mysql&#39;, &#39;postgresql&#39;]
Config file has section mysql
Config file has section postgresql
Config file does not have section sqlite
</code></pre><h3 id="_1-3-python-configparser从字符串中读取数据" tabindex="-1"><a class="header-anchor" href="#_1-3-python-configparser从字符串中读取数据" aria-hidden="true">#</a> 1.3 Python ConfigParser从字符串中读取数据</h3><p>从Python 3.2开始，我们可以使用read_string()方法从字符串读取配置数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

<span class="token comment"># 字符串配置文件数据</span>
cfg_data <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;
[mysql]
host = localhost
user = user7
passwd = s$cret
db = ydb
&#39;&#39;&#39;</span>

config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
config<span class="token punctuation">.</span>read_string<span class="token punctuation">(</span>cfg_data<span class="token punctuation">)</span>

host <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">]</span>
user <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span>
passwd <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;passwd&#39;</span><span class="token punctuation">]</span>
db <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;db&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Host: </span><span class="token interpolation"><span class="token punctuation">{</span>host<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;User: </span><span class="token interpolation"><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Password: </span><span class="token interpolation"><span class="token punctuation">{</span>passwd<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Database: </span><span class="token interpolation"><span class="token punctuation">{</span>db<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Host: localhost
User: user7
Password: s$cret
Database: ydb
</code></pre><h3 id="_1-4-python-configparser从字典中读取数据" tabindex="-1"><a class="header-anchor" href="#_1-4-python-configparser从字典中读取数据" aria-hidden="true">#</a> 1.4 Python ConfigParser从字典中读取数据</h3><p>从Python 3.2开始，我们可以使用read_dict()方法从字典中读取配置数据。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

<span class="token comment"># 字典数据</span>
<span class="token comment"># 键是节名，值是带有该节中存在的键和值的字典。</span>
cfg_data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;mysql&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;user7&#39;</span><span class="token punctuation">,</span>
              <span class="token string">&#39;passwd&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;s$cret&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;db&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;ydb&#39;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
config<span class="token punctuation">.</span>read_dict<span class="token punctuation">(</span>cfg_data<span class="token punctuation">)</span>

host <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">]</span>
user <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span>
passwd <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;passwd&#39;</span><span class="token punctuation">]</span>
db <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;db&#39;</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Host: </span><span class="token interpolation"><span class="token punctuation">{</span>host<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;User: </span><span class="token interpolation"><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Password: </span><span class="token interpolation"><span class="token punctuation">{</span>passwd<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Database: </span><span class="token interpolation"><span class="token punctuation">{</span>db<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Host: localhost
User: user7
Password: s$cret
Database: ydb
</code></pre><h3 id="_1-5-python-configparser写入数据" tabindex="-1"><a class="header-anchor" href="#_1-5-python-configparser写入数据" aria-hidden="true">#</a> 1.5 Python ConfigParser写入数据</h3><p>可以通过write()方法写入配置数据。以下示例将配置数据写入db3.ini文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 通过add_section()函数添加键</span>
config<span class="token punctuation">.</span>add_section<span class="token punctuation">(</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">)</span>

config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;host&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;localhost&#39;</span>
config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;user7&#39;</span>
config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;passwd&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;s$cret&#39;</span>
config<span class="token punctuation">[</span><span class="token string">&#39;mysql&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;db&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;ydb&#39;</span>

<span class="token comment"># 写入数据</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;db3.ini&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> configfile<span class="token punctuation">:</span>
    config<span class="token punctuation">.</span>write<span class="token punctuation">(</span>configfile<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>db.ini中的内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysql]
host = localhost
user = user7
passwd = s$cret
db = ydb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-python-configparserj解释数据" tabindex="-1"><a class="header-anchor" href="#_1-6-python-configparserj解释数据" aria-hidden="true">#</a> 1.6 Python ConfigParserj解释数据</h3><p>ConfigParser允许在配置文件中解释数据。它使用%()语法。本示例用到cfg.ini如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[info]
users_dir= /home/ubuntu
name= Jano
home_dir= %(users_dir)s\\%(name)s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们用插值来构建home_dir。注意，“s”字符是语法的一部分。我们将解释数据</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> configparser

config <span class="token operator">=</span> configparser<span class="token punctuation">.</span>ConfigParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
config<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;cfg.ini&#39;</span><span class="token punctuation">)</span>

users_dir <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;info&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;users_dir&#39;</span><span class="token punctuation">]</span>
name <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;info&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span>
home_dir <span class="token operator">=</span> config<span class="token punctuation">[</span><span class="token string">&#39;info&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;home_dir&#39;</span><span class="token punctuation">]</span>

<span class="token comment"># 读取用户路径</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Users directory: </span><span class="token interpolation"><span class="token punctuation">{</span>users_dir<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 读取用户名</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Name: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
<span class="token comment"># 读取完整路径</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Home directory: </span><span class="token interpolation"><span class="token punctuation">{</span>home_dir<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Users directory: /home/ubuntu
Name: Jano
Home directory: /home/ubuntu/Jano
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,31),b={href:"http://zetcode.com/python/configparser/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://docs.python.org/3/library/configparser.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.cnblogs.com/plf-Jack/p/11170284.html",target:"_blank",rel:"noopener noreferrer"};function y(_,w){const a=e("ExternalLinkIcon");return o(),i("div",null,[r,u,d,k,v,n("p",null,[s("具体使用文档见： "),n("a",g,[s("https://docs.python.org/3/library/configparser.html"),t(a)])]),m,n("blockquote",null,[n("p",null,[n("a",b,[s("http://zetcode.com/python/configparser/"),t(a)])])]),n("blockquote",null,[n("p",null,[n("a",h,[s("https://docs.python.org/3/library/configparser.html"),t(a)])])]),n("blockquote",null,[n("p",null,[n("a",f,[s("https://www.cnblogs.com/plf-Jack/p/11170284.html"),t(a)])])])])}const x=p(l,[["render",y],["__file","2020-06-21-_编程基础_ Python配置文件读取库ConfigParser总结.html.vue"]]);export{x as default};
