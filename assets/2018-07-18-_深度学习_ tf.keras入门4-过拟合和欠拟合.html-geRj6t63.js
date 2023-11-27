import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as i,c as l,a as e,b as a,d as n,e as r}from"./app-MsA2k2kn.js";const d={},_=e("h1",{id:"深度学习-tf-keras入门4-过拟合和欠拟合",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#深度学习-tf-keras入门4-过拟合和欠拟合","aria-hidden":"true"},"#"),a(" [深度学习] tf.keras入门4-过拟合和欠拟合")],-1),c=e("p",null,"过拟合和欠拟合",-1),h=e("p",null,"简单来说过拟合就是模型训练集精度高，测试集训练精度低；欠拟合则是模型训练集和测试集训练精度都低。",-1),p={href:"https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit",target:"_blank",rel:"noopener noreferrer"},u=r('<h2 id="过拟合和欠拟合" tabindex="-1"><a class="header-anchor" href="#过拟合和欠拟合" aria-hidden="true">#</a> 过拟合和欠拟合</h2><p>以IMDB dataset为例，对于过拟合和欠拟合，不同模型的测试集和验证集损失函数图如下：</p><p>baseline模型结构为：10000-16-16-1</p><p>smaller_model模型结构为：10000-4-4-1</p><p>bigger_model模型结构为：10000-512-512-1</p><p>造成过拟合的原因通常是参数过多或者数据较少，欠拟合往往是训练次数不够。</p><figure><img src="https://img-blog.csdn.net/20180718104742110?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h2><h3 id="正则化" tabindex="-1"><a class="header-anchor" href="#正则化" aria-hidden="true">#</a> 正则化</h3><p>正则化简单来说就是稀疏化参数，使得模型参数较少。类似于降维。</p>',10),f={href:"https://blog.csdn.net/jinping_shi/article/details/52433975",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"tf.keras通常在损失函数后添加正则项，l1正则化和l2正则化。",-1),b=e("pre",null,[e("code",null,`l2_model = keras.models.Sequential([
    keras.layers.Dense(16, kernel_regularizer=keras.regularizers.l2(0.001),#权重l2正则化
                       activation=tf.nn.relu, input_shape=(10000,)),
    keras.layers.Dense(16, kernel_regularizer=keras.regularizers.l2(0.001),#权重l2正则化
                       activation=tf.nn.relu),
    keras.layers.Dense(1, activation=tf.nn.sigmoid)
])

l2_model.compile(optimizer='adam',
                 loss='binary_crossentropy',
                 metrics=['accuracy', 'binary_crossentropy'])

l2_model_history = l2_model.fit(train_data, train_labels,
                                epochs=20,
                                batch_size=512,
                                validation_data=(test_data, test_labels),
                                verbose=2)
`)],-1),k=e("h3",{id:"dropout",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#dropout","aria-hidden":"true"},"#"),a(" dropout")],-1),g=e("p",null,"Dropout将在训练过程中每次更新参数时按一定概率（rate）随机断开输入神经元，使得比例为rate的神经元不被训练。",-1),y={href:"https://yq.aliyun.com/articles/68901",target:"_blank",rel:"noopener noreferrer"},v=r(`<pre><code>dpt_model = keras.models.Sequential([
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
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>常用防止过拟合的方法有：</p><ol><li>增加数据量</li><li>减少网络结构参数</li><li>正则化</li><li>dropout</li><li>数据扩增data-augmentation</li><li>批标准化</li></ol>`,4);function x(z,D){const t=o("ExternalLinkIcon");return i(),l("div",null,[_,c,h,e("p",null,[a("官方文档地址为 "),e("a",p,[a("https://tensorflow.google.cn/tutorials/keras/overfit_and_underfit"),n(t)])]),u,e("p",null,[a("正则化参考： "),e("a",f,[a(" https://blog.csdn.net/jinping_shi/article/details/52433975 "),n(t)])]),m,b,k,g,e("p",null,[a("具体见： "),e("a",y,[a(" https://yq.aliyun.com/articles/68901 "),n(t)])]),v])}const N=s(d,[["render",x],["__file","2018-07-18-_深度学习_ tf.keras入门4-过拟合和欠拟合.html.vue"]]);export{N as default};
