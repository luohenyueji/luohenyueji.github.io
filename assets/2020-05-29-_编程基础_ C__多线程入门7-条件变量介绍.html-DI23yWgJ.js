import{_ as t,r as n,o as a,c as l,a as e,b as d,d as s,e as r}from"./app-Bf4gfzXW.js";const o={},c=r(`<h1 id="编程基础-c-多线程入门7-条件变量介绍" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门7-条件变量介绍"><span>[编程基础] C++多线程入门7-条件变量介绍</span></a></h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_7-条件变量介绍" tabindex="-1"><a class="header-anchor" href="#_7-条件变量介绍"><span>7 条件变量介绍</span></a></h2><p>在本文中，我们将通过示例讨论C ++ 11多线程中条件变量的用法。</p><h3 id="_7-1-条件变量" tabindex="-1"><a class="header-anchor" href="#_7-1-条件变量"><span>7.1 条件变量</span></a></h3><p>条件变量是一种事件，用于在两个或多个线程之间发出信号。一个或多个线程可以等待它发出信号，而另一个线程可以发出信号。 C ++ 11中的条件变量所需的头文件是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;condition_variable&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要互斥锁以及条件变量。 条件变量如何实际起作用：</p><ul><li>线程1调用等待条件变量，该变量在内部获取互斥锁并检查是否满足所需条件。</li><li>如果不是，则释放锁并等待条件变量发出信号(线程被阻塞)。条件变量的wait()函数以自动方式提供这两种操作。</li><li>当满足条件时，另一个线程即线程2会发出条件变量信号。</li><li>一旦收到条件变量的信号，等待它的线程1恢复。然后，它再次获取互斥锁，并检查与条件变量关联的条件是否真正满足或是否为上级调用。如果有多个线程在等待，那么notify_one将仅解除阻塞一个线程。</li><li>如果是上级调用，则再次调用wait()函数。</li></ul><h3 id="_7-2-std-condition-variable的主要成员函数" tabindex="-1"><a class="header-anchor" href="#_7-2-std-condition-variable的主要成员函数"><span>7.2 std::condition_variable的主要成员函数</span></a></h3><p>std::condition_variable的主要成员函数是： <strong>Wait()</strong> 该函数使当前线程阻塞，直到信号通知条件变量或发生虚假唤醒为止。 它自动释放附加的互斥锁，阻塞当前线程，并将其添加到等待当前条件变量对象的线程列表中。当某些线程在同一条件变量对象上调用notify_one()或notify_all()时，该线程将被解除阻塞。它也可能会被虚假地解除阻塞，因此，每次解除阻塞后，都需要再次检查条件。 回调将作为参数传递给此函数，该函数将被调用以检查它是否是虚假调用或是否实际满足条件。wait()函数重新获取互斥锁并检查是否满足实际条件。如果不满足条件，则再次自动释放附加的互斥锁，阻塞当前线程，并将其添加到等待当前条件变量对象的线程列表中。</p><p><strong>notify_one()</strong> 如果有任何线程在同一条件变量对象上等待，则notify_one解除阻塞其中一个等待线程。</p><p><strong>notify_all()</strong> 如果有任何线程在相同的条件变量对象上等待，则notify_all解除所有等待线程的阻塞。</p><h3 id="_7-3-解决问题的方法" tabindex="-1"><a class="header-anchor" href="#_7-3-解决问题的方法"><span>7.3 解决问题的方法</span></a></h3><p>假设我们正在构建一个基于网络的应用程序。该应用程序执行以下任务，</p><ul><li>与服务器进行一些握手</li><li>从XML文件加载数据。</li><li>对从XML加载的数据进行处理。</li></ul><p>如我们所见，任务1不依赖于任何其他任务，但是任务3依赖于任务2。因此，这意味着任务1和任务2可以由不同的线程并行运行以提高应用程序的性能。因此，让我们将其分解为一个多线程应用程序，</p><p>线程1的职责是</p><ul><li>与服务器进行一些连接</li><li>等待线程2从XML加载数据</li><li>对从XML加载的数据进行处理</li></ul><p>线程2的职责是</p><ul><li>从XML加载数据</li><li>通知另一个线程，即等待消息</li></ul><p>使用条件变量实现此目的的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;functional&gt;
#include &lt;mutex&gt;
#include &lt;condition_variable&gt;
using namespace std::placeholders;
class Application
{
	std::mutex m_mutex;
	std::condition_variable m_condVar;
	bool m_bDataLoaded;
public:
	Application()
	{
		m_bDataLoaded = false;
	}
	void loadData()
	{
		// Make This Thread sleep for 1 Second
		// 等待1秒
		std::this_thread::sleep_for(std::chrono::milliseconds(1000));
		std::cout &lt;&lt; &quot;Loading Data from XML&quot; &lt;&lt; std::endl;
		// Lock The Data structure
		// 锁定数据结构
		std::lock_guard&lt;std::mutex&gt; guard(m_mutex);
		// Set the flag to true, means data is loaded
		// 设定数据被加载
		m_bDataLoaded = true;
		// Notify the condition variable
		// 通知变量
		m_condVar.notify_one();
	}
	bool isDataLoaded()
	{
		return m_bDataLoaded;
	}
	void mainTask()
	{
		std::cout &lt;&lt; &quot;Do Some Handshaking&quot; &lt;&lt; std::endl;
		// Acquire the lock
		std::unique_lock&lt;std::mutex&gt; mlock(m_mutex);
		// Start waiting for the Condition Variable to get signaled
		// Wait() will internally release the lock and make the thread to block
		// As soon as condition variable get signaled, resume the thread and
		// again acquire the lock. Then check if condition is met or not
		// If condition is met then continue else again go in wait.
		// 开始等待条件变量收到信号，Wait()将在内部释放锁并使线程阻塞，一旦条件变量得到信号，就恢复线程并再次获得锁。
		//然后检查是否满足条件，如果条件满足，则继续，否则继续等待。
		m_condVar.wait(mlock, std::bind(&amp;Application::isDataLoaded, this));
		std::cout &lt;&lt; &quot;Do Processing On loaded Data&quot; &lt;&lt; std::endl;
	}
};
int main()
{
	Application app;
	std::thread thread_1(&amp;Application::mainTask, &amp;app);
	std::thread thread_2(&amp;Application::loadData, &amp;app);
	thread_2.join();
	thread_1.join();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Do Some Handshaking
Loading Data from XML
Do Processing On loaded Data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-参考" tabindex="-1"><a class="header-anchor" href="#_7-4-参考"><span>7.4 参考</span></a></h3>`,26),v={href:"https://thispointer.com//c11-multithreading-part-7-condition-variables-explained/",target:"_blank",rel:"noopener noreferrer"};function u(m,p){const i=n("ExternalLinkIcon");return a(),l("div",null,[c,e("blockquote",null,[e("p",null,[e("a",v,[d("https://thispointer.com//c11-multithreading-part-7-condition-variables-explained/"),s(i)])])])])}const b=t(o,[["render",u],["__file","2020-05-29-_编程基础_ C__多线程入门7-条件变量介绍.html.vue"]]),h=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A87-%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F%E4%BB%8B%E7%BB%8D.html","title":"[编程基础] C++多线程入门7-条件变量介绍","lang":"zh-CN","frontmatter":{"date":"2020-05-29T17:06:29.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门7-条件变量介绍 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 7 条件变量介绍 在本文中，我们将通过示例讨论C ++ 11多线程中条件变量的用法。 7.1 条件变量 条件变量是一种事件，用...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A87-%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F%E4%BB%8B%E7%BB%8D.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门7-条件变量介绍"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门7-条件变量介绍 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 7 条件变量介绍 在本文中，我们将通过示例讨论C ++ 11多线程中条件变量的用法。 7.1 条件变量 条件变量是一种事件，用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T17:06:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门7-条件变量介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T17:06:29.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"7 条件变量介绍","slug":"_7-条件变量介绍","link":"#_7-条件变量介绍","children":[{"level":3,"title":"7.1 条件变量","slug":"_7-1-条件变量","link":"#_7-1-条件变量","children":[]},{"level":3,"title":"7.2 std::condition_variable的主要成员函数","slug":"_7-2-std-condition-variable的主要成员函数","link":"#_7-2-std-condition-variable的主要成员函数","children":[]},{"level":3,"title":"7.3 解决问题的方法","slug":"_7-3-解决问题的方法","link":"#_7-3-解决问题的方法","children":[]},{"level":3,"title":"7.4 参考","slug":"_7-4-参考","link":"#_7-4-参考","children":[]}]}],"git":{},"readingTime":{"minutes":4.38,"words":1314},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门7-条件变量介绍.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p>\\n<h2>7 条件变量介绍</h2>\\n<p>在本文中，我们将通过示例讨论C ++ 11多线程中条件变量的用法。</p>\\n<h3>7.1 条件变量</h3>\\n<p>条件变量是一种事件，用于在两个或多个线程之间发出信号。一个或多个线程可以等待它发出信号，而另一个线程可以发出信号。\\nC ++ 11中的条件变量所需的头文件是：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>#include &lt;condition_variable&gt;\\n</code></pre></div>","autoDesc":true}');export{b as comp,h as data};
