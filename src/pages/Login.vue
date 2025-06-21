<template>
  <div class="container">
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input
          type="text"
          id="username"
          v-model="username"
          required
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
        <router-link to="/" class="register"
          >Don't have an account? Register</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        toast.success("Login successful!", { position: "top-right" });
        this.$router.push("/home");
      } else {
        this.error = "wrong username or password.";
        toast.error("Wrong username or password!", { position: "top-right" });
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  max-width: 500px;
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  background: #111;
  border-radius: 12px;
  color: #ffffff;
  font-family: "Arial", sans-serif;
}
.login h1 {
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: bold;
}

.login label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffffff;
}

.login input[type="text"],
.login input[type="password"] {
  width: 70%;
  padding: 10px;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  color: #333;
  outline: none;
}

.login button {
  width: 74%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: rgba(195, 93, 245, 1);
  color: #333333;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login button:hover {
  background-color: rgba(195, 93, 245, 0.8);
}

.error {
  color: #d9534f;
  font-size: 1.2rem;
  margin-top: 1rem;
}
.register {
  display: block;
  margin-top: 1rem;
  color: #77c9ff;
  text-decoration: none;
  font-size: 1rem;
}
</style>
