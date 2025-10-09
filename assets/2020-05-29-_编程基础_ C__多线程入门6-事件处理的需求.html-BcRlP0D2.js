import{_ as s,c as a,a as e,o as i}from"./app-BNuIUq7T.js";const l={};function p(t,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h1 id="编程基础-c-多线程入门6-事件处理的需求" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门6-事件处理的需求"><span>[编程基础] C++多线程入门6-事件处理的需求</span></a></h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_6-事件处理的需求" tabindex="-1"><a class="header-anchor" href="#_6-事件处理的需求"><span>6 事件处理的需求</span></a></h2><h3 id="_6-1-使用说明" tabindex="-1"><a class="header-anchor" href="#_6-1-使用说明"><span>6.1 使用说明</span></a></h3><p>在本文中，我们将讨论多线程中事件处理的需求。有时，线程需要等待事件发生，例如条件变为真或任务由另一个线程完成。假设我们正在构建一个基于网络的应用程序。该应用程序执行以下任务，</p><ul><li>与服务器进行一些连接</li><li>从XML文件加载数据</li><li>对从XML加载的数据进行处理</li></ul><p>如我们所见，任务1不依赖于任何其他任务，但是任务3依赖于任务2。因此，这意味着任务1和任务2可以由不同的线程并行运行以提高应用程序的性能。因此，让我们将其分解为一个多线程应用程序，现在，它包括两个线程。 线程1的职责是：</p><ul><li>与服务器进行一些连接</li><li>等待线程2从XML加载数据</li><li>对从XML加载的数据进行处理</li></ul><p>线程2的职责是</p><ul><li>从XML加载数据</li><li>通知另一个线程，即等待消息</li></ul><figure><img src="https://img-blog.csdnimg.cn/20200529170033599.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><p>如上图所示，线程1执行一些操作，然后等待事件/条件发生。这里的事件或条件是数据是否成功加载。线程1收到该事件后，便会对数据执行一些处理。当线程1忙于执行“握手机制”时，线程2并行加载数据。当线程2成功地从XML加载数据时，它随后通过发信号通知该事件来通知线程1。现在，当发出事件或条件信号时，线程1将继续处理数据。 使它成为多线程有什么好处？当线程1忙于某种握手机制时，线程2将从XML并行加载数据。因此，它将提高应用程序的性能，现在，如何实现这一目标两个选项。</p><p><strong>选项1</strong> 将布尔全局变量设为默认值false。在线程2中将其值设置为true，线程1将继续在循环中检查其值，并且一旦变为true，线程1将继续处理数据。但是由于它是两个线程共享的全局变量，因此需要与互斥锁同步。让我们看看它的代码。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include&lt;iostream&gt;</span></span>
<span class="line"><span>#include&lt;thread&gt;</span></span>
<span class="line"><span>#include&lt;mutex&gt;</span></span>
<span class="line"><span>class Application</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::mutex m_mutex;</span></span>
<span class="line"><span>	bool m_bDataLoaded;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	Application()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		m_bDataLoaded = false;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	void loadData()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// Make This Thread sleep for 1 Second</span></span>
<span class="line"><span>		// 线程等待一秒</span></span>
<span class="line"><span>		std::this_thread::sleep_for(std::chrono::milliseconds(1000));</span></span>
<span class="line"><span>		std::cout &lt;&lt; &quot;Loading Data from XML&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>		// Lock The Data structure</span></span>
<span class="line"><span>		// 互斥锁</span></span>
<span class="line"><span>		std::lock_guard&lt;std::mutex&gt; guard(m_mutex);</span></span>
<span class="line"><span>		// Set the flag to true, means data is loaded</span></span>
<span class="line"><span>		// 表示数据被加载</span></span>
<span class="line"><span>		m_bDataLoaded = true;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	void mainTask()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cout &lt;&lt; &quot;Do Some Handshaking&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>		// Acquire the Lock</span></span>
<span class="line"><span>		// 获得锁</span></span>
<span class="line"><span>		m_mutex.lock();</span></span>
<span class="line"><span>		// Check if flag is set to true or not</span></span>
<span class="line"><span>		// 检查数据是否被加载</span></span>
<span class="line"><span>		while (m_bDataLoaded != true)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			// Release the lock</span></span>
<span class="line"><span>			// 释放锁</span></span>
<span class="line"><span>			m_mutex.unlock();</span></span>
<span class="line"><span>			//sleep for 100 milli seconds</span></span>
<span class="line"><span>			// 等待100毫秒</span></span>
<span class="line"><span>			std::this_thread::sleep_for(std::chrono::milliseconds(100));</span></span>
<span class="line"><span>			// Acquire the lock</span></span>
<span class="line"><span>			// 获得锁</span></span>
<span class="line"><span>			m_mutex.lock();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		// Release the lock</span></span>
<span class="line"><span>		// 释放锁</span></span>
<span class="line"><span>		m_mutex.unlock();</span></span>
<span class="line"><span>		// Doc processing on loaded Data</span></span>
<span class="line"><span>		// 加载数据的文档处理</span></span>
<span class="line"><span>		std::cout &lt;&lt; &quot;Do Processing On loaded Data&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	Application app;</span></span>
<span class="line"><span>	std::thread thread_1(&amp;Application::mainTask, &amp;app);</span></span>
<span class="line"><span>	std::thread thread_2(&amp;Application::loadData, &amp;app);</span></span>
<span class="line"><span>	thread_2.join();</span></span>
<span class="line"><span>	thread_1.join();</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Do Some Handshaking</span></span>
<span class="line"><span>Loading Data from XML</span></span>
<span class="line"><span>Do Processing On loaded Data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式具有以下缺点： 线程将继续获取该锁并释放它只是为了检查该值，因此它将消耗CPU周期，并使线程1变慢，因为它需要获取相同的锁来更新bool标志。因此，显然，我们需要一种更好的机制来实现这一目标，例如，如果某种程度上线程1可以通过等待某个事件被发出信号而阻塞，而另一个线程可以通过该信号发出该事件并使线程1继续运行，则该机制就可以实现。这样可以节省许多CPU周期并提供更好的性能。但是问题是如何实现这一目标？我们将在选项2中看到答案。</p><p><strong>选项2</strong></p><p>我们可以使用条件变量来实现。条件变量是一种事件，用于在2个线程之间发信号。一个线程可以等待它发出信号，而另一个线程可以发出信号。下一篇文章将讲述条件变量的详细说明以及使用条件变量解决此问题的方法。</p><h3 id="_6-2-参考" tabindex="-1"><a class="header-anchor" href="#_6-2-参考"><span>6.2 参考</span></a></h3><blockquote><p><a href="https://thispointer.com//c11-multithreading-part-6-need-of-event-handling/" target="_blank" rel="noopener noreferrer">https://thispointer.com//c11-multithreading-part-6-need-of-event-handling/</a></p></blockquote>`,21)]))}const c=s(l,[["render",p],["__file","2020-05-29-_编程基础_ C__多线程入门6-事件处理的需求.html.vue"]]),r=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A86-%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%9A%84%E9%9C%80%E6%B1%82.html","title":"[编程基础] C++多线程入门6-事件处理的需求","lang":"zh-CN","frontmatter":{"date":"2020-05-29T17:00:58.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门6-事件处理的需求 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 6 事件处理的需求 6.1 使用说明 在本文中，我们将讨论多线程中事件处理的需求。有时，线程需要等待事件发生，例如条件变为真...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A86-%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%9A%84%E9%9C%80%E6%B1%82.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门6-事件处理的需求"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门6-事件处理的需求 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 6 事件处理的需求 6.1 使用说明 在本文中，我们将讨论多线程中事件处理的需求。有时，线程需要等待事件发生，例如条件变为真..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdnimg.cn/20200529170033599.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T17:00:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门6-事件处理的需求\\",\\"image\\":[\\"https://img-blog.csdnimg.cn/20200529170033599.png\\"],\\"datePublished\\":\\"2020-05-29T17:00:58.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"6 事件处理的需求","slug":"_6-事件处理的需求","link":"#_6-事件处理的需求","children":[{"level":3,"title":"6.1 使用说明","slug":"_6-1-使用说明","link":"#_6-1-使用说明","children":[]},{"level":3,"title":"6.2 参考","slug":"_6-2-参考","link":"#_6-2-参考","children":[]}]}],"git":{},"readingTime":{"minutes":4.1,"words":1229},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门6-事件处理的需求.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p>\\n<h2>6 事件处理的需求</h2>\\n<h3>6.1 使用说明</h3>\\n<p>在本文中，我们将讨论多线程中事件处理的需求。有时，线程需要等待事件发生，例如条件变为真或任务由另一个线程完成。假设我们正在构建一个基于网络的应用程序。该应用程序执行以下任务，</p>\\n<ul>\\n<li>与服务器进行一些连接</li>\\n<li>从XML文件加载数据</li>\\n<li>对从XML加载的数据进行处理</li>\\n</ul>","autoDesc":true}');export{c as comp,r as data};
