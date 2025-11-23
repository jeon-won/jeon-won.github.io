---
title: Hello GitHub Pages! (Gatsby + gatsby-starter-bee)
description: Hello GitHub Pages! (Gatsby + gatsby-starter-bee)
date: 2023-04-16 14:17:00 +0900
categories: [blogging]
tags: [blogging]
image:
  path: /assets/img/posts/blogging/github_pages.jpg
  alt: github pages
---

<!-- ![Github Pages](/assets/img/posts/blogging/github_pages.jpg) -->

## 😃 Hello GitHub Pages!

GitHub Pages와 정적 사이트 생성기인 [Gatsby](https://www.gatsbyjs.com)를 사용하여 만든 블로그입니다.

Gatsby 테마 여러 종류로 블로그를 만들며 지지고 볶다가, 마음에 드는 것이 [zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)와 [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 두 가지 뿐이었습니다. 둘 중에 고민하다가 결국 후자를 택했었다가... **지금은 Gatsby-Starter-Haon 테마로 이전했습니다.**


## 🤔 구축과정

먼저 로컬에 git과 nvm이 설치되어 있어야 합니다. nvm이 필요한 이유는 Gatsby를 실행하기 위한 Node 버전과 gatsby-starter-bee 테마 관련 패키지와 호환되는 Node 버전이 서로 다르기 때문입니다. 여기서는 gatsby-starter-bee 테마를 설치할 때만 Node 18.14.0 버전을 사용하고, 이 외엔 모두 Node 14.15.0 버전을 사용합니다.

1. GitHub에 `<GITHUB_ID>.github.io` 라는 이름의 리포지토리를 만듭니다.
2. `git clone <GITHUB_REPOSITORY_LINK>` 명령어로 위에서 만든 리포지토리를 로컬로 복제해옵니다.
3. `npx gatsby new my-blog-starter https://github.com/JaeYeopHan/gatsby-starter-bee` 명령어로 gatsby-starter-bee 테마를 로컬에 설치합니다. 이 때 사용하는 Node 버전은 18 이상이어야 하며, 저는 18.14.0 버전을 사용했습니다.
4. 생성된 gatsby-starter-bee 테마 파일을 리포지토리 경로로 복사합니다.
5. `package-lock.json` 파일을 삭제합니다. 이 파일을 삭제하지 않으면 npm으로 패키지 설치 시 에러가 발생합니다.
6. `nvm install 14.15.0` 명령어로 Node 14.15.0 버전을 설치한 후, `nvm use 14.15.0` 명령어를 실행하여 Node 14.15.0 버전을 사용하도록 설정합니다.
7. 리포지토리 경로로 이동한 후 `npm i` 명령어를 실행하여 gatsby-starter-bee 테마에 필요한 패키지를 설치합니다. 추후 GitHub Pages로 배포할 것을 고려하여 `npm i gh-pages` 명령어로 gh-pages 패키지를 설치합니다.
8. `npm audit fix` 명령어를 실행하여 패키지 취약점을 개선합니다. 사실 아래 10번 과정이 잘 실행된다면 하지 않아도 됩니다.
9. 보유한 도메인이 있다면 리포지토리 최상위 경로에 `CNAME` 파일을 만든 후 파일 내용에 도메인 명을 넣어 저장합니다.
10. `npm start` 명령어를 실행한 후 http://localhost:8000 주소로 접속이 잘 되는지 확인합니다.


## ⚙️ 설정

### 블로그 정보 설정

`gatsby-meta-config.js` 파일 내용을 수정합니다. 주석 설명대로 수정하면 됩니다.

robots.txt 파일과 사이트맵 경로 설정을 위해 `gatsby-config-js` 파일 내용을 수정합니다.

```js
{
  resolve: 'gatsby-plugin-robots-txt',
  options: {
    host: 'https://<DOMAIN_NAME>',
    sitemap: 'https://<DOMAIN_NAME>/sitemap.xml',
    policy: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
},
```

### 글 최대 폭 설정

gatsby-starter-bee 테마의 글 최대 폭을 수정하려면 `src/layout/index.jsx` 파일 내 maxWidth 속성 값의 rhythm 함수 매개변수 값을 수정해줍니다. 기본 값은 24이고, 이 블로그는 28로 설정되어 있습니다.

```jsx
<div
  style={ {
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: rhythm(24), // 수정
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  } }
>
```

### 기타 설정

* About 페이지를 수정하려면 `content/__about/resume-en.md` 파일을 수정합니다.
* Footer를 수정하려면 `src/components/footer/index.jsx` 파일을 수정합니다.
* 우측 상단 깃허브 링크를 수정하려면 `src/components/social-share/github-icon/index.jsx` 파일을 수정합니다.

## ✏️ 포스팅

### 마크다운 파일 만들기

보통 Gatsby 테마를 사용하는 경우 글을 작성할 때 `content` 경로에 마크다운 파일을 만들면 됩니다. 다만 gatsby-starter-bee 테마를 사용한다면 `content/blog` 경로에 마크다운 파일을 만들면 됩니다.

마크다운 파일을 만드는 방법은 두 가지가 있습니다. 마크다운 파일명을 **index.md**로 만드는 경우와 그렇지 않은 경우인데요. 예시를 들어 설명하자면 다음과 같습니다.

1. `content/blog/blogging/hello-world` 경로에 **index.md** 마크다운 파일을 만들었다면, 위와 동일하게 해당 포스트의 URL은 `https://<YOUR_DOMAIN>/blogging/hello-world`가 됩니다.
2. `content/blog/blogging` 경로에 **hello-world.md** 마크다운 파일을 만들었다면, 해당 포스트의 URL은 `https://<YOUR_DOMAIN>/blogging/hello-world`가 됩니다.

즉 마크다운 파일 이름을 **index.md**로 만들었다면 마크다운 파일 경로가 URL이 되고, 파일 이름을 그렇게 만들지 않았다면 마크다운 파일 경로와 파일 이름이 URL이 됩니다.

### 마크다운 파일 작성

마크다운 파일 내용 최상단에는 아래 속성 값이 들어가야 합니다. draft 속성 값이 false이면 해당 포스트는 공개됩니다. 글을 작성중이라면 true로 해놓는 것이 좋겠습니다.

```txt
---
title: 'Post Title'
date: 2023-04-16 14:17:00
category: 'Category'
draft: false
---
```

위 속성들은 Gatsby 테마에 따라 사용되는 종류가 달라집니다. Gatsby 테마를 변경한 후 에러가 난다면, 테마에서 필요로 하는 위의 속성 값들이 빠지지 않았는지 확인해야 합니다.

이후 마크다운 문법을 사용하여 글을 작성하면 됩니다.


## 💠 형상관리

Git 리포지토리를 통해 형상관리를 하므로 스테이징, 커밋 및 푸시 작업이 필요합니다. 주로 사용할만한 명령어는 다음과 같습니다.

* 모든 파일을 스테이징: `git add *`
* 커밋: `git commit -m "Commit Message"`
* 원격 리포지토리로 전송: `git push`


## 🚀 배포

`package.json` 파일에 아래 스크립트를 추가합니다.

```json
"scripts": {
    "deploy": "gatsby build && cp CNAME ./public && gh-pages -d public"
}
```

보유한 도메인이 없다면 위의 `cp CNAME ./public &&`을 삭제합니다.

그 다음 `npm run deploy` 명령어를 실행하면 public 폴더의 파일들이 깃허브 리포지토리의 gh-pages 브랜치에 배포됩니다. 깃허브 리포지토리 Settings 메뉴 → pages 메뉴에 들어간 다음, Branch를 gh-pages로 수정합니다.


## 🔗 접속

이제 [https://<GITHUB_ID>.github.io](https://<GITHUB_ID>.github.io) 주소로 블로그 접속이 가능합니다. 보유한 도메인이 있다면 보유한 도메인 주소로 접속하면 됩니다. 드더이(?) 끝났습니다. 😁