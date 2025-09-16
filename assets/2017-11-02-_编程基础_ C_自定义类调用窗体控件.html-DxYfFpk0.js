import{_ as e,c as o,a,o as i}from"./app-TQoR7mvJ.js";const n={};function r(c,t){return i(),o("div",null,t[0]||(t[0]=[a(`<h1 id="编程基础-c-自定义类调用窗体控件" tabindex="-1"><a class="header-anchor" href="#编程基础-c-自定义类调用窗体控件"><span>[编程基础] C#自定义类调用窗体控件</span></a></h1><p>如果自定义类需要调用窗体控件，首先需要将窗体控件的可见级别（Modifiers）设为public。如下图所示：</p><figure><img src="https://img-blog.csdn.net/20171102225540161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHVvaGVuWUo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后在Form1类下定义静态变量form1，并初始化。</p><pre><code>class Form1: Form
{
    //在Form1类下定义静态变量
    public static Form1 form1;
    public Form1()
    {
        InitializeComponent();
        form1 = this;
    }
｝
</code></pre><p>然后在自定类中调用</p><pre><code>public class Myclass 
{  
    public void methond()
    {
        Form form1.label.text();
    }
}
</code></pre><p>此外还有一种处理方式，但是该方法无法获取原来窗体的实时状态。</p><pre><code>class Form2: Form  
{  
    Form2 frm2 = new Form1();  
    public void Method()  
    {  
         Form2.frm2.label.text();
    }  
}  
</code></pre>`,9)]))}const s=e(n,[["render",r],["__file","2017-11-02-_编程基础_ C_自定义类调用窗体控件.html.vue"]]),p=JSON.parse('{"path":"/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2017-11-02-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C_%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E8%B0%83%E7%94%A8%E7%AA%97%E4%BD%93%E6%8E%A7%E4%BB%B6.html","title":"[编程基础] C#自定义类调用窗体控件","lang":"zh-CN","frontmatter":{"date":"2017-11-02T22:54:00.000Z","category":["编程基础"],"tag":["编程基础"],"description":"[编程基础] C#自定义类调用窗体控件 如果自定义类需要调用窗体控件，首先需要将窗体控件的可见级别（Modifiers）设为public。如下图所示： 然后在Form1类下定义静态变量form1，并初始化。 然后在自定类中调用 此外还有一种处理方式，但是该方法无法获取原来窗体的实时状态。","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2017-11-02-_%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80_%20C_%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E8%B0%83%E7%94%A8%E7%AA%97%E4%BD%93%E6%8E%A7%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[编程基础] C#自定义类调用窗体控件"}],["meta",{"property":"og:description","content":"[编程基础] C#自定义类调用窗体控件 如果自定义类需要调用窗体控件，首先需要将窗体控件的可见级别（Modifiers）设为public。如下图所示： 然后在Form1类下定义静态变量form1，并初始化。 然后在自定类中调用 此外还有一种处理方式，但是该方法无法获取原来窗体的实时状态。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdn.net/20171102225540161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHVvaGVuWUo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"编程基础"}],["meta",{"property":"article:published_time","content":"2017-11-02T22:54:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[编程基础] C#自定义类调用窗体控件\\",\\"image\\":[\\"https://img-blog.csdn.net/20171102225540161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHVvaGVuWUo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast\\"],\\"datePublished\\":\\"2017-11-02T22:54:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[],"git":{},"readingTime":{"minutes":0.57,"words":171},"filePathRelative":"blog/编程基础/学习笔记/2017-11-02-[编程基础] C#自定义类调用窗体控件.md","localizedDate":"2017年11月3日","excerpt":"\\n<p>如果自定义类需要调用窗体控件，首先需要将窗体控件的可见级别（Modifiers）设为public。如下图所示：</p>\\n<figure><img src=\\"https://img-blog.csdn.net/20171102225540161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHVvaGVuWUo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{s as comp,p as data};
