---
title: 윈도우 엣지 브라우저의 인터넷 익스플로러 모드 무기한 설정
description: 윈도우 엣지 브라우저의 인터넷 익스플로러 모드 무기한 설정
date: 2022-07-03 00:00:00 +0900
categories: [web]
tags: [web]
image: 
  path: /assets/img/posts/web/ie-tombstone.jpg
  alt: 독보적이었던 그의 업적을 기억하며.JPG
---

[이미지 출처: 클리앙 독보적이었던 그의 업적을 기억하며.JPG](https://www.clien.net/service/board/park/17331335)

## 🤔 문제

2022년 6월 15일부터 인터넷 익스플로러(IE) 지원이 종료됨에 따라 IE로만 접속해야 하는 시스템을 걷어내거나 엣지 브라우저에서 제공하는 IE 모드를 사용해야 합니다.

문제는 전자는 돈돈돈... 이고 후자는 사용자가 30일에 한 번씩 IE 모드 설정을 해줘야 한다는 것입니다. 윈도우 10 PC에서 아래와 같이 무기한으로 설정하는 방법이 있긴 하지만...

1. IE 모드로 접속할 사이트 정보를 명시한 XML 파일 생성
2. [마이크로소프트 홈페이지](https://www.microsoft.com/ko-kr/edge/business/download)에서 정책 파일 다운로드 받아 압축 풀기
3. 압축 풀어서 생성된 파일을 아래 경로로 복사
	* `msedge.admx` → `C:\Windows\PolicyDefinitions`
    * `msedge.adml` → `C:\Windows\PolicyDefinitions\ko-KR` 
4. 로컬 그룹 정책 편집기 `gpedit.msc`를 실행하여 아래 두 정책 설정
	* Internet Explorer 통합 구성: 사용
    * 엔터프라이즈 모드 사이트 목록 구성: XML 파일 경로

위 설정을 일반 사용자들에게 직접 하라고 시키면 잘 안 될 가능성이 클 것입니다.

![](/assets/img/posts/web/why_engineer_salary.jpg)


## 💡 해결법

그래서 엣지 브라우저 IE 모드를 활성화하도록 레지스트리를 수정하는 배치파일을 만들어 사용자들에게 배포한 후 실행하게 하면 간단하게 해결되지 않을까 싶습니다.

1. 윈도우 10 20H2 버전 이상, 엣지 브라우저 93 버전 이상으로 업데이트 합니다.

2. IE 모드로 접속할 사이트를 명시한 XML 파일을 아래와 같이 만든 후 웹 서버에 업로드하거나 특정 로컬 경로에 저장합니다. url 속성 값에 아스테리스크(`*`)는 사용할 수 없습니다.

```xml
<site-list version="1">
  <created-by>
    <tool>EMIESiteListManager</tool>
    <version>12.0.0.0</version>
    <date-created>01/01/2022 05:51:35</date-created>
  </created-by>
  <site url="192.168.1.1"> <!-- IE 모드로 접속할 사이트 IP -->
    <compat-mode>Default</compat-mode>
    <open-in>IE11</open-in>
  </site>
  <site url="www.iemode.co.kr"> <!-- 또는 URL 입력 -->
    <compat-mode>Default</compat-mode>
    <open-in>IE11</open-in>
  </site>
</site-list>
```

3. 엣지 브라우저 IE 모드가 활성화되도록 레지스트리를 수정합니다.

4. [마이크로소프트 홈페이지](https://www.microsoft.com/ko-kr/edge/business/download)에서 정책 파일을 다운로드 받아 압축을 풀어서 나온 `msedge.admx` 파일과 `msedge.adml` 파일을 Windows 내 특정 폴더로 복사합니다

5. 정책 설정을 업데이트합니다.

위 과정을 배치파일(bat)로 만들면 다음과 같습니다.

```shell
@echo off

set IEModeInstallPath=%~dp0

echo 엣지 브라우저 IE Mode 패치를 설치합니다.

echo.
echo 1. IE Mode 설정 적용 중...

echo 1-1) Internet Explorer 모드 설정 중...
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /v InternetExplorerIntegrationLevel /t reg_dword /d 1 /f

echo 1-2) Internet Explorer 모드 사이트 목록 구성 중...
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /v InternetExplorerIntegrationSiteList /t reg_sz /d "http://192.168.1.1/IEModeSiteList.xml" /f


echo.
echo 2. 엣지 브라우저 정책 파일 복사 중...
cd %IEModeInstallPath%
copy /y msedge.admx "C:\Windows\PolicyDefinitions"
copy /y msedge.adml "C:\Windows\PolicyDefinitions\ko-KR"

echo.
echo 3. 변경된 정책 업데이트 중...
gpupdate /force

echo.
echo 4. 완료!

pause
```

아래는 선택사항으로, 필요한 경우 배치파일(bat)에 추가하여 실행하면 됩니다.

```shell
echo 사이트 목록 갱신 주기를 240분으로 설정 중...
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /v InternetExplorerIntegrationSiteListRefreshInterval /t reg_dword /d 240 /f

echo IE모드 활성화된 상태에서, 사이트 목록에 구성 안 된 사이트들도 IE 모드로 접속되도록 설정 중...
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /v InternetExplorerIntegrationSiteRedirect /t reg_dword /d 2 /f

echo 모든 사이트에서 팝업을 표시하도록 허용 설정 중...
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /v DefaultPopupsSetting /t reg_dword /d 1 /f

echo 엣지 브라우저를 기본 브라우저로 설정 중...
reg add HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice /v ProgId /t reg_sz /d MSEdgeHTM /f
reg add HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\Shell\Associations\UrlAssociations\https\UserChoice /v ProgId /t reg_sz /d MSEdgeHTM /f
```

정책이 잘 적용됐는지 확인하려면, 엣지 브라우저 주소창에 `edge:policy` 입력 후 접속하여 `InternetExplorerIntegrationLevel` 및 `InternetExplorerIntegrationSiteList` 정책이 잘 나타나는지 확인합니다.

IE 모드로 사이트가 열리지 않는다면, 엣지 브라우저 주소창에 `edge:compat` 입력 후 접속한 다음, `업데이트 강제 적용` 버튼을 클릭하여 IE 모드로 접속할 도메인이 잘 나타나는지 확인합니다.


## 📎 참고 사이트

* [Microsoft Edge 브라우저 정책 설명서 | Microsoft Docs](https://docs.microsoft.com/ko-kr/deployedge/microsoft-edge-policies)
* [Enable IE Mode and use a Site List in Edge Chromium with Microsoft Endpoint Manager](https://byteben.com/bb/enable-ie-mode-and-use-a-site-list-in-edge-chromium-with-microsoft-endpoint-manager/)