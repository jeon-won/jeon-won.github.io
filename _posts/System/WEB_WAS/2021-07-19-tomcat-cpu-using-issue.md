---
title: OutOfMemory Error로 인한 톰캣(Tomcat) CPU 사용률 문제
author: Jeon Won
date: 2021-07-19 21:00:00 +0900
categories: [System, WEB & WAS]
tags: [tomcat]
---

## 증상

* WAS(Tomcat) 운영 중인 리눅스 서버 접속 시 무한 로딩 발생
* top 명령을 실행해보니 특정 자바 프로세스의 CPU 사용률이 매우 치솟음

```shell
  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
21773 root      20   0 7849m 901m  14m S  395.8 11.3  23:05.69 java  # CPU 사용률 매우 ↑
 2228 root      20   0 7750m 535m  16m S  2.4  6.7 134:25.06 java
 2437 root      20   0 4573m 209m  13m S  2.4  1.6   3:24.32 java
30834 root      20   0 15128 1332  948 R  2.4  0.0   0:00.03 top
    1 root      20   0 19356 1568 1240 S  0.0  0.0   0:00.69 /sbin/init
...생략
```


## 원인분석

* top 명령어 실행 후 c를 눌러 문제가 발생한 프로세스가 톰캣 관련 프로세스임을 확인

```shell
  PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
21773 root      20   0 7849m 901m  14m S  395.8 11.3 23:05.69 /usr/java/jdk1.8/bin/java -Djava.util.logging.config.file=/usr/local/tomcat/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djava.awt.headless=true -server -Xms1024m -Xmx1024m -XX:NewSize=256m -XX:MaxNewSize=512m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:+DisableExplicitGC -Djdk.tls.ephemeralDHKeySize=2048 ...생략
 2228 root      20   0 7750m 535m  16m S  2.4  6.7 134:25.06 java -Dfile.encoding...생략
 2437 root      20   0 4573m 209m  13m S  2.4  1.6   3:24.32 java -DMCSMon_1 -Df...생략
30834 root      20   0 15128 1332  948 R  2.4  0.0   0:00.03 top
    1 root      20   0 19356 1568 1240 S  0.0  0.0   0:00.69 /sbin/init
```

* 톰캣 로그 확인: `/usr/local/tomcat/logs`에 담긴 로그파일을 열람하여 장애 발생 추정 시간에 `java.lang.OutOfMemoryError: GC overhead limit exceeded` 오류 발생

```log
16-Jul-2021 16:56:07.679 심각 [http-nio-80-exec-678] org.apache.catalina.core.StandardWrapperValve.invoke Servlet.service() for servlet [dispatcher] in context with path [] threw exception [Handler dispatch failed; nested exception is java.lang.OutOfMemoryError: GC overhead limit exceeded] with root cause java.lang.OutOfMemoryError: GC overhead limit exceeded
```


## 해결

* JVM 옵션 중 최대 힙 메모리 설정
* 톰캣의 JVM 옵션은 `/usr/local/tomcat/bin/catalina.sh` 파일에 정의됨

```shell
# /usr/local/tomcat/bin/catalina.sh 수정 (-Xms: 최소 힙 메모리, -Xmx: 최대 힙 메모리)
JAVA_OPTS="-Djava.awt.headless=true -server -Xms1024m -Xmx4096m -XX:NewSize=256m -XX:MaxNewSize=512m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:+DisableExplicitGC"
```

* 근본적인 해결 방법은 힙 메모리 덤프를 떠서 분석한 후 어느 부분에서 문제가 발생했는지 찾아서 수정하는 것(예: 루프문 안에서 객체가 무한대로 생성된다거나...)


## 참고
* [[WAS 이슈 해결 #1] java.lang.OutOfMemoryError: GC overhead limit exceeded 로 인한 Tomcat 서버 다운 / CPU 사용량 폭증](https://extsdd.tistory.com/257)
* [[WAS 이슈 해결 #2] MAT 힙 덤프 분석으로 JAVA 메모리 누수(Memory Leak) 잡기 - 톰캣 힙메모리 증가 문제 / Out of Memory](https://extsdd.tistory.com/258)
* [GC overhead limit exceeded](https://helloino.tistory.com/97)
* [java.lang.OutOfMemoryError: GC overhead limit exceeded](https://plumbr.io/outofmemoryerror/gc-overhead-limit-exceeded)
