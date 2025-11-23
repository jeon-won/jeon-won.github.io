---
title: ASUS 공유기에 WireGuard VPN 구축 정리
description: 공유기로 WireGuard VPN 구축 정리
date: 2025-06-17 23:00:00 +0900
categories: [system]
tags: [system]
image: 
  path: /assets/img/posts/system/wireguard.png
  alt: WireGuard
---

ASUS TUF-AX4200Q 공유기로 WireGuard VPN 구축 과정을 정리한 글.


## 🔢 구축 과정

1. 공유기에 WireGuard VPN 설정
2. 통신사 공유기 포트포워딩 설정
3. 접속 테스트


## 1️⃣ 공유기에 WireGuard VPN 설정

ASUS TUF-AX4200Q 공유기 설정을 위해 웹브라우저로 192.168.50.1 주소로 접속 후 로그인. 접속되지 않으면 `http://www.asusrouter.com` 주소로 접속.

Advanced Settings의 VPN 메뉴 클릭 → WireGuard VPN 활성화. 아마 아래와 같이 설정될 것임.

   * Access Intranet 활성화
   * Tunnel IPv4 and / or IPv6 Address: 10.6.0.1/32
   * Listen Port: 51820

`+` 버튼 클릭하여 VPN Client 추가 후 `Apply all settings` 클릭하면 VPN 서버 설정 완료.

VPN Client 이름을 클릭하면 VPN 설정 파일(wgs_client.conf)을 다운받을 수 있음. 이걸 다운받아 적절한 곳에 보관.


## 2️⃣ 통신사 공유기 포트포워딩 설정

통신사 공유기마다 접속 주소가 다름. SKB를 사용하는 경우 웹브라우저로 192.168.45.1 주소로 통신사 공유기에 접속 가능함. 접속이 안 된다면 `http://wifi.skbroadband.com` 주소로 접속하면 됨.

네트워크 메뉴 → LAN 메뉴 → `접속 리스트` 클릭 → ASUS 공유기로 추정되는 IP 복사.

NAT 메뉴 → 포트포워딩 메뉴 → 아래와 같이 추가

   * 로컬 IP 주소: 위에서 복사한 IP
   * 프로토콜: UDP
   * 포트범위: 51820-51820
   * 로컬 포트: 51820
   * 설명: 아무렇게나 입력


## 3️⃣ 접속 테스트

[https://www.wireguard.com/install](https://www.wireguard.com/install) 에서 WireGuard 앱 설치.

VPN 설정 파일(wgs_client.conf)을 불러오면 자동 설정됨. `Activate` 버튼을 클릭 후 Status가 Active로 변경되면 VPN 접속 성공한 것임.

이제 공유기에 물린 장비 IP(192.168.50.x)로도 통신이 잘 되면 VPN이 잘 작동하는 것임! 🤗