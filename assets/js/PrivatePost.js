let PrivatePost = {
    token: null,
    userName:"ijun17",
    repositoryName:"BLOG_PRIVATE",
    xml:null,
    login(token) {
        this.token = token;
    },
    connectGitgub() {
        // API 엔드포인트 URL
        const url = `https://api.github.com/repos/${this.userName}/${this.repositoryName}/contents/FILE_PATH`;
        // XMLHttpRequest 객체 생성
        const xhr = new XMLHttpRequest();
        // 요청 초기화
        xhr.open("GET", url);
        // 인증 헤더 추가
        xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
        // 응답 처리 함수
        xhr.onload = () => {
            // 응답이 성공적으로 왔는지 확인
            if (xhr.status === 200) {
                // 응답 데이터를 JSON으로 파싱
                const response = JSON.parse(xhr.responseText);
                // 디코딩된 컨텐츠 가져오기
                const content = atob(response.content);
                // 컨텐츠 출력
                console.log(content);
            } else {
                console.error(xhr.statusText);
            }
        };
        // 에러 처리 함수
        xhr.onerror = () => {
            console.error(xhr.statusText);
        };
        // 요청 보내기
        xhr.send();
    }
}