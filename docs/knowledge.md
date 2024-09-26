# 一些知识

## Unix/Linux 命令参考

### 1 note

```shell
sudo netstat -anp | grep :80
# -a 显示所有活动连接和监听端口
# -n 以数字形式显示IP地址和端口号，而不是尝试解析主机名和网络名
# -p 显示与每个连接或端口相关联的进程信息（进程ID/进程名）
# netstat -a | grep 7899 # 查看已经连接的服务端口（ESTABLISHED）
# netstat -ap | grep 7899 # 查看所有的服务端口（LISTEN ESTABLISHED）
# netstat -nalt # 查看系统当前网络状态和连接情况，也可以用来查看端口转发的情况

alias setproxy='function _setproxy() { export https_proxy=http://127.0.0.1:$1 && export http_proxy=http://127.0.0.1:$1 && all_proxy=socks5://127.0.0.1:$1; }; _setproxy'
```

### 2 文件命令

```shell
ls – # 列出目录
ls -al – # 使用格式化列出隐藏文件
cd dir - # 更改目录到 dir
cd # 更改到 home 目录
pwd # 显示当前目录
mkdir dir # 创建目录 dir
rm file # 删除 file
rm -r dir # 删除目录 dir
rm -f file # 强制删除 file
rm -rf dir # 强制删除目录 dir *
cp file1 file2 # 将 file1 复制到 file2
cp -r dir1 dir2 # 将 dir1 复制到 dir2; 如果 dir2 不存在则创建它
mv file1 file2 # 将 file1 重命名或移动到 file2; 如果file2 是一个存在的目录则将 file1 移动到目录 file2 中
ln -s file link # 创建 file 的符号连接 link
touch file # 创建 file
cat > file # 将标准输入添加到 file
more file # 查看 file 的内容
head file # 查看 file 的前 10 行
tail file # 查看 file 的后 10 行
tail -f file # 从后 10 行开始查看 file 的内容
```

### 3 进程管理

```sh
ps # 显示当前的活动进程
top # 显示所有正在运行的进程
kill pid # 杀掉进程 id pid
killall proc # 杀掉所有名为 proc 的进程 *
bg # 列出已停止或后台的作业
fg # 将最近的作业带到前台
fg n # 将作业 n 带到前台
```

### 4 文件权限

```shell
chmod octal file # 更改 file 的权限
● 4 – 读 (r)
● 2 – 写 (w)
● 1 – 执行 (x)
示例:
chmod 777 # 为所有用户添加读、写、执行权限
chmod 755 # 为所有者添加 rwx 权限, 为组和其他用户添加
rx 权限
更多选项参阅 man chmod.
```

### 5 SSH

```shell
ssh user@host # 以 user 用户身份连接到 host
ssh -p port user@host # # 在端口 port 以 user 用户身份连接到 host
ssh-copy-id user@host # 将密钥添加到 host 以实现无密码登录
```

### 6 搜索

```shell
grep pattern files # 搜索 files 中匹配 pattern 的内容
grep -r pattern dir # 递归搜索 dir 中匹配 pattern 的内容
command | grep pattern # 搜索 command 输出中匹配pattern 的内容
```

### 7 系统信息

```shell
date # 显示当前日期和时间
cal # 显示当月的日历
uptime # 显示系统从开机到现在所运行的时间
w # 显示登录的用户
whoami # 查看你的当前用户名
finger user # 显示 user 的相关信息
uname -a # 显示内核信息
cat /proc/cpuinfo # 查看 cpu 信息
cat /proc/meminfo # 查看内存信息
man command # 显示 command 的说明手册
df # 显示磁盘占用情况
du # 显示目录空间占用情况
free # 显示内存及交换区占用情况
```

### 8 压缩

```shell
tar cf file.tar files # 创建包含 files 的 tar 文件 file.tar
tar xf file.tar # 从 file.tar 提取文件
tar czf file.tar.gz files # 使用 Gzip 压缩创建tar 文件
tar xzf file.tar.gz # 使用 Gzip 提取 tar 文件
tar cjf file.tar.bz2 # 使用 Bzip2 压缩创建 tar 文件
tar xjf file.tar.bz2 # 使用 Bzip2 提取 tar 文件
gzip file # 压缩 file 并重命名为 file.gz
gzip -d file.gz # 将 file.gz 解压缩为 file
```

### 9 网络

```python
ping host # ping host 并输出结果
whois domain # 获取 domain 的 whois 信息
dig domain # 获取 domain 的 DNS 信息
dig -x host # 逆向查询 host
wget file # 下载 file
wget -c file # 断点续传
```

### 10 安装

```shell
从源代码安装:
./configure
make
make install
dpkg -i pkg.deb # 安装包 (Debian)
rpm -Uvh pkg.rpm # 安装包 (RPM)
```

### 11 快捷键

```shell
Ctrl+C # 停止当前命令
Ctrl+Z # 停止当前命令，并使用 fg 恢复
Ctrl+D # 注销当前会话，与 exit 相似
Ctrl+W # 删除当前行中的字
Ctrl+U # 删除整行
!! # 重复上次的命令
exit # 注销当前会话
```

## ubuntu换源

### ubuntu换源流程

通常我们使用ubuntu虚拟机的时候总是出现网络过慢导致的更新下载失败等问题

原因：Ubuntu默认的服务器是在国外，自然连接就很慢。

国内有许多可用的镜像源，只需要更改镜像源，就能从国内的镜像源下载你需要的软件、工具等。 推荐使用清华镜像源，如果需要使用其他镜像源可以查询相关镜像官网，并更换对应的镜像源码即可，操作步骤都如下。

下面介绍更换清华镜像源的方法

1.打开Ubuntu的控制台（快捷键ctrl+Alt T）

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Yaw5bGx5Li25LiA6KeS,size_20,color_FFFFFF,t_70,g_se,x_16.png)

2.进入 /etc/apt/路径

``` bash
cd /etc/apt/
```

3.将sources.list备份保存为sources.backup.list,以防止有需要的时候更换回来

``` bash
cp -a sources.list sources.backup.list
```

4.打开[清华镜像](https://mirrors.tuna.tsinghua.edu.cn/)官方,在搜索框输入ubuntu ,点击ubuntu旁边的小问号

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Yaw5bGx5Li25LiA6KeS,size_20,color_FFFFFF,t_70,g_se,x_16-16849501606703.png)

 5.根据相应的版本复制镜像源码，查看ubuntu版本

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/b070f8ab61b74615bdb0c8847802f02b.png)

> nx是arm架构，这里要使用ubuntu-ports镜像

查看版本方法： 

``` bash
cat /etc/issue
```

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Yaw5bGx5Li25LiA6KeS,size_10,color_FFFFFF,t_70,g_se,x_16.png)

这里我的版本号是：21.10，需要在清华网站上选择相应的版本后再复制镜像源码

 6.打开sources.list

``` bash
sudo gedit sources.list
```

7.将sources.list内的内容清空，粘贴刚刚复制的镜像源，并保存（save）

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Yaw5bGx5Li25LiA6KeS,size_20,color_FFFFFF,t_70,g_se,x_16-168495025259310.png)

8.更新镜像源

``` bash
 sudo apt-get update
```

![img](https://zwx-pic.oss-cn-beijing.aliyuncs.com/img/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Yaw5bGx5Li25LiA6KeS,size_20,color_FFFFFF,t_70,g_se,x_16-168495027843013.png)



> 转载自[ubuntu更改镜像源](https://blog.csdn.net/qq_57171795/article/details/123109463)

## HTTP Error

|Error code|解释|
| --- | --- |
|HTTP 400 | 错误的请求|
|HTTP 403 | 禁止访问|
|HTTP 404 | 无法找到文件|
|HTTP 408 | 请求超时|
|HTTP 500 | 内部服务器错误|
|HTTP 502 | 网关错误|