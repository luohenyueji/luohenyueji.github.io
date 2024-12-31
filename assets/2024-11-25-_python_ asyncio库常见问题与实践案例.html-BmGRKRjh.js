import{_ as p,r as e,o,c,a as n,b as s,d as t,e as i}from"./app-DtrmxRee.js";const l={},u=n("h1",{id:"python-asyncio库常见问题与实践案例",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-asyncio库常见问题与实践案例"},[n("span",null,"[python] asyncio库常见问题与实践案例")])],-1),k={href:"https://www.cnblogs.com/luohenyueji/p/18562526",target:"_blank",rel:"noopener noreferrer"},d=i(`<h2 id="_1-asyncio程序的常见错误" tabindex="-1"><a class="header-anchor" href="#_1-asyncio程序的常见错误"><span>1 asyncio程序的常见错误</span></a></h2><p>本节展示了在使用asyncio模块时，开发人员常遇到的一些常见错误示例。以下是四个最常见的异步编程错误：</p><ol><li>直接调用并运行协程。</li><li>主协程过早退出。</li><li>错误使用asyncio的低级API。</li><li>程序出现竞争条件或死锁问题。</li></ol><h3 id="_1-1-试图直接调用并运行协程" tabindex="-1"><a class="header-anchor" href="#_1-1-试图直接调用并运行协程"><span>1.1 试图直接调用并运行协程</span></a></h3><p>协程通常通过<code>async def</code>定义，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 自定义协程</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">custom_coro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;hi there&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若直接像函数一样调用该协程，通常不会执行预期的操作，而是创建一个协程对象。这种调用方式不会触发协程的执行：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 错误：像函数一样调用协程</span>
custom_coro<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 这只是创建了一个协程对象，并不会执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，返回的是一个协程对象，而不是立即执行协程主体，这忽略协程必须在事件循环中运行。如果协程未被执行，系统将发出以下运行时警告：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>sys:1: RuntimeWarning: coroutine &#39;custom_coro&#39; was never awaited
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要正确执行协程，需要在<code>asyncio</code>事件循环中等待该对象。例如，使用<code>asyncio.run()</code>启动事件循环来执行协程：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 正确：通过 asyncio.run() 运行协程</span>
<span class="token keyword">import</span> asyncio

asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>custom_coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种执行协程方法是通过<code>await</code>表达式在现有协程中挂起并调度其他协程。例如，定义一个新的协程，在其中调用 <code>custom_coro()</code>：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 正确：在协程中使用 await 调度另一个协程</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> custom_coro<span class="token punctuation">(</span><span class="token punctuation">)</span> 

<span class="token comment"># 使用 asyncio.run 启动事件循环</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-主协程过早退出" tabindex="-1"><a class="header-anchor" href="#_1-2-主协程过早退出"><span>1.2 主协程过早退出</span></a></h3><p>在异步编程中，任务的执行可能无法按预期及时完成。通过<code>asyncio.create_task()</code>可以并行运行多个协程，但如果主协程提前退出，这些任务可能会被强制中止。为确保所有任务能够在主协程退出前完成，主协程应在无其他活动时显式等待剩余任务的完成。可以使用<code>asyncio.all_tasks()</code>来获取当前事件循环中的所有任务，并在移除主协程本身后，通过<code>asyncio.wait()</code>等待其他任务的执行结果。如果不移除当前协程，<code>asyncio.wait</code>会等待所有任务完成，包括当前协程，从而导致程序不退出（死锁）。示例如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务 1 开始&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务 1 完成&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务 2 开始&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务 2 完成&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 创建多个任务</span>
    task1 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>task_1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    task2 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>task_2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 获取所有正在运行的任务的集合</span>
    all_tasks <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>all_tasks<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 获取当前任务（即主协程）</span>
    current_task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>current_task<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 从所有任务列表中删除当前任务</span>
    all_tasks<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>current_task<span class="token punctuation">)</span>
    
    <span class="token comment"># 暂停直到所有任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>all_tasks<span class="token punctuation">)</span>

<span class="token comment"># 运行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务 1 开始
任务 2 开始
任务 2 完成
任务 1 完成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-错误使用asyncio的低级api" tabindex="-1"><a class="header-anchor" href="#_1-3-错误使用asyncio的低级api"><span>1.3 错误使用asyncio的低级API</span></a></h3><p><code>asyncio</code>提供了两类API：一类是面向应用程序开发者的高级API，另一类是面向框架开发者的低级API。低级API主要为高级API提供底层支持，如事件循环、传输协议等内部结构。在大多数情况下，推荐优先使用高级API，特别是在学习阶段。只有在需要实现特定功能时，才应考虑使用低级API。尽管学习低级API具有一定的价值，但不应在刚开始时就使用。建议先通过高级API熟悉异步编程的基本概念，进行应用开发，掌握核心知识后，再深入探讨技术细节。例如：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 高级API：推荐的用法</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">hello_world</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;你好，世界！&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 使用 asyncio.run 来启动事件循环</span>
<span class="token keyword">def</span> <span class="token function">run_hello_world</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>hello_world<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 低级API：不推荐直接使用</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">low_level_example</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取当前事件循环</span>
    task <span class="token operator">=</span> loop<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>hello_world<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 创建任务</span>
    <span class="token keyword">await</span> task  <span class="token comment"># 显式等待任务完成</span>

<span class="token comment"># 运行高级 API 示例</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;使用 asyncio.run 运行：&quot;</span><span class="token punctuation">)</span>
run_hello_world<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 运行低级 API 示例</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n使用低级 API 运行：&quot;</span><span class="token punctuation">)</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>low_level_example<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-程序出现竞争条件或死锁问题" tabindex="-1"><a class="header-anchor" href="#_1-4-程序出现竞争条件或死锁问题"><span>1.4 程序出现竞争条件或死锁问题</span></a></h3><p>竞争条件和死锁是并发编程中常见的错误。竞争条件发生在多个任务同时访问相同资源时，缺乏适当的控制可能导致数据错误或丢失。死锁则是指不同任务互相等待对方释放资源，最终导致所有任务无法继续执行。</p><p>许多Python开发者认为，使用<code>asyncio</code>协程可以避免这些问题，因为在任何时刻，事件循环中只有一个协程在执行。然而，协程在运行过程中可能会暂停和恢复，并且可能会访问共享资源。如果对这些资源没有适当的保护，就可能会引发竞争条件。此外，在协程同步资源时处理不当，也有可能导致死锁。因此，在编写<code>asyncio</code>程序时，确保协程的安全性至关重要。</p><h4 id="_1-4-1-竞争条件问题" tabindex="-1"><a class="header-anchor" href="#_1-4-1-竞争条件问题"><span>1.4.1 竞争条件问题</span></a></h4><p>以下示例代码模拟了两个异步任务并行增加共享变量<code>counter</code>，每个任务循环10000次对<code>counter</code>进行递增操作。通过<code>awaitasyncio.sleep(0)</code>来模拟上下文切换，确保两个任务能够交替执行。然而，由于未使用同步机制（如锁），会导致竞态条件。因此，最终的<code>counter</code>值可能小于预期的20000，而不是20000，因为两个任务可能在读取和更新<code>counter</code>的值时发生冲突，导致多个协程可能重复更新相同的数据：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 共享资源</span>
counter <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        temp <span class="token operator">=</span> counter
        temp <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>  <span class="token comment"># 让出控制权，模拟上下文切换</span>
        counter <span class="token operator">=</span> temp

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>increment<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> increment<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;最终计数器的值:&quot;</span><span class="token punctuation">,</span> counter<span class="token punctuation">)</span>  

<span class="token comment"># 运行 asyncio 程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>最终计数器的值: 10000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了解决这个问题，可以使用 <code>asyncio.Lock</code> 来同步对共享资源 <code>counter</code> 的访问。然而，由于<code>asyncio.Lock</code>与<code>asyncio.run</code>之间的事件循环可能不匹配，通常会在某些环境中（如特定的 IDE 或脚本运行环境）出现问题。原因在于<code>asyncio.run</code> 创建并管理一个新的事件循环，而锁 (<code>asyncio.Lock</code>) 可能会被不同的事件循环使用，从而导致不一致。为避免这种情况，可以显式创建并使用一个事件循环，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 共享资源</span>
counter <span class="token operator">=</span> <span class="token number">0</span>
<span class="token comment"># 创建锁</span>
lock <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> lock<span class="token punctuation">:</span>  <span class="token comment"># 确保在修改 counter 时，只有一个任务可以访问</span>
            temp <span class="token operator">=</span> counter
            temp <span class="token operator">+=</span> <span class="token number">1</span>
            <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>  <span class="token comment"># 让出控制权，模拟上下文切换</span>
            counter <span class="token operator">=</span> temp

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>increment<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> increment<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;最终计数器的值:&quot;</span><span class="token punctuation">,</span> counter<span class="token punctuation">)</span>

<span class="token comment"># 显式创建事件循环并运行</span>
loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>最终计数器的值: 20000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-4-2-死锁问题" tabindex="-1"><a class="header-anchor" href="#_1-4-2-死锁问题"><span>1.4.2 死锁问题</span></a></h4><p><strong>死锁介绍</strong></p><p>死锁（Deadlock）是并发编程中的一种常见问题，它发生在多个任务之间的资源争用中，导致所有任务都陷入无法继续执行的僵局。即使在Python中使用<code>asyncio</code>协程框架，资源竞争和同步问题也可能导致死锁的发生，尤其是在协程需要同步资源（如锁）时。如果同步机制设计不当，容易引发死锁。</p><p>死锁的特征如下：</p><ul><li>循环等待：多个任务之间相互等待对方释放资源，从而形成一个循环等待的关系。例如，任务1等待任务2释放资源，而任务2又在等待任务1释放资源，形成闭环。</li><li>不可抢占：每个任务持有的资源（如锁）不能被其他任务强制抢占。只有在任务主动释放资源时，其他任务才能获取该资源。</li><li>持有资源且等待：任务持有某些资源（如锁），同时又在等待其他资源的释放。由于任务在持有资源的情况下无法继续执行，导致系统中的任务无法前进。</li></ul><p>以下代码中的死锁是典型的循环等待问题，所有相关任务陷入相互等待的死循环，无法继续执行：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 创建两个共享锁</span>
lock1 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>
lock2 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：尝试获取锁1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> lock1<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：已获取锁1，尝试获取锁2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些操作</span>
    <span class="token keyword">await</span> lock2<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁2</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：已获取锁2&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 释放锁</span>
    lock1<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock2<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：尝试获取锁2&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> lock2<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁2</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：已获取锁2，尝试获取锁1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些操作</span>
    <span class="token keyword">await</span> lock1<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：已获取锁1&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 释放锁</span>
    lock1<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock2<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 启动两个任务</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>task1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> task2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 创建事件循环并运行</span>
loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果如下，由于两个任务都被挂起，程序无法退出，且永远不会打印出&quot;任务1：已获取锁2&quot;或&quot;任务2：已获取锁1&quot;：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务1：尝试获取锁1
任务1：已获取锁1，尝试获取锁2
任务2：尝试获取锁2
任务2：已获取锁2，尝试获取锁1
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>asyncio中死锁的避免</strong></p><p>在使用<code>asyncio</code>时，为了避免死锁，可以采取以下几种方法：</p><ol><li>锁的顺序管理：确保所有任务按照相同的顺序获取锁，以防止发生相互等待的情况。</li><li>尝试获取锁：使用<code>asyncio.Lock</code>的<code>acquire</code>方法并设置超时时间，避免任务长时间处于等待锁的状态。</li><li>使用<code>async with</code>：通过<code>async with</code>语句来管理锁，这样可以确保在任务完成后自动释放锁，避免因忘记释放锁而引发问题。</li></ol><p>根据这一思路，前面死锁的案例解决示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 创建两个共享锁</span>
lock1 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>
lock2 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：尝试获取锁1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> lock1<span class="token punctuation">:</span>  <span class="token comment"># 使用async with获取锁，自动释放</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：已获取锁1，尝试获取锁2&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些操作</span>
        
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：尝试获取锁2&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> lock2<span class="token punctuation">:</span>  <span class="token comment"># 使用async with获取锁，自动释放</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务1：已获取锁2&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：尝试获取锁1&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">with</span> lock1<span class="token punctuation">:</span>  <span class="token comment"># 使用async with获取锁，自动释放</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：已获取锁1，尝试获取锁2&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些操作</span>
        
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：尝试获取锁2&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> lock2<span class="token punctuation">:</span>  <span class="token comment"># 使用async with获取锁，自动释放</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务2：已获取锁2&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 启动两个任务</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>task1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> task2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 创建事件循环并运行</span>
loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果如下，可以看到两个任务避免了死锁：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>任务1：尝试获取锁1
任务1：已获取锁1，尝试获取锁2
任务2：尝试获取锁1
任务1：尝试获取锁2
任务1：已获取锁2
任务2：已获取锁1，尝试获取锁2
任务2：尝试获取锁2
任务2：已获取锁2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-asyncio程序的常见问题" tabindex="-1"><a class="header-anchor" href="#_2-asyncio程序的常见问题"><span>2 asyncio程序的常见问题</span></a></h2><p>在使用asyncio编写异步程序时，开发者可能会遇到一系列常见问题，这些问题涉及到任务的管理、执行流程、性能优化等多个方面。以下是一些常见的问题和挑战：</p><ol><li>任务的等待、停止、结果获取</li><li>如何在后台运行和等待任务</li><li>任务的延迟后运行和后续运行</li><li>如何显示运行任务的进度</li><li>如何在asyncio中执行阻塞I/O或CPU密集型函数</li><li>Python协程：操作系统原生支持吗</li></ol><h3 id="_2-1-任务的等待、停止、结果获取" tabindex="-1"><a class="header-anchor" href="#_2-1-任务的等待、停止、结果获取"><span>2.1 任务的等待、停止、结果获取</span></a></h3><h4 id="_2-1-1-如何等待任务" tabindex="-1"><a class="header-anchor" href="#_2-1-1-如何等待任务"><span>2.1.1 如何等待任务</span></a></h4><p>可以通过直接等待<code>asyncio.Task</code>对象来等待任务的完成：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 等待任务完成</span>
<span class="token keyword">await</span> task
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也同时创建并等待任务完成。例如：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 创建并等待任务完成</span>
<span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>custom_coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>与协程不同，任务可以多次等待而不会引发错误。以下是一个演示如何多次等待同一任务的示例，在此例中，<code>await task</code>两次都能成功执行，因为<code>task</code>已经完成并保存了返回值：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">other_coro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&quot;任务完成&quot;</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 将协程包装在任务中并安排其执行</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>other_coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 第一次等待任务并获取返回值</span>
    value1 <span class="token operator">=</span> <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span>value1<span class="token punctuation">)</span>
    
    <span class="token comment"># 再次等待任务（任务已经完成）</span>
    value2 <span class="token operator">=</span> <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span>value2<span class="token punctuation">)</span>

<span class="token comment"># 运行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-何时停止任务" tabindex="-1"><a class="header-anchor" href="#_2-1-2-何时停止任务"><span>2.1.2 何时停止任务</span></a></h4><p>可以通过<code>asyncio.Task</code>对象的<code>cancel()</code>方法取消任务。若任务被成功取消，<code>cancel()</code>方法返回<code>True</code>，否则返回<code>False</code>。例如：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 取消任务</span>
was_cancelled <span class="token operator">=</span> task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-如何获取任务的返回值" tabindex="-1"><a class="header-anchor" href="#_2-1-3-如何获取任务的返回值"><span>2.1.3 如何获取任务的返回值</span></a></h4><p>在Python中创建一个<code>asyncio</code>任务后，有两种方法可以从 <code>asyncio.Task</code> 中检索返回值：</p><ol><li>等待任务（使用 <code>await</code>）。</li><li>调用 <code>result()</code> 方法。</li></ol><p>基于<code>await</code>函数，等待任务时，调用者会挂起，直到任务完成并返回结果。如果任务已完成，返回值会立即提供。以下代码展示了如何等待任务并获取其返回值：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">other_coro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&quot;任务完成&quot;</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 将协程包装在任务中并安排其执行</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>other_coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待任务完成并获取返回值</span>
    value <span class="token operator">=</span> <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

<span class="token comment"># 运行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以通过调用 <code>asyncio.Task</code> 对象的 <code>result()</code> 方法获取任务的返回值。此时要求任务已完成。如果任务未完成，调用 <code>result()</code> 会引发 <code>InvalidStateError</code> 异常。如果任务被取消，则会引发 <code>CancelledError</code> 异常。以下是一个使用 <code>result()</code> 方法的例子：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">other_coro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&quot;任务完成&quot;</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>other_coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待任务完成</span>
    <span class="token keyword">await</span> task
    
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 获取任务的返回值</span>
        value <span class="token operator">=</span> task<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>InvalidStateError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务尚未完成&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> asyncio<span class="token punctuation">.</span>CancelledError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务已取消&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 运行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-如何在后台运行和等待任务" tabindex="-1"><a class="header-anchor" href="#_2-2-如何在后台运行和等待任务"><span>2.2 如何在后台运行和等待任务</span></a></h3><h4 id="_2-2-1-如何在后台运行任务" tabindex="-1"><a class="header-anchor" href="#_2-2-1-如何在后台运行任务"><span>2.2.1 如何在后台运行任务</span></a></h4><p>通过 <code>asyncio.create_task()</code>可以将协程封装为Task对象，并在后台执行。创建的任务对象会立即返回，且不会阻塞调用者的执行。为了确保任务能够开始执行，可以使用 <code>await asyncio.sleep(0)</code> 暂停片刻。之所以使用 <code>await asyncio.sleep(0)</code>，是因为新创建的任务并不会立刻开始执行。事件循环负责管理多个任务，它会根据调度策略决定哪个任务优先执行。通过 <code>await asyncio.sleep(0)</code> 暂时让出执行权，使得事件循环有机会调度并执行刚刚创建的任务。这样，<code>await asyncio.sleep(0)</code> 确保了任务在创建后能尽早开始执行，同时不会阻塞主协程的其他操作。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">other_coroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;开始执行 other_coroutine&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;other_coroutine 执行完毕&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 创建并调度任务</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>other_coroutine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 暂停片刻以确保任务开始执行</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;主协程正在执行&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待任务完成</span>
    <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务执行完毕&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 运行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，后台任务可以在程序运行时执行，不会妨碍主程序的结束。如果主程序没有其他待执行的任务，而后台任务仍在进行中，那么需要确保程序在后台任务完成后才会完全退出。</p><h4 id="_2-2-2-如何等待所有后台任务" tabindex="-1"><a class="header-anchor" href="#_2-2-2-如何等待所有后台任务"><span>2.2.2 如何等待所有后台任务</span></a></h4><p>在使用<code>asyncio</code>时，可能需要等待多个独立的任务完成。比如，当多个任务同时运行时，有时想要等待所有任务完成，但又不想一直阻塞当前正在运行的任务。为了实现这个功能，可以通过以下步骤：</p><ol><li>获取所有当前任务：使用<code>asyncio.all_tasks()</code>可以获取到当前事件循环中的所有任务。</li><li>排除当前任务：通过<code>asyncio.current_task()</code>获取当前正在运行的任务，并将其从任务集合中移除。这样可以避免等待当前任务自己。</li><li>等待所有剩余任务完成：使用<code>asyncio.wait()</code>来等待所有任务完成，直到它们都执行完毕。</li></ol><p>示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">example_coroutine</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 这是一个模拟任务的协程，睡眠 1 秒钟</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;任务 </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> 完成。&quot;</span></span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 创建多个协程任务</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>example_coroutine<span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    
    <span class="token comment"># 获取所有正在运行的任务</span>
    all_tasks <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>all_tasks<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 获取当前正在运行的任务（即 main 协程）</span>
    current_task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>current_task<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 从任务集合中移除当前任务</span>
    all_tasks<span class="token punctuation">.</span>remove<span class="token punctuation">(</span>current_task<span class="token punctuation">)</span>
    
    <span class="token comment"># 等待所有其他任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>all_tasks<span class="token punctuation">)</span>

<span class="token comment"># 启动事件循环并执行主协程</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-任务的延迟后运行和后续运行" tabindex="-1"><a class="header-anchor" href="#_2-3-任务的延迟后运行和后续运行"><span>2.3 任务的延迟后运行和后续运行</span></a></h3><h4 id="_2-3-1-任务的延迟后运行" tabindex="-1"><a class="header-anchor" href="#_2-3-1-任务的延迟后运行"><span>2.3.1 任务的延迟后运行</span></a></h4><p>想要实现任务的延迟后运行，可以通过开发一个自定义的包装协程，使其在延迟指定时间后执行目标协程。该包装协程接受两个参数：目标协程和延迟时间（单位为秒）。它会先休眠指定的延迟时间，然后执行传入的目标协程。</p><p>以下代码展示了如何通过自定义包装协程 <code>delay</code>，在指定的延迟时间后执行目标协程。<code>delay</code> 协程通过 <code>asyncio.sleep()</code> 实现延时，随后再执行传入的目标协程。可以在不同场景中使用该方法，如直接挂起协程或将任务安排为独立执行：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 延迟几秒后启动另一个协程的包装协程</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">delay</span><span class="token punctuation">(</span>coro<span class="token punctuation">,</span> seconds<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    延迟指定时间（秒）后执行目标协程。

    参数:
    coro: 要执行的目标协程
    seconds: 延迟时间，单位为秒
    &quot;&quot;&quot;</span>
    <span class="token comment"># 暂停指定时间（以秒为单位）</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>seconds<span class="token punctuation">)</span>
    <span class="token comment"># 执行目标协程</span>
    <span class="token keyword">await</span> coro

<span class="token comment"># 示例目标协程</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">my_coroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;目标协程开始执行&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># 模拟一些工作</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;目标协程执行完成&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 使用包装协程时，可以创建协程对象并直接等待，或将其作为任务独立执行</span>

<span class="token comment"># 1. 调用者可以挂起并调度延迟后的协程</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;延迟10秒后执行目标协程:&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> delay<span class="token punctuation">(</span>my_coroutine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;目标协程已经完成执行&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 2. 或者调用者可以安排延迟协程独立运行</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">schedule_task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;将目标协程安排为独立任务，延迟10秒后执行&quot;</span><span class="token punctuation">)</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>delay<span class="token punctuation">(</span>my_coroutine<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> task  <span class="token comment"># 等待任务完成</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务已完成&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 运行示例</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 运行主协程</span>

    <span class="token comment"># 或者运行独立任务的调度</span>
    <span class="token comment"># asyncio.run(schedule_task())</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-任务的后续运行" tabindex="-1"><a class="header-anchor" href="#_2-3-2-任务的后续运行"><span>2.3.2 任务的后续运行</span></a></h4><p>在asyncio中，触发后续任务的方式主要有三种：</p><ol><li>通过已完成的任务本身调度后续任务</li><li>通过任务发起方调度后续任务</li><li>使用回调函数自动调度后续任务</li></ol><p>逐一分析这三种方式：</p><p><strong>1. 通过已完成的任务本身调度后续任务</strong></p><p>已完成的任务可以触发后续任务的调度，通常依赖于某些状态检查来决定是否应该发起后续任务。任务调度可以通过<code>asyncio.create_task()</code>来完成。示例代码展示了运行指定任务后直接调度后续任务：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务开始执行。&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟任务执行</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务执行完成。&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> followup_task<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 在任务完成后直接调度后续任务</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">followup_task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;正在执行后续任务。&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟后续任务执行</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;后续任务执行完成。&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 启动事件循环，执行任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> task<span class="token punctuation">(</span><span class="token punctuation">)</span>

asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 通过任务发起方调度后续任务</strong></p><p>任务发起方可以根据实际需要决定是否继续启动后续任务。在启动第一个任务时，可以保留 <code>asyncio.Task</code> 对象，通过检查任务的结果或状态，来判断是否启动后续任务。任务发起方还可以选择等待后续任务完成，也可以选择不等待。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 模拟一个任务</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">True</span>  <span class="token comment"># 假设任务成功完成，返回True</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">followup_task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 模拟后续任务</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;后续任务执行&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 发起并等待第一个任务</span>
    task_1 <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>task<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待第一个任务完成</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> task_1
    
    <span class="token comment"># 检查任务结果</span>
    <span class="token keyword">if</span> result<span class="token punctuation">:</span>
        <span class="token comment"># 发起后续任务</span>
        <span class="token keyword">await</span> followup_task<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 运行主程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 使用回调函数自动调度后续任务</strong></p><p>在任务发起时，可以为其注册一个回调函数。该回调函数会在任务完成后自动执行。回调函数接收一个 <code>asyncio.Task</code> 对象作为参数，但它不会等待后续任务的执行。因为回调函数通常是普通的Python函数，无法进行异步操作。示例代码：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 定义回调函数</span>
<span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 安排并启动后续任务</span>
    <span class="token comment"># 注意：这里不能直接使用 await，需通过 create_task 调度异步任务</span>
    asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>followup<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 定义第一个异步任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">work</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;工作任务正在执行...&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些异步操作</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;工作任务完成!&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 定义后续异步任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">followup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;后续任务正在执行...&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一些异步操作</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;后续任务完成!&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 创建事件循环并运行任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 发起任务并注册回调函数</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>work<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    task<span class="token punctuation">.</span>add_done_callback<span class="token punctuation">(</span>callback<span class="token punctuation">)</span>

    <span class="token comment"># 等待任务完成</span>
    <span class="token keyword">await</span> task
    <span class="token comment"># 确保后续任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 等待回调任务完成的时间</span>

<span class="token comment"># 执行事件循环</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-如何显示运行任务的进度" tabindex="-1"><a class="header-anchor" href="#_2-4-如何显示运行任务的进度"><span>2.4 如何显示运行任务的进度</span></a></h3><h4 id="_2-4-1-基于回调函数的任务进度显示" tabindex="-1"><a class="header-anchor" href="#_2-4-1-基于回调函数的任务进度显示"><span>2.4.1 基于回调函数的任务进度显示</span></a></h4><p>每个任务的回调函数可用于显示进度。<code>asyncio.Task</code> 对象支持注册回调函数，这些函数会在任务完成时被调用，无论是正常完成还是以异常结束。回调函数是普通函数而非协程，且接受与其关联的 <code>asyncio.Task</code> 对象作为参数。通过为所有任务注册相同的回调函数，可以统一报告任务进度：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 回调函数，用于显示任务完成的进度，区分任务</span>
<span class="token keyword">def</span> <span class="token function">progress</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">:</span>
    task_name <span class="token operator">=</span> task<span class="token punctuation">.</span>get_name<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取任务的名称</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;任务 </span><span class="token interpolation"><span class="token punctuation">{</span>task_name<span class="token punctuation">}</span></span><span class="token string"> 完成。&quot;</span></span><span class="token punctuation">)</span>  

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">example_task</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> task_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟一个异步任务，表示处理n秒的任务，并设置任务名称&quot;&quot;&quot;</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token keyword">return</span> task_name

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 定义多个异步任务并添加回调函数</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        task_name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;Task-</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>  <span class="token comment"># 为每个任务分配一个唯一名称</span>
        task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>example_task<span class="token punctuation">(</span>i<span class="token punctuation">,</span> task_name<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 创建任务，模拟不同的执行时间</span>
        task<span class="token punctuation">.</span>set_name<span class="token punctuation">(</span>task_name<span class="token punctuation">)</span>  <span class="token comment"># 设置任务名称</span>
        <span class="token comment"># 为任务添加回调函数，回调函数会在相应任务执行完毕时被调用</span>
        task<span class="token punctuation">.</span>add_done_callback<span class="token punctuation">(</span>progress<span class="token punctuation">)</span>  
        tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>task<span class="token punctuation">)</span>

    <span class="token comment"># 等待所有任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>

<span class="token comment"># 运行主程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-2-基于tqdm库的任务进度显示" tabindex="-1"><a class="header-anchor" href="#_2-4-2-基于tqdm库的任务进度显示"><span>2.4.2 基于tqdm库的任务进度显示</span></a></h4><p><strong>使用tqdm库显示任务总体进度</strong></p><p>以下代码演示了如何结合<code>tqdm</code>库和<code>asyncio</code>库，来展示异步任务的总体执行进度：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> tqdm<span class="token punctuation">.</span>asyncio <span class="token keyword">import</span> tqdm

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">example_task</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> task_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟一个异步任务，表示处理 n 秒的任务，并设置任务名称&quot;&quot;&quot;</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>n<span class="token punctuation">)</span>  <span class="token comment"># 模拟任务处理时间</span>
    <span class="token keyword">return</span> task_name  <span class="token comment"># 返回任务名称</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 定义多个异步任务并使用 tqdm 显示进度</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    total_tasks <span class="token operator">=</span> <span class="token number">5</span>  <span class="token comment"># 总任务数</span>
    task_durations <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>  <span class="token comment"># 每个任务的持续时间（秒）</span>

    <span class="token comment"># 使用 tqdm 创建进度条，\`total\` 为任务的数量</span>
    progress_bar <span class="token operator">=</span> tqdm<span class="token punctuation">(</span>total<span class="token operator">=</span>total_tasks<span class="token punctuation">,</span> desc<span class="token operator">=</span><span class="token string">&quot;已完成任务数&quot;</span><span class="token punctuation">,</span> ncols<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span>

    <span class="token comment"># 创建任务</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> n <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>task_durations<span class="token punctuation">)</span><span class="token punctuation">:</span>
        task_name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;Task-</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>  <span class="token comment"># 为每个任务分配一个唯一名称</span>
        task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>example_task<span class="token punctuation">(</span>n<span class="token punctuation">,</span> task_name<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 创建任务，模拟不同的执行时间</span>
        tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>task<span class="token punctuation">)</span>

    <span class="token comment"># 等待任务完成并更新进度条</span>
    <span class="token keyword">for</span> task <span class="token keyword">in</span> asyncio<span class="token punctuation">.</span>as_completed<span class="token punctuation">(</span>tasks<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">await</span> task  <span class="token comment"># 等待每个任务完成</span>
        progress_bar<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 每完成一个任务，更新进度条</span>

    progress_bar<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 关闭进度条</span>

<span class="token comment"># 运行主程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用tqdm库为多个任务设置单独进度条</strong></p><p>以下示例代码演示了如何使用<code>asyncio</code>并行执行多个异步任务，同时通过<code>tqdm</code>库为每个任务单独显示进度条：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> tqdm<span class="token punctuation">.</span>asyncio <span class="token keyword">import</span> tqdm 

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">example_task</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> task_name<span class="token punctuation">,</span> progress_bar<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟一个异步任务，表示处理 n 秒的任务，并设置任务名称&quot;&quot;&quot;</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 每秒更新一次进度</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟任务处理时间</span>
        progress_bar<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 更新当前任务的进度</span>
    <span class="token keyword">return</span> task_name  <span class="token comment"># 返回任务名称</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 定义多个异步任务并使用 tqdm 显示进度</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    total_tasks <span class="token operator">=</span> <span class="token number">5</span>  <span class="token comment"># 总任务数</span>
    task_durations <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>  <span class="token comment"># 每个任务的持续时间（秒）</span>

    <span class="token comment"># 创建进度条并为每个任务单独设置</span>
    progress_bars <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> n <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>task_durations<span class="token punctuation">)</span><span class="token punctuation">:</span>
        task_name <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;Task-</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>  <span class="token comment"># 为每个任务分配一个唯一名称</span>
        progress_bar <span class="token operator">=</span> tqdm<span class="token punctuation">(</span>total<span class="token operator">=</span>n<span class="token punctuation">,</span> desc<span class="token operator">=</span>task_name<span class="token punctuation">,</span> ncols<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span> position<span class="token operator">=</span>i<span class="token punctuation">)</span>  <span class="token comment"># 创建任务对应的进度条</span>
        progress_bars<span class="token punctuation">.</span>append<span class="token punctuation">(</span>progress_bar<span class="token punctuation">)</span>
        task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>example_task<span class="token punctuation">(</span>n<span class="token punctuation">,</span> task_name<span class="token punctuation">,</span> progress_bar<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 创建任务</span>
        tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>task<span class="token punctuation">)</span>

    <span class="token comment"># 等待任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>  <span class="token comment"># 使用 asyncio.gather 同时等待所有任务完成</span>

    <span class="token comment"># 关闭所有进度条</span>
    <span class="token keyword">for</span> progress_bar <span class="token keyword">in</span> progress_bars<span class="token punctuation">:</span>
        progress_bar<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 运行主程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-如何在asyncio中执行阻塞i-o或cpu密集型函数" tabindex="-1"><a class="header-anchor" href="#_2-5-如何在asyncio中执行阻塞i-o或cpu密集型函数"><span>2.5 如何在asyncio中执行阻塞I/O或CPU密集型函数</span></a></h3><p>在编程中，“阻塞调用”指的是某些操作（例如读取文件、等待网络请求或执行数据库查询等）需要一定时间才能完成。在执行这些操作时，程序会暂停，无法继续处理其他任务，这就是“阻塞”。另外，CPU密集型操作也可能会导致程序阻塞。因此，为了在异步环境中仍然能够处理阻塞调用，asyncio模块提供了两种方法来在异步程序中执行阻塞调用：</p><ul><li><code>asyncio.to_thread()</code> ：此方法简化了线程管理流程，特别适合处理大多数I/O密集型任务。它允许将阻塞调用委派给一个线程，从而避免阻塞主事件循环。</li><li><code>loop.run_in_executor()</code> ：此方法提供了更高的灵活性，支持使用自定义的执行器，比如线程池或进程池。这适用于需要精细控制执行环境的场景。</li></ul><p>这两种方法均可有效地将阻塞调用转为异步任务，以下逐一分析这两种方式：</p><h4 id="_2-5-1-使用-asyncio-to-thread" tabindex="-1"><a class="header-anchor" href="#_2-5-1-使用-asyncio-to-thread"><span>2.5.1 使用 <code>asyncio.to_thread()</code></span></a></h4><p><code>asyncio.to_thread()</code> 是一个高级 API，适用于大多数应用场景。它会将指定的函数和参数提交到一个独立的线程中执行，并返回一个可等待的协程。这样，阻塞操作就可以在后台线程池中执行，而不会阻塞事件循环。需要注意的是，任务并不会立即执行，而是会等待事件循环空闲时再开始执行。由于 <code>asyncio.to_thread()</code> 会在后台创建一个 <code>ThreadPoolExecutor</code> 来处理阻塞任务，因此它特别适合 I/O 密集型的操作。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time

<span class="token keyword">def</span> <span class="token function">blocking_task</span><span class="token punctuation">(</span>task_id<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 模拟一个耗时的阻塞操作</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&quot;任务 </span><span class="token interpolation"><span class="token punctuation">{</span>task_id<span class="token punctuation">}</span></span><span class="token string"> 完成&quot;</span></span>

<span class="token comment"># 同步执行多个任务</span>
<span class="token keyword">def</span> <span class="token function">sync_main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 顺序执行多个阻塞任务</span>
    results <span class="token operator">=</span> <span class="token punctuation">[</span>blocking_task<span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    
    end_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;同步任务执行时间: </span><span class="token interpolation"><span class="token punctuation">{</span>end_time <span class="token operator">-</span> start_time<span class="token punctuation">:</span><span class="token format-spec">.4f</span><span class="token punctuation">}</span></span><span class="token string"> 秒&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 异步运行多个阻塞任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">async_main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 使用 asyncio.to_thread 来并发运行多个阻塞任务</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>asyncio<span class="token punctuation">.</span>to_thread<span class="token punctuation">(</span>blocking_task<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    results <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>
    
    end_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;异步任务执行时间: </span><span class="token interpolation"><span class="token punctuation">{</span>end_time <span class="token operator">-</span> start_time<span class="token punctuation">:</span><span class="token format-spec">.4f</span><span class="token punctuation">}</span></span><span class="token string"> 秒&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 执行同步任务</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;同步执行开始:&quot;</span><span class="token punctuation">)</span>
sync_main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 执行异步任务</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n异步执行开始:&quot;</span><span class="token punctuation">)</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>async_main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码展示了同步执行阻塞任务与异步执行阻塞任务的对比。通过使用<code>asyncio.to_thread()</code>，I/O 密集型操作的处理被委托给独立的线程池，从而避免了阻塞事件循环，显著提升了异步任务的效率：</p><ul><li>同步执行：在 <code>sync_main()</code> 中，多个阻塞任务按顺序逐一执行，每个任务需等待前一个任务完成后才能开始，整体执行时间为所有任务总时间（即 5 * 2 秒）。</li><li>异步执行：在 <code>async_main()</code> 中，多个阻塞任务并发执行。尽管每个任务仍然是阻塞的，但它们在后台线程中并行处理，因此总执行时间仅为单个任务的执行时间（即约 2 秒）。</li></ul><p>代码运行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>同步执行开始:
任务 0 完成
任务 1 完成
任务 2 完成
任务 3 完成
任务 4 完成
同步任务执行时间: 10.0317 秒

异步执行开始:
任务 0 完成
任务 1 完成
任务 2 完成
任务 3 完成
任务 4 完成
异步任务执行时间: 2.0089 秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-2-使用-loop-run-in-executor" tabindex="-1"><a class="header-anchor" href="#_2-5-2-使用-loop-run-in-executor"><span>2.5.2 使用 <code>loop.run_in_executor()</code></span></a></h4><p><code>loop.run_in_executor()</code>是<code>asyncio</code>提供的低级API，需先获取事件循环（例如，使用<code>asyncio.get_running_loop()</code>）。该函数允许指定执行器（默认是<code>ThreadPoolExecutor</code>）以及要执行的函数。</p><p>与<code>asyncio.to_thread()</code>相比，<code>run_in_executor()</code>提供了更大的灵活性，支持使用自定义执行器，而不仅限于线程池。此外，调用该函数后，任务会立即开始执行，无需等待返回的可等待对象来触发任务的启动。</p><p>示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time

<span class="token comment"># 定义一个需要执行的阻塞任务</span>
<span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务开始&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;任务结束&quot;</span><span class="token punctuation">)</span>


<span class="token comment"># 在单独的线程中执行函数</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 获取事件循环</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># 使用run_in_executor来将task函数异步执行在线程池中</span>
    <span class="token comment"># None 表示使用默认的线程池执行器</span>
    <span class="token keyword">await</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> task<span class="token punctuation">)</span>

<span class="token comment"># 执行主任务</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果希望使用进程池，可以创建一个自定义的执行器并传递给 <code>run_in_executor()</code>。在这种情况下，调用者需要负责管理执行器的生命周期，使用完后要手动关闭。示例代码如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> concurrent<span class="token punctuation">.</span>futures <span class="token keyword">import</span> ProcessPoolExecutor
<span class="token keyword">import</span> time

<span class="token comment"># 定义一个耗时的任务</span>
<span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;任务 </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> 开始&quot;</span></span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟一个阻塞的操作</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;任务 </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> 完成&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f&quot;来自 </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> 的结果&quot;</span></span>

<span class="token comment"># 使用自定义的执行器来运行任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 创建一个进程池</span>
    <span class="token keyword">with</span> ProcessPoolExecutor<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> executor<span class="token punctuation">:</span>
        <span class="token comment"># 获取当前的事件循环</span>
        loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># 使用 run_in_executor 来在进程池中执行任务</span>
        results <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>
            loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>executor<span class="token punctuation">,</span> task<span class="token punctuation">,</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>executor<span class="token punctuation">,</span> task<span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>executor<span class="token punctuation">,</span> task<span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span>

        <span class="token comment"># 打印所有任务的结果</span>
        <span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token comment"># 启动 asyncio 事件循环并执行 main</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-python协程-操作系统原生支持吗" tabindex="-1"><a class="header-anchor" href="#_2-6-python协程-操作系统原生支持吗"><span>2.6 Python协程：操作系统原生支持吗</span></a></h3><p>异步编程和协程并不总是解决程序中所有并发问题的最佳方案。Python 中的协程是由软件管理的，它们通过asyncio事件循环来执行和调度。与操作系统提供的线程和进程不同，协程并不由操作系统直接支持，而是通过Python的软件框架来实现的。在这个意义上，Python中的协程并不是“原生”的。它们并不像线程或进程那样具有独立的执行上下文，反而是在同一个线程内通过协作式调度来切换任务。</p><p>此外，Python的GIL（全局解释器锁）用来保护解释器内部的状态，防止多个线程同时访问和修改解释器的数据。而asyncio的事件循环是单线程运行的，这意味着所有的协程都在同一个线程里执行。由于协程本身是通过事件循环调度的，而不是通过多线程或多进程并行执行，因此，尽管Python中的多线程模型受到GIL的限制，协程在处理 I/O 密集型任务时能够有效避免GIL的影响，从而提高并发性能。这也是为什么在处理大量I/O操作时，使用asyncio和协程能够带来较好的性能表现。</p><p>然而，协程并不适用于所有类型的并发任务。例如，对于计算密集型任务，使用线程或进程模型可能更为合适，因为协程并不会突破GIL的限制，计算密集型任务依然会在单个CPU核心上串行执行。因此，在选择是否使用协程时，需要根据任务的特性做出权衡。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[python] asyncio库常见问题与实践案例/img/1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_3-应用实例" tabindex="-1"><a class="header-anchor" href="#_3-应用实例"><span>3 应用实例</span></a></h2><h3 id="_3-1-在基于线程的程序中调用asyncio代码" tabindex="-1"><a class="header-anchor" href="#_3-1-在基于线程的程序中调用asyncio代码"><span>3.1 在基于线程的程序中调用asyncio代码</span></a></h3><p><strong>直接调用同步I/O代码</strong></p><p>以下代码实现了一个简单的Tkinter应用，点击按钮后，程序会发起一个同步HTTP请求（GET 请求）。在每60毫秒的刷新周期中，程序会根据当前状态更新显示的文本。然而，当点击按钮时，<code>request_remote</code>方法中的 <code>requests.get</code>会发起一个同步请求，这会阻塞主线程，从而导致界面卡顿或无响应。如下代码，<code>App.QUERYING_STATE</code>状态相关信息不会显示出来：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> tkinter <span class="token keyword">as</span> tk
<span class="token keyword">import</span> requests


<span class="token keyword">class</span> <span class="token class-name">App</span><span class="token punctuation">(</span>tk<span class="token punctuation">.</span>Tk<span class="token punctuation">)</span><span class="token punctuation">:</span>
    INIT_STATE <span class="token operator">=</span> <span class="token number">0</span>         <span class="token comment"># 初始化状态</span>
    QUERYING_STATE <span class="token operator">=</span> <span class="token number">1</span>     <span class="token comment"># 请求中状态</span>
    RESULT_STATE <span class="token operator">=</span> <span class="token number">2</span>       <span class="token comment"># 请求结果状态</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>status_code <span class="token operator">=</span> <span class="token number">0</span>           <span class="token comment"># HTTP请求返回的状态码</span>
        self<span class="token punctuation">.</span>_refresh_ms <span class="token operator">=</span> <span class="token number">60</span>          <span class="token comment"># 刷新间隔时间（毫秒）</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>INIT_STATE    <span class="token comment"># 初始状态</span>
        self<span class="token punctuation">.</span>_button <span class="token operator">=</span> <span class="token boolean">None</span>            <span class="token comment"># 按钮</span>
        self<span class="token punctuation">.</span>_label <span class="token operator">=</span> <span class="token boolean">None</span>             <span class="token comment"># 标签</span>
        self<span class="token punctuation">.</span>render_elements<span class="token punctuation">(</span><span class="token punctuation">)</span>         <span class="token comment"># 渲染界面元素</span>
        self<span class="token punctuation">.</span>after<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_refresh_ms<span class="token punctuation">,</span> self<span class="token punctuation">.</span>refresh<span class="token punctuation">)</span>  <span class="token comment"># 设置定时刷新，定时调用refresh方法</span>

    <span class="token keyword">def</span> <span class="token function">render_elements</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 设置界面布局，渲染UI元素 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>geometry<span class="token punctuation">(</span><span class="token string">&quot;400x200&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 设置窗口大小</span>
        self<span class="token punctuation">.</span>_button <span class="token operator">=</span> tk<span class="token punctuation">.</span>Button<span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string">&quot;请求状态码&quot;</span><span class="token punctuation">,</span> command<span class="token operator">=</span>self<span class="token punctuation">.</span>request_remote<span class="token punctuation">)</span>  <span class="token comment"># 创建按钮，点击时调用request_remote方法</span>
        self<span class="token punctuation">.</span>_label <span class="token operator">=</span> tk<span class="token punctuation">.</span>Label<span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 创建标签，初始为空</span>

        self<span class="token punctuation">.</span>_button<span class="token punctuation">.</span>pack<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 将按钮添加到窗口中</span>
        self<span class="token punctuation">.</span>_label<span class="token punctuation">.</span>pack<span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment"># 将标签添加到窗口中</span>

    <span class="token keyword">def</span> <span class="token function">request_remote</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 发起同步HTTP请求 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>QUERYING_STATE  <span class="token comment"># 设置状态为请求中</span>
        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 发起GET请求，获取响应</span>
        self<span class="token punctuation">.</span>status_code <span class="token operator">=</span> response<span class="token punctuation">.</span>status_code  <span class="token comment"># 获取响应返回的状态码</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>RESULT_STATE  <span class="token comment"># 设置状态为结果状态，表示请求已完成</span>

    <span class="token keyword">def</span> <span class="token function">refresh</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 每60毫秒刷新一次UI内容 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>update_label<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 更新标签内容</span>
        self<span class="token punctuation">.</span>after<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_refresh_ms<span class="token punctuation">,</span> self<span class="token punctuation">.</span>refresh<span class="token punctuation">)</span>  <span class="token comment"># 设置下次刷新时间（每60毫秒刷新一次）</span>

    <span class="token keyword">def</span> <span class="token function">update_label</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 根据应用状态更新标签内容 &quot;&quot;&quot;</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>state <span class="token operator">==</span> App<span class="token punctuation">.</span>INIT_STATE<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_label<span class="token punctuation">.</span>config<span class="token punctuation">(</span>text<span class="token operator">=</span><span class="token string">&quot;这里将显示状态码。&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 初始状态下提示文字</span>
        <span class="token keyword">elif</span> self<span class="token punctuation">.</span>state <span class="token operator">==</span> App<span class="token punctuation">.</span>QUERYING_STATE<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_label<span class="token punctuation">.</span>config<span class="token punctuation">(</span>text<span class="token operator">=</span><span class="token string">&quot;正在查询远程...&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 请求中状态时显示提示文字</span>
        <span class="token keyword">elif</span> self<span class="token punctuation">.</span>state <span class="token operator">==</span> App<span class="token punctuation">.</span>RESULT_STATE<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_label<span class="token punctuation">.</span>config<span class="token punctuation">(</span>text<span class="token operator">=</span><span class="token string-interpolation"><span class="token string">f&quot;返回的状态码是: </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>status_code<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 请求结果状态时显示返回的状态码</span>

    <span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>mainloop<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动Tkinter事件循环，进入GUI界面</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> App<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 创建应用实例</span>
    app<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动应用</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>I/O请求的异步调用</strong></p><p>可以将requests包替换为aiohttp包，实现I/O请求的异步调用。aiohttp和requests都是Python中常用的HTTP客户端库，但requests适用于同步场景，简单易用，aiohttp则适用于异步并发的场景，能够处理大量并行请求。具体区别如下：</p><ol><li>同步vs异步：</li></ol><ul><li>requests是一个同步库，意味着每次发送请求时，程序会等待响应回来后才继续执行。适用于一些简单的、串行的HTTP请求场景。</li><li>aiohttp是一个异步库，基于Python的asyncio模块，能够在发送HTTP请求时非阻塞地继续执行其他任务。适用于需要大量并发请求或长时间等待的异步场景。</li></ul><ol start="2"><li>性能：</li></ol><ul><li>requests由于是同步的，处理大量请求时容易出现性能瓶颈，因为每个请求必须等待前一个请求完成。</li><li>aiohttp通过异步I/O处理，可以在等待响应时同时发起其他请求，极大提高了并发性能，尤其在处理大量HTTP请求时。</li></ul><ol start="3"><li>用法：</li></ol><ul><li>requests用法简单，适合初学者和一般同步的任务。</li><li>aiohttp需要使用async和await，适合需要并发或异步操作的任务。</li></ul><p>在上述示例代码中，为了替代requests模块的同步请求，可以创建一个继承自<code>App</code>类的<code>AppAsync</code>类，并利用aiohttp和asyncio库实现异步请求。通过<code>async_request</code>方法异步发起HTTP请求：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> aiohttp
<span class="token keyword">import</span> asyncio

<span class="token keyword">class</span> <span class="token class-name">AppAsync</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">async_request</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 
        异步发起HTTP请求，使用aiohttp库来实现I/O请求的异步调用。
        &quot;&quot;&quot;</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>  <span class="token comment"># 创建一个aiohttp会话对象</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> response<span class="token punctuation">:</span>  <span class="token comment"># 发起GET请求</span>
                self<span class="token punctuation">.</span>status_code <span class="token operator">=</span> response<span class="token punctuation">.</span>status  <span class="token comment"># 获取响应状态码</span>
                self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>RESULT_STATE  <span class="token comment"># 更新应用状态</span>

    <span class="token keyword">def</span> <span class="token function">__int__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">request_remote</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 使用asyncio.run来调用异步请求代码 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> self<span class="token punctuation">.</span>QUERYING_STATE  <span class="token comment"># 设置状态为请求中</span>
        asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">.</span>async_request<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 异步发起HTTP请求</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> AppAsync<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 创建应用实例</span>
    app<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动应用</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 运行主程序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而<code>AppAsync</code>类中的<code>asyncio.run(self.async_request())</code>会阻塞Tkinter的主线程，因为<code>asyncio.run()</code>会一直运行，直到异步任务完成。同时Tkinter自身有一个事件循环（mainloop()），与<code>asyncio</code>需要的事件循环冲突。如果在Tkinter内创建新事件循环，可能会导致Tkinter关闭或中断后出现问题。</p><p><strong>将asyncio与线程结合</strong></p><p>为了解决asyncio事件循环阻塞的问题，可以使用一个单独的守护线程，并在守护线程中运行事件循环，这样asyncio的事件循环就不会阻塞主线程。重写<code>AppAsync</code>类示例如下：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> aiohttp
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> threading

<span class="token keyword">class</span> <span class="token class-name">AppAsync</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_loop_thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>self<span class="token punctuation">.</span>run_asyncio_loop<span class="token punctuation">,</span> daemon<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_loop_thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动事件循环线程</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">async_request</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 
        异步发起HTTP请求，使用aiohttp库来实现I/O请求的异步调用。
        &quot;&quot;&quot;</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>  <span class="token comment"># 创建一个aiohttp会话对象</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;https://www.example.com&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> response<span class="token punctuation">:</span>  <span class="token comment"># 发起GET请求</span>
                self<span class="token punctuation">.</span>status_code <span class="token operator">=</span> response<span class="token punctuation">.</span>status  <span class="token comment"># 获取响应状态码</span>
                self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>RESULT_STATE  <span class="token comment"># 更新应用状态</span>

    <span class="token keyword">def</span> <span class="token function">request_remote</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 使用异步请求，在事件循环中执行 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>state <span class="token operator">=</span> App<span class="token punctuation">.</span>QUERYING_STATE  <span class="token comment"># 设置状态为请求中</span>
        asyncio<span class="token punctuation">.</span>run_coroutine_threadsafe<span class="token punctuation">(</span>self<span class="token punctuation">.</span>async_request<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>_loop<span class="token punctuation">)</span>  <span class="token comment"># 调用异步请求并与当前事件循环进行交互</span>

    <span class="token keyword">def</span> <span class="token function">run_asyncio_loop</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot; 运行asyncio事件循环 &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>_loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>new_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 创建新的事件循环</span>
        asyncio<span class="token punctuation">.</span>set_event_loop<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_loop<span class="token punctuation">)</span>  <span class="token comment"># 设置当前线程的事件循环</span>
        self<span class="token punctuation">.</span>_loop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动事件循环</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> AppAsync<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 创建应用实例</span>
    app<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动应用</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 运行主程序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例代码运行时，<code>App.QUERYING_STATE</code>状态相关信息会显示出来，<code>AppAsync</code>类主要的改动点如下：</p><ol><li><code>AppAsync</code>类的构造函数: <ul><li>增加了一个新的线程来运行asyncio事件循环，避免在Tkinter线程中阻塞。</li><li>使用<code>threading.Thread</code>启动一个守护线程，执行<code>run_asyncio_loop</code>方法，确保事件循环在后台运行。</li><li>在创建线程时设置为守护线程。这样即使主线程退出，守护线程也会自动结束。</li></ul></li><li><code>run_asyncio_loop</code>方法: <ul><li>在一个单独的线程中启动新的asyncio事件循环。</li><li>使用<code>asyncio.set_event_loop</code>设置当前线程的事件循环，并调用<code>loop.run_forever()</code>来保持事件循环持续运行。</li></ul></li><li><code>request_remote</code>方法: <ul><li>使用<code>asyncio.run_coroutine_threadsafe</code>将异步请求任务提交给后台事件循环执行，用于在非主线程中安全地执行协程。</li></ul></li></ol><h3 id="_3-2-基于asyncio实现多核异步处理" tabindex="-1"><a class="header-anchor" href="#_3-2-基于asyncio实现多核异步处理"><span>3.2 基于asyncio实现多核异步处理</span></a></h3><p><strong>单核异步处理</strong></p><p>asyncio的并发机制是基于协作式多任务（协程），它不会并行地使用多个CPU核心来加速计算，所有的任务都是在单个核心上轮流执行的。以下代码模拟了1000个爬虫任务，并使用单核异步来执行：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> random
<span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time

<span class="token comment"># 模拟爬虫任务，执行时会有随机的延迟</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">fake_crawlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 随机生成一个0.2到1.0秒之间的延迟，保留两位小数</span>
    io_delay <span class="token operator">=</span> <span class="token builtin">round</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>io_delay<span class="token punctuation">)</span>

    result <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment"># 随机生成100,000到500,000之间的数字，用于模拟计算密集型任务</span>
    <span class="token comment"># 这段代码耗时大约0.2秒到0.5秒之间</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">,</span> <span class="token number">500000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        result <span class="token operator">+=</span> i
    <span class="token keyword">return</span> result

<span class="token comment"># 主程序入口，负责创建并执行多个爬虫任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># time.monotonic()是用于测量时间间隔的可靠方法，它不受系统时间更改的影响</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>monotonic<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>fake_crawlers<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  <span class="token comment"># 模拟创建1000个任务</span>

    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>  <span class="token comment"># 等待所有任务完成</span>
    <span class="token comment"># 输出所有任务完成的时间</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;所有任务已完成，耗时 </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>monotonic<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">:</span><span class="token format-spec">.2f</span><span class="token punctuation">}</span></span><span class="token string"> 秒&quot;</span></span><span class="token punctuation">)</span>
    
<span class="token comment"># 启动程序</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>所有任务已完成，耗时 8.51 秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>多核异步处理</strong></p><p>要实现多核异步处理，可以将异步编程和多进程池结合起来使用。具体来说，主程序会把任务分成多个批次，每个批次由不同的进程来处理。每个进程内部，多个任务又是通过异步方式并行执行的。这样一来，计算密集型的任务可以通过多进程并行处理，而每个进程内部的I/O操作则可以通过asyncio来异步管理，从而大幅提高整体效率。示例代码如下，代码将1000个任务分布到10个子进程中并行执行，每个子进程执行100个模拟的爬虫任务：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> random
<span class="token keyword">import</span> asyncio  <span class="token comment">#</span>
<span class="token keyword">import</span> time  
<span class="token keyword">from</span> concurrent<span class="token punctuation">.</span>futures <span class="token keyword">import</span> ProcessPoolExecutor  

<span class="token comment"># 模拟爬虫任务，执行时会有随机的延迟</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">fake_crawlers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 随机生成一个0.2到1.0秒之间的延迟，保留两位小数</span>
    io_delay <span class="token operator">=</span> <span class="token builtin">round</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>uniform<span class="token punctuation">(</span><span class="token number">0.2</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>io_delay<span class="token punctuation">)</span>

    result <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token comment"># 随机生成100,000到500,000之间的数字，用于模拟阻塞任务</span>
    <span class="token comment"># 这段代码耗时大约0.2秒到0.5秒之间</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">,</span> <span class="token number">500000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        result <span class="token operator">+=</span> i
    <span class="token keyword">return</span> result

<span class="token comment"># 并发查询任务，通过起始和结束索引分配任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">query_concurrently</span><span class="token punctuation">(</span>begin_idx<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> end_idx<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 启动并发任务，通过起始和结束序列号 &quot;&quot;&quot;</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>  
    <span class="token comment"># 根据给定的索引范围（从 begin_idx 到 end_idx），创建并发任务</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>begin_idx<span class="token punctuation">,</span> end_idx<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>fake_crawlers<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  
    <span class="token comment"># 等待所有任务完成，并返回每个任务的结果</span>
    results <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>
    <span class="token keyword">return</span> results 

<span class="token comment"># 批量任务执行函数，使用子进程池并行执行任务</span>
<span class="token keyword">def</span> <span class="token function">run_batch_tasks</span><span class="token punctuation">(</span>batch_idx<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> step<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 在子进程中执行批量任务 &quot;&quot;&quot;</span>
    <span class="token comment"># 计算当前批次任务的起始和结束索引</span>
    begin <span class="token operator">=</span> batch_idx <span class="token operator">*</span> step <span class="token operator">+</span> <span class="token number">1</span>  <span class="token comment"># 当前批次任务的起始索引</span>
    end <span class="token operator">=</span> begin <span class="token operator">+</span> step  <span class="token comment"># 当前批次任务的结束索引</span>

    <span class="token comment"># 使用 asyncio.run() 启动异步任务并获取结果</span>
    results <span class="token operator">=</span> <span class="token punctuation">[</span>result <span class="token keyword">for</span> result <span class="token keyword">in</span> asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>query_concurrently<span class="token punctuation">(</span>begin<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">return</span> results  

<span class="token comment"># 主函数，分批次将任务分配到子进程中执行</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 将任务分批次分配到子进程中执行 &quot;&quot;&quot;</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>monotonic<span class="token punctuation">(</span><span class="token punctuation">)</span>  

    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取当前运行的事件循环</span>
    <span class="token comment"># 创建进程池执行器，用于将任务分配到多个子进程中执行</span>
    <span class="token keyword">with</span> ProcessPoolExecutor<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> executor<span class="token punctuation">:</span>
        <span class="token comment"># 启动多个批次任务，并行执行。每个批次执行 100个任务，共启动10个批次</span>
        tasks <span class="token operator">=</span> <span class="token punctuation">[</span>loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>executor<span class="token punctuation">,</span> run_batch_tasks<span class="token punctuation">,</span> batch_idx<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
                 <span class="token keyword">for</span> batch_idx <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span> 

    <span class="token comment"># 等待所有子进程任务完成，并将结果汇总</span>
    results <span class="token operator">=</span> <span class="token punctuation">[</span>result <span class="token keyword">for</span> sub_list <span class="token keyword">in</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span> <span class="token keyword">for</span> result <span class="token keyword">in</span> sub_list<span class="token punctuation">]</span>

    <span class="token comment"># 输出所有任务完成的时间</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;所有任务已完成，耗时 </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>monotonic<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">:</span><span class="token format-spec">.2f</span><span class="token punctuation">}</span></span><span class="token string"> 秒&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 程序入口</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>所有任务已完成，耗时 1.83 秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-图片下载器" tabindex="-1"><a class="header-anchor" href="#_3-3-图片下载器"><span>3.3 图片下载器</span></a></h3><p>若经常需要从互联网下载文件，可以使用aiohttp库来实现任务的自动化。下面提供了一个简单的脚本，用于从指定URL下载文件：</p><p><strong>建立本地图片服务器</strong></p><p>为了提供图片下载链接，以下代码展示了如何使用FastAPI框架创建一个简单的Web应用程序，用于上传、管理和访问图片：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">from</span> fastapi <span class="token keyword">import</span> FastAPI<span class="token punctuation">,</span> File<span class="token punctuation">,</span> UploadFile
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>responses <span class="token keyword">import</span> FileResponse
<span class="token keyword">from</span> fastapi<span class="token punctuation">.</span>staticfiles <span class="token keyword">import</span> StaticFiles
<span class="token keyword">import</span> uvicorn

app <span class="token operator">=</span> FastAPI<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 配置图片存储目录</span>
UPLOAD_DIR <span class="token operator">=</span> <span class="token string">&quot;./uploaded_images&quot;</span>
<span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">)</span><span class="token punctuation">:</span>
    os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">)</span>

<span class="token comment"># 将图片目录挂载为静态文件目录</span>
app<span class="token punctuation">.</span>mount<span class="token punctuation">(</span><span class="token string">&quot;/images&quot;</span><span class="token punctuation">,</span> StaticFiles<span class="token punctuation">(</span>directory<span class="token operator">=</span>UPLOAD_DIR<span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;images&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 上传图片接口</span>
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>post</span><span class="token punctuation">(</span><span class="token string">&quot;/upload/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">upload_image</span><span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">:</span> UploadFile <span class="token operator">=</span> File<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 定义图片保存路径</span>
        file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">.</span>filename<span class="token punctuation">)</span>
        
        <span class="token comment"># 保存图片到本地</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> <span class="token string">&quot;wb&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">.</span><span class="token builtin">file</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment"># 返回图片的访问 URL</span>
        image_url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;http://127.0.0.1:8000/images/</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">file</span><span class="token punctuation">.</span>filename<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;image_url&quot;</span><span class="token punctuation">:</span> image_url<span class="token punctuation">}</span>
    
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span>

<span class="token comment"># 获取所有上传图片的链接</span>
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">&quot;/images_list/&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">list_images</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 获取目录下的所有文件</span>
        files <span class="token operator">=</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">)</span>
        image_urls <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f&quot;http://127.0.0.1:8000/images/</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">file</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> files <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>isfile<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;image_urls&quot;</span><span class="token punctuation">:</span> image_urls<span class="token punctuation">}</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span>

<span class="token comment"># 获取单个图片</span>
<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>get</span><span class="token punctuation">(</span><span class="token string">&quot;/image/{image_name}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_image</span><span class="token punctuation">(</span>image_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>UPLOAD_DIR<span class="token punctuation">,</span> image_name<span class="token punctuation">)</span>
        <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> FileResponse<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Image not found&quot;</span><span class="token punctuation">}</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token string">&quot;error&quot;</span><span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span>

<span class="token comment"># 启动 FastAPI 服务器</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    uvicorn<span class="token punctuation">.</span>run<span class="token punctuation">(</span>app<span class="token punctuation">,</span> host<span class="token operator">=</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">8000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该代码实现了一个图片上传和访问服务，包含以下三个主要接口：</p><ul><li>服务器启动后，会监听本地地址<code>127.0.0.1</code>的8000端口。</li><li>客户端可以通过以下方式与服务器进行交互： <ul><li>访问<code>http://127.0.0.1:8000/upload/</code>上传图片，并获取返回的图片 URL。</li><li>访问<code>http://127.0.0.1:8000/images_list/</code>查看所有已上传图片的 URL。</li><li>访问<code>http://127.0.0.1:8000/images/{image_name}</code> 来查看特定图片。</li></ul></li></ul><p>注意，所有上传和保存的图片都会保存在本地的<code>uploaded_images</code>文件夹中。</p><p><strong>图片下载</strong></p><p>以下代码利用了aiohttp、asyncio和aiofiles库，通过异步方式从API获取图片URL列表，并将图片下载到指定目录。借助这些库的结合，代码能够高效地处理HTTP请求、文件下载和文件操作，同时确保主程序的执行不被阻塞：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> aiohttp  <span class="token comment"># 导入 aiohttp 库，用于异步 HTTP 请求</span>
<span class="token keyword">import</span> asyncio  <span class="token comment"># 导入 asyncio 库，用于管理异步任务</span>
<span class="token keyword">import</span> aiofiles  <span class="token comment"># 导入 aiofiles 库，用于异步文件操作</span>
<span class="token keyword">import</span> os 

<span class="token comment"># 获取图片 URL 列表的异步函数</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">get_image_urls</span><span class="token punctuation">(</span>api_url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 使用 aiohttp 启动一个异步 HTTP 会话</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token comment"># 异步发送 GET 请求以获取 API 返回的数据</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>api_url<span class="token punctuation">)</span> <span class="token keyword">as</span> response<span class="token punctuation">:</span>
                <span class="token comment"># 如果响应状态码是 200 (请求成功)</span>
                <span class="token keyword">if</span> response<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
                    <span class="token comment"># 将响应内容解析为 JSON 格式</span>
                    data <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token comment"># 从 JSON 数据中提取图片 URL 列表，若没有则返回空列表</span>
                    <span class="token keyword">return</span> data<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;image_urls&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token comment"># 如果请求失败，打印错误信息</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;从 </span><span class="token interpolation"><span class="token punctuation">{</span>api_url<span class="token punctuation">}</span></span><span class="token string"> 获取图片列表失败。状态码: </span><span class="token interpolation"><span class="token punctuation">{</span>response<span class="token punctuation">.</span>status<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token comment"># 如果发生任何异常，打印错误信息</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;获取图片列表时发生错误: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># 下载文件的异步函数</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">download_file</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> save_directory<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 使用 aiohttp 启动异步 HTTP 会话</span>
        <span class="token keyword">async</span> <span class="token keyword">with</span> aiohttp<span class="token punctuation">.</span>ClientSession<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> session<span class="token punctuation">:</span>
            <span class="token comment"># 异步发送 GET 请求以获取文件内容</span>
            <span class="token keyword">async</span> <span class="token keyword">with</span> session<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token keyword">as</span> response<span class="token punctuation">:</span>
                <span class="token comment"># 如果响应状态码是 200 (请求成功)</span>
                <span class="token keyword">if</span> response<span class="token punctuation">.</span>status <span class="token operator">==</span> <span class="token number">200</span><span class="token punctuation">:</span>
                    <span class="token comment"># 确保保存文件的目录存在，若不存在则创建</span>
                    os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>save_directory<span class="token punctuation">,</span> exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
                    
                    <span class="token comment"># 从 URL 中提取文件名</span>
                    filename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>save_directory<span class="token punctuation">,</span> url<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                    <span class="token comment"># 异步打开文件以进行写入操作</span>
                    <span class="token keyword">async</span> <span class="token keyword">with</span> aiofiles<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
                        <span class="token comment"># 读取响应内容</span>
                        content <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
                        <span class="token comment"># 将内容写入本地文件</span>
                        <span class="token keyword">await</span> <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>content<span class="token punctuation">)</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;已下载 </span><span class="token interpolation"><span class="token punctuation">{</span>filename<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    <span class="token comment"># 如果下载失败，打印错误信息</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;下载 </span><span class="token interpolation"><span class="token punctuation">{</span>url<span class="token punctuation">}</span></span><span class="token string"> 失败。状态码: </span><span class="token interpolation"><span class="token punctuation">{</span>response<span class="token punctuation">.</span>status<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token comment"># 如果发生任何异常，打印错误信息</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;下载 </span><span class="token interpolation"><span class="token punctuation">{</span>url<span class="token punctuation">}</span></span><span class="token string"> 时发生错误: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 根据获取的图片 URL 列表进行下载的异步函数</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">download_images</span><span class="token punctuation">(</span>api_url<span class="token punctuation">,</span> save_directory<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 调用 get_image_urls 函数获取图片 URL 列表</span>
    image_urls <span class="token operator">=</span> <span class="token keyword">await</span> get_image_urls<span class="token punctuation">(</span>api_url<span class="token punctuation">)</span>
    
    <span class="token comment"># 如果没有获取到图片 URL，则打印提示并返回</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> image_urls<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;没有找到需要下载的图片。&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    
    <span class="token comment"># 为每个图片 URL 创建一个下载任务</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>download_file<span class="token punctuation">(</span>url<span class="token punctuation">,</span> save_directory<span class="token punctuation">)</span> <span class="token keyword">for</span> url <span class="token keyword">in</span> image_urls<span class="token punctuation">]</span>
    
    <span class="token comment"># 使用 asyncio.gather 并行执行所有下载任务</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">)</span>

<span class="token comment"># 启动事件循环，开始下载图片</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token comment"># API 地址，提供图片 URL 列表</span>
    api_url <span class="token operator">=</span> <span class="token string">&quot;http://127.0.0.1:8000/images_list/&quot;</span>
    <span class="token comment"># 指定保存下载图片的目录</span>
    save_directory <span class="token operator">=</span> <span class="token string">&quot;downloads&quot;</span>  

    <span class="token comment"># 获取事件循环并运行下载任务</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
    loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>download_images<span class="token punctuation">(</span>api_url<span class="token punctuation">,</span> save_directory<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-生产者消费者模型" tabindex="-1"><a class="header-anchor" href="#_3-4-生产者消费者模型"><span>3.4 生产者消费者模型</span></a></h3><p>生产者-消费者模型（Producer-Consumer Model）是一种经典的并发编程模式，旨在解决多个任务之间生产和消费的协调问题，从而确保资源得到合理利用并保证数据按顺序处理。该模型通过生产者和消费者两个角色，模拟共享资源的生产和消费过程。以下代码实现了一个基本的生产者-消费者模型，采用了asyncio进行异步任务处理：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> asyncio <span class="token keyword">import</span> Queue
<span class="token keyword">from</span> typing <span class="token keyword">import</span> List

<span class="token comment"># 生产者函数，负责将物品添加到队列</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">produce_items</span><span class="token punctuation">(</span>queue<span class="token punctuation">:</span> Queue<span class="token punctuation">,</span> items<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">,</span> producer_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> item <span class="token keyword">in</span> items<span class="token punctuation">:</span>
        <span class="token keyword">await</span> queue<span class="token punctuation">.</span>put<span class="token punctuation">(</span>item<span class="token punctuation">)</span>  <span class="token comment"># 将物品放入队列</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>producer_name<span class="token punctuation">}</span></span><span class="token string"> 添加物品：</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟生产过程中的等待时间</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>producer_name<span class="token punctuation">}</span></span><span class="token string"> 完成所有物品的生产&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 消费者函数，负责从队列中取出并处理物品</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">consume_items</span><span class="token punctuation">(</span>queue<span class="token punctuation">:</span> Queue<span class="token punctuation">,</span> consumer_name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        item <span class="token operator">=</span> <span class="token keyword">await</span> queue<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 阻塞直到获取到一个物品</span>
        <span class="token keyword">if</span> item <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>  <span class="token comment"># 使用None作为结束信号</span>
            queue<span class="token punctuation">.</span>task_done<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 标记任务完成</span>
            <span class="token keyword">break</span>  <span class="token comment"># 退出循环</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>consumer_name<span class="token punctuation">}</span></span><span class="token string"> 处理物品：</span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>  <span class="token comment"># 模拟处理物品的时间</span>
        queue<span class="token punctuation">.</span>task_done<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 标记任务完成</span>

<span class="token comment"># 主函数，负责启动多个生产者和消费者任务</span>
<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    queue <span class="token operator">=</span> Queue<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 创建一个队列</span>
    items_to_produce <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;B&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;C&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;D&#39;</span><span class="token punctuation">]</span>  <span class="token comment"># 需要生产的物品列表</span>
    
    <span class="token comment"># 创建产者任务（例如3个生产者）</span>
    producer_tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>produce_items<span class="token punctuation">(</span>queue<span class="token punctuation">,</span> items_to_produce<span class="token punctuation">,</span> <span class="token string-interpolation"><span class="token string">f&quot;生产者_</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>  
    <span class="token punctuation">]</span>
    
    <span class="token comment"># 创建消费者任务（例如2个消费者）</span>
    consumer_tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>consume_items<span class="token punctuation">(</span>queue<span class="token punctuation">,</span> <span class="token string-interpolation"><span class="token string">f&quot;消费者_</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
    
    <span class="token comment"># 等待所有生产者任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>producer_tasks<span class="token punctuation">)</span>
    
    <span class="token comment"># 生产者完成后，发送 None 给消费者，通知它们退出</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> consumer_tasks<span class="token punctuation">:</span>
        <span class="token keyword">await</span> queue<span class="token punctuation">.</span>put<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待队列中的所有任务处理完成</span>
    <span class="token keyword">await</span> queue<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 等待所有消费者任务完成</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>consumer_tasks<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment"># 运行主函数</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2>`,180),r={href:"https://www.cnblogs.com/luohenyueji/p/18562526",target:"_blank",rel:"noopener noreferrer"},v={href:"https://superfastpython.com/python-asyncio/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.dataleadsfuture.com/combining-traditional-thread-based-code-and-asyncio-in-python/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.dataleadsfuture.com/harnessing-multi-core-power-with-asyncio-in-python/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.tecmint.com/python-automation-scripts/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://mp.weixin.qq.com/s/hfx12PbKwU2BGWDXdgqg-Q",target:"_blank",rel:"noopener noreferrer"};function _(g,h){const a=e("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[s("本文详细介绍了在使用asyncio库编写异步程序时常见的错误和问题，并进一步通过实践案例进行分析和讨论，以便在项目中更有效地应用asyncio库。有关asyncio库的详细介绍，可参考："),n("a",k,[s("Python 异步编程库 asyncio 使用指北"),t(a)]),s("。")]),d,n("ul",null,[n("li",null,[n("a",r,[s("Python异步编程库asyncio使用指北"),t(a)])]),n("li",null,[n("a",v,[s("Python Asyncio: The Complete Guide"),t(a)])]),n("li",null,[n("a",m,[s("Combining Traditional Thread-Based Code and Asyncio in Python"),t(a)])]),n("li",null,[n("a",b,[s("Harnessing Multi-Core Power with Asyncio in Python"),t(a)])]),n("li",null,[n("a",y,[s("21 Simple Python Scripts That Will Automate Your Daily Tasks"),t(a)])]),n("li",null,[n("a",w,[s("Asyncio：一个异步的 Python 并发编程库！"),t(a)])])])])}const q=p(l,[["render",_],["__file","2024-11-25-_python_ asyncio库常见问题与实践案例.html.vue"]]),x=JSON.parse('{"path":"/blog/python/python%E5%AD%A6%E4%B9%A0/2024-11-25-_python_%20asyncio%E5%BA%93%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B.html","title":"[python] asyncio库常见问题与实践案例","lang":"zh-CN","frontmatter":{"date":"2024-11-25T11:58:02.000Z","category":["Python"],"tag":["Python","编程基础"],"description":"[python] asyncio库常见问题与实践案例 本文详细介绍了在使用asyncio库编写异步程序时常见的错误和问题，并进一步通过实践案例进行分析和讨论，以便在项目中更有效地应用asyncio库。有关asyncio库的详细介绍，可参考：Python 异步编程库 asyncio 使用指北。 1 asyncio程序的常见错误 本节展示了在使用async...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/python/python%E5%AD%A6%E4%B9%A0/2024-11-25-_python_%20asyncio%E5%BA%93%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[python] asyncio库常见问题与实践案例"}],["meta",{"property":"og:description","content":"[python] asyncio库常见问题与实践案例 本文详细介绍了在使用asyncio库编写异步程序时常见的错误和问题，并进一步通过实践案例进行分析和讨论，以便在项目中更有效地应用asyncio库。有关asyncio库的详细介绍，可参考：Python 异步编程库 asyncio 使用指北。 1 asyncio程序的常见错误 本节展示了在使用async..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/%5Bpython%5D%20asyncio%E5%BA%93%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/img/1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2024-11-25T11:58:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[python] asyncio库常见问题与实践案例\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/%5Bpython%5D%20asyncio%E5%BA%93%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E5%AE%9E%E8%B7%B5%E6%A1%88%E4%BE%8B/img/1.jpg\\"],\\"datePublished\\":\\"2024-11-25T11:58:02.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 asyncio程序的常见错误","slug":"_1-asyncio程序的常见错误","link":"#_1-asyncio程序的常见错误","children":[{"level":3,"title":"1.1 试图直接调用并运行协程","slug":"_1-1-试图直接调用并运行协程","link":"#_1-1-试图直接调用并运行协程","children":[]},{"level":3,"title":"1.2 主协程过早退出","slug":"_1-2-主协程过早退出","link":"#_1-2-主协程过早退出","children":[]},{"level":3,"title":"1.3 错误使用asyncio的低级API","slug":"_1-3-错误使用asyncio的低级api","link":"#_1-3-错误使用asyncio的低级api","children":[]},{"level":3,"title":"1.4 程序出现竞争条件或死锁问题","slug":"_1-4-程序出现竞争条件或死锁问题","link":"#_1-4-程序出现竞争条件或死锁问题","children":[]}]},{"level":2,"title":"2 asyncio程序的常见问题","slug":"_2-asyncio程序的常见问题","link":"#_2-asyncio程序的常见问题","children":[{"level":3,"title":"2.1 任务的等待、停止、结果获取","slug":"_2-1-任务的等待、停止、结果获取","link":"#_2-1-任务的等待、停止、结果获取","children":[]},{"level":3,"title":"2.2 如何在后台运行和等待任务","slug":"_2-2-如何在后台运行和等待任务","link":"#_2-2-如何在后台运行和等待任务","children":[]},{"level":3,"title":"2.3 任务的延迟后运行和后续运行","slug":"_2-3-任务的延迟后运行和后续运行","link":"#_2-3-任务的延迟后运行和后续运行","children":[]},{"level":3,"title":"2.4 如何显示运行任务的进度","slug":"_2-4-如何显示运行任务的进度","link":"#_2-4-如何显示运行任务的进度","children":[]},{"level":3,"title":"2.5 如何在asyncio中执行阻塞I/O或CPU密集型函数","slug":"_2-5-如何在asyncio中执行阻塞i-o或cpu密集型函数","link":"#_2-5-如何在asyncio中执行阻塞i-o或cpu密集型函数","children":[]},{"level":3,"title":"2.6 Python协程：操作系统原生支持吗","slug":"_2-6-python协程-操作系统原生支持吗","link":"#_2-6-python协程-操作系统原生支持吗","children":[]}]},{"level":2,"title":"3 应用实例","slug":"_3-应用实例","link":"#_3-应用实例","children":[{"level":3,"title":"3.1 在基于线程的程序中调用asyncio代码","slug":"_3-1-在基于线程的程序中调用asyncio代码","link":"#_3-1-在基于线程的程序中调用asyncio代码","children":[]},{"level":3,"title":"3.2 基于asyncio实现多核异步处理","slug":"_3-2-基于asyncio实现多核异步处理","link":"#_3-2-基于asyncio实现多核异步处理","children":[]},{"level":3,"title":"3.3 图片下载器","slug":"_3-3-图片下载器","link":"#_3-3-图片下载器","children":[]},{"level":3,"title":"3.4 生产者消费者模型","slug":"_3-4-生产者消费者模型","link":"#_3-4-生产者消费者模型","children":[]}]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":42.65,"words":12794},"filePathRelative":"blog/python/python学习/2024-11-25-[python] asyncio库常见问题与实践案例.md","localizedDate":"2024年11月25日","excerpt":"\\n<p>本文详细介绍了在使用asyncio库编写异步程序时常见的错误和问题，并进一步通过实践案例进行分析和讨论，以便在项目中更有效地应用asyncio库。有关asyncio库的详细介绍，可参考：<a href=\\"https://www.cnblogs.com/luohenyueji/p/18562526\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Python 异步编程库 asyncio 使用指北</a>。</p>\\n<h2>1 asyncio程序的常见错误</h2>\\n<p>本节展示了在使用asyncio模块时，开发人员常遇到的一些常见错误示例。以下是四个最常见的异步编程错误：</p>","autoDesc":true}');export{q as comp,x as data};
