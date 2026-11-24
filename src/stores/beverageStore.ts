
import { defineStore } from "pinia";

import tempretures from "../data/tempretures.json";
import basesData from "../data/bases.json";
import creamersData from "../data/creamers.json";
import syrupsData from "../data/syrups.json";

import type {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    bases: basesData as BaseBeverageType[],
    creamers: creamersData as CreamerType[],
    syrups: syrupsData as SyrupType[],

    currentTemp: tempretures[0],
    currentBase: "b2",
    currentCreamer: "c2",
    currentSyrup: "s2",

    beverageName: "",
    beverages: [] as BeverageType[],
    selectedBeverageId: "",
  }),

  getters: {
    selectedBase(state): BaseBeverageType {
      return state.bases.find(
        (item) => item.id === state.currentBase
      )!;
    },

    selectedCreamer(state): CreamerType {
      return state.creamers.find(
        (item) => item.id === state.currentCreamer
      )!;
    },

    selectedSyrup(state): SyrupType {
      return state.syrups.find(
        (item) => item.id === state.currentSyrup
      )!;
    },
  },

  actions: {
    makeBeverage() {
      const name = this.beverageName.trim();

      if (!name) {
        return;
      }

      const newBeverage: BeverageType = {
        id: Date.now().toString(),
        name: name,
        temp: this.currentTemp,

        base: { ...this.selectedBase },
        creamer: { ...this.selectedCreamer },
        syrup: { ...this.selectedSyrup },
      };

      this.beverages.push(newBeverage);

      this.selectedBeverageId = newBeverage.id;

      this.beverageName = "";
    },

    showBeverage(beverage: BeverageType) {
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base.id;
      this.currentCreamer = beverage.creamer.id;
      this.currentSyrup = beverage.syrup.id;

      this.selectedBeverageId = beverage.id;
    },
  },

  persist: true,
});
