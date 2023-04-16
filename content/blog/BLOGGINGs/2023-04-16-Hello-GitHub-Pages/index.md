---
title: 'Hello GitHub Pages!'
date: 2023-04-16 14:17:00
category: 'BLOGGINGs'
draft: false
---

## 😃 Hello GitHub Pages!

GitHub Pages와 [Gatsby](https://www.gatsbyjs.com)를 사용하여 만든 블로그입니다.

Gatsby 테마 중 마음에 드는 것이 [zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)와 [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 두 가지 뿐이었는데, 후자를 택했습니다...


## 🤔 구축과정

먼저 로컬에 git과 nvm이 설치되어 있어야 합니다. nvm이 필요한 이유는 Gatsby를 실행하기 위한 Node 버전과 gatsby-starter-bee 테마를 사용하기 위한 패키지를 설치할 때 필요한 Node 버전이 서로 다르기 때문입니다.

1. GitHub에 `<GITHUB_ID>.github.io` 라는 이름의 리포지토리를 만듭니다.

2. `git clone <GITHUB_REPOSITORY_LINK>` 명령어로 위에서 만든 리포지토리를 로컬로 복제해옵니다.

3. `npx gatsby new my-blog-starter https://github.com/JaeYeopHan/gatsby-starter-bee` 명령어로 gatsby-starter-bee 테마를 로컬에 설치합니다. 이 때 사용하는 Node 버전은 18 이상이어야 하며, 저는 18.14.0 버전을 사용했습니다.

4. 생성된 gatsby-starter-bee 테마 파일을 리포지토리 경로로 복사합니다.

5. `nvm install 14.15.0` 명령어로 Node 14.15.0 버전을 설치한 후, `nvm use 14.15.0` 명령어를 실행하여 Node 14.15.0 버전을 사용하도록 설정합니다.

6. 리포지토리 경로로 이동한 후 `npm i` 명령어를 실행하여 gatsby-starter-bee 테마에 필요한 패키지를 설치합니다.

7. `npm audit fix` 명령어를 실행하여 패키지 취약점을 개선합니다. 사실 아래 8번 과정이 잘 실행된다면 하지 않아도 됩니다.

8. `npm start` 명령어를 실행한 후 https://localhost:8000 주소로 접속이 잘 되는지 확인합니다.


## ⚙️ 설정

### 블로그 정보 설정

`gatsby-meta-config.js` 파일 내용을 수정합니다.


### 글 최대 폭 설정

`src/layout/index.jsx` 파일의 21번째줄 maxWidth 속성 값의 rhythm 함수 매개변수 값을 수정해줍니다. 기본 값은 24이고, 이 블로그는 30으로 설정되어 있습니다.


## 배포

`package.json` 파일에 아래 스크립트를 추가합니다.

```json
"scripts": {
    "deploy": "gatsby build && gh-pages -d public -b master -r 'git@github.com:${your github id}/${github page name}.github.io.git'"
}
```
