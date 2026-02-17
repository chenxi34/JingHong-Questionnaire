import { defineStore } from "pinia";
import { ref } from "vue";

const useDarkModeStore = defineStore("darkmode", () => {
  const status = ref(false);
  const setStatus = (tempStatus: boolean) => {
    status.value = tempStatus;
  };
  return {
    status,
    setStatus
  };
}, { persist: true });

export default useDarkModeStore;