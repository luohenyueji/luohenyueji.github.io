import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c,a as n,b as s,d as t,e as p}from"./app-MsA2k2kn.js";const l={},u=n("h1",{id:"语音识别-基于python构建简易的音频录制与语音识别应用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#语音识别-基于python构建简易的音频录制与语音识别应用","aria-hidden":"true"},"#"),s(" [语音识别] 基于Python构建简易的音频录制与语音识别应用")],-1),d=n("p",null,"语音识别技术的快速发展为实现更多智能化应用提供了无限可能。本文旨在介绍一个基于Python实现的简易音频录制与语音识别应用。文章简要介绍相关技术的应用，重点放在音频录制方面，而语音识别则关注于调用相关的语音识别库。本文将首先概述一些音频基础概念，然后详细讲解如何利用PyAudio库和SpeechRecognition库实现音频录制功能。最后，构建一个简单的语音识别示例应用，该应用程序可以实时监听音频的开始和结束，并将录制的音频数据传输至Whisper语音识别库进行语音识别，最终将识别结果输出到基于PyQt5搭建的简易页面中。",-1),r={href:"https://github.com/luohenyueji/Python-Study-Notes/tree/master/Deep%20learning/NLP/%5B%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB%5D%20%E5%9F%BA%E4%BA%8EPython%E6%9E%84%E5%BB%BA%E7%AE%80%E6%98%93%E7%9A%84%E9%9F%B3%E9%A2%91%E5%BD%95%E5%88%B6%E4%B8%8E%E8%AF%AD%E9%9F%B3%E8%AF%86%E5%88%AB%E5%BA%94%E7%94%A8",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"[toc]",-1),v=n("h2",{id:"_0-音频基础概念",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_0-音频基础概念","aria-hidden":"true"},"#"),s(" 0 音频基础概念")],-1),m={href:"https://zhuanlan.zhihu.com/p/212318683",target:"_blank",rel:"noopener noreferrer"},b=p(`<p><strong>采样频率</strong></p><p>音频信号通常是连续的模拟波形，为了存储它们，需要将其离散化。这通过采样来实现，即在固定时间间隔内测量声音信号的幅度。采样的过程就是抽取模拟信号各点的频率值。采样率越高即1秒内抽取的数据点越多，音频音质就越好，但同时也增加了存储和处理成本。奈奎斯特-香农（Nyquist–Shannon）采样定理强调采样频率必须高于信号最大频率的两倍，以确保从采样值中完全恢复原始模拟信号。在音频信号采样领域，常使用两个主要的采样频率：16kHz和44.1kHz。 举例来说，16kHz表示每秒采样16000次，而人类言语声音频率范围在200Hz到8kHz，16kHz的采样频率已足够捕捉人类语音频率特征，同时减轻了音频数据存储和处理的负担。因此常用语音采样频率为16kHz。人耳可感知20Hz到20kHz的声音，为了呈现高质量音频，通常选择44.1kHz采样频率以覆盖人耳可听声音的上限。</p><p><strong>采样位数和声道</strong></p><p>采样后的信号是连续的模拟值，为了将其转换为数字形式，需要对信号进行量化。量化是将连续的模拟值映射到离散的数字值，通常使用固定采样位数（例如16位或24位）来表示样本的幅度范围。例如，使用16位（16bit），也就是双字节的二进制信号表示音频采样，而16位的取值范围为-32768到32767，共有65536个可能的取值。因此，最终模拟的音频信号在幅度上被分成了65536个数值等级。较高的采样位数能够表示更大的声音幅度范围，并保留更多的细节信息。常用的位深度包括8位、16位和24位，其中8位是最低要求，16位可以满足一般应用的需求，而24位则适用于专业音频工作。</p><p>声道是指音频信号在播放系统或录音系统中的传输通道。一个声道通常对应于一个单独的音频信号源或信号流，并负责传输该信号到扬声器或录音设备。在立体声系统中，通常有两个声道，分别是左声道和右声道，用来分别处理来自音频源的左右声音信号，以实现空间立体声效果。声道的概念也可扩展到多声道系统，如5.1声道、7.1声道等，它们可以支持更多的音频源和更丰富的音效体验，比如环绕音效。</p><p><strong>常用音频编码格式</strong></p><p>PCM编码所获得的音频数据是最为原始的，为了进行存储和网络传输需要对其进行二次编码。这些二次音频编码格式都是在PCM编码基础上再次编码和压缩的，按照压缩方式又分为无损压缩和有损压缩。无损压缩是指相对于PCM编码完整地保留音频数据的音质。然而，无损压缩的音频文件通常比有损压缩的音频文件稍大。有损压缩在编码过程中，为了减小文件大小，牺牲了部分音频数据的信息和音质。</p><p>无损压缩常见的音频编码格式有：WAV/WAEV（Waveform Audio File Format），FLAC（Free Lossless Audio Codec），AIFF（Audio Interchange File Format）等。有损压缩常见的音频编码格式有：MP3（MPEG Audio Layer III），AAC（Advanced Audio Coding），WMA（Windows Media Audio）等。</p><p>在获得编码后的音频数据后，需要使用合适的文件格式来保存编码数据。一种音频编码可能对应一种文件格式，也可能对应多种文件格式，一般情况下是一种。例如WAV编码数据对应于.wav文件格式，MP3编码数据对应于.mp3文件格式。PCM编码数据对应于.raw或者.pcm文件格式，AAC编码数据对应于.acc或者.mp4文件格式等。</p><p><strong>音频与视频概念对比</strong></p><table><thead><tr><th>概念</th><th>音频</th><th>视频</th></tr></thead><tbody><tr><td>维度</td><td>通过声波传递的声音信息，是一维的</td><td>通过图像序列传递的运动图像信息，是二维的</td></tr><tr><td>核心特征</td><td>包括音调、音量、节奏等，由频率和振幅表现</td><td>包括画面内容、颜色等，由像素和色彩表现</td></tr><tr><td>信号频率</td><td>以采样率表示,人类对声音的感知更为敏锐，因而音频采样率远远大于视频帧率</td><td>以帧率表示，视频是通过多张静止图像以一定的速度播放来模拟流畅的动画</td></tr><tr><td>采样精度</td><td>用于表示声音的幅度值，常见16bit</td><td>用于表示图像的颜色和亮度值，常见为8bit（256色）</td></tr><tr><td>处理技术</td><td>均衡、压缩、降噪等</td><td>剪辑、特效、编解码等</td></tr><tr><td>通道</td><td>以声道表示，如单声道和双声道</td><td>以颜色通道表示，如GRAY、RGB、RGBA</td></tr><tr><td>存储</td><td>便于传输和存储，占用的空间较小</td><td>需要更大的存储空间和带宽来传输和保存</td></tr></tbody></table><p>下面的代码展示了读取音频内容为123456789的wav文件并绘制出音频数据的波形图。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 导入用于绘图的matplotlib库</span>
<span class="token keyword">from</span> matplotlib <span class="token keyword">import</span> pyplot <span class="token keyword">as</span> plt
<span class="token comment">## 导入用于读取音频文件的soundfile库</span>
<span class="token comment">## pip install soundfile</span>
<span class="token keyword">import</span> soundfile <span class="token keyword">as</span> sf

<span class="token comment">## 从demo.wav文件中读取音频数据和采样率,data为numpy数组</span>
data<span class="token punctuation">,</span> samplerate <span class="token operator">=</span> sf<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">&#39;asr_example_hotword.wav&#39;</span><span class="token punctuation">,</span> dtype<span class="token operator">=</span><span class="token string">&#39;float32&#39;</span><span class="token punctuation">)</span>

<span class="token comment">## 保存音频</span>
sf<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;output.wav&quot;</span><span class="token punctuation">,</span> data<span class="token operator">=</span>data<span class="token punctuation">,</span> samplerate<span class="token operator">=</span>samplerate<span class="token punctuation">)</span>

<span class="token comment">## 打印音频数据的形状和打印采样率</span>
<span class="token comment">## data为一个numpy数组，samplerate为一个整数</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;data shape: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>shape<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;sample rate: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>samplerate<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 绘制音频波形</span>
plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果如下，其中表示音频数据的样本点索引，即音频的时间轴。每个样本点都对应音频数据的每一帧，从左到右依次递增。纵轴表示音频信号在每个时间点的归一化后的音频强度。所读取的数据以float32表示格式，数值采样值范围为-32678~32678，soundfile库会除以32678(2^16/2)，以归一化到[-1, 1]区间内。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[语音识别] 基于Python构建简易的音频录制与语音识别应用/image/img1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_1-pyaudio" tabindex="-1"><a class="header-anchor" href="#_1-pyaudio" aria-hidden="true">#</a> 1 PyAudio</h2><h3 id="_1-1-pyaudio介绍与安装" tabindex="-1"><a class="header-anchor" href="#_1-1-pyaudio介绍与安装" aria-hidden="true">#</a> 1.1 PyAudio介绍与安装</h3>`,17),h={href:"http://portaudio.com/docs/v19-doxydocs/index.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://people.csail.mit.edu/hubert/pyaudio/",target:"_blank",rel:"noopener noreferrer"},_=p(`<p>Windows下PyAudio安装命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python -m pip install pyaudio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Linux下PyAudio按照命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo apt-get install python3-pyaudio
python -m pip install pyaudio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>本文所用PyAudio版本为0.2.13。</p><h3 id="_1-2-音频录制与播放" tabindex="-1"><a class="header-anchor" href="#_1-2-音频录制与播放" aria-hidden="true">#</a> 1.2 音频录制与播放</h3><h4 id="_1-2-1-音频播放" tabindex="-1"><a class="header-anchor" href="#_1-2-1-音频播放" aria-hidden="true">#</a> 1.2.1 音频播放</h4><p>以下代码展示了基于PyAudio播放本地音频文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## wave为python处理音频标准库</span>
<span class="token keyword">import</span> wave
<span class="token keyword">import</span> pyaudio

<span class="token comment">## 定义每次从音频文件中读取的音频采样数据点的数量</span>
CHUNK <span class="token operator">=</span> <span class="token number">1024</span>

filepath <span class="token operator">=</span> <span class="token string">&quot;demo.wav&quot;</span>
<span class="token comment">## 以音频二进制流形式打开音频文件</span>
<span class="token keyword">with</span> wave<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> wf<span class="token punctuation">:</span>
    <span class="token comment">## 实例化PyAudio并初始化PortAudio系统资源</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 打开音频流</span>
    <span class="token comment">## format: 指定音频流的采样格式。其中wf.getsampwidth()用于获取音频文件的采样位数（sample width）。</span>
    <span class="token comment">## 采样位数指的是每个采样点占用的字节数。通常情况下，采样位数可以是1字节（8位）、2字节（16位）等。</span>
    <span class="token comment">## channels：指定音频流的声道数。声道数可以是单声道（1）或立体声（2）</span>
    <span class="token comment">## rate：指定音频流的采样率。采样率表示每秒钟音频采样的次数，常见的采样率有44100Hz或16000Hz</span>
    <span class="token comment">## output：是否播放音频</span>
    stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>p<span class="token punctuation">.</span>get_format_from_width<span class="token punctuation">(</span>wf<span class="token punctuation">.</span>getsampwidth<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    channels<span class="token operator">=</span>wf<span class="token punctuation">.</span>getnchannels<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    rate<span class="token operator">=</span>wf<span class="token punctuation">.</span>getframerate<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token comment">## 从音频文件播放样本数据</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token comment">## data为二进制数据</span>
        data <span class="token operator">=</span> wf<span class="token punctuation">.</span>readframes<span class="token punctuation">(</span>CHUNK<span class="token punctuation">)</span>
        <span class="token comment">## len(data)表示读取数据的长度</span>
        <span class="token comment">## 在此len(data)应该等于采样点占用的字节数wf.getsampwidth()乘以CHUNK</span>
        <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">:</span>
            stream<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">break</span>

    <span class="token comment">## 或者使用python3.8引入的海象运算符</span>
    <span class="token comment">## while len(data := wf.readframes(CHUNK)):</span>
    <span class="token comment">##     stream.write(data)</span>

    <span class="token comment">## 关闭音频流</span>
    stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## 释放PortAudio系统资源</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-音频录制" tabindex="-1"><a class="header-anchor" href="#_1-2-2-音频录制" aria-hidden="true">#</a> 1.2.2 音频录制</h4><p>以下代码展示了基于PyAudio调用麦克风录音，并将录音结果保存为本地文件。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> wave
<span class="token keyword">import</span> pyaudio

<span class="token comment">## 设置音频流的数据块大小</span>
CHUNK <span class="token operator">=</span> <span class="token number">1024</span>
<span class="token comment">## 设置音频流的格式为16位整型，也就是2字节</span>
FORMAT <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>paInt16
<span class="token comment">## 设置音频流的通道数为1</span>
CHANNELS <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">## 设置音频流的采样率为16KHz</span>
RATE <span class="token operator">=</span> <span class="token number">16000</span>
<span class="token comment">## 设置录制时长为5秒</span>
RECORD_SECONDS <span class="token operator">=</span> <span class="token number">5</span>

outfilepath <span class="token operator">=</span> <span class="token string">&#39;output.wav&#39;</span>
<span class="token keyword">with</span> wave<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>outfilepath<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> wf<span class="token punctuation">:</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 设置wave文件的通道数</span>
    wf<span class="token punctuation">.</span>setnchannels<span class="token punctuation">(</span>CHANNELS<span class="token punctuation">)</span>
    <span class="token comment">## 设置wave文件的采样位数 </span>
    wf<span class="token punctuation">.</span>setsampwidth<span class="token punctuation">(</span>p<span class="token punctuation">.</span>get_sample_size<span class="token punctuation">(</span>FORMAT<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">## 设置wave文件的采样率</span>
    wf<span class="token punctuation">.</span>setframerate<span class="token punctuation">(</span>RATE<span class="token punctuation">)</span>

    <span class="token comment">## 打开音频流,input表示录音</span>
    stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>FORMAT<span class="token punctuation">,</span> channels<span class="token operator">=</span>CHANNELS<span class="token punctuation">,</span> rate<span class="token operator">=</span>RATE<span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Recording...&#39;</span><span class="token punctuation">)</span>
    <span class="token comment">## 循环写入音频数据</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> RATE <span class="token operator">//</span> CHUNK <span class="token operator">*</span> RECORD_SECONDS<span class="token punctuation">)</span><span class="token punctuation">:</span>
        wf<span class="token punctuation">.</span>writeframes<span class="token punctuation">(</span>stream<span class="token punctuation">.</span>read<span class="token punctuation">(</span>CHUNK<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;Done&#39;</span><span class="token punctuation">)</span>  

    stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-全双工音频录制与播放" tabindex="-1"><a class="header-anchor" href="#_1-2-3-全双工音频录制与播放" aria-hidden="true">#</a> 1.2.3 全双工音频录制与播放</h4><p>全双工系统（full-duplex）可以同时进行双向数据传输，而半双工系统（half-duplex）只能在同一时间内进行单向数据传输。在半双工系统中，一台设备传输数据时，另一台设备必须等待传输完成后才能进行数据处理。以下代码展示了全双工（full-duplex）音频录制与播放，即同时进行音频录制和播放，而不需要等待一个操作完成后再进行另一个操作。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pyaudio

RECORD_SECONDS <span class="token operator">=</span> <span class="token number">5</span>
CHUNK <span class="token operator">=</span> <span class="token number">1024</span>
RATE <span class="token operator">=</span> <span class="token number">16000</span>

p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## frames_per_buffer设置音频每个缓冲区的大小</span>
stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>p<span class="token punctuation">.</span>get_format_from_width<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                channels<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
                rate<span class="token operator">=</span>RATE<span class="token punctuation">,</span>
                <span class="token builtin">input</span><span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                frames_per_buffer<span class="token operator">=</span>CHUNK<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;recording&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span>RATE <span class="token operator">/</span> CHUNK <span class="token operator">*</span> RECORD_SECONDS<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## read读取音频然后writer播放音频</span>
    stream<span class="token punctuation">.</span>write<span class="token punctuation">(</span>stream<span class="token punctuation">.</span>read<span class="token punctuation">(</span>CHUNK<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;done&#39;</span><span class="token punctuation">)</span>

stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-回调函数的使用" tabindex="-1"><a class="header-anchor" href="#_1-3-回调函数的使用" aria-hidden="true">#</a> 1.3 回调函数的使用</h3><p>在前面的代码中，PyAudio执行音频播放或录制是以阻塞主线程的方式进行的，这意味着代码无法同时处理其他任务。为了解决这一问题，PyAudio提供了回调函数，使得程序在进行音频输入和输出时，能够以非阻塞的方式进行操作，即处理音频流的同时处理其他任务。PyAudio回调函数是在单独的线程中执行的，当音频流数据可用时，回调函数会被自动调用并以立即对音频数据进行处理。PyAudio回调函数具有固定的参数接口，函数介绍如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>in_data<span class="token punctuation">,</span>       <span class="token comment">## 录制的音频数据的字节流，如果没有录音则为None</span>
            frame_count<span class="token punctuation">,</span>    <span class="token comment">## 每个缓冲区中的帧数，本次读取的数据量</span>
            time_info<span class="token punctuation">,</span>      <span class="token comment">## 有关音频流时间信息的字典</span>
            status_flags<span class="token punctuation">)</span>   <span class="token comment">## 音频流状态的标志位</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下代码展示了以回调函数的形式播放音频。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> wave
<span class="token keyword">import</span> time
<span class="token keyword">import</span> pyaudio

filepath <span class="token operator">=</span> <span class="token string">&quot;demo.wav&quot;</span>
<span class="token keyword">with</span> wave<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> wf<span class="token punctuation">:</span>
    <span class="token comment">## 当音频流数据可用时，回调函数会被自动调用</span>
    <span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>in_data<span class="token punctuation">,</span> frame_count<span class="token punctuation">,</span> time_info<span class="token punctuation">,</span> status<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">## 读取了指定数量的音频帧数据</span>
        data <span class="token operator">=</span> wf<span class="token punctuation">.</span>readframes<span class="token punctuation">(</span>frame_count<span class="token punctuation">)</span>
        <span class="token comment">## pyaudio.paContinue为常量，表示继续进行音频流的处理</span>
        <span class="token comment">## 根据需要更改为pyaudio.paAbort或pyaudio.paComplete等常量来控制处理流程的中断和结束</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>data<span class="token punctuation">,</span> pyaudio<span class="token punctuation">.</span>paContinue<span class="token punctuation">)</span>

    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">## stream_callback设置回调函数</span>
    stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>p<span class="token punctuation">.</span>get_format_from_width<span class="token punctuation">(</span>wf<span class="token punctuation">.</span>getsampwidth<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    channels<span class="token operator">=</span>wf<span class="token punctuation">.</span>getnchannels<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    rate<span class="token operator">=</span>wf<span class="token punctuation">.</span>getframerate<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                    stream_callback<span class="token operator">=</span>callback<span class="token punctuation">)</span>
    
    <span class="token comment">## 判断音频流是否处于活动状态</span>
    <span class="token keyword">while</span> stream<span class="token punctuation">.</span>is_active<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span>
    stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下代码展示了如何运用回调函数实现音频录制与播放的全双工模式。在超时情况下，通过调用stream.close()来关闭音频流并释放相关资源。一旦音频流被关闭，将无法再传输音频数据。若想实现录音过程中暂停一段时间后再继续录音，可使用stream.stop_stream()来暂停音频流的数据传输，即暂时停止音频的读取和写入，但仍保持流对象处于打开状态。随后，可通过调用stream.start_stream()来重新启动音频流的数据传输。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> pyaudio

<span class="token comment">## 录音时长</span>
DURATION <span class="token operator">=</span> <span class="token number">5</span> 

<span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>in_data<span class="token punctuation">,</span> frame_count<span class="token punctuation">,</span> time_info<span class="token punctuation">,</span> status<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## in_data为麦克风输入的音频流</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>in_data<span class="token punctuation">,</span> pyaudio<span class="token punctuation">.</span>paContinue<span class="token punctuation">)</span>

p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>p<span class="token punctuation">.</span>get_format_from_width<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                channels<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
                rate<span class="token operator">=</span><span class="token number">16000</span><span class="token punctuation">,</span>
                <span class="token builtin">input</span><span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                stream_callback<span class="token operator">=</span>callback<span class="token punctuation">)</span>

start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">##  当音频流处于活动状态且录音时间未达到设定时长时</span>
<span class="token keyword">while</span> stream<span class="token punctuation">.</span>is_active<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">&lt;</span> DURATION<span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span>

<span class="token comment">## 超过时长关闭音频流</span>
stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-设备管理" tabindex="-1"><a class="header-anchor" href="#_1-4-设备管理" aria-hidden="true">#</a> 1.4 设备管理</h3><p>PyAudio提供了host Api和device Api来获取音频设备，但host Api和device Api代表了不同的层级和功能。具体如下：</p><ul><li>host Api：是对底层音频系统的抽象，表示系统上可用的音频接口，提供了与底层音频设备交互的功能。每个host Api都有自己的特点和支持的功能集，如使用的数据格式、采样率等。常见的host Api包括ALSA、PulseAudio、CoreAudio等。</li><li>device Api：是指具体的音频输入或输出设备，如麦克风、扬声器或耳机等。每个音频设备都属于一个特定的音频host Api，并具有不同的参数配置，例如采样率、缓冲区大小等。</li></ul><p>本文主要对更为常用的device Api进行介绍，PyAudio中关于device Api的函数有如下：</p><ol><li><p><code>get_device_info_by_index(index)</code>： 通过整数型索引获取指定设备的详细信息。该函数返回一个包含设备信息的字典，包括设备名称、输入/输出通道数、支持的采样率范围等。</p></li><li><p><code>get_default_input_device_info()</code>： 获取默认输入设备的详细信息。该函数返回一个包含设备信息的字典。</p></li><li><p><code>get_default_output_device_info()</code>： 获取默认输出设备的详细信息。该函数返回一个包含设备信息的字典。</p></li><li><p><code>get_device_count()</code>： 获取计算机上可用音频设备的数量，这些设备可以是麦克风、扬声器、音频接口等。</p></li></ol><p>其中默认设备为当前操作系统的音频默认设备，可以通过操作系统音频控制页面更改默认音频输入输出设备。下面代码展示了这些函数的使用：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pyaudio

<span class="token comment">## 获取指定设备的详细信息</span>
<span class="token keyword">def</span> <span class="token function">get_device_info_by_index</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">:</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    device_info <span class="token operator">=</span> p<span class="token punctuation">.</span>get_device_info_by_index<span class="token punctuation">(</span>index<span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> device_info

<span class="token comment">## 获取默认输入设备的详细信息</span>
<span class="token keyword">def</span> <span class="token function">get_default_input_device_info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    default_input_info <span class="token operator">=</span> p<span class="token punctuation">.</span>get_default_input_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> default_input_info

<span class="token comment">## 获取默认输出设备的详细信息</span>
<span class="token keyword">def</span> <span class="token function">get_default_output_device_info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    default_output_info <span class="token operator">=</span> p<span class="token punctuation">.</span>get_default_output_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> default_output_info

<span class="token comment">## 获取计算机上可用音频设备的数量</span>
<span class="token keyword">def</span> <span class="token function">get_device_count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    device_count <span class="token operator">=</span> p<span class="token punctuation">.</span>get_device_count<span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span>terminate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> device_count

<span class="token comment">## 示例用法</span>
index <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;可用音频设备数量：&quot;</span><span class="token punctuation">,</span> get_device_count<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;设备{}的信息：{}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> get_device_info_by_index<span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;默认录音设备的信息：&quot;</span><span class="token punctuation">,</span> get_default_input_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;默认播放设备的信息：&quot;</span><span class="token punctuation">,</span> get_default_output_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于以上代码，如返回的默认播放设备信息字典如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>默认播放设备的信息：
<span class="token punctuation">{</span><span class="token string">&#39;index&#39;</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
 <span class="token string">&#39;structVersion&#39;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
 <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;扬声器 (Realtek High Definition Au&#39;</span><span class="token punctuation">,</span>
 <span class="token string">&#39;hostApi&#39;</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
 <span class="token string">&#39;maxInputChannels&#39;</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
 <span class="token string">&#39;maxOutputChannels&#39;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
 <span class="token string">&#39;defaultLowInputLatency&#39;</span><span class="token punctuation">:</span> <span class="token number">0.09</span><span class="token punctuation">,</span>
 <span class="token string">&#39;defaultLowOutputLatency&#39;</span><span class="token punctuation">:</span> <span class="token number">0.09</span><span class="token punctuation">,</span>
 <span class="token string">&#39;defaultHighInputLatency&#39;</span><span class="token punctuation">:</span> <span class="token number">0.18</span><span class="token punctuation">,</span>
 <span class="token string">&#39;defaultHighOutputLatency&#39;</span><span class="token punctuation">:</span> <span class="token number">0.18</span><span class="token punctuation">,</span>
 <span class="token string">&#39;defaultSampleRate&#39;</span><span class="token punctuation">:</span> <span class="token number">44100.0</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该设备也是系统当前默认的音频设备，其中各个参数的含义如下：</p>`,32),f=n("li",null,[n("code",null,"'index': 3"),s("：设备的索引号，用于在设备列表中唯一标识该设备。")],-1),y=n("li",null,[n("code",null,"'structVersion': 2"),s("：设备信息结构的版本号，用于指示该设备信息的数据结构版本。")],-1),w=n("li",null,[n("code",null,"'name': '扬声器 (Realtek High Definition Au'"),s("：设备的名称，表示该设备是一个 Realtek High Definition 型号的扬声器。")],-1),q=n("code",null,"'hostApi': 0",-1),A={href:"https://blog.csdn.net/mrlixirong/article/details/129186453",target:"_blank",rel:"noopener noreferrer"},x=p("<li><code>&#39;maxInputChannels&#39;: 0</code>：设备支持的最大输入通道数，这里为0表示该设备没有输入功能，不支持录音。</li><li><code>&#39;maxOutputChannels&#39;: 2</code>：设备支持的最大输出通道数，这里为2表示该设备支持2个输出通道，即可以播放立体声音频。</li><li><code>&#39;defaultLowInputLatency&#39;: 0.09</code>：默认低输入延迟，以秒为单位，表示从音频输入信号进入设备所需的最小时间。</li><li><code>&#39;defaultLowOutputLatency&#39;: 0.09</code>：默认低输出延迟，以秒为单位，表示从设备输出信号到达音频输出所需的最小时间。</li><li><code>&#39;defaultHighInputLatency&#39;: 0.18</code>：默认高输入延迟，以秒为单位，表示从音频输入信号进入设备所需的最大时间。</li><li><code>&#39;defaultHighOutputLatency&#39;: 0.18</code>：默认高输出延迟，以秒为单位，表示从设备输出信号到达音频输出所需的最大时间。</li><li><code>&#39;defaultSampleRate&#39;: 44100.0</code>：默认采样率，表示设备支持的默认音频采样率为44100赫兹（Hz）。这是音频设备在单位时间内采样的样本数，影响声音的质量和频率范围。</li>",7),P=p(`<p>如果想指定设备进行音频录制或录制，则在open函数中指定设备的索引，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pyaudio

p <span class="token operator">=</span> pyaudio<span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 获取可用的设备数量</span>
device_count <span class="token operator">=</span> p<span class="token punctuation">.</span>get_device_count<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 遍历设备，打印设备信息和索引</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>device_count<span class="token punctuation">)</span><span class="token punctuation">:</span>
    device_info <span class="token operator">=</span> p<span class="token punctuation">.</span>get_device_info_by_index<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Device </span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">{</span>device_info<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment">## 选择所需的录音设备的索引</span>
input_device_index <span class="token operator">=</span> <span class="token number">1</span> 
<span class="token comment">## 选择所需的播放设备的索引</span>
output_device_index <span class="token operator">=</span> <span class="token number">2</span> 

<span class="token comment">## 打开音频流，并指定设备</span>
stream <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">format</span><span class="token operator">=</span>p<span class="token punctuation">.</span>get_format_from_width<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                channels<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span>
                rate<span class="token operator">=</span><span class="token number">16000</span><span class="token punctuation">,</span>
                <span class="token builtin">input</span><span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                input_device_index <span class="token operator">=</span> input_device_index<span class="token punctuation">,</span>
                output_device_index <span class="token operator">=</span> output_device_index<span class="token punctuation">)</span>

<span class="token comment">## 操作输出设备和录音设备</span>
<span class="token comment">## ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-speechrecognition" tabindex="-1"><a class="header-anchor" href="#_2-speechrecognition" aria-hidden="true">#</a> 2 SpeechRecognition</h2><h3 id="_2-1-speechrecognition介绍与安装" tabindex="-1"><a class="header-anchor" href="#_2-1-speechrecognition介绍与安装" aria-hidden="true">#</a> 2.1 SpeechRecognition介绍与安装</h3>`,4),R={href:"https://github.com/Uberi/speech_recognition",target:"_blank",rel:"noopener noreferrer"},W=p(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install SpeechRecognition
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>SpeechRecognition主要的类有：</p><p><strong>AudioData</strong></p><p>AudioData类是用于表示语音数据，主要参数和函数如下：</p><p>参数</p><ul><li><code>frame_data</code>：音频字节流数据</li><li><code>sample_rate</code>：音频采样率</li><li><code>sample_width</code>: 音频的采样位数</li></ul><p>函数</p><ul><li><code>get_segment</code>：返回指定时间段内的音频数据的AudioData对象</li><li><code>get_raw_data</code>：返回音频数据的原始字节流</li><li><code>get_wav_data</code>：返回音频数据的wav格式字节流</li><li><code>get_aiff_data</code>：返回音频数据的aiff格式字节流</li><li><code>get_flac_data</code>：返回音频数据的flac格式字节流</li></ul><p><strong>Microphone</strong></p><p>Microphone类是封装PyAudio，用于驱动麦克风设备功能的类，因此构造参数与PyAudio主要参数和函数如下：</p><p>参数</p><ul><li><code>device_index</code>：麦克风设备的索引号，不指定将采用PyAudio的默认音频输入设置</li><li><code>format</code>：采样格式为16位整数，不指定将采用PyAudio的默认音频输入设置</li><li><code>SAMPLE_WIDTH</code>：音频的采样位数 ，不指定将采用PyAudio的默认音频输入设置</li><li><code>SAMPLE_RATE</code>：采样率，不指定将采用PyAudio的默认音频输入设置</li><li><code>CHUNK</code>：每个缓冲区中存储的帧数，默认为1024</li><li><code>audio</code>： PyAudio对象</li><li><code>stream</code>：调用PyAudio的open函数打开的音频流</li></ul><p>函数</p><ul><li><code>get_pyaudio</code>：用来获取PyAudio的版本号，并调用PyAudio库</li><li><code>list_microphone_names</code>：返回当前系统中所有可用的麦克风设备的名称列表</li><li><code>list_working_microphones</code>：返回当前系统中所有正在工作的麦克风设备的名称列表。麦克风设备是否运行的评定方式为：对于某设备，尝试录制一段短暂的音频，然后检查是否成功录制到了具有一定音频能量的音频数据。</li></ul><p><strong>Recognizer类</strong></p><p>Recognizer类是用于语音识别的主要类，它提供了一系列参数和函数来处理音频输入，主要参数和函数如下：</p><p>参数</p><ul><li><code>energy_threshold = 300</code>: 用于录制最低音频能量，基于音频均方根RMS计算能量</li><li><code>dynamic_energy_threshold = True</code>: 是否使用动态能量阈值</li><li><code>dynamic_energy_adjustment_damping = 0.15</code>: 能量阈值调整的阻尼系数</li><li><code>dynamic_energy_ratio = 1.5</code>: 动态能量比率</li><li><code>pause_threshold = 0.8</code>: 在一段完整短语被认为结束之前，非语音音频的持续时间（以秒为单位）</li><li><code>operation_timeout = None</code>: 内部操作（例如API请求）开始后超时的时间（以秒为单位），如果不设置超时时间，则为<code>None</code></li><li><code>phrase_threshold = 0.3</code>: 认为一段语音至少需要的持续时间（以秒为单位），低于该值的语音将被忽略（用于过滤噪声）</li><li><code>non_speaking_duration = 0.5</code>: 非语音音频的持续时间（以秒为单位）</li></ul><p>函数</p><ul><li><code>record</code>：从一个音频源中读取数据</li><li><code>adjust_for_ambient_noise</code>：用于在录制音频之前自动根据麦克风的环境噪声水平调整energy_threshold参数</li><li><code>listen</code>：音频录制，结果返回AudioData类</li><li><code>listen_in_background</code>：用于在后台录制音频并调用回调函数</li></ul><p>Recognizer类的listen函数每次录音分为三个阶段：</p><ol><li><p>录音起始 这一阶段意味着开始录音但是没有声音输入。如果当前获得的声音片段能量值低于<code>energy_threshold</code>，则认为没有声音输入。一旦当前获得的声音片段能量值高于<code>energy_threshold</code>，则进入下一阶段。该阶段将最多保存<code>non_speaking_duration</code>长度的音频片段。如果<code>dynamic_energy_threshold</code>为True，则会根据环境动态调整<code>energy_threshold</code>。 listen函数提供输入参数<code>timeout</code>以控制该阶段时长，如果录音处于该阶段<code>timeout</code>秒则停止录音返回错误提示，<code>timeout</code>默认为None。</p></li><li><p>录音中 这一阶段意味着已有声音输入。如果声音片段能量值低于<code>energy_threshold</code>连续超过<code>pause_threshold</code>秒，则结束录音。在这一阶段energy_threshold一直是固定值，并不会进行动态调整。 listen函数提供输入参数<code>phrase_time_limit</code>以控制该阶段最大时长，如果录音处于该阶段<code>phrase_time_limit</code>秒则结束录音。</p></li><li><p>录音结束 在这一阶段中，如果录音中阶段获得的声音片段时间不超过<code>phrase_threshold</code>秒，则不返回录音结果且进入下一次录音起始阶段。如果超过<code>phrase_threshold</code>秒，则将音频片段转为音频流，以AudioData对象返回。</p></li></ol><h3 id="_2-2-示例代码" tabindex="-1"><a class="header-anchor" href="#_2-2-示例代码" aria-hidden="true">#</a> 2.2 示例代码</h3><p><strong>音频录制</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr

<span class="token comment">## 创建一个Recognizer对象，用于语音识别</span>
r <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 设置相关阈值</span>
r<span class="token punctuation">.</span>non_speaking_duration <span class="token operator">=</span> <span class="token number">0.3</span>
r<span class="token punctuation">.</span>pause_threshold <span class="token operator">=</span> <span class="token number">0.5</span>

<span class="token comment">## 创建一个Microphone对象，设置采样率为16000</span>
<span class="token comment">## 构造函数所需参数device_index=None, sample_rate=None, chunk_size=1024</span>
msr <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">(</span>sample_rate<span class="token operator">=</span><span class="token number">16000</span><span class="token punctuation">)</span>

<span class="token comment">## 打开麦克风</span>
<span class="token keyword">with</span> msr <span class="token keyword">as</span> source<span class="token punctuation">:</span>
    <span class="token comment">## 如果想连续录音，该段代码使用for循环</span>
    <span class="token comment">## 进行环境噪音适应，duration为适应时间，不能小于0.5</span>
    <span class="token comment">## 如果无噪声适应要求，该段代码可以注释</span>
    r<span class="token punctuation">.</span>adjust_for_ambient_noise<span class="token punctuation">(</span>source<span class="token punctuation">,</span> duration<span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;开始录音&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment">## 使用Recognizer监听麦克风录音</span>
    <span class="token comment">## phrase_time_limit=None表示不设置时间限制</span>
    audio <span class="token operator">=</span> r<span class="token punctuation">.</span>listen<span class="token punctuation">(</span>source<span class="token punctuation">,</span> phrase_time_limit<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;录音结束&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment">## 将录音数据写入.wav格式文件</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;microphone-results.wav&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment">## audio.get_wav_data()获得wav格式的音频二进制数据</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_wav_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment">## 将录音数据写入.raw格式文件</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;microphone-results.raw&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_raw_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 将录音数据写入.aiff格式文件</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;microphone-results.aiff&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_aiff_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">## 将录音数据写入.flac格式文件</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;microphone-results.flac&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_flac_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>音频文件读取</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 导入speech_recognition库，别名为sr</span>
<span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr

<span class="token comment">## 创建一个Recognizer对象r，用于语音识别</span>
r <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 设置音频文件路径</span>
filepath <span class="token operator">=</span> <span class="token string">&quot;demo.wav&quot;</span>

<span class="token comment">## 使用AudioFile打开音频文件作为音频源</span>
<span class="token keyword">with</span> sr<span class="token punctuation">.</span>AudioFile<span class="token punctuation">(</span>filepath<span class="token punctuation">)</span> <span class="token keyword">as</span> source<span class="token punctuation">:</span>
    <span class="token comment">## 使用record方法记录从音频源中提取的2秒音频，从第1秒开始</span>
    audio <span class="token operator">=</span> r<span class="token punctuation">.</span>record<span class="token punctuation">(</span>source<span class="token punctuation">,</span> offset<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> duration<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    
    <span class="token comment">## 创建一个文件用于保存提取的音频数据</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;microphone-results.wav&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment">## 将提取的音频数据写入文件</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_wav_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>回调函数的使用</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr

<span class="token comment">## 这是从后台线程调用的回调函数</span>
<span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>recognizer<span class="token punctuation">,</span> audio<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## recognizer是Recognizer对象的实例。audio是从麦克风捕获到的音频数据</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>audio<span class="token punctuation">)</span><span class="token punctuation">)</span>

r <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>
m <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">with</span> m <span class="token keyword">as</span> source<span class="token punctuation">:</span>
    <span class="token comment">## 我们只需要在开始监听之前校准一次</span>
    r<span class="token punctuation">.</span>adjust_for_ambient_noise<span class="token punctuation">(</span>source<span class="token punctuation">)</span>

<span class="token comment">## 在后台开始监听</span>
stop_listening <span class="token operator">=</span> r<span class="token punctuation">.</span>listen_in_background<span class="token punctuation">(</span>m<span class="token punctuation">,</span> callback<span class="token punctuation">)</span>

<span class="token comment">## 进行一些无关的计算，持续5秒钟</span>
<span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment">## 即使主线程正在做其他事情，我们仍然在监听</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.1</span><span class="token punctuation">)</span>

<span class="token comment">## 调用此函数请求停止后台监听</span>
stop_listening<span class="token punctuation">(</span>wait_for_stop<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>麦克风设备查看</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr

<span class="token comment">## 获取麦克风设备名称列表</span>
<span class="token keyword">def</span> <span class="token function">list_microphone_names</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    mic_list <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">.</span>list_microphone_names<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span> mic_name <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>mic_list<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Microphone {}: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> mic_name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>


<span class="token comment">## 获取可用的工作麦克风列表</span>
<span class="token keyword">def</span> <span class="token function">list_working_microphones</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    mic_list <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">.</span>list_working_microphones<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> index<span class="token punctuation">,</span> mic_name <span class="token keyword">in</span> mic_list<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Microphone {}: {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> mic_name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>


<span class="token comment">## 获得pyaudio对象</span>
<span class="token keyword">def</span> <span class="token function">get_pyaudio</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    audio <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">.</span>get_pyaudio<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>PyAudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 获取默认音频输入设备信息</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_default_input_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> audio


<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;所有麦克风列表&quot;</span><span class="token punctuation">)</span>
list_microphone_names<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;可运行麦克风列表&quot;</span><span class="token punctuation">)</span>
list_working_microphones<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;默认音频输入设备信息&quot;</span><span class="token punctuation">)</span>
get_pyaudio<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-语音识别示例应用" tabindex="-1"><a class="header-anchor" href="#_3-语音识别示例应用" aria-hidden="true">#</a> 3 语音识别示例应用</h2><p>本示例给出一个基于SpeechRecognition库和Whisper语音识别库的非流式语音识别示例应用。一般来说语音识别分为流式语音识别和非流式语音识别：</p><ul><li>流式语音识别是指在语音输入过程中实时进行语音识别，即边接收语音数据边输出识别结果，实现实时性较高的语音识别。在流式语音识别中，语音被分割成一小段一小段的流，可以通过连续发送这些流来实时地获取识别结果。随着语音输入的增加，流式语音识别也可以优化输出部分结果。流式语音识别准确率相对较低，但是实时性强，适用于需要快速响应的场景，例如实时语音助手、电话客服、会议记录等。技术上，流式语音识别需要实时处理音频流，要求算法具有低延迟和高吞吐量的特点，通常使用各种优化策略来提高实时性能。</li><li>非流式语音识别是指等待语音输入结束后将完整的语音输入一次性进行分析和识别。非流式语音识别精度高，适用于一些不需要实时响应的场景或一次性识别整段语音的场景，如指令识别、语音转写、语音搜索、语音翻译等。技术上，非流式语音识别注重语音的整体准确性和语义理解，通常采用复杂的模型和算法来提高识别准确率。</li></ul>`,34),E={href:"https://github.com/openai/whisper",target:"_blank",rel:"noopener noreferrer"},T={href:"https://zhuanlan.zhihu.com/p/624245757",target:"_blank",rel:"noopener noreferrer"},N=p(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── asr.py 语音识别类
├── record.py 录音类
└── run.py 界面类
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装SpeechRecognition库和Whisper库后运行run.py文件即可打开示例应用。</p><p><strong>界面类</strong></p><p>界面类提供了一个基于PyQt5编写的简单应用界面，如下所示。当界面初始化时，会同时初始化录音类和语音识别类。点击开始录音按钮后，程序将实现自动循环监听说话音频的开始和结束。每次说话结束后，程序会自动进行语音识别，并将识别结果显示在界面中。点击停止按钮则会等待录音结束并停止语音监听。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/Python-Study-Notes/NLP/[语音识别] 基于Python构建简易的音频录制与语音识别应用/image/img2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## run.py</span>
<span class="token keyword">from</span> PyQt5 <span class="token keyword">import</span> QtGui
<span class="token keyword">from</span> PyQt5<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token operator">*</span>
<span class="token keyword">from</span> PyQt5<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> QSize<span class="token punctuation">,</span> Qt
<span class="token keyword">import</span> sys
<span class="token keyword">from</span> record <span class="token keyword">import</span> AudioHandle


<span class="token keyword">class</span> <span class="token class-name">Window</span><span class="token punctuation">(</span>QMainWindow<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    界面类
    &quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">## --- 设置标题</span>
        self<span class="token punctuation">.</span>setWindowTitle<span class="token punctuation">(</span><span class="token string">&#39;语音识别demo&#39;</span><span class="token punctuation">)</span>
        <span class="token comment">## --- 设置窗口尺寸</span>
        <span class="token comment">## 获取系统桌面尺寸</span>
        desktop <span class="token operator">=</span> app<span class="token punctuation">.</span>desktop<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">## 设置界面初始尺寸</span>
        self<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>desktop<span class="token punctuation">.</span>screenGeometry<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.3</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token number">0.5</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>width<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>resize<span class="token punctuation">(</span>self<span class="token punctuation">.</span>width<span class="token punctuation">,</span> self<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
        <span class="token comment">## 设置窗口最小值</span>
        self<span class="token punctuation">.</span>minWidth <span class="token operator">=</span> <span class="token number">300</span>
        self<span class="token punctuation">.</span>setMinimumSize<span class="token punctuation">(</span>QSize<span class="token punctuation">(</span>self<span class="token punctuation">.</span>minWidth<span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token number">0.5</span> <span class="token operator">*</span> self<span class="token punctuation">.</span>minWidth<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment">## --- 创建组件</span>
        self<span class="token punctuation">.</span>showBox <span class="token operator">=</span> QTextEdit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>showBox<span class="token punctuation">.</span>setReadOnly<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>startBtn <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;开始录音&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>stopBtn <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;停止录音&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>

        <span class="token comment">## --- 组件初始化</span>
        self<span class="token punctuation">.</span>initUI<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">## --- 初始化音频类</span>
        self<span class="token punctuation">.</span>ahl <span class="token operator">=</span> AudioHandle<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">## 连接用于传递信息的信号</span>
        self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>infoSignal<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>showInfo<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>showInfo<span class="token punctuation">(</span><span class="token string">&quot;&lt;font color=&#39;blue&#39;&gt;{}&lt;/font&gt;&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token string">&quot;程序已初始化&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">initUI</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        界面初始化
        &quot;&quot;&quot;</span>
        <span class="token comment">## 设置整体布局</span>
        mainLayout <span class="token operator">=</span> QVBoxLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        mainLayout<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>showBox<span class="token punctuation">)</span>
        <span class="token comment">## 设置底部水平布局</span>
        blayout <span class="token operator">=</span> QHBoxLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        blayout<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>startBtn<span class="token punctuation">)</span>
        blayout<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">)</span>
        mainLayout<span class="token punctuation">.</span>addLayout<span class="token punctuation">(</span>blayout<span class="token punctuation">)</span>

        mainWidget <span class="token operator">=</span> QWidget<span class="token punctuation">(</span><span class="token punctuation">)</span>
        mainWidget<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>mainLayout<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setCentralWidget<span class="token punctuation">(</span>mainWidget<span class="token punctuation">)</span>

        <span class="token comment">## 设置事件</span>
        self<span class="token punctuation">.</span>startBtn<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>record<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>record<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">record</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        录音控制
        &quot;&quot;&quot;</span>
        sender <span class="token operator">=</span> self<span class="token punctuation">.</span>sender<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> sender<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;开始录音&quot;</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>startBtn<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
            <span class="token comment">## 开启录音线程</span>
            self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> sender<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&quot;停止录音&quot;</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
            <span class="token comment">## waitDialog用于等待录音停止</span>
            waitDialog <span class="token operator">=</span> QProgressDialog<span class="token punctuation">(</span><span class="token string">&quot;正在停止录音...&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowTitle<span class="token punctuation">(</span><span class="token string">&quot;请等待&quot;</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowModality<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>ApplicationModal<span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setCancelButton<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setRange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

            <span class="token comment">## 设置 Marquee 模式</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlag<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>WindowContextHelpButtonHint<span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlag<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>WindowCloseButtonHint<span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlag<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>WindowMaximizeButtonHint<span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlag<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>WindowMinimizeButtonHint<span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlag<span class="token punctuation">(</span>Qt<span class="token punctuation">.</span>WindowTitleHint<span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>
            <span class="token comment">## 关闭对话框边框</span>
            waitDialog<span class="token punctuation">.</span>setWindowFlags<span class="token punctuation">(</span>self<span class="token punctuation">.</span>windowFlags<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">|</span> Qt<span class="token punctuation">.</span>FramelessWindowHint<span class="token punctuation">)</span>

            <span class="token comment">## 连接关闭信号，即ahl线程结束则waitDialog关闭</span>
            self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>finished<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>waitDialog<span class="token punctuation">.</span>accept<span class="token punctuation">)</span>
            <span class="token comment">## 结束录音线程</span>
            self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>isRunning<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token comment">## 显示对话框</span>
                waitDialog<span class="token punctuation">.</span>exec_<span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token comment">## 关闭对话框</span>
            self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>finished<span class="token punctuation">.</span>disconnect<span class="token punctuation">(</span>waitDialog<span class="token punctuation">.</span>accept<span class="token punctuation">)</span>
            waitDialog<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

            self<span class="token punctuation">.</span>startBtn<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">showInfo</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        信息展示函数
        :param text: 输入文字，可支持html
        &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>showBox<span class="token punctuation">.</span>append<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>running<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">closeEvent</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> event<span class="token punctuation">:</span> QtGui<span class="token punctuation">.</span>QCloseEvent<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        重写退出事件
        :param event: 事件对象
        &quot;&quot;&quot;</span>
        <span class="token comment">## 点击停止按钮</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>ahl<span class="token punctuation">.</span>running<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>stopBtn<span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">del</span> self<span class="token punctuation">.</span>ahl
        event<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>
    ex <span class="token operator">=</span> Window<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">## 获取默认图标</span>
    default_icon <span class="token operator">=</span> app<span class="token punctuation">.</span>style<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>standardIcon<span class="token punctuation">(</span>QStyle<span class="token punctuation">.</span>SP_MediaVolume<span class="token punctuation">)</span>

    <span class="token comment">## 设置窗口图标为默认图标</span>
    ex<span class="token punctuation">.</span>setWindowIcon<span class="token punctuation">(</span>default_icon<span class="token punctuation">)</span>

    ex<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span>app<span class="token punctuation">.</span>exec_<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>录音类</strong></p><p>录音类可以用于监听麦克风输入的音频并调用语音识别类进行识别。通过设置采样率、适应环境时长、录音最长时长等参数，实现自动判断说话开始和结束的功能。同时，通过PyQt5的信号机制，在界面上展示不同类型的信息，包括警告信息和识别结果。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## record.py</span>
<span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr
<span class="token keyword">from</span> PyQt5<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> QThread<span class="token punctuation">,</span> pyqtSignal
<span class="token keyword">import</span> time<span class="token punctuation">,</span> os
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">from</span> asr <span class="token keyword">import</span> ASR


<span class="token keyword">class</span> <span class="token class-name">AudioHandle</span><span class="token punctuation">(</span>QThread<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    录音控制类
    &quot;&quot;&quot;</span>

    <span class="token comment">## 用于展示信息的pyqt信号</span>
    infoSignal <span class="token operator">=</span> pyqtSignal<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> sampleRate<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">16000</span><span class="token punctuation">,</span> adjustTime<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> phraseLimitTime<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span>
                 saveAudio<span class="token punctuation">:</span> <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> hotWord<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        :param sampleRate: 采样率
        :param adjustTime: 适应环境时长/s
        :param phraseLimitTime: 录音最长时长/s
        :param saveAudio: 是否保存音频
        :param hotWord: 热词数据
        &quot;&quot;&quot;</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>AudioHandle<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>sampleRate <span class="token operator">=</span> sampleRate
        self<span class="token punctuation">.</span>duration <span class="token operator">=</span> adjustTime
        self<span class="token punctuation">.</span>phraseTime <span class="token operator">=</span> phraseLimitTime
        <span class="token comment">## 用于设置运行状态</span>
        self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">False</span>
        self<span class="token punctuation">.</span>rec <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">## 麦克风对象</span>
        self<span class="token punctuation">.</span>mic <span class="token operator">=</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">(</span>sample_rate<span class="token operator">=</span>self<span class="token punctuation">.</span>sampleRate<span class="token punctuation">)</span>
        <span class="token comment">## 语音识别模型对象</span>
        <span class="token comment">## hotWord为需要优先识别的热词</span>
        <span class="token comment">## 输入&quot;秦剑 无憾&quot;表示优先匹配该字符串中的字符</span>
        self<span class="token punctuation">.</span>asr <span class="token operator">=</span> ASR<span class="token punctuation">(</span>prompt<span class="token operator">=</span>hotWord<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>saveAudio <span class="token operator">=</span> saveAudio
        self<span class="token punctuation">.</span>savePath <span class="token operator">=</span> <span class="token string">&quot;output&quot;</span>

    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">stop</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">False</span>

    <span class="token keyword">def</span> <span class="token function">setInfo</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        展示信息
        :param text: 文本
        :param type: 文本类型
        &quot;&quot;&quot;</span>
        nowTime <span class="token operator">=</span> time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&quot;%H:%M:%S&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">type</span> <span class="token operator">==</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>infoSignal<span class="token punctuation">.</span>emit<span class="token punctuation">(</span><span class="token string">&quot;&lt;font color=&#39;blue&#39;&gt;{} {}&lt;/font&gt;&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>nowTime<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> <span class="token builtin">type</span> <span class="token operator">==</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>infoSignal<span class="token punctuation">.</span>emit<span class="token punctuation">(</span><span class="token string">&quot;&lt;font color=&#39;green&#39;&gt;{} {}&lt;/font&gt;&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>nowTime<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>infoSignal<span class="token punctuation">.</span>emit<span class="token punctuation">(</span><span class="token string">&quot;&lt;font color=&#39;red&#39;&gt;{} {}&lt;/font&gt;&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>nowTime<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">listen</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        语音监听函数
        &quot;&quot;&quot;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">with</span> self<span class="token punctuation">.</span>mic <span class="token keyword">as</span> source<span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string">&quot;录音开始&quot;</span><span class="token punctuation">)</span>
                self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">True</span>
                <span class="token keyword">while</span> self<span class="token punctuation">.</span>running<span class="token punctuation">:</span>
                    <span class="token comment">## 设备监控</span>
                    audioIndex <span class="token operator">=</span> self<span class="token punctuation">.</span>mic<span class="token punctuation">.</span>audio<span class="token punctuation">.</span>get_default_input_device_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;index&#39;</span><span class="token punctuation">]</span>
                    workAudio <span class="token operator">=</span> self<span class="token punctuation">.</span>mic<span class="token punctuation">.</span>list_working_microphones<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>workAudio<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token keyword">or</span> audioIndex <span class="token keyword">not</span> <span class="token keyword">in</span> workAudio<span class="token punctuation">:</span>
                        self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string">&quot;未检测到有效音频输入设备！！！&quot;</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token operator">=</span><span class="token string">&#39;warning&#39;</span><span class="token punctuation">)</span>
                        <span class="token keyword">break</span>
                    self<span class="token punctuation">.</span>rec<span class="token punctuation">.</span>adjust_for_ambient_noise<span class="token punctuation">(</span>source<span class="token punctuation">,</span> duration<span class="token operator">=</span>self<span class="token punctuation">.</span>duration<span class="token punctuation">)</span>
                    self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string">&quot;正在录音&quot;</span><span class="token punctuation">)</span>
                    <span class="token comment">## self.running为否无法立即退出该函数，如果想立即退出则需要重写该函数</span>
                    audio <span class="token operator">=</span> self<span class="token punctuation">.</span>rec<span class="token punctuation">.</span>listen<span class="token punctuation">(</span>source<span class="token punctuation">,</span> phrase_time_limit<span class="token operator">=</span>self<span class="token punctuation">.</span>phraseTime<span class="token punctuation">)</span>
                    <span class="token comment">## 将音频二进制数据转换为numpy类型</span>
                    audionp <span class="token operator">=</span> self<span class="token punctuation">.</span>bytes2np<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>frame_data<span class="token punctuation">)</span>
                    <span class="token keyword">if</span> self<span class="token punctuation">.</span>saveAudio<span class="token punctuation">:</span>
                        self<span class="token punctuation">.</span>saveWav<span class="token punctuation">(</span>audio<span class="token punctuation">)</span>
                    <span class="token comment">## 判断音频rms值是否超过经验阈值，如果没超过表明为环境噪声</span>
                    <span class="token keyword">if</span> np<span class="token punctuation">.</span>sqrt<span class="token punctuation">(</span>np<span class="token punctuation">.</span>mean<span class="token punctuation">(</span>audionp <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.02</span><span class="token punctuation">:</span>
                        <span class="token keyword">continue</span>
                    self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string">&quot;音频正在识别&quot;</span><span class="token punctuation">)</span>
                    <span class="token comment">## 识别语音</span>
                    result <span class="token operator">=</span> self<span class="token punctuation">.</span>asr<span class="token punctuation">.</span>predict<span class="token punctuation">(</span>audionp<span class="token punctuation">)</span>
                    self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;识别结果为：</span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token string">&quot;warning&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">finally</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>setInfo<span class="token punctuation">(</span><span class="token string">&quot;录音停止&quot;</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>running <span class="token operator">=</span> <span class="token boolean">False</span>

    <span class="token keyword">def</span> <span class="token function">bytes2np</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> inp<span class="token punctuation">:</span> <span class="token builtin">bytes</span><span class="token punctuation">,</span> sampleWidth<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> np<span class="token punctuation">.</span>ndarray<span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        将音频二进制数据转换为numpy类型
        :param inp: 输入音频二进制流
        :param sampleWidth: 音频采样宽度
        :return: 音频numpy数组
        &quot;&quot;&quot;</span>

        <span class="token comment">## 使用np.frombuffer函数将字节序列转换为numpy数组</span>
        tmp <span class="token operator">=</span> np<span class="token punctuation">.</span>frombuffer<span class="token punctuation">(</span>inp<span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>int16 <span class="token keyword">if</span> sampleWidth <span class="token operator">==</span> <span class="token number">2</span> <span class="token keyword">else</span> np<span class="token punctuation">.</span>int8<span class="token punctuation">)</span>
        <span class="token comment">## 确保tmp为numpy数组</span>
        tmp <span class="token operator">=</span> np<span class="token punctuation">.</span>asarray<span class="token punctuation">(</span>tmp<span class="token punctuation">)</span>

        <span class="token comment">## 获取tmp数组元素的数据类型信息</span>
        i <span class="token operator">=</span> np<span class="token punctuation">.</span>iinfo<span class="token punctuation">(</span>tmp<span class="token punctuation">.</span>dtype<span class="token punctuation">)</span>
        <span class="token comment">## 计算tmp元素的绝对最大值</span>
        absmax <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">**</span> <span class="token punctuation">(</span>i<span class="token punctuation">.</span>bits <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token comment">## 计算tmp元素的偏移量</span>
        offset <span class="token operator">=</span> i<span class="token punctuation">.</span><span class="token builtin">min</span> <span class="token operator">+</span> absmax

        <span class="token comment">## 将tmp数组元素转换为浮点型，并进行归一化</span>
        array <span class="token operator">=</span> np<span class="token punctuation">.</span>frombuffer<span class="token punctuation">(</span><span class="token punctuation">(</span>tmp<span class="token punctuation">.</span>astype<span class="token punctuation">(</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span> <span class="token operator">-</span> offset<span class="token punctuation">)</span> <span class="token operator">/</span> absmax<span class="token punctuation">,</span> dtype<span class="token operator">=</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span>

        <span class="token comment">## 返回转换后的numpy数组</span>
        <span class="token keyword">return</span> array

    <span class="token keyword">def</span> <span class="token function">saveWav</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> audio<span class="token punctuation">:</span> sr<span class="token punctuation">.</span>AudioData<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        保存语音结果
        :param audio: AudioData音频对象
        &quot;&quot;&quot;</span>
        nowTime <span class="token operator">=</span> time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&quot;%H_%M_%S&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>self<span class="token punctuation">.</span>savePath<span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;{}/{}.wav&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>savePath<span class="token punctuation">,</span> nowTime<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>get_wav_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>语音识别类</strong></p><p>语音识别类利用Whisper进行语音识别。在使用Whisper进行语音识别时，可以通过设置initial_prompt参数来指定初始提示。initial_prompt参数是一个字符串，用于在模型生成文本之前提供一些初始的上下文信息。将这些信息传递给Whisper模型可以帮助它更好地理解任务的背景和上下文。通过设置适当的initial_prompt，可以引导模型产生与特定主题相关的响应或者在对话中提供一些先验知识。例如，热点词汇识别，结果为简体字还是繁体字。initial_prompt并不是必需的参数，如果没有适当的初始提示，可以选择不使用它，让模型完全自由生成响应。但是要注意的是如果输入的语音为环境噪声或者使用的是小型Whisper模型，initial_prompt的设置可能会导致语音识别输出结果为initial_prompt。</p><p>Whisper提供了5种型号的模型，其中4种支持纯英文版本，以平衡速度和准确性。Whisper模型越大精度越高，速度越慢，本文默认使用small型号的模型。以下是这些可用模型的型号名称、大致的显存要求和相对速度：</p><table><thead><tr><th>型号</th><th>参数量</th><th>仅英文模型</th><th>多语言模型</th><th>所需显存</th><th>相对速度</th></tr></thead><tbody><tr><td>tiny</td><td>39M</td><td><code>tiny.en</code></td><td><code>tiny</code></td><td>~1GB</td><td>~32x</td></tr><tr><td>base</td><td>74M</td><td><code>base.en</code></td><td><code>base</code></td><td>~1GB</td><td>~16x</td></tr><tr><td>small</td><td>244M</td><td><code>small.en</code></td><td><code>small</code></td><td>~2GB</td><td>~6x</td></tr><tr><td>medium</td><td>769M</td><td><code>medium.en</code></td><td><code>medium</code></td><td>~5GB</td><td>~2x</td></tr><tr><td>large</td><td>1550M</td><td>N/A</td><td><code>large</code></td><td>~10GB</td><td>1x</td></tr></tbody></table><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## asr.py</span>
<span class="token keyword">import</span> whisper
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np


<span class="token keyword">class</span> <span class="token class-name">ASR</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    语音识别模型类
    &quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> modelType<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">,</span> prompt<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        :param modelType: whisper模型类型
        :param prompt: 提示词
        &quot;&quot;&quot;</span>
        <span class="token comment">## 模型默认使用cuda运行，没gpu跑模型很慢。</span>
        <span class="token comment">## 使用device=&quot;cpu&quot;即可改为cpu运行</span>
        self<span class="token punctuation">.</span>model <span class="token operator">=</span> whisper<span class="token punctuation">.</span>load_model<span class="token punctuation">(</span>modelType<span class="token punctuation">,</span> device<span class="token operator">=</span><span class="token string">&quot;cuda&quot;</span><span class="token punctuation">)</span>
        <span class="token comment">## prompt作用就是提示模型输出指定类型的文字</span>
        <span class="token comment">## 这里使用简体中文就是告诉模型尽可能输出简体中文的识别结果</span>
        self<span class="token punctuation">.</span>prompt <span class="token operator">=</span> <span class="token string">&quot;简体中文&quot;</span> <span class="token operator">+</span> prompt

    <span class="token keyword">def</span> <span class="token function">predict</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> audio<span class="token punctuation">:</span> np<span class="token punctuation">.</span>ndarray<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        语音识别
        :param audio: 输入的numpy音频数组
        :return: 输出识别的字符串结果
        &quot;&quot;&quot;</span>

        <span class="token comment">## prompt在whisper中用法是作为transformer模型交叉注意力模块的初始值。transformer为自回归模型，会逐个生成识别文字，</span>
        <span class="token comment">## 如果输入的语音为空，initial_prompt的设置可能会导致语音识别输出结果为initial_prompt</span>
        result <span class="token operator">=</span> self<span class="token punctuation">.</span>model<span class="token punctuation">.</span>transcribe<span class="token punctuation">(</span>audio<span class="token punctuation">.</span>astype<span class="token punctuation">(</span>np<span class="token punctuation">.</span>float32<span class="token punctuation">)</span><span class="token punctuation">,</span> initial_prompt<span class="token operator">=</span>self<span class="token punctuation">.</span>prompt<span class="token punctuation">)</span>
        <span class="token keyword">return</span> result<span class="token punctuation">[</span><span class="token string">&quot;text&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,15),C={href:"https://zhuanlan.zhihu.com/p/212318683",target:"_blank",rel:"noopener noreferrer"},S={href:"http://portaudio.com/docs/v19-doxydocs/index.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://people.csail.mit.edu/hubert/pyaudio/",target:"_blank",rel:"noopener noreferrer"},H={href:"https://blog.csdn.net/mrlixirong/article/details/129186453",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/Uberi/speech_recognition",target:"_blank",rel:"noopener noreferrer"},z={href:"https://github.com/openai/whisper",target:"_blank",rel:"noopener noreferrer"},M={href:"https://zhuanlan.zhihu.com/p/624245757",target:"_blank",rel:"noopener noreferrer"};function F(L,I){const a=o("ExternalLinkIcon");return i(),c("div",null,[u,d,n("p",null,[s("本文所有代码见："),n("a",r,[s("Python-Study-Notes"),t(a)])]),k,v,n("p",null,[s("随着深度学习技术的迅猛发展，端到端语音识别已广泛应用。然而，音频相关的最基础概念如采样频率、采样位数，我们仍需有一定了解。声音是由物体振动引起的机械波，而音频是声音的电子表示。PCM (Pulse Code Modulation)编码将一种常见将模拟音频信号转换为数字形式的方法。在此过程，音频采样是指在一段时间内通过固定间隔采集声音的振幅值以将连续的声音模拟信号转换为离散的数字数据。采样频率表示每秒钟采集的样本数，而采样位数则表示每个样本的量化级别即声音的精细度和动态范围。关于音频详细概念介绍见："),n("a",m,[s("数字音频基础­­­­­­­­­­从PCM说起"),t(a)]),s("。")]),b,n("p",null,[s("PyAudio是一个用于处理音频输入和输出的Python库，其主要变量和接口的实现依赖于C语言版本的"),n("a",h,[s("PortAudio"),t(a)]),s("。PyAudio提供从麦克风或其他输入设备录制音频、保存音频文件、实时处理音频数据以及播放音频文件或实时音频流等功能。此外，PyAudio也允许通过设置采样率、位深度、声道数等参数以及支持回调函数和事件驱动机制来满足不同应用需求。PyAudio官方网站见："),n("a",g,[s("PyAudio"),t(a)]),s("。PyAudio的安装需要Python3.7及以上环境。")]),_,n("ul",null,[f,y,w,n("li",null,[q,s("：设备声卡驱动模式，来自于PortAudio，如果想详细了解见："),n("a",A,[s("pyaudio声卡信息中hostApi"),t(a)]),s("。")]),x]),P,n("p",null,[s("SpeechRecognition是一个用于语音识别的Python库，支持多个语音识别引擎以将音频转换为文本。SpeechRecognition开源仓库地址为："),n("a",R,[s("speech_recognition"),t(a)]),s("。基于PyAudio库，SpeechRecognition封装了更加方面和全面的音频录制函数。本文主要介绍利用SpeechRecognition录制音频。使用SpeechRecognition进行音频录制，需要Python3.8及以上环境，以及最低PyAudio 0.2.11版本。在安装PyAudio后，SpeechRecognition安装命令如下：")]),W,n("p",null,[n("a",E,[s("Whisper"),t(a)]),s("是OpenAI开源的通用多语言语音识别模型库。Whisper使用了一个序列到序列的Transformer模型，支持多国语言语音识别，其英语的识别水平与人类接近。关于Whisper的安装和使用可参考Whisper开源仓库或参考文章："),n("a",T,[s("Whisper语音转文字手把手教程"),t(a)]),s("。所提供的语音识别示例实现了简单的语音起始和结束检测，并进行相应的语音识别和结果展示，程序代码结构如下：")]),N,n("ul",null,[n("li",null,[n("a",C,[s("数字音频基础­­­­­­­­­­从PCM说起"),t(a)])]),n("li",null,[n("a",S,[s("portaudio"),t(a)])]),n("li",null,[n("a",B,[s("PyAudio"),t(a)])]),n("li",null,[n("a",H,[s("pyaudio声卡信息中hostApi"),t(a)])]),n("li",null,[n("a",D,[s("speech_recognition"),t(a)])]),n("li",null,[n("a",z,[s("Whisper"),t(a)])]),n("li",null,[n("a",M,[s("Whisper语音转文字手把手教程"),t(a)])])])])}const U=e(l,[["render",F],["__file","2023-08-21-_语音识别_ 基于Python构建简易的音频录制与语音识别应用.html.vue"]]);export{U as default};
