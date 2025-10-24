import{_ as n,c as e,a as r,o as a}from"./app-HB0Nuzez.js";const o={};function i(s,t){return a(),e("div",null,t[0]||(t[0]=[r(`<h1 id="opencv实战-6-基于特征点匹配的视频稳像" tabindex="-1"><a class="header-anchor" href="#opencv实战-6-基于特征点匹配的视频稳像"><span>[OpenCV实战]6 基于特征点匹配的视频稳像</span></a></h1><p>在这篇文章中，我们将学习如何使用OpenCV库中称为特征点匹配的技术以实现简单视频稳定稳像。我们将讨论该算法并共享代码，以便在OpenCV中使用此方法设计一个简单的稳定器，最好OpenCV3.4.3以上实现代码。什么是视频稳定，视频稳定是指用于减少相机运动对最终视频影响的一系列方法，理解成消除视频抖动就行了。见下图通常用拍摄会出现轻微的抖动，比如手机拍摄视频，后期需要对其进行视频稳像操作。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/1.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>视频稳定的需求涉及许多领域。它在消费者和专业摄像中极为重要。因此，存在许多不同的机械，光学和算法解决方案。即使在静态图像拍摄中，稳定也可以帮助拍摄时间长的照片。在内窥镜检查和结肠镜检查等医疗诊断应用中，需要稳定视频以确定问题的确切位置和宽度。类似地，在军事应用中，飞行器在侦察飞行中捕获的视频需要稳定以进行定位，导航，目标跟踪等。这同样适用于机器人应用。</p><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍"><span><strong>1</strong> <strong>介绍</strong></span></a></h2><h3 id="_1-1-视频稳定的方法" tabindex="-1"><a class="header-anchor" href="#_1-1-视频稳定的方法"><span><strong>1.1</strong> <strong>视频稳定的方法</strong></span></a></h3><p>视频稳定方法包括机械，光学和数字稳定方法。具体如下：</p><p>机械视频稳定：机械图像稳定系统使用陀螺仪和加速度计等特殊传感器检测到运动来移动图像传感器以补偿相机的运动。</p><p>光学视频稳定：在这种方法中，不是移动整个相机，而是通过移动镜头的部分来实现稳定。该方法采用可移动透镜组件，当透过相机的透镜系统时，可移动透镜组件可变地调节光的路径长度。</p><p>数字视频稳定：此方法不需要特殊的传感器来估算相机运动。本文就是用的这种方法。主要有三个步骤， 1）运动估计，2）运动平滑，3）图像合成。在第一阶段中导出两个连续帧之间的变换参数。第二级滤除不需要的运动，第三个阶段重建稳定的视频。</p><p>我们将在本文中学习快速而强大的实数字视频稳定算法。它基于二维运动模型，我们应用包含平移，旋转和缩放的欧几里德（又称相似性）变换。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/2.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如上图所示，在欧几里德运动模型中，图像中的正方形可以转换为具有不同大小，形状位置的任何其他四方形。它比仿射和单应变换更具限制性，但足以用于运动稳定，因为视频的连续帧之间的相机移动通常很小。</p><h3 id="_1-2-使用点特征匹配的视频稳定" tabindex="-1"><a class="header-anchor" href="#_1-2-使用点特征匹配的视频稳定"><span><strong>1.2</strong> <strong>使用点特征匹配的视频稳定</strong></span></a></h3><p>该方法涉及跟踪两个连续帧之间的一些特征点。跟踪的特征允许我们估计帧之间的运动并对其进行补偿。下面的流程图显示了算法基本步骤。</p><p>1 获取多帧视频图像，获取图像角点(特征点)；</p><p>2 光流法跟踪角点；根据前后两张图像角点变化得到表示运动的仿射变化矩阵。</p><p>3 根据仿射变化矩阵计算运动轨迹，并且平滑运动轨迹。</p><p>4 根据平滑后的运动轨迹，得到平滑运动后的仿射变化矩阵。</p><p>5 根据平滑运动后的仿射变化矩阵得到稳定后的图像。</p><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzAxL0FFQU0tMy5wbmc?x-oss-process=image/format,png" alt="https://www.learnopencv.com/wp-content/uploads/2019/01/AEAM-3.png" tabindex="0" loading="lazy"><figcaption>https://www.learnopencv.com/wp-content/uploads/2019/01/AEAM-3.png</figcaption></figure><h2 id="_2-算法" tabindex="-1"><a class="header-anchor" href="#_2-算法"><span>2 算法</span></a></h2><h3 id="_2-1-帧间运动信息获取" tabindex="-1"><a class="header-anchor" href="#_2-1-帧间运动信息获取"><span>2.1 帧间运动信息获取</span></a></h3><p>算法中最关键的部分是确定各帧的运动方向。我们将迭代所有帧，并找到当前帧和前一帧之间的运动。没有必要知道每个像素的运动。欧几里德运动模型要求我们知道两帧中2个点的运动信息。然而，在实践中最好找到50-100点的运动信息，然后使用它们来稳健地估计运动模型</p><h4 id="_2-1-1-合适的特征点获取" tabindex="-1"><a class="header-anchor" href="#_2-1-1-合适的特征点获取"><span>2.1.1 合适的特征点获取</span></a></h4><p>现在的问题是我们应该选择哪些特征点进行跟踪。请记住，跟踪算法会使用一个以该点为圆心的圆(小孔)来近似来模拟点的运动。这种跟踪算法受到圆直径的影响。因此，平滑区域对于跟踪是不利的，并且具有许多角点的纹理区域是好的。幸运的是，OpenCV具有快速检测函数特征点的跟踪，即函数goodFeaturesToTrack。角点个人理解是指图像中亮度变化剧烈的点或图像边缘上变化交大的点。</p><h4 id="_2-1-2-lucas-kanade光流法" tabindex="-1"><a class="header-anchor" href="#_2-1-2-lucas-kanade光流法"><span>2.1.2 Lucas-Kanade光流法</span></a></h4><p>一旦我们在前一帧中找到了好的特征(角点)，我们就可以使用名为Lucas-Kanade Optical Flow的算法在下一帧中跟踪它们，该算法以算法的发明者命名。算法详情可以见</p><p><a href="https://blog.csdn.net/linmingan/article/details/79296963" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/linmingan/article/details/79296963</a></p><p>OpenCV中的函数calcOpticalFlowPyrLK实现算法。在calcOpticalFlowPyrLK中，LK代表Lucas- Kanade，而Pyr代表金字塔。计算机视觉中的图像金字塔用于处理不同比例（分辨率）的图像。但是由于各种原因，calcOpticalFlowPyrLK可能无法计算所有点的运动。例如，当前帧中的特征点可能被下一帧中的另一个对象遮挡。幸运的是calcOpticalFlowPyrLK中的状态标志可用于过滤掉这些值。</p><h4 id="_2-1-3-运动估计" tabindex="-1"><a class="header-anchor" href="#_2-1-3-运动估计"><span>2.1.3 运动估计</span></a></h4><p>回顾一下，在步骤2.1.1中，我们发现在前一帧中要跟踪的特征点。在步骤2.1.2中，我们使用光流来跟踪特征点。换句话说，我们在当前帧中找到了特征点的位置，并且我们已经知道了前一帧中特征点的位置。因此，我们可以使用这两组特征点来找到将前一帧映射到当前帧的（欧几里德）变换。OpenCV使用函数estimateRigidTransform完成的。仿射变化详细见</p><p><a href="https://blog.csdn.net/dongfang1984/article/details/52959308" target="_blank" rel="noopener noreferrer"> https://blog.csdn.net/dongfang1984/article/details/52959308 </a></p><p>一旦我们获取运动信息，我们就可以将它分解为x和y值以及平移和旋转（角度）值。我们将这些值存储在一个数组中，以便我们可以顺利更改它们。</p><p>下面的代码将介绍步骤2.1.1至2.1.3。请务必阅读要遵循的代码中的注释。</p><p>在C++实现中，我们首先定义一些类来帮助我们存储估计的运动矢量。下面C++代码的TransformParam类存储运动信息（dx为x轴运动信息，dy为y轴运动信息，da为角度信息），并提供方法getTransform将此运动转换为变换矩阵。</p><pre><code>/**
 * @brief 运动信息结构体
 *
 */
struct TransformParam
{
	TransformParam() {}
	//x轴信息，y轴信息，角度信息
	TransformParam(double _dx, double _dy, double _da)
	{
		dx = _dx;
		dy = _dy;
		da = _da;
	}

	double dx;
	double dy;
	// angle
	double da;

	void getTransform(Mat &amp;T)
	{
		// Reconstruct transformation matrix accordingly to new values 重建变换矩阵
		T.at&lt;double&gt;(0, 0) = cos(da);
		T.at&lt;double&gt;(0, 1) = -sin(da);
		T.at&lt;double&gt;(1, 0) = sin(da);
		T.at&lt;double&gt;(1, 1) = cos(da);

		T.at&lt;double&gt;(0, 2) = dx;
		T.at&lt;double&gt;(1, 2) = dy;
	}
};
</code></pre><p>我们循环遍历帧并执行 2.1帧间运动信息获取所有代码。C++代码：</p><pre><code>	//previous transformation matrix 上一张图像的仿射矩阵
	Mat last_T;
	//从第二帧开始循环遍历视频所有帧
	for (int i = 1; i &lt; n_frames; i++)
	{
		// Vector from previous and current feature points 前一帧角点vector，当前帧角点vector
		vector&lt;Point2f&gt; prev_pts, curr_pts;

		// Detect features in previous frame 获取前一帧的角点
		//前一帧灰度图，前一帧角点vector, 最大角点数，检测到的角点的质量等级，两个角点之间的最小距离
		goodFeaturesToTrack(prev_gray, prev_pts, 200, 0.01, 30);

		// Read next frame 读取当前帧图像
		bool success = cap.read(curr);
		if (!success)
		{
			break;
		}

		// Convert to grayscale 将当前帧图像转换为灰度图
		cvtColor(curr, curr_gray, COLOR_BGR2GRAY);

		// Calculate optical flow (i.e. track feature points) 光流法追寻特征点
		//输出状态矢量(元素是无符号char类型，uchar)，如果在当前帧发现前一帧角点特征则置为1，否则，为0
		vector&lt;uchar&gt; status;
		//输出误差矢量
		vector&lt;float&gt; err;
		//光流跟踪
		//前一帧灰度图像，当前帧灰度图像，前一帧角点，当前帧角点，状态量，误差量
		calcOpticalFlowPyrLK(prev_gray, curr_gray, prev_pts, curr_pts, status, err);

		// Filter only valid points 获取光流跟踪下有效的角点
		//遍历角点
		auto prev_it = prev_pts.begin();
		auto curr_it = curr_pts.begin();
		for (size_t k = 0; k &lt; status.size(); k++)
		{
			if (status[k])
			{
				prev_it++;
				curr_it++;
			}
			//删除无效角点
			else
			{
				prev_it = prev_pts.erase(prev_it);
				curr_it = curr_pts.erase(curr_it);
			}
		}

		// Find transformation matrix 获得变换矩阵
		//false表示带几何约束的仿射变换，true则是全仿射变化，T为变换矩阵
		Mat T = estimateRigidTransform(prev_pts, curr_pts, false);

		// In rare cases no transform is found.
		// We&#39;ll just use the last known good transform.
		//极少数情况会找不到变换矩阵，取上一个变换为当前变化矩阵
		//当然第一次检测就没找到仿射矩阵，算法会出问题，不过概率很低
		if (T.data == NULL)
		{
			last_T.copyTo(T);
		}
		T.copyTo(last_T);

		// Extract traslation 提取仿射变化结果
		double dx = T.at&lt;double&gt;(0, 2);
		double dy = T.at&lt;double&gt;(1, 2);

		// Extract rotation angle 提取角度
		double da = atan2(T.at&lt;double&gt;(1, 0), T.at&lt;double&gt;(0, 0));

		// Store transformation 存储仿射变化矩阵
		transforms.push_back(TransformParam(dx, dy, da));

		// Move to next frame 进行下一次检测准测
		curr_gray.copyTo(prev_gray);

		cout &lt;&lt; &quot;Frame: &quot; &lt;&lt; i &lt;&lt; &quot;/&quot; &lt;&lt; n_frames &lt;&lt; &quot; -  Tracked points : &quot; &lt;&lt; prev_pts.size() &lt;&lt; endl;
	}
</code></pre><h3 id="_2-2-计算帧之间的总体运动" tabindex="-1"><a class="header-anchor" href="#_2-2-计算帧之间的总体运动"><span><strong>2.2</strong> <strong>计算帧之间的总体运动</strong></span></a></h3><p>在上一步中，我们获取了帧之间的运动情况并将它们存储在一个数组中。我们现在需要通过累积分析帧间运动情况来找到运动轨迹。</p><h4 id="_2-2-1-计算运动轨迹" tabindex="-1"><a class="header-anchor" href="#_2-2-1-计算运动轨迹"><span>2.2.1 计算运动轨迹</span></a></h4><p>在此步骤中，我们将累加帧之间的运动以计算轨迹。我们的最终目标是平滑这一轨迹。</p><p>在Python中，使用numpy中的cumsum（累积和）很容易实现。</p><p>在C ++中，我们定义了一个名为Trajectory的类来存储运动参数每次的累积和。</p><pre><code>/**
 * @brief 轨迹结构体
 *
 */
struct Trajectory
{
	Trajectory() {}
	Trajectory(double _x, double _y, double _a)
	{
		x = _x;
		y = _y;
		a = _a;
	}

	double x;
	double y;
	// angle
	double a;
};
</code></pre><p>我们还定义了一个函数cumsum，输入为TransformParams结构数据，并通过dx，dy和da（角度）的累积和来返回轨迹信息。C++代码：</p><pre><code>/**
 * @brief 轨迹累积
 *
 * @param transforms 运动信息结构体
 * @return vector&lt;Trajectory&gt; 轨迹结构体
 */
vector&lt;Trajectory&gt; cumsum(vector&lt;TransformParam&gt; &amp;transforms)
{
	// trajectory at all frames 所有帧的运动轨迹
	vector&lt;Trajectory&gt; trajectory;
	// Accumulated frame to frame transform 累加计算x,y以及a（角度）
	double a = 0;
	double x = 0;
	double y = 0;

	//累加
	for (size_t i = 0; i &lt; transforms.size(); i++)
	{
		x += transforms[i].dx;
		y += transforms[i].dy;
		a += transforms[i].da;

		trajectory.push_back(Trajectory(x, y, a));
	}

	return trajectory;
}
</code></pre><h4 id="_2-2-2-计算平滑轨迹" tabindex="-1"><a class="header-anchor" href="#_2-2-2-计算平滑轨迹"><span>2.2.2 计算平滑轨迹</span></a></h4><p>在上一步中，我们计算了运动的轨迹。因此，我们有三条曲线显示运动（x，y和角度）随时间的变化情况。</p><p>在这一步中，我们将展示如何平滑这三条曲线。</p><p>平滑任何曲线的最简单方法是使用移动平均滤波器。顾名思义，移动平均滤波器将该点处的函数值替换为邻域窗格所有点的平均值。我们来看一个例子。</p><p>比方说，我们已经存储在数组中的曲线C，曲线上的点为C [0], ... ,C [N-1]。，用窗宽为5的移动平均滤波器对曲线c滤波可以得到平滑的曲线 <em>f</em> 。计算公式如下：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如下图，平滑曲线的值是在小窗口上平均左侧噪声曲线的值。下图显示了左侧噪声曲线的示例，使用右侧大小为5移动平均滤波器进行平滑处理。</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在C ++版本中，我们定义了一个名为smooth的函数，它计算平滑的移动平均轨迹。</p><pre><code>/**
 * @brief 平滑运动轨迹
 *
 * @param trajectory 运动轨迹
 * @param radius 窗格大小
 * @return vector&lt;Trajectory&gt;
 */
vector&lt;Trajectory&gt; smooth(vector&lt;Trajectory&gt; &amp;trajectory, int radius)
{
	//平滑后的运动轨迹
	vector&lt;Trajectory&gt; smoothed_trajectory;
	//移动滑动窗格
	for (size_t i = 0; i &lt; trajectory.size(); i++)
	{
		double sum_x = 0;
		double sum_y = 0;
		double sum_a = 0;
		int count = 0;

		for (int j = -radius; j &lt;= radius; j++)
		{
			if (i + j &gt;= 0 &amp;&amp; i + j &lt; trajectory.size())
			{
				sum_x += trajectory[i + j].x;
				sum_y += trajectory[i + j].y;
				sum_a += trajectory[i + j].a;

				count++;
			}
		}

		double avg_a = sum_a / count;
		double avg_x = sum_x / count;
		double avg_y = sum_y / count;

		smoothed_trajectory.push_back(Trajectory(avg_x, avg_y, avg_a));
	}

	return smoothed_trajectory;
}
</code></pre><h4 id="_2-2-3-平滑变化计算" tabindex="-1"><a class="header-anchor" href="#_2-2-3-平滑变化计算"><span>2.2.3 平滑变化计算</span></a></h4><p>到目前为止，我们已经获得了平滑的轨迹。在此步骤中，我们将使用平滑轨迹来获得平滑变换，这些变换可应用于视频帧以使其稳定。这是通过找到平滑轨迹和原始轨迹之间的差异并将该差异添加原始变换矩阵来完成的。C++代码：</p><pre><code>	//平滑后的运动信息结构体
	vector&lt;TransformParam&gt; transforms_smooth;

	//原始运动信息结构体
	for (size_t i = 0; i &lt; transforms.size(); i++)
	{
		// Calculate difference in smoothed_trajectory and trajectory 计算平滑后的轨迹和原始轨迹差异
		double diff_x = smoothed_trajectory[i].x - trajectory[i].x;
		double diff_y = smoothed_trajectory[i].y - trajectory[i].y;
		double diff_a = smoothed_trajectory[i].a - trajectory[i].a;

		// Calculate newer transformation array 计算平滑后的运动信息结构体数据
		double dx = transforms[i].dx + diff_x;
		double dy = transforms[i].dy + diff_y;
		double da = transforms[i].da + diff_a;

		transforms_smooth.push_back(TransformParam(dx, dy, da));
	}
</code></pre><h3 id="_2-3-将平滑后的变化矩阵应用于帧" tabindex="-1"><a class="header-anchor" href="#_2-3-将平滑后的变化矩阵应用于帧"><span><strong>2.3</strong> <strong>将平滑后的变化矩阵应用于帧</strong></span></a></h3><p>我们差不多完成了。我们现在需要做的就是遍历帧并应用我们刚刚计算的变换。</p><p>如果我们将运动指定为 <em>x</em> , <em>y</em> , <em>θ</em> <img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/6.png" alt="" loading="lazy"> ，则相应的变换矩阵由下式给出：</p><figure><img src="https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当我们稳定视频时，我们可能会看到一些黑色边界。这是预期的，因为要稳定视频，视频帧原图像可能不得不缩小（不是图的尺寸缩小，图像尺寸不变。有两种情况，一种实际先缩小图像，然后从中截取原图大小的区域，缺少图像区域用黑色填充，起到图像增大作用；另外将原图扩大，然后截取原图尺寸相等大小区域，起到图像缩小作用）。我们可以通过以其视频中点为中心缩放图像（例如4％）来缓解该问题。下面的函数fixBorder显示了实现。我们使用getRotationMatrix2D，因为它可以在不移动图像中心的情况下缩放和旋转图像。我们需要做的就是调用此函数，旋转0和缩放1.04(将原图扩大为1.04倍，然后截取原图尺寸相等大小区域)。C++代码如下：</p><pre><code>/**
 * @brief 
 * 
 * @param frame_stabilized 
 */
void fixBorder(Mat &amp;frame_stabilized)
{
	//将原图扩大为1.04倍，然后截取原图尺寸相等大小区域
	Mat T = getRotationMatrix2D(Point2f(frame_stabilized.cols / 2, frame_stabilized.rows / 2), 0, 1.04);
	//仿射变换
	warpAffine(frame_stabilized, frame_stabilized, T, frame_stabilized.size());
}
</code></pre><h2 id="_3-结果和代码" tabindex="-1"><a class="header-anchor" href="#_3-结果和代码"><span>3 结果和代码</span></a></h2><h3 id="_3-1-总结" tabindex="-1"><a class="header-anchor" href="#_3-1-总结"><span>3.1 总结</span></a></h3><p>优点：</p><ul><li>该方法对低频运动（较慢的振动）提供了良好的稳定性。</li><li>该方法具有低内存消耗，因此非常适用于嵌入式设备（如Raspberry Pi）。</li><li>此方法可以很好地防止视频中的缩放（缩放）抖动。</li></ul><p>缺点：</p><ul><li>该方法对高频扰动的影响很小。</li><li>速度过慢。</li><li>如果运动模糊，则功能跟踪将失败，结果将不是最佳。</li><li>滚动快门失真也不适合这种方法。</li></ul><h3 id="_3-2-代码" tabindex="-1"><a class="header-anchor" href="#_3-2-代码"><span>3.2 代码</span></a></h3><p>代码地址：</p><p><a href="https://download.csdn.net/download/luohenyj/11007133" target="_blank" rel="noopener noreferrer"> https://download.csdn.net/download/luohenyj/11007133 </a></p><p><a href="https://github.com/luohenyueji/OpenCV-Practical-Exercise" target="_blank" rel="noopener noreferrer"> https://github.com/luohenyueji/OpenCV-Practical-Exercise </a></p><p>如果没有积分（系统自动设定资源分数）看看参考链接。我搬运过来的，大修改没有。</p><p>代码提供了C++和Python版本，代码都有详细的注释。</p><p><strong>但是需要注意的是提供的示例detect.mp4在1300帧后有丢帧现象，有些OpenCV版本会出问题，所以设定n_frames=1300只读取前1300帧，运行其他视频需要注意n_frames 的手动设定。</strong></p><p>C++：</p><pre><code>// video_stabilization.cpp : 此文件包含 &quot;main&quot; 函数。程序执行将在此处开始并结束。
//

#include &quot;pch.h&quot;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;iostream&gt;
#include &lt;cassert&gt;
#include &lt;cmath&gt;
#include &lt;fstream&gt;

using namespace std;
using namespace cv;

// In frames. The larger the more stable the video, but less reactive to sudden panning 移动平均滑动窗口大小
const int SMOOTHING_RADIUS = 50;

/**
 * @brief 运动信息结构体
 *
 */
struct TransformParam
{
	TransformParam() {}
	//x轴信息，y轴信息，角度信息
	TransformParam(double _dx, double _dy, double _da)
	{
		dx = _dx;
		dy = _dy;
		da = _da;
	}

	double dx;
	double dy;
	// angle
	double da;

	void getTransform(Mat &amp;T)
	{
		// Reconstruct transformation matrix accordingly to new values 重建变换矩阵
		T.at&lt;double&gt;(0, 0) = cos(da);
		T.at&lt;double&gt;(0, 1) = -sin(da);
		T.at&lt;double&gt;(1, 0) = sin(da);
		T.at&lt;double&gt;(1, 1) = cos(da);

		T.at&lt;double&gt;(0, 2) = dx;
		T.at&lt;double&gt;(1, 2) = dy;
	}
};

/**
 * @brief 轨迹结构体
 *
 */
struct Trajectory
{
	Trajectory() {}
	Trajectory(double _x, double _y, double _a)
	{
		x = _x;
		y = _y;
		a = _a;
	}

	double x;
	double y;
	// angle
	double a;
};

/**
 * @brief 轨迹累积
 *
 * @param transforms 运动信息结构体
 * @return vector&lt;Trajectory&gt; 轨迹结构体
 */
vector&lt;Trajectory&gt; cumsum(vector&lt;TransformParam&gt; &amp;transforms)
{
	// trajectory at all frames 所有帧的运动轨迹
	vector&lt;Trajectory&gt; trajectory;
	// Accumulated frame to frame transform 累加计算x,y以及a（角度）
	double a = 0;
	double x = 0;
	double y = 0;

	//累加
	for (size_t i = 0; i &lt; transforms.size(); i++)
	{
		x += transforms[i].dx;
		y += transforms[i].dy;
		a += transforms[i].da;

		trajectory.push_back(Trajectory(x, y, a));
	}

	return trajectory;
}

/**
 * @brief 平滑运动轨迹
 *
 * @param trajectory 运动轨迹
 * @param radius 窗格大小
 * @return vector&lt;Trajectory&gt;
 */
vector&lt;Trajectory&gt; smooth(vector&lt;Trajectory&gt; &amp;trajectory, int radius)
{
	//平滑后的运动轨迹
	vector&lt;Trajectory&gt; smoothed_trajectory;
	//移动滑动窗格
	for (size_t i = 0; i &lt; trajectory.size(); i++)
	{
		double sum_x = 0;
		double sum_y = 0;
		double sum_a = 0;
		int count = 0;

		for (int j = -radius; j &lt;= radius; j++)
		{
			if (i + j &gt;= 0 &amp;&amp; i + j &lt; trajectory.size())
			{
				sum_x += trajectory[i + j].x;
				sum_y += trajectory[i + j].y;
				sum_a += trajectory[i + j].a;

				count++;
			}
		}

		double avg_a = sum_a / count;
		double avg_x = sum_x / count;
		double avg_y = sum_y / count;

		smoothed_trajectory.push_back(Trajectory(avg_x, avg_y, avg_a));
	}

	return smoothed_trajectory;
}

/**
 * @brief
 *
 * @param frame_stabilized
 */
void fixBorder(Mat &amp;frame_stabilized)
{
	//将原图扩大为1.04倍，然后截取原图尺寸相等大小区域
	Mat T = getRotationMatrix2D(Point2f(frame_stabilized.cols / 2, frame_stabilized.rows / 2), 0, 1.04);
	//仿射变换
	warpAffine(frame_stabilized, frame_stabilized, T, frame_stabilized.size());
}

int main(int argc, char **argv)
{
	// Read input video 读取视频
	VideoCapture cap(&quot;./video/detect.mp4&quot;);

	// Get frame count 读取视频总帧数
	int n_frames = int(cap.get(CAP_PROP_FRAME_COUNT));
	// Our test video may be wrong to read the frame after frame 1300
	n_frames = 1300;

	// Get width and height of video stream 获取视频图像宽高
	int w = int(cap.get(CAP_PROP_FRAME_WIDTH));
	int h = int(cap.get(CAP_PROP_FRAME_HEIGHT));

	// Get frames per second (fps) 获取视频每秒帧数
	double fps = cap.get(CV_CAP_PROP_FPS);

	// Set up output video 设置输出视频
	VideoWriter out(&quot;video_out.avi&quot;, CV_FOURCC(&#39;M&#39;, &#39;J&#39;, &#39;P&#39;, &#39;G&#39;), fps, Size(2 * w, h));

	// Define variable for storing frames 定义存储帧的相关变量
	//当前帧RGB图像和灰度图
	Mat curr, curr_gray;
	//前一帧RGB图像和灰度图
	Mat prev, prev_gray;

	// Read first frame 获得视频一张图象
	cap &gt;&gt; prev;

	// Convert frame to grayscale 转换为灰度图
	cvtColor(prev, prev_gray, COLOR_BGR2GRAY);

	// Pre-define transformation-store array 仿射变化参数结构体
	vector&lt;TransformParam&gt; transforms;

	//previous transformation matrix 上一张图像的仿射矩阵
	Mat last_T;
	//从第二帧开始循环遍历视频所有帧
	for (int i = 1; i &lt; n_frames; i++)
	{
		// Vector from previous and current feature points 前一帧角点vector，当前帧角点vector
		vector&lt;Point2f&gt; prev_pts, curr_pts;

		// Detect features in previous frame 获取前一帧的角点
		//前一帧灰度图，前一帧角点vector, 最大角点数，检测到的角点的质量等级，两个角点之间的最小距离
		goodFeaturesToTrack(prev_gray, prev_pts, 200, 0.01, 30);

		// Read next frame 读取当前帧图像
		bool success = cap.read(curr);
		if (!success)
		{
			break;
		}

		// Convert to grayscale 将当前帧图像转换为灰度图
		cvtColor(curr, curr_gray, COLOR_BGR2GRAY);

		// Calculate optical flow (i.e. track feature points) 光流法追寻特征点
		//输出状态矢量(元素是无符号char类型，uchar)，如果在当前帧发现前一帧角点特征则置为1，否则，为0
		vector&lt;uchar&gt; status;
		//输出误差矢量
		vector&lt;float&gt; err;
		//光流跟踪
		//前一帧灰度图像，当前帧灰度图像，前一帧角点，当前帧角点，状态量，误差量
		calcOpticalFlowPyrLK(prev_gray, curr_gray, prev_pts, curr_pts, status, err);

		// Filter only valid points 获取光流跟踪下有效的角点
		//遍历角点
		auto prev_it = prev_pts.begin();
		auto curr_it = curr_pts.begin();
		for (size_t k = 0; k &lt; status.size(); k++)
		{
			if (status[k])
			{
				prev_it++;
				curr_it++;
			}
			//删除无效角点
			else
			{
				prev_it = prev_pts.erase(prev_it);
				curr_it = curr_pts.erase(curr_it);
			}
		}

		// Find transformation matrix 获得变换矩阵
		//false表示带几何约束的仿射变换，true则是全仿射变化，T为变换矩阵
		Mat T = estimateRigidTransform(prev_pts, curr_pts, false);

		// In rare cases no transform is found.
		// We&#39;ll just use the last known good transform.
		//极少数情况会找不到变换矩阵，取上一个变换为当前变化矩阵
		//当然第一次检测就没找到仿射矩阵，算法会出问题，不过概率很低
		if (T.data == NULL)
		{
			last_T.copyTo(T);
		}
		T.copyTo(last_T);

		// Extract traslation 提取仿射变化结果
		double dx = T.at&lt;double&gt;(0, 2);
		double dy = T.at&lt;double&gt;(1, 2);

		// Extract rotation angle 提取角度
		double da = atan2(T.at&lt;double&gt;(1, 0), T.at&lt;double&gt;(0, 0));

		// Store transformation 存储仿射变化矩阵
		transforms.push_back(TransformParam(dx, dy, da));

		// Move to next frame 进行下一次检测准测
		curr_gray.copyTo(prev_gray);

		cout &lt;&lt; &quot;Frame: &quot; &lt;&lt; i &lt;&lt; &quot;/&quot; &lt;&lt; n_frames &lt;&lt; &quot; -  Tracked points : &quot; &lt;&lt; prev_pts.size() &lt;&lt; endl;
	}

	// Compute trajectory using cumulative sum of transformations 获取累加轨迹
	vector&lt;Trajectory&gt; trajectory = cumsum(transforms);

	// Smooth trajectory using moving average filter 获取平滑后的轨迹
	vector&lt;Trajectory&gt; smoothed_trajectory = smooth(trajectory, SMOOTHING_RADIUS);

	//平滑后的运动信息结构体
	vector&lt;TransformParam&gt; transforms_smooth;

	//原始运动信息结构体
	for (size_t i = 0; i &lt; transforms.size(); i++)
	{
		// Calculate difference in smoothed_trajectory and trajectory 计算平滑后的轨迹和原始轨迹差异
		double diff_x = smoothed_trajectory[i].x - trajectory[i].x;
		double diff_y = smoothed_trajectory[i].y - trajectory[i].y;
		double diff_a = smoothed_trajectory[i].a - trajectory[i].a;

		// Calculate newer transformation array 计算平滑后的运动信息结构体数据
		double dx = transforms[i].dx + diff_x;
		double dy = transforms[i].dy + diff_y;
		double da = transforms[i].da + diff_a;

		transforms_smooth.push_back(TransformParam(dx, dy, da));
	}

	//定位当前帧为第1帧
	cap.set(CV_CAP_PROP_POS_FRAMES, 0);
	//平滑后的变化矩阵
	Mat T(2, 3, CV_64F);
	Mat frame, frame_stabilized, frame_out;

	//对所有帧进行变化得到稳像结果
	//跳过第一帧
	cap.read(frame);
	for (int i = 0; i &lt; n_frames - 1; i++)
	{
		bool success = cap.read(frame);
		if (!success)
		{
			break;
		}
		// Extract transform from translation and rotation angle. 提取平滑后的仿射变化矩阵
		transforms_smooth[i].getTransform(T);

		// Apply affine wrapping to the given frame 应用仿射变化
		warpAffine(frame, frame_stabilized, T, frame.size());

		// Scale image to remove black border artifact 去除黑边
		fixBorder(frame_stabilized);

		// Now draw the original and stablised side by side for coolness 将原图和变化后的图横向排列输出到视频
		hconcat(frame, frame_stabilized, frame_out);

		// If the image is too big, resize it.
		if (frame_out.cols &gt; 1920)
		{
			resize(frame_out, frame_out, Size(frame_out.cols / 2, frame_out.rows / 2));
		}

		//imshow(&quot;Before and After&quot;, frame_out);
		out.write(frame_out);
		cout &lt;&lt; &quot;out frame：&quot; &lt;&lt; i &lt;&lt; endl;
		//waitKey(10);
	}

	// Release video
	cap.release();
	out.release();
	// Close windows
	destroyAllWindows();

	return 0;
}
</code></pre><p>python:</p><pre><code># Import numpy and OpenCV
import numpy as np
import cv2


def movingAverage(curve, radius):
    window_size = 2 * radius + 1
    # Define the filter
    f = np.ones(window_size)/window_size
    # Add padding to the boundaries
    curve_pad = np.lib.pad(curve, (radius, radius), &#39;edge&#39;)
    # Apply convolution
    curve_smoothed = np.convolve(curve_pad, f, mode=&#39;same&#39;)
    # Remove padding
    curve_smoothed = curve_smoothed[radius:-radius]
    # return smoothed curve
    return curve_smoothed


def smooth(trajectory):
    smoothed_trajectory = np.copy(trajectory)
    # Filter the x, y and angle curves
    for i in range(3):
        smoothed_trajectory[:, i] = movingAverage(
            trajectory[:, i], radius=SMOOTHING_RADIUS)

    return smoothed_trajectory


def fixBorder(frame):
    s = frame.shape
    # Scale the image 4% without moving the center
    T = cv2.getRotationMatrix2D((s[1]/2, s[0]/2), 0, 1.04)
    frame = cv2.warpAffine(frame, T, (s[1], s[0]))
    return frame


# The larger the more stable the video, but less reactive to sudden panning
SMOOTHING_RADIUS = 50

# Read input video
cap = cv2.VideoCapture(&#39;video/detect.mp4&#39;)

# Get frame count
n_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# Our test video may be wrong to read the frame after frame 1300
n_frames = 1300

# Get width and height of video stream
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Get frames per second (fps)
fps = cap.get(cv2.CAP_PROP_FPS)

# Define the codec for output video
fourcc = cv2.VideoWriter_fourcc(*&#39;MJPG&#39;)

# Set up output video
out = cv2.VideoWriter(&#39;video_out.avi&#39;, fourcc, fps, (2 * w, h))

# Read first frame
_, prev = cap.read()

# Convert frame to grayscale
prev_gray = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)

# Pre-define transformation-store array
transforms = np.zeros((n_frames-1, 3), np.float32)

for i in range(n_frames-2):
    # Detect feature points in previous frame
    prev_pts = cv2.goodFeaturesToTrack(prev_gray,
                                       maxCorners=200,
                                       qualityLevel=0.01,
                                       minDistance=30,
                                       blockSize=3)

    # Read next frame
    success, curr = cap.read()
    if not success:
        break

    # Convert to grayscale
    curr_gray = cv2.cvtColor(curr, cv2.COLOR_BGR2GRAY)

    # Calculate optical flow (i.e. track feature points)
    curr_pts, status, err = cv2.calcOpticalFlowPyrLK(
        prev_gray, curr_gray, prev_pts, None)

    # Sanity check
    assert prev_pts.shape == curr_pts.shape

    # Filter only valid points
    idx = np.where(status == 1)[0]
    prev_pts = prev_pts[idx]
    curr_pts = curr_pts[idx]

    # Find transformation matrix
    # will only work with OpenCV-3 or less
    m = cv2.estimateRigidTransform(prev_pts, curr_pts, fullAffine=False)

    # Extract traslation
    dx = m[0, 2]
    dy = m[1, 2]

    # Extract rotation angle
    da = np.arctan2(m[1, 0], m[0, 0])

    # Store transformation
    transforms[i] = [dx, dy, da]

    # Move to next frame
    prev_gray = curr_gray

    print(&quot;Frame: &quot; + str(i) + &quot;/&quot; + str(n_frames) +
          &quot; -  Tracked points : &quot; + str(len(prev_pts)))

# Compute trajectory using cumulative sum of transformations
trajectory = np.cumsum(transforms, axis=0)

# Create variable to store smoothed trajectory
smoothed_trajectory = smooth(trajectory)

# Calculate difference in smoothed_trajectory and trajectory
difference = smoothed_trajectory - trajectory

# Calculate newer transformation array
transforms_smooth = transforms + difference

# Reset stream to first frame
cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

# Write n_frames-1 transformed frames
for i in range(n_frames-2):
    # Read next frame
    success, frame = cap.read()
    if not success:
        break

    # Extract transformations from the new transformation array
    dx = transforms_smooth[i, 0]
    dy = transforms_smooth[i, 1]
    da = transforms_smooth[i, 2]

    # Reconstruct transformation matrix accordingly to new values
    m = np.zeros((2, 3), np.float32)
    m[0, 0] = np.cos(da)
    m[0, 1] = -np.sin(da)
    m[1, 0] = np.sin(da)
    m[1, 1] = np.cos(da)
    m[0, 2] = dx
    m[1, 2] = dy

    # Apply affine wrapping to the given frame
    frame_stabilized = cv2.warpAffine(frame, m, (w, h))

    # Fix border artifacts
    frame_stabilized = fixBorder(frame_stabilized)

    # Write the frame to the file
    frame_out = cv2.hconcat([frame, frame_stabilized])

    # If the image is too big, resize it.
    if(frame_out.shape[1] &gt; 1920):
        frame_out = cv2.resize(
            frame_out, (frame_out.shape[1]/2, frame_out.shape[0]/2))

    #cv2.imshow(&quot;Before and After&quot;, frame_out)
    # cv2.waitKey(10)
    out.write(frame_out)

# Release video
cap.release()
out.release()
# Close windows
cv2.destroyAllWindows()
</code></pre><h2 id="_4-参考" tabindex="-1"><a class="header-anchor" href="#_4-参考"><span>4 参考</span></a></h2><ul><li><a href="https://www.learnopencv.com/video-stabilization-using-point-feature-matching-in-opencv/" target="_blank" rel="noopener noreferrer"> https://www.learnopencv.com/video-stabilization-using-point-feature-matching-in-opencv/ </a></li></ul>`,86)]))}const l=n(o,[["render",i],["__file","2019-03-08-_OpenCV实战_6 基于特征点匹配的视频稳像.html.vue"]]),p=JSON.parse('{"path":"/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-08-_OpenCV%E5%AE%9E%E6%88%98_6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F.html","title":"[OpenCV实战]6 基于特征点匹配的视频稳像","lang":"zh-CN","frontmatter":{"date":"2019-03-08T17:29:11.000Z","tag":["OpenCV实战","OpenCV"],"category":["OpenCV"],"description":"[OpenCV实战]6 基于特征点匹配的视频稳像 在这篇文章中，我们将学习如何使用OpenCV库中称为特征点匹配的技术以实现简单视频稳定稳像。我们将讨论该算法并共享代码，以便在OpenCV中使用此方法设计一个简单的稳定器，最好OpenCV3.4.3以上实现代码。什么是视频稳定，视频稳定是指用于减少相机运动对最终视频影响的一系列方法，理解成消除视频抖动就...","head":[["meta",{"property":"og:url","content":"https://luohenyueji.github.io/blog/opencv/opencv%E5%AE%9E%E6%88%98/2019-03-08-_OpenCV%E5%AE%9E%E6%88%98_6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F.html"}],["meta",{"property":"og:site_name","content":"落痕月极的博客"}],["meta",{"property":"og:title","content":"[OpenCV实战]6 基于特征点匹配的视频稳像"}],["meta",{"property":"og:description","content":"[OpenCV实战]6 基于特征点匹配的视频稳像 在这篇文章中，我们将学习如何使用OpenCV库中称为特征点匹配的技术以实现简单视频稳定稳像。我们将讨论该算法并共享代码，以便在OpenCV中使用此方法设计一个简单的稳定器，最好OpenCV3.4.3以上实现代码。什么是视频稳定，视频稳定是指用于减少相机运动对最终视频影响的一系列方法，理解成消除视频抖动就..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/1.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"OpenCV实战"}],["meta",{"property":"article:tag","content":"OpenCV"}],["meta",{"property":"article:published_time","content":"2019-03-08T17:29:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"[OpenCV实战]6 基于特征点匹配的视频稳像\\",\\"image\\":[\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/1.gif\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/2.jpg\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cubGVhcm5vcGVuY3YuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzAxL0FFQU0tMy5wbmc?x-oss-process=image/format,png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/4.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/5.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/6.png\\",\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/%5BOpenCV%E5%AE%9E%E6%88%98%5D6%20%E5%9F%BA%E4%BA%8E%E7%89%B9%E5%BE%81%E7%82%B9%E5%8C%B9%E9%85%8D%E7%9A%84%E8%A7%86%E9%A2%91%E7%A8%B3%E5%83%8F/7.png\\"],\\"datePublished\\":\\"2019-03-08T17:29:11.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"落痕月极\\",\\"url\\":\\"/\\"}]}"]]},"headers":[{"level":2,"title":"1 介绍","slug":"_1-介绍","link":"#_1-介绍","children":[{"level":3,"title":"1.1 视频稳定的方法","slug":"_1-1-视频稳定的方法","link":"#_1-1-视频稳定的方法","children":[]},{"level":3,"title":"1.2 使用点特征匹配的视频稳定","slug":"_1-2-使用点特征匹配的视频稳定","link":"#_1-2-使用点特征匹配的视频稳定","children":[]}]},{"level":2,"title":"2 算法","slug":"_2-算法","link":"#_2-算法","children":[{"level":3,"title":"2.1 帧间运动信息获取","slug":"_2-1-帧间运动信息获取","link":"#_2-1-帧间运动信息获取","children":[]},{"level":3,"title":"2.2 计算帧之间的总体运动","slug":"_2-2-计算帧之间的总体运动","link":"#_2-2-计算帧之间的总体运动","children":[]},{"level":3,"title":"2.3 将平滑后的变化矩阵应用于帧","slug":"_2-3-将平滑后的变化矩阵应用于帧","link":"#_2-3-将平滑后的变化矩阵应用于帧","children":[]}]},{"level":2,"title":"3 结果和代码","slug":"_3-结果和代码","link":"#_3-结果和代码","children":[{"level":3,"title":"3.1 总结","slug":"_3-1-总结","link":"#_3-1-总结","children":[]},{"level":3,"title":"3.2 代码","slug":"_3-2-代码","link":"#_3-2-代码","children":[]}]},{"level":2,"title":"4 参考","slug":"_4-参考","link":"#_4-参考","children":[]}],"git":{},"readingTime":{"minutes":21.53,"words":6460},"filePathRelative":"blog/opencv/opencv实战/2019-03-08-[OpenCV实战]6 基于特征点匹配的视频稳像.md","localizedDate":"2019年3月9日","excerpt":"\\n<p>在这篇文章中，我们将学习如何使用OpenCV库中称为特征点匹配的技术以实现简单视频稳定稳像。我们将讨论该算法并共享代码，以便在OpenCV中使用此方法设计一个简单的稳定器，最好OpenCV3.4.3以上实现代码。什么是视频稳定，视频稳定是指用于减少相机运动对最终视频影响的一系列方法，理解成消除视频抖动就行了。见下图通常用拍摄会出现轻微的抖动，比如手机拍摄视频，后期需要对其进行视频稳像操作。</p>\\n<figure><img src=\\"https://gitlab.com/luohenyueji/article_picture_warehouse/-/raw/main/blog/[OpenCV实战]6 基于特征点匹配的视频稳像/1.gif\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}');export{l as comp,p as data};
