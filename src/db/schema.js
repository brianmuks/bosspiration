import { SCHEMA_NAMES, SCHEMA_VERSION } from './constants';

export const USER_PROFILE_SCHEMA = {
    schemaVersion: SCHEMA_VERSION,
    schema:
        [
            {
                name: SCHEMA_NAMES.USER_PROFILE,
                properties: {
                    fname: 'string',
                    lname: 'string',
                    phoneNumber: 'string',
                    gender: 'string',
                    email: 'string',
                    userId: 'string',
                    points: 'int?',
                    studentId: 'string?',
                    nrc: 'string?',
                    role: 'string?',
                    status: 'string?',
                }
            }

        ]
}