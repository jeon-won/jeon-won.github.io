---
title: 윈도우 엣지 브라우저의 인터넷 익스플로러 모드 무기한 설정
author: Jeon Won
date: 2022-02-19 23:41:00 +0900
categories: [System, WEB & WAS]
tags: [webbrowser]
---

윈도우 엣지 브라우저에서 인터넷 익스플로러에서만 접속이 가능한 웹 사이트에 접속해야 하는 경우 Internet Explorer 모드를 설정해줘야 합니다. 다만 이 방법은 30일 후에 다시 설정을 해줘야 하기 때문에 사내 시스템이 익스플로러만 지원한다면 한 달에 한 번씩 불편을 겪어야 할 수 있습니다.

엣지 브라우저 버전 77 이상에서 엔터프라이즈 사이트 목록을 구성하면 인터넷 익스플로러로 접속해야 하는 사이트들을 영구적으로 접속할 수 있습니다. 인터넷 익스플로러 모드로 접속해야 하는 사이트 목록을 XML 파일로 만든 후 엣지 브라우저의 InternetExplorerIntegrationLevel과 InternetExplorerIntegrationSiteList 정책을 활성화해주면 됩니다.

먼저 인터넷 익스플로러 모드로 접속해야 하는 사이트 목록을 만든 후 XML 파일로 저장합니다. 여기서는 `IEmode_list.xml` 라는 파일을 만들었다고 가정합니다. `IEmode_list.xml` 파일을 적당한 위치로 이동시키거나 웹 서버에 업로드합니다.

```xml
<site-list version="1">
  <created-by>
    <tool>EMIESiteListManager</tool>
    <version>12.0.0.0</version>
    <date-created>02/19/2022 05:51:35</date-created>
  </created-by>
  <site url="192.168.0.1"> <!-- 익스플로러로 접속할 시스템의 IP를 넣어주거나 -->
    <compat-mode>Default</compat-mode>
    <open-in>IE11</open-in>
  </site>
  <site url="explorer-site.co.kr"> <!-- 웹 사이트 주소를 넣어주면 됨. 단 아스테리스크(*)는 사용 불가. -->
    <compat-mode>Default</compat-mode>
    <open-in>IE11</open-in>
  </site>
	<!-- ... -->
</site-list>
```

아래 레지스트리 추가 명령어를 실행하여 엣지 브라우저의 InternetExplorerIntegrationLevel과 InternetExplorerIntegrationSiteList 정책을 활성화합니다. `IEmode_list.xml` 파일 경로는 로컬 파일 경로(예: file:///C:\asdf\asdf.xml)로 입력하거나, 웹 서버에 업로드했다면 URL을 입력합니다.

```shell
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationLevel" /t REG_DWORD /d "1" /f
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationSiteList" /t REG_SZ /d "http://192.168.0.1/IEmode_list.xml" /f
```

이제 엣지 브라우저로 해당 사이트에 접속하면 인터넷 익스플로러 모드로 접속됩니다. 설정이 잘 됐는지 확인하려면 주소창에 `edge:compat`을 입력합니다. 사이트 목록 갱신이 안 됐다면 주소창에 `edge:enterprise`를 입력하여 업데이트를 실행합니다.

엣지 브라우저 엔터프라이즈 모드를 비활성화 하고 싶다면 아래 명령어를 실행합니다.

```shell
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationLevel" /f
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge" /v "InternetExplorerIntegrationSiteList" /f
```

제일 좋은 방법은 인터넷 익스플로러로만 접속할 수 있는 시스템을 걷어내는 것인데, 문제는 돈돈돈...


## 참고 사이트
[Enable IE Mode and use a Site List in Edge Chromium with Microsoft Endpoint Manager](https://byteben.com/bb/enable-ie-mode-and-use-a-site-list-in-edge-chromium-with-microsoft-endpoint-manager/)