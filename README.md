## ✨ Lighty - 우리끼리 쓰는 비밀 SNS
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/69c34263-83c2-40d9-b8c1-bed7c0e95234" /><br/>

**Lighty**는 소중한 순간을 기록하고, 친구들과만 추억을 공유하는 프라이빗 모바일 웹뷰형 SNS입니다. 혼자서는 **비밀 일기장**, 친구들과는 **소규모 비공개 그룹**으로 활용할 수 있습니다.

> 세상에 공개하지 않아도 괜찮아. Lighty는 오직 '우리'만을 위한 공간이니까요.

## 📌 프로젝트 소개
- 선택한 친구/그룹에게만 게시물을 공유하는 피드
- 약속 생성 후 초대장 공유, 약속 종료 후 추억 기록
- 포토카드 프레임/스티커 편집
- 모바일 웹뷰 지원(React Native WebView 브리지)

## ✅ 주요 기능
- **친구/그룹 관리**: 친구 추가, 그룹 생성/수정, 구성원 관리
- **약속 관리**: 약속 생성, 초대장 공유, 약속별 기록 남기기
- **선택적 공유 피드**: 특정 친구·그룹 대상 비공개 공유, 내 피드/전체 피드 분리
- **포토카드 제작**: 프레임 선택, 스티커/텍스트 편집
- **소셜 로그인**: 구글/카카오/애플(네이티브 웹뷰) OAuth
- **알림 목록**: 서버 알림 조회(실시간 푸시/소켓은 미구현)

## 🛠️ 기술 스택
**Frontend**
- Next.js 14, React 18, TypeScript
- Tailwind CSS
- TanStack Query (서버 상태), Recoil (클라이언트 상태)
- Fabric.js, html2canvas (포토카드 편집)

**Backend 연동**
- 외부 API(NEXT_PUBLIC_BACKEND_URL) 호출 프런트엔드. Nest/Prisma 코드는 이 저장소에 포함되어 있지 않습니다.

**이미지 처리**
- `/api/resize`: Sharp 기반 서버 측 리사이징 + 메모리 캐시
- 응답 헤더에 `Cache-Control: public, max-age=31536000, immutable`을 부여해 CDN/브라우저 캐싱 가능
- 앱 전역에서 `https://cdn.lighty.today` 도메인 정적 자산을 사용(CloudFront 등 외부 CDN 설정은 인프라에서 관리)

## 🚀 설치 및 실행 방법
### 사전 요구사항
- Node.js 18.x 이상
- npm 또는 yarn
- 외부 백엔드 API 및 소셜 로그인 키

### 환경 변수
루트에 `.env`를 생성하고 아래와 같이 채웁니다(필수 값만 예시).
```bash
NEXT_PUBLIC_BACKEND_URL="https://api.lighty.today"
NEXT_PUBLIC_KAKAO_REST_API_KEY=""
NEXT_PUBLIC_REDIRECT_URI="http://localhost:3000/auth/kakao/login"
NEXT_PUBLIC_GOOGLE_ANALYTICS=""
NEXT_PUBLIC_GTM_ID=""
```

### 프런트엔드 실행
```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev
```

## 👥 팀원 소개
- 홍수연 - UI/UX 디자인, 프로젝트 리더<br/>
- 최은재 - 프론트엔드 개발<br/>
- 강해성 - 백엔드 개발<br/>
