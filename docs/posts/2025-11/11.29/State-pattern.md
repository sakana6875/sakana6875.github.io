---
title: 状态模式
category:
    - technology
date: 2025-11-29
index: true
copyright: MiaoBolo
---

## 以敌人AI逻辑为例学习状态模式

一个游戏内存在多种不同类型的敌人，如果不断 if-else ，不仅麻烦，还容易产生错误，这个时候状态模式就显得尤为重要

### 有限状态机
- 你拥有状态机所有可能状态的集合
- 状态机同时只能在一个状态
- 一连串的输入和事件被发送给状态机
- 每个状态都有一系列的转移，每个转移和输入与另一状态相关

例如：当角色在站立状态时，按下下方向键切换为俯卧状态，跳跃时按下下方向键切换为速降状态。如果输入在当前状态没有被定义转移，输入就被忽略。（同时每个状态有其各自的逻辑）

### 状态模式

1. 写出抽象基类 BaseState

```
public abstract class BaseState
{
    protected Enemy enemy;

    public BaseState(Enemy enemy)
    {
        this.enemy = enemy;
    }

    public virtual void OnEnter()//virtual 表示可以被子类重写
    {

    }

    public virtual void OnExit()
    {

    }

    public virtual void LogicUpdate()
    {

    }

    public virtual void PhysicsUpdate()
    {

    }
}
```
所有继承该抽象基类的类必须实现其中的方法

2. 用枚举定义怪物类型

```
public enum EnemyType
{
    Goblin,
    Skeleton
}
```

3. 分支控制状态

可以用 switch-case 语句进行控制
AI 推荐我用简单工厂模式，虽然知道好，但是具体好在哪里我也说不上来（

```
public static class StateFactory
{
    public static BaseState CreateInitialState(EnemyType type, Enemy enemy)//怪物的初始状态
    {
        return type switch//返回类型为 BaseState
        {
            EnemyType.Goblin => new GoblinPatrolState(enemy),
            _ => null
        };
    }

    public static BaseState CreateChaseState(EnemyType type, Enemy enemy)//怪物的追击状态
    {
        return type switch
        {
            EnemyType.Goblin => new GoblinChaseState(enemy),
            _ => null,
        };
    }
}
//之后可以添加其他的状态
```

4. Enemy 脚本继承 MonoBehavior 作为组件挂载在怪物身上

```
    private void Awake()
    {
        SwitchState(StateFactory.CreateInitialState(enemyType, this));//进入初始状态
    }

    private void Update()
    {
        currentState?.LogicUpdate();//每帧执行的逻辑更新（受帧率影响）
    }

    private void FixedUpdate()
    {
        currentState?.PhysicsUpdate();//每帧执行的物理更新（不受帧率影响）
    }

    public void SwitchState(BaseState newState)
    {
        currentState?.OnExit();//离开该状态前最后执行一次
        currentState = newState;
        currentState?.OnEnter();//进入该状态时立即执行一次
    }
```

5. 怪物不同状态的具体逻辑

- GoblinPatrolState
继承抽象基类 BaseState ，同时用 override 实现抽象调用

- GoblinChaseState
同上


### ScriptableObject 管理数据

使用 ScriptableObject 可以实现在 unity 的 project 窗口中创建 DataAssets，可管理不同对象数据

```
[CreateAssetMenu(menuName = "Enemy/Enemy Data", fileName = "NewEnemyData")]
public class EnemyData : ScriptableObject
{
    [Header("巡逻")]
    public PatrolParams patrol = new PatrolParams();

    [Header("追击")]
    public ChaseParams chase = new ChaseParams();

    [Header("攻击")]
    public AttackParams attack = new AttackParams(); 

    [System.Serializable]
    public class PatrolParams
    {
        public float moveSpeed = 2f;
        public float patrolRange = 5f;
        public float turnDelay = 1f;
    }

    [System.Serializable]
    public class ChaseParams
    {
        public float chaseSpeed = 4f;
        public float sightDistance = 6f;
        public float loseSightDistance = 8f;
    }

    [System.Serializable]
    public class AttackParams
    {
        public float damage = 10f;
        public float attackRange = 1.5f;
        public float attackCoolDown = 1.5f;
    }
}
```
## 总结

可算是把这篇博客写出来了，光看概念确实很难理解，自己动手写了之后就好理解了

另外笑话一则：
一开始敌人的追击状态是 xy 轴方向都向着玩家方向移动，导致当玩家跳起来的时候它就会飞起来，甚至还能带着玩家一起飞（