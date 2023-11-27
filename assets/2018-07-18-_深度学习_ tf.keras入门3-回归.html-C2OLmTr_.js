import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as s,c as i,a as t,b as n,d as e,e as d}from"./app-MsA2k2kn.js";const l={},p=t("h1",{id:"深度学习-tf-keras入门3-回归",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#深度学习-tf-keras入门3-回归","aria-hidden":"true"},"#"),n(" [深度学习] tf.keras入门3-回归")],-1),_={href:"https://tensorflow.google.cn/tutorials/keras/basic_regression",target:"_blank",rel:"noopener noreferrer"},h=d(`<h2 id="波士顿房价数据集" tabindex="-1"><a class="header-anchor" href="#波士顿房价数据集" aria-hidden="true">#</a> 波士顿房价数据集</h2><h3 id="数据集" tabindex="-1"><a class="header-anchor" href="#数据集" aria-hidden="true">#</a> 数据集</h3><p>波士顿数据集是一个回归问题。每个类的观察值数量是均等的，共有 506 个观察，13 个输入变量和1个输出变量。每条数据包含房屋以及房屋周围的详细信息。其中包含城镇犯罪率，一氧化氮浓度，住宅平均房间数，到中心区域的加权距离以及自住房平均房价等等。</p><p>但是对于回归问题，需要读取数据后需要将数据集打散，代码如下：</p><pre><code>boston_housing = keras.datasets.boston_housing

(train_data, train_labels), (test_data, test_labels) = boston_housing.load_data()

#打散数据集
order = np.argsort(np.random.random(train_labels.shape))
train_data = train_data[order]
train_labels = train_labels[order]
</code></pre><p>数据集标签展示：</p><pre><code>import pandas as pd

column_names = [&#39;CRIM&#39;, &#39;ZN&#39;, &#39;INDUS&#39;, &#39;CHAS&#39;, &#39;NOX&#39;, &#39;RM&#39;, &#39;AGE&#39;, &#39;DIS&#39;, &#39;RAD&#39;,
                &#39;TAX&#39;, &#39;PTRATIO&#39;, &#39;B&#39;, &#39;LSTAT&#39;]

df = pd.DataFrame(train_data, columns=column_names)
df.head()
</code></pre><table><thead><tr><th>编号</th><th>CRIM</th><th>ZN</th><th>INDUS</th><th>CHAS</th><th>NOX</th><th>RM</th><th>AGE</th><th>DIS</th><th>RAD</th><th>TAX</th><th>PTRATIO</th><th>B</th><th>LSTAT</th></tr></thead><tbody><tr><td>0</td><td>0.07875</td><td>45.0</td><td>3.44</td><td>0.0</td><td>0.437</td><td>6.782</td><td>41.1</td><td>3.7886</td><td>5.0</td><td>398.0</td><td>15.2</td><td>393.87</td><td>6.68</td></tr><tr><td>1</td><td>4.55587</td><td>0.0</td><td>18.1</td><td>0.0</td><td>0.718</td><td>3.561</td><td>87.9</td><td>1.6132</td><td>24.0</td><td>666.0</td><td>20.2</td><td>354.7</td><td>7.12</td></tr><tr><td>2</td><td>0.09604</td><td>40.0</td><td>6.41</td><td>0.0</td><td>0.447</td><td>6.854</td><td>42.8</td><td>4.2673</td><td>4.0</td><td>254.0</td><td>17.6</td><td>396.9</td><td>2.98</td></tr><tr><td>3</td><td>0.0187</td><td>85.0</td><td>4.15</td><td>0.0</td><td>0.429</td><td>6.516</td><td>27.7</td><td>8.5353</td><td>4.0</td><td>351.0</td><td>17.9</td><td>392.43</td><td>6.36</td></tr><tr><td>4</td><td>0.52693</td><td>0.0</td><td>6.2</td><td>0.0</td><td>0.504</td><td>8.725</td><td>83.0</td><td>2.8944</td><td>8.0</td><td>307.0</td><td>17.4</td><td>382.0</td><td>4.63</td></tr></tbody></table><h3 id="数据归一化" tabindex="-1"><a class="header-anchor" href="#数据归一化" aria-hidden="true">#</a> 数据归一化</h3><p>数据的标准化（normalization）是将数据按比例缩放，使之落入一个小的特定区间。在某些比较和评价的指标处理中经常会用到，去除数据的单位限制，将其转化为无量纲的纯数值，便于不同单位或量级的指标能够进行比较和加权。</p>`,10),c={href:"https://blog.csdn.net/pipisorry/article/details/52247379",target:"_blank",rel:"noopener noreferrer"},m=d(`<pre><code>#z-score 标准化
mean = train_data.mean(axis=0)
std = train_data.std(axis=0)
train_data = (train_data - mean) / std
test_data = (test_data - mean) / std
</code></pre><h2 id="模型训练和预测" tabindex="-1"><a class="header-anchor" href="#模型训练和预测" aria-hidden="true">#</a> 模型训练和预测</h2><h3 id="模型建立和训练" tabindex="-1"><a class="header-anchor" href="#模型建立和训练" aria-hidden="true">#</a> 模型建立和训练</h3><p>模型建立的通用模式为网络结构确定（网络层数，节点数，输入，输出）、模型训练参数确定（损失函数，优化器、评价标准)、模型训练（训练次数，批次大小）</p><pre><code>#z-score 标准化
mean = train_data.mean(axis=0)
std = train_data.std(axis=0)
train_data = (train_data - mean) / std
test_data = (test_data - mean) / std

#模型建立函数
def build_model():
  model = keras.Sequential([
    keras.layers.Dense(64, activation=tf.nn.relu, 
                       input_shape=(train_data.shape[1],)),
    keras.layers.Dense(64, activation=tf.nn.relu),
    keras.layers.Dense(1)
  ])

  optimizer = tf.train.RMSPropOptimizer(0.001)

  model.compile(loss=&#39;mse&#39;,
                optimizer=optimizer,
                metrics=[&#39;mae&#39;]) #平均绝对误差
  return model
#建立模型
model = build_model()
#模型结构显示
model.summary()
</code></pre><p>模型的训练代码如下:</p><pre><code>## 回调函数
class PrintDot(keras.callbacks.Callback):
  def on_epoch_end(self,epoch,logs):
    if epoch % 100 == 0: print(&#39;&#39;)
    print(&#39;.&#39;, end=&#39;&#39;)

EPOCHS = 500

#模型训练
history = model.fit(train_data, train_labels, epochs=EPOCHS,
                    validation_split=0.2, verbose=1, #verbose训练过程显示
                    callbacks=[PrintDot()]) #取测试集中的百分之20作为验证集
</code></pre><h3 id="模型预测" tabindex="-1"><a class="header-anchor" href="#模型预测" aria-hidden="true">#</a> 模型预测</h3><p>调用history函数可以实现训练过程的可视化</p><pre><code>#模型损失函数展示
def plot_history(history):
  plt.figure()
  plt.xlabel(&#39;Epoch&#39;)
  plt.ylabel(&#39;Mean Abs Error [1000$]&#39;)
  plt.plot(history.epoch, np.array(history.history[&#39;mean_absolute_error&#39;]), 
           label=&#39;Train Loss&#39;)
  plt.plot(history.epoch, np.array(history.history[&#39;val_mean_absolute_error&#39;]),
           label = &#39;Val loss&#39;)
  plt.legend()
  plt.ylim([0,5])

plot_history(history)
</code></pre><p>为了提前停止训练，可以通过设置回调函数EarlyStopping设置训练停止条件。</p><pre><code>#停止条件设置，即验证集损失连续20次训练没有变化，即停止训练
early_stop = keras.callbacks.EarlyStopping(monitor=&#39;val_loss&#39;, patience=20)

history = model.fit(train_data, train_labels, epochs=EPOCHS,
                    validation_split=0.2, verbose=0,
                    callbacks=[early_stop, PrintDot()])

plot_history(history)
</code></pre><p>模型预测代码如下：</p><pre><code>test_predictions = model.predict(test_data).flatten()

print(test_predictions)
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>总体代码如下：</p><pre><code>## TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

## 其他库
import numpy as np
import matplotlib.pyplot as plt
#查看版本
print(tf.__version__)
#1.9.0

boston_housing = keras.datasets.boston_housing

(train_data, train_labels), (test_data, test_labels) = boston_housing.load_data()

#打散数据集
order = np.argsort(np.random.random(train_labels.shape))
train_data = train_data[order]
train_labels = train_labels[order]

import pandas as pd

column_names = [&#39;CRIM&#39;, &#39;ZN&#39;, &#39;INDUS&#39;, &#39;CHAS&#39;, &#39;NOX&#39;, &#39;RM&#39;, &#39;AGE&#39;, &#39;DIS&#39;, &#39;RAD&#39;,
                &#39;TAX&#39;, &#39;PTRATIO&#39;, &#39;B&#39;, &#39;LSTAT&#39;]

df = pd.DataFrame(train_data, columns=column_names)
df.head()


#z-score 标准化
mean = train_data.mean(axis=0)
std = train_data.std(axis=0)
train_data = (train_data - mean) / std
test_data = (test_data - mean) / std

#模型建立函数
def build_model():
  model = keras.Sequential([
    keras.layers.Dense(64, activation=tf.nn.relu, 
                       input_shape=(train_data.shape[1],)),
    keras.layers.Dense(64, activation=tf.nn.relu),
    keras.layers.Dense(1)
  ])

  optimizer = tf.train.RMSPropOptimizer(0.001)

  model.compile(loss=&#39;mse&#39;,
                optimizer=optimizer,
                metrics=[&#39;mae&#39;]) #平均绝对误差
  return model
#建立模型
model = build_model()
#模型结构显示
model.summary()

## 回调函数
class PrintDot(keras.callbacks.Callback):
  def on_epoch_end(self,epoch,logs):
    if epoch % 100 == 0: print(&#39;&#39;)
    print(&#39;.&#39;, end=&#39;&#39;)

EPOCHS = 500

#模型训练
history = model.fit(train_data, train_labels, epochs=EPOCHS,
                    validation_split=0.2, verbose=1, #verbose训练过程显示
                    callbacks=[PrintDot()]) #取测试集中的百分之20作为验证集

#模型损失函数展示
def plot_history(history):
  plt.figure()
  plt.xlabel(&#39;Epoch&#39;)
  plt.ylabel(&#39;Mean Abs Error [1000$]&#39;)
  plt.plot(history.epoch, np.array(history.history[&#39;mean_absolute_error&#39;]), 
           label=&#39;Train Loss&#39;)
  plt.plot(history.epoch, np.array(history.history[&#39;val_mean_absolute_error&#39;]),
           label = &#39;Val loss&#39;)
  plt.legend()
  plt.ylim([0,5])

plot_history(history)


model = build_model()

#停止条件设置，即验证集损失连续20次训练没有变化，即停止训练
early_stop = keras.callbacks.EarlyStopping(monitor=&#39;val_loss&#39;, patience=20)

history = model.fit(train_data, train_labels, epochs=EPOCHS,
                    validation_split=0.2, verbose=0,
                    callbacks=[early_stop, PrintDot()])

plot_history(history)

test_predictions = model.predict(test_data).flatten()

print(test_predictions)
</code></pre><p>对于回归问题的官方总结：</p><ul><li>均方误差(MSE)是一种常见的用于回归问题损失函数。</li><li>平均绝对误差(MAE)也是一种常用评价指标而不是精度。</li><li>对于输入数据，归一化是十分必要的。</li><li>训练数据较少，则模型结构较小更合适，防止过拟合。</li><li>提前停止是防止过拟合的好办法。</li></ul>`,19);function b(f,y){const a=o("ExternalLinkIcon");return s(),i("div",null,[p,t("p",null,[n("回归主要基于波士顿房价数据库进行建模，官方文档地址为： "),t("a",_,[n("https://tensorflow.google.cn/tutorials/keras/basic_regression"),e(a)])]),h,t("p",null,[n("具体见 "),t("a",c,[n(" https://blog.csdn.net/pipisorry/article/details/52247379 "),e(a)])]),m])}const g=r(l,[["render",b],["__file","2018-07-18-_深度学习_ tf.keras入门3-回归.html.vue"]]);export{g as default};
