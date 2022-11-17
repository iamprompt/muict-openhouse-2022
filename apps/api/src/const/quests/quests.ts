export interface IQuestList {
  icon: string
  title: string
  success?: boolean
}

export const questLists: (IQuestList & { questNo: number })[] = [
  { questNo: 1, icon: 'op2022:app-registration', title: 'Check in' },
  { questNo: 2, icon: 'op2022:modern-mic', title: 'Meet & Greet' },
  {
    questNo: 3,
    icon: 'op2022:earth',
    title: 'Intl. Experiences',
  },
  { questNo: 4, icon: 'op2022:chalkboard-teacher', title: 'Guidance' },
  { questNo: 5, icon: 'op2022:text-snippet', title: 'Innovative Project' },
  { questNo: 6, icon: 'op2022:star-half', title: 'Evaluation' },
]
