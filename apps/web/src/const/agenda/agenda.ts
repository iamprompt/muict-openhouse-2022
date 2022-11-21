// enum LANG {
//   en = 'en',
//   th = 'th',
// }

type I18nTranslation = Record<string, string>

interface ISpeaker {
  name: I18nTranslation
  position: I18nTranslation
}

interface IEventItem {
  title: I18nTranslation
  startAt: Date
  endAt: Date
  isLive?: boolean
  speakers?: ISpeaker[]
  location: I18nTranslation
}

export const AGENDA: Record<string, IEventItem[]> = {
  '2022-10-28': [
    {
      title: {
        th: 'พิธีเปิดกิจกรรม',
        en: 'Opening Ceremony',
      },
      startAt: new Date('2022-10-28T08:30:00+07:00'),
      endAt: new Date('2022-10-28T09:00:00+07:00'),
      isLive: true,
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      speakers: [
        {
          name: {
            th: 'ดร.พัฒนศักดิ์ มงคลวัฒน์',
            en: 'Dr. Pattanasak Mongkolwat',
          },
          position: {
            th: 'คณบดีคณะเทคโนโลยีสารสนเทศและการสื่อสาร',
            en: 'Dean of the Faculty of Information and Communication Technology',
          },
        },
      ],
    },
    {
      title: {
        th: 'แนะนำคณะ ICT และกิจกรรมภายในงาน Open House',
        en: 'Introduction to the Faculty of ICT & Activities within the MUICT Open House',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T09:00:00+07:00'),
      endAt: new Date('2022-10-28T09:30:00+07:00'),
      isLive: true,
    },
    {
      title: {
        th: 'แนะนำหลักสูตรปริญญาตรี ICT และ DST ของคณะฯ',
        en: 'Guidance Session for B.Sc. in ICT and B.Sc. in DST program',
      },
      location: {
        th: 'แนะแนว ชั้น 4',
        en: 'Guidance 4th Fl.',
      },
      isLive: true,
      startAt: new Date('2022-10-28T10:00:00+07:00'),
      endAt: new Date('2022-10-28T10:30:00+07:00'),
    },
    {
      title: {
        th: 'กิจกรรมจากชมรม Capture the Flag (CTF)',
        en: 'Special Activities from Capture the Flag (CTF) Club',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T10:30:00+07:00'),
      endAt: new Date('2022-10-28T11:45:00+07:00'),
    },
    {
      title: {
        th: 'แนะนำโครงงานนักศึกษา และร่วมเล่นเกม HEX & Othello',
        en: 'Introducing Senior Projects and Playing HEX & Othello Game',
      },
      location: {
        th: 'นวัตกรรม ชั้น 4',
        en: 'Innovation 4th Fl.',
      },
      startAt: new Date('2022-10-28T13:00:00+07:00'),
      endAt: new Date('2022-10-28T14:00:00+07:00'),
      isLive: true,
    },
    {
      title: {
        th: 'การแสดงดนตรีสด: วง Grand Opening',
        en: 'Live Music Performance: Grand Opening',
      },
      startAt: new Date('2022-10-28T11:45:00+07:00'),
      endAt: new Date('2022-10-28T12:10:00+07:00'),
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
    },
    {
      title: {
        th: 'การแสดงดนตรีสด: วง Pufferfish',
        en: 'Live Music Performance: Pufferfish',
      },
      startAt: new Date('2022-10-28T12:10:00+07:00'),
      endAt: new Date('2022-10-28T13:00:00+07:00'),
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
    },
    {
      title: {
        th: 'ทอล์กแชร์ประสบการณ์ด้านไอที',
        en: 'IT Experience Sharing Session',
      },
      startAt: new Date('2022-10-28T13:00:00+07:00'),
      endAt: new Date('2022-10-28T14:00:00+07:00'),
      speakers: [
        {
          name: {
            th: 'คุณเสฐียรพงศ์ จึงอุดมพร',
            en: 'Mr. Satheanpong Jeungudomporn',
          },
          position: {
            th: 'กรรมการผู้จัดการและผู้ก่อตั้ง บริษัท อินดิสทิงท์ จำกัด',
            en: 'Managing Director and Founder of Indistinct Co., Ltd.',
          },
        },
      ],
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      isLive: true,
    },
    {
      title: {
        th: 'การทำงานและศึกษาต่อในต่างประเทศ โดย ศิษย์เก่า คณะ ICT',
        en: 'Work, Internship, and Study Abroad by ICT Alumni',
      },
      location: {
        th: 'นานาชาติ ชั้น 2',
        en: 'International 2nd Fl.',
      },
      isLive: true,
      startAt: new Date('2022-10-28T14:00:00+07:00'),
      endAt: new Date('2022-10-28T16:00:00+07:00'),
    },
    {
      title: {
        th: 'การแสดงดนตรีสด: วง Philling',
        en: 'Live Music Performance: Philling',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T15:00:00+07:00'),
      endAt: new Date('2022-10-28T16:00:00+07:00'),
    },
  ],
  '2022-10-29': [
    {
      title: {
        th: 'พิธีเปิดกิจกรรม',
        en: 'Opening Ceremony',
      },
      startAt: new Date('2022-10-29T08:30:00+07:00'),
      endAt: new Date('2022-10-29T09:00:00+07:00'),
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      isLive: true,
    },
    {
      title: {
        th: 'แนะนำคณะ ICT และกิจกรรมงาน MUICT Open House 2022',
        en: 'Introduction to the Faculty of ICT & Highlights of MUICT Open House 2022',
      },
      startAt: new Date('2022-10-29T09:00:00+07:00'),
      endAt: new Date('2022-10-29T09:30:00+07:00'),
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
    },
    {
      title: {
        th: 'การศึกษาต่อในประเทศอังกฤษ และอเมริกา (MIT) โดย พี่ยุ้ย ศิษย์เก่า',
        en: 'Study in UK and Study at MIT, USA by P\'Yui ICT Alumni',
      },
      startAt: new Date('2022-10-29T09:00:00+07:00'),
      endAt: new Date('2022-10-29T10:00:00+07:00'),
      location: {
        th: 'นานาชาติ ชั้น 2',
        en: 'International 2nd Fl.',
      },
      isLive: true,
    },
    {
      title: {
        th: 'แนะนำหลักสูตรปริญญาตรี ICT และ DST ของคณะฯ',
        en: 'Guidance Session for B.Sc. in ICT and B.Sc. in DST program',
      },
      location: {
        th: 'แนะแนว ชั้น 4',
        en: 'Guidance 4th Fl.',
      },
      isLive: true,
      startAt: new Date('2022-10-29T10:30:00+07:00'),
      endAt: new Date('2022-10-29T11:30:00+07:00'),
    },
    {
      title: {
        th: 'การแสดงดนตรีสด: วง Pufferfish',
        en: 'Live Music Performance: Pufferfish',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T11:45:00+07:00'),
      endAt: new Date('2022-10-28T12:30:00+07:00'),
    },
    {
      title: {
        th: 'แนะนำซุ้มกิจกรรมภายในงาน MUICT Open House 2022',
        en: 'Introduction to the Activities in MUICT Open House 2022',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-29T12:30:00+07:00'),
      endAt: new Date('2022-10-29T13:00:00+07:00'),
      isLive: true,
    },
    {
      title: {
        th: 'ทอล์กแชร์ประสบการณ์ด้านไอที',
        en: 'IT Experience Sharing Session',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      isLive: true,
      startAt: new Date('2022-10-29T13:00:00+07:00'),
      endAt: new Date('2022-10-29T14:00:00+07:00'),
      speakers: [
        {
          name: {
            th: 'คุณสรกฤช พฤทธานนทชัย',
            en: 'Mr. Sorakrit Phruthanontachai',
          },
          position: {
            th: 'รองผู้อำนวยการอาวุโสด้านเทคโนโลยีสารสนเทศ ธนาคารกรุงเทพ (สำนักงานใหญ่)',
            en: 'Senior Vice President Information Technology, Bangkok Bank (Head Office)',
          },
        },
      ],
    },
    {
      title: {
        th: 'กิจกรรมจากชมรม Capture the Flag (CTF)',
        en: 'Special Activities from Capture the Flag (CTF) Club',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T14:00:00+07:00'),
      endAt: new Date('2022-10-28T14:30:00+07:00'),
    },
    {
      title: {
        th: 'แนะนำโครงงานนักศึกษา และร่วมเล่นเกม HEX & Othello',
        en: 'Introducing Senior Projects and Playing HEX & Othello Game',
      },
      location: {
        th: 'นวัตกรรม ชั้น 4',
        en: 'Innovation 4th Fl.',
      },
      startAt: new Date('2022-10-29T15:00:00+07:00'),
      endAt: new Date('2022-10-29T16:00:00+07:00'),
      isLive: true,
    },
    {
      title: {
        th: 'การแสดงดนตรีสด: วง Philling',
        en: 'Live Music Performance: Philling',
      },
      location: {
        th: 'เวที ชั้น 1',
        en: 'Stage 1st Fl.',
      },
      startAt: new Date('2022-10-28T15:00:00+07:00'),
      endAt: new Date('2022-10-28T16:00:00+07:00'),
    },
  ],
}
