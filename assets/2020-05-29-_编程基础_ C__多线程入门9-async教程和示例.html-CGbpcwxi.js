import{_ as t,c as p,d as a,f as n,b as e,a as l,o as d,r as c}from"./app-CJwJJlha.js";const r={};function u(o,s){const i=c("VPIcon");return d(),p("div",null,[s[22]||(s[22]=a("h1",{id:"编程基础-c-多线程入门9-async教程和示例",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#编程基础-c-多线程入门9-async教程和示例"},[a("span",null,"[编程基础] C++多线程入门9-async教程和示例")])],-1)),s[23]||(s[23]=a("p",null,"原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。",-1)),s[24]||(s[24]=a("h2",{id:"_9-async教程和示例",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#_9-async教程和示例"},[a("span",null,"9 async教程和示例")])],-1)),a("p",null,[s[0]||(s[0]=n("在本文中，我们将讨论如何在C++11中使用std")),e(i,{icon:"async异步执行任务。std"}),s[1]||(s[1]=n("async在c++11中引入。"))]),s[25]||(s[25]=l(`<h3 id="_9-1-什么是std-async" tabindex="-1"><a class="header-anchor" href="#_9-1-什么是std-async"><span>9.1 什么是std::async()</span></a></h3><p>std::async()是一个函数模板，它接受回调(即函数或函数对象)作为参数，并有可能异步执行它们。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>template &lt;class Fn, class... Args&gt;</span></span>
<span class="line"><span>future&lt;typename result_of&lt;Fn(Args...)&gt;::type&gt; async (launch policy, Fn&amp;&amp; fn, Args&amp;&amp;... args);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),a("p",null,[s[2]||(s[2]=n("std")),e(i,{icon:"async返回一个std"}),s[3]||(s[3]=n("future<T>，该值存储由std")),e(i,{icon:"async()执行的函数对象返回的值。函数期望的参数可以在函数指针参数之后作为参数传递给std"}),s[4]||(s[4]=n("async()。 std")),e(i,{icon:"async中的第一个参数是启动策略，它控制std"}),s[5]||(s[5]=n("async的异步行为。我们可以使用3种不同的启动策略创建std::async，即："))]),a("ol",null,[a("li",null,[s[6]||(s[6]=n("std")),e(i,{icon:"launch"}),s[7]||(s[7]=n("async。它保证了异步行为，即传递的函数将在单独的线程中执行。"))]),a("li",null,[s[8]||(s[8]=n("std")),e(i,{icon:"launch"}),s[9]||(s[9]=n("deferred。非异步行为，即当其他线程将来调用get()以访问共享状态时，将调用Function。"))]),a("li",null,[s[10]||(s[10]=n("std")),e(i,{icon:"launch"}),s[11]||(s[11]=n("async与std")),e(i,{icon:"launch"}),s[12]||(s[12]=n("deferred。它是默认行为。使用此启动策略，它可以异步运行或不异步运行，具体取决于系统上的负载。但是我们无法控制它。"))])]),a("p",null,[s[13]||(s[13]=n("如果我们不指定启动策略。它的行为类似于std")),e(i,{icon:"launch"}),s[14]||(s[14]=n("async | std")),e(i,{icon:"launch"}),s[15]||(s[15]=n("deferred。 在本文中，我们将使用std")),e(i,{icon:"launch"}),s[16]||(s[16]=n("async启动策略。"))]),s[26]||(s[26]=l(`<p>我们可以在std::async中传递任何回调，即</p><ul><li>函数指针</li><li>函数对象</li><li>Lambda函数 让我们通过一个例子来了解std::async的需求。</li></ul><h3 id="_9-2-需要std-async" tabindex="-1"><a class="header-anchor" href="#_9-2-需要std-async"><span>9.2 需要std::async()</span></a></h3><p>假设我们必须从数据库中获取一些数据(字符串)，并从文件系统中的文件中获取一些数据。然后，我需要合并两个字符串并进行打印。在一个线程中，我们将这样做：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;string&gt;</span></span>
<span class="line"><span>#include &lt;chrono&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>using namespace std::chrono;</span></span>
<span class="line"><span>std::string fetchDataFromDB(std::string recvdData)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Make sure that function takes 5 seconds to complete</span></span>
<span class="line"><span>	// 等待五秒</span></span>
<span class="line"><span>	std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>	// Do stuff like creating DB Connection and fetching Data</span></span>
<span class="line"><span>	// 做一些事情，比如创建数据库连接和获取数据</span></span>
<span class="line"><span>	return &quot;DB_&quot; + recvdData;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>std::string fetchDataFromFile(std::string recvdData)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Make sure that function takes 5 seconds to complete</span></span>
<span class="line"><span>	std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>	// Do stuff like fetching Data File</span></span>
<span class="line"><span>	// 获取数据</span></span>
<span class="line"><span>	return &quot;File_&quot; + recvdData;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Get Start Time</span></span>
<span class="line"><span>	// 获得开始时间</span></span>
<span class="line"><span>	system_clock::time_point start = system_clock::now();</span></span>
<span class="line"><span>	// Fetch Data from DB</span></span>
<span class="line"><span>	// 从数据库中获得数据</span></span>
<span class="line"><span>	std::string dbData = fetchDataFromDB(&quot;Data&quot;);</span></span>
<span class="line"><span>	// Fetch Data from File</span></span>
<span class="line"><span>	// 从文件中获得数据</span></span>
<span class="line"><span>	std::string fileData = fetchDataFromFile(&quot;Data&quot;);</span></span>
<span class="line"><span>	// Get End Time</span></span>
<span class="line"><span>	auto end = system_clock::now();</span></span>
<span class="line"><span>	// 获得运行时间</span></span>
<span class="line"><span>	auto diff = duration_cast &lt;std::chrono::seconds&gt; (end - start).count();</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Total Time Taken = &quot; &lt;&lt; diff &lt;&lt; &quot; Seconds&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	// Combine The Data</span></span>
<span class="line"><span>	// 组合数据</span></span>
<span class="line"><span>	std::string data = dbData + &quot;::&quot; + fileData;</span></span>
<span class="line"><span>	// Printing the combined Data</span></span>
<span class="line"><span>	// 打印数据</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Data = &quot; &lt;&lt; data &lt;&lt; std::endl;</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Total Time Taken = 10 Seconds</span></span>
<span class="line"><span>Data = DB_Data::File_Data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),a("p",null,[s[17]||(s[17]=n("由于fetchDataFromDB()和 fetchDataFromFile()这两个函数 均需要5秒钟，并且都在单个线程中运行，因此，总耗时将为10秒钟。 现在，从数据库和文件中获取数据是相互独立的，而且非常耗时。因此，我们可以并行运行它们。一种方法是创建一个新线程，将promise作为线程函数的参数传递，并在调用线程中从关联的std")),e(i,{icon:"future对象获取数据。另一种简单的方法是使用std"}),s[18]||(s[18]=n("async。"))]),s[27]||(s[27]=l(`<h3 id="_9-3-使用函数指针作为回调调用std-async" tabindex="-1"><a class="header-anchor" href="#_9-3-使用函数指针作为回调调用std-async"><span>9.3 使用函数指针作为回调调用std::async</span></a></h3><p>现在让我们修改上面的代码，并使用std::async()异步调用fetchDataFromDB()，即</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>std::future&lt;std::string&gt; resultFromDB = std::async(std::launch::async, fetchDataFromDB, &quot;Data&quot;);</span></span>
<span class="line"><span>// Do Some Stuff </span></span>
<span class="line"><span>//Fetch Data from DB</span></span>
<span class="line"><span>// Will block till data is available in future&lt;std::string&gt; object.</span></span>
<span class="line"><span>std::string dbData = resultFromDB.get();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)),a("p",null,[s[19]||(s[19]=n("std")),e(i,{icon:"async()做以下事情，它会自动为我们创建一个线程(或从内部线程池中选择)和一个​​promise对象。然后将std"}),s[20]||(s[20]=n("promise对象传递给线程函数，并返回关联的std")),e(i,{icon:"future对象。当我们传递的参数函数退出时，其值将在此promise对象中设置，因此最终返回值将在std"}),s[21]||(s[21]=n("future对象中可用。现在更改上面的示例，并使用std::async从数据库异步读取数据，即"))]),s[28]||(s[28]=l(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;iostream&gt;</span></span>
<span class="line"><span>#include &lt;string&gt;</span></span>
<span class="line"><span>#include &lt;chrono&gt;</span></span>
<span class="line"><span>#include &lt;thread&gt;</span></span>
<span class="line"><span>#include &lt;future&gt;</span></span>
<span class="line"><span>using namespace std::chrono;</span></span>
<span class="line"><span>std::string fetchDataFromDB(std::string recvdData)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Make sure that function takes 5 seconds to complete</span></span>
<span class="line"><span>	std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>	//Do stuff like creating DB Connection and fetching Data</span></span>
<span class="line"><span>	return &quot;DB_&quot; + recvdData;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>std::string fetchDataFromFile(std::string recvdData)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Make sure that function takes 5 seconds to complete</span></span>
<span class="line"><span>	std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>	//Do stuff like fetching Data File</span></span>
<span class="line"><span>	return &quot;File_&quot; + recvdData;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	// Get Start Time</span></span>
<span class="line"><span>	system_clock::time_point start = system_clock::now();</span></span>
<span class="line"><span>	// 异步执行</span></span>
<span class="line"><span>	std::future&lt;std::string&gt; resultFromDB = std::async(std::launch::async, fetchDataFromDB, &quot;Data&quot;);</span></span>
<span class="line"><span>	//Fetch Data from File</span></span>
<span class="line"><span>	std::string fileData = fetchDataFromFile(&quot;Data&quot;);</span></span>
<span class="line"><span>	//Fetch Data from DB</span></span>
<span class="line"><span>	// Will block till data is available in future&lt;std::string&gt; object.</span></span>
<span class="line"><span>	std::string dbData = resultFromDB.get();</span></span>
<span class="line"><span>	// Get End Time</span></span>
<span class="line"><span>	auto end = system_clock::now();</span></span>
<span class="line"><span>	auto diff = duration_cast &lt;std::chrono::seconds&gt; (end - start).count();</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Total Time Taken = &quot; &lt;&lt; diff &lt;&lt; &quot; Seconds&quot; &lt;&lt; std::endl;</span></span>
<span class="line"><span>	//Combine The Data</span></span>
<span class="line"><span>	std::string data = dbData + &quot;::&quot; + fileData;</span></span>
<span class="line"><span>	//Printing the combined Data</span></span>
<span class="line"><span>	std::cout &lt;&lt; &quot;Data = &quot; &lt;&lt; data &lt;&lt; std::endl;</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Total Time Taken = 5 Seconds</span></span>
<span class="line"><span>Data = DB_Data::File_Data</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在只需要5秒钟，便可执行完程序。 此外我们还有两种方式实现同样的功能</p><p><strong>使用函数对象作为回调调用std::async</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/*</span></span>
<span class="line"><span>* Function Object</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>struct DataFetcher</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	std::string operator()(std::string recvdData)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// Make sure that function takes 5 seconds to complete</span></span>
<span class="line"><span>		std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>		//Do stuff like fetching Data File</span></span>
<span class="line"><span>		return &quot;File_&quot; + recvdData;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>//Calling std::async with function object</span></span>
<span class="line"><span>std::future&lt;std::string&gt; fileResult = std::async(DataFetcher(), &quot;Data&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用Lambda函数作为回调调用std::async</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//Calling std::async with lambda function</span></span>
<span class="line"><span>std::future&lt;std::string&gt; resultFromDB = std::async([](std::string recvdData) {</span></span>
<span class="line"><span>	std::this_thread::sleep_for(seconds(5));</span></span>
<span class="line"><span>	//Do stuff like creating DB Connection and fetching Data</span></span>
<span class="line"><span>	return &quot;DB_&quot; + recvdData;</span></span>
<span class="line"><span>}, &quot;Data&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8))])}const m=t(r,[["render",u],["__file","2020-05-29-_编程基础_ C__多线程入门9-async教程和示例.html.vue"]]),b=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A89-async%E6%95%99%E7%A8%8B%E5%92%8C%E7%A4%BA%E4%BE%8B.html","title":"[编程基础] C++多线程入门9-async教程和示例","lang":"zh-CN","frontmatter":{"date":"2020-05-29T17:16:21.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门9-async教程和示例 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 9 async教程和示例 在本文中，我们将讨论如何在C++11中使用std 9.1 什么是std::async() s...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A89-async%E6%95%99%E7%A8%8B%E5%92%8C%E7%A4%BA%E4%BE%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门9-async教程和示例"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门9-async教程和示例 原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 9 async教程和示例 在本文中，我们将讨论如何在C++11中使用std 9.1 什么是std::async() s..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T17:16:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门9-async教程和示例\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T17:16:21.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"9 async教程和示例","slug":"_9-async教程和示例","link":"#_9-async教程和示例","children":[{"level":3,"title":"9.1 什么是std::async()","slug":"_9-1-什么是std-async","link":"#_9-1-什么是std-async","children":[]},{"level":3,"title":"9.2 需要std::async()","slug":"_9-2-需要std-async","link":"#_9-2-需要std-async","children":[]},{"level":3,"title":"9.3 使用函数指针作为回调调用std::async","slug":"_9-3-使用函数指针作为回调调用std-async","link":"#_9-3-使用函数指针作为回调调用std-async","children":[]}]}],"git":{},"readingTime":{"minutes":4.89,"words":1468},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门9-async教程和示例.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p>\\n<h2>9 async教程和示例</h2>\\n<p>在本文中，我们将讨论如何在C++11中使用std</p>\\n<h3>9.1 什么是std::async()</h3>\\n<p>std::async()是一个函数模板，它接受回调(即函数或函数对象)作为参数，并有可能异步执行它们。</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>template &lt;class Fn, class... Args&gt;</span></span>\\n<span class=\\"line\\"><span>future&lt;typename result_of&lt;Fn(Args...)&gt;::type&gt;&nbsp;async (launch policy, Fn&amp;&amp; fn, Args&amp;&amp;... args);</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{m as comp,b as data};
