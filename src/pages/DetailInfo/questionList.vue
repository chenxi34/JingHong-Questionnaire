<template>
  <div class=" flex-1">
    <div v-if="mode === 'ques'" class="bg-base-200 dark:bg-customGray flex-1  overflow-y-auto h-[80vh]">
      <div v-if="schema && schema.quesConfig" class="flex-col justify-center p-20 pb-0">
        <div class="flex justify-center items-center flex-col gap-10">
          <input v-model="schema.quesConfig.title" class="input questionHeader text-2xl text-center" placeholder="问卷标题">
          <textarea v-model="schema.quesConfig.desc" class=" textarea questionHeader text-md resize-none" placeholder="问卷描述" />
        </div>
      </div>
      <div class="divider" />
      <div v-if="schema && schema.quesConfig" class="flex flex-col gap-5 bg-base-100 dark:bg-customGray">
        <div
          v-for="q in schema.quesConfig.questionList"
          :key="q.serialNum"
          @click="activeSerial = q.serialNum"
        >
          <div class="relative flex items-center gap-4 w-full dark:bg-[#1A1A1A]">
            <div v-if="q.quesSetting.questionType === QuesItemType.RADIO" class="questionItems">
              <el-skeleton animated :loading="loading">
                <radio
                  v-model:title="q.subject"
                  v-model:options="q.options"
                  v-model:serial-num="q.serialNum"
                  v-model:unique="q.quesSetting.unique"
                  v-model:option-choose="q.quesSetting.required"
                  v-model:other-option="q.quesSetting.otherOption"
                  v-model:describe="q.description"
                  :is-active="q.serialNum === activeSerial"
                  @on-click="deleteQuestion(q.serialNum)"
                />
              </el-skeleton>
            </div>
            <div v-if="q.quesSetting.questionType === QuesItemType.CHECKBOX" class="questionItems">
              <el-skeleton animated :loading="loading">
                <template #template>
                  <skeleton-card />
                </template>
                <template #default>
                  <checkbox
                    v-model:title="q.subject"
                    v-model:options="q.options"
                    v-model:serial-num="q.serialNum"
                    v-model:unique="q.quesSetting.unique"
                    v-model:option-choose="q.quesSetting.required"
                    v-model:other-option="q.quesSetting.otherOption"
                    v-model:describe="q.description"
                    v-model:maximum-option="q.quesSetting.maximumOption"
                    v-model:minimum-option="q.quesSetting.minimumOption"
                    :is-active="q.serialNum === activeSerial"
                    @on-click="deleteQuestion(q.serialNum)"
                  />
                </template>
              </el-skeleton>
            </div>
            <div v-if="q.quesSetting.questionType === QuesItemType.INPUT" class="questionItems">
              <el-skeleton animated :loading="loading">
                <template #template>
                  <skeleton-card />
                </template>
                <template #default>
                  <fill
                    v-model:title="q.subject"
                    v-model:serial-num="q.serialNum"
                    v-model:reg="q.quesSetting.reg"
                    v-model:unique="q.quesSetting.unique"
                    v-model:option-choose="q.quesSetting.required"
                    v-model:describe="q.description"
                    :is-active="q.serialNum === activeSerial"
                    @on-click="deleteQuestion(q.serialNum)"
                  />
                </template>
              </el-skeleton>
            </div>
            <div v-if="q.quesSetting.questionType === QuesItemType.TEXTAREA" class="questionItems">
              <el-skeleton :loading="loading">
                <template #template>
                  <skeleton-card />
                </template>
                <template #default>
                  <text-area
                    v-model:title="q.subject"
                    v-model:serial-num="q.serialNum"
                    v-model:unique="q.quesSetting.unique"
                    v-model:option-choose="q.quesSetting.required"
                    v-model:describe="q.description"
                    :is-active="q.serialNum === activeSerial"
                    @on-click="deleteQuestion(q.serialNum)"
                  />
                </template>
              </el-skeleton>
            </div>
            <div v-if="q.quesSetting.questionType === QuesItemType.PHOTO" class="questionItems">
              <el-skeleton animated :loading="loading">
                <template #template>
                  <skeleton-card />
                </template>
                <template #default>
                  <file
                    v-model:title="q.subject"
                    v-model:serial-num="q.serialNum"
                    v-model:unique="q.quesSetting.unique"
                    v-model:option-choose="q.quesSetting.required"
                    v-model:describe="q.description"
                    :is-active="q.serialNum === activeSerial"
                    @on-click="deleteQuestion(q.serialNum)"
                  />
                </template>
              </el-skeleton>
            </div>

            <div v-if="q.serialNum === activeSerial" class="flex flex-col gap-10">
              <button
                v-if="q.serialNum !== 1"
                class="questionButton"
                @click.stop="activeMove(activeSerial-1, 'up')"
              >
                ↑
              </button>

              <button
                v-if="q.serialNum !== schema.quesConfig.questionList.length"
                class="questionButton"
                @click.stop="activeMove(activeSerial-1, 'down')"
              >
                ↓
              </button>

              <button
                class="questionButton"
                @click.stop="activeDelete(activeSerial-1)"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center gap-10 mt-10">
      <button
        class="btn btn-sm questionActionButton"
        style="border-radius: 0"
        @click="handleSaveBtnClick"
      >
        保存
      </button>
      <button
        class="btn btn-sm questionActionButton"
        style="border-radius: 0"
        @click="handlePublishBtnClick"
      >
        发布
      </button>
    </div>
  </div>
  <modal modal-id="NewQuestionnaireSubmit">
    <template #title>
      确认发布
    </template>
    <template #default>
      该操作会直接发布问卷!请确认问卷无误
    </template>
    <template #action>
      <button class="btn btn-success w-80" @click="publishQues">
        确认
      </button>
    </template>
  </modal>
  <modal modal-id="SaveQuestionnaireSubmit">
    <template #title>
      保存更改
    </template>
    <template #default>
      确认要保存更改吗?
    </template>
    <template #action>
      <button class="btn btn-success dark:opacity-75 w-80" @click="saveQues">
        确认
      </button>
    </template>
  </modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Checkbox from "@/pages/DetailInfo/question/checkbox.vue";
import Fill from "@/pages/DetailInfo/question/fill.vue";
import TextArea from "@/pages/DetailInfo/question/textArea.vue";
import File from "@/pages/DetailInfo/question/file.vue";
import radio from "@/pages/DetailInfo/question/radio.vue";
// import {SortableEvent, VueDraggable} from 'vue-draggable-plus'
import SkeletonCard from "@/pages/DetailInfo/skeletonCard.vue";

import { useEditStore } from "@/stores/edit";

import { QuesItemType } from "@/utilities/constMap.ts";

import { useActiveStore } from "@/stores/edit";

import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import { showModal, modal } from "@/components";
import router from "@/router";
import { useRequest } from "vue-hooks-plus";
import {
  setQuestionnaireDetailAPI,
  updateQuestionnaireStatusAPI
} from "@/apis";
import { createQuestionnaireDetailAPI } from "@/apis";
import { closeLoading, startLoading } from "@/utilities";

const loading = ref(true);

const editStore = useEditStore();
const { deleteQuestion, moveQuestion, resetSchema } = editStore;
const { schema, surveyId } = storeToRefs(editStore);

watch(schema, (newVal) => {
  if (newVal) {
    loading.value = false;
  }
}, { immediate: true });

const { activeSerial } = storeToRefs(useActiveStore());

/** 是否是新问卷 */
const isNew = computed(() => surveyId.value === -1);
const activeMove = (index: number, action: "up" | "down") => {
  moveQuestion(index, action);
  if (action === "up") {
    activeSerial.value = activeSerial.value - 1;
  } else {
    activeSerial.value = activeSerial.value + 1;
  }
};

const activeDelete = (index: number) => {
  deleteQuestion(index);
  activeSerial.value = -1;
};

const mode = ref("ques");

// 创建问卷
const { run: runCreate } = useRequest(createQuestionnaireDetailAPI, {
  manual: true,
  onBefore: () => startLoading(),
  onSuccess(res: any) {
    if (res.code === 200 && res.msg === "OK") {
      if (schema.value.status === 1) {
        ElNotification.success("创建并保存为草稿成功");
        resetSchema();
      } else {
        ElNotification.success("创建并发布成功");
      }
      router.push("/admin");
    } else {
      ElNotification.error(res.msg);
    }
  },
  onError: (e) => ElNotification.error(e),
  onFinally: () => {
    showModal("NewQuestionnaireSubmit", true);
    closeLoading();
  }
});

// 更新问卷内容
const { run: runUpdateContent } = useRequest(setQuestionnaireDetailAPI, {
  manual: true,
  onBefore: () => startLoading(),
  onSuccess(res: any) {
    if (res.code === 200 && res.msg === "OK") {
      ElNotification.success("保存成功");
      router.push("/admin");
    } else {
      ElNotification.error(res.msg);
    }
  },
  onError: (e) => ElNotification.error(e),
  onFinally: () => {
    showModal("SaveQuestionnaireSubmit", true);
    closeLoading();
  }
});

// 更新问卷状态
const { run: runUpdateStatus } = useRequest(updateQuestionnaireStatusAPI, {
  manual: true,
  onBefore: () => startLoading(),
  onSuccess(res: any) {
    if (res.code === 200 && res.msg === "OK") {
      ElNotification.success("发布成功");
      router.push("/admin");
    } else {
      ElNotification.error(res.msg);
    }
  },
  onError: (e) => ElNotification.error(e),
  onFinally: () => {
    showModal("NewQuestionnaireSubmit", true);
    closeLoading();
  }
});

/** 点击保存按钮 */
const handleSaveBtnClick = () => {
  showModal("SaveQuestionnaireSubmit");
};

/** 点击发布按钮 */
const handlePublishBtnClick = () => {
  showModal("NewQuestionnaireSubmit");
};

/** 发布问卷 */
const publishQues = async () => {
  if (isNew.value) {
    // 新建 -> 创建并发布
    schema.value.status = 2;
    runCreate(schema.value);
  } else {
    // 已有 -> 先保存内容，再更新状态
    startLoading();
    try {
      const data = { ...schema.value, id: surveyId.value };

      // 1. 更新内容
      const contentRes = await setQuestionnaireDetailAPI(data);
      if (contentRes.code !== 200) {
        throw new Error(contentRes.msg || "保存内容失败");
      }

      // 2. 更新状态
      runUpdateStatus({ id: surveyId.value, status: 2 });
    } catch (e: any) {
      ElNotification.error(e.message || e);
      closeLoading();
    }
  }
};

/** 保存问卷 */
const saveQues = () => {
  // 新建场景的"保存"为创建草稿
  if (isNew.value) {
    schema.value.status = 1;
    runCreate(schema.value);
    return;
  }

  // 编辑场景才走更新
  const data = { ...schema.value, id: surveyId.value };
  runUpdateContent(data);
};
</script>

<style scoped>
.questionButton {
  @apply rounded-full w-24 h-24 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-white transition-colors duration-200
}
.questionHeader {
  @apply bg-base-200 flex focus:bg-base-100 hover:border-gray-300 w-[100%] dark:bg-customGray
}
.questionItems {
  @apply flex-grow w-full
}
.questionActionButton {
  @apply dark:opacity-75 dark:text-white flex-1 hover:bg-red-200 bg-red-100 hover:border-red-300
}
</style>
