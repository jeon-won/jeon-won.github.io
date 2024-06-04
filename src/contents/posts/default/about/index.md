---
title: Hello GitHub Pages! (with Gatsby-Starter-Haon)
description: Gatsby-Starter-Haon 템플릿을 사용하여 Gatsby 기반 정적 블로그 생성 방법 설명
date: "2024-05-26"
tags:
  - blogging
series: 블로그 운영
previewImage: "setting.png"
---

![Gatsby-Starter-Haon](theme.png)

Github Pages와 [Gatsby-Starter-Haon](https://github.com/msung99/Gatsby-Starter-Haon) v1.0.1 테마를 사용하여 만든 정적 블로그입니다.

[gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 테마와 [데브시스터즈 기술블로그](https://tech.devsisters.com)의 CSS 일부 스타일을 차용하여 커스터마이징 했습니다.

사용한 Gatsby 버전은 5.13.1, node 버전은 20.13.1 입니다.


## 🤔 구축과정

1. GitHub에 <GITHUB_ID>.github.io 라는 이름의 리포지토리를 만듭니다.
2. git clone <GITHUB_REPOSITORY_LINK> 명령어로 위에서 만든 리포지토리를 로컬로 복제해옵니다.
3. `npx gatsby new temp https://github.com/msung99/Gatsby-Starter-Haon` 명령어로 Gatsby-Starter-Haon 테마를 temp 폴더에 설치합니다.
4. 생성된 Gatsby-Starter-Haon 테마 파일을 리포지토리 경로로 복사합니다.
5. `npm run develop` 명령어를 실행한 후 http://localhost:8000 주소로 접속이 잘 되는지 확인합니다.


## ⚙️ 설정

### 블로그 정보 설정

`meta-config.js` 파일 내용을 수정합니다.

### 이미지 위아래가 잘려나오는 경우

`gatsby-config.js` 파일을 열어 gatsby-remark-images 플러그인 옵션을 주석 처리합니다.

```js
{
  resolve: `gatsby-remark-images`,
  options: {
    // maxWidth: 700,
    // maxHeight: 400,
  },
},
```

### 일부 첨부파일이 표시되지 않는 경우

일부 첨부파일(gif, mp4 등)이 표시되지 않는 경우 [gatsby-remark-copy-linked-files](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-copy-linked-files#readme) 플러그인을 추가해야 합니다. `package.json` 파일을 열어 dependencies 하위에 아래와 같이 한 줄 추가한 후

```json
"dependencies": {
  "gatsby-remark-copy-linked-files": "^6.13.1",
},
```

`npm i --legacy-peer-deps` 명령어를 실행하여 플러그인을 설치합니다. `--legacy-peer-deps` 옵션을 붙이는 이유는 해당 테마에서 사용 중인 gatsby-plugin-advanced-sitemap 플러그인 2.1.4 버전이 Gatsby 5 버전에서 호환성 문제를 일으키기 때문에 의존성 충돌을 무시하기 위함입니다.

`gatsby-config.js` 파일을 열어 gatsby-remark-copy-linked-files 플러그인을 사용하기 위한 코드를 추가합니다.

```js
`gatsby-plugin-sharp`,
{
   resolve: `gatsby-transformer-remark`,
   options: {
     plugins: [
       // 생략...
       {
         resolve: `gatsby-remark-autolink-headers`
       },
       // 이곳에 아래 코드 추가
       {
         resolve: `gatsby-remark-copy-linked-files`,
         options: {
           destinationDir: `path/to/dir`,
           // ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
         },
       }
     ],
   },
},
```

### CSS 스타일링

블로그 전체에 대한 CSS를 수정하려면 `src/styles/index.jsx` 파일을 수정합니다.

메인 화면 프로필에 대한 CSS를 수정하려면 `src/components/profile/index.jsx` 파일을 수정합니다.

글 내용에 대한 CSS를 수정하려면 `src/components/post/post-content/post-style/index.jsx` 파일을 수정합니다.


## 글 작성

마크다운 파일을 만드는 방법은 두 가지가 있습니다. 마크다운 파일명을 **index.md**로 만드는 경우와 그렇지 않은 경우인데요. 예시를 들어 설명하자면 다음과 같습니다.

1. `components/contents/posts/blogging/hello-world` 경로에 **index.md** 마크다운 파일을 만들었다면, 위와 동일하게 해당 포스트의 URL은 `https://<YOUR_DOMAIN>/blogging/hello-world`가 됩니다.
2. `components/contents/posts/blogging` 경로에 **hello-world.md** 마크다운 파일을 만들었다면, 해당 포스트의 URL은 `https://<YOUR_DOMAIN>/blogging/hello-world`가 됩니다.

마크다운 파일 내용 최상단에 아래 YAML 형식의 속성 값이 들어가야 합니다. previewImage는 static 폴더에 있는 이미지를 글 목록 썸네일에 표시되며, 생략하면 기본 썸네일 이미지가 표시됩니다.

```txt
---
title: 글 제목
description: 글 설명
date: 2024-05-26 12:34:56
tags:
  - tag1
  - tag2
series: 블로그 운영
previewImage: "setting.png"
// isPrivate: true
---
```

위 속성들은 Gatsby 테마에 따라 사용되는 종류가 달라집니다. Gatsby 테마를 변경한 후 에러가 난다면, 테마에서 필요로 하는 위의 속성 값들이 빠지지 않았는지 확인해야 합니다.

이후 마크다운 문법을 사용하여 글을 작성하면 됩니다.


## Github Pages로 배포

`package.json` 파일에 아래 스크립트를 추가합니다. 보유한 도메인이 없다면 아래 `cp CNAME ./public &&`을 삭제합니다.

```json
"scripts": {
    "deploy": "gatsby build && cp CNAME ./public && gh-pages -d public"
}
```

`npm i gh-pages --legacy-peer-deps` 명령어를 실행하여 gh-pages를 설치합니다.

이제 `npm run deploy` 명령어를 실행하면 public 폴더의 파일들이 깃허브 리포지토리의 gh-pages 브랜치에 배포됩니다. 깃허브 리포지토리 Settings 메뉴 → pages 메뉴에 들어간 다음, Branch를 gh-pages로 수정합니다.


## 🔗 접속

이제 [https://<GITHUB_ID>.github.io](https://<GITHUB_ID>.github.io) 주소로 블로그 접속이 가능합니다. 보유한 도메인이 있다면 보유한 도메인 주소로 접속하면 됩니다. 😎