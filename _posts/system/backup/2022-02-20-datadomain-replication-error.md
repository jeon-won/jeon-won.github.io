---
title: DataDomain 백업 데이터 복제(Replication) 오류
description: DataDomain 백업 데이터 복제(Replication) 오류
date: 2022-02-20 00:00:00 +0900
categories: [system, backup]
tags: [system, backup]
---

## 문제

* A기관에 Avamar + DataDomain, B기관에 Avamar + DataDomain 설치 후 A기관의 백업 데이터를 B기관으로 복제(Replication)하려 함
* Avamar 백업 데이터는 잘 복제되지만, DataDomain 백업 데이터는 복제되지 않고 오류 발생


## 증상

* 복제 작업 실행 시 Avamar와 DataDomain 간 세션 수립이 되지만 곧 끊어짐
* 복제 작업 실행 전엔 Source Avamar와 Destination DataDomain 간 ping 송수신, SSH 연결 등의 통신이 원활히 되지만 복제 작업을 실행하면 ping 응답이 없고 SSH 연결도 되지 않음
* 두 기관의 방화벽 로그를 조회해보니 허용로그가 있고 차단로그는 발견되지 않음...


## 해봤던 삽질들

* 네트워크 대역폭 문제인가? 대역폭을 10Mbps까지도 줄여봤으나 해결 안 됨
* 방화벽에 Avamar 및 DataDomain의 IP가 블랙리스트로 등록되어 있는가? No...
* DataDomain의 이더넷 케이블 불량인가? No...
* DataDomain의 이더넷 포트 고장인가? No...
* Avamar, DataDomain 둘 다 재기동 해볼까? 해봤으나 해결 안 됨
* Source DataDomain OS 버전은 6.1.1.20이고 Destination DataDomain OS 버전은 6.2.1.30인데, 미세한 버전 차이(?)로 인해 문제가 발생할 수 있는가? 당연히 No...
* 두 기관 사이에 있는 상위기관의 통신장비 문제인가? No... (상위기관의 통신장비는 라우팅만 수행할 뿐 포트, 서비스, 시간대 및 대역폭에 따라 통신을 차단하지 않는 것 확인)


## 원인분석

DataDomain 원격지 백업 작업 시작 후 Avamar Administrator에서 로그 확인 결과 `Replication failed: could not open connection to dest DDR` 에러 발생

```log
2021-06-29 15:06:17 avtar FATAL <0000>: <10608>Replication failed: could not open connection to dest DDR DATA_DOMAIN_DOMAIN, dest LSU: avamar-1234567890, handle: -1, DDR result code: 5037, desc: illegal operation
2021-06-29 15:06:17 avtar FATAL <40009>: DDR encountered errors.
2021-06-29 15:06:17 avtar Info <9772>: Starting graceful (staged) termination, DDR_ERROR event received (fatal severity) (wrap-up stage)
2021-06-29 15:06:17 avtar Info <0000>: Entering the 'final' phase of termination, DDR_ERROR need to exit)
2021/06/29-06:06:17.04880 [avtar]  INTERNAL ERROR: <0001> assert error (result == MSG_ERR_NONE), /local/jenkins/workspace/client_Rooster_SLES11-64/abs2/work/src/avtar/ade/adelib/interfaceade.cpp line 396
2021-06-29 15:06:17 avtar Error <5674>: Could not locate requested backup for replication
2021-06-29 15:06:17 avtar Error <6655>: Replicate interrupted.
2021-06-29 15:06:17 avtar Info <7925>: Restored 0 bytes from selection(s) with 0 bytes in 0 files
2021-06-29 15:06:17 avtar Info <7883>: Finished at 2021-06-29 15:06:17 KST, Elapsed time: 0000h:12m:20s
2021-06-29 15:06:17 avtar Info <40176>: - Multi-stream restore summary (current 0, max active 0, max cloned 0, total cloned 0, ddr handle 1): 
2021-06-29 15:06:17 avtar Info <6149>: Error summary: 5 errors: 6655, 5674, 40009, 0
2021-06-29 15:06:17 avtar Info <8468>: Sending wrapup message to parent
2021-06-29 15:06:17 avtar Info <5314>: Command failed (5 errors, 2 warnings, exit code 10007: miscellaneous error)
```

A기관의 Avamar에서 SSH 접속 후 ddpconnchk라는 툴로 B기관의 DataDomain 접속 테스트 해봤더니 RPC 오류 발생

```shell
root@avamar:/data01/home/admin/# ./ddpconnchk -s DATA_DOMAIN_IP -u ddboost -p P@SsW0rd
DDP CLIENT LIBRARY VERSION 3:5:0:2-635767

SERVER: DATA_DOMAIN_IP
--------------------
*** CONNECT SERVER TEST, DATA_DOMAIN_IP
DDLOG: WARN: [1B50:9B0EA0] Port lookup for program 100003 failed. Retry number: 1
DDLOG: WARN: [1B50:9B0EA0] clnt_process_a_send_job RPC error, Will fail all jobs later for status=5
# ... 생략
DDLOG: ERR: [1B50:9B0EA0] Port lookup for program 100003 failed.

********************************************************
** DDP connect FAILED
**   Servername: DATADOMAIN_IP
**   Username: svc_dd_boost
**   Password: **************
**   Error: rpc operation/connection failure
**
** - Verify OST is licensed and enabled on the server
** - Verify username/passwd matches values
**   configured on server
** - Verify that access by this host is allowed
********************************************************
DDP Connect Server Test FAILED
```

netstat 명령어 확인 결과 111번 포트 상태가 ESTABLISHED지만 Send-Q 값이 빠지지 않고 몇 분 후 상태가 변하면서 해제됨

```shell
# 원격지 복제 작업 걸어놓은 후 A기관의 Avamar에서 111번 포트 확인
admin@avamar:~/> netstat -an | grep 111
tcp        0     60 AVAMAR_IP:44537     DATA_DOMAIN_IP:111        ESTABLISHED  # B기관의 DataDomain과 연결되어 있음 but Send-Q 값이 줄어들지 않음...
tcp        0      1 AVAMAR_IP:44528     DATA_DOMAIN_IP:111        SYN_SENT

# 시간이 꽤 지나면 ESTABLISHED → FIN_WAIT1 상태로 변경됨
admin@avamar:~/> netstat -an | grep 111
tcp        0      1 AVAMAR_IP:49740     DATA_DOMAIN_IP:111        FIN_WAIT1

# B기관의 DataDomain에서 111번 포트 확인
ddboost@datadomain# netstat
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0     32 DATA_DOMAIN_IP:111      AVAMAR_IP:44361         ESTABLISHED  # A기관의 Avamar와 연결되어 있음 but Send-Q 값이 줄어들지 않음...
tcp        0     32 DATA_DOMAIN_IP:111      AVAMAR_IP:44419         ESTABLISHED 
tcp        0     32 DATA_DOMAIN_IP:111      AVAMAR_IP:44380         ESTABLISHED
```

iperf로 A기관의 Avamar → B기관의 DataDomain으로 데이터 전송 잘 되는 것 확인함

```shell
sysadmin@datadomain# net iperf server  # DataDomain에서 iperf Server 모드 실행
----------------------------------------------j--------------
Server listening on TCP port 5001
TCP window size:  256 KByte (default)
------------------------------------------------------------
[  4] local DATA_DOMAIN_IP port 5001 connected with AVAMAR_IP port 14376
[ ID] Interval       Transfer     Bandwidth
[  4]  0.0-10.0 sec   574 MBytes   480 Mbits/sec
```

복제 작업을 실행하지 않았을 때 traceroute 명령어로 A기관의 Avamar → B기관의 DataDomain 정상 도달 확인

```shell
root@avamar:~/# traceroute -I DATA_DOMAIN_IP
Note: the -i and -I options were exchangedfor compability with LBL traceroute
Use -I for ICMP, and -i <ifname> to specify the interface name
traceroute to DATA_DOMAIN_IP (DATA_DOMAIN_IP), 30 hops max, 40 byte packets using ICMP
 1  A_SWITCH (A_BACKBONE_SWITCH)  0.791 ms   0.740 ms   0.612 ms
 2  A_SWITCH (A_FAILOVER_SWITCH)  0.947 ms   0.577 ms   0.496 ms
 3  A_SWITCH (A_SWITCH)  1.640 ms   4.393 ms   3.013 ms              -> 여기까지 A기관 통신장비
 4  SERIAL_IP (SERIAL_IP)  2.632 ms   1.908 ms   6.154 ms            -> 여기서부터 상위기관 통신장비
 5  SERIAL_IP (SERIAL_IP)  5.667 ms   4.795 ms   2.980 ms
 6  SERIAL_IP (SERIAL_IP)  1.834 ms   1.838 ms   5.145 ms
 7  SERIAL_IP (SERIAL_IP)  2.080 ms   4.899 ms   3.812 ms
 8  SERIAL_IP (SERIAL_IP)  3.283 ms   7.983 ms   6.874 ms
 9  SERIAL_IP (SERIAL_IP)  5.754 ms   4.021 ms   1.940 ms
10  SERIAL_IP (SERIAL_IP)  2.118 ms   5.800 ms   4.956 ms
11  SERIAL_IP (SERIAL_IP)  1.671 ms   5.913 ms   4.803 ms
12  SERIAL_IP (SERIAL_IP)  1.723 ms   6.091 ms   4.984 ms
13  SERIAL_IP (SERIAL_IP)  1.893 ms   5.966 ms   4.859 ms            -> 여기까지 상위기관 통신장비
14  B_SWITCH (B_SWITCH)  2.242 ms   6.426 ms   5.318 ms              -> 여기서부터 B기관 통신장비
15  DATA_DOMAIN_IP (DATA_DOMAIN_IP)  4.260 ms   4.238 ms   3.178 ms  -> 정상 도달
```

but 복제 작업을 시작하면 도달 불가

```shell
root@avamar:~/# traceroute -I DATA_DOMAIN_IP
Note: the -i and -I options were exchangedfor compability with LBL traceroute
Use -I for ICMP, and -i <ifname> to specify the interface name
traceroute to DATA_DOMAIN_IP (DATA_DOMAIN_IP), 30 hops max, 40 byte packets using ICMP
 1  A_SWITCH (A_BACKBONE_SWITCH)  0.791 ms   0.740 ms   0.612 ms
 2  A_SWITCH (A_FAILOVER_SWITCH)  0.947 ms   0.577 ms   0.496 ms
 3  A_SWITCH (A_SWITCH)  1.640 ms   4.393 ms   3.013 ms      -> 여기까지 A기관 통신장비
 4  SERIAL_IP (SERIAL_IP)  1.989 ms   1.316 ms   7.284 ms    -> 여기서부터 상위기관 통신장비
 5  SERIAL_IP (SERIAL_IP)  6.761 ms   6.337 ms   14.864 ms
 6  SERIAL_IP (SERIAL_IP)  1.574 ms   6.055 ms   4.946 ms
 7  SERIAL_IP (SERIAL_IP)  2.084 ms   5.247 ms   4.066 ms
 8  SERIAL_IP (SERIAL_IP)  1.347 ms   5.288 ms   4.180 ms
 9  SERIAL_IP (SERIAL_IP)  2.546 ms   6.469 ms   5.360 ms
10  SERIAL_IP (SERIAL_IP)  4.273 ms   3.875 ms   3.190 ms
11  SERIAL_IP (SERIAL_IP)  3.214 ms   5.936 ms   4.826 ms
12  SERIAL_IP (SERIAL_IP)  3.856 ms   5.789 ms   2.686 ms
13  SERIAL_IP (SERIAL_IP)  4.453 ms   7.945 ms   6.836 ms   -> 여기까지 상위기관 통신장비
14  * * *                                                   -> B기관 Area에서 timeout 발생. B기관 통신장비에서 가로막고 있는 것으로 추정...
15 ~ 29 * * *
30  * * *
```

마찬가지로 복제 작업을 실행하지 않았을 때 traceroute 명령어로 B기관의 DataDomain → A기관의 Avamar 정상 도달 확인

```shell
sysadmin@datadomain# net route trace AVAMAR_IP
traceroute to AVAMAR_IP (AVAMAR_IP), 30 hops max, 60 byte packets
 1  B_SWITCH (B_SWITCH)  54.464 ms  54.837 ms  54.858 ms
 2  B_SWITCH (B_SWITCH)  0.655 ms  1.883 ms  1.905 ms    -> 여기까지 B기관 통신장비
 3  SERIAL_IP (SERIAL_IP)  1.375 ms  2.035 ms  2.052 ms  -> 여기서부터 상위기관 통신장비
 4  SERIAL_IP (SERIAL_IP)  1.630 ms  1.829 ms  2.023 ms
 5  SERIAL_IP (SERIAL_IP)  1.796 ms  1.894 ms  1.897 ms
 6  SERIAL_IP (SERIAL_IP)  1.964 ms  1.340 ms  2.638 ms
 7  SERIAL_IP (SERIAL_IP)  2.005 ms  1.997 ms  2.016 ms  -> 여기까지 상위기관 통신장비
 8  A_SWITCH (A_SWITCH)  2.928 ms  2.992 ms  3.800 ms    -> 여기서부터 A기관 통신장비
 9  A_SWITCH (A_SWITCH)  2.984 ms  3.983 ms  3.987 ms
10  AVAMAR_IP (AVAMAR_IP)  3.476 ms  3.497 ms  3.736 ms  -> 정상 도달
```

but 원격지 백업 작업을 시작하면 도달 불가

```shell
sysadmin@datadomain# net route trace AVAMAR_IP
traceroute to AVAMAR_IP (AVAMAR_IP), 30 hops max, 60 byte packets
 1  B_SWITCH (B_SWITCH)  12.280 ms  13.585 ms  13.606 ms  -> B 기관 통신장비
 2  * * *                                                 -> timeout 발생. B기관 통신장비에서 가로막고 있는 것으로 추정...
 3 ~ 29 * * *
30  * * *
```

이런 정황들을 봤을 때, B기관의 통신장비에서 통신을 가로막고 있는 느낌적인 느낌이...

## 원인

* Source DataDomain의 백업 데이터를 Destination DataDomain으로 복제할 때 Source Avamar와 Destination DataDomain간 세션을 수립한 후 통신을 수행함
* 이 때 두 서버간 SSH 연결이 가능해야 하며, RPC(원격 프로시저 호출) 프로토콜을 사용함
* 그런데 침입방지시스템(IPS)에서 RPC를 침입으로 간주하여 차단했기 때문에 원격지 백업 데이터 복제 오류 발생
* 알고보니 방화벽에만 포트 허용 설정이 되어 있었고 IPS에는 아무런 설정이 되어있지 않아 발생한 문제였음...


## 해결

침입방지시스템(IPS) 설정하여 해결 ~~너무 간단한 방법이었다니!~~


## 참고

* [Avamar Replication - undocumented but required port (SSH / Port 22)](https://www.dell.com/support/kbdoc/ko-kr/000019734/avamar-replication-undocumented-but-required-port-ssh-port-22)
* [Dell EMC Data Domain® Security Configuration Guide 302-005-263 REV 03의 27Page](https://www.delltechnologies.com/asset/en-us/products/data-protection/technical-support/docu91808.pdf): DataDomain에서 사용하는 포트 설명