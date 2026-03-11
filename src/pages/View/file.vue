<template>
  <div class="rounded mx-5 mt-30">
    <div class="flex justify-between">
      <div class="flex-col">
        <div class="flex items-center gap-20">
          <span class="lg:text-xl md:text-md">{{ serialNum }}</span>
          <span class="lg:text-xl md:text-md flex gap-5 items-center">
            {{ title }}
            <el-tag type="primary" class="ml-5">图片</el-tag>
            <el-tag v-if="!required" type="warning">选答</el-tag>
            <el-tag v-if="unique" type="danger">唯一</el-tag>
          </span>
        </div>
        <div class="flex items-center mt-15 ml-10">
          <pre class="text-sm text-gray-500 break-all">{{ describe }}</pre>
        </div>
      </div>
      <div class="flex-col justify-center items-center" />
    </div>
    <div class="divider my-5" />
    <div class="flex-col p-5 h-auto">
      <!-- 开发环境下 action 前面加/api-->
      <el-upload
        :class="{ 'hide-upload-trigger': fileList.length >= 1 }"
        action="/api/user/upload/img"
        list-type="picture-card"
        auto-upload
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        name="img"
      >
        <el-icon><plus /></el-icon>

        <template #file="{ file, index }: {file: UploadFile; index: number}">
          <div v-loading="file.status === 'uploading'">
            <img class="el-upload-list__item-thumbnail" :src="file.url">
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(index)"
              >
                <el-icon><delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image">
      </el-dialog>
      <p v-if="uploadErrorText" class="mt-8 text-sm text-red-500">
        {{ uploadErrorText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { UploadFile, UploadFiles, UploadRawFile } from "element-plus";
import { ElMessage } from "element-plus";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { useMainStore } from "@/stores";
import { isEmpty } from "lodash-es";

const props = defineProps<{
  questionnaireID: string;
  serialNum: number;
  title: string;
  required: boolean;
  unique: boolean;
  describe: string;
  answer: string;
}>();

const imageStore = useMainStore().useImageStore();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const uploadErrorText = ref("");
const fileList = computed({
  get: () => imageStore.getFileList(props.questionnaireID, props.serialNum),
  set: (newValue: UploadFile[]) => imageStore.setFileList(props.questionnaireID, props.serialNum, newValue)
});

const localAnswer = ref(props.answer);

// TODO: 状态持久化写得稀碎，被迫使用以下临时方案。重构时请删除，在父组件统一管理状态持久化
onMounted(() => {
  if (!isEmpty(fileList.value)) {
    localAnswer.value = fileList.value[0].url ?? "";
  }
});

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleRemove = (index: number) => {
  fileList.value = fileList.value.filter((_, i) => i !== index);
  localAnswer.value = "";
  uploadErrorText.value = "";
};

type UploadResponse = {
  code: number;
  msg?: string;
  data?: string;
};

// 上传成功回调
const handleUploadSuccess = (response: UploadResponse, file: UploadFile, files: UploadFiles) => {
  if (response.code == 200 && typeof response.data === "string" && response.data.length > 0) {
    ElMessage.success("上传成功！");
    uploadErrorText.value = "";
    file.url = response.data;
    fileList.value = files;
    localAnswer.value = file.url ?? ""; // TODO: 后续支持单题多文件后，应当改为支持数组的写法
  } else {
    const errorMsg = response.msg || "上传失败，请重新上传";
    uploadErrorText.value = errorMsg;
    localAnswer.value = "";
    fileList.value = files.filter((uploadFile) => uploadFile.uid !== file.uid);
    ElMessage.error(errorMsg);
  }
};

const handleUploadError = (error: Error, file: UploadFile, files: UploadFiles) => {
  const errorMsg = error.message || "图片上传失败，请检查网络后重试";
  uploadErrorText.value = errorMsg;
  localAnswer.value = "";
  fileList.value = files.filter((uploadFile) => uploadFile.uid !== file.uid);
  ElMessage.error(errorMsg);
};

const handleExceed = () => {
  uploadErrorText.value = "";
  ElMessage.warning("最多只能上传一张图片！");
};

const allowedImageMimeTypes = new Set(["image/png", "image/jpeg", "image/webp"]);
const allowedImageExtensions = new Set(["png", "jpg", "jpeg", "webp"]);

const beforeUpload = (file: UploadRawFile) => {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const isSvg = file.type === "image/svg+xml" || extension === "svg";
  const isAllowedType = allowedImageMimeTypes.has(file.type) || allowedImageExtensions.has(extension);

  if (isSvg) {
    uploadErrorText.value = "暂不支持 SVG 格式，请上传 PNG/JPG/JPEG/WEBP 图片";
    ElMessage.error(uploadErrorText.value);
    return false;
  }

  if (!isAllowedType) {
    uploadErrorText.value = "仅支持 PNG/JPG/JPEG/WEBP 格式图片";
    ElMessage.error(uploadErrorText.value);
    return false;
  }

  uploadErrorText.value = "";
  return true; // 如果返回 false，则会取消上传
};

const emits = defineEmits(["update:answer"]);

watch(localAnswer, (newAnswer) => {
  emits("update:answer", newAnswer);
});

</script>

<style>
:deep(.hide-upload-trigger .el-upload--picture-card) {
  display: none;
}
</style>
