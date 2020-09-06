import { DEFAULT_LANGAUGE, LANG_PATH } from "./constants"

/**get a tranlated word based on app language
 * 
 * @param {word} the word to translate 
 * @param {s} word selection def = default, lwc = lowercase, upc = uppercase 
 * @returns translated word if it exists or the same word if not found
 */
export const getWLang = ({ word, word2 }) => {
    //TODO: get app lange
    let appLang = DEFAULT_LANGAUGE;
    //NOTE-ISSUE:   react-native does not support dynamic vairables to be passed to require hence nesting of lang folders under data  
    const data = require('./data');
    const text = word2 ? 'word2' : 'word';
    //NOTE: when word does not exit we return the word back as it is
    return data[appLang] ? (data[appLang][word] ? data[appLang][word][text] : word) : (data[DEFAULT_LANGAUGE][word] ? data[DEFAULT_LANGAUGE][word][text] : word);
}

