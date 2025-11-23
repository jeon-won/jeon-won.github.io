---
title: 가상화폐 포지션 진입 예상시점 알리미 만들어 보기
description: 가상화폐 포지션 진입 예상시점 알리미 만들어 보기
date: 2022-09-12 00:00:00 +0900
categories: [cryptocurrency]
tags: [cryptocurrency, bitcoin]
image:
  path: /assets/img/posts/cryptocurrency/ant_buy.jpg
  alt: 지금 사여?!
---

## 🤔 가상화폐 포지션을 자동으로 잡아주는 프로그램은 만들 수 없을까?

주식이나 가상화폐의 대표적인 보조지표로 거래량, RSI 및 볼린저밴드 등이 있습니다. 흔히 보조지표를 사용하여 가상화폐 포지션을 잡는 시점을 알아내곤 합니다. 그렇다면 보조지표가 과매수/과매도 상태임을 가리키는 순간 자동으로 가상화폐 포지션을 잡아주는 프로그램을 만들어보면 어떨까 싶지만...

> 거래량은 무엇보다 가장 중요한 보조지표입니다. 평균 거래량보다 3배 이상 터졌을 때 포지션을 자동으로 잡는다고 가정해봅시다. 이 경우 거래량이 그보다 훨씬 더 터지면서 패닉셀/패닉바잉이 발생하면 큰 손해를 볼 수 있습니다.

> 흔히 RSI 값이 30 이하면 과매도, 70 이상이면 과매수 상태로 봅니다. 추세가 전환될 것을 예상하고 RSI 30 이하일 때 롱 포지션, 70 이상일 때 숏 포지션을 자동으로 잡는다고 가정해봅시다. 
>
>이 경우 롱 포지션을 자동으로 잡았는데 RSI 값이 한자리 수까지 떨어지거나, 숏 포지션을 자동으로 잡았는데 RSI 값이 90이 넘게 치솟으면 막대한 손해를 볼 수 있습니다.

> 볼린저 밴드에서 사용하는 %B 값이 0 이하면 과매도, 1 이상이면 과매수 상태로 봅니다. 추세가 전환될 것을 예상하고 %B 값이 1을 상향돌파하는 순간 숏 포지션, 0을 하향돌파하는 순간 롱 포지션을 잡는다고 가정하더라도 위의 RSI 사례와 비슷하게 손해를 볼 수 있습니다.

![](/assets/img/posts/cryptocurrency/badak_of_badak.jpg)

피보나치나 지지저항선 등을 자동으로 계산해주는 프로그램을 만들어보면 어떨까 싶기도 하지만... 이것들도 맹신하면 큰 손실이 발생하며 물릴 수 있으므로 포지션을 자동으로 잡아주는 프로그램을 만드는 건 매우 힘들어보입니다.

따라서 가상화폐 보조지표가 과매수/과매도임을 가리키는 순간 프로그램을 통해 알림을 받고, 이후 포지션 진입 각(?)을 직접 재는 게 가장 좋은 방법인 것 같습니다. 

## ₿ 보조지표 값 계산하기

여기서는 거의 대부분의 가상화폐 거래소 API를 쉽게 사용하도록 도와주는 ccxt 파이썬 라이브러리를 사용하여 보조지표가 과매수/과매도 상태를 가리키는 시점을 계산하는 파이썬 코드를 만들어보겠습니다. 사용하는 가상화폐 거래소는 바이낸스입니다.

### CCXT로 OHLCV 값 얻어오기

OHLCV는 시가(Open), 고가(High), 저가(Low), 종가/현재가(Close), 거래량(Volume) 입니다. ccxt의 fetch_ohlcv() 함수를 사용하여 OHLCV 리스트 데이터를 얻어올 수 있습니다.

```python
import ccxt

binance = ccxt.binance()

# BTC/USDT 5분봉 최근 5개 캔들 데이터 얻어온 후 출력
ohlcvs = binance.fetch_ohlcv("BTC/USDT", "5m", limit=5)
print(ohlcvs)
```

위 코드를 실행하면 비트코인 5분봉 최근 5개 캔들 데이터에 대한 유닉스시간, 시가(Open), 고가(High), 저가(Low), 종가(Close) 및 거래량(Volume) 데이터가 출력됩니다.

```shell
# python3 test.py
[
[1662905100000, 21548.66, 21556.61, 21534.59, 21553.03, 799.58521], 
[1662905400000, 21552.34, 21568.18, 21545.44, 21561.77, 753.83204], 
[1662905700000, 21562.41, 21567.64, 21480.74, 21500.55, 1210.14678], 
[1662906000000, 21501.21, 21522.06, 21467.53, 21484.46, 1264.75615], 
[1662906300000, 21484.25, 21515.24, 21455.0, 21487.38, 1844.99901]
]
```

### 평균 거래량 계산하기

거래량을 모아 평균을 내주면 됩니다. 현재 거래량이 평균 거래량보다 몇 배 이상 차이날 때 포지션 진입 준비를 해볼 수 있습니다.

```python
import ccxt
import numpy as np

def get_ccxt_volume_mean(ohlcv_list: list):
    # 거래량을 모아놓은 numpy 배열 생성
    volume_array = []
    for ohlcv in ohlcv_list:
        volume_array.append(ohlcv[5])
    volume_np_array = np.array(volume_array)

    # 거래량 평균 반환
    return volume_np_array.mean()

binance = ccxt.binance()

# 5분봉 최근 캔들 70개에 대한 평균 거래량 계산 후 출력
ohlcvs = binance.fetch_ohlcv("BTC/USDT", "5m", limit=70)
volume_mean = get_ccxt_volume_mean(ohlcvs)
print(volume_mean)
```

거래량 평균을 계산하는 함수는 OHLCV 리스트 데이터를 매개변수로 받는 방식으로 작동합니다. 함수 안에서 OHLCV 리스트 데이터를 직접 가져오게끔 만들어도 되지만, 이렇게 하면 하나의 프로그램에서 함수를 여러 번 호출할 때 OHLCV 리스트를 여러 번 가져오게 되므로 효율이 떨어지고 작동 속도도 느려집니다. 

아래에서 설명할 함수들도 위와 같은 방식으로 작동합니다.

### 볼린저 밴드 계산하기

볼린저 밴드에 사용하는 값은 중심선, 상한선, 하한선 및 %B 입니다. 계산식은 다음과 같습니다.
* 중심선: 캔들 20개의 종가에 대한 이동평균
* 상한선: 중심선 + (캔들 20개에 대한 표준편차) * 2
* 하한선: 중심선 - (캔들 20개에 대한 표준편차) * 2
* %B: (현재가 - 하한선) / (상한선 - 하한선)

현재 %B 값이 1 이상이면 숏 포지션, 0 이하면 롱 포지션 진입 준비를 해볼 수 있습니다.

```python
import ccxt
import numpy as np

def get_ccxt_bb(ticker: str, ohlcv_list: list, multiplier: int = 2):
    # 종가를 모아놓은 numpy 배열 생성
    close_array = []
    for ohlcv in ohlcv_list:
        close_array.append(ohlcv[4])
    close_np_array = np.array(close_array)

    # 볼린저 밴드에 사용되는 값들 계산
    current_price = ohlcv_list[len(ohlcv_list)-1][4]  # 현재가
    std = close_np_array.std()                        # 종가 기준 표준편차
    mbb = close_np_array.mean()                       # 볼린저 밴드 중심선(이동평균)
    ubb = mbb + std * multiplier                      # 상한선 = 중심선 + 기간 내 표준편차 * 승수
    lbb = mbb - std * multiplier                      # 하한선 = 중신선 + 기간 내 표준편차 * 승수
    per_b = (current_price - lbb) / (ubb - lbb)       # %b = (현재가 - 하한선) / (상한선 - 하한선)

    # 볼린저 밴드에 사용되는 값들을 딕셔너리 형태로 생성 후 반환
    dict_bb = {}
    dict_bb["ticker"] = ticker
    dict_bb["mbb"] = mbb
    dict_bb["ubb"] = ubb
    dict_bb["lbb"] = lbb
    dict_bb["current_price"] = current_price
    dict_bb["per_b"] = per_b
    
    return dict_bb

binance = ccxt.binance()

# 현재 5분봉 볼린저 밴드 정보를 얻어온 후 %B 값 출력
ohlcvs = binance.fetch_ohlcv("BTC/USDT", "5m", limit=20)
bb = get_ccxt_bb("BTC/USDT", ohlcvs)
per_b = bb["per_b"]
print(per_b)
```

### RSI 계산하기

RSI를 계산하는 코드는 [[python] ccxt 사용하여 binance 비트코인 rsi 구하기](https://codereader37.tistory.com/173) 글을 주로 참고했습니다.

현재 RSI 값이 70 이상이면 숏 포지션, 30 이하면 롱 포지션 진입 준비를 해볼 수 있습니다.

```python
import ccxt
import pandas as pd

def get_ccxt_rsi(ohlcv_list: list):
    df = pd.DataFrame(ohlcv_list)
    rsi = rsi_calc(df, 14).iloc[-1]
    return rsi

def rsi_calc(ohlc: pd.DataFrame, period: int = 14):
    ohlc = ohlc[4].astype(float)
    delta = ohlc.diff()
    gains, declines = delta.copy(), delta.copy()
    gains[gains < 0] = 0
    declines[declines > 0] = 0

    _gain = gains.ewm(com=(period-1), min_periods=period).mean()
    _loss = declines.abs().ewm(com=(period-1), min_periods=period).mean()

    RS = _gain / _loss

    return pd.Series(100-(100/(1+RS)), name="RSI")

binance = ccxt.binance()

# 현재 5분봉 RSI 값을 얻어온 후 출력
ohlcvs = binance.fetch_ohlcv("BTC/USDT", "5m", limit=200)
rsi = get_ccxt_rsi(ohlcvs)
print(rsi)
```

### 캔들크기 계산하기

캔들크기는 보조지표는 아니지만 현재 캔들크기가 평균 캔들크기와 몇 배 이상 차이가 날 때 포지션을 잡는 전략을 세워볼 수 있습니다.

```python
import ccxt
import numpy as np

def get_ccxt_candle_len_mean(ohlcv_list: list):
    # 시가-종가 차이 값을 모아놓은 numpy 배열 생성
    len_array = []
    for ohlcv in ohlcv_list:
        len_array.append(abs(ohlcv[1] - ohlcv[4]))
    len_np_array = np.array(len_array)

    # 고가-저가 차이 평균값 반환
    return len_np_array.mean()

binance = ccxt.binance()

# 현재 5분봉 최근 캔들 70개에 대한 평균 캔들크기 계산 후 출력
ohlcvs = binance.fetch_ohlcv("BTC/USDT", "5m", limit=70)
candle_len_mean = get_ccxt_candle_len_mean(ohlcvs)
print(candle_len_mean)
```

## 🚨 알림 보내기

보조지표가 과매수/과매도 상태를 가리키는 시점을 계산한 후 알림까지 보내는 전체적인 코드는 [https://github.com/jeon-won/crypto-bot-python-v2](https://github.com/jeon-won/crypto-bot-python-v2) 에서 볼 수 있습니다.

### 알림 사운드 재생

playsound 패키지를 사용합니다.

```python
from playsound import playsound

# 대충 과매수/과매도 상태를 체크하는 보조지표 계산 코드
# ...
IS_ALARM_SOUND = True

# 알림 조건에 부합하면 alarm.mp3 파일 재생
if(IS_ALARM_SOUND):
    playsound("alarm.mp3")
```

### 텔레그램 알림 메시지 전송

텔레그램 봇 토큰과 아이디를 발급받은 후 telegram 패키지를 사용합니다.

```python
import telegram

TELEGRAM_TOKEN = "tElEgRaMtOkEn"  # 텔레그렘 봇 토큰
TELEGRAM_CHAT_ID = 000000000      # 텔레그램 봇 아이디

bot = telegram.Bot(TELEGRAM_TOKEN)

# 대충 과매수/과매도 상태를 체크하는 보조지표 계산 코드
# ...
IS_ALARM_TELEGRAM = True

# 알림 조건에 부합하면 텔레그램 메시지 전송
if(IS_ALARM_TELEGRAM):
    message = f"비트코인 과매수/과매도 알림"
    bot.sendMessage(TELEGRAM_CHAT_ID, text=message)
```


## 📈 포지션은 언제 어떻게 잡나

알림을 받았으면 차트를 분석한 후 포지션을 잡습니다. 단타만 하는 저는 아래 유튜버의 도움을 크게 받고 있습니다.
* [나씨TV - 비트코인 단타의 모든것](https://www.youtube.com/c/ocllos)
* [머프TV - 코인단타 교과서](https://www.youtube.com/c/MoneyPrinter)
* ~~[초강력 보조지표 호두형](https://www.youtube.com/channel/UC9KQaCA_EMobJUxZszQ4wlg)~~