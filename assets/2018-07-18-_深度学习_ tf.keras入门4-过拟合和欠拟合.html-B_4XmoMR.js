import{_ as t,c as a,a as r,o as n}from"./app-CJwJJlha.js";const l={};function o(s,e){return n(),a("div",null,e[0]||(e[0]=[r(`<h1 id="深度学习-tf-keras入门4-过拟合和欠拟合" tabindex="-1"><a class="header-anchor" href="#深度学习-tf-keras入门4-过拟合和欠拟合"><span>[深度学习] tf.keras入门4-过拟合和欠拟合</span></a></h1><p>过拟合和欠拟合</p><p>简单来说过拟合就是模型训练集精度高，测试集训练精度低；欠拟合则是模型训练集和测试集训练精度都低。</p><p>官方文档地址为 <a href="https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit" target="_blank" rel="noopener noreferrer">https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit</a></p><h2 id="过拟合和欠拟合" tabindex="-1"><a class="header-anchor" href="#过拟合和欠拟合"><span>过拟合和欠拟合</span></a></h2><p>以IMDB dataset为例，对于过拟合和欠拟合，不同模型的测试集和验证集损失函数图如下：</p><p>baseline模型结构为：10000-16-16-1</p><p>smaller_model模型结构为：10000-4-4-1</p><p>bigger_model模型结构为：10000-512-512-1</p><p>造成过拟合的原因通常是参数过多或者数据较少，欠拟合往往是训练次数不够。</p><figure><img src="https://img-blog.csdn.net/20180718104742110?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法"><span>解决方法</span></a></h2><h3 id="正则化" tabindex="-1"><a class="header-anchor" href="#正则化"><span>正则化</span></a></h3><p>正则化简单来说就是稀疏化参数，使得模型参数较少。类似于降维。</p><p>正则化参考： <a href="https://blog.csdn.net/jinping_shi/article/details/52433975" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/jinping_shi/article/details/52433975 </a></p><p>tf.keras通常在损失函数后添加正则项，l1正则化和l2正则化。</p><pre><code>l2_model = keras.models.Sequential([
    keras.layers.Dense(16, kernel_regularizer=keras.regularizers.l2(0.001),#权重l2正则化
                       activation=tf.nn.relu, input_shape=(10000,)),
    keras.layers.Dense(16, kernel_regularizer=keras.regularizers.l2(0.001),#权重l2正则化
                       activation=tf.nn.relu),
    keras.layers.Dense(1, activation=tf.nn.sigmoid)
])

l2_model.compile(optimizer=&#39;adam&#39;,
                 loss=&#39;binary_crossentropy&#39;,
                 metrics=[&#39;accuracy&#39;, &#39;binary_crossentropy&#39;])

l2_model_history = l2_model.fit(train_data, train_labels,
                                epochs=20,
                                batch_size=512,
                                validation_data=(test_data, test_labels),
                                verbose=2)
</code></pre><h3 id="dropout" tabindex="-1"><a class="header-anchor" href="#dropout"><span>dropout</span></a></h3><p>Dropout将在训练过程中每次更新参数时按一定概率（rate）随机断开输入神经元，使得比例为rate的神经元不被训练。</p><p>具体见： <a href="https://yq.aliyun.com/articles/68901" target="_blank" rel="noopener noreferrer"> https://yq.aliyun.com/articles/68901 </a></p><pre><code>dpt_model = keras.models.Sequential([
    keras.layers.Dense(16, activation=tf.nn.relu, input_shape=(10000,)),
    keras.layers.Dropout(0.3), #百分之30的神经元失效
    keras.layers.Dense(16, activation=tf.nn.relu),
    keras.layers.Dropout(0.7), #百分之70的神经元失效
    keras.layers.Dense(1, activation=tf.nn.sigmoid)
])

dpt_model.compile(optimizer=&#39;adam&#39;,
                  loss=&#39;binary_crossentropy&#39;,
                  metrics=[&#39;accuracy&#39;,&#39;binary_crossentropy&#39;])

dpt_model_history = dpt_model.fit(train_data, train_labels,
                                  epochs=20,
                                  batch_size=512,
                                  validation_data=(test_data, test_labels),
                                  verbose=2)
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>常用防止过拟合的方法有：</p><ol><li>增加数据量</li><li>减少网络结构参数</li><li>正则化</li><li>dropout</li><li>数据扩增data-augmentation</li><li>批标准化</li></ol>`,24)]))}const p=t(l,[["render",o],["__file","2018-07-18-_深度学习_ tf.keras入门4-过拟合和欠拟合.html.vue"]]),d=JSON.parse('{"path":"/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-18-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A84-%E8%BF%87%E6%8B%9F%E5%90%88%E5%92%8C%E6%AC%A0%E6%8B%9F%E5%90%88.html","title":"[深度学习] tf.keras入门4-过拟合和欠拟合","lang":"zh-CN","frontmatter":{"date":"2018-07-18T11:38:54.000Z","category":["深度学习"],"tag":["深度学习"],"description":"[深度学习] tf.keras入门4-过拟合和欠拟合 过拟合和欠拟合 简单来说过拟合就是模型训练集精度高，测试集训练精度低；欠拟合则是模型训练集和测试集训练精度都低。 官方文档地址为 https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit 过拟合和欠拟合 以IMDB datas...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-18-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A84-%E8%BF%87%E6%8B%9F%E5%90%88%E5%92%8C%E6%AC%A0%E6%8B%9F%E5%90%88.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[深度学习] tf.keras入门4-过拟合和欠拟合"}],["meta",{"property":"og:description","content":"[深度学习] tf.keras入门4-过拟合和欠拟合 过拟合和欠拟合 简单来说过拟合就是模型训练集精度高，测试集训练精度低；欠拟合则是模型训练集和测试集训练精度都低。 官方文档地址为 https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit 过拟合和欠拟合 以IMDB datas..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdn.net/20180718104742110?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2018-07-18T11:38:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[深度学习] tf.keras入门4-过拟合和欠拟合\\",\\"image\\":[\\"https://img-blog.csdn.net/20180718104742110?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70\\"],\\"datePublished\\":\\"2018-07-18T11:38:54.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"过拟合和欠拟合","slug":"过拟合和欠拟合","link":"#过拟合和欠拟合","children":[]},{"level":2,"title":"解决方法","slug":"解决方法","link":"#解决方法","children":[{"level":3,"title":"正则化","slug":"正则化","link":"#正则化","children":[]},{"level":3,"title":"dropout","slug":"dropout","link":"#dropout","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{},"readingTime":{"minutes":1.61,"words":483},"filePathRelative":"blog/深度学习/深度学习笔记/2018-07-18-[深度学习] tf.keras入门4-过拟合和欠拟合.md","localizedDate":"2018年7月18日","excerpt":"\\n<p>过拟合和欠拟合</p>\\n<p>简单来说过拟合就是模型训练集精度高，测试集训练精度低；欠拟合则是模型训练集和测试集训练精度都低。</p>\\n<p>官方文档地址为 <a href=\\"https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit</a></p>\\n<h2>过拟合和欠拟合</h2>\\n<p>以IMDB dataset为例，对于过拟合和欠拟合，不同模型的测试集和验证集损失函数图如下：</p>","autoDesc":true}');export{p as comp,d as data};
