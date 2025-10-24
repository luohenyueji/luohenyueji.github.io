import{_ as t,c as d,d as n,f as a,b as i,a as l,o as p,r}from"./app-HB0Nuzez.js";const c={},h={id:"_2-1-用stdjoin-连接线程",tabindex:"-1"},v={class:"header-anchor",href:"#_2-1-用stdjoin-连接线程"},o={id:"_2-2-使用stddetach-分离线程",tabindex:"-1"},u={class:"header-anchor",href:"#_2-2-使用stddetach-分离线程"};function b(m,s){const e=r("VPIcon");return p(),d("div",null,[s[10]||(s[10]=n("h1",{id:"编程基础-c-多线程入门2-连接和分离线程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编程基础-c-多线程入门2-连接和分离线程"},[n("span",null,"[编程基础] C++多线程入门2-连接和分离线程")])],-1)),s[11]||(s[11]=n("p",null,"原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。",-1)),s[12]||(s[12]=n("h2",{id:"_2-连接和分离线程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-连接和分离线程"},[n("span",null,"2 连接和分离线程")])],-1)),s[13]||(s[13]=n("p",null,"在本章中，我们将讨论std::thread的连接和分离。",-1)),n("h3",h,[n("a",v,[n("span",null,[s[0]||(s[0]=a("2.1 用std")),i(e,{icon:"thread"}),s[1]||(s[1]=a("join()连接线程"))])])]),s[14]||(s[14]=l(`<p>一旦启动一个线程，则另一个线程可以等待该新线程完成。为此，还需要在std::thread对象上调用join()函数，即</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>std::thread th(funcPtr);</span></span>
<span class="line"><span>// Some Code</span></span>
<span class="line"><span>th.join();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们看一个例子，假设主线程必须启动10个工作线程，并且在启动所有这些线程之后，主函数将等待它们完成。连接所有线程后，主函数将继续。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>#include &lt;algorithm&gt;</span></span>
<span class="line"><span>#include &lt;vector&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class WorkerThread</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	void operator()()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cout &lt;&lt; &quot;Worker Thread &quot; &lt;&lt; std::this_thread::get_id() &lt;&lt; &quot; is Executing&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// 创建多个线程</span></span>
<span class="line"><span>	std::vector&lt;std::thread&gt; threadList;</span></span>
<span class="line"><span>	for (int i = 0; i &lt; 10; i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		threadList.push_back(std::thread(WorkerThread()));</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	// Now wait for all the worker thread to finish i.e.</span></span>
<span class="line"><span>	// Call join() function on each of the std::thread object</span></span>
<span class="line"><span>	// 现在等待所有工作线程完成，即对每个std::thread对象调用join()函数</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;wait for all the worker thread to finish&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	std::for_each(threadList.begin(), threadList.end(), std::mem_fn(&amp;std::thread::join));</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Exiting from Main Thread&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Worker Thread 12616 is ExecutingWorker Thread 10584 is Executing</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Worker Thread Worker Thread 14696Worker Thread Worker Thread 15356Worker Thread 11228 is Executing</span></span>
<span class="line"><span>Worker Thread  is Executing is Executing</span></span>
<span class="line"><span>9528 is Executing</span></span>
<span class="line"><span>Worker Thread</span></span>
<span class="line"><span>wait for all the worker thread to finish</span></span>
<span class="line"><span>Worker Thread 16312 is Executing</span></span>
<span class="line"><span>14448 is Executing77361908 is Executing</span></span>
<span class="line"><span></span></span>
<span class="line"><span> is Executing</span></span>
<span class="line"><span>Exiting from Main Thread</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)),n("h3",o,[n("a",u,[n("span",null,[s[2]||(s[2]=a("2.2 使用std")),i(e,{icon:"thread"}),s[3]||(s[3]=a("detach()分离线程"))])])]),n("p",null,[s[4]||(s[4]=a("分离的线程也称为守护进程/后台线程。要分离线程，我们需要对std")),i(e,{icon:"thread对象调用std"}),s[5]||(s[5]=a("detach()函数，即："))]),s[15]||(s[15]=l(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>std::thread th(funcPtr);</span></span>
<span class="line"><span>th.detach();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用detach()之后，std::thread对象不再与实际的执行线程关联。 <strong>注意在线程句柄上调用detach()和join()时要小心！！</strong></p><p><strong>情况1：永远不要在没有关联执行线程的std::thread对象上调用join()或detach()</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    std::thread threadObj( (WorkerThread()) );</span></span>
<span class="line"><span>    threadObj.join();</span></span>
<span class="line"><span>    // 这将导致程序终止 It will cause Program to Terminate</span></span>
<span class="line"><span>	threadObj.join();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)),n("p",null,[s[6]||(s[6]=a("当在线程对象上调用join()函数时，则当此join返回0时，则std")),i(e,{icon:"thread对象没有与其关联的线程。如果再次在该对象上调用join()函数，则将导致终止程序。同样，调用detach()可以使std"}),s[7]||(s[7]=a("thread对象不与任何线程函数链接。在那种情况下，在std::thread对象上调用detach函数两次将导致程序终止。"))]),s[16]||(s[16]=l(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    std::thread threadObj( (WorkerThread()) );</span></span>
<span class="line"><span>    threadObj.detach();</span></span>
<span class="line"><span>	// 这将导致程序终止 It will cause Program to Terminate	</span></span>
<span class="line"><span>    threadObj.detach();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在调用join()或detach()之前，我们应该检查每次线程是否可连接，即</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    std::thread threadObj( (WorkerThread()) );</span></span>
<span class="line"><span>    if(threadObj.joinable())</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        std::cout&lt;&lt;&quot;Detaching Thread &quot;&lt;&lt;std::endl;</span></span>
<span class="line"><span>        threadObj.detach();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if(threadObj.joinable())    </span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        std::cout&lt;&lt;&quot;Detaching Thread &quot;&lt;&lt;std::endl;</span></span>
<span class="line"><span>        threadObj.detach();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    std::thread threadObj2( (WorkerThread()) );</span></span>
<span class="line"><span>    if(threadObj2.joinable())</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        std::cout&lt;&lt;&quot;Joining Thread &quot;&lt;&lt;std::endl;</span></span>
<span class="line"><span>        threadObj2.join();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if(threadObj2.joinable())    </span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        std::cout&lt;&lt;&quot;Joining Thread &quot;&lt;&lt;std::endl;</span></span>
<span class="line"><span>        threadObj2.join();</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),n("p",null,[s[8]||(s[8]=a("**情况2：不要忘记在具有关联的执行线程的std")),i(e,{icon:`Thread对象上调用Join或Detach**
如果具有关联的执行线程的std`}),s[9]||(s[9]=a("Thread对象没有调用Join或Detach，则在该对象的析构期间-否则它将终止程序。因为在析构内部-或者它检查线程是否仍然是可联接的，然后终止程序，即"))]),s[17]||(s[17]=l(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>#include &lt;algorithm&gt;</span></span>
<span class="line"><span>class WorkerThread</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	void operator()()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		std::cout &lt;&lt; &quot;Worker Thread &quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::thread threadObj((WorkerThread()));</span></span>
<span class="line"><span>	// Program will terminate as we have&#39;t called either join or detach with the std::thread object.</span></span>
<span class="line"><span>	// Hence std::thread&#39;s object destructor will terminate the program</span></span>
<span class="line"><span>	// 程序将终止，因为我们没有使用std::Thread对象调用Join或Detach。因此std::Thread的对象析构函数将终止程序</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Worker Thread</span></span>
<span class="line"><span>程序崩溃</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，在发生异常的情况下，我们不应忘记调用join()或detach()。为了防止这种情况，我们应该使用“资源获取初始化”( RESOURCE ACQUISITION IS INITIALIZATION，RAII)，即</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class ThreadRAII</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::thread &amp; m_thread;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	ThreadRAII(std::thread  &amp; threadObj) : m_thread(threadObj)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	~ThreadRAII()</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// Check if thread is joinable then detach the thread</span></span>
<span class="line"><span>		// 检查线程是否连接，然后分离线程</span></span>
<span class="line"><span>		if (m_thread.joinable())</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			m_thread.detach();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>void thread_function()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	for (int i = 0; i &lt; 10000; i++);</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;thread_function Executing&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::thread threadObj(thread_function);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// If we comment this Line, then program will crash</span></span>
<span class="line"><span>	// 如果我们注释此行，则程序将崩溃</span></span>
<span class="line"><span>	ThreadRAII wrapperObj(threadObj);</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>thread_function Executing</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_2-3-参考" tabindex="-1"><a class="header-anchor" href="#_2-3-参考"><span>2.3 参考</span></a></h3><blockquote><p><a href="https://thispointer.com//c11-multithreading-part-3-carefully-pass-arguments-to-threads/" target="_blank" rel="noopener noreferrer">https://thispointer.com//c11-multithreading-part-3-carefully-pass-arguments-to-threads/</a></p></blockquote>`,9))])}const k=t(c,[["render",b],["__file","2020-05-29-_编程基础_ C__多线程入门2-连接和分离线程.html.vue"]]),A=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A82-%E8%BF%9E%E6%8E%A5%E5%92%8C%E5%88%86%E7%A6%BB%E7%BA%BF%E7%A8%8B.html","title":"[编程基础] C++多线程入门2-连接和分离线程","lang":"zh-CN","frontmatter":{"date":"2020-05-29T16:42:33.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门2-连接和分离线程 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 2 连接和分离线程 在本章中，我们将讨论std::thread的连接和分离。 2.1 用std 一旦启动一个线程，则另一个线...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A82-%E8%BF%9E%E6%8E%A5%E5%92%8C%E5%88%86%E7%A6%BB%E7%BA%BF%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门2-连接和分离线程"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门2-连接和分离线程 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 2 连接和分离线程 在本章中，我们将讨论std::thread的连接和分离。 2.1 用std 一旦启动一个线程，则另一个线..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T16:42:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门2-连接和分离线程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T16:42:33.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"2 连接和分离线程","slug":"_2-连接和分离线程","link":"#_2-连接和分离线程","children":[{"level":3,"title":"2.1 用stdjoin()连接线程","slug":"_2-1-用stdjoin-连接线程","link":"#_2-1-用stdjoin-连接线程","children":[]},{"level":3,"title":"2.2 使用stddetach()分离线程","slug":"_2-2-使用stddetach-分离线程","link":"#_2-2-使用stddetach-分离线程","children":[]},{"level":3,"title":"2.3 参考","slug":"_2-3-参考","link":"#_2-3-参考","children":[]}]}],"git":{},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门2-连接和分离线程.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p>\\n<h2>2 连接和分离线程</h2>\\n<p>在本章中，我们将讨论std::thread的连接和分离。</p>\\n<h3>2.1 用std</h3>\\n<p>一旦启动一个线程，则另一个线程可以等待该新线程完成。为此，还需要在std::thread对象上调用join()函数，即</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>std::thread th(funcPtr);</span></span>\\n<span class=\\"line\\"><span>// Some Code</span></span>\\n<span class=\\"line\\"><span>th.join();</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{k as comp,A as data};
