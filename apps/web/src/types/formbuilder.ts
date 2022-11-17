export enum QuestionType {
  Radio = 'radio',
  Checkbox = 'checkbox',
  Text = 'text',
  TextArea = 'textarea',
  MultipleText = 'multiple-text',
  Range = 'range',
}

export interface IFormSection {
  sectionNo: number
  sectionName: string
  questions: IFormGroup[]
}

export interface IFormGroup {
  groupName: string
  isTitleShown: boolean
  questions: IFormQuestion[]
}

type IFormQuestion =
  | IFormQuestionRadio
  | IFormQuestionCheckbox
  | IFormQuestionText
  | IFormQuestionTextArea
  | IFormQuestionMultipleText

export interface IFormQuestionBase {
  key: string
  questionNo: number
  question: string
  questionType: QuestionType
}

export interface IFormQuestionRadio extends IFormQuestionBase {
  questionType: QuestionType.Radio
  options: IFormQuestionOption[]
}

export interface IFormQuestionCheckbox extends IFormQuestionBase {
  questionType: QuestionType.Checkbox
  options: IFormQuestionOption[]
}

export interface IFormQuestionOption {
  label: string
  value: string | number
}

export interface IFormQuestionText extends IFormQuestionBase {
  questionType: QuestionType.Text
}

export interface IFormQuestionTextArea extends IFormQuestionBase {
  questionType: QuestionType.TextArea
}

export interface IFormQuestionMultipleText extends IFormQuestionBase {
  questionType: QuestionType.MultipleText
  quantity: number
  subAnswersTitle?: string
}
