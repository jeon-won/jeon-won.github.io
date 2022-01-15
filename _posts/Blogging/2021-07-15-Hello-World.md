---
title: Hello GitHub.io!
author: Jeon Won
date: 2021-07-15 01:03:37 +0900
categories: [Blogging]
tags: [writing]
---

Hello GitHub.io! 첫 글 테스트

[Github blog 만들기 (chirpy theme)](http://blog.ju-ing.com/posts/Github-blog-만들기-chirpy-theme) 를 참고하여 [Jekyll Chirpy Theme](https://github.com/cotes2020/jekyll-theme-chirpy)를 적용

아래는 구축 과정

## ruby 설치(MacOS 기준)
* git은 당연히 설치돼야 하고, brew도 설치가 안 돼있으면 https://brew.sh/index_ko 에서 설치
* `brew install ruby` 명령어로 ruby 설치

## Git Repository 생성
리포지토리 이름은 `<GITHUB_ID>.github.io`로 설정

## Chirpy 테마 다운로드
* `git clone https://github.com/cotes2020/jekyll-theme-chirpy.git` 명령어로 리포지토리 복제
* 또는 [Chirpy Starter](https://github.com/cotes2020/chirpy-starter/generate)로 리포지토리 생성 후 `git clone https://github.com/<GH_USERNAME>/<GH_USERNAME>.github.io` 명령어로 리포지토리 복제

## _config.yml 파일 수정
대충 보면 뭘 어떻게 수정해야 할지 보임. 적절히 수정...
* lang: ko-KR
* timezone: Asia/Seoul

## Ruby 작업
* gem dependencies 설치: `bundle`
* 초기화: `bash tools/init.sh`

## Git push
* `git remote add --track master origin https://github.com/<GITHUB_ID>/<GITHUB_ID>.github.io.git` 명령어로 git origin 리모트 추가
  - origin 리모트가 이미 있다고 나온다면 `git remote remove origin` 실행 후 다시 시도
* `git push origin master` 명령어로 git push
  - 2021-08-13 이후 비밀번호 인증 방식은 지원하지 않음. [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) 문서를 참고하여 토큰을 만든 후 이 토큰값을 비밀번호로 입력해야 함.

## 포스팅
* 마크다운 형식으로 글을 작성하여 _posts 폴더에 저장한 후 master 브랜치에 올리면 됨

### 이미지
* 마크다운 문법(`![IMG_DESC](IMG_LINK)`)으로 첨부하거나
* img나 figure 태그로 첨부하거나
* [이미지를 base64 문자열로 변환한 후](https://www.base64-image.de) 마크다운 문법에 base64 문자열을 적거나(예: `![IMG_DESC](data:image/jpg;base64,~~~`)

## GitHub Pages 설정
* GitHub 리포지토리에서 settings 클릭
* GitHub Pages 항목의 Pages settings now has its own dedicated tab! `Check it out here!` 클릭
* Branch를 gh-pages로 수정한 후 save 클릭
* `https://<GITHUB_ID>.github.io` 주소로 접속하여 GitHub 블로그가 잘 뜨는지 확인

