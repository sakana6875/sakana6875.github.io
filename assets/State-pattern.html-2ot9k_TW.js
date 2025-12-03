import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-B9QNaTxe.js";const l={};function p(c,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h2 id="以敌人ai逻辑为例学习状态模式" tabindex="-1"><a class="header-anchor" href="#以敌人ai逻辑为例学习状态模式"><span>以敌人AI逻辑为例学习状态模式</span></a></h2><p>一个游戏内存在多种不同类型的敌人，如果不断 if-else ，不仅麻烦，还容易产生错误，这个时候状态模式就显得尤为重要</p><h3 id="有限状态机" tabindex="-1"><a class="header-anchor" href="#有限状态机"><span>有限状态机</span></a></h3><ul><li>你拥有状态机所有可能状态的集合</li><li>状态机同时只能在一个状态</li><li>一连串的输入和事件被发送给状态机</li><li>每个状态都有一系列的转移，每个转移和输入与另一状态相关</li></ul><p>例如：当角色在站立状态时，按下下方向键切换为俯卧状态，跳跃时按下下方向键切换为速降状态。如果输入在当前状态没有被定义转移，输入就被忽略。（同时每个状态有其各自的逻辑）</p><h3 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式"><span>状态模式</span></a></h3><ol><li>写出抽象基类 BaseState</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public abstract class BaseState</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    protected Enemy enemy;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public BaseState(Enemy enemy)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        this.enemy = enemy;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public virtual void OnEnter()//virtual 表示可以被子类重写</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public virtual void OnExit()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public virtual void LogicUpdate()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public virtual void PhysicsUpdate()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有继承该抽象基类的类必须实现其中的方法</p><ol start="2"><li>用枚举定义怪物类型</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public enum EnemyType</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    Goblin,</span></span>
<span class="line"><span>    Skeleton</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>分支控制状态</li></ol><p>可以用 switch-case 语句进行控制<br> AI 推荐我用简单工厂模式，虽然知道好，但是具体好在哪里我也说不上来（</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public static class StateFactory</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    public static BaseState CreateInitialState(EnemyType type, Enemy enemy)//怪物的初始状态</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return type switch//返回类型为 BaseState</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            EnemyType.Goblin =&gt; new GoblinPatrolState(enemy),</span></span>
<span class="line"><span>            _ =&gt; null</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static BaseState CreateChaseState(EnemyType type, Enemy enemy)//怪物的追击状态</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        return type switch</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            EnemyType.Goblin =&gt; new GoblinChaseState(enemy),</span></span>
<span class="line"><span>            _ =&gt; null,</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//之后可以添加其他的状态</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>Enemy 脚本继承 MonoBehavior 作为组件挂载在怪物身上</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>    private void Awake()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        SwitchState(StateFactory.CreateInitialState(enemyType, this));//进入初始状态</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private void Update()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        currentState?.LogicUpdate();//每帧执行的逻辑更新（受帧率影响）</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private void FixedUpdate()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        currentState?.PhysicsUpdate();//每帧执行的物理更新（不受帧率影响）</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void SwitchState(BaseState newState)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        currentState?.OnExit();//离开该状态前最后执行一次</span></span>
<span class="line"><span>        currentState = newState;</span></span>
<span class="line"><span>        currentState?.OnEnter();//进入该状态时立即执行一次</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>怪物不同状态的具体逻辑</li></ol><ul><li><p>GoblinPatrolState<br> 继承抽象基类 BaseState ，同时用 override 实现抽象调用</p></li><li><p>GoblinChaseState<br> 同上</p></li></ul><h3 id="scriptableobject-管理数据" tabindex="-1"><a class="header-anchor" href="#scriptableobject-管理数据"><span>ScriptableObject 管理数据</span></a></h3><p>使用 ScriptableObject 可以实现在 unity 的 project 窗口中创建 DataAssets，可管理不同对象数据</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[CreateAssetMenu(menuName = &quot;Enemy/Enemy Data&quot;, fileName = &quot;NewEnemyData&quot;)]</span></span>
<span class="line"><span>public class EnemyData : ScriptableObject</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    [Header(&quot;巡逻&quot;)]</span></span>
<span class="line"><span>    public PatrolParams patrol = new PatrolParams();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [Header(&quot;追击&quot;)]</span></span>
<span class="line"><span>    public ChaseParams chase = new ChaseParams();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [Header(&quot;攻击&quot;)]</span></span>
<span class="line"><span>    public AttackParams attack = new AttackParams(); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [System.Serializable]</span></span>
<span class="line"><span>    public class PatrolParams</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        public float moveSpeed = 2f;</span></span>
<span class="line"><span>        public float patrolRange = 5f;</span></span>
<span class="line"><span>        public float turnDelay = 1f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [System.Serializable]</span></span>
<span class="line"><span>    public class ChaseParams</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        public float chaseSpeed = 4f;</span></span>
<span class="line"><span>        public float sightDistance = 6f;</span></span>
<span class="line"><span>        public float loseSightDistance = 8f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    [System.Serializable]</span></span>
<span class="line"><span>    public class AttackParams</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        public float damage = 10f;</span></span>
<span class="line"><span>        public float attackRange = 1.5f;</span></span>
<span class="line"><span>        public float attackCoolDown = 1.5f;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>可算是把这篇博客写出来了，光看概念确实很难理解，自己动手写了之后就好理解了</p><p>另外笑话一则：<br> 一开始敌人的追击状态是 xy 轴方向都向着玩家方向移动，导致当玩家跳起来的时候它就会飞起来，甚至还能带着玩家一起飞（</p>`,24)])])}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/posts/2025-11/11.29/State-pattern.html","title":"状态模式","lang":"zh-CN","frontmatter":{"title":"状态模式","category":["technology"],"date":"2025-11-29T00:00:00.000Z","index":true,"copyright":"MiaoBolo","description":"以敌人AI逻辑为例学习状态模式 一个游戏内存在多种不同类型的敌人，如果不断 if-else ，不仅麻烦，还容易产生错误，这个时候状态模式就显得尤为重要 有限状态机 你拥有状态机所有可能状态的集合 状态机同时只能在一个状态 一连串的输入和事件被发送给状态机 每个状态都有一系列的转移，每个转移和输入与另一状态相关 例如：当角色在站立状态时，按下下方向键切换...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"状态模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-11-29T00:00:00.000Z\\",\\"dateModified\\":\\"2025-11-29T18:23:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MiaoBolo\\",\\"url\\":\\"https://github.com/sakana6875\\"}]}"],["meta",{"property":"og:url","content":"https://sakana6875.github.io/posts/2025-11/11.29/State-pattern.html"}],["meta",{"property":"og:site_name","content":"摸鱼博客"}],["meta",{"property":"og:title","content":"状态模式"}],["meta",{"property":"og:description","content":"以敌人AI逻辑为例学习状态模式 一个游戏内存在多种不同类型的敌人，如果不断 if-else ，不仅麻烦，还容易产生错误，这个时候状态模式就显得尤为重要 有限状态机 你拥有状态机所有可能状态的集合 状态机同时只能在一个状态 一连串的输入和事件被发送给状态机 每个状态都有一系列的转移，每个转移和输入与另一状态相关 例如：当角色在站立状态时，按下下方向键切换..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-29T18:23:31.000Z"}],["meta",{"property":"article:published_time","content":"2025-11-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-29T18:23:31.000Z"}]]},"git":{"createdTime":1764440611000,"updatedTime":1764440611000,"contributors":[{"name":"sakana6875","username":"sakana6875","email":"2818854235@qq.com","commits":1,"url":"https://github.com/sakana6875"}]},"readingTime":{"minutes":2.61,"words":783},"filePathRelative":"posts/2025-11/11.29/State-pattern.md","excerpt":"<h2>以敌人AI逻辑为例学习状态模式</h2>\\n<p>一个游戏内存在多种不同类型的敌人，如果不断 if-else ，不仅麻烦，还容易产生错误，这个时候状态模式就显得尤为重要</p>\\n<h3>有限状态机</h3>\\n<ul>\\n<li>你拥有状态机所有可能状态的集合</li>\\n<li>状态机同时只能在一个状态</li>\\n<li>一连串的输入和事件被发送给状态机</li>\\n<li>每个状态都有一系列的转移，每个转移和输入与另一状态相关</li>\\n</ul>\\n<p>例如：当角色在站立状态时，按下下方向键切换为俯卧状态，跳跃时按下下方向键切换为速降状态。如果输入在当前状态没有被定义转移，输入就被忽略。（同时每个状态有其各自的逻辑）</p>","autoDesc":true}');export{r as comp,v as data};
