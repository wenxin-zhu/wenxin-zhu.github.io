## Cmake

### 1 Cmake编译项目

![image-20230413011019341](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/image-20230413011019341.png)

> 编写项目代码的步骤

1、新建一个文件夹，用于存放你的项目文件，并且用vscode打开它。

2、新建一个include文件夹，用于存放所有的头文件，注意头文件的编写注意点。

3、新建一个src文件夹，用于存放所有的源文件。

4、根目录下放一个main.cc，用来编写main函数。

5、写好cmake lists文件，存放在根目录。

6、执行以下命令，进行编译

```shell
# 新建一个build文件夹，用于存放cmake编译信息，不用自己管
mkdir build 
# 进入build文件夹
cd build    
# 调用cmake工具，“..”表示cmake lists文件所在的路径。
cmake ..     
# 执行编译链接，得到可执行文件，会自动存放在build文件夹中
make          
# 运行可执行文件（程序）
./tjurm_tutorial 

```

> exec.cmd

```shell
@echo off

if exist build (
    echo build exist
) else (
    mkdir build
)
cd build
cmake -G "MinGW Makefiles" ..
mingw32-make
exe_cmake
```

> CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.5) 
# 项目名称
project(exe_cmake)  

# 设置编译器
set(CMAKE_C_COMPILER "gcc")
set(CMAKE_CXX_COMPILER "g++")

# c++版本为c++11，
set(CMAKE_CXX_STANDARD 11)
# 编译类型:Debug(调试), Release(发布)
set(CMAKE_BUILD_TYPE RELEASE)                               
# C++编译选项(优化程度为-O3)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -w -O3 -g")         

# 头文件所在的目录
include_directories(${CMAKE_SOURCE_DIR}/include)

# 所有的源文件路径
file(GLOB_RECURSE sources ${CMAKE_SOURCE_DIR}/src/*.cpp)

# 可执行文件包含的源文件
add_executable(exe_cmake main.cc ${sources})
```


## Conda

### 1 创建Anaconda 环境

创建环境前需要对conda进行换源

```bash
vim ~/.condarc
```

添加

```bash
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
ssl_verify: true
```

保存并退出(:wq)

```bash
# 创建Anaconda 环境
conda create --name <env_name> <package_names>
# ex: conda create -n python3 python=3.8 numpy pandas
# ex: conda create -n hugging_face python=3.7.6

# 查看现有环境
conda env list

# 切换环境
conda activate <env_name>

# 退出环境
conda deactivate
```


## Docker 文档

### 1 容器创建

``` shell
docker run -dit \
--gpus all \
--shm-size 62g \
-w /root \
-v /home/zwx/model:/model \
-h zwx_torch \
--name zwx_torch \
-p 20008:22\
nvcr.io/nvidia/pytorch:22.09-py3
# --net=host 
# -e DISPLAY=$DISPLAY --privileged=true 
# -v /dev:/dev

docker exec -it zwx_torch bash
```
```shell
docker run -dit --gpus all --shm-size 510g -w /root -v /home/zwx/share:/root/share --net=host -h zwx_sps --name zwx_sps nvcr.io/nvidia/pytorch:23.10-py3
```

### 2 docker命令

**2.1 镜像（image）**

```bash
# 查看镜像文件
docker images
# 删除镜像文件
docker rmi 镜像文件id
```

**2.2 容器（container）**

``` shell
# 查看运行中的容器
docker ps
# 查看所有容器
docker ps -a

# 创建并进入容器(镜像文件名)
docker run -itd image_name /bin/bash
# 启动容器
docker start container_name
# 进入容器（如果从这个容器退出，容器不会停止）
docker exec -it container_name /bin/bash

# 退出容器（停止）
exit
# 退出容器（不停止）
ctrl + P + Q

# 删除容器 (无法删除正在运行的容器，强制删除 rm -f)
docker rm 容器id

# 重新启动容器
docker restart 容器id
# 停止正在运行的容器
docker stop 容器id
# 强制停止正在运行的容器
docker kill 容器id

# 查看更详细的关于某一个容器的信息
docker inspect  容器id/image
```

**2.3 容器转移**

``` shell
# 容器转移
# 容器打包为镜像
docker commit -a “author” -m “the message” container_name image_name:tag
# 将镜像打成tar包
docker save -o name.tar image_name:tag
# 文件的跨服务器传输
scp name.tar zwx@192.168.1.151:/home/zwx/
# 从tar包载入镜像
docker load -i name.tar
```

**2.4 其他实用命令**

``` bash
docker ps -a | grep zwx
```

``` bash
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" -a
```

<!-- [docker容器的导入和导出](https://blog.csdn.net/u014078109/article/details/126243823)

[本地windows vscode远程连接服务器docker容器](https://blog.csdn.net/hxx123520/article/details/127527117)

[Linux如何查看端口](https://blog.csdn.net/jiey0407/article/details/126433640) -->


<!-- ## 其他操作

### 容器连接 -->

<!-- ``` shell
# 创建一个 python 应用的容器
# -P :是容器内部端口随机映射到主机的端口
docker run -d -P training/webapp python app.py
# -p : 是容器内部端口绑定到指定的主机端口
docker run -d -p 5000:5000 training/webapp python app.py
# 指定容器绑定的网络地址
docker run -d -p 127.0.0.1:5001:5000 training/webapp python app.py
# 查看端口的绑定情况(adoring_stonebraker为容器名)，输出：127.0.0.1:5001
docker port adoring_stonebraker 5000

# Docker 容器互联
# 创建一个新的 Docker 网络（-d：参数指定 Docker 网络类型，有 bridge、overlay）
docker network create -d bridge test-net
# 查看当前网络
docker network ls
# 运行一个容器并连接到新建的 test-net 网络
docker run -itd --name test1 --network test-net ubuntu /bin/bash
``` -->

<!-- ### docker中使用nginx镜像布置静态网站

```shell
# 1.导入nginx镜像
[root@docker1 images]# docker load -i nginx.tar
# 2.运行nginx容器
[root@docker1 images]# docker run -it --name  vm1 nginx bash
# 3.容器内设置
root@e0d6fcaf179d:/# cd /usr/share/nginx/html
root@e0d6fcaf179d:/usr/share/nginx/html # echo www.orange_lei.com > index.html 
root@e0d6fcaf179d:/usr/share/nginx/html # cat index.html
# www.orange_lei.com
root@e0d6fcaf179d:/usr/share/nginx/html # cd /usr/sbin/
root@e0d6fcaf179d:/usr/sbin # ./nginx
# 在容器内首先编辑网页html信息，然后启动nginx

# 4.查看nginx容器ip
# 按下ctrl+p然后按ctrl+q就可以将容器打入后台
[root@docker1 images]# docker inspect vm1            ##可以查看具体信息

# 5.测试
[root@docker1 images]# curl 172.17.0.2
# www.orange_lei.com
# 这样一个静态网页就部署好了
``` -->

<!-- ```shell
# 容器外
docker run -d --name nginx01 -v /home/zwx/volume/nginx:/home -p 20101:80 nginx
docker exec -it nginx01 /bin/bash
# 容器内
cd /usr/share/nginx/html
apt update
apt install vim
vim index.html
nginx
exit

# 查看挂载是否成功
docker inspect nginx01

# 停止和开始
docker stop nginx01
docker start nginx01
docker exec -it nginx01 /bin/bash

# 更改文件
cp /home/index.html /usr/share/nginx/html/index.html
``` -->

<!-- ### ubuntu_01

```shell
# 安装python
apt update
apt-get install python3
python3 -V
python3
ctrl + D

# 换源
apt-get install vim
vim /etc/apt/sources.list
 # 清华源
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
 deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
 deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
###
apt update

# yolov5
apt install git
git clone https://github.com/ultralytics/yolov5.git
apt install python3-pip
pip3 -V
pip3 install -r requirements.txt
``` -->

```

## Git

[git教程](https://blog.csdn.net/bjbz_cxy/article/details/116703787?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168879325716800211587219%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=168879325716800211587219&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-116703787-null-null.142^v88^control,239^v2^insert_chatgpt&utm_term=git%20&spm=1018.2226.3001.4187)

### 1 Gitee上传代码

**1.1	首次上传**

1	在Gitee上创建远程仓库git_test

2	配置用户名和邮箱

```bash
git config --global user.name "zwx"
git config --global user.email "1728026380@qq.com"
# 检查配置
# git config user.name
# git config user.email
```

3	本地仓库

```bash
# 进入本地项目目录

# 初始化本地仓库
git init

# 添加项目目录下所有文件至暂存区
git add . 
# 查看当前git状态
# git status

# 提交到本地仓库
git commit -m '本次提交的说明'
```

4	远程仓库

```bash
# 在远程仓库复制http链接
# 如 https://gitee.com/zxmh/git_test.git

# 将本地仓库与远程仓库相连接
git remote add origin https://gitee.com/zxmh/git_test.git

# 将本地仓库中的文件推送至远程仓库中
git push -u origin master
```

**1.2	继续上传**

```bash
git add . 
git commit -m '本次提交的说明'
git push -u origin master
```

**1.3	拉取上传**

```bash
# 拉取代码
git clone https://gitee.com/zxmh/git_test.git

# 上传
cd git_test
git add . 
git commit -m '本次提交的说明'
git push -u origin master
```

### 2 log

```bash
# 显示日志
git log 
# 图形化显示日志
git log --all --graph --decorate
# 更紧凑的视图（最好用）
git log --all --graph --decorate --oneline
```

### 3 diff

```bash
# 显示当前状态与上一次commit的不同
git diff
# 显示当前状态与commit1的不同
git diff commit1
```

### 4 branch

```bash
# 创建分支
git branch name
# 切换分支
git checkout name
# 创建并切换分支
git checkout -b name

# 查看分支
git branch
# 查看分支详细信息
git branch -vv

# 合并name分支到当前分支上来
git merge name
```

###  5 remote 

```bash
# 查看本地仓库的远程仓库
git remote 
# 添加远程仓库（origin是远程仓库的约定俗成的名字）（url可以是网址或者本地路径）
git remote add <name> <url>
# 上传
git push <remote name> <local branch>:<remote branch>
# 下载
git clone <url> <dir name>
# 不获取版本历史信息，更加快速
git clone <url> <dir name> --shallow

# 同步远程仓库的更改到本地
git fetch <remote name>
# 同步远程仓库的更改到本地并与当前分支合并
git pull <remote name>
```

### 6 stash

```bash
# 将工作目录恢复到上一次提交的状态
git stash
# 撤回stash的恢复
git stash pop
```



```bash
# 拉取代码
git clone https://gitee.com/zxmh/git_test.git

# 创建分支
git branch name
# 切换分支
git checkout name

cd git_test
# 将当前文件夹加入到暂存区
git add . 
# 提交到本地仓库
git commit -m '本次提交的说明'
# 提交到远程仓库
git push -u origin master

# 显示日志
git log --all --graph --decorate --oneline

# 更新远程仓库
git fetch --all
```



## vim

### 1 vim个人常用命令

1.   必要的

```bash
vim filename # 使用vim编辑文件（不存在会创建）
i # 进入insert模式（normal）
Esc # 返回normal模式（insert）
ctrl+shift+v # 粘贴（insert）
:wq # 保存并退出（normal）
:q # 不保存直接退出（normal）
:q! # 不保存强制退出（normal）
:w # 保存但不退出
```

2.   高效的

```bash
G # 调到最后一行（normal）
o # 在光标所在行的下插入新的一行（normal）与G配合实现文档尾部添加!

ctrl + d # 向下翻半屏（normal）
行号+G # 快速定位光标到指定行（normal）
gg # 调到首行（normal）
ctrl + u # 向上翻半屏（normal）

dd # 剪切（删除）（normal）
p # 粘贴（normal）
yy # 复制（normal）
u # 撤销（normal）
crtl+r # 重做（normal）

/内容 # 搜索内容
N/n # 在搜索结果中切换上/下一个结果

:s/要替换的关键词/替换后的关键词# 只替换光标所在这一行的第一个满足条件的结果
:%s/要替换的关键词/替换后的关键词/g # 替换全部的关键词

:set nu # 显示行号
:set nonu # 隐藏行号

# 复制多行操作
# 第一步：在命令模式下，直接按小v，进入可视化模式
# 第二步：使用方向键↑ ↓ ← →选择要复制的内容，然后按y键
# 第三步：移动光标，停在需要粘贴的位置，按p键进行粘贴操作
```

### 2 模式


**2.1 插入模式**

| i    | 光标前插入( insert)        |
| ---- | -------------------------- |
| I    | 在行首插入                 |
| a    | 在光标前插入(append)       |
| A    | 在行尾插入                 |
| o    | 在下一行插入(one line)     |
| O    | 在上一行插入               |
| ESC  | jj	Capslok 退出插入模式 |

**2.2 可视模式**

| v        | 进入 |
| -------- | ---- |
| ESC	v | 退出 |

**2.3 命令模式**

： 进入

ESC 退出



**光标移动**

普通模式下：

h ←	j ↓	k ↑	l →

| w    | 跳到下一个单词开头(word)         |
| ---- | :------------------------------- |
| b    | 跳到本单词或下一个单词结尾(back) |
| e    | 跳到本单词或上一个单词开头(end)  |
| ge   | 跳到上一个单词结尾               |
| 0    | 跳到行首                         |
| ^    | 跳到从行首开始第一个非空字符     |
| $    | 跳到行尾                         |
| gg   | 跳到第一行                       |
| G    | 跳到最后一行                     |



![image-20220203144707592](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/01b485d5d0a109664019ee84c7e0370b.png) 

### 3 操作符

![image-20220203145538127](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/af4ca98a31f2f538109af9a10b4863ec.png) 

### 4 操作符+动作

| p            | 粘贴                             |
| ------------ | -------------------------------- |
| u            | 撤销动作+操作符                  |
| ciw          | 选中单词删除并进入插入模式       |
| yiw          | 选中并复制单词                   |
| diw          | 选中并删除单词                   |
| ndd/ncc/nyy  | 向下删除/修改/复制n行,包括当前行 |
| d/c/yf{char} | 删除/修改/复制到向后的char字符   |
| d/c/y ^/$    | 删除/修改/复制到开头/结尾        |
| die          | 删除整个文件                     |
| cie          | 删除整个文件并进入写入模式       |

v+各种操作（可以看到啥被选中了）+操作符（y/c/d）

### 5 大小写转换

<img src="https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/3a6cb9f53dde063073ae57117d3daa80.png" alt="image-20220203155235967" style="zoom: 50%;" /> 


## ssh

### 1 ssh 远程连接 docker 容器

 **1.1 创建和运行容器**

```bash
# 创建容器
docker run -itd --gpus all --name <container_name> -p <your_port>:22 -v <host_dir_name>:/home <image_name> /bin/bash
```
```shell
# 启动容器
docker start <container_name> & docker exec -it <container_name> bash
```

 **1.2 容器内配置**

```bash
# 修改root用户密码(必须要有)
passwd

# 添加用户
# apt install sudo
# sudo adduser username
# sudo vim /etc/sudoers # 在root的下一行添加username的行，退出用:wq!

# 安装ssh
apt update
apt install ssh

# 修改ssh配置文件
vim /etc/ssh/sshd_config  
# 将PasswordAuthentication设置成yes，允许非root用户使用密码远程连接
# （已弃用）将PermitRootLogin 设置为yes  #允许root用户使用ssh登录

# 将公钥放置到远端服务器上，将公钥附加到~/.ssh/authorized_keys中，如cat id_rsa.pub >> ~/.ssh/authorized_keys
# 确保~/.ssh/目录的权限700，~/.ssh/authorized_keys文件的权限是600

# 启动sshd服务
/etc/init.d/ssh restart 
```

 **1.3 连接容器**

```bash
ip：宿主机ip
端口号：第一步的 <your_port>
用户名：root
密码：passwd设置的密码
```


### 2 ssh免密登录

windows用户目录下的.ssh目录下的id_rsa.pub为公钥

将其上传到需要进行免密登录的用户的主目录下的.ssh文件夹中，并且重命名为authorized_keys，如：`/home/zwx/.ssh/authorized_keys`

### 3 端口转发

这里将服务器7899端口转发到PC clash 7890 端口，走PC校园网，不耗费服务器流量

PC端（server-port为ssh连接所用端口）

```shell
ssh -NR 7899:127.0.0.1:7890 user@server-ip -p server-port
```

服务器端

```shell
export https_proxy=http://127.0.0.1:7899
export http_proxy=http://127.0.0.1:7899
all_proxy=socks5://127.0.0.1:7899
export HF_ENDPOINT=https://hf-mirror.com
```
```shell
# alias setproxy='function _setproxy() { export https_proxy=http://127.0.0.1:$1 && export http_proxy=http://127.0.0.1:$1 && all_proxy=socks5://127.0.0.1:$1; }; _setproxy'
```

下载模型权重（[https://hf-mirror.com/](https://hf-mirror.com/)）

```shell
huggingface-cli download --resume-download facebook/opt-66b --local-dir YOUR_PATH --exclude *.msgpack *.h5 *.safetensors
```
```shell
# cp -r ~/.cache/huggingface/hub/models--XXX /home/share/models
```



## 图床

### 1 图床配置

Typora + PicGo + 阿里云OSS 图床


[手把手教你Typora图床配置(PicGo+阿里云OSS/腾讯云COS)](https://blog.csdn.net/qq_51808107/article/details/124044961)

**picgo配置**

![image-20230804111437131](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/image-20230804111437131.png)


**typora配置**

![image-20230804111530818](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/image-20230804111530818.png)


## 别名

### 1 alias 命令

输入一长串包含许多选项的命令会非常麻烦。因此，大多数 shell 都支持设置别名。shell 的别名相当于一个长命令的缩写，shell 会自动将其替换成原本的命令。例如，bash 中的别名语法如下：

```
alias alias_name="command_to_alias arg1 arg2"
```

注意， `=`两边是没有空格的，因为 [`alias`](https://www.man7.org/linux/man-pages/man1/alias.1p.html) 是一个 shell 命令，它只接受一个参数。

别名有许多很方便的特性:

```bash
# 查看现有的别名
alias

# 创建常用命令的缩写
alias ll="ls -lh"

# 能够少输入很多
alias gs="git status"
alias gc="git commit"
alias v="vim"

# 手误打错命令也没关系
alias sl=ls

# 重新定义一些命令行的默认行为
alias mv="mv -i"           # -i prompts before overwrite
alias mkdir="mkdir -p"     # -p make parent dirs as needed
alias df="df -h"           # -h prints human readable format

# 别名可以组合使用
alias la="ls -A"
alias lla="la -l"

# 忽略某个别名
\ls
# 或者禁用别名
unalias la

# 获取别名的定义
alias ll
# 会打印 ll='ls -lh'
```

值得注意的是，在默认情况下 shell 并不会保存别名。为了让别名持续生效，您需要将配置放进 shell 的启动文件里，像是`.bashrc` 或 `.zshrc`。

`sudo vim ~/.bashrc`文件末尾加入要持续生效的命令即可。

### 2 个人常用的别名

```bash
alias sau='sudo apt update'
alias sai='sudo apt install'
alias bashrc='sudo vim ~/.bashrc'
alias s='sudo'

alias sds='sudo docker start'
alias sde='sudo docker exec -it'
alias gc='git clone'

alias setproxy='function _setproxy() { export https_proxy=http://127.0.0.1:$1 && export http_proxy=http://127.0.0.1:$1 && all_proxy=socks5://127.0.0.1:$1; }; _setproxy'
```








