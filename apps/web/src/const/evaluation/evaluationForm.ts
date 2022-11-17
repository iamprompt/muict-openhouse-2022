import type { IFormQuestionOption, IFormSection } from '~/types/formbuilder'
import { QuestionType } from '~/types/formbuilder'

export const RatingOptions: IFormQuestionOption[] = [
  {
    label: 'RATING_OPTIONS.STRONGLY_AGREE',
    value: 'strongly-agree',
  },
  {
    label: 'RATING_OPTIONS.AGREE',
    value: 'agree',
  },
  {
    label: 'RATING_OPTIONS.NEUTRAL',
    value: 'neutral',
  },
  {
    label: 'RATING_OPTIONS.DISAGREE',
    value: 'disagree',
  },
  {
    label: 'RATING_OPTIONS.STRONGLY_DISAGREE',
    value: 'strongly-disagree',
  },
  {
    label: 'RATING_OPTIONS.NOT_APPLICABLE',
    value: 'n/a',
  },
]

export const Evaluation_EN: IFormSection[] = [
  {
    sectionNo: 1,
    sectionName: 'SECTION_1.TITLE',
    questions: [
      {
        groupName: 'SECTION_1.TITLE',
        isTitleShown: false,
        questions: [
          {
            key: 'role',
            questionNo: 1,
            question: 'SECTION_1.ROLE.QUESTION',
            questionType: QuestionType.Radio,
            options: [
              {
                label: 'SECTION_1.ROLE.OPTIONS.HIGH_SCHOOL_STUDENT',
                value: 'high-school-student',
              },
              {
                label: 'SECTION_1.ROLE.OPTIONS.UNIVERSITY_STUDENT',
                value: 'university-student',
              },
              {
                label: 'SECTION_1.ROLE.OPTIONS.TEACHER',
                value: 'teacher',
              },
              {
                label: 'SECTION_1.ROLE.OPTIONS.PARENTS',
                value: 'parents',
              },
              {
                label: 'SECTION_1.ROLE.OPTIONS.STAFF',
                value: 'staff',
              },
              {
                label: 'SECTION_1.ROLE.OPTIONS.OTHERS',
                value: 'others',
              },
            ],
          },
          {
            key: 'gender',
            questionNo: 2,
            question: 'SECTION_1.GENDER.QUESTION',
            questionType: QuestionType.Radio,
            options: [
              {
                label: 'SECTION_1.GENDER.OPTIONS.MALE',
                value: 'male',
              },
              {
                label: 'SECTION_1.GENDER.OPTIONS.FEMALE',
                value: 'female',
              },
              {
                label: 'SECTION_1.GENDER.OPTIONS.OTHERS',
                value: 'others',
              },
            ],
          },
          {
            key: 'channels',
            questionNo: 3,
            question: 'SECTION_1.CHANNELS.QUESTION',
            questionType: QuestionType.Checkbox,
            options: [
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.MUICT_OP_FACEBOOK',
                value: 'muict-op-facebook',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.PR_VIDEOS',
                value: 'pr-video',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.ICT_WEBSITE',
                value: 'ict-website',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.UNIVERSITY_WEBSITE',
                value: 'university-website',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.EDUCATIONAL_WEBSITE',
                value: 'educational-website',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.SOCIAL_MEDIA',
                value: 'social-media',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.LEAFLET',
                value: 'leaflet',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.POSTER',
                value: 'poster',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.FRIENDS',
                value: 'friends',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.UNIVERSITY_PR',
                value: 'university-pr',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.INVITATION_LETTER',
                value: 'invitation-letter',
              },
              {
                label: 'SECTION_1.CHANNELS.OPTIONS.OTHERS',
                value: 'other',
              },
            ],
          },
          {
            key: 'participated-activities',
            questionNo: 4,
            question: 'SECTION_1.PARTICIPATED_ACTIVITIES.QUESTION',
            questionType: QuestionType.Checkbox,
            options: [
              {
                label: 'SECTION_1.PARTICIPATED_ACTIVITIES.OPTIONS.GUIDANCE',
                value: 'guidance',
              },
              {
                label:
                  'SECTION_1.PARTICIPATED_ACTIVITIES.OPTIONS.ACTIVITY_BOOTHS',
                value: 'activity-booths',
              },
              {
                label:
                  'SECTION_1.PARTICIPATED_ACTIVITIES.OPTIONS.ON_STAGE_PERFORMANCES',
                value: 'on-stage-performance',
              },
              {
                label:
                  'SECTION_1.PARTICIPATED_ACTIVITIES.OPTIONS.STUDENT_PROJECTS',
                value: 'student-projects-exhibition',
              },
              {
                label:
                  'SECTION_1.PARTICIPATED_ACTIVITIES.OPTIONS.INTERNATIONAL_EXPERIENCE_SHARING',
                value: 'international-experience-sharing',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sectionNo: 2,
    sectionName: 'SECTION_2.TITLE',
    questions: [
      {
        groupName: 'SECTION_2.GROUP_SERVICE_LOCATION_DATE_TIME_TITLE',
        isTitleShown: true,
        questions: [
          {
            key: 'date-and-time-rating',
            questionNo: 1,
            question: 'SECTION_2.DATE_AND_TIME_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'location-rating',
            questionNo: 2,
            question: 'SECTION_2.LOCATION_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'service-rating',
            questionNo: 3,
            question: 'SECTION_2.SERVICE_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
        ],
      },
      {
        groupName: 'SECTION_2.GROUP_FORMAT_BENEFIT_OVERALL_TITLE',
        isTitleShown: true,
        questions: [
          {
            key: 'understanding-rating',
            questionNo: 4,
            question: 'SECTION_2.UNDERSTANDING_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'stage-rating',
            questionNo: 5,
            question: 'SECTION_2.STAGE_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'booths-rating',
            questionNo: 6,
            question: 'SECTION_2.BOOTH_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'project-rating',
            questionNo: 7,
            question: 'SECTION_2.PROJECT_EXHIBITION_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'guidance-rating',
            questionNo: 8,
            question: 'SECTION_2.GUIDANCE_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'intl-exp-rating',
            questionNo: 9,
            question: 'SECTION_2.INTL_EXPERIENCE_SHARING_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'benefit-rating',
            questionNo: 10,
            question: 'SECTION_2.BENEFIT_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'overall-rating',
            questionNo: 11,
            question: 'SECTION_2.OVERALL_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
          {
            key: 'interest-rating',
            questionNo: 12,
            question: 'SECTION_2.INTEREST_RATING.QUESTION',
            questionType: QuestionType.Radio,
            options: RatingOptions,
          },
        ],
      },
    ],
  },
  {
    sectionNo: 3,
    sectionName: 'SECTION_3.TITLE',
    questions: [
      {
        groupName: 'SECTION_3.TITLE',
        isTitleShown: false,
        questions: [
          {
            key: 'interested-programs',
            questionNo: 1,
            question: 'SECTION_3.INTERESTED_PROGRAMS.QUESTION',
            questionType: QuestionType.MultipleText,
            quantity: 3,
            subAnswersTitle: 'SECTION_3.INTERESTED_PROGRAMS.SUB_ANSWERS_TITLE',
          },
          {
            key: 'factors',
            questionNo: 2,
            question: 'SECTION_3.FACTORS.QUESTION',
            questionType: QuestionType.MultipleText,
            quantity: 3,
            subAnswersTitle: 'SECTION_3.FACTORS.SUB_ANSWERS_TITLE',
          },
          {
            key: 'impressed',
            questionNo: 3,
            question: 'SECTION_3.IMPRESSED.QUESTION',
            questionType: QuestionType.TextArea,
          },
          {
            key: 'unimpressed',
            questionNo: 4,
            question: 'SECTION_3.UNIMPRESSED.QUESTION',
            questionType: QuestionType.TextArea,
          },
          {
            key: 'other-suggestions',
            questionNo: 5,
            question: 'SECTION_3.OTHER_SUGGESTIONS.QUESTION',
            questionType: QuestionType.TextArea,
          },
        ],
      },
    ],
  },
]
