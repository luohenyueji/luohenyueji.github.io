import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as l,c as d,a as e,b as a,d as s,e as r}from"./app-MsA2k2kn.js";const c={},v=r(`<h1 id="编程基础-c-多线程入门6-事件处理的需求" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门6-事件处理的需求" aria-hidden="true">#</a> [编程基础] C++多线程入门6-事件处理的需求</h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_6-事件处理的需求" tabindex="-1"><a class="header-anchor" href="#_6-事件处理的需求" aria-hidden="true">#</a> 6 事件处理的需求</h2><h3 id="_6-1-使用说明" tabindex="-1"><a class="header-anchor" href="#_6-1-使用说明" aria-hidden="true">#</a> 6.1 使用说明</h3><p>在本文中，我们将讨论多线程中事件处理的需求。有时，线程需要等待事件发生，例如条件变为真或任务由另一个线程完成。假设我们正在构建一个基于网络的应用程序。该应用程序执行以下任务，</p><ul><li>与服务器进行一些连接</li><li>从XML文件加载数据</li><li>对从XML加载的数据进行处理</li></ul><p>如我们所见，任务1不依赖于任何其他任务，但是任务3依赖于任务2。因此，这意味着任务1和任务2可以由不同的线程并行运行以提高应用程序的性能。因此，让我们将其分解为一个多线程应用程序，现在，它包括两个线程。 线程1的职责是：</p><ul><li>与服务器进行一些连接</li><li>等待线程2从XML加载数据</li><li>对从XML加载的数据进行处理</li></ul><p>线程2的职责是</p><ul><li>从XML加载数据</li><li>通知另一个线程，即等待消息</li></ul><figure><img src="https://img-blog.csdnimg.cn/20200529170033599.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>如上图所示，线程1执行一些操作，然后等待事件/条件发生。这里的事件或条件是数据是否成功加载。线程1收到该事件后，便会对数据执行一些处理。当线程1忙于执行“握手机制”时，线程2并行加载数据。当线程2成功地从XML加载数据时，它随后通过发信号通知该事件来通知线程1。现在，当发出事件或条件信号时，线程1将继续处理数据。 使它成为多线程有什么好处？当线程1忙于某种握手机制时，线程2将从XML并行加载数据。因此，它将提高应用程序的性能，现在，如何实现这一目标两个选项。</p><p><strong>选项1</strong> 将布尔全局变量设为默认值false。在线程2中将其值设置为true，线程1将继续在循环中检查其值，并且一旦变为true，线程1将继续处理数据。但是由于它是两个线程共享的全局变量，因此需要与互斥锁同步。让我们看看它的代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include&lt;iostream&gt;
#include&lt;thread&gt;
#include&lt;mutex&gt;
class Application
{
	std::mutex m_mutex;
	bool m_bDataLoaded;
public:
	Application()
	{
		m_bDataLoaded = false;
	}
	void loadData()
	{
		// Make This Thread sleep for 1 Second
		// 线程等待一秒
		std::this_thread::sleep_for(std::chrono::milliseconds(1000));
		std::cout &lt;&lt; &quot;Loading Data from XML&quot; &lt;&lt; std::endl;
		// Lock The Data structure
		// 互斥锁
		std::lock_guard&lt;std::mutex&gt; guard(m_mutex);
		// Set the flag to true, means data is loaded
		// 表示数据被加载
		m_bDataLoaded = true;
	}
	void mainTask()
	{
		std::cout &lt;&lt; &quot;Do Some Handshaking&quot; &lt;&lt; std::endl;
		// Acquire the Lock
		// 获得锁
		m_mutex.lock();
		// Check if flag is set to true or not
		// 检查数据是否被加载
		while (m_bDataLoaded != true)
		{
			// Release the lock
			// 释放锁
			m_mutex.unlock();
			//sleep for 100 milli seconds
			// 等待100毫秒
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
			// Acquire the lock
			// 获得锁
			m_mutex.lock();
		}
		// Release the lock
		// 释放锁
		m_mutex.unlock();
		// Doc processing on loaded Data
		// 加载数据的文档处理
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Do Some Handshaking
Loading Data from XML
Do Processing On loaded Data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式具有以下缺点： 线程将继续获取该锁并释放它只是为了检查该值，因此它将消耗CPU周期，并使线程1变慢，因为它需要获取相同的锁来更新bool标志。因此，显然，我们需要一种更好的机制来实现这一目标，例如，如果某种程度上线程1可以通过等待某个事件被发出信号而阻塞，而另一个线程可以通过该信号发出该事件并使线程1继续运行，则该机制就可以实现。这样可以节省许多CPU周期并提供更好的性能。但是问题是如何实现这一目标？我们将在选项2中看到答案。</p><p><strong>选项2</strong></p><p>我们可以使用条件变量来实现。条件变量是一种事件，用于在2个线程之间发信号。一个线程可以等待它发出信号，而另一个线程可以发出信号。下一篇文章将讲述条件变量的详细说明以及使用条件变量解决此问题的方法。</p><h3 id="_6-2-参考" tabindex="-1"><a class="header-anchor" href="#_6-2-参考" aria-hidden="true">#</a> 6.2 参考</h3>`,20),u={href:"https://thispointer.com//c11-multithreading-part-6-need-of-event-handling/",target:"_blank",rel:"noopener noreferrer"};function o(m,b){const i=t("ExternalLinkIcon");return l(),d("div",null,[v,e("blockquote",null,[e("p",null,[e("a",u,[a("https://thispointer.com//c11-multithreading-part-6-need-of-event-handling/"),s(i)])])])])}const h=n(c,[["render",o],["__file","2020-05-29-_编程基础_ C__多线程入门6-事件处理的需求.html.vue"]]);export{h as default};
