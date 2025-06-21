<template>
  <div class="container">
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div>
          <input
            type="text"
            v-model="username"
            required
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            required
            placeholder="Password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <router-link to="/login">Already have an account? Login</router-link>
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
      errorMessage: "",
    };
  },
  methods: {
    handleRegister() {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.find(
        (user) => user.username === this.username
      );

      if (userExists) {
        this.errorMessage = "User already exists!";
        toast.error("User already exists!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        existingUsers.push({
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("users", JSON.stringify(existingUsers));
        this.$router.push("/home");
        toast.success("Registration successful!", { position: "top-right" });
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
  box-shadow: #77c9ff;
}

.register {
  max-width: 500px;
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  background: #111;
  border-radius: 12px;
  color: #ffffff;
  font-family: "Arial", sans-serif;
}
.register h1 {
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: bold;
}

.register label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffffff;
}

.register input[type="text"],
.register input[type="password"] {
  width: 70%;
  padding: 10px;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  color: #333;
  outline: none;
}

.register button {
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

.register button:hover {
  background-color: rgba(195, 93, 245, 0.8);
}

.register .error {
  color: #d9534f;
  font-size: 1.2rem;
  margin-top: 1rem;
}

.register a {
  display: block;
  margin-top: 1rem;
  color: #77c9ff;
  text-decoration: none;
  font-size: 1rem;
}

.register a:hover {
  text-decoration: underline;
}
</style>
