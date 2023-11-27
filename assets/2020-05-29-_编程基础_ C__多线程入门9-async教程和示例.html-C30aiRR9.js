import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as n,e as i}from"./app-MsA2k2kn.js";const s={},a=i(`<h1 id="编程基础-c-多线程入门9-async教程和示例" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门9-async教程和示例" aria-hidden="true">#</a> [编程基础] C++多线程入门9-async教程和示例</h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_9-async教程和示例" tabindex="-1"><a class="header-anchor" href="#_9-async教程和示例" aria-hidden="true">#</a> 9 async教程和示例</h2><p>在本文中，我们将讨论如何在C++11中使用std::async异步执行任务。std::async在c++11中引入。</p><h3 id="_9-1-什么是std-async" tabindex="-1"><a class="header-anchor" href="#_9-1-什么是std-async" aria-hidden="true">#</a> 9.1 什么是std::async()</h3><p>std::async()是一个函数模板，它接受回调(即函数或函数对象)作为参数，并有可能异步执行它们。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>template &lt;class Fn, class... Args&gt;
future&lt;typename result_of&lt;Fn(Args...)&gt;::type&gt; async (launch policy, Fn&amp;&amp; fn, Args&amp;&amp;... args);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>std::async返回一个std::future&lt;T&gt;，该值存储由std::async()执行的函数对象返回的值。函数期望的参数可以在函数指针参数之后作为参数传递给std::async()。 std::async中的第一个参数是启动策略，它控制std::async的异步行为。我们可以使用3种不同的启动策略创建std::async，即：</p><ol><li>std::launch::async。它保证了异步行为，即传递的函数将在单独的线程中执行。</li><li>std::launch::deferred。非异步行为，即当其他线程将来调用get()以访问共享状态时，将调用Function。</li><li>std::launch::async与std::launch::deferred。它是默认行为。使用此启动策略，它可以异步运行或不异步运行，具体取决于系统上的负载。但是我们无法控制它。</li></ol><p>如果我们不指定启动策略。它的行为类似于std::launch::async | std::launch::deferred。 在本文中，我们将使用std::launch::async启动策略。</p><p>我们可以在std::async中传递任何回调，即</p><ul><li>函数指针</li><li>函数对象</li><li>Lambda函数 让我们通过一个例子来了解std::async的需求。</li></ul><h3 id="_9-2-需要std-async" tabindex="-1"><a class="header-anchor" href="#_9-2-需要std-async" aria-hidden="true">#</a> 9.2 需要std::async()</h3><p>假设我们必须从数据库中获取一些数据(字符串)，并从文件系统中的文件中获取一些数据。然后，我需要合并两个字符串并进行打印。在一个线程中，我们将这样做：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;chrono&gt;
#include &lt;thread&gt;
using namespace std::chrono;
std::string fetchDataFromDB(std::string recvdData)
{
	// Make sure that function takes 5 seconds to complete
	// 等待五秒
	std::this_thread::sleep_for(seconds(5));
	// Do stuff like creating DB Connection and fetching Data
	// 做一些事情，比如创建数据库连接和获取数据
	return &quot;DB_&quot; + recvdData;
}

std::string fetchDataFromFile(std::string recvdData)
{
	// Make sure that function takes 5 seconds to complete
	std::this_thread::sleep_for(seconds(5));
	// Do stuff like fetching Data File
	// 获取数据
	return &quot;File_&quot; + recvdData;
}
int main()
{
	// Get Start Time
	// 获得开始时间
	system_clock::time_point start = system_clock::now();
	// Fetch Data from DB
	// 从数据库中获得数据
	std::string dbData = fetchDataFromDB(&quot;Data&quot;);
	// Fetch Data from File
	// 从文件中获得数据
	std::string fileData = fetchDataFromFile(&quot;Data&quot;);
	// Get End Time
	auto end = system_clock::now();
	// 获得运行时间
	auto diff = duration_cast &lt;std::chrono::seconds&gt; (end - start).count();
	std::cout &lt;&lt; &quot;Total Time Taken = &quot; &lt;&lt; diff &lt;&lt; &quot; Seconds&quot; &lt;&lt; std::endl;
	// Combine The Data
	// 组合数据
	std::string data = dbData + &quot;::&quot; + fileData;
	// Printing the combined Data
	// 打印数据
	std::cout &lt;&lt; &quot;Data = &quot; &lt;&lt; data &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Total Time Taken = 10 Seconds
Data = DB_Data::File_Data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于fetchDataFromDB()和 fetchDataFromFile()这两个函数 均需要5秒钟，并且都在单个线程中运行，因此，总耗时将为10秒钟。 现在，从数据库和文件中获取数据是相互独立的，而且非常耗时。因此，我们可以并行运行它们。一种方法是创建一个新线程，将promise作为线程函数的参数传递，并在调用线程中从关联的std::future对象获取数据。另一种简单的方法是使用std::async。</p><h3 id="_9-3-使用函数指针作为回调调用std-async" tabindex="-1"><a class="header-anchor" href="#_9-3-使用函数指针作为回调调用std-async" aria-hidden="true">#</a> 9.3 使用函数指针作为回调调用std::async</h3><p>现在让我们修改上面的代码，并使用std::async()异步调用fetchDataFromDB()，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>std::future&lt;std::string&gt; resultFromDB = std::async(std::launch::async, fetchDataFromDB, &quot;Data&quot;);
// Do Some Stuff 
//Fetch Data from DB
// Will block till data is available in future&lt;std::string&gt; object.
std::string dbData = resultFromDB.get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>std::async()做以下事情，它会自动为我们创建一个线程(或从内部线程池中选择)和一个​​promise对象。然后将std::promise对象传递给线程函数，并返回关联的std::future对象。当我们传递的参数函数退出时，其值将在此promise对象中设置，因此最终返回值将在std::future对象中可用。现在更改上面的示例，并使用std::async从数据库异步读取数据，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;chrono&gt;
#include &lt;thread&gt;
#include &lt;future&gt;
using namespace std::chrono;
std::string fetchDataFromDB(std::string recvdData)
{
	// Make sure that function takes 5 seconds to complete
	std::this_thread::sleep_for(seconds(5));
	//Do stuff like creating DB Connection and fetching Data
	return &quot;DB_&quot; + recvdData;
}
std::string fetchDataFromFile(std::string recvdData)
{
	// Make sure that function takes 5 seconds to complete
	std::this_thread::sleep_for(seconds(5));
	//Do stuff like fetching Data File
	return &quot;File_&quot; + recvdData;
}
int main()
{
	// Get Start Time
	system_clock::time_point start = system_clock::now();
	// 异步执行
	std::future&lt;std::string&gt; resultFromDB = std::async(std::launch::async, fetchDataFromDB, &quot;Data&quot;);
	//Fetch Data from File
	std::string fileData = fetchDataFromFile(&quot;Data&quot;);
	//Fetch Data from DB
	// Will block till data is available in future&lt;std::string&gt; object.
	std::string dbData = resultFromDB.get();
	// Get End Time
	auto end = system_clock::now();
	auto diff = duration_cast &lt;std::chrono::seconds&gt; (end - start).count();
	std::cout &lt;&lt; &quot;Total Time Taken = &quot; &lt;&lt; diff &lt;&lt; &quot; Seconds&quot; &lt;&lt; std::endl;
	//Combine The Data
	std::string data = dbData + &quot;::&quot; + fileData;
	//Printing the combined Data
	std::cout &lt;&lt; &quot;Data = &quot; &lt;&lt; data &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Total Time Taken = 5 Seconds
Data = DB_Data::File_Data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在只需要5秒钟，便可执行完程序。 此外我们还有两种方式实现同样的功能</p><p><strong>使用函数对象作为回调调用std::async</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/*
* Function Object
*/
struct DataFetcher
{
	std::string operator()(std::string recvdData)
	{
		// Make sure that function takes 5 seconds to complete
		std::this_thread::sleep_for(seconds(5));
		//Do stuff like fetching Data File
		return &quot;File_&quot; + recvdData;
	}
};
//Calling std::async with function object
std::future&lt;std::string&gt; fileResult = std::async(DataFetcher(), &quot;Data&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用Lambda函数作为回调调用std::async</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Calling std::async with lambda function
std::future&lt;std::string&gt; resultFromDB = std::async([](std::string recvdData) {
	std::this_thread::sleep_for(seconds(5));
	//Do stuff like creating DB Connection and fetching Data
	return &quot;DB_&quot; + recvdData;
}, &quot;Data&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30),d=[a];function l(c,r){return t(),n("div",null,d)}const o=e(s,[["render",l],["__file","2020-05-29-_编程基础_ C__多线程入门9-async教程和示例.html.vue"]]);export{o as default};
