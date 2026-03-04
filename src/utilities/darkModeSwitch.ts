import { computed, onBeforeMount } from "vue";
import { useMainStore } from "@/stores";

export function useDarkModeSwitch() {
  const darkModeStore = useMainStore().useDarkModeStore();

  // 启动时根据持久化状态同步一次 DOM
  onBeforeMount(() => darkModeStore.setStatus(darkModeStore.status));

  const darkModeStatus = computed({
    get: () => darkModeStore.status,
    set: (val: boolean) => darkModeStore.setStatus(val)
  });

  const switchDarkMode = () => darkModeStore.toggle();

  return { darkModeStatus, switchDarkMode };
}