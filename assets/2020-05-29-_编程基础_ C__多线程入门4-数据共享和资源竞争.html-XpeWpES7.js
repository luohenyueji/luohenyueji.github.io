import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as t,c as d,a as n,b as a,d as s,e as r}from"./app-MsA2k2kn.js";const v={},c=r(`<h1 id="编程基础-c-多线程入门4-数据共享和资源竞争" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门4-数据共享和资源竞争" aria-hidden="true">#</a> [编程基础] C++多线程入门4-数据共享和资源竞争</h1><p>原始C++标准仅支持单线程编程。新的C++标准(称为C++11或C++0x)于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++ 11标准。</p><h2 id="_4-数据共享和资源竞争" tabindex="-1"><a class="header-anchor" href="#_4-数据共享和资源竞争" aria-hidden="true">#</a> 4 数据共享和资源竞争</h2><p>在多线程环境中，线程之间的数据共享非常容易。但是，这种易于共享的数据可能会导致应用程序出现问题。这样的问题之一就是资源竞争。</p><h3 id="_4-1-资源竞争" tabindex="-1"><a class="header-anchor" href="#_4-1-资源竞争" aria-hidden="true">#</a> 4.1 资源竞争</h3><p>竞争条件是多线程应用程序中出现的一种错误。当两个或多个线程并行执行一组操作时，它们将访问同一内存位置。同样，其中的一个或多个线程会修改该内存位置中的数据，这有时会导致意外结果。这称为竞争条件。 竞赛条件通常不会每次都出现，因此通常很难找到和复制。仅当两个或多个线程的相对执行顺序导致意外结果时，它们才会发生。让我们通过一个例子来理解。 让我们创建一个Wallet类，它在内部维护money并提供一个服务/功能，即addMoney()。此成员函数按指定的计数递增钱包对象的内部货币。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Wallet
{
	int mMoney;
public:
	Wallet() :mMoney(0) {}
	int getMoney() {
		return mMoney;
	}
	void addMoney(int money)
	{
		for (int i = 0; i &lt; money; ++i)
		{
			mMoney++;
		}
	}
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建5个线程，所有这些线程将共享Wallet类的同一对象，并使用其addMoney()成员函数并行向内部货币添加100000(这个数字要足够大，否则无效果)。因此，如果最初在钱包中的钱为0。那么在完成所有线程的执行后，在Wallet中的钱应该为500000。但是，由于所有线程正在同时修改共享数据，因此在某些情况下，最终钱包中的钱可能少于500000。让我们测试一下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;thread&gt;

class Wallet
{
	int mMoney;
public:
	Wallet() :mMoney(0) {}
	int getMoney() {
		return mMoney;
	}
	void addMoney(int money)
	{
		for (int i = 0; i &lt; money; ++i)
		{
			mMoney++;
		}
	}
};

int testMultithreadedWallet()
{
	Wallet walletObject;
	std::vector&lt;std::thread&gt; threads;
	for (int i = 0; i &lt; 5; ++i)
	{
		threads.push_back(std::thread(&amp;Wallet::addMoney, &amp;walletObject, 100000));
	}
	for (int i = 0; i &lt; threads.size(); i++)
	{
		threads.at(i).join();
	}
	return walletObject.getMoney();
}
int main()
{
	int val = 0;
	for (int k = 0; k &lt; 10; k++)
	{
		if ((val = testMultithreadedWallet()) != 500000)
		{
			std::cout &lt;&lt; &quot;Error at count = &quot; &lt;&lt; k &lt;&lt; &quot; Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;
		}
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Error at count = 0 Money in Wallet = 360389
Error at count = 1 Money in Wallet = 420648
Error at count = 2 Money in Wallet = 382707
Error at count = 3 Money in Wallet = 397744
Error at count = 4 Money in Wallet = 280937
Error at count = 5 Money in Wallet = 248475
Error at count = 6 Money in Wallet = 240935
Error at count = 7 Money in Wallet = 320526
Error at count = 8 Money in Wallet = 328090
Error at count = 9 Money in Wallet = 370140
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于同一Wallet类对象的addMoney()成员函数执行了5次，因此其内部货币预计为500000。但是由于addMoney()成员函数并行执行，因此在某些情况下mMoney会比500000小得多。</p><p><strong>为什么会这样？</strong> 每个线程并行递增相同的“mMoney”成员变量。虽然看起来只有一行，但是这个“mMoney++”实际上被转换成三个机器命令。</p><ol><li>将“ mMoney”变量值加载到寄存器中</li><li>增量寄存器的值</li><li>用寄存器的值更新变量“ mMoney”</li></ol><p>现在假设在特殊情况下，上述命令的执行顺序如下： <img src="https://img-blog.csdnimg.cn/20200529165115371.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70#pic_center" alt="在这里插入图片描述" loading="lazy"></p><p>在这种情况下，一个增量将被忽略，因为不是将“mMoney”变量递增两次，而是不同的寄存器递增，并且“mMoney”变量的值被覆盖。 假设在此方案之前，mMoney为46，如上图所示，它增加了2倍，因此预期结果为48。但是由于上述方案中的资源竞争，mMoney的最终值将仅为47。</p><h3 id="_4-2-如何解决比赛条件" tabindex="-1"><a class="header-anchor" href="#_4-2-如何解决比赛条件" aria-hidden="true">#</a> 4.2 如何解决比赛条件？</h3><p>为了解决这个问题，我们需要使用Lock机制，即每个线程需要在修改或读取共享数据之前获取一个锁，并且在修改数据之后，每个线程都应该解锁该锁。我们将在下一篇文章中讨论这一点。</p><h3 id="_4-3-参考" tabindex="-1"><a class="header-anchor" href="#_4-3-参考" aria-hidden="true">#</a> 4.3 参考</h3>`,19),o={href:"https://thispointer.com/c11-multithreading-part-4-data-sharing-and-race-conditions/",target:"_blank",rel:"noopener noreferrer"};function u(m,b){const e=l("ExternalLinkIcon");return t(),d("div",null,[c,n("blockquote",null,[n("p",null,[n("a",o,[a("https://thispointer.com/c11-multithreading-part-4-data-sharing-and-race-conditions/"),s(e)])])])])}const p=i(v,[["render",u],["__file","2020-05-29-_编程基础_ C__多线程入门4-数据共享和资源竞争.html.vue"]]);export{p as default};
