<template>
  <div class="home">
    <h1>Welcome to Joke App 😂</h1>
    <p>Enjoy a selection of jokes!</p>
    <div class="joke-list">
      <h2>Jokes:</h2>
      <div v-if="loading" class="loading">Loading jokes...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else>
        <li
          v-for="joke in jokes"
          :key="joke.id"
          class="joke-item"
          :class="{ favorite: joke.isFavorite }"
        >
          <p v-if="joke.type === 'single'">{{ joke.joke }}</p>
          <p v-else>
            <strong>{{ joke.setup }}</strong>
            <br />
            {{ joke.delivery }}
          </p>
          <button class="add-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3502/3502704.png"
              alt="Add to Favorites"
              class="btn-img"
              @click="saveToFavourites(joke)"
            />
          </button>
        </li>
      </ul>
      <button @click="fetchJokes" class="btn">More jokes</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "Home",
  data() {
    return {
      jokes: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    await this.fetchJokes();
  },
  methods: {
    async fetchJokes() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          "https://v2.jokeapi.dev/joke/Any?amount=10"
        );
        this.jokes = response.data.jokes || [response.data];
      } catch (err) {
        this.error = "please try later";
      } finally {
        this.loading = false;
      }
    },
    saveToFavourites(joke) {
      let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
      if (!favourites.some((fav) => fav.id === joke.id)) {
        favourites.push(joke);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        toast.success("Шутка добавлена в избранное!", {
          position: "top-right",
        });
      } else {
        toast.error("Шутка уже добавлена в избранное!", {
          position: "top-right",
        });
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.home {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 40px 20px;
  color: #333;
  font-family: "Arial", sans-serif;
  background: #111;
  border-radius: 12px;
}

h1 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 30px;
}

.joke-list {
  margin-top: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 1);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.joke-list h2 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 20px;
}

.joke-list ul {
  list-style: none;
  padding: 0;
}

.joke-item {
  margin: 15px 0;
  padding: 20px;
  background: rgba(124, 254, 91, 1);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.joke-item p {
  margin: 0;
  color: #333333;
}
.btn {
  background: rgba(195, 93, 245, 1);
  color: #333333;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn:hover {
  background: rgba(195, 93, 245, 0.8);
}

.loading,
.error {
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;
}
.add-btn {
  background: none;
  border: none;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  background-color: rgba(255, 215, 0, 0.2);
}

.add-btn:active {
  background-color: rgba(255, 215, 0, 0.4);
}

.add-btn:focus {
  outline: 1px solid rgba(255, 215, 0, 0.6);
}

.btn-img {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease;
}

.add-btn:hover .btn-img {
  transform: scale(1.1);
}

.add-btn:active .btn-img {
  transform: scale(1);
}
</style>
