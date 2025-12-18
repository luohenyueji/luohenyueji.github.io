import{_ as e,c as a,a as s,o as t}from"./app-B1QbUTkN.js";const i={};function r(o,n){return t(),a("div",null,n[0]||(n[0]=[s(`<h1 id="opencv实战-8-深度学习目标检测网络yolov3的训练" tabindex="-1"><a class="header-anchor" href="#opencv实战-8-深度学习目标检测网络yolov3的训练"><span>[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练</span></a></h1><p>YOLOv3是计算机视觉中最受欢迎的实时目标检测器之一。在这个循序渐进的教程中，我们从如何使用YOLOv3训练1类物体探测器的简单案例开始。本教程是以初学者为中心编写的。建立自己的雪人检测器。</p><p>在这篇文章中，我们将分享训练过程，有助于训练的脚本以及一些公开的雪人图像和视频。您可以使用相同的过程来训练具有多个对象的对象检测器。</p><p><strong>特别要注意的是，训练yolov3最好在linux下进行，同时所有涉及到输入路径的都最好使用绝对路径。</strong></p><h2 id="_1-数据集" tabindex="-1"><a class="header-anchor" href="#_1-数据集"><span><strong>1</strong> <strong>数据集</strong></span></a></h2><p>与任何深度学习任务一样，第一个最重要的任务是准备数据集。我们将使用Google的OpenImagesV4数据集中的雪人图像，这些图像可在线公开获取。它是一个非常大的数据集，包含大约600种不同的对象类。数据集还包含这些对象的边界框注释。总的来说，数据集超过500GB，但我们只会下载带有“雪人”对象的图像。</p><p>我们不拥有这些图像的版权，因此我们遵循共享源图像而不是图像文件本身的标准做法。OpenImages具有每个图像的原始URL和许可证信息。任何使用此数据（学术，非商业或商业）的风险均由您自行承担。</p><p>OpenImagesV4详细介绍：</p><p><a href="http://storage.googleapis.com/openimages/web/challenge.html" target="_blank" rel="noopener noreferrer"> http://storage.googleapis.com/openimages/web/challenge.html</a></p><p>然后你可以进入这个网站看看各种所有分类图像什么样子</p><p><a href="https://storage.googleapis.com/openimages/web/challenge_visualizer/index.html?set=detection&amp;c=%2Fm%2F04zwwv" target="_blank" rel="noopener noreferrer">https://storage.googleapis.com/openimages/web/challenge_visualizer/index.html?set=detection&amp;c=%2Fm%2F04zwwv</a></p><h3 id="_1-1-下载openimages-雪人数据-约1-5-小时" tabindex="-1"><a class="header-anchor" href="#_1-1-下载openimages-雪人数据-约1-5-小时"><span><strong>1.1</strong> <strong>下载openImages</strong> <strong>雪人数据[</strong> <strong>约1.5</strong> <strong>小时]</strong></span></a></h3><p>首先，我们需要安装awscli。必须用python3</p><pre><code>linux: sudo pip3 install awscli

windows: pip3 install awscli
</code></pre><p>然后我们需要得到相关的 openImages下载文件，类描述文件class-descriptions-boxable.csv和下载信息文件train- annotations-bbox.csv（1.11GB）。</p><p><a href="https://storage.googleapis.com/openimages/2018_04/class-descriptions-boxable.csv" target="_blank" rel="noopener noreferrer"> https://storage.googleapis.com/openimages/2018_04/class-descriptions-boxable.csv </a></p><p><a href="https://storage.googleapis.com/openimages/2018_04/train/train-annotations-bbox.csv" target="_blank" rel="noopener noreferrer"> https://storage.googleapis.com/openimages/2018_04/train/train-annotations-bbox.csv </a></p><p>接下来，将上述.csv文件移动到与下载的代码相同的文件夹，然后使用以下脚本下载数据。</p><p>Windows和linux下运行不一样，但是都有在python3环境下运行文件，且都需要在命令行调用。</p><p>图像将下载到JPEGImages文件夹中，相应的标签文件将写入标签文件夹label。下载将在539张图像上获得770个雪人实例。下载大约需要1.5小时，具体取决于互联网速度。JPEGImages和标签一起应小于136 MB。但是下载速度很慢。</p><p>对于多类对象检测器，您需要为每个类提供更多样本，您可能还需要获取test-annotations-bbox.csv和validation-annotations-bbox.csv文件，然后在python脚本中修改runMode并将其重新运行到为每个班级获得更多图像。但在我们目前的雪人案例中，770个案例就足够了。</p><p>runMode有train，validation，test三个数据集，每次只能下载一个数据</p><pre><code>runMode = &quot;train&quot;

#runMode = &quot;validation &quot;

#runMode = &quot;test&quot;
</code></pre><p>对于类别可以一次性下载多个类别数据，如下所示。其中类别名从上面可视网站查询，注意区分大小写。</p><pre><code>classes = [&quot;Snowman&quot;, &quot;Car&quot;]

#classes = [&quot;Snowman&quot;]
</code></pre><h3 id="_1-2-训练集测试集拆分" tabindex="-1"><a class="header-anchor" href="#_1-2-训练集测试集拆分"><span><strong>1.2</strong> <strong>训练集测试集拆分</strong></span></a></h3><p>任何机器学习训练过程都涉及首先将数据随机分成两组(三组)。</p><p>训练集：这是我们训练模型的数据的一部分。根据您拥有的数据量，您可以随机选择70％到90％的数据进行培训。</p><p>测试集：这是我们测试模型的数据的一部分。通常，这是数据的10-30％。没有图像同时为训练集和测试集的一部分。</p><p>我们将JPEGImages文件夹中的图像分割成训练集和测试集。您可以使用splitTrainAndTest.py脚本执行此操作，如下所示，将JPEGImages文件夹的完整路径作为参数传递。</p><h2 id="_2-darknet" tabindex="-1"><a class="header-anchor" href="#_2-darknet"><span><strong>2 Darknet</strong></span></a></h2><p>在本教程中，我们使用Darknet。这是一个用C语言编写的深度学习框架。</p><h3 id="_2-1-下载并构建darknet" tabindex="-1"><a class="header-anchor" href="#_2-1-下载并构建darknet"><span><strong>2.1</strong> <strong>下载并构建Darknet</strong></span></a></h3><p>我们首先在您的系统上下载并构建它。</p><pre><code>cd ~

git clone https://github.com/pjreddie/darknet

cd darknet

make
</code></pre><h3 id="_2-2-修改代码以定期保存模型文件" tabindex="-1"><a class="header-anchor" href="#_2-2-修改代码以定期保存模型文件"><span><strong>2.2</strong> <strong>修改代码以定期保存模型文件</strong></span></a></h3><p>在我们确保原始仓库在您的系统中编译之后，让我们进行一些小修改以存储中间权重。在文件examples / detector.c中，更改train_detector函数，大概在130行到140行之间。</p><p>将</p><pre><code>if(i%10000==0 || (i &lt; 1000 &amp;&amp; i%100 == 0))
</code></pre><p>改为</p><pre><code>if(i%1000==0 || (i &lt; 2000 &amp;&amp; i%200 == 0))
</code></pre><p>改动的意思是，原始训练过程在每100次训练后保存网络权重，直到前1000次。然后接下来仅在每10000次训练后才保存。在我们的例子中，由于我们只训练一个类，我们希望我们的训练收敛得更快。因此，为了密切监视进度，我们在每200次迭代后保存，直到达到2000，然后接下来在每1000次迭代后保存。完成上述更改后，再次使用make命令重新编译darknet。</p><h3 id="_2-3-数据注释" tabindex="-1"><a class="header-anchor" href="#_2-3-数据注释"><span><strong>2.3 数据注释</strong></span></a></h3><p>我们在labels文件夹中共享带有注释的标签文件。标签文件中的每个行条目表示图像中的单个边界框，并包含有关该框的以下信息：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;object-class-id&gt; &lt;center-x&gt; &lt;center-y&gt; &lt;width&gt; &lt;height&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>第一个字段object-class-id是表示类别的整数。范围从0到（类别总数-1）。在我们目前的情况下，由于我们只有一类雪人，因此总是设置object-class-id为0。</p><p>center-x和center-y分别是边界框中心的x和y坐标，除以图像宽度和高度后的结果。</p><p>width和height分别是边界框的宽度和高度，除以图像宽度和高度后的结果。</p><p>让我们考虑一个带有以下符号的示例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>x-边界框中心的x坐标（以像素为单位）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>y-边界框中心的y坐标（以像素为单位）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w-边界框的宽度（以像素为单位）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>h-边界框的高度（以像素为单位）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>W-整个图像的宽度（以像素为单位）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>H-整个图像的高度（以像素为单位）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们计算标签文件中的注释值，如下所示：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>center-x= x /W.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>center-y= y /H.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>width= w /W.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>height= h /H.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上四个变量取值范围都是0到1之间的浮点值。</p><h2 id="_3-模型训练" tabindex="-1"><a class="header-anchor" href="#_3-模型训练"><span><strong>3</strong> <strong>模型训练</strong></span></a></h2><h3 id="_3-1-下载预训练模型" tabindex="-1"><a class="header-anchor" href="#_3-1-下载预训练模型"><span><strong>3.1</strong> <strong>下载预训练模型</strong></span></a></h3><p>当训练自己的物体探测器时，最好利用在非常大的数据集上训练的模型进行微调，即使大型数据集可能不包含您要检测的对象。这个过程称为迁移学习。我们使用预先训练的模型，而不是从头开始学习，该模型包含在ImageNet上训练的卷积权重。使用这些权重作为起始权重，我们的网络可以更快地学习。我们现在将它下载到我们的darknet文件夹中。</p><p>微调模型下载地址：</p><p><a href="https://pjreddie.com/media/files/darknet53.conv.74" target="_blank" rel="noopener noreferrer"> https://pjreddie.com/media/files/darknet53.conv.74</a></p><h3 id="_3-2-数据文件" tabindex="-1"><a class="header-anchor" href="#_3-2-数据文件"><span><strong>3.2</strong> <strong>数据文件</strong></span></a></h3><p>在文件darknet.data中，我们需要提供有关对象检测器的规范和一些相关路径的信息。</p><pre><code>classes = 1

train  = /path/to/snowman/snowman_train.txt

valid  = /path/to/snowman/snowman_test.txt

names = /path/to/snowman/classes.names

backup = /path/to/snowman/weights/
</code></pre><p>您需要提供之前生成的文件snowman_train.txt和snowman_test.txt的绝对路径，这些文件分别包含用于训练（训练参数）和验证（有效参数）的文件列表。</p><p>该名称字段表示其中包含的所有类的名称的文件的路径。我们已经包含了classes.names文件，其中包含类名“snowman”。您需要设定绝对路径。最后，对于备份参数，我们需要提供现有目录的路径，在训练过程中存储中间权重文件。</p><h3 id="_3-3-配置训练参数" tabindex="-1"><a class="header-anchor" href="#_3-3-配置训练参数"><span>3.3 配置训练参数</span></a></h3><p>与darknet.data和classes.names文件一起，YOLOv3还需要配置文件darknet- yolov3.cfg。它也包含在我们的代码库中。它基于演示配置文件yolov3-voc.cfg，用于训练VOC数据集。所有重要的训练参数都存储在此配置文件中。</p><h4 id="_3-3-1-batch和subdivisions" tabindex="-1"><a class="header-anchor" href="#_3-3-1-batch和subdivisions"><span>3.3.1 batch和subdivisions</span></a></h4><pre><code>[net]

# Testing

# batch=1

# subdivisions=1

# Training

batch=64

subdivisions=16
</code></pre><p>通常训练数百万张图像并不罕见。训练过程涉及基于其在训练数据集上的loss来迭代地更新神经网络的权重。一次使用训练集中的所有图像来更新权重是不切实际的（也是不必要的）。因此，在一次迭代中使用一小部分图像，该子集称为批量大小。当批量大小设置为64时，这意味着在一次迭代中使用64个图像来更新神经网络的参数。</p><p>即使您可能希望使用批量大小batch=64来训练您的神经网络，您可能没有足够的内存使用批量大小为64的GPU。幸运的是，Darknet允许您指定一个名为subdivisions的变量，subdivisions是细分大小的意思。subdivision让您可以处理GPU中batch批量大小的一小部分。您可以使用subdivisions=1开始训练，如果出现内存不足错误，请将细分参数增加2的倍数（例如2,4,8,16），即每次batch/subdivisions张图像，在处理完所有batch个图像后才更新参数。在测试期间，批次和细分都设置为1。</p><h4 id="_3-3-2-width-height-channels" tabindex="-1"><a class="header-anchor" href="#_3-3-2-width-height-channels"><span><strong>3.3.2 Width, Height, Channels</strong></span></a></h4><p>这些配置参数指定输入图像大小和通道数。</p><pre><code>width=416

height=416

channels=3
</code></pre><p>在训练之前，首先将输入训练图像宽高。这里我们使用默认值416×416。如果我们将其增加到608×608，结果可能会有所改善，但是训练也需要更长的时间。channels=3表示我们将处理3通道RGB输入图像，即彩色图像。</p><h4 id="_3-3-3-momentum-and-decay" tabindex="-1"><a class="header-anchor" href="#_3-3-3-momentum-and-decay"><span><strong>3.3.3 Momentum and Decay</strong></span></a></h4><p>配置文件包含一些控制权重更新方式的参数。</p><pre><code>momentum=0.9

decay=0.0005
</code></pre><p>在上一节中，我们提到了如何基于一小批图像而不是整个数据集更新神经网络的权重。由于这个原因，权重更新波动很大。这就是为什么使用参数动量momentum来惩罚迭代之间的大的权重变化的原因。典型的神经网络具有数百万个权重，因此它们可以轻松地过度拟合任何训练数据。过度拟合意味着它将在训练数据和测试数据上做得很好。这几乎就像神经网络记住了训练集中所有图像的答案，但实际上并没有学到基本概念。缓解此问题的方法之一是加入惩罚权重。参数衰减decay控制此惩罚权重。默认值可以正常工作，但如果您注意到过度拟合，可能需要调整此值。用默认值就行了。</p><h4 id="_3-3-4-learning-rate-steps-scales-burn-in" tabindex="-1"><a class="header-anchor" href="#_3-3-4-learning-rate-steps-scales-burn-in"><span>3.3.4 Learning Rate, Steps, Scales, Burn In</span></a></h4><pre><code>learning_rate=0.001

policy=steps

steps=3800

scales=.1

burn_in=400
</code></pre><p>参数学习率learning_rate根据当前批量数据控制我们应该学习的积极程度。通常，这是0.01到0.0001之间的数字。</p><p>在训练过程刚刚开始时，学习率需要很高。但是多次训练后，权重改变就不那么大。换句话说，学习率需要随着时间的推移而降低。在配置文件中，通过首先指定我们的学习速率降低策略是步骤来实现学习速率的降低。在上面的例子中，学习率将从0.001开始并在steps =3800次迭代中保持不变，然后它将乘以比例scales以获得新的学习率。我们也可以指定多个步骤和比例。</p><p>在上一段中，我们提到学习率需要在开始时较高而在之后较低。虽然这种说法基本上是正确的，但根据经验发现，如果我们在一开始就在短时间内获得较低的学习率，那么需要加大学习率加速训练，这种情况在微调时非常常见。这由burn_in参数控制加速训练。默认为0，</p><p>burn_in=400表示，从训练开始到第400次训练，由以下公式训练：</p><pre><code>learning_rate * pow((float)batch_num / net.burn_in, net.power);
</code></pre><h4 id="_3-3-5-数据增强" tabindex="-1"><a class="header-anchor" href="#_3-3-5-数据增强"><span><strong>3.3.5</strong> <strong>数据增强</strong></span></a></h4><p>我们知道数据收集需要很长时间。对于这篇博文，我们首先必须收集很多张图像，然后手动创建每个图像周围的边界框。</p><p>我们希望通过编写新数据来最大限度地利用这些数据。此过程称为数据扩充。例如，旋转了的雪人的图像仍然是雪人的图像。配置文件中的角度参数允许您以±角度随机旋转给定图像。同样，如果我们使用饱和度，曝光和色调来变换整个图片的颜色，它仍然是雪人的图片。</p><pre><code>angle=0

saturation = 1.5

exposure = 1.5

hue=.1
</code></pre><p>我们使用默认值进行训练。</p><h4 id="_3-3-6-训练次数" tabindex="-1"><a class="header-anchor" href="#_3-3-6-训练次数"><span><strong>3.3.6</strong> <strong>训练次数</strong></span></a></h4><p>最后，我们需要指定训练过程应该运行多少次训练。</p><pre><code>max_batches=5200
</code></pre><p>对于多类对象检测器，max_batches数量更高，即我们需要运行更多批次（例如，在yolov3-voc.cfg中）。对于n类目标检测网络，建议至少运行2000n批次的训练。在我们只有1个类的情况下，3000似乎是max_batches的很合适数字。</p><h4 id="_3-3-7-类别数" tabindex="-1"><a class="header-anchor" href="#_3-3-7-类别数"><span>3.3.7 类别数</span></a></h4><p>需要修改类别数，即classes，不包括背景，本文只有一类，所以classes=1。在classes上方有filters修改，改为3 * (5+classes).</p><p>所用的classes都要改，与classes对应的filters也要改</p><pre><code>[convolutional]
size=1
stride=1
pad=1
# filters = (num/3) * (5+classes)
filters=18
activation=linear

[yolo]
mask = 6,7,8
anchors = 10,13,  16,30,  33,23,  30,61,  62,45,  59,119,  116,90,  156,198,  373,326
classes=1
num=9
jitter=.3
ignore_thresh = .5
truth_thresh = 1
random=1
</code></pre><h4 id="_3-3-8-其他参数" tabindex="-1"><a class="header-anchor" href="#_3-3-8-其他参数"><span><strong>3.3.8</strong> <strong>其他参数</strong></span></a></h4><p>通常训练时，只要配置以下上面的参数，最好用微调。如果想了解其他参数，见：</p><p><a href="https://blog.csdn.net/ll_master/article/details/81487844" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/ll_master/article/details/81487844</a></p><h3 id="_3-4-模型训练" tabindex="-1"><a class="header-anchor" href="#_3-4-模型训练"><span><strong>3.4</strong> <strong>模型训练</strong></span></a></h3><p>转到darknet目录并使用以下命令启动它：</p><p>文件配置如下，其中darknet下的snowman目录下的文件如下图所示，darknet53.conv.74我放在darknet目录下，</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练/1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>./darknet detector train /home/your/darknet/snowman/darknet.data</span></span>
<span class="line"><span>/home/your/darknet/snowman/darknet-yolov3.cfg darknet53.conv.74 2&gt;&amp;1|tee</span></span>
<span class="line"><span>/home/your/darknet/snowman/train.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确保为系统中的darknet.data和darknet- yolov3.cfg文件提供正确的路径。我们还将训练日志保存到数据集目录中名为train.log的文件中，以便我们可以随着训练的进行而减少损失。</p><p>在训练时监视丢失的一种有用方法是在train.log文件中使用grep命令</p><p>grep &quot;avg&quot; ./snowman/train.log</p><p>它显示批次编号，当前批次中的损失，当前批次的平均损失，当前学习率，批次所用的时间以及当前批次使用的图像。正如您在下面看到的那样，每个批次之前使用的图像数量增加了64。这是因为我们将批量大小设置为64。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练/2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练/3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>正如我们所看到的，第400批的学习率从0逐渐增加到0.001。这就是burn_in的作用。它会留在那里直到第1000次训练再次变为0.0001。</p><h3 id="_3-5-模型停止训练" tabindex="-1"><a class="header-anchor" href="#_3-5-模型停止训练"><span><strong>3.5</strong> <strong>模型停止训练</strong></span></a></h3><p>随着培训的进行，日志文件包含每批次中的损失loss。在损失达到某个阈值以下之后，可以停止训练。下面是针对我们的雪人目标检测器loss图。我们使用以下脚本生成绘图：</p><p>但实际的测试应该是使用学习的权重来查看mAP。原始的darknet代码没有计算mAP的代码。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练/4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>你可以在该网站下载带mAP计算功能的darknet改进版：</p><p><a href="https://github.com/AlexeyAB/darknet" target="_blank" rel="noopener noreferrer"> https://github.com/AlexeyAB/darknet </a></p><p>对于雪人目标检测器，我们在配置文件中只有5200次训练。所以你可能会让它一直运行到最后。我们最终训练的权重文件darknet- yolov3_final.weights的平均精确度（mAP）为70.37％。</p><h3 id="_3-6-模型测试" tabindex="-1"><a class="header-anchor" href="#_3-6-模型测试"><span><strong>3.6</strong> <strong>模型测试</strong></span></a></h3><p>除了loss和mAP之外，我们应该始终在新数据上测试我们的权重文件并直观地查看结果，以确保我们对结果感到满意。在之前的文章中，我们描述了如何使用OpenCV测试YOLOv3模型。我们已经包含了测试雪人目标检测器的代码。您需要为object_detection_yolo.py中的modelConfiguration和modelWeights文件提供正确的路径，并使用图像或视频进行测试以进行雪人检测。</p><p>YOLOv3使用：</p><p><a href="https://blog.csdn.net/LuohenYJ/article/details/88537253" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/LuohenYJ/article/details/88537253 </a></p><h2 id="_4-代码" tabindex="-1"><a class="header-anchor" href="#_4-代码"><span>4 代码</span></a></h2><p>代码地址：</p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p><a href="https://download.csdn.net/download/luohenyj/11025216" target="_blank" rel="noopener noreferrer"> https://download.csdn.net/download/luohenyj/11025216 </a></p><p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><p>OpenImage获取Python3代码：</p><p>linux:</p><pre><code>import csv
import subprocess
import os

runMode = &quot;train&quot;
classes = [&quot;Snowman&quot;]

with open(&#39;class-descriptions-boxable.csv&#39;, mode=&#39;r&#39;) as infile:
    reader = csv.reader(infile)
    dict_list = {rows[1]:rows[0] for rows in reader}

subprocess.run([&#39;rm&#39;, &#39;-rf&#39;, &#39;JPEGImages&#39;])
subprocess.run([ &#39;mkdir&#39;, &#39;JPEGImages&#39;])

subprocess.run([&#39;rm&#39;, &#39;-rf&#39;, &#39;labels&#39;])
subprocess.run([ &#39;mkdir&#39;, &#39;labels&#39;],)

for ind in range(0, len(classes)):
    
    className = classes[ind]
    print(&quot;Class &quot; + str(ind) + &quot; : &quot; + className)

    commandStr = &quot;grep &quot; + dict_list[className] + &quot; &quot; + runMode + &quot;-annotations-bbox.csv&quot;
    print(commandStr)
    class_annotations = subprocess.run(commandStr.split(), stdout=subprocess.PIPE).stdout.decode(&#39;utf-8&#39;)
    class_annotations = class_annotations.splitlines()

    totalNumOfAnnotations = len(class_annotations)
    print(&quot;Total number of annotations : &quot;+str(totalNumOfAnnotations))

    cnt = 0
    for line in class_annotations[0:totalNumOfAnnotations]:
        cnt = cnt + 1
        print(&quot;annotation count : &quot; + str(cnt))
        lineParts = line.split(&#39;,&#39;)
        subprocess.run([ &#39;aws&#39;, &#39;s3&#39;, &#39;--no-sign-request&#39;, &#39;--only-show-errors&#39;, &#39;cp&#39;, &#39;s3://open-images-dataset/&#39;+runMode+&#39;/&#39;+lineParts[0]+&quot;.jpg&quot;, &#39;JPEGImages/&#39;+lineParts[0]+&quot;.jpg&quot;])
        with open(&#39;labels/%s.txt&#39;%(lineParts[0]),&#39;a&#39;) as f:
            f.write(&#39; &#39;.join([str(ind),str((float(lineParts[5]) + float(lineParts[4]))/2), str((float(lineParts[7]) + float(lineParts[6]))/2), str(float(lineParts[5])-float(lineParts[4])),str(float(lineParts[7])-float(lineParts[6]))])+&#39;\\n&#39;)
</code></pre><p>windows:</p><pre><code>import csv
import subprocess
import os

#要下的数据集rain,test,valid
runMode = &quot;train&quot;
#类别
classes = [&quot;Snowman&quot;]

with open(&#39;class-descriptions-boxable.csv&#39;, mode=&#39;r&#39;) as infile:
    reader = csv.reader(infile)
    dict_list = {rows[1]:rows[0] for rows in reader}

#删除以前下载的
subprocess.run([&#39;rd&#39;, &#39;/s/q&#39;, &#39;JPEGImages&#39;],shell=True)
subprocess.run([&#39;mkdir&#39;, &#39;JPEGImages&#39;],shell=True)

subprocess.run([&#39;rd&#39;, &#39;/s/q&#39;, &#39;labels&#39;],shell=True)
subprocess.run([&#39;mkdir&#39;, &#39;labels&#39;],shell=True)

for ind in range(0, len(classes)):
    
    className = classes[ind]
    print(&quot;Class &quot; + str(ind) + &quot; : &quot; + className)
    
    strs = dict_list[className]
    commandStr = &quot;findstr /r &quot;+ &#39;&quot;\\&lt;&#39; + strs + &#39;\\&gt;&quot;&#39; + &quot; &quot; + runMode + &quot;-annotations-bbox.csv&quot;

    class_annotations = subprocess.run(commandStr, stdout=subprocess.PIPE,shell=True).stdout.decode(&#39;utf-8&#39;)
    class_annotations = class_annotations.splitlines()
    print(commandStr.split(&#39;,&#39;))
    #多少张图像被下载
    totalNumOfAnnotations = len(class_annotations)
    print(&quot;Total number of annotations : &quot;+str(totalNumOfAnnotations))

    cnt = 0
    for line in class_annotations[0:totalNumOfAnnotations]:
        cnt = cnt + 1
        print(&quot;annotation count : &quot; + str(cnt))
        lineParts = line.split(&#39;,&#39;)
        subprocess.run([ &#39;aws&#39;, &#39;s3&#39;, &#39;--no-sign-request&#39;, &#39;--only-show-errors&#39;, &#39;cp&#39;, &#39;s3://open-images-dataset/&#39;+runMode+&#39;/&#39;+lineParts[0]+&quot;.jpg&quot;, &#39;JPEGImages/&#39;+lineParts[0]+&quot;.jpg&quot;],shell=True)
        with open(&#39;labels/%s.txt&#39;%(lineParts[0]),&#39;a&#39;) as f:
            f.write(&#39; &#39;.join([str(ind),str((float(lineParts[5]) + float(lineParts[4]))/2), str((float(lineParts[7]) + float(lineParts[6]))/2), str(float(lineParts[5])-float(lineParts[4])),str(float(lineParts[7])-float(lineParts[6]))])+&#39;\\n&#39;)
</code></pre><p>数据集分割：</p><pre><code>import random
import os
import subprocess
import sys

image_dir=&#39;/home/your/darknet/OpenImage/JPEGImages&#39;
def split_data_set():

    f_val = open(&quot;snowman_test.txt&quot;, &#39;w&#39;)
    f_train = open(&quot;snowman_train.txt&quot;, &#39;w&#39;)
    
    path, dirs, files = next(os.walk(image_dir))
    data_size = len(files)

    ind = 0
    data_test_size = int(0.1 * data_size)
    test_array = random.sample(range(data_size), k=data_test_size)
    
    for f in os.listdir(image_dir):
        if(f.split(&quot;.&quot;)[1] == &quot;jpg&quot;):
            ind += 1
            
            if ind in test_array:
                f_val.write(image_dir+&#39;/&#39;+f+&#39;\\n&#39;)
            else:
                f_train.write(image_dir+&#39;/&#39;+f+&#39;\\n&#39;)


split_data_set()
</code></pre><p>draw loss:</p><pre><code>import matplotlib.pyplot as plt

log=&#39;train.log&#39;
lines = []
for line in open(log):
    if &quot;avg&quot; in line:
        lines.append(line)

iterations = []
avg_loss = []

print(&#39;Retrieving data and plotting training loss graph...&#39;)
for i in range(len(lines)):
    lineParts = lines[i].split(&#39;,&#39;)
    iterations.append(int(lineParts[0].split(&#39;:&#39;)[0]))
    avg_loss.append(float(lineParts[1].split()[0]))

fig = plt.figure()
for i in range(0, len(lines)):
    plt.plot(iterations[i:i+2], avg_loss[i:i+2], &#39;r.-&#39;)

plt.xlabel(&#39;Batch Number&#39;)
plt.ylabel(&#39;Avg Loss&#39;)
fig.savefig(&#39;training_loss_plot.png&#39;, dpi=300)

print(&#39;Done! Plot saved as training_loss_plot.png&#39;)
</code></pre><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考"><span><strong>5 参考</strong></span></a></h2><ul><li><a href="https://www.learnopencv.com/training-yolov3-deep-learning-based-custom-object-detector/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/training-yolov3-deep-learning-based-custom-object-detector/ </a></li></ul>`,139)]))}const p=e(i,[["render",r],["__file","2019-03-15-_OpenCV实战_8 深度学习目标检测网络YOLOv3的训练.html.vue"]]),c=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-15-_OpenCV%E5%AE%9E%E6%88%98_8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83.html","title":"[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练","lang":"zh-CN","frontmatter":{"date":"2019-03-15T19:27:26.000Z","tag":["OpenCV实战","OpenCV","深度学习","常用工具"],"category":["OpenCV"],"description":"[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练 YOLOv3是计算机视觉中最受欢迎的实时目标检测器之一。在这个循序渐进的教程中，我们从如何使用YOLOv3训练1类物体探测器的简单案例开始。本教程是以初学者为中心编写的。建立自己的雪人检测器。 在这篇文章中，我们将分享训练过程，有助于训练的脚本以及一些公开的雪人图像和视频。您可以使用相同的...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-15-_OpenCV%E5%AE%9E%E6%88%98_8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练"}],["meta",{"property":"og:description","content":"[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练 YOLOv3是计算机视觉中最受欢迎的实时目标检测器之一。在这个循序渐进的教程中，我们从如何使用YOLOv3训练1类物体探测器的简单案例开始。本教程是以初学者为中心编写的。建立自己的雪人检测器。 在这篇文章中，我们将分享训练过程，有助于训练的脚本以及一些公开的雪人图像和视频。您可以使用相同的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83/1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:tag","content":"深度学习"}],["meta",{"property":"article:tag","content":"常用工具"}],["meta",{"property":"article:published_time","content":"2019-03-15T19:27:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83/1.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83/2.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83/3.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D8%20%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8B%E7%BD%91%E7%BB%9CYOLOv3%E7%9A%84%E8%AE%AD%E7%BB%83/4.png\\"],\\"datePublished\\":\\"2019-03-15T19:27:26.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 数据集","slug":"_1-数据集","link":"#_1-数据集","children":[{"level":3,"title":"1.1 下载openImages 雪人数据[ 约1.5 小时]","slug":"_1-1-下载openimages-雪人数据-约1-5-小时","link":"#_1-1-下载openimages-雪人数据-约1-5-小时","children":[]},{"level":3,"title":"1.2 训练集测试集拆分","slug":"_1-2-训练集测试集拆分","link":"#_1-2-训练集测试集拆分","children":[]}]},{"level":2,"title":"2 Darknet","slug":"_2-darknet","link":"#_2-darknet","children":[{"level":3,"title":"2.1 下载并构建Darknet","slug":"_2-1-下载并构建darknet","link":"#_2-1-下载并构建darknet","children":[]},{"level":3,"title":"2.2 修改代码以定期保存模型文件","slug":"_2-2-修改代码以定期保存模型文件","link":"#_2-2-修改代码以定期保存模型文件","children":[]},{"level":3,"title":"2.3 数据注释","slug":"_2-3-数据注释","link":"#_2-3-数据注释","children":[]}]},{"level":2,"title":"3 模型训练","slug":"_3-模型训练","link":"#_3-模型训练","children":[{"level":3,"title":"3.1 下载预训练模型","slug":"_3-1-下载预训练模型","link":"#_3-1-下载预训练模型","children":[]},{"level":3,"title":"3.2 数据文件","slug":"_3-2-数据文件","link":"#_3-2-数据文件","children":[]},{"level":3,"title":"3.3 配置训练参数","slug":"_3-3-配置训练参数","link":"#_3-3-配置训练参数","children":[]},{"level":3,"title":"3.4 模型训练","slug":"_3-4-模型训练","link":"#_3-4-模型训练","children":[]},{"level":3,"title":"3.5 模型停止训练","slug":"_3-5-模型停止训练","link":"#_3-5-模型停止训练","children":[]},{"level":3,"title":"3.6 模型测试","slug":"_3-6-模型测试","link":"#_3-6-模型测试","children":[]}]},{"level":2,"title":"4 代码","slug":"_4-代码","link":"#_4-代码","children":[]},{"level":2,"title":"5 参考","slug":"_5-参考","link":"#_5-参考","children":[]}],"git":{},"readingTime":{"minutes":16.71,"words":5014},"filePathRelative":"blog/opencv/opencv实战/2019-03-15-[OpenCV实战]8 深度学习目标检测网络YOLOv3的训练.md","localizedDate":"2019年3月16日","excerpt":"\\n<p>YOLOv3是计算机视觉中最受欢迎的实时目标检测器之一。在这个循序渐进的教程中，我们从如何使用YOLOv3训练1类物体探测器的简单案例开始。本教程是以初学者为中心编写的。建立自己的雪人检测器。</p>\\n<p>在这篇文章中，我们将分享训练过程，有助于训练的脚本以及一些公开的雪人图像和视频。您可以使用相同的过程来训练具有多个对象的对象检测器。</p>\\n<p><strong>特别要注意的是，训练yolov3最好在linux下进行，同时所有涉及到输入路径的都最好使用绝对路径。</strong></p>\\n<h2><strong>1</strong> <strong>数据集</strong></h2>","autoDesc":true}');export{p as comp,c as data};
