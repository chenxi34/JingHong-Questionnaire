import { defineStore } from "pinia";
import { ref } from "vue";

const useDarkModeStore = defineStore("darkmode", () => {
  const status = ref(false);

  const syncDOM = () => {
    document.documentElement.classList.toggle("dark", status.value);
  };

  const setStatus = (val: boolean) => {
    status.value = val;
    syncDOM();
  };

  const toggle = () => setStatus(!status.value);

  return { status, setStatus, toggle, syncDOM };
}, { persist: true });

export default useDarkModeStore;