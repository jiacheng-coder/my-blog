import{_ as s,o as n,c as a,U as e}from"./chunks/framework.a7041386.js";const u=JSON.parse('{"title":"面向对象","description":"","frontmatter":{"tag":["TS"]},"headers":[],"relativePath":"TS/面向对象特性.md","filePath":"TS/面向对象特性.md","lastUpdated":1690701222000}'),p={name:"TS/面向对象特性.md"},l=e(`<h1 id="面向对象" tabindex="-1">面向对象 <a class="header-anchor" href="#面向对象" aria-label="Permalink to &quot;面向对象&quot;">​</a></h1><p>在 TypeScript 中，面向对象编程有三大特性：封装、继承和多态。</p><h2 id="封装" tabindex="-1">封装 <a class="header-anchor" href="#封装" aria-label="Permalink to &quot;封装&quot;">​</a></h2><p>封装是指将数据和方法相结合，形成一个有机的整体，同时隐藏了对象的内部细节，只向外部暴露必要的接口。这样可以保护对象的数据不被随意修改，同时也提高了代码的可维护性。</p><p>在 TypeScript 中，可以使用 <code>public</code>、<code>private</code> 和 <code>protected</code> 访问修饰符来实现封装。其中，<code>public</code> 表示公有，可以在任何地方访问；<code>private</code> 表示私有，只能在类内部访问；<code>protected</code> 表示受保护的，可以在类内及其子类中访问。</p><p>下面是一个使用封装的例子：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Person {</span></span>
<span class="line"><span style="color:#A6ACCD;">  private name: string;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public setName(name: string): void {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public getName(): string {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.name;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const person = new Person();</span></span>
<span class="line"><span style="color:#A6ACCD;">person.setName(&#39;Tom&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(person.getName()); // 输出：Tom</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>在上面的例子中，<code>name</code> 属性被声明为私有的，外部无法直接访问。通过 <code>setName</code> 和 <code>getName</code> 方法来设置和获取 <code>name</code> 属性的值，这样就实现了封装。</p><h2 id="继承" tabindex="-1">继承 <a class="header-anchor" href="#继承" aria-label="Permalink to &quot;继承&quot;">​</a></h2><p>继承是指一个子类继承父类的属性和方法，并可以在此基础上添加自己的属性和方法。通过继承，可以减少代码的重复性，提高代码的复用性。</p><p>在 TypeScript 中，可以使用 <code>extends</code> 关键字来实现继承。子类可以访问父类的公有属性和方法，但无法访问父类的私有属性和方法。</p><p>下面是一个使用继承的例子：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Animal {</span></span>
<span class="line"><span style="color:#A6ACCD;">  public name: string;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(name: string) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.name = name;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public sayHello(): void {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(\`I&#39;m \${this.name}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Dog extends Animal {</span></span>
<span class="line"><span style="color:#A6ACCD;">  public breed: string;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(name: string, breed: string) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    super(name);</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.breed = breed;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public bark(): void {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(&#39;Woof! Woof!&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const dog = new Dog(&#39;Tommy&#39;, &#39;Golden Retriever&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">dog.sayHello(); // 输出：I&#39;m Tommy</span></span>
<span class="line"><span style="color:#A6ACCD;">dog.bark(); // 输出：Woof! Woof!</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>在上面的例子中，<code>Dog</code> 类继承了 <code>Animal</code> 类的属性和方法，并添加了自己的 <code>breed</code> 属性和 <code>bark</code> 方法，这样就实现了继承。</p><h2 id="多态" tabindex="-1">多态 <a class="header-anchor" href="#多态" aria-label="Permalink to &quot;多态&quot;">​</a></h2><p>多态是指一个对象可以有多种形态，即<strong>同一种类型的对象，在不同的情况下可以具有不同的表现形式</strong>。通过多态，可以提高代码的<strong>灵活性和扩展性</strong>。</p><p>在 TypeScript 中，可以使用抽象类和接口来实现多态。抽象类是一种不能直接被实例化的类，只能被子类继承，并且子类必须实现抽象类中的抽象方法。接口是一种规范，描述了类应该具有的属性和方法。</p><p>下面是一个使用多态的例子，这个例子就是同一种类型（Shape）的对象，在不同情况下可以具有不同的表现形式：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">abstract class Shape {</span></span>
<span class="line"><span style="color:#A6ACCD;">  public abstract getArea(): number;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Rectangle extends Shape {</span></span>
<span class="line"><span style="color:#A6ACCD;">  private width: number;</span></span>
<span class="line"><span style="color:#A6ACCD;">  private height: number;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(width: number, height: number) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    super();</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.width = width;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.height = height;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public getArea(): number {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return this.width * this.height;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Circle extends Shape {</span></span>
<span class="line"><span style="color:#A6ACCD;">  private radius: number;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(radius: number) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    super();</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.radius = radius;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public getArea(): number {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Math.PI * this.radius ** 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function printArea(shape: Shape): void {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(\`The area is \${shape.getArea()}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const rectangle = new Rectangle(5, 10);</span></span>
<span class="line"><span style="color:#A6ACCD;">const circle = new Circle(5);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">printArea(rectangle); // 输出：The area is 50</span></span>
<span class="line"><span style="color:#A6ACCD;">printArea(circle); // 输出：The area is 78.53981633974483</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>在上面的例子中，<code>Shape</code> 类是一个抽象类，定义了一个抽象方法 <code>getArea</code>。<code>Rectangle</code> 和 <code>Circle</code> 类继承了 <code>Shape</code> 类，并实现了 <code>getArea</code> 方法。<code>printArea</code> 函数接受一个 <code>Shape</code> 类型的参数，可以接受任何继承了 <code>Shape</code> 类的子类。这样就实现了多态。</p>`,20),r=[l];function c(o,i,t,b,A,C){return n(),a("div",null,r)}const d=s(p,[["render",c]]);export{u as __pageData,d as default};
