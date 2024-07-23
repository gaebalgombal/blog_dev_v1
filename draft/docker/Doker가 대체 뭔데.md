# Doker가 대체 뭔데?

2021.09.19

## 🐳 Docker란?

컨테이너 기반의 오픈소스 가상화 플랫폼이자 생태계.

컨테이너를 사용하여 응용프로그램을 더 쉽게 만들고 배포하고 실행할 수 있도록 설계된 도구.

## 🐳 Docker가 대체 뭐라고?

이렇게만 말하면 그러니까 그게 대체 뭔데? 무슨 말이야? 싶을 것이다.

한 번 예시를 들어보자. 아래 예시는 내가 실제로 겪었던 상황이다.

개발 공부를 처음 시작할 때 DBMS로 MySQL을 사용했다.(가장 보편적이고 교재도 많으므로) 그런데 회사 인턴으로 갔더니, MariaDB를 사용해야 한단다. 그래서 Maria DB를 깔려고 봤더니, 이런! MySQL과 MariaDB는 둘다 mysqlclient을 사용하기 때문에 두 프로그램이 충돌이 난다는 것이다!

멘붕에 빠져 그럼 대체 어떻게 해야 하는데? 싶어 검색을 해보니, MariaDB를 도커로 깔면 된단다. 도커로 깔면 외부와 격리된 '컨테이너'라는 공간에서 실행을 시키기 때문에, 충돌이 나지 않는다는 것이다. 물론 다른 방법들도 존재했지만, 도커를 사용하는 방법이 가장 간단하고, 편했다.

이처럼 개발을 하다보면 수많은 프로그램과, 프로그램의 수많은 버전들이 필요하다. 하다못해 같은 MySQL도 각기 다른 버전이 필요할 때가 있다. 이 때 이 프로그램들을 무작정 깔게 된다면 수많은 에러와 충돌의 늪에서 빠져나오지 못하게 될 것이다.

![meme](../../references/draft/docker/what/meme.jpeg)

이 때 Docker를 사용하게 되면, 외부와 격리된 '컨테이너'를 사용하여 충돌과 에러 없이, 응용프로그램을 더 쉽게 설치하고, 만들고, 배포하고, 실행할 수 있다.

## 🐳 왜, Docker인가?

Docker를 사용하면, 외부와 격리된 '컨테이너'를 사용하여 충돌과 에러 없이, 응용 프로그램을 더 쉽게 설치하고, 만들고, 배포하고, 실행할 수 있다.

## 🐳 왜, 하필 Docker인가?

컴퓨터의 일부를 격리시키는 기술은 새로운 것이 아니다. 이미 Docker이전에 여러 기술이 존재했다. 그렇다면 Docker가 기존의 기술에 비해 지닌 장점은 뭘까? 바로 훨씬 가볍고 빠르며 쉽다는 것이다.

기존 VM 가상화 기술의 경우, 물리적인 하드웨어 위에, HOST OS 위에, Hypervisor 위에, Guest OS를 여러 개 운용하는 방식이다. 반면, Docker의 경우, HOST OS 위에, Docker 엔진 위에, 앱만 여러개 운용하는 방식이다. Guest OS를 여러 개 돌리는 것보다, 훨씬 가벼울 수 밖에 없다.

## 🐳 Docker, 어떻게 구성 되는가?

![structure](../../references/draft/docker/what/structure.png)

[출처: 따라하며 배우는 도커와 CI 환경(강의), 인프런](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%8F%84%EC%BB%A4-ci/dashboard)

도커는 크게 이미지와 컨테이너로 구성이 된다.

컨테이너란, 마치 화물 컨테이너처럼, 컴퓨터 안에 만들어진 '격리된 화물칸' 같은 것이다. 도커의 가상화 기술은 바로 이 컴퓨터 안 화물칸을 만들어, 그 안에서 프로세스가 독립적으로 동작하도록 하는 기술인 것이다.

그리고 이미지란, '컨테이너의 실행에 필요한 모든 값을 가진 것'이다. 이 '이미지' 역시 도커의 핵심 기술이자 장점 중 하나다. 하나의 컨테이너에 프로그램을 실행하기 위해서는 몇백메가에 이르는 용량의 정보가 필요하다. 그런데 도커는 이걸 '여러 겹의 레이어'로 만들어버렸다.

이게 무슨 말이냐고? 아래 설명을 참고해보자.

> _ubuntu 이미지가 A + B + C의 집합이라면, ubuntu 이미지를 베이스로 만든 nginx 이미지는 A + B + C + nginx가 됩니다. webapp 이미지를 nginx 이미지 기반으로 만들었다면 예상대로 A + B + C + nginx + source 레이어로 구성됩니다. webapp 소스를 수정하면 A, B, C, nginx 레이어를 제외한 새로운 source(v2) 레이어만 다운받으면 되기 때문에 굉장히 효율적으로 이미지를 관리할 수 있습니다. (개이득)
> [- 출처: 초보를 위한 Docker 안내서(도커란 무엇인가?)](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)_

# Docker, 어떻게 쓰는 건데?

2021.09.19

이제 Docker가 뭔지는 대충 알겠다. 근데 그래서, 실제로 어떻게 써야 하는 걸까?

Docker를 실제로 어떻게 사용하는지 알아보자.

먼저, MariaDB 컨테이너 실행을 통해 가장 기본적인 컨테이너 생성과 실행 방법을 알아볼 것이다.

## **🐳** 컨테이너 생성&실행 방법

1. Docker 설치
   - docker 홈페이지 들어가서 맞는 버전 찾아서 설치하면 된다. 어려운 부분 아니니 생략.
2. Docker 가입&로그인
3. Docker Hub에 있는 mariadb 이미지를 다운

   - 많은 프로그램들이 이미 Docker Hub에 이미 이미지를 올려놓았고, 이를 다운받아 사용하면 됨.
   - 'mariadb: 특정버전'으로 버전 특정 가능 ex) mariadb:10.4.18

   ```bash
   docker pull mariadb:10.4.18
   ```

   - 이미지가 잘 설치 되어 있는지 확인하려면?
     내가 다운 받은 Docker 이미지들의 리스트를 확인하는 명령어

   ```bash
   docker images
   ```

4. 이제, 이미지를 가지고 컨테이너를 생성

   ```bash
   docker run \
   --name {컨테이너이름} \ # 컨테이너 이름 설정
   -e MYSQL_ROOT_PASSWORD=내가쓸비번 \ # 각종 환경변수 설정, 여기서는 mariadb 비번 설정
   -p 3306:3306 \ # 포트 설정
   -d docker.io/library/mariadb:10.4.18
   ```

   - 각종 변수들을 설정해줄 수 있다.
   - 실제로 회사 인턴 중, 로컬에 이미 MySQL이 깔려 있는 상태에서, MariaDB를 깔아야 하는 상황이었기 때문에, 포트를 다르게 설정해주어야 했다. 때문에 -p를 사용하여 포트를 다르게 설정해주었다.
   - 컨테이너가 잘 설치되어 있는지 확인하려면?
     생성된 컨테이너 리스트를 확인하는 명령어

   ```bash
   docker ps -a
   # -a 는 전부를 의미
   ```

5. 컨테이너 생성, 실행, 중단, 삭제

   ```bash
   # 생성 & 실행
   docker run --name {컨테이너 이름} -d docker.io/library/mariadb:10.4.18
   # 생성만
   docker create --name {컨테이너 이름} -d docker.io/library/mariadb:10.4.18
   # (기생성된 컨테이너)시작
   docker start {컨테이너 이름 or ID}
   # 재시작
   docker restart {컨테이너 이름 or ID}
   # 중단
   docker stop {컨테이너 이름 or ID}
   # 삭제
   docker container rm {컨테이너 이름 or ID}
   ```

6. 끝! 이제 컨테이너에 접속하는 방법

   ```bash
   # 도커 컨테이너로 접속, 쉘을 실행
   docker exec -it {컨테이너ID}

   # 예를 들어, mariadb 컨테이너로 접속한다면
   docker exec -it {컨테이너ID} # 접속
   mariadb -u root -p # mariadb 실행
   ```

7. 이것 저것 Tip

   - 도커 컨테이너의 IP를 확인하는 방법

   ```bash
   docker inspect {컨테이너ID} | grep IPAddres
   ```

   - 확인한 컨테이너의 ip를 이용해 컨테이너에 접속할 수도 있다.
     예를 들어, 로컬에서 도커 컨테이너에 설치한 mariadb에 접속한다고 해보자.

   ```bash
   # ip 주소 확인 후,
   docker inspect {컨테이너ID} | grep IPAddres

   # mysqlclient에서 host를 지정해서 접속
   mysql -h {IPAddress} -u root -p
   ```

   - 컨테이너 종료 시, 컨테이너를 삭제하는 옵션을 줄 수도 있다.

   ```bash
   docker run -it --rm \   # --rm 종료시 삭제 옵션
   {이미지이름}
   ```
