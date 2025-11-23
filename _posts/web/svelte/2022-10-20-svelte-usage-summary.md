---
title: 스벨트(Svelte) 정리
description: 스벨트(Svelte) 정리
date: 2022-10-20 00:00:00 +0900
categories: [web, svelte]
tags: [web, svelte]
---

![React vs Svelte](/assets/img/posts/web/svelte/cookie_react_svelte.jpg)

## 🤔 스벨트란? 

* React, Vue.js 등과 같은 웹 프레임워크
* 매우 적은 코드로 프론트엔드 결과물을 만들 수 있음


## 🧑‍💻 개발환경 구성

### REPL

짧은 코드를 테스트하는 경우 [REPL](https://svelte.dev/repl)을 사용

### 로컬 환경 구성

1. Visual Studio Code 및 Node.js 설치
2. 스벨트 프로젝트 생성
  - SvelteKit을 사용하지 않는 경우: `npx degit sveltejs/template <PROJECT_NAME>`
  - SvelteKit을 사용하는 경우: `npm create svelte@latest <PROJECT_NAME>`
3. 생성된 프로젝트로 이동: `cd <PROJECT_NAME>`
4. 관련 패키지 설치: `npm install`(또는 `npm i`)
5. 스벨트 개발 서버 실행: `npm run dev`
6. HELLO WORLD 페이지 접속(위 명령어 실행 시 접속 주소가 나타남)


## 📦 스벨트 프로젝트 구성

스벨트는 컴포넌트로 구성되며, 각 컴포넌트는 스크립트 블록, HTML 블록 및 스타일 블록 세 가지로 구성됨.

```html
<script>스크립트 블록(자바스크립트 작성)</script>
<main>HTML 블록</main> <!-- main 태그를 빼기도 함 -->
<style>스타일 블록(CSS 작성)</style>
```

## ➗ 기본적인 표현식 및 블록

### 중괄호 표현식

중괄호 표현식 `{}`은 스크립트 블록에 선언된 값을 HTML 블록에서 접근할 때 사용.

```html
<script>
  let title = "Hello Svelte!";
</script>

<!-- 스크립트 블록에서 선언한 title 변수 값을 HTML 블록에서 사용-->
<h1>{title}</h1>
```

### if 블록

if 블록은 조건을 판별할 때 사용.

```html
<script>
  let  a = 1;
</script>

{#if a > 0}
  <p>a는 양수</p>
{:else if a < 0}
  <p>a는 음수</p>
{:else}
  <p>a는 0</p>
{/if}
```

### each 블록

each 블록은 배열 내 요소들을 하나씩 꺼내올 때 사용.

```html
<script>
  let fruits = ["🍎", "🍊", "🍌", "🍓", "🍑"]
</script>

<select>
  <option>Select</option>
  {#each fruits as fruit, idx}
    <option>{idx}: {fruit}</option>
  {/each}
</select>
````

### await 블록

await 블록은 Promise 객체가 Pending 상태일 때 {#await} 식이, Fulfilled 상태일 때 {:then} 식을 실행함.

```html
<script>
  async function getPosts(){
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    return json;
  }
  let promisePosts = "";
</script>

<button on:click={() => promisePosts = getPosts()}>Get post lists</button>

<!-- promisePosts가 Pending 상태일 때 #await 식이 실행되고, -->
{#await promisePosts}
<p>Wait...</p>
<!-- promisePosts가 Fulfilled 상태로 변하면 :then 식이 실행됨 -->
{:then posts}
<p>대충 posts를 가공하는 코드...</p>
{/await}
```

### key 블록

key 블록은 키로 선언된 변수 값이 바뀔 때 블록 내부를 재생성함.

```html
<script>
  let name = "Svelte";
</script>

<main>
  <input type="text" bind:value={name}>

  <!-- name 값이 바뀌면 key 블록이 재생성됨 -->
  {#key name}
    <h1>Hello {name}!</h1>
    <p>{Date()}</p>
  {/key}
</main>
```

### html 블록

`{@html}` 블록은 HTML로 구성된 문자열을 텍스트가 아닌 HTML 엘리먼트로 표현함.

```html
<script>
  let content = `
    <h1>Hello</h1>
    <p>World!</p>
  `;
</script>

{@html content}
```

### 클래스 속성 값 표현

HTML 엘리먼트의 class 속성 값을 다양한 방법으로 지정할 수 있음.

```html
<script>
  let pStyle = "active";
  let active = true;
  let admin = true;
</script>

<h1>클래스 속성 다양하게 사용하기</h1>
<p class="active">1. 클래스 속성을 직접 명시</p>
<p class={pStyle}>2. 클래스 속성과 스크립트 변수 바인딩</p>
<p class:active={active}>3. class 지시자 사용(`<p class="active">`와 동일함)</p>
<p class:active>4. class 지시자 줄여쓰기(`<p class="active">`와 동일함)</p>
<p class:active class:admin>5. class 지시자 여러 개 사용</p>
```


## ⚡ 반응성(Reactivity)

* 스벨트는 연산자 `=`를 사용하여 반응형 변수를 선언하고 값을 할당함.
* 값이 할당되면 트리거가 발생하며, 이로 인해 센서 `$:`가 반응함.

```html
<script>
  // 1. 반응형 변수 선언 및 값 할당
  let a = 1; 
  
  // 3. 반응현 변수 값이 바뀌면 센서가 반응함
  $: console.log(`a는 {a} 입니다.`);
</script>
<!-- 2. 트리거 발생 -->
<button on:click={() => a = a + 1}>a는 {a} 입니다.</button>
```

센서 뒤에 오는 코드는 한 줄이거나 여러 줄일 수 있음.

```html
<script>
  let a = 1
  
  $: console.log(`a는 ${a}`);
  
  $: {
    console.log(`a는 ${a}임`);
    console.log(`왜냐하면 ${a}이기 때문임`);
  }
  
  $: if(a > 0) {
    console.log('a는 양수임');
    console.log('왜냐하면 양수이기 때문임');
  }
  
  $: for(let i=0 ; i<4 ; i++) {
    console.log(`${i+1}번째 for문 그냥 돌려봄: ${a}`)
  }
</script>
```

배열과 JSON 객체는 변경한 후엔 반드시 할당을 해야 변화가 감지됨

```html
<script>
  let fruits = ["🍓", "🍉", "🍒"];
  
  function trigger(){
    fruits.push("🍊");
    fruits = fruits; // 배열을 변경한 후 반드시 할당(=)을 해야 변경 감지
  }
  
  $: console.log(`배열 변경 감지됨. fruits = ${fruits}`)
</script>
```


## 🧷 바인딩(Binding)

바인딩은 스크립트 블록과 HTML 블록 간 데이터를 연계하기 위해 사용하며, 지시자 `bind`를 사용함.

### 텍스트 바인딩

```html
<script>
  let name = 'world';
</script>

<!-- input 태그에 입력된 텍스트 값이 name 변수에 저장됨 -->
<h1>Hello {name}!</h1>
<input type="text" bind:value={name}> 
```

### 숫자 바인딩

```html
<script>
  let size = 20;
</script>

<!-- input 태그에 입력된 숫자 값이 name 변수에 저장됨 -->
<h1>Size: {size}</h1>
<input type="range" bind:value={size} min=0 max=100>
```

### 체크박스 바인딩

```html
<script>
  let editable = false;
</script>

<!-- 체크박스 체크 여부가 editable 변수에 저장됨 -->
<h1>editable: {editable}</h1>
<input type="checkbox" bind:checked={editable}>Check
```

### 그룹 바인딩

```html
<script>
  let where = "";
</script>

<!-- 어느 라디오 버튼이 선택됐는지 where 변수에 저장됨 -->
<h1>당신의 성별은? {where}</h1>
<input type="radio" bind:group={where} value="남성">남성
<input type="radio" bind:group={where} value="여성">여성
```

### 단일 선택 바인딩

```html
<script>
  let choice;
</script>

<!-- 어떤 값이 선택되었는지 choice 변수에 저장됨 -->
<h1>선택한 값: {choice}</h1>
<select bind:value={choice}>
  <option value="Svelte">Svelte</option>
  <option value="React">React</option>
  <option value="Vue">Vue</option>
</select>
```

### 다중 선택 바인딩

select 태그에 multiple 속성 사용

```html
<script>
  let chosen = [];
</script>

<!-- 어떤 값이 선택되었는지 chosen 변수에 저장됨 -->
<h1>선택한 값: {chosen}</h1>
<select multiple bind:value={chosen}>
  <option value="Svelte">Svelte</option>
  <option value="React">React</option>
  <option value="Vue">Vue</option>
</select>
```

### innerHTML 바인딩

innerHTML 바인딩은 엘리먼트에 HTML 태그를 넣을 때 사용하며, 이 때 contenteditable 속성을 추가해야 함.

```html
<script>
  let html = `
  <h1>Hello</h1>
  <p>Svelte!</p>
  `;
</script>

<!-- bind:innerHTML을 사용하려면 contenteditable 속성이 필요함 -->
<div contenteditable="true" bind:innerHTML={html}></div>
```

### HTML 엘리먼트 크기 값 바인딩

HTML 엘리먼트 크기 값 바인딩에 사용하는 속성 (clientWidth, clientHeight, offsetWidth, offsetHeight)은 블록 엘리먼트에서 읽기 전용으로 바인딩 됨. 따라서 블록 엘리먼트 크기를 감지하는 코드를 작성할 수는 있지만 크기를 조절하는 코드는 작성할 수 없음.

블록 엘리먼트 크기를 조절하는 코드를 작성하려면 블록 엘리먼트를 인라인 엘리먼트에 포함시킨 후 인라인 엘리먼트 크기를 조절하는 코드를 작성해야 함. 다만 오버헤드가 발생할 수 있으므로 많은 엘리먼트에 해당 속성을 바인딩하지 않는 것이 좋음.

> 💡 블록 엘리먼트: DOM에 표현될 때 새 줄에서 시작하고 가로 크기를 전부 차지하는 엘리먼트

> 💡 인라인 엘리먼트: DOM에 표현될 때 새 줄에서 시작하지 않고 필요한 크기 만큼 차지하는 엘리먼트

```html
<script>
  let clientWidth, clientHeight, offsetWidth, offsetHeight;
</script>

<h1 
    bind:clientWidth={clientWidth} 
    bind:clientHeight={clientHeight} 
    bind:offsetWidth={offsetWidth} 
    bind:offsetHeight={offsetHeight}>Hello Svelte!
</h1>
<ul>
  <li>clientWidth: {clientWidth}</li>
  <li>clientHeight: {clientHeight}</li>
  <li>offsetWidth: {offsetWidth}</li>
  <li>offsetHeight: {offsetHeight}</li>
</ul>
```


## ↩️ 컴포넌트 라이프 사이클

### onMount

* 컴포넌트가 돔에 렌더링 되고 모든 엘리먼트의 동작 준비가 완료되었을 때 딱 한 번 콜백함수 호출
* 서버에서 데이터를 가져오거나, 엘리먼트에 포커스를 줄 때 onMount에서 처리하는 것이 좋음

```html
<script>
  import { onMount } from "svelte";
  
  onMount(() => console.log("onMount() 호출됨."));
</script>
```

### onDestroy

* 컴포넌트가 돔에서 파괴될 때 딱 한 번 콜백함수 호출.
* onMount() 콜백함수가 무기명 함수를 return하면 해당 무기명 함수는 onDestory() 콜백함수와 같은 기능을 함.

```html
<script>
  import { onMount, onDestroy } from "svelte";
  
  onMount(() => {
    console.log("onMount() 호출됨.");
    
    // onDestroy() 콜백함수와 같은 기능
    return () => console.log("컴포넌트 파괴됨.");
  });
  
  onDestroy(() => console.log("onDestroy() 호출됨."));
</script>
```

### beforeUpdate, afterUpdate

* 엘리먼트 인스턴스 생성 → beforeUpdate 호출 → 돔 업데이트 → onMount 호출 → afterUpdate 순으로 호출됨.
* 컴포넌트가 최초 DOM에 렌더링된 이후, 사용자 이벤트에 의해 DOM이 변경되어야 할 때 사용하면 유용.

```html
<script>
    import { beforeUpdate, afterUpdate } from "svelte";

    beforeUpdate(() => console.log("beforeUpdate() 호출됨"));
    afterUpdate(() => console.log("afterUpdate() 호출됨"));
</script>
```

### tick

* 원하는 시점에 DOM을 업데이트 하고 싶을 때 사용하는 함수
* 컴포넌트 라이프 사이클 함수 중 가장 늦게 실행됨

```html
<script>
  import { tick } from "svelte";
  
  let count = 0;
  
    // async 함수가 tick 함수를 호출해야 함
  const handleButton = async () => {
    count = count + 1;
    await tick(); // 돔이 업데이트 되면 tick 함수 실행 이후 코드가 실행됨
  }
</script>

<h1>{count}</h1>
<button on:click={handleButton}>Count</button>
```


## 🚚 객체 전달

### Props

Props(Properties)는 컴포넌트가 가지는 값. 상위 컴포넌트가 하위 컴포넌트에 값을 전달하기 위해 사용.

```html
<!-- App.svelte: 상위 컴포넌트 -->

<script>
    // 하위 컴포넌트 import
  import Child from "./Child.svelte";

    // props로 전달할 객체
  let list = [
    { code: "svelte", desc: "스벨트" },
    { code: "react", desc: "리액트" },
    { code: "javascript", desc: "자바스크립트" }
  ];
</script>

<!-- Child 컴포넌트에 list props 전달 -->
<Child list={list} />
```

```html
<!-- Child.svelte: 하위 컴포넌트 -->

<script>
  export let list; // props로 받아올 변수에 export 사용
</script>

<ul>
  {#each list as item}
  <li>{item.code}: {item.desc}</li>
  {/each}
</ul>
```

### Slot

슬롯은 상위 컴포넌트가 하위 컴포넌트에 콘텐츠를 전달하는 수단. 상위 컴포넌트에서 하위 컴포넌트 태그 사이에 콘텐츠를 넣어주면

```html
<script>
  import Card from "./Card.svelte";
</script>

<Child>콘텐츠 영역<Child>
```

하위 컴포넌트에서는 `<slot>` 태그로 콘텐츠를 받아올 수 있음.

```html
<slot></slot>
```

Named Slot은 하위 컴포넌트의 원하는 곳에 콘텐츠를 넣을 수 있음.

```html
<!-- App.svelte -->

<script>
  import Child from "./Child.svelte";
  let user = "스벨트";
</script>

<Child>
    <!-- Named Slot을 사용하여 슬롯을 구분 -->
  <h2 slot="user">{user}</h2>
  <span slot="id">svelte</span>
</Child>
```

```html
<!-- Child.svelte -->

<!-- Named Slot을 사용하여 슬롯을 구분 -->
<slot name="user"></slot>
<p>아이디: <slot name="id"></slot></p>
```

`$$slots` 객체를 사용하면 slot에 값이 들어있는지 확인할 수 있음.

```html
<!-- App.svelte -->

<script>
  import Child from "./Child.svelte";
  let user = "스벨트";
</script>

<Child>
  <h2 slot="user">{user}</h2>
  <!-- id slot을 전달하지 않음 -->
</Child>
```

```html
<!-- Child.svelte -->

<slot name="user"></slot>

<!-- id slot에 값이 들어있는지 확인 -->
{#if $$slots.id}
<p>아이디: <slot name="id"></slot></p>
{:else}
<p>아이디: 비어있음</p>
{/if}
```

슬롯의 변화나 값 등을 하위 컴포넌트에서 상위 컴포넌트로 전달하려면 슬롯의 Props를 사용해야 함.
1. 하위 컴포넌트의 `<slot>` 태그 안에 name이라는 이름만 피해서 Props를 정의한 후
2. 상위 컴포넌트에서 `let:` 지시자를 사용하여 Props를 사용하면 됨

```html
<script>
  import Child from "./Child.svelte";
</script>

<Child>
  <!-- 하위 컴포넌트 슬롯의 Props를 let 지시자를 사용하여 가져옴 -->
  <h1 slot="foo" let:hovered={isFocused} class:hovered={isFocused}>Hello Svelte!</h1>
</Child>

<style>
  .hovered {
    font-style: italic;
  }
</style>
```

```html
<script>
  let isHovered = false;
  const handleMouseEnter = () => isHovered = true;
  const handleMouseLeave = () => isHovered = false;
</script>

<!-- Slot에는 지시자를 사용할 수 없으므로 Slot을 div 태그로 감싼 후 이 태그에 이벤트 지시자를 사용함 -->
<div on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
  <!-- 마우스 커서 진입 및 탈출 이벤트 상태를 슬롯의 Props를 사용하여 전달 -->
  <slot name="foo" hovered={isHovered}></slot>
</div>
```

### Context API

* 컨텍스트 API는 하위 컴포넌트에서 상위 컴포넌트에 접근하기 위한 방법
* 모든 컴포넌트는 컨텍스트 객체를 가질 수 있으며, 이 객체는 하위 컴포넌트에서만 접근 가능.
* 애플리케이션 전체에 데이터 공유를 해야 한다면 스토어를, 하위 컴포넌트에만 제한적으로 데이터 접근을 해야 한다면 컨텍스트 API를 사용하는 것이 효율적.

상위 컴포넌트에서 setContext 함수로 컨텍스트 객체를 만든 후

```html
<script>
  import { setContext } from "svelte";
  import Child from "./Child.svelte";
  
  // 첫 번째 파라미터: 키(식별자)
  // 두 번째 파라미터: 값
  setContext("num", 10);
</script>

<Child />
```

하위 컴포넌트에서 getContext 함수로 컨텍스트 객체를 가져오면 됨. 

```html
<script>
  import { getContext, hasContext } from "svelte";
  let num;
  
  if(hasContext("num")) {
    num = getContext("num");
  }
</script>

<h1>Context: {num}</h1>
```

### Event

HTML DOM 이벤트
* HTML DOM 이벤트 종류는 [https://www.w3schools.com/jsref/dom_obj_event.asp](https://www.w3schools.com/jsref/dom_obj_event.asp) 참고
* HTML DOM 이벤트는 `on:` 지시자로 이벤트 처리 함수를 지정하여 처리. 이 이벤트 처리 함수는 이벤트 객체를 처리함.
* `on:` 지시자를 여러 번 사용하면 여러 개의 이벤트 처리 함수 지정이 가능

```html
<script>
  let count = 0;
  
  /* 이벤트 처리 함수 */
  const handleCount = () => count = count + 1;
  const handleEvent = (e) => console.log(e.target);
</script>

<!-- on 지시자로 이벤트 처리 함수 지정. -->
<button on:click={handleCount} on:click={handleEvent}>Click ({count})</button>
```

이벤트 처리 함수를 사용하지 않고 HTML에 스크립트를 삽입하여 이벤트를 처리할 수도 있음(인라인 이벤트 처리)

```html
<script>
  let count = 0;
</script>

<h1>{count}</h1>
<button on:click={(e) => count = count + 1 }>Count</button>
```

이벤트 제한자는 `on` 지시자 뒤에 붙어 추가 동작을 정의하는 것. 이벤트 이름 뒤에 파이프 기호(`|`)를 붙여 사용함.

| 제한자          | 설명                                        |
| --------------- | ------------------------------------------- |
| preventDefault  | 엘리먼트의 기본 이벤트 동작을 무시함        |
| stopPropagation | 상위 엘리먼트로 이벤트가 전달되지 않도록 함 |
| once            | 이벤트 처리 함수가 한 번만 실행되도록 함    |

```html
<script>
  let count = 0;
</script>

<!-- 버튼이 한 번만 동작함 --->
<h1>{count}</h1>
<button on:click|once={(e) => count = count + 1 }>Count</button>
```

`on` 지시자는 커스텀 이벤트 처리도 가능하며, 하위 컴포넌트에서 발생한 이벤트를 상위 컴포넌트로 넘겨주는 것도 가능함.

```html
<!-- Child.svelete: 커스텀 이벤트를 보낼 하위 컴포넌트 -->
<script>
  // 1. 상위 컴포넌트로 커스텀 이벤트를 전달하기 위한 dispatch 생성
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  
  // 2. 상위 컴포넌트로 커스텀 이벤트를 전달하는 함수(커스텀 이벤트 명, 전달할 데이터)
  function handleChildButton() {
    dispatch("childButtonClicked", { text: "Child button clicked." });
  }
</script>

<!-- 3. HTML 엘리먼트에 커스텀 이벤트 처리 함수 부착 -->
<button on:click={handleChildButton}>Click!</button>
```

```html
<!-- App.svelte: 커스텀 이벤트를 받을 상위 컴포넌트 -->
<script>
  import Child from "./Child.svelte";
  
  // 4. 하위 컴포넌트가 보내온 이벤트를 처리하는 함수
  const handleChildEvent = (e) => {
    alert(e.detail.text);
  }
</script>

<Child on:childButtonClicked={handleChildEvent} />
```


## 🛍️ Store

스토어는 같은 스벨트 애플리케이션에 속한 컴포넌트끼리 데이터를 공유하기 위한 방식.

### Store 사용 과정

* 구독 사용: subscribe 함수를 사용하거나, 스토어 이름 앞에 `$`를 붙이면 자동 구독됨.
* 스토어 값 변경: set 또는 update 함수 사용
* 스토어 값 조회: get 함수를 사용하거나, 스토어 이름 앞에 `$`를 붙여 접근
* 구독 종료: unsubscribe 함수 사용

### Writable Store

어떤 컴포넌트에서든지 자유롭게 읽고 쓸 수 있는 스토어

```javascript
/* store.js */

import { writable } from "svelte/store";

// 1. Writable을 사용하여 변수 초기값 설정
// 초기값은 숫자, 문자, 배열, 객체 등 자유롭게 설정 가능
export const count = writable(0);

console.log("Writable Store 생성 완료.", count);
```

```html
<!-- App.svelte -->

<script>
  import { onDestroy } from "svelte";
  import { count } from "./store.js";

  let buttonCount;
  const handleButton = () => {
    buttonCount = buttonCount + 1;
  }

  // 2. Store 구독
  //  * subscribe 함수는 변수 값 변경 여부를 감지 후 콜백 함수를 실행함
  //  * 매개변수는 누군가가 변경한 스토어 값
  const unsubscribe = count.subscribe((v) => {
    buttonCount = v;
    console.log("count 값이 변경되었습니다.", v);
  });

  // 3. Store 변경
  $: count.set(buttonCount);

  // 4. Store 구독 종료
  onDestroy(unsubscribe);
</script>

<h1>{buttonCount}</h1>
<button on:click={handleButton}>Count</button>
```

자동 구독하려면 스토어 이름 앞에 `$`를 붙여 사용하면 됨.

```html
<script>
  import { count } from "./store.js";

  // 스토어 이름 앞에 $를 붙여 사용하면 자동 구독됨
  const handleButton = () => $count = $count + 1;
</script>

<h1>{$count}</h1>
<button on:click={handleButton}>Count</button>
```

### Readable 스토어

읽기만 가능한 스토어. subscribe 함수는 제공하지만 update 및 set 함수는 제공하지 않음.

```javascript
/* store.js */

import { readable } from "svelte/store";

// 1. Readable Store 생성
//  * readable 함수의 첫번째 매개변수는 스토어의 초기값
//  * readable 함수의 두번째 매개변수는 구독 시 호출되는 콜백함수
//   - 이 콜백함수는 스토어를 업데이트하는 set 함수를 파라미터로 받음
//   - 이 콜백함수는 구독이 종료될 때 호출되는 stop 함수를 반환함
export const time = readable(new Date(), function start(set) {
  console.log("Readable Store 구독 시작.");

  // 1초 간격으로 시간 갱신
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    console.log("Readable Store 구독 종료.");
    clearInterval(interval);
  }
});

console.log("Readable Store 생성 완료.", time);
```

```html
<script>
  import { time } from "./store.js";
</script>

<h1>현재 시간: {$time}</h1>
```

### Derived Store

기존 스토어 값으로 다른 값을 자동으로 만들기 위한 스토어

```javascript
/* store.js */

import { writable, derived } from "svelte/store";

export const num = writable(2);

// Derived Store 생성
//  * derived 함수의 첫 번째 파라미터는 원본 스토어
//  * derived 함수의 두 번째 파라미터는 무기명 함수(원본 스토어가 변경될 때마다 호출할 콜백 함수)
export const sqrt1 = derived(num, $num => Math.sqrt($num));

// derived 함수에서 사용하는 무기명 함수의 매개변수가 2개인 경우
// * 첫 번째 매개변수: 스토어 값
// * 두 번째 매개변수: set 함수(새롭게 계산된 값을 derived 스토어에 저장하는 함수)
export const sqrt2 = derived(num, ($num, set) => {
  set(Math.sqrt($num));
  return () => {
    // 실행이 종료되었을 때 실행할 코드
  };
});
```

```html
<script>
  import { num, sqrt1, sqrt2 } from "./store.js";
</script>

<main>
  <h1>{$num}의 제곱근은 {$sqrt1}입니다.</h1>
  <h1>{$num}의 제곱근은 {$sqrt2}입니다.</h1>
</main>
```

### Store 값에 접근하는 여러 가지 방법

1. `$<STORE_NAME>` 으로 접근
2. subscribe의 콜백함수에서 넘겨받는 인자로 접근
3. get() 함수를 사용하여 접근.
  * 1, 2번째 방법은 변경사항을 실시간으로 알 수 있는 리액티브한 방법으로, 시스템 자원을 필요로 함
  * 특정 시점에만 스토어 값에 접근한다면 get() 함수를 쓰는 걸 추천

```html
<script>
  import { num } from "./store.js";
  import { get } from "svelte/store";
</script>


<h1>1. `$STORE_NAME`으로 스토어 객체에 접근하는 경우</h1>
<p>num의 값은 {$num}입니다.</p>

<h1>2. subscribe의 콜백 함수에서 넘겨 받는 매개변수로 스토어 값에 접근하는 경우</h1>
<p>이건 subscribe 함수 내에서 접근해야 함...</p>

<h1>3. get 함수를 사용하여 접근하는 경우</h1>
<p>num의 값은 {get(num)}입니다.</p>
```


## 특수 엘리먼트

특수 엘리먼트는 `<svelte:ELEMENT_NAME>` 형태로 HTML 블록에 사용할 수 있는 엘리먼트

### svelte:self

자기 자신을 재귀 형태로 임포트할 때 사용

### svelte:component

하위 컴포넌트를 동적으로 렌더링할 때 사용

```html
<script>
  import Child1 from "./Child1.svelte";
  import Child2 from "./Child2.svelte";

  const lists = [
    { mode: "Child1", component: Child1 },
    { mode: "Child2", component: Child2 }
  ];

  let current = lists[0];
  let text = "Svelte";
</script>

<select bind:value={current}>
  {#each lists as list}
    <option value={list}>{list.mode}</option>
  {/each}
</select>

<!-- 선택된 옵션에 따라 하위 컴포넌트가 달리 렌더링됨 -->
<!-- current.component를 렌더링하고, content Props를 전달 -->
<svelte:component this={current.component} content={text}/>
```

### svelte:window

* window 객체에 직접 접근하지 않고도 이벤트와 속성값 바인딩을 할 때 사용
* svelte:window 엘리먼트는 최상위 컴포넌트에서만 사용 가능함

```html
<script>
  let innerWidth;
  let innerHeight;
  let outerWidth;
  let outerHeight;
  let scrollX;
  let scrollY;
  let online;

  function handleKeydown(e) {
    alert(e.key + "키를 누르셨군요.");
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:outerWidth bind:outerHeight bind:scrollX bind:scrollY bind:online on:keydown={handleKeydown} />

<p>브라우저 콘텐츠 영역의 가로 픽셀 크기(읽기 전용): {innerWidth}</p>
<p>브라우저 콘텐츠 영역의 세로 픽셀 크기(읽기 전용): {innerHeight}</p>
<p>브라우저의 가로 픽셀 크기(읽기 전용): {outerWidth}</p>
<p>브라우저의 세로 픽셀 크기(읽기 전용): {outerHeight}</p>
<p>수평 방향으로 스크롤한 픽셀 값: {scrollX}</p>
<p>수직 방향으로 스크롤한 픽셀 값: {scrollY}</p>
<p>브라우저 온라인 상태 여부: {online}</p>
```

### svelte:body

자바스크립트에서 document.body 객체에 접근하여 이벤트 리스너를 등록할 때 사용하는 엘리먼트

```html
<script>
  let message = "마우스가 어디 갔어요...?";

  function handleMouseLeave() {
    message = "마우스가 어디 갔어요...?";
  }

  function handleMouseEnter() {
    message = "마우스 포인터 발견!";
  }
</script>


<!-- body 영역에 마우스를 옮기거나 바깥 영역으로 이동하면 메시지가 바뀜 -->
<svelte:body 
  on:mouseleave={handleMouseLeave}
  on:mouseenter={handleMouseEnter}
/>

<h1>{message}</h1>
```

### svelte:head

Meta, Link, Title 등의 하위 엘리먼트를 제어할 때 사용하는 엘리먼트

```html
<svelte:head>
  <title>svelte:head로 Title 설정</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <meta http-equiv="속성값" content="속성값" name="속성값" />
</svelte:head>
```

### svelte:options

* 스벨트 컴파일러가 참고할 옵션 지정할 때 사용
* immutable 옵션: 값이 변경된 컴포넌트만 동작하게 하여 다른 컴포넌트의 불필요한 반응성을 줄이는 옵션
* accessors 옵션: 컴포넌트의 내부 데이터를 외부에서 직접 접근 허용 여부 설정. 기본 값은 False.

```html
<svelte:options immutable={true} accessors={true} />

<script>
  // 대충 자바 스크립트 코드
</script>
```