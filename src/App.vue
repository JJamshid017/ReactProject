<template>
  <div id="app">
    <nav v-if="!['/login', '/'].includes($route.path)">
      <button class="menu-button" @click="toggleMenu">☰</button>
      <div class="nav-links" :class="{ open: isMenuOpen }">
        <router-link to="/home">Home</router-link>
        <router-link to="/categories">Categories</router-link>
        <router-link to="/search">Search</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
body,
html {
  background-color: #000;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  max-height: 100vh;
  background: rgba(0, 0, 0, 1);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background: rgba(0, 0, 0, 1);
  padding: 15px 0;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

nav .menu-button {
  display: none;
  font-size: 1.5rem;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
}

nav .nav-links {
  display: flex;
  gap: 20px;
}

nav .nav-links a {
  font-size: 1.2rem;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 5px;
}

nav .nav-links a:hover {
  background-color: #35495e;
  color: #ffffff;
}
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  nav .menu-button {
    display: block;
  }

  nav .nav-links {
    display: none;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    background: black;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    top: 50px;
    left: 0;
  }

  nav .nav-links.open {
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    background: black;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    animation: slideIn 0.5s ease-in-out;
  }

  nav .nav-links a {
    font-size: 1rem;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    text-align: left;
    color: #ffffff;
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
