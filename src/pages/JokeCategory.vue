<template>
  <div class="home">
    <form @submit.prevent="fetchJokes" class="filter-form">
      <h1>Select filters and search for jokes!</h1>
      <label for="category">Category:</label>
      <select v-model="category" id="category">
        <option value="">Any</option>
        <option value="programming">Programming</option>
        <option value="misc">Miscellaneous</option>
        <option value="dark">Dark</option>
        <option value="pun">Pun</option>
        <option value="spooky">Spooky</option>
        <option value="christmas">Christmas</option>
      </select>
      <label for="language">Language:</label>
      <select v-model="language" id="language">
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <label for="flags">Blacklist:</label>
      <select v-model="blacklistFlags" id="flags" multiple>
        <option value="nsfw">NSFW</option>
        <option value="religious">Religious</option>
        <option value="political">Political</option>
        <option value="racist">Racist</option>
        <option value="sexist">Sexist</option>
        <option value="explicit">Explicit</option>
      </select>
      <label for="type">Joke Type:</label>
      <select v-model="type" id="type">
        <option value="">Any</option>
        <option value="single">Single</option>
        <option value="twopart">Two Part</option>
      </select>
      <button @click="fetchJokes" class="btn">Search</button>
    </form>

    <div v-if="jokes.length > 0 || loading || error" class="joke-list">
      <h2>Jokes:</h2>
      <div v-if="loading" class="loading">Loading jokes...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else class="joke-li">
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
  name: "JokeCategory",
  data() {
    return {
      jokes: [],
      loading: false,
      error: null,
      category: "",
      language: "en",
      blacklistFlags: [],
      type: "",
    };
  },
  methods: {
    async fetchJokes() {
      this.loading = true;
      this.error = null;
      const params = {
        lang: this.language,
        category: this.category,
        blacklistFlags: this.blacklistFlags.join(","),
        type: this.type,
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
.home {
  max-width: 800px;
  margin: auto;
  text-align: center;
  align-items: center;
  padding: 40px 20px;
  color: #fff;
  font-family: "Arial", sans-serif;
  background: #111;
  border-radius: 12px;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
  text-align: center;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
  text-align: center;
}

.filter-form {
  display: grid;
  gap: 15px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 20px;
  justify-items: center;
}

.filter-form select,
.filter-form button {
  padding: 10px;
  font-size: 1em;
  border: 1px solid;
  border-radius: 7px;
  width: 100%;
  outline: none;
}
.btn {
  background-color: rgba(195, 93, 245, 1);
}
#category::placeholder {
  content: "Select Category";
}

#language::placeholder {
  content: "Select Language";
}

#flags::placeholder {
  content: "Blacklist Flags";
}

#type::placeholder {
  content: "Select Joke Type";
}

.btn {
  padding: 10px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid;
  border-radius: 4px;
}

.joke-list {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.loading,
.error {
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 10px;
}

.joke-li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.joke-item {
  padding: 20px;
  margin: 10px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  width: auto;
  height: auto;
  background: rgba(124, 254, 91, 1);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #111;
}

.joke-item strong {
  font-weight: bold;
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
