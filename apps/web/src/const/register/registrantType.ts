interface IRegistrantType {
  type: string
  label: string
  icon: string
}

const RegistrantTypes: IRegistrantType[] = [{
  type: 'student',
  label: 'REG_TYPE_STUDENT',
  icon: '/static/images/types/type-icon-student.svg',
},
{
  type: 'uni_student',
  label: 'REG_TYPE_UNI_STUDENT',
  icon: '/static/images/types/type-icon-college-student.svg',
}, {
  type: 'teacher',
  label: 'REG_TYPE_TEACHER',
  icon: '/static/images/types/type-icon-teacher.svg',
}, {
  type: 'parents',
  label: 'REG_TYPE_PARENTS',
  icon: '/static/images/types/type-icon-parents.svg',
}, {
  type: 'mu_staff',
  label: 'REG_TYPE_MU_STAFF',
  icon: '/static/images/types/type-icon-mu-staff.svg',
}, {
  type: 'external',
  label: 'REG_TYPE_EXTERNAL',
  icon: '/static/images/types/type-icon-external.svg',
}]

export default RegistrantTypes
