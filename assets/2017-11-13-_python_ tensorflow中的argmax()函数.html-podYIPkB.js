import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as r,e as s}from"./app-MsA2k2kn.js";const n={},a=s(`<h1 id="python-tensorflow中的argmax-函数" tabindex="-1"><a class="header-anchor" href="#python-tensorflow中的argmax-函数" aria-hidden="true">#</a> [python] tensorflow中的argmax()函数</h1><p>首先 import tensorflow as tf</p><p>tf.argmax( tenso ,n) 函数会返回tensor中参数指定的维度中的最大值的索引或者向量。当tensor为矩阵返回向量，tensor为向量返回索引号。 其中n表示具体参数的维度。</p><p>以实际例子为说明：</p><pre><code>import tensorflow as tf  
import numpy as np  
test = [[1, 6, 7], [2, 5, 8], [3, 4, 9]]
with tf.Session() as sess:  
    print(sess.run(tf.argmax(test, 0)))  ＃输出：array([2, 0, 2]
    print(sess.run(tf.argmax(test, 1)))  ＃输出：array([2, 2, 2]
</code></pre><p>n=0代表列的比较，如下：</p><pre><code>    print(sess.run(tf.argmax(test, 0))) 指的是
    test[0] = array([1, 6, 7])
    test[1] = array([2, 5, 8])
    test[2] = array([3, 4, 9])
                   #[2, 0, 2]=(第一列test[0][1]最大，第二列test[2][1]最大，第三列test[2][2]最大)   			
</code></pre><p>n=1代表行的比较，如下：</p><pre><code>    print(sess.run(tf.argmax(test, 1))) 指的是
    test[0] = array([1, 6, 7]) #[2]=(第一行test[0][2]最大）
    test[1] = array([2, 5, 8]) #[2]=(第二行test[1][2]最大）
    test[2] = array([3, 4, 9]) #[2]=(第三行test[2][2]最大）	
</code></pre>`,9),o=[a];function p(_,c){return e(),r("div",null,o)}const m=t(n,[["render",p],["__file","2017-11-13-_python_ tensorflow中的argmax()函数.html.vue"]]);export{m as default};
