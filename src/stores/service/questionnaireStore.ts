import { defineStore } from "pinia";
import { ref } from "vue";

interface UserAnswerItem {
  id: any;
  serialNum: number;
  answer: any;
}

const useQuestionnaireStore = defineStore("questionnaires", () => {
  const userAnswer = ref<UserAnswerItem[]>([]);
  const searchAnswer = (id: any, serialNum: number) => {
    return userAnswer.value.find(question => question.id === id && question.serialNum === serialNum);
  };
  const updateAnswer = (id: any, serialNum: number, answer: any) => {
    const question = userAnswer.value.find(q => q.id === id && q.serialNum === serialNum);
    if (question) {
      question.answer = answer;
    } else {
      userAnswer.value.push({
        id,
        serialNum,
        answer
      });
    }
  };
  const deleteAnswer = (id: any) => {
    userAnswer.value = userAnswer.value.filter(a => a.id !== id);
  };
  return {
    userAnswer,
    searchAnswer,
    updateAnswer,
    deleteAnswer
  };
}, { persist: true });

export default useQuestionnaireStore;
