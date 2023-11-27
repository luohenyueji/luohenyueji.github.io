import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as i,a as n,b as s,d as e,e as t}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"python-基于paramiko库操作远程服务器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-基于paramiko库操作远程服务器","aria-hidden":"true"},"#"),s(" [python] 基于paramiko库操作远程服务器")],-1),d={href:"https://zhuanlan.zhihu.com/p/235610836",target:"_blank",rel:"noopener noreferrer"},r=n("ul",null,[n("li",null,"通过ssh，scp和sftp完成远程操作"),n("li",null,"通过ssh-add，ssh-keysign，ssh-keyscan和ssh-keygen进行密钥管理"),n("li",null,"服务端由sshd，sftp-server和ssh-agent组成")],-1),k={href:"https://github.com/paramiko/paramiko",target:"_blank",rel:"noopener noreferrer"},m=t('<blockquote><p>pip install paramiko</p></blockquote><p>[toc]</p><h2 id="_1-paramiko使用" tabindex="-1"><a class="header-anchor" href="#_1-paramiko使用" aria-hidden="true">#</a> 1 Paramiko使用</h2><h3 id="_1-1-paramiko介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-paramiko介绍" aria-hidden="true">#</a> 1.1 Paramiko介绍</h3><p>Paramiko提供了实现SSHv2服务端和客户端的核心组件，本文主要介绍在linux下Paramiko客户端连接代码的使用，Paramiko客户端代码包括两个核心类：</p><ul><li>SSHClient实现了OpenSSH中ssh命令所包含的功能，用于远程连接服务器。</li><li>SFTPClient实现了OpenSSH中sftp命令所包含的功能，用于远程操作文件。</li></ul>',6),v={href:"https://www.jianshu.com/p/3adcce4e2661",target:"_blank",rel:"noopener noreferrer"},h=t(`<h3 id="_1-2-sshclient使用" tabindex="-1"><a class="header-anchor" href="#_1-2-sshclient使用" aria-hidden="true">#</a> 1.2 SSHClient使用</h3><h4 id="_1-2-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-1-接口介绍" aria-hidden="true">#</a> 1.2.1 接口介绍</h4><p>SSHClient提供以下常用方法：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 连接远程服务器</span>
<span class="token keyword">def</span> <span class="token function">connect</span><span class="token punctuation">(</span>
    self<span class="token punctuation">,</span>
    hostname<span class="token punctuation">,</span> <span class="token comment"># 远程服务器地址，必须</span>
    port<span class="token operator">=</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token comment"># 远程服务器端口</span>
    username<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 用户名</span>
    password<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 密码</span>
    pkey<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 用于身份验证的私钥</span>
    key_filename<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 私钥文件</span>
    timeout<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 超时时间/s</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 加载主机密钥</span>
<span class="token keyword">def</span> <span class="token function">load_system_host_keys</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> filename<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 在远程服务器上执行命令</span>
<span class="token comment"># 返回标准输入stdin,标准输出stdout和标准错误stderr</span>
<span class="token comment"># 每个exec_command都是单独作用的，先调用的命令不会影响后面命令的结果</span>
<span class="token keyword">def</span> <span class="token function">exec_command</span><span class="token punctuation">(</span>
    self<span class="token punctuation">,</span>
    command<span class="token punctuation">,</span> <span class="token comment"># 要执行的命令</span>
    timeout<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token comment"># 超时时间/s</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 关闭连接</span>
<span class="token keyword">def</span> <span class="token function">close</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 在当前ssh连接上，创建一个sftp会话</span>
<span class="token comment"># 返回SFTPClient对象</span>
<span class="token keyword">def</span> <span class="token function">open_sftp</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-应用实例" tabindex="-1"><a class="header-anchor" href="#_1-2-2-应用实例" aria-hidden="true">#</a> 1.2.2 应用实例</h4>`,9),b={href:"https://zhuanlan.zhihu.com/p/313718499",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> paramiko

<span class="token comment"># 服务器地址</span>
hostname <span class="token operator">=</span> <span class="token string">&#39;114.114.114.114&#39;</span>
port <span class="token operator">=</span> <span class="token number">22</span>

username <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span>
password <span class="token operator">=</span> <span class="token string">&#39;123456&#39;</span>
<span class="token comment"># 超时时间/s</span>
timeout <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment"># 每条cmd命令都是单独作用的</span>
<span class="token comment"># 进入data文件夹，并打印该目录下的文件信息</span>
cmd <span class="token operator">=</span> <span class="token string">&#39;cd data &amp;&amp; ls -l&#39;</span>

<span class="token comment"># 实例化SSHClient</span>
client <span class="token operator">=</span> paramiko<span class="token punctuation">.</span>SSHClient<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 加载系统主机密钥,需要在连接服务器前执行该命令</span>
client<span class="token punctuation">.</span>load_system_host_keys<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 连接服务器</span>
client<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>hostname<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> timeout<span class="token operator">=</span>timeout<span class="token punctuation">)</span>

<span class="token comment"># 执行命令获得结果</span>
<span class="token punctuation">(</span>stdin<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr<span class="token punctuation">)</span> <span class="token operator">=</span> client<span class="token punctuation">.</span>exec_command<span class="token punctuation">(</span>cmd<span class="token punctuation">)</span>

output <span class="token operator">=</span> stdout<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打印结果</span>
<span class="token keyword">for</span> line <span class="token keyword">in</span> output<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭连接</span>
client<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-sftpclient使用" tabindex="-1"><a class="header-anchor" href="#_1-3-sftpclient使用" aria-hidden="true">#</a> 1.3 SFTPClient使用</h3><h4 id="_1-3-1-接口介绍" tabindex="-1"><a class="header-anchor" href="#_1-3-1-接口介绍" aria-hidden="true">#</a> 1.3.1 接口介绍</h4><p>SFTPClient提供以下常用方法：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># --- 所有的命令都对应于linux命令</span>
<span class="token comment"># 关闭连接</span>
<span class="token keyword">def</span> <span class="token function">close</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span>
<span class="token comment"># 列出path路径下所有目录文件的名字，相当于执行ls</span>
<span class="token keyword">def</span> <span class="token function">listdir</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token operator">=</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 列出path路径下所有目录文件的信息，相当于执行ls -l</span>
<span class="token keyword">def</span> <span class="token function">listdir_attr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token operator">=</span><span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 以mode形式打开远程服务器上某个文件</span>
<span class="token keyword">def</span> <span class="token function">open</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> filename<span class="token punctuation">,</span> mode<span class="token operator">=</span><span class="token string">&quot;r&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 删除path文件，path只能是文件</span>
<span class="token keyword">def</span> <span class="token function">remove</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
<span class="token comment"># 将目录或文件从oldpath移动到newpath</span>
<span class="token keyword">def</span> <span class="token function">rename</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> oldpath<span class="token punctuation">,</span> newpath<span class="token punctuation">)</span>
<span class="token comment"># 创建path目录</span>
<span class="token keyword">def</span> <span class="token function">mkdir</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
<span class="token comment"># 删除空目录path</span>
<span class="token keyword">def</span> <span class="token function">rmdir</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
<span class="token comment"># 返回文件状态</span>
<span class="token keyword">def</span> <span class="token function">stat</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
<span class="token comment"># 创建符号连接</span>
<span class="token keyword">def</span> <span class="token function">symlink</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> source<span class="token punctuation">,</span> dest<span class="token punctuation">)</span>
<span class="token comment"># 修改文件或目录权限</span>
<span class="token keyword">def</span> <span class="token function">chmod</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">,</span> mode<span class="token punctuation">)</span>
<span class="token comment"># 修改文件拥有者</span>
<span class="token keyword">def</span> <span class="token function">chown</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">,</span> uid<span class="token punctuation">,</span> gid<span class="token punctuation">)</span>
<span class="token comment"># 将文件设置为指定大小，类似linux truncate命令</span>
<span class="token keyword">def</span> <span class="token function">truncate</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">,</span> size<span class="token punctuation">)</span>
<span class="token comment"># 返回path的完整路径</span>
<span class="token keyword">def</span> <span class="token function">normalize</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
<span class="token comment"># 将工作路径改为path，该命令会影响SFTPClient的其他命令</span>
<span class="token keyword">def</span> <span class="token function">chdir</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token comment"># 获得当前工作路径，如果没有调用过chdir函数，则返回None</span>
<span class="token keyword">def</span> <span class="token function">getcwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 将本地单个文件上传到服务器</span>
<span class="token keyword">def</span> <span class="token function">put</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> localpath<span class="token punctuation">,</span> remotepath<span class="token punctuation">)</span>
<span class="token comment"># 将服务器单个文件下载到本地</span>
<span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> remotepath<span class="token punctuation">,</span> localpath<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-2-应用实例" tabindex="-1"><a class="header-anchor" href="#_1-3-2-应用实例" aria-hidden="true">#</a> 1.3.2 应用实例</h4><p>下面例子展示了通过Paramiko连接远程主机，然后通过SFTPClient管理文件。在Paramiko中，SFTPClient不同于SSHClient，SFTPClient各条命令会互相作用。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> paramiko

<span class="token comment"># 服务器地址</span>
hostname <span class="token operator">=</span> <span class="token string">&#39;114.114.114.114&#39;</span>
port <span class="token operator">=</span> <span class="token number">22</span>

username <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span>
password <span class="token operator">=</span> <span class="token string">&#39;123456&#39;</span>
<span class="token comment"># 超时时间/s</span>
timeout <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment"># 使用with关键字就不需要主动close了</span>
<span class="token keyword">with</span> paramiko<span class="token punctuation">.</span>SSHClient<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> client<span class="token punctuation">:</span>
    
    client<span class="token punctuation">.</span>load_system_host_keys<span class="token punctuation">(</span><span class="token punctuation">)</span>
    client<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>hostname<span class="token punctuation">,</span> port<span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">,</span>timeout<span class="token operator">=</span>timeout<span class="token punctuation">)</span>
    <span class="token comment"># 打开sftp连接</span>
    sftp_client <span class="token operator">=</span> client<span class="token punctuation">.</span>open_sftp<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># 改变工作目录为&#39;data&#39;</span>
    sftp_client<span class="token punctuation">.</span>chdir<span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 查看data目录下所有文件</span>
    contents <span class="token operator">=</span> sftp_client<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">for</span> line <span class="token keyword">in</span> contents<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>
    <span class="token comment"># 获得get.py的实际路径</span>
    remote_path <span class="token operator">=</span> sftp_client<span class="token punctuation">.</span>normalize<span class="token punctuation">(</span><span class="token string">&#39;get.py&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 将remote_path下载到本地，并存为data.txt</span>
    output_file <span class="token operator">=</span> <span class="token string">&#39;data.txt&#39;</span>
    <span class="token comment"># get和put函数只能对单个文件操作，如果是目录，可以用循环的方式依次处理。</span>
    sftp_client<span class="token punctuation">.</span>get<span class="token punctuation">(</span>remote_path<span class="token punctuation">,</span> output_file<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考" aria-hidden="true">#</a> 2 参考</h2>`,9),_={href:"https://www.cnblogs.com/shoshana-kong/p/10985708.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/paramiko/paramiko",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.jianshu.com/p/3adcce4e2661",target:"_blank",rel:"noopener noreferrer"},S={href:"https://zhuanlan.zhihu.com/p/313718499",target:"_blank",rel:"noopener noreferrer"};function w(x,P){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[s("SSH（Secure Shell）是一种网络安全协议，能够使两台计算机安全地通信和共享数据。目前，SSH协议已在世界各地广泛使用，大多数设备都支持SSH功能。SSH的进一步说明见："),n("a",d,[s("深入了解SSH"),e(a)]),s("。SSH作为一种协议，存在多种实现，既有商业实现，也有开源实现。OpenSSH是一种流行的SSH协议开源实现，它提供了服务端后台程序和客户端工具，以在远程控制和文件传输期间加密数据。OpenSSH服务端程序一般开发者用不到，OpenSSH提供了以下工具：")]),r,n("p",null,[s("Paramiko是SSHv2协议的Python实现，我们可以在Python代码中直接使用SSH协议对远程服务器执行操作，而不是像OpenSSH通过ssh命令对远程服务器进行操作。Paramiko官方仓库见："),n("a",k,[s("paramiko"),e(a)]),s("。Paramiko支持Python2.7或者Python3.7版本及以上，安装命令如下：")]),m,n("p",null,[s("Paramiko没有提供scp命令的相关功能，scp和sftp功能类似，都是用于远程操作文件。不同的地方在于scp是轻量级的，scp传输速度通常比sftp快，但是sftp提供了断点续传功能。scp与sftp详细比较见："),n("a",v,[s("SCP or SFTP"),e(a)]),s("。")]),h,n("p",null,[s("下面例子展示了通过Paramiko在远程主机上执行命令。在Paramiko中，要注意的是SSHClient每条cmd命令是单独作用的，前一条cmd命令的执行不会影响后一条命令的结果。关于Paramiko私钥使用见"),n("a",b,[s("paramiko模块介绍及使用"),e(a)]),s("。")]),f,n("ul",null,[n("li",null,[n("a",_,[s("什么是SSH？"),e(a)])]),n("li",null,[n("a",y,[s("paramiko"),e(a)])]),n("li",null,[n("a",g,[s("SCP or SFTP"),e(a)])]),n("li",null,[n("a",S,[s("paramiko模块介绍及使用"),e(a)])])])])}const N=p(l,[["render",w],["__file","2023-01-01-_python_ 基于paramiko库操作远程服务器.html.vue"]]);export{N as default};
