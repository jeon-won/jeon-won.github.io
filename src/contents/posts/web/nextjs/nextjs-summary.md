---
title: Next.js 간단 정리
description: Next.js 간단 정리
date: 2024-09-05 00:00:00
tags:
  - web
  - next.js
series: web
previewImage: "web.jpg"
// isPrivate: true
---

![Next.js](./images/nextjs.webp)

Next.js 14.2.7 버전 사용법을 배워보고 정리한 글.


## 🤔 Next.js란?

**Next.js는 풀 스택 웹 애플리케이션 개발 도구.** 주요 특징은...

* React를 기반으로 SSR(Server-Side Rendering)을 지원함.
* 개발하기 쉬움. 라우팅, API 생성, 이미지 최적화 등 웬만한 기능을 기본적으로 제공해주기 때문.


## 👋 Hello Next.js!

### Next.js 프로젝트 생성

[node](https://nodejs.org/)를 설치한 후 아래 절차에 따라 Next.js 프로젝트를 생성.

1. 프로젝트 생성: `npx create-next-app@latest`
2. 프로젝트 경로로 이동: `cd PROJECT_NAME`
3. 프로젝트 결과물 띄워보기: `npm run dev`

http://localhost:3000 주소로 접속하면 프로젝트 결과물을 볼 수 있음.

### Hello Next.js! 띄워보기

`app/page.js`  파일을 열어 아래와 같이 작성한 후 접속하면 Hello Next.js!가 보일 것임.

```js
export default function Home() {
  return (
    <h1>Hello Next.js!</h1>
  );
}
```

### Next.js 기본 구조

`app` 폴더에 프로젝트 구현에 필요한 소스코드 대부분을 저장함.

* `page.js`: 루트 경로(http://localhost:3000/) 접속 시 보여줄 페이지.
* `layout.js`: 페이지 바깥 부분에 보여줄 내용을 명시한 파일. 즉 page.js는 layout.js에 포함됨.
* `globals.css`: 모든 페이지에 적용할 스타일
* `page.module.css`: page.js 파일에 적용할 스타일
* `XXX.module.css`: 특정 페이지에만 적용할 스타일

`.next` 폴더는 프로젝트를 빌드한 결과물을 저장.

`public` 폴더에는 주로 이미지, 폰트 등을 저장.


## 🆕 Javascript 및 React 기초

### export 및 import

자바스크립트 일부 코드는 다른 파일로 분할한 후 가져다 쓰기도 함. 

1. 변수, 함수, 객체 등을 선언한 후 `export default`로 내보낸 후

```js
let name = 'next.js';
export default name; // default는 한 번만 선언 가능
```

2. 다른 js 파일에서 import 하면 됨

```js
import name from './data.js';
```

내보낼 변수나 함수가 여러가지라면 객체로 만들어 내보내면 됨.

```js
let name = 'next.js';
let version = 14
export default {name, version};
```

```js
import {name, version} from './data.js'
```

### async와 await

자바스크립트의 async와 await는 비동기 코드를 처리할 때 사용하는 문법. 

자바스크립트는 처리가 늦는 코드를 발견하면 제껴두고 다음 코드를 실행하는데, 이를 기다릴 때 await 키워드를 사용함. 정확히는 Promise를 반환하는 코드에만 await 키워드를 사용할 수 있음.

await 키워드를 사용하는 코드가 포함된 함수를 선언할 땐 async 키워드를 사용해야 함.

자세한 건 아래 MongoDB 및 API 파트에서 설명하겠음...


### React 기초 문법(JSX)

React는 JSX 문법을 사용함. 그래서 Javascript와 HTML을 섞어가듯 사용함.

컴포넌트의 return문 안엔 HTML 태그 하나만 넣어야 함. 두 개 이상 넣으려면 하나의 태그로 감싸줘야 함.

```js
export default function Home(){
  return (
    <div>
      <h1>컴포넌트의 return문 안엔 HTML 태그 하나만 넣어야 함.</h1>
      <h2>이런 식으로 태그를 두 개 이상 넣으려면 하나의 태그로 감싸줘야 함.</h2>
    </div> 
  )
}
```

HTML 안에 자바스크립트 변수를 넣으려면 중괄호 `{}`를 쓰면 됨.

```js
export default function Home(){
  let name = 'nextjs'    // 자바스크립트 변수를
  return <h1>{name}</h1> // HTML에 넣을 때 중괄호 {} 사용
}
```

HTML 태그에 스타일을 적용하려면...

1. CSS 스타일을 작성하려면 HTML 태그에 className 속성을 넣어준 후 globals.css 등의 파일에 CSS 스타일을 작성하거나
2. HTML 태그에 style 속성을 넣어주되, Object 자료형식으로 작성해야 함. CSS에서 사용하던 속성 이름을 camelCase 표기로 바꿔서 써주면 됨.

```js
export default function Home(){
  return (
    /* 1. class 대신 className 속성 넣어준 후 CSS 파일에 스타일 작성 */
    <h1 className="title">제목</h1>

    /* 2. 또는 style 속성 사용 */
    <p style={{ color: 'blue', fontSize: '14px' }}>내용</p>
  )
}
```

### map() 함수 반복 처리

JSX에선 for문을 사용할 수 없으므로 **map() 함수를 사용하여 반복문을 구현**함. 꼭 for문을 사용해야 한다면 HTML 문서 바깥 부분에서 for문을 사용한 후 결과값을 HTML에 가져다 쓰면 되긴 함.

map() 함수로 반복 생성된 HTML 요소에는 key 속성을 넣는 걸 권장함.

```js
export default function Home(){
  let items = ['🤭 previous.js', '😅 current.js', '😂 next.js']

  return (
    <div>
      {
        items.map((item, index) => {
          return <p key={index}>{item}</p>
        })
      }
    </div>    
  )
}
```


## 🧩 컴포넌트

컴포넌트는 UI를 구성하는 기본 단위.

### 컴포넌트 만들기

컴포넌트는 함수 만들듯이 만들면 됨.

```js
export default function Todo(){
  return <h2>할 일 목록</h2>
}
```

컴포넌트를 만든 후 다른 컴포넌트에 불러와 쓸 수 있음.

```js
export default function Todo(){
  return (
    <div>
      <h2>할 일 목록</h2>
      <TodoItem/> {/* 2. 컴포넌트 불러다 쓰기 */}
    </div>
  )
}

/* 1. 컴포넌트 생성 */
function TodoItem(){
  return (
    <p>Next.js 학습</p>
  )
}
```

컴포넌트를 다른 js 파일에 만든 경우 이를 import하여 사용할 수 있음.

```js
/* TodoItem.js 파일에 만든 컴포넌트 import */
import TodoItem from "./TodoItem";

export default function Todo(){
  return (
    <div>
      <h2>할 일 목록</h2>
      <TodoItem/> {/* import한 컴포넌트 불러다 쓰기 */}
    </div>
  )
}
```

**재사용이 잦은 HTML 요소들을 묶어 컴포넌트로 만드는 게 좋음.** HTML 요소들을 하나의 컴포넌트에 너무 많이 묶으면 컴포넌트가 비대해지고, 그렇다고 최대한 쪼개면 컴포넌트 간 데이터 공유가 복잡해질 수 있으니... 컴포넌트를 적당히 쪼개고 합치는 게 좋아 보임.

### 이미지 넣기

이미지를 넣으려면 img 태그나 Image 컴포넌트를 사용하면 됨. 

1. img 태그 사용
   - 장점: 간편함
   - 단점: 최적화하기 불편함
2. Image 컴포넌트 사용
   - 장점: 자동으로 최적화해줌(사이즈 자동 조절, lazy loading 및 Layout shift 적용)
   - 단점: 사용하기 매우 번거로움. 로컬에 있는 이미지조차 하나하나 import해야 하고, 외부 이미지를 사용하는 경우 width와 height 속성이 필요하며, [next.config.js 파일에 이미지 도메인와 경로까지 등록해줘야 함.](https://nextjs.org/docs/app/building-your-application/optimizing/images#remote-images)

로컬 이미지를 넣으려면 public 폴더에 이미지를 복사하여 사용하면 됨.

```js
import Image from "next/image";
import myImage from '@/public/image.jpg' // Image 컴포넌트에서 사용하기 위해 이미지 파일 import

export default function Home(){
  return (
    <div>
      <img src={'./image.jpg'}/> {/* img 태그로 이미지 넣기 */}
      <Image src={myImage}/>     {/* Image 컴포넌트로 이미지 넣기 */} 
    </div>
  )
}
```

### 레이아웃 컴포넌트(layout.js)

모든 페이지에서 **공통적으로 보여야 하는 UI(네비게이션 바 등)는 `app/layout.js` 파일에 작성**해주면 됨. 

layout.js 파일을 작성하면 하위 경로에 있는 모든 page.js에 적용됨.

```js
// app/layout.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>NavBar</h1> {/* 모든 페이지에 NavBar 표시 */} 
        {children}      {/* chidren은 하위 경로에 있는 모든 page.js */} 
      </body>
    </html>
  );
}
```

### Props로 컴포넌트에 데이터 전달하기

**Props는 부모 컴포넌트가 자식 컴포넌트에 데이터(변수, 함수 등)를 전송하는 방법.**

* 자식 → 부모 Props 패륜전송 불가 🤣
* 서로 아무런 관련 없는 컴포넌트끼리 Props 불륜전송 불가 😂

```js
import TodoItem from "./TodoItem";

export default function Todo(){
  let todo = "Next.js 복습"
  return (
    <div>
      <h2>할 일 목록</h2>
      {/* 자식 컴포넌트에 props 전송 */}
      <TodoItem todo="Next.js 학습"/>
      <TodoItem todo={todo}/>
    </div>
  )
}
```

```js
export default function TodoItem(props){
  /* 전송받은 props 꺼내오기 */
  let item = props.todo
  return <p>{item}</p>
}
```

### 서버 컴포넌트

**서버 컴포넌트는 서버에서 렌더링되어 클라이언트에 HTML 형태로 제공되는 컴포넌트.** 자바스크립트 기능이 필요 없는 페이지 제작 시에 사용되며, 주요 특징은 다음과 같음.

* 별도 선언이 없으면 기본적으로 서버 컴포넌트로 만들어짐
* 서버가 자바스크립트를 전달하지 않으므로 클라이언트의 부하가 줄어들고, HTML을 전달하므로 검색 엔진 최적화(SEO)에 유리함
* 비동기 코드(DB 접근, API 요청 등)를 처리할 수 있음
* 자바스크립트와 React의 Hooks(useState, useEffect 등)를 사용할 수 없음

### 클라이언트 컴포넌트

**클라이언트 컴포넌트는 클라이언트(웹브라우저)에서 실행되는 컴포넌트.** 자바스크립트 기능이 필요한 페이지 제작 시 사용되며, 주요 특징은 다음과 같음.

* js 파일 맨 첫줄에 `'use client'`라고 작성하면 클라이언트 컴포넌트로 만들어짐
* 클라이언트에서 자바스크립트가 실행되므로 부하가 늘어나고 검색 엔진 최적화(SEO)에 불리함
* React의 Hooks(useState, useEffect 등)를 사용할 수 있음
* 클라이언트 컴포넌트는 서버 컴포넌트 내에 import되어 사용할 수 있음. 서버 컴포넌트에서 클라이언트 컴포넌트 기능을 쓰고 싶으면 서버 컴포넌트에서 클라이언트 컴포넌트를 가져와 사용하면 됨.


### loading.js, error.js, not-found.js

**loading.js는 로딩 화면을 보여줌.** 인터넷 속도 느린 유저들에게 반응이라도 보여주면 좋아할 듯 😅

* 로딩 화면을 보여주고 싶은 page.js 파일이 있는 경로에 loading.js 파일을 만들면 됨
* app 폴더에 loading.js 파일을 만들면 전역적인 로딩 화면을 보여줌
* 클라이언트 컴포넌트로도 사용 가능함

```js
export default function Loading(){
  return <h4>로딩중!!!</h4>
}
```

**error.js는 에러 페이지를 띄움.** 에러난 page.js 파일을 처리해주고 상위 UI는 남아있게 되므로 유저들이 좋아할 듯 😅

* 에러 화면을 보여주고 싶은 page.js 파일이 있는 경로에 error.js 파일을 만들면 됨.
* app 폴더에 error.js 파일을 만들면 전역적인 에러 화면을 보여줌
* error.js 파일은 하위 경로에 있는 layout.js에서 발생한 에러를 체크함. 즉 같은 경로에 있는 layout.js에서 발생한 에러는 체크하지 못함. 최상위 layout.js에서 발생한 에러를 처리하려면 app 폴더에 global-error.js 파일을 만들어야 함.
* error 및 reset Props를 사용할 수 있음
* 무조건 클라이언트 컴포넌트로 만들어야 함

```js
'use client'
export default function Error({error, reset}){
  return (
    <div>
      <h4>🚨 🚨 에러 경보 🚨 🚨</h4>
      <p>에러 정보: {error.toString()}</p>
      <button onClick={() => { reset() }}>페이지 리로드</button>
    </div>   
  )
}
```

**not-found.js는 404 Not Found 처리를 해줌.** Next.js는 기본적으로 404 Not Found 처리를 해주고, 코드 상에서 404 Not Found가 발생하지 않도록 처리해주면 되므로 만들고 싶으면 만드셔도 됨.

* Not Found 화면을 보여주고 싶은 page.js 파일이 있는 경로에 not-found.js 파일을 만들면 됨
* app 폴더에 not-found.js 파일을 만들면 전역적으로 Not Found 화면을 보여줌


### State

**State는 React 컴포넌트에서 사용하는 변수 같은 것.** HTML과 연계된 State의 값이 변경되면 변경된 HTML 부분을 자동으로 렌더링할 수 있음. 

따라서 실시간으로 바뀌지 않는 값(제목 등)은 굳이 State로 만들 필요 없이자바스크립트 변수를 선언해서 사용하면 되며, **바뀐 사항이 HTML에 자동으로 반영되어야 할 때 State를 사용하는 게 좋음.**

```js
/* React Hooks(useState)와 자바스크립트를 사용하므로 클라이언트 컴포넌트여야 함 */
'use client'
import { useState } from "react";

export default function Home(){
  /* State 선언 */
  let [count, setCount] = useState(0) // State 이름과 변경 함수

  return (
    <div>
      {/* 버튼을 클릭하면 State 값이 1씩 증가 */}
      <button onClick={() => { setCount(count+1) }}>눌러보셈</button>
      {/* State가 HTML과 연계되어 있으므로 State 변경 시 HTML이 자동 렌더링 됨 */}
      <h2>{count}</h2>
    </div>
  )
}
```

State의 기존 값과 새로운 값이 같으면 State 변경 함수는 값을 변경하지 않음. Array 자료형인 State 복사가 잘 안돼서 갸우뚱하는 경우가 있는데, 이 경우 **Array 복사본을 만든 후 복사본을 수정하여 반영**해주면 됨.

```js
'use client'
import { useState } from "react";

export default function Home(){
  let [items, setItems] = useState(['Next.js', 'Svelte', 'Vue'])

  return (
    <button onClick={() => {
      /* 배열의 주소를 복사하는 것이므로 사실상 둘이 똑같음 -> State 변경 안 됨 */
      let newItems1 = items
  
      /* 배열 사본을 만듦 -> State 변경됨 */
      let newItems2 = [...items]
      newItems2[0] = 'NextJS'
      setItems(newItems2)
      console.log(items) // 진짜 바꼈는지 못 믿겠으면 웹브라우저 콘솔 창에서 변경 값 확인
    }}>눌러보셈</button>
  )
}
```


## 🚀 라우팅

### 자동 라우팅

특정 URL에 대응하는 페이지를 만들고 싶다면 **app 폴더 안에 폴더를 만들고 그 안에 page.js 파일을 작성**해주면 됨.

예를 들어 `app/hello/page.js` 파일을 만든 후 http://localhost:3000/hello 주소로 접속하면 페이지 내용이 보일 것임.

```js
export default function hello(){
  return <h2>안녕요?ㅎ</h2>
}
```

### Link 컴포넌트

**Link 컴포넌트는 페이지를 부드럽게 전환하는 링크를 만들어 줌.**

Link 컴포넌트는 기본적으로 Prefetch를 수행함. Link 태그를 많이 사용하면 비효율적일 수 있으므로 이를 비활성활 수 있음.

```js
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/list" prefetch={false}>List</Link> {/* Prefetch 비활성화 */}
    </nav>
  );
}
```

### useRouter

useRouter를 사용하면 다양한 라우팅 기능을 사용할 수 있음.

* `push('URL')`: URL로 이동
* `back()`: 뒤로 이동
* `forward()`: 앞으로 이동
* `refresh()`: 바뀐 부분만 새로고침(Soft refresh)
* `prefetch('URL')`: URL의 내용을 미리 로드

```js
'use client'
import { useRouter } from "next/navigation" // "next/route" 아님

export default function Home(){
  let router = useRouter()
  return <button onClick={() => router.push('/')}>클릭 시 메인 페이지로 이동함</button>
}
```

### Dynamic route

**Dynamic route는 URL의 특정 부분을 변수처럼 사용할 수 있게 해주는 기능.**

예를 들어 `app/posts/[id]/page.js` 파일을 만들었다면 http://localhost:3000/posts/대충-입력한-값 주소로 접속이 가능함. `대충-입력한-값`은 컴포넌트 내에서 `props.params.id` 속성으로 전달받을 수 있음.

```js
export default function Posts(props){
  let postId = props.params.id
  return <h2>{postId}</h2>
}
```

### URL 정보 알아내기

현재 URL 정보가 궁금하다면 아래 함수들을 사용할 수 있음.

* `usePathname()`: 현재 URL 출력
* `useSearchParams()`: Search parameter(Query string) 출력
* `useParams()`: Dynamic route에 입력한 내용(URL 파라미터) 출력

```js
'use client'
import { usePathname, useSearchParams, useParams } from 'next/navigation'

export default function Home(){
  console.log(`Pathname: ${usePathname()}`)
  console.log(`Search Params: ${useSearchParams()}`) // URL 뒤에 ?query=string 과 같이 입력해보면 뜰 것임
  console.log(`Params: ${useParams()}`)
}
```


## 📁 MongoDB 사용하기

### MongoDB란?

**MongoDB는 BSON(Binary JSON. JSON과 유사함)을 사용하는 NoSQL 데이터베이스.** 주요 특징은 다음과 같음.

* 계층구조: 데이터베이스(DB) → 컬렉션(Collection, 관계형 DB의 Table) → 문서(Document, 관계형 DB의 Tuple/Row)
* 키-값 쌍으로 이루어진 데이터를 문서(Document)에 저장함
* 정해진 스키마(관계형 DB의 Column)가 없음. 따라서 서로 구조가 다른 문서를 같은 컬렉션(Collection)에 저장할 수 있음.
* 관계형 데이터베이스에서 사용하는 테이블 조인(Join)이 없음. 아예 없다고 하긴 그렇지만... 다른 문서의 `_id` 값을 참조하는 방식을 사용해야 함.

### 초기 설정

여기서는 로컬에 MongoDB를 설치하는 게 아닌 무료 호스팅 서비스를 이용할 것임. 아래와 같이 진행.

1. https://mongodb.com 에 접속하여 회원가입 후 무료 티어 가입.
2. https://cloud.mongodb.com 에 접속하여 Database Access 메뉴에서 DB 접속용 계정 생성. Built-in Role은 Atlas admin으로 설정.
3. Next.js 프로젝트 루트 경로에 `.env` 파일을 만들고 아래와 같이 입력 후 저장

```
MONGODB_ID=위에서 만든 ID
MONGODB_PASSWORD=위에서 입력한 비밀번호. 비밀번호에 $가 들어가 있다면 \$로 입력해야 함.
```

4. Network Access 메뉴에서 접속할 IP를 설정. 원래는 신뢰할 수 있는 IP만 추가하는 게 원칙이나, 테스트 용이므로 0.0.0.0/0을 추가함.
5. 다시 https://cloud.mongodb.com 접속하여 Database 메뉴의 Browse Collections 버튼을 클릭하면 데이터를 추가할 수 있음. Add My Own Data 버튼을 클릭하고 DB 이름과 컬렉션 이름을 원하는대로 입력.
6. Next.js 프로젝트 루트 경로에서 `npm i mongodb` 명령어를 실행하여 mongodb 패키지 설치.

### MongoDB 접속 코드 작성

MongoDB에 접속하기 위한 js 코드를 작성. 여러 컴포넌트에서 사용할 수 있도록 `util/database.js` 경로에 저장함.

```js
const { MongoClient, ServerApiVersion } = require('mongodb');
const id = process.env.MONGODB_ID
const pw = process.env.MONGODB_PASSWORD

/* 아래 URI는 https://cloud.mongodb.com 접속 → Connect 버튼 → Drivers 메뉴에서 조회 */
const uri = `mongodb+srv://${id}:${pw}@cluster0.w2pvu2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}
let connectDB

/* 
 * Next.js 개발 시 js 파일을 수정하면 모든 js 파일을 전부 다시 읽고 지나가므로 DB 초기화를 계속 할 것임 
 * 이를 막기 위한 코드
 */
if (process.env.Node_ENV === 'development') {
  if(!global._mongo) {
    global._mongo = new MongoClient(uri, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(uri, options).connect()
}

export { connectDB }
```

이제 MongoDB에 접근하고자 하는 컴포넌트에서 위 코드를 가져다 사용하면 됨.


### MongoDB CRUD

MongoDB 데이터 저장(Create)은 insertOne() 함수 사용

```js
import { connectDB } from "@/util/database";

let dbName = "myforum"
let collectionName = "post"

export default async function Home(){
  let data = { title: '제목입니다.', content: '내용입니다.' } // 저장할 데이터
  const db = (await connectDB).db(dbName)
  let result = await db.collection(collectionName).insertOne(data) // 저장

  return (
    <div>
      <h2>이 페이지에 접속하면 MongoDB에 데이터가 저장됩니다.</h2>
      <p>{JSON.stringify(result)}</p>
    </div>
  )
}
```

MongoDB 데이터 가져오기(Read)는 find() 또는 findOne() 함수 사용

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

let dbName = "myforum"
let collectionName = "post"

export default async function Home(){
  const db = (await connectDB).db(dbName)
  let result1 = await db.collection(collectionName).find().toArray() // 컬렉션에 저장된 모든 데이터 가져오기
  let result2 = await db.collection(collectionName).findOne({ _id: new ObjectId('66d7d767742b592bebe2693f') }) // 조건 검색(ObjectId)
  let result3 = await db.collection(collectionName).findOne({ title: '제목입니다.', content: '내용입니다.' }) // 조건 검색

  return (
    <div>
      <h2>이 페이지에 접속하면 MongoDB에 저장된 데이터가 출력됩니다.</h2>
      <p>find(): {JSON.stringify(result1)}</p>
      <p>findOne(_id): {JSON.stringify(result2)}</p>
      <p>findOne(title, content): {JSON.stringify(result3)}</p>
      <div>
      {/* DB 데이터를 HTML에 연계하려면... */}
      <h2>{result1[0].title}</h2>
      <p>{result1[0].content}</p>
    </div>
    </div>
  )
}
```

MongoDB 데이터 수정(Update)은 updateOne() 함수 사용.

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

let dbName = "myforum"
let collectionName = "post"

export default async function Home(){
  const db = (await connectDB).db(dbName)
  let result = await db.collection(collectionName).updateOne(
    { _id: new ObjectId("66d7d767742b592bebe2693f") }, // 수정 전 데이터를 찾을 조건
    { $set: { // 수정 후 데이터 내용
      title: '제목',
      content: '내용', 
    }}
  )

  return (
    <div>
      <h2>이 페이지에 접속하면 MongoDB 수정 여부가 출력됩니다.</h2>
      <p>updateOne(): {JSON.stringify(result)}</p>
    </div>
  )
}
```

MongoDB 데이터 삭제(Delete)는 deleteOne() 함수 사용.

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

let dbName = "myforum"
let collectionName = "post"

export default async function Home(){
  const db = (await connectDB).db(dbName)
  let result = await db.collection(collectionName).deleteOne({ _id: new ObjectId("66d7d767742b592bebe2693f") })

  return (
    <div>
      <h2>이 페이지에 접속하면 MongoDB 데이터 삭제 여부가 출력됩니다.</h2>
      <p>deleteOne(): {JSON.stringify(result)}</p>
    </div>
  )
}
```


## 💬 API

### 3-Tier Architecture

DB를 사용하는 API 기능은 3-Tier Architecture(클라이언트 - 서버 - DB) 기반으로 만들어야 함. 클라이언트가 요청을 검증하지 않고 DB에 마구마구 저장하면 코딩인생 끝날 수 있음... 😱

**클라이언트의 요청을 서버가 검증한 후 이를 DB에 반영하는 식으로 구현**해야 함.

### 자동 라우팅을 이용한 API 만들기

**Next.js에서 API 기능을 만들려면 `pages/api` 폴더에 js 파일을 만들어 주면 됨.** 예를 들어 `pages/api/test.js` 파일을 만들었다면 http://localhost:3000/api/test 주소로 API 요청을 보낼 수 있음.

```js
export default function handler(req, res){
  if(req.method == 'GET'){
    console.log(req.body)
    return res.status(200).json({ method: 'GET', status: 'OK' })
  } if(req.method == 'POST'){
    console.log(req.body)
    return res.status(200).json({ method: 'POST', status: 'OK', })
  }
}
```

이 방법의 단점은 API와 컴포넌트를 각각 다른 파일에 만들어야 해서 귀찮다는 점임. 물론 관점에 따라서 단점이 아닐 수도 있긴 함.


### MongoDB 데이터 CRUD API 만들어 보기

데이터를 저장(Create)하는 API와 페이지 코드

```js
export default async function Home(){
  return (
    <div>
      <h2>글 작성</h2>
      <form action="/api/post/create" method="POST">
        <input name="title" placeholder="글 제목"/>
        <input name="content" placeholder="글 내용"/>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
```

```js
import { connectDB } from "@/util/database";

export default async function handler(req, res){
  if(req.method == 'POST'){
    let data = req.body // 요청 매개변수의 body 객체에 클라이언트의 데이터가 담김
    const db = (await connectDB).db('myforum')
    await db.collection('post').insertOne(data)
    return res.redirect(302, '/') // 최상위 URL로 이동되도록 응답
  }
}
```

데이터를 조회(Read)하는 API와 페이지 코드

```js
import { connectDB } from "@/util/database";

export default async function Home(){
  const db = (await connectDB).db('myforum')
  let result = await db.collection('post').find().toArray()

  return (
    <div>
      <h2>글 조회</h2>
      {
        result ? result.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          )
        }) : null
      }
    </div>
  )
}
```

```js
import { connectDB } from "@/util/database"

export default async function handler(req, res){
  if(req.method == 'GET'){
    const db = (await connectDB).db('myforum')
    let result = await db.collection('post').find().toArray() // 컬렉션의 모든 문서 가져오기
    return res.status(200).json(result)
  }
}
```

데이터를 수정(Update)하는 API와 페이지 코드

```js
export default async function Home(){
  return (
    <div>
      <h2>글 수정</h2>
      <form action="/api/post/update" method="POST">
        <input name="_id" placeholder="글 ID"/>
        <input name="title" placeholder="글 제목"/>
        <input name="content" placeholder="글 내용"/>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
```

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  if(req.method = 'POST'){
    /* 클라이언트가 보낸 데이터 추출 */
    let _id = req.body._id // 수정 전 문서의 _id
    let data = {           // 수정 후 문서의 데이터
      title: req.body.title,
      content: req.body.content,
    }

    /* 문서 데이터 수정 */
    const db = (await connectDB).db('myforum')
    await db.collection('post').updateOne(
      { _id: new ObjectId(_id) },
      { $set: data }
    )
    
    return res.redirect(302, '/')
  }
}
```

데이터를 삭제(Delete)하는 API와 페이지 코드

```js
export default async function Home(){
  return (
    <div>
      <h2>글 삭제</h2>
      <form action="/api/post/delete" method="POST">
        <input name="_id" placeholder="글 ID"/>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
```

```js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  if(req.method = 'DELETE'){
    /* 삭제할 문서의 _id */
    let _id = req.body._id 

    /* 문서 데이터 수정 */
    const db = (await connectDB).db('myforum')
    await db.collection('post').deleteOne({ _id: new ObjectId(_id) })    
    return res.redirect(302, '/')
  }
}
```

### Ajax

HTML Form으로 GET, POST 등 요청 시 페이지가 새로고침 됨. 반면 **Ajax 요청은 페이지가 새로고침 되지 않으므로 좋음.**

Axios 라이브러리를 사용하면 좀 더 편할 것 같지만 아직 안 배워봄...

```js
'use client'

export default function Home(){
  return (
    <div>
      {/* Ajax GET 요청하는 버튼 */}
      <button onClick={() => {
        fetch('/api/post/read', { method: 'GET' }) // GET 요청
          .then(res => { return res.json() })      // Promise
          .then(data => { console.log(`응답 데이터: ${JSON.stringify(data)}`) }) // Object → JSON
      }}>GET</button>
    </div>
  )  
}
```

### Query string

**Query string은 URL에 파라미터를 명시하여 데이터를 쉽게 가져다 쓰기 위한 방법.**

* 장점: GET 요청으로 간단하게 데이터 전송이 가능함
* 단점: 데이터가 많아질수록 URL이 더러워지고, 민감한 데이터를 넣다가 코딩인생 끝날 수도 있음... 😱

예를 들어 `pages/api/test.js` 파일을 아래와 같이 만든 후 http://localhost:3000/api/test?name=nextjs&version=14 주소로 접속하면 서버에서 `{ name: 'nextjs', version: '14' }` 라는 객체를 가져다 사용할 수 있음.

```js
export default function handler(req, res){
  console.log(req.query) // Query string 출력
  return res.status(200).json()
}
```

또 다른 예로, `pages/api/[test].js` 파일을 위와 같이 만든 후 http://localhost:3000/api/hello 주소로 접속하면 서버에서 `{ test: 'hello' }` 라는 객체를 가져다 쓸 수 있음.

### Server actions

**Server actions 기능은 사용하면 하나의 파일에 컴포넌트 페이지와 컴포넌트가 요청하는 동작을 처리하는 함수를 만들어 줌.** 14 버전 이상에선 기본 지원되므로 그냥 쓰면 되고, 그 미만 버전에선 next.config.js(또는 .mjs) 파일에 아래와 같이 명시해줘야 함.

```javascript
/* next.config.mjs */

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    serverActions: true,
  },
};

export default nextConfig;
```

사용법은... 컴포넌트 안에 액션 함수를 만들어 쓰면 됨.

```js
export default async function Home(){
  /* 액션 함수 */
  async function handleSubmit(formData){
    'use server' // 액션 함수임을 선언
    console.log(`클라이언트가 전송한 데이터: ${formData.get('title')}`)
  }
  
  return (
    {/* 폼 데이터가 액션 함수(handleSubmit)로 전달됨 */}
    <form action={handleSubmit}>
      <input name="title" placeholder="내용입력"></input>
      <button type="submit">전송</button>
    </form>
  )
}
```

Server actions는 클라이언트 컴포넌트에서도 사용할 수 있음. 그런데 page.js 파일에서 직접 사용하면 위험하므로 별도 js 파일을 만든 후 이를 import하여 사용하면 됨. (그러면 자동 라우팅 API와 차이가...?)

Server actions 사용 시 HTML 폼 전송 시 HTML 내용 변경이 안 됨. 이를 해결하려면 폼 전송 직후 `router.refresh()`를 사용하거나, 서버 컴포넌트인 경우 revalidateTag() 또는 revalidatePath()를 사용하여 특정 페이지 캐시를 삭제해주면 됨.

```js
import { connectDB } from "@/util/database"
import { revalidatePath } from "next/cache"

export default async function Home(){
  const db = (await connectDB).db('myforum')
  let result = await db.collection('post').find().toArray()

  /* 액션 서버 */
  async function handleSubmit(formData){
    'use server'
    /* 입력 받은 데이터를 DB에 저장 */
    const db = (await connectDB).db('myforum')
    await db.collection('post').insertOne({ 
      title: formData.get('title'),
      content: formData.get('content'),
    })
    /* 페이지 캐시 삭제하여 등록한 내용이 바로 보이도록 함 */
    revalidatePath('/')
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title" placeholder="제목 입력"></input>
        <input name="content" placeholder="내용 입력"></input>
        <button type="submit">전송</button>
      </form>
      { /* DB 데이터 HTML로 출력 */
        result ? result.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
          )
        }) : null
      }
    </div>
  )
}
```


## 🎨 렌더링과 캐시

Next.js 프로젝트를 배포하려면 `npm run build` 명령어를 실행하여 html, css, javascript로 변환해줘야 함. 변환된 결과물은 `.next` 폴더에 저장됨.

`npm run build` 명령어를 실행하면 렌더링 방식(Static 또는 Dynamic)이 표시됨.

```
Route (app)          Size     First Load JS
┌ ○ /                148 B          87.2 kB
├ ○ /abc             871 B          87.9 kB
├ ƒ /def/[gh]        148 B          87.2 kB
├ ƒ /ijkl/[mn]       148 B          87.2 kB
├ ○ /opqr            532 B          94.4 kB
└ ○ /stuvw           148 B          87.2 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

**Static 렌더링은 페이지는 변하지 않는 HTML 페이지를 그대로 클라이언트에 보냄.** 완성본을 보내는 것이므로 전송 속도가 빠름. 

반면 **Dynamic 렌더링 페이지는 클라이언트가 접속할 때마다 새로운 HTML을 만들어 보냄.** 수정본을 보내는 것이므로 전송 속도가 느림.

보통 Static, Dynamic 렌더링을 알맞게 해주지면 그렇지 않은 경우도 있음. 예를 들어 DB 데이터를 보여주는 페이지는 Dynamic 렌더링 페이지가 되어야 하지만 Static 렌더링 페이지가 되는 경우가 있음. 이 경우 page.js 코드 상단에 dynamic 예약어를 export 해서 렌더링 방식을 강제로 설정해줘야 함.

```js
/* 아래 코드 중 택일 후 코드 상단에 명시*/
export const dynamic = 'force-dynamic' // 현재 페이지의 렌더링 방식을 Dynamic으로 강제
exprot const dynamic = 'force-static'  // 현재 페이지의 렌더링 방식을 Static으로 강제
```

Dynamic 렌더링은 서버 또는 DB의 부하를 늘릴 수 있음. 이 때 캐싱 기능을 사용하면 부하를 줄일 순 있음. 

캐싱 기능을 사용 fetch() 함수에 캐싱 옵션을 추가하거나

```javascript
/* */
await fetch('/URL', {cache: 'force-cache'}) // GET 요청 결과를 캐싱(어딘가에 잠시 저장해두고 활용)
await fetch('/URL') // 사실은... 기본 설정이 캐싱 사용일 수 있음
await fetch('/URL', {cache: 'no-store'}) // 캐싱하지 않음(실시간 데이터가 중요한 경우
await fetch('/URL', { next: { revalidate: 60 }}) // 60초마다 캐싱된 데이터 갱신
```

page.js 코드 상단에 revalidate 예약어를 export 하면 됨.

```javascript
export const revalidate = 20 // 20초 간격 캐싱
```


## 🕹️ 미들웨어

**미들웨어는 요청과 응답 사이에 존재하여 간섭하는 것.** 서버로 GET, POST 요청 등이 들어오면 미들웨어가 먼저 실행된 후 요청이 처리됨.

미들웨어를 만들려면 **프로젝트 루트 경로에 middle.js 파일을 만들면 됨.**

```javascript
const { NextResponse } = require("next/server");

export function middleware(req){
  console.log(`Middleware url: ${req.nextUrl}`) // 유저가 요청 중인 URL
  console.log(`Middleware cookies: ${req.cookies}`) // 유저의 쿠키(Map 자료형임)
  console.log(`Middleware headers: ${req.headers}`) // 유저의 헤더 정보(이전 방문 페이지, OS, 브라우저, IP 등). 이것도 Map 자료형임.
  console.log(`Middleware user-agent: ${req.headers.get('user-agent')}`) // 유저의 웹브라우저, 기기정보 등(Map 자료형은 이렇게 접근)
  
  /* middleware 기능 마지막엔 이거 셋 중 하나 써줘야 함 */
  NextResponse.next()     // 별일 없음. 너 통과.
  NextResponse.redirect() // 다른 페이지로 강제 이동(주소창(현재 URL)도 변경)
  NextResponse.rewrite()  // 다른 페이지로 강제 이동(주소창(현재 URL)은 변경하지 않음)
}
```

### 예시 1: 접속기록 감청 😅

```js
const { NextResponse } = require("next/server");

export function middleware(req){
  /* '/list'로 시작하는 URL 접속하는 경우 도청 😅
   * (참고)'/list' URL로 접속한다면 ~.pathname === '/list' */
  if(req.nextUrl.pathname.startsWith('/list')){
    let currentDate = new Date()
    let userOS = req.headers.get('sec-ch-ua-platform') // 유저 OS. Safari로 접속하면 null로 뜸...
    console.log(`${currentDate}에 ${userOS}를 사용하는 유저가 /list에 접속함`)
    return NextResponse.next()
  }
}
```

### 예시 2: 로그인 안 한 유저 로그인 페이지로 안내

```js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
  /* 로그인 안 한 유저가 '/write'로 시작하는 URL 접속 시 로그인 페이지로 리다이렉트 */
  if(req.nextUrl.pathname.startsWith('/list')){
    const session = await getToken({ req: req }) // 유저의 next-auth 인증 정보
    
    /* 로그아웃 상태면 로그인 페이지로 리다이렉트 */
    if(session == null){
      // 아래 redirect 방식은 Next.js 버전에 따라 작동 되는 게 있고 안 되는 게 있으므로 택일
      return NextResponse.redirect('http://localhost:3000/api/auth/signin')
      // return NextResponse.redirect(new URL('/api/auth/signin'), req.url)
    }
  }
  return NextResponse.next()
}
```


## 📦 브라우저 저장소

### 로컬 스토리지(Local Storage)

로컬 스토리지는 웹브라우저 내에 최대 5MB까지 저장 가능한 공간.

* 웹브라우저를 껐다 켜도 데이터가 남아 있음
* 클라이언트 브라우저에서 자바스크립트를 사용해야 하므로 클라이언트 컴포넌트에서 사용해야 하며, useEffect()를 통해 사용해야 함.

참고로 세션 스토리지(Session Storage)는 브라우저를 종료하면 데이터가 날아감. 휘발성 데이터를 저장할 때 주로 사용.

```js
'use client'
import { useEffect } from "react"

export default function Home(){
  useEffect(() => {
    /* 현재 위치가 서버인지 브라우저인지 판별 */
    // window 객체 값이 undefined면 서버, 아니면 웹브라우저임
    if(typeof window != 'undefined'){
      localStorage.setItem('key', 'value') // 로컬 스토리지에 데이터 저장
      localStorage.getItem('key')          // 로컬 스토리지 데이터 꺼내오기
      localStorage.removeItem('key')       // 로컬 스토리지 데이터 제거
      // sessionStorage.setItem('key', 'value') // 세션 스토리지에 데이터 저장
      // sessionStorage.getItem('key')          // 세션 스토리지 데이터 꺼내오기
      // sessionStorage.removeItem('key')       // 세션 스토리지 데이터 제거
    }
  })
  return <h2>로컬 스토리지 테스트</h2>
}
```

### 쿠키(Cookie)

쿠키는 웹서버가 생성하여 웹브라우저로 전송하는 작은 정보 파일.

* 보통 사이트당 50개, 총 4KB까지 사용 가능
* GET, POST 등 요청 시 쿠키가 자동으로 서버로 전송됨
* 쿠키마다 유효기간 설정 가능

```js
/* 웹브라우저 개발자도구 콘솔 창에서 아래와 같이 입력 */
document.cookie = 'name1=value1' // 유효기간 설정 안하면 브라우저 종료 시 사라짐
document.cookie = 'name2=value2; max-age=3600;' // 3600초 동안 유효(최대 400일까지 가능)
```

### 쿠키를 이용한 다크모드 구현

사용자의 다크모드 사용 여부를 구분하기 위해서는 사용자가 다크모드를 활성화 했는지에 대한 데이터를 저장할 공간이 필요함. 

1. DB 사용 → 로컬 스토리지나 쿠키가 있는데 DB를 쓰는 건 굳이...
2. 세션 스토리지 사용 → 왜 씀...? 😑
3. 로컬 스토리지 사용 → useEffect() 함수를 사용해야 하는데 useEffect() 함수는 HTML이 로딩된 후 실행되므로 HTML이 로딩되는 동안 번쩍거리는 UI가 만들어질 수 있음
4. 쿠키 사용 → 다크모드 토글 버튼이 잠깐 변경될 순 있으나, 적어도 UI가 번쩍거리는 문제는 해결할 수 있음.

따라서 쿠키를 사용하여 다크모드를 구현해보기로 함.

1. 다크 모드용 CSS 작성

```css
/* app/globals.css */

/* class 명에 dark-mode가 들어가면 배경을 예쁜 회색(?)으로... */
.dark-mode {
  background: #222;
}

/* 다크모드 적용할 요소의 하위요소 스타일링 */
.dark-mode h2,
.dark-mode p,
.dark-mode a {
  color: white;
}
```

2. 다크모드 토글 버튼 컴포넌트 작성

```js
'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DarkMode(){
  let [isDarkMode, setDarkMode] = useState(false)
  let router = useRouter()
  
  /* 쿠키 설정: 쿠키가 없으면 만들어 주고, 있으면 값을 가져와서 현재 다크모드 여부 판별 */
  useEffect(() => {
    let cookie = ('; ' + document.cookie).split(`; isDarkMode=`).pop().split(';')[0]
    if(cookie == 'true'){
      setDarkMode(true)
      document.cookie = 'isDarkMode=true; max-age=' + (3600 * 24 * 400)
    } else {
      // setDarkMode(false) // 초기값이 false 이므로 이 경우엔 굳이 설정할 필요 없음
      document.cookie = 'isDarkMode=false; max-age=' + (3600 * 24 * 400)
    }
  }, [])

  /* 다크모드 전환 토글(Toggle) */
  return (
    <span style={{ cursor: "pointer" }} onClick={() => {
      if(isDarkMode){ // 현재 다크모드라면(true) -> 라이트모드로 전환(false)
        setDarkMode(false)
        document.cookie = 'isDarkMode=false; max-age=' + (3600 * 24 * 400)
        router.refresh()
      } else {       // 현재 다크모드가 아니면(false) -> 다크모드로 전환(true)
        setDarkMode(true)
        document.cookie = 'isDarkMode=true; max-age=' + (3600 * 24 * 400)
        router.refresh()
      }
    }}>{isDarkMode ? "🌙" : "☀️"}</span>
  )
}
```

3. 다크모드를 적용하려는 HTML 요소의 class 이름에 토글 기능 추가.

```js
/* app/layout.js */

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  /* 쿠키를 통해 현재 다크모드 여부 확인 */
  let cookie = cookies().get('isDarkMode')

  return (
    <html lang="en">
      {/* 다크모드 클래스 이름 토글 */} 
      <body className={ cookie != undefined && cookie.value == 'true' ? "dark-mode" : "" }>
        <nav>
          <span><Link href="/">Home</Link></span>
          <span><Link href="/hello">안녕요?ㅎ</Link></span>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

이 외에 CSS의 prefers-color-scheme 미디어 쿼리를 사용하면 자동으로 다크모드 여부를 판별하여 스타일링 할 수 있다고 함.