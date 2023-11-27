import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as l,c as i,a as e,b as a,d as o,e as r}from"./app-MsA2k2kn.js";const c={},d=e("h1",{id:"深度学习-tf-keras入门5-模型保存和载入",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#深度学习-tf-keras入门5-模型保存和载入","aria-hidden":"true"},"#"),a(" [深度学习] tf.keras入门5-模型保存和载入")],-1),m={href:"https://tensorflow.google.cn/tutorials/keras/save_and_restore_models",target:"_blank",rel:"noopener noreferrer"},_=r(`<h2 id="设置" tabindex="-1"><a class="header-anchor" href="#设置" aria-hidden="true">#</a> 设置</h2><p>依赖项设置：</p><blockquote><p>!pip install -q h5py pyyaml</p></blockquote><p>模型建立：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    from __future__ import absolute_import, division, print_function
    
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于checkpoints的模型保存" tabindex="-1"><a class="header-anchor" href="#基于checkpoints的模型保存" aria-hidden="true">#</a> 基于checkpoints的模型保存</h2><h3 id="通过modelcheckpoint模块来自动保存数据" tabindex="-1"><a class="header-anchor" href="#通过modelcheckpoint模块来自动保存数据" aria-hidden="true">#</a> 通过ModelCheckpoint模块来自动保存数据</h3><pre><code>#创建回调函数
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
</code></pre><h3 id="手动保存权重" tabindex="-1"><a class="header-anchor" href="#手动保存权重" aria-hidden="true">#</a> 手动保存权重</h3><pre><code>## 保存权重
model.save_weights(&#39;./checkpoints/my_checkpoint&#39;)

#恢复模型
model = create_model()
model.load_weights(&#39;./checkpoints/my_checkpoint&#39;)

loss,acc = model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #87.00%
</code></pre><h3 id="整个模型保存" tabindex="-1"><a class="header-anchor" href="#整个模型保存" aria-hidden="true">#</a> 整个模型保存</h3><p>基于keras的HD5文件保存整个模型所有参数，优化器参数等。</p><pre><code>#将整个模型保存为HDF5文件
model = create_model()
model.fit(train_images, train_labels, epochs=5)
model.save(&#39;my_model.h5&#39;)
#载入一个相同的模型
new_model = keras.models.load_model(&#39;my_model.h5&#39;)
new_model.summary()
loss, acc = new_model.evaluate(test_images, test_labels)
print(&quot;Restored model, accuracy: {:5.2f}%&quot;.format(100*acc)) #86.30%
</code></pre><h2 id="总体代码" tabindex="-1"><a class="header-anchor" href="#总体代码" aria-hidden="true">#</a> 总体代码</h2><pre><code>from __future__ import absolute_import, division, print_function

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
</code></pre>`,17);function p(u,h){const n=t("ExternalLinkIcon");return l(),i("div",null,[d,e("p",null,[a("模型可以在训练中或者训练完成后保存。具体文档参考： "),e("a",m,[a("https://tensorflow.google.cn/tutorials/keras/save_and_restore_models"),o(n)])]),_])}const f=s(c,[["render",p],["__file","2018-07-18-_深度学习_ tf.keras入门5-模型保存和载入.html.vue"]]);export{f as default};
