import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o,c as n,e as r}from"./app-MsA2k2kn.js";const t={},c=r(`<h1 id="编程基础-c-自定义类调用窗体控件" tabindex="-1"><a class="header-anchor" href="#编程基础-c-自定义类调用窗体控件" aria-hidden="true">#</a> [编程基础] C#自定义类调用窗体控件</h1><p>如果自定义类需要调用窗体控件，首先需要将窗体控件的可见级别（Modifiers）设为public。如下图所示：</p><figure><img src="https://img-blog.csdn.net/20171102225540161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHVvaGVuWUo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>然后在Form1类下定义静态变量form1，并初始化。</p><pre><code>class Form1: Form
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
</code></pre>`,9),i=[c];function a(_,s){return o(),n("div",null,i)}const p=e(t,[["render",a],["__file","2017-11-02-_编程基础_ C_自定义类调用窗体控件.html.vue"]]);export{p as default};
