import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as p,c as l,a as n,b as s,d as a,e as o}from"./app-MsA2k2kn.js";const c={},d=n("h1",{id:"常用工具-基于psutil和gputil获取系统状态信息",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#常用工具-基于psutil和gputil获取系统状态信息","aria-hidden":"true"},"#"),s(" [常用工具] 基于psutil和GPUtil获取系统状态信息")],-1),u=n("p",null,"本文主要介绍在Python3中利用psutil库获取系统状态，利用GPUtil获取gpu状态。",-1),r=n("p",null,"psutil (process and system utilities)（进程和系统实用程序）是一个跨平台库，用于在Python中检索有关运行进程和系统利用率（CPU、内存、磁盘、网络、传感器）的信息。它实现了经典UNIX命令行工具提供的许多功能，如ps、top、iotop、lsof、netstat、ifconfig、free等。psutil目前支持windows，linux，macOS等主流系统平台。本文主要介绍psutil中的常用函数。pstuil安装代码如下：",-1),m=n("blockquote",null,[n("p",null,"pip install psutil")],-1),v={href:"https://github.com/giampaolo/psutil",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"GPUtil是一个Python模块，用于使用nvidia smi从NVIDA GPU获取GPU状态。GPUtil定位计算机上的所有GPU，确定其可用性，并返回可用GPU的有序列表。GPUtil安装代码如下：",-1),k=n("blockquote",null,[n("p",null,"pip install gputil")],-1),g={href:"https://github.com/anderskm/gputil",target:"_blank",rel:"noopener noreferrer"},h=o(`<h2 id="_1-psutil的使用" tabindex="-1"><a class="header-anchor" href="#_1-psutil的使用" aria-hidden="true">#</a> 1 psutil的使用</h2><h3 id="_1-1-cpu状态" tabindex="-1"><a class="header-anchor" href="#_1-1-cpu状态" aria-hidden="true">#</a> 1.1 CPU状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 导入库</span>
<span class="token keyword">import</span> psutil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回系统CPU时间。每个属性代表CPU在给定模式下花费的秒数。属性可用性因平台而异。</span>
<span class="token comment"># percpu表示是否返回单个cpu的花费时间</span>
<span class="token comment"># 主要返回参数有：</span>
<span class="token comment"># user：正常进程在用户模式下执行所花费的时间；在 Linux 上，这还包括访客时间</span>
<span class="token comment"># system：在内核模式下执行的进程所花费的时间</span>
<span class="token comment"># idle:空闲的时间</span>
psutil<span class="token punctuation">.</span>cpu_times<span class="token punctuation">(</span>percpu<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>scputimes(user=7627895.98, nice=4419.62, system=1704625.93, idle=249261020.67, iowait=75386.74, irq=0.0, softirq=36410.5, steal=0.0, guest=0.0, guest_nice=0.0)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 以百分比返回用户、系统、空闲所使用的cpu时间</span>
psutil<span class="token punctuation">.</span>cpu_times_percent<span class="token punctuation">(</span>percpu<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>scputimes(user=0.2, nice=0.0, system=0.0, idle=99.8, iowait=0.0, irq=0.0, softirq=0.0, steal=0.0, guest=0.0, guest_nice=0.0)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回表示当前系统CPU利用率百分比的浮点值</span>
<span class="token comment"># interval=1比较1s内CPU利用率</span>
psutil<span class="token punctuation">.</span>cpu_percent<span class="token punctuation">(</span>interval<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0.5
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 当interval=None（默认为None）表示自上次调用或模块导入以来系统CPU利用率</span>
psutil<span class="token punctuation">.</span>cpu_percent<span class="token punctuation">(</span>interval<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>5.1
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 当percpu为True时，返回浮点列表，表示每个CPU的利用率百分比</span>
<span class="token comment"># psutil.cpu_percent(interval=1, percpu=True)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回逻辑cpu的数量（物理内核数乘以每个cpu内核上可以运行的线程数）</span>
psutil<span class="token punctuation">.</span>cpu_count<span class="token punctuation">(</span>logical<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>64
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回物理cpu的数量</span>
psutil<span class="token punctuation">.</span>cpu_count<span class="token punctuation">(</span>logical<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>16
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回CPU 频率，包括当前、最小和最大频率，以Mhz表示。</span>
psutil<span class="token punctuation">.</span>cpu_freq<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>scpufreq(current=2599.998000000001, min=0.0, max=0.0)
</code></pre><h3 id="_1-2-内存状态" tabindex="-1"><a class="header-anchor" href="#_1-2-内存状态" aria-hidden="true">#</a> 1.2 内存状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回有关系统内存使用情况的统计信息，以字节表示。主要返回参数有：</span>
<span class="token comment"># total: 内存总量</span>
<span class="token comment"># available：可用内存</span>
<span class="token comment"># used： 已用内存</span>
<span class="token comment"># free：完全没有使用的内存，在windows系统同等于available</span>
<span class="token comment"># percent：已用内存比例，计算方式为(total - available) / total * 100</span>
psutil<span class="token punctuation">.</span>virtual_memory<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>svmem(total=541061697536, available=530528514048, percent=1.9, used=7251107840, free=249252380672, active=28388438016, inactive=247208853504, buffers=7200718848, cached=277357490176, shared=56004608, slab=15238979584)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 打印内存使用比例</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>psutil<span class="token punctuation">.</span>virtual_memory<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>percent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1.9
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 通过数值计算指标</span>
mem <span class="token operator">=</span> psutil<span class="token punctuation">.</span>virtual_memory<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 已使用和可用的总和不一定等于总和，所以计算方式看自己选择。</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>mem<span class="token punctuation">.</span>used<span class="token operator">/</span>mem<span class="token punctuation">.</span>total<span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token comment"># 实际psutil计算方式</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token operator">-</span>mem<span class="token punctuation">.</span>available<span class="token operator">/</span>mem<span class="token punctuation">.</span>total<span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1.3401628452026104
1.94676199331208
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回系统交换内存统计信息</span>
psutil<span class="token punctuation">.</span>swap_memory<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>sswap(total=0, used=0, free=0, percent=0.0, sin=0, sout=0)
</code></pre><h3 id="_1-3-磁盘状态" tabindex="-1"><a class="header-anchor" href="#_1-3-磁盘状态" aria-hidden="true">#</a> 1.3 磁盘状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> <span class="token comment"># 返回磁盘分区情况</span>
 <span class="token comment"># psutil.disk_partitions() </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回包含给定路径的分区的磁盘使用率统计信息，以字节表示，主要返回参数有：</span>
<span class="token comment"># total：总空间</span>
<span class="token comment"># used：已用空间</span>
<span class="token comment"># free：可用空间</span>
<span class="token comment"># percent：使用率百分比，计算方式为used / total * 100</span>
psutil<span class="token punctuation">.</span>disk_usage<span class="token punctuation">(</span><span class="token string">&#39;./&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>sdiskusage(total=4363237892096, used=2180849664, free=4141137940480, percent=0.1)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回系统范围的磁盘输入/输出统计信息，主要返回参数有：</span>
<span class="token comment"># read_count: 读取次数</span>
<span class="token comment"># write_count: 写入次数</span>
<span class="token comment"># read_bytes: 读取的字节数</span>
<span class="token comment"># write_bytes: 写入的字节数</span>
psutil<span class="token punctuation">.</span>disk_io_counters<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>sdiskio(read_count=19240910, write_count=60524213, read_bytes=3411362631680, write_bytes=7641118547968, read_time=89751300, write_time=1571245636, read_merged_count=15, write_merged_count=44291429, busy_time=73232832)
</code></pre><h3 id="_1-4-网络状态" tabindex="-1"><a class="header-anchor" href="#_1-4-网络状态" aria-hidden="true">#</a> 1.4 网络状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回网络io统计信息，主要返回参数包括收发字节数、收发包数等。</span>
psutil<span class="token punctuation">.</span>net_io_counters<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>snetio(bytes_sent=6606245, bytes_recv=7806674, packets_sent=22430, packets_recv=32301, errin=0, errout=0, dropin=0, dropout=0)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回每个网卡接口的网络统计信息</span>
psutil<span class="token punctuation">.</span>net_io_counters<span class="token punctuation">(</span>pernic<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;lo&#39;: snetio(bytes_sent=2535762, bytes_recv=2535762, packets_sent=6513, packets_recv=6513, errin=0, errout=0, dropin=0, dropout=0),
 &#39;eth1&#39;: snetio(bytes_sent=740299, bytes_recv=1362457, packets_sent=9909, packets_recv=18518, errin=0, errout=0, dropin=0, dropout=0),
 &#39;eth0&#39;: snetio(bytes_sent=3339973, bytes_recv=3913748, packets_sent=6022, packets_recv=7282, errin=0, errout=0, dropin=0, dropout=0)}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回网络的连接信息</span>
<span class="token comment"># psutil.net_connections()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回网卡配置信息</span>
<span class="token comment"># psutil.net_if_addrs()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回网卡的具体信息</span>
psutil<span class="token punctuation">.</span>net_if_stats<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{&#39;lo&#39;: snicstats(isup=True, duplex=&lt;NicDuplex.NIC_DUPLEX_UNKNOWN: 0&gt;, speed=0, mtu=65536),
 &#39;eth1&#39;: snicstats(isup=True, duplex=&lt;NicDuplex.NIC_DUPLEX_FULL: 2&gt;, speed=10000, mtu=1500),
 &#39;eth0&#39;: snicstats(isup=True, duplex=&lt;NicDuplex.NIC_DUPLEX_UNKNOWN: 0&gt;, speed=65535, mtu=1500)}
</code></pre><h3 id="_1-5-传感器状态" tabindex="-1"><a class="header-anchor" href="#_1-5-传感器状态" aria-hidden="true">#</a> 1.5 传感器状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回硬件温度，如果没有温度传感器返回空值，有些系统和版本没有该函数</span>
psutil<span class="token punctuation">.</span>sensors_temperatures<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回硬件风扇速度，有些系统和版本没有该函数</span>
psutil<span class="token punctuation">.</span>sensors_fans<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>{}
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回电池信息，比如剩余电量</span>
psutil<span class="token punctuation">.</span>sensors_battery<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-进程状态" tabindex="-1"><a class="header-anchor" href="#_1-6-进程状态" aria-hidden="true">#</a> 1.6 进程状态</h3><p>进程状态的函数很多，具体可以看看psutil的官方仓库</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 正在运行进程的pid</span>
psutil<span class="token punctuation">.</span>pids<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1, 8, 9, 34, 70, 71, 91, 6873]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回当前进程信息</span>
<span class="token comment"># 返回值：进程pid，进程名，进程状态</span>
psutil<span class="token punctuation">.</span>Process<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>psutil.Process(pid=6873, name=&#39;python&#39;, status=&#39;running&#39;, started=&#39;19:21:01&#39;)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 查看pid为1的进程信息</span>
psutil<span class="token punctuation">.</span>Process<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>psutil.Process(pid=1, name=&#39;sh&#39;, status=&#39;sleeping&#39;, started=&#39;18:09:15&#39;)
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 进程是否存在</span>
psutil<span class="token punctuation">.</span>pid_exists<span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>False
</code></pre><h3 id="_1-7-其他状态" tabindex="-1"><a class="header-anchor" href="#_1-7-其他状态" aria-hidden="true">#</a> 1.7 其他状态</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回当前用户信息，包括用户名、登陆终端、host端口，登陆时间</span>
<span class="token comment"># psutil.users()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 返回系统启动时间，时间戳形式</span>
<span class="token comment"># psutil.boot_time()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-gputil的使用" tabindex="-1"><a class="header-anchor" href="#_2-gputil的使用" aria-hidden="true">#</a> 2 GPUtil的使用</h2><h3 id="_2-1-gpu的id获取" tabindex="-1"><a class="header-anchor" href="#_2-1-gpu的id获取" aria-hidden="true">#</a> 2.1 GPU的ID获取</h3><p><strong>获取可用GPU的ID列表</strong></p><blockquote><p>deviceIDs = GPUtil.getAvailable(order = &#39;first&#39;, limit = 1, maxLoad = 0.5, maxMemory = 0.5, includeNan=False, excludeID=[], excludeUUID=[])</p></blockquote><p>输入参数如下：</p><ul><li>order：确定返回可用GPU设备ID的顺序，可输入参数：first（升序排列），last（降序排列），random（随机选取），load（按负载递增），memory（按显存使用量递增）</li><li>limit：将返回的GPU设备数量限制为指定数量</li><li>maxLoad：负载率大于maxLoad的不会被返回</li><li>maxMemory：显存使用率大于maxMemory的不会被返回</li><li>includeNan：是否包括负载或内存使用为Nan的GPU</li><li>excludeID：不用于排序的GPU的id</li><li>excludeUUID：不用排序的GPU的uuid</li></ul><p>返回参数如下：</p><ul><li>deviceIDs: 所有可用GPU设备ID的列表，id号从0开始。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 导入库</span>
<span class="token keyword">import</span> GPUtil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获取一个可用gpu的id</span>
deviceIDs <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getAvailable<span class="token punctuation">(</span><span class="token punctuation">)</span>
deviceIDs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[0]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获取最后一个可用gpu的id</span>
deviceIDs <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getAvailable<span class="token punctuation">(</span>order <span class="token operator">=</span> <span class="token string">&#39;last&#39;</span><span class="token punctuation">)</span>
deviceIDs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[3]
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 随机获取4个可用gpu的id</span>
deviceIDs <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getAvailable<span class="token punctuation">(</span>order <span class="token operator">=</span> <span class="token string">&#39;random&#39;</span><span class="token punctuation">,</span> limit<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">)</span>
deviceIDs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[0, 3, 1, 2]
</code></pre><p><strong>获取第一个可用的GPU的id</strong></p><blockquote><p>deviceID = GPUtil.getFirstAvailable(order = &#39;first&#39;, maxLoad=0.5, maxMemory=0.5, attempts=1, interval=900, verbose=False)</p></blockquote><p>输入参数和GPUtil.getAvailable差不多，其他参数如下：</p><ul><li>attempts：在放弃寻找可用GPU之前，函数应进行的尝试次数</li><li>interval：查找gpu的间隔</li><li>verbose：是否显示详细信息</li></ul><p>返回参数如下：</p><ul><li>deviceID: 一个可用GPU设备ID的列表</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 随机获取1个可用gpu的id</span>
deviceID <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getFirstAvailable<span class="token punctuation">(</span>order <span class="token operator">=</span> <span class="token string">&#39;random&#39;</span><span class="token punctuation">)</span>
deviceID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1]
</code></pre><p><strong>打印所有GPU的当前状态</strong></p><blockquote><p>GPUtil.showUtilization(all=False, attrList=None, useOldCode=False)</p></blockquote><p>输入参数如下：</p><ul><li>all：显示GPU所有信息，如果否只显示GPU利用率和GPU显存使用率</li><li>interval：要显示的属性列表列表，这个要看代码</li><li>useOldCode：是否应使用显示GPU利用率的旧代码</li></ul><p>该函数在命令行界面输出结果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 命令行打印结果</span>
GPUtil<span class="token punctuation">.</span>showUtilization<span class="token punctuation">(</span><span class="token builtin">all</span><span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> attrList<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> useOldCode<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>| ID | GPU | MEM |
------------------
|  0 |  0% |  0% |
|  1 |  0% |  0% |
|  2 |  0% |  0% |
|  3 |  0% |  0% |
</code></pre><h3 id="_2-2-gpu信息读取" tabindex="-1"><a class="header-anchor" href="#_2-2-gpu信息读取" aria-hidden="true">#</a> 2.2 GPU信息读取</h3><p><strong>获取所有GPU对象的列表</strong></p><blockquote><p>GPUs = GPUtil.getGPUs()</p></blockquote><p>返回参数如下：</p><ul><li>所用可用GPU列表</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> GPUtil
<span class="token comment"># 获取所有可用GPU列表，id号从0开始</span>
GPUs <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getGPUs<span class="token punctuation">(</span><span class="token punctuation">)</span>
GPUs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[&lt;GPUtil.GPUtil.GPU at 0x7fd3142f08d0&gt;,
 &lt;GPUtil.GPUtil.GPU at 0x7fd3142ec390&gt;,
 &lt;GPUtil.GPUtil.GPU at 0x7fd3142f0f90&gt;,
 &lt;GPUtil.GPUtil.GPU at 0x7fd3142ecfd0&gt;]
</code></pre><p><strong>筛选可用GPU</strong></p><blockquote><p>GPUavailability = GPUtil.getAvailability(GPUs, maxLoad = 0.5, maxMemory = 0.5, includeNan=False, excludeID=[], excludeUUID=[])</p></blockquote><ul><li>输入参数：GPUs为GPU对象列表，其他参数与GPUtil.getAvailable一样</li><li>返回参数：返回一个与GPUs大小相等的1和0列表，指示哪些对应的GPU可用，1表示可用，0表示不可用</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>GPUavailability <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getAvailability<span class="token punctuation">(</span>GPUs<span class="token punctuation">)</span>
GPUavailability
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>[1, 1, 1, 1]
</code></pre><p><strong>GPU属性获取</strong></p><p>返回单个GPU的属性，GPU属性的描述来自于nvidia-smi命令。这些属性分别为：</p><ul><li>id：gpu的id</li><li>uuid：gpu的uuid，全球唯一</li><li>load：gpu的负载率，100%表示满载</li><li>memoryUtil：gpu的显存使用率，100%表示全部使用</li><li>memoryTotal：gpu的总显存</li><li>memoryUsed：gpu已使用显存</li><li>memoryFree：gpu可用显存</li><li>driver：gpu的驱动版本</li><li>name：gpu的正式产品名称</li><li>serial：gpu的序列号，全球唯一</li><li>display_mode：物理显示器是否连接到GPU</li><li>display_active：显示器是否活跃</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获取所有可用GPU列表，id号从0开始</span>
GPUs <span class="token operator">=</span> GPUtil<span class="token punctuation">.</span>getGPUs<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第0个gpu的id</span>
GPUs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token builtin">id</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第0个gpu的负载率</span>
GPUs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>load
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>0.0
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第1个gpu的显存</span>
GPUs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>memoryTotal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>32510.0
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第1个gpu的驱动版本</span>
GPUs<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;460.32.03&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第2个gpu的产品名称</span>
GPUs<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">.</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Tesla V100-SXM2-32GB&#39;
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 最后一个gpu是否连接物理显示器</span>
GPUs<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>display_mode
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&#39;Enabled&#39;
</code></pre><h2 id="_3-参考" tabindex="-1"><a class="header-anchor" href="#_3-参考" aria-hidden="true">#</a> 3 参考</h2>`,120),y={href:"https://github.com/giampaolo/psutil",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/anderskm/gputil",target:"_blank",rel:"noopener noreferrer"};function U(P,x){const e=i("ExternalLinkIcon");return p(),l("div",null,[d,u,r,m,n("p",null,[s("psutil官方仓库见"),n("a",v,[s("psutil"),a(e)]),s("。")]),b,k,n("p",null,[s("GPUtil官方仓库见"),n("a",g,[s("gputil"),a(e)]),s("。")]),h,n("ul",null,[n("li",null,[n("a",y,[s("psutil"),a(e)])]),n("li",null,[n("a",_,[s("gputil"),a(e)])])])])}const D=t(c,[["render",U],["__file","2022-07-18-_常用工具_ 基于psutil和GPUtil获取系统状态信息.html.vue"]]);export{D as default};
