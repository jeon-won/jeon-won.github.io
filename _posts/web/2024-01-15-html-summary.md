---
title: HTML 간단 정리
description: HTML 간단 정리
date: 2024-01-15 00:30:00 +0900
categories: [web]
tags: [web]
---

![HTML is programming language(?)](/assets/img/posts/web/html-coding.jpg)


## HTML 기본 태그로 글 작성해 보기

Visual Sutdio Code의 html 문서 편집기에서 !를 입력 후 탭 키를 누르면 아래와 같이 기본 html 문서가 생성됨.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```

HTML은 마크업 언어이므로 모든 요소들이 태그로 감싸져 있어야 함.

```html
<div>
  <p>네모네모 div 박스</p>
</div>
```


## head 태그

HTML 문서의 기본 템플릿은 꼭 head와 body 태그를 포함해야 함.

style 태그는 body 태그 맨 밑에 두면 사이트 로딩 시 스타일이 잠깐 깨질 수 있으므로 head 태그 안에 넣는 경우가 많음.

### head 태그 안에 들어가는 meta 태그

사이트의 인코딩 형식을 지정할 때 meta 태그의 `charset` 속성을 사용함.

구글 검색 시 화면에 뜨는 글귀를 수정하고 싶으면 `name="description"` 속성과 `name="keywords"` 속성을 사용함. description은 제목, keywords는 검색에 도움을 주는 키워드임.

사이트 초기 zoom 레벨이나 폭을 지정하려면 `name="viewport"` 속성을 사용함. `width=device-width`는 기기의 실제 가로폭으로 렌더링, `initial-scale=1.0`은 화면 줌 레벨 설정임.

```html
<head>
  <meta charset="UTF-8">
  <meta name="description" content="저는 HTML으로 프로그래밍해요">
  <meta name="keywords" content="HTML,프로코딩러">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

### 오픈 그래프(Open Graph)

![Open Graph](/assets/img/posts/web/opengraph.png)

오픈 그래프는 페이스북이 만든 meta 태그. SNS에 링크를 공유하면 위와 같은 방식으로 사이트 설명과 제목 등이 뜨는데 이걸 커스터마이징 하고 싶으면 아래 meta 태그를 넣어주면 됨.

```html
<head>
  <meta property="og:image" content="IMAGE_PATH">
  <meta property="og:description" content="CSS는 대박이다!!!">
  <meta property="og:title" content="CSS IS AWESOME!!!">
</head>
```

### 파비콘(Favicon)

웹사이트 제목 옆에 뜨는 아이콘을 커스터마이징하려면 meta 태그 내에 link 태그를 추가해줘야 함.

```html
<head>
  <link rel="icon" href="ICON_PATH.ico" type="image/x-icon">
</head> 
```

ico 대신 png 파일로 넣어도 되지만 ico 파일이 호환성이 가장 좋음. 요즘은 32x32 사이즈로 제작하면 됨.

바탕화면 바로가기 추가 시 뜨는 아이콘을 커스터마이징하려면 link 태그의 `rel="apple-touch-icon-precomposed"`과 같은 속성을 추가하면 되는데, OS마다 요구하는 속성이 다름. Favicon generator 같은거 쓰면 OS별로 알아서 만들어 줌.

## 폼

폼은 form 태그로 만듦.

```html
<form>
  <input type="text | email | password | radio | file | checkbox | submit">
  <input name="IDENTIFIER_FOR_SERVER_TRANSFER" placeholder="BACKGROUND_TEXT" value="INPUT_VALUE">
  <select>
    <option>옵션 1<option>
    <option>옵션 2<option>
    <option>옵션 3<option>
  </select>
  <textarea rows="10">Textarea</textarea>
</form>
```

폼에 입력된 값을 전송하는 버튼은 아래 둘 중 하나를 사용함.

```html
<form>
  <button type="submit">전송</button>
  <input type="submit">
</form>
```


## 테이블

thead, tbody는 헤드부분 영역구분을 위해 사용하며 필수값은 아님.

td 대신 th 태그를 사용하면 제목처럼 굵게 표시됨.

```html
<style>
  td, th {
    vertical-align: top | middle | bottom; /* 테이블 셀 내 상하정렬 */
    border-collapse: collapse; /* 표 셀 간 틈 제거 */
  }
</style>

<table>
  <thead>
    <th>제목 1</th>
    <th>제목 2</th>
  </thead>
  <tbody>
    <tr>
      <td>내용</td>
      <td>내용</td>
    </tr>
  </tbody>
</table>
```

## Font Awesome 아이콘 넣기

Font Awosome을 사용하면 아이콘을 폰트처럼 넣을 수 있음. [v5.15 버전 설치방법 참고.](https://fontawesome.com/v5/docs/web/setup/host-font-awesome-yourself) 

CDN 방식을 사용하려면 Font Awesome의 all.min.css 파일 경로를 link 태그에 넣어주면 됨.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
```

다운로드 방식을 사용하려면 [Font Awesome 다운로드 사이트](https://fontawesome.com/download)에서 다운로드 후 all.min.css 파일 경로를 link 태그에 넣어주면 됨. 이 중 css랑 webfonts 폴더 제외하고 다 지워도 됨. css 폴더 내에서도 all.css 및 all.min.css 파일 제외하고 다 지워도 됨.

아이콘을 넣으려면 [Font Awesome 홈페이지](https://fontawesome.com/icons)에서 아이콘 검색 후 태그를 넣어주면 됨. 예를 들어 쇼핑카드 아이콘을 추가하는 태그는...

```html
<!-- fa-3x: 3배 확대 -->
<i class="fas fa-shopping-cart fa-3x"></i>
```

Font Awesome의 아이콘은 폰트이므로 폰트 관련 CSS 속성을 사용할 수 있음. 예를 들어, 아이콘에 둥근 배경색을 넣는 CSS 코드는...

```css
i {
  background-color: burlywood;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  padding-top: 25px;
  box-sizing: border-box;
  color: white;
  /* margin-top: 20px; */
}
```


## 비디오와 오디오 다루기

video 태그를 사용하면 비디오를 재생할 수 있음. 주요 속성은...

* autoplay: 자동 재생(크롬 브라우저에선 muted 속성을 같이 사용해야 작동함)
* preload: 영상을 먼저 다운받을지 선택(auto, metadata none 값 중 선택)
* poster: 썸네일 이미지 경로
* loop: 반복 재생

```html
<!-- 크롬 브라우저 정책상 autoplay 하려면 muted 속성 필요 -->
  <video controls preload="metadata">
    <!-- source 태그를 사용하면 호환성 챙길 수 있음 -->
    <source src="./VIDEO_PATH.mp4" type="video/mp4">
    <source src="./VIDEO_PATH.webm" type="video/webm"> <!-- 위에거 틀어보고 안되면 이거 트셈 -->
  </video>
```

audio 태그를 사용하면 오디오를 재생할 수 있음.

```html
<audio controls muted>
  <source src="./AUDIO_PATH.mp3">
</audio>
```

## 만든 사이트 발행하기

Github Pages를 사용하는 경우 `아이디.github.io`라는 이름의 리포지토리를 만든 후 html, css, js 파일을 그대로 업로드하면 됨. `아이디.github.io` 주소로 접속하면 index.html 파일을 보여줌.

웹 호스팅 서비스(AWS, 가비아, 카페24 등)를 사용하는 경우 FTP에 접속하여 html, css, js 파일을 그대로 업로드하면 됨.













## 팁... 같은 것

### Emmet

Emmet을 사용하면 적게 입력하여 HTML을 생성할 수 있음. 요즘 Visual Studio Code는 자동으로 지원함.

`div.container>div*3`을 입력한 후 탭 키를 누르면 `<div class="container">` 태그 1개와 그 안에 `<div>` 태그가 3개 생성됨. `.`은 class명, `>`은 내 바로 밑의 자식 요소, `*`은 생성할 태그 개수를 가리킴.

이 외의 주요 HTML Emmet은...

* !: html 문서 시작 템플릿 생성
* lorem: 임시글자 무작위 생성
* p: p 태크 생성

### 크롬 개발자 도구

내 의도와 다르게 작동하는 버그 발생 시 크롬 브라우저에서 요소를 가리키고 마우스 우클릭 후 검사 버튼을 클릭하면 개발자도구가 뜨면서 HTML과 CSS 코드가 나타남. 또는 개발자도구 단축키(MacOS는 Command + Option + i)를 눌러도 됨.

요소를 마우스로 가리키고 싶으면 Select an element in the page to inspect it 버튼(Command + Shift + C) 클릭.

Styles 탭에서 CSS 코드를 볼 수 있음. 여기에 직접 스타일을 입력해볼 수도 있음. 위에 있을수록 우선 적용되는 스타일임.