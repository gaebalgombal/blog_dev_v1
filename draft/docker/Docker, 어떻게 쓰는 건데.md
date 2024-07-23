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
