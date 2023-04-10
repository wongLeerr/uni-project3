### 项目重点内容:
### 1.使用事件委托完成对项目的优化（商品分类一级分类中将每一项的点击事件委托至其公共父元素，通过给每一项指定id为其index，再通过event.target.id拿到具体点击的那一项）
### 2.解决切换tab栏时滚动条不会自动归顶的问题（比如在大家电一级导航中将右侧的二级列表向下滚动了一些位置，再切换至热门推荐时滚动条不会自动从顶部开始，而是还是刚才的那个位置，通过给二级滚动标签绑定scrollTop属性，在每次切换一级分类时实现将scrollTop置零的操作）
### 3.解决自定义组件无法直接绑定原生事件的问题。（在自定义组件中将事件绑定到原生DOM上，通过触发父组件绑定的事件实现执行父组件中回调的问题）
### 4.实现将搜索页面历史记录持久化存储。
###### git命令：
###### git status 查看当前分支状态（有没有添加到暂存区？有没有提交到本地库）
###### git add . 将本地由git接管的所有文件添加到暂存区
###### git commit -m "description"将暂存区的文件提交到本地库
###### git push -u(第一次提交需要添加-u) origin master 将master分支提交到远程仓库
###### git checkout master 切换至master分支
###### git merge tabbar （若当前在master分支下，则将tabber分支合并至master分支）
###### git branch 查看当前分支
###### git branch -d tabbar 删除本地库中的tabbar分支 （确保自己不在tabbar分支才可删除tabbar分支）
###### git checkout -b home 创建home分支（基于master分支）并且切换到home分支
# 注意，不要在微信开发者工具中直接修改代码，因为那里的代码是由这里编译生成的，应该在这里改才对。
# 配置tabBar还是在pages.json(在小程序中是app.json)文件中的tabBar节点中进行配置。
# 注意，配置tabBar时，list数组中的pagePath不应该以.或者/开头，应该直接以pages开头才对。
# 把所有出现黑马优购的地方换成乐优购。
# 开发tabBar页面时需要进行创建tabBar分支，tabBar开发完毕后应该将此分支提交至远程库进行保存，随后应该将tabBar分支与本地master分支进行合并（合并完以后将基于此继续向下开发），最后删除本地的tabBar分支即可（远程那里还有保存，本地无需保存了）。
# 配置分包，应该在pages.json文件中指定subpackages节点，此节点为一个数组，里面有多少个对象就代表里面有多少个分包，每个分包又可以指定很多页面。
# 如何在循环遍历一个数组进行展示时剔除第一项，循环遍历所有元素，使用v-if或者v-show结合index隐藏掉第一项。
# 实现页面的滑动需要用到scroll-view组件，必须为此组件指定scroll-y或者scroll-x属性，若指定scroll-y则需指定高度，若指定scroll-x则需指定宽度
# uni.getSystemInfo用于获取当前设备的型号、屏幕宽高、可使用区域的宽高等信息。
# 