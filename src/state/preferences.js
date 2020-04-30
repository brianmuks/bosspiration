import { APP_STORE } from "../constants";
// import { showMsg } from "../screens/utils";
import AsyncStorage from "@react-native-community/async-storage";



export const saveData =  (key,val) => {
   
return new Promise((resolve, reject) => {
    AsyncStorage.setItem(`${APP_STORE}${key}`,
        val,(err)=>{
            // console.log(err,res);

            if (err) {
              reject(false);
                return
            }else{
                resolve(true);
                
            }

          
        });
});
}

export const multiSaveData =  (data) => {

    data = data.map(i => ([APP_STORE + i[0],i[1]]));   
    console.log('MyLoginData', data)
return new Promise((resolve, reject) => {
    AsyncStorage.multiSet(data,(err)=>{

        if (err) {
            reject(false);
            return
        } else {
            resolve(res);
        }
        });
});
}

export const multiGetData = (data) => {
    data = data.map((val)=>(APP_STORE+val))
    return new Promise((resolve, reject) => {
        AsyncStorage.multiGet(data, (err, res) => {
            res ? resolve(res) : reject(err);
            // err && ;
        });
    });
}


export const getData =  (key) => {
    return new Promise((resolve, reject) => {
         AsyncStorage.getItem(APP_STORE+key, (err, res) => {
             !err && resolve(res) || reject({ status: false,err});
        });
    });

}


export const removeData = key => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(`${APP_STORE}${key}`, err => {
      // console.log(err,res);

      if (err) {
        reject(false);
        return;
      } else {
        resolve(true);
      }
    });
  });
};