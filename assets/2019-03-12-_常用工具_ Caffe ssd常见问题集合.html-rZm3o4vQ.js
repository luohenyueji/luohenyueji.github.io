import{_ as a,c as t,a as s,o as n}from"./app-BOswGe5u.js";const i={};function r(p,e){return n(),t("div",null,e[0]||(e[0]=[s(`<h1 id="常用工具-caffe-ssd常见问题集合" tabindex="-1"><a class="header-anchor" href="#常用工具-caffe-ssd常见问题集合"><span>[常用工具] Caffe ssd常见问题集合</span></a></h1><p><strong>1 Check failed: a &lt;= b &lt;0 vs -1.19209e-007&gt;</strong></p><p>网上办法是注释掉 CHECK_LE(a, b)，但是这样会出大问题。解决办法见2。</p><p>如果注释掉 CHECK_LE(a, b) 会出现Data layer prefetch queue empty</p><p>不注释CHECK_LE(a, b) 会出现错误 a可能大于b</p><p><strong>2 training error: Data layer prefetch queue empty</strong></p><p>这种问题出现通常是注释掉 CHECK_LE(a, b) 出现Data layer prefetch queue empty。导致程序出现死循环。</p><p>解决办法修改src/caffe/util/sampler.cpp，如下面修改代码所示//renew注释下，加入两个判断，使得bbox长宽不要越界。</p><pre><code>void SampleBBox(const Sampler&amp; sampler, NormalizedBBox* sampled_bbox) {
  // Get random scale.
  CHECK_GE(sampler.max_scale(), sampler.min_scale());
  CHECK_GT(sampler.min_scale(), 0.);
  CHECK_LE(sampler.max_scale(), 1.);
  float scale;
  caffe_rng_uniform(1, sampler.min_scale(), sampler.max_scale(), &amp;scale);

  // Get random aspect ratio.
  CHECK_GE(sampler.max_aspect_ratio(), sampler.min_aspect_ratio());
  CHECK_GT(sampler.min_aspect_ratio(), 0.);
  CHECK_LT(sampler.max_aspect_ratio(), FLT_MAX);
  float aspect_ratio;
  caffe_rng_uniform(1, sampler.min_aspect_ratio(), sampler.max_aspect_ratio(),
      &amp;aspect_ratio);

  aspect_ratio = std::max&lt;float&gt;(aspect_ratio, std::pow(scale, 2.));
  aspect_ratio = std::min&lt;float&gt;(aspect_ratio, 1 / std::pow(scale, 2.));

  // Figure out bbox dimension.
  float bbox_width = scale * sqrt(aspect_ratio);
  float bbox_height = scale / sqrt(aspect_ratio);

  //renew
  if(bbox_width&gt;=1.0)
  {
    bbox_width=1.0;
  }
  if(bbox_height&gt;=1.0)
  {
    bbox_height=1.0;
  }

  // Figure out top left coordinates.
  float w_off, h_off;
  caffe_rng_uniform(1, 0.f, 1 - bbox_width, &amp;w_off);
  caffe_rng_uniform(1, 0.f, 1 - bbox_height, &amp;h_off);

  sampled_bbox-&gt;set_xmin(w_off);
  sampled_bbox-&gt;set_ymin(h_off);
  sampled_bbox-&gt;set_xmax(w_off + bbox_width);
  sampled_bbox-&gt;set_ymax(h_off + bbox_height);
}
</code></pre><p><strong>3 配置SSD-caffe测试时出现“Check failed: error == cudaSuccess (10 vs. 0) invalid device ordinal”解决</strong></p><p>运行 python examples/ssd/ssd_pascal.py 时报错</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>解决方法：将ssd_pascal.py文件中第332行gpus = “0，1，2，3”的GPU选择改为gpus =“0”，后面的1，2，3都删掉即可。</span></span>
<span class="line"><span>再次训练即可。当然，只有一块GPU且电脑运行内存有限，还需要将ssd_pascal.py文件中的337行batch_size= 32和338行accum_batch_size = 32都改小一倍，即更改批量大小，</span></span>
<span class="line"><span>不然会出现“Check failed: error ==cudaSuccess (2 vs. 0) invalid …”的错误。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4 配置SSD-caffe出现“ AttributeError: ‘module’ object has no attribute ‘LabelMap’”解决</strong></p><p>这是由于caffe的Python环境变量未配置好，可按照下面方法解决：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>vim ~/.bashrc  </span></span>
<span class="line"><span>加入 export PYTHONPATH=/SSD所在目录/caffe/python  </span></span>
<span class="line"><span>source ~/.bashrc</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)]))}const l=a(i,[["render",r],["__file","2019-03-12-_常用工具_ Caffe ssd常见问题集合.html.vue"]]),c=JSON.parse('{"path":"/blog/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/2019-03-12-_%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7_%20Caffe%20ssd%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E9%9B%86%E5%90%88.html","title":"[常用工具] Caffe ssd常见问题集合","lang":"zh-CN","frontmatter":{"date":"2019-03-12T10:54:11.000Z","category":["常用工具"],"tag":["常用工具","深度学习"],"description":"[常用工具] Caffe ssd常见问题集合 1 Check failed: a <= b <0 vs -1.19209e-007> 网上办法是注释掉 CHECK_LE(a, b)，但是这样会出大问题。解决办法见2。 如果注释掉 CHECK_LE(a, b) 会出现Data layer prefetch queue empty 不注释CHECK_LE(...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/2019-03-12-_%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7_%20Caffe%20ssd%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E9%9B%86%E5%90%88.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[常用工具] Caffe ssd常见问题集合"}],["meta",{"property":"og:description","content":"[常用工具] Caffe ssd常见问题集合 1 Check failed: a <= b <0 vs -1.19209e-007> 网上办法是注释掉 CHECK_LE(a, b)，但是这样会出大问题。解决办法见2。 如果注释掉 CHECK_LE(a, b) 会出现Data layer prefetch queue empty 不注释CHECK_LE(..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"常用工具"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2019-03-12T10:54:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[常用工具] Caffe ssd常见问题集合\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-03-12T10:54:11.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[],"git":{},"readingTime":{"minutes":1.64,"words":492},"filePathRelative":"blog/常用工具/2019-03-12-[常用工具] Caffe ssd常见问题集合.md","localizedDate":"2019年3月12日","excerpt":"\\n<p><strong>1 Check failed: a &lt;= b &lt;0 vs -1.19209e-007&gt;</strong></p>\\n<p>网上办法是注释掉 CHECK_LE(a, b)，但是这样会出大问题。解决办法见2。</p>\\n<p>如果注释掉 CHECK_LE(a, b) 会出现Data layer prefetch queue empty</p>\\n<p>不注释CHECK_LE(a, b) 会出现错误 a可能大于b</p>\\n<p><strong>2 training error: Data layer prefetch queue empty</strong></p>","autoDesc":true}');export{l as comp,c as data};
