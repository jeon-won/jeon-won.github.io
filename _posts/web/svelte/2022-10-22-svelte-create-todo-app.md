---
title: 스벨트(Svelte) Todo App 만들어 보기
description: 스벨트(Svelte) Todo App 만들어 보기
date: 2022-10-22 00:00:00+0900
categories: [web, svelte]
tags: [web, svelte]
image: 
  path: /assets/img/posts/web/svelte/svelte-todo.jpg
  alt: Svelte로 만든 TODO List
---

![](/assets/img/posts/web/svelte/svelte-todo.jpg)

소스코드 링크: [https://github.com/jeon-won/study-svelte/tree/main/svelte-todo](https://github.com/jeon-won/study-svelte/tree/main/svelte-todo)

## 개발환경 구성

1. SvelteKit을 사용하여 프로젝트 생성: `npm create svelte@latest <PROJECT_NAME>`
2. 프로젝트 경로로 이동: `cd <PROJECT_NAME>`
3. 의존성 패키지 설치: `npm i`
4. 추가 패키지 설치: `npm i bootstrap uuid`
    * bootstrap은 UI를 구성하기 위해 사용
    * uuid는 여러 Todo 컴포넌트에 고유한 ID를 부여하기 위해 사용
  
## 스토어(Store) 생성

* 스토어는 [https://hoontae24.github.io/4](https://hoontae24.github.io/4)를 참고하여 만듦.
* 스토어 CRUD(Create, Read, Update, Delete)를 다른 컴포넌트에서 수행해도 되지만, 스토어를 만들 때 CRUD를 제공하는 함수도 같이 만들어주는 게 편한 것 같음...

```javascript
/*** src/todos.js ***/

import { writable } from "svelte/store";
import { v4 } from "uuid";

/* Todo 목록 */
let _todos = [
  { id: v4(), title: "스벨트 공부", done: false },
  { id: v4(), title: "숨쉬기", done: true },
  { id: v4(), title: "밥먹기", done: false },
]

const createTodos = () => {
  // Writable 스토어 생성
  const todos = writable(_todos);

  // Writable 스토어가 제공하는 함수 꺼내오기
  //  * _update 함수는 Writable 스토어가 제공하는 함수
  //  * update 함수는 아래에서 재정의할 커스텀 함수
  const { subscribe, reset, update: _update } = todos;

  // Todo 추가 함수
  const add = (title) => {
    _update(todos => todos.concat({ id: v4(), title, done: false }));
  }

  // Todo 제거 함수
  const remove = (item) => {
    if(!item) return;
    _update(items => items.filter(_item => _item.id !== item.id));
  }

  // Todo 수정 함수(_update와는 다르다. _update와는...)
  const update = (item) => {
    if(!item) return;
    _update(todos => todos.map(_item => (_item.id === item.id ? item : _item)));
  }

  // Todo CRUD 관련 함수 리턴
  return { subscribe, reset, add, remove, update };
}

export const todos = createTodos();
```

## 최상위 컴포넌트 구현

Bootstrap 5 사용 방법은 아래 링크 참고
* [https://getbootstrap.kr/docs/5.2/getting-started/introduction](https://getbootstrap.kr/docs/5.2/getting-started/introduction)
* [https://www.w3schools.com/bootstrap5/index.php](https://www.w3schools.com/bootstrap5/index.php)

### 스크립트 블록 구성

* 스토어 구독 및 구독종료: `subscribe` 및 `unsubscribe` 함수 사용
* 변수
  - `inputTodo`: 입력된 할 일 값
  - `refInput`: 할 일을 입력받는 input 태그에 포커스를 맞추기 위한 참조 변수
* 이벤트 처리 함수
  - `handleEnterKey`: input 태그에서 엔터 키 입력 이벤트 처리.
  - `handleAddbtn`: 추가 버튼 클릭 이벤트 처리. 입력된 할 일을 스토어에 저장함.
  - `handleCancelBtn`: 취소 버튼 클릭 이벤트 처리. 입력된 할 일을 초기화함.
* 하위 컴포넌트에서 전달받은 이벤트 처리 함수
  - `removeTodo`: 하위 컴포넌트에서 할 일 제거 이벤트를 보내면 스토어에서 해당 할 일을 제거
  - `changeTodo`: 하위 컴포넌트에서 할 일 수정 이벤트를 보내면 스토어에서 해당 할 일을 수정

### HTML 블록 구성

* `<nav>` 태그로 네비게이션 바 구성
* `<main>` 태그 내에 주 콘텐츠 배치
  - `<h1>` 태그로 제목 배치
  - `<input>` 태그로 할 일 입력 받기
  - `<button>` 태그로 추가/취소 버튼 생성
  - `<Todo>` 태그로 Todo 컴포넌트 배치

### 스타일 블록 구성

* 구글 폰트 import
* 모든 HTML 요소에 나눔고딕 폰트 적용
* h1 태그 색상 설정

```html
<!-- src/routes/+page.svelte -->

<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import { onDestroy } from "svelte";
  import Todo from "../Todo.svelte";
  import { todos } from "../todos";

  // 스토어 구독
  const unsubscribe = todos.subscribe((v) => {
    console.log(v);
  });

  // 컴포넌트가 파괴될 때 스토어 구독 종료
  onDestroy(unsubscribe);

  /* 변수 */
  let inputTodo = ""; // Todo 입력 값
  let refInput; // input 태그를 제어하기 위한 참조 변수

  /* 이벤트 처리 함수 */
  // input 태그 내 엔터 키 입력 이벤트 처리 함수
  const handleEnterKey = () => {
    if(window.event.keyCode == 13) {
      if(inputTodo === ""){ // 입력 값이 비어 있으면 경고 띄운 후 포커스 맞춤
        alert("할 일을 입력해주세요.");
        refInput.focus();
        return;
      }

      todos.add(inputTodo); // 입력 값을 스토어에 저장
      inputTodo = "";
    }
  }

  // 추가 버튼 클릭 이벤트 처리 함수
  const handleAddBtn = () => {
    if(inputTodo === ""){ // 입력 값이 비어 있으면 경고 띄운 후 포커스 맞춤
      alert("할 일을 입력해주세요.");
      refInput.focus();
      return;
    }

    todos.add(inputTodo); // 입력 값을 스토어에 저장
    inputTodo = "";
  }

  // 취소 버튼 클릭 이벤트 함수
  const handleCancelBtn = () => {
    inputTodo = ""; // 입력 값을 초기화 하고 포커스 맞춤
    refInput.focus();
  }

  /* 하위(Todo) 컴포넌트에서 보내온 이벤트를 처리하는 함수 */
  const removeTodo = (e) => todos.remove(e.detail);
  const changeTodo = (e) => todos.update(e.detail);  
</script>

<!-- 네비게이션 바 -->
<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <span>Svelte App</span>
    </a>
  </div>
</nav>

<!-- 메인 항목 -->
<main class="container p-3">
  <!-- 제목 -->
  <h1 class="text-center">TODO LIST</h1>

  <!-- Todo 입력 -->
  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="floatingInput" placeholder="무엇을 해야 하나요?" bind:value={inputTodo} bind:this={refInput} on:keyup={handleEnterKey}>
    <label for="floatingInput">무엇을 해야 하나요?</label>
  </div>

  <!-- 추가/취소 버튼 -->
  <div class="row">
    <div class="col">
      <button class="btn btn-primary w-100 p-2" on:click={handleAddBtn}>추가</button>
    </div>
    <div class="col">
      <button class="btn btn-danger w-100 p-2" on:click={handleCancelBtn}>취소</button>
    </div>
  </div>

  <!-- Todo 컴포넌트 배치 -->
  {#each $todos as todo (todo.id)}
    <Todo todo={todo} on:removeTodo={removeTodo} on:changeTodo={changeTodo}/>
  {/each}
</main>

<style>
  /* 구글폰트 import 후 모든 HTML 요소에 나눔고딕 적용 */
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
  
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }

  h1 {
    color: #F22208;
  }
</style>
```

## Todo 컴포넌트 구현

### 스크립트 블록

* 상위 컴포넌트에 전달할 이벤트 처리 함수
  - `dispatch`: 이벤트 부착 함수
  - `changeTodo`: 할 일 수정 이벤트를 상위 컴포넌트에 전달
  - `remoteTodo`: 할 일 제거 이벤트를 상위 컴포넌트에 전달
* 플래그 및 변수
  - `isDone`: 할 일 완료 여부
  - `isChanging`: 할 일 수정 중 여부
  - `changeBtnName`: 수정/완료 버튼 이름
* 이벤트 처리 함수
  - `handleChangeBtn`: 수정 버튼 이벤트 처리 함수. 수정 중일 때 버튼 이름을 '완료'로, 수정 중이 아닐 때 버튼 이름을 '수정'으로 변경 후 상위 컴포넌트에 할 일 수정 이벤트 전달.

### HTML 블록

* `<input>` 태그로 체크박스 표시. 체크박스를 표시하면 할 일이 완료 처리됨.
* 할 일 변경 중이면 `<input>` 태그로 할 일을 수정받는 입력박스를, 그게 아니라면 `<span>` 태그로 할 일 텍스트를 출력.
  - 완료된 일인 경우 span 태그의 클래스 값에 done을 입력하여 취소선 스타일을 적용하도록 함
* `<button>` 태그로 수정/삭제 버튼 생성
  - '수정' 버튼을 클릭하여 할 일을 수정하며,이후 나타난 '완료' 버튼을 클릭하여 할 일 수정을 마침.
  - '삭제' 버튼 클릭 시 할 일 삭제.
  
### 스타일 블록
done 클래스로 지정된 HTML 요소에 취소선 스타일 적용

```html
<!-- src/Todo.svelte -->

<script>
  import { createEventDispatcher } from "svelte";
  export let todo; // 상위 컴포넌트에서 받아온 Props

  /* 상위 컴포넌트에 전달할 이벤트 */
  const dispatch = createEventDispatcher();
  const changeTodo = () => dispatch("changeTodo", todo);
  const removeTodo = () => dispatch("removeTodo", todo);

  /* 플래그 및 변수 */
  let isDone = todo.done; // 할 일 완료 여부
  let isChanging = false; // 할 일 수정 중 여부
  let changeBtnName = "수정"; // 버튼 이름(수정 <-> 완료)

  /* 수정 버튼 이벤트 처리 기 */
  const handleChangeBtn = () => {
    isChanging = !isChanging;
    isChanging ? changeBtnName = "완료" : changeBtnName = "수정";
    changeTodo(); // change 이벤트를 상위 컴포넌트로 전달
  }
</script>

<div class="shadow-sm p-3 mb-3 bg-body rounded">
  <div class="row">
    <div class="col">
      <!-- 체크박스: 체크되어 있으면 취소선 표시 -->
      <input type="checkbox" checked={todo.done} on:click={() => isDone = !isDone}>

      <!-- 할 일 변경 중이면 입력 태그를, 아니면 텍스트 출력 -->
      {#if isChanging}
        <input type="text" class="input w-75" bind:value={todo.title}>
      {:else}
        <span class="{isDone ? 'done' : ''}">{todo.title}</span>
      {/if}
    </div>
    <div class="col-3">
      <!-- 수정/삭제 버튼 -->
      <div class="btn-group w-100" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-primary" on:click={handleChangeBtn}>{changeBtnName}</button>
        <button type="button" class="btn btn-danger" on:click={removeTodo}>삭제</button>
      </div>
    </div>
  </div>
</div>

<style>
  .done {
    text-decoration: line-through;
    color: gray;
  }
</style>
```