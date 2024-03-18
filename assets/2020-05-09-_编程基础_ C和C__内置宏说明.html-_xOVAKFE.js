import{_ as l,r as d,o as i,c as s,a as e,b as t,d as a,e as r}from"./app-Bf4gfzXW.js";const u={},c=e("h1",{id:"编程基础-c和c-内置宏说明",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#编程基础-c和c-内置宏说明"},[e("span",null,"[编程基础] C和C++内置宏说明")])],-1),o={href:"https://www.jianshu.com/p/a2527bc23a95",target:"_blank",rel:"noopener noreferrer"},v=r(`<h2 id="_1-内置的宏定义" tabindex="-1"><a class="header-anchor" href="#_1-内置的宏定义"><span>1 内置的宏定义</span></a></h2><p>这些宏在代码中可直接调用。</p><table><thead><tr><th>宏</th><th>宏说明</th></tr></thead><tbody><tr><td>__DATE__</td><td>程序最后编译日期宏</td></tr><tr><td>__TIME__</td><td>程序最后编译时间宏</td></tr><tr><td>__LINE__</td><td>当前行数宏</td></tr><tr><td>__FILE__</td><td>当前运行文件名宏</td></tr><tr><td>__FUNCTION__</td><td>当前运行函数宏</td></tr><tr><td>__func__</td><td>当前运行函数宏</td></tr></tbody></table><p><strong>示例代码</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>cout &lt;&lt; &quot;程序最后编译日期宏 &quot; &lt;&lt; __DATE__ &lt;&lt; endl;
cout &lt;&lt; &quot;程序最后编译时间宏 &quot; &lt;&lt; __TIME__ &lt;&lt; endl;
cout &lt;&lt; &quot;当前行数宏 &quot; &lt;&lt; __LINE__ &lt;&lt; endl;
cout &lt;&lt; &quot;当前运行文件名宏 &quot; &lt;&lt; __FILE__ &lt;&lt; endl;
cout &lt;&lt; &quot;当前运行函数宏 &quot; &lt;&lt; __FUNCTION__ &lt;&lt; endl;
cout &lt;&lt; &quot;当前运行函数宏 &quot; &lt;&lt; __func__ &lt;&lt; endl;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>windows输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>程序最后编译日期宏 May  8 2020
程序最后编译时间宏 11:19:24
当前行数宏 12
当前运行文件名宏 c:\\users\\admin\\desktop\\test\\define.cpp
当前运行函数宏 main
当前运行函数宏 main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>linux输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>程序最后编译日期宏 May  8 2020
程序最后编译时间宏 11:19:00
当前行数宏 9
当前运行文件名宏 define.cpp
当前运行函数宏 main
当前运行函数宏 main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-运行平台宏" tabindex="-1"><a class="header-anchor" href="#_2-运行平台宏"><span>2 运行平台宏</span></a></h2><p>这些宏主要是判断当前系统运行平台。</p><table><thead><tr><th>宏</th><th>宏说明</th></tr></thead><tbody><tr><td>WIN32、_WIN32、_WIN32_、WIN64、_WIN64、_WIN64_</td><td>windows</td></tr><tr><td>ANDROID、_ANDROID_</td><td>android</td></tr><tr><td>__linux__</td><td>linux</td></tr><tr><td>__APPLE__、TARGET_OS_IPHONE、TARGET_IPHONE_SIMULATOR、TARGET_OS_MAC</td><td>ios、mac</td></tr></tbody></table><p><strong>示例代码</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>	// windows
#if defined(WIN32) || defined(_WIN32) || defined(_WIN32_) || defined(WIN64) || defined(_WIN64) || defined(_WIN64_)
	cout &lt;&lt; &quot;hello windows&quot; &lt;&lt; endl;

	// android
#elif defined(ANDROID) || defined(_ANDROID_)
	cout &lt;&lt; &quot;hello android&quot; &lt;&lt; endl;

	// linux
#elif defined(__linux__)
	cout &lt;&lt; &quot;hello linux&quot; &lt;&lt; endl;

	// ios or mac
#elif defined(__APPLE__) || defined(TARGET_OS_IPHONE) || defined(TARGET_IPHONE_SIMULATOR) || defined(TARGET_OS_MAC)
	cout &lt;&lt; &quot;hello ios/mac&quot; &lt;&lt; endl;

	// other
#else
	cout &lt;&lt; &quot;hello unknown&quot; &lt;&lt; endl;
#endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>windows输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>linux输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-编译器宏" tabindex="-1"><a class="header-anchor" href="#_3-编译器宏"><span>3 编译器宏</span></a></h2><p>这些宏主要是判断当前程序的编译器类型。</p><table><thead><tr><th>宏</th><th>宏说明</th></tr></thead><tbody><tr><td>_MSC_VER</td><td>visual studio</td></tr><tr><td>__GNUC__</td><td>gcc、g++</td></tr><tr><td>__SUNPRO_C、__SUNPRO_CC</td><td>sun cc</td></tr></tbody></table><p><strong>示例代码</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>	// visual studio
#if defined(_MSC_VER)
	cout &lt;&lt; &quot;hello VC&quot; &lt;&lt; endl;

	// gcc/g++
#elif defined(__GNUC__)
	cout &lt;&lt; &quot;hello GCC / G++ &quot; &lt;&lt; endl;

	// SunCC
#elif defined(__SUNPRO_C)||defined(__SUNPRO_CC)
	cout &lt;&lt; &quot;hello SunCC&quot; &lt;&lt; endl;
#endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>windows输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello VC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>linux输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>hello GCC / G++ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-调试类型宏" tabindex="-1"><a class="header-anchor" href="#_4-调试类型宏"><span>4 调试类型宏</span></a></h2><p>这些宏主要是判断当前程序的调试类型。</p><table><thead><tr><th>宏</th><th>宏说明</th></tr></thead><tbody><tr><td>_DEBUG</td><td>debug模式</td></tr></tbody></table><p><strong>示例代码</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#if defined(_DEBUG)
	cout &lt;&lt; &quot;debug&quot; &lt;&lt; endl;
#else
	cout &lt;&lt; &quot;release&quot; &lt;&lt; endl;
#endif 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>windows输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>linux输出结果</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-代码" tabindex="-1"><a class="header-anchor" href="#_5-代码"><span>5 代码</span></a></h2><p>所有示例运行代码如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#include &lt;iostream&gt;

using namespace std;

int main()
{

	cout &lt;&lt; &quot;程序最后编译日期宏 &quot; &lt;&lt; __DATE__ &lt;&lt; endl;
	cout &lt;&lt; &quot;程序最后编译时间宏 &quot; &lt;&lt; __TIME__ &lt;&lt; endl;
	cout &lt;&lt; &quot;当前行数宏 &quot; &lt;&lt; __LINE__ &lt;&lt; endl;
	cout &lt;&lt; &quot;当前运行文件名宏 &quot; &lt;&lt; __FILE__ &lt;&lt; endl;
	cout &lt;&lt; &quot;当前运行函数宏 &quot; &lt;&lt; __FUNCTION__ &lt;&lt; endl;
	cout &lt;&lt; &quot;当前运行函数宏 &quot; &lt;&lt; __func__ &lt;&lt; endl;

	// 运行平台宏
	// windows
#if defined(WIN32) || defined(_WIN32) || defined(_WIN32_) || defined(WIN64) || defined(_WIN64) || defined(_WIN64_)
	cout &lt;&lt; &quot;hello windows&quot; &lt;&lt; endl;

	// android
#elif defined(ANDROID) || defined(_ANDROID_)
	cout &lt;&lt; &quot;hello android&quot; &lt;&lt; endl;

	// linux
#elif defined(__linux__)
	cout &lt;&lt; &quot;hello linux&quot; &lt;&lt; endl;

	// ios or mac
#elif defined(__APPLE__) || defined(TARGET_OS_IPHONE) || defined(TARGET_IPHONE_SIMULATOR) || defined(TARGET_OS_MAC)
	cout &lt;&lt; &quot;hello ios/mac&quot; &lt;&lt; endl;

	// other
#else
	cout &lt;&lt; &quot;hello unknown&quot; &lt;&lt; endl;
#endif

	// 编译器宏
	// visual studio
#if defined(_MSC_VER)
	cout &lt;&lt; &quot;hello VC&quot; &lt;&lt; endl;

	// gcc/g++
#elif defined(__GNUC__)
	cout &lt;&lt; &quot;hello GCC / G++ &quot; &lt;&lt; endl;

	// SunCC
#elif defined(__SUNPRO_C)||defined(__SUNPRO_CC)
	cout &lt;&lt; &quot;hello SunCC&quot; &lt;&lt; endl;
#endif

// 调试类型
#if defined(_DEBUG)
	cout &lt;&lt; &quot;debug&quot; &lt;&lt; endl;
#else
	cout &lt;&lt; &quot;release&quot; &lt;&lt; endl;
#endif 

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39);function _(m,b){const n=d("ExternalLinkIcon");return i(),s("div",null,[c,e("p",null,[t("C和C++内置宏在代码调试、跨系统平台代码中会经常使用，本文记录说明一下。内置宏不需要调用头文件，可直接使用。在使用预定义的宏之间需要了解常用的条件编译指令，具体条件编译指令可见： "),e("a",o,[t("if、#else、#endif、#elif、#ifdef、#ifndef的区别和使用"),a(n)])]),v])}const p=l(u,[["render",_],["__file","2020-05-09-_编程基础_ C和C__内置宏说明.html.vue"]]),g=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-05-09-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C%E5%92%8CC__%E5%86%85%E7%BD%AE%E5%AE%8F%E8%AF%B4%E6%98%8E.html","title":"[编程基础] C和C++内置宏说明","lang":"zh-CN","frontmatter":{"date":"2020-05-09T21:09:04.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C和C++内置宏说明 C和C++内置宏在代码调试、跨系统平台代码中会经常使用，本文记录说明一下。内置宏不需要调用头文件，可直接使用。在使用预定义的宏之间需要了解常用的条件编译指令，具体条件编译指令可见： if、#else、#endif、#elif、#ifdef、#ifndef的区别和使用 1 内置的宏定义 这些宏在代码中可直接调用。 示例...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2020-05-09-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C%E5%92%8CC__%E5%86%85%E7%BD%AE%E5%AE%8F%E8%AF%B4%E6%98%8E.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C和C++内置宏说明"}],["meta",{"property":"og:description","content":"[编程基础] C和C++内置宏说明 C和C++内置宏在代码调试、跨系统平台代码中会经常使用，本文记录说明一下。内置宏不需要调用头文件，可直接使用。在使用预定义的宏之间需要了解常用的条件编译指令，具体条件编译指令可见： if、#else、#endif、#elif、#ifdef、#ifndef的区别和使用 1 内置的宏定义 这些宏在代码中可直接调用。 示例..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"落痕月极"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2020-05-09T21:09:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C和C++内置宏说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-09T21:09:04.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 内置的宏定义","slug":"_1-内置的宏定义","link":"#_1-内置的宏定义","children":[]},{"level":2,"title":"2 运行平台宏","slug":"_2-运行平台宏","link":"#_2-运行平台宏","children":[]},{"level":2,"title":"3 编译器宏","slug":"_3-编译器宏","link":"#_3-编译器宏","children":[]},{"level":2,"title":"4 调试类型宏","slug":"_4-调试类型宏","link":"#_4-调试类型宏","children":[]},{"level":2,"title":"5 代码","slug":"_5-代码","link":"#_5-代码","children":[]}],"git":{},"readingTime":{"minutes":3.05,"words":914},"filePathRelative":"blog/编程基础/学习笔记/2020-05-09-[编程基础] C和C++内置宏说明.md","localizedDate":"2020年5月10日","excerpt":"\\n<p>C和C++内置宏在代码调试、跨系统平台代码中会经常使用，本文记录说明一下。内置宏不需要调用头文件，可直接使用。在使用预定义的宏之间需要了解常用的条件编译指令，具体条件编译指令可见：\\n<a href=\\"https://www.jianshu.com/p/a2527bc23a95\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">if、#else、#endif、#elif、#ifdef、#ifndef的区别和使用</a></p>\\n<h2>1 内置的宏定义</h2>\\n<p>这些宏在代码中可直接调用。</p>\\n<table>\\n<thead>\\n<tr>\\n<th>宏</th>\\n<th>宏说明</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>__DATE__</td>\\n<td>程序最后编译日期宏</td>\\n</tr>\\n<tr>\\n<td>__TIME__</td>\\n<td>程序最后编译时间宏</td>\\n</tr>\\n<tr>\\n<td>__LINE__</td>\\n<td>当前行数宏</td>\\n</tr>\\n<tr>\\n<td>__FILE__</td>\\n<td>当前运行文件名宏</td>\\n</tr>\\n<tr>\\n<td>__FUNCTION__</td>\\n<td>当前运行函数宏</td>\\n</tr>\\n<tr>\\n<td>__func__</td>\\n<td>当前运行函数宏</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{p as comp,g as data};
