<template>
  <div class="favourites">
    <h1>Your Favourite Jokes</h1>
    <p>Here are all the jokes you've marked as favourites!</p>
    <div v-if="favourites.length === 0" class="no-favourites">
      <p>You don't have any favourite jokes yet.</p>
    </div>
    <div v-else class="joke-list">
      <ul>
        <li v-for="(joke, index) in favourites" :key="index" class="joke-item">
          <p v-if="joke.type === 'single'">{{ joke.joke }}</p>
          <p v-else>
            <strong>{{ joke.setup }}</strong>
            <br />
            {{ joke.delivery }}
          </p>
          <button @click="removeFavourite(index)" class="delete-btn">❌</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favourites",
  data() {
    return {
      favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
    };
  },
  methods: {
    removeFavourite(index) {
      this.favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
  },
};
</script>

<style scoped>
.favourites {
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

.joke-list {
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 1);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.joke-item p {
  margin: 0;
  color: #333333;
}

.no-favourites {
  color: #fff;
  font-size: 1.2rem;
  margin-top: 20px;
}

.btn {
  background: rgba(195, 93, 245, 1);
  color: #333333;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
}

.btn:hover {
  background: rgba(195, 93, 245, 0.8);
}

.delete-btn {
  background: rgba(124, 254, 91, 1);
  color: #333333;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid black;
}
</style>
