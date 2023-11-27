import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as t,c as l,a as e,b as a,d as s,e as r}from"./app-MsA2k2kn.js";const v={},c=r(`<p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h1 id="编程基础-c-多线程入门1-创建线程的三种不同方式" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门1-创建线程的三种不同方式" aria-hidden="true">#</a> [编程基础] C++多线程入门1-创建线程的三种不同方式</h1><h2 id="_1-创建线程的三种不同方式" tabindex="-1"><a class="header-anchor" href="#_1-创建线程的三种不同方式" aria-hidden="true">#</a> 1 创建线程的三种不同方式</h2><p>在本章中，我们将讨论如何使用std::thread在C++11中创建线程。<br> 在每个C++应用程序中，都有一个默认的主线程，即main()函数。在C++11中，我们可以通过创建std::thread类的对象来创建其他线程。每个std::thread对象都可以与一个线程关联。因此我们需要引入头文件为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;thread&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么std::thread在构造函数中接受什么？我们可以在std::thread对象上附加一个回调，该回调将在新线程启动时执行。这些回调可以是：</p><ol><li>函数指针</li><li>函数对象</li><li>Lambda函数</li></ol><h3 id="_1-1-创建线程" tabindex="-1"><a class="header-anchor" href="#_1-1-创建线程" aria-hidden="true">#</a> 1.1 创建线程</h3><p>可以这样创建线程对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::thread thObj(&lt;CALLBACK&gt;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>新线程将在创建新对象后立即启动，并将与启动该线程的线程并行执行传递的回调。而且，任何线程都可以通过在该线程的对象上调用join()函数来等待另一个线程退出。 让我们看一个示例，其中主线程将创建一个单独的线程。创建此新线程后，主线程将在控制台上打印一些数据，然后等待新创建的线程退出。我们使用三种不同的回调机制来实现上述功能。</p><ol><li>使用函数指针创建线程</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;thread&gt;
#include &lt;iostream&gt;

using namespace std;

void thread_function()
{
	for (int i = 0; i &lt; 10000; i++);
	std::cout &lt;&lt; &quot;thread function Executing&quot; &lt;&lt; std::endl;
}

int main()
{
	// 创建线程 
	std::thread threadObj(thread_function);
	for (int i = 0; i &lt; 10000; i++);
	std::cout &lt;&lt; &quot;Display From MainThread&quot; &lt;&lt; std::endl;
	// 等待线程的结束
	threadObj.join();
	std::cout &lt;&lt; &quot;Exit of Main function&quot; &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Display From MainThreadthread function Executing

Exit of Main function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用函数对象创建线程</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

class DisplayThread
{
public:
	void operator()()
	{
		for (int i = 0; i &lt; 10000; i++);
		std::cout &lt;&lt; &quot;Display Thread Executing&quot; &lt;&lt; std::endl;
	}
};

int main()
{
	std::thread threadObj((DisplayThread()));
	for (int i = 0; i &lt; 10000; i++);
	std::cout &lt;&lt; &quot;Display From Main Thread &quot; &lt;&lt; std::endl;
	std::cout &lt;&lt; &quot;Waiting For Thread to complete&quot; &lt;&lt; std::endl;
	threadObj.join();
	std::cout &lt;&lt; &quot;Exiting from Main Thread&quot; &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Display Thread ExecutingDisplay From Main Thread
Waiting For Thread to complete

Exiting from Main Thread
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用Lambda函数创建线程</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

int main()
{
	int x = 9;
	std::thread threadObj([] {
		for (int i = 0; i &lt; 10000; i++)
			std::cout &lt;&lt; &quot;Display Thread Executing&quot; &lt;&lt; std::endl;
	});

	for (int i = 0; i &lt; 10000; i++)
		std::cout &lt;&lt; &quot;Display From Main Thread&quot; &lt;&lt; std::endl;

	threadObj.join();
	std::cout &lt;&lt; &quot;Exiting from Main Thread&quot; &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Display Thread ExecutingDisplay From Main Thread

Exiting from Main Thread
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-区分线程" tabindex="-1"><a class="header-anchor" href="#_1-2-区分线程" aria-hidden="true">#</a> 1.2 区分线程</h3><p>每个std::thread对象都有一个关联的ID，我们可以使用成员函数来获取，给出关联的thread对象的ID。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::thread::get_id()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要获取当前线程使用的标识符,即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::this_thread::get_id()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果std::thread对象没有关联的线程，则get_id()将返回默认构造的std:🧵:id对象，即“没有任何线程”。std:🧵:id是一个Object，也可以在控制台上进行比较和打印。让我们看一个例子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

void thread_function()
{
	std::cout &lt;&lt; &quot;Inside Thread::ID  = &quot; &lt;&lt; std::this_thread::get_id() &lt;&lt; std::endl;
}
int main()
{
	std::thread threadObj1(thread_function);
	std::thread threadObj2(thread_function);

	if (threadObj1.get_id() != threadObj2.get_id())
		std::cout &lt;&lt; &quot;Both Threads have different IDs&quot; &lt;&lt; std::endl;

	std::cout &lt;&lt; &quot;From Main Thread::ID of Thread 1 = &quot; &lt;&lt; threadObj1.get_id() &lt;&lt; std::endl;
	std::cout &lt;&lt; &quot;From Main Thread::ID of Thread 2 = &quot; &lt;&lt; threadObj2.get_id() &lt;&lt; std::endl;

	threadObj1.join();
	threadObj2.join();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Inside Thread::ID? = 14756
Inside Thread::ID? = 15500
Both Threads have different IDs
From Main Thread::ID of Thread 1 = 14756
From Main Thread::ID of Thread 2 = 15500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-参考" tabindex="-1"><a class="header-anchor" href="#_1-3-参考" aria-hidden="true">#</a> 1.3 参考</h3>`,33),u={href:"https://thispointer.com//c-11-multithreading-part-1-three-different-ways-to-create-threads/",target:"_blank",rel:"noopener noreferrer"};function o(m,b){const i=d("ExternalLinkIcon");return t(),l("div",null,[c,e("blockquote",null,[e("p",null,[e("a",u,[a("https://thispointer.com//c-11-multithreading-part-1-three-different-ways-to-create-threads/"),s(i)])])])])}const p=n(v,[["render",o],["__file","2020-05-29-_编程基础_ C__多线程入门1-创建线程的三种不同方式.html.vue"]]);export{p as default};
