---
title: 파이썬으로 OKX 거래소 선물 거래하는 코드
description: 파이썬으로 OKX 거래소 선물 거래하는 코드
date: 2024-06-01 15:23:00 +0900
categories: [cryptocurrency]
tags: [cryptocurrency, bitcoin]
---

![](/assets/img/posts/cryptocurrency/chart-addict.jpeg)

**(주의!) 아래 코드는 사전에 충분히 검증한 후 활용해야 합니다.**

파이썬의 ccxt 패키지를 사용하여 OKX 거래소 선물 자동거래를 하기 위한 코드를 정리한 글입니다.


## 🔑 API 발급

https://www.okx.com/account/my-api 에서 API를 발급받습니다. Secret Key는 한 번 확인 후 다시는 확인할 수 없으니 꼭 별도로 보관해둡니다. Permission에 Trade를 추가하고, Passphrase에 비밀번호를 입력합니다.

발급받은 API Key와 Secret Key 및 Passphrase는 환경변수로 만들어 사용하려 합니다. 파이썬 프로젝트 최상위 경로에 `.env` 파일을 만든 후 키 값을 입력합니다. 이렇게 만든 환경변수는 python-dotenv 패키지를 사용하여 불러올 수 있습니다.

```python
OKX_API_KEY = "oKxApIkEy"
OKX_API_SECRET_KEY = "oKxApIsEcReTkEy"
OKX_API_PASSPHRASE = "oKxApIpAsSpHrAsE"
```


## 🧹 초기화

```python
import ccxt;
import os;
from dotenv import load_dotenv

# 환경
load_dotenv()
OKX_API_KEY = os.environ.get("OKX_API_KEY")
OKX_API_SECRET_KEY = os.environ.get("OKX_API_SECRET_KEY")
OKX_API_PASSPHRASE = os.environ.get("OKX_API_PASSPHRASE")

okx = ccxt.okx({
    'apiKey': OKX_API_KEY,
    'secret': OKX_API_SECRET_KEY,
    'password': OKX_API_PASSPHRASE,
    'enableRateLimit': True,
})
```


## 🔍 선물 잔고 조회

```python
balance = okx.fetch_balance()
print(balance['USDT'])
```


## 💸 레버리지 설정

```python
# 교차(cross) 레버리지 설정
okx.set_margin_mode('cross', 'BTC-USDT-SWAP', params={
    'lever': 10,
})

# 격리(isolated) 레버리지 설정
okx.set_margin_mode('isolated', 'BTC-USDT-SWAP', params={
    'lever': 10,
})
```


## ☑️ 시장가 체결

```python
symbol = 'BTC-USDT-SWAP'  # OKX BTCUSDT Perpetual
trade_mode = 'cross'      # 교차(cross) 모드
order_type = 'market'     # market: 시장가 체결
order_side = 'buy'        # buy: 공매수(Long) 포지션
amount = 0.1              # 0.1이 최소 주문 수량(2024. 5월 기준 0.1 입력 시 0.001 BTC 물량이 체결됨)
price = None              # 시장가 체결이므로...
sl_price = 10000          # Stop Loss(손절) 가격
tp_price = 100000         # Take Profit(수익실현) 가격
params={
    'tdMode': trade_mode,
    'stopLoss': {    
        'type': 'market',         # triggerPrice 도달 시 시장가로 손절
        'triggerPrice': sl_price  # Stop Loss(손절) 가격
    },
    'takeProfit': {
        'type': 'market',         # triggerPrice 도달 시 시장가로 수익실현
        'triggerPrice': tp_price  # Take Profit(수익실현) 가격
    }
}

order = okx.create_order(symbol, order_type, order_side, amount, price=None, params=params)
print(order)
```


## ✅ 지정가 체결

```python
symbol = 'BTC-USDT-SWAP'  # OKX BTCUSDT Perpetual
trade_mode = 'isolated'   # 격리(isolated) 모드
order_type = 'limit'      # limit: 지정가 체결
order_side = 'sell'       # sell: 공매도(Short) 포지션
amount = 0.1              # 0.1이 최소 주문 수량(2024. 5월 기준 0.1 입력 시 0.001 BTC 물량이 체결됨)
price = 50000             # 체결 가격
sl_price = 100000         # Stop Loss(손절) 가격
tp_price = 10000          # Take Profit(수익실현) 가격
params={
    'tdMode': trade_mode,
    'stopLoss': {    
        'type': 'market',         # triggerPrice 도달 시 시장가로 손절
        'triggerPrice': sl_price  # Stop Loss(손절) 가격
    },
    'takeProfit': {
        'type': 'market',         # triggerPrice 도달 시 시장가로 수익실현
        'triggerPrice': tp_price  # Take Profit(수익실현) 가격
    }
}

order = okx.create_order(symbol, order_type, order_side, amount, price, params=params)
print(order)
```


## ❗ 참고 사이트

[ccxt - StopLoss And TakeProfit Orders Attached To A Position](https://github.com/ccxt/ccxt/wiki/Manual#stoploss-and-takeprofit-orders-attached-to-a-position)