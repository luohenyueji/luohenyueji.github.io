import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as t,e as s}from"./app-MsA2k2kn.js";const n={},r=s(`<h1 id="常用工具-caffe-ssd常见问题集合" tabindex="-1"><a class="header-anchor" href="#常用工具-caffe-ssd常见问题集合" aria-hidden="true">#</a> [常用工具] Caffe ssd常见问题集合</h1><p><strong>1 Check failed: a &lt;= b &lt;0 vs -1.19209e-007&gt;</strong></p><p>网上办法是注释掉 CHECK_LE(a, b)，但是这样会出大问题。解决办法见2。</p><p>如果注释掉 CHECK_LE(a, b) 会出现Data layer prefetch queue empty</p><p>不注释CHECK_LE(a, b) 会出现错误 a可能大于b</p><p><strong>2 training error: Data layer prefetch queue empty</strong></p><p>这种问题出现通常是注释掉 CHECK_LE(a, b) 出现Data layer prefetch queue empty。导致程序出现死循环。</p><p>解决办法修改src/caffe/util/sampler.cpp，如下面修改代码所示//renew注释下，加入两个判断，使得bbox长宽不要越界。</p><pre><code>void SampleBBox(const Sampler&amp; sampler, NormalizedBBox* sampled_bbox) {
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
</code></pre><p><strong>3 配置SSD-caffe测试时出现“Check failed: error == cudaSuccess (10 vs. 0) invalid device ordinal”解决</strong></p><p>运行 python examples/ssd/ssd_pascal.py 时报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>解决方法：将ssd_pascal.py文件中第332行gpus = “0，1，2，3”的GPU选择改为gpus =“0”，后面的1，2，3都删掉即可。
再次训练即可。当然，只有一块GPU且电脑运行内存有限，还需要将ssd_pascal.py文件中的337行batch_size= 32和338行accum_batch_size = 32都改小一倍，即更改批量大小，
不然会出现“Check failed: error ==cudaSuccess (2 vs. 0) invalid …”的错误。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4 配置SSD-caffe出现“ AttributeError: ‘module’ object has no attribute ‘LabelMap’”解决</strong></p><p>这是由于caffe的Python环境变量未配置好，可按照下面方法解决：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim ~/.bashrc  
加入 export PYTHONPATH=/SSD所在目录/caffe/python  
source ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),o=[r];function i(_,c){return a(),t("div",null,o)}const d=e(n,[["render",i],["__file","2019-03-12-_常用工具_ Caffe ssd常见问题集合.html.vue"]]);export{d as default};
