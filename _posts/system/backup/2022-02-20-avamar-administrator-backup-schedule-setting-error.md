---
title: Avamar Administrator 백업 스케쥴 설정 오류
description: Avamar Administrator 백업 스케쥴 설정 오류
date: 2022-02-20 00:00:00 +0900
categories: [system, backup]
tags: [system, backup]
---

## 증상

* Avamar Administrator에서 백업 스케쥴 설정 시 시간을 추가하려 하면 아무런 반응이 없음
* 백업 시작-종료 시간 설정 시 `Invalid time input in time field`와 같은 에러 발생


## 원인

언어가 영어로 설정되지 않은 컴퓨터에서 타임스탬프 접미사가 AM/PM이 아닌 다른 값으로 대체되어 발생


## 해결

`mcgui.bat` 파일에 `-Duser.language=en -Duser.country=US` 추가
* 수정 전:  `.\bin\runcmd "%1\bin\javaw" -Djava.util.prefs.userRoot=\"%USERPROFILE% ...생략`
* 수정 후:  `.\bin\runcmd "%1\bin\javaw" -Duser.language=en -Duser.country=US -Djava.util.prefs.userRoot=\"%USERPROFILE% ...생략`

`mcgui.bat` 파일 경로: `C:\Program Files (x86)\avs\administrator\<AVAVMAR_VERSION>\bin`


## 참고

[Avamar Server: Unable to update schedule in Avamar GUI with error "Invalid Time Input" when the local computer is not set to English language](https://www.dell.com/support/kbdoc/ko-kr/000171535/unable-to-update-schedule-in-avamar-gui-with-error-invalid-time-input-when-the-local-computer-is-not-set-to-english-language)