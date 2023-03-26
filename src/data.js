export const fieldRows = [
  {
    id: 1,
    name: 'first_name',
    label: 'First name',
    is_required: true,
    conditions: null,
  },
  {
    id: 2,
    name: 'last_name',
    label: 'Last name',
    is_required: true,
    conditions: null,
  },
  {
    id: 3,
    name: 'dob',
    label: 'Date of birth',
    is_required: true,
    conditions: null,
  },
  {
    id: 4,
    name: 'student',
    label: 'Student',
    is_required: false,
    conditions: [
      {
        condition_name: 'required_if',
        dependency_fields: ['employed'],
        rule: 'is_empty',
      },
    ],
  },
  {
    id: 5,
    name: 'university',
    label: 'University',
    is_required: false,
    conditions: [
      {
        condition_name: 'required_if',
        dependency_fields: ['student'],
        rule: 'value_is_true',
      },
    ],
  },
  {
    id: 6,
    name: 'employed',
    label: 'Employed',
    is_required: false,
    conditions: [
      {
        condition_name: 'required_if',
        dependency_fields: ['student'],
        rule: 'is_empty',
      },
    ],
  },
  {
    id: 7,
    name: 'company',
    label: 'Company',
    is_required: false,
    conditions: [
      {
        condition_name: 'required_if',
        dependency_fields: ['employed'],
        rule: 'value_is_true',
      },
    ],
  },
  {
    id: 8,
    name: 'hobbies',
    label: 'Hobbies',
    is_required: false,
    conditions: null,
  },
];

export const mappedFields = [
  {
    manomano_field_name: 'first_name',
    manomano_field_id: 1,
    static_value: 'Rustam',
  },
  {
    manomano_field_name: 'last_name',
    manomano_field_id: 2,
    static_value: 'Avers',
  },
  {
    manomano_field_name: 'dob',
    manomano_field_id: 3,
    static_value: '01.01.2000',
  },
  // {
  //   manomano_field_name: 'student',
  //   manomano_field_id: 4,
  //   static_value: 'true',
  // },
  {
    manomano_field_name: 'employed',
    manomano_field_id: 6,
    static_value: 'true',
  },
];
