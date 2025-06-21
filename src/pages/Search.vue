<template>
  <div class="home">
    <h1>Search Jokes</h1>
    <p>Search for jokes!</p>
    <form @submit.prevent="fetchJokes" class="filter-form">
      <input
        type="text"
        v-model="searchString"
        id="search"
        placeholder="Search jokes"
        required
        class="search-input"
      />
      <br />
      <button type="submit" class="btn">Search</button>
    </form>

    <div v-if="jokes.length > 0 || loading || error" class="joke-list">
      <h2>Jokes:</h2>
      <div v-if="loading" class="loading">Loading jokes...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else class="joke-li">
        <li v-for="joke in jokes" :key="joke.id" class="joke-item">
          <p v-if="joke.type === 'single'">{{ joke.joke }}</p>
          <p v-else>
            <strong>{{ joke.setup }}</strong>
            <br />
            {{ joke.delivery }}
          </p>
          <button type="submit" class="add-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3502/3502704.png"
              alt="Add to Favorites"
              class="btn-img"
              @click="saveToFavourites(joke)"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "Search",
  data() {
    return {
      jokes: [],
      loading: false,
      error: null,
      searchString: "",
    };
  },
  methods: {
    async fetchJokes() {
      this.loading = true;
      this.error = null;
      const params = {
        contains: this.searchString,
        amount: 5,
      };

      try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any", {
          params,
        });
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
body,
html {
  background-color: #333;
  color: #333;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.home {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: rgb(16, 16, 16);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(23, 23, 23, 0.1);
  text-align: center;
}

h1 {
  color: #fff;
  font-size: 2em;
  margin-bottom: 0.5em;
}

h2 {
  color: #fff;
  font-size: 1.5em;
  margin: 1em 0;
}

p {
  color: #fff;
  font-size: 1em;
  margin: 0.5em 0;
}

.search-input {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  font-size: 1em;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  border: none;
  color: #000000;
  outline: none;
}

.btn {
  background-color: rgba(195, 93, 245, 1);
  color: #fff;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: rgba(195, 93, 245, 0.8);
}

.joke-list {
  margin-top: 20px;
  text-align: center;
}

.loading,
.error {
  color: #666;
  font-style: italic;
}

.joke-li {
  list-style-type: none;
  padding: 0;
}

.joke-item {
  background: rgba(124, 254, 91, 1);
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.joke-item p {
  margin: 5px 0;
  color: #000000;
}

.joke-item strong {
  color: #000000;
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
