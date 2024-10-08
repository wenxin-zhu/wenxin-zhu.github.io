# STL 知识整理

## 1 Vector

```C++
vector<int> v;
vector<int> v(n);
vector<int> v(n, 0);
vector<vector<int>> v(n, vector<int>(m, 0));
v.push_back(1);
v.pop_back();
v.front();
v.back();
```

## 2 Stack

```C++
stack<int> s;
s.push(1);
s.pop();
s.top();
s.empty();
s.size();
```

## 3 Queue

```C++
queue<int> q;
q.push(1);	// 入队
q.pop();	// 出队
q.front();	// 对头元素
q.back();	// 队尾元素
s.empty();
s.size();
```

## 4 Set

```c++
set<int> s;
s.insert(1);
s.count(1);
for (set<int>::iterator it = s.begin(); it != s.end(); ++it)
    cout << *it << " ";

```

## 5 Map

```c++
map<int, int> m;
m.count(1);
m.insert(pair<int, int>(1, 2));	// 当map中已有关键字时，无法进行插入
m[1] = 2;	// 可以覆盖以前该关键字对应的值
map<int, string>::iterator it;
for(it = mapStudent.begin(); it != mapStudent.end(); it++)    
    cout<<it->first<<' '<<it->second<<endl; 
```

## 6 常用算法

头文件：`<algorithm>`

```cpp

for_each(iterator beg, iterator end, _func);	// 遍历容器

transform(iterator beg1, iterator end1, iterator beg2, _func);	// 搬运容器到另一个容器中

find(iterator beg, iterator end, value);	// 查找指定元素，找到返回指定元素的迭代器，找不到返回end()迭代器

count(iterator beg, iterator end, value);	// 统计元素出现次数

sort(iterator beg, iterator end, _Pred);	// 排序，_Pred 谓词

reverse(iterator beg, iterator end);	// 反转指定范围的元素

copy(iterator beg, iterator end, iterator dest);	// 容器内指定范围的元素拷贝到另一容器中

replace(iterator beg, iterator end, oldvalue, newvalue);	// 将区间内旧元素 替换成 新元素

swap(container c1, container c2);	// 互换两个容器的元素
```
