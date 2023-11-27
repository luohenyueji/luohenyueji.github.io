import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as t,c as d,a as n,b as s,d as a,e as v}from"./app-MsA2k2kn.js";const r={},c=v(`<h1 id="编程基础-c-多线程入门5-使用互斥锁解决资源竞争" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门5-使用互斥锁解决资源竞争" aria-hidden="true">#</a> [编程基础] C++多线程入门5-使用互斥锁解决资源竞争</h1><p>原始C++标准仅支持单线程编程。新的C++标准（称为C++11或C++0x）于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_5-使用互斥锁解决资源竞争" tabindex="-1"><a class="header-anchor" href="#_5-使用互斥锁解决资源竞争" aria-hidden="true">#</a> 5 使用互斥锁解决资源竞争</h2><p>在本文中，我们将讨论如何使用互斥锁来保护多线程环境中的共享数据并避免资源竞争。为了解决多线程环境中的资源竞争，我们需要互斥锁，即每个线程都需要在修改或读取共享数据之前锁定互斥锁，并且在修改数据之后，每个线程都应解锁互斥锁。</p><h3 id="_5-1-std-mutex" tabindex="-1"><a class="header-anchor" href="#_5-1-std-mutex" aria-hidden="true">#</a> 5.1 std::mutex</h3><p>在C++11线程库中，互斥锁位于mutex头文件中。表示互斥锁的类是std::mutex类 互斥锁有两种重要的方法：</p><ol><li>lock()</li><li>unlock()</li></ol><p>我们已经在上一篇文章中使用多线程钱包解释了资源竞争。在本文中，我们将看到如何使用std::mutex修复该多线程钱包中的资源竞争。由于电子钱包提供了在电子钱包中添加资金的服务，并且在不同线程之间使用了相同的电子钱包对象，因此我们需要在电子钱包的addMoney()方法中添加锁定，即在增加电子钱包的货币之前获取锁并在离开该钱包之前释放锁功能。让我们看一下代码： 内部维护货币并提供服务/功能的钱包类，即addMoney()。 该成员函数首先获取一个锁，然后将钱包对象的内部货币增加指定的数量，然后释放该锁。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include&lt;iostream&gt;
#include&lt;thread&gt;
#include&lt;vector&gt;
#include&lt;mutex&gt;

class Wallet
{
	int mMoney;
	std::mutex mutex;
public:
	Wallet() :mMoney(0) {}
	int getMoney() { return mMoney; }
	void addMoney(int money)
	{
		mutex.lock();
		for (int i = 0; i &lt; money; ++i)
		{
			mMoney++;
		}
		mutex.unlock();
	}
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建5个线程，所有这些线程将共享Wallet类的同一对象，并使用其addMoney()成员函数并行向内部货币添加100000。因此，如果最初在钱包中的钱为0。那么在完成所有线程的执行后，在Wallet中的钱应该为500000。并且此互斥锁可确保电子钱包中的资金最终为500000。让我们测试一下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include&lt;iostream&gt;
#include&lt;thread&gt;
#include&lt;vector&gt;
#include&lt;mutex&gt;

class Wallet
{
	int mMoney;
	std::mutex mutex;
public:
	Wallet() :mMoney(0) {}
	int getMoney() { return mMoney; }
	void addMoney(int money)
	{
		mutex.lock();
		for (int i = 0; i &lt; money; ++i)
		{
			mMoney++;
		}
		mutex.unlock();
	}
};

int testMultithreadedWallet()
{
	Wallet walletObject;
	std::vector&lt;std::thread&gt; threads;
	for (int i = 0; i &lt; 5; ++i) {
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
			std::cout &lt;&lt; &quot;Error at count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;
			//break;
		}
		else
		{
			std::cout &lt;&lt; &quot;Now count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;
			//break;
		}
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Now count = 0  Money in Wallet = 500000
Now count = 1  Money in Wallet = 500000
Now count = 2  Money in Wallet = 500000
Now count = 3  Money in Wallet = 500000
Now count = 4  Money in Wallet = 500000
Now count = 5  Money in Wallet = 500000
Now count = 6  Money in Wallet = 500000
Now count = 7  Money in Wallet = 500000
Now count = 8  Money in Wallet = 500000
Now count = 9  Money in Wallet = 500000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以保证不会发现钱包中的钱少于500000的单个情况。因为addMoney中的互斥锁可确保一旦一个线程完成了钱的修改，则只有其他任何线程才能修改Wallet中的钱。 但是，如果我们忘记在功能结束时解锁互斥锁，该怎么办？在这种情况下，一个线程将退出而不释放锁，而其他线程将保持等待状态。如果锁定互斥锁后发生某些异常，则可能发生这种情况。为了避免这种情况，我们应该使用std::lock_guard。</p><h3 id="_5-2-std-lock-guard" tabindex="-1"><a class="header-anchor" href="#_5-2-std-lock-guard" aria-hidden="true">#</a> 5.2 std::lock_guard</h3><p>Lock_Guard是一个类模板，它实现了互斥锁的RAII。它将互斥体包装在其对象中，并将附加的互斥体锁定在其构造函数中。当调用它的析构函数时，它会释放互斥锁。让我们看看代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include&lt;iostream&gt;
#include&lt;thread&gt;
#include&lt;vector&gt;
#include&lt;mutex&gt;

class Wallet
{
	int mMoney;
	std::mutex mutex;
public:
	Wallet() :mMoney(0) {}
	int getMoney() { return mMoney; }
	void addMoney(int money)
	{
		// 在构造函数中，它锁定互斥锁 In constructor it locks the mutex
		std::lock_guard&lt;std::mutex&gt; lockGuard(mutex);
		for (int i = 0; i &lt; money; ++i)
		{
			// If some exception occurs at this poin then destructor of lockGuard will be called due to stack unwinding.
			// 如果在此位置发生异常，则由于堆栈展开，将调用lockGuard的析构函数。
			mMoney++;
		}
		// Once function exits, then destructor of lockGuard Object will be called. In destructor it unlocks the mutex.
		//一旦函数退出，则析构函数，将调用析构函数中的lockGuard对象，它解锁互斥锁。
	}
};

int testMultithreadedWallet()
{
	Wallet walletObject;
	std::vector&lt;std::thread&gt; threads;
	for (int i = 0; i &lt; 5; ++i) {
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
			std::cout &lt;&lt; &quot;Error at count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;
			//break;
		}
		else
		{
			std::cout &lt;&lt; &quot;Now count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;
			//break;
		}
	}
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Now count = 0  Money in Wallet = 500000
Now count = 1  Money in Wallet = 500000
Now count = 2  Money in Wallet = 500000
Now count = 3  Money in Wallet = 500000
Now count = 4  Money in Wallet = 500000
Now count = 5  Money in Wallet = 500000
Now count = 6  Money in Wallet = 500000
Now count = 7  Money in Wallet = 500000
Now count = 8  Money in Wallet = 500000
Now count = 9  Money in Wallet = 500000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-参考" tabindex="-1"><a class="header-anchor" href="#_5-3-参考" aria-hidden="true">#</a> 5.3 参考</h3>`,20),u={href:"https://thispointer.com//c11-multithreading-part-5-using-mutex-to-fix-race-conditions/",target:"_blank",rel:"noopener noreferrer"};function o(m,b){const e=l("ExternalLinkIcon");return t(),d("div",null,[c,n("blockquote",null,[n("p",null,[n("a",u,[s("https://thispointer.com//c11-multithreading-part-5-using-mutex-to-fix-race-conditions/"),a(e)])])])])}const x=i(r,[["render",o],["__file","2020-05-29-_编程基础_ C__多线程入门5-使用互斥锁解决资源竞争.html.vue"]]);export{x as default};
