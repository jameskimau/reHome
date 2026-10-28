import { defineConfig } from "@neon/config/v1";
// NEON설정 파일
export default defineConfig({
  // 인증기능 활성화
  auth: true,
  buckets: {
    // public_read 버킷을 생성하고, 모든 파일에 대해 public_read 권한을 부여
    assets: { access: "public_read" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
