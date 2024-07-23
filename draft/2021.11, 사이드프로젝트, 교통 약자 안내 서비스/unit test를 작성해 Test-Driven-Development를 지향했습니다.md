# unit test를 작성해 Test-Driven-Development를 지향했습니다

## 🧐 Test-Driven-Development

TDD(Test-Driven-Development), 즉 테스트 주도 개발이 중요하다고들 한다. 하지만 중요하다니까 해야 한다니까 한다, 해서 하는 게 아니라, **직접 unit test를 작성해보니, 테스트를 활용하는 것이 굉장히 효율적이고, 체계적이라는 것을 실감할 수 있었다**. 그래서 이번 프로젝트에서도 unit test를 작성하고 테스트를 기반 설계를 지향했다.

## 🧐 unit test는 왜 좋은 도구인가?

### 🙌 unit test는 왜 좋은 도구인가?

유닛 테스트는 1) 어떤 요청을 보내면, 2) 어떤 응답을 받는지 코드로 정의하고, 3) 그대로 작동하는지 테스트하는 도구다. 따라서, 테스트 코드를 작성하는 과정에서 빠짐없이, 구현 사항을 정확하게 코드로 ‘번역'할 수 있다.

**구현사항을 코드로 문서화하는 도구**

![toolkit](../../references/draft/2022.11_transportation/unit_test/toolkit.png)

```python
class Test:
    def test_feature_200(self):
	      # api로 테스트 요청을 보내는 객체
				client = Client()

				# 테스트 요청의 내용 정의
				response = client.post(
				    '/test/feature',         # 요청 url
            data = {"data":"data"}   # 요청의 내용
        )

        # 받아야 하는 응답의 내용 정의
				# 테스트 요청으로 받은 응답과, 받아야 하는 응답이 일치하는지 테스트
				self.assertEqual(
						{
               "data" : "data"    # 받아야 하는 응답의 내용
            },
				    response.json()       # 테스트 요청으로 받은 응답의 내용

				)

				self.assertEqual(
            200,                   # 받아야 하는 응답의 상태 코드
				    response.statuscode    # 테스트 요청으로 받은 응답의 상태 코드
				)
```

### 🙌 왜 unit test를 작성하면 도움이 될까?

1. 구현 사항에 대한 정확한 이해
   - 테스트 코드 작성을 통해 구현 사항을 빠짐없이 이해하고 기능 구현을 시작하면, 코드를 체계적으로 밑에서부터 쌓아올릴 수 있다.
2. 구현 사항의 문서화
   - 테스트 코드에는 요청-응답의 내용이 간결하고 정확하게 명시되어 있기 때문에, 테스트 코드를 보면 프로젝트 코드를 쉽게 이해할 수 있다.
   - 따라서 팀원들과 협업하고, 레거시 코드를 이해하는데 좋은 도구가 된다.
   - 또 추후에 기술 부채를 갚을 수 있는 기반이 되기도 한다.
3. 반복적이고 효율적인 테스트를 통해 빠른 작업이 가능
   - 매일 아침에 유닛 테스트 → 문제 점검 완료 → 얼른 다음 작업에 착수할 수 있다!
   - 코딩을 하는 과정 - 기능 추가, 유지보수, 리팩토링 등 -의 과정에는, 끊임없이 테스트가 필요하다. 새로운 코드가 기존 코드에 영향을 미칠 수 있기 때문이다. 특히 정신없이 개발 작업을 하다보면 기존 코드가 망가지는 것도 모르고 작업을 진행할 수도 있다. 그렇다고 매일 E2E테스트를 하는 것은 시간 낭비가 너무 크다. 이 때, 매일 테스트 코드로 자동으로 쉽고 빠르게 테스트를 진행, 점검하고 다음 코드를 작성할 수 있다. 시간 낭비를 줄일 수 있다.

## 🧐 어떻게 unit test를 작성했나?

- 규모가 작은 프로젝트이므로, 100% 커버를 목표로 작성
  각 구현 상황에 대해, 성공과, 실패 케이스별로 테스트 작성
  커버리지 비율이 중요한 것은 아니지만, 규모가 작은 사이드 프로젝트이므로 100% 커버를 목표로 작성
- 외부 종속성으로부터 독립된 형태로 작성
  외부 의존성(ex.서드파티 등)은 외부에 맡겨두고, 내부 로직만 검증

## 🧐 무엇을 작성했나?

### 🙌 규모가 작은 프로젝트이므로, 100% 커버리지를 목표로 unit test 작성

- **기능 → 기능별 unit test**

| 메서드 \ 기능 | 회원가입 | 로그인        | 인증/인가     | 리프레시 토큰 발행 | 게시판                            | 역 검색  |
| ------------- | -------- | ------------- | ------------- | ------------------ | --------------------------------- | -------- |
| POST          | 201 성공 | 200 성공      |               |                    | 201 등록 성공                     |          |
|               | 400 실패 | 401 인증 실패 |               |                    | 400 등록 실패 - 데이터베이스 제약 |          |
| GET           |          |               | 200 성공      | 200 성공           | 200 리스트 조회 성공              | 200 성공 |
|               |          |               | 200 성공      | 401 인증 실패      | 200 게시글 조회 성공              | 400 실패 |
|               |          |               | 401 인증 실패 |                    | 400 리스트 조회 실패              |          |
|               |          |               | 403 인가 실패 |                    | 400 게시글 조회 실패              |          |
| PUT           |          |               |               |                    | 200 수정 성공                     |          |
|               |          |               |               |                    | 404 수정 실패 - not found         |          |
| DELETE        |          |               |               |                    | 200 삭제 성공                     |          |
|               |          |               |               |                    | 404 삭제 실패 - not found         |          |

### 🙌 실제 코드

- 회원가입

  ```python
  def test_sign_up_201(self):
  	# 201 성공

  def test_sign_up_400_account_with_this_username_already_exists(self):
  	# 400 실패 - 같은 이름의 유저가 이미 존재, 가입이 불가능한 경우
  ```

- 로그인

  ```python
  def test_sign_in_200(self):
  	# 200 성공

  def test_sign_in_401_no_active_account_found_with_given_credentials(self):
  	# 401 인증 실패 - 유저 계정이 없는 경우

  ## 리프레스 토큰으로 액세슨 토큰 재발행
  def test_reissue_access_token_with_refresh_token_200(self):
  	# 200 발행 성공

  def test_reissue_access_token_with_refresh_token_401_with_invalid_refresh_token(self):
  	# 401 인증 실패 - 리프레시 토큰이 유효하지 않은 경우

  def test_reissue_access_token_with_refresh_token_400_with_no_refresh_token(self):
  	# 400 인증 실패 - 리프레시 토큰이 안 들어 있는 경우
  ```

- 인증(액세스 토큰)

  ```python
  def test_authentication_200_passes_permssion_classes_isauthenticated_with_access_token(self):
  	# 200 성공

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_invalid_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 유효하지 않은 경우

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_invalid_type_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 타입이 유효하지 않은 경우

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_no_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 안 들어있는 경우
  ```

- 인가

  ```python
  def test_authentication_200_passes_permssion_classes_isauthenticated_with_access_token(self):
  	# 200 성공

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_invalid_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 유효하지 않은 경우

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_invalid_type_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 타입이 유효하지 않은 경우

  def test_authentication_401_fails_permssion_classes_isauthenticated_with_no_access_token(self):
  	# 401 인증 실패 - 액세스 토큰이 안 들어있는 경우
  ```

- 피드백 게시판

  ```python
  def test_feedback_get_queryset_200(self):
  	# 200 성공 - 게시글 리스트 조회

  def test_feedback_get_object_200(self):
  	# 200 실패 - 게시글 조회

  def test_feedback_get_object_404_not_found(self):
  	# 404 실패 - 게시글이 존재하지 않는 경우

  def test_feedback_post_201(self, mocked_api_post):
  	# 201 성공 - 게시글 등록

  def test_feedback_post_400_database_constraint_error(self, mocked_api_post):
  	# 400 실패 - 데이터 형식 제약에 걸려 게시글 등록 실패

  def test_feedback_put_200_create_feedbackimage(self, mocked_api_post, mocked_api_delete):
  	# 200 성공 - 게시글 수정 & 이미지 추가

  def test_feedback_put_200_delete_feedbackimage(self, mocked_api_post, mocked_api_delete):
  	# 200 성공 - 게시글 수정 & 이미지 삭제

  def test_feedback_put_404_not_found(self, mocked_api_post, mocked_api_delete):
  	# 404 실패 - 게시글이 존재 하지 않는 경우

  def test_feedback_delete_200(self, mocked_api_delete):
  	# 200 성공 - 게시글 삭제

  def test_feedback_delete_404_not_found(self, mocked_api_delete):
  	# 404 실패 - 게시글이 존재하지 않아 삭제가 불가능한 경우
  ```

- 역 검색
  ```python
  def test_station_get_queryset_200(self):
  	# 200 성공 - 역 검색결과 조회 성공
  ```

### 🙌 외부 종속성으로부터 독립된 형태로 unit test 작성

- Mocking을 통해, 외부 의존성을 분리하고, 내부 로직만 검증할 수 있도록 검증
- Mocking이란?
  서드 파티를 요청하는 경우, 서드파티 요청이 서드 파티 대신, 테스트 함수로 들어오도록 하고, 테스트 코함수 내에서 서드파티 요청에 따른 응답을 가짜로 만들어 대신 집어넣는 것
- 왜 Mocking을 사용하나?
  1. unit test는 내가 작성하는 코드가 기존 코드에 미치는 영향을 검증하고, 2) 작은 단위로 쪼개어 빠르게 오류를 추적하는 것이 목적이기 때문
     따라서, 외부 의존성은 오히려 테스트를 방해한다(만약 외부에서 문제가 발생하면 테스트가 실패 → 문제 원인을 찾을 수가 없음)

### 🙌 실제 코드

```python
class Test(TestCase):
	def setUpTestData(cls):
		# 테스트용 DB 생성

		# AWS s3 호출을 test 함수로 patch해옴 # 가짜 응답(return_value)를 대신 집어넣음
    @patch("accounts.utils.BaseS3.api_post", return_value=None)
    def test_feedback_post_201(self, mocked_api_post):
        client   = APIClient()
        user     = Account.objects.filter(username="user").first()
        image_1  = TemporaryUploadedFile("image.png", content_type="image/png", size=10, charset="utf8mb4")
        image_2  = TemporaryUploadedFile("image.png", content_type="image/png", size=10, charset="utf8mb4")

        client.force_authenticate(user=user)
        response = client.post(
            "/accounts/feedback",
            data = {
                "tag" : "new_tag",
                "title" : "new_title",
                "content" : "new_content",
                "feedbackimage_set_create" : [image_1, image_2]
            }
        )

        if response.json().get("create_at"):
            response.json()["create_at"] = "create_at"
        if response.json().get("update_at"):
            response.json()["update_at"] = "update_at"

        for r in response.json().get("feedbackimage_set"):
            if r.get("image_path"):
                r["image_path"] = "image_path"

        self.assertEqual(
            response.json(),
            {
                "id": 4,
                "tag": "new_tag",
                "title": "new_title",
                "content": "new_content",
                "feedbackimage_set" : [
                    {
                        "id": 7,
                        "image_path": "image_path"
                    },
                    {
                        "id": 8,
                        "image_path": "image_path"
                    }
                ],
                "create_at": "create_at",
                "update_at": "update_at",
                "delete_at": None,
                "is_deleted": False,
                "is_solved": False
            }
        )

        self.assertEqual(
            response.status_code, 201
        )
```

### 🙌 unit test 실행 결과

![result](../../references/draft/2022.11_transportation/unit_test/result.png)
