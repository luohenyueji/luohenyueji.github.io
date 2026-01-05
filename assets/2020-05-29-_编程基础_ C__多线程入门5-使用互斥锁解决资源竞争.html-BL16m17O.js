import{_ as s,c as a,a as l,o as e}from"./app-BOswGe5u.js";const i={};function p(t,n){return e(),a("div",null,n[0]||(n[0]=[l(`<h1 id="编程基础-c-多线程入门5-使用互斥锁解决资源竞争" tabindex="-1"><a class="header-anchor" href="#编程基础-c-多线程入门5-使用互斥锁解决资源竞争"><span>[编程基础] C++多线程入门5-使用互斥锁解决资源竞争</span></a></h1><p>原始C++标准仅支持单线程编程。新的C++标准（称为C++11或C++0x）于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p><h2 id="_5-使用互斥锁解决资源竞争" tabindex="-1"><a class="header-anchor" href="#_5-使用互斥锁解决资源竞争"><span>5 使用互斥锁解决资源竞争</span></a></h2><p>在本文中，我们将讨论如何使用互斥锁来保护多线程环境中的共享数据并避免资源竞争。为了解决多线程环境中的资源竞争，我们需要互斥锁，即每个线程都需要在修改或读取共享数据之前锁定互斥锁，并且在修改数据之后，每个线程都应解锁互斥锁。</p><h3 id="_5-1-std-mutex" tabindex="-1"><a class="header-anchor" href="#_5-1-std-mutex"><span>5.1 std::mutex</span></a></h3><p>在C++11线程库中，互斥锁位于mutex头文件中。表示互斥锁的类是std::mutex类 互斥锁有两种重要的方法：</p><ol><li>lock()</li><li>unlock()</li></ol><p>我们已经在上一篇文章中使用多线程钱包解释了资源竞争。在本文中，我们将看到如何使用std::mutex修复该多线程钱包中的资源竞争。由于电子钱包提供了在电子钱包中添加资金的服务，并且在不同线程之间使用了相同的电子钱包对象，因此我们需要在电子钱包的addMoney()方法中添加锁定，即在增加电子钱包的货币之前获取锁并在离开该钱包之前释放锁功能。让我们看一下代码： 内部维护货币并提供服务/功能的钱包类，即addMoney()。 该成员函数首先获取一个锁，然后将钱包对象的内部货币增加指定的数量，然后释放该锁。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include&lt;iostream&gt;</span></span>
<span class="line"><span>#include&lt;thread&gt;</span></span>
<span class="line"><span>#include&lt;vector&gt;</span></span>
<span class="line"><span>#include&lt;mutex&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Wallet</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int mMoney;</span></span>
<span class="line"><span>	std::mutex mutex;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	Wallet() :mMoney(0) {}</span></span>
<span class="line"><span>	int getMoney() { return mMoney; }</span></span>
<span class="line"><span>	void addMoney(int money)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		mutex.lock();</span></span>
<span class="line"><span>		for (int i = 0; i &lt; money; ++i)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			mMoney++;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		mutex.unlock();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们创建5个线程，所有这些线程将共享Wallet类的同一对象，并使用其addMoney()成员函数并行向内部货币添加100000。因此，如果最初在钱包中的钱为0。那么在完成所有线程的执行后，在Wallet中的钱应该为500000。并且此互斥锁可确保电子钱包中的资金最终为500000。让我们测试一下:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include&lt;iostream&gt;</span></span>
<span class="line"><span>#include&lt;thread&gt;</span></span>
<span class="line"><span>#include&lt;vector&gt;</span></span>
<span class="line"><span>#include&lt;mutex&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Wallet</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int mMoney;</span></span>
<span class="line"><span>	std::mutex mutex;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	Wallet() :mMoney(0) {}</span></span>
<span class="line"><span>	int getMoney() { return mMoney; }</span></span>
<span class="line"><span>	void addMoney(int money)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		mutex.lock();</span></span>
<span class="line"><span>		for (int i = 0; i &lt; money; ++i)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			mMoney++;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		mutex.unlock();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int testMultithreadedWallet()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	Wallet walletObject;</span></span>
<span class="line"><span>	std::vector&lt;std::thread&gt; threads;</span></span>
<span class="line"><span>	for (int i = 0; i &lt; 5; ++i) {</span></span>
<span class="line"><span>		threads.push_back(std::thread(&amp;Wallet::addMoney, &amp;walletObject, 100000));</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; threads.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		threads.at(i).join();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return walletObject.getMoney();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int val = 0;</span></span>
<span class="line"><span>	for (int k = 0; k &lt; 10; k++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if ((val = testMultithreadedWallet()) != 500000)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			std::cout &lt;&lt; &quot;Error at count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;</span></span>
<span class="line"><span>			//break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			std::cout &lt;&lt; &quot;Now count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;</span></span>
<span class="line"><span>			//break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Now count = 0  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 1  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 2  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 3  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 4  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 5  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 6  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 7  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 8  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 9  Money in Wallet = 500000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以保证不会发现钱包中的钱少于500000的单个情况。因为addMoney中的互斥锁可确保一旦一个线程完成了钱的修改，则只有其他任何线程才能修改Wallet中的钱。 但是，如果我们忘记在功能结束时解锁互斥锁，该怎么办？在这种情况下，一个线程将退出而不释放锁，而其他线程将保持等待状态。如果锁定互斥锁后发生某些异常，则可能发生这种情况。为了避免这种情况，我们应该使用std::lock_guard。</p><h3 id="_5-2-std-lock-guard" tabindex="-1"><a class="header-anchor" href="#_5-2-std-lock-guard"><span>5.2 std::lock_guard</span></a></h3><p>Lock_Guard是一个类模板，它实现了互斥锁的RAII。它将互斥体包装在其对象中，并将附加的互斥体锁定在其构造函数中。当调用它的析构函数时，它会释放互斥锁。让我们看看代码：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#include&lt;iostream&gt;</span></span>
<span class="line"><span>#include&lt;thread&gt;</span></span>
<span class="line"><span>#include&lt;vector&gt;</span></span>
<span class="line"><span>#include&lt;mutex&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Wallet</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int mMoney;</span></span>
<span class="line"><span>	std::mutex mutex;</span></span>
<span class="line"><span>public:</span></span>
<span class="line"><span>	Wallet() :mMoney(0) {}</span></span>
<span class="line"><span>	int getMoney() { return mMoney; }</span></span>
<span class="line"><span>	void addMoney(int money)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		// 在构造函数中，它锁定互斥锁 In constructor it locks the mutex</span></span>
<span class="line"><span>		std::lock_guard&lt;std::mutex&gt; lockGuard(mutex);</span></span>
<span class="line"><span>		for (int i = 0; i &lt; money; ++i)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			// If some exception occurs at this poin then destructor of lockGuard will be called due to stack unwinding.</span></span>
<span class="line"><span>			// 如果在此位置发生异常，则由于堆栈展开，将调用lockGuard的析构函数。</span></span>
<span class="line"><span>			mMoney++;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		// Once function exits, then destructor of lockGuard Object will be called. In destructor it unlocks the mutex.</span></span>
<span class="line"><span>		//一旦函数退出，则析构函数，将调用析构函数中的lockGuard对象，它解锁互斥锁。</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int testMultithreadedWallet()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	Wallet walletObject;</span></span>
<span class="line"><span>	std::vector&lt;std::thread&gt; threads;</span></span>
<span class="line"><span>	for (int i = 0; i &lt; 5; ++i) {</span></span>
<span class="line"><span>		threads.push_back(std::thread(&amp;Wallet::addMoney, &amp;walletObject, 100000));</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for (int i = 0; i &lt; threads.size(); i++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		threads.at(i).join();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return walletObject.getMoney();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	int val = 0;</span></span>
<span class="line"><span>	for (int k = 0; k &lt; 10; k++)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		if ((val = testMultithreadedWallet()) != 500000)</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			std::cout &lt;&lt; &quot;Error at count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;</span></span>
<span class="line"><span>			//break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>		else</span></span>
<span class="line"><span>		{</span></span>
<span class="line"><span>			std::cout &lt;&lt; &quot;Now count = &quot; &lt;&lt; k &lt;&lt; &quot;  Money in Wallet = &quot; &lt;&lt; val &lt;&lt; std::endl;</span></span>
<span class="line"><span>			//break;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Now count = 0  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 1  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 2  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 3  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 4  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 5  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 6  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 7  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 8  Money in Wallet = 500000</span></span>
<span class="line"><span>Now count = 9  Money in Wallet = 500000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-参考" tabindex="-1"><a class="header-anchor" href="#_5-3-参考"><span>5.3 参考</span></a></h3><blockquote><p><a href="https://thispointer.com//c11-multithreading-part-5-using-mutex-to-fix-race-conditions/" target="_blank" rel="noopener noreferrer">https://thispointer.com//c11-multithreading-part-5-using-mutex-to-fix-race-conditions/</a></p></blockquote>`,21)]))}const c=s(i,[["render",p],["__file","2020-05-29-_编程基础_ C__多线程入门5-使用互斥锁解决资源竞争.html.vue"]]),r=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A85-%E4%BD%BF%E7%94%A8%E4%BA%92%E6%96%A5%E9%94%81%E8%A7%A3%E5%86%B3%E8%B5%84%E6%BA%90%E7%AB%9E%E4%BA%89.html","title":"[编程基础] C++多线程入门5-使用互斥锁解决资源竞争","lang":"zh-CN","frontmatter":{"date":"2020-05-29T16:56:08.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C++多线程入门5-使用互斥锁解决资源竞争 原始C++标准仅支持单线程编程。新的C++标准（称为C++11或C++0x）于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 5 使用互斥锁解决资源竞争 在本文中，我们将讨论如何使用互斥锁来保护多线程环境中的共享数据并避免资源竞争。为了解决多...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A8/2020-05-29-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C__%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%85%A5%E9%97%A85-%E4%BD%BF%E7%94%A8%E4%BA%92%E6%96%A5%E9%94%81%E8%A7%A3%E5%86%B3%E8%B5%84%E6%BA%90%E7%AB%9E%E4%BA%89.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C++多线程入门5-使用互斥锁解决资源竞争"}],["meta",{"property":"og:description","content":"[编程基础] C++多线程入门5-使用互斥锁解决资源竞争 原始C++标准仅支持单线程编程。新的C++标准（称为C++11或C++0x）于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。 5 使用互斥锁解决资源竞争 在本文中，我们将讨论如何使用互斥锁来保护多线程环境中的共享数据并避免资源竞争。为了解决多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-29T16:56:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C++多线程入门5-使用互斥锁解决资源竞争\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-29T16:56:08.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"5 使用互斥锁解决资源竞争","slug":"_5-使用互斥锁解决资源竞争","link":"#_5-使用互斥锁解决资源竞争","children":[{"level":3,"title":"5.1 std::mutex","slug":"_5-1-std-mutex","link":"#_5-1-std-mutex","children":[]},{"level":3,"title":"5.2 std::lock_guard","slug":"_5-2-std-lock-guard","link":"#_5-2-std-lock-guard","children":[]},{"level":3,"title":"5.3 参考","slug":"_5-3-参考","link":"#_5-3-参考","children":[]}]}],"git":{},"readingTime":{"minutes":4.56,"words":1367},"filePathRelative":"blog/编程基础/C++多线程入门/2020-05-29-[编程基础] C++多线程入门5-使用互斥锁解决资源竞争.md","localizedDate":"2020年5月30日","excerpt":"\\n<p>原始C++标准仅支持单线程编程。新的C++标准（称为C++11或C++0x）于2011年发布。在C++11中，引入了新的线程库。因此运行本文程序需要C++至少符合C++11标准。</p>\\n<h2>5 使用互斥锁解决资源竞争</h2>\\n<p>在本文中，我们将讨论如何使用互斥锁来保护多线程环境中的共享数据并避免资源竞争。为了解决多线程环境中的资源竞争，我们需要互斥锁，即每个线程都需要在修改或读取共享数据之前锁定互斥锁，并且在修改数据之后，每个线程都应解锁互斥锁。</p>\\n<h3>5.1 std::mutex</h3>\\n<p>在C++11线程库中，互斥锁位于mutex头文件中。表示互斥锁的类是std::mutex类\\n互斥锁有两种重要的方法：</p>","autoDesc":true}');export{c as comp,r as data};
