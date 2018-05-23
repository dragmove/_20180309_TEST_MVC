# TEST MVC

test mvc project

## Backbone

Backbone 은 전통적인 MVC 와 약간 다르다.
Backbone 에서 컨트롤러의 역할은 뷰가 대신하고 있다.
컨트롤러는 요청에 응답하고, 모델을 변경시키고 뷰를 갱신하는 역할을 담당하는 액션을 지정한다는 사실을 기억하자.
SPA 에서는 전통적인 방식의 요청을 사용하지 않고 이벤트를 사용하는데, 브라우저 DOM 이벤트 or 내부 애플리케이션 이벤트(모델의 변화)가 그들이다.

SPA 가 로드되었을 때, 클라이언트에서 라우터는 URL 을 중간에서 가로채어 서버에 새로운 요청을 하는 대신에 클라이언트 로직을 호출한다.
URL 라우팅, DOM 이벤트, 모델 이벤트로 뷰 안의 처리 로직이 시작된다.
모델은 백엔드, 서버와 통신을 수반할 수 있는 데이터 소스와 동기화된다.

* 모델(Model)
  모델의 기본 기능은 모델의 특성을 나타낼 수 있는 속성들의 유효성을 검증한다.
  실제 애플리케이션에서 모델을 사용할 때 모델의 지속성을 유지시킬 방법이 필요하다. // ex) localStorage
  모델은 여러 개의 뷰의 변화를 관찰할 수 있다.
  근래의 MVC/MV\* 프레임워크에서는 일반적으로 모델을 그룹화하여 함께 제공한다.
  Backbone 의 경우, 이 그룹들을 collection 이라고 한다. 그룹 내의 모델이 변경되었을 경우, 그룹으로부터 통지를 받을 수 있는 애플리케이션 로직을 작성해야 한다.
  이렇게 하면, 각 모델 인스턴스를 수동으로 관찰해야 하는 부담을 피할 수 있다.

* 뷰(View)
  사용자는 모델을 읽고 편집할 수 있는 뷰를 이용해서 상호작용한다.
  모델이 변경되었을 때 뷰가 갱신을 시작할 수 있도록 하기 위해서 모델의 구독자로서 render() 콜백을 추가해야 한다.

Backbone 의 뷰는 컨트롤러의 로직을 가지고 있고, 라우터(router) 는 애플리케이션의 상태를 관리하는 것을 돕는다.
그러나, 고전적인 MVC 에 의하면 이들 모두 컨트롤러가 아니다.
이런 점에서 Backbone 은 진정한 MVC 프레임워크가 아니다.

## Redux

Working

## Contact

* @Website : http://www.dragmove.com
* @Blog : http://blog.naver.com/dragmove
* @LinkedIn : https://www.linkedin.com/in/hyun-seok-kim-99748295/
* @E-mail : dragmove@gmail.com

## License

[MIT license](http://danro.mit-license.org/).
