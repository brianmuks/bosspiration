import { DEFAULT_LANGAUGE, LANG_PATH } from "./constants"

/**get a tranlated word based on app language
 * 
 * @param {word} the word to translate 
 * @param {s} word selection def = default, lwc = lowercase, upc = uppercase 
 */
export const getWLang = ({ word = 'login', word2 }) => {
    //TODO: get app lange
    let appLang = DEFAULT_LANGAUGE;
    //NOTE-ISSUE:   react-native does not support dynamic vairables to be passed to require hence nesting of lang folders under data  
    const data = require('./data');
    const text = word2 ? 'word2' : 'word';
    return data[appLang] ? data[appLang][word][text] : data[DEFAULT_LANGAUGE][word][text];
}

