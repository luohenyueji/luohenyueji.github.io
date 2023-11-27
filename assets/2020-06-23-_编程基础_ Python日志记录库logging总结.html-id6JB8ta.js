import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as p,a as n,b as a,d as e,e as t}from"./app-MsA2k2kn.js";const c={},u=t(`<h1 id="编程基础-python日志记录库logging总结" tabindex="-1"><a class="header-anchor" href="#编程基础-python日志记录库logging总结" aria-hidden="true">#</a> [编程基础] Python日志记录库logging总结</h1><p>Python日志记录教程展示了如何使用日志记录模块在Python中进行日志记录。</p><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1 介绍</h2><h3 id="_1-1-背景" tabindex="-1"><a class="header-anchor" href="#_1-1-背景" aria-hidden="true">#</a> 1.1 背景</h3><p>日志记录是将信息写入日志文件的过程。日志文件包含有关在操作系统，软件或通信中发生的各种事件的信息。完成记录是出于以下目的：</p><ul><li>信息收集</li><li>故障排除</li><li>产生统计资料</li><li>审计</li><li>剖析</li></ul><p>记录不仅限于识别软件开发中的错误。它还可用于检测安全事件，监视策略违规，在出现问题时提供信息，查找应用程序瓶颈或生成使用情况数据。应记录的事件包括输入验证失败，身份验证和授权失败，应用程序错误，配置更改以及应用程序启动和关闭。 但是不应记录的事件包括应用程序源代码，会话标识值，访问令牌，敏感的个人数据，密码，数据库连接字符串，加密密钥，银行帐户和持卡人数据。 综上所述，进行日志记录的一些最佳做法：</p><ul><li>日志记录应该有意义。</li><li>日志应包含上下文。</li><li>日志记录应在不同级别进行结构化和完成。</li><li>日志记录应该是平衡的；它不应该包含太少或太多的信息。</li><li>记录消息应该是人类可以理解的，并且可以被机器解析。</li><li>登录更复杂的应用程序应完成几个日志文件。</li><li>日志应适应开发和生产。</li></ul><h3 id="_1-2-python日志记录模块" tabindex="-1"><a class="header-anchor" href="#_1-2-python日志记录模块" aria-hidden="true">#</a> 1.2 Python日志记录模块</h3><p>Python日志模块定义了一些函数和类，这些函数和类为应用程序和库实现了一个灵活的事件日志系统。 日志记录模块具有四个主要组件：记录器（loggers），处理程序（handlers），过滤器（filters）和格式化程序（formatters）。记录器公开了应用程序代码直接使用的接口。处理程序将日志记录（由记录器创建）发送到适当的目的地。筛选器提供了更细粒度的功能，用于确定要输出的日志记录。格式化程序在最终输出中指定日志记录的布局。 Python日志记录级别主要有以下六个：</p><ul><li>CRITICAL 危急</li><li>ERROR 错误</li><li>WARNING 警告</li><li>INFO 信息</li><li>DEBUG 调试</li><li>NOTSET 无设置</li></ul><p>要注意日志等级是从上到下依次降低的，即：NOTEST&lt; DEBUG &lt; INFO &lt; WARNING &lt; ERROR &lt; CRITICAL，而日志的信息量是依次减少的； 如果日志记录级别设置为WARNING，所有的WARNING， ERROR以及CRITICAL消息被写入日志文件或控制台。如果它被设置为ERROR，只有ERROR和 CRITICAL消息被记录。</p><p>日志记录器具有有效等级的概念。如果未在记录器上显式设置级别，则将其父级别用作其有效级别。如果父级没有显式设置的级别，则检查其父级，依此类推-搜索所有祖先，直到找到显式设置的级别。使用getLogger()创建记录器时，级别设置为NOTSET。如果未使用set level()显式设置日志记录级别，则消息将传播到日志记录父级。在找到级别不是NOTSET的祖先或到达根记录器之前，将遍历日志记录器的祖先链。根记录器设置了默认警告级别。</p><h3 id="_1-3-根记录器" tabindex="-1"><a class="header-anchor" href="#_1-3-根记录器" aria-hidden="true">#</a> 1.3 根记录器</h3><p>所有记录器都是根记录器的后代。每个记录器将日志消息传递到其父级。使用该getLogger(name) 方法创建新的记录器。调用不带名称的函数（getLogger()）将返回root记录器。根记录器始终具有显式级别集，WARNING 默认情况下为该级别。 根记录器位于层次结构的顶部，并且始终存在，即使未配置。通常，程序或库不应直接针对根日志记录器进行日志记录。相反，应该为程序配置一个特定的记录器。根日志可以用来轻松地打开和关闭所有库中的所有日志。</p><h2 id="_2-python-logging模块使用教程" tabindex="-1"><a class="header-anchor" href="#_2-python-logging模块使用教程" aria-hidden="true">#</a> 2 Python logging模块使用教程</h2><p>python logging模块通常可以直接调用，无需安装</p><h3 id="_2-1-python-logging模块简单使用" tabindex="-1"><a class="header-anchor" href="#_2-1-python-logging模块简单使用" aria-hidden="true">#</a> 2.1 Python logging模块简单使用</h3><p>该logging模块具有简单的方法，无需任何配置即可立即使用。这可以用于简单的日志记录。以下示例调用该logging模块的五个方法。消息将写入控制台。请注意，使用了根记录器，并且只写入了三则消息。这是因为默认情况下，仅写入具有级别警告和更高级别的消息。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logging<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string">&#39;This is a debug message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;This is an info message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>warning<span class="token punctuation">(</span><span class="token string">&#39;This is a warning message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string">&#39;This is an error message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>critical<span class="token punctuation">(</span><span class="token string">&#39;This is a critical message&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message
</code></pre><h3 id="_2-2-python有效日志记录级别" tabindex="-1"><a class="header-anchor" href="#_2-2-python有效日志记录级别" aria-hidden="true">#</a> 2.2 Python有效日志记录级别</h3><p>日志记录级别是用set level()设置的。它将此记录器的阈值设置为lvl。将忽略严重程度低于lvl的日志消息。在下面示例中，我们将日志记录级别更改为DEBUG。</p><p>getLogger()返回具有指定名称的记录器。如果name为None，则返回根记录器。名称可以是定义日志层次结构的点分隔字符串；例如“a”、“a.b”或“a.b.c”。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

<span class="token comment"># getLogger()返回具有指定名称的记录器。如果name为None，则返回根记录器。</span>
logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 设置debug级别</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span>

logger<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string">&#39;This is a debug message&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;This is an info message&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>warning<span class="token punctuation">(</span><span class="token string">&#39;This is a warning message&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string">&#39;This is an error message&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>critical<span class="token punctuation">(</span><span class="token string">&#39;This is a critical message&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>DEBUG:dev:This is a debug message
INFO:dev:This is an info message
WARNING:dev:This is a warning message
ERROR:dev:This is an error message
CRITICAL:dev:This is a critical message
</code></pre><h3 id="_2-3-python有效日志记录级别" tabindex="-1"><a class="header-anchor" href="#_2-3-python有效日志记录级别" aria-hidden="true">#</a> 2.3 Python有效日志记录级别</h3><p>有效日志记录级别是显式设置的级别或由日志记录父级确定的级别。每一个日志级别都有与之对应的一个阈值,如果日志级别对应的阈值小于设定值，就不会显示出来。各级别阈值为：</p><ul><li>CRITICAL = 50</li><li>ERROR = 40</li><li>WARNING = 30</li><li>INFO = 20</li><li>DEBUG = 10</li><li>NOTSET = 0</li></ul><p>以下示例中，我们检查了两个记录器的有效记录级别。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging


main_logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 设定级别</span>
main_logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>ERROR<span class="token punctuation">)</span>

<span class="token comment"># 未设置dev_logger的级别；然后使用其父级的级别。</span>
dev_logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>main_logger<span class="token punctuation">.</span>getEffectiveLevel<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>dev_logger<span class="token punctuation">.</span>getEffectiveLevel<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>40
30
</code></pre><h3 id="_2-4-python记录处理程序" tabindex="-1"><a class="header-anchor" href="#_2-4-python记录处理程序" aria-hidden="true">#</a> 2.4 Python记录处理程序</h3><p>处理程序是一个对象，负责将适当的日志消息（基于日志消息的严重性）分派到处理程序的指定目标。处理程序像级别一样设定。如果记录器没有处理程序集，则其父记录器将搜索处理程序。</p><p>以下示例为记录器创建了两个处理程序：文件处理程序和控制台处理程序。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 文件处理</span>
<span class="token comment"># FileHandler将日志记录发送到test.log 文件。</span>
fileHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>FileHandler<span class="token punctuation">(</span><span class="token string">&#39;test.log&#39;</span><span class="token punctuation">)</span>
fileHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 控制台处理</span>
<span class="token comment"># StreamHandler将日志记录发送到流。如果未指定控制流，r则使用sys.stder。</span>
consoleHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>StreamHandler<span class="token punctuation">(</span><span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 将处理程序添加到记录器addHandler()。</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>fileHandler<span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>

<span class="token comment"># 打印数据，并且保存数据</span>
logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;information message&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>information message
INFO:dev:information message
</code></pre><p>注意上面的程序在添加到记录器必须移除处理程序（这是这个大坑），不然会重复输出，因为会把当前logger和其父节点所有数据输出，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 文件处理</span>
<span class="token comment"># FileHandler将日志记录发送到test.log 文件。</span>
fileHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>FileHandler<span class="token punctuation">(</span><span class="token string">&#39;test.log&#39;</span><span class="token punctuation">)</span>
fileHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 控制台处理</span>
<span class="token comment"># StreamHandler将日志记录发送到流。如果未指定控制流，r则使用sys.stder。</span>
consoleHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>StreamHandler<span class="token punctuation">(</span><span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 将处理程序添加到记录器addHandler()。</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>fileHandler<span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>

<span class="token comment"># 打印数据，并且保存数据</span>
logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;information message&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>information message
information message
INFO:dev:information message
</code></pre><p>解决办法在记录日志之后通过removeHandler移除处理函数</p>`,41),r={href:"https://www.cnblogs.com/telecomshy/p/10630888.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/huilan_same/article/details/51858817",target:"_blank",rel:"noopener noreferrer"},g=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 文件处理</span>
<span class="token comment"># FileHandler将日志记录发送到test.log 文件。</span>
fileHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>FileHandler<span class="token punctuation">(</span><span class="token string">&#39;test.log&#39;</span><span class="token punctuation">)</span>
fileHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 控制台处理</span>
<span class="token comment"># StreamHandler将日志记录发送到流。如果未指定控制流，r则使用sys.stder。</span>
consoleHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>StreamHandler<span class="token punctuation">(</span><span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 将处理程序添加到记录器addHandler()。</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>fileHandler<span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>

<span class="token comment"># 打印数据，并且保存数据</span>
logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;information message&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 移除处理函数</span>
logger<span class="token punctuation">.</span>removeHandler<span class="token punctuation">(</span>fileHandler<span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>removeHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>

<span class="token comment"># 关闭处理函数</span>
<span class="token comment"># 不然文件无法删除</span>
<span class="token comment"># 返回输出只有三个information message输出</span>
fileHandler<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
consoleHandler<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>information message
information message
information message
INFO:dev:information message
</code></pre><h3 id="_2-5-python记录格式化程序" tabindex="-1"><a class="header-anchor" href="#_2-5-python记录格式化程序" aria-hidden="true">#</a> 2.5 Python记录格式化程序</h3><p>格式化程序是配置日志记录的最终顺序、结构和内容的对象。除了消息字符串之外，日志记录还包括日期和时间、日志名称和日志级别的严重性。下面示例创建一个控制台记录器，并向其处理程序添加格式化程序。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;devs&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

consoleHandler <span class="token operator">=</span> logging<span class="token punctuation">.</span>StreamHandler<span class="token punctuation">(</span><span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

logger<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>

<span class="token comment"># 创建格式化程序。它包括日期时间，记录器名称，记录级别名称和记录消息。</span>
formatter <span class="token operator">=</span> logging<span class="token punctuation">.</span>Formatter<span class="token punctuation">(</span><span class="token string">&#39;%(asctime)s  %(name)s  %(levelname)s: %(message)s&#39;</span><span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>setFormatter<span class="token punctuation">(</span>formatter<span class="token punctuation">)</span>

logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;information message&#39;</span><span class="token punctuation">)</span>

logger<span class="token punctuation">.</span>removeHandler<span class="token punctuation">(</span>consoleHandler<span class="token punctuation">)</span>
consoleHandler<span class="token punctuation">.</span>close<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2020-06-23 22:57:06,591  devs  INFO: information message
INFO:devs:information message
</code></pre><h3 id="_2-6-python日志基本配置" tabindex="-1"><a class="header-anchor" href="#_2-6-python日志基本配置" aria-hidden="true">#</a> 2.6 Python日志基本配置</h3><p>basicConfig()配置根记录器。它通过使用默认格式化程序创建流处理程序来完成日志系统的基本配置。如果没有为根记录器定义处理程序，则debug()、info()、warning()、error()和critical()将自动调用basicConfig()。</p><p>以下示例使用basicConfig来配置根记录器。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

<span class="token comment"># filename保存日志，format格式化输出，level设定消息等级</span>
<span class="token comment"># 运行该程序后，我们在test.log文件中写入了五条消息 。</span>
logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>filename<span class="token operator">=</span><span class="token string">&#39;test.log&#39;</span><span class="token punctuation">,</span> <span class="token builtin">format</span><span class="token operator">=</span><span class="token string">&#39;%(filename)s: %(message)s&#39;</span><span class="token punctuation">,</span>
                    level<span class="token operator">=</span>logging<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span>

logging<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string">&#39;This is a debug message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;This is an info message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>warning<span class="token punctuation">(</span><span class="token string">&#39;This is a warning message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string">&#39;This is an error message&#39;</span><span class="token punctuation">)</span>
logging<span class="token punctuation">.</span>critical<span class="token punctuation">(</span><span class="token string">&#39;This is a critical message&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message
</code></pre><h3 id="_2-7-python日志记录文件配置" tabindex="-1"><a class="header-anchor" href="#_2-7-python日志记录文件配置" aria-hidden="true">#</a> 2.7 Python日志记录文件配置</h3><p>fileConfig()从configparser格式文件读取日志配置。本文在log.conf定义了一个记录器，处理程序和格式化。</p><p>log.conf文件内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[loggers]
keys=root,dev

[handlers]
keys=consoleHandler

[formatters]
keys=extend,simple

[logger_root]
level=INFO
handlers=consoleHandler

[logger_dev]
level=INFO
handlers=consoleHandler
qualname=dev
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=extend
args=(sys.stdout,)

[formatter_extend]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s

[formatter_simple]
format=%(asctime)s - %(message)s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下示例从log.conf中读取日志记录配置文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging
<span class="token keyword">import</span> logging<span class="token punctuation">.</span>config

logging<span class="token punctuation">.</span>config<span class="token punctuation">.</span>fileConfig<span class="token punctuation">(</span>fname<span class="token operator">=</span><span class="token string">&#39;log.conf&#39;</span><span class="token punctuation">)</span>

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;This is an information message&#39;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2020-06-23 22:57:06,617 - dev - INFO - This is an information message
</code></pre><h3 id="_2-8-python日志记录变量" tabindex="-1"><a class="header-anchor" href="#_2-8-python日志记录变量" aria-hidden="true">#</a> 2.8 Python日志记录变量</h3><p>通过使用字符串格式记录动态数据。以下示例将自定义数据写入日志消息。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

root <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token punctuation">)</span>
root<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

log_format <span class="token operator">=</span> <span class="token string">&#39;%(asctime)s %(filename)s: %(message)s&#39;</span>
logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>filename<span class="token operator">=</span><span class="token string">&quot;test.log&quot;</span><span class="token punctuation">,</span> <span class="token builtin">format</span><span class="token operator">=</span>log_format<span class="token punctuation">)</span>

<span class="token comment"># incident happens</span>
<span class="token comment"># 将自定义数据写入日志消息。</span>
error_message <span class="token operator">=</span> <span class="token string">&#39;authentication failed&#39;</span>

root<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;error: </span><span class="token interpolation"><span class="token punctuation">{</span>error_message<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2020-06-23 22:57:06,624 - root - ERROR - error: authentication failed
</code></pre><h3 id="_2-9-python日志记录格式日期时间" tabindex="-1"><a class="header-anchor" href="#_2-9-python日志记录格式日期时间" aria-hidden="true">#</a> 2.9 Python日志记录格式日期时间</h3><p>日期时间包含在带有asctime日志记录的日志消息中。使用datefmt配置选项，我们可以格式化datetime字符串。以下示例为格式化日志消息的日期时间。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token punctuation">)</span>
logger<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span>



log_format <span class="token operator">=</span> <span class="token string">&#39;%(asctime)s %(filename)s: %(message)s&#39;</span>
logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>filename<span class="token operator">=</span><span class="token string">&quot;test.log&quot;</span><span class="token punctuation">,</span> <span class="token builtin">format</span><span class="token operator">=</span>log_format<span class="token punctuation">,</span>
                    datefmt<span class="token operator">=</span><span class="token string">&#39;%Y-%m-%d %H:%M:%S&#39;</span><span class="token punctuation">)</span>

logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&quot;information message&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2020-06-23 22:57:06,631 - root - INFO - information message
</code></pre><h3 id="_2-10-python日志记录堆栈跟踪" tabindex="-1"><a class="header-anchor" href="#_2-10-python日志记录堆栈跟踪" aria-hidden="true">#</a> 2.10 Python日志记录堆栈跟踪</h3><p>堆栈跟踪是调用函数的堆栈，这些函数一直运行到引发异常时为止。堆栈跟踪包含在exc_info选项中。 以下示例中，我们记录了尝试访问不存在的列表索引时引发的异常。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging

log_format <span class="token operator">=</span> <span class="token string">&#39;%(asctime)s %(filename)s: %(message)s&#39;</span>
logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>filename<span class="token operator">=</span><span class="token string">&quot;test.log&quot;</span><span class="token punctuation">,</span> <span class="token builtin">format</span><span class="token operator">=</span>log_format<span class="token punctuation">)</span>

vals <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>vals<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token comment"># 通过将exc_info设置为True，堆栈跟踪将包含在日志中。</span>
    logging<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string">&quot;exception occurred&quot;</span><span class="token punctuation">,</span> exc_info<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>2020-06-23 22:57:06,638 - root - ERROR - exception occurred
Traceback (most recent call last):
  File &quot;&lt;ipython-input-12-ef7fe4bd5d82&gt;&quot;, line 9, in &lt;module&gt;
    print(vals[4])
IndexError: list index out of range
</code></pre><h3 id="_2-11-python记录getlogger" tabindex="-1"><a class="header-anchor" href="#_2-11-python记录getlogger" aria-hidden="true">#</a> 2.11 Python记录getLogger</h3><p>在getLogger()返回具有指定名称的记录器。如果未指定名称，则返回根记录器。通常的做法是将模块名称放在其中。</p><p>使用给定名称对此函数的所有调用都返回相同的记录器实例。这意味着记录器实例不需要在应用程序的不同部分之间传递（这一点很坑）。</p><p>以下示例使用getLogger()创建一个新的记录器。它有一个文件处理程序和一个格式化程序</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging
<span class="token keyword">import</span> sys

main <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span>
main<span class="token punctuation">.</span>setLevel<span class="token punctuation">(</span>logging<span class="token punctuation">.</span>DEBUG<span class="token punctuation">)</span>

<span class="token comment"># 消息将被写入 my.log文件</span>
handler <span class="token operator">=</span> logging<span class="token punctuation">.</span>FileHandler<span class="token punctuation">(</span><span class="token string">&#39;my.log&#39;</span><span class="token punctuation">)</span>

<span class="token builtin">format</span> <span class="token operator">=</span> logging<span class="token punctuation">.</span>Formatter<span class="token punctuation">(</span><span class="token string">&#39;%(asctime)s  %(name)s %(levelname)s: %(message)s&#39;</span><span class="token punctuation">)</span>
handler<span class="token punctuation">.</span>setFormatter<span class="token punctuation">(</span><span class="token builtin">format</span><span class="token punctuation">)</span>

main<span class="token punctuation">.</span>addHandler<span class="token punctuation">(</span>handler<span class="token punctuation">)</span>

main<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&#39;info message&#39;</span><span class="token punctuation">)</span>
main<span class="token punctuation">.</span>critical<span class="token punctuation">(</span><span class="token string">&#39;critical message&#39;</span><span class="token punctuation">)</span>
main<span class="token punctuation">.</span>debug<span class="token punctuation">(</span><span class="token string">&#39;debug message&#39;</span><span class="token punctuation">)</span>
main<span class="token punctuation">.</span>warning<span class="token punctuation">(</span><span class="token string">&#39;warning message&#39;</span><span class="token punctuation">)</span>
main<span class="token punctuation">.</span>error<span class="token punctuation">(</span><span class="token string">&#39;error message&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 清除数据</span>
main<span class="token punctuation">.</span>removeHandler<span class="token punctuation">(</span>handler<span class="token punctuation">)</span>
handler<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>my.log中内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2020-06-23 22:54:41,265  main    INFO: info message
2020-06-23 22:54:41,265  main    CRITICAL: critical message
2020-06-23 22:54:41,265  main    DEBUG: debug message
2020-06-23 22:54:41,265  main    WARNING: warning message
2020-06-23 22:54:41,265  main    ERROR: error message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,38),v={href:"http://zetcode.com/python/logging/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.cnblogs.com/telecomshy/p/10630888.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/huilan_same/article/details/51858817",target:"_blank",rel:"noopener noreferrer"};function b(h,f){const s=o("ExternalLinkIcon");return l(),p("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[a("https://www.cnblogs.com/telecomshy/p/10630888.html"),e(s)])])]),n("blockquote",null,[n("p",null,[n("a",d,[a("https://blog.csdn.net/huilan_same/article/details/51858817"),e(s)])])]),g,n("blockquote",null,[n("p",null,[n("a",v,[a("http://zetcode.com/python/logging/"),e(s)])])]),n("blockquote",null,[n("p",null,[n("a",m,[a("https://www.cnblogs.com/telecomshy/p/10630888.html"),e(s)])])]),n("blockquote",null,[n("p",null,[n("a",k,[a("https://blog.csdn.net/huilan_same/article/details/51858817"),e(s)])])])])}const H=i(c,[["render",b],["__file","2020-06-23-_编程基础_ Python日志记录库logging总结.html.vue"]]);export{H as default};
