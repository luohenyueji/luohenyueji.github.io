import{_ as n,r as i,o as d,c as l,a as e,b as a,d as s,e as r}from"./app-DtrmxRee.js";const c={},v=r(`<h1 id="编程基础-c-多线程入门3-小心地将参数传递给线程" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门3-小心地将参数传递给线程"><span>[编程基础] C++多线程入门3-小心地将参数传递给线程</span></a></h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。</p><h2 id="_3-小心地将参数传递给线程" tabindex="-1"><a class="header-anchor" href="#_3-小心地将参数传递给线程"><span>3 小心地将参数传递给线程</span></a></h2><p>要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造函数。默认情况下，所有参数都复制到新线程的内部存储中。让我们看一个例子：</p><h3 id="_3-1-在c-11中将简单参数传递给std-thread" tabindex="-1"><a class="header-anchor" href="#_3-1-在c-11中将简单参数传递给std-thread"><span>3.1 在c++11中将简单参数传递给std::thread</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;thread&gt;

void threadCallback(int x, std::string str)
{
	std::cout &lt;&lt; &quot;Passed Number = &quot; &lt;&lt; x &lt;&lt; std::endl;
	std::cout &lt;&lt; &quot;Passed String = &quot; &lt;&lt; str &lt;&lt; std::endl;
}
int main()
{
	int x = 10;
	std::string str = &quot;Sample String&quot;;
	std::thread threadObj(threadCallback, x, str);
	threadObj.join();
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Passed Number = 10
Passed String = Sample String
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-如何不将参数传递给c-11中的线程" tabindex="-1"><a class="header-anchor" href="#_3-2-如何不将参数传递给c-11中的线程"><span>3.2 如何不将参数传递给c++11中的线程</span></a></h3><p>不要将变量的地址从本地堆栈传递到线程的回调函数。因为线程1中的局部变量可能超出了作用域，但是线程2仍然试图通过它的地址访问它。在这种情况下，访问无效地址可能会导致意外行为。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

void newThreadCallback(int * p)
{
	std::cout &lt;&lt; &quot;Inside Thread:&quot;&quot;:p = &quot; &lt;&lt; p &lt;&lt; std::endl;
	std::chrono::milliseconds dura(1000);
	std::this_thread::sleep_for(dura);
	*p = 19;
}
void startNewThread()
{
	int i = 10;
	std::cout &lt;&lt; &quot;Inside Main Thread:&quot;&quot;:i = &quot; &lt;&lt; i &lt;&lt; std::endl;
	std::thread t(newThreadCallback, &amp;i);
	t.detach();
	std::cout &lt;&lt; &quot;Inside Main Thread:&quot;&quot;:i = &quot; &lt;&lt; i &lt;&lt; std::endl;
}
int main()
{
	startNewThread();
	// 表示一段时间，这里是2000 毫秒
	std::chrono::milliseconds dura(2000);
	// 当前线程休眠一段时间
	std::this_thread::sleep_for(dura);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Inside Main Thread::i = 10
Inside Thread::p = Inside Main Thread::i = 10
000000D9DD5BF4A4
程序崩溃
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，将指向堆上内存的指针传递给线程时也要小心。因为在新线程试图访问该存储器之前，某些线程可能会删除该存储器。在这种情况下，访问无效地址可能导致意外行为。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

void newThreadCallback(int * p)
{
	std::cout &lt;&lt; &quot;Inside Thread :  &quot;&quot; : p = &quot; &lt;&lt; p &lt;&lt; std::endl;
	std::chrono::milliseconds dura(1000);
	std::this_thread::sleep_for(dura);
	*p = 19;
}
void startNewThread()
{
	int * p = new int();
	*p = 10;
	std::cout &lt;&lt; &quot;Inside Main Thread :  &quot;&quot; : *p = &quot; &lt;&lt; *p &lt;&lt; std::endl;
	std::thread t(newThreadCallback, p);
	t.detach();
	delete p;
	p = NULL;
}
int main()
{
	startNewThread();
	std::chrono::milliseconds dura(2000);
	std::this_thread::sleep_for(dura);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Inside Main Thread :?  : *p = 10
Inside Thread :?  : p = 0000024AC61ECEA0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-如何在c-11中传递对std-thread的引用" tabindex="-1"><a class="header-anchor" href="#_3-3-如何在c-11中传递对std-thread的引用"><span>3.3 如何在c++11中传递对std::thread的引用</span></a></h3><p>由于参数被复制到新的线程堆栈，因此，如果您需要以通用方式传递引用，即</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;

void threadCallback(int const &amp; x)
{
	int &amp; y = const_cast&lt;int &amp;&gt;(x);
	y++;
	std::cout &lt;&lt; &quot;Inside Thread x = &quot; &lt;&lt; x &lt;&lt; std::endl;
}

int main()
{
	int x = 9;
	std::cout &lt;&lt; &quot;In Main Thread:Before Thread Start x = &quot; &lt;&lt; x &lt;&lt; std::endl;
	std::thread threadObj(threadCallback, x);
	threadObj.join();
	std::cout &lt;&lt; &quot;In Main Thread:After Thread Joins x = &quot; &lt;&lt; x &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>In Main Thread:Before Thread Start x = 9
Inside Thread x = 10
In Main Thread:After Thread Joins x = 9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即使threadCallback接受参数作为参考，但所做的更改仍在线程外部不可见。这是因为线程函数threadCallback中的x引用了在新线程的堆栈上复制的临时值。如何解决呢？使用std::ref()即可。std::ref 用于包装按引用传递的值。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
void threadCallback(int const &amp; x)
{
	int &amp; y = const_cast&lt;int &amp;&gt;(x);
	y++;
	std::cout &lt;&lt; &quot;Inside Thread x = &quot; &lt;&lt; x &lt;&lt; std::endl;
}
int main()
{
	int x = 9;
	std::cout &lt;&lt; &quot;In Main Thread : Before Thread Start x = &quot; &lt;&lt; x &lt;&lt; std::endl;
	std::thread threadObj(threadCallback, std::ref(x));
	threadObj.join();
	std::cout &lt;&lt; &quot;In Main Thread : After Thread Joins x = &quot; &lt;&lt; x &lt;&lt; std::endl;
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>In Main Thread : Before Thread Start x = 9
Inside Thread x = 10
In Main Thread : After Thread Joins x = 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-将指向类成员函数的指针分配为线程函数" tabindex="-1"><a class="header-anchor" href="#_3-4-将指向类成员函数的指针分配为线程函数"><span>3.4 将指向类成员函数的指针分配为线程函数</span></a></h3><p>将指针传递给成员函数作为回调函数，并将指针传递给Object作为第二个参数。例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;thread&gt;
class DummyClass {
public:
    DummyClass()
    {}
    DummyClass(const DummyClass &amp; obj)
    {}
    void sampleMemberFunction(int x)
    {
        std::cout&lt;&lt;&quot;Inside sampleMemberFunction &quot;&lt;&lt;x&lt;&lt;std::endl;
    }
};
int main() {
 
    DummyClass dummyObj;
    int x = 10;
    std::thread threadObj(&amp;DummyClass::sampleMemberFunction,&amp;dummyObj, x);
    threadObj.join();
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Inside sampleMemberFunction 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-参考" tabindex="-1"><a class="header-anchor" href="#_3-5-参考"><span>3.5 参考</span></a></h3>`,32),u={href:"https://thispointer.com//c11-multithreading-part-4-data-sharing-and-race-conditions/",target:"_blank",rel:"noopener noreferrer"};function m(o,b){const t=i("ExternalLinkIcon");return d(),l("div",null,[v,e("blockquote",null,[e("p",null,[e("a",u,[a("https://thispointer.com//c11-multithreading-part-4-data-sharing-and-race-conditions/"),s(t)])])])])}const p=n(c,[["render",m],["__file","2020-05-29-_编程基础_ C__多线程入门3-小心地将参数传递给线程.html.vue"]]),x=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A83-%E5%B0%8F%E5%BF%83%E5%9C%B0%E5%B0%86%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92%E7%BB%99%E7%BA%BF%E7%A8%8B.html","title":"[编程基础] C++多线程入门3-小心地将参数传递给线程","lang":"zh-CN","frontmatter":{"date":"2020-05-29T16:46:39.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门3-小心地将参数传递给线程 原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。 3 小心地将参数传递给线程 要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A83-%E5%B0%8F%E5%BF%83%E5%9C%B0%E5%B0%86%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92%E7%BB%99%E7%BA%BF%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门3-小心地将参数传递给线程"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门3-小心地将参数传递给线程 原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。 3 小心地将参数传递给线程 要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T16:46:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门3-小心地将参数传递给线程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T16:46:39.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"3 小心地将参数传递给线程","slug":"_3-小心地将参数传递给线程","link":"#_3-小心地将参数传递给线程","children":[{"level":3,"title":"3.1 在c++11中将简单参数传递给std::thread","slug":"_3-1-在c-11中将简单参数传递给std-thread","link":"#_3-1-在c-11中将简单参数传递给std-thread","children":[]},{"level":3,"title":"3.2 如何不将参数传递给c++11中的线程","slug":"_3-2-如何不将参数传递给c-11中的线程","link":"#_3-2-如何不将参数传递给c-11中的线程","children":[]},{"level":3,"title":"3.3 如何在c++11中传递对std::thread的引用","slug":"_3-3-如何在c-11中传递对std-thread的引用","link":"#_3-3-如何在c-11中传递对std-thread的引用","children":[]},{"level":3,"title":"3.4 将指向类成员函数的指针分配为线程函数","slug":"_3-4-将指向类成员函数的指针分配为线程函数","link":"#_3-4-将指向类成员函数的指针分配为线程函数","children":[]},{"level":3,"title":"3.5 参考","slug":"_3-5-参考","link":"#_3-5-参考","children":[]}]}],"git":{},"readingTime":{"minutes":3.43,"words":1030},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门3-小心地将参数传递给线程.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准(称为c++11或c++0x)于2011年发布。在c++11中，引入了新的线程库。因此运行本文程序需要C++至少符合c++11标准。</p>\\n<h2>3 小心地将参数传递给线程</h2>\\n<p>要将参数传递给线程的关联可调用对象或函数，只需将其他参数传递给std::thread构造函数。默认情况下，所有参数都复制到新线程的内部存储中。让我们看一个例子：</p>\\n<h3>3.1 在c++11中将简单参数传递给std::thread</h3>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>#include &lt;iostream&gt;\\n#include &lt;string&gt;\\n#include &lt;thread&gt;\\n\\nvoid threadCallback(int x, std::string str)\\n{\\n\\tstd::cout &lt;&lt; \\"Passed Number = \\" &lt;&lt; x &lt;&lt; std::endl;\\n\\tstd::cout &lt;&lt; \\"Passed String = \\" &lt;&lt; str &lt;&lt; std::endl;\\n}\\nint main()\\n{\\n\\tint x = 10;\\n\\tstd::string str = \\"Sample String\\";\\n\\tstd::thread threadObj(threadCallback, x, str);\\n\\tthreadObj.join();\\n\\treturn 0;\\n}\\n</code></pre></div>","autoDesc":true}');export{p as comp,x as data};
