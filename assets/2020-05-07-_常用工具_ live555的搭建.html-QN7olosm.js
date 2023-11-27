import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as a,c as o,a as e,b as i,d as l,e as s}from"./app-MsA2k2kn.js";const d={},v=e("h1",{id:"常用工具-live555的搭建",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#常用工具-live555的搭建","aria-hidden":"true"},"#"),i(" [常用工具] live555的搭建")],-1),u=e("p",null,"live555是一个为流媒体提供解决方案的跨平台的C++开源项目，它实现了对标准流媒体传输协议如RTP/RTCP、RTSP、SIP等的支持。使用live555可以播放rtsp流。本文主要是在linux下搭建使用live555搭建rtsp server，主要步骤如下：",-1),c={href:"http://www.live555.com/liveMedia/public/live555-latest.tar.gz",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cdd /app
wget  http://www.live555.com/liveMedia/public/live555-latest.tar.gz
tar xzf live555-latest.tar.gz
cd live
./genMakefiles linux-64bit    #注意后面这个参数是根据当前文件夹下config.&lt;后缀&gt;获取得到的
make #编译
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>编译完成后在当前目录下生成mediaServer文件夹，进入该文件夹运行live555MediaServer文件。命令行代码如下：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd mediaServer
./live555MediaServer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行live555MediaServer文件后结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LIVE555 Media Server
	version 1.00 (LIVE555 Streaming Media library version 2020.04.24).
Play streams from this server using the URL
	rtsp://192.21.11.140/&lt;filename&gt;
where &lt;filename&gt; is a file present in the current directory.
Each file&#39;s type is inferred from its name suffix:
	&quot;.264&quot; =&gt; a H.264 Video Elementary Stream file
	&quot;.265&quot; =&gt; a H.265 Video Elementary Stream file
	&quot;.aac&quot; =&gt; an AAC Audio (ADTS format) file
	&quot;.ac3&quot; =&gt; an AC-3 Audio file
	&quot;.amr&quot; =&gt; an AMR Audio file
	&quot;.dv&quot; =&gt; a DV Video file
	&quot;.m4e&quot; =&gt; a MPEG-4 Video Elementary Stream file
	&quot;.mkv&quot; =&gt; a Matroska audio+video+(optional)subtitles file
	&quot;.mp3&quot; =&gt; a MPEG-1 or 2 Audio file
	&quot;.mpg&quot; =&gt; a MPEG-1 or 2 Program Stream (audio+video) file
	&quot;.ogg&quot; or &quot;.ogv&quot; or &quot;.opus&quot; =&gt; an Ogg audio and/or video file
	&quot;.ts&quot; =&gt; a MPEG Transport Stream file
		(a &quot;.tsx&quot; index file - if present - provides server &#39;trick play&#39; support)
	&quot;.vob&quot; =&gt; a VOB (MPEG-2 video with AC-3 audio) file
	&quot;.wav&quot; =&gt; a WAV Audio file
	&quot;.webm&quot; =&gt; a WebM audio(Vorbis)+video(VP8) file
See http://www.live555.com/mediaServer/ for additional documentation.
(We use port 8000 for optional RTSP-over-HTTP tunneling, or for HTTP live streaming (for indexed Transport Stream files only).)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果中的<code>rtsp://192.21.11.140/&lt;filename&gt;</code>就是rtsp路径。将1.264文件放入<code>mediaServer/test</code>文件夹下。在浏览器中调用rtsp://192.21.11.140/test/1.264便能够远程播放该视频。</p><p><strong>如果是编程调用该rtsp，则需要使用端口号也就是port 8000</strong> 此外如果要本机调用，可以使用下列方式编写本地rtsp路径</p><blockquote><p>rtsp://127.0.0.1:554/1.264</p></blockquote><ol start="3"><li>关闭命令行后，live555MediaServer就会关闭。如果想关闭命令行后继续运行，执行下述命令，在关闭命令行后服务会继续运行。</li></ol><blockquote><p>nohup ./live555MediaServer &amp;</p></blockquote><p><strong>参考</strong></p>`,11),p={href:"https://blog.csdn.net/u011003120/article/details/82969933",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.cnblogs.com/dpf-10/p/5623101.html",target:"_blank",rel:"noopener noreferrer"};function g(f,_){const t=r("ExternalLinkIcon");return a(),o("div",null,[v,u,e("ol",null,[e("li",null,[i("下载源码并编译"),e("a",c,[i("http://www.live555.com/liveMedia/public/live555-latest.tar.gz"),l(t)]),i("，linux命令行输入如下代码")])]),m,e("ul",null,[e("li",null,[e("a",p,[i("LIVE555学习1：Linux下live555的编译及测试"),l(t)])]),e("li",null,[e("a",b,[i("使用live555 在linux下搭建 rtsp server"),l(t)])])])])}const x=n(d,[["render",g],["__file","2020-05-07-_常用工具_ live555的搭建.html.vue"]]);export{x as default};
