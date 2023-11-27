import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as t,c as a,a as e,b as s,d as l,e as r}from"./app-MsA2k2kn.js";const v={},c=r(`<h1 id="编程基础-c-多线程入门2-连接和分离线程" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门2-连接和分离线程" aria-hidden="true">#</a> [编程基础] C++多线程入门2-连接和分离线程</h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_2-连接和分离线程" tabindex="-1"><a class="header-anchor" href="#_2-连接和分离线程" aria-hidden="true">#</a> 2 连接和分离线程</h2><p>在本章中，我们将讨论std::thread的连接和分离。</p><h3 id="_2-1-用std-join-连接线程" tabindex="-1"><a class="header-anchor" href="#_2-1-用std-join-连接线程" aria-hidden="true">#</a> 2.1 用std:🧵:join()连接线程</h3><p>一旦启动一个线程，则另一个线程可以等待该新线程完成。为此，还需要在std::thread对象上调用join()函数，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::thread th(funcPtr);
// Some Code
th.join();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看一个例子，假设主线程必须启动10个工作线程，并且在启动所有这些线程之后，主函数将等待它们完成。连接所有线程后，主函数将继续。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;algorithm&gt;
#include &lt;vector&gt;

class WorkerThread
{
public:
	void operator()()
	{
		std::cout &lt;&lt; &quot;Worker Thread &quot; &lt;&lt; std::this_thread::get_id() &lt;&lt; &quot; is Executing&quot; &lt;&lt; std::endl;
	}
};
int main()
{
	// 创建多个线程
	std::vector&lt;std::thread&gt; threadList;
	for (int i = 0; i &lt; 10; i++)
	{
		threadList.push_back(std::thread(WorkerThread()));
	}
	// Now wait for all the worker thread to finish i.e.
	// Call join() function on each of the std::thread object
	// 现在等待所有工作线程完成，即对每个std::thread对象调用join()函数
	std::cout &lt;&lt; &quot;wait for all the worker thread to finish&quot; &lt;&lt; std::endl;
	std::for_each(threadList.begin(), threadList.end(), std::mem_fn(&amp;std::thread::join));
	std::cout &lt;&lt; &quot;Exiting from Main Thread&quot; &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Worker Thread 12616 is ExecutingWorker Thread 10584 is Executing

Worker Thread Worker Thread 14696Worker Thread Worker Thread 15356Worker Thread 11228 is Executing
Worker Thread  is Executing is Executing
9528 is Executing
Worker Thread
wait for all the worker thread to finish
Worker Thread 16312 is Executing
14448 is Executing77361908 is Executing

 is Executing
Exiting from Main Thread
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用std-detach-分离线程" tabindex="-1"><a class="header-anchor" href="#_2-2-使用std-detach-分离线程" aria-hidden="true">#</a> 2.2 使用std:🧵:detach()分离线程</h3><p>分离的线程也称为守护进程/后台线程。要分离线程，我们需要对std::thread对象调用std::detach()函数，即：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::thread th(funcPtr);
th.detach();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用detach()之后，std::thread对象不再与实际的执行线程关联。 <strong>注意在线程句柄上调用detach()和join()时要小心！！</strong></p><p><strong>情况1：永远不要在没有关联执行线程的std::thread对象上调用join()或detach()</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    std::thread threadObj( (WorkerThread()) );
    threadObj.join();
    // 这将导致程序终止 It will cause Program to Terminate
	threadObj.join(); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当在线程对象上调用join()函数时，则当此join返回0时，则std::thread对象没有与其关联的线程。如果再次在该对象上调用join()函数，则将导致终止程序。同样，调用detach()可以使std::thread对象不与任何线程函数链接。在那种情况下，在std::thread对象上调用detach函数两次将导致程序终止。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    std::thread threadObj( (WorkerThread()) );
    threadObj.detach();
	// 这将导致程序终止 It will cause Program to Terminate	
    threadObj.detach();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在调用join()或detach()之前，我们应该检查每次线程是否可连接，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    std::thread threadObj( (WorkerThread()) );
    if(threadObj.joinable())
    {
        std::cout&lt;&lt;&quot;Detaching Thread &quot;&lt;&lt;std::endl;
        threadObj.detach();
    }
    if(threadObj.joinable())    
    {
        std::cout&lt;&lt;&quot;Detaching Thread &quot;&lt;&lt;std::endl;
        threadObj.detach();
    }
    
    std::thread threadObj2( (WorkerThread()) );
    if(threadObj2.joinable())
    {
        std::cout&lt;&lt;&quot;Joining Thread &quot;&lt;&lt;std::endl;
        threadObj2.join();
    }
    if(threadObj2.joinable())    
    {
        std::cout&lt;&lt;&quot;Joining Thread &quot;&lt;&lt;std::endl;
        threadObj2.join();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>情况2：不要忘记在具有关联的执行线程的std::Thread对象上调用Join或Detach</strong> 如果具有关联的执行线程的std::Thread对象没有调用Join或Detach，则在该对象的析构期间-否则它将终止程序。因为在析构内部-或者它检查线程是否仍然是可联接的，然后终止程序，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;algorithm&gt;
class WorkerThread
{
public:
	void operator()()
	{
		std::cout &lt;&lt; &quot;Worker Thread &quot; &lt;&lt; std::endl;
	}
};
int main()
{
	std::thread threadObj((WorkerThread()));
	// Program will terminate as we have&#39;t called either join or detach with the std::thread object.
	// Hence std::thread&#39;s object destructor will terminate the program
	// 程序将终止，因为我们没有使用std::Thread对象调用Join或Detach。因此std::Thread的对象析构函数将终止程序
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Worker Thread
程序崩溃
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，在发生异常的情况下，我们不应忘记调用join()或detach()。为了防止这种情况，我们应该使用“资源获取初始化”( RESOURCE ACQUISITION IS INITIALIZATION，RAII)，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;thread&gt;
#include &lt;iostream&gt;

class ThreadRAII
{
	std::thread &amp; m_thread;
public:
	ThreadRAII(std::thread  &amp; threadObj) : m_thread(threadObj)
	{
	}
	~ThreadRAII()
	{
		// Check if thread is joinable then detach the thread
		// 检查线程是否连接，然后分离线程
		if (m_thread.joinable())
		{
			m_thread.detach();
		}
	}
};
void thread_function()
{
	for (int i = 0; i &lt; 10000; i++);
	std::cout &lt;&lt; &quot;thread_function Executing&quot; &lt;&lt; std::endl;
}

int main()
{
	std::thread threadObj(thread_function);

	// If we comment this Line, then program will crash
	// 如果我们注释此行，则程序将崩溃
	ThreadRAII wrapperObj(threadObj);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>thread_function Executing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-3-参考" tabindex="-1"><a class="header-anchor" href="#_2-3-参考" aria-hidden="true">#</a> 2.3 参考</h3>`,30),u={href:"https://thispointer.com//c11-multithreading-part-3-carefully-pass-arguments-to-threads/",target:"_blank",rel:"noopener noreferrer"};function o(m,h){const i=d("ExternalLinkIcon");return t(),a("div",null,[c,e("blockquote",null,[e("p",null,[e("a",u,[s("https://thispointer.com//c11-multithreading-part-3-carefully-pass-arguments-to-threads/"),l(i)])])])])}const p=n(v,[["render",o],["__file","2020-05-29-_编程基础_ C__多线程入门2-连接和分离线程.html.vue"]]);export{p as default};
