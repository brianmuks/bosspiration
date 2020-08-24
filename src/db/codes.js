// Informational responses(100–199),
//     Successful responses(200–299),
//         general errors (300–399),
//         write errors(400–499),
//             fetch  errors(500–599).



//ok

export const SUCCESS = {
    DONE: {
        msg: 'DONE',
        code: 200
    },

}


//error
export const ERRORS = {
    DATA_IS_NOT_AN_OBJECT: {
        msg: 'DATA_IS_NOT_AN_OBJECT',
        code: 300
    },
    UNKNOWN_SCHEMA: {
        msg: 'UNKNOWN_SCHEMA_OR_DB_COLLECTION',
        code: 301
    },
    UNKNOWN_ERROR: {
        msg: 'UNKNOWN_ERROR',
        code: 302
    }
}