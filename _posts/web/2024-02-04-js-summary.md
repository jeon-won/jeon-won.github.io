---
title: JavaScript 간단 정리
description: JavaScript 간단 정리
date: 2024-02-04 15:35:00 +0900
categories: [web]
tags: [web]
---

![JavaScript meme](/assets/img/posts/web/js-meme.webp)

## 자바스크립트를 왜 쓰는가?

HTML을 조작하거나 변경하기 위해 사용. 그럼 왜 조작하거나 변경하나?

* 웹 페이지 UI 제작용
* 입력 받은 데이터 검증용
* 서버로 데이터 요청용 등


## DOM과 셀렉터

DOM(Document Object Model)은 HTML 요소를 프로그래밍 언어로 제어할 수 있게 해주는 모델. 웹 브라우저는 HTML을 Javascript Object와 비슷한 자료형에 담아두는데, 이 자료를 Javascript로 제어할 수 있음.

셀렉터를 사용하면 DOM을 조작할 수 있음.

* getElementByX 셀렉터는 HTML 요소 하나를 선택해 줌.
* getElementsByX 셀렉터는 일치하는 모든 HTML 요소를 찾아줌. 따라서 개별 요소에 접근하려면 인덱스를 사용해야 함.
* querySelector는 CSS 문법을 사용하여 HTML 요소 하나를 선택해 줌.
* querySelectorAll는 CSS 문법을 사용하여 일치하는 모든 HTML 요소를 찾아 줌. 개별 요소에 접근하려면 인덱스를 사용해야 함.

```html
<h1 id="hello">안녕요?</h1>
<h1 class="hi">저는 HTML로 코딩해요.</h1>

<script>
  document.getElementById("hello").innerHTML = "HTML은 프로그래밍 언어가 아닙니다!";
  document.getElementByClassName("hi").style.fontSize = "16px";

  document.getElementsByClassName("hello")[0].innerHTML = "HTML은 프로그래밍 언어가 아닙니다!"
  document.getElementsByTagName("h1")[0].style.fontSize = "16px";

  document.querySelector('#hello').innerHTML = "HTML은 프로그래밍 언어가 아닙니다!"
  document.querySelectorAll('.hi')[0].style.fontSize = "16px";
</script>
```

```js
document.querySelectorAll('.box h4'); // id="box"인 요소 내 h4 태그 모두 선택
```


## HTML 요소 조작

자바스크립트로 HTML을 만드는 방법은 html 객체를 만들어 붙이거나

```js
var pTag = document.createElement('p'); // p 태그 요소 생성
pTag.innerHTML = '안녕';                 // p 태그 내용 입력
pTag.classList.add('hello');            // p 태그에 class명 입력
document.querySelector('#test').appendChild(pTag); // id="test"인 요소에 p 태그 추가
```

html을 직접 작성한 후 붙이는 방법이 있음.

```js
var pTag = '<p>안녕<p>';
document.querySelector('#test').insertAdjacentHTML('beforeend', pTag); // beforeend: 안쪽 맨 밑에 추가
```

html을 통으로 교체하려면 innerHTML 속성 값을 바꿔주면 됨.

```js
var pTag = '<p>안녕<p>';
document.querySelector('#test').innerHTML = pTag;
```

class 부착(toggle)식으로 개발하면 나중에 재사용할 때 편리함.

```html
<style>
  .title { display: none; }
  .show { display: block; }
</style>

<body>
  <h1 class="title">제목</h1>
  <button class="btn">보이기/감추기</button>

  <script>
    document.querySelector('.btn').addEventListener('click', function(){
      document.querySelector('.title').classList.toggle('show');
    });
  </script>
</body>
```

위와 비슷하게, 다크모드 만들려면 CSS에 dark 클래스 디자인한 후 body 태그에 dark 클래스를 토글하면 됨.

```css
.dark {
  background: black;
  color: white;
}
```


## 변수

변수를 사용하면 자료를 저장할 수 있음.

```js
var age = 20;
let name = 'kim';
```

백틱 기호를 사용하면 문자 중간에 변수를 쉽게 넣을 수 있음.

```js
var a = '안녕';
var b = `${a}하세요?`; // 백틱 기호(`) 사용
```

Function-scoped는 해당 함수에 전역 변수로 설정됨을 의미하고, Block-scoped는 주어진 블록 내에서만 사용 가능함을 의미함.

| 변수 종류 | 사용 범위       | 재선언 가능 | 재할당 가능 |
| --------- | --------------- | ----------- | ----------- |
| var       | Function-scoped | O           | O           |
| let       | Block-scoped    | X           | O           |
| const     | Block-scoped    | X           | X           |


## 함수(Function)

함수는 긴 코드를 축약하거나 매개변수를 받아 처리할 때 사용하는 문법. 자바스크립트 함수명 작성은 camelCase를 따르는 게 관습임.

```html
<button onclick="func('arg')">Button</button>

<script>
  function func(arg){
    // 대충 함수 코드
  }
</script>
```

### 콜백 함수

위의 함수는 이름 없이 매개변수에서 호출됨. 파라미터 자리에 들어가는 함수를 콜백 함수라고 하며, 순차적으로 실행됨.

함수 파라미터 자리에 들어가는 콜백함수를 외부에 선언한 후 매개변수처럼 집어넣어도 잘 작동함.

```js
setTimeout(myFunc, 1000);
function myFunc(){ console.log('콜백함수임'); }
```

### 타이머 함수

**setTimeout() 함수**는 ms초 후에 콜백함수를 실행함. setTimeout() 함수 실행을 중단하려면 clearTimeout() 함수 사용.

```js
var timeoutId = setTimeout(function(){ 실행할코드~ }, 기다릴시간);
clearTimeout(timeoutId);
```

**setInterval() 함수**는 ms초 간격으로 콜백함수를 실행함. setInterval() 함수 실행을 중단하려면 clearInterval() 함수 사용.

```js
var intervalId = setInterval(function(){ 실행할코드~ }, 기다릴시간);
clearInterval(intervalId);
```

### 화살표 함수(Arrow Function)

Arrow function은 함수 안의 this 값이 다를 수 있음.

* 일반 함수는 함수 안에서 this 값을 알맞게 재정의해줌.
* Arrow function은 함수 안에서 this 값을 재정의하지 않고 바깥에 있던 this를 그대로 씀.

따라서 이벤트 리스너 콜백함수 안에서 this를 써야 할 때 Arrow function을 쓰면 의도와 다르게 작동할 수 있으므로 일반함수를 쓰는 게 맞음.

```js
var pants = [28, 30, 32];
pants.forEach((item) => {
  console.log(item);
}
```


## 이벤트

이벤트란 click, mouseover, scroll, keydown 등의 활동을 가리킴. 

이벤트를 감지하고 싶으면 `addEventListener()` 함수로 이벤트를 붙여주면 됨.

```html
<div class="alert-box" id="alert">
  <p>알림창임</p>
  <button id="close">닫기</button>
</div>

<script>
  // click 하면 콜백함수 function()을 실행함
  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('alert').style.display = 'none';
  });
</script>
```

### input 태그 이벤트

input 태그에서 발생하는 이벤트 중 input 이벤트와 change 이벤트가 있음. input 이벤트는 입력 값이 변경될 때마다 발생하고, chagne 이벤트는 입력값이 변경된 후 포커스를 잃을 때 발생함.

```js
document.getElementById('email').addEventListener('input', function() {
   console.log('이메일 입력 됨');
});
document.getElementById('email').addEventListener('change', function() {
   console.log('이메일 변경 함');
});
```

### scroll 이벤트

document 바깥에 존재하는 페이지(window)에 scroll 이벤트 리스너를 달면 전체 페이지를 스크롤 할 때마다 원하는 코드를 실행할 수 있음.

```js
window.addEventListener('scroll', function(){
  console.log(window.scrollX, window.scrollY); // 현재 스크롤 위치(px)
  window.scrollTo(0, 100); // 특정 x, y 스크롤 위치로 이동
  window.scrollBy(0, 100); // 현재 위치 기준에서 이만큼 스크롤
});
```

bootstrap을 사용한다면 스크롤 위치가 천천히 이동함. 순간이동하려면 아래 속성 사용.

```css
:root { scroll-behavior: auto; }
```

### select 태그 이벤트

select 태그의 선택 값을 가져오려면 value 속성을 사용하면 됨.

```js
document.querySelectorAll('.form-select')[0].addEventListener('input', function(e){
  // var value = document.querySelectorAll('.form-select')[0].value;
  var value = e.currentTarget.value; // 위 코드와 같음

  // 셔츠를 선택했다면 요소 숨김 클래스 제거
  if(value == '셔츠'){
    document.querySelectorAll('.form-select')[1].classList.remove('form-hide');
  } else if(value == '모자'){ // 모자를 선택했다면 요소 숨김 클래스 추가
    document.querySelectorAll('.form-select')[1].classList.add('form-hide');
  }
});
```

### 이벤트 객체

이벤트 콜백함수에 매개변수를 넣어주면 그 매개변수는 이벤트 객체가 됨.

```js
document.getElementById('email').addEventListener('input', function(e) {
  e.target;            // 실제로 이벤트가 발생한 HTML 요소
  e.currentTarget;     // 이벤트 리스너가 달린 요소
  this;                // 이벤트 리스너가 달린 요소
});
```

이벤트 처리 함수에서 현재 요소의 형제 요소에 접근하려면 `e.target.previousElementSibling` 또는 `e.target.nextElementSibling`을 사용하면 됨.

### DOM 이벤트

DOMContentLoaded 이벤트는 HTML을 다 읽어들인 후 발생하는 이벤트임.

```js
document.addEventListener('DOMContentLoaded', function() { });
```

load 이벤트는 이미지, CSS, JS 파일 등이 로드되었는지 체크하는 이벤트임.

```js
// class="container"인 요소가 로드되었을 때 실행할 코드
document.querySelector('.container').addEventListener('load', function(){ };

// document 안의 이미지, js 파일 포함 모두 로드되었을 때 실행할 코드
window.addEventListener('load', function(){ });
```

### 이벤트 버블링과 이벤트 관련 함수들

모든 브라우저는 이벤트 버블링(이벤트가 상위 html로 퍼지는 현상)이 일어남. 즉 상위 요소를 클릭하면 하위 요소도 클릭한 것이 됨. 이 현상을 막으려면 `e.preventDefault()` 함수를 사용해야 함.

이벤트 관련 주요 함수들은...

```js
e.preventDefault();  // 이벤토 기본동작 막기
e.stopPropagation(); // 상위요소로 이벤트 버블링 막기
```

### dataset 문법

dataset 문법을 사용하면 html 요소에 사용자에게 보이지 않는 값을 숨길 수 있음.

```html
<div class="box" data-id="0"></div>
```

dataset을 자바스크립트에서 꺼내려면...

```js
let id = document.querySelector('.box').dataset.id

document.querySelector('.box').addEventListener('click', function(e)){
  let id = e.target.dataset.id;
}
```


## 조건문(If)

조건문은 if를 사용하여 작성.

```js
if(조건 1) {
  console.log('조건 1일 때 실행할 코드');
} else if(조건 2) {
  console.log('조건 2일 때 실행할 코드');
} else {
  console.log('모든 조건이 아닐 때 실행할 코드)
}
```

if - if문은 모든 if문을 실행하지만, if - else if 문에서 if 문이 참이면 else if 문을 실행하지 않음. 특정 상황에서 실행에 영향을 줄 수 있는 차이.

```js
if(1 == 3){
  console.log('맞아요1');
} else if(3 == 3) {
  console.log('맞아요2');
}

if(1 == 3){
  console.log('맞아요1');
}
if(3 == 3) {
  console.log('맞아요2');
}
```

엄격한(타입까지 같은지) 비교는 === 연산자를, 느슨한 비교는 == 연산자 사용.

and 비교는 && 연산자를, or 비교는 || 연산자 사용.

### Switch 문법

Switch 문법은 변수 하나만 검사할 때 간편하게 사용함.

```js
  let value = 2 + 2;
  switch(value){
    case 3:
      alert('변수가 3이네요.');
      break;
    case 4:
      alert('변수가 4네요.');
      break;
    default:
      alert('아무것도 아니네요...');
  }
```


## 반복문

for문은 특정 횟수만큼 반복할 때 사용. i 변수를 var 타입으로 선언하면 Function-scoped이므로 다음 코드에서 변수 i를 만날 경우 제대로 작동하지 않으므로 Block-scoped인 let 변수로 선언하여 사용함.

```js
for(let i=0 ; i<10 ; i++){
  console.log(i);
}
```

### forEach

forEach를 사용하면 array 자료형에 반복문을 쓸 수 있음.

```js
var pants = [28, 30, 32];
pants.forEach(function(item){
  document.querySelectorAll('.form-select')[1].innerHTML += `<option>${item}</option>`;  
});
```

forEach의 콜백함수에 매개변수를 2개 주면 인덱스를 사용할 수도 있음.

```js
var pants = [28, 30, 32];
pants.forEach(function(item, index){
  console.log(`${index}번째 값: `${item}`);
});
```

### for in

object 자료도 반복문 돌릴 수 있음.

```js
var obj = {name: 'kim', age: 20};
for(var key in obj){
  console.log(key);      // 키 값 출력
  console.log(obj[key]); // 데이터 출력
}
```


## 배열(Array)과 객체(Object)

Array 자료형을 쓰면 연속되는 여러 자료를 변수 하나에 저장할 수 있음. 연속적인 데이터이므로 자료 정렬도 가능함.

```js
var car = ['캐스퍼', 50000, 'white']; // Array 생성(대괄호)
car[0] = '레이'; // Array 수정
car.sort();     // Array 정렬
```

Object 자료형을 쓰면 이름을 붙여서 저장이 가능함. 주로 비연속적인 데이터에 사용.

```js
var car = { name: '캐스퍼', price: 50000 }; // key: value 형태의 Object 생성(중괄호)
car['name'] = '레이'; // Object 수정
car.name = '레이';    // Object 수정
```

Object 안에 Object나 Array도 넣을 수 있음.

```js
var car2 = { name : '캐스퍼', price : [50000, 3000, 4000] }
```

### 배열(Array)에 자주 쓰는 함수

array 자료를 정렬하려면 sort() 함수 사용. 예전 문법이라 원본을 변형시킴.

```js
var numbers = [7, 3, 5, 2, 40];
numbers.sort(function(a, b){ // a, b 매개변수는 array 안의 자료
  return a - b; // 오름차순 정렬(return 값이 양수면 a를 오른쪽으로, 음수면 b를 오른쪽으로)
});

var alphabet = ['a', 'c', 'b']
alphabet.sort(); // 문자 오름차순 정렬
alphabet.sort(function(a, b){
  return a < b;  // 문자 내림차순 정렬
});
```

array 자료 중 원하는 것만 필터하려면 filter() 함수 사용. 신 문법이라 원본을 변형하지 않으므로 결과값을 변수에 담아서 써야함.

```js
var numbers = [7, 3, 5, 2, 40];
var newNumbers = numbers.filter(function(a){
  return a < 4; // 4 미만의 자료만 남김
});
```

array 자료를 전부 변형하려면 map() 함수 사용.

```js
var numbers = [7, 3, 5, 2, 40];
var newNumbers = numbers.map(function(a){
  return a * 4; // 요소 모두에 4를 곱한 값으로 변형
})
```


## 정규식

`includes()` 함수를 사용하면 해당 문자열이 포함되어 있는지 확인 가능. 

```js
'abc'.includes('a'); // a가 들어있으면 true 반환
```

한글이 들어있냐, 영어가 들어있냐, A로 끝나냐, 숫자가 1회 출현하냐 등을 판별하려면 정규식(문자를 검사하는 식)을 사용해야 함.

범위지정은 [], 시작여부는 ^, 반복 검색은 +, or 연산은 | 사용. 소괄호로 묶어 우선순위를 줄 수도 있음.

```js
/a/.test('abcde');            // abcde에 a가 있는지 검사
/[a-z]/.test('abcde');        // a부터 z까지의 알파벳 중 한 글자가 있는지 검사
/[a-zA-Z]/.test('abcde');     // 아무 알파벳 중 한 글자가 있는지 검사
/[가-힣]/.test('안녕');         // 한글이 들어있는지 검사
/[ㄱ-ㅎㅏ-ㅣ]/.test('ㅎㅎㅎ굳굳'); // 한글 자음 또는 모음이 들어있는지 검사
/[0-9]/.test('안녕2');         // 숫자가 들어있는지 검사
/\S/.test('안녕');      //  아무 문자(특수기호도 포함) 1개가 들어있는지 검사
/\S+/.test('안녕');     // +는 왼쪽 문자 반복 검색
/^a/.test('abcde');    // a로 시작하는지 검사
/a$/.test('ecdba');    // a로 끝나는지 검사
/a|b/.test('abcde');   // a 또는 b가 있는지 검사
/(a|b)/.test('abcde'); // a 또는 b가 있는지 검사
```

ChatGPT한테 정규식 물어보면 거의 정확하게 알려줌. 개꿀.


## 모듈화

자바스크립트 파일을 모듈화하여 사용하려면 .js 파일을 만들어 코드를 짠 다음 이걸 떙겨쓰면 됨.

```js
<script src="./JS_PATH.js">
```


## Ajax

Ajax는 브라우저 새로고침 없이 GET, POST 요청하는 기능. 

fetch() 함수는 Ajax 요청을 위해 사용하는 브라우저 기본 제공 함수. 좀 더 편하게 사용하려면 Axios 같은 라이브러리를 사용하면 됨.

```js
fetch('https://codingapple1.github.io/price.json')
  .then(res => res.json()) // 받아온 JSON을 Object 자료형으로 변환
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
```


## Local storage

여러가지 웹 브라우저 저장공간이 있음.

* Local storage와 Session storage: key-value 형태로 문자, 숫자 데이터 저장
* Indexed DB: 구조화된 데이터를 DB처럼 저장
* Cookies: 로그인 정보 저장
* Cache storage: html, css, js 등의 파일 저장 공간

이 중 Local storage는 데이터를 반영구적으로 저장하기 위한 방법. 5MB의 문자 또는 숫자 데이터만 저장 가능.

Local storage는 사이트를 재접속해도 유지되지만, Session storage는 사이트를 나가면 자동 삭제됨.

```js
localStorage.setItem('name', 'kim');
var name = localStorage.getItem('name');
var name = localStorage.name; // getItem() 함수 대신 키 값을 속성처럼 써도 됨
localStorage.removeItem('name');
```

Local storage에 array나 object 자료형을 저장하려면 JSON으로 변환 후 저장해야 함. 역으로 Local storage에 저장된 array나 object 자료형을 꺼내오려면 자료형을 변환해야 함.

```js
var arr = [1, 2, 3];
localStorage.setItem('num', JSON.stringify(arr));

var getArr = JSON.parse(localStorage.getItem('num'));
console.log(getArr);
```

Local storage를 수정하는 코드는 없음. 자료를 꺼내서 수정한 후 다시 넣어줘야 함.


## 쓸 만한 자바스크립트 라이브러리들

[**Swiper**](https://swiperjs.com/get-started#use-swiper-from-cdn)를 사용하면 캐러셀(슬라이드 이미지)를 쉽게 만들 수 있음. Lazy loading이나 터치, 드래그도 됨.

[**Chart.js**](https://cdnjs.com/libraries/Chart.js)를 사용하면 차트 그릴 수 있음. 예제 코드는 [Chart.js 홈페이지 참고.](https://www.chartjs.org/docs/latest)

[**AOS(Animate On Scroll**)](https://michalsnik.github.io/aos)를 사용하면 스크롤 내렸을 떄 요소가 서서히 등장하는 애니메이션을 만들 수 있음. [여기](https://github.com/michalsnik/aos)서 css, js 파일 CDN 버전 찾아서 HTML에 넣은 후 script 태그에 `AOS.init();` 코드 실행해주면 사용 가능.

그 다음 [여기](https://michalsnik.github.io/aos)에서 예제 코드 따라서 복붙하면 되는 듯. 예를 들어 원하는 요소에 `<div data-aos="fade-up"></div>`와 같이 추가하면 됨.

[**EmailJS**](https://www.emailjs.com/docs/introduction/how-does-emailjs-work)는 자바스크립트만으로 이메일 전송을 해줌.

[**Lodash**](https://lodash.com)는 array, object, 문자, 숫자 자료를 다루기 편해지는 함수들을 제공함. 

[**Fullpage.js**](https://alvarotrigo.com/fullPage)는 웹페이지를 PPT처럼 만들어줌. [여기](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/korean#fullpagejs)에서 css, js 파일을 CDN 식으로 설치해서 사용하면 됨.


## 모던 웹개발 시 알면 좋은 것

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZM55pce2AkY?si=7JgGaipksqbfVJxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**npm**은 js 라이브러리 관리를 도와주는 패키지 매니저.

**Node.js**는 웹 브라우저 밖에서 js를 실행해주는 엔진.

**Bundling Tool**은 여러 js 파일들을 하나로 합쳐주는 툴. 안 쓰는 함수나 변수 등을 제거해주므로 용량을 줄여줌.

**SPA(Single Page Application)**는 모바일 앱처럼 새로고침 없이 부드럽게 동작하는 사이트. 이를 개발하기 위한 라이브러리는 React, Vue, Angular, Svelte 등이 있음.

**State management**는 SPA의 데이터(변수)를 관리해주는 라이브러리.

**SSR(Server Side Rendering)**은 HTML을 서버에서 만들어 보내주는 방식. SPA의 단점인 검색엔진 노출 어려움, js 파일 용량 문제를 해결할 수 있음.

**Meta Framework**는 프레임워크를 위한 프레임워크. 예를 들어 Next.js는 React를 위한 프레임워크?

**TypeScript**는 타입 기능이 강화된 자바스크립트.

**Serverless**는 서버 역할을 대신 해주는 서비스.