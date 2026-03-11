import { defineStore } from "pinia";
import { ref } from "vue";
import type { UploadFile } from "element-plus";
import { get, set, unset } from "lodash-es";

export const useImageStore = defineStore("image", () => {
  const fileListMap = ref<Record<string, Record<number, UploadFile[]>>>({}); // 用于存储上传的文件列表
  const getFileList = (quesId: string, serial_num: number) => {
    return get(fileListMap.value, [quesId, serial_num], []);
  };
  const setFileList = (quesId: string, serial_num: number, fileList: UploadFile[]) => {
    set(fileListMap.value, [quesId, serial_num], fileList);
  };
  const clearFileList = (quesId: string) => {
    unset(fileListMap.value, [quesId]);
  };

  return { fileListMap, getFileList, setFileList, clearFileList };
}, { persist: true });

