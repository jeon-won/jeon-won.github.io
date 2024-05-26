---
title: 파이썬으로 바이낸스 선물 거래하는 코드
description: 파이썬으로 바이낸스 선물 거래하는 코드
date: 2023-07-26 15:20:00
tags:
  - bitcoin
series: 비트코인
previewImage: "bitcoin.jpg"
// isPrivate: true
---

![방향성이 보이지 않는 차트](./images/Chart_NoDirection.jpg)

파이썬의 ccxt 패키지를 사용하여 바이낸스 선물 자동거래를 하기 위한 코드를 정리한 글입니다.

## 🔑 API 발급

https://www.binance.com/en/my/settings/api-management 에서 API를 발급받습니다. Secret Key는 한 번 확인 후 다시는 확인할 수 없으니 꼭 별도로 보관해둡니다. API 접근이 가능한 IP를 추가한 후 `Enable Futures`에 체크하여 설정을 완료합니다.

발급받은 API Key와 Secret Key는 환경변수로 만들어 사용하려 합니다. 파이썬 프로젝트 최상위 경로에 `.env` 파일을 만든 후 키 값을 입력합니다. 이렇게 만든 환경변수는 dotenv 패키지를 사용하여 불러올 수 있습니다.

```txt
BINANCE_API_KEY = bInAnCeApIkEy
BINANCE_SECRET_KEY = bInAnCeSeCrEtKeY
```


## 💡 초기화

```python
from dotenv import load_dotenv
import ccxt
import os
from pprint import pprint

load_dotenv()
BINANCE_API_KEY = os.environ.get("BINANCE_API_KEY")
BINANCE_SECRET_KEY = os.environ.get("BINANCE_SECRET_KEY")
binance = ccxt.binance(config={
    'apiKey': BINANCE_API_KEY, 
    'secret': BINANCE_SECRET_KEY,
    'enableRateLimit': True,
    'options': {
        'defaultType': 'future'
    }
})
```


## 🔍 선물 잔고 조회

```python
# USDT 잔고를 조회하는 코드

balance = binance.fetch_balance(params={
    "type": "future"
})
pprint(balance['USDT'])
```


## 💸 레버리지 설정

```python
# 비트코인 선물거래 레버리지를 5배로 설정하는 코드

symbol = "BTCUSDT"
leverage = 5
resp = binance.fapiprivate_post_leverage({
    'symbol': symbol
    'leverage': leverage
})
pprint(resp)
```


## 📈 롱(공매수) 포지션 잡기

positionSide 파라미터가 없으면 `code 4061: Order's position side does not match user's setting.` 에러가 발생해서 추가했습니다. 

```python
# 롱(공매수) 포지션을 시장가로 잡기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
order = binance.create_market_buy_order(symbol, amount, params={
    'positionSide':"LONG"
})
pprint(order)
```

```python
# 롱(공매수) 포지션을 지정가로 잡기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
price = 10000   # 지정가(USDT)
order = binance.create_limit_buy_order(symbol, amount, price, params={
    'positionSide': 'LONG'
})
pprint(order)
```

```python
# 롱(공매수) 포지션을 시장가로 정리하기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
order = binance.create_market_sell_order(symbol, amount, params={
    'positionSide':"LONG"
})
pprint(order)
```

```python
# 롱(공매수) 포지션을 스탑로스(TP/SL) 설정하여 잡기

orders = [None] * 3
symbol = "BTC/USDT"
type = "LIMIT"          # LIMIT: 지정가 주문 / MARKET: 시장가 주문
amount = 0.001          # 코인 수량
price_position = 10000  # 지정가(USDT). 시장가 주문(MARKET)인 경우 필요 없는 값.
price_tp = 40000        # 수익실현 가격. 현 시가 이상으로 설정해야 함.
price_sl = 5000         # 손절 가격

# 롱(공매수) 포지션 주문
orders[0] = binance.create_order(
    symbol=symbol, 
    type=type,  
    side="buy", 
    amount=amount, 
    price=price_position, 
    params={
        'positionSide': 'LONG'
    }
)

# Take Profit 주문
orders[1] = binance.create_order(
    symbol=symbol,
    type="TAKE_PROFIT_MARKET",
    side="sell",
    amount=amount,
    params={
        'positionSide': 'LONG',
        'stopPrice': price_tp
    }
)

# Stop Loss 주문
orders[2] = binance.create_order(
    symbol=symbol,
    type="STOP_MARKET",
    side="sell",
    amount=amount,
    params={
        'positionSide': 'LONG',
        'stopPrice': price_sl
    }
)

for order in orders:
    pprint(order)
```


## 📉 숏(공매도) 포지션 잡기

```python
# 숏(공매도) 포지션을 시장가로 잡기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
order = binance.create_market_sell_order(symbol, amount, params={
    'positionSide': 'SHORT'
})
pprint(order)
```

```python
# 숏(공매도) 포지션을 지정가로 잡기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
price = 40000   # 지정가(USDT)
order = binance.create_limit_sell_order(symbol, amount, price, params={
    'positionSide': 'SHORT'
})
pprint(order)
```

```python
# 숏(공매도) 포지션을 시장가로 정리하기

symbol = "BTC/USDT"
amount = 0.001  # 코인 수량
order = binance.create_market_buy_order(symbol, amount, params={
    'positionSide': 'SHORT'
})
pprint(order)
```

```python
# 숏(공매도) 포지션을 스탑로스(TP/SL) 설정하여 잡기

orders = [None] * 3
symbol = "BTC/USDT"
type = "LIMIT"          # LIMIT: 지정가 주문 / MARKET: 시장가 주문
amount = 0.001          # 코인 수량
price_position = 40000  # 지정가(USDT). 시장가 주문(MARKET)인 경우 필요 없는 값.
price_tp = 10000        # 수익실현 가격. 현 시가 이상으로 설정해야 함.
price_sl = 50000        # 손절 가격

# 숏(공매도) 포지션 주문
orders[0] = binance.create_order(
    symbol=symbol,
    type="LIMIT",
    side="sell",
    amount=amount,
    price=price_position,
    params={
        'positionSide': 'SHORT'
    }
)

# Take Profit 주문
orders[1] = binance.create_order(
    symbol=symbol,
    type="TAKE_PROFIT_MARKET",
    side="buy",
    amount=amount,
    params={
        'positionSide': 'SHORT',
        'stopPrice': price_tp
    }
)

# Stop Loss 주문
orders[2] = binance.create_order(
    symbol=symbol,
    type="STOP_MARKET",
    side="buy",
    amount=amount,
    params={
        'positionSide': 'SHORT',
        'stopPrice': price_sl
    }
)

for order in orders:
    pprint(order)
```


## 🤔 어떻게 써먹을 것인가

이것이 문제로다...


## ❗ 참고 사이트

https://wikidocs.net/129679