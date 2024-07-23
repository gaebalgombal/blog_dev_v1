# SQL 문법 정리

<!--원본 : ../references/draft/sql/sql_grammers.pdf-->

- 테이블에서 데이터 검색
  N

  - 테이블 형식 확인
    ```sql
    DESC 테이블명;
    ```
  - 테이블에서 데이터 검색

    ```sql
    SELECT * FROM 테이블명 WHERE 조건식1, 조건식2;

    # 예시
    SELECT * FROM 테이블명 WHERE name = "주디"; # 문자열
    SELECT * FROM 테이블명 WHERE number = 1;   # 숫자
    SELECT * FROM 테이블명 WHERE visit_time = 3:40:31;      # 시간
    SELECT * FROM 테이블명 WHERE visit_date = 2021-11-10;  # 날짜
    SELECT * FROM 테이블명 WHERE name IS NULL ; # NULL값 검색

    # 조합
    SELECT * FROM 테이블명 WHERE 조건식1 AND 조건식2;
    SELECT * FROM 테이블명 WHERE 조건식1 OR 조건식2;

    #패턴매칭
    SELECT * FROM 테이블명 WHERE name LIKE "김%"; # 김으로 시작하는 데이터 검색
    SELECT * FROM 테이블명 WHERE name LIKE "%김"; # 김으로 끝나는 데이터 검색
    SELECT * FROM 테이블명 WHERE name LIKE "%김%"; # 김을 포함하는 데이터 검색
    ```

  - 이스케이프
    ''를 연속해서 2개 기술하면 이스케이프 처리를 할 수 있음
  - 자료형
      <aside>
      💡 INTEGER형 - 정수
      CHAR형 - 문자열. 고정길이 자료형. 언제나 고정된 길이로 데이터가 저장됨
      VARCHAR형 - 문자열. 가변길이 자료형. 데이터 크기에 맞춰 저장공간의 크기도 변경됨
      DATE형 - 날짜
      TIME형 - 시간
      
      </aside>

- 정렬과 연산

  - 정렬
    **정렬**

    ```sql
    SELECT * FROM 테이블명 ORDER BY 열명;
    SELECT * FROM 테이블명 ORDER BY 열명 DESC; # 오름차순
    SELECT * FROM 테이블명 ORDER BY 열명 ASC; # 내림차순

    # 복수열로 정렬
    SELECT * FROM 테이블명 ORDER BY 열명1 [ASC|DESC], 열명2 [ASC|DESC];
    # 정렬순서: 열명1 -> 열명2
    ```

    - 정렬 시 NULL을 위에 둘지, 아래에 둘지는 프로그램에 따라 다름
      **결과 행 제한**

    ```sql
    SELECT 열명 FROM 테이블명 LIMIT 행수 [OFFSET 시작행]
    SELECT 열명 FROM 테이블명 WHERE 조건식 ORDER BY LIMIT 행수 [OFFSET 시작행]
    ```

  - 연산
    **연산하기**
    [산술연산자](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%89%E1%85%A1%E1%86%AB%E1%84%89%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A1%20a3350e99275f4f859e4c03f1b7dafbd6.csv)

    ```sql
    # SELECT 구에서 연산하기
    SELECT 식1, 식2 ... FROM 테이블명;
    SELECT 식1, 식2 ... AS 별명 FROM 테이블명; # 식 결과에 별명 붙이기

    # ORDER 구에서 연산하기
    SELECT 식1, 식2 ... AS 별명 FROM 테이블명 ORDER BY 별명; # 식 결과에 별명 붙이기

    # WHERE 구에서 연산하기
    SELECT 식1 FROM 테이블명 WHERE 식1을 사용한 조건식;

    # 예시
    SELECT price * quantity ... AS amount FROM 테이블명 ORDER BY amount;
    SELECT price * quantity ... FROM 테이블명 WHERE price * quantity >= 2000;
    ```

    - ORDER BY 구에서는 식에 붙인 별명을 사용 가능, WHERE 구에서는 별명이 사용 불가능
      **함수 사용**

    ```sql
    함수명(인수1, 인수2 ...)

    # ROUND 함수
    SELECT amount ROUND(amount) FROM 테이블명; # amount 열을 반올림
    ```

    **왜 WHERE 구에서는 별명이 사용 불가능한가?**
    서버에서 내부 처리 순서에 따르면 WHERE구가 먼저 처리되고, SELECT구가 처리되는데,
    별명은 SELECT 구에서 붙이는 것이기 때문에,
    WHERE 구에서는 아직 별명이 없는 상태이기 때문에 별명을 사용할 수 없다.
    ![Untitled](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/Untitled.png)

  - 문자열 연산
    **문자열 결합**
    [문자열 결합 연산자](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%86%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%92%E1%85%A1%E1%86%B8%20%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A1%20eee714e9d99d42148bf5676e0319ec44.csv)
    **문자열 함수**

    ```sql
    # SUBSTRING 함수
    # 8번째 자리부터 2자리 추출
    >>> SUBSTRING("안녕하세요. 김정연입니다", 5, 2)
    "김정"

    # TRIM 함수
    # 문자열 앞뒤로 여분의 스페이스를 제거해주는 함수(문자열 중간에 존재하는 함수는 제거 X)
    >>> TRIM("    ABC   ")
    "ABC"

    # CHARACTER_LENGTH 함수
    # CHARACTER_LENGTH 함수 : 문자열 길이 계산해 돌려주는 함수
    # OCTET_LENGTH 함수 : 문자열의 길이를 바이트 단위로 계산해 돌려주는 함수
    ```

  - 날짜 연산
    **시스템 날짜 확인**

    ```sql
    # 현재 시스템 날짜 확인
    SELECT CURRENT_TIMESTAMP

    # 현재 시스템 날짜를 저장할 때
    # CURRENT_TIMESTAMP 활용
    ```

    **임의의 날짜 저장**

    ```sql
    # 임의의 날짜를 저장할 때
    # 문자열 데이터를 날짜형 데이터로 변환
    TO_DATE('2021/11/13', 'YYYY/MM/DD')
    ```

    **날짜의 덧셈과 뺄셈**

    ```sql
    # 날짜로부터 특정일을 덧셈,뺄셈할 때
    SELECT CURRENT_DATE + INTERVAL 1 DAY.  # 현재 날짜 + 1일

    # 특정 날짜형 간의 뺄셈
    DATEDIFF("2021/11/13", "2021/10/10") # 10월 10일 ~ 11월 13일 간의 기간 계산
    ```

  - CASE 문으로 데이터 변환
    **검색 CASE**

    ```sql
    # 검색 CASE
    CASE WHEN 조건식1 THEN 식1
    	[WHEN 조건식2 THEN 식2]
    	...
    	[ELSE 식3]
    END

    # 예시
    SELECT a AS "코드",        # a열을 "코드"라는 별명 칼럼으로
    CASE                      # CASE문
    	WHEN a = 1 THEN '남자',  # a = 1일 경우, '남자'
    	WHEN a = 2 THEN '여자'.  # a = 2일 경우, '여자'
    	ELSE 'NULL'             # 어떤 조건식에도 해당하지 않는 경우 NULL
    END AS "성별"              # CASE문 결과를 "성별"이라는 칼럼으로
    FROM 테이블;
    ```

    **단순 CASE**

    ```sql
    # 단순 CASE
    CASE 식1
    	WHEN 식2 THEN 식3
    	[WHEN 식4 THEN 식5]
    	...
    	[ELSE 식6]
    END

    # 예시
    SELECT a AS "코드",        # a열을 "코드"라는 별명 칼럼으로
    CASE a                    # a에 대한 CASE문
    	WHEN 1 THEN '남자',      # a가 1일 경우, '남자'
    	WHEN 2 THEN '여자'.      # a가 2일 경우, '여자'
    	ELSE 'NULL'             # 어떤 조건식에도 해당하지 않는 경우 NULL
    END AS "성별"              # CASE문 결과를 "성별"이라는 칼럼으로
    FROM 테이블;
    ```

    [데이터](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20716175cfa93d497cab2883d0ca93b783.csv)

    ## ⬇️

    [결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%20687c92379b1e4d349a31ef4c1cbee2d0.csv)

- 데이터의 추가, 삭제, 갱신

  - 행 추가하기

    ```sql
    INSERT INTO 테이블명 VALUES(값1, 값2 ...)
    ```

    **예시**

    ```sql
    # 테이블 구성을 확인
    DESC users;
    ```

    [users](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20ec25f7db0e184d7291390ee55f563ee3.csv)

    ```sql
    # 행 삽입
    >>> INSERT INTO users VALUES("harry", "password for harry")  # nickname 지정X -> default로 저장됨
    >>> INSERT INTO users VALUES("hermione", "password for hermione", "granger")

    # 칼럼을 지정하여 행 삽입
    >>> INSERT INTO users (name, password, nickname, ...)
    VALUES ("hermione", "password for hermione", "granger");
    ```

    [users](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20b7679398c3de4a23bf672fa7b2b44026.csv)

  - 삭제하기
    ```sql
    DELETE FROM 테이블명 WHERE 조건식;
    ```
  - 데이터 갱신하기
    ```sql
    UPDATE 테이블명 SET 열1 = 값1, 열2 = 값2, ... WHERE 조건식
    ```
    - SET 구에 기술한 식의 순서 처리는 DBMS에 따라 다르다. 예를 들어, Oracle에서는 SET구에 기술한 식의 순서가 처리에 영향을 주지않는다는 것을 알 수 있다. 반면, MySQL에서는 SET 구에 기술된 순서대로 갱신 처리가 일어난다.
      **예시**
      [users 원본](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%87%E1%85%A9%E1%86%AB%2005247630b88043d29e2874294b76a528.csv)
      **MySQL인 경우(1)**
    ```sql
    UPDATE users SET no = no + 1, nickname = no;
    # set 구의 순서에 따라 처리됨 : no = no + 1 -> nickname = no
    ```
    [users 결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%205175c4a83456495b8d72a653d6bbfdd6.csv)
    **MySQL인 경우(2)**
    ```sql
    UPDATE users SET nickname = no, no = no + 1;
    # set 구의 순서에 따라 처리됨 : nickname = no -> no = no + 1
    ```
    [users 결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%20329ce86d2722454c8f747b2227d197d4.csv)
    **Oracle인 경우**
    ```sql
    UPDATE users SET nickname = no, no = no + 1;
    # set 구의 순서와 상관없이 처리됨 : no값이 항상 갱신 이전의 값을 반환하기 때문
    ```
    [users 결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%20a62fd92c2fb24b1191b1b75dcb332b80.csv)
  - 물리삭제와 논리삭제
    **물리삭제(Hard Delete)**
    DELETE 명령을 실행헤서 테이블에서 완전히 삭제하는 방법
    ex) 데이터를 완전히 삭제해야 하는 경우
    **논리삭제(Soft Delete)**
    '삭제플래그' 열을 미리 준비해두고, 실제로 행을 삭제하는 대신, '삭제플래그'에 '삭제되었다'고 표시해두는 방법. 참조할 때는 '삭제 플래그'가 삭제로 설정된 행을 제외하는 SELECT 명령을 실행한다. 결과적으로는 해당 행이 삭제된 것처럼 보인다.
    ex) 주문 취소했지만 기록을 남겨두어야 할 경우

- 집계와 서브쿼리

  - 집계함수
    [집계함수](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%B5%E1%86%B8%E1%84%80%E1%85%A8%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%2098bf2f91a7e44a3ebe34ef221f85d4af.csv)
    - 집계 : 복수의 값(집합)에서 하나의 값을 계산해내는 것. 집계함수를 SELECT 구에 쓰면 WHERE 구의 유무와 관계없이 결과값으로 하나의 행을 반환한다
    ```sql
    SELECT (DISTINCT *) FRIM 테이블명;        # 중복 제거
    SELECT COUNT(DISTINCT *) FROM 테이블명;   # 중복 제거한 개수 세기
    ```
  - 그룹화
    **GROUP BY**
    ```sql
    SELECT * FROM 테이블명 GROUP BY 열1, 열2, ...;
    ```
    - GROUP BY 는 집계함수와 같이 사용해야 의미가 있다
    ```sql
    # 예시
    SELECT name, COUNT(name), SUM(name), SUM(quantity)
    FROM 테이블명 GROUP BY name;
    ```
    - GROUP BY에서 지정한 열 이외의 열은 집계함수를 사용하지 않은 채 SELECT 구에 기술하면 안된다. 그룹마다 하나의 값을 반환해야 하는데, 다른 열을 그대로 사용할 경우, 여러 값이 반환되므로 에러가 발생.
      **HAVING**
    ```sql
    # 예시
    SELECT name, COUNT(name)
    FROM 테이블명
    GROUP BY name
    HAVING COUNT(name) = 1;    # GROUP BY에 조건을 걸 때 HAVING구 사용
    ```
  - 서브쿼리
    **서브쿼리**

    ```sql
    DELETE FROM 테이블명 WHERE a=(SELECT MIN(a) FROM 테이블명);
    ```

    - SELECT 명령에 의한 데이터 질의로, 상부가 아닌 하부의 부수적인 질의를 의미함
      **MySQL에서의 서브쿼리**

    ```sql
    DELETE FROM 테이블명
    WHERE a=(SELECT a FROM (SELECT MIN(a) AS a FROM 테이블명) AS x);
    ```

    - MySQL의 경우, 인라인뷰로 임시 테이블을 만들어서 처리해야 함
    - 데이터를 추가하거나 갱신할 경우, 동일한 테이블을 서브쿼리에서 사용할 수 없도록 되어 있기 때문.
      **SELECT 구에서 서브쿼리 사용하기**

    ```sql
    SELECT
        (SELECT COUNT(*) FROM 테이블1) AS sq1;
        (SELECT COUNT(*) FROM 테이블2) AS sq2;
    # 각 서브쿼리에 sq1, sq2 별명 설정
    ```

    **SET 구에서 서브쿼리 사용하기**

    ```sql
    UPDATE 테이블명 SET a = (SELECT MAX(a) FROM 테이블명);
    ```

    **FROM 구에서 서브쿼리 사용하기**

    ```sql
    SELECT* FROM (SELECT * FROM 테이블명) AS sq;
    # 단, Oracle에서는 별명 생략 필요
    ```

    **INSERT 명령과 서브쿼리**

    1. VALUES 구에서 서브쿼리 사용하기

       ```sql
       INSERT INTO 테이블명 VALUES (
       	(SELECT COUNT (*) FROM 테이블1),
       	(SELECT COUNT (*) FROM 테이블2)
       );
       ```

    2. SELECT 결과를 INSERT하기

       ```sql
       INSERT INTO 테이블A SELECT * FROM 테이블B;
       ```

    - **서브쿼리 패턴과 스칼라값**

      1. 하나의 값을 반환하는 패턴

         ```sql
         SELECT MIN(a) FROM 테이블명;
         ```

         [제목 없는 데이터베이스](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%20ade341d90fb24c33986d67154ae63a55.csv)

      2. 복수의 행이 반환되지만 열은 하나인 패턴

         ```sql
         SELECT no FROM 테이블명;
         ```

         [제목 없는 데이터베이스](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%20b64a3ed4931649bb828a7e8bd7ac249a.csv)

      3. 하나의 행이 반환되지만 열이 복수인 패턴

         ```sql
         SELECT MIN(a), MAX(no) FROM 테이블명;
         ```

         [제목 없는 데이터베이스](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%208379fc7892824e78bda579b02a787d5b.csv)

      4. 복수의 행, 복수의 열이 반환되는 패턴

         ```sql
         SELECT no, a FROM 테이블명;
         ```

         [제목 없는 데이터베이스](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%20439050c3cffe4c8893f273cc32f88821.csv)

         **스칼라값**

         패턴1처럼, 단일 값이 반환되는 것

  - 상관 서브쿼리
    **EXISTS**

    ```sql
    UPDATE 테이블A SET a = "있음" WHERE
    	EXISTS (SELECT * FROM 테이블B WHERE 테이블B.no = 테이블A.no);
    ```

    - 테이블A와 테이블B의 no가 같은 행이 "있을 경우",
      테이블A의 a열의 해당 행을 "있음"으로 업데이트하는 명령
    - 상관 서브쿼리
      단독 서브쿼리는 단독쿼리로 실행할 수 있지만,
      상관 서브쿼리는 부모 명령과 떼어내서 따로 실행할 수 없음
      **IN**

    ```sql
    # 집합
    SELECT * FROM 테이블명 WEHRE no IN (1,3,4,...);

    # 집합을 서브쿼리로 지정
    SELECT * FROM 테이블A WEHRE 테이블A.no IN
    	(SELECT 테이블B.no FROM 테이블B);
    ```

- 데이터베이스 객체 작성과 삭제

  - 데이터베이스 생성, 삭제

    ```sql
    # 생성
    CREATE DATABASE NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

    # 삭제
    DROP DATABASECREA NAME
    ```

  - 테이블 작성,삭제,변경
    ```sql
    CREATE TABLE 테이블명 (열 정의1, 열 정의2, ...)
    DROP TABLE 테이블명
    ALTER TABLE 테이블명 하부 명령
    ```
  - 테이블 작성
    ```sql
    # 테이블 작성 예시
    CREATE TABLE users (
    no INTEGER NOT NULL,
    name VARCHAR(30),
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(30) DEFAULT "별명"
    );
    ```
    ```sql
    # 열 정의 방법
    열명 자료형 [DEFAULT 기본값] [NULL|NOT NULL]
    ```
    [users](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/users%204b05683ad2b14c419b0a0ed2df2cf23a.csv)
  - 테이블 삭제
    ```sql
    # 테이블 완전 삭제
    DROP TABLE 테이블명;
    ```
    ```sql
    # 테이블 정의는 그대루 둔 채, 테이블의 데이터만 전부 삭제
    TRUNCATE TABLE 테이블명;
    ```
  - 테이블 변경

    ```sql
    ALTER TABLE 테이블명 변경 명령;
    ```

    **열 추가**

    ```sql
    ALTER TABLE ADD 열 정의;

    # 예시: newcolumn(INTEGER) 열 추가
    ALTER TABLE 테이블명 ADD newcolumn INTEGER;
    ```

    **열 속성 변경**

    ```sql
    ALTER TABLE MODIFY 열 정의;

    # 예시: newcolumn(INTEGER) -> newcolumn(VARCHAR(30) 속성 변경
    ALTER TABLE 테이블명 MODIFY newcolumn VARCHAR(30);
    ```

    **열 이름 변경**

    ```sql
    ALTER TABLE CHANGE [기존 열 이름][신규 열 정의];

    # 예시: newcolumn -> changedcolumn(VARCHAR(50) 열 이름 변경 & 열 속성 변경
    ALTER TABLE 테이블명 CHANGE newcolumn changedcolumn VARCHAR(50);
    ```

    **열 삭제**

    ```sql
    DROP TABLE 테이블명 DROP 열명;

    # 예시: changedcolumn 열 삭제
    DROP 테이블
    ```

    **실무에서 테이블을 관리하는 예시**

    - 최대 길이 연장
      실제로 시스템을 운용하는 경우, 처음에 한 자리로 충분했던 용량이 시간이 지나면서 부족해지는 일 이 발생할 수 있다. 이 때 문자열의 자료형의 길이를 연장해 해결
    - 열 추가
      시스템 변경으로 테이블에 열을 추가하는 경우
      다만, 열을 추가하면 해당 열에 대해 데이터 값을 지정해야 하기 때문에,
      INSERT 명령에 대해 확인하는 등 기존 명령어들을 점검해 볼 필요가 있음

  - 제약
    **테이블 작성시 제약 정의**

    ```sql
    CREATE TABLE 테이블 (
    	no INTEGER NOT NULL UNIQUE, # NOT NULL, UNIQUE 제약 설정
    	sub_no INTEGER NOT NULL,
    	name VARCHAR(30),
    	PRIMARY KEY(no, sub_no),    # PRIMARY KEY 제약 설정
    	CONSTRAINT primarykey_sample PRIMARY KEY(no, sub_no) # 제약에 이름 설정
    )
    ```

    **테이블 제약**
    **제약 추가**

    ```sql
    ALTER TABLE 테이블명 ADD CONSTRAINT 제약 추가 명령

    # 예시: 기본키 제약 추가
    ALTER TABLE 테이블명 ADD CONSTRAINT primarykey_sample PRIMARY KEY(a);
    # a열을 기본키로 제약 추가
    ```

    **제약 삭제**

    ```sql
    ALTER TABLE 테이블명 DROP CONSTRAINT 제약 추가 명령;

    # 예시: a열을 기본키로 하는 제약을 삭제
    ALTER TABLE 테이블명 DROP CONSTRAINT primarykey_sample;
    ```

    **열 제약**
    **제약 추가/삭제**

    ```sql
    ALTER TABLE 테이블명 MODIFY 변경 명령;

    # 예시: c열에 NOT NULL 제약 걸기
    ALTER TABLE 테이블명 MODIFY c VARCHAR(30) NOT NULL;

    # 예시: c열에서 NOT NULL 제약 삭제하기
    ALTER TABLE 테이블명 MODIFY c VARCHAR(30);
    ```

  - 인덱스
    **인덱스란?**
    테이블에 붙여진 색인.
    **알고리즘?**
    탐색 방법은 이진탐색, 알고리즘은 이진트리 구조
    **인덱스 작성**

    ```sql
    CREATE INDEX 인덱스명 ON 테이블명(열명1, 열명2, ...)
    ```

    ```sql
    # 예시: SAMPLE 테이블명의 a열에 대해, index_sample이라는 인덱스 설정
    CREATE INDEX index_sample ON table_sample(a)
    ```

    **인덱스 사용**

    ```sql
    # 인덱스 설정: SAMPLE 테이블명의 a열에 대해, index_sample이라는 인덱스 설정
    CREATE INDEX index_sample ON table_sample(a)

    # 인덱스 사용: WHERE 구에 a열을 사용할 경우, index_sample 인덱스를 활용해 SELECT 명령
    SELECT * FROM table_sample WHERE a = "a";

    # But WHERE 구에 a열을 사용하지 않는 경우, SELECT 명령에 인덱스를 사용할 수 없음
    ```

    **인덱스를 사용해 검색하는 지 확인하는 EXPLAIN**

    ```sql
    EXPLAIN SQL명령
    ```

    데이터베이스 내부 처리에서는 SELECT 명령을 실행하기에 앞서 실행계획을 세운다. 실행계획은 '인덱스가 지정된 열이 WHERE 조건으로 지정되어 있으니 인덱스를 사용하자'와 같은 계획을 세우는 것이고, EXPLAIN 명령은 이 실행계획을 확인하는 명령이다.
    **최적화**
    실행 계획에서는 인덱스의 유무, 인덱스를 사용할 것인지 여부 등에 대해, 데이터베이스 내부의 최적화 처리를 통해 판단한다. 이 때, 판단 기준으로 '인덱스의 품질'도 고려한다.
    예를 들어, '예' 또는 '아니오'라는 값만 가지는 열이 있다면, 해당 열에 인덱스를 지정해도 다음과 같은 이진 트리가 되어 좋은 구조를 가지지 못한다.
    이처럼, 데이터의 종류가 적을수록 인덱스의 효율도 떨어진다. 반면, 서로 다른 값으로 여러 종류의 데이터가 존재하면 효율이 좋아진다. 이런 인덱스의 품질을 고려해 실행계획이 세워진다.

  - 뷰 작성과 삭제
    **뷰(View)란?**
    SELECT 명령을, 객체로서 이름을 붙여 관리할 수 있도록 한 것
    SELECT 명령은 실행했을 때 테이블에 저장된 데이터를 결괏값으로 반환한다.
    따라서 이를 객체로 만든 뷰를 참조하면, 그에 정의된 SELECT 명령의 실행결과를 테이블처럼 사용할 수 있다.
    **뷰 작성**

    ```sql
    CREATE VIEW 뷰명 SELECT 명령;
    CREATE VIEW 뷰명(열명1, 열명2, ...) SELECT 명령;
    ```

    **뷰 활용**

    ```sql
    # 서브쿼리 사용한다면,
    SELECT * FROM (SELECT * FROM 테이블명);

    # 서브쿼리를 뷰 객체로 만들어 참조한다면,
    SELECT * FROM view_sample;
    ```

    **뷰 삭제**

    ```sql
    DROP 뷰명;
    ```

    **뷰의 약점**

    - CPU 자원의 사용
      뷰는 저장공간을 소비하지 않는 대신 CPU 자원을 사용한다.
      SELECT 명령은 데이터베이스의 테이블에서 행을 검색해 클라이언트로 반환하는 병령이다. 검색 뿐만이 아니라 ORDER BY로 정렬하거나 GROUP BY로 집계할 수 있습니다. 이러한 처리 능력은 계산 능력을 필요로 하기 때문에, 컴퓨터의 CPU를 사용한다.
    - CPU 자원의 지나친 사용?
      뷰의 근원이 되는 테이블에 보관하는 데이터 양이 많은 경우, 집계처리를 할 때도 뷰가 사용된다면 처리 속도가 많이 떨어진다. 뷰의 중첩해서 사용하는 경우에도 처리속도가 떨어지기 쉽다.
    - 머티리얼라이즈드 뷰(Materialized View)
      일반적으로 뷰는 데이터를 일시적으로 저장했다가, 쿼리가 실행 종료될 때 함 께 삭제된다.
      그에 비해 머티리얼라이즈드 뷰는 데이터를 일시적으로 저장해 사용하는 것이 아니라, 테이블처럼 저장 장치에 저장해두고 사용한다. 처음 참조되었을 때 데이터를 저장해둔다. 이후 다시 참조할 때, 이전에 저장해 두었던 데이터를 그대로 사용한다. 일반적인 뷰처럼 매번 SELECT 명령을 실행할 필요가 없다.
      다만, 뷰에 지정된 테이블의 데이터가 변경된 경우에는 RDBMS가 자동으로 SELECT 명령을 재실행하여 데이터를 다시 저장한다.

- 복수의 테이블 다루기

  - 내부 조인 INNER JOIN
    **INNER JOIN이란?**
    결합조건에 맞는 행(=지정한 두 테이블의 열에 대해, 값이 일치하는 행)만 반환하는 조인

    ```sql
    SELECT * FROM 테이블명1 INNER JOIN 테이블명2 ON 결합조건
    ```

    **예시**
    상품테이블의 "상품분류"가 "식료품"인 상품에 대해, 재고수를 반환한다고 하는 경우

    1. **로직**

    ```sql
    # 상품테이블과 재고수테이블을 복수 테이블로 참조해 곱집합한 후,
    # 상품테이블의 상품 코드 = 재고수의 상품 코드가 서로 일치하는 조건으로 필터링해,
    # PK인 상품 코드로 두 테이블을 '합친다'
    # 만약 더 필요한 조건이 있다면 추가 조건식을 건다.

    SELECT 상품.상품명, 재고수.재고수 FROM 상품, 재고수
    	WHERE 상품.상품코드 = 재고수.상품코드
    		AND 상품.상품분류 = '식료품';
    ```

    1. **INNER JOIN 문법으로 표현**

    ```sql
    SELECT 상품.상품명, 재고수.재고수
    	FROM 상품 INNER JOIN 재고수
    	ON 상품.상품코드 = 재고수.상품코드
    WHERE 상품.상품분류 = '식료품';
    ```

    1. **반환된 결과값**
       [상품](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%91%E1%85%AE%E1%86%B7%2030b3a5274d9645bab438a50253613abc.csv)
       [재고수](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%8C%E1%85%A2%E1%84%80%E1%85%A9%E1%84%89%E1%85%AE%20adcdcece3d3c4d11be7c0ca7498c820f.csv)
       ⬇️
       [결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%20c26e462f2cd1415ca5b4bfd073caac02.csv)
       [상품 테이블 X 재고 테이블의 사본](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%91%E1%85%AE%E1%86%B7%20%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B3%E1%86%AF%20X%20%E1%84%8C%E1%85%A2%E1%84%80%E1%85%A9%20%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%A1%E1%84%87%E1%85%A9%E1%86%AB%20c12c0b706efd45c89ade837833575faf.csv)

  - 외부 조인 OUTER JOIN
    **OUTER JOIN이란?**
    결합조건에 맞지 않는(=지정한 두 테이블의 열에 대해, 값이 일치하지 않는)행 까지, 반환하는 조인
    **LEFT JOIN**
    결합의 왼쪽을 기준으로 조건에 안맞는 행까지 가져온 방식
    조건에 안 맞는 경우 NULL 반환
    **RIGHT JOIN**
    결합의 오른쪽을 기준으로 결합하는 방식
    조건에 안 맞는 경우 NULL 반환
    **예시**

    ```sql
    SELECT 상품.상품명, 재고수.재고수
    	FROM 상품 LEFT JOIN 재고수
    	ON 상품.상품코드 = 재고수.상품코드
    WHERE 상품.상품분류 = '식료품';

    # 왼쪽 '상품' 테이블을 기준으로,
    # 상품.상품코드와 일치하는 재고수.상품코드가 있다면, 해당 행의 상품명(상품테이블)과 재고수(재고수테이블)을 반환
    # 상품.상풍코드와 일치하는 재고수.상품코드가 없다면, NULL을 반환
    # 즉, 상품테이블의 상품명 열은 결합 조건과 무관하게 모두 반환
    ```

    [상품 테이블 X 재고 테이블](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%91%E1%85%AE%E1%86%B7%20%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B3%E1%86%AF%20X%20%E1%84%8C%E1%85%A2%E1%84%80%E1%85%A9%20%E1%84%90%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%B3%E1%86%AF%20ffc9c7df68274b2bb2d16040968ab248.csv)
    ⬇️
    [결과](SQL%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20e5bc6a40ddd24b0eb8eba03e4b70a49c/%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA%20ea48cf94023e47a49f2a41dfdedb1dd6.csv)
