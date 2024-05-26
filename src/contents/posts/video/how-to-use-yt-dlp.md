---
title: yt-dlp 사용법 간단 정리
description: yt-dlp 사용법 간단 정리
date: 2022-07-03 00:00:00
tags:
  - video
series: 비디오 편집
previewImage: "video.jpg"
// isPrivate: true
---

![](./images/yt_dlp.png)

## 🤔 yt-dlp란?

* 유튜브 외 여러 사이트의 동영상을 다운로드하는 CLI 기반 소프트웨어
* 지원하는 사이트 목록: [https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)


## 💻 설치법(MacOS)

1. [https://brew.sh/index_ko](https://brew.sh/index_ko) 를 참고하여 Homebrew 설치
2. `brew install yt-dlp/taps/yt-dlp` 명령어로 yt-dlp 설치


## 📥 기본적인 사용 방법

`yt-dlp -f bestvideo+bestaudio URL` 명령어를 사용하면 최상 옵션으로 알아서 동영상을 다운로드 해줌


## ⚙️ 원하는 포맷으로 다운로드

* 위의 방법을 사용하면 원하는 동영상 포맷(컨테이너, 해상도, 코덱 등)으로 다운로드가 안 될 수 있음 
* `yt-dlp -F URL` 명령어를 사용하면 다운로드 가능한 포맷 목록을 보여줌
* 목록을 보고 원하는 비디오 및 오디오 포맷 ID를 메모한 후 `yt-dlp -f VIDEO_ID+AUDIO_ID URL` 명령어를 실행하면 원하는 포맷으로 동영상을 다운로드 해줌

```shell
# 다운로드 가능한 동영상 포맷 목록 출력
> yt-dlp -F https://youtu.be/dOwNlO@D_Url
[youtube] dOwNlO@D_Url: Downloading webpage
[youtube] dOwNlO@D_Url: Downloading android player API JSON
[info] Available formats for dOwNlO@D_Url:
ID  EXT   RESOLUTION FPS │   FILESIZE  TBR PROTO │ VCODEC       VBR ACODEC      ABR     ASR MORE INFO
──────────────────────────────────────────────────────────────────────────────────────────────────────────────
sb2 mhtml 48x27          │                 mhtml │ images                                   storyboard
sb1 mhtml 80x45          │                 mhtml │ images                                   storyboard
sb0 mhtml 160x90         │                 mhtml │ images                                   storyboard
139 m4a   audio only     │    8.74MiB  48k https │ audio only       mp4a.40.5   48k 22050Hz low, m4a_dash
249 webm  audio only     │    9.00MiB  50k https │ audio only       opus        50k 48000Hz low, webm_dash
250 webm  audio only     │   10.73MiB  59k https │ audio only       opus        59k 48000Hz low, webm_dash
140 m4a   audio only     │   23.19MiB 129k https │ audio only       mp4a.40.2  129k 44100Hz medium, m4a_dash
251 webm  audio only     │   19.86MiB 110k https │ audio only       opus       110k 48000Hz medium, webm_dash
17  3gp   176x144      8 │    9.68MiB  54k https │ mp4v.20.3    54k mp4a.40.2    0k 22050Hz 144p
160 mp4   256x144     30 │    2.92MiB  16k https │ avc1.4d400c  16k video only              144p, mp4_dash
278 webm  256x144     30 │    5.54MiB  30k https │ vp9          30k video only              144p, webm_dash
133 mp4   426x240     30 │    5.53MiB  30k https │ avc1.4d4015  30k video only              240p, mp4_dash
242 webm  426x240     30 │    8.12MiB  45k https │ vp9          45k video only              240p, webm_dash
134 mp4   640x360     30 │    9.64MiB  53k https │ avc1.4d401e  53k video only              360p, mp4_dash
18  mp4   640x360     30 │   48.09MiB 268k https │ avc1.42001E 268k mp4a.40.2    0k 44100Hz 360p
243 webm  640x360     30 │   19.42MiB 108k https │ vp9         108k video only              360p, webm_dash
135 mp4   854x480     30 │   14.03MiB  78k https │ avc1.4d401f  78k video only              480p, mp4_dash
244 webm  854x480     30 │   27.93MiB 155k https │ vp9         155k video only              480p, webm_dash
136 mp4   1280x720    30 │   19.70MiB 109k https │ avc1.4d401f 109k video only              720p, mp4_dash
22  mp4   1280x720    30 │ ~ 43.83MiB 238k https │ avc1.64001F 238k mp4a.40.2    0k 44100Hz 720p
247 webm  1280x720    30 │   52.02MiB 290k https │ vp9         290k video only              720p, webm_dash
137 mp4   1920x1080   30 │   58.83MiB 328k https │ avc1.640028 328k video only              1080p, mp4_dash
248 webm  1920x1080   30 │  101.44MiB 566k https │ vp9         566k video only              1080p, webm_dash

# mp4(1080p) 비디오 + m4a 오디오 포맷으로 동영상 다운로드
# (위 리스트를 보면 mp4 1080p 비디오 ID는 137, m4a 오디오 ID는 140)
> yt-dlp -f 137+140 https://youtu.be/dOwNlO@D_Url
[youtube] dOwNlO@D_Url: Downloading webpage
[youtube] dOwNlO@D_Url: Downloading android player API JSON
[info] dOwNlO@D_Url: Downloading 1 format(s): 137+140
[download] Destination: dOwNlO@D_vIdEo.f137.mp4
[download] 100% of 58.83MiB in 00:01
[download] Destination: dOwNlO@D_vIdEo.f140.m4a
[download] 100% of 23.19MiB in 00:00
[Merger] Merging formats into "dOwNlO@D_vIdEo.mp4"
Deleting original file dOwNlO@D_vIdEo.m4a (pass -k to keep)
Deleting original file dOwNlO@D_vIdEo.f137.mp4 (pass -k to keep)
```

```toc
```