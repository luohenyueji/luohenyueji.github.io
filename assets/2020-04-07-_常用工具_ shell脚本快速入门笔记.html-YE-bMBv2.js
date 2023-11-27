import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as a,c as r,a as e,b as d,d as n,e as l}from"./app-MsA2k2kn.js";const v={},u=l(`<h1 id="常用工具-shell脚本快速入门笔记" tabindex="-1"><a class="header-anchor" href="#常用工具-shell脚本快速入门笔记" aria-hidden="true">#</a> [常用工具] shell脚本快速入门笔记</h1><p>Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 脚本（shell script），是一种为 shell 编写的脚本程序。业界所说的 shell 通常都是指 shell 脚本，但要知道，shell 和 shell script 是两个不同的概念。</p><h2 id="_1-变量的定义和使用" tabindex="-1"><a class="header-anchor" href="#_1-变量的定义和使用" aria-hidden="true">#</a> 1 变量的定义和使用</h2><h3 id="常用函数" tabindex="-1"><a class="header-anchor" href="#常用函数" aria-hidden="true">#</a> 常用函数</h3><table><thead><tr><th>形式</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>#</td><td>注释</td><td></td></tr><tr><td>echo</td><td>用于向窗口输出文本</td><td></td></tr><tr><td>$0</td><td>显示当前程序的名称</td><td></td></tr><tr><td>$*</td><td>显示所有输入的参数</td><td></td></tr><tr><td>$n</td><td>显示程序输入第n个参数</td><td>如输入n=1，表示输入的第一个参数</td></tr><tr><td>$#</td><td>显示输入参数的个数</td><td></td></tr><tr><td>$?</td><td>显示命令执行的状态</td><td>返回0代表成功，返回其他代表失败</td></tr></tbody></table><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><p>在linux命令行下输入以下命令。打印出/bin/bash</p><blockquote><p>echo $Bash</p></blockquote><p>通过建立demo.sh文件来建立shell脚本。shell中第一行一般都是#！/bin/bash表示引入环境，其他时候#表示注释。shell中分为环境变量和局部变量。常用变量定义如使用具体如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

# 打印hello world
echo &quot;hello world!&quot;

# 定义变量,=左右不能有空格:
A=10

# 通过$引用变量
echo $A

# 输出当前路径
echo $PWD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hello world!
10
/home/hello/test/makes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在命令行下通过两种方式来执行demo.sh文件</p><ol><li>需要获得linux文件权限</li></ol><blockquote><p>chmod 777 demo.sh ./demo.sh</p></blockquote><ol start="2"><li>不需要权限</li></ol><blockquote><p>/bin/bash demo.sh</p></blockquote><h3 id="常用变量" tabindex="-1"><a class="header-anchor" href="#常用变量" aria-hidden="true">#</a> 常用变量</h3><p>shell中还有许多常用变量，在demo.sh中添加以下内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 输出当前文件名称
echo $0

# 显示从命令行传入的第一个参数，空格分界
echo $1

# 显示从命令行传入的第二个参数
echo $2

# 输出命令环境变量

# $输出字符，需要转义
# 显示命令执行的状态
echo &quot;本文件输入\\$结果为： $?&quot;

# 显示输入参数的个数
echo &quot;本文件输入#结果为： $#&quot;

# 显示所有输入的参数
echo &quot;本文件输入*结果为： $*&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行输入./demo.sh param1 param2，输出结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./demo.sh
param1
param2
本文件输入$结果为： 0
本文件输入#结果为： 2
本文件输入*结果为： param1 param2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然也可以在命令行直接shell变量。如下命令命令行输入， 返回表示变量0表示执行成功</p><blockquote><p>echo 123 $?<br> 输出 123 0</p></blockquote><p>但是在命令行中直接输入以下命令echo $?，表示命令行输入上一个命令是否成功。会返回非0值，表示执行失败</p><blockquote><p>echo $? 输出 127</p></blockquote><h2 id="_2-循环与文件读写" tabindex="-1"><a class="header-anchor" href="#_2-循环与文件读写" aria-hidden="true">#</a> 2 循环与文件读写</h2><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h3><p>shell脚本中for循环的语法如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for 变量 in 字符串
do 
    语句
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行输入下述命令可以遍历1到15</p><blockquote><p>seq 1 15</p></blockquote><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过for循环可以获得同样功能。在shell脚本中引入反引号可以调用系统命令，反引号\`\`(位于按键1左边)括起来的字符串被shell解释为命令行，在执行时，shell首先执行该命令行，并以它的标准输出结果取代整个反引号（包括两个反引号）部分。 建立demo.sh文件，键入以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
for i in \`seq 1 15\`
do
    echo &quot;当前数值 $i&quot;
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>当前数值 1
当前数值 2
当前数值 3
当前数值 4
当前数值 5
当前数值 6
当前数值 7
当前数值 8
当前数值 9
当前数值 10
当前数值 11
当前数值 12
当前数值 13
当前数值 14
当前数值 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于shell脚本不能直接累加，需要使用expr命令。shell中expr命令是一个手工命令行计数器，命令行输入：</p><blockquote><p>expr 12+13</p></blockquote><p>结果如下：</p><blockquote><p>12+13</p></blockquote><p>expr后面需要加空格才能正确输出结果</p><blockquote><p>expr 12 + 13</p></blockquote><p>结果如下：</p><blockquote><p>25</p></blockquote><p>通过expr命令，可以进行累加计算，更改demo.sh内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
j=0
for((i=0;i&lt;=100;i++))
do
    j=\`expr $i + $j\`
done
echo &quot;j的值为：&quot; $j
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>j的值为： 5050
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令行输入以下命令将当前所有文件打包为tgz文件</p><blockquote><p>tar czf all.tgz *</p></blockquote><p>通过以下命令查找后缀为.sh的文件</p><blockquote><p>find . -name &#39;*.sh&#39;</p></blockquote><p>但是不能压缩指定文件。编写shell脚本，可以将当前目录和子目录下所有.sh文件压缩到result.tgz中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
for i in \`find . -name &quot;*.sh&quot;\`
do
    tar -uf result.tgz $i
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> while循环</h3><p>shell脚本中while循环的语法如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>while 条件语句
do
    语句
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>循环打印0到10的demo.sh内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
i=0
while((i&lt;10))
do
    echo $i
    i=\`expr $i + 1\`
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
1
2
3
4
5
6
7
8
9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外也可通过for循环和read命令，读取当前目录text.txt中的内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash
while read line
do
    echo $line
done&lt;./text.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hello
world
!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-if-语句" tabindex="-1"><a class="header-anchor" href="#_3-if-语句" aria-hidden="true">#</a> 3 if 语句</h2><p>shell中if语句的语法有两种，分别如下：</p><ol><li>第一种</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(表达式);
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>第二种<br> 语句之前要有tab键，不能是空格，空格在shell语句中代表分割的特殊语义。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(表达式);then
    语句
else
    语句
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如判断两个变量大小的shell脚本实现如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

# 定义两个变量
NUM1=100
NUM2=200

if(($NUM1&gt;$NUM2));then
	echo &quot;NUM1 &gt; NUM2&quot;
else
	echo &quot;NUM1 &lt; NUM2&quot;	
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NUM1 &lt; NUM2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>shell中还有很多逻辑运算符，具体如下：</p><table><thead><tr><th>形式</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>-f</td><td>判断文件是否存在</td><td></td></tr><tr><td>-d</td><td>判断目录是否存在</td><td></td></tr><tr><td>-eg</td><td>等于</td><td></td></tr><tr><td>-ne</td><td>不等于比较</td><td></td></tr><tr><td>-le</td><td>小于比较</td><td></td></tr><tr><td>-ge</td><td>大于或等于</td><td></td></tr><tr><td>-a</td><td>双方都成立</td><td></td></tr><tr><td>-o</td><td>单方成立</td><td></td></tr></tbody></table><p>例如判断指定目录是否存在，不存在就创建目录的shell脚本为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

test=./test
# 判断test目录是否存在
if [ ! -d test ];then
	# 创建文件夹
	mkdir -p ./test
else
	echo &quot;目录已经存在&quot;
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,81),c={href:"https://blog.csdn.net/HappyRocking/article/details/90609554#_69",target:"_blank",rel:"noopener noreferrer"},b=l(`<h2 id="_4-运算符" tabindex="-1"><a class="header-anchor" href="#_4-运算符" aria-hidden="true">#</a> 4 运算符</h2><h3 id="算法运算符" tabindex="-1"><a class="header-anchor" href="#算法运算符" aria-hidden="true">#</a> 算法运算符</h3><p>常用算数运算符如下，注意运算符的表达式要放在[]里面，并且运算符前后要空格。</p><table><thead><tr><th>运算符</th><th>说明</th><th>举例</th><th>备注</th></tr></thead><tbody><tr><td>+</td><td>加法</td><td>expr 1 + 2</td><td>结果为3</td></tr><tr><td>-</td><td>减法</td><td>expr 1 - 2</td><td>结果为-1</td></tr><tr><td>*</td><td>乘法</td><td>expr 1 * 2</td><td>结果为2</td></tr><tr><td>/</td><td>除法</td><td>expr 1 / 2</td><td>结果为0</td></tr><tr><td>%</td><td>取余</td><td>expr 1 % 2</td><td>结果为1</td></tr><tr><td>=</td><td>赋值</td><td>a=$b</td><td>把变量b的值赋给a</td></tr><tr><td>==</td><td>相等</td><td>&amp;a == $b</td><td>比较两个数字是否相等，返回true或者false</td></tr><tr><td>!=</td><td>不相等</td><td>&amp;a != $b</td><td>比较两个数字是否不同，返回true或者false</td></tr></tbody></table><h3 id="关系运算符" tabindex="-1"><a class="header-anchor" href="#关系运算符" aria-hidden="true">#</a> 关系运算符</h3><p>常用算数运算符如下</p><table><thead><tr><th>运算符</th><th>说明</th></tr></thead><tbody><tr><td>-eq</td><td>检测两个数是否相等</td></tr><tr><td>-ne</td><td>间隔两个数是否不相等</td></tr><tr><td>-gt</td><td>检测左边的数是否大于右边</td></tr><tr><td>-lt</td><td>检测右边的数是否大于左边</td></tr><tr><td>-ge</td><td>检测左边的数是否大于等于右边</td></tr><tr><td>-le</td><td>检测左边的数是否小于等于右边</td></tr></tbody></table><h3 id="布尔运算符与逻辑运算符" tabindex="-1"><a class="header-anchor" href="#布尔运算符与逻辑运算符" aria-hidden="true">#</a> 布尔运算符与逻辑运算符</h3><table><thead><tr><th>运算符</th><th>说明</th></tr></thead><tbody><tr><td>!</td><td>非运算</td></tr><tr><td>-o</td><td>或运算</td></tr><tr><td>-a</td><td>与运算</td></tr><tr><td>&amp;&amp;</td><td>逻辑的AND</td></tr><tr><td>||</td><td>逻辑的OR</td></tr></tbody></table><h3 id="字符串运算符" tabindex="-1"><a class="header-anchor" href="#字符串运算符" aria-hidden="true">#</a> 字符串运算符</h3><table><thead><tr><th>运算符</th><th>说明</th></tr></thead><tbody><tr><td>=</td><td>检测两个字符串是否相等</td></tr><tr><td>！=</td><td>检测两个字符串是否不相等</td></tr><tr><td>-z</td><td>检测字符串长度是否为0</td></tr><tr><td>-n</td><td>检测字符串长度是否不为0</td></tr><tr><td>$</td><td>检测字符串是否为空</td></tr></tbody></table><h2 id="_5-重定向" tabindex="-1"><a class="header-anchor" href="#_5-重定向" aria-hidden="true">#</a> 5 重定向</h2><p>重定向表示改变输入和输出的方式，重定向分为两种，一种输入重定向，一种是输出重定向。输出重定向的方式为&gt;，输入重定向的方式为&lt;。0代表从标准输入(默认键盘)，1代表标准输出(默认显示屏)，2代表错误输出(默认显示屏)。</p><p>比如下面命令表示将text.txt内容输入到屏幕0</p><blockquote><p>cat 0&lt; text.txt</p></blockquote><p>下面命令表示&quot;hello world&quot;输出到file.txt文件</p><blockquote><p>echo &quot;hello world&quot; &gt; file.txt</p></blockquote><h2 id="_6-函数" tabindex="-1"><a class="header-anchor" href="#_6-函数" aria-hidden="true">#</a> 6 函数</h2><p>liunx shell中的函数和大部分编程语言中的函数一样将代码封装到函数，供其他地方调用。 定义函数有两种方式：</p><ul><li>方式1</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name()
{
    command;
    command2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方式2</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ function ] funname [()]
{
    action;
    [return int;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如定义一个test函数，打印hello world的shell脚本如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

function test()
{
	output=&quot;hello world&quot;
	echo $output
}

# 调用test函数
test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是在shell中函数没有形参，我们可以通过$n获得传入的参数。如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

function test()
{
	# 读取传入的参数
	output=$1
	echo $output
}

# 调用test函数
test &quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计算阶乘的函数的shell脚本如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

n=1;


factorial(){
for((i=1;i&lt;=$1;i++))
do
	n=$[$n * $i]	
done

echo &quot;$1的阶乘是$n&quot;
}

# $1从外界传入参数
factorial $1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行./demo.sh 3，结果为</p><blockquote><p>3的阶乘是6</p></blockquote><p>执行./demo.sh 10，结果为</p><blockquote><p>10的阶乘是3628800</p></blockquote><p>对于shell脚本的函数，只能返回状态码0到255。使用如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 只能返回状态码0到255
fun()
{
# 从键盘读取输入的数值，将结果保存在num中
read -p &quot;请输入数值：&quot; num
}

fun
# $?表示上一条指令执行的结果
echo &quot;fun的返回值为：$?&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请输入数值：10
fun的返回值为：0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是可以用return自定义返回结果，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

# 只能返回状态码0到255
fun()
{
# 从键盘读取输入的数值，将结果保存在num中
read -p &quot;请输入数值：&quot; num
return $[ 2 * num ]
}

fun
# $?表示上一条指令执行的结果
echo &quot;fun的返回值为：$?&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请输入数值：10
fun的返回值为：20
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是自定义会返回值不能大于255，如执行函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>请输入数值：200
fun的返回值为：144
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-推荐阅读" tabindex="-1"><a class="header-anchor" href="#_7-推荐阅读" aria-hidden="true">#</a> 7 推荐阅读</h2>`,44),o={href:"https://www.runoob.com/linux/linux-shell.html",target:"_blank",rel:"noopener noreferrer"},m={href:"http://c.biancheng.net/linux_tutorial/100/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.jb51.net/article/161028.htm",target:"_blank",rel:"noopener noreferrer"};function p(x,g){const i=s("ExternalLinkIcon");return a(),r("div",null,[u,e("p",null,[d("其中需要用[]表示条件判断。shell中各种括号用法见： "),e("a",c,[d("shell中各种括号(),[],(()),[[]],{}等的作用大全及示例 "),n(i)])]),b,e("ul",null,[e("li",null,[e("a",o,[d("Shell教程"),n(i)])]),e("li",null,[e("a",m,[d("Shell基础详解"),n(i)])]),e("li",null,[e("a",h,[d("Shell脚本编程30分钟入门(小结)"),n(i)])])])])}const _=t(v,[["render",p],["__file","2020-04-07-_常用工具_ shell脚本快速入门笔记.html.vue"]]);export{_ as default};
