---
title: '트레이딩뷰 파인 스크립트 간단 정리'
date: 2024-02-19 00:30:00
category: 'COINs'
draft: false
---

![Pine script](./images/pine-script.webp)

아래 사이트 보고 배운 파인 스크립트 정리 글(정리 중...)

https://wikidocs.net/book/8535
https://wikidocs.net/book/9388

- [🤔 파인 스크립트란?](#-파인-스크립트란)
- [🥡 변수](#-변수)
  - [기본 변수](#기본-변수)
  - [내장 변수](#내장-변수)
  - [날짜와 시간](#날짜와-시간)
  - [네임스페이스](#네임스페이스)
- [📊 자료 구조](#-자료-구조)
  - [시리즈(Series)](#시리즈series)
  - [배열(Array)](#배열array)
- [❓ 조건문](#-조건문)
- [🔁 반복문](#-반복문)
- [🏹 함수](#-함수)
  - [주요 내장 함수](#주요-내장-함수)
- [🎯 전략](#-전략)


## 🤔 파인 스크립트란?

파인 스크립트(Pine Script)는 트레이딩뷰에 사이트나 앱 내에서 사용하는 프로그래밍 언어. 주식, 코인 차트 등에 사용하는 지표나 전략을 개발하기 위해 사용함.

또한 여러 가지 보조지표 조건에 부합하는 알림 등을 설정하려면 파인 스크립트를 사용해야 함. 예를 들어 RSI 과매도인 경우와 거래량이 평균 대비 터진 경우 전자와 후자 각각에 대해 알림을 설정할 순 있지만, 두 조건 모두 만족할 때 알림을 보내도록 설정할 수 없음. 이 때 파인 스크립트를 사용해야 함.

파인 스크립트는 차트의 각 바(타임 프레임에서 한 개의 데이터. 막대 또는 캔들이라고 불러도 될 듯)마다 실행됨.

```js
//@version=5
indicator("My script")

hline(50000) // 50000 값으로 가로선 그리기
```


## 🥡 변수

### 기본 변수

파인 스크립트의 기본 데이터 타입은 정수, 실수, 문자열임.

* 정수(int): -3, -2, -1, 0, 1, 2, 3, ...
* 실수(float): 0.02, 0.03, 3.14, ...
* 문자열(string): 'pine', "script", ...

변수 선언 시 변수명 앞에 데이터 타입을 명시하지 않고 그냥 선언하면 됨. var나 varip 키워드를 사용할 수 있는데 차이점은 다음과 같음. **(사실 뭔 차인지 잘 이해가 안 됨 😵‍💫)**

* 키워드 미사용: 변수가 각 바에서 초기화되고, 이전 바의 값이 유지되지 않음
* var: 첫번째 바에서만 초기화되고, 그 후 각 바에서 변수의 값은 이전 바의 값에 따라 업데이트됨
* varip: var와 유사하지만, 변수는 이전 바의 값과 함께 초기화됨. 이를 통해 이전 바에서의 값이 계산에 사용됨.

```js
num1 = 1
```

이미 선언된 변수 값을 변경하려면 `:=` 기호를 사용해야 함.

```js
num1 = 1
num1 := 2
```

사칙연산은 일반 프로그래밍 언어와 비슷함.

```js
//@version=5
indicator("비트코인 원화 기준 가격")

btc_usdt = 50000
usd_krw = 1350
btc_krw = btc_usdt * usd_krw // 사칙연산(+, -, *, /) 가능
hline(total)
```

파인 스크립트에서 차트에 문자열을 출력하려면 `plotshape()` 함수를 사용하여 차트에 출력하거나

```js
//@version=5
indicator("문자열 차트에 출력하기")

lang_a = "Pine"
lang_b = "Script"
lang = lang_a + " " + lang_b // 문자열 결합도 + 연산자 사용
plotshape(barstate.islast, text=lang) // 현재 바의 마지막인지에 대한 데이터
```

log 네임스페이스의 info, warning, error 함수를 사용하여 파인 로그 화면에 출력하면 됨.

```js
//@version=5
indicator("로그 출력하기")

text = "Pine Script"
log.info("{0}", text)
```

### 내장 변수

내장 변수는 파인 스크립트가 기본적으로 제공하는 변수.

* open: 현재 바의 시가
* high: 현재 바의 고가
* low: 현재 바의 저가
* close: 현재 바의 종가
* volume: 현재 바의 거래량

bar_index 내장 변수는 차트의 각 캔들에 대한 인덱스임. 첫 번째 캔들의 bar_index 값은 0이고 각 캔들마다 값이 1씩 증가함. 가장 최근 캔들의 bar_index 값은 최대값임.

### 날짜와 시간

날짜와 시간을 사용하려면 timestamp를 사용하면 됨.

```js
//@version=5
indicator("My script")

current_time = timestamp("UTC+9", year, month, dayofmonth, hour, minute, second) // 현재 시간
start_time = timestamp("UTC+9", 2024, 2, 18, 13, 0, 0)
end_time = timestamp("UTC+9", 2024, 2, 18, 14, 0, 0)
time_window = (time >= start_time and time < end_time) ? 1 : 0

plot(time_window)
```

### 네임스페이스

네임스페이스는 비슷한 성격의 변수나 함수를 모아놓은 것.

```js
color.red         // color 네임스페이스의 red 변수
ta.rsi(close, 14) // ta 네임스페이스의 rsi 함수
```

주요 네임스페이스는 다음과 같음.

* color: red, green, blue 등
* currency: KRW, JPY, USD 등
* ta: sma(), rsi(), macd() 등
* math: abs(), log(), max() 등

## 📊 자료 구조

### 시리즈(Series)

Series는 비슷한 성격의 여러 데이터(타임 프레임)을 모아놓은 자료구조. open, high, low, close, volume 등과 같은 내장 변수가 Series 타입임.

Series 간 사칙연산이 가능하며, 사칙연산 시 모든 타임 프레임 값이 계산됨.

```js
//@version=5
indicator("캔들 몸통 크기 계산하기")

candle_body = math.abs(open-close)
plot(candle_body)
```

Series의 특정 위치 값을 찾으려면 인덱스를 사용하면 됨. 예를 들어 `close[0]`은 현재 종가, `close[1]`은 현재 바로 직전의 종가임.

```js
//@version=5
indicator("3일 이동평균선")

my_ma3 = (close[2]+close[1]+close[0]) / 3 // ta.sma(close, 3)와 같음
plot(my_ma3)
```

### 배열(Array)

배열은 동일한 타입의 여러 데이터를 저장할 수 있는 자료구조.

```js
//@version=5
indicator("배열 실습")

a = array.new_int(3)  // 크기가 3인 int 타입 배열  생성
array.set(a, 0, 1)    // 배열 a의 0번째 인덱스에 1 저장
array.set(a, 1, 2)    // 배열 a의 1번째 인덱스에 2 저장
val = array.get(a, 0) // 배열 a의 0번째 인덱스 값 꺼내오기
```

Array 관련 함수는 다음과 같음.

* array.push(name, value): array의 마지막에 값 추가
* array.pop(name): array의 마지막 부분의 원소 제거
* array.unshift(name, value): array의 시작에 값 추가
* array.shift(name): array의 시작 부분의 원소 제거
* array.insert(name, index, value): array의 특정 위치에 값 추가
* array.remove(name, index): array의 특정 위치의 원소 제거
* array.clear(name): array의 모든 원소 제거


## ❓ 조건문

조건문은 `if, else if, else` 키워드를 사용함.

```js
//@version=5
indicator("조건문 실습")

my_color = color(na)
if close < 50000
    my_color := color.red
else if color < 51000
    my_color := color.green
else
    my_color := color.blue
plot(close, color=my_color)
```

삼항 연산자는 if ~ else 조건문을 한 줄로 작성할 때 사용함. `조건문 ? 조건이 참일 때 실행할 코드 : 조건이 거짓일 때 실행할 코드` 형태로 사용하면 됨.

```js
//@version=5

indicator("삼항 연산자 실습")
my_color = (close > 50000) ? color.green : color.red
plot(close, color=my_color)
```

논리 연산자는 여러 조건들을 묶을 때 사용함. `and`, `or` 또는 `not`을 사용함

```js
//@version=5
indicator("도지 캔들 판별")

dogi_up = (open > close) and (open < close * 1.005)
dogi_down = (open < close) and (open > close * 1.005)
dogi = dogi_up or dogi_down
plotshape(dogi, color=color.blue, style=shape.circle, location = location.abovebar)
```

```js
//@version=5
indicator("인걸핑 패턴 판별", overlay = true)

// 베어리시 인걸핑(현재 음봉의 몸통이 직전 양봉의 몸통보다 큰 패턴)
bear_engulfing1 = (close[1] > open[1]) and (close < open)
bear_engulfing2 = (open > close[1]) and (close < open[1])
bear_engulfing = bear_engulfing1 and bear_engulfing2
plotshape(bear_engulfing, text="bear engulfing")

// 불리시 인걸핑(현재 양봉의 몸통이 직전 음봉의 몸통보다 큰 패턴)
bullish1 = (close[1] < open[1]) and (close > open)  // 전봉 음봉, 현재봉 양봉
bullish2 = (open < close[1]) and (close > open[1])  // 몸통 비교
bullish_engulfing = bullish1 and bullish2

plotshape(bullish_engulfing, text="bullish engulfing")
```


## 🔁 반복문

파인 스크립트도 다른 프로그래밍 언어와 똑같이 for 또는 while 키워드로 반복문을 사용함. 하지만 반복문을 사용할 일이 많지 않음. Series 자료구조를 사용하면 각 캔들 데이터에 대한 반복 처리를 알아서 해주기 때문.

```js
//@version=5
indicator("반복문")

diff = high - low // 각 시간대별 캔들 데이터 처리를 알아서 반복 처리해줌
plot(diff)
```

for 문은 `for offset=시작인덱스 to 끝인덱스`로 사용함

```js
//@version=5
indicator("3일 이동평균선을 for 문으로 만들어보기")

PERIOD = 3
sum_close = 0.0

for offset=0 to PERIOD-1
    sum_close := sum_close + close[offset]

my_ma3 = sum_close / PERIOD
plot(my_ma3)
```

while 문은 while 키워드 뒤에 반복 실행할 조건을 명시해주면 됨.

```js
//@version=5
indicator("3일 이동평균선을 while 문으로 만들어보기")

PERIOD = 3
sum_close = 0.0
offset = 0

while offset < PERIOD
    sum_close := sum_close + close[offset]
    offset := offset + 1

my_ma3 = sum_close / PERIOD
plot(my_ma3)
```


## 🏹 함수

함수를 호출하는 건 다른 프로그래밍 언어와 큰 차이가 없음. 함수를 사용할 때 Ctrl + Space 키를 누르면 도움말을 볼 수 있음.

```js
//@version=5
indicator("함수 호출")

rsi = ta.rsi(close, 14)
plot(rsi)
```

함수 만드는 건 자바스크립트의 화살표 함수 만들듯이 하면 되는 듯.

```js
//@version=5
indicator("매개변수 받지 않는 함수 만들기", overlay = false)

sma3() =>
    temp = close[2] + close[1] + close[0]
    temp / 3

my_sma3 = sma3()
plot(my_sma3)
```

```js
//@version=5
indicator("매개변수 받는 함수 만들기", overlay = false)

sma3(a, b, c) =>
    temp = a + b + c
    temp / 3

my_sma3 = sma3(100, 200, 300)
hline(my_sma3)
```

### 주요 내장 함수

`hline()` 함수는 고정된 가격을 사용하여 가로선을 그림.

```js
hline(price=52000, title="가로선임", color=color.blue, linestyle=hline.style_solid, linewidth=2)
```

`fill()` 함수는 두 개의 hline이나 plot 사이를 색으로 채우는 함수.

```js
//@version=5
indicator("RSI 30~70 사이 색칠하기")

// RSI 그래프
rsi = ta.rsi(close, 14)
plot(rsi)

// RSI 과매도, 과매수 표시
h1 = hline(70)
h2 = hline(30)
fill(h1, h2, color=color.new(color.gray, 90)) // 투명도 90
```

`plot()` 함수는 Series 데이터를 차트로 그리는 함수.

```js
plot(series=차트로_그릴_데이터, color=색상, linewidth=라인_너비, style=플롯_스타일, offset=플롯을_왼쪽_또는_오른쪽으로_지정된_수_만큼_이동_후_그릴_때_사용)
```

`plotshape()` 함수는 Series bool 타입의 데이터를 차트에 표시하는 함수. 간단한 문자열을 표시할 때도 사용함.

```js
data = close >= open
plotshape(data, style=shape.xcross)             // 양봉에 X 표시
plotshape(barstate.islast, text="Hello World!") // 맨 마지막 봉에 Hello World! 표시
```

`plotchar()` 함수는 한 글자의 문자를 표시하는 함수.

```js
data = close >= open
plotchar(data, char="U", location=location.abovebar)
```

`ta.crossover(ma1, ma2)` 함수는 ma1 이동평균선이 ma2 이동평균선을 상향 돌파 시 true를 반환하는 함수. ta.crossunder(ma1, ma2)` 함수는 이와 반대로 하향 돌파 시 true를 반환하는 함수.

```js
//@version=5
indicator("My script", overlay = true)

sma5 = ta.sma(close, 5)
sma20 = ta.sma(close, 20)
plot(sma5, color = color.red)
plot(sma20, color = color.blue)

crossover = ta.crossover(sma5, sma20)
crossunder = ta.crossunder(sma5, sma20)
plotshape(crossover, style=shape.circle, location=location.abovebar)
plotshape(crossunder, style=shape.circle, location=location.abovebar)
```

`request.security()` 함수는 다른 타임프레임의 데이터에 접근하는 함수.

```js
request.security(symbol, timeframe, expression, gaps, lookahead, ignore_invalid_symbol, currency) → series <type>
```

> * **symbol:** 데이터를 요청할 자산의 심볼 또는 티커입니다 (예: "AAPL"). 차트의 심볼에서 데이터를 요청하려면 syminfo.tickerid를 사용하십시오.
> * **timeframe:** 데이터를 요청할 타임프레임입니다 (예: "D"는 일일, "W"는 주간, "240"은 4시간 등). 차트의 타임프레임을 사용하려면 빈 문자열이나 timeframe.period 변수를 사용하세요.
> * **expression:** 요청된 데이터를 사용하여 수행할 표현식 또는 계산입니다 (예: close, ta.sma(close, 50) 등).
> * **gaps:** 반환된 값이 차트 막대에서 병합되는 방식을 지정합니다. barmerge.gaps_on을 사용하면 함수의 컨텍스트에서 처음 사용할 수 있을 때만 현재 차트 표시줄에 값이 나타납니다. 그렇지 않으면 na가 반환됩니다>(따라서 "갭"이 발생함). 디폴트 값인 barmerge.gaps_off를 사용하면 na 값을 피하면서, 반환된 최신 알려진 값으로 간격이 채워집니다.
> * **lookahead:** barmerge.lookahead_on으로 설정을 하면 히스토리 바에서만 타임프레임 내부 데이터를 리턴합니다. 파인 스크립트 버전 3 부터 디폴트는 barmerge.lookahead_off 입니다.
> * **ignore_invalid_symbol:** 지정된 심볼을 찾을 수 없는 경우 함수의 동작을 결정합니다.
> * **currency:** 통화 단위 (open, high, low, close 등)입니다. 
>

```js
//@version=5
indicator("비트코인 원화 가격 계산", overlay=false)

binance_btc = request.security("BINANCE:BTCUSDT", "", close)
usd_krw = request.security("FX_IDC:USDKRW", "", close)
plot(binance_btc * usd_krw)
```

`input()` 함수는 값을 입력받을 때 사용. 예를 들어 이동평균 계산에 사용하는 데이터의 길이를 변경할 때 input 함수를 사용함.

```js
//@version=5
indicator("My script", overlay = false)

data_len = input(defval=20, title="데이터 길이")        // title 값은 지표 설정 메뉴에 나타나는 제목임
// data_len = input.int(defval=20, title="데이터 길이") // 사실 input.int() 함수를 사용하는 것인 듯
sma = ta.sma(close, length=data_len)                 // input 함수로 입력받은 값을 매개변수로 전달
plot(sma)
```

문자열을 입력받으려면 `input.string()` 함수를 사용해야 함.

```js
//@version=5
indicator("My script")

type = input.string(defval="SMA", title="Type", options=['SMA', 'EMA'])

ma = 0.0
if type == "SMA"
    ma := ta.sma(close, 20)
else
    ma := ta.ema(close, 20)

plot(close)
```

테이블에 문자열 출력은 다음과 같이...

```js
//@version=5
indicator("My script", overlay = true)

print(txt) => 
    var table table_id = table.new(position.top_right, 1, 1) // 1행 1열의 테이블 생성
    table.cell(table_id, 0, 0, txt, bgcolor=color.yellow)    // 테이블 행열 인덱스는 0부터 시작함

print(syminfo.tickerid)
```


## 🎯 전략

전략을 사용하면 파인 스크립트로 만든 자동매매 전략을 테스트해볼 수 있음.

```js
//@version=5
strategy("정배열, 역배열 자동매매 전략", overlay = false)

sma5 = ta.sma(close, 5)
sma20 = ta.sma(close, 20)

entry_point = ta.crossover(sma5, sma20)  // 골든 크로스(정배열)
exit_point = ta.crossunder(sma5, sma20)  // 데드 크로스(역배열)

if entry_point                           // 골든 크로스가 되면
    strategy.entry("buy", strategy.long) // 롱 포지션 진입
if exit_point                            // 데드 크로스가 되면
    strategy.close("buy")                // 롱 포지션 정리

plot(strategy.position_size)
```

포지션 종료 시 `strategy.exit()` 함수를 사용한다는데, 어떻게 쓰는 건지 잘...

```js
strategy.exit(id="exit", from_entry="long", profit=10, loss=5)
```

> * **profit:** 지정한 이익금액 도달 시 수익 실현
> * **limit:** 지정가로 포지션 종료
> * **loss:** 지정한 손실금액 도달 시 손절
> * **stop:** 지정가로 포지션 종료

