## 포트폴리오 분석 API 사용자 인증 가이드 (Client Side)

-----

### **1. 인증 방식**

새로 구현한 `analyze_portfolio` 엔드포인트는 보안을 위해 **API Key 기반의 헤더 인증 방식**을 사용합니다. API 키는 미리 정의된 임의의 문자열이며, 이 값을 요청 헤더에 포함시켜야만 API를 호출할 수 있습니다.

### **2. 인증 키 사용법**

클라이언트 측(예: `msa-self-dashboard-gemini`)에서 API를 호출할 때, 다음 형식의 헤더를 요청에 반드시 포함시켜야 합니다.

  * **헤더 이름 (Name):** `x-api-key`
  * **헤더 값 (Value):** 클라우드 런(Cloud Run) 환경 변수에 저장된 **인증 키 문자열**

### **3. 구현 예시 (JavaScript - `fetch` API)**

아래 코드는 웹 클라이언트에서 API를 호출하는 기본적인 예시입니다. `YOUR_API_KEY` 부분은 실제 환경 변수에서 가져온 키 값으로 대체해야 합니다.

```javascript
const API_URL = "[MSA-BRAIN-GEMINI-URL]/gemini/analyze_portfolio";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // 환경 변수에서 키 값 로드

const requestBody = {
  githubUrl: "https://github.com/rakaso598/msa-self-dashboard-gemini",
  blogUrl: "https://your-blog.tistory.com/123",
  resumeText: "저는 AI와 MSA에 관심이 많은 신입 개발자입니다..."
};

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY // 여기에 인증 키를 포함
};

fetch(API_URL, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(requestBody),
})
  .then(response => {
    if (!response.ok) {
      // HTTP 상태 코드에 따른 에러 처리
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("분석 결과:", data);
    // 결과를 대시보드 UI에 표시하는 로직
  })
  .catch(error => {
    console.error("API 호출 중 오류 발생:", error);
    // 사용자에게 오류 메시지를 표시하는 로직
  });
```

### **4. 보안 고려사항**

클라이언트에서 API 키를 사용하는 경우, **절대로 코드에 키 값을 직접 하드코딩해서는 안 됩니다.**

  * **환경 변수 사용:** `process.env.NEXT_PUBLIC_API_KEY`와 같이 환경 변수를 사용해 키를 관리하세요. 이는 빌드 과정에서 키 값을 안전하게 주입하고, 소스 코드 노출을 막는 가장 좋은 방법입니다.
  * **`.env.local` 파일:** 개발 환경에서는 `.env.local` 파일에 `NEXT_PUBLIC_API_KEY=YOUR_SECRET_KEY`와 같이 키를 정의하고, 이 파일이 Git에 커밋되지 않도록 `.gitignore`에 추가해야 합니다.
  * **배포 환경:** Vercel, Netlify와 같은 배포 플랫폼의 환경 변수 설정 기능을 사용하여 API 키를 안전하게 관리하세요.

이 가이드는 **클라이언트 개발자가 인증에 대해 고민할 필요 없이, 지정된 헤더에 키만 넣어주면 되는 명확한 사용법**을 제공합니다.