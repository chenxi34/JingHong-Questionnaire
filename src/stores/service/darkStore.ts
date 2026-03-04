import { defineStore } from "pinia";
import { ref } from "vue";

const useDarkModeStore = defineStore("darkmode", () => {
  const status = ref(false);

  const setStatus = (val: boolean) => {
    status.value = val;
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggle = () => setStatus(!status.value);

  return { status, setStatus, toggle };
}, { persist: true });

export default useDarkModeStore;