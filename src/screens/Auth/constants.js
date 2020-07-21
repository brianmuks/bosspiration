
// Table titles for inspections that have not been handled
export const USERS_TABLE_TITLES = [
     'Name', 'Phone', 'Email','Gender','Office', 'Role'
]

export const BREADCRUMBS_DETAILS= [
    {page:'Home'},
    {page:'Users'},
    { page:'User Details'},
];

export const BREADCRUMBS= [
    {page:'Home'},
    { page:'Users'},
]

export const ROLES = [
    { label: 'All', value: '' },
    { label: 'Admin', value: 1 },
    { label: 'Inspector', value: 2 },
    { label: 'User', value: 3 },

];

export const ROLES2 = [
    { label: 'Role', value: '' },
    { label: 'Admin', value: '1' },
    { label: 'Inspector', value: '2' },
    { label: 'User', value: "3" },

];

export const OFFICES = [
    { label: 'LCC', value: 'Lcc' },
    { label: 'Site', value: 'Site' },

];

export const ROLE_FILTER = [
  '','Admin','Inspector','User'
];
export const GENDER_FILTER = {
    male:'Male',female:'Female'
}


export const FIELDS = [
    { name: 'fname', type: 'text', placeholder: ' ', label: 'First Name' },
    { name: 'lname', type: 'text', placeholder: 'e.g  Banda', label: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'e.g john@phd.com', label: 'Email' },
    { name: 'phone', type: 'number', placeholder: 'e.g 0977XXXXX', label: 'Phone' },
    { name: 'nrc', type: 'text', placeholder: '143XXX/XX/X', label: 'NRC' },
    { name: 'password', type: 'password', placeholder: 'e.g XXXXXX', label: 'Password' },
    { name: 'password2', type: 'password', placeholder: 'e.g XXXXXX', label: 'Confirm Password' },
    { name: 'gender', type: 'select', label: 'Gender', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { name: 'dob', type: 'date', label: 'Date Of Birth' },
];


export const EDIT_PROFILE_FIELDS = [
    { name: 'fname', type: 'text', placeholder: ' ', label: 'First Name' },
    { name: 'lname', type: 'text', placeholder: 'e.g  Banda', label: 'Last Name' },
    { name: 'phone', type: 'number', placeholder: 'e.g 0977XXXXX', label: 'Phone' },
    { name: 'nrc', type: 'text', placeholder: '143XXX/XX/X', label: 'NRC' },
    { name: 'gender', type: 'select', label: 'Gender', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { name: 'dob', type: 'date', label: 'Date Of Birth' },
];


export const LOGIN_FIELDS = [
    { name: 'email', type: 'text', placeholder: ' ', label: 'Email' },
    { name: 'password', type: 'text', placeholder: 'xxx', label: 'Password' },
];






export const EDIT_FIELDS = [
    { name: 'fname', type: 'text', placeholder: ' ', label: 'First Name' },
    { name: 'lname', type: 'text', placeholder: 'e.g  Banda', label: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'e.g john@phd.com', label: 'Email' },
    { name: 'phone', type: 'number', placeholder: 'e.g 0977XXXXX', label: 'Phone' },
    { name: 'gender', type: 'select', label: 'Gender', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { name: 'role', type: 'select', label: 'Role', options: ROLES2 },
    { name: 'office', type: 'select', label: 'Role', options: OFFICES },
];

export const EDIT_PASSWORD_FIELDS = [
    { name: 'password', type: 'password', placeholder: 'e.g XXXXXX', label: 'Password' },
    { name: 'password2', type: 'password', placeholder: 'e.g XXXXXX', label: 'Confirm Password' },
];


export const Olabel_MSG = 'Account Successfully created';
export const OK_MSG_COLOR = 'teal-text';
export const ERR_MSG_COLOR = 'brown-text';
export const EDIT_MODAL_ID = 'EDIT_MODAL_ID';
export const CHANGE_PWD_MODAL_ID = 'CHANGE_PWD_MODAL_ID';

