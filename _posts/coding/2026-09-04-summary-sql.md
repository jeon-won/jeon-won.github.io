---
title: SQL 간단 정리
description: SQL 간단 정리
date: 2026-09-04 00:00:00 +0900
categories: [coding]
tags: [coding]
image:
  path: /assets/img/posts/coding/sql-join.webp
  alt: 쉽게 알아보는 SQL JOIN 😅
---

## ⚙️ MySQL 설치

MacOS 기준 [homebrew](https://brew.sh) 설치 후 아래와 같이 설치하면 됨.

  * 설치: `brew install mysql`
  * 서비스 기동: `brew services start mysql`
  * root 초기 비밀번호 설정: `mysqladmin -u root -p password 초기_비밀번호`
  * MySQL 접속: `mysql -u root -p`

---

## 🏷️ 데이터 타입

__문자__

| 데이터 타입 | 최대 문자 수 | 비고                                                                                                                                              |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHAR        | 255자        | - CHAR(저장할 최대 글자수) <br>- 항상 고정된 크기의 글자가 필요한 경우 성능상 이점이 있을 수 있으나 그런 경우는 매우 드물고 체감도 별로 되지 않음 |
| VARCHAR     | 65535자      | - VARCHAR(저장할 최대 글자수)<br>- 주로 사용                                                                                                      |
| TEXT        | 65535자      |                                                                                                                                                   |
| TINYTEXT    | 255자        |                                                                                                                                                   |
| MEDIUMTEXT  | 1600만자     |                                                                                                                                                   |
| LONGTEXT    | 42억자       |                                                                                                                                                   |

__숫자__

| 데이터 타입 | 범위                           | 비고                                          |
| ----------- | ------------------------------ | --------------------------------------------- |
| SMALLINT    | -32768~32767                   |                                               |
| MEDIUMINT   | -838만~838만                   |                                               |
| INT         | -21억~21억                     |                                               |
| BIGINT      | -900경~900경                   |                                               |
| FLOAT       | -10^38~10^38                   | 소수점 7자리까지 저장 가능(약간의 오차 발생)  |
| DOUBLE      | -10^308~^308                   | 소수점 14자리까지 저장 가능(약간의 오차 발생) |
| DECIMAL     | 소수점 30자리 포함 최대 65자리 | 오차 없이 소수점 저장 가능                    |

양의 숫자만 저장하고 싶으면 unsigned 사용(예: UNSIGNED INT)

__날짜/시간__

| 데이터 타입 | 범위          | 형식                           |
| ----------- | ------------- | ------------------------------ |
| DATE        | 1000년~9999년 | YYYY-MM-DD                     |
| TIME        | -839~838시간  | HH:MM:SS                       |
| DATETIME    | 1000년~9999년 | YYYY-MM-DD HH:MM:SS(주로 사용) |
| TIMESTAMP   | 1970년~2038년 | YYYY-MM-DD HH:MM:SS(잘 안 씀)  |

__기타__

  * 바이너리 데이터(사진, 영상 등): BLOB
  * JSON 형식: JSON
  * 참거짓 여부: BOOLEAN


## ✏️ 데이터 CRUD

### Create

__DB 생성__

```sql
CREATE DATABASE <db_name>;
```

__테이블 생성__

```sql
CREATE TABLE <db_name>.<table_name> (
  <column_1> <type>,
  <column_2> <type>
)
```

__테이블 생성 시 제약사항 주기__

```sql
CREATE TABLE <db_name>.<table_name> (
    <column_1> <type_1> AUTO_INCREMENT PRIMARY KEY, -- 행을 식별하는 기본 키, 자동 증가
    <column_2> <type_2> NOT NULL,                   -- NULL 값 불가
    <column_3> <type_3> DEFAULT '기본값',             -- 값을 생략하면 기본값 사용
    <column_5> <type_5> UNIQUE,                     -- 해당 컬럼의 중복 금지
    <column_6> <type_6> CHECK (<expression>),       -- 조건식에 맞는 값만 허용
    UNIQUE (<column_2>, <column_4>)                 -- 두 컬럼의 조합이 유일해야 함
);
)
```

__(참고) 테이블 컬럼 수정하기__

```sql
ALTER TABLE <db_name>.<table_name> ADD <column> <type>;           -- 컬럼 추가
ALTER TABLE <db_name>.<table_name> MODIFY COLUMN <column> <type>; -- 컬럼 타입 변경
ALTER TABLE <db_name>.<table_name> DROP COLUMN <column>;          -- 컬럼 삭제
```

__테이블에 데이터 넣기:__ `INSERT` 문 사용

```sql
/* 특정 컬럼에 대응하는 값 INSERT */
INSERT INTO <table_name>(<column_1>, <column_2>, ..., <column_n>)
VALUES(<value_1>, <value_2>, ..., <value_n>); -- <VALUE>에 서브쿼리를 넣을 수도 있음

/* 모든 컬럼에 데이터 넣을 땐 컬럼명 생략 가능 */
INSERT INTO table_name
VALUES(<value_1>, <value_2>, ..., <value_n>);

/* (테이블 간 데이터 복사) <table_2>의 내용을 <table_1>에 INSERT */
INSERT INTO <table_1>
SELECT * FROM <table_2>
-- WHERE 조건식
```

INSERT 문을 응용하면 테이블 복사도 가능.

```sql
/* 새로운 테이블 생성 후 복사(MySQL에선 사용 불가) */
SELECT * INTO <new_table_name> 
FROM <old_table_name>;

/* 새로운 테이블 생성 후 복사 */
CREATE TABLE <new_table_name>
SELECT * FROM <old_table_name>;

/* 임시 테이블(재접속 시 사라지는 테이블) 생성 후 복사 */
CREATE TEMPORARY TABLE <new_table_name>
SELECT * FROM <old_table_name>;
```

### Read

__데이터 출력:__ `SELECT` 문 사용

```sql
SELECT * FROM <table_name>;
SELECT <column_1>, <column_2> FROM <table_name>;
```

__데이터 필터링:__ `WHERE` 문 사용

```sql
SELECT * FROM <table_name> WHERE <expression>;
SELECT * FROM <table_name> WHERE NOT <expression>;
SELECT * FROM <table_name> WHERE <column> = '<value_STRING>'; -- 문자 리터럴 ''
SELECT * FROM <table_name> WHERE <column> = <value_NUMBER>;   -- 숫자 리터럴
SELECT * FROM <table_name> WHERE <column> != <VALUE>;         -- !=와
SELECT * FROM <table_name> WHERE <column> <> <VALUE>;         -- <>는 동일함

/* 조건을 여러 개 넣어서 필터링하려면 AND / OR 사용 */
SELECT * FROM <table_name> WHERE <expression_1> AND <expression_2>;
SELECT * FROM <table_name> WHERE <expression_1> OR <expression_2>;
SELECT * FROM <table_name> WHERE (<expression_1> OR <expression_2>) AND <expression_3>;

/* 문자에도 부등호 사용 가능 */
SELECT * FROM <table_name> WHERE <column> > 'ㄱ';

/* A~B 사이의 값 필터링 */
SELECT * FROM <table_name> WHERE <column> BETWEEN A AND B;

/* OR 조건이 많으면 IN()으로 대체 가능 */
SELECT * FROM <table_name> WHERE <column> IN ('값1', '값2', '값3');
```

__그룹지어 통계 내기:__ `GROUP BY` 문 사용.

  * GROUP BY 문은 컬럼의 같은 값끼리 모아줌(주로 카테고리 컬럼에 대해 사용)
  * GROUP BY 문 실행 결과를 필터링하고 싶으면 `HAVING` 문 사용
    - (참고) WHERE 절은 SELECT FROM 결과를 필터링

```sql
SELECT avg(<column_1>) FROM <table_name> WHERE <column_2> = 'value_1';
SELECT avg(<column_1>) FROM <table_name> WHERE <column_2> = 'value_2';
SELECT avg(<column_1>) FROM <table_name> WHERE <column_2> = 'value_3';

SELECT avg(<column_1>) FROM <table_name> GROUP BY <column_2>;
```

__데이터 정렬:__ `ORDER BY` 문 사용

```sql
-- 특정 <column> 기준으로 정렬
SELECT * FROM <table_name> ORDER BY <column> ASC;
SELECT * FROM <table_name> ORDER BY <column> DESC;

-- <column_1> 기준으로 정렬 후 <column_2> 기준으로 정렬
SELECT * FROM <table_name> 
ORDER BY 
    <column_1> ASC, 
    <column_2> DESC;
```

__`%`나 `_` 연산자를 사용하면 문자를 쉽게 검색할 수 있음.__

```sql
/* %: 특정 단어가 들어간 모든 데이터를 필터링 */
SELECT * FROM <table_name> WHERE <column> LIKE '%단어';
SELECT * FROM <table_name> WHERE <column> LIKE '단어%';
SELECT * FROM <table_name> WHERE <column> LIKE '%단어%';

/* _: _는 글자 개수 */
SELECT * FROM <table_name> WHERE <column> LIKE '_단어';
SELECT * FROM <table_name> WHERE <column> LIKE '단어_';
SELECT * FROM <table_name> WHERE <column> LIKE '_단어_';
```

__컬럼도 사칙연산이 가능함.__

```sql
SELECT 
    <column_1> + 10, 
    <column_2> - 10,
    <column_1> * <column_2>,
    <column_3> / <column_4>
FROM <table_name>;
```

__2개 이상의 테이블을 합칠 때 UNION 사용.__

  * 테이블의 컬럼 개수가 서로 맞아야 합칠 수 있음
  * `UNION`은 테이블 간의 중복 데이터 제거
  * `UNION ALL`은 테이블 간의 중복 데이터 포함

```
SELECT * FROM <table_name_1>
UNION
SELECT * FROM <table_name_2>
UNION ALL
SELECT * FROM <table_name_3>;
```

### Update

__행 수정__

```sql
/* 하나의 컬럼 수정 */
UPDATE <table_name>
SET <column> = <value>
WHERE <expression>; -- 어떤 컬럼을 수정할 것인가?

/* 여러 개의 컬럼 수정 */
UPDATE <table_name>
SET <column_1> = <value_1>, <column_2> = <value_2>, ..., <column_n> = <value_n>
WHERE <expression>; -- 어떤 컬럼을 수정할 것인가?

/* JOIN한 테이블에도 INSERT 가능 */
UPDATE <table_name_1>
INNER JOIN <table_name_2>
  ON <expression_join>
WHERE <expression_insert>;

/* 사칙연산도 가능함 */
UPDATE <table_name>
SET <column> = <column> + <value>
WHERE <expression>; -- 어떤 컬럼을 수정할 것인가?

/* 모든 행 수정 */
UPDATE <table_name>
SET <column> = <value>;

/* UPDATE 수행 후 COMMIT */
COMMIT;
```

### Delete

__행 삭제__

```sql
/* 특정 행 삭제 */
DELETE FROM <table_name>
WHERE <expression>; -- 어떤 컬럼을 삭제할 것인가?

/* JOIN한 테이블에도 DELETE 가능 */
DELETE <table_name_1>, <table_name_2>
FROM <table_name_1>
INNER JOIN <table_name_2>
  ON <expression_join>
WHERE <expression_delete>

/* 모든 행 삭제 */
DELETE FROM <table_name>;

/* DELETE 수행 후 COMMIT */
COMMIT:
```

__테이블 삭제__

```sql
DROP TABLE <db_name>.<table_name>;
```

__DB 삭제__

```sql
DROP DATABASE <db_name>;
```

### 서브 쿼리

SELECT 문 안에 SELECT 문을 사용할 수 있음.

```sql
/* 예: 사용금액이 평균보다 큰 유저 출력 */
SELECT * FROM card
WHERE spent >= (SELECT avg(spent) FROM user);
```

__서브 쿼리 사용 조건__

  * 서브쿼리를 소괄호로 반드시 묶어야 함
  * 데이터 타입이 문자나 숫자인 경우에만 서브쿼리를 사용할 수 있음
  * 1개의 데이터만 반환하는 쿼리문만 서브쿼리로 사용할 수 있음(단 IN 연산자는 예외)

### 주요 함수

__집계 함수__

```sql
/* 집계함수 */
SELECT MAX(<column>) AS <column_NAME> FROM <table_name>; -- 컬럼의 최대값
SELECT MIN(<column>) AS <column_NAME> FROM <table_name>; -- 컬럼의 최소값
SELECT AVG(<column>) AS <column_NAME> FROM <table_name>; -- 컬럼의 평균값
SELECT SUM(<column>) AS <column_NAME> FROM <table_name>; -- 컬럼 값들의 합

/* SELECT 절에 집계함수를 여러 개 사용할 수 있음 */
SELECT MAX(<column>), MIN(<column>) FROM <table_name>

/* COUNT 집계함수 */
SELECT COUNT(<column>) FROM <table_name>; -- 컬럼 값들의 개수
SELECT COUNT(*) FROM <table_name>;    -- 전체 행(ROW)의 개수

/* 중복제거 */
SELECT DISTINCT <column> FROM <table_name>;      -- 유니크한 컬럼 값 출력
SELECT AVG(DISTINCT <column>) FROM <table_name>; -- 유니크한 컬럼 값들의 평균

/* MIN, MAX 값을 구할 수 있는 또다른 방법 */
-- 이 방법이 MIN(), MAX() 집계함수를 쓰는 것보다 빠름
SELECT <column> FROM <table_name> ORDER BY <column> DESC LIMIT 1;
SELECT <column> FROM <table_name> ORDER BY <column> ASC LIMIT 1;
```

__문자 다루는 함수__

```sql
/* 문자 */
SELECT CONCAT(<column_1>, 'string') FROM <table_name>; -- 문자 이어 붙이기
SELECT <column_1> || 'string' FROM <table_name>; -- Oracle에선 문자를 || 기호로 문자를 이어붙여야 함
SELECT TRIM(<column>) FROM <table_name>; -- 공백 제거
SELECT REPLACE(<column>, <search_string>, <replace_string>) FROM <table_name>; -- 문자 치환
SELECT SUBSTR(<column>, <start_index>, <length>) FROM <table_name>; -- 문자 일부 추출
SELECT INSERT(<column>, <start_index>, <length>, <replace_string>); -- 문자 일부 단어 교체
```

__숫자 다루는 함수__

```sql
/* 하나의 행 또는 숫자배열 내의 최대값, 최소값 출력 */
SELECT GREATEST(1, 3, 2, 4, 6);
SELECT LEAST(1, 3, 2, 4, 6);

/* 올림, 내림 */
SELECT FLOOR(10.1);
SELECT CEIL(10.9);

/* 소수점 부분을 입력한 자릿수까지 반올림, 내림 */
SELECT ROUND(3.141592, 2);
SELECT TRUNCATE(3.141592, 2);
SELECT TRUC(3.141592, 2); -- Oralce, PostgreSQL의 경우

/* 거듭제곱 */
SELECT POWER(3, 2); -- 3^2

/* 절대값 */
SELECT ABS(-10);
```

### 날짜 & 시간 다루기

__날짜와 시간 형식은 문자랑 비슷하게 취급 가능.__

```sql
SELECT * FROM <table_name> WHERE <datetime_column> > 'yyyy-mm-dd hh:mm:ss';

/* 2026-09-05 날짜만 택하기 */
-- BETWEEN보다 부등호가 정확함. BETWEEN은 ms 단위까지 판별하기 때문.
SELECT * FROM <table_name> 
WHERE <datetime_column> > '2026-09-05 00:00:00'
  AND <datetime_column> < '2026-09-06 00:00:00';
  
/* 현재 날짜 */
SELECT * FROM <table_name> 
WHERE <datetime_column> > '2026-09-05 00:00:00'
  AND <datetime_column> < now() -- 현재 날짜
  
/* 포매팅 */
SELECT DATE_FORMAT('2026-09-05 12:34:56', '%Y %m %d %h %m %s')
```

### 트랜젝션(Transaction)

Auto Commit 기능을 사용하지 않는 경우 INSERT, UPDATE, DELETE 문 등을 실행한 후 COMMIT(적용) 또는 ROLLBACK(원복)을 수행해야 함.

```sql
START TRANSACTION

INSERT INTO <db_name>.<table_name> VALUES(<value>);

COMMIT; | ROLLBACK;
```

### 트리거(Trigger)

__INSERT, UPDATE, DELETE 실행 시 자동으로 특정 코드가 실행되게 하려면 트리거를 사용함.__

```sql

DROP TRIGGER IF EXISTS <db_name>.<trigger_name>>; 
DELIMITER $$ 
CREATE TRIGGER <db_name>.<trigger_name>> 
-- 1. INSERT|UPDATE|DELETE 작업이 일어난 전|후에
AFTER|BEFORE INSERT|UPDATE|DELETE ON <db_name>.<table_name>
FOR EACH ROW 
BEGIN 
  -- 2. 이 쿼리를 실행함
  <query_to_execute>;
END $$ 
DELIMITER ;
```

__BEGIN ~ END 절에 OLD, NEW 키워드를 사용할 수 있음.__

  * OLD: 변경 전 데이터
  * NEW: 변경 후 데이터

```sql
~
/* 변경 후 데이터 중 가격이 음수이면 1000으로 변경 */
BEGIN
  IF OLD.price < 0 THEN 
    SET NEW.price = 1000;
END
~
```

---

## ❓ 조건문

경우가 두 가지면 주로 `IF` 문 사용.

```sql
SELECT IF(<expression>, <value_true>, <value_false>) FROM <table_name>;
```

경우가 세 가지 이상이면 IF문을 중첩해서 사용하기보다, `CASE` 문 사용

```sql
SELECT 
    CASE 
        WHEN <expression_1> THEN <value_1>
        WHEN <expression_2> THEN <value_2>
        WHEN <expression_3> THEN <value_3>
        -- ...
        WHEN <expression_n> THEN <value_n>
        ELSE <else_value>
    END AS '컬럼명'
FROM <table_name>;
```

IF, CASE 문은 집계함수 내에서도 사용 가능

```sql
SELECT sum(3) from <table_name>; -- 행의개수*3 반환

SELECT sum(
    CASE
        WHEN <expression_1> THEN <value_1>
        WHEN <expression_2> THEN <value_2>
        ELSE <else_value>
    END
) FROM <table_name>;
```

---

## ✂️ 테이블 정규화

__정규화란?__ 테이블을 쪼개서 중복과 이상 현상을 줄이는 것

__제1정규형:__ 한 칸에 하나의 데이터만 저장된 상태

  * 예를 들어, 수강과목 컬럼에 `['SQL', 'Java', 'Python']` 식으로 저장이 가능하다면 제1정규화가 아님
  * 한 칸엔 배열이 아닌 하나의 요소만을 저장할 수 있어야 제1정규형이 됨

__제2정규형:__ 현재 테이블의 주제와 관련 없는 컬럼(Partial Dependency)을 다른 테이블로 빼낸 상태

  * 예를 들어, 수강과목 정보가 담긴 테이블에 학생 정보도 담겨 있다면 제2정규형이 아님
  * 수강과목 정보가 담긴 테이블과 학생 정보가 담긴 테이블로 분리해야 제2정규형이 됨

__제3정규형:__ 기본키(Primary key) 컬럼이 아닌 일반 컬럼에 종속된 컬럼을 다른 테이블로 빼낸 상태

  * 예를 들어, 직원ID(PK) / 직원이름 / 부서ID / 부서명 커럼이 있는 테이블이 있는 경우
  * 부서명 컬럼은 직원ID(PK)가 아닌 부서ID(PK가 아님)에 의해 결정되므로 제3정규형이 아님
  * 직원ID(PK) / 직원이름 / 부서ID 테이블 및 부서ID(PK), 부서명 테이블로 분리하면 제3정규형이 됨

__테이블 쪼갤 때 유의사항__

  * 첫 컬럼은 기본키로 설정하는 게 좋음
  * 다른 테이블의 데이터 사용 시 외래키(FK, Foreign key, 다른 테이블의 기본키를 사용하는 컬럼)를 사용하면 좋음

---

## 🤝 조인(Join)

__조인을 사용하는 이유:__ 두 개 이상의 테이블을 합쳐서 출력하기 위함

__Inner Join:__ 테이블에서 공통된 값이 일치하는 행만 연결하여 반환

__Left Join:__ INNER Join + 왼쪽(FROM 절) 테이블 행 전부 출력

  * 왼쪽 테이블 전체와 두 테이블의 공통된 행을 출력

__Right Join:__ INNER Join + 오른쪽(RIGHT JOIN 절) 테이블 행 전부 출력

  * 오른쪽 테이블 전체와 두 테이블의 공통된 행을 출력

__Left 또는 RIGHT Join을 사용하는 이유:__ 테이블 간 접점이 없는(빵꾸난) 행을 null로 출력하고 싶은 경우

```sql
/* 가능한 행의 모든 조합을 출력 */
SELECT * FROM <table_name_1>, <table_name_2>;
SELECT * FROM <table_name_1> INNER JOIN <table_name_2>;

/* 조건식 걸기(ON) */
SELECT * FROM <table_name_1> t1 
INNER|LEFT|RIGHT JOIN <table_name_2> t2
    ON t1.<column> = t2.<column>;
```

---

## 👀 뷰(View)

__뷰를 쓰는 이유__

  * SELECT 문이 너무 마음에 들어서(?) 테이블처럼 두고두고 저장해서 조회하고 싶을 때 사용
  * 복잡하게 JOIN 해놓은 테이블들을 하나의 뷰로 만들어 두고 재사용 하기도 함

__뷰 생성__

```sql
CREATE VIEW <view_name> AS
SELECT ~ FROM ~ WHERE ~
```

---

## 프로시저(Procedure)와 펑션(Function)

### 프로시저(Procedure)

자주 사용하는 쿼리문을 호출하여 재사용 할 수 있도록 만들어둔 것.

펑션과 달리 반환값이 없음.

```sql
/* 프로시저 생성 */
-- 프로시저 생성 시 오류가 발생하는 경우 DELIMITER(기본값: ;)를 잠깐 $$로 변경
-- 이걸 쓰는 이유는 SQL_쿼리문 끝에 있는 ;와 충돌날 수 있기 때문
DELIMITER $$ 
$$
CREATE PROCEDURE <db_name>.<procedure_name>()
BEGIN
	<sql_query>;
END
$$
DELIMITER;

/* 프로시저 호출 */
CALL <db_name>.<procedure_name>()

/* 프로시저 삭제 */
DROP PROCEDURE IF EXISTS <db_name>.<procedure_name>()
```
프로시저에 파라미터를 사용할 수 있음

  - IN 파라미터: 프로시저 안에 데이터를 넣을 때 사용
  - OUT 파라미터: 프로시저 밖으로 데이터를 뺄 때 사용. 이 파라미터는 거의 사용하지 않고 Function을 주로 사용함.

```sql
/* IN 파라미터: 프로시저 안에 데이터를 넣을 때 사용 */
CREATE PROCEDURE <db_name>.<procedure_name>(<param_name> <param_type>)
BEGIN
  SELECT * FROM <table_name> WHERE <column> > <param_name>;
END

CALL <db_name>.<procedure_name>(<value>);

/* OUT 파라미터 */
CREATE PROCEDURE <db_name>.<procedure_name>(OUT <param_name> <param_type>)
BEGIN
  SET <param_name> = <value>;
END

CALL <db_name>.<procedure_name>(@<var_name>);
SELECT @<var_name>;
```

### 펑션(Function)

계산 수식을 호출하여 재사용 할 수 있도록 만들어둔 것.

프로시저와 달리 반환값이 있음.

```sql
/* 함수 생성 */
CREATE FUNCTION <db_name>.<function_name>(<param_name> <param_type>)
RETURNS <return_type> -- 반환 자료형
DETERMINISTIC|NO SQL|READS SQL DATA|MODIFIES SQL DATA
BEGIN
  -- SQL문 작성
  RETURN <return_value>;
END
```

### 변수

`@ 변수`는 전역변수이며 MySQL에서만 사용 가능. DB 연결 종료 시 사라짐.

```sql
/* @ 변수 선언 */
SET @<var_name> = <value_1> | <sub_query_1>;
SET @<var_name> = <value_2> | <sub_query_2>; -- 변수 값 변경
SET @<var_name> = @<var_name> + 1;  -- 사칙연산도 가능

/* 변수 출력 */
SELECT @<var_name>;
```

`DECLARE 변수`는 지역변수이며 해당 프로시저 내에서만 사용 가능. 프로시저 실행 종료 시 사라짐.

```sql
CREATE PROCEDURE <db_name>.<procedure_name>()
BEGIN
  /* DECLARE 변수 선언 및 값 변경 */
  DECLARE <var_name_1> <type> DEFAULT <default_value>;
  SET <var_name_1> = <value>;
  
  /* DECLARE 변수 출력 */
  SELECT <var_1>;
  
  /* 사용예시 */
  DECLARE <var_1> INT DEFAULT 123;
  SET <var_1> = 123123;
  DECLARE <var_2> varchar(100) DEFAULT '안녕하세요';
END
```

### 프로시저와 펑션에서 사용하는 조건문

__프로시저에서 사용하는 IF문__

```sql
CREATE PROCEDURE <db_name>.<procedure_name>()
BEGIN
  IF <expression_1> THEN
    <query_to_execute_1>;
  ELSEIF <expression_2>
    <query_to_execute_2>;
  ELSE
    <query_to_execute_3>;
  END IF;
END
```

__펑션에서 사용하는 IF문__

```sql
CREATE FUNCTION <db_name>.<function_name>()
RETURNS <type>
DETERMINISTIC|NO SQL|READS SQL DATA|MODIFIES SQL DATA
BEGIN
  IF <expression_1> THEN
    RETURN <return_value_1>;
  ELSEIF <expression_2>
    RETURN <return_value_2>;
  ELSE
    RETURN <return_value_3>;
  END IF;
END
```

---

## 🗂️ 인덱스(Index)

### 인덱스

__인덱스란?__ 정렬해 놓은 사본.

  * 데이터를 빠르게 찾기 위해 사용
  * 관계형 DBMS는 일반적으로 B+tree로 인덱스를 정렬해 둠

__인덱스의 장단점__

  * 인덱스가 없으면 모든 행을 다 검색하여 속도가 느리지만
  * 인덱스가 있다면 몇 번의 탐색만에 찾을 수 있으므로 검색 속도가 빨라짐
  * 인덱스를 생성하면 DB 용량을 차지함. 따라서 검색작업이 필요 없는 컬럼엔 인덱스를 만들 필요 없음.
  * 행 삽입, 수정, 삭제 시 인덱스 반영이 필요하므로 성능 하락 발생

__인덱스 참고사항__

  * 구분명확도(Cardinality)가 높은 컬럼, 즉 중복이 적은 컬럼이 인덱스를 우선적으로 생성하는 게 좋음
  * 기본키는 인덱스를 생성할 필요가 없음. Clustered index로써 자동 생성되기 때문.
  * 숫자뿐 아니라 문자 등의 자료도 인덱스 생성 가능
  * `LIKE %` 연산자에선 인덱스 사용 불가

__인덱스 생성__

```sql
CREATE INDEX <index_name> ON <db_name>.<table_name> (<column>);
```

__다중컬럼 인덱스:__ 여러 개의 컬럼을 묶어서 인덱스로 만든 것

  * WHERE 문에 해당 컬럼들을 동시에 조건으로 줄 때 빠르게 검색 가능
  * 다중컬럼 인덱스 생성 시 순서가 중요함
    - column_1, column_2 컬럼 순으로 인덱스를 생성했다면
    - WHERE 절을 사용할 때도 column_1, column_2 컬럼 순으로 조건을 걸어야 인덱스를 활용할 수 있음
    - `where column_1='' and column_2=''` 처럼...

### 풀 텍스트 인덱스(Full Text Index)

__풀 텍스트 인덱스란?__ 특정 단어나 문장을 빠르게 검색하기 위한 인덱스

  * `LIKE %` 연산자로 문자를 검색하면 인덱스 사용이 불가하여 속도가 느리나
  * 풀 텍스트 인덱스를 생성한 후 문자를 검색하면 빠르게 검색이 가능함

__풀 텍스트 인덱스 생성__

```sql
-- 특정 컬럼에 대한 풀 텍스트 인덱스 생성
CREATE FULLTEXT INDEX <index_name> ON <db_name>.<table_name>(<column>);

-- 띄어쓰기나 일부 단어의 스펠링이 틀려도 검색이 되도록 인덱스 생성
CREATE FULLTEXT INDEX <index_name> ON <db_name>.<table_name>(<column>) WITH PARSER ngram;
```

__풀 텍스트 인덱스 사용__

```sql

-- 풀 텍스트 인덱스가 적용된 컬럼 내 단어 검색
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('<word>');

-- Stopwords(The, on, in 등)를 무시하여 검색(기본값)
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('<word>' IN NATURAL LANGUAGE MODE); 

-- Stopwords를 포함하여 검색
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('<word>' IN BOOLEAN MODE);

-- (*) 검색할단어 이후에 나오는 모든 값을 포함하여 검색하는 경우
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('<word>*' IN BOOLEAN MODE);

-- ( ) 검색할단어_1 또는 검색할단어_2가 포함된 경우 검색(띄어쓰기는 OR)
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('<word_1> <word_2>' IN BOOLEAN MODE); 

-- (+) 검색할단어_1과 검색할단어_2는 포함되어야 함
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('+<word_1> +<word_2>' IN BOOLEAN MODE);

-- (-) 검색할단어_1과 검색할단어_2는 제외되어야 함
SELECT * FROM <table_name> WHERE MATCH(<column>) AGAINST('-<word_1> -<word_2>' IN BOOLEAN MODE); 
```

기본적으로 2자 이하의 단어는 검색이 불가함. 2자 이하의 단어도 검색이 가능하도록 하려면 my.ini 파일 맨 밑에 `innodb_ft_min_token_size=2`를 추가해줘야 함