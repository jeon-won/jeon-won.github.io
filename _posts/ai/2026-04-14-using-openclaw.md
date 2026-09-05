---
title: OpenClaw 사용 방법 간단 정리
description: OpenClaw 사용 방법 간단 정리
date: 2026-04-14 00:00:00 +0900
categories: [ai]
tags: [ai]
published: false
image: 
  path: /assets/img/posts/ai/openclaw.svg
  alt: OpenClaw
---

OpenClaw 사용법을 간단히 정리해본 글.


## 🤔 OpenClaw란?

* 사용자의 명령을 받아 스스로 판단하고 PC에서 도구를 선택해 업무를 완수하는 AI 에이전트
* AI에 명령을 내려 컴퓨터의 파일, 브라우저, 터미널 등을 제어
* 메신저(텔레그램, 디스코드 등)로 명령을 내릴 수도 있음

## 🐳 Docker로 OpenClaw 구축해보기

### 1. Docker 설치

먼저 Docker가 설치되어 있어야 함. 설치 과정은 생략...

### 2. 환경변수 및 docker compose yaml 작성

`.env` 파일 생성

```txt
# OpenClaw 접속 정보
OPENCLAW_GATEWAY_PORT=3000
OPENCLAW_GATEWAY_TOKEN=oPeNcLaWgAtEwAyToKeN
OPENCLAW_GATEWAY_MODE=local
  
# OpenClaw 경로
OPENCLAW_CONFIG_DIR=./config
OPENCLAW_WORKSPACE_DIR=./workspace
```

`docker-compose.yml` 작성

```yaml
services:
  openclaw-gateway:
    image: ghcr.io/openclaw/openclaw:latest
    container_name: openclaw-gateway
    environment:
      - NODE_ENV=production
      - OPENCLAW_GATEWAY_TOKEN=${OPENCLAW_GATEWAY_TOKEN}
      - OPENCLAW_GATEWAY_MODE=${OPENCLAW_GATEWAY_MODE}
      - OPENCLAW_WORKSPACE_DIR=/home/node/workspace
    volumes:
      - ${OPENCLAW_CONFIG_DIR}:/home/node/.openclaw
      - ${OPENCLAW_WORKSPACE_DIR}:/home/node/workspace
    ports:
      - "${OPENCLAW_GATEWAY_PORT}:18789"
    restart: unless-stopped
    command: [
        "node",
        "dist/index.js",
        "gateway",
        "--allow-unconfigured",
        "--bind", "lan",
        "--port", "18789",
        "--token", "${OPENCLAW_GATEWAY_TOKEN}"
      ]
```

`docker compose up -d` 명령어로 OpenClaw 컨테이너 실행 후 `http://localhost:<OPENCLAW_GATEWAY_PORT>` 주소로 접속하여 OpenClaw 화면이 뜨면 정상.

### 3. OpenClaw 초기 설정

`config/workspace/openclaw.json` 파일 내용 중 allowOrigins에 명시된 포트 값을 OPENCLAW_GATEWAY_PORT 값으로 수정

```json
{
  "gateway": {
    "controlUi": {
      "allowedOrigins": [
        "http://localhost:<OPENCLAW_GATEWAY_PORT>",
        "http://127.0.0.1:<OPENCLAW_GATEWAY_PORT>"
      ]
    }
  }
}
```

`docker compose exec openclaw-gateway node dist/index.js onboard` 명령어를 실행하여 초기 설정.

  * Setup mode: 실습할 것이므로 QuickStart 선택
  * Config handling: Update values 선택
  * Model/auth provier: 사용하려는 AI 모델 선택
    - API 키 방식인 경우 API 키 입력
    - OAuth 방식인 경우(예: OpenAI Codex) 출력된 URL 접속 → OpenAI 계정 로그인 및 승인 → 접속오류 발생한 URL(`http://localhost:1455/auth/~~~`)을 Paste the authorization code (or full redirect URL) 부분에 붙여넣기
  * 이후 설정들은 일단 전부 패스. 실습용이므로...

`localhost:3000/?token=<OPENCLAW_GATEWAY_TOKEN>` 주소로 접속이 잘 되는지 확인.

### 4. 디바이스 허용

PC에 OpenClaw를 직접 설치하면 위와 같은 페어링 과정이 필요 없으나, Docker로 OpenClaw를 사용하면 로컬에서 실행된 웹브라우저도 신뢰하지 않으므로 페어링 과정이 필요함.

`docker compose exec openclaw-gateway node dist/index.js devices list` 명령어를 실행하면 OpenClaw 에이전트에 페어링된 디바이스 목록과 상태를 볼 수 있음.

`docker compose exec openclaw-gateway node dist/index.js devices approve <Request값>` 명령어를 실행하면 OpenClaw 에이전트와 디바이스를 페어링 할 수 있음.

Request 값 입력하는 게 귀찮다면 `docker compose exec openclaw-gateway node dist/index.js devices approve --latest` 명령어를 사용할 수 있음.

### 5. workspace 경로 설정

`docker compose down` 명령어로 도커 컨테이너 중단.

`config/workspace/openclaw.json` 파일 내용 중 workspace 속성에 명시된 경로를 `/home/node/workspace`로 설정.

```json
{
  "agents": {
    "defaults": {
      "workspace": "/home/node/workspace",
    }
  }
}
```

이후 workspace 경로에 저장된 파일을 OpenClaw가 접근할 수 있게 됨.


## 업무 원칙 설정하기

workspace 경로에 OpenClaw의 작동 방식을 명시하는 마크다운(AGENTS.md, IDENTITY.md, SOUL.md, USER.md 등) 파일들이 저장되어 있음.

자세한 사항과 작성 방법은 [OpenClaw templates 문서](https://open-claw.bot/docs/ko/cli/reference/templates/agents/) 참고.