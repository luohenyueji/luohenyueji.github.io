import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as s,o as t,c as r,a as e,b as i,d as n,e as d}from"./app-MsA2k2kn.js";const o={},c=e("h1",{id:"常用工具-dlib编译调用指南",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#常用工具-dlib编译调用指南","aria-hidden":"true"},"#"),i(" [常用工具] dlib编译调用指南")],-1),b={href:"http://dlib.net/",target:"_blank",rel:"noopener noreferrer"},u=e("h2",{id:"_1-资源",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-资源","aria-hidden":"true"},"#"),i(" 1 资源")],-1),p={href:"https://github.com/davisking/dlib",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/davisking/dlib-models",target:"_blank",rel:"noopener noreferrer"},m={href:"https://gitee.com/luohenyueji/dlib",target:"_blank",rel:"noopener noreferrer"},v={href:"https://gitee.com/luohenyueji/dlib-models",target:"_blank",rel:"noopener noreferrer"},h=d(`<p>本文判断dlib是否成功编译的示例代码为dlib\\examples目录下的3d_point_cloud_ex.cpp。调用该示例代码后会可视化一个简单的3维点云数据。 代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>// The contents of this file are in the public domain. See LICENSE_FOR_EXAMPLE_PROGRAMS.txt
/*

    This is an example illustrating the use of the perspective_window tool
    in the dlib C++ Library.  It is a simple tool for displaying 3D point 
    clouds on the screen.

*/

#include &lt;dlib/gui_widgets.h&gt;
#include &lt;dlib/image_transforms.h&gt;
#include &lt;cmath&gt;

using namespace dlib;
using namespace std;

// ----------------------------------------------------------------------------------------

int main()
{
    // Let&#39;s make a point cloud that looks like a 3D spiral.
    std::vector&lt;perspective_window::overlay_dot&gt; points;
    dlib::rand rnd;
    for (double i = 0; i &lt; 20; i+=0.001)
    {
        // Get a point on a spiral
        dlib::vector&lt;double&gt; val(sin(i),cos(i),i/4);

        // Now add some random noise to it
        dlib::vector&lt;double&gt; temp(rnd.get_random_gaussian(),
                                  rnd.get_random_gaussian(),
                                  rnd.get_random_gaussian());
        val += temp/20;

        // Pick a color based on how far we are along the spiral
        rgb_pixel color = colormap_jet(i,0,20);

        // And add the point to the list of points we will display
        points.push_back(perspective_window::overlay_dot(val, color));
    }

    // Now finally display the point cloud.
    perspective_window win;
    win.set_title(&quot;perspective_window 3D point cloud&quot;);
    win.add_overlay(points);
    win.wait_until_closed();
}

//  ----------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-windows下c-编译安装调用dlib" tabindex="-1"><a class="header-anchor" href="#_2-windows下c-编译安装调用dlib" aria-hidden="true">#</a> 2 Windows下C++编译安装调用dlib</h2>`,3),g={href:"https://blog.csdn.net/Feeryman_Lee/article/details/103203152",target:"_blank",rel:"noopener noreferrer"},f=e("h3",{id:"_2-1-编译",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-1-编译","aria-hidden":"true"},"#"),i(" 2.1 编译")],-1),k=e("p",null,[e("strong",null,"step1")],-1),w=e("p",null,[i("在D:\\packages\\dlib路径下创建build文件夹和install文件夹，build文件夹用于存放相关编译数据，install保存最后需要调用的生成文件。文件结构如下图所示： "),e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/1.jpg",alt:"",loading:"lazy"}),e("strong",null,"step2")],-1),x={href:"https://cmake.org/download/",target:"_blank",rel:"noopener noreferrer"},C=e("img",{src:"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/2.jpg",alt:"",loading:"lazy"},null,-1),D=d(`<figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在编译过程会出现找不到cuda的情况，忽视就行了。然后注意将指定的安装目录CMAKE_INSTALL_PREFIX这一项改为D:\\packages\\dlib\\install。然后再点击configure，如果没有标红，点击generate。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/4.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>step3</strong></p><p>生成相关文件，generate成功后打开OpenProject即可，这样就会打开vs2017。 如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/5.jpg" alt="" loading="lazy"> 打开后的vs2017界面如下图所示，确定编译平台为debug/x64，然后点击生成-生成解决方法即可，如下图所示。这样的好处是知道哪些模块生成失败。如果有生成译错误，检查即可。这一过程约3分钟，不同机器时间不一样。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/6.jpg" alt="" loading="lazy"> 生成成功后，如下图所示。可以有生成跳过，但是不能有生成失败。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/7.jpg" alt="" loading="lazy"></p><p>如果生成后没有失败的，选择解决方案-INSTALL-仅用于项目-仅生成INSTALL，如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/8.jpg" alt="" loading="lazy"></p><p>此外以上操作只能生成dlib Debug版本。Release版本需要修改配置平台，重复以上操作。如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/9.jpg" alt="" loading="lazy"></p><p>最后如果install文件夹中有include文件夹和lib文件夹，表明编译过程成功。如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/10.jpg" alt="" loading="lazy"></p><p><strong>在windows平台下，某些情况下dlib会使用libjpeg，libpng模块，可能会出现链接libjpeg错误的情况。如果你使用的是anaconda，dlib会自动链接anconda的libjpeg，libpng模块。这些模块是32位的，你只能用x86的dlib版本，否则出错。如果是想用x64平台，需要自己编译第三方模块的x64版本，比如libpng，libjpeg，zlib。github搜索这些模块，然后编译后。用visual studio的命令行开发工具，进入build目录，自行指定libjpeg等链接文件，再进行编译。其中dlib要链接的第三方库自行指定目录（目前看来这一种解决办法），具体命令如下：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
# Visual Studio 15 2017指vs2017，vs2015用Visual Studio 14 2015，vs2019用Visual Studio 16 2019
# -DCMAKE_INSTALL_PREFIX=../instal 编译文件安装目录
cmake -G &quot;Visual Studio 15 2017&quot; -DJPEG_INCLUDE_DIR=..\\dlib\\external\\libjpeg -DJPEG_LIBRARY=..\\dlib\\external\\jpeg.lib -DPNG_PNG_INCLUDE_DIR=..\\dlib\\external\\libpng -DPNG_LIBRARY_RELEASE=..\\dlib\\external\\libpng.lib -DZLIB_INCLUDE_DIR=..\\dlib\\external\\zlib -DZLIB_LIBRARY_RELEASE=..\\dlib\\external\\z.lib -DDLIB_GIF_SUPPORT=OFF -DCMAKE_INSTALL_PREFIX=../install -DCMAKE_GENERATOR_PLATFORM=x64 ..


# 编译debug版本
cmake --build . --target INSTALL

# 编译release版本
cmake --build . --config Release --target INSTALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-配置与使用" tabindex="-1"><a class="header-anchor" href="#_2-2-配置与使用" aria-hidden="true">#</a> 2.2 配置与使用</h3><p>新建vs2017项目，然后选择属性管理器，新建属性列表dlib如下图所示。这样该dlib属性列表以后可以重复导入使用，不需要每次新建工程都配置。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/11.jpg" alt="" loading="lazy"> 修改Release|X64模式下的dlib属性，修改VC++目录下的可执行目录，库目录。如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/12.jpg" alt="" loading="lazy"></p><p>包含目录设置如下，添加头文件：</p><blockquote><p>D:\\packages\\dlib\\install\\include</p></blockquote><p>库目录设置如下：</p><blockquote><p>D:\\packages\\dlib\\install\\lib</p></blockquote><p>然后修改链接器-输入-附加依赖项，如下图所示： <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/13.jpg" alt="" loading="lazy"></p><p>附加依赖项设置如下。注意不同版本dlib编译生成的lib不一样，注意区分，如果是debug就调用相应的debug版本，都在install\\lib目录下。</p><blockquote><p>dlib19.22.99_release_64bit_msvc1916.lib</p></blockquote><p>然后调用本文在第一节提到的示例代码3d_point_cloud_ex.cpp文件，结果如下图所示，就是一个展示3维点云的代码，可以拖动或放大缩小图形。 <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/CSDN/[dlib] dlib编译调用指南/image/14.jpg" alt="" loading="lazy"></p><h2 id="_3-ubuntu下c-编译安装调用dlib" tabindex="-1"><a class="header-anchor" href="#_3-ubuntu下c-编译安装调用dlib" aria-hidden="true">#</a> 3 Ubuntu下C++编译安装调用dlib</h2><h3 id="_3-1-编译" tabindex="-1"><a class="header-anchor" href="#_3-1-编译" aria-hidden="true">#</a> 3.1 编译</h3>`,22),E={href:"https://blog.csdn.net/qq_34106574/article/details/85626465",target:"_blank",rel:"noopener noreferrer"},L={href:"https://askubuntu.com/questions/526848/cmake-cant-find-x11",target:"_blank",rel:"noopener noreferrer"},S=d(`<blockquote><p>sudo apt-get install libx11-dev</p></blockquote><p>然后进入dlib根目录，输入以下命令：</p><blockquote><p>mkdir build; cd build; cmake .. -DUSE_AVX_INSTRUCTIONS=1; make -j12</p></blockquote><p>上述命令会编译AVX，来加速CPU运行，如果出现错误使用以下命令编译：</p><blockquote><p>mkdir build; cd build; cmake ..; make -j12</p></blockquote><h3 id="_3-2-配置与使用" tabindex="-1"><a class="header-anchor" href="#_3-2-配置与使用" aria-hidden="true">#</a> 3.2 配置与使用</h3><p>新建一个文件夹dlib-test，将3d_point_cloud_ex.cpp复制到该文件夹。进入该文件夹，新建CMakeList.txt文件，CMakeList.txt内容如下。注意CMake文件链接dlib库的路径地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cmake_minimum_required(VERSION 2.8.12)
# 工程名
project(dlib_test)

SET(CMAKE_CXX_FLAGS &quot;\${CMAKE_CXX_FLAGS} -std=c++11 -O2 -DDLIB_JPEG_SUPPORT&quot;)
 
IF(CMAKE_CXX_COMPILER_ID STREQUAL &quot;Clang&quot;)
  SET(CMAKE_CXX_FLAGS &quot;\${CMAKE_CXX_FLAGS} -Weverything&quot;)
ELSEIF(CMAKE_CXX_COMPILER_ID STREQUAL &quot;GNU&quot;)
  SET(CMAKE_CXX_FLAGS &quot;\${CMAKE_CXX_FLAGS} -Wall -Wextra&quot;)
ENDIF()

# 包含OpenCV
find_package(OpenCV REQUIRED)
if (OpenCV_FOUND)
   include_directories(\${OpenCV_INCLUDE_DIRS})
   message(&quot;OpenCV found&quot;)
endif()

# 包含X11
find_package(X11 REQUIRED)
if (X11_FOUND)
   include_directories(\${X11_INCLUDE_DIR})
   message(&quot;X11 found&quot;)
endif()

#  添加dlib
include_directories(/home/{yourpath}/dlib)
link_directories(/home/{yourpath}/dlib/build/dlib/)

# 添加代码
add_executable(dlib_test 3d_point_cloud_ex.cpp)
# 链接库
# libdlib.a - lpthread - lX11分别表示链接dlib，多线程，X11
target_link_libraries(dlib_test \${OpenCV_INCLUDE_LIBS} \${X11_LIBRARIES} libdlib.a -lpthread -lX11)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后输入以下命令，即可编译运行示例代码：</p><blockquote><p>mkdir build; cd build; cmake ..; make -j12; ./dlib_test</p></blockquote><p>如果出现第二节的三维点云图形，表明dlib安装成功。</p><h2 id="_4-python安装调用dlib" tabindex="-1"><a class="header-anchor" href="#_4-python安装调用dlib" aria-hidden="true">#</a> 4 Python安装调用dlib</h2><p>通常直接用pip install dlib会出错，所以需要安装一系列的库,主要是cmake、Boost。具体如下： <strong>windows</strong>:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pip install cmake
pip install boost
pip install dlib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),y={href:"https://www.jianshu.com/p/d2f37cea55be",target:"_blank",rel:"noopener noreferrer"},I=d(`<p><strong>linux</strong>:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo apt-get install libx11-dev
sudo apt-get install libboost-all-dev
sudo apt-get install cmake
python3 -m pip install dlib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装成功后，在python环境import dlib即表明安装成功，当然也可以编译安装，具体步骤见官方仓库文档。</p><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2>`,4),j={href:"http://dlib.net/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://github.com/davisking/dlib",target:"_blank",rel:"noopener noreferrer"},A={href:"https://github.com/davisking/dlib-models",target:"_blank",rel:"noopener noreferrer"},q={href:"https://gitee.com/luohenyueji/dlib",target:"_blank",rel:"noopener noreferrer"},R={href:"https://gitee.com/luohenyueji/dlib-models",target:"_blank",rel:"noopener noreferrer"},X={href:"https://blog.csdn.net/Feeryman_Lee/article/details/103203152",target:"_blank",rel:"noopener noreferrer"},O={href:"https://blog.csdn.net/qq_34106574/article/details/85626465",target:"_blank",rel:"noopener noreferrer"},P={href:"https://askubuntu.com/questions/526848/cmake-cant-find-x11",target:"_blank",rel:"noopener noreferrer"};function V(F,T){const l=s("ExternalLinkIcon");return t(),r("div",null,[c,e("p",null,[i("dlib是一个C++工具包（DLIB中也有Python接口，但是主要编程语言为C++），包含绝大多数常用的机器学习算法，许多图像处理算法和深度学习算法，被工业界和学术界广泛应用于机器人、嵌入式设备、移动电话和大型高性能计算环境等领域。dlib的开源许可允许您在任何应用程序中免费使用它。在工程实践中，dlib通常和OpenCV结合使用，OpenCV提供图像处理算法，dlib提供机器学习算法。对于从事计算机视觉行业的人，非常推荐学习使用dlib。本文主要讲述dlib在Windows（win10）和linux(ubuntu18.04)下面向C++的编译安装调用。dlib具体介绍见其官网"),e("a",b,[i("dlib官网"),n(l)]),i("。")]),u,e("p",null,[i("在dlib的github仓库下载对应版本文件。链接地址为："),e("a",p,[i("dlib"),n(l)]),i("。此外，在使用dlib中需要使用dlib提供的模型，下载地址见"),e("a",_,[i("dlib-models"),n(l)]),i("。如果网速太慢，可以看看gitee备份。地址为："),e("a",m,[i("dlib-gitee"),n(l)]),i("和"),e("a",v,[i("dlib-models-gitee"),n(l)]),i("。")]),h,e("p",null,[i("Windows下的编译使用很简单，不需要其他的额外安装库，直接拉取dlib的仓库就行了。本文将dlib仓库放在D:\\packages\\dlib路径下，然后通过cmake和vs2017编译使用dlib。这一部分参考文章"),e("a",g,[i("【C++】VS2019+Dlib安装及整合详细步骤"),n(l)]),i("。")]),f,k,w,e("p",null,[i("配置dlib库。打开cmake-gui，配置dlib库。cmake安装地址为："),e("a",x,[i("cmake"),n(l)]),i("。打开cmake-gui后设置源代码目录地址和生成文件地址，点击configure。如图所示： "),C,i(" 然后配置编译器，选择对应的编译器版本，再选择编译平台版本x64。最后点击finish，cmake将会自动编译文件。")]),D,e("p",null,[i("ubuntu下编译使用dlib比windows下稍微复杂，因为ubuntu缺少一些dlib所需要的库，有时会出现莫名其妙的错误，一般来说都是缺少图形显示库，比如linux下dlib需要x11图像化界面（windows不需要，其他系统图像化界面可能不一样），所以先安装x11。如果不安装可能会出现X11相关错误。这一部分参考文章"),e("a",E,[i("ubuntu下使用 dlib"),n(l)]),i("和"),e("a",L,[i("cmake-cant-find-x11"),n(l)])]),S,e("p",null,[i("如果发现编译失败，看看"),e("a",y,[i("python--3.8安装dlib"),n(l)]),i("，直接通过whl包安装dlib也行")]),I,e("ul",null,[e("li",null,[e("a",j,[i("dlib官网"),n(l)])]),e("li",null,[e("a",N,[i("dlib"),n(l)])]),e("li",null,[e("a",A,[i("dlib-models"),n(l)])]),e("li",null,[e("a",q,[i("dlib-gitee"),n(l)])]),e("li",null,[e("a",R,[i("dlib-models-gitee"),n(l)])]),e("li",null,[e("a",X,[i("【C++】VS2019+Dlib安装及整合详细步骤"),n(l)])]),e("li",null,[e("a",O,[i("ubuntu下使用 dlib"),n(l)])]),e("li",null,[e("a",P,[i("cmake-cant-find-x11"),n(l)])])])])}const G=a(o,[["render",V],["__file","2021-04-23-_常用工具_ dlib编译调用指南.html.vue"]]);export{G as default};
