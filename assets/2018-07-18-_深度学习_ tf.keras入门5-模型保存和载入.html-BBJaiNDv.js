import{_ as a,c as s,a as n,o as l}from"./app-B1QbUTkN.js";const t={};function i(o,e){return l(),s("div",null,e[0]||(e[0]=[n(`<h1 id="深度学习-tf-keras入门5-模型保存和载入" tabindex="-1"><a class="header-anchor" href="#深度学习-tf-keras入门5-模型保存和载入"><span>[深度学习] tf.keras入门5-模型保存和载入</span></a></h1><p>模型可以在训练中或者训练完成后保存。具体文档参考： <a href="https://tensorflow.google.cn/tutorials/keras/save_and_restore_models" target="_blank" rel="noopener noreferrer">https://tensorflow.google.cn/tutorials/keras/save_and_restore_models</a></p><h2 id="设置" tabindex="-1"><a class="header-anchor" href="#设置"><span>设置</span></a></h2><p>依赖项设置：</p><blockquote><p>!pip install -q h5py pyyaml</p></blockquote><p>模型建立：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>    from __future__ import absolute_import, division, print_function</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    import os</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    import tensorflow as tf</span></span>
<span class="line"><span>    from tensorflow import keras</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    tf.__version__</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    train_labels = train_labels[:1000]</span></span>
<span class="line"><span>    test_labels = test_labels[:1000]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    train_images = train_images[:1000].reshape(-1, 28 * 28) / 255.0</span></span>
<span class="line"><span>    test_images = test_images[:1000].reshape(-1, 28 * 28) / 255.0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    ## 模型创建模型</span></span>
<span class="line"><span>    def create_model():</span></span>
<span class="line"><span>      model = tf.keras.models.Sequential([</span></span>
<span class="line"><span>        keras.layers.Dense(512, activation=tf.nn.relu, input_shape=(784,)),</span></span>
<span class="line"><span>        keras.layers.Dropout(0.2),</span></span>
<span class="line"><span>        keras.layers.Dense(10, activation=tf.nn.softmax)</span></span>
<span class="line"><span>      ])</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      model.compile(optimizer=tf.keras.optimizers.Adam(), </span></span>
<span class="line"><span>                    loss=tf.keras.losses.sparse_categorical_crossentropy,</span></span>
<span class="line"><span>                    metrics=[&#39;accuracy&#39;])</span></span>
<span class="line"><span>      </span></span>
<span class="line"><span>      return model</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    #创建模型</span></span>
<span class="line"><span>    model = create_model()</span></span>
<span class="line"><span>    model.summary()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于checkpoints的模型保存" tabindex="-1"><a class="header-anchor" href="#基于checkpoints的模型保存"><span>基于checkpoints的模型保存</span></a></h2><h3 id="通过modelcheckpoint模块来自动保存数据" tabindex="-1"><a class="header-anchor" href="#通过modelcheckpoint模块来自动保存数据"><span>通过ModelCheckpoint模块来自动保存数据</span></a></h3><pre><code>#创建回调函数
cp_callback = tf.keras.callbacks.ModelCheckpoint(checkpoint_path, 
                                                 save_weights_only=True, #只保存权重
                                                 verbose=1)

model = create_model()

model.fit(train_images, train_labels,  epochs = 10, 
          validation_data = (test_images,test_labels),
          callbacks = [cp_callback])  #保存模型
</code></pre><p>通过load_weight读取权重</p><pre><code>#对全新没有训练的模型进行预测
model = create_model()
loss, acc = model.evaluate(test_images, test_labels)
print(&quot;Untrained model, accuracy: {:5.2f}%&quot;.format(100*acc)) #11.4%

#载入权重参数后的模型
model.load_weights(checkpoint_path)
loss,acc = model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #86.2
</code></pre><h3 id="手动保存权重" tabindex="-1"><a class="header-anchor" href="#手动保存权重"><span>手动保存权重</span></a></h3><pre><code>## 保存权重
model.save_weights(&#39;./checkpoints/my_checkpoint&#39;)

#恢复模型
model = create_model()
model.load_weights(&#39;./checkpoints/my_checkpoint&#39;)

loss,acc = model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #87.00%
</code></pre><h3 id="整个模型保存" tabindex="-1"><a class="header-anchor" href="#整个模型保存"><span>整个模型保存</span></a></h3><p>基于keras的HD5文件保存整个模型所有参数，优化器参数等。</p><pre><code>#将整个模型保存为HDF5文件
model = create_model()
model.fit(train_images, train_labels, epochs=5)
model.save(&#39;my_model.h5&#39;)
#载入一个相同的模型
new_model = keras.models.load_model(&#39;my_model.h5&#39;)
new_model.summary()
loss, acc = new_model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #86.30%
</code></pre><h2 id="总体代码" tabindex="-1"><a class="header-anchor" href="#总体代码"><span>总体代码</span></a></h2><pre><code>from __future__ import absolute_import, division, print_function

import os

import tensorflow as tf
from tensorflow import keras

tf.__version__

(train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.mnist.load_data()

train_labels = train_labels[:1000]
test_labels = test_labels[:1000]

train_images = train_images[:1000].reshape(-1, 28 * 28) / 255.0
test_images = test_images[:1000].reshape(-1, 28 * 28) / 255.0

## 模型创建模型
def create_model():
  model = tf.keras.models.Sequential([
    keras.layers.Dense(512, activation=tf.nn.relu, input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation=tf.nn.softmax)
  ])
  
  model.compile(optimizer=tf.keras.optimizers.Adam(), 
                loss=tf.keras.losses.sparse_categorical_crossentropy,
                metrics=[&#39;accuracy&#39;])
  
  return model

#创建模型
model = create_model()
model.summary()

checkpoint_path = &quot;training_1/cp.ckpt&quot;
checkpoint_dir = os.path.dirname(checkpoint_path)
&#39;&#39;&#39;
#创建回调函数
cp_callback = tf.keras.callbacks.ModelCheckpoint(checkpoint_path, 
                                                 save_weights_only=True, #只保存权重
                                                 verbose=1)

model = create_model()

model.fit(train_images, train_labels,  epochs = 10, 
          validation_data = (test_images,test_labels),
          callbacks = [cp_callback])  #保存模型

#对全新没有训练的模型进行预测
model = create_model()
loss, acc = model.evaluate(test_images, test_labels)
print(&quot;Untrained model, accuracy: {:5.2f}%&quot;.format(100*acc)) #11.4%

#载入权重参数后的模型
model.load_weights(checkpoint_path)
loss,acc = model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #86.2


## 保存权重
model.save_weights(&#39;./checkpoints/my_checkpoint&#39;)

#恢复模型
model = create_model()
model.load_weights(&#39;./checkpoints/my_checkpoint&#39;)

loss,acc = model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #87.00%
&#39;&#39;&#39;
#将整个模型保存为HDF5文件
model = create_model()
model.fit(train_images, train_labels, epochs=5)
model.save(&#39;my_model.h5&#39;)
#载入一个相同的模型
new_model = keras.models.load_model(&#39;my_model.h5&#39;)
new_model.summary()
loss, acc = new_model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #86.30%
</code></pre>`,19)]))}const p=a(t,[["render",i],["__file","2018-07-18-_深度学习_ tf.keras入门5-模型保存和载入.html.vue"]]),c=JSON.parse('{"path":"/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-18-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A85-%E6%A8%A1%E5%9E%8B%E4%BF%9D%E5%AD%98%E5%92%8C%E8%BD%BD%E5%85%A5.html","title":"[深度学习] tf.keras入门5-模型保存和载入","lang":"zh-CN","frontmatter":{"date":"2018-07-18T14:10:41.000Z","category":["深度学习"],"tag":["深度学习"],"description":"[深度学习] tf.keras入门5-模型保存和载入 模型可以在训练中或者训练完成后保存。具体文档参考： https://tensorflow.google.cn/tutorials/keras/save_and_restore_models 设置 依赖项设置： !pip install -q h5py pyyaml 模型建立： 基于checkpoin...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-18-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A85-%E6%A8%A1%E5%9E%8B%E4%BF%9D%E5%AD%98%E5%92%8C%E8%BD%BD%E5%85%A5.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[深度学习] tf.keras入门5-模型保存和载入"}],["meta",{"property":"og:description","content":"[深度学习] tf.keras入门5-模型保存和载入 模型可以在训练中或者训练完成后保存。具体文档参考： https://tensorflow.google.cn/tutorials/keras/save_and_restore_models 设置 依赖项设置： !pip install -q h5py pyyaml 模型建立： 基于checkpoin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2018-07-18T14:10:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[深度学习] tf.keras入门5-模型保存和载入\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-07-18T14:10:41.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"设置","slug":"设置","link":"#设置","children":[]},{"level":2,"title":"基于checkpoints的模型保存","slug":"基于checkpoints的模型保存","link":"#基于checkpoints的模型保存","children":[{"level":3,"title":"通过ModelCheckpoint模块来自动保存数据","slug":"通过modelcheckpoint模块来自动保存数据","link":"#通过modelcheckpoint模块来自动保存数据","children":[]},{"level":3,"title":"手动保存权重","slug":"手动保存权重","link":"#手动保存权重","children":[]},{"level":3,"title":"整个模型保存","slug":"整个模型保存","link":"#整个模型保存","children":[]}]},{"level":2,"title":"总体代码","slug":"总体代码","link":"#总体代码","children":[]}],"git":{},"readingTime":{"minutes":2.15,"words":644},"filePathRelative":"blog/深度学习/深度学习笔记/2018-07-18-[深度学习] tf.keras入门5-模型保存和载入.md","localizedDate":"2018年7月18日","excerpt":"\\n<p>模型可以在训练中或者训练完成后保存。具体文档参考： <a href=\\"https://tensorflow.google.cn/tutorials/keras/save_and_restore_models\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://tensorflow.google.cn/tutorials/keras/save_and_restore_models</a></p>\\n<h2>设置</h2>\\n<p>依赖项设置：</p>\\n<blockquote>\\n<p>!pip install -q h5py pyyaml</p>\\n</blockquote>","autoDesc":true}');export{p as comp,c as data};
