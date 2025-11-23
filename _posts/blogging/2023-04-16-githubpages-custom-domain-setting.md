---
title: Github Pages 블로그 커스텀 도메인 설정
description: Github Pages 블로그 커스텀 도메인 설정
date: 2023-04-16 18:46:00 +0900
categories: [blogging]
tags: [blogging]
image:
  path: /assets/img/posts/blogging/github_pages.jpg
  alt: github pages
---

커스텀 도메인을 Github Pages 블로그에 연결하는 방법입니다.

## 🔧 DNS 설정

먼저 도메인을 구입한 곳에서 DNS 설정을 해야 합니다.

구글 도메인을 구입한 경우 [Google Domains](https://domains.google.com)에 접속한 후 DNS 메뉴에서 아래와 같이 DNS 설정을 등록해줍니다.

| 호스트 이름     | 유형  |  TTL  | 데이터          |
| --------------- | :---: | :---: | --------------- |
| DOMAIN_NAME     |   A   | 1시간 | 185.199.108.153 |
| DOMAIN_NAME     |   A   | 1시간 | 185.199.109.153 |
| DOMAIN_NAME     |   A   | 1시간 | 185.199.110.153 |
| DOMAIN_NAME     |   A   | 1시간 | 185.199.111.153 |
| www.DOMAIN_NAME | CNAME | 1시간 | DOMAIN_NAME     |


## ⚙️ Github Pages 설정

Github Pages 리포지토리의 Settings 메뉴 → Pages 메뉴 → Custom domain 항목에 커스텀 도메인을 입력한 후 Save 버튼을 클릭합니다.

정상적으로 저장됐다면 `DNS Check in Progress` 메시지가 나타나고, Enforce HTTPS 설정을 할 수 있게 됩니다.

Enforce HTTPS 설정을 활성화하면 `https://<DOMAIN_NAME>` 주소로 Github Pages 블로그에 접속할 수 있습니다.


## 🧐 참고

* [How to setup google domain for github pages](https://dev.to/trentyang/how-to-setup-google-domain-for-github-pages-1p58)