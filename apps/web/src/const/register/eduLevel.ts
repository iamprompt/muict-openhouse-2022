interface EduLevel {
  id: number
  label: {
    th: string
    en: string
  }
  value: string
}

const EduLevels: EduLevel[] = [
  {
    id: 1,
    label: {
      th: 'มัธยมศึกษาปีที่ 6',
      en: 'Matthayom 6 / Grade 12 / Year 13',
    },
    value: 'm6',
  },
  {
    id: 2,
    label: {
      th: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
      en: 'Vocational Certificate',
    },
    value: 'vocational',
  },
  {
    id: 3,
    label: {
      th: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)',
      en: 'High Vocational Certificate',
    },
    value: 'vocational-advanced',
  },
  {
    id: 4,
    label: {
      th: 'ประกาศนียบัตรวิชาชีพเทคนิค (ปวท.)',
      en: 'Technical Vocational Certificate',
    },
    value: 'vocational-technical',
  },
  {
    id: 5,
    label: {
      th: 'การศึกษานอกโรงเรียน (กศน.)',
      en: 'Non-Formal Education',
    },
    value: 'non-formal',
  },
  {
    id: 6,
    label: {
      th: 'GED',
      en: 'GED',
    },
    value: 'ged',
  },
  {
    id: 7,
    label: {
      th: 'มัธยมศึกษาปีที่ 5',
      en: 'Matthayom 5 / Grade 11 / Year 12',
    },
    value: 'm5',
  },
  {
    id: 8,
    label: {
      th: 'มัธยมศึกษาปีที่ 4',
      en: 'Matthayom 4 / Grade 10 / Year 11',
    },
    value: 'm4',
  },
  {
    id: 9,
    label: {
      th: 'อนุปริญญา',
      en: 'Associate\'s Degree',
    },
    value: 'associates-degree',
  },
  {
    id: 10,
    label: {
      th: 'ปริญญาตรี',
      en: 'Bachelor\'s Degree',
    },
    value: 'bachelors-degree',
  },
  {
    id: 11,
    label: {
      th: 'ปริญญาโท',
      en: 'Master\'s Degree',
    },
    value: 'masters-degree',
  },
  {
    id: 12,
    label: {
      th: 'ปริญญาเอก',
      en: 'Doctoral Degree',
    },
    value: 'doctoral-degree',
  },
  {
    id: 13,
    label: {
      th: 'มัธยมศึกษาตอนต้น',
      en: 'Junior High School',
    },
    value: 'junior-high-school',
  },
  {
    id: 14,
    label: {
      th: 'ประถมศึกษา',
      en: 'Primary School',
    },
    value: 'primary-school',
  },
  {
    id: 15,
    label: {
      th: 'อื่นๆ',
      en: 'Other',
    },
    value: 'other',
  },
]

export default EduLevels
