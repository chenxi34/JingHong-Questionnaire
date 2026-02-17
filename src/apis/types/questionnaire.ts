/**
 * 问卷结构的共享类型定义
 * 被 getQuestionnaireDetailTypes / setNewQuestionnaireDetailTypes /
 *    setQuestionnaireDetailTypes / getUserTypes 等多处复用
 */

/** 问卷基础配置 */
export interface QuestionnaireBaseConfig {
  /** 每日提交限制，当启用统一验证时生效 */
  dayLimit: number;
  /** 结束时间，xxxx-xx-xxTxx:xx:xxZ */
  endTime: string;
  /** 是否在收到回答时发送邮件提醒 */
  needNotify?: boolean;
  /** 开始时间，xxxx-xx-xxTxx:xx:xxZ */
  startTime: string;
  /** 总提交次数限制，当启用统一验证时生效 */
  sumLimit?: number;
  /** 仅本科生，是否仅本科生 */
  undergradOnly: boolean;
  /** 是否统一登录验证 */
  verify: boolean;
}

/** 问卷问题配置 */
export interface QuestionnaireQuesConfig {
  desc: string;
  questionList: QuestionnaireQuestion[];
  title: string;
}

/** 问卷问题 */
export interface QuestionnaireQuestion {
  description?: string;
  /** 题目编号，GET 响应中返回 */
  id?: number;
  /** 图片链接 */
  img?: string;
  options?: QuestionnaireOption[];
  quesSetting: QuestionnaireQuesSetting;
  /** 问题序号 */
  serialNum: number;
  /** 问题题目 */
  subject?: string;
}

/** 问卷选项 */
export interface QuestionnaireOption {
  /** 选项内容 */
  content?: string;
  /** 描述 */
  description?: string;
  /** 选项编号，GET 响应中返回 */
  id?: number;
  /** 选项图片 */
  img?: string;
  /** 选项序号 */
  serialNum?: number;
}

/** 问题设置 */
export interface QuestionnaireQuesSetting {
  /** 多选所选最大限制数量，0为不限制 */
  maximumOption?: number;
  /** 多选所选最小限制，0为不限制 */
  minimumOption?: number;
  /** 是否有其他选项 */
  otherOption?: boolean;
  /** 问题类型，调研问卷为1单选2多选3填空4简答5图片6文件，投票问卷为1投票 */
  questionType: number;
  /** 正则表达式 */
  reg?: string;
  /** 是否必须作答 */
  required: boolean;
  /** 是否唯一 */
  unique: boolean;
}
