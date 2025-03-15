---
layout: post
title: "Playwright와 CDP로 드로잉 성능 테스트"
order: 1
---

네이버 부스트캠프 Web30팀의 **방해꾼은 못 말려** 프로젝트를 클론하여 **리팩토링**하는 과정을 다룹니다.

- [기존 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web30-stop-troublepainter)
- [리팩토링 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web42-stop-troublepainter)

# 개요

**방해꾼은 못 말려**는 `Playwright`로 서로 다른 플레이어 간의 캔버스 일치율 테스트를 하고 있다. 이 포스트에서는 Playwright와 CDP로 성능 측정을 하는 과정을 다룬다.

# Playwright란

<https://playwright.dev/>

> Playwright enables reliable end-to-end testing for modern web apps.

Playwright란 다양한 브라우저를 지원하는 e2e 테스트 도구로 아래 기능을 제공한다.

- 크로스 브라우저, 크로스 플랫폼, 크로스 언어
- 엘레멘트가 실행가능할 때까지 자동 대기
- 필요한 조건이 충족될 때까지 반복 검사
- 스크린샷이나 비디오를 생성
- 여러 브라우저, 탭, 출처를 동시에 실행
- 브라우저에 원하는 이벤트를 생성
- Shadow DOM 확인 가능
- 격리된 브라우저 컨텍스트 생성 가능
- 인증 상태를 저장하여 재사용
- 유용한 도구 - codegen, Playwright inspector, Trace Viewer

# 일단 테스트가 돌아가게

개발이 진행되면서 기존에 동작하던 Playwright 테스트가 동작하지 않았다. 테스트 실행은 되지만 캔버스에 아무것도 그려지지 않는 것이 문제였다. 원인을 살펴보니 프로젝트 개발 중에 캔버스의 개수가 두 개가 되어 잘못된 캔버스를 셀렉트했던 것이다. 

```js
// 기존 코드
const canvas = await page.locator('canvas');

// 변경 코드(두 번째 캔버스를 선택)
const canvas = await page.locator('canvas + canvas');
```

# 시드 기반 랜덤으로 결과를 항상 동일하게

성능 측정을 정확하게 하기 위해선 매 테스트마다 동작을 동일하게 수행해야 한다. 하지만 기존 테스트는 Math.random()을 사용하고 있었기에 매번 드로잉 결과가 달라졌다. 따라서 시드 기반 랜덤으로 이를 해결하려 했다.

각 페이지에서 비동기적으로 그림을 그리고 있었기 때문에 페이지 별 드로잉 순서는 보장되지 않는다. 따라서 페이지 별로 시드를 유지해야 한다. 아래 seedRandom 함수로 항상 거의 동일한 결과를 보장할 수 있게 되었다.

```js
let initialSeed = 825347;
const seedMap = new Map(); // 페이지 별로 시드를 유지

function seedRandom(key: any) {
  if (!seedMap.has(key)) seedMap.set(key, initialSeed);
  let seed = seedMap.get(key);
  initialSeed *= 6807;
  seed = (seed * 16807) % 2147483647;
  seedMap.set(key, seed);
  return (seed - 1) / 2147483646;
}
```

그러나 랜덤 드로잉 방식은 여전히 문제가 있었다. 바로 실제 드로잉과 다르다는 것이다. 실제로는 1초에 보통 60번의 주기(마우스 무브 이벤트)로 드로잉을 하며, 한번 드로잉하는데 그려지는 직선의 길이도 다르다. 이러한 문제로 랜덤 드로잉이 실제 드로잉을 대변한다고 하기에는 한계가 있었다. 아래에서 실제 드로잉 데이터를 수집하여 이 문제를 해결하였다.

# 실제 드로잉 데이터를 수집

## Playwright로 이벤트를 수집해보자

Playwright에는 자체적으로 이벤트를 수집하

## 마우스 이벤트를 수집하는 프로그램 제작



# CDP로 성능 테스트