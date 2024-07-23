# Class, 어떻게 쓸까?

- **클래스**
    
    **기본구조**
    
    ```python
    class Pizza:
    		def __init__(self):    # 초기화메서드
    				self.introduction = "안녕하세요. 저는 피자입니다." # 속성
    		
    		def introduce(self):    # 메서드
    				print(self.introduce)
    
    pizza = Pizza()    # 인스턴스생성
    ```
    
    ```python
    >>> pizza.introduce()
    안녕하세요. 저는 피자입니다.
    ```
    
- **속성**
    
    **인스턴스 속성 vs 클래스 속성**
    
    ```python
    class Pizza:
        base_ingredients =['밀가루', '치즈', '이스트']   # 클래스 속성
    		
        def __init__(self, name, topping, price):    # 인스턴스속성
            self.name    = name
            self.topping = topping
            self.price   = price
        
        def introduce_name(self):
            print(f"안녕하세요, 저는 {self.name} 입니다.")
    
        def introduce_ingredients(self):
            print(f"기본 재료는 {cls.base_ingredients} 입니다.")
    
    cheesepizza = Pizza(name="치즈피자", topping="치즈", price=20000)
    cheesepizza.introduce_ingredients()
    ```
    
    **인스턴스 속성**
    
    인스턴스의 독립적인 속성.
    
    처음 인스턴스를 생성할 때, 초기화된 속성이 포함되며, 해당 인스턴스에서 조작할 수 있음.
    
    ex)  피자는 각자 이름, 토핑, 가격이 있다. → 피자 인스턴스의 속성
    
    ```python
    >>> cheesepizza.introduce_name()
    안녕하세요, 저는 치즈피자 입니다.
    ```
    
    **클래스 속성**
    
    모든 인스턴스에서 공유하는 속성. 변경할 경우, 모든 인스턴스에 적용이 된다.
    
    ex) 모든 피자는 기본 재료인 밀가루, 치즈, 이스트를 가지고 있다. → 피자 클래스의 속성
    
    ```python
    >>> cheesepizza.introduce_ingredients()
    기본 재료는 ['밀가루', '치즈', '이스트'] 입니다.
    ```
    
- **속성의 변경**
    
    개별 인스턴스에서 인스턴스 속성을 변경할 수 있으며, 해당 개별 인스턴스에 변경된다.
    
    클래스 속성을 변경할 경우, 모든 인스턴스에 적용된다.
    
    ```python
    
    class Pizza:
        base_ingredients = ['밀가루', '치즈', '이스트']   # 클래스 속성
    		
        def __init__(self, name, topping, price):     # 인스턴스속성
            self.name    = name
            self.topping = topping
            self.price   = price
    
        def add_ingredients(self, ingredient):
            self.ingredients.append(ingredient)
    
    cheesepizza = Pizza(name="치즈피자", topping="치즈", price=20000)
    pepperonipizza = Pizza(name="페퍼로니피자", topping="페퍼로니", price=30000)
    ```
    
    **인스턴스 속성의 변경**
    
    ```python
    >>> cheesepizza.topping
    치즈
    >>> cheesepizza.topping = "모짜렐라치즈"    # 인스텀스 속성을 변경하면
    >>> cheesepizza.topping                  # 인스턴스에서 변경된다.
    모짜렐라치즈
    >>> pepperonipizza.topping               # 다른 인스턴스에서는 영향 없음
    ```
    
    **클래스 속성의 변경**
    
    ```python
    >>> cheesepizza.add_ingredients("토마토")    # 클래스 속성을 변경하면
    >>> cheesepizza.base_ingredients            # 모든 인스턴스에서 변경됨
    ['밀가루', '치즈', '이스트', '토마토']
    >>> pepperonipizza.base_ingredients         # 모든 인스턴스에서 변경됨
    ['밀가루', '치즈', '이스트', '토마토']
    ```
    
- **비공개 속성**
    
    클래스 외부에서는 접근할 수 없고 클래스 내부에서만 접근 가능한 속성.
    
    객체의 정보를 은닉 또는 격리하기 위해 사용하며, __를 통해 구현한다.(언더바 2개)
    
    - 사실 __는 엄밀히 말해 비공개 속성이 아니라 name mangling을 하는 방법이다.
        
        *[참고. 파이썬은 어떻게 객체를 은닉할까?](https://www.notion.so/3e5d2fe5aa2148ffbe9e3ba010d5e912?pvs=21)*
        
    
    ```python
    class User:
        __item_limit = 10.           # 비공개 클래스속성
    
        def __init__(self, wallet):
    		    self.__wallet = wallet   # 비공개 인스턴스속성
    ```
    
- **메서드**
    
    **메서드 vs 정적 메서드 vs 클래스 메서드**
    
    ```python
    class A:
        def func(self, x):    # 메서드
            print(f"method: {self}, {x}")
        
        @classmethod    # 클래스메서드
        def classmethod_func(cls, x):
            print(f"classmethod: {cls}, {x}")
    
        @staticmethod    # 정적메서드
        def staticmethod_func(x):
            print(f"staticmethod: {x}")
    
    a = A()
    ```
    
    **메서드 method**
    
    클래스에 정의되어 인스턴스에 결합한 함수 = self를 첫번째 argument로 받는다.
    
    ```python
    >>> a.func(x="x")
    method: <__main__.A object at 0x103254820>, x
    ```
    
    **정적 메서드 static method**
    
    클래스, 인스턴스 둘다와 결합되어 있지 않은 순수 함수 = self, cls 둘다 인자로 받지 *않는다*.
    
    일반적인 함수인데, 클래스나 인스턴스에서 호출하여 쓸 수 있도록 클래스 내부에 정의한 인스턴스라고 생각하면 편하다.
    
    ```python
    >>> a.staticmethod_func(x="x")
    staticmethod: x
    ```
    
    **클래스 메서드 class method**
    
    오브젝트가 아닌, 클래스에 결합되어 있는 메서드. = cls를 첫번째 argument로 받는다.
    
    ```python
    >>> a.classmethod_func(x="x")
    classmethod: <class '__main__.A'>, x
    ```
    
    **왜 static method가 필요한가?**
    
    1. 매번 인스턴스를 만들 때마다, bound method의 인스턴스를 만들 필요가 없다. bound method 역시 오브젝트이기 때문에, 생성하는데 비용이 든다. static method를 사용하면 비용을 절감시켜줄 수 있다.
    2. 코드의 가독성을 높여준다. @staticmethod를 보면, 오브젝트에 의존하지 않는 순수함수라는 것을 알아차릴 수 있기 때문.
    3. subclass에서 엮어 있는 다른 메서드를 건드리지 않고 이 메서드만 override할 수 있다. 다른 메서드에서 해당 메서드를 하드코딩하지 않고, 참조하기 때문.(cls(클래스), 혹은 self(인스턴스)를 통해 참조)
        
        예를 들어, Pizza 클래스를 상속받은 CheesePizza 클래스가 있다고 해보자. 만약 일반 메서드로 정의했을 경우, CheesePizza클래스에서 mix_ingredients를 override하려면, mix_ingredients와 cook메서드를 둘다 override해야 한다. 하지만 static method를 사용한 경우, 바꾸려는 mix_ingredients만 override하면 된다.
        
    
    ```python
    class Pizza:
    		def __init__(self, toppings):
    				self.toppings = toppings
    
    		@staticmethod
    		def mix_ingredients(x, y):
    				return x + y
    		
    		def cook(self):
    				cook = self.mix_ingredients(self.toppings[0], self.toppings[1])
            return cook
    
    class CheesePizza(Pizza):
    		@staticmethod
    		def mix_ingredients(x, y):
    				return "더블" + x + y + "피자"
    		
    		# Pizza 클래스의 cook 메서드를 그대로 사용할 수 있음
    
    cheesepizaa = CheesePizza()
    ```
    
    ```python
    >>> dish = cheesepizza.cook(['모짜렐라', '에멘탈'])
    >>> print(dish)
    더블모짜렐라에멘탈피자
    ```
    
    **왜 class method가 필요한가?**
    
    1. 클래스 내부에서 메서드를 호출해야 할 경우, 하드코딩하지 않고 cls를 통해 참조할 수 있다.
        
        클래스 이름을 직접 참조하지 않기 때문에, 상속을 할 때 중복에 따른 오류를 피할 수 있다.
        
        특히, 메서드를 여러 단계로 쪼개어 구현하는 경우, 중복에 따른 오류를 피할 수 있다.
        
    
    ```python
    class Pizza(object):
        def __init__(self, radius, height):
            self.radius = radius
            self.height = height
    
        @staticmethod
        def compute_area(radius):
             return math.pi * (radius ** 2)
    
        @classmethod
        def compute_volume(cls, height, radius):
             return height * cls.compute_area(radius)
    
        def get_volume(self):
            return self.compute_volume(self.height, self.radius)
    ```
    
- **기타**
    
    **특정 속성만 허용하고 싶을 경우**
    
    개별 인스턴스에서 인스턴스 속성을 얼마든지 추가할 수 있지만, 이를 제한하고 싶은 경우도 있다.
    
    특정 속성만 허용하고 싶을 경우, __slots__ 사용
    
    ```python
    class User:
    		__slots__ = ['name', 'age'] # 이름과 나이만 허용
    
    judy = User()
    
    # 실행
    >>> judy.name = "judy"
    >>> judy.name
    judy
    >>> judy.email = "judy@test.com"    # 허용되지 않은 속성을 추가하면 에러 발생
    에러발생
    ```
    
    **특정 메서드를 강제하고 싶을 경우**
    
    상속받은 클래스들에서 특정 메서드를 정의하도록 강제하고 싶다면, abstract method를 사용한다.
    
    Base가 되는 클래스에 abstract method를 정의하면,
    
    상속받은 클래스에서 해당 이름의 method를 override하지 않을 경우, 
    
    Base클래스 혹은 상속받은 클래스의 인스턴스를 만들 때 TypeError가 발생한다.
    
    ```python
    import abc
    
    class BasePizza(metaclass=abc.ABCMeta):
        @abstractmethod
        def set_topping(self):
                """Method that should do something"""
            raise NotImplementedError()	
    
    class CheesePizza(BasePizza):
    		pass
    ```
    
    ```python
    >>> cheesepizza = CheesePizza()    # 인스턴스를 만들 때 TypeError 발생
    Traceback (most recent call last):
      File "/Users/kimjeongyeon/dev/test.py", line 66, in <module>
        a = CheesePizza()
    TypeError: Can't instantiate abstract class CheesePizza with abstract methods set_topping
    ```
    
- **참고**
    
    [The definitive guide on how to use static, class or abstract methods in Python](https://julien.danjou.info/guide-python-static-class-abstract-methods/)
    
    [Difference between staticmethod and classmethod](https://stackoverflow.com/questions/136097/difference-between-staticmethod-and-classmethod)