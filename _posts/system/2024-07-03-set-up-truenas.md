---
title: TrueNAS 서버 구축 정리
description: TrueNAS 서버 구축 정리
date: 2024-07-03 01:00:00 +0900
categories: [system]
tags: [system]
image: 
  path: /assets/img/posts/system/truenas.webp
  alt: TrueNAS Scale
---

내부망에서만 SMB를 사용하는 NAS 서버를 구축해본 걸 정리한 글. 사용한 OS는 TrueNAS SCALE 24.04.0


## 🤔 TrueNAS 라이선스 검토

라이선스 링크: https://www.truenas.com/docs/scale/gettingstarted/useragreements/scaleeula/

> TrueNAS SCALE software is made available as Open Source Software, subject to the license conditions contained within that Open Source Software. 
>   **→ 대충 오픈 소스 소프트웨어에 포함된 라이선스 조건에 따라 사용 가능하다는 뜻인 듯**

> TrueNAS SCALE Software is authorized for use on any TrueNAS Device. TrueNAS Devices can include hardware provided by iXsystems or third parties. TrueNAS Devices may also include virtual machines and cloud instances.
>   **→ 대충 가상 머신에서도 사용 가능하다는 뜻인 듯**


## 🛠️ 하드웨어 구축

**VMware 등을 사용하는 경우 아래와 같이 가상머신을 생성**하면 됨.

* 게스트 운영 체제 패밀리: Linux
* 게스트 운영 체제 버전: Debian GNU/Linux
* 메모리: 권장사양 기준 16GB + 스토리지 용량 1TB당 1GB 추가. 최소사양은 권장사양의 절반?
* 디스크는 최소 2개 이상 할당(부팅용 1개 및 나머지 데이터 저장용)
  - RAID 구성 안 할 거면 디스크 2개 붙이면 됨
  - RAIDZ1(RAID-5와 비슷) 구성 시 디스크 4개 이상 붙여야 함(부팅용 1개 + RAID 구성용 3개)

## 💿 TrueNAS OS 설치

https://www.truenas.com/download-truenas-scale 에서 TrueNAS SCALE ISO 파일 다운로드 후 가상머신의 CD/DVD 드라이브에 TrueNAS ISO 파일 연결.

설치할 때 admin 계정 사용 추천 한다는거 선택하고 그냥 쭉 설치하면 됨. 쉬움.


## ⚙️ TrueNAS 기본 설정

### 네트워크 설정

TrueNAS 서버를 부팅하면 리눅스 쉘을 선택하여 열 수 있음. 리눅스 쉘에서 root 계정으로 로그인 후 `ifconfig` 명령어로 네트워크 인터페이스 이름 확인. 이름이 ensXXX로 나온다면 `ifdown ensXXX` 명령어를 실행해여 해당 네트워크 인터페이스를 중지.

> 초기 root 계정 비밀번호는 TrueNAS 설치 시 입력헀던 admin 계정 비밀번호와 동일함.

고정 IP를 설정하려면 `/etc/network/interfaces` 파일 열어서 아래 내용처럼 입력한 후

```shell
# interfaces(5) file used by ifup(8) and ifdown(8)
# Iinclude files from /etc/network/interfaces.d:
source /etc/network/interfaces.d/*

auto ensXXX
iface ensXXX inet static
address TRUENAS_SERVER_IP
netmask SUBNET_MASK
gateway GATEWAY_IP
dns-nameservers DNS_IP
```

`ifup ensXXX` 명령어를 실행하여 네트워크 인터페이스 실행.

**호스트네임은 기본적으로 truenas**로 되어 있을 거임. 못 믿겠으면 `hostname` 명령어 실행해서 확인.

**DNS 설정**도 위에서 설정한 대로 되어있을 것임. 못 믿겠으면 `cat /etc/resolv.conf` 명령어 실행해서 확인.

**GUI 페이지에 접속하려면 https://TRUENAS_SERVER_IP/ 주소로 접속.** ID는 admin이고 비밀번호는 TrueNAS 설치 시 입력했던 비밀번호 입력.

### TrueNAS GUI 기본 설정

TrueNAS GUI 페이지 로그인 후 좌측 System Settings → General 메뉴에서 Language 및 Timezone 등 설정.

### NTP 설정

필수는 아니지만... GUI 페이지 좌측 Server Settings → General → NTP Servers 추가. 

### 스토리지 풀 생성

TrueNAS GUI 페이지 좌측 Storage 메뉴에서 Create Pool 버튼 클릭하여 생성.

* General Info 항목: Name에 스토리지 풀 이름 입력하고, Allow non-unique serialed disks에 Allow 선택해야 할당된 디스크가 보임
* Data 항목: Layout에 원하는 RAID 구성 선택
* 나머지 Optional 항목은 건너뛰거나 설정하거나...
* Review에서 최종 확인 후 Create Pool 버튼 클릭

### 자동 Scrub 설정 해제

자동 Scrub 설정을 해제하는 이유는 [TrueNAS 하드웨어 가이드](https://www.truenas.com/docs/scale/gettingstarted/scalehardwareguide/)에 **가상화된 스토리지에서 자동 Scrub pools를 사용하지 않도록 권고하고 있기 때문임.**

아래에서 설명할 SMB 설정 완료한 후 좌측 Data Protection → Scrub Tasks 메뉴의 SMB Pool Enabled를 비활성화.


## ⚙️ SMB 설정

### 사용자 ID 생성

**SMB를 사용할 ID를 생성**해야 함.

좌측 Credentials → Local Users 메뉴에서 Add 버튼 클릭하여 유저 생성

* Full Name과 비밀번호입력. Full Name 입력 시 Username이 동일하게 자동 입력됨.
* Create New Primary Group 비활성화한 후 Primary Group을 users로 설정. 그룹 증식(?)을 막기 위해 하는 것인데 사실 맘대로 설정해도 됨...
* Home Directory는 `/mnt/STORAGE_POOL_NAME`으로 선택하고, Create Home Directory 체크하여 홈 디렉터리에 사용자 전용 데이터 저장공간을 만들도록 함.
* Home Directory Permissions엔 User에만 Read, Write, Execute 체크하고 나머지는 체크 해제. 원하면 권한 더 줘도 됨.
* Shell은 nologin으로 설정. 사용자가 쉘에 로그인할 필요가 없으므로...
* Samba Authentication 체크

### ACL(접근제어) 설정

**사용자 본인의 홈 디렉터리에만 SMB로 접근할 수 있도록 설정.**

TrueNAS GUI 사이트 좌측 Shares 메뉴 → Windows (SMB) Shares의 Add 버튼 클릭

* Path는 방금 전 생성했던 사용자의 홈 디렉터리 선택
* 나머지 설정 필요한 것 있으면 설정해준 후 Save 클릭
* ACL 설정하겠냐고 물으면 Configure 클릭

**Filesystem ACL(접근제어) 설정**은 알아서 하면 되는데, 유저 본인에게만 접근 허용하려면 아래와 같이 Filesystem ACL 설정 후 Save Access Control List 버튼 클릭.

* User Obj - ID: Read | Write | Execute
* Group Obj - GROUP_NAME: None
* Other: None

**좀 더 세부적인 Share ACL 설정**을 하려면 Sharing 메뉴에서 해당 유저의 공유 아이콘(Edit Share ACL) 클릭. 아래는 예시...

* Who: User
* User: 해당 유저 아이디 입력
* Permission: FULL
* TYPE: ALLOWED 

이제 윈도우 PC 탐색기에서 `\\TRUENAS_SERVER_IP\SMB_USER_ID` 주소로 접속 후 ID와 비밀번호 입력하면 SMB 사용 가능.

### 사용 가능한 용량 설정

**유저별로 사용 가능한 용량을 설정하려면...** 좌측 Dataset 메뉴 → Manage User Quotas 클릭 → Show All Users 활성화 → 해당 유저 클릭 → User Data Quota에 용량 입력 후 Save 버튼 클릭

**그룹별로 사용 가능한 용량을 설정하려면...** 좌측 Dataset 메뉴 → Manage Group Quotas 클릭 → Show All Groups 활성화 → 해당 그룹 클릭 → Group Data Quota에 용량 입력 후 Save 버튼 클릭

**Group Quota는 그룹에 속한 모든 유저 사용량의 합을 제한하는 것임.** 그룹에 속한 각 유저의 사용량을 일괄적으로 설정하는 게 아님.

이 메뉴에서 각 유저 또는 그룹의 사용량을 볼 수 있음. (DQ Used 항목)

### 윈도우 사용자 PC에 SMB 마운트

1. 탐색기에서 내 PC 마우스 우클릭 → 네트워크 위치 추가 하거나 

2. 파워셸에서 아래 명령어 실행하거나

```shell
# Z 드라이브에 SMB 서버의 USERNAME 공유폴더 마운트.
# PASSWORD를 생략한 경우 명령어 실행 후 입력 가능.
# /persistent:yes 옵션은 컴퓨터를 재부팅해도 네트워크 드라이브를 자동 마운트함 
$ net use Z: \\TRUENAS_SERVER_IP\USERNAME /user:USERNAME PASSWORD /persistent:yes

# (참고) Z 드라이브 마운트 해제
$ net use /delete \\TRUENAS_SERVER_IP\USERNAME
$ net use /delete Z:
```

3. SMB 사용자 ID랑 비밀번호 입력받는 파워셸용 스크립트를 사용하면 됨. ps1 확장자로 저장 후 마우스 우클릭 → PowerShell에서 실행 클릭해주면 됨.

```shell
# 변수
$serverIp = "TRUENAS_SERVER_IP"  ## FreeNAS IP
$drive = "Z:"                    ## 마운트 할 드라이브 명

# ID 및 비밀번호 입력 받기
$id = Read-Host -Prompt 'Enter your FreeNAS SMB ID(Username)'
$password = Read-Host -Prompt 'Enter your Password' -AsSecureString  ## 암호화된 비밀번호
$passwordPlainText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))  ## 평문 비밀번호

# SMB 설정
Write-Host ""
Write-Host "$drive 드라이브 마운트 중..."
net use $drive \\$serverIp\$id /user:$id $passwordPlainText /persistent:yes
$passwordPlainText = $null  ## 비밀번호 변수 초기화

Write-Host "설정이 잘 됐을수도, 안 됐을수도 있습니다..."
Write-Host "탐색기에 $drive 드라이브가 나타나는지, 작동이 잘 되는지 반드시 확인하시기 바랍니다."
Write-Host ""
Read-Host -Prompt '종료하려면 Enter 키를 눌러주세요...'
```

### 로그(Audit) 설정

**Audit 레벨을 설정하려면...** 좌측 Shares 메뉴 → Windows(SMB) Shares 맨 오른쪽의 ... 클릭 → Config Service 클릭 → 고급 설정 클릭 → Log Level 설정. 일단 Minimum으로 설정해 둠. 모든 파일 생성 이력을 기록하려면 Normal 이상으로 설정해야 하는데, 그럼 엄청나게 불어날 듯...

**로그를 조회하려면...** 좌측 Shares 메뉴 → Windows(SMB) Shares 맨 오른쪽의 ... 클릭 → Audit Logs 클릭

**로그 주기, 할당용량 등 설정하려면...** 좌측 System Settings 메뉴 → 고급 → Audit 메뉴의 Configure 버튼 클릭


## 🔐 보안 설정

NAS 서버 대충 운영하다보면 해킹, 랜섬웨어 등으로 인생 끝날 수도 있으니(?) 아는 데까지 최대한 보안 설정해봄... 😅

### NAS 서버 취약점 점검 가이드

TrueNAS는 리눅스 커맨드라인 사용을 지양하고 모든 작업을 GUI를 이용하여 처리하라고 권장하므로 기본적인 취약점 조치는 되어 있을 것임. [한국인터넷진흥원(KISA) NAS 보안 가이드](https://www.kisa.or.kr/402/form?postSeq=2374)에 소개된 보안 취약점과 대응방안을 추가로 반영해 봄.

1. 약한 인증 및 취약한 비밀번호 사용: root, admin 및 SMB 사용자 비밀번호 복잡도를 높여 사용
2. 암호화 부재
   * 스토리지 풀 생성시 디스크 암호화 설정
   * TrueNAS GUI 페이지 접속 시 HTTPS로만 접속하도록 설정
   * SMB 암호화
3. 소프트웨어 취약점 및 부족한 보안 업데이트 관리
    * 접근 가능한 IP 설정
    * 외부에서 사용하는 경우 VPN 설정도 하고...
    * TrueNAS GUI 페이지 좌측 System Settings → Update 메뉴에서 자동 업데이트 하거나 [여기](https://www.truenas.com/docs/softwarereleases/)에서 업데이트 파일을 다운로드 받아 수동 업데이트
4. 접근권한 및 파일공유 설정 오류
   * SMB 사용자별 올바른 ACL 설정
   * SMB Audit Log 사용
5. 미처리된 공개 포트
   * 쓸데없는 서비스 및 포트 차단
   * 사용해야 하는 서비스 포트가 잘 알려진 포트(well-known port)인 경우 변경하여 사용
6. 사용자 실수로 인한 악성코드 감염: 사용자 보안교육 및 보안서약서 징구(🤔? 🤔? 🤔?)

### 서버 접속 허용할 IP 대역 설정

iptables를 사용하여 방화벽 설정해야 함.

**iptables 정책은 먼저 등록한 것이 우선순위를 가짐.** 아래 순서대로 명령어 실행하면 잘 먹히는 것 확인함.

1. `iptables -A INPUT -s 127.0.0.1 -j ACCEPT`      → 루프백 IP 접속 허용 안 해주면 NGINX 패킷 상태가 계속 SYN_SENT가 되어 GUI 페이지 접속 불가함
2. `iptables -A INPUT -s 192.168.0.0/16 -j ACCEPT` → 192.168.x.x IP만 접속 허용
3. `iptables -A INPUT -j DROP`                     → 위의 정책 외의 IP는 모두 접속 차단
4. `iptables-save`                                 → 정책 저장

iptables 정책 조회는 `iptables -nL`

```shell
admin@truenas[~]$ sudo iptables -nL
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     0    --  127.0.0.1            0.0.0.0/0  # nginx 때문에 루프백 IP 허용해줘야 함
ACCEPT     0    --  192.168.0.0/16       0.0.0.0/0  # 특정 대역 IP 접속 허용
DROP       0    --  0.0.0.0/0            0.0.0.0/0  # 이 외의 IP는 모두 접속 차단
```

**iptables 정책을 초기화하려면** `iptables -F`

**iptables 정책을 파일로 저장하려면** `iptables-save > /etc/iptables.conf`

**iptables 정책 파일을 불러오려면** `iptables-restore /etc/iptables.conf`

TrueNAS 서버 재기동하면 iptables 정책 초기화됨. **서버 재기동 시 iptables 정책을 자동으로 불러오도록 설정이 필요함.** `/etc/rc.local` 파일에(없으면 새로 생성) 아래 내용 입력하고 저장한 후

```shell
#!/bin/zsh
iptables-restore /etc/iptables.conf
exit 0
```

`sudo chmod +x /etc/rc.local` 명령어로 실행권한 부여하면 위에 입력한 명령어들이 서버 부팅 후 자동 실행됨.

### SMB 암호화 설정

원래 TrueNAS SMB 설정에 보조 매개변수(Auxiliary Parameters)를 입력하는 항목이 있어서 암호화 설정 한 줄만 넣어주면 됐던걸로 보이지만 최신 버전엔 보조 매개변수 입력하는 기능이 없음. **그래서 서버에 SSH로 접속하여 SMB 설정 파일을 수정한 후 smbd를 재기동해줘야 함.**

`/etc/smb4.conf` 파일을 열어 `[global]` 밑에 `smb encrypt = required` 추가 후 저장.

```shell
[global]
    rpc_daemon:mdssd = disabled
    rpc_server:mdssvc = disabled
    clustering = No
    include = registry
    smb encrypt = required  # 이거 한 줄 추가
```

`systemctl restart smbd` 명령어를 실행하여 SMB 서비스 재기동하면 암호화 적용됨.

* 못 믿겠으면 `smbstatus` 명령어를 실행해보거나
* TrueNAS GUI 페이지 좌측 Shares 메뉴 → Windows(SMB) Shares 맨 오른쪽의 ... 클릭 → SMB Sessions 클릭 → Encryption이 AES-128-GGM 등으로 뜨면 적용된 것임.

**TrueNAS GUI 페이지에서 SMB 서비스를 재기동하면 암호화 설정된 `/etc/smb4.conf` 파일이 초기화되므로 주의.**

* 암호화 설정 유지한 채로 SMB 서비스를 재기동하려면 `systemctl restart smbd` 명령어 실행
* TrueNAS GUI 페이지에서 SMB 서비스를 재기동하여 암호화 설정이 풀리더라도 위의 과정 반복해주면 됨
* 아니면 아래처럼 스크립트를 만든 다음 `/etc/rc.local`에 적용하여 서버 재기동 후에도 암호화 설정이 적용되도록 하거나...

```sh
cp /etc/_smb4.conf /etc/smb4.conf  # smb encrypt = required 옵션 추가된 conf 파일 복사
systemctl restart smbd             # SMB Daemon 재기동
```

### (참고) SMB conf 파일 세부 설정

SMB conf 파일에 아래와 같이 세부적인 암호화 설정 등을 넣을 수 있음. 이 외에 SMB conf 파일에 넣을 수 있는 설정은 [여기](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html) 참고.

```shell
[global]
    server smb3 encryption algorithms = AES-128-GCM, AES-128-CCM, AES-256-GCM, AES-256-CCM
    server smb3 signing algorithms = AES-128-GMAC, AES-128-CMAC, HMAC-SHA256
    client smb3 encryption algorithms = AES-128-GCM, AES-128-CCM, AES-256-GCM, AES-256-CCM
    client smb3 signing algorithms = AES-128-GMAC, AES-128-CMAC, HMAC-SHA256
```

AES-256 이상의 encryption 및 signing 알고리즘은 윈도우 10에서 지원하지 않음. [윈도우 11에서 지원하는 듯한데](https://learn.microsoft.com/ko-kr/windows-server/storage/file-server/smb-security) 테스트는 못 해봄...

### SSH 접속 허용

SSH 접속을 허용하려는 경우 GUI 페이지 좌측 System Settings → Services 메뉴에서 SSH 활성화.

TCP Port는 변경하고 Password Login Groups는 admin으로 설정해 놓음.

기본적으로 admin 계정으로만 SSH 접속이 가능함

  * root 로그인을 허용하려면 TrueNAS 좌측 Credentials → Local Users 메뉴에서 root 클릭 후 Edit 버튼 클릭하여 Disable Password 비활성화 해준 후 root 비밀번호 설정하고 접속하면 됨.

  * SSH password login enabled 체크하면 root 계정으로 바로 SSH 접속이 되겠지만 이건 뭐 알아서 하시든가...

### HTTP(S) 접속 포트 변경

* GUI 페이지 좌측 System Settings → General 메뉴의 GUI Settings 버튼 클릭.
* HTTP 및 HTTPS 포트 알아서 적절히 잘 변경.
* HTTPS로 리다이렉트 되도록 Web Interface HTTP → HTTPS Redirect 체크.


## 👷 유지보수(?)

### 디스크 추가

서버에 디스크를 추가한 후 TrueNAS GUI 페이지 좌측 Storage 메뉴 들어가면 Unassigned Disks가 보임. 이걸 사용하면 됨.

### RAID 구성한 디스크 장애났을 때 복구방법

디스크 추가한 후 TrueNAS admin 페이지 좌측 Storage 메뉴 → Manage Devices 클릭 → 장애난 디스크 클릭 → Replace 버튼 클릭 → 추가한 디스크 선택 후 Replace Disk 클릭. 에러난다면 Force 체크.


## ❗ 참고

https://www.truenas.com/docs/solutions/integrations/vmware/deploytninvmware/