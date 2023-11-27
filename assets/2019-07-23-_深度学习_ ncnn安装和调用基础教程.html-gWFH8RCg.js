import{_ as c}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as r,c as l,a as n,b as e,d as o,e as i}from"./app-MsA2k2kn.js";const s={},p=n("h1",{id:"深度学习-ncnn安装和调用基础教程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#深度学习-ncnn安装和调用基础教程","aria-hidden":"true"},"#"),e(" [深度学习] ncnn安装和调用基础教程")],-1),d=n("h2",{id:"_1-介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-介绍","aria-hidden":"true"},"#"),e(" 1 介绍")],-1),u=n("p",null,"ncnn是腾讯开发的一个为手机端极致优化的高性能神经网络前向计算框架，无第三方依赖，跨平台，但是通常都需要protobuf和opencv。ncnn目前已在腾讯多款应用中使用，如 QQ，Qzone，微信，天天P图等。ncnn主要基于C++和caffe，ncnn项目地址见：",-1),_={href:"https://github.com/Tencent/ncnn",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,"本文主要介绍ncnn在Ubuntu 18和Windows10下安装和使用。ncnn实测win10和Ubuntu18下C++调用squeezenet进行分类越比opencv dnn模块调用squeeznet快3到5倍。",-1),b=n("p",null,"ncnn常见的主流系统平台和常见硬件平台都支持，包括树莓派。",-1),f=n("figure",null,[n("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/2019072320191194.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),g=n("p",null,"其他平台安装教程见：",-1),m={href:"https://github.com/Tencent/ncnn/wiki/how-to-build#build-for-windows-x64-using-visual-studio-community-2017",target:"_blank",rel:"noopener noreferrer"},x=n("h2",{id:"_2-ubuntu-18下ncnn安装和使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-ubuntu-18下ncnn安装和使用","aria-hidden":"true"},"#"),e(" 2 Ubuntu 18下ncnn安装和使用")],-1),w=n("h3",{id:"_2-1-ubuntu-18下ncnn编译安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-ubuntu-18下ncnn编译安装","aria-hidden":"true"},"#"),e(" 2.1 Ubuntu 18下ncnn编译安装")],-1),v=n("p",null,"ncnn在linux平台需要protobuf和较低的gcc版本支持，如果你的系统可以运行caffe，可以跳过第一第二步，直接第三步。第一第二步具体安装protobuf见：",-1),k={href:"https://blog.csdn.net/barrytough/article/details/80660806",target:"_blank",rel:"noopener noreferrer"},N=i(`<p>（1）将gcc、g++降级为4.8.5版本。</p><p>（2）安装protobuf</p><p>（3）编译源码</p><p>先下载源码</p><pre><code>git clone https://github.com/Tencent/ncnn
</code></pre><p>然后进入ncnn安装即可</p><pre><code>cd ncnn

mkdir build

cd build

cmake ..

make –j12 

make install
</code></pre><h3 id="_2-2-ubuntu-18下ncnn使用" tabindex="-1"><a class="header-anchor" href="#_2-2-ubuntu-18下ncnn使用" aria-hidden="true">#</a> 2.2 Ubuntu 18下ncnn使用</h3><p>(1) 模型更新</p><p>ncnn对caffe模型支持度比其他平台模型支持度更高。所以一般都是将caffe的模型转为ncnn格式。对于比较老的caffe模型需要将其转换为最新的caffe模型（相对来说），不过一般都不需要。以alexnet为例</p><p>alexnet 的 deploy.prototxt 可以在这里下载：</p>`,11),q={href:"https://github.com/BVLC/caffe/tree/master/models/bvlc_alexnet",target:"_blank",rel:"noopener noreferrer"},L=n("p",null,"alexnet 的 caffemodel 可以在这里下载 ：",-1),y={href:"http://dl.caffe.berkeleyvision.org/bvlc_alexnet.caffemodel",target:"_blank",rel:"noopener noreferrer"},F=i(`<p>caffe自带了工具可以把老版本的caffe 网络和模型转换为新版（ncnn的工具只认识新版），转换方法为将你需要转换的prototxt和caffemodel放在你电脑的caffe/build/tools目录下，然后终端进入caffe/build/tools，执行命令：.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    ./upgrade_net_proto_text old_deploy.prototxt new_deploy.prototxt
    ./upgrade_net_proto_binary old.caffemodel new.caffemodel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完成之后你就可以在caffe/build/tools下找到你的new_deploy.prototxt和new.caffemodel文件了。注意完成之后打开你的new_deploy.prototxt文件看一下，因为一般每次只需要做一个数据样本的识别，所以如果第一个 dim 不为1，要将其设为</p><pre><code>layer {

  name: &quot;data&quot;

  type: &quot;Input&quot;

  top: &quot;data&quot;

  input_param { shape: { dim: 1 dim: 3 dim: 227 dim: 227 } }

}
</code></pre><p>（2）模型转换</p><p>模型转换具体使用见：</p>`,6),E={href:"https://blog.csdn.net/qq_36982160/article/details/79929869",target:"_blank",rel:"noopener noreferrer"},z=n("p",null,"当你获得new_deploy.prototxt和new.caffemodel文件后，需要将prototxt转换为ncnn支持的param文件，caffemodel转换为bin文件。Ncnn中使用caffe2ncnn工具转换为ncnn的网络描述和模型。将上面转化的new_deploy.prototxt和new.caffemodel放到ncnn/build/tools/caffe下。然后命令行输入以下命令：",-1),C=n("pre",null,[n("code",null,`./caffe2ncnn new_deploy.prototxt new.caffemodel ncnn.param ncnn.bin
`)],-1),A=n("p",null,"或者在以下网站转换模型：",-1),M={href:"https://convertmodel.com/?tdsourcetag=s_pcqq_aiomsg",target:"_blank",rel:"noopener noreferrer"},G=i(`<p>（3）运用模型分类</p><p>上面提到的是alexnet，在实际本文使用的是squeezenet。ncnn调用模型的一般过程都是参考ncnn/examples/下各个示例cpp文件，选择自己的模型，然后根据该目录下的CMakeLists.txt文件修改参数。本文就不修改参数了，直接选用squeezenet.cpp使用。</p><p>然后打开ncnn根目录下的CMakeLists.txt文件，将编译examples语句的注释打开（默认是被注释掉的），如图：</p><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9waWN0dXJlLXBvb2wub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tLzAwNnROYlJ3Z3kxZnh5OWVyNmRuNGozMHF3MGEwMHUzLmpwZw" alt="https://picture-pool.oss-cn-
beijing.aliyuncs.com/006tNbRwgy1fxy9er6dn4j30qw0a00u3.jpg" tabindex="0" loading="lazy"><figcaption>https://picture-pool.oss-cn- beijing.aliyuncs.com/006tNbRwgy1fxy9er6dn4j30qw0a00u3.jpg</figcaption></figure><p>终端进入ncnn/build后执行：</p><pre><code>make
</code></pre><p>然后把所获得ncnn参数和模型文件复制到ncnn/build/examples目录下，本文所用的squeezenet的ncnn文件在ncnn/examples中有提供。将模型.param和.bin文件复制到ncnn/build/examples目录下，然后终端cd到cnn/build/examples，执行：</p><pre><code>./squeezenet imagepath
</code></pre><p>Imagepath为图像路径。就可以得到结果。</p><p>具体调用代码直接参考ncnn/examples中的示例cpp文件，但是使用时最好使用examples所提到的模型。</p><p>（4）ncnn工程使用</p><p>如果想建立工程，需要自己新建一个目录然后编写你自己的cpp文件。比如使用ncnn/examples/squeezenet.cpp，将其放入本机任意路径新的文件夹。对于ncnn编译，需要添加opencv和openmp，编写如下CMakeLists.txt进行编译，然后cmake .就可以在当前目录运行生成的可执行文件ncnnTest。</p><pre><code>## 设置cmake版本
cmake_minimum_required(VERSION 3.2)

## ncnn工程
project(ncnnTest)

## 调用opencv
find_package(OpenCV REQUIRED)
## 调用openmp
FIND_PACKAGE( OpenMP REQUIRED)  
if(OPENMP_FOUND)  
    message(&quot;OPENMP FOUND&quot;)  
    set(CMAKE_C_FLAGS &quot;\${CMAKE_C_FLAGS} \${OpenMP_C_FLAGS}&quot;)  
    set(CMAKE_CXX_FLAGS &quot;\${CMAKE_CXX_FLAGS} \${OpenMP_CXX_FLAGS}&quot;)  
    set(CMAKE_EXE_LINKER_FLAGS &quot;\${CMAKE_EXE_LINKER_FLAGS} \${OpenMP_EXE_LINKER_FLAGS}&quot;)  
endif()  

## 包含ncnn的头文件
include_directories(/home/user/ncnn/build/install/include/ncnn)
## 包含ncnn的链接文件
link_directories(/home/user/ncnn/build/install/lib)
## 生成可执行文件
add_executable(ncnnTest squeezenet.cpp)
## 链接ncnn静态链接库
target_link_libraries(ncnnTest ncnn \${OpenCV_LIBS} /home/user/ncnn/build/install/lib/libncnn.a)
</code></pre><h2 id="_3-windows-10下ncnn安装和使用" tabindex="-1"><a class="header-anchor" href="#_3-windows-10下ncnn安装和使用" aria-hidden="true">#</a> 3 Windows 10下ncnn安装和使用</h2><p>Win10下安装和ncnn最好都基于visual studio2015以上平台，本文用的vs2017。</p><h3 id="_3-1-windows-10下ncnn编译安装" tabindex="-1"><a class="header-anchor" href="#_3-1-windows-10下ncnn编译安装" aria-hidden="true">#</a> 3.1 Windows 10下ncnn编译安装</h3><p>（1）protobuf编译</p>`,17),T={href:"https://github.com/google/protobuf/archive/v3.4.0.zip",target:"_blank",rel:"noopener noreferrer"},V=n("p",null,"然后选择vs2017自带的命令提示符工具，对于命令提示符工具选择，用于后期可能会用到opencv或者其他软件包。需要确定是x86还是x64平台，本文由于用的x64平台，选择适用于vs2017的x64本机工具。如下所示：",-1),I=n("figure",null,[n("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/2019072320191198.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),R=n("p",null,"特别要注意的在编译文件前，一定要确定命令工具所使用的是x64还是x86。",-1),B=n("figure",null,[n("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/20190723201911107.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),K=n("p",null,"protobuf编译步骤为:",-1),D=n("pre",null,[n("code",null,`cd <protobuf-root-dir>

mkdir build-vs2017

cd build-vs2017

cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=%cd%/install -Dprotobuf_BUILD_TESTS=OFF -Dprotobuf_MSVC_STATIC_RUNTIME=OFF ../cmake

nmake

nmake install
`)],-1),S=n("p",null,"上面protobuf-root- dir为你的protobuf文件路径，比如我的是D:/packages/protobuf-3.4.0，文件路径最好纯英文，protobuf设置的release格式。",-1),U=n("p",null,"（2）ncnn编译",-1),Z={href:"https://github.com/Tencent/ncnn",target:"_blank",rel:"noopener noreferrer"},O=i(`<pre><code>cd &lt;ncnn-root-dir&gt;

mkdir build-vs2017

cd build-vs2017

cmake -G&quot;NMake Makefiles&quot; -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=%cd%/install -DProtobuf_INCLUDE_DIR=&lt;protobuf-root-dir&gt;/build-vs2017/install/include -DProtobuf_LIBRARIES=&lt;protobuf-root-dir&gt;/build-vs2017/install/lib/libprotobuf.lib -DProtobuf_PROTOC_EXECUTABLE=&lt;protobuf-root-dir&gt;/build-vs2017/install/bin/protoc.exe -DNCNN_VULKAN=OFF ..

nmake

nmake install
</code></pre><p>注意<code>&lt;protobuf-root-dir&gt;</code>要替换为你的protobuf文件绝对路径，比如我的是D:/packages/protobuf-3.4.0。DCMAKE_BUILD_TYPE=Release确定编译的是release文件。</p><h3 id="_3-2-windows-10下ncnn使用" tabindex="-1"><a class="header-anchor" href="#_3-2-windows-10下ncnn使用" aria-hidden="true">#</a> 3.2 Windows 10下ncnn使用</h3><p>ncnn使用类似opencv在windows下的使用。打开vs2017建立工程文件。项目-属性- VC++目录。设置配置文件，VC++目录在包含目录下输入以下路径，调用opencv，ncnn，protobuf头文件。</p><pre><code>d:\\opencv\\build\\include\\opencv

d:\\opencv\\build\\include

d:\\opencv\\build\\include\\opencv2

d:\\packages\\ncnn\\build-vs2017\\install\\include

d:\\packages\\ncnn\\build-vs2017\\install\\include\\ncnn

d:\\packages\\protobuf-3.4.0\\build-vs2017\\install\\include

d:\\packages\\protobuf-3.4.0\\build-vs2017\\install\\include\\google
</code></pre><p>具体如图所示：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/20190723201911186.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接着配置库目录，输入以下路径配置链接文件</p><pre><code>d:\\opencv\\build\\x64\\vc15\\lib

d:\\packages\\ncnn\\build-vs2017\\install\\lib

d:\\packages\\protobuf-3.4.0\\build-vs2017\\install\\lib
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/20190723201911184.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>但是额外要配置配置Windows运行库目录，主要是要protobuf配置文件：</p><pre><code>d:\\packages\\protobuf-3.4.0\\build-vs2017\\install\\bin
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/20190723201911302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最后链接器-输入-附加依赖项配置附加依赖项。Protobuf相关依赖项已经调用了其动态库，就不需要再调用了。</p><pre><code>opencv_world341.lib

ncnn.lib
</code></pre><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[深度学习] ncnn安装和调用基础教程/20190723201911335.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0x1b2hlbllK,size_16,color_FFFFFF,t_70" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这样ncnn就配置好了。输入代码，直接ncnn/examples中选用一个示例调用cpp就行了。但是只能在release x64下调用ncnn，具体编译ncnn时所选择的编译模式。比如squeezenet.cpp，直接复制过来，设置param和bin文件路径就行了。其他模型依葫芦画瓢。</p><pre><code>// Tencent is pleased to support the open source community by making ncnn available.
//
// Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
//
// Licensed under the BSD 3-Clause License (the &quot;License&quot;); you may not use this file except
// in compliance with the License. You may obtain a copy of the License at
//
// https://opensource.org/licenses/BSD-3-Clause
//
// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

#include &lt;stdio.h&gt;
#include &lt;algorithm&gt;
#include &lt;vector&gt;
#include &lt;opencv2/core/core.hpp&gt;
#include &lt;opencv2/highgui/highgui.hpp&gt;

// linux平台调用
// #include &quot;platform.h&quot;
// #include &quot;net.h&quot;

// windows平台调用
#include &lt;net.h&gt;
#include &lt;platform.h&gt;

#if NCNN_VULKAN
#include &quot;gpu.h&quot;
#endif // NCNN_VULKAN

static int detect_squeezenet(const cv::Mat&amp; bgr, std::vector&lt;float&gt;&amp; cls_scores)
{
    ncnn::Net squeezenet;

#if NCNN_VULKAN
    squeezenet.opt.use_vulkan_compute = true;
#endif // NCNN_VULKAN
    
    // squeezenet的ncnn模型文件路径
    squeezenet.load_param(&quot;squeezenet_v1.1.param&quot;);
    squeezenet.load_model(&quot;squeezenet_v1.1.bin&quot;);

    ncnn::Mat in = ncnn::Mat::from_pixels_resize(bgr.data, ncnn::Mat::PIXEL_BGR, bgr.cols, bgr.rows, 227, 227);

    const float mean_vals[3] = {104.f, 117.f, 123.f};
    in.substract_mean_normalize(mean_vals, 0);

    ncnn::Extractor ex = squeezenet.create_extractor();

    ex.input(&quot;data&quot;, in);

    ncnn::Mat out;
    ex.extract(&quot;prob&quot;, out);

    cls_scores.resize(out.w);
    for (int j=0; j&lt;out.w; j++)
    {
        cls_scores[j] = out[j];
    }

    return 0;
}

static int print_topk(const std::vector&lt;float&gt;&amp; cls_scores, int topk)
{
    // partial sort topk with index
    int size = cls_scores.size();
    std::vector&lt; std::pair&lt;float, int&gt; &gt; vec;
    vec.resize(size);
    for (int i=0; i&lt;size; i++)
    {
        vec[i] = std::make_pair(cls_scores[i], i);
    }

    std::partial_sort(vec.begin(), vec.begin() + topk, vec.end(),
                      std::greater&lt; std::pair&lt;float, int&gt; &gt;());

    // print topk and score
    for (int i=0; i&lt;topk; i++)
    {
        float score = vec[i].first;
        int index = vec[i].second;
        fprintf(stderr, &quot;%d = %f\\n&quot;, index, score);
    }

    return 0;
}

int main()
{
	String imagepath = &quot;./image/cat.jpg&quot;;
	cv::Mat m = cv::imread(imagepath);
	if (m.empty())
	{
		fprintf(stderr, &quot;cv::imread %s failed\\n&quot;, imagepath);
		return -1;
	}

#if NCNN_VULKAN
    ncnn::create_gpu_instance();
#endif // NCNN_VULKAN

    std::vector&lt;float&gt; cls_scores;
    detect_squeezenet(m, cls_scores);

#if NCNN_VULKAN
    ncnn::destroy_gpu_instance();
#endif // NCNN_VULKAN

    print_topk(cls_scores, 3);

    return 0;
}
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考" aria-hidden="true">#</a> 4 参考</h2>`,19),P={href:"https://github.com/Tencent/ncnn/wiki/how-to-build#build-for-linux-x86",target:"_blank",rel:"noopener noreferrer"},j={href:"https://github.com/Tencent/ncnn/wiki/ncnn-%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8C%97-alexnet",target:"_blank",rel:"noopener noreferrer"},W={href:"https://blog.csdn.net/barrytough/article/details/80660806",target:"_blank",rel:"noopener noreferrer"},H={href:"https://blog.csdn.net/weixin_45250844/article/details/94910897",target:"_blank",rel:"noopener noreferrer"},X={href:"https://blog.csdn.net/qq_36982160/article/details/79929869",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://blog.csdn.net/m_buddy/article/details/87740231",target:"_blank",rel:"noopener noreferrer"},$={href:"https://blog.csdn.net/lucifer_24/article/details/90104343",target:"_blank",rel:"noopener noreferrer"};function Q(J,nn){const t=a("ExternalLinkIcon");return r(),l("div",null,[p,d,u,n("p",null,[n("a",_,[e(" https://github.com/Tencent/ncnn "),o(t)])]),h,b,f,g,n("p",null,[n("a",m,[e(" https://github.com/Tencent/ncnn/wiki/how-to-build#build-for-windows-x64-using-visual-studio-community-2017"),o(t)])]),x,w,v,n("p",null,[n("a",k,[e(" https://blog.csdn.net/barrytough/article/details/80660806 "),o(t)])]),N,n("p",null,[n("a",q,[e(" https://github.com/BVLC/caffe/tree/master/models/bvlc_alexnet"),o(t)])]),L,n("p",null,[n("a",y,[e(" http://dl.caffe.berkeleyvision.org/bvlc_alexnet.caffemodel"),o(t)])]),F,n("p",null,[n("a",E,[e(" https://blog.csdn.net/qq_36982160/article/details/79929869 "),o(t)])]),z,C,A,n("p",null,[n("a",M,[e(" https://convertmodel.com/?tdsourcetag=s_pcqq_aiomsg "),o(t)])]),G,n("p",null,[e("Win10下需要首先编译ncnn所使用到的protobuf库。Protobuf3.4.0下载路径为： "),n("a",T,[e("https://github.com/google/protobuf/archive/v3.4.0.zip"),o(t)])]),V,I,R,B,K,D,S,U,n("p",null,[e("下载ncnn源码， "),n("a",Z,[e(" https://github.com/Tencent/ncnn "),o(t)]),e(" 然后用上面提到的开发工具进入ncnn安装即可，具体步骤如下：")]),O,n("ol",null,[n("li",null,[n("a",P,[e(" https://github.com/Tencent/ncnn/wiki/how-to-build#build-for-linux-x86 "),o(t)])]),n("li",null,[n("a",j,[e(" https://github.com/Tencent/ncnn/wiki/ncnn-%E7%BB%84%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8C%97-alexnet "),o(t)])]),n("li",null,[n("a",W,[e(" https://blog.csdn.net/barrytough/article/details/80660806 "),o(t)])]),n("li",null,[n("a",H,[e(" https://blog.csdn.net/weixin_45250844/article/details/94910897 "),o(t)])]),n("li",null,[n("a",X,[e(" https://blog.csdn.net/qq_36982160/article/details/79929869 "),o(t)])]),n("li",null,[n("a",Y,[e(" https://blog.csdn.net/m_buddy/article/details/87740231 "),o(t)])]),n("li",null,[n("a",$,[e(" https://blog.csdn.net/lucifer_24/article/details/90104343 "),o(t)])])])])}const on=c(s,[["render",Q],["__file","2019-07-23-_深度学习_ ncnn安装和调用基础教程.html.vue"]]);export{on as default};
