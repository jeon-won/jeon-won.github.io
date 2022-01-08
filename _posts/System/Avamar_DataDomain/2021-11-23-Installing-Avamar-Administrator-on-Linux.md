---
title: Avamar Administrator on Linux 설치 방법
author: Jeon Won
date: 2021-11-23 17:27:00 +0900
categories: [System, Avamar & DataDomain]
tags: [avamar]
---

GNOME Desktop 등 리눅스 GUI 환경에서 Avamar Administrator를 사용하려면 아래와 같이 JRE와 Avamar Administrator를 설치하면 됨. (변수는 대문자로 표기)

1. 웹 브라우저로 Avamar IP 접속
2. 다운로드 → Linux for x86 (64bit) → Red Hat Enterprise Linux 5, 6, 7 (Console) → `jre-version-platform.rpm` 및 `AvamarConsole-linux-rhel5-x86_64-version.rpm` 다운로드 
3. 터미널 실행 → 위의 두 rpm 파일 다운받은 경로로 이동 → `rpm -ivh jre-version-platform.rpm` 명령어 실행하여 JRE 설치
4. 터미널에서 `rpm -ih AvamarConsole-linux-rhel5-x86_64-version.rpm` 명령어 실행하여 Avamar Administrator 설치
5. 터미널에서 `/usr/local/avamar/AVAMAR_VERSION/bin/avsetup_mcc` 명령어 실행하여 최초 설정. 무언가 입력하라는 문구 나오면 전부 Enter 치면 됨.
6. `/etc/hosts` 파일에 `AVAMAR_IP AVAMAR_DOMAIN AVAMAR_HOST_NAME` 한 줄 추가 후 저장
7. 이제 Avamar Administrator 실행하려면 터미널에서 `/usr/local/avamar/AVAMAR_VERSION/bin/mcgui` 명령어 실행
  
※ Dell EMC Avamar Administration Guide에 Red Hat Enterprise Linux 5 install package를 사용해야 모든 리눅스 버전에서 사용할 수 있다고 되어 있음. 


## 참고
* [Dell EMC Avamar Administration Guide](https://www.delltechnologies.com/asset/en-us/products/data-protection/technical-support/docu91832.pdf)