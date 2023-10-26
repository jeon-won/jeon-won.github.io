---
title: '파이썬 Selenium 4 사용법 간단 정리'
date: 2023-10-27 00:00:00
category: 'CODINGs'
draft: false
---

![](./images/WeAreWebBrowser.jpg)

<del>인터넷 익스플로러에서만 작동하는 시스템들 다 걷어내고 싶...</del>

파이썬으로 웹페이지 자동 로그인 코드를 만들다가 정리한 글입니다.


## 🔴 Selenium 4로 크롬 브라우저 제어

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# 상수 
SELENIUM_PROFILE_PATH = r"C:\Users\user\AppData\Local\Google\Chrome\User Data\Selenium Profile"
URL = "https://muyaho.com/login"
ID = "ID"
PW = "P@$$W0RD"
WAIT_TIMEOUT = 60  ## 명시적 대기 시간(초)

# 크롬 옵션 설정
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")                              ## 최대화 모드로 시작
options.add_argument("--disable-blink-features=AutomationControlled")  ## Automation Info Bar 비활성화
options.add_argument(rf"--user-data-dir={SELENIUM_PROFILE_PATH}")      ## 프로필 사용(화면배율 등 설정 유지용)
options.add_argument("--disable-extensions")
options.add_argument("--disable-extensions-file-access-check")
options.add_argument("--disable-extensions-http-throttling")
options.add_argument("--disable-infobars")
options.add_argument("--disable-automation")
options.add_experimental_option("detach", True)                        ## 창을 닫더라도 드라이버 유지
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

# Selenium 초기화
service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# URL 접속
driver.get(URL)

# 로그인 페이지 뜰 때까지 대기
wait_login_page = WebDriverWait(driver, WAIT_TIMEOUT)
element_login_page = wait_login_page.until(EC.presence_of_element_located((By.XPATH, "/HTML")))

# 로그인 페이지 뜨면 아이디, 비밀번호 자동 입력 후 로그인
if(element_login_page):
    driver.find_element(By.XPATH, "//*[@id='username']").send_keys(ID)
    driver.find_element(By.XPATH, "//*[@id='password']").send_keys(PW)
    driver.find_element(By.XPATH, "//*[@id='loginbtn']").click()
```


## 🟢 Selenium 4로 엣지 브라우저 제어

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# 상수 
SELENIUM_PROFILE_PATH = r"C:\Users\user\AppData\Local\Google\Chrome\User Data\Selenium Profile"
URL = "https://muyaho.com/login"
ID = "ID"
PW = "P@$$W0RD"
WAIT_TIMEOUT = 60  ## 명시적 대기 시간(초)

# 엣지 브라우저 옵션 설정
options = webdriver.EdgeOptions()
options.add_argument("--start-maximized")                              ## 최대화 모드로 시작
options.add_argument("--disable-blink-features=AutomationControlled")  ## Automation Info Bar 비활성화
options.add_argument(rf"--user-data-dir={SELENIUM_PROFILE_PATH}")      ## 프로필 사용(화면배율 등 설정 유지용)
options.add_argument("--disable-extensions")
options.add_argument("--disable-extensions-file-access-check")
options.add_argument("--disable-extensions-http-throttling")
options.add_argument("--disable-infobars")
options.add_argument("--disable-automation")
options.add_argument('--ieMode') 
options.add_experimental_option("detach", True)                        ## 창을 닫더라도 드라이버 유지
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

# Selenium 초기화
service = Service(executable_path=EdgeChromiumDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# URL 접속
driver.get(URL)

# 로그인 페이지 뜰 때까지 대기
wait_login_page = WebDriverWait(driver, WAIT_TIMEOUT)
element_login_page = wait_login_page.until(EC.presence_of_element_located((By.XPATH, "/HTML")))

# 로그인 페이지 뜨면 아이디, 비밀번호 자동 입력 후 로그인
if(element_login_page):
    driver.find_element(By.XPATH, "//*[@id='username']").send_keys(ID)
    driver.find_element(By.XPATH, "//*[@id='password']").send_keys(PW)
    driver.find_element(By.XPATH, "//*[@id='loginbtn']").click()
```


## 🔵 Selenium 4로 인터넷 익스플로러 제어

인터넷 익스플로러를 실행하여 제어하는 것이 아닌, 엣지 브라우저의 인터넷 익스플로러(IE) 모드를 사용하여 제어됩니다.

인터넷 익스플로러 보호 모드가 활성화되어 있으면 오류가 발생합니다. 이 오류를 해결하려면 `options.ignore_protected_mode_settings = True` 코드를 작성해주거나, 윈도우 10 제어판 인터넷 속성 → 보안 탭 → 인터넷 항목의 보호 모드 사용 체크를 해제하면 됩니다.

```python
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

EDGE_PATH = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
URL = "https://muyaho.com/login"
ID = "ID"
PW = "P@$$W0RD"
WAIT_TIMEOUT = 60  ## 명시적 대기 시간(초)

# Internet Explorer 옵션 설정
options = webdriver.IeOptions()
options.edge_executable_path = EDGE_PATH
options.attach_to_edge_chrome = True           ## Edge로 리다이렉션 허용
options.ignore_protected_mode_settings = True  ## 보호모드 무시. 이 코드를 넣어주거나, 제어판 인터넷 속성 → 보안 탭 → 인터넷 항목의 보호 모드 사용 체크 해제해야 에러 미발생
options.ignore_zoom_level = True               ## 확대 비율이 100%가 아닌 경우 생기는 IE 종특 문제 예방용?

# Selenium 초기화
driver = webdriver.Ie(options=options)
driver.maximize_window()
driver.get(URL)

# 로그인 페이지 뜰 때까지 대기
wait_login_page = WebDriverWait(driver, WAIT_TIMEOUT)
element_login_page = wait_login_page.until(EC.presence_of_element_located((By.XPATH, "/HTML")))

# 로그인 페이지 뜨면 아이디, 비밀번호 자동 입력 후 로그인
if(element_login_page):
    driver.find_element(By.XPATH, "//*[@id='username']").send_keys(ID)
    driver.find_element(By.XPATH, "//*[@id='password']").send_keys(PW)
    driver.find_element(By.XPATH, "//*[@id='loginbtn']").click()
```

## ❗ 참고 사이트

* [위키독스 3-01. selenium 4](https://wikidocs.net/177133)
* [Selenium - IE specific functionality](https://www.selenium.dev/documentation/webdriver/browsers/internet_explorer)