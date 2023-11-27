import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as n,c as d,a as t,b as i,d as l,e as r}from"./app-MsA2k2kn.js";const c={},u=r(`<h1 id="编程基础-c-多线程入门10-packaged-task示例" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门10-packaged-task示例" aria-hidden="true">#</a> [编程基础] C++多线程入门10-packaged_task示例</h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_10-packaged-task-示例" tabindex="-1"><a class="header-anchor" href="#_10-packaged-task-示例" aria-hidden="true">#</a> 10 packaged_task&lt;&gt;示例</h2><p>在此示例中，我们将讨论c++11中std::packaged_task功能及其用法。std::packaged_task&lt;&gt;是一个类模板，代表一个异步任务。它封装了：</p><ol><li>可调用实体，即函数，lambda函数或函数对象。</li><li>一种共享状态，用于存储由关联的回调返回或引发的异常的值。</li></ol><p><strong>需要std::packaged_task&lt;&gt;的情况</strong> 假设我们有一个现有函数，该函数从数据库中获取数据并返回</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Fetch some data from DB
std::string getDataFromDB(std::string token)
{
	// Do some stuff to fetch the data
	std::string data = &quot;Data fetched from DB by Filter::&quot; + token;
	return data;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们要在单独的线程中执行此功能。但是，如何在其他线程完成之后将结果或异常取回主线程呢？ 一种方法是更改​​函数的声明，并在函数中传递std::promise &lt;&gt;。在线程函数中传递std::promise &lt;&gt;对象之前，先从中获取关联的std::future &lt;&gt;并将其保留在主线程中。现在，在线程函数返回其值之前，应在传递的std::promise &lt;&gt;参数中设置该值，以便可以在主线程的关联std::future &lt;&gt;对象中使用它。具体可以见第八篇文章。 但是，如果我们使用std::packaged_task &lt;&gt;，则可以防止创建此std::promise &lt;&gt;和更改功能代码。</p><h3 id="_10-1-结合使用packaged-task-和函数来创建异步任务" tabindex="-1"><a class="header-anchor" href="#_10-1-结合使用packaged-task-和函数来创建异步任务" aria-hidden="true">#</a> 10.1 结合使用packaged_task &lt;&gt;和函数来创建异步任务</h3><p>std::packaged_task &lt;&gt;可以包装普通函数，并使其可作为异步函数运行。在单独的线程中调用std:: packaged_task &lt;&gt;时，它将调用关联的回调并将返回值/异常存储在其内部共享状态中。可以通过std:: future &lt;&gt;对象在其他线程或主函数中访问此值。让我们从上述函数创建一个std::packaged_task &lt;&gt;，在单独的线程中执行，并从其future &lt;&gt;对象获取结果。 <strong>创建std::packaged_task &lt;&gt;对象</strong> std::package_task &lt;&gt;是类模板，因此我们需要将模板参数传递给packaged_task &lt;&gt;，即可调用函数的类型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Create a packaged_task&lt;&gt; that encapsulated the callback i.e. a function
std::packaged_task&lt;std::string (std::string)&gt; task(getDataFromDB);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从中获取future对象</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Fetch the associated future&lt;&gt; from packaged_task&lt;&gt;
std::future&lt;std::string&gt; result = task.get_future();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将packaged_task &lt;&gt;传递给线程</strong> std::packaged_task &lt;&gt;是可移动的，但不可复制，因此我们需要将其移动到线程，即</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Pass the packaged_task to thread to run asynchronously
std::thread th(std::move(task), &quot;Arg&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于packaged_task仅可移动且不可复制，因此我们在将其移至线程之前从其获取了std::future &lt;&gt;对象。线程将执行此任务，该任务在内部调用关联的可调用实体，即我们的函数getDataFromDB()。 现在，当此函数返回值时，std::packaged_task &lt;&gt;会将其设置为关联的共享状态，并且getDataFromDB()返回的结果或异常最终将在关联的future对象中可用。</p><p><strong>在主函数中，从future &lt;&gt;对象获取结果，即</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Fetch the result of packaged_task&lt;&gt; i.e. value returned by getDataFromDB()
std::string data =  result.get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>get()函数将阻塞调用线程，直到可调用实体返回并且std::packaged_task &lt;&gt;将数据设置为可共享状态为止。完整的示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;future&gt;
#include &lt;string&gt;
// Fetch some data from DB
std::string getDataFromDB(std::string token)
{
	// Do some stuff to fetch the data
	std::string data = &quot;Data fetched from DB by Filter::&quot; + token;
	return data;
}
int main()
{
	// Create a packaged_task&lt;&gt; that encapsulated the callback i.e. a function
	// 创建封装回调函数的packaged_task&lt;&gt;
	std::packaged_task&lt;std::string(std::string)&gt; task(getDataFromDB);
	// Fetch the associated future&lt;&gt; from packaged_task&lt;&gt;
	// 从packaged_task&lt;&gt;中获取关联的future&lt;&gt;对象
	std::future&lt;std::string&gt; result = task.get_future();
	// Pass the packaged_task to thread to run asynchronously
	// 将packaged_task传递给线程以异步运行
	std::thread th(std::move(task), &quot;Arg&quot;);
	// Join the thread. Its blocking and returns when thread is finished.
	// 加入线程，完成后返回
	th.join();
	// Fetch the result of packaged_task&lt;&gt; i.e. value returned by getDataFromDB()
	// 获取packaged_task&lt;&gt; 的结果，即getDataFromDB（）返回的值
	std::string data = result.get();
	std::cout &lt;&lt; data &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Data fetched from DB by Filter::Arg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在类似的行中，我们可以创建一个包含lambda函数和函数对象的packaged_task &lt;&gt;，如下所示：</p><p><strong>使用Lambda函数创建packaged_task</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;future&gt;
#include &lt;string&gt;
int main()
{
	// Create a packaged_task&lt;&gt; that encapsulated a lambda function
	std::packaged_task&lt;std::string(std::string)&gt; task([](std::string token) {
		// Do some stuff to fetch the data
		std::string data = &quot;Data From &quot; + token;
		return data;
	});
	// Fetch the associated future&lt;&gt; from packaged_task&lt;&gt;
	std::future&lt;std::string&gt; result = task.get_future();
	// Pass the packaged_task to thread to run asynchronously
	std::thread th(std::move(task), &quot;Arg&quot;);
	// Join the thread. Its blocking and returns when thread is finished.
	th.join();
	// Fetch the result of packaged_task&lt;&gt; i.e. value returned by getDataFromDB()
	std::string data = result.get();
	std::cout &lt;&lt; data &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Data From Arg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用函数对象创建packaged_task</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;future&gt;
#include &lt;string&gt;
/*
* Function Object to Fetch Data from DB
*/
struct DBDataFetcher
{
	std::string operator()(std::string token)
	{
		// Do some stuff to fetch the data
		std::string data = &quot;Data From &quot; + token;
		return data;
	}
};
int main()
{
	// Create a packaged_task&lt;&gt; that encapsulated a lambda function
	std::packaged_task&lt;std::string(std::string)&gt; task(std::move(DBDataFetcher()));
	// Fetch the associated future&lt;&gt; from packaged_task&lt;&gt;
	std::future&lt;std::string&gt; result = task.get_future();
	// Pass the packaged_task to thread to run asynchronously
	std::thread th(std::move(task), &quot;Arg&quot;);
	// Join the thread. Its blocking and returns when thread is finished.
	th.join();
	// Fetch the result of packaged_task&lt;&gt; i.e. value returned by getDataFromDB()
	std::string data = result.get();
	std::cout &lt;&lt; data &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Data From Arg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10-2-参考" tabindex="-1"><a class="header-anchor" href="#_10-2-参考" aria-hidden="true">#</a> 10.2 参考</h3>`,32),v={href:"https://thispointer.com/c11-multithreading-part-10-packaged_task-example-and-tutorial/",target:"_blank",rel:"noopener noreferrer"};function g(o,m){const e=s("ExternalLinkIcon");return n(),d("div",null,[u,t("blockquote",null,[t("p",null,[t("a",v,[i("https://thispointer.com/c11-multithreading-part-10-packaged_task-example-and-tutorial/"),l(e)])])])])}const p=a(c,[["render",g],["__file","2020-05-29-_编程基础_ C__多线程入门10-packaged_task示例.html.vue"]]);export{p as default};
