---
title: Avamar Administrator 백업 스케쥴 설정 오류
description: Avamar Administrator 백업 스케쥴 설정 오류
date: 2022-03-29 00:00:00 +0900
categories: [system, backup]
tags: [system, backup]
---

## 증상

Avamar(DataDomain) 백업 시 DNS resolve 에러 발생

```log
2022-03-27 23:04:57 avtar Error <10541>: Failed to resolve Data Domain Server name "datadomain.co.kr" to an IP address. Data Domain login FAILED (Log #1) 
2022-03-27 23:04:57 avtar Error <10509>: Problem logging into the DDR server:'', only GSAN communication was enabled. (Log #1) 
2022-03-27 23:04:57 avtar FATAL <17964>: Backup is incomplete because file "/ddr_files.xml" is missing (Log #1) 
2022-03-27 23:04:57 avtar FATAL <8941>: Fatal server connection problem, aborting initialization. Verify correct server address and login credentials. (Log #1)
```


## 원인분석

백업대상 서버에서 Avamar(DataDomain)로 ping을 날릴 때 IP주소로 날리면 성공하지만, 도메인 네임으로 날리면 `unknown host` 에러 발생

```shell
# ping 192.168.1.1  ## IP주소로 ping 날리면 잘 날아감
PING 192.168.1.1: 64 byte packets
64 bytes from 192.168.1.1 icmp_seq=0, time=0. ms
64 bytes from 192.168.1.1 icmp_seq=1, time=0. ms
----192.168.1.1 PING Statistics----
2 packets transmitted, 2 packs received, 0% packet loss

# ping avamar.co.kr  ## but 도메인 네임으로 날리면 에러 발생
ping: unknown host avamar.co.kr
# ping datadomain.co.kr
ping: unknown host datadomain.co.kr
```

`/etc/hosts` 파일에 도메인 정보가 잘 등록되어 있음.
```shell
### Avamar
192.168.1.1   avamar.co.kr avamar
192.168.1.2   datadomain.co.kr datadomain
```

`/etc/resolv.conf` 파일에도 DNS 정보가 잘 등록되어 있음. 뭐임? 대체 뭐임?

![뭐임? 대체 뭐임?](/assets/img/posts/system/backup/what_what_is_it.jpg)


## 원인

`/etc/nsswitch.conf` 파일이 없어서 문제가 발생했던 것.

HP-UX 서버인 경우 `/etc/nsswitch.hp_defaults` 파일을 `/etc/nsswitch.conf` 이름으로 복사하고, 이 파일의 `hosts: ` 값을 `files dns`로 수정 후 저장하니 ping unknown host 에러와 Avamar(DataDomain) DNS resolve 에러 해결됨.

```shell
#
# /etc/nsswitch.conf
#
# @(#)
#
# An example file that could be copied over to /etc/nsswitch.conf; it gives
# the default Name Service Switch behaviour for HP-UX prior to release 10.30.
#

# 아래 값은 서버마다 다를 것임...

passwd:     files ldap
group:      files ldap
hosts:      files dns  # hosts: 값을 files dns로 수정하니 해결됨
networks:   ldap [NOTFOUND=return] files
protocols:  ldap [NOTFOUND=return] files
rpc:        ldap [NOTFOUND=return] files
ethers:     ldap [NOTFOUND=return] files
netmasks:   ldap [NOTFOUND=return] files
bootparams: ldap [NOTFOUND=return] files
publickey:  ldap [NOTFOUND=return] files
netgroup:   ldap
automount:  files ldap
aliases:    files ldap
services:   files ldap
```