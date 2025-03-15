---
layout: post
title: "[방해꾼은 못 말려] 드로잉 성능 최적화"
order: 2
---

네이버 부스트캠프 Web30팀의 **방해꾼은 못 말려** 프로젝트를 클론하여 **리팩토링**하는 과정을 다룹니다.

- [기존 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web30-stop-troublepainter)
- [리팩토링 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web42-stop-troublepainter)

# 개요

Playwright와 CDP로 드로잉 성능을 측정한 결과는 아래와 같다. 지표를 향상하기 위해 다양한 부분에서 최적화를 할 것이다.

| 지표 | 그림꾼(3명 평균) | 구경꾼(2명 평균) |
| :---: | :---: | :---: |
| **LayoutCount** | 443.33 | 22 |
| **RecalcStyleCount** | 497.33 | 7.5 |
| **LayoutDuration** | 0.04107 | 0.0082345 |
| **RecalcStyleDuration** | 0.09295 | 0.003816 |
| **ScriptDuration** | 1.65815 | 0.290524 |
| **V8CompileDuration** | 0 | 0 |
| **TaskDuration** | 7.96949 | 1.4498015 |
| **TaskOtherDuration** | 2.10131 | 1.1472135 |
| **DevToolsCommandDuration** | 4.07601 | 0.0000135 |
| **ThreadTime** | 5.26321 | 0.801016 |
| **ProcessTime** | 26.82355 | 18.878024 |
| **JSHeapUsedSize** | 15709316 | 11346870 |
| **JSHeapTotalSize** | 33177600 | 12861440 |

# 잉크에 의한 리렌더링 최적화

# 잉크 부족 토스트 메시지 최적화

# 최적화 결과 

최적화 결과로 리렌더링 횟수가 매우 줄었으며, 이에 따라 대부분의 지표에서 성능이 크게 향상되었다.

| 지표 | 구경꾼 | 그림꾼 |
| :---: | :---: | :---: |
| **LayoutCount** | 34.33 | 24 |
| **RecalcStyleCount** | 60.67 | 4.5 |
| **LayoutDuration** | 0.01695 | 0.00758 |
| **RecalcStyleDuration** | 0.01140 | 0.00114 |
| **ScriptDuration** | 0.76654 | 0.25921 |
| **V8CompileDuration** | 0 | 0 |
| **TaskDuration** | 6.31876 | 1.18630 |
| **TaskOtherDuration** | 1.52217 | 0.91836 |
| **DevToolsCommandDuration** | 4.00170 | 0.00001 |
| **ThreadTime** | 3.93703 | 0.63618 |
| **ProcessTime** | 25.84286 | 18.65333 |
| **JSHeapUsedSize** | 14,710,940 | 11,255,138 |
| **JSHeapTotalSize** | 33,527,125.33 | 14,172,160 |

## 그림꾼 성능 개선율

| 지표 | 이전 값 | **새로운 값**  | **향상 퍼센트** |
| :---: | :---: | :---: | :---: |
| **LayoutCount** | 443.33 | 34.33 | -92.26% |
| **RecalcStyleCount** | 497.33 | 60.67 | -87.79% |
| **LayoutDuration** | 0.04107 | 0.01695 | -58.72% |
| **RecalcStyleDuration** | 0.09295 | 0.01140 | -87.74% |
| **ScriptDuration** | 1.65815 | 0.76654 | -53.77% |
| **V8CompileDuration** | 0 | 0 | 0% |
| **TaskDuration** | 7.96949 | 6.31876 | -20.68% |
| **TaskOtherDuration** | 2.10131 | 1.52217 | -27.58% |
| **DevToolsCommandDuration** | 4.07601 | 4.00170 | -1.83% |
| **ThreadTime** | 5.26321 | 3.93703 | -25.19% |
| **ProcessTime** | 26.82355 | 25.84286 | -3.66% |
| **JSHeapUsedSize** | 15,709,316 | 14,710,940 | -6.37% |
| **JSHeapTotalSize** | 33,177,600 | 33,527,125.33 | +1.06% |