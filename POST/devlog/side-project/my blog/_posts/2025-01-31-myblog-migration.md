---
layout: post
title: "jekyll 블로그에서 hugo로 이주...하려고 했으나 다시 회귀"
order: 4
---

# jekyll에서 바꾸려는 이유

기존에 사용하던 jekyll에서 너무 많은 불편함을 느껴 대안을 찾고자 했다. 불편함을 느낀 부분을 아래와 같다.

- 노트북 기준 처음 실행하는데 20초 정도 걸렸다.
- 루트에 수많은 폴더와 파일이 존재해 혼잡했다.

이러한 이유로 예전부터 이주를 고려하고 있었고, 마침 설날이 되어 한가해진 참에 블로그 이주를 결정하였다.

# 블로그 프레임워크 고민

블로그를 선택하는 기준을 아래와 같다.

- **빠른 빌드 속도**
- jekyll과 비슷한 마크다운 형식
- 깔끔한 프로젝트 구조
- 활성화된 커뮤니티 및 잘 정리된 공식 문서

이에 따라 후보를 정했다.

## Hugo

- Go 언어 기반
- 이중에서 가장 빠른 속도
- Go 템플릿 기반의 템플릿 언어를 사용
- themes 폴더 아래에 테마 파일을 두어 깔끔한 프로젝트 구조
- hot reload 지원

## Astro

- Javascript 기반
- jekyll과 비교해서는 빠른 속도
- npm create astro@latest로 쉽게 설치 가능
- 익숙한 npm 환경
- 리액트, vue, svelte 등을 동시에 사용할 수 있음
- HMR 지원
- 지저분한 폴더 구조(개선 가능할 수도)
- 빌드 시 최소화된 HTML을 생성하여 성능 최적화

## Next.js

- 익숙한 React 기반
- jekyll과 비교해서는 빠른 속도
- 조금 무거움
- 설정에 조금 시간이 들음
- 간단한 블로그 용으로는 부적합

## GatsbyJS

- React 기반
- GraphQL을 사용하여 콘텐츠 관리
- 복잡한 설정이 필요한 경우가 많아, 초기 설정에 시간이 소요될 수 있음
- GraphQL을 잘 활용해야 하지만, 이를 처음 접하는 사람에겐 다소 학습 곡선이 있을 수 있음
- 속도는 상대적으로 느릴 수 있음(특히 대규모 프로젝트에서)

# Hugo로 결정, 이주하던 과정

후보군 중에 hugo를 선택하였다. 익숙한 자바스크립트 기반의 다른 프레임워크를 놔두고 Hugo를 선택한 가장 큰 이유는 **빠르다는 것이다.** 그리고 go에 대한 약간의 호기심도 영향을 미쳤다. 물론 go를 쓰진 않겠지만

## 새로운 Hugo 테마를 만들자

Hugo의 테마 파일은 themes 폴더 아래에 위치한다. 보통 git의 submodule을 사용해 themes 폴더 하위에 테마 파일을 클론한다. 이에 따라 루트 구조가 단순해진다는 장점이 있다.

블로그 테마는 기존 스타일 그대로 쓸 것이기 때문에 새로운 이틀에 거쳐 테마를 만들었다. Hugo 템플릿 문법을 익히고, Hugo 공식 문서와 커뮤니티의 도움을 받아 만들 수 있었다. gpt도 많이 사용했지만, 환각이 너무 심해 그대로 쓸 수 없었다. jekyll보다 생태계가 작아서 그런게 아닐까 싶다.

아래는 테마의 깃허브 주소다.

<https://github.com/ijun17/hugo-theme-jungi>

## jekyll 형식의 마크다운을 Hugo 형식으로 변경

이제 기존에 사용하던 jekyll 형식의 마크다운 파일을 Hugo 형식으로 바꾸어야 했다. 차이가 나는 부분은 문서 맨 위에 존재하는 front matter이다.

Jekyll의 경우 이렇게 포스트의 정보를 명시하는데,

```md
---
title: "post title"
order: 1
---
```

Hugo의 경우 아래처럼 명시한다.

```md
+++
date = 2025-01-01
title = "post title"
weight = 1
+++
```

또한 jekyll은 파일 이름에 작성일이 존재하는데 Hugo에는 front matter에 존재한다. Hugo 공식 사이트에서는 jekyll에서 hugo로 쉽게 마이그레이션하기 위한 깃허브 프로젝트를 제공한다.

<https://gohugo.io/tools/migrations/>

그러나 원하는 대로 바뀌지 않아 node.js로 스크립트를 만들었다.

```js
const fs = require("fs");
const path = require("path");

// 명령줄 인자로 프로젝트 경로 받기
const projectPath = process.argv[2];
if (!projectPath) {
  console.error("사용법: node main.js {프로젝트 경로}");
  process.exit(1);
}

const outputPath = path.join(__dirname, "output");

// 🔹 output 폴더 정리 후 생성
if (fs.existsSync(outputPath)) {
  fs.rmSync(outputPath, { recursive: true });
}
fs.mkdirSync(outputPath, { recursive: true });

// 🔹 프론트매터 Jekyll → Hugo 변환 함수
function convertFrontMatter(date, content) {
  // 프론트매터 추출
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontMatterRegex);
  if (!match) {
    console.log("프론트매터 없음:", content.slice(0, 100));
    return content;
  }

  //프론트매터에서 키 밸류 추출
  const keyValueRegex = /^([\w-]+):\s*(.+)$/gm;
  const matches = [...match[1].matchAll(keyValueRegex)];
  let newFrontMatter = `date = ${date}\n`;
  matches.forEach((match) => {
    if (match[1].trim() === "layout") return; // layout은 제외
    if (match[1].trim() === "published") {
      newFrontMatter +=
        "draft = " + (match[2].trim() === "true" ? "false" : "true") + "\n";
    } else if (match[1].trim() === "order")
      newFrontMatter += "weight = " + match[2].trim() + "\n";
    else newFrontMatter += match[1].trim() + " = " + match[2].trim() + "\n";
  });

  // 프론트매터를 제거한 내용 추출
  const body = content.replace(frontMatterRegex, "").trim();

  try {
    return `+++\n${newFrontMatter}+++\n\n${body}`;
  } catch (error) {
    console.error("프론트매터 변환 오류:", error);
    return content;
  }
}

// 🔹 _posts 폴더 구조 정리 함수
function flattenPostsFolder(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (item.name === "_posts") {
        // _posts 내부 파일/폴더를 한 단계 위로 이동
        const postItems = fs.readdirSync(fullPath);
        for (const postItem of postItems) {
          fs.renameSync(
            path.join(fullPath, postItem),
            path.join(dir, postItem)
          );
        }
        fs.rmdirSync(fullPath);
      } else {
        flattenPostsFolder(fullPath);
      }
    }
  }
}

// 🔹 폴더 재귀 탐색 및 변환 함수
function processFolder(srcDir, destDir) {
  const items = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const destPath = path.join(destDir, item.name);

    if (item.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      processFolder(srcPath, destPath);
    } else if (item.isFile() && path.extname(item.name) === ".md") {
      const content = fs.readFileSync(srcPath, "utf8");
      const date = item.name
        .split("-")
        .slice(0, 3)
        .map((e) => e.padStart(2, "0"))
        .join("-");
      const newFileName = item.name.split("-").slice(3).join("-");
      const newDestPath = path.join(destDir, newFileName);
      const newContent = convertFrontMatter(date, content);
      fs.writeFileSync(newDestPath, newContent, "utf8");
    } else {
      // 이미지, 기타 파일 복사
      fs.copyFileSync(srcPath, destPath);
    }
  }
  flattenPostsFolder(destDir); // _posts 폴더 정리
}

// 실행
console.log(`📂 변환 시작: ${projectPath}`);
processFolder(projectPath, outputPath);
console.log(`✅ 변환 완료! 결과는 output 폴더에 저장됨.`);
```

## 결과는?

결과는 무척 빨라졌다. 기존보다 얼마나 빨라졌는지 측정할 필요도 없이 거의 바로 실행되었다. 정말 마음에 들었다.

또한 프로젝트 폴더 구조도 훨씬 깔끔해졌다. 테마 파일과 포스트 글을 다른 깃허브 저장소에서 관리한다는 개념도 맘에 들었다.

# 그러나....

## 볼드체 미적용 문제

hugo에서는 아래 마크다운에 볼드 적용이 되지 않는다.

```md
**test(test)**test
```

아래는 또 적용이 된다.

```md
**test(test)** test
```

이런 이유는 괄호로 끝나며 뒤에 공백 문자가 아닌 경우 hugo가 사용하는 마크다운 파서에서 볼드로 처리를 하지 않기 때문이다. hugo는 현재 `goldmark`라는 마크다운 파서를 사용하고 있다.

<https://github.com/yuin/goldmark/>

이 goldmark 마크다운 파서는 CommonMark라는 표준을(공식적인 표준은 아님) go로 구현한 프로젝트이다. 아래 사이트에서 마크다운 파싱 결과를 직접 확인할 수 있다.

- [CommonMark 테스트](https://spec.commonmark.org/dingus/)
- [goldmark 테스트](https://yuin.github.io/goldmark/playground/)

반면에 jekyll은 CommonMark를 따르지 않는 kramdown이라는 마크다운 파서를 사용한다. 이에 따라 파싱 결과가 달라진 것이다.

CommonMark에서 왜 저런 규칙을 만들었을지 생각을 해보았는데 영어에서는 단어 사이에 띄어쓰기가 있기 때문이지 않을까 생각한다. 하지만 한국어에서는 괄호 뒤에 바로 글자가 오는 경우가 많다. 그리고 내 블로그에서도 괄호 바로 뒤에 글자가 있는 부분이 많다.

## 다시 고민

위와 같은 문제를 발견하고 다시 고민에 빠져들었다. hugo는 현재 goldmark가 기본 마크다운 파서이며, 다른 마크다운 파서를 사용하기 위해선 따로 설치를 해야 한다. hugo에서는 외부 마크다운 파서보다 네이티브 파서(goldmark)가 더 빠르다고 한다. 실제로 pandoc을 설치하여 실행을 해본 결과 실행 시간이 조금 늦어졌다.

마크다운 파서에서 이런 문제가 발생할 줄은 몰랐다. 생각보다 이주 비용이 더 나가게 된 것이다. hugo 이외에 다른 프레임워크도 고려해보았다.

다시 생각해보았는데 내가 jekyll을 많이 파보지 않고 이주를 결정했다는 사실을 깨달았다. 그저 오래 쓰고 질렸기 때문에 바꾸고 싶었던 것 같다. 따라서 아래 두 가지 문제가 해결이 되면 jekyll을 그대로 사용하는게 좋을 것이라 판단을 했다.

- **느린 속도**
- **지저분한 루트 폴더**

# Jekyll 최적화 과정

## 속도 최적화

### 빌드에서 제외할 파일/폴더 설정

먼저 \_config.yml 파일에서 exclude에 여러 파일/폴더를 추가했다. exclude는 빌드에서 제외할 파일/폴더를 지정할 수 있게 해주는 기능이다. 웬만한 것은 거의다 추가 하였다.

```yml
exclude:
  - .git/
  - _site/
  - .jekyll-cache/
  - src/.jekyll-cache/
  - .gitignore
  - .jekyll-metadata
  - Gemfile
  - Gemfile.lock
  - jungi.gemspec
  - LICENSE.txt
  - package.json
  - README.md
```

### jekyll 버전 업그레이드

기존에는 3.X 버전을 사용중이었는데 새로 4.3.4 버전이상으로 업그레이드 했다. 4.X에서는 메모리 캐시와 디스크 캐시를 사용해 성능 최적화를 했다고 한다.

```python
# jungi.gemspec

Gem::Specification.new do |spec|
  # jekyll 버전
  spec.add_runtime_dependency "jekyll", "~> 4.3.4"
end
```

### gem 의존성 재설정

gem 설정도 바꿨다. 여기서 liquid-c gem을 추가했는데, 이는 jekyll에서 사용 중인 liquid 언어를 C로 구동하는 gem이다.

```python
source "https://rubygems.org"

# Windows에서 파일 시스템 변경을 감지하는 Gem
gem "wdm" if Gem.win_platform?

# liquid 언어를 c로 구동
gem "liquid-c"

gemspec
```

## 루트 폴더 정리

루트 폴더를 깔끔하게 정리하기 위해 사용되지 않는 파일/폴더는 삭제하고, 일부 폴더를 src 폴더 밑으로 두었다. 이를 위해 \_config.yml에서 아래처럼 설정을 하였다. 이제 포스트 폴더, src 폴더, 그외 설정 파일만 루트에 존재한다.

```yml
data_dir: src/_data
includes_dir: src/_includes
layouts_dir: src/_layouts
assets_dir: src/assets
```

# 다시 jekyll로의 회귀

결과적으로 아래의 성능 향상 결과를 이루었다.

- 최초 실행: 약 20초 → **약 3초**
- 실행 중 변경: 2 ~ 3초 → **0.2 ~ 0.3초**

또한 루트 폴더도 매우 깔끔해졌다.

```yaml
- (root)
  - POST/
  - src/
  - 그외 파일(10개)
```

이러한 결과로 jekyll을 그대로 사용하기로 결정하였다.

# 결론

jekyll이 생각보다 더 빨라질 수 있음을 알게 되었다. jekyll에 대해 더 알아보지 않고 프레임워크를 바꿔보려는 것은 너무 안일한 생각이었던 것 같다.

추가적으로 아래는 jekyll에서 유용하게 쓸 수 있는 gem이다. 문제는 github page gem에서 이를 잘 적용해 줄지가 문제인데 앞으로 더 알아보아야 한다.

| Gem 이름                  | 주요 기능                             |
| ------------------------- | ------------------------------------- |
| **jekyll-multiple-pages** | 병렬로 여러 페이지 렌더링             |
| **jekyll-assets**         | 자산 최적화 (CSS, JavaScript, 이미지) |
| **jekyll-sass-converter** | SASS 파일 최적화                      |
| **jekyll-seo-tag**        | SEO 메타 태그 자동 생성               |
| **jekyll-paginate-v2**    | 페이지네이션 최적화                   |
| **jekyll-compress-html**  | HTML 압축                             |
| **jekyll-redirect-from**  | 페이지 리다이렉션 설정                |
| **jekyll-minifier**       | CSS, JS, HTML 압축                    |
| **jekyll-feed**           | 자동 RSS 피드 생성                    |
