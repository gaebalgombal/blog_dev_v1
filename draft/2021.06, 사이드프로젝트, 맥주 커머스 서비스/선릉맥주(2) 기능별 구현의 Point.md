# 선릉맥주(2) 기능별 구현의 Point

**2001년 6월 19일2001년 6월 19일**

**Written By [anne shirley](https://www.todayitanzada.com/?author=600ccc46fca7d614a7dbe498)**

1. 상품리스트 조회의 POINT
1. 한 페이지 내에서도 여러 개의 요청을 나누어 보낼 수 있다
   ex) ‘상품 리스트’ 페이지에는 카테고리와 상품리스트 페이지가 필요한데, 둘을 각각 나누어 요청을 보낼 수도 있다.
   카테고리 정보는 처음 한 번만 보내고, 상품리스트는 페이지&필터링이 바뀔 때마다 매번 요청을 보내야 하기 때문.
1. DB는 최대한 한 번만, 모든 작업이 끝난 후 마지막에 가져온다.
   ex) 필터링 & 페이징을 할 경우, 필터링을 해서 DB를 가져온 후 >> 줄을 세워 페이지를 나누는 게 아니라
   필터링, 페이징을 모두 끝낸 후 >> 딱 필요한 DB만 가져온다
1. IF 조건문은 최대한 간결하게 가독성이 좋게 쓴다.
1. For Loop 대신 List Comprehenshion을 사용해보자
1. 데이를 조회할 때는, 여러 테이블의 데이터를 모두 가져오기 보다는, 참조/역참조를 사용해서 최대한 하나의 테이블(모델)을 통해 모두 가져오자.

`q = Q()

if subcategories:
q &= Q(sub_category**english_name=subcategories)
elif category:
q &= Q(sub_category**category\_\_english_name=category)

_# if, elif, else를 나누는 대신 디폴트값/if/elif 로 나눈 것._`

1. 주문 등록의 POINT
1. 보통 결제 금액은 프런트에서 모두 처리(계산)하고 서버에는 받은 금액을 저장하기만 할까?
   > > 현재 우리 프로젝트에서는 그렇게 구현.
   > > 실제 서비스에서 결제를 할 경우, 어떻게 되는지 공부해봐야겠다
1. 트랜잭션 처리를 할 때, 서버상 에러가 아닌 우리가 자체적으로 설정한 조건부 에러에 대해서도 '에러'라고 인식하여 실패하게 하려면 어떻게 해야 할까?
   > > 롤백 메서드를 공부해보자.
1. 데이터 ‘테이블’ 기준으로 View Class를 작성하자
   ex) Class OrderView(View) >> GET(주문정보 조회), POST(주문정보 등록), PUT(주문정보 수정…)
   AccountView(View) >> GET(유저 정보 조회), …
   설사 유저 정보를 주문 페이지에서 조회하더라도, ‘페이지’ 기준이 아닌 ‘데이터 테이블’ 기준으로, 각각 View와 App을 나누는 것이 맞다.
   유저 정보를 주문 페이지에서 조회하더라도, Orders 앱의 OrderView의 GET은 주문 정보 조회 / Users 앱의 AccountView의 GET이 유저 정보 조회 이런 식으로.
