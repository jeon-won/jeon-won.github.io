---
title: 폐쇄망에 연결된 PC에서 Microsoft Visio 설치 방법
description: 폐쇄망에 연결된 PC에서 Microsoft Visio 설치 방법
date: 2023-12-11 19:00:00 +0900
categories: [system]
tags: [system]
image: 
  path: /assets/img/posts/system/Error_VisioSetup.png
  alt: Visio 설치 오류
---

Visio는 Microsoft Office에 기본적으로 포함되어 있지 않아 Office Deployment Tool로 따로 설치해야 하는데, 폐쇄망에서 설치에 필요한 파일을 내려받을 수 없는 경우가 있습니다.

이 경우 외부망에 연결된 PC로 설치 파일을 내려받은 후 폐쇄망 PC로 설치 파일을 복사하여 설치해야 합니다.


## 🤔 설치방법

1. 외부망에 연결된 PC에서 Office Deployment Tool를 다운로드합니다. 기업용인 경우 [Microsoft 365 관리 센터(구 볼륨라이선스 관리 센터)](https://admin.microsoft.com)에서 다운로드 받을 수 있습니다.
2. Office Deployment Tool 실행 후 압축 풀 경로를 지정하면 configuration.xml 파일과 setup.exe 파일이 생성됩니다. configuration.xml 파일을 텍스트 편집기로 열어 Visio만 설치하도록 아래와 같이 수정합니다.

```xml
<Configuration>
  <Add OfficeClientEdition="64" Channel="PerpetualVL2021">
    <!-- Product 태그의 PIDKEY 속성에 키 값을 입력하는 것도 가능한 듯(테스트 안 해봄...) -->
    <Product ID="VisioStd2021Volume" PIDKEY="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX">
      <Language ID="ko-kr" />
    </Product>
    <!-- 여기에 다른 MS Office 제품 Product ID 태그를 추가하면 여러 제품을 동시에 설치할 수 있는 듯(테스트 안 해봄...)-->
    <!-- <Product ID="ProPlus2021Volume" PIDKEY="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX">
      <Language ID="ko-kr" />
      <ExcludeApp ID="Lync" />
    </Product> -->
  </Add>

  <!-- Remove 태그의 All 속성 값이 True면 Visio 설치완료 후 설치된 MS Office를 모두 삭제하므로 주석 처리-->
  <!-- <Remove All="True" /> -->
</Configuration>
```

위 태그의 Channel 속성과 ID 속성에 들어가는 값은 보유 중인 라이선스에 따라 다릅니다. [간편 실행을 위한 Office 배포 도구에서 지원하는 제품 ID 목록](https://learn.microsoft.com/ko-kr/microsoft-365/troubleshoot/installation/product-ids-supported-office-deployment-click-to-run) 참고.

3. 외부망에 연결된 PC에서 `setup /download configuration.xml` 명령어로 설치파일을 다운로드 합니다.
4. 3번 과정에서 다운로드가 완료되면 다운로드된 파일을 폐쇄망에 연결된 PC로 복사합니다.
5. 폐쇄망에 연결된 PC에서 `setup /configure configuration.xml` 명령어로 설치합니다.


## 😭 자꾸 2016 버전으로 실행되는 경우

MS 오피스 2021 버전을 설치했음에도 2016 버전으로 실행되는 경우 오피스 라이선스 삭제 후 재인증해주면 됩니다.

1. 라이선스 정보 확인: 오피스 설치된 경로로 이동하여 `cscript ospp.vbs /dstatus` 명령어 실행 후 Last 5 characters of Installed product key 확인
2. `cscript ospp.vbs /unpkey:5KEY` 명령어 실행하여 라이선스 삭제(5KEY에 Last 5 characters of Installed product key 값 입력)
3. 오피스 프로그램 실행 후 정품 인증