# TODO

## 1. 관리자 계정 (먼저)
- [ ] Neon Console → Auth → Users: 내 계정이 **admin**인지 확인
- [ ] dev에서 로그인 → 상품 만들기(사진 업로드) → 수정 → SOLD → 삭제까지 직접 해보기
- [ ] admin 목록 UI 확인 (Edit 버튼, Special 배지, New/Edit 로딩 스켈레톤)

## 2. 배포 (출시 최소 조건)
- [ ] Vercel에 GitHub `jameskimau/reHome` 연결
- [ ] Vercel env 넣기: `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `AWS_*` (Storage)
- [ ] `NEXT_PUBLIC_SITE_URL=https://실제도메인` (빠지면 sitemap/OG가 localhost로 나감)
- [ ] 도메인 구매(.com.au 하나) + Vercel에 연결
- [ ] Neon Auth: trusted domain에 실제 도메인 추가, **Allow Localhost 끄기**
- [ ] 배포 URL에서 로그인 + 사진 업로드 확인, `/robots.txt` `/sitemap.xml`이 실제 도메인인지 확인

## 3. SEO 마무리 (Claude가 할 수 있음)
- [ ] `robots.ts`: `/admin` disallow
- [ ] 상품 상세에 Product JSON-LD (가격, SOLD면 SoldOut, 이미지, 브랜드)
- [ ] 기본 OG 이미지 (카톡/문자 공유 썸네일)
- [ ] Playwright e2e 한 번 돌리기 (시스템 Chrome 사용)
- [ ] `package.json`에서 안 쓰는 `react-router-dom` 삭제

## 4. 콘텐츠 (직접)
- [ ] 시드 상품 31개 → 실제 재고 + 실제 사진으로 교체
- [ ] `src/config/site.ts` 전화번호, 주소, 영업시간 최종 확인
- [ ] About 문구 최종 확인

## 5. 오픈 후
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] Google Business Profile 등록 (지역 검색에 제일 중요)

## 6. 다음 단계: 한국어판 (출시 후)
- 도메인 1개, 앱 1개, DB 1개. 번역 API 안 씀. 언어는 **URL로** 결정 (`/` 영어, `/ko` 한국어)
- [ ] 라우트를 `src/app/[lang]/...` 아래로 옮기기 (Next i18n 방식)
- [ ] 화면 문구: `dictionaries/en.ts`, `ko.ts` (번역 말고 한국 손님용으로 따로 쓰기: 카톡 문의, 한국어 상담 등)
- [ ] DB: 상품에 `titleKo`, `descriptionKo` 추가 (비우면 영어로 보임). 가격/사진/상태는 공유
- [ ] admin 상품 폼에 한국어 칸 추가
- [ ] 언어별 metadata + hreflang + sitemap에 두 언어 주소 모두
- [ ] 헤더에 `EN | 한국어` 전환 버튼 (자동 리다이렉트는 하지 않기)
- [ ] 네이버 서치어드바이저 등록, 네이버 블로그/카페(호주나라)에 `/ko` 링크
