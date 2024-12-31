import{_ as t,r as p,o as i,c as r,a as n,b as a,d as e,e as l}from"./app-DtrmxRee.js";const o={},c=l(`<h1 id="编程基础-python命令行解析库argparse学习笔记" tabindex="-1"><a class="header-anchor" href="#编程基础-python命令行解析库argparse学习笔记"><span>[编程基础] Python命令行解析库argparse学习笔记</span></a></h1><p>Python argparse教程展示了如何使用argparse模块解析Python中的命令行参数。</p><h2 id="_1-使用说明" tabindex="-1"><a class="header-anchor" href="#_1-使用说明"><span>1 使用说明</span></a></h2><p>argparse模块使编写用户友好的命令行界面变得容易。它从中解析定义的参数sys.argv。该模块还自动生成帮助和用法消息，并在用户为程序提供无效参数时发出错误。使用ArgumentParser创建分析器，并使用add_argument()添加新参数变量。参数可以是optional（可选）, required（必须）, or positional(位置)。add_argument()中的常用参数设定值如下所示：</p><ul><li>name or flags，输入参数的名字或者列表，例如 foo 或者 -f, --foo；</li><li>action，命令行遇到参数时的动作，默认值是 store； <ul><li>store_const，表示赋值为const；</li><li>append，将输入的值存储成列表，也就是如果参数重复则会保存多个值;</li><li>append_const，将参数规范中定义的一个值保存到一个列表；</li><li>count，存储遇到的次数；</li></ul></li><li>nargs，应该读取的命令行参数个数；</li><li>const，action 和 nargs 所需要的常量值；</li><li>defaul，参数的默认值；</li><li>type，命令行参数应该被转换成的类型；</li><li>choices，可用的参数集合；</li><li>required，该参数为必选输入参数；</li><li>help，帮助说明；</li><li>metavar，输入参数的替代名</li><li>dest，被添加到 parse_args()所返回对象上的属性名；</li></ul><h3 id="_1-1-python-argparse可选参数" tabindex="-1"><a class="header-anchor" href="#_1-1-python-argparse可选参数"><span>1.1 Python argparse可选参数</span></a></h3><p>下面的示例创建test1.py，内容为一个简单的参数解析器。add_argument添加参数-o和--out两个参数，参数效果一样，都是可选参数。前一个为参数简写只有一个字母，后一个为全参数。如果输入参数则输出This is some output。还有一个add_argument还有一个固定参数action=&#39;store_true&#39;，表示命令行遇到参数时的操作，store将参数设为const，默认值是 store。参数用解析parse_args()。解析后的参数作为对象属性存在。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> argparse


parser <span class="token operator">=</span> argparse<span class="token punctuation">.</span>ArgumentParser<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># action 命令行遇到参数时的动作</span>
<span class="token comment"># -o为短参数，--output长参数</span>
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;-o&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;--output&#39;</span><span class="token punctuation">,</span> action<span class="token operator">=</span><span class="token string">&#39;store_true&#39;</span><span class="token punctuation">,</span> <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;shows output&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># parse_args()解析参数</span>
args <span class="token operator">=</span> parser<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 如果存在output</span>
<span class="token keyword">if</span> args<span class="token punctuation">.</span>output<span class="token punctuation">:</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;This is some output&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;This is not some output&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 执行test1.py文件</span>
<span class="token comment"># 输入--output参数</span>
!python test1<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>output
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 输入-o参数</span>
!python test1<span class="token punctuation">.</span>py <span class="token operator">-</span>o
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 什么都不输入</span>
!python test1<span class="token punctuation">.</span>py
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 输入--help参数</span>
!python test1<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span><span class="token builtin">help</span>
!python test1<span class="token punctuation">.</span>py <span class="token operator">-</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>This is some output
--------------------------------------------------
This is some output
--------------------------------------------------
This is not some output
--------------------------------------------------
usage: test1.py [-h] [-o]

optional arguments:
  -h, --help    show this help message and exit
  -o, --output  shows output
usage: test1.py [-h] [-o]

optional arguments:
  -h, --help    show this help message and exit
  -o, --output  shows output
</code></pre><h3 id="_1-2-python-argparse必需参数" tabindex="-1"><a class="header-anchor" href="#_1-2-python-argparse必需参数"><span>1.2 Python argparse必需参数</span></a></h3><p>下面的示例创建test2.py，.add_argument()设定required = True，表示必须参数，该示例必须name指定选项。否则失败。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/bin/env python

import argparse

# 创建解析器
parser = argparse.ArgumentParser()
# 设置--name为必须参数  
parser.add_argument(&#39;--name&#39;, required=True)
# 解析参数
args = parser.parse_args()

print(&#39;Hello {}&#39;.format(args.name))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 执行test2.py文件</span>
<span class="token comment"># 不输入参数</span>
!python test2<span class="token punctuation">.</span>py
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 输入参数</span>
!python test2<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>name hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>usage: test2.py [-h] --name NAME
test2.py: error: the following arguments are required: --name
--------------------------------------------------
Hello hello
</code></pre><h3 id="_1-3-python-argparse位置参数" tabindex="-1"><a class="header-anchor" href="#_1-3-python-argparse位置参数"><span>1.3 Python argparse位置参数</span></a></h3><p>下面的示例创建test3.py，位置参数不需要前缀符号，直接输入参数值。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> argparse

<span class="token comment"># positional args</span>

parser <span class="token operator">=</span> argparse<span class="token punctuation">.</span>ArgumentParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
   
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span>
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;age&#39;</span><span class="token punctuation">)</span>

args <span class="token operator">=</span> parser<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;{} is {} years old&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>name<span class="token punctuation">,</span>args<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>!python test3<span class="token punctuation">.</span>py <span class="token operator">-</span>h
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
!python test3<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>name
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 输入参数</span>
!python test3<span class="token punctuation">.</span>py <span class="token string">&quot;jack&quot;</span> <span class="token number">12</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>usage: test3.py [-h] name age

positional arguments:
  name
  age

optional arguments:
  -h, --help  show this help message and exit
--------------------------------------------------
usage: test3.py [-h] name age
test3.py: error: the following arguments are required: name, age
--------------------------------------------------
jack is 12 years old
</code></pre><h3 id="_1-4-python-argparse-dest" tabindex="-1"><a class="header-anchor" href="#_1-4-python-argparse-dest"><span>1.4 Python argparse dest</span></a></h3><p>dest选项为add_argument()参数指定名称。如果未给出，则从选项中推断出来。下面的示例创建test4.py，将-n的参数名称设定为now。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> argparse

parser <span class="token operator">=</span> argparse<span class="token punctuation">.</span>ArgumentParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
   
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;-n&#39;</span><span class="token punctuation">,</span> dest<span class="token operator">=</span><span class="token string">&#39;now&#39;</span><span class="token punctuation">,</span> action<span class="token operator">=</span><span class="token string">&#39;store_true&#39;</span><span class="token punctuation">,</span> <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;shows now&quot;</span><span class="token punctuation">)</span>

args <span class="token operator">=</span> parser<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># -n代表now</span>
<span class="token keyword">if</span> args<span class="token punctuation">.</span>now<span class="token punctuation">:</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>now<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 运行文件</span>
!python test4<span class="token punctuation">.</span>py <span class="token operator">-</span>n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>True
</code></pre><h3 id="_1-5-python-argparse-type" tabindex="-1"><a class="header-anchor" href="#_1-5-python-argparse-type"><span>1.5 Python argparse type</span></a></h3><p>通过type参数确定参数类型。下面的示例创建test5.py。程序显示从-100到100的n个随机整数。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/bin/env python

import argparse
import random


parser = argparse.ArgumentParser()

# type确定参数的类型值
parser.add_argument(&#39;-n&#39;, type=int, required=True, 
    help=&quot;define the number of random integers&quot;)
args = parser.parse_args()

n = args.n

# 输出随机数
for i in range(n):
    print(random.randint(-100, 100))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 运行程序</span>
!python test5<span class="token punctuation">.</span>py <span class="token operator">-</span>n <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>34
-81
76
-62
-66
</code></pre><h3 id="_1-6-python-argparse-default" tabindex="-1"><a class="header-anchor" href="#_1-6-python-argparse-default"><span>1.6 Python argparse default</span></a></h3><p>default如果未指定该值，则该选项指定默认值。下面的示例创建test6.py。该示例计算指数,不需要指数值；如果未给出，则默认值为2。<strong>如果输入参数没有必选参数，可以直接运行代码输出值；如果想在代码内改变值，直接参数复制即可如arg.b=2。</strong></p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>

<span class="token keyword">import</span> argparse

parser <span class="token operator">=</span> argparse<span class="token punctuation">.</span>ArgumentParser<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># required设置强制性参数，设置输入参数</span>
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;-b&#39;</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token operator">=</span><span class="token builtin">int</span><span class="token punctuation">,</span> required<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;defines the base value&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># default设置默认参数，设置指数值</span>
parser<span class="token punctuation">.</span>add_argument<span class="token punctuation">(</span><span class="token string">&#39;-e&#39;</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token operator">=</span><span class="token builtin">int</span><span class="token punctuation">,</span> default<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token builtin">help</span><span class="token operator">=</span><span class="token string">&quot;defines the exponent value&quot;</span><span class="token punctuation">)</span>
args <span class="token operator">=</span> parser<span class="token punctuation">.</span>parse_args<span class="token punctuation">(</span><span class="token punctuation">)</span>

val <span class="token operator">=</span> <span class="token number">1</span>

base <span class="token operator">=</span> args<span class="token punctuation">.</span>b
exp <span class="token operator">=</span> args<span class="token punctuation">.</span>e

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>exp<span class="token punctuation">)</span><span class="token punctuation">:</span>
    val <span class="token operator">*=</span> base

<span class="token keyword">print</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 使用 默认参数</span>
!python test6<span class="token punctuation">.</span>py <span class="token operator">-</span>b <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 给定默认参数</span>
!python test6<span class="token punctuation">.</span>py <span class="token operator">-</span>b <span class="token number">2</span> <span class="token operator">-</span>e <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>4
--------------------------------------------------
8
</code></pre><h3 id="_1-7-python-argparse-metavar" tabindex="-1"><a class="header-anchor" href="#_1-7-python-argparse-metavar"><span>1.7 Python argparse metavar</span></a></h3><p>metavar选项为错误的期望值命名，并提供帮助输出。下面的示例创建test7.py。该示例设置期望值为value。默认名称是v。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/bin/env python

import argparse

parser = argparse.ArgumentParser()
   
parser.add_argument(&#39;-v&#39;, type=int, required=True, metavar=&#39;value&#39;, 
    help=&quot;computes cube for the given value&quot;)
args = parser.parse_args()

print(args)

val = args.v

print(val * val * val)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>!python test7<span class="token punctuation">.</span>py <span class="token operator">-</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>usage: test7.py [-h] -v value

optional arguments:
  -h, --help  show this help message and exit
  -v value    computes cube for the given value
</code></pre><h3 id="_1-8-python-argparse-append-action" tabindex="-1"><a class="header-anchor" href="#_1-8-python-argparse-append-action"><span>1.8 Python argparse append action</span></a></h3><p>append操作允许对重复选项进行分组。下面的示例创建test8.py。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/bin/env python

import argparse

# append action allows to group repeating
# options

parser = argparse.ArgumentParser()
   
parser.add_argument(&#39;-n&#39;, &#39;--name&#39;, dest=&#39;names&#39;, action=&#39;append&#39;, 
    help=&quot;provides names to greet&quot;)

args = parser.parse_args()

names = args.names

# 分组输出
for name in names:
    print(&#39;Hello {}!&#39;.format(name))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>!python test8<span class="token punctuation">.</span>py <span class="token operator">-</span>n Jack <span class="token operator">-</span>n Rosy <span class="token operator">-</span><span class="token operator">-</span>name Jane
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>Hello Jack!
Hello Rosy!
Hello Jane!
</code></pre><h3 id="_1-9-python-argparse-choices" tabindex="-1"><a class="header-anchor" href="#_1-9-python-argparse-choices"><span>1.9 Python argparse choices</span></a></h3><p>choices选项将参数限制为给定列表。在示例test9.py中，now选项可以接受以下值：1，2，3。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#!/usr/bin/env python

import argparse
import datetime
import time

parser = argparse.ArgumentParser()

parser.add_argument(&#39;--now&#39;, dest=&#39;format&#39;, type=int, choices=[1, 2, 3],help=&quot;shows num in given format&quot;)

args = parser.parse_args()
fmt = args.format

print(fmt)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 输入在可选范围内值</span>
!python test9<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>now <span class="token number">1</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 输入不在可选范围内值</span>
!python test9<span class="token punctuation">.</span>py <span class="token operator">-</span><span class="token operator">-</span>now <span class="token number">4</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;-&#39;</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
<span class="token comment"># 不输入</span>
!python test9<span class="token punctuation">.</span>py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>1
--------------------------------------------------
usage: test9.py [-h] [--now {1,2,3}]
test9.py: error: argument --now: invalid choice: 4 (choose from 1, 2, 3)
--------------------------------------------------
None
</code></pre><h2 id="_2-参考" tabindex="-1"><a class="header-anchor" href="#_2-参考"><span>2 参考</span></a></h2>`,51),d={href:"http://zetcode.com/python/argparse/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.jianshu.com/p/9ac116b59215",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/lly_zy/article/details/97130496",target:"_blank",rel:"noopener noreferrer"};function m(g,h){const s=p("ExternalLinkIcon");return i(),r("div",null,[c,n("ul",null,[n("li",null,[n("a",d,[a("Python argparse tutorial"),e(s)])]),n("li",null,[n("a",u,[a("argparse模块-add_argument方法"),e(s)])]),n("li",null,[n("a",v,[a("add_argument() 的使用方法"),e(s)])])])])}const b=t(o,[["render",m],["__file","2020-10-31-_编程基础_ Python命令行解析库argparse学习笔记.html.vue"]]),y=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-10-31-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20Python%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%A7%A3%E6%9E%90%E5%BA%93argparse%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html","title":"[编程基础] Python命令行解析库argparse学习笔记","lang":"zh-CN","frontmatter":{"date":"2020-10-31T09:13:35.000Z","category":["编程基础"],"tag":["编程基础","Python"],"description":"[编程基础] Python命令行解析库argparse学习笔记 Python argparse教程展示了如何使用argparse模块解析Python中的命令行参数。 1 使用说明 argparse模块使编写用户友好的命令行界面变得容易。它从中解析定义的参数sys.argv。该模块还自动生成帮助和用法消息，并在用户为程序提供无效参数时发出错误。使用Arg...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-10-31-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20Python%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%A7%A3%E6%9E%90%E5%BA%93argparse%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] Python命令行解析库argparse学习笔记"}],["meta",{"property":"og:description","content":"[编程基础] Python命令行解析库argparse学习笔记 Python argparse教程展示了如何使用argparse模块解析Python中的命令行参数。 1 使用说明 argparse模块使编写用户友好的命令行界面变得容易。它从中解析定义的参数sys.argv。该模块还自动生成帮助和用法消息，并在用户为程序提供无效参数时发出错误。使用Arg..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2020-10-31T09:13:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] Python命令行解析库argparse学习笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-10-31T09:13:35.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 使用说明","slug":"_1-使用说明","link":"#_1-使用说明","children":[{"level":3,"title":"1.1 Python argparse可选参数","slug":"_1-1-python-argparse可选参数","link":"#_1-1-python-argparse可选参数","children":[]},{"level":3,"title":"1.2 Python argparse必需参数","slug":"_1-2-python-argparse必需参数","link":"#_1-2-python-argparse必需参数","children":[]},{"level":3,"title":"1.3 Python argparse位置参数","slug":"_1-3-python-argparse位置参数","link":"#_1-3-python-argparse位置参数","children":[]},{"level":3,"title":"1.4 Python argparse dest","slug":"_1-4-python-argparse-dest","link":"#_1-4-python-argparse-dest","children":[]},{"level":3,"title":"1.5 Python argparse type","slug":"_1-5-python-argparse-type","link":"#_1-5-python-argparse-type","children":[]},{"level":3,"title":"1.6 Python argparse default","slug":"_1-6-python-argparse-default","link":"#_1-6-python-argparse-default","children":[]},{"level":3,"title":"1.7 Python argparse metavar","slug":"_1-7-python-argparse-metavar","link":"#_1-7-python-argparse-metavar","children":[]},{"level":3,"title":"1.8 Python argparse append action","slug":"_1-8-python-argparse-append-action","link":"#_1-8-python-argparse-append-action","children":[]},{"level":3,"title":"1.9 Python argparse choices","slug":"_1-9-python-argparse-choices","link":"#_1-9-python-argparse-choices","children":[]}]},{"level":2,"title":"2 参考","slug":"_2-参考","link":"#_2-参考","children":[]}],"git":{},"readingTime":{"minutes":5.38,"words":1613},"filePathRelative":"blog/编程基础/学习笔记/2020-10-31-[编程基础] Python命令行解析库argparse学习笔记.md","localizedDate":"2020年10月31日","excerpt":"\\n<p>Python argparse教程展示了如何使用argparse模块解析Python中的命令行参数。</p>\\n<h2>1 使用说明</h2>\\n<p>argparse模块使编写用户友好的命令行界面变得容易。它从中解析定义的参数sys.argv。该模块还自动生成帮助和用法消息，并在用户为程序提供无效参数时发出错误。使用ArgumentParser创建分析器，并使用add_argument()添加新参数变量。参数可以是optional（可选）, required（必须）, or positional(位置)。add_argument()中的常用参数设定值如下所示：</p>\\n<ul>\\n<li>name or flags，输入参数的名字或者列表，例如 foo 或者 -f, --foo；</li>\\n<li>action，命令行遇到参数时的动作，默认值是 store；\\n<ul>\\n<li>store_const，表示赋值为const；</li>\\n<li>append，将输入的值存储成列表，也就是如果参数重复则会保存多个值;</li>\\n<li>append_const，将参数规范中定义的一个值保存到一个列表；</li>\\n<li>count，存储遇到的次数；</li>\\n</ul>\\n</li>\\n<li>nargs，应该读取的命令行参数个数；</li>\\n<li>const，action 和 nargs 所需要的常量值；</li>\\n<li>defaul，参数的默认值；</li>\\n<li>type，命令行参数应该被转换成的类型；</li>\\n<li>choices，可用的参数集合；</li>\\n<li>required，该参数为必选输入参数；</li>\\n<li>help，帮助说明；</li>\\n<li>metavar，输入参数的替代名</li>\\n<li>dest，被添加到 parse_args()所返回对象上的属性名；</li>\\n</ul>","autoDesc":true}');export{b as comp,y as data};
