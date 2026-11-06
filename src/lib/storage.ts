// 이 파일은 서버에서만 쓴다. (브라우저 번들에 섞이면 빌드 에러)
// 아래 AWS_SECRET_ACCESS_KEY가 손님 브라우저로 새는 것을 막는 안전장치.
// .env file 들이 브라우저로 넘어가지않게 server-only를 사용해야함
import "server-only";

// randomUUID: 겹치지 않는 랜덤 ID를 만들어 주는 Node 기본 함수. 파일 이름으로 쓴다.
// 같은 이름으로 파일이 올라가는것을 방지하기 위해서
import { randomUUID } from "node:crypto";
// Neon Storage는 "S3 호환"이라서 AWS가 만든 S3 라이브러리를 그대로 쓴다.
// - S3Client: 저장소와 대화하는 클라이언트 (getAuth()의 Storage 버전)
// - PutObjectCommand: "파일 하나 올려 줘"라는 명령서
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// 사진을 넣을 버킷(= 저장소 안의 큰 폴더) 이름. neon.ts의 buckets.assets와 같아야 한다.
// 이 버킷은 public_read라서:
//   - 읽기(사진 보기): 누구나 URL만 알면 가능 → 손님 화면에 바로 띄울 수 있음
//   - 쓰기(사진 올리기): 아래 AWS_* 비밀키가 있는 우리 서버만 가능
// BUCKET 이름 자체가 assets으로 감싸져 있다.
// aseets
//  -products/
//  -users/
const BUCKET = "assets";

// 브라우저가 알려 주는 파일 종류(MIME type) → 저장할 때 붙일 확장자.
// 허용하는 사진 형식은 이 4개뿐이다. (product.dto의 C_ImageFilesDTOSchema가 먼저 걸러 줌)
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

// 만든 S3 클라이언트를 담아 둘 보관함. auth/server.ts의 instance와 같은 방식이다.
// 처음 쓸 때 만들어서, env가 없어도 사진 업로드만 실패하고 쇼핑 페이지는 멀쩡하다.
let client: S3Client | undefined;

// 1. 어디에 올릴것인가?
function getEndpoint(): string {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  if (!endpoint) {
    throw new Error("AWS_ENDPOINT_URL_S3 must be set (run `neon env pull`)");
  }
  // 끝에 "/"가 붙어 있으면 떼어 낸다. 안 떼면 URL이 "...tech//assets/..."처럼 슬래시가 두 개가 된다.
  return endpoint.replace(/\/$/, "");
}
// 2. 어떤 통신도구로 연결할것인가?
function getClient(): S3Client {
  // ??= : "client가 비어 있을 때만 오른쪽 값을 넣어라"라는 뜻. (auth/server.ts의 if (!instance) {...}와 같음)
  client ??= new S3Client({
    // 지역 (예: ap-southeast-2 = 시드니). neon deploy가 .env에 넣어 준다.
    region: process.env.AWS_REGION,
    // 요청을 AWS가 아니라 Neon Storage로 보내라는 설정. 이게 없으면 진짜 AWS로 간다.
    endpoint: getEndpoint(),
    // 올리기 권한을 증명하는 열쇠 한 쌍 (아이디 + 비밀번호 같은 것). neon deploy가 .env에 넣어 준다.
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
    // 주소 모양을 "주소/버킷/파일"로 쓰라는 설정.
    // (AWS 기본값은 "버킷.주소/파일"인데 Neon은 이 모양을 지원하지 않는다.)
    forcePathStyle: true,
    // 최신 AWS 라이브러리는 업로드할 때 검증값(checksum)을 자동으로 붙이는데, Neon이 이걸 거부한다.
    // "꼭 필요할 때만 붙여라"로 꺼 둔다. (Neon 공식 문서에 나온 설정)
    requestChecksumCalculation: "WHEN_REQUIRED",
  });
  return client;
}

/**
 * 사진 파일 하나를 `folder/` 아래에 올리고, 누구나 볼 수 있는 URL을 돌려준다.
 *
 * 사용 예: uploadImage(file, "products") → "https://.../assets/products/3f2a...c9.jpg"
 * 이 URL을 Product.images에 그대로 저장하면 손님 화면에 사진이 뜬다.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  // 1) 저장할 파일 이름(key)을 만든다. 예: "products/3f2a...c9.jpg"
  //    원래 파일 이름(IMG_1234.jpg) 대신 랜덤 ID를 써서 이름이 겹쳐 덮어쓰는 일이 없게 한다.
  const extension = EXTENSIONS[file.type] ?? "bin";
  const key = `${folder}/${randomUUID()}.${extension}`;

  // 2) 브라우저에서 받은 File을 Node가 다룰 수 있는 바이트 덩어리(Buffer)로 바꾼다.
  const body = Buffer.from(await file.arrayBuffer());

  // 3) "assets 버킷의 key 위치에 이 파일을 넣어 줘"라는 명령서를 만들어서 Neon Storage로 보낸다.
  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      // 브라우저가 이 파일을 "사진"으로 알아보게 종류를 적어 둔다. (없으면 다운로드 파일로 취급될 수 있음)
      ContentType: file.type,
      // 브라우저에게 "이 사진은 절대 안 바뀌니 1년 동안 다시 받지 말고 저장해 둔 걸 써"라고 알려 준다.
      // 이름이 랜덤이라 같은 이름에 다른 사진이 들어갈 일이 없으니 안전하다. → 페이지가 빨라짐
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  // 4) 올린 사진의 공개 URL을 돌려준다. 모양: 저장소주소/버킷/파일이름
  return `${getEndpoint()}/${BUCKET}/${key}`;
}
