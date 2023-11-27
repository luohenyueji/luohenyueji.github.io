import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as l,c as v,a as e,b as i,d,e as r}from"./app-MsA2k2kn.js";const o={},t=e("h1",{id:"常用工具-python视频解码库deffcode使用指北",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#常用工具-python视频解码库deffcode使用指北","aria-hidden":"true"},"#"),i(" [常用工具] Python视频解码库DeFFcode使用指北")],-1),u={href:"https://github.com/abhiTronix/deffcode",target:"_blank",rel:"noopener noreferrer"},c={href:"https://abhitronix.github.io/deffcode/latest/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/abhiTronix/vidgear",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/LuohenYJ/article/details/126293854",target:"_blank",rel:"noopener noreferrer"},f={href:"https://blog.csdn.net/leixiaohua1020",target:"_blank",rel:"noopener noreferrer"},p=r(`<p>[toc]</p><h1 id="_1-前置知识" tabindex="-1"><a class="header-anchor" href="#_1-前置知识" aria-hidden="true">#</a> 1 前置知识</h1><h3 id="_1-1-安装" tabindex="-1"><a class="header-anchor" href="#_1-1-安装" aria-hidden="true">#</a> 1.1 安装</h3><p>对于DeFFcode，python版本需要高于3.7。DeFFcode支持以下系统：</p><ul><li>2016以后的linux版本，推荐使用linux系统运行VidGear</li><li>Windows 7及以上版本</li><li>MacOS 10.12.6及以上版本</li></ul><p>Deffcode安装代码如下：</p><blockquote><p>pip install -U deffcode</p></blockquote><p>特别要注意的是<strong>DeFFcode必须要安装ffmpeg执行文件</strong>。安装ffmpeg，其它系统自行搜索安装方法，ubuntu下直接输入：</p><blockquote><p>sudo apt install ffmpeg</p></blockquote><h3 id="_1-2-deffcode功能预览" tabindex="-1"><a class="header-anchor" href="#_1-2-deffcode功能预览" aria-hidden="true">#</a> 1.2 DeFFcode功能预览</h3><p><strong>视频流解码</strong></p><p>DeFFcode核心功能就是利用ffmpeg进行视频解码。相关公开测试视频流地址为：</p><ul><li>rtsp流：rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4，来源于https://www.wowza.com/developer/rtsp-stream-test</li><li>http流：http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8，来源于苹果提供的测试源</li><li>http流：https://abhitronix.github.io/html/Big_Buck_Bunny_1080_10s_1MB.mp4，来源于DeFFcode</li></ul><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

# FFedecoder创建视频源和视频解码规则，formulate在ffmpeg中执行语句
# 本地视频
# decoder = FFdecoder(&quot;test.mp4&quot;).formulate()
# rtsp流
decoder = FFdecoder(&quot;rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&quot;).formulate()

# 从decoder中抓取RGB图像
for frame in decoder.generateFrame():

    print(frame.shape)
    # 将rgb图像转换为bgr图像，送给opencv展示
    frame_bgr = frame[:, :, ::-1]
    cv2.imshow(&quot;Output Frame&quot;, frame_bgr)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

# 安全关闭解码进程
decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>视频流属性识别</strong></p><p>对于给定的输入源，DeFFcode使用各种方法识别视频流其中包含的文件所有属性，比如是否包含音频，图像分辨率，视频码率。不同的视频流返回的属性参数不同，具体按需要探索下就行了。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import Sourcer

# sourcer设置定位视频流中的数据信息，probe_stream探测视频流的输出
sourcer = Sourcer(&quot;test.mp4&quot;).probe_stream()

# 解析为python字典数据
data = sourcer.retrieve_metadata()
# pretty_json表示解析为类似json.dump后的json字符串
print(sourcer.retrieve_metadata(pretty_json=True))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用" aria-hidden="true">#</a> 2 基础使用</h2><h3 id="_2-1-解码视频文件" tabindex="-1"><a class="header-anchor" href="#_2-1-解码视频文件" aria-hidden="true">#</a> 2.1 解码视频文件</h3><p>DeFFcode的FFdecoder API很容易支持多媒体视频文件路径作为其source参数的输入。通过它的frame_format参数，您可以轻松解码所有知名计算机视觉库（例如 OpenCV）都支持的任何像素格式的视频帧。FFdecoder API 的generateFrame()函数可用于多种方法来访问来自给定源的RGB帧，例如生成器（推荐方法）、调用with语句和迭代器。在下面示例中，我们将使用上述访问方法从给定的视频文件中解码默认的RGB24视频帧。</p><p><strong>生成器调用</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder

decoder = FFdecoder(&quot;test.mp4&quot;).formulate()

# 读取RGB24图像
for frame in decoder.generateFrame():

    if frame is None:
        break

    print(frame.shape) 

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>with调用</strong></p><p>调用with语句方法可用于使代码更简单、更清晰、更易读。这种方法还自动处理FFdecoder API 中的formulate()和terminate()方法的管理，因此不需要显式调用它们。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from deffcode import FFdecoder
import cv2

# 不需要调用formulate和terminate
with FFdecoder(&quot;test.mp4&quot;) as decoder:

    for frame in decoder.generateFrame():

        if frame is None:
            break

        print(frame.shape)  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>迭代器调用</strong></p><p>迭代器的调用方式类似于OpenCV-Python读取视频的方式。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from deffcode import FFdecoder

decoder = FFdecoder(&quot;test.mp4&quot;).formulate()

while True:

    # next返回迭代器的下一个项目
    frame = next(decoder.generateFrame(), None)

    if frame is None:
        break

    print(frame.shape) 

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数设置</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 设置解码后的图像为bgr24，可以直接给opencv使用
FFdecoder(&quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;)
# 设置解码后的图像为灰度图像，verbose输出解码的详细统计信息
FFdecoder(&quot;test.mp4&quot;, frame_format=&quot;gray&quot;, verbose=True)
# 设置解码后的图像为yuv420p格式，verbose输出解码的详细统计信息
FFdecoder(&quot;test.mp4&quot;, frame_format=&quot;yuv420p&quot;, verbose=True)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-解码本地摄像头和屏幕截取" tabindex="-1"><a class="header-anchor" href="#_2-2-解码本地摄像头和屏幕截取" aria-hidden="true">#</a> 2.2 解码本地摄像头和屏幕截取</h3>`,31),q={href:"https://abhitronix.github.io/deffcode/latest/recipes/basic/decode-live-feed-devices/",target:"_blank",rel:"noopener noreferrer"},h=r(`<h3 id="_2-3-解码网络流" tabindex="-1"><a class="header-anchor" href="#_2-3-解码网络流" aria-hidden="true">#</a> 2.3 解码网络流</h3><p>与解码视频文件类似，DeFFcode 的 FFdecoder API直接支持具有特定协议（如RTSP/RTP、HTTP(s)、MPEG-TS 等）的网络流作为其source参数的输入。以下示例用的都是网络上的公开视频流，由于网速问题有可能连接不上。</p><p><strong>http流解码</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

# 获得BGR24图像
# decoder = FFdecoder(&quot;ttp://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8&quot;, frame_format=&quot;bgr24&quot;).formulate()
decoder = FFdecoder(&quot;https://abhitronix.github.io/html/Big_Buck_Bunny_1080_10s_1MB.mp4&quot;, frame_format=&quot;bgr24&quot;).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>RTSP/RTP流解码</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>
from deffcode import FFdecoder
import cv2

# 设置传输协议为tcp
ffparams = {&quot;-rtsp_transport&quot;: &quot;tcp&quot;}

# 取流
decoder = FFdecoder(&quot;rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-从图像序列捕获帧" tabindex="-1"><a class="header-anchor" href="#_2-4-从图像序列捕获帧" aria-hidden="true">#</a> 2.4 从图像序列捕获帧</h3><p><strong>特定命名图像序列读取</strong></p><p>下面的代码展示了如何带有特定数字标记的图像序列逐帧读取图像。您可以使用以下FFmpeg命令从视频文件中提取时间长度为2s的图像序列，注意图像保存的文件夹路径应该要预先创建。</p><blockquote><p>ffmpeg -t 2 -i test.mp4 imgs/image%02d.png</p></blockquote><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

# 设置特定数字开始读图，在本例为img01.png
ffparams = {&quot;-ffprefixes&quot;:[&quot;-start_number&quot;, &quot;1&quot;]}
# 注意图像数大于三张
# img%02d.png: 格式化输出文件名，本示例中输出img00.png，img01.png, img02.png等
# 如果是jpeg图像序列，图像后缀名应该为jpeg而不是jpg
decoder = FFdecoder(&quot;imgs/img%02d.png&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>glob 模式</strong></p><p>如果图像是连续的，但不一定是数字顺序，则通配符（*表示任意数量的任意字符）很有用，但是以下代码无法在windows下使用。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

# glob模式抓取图像
# glob模式在 Windows FFmpeg 版本上不可用。
ffparams = {&quot;-ffprefixes&quot;:[&quot;-pattern_type&quot;, &quot;glob&quot;]}

decoder = FFdecoder(&quot;imgs/img*.png&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>循环读取图像</strong></p><p>下面的设置展示了从单个或者多个图像循环读取的示例。注意jpg图像都以jpeg后缀命名。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>#  \`-loop 1\` 表示循环读取,loop是bool类型
ffparams = {&quot;-ffprefixes&quot;:[&quot;-loop&quot;, &quot;1&quot;]}

# 设置单张图像循环读取
decoder = FFdecoder(&quot;imgs/img01.png&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams).formulate()

# 设置多张图像循环读取
decoder = FFdecoder(&quot;imgs/img%02d.png&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams).formulate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-保存视频" tabindex="-1"><a class="header-anchor" href="#_2-5-保存视频" aria-hidden="true">#</a> 2.5 保存视频</h3><p><strong>通过OpenCV保存视频</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import json, cv2

decoder = FFdecoder(&quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;).formulate()

# decoder.metadata读取视频属性json数据，并转码为字典
metadata_dict = json.loads(decoder.metadata)

FOURCC = cv2.VideoWriter_fourcc(&quot;M&quot;, &quot;J&quot;, &quot;P&quot;, &quot;G&quot;)
FRAMERATE = metadata_dict[&quot;source_video_framerate&quot;]
FRAMESIZE = tuple(metadata_dict[&quot;source_video_resolution&quot;])

writer = cv2.VideoWriter(&quot;output.avi&quot;, FOURCC, FRAMERATE, FRAMESIZE)


for frame in decoder.generateFrame():

    if frame is None:
        break
    writer.write(frame)

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()

writer.release()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过VidGear保存视频（推荐）</strong></p><p>使用这种方式保存视频，视频文件压缩率更高，保存速度更快，但是也CPU利用率也更高。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
from vidgear.gears import WriteGear
import json

decoder = FFdecoder(&quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;, verbose=True).formulate()

output_params = {
    &quot;-input_framerate&quot;: json.loads(decoder.metadata)[&quot;source_video_framerate&quot;]
}

writer = WriteGear(output_filename=&quot;output.mp4&quot;, **output_params)


for frame in decoder.generateFrame():

    if frame is None:
        break

    writer.write(frame)

decoder.terminate()

writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数设置</strong></p><p>以下是各种ffmpeg参数的设置方法，ffparams设置参数后，然后传入FFdecoder。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 截取前3s视频，按倒序保存
ffparams = {
    &quot;-vf&quot;: &quot;trim=end=7,reverse&quot; 
}

# 裁剪中央输入区域，宽高都为输入视频的2/3，然后拉伸为原图像尺寸
ffparams = {
    &quot;-vf&quot;: &quot;crop=2/3*in_w:2/3*in_h&quot;
}

# 逆时针旋转图像30度，用绿色填充旋转图像未覆盖的区域
ffparams = {
    &quot;-vf&quot;: &quot;trim=end=7,rotate=angle=-30*PI/180:fillcolor=green&quot; 
}

# 保存前7秒视频，逆时针旋转90度，保持纵向布局
# dir为旋转方向，具体可以搜搜ffmpeg transpose
ffparams = {
    &quot;-vf&quot;: &quot;trim=end=7,transpose=dir=2:passthrough=portrait&quot; 
}

# 水平翻转，然后缩放图像到其原始大小的一半
ffparams = {
    &quot;-vf&quot;: &quot;hflip,scale=w=iw/2:h=ih/2&quot; 

}

# 设置参数
decoder = FFdecoder(
    &quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams
).formulate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-特定帧存储" tabindex="-1"><a class="header-anchor" href="#_2-5-特定帧存储" aria-hidden="true">#</a> 2.5 特定帧存储</h3><p>DeFFcode的FFdecoder API使用FFmpeg参数-ss提供轻松且精确的帧搜索，使我们能够从输入源的特定部分保存图像。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
from PIL import Image

# 定义FFmpeg参数以查找00:00:01.45处图像，并获得一帧图像
ffparams = {&quot;-ss&quot;: &quot;00:00:01.45&quot;, &quot;-frames:v&quot;: 1}

# 初始化参数
decoder = FFdecoder(&quot;test.mp4&quot;, **ffparams).formulate()

# 读取图像
frame = next(decoder.generateFrame(), None)

# 保存图像
if not (frame is None):
    im = Image.fromarray(frame)
    im.save(&quot;test.png&quot;)
else:
    raise ValueError(&quot;Something is wrong!&quot;)

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-进阶使用" tabindex="-1"><a class="header-anchor" href="#_3-进阶使用" aria-hidden="true">#</a> 3 进阶使用</h2><h3 id="_3-1-虚拟源生成与解码" tabindex="-1"><a class="header-anchor" href="#_3-1-虚拟源生成与解码" aria-hidden="true">#</a> 3.1 虚拟源生成与解码</h3>`,31),g={href:"https://abhitronix.github.io/deffcode/latest/recipes/advanced/decode-live-virtual-sources/",target:"_blank",rel:"noopener noreferrer"},_=r(`<p><strong>从测试源模式生成和解码帧</strong></p><p>testsrc图生成一个测试视频模式，显示颜色模式、滚动渐变和时间戳。这对于测试目的很有用。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

# 定义参数
ffparams = {
    # 播放时间为10秒
    &quot;-ffprefixes&quot;: [&quot;-t&quot;, &quot;10&quot;],  
}

# 生成尺寸为1280x720，帧率30的testsrc测试图像
decoder = FFdecoder(
    &quot;testsrc=size=1280x720:rate=30&quot;,
    source_demuxer=&quot;lavfi&quot;,
    frame_format=&quot;bgr24&quot;,
    **ffparams
).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break
    
    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用自定义文本效果从渐变生成和解码帧</strong></p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

ffparams = {
    &quot;-ffprefixes&quot;: [&quot;-t&quot;, &quot;15&quot;],  # 15秒播放
    &quot;-vf&quot;: &quot;drawtext=&quot;  # 绘制文本
    + &quot;text=&#39;%{localtime\\:%X}&#39;:&quot;  # 时间 (HH::MM::SS)
    + &quot;fontfile=&#39;c\\:\\/windows\\/fonts\\/arial.ttf&#39;:&quot;  # 字体
    + &quot;x=(w-text_w)/2:y=h-40*t:&quot;  # 向上滚动效果
    + &quot;fontsize=50:&quot;  # 字体大小
    + &quot;fontcolor=white&quot;,  # 字体颜色
}


decoder = FFdecoder(
    &quot;gradients=n=3&quot;,
    source_demuxer=&quot;lavfi&quot;,
    frame_format=&quot;bgr24&quot;,
    **ffparams
).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-硬件加速视频解码" tabindex="-1"><a class="header-anchor" href="#_3-2-硬件加速视频解码" aria-hidden="true">#</a> 3.2 硬件加速视频解码</h3><p>FFmpeg 提供对不同平台上不同支持的专用硬件的访问，以执行一系列与视频相关的任务，以更快地完成或使用更少的其他资源（特别是 CPU)。使用ffmpeg -decoders终端命令列出所有 FFmpeg 支持的解码器。可以看看具体ffmpeg支持本机哪种硬件解码。</p><p>比如判断ffmpeg是否可以通过依赖于gpu cuda的h264_cuvid解码，可以输入以下指令。如果输出包含了h264_cuvid那么就是支持的，可以通过gpu加速解码。</p><blockquote><p>linux系统：ffmpeg -hide_banner -decoders | grep h264</p></blockquote><blockquote><p>windows系统：ffmpeg -hide_banner -decoders | findstr h264</p></blockquote><p>如果支持h264_cuvid加速解码，可以尝试以下示例代码。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2

ffparams = {
    &quot;-vcodec&quot;: &quot;h264_cuvid&quot;, # CUVID H.264加速视频解码
    &quot;-ffprefixes&quot;: [&quot;-vsync&quot;, &quot;0&quot;], # 视频同步方法，一般都是自动，这里设置为0
}

decoder = FFdecoder(
    &quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams
).formulate()

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()
decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-复杂效果添加" tabindex="-1"><a class="header-anchor" href="#_3-3-复杂效果添加" aria-hidden="true">#</a> 3.3 复杂效果添加</h3><p><strong>添加水印</strong></p><p>以下代码展示了如何在读取的视频中添加图像，并保存视频到本地。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
from vidgear.gears import WriteGear
import json, cv2

# 定义带有复杂水印的视频过滤器
ffparams = {
    &quot;-ffprefixes&quot;: [&quot;-t&quot;, &quot;5&quot;],  # 视频总长度为5秒
    &quot;-clones&quot;: [
        &quot;-i&quot;,
        &quot;watermark.png&quot;,  
    ],
    &quot;-filter_complex&quot;: &quot;[1]format=rgba,&quot;  # 设置水印图像输入格式
    + &quot;colorchannelmixer=aa=0.7[logo];&quot;  # 设置水印透明度，数值越小越透明
    + &quot;[0][logo]overlay=W-w-{pixel}:H-h-{pixel}:format=auto,&quot;.format(  
        pixel=5 # 设置水印图片在距离输入视频右下角5个像素处
    )
    + &quot;format=bgr24&quot;,  # 设置输出格式
}


decoder = FFdecoder(
    &quot;test.mp4&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams
).formulate()


output_params = {
    &quot;-input_framerate&quot;: json.loads(decoder.metadata)[&quot;source_video_framerate&quot;],
}

# 保存视频
writer = WriteGear(output_filename=&quot;output.mp4&quot;, **output_params)

for frame in decoder.generateFrame():

    if frame is None:
        break

    writer.write(frame)

decoder.terminate()

writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>图像效果混合</strong></p><p>下面的代码展示了如何往图像序列中混合虚拟效果。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
from vidgear.gears import WriteGear
import cv2, json


ffparams = {
    &quot;-ffprefixes&quot;: [
        &quot;-t&quot;, &quot;10&quot;, # 视频长度为10s
        &quot;-f&quot;, &quot;lavfi&quot;, # 使用输入虚拟数据
        &quot;-i&quot;, &quot;mandelbrot=rate=25&quot;, # 视频帧率
    ],  
    &quot;-custom_resolution&quot;: (1280, 720), # 重新设置图像 1280x720
    &quot;-filter_complex&quot;:&quot;[1:v]format=yuv444p[v1];&quot; 
        + &quot;[0:v]format=gbrp10le[v0];&quot;
        + &quot;[v1][v0]scale2ref[v1][v0];&quot;
        + &quot;[v0][v1]blend=all_mode=&#39;heat&#39;,&quot; 
        + &quot;format=yuv422p10le[v]&quot;,
    &quot;-map&quot;: &quot;[v]&quot;, 
}

# 设置图像序列路径
decoder = FFdecoder(
    &quot;./imgs/image-%03d.png&quot;, frame_format=&quot;bgr24&quot;, verbose=True, **ffparams
).formulate()

output_params = {
    &quot;-input_framerate&quot;: 25,  
}

writer = WriteGear(output_filename=&quot;output.mp4&quot;, **output_params)

for frame in decoder.generateFrame():

    if frame is None:
        break

    writer.write(frame)

decoder.terminate()

writer.close()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),F={href:"https://abhitronix.github.io/deffcode/latest/recipes/advanced/transcode-art-filtergraphs/",target:"_blank",rel:"noopener noreferrer"},y=r(`<h3 id="_3-4-视频属性数据更改" tabindex="-1"><a class="header-anchor" href="#_3-4-视频属性数据更改" aria-hidden="true">#</a> 3.4 视频属性数据更改</h3><p><strong>添加新属性</strong></p><p>下面代码展示了读取视频后，往读取的属性数据中添加新的属性，注意该操作并不更改视频的实际属性数据。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import json


decoder = FFdecoder(&quot;test.mp4&quot;, verbose=True)

# 设置字典数据
data = dict(
    mystring=&quot;abcd&quot;, 
    myint=1234, 
    mylist=[1, &quot;Rohan&quot;, [&quot;inner_list&quot;]], 
    mytuple=(1, &quot;John&quot;, (&quot;inner_tuple&quot;)), 
    mydict={&quot;anotherstring&quot;: &quot;hello&quot;}, 
    myjson=json.loads(&#39;{&quot;name&quot;: &quot;John&quot;, &quot;age&quot;: 30, &quot;city&quot;: &quot;New York&quot;}&#39;),
)

# 分配视频的属性数据
decoder.metadata = data

decoder.formulate()

print(decoder.metadata)

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改已有视频属性</strong></p><p>在视频流解码前，可以设置视频流的属性数据，那么就会以更改后的属性解码图像。</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from deffcode import FFdecoder
import cv2


decoder = FFdecoder(&quot;test.mp4&quot;, verbose=True)

# 替换属性数据，会以当前属性解码视频
decoder.metadata = {
    &quot;output_frames_pixfmt&quot;: &quot;gray&quot;,  # 灰度图
    &quot;source_video_resolution&quot;: [352, 288],  # 宽高更改为352，288
}


decoder.formulate()


print(decoder.metadata)

for frame in decoder.generateFrame():

    if frame is None:
        break

    cv2.imshow(&quot;Output gray&quot;, frame)

    key = cv2.waitKey(1) &amp; 0xFF
    if key == ord(&quot;q&quot;):
        break

cv2.destroyAllWindows()

decoder.terminate()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,8),x={href:"https://github.com/abhiTronix/deffcode",target:"_blank",rel:"noopener noreferrer"},P={href:"https://abhitronix.github.io/deffcode/latest/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/abhiTronix/vidgear",target:"_blank",rel:"noopener noreferrer"},w={href:"https://blog.csdn.net/leixiaohua1020",target:"_blank",rel:"noopener noreferrer"},T={href:"https://abhitronix.github.io/deffcode/latest/recipes/basic/decode-live-feed-devices/",target:"_blank",rel:"noopener noreferrer"},D={href:"https://abhitronix.github.io/deffcode/latest/recipes/advanced/decode-live-virtual-sources/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://abhitronix.github.io/deffcode/latest/recipes/advanced/transcode-art-filtergraphs/",target:"_blank",rel:"noopener noreferrer"};function N(G,V){const n=a("ExternalLinkIcon");return l(),v("div",null,[t,e("p",null,[i("DeFFcode是一种跨平台的高性能视频帧解码器，通过内部封装ffmpeg，提供GPU解码支持，几行python代码就能够快速解码视频帧，并具有强大的错误处理能力。DeFFcode的APIs支持多种媒体流作为输入源，例如IP摄像机、常规多媒体文件、屏幕录制、图像序列、网络协议（例如 HTTP(s)、RTP/RSTP）等。由于FFmpeg的学习曲线非常陡峭，封装FFmpeg后的DeFFcode提供类似OpenCV-Python编码语法来帮助用户，使得在Python中学习、创建和开发基于FFmpeg的应用程序变得更加容易。DeFFcode的官方代码仓库见："),e("a",u,[i("deffcode"),d(n)]),i("。DeFFcode的官方文档见"),e("a",c,[i("deffcode_doc"),d(n)]),i("。")]),e("p",null,[i("DeFFcode的作者专注于音视频流的处理，除了Deffcode，作者还开源了Python视频处理库"),e("a",m,[i("VidGear"),d(n)]),i("。VidGear的具体使用见"),e("a",b,[i("Python视频处理库VidGear使用指北"),d(n)]),i("。DeFFcode还处于快速发展阶段，许多功能还需要完善。VidGear提供了比DeFFcode更丰富的视频处理接口，但是DeFFcode提供了比VidGear更高效更专业的视频解码接口。如果想要从事音视频流解码相关工作，还是学习ffmpeg的C++代码使用。")]),e("p",null,[i("入门ffmpeg使用或者想要对音视频处理有所了解推荐看看"),e("a",f,[i("雷霄骅"),d(n)]),i("的博客。雷霄骅是视音频技术处理的专家，也是国内音视频领域无偿分享技术最多的程序员。但是很不幸雷霄骅因过度劳累于2016年与世长辞，所以大家还是多注意身体健康。身体才是革命的本钱，少加班，该休息就得休息，没有时间休息的人注定没有时间生病。")]),p,e("p",null,[i("这部分不同平台使用方法不同，而且涉及到很多参数的使用和软件安装，所以这里推荐自行阅读"),e("a",q,[i("Decoding Live Feed Devices"),d(n)]),i("。")]),h,e("p",null,[i("DeFFcode提供各种创建虚拟视频流的示例，具体使用见"),e("a",g,[i("Decoding Live Virtual Sources"),d(n)]),i("，这里只列出两个经典的案例。")]),_,e("p",null,[i("此外Deffcode还支持添加各种艺术效果，具体方法可以阅读"),e("a",F,[i("transcode-art-filtergraphs"),d(n)])]),y,e("ul",null,[e("li",null,[e("a",x,[i("deffcode"),d(n)])]),e("li",null,[e("a",P,[i("deffcode_doc"),d(n)])]),e("li",null,[e("a",k,[i("VidGear"),d(n)])]),e("li",null,[e("a",w,[i("雷霄骅"),d(n)])]),e("li",null,[e("a",T,[i("Decoding Live Feed Devices"),d(n)])]),e("li",null,[e("a",D,[i("Decoding Live Virtual Sources"),d(n)])]),e("li",null,[e("a",B,[i("transcode-art-filtergraphs"),d(n)])])])])}const R=s(o,[["render",N],["__file","2022-08-19-_常用工具_ Python视频解码库DeFFcode使用指北.html.vue"]]);export{R as default};
