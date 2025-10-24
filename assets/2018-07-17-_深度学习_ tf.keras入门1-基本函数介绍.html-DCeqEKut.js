import{_ as a,c as t,a as n,o as s}from"./app-HB0Nuzez.js";const r={};function l(o,e){return s(),t("div",null,e[0]||(e[0]=[n(`<h1 id="深度学习-tf-keras入门1-基本函数介绍" tabindex="-1"><a class="header-anchor" href="#深度学习-tf-keras入门1-基本函数介绍"><span>[深度学习] tf.keras入门1-基本函数介绍</span></a></h1><p>目前keras API 已经整合到 tensorflow最新版本1.9.0 中，在tensorflow中通过tf.keras就可以调用keras。</p><pre><code>import tensorflow as tf
from tensorflow import keras
</code></pre><p>官方教程为： <a href="https://tensorflow.google.cn/guide/keras" target="_blank" rel="noopener noreferrer"> https://tensorflow.google.cn/guide/keras </a></p><p>tf.keras可以调用所有的keras编译代码，但是有两个限制：</p><ol><li>版本问题，需要通过tf.keras.version确认版本。</li><li>模型保存问题，tf.keras默认使用 checkpoint format格式，而keras模型的保存格式HDF5需要借用函数save_format=&#39;h5&#39;</li></ol><h2 id="构建一个简单的模型" tabindex="-1"><a class="header-anchor" href="#构建一个简单的模型"><span>构建一个简单的模型</span></a></h2><h3 id="序贯-sequential-模型" tabindex="-1"><a class="header-anchor" href="#序贯-sequential-模型"><span>序贯（Sequential）模型</span></a></h3><p>序贯模型就是是多个网络层的线性堆叠，比如多层感知机，BP神经网络。</p><p>tf.keras构建一个简单的全连通网络(即多层感知器)代码如下:</p><pre><code>#建立序贯模型
model = keras.Sequential()
#添加全连接层，节点数为64，激活函数为relu函数，dense表示标准的一维全连接层
model.add(keras.layers.Dense(64, activation=&#39;relu&#39;))
#添加全连接层，节点数为64，激活函数为relu函数
model.add(keras.layers.Dense(64, activation=&#39;relu&#39;))
#添加输出层，输出节点数为10
model.add(keras.layers.Dense(10, activation=&#39;softmax&#39;))
</code></pre><p>其中激活函数详细信息见<a href="http://keras-cn.readthedocs.io/en/latest/other/activations/" target="_blank" rel="noopener noreferrer">keras官方文档</a></p><h3 id="网络层的构造" tabindex="-1"><a class="header-anchor" href="#网络层的构造"><span>网络层的构造</span></a></h3><p>通常在tf.keras中，网络层的构造参数主要有以下几个：</p><ol><li>激活函数activation function，默认是没有激活函数的。</li><li>参数初始化，默认通过正态分布初始化（Glorot uniform）</li><li>参数正则化，包括权值初始化和偏置的初始化。</li></ol><pre><code>#参数调整
#建立一个sigmoid层
layers.Dense(64, activation=&#39;sigmoid&#39;)
#或者
layers.Dense(64, activation=tf.sigmoid)

#权重L1正则化
layers.Dense(64, kernel_regularizer=keras.regularizers.l1(0.01))
#偏置L2正则化
layers.Dense(64, bias_regularizer=keras.regularizers.l2(0.01))

#权重正交矩阵的随机数初始化
layers.Dense(64, kernel_initializer=&#39;orthogonal&#39;)
#偏置常数初始化
layers.Dense(64, bias_initializer=keras.initializers.constant(2.0))
</code></pre><h2 id="模型训练和参数评价" tabindex="-1"><a class="header-anchor" href="#模型训练和参数评价"><span>模型训练和参数评价</span></a></h2><h3 id="模型训练" tabindex="-1"><a class="header-anchor" href="#模型训练"><span>模型训练</span></a></h3><p>模型建立后，通过compile模块确定模型的训练参数（tf.keras.Model.compile）</p><p>tf.keras.Model.compile有三个主要参数：</p><ol><li>优化器optimizer：通过tf.train模块调用优化器，可用的优化器类型见： <a href="http://keras-cn.readthedocs.io/en/latest/other/optimizers/" target="_blank" rel="noopener noreferrer"> http://keras-cn.readthedocs.io/en/latest/other/ptimizers/ </a></li><li>损失函数loss：通过tf.keras.losses模块调用损失函数，可用的损失函数类型见： <a href="http://keras-cn.readthedocs.io/en/latest/other/objectives/" target="_blank" rel="noopener noreferrer"> http://keras-cn.readthedocs.io/en/latest/other/objectives/ </a></li><li>模型评估方法metrics：通过tf.keras.metrics调用评估参数，可用的模型评估方法见： <a href="http://keras-cn.readthedocs.io/en/latest/other/metrics/" target="_blank" rel="noopener noreferrer"> http://keras-cn.readthedocs.io/en/latest/other/metrics/ </a></li></ol><p>具体例子如下：</p><pre><code>## 配置均方误差回归模型
model.compile(optimizer=tf.train.AdamOptimizer(0.01),
              loss=&#39;mse&#39;,       ## 均方差
              metrics=[&#39;mae&#39;])  ## 平均绝对误差

## 配置分类模型
model.compile(optimizer=tf.train.RMSPropOptimizer(0.01),
              loss=keras.losses.categorical_crossentropy, #多类的对数损失
              metrics=[keras.metrics.categorical_accuracy]) #多分类问题，所有预测值上的平均正确率
</code></pre><h3 id="模型的训练" tabindex="-1"><a class="header-anchor" href="#模型的训练"><span>模型的训练</span></a></h3><p>对于小数据集,使用numpy数组，通过tf.keras.Model.fit模块来训练和评估模型。</p><pre><code>import numpy as np
#输入数据（1000，32）
data = np.random.random((1000, 32))
#输入标签（1000，10）
labels = np.random.random((1000, 10))
#模型训练
model.fit(data, labels, epochs=10, batch_size=32)
</code></pre><p>tf.keras.Model.fit模块有三个重要的参数：</p><ol><li>训练轮数epochs：epochs指的就是训练过程中数据将被训练多少轮，一个epoch指的是当一个完整的数据集通过了神经网络一次并且返回了一次。</li><li>批训练大小batch_size：基本上现在的梯度下降都是基于mini-batch的，即将一个完整数据分为batch_size个批次进行训练。详见 <a href="http://keras-cn.readthedocs.io/en/latest/for_beginners/concepts/#epochs" target="_blank" rel="noopener noreferrer"> http://keras-cn.readthedocs.io/en/latest/for_beginners/concepts/#epochs </a> 。</li><li>验证集validation_data：通常一个模型训练，评估要有训练集，验证集和测试集。验证集就是模型调参时用来评估模型的数据集。</li></ol><h3 id="tf-data的数据集" tabindex="-1"><a class="header-anchor" href="#tf-data的数据集"><span>tf.data的数据集</span></a></h3><p>对于大型数据集，常常通过tf.data模块来调用数据,详见 <a href="https://tensorflow.google.cn/guide/datasets" target="_blank" rel="noopener noreferrer"> https://tensorflow.google.cn/guide/datasets </a></p><pre><code>## 数据实例化
dataset = tf.data.Dataset.from_tensor_slices((data, labels))
dataset = dataset.batch(32)
dataset = dataset.repeat()

#模型训练，steps_per_epoch表示每次训练的数据大小类似与batch_size
model.fit(dataset, epochs=10, steps_per_epoch=30)
</code></pre><h3 id="模型评估和预测" tabindex="-1"><a class="header-anchor" href="#模型评估和预测"><span>模型评估和预测</span></a></h3><p>通过 tf.keras.Model.evaluate 和tf.keras.Model.predict可以实现模型的评估和预测。</p><pre><code>model.evaluate(x, y, batch_size=32)
model.evaluate(dataset, steps=30)

model.predict(x, batch_size=32)
model.predict(dataset, steps=30)
</code></pre><h2 id="基本模型的建立" tabindex="-1"><a class="header-anchor" href="#基本模型的建立"><span>基本模型的建立</span></a></h2><h3 id="网络层模型" tabindex="-1"><a class="header-anchor" href="#网络层模型"><span>网络层模型</span></a></h3><p>通过f.keras.Sequential 可以实现各种的复杂模型，如：</p><ol><li>多输入模型；</li><li>多输出模型；</li><li>参数共享层模型；</li><li>残差网络模型。</li></ol><p>具体例子如下：</p><pre><code>#输入参数
inputs = keras.Input(shape=(32,))

#网络层的构建
x = keras.layers.Dense(64, activation=&#39;relu&#39;)(inputs)
x = keras.layers.Dense(64, activation=&#39;relu&#39;)(x)
#预测
predictions = keras.layers.Dense(10, activation=&#39;softmax&#39;)(x)

#模型实例化
model = keras.Model(inputs=inputs, outputs=predictions)

#模型构建
model.compile(optimizer=tf.train.RMSPropOptimizer(0.001),
              loss=&#39;categorical_crossentropy&#39;,
              metrics=[&#39;accuracy&#39;])

#模型训练
model.fit(data, labels, batch_size=32, epochs=5)
</code></pre><h3 id="模型子类函数构建" tabindex="-1"><a class="header-anchor" href="#模型子类函数构建"><span>模型子类函数构建</span></a></h3><p>通常通过tf.keras.Model构建模型结构， __init__方法初始化模型，call方法进行参数传递。如下所示：</p><pre><code>class MyModel(keras.Model):
  #模型结构确定
  def __init__(self, num_classes=10):
    super(MyModel, self).__init__(name=&#39;my_model&#39;)
    self.num_classes = num_classes
    #网络层的定义
    self.dense_1 = keras.layers.Dense(32, activation=&#39;relu&#39;)
    self.dense_2 = keras.layers.Dense(num_classes, activation=&#39;sigmoid&#39;)
  #参数调用
  def call(self, inputs):
    #前向传播过程确定
    x = self.dense_1(inputs)
    return self.dense_2(x)

  def compute_output_shape(self, input_shape):
    #输出参数确定
    shape = tf.TensorShape(input_shape).as_list()
    shape[-1] = self.num_classes
    return tf.TensorShape(shape)


#模型初始化
model = MyModel(num_classes=10)

#模型构建
model.compile(optimizer=tf.train.RMSPropOptimizer(0.001),
              loss=&#39;categorical_crossentropy&#39;,
              metrics=[&#39;accuracy&#39;])

#模型训练
model.fit(data, labels, batch_size=32, epochs=5)
</code></pre><h3 id="回调函数callbacks" tabindex="-1"><a class="header-anchor" href="#回调函数callbacks"><span>回调函数Callbacks</span></a></h3><p>回调函数是一组在训练的特定阶段被调用的函数集，你可以使用回调函数来观察训练过程中网络内部的状态和统计信息。通过传递回调函数列表到模型fit()中，即可在给定的训练阶段调用该函数集中的函数。详见： <a href="http://keras-cn.readthedocs.io/en/latest/other/callbacks/" target="_blank" rel="noopener noreferrer"> http://keras-cn.readthedocs.io/en/latest/other/callbacks/ </a> 。主要回调函数有：</p><ol><li>tf.keras.callbacks.ModelCheckpoint：模型保存</li><li>tf.keras.callbacks.LearningRateScheduler：学习率调整</li><li>tf.keras.callbacks.EarlyStopping：中断训练</li><li>tf.keras.callbacks.TensorBoard：tensorboard的使用</li></ol><h2 id="模型保存和载入" tabindex="-1"><a class="header-anchor" href="#模型保存和载入"><span>模型保存和载入</span></a></h2><p>tf.keras有两种模型保存方式</p><h3 id="网络参数保存weights-only" tabindex="-1"><a class="header-anchor" href="#网络参数保存weights-only"><span>网络参数保存Weights only</span></a></h3><pre><code>#模型保存为tensorflow默认格式
model.save_weights(&#39;./my_model&#39;)

#载入模型
model.load_weights(&#39;my_model&#39;)

#模型保存为keras默认格式,包含其他优化参数
model.save_weights(&#39;my_model.h5&#39;, save_format=&#39;h5&#39;)

#载入模型
model.load_weights(&#39;my_model.h5&#39;)
</code></pre><h3 id="配置参数保存configuration-only" tabindex="-1"><a class="header-anchor" href="#配置参数保存configuration-only"><span>配置参数保存Configuration only</span></a></h3><p>保存一个没有模型参数只有配置参数的模型， Keras支持 JSON和YAML序列化格式:</p><pre><code>## 模型保存
json_string = model.to_json()
yaml_string = model.to_yaml()
#模型载入
fresh_model = keras.models.from_json(json_string)
fresh_model = keras.models.from_yaml(yaml_string)
</code></pre><h3 id="完整模型保存" tabindex="-1"><a class="header-anchor" href="#完整模型保存"><span>完整模型保存</span></a></h3><p>将原来模型所用信息进行保存：</p><pre><code>#模型建立
model = keras.Sequential([
  keras.layers.Dense(10, activation=&#39;softmax&#39;, input_shape=(32,)),
  keras.layers.Dense(10, activation=&#39;softmax&#39;)
])
model.compile(optimizer=&#39;rmsprop&#39;,
              loss=&#39;categorical_crossentropy&#39;,
              metrics=[&#39;accuracy&#39;])
model.fit(data, targets, batch_size=32, epochs=5)


#保存为keras格式文件
model.save(&#39;my_model.h5&#39;)

## 模型载入
model = keras.models.load_model(&#39;my_model.h5&#39;)
</code></pre>`,56)]))}const c=a(r,[["render",l],["__file","2018-07-17-_深度学习_ tf.keras入门1-基本函数介绍.html.vue"]]),p=JSON.parse('{"path":"/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-17-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A81-%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0%E4%BB%8B%E7%BB%8D.html","title":"[深度学习] tf.keras入门1-基本函数介绍","lang":"zh-CN","frontmatter":{"date":"2018-07-17T19:33:48.000Z","category":["深度学习"],"tag":["深度学习"],"description":"[深度学习] tf.keras入门1-基本函数介绍 目前keras API 已经整合到 tensorflow最新版本1.9.0 中，在tensorflow中通过tf.keras就可以调用keras。 官方教程为： https://tensorflow.google.cn/guide/keras tf.keras可以调用所有的keras编译代码，但是有两...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/2018-07-17-_%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0_%20tf.keras%E5%85%A5%E9%97%A81-%E5%9F%BA%E6%9C%AC%E5%87%BD%E6%95%B0%E4%BB%8B%E7%BB%8D.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[深度学习] tf.keras入门1-基本函数介绍"}],["meta",{"property":"og:description","content":"[深度学习] tf.keras入门1-基本函数介绍 目前keras API 已经整合到 tensorflow最新版本1.9.0 中，在tensorflow中通过tf.keras就可以调用keras。 官方教程为： https://tensorflow.google.cn/guide/keras tf.keras可以调用所有的keras编译代码，但是有两..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:published_time","content":"2018-07-17T19:33:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[深度学习] tf.keras入门1-基本函数介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-07-17T19:33:48.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"构建一个简单的模型","slug":"构建一个简单的模型","link":"#构建一个简单的模型","children":[{"level":3,"title":"序贯（Sequential）模型","slug":"序贯-sequential-模型","link":"#序贯-sequential-模型","children":[]},{"level":3,"title":"网络层的构造","slug":"网络层的构造","link":"#网络层的构造","children":[]}]},{"level":2,"title":"模型训练和参数评价","slug":"模型训练和参数评价","link":"#模型训练和参数评价","children":[{"level":3,"title":"模型训练","slug":"模型训练","link":"#模型训练","children":[]},{"level":3,"title":"模型的训练","slug":"模型的训练","link":"#模型的训练","children":[]},{"level":3,"title":"tf.data的数据集","slug":"tf-data的数据集","link":"#tf-data的数据集","children":[]},{"level":3,"title":"模型评估和预测","slug":"模型评估和预测","link":"#模型评估和预测","children":[]}]},{"level":2,"title":"基本模型的建立","slug":"基本模型的建立","link":"#基本模型的建立","children":[{"level":3,"title":"网络层模型","slug":"网络层模型","link":"#网络层模型","children":[]},{"level":3,"title":"模型子类函数构建","slug":"模型子类函数构建","link":"#模型子类函数构建","children":[]},{"level":3,"title":"回调函数Callbacks","slug":"回调函数callbacks","link":"#回调函数callbacks","children":[]}]},{"level":2,"title":"模型保存和载入","slug":"模型保存和载入","link":"#模型保存和载入","children":[{"level":3,"title":"网络参数保存Weights only","slug":"网络参数保存weights-only","link":"#网络参数保存weights-only","children":[]},{"level":3,"title":"配置参数保存Configuration only","slug":"配置参数保存configuration-only","link":"#配置参数保存configuration-only","children":[]},{"level":3,"title":"完整模型保存","slug":"完整模型保存","link":"#完整模型保存","children":[]}]}],"git":{},"readingTime":{"minutes":5.4,"words":1620},"filePathRelative":"blog/深度学习/深度学习笔记/2018-07-17-[深度学习] tf.keras入门1-基本函数介绍.md","localizedDate":"2018年7月18日","excerpt":"\\n<p>目前keras API 已经整合到 tensorflow最新版本1.9.0 中，在tensorflow中通过tf.keras就可以调用keras。</p>\\n<pre><code>import tensorflow as tf\\nfrom tensorflow import keras\\n</code></pre>\\n<p>官方教程为： <a href=\\"https://tensorflow.google.cn/guide/keras\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> https://tensorflow.google.cn/guide/keras\\n</a></p>","autoDesc":true}');export{c as comp,p as data};
