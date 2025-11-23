---
title: Github Pages 테마를 Chirpy Jekyll 테마로 변경
description: Github Pages 테마를 Chirpy Jekyll 테마로 변경
date: 2025-11-24 01:00 +0900
categories: [blogging]
tags: [blogging]
image:
  path: /assets/img/posts/blogging/chirpy-theme.png
  alt: Chirpy jekyll theme
---

# Github Pages 테마를 Chirpy Jekyll 테마로 변경

Gatsby 기반의 테마를 쓰다가 jekyll 기반의 Chirpy v7.4.1 테마로 변경한 후 작업 사항을 기록한 글입니다. MacOS 기준으로 작성했습니다.

자세한 Chirpy Jekyll 테마 사용법은 [여기](https://chirpy.cotes.page)를 참고하기 바랍니다.


## 🔢 작업순서

1. ♦️ ruby 3.3 설치(MacOS 기준)
2. 🔄 기존 Github Pages 구조 변경
3. 🚀 배포


## ♦️ ruby 3.3 설치(MacOS 기준)

ruby 3.4 버전에선 의존성 오류가 발생하므로 3.3 이하 버전을 사용합니다.

* rbenv 설치: Homebrew가 설치되어 있다면 `brew install rbenv`
  - rbenv: ruby 버전 관리를 위한 도구
* ruby 3.3 버전 설치: `rbenv install 3.3.10`
* ruby 3.3 버전을 기본으로 설정: `rbenv global 3.3.10`
* ruby 버전 확인: `ruby -v`


## 🔄 기존 Github Pages 구조 변경

배포된 Github Pages 서비스 중단시간 최소화를 위해 로컬에 미리 Chirpy Jekyll 테마를 설치하고 이에 맞게 구조를 변경해둡니다.

### Chirpy Jekyll 테마 리포지토리 복제

1. 테마 복제: `git clone https://github.com/cotes2020/jekyll-theme-chirpy.git`
2. 테마 초기화: `bash tools/init.sh`
3. 의존성 패키지 설치: `bundle`
4. Jekyll Server 실행: `bundle exec jekyll serve`
5. `http://127.0.0.1:4000` 주소로 잘 접속되는지 확인

### 일부 yml 파일 수정

* `/_data/origin/authors.yml`: Github Pages 주인 정보
* `/_config.yml`: 사이트 정보 수정
  - 수정할 만한 곳 적절히 찾아서 적절히 수정
  - Gatsby 테마 사용했던 시절 글 링크를 유지하기 위해 permalink 값을 `:categories/:title/`로 수정함(단, 글마다 카테고리와 타이틀 값을 설정해줘야 함)

### 파비콘 수정

* [RealFaviconGenerator](https://realfavicongenerator.net)로 파비콘 생성 후 다운로드
* `site.webmanifest` 파일을 제외한 이미지를 `assets/img/favicons` 경로로 복사

### 기존 파일 복사

기존 Github Pages의 마크다운 문서 파일을 `_posts` 폴더로 모두 복사한 후 파일 이름을 `yyyy-mm-dd-title.md` 형식으로 변경합니다.

마크다운 문서 파일이 참조하는 파일들을 `assets` 폴더로 모두 복사합니다.

### 마크다운 문서 수정

마크다운 문서에 명시된 파일 참조 경로를 알맞게 수정합니다.

  * Gatsby 테마에서 파일은 마크다운 문서 파일 경로와 동일한 곳에 저장해 놓아도 참조가 가능함
  * 반면 Jekyll 테마에서 이미지는 `assets` 폴더에 저장된 파일만 참조가 가능함
  * 예를 들어 assets 폴더 내에 posts 폴더를 만들고 이 폴더 안에 test.jpg 파일을 저장했다면 해당 이미지 경로는 `/assets/posts/test.jpg`임

### 테스트

`http://127.0.0.1:4000` 주소로 접속한 후 잘 작동하는지 확인합니다.

아래 사항은 나중에 Github Actions 작업 시 오류가 발생하는 유형이니 반드시 수정하도록 합시다.

  * http로 연결되는 링크가 존재한다면 https 링크로 변경하거나 백틱 기호로 묶어버리기
  * 이미지 경로가 잘못된 경우 올바르게 수정(이미지가 비어 보이는 게 아니라 배포 시 오류가 발생해버림)


## 🚀 배포

### 새로운 Github Pages용 리포지토리 생성

기존 `{username}.github.io` 리포지토리 이름을 변경합니다.

[Chirpy Jekyll 테마 리포지토리를 {username}.github.io 이름으로 복제합니다.](https://github.com/cotes2020/jekyll-theme-chirpy/fork)

### 배포 준비

1. 새로운 리포지토리를 로컬에 복제: `git clone https://github.com/{username}/{username}.github.io.git`
2. 테마 초기화: `bash tools/init.sh`
3. 의존성 패키지 설치: `bundle`
4. `bundle lock --add-platform x86_64-linux` 명령어 실행
5. 수정된 파일들(마크다운 문서, 일부 yml 파일, 파비콘, 기타 참조 파일 등)을 새로운 로컬 리포지토리에 덮어 씌우기
6. `http://127.0.0.1:4000` 주소로 접속 후 최종적으로 잘 작동하는지 확인

### 배포

GitHub 저장소의 Settings → Pages 메뉴에서 Build and deployment의 Source를 `Github Actions`로 변경한 후 아래에 따라 배포합니다.

1. 모든 파일 스테이징: `git add .`
2. 커밋: `git commit -m "message"`
   * 커밋 메시지는 [Conventional commit format](https://github.com/conventional-changelog/commitlint/?tab=readme-ov-file#what-is-commitlint)을 따라야 함
3. 원격 리포지토리로 배포: `git push`

Github 저장소의 Actions 메뉴에서 오류 발생 여부를 확인합니다. 오류가 발생했다면 원인에 맞게 해결한 후 다시 배포하면 되고, 오류가 발생하지 않았다면 정상적으로 배포된 것입니다. 🤗


## ✍️ 글 작성

[https://chirpy.cotes.page/posts/write-a-new-post](https://chirpy.cotes.page/posts/write-a-new-post) 참고