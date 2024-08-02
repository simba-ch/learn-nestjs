# 请求生命周期
client side ---> middleware ---> guard ---> interceptor ---> pipe ---> route handle ---> middleware ---> interceptor ---> client side



# 控制器
控制器负责处理传入的**请求**和向客户端返回**响应**。


# 提供者
Nest有一个内置的控制反转（"IoC"）容器，可以解决 providers 之间的关系。@Injectable() 装饰器只是冰山一角, 并不是定义 providers 的唯一方法。相反，您可以使用普通值、类、异步或同步工厂。

## 基于属性的注入

如果顶级类依赖于一个或多个 providers，那么通过从构造函数中调用子类中的 super() 来传递它们就会非常烦人了。因此，为了避免出现这种情况，可以在属性上使用 @Inject() 装饰器。
***(不是很懂)***

# 模块

# 中间件
1. 中间件运行在路由控制函数之前
2. 修改request和reponse对象
3. 挂起请求，运行下一个中间件，结束请求

## 类中间件


## 函数中间件


# 异常过滤器


# 管道
管道是具有`@Injectable`装饰器的类，管道应实现`PipeTransform`接口。


- **转换**：将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常
它们将在验证路由参数，查询字符串参数，和请求体正文的情景中工作。

在路由处理函数上使用将对处理函数中的每一个参数使用
实体类 可以用 `implements` 实现`type`，结合prisma的类型实现转换和验证

场景一：根据id从数据库查找用户实体返回
```ts
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```

# 守卫
守卫是一个使用`@Injectable`装饰器的类。守卫应该实现`CanActivate`接口。
守卫在中间件之后，在拦截器和管道之前
**授权**：它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。




# 应用上下文
- reflect
- SetMetadata


# 自定义装饰器


## 参数装饰器
更改request response的属性



# HTTP模块


# 循环依赖

# 模块参考

# 懒加载模块










## 实现灵活的认证
需要知识：
    - 应用上下文
    - 自定义装饰器
    - 守卫 


## 自己实例化类


