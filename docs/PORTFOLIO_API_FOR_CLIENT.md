## **포트폴리오 분석 API 가이드**

### **1. API 엔드포인트**

  * **메서드:** `POST`
  * **URL:** `[MSA-BRAIN-GEMINI-URL]/gemini/analyze_portfolio`

`[MSA-BRAIN-GEMINI-URL]` 부분은 실제 **`msa-brain-gemini`** 서비스가 배포된 URL로 대체하세요. 예를 들어, `https://api.yourdomain.com`와 같은 형태가 될 수 있습니다.

### **2. 요청 헤더**

API에 접근하기 위한 인증 키가 필요합니다. `x-api-key` 헤더에 발급받은 키를 포함하세요.

  * **`Content-Type: application/json`**
  * **`x-api-key: YOUR_API_KEY`**

### **3. 요청 본문 (Request Body)**

JSON 형식으로 포트폴리오 정보를 전송합니다.

  * **`githubUrl`** (필수): 분석을 요청할 GitHub 저장소의 URL입니다.
  * **`blogUrl`** (선택): 분석을 요청할 블로그 게시물의 URL입니다.
  * **`resumeText`** (선택): 이력서 내용을 텍스트로 직접 입력할 수 있습니다.

**요청 예시:**

```json
{
  "githubUrl": "https://github.com/rakaso598/msa-self-dashboard-gemini",
  "blogUrl": "https://your-blog.tistory.com/123",
  "resumeText": "저는 AI와 MSA에 관심이 많은 신입 개발자입니다..."
}
```

### **4. 응답 본문 (Response Body)**

요청이 성공하면, API는 분석 결과를 JSON 형식으로 반환합니다. 이 데이터를 사용하여 대시보드에 시각화하거나 피드백을 표시할 수 있습니다.

**응답 예시:**

```json
{
  "summary": "AI가 요약한 포트폴리오의 전반적인 평가와 강점 요약",
  "strengths": [
    "마이크로서비스 아키텍처에 대한 깊은 이해",
    "명확한 README 문서 작성 능력"
  ],
  "weaknesses": [
    "프로젝트 코드의 테스트 커버리지 부족",
    "특정 기술 스택에 대한 활용 사례 부족"
  ],
  "technicalFeedback": {
    "codeReview": "코드 구조 및 가독성에 대한 구체적인 피드백",
    "bestPractices": "적용하면 좋을 베스트 프랙티스 제안"
  },
  "documentationFeedback": {
    "readmeReview": "README 문서의 내용 및 구성에 대한 피드백",
    "blogReview": "블로그 글의 논리 전개 및 내용에 대한 피드백"
  },
  "overallScore": 85,
  "nextSteps": [
    "테스트 코드를 추가하여 코드 안정성 확보",
    "블로그에 프로젝트 설계 과정을 상세히 기술하기"
  ]
}
```

### **5. 오류 처리**

요청 실패 시에는 다음과 같은 형식의 응답을 받을 수 있습니다.

  * **`400 Bad Request`**: 요청 본문의 데이터가 유효하지 않거나 필수 필드가 누락되었을 때 발생합니다.
  * **`429 Too Many Requests`**: 1분당 2회로 설정된 **Rate Limiting**을 초과했을 때 발생합니다.
  * **`500 Internal Server Error`**: 서버 내부에서 오류가 발생했을 때 나타납니다.

클라이언트 측에서는 이러한 오류 코드와 메시지를 적절하게 처리하여 사용자에게 명확한 피드백을 제공해야 합니다.