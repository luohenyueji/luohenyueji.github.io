import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as l,c as o,a as t,b as e,d as a,e as s}from"./app-MsA2k2kn.js";const d={},p=t("h1",{id:"深度学习-tf-keras入门2-分类",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#深度学习-tf-keras入门2-分类","aria-hidden":"true"},"#"),e(" [深度学习] tf.keras入门2-分类")],-1),c=t("p",null,"主要介绍基于tf.keras的Fashion MNIST数据库分类，",-1),_={href:"https://tensorflow.google.cn/tutorials/keras/basic_classification",target:"_blank",rel:"noopener noreferrer"},m={href:"https://tensorflow.google.cn/tutorials/keras/basic_text_classification",target:"_blank",rel:"noopener noreferrer"},h=s(`<p>首先是函数的调用，对于tensorflow只有在版本1.2以上的版本才有tf.keras库。另外推荐使用python3，而不是python2。</p><pre><code>## TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

## 其他库
import numpy as np
import matplotlib.pyplot as plt
#查看版本
print(tf.__version__)
#1.9.0
</code></pre><h2 id="fashion-mnist数据库" tabindex="-1"><a class="header-anchor" href="#fashion-mnist数据库" aria-hidden="true">#</a> Fashion MNIST数据库</h2><p>fashion mnist数据库是mnist数据库的一个拓展。目的是取代mnist数据库，类似MINST数据库，fashion mnist数据库为训练集60000张，测试集10000张的28X28大小的服装彩色图片。具体分类如下：</p><table><thead><tr><th>标注编号</th><th>描述</th></tr></thead><tbody><tr><td>0</td><td>T-shirt/top（T恤）</td></tr><tr><td>1</td><td>Trouser（裤子）</td></tr><tr><td>2</td><td>Pullover（套衫）</td></tr><tr><td>3</td><td>Dress（裙子）</td></tr><tr><td>4</td><td>Coat（外套）</td></tr><tr><td>5</td><td>Sandal（凉鞋）</td></tr><tr><td>6</td><td>Shirt（汗衫）</td></tr><tr><td>7</td><td>Sneaker（运动鞋）</td></tr><tr><td>8</td><td>Bag（包）</td></tr><tr><td>9</td><td>Ankle boot（踝靴）</td></tr></tbody></table><p>样本描述如下：</p>`,6),f=t("thead",null,[t("tr",null,[t("th",null,"名称"),t("th",null,"描述"),t("th",null,"样本数量"),t("th",null,"文件大小"),t("th",null,"链接")])],-1),u=t("td",null,[t("code",null,"train-images-idx3-ubyte.gz")],-1),g=t("td",null,"训练集的图像",-1),b=t("td",null,"60,000",-1),k=t("td",null,"26 MBytes",-1),x={href:"http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-images-idx3-ubyte.gz",target:"_blank",rel:"noopener noreferrer"},y=t("td",null,[t("code",null,"train-labels-idx1-ubyte.gz")],-1),w=t("td",null,"训练集的类别标签",-1),z=t("td",null,"60,000",-1),L=t("td",null,"29 KBytes",-1),T={href:"http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/train-labels-idx1-ubyte.gz",target:"_blank",rel:"noopener noreferrer"},v=t("td",null,[t("code",null,"t10k-images-idx3-ubyte.gz")],-1),S=t("td",null,"测试集的图像",-1),B=t("td",null,"10,000",-1),F=t("td",null,"4.3 MBytes",-1),M={href:"http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-images-idx3-ubyte.gz",target:"_blank",rel:"noopener noreferrer"},N=t("td",null,[t("code",null,"t10k-labels-idx1-ubyte.gz")],-1),X=t("td",null,"测试集的类别标签",-1),A=t("td",null,"10,000",-1),I=t("td",null,"5.1 KBytes",-1),C={href:"http://fashion-mnist.s3-website.eu-central-1.amazonaws.com/t10k-labels-idx1-ubyte.gz",target:"_blank",rel:"noopener noreferrer"},D=s(`<p>单张图像展示代码：</p><pre><code>#分类标签
class_names = [&#39;T-shirt/top&#39;, &#39;Trouser&#39;, &#39;Pullover&#39;, &#39;Dress&#39;, &#39;Coat&#39;, 
               &#39;Sandal&#39;, &#39;Shirt&#39;, &#39;Sneaker&#39;, &#39;Bag&#39;, &#39;Ankle boot&#39;]
#单张图像展示，推荐使用python3
plt.figure()
plt.imshow(train_images[0])
#添加颜色渐变条
plt.colorbar()
#不显示网格线
plt.gca().grid(False)
</code></pre><p>效果图：</p><figure><img src="https://img-blog.csdn.net/20180718085223560?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>样本的展示代码：</p><pre><code>#图像预处理
train_images = train_images / 255.0
test_images = test_images / 255.0

#样本展示
plt.figure(figsize=(10,10))
for i in range(25):
    plt.subplot(5,5,i+1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(&#39;off&#39;)
    plt.imshow(train_images[i], cmap=plt.cm.binary)
    plt.xlabel(class_names[train_labels[i]])
</code></pre><p>效果图：</p><figure><img src="https://img-blog.csdn.net/20180718085517884?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="分类模型的建立" tabindex="-1"><a class="header-anchor" href="#分类模型的建立" aria-hidden="true">#</a> 分类模型的建立</h2><p>检测模型输入数据为28X28，1个隐藏层节点数为128，输出类别10类，代码如下：</p><pre><code>#检测模型    
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation=tf.nn.relu),
    keras.layers.Dense(10, activation=tf.nn.softmax)
])    
</code></pre><p>模型训练参数设置：</p><pre><code>model.compile(optimizer=tf.train.AdamOptimizer(), 
          loss=&#39;sparse_categorical_crossentropy&#39;, #多分类的对数损失函数
          metrics=[&#39;accuracy&#39;]) #准确度
</code></pre><p>模型的训练：</p><pre><code>model.fit(train_images, train_labels, epochs=5)
</code></pre><h2 id="模型预测" tabindex="-1"><a class="header-anchor" href="#模型预测" aria-hidden="true">#</a> 模型预测</h2><p>预测函数：</p><pre><code>predictions = model.predict(test_images)
</code></pre><p>分类器是softmax分类器，输出的结果一个predictions是一个长度为10的数组，数组中每一个数字的值表示其所对应分类的概率值。如下所示：</p><pre><code>predictions[0]
array([2.1840347e-07, 1.9169457e-09, 4.5915922e-08, 5.3185740e-08,
       6.6372898e-08, 2.6090498e-04, 6.5197796e-06, 4.7861701e-03,
       2.9425648e-06, 9.9494308e-01], dtype=float32)
</code></pre><p>对于predictions[0]其中第10个值最大，则该值对应的分类为class[9]ankle boot。</p><pre><code>np.argmax(predictions[0]) #9
test_labels[0] #9
</code></pre><p>前25张图的分类效果展示：</p><pre><code>#前25张图分类效果
plt.figure(figsize=(10,10))
for i in range(25):
    plt.subplot(5,5,i+1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(&#39;off&#39;)
    plt.imshow(test_images[i], cmap=plt.cm.binary)
    predicted_label = np.argmax(predictions[i])
    true_label = test_labels[i]
    if predicted_label == true_label:
      color = &#39;green&#39;
    else:
      color = &#39;red&#39;
    plt.xlabel(&quot;{} ({})&quot;.format(class_names[predicted_label], 
                                  class_names[true_label]),
                                  color=color)
</code></pre><p>效果图，绿色标签表示分类正确，红色标签表示分类错误：</p><figure><img src="https://img-blog.csdn.net/20180718091104210?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,26),V={href:"https://www.zhihu.com/question/265545749",target:"_blank",rel:"noopener noreferrer"},q=t("pre",null,[t("code",null,`#格式转换
img = (np.expand_dims(img,0))
print(img.shape) #1X28X28

predictions = model.predict(img)
prediction = predictions[0]
np.argmax(prediction) #9
`)],-1),G=t("h2",{id:"总体代码",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#总体代码","aria-hidden":"true"},"#"),e(" 总体代码")],-1),H=t("pre",null,[t("code",null,`## TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

## 其他库
import numpy as np
import matplotlib.pyplot as plt
#查看版本
print(tf.__version__)
#1.9.0

fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

#分类标签
class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat', 
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']
#单张图像展示，推荐使用python3
plt.figure()
plt.imshow(train_images[0])
#添加颜色渐变条
plt.colorbar()
#不显示网格线
plt.gca().grid(False)

#图像预处理
train_images = train_images / 255.0
test_images = test_images / 255.0

#样本展示
plt.figure(figsize=(10,10))
for i in range(25):
    plt.subplot(5,5,i+1)
    plt.xticks([])
    plt.yticks([])
    plt.grid('off')
    plt.imshow(train_images[i], cmap=plt.cm.binary)
    plt.xlabel(class_names[train_labels[i]])

#检测模型    
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(128, activation=tf.nn.relu),
    keras.layers.Dense(10, activation=tf.nn.softmax)
])    

model.compile(optimizer=tf.train.AdamOptimizer(), 
          loss='sparse_categorical_crossentropy', #多分类的对数损失函数
          metrics=['accuracy']) #准确度

model.fit(train_images, train_labels, epochs=5)

predictions = model.predict(test_images)

#前25张图分类效果
plt.figure(figsize=(10,10))
for i in range(25):
    plt.subplot(5,5,i+1)
    plt.xticks([])
    plt.yticks([])
    plt.grid('off')
    plt.imshow(test_images[i], cmap=plt.cm.binary)
    predicted_label = np.argmax(predictions[i])
    true_label = test_labels[i]
    if predicted_label == true_label:
      color = 'green'
    else:
      color = 'red'
    plt.xlabel("{} ({})".format(class_names[predicted_label], 
                                  class_names[true_label]),
                                  color=color)
    
#单个图像检测
img = test_images[0]
print(img.shape) #28X28

#格式转换
img = (np.expand_dims(img,0))
print(img.shape) #1X28X28

predictions = model.predict(img)
prediction = predictions[0]
np.argmax(prediction) #9
`)],-1);function K(E,J){const n=r("ExternalLinkIcon");return l(),o("div",null,[p,c,t("p",null,[e("官方文档地址为： "),t("a",_,[e(" https://tensorflow.google.cn/tutorials/keras/basic_classification"),a(n)])]),t("p",null,[e("文本分类类似，官网文档地址为 "),t("a",m,[e("https://tensorflow.google.cn/tutorials/keras/basic_text_classification"),a(n)])]),h,t("table",null,[f,t("tbody",null,[t("tr",null,[u,g,b,k,t("td",null,[t("a",x,[e("下载"),a(n)])])]),t("tr",null,[y,w,z,L,t("td",null,[t("a",T,[e("下载"),a(n)])])]),t("tr",null,[v,S,B,F,t("td",null,[t("a",M,[e("下载"),a(n)])])]),t("tr",null,[N,X,A,I,t("td",null,[t("a",C,[e("下载"),a(n)])])])])]),D,t("p",null,[e("对于单个图像的预测，需要将图像28X28的输入转换为1X28X28的输入，转换函数为np.expand_dims。函数使用如下： "),t("a",V,[e(" https://www.zhihu.com/question/265545749 "),a(n)])]),q,G,H])}const R=i(d,[["render",K],["__file","2018-07-18-_深度学习_ tf.keras入门2-分类.html.vue"]]);export{R as default};
