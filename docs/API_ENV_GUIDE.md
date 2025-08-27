## API Client 환경 설정 가이드

-----

이 프로젝트에서 사용하는 URL과 개인정보는 보안을 위해 **하드코딩하지 않고 환경 변수(`env`)로 관리해야 합니다.** 이는 소스 코드 유출 시 민감한 정보가 함께 노출되는 것을 방지하고, 개발 및 배포 환경에 따라 다른 값을 유연하게 적용할 수 있게 해줍니다.

### **1. `.env.local` 파일 생성 및 관리**

개발 환경에서는 프로젝트의 루트 디렉토리에 `.env.local` 파일을 생성하여 민감한 정보를 저장합니다.

  * **파일명:** `.env.local`

<!-- end list -->

```properties
# MSA-BRAIN-GEMINI API의 URL
NEXT_PUBLIC_MSA_BRAIN_GEMINI_URL=https://api.yourdomain.com

# MSA-BRAIN-GEMINI API에 접근하기 위한 인증 키
NEXT_PUBLIC_API_KEY=YOUR_API_KEY_STRING

# 기타 필요한 환경 변수
# ...
```

**주의:** `.env.local` 파일은 Git에 커밋되지 않도록 `.gitignore` 파일에 반드시 추가해야 합니다.

### **2. 환경 변수 코드 적용**

프로젝트 코드 내에서 환경 변수를 사용할 때는 `process.env` 객체를 통해 접근합니다.

  * **파일명:** `src/utils/api.ts` 또는 API 호출 로직이 있는 파일

<!-- end list -->

```typescript
// .env.local 파일에 정의된 환경 변수를 가져옵니다.
const MSA_BRAIN_GEMINI_URL = process.env.NEXT_PUBLIC_MSA_BRAIN_GEMINI_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// API 호출 함수
export const analyzePortfolio = async (data) => {
  if (!MSA_BRAIN_GEMINI_URL || !API_KEY) {
    throw new Error("환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.");
  }

  const response = await fetch(`${MSA_BRAIN_GEMINI_URL}/gemini/analyze_portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY, // 환경 변수에서 가져온 키를 사용
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("API 호출 실패");
  }

  return response.json();
};
```

### **3. Vercel, Netlify 등 배포 환경 설정**

개발 환경뿐만 아니라, Vercel이나 Netlify와 같은 배포 플랫폼에서도 환경 변수를 동일하게 설정해야 합니다.

  * **설정 방법:** 대시보드의 프로젝트 설정 페이지에서 **"Environment Variables"** 섹션에 \*\*`NEXT_PUBLIC_MSA_BRAIN_GEMINI_URL`\*\*과 **`NEXT_PUBLIC_API_KEY`** 값을 직접 추가합니다.

이러한 방식으로 코딩 지침을 따르면, 보안을 강화하고 유지보수성을 높일 수 있습니다.