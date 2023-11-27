import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as e,c as o,a as n,b as s,d as c,e as i}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"python-《python编程快速上手让繁琐工作自动化》学习笔记6",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-《python编程快速上手让繁琐工作自动化》学习笔记6","aria-hidden":"true"},"#"),s(" [python]《Python编程快速上手让繁琐工作自动化》学习笔记6")],-1),r={id:"_1-发送电子邮件和短信笔记-第16章-代码下载",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#_1-发送电子邮件和短信笔记-第16章-代码下载","aria-hidden":"true"},"#",-1),m={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Automate%20the%20Boring%20Stuff%20with%20Python",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="_1-1-发送电子邮件" tabindex="-1"><a class="header-anchor" href="#_1-1-发送电子邮件" aria-hidden="true">#</a> 1.1 发送电子邮件</h3><p>简单邮件传输协议（SMTP）是用于发送电子邮件的协议。SMTP 规定电子邮件应该如何格式化、加密、在邮件服务器之间传递，以及在你点击发送后，计算机要处理的所有其他细节。。但是，你并不需要知道这些技术细节，因为Python 的smtplib 模块将它们简化成几个函数。SMTP只负责向别人发送电子邮件。 SMTP发送邮件主要步骤如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> smtplib
<span class="token comment"># 连接到SMTP 服务器</span>
smtpObj <span class="token operator">=</span> smtplib<span class="token punctuation">.</span>SMTP<span class="token punctuation">(</span><span class="token string">&#39;smtp.example.com&#39;</span><span class="token punctuation">,</span> <span class="token number">587</span><span class="token punctuation">)</span>
<span class="token comment"># 向SMTP 电子邮件服务器“打招呼”</span>
smtpObj<span class="token punctuation">.</span>ehlo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">250</span><span class="token punctuation">,</span> b&#39;mx<span class="token punctuation">.</span>example<span class="token punctuation">.</span>com at your service<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">216.172</span><span class="token number">.148</span><span class="token number">.131</span><span class="token punctuation">]</span>\\nSIZE <span class="token number">35882577</span>\\
n8BITMIME\\nSTARTTLS\\nENHANCEDSTATUSCODES\\nCHUNKING&#39;<span class="token punctuation">)</span>
<span class="token comment"># 开始TLS 加密</span>
smtpObj<span class="token punctuation">.</span>starttls<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">220</span><span class="token punctuation">,</span> <span class="token string">b&#39;2.0.0 Ready to start TLS&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 登陆账号</span>
smtpObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token string">&#39;bob@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MY_SECRET_PASSWORD&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">235</span><span class="token punctuation">,</span> <span class="token string">b&#39;2.7.0 Accepted&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 发送邮件</span>
smtpObj<span class="token punctuation">.</span>sendmail<span class="token punctuation">(</span><span class="token string">&#39;bob@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;alice@example.com&#39;</span><span class="token punctuation">,</span> &#39;Subject<span class="token punctuation">:</span> So
<span class="token builtin">long</span><span class="token punctuation">.</span>\\nDear Alice<span class="token punctuation">,</span> so <span class="token builtin">long</span> <span class="token keyword">and</span> thanks <span class="token keyword">for</span> <span class="token builtin">all</span> the fish<span class="token punctuation">.</span> Sincerely<span class="token punctuation">,</span> Bob&#39;<span class="token punctuation">)</span>
<span class="token comment"># 断开连接</span>
smtpObj<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">221</span><span class="token punctuation">,</span> <span class="token string">b&#39;2.0.0 closing connection ko10sm23097611pbd.52 - gsmtp&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>函数</th><th>用途</th></tr></thead><tbody><tr><td>SMTP.connect(host=&#39;localhost&#39;,port=0)</td><td>链接 SMTP 服务器，host为SMTP 服务器常用域名，port为smtp端口</td></tr><tr><td>smtpObj.ehlo()</td><td>判断是否链接服务器成功</td></tr><tr><td>SMTP.login(user,password)</td><td>登陆需要认证的SMTP服务器，参数为用户名与密码</td></tr><tr><td>SMTP.sendmail(from_addr,to_addrs,msg,mail_options=[],rcpt_options=[])</td><td>发送邮件，from_addr为发件人，to_addrs为收件人，msg为邮件内容</td></tr><tr><td>SMTP.starttls(keyfile=None,certfile=None)</td><td>启用TLS安全传输模式</td></tr><tr><td>SMTP.quit()</td><td>断开smtp服务器链接</td></tr></tbody></table><p>提供商 SMTP 服务器常用域名见： https://blog.csdn.net/zdqdj1/article/details/48030023 用Content-Type类型见: https://www.cnblogs.com/keyi/p/5833388.html</p><p>在邮件主体中会常常包含 HTML、图像、声音以及附件格式等，MIME（Multipurpose Internet Mail Extensions，多用途互联网邮件扩展）作为一种新的扩展邮件格式很好地补充了这一点，更多MIME 知识见 https://docs.python.org/3/library/email.html。 Python 中常用的 MIME 实现类如下：</p><table><thead><tr><th>函数</th><th>用途</th></tr></thead><tbody><tr><td>email.mime.base.MIMEBase（_maintype，_subtype)</td><td>MIME特定类的基类，_maintpe是Content-Type主要类型，_subtype是Content-Type次要类型</td></tr><tr><td>email.mime.multipart.MIMEMultipart（_subtype=&#39;mixed&#39;)</td><td>生成包含多个部分的 MIME 对象，_subtype取值 mixed、related、alternative</td></tr><tr><td>email.mime.application.MIMEApplication(_ data, _ subtype=&#39;octet-stream&#39;, _ encoder=email.encoders.encode_base64</td><td>添加应用，_ encoderw为编码格式，可使用email.encoders模块查看内置编码表</td></tr><tr><td>email.mime.audio.MIMEAudio (_ audiodata, _ subtype=None, _ encoder)</td><td>创建音频数据，_audiodata原始二进制音频数据，_subtype音频类型，_encoder编码</td></tr><tr><td>email.mime.image.MIMEImage(_ imagedata, _ subtype=None, _ encoder)</td><td>创建图像数据</td></tr><tr><td>class email.mime.text.MIMEText(_ text, _ subtype=&#39;plain&#39;)</td><td>创建文本</td></tr></tbody></table><h3 id="_1-2-发送电子邮件具体实例" tabindex="-1"><a class="header-anchor" href="#_1-2-发送电子邮件具体实例" aria-hidden="true">#</a> 1.2 发送电子邮件具体实例</h3><h4 id="_1-2-1-基础邮件发送" tabindex="-1"><a class="header-anchor" href="#_1-2-1-基础邮件发送" aria-hidden="true">#</a> 1.2.1 基础邮件发送</h4><p>基础邮件发送类似上面邮件发送步骤，只不过添加getpass模块，设置输入用户名和输入密码为暗文，保证安全性。调用email.mime模块，设置正文。具体代码如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> smtplib
<span class="token comment"># 设置暗文</span>
<span class="token keyword">import</span> getpass
<span class="token comment"># 设置邮件内容</span>
<span class="token comment"># 具体见https://docs.python.org/3/library/email.mime.html</span>
<span class="token comment"># 创建文本</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>text <span class="token keyword">import</span> MIMEText
<span class="token comment"># 设置邮件编码格式</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>header <span class="token keyword">import</span> Header

<span class="token comment"># 连接到SMTP服务器</span>
<span class="token comment"># SMTP服务器名，服务端口是一个整数值，几乎总是587</span>
smtpObj <span class="token operator">=</span> smtplib<span class="token punctuation">.</span>SMTP<span class="token punctuation">(</span><span class="token string">&#39;smtp-mail.outlook.com&#39;</span><span class="token punctuation">,</span> <span class="token number">587</span><span class="token punctuation">)</span>

<span class="token comment"># starttls()让SMTP 连接处于TLS模式。返回值220告诉你，该服务器已准备就绪。</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>smtpObj<span class="token punctuation">.</span>starttls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 提示输入用户名</span>
username <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input username:&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 提示输入密码</span>
password <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input password:&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 收件人</span>
recievername <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;abc@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;123456@qq.com&#39;</span><span class="token punctuation">]</span>
<span class="token comment"># 返回值235表示认证成功</span>
loginStatus <span class="token operator">=</span> smtpObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loginStatus<span class="token punctuation">)</span>


<span class="token comment"># 设置内容，第二个参数表示文本</span>
msg <span class="token operator">=</span> MIMEText<span class="token punctuation">(</span><span class="token string">&#39;正文内容&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 设置标题</span>
msg<span class="token punctuation">[</span><span class="token string">&#39;Subject&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Header<span class="token punctuation">(</span><span class="token string">&#39;标题&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    smtpObj<span class="token punctuation">.</span>sendmail<span class="token punctuation">(</span>username<span class="token punctuation">,</span> recievername<span class="token punctuation">,</span> msg<span class="token punctuation">.</span>as_string<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;邮件发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error: 无法发送邮件&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 退出服务器</span>
smtpObj<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>结果如下所示： <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvZW1haWwvMTYuMS5qcGc" alt="基础邮件发送" loading="lazy"></p><h4 id="_1-2-2-发送html邮件" tabindex="-1"><a class="header-anchor" href="#_1-2-2-发送html邮件" aria-hidden="true">#</a> 1.2.2 发送HTML邮件</h4><p>如果我们要发送HTML邮件，而不是普通的纯文本文件怎么办？方法很简单，在构造MIMEText对象时，把HTML字符串传进去，再把第二个参数由plain变为html就可以了。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> smtplib
<span class="token comment"># 设置暗文</span>
<span class="token keyword">import</span> getpass
<span class="token comment"># 设置邮件编码格式</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>header <span class="token keyword">import</span> Header
<span class="token comment"># 设置邮件内容</span>
<span class="token comment"># 具体见https://docs.python.org/3/library/email.mime.html</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>text <span class="token keyword">import</span> MIMEText


<span class="token comment"># 连接到SMTP服务器</span>
<span class="token comment"># SMTP服务器名，服务端口是一个整数值，几乎总是587</span>
smtpObj <span class="token operator">=</span> smtplib<span class="token punctuation">.</span>SMTP<span class="token punctuation">(</span><span class="token string">&#39;smtp-mail.outlook.com&#39;</span><span class="token punctuation">,</span> <span class="token number">587</span><span class="token punctuation">)</span>

<span class="token comment"># starttls()让SMTP 连接处于TLS模式。返回值220告诉你，该服务器已准备就绪。</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>smtpObj<span class="token punctuation">.</span>starttls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 提示输入用户名</span>
username <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input username:&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 提示输入密码</span>
password <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input password:&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 收件人</span>
recievername <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;abc@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;123456@qq.com&#39;</span><span class="token punctuation">]</span>
<span class="token comment"># 返回值235表示认证成功</span>
loginStatus <span class="token operator">=</span> smtpObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loginStatus<span class="token punctuation">)</span>

mail_msg <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
&lt;p&gt;邮件正文&lt;/p&gt;
&lt;p&gt;&lt;a href=&quot;https://blog.csdn.net/LuohenYJ&quot;&gt;我的博客&lt;/a&gt;&lt;/p&gt;
&quot;&quot;&quot;</span>

<span class="token comment"># 设置内容 html格式</span>
msg <span class="token operator">=</span> MIMEText<span class="token punctuation">(</span>mail_msg<span class="token punctuation">,</span> <span class="token string">&#39;html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 设置标题</span>
msg<span class="token punctuation">[</span><span class="token string">&#39;Subject&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Header<span class="token punctuation">(</span><span class="token string">&#39;标题&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    smtpObj<span class="token punctuation">.</span>sendmail<span class="token punctuation">(</span>username<span class="token punctuation">,</span> recievername<span class="token punctuation">,</span> msg<span class="token punctuation">.</span>as_string<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;邮件发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error: 无法发送邮件&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 退出服务器</span>
smtpObj<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>结果如下所示： <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvZW1haWwvMTYuMi5qcGc" alt="基础邮件发送" loading="lazy"></p><h4 id="_1-2-3-添加图像发送邮件" tabindex="-1"><a class="header-anchor" href="#_1-2-3-添加图像发送邮件" aria-hidden="true">#</a> 1.2.3 添加图像发送邮件</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> smtplib
<span class="token comment"># 设置暗文</span>
<span class="token keyword">import</span> getpass

<span class="token comment"># 设置邮件编码格式</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>header <span class="token keyword">import</span> Header

<span class="token comment"># 多文件</span>
<span class="token comment"># 具体见 https://docs.python.org/3/library/email.mime.html</span>
<span class="token comment"># 详细说明见 https://blog.csdn.net/qdujunjie/article/details/8995334</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>multipart <span class="token keyword">import</span> MIMEMultipart
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>application <span class="token keyword">import</span> MIMEApplication
<span class="token comment"># 设置图像</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>image <span class="token keyword">import</span> MIMEImage
<span class="token comment"># 设置邮件内容</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>text <span class="token keyword">import</span> MIMEText
<span class="token keyword">import</span> os
<span class="token keyword">import</span> requests

<span class="token comment"># 连接到SMTP服务器</span>
<span class="token comment"># SMTP服务器名，服务端口是一个整数值，几乎总是587</span>
smtpObj <span class="token operator">=</span> smtplib<span class="token punctuation">.</span>SMTP<span class="token punctuation">(</span><span class="token string">&#39;smtp-mail.outlook.com&#39;</span><span class="token punctuation">,</span> <span class="token number">587</span><span class="token punctuation">)</span>

<span class="token comment"># starttls()让SMTP 连接处于TLS模式。返回值220告诉你，该服务器已准备就绪。</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>smtpObj<span class="token punctuation">.</span>starttls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 提示输入用户名</span>
username <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input username:&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 提示输入密码</span>
password <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input password:&quot;</span><span class="token punctuation">)</span>


<span class="token comment"># 收件人</span>
recievername <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;abc@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;123456@qq.com&#39;</span><span class="token punctuation">]</span>
<span class="token comment"># 返回值235表示认证成功</span>
loginStatus <span class="token operator">=</span> smtpObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loginStatus<span class="token punctuation">)</span>


<span class="token comment"># 邮件的 HTML 文本中一般邮件服务商添加外链是无效的，但不是绝对的</span>
<span class="token comment"># 添加图像方式如下：</span>


<span class="token comment"># 正文内容</span>
<span class="token comment"># cid表示content-id</span>
mail_msg <span class="token operator">=</span> <span class="token triple-quoted-string string">&quot;&quot;&quot;
&lt;p&gt;邮件正文&lt;/p&gt;
&lt;p&gt;&lt;a href=&quot;https://blog.csdn.net/LuohenYJ&quot;&gt;我的博客&lt;/a&gt;&lt;/p&gt;
&lt;p&gt;本地图片演示：&lt;/p&gt;
&lt;p&gt;&lt;img src=&quot;cid:imagelocal&quot;&gt;&lt;/p&gt;
&lt;p&gt;网络图片演示：&lt;/p&gt;
&lt;p&gt;&lt;img src=&quot;cid:imageurl&quot;&gt;&lt;/p&gt;
&quot;&quot;&quot;</span>
<span class="token comment"># 设置多内容</span>
msg <span class="token operator">=</span> MIMEMultipart<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 添加正文</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>MIMEText<span class="token punctuation">(</span>mail_msg<span class="token punctuation">,</span> <span class="token string">&#39;html&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 指定本文图片</span>
fp <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;test.jpg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span>
msgImageLocal <span class="token operator">=</span> MIMEImage<span class="token punctuation">(</span>fp<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
fp<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 定义图片ID，在 HTML 文本中引用，和前面html对应</span>
msgImageLocal<span class="token punctuation">.</span>add_header<span class="token punctuation">(</span><span class="token string">&#39;Content-ID&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&lt;imagelocal&gt;&#39;</span><span class="token punctuation">)</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>msgImageLocal<span class="token punctuation">)</span>


<span class="token comment"># 调用url,获取其内容图像</span>
url <span class="token operator">=</span> <span class="token string">&quot;https://img-blog.csdnimg.cn/20190308091244669.png&quot;</span>
page <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
picture <span class="token operator">=</span> page<span class="token punctuation">.</span>content

msgImageUrl <span class="token operator">=</span> MIMEImage<span class="token punctuation">(</span>picture<span class="token punctuation">)</span>
<span class="token comment"># 定义图片ID，在 HTML 文本中引用</span>
msgImageUrl<span class="token punctuation">.</span>add_header<span class="token punctuation">(</span><span class="token string">&#39;Content-ID&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&lt;imageurl&gt;&#39;</span><span class="token punctuation">)</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>msgImageUrl<span class="token punctuation">)</span>
<span class="token comment"># 发送邮件</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    smtpObj<span class="token punctuation">.</span>sendmail<span class="token punctuation">(</span>username<span class="token punctuation">,</span> recievername<span class="token punctuation">,</span> msg<span class="token punctuation">.</span>as_string<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;邮件发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error: 无法发送邮件&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 退出服务器</span>
smtpObj<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>结果如下所示： <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvZW1haWwvMTYuMy5qcGc" alt="基础邮件发送" loading="lazy"></p><h4 id="_1-2-4-添加附件发送邮件" tabindex="-1"><a class="header-anchor" href="#_1-2-4-添加附件发送邮件" aria-hidden="true">#</a> 1.2.4 添加附件发送邮件</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> smtplib
<span class="token comment"># 设置暗文</span>
<span class="token keyword">import</span> getpass

<span class="token comment"># 设置邮件编码格式</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>header <span class="token keyword">import</span> Header

<span class="token comment"># 多文件</span>
<span class="token comment"># 具体见 https://docs.python.org/3/library/email.mime.html</span>
<span class="token comment"># 详细说明见 https://blog.csdn.net/qdujunjie/article/details/8995334</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>multipart <span class="token keyword">import</span> MIMEMultipart
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>application <span class="token keyword">import</span> MIMEApplication
<span class="token comment"># 设置图像</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>image <span class="token keyword">import</span> MIMEImage
<span class="token comment"># 设置邮件内容</span>
<span class="token keyword">from</span> email<span class="token punctuation">.</span>mime<span class="token punctuation">.</span>text <span class="token keyword">import</span> MIMEText
<span class="token keyword">import</span> os


<span class="token comment"># 连接到SMTP服务器</span>
<span class="token comment"># SMTP服务器名，服务端口是一个整数值，几乎总是587</span>
smtpObj <span class="token operator">=</span> smtplib<span class="token punctuation">.</span>SMTP<span class="token punctuation">(</span><span class="token string">&#39;smtp-mail.outlook.com&#39;</span><span class="token punctuation">,</span> <span class="token number">587</span><span class="token punctuation">)</span>

<span class="token comment"># starttls()让SMTP 连接处于TLS模式。返回值220告诉你，该服务器已准备就绪。</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>smtpObj<span class="token punctuation">.</span>starttls<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 提示输入用户名</span>
username <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input username:&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 提示输入密码</span>
password <span class="token operator">=</span> getpass<span class="token punctuation">.</span>getpass<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">&quot;input password:&quot;</span><span class="token punctuation">)</span>


<span class="token comment"># 收件人</span>
recievername <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;abc@example.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;123456@qq.com&#39;</span><span class="token punctuation">]</span>
<span class="token comment"># 返回值235表示认证成功</span>
loginStatus <span class="token operator">=</span> smtpObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span>username<span class="token punctuation">,</span> password<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loginStatus<span class="token punctuation">)</span>


<span class="token comment"># 设置多内容</span>
msg <span class="token operator">=</span> MIMEMultipart<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment">#邮件正文内容</span>
<span class="token comment"># 第二个参数为文件子格式一般都是固定的</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>MIMEText<span class="token punctuation">(</span><span class="token string">&#39;正文&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;plain&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 标题</span>
msg<span class="token punctuation">[</span><span class="token string">&#39;Subject&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Header<span class="token punctuation">(</span><span class="token string">&#39;标题&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>


<span class="token comment"># 具体用哪种MIME文件格式看附件格式</span>
<span class="token comment"># 按照上面提供的链接确定函数内容</span>

<span class="token comment"># 构造附件Text，传送当前目录下的 test.txt 文件</span>
<span class="token comment"># 参数分别是文件路径，文件子类型，编码格式</span>
attText <span class="token operator">=</span> MIMEText<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;test.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;base64&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 设置http的Content-Type</span>
<span class="token comment"># 常用Content-Type类型见https://www.cnblogs.com/keyi/p/5833388.html</span>
<span class="token comment"># 如果Content-Type不知道就设置为application/octet-stream</span>
attText<span class="token punctuation">[</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;application/octet-stream&#39;</span>
<span class="token comment"># filename邮件中文件显示名字</span>
attText<span class="token punctuation">[</span><span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;attachment; filename=&quot;test.txt&quot;&#39;</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>attText<span class="token punctuation">)</span>

<span class="token comment"># 构造附件Image，传送当前目录下的test.jpg文件</span>
attImage <span class="token operator">=</span> MIMEImage<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;test.jpg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;jpg&#39;</span><span class="token punctuation">)</span>
attImage<span class="token punctuation">[</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;application/x-jpg&#39;</span>
<span class="token comment"># filename邮件中文件显示名字</span>
attImage<span class="token punctuation">[</span><span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;attachment; filename=&quot;test.jpg&quot;&#39;</span>
msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>attImage<span class="token punctuation">)</span>

<span class="token comment"># 构造附件Zip，传送当前目录下的test.zip文件</span>
<span class="token comment"># 防止文件不存在</span>
<span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token string">&#39;test.zip&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    attZip <span class="token operator">=</span> MIMEApplication<span class="token punctuation">(</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;test.zip&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    attZip<span class="token punctuation">[</span><span class="token string">&quot;Content-Type&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;application/zip&#39;</span>
    <span class="token comment"># filename邮件中文件显示名字</span>
    attZip<span class="token punctuation">[</span><span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;attachment; filename=&quot;test.zip&quot;&#39;</span>
    msg<span class="token punctuation">.</span>attach<span class="token punctuation">(</span>attZip<span class="token punctuation">)</span>


<span class="token comment"># 发送邮件</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    smtpObj<span class="token punctuation">.</span>sendmail<span class="token punctuation">(</span>username<span class="token punctuation">,</span> recievername<span class="token punctuation">,</span> msg<span class="token punctuation">.</span>as_string<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;邮件发送成功&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Error: 无法发送邮件&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 退出服务器</span>
smtpObj<span class="token punctuation">.</span>quit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>结果如下所示： <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRlZS5jb20vbHVtaW5pb3VzL2FydGljbGVfcGljdHVyZV93YXJlaG91c2UvcmF3L21hc3Rlci9QeXRob24tU3R1ZHktTm90ZXMvZW1haWwvMTYuNC5qcGc" alt="基础邮件发送" loading="lazy"></p><h2 id="_2-处理电子邮件" tabindex="-1"><a class="header-anchor" href="#_2-处理电子邮件" aria-hidden="true">#</a> 2. 处理电子邮件</h2><p>在Python 中，查找和获取电子邮件是一个多步骤的过程，需要第三方模块imapclient 和pyzmail。处理邮件主要步骤如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">import</span> imapclient
<span class="token comment"># 连接到IMAP 服务器</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> imapObj <span class="token operator">=</span> imapclient<span class="token punctuation">.</span>IMAPClient<span class="token punctuation">(</span><span class="token string">&#39;imap.gmail.com&#39;</span><span class="token punctuation">,</span> ssl<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment"># 输入账号密码</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> imapObj<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token string">&#39;my_email_address@gmail.com&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;MY_SECRET_PASSWORD&#39;</span><span class="token punctuation">)</span>
<span class="token string">&#39;my_email_address@gmail.com Jane Doe authenticated (Success)&#39;</span>
<span class="token comment"># 选择文件夹</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> imapObj<span class="token punctuation">.</span>select_folder<span class="token punctuation">(</span><span class="token string">&#39;INBOX&#39;</span><span class="token punctuation">,</span> readonly<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token comment"># 执行搜索</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> UIDs <span class="token operator">=</span> imapObj<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;SINCE&#39;</span>，<span class="token string">&#39;05-Jul-2014&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> UIDs0
<span class="token punctuation">[</span><span class="token number">40032</span><span class="token punctuation">,</span> <span class="token number">40033</span><span class="token punctuation">,</span> <span class="token number">40034</span><span class="token punctuation">,</span> <span class="token number">40035</span><span class="token punctuation">,</span> <span class="token number">40036</span><span class="token punctuation">,</span> <span class="token number">40037</span><span class="token punctuation">,</span> <span class="token number">40038</span><span class="token punctuation">,</span> <span class="token number">40039</span><span class="token punctuation">,</span> <span class="token number">40040</span><span class="token punctuation">,</span> <span class="token number">40041</span><span class="token punctuation">]</span>
<span class="token comment"># 取邮件</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> rawMessages <span class="token operator">=</span> imapObj<span class="token punctuation">.</span>fetch<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">40041</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;BODY[]&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;FLAGS&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">import</span> pyzmail
<span class="token comment"># 读邮件</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message <span class="token operator">=</span> pyzmail<span class="token punctuation">.</span>PyzMessage<span class="token punctuation">.</span>factory<span class="token punctuation">(</span>rawMessages<span class="token punctuation">[</span><span class="token number">40041</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;BODY[]&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>get_subject<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token string">&#39;Hello!&#39;</span>
<span class="token comment"># 获得邮件发送者</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>get_addresses<span class="token punctuation">(</span><span class="token string">&#39;from&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;Edward Snowden&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;esnowden@nsa.gov&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>get_addresses<span class="token punctuation">(</span><span class="token string">&#39;to&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">(</span>Jane Doe<span class="token string">&#39;, &#39;</span>jdoe@example<span class="token punctuation">.</span>com&#39;<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>get_addresses<span class="token punctuation">(</span><span class="token string">&#39;cc&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>get_addresses<span class="token punctuation">(</span><span class="token string">&#39;bcc&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>text_part <span class="token operator">!=</span> <span class="token boolean">None</span>
<span class="token boolean">True</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>text_part<span class="token punctuation">.</span>get_payload<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span>message<span class="token punctuation">.</span>text_part<span class="token punctuation">.</span>charset<span class="token punctuation">)</span>
<span class="token string">&#39;Follow the money.\\r\\n\\r\\n-Ed\\r\\n&#39;</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>html_part <span class="token operator">!=</span> <span class="token boolean">None</span>
<span class="token boolean">True</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> message<span class="token punctuation">.</span>html_part<span class="token punctuation">.</span>get_payload<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span>message<span class="token punctuation">.</span>html_part<span class="token punctuation">.</span>charset<span class="token punctuation">)</span>
&#39;<span class="token operator">&lt;</span>div <span class="token builtin">dir</span><span class="token operator">=</span><span class="token string">&quot;ltr&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>So <span class="token builtin">long</span><span class="token punctuation">,</span> <span class="token keyword">and</span> thanks <span class="token keyword">for</span> <span class="token builtin">all</span> the fish!<span class="token operator">&lt;</span>br<span class="token operator">&gt;</span><span class="token operator">&lt;</span>br<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token operator">-</span>
Al<span class="token operator">&lt;</span>br<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>\\r\\n&#39;
<span class="token comment"># 登出</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> imapObj<span class="token punctuation">.</span>logout<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于常用的时间模块具体。python设置时间主要time模块和datetime模块。通过import time和import datetime调用time模块和datetime模块。常用函数如下：</p><table><thead><tr><th>函数</th><th>用途</th><th>备注</th></tr></thead><tbody><tr><td>time.time()函数</td><td>返回自Unix纪元时(协调世界时UTC)的秒数</td><td>Unix 纪元时间：1970 年1 月1 日0 点，即协调世界时</td></tr><tr><td>time.sleep(n)</td><td>让程序暂停一下n秒</td><td>按Ctrl-C 不会中断time.sleep()调用</td></tr><tr><td>datetime.datetime.now()</td><td>返回当前的日期和时间</td><td>包含当前时刻的年、月、日、时、分、秒和微秒</td></tr><tr><td>datetime.datetime(2015, 10, 21, 16, 29, 0)</td><td>得到特定时刻的datetime 对象</td><td></td></tr><tr><td>datetime.datetime.fromtimestamp(time)</td><td>将Unix 纪元时间戳转换为datetime对象</td><td></td></tr><tr><td>delta = datetime.timedelta(days=11, hours=10, minutes=9, seconds=8)</td><td>创建timedelta 数据类型表示一段时间</td><td></td></tr><tr><td>delta.days/delta.seconds/delta.microseconds</td><td>获得timedelta对象拥有的总时间以天、秒、微秒来表示</td><td></td></tr><tr><td>delta.total_seconds()</td><td>返回只以秒表示的delta时间</td><td></td></tr><tr><td>strftime()</td><td>将datetime 对象转换为字符串</td><td></td></tr><tr><td>strptime()</td><td>将字符串转换成 datetime 对象</td><td></td></tr></tbody></table><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2><ul><li>https://docs.python.org/3/library/email.mime.html</li><li>https://www.runoob.com/python/python-email.html</li><li>https://www.cnblogs.com/zhangxinqi/p/9113859.html</li><li>https://www.liaoxuefeng.com/wiki/1016959663602400/1017790702398272</li><li>https://tools.ietf.org/html/rfc3501.html#section-6.4.4</li></ul>`,33);function v(b,g){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,n("h2",r,[d,s(" 1. 发送电子邮件和短信笔记（第16章）"),n("a",m,[s("(代码下载)"),c(a)])]),k])}const M=t(l,[["render",v],["__file","2019-07-31-_python_《Python编程快速上手让繁琐工作自动化》学习笔记6.html.vue"]]);export{M as default};
