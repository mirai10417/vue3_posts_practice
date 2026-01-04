<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { login } from "@/api/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const store = useAuthStore();
const email = ref("yhs1105@test.com");
const password = ref("1234");
const error = ref("");
const loading = ref(false);

const submit = async () => {
  error.value = "";
  loading.value = true;

  try {
    const res = await login({
      email: email.value.trim(),
      password: password.value.trim(),
    });

    store.setLoginSuccess(res.data.accessToken, res.data.username);
    router.push("/home");
  } catch (e) {
    error.value = "아이디 또는 비밀번호를 확인해주세요.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  document.body.classList.add("login-page");
});

onBeforeUnmount(() => {
  document.body.classList.remove("login-page");
});
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="brand">
        <div class="logo">V</div>
        <div class="title-wrap">
          <h1 class="title">로그인</h1>
          <p class="desc">계정 정보를 입력해 주세요</p>
        </div>
      </div>

      <form class="form" @submit.prevent="submit">
        <label class="field">
          <span class="label">아이디(이메일)</span>
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="example@email.com"
            autocomplete="username"
            required
          />
        </label>

        <label class="field">
          <span class="label">비밀번호</span>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            autocomplete="current-password"
            required
          />
        </label>

        <p v-if="error" class="error" role="alert">{{ error }}</p>

        <button class="btn primary" type="submit" :disabled="loading">
          <span v-if="!loading">로그인</span>
          <span v-else>로그인 중...</span>
        </button>

        <div class="divider">
          <span class="line"></span>
          <span class="or">또는</span>
          <span class="line"></span>
        </div>

        <button class="btn ghost" type="button" @click="router.push('/signup')">
          회원가입
        </button>

        <div class="helper">
          <button class="link" type="button">비밀번호를 잊으셨나요?</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* page background */
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(
      1200px 600px at 10% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 90% 20%,
      rgba(16, 185, 129, 0.12),
      transparent 55%
    ),
    radial-gradient(
      900px 500px at 40% 100%,
      rgba(59, 130, 246, 0.1),
      transparent 60%
    ),
    #0b1220;
}

/* card */
.card {
  width: 100%;
  max-width: 420px;
  border-radius: 18px;
  padding: 22px 22px 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
}

/* header */
.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: white;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.95),
    rgba(59, 130, 246, 0.9)
  );
  box-shadow: 0 10px 22px rgba(59, 130, 246, 0.22);
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
}

.desc {
  margin: 2px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.62);
}

/* form */
.form {
  display: grid;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
}

.label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.input {
  width: 100%;
  border-radius: 12px;
  padding: 12px 12px;
  font-size: 14px;
  outline: none;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background 0.15s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.input:focus {
  border-color: rgba(99, 102, 241, 0.65);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
  background: rgba(255, 255, 255, 0.08);
}

.error {
  margin: 0;
  font-size: 13px;
  color: rgba(248, 113, 113, 0.95);
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.22);
  padding: 10px 12px;
  border-radius: 12px;
}

/* buttons */
.btn {
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 12px 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.06s ease, opacity 0.15s ease, filter 0.15s ease;
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.primary {
  color: white;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.95),
    rgba(59, 130, 246, 0.95)
  );
  box-shadow: 0 14px 30px rgba(59, 130, 246, 0.25);
}

.primary:hover {
  filter: brightness(1.02);
}

.ghost {
  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* divider */
.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0 2px;
}

.line {
  height: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.12);
}

.or {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

/* helper */
.helper {
  display: grid;
  place-items: center;
  margin-top: 2px;
}

.link {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0.9;
}

.link:hover {
  opacity: 1;
}

:global(body.login-page) {
  background: radial-gradient(
      1200px 600px at 10% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 60%
    ),
    radial-gradient(
      900px 500px at 90% 20%,
      rgba(16, 185, 129, 0.12),
      transparent 55%
    ),
    radial-gradient(
      900px 500px at 40% 100%,
      rgba(59, 130, 246, 0.1),
      transparent 60%
    ),
    #0b1220;
}
</style>
