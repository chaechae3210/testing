import type { Config } from "jest";
import nextJest from "next/jest.js";
// nextJest 함수를 호출하여 Jest 구성을 생성하고, 이를 createJestConfig에 할당
const createJestConfig = nextJest({
  dir: "./", // dir 속성은 Next.js 프로젝트 디렉토리를 지정
});

const customJestConfig: Config = {
  // 커버리지 정보를 수집하는 방법을 지정하는 옵션
  coverageProvider: "v8",
  // 테스트 실행 전에 실행할 설정 파일의 경로를 지정
  // 이 경우 jest.setup.js 파일이 테스트 환경 설정 후에 실행됨
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // Jest 테스트 환경을 설정
  testEnvironment: "jsdom",
  // TypeScript로 작성된 코드를 지원하기 위해 'ts-jest' 프리셋을 사용
  preset: "ts-jest",
};

module.exports = createJestConfig(customJestConfig);
