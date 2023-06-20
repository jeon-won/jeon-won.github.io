---
title: '파일이름 앞에 생성시간을 붙여주는 셸 스크립트'
date: 2023-06-20 23:00:00
category: 'SYSTEMs'
draft: false
---

![토끼 제빵](./images/rabbit_baking.gif)

여러 개의 파일 이름에 생상시간을 자동으로 붙여주는 셸 스크립트입니다.

## 📁 1. 파일 생성일을 파일이름 앞에 붙이는 스크립트

아래의 셸 스크립트가 작성된 파일(.sh)을 만든 후 변경할 파일들이 저장된 디렉터리 경로를 매개변수로 넘겨주면 됩니다. (실행 명령어 예시: script.sh /file/directory/path)

```shell
# 첫 번째 인자로 전달된 경로
directory=$1

# 경로가 존재하는지 확인
if [ ! -d "$directory" ]; then
  echo "경로가 존재하지 않습니다."
  exit 1
fi

# 디렉터리 내 모든 파일 탐색(filepath: 파일 절대경로)
for filepath in "$directory"/*; do
  if [ -f "$filepath" ]; then
    # filedate: '년월일_시분초' 형식의 파일 생성일과 시간
    filedate=$(date -r $(stat -f %B "$filepath") +%Y%m%d_%H%M%S) 
    
    # filename: 디렉터리 경로를 제외한 파일 이름
    filename="$(basename "$filepath")"

    # 파일이름 앞에 파일 생성일과 시간을 붙임
    # mv "$filepath" "$directory"/"$filedate"_"$filename"
    echo "변경 전: "$filepath""
    echo "변경 후: "$directory"/"$filedate"_"$filename""
  fi
done
```

## 🗂️ 2. 메타 데이터의 파일 생성일을 파일이름 앞에 붙이는 스크립트

MacOS에서 mdls 명령어를 사용하면 파일의 메타 데이터를 볼 수 있습니다. 이 중 kMDItemContentCreationDate가 파일 생성일을 담고 있는 메타 데이터입니다. 그런데 이 값은 UTC(GMT+0) 시간대이므로 우리나라에서 사용 중인 GMT+9 시간대로 변환해야 합니다.

```shell
# 첫 번째 인자로 전달된 경로
directory=$1

# 경로가 존재하는지 확인
if [ ! -d "$directory" ]; then
  echo "경로가 존재하지 않습니다."
  exit 1
fi

# 디렉터리 내 모든 파일 탐색(filepath: 파일 절대경로)
for filepath in "$directory"/*; do
  if [ -f "$filepath" ]; then
    # filedate_utc: 파일이 생성된 UTC(GMT+0) 시간
    filedate_utc=$(mdls -name kMDItemContentCreationDate -raw "$filepath")

    # filedate_gmt9: UTC(GMT+0) 시간을 GMT+9 시간대로 변환
    filedate_gmt9=$(TZ=GMT-9 date -jf "%Y-%m-%d %H:%M:%S %z" "$filedate_utc" +"%Y%m%d_%H%M%S")

    # filename: 디렉터리 경로를 제외한 파일 이름
    filename="$(basename "$filepath")"

    # 파일이름 앞에 파일 생성일과 시간을 붙임
    mv "$filepath" "$directory"/"$filedate_gmt9"_"$filename"
    echo "변경 전: "$filepath""
    echo "변경 후: "$directory"/"$filedate_gmt9"_"$filename""
  fi
done
```

파일이름을 파일 생성일로 변경하는 스크립트는 아래와 같습니다.

```shell
# 첫 번째 인자로 전달된 경로
directory=$1

# 경로가 존재하는지 확인
if [ ! -d "$directory" ]; then
  echo "경로가 존재하지 않습니다."
  exit 1
fi

# 디렉터리 내 모든 파일 탐색(filepath: 파일 절대경로)
for filepath in "$directory"/*; do
  if [ -f "$filepath" ]; then
    # filedate_utc: 파일이 생성된 UTC(GMT+0) 시간
    filedate_utc=$(mdls -name kMDItemContentCreationDate -raw "$filepath")

    # filedate_gmt9: UTC(GMT+0) 시간을 GMT+9 시간대로 변환
    filedate_gmt9=$(TZ=GMT-9 date -jf "%Y-%m-%d %H:%M:%S %z" "$filedate_utc" +"%Y%m%d_%H%M%S")

    # extension: 파일 확장자
    extension=$(basename "$filepath" | cut -d. -f2)

    # 파일이름을 파일 생성일로 변경
    mv "$filepath" "$directory"/"$filedate_gmt9"."$extension"
    echo "변경 전: "$filepath""
    echo "변경 후: "$directory"/"$filedate_gmt9"."$extension""
  fi
done
```

## 참고 사이트

* [Add Dates To File Or Photo Names With an Automator Script](https://macmost.com/add-dates-to-file-or-photo-names-with-an-automator-script.html)
* ChatGPT