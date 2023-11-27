import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as i,a as e,b as a,d as t,e as s}from"./app-MsA2k2kn.js";const d={},c=e("h1",{id:"深度学习-tf-keras入门1-基本函数介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#深度学习-tf-keras入门1-基本函数介绍","aria-hidden":"true"},"#"),a(" [深度学习] tf.keras入门1-基本函数介绍")],-1),h=e("p",null,"目前keras API 已经整合到 tensorflow最新版本1.9.0 中，在tensorflow中通过tf.keras就可以调用keras。",-1),p=e("pre",null,[e("code",null,`import tensorflow as tf
from tensorflow import keras
`)],-1),_={href:"https://tensorflow.google.cn/guide/keras",target:"_blank",rel:"noopener noreferrer"},f=s(`<p>tf.keras可以调用所有的keras编译代码，但是有两个限制：</p><ol><li>版本问题，需要通过tf.keras.version确认版本。</li><li>模型保存问题，tf.keras默认使用 checkpoint format格式，而keras模型的保存格式HDF5需要借用函数save_format=&#39;h5&#39;</li></ol><h2 id="构建一个简单的模型" tabindex="-1"><a class="header-anchor" href="#构建一个简单的模型" aria-hidden="true">#</a> 构建一个简单的模型</h2><h3 id="序贯-sequential-模型" tabindex="-1"><a class="header-anchor" href="#序贯-sequential-模型" aria-hidden="true">#</a> 序贯（Sequential）模型</h3><p>序贯模型就是是多个网络层的线性堆叠，比如多层感知机，BP神经网络。</p><p>tf.keras构建一个简单的全连通网络(即多层感知器)代码如下:</p><pre><code>#建立序贯模型
model = keras.Sequential()
#添加全连接层，节点数为64，激活函数为relu函数，dense表示标准的一维全连接层
model.add(keras.layers.Dense(64, activation=&#39;relu&#39;))
#添加全连接层，节点数为64，激活函数为relu函数
model.add(keras.layers.Dense(64, activation=&#39;relu&#39;))
#添加输出层，输出节点数为10
model.add(keras.layers.Dense(10, activation=&#39;softmax&#39;))
</code></pre>`,7),m={href:"http://keras-cn.readthedocs.io/en/latest/other/activations/",target:"_blank",rel:"noopener noreferrer"},u=s(`<h3 id="网络层的构造" tabindex="-1"><a class="header-anchor" href="#网络层的构造" aria-hidden="true">#</a> 网络层的构造</h3><p>通常在tf.keras中，网络层的构造参数主要有以下几个：</p><ol><li>激活函数activation function，默认是没有激活函数的。</li><li>参数初始化，默认通过正态分布初始化（Glorot uniform）</li><li>参数正则化，包括权值初始化和偏置的初始化。</li></ol><pre><code>#参数调整
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
</code></pre><h2 id="模型训练和参数评价" tabindex="-1"><a class="header-anchor" href="#模型训练和参数评价" aria-hidden="true">#</a> 模型训练和参数评价</h2><h3 id="模型训练" tabindex="-1"><a class="header-anchor" href="#模型训练" aria-hidden="true">#</a> 模型训练</h3><p>模型建立后，通过compile模块确定模型的训练参数（tf.keras.Model.compile）</p><p>tf.keras.Model.compile有三个主要参数：</p>`,8),k={href:"http://keras-cn.readthedocs.io/en/latest/other/optimizers/",target:"_blank",rel:"noopener noreferrer"},b={href:"http://keras-cn.readthedocs.io/en/latest/other/objectives/",target:"_blank",rel:"noopener noreferrer"},g={href:"http://keras-cn.readthedocs.io/en/latest/other/metrics/",target:"_blank",rel:"noopener noreferrer"},y=e("p",null,"具体例子如下：",-1),x=e("pre",null,[e("code",null,`## 配置均方误差回归模型
model.compile(optimizer=tf.train.AdamOptimizer(0.01),
              loss='mse',       ## 均方差
              metrics=['mae'])  ## 平均绝对误差

## 配置分类模型
model.compile(optimizer=tf.train.RMSPropOptimizer(0.01),
              loss=keras.losses.categorical_crossentropy, #多类的对数损失
              metrics=[keras.metrics.categorical_accuracy]) #多分类问题，所有预测值上的平均正确率
`)],-1),v=e("h3",{id:"模型的训练",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#模型的训练","aria-hidden":"true"},"#"),a(" 模型的训练")],-1),z=e("p",null,"对于小数据集,使用numpy数组，通过tf.keras.Model.fit模块来训练和评估模型。",-1),M=e("pre",null,[e("code",null,`import numpy as np
#输入数据（1000，32）
data = np.random.random((1000, 32))
#输入标签（1000，10）
labels = np.random.random((1000, 10))
#模型训练
model.fit(data, labels, epochs=10, batch_size=32)
`)],-1),D=e("p",null,"tf.keras.Model.fit模块有三个重要的参数：",-1),w=e("li",null,"训练轮数epochs：epochs指的就是训练过程中数据将被训练多少轮，一个epoch指的是当一个完整的数据集通过了神经网络一次并且返回了一次。",-1),S={href:"http://keras-cn.readthedocs.io/en/latest/for_beginners/concepts/#epochs",target:"_blank",rel:"noopener noreferrer"},j=e("li",null,"验证集validation_data：通常一个模型训练，评估要有训练集，验证集和测试集。验证集就是模型调参时用来评估模型的数据集。",-1),q=e("h3",{id:"tf-data的数据集",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#tf-data的数据集","aria-hidden":"true"},"#"),a(" tf.data的数据集")],-1),L={href:"https://tensorflow.google.cn/guide/datasets",target:"_blank",rel:"noopener noreferrer"},B=s(`<pre><code>## 数据实例化
dataset = tf.data.Dataset.from_tensor_slices((data, labels))
dataset = dataset.batch(32)
dataset = dataset.repeat()

#模型训练，steps_per_epoch表示每次训练的数据大小类似与batch_size
model.fit(dataset, epochs=10, steps_per_epoch=30)
</code></pre><h3 id="模型评估和预测" tabindex="-1"><a class="header-anchor" href="#模型评估和预测" aria-hidden="true">#</a> 模型评估和预测</h3><p>通过 tf.keras.Model.evaluate 和tf.keras.Model.predict可以实现模型的评估和预测。</p><pre><code>model.evaluate(x, y, batch_size=32)
model.evaluate(dataset, steps=30)

model.predict(x, batch_size=32)
model.predict(dataset, steps=30)
</code></pre><h2 id="基本模型的建立" tabindex="-1"><a class="header-anchor" href="#基本模型的建立" aria-hidden="true">#</a> 基本模型的建立</h2><h3 id="网络层模型" tabindex="-1"><a class="header-anchor" href="#网络层模型" aria-hidden="true">#</a> 网络层模型</h3><p>通过f.keras.Sequential 可以实现各种的复杂模型，如：</p><ol><li>多输入模型；</li><li>多输出模型；</li><li>参数共享层模型；</li><li>残差网络模型。</li></ol><p>具体例子如下：</p><pre><code>#输入参数
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
</code></pre><h3 id="模型子类函数构建" tabindex="-1"><a class="header-anchor" href="#模型子类函数构建" aria-hidden="true">#</a> 模型子类函数构建</h3><p>通常通过tf.keras.Model构建模型结构， __init__方法初始化模型，call方法进行参数传递。如下所示：</p><pre><code>class MyModel(keras.Model):
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
</code></pre><h3 id="回调函数callbacks" tabindex="-1"><a class="header-anchor" href="#回调函数callbacks" aria-hidden="true">#</a> 回调函数Callbacks</h3>`,14),N={href:"http://keras-cn.readthedocs.io/en/latest/other/callbacks/",target:"_blank",rel:"noopener noreferrer"},O=s(`<ol><li>tf.keras.callbacks.ModelCheckpoint：模型保存</li><li>tf.keras.callbacks.LearningRateScheduler：学习率调整</li><li>tf.keras.callbacks.EarlyStopping：中断训练</li><li>tf.keras.callbacks.TensorBoard：tensorboard的使用</li></ol><h2 id="模型保存和载入" tabindex="-1"><a class="header-anchor" href="#模型保存和载入" aria-hidden="true">#</a> 模型保存和载入</h2><p>tf.keras有两种模型保存方式</p><h3 id="网络参数保存weights-only" tabindex="-1"><a class="header-anchor" href="#网络参数保存weights-only" aria-hidden="true">#</a> 网络参数保存Weights only</h3><pre><code>#模型保存为tensorflow默认格式
model.save_weights(&#39;./my_model&#39;)

#载入模型
model.load_weights(&#39;my_model&#39;)

#模型保存为keras默认格式,包含其他优化参数
model.save_weights(&#39;my_model.h5&#39;, save_format=&#39;h5&#39;)

#载入模型
model.load_weights(&#39;my_model.h5&#39;)
</code></pre><h3 id="配置参数保存configuration-only" tabindex="-1"><a class="header-anchor" href="#配置参数保存configuration-only" aria-hidden="true">#</a> 配置参数保存Configuration only</h3><p>保存一个没有模型参数只有配置参数的模型， Keras支持 JSON和YAML序列化格式:</p><pre><code>## 模型保存
json_string = model.to_json()
yaml_string = model.to_yaml()
#模型载入
fresh_model = keras.models.from_json(json_string)
fresh_model = keras.models.from_yaml(yaml_string)
</code></pre><h3 id="完整模型保存" tabindex="-1"><a class="header-anchor" href="#完整模型保存" aria-hidden="true">#</a> 完整模型保存</h3><p>将原来模型所用信息进行保存：</p><pre><code>#模型建立
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
</code></pre>`,11);function P(C,E){const n=o("ExternalLinkIcon");return l(),i("div",null,[c,h,p,e("p",null,[a("官方教程为： "),e("a",_,[a(" https://tensorflow.google.cn/guide/keras "),t(n)])]),f,e("p",null,[a("其中激活函数详细信息见"),e("a",m,[a("keras官方文档"),t(n)])]),u,e("ol",null,[e("li",null,[a("优化器optimizer：通过tf.train模块调用优化器，可用的优化器类型见： "),e("a",k,[a(" http://keras-cn.readthedocs.io/en/latest/other/ptimizers/ "),t(n)])]),e("li",null,[a("损失函数loss：通过tf.keras.losses模块调用损失函数，可用的损失函数类型见： "),e("a",b,[a(" http://keras-cn.readthedocs.io/en/latest/other/objectives/ "),t(n)])]),e("li",null,[a("模型评估方法metrics：通过tf.keras.metrics调用评估参数，可用的模型评估方法见： "),e("a",g,[a(" http://keras-cn.readthedocs.io/en/latest/other/metrics/ "),t(n)])])]),y,x,v,z,M,D,e("ol",null,[w,e("li",null,[a("批训练大小batch_size：基本上现在的梯度下降都是基于mini-batch的，即将一个完整数据分为batch_size个批次进行训练。详见 "),e("a",S,[a(" http://keras-cn.readthedocs.io/en/latest/for_beginners/concepts/#epochs "),t(n)]),a(" 。")]),j]),q,e("p",null,[a("对于大型数据集，常常通过tf.data模块来调用数据,详见 "),e("a",L,[a(" https://tensorflow.google.cn/guide/datasets "),t(n)])]),B,e("p",null,[a("回调函数是一组在训练的特定阶段被调用的函数集，你可以使用回调函数来观察训练过程中网络内部的状态和统计信息。通过传递回调函数列表到模型fit()中，即可在给定的训练阶段调用该函数集中的函数。详见： "),e("a",N,[a(" http://keras-cn.readthedocs.io/en/latest/other/callbacks/ "),t(n)]),a(" 。主要回调函数有：")]),O])}const T=r(d,[["render",P],["__file","2018-07-17-_深度学习_ tf.keras入门1-基本函数介绍.html.vue"]]);export{T as default};
