interface Province {
  province_id: number
  name: {
    en: string
    th: string
  }
  value: string
}

const Provinces: Province[] = [
  {
    province_id: 1,
    name: {
      th: 'กรุงเทพมหานคร',
      en: 'Krung Thep Maha Nakhon (Bangkok)',
    },
    value: 'bangkok',
  },
  {
    province_id: 2,
    name: {
      th: 'กระบี่',
      en: 'Krabi',
    },
    value: 'krabi',
  },
  {
    province_id: 3,
    name: {
      th: 'กาญจนบุรี',
      en: 'Kanchanaburi',
    },
    value: 'kanchanaburi',
  },
  {
    province_id: 4,
    name: {
      th: 'กาฬสินธุ์',
      en: 'Kalasin',
    },
    value: 'kalasin',
  },
  {
    province_id: 5,
    name: {
      th: 'กำแพงเพชร',
      en: 'Kamphaeng Phet',
    },
    value: 'kamphaengphet',
  },
  {
    province_id: 6,
    name: {
      th: 'ขอนแก่น',
      en: 'Khon Kaen',
    },
    value: 'khonkaen',
  },
  {
    province_id: 7,
    name: {
      th: 'จันทบุรี',
      en: 'Chanthaburi',
    },
    value: 'chanthaburi',
  },
  {
    province_id: 8,
    name: {
      th: 'ฉะเชิงเทรา',
      en: 'Chachoengsao',
    },
    value: 'chachoengsao',
  },
  {
    province_id: 9,
    name: {
      th: 'ชลบุรี',
      en: 'Chon Buri',
    },
    value: 'chonburi',
  },
  {
    province_id: 10,
    name: {
      th: 'ชัยนาท',
      en: 'Chai Nat',
    },
    value: 'chainat',
  },
  {
    province_id: 11,
    name: {
      th: 'ชัยภูมิ',
      en: 'Chaiyaphum',
    },
    value: 'chaiyaphum',
  },
  {
    province_id: 12,
    name: {
      th: 'ชุมพร',
      en: 'Chumphon',
    },
    value: 'chumphon',
  },
  {
    province_id: 13,
    name: {
      th: 'เชียงราย',
      en: 'Chiang Rai',
    },
    value: 'chiangrai',
  },
  {
    province_id: 14,
    name: {
      th: 'เชียงใหม่',
      en: 'Chiang Mai',
    },
    value: 'chiangmai',
  },
  {
    province_id: 15,
    name: {
      th: 'ตรัง',
      en: 'Trang',
    },
    value: 'trang',
  },
  {
    province_id: 16,
    name: {
      th: 'ตราด',
      en: 'Trat',
    },
    value: 'trat',
  },
  {
    province_id: 17,
    name: {
      th: 'ตาก',
      en: 'Tak',
    },
    value: 'tak',
  },
  {
    province_id: 18,
    name: {
      th: 'นครนายก',
      en: 'Nakhon Nayok',
    },
    value: 'nakhonnayok',
  },
  {
    province_id: 19,
    name: {
      th: 'นครปฐม',
      en: 'Nakhon Pathom',
    },
    value: 'nakhonpathom',
  },
  {
    province_id: 20,
    name: {
      th: 'นครพนม',
      en: 'Nakhon Phanom',
    },
    value: 'nakhonphanom',
  },
  {
    province_id: 21,
    name: {
      th: 'นครราชสีมา',
      en: 'Nakhon Ratchasima',
    },
    value: 'nakhonratchasima',
  },
  {
    province_id: 22,
    name: {
      th: 'นครศรีธรรมราช',
      en: 'Nakhon Si Thammarat',
    },
    value: 'nakhonsithammarat',
  },
  {
    province_id: 23,
    name: {
      th: 'นครสวรรค์',
      en: 'Nakhon Sawan',
    },
    value: 'nakhonsawan',
  },
  {
    province_id: 24,
    name: {
      th: 'นนทบุรี',
      en: 'Nonthaburi',
    },
    value: 'nonthaburi',
  },
  {
    province_id: 25,
    name: {
      th: 'นราธิวาส',
      en: 'Narathiwat',
    },
    value: 'narathiwat',
  },
  {
    province_id: 26,
    name: {
      th: 'น่าน',
      en: 'Nan',
    },
    value: 'nan',
  },
  {
    province_id: 27,
    name: {
      th: 'บึงกาฬ',
      en: 'Bueng Kan',
    },
    value: 'buengkan',
  },
  {
    province_id: 28,
    name: {
      th: 'บุรีรัมย์',
      en: 'Buri Ram',
    },
    value: 'buriram',
  },
  {
    province_id: 29,
    name: {
      th: 'ปทุมธานี',
      en: 'Pathum Thani',
    },
    value: 'pathumthani',
  },
  {
    province_id: 30,
    name: {
      th: 'ประจวบคีรีขันธ์',
      en: 'Prachuap Khiri Khan',
    },
    value: 'prachuapkhirikhan',
  },
  {
    province_id: 31,
    name: {
      th: 'ปราจีนบุรี',
      en: 'Prachin Buri',
    },
    value: 'prachinburi',
  },
  {
    province_id: 32,
    name: {
      th: 'ปัตตานี',
      en: 'Pattani',
    },
    value: 'pattani',
  },
  {
    province_id: 33,
    name: {
      th: 'พระนครศรีอยุธยา',
      en: 'Phra Nakhon Si Ayutthaya',
    },
    value: 'phranakhonsiayutthaya',
  },
  {
    province_id: 34,
    name: {
      th: 'พะเยา',
      en: 'Phayao',
    },
    value: 'phayao',
  },
  {
    province_id: 35,
    name: {
      th: 'พังงา',
      en: 'Phangnga',
    },
    value: 'phangnga',
  },
  {
    province_id: 36,
    name: {
      th: 'พัทลุง',
      en: 'Phatthalung',
    },
    value: 'phatthalung',
  },
  {
    province_id: 37,
    name: {
      th: 'พิจิตร',
      en: 'Phichit',
    },
    value: 'phichit',
  },
  {
    province_id: 38,
    name: {
      th: 'พิษณุโลก',
      en: 'Phitsanulok',
    },
    value: 'phitsanulok',
  },
  {
    province_id: 39,
    name: {
      th: 'เพชรบุรี',
      en: 'Phetchaburi',
    },
    value: 'phetchaburi',
  },
  {
    province_id: 40,
    name: {
      th: 'เพชรบูรณ์',
      en: 'Phetchabun',
    },
    value: 'phetchabun',
  },
  {
    province_id: 41,
    name: {
      th: 'แพร่',
      en: 'Phrae',
    },
    value: 'phrae',
  },
  {
    province_id: 42,
    name: {
      th: 'ภูเก็ต',
      en: 'Phuket',
    },
    value: 'phuket',
  },
  {
    province_id: 43,
    name: {
      th: 'มหาสารคาม',
      en: 'Maha Sarakham',
    },
    value: 'mahasarakham',
  },
  {
    province_id: 44,
    name: {
      th: 'มุกดาหาร',
      en: 'Mukdahan',
    },
    value: 'mukdahan',
  },
  {
    province_id: 45,
    name: {
      th: 'แม่ฮ่องสอน',
      en: 'Mae Hong Son',
    },
    value: 'maehongson',
  },
  {
    province_id: 46,
    name: {
      th: 'ยโสธร',
      en: 'Yasothon',
    },
    value: 'yasothon',
  },
  {
    province_id: 47,
    name: {
      th: 'ยะลา',
      en: 'Yala',
    },
    value: 'yala',
  },
  {
    province_id: 48,
    name: {
      th: 'ร้อยเอ็ด',
      en: 'Roi Et',
    },
    value: 'roiet',
  },
  {
    province_id: 49,
    name: {
      th: 'ระนอง',
      en: 'Ranong',
    },
    value: 'ranong',
  },
  {
    province_id: 50,
    name: {
      th: 'ระยอง',
      en: 'Rayong',
    },
    value: 'rayong',
  },
  {
    province_id: 51,
    name: {
      th: 'ราชบุรี',
      en: 'Ratchaburi',
    },
    value: 'ratchaburi',
  },
  {
    province_id: 52,
    name: {
      th: 'ลพบุรี',
      en: 'Lop Buri',
    },
    value: 'lopburi',
  },
  {
    province_id: 53,
    name: {
      th: 'ลำปาง',
      en: 'Lampang',
    },
    value: 'lampang',
  },
  {
    province_id: 54,
    name: {
      th: 'ลำพูน',
      en: 'Lamphun',
    },
    value: 'lamphun',
  },
  {
    province_id: 55,
    name: {
      th: 'เลย',
      en: 'Loei',
    },
    value: 'loei',
  },
  {
    province_id: 56,
    name: {
      th: 'ศรีสะเกษ',
      en: 'Si Sa Ket',
    },
    value: 'sisaket',
  },
  {
    province_id: 57,
    name: {
      th: 'สกลนคร',
      en: 'Sakon Nakhon',
    },
    value: 'sakonnakhon',
  },
  {
    province_id: 58,
    name: {
      th: 'สงขลา',
      en: 'Songkhla',
    },
    value: 'songkhla',
  },
  {
    province_id: 59,
    name: {
      th: 'สตูล',
      en: 'Satun',
    },
    value: 'satun',
  },
  {
    province_id: 60,
    name: {
      th: 'สมุทรปราการ',
      en: 'Samut Prakan',
    },
    value: 'samutprakan',
  },
  {
    province_id: 61,
    name: {
      th: 'สมุทรสงคราม',
      en: 'Samut Songkhram',
    },
    value: 'samutsongkhram',
  },
  {
    province_id: 62,
    name: {
      th: 'สมุทรสาคร',
      en: 'Samut Sakhon',
    },
    value: 'samutsakhon',
  },
  {
    province_id: 63,
    name: {
      th: 'สระแก้ว',
      en: 'Sa Kaeo',
    },
    value: 'sakaeo',
  },
  {
    province_id: 64,
    name: {
      th: 'สระบุรี',
      en: 'Saraburi',
    },
    value: 'saraburi',
  },
  {
    province_id: 65,
    name: {
      th: 'สิงห์บุรี',
      en: 'Sing Buri',
    },
    value: 'singburi',
  },
  {
    province_id: 66,
    name: {
      th: 'สุโขทัย',
      en: 'Sukhothai',
    },
    value: 'sukhothai',
  },
  {
    province_id: 67,
    name: {
      th: 'สุพรรณบุรี',
      en: 'Suphan Buri',
    },
    value: 'suphanburi',
  },
  {
    province_id: 68,
    name: {
      th: 'สุราษฎร์ธานี',
      en: 'Surat Thani',
    },
    value: 'suratthani',
  },
  {
    province_id: 69,
    name: {
      th: 'สุรินทร์',
      en: 'Surin',
    },
    value: 'surin',
  },
  {
    province_id: 70,
    name: {
      th: 'หนองคาย',
      en: 'Nong Khai',
    },
    value: 'nongkhai',
  },
  {
    province_id: 71,
    name: {
      th: 'หนองบัวลำภู',
      en: 'Nong Bua Lam Phu',
    },
    value: 'nongbualamphu',
  },
  {
    province_id: 72,
    name: {
      th: 'อ่างทอง',
      en: 'Ang Thong',
    },
    value: 'angthong',
  },
  {
    province_id: 73,
    name: {
      th: 'อำนาจเจริญ',
      en: 'Amnat Charoen',
    },
    value: 'amnatcharoen',
  },
  {
    province_id: 74,
    name: {
      th: 'อุดรธานี',
      en: 'Udon Thani',
    },
    value: 'udonthani',
  },
  {
    province_id: 75,
    name: {
      th: 'อุตรดิตถ์',
      en: 'Uttaradit',
    },
    value: 'uttaradit',
  },
  {
    province_id: 76,
    name: {
      th: 'อุทัยธานี',
      en: 'Uthai Thani',
    },
    value: 'uthaithani',
  },
  {
    province_id: 77,
    name: {
      th: 'อุบลราชธานี',
      en: 'Ubon Ratchathani',
    },
    value: 'ubonratchathani',
  },
]

export default Provinces
