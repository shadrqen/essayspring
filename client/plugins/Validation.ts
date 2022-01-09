/* The primary form validator */
export default {
  emailField: [
    (v: any) => !!v || 'Email is required',
    (v: any) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
  ],
  paperSubjectField: [
    (v: any) => !!v || 'Subject is required'
  ],
  passwordField: [
    (v: any) => !!v || 'Password is required'
  ],
  registerPasswordField: [
    (v: any) => !!v || 'Password is required',
    (v: any) => (v && v.length >= 6) || 'Should be at least 6 characters'
  ],
  repeatPasswordField: [
    (v: any) => !!v || 'Confirm Password is required'
  ],
  optCodeField: [
    (v: any) => !!v || 'OTP is required'
  ],
  deadlineDate: [
    (v: any) => !!v || 'Deadline date is required'
  ],
  deadlineTime: [
    (v: any) => !!v || 'Deadline time is required'
  ],
  studyLevelField: [
    (v: any) => !!v || 'Level of study is required'
  ],
  formattingStyleField: [
    (v: any) => !!v || 'Formatting Style is required'
  ],
  paperTopicField: [
    (v: any) => !!v || 'Topic is required'
  ],
  assignmentTypeField: [
    (v: any) => !!v || 'Assignment type is required'
  ],
  termsAndConditionsField: [
    (v: any) => !!v || 'Kindly agree to the policies to continue'
  ],
  surnameField: [
    (v: any) => !!v || 'Surname is required'
  ],
  otherNamesField: [
    (v: any) => !!v || 'Other names are required'
  ],
  genderField: [
    (v: any) => !!v || 'Gender is required'
  ],
  nationalIdField: [
    (v: any) => !!v || 'National Id is required'
  ],
  nationalIdFrontField: [
    (v: any) => !!v || 'The front side of your national Id is required'
  ],
  nationalIdBackField: [
    (v: any) => !!v || 'The back side of your national Id is required'
  ],
  mobileNoField: [
    (v: any) => !!v || 'Mobile number is required'
  ],
  mobileNumberField: [
    (v: any) => !!v || 'Mobile number is required'
  ],
  countryField: [
    (v: any) => !!v || 'Your citizenship is required'
  ],
  countyStateField: [
    (v: any) => !!v || 'County or state is required'
  ],
  nativeLanguageField: [
    (v: any) => !!v || 'Your native language is required'
  ],
  availableNightCallsField: [
    (v: any) => !!v || 'Availability for night calls is required'
  ],
  citationStylesField: [
    (v: any) => !!v || 'Citation style is required'
  ],
  disciplinesField: [
    (v: any) => !!v || 'Disciplines field is required'
  ],
  workingHistoryField: [
    (v: any) => !!v || 'Your working history is required'
  ],
  highestAcademicLevelField: [
    (v: any) => !!v || 'Your highest academic field is required'
  ],
  highestAcademicCertificationField: [
    (v: any) => !!v || 'Your highest academic certification is required'
  ],
  institutionNameField: [
    (v: any) => !!v || 'Institution name is required'
  ],
  colUniDepartmentField: [
    (v: any) => !!v || 'College/university department is required'
  ],
  graduationYearField: [
    (v: any) => !!v || 'Graduation year is required'
  ],
  academicCertificateFileUpload: [
    (v: any) => !!v || 'Academic certificate file upload is required'
  ],
  workHistoryField: [
    (v: any) => !!v || 'Your working history is required'
  ],
  aboutMeField: [
    (v: any) => !!v || 'The about you field is required'
  ],
  profStatementField: [
    (v: any) => !!v || 'Your professional statement is required'
  ],
  revisionDeadlineDate: [
    (v: any) => !!v || 'Deadline date is required'
  ],
  revisionDeadlineTime: [
    (v: any) => !!v || 'Deadline time is required'
  ],
  phoneNumberField: [
    (v: any) => !!v || 'Phone number is required',
    (v: any) => (v && v.length === 10) || 'Should be 10 characters'
  ]
}
