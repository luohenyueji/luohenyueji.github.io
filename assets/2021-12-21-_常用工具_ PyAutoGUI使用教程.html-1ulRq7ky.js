import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as t,c as r,a as e,b as i,d as a,e as s}from"./app-MsA2k2kn.js";const u={},c=s(`<h1 id="常用工具-pyautogui使用教程" tabindex="-1"><a class="header-anchor" href="#常用工具-pyautogui使用教程" aria-hidden="true">#</a> [常用工具] PyAutoGUI使用教程</h1><p>[toc]</p><p>PyAutoGUI允许Python脚本控制鼠标和键盘，并自动与其他应用程序交互。PyAutoGUI的API设计很简单，非常容易上手，PyAutoGUI适用于 Windows、macOS和Linux系统，支持在Python2和3上运行。PyAutoGUI安装很简单。</p><p>windows安装：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pip install pyautogui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Linux安装：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>python3 -m pip install pyautogui
sudo apt-get install scrot
sudo apt-get install python3-tk
sudo apt-get install python3-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PyAutoGUI的主要功能有：</p><ul><li>移动鼠标并单击其他应用程序的窗口。</li><li>向应用程序发送击键信号，如填写表格。</li><li>截取屏幕截图，并给出一个图像（例如，按钮或复选框的图像），然后在屏幕上找到它。</li><li>找到应用程序的窗口，移动、调整大小、最大化、最小化或关闭它（目前仅适用于 Windows）。</li><li>显示警报和消息框。</li></ul>`,9),v={href:"https://github.com/asweigart/pyautogui",target:"_blank",rel:"noopener noreferrer"},o={href:"https://pyautogui.readthedocs.io/en/latest/quickstart.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/asweigart/pyautogui/blob/master/docs/simplified-chinese.ipynb",target:"_blank",rel:"noopener noreferrer"},p=s(`<h2 id="_1-基础知识" tabindex="-1"><a class="header-anchor" href="#_1-基础知识" aria-hidden="true">#</a> 1 基础知识</h2><p>导入库很简单。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import pyautogui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>屏幕上的位置由X和Y笛卡尔坐标表示。X坐标从左侧的0开始，向右增加。与数学不同，Y坐标从顶部的0开始，向下增加。左上角的像素位于坐标(0, 0)。如果您的屏幕分辨率为 1920 x 1080，则右下角的像素将为(1919, 1079)，因为坐标从0开始，而不是1。坐标系如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0,0       X increases --&gt;
+---------------------------+
|                           | Y increases
|                           |     |
|   1920 x 1080 screen      |     |
|                           |     V
|                           |
|                           |
+---------------------------+ 1919, 1079
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-一般函数" tabindex="-1"><a class="header-anchor" href="#_2-一般函数" aria-hidden="true">#</a> 2 一般函数</h2><p>屏幕分辨率大小由size()函数作为两个整数的元组返回。鼠标光标的当前X和Y坐标由position()函数返回。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 获取当前鼠标位置
print(pyautogui.position())
# 获取当前屏幕的分辨率
print(pyautogui.size())
# 判断某个坐标是否在屏幕上
x=10
y=20
print(pyautogui.onScreen(x, y)) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-故障保险" tabindex="-1"><a class="header-anchor" href="#_3-故障保险" aria-hidden="true">#</a> 3 故障保险</h2><p>在每次调用PyAutoGUI的函数后设置2.5秒的暂停：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 暂停2.5s
pyautogui.PAUSE = 2.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，为了防止程序出问题，当鼠标移动到屏幕左上角，会引发pyautogui.FailSafeException错误进而中止程序。关闭命令如下（不建议关闭）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pyautogui.FAILSAFE = False
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-鼠标函数" tabindex="-1"><a class="header-anchor" href="#_4-鼠标函数" aria-hidden="true">#</a> 4 鼠标函数</h2><p>和图像坐标系一样，屏幕左上角的坐标点为(0, 0)，X向右增加，Y向下增加。</p><h3 id="_4-1-鼠标移动" tabindex="-1"><a class="header-anchor" href="#_4-1-鼠标移动" aria-hidden="true">#</a> 4.1 鼠标移动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 用num_seconds(秒)将鼠标移动到(x,y)位置
x = 200
y = 100
num_seconds = 1
pyautogui.moveTo(x, y, duration=num_seconds)  

# 用num_seconds(秒)将鼠标从当前位置向右移动xOffset，向下移动yOffset
# 如果duration为0或未指定，则立即移动。
xOffset = 30
yOffset = -50
num_seconds = 0.5
pyautogui.moveRel(xOffset, yOffset, duration=num_seconds) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-鼠标拖动" tabindex="-1"><a class="header-anchor" href="#_4-2-鼠标拖动" aria-hidden="true">#</a> 4.2 鼠标拖动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 用num_seconds(秒)将鼠标推动到(x,y)位置
# 鼠标拖动是指按下鼠标左键移动鼠标。
x = 200
y = 100
num_seconds= 1
pyautogui.dragTo(x, y, duration=num_seconds)  

# 用num_seconds(秒)将鼠标从当前位置向右拖动xOffset，向下推动yOffset
xOffset = 30
yOffset = -50
num_seconds = 0.5
pyautogui.dragRel(xOffset, yOffset, duration=num_seconds) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-鼠标单击" tabindex="-1"><a class="header-anchor" href="#_4-3-鼠标单击" aria-hidden="true">#</a> 4.3 鼠标单击</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 将鼠标移动到(moveToX,moveToY)位置，点击鼠标num_of_clicks次，每次点击间隔secs_between_clicks秒
# button表示单击方式，&#39;left&#39;左键单击，&#39;middle&#39;中键单击，&#39;right&#39;右键单击
moveToX = 500
moveToY = 600
num_of_clicks = 1
secs_between_clicks = 1
pyautogui.click(x=moveToX, y=moveToY, clicks=num_of_clicks, interval=secs_between_clicks, button=&#39;left&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有的鼠标点击都可以用click()完成，但也存在一些函数是为了方便阅读，如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>moveToX = 10
moveToY = 20
# 右键单击
pyautogui.rightClick(x=moveToX + 50, y=moveToY)
# 中键单击
pyautogui.middleClick(x=moveToX + 50, y=moveToY)
# 左键双击
pyautogui.doubleClick(x=moveToX + 50, y=moveToY)
# 左键三击
pyautogui.tripleClick(x=moveToX + 50, y=moveToY)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-鼠标滚动" tabindex="-1"><a class="header-anchor" href="#_4-4-鼠标滚动" aria-hidden="true">#</a> 4.4 鼠标滚动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>moveToX = 100
moveToY = 200
# 鼠标在当前位置向下滑动100格
# pyautogui.scroll(clicks=-100)
# 鼠标移动到(moveToX,moveToY)位置，然后向上滚动150格
pyautogui.scroll(clicks=150, x=moveToX, y=moveToY)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5-鼠标按下" tabindex="-1"><a class="header-anchor" href="#_4-5-鼠标按下" aria-hidden="true">#</a> 4.5 鼠标按下</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 鼠标移动到(moveToX,moveToY)位置，鼠标左键按下
pyautogui.mouseDown(x=moveToX, y=moveToY, button=&#39;left&#39;)
# 鼠标移动到(moveToX,moveToY)位置，鼠标右键松开（按下右键的情况下）
pyautogui.mouseUp(x=moveToX, y=moveToY, button=&#39;right&#39;)
# 鼠标在当前位置，按下中键
pyautogui.mouseDown(button=&#39;middle&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6-缓动-渐变-tween-easing-函数" tabindex="-1"><a class="header-anchor" href="#_4-6-缓动-渐变-tween-easing-函数" aria-hidden="true">#</a> 4.6 缓动/渐变（Tween / Easing）函数</h3><p>缓动/渐变函数的作用是让光标的移动更炫。如果你不需要用到的话，你可以忽略这些。PyAutoGUI有30种缓动/渐变函数，可以通过以下函数查看</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>print(pyautogui.ease*?)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常用缓动/渐变函数使用示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>moveToX = 100
moveToY = 100
# #开始慢，结束快
pyautogui.moveTo(moveToX + 5 , moveToY+ 45, 2, pyautogui.easeInQuad)  
# 开始快，结束慢   
pyautogui.moveTo(moveToX + 15, moveToY+ 35, 2, pyautogui.easeOutQuad) 
# 快速开始和结束，中间缓慢
pyautogui.moveTo(moveToX + 25, moveToY+ 25, 2, pyautogui.easeInOutQuad)  
# 最后反弹
pyautogui.moveTo(moveToX + 35, moveToY+ 15, 2, pyautogui.easeInBounce)  
# 反复横跳
pyautogui.moveTo(moveToX + 45, moveToY+ 5, 2, pyautogui.easeInElastic) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-键盘函数" tabindex="-1"><a class="header-anchor" href="#_5-键盘函数" aria-hidden="true">#</a> 5 键盘函数</h2><h3 id="_5-1-文字输入" tabindex="-1"><a class="header-anchor" href="#_5-1-文字输入" aria-hidden="true">#</a> 5.1 文字输入</h3><p>键盘控制文字输入的主要函数就是typewrite()/write()。这个函数可以实现字符输入，可以用interval参数设置两次输入间时间间隔。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在当前位置输入文字text，每个字符输入间隔secs_between_keys秒
# \\n表示换行
text = &#39;Hello world!\\n&#39;
secs_between_keys = 0.1
pyautogui.typewrite(message=text, interval=secs_between_keys)  
# 在当前位置按下键盘各种键
pyautogui.typewrite([&#39;\\t&#39;, &#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;left&#39;, &#39;backspace&#39;, &#39;enter&#39;, &#39;f1&#39;,&#39;\\n&#39;], interval=secs_between_keys)
# 查看所有支持按键
print(pyautogui.KEYBOARD_KEYS)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-快捷键" tabindex="-1"><a class="header-anchor" href="#_5-2-快捷键" aria-hidden="true">#</a> 5.2 快捷键</h3><p>通过keyDown/keyUp按下或者松开键盘，通过hotkey执行快捷键操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># ctrl+c 复制文字
pyautogui.hotkey(&#39;ctrl&#39;, &#39;c&#39;)  
# ctrl+v 粘贴文字
pyautogui.hotkey(&#39;ctrl&#39;, &#39;v&#39;) 

# 按下ctrl键
pyautogui.keyDown(&#39;ctrl&#39;)
# 按下v键，相当文字粘贴
pyautogui.keyDown(&#39;v&#39;)
# 松开ctrl键盘
pyautogui.keyUp(&#39;ctrl&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然可以使用press()函数设置按下某个键再释放某个键，如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#  按下shift键
pyautogui.keyDown(&#39;shift&#39;)
pyautogui.press(&#39;left&#39;)
pyautogui.press(&#39;left&#39;)
pyautogui.press(&#39;left&#39;)
#  松开shift键
pyautogui.keyUp(&#39;shift&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时也可以和typewrite()函数一样，用数组把一组键传入press()，或者设置press按压次数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 按下三个left键
pyautogui.press([&#39;left&#39;, &#39;left&#39;, &#39;left&#39;])
# 按left键五次
pyautogui.press(&#39;left&#39;, presses=5)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-hold-上下文管理器" tabindex="-1"><a class="header-anchor" href="#_5-3-hold-上下文管理器" aria-hidden="true">#</a> 5.3 hold()上下文管理器</h3><p>hold()函数可以用作上下文管理器，并从pyautogui.KEYBOARD_KEYS传递一个字符串，并且该键将在上下文块的持续时间内保持。示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 按住shift
with pyautogui.hold(&#39;shift&#39;):
    # 连续按left,然后松开shift
    pyautogui.press([&#39;left&#39;, &#39;left&#39;, &#39;left&#39;])

# 上面代码功能和下面代码实现功能相同
# 按下shift键
pyautogui.keyDown(&#39;shift&#39;)
pyautogui.press(&#39;left&#39;)
pyautogui.press(&#39;left&#39;)
pyautogui.press(&#39;left&#39;)
# 松开shift键
pyautogui.keyUp(&#39;shift&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-消息框函数" tabindex="-1"><a class="header-anchor" href="#_6-消息框函数" aria-hidden="true">#</a> 6 消息框函数</h2><p>如果你需要暂停程序直到用户点击确定，或者想向用户显示一些信息，可以使用消息框函数。这里消息框函数的使用方式和javascript一样。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 警告窗口
alert_result = pyautogui.alert(&#39;点击确定返回字符串OK&#39;)
# 确认窗口
confirm_result = pyautogui.confirm(&#39;点击确定返回字符串OK，点击取消返回字符串Cancel&#39;)
# 点击ok保存输入的文字，点击Cancel返回None
prompt_result = pyautogui.prompt(&#39;输入文字&#39;)
# 点击ok保存输入的密码，点击Cancel返回None
# default默认文字，mask用什么符号代替输入的密码
password_result = pyautogui.password(text=&#39;&#39;, title=&#39;&#39;, default=&#39;&#39;, mask=&#39;*&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-截图函数" tabindex="-1"><a class="header-anchor" href="#_7-截图函数" aria-hidden="true">#</a> 7 截图函数</h2><p>PyAutoGUI使用Pillow/PIL库实现图像的处理。在Linux上，您必须运行以下命令安装scrot库才能使用屏幕截图功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo apt-get install scrot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-1-截屏" tabindex="-1"><a class="header-anchor" href="#_7-1-截屏" aria-hidden="true">#</a> 7.1 截屏</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 截屏返回result对象
result = pyautogui.screenshot()
# result是PIL中的Image对象
print(type(result))
# 保存图像
result.save(&#39;result1.jpg&#39;)
# 展示图片
#result.show()

# imageFilename参数设置文件保存为止，在截屏前保存图片到本地foo.png文件
# region设置截图区域[x,y,w,h]，以(x,y)为左上角顶点，截宽w，高h的区域
result = pyautogui.screenshot(imageFilename=&#39;result2.jpg&#39;,region=[10,20,100,50])

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-图像定位" tabindex="-1"><a class="header-anchor" href="#_7-2-图像定位" aria-hidden="true">#</a> 7.2 图像定位</h3><p>PyAutoGUI提供了多个定位函数。都是从左上角原点开始向右向下搜索截图位置。具体如下：</p><ul><li>locateOnScreen(image, grayscale=False)：在屏幕中，返回和image图片最类似区域的坐标(left, top, width, height)，如果没找到返回None。grayscale设置是否灰度查找。</li><li>locateCenterOnScreen(image, grayscale=False)：在屏幕中，返回和image图片最类似区域的中心坐标(x, y)，如果没找到返回None。</li><li>locateAllOnScreen(image, grayscale=False)：在屏幕中，返回和image图片所有类似区域的坐标(left, top, width, height)的生成器</li><li>locate(needleImage, haystackImage, grayscale=False)：在haystackImage中，返回和image图片最类似区域的坐标(left, top, width, height)。</li><li>locateAll(needleImage, haystackImage, grayscale=False)：在haystackImage中，返回和image图片所有类似区域的坐标(left, top, width, height)的生成器。</li></ul><p>官方说在1920x1080屏幕上，screenshot()函数大约需要100毫秒。但实测图像定位需要花费3秒左右，而且常常找不到图片相似区域。可选的confidence关键字参数指定函数在屏幕上定位图像的准确性。如果由于像素差异可忽略不计，函数无法定位图像，调低confidence将提高查找命中结果。但是需要安装OpenCV才能使confidence关键字工作。</p><p>图像定位函数基础使用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在屏幕返回和result1.jpg图片类似的区域坐标，返回值(左上角x坐标，左上角y坐标，宽度，高度)
# 如果没找到返回None
result = pyautogui.locateOnScreen(&#39;result1.jpg&#39;)
# 在屏幕返回和result1.jpg图片类似的区域中间位置的XY坐标,confidence返回区域最低置信度
result = pyautogui.locateCenterOnScreen(&#39;result1.jpg&#39;, confidence=0.9)
# 为查找图片找到的所有位置返回一个生成器
results = pyautogui.locateAllOnScreen(&#39;result1.jpg&#39;, confidence=0.6)
print(results)
# 打印各组的(左上角x坐标，左上角y坐标，宽度，高度)
for i in results:
    print(i)
# 将结果保存为list
list_result = list(pyautogui.locateAllOnScreen(&#39;result1.jpg&#39;, confidence=0.6)

# 在haystackImage中，返回和image图片最类似区域的坐标
result = pyautogui.locate(needleImage=&#39;result1.jpg&#39;, haystackImage=&#39;result.jpg&#39;, confidence=0.5)
# 在haystackImage中，返回和image图片所有类似区域的坐标(left, top, width, height)
result = pyautogui.locateAll(needleImage=&#39;result1.jpg&#39;, haystackImage=&#39;result.jpg&#39;, confidence=0.5)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些“定位”功能相当昂贵；他们可能需要整整几秒钟的时间才能运行。加速它们的最好方法是传递一个region参数（一个（左、上、宽、高）的4整数元组）来只搜索屏幕的较小区域而不是全屏。但是这个region区域必须比待搜索截图区域大，否则会引发错误。代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>result = pyautogui.locateOnScreen(&#39;result1.jpg&#39;, region=(0,0, 300, 400))
result = pyautogui.locate(needleImage=&#39;result1.jpg&#39;, haystackImage=&#39;result.jpg&#39;, confidence=0.5, region=(0,0, 300, 400))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以传递grayscale=True给定位函数以提供轻微的加速（大约30%左右）。这会降低图像和屏幕截图的颜色饱和度，加快定位速度，但可能会导致误报匹配。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>result_location = pyautogui.locateOnScreen(&#39;result.jpg&#39;, grayscale=True,confidence=0.6)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外要获取截屏某个位置的RGB像素值，可以用PIL中Image对象的getpixel()方法，也可以用PyAutoGUI的pixel()函数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>im = pyautogui.screenshot()
print(im.getpixel((100, 200)))
print(pyautogui.pixel(100, 200))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您只需要验证单个像素是否与给定像素匹配，请调用该pixelMatchesColor()函数，并将其表示的颜色的X坐标、Y坐标和RGB元组传递给它：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 颜色匹配
pyautogui.pixelMatchesColor(100, 200, (255, 255, 255))
# tolerance参数可以指定红、绿、蓝3种颜色误差范围
pyautogui.pixelMatchesColor(100, 200, (248, 250, 245), tolerance=10)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-参考" tabindex="-1"><a class="header-anchor" href="#_8-参考" aria-hidden="true">#</a> 8 参考</h2>`,69),g={href:"https://github.com/asweigart/pyautogui",target:"_blank",rel:"noopener noreferrer"},b={href:"https://pyautogui.readthedocs.io/en/latest/quickstart.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/asweigart/pyautogui/blob/master/docs/simplified-chinese.ipynb",target:"_blank",rel:"noopener noreferrer"};function x(y,_){const n=d("ExternalLinkIcon");return t(),r("div",null,[c,e("p",null,[i("但是PyAutoGUI只能处理主屏幕，双屏幕不支持。也无法确定当前键盘某个键是否被按下。本文是使用PyAutoGU的快速入门教程，您可以控制鼠标和键盘以及执行基本的图像识别来自动执行计算机上的任务。pyautogui的官方地址为"),e("a",v,[i("pyautogui官方仓库"),a(n)]),i("。更多教程见：")]),e("ul",null,[e("li",null,[e("a",o,[i("pyautogui英文教程"),a(n)])]),e("li",null,[e("a",m,[i("pyautogui中文教程"),a(n)])])]),p,e("ul",null,[e("li",null,[e("a",g,[i("pyautogui官方仓库"),a(n)])]),e("li",null,[e("a",b,[i("pyautogui英文教程"),a(n)])]),e("li",null,[e("a",h,[i("pyautogui中文教程"),a(n)])])])])}const T=l(u,[["render",x],["__file","2021-12-21-_常用工具_ PyAutoGUI使用教程.html.vue"]]);export{T as default};
