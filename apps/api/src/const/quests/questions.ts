/* eslint-disable no-unused-vars */
export enum QUESTION_TYPE {
  TEXT_FIELD = 'TEXT_FIELD',
  TEXT_AREA = 'TEXT_AREA',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_SELECT = 'MULTIPLE_SELECT',
}

export type IQuestion<T = string> =
  | TextFieldQuestion<T>
  | TextAreaQuestion<T>
  | MultipleChoiceQuestion<T>
  | MultipleSelectQuestion<T>

export interface I18nTranslation {
  th: string
  en: string
}

interface BaseQuestion<T = string> {
  id: string
  type: QUESTION_TYPE
  questNo: number
  questTitle: T
  question: T
}

interface TextFieldQuestion<T> extends BaseQuestion<T> {
  type: QUESTION_TYPE.TEXT_FIELD
  expectedAnswer: string[]
}

interface TextAreaQuestion<T> extends BaseQuestion<T> {
  type: QUESTION_TYPE.TEXT_AREA
  expectedAnswer: string[]
}

interface MultipleChoiceQuestion<T> extends BaseQuestion<T> {
  type: QUESTION_TYPE.MULTIPLE_CHOICE
  choices: Record<string, T>
  expectedAnswer: string | string[]
}

interface MultipleSelectQuestion<T> extends BaseQuestion<T> {
  type: QUESTION_TYPE.MULTIPLE_SELECT
  choices: Record<string, T>
  expectedAnswer: string[]
}

export const QUESTIONS: IQuestion<I18nTranslation>[] = [
  {
    id: 'Q1',
    type: QUESTION_TYPE.TEXT_FIELD,
    questNo: 2,
    questTitle: {
      th: 'Meet & Greet Zone',
      en: 'Meet & Greet Zone',
    },
    question: {
      th: 'จำนวนชมรม (Club) ที่จัดแสดงมีกี่ชมรม',
      en: 'How many clubs do we have for the open house?',
    },
    expectedAnswer: ['4', 'four', 'สี่', '4 ชมรม', '4 clubs', 'four clubs', '4 club', 'four club'],
  },
  {
    id: 'Q2',
    type: QUESTION_TYPE.TEXT_FIELD,
    questNo: 3,
    questTitle: {
      th: 'International Experiences Zone',
      en: 'International Experiences Zone',
    },
    question: {
      th: 'ประเทศที่มีจำนวน Exchange Students มากที่สุดคือประเทศใด',
      en: 'Which country has the highest number of exchange students?',
    },
    expectedAnswer: ['japan', 'ญี่ปุ่น', 'jp', 'ญป'],
  },
  {
    id: 'Q3',
    type: QUESTION_TYPE.TEXT_FIELD,
    questNo: 4,
    questTitle: {
      th: 'Guidance Zone',
      en: 'Guidance Zone',
    },
    question: {
      th: 'หลักสูตรปริญญาตรี ICT Program มีทั้งหมดกี่ Specializations',
      en: 'How many specializations are there in B.Sc. in ICT Program?',
    },
    expectedAnswer: ['8', 'eight', 'แปด', '8 สาขา', '8 specializations'],
  },
  {
    id: 'Q4',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    questNo: 4,
    questTitle: {
      th: 'Guidance Zone',
      en: 'Guidance Zone',
    },
    question: {
      th: 'หลักสูตรปริญญาตรีใดของคณะ ICT ที่มุ่งเน้นการทำสหกิจศึกษาและฝึกงาน',
      en: 'Which bachelor program at ICT faculty focuses on Cooperative Education/Internship?',
    },
    choices: {
      'ict-program': {
        th: 'ICT Program',
        en: 'ICT Program',
      },
      'dst-program': {
        th: 'DST Program',
        en: 'DST Program',
      },
    },
    expectedAnswer: 'dst-program',
  },
  // {
  //   id: 'Q5',
  //   type: QUESTION_TYPE.MULTIPLE_CHOICE,
  //   questNo: 5,
  //   questTitle: {
  //     th: 'Innovative Projects Zone',
  //     en: 'Innovative Projects Zone',
  //   },
  //   question: {
  //     th: 'ในการจัดตั้งทีม Senior Project สามารถมีสมาชิกได้สูงสุดกี่คน',
  //     en: 'What is the maximum number of group members can be formed for the senior project?',
  //   },
  //   choices: {
  //     '2-people': {
  //       th: '2 คน',
  //       en: '2 people',
  //     },
  //     '3-people': {
  //       th: '3 คน',
  //       en: '3 people',
  //     },
  //     '4-people': {
  //       th: '4 คน',
  //       en: '4 people',
  //     },
  //     '5-people': {
  //       th: '5 คน',
  //       en: '5 people',
  //     },
  //   },
  //   expectedAnswer: '3-people',
  // },
  {
    id: 'Q5',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    questNo: 5,
    questTitle: {
      th: 'Innovative Projects Zone',
      en: 'Innovative Projects Zone',
    },
    question: {
      th: 'โปรเจกต์ใดที่คุณประทับใจมากที่สุด',
      en: 'What is your favorite senior project in this exhibition?',
    },
    choices: {
      'mu-blink-analyzer': {
        th: 'MU Blink Analyzer',
        en: 'MU Blink Analyzer',
      },
      microusity: {
        th: 'Microusity',
        en: 'Microusity',
      },
      tpt: {
        th: 'TPT',
        en: 'TPT',
      },
      mosquito: {
        th: 'Mosquito',
        en: 'Mosquito',
      },
      orchidator: {
        th: 'Orchidator',
        en: 'Orchidator',
      },
      ezfit: {
        th: 'EzFIT',
        en: 'EzFIT',
      },
      esit: {
        th: 'eSit',
        en: 'eSit',
      },
      mirai: {
        th: 'Mirai',
        en: 'Mirai',
      },
      'suture-bot': {
        th: 'Suture Bot',
        en: 'Suture Bot',
      },
      psimilan: {
        th: 'PSIMILAN',
        en: 'PSIMILAN',
      },
      'receipt-recognizer': {
        th: 'Receipt Recognizer',
        en: 'Receipt Recognizer',
      },
      airadar: {
        th: 'Airadar',
        en: 'Airadar',
      },
      'web-audit-tool': {
        th: 'Web Audit Tool',
        en: 'Web Audit Tool',
      },
      'v-achilles': {
        th: 'V-Achilles',
        en: 'V-Achilles',
      },
      'food-spoilage': {
        th: 'Food Spoilage',
        en: 'Food Spoilage',
      },
      gaifa: {
        th: 'GAIFA',
        en: 'GAIFA',
      },
      'cof-learn': {
        th: 'Cof-Learn',
        en: 'Cof-Learn',
      },
      'github-autopilot': {
        th: 'Github Autopilot',
        en: 'Github Autopilot',
      },
      'self-driving-car': {
        th: 'Self-driving car',
        en: 'Self-driving car',
      },
      'dall-e': {
        th: 'DALL-E',
        en: 'DALL-E',
      },
      midjourney: {
        th: 'Midjourney',
        en: 'Midjourney',
      },
      'stable-diffusion': {
        th: 'Stable Diffusion',
        en: 'Stable Diffusion',
      },
      isit: {
        th: 'iSit',
        en: 'iSit',
      },
      ocr: {
        th: 'OCR',
        en: 'OCR',
      },
      automl: {
        th: 'AutoML',
        en: 'AutoML',
      },
      'smart-color': {
        th: 'Smart Color',
        en: 'Smart Color',
      },
      whitedefender: {
        th: 'WhiteDefender',
        en: 'WhiteDefender',
      },
      landsage: {
        th: 'LandSage',
        en: 'LandSage',
      },
      'vr-xylophone': {
        th: 'VR Xylophone',
        en: 'VR Xylophone',
      },
      'fixme-bot': {
        th: 'FixMe Bot',
        en: 'FixMe Bot',
      },
      wabiqa: {
        th: 'WabiQA',
        en: 'WabiQA',
      },
      'air-quality-monitoring': {
        th: 'Air Quality Monitoring',
        en: 'Air Quality Monitoring',
      },
    },
    expectedAnswer: [
      'mu-blink-analyzer',
      'microusity',
      'tpt',
      'mosquito',
      'orchidator',
      'ezfit',
      'esit',
      'mirai',
      'suture-bot',
      'psimilan',
      'receipt-recognizer',
      'airadar',
      'web-audit-tool',
      'v-achilles',
      'food-spoilage',
      'gaifa',
      'cof-learn',
    ],
  },
]
