# Docker로 개발 환경을 구성해보았다

2021.09.19

## 🐳 Docker로 개발환경도 구성할 수 있다고?

앞서 Docker가 격리된 '컨테이너'를 통해, 응용프로그램을 쉽게 설치하고 실행하는데 유용하다고 말했다.

그런데 단순히 개별 프로그램의 설치에 유용한 것이 아니다. 종합적인 개발 환경 구성에도 매우 유용하다.

어떤 컴퓨터, 어떤 OS를 사용하든지 동일한 환경을 쉽게 구성할 수 있다.

컨테이너라는 외부와 격리된, 동일한, 환경에 개발환경을 구성하는 것이기 때문이다.

## 🐳 실제로 Docker를 통해 개발 환경 세팅을 해보았다

이번 사이드프로젝트를 진행하면서, docker를 사용해 개발 환경 세팅을 해 보았다. 프레임워크로 Django, DBMS로 MariaDB를 사용하였고, 이를 docker를 사용해 세팅했다. 어떤 프레임워크, 어떤 DBMS, 어떤 프로그램을 사용하느냐에 따라 다르겠지만, 큰 틀에서는 크게 다르지 않을 것이라 생각한다.

## 🐳 이렇게 세팅했다(4줄 요약)

![settings](../../references/draft/docker/settings/settings.png)

최종 구성된 개발환경.

1. DBMS 컨테이너 하나, Django Project 컨테이너 하나를 생성, 총 2개의 컨테이너를 실행한다.
2. Django 컨테이너와, DBMS 컨테이너를 서로 연결한다.
   - 기본적으로 외부와 격리되어 다른 컨테이너를 인식하지 못하므로, 다중 컨테이너를 사용할 경우, 직접 연결해주어야 한다.
3. 컨테이너는 기본적으로 생성시점에 외부와 격리되지만, 필요에 따라서 통로를 만들어 로컬의 데이터와 연결할 수 있다.
   - 여기서는 코드와 데이터를 로컬에 두고 컨테이너와 연결해서 사용했다.
4. 모든 구성은 터미널에서 command를 통해 구성이 가능하지만, docker-compose를 사용하면 좀 더 쉽고 간편하게 구성이 가능하다.
   - 길고 복잡한 command를 미리 'A'파일로 만들어두고, 'A파일에 있는 내용 전부 실행해줘'라고 명령하는 것이라 생각하면 편하다. ('A파일'=docker-compose.yml)

- **⚒ command를 사용해 세팅해보자**

  1. 데이터베이스, Django프로젝트에 대해 각각 이미지 생성

  ![container](../../references/draft/docker/settings/container.png)

  이미지 생성 방식

  1.  Django 프로젝트의 경우, 직접 이미지 생성

      - Dockerfile 작성 → Dockerfile을 통해 이미지 생성

      ```docker
      # Dockerfile
      FROM python:3.9.6 # base image 지정
      ENV PYTHONUNBUFFERED=1
      WORKDIR /code # 컨테이너 내부에 작업 디렉토리 지정
      COPY requirements.txt /code/ # 컨테이너 내부로 파일을 copy
      RUN pip install -r requirements.txt # 실행 때마다 매번 requirements.txt를 설치
      ```

      ```bash
      # django-project라는 이미지 생성
      $ docker build -t django-project .
      ```

  2.  데이터베이스의 경우, 도커허브에 이미 있는 이미지 pull

      - 버전을 특정할 수 있음 `ex) mariadb:10.4.18`

      ```bash
      # mariadb 10.4.18 버전 pull
      $ docker pull mariadb:10.4.18
      ```

2. 이미지를 통해 컨테이너 생성

   1. Django 컨테이너 실행

      ```bash
      $ docker run -it \ # 도커 컨테이너를 생성&실행
          --rm \ # 컨테이너 종료시, 컨테이너를 삭제하는 옵션
      		-p 8000:8000 \ # 8000 포트 사용
      	  django-project \ # django-project라는 이미지를 사용
      		./manage.py runserver 0:8000 # 컨테이너 실행 후 해당 명령어를 실행
      ```

   2. DB 컨테이너 실행

      ```bash
      $ docker run -it --rm \
      		--name mariadb-project \  # 컨테이너 이름을 mariadb-project로
      		-e MYSQL_ROOT_PASSWORD=내가쓸비번 \ # mariadb의 비번 설정
      		-p 3306:3306 \ # 3306 포트 사용
      		-d docker.io/library/mariadb:10.4.18 # mariadb:10.4.18 이미지 사용
      ```

   3. DB 컨테이너와 Django 컨테이너 연결

      - 컨테이너는 각각 독립적인 공간으로 격리되기 때문에, Django 컨테이너와 DB 컨테이너가 서로 모름. 따라서, 수동으로 연결해주는 것이 필요한다.
      - DB 컨테이너를 먼저 실행 후, Django 컨테이너를 실행할 때 아래와 같이 link 옵션/DJANGO_DB_HOST를 통해 DB 컨테이너를 연결한다.

      ```bash
      $ docker run -it --rm \
          -p 8000:8000 \
          --link mariadb-project \  # mariadb-project라는 컨테이너를 연결
          -e DJANGO_DB_HOST= mariadb-project\ # django_db_host를 해당 컨테이너로 설정하는 옵션
          django-project \
          ./manage.py runserver 0:8000
      ```

   4. DB 컨테이너에 통로를 하나 만들어서 로컬의 데이터 ←→ DB 컨테이너 연결

      DB 컨테이너를 stop할 경우 DB 컨테이너를 삭제하는 옵션을 줬을 경우, 데이터를 따로 로컬에 보관해야 하기 때문

      DB 컨테이너 내부의 디렉토리를 로컬의 디렉터리로 연결하여, 로컬 디렉토리에 데이터를 보존

      ```bash
      $ docker run -it --rm \
      		--name mariadb-project \
      		-e MYSQL_ROOT_PASSWORD=내가쓸비번 \
      		-p 3306:3306 \
      		-d docker.io/library/mariadb:10.4.18
      		# 내부 디렉토리(var/lib/mariadb/data)를 로컬 디렉토리(($(pwd)/dockerdata)와 연결
      		--volume=$(pwd)/dockerdata:var/lib/mariadb/data
      ```

   5. Django 프로젝트 컨테이너에 통로를 하나 만들어서 로컬의 코드←→ 장고 컨테이너 연결
      - Dockerfile에서 코드를 COPY해서 컨테이너 안에 넣을 경우, 코드가 컨테이너 안에 들어가고 외부 세상과 격리되기 때문에, 이후 수정하는 코드가 컨테이너에 영향을 미치지 않는다.
      - 그런데 개발환경이기 때문에, 실시간으로 코드를 수정하고 서버를 호출해보며 디버깅을 해야 한다.
      - 이를 해결하기 위해, (코드를 COPY해서 컨테이너 안에 넣는 대신), Django컨테이너에 통로를 하나 만들어서, 외부 세상(로컬)의 코드와 컨테이너를 연결한다.

3. 요약

   - Django 이미지 생성 → DB이미지 pull → DB 컨테이너 실행 → Django 컨테이너 실행

   ```bash
   # DBMS 컨테이너 생성&실행
   $ docker run -it --rm \
   		--name mariadb-project \
   		-e MYSQL_ROOT_PASSWORD=내가쓸비번 \
   		-p 3306:3306 \
   		-d docker.io/library/mariadb:10.4.18
   		--volume=$(pwd)/dockerdata:var/lib/mariadb/data
   ```

   ```bash
   # Django 컨테이너 생성&실행
   $ docker run -it --rm \
       -p 8000:8000 \
       django-sample \
       ./manage.py runserver 0:8000 \
   		--volume=$(pwd):/app/ # 외부 세상(로컬)의 코드와 연결하는 옵션
   ```

- **⚒ docker-compose를 사용해 한 줄로 요약해보자**
  분명 Docker를 사용하면 매우 간편하다고 했는데, 이 긴 command를 다 쳐야 한다니, 뭔가 좀 속은 기분이다. 이게 뭐지? 싶을 것이다. 하지만 걱정하지 말자. Docker는 생각보다 강력하다! 이 모든 걸 한 줄로 바꿔버릴 수 있는 방법이 있다.
  이 문제를 해결하기 위해 등장한 것이 docker-compose다. docker-compose란, 쉽게 말해서, 쉽게 말하면, 이 길고 복잡한 command를 미리 'A'라는 파일로 만들어두고, 'A파일에 있는 내용대로 전부 실행해줘'라고 명령하는 것이다다. 그리고 이 A파일이 바로 docker-compose.yml 파일이다.

  ### **❗️docker-compose.yml 구조**

  ```docker
  version: '3'

  services:
  		컨테이너 이름:
  				image: 컨테이너 생성에 사용할 이미지 이름
  				volumes: 사용할 디렉터리 이름(외부와 연결할 경우, 외부 디렉토리 지정)
  				environments: 각종 환경변수, -e 옵션과 동일
  				ports: 사용할 포트, -p 옵션과 동일
  				command: 컨테이너 실행과 동시에 실행할 명령어, 예)runserver

  		컨테이너 이름:
  				build:
  					context: 컨테이너 생성할 사용할 Dockerfile의 위치
  					dockerfile: 컨테이너 생성에 사용할 Dockerfile
  				depends_on: 다른 컨테이너 연결, link와 동일한 옵션
  				volumes: 사용할 디렉터리 이름(외부와 연결할 경우, 외부 디렉토리 지정)
  				environment: 각종 환경변수
  				ports: 사용할 포트
  				command: 컨테이너 실행과 동시에 실행할 명령어, 예)runserver

  ```

  ### **❗️docker-compose.yml 예시**

  ```docker
  version: '3'

  volumes:
    django_sample_db_dev: {}

  services:
    mariadbproject:
      image: mariadb:10.4.18
      volumes:
        - django_sample_db_dev:/var/lib/mariadb/data
      environment:
        - MYSQL_DATABASE=icango
        - MYSQL_USER=root
        - MYSQL_ROOT_PASSWORD=applemango00
        - MYSQL_INITDB_ARGS=--encoding=UTF-8
      ports:
        - "3306:3306"
      command:
        - "python"
        - "manage.py"
        - "migrate"

    djangoproject:
      build:
        context: .
        dockerfile: ./Dockerfile
      environment:
        - DJANGO_DEBUG=True
        - DJANGO_DB_HOST=mariadbproject
        - DJANGO_DB_PORT=3306
        - DJANGO_DB_NAME=mariadbproject
        - DJANGO_DB_USERNAME=root
        - DJANGO_DB_PASSWORD=applemango00
        - DJANGO_SECRET_KEY=dev_secret_key
      ports:
        - "8000:8000"
      command:
        - "python"
        - "manage.py"
        - "runserver"
        - "0:8000"
      volumes:
        - ./:/code
      depends_on:
        - mariadbproject
  ```

- **⚒ 세팅을 개선해보자**
  1. Dockerfile(배포용)과, Dockerfile-dev(개발용)을 각각 관리하자
     - 개발용의 경우, 컨테이너 실행 후에도 로컬의 코드가 통로를 통해 도커 컨테이너에 실시간으로 반영되도록 구성(실시간 디버깅 가능)
     - 배포용의 경우, 컨테이너 실행 시점에 로컬의 코드를 복사해 컨테이너 안에 넣은 후, 컨테이너를 외부와 격리
  2. DB의 데이터를 로컬 디렉토리가 아닌, docker의 가상 volume으로 변경해보자
     - 실수로 디렉토리를 삭제하는 등의 실수를 방지
     - DB컨테이너가 아닌, 가상 volume이라는 별도의 공간에 데이터를 보관하는 것임을 유의해야 함
- **⚒ docker-compose의 명령어를 익혀보자**
  1. docker-compose up
     - docker-compose.yml의 파일 내용을 실행하는 명령어
     - 실행 과정
       1. 서비스를 띄울 네트워크 설정
       2. 필요한 볼륨 생성(혹은 이미 존재하는 볼륨과 연결)
       3. 필요한 이미지 풀(pull)
       4. 필요한 이미지 빌드(build)
       5. 서비스 의존성에 따라 서비스 실행
     - 옵션
       - `d`: 서비스 실행 후 콘솔로 빠져나옵니다. (`docker run`에서의 `d`와 같습니다.)
       - `-force-recreate`: 컨테이너를 지우고 새로 만듭니다.
       - `-build`: 서비스 시작 전 이미지를 새로 만듭니다.
     - Tip
       - docker-compose.yml 파일을 수정했을 때: docker-compose up -d [서비스 이름]
         알아서 컨테이너를 재생성하고 서비스를 재시작
       - Dockerfile-dev 파일을 수정했을 때 : docker-compose up -d —build [서비스 이름]
         알아서 이미지를 새로 만들고 서비스를 재시작
  2. docker-compose ps : 실행중인 서비스 리스트
  3. docker-compose start : 서비스 시작
  4. docker-compose stop: 서비스 종료
  5. docker-compose down: 서비스 삭제
  6. docker-compose exec: 실행중인 컨테이너에 명령어를 실행
  7. docker-compose run: 실행중인 컨테이너에 명령어를 실행. 단, 컨테이너를 새로 생성
  8. docker-compose run —rm: 컨테이너 종료 후 자동 삭제 옵션 추가. docker-compose exec과 동일
  9. docker-compose logs: 로그 확인

## 🐳 실제 코드

### **❗️Dockerfile**

```docker
# django project용 이미지 생성

FROM python:3.9.6
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
```

### **❗️docker-compose.yml**

```docker
# django project, mariadb 컨테이너 생성 & 실행

version: '3'

volumes:
  django_sample_db_dev: {}

services:
  mariadbproject:
    image: mariadb:10.4.18
    volumes:
      - django_sample_db_dev:/var/lib/mariadb/data
    environment:
      - MYSQL_DATABASE=icango
      - MYSQL_USER=root
      - MYSQL_ROOT_PASSWORD=applemango00
      - MYSQL_INITDB_ARGS=--encoding=UTF-8
    ports:
      - "3306:3306"
    command:
      - "python"
      - "manage.py"
      - "migrate"

  djangoproject:
    build:
      context: .
      dockerfile: ./Dockerfile
    environment:
      - DJANGO_DEBUG=True
      - DJANGO_DB_HOST=mariadbproject
      - DJANGO_DB_PORT=3306
      - DJANGO_DB_NAME=mariadbproject
      - DJANGO_DB_USERNAME=root
      - DJANGO_DB_PASSWORD=applemango00
      - DJANGO_SECRET_KEY=dev_secret_key
    ports:
      - "8000:8000"
    command:
      - "python"
      - "manage.py"
      - "runserver"
      - "0:8000"
    volumes:
      - ./:/code
    depends_on:
      - mariadbproject
```
