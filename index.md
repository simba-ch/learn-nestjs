# 请求执行顺序

client side ---> middleware ---> route handle ---> middleware ---> client side
当路由使用`use`装饰器时，第一个装饰器运行结束，视为 route handle 运行结束

client side ---> guard ---> interceptor ---> pipe ---> route handle ---> interceptor ---> client side

# 补强：

**_全局守卫，排除特定路由？_**
全局守卫需要自己实例化，
reflector 不会被依赖注入需要自己实例化（知识点）

根据 request 对象中的路由来判断？
根据 SetMetadata 来判断（怎么注入 reflector 实例）
有没有更好的办法

# 问题与解答：

- 定义装饰器的位置对功能模块是否有影响
  比如：把`SetMetadata`放在守卫上面，守卫里的`Reflector`是否会取不到值
  各个功能模块的位置好像是已经被定义好了，所以装饰器的位置并不会影响其执行的顺序

- 模块间的相互引用
  比如：有一个父模块和若干子模块和子服务，在父模块中导入这些子模块，在子模块中可以使用其他子模块吗？
  不可以，如果 A 模块依赖 B 模块，B 模块又依赖 A 模块，参考[循环依赖](#循环依赖)

# 概述

## 控制器

控制器负责处理传入的**请求**和向客户端返回**响应**。

## 提供者

Nest 有一个内置的控制反转（"IoC"）容器，可以解决 providers 之间的关系。@Injectable() 装饰器只是冰山一角, 并不是定义 providers 的唯一方法。相反，您可以使用普通值、类、异步或同步工厂。

### 基于属性的注入 **_(不是很懂)_**

如果顶级类依赖于一个或多个 providers，那么通过从构造函数中调用子类中的 super() 来传递它们就会非常烦人了。因此，为了避免出现这种情况，可以在属性上使用 @Inject() 装饰器。

## 模块

模块是具有`@Module()`装饰器的类。`@Module()`装饰器提供了元数据，Nest 用它来组织应用程序结构
![](./Modules_1.png)

每个 Nest 应用程序至少有一个模块，即根模块。根模块是 Nest 开始安排应用程序树的地方。

除了根模块，其他模块至少需要注册一次（就是在其他模块中导入（`imports`）），全局模块建议在根模块中注册

## 中间件

1. 中间件运行在路由控制函数之前
2. 修改 request 和 reponse 对象
3. 挂起请求，运行下一个中间件，结束请求

### 类中间件

### 函数中间件

## 异常过滤器

## 管道

管道是具有`@Injectable`装饰器的类，管道应实现`PipeTransform`接口。

- **转换**：将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常
  它们将在验证路由参数，查询字符串参数，和请求体正文的情景中工作。

在路由处理函数上对处理函数中的每一个参数使用

当使用路由管道的时候，路由处理函数的每一个参数都会调用管道

管道的执行顺序：
当一个路由处理函数上同时有路由管道和参数管道
先执行路由管道（根据路由管道定义的顺序执行，最后将执行结果传给参数管道处理），
再执行参数管道（根据管道定义的顺序执行）。

根据路由函数定义的参数顺序反向依次应用以上规则（先执行完路由管道，再执行参数管道）

实体类 可以用 `implements` 实现`type`，结合 prisma 的类型实现转换和验证
场景一：根据 id 从数据库查找用户实体返回

```ts
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}
```

## 守卫

守卫是一个使用`@Injectable`装饰器的类。守卫应该实现`CanActivate`接口。
守卫在中间件之后，在拦截器和管道之前
**授权**：它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。

使用`useGuards`守卫的执行顺序与定义顺序相同

## 拦截器

拦截器是使用`@Injectable()`装饰器注解的类。拦截器应该实现`NestInterceptor`接口。

- 在函数执行前后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数（例如：缓存目的）

使用`UseInterceptors`根据定义顺序执行（洋葱模型），返回结果作为上一个执行函数的`next.handle`返回值

## 自定义装饰器

### 参数装饰器

更改 request response 的属性

### 装饰器聚合

执行顺序？
与定义顺序无关，参考[请求执行顺序](#请求执行顺序)

# 基本原理

## 依赖注入

```ts
// cats.service.ts
import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
// 1. 用`@Injectable()`装饰器声明`CatsService`是一个可以由`Nest IoC`容器管理的类
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}

// cats.controller.ts
import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
export class CatsController {
  // 2. 在`CatsController`中声明一个依赖于`CatsService`令牌（token）的构造函数注入
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

// app.module.ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService], //3. 将标记 `CatsService`与 `cats.service.ts`文件中的 `CatsService` 类相关联。
})
export class AppModule {}
```

依赖注入是一种控制反转（_IoC_）技术，你可以将依赖的实例化委派给*IoC*容器（在 Nestjs 应用中为 Nestjs 运行时系统），而不是必须在自己的代码中执行。

1. 用`@Injectable()`装饰器声明`CatsService`是一个可以由`Nest IoC`容器管理的类
2. 在`CatsController`中声明一个依赖于`CatsService`令牌（token）的构造函数注入
3. 在 `app.module.ts` 中，我们将标记 `CatsService`与 `cats.service.ts`文件中的 `CatsService` 类相关联。

当 `Nest IoC` 容器实例化 `CatsController` 时，它首先查找所有依赖项。 当找到 `CatsService` 依赖项时，它将对 CatsService 令牌(token)执行查找，并根据上述步骤（上面的＃3）返回 `CatsService` 类。 假定单例范围（默认行为），Nest 然后将创建 `CatsService` 实例，将其缓存并返回，或者如果已经缓存，则返回现有实例。
tips：我们忽略的一个重要方面是，分析依赖项代码的过程非常复杂，并且发生在应用程序引导期间。

## 自定义提供者

### 标准提供者

```
providers: [
  {
    provide: CatsService,
    useClass: CatsService,
  },
];
```

### 值提供者（useValue）

```
 providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
```

### 非类提供者

除了使用字符串作为令牌之外，还可以使用 JavaScript Symbol。

````
 providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],

// 我们使用 @Inject() 装饰器。这个装饰器只接受一个参数——令牌。
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}
```

### 类提供者
useClass语法允许您动态确定令牌应解析为的类。
````
//  例如，假设我们有一个抽象（或默认）的 ConfigService 类。 根据当前环境，我们希望 `Nest 提供配置服务的不同实现。 以下代码实现了这种策略。
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}

```

### 工厂提供者 (useFactory)



## 异步提供者

## 动态模块

## 注入作用域

## 循环依赖

## 模块参考

## 懒加载模块

## 应用上下文

- reflect
  四个方法分别是什么意思

- SetMetadata

## 生命周期事件

## 跨平台

## 测试

# 技术

## HTTP 模块

# 安全

## 认证

## 权限

验证权限
显示（前端路由生成）
增删改查

用户：
基于角色
<del>一个路由可能会改变</del>

基于权限
<del>一个添加权限不应该访问所有的添加路由</del>
一个类有多个对应多个权限（增删改查），
一个路由对应一个类的一个权限（应该是这样）

路由问题：
<del>一个路由可访问的权限是可变的，比如角色可变，权限可变</del>
路由是不可变的，可变的是用户，用户的角色，权限等

数据库建立一个 permission 表去对应路由和权限
````
