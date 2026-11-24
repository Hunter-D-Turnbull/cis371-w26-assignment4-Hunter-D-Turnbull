
<template>
  <div>
    <!-- Beverage Display -->
    <Beverage
      :isIced="currentTemp === 'Cold'"
      :base="selectedBase"
      :creamer="selectedCreamer"
      :syrup="selectedSyrup"
    />

    <ul>
      <!-- Temperature Selection -->
      <li>
        <label v-for="temp in temps" :key="temp">
          <input
            type="radio"
            name="temperature"
            :value="temp"
            v-model="currentTemp"
          />
          {{ temp }}
        </label>
      </li>

      <!-- Base Beverage Selection -->
      <li>
        <label v-for="base in bases" :key="base.id">
          <input
            type="radio"
            name="base"
            :value="base.id"
            v-model="currentBase"
          />
          {{ base.name }}
        </label>
      </li>

      <!-- Syrup Selection -->
      <li>
        <label v-for="syrup in syrups" :key="syrup.id">
          <input
            type="radio"
            name="syrup"
            :value="syrup.id"
            v-model="currentSyrup"
          />
          {{ syrup.name }}
        </label>
      </li>

      <!-- Creamer Selection -->
      <li>
        <label v-for="creamer in creamers" :key="creamer.id">
          <input
            type="radio"
            name="creamer"
            :value="creamer.id"
            v-model="currentCreamer"
          />
          {{ creamer.name === "No Cream"
            ? "No Creamer"
            : creamer.name }}
        </label>
      </li>
    </ul>

    <!-- Create a Beverage -->
    <div>
      <label for="beverageName">Name: </label>

      <input
        id="beverageName"
        type="text"
        placeholder="Beverage Name"
        v-model="beverageName"
      />

      <button @click="beverageStore.makeBeverage()">
        Make Beverage
      </button>
    </div>

    <!-- Saved Beverage Recipes -->
    <div id="beverage-container">
      <ul>
        <li
          v-for="beverage in beverages"
          :key="beverage.id"
        >
          <label>
            <input
              type="radio"
              name="savedBeverage"
              :value="beverage.id"
              :checked="selectedBeverageId === beverage.id"
              @change="beverageStore.showBeverage(beverage)"
            />

            {{ beverage.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();

const {
  temps,
  bases,
  creamers,
  syrups,

  currentTemp,
  currentBase,
  currentCreamer,
  currentSyrup,

  beverageName,
  beverages,
  selectedBeverageId,

  selectedBase,
  selectedCreamer,
  selectedSyrup,
} = storeToRefs(beverageStore);
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;

  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}

ul {
  list-style: none;
}

li {
  margin-bottom: 12px;
}

label {
  margin-right: 5px;
}

#beverage-container {
  margin-top: 15px;
}
</style>
