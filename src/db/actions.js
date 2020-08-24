import Realm from 'realm';
import { ERRORS, SUCCESS } from './codes';
import { SCHEMA_NAMES } from './constants';
import { USER_PROFILE_SCHEMA } from './schema'


//write

/**
 * @param collection string 
 * @param data object 
 * @returns promise 
 */
export const saveLocalProfile = ({ data }) => {

    return new Promise((resolve, reject) => {

        if (typeof data !== 'object' && data !== null) reject(ERRORS.DATA_IS_NOT_AN_OBJECT);
        // TODO:verify schema

        console.log(data)

        Realm.open(USER_PROFILE_SCHEMA).then(realm => {

            realm.write(() => {

                const oldProfile = realm.objects(SCHEMA_NAMES.USER_PROFILE);
                // avoid profile replicate
                realm.delete(oldProfile);
                realm.create(SCHEMA_NAMES.USER_PROFILE, data);
            });

            realm.close();
            resolve(SUCCESS.DONE);

        })
            .catch(err => {
                console.log('Realm.open():err', err);
                reject(ERRORS.UNKNOWN_ERROR);
            });
    })
}


//fetch

export const fetchLocalProfile = ({ }) => {
    return new Promise((resolve, reject) => {

        Realm.open(USER_PROFILE_SCHEMA).then(realm => {

            let data = realm.objects(SCHEMA_NAMES.USER_PROFILE);
            data = data.length ? data[0] : null;
            resolve(data);

            // NOTE: when we use realm.close();  data is not being resolved
            return realm;
        }).then(realm => {
            realm.close();
        })
            .catch(err => {
                console.log('Realm.open():err', err);
                reject(ERRORS.UNKNOWN_ERROR);
            });
    })


}




//update 

export const updateLocalProfile = ({ data }) => {
    return new Promise((resolve, reject) => {

        if (typeof data !== 'object' && data !== null) reject(ERRORS.DATA_IS_NOT_AN_OBJECT);


        Realm.open(USER_PROFILE_SCHEMA).then(realm => {
            realm.write(() => {
                let userProfile = realm.objects(SCHEMA_NAMES.USER_PROFILE);
                userProfile = userProfile.length ? userProfile[0] : {};
                console.log('updateLocalProfile();key', userProfile.points)
                for (const key in data) {
                    const val = data[key];
                    userProfile[key] = val;
                }
                resolve(SUCCESS.DONE)
            });
            // NOTE: when we use realm.close();  data is not being resolved
            return realm;
        }).then(realm => {
            realm.close();
        })
            .catch(err => {
                console.log('Realm.open():err', err);
                reject(ERRORS.UNKNOWN_ERROR);
            });
    })


}





