---
title: Rocky Linux 9 파일시스템 설정
description: Rocky Linux 9 파일시스템 설정
date: 2024-09-14 00:00:00 +0900
categories: [system, linux]
tags: [system, linux]
---

[![너 공부 싫어하지? (어... 어떻게 알았지?) 출처: https://www.instagram.com/25_jw/](/assets/img/posts/system/linux/25jw-do-you-hate-study.jpg)](https://www.instagram.com/25_jw/)

CentOS 서버 이관용 Rocky Linux 9 가상화 서버 만들다가 배운 걸 정리한 글. 제대로 이해한건지 모르겠으나... 암튼 정리해봄. 😵‍💫


## 🔠 용어 설명

* LVM(Logical Volume Manager): 디스크를 논리적으로 구성하기 위한 기능
* 디스크: 데이터를 저장하는 실제 하드웨어
  - `/dev/sda`, `/dev/sdb` 등의 장치 파일로 표현됨
* 파티션: 디스크를 논리적으로 나눈 구역
  - `/dev/sda1`, `/dev/sdb2` 등의 장치 파일로 표현됨
* 물리볼륨(PV, Physical Volume): 디스크나 파티션을 초기화한 것
* 볼륨그룹(VG, Volume Group): 하나 또는 여러 개의 물리볼륨(PV)를 포함하는 그룹
* 논리볼륨(LV, Logical Volume): 볼륨그룹의 공간 전체 또는 일부를 분할하여 파일시스템 등으로 사용할 수 있도록 할당된 논리 공간
  - 볼륨그룹과 논리볼륨을 생성하면 `/dev/mapper/` 경로에 파일로 표현됨
* 파일시스템: 파일들이 디스크 상에서 구성되는 방식
  - RHEL 6 및 CentOS 6 버전의 기본 파일시스템은 ext4
  - RHEL 7 및 CentOS 7 버전 이후의 기본 파일시스템은 xfs
  - Rocky Linux 9 버전의 기본 파일시스템도 xfs


## 👀 디스크, 파티션 및 볼륨 정보 조회

`lsblk` 명령어를 사용하면 사용 중인 디스크, 파티션, 볼륨그룹(VG) 및 논리볼륨을(LV) 계층별로 조회해볼 수 있음.

```shell
[root@hostname ~] lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0   200G  0 disk            # 파티션 분할된 디스크
├─sda1        8:1    0   600M  0 part /boot/efi  # 파티션 1 ~ 3
├─sda2        8:2    0     1G  0 part /boot
└─sda3        8:3    0 198.4G  0 part
  ├─rl-root 253:0    0 184.4G  0 lvm  /          # VG-LV(예: rl은 Volume Group 이름, root는 Logical Volume 이름)
  └─rl-swap 253:1    0    14G  0 lvm  [SWAP]
sdb           8:16   0   300G  0 disk            # 파티션 분할 안 된 디스크
```

`df -TH` 명령어를 사용하면 사용 중인 파일시스템을 조회해볼 수 있음.

```shell
[root@hostname ~] df -TH
Filesystem          Type      Size  Used Avail Use% Mounted on
devtmpfs            devtmpfs  4.1G     0  4.1G   0% /dev
tmpfs               tmpfs     4.1G     0  4.1G   0% /dev/shm
tmpfs               tmpfs     4.1G  236M  3.8G   6% /run
tmpfs               tmpfs     4.1G     0  4.1G   0% /sys/fs/cgroup
/dev/mapper/rl-root xfs       184G   23G  161G  13% /          # /dev/mapper/볼륨그룹(VG)이름-논리볼륨(LV)이름
/dev/mapper/rl-logs xfs        22G  186M   22G   1% /logs
/dev/sda1           vfat      628M  6.0M  622M   1% /boot/efi  # /dev/sdX: 디스크
/dev/sda2           xfs       1.1G  190M  875M  18% /boot      # /dev/sdXx: 파티션
tmpfs               tmpfs     805M     0  805M   0% /run/user/0
```

## 🛠️ 디스크 추가 후 파일시스템 마운트 해보기

과정은 다음과 같음.

1. `fdisk` 명령어로 파티션 생성
2. `pvcreate` 명령어로 물리볼륨(PV) 생성
3. `vgcreate` 명령어로 볼륨그룹(VG) 생성
4. `lvcreate` 명령어로 논리볼륨(LV) 생성
5. `mkfs` 명령어로 파일시스템 생성
6. `mount` 명령어로 파일시스템 마운트

먼저 `lsblk` 명령어로 서버에 장착된 디스크 확인. **여기선 `/dev/sdb` 디스크를 xfs 파일시스템을 사용하여 마운트 해볼 것임.**

```shell
[root@hostname ~] lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0   116G  0 disk             # 파티션(sda1, sda2, sda3) 설정 된 디스크
├─sda1        8:1    0   600M  0 part /boot/efi
├─sda2        8:2    0     1G  0 part /boot
└─sda3        8:3    0 114.4G  0 part
  ├─rl-root 253:0    0 100.4G  0 lvm  /
  └─rl-swap 253:1    0    14G  0 lvm  [SWAP]
sdb           8:16   0   200G  0 disk             # 파티션 설정 안 된 디스크 → 이걸 마운트해볼 것임
```

`fdisk` 명령어로 Linux LVM 타입의 파티션 생성. 

**아래는 하나의 디스크에 파티션을 두 개 만드는 경우를 설명**한 것이며, 하나의 디스크에 한 개의 파티션만 만드는 경우 파티션을 만들지 않고 바로 물리볼륨 생성 단계로 넘어가도 됨. (한 개의 파티션만 만들면 나중에 lsblk 명령어 실행 시 그래프가 지저분하게 보일 듯 😅)

```shell
# 디스크 정보 조회
[root@hostname ~] fdisk -l /dev/sdb
Disk /dev/sdb: 200 GiB, 214748364800 bytes, 419430400 sectors
Disk model: Virtual disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

```shell
# 디스크 파티션 설정
[root@hostname ~] fdisk /dev/sdb

Welcome to fdisk (util-linux 2.37.4).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xf0d74294.


# 첫 번째 파티션 만들기
Command (m for help): n  ## n: New
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p                         ## 기본 파티션 만들 것임
Partition number (1-4, default 1): 1          ## 첫 번째 파티션
First sector (2048-419430399, default 2048):  ## 시작 섹터. 기본 값 엔터.
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-419430399, default 419430399): +50G  ## 마지막 섹터. 원하는 파티션 용량 입력.

Created a new partition 1 of type 'Linux' and of size 50 GiB.


# 두 번째 파티션 만들기
Command (m for help): n  ## n: New
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p                                   ## 기본 파티션 만들 것임
Partition number (2-4, default 2): 2                    ## 두 번째 파티션
First sector (104859648-419430399, default 104859648):  ## 시작 섹터. 기본 값 엔터.
Last sector, +/-sectors or +/-size{K,M,G,T,P} (104859648-419430399, default 419430399):  ## 마지막 섹터. 엔터 치면 할당 가능한 최대 용량이 할당됨

Created a new partition 2 of type 'Linux' and of size 150 GiB.


# 첫 번째 파티션 타입 설정
Command (m for help): t                    ## t: Type
Partition number (1,2, default 2): 1       ## 첫 번째 파티션
Hex code or alias (type L to list all): L  ## L: 모든 파티션 타입 출력
## 출력내용 생략...
Aliases:
   linux          - 83
   swap           - 82
   extended       - 05
   uefi           - EF
   raid           - FD
   lvm            - 8E  ## 8e Linux LVM으로 설정할 거임
   linuxex        - 85
Hex code or alias (type L to list all): 8e  ## 8e 입력

Changed type of partition 'Linux' to 'Linux LVM'.

# 두 번째 파티션 타입 설정
Command (m for help): t                     ## t: type
Partition number (1,2, default 2): 2        ## 두 번째 파티션
Hex code or alias (type L to list all): 8e  ## 8e 입력

Changed type of partition 'Linux' to 'Linux LVM'.


# 저장
Command (m for help): w  ## w: Write
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

```shell
# 파티션 잘 생성됐는지 못 믿겠으면 한번 확인
[root@hostname ~] fdisk -l /dev/sdb1
Disk /dev/sdb1: 50 GiB, 53687091200 bytes, 104857600 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@hostname ~] fdisk -l /dev/sdb2
# 생략...
```

파티션을 생성했다면 `pvcreate` 명령어로 물리볼륨(PV) 생성.

```shell
# /dev/sdb1 파티션을 물리볼륨(PV)으로 초기화
[root@hostname ~] pvcreate /dev/sdb1
  Physical volume "/dev/sdb1" successfully created.

# (참고) 파티션 분할하지 않은 /dev/sdb 디스크 전체를 물리볼륨(PV)으로 초기화
[root@hostname ~] pvcreate /dev/sdb
  Physical volume "/dev/sdb" successfully created.

# 물리볼륨 잘 생성 됐는지 못 믿겠으면 pvdisplay 명령어로 확인
[root@hostname ~] pvdisplay /dev/sdb1
  "/dev/sdb1" is a new physical volume of "50.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb1
  VG Name
  PV Size               50.00 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               rOcKy-48uM-ag19-sgCU-8Iju-eFAi-lInUx9

# 적을 공간이 부족(?)하여 이제 /dev/sdb2 파티션 관련 작업 설명은 생략... 알아서 해보셈 🤗
```

물리볼륨(PV)을 생성했다면 `vgcreate` 명령어로 볼륨그룹(VG) 생성

```shell
# /dev/sdb1 물리볼륨(PV)을 포함하는 datavg 라는 이름의 볼륨그룹(VG) 생성
[root@hostname ~] vgcreate datavg /dev/sdb1
  Volume group "datavg" successfully created

# (참고) 볼륨그룹은 여러 개의 물리볼륨을 포함할 수 있음
[root@hostname ~] vgcreate datavg /dev/sdb1 /dev/sdb2 /dev/sdb3

# 볼륨그룹 절 생성 됐는지 못 믿겠으면 vgdisplay 명령어로 확인
[root@hostname ~] vgdisplay datavg
  --- Volume group ---
  VG Name               datavg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <50.00 GiB
  PE Size               4.00 MiB
  Total PE              12799
  Alloc PE / Size       0 / 0
  Free  PE / Size       12799 / <50.00 GiB
  VG UUID               rOkCy-2N5D-gR18-Inmb-Ceoh-1MwG-lInUx
```

볼륨그룹(VG)을 생성했다면 `lvcreate` 명령어로 논리볼륨(LV) 생성.

```shell
# datavg 볼륨그룹(VG)에 data1이라는 이름의 논리볼륨(LV)을 20GB만큼 생성
[root@hostname ~] lvcreate -n data1 -L 20G datavg
  Logical volume "data1" created.

# datavg 볼륨그룹(VG)에 data2이라는 이름의 논리볼륨(LV)을 남아있는 모든 공간을 사용하여 생성
[root@hostname ~] lvcreate -n data2 -l 100%FREE datavg
  Logical volume "data2" created.

# (참고) datavg 볼륨그룹(VG)에 data3이라는 이름의 논리볼륨(LV)을 /dev/sdb1 물리볼륨(PV)에 남아있는 모든 공간을 사용하여 생성
# 여러 개의 물리볼륨(PV)을 갖고 있는 볼륨그룹(VG)에 논리볼륨(LV)을 만들 때 매핑용(논리볼륨 → 물리볼륨)으로 쓰면 좋을 듯
[root@hostname ~] lvcreate -n data3 -l 100%FREE datavg /dev/sdb1
  Logical volume "data3" created.

# 논리볼륨 잘 생성 됐는지 못 믿겠으면 lvdisplay 명령어로 확인
[root@hostname ~] lvdisplay /dev/mapper/datavg-data1
  --- Logical volume ---
  LV Path                /dev/datavg/data1
  LV Name                data1
  VG Name                datavg
  LV UUID                rOcKy-aYdk-qnEK-nHdG-f7xJ-B4uL-lInUx
  LV Write Access        read/write
  LV Creation host, time rockyhost, 2024-09-11 17:51:50 +0900
  LV Status              available
  # open                 0
  LV Size                20.00 GiB
  Current LE             5120
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           253:2

```

논리볼륨(LV)을 생성했다면 `mkfs.xfs` 명령어로 xfs 파일 시스템 생성. (ext4 파일시스템을 생성하려면 `mkfs.ext4`)

```shell
# datavg 볼륨그룹(VG)에 있는 data1 논리볼륨(LV)에 xfs 파일시스템 생성
[root@hostname ~] mkfs.xfs /dev/mapper/datavg-data1
meta-data=/dev/mapper/datavg-data1 isize=512    agcount=4, agsize=1310720 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=5242880, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=16384, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

파일시스템을 생성했다면 디렉터리 생성 후 마운트.

```shell
# 디렉터리 생성
[root@hostname ~] mkdir /data1

# 논리볼륨(LV)을 디렉터리에 마운트
[root@hostname ~] mount /dev/mapper/datavg-data1 /data1

# 마운트 잘 됐는지 못 믿겠으면 df 명령어로 확인
[root@hostname ~] df -TH
Filesystem               Type      Size  Used Avail Use% Mounted on
devtmpfs                 devtmpfs  4.2M     0  4.2M   0% /dev
tmpfs                    tmpfs     4.1G     0  4.1G   0% /dev/shm
tmpfs                    tmpfs     1.7G   12M  1.6G   1% /run
/dev/mapper/rl-root      xfs       108G  6.6G  102G   7% /
/dev/sda2                xfs       1.1G  307M  701M  31% /boot
/dev/sda1                vfat      628M  7.4M  621M   2% /boot/efi
tmpfs                    tmpfs     805M  132k  805M   1% /run/user/1000
/dev/mapper/datavg-data1 xfs        22G  184M   22G   1% /data1  # 잘 마운트 됨
```

서버 재기동 시 파일시스템이 자동 마운트되도록 `/etc/fstab` 파일에 등록

```shell
# 아래와 같이 입력
/dev/mapper/datavg-data1  /data1  xfs  defaults  0  0
```

`systemctl daemon-reload` 명령어로 수정된 fstab 파일을 반영하거나 재부팅하여 파일시스템이 자동으로 마운트 되는지 최종 확인.


## 🔍 파일시스템 용량 확장

디스크에 할당되지 않은 공간이 남아있을 때 이를 활용하는 과정은 다음과 같음.

1. `growpart` 명령어로 파티션 크기 확장
2. `pvresize` 명령어로 물리볼륨(PV) 크기 조정
3. `lvextend` 명령어로 논리볼륨(LV) 크기 확장
4. `xfs_growfs` 명령어(또는 `resize2fs` 명령어)로 파일시스템 크기 확장.

먼저 `lsblk`, `df -h` 또는 `fdisk -l` 명령어로 용량 확장할 파일시스템 확인. **여기선 /dev/sda3 디스크 파티션의 rl-root 볼륨그룹(VG)-논리볼륨(LV)의 용량을 늘린다고 가정함.**

```shell
# 파티션, VG(볼륨그룹) 및 LV(논리볼륨) 확인
[root@hostname ~] lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0   200G  0 disk             # /dev/sda 디스크 총 용량이 200G인데
├─sda1        8:1    0   600M  0 part /boot/efi   # sda1 ~ 3 파티션 용량 모두 합치면 200GB가 안 됨
├─sda2        8:2    0     1G  0 part /boot       # 즉 할당되지 않은 공간이 있음
└─sda3        8:3    0 114.4G  0 part 
  ├─rl-root 253:0    0 100.4G  0 lvm  /           # 이걸 늘릴 것임
  └─rl-swap 253:1    0    14G  0 lvm  [SWAP]
```

```shell
# 파일시스템 확인
[root@hostname ~] df -h
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             4.0M     0  4.0M   0% /dev
tmpfs                3.8G     0  3.8G   0% /dev/shm
tmpfs                1.5G  9.4M  1.5G   1% /run
/dev/mapper/rl-root  101G  6.1G   95G   7% /  # 이거 늘릴 거임
/dev/sda2            960M  293M  668M  31% /boot
/dev/sda1            599M  7.0M  592M   2% /boot/efi
tmpfs                768M  132K  768M   1% /run/user/1000
```

```shell
# 디스크 및 파티션 세부 정보 확인
[root@hostname ~] fdisk -l /dev/sda
GPT PMBR size mismatch (243269631 != 419430399) will be corrected by write.
Disk /dev/sda: 200 GiB, 214748364800 bytes, 419430400 sectors  # /dev/sda 디스크 총 용량이 200GB인데
Disk model: Virtual disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 8DB6ADB3-2548-4F36-9CC3-0149069BAC35

Device       Start       End   Sectors   Size Type             # sda1 ~ 3 용량 모두 합치면 200GB가 안 됨
/dev/sda1     2048   1230847   1228800   600M EFI System
/dev/sda2  1230848   3327999   2097152     1G Linux filesystem
/dev/sda3  3328000 243267583 239939584 114.4G Linux LVM        # 이거 늘릴 거
```

`dnf install cloud-utils-growpart -y` 명령어로 디스크 용량 할당을 간편하게 해주는 growpart 패키지를 설치한 후 `growpart` 명령어로 파티션 용량 확장.

```shell
# /dev/sda3 파티션에 사용 가능한 용량 할당
[root@hostname ~] growpart /dev/sda 3
CHANGED: partition=3 start=3328000 old: size=239939584 end=243267583 new: size=416102367 end=419430366

# 정말 할당됐는지 못 믿겠으면 조회
[root@hostname ~] lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0   200G  0 disk
├─sda1        8:1    0   600M  0 part /boot/efi
├─sda2        8:2    0     1G  0 part /boot
└─sda3        8:3    0 198.4G  0 part           # 114.4G → 198.4G 확장됨
  ├─rl-root 253:0    0 100.4G  0 lvm  /
  └─rl-swap 253:1    0    14G  0 lvm  [SWAP]
```

`pvresize` 명령어로 물리볼륨(PV) 크기 조정 후

```shell
[root@hostname ~] pvresize /dev/sda3
  Physical volume "/dev/sda3" changed
  1 physical volume(s) resized or updated / 0 physical volume(s) not resized
```

`vgdisplay` 명령어로 논리볼륨(LV)에 추가로 할당 가능한 용량 확인

```shell
[root@hostname ~] vgdisplay
  --- Volume group ---
  VG Name               rl  # Volume Group 이름 확인
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  5
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               198.41 GiB
  PE Size               4.00 MiB
  Total PE              50793
  Alloc PE / Size       29288 / <114.41 GiB
  Free  PE / Size       21505 / 84.00 GiB    # 84GB 추가 가능
  VG UUID               CHhQUT-BR0c-Ky4T-Rnjl-9Z6o-OOwP-cpfxKK

```

`lvextend` 명령어로 논리볼륨(LV) 용량을 확장한 후

```shell
# rl 볼륨그룹(VG)의 root 논리볼륨(LV) 용량 확장
[root@hostname ~] lvextend -L +84G /dev/mapper/rl-root
  Size of logical volume rl/root changed from <100.41 GiB (25704 extents) to <184.41 GiB (47208 extents).
  Logical volume rl/root successfully resized.
```

`xfs_growfs` 명령어로 xfs 파일시스템 크기 확장. ext4 파일시스템인 경우 `resize2fs` 명령어 사용.

```shell
# rl 볼륨그룹(VG)의 root 논리볼륨(LV)을 사용하는 xfs 파일시스템 크기 확장
[root@hostname ~] xfs_growfs /dev/mapper/rl-root
meta-data=/dev/mapper/rl-root    isize=512    agcount=4, agsize=6580224 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=26320896, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=16384, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 26320896 to 48340992
```

최종 확인.

```shell
[root@hostname ~] df -h
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             4.0M     0  4.0M   0% /dev
tmpfs                3.8G     0  3.8G   0% /dev/shm
tmpfs                1.5G  9.4M  1.5G   1% /run
/dev/mapper/rl-root  185G  6.7G  178G   4% /  # 잘 늘어났음
/dev/sda2            960M  293M  668M  31% /boot
/dev/sda1            599M  7.0M  592M   2% /boot/efi
tmpfs                768M  132K  768M   1% /run/user/1000

[root@hostname ~] lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0   200G  0 disk
├─sda1        8:1    0   600M  0 part /boot/efi
├─sda2        8:2    0     1G  0 part /boot
└─sda3        8:3    0 198.4G  0 part
  ├─rl-root 253:0    0 184.4G  0 lvm  /  # 잘 늘어남
  └─rl-swap 253:1    0    14G  0 lvm  [SWAP]
```