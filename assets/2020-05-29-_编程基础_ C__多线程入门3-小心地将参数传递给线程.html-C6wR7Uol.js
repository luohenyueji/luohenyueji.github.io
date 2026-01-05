import{_ as e,c as l,a as n,d,e as a,b as t,o as p,r}from"./app-BOswGe5u.js";const c={};function v(u,s){const i=r("VPIcon");return p(),l("div",null,[s[2]||(s[2]=n(`<h1 id="编程基础-c-多线程入门3-小心地将参数传递给线程" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门3-小心地将参数传递给线程"><span>[编程基础] C++多线程入门3-小心地将参数传递给线程</span></a></h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。</p><h2 id="_3-小心地将参数传递给线程" tabindex="-1"><a class="header-anchor" href="#_3-小心地将参数传递给线程"><span>3 小心地将参数传递给线程</span></a></h2><p>要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造函数。默认情况下，所有参数都复制到新线程的内部存储中。让我们看一个例子：</p><h3 id="_3-1-在c-11中将简单参数传递给std-thread" tabindex="-1"><a class="header-anchor" href="#_3-1-在c-11中将简单参数传递给std-thread"><span>3.1 在c++11中将简单参数传递给std::thread</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;string&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void threadCallback(int x, std::string str)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Passed Number = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Passed String = &quot; &lt;&lt; str &lt;&lt; std::endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = 10;</span></span>
<span class="line"><span>	std::string str = &quot;Sample String&quot;;</span></span>
<span class="line"><span>	std::thread threadObj(threadCallback, x, str);</span></span>
<span class="line"><span>	threadObj.join();</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Passed Number = 10</span></span>
<span class="line"><span>Passed String = Sample String</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-如何不将参数传递给c-11中的线程" tabindex="-1"><a class="header-anchor" href="#_3-2-如何不将参数传递给c-11中的线程"><span>3.2 如何不将参数传递给c++11中的线程</span></a></h3><p>不要将变量的地址从本地堆栈传递到线程的回调函数。因为线程1中的局部变量可能超出了作用域，但是线程2仍然试图通过它的地址访问它。在这种情况下，访问无效地址可能会导致意外行为。例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void newThreadCallback(int * p)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Thread:&quot;&quot;:p = &quot; &lt;&lt; p &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::chrono::milliseconds dura(1000);</span></span>
<span class="line"><span>	std::this_thread::sleep_for(dura);</span></span>
<span class="line"><span>	*p = 19;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void startNewThread()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int i = 10;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Main Thread:&quot;&quot;:i = &quot; &lt;&lt; i &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::thread t(newThreadCallback, &amp;i);</span></span>
<span class="line"><span>	t.detach();</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Main Thread:&quot;&quot;:i = &quot; &lt;&lt; i &lt;&lt; std::endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	startNewThread();</span></span>
<span class="line"><span>	// 表示一段时间，这里是2000 毫秒</span></span>
<span class="line"><span>	std::chrono::milliseconds dura(2000);</span></span>
<span class="line"><span>	// 当前线程休眠一段时间</span></span>
<span class="line"><span>	std::this_thread::sleep_for(dura);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Inside Main Thread::i = 10</span></span>
<span class="line"><span>Inside Thread::p = Inside Main Thread::i = 10</span></span>
<span class="line"><span>000000D9DD5BF4A4</span></span>
<span class="line"><span>程序崩溃</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，将指向堆上内存的指针传递给线程时也要小心。因为在新线程试图访问该存储器之前，某些线程可能会删除该存储器。在这种情况下，访问无效地址可能导致意外行为。例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void newThreadCallback(int * p)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Thread :  &quot;&quot; : p = &quot; &lt;&lt; p &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::chrono::milliseconds dura(1000);</span></span>
<span class="line"><span>	std::this_thread::sleep_for(dura);</span></span>
<span class="line"><span>	*p = 19;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void startNewThread()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int * p = new int();</span></span>
<span class="line"><span>	*p = 10;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Main Thread :  &quot;&quot; : *p = &quot; &lt;&lt; *p &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::thread t(newThreadCallback, p);</span></span>
<span class="line"><span>	t.detach();</span></span>
<span class="line"><span>	delete p;</span></span>
<span class="line"><span>	p = NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	startNewThread();</span></span>
<span class="line"><span>	std::chrono::milliseconds dura(2000);</span></span>
<span class="line"><span>	std::this_thread::sleep_for(dura);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Inside Main Thread :?  : *p = 10</span></span>
<span class="line"><span>Inside Thread :?  : p = 0000024AC61ECEA0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-如何在c-11中传递对std-thread的引用" tabindex="-1"><a class="header-anchor" href="#_3-3-如何在c-11中传递对std-thread的引用"><span>3.3 如何在c++11中传递对std::thread的引用</span></a></h3><p>由于参数被复制到新的线程堆栈，因此，如果您需要以通用方式传递引用，即</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void threadCallback(int const &amp; x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int &amp; y = const_cast&lt;int &amp;&gt;(x);</span></span>
<span class="line"><span>	y++;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Thread x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = 9;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;In Main Thread:Before Thread Start x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::thread threadObj(threadCallback, x);</span></span>
<span class="line"><span>	threadObj.join();</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;In Main Thread:After Thread Joins x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>In Main Thread:Before Thread Start x = 9</span></span>
<span class="line"><span>Inside Thread x = 10</span></span>
<span class="line"><span>In Main Thread:After Thread Joins x = 9</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22)),d("p",null,[s[0]||(s[0]=a("即使threadCallback接受参数作为参考，但所做的更改仍在线程外部不可见。这是因为线程函数threadCallback中的x引用了在新线程的堆栈上复制的临时值。如何解决呢？使用std")),t(i,{icon:"ref()即可。std"}),s[1]||(s[1]=a("ref 用于包装按引用传递的值。"))]),s[3]||(s[3]=n(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>void threadCallback(int const &amp; x)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int &amp; y = const_cast&lt;int &amp;&gt;(x);</span></span>
<span class="line"><span>	y++;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Inside Thread x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int x = 9;</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;In Main Thread : Before Thread Start x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::thread threadObj(threadCallback, std::ref(x));</span></span>
<span class="line"><span>	threadObj.join();</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;In Main Thread : After Thread Joins x = &quot; &lt;&lt; x &lt;&lt; std::endl;</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>In Main Thread : Before Thread Start x = 9</span></span>
<span class="line"><span>Inside Thread x = 10</span></span>
<span class="line"><span>In Main Thread : After Thread Joins x = 10</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-将指向类成员函数的指针分配为线程函数" tabindex="-1"><a class="header-anchor" href="#_3-4-将指向类成员函数的指针分配为线程函数"><span>3.4 将指向类成员函数的指针分配为线程函数</span></a></h3><p>将指针传递给成员函数作为回调函数，并将指针传递给Object作为第二个参数。例如：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>class DummyClass {</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>    DummyClass()</span></span>
<span class="line"><span>    {}</span></span>
<span class="line"><span>    DummyClass(const DummyClass &amp; obj)</span></span>
<span class="line"><span>    {}</span></span>
<span class="line"><span>    void sampleMemberFunction(int x)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        std::cout&lt;&lt;&quot;Inside sampleMemberFunction &quot;&lt;&lt;x&lt;&lt;std::endl;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>    DummyClass dummyObj;</span></span>
<span class="line"><span>    int x = 10;</span></span>
<span class="line"><span>    std::thread threadObj(&amp;DummyClass::sampleMemberFunction,&amp;dummyObj, x);</span></span>
<span class="line"><span>    threadObj.join();</span></span>
<span class="line"><span>    return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Inside sampleMemberFunction 10</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_3-5-参考" tabindex="-1"><a class="header-anchor" href="#_3-5-参考"><span>3.5 参考</span></a></h3><blockquote><p><a href="https://thispointer.com//c11-multithreading-part-4-data-sharing-and-race-conditions/" target="_blank" rel="noopener noreferrer">https://thispointer.com//c11-multithreading-part-4-data-sharing-and-race-conditions/</a></p></blockquote>`,10))])}const b=e(c,[["render",v],["__file","2020-05-29-_编程基础_ C__多线程入门3-小心地将参数传递给线程.html.vue"]]),m=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A83-%E5%B0%8F%E5%BF%83%E5%9C%B0%E5%B0%86%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92%E7%BB%99%E7%BA%BF%E7%A8%8B.html","title":"[编程基础] C++多线程入门3-小心地将参数传递给线程","lang":"zh-CN","frontmatter":{"date":"2020-05-29T16:46:39.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门3-小心地将参数传递给线程 原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。 3 小心地将参数传递给线程 要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A83-%E5%B0%8F%E5%BF%83%E5%9C%B0%E5%B0%86%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92%E7%BB%99%E7%BA%BF%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门3-小心地将参数传递给线程"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门3-小心地将参数传递给线程 原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。 3 小心地将参数传递给线程 要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T16:46:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门3-小心地将参数传递给线程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T16:46:39.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"3 小心地将参数传递给线程","slug":"_3-小心地将参数传递给线程","link":"#_3-小心地将参数传递给线程","children":[{"level":3,"title":"3.1 在c++11中将简单参数传递给std::thread","slug":"_3-1-在c-11中将简单参数传递给std-thread","link":"#_3-1-在c-11中将简单参数传递给std-thread","children":[]},{"level":3,"title":"3.2 如何不将参数传递给c++11中的线程","slug":"_3-2-如何不将参数传递给c-11中的线程","link":"#_3-2-如何不将参数传递给c-11中的线程","children":[]},{"level":3,"title":"3.3 如何在c++11中传递对std::thread的引用","slug":"_3-3-如何在c-11中传递对std-thread的引用","link":"#_3-3-如何在c-11中传递对std-thread的引用","children":[]},{"level":3,"title":"3.4 将指向类成员函数的指针分配为线程函数","slug":"_3-4-将指向类成员函数的指针分配为线程函数","link":"#_3-4-将指向类成员函数的指针分配为线程函数","children":[]},{"level":3,"title":"3.5 参考","slug":"_3-5-参考","link":"#_3-5-参考","children":[]}]}],"git":{},"readingTime":{"minutes":3.43,"words":1030},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门3-小心地将参数传递给线程.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。</p>\\n<h2>3 小心地将参数传递给线程</h2>\\n<p>要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造函数。默认情况下，所有参数都复制到新线程的内部存储中。让我们看一个例子：</p>\\n<h3>3.1 在c++11中将简单参数传递给std::thread</h3>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>#include &lt;iostream&gt;</span></span>\\n<span class=\\"line\\"><span>#include &lt;string&gt;</span></span>\\n<span class=\\"line\\"><span>#include &lt;thread&gt;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>void threadCallback(int x, std::string str)</span></span>\\n<span class=\\"line\\"><span>{</span></span>\\n<span class=\\"line\\"><span>\\tstd::cout &lt;&lt; \\"Passed Number = \\" &lt;&lt; x &lt;&lt; std::endl;</span></span>\\n<span class=\\"line\\"><span>\\tstd::cout &lt;&lt; \\"Passed String = \\" &lt;&lt; str &lt;&lt; std::endl;</span></span>\\n<span class=\\"line\\"><span>}</span></span>\\n<span class=\\"line\\"><span>int main()</span></span>\\n<span class=\\"line\\"><span>{</span></span>\\n<span class=\\"line\\"><span>\\tint x = 10;</span></span>\\n<span class=\\"line\\"><span>\\tstd::string str = \\"Sample String\\";</span></span>\\n<span class=\\"line\\"><span>\\tstd::thread threadObj(threadCallback, x, str);</span></span>\\n<span class=\\"line\\"><span>\\tthreadObj.join();</span></span>\\n<span class=\\"line\\"><span>\\treturn 0;</span></span>\\n<span class=\\"line\\"><span>}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{b as comp,m as data};
