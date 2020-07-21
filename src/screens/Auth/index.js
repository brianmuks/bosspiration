import { getData } from "../../state/preferences";
import { PHONE_NUMEBR } from "../../Constants";
import Meteor from 'react-native-meteor';
export const checkLogin = () => {
    getData(PHONE_NUMEBR).then(x => {
        return x;
    })
        .catch(err => (false));
}

export const createAccount = ({ phoneNumber, uid, profile }) => {

    return new Promise((resolve, reject) => {
        
        profile = { ...profile,rate:0};//inti rate

        Meteor.call('Rider.createAccount', { phoneNumber, uid, profile }, (error, id) => {
            if (error) {
                console.log('error', error);
                reject(error)
            }
            if (id) {
                console.log('success', id);
                resolve(id)
            }
        });
    });

}


export const login = ({phoneNumber,uid})=>{

    console.log(phoneNumber,uid,'login');
    const password = phoneNumber+phoneNumber.substring(3,5);//TODO: SECURE
    return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(phoneNumber, password, err=>{
            console.log('loginWithPassword:err',err)
            err && reject(false) || resolve(true);
        })
    });

}