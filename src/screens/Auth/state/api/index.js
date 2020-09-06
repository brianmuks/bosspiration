import {ASSESSMENT_LINK_API} from '../constants';
import AppState from '../';

import axios from 'axios';
import {showErrMsg, showOkMsg} from '../../../../utils';

export const fetchAssessment = ({}) =>
  new Promise((resolve, reject) => {
    axios
      .get(ASSESSMENT_LINK_API)
      .then(function (response) {
        // handle success
        resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        showErrMsg({});

        console.log(error);
      })
      .then(function () {
        // resolve('response.data');
        // always executed
      });
  });

// export const submitAssessment = ({assessmentAnswers}) => {
//   var data = new FormData();
//   data.append(assessmentAnswers);

//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener('readystatechange', function () {
//     if (this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open(
//     'POST',
//     'https://script.google.com/macros/s/AKfycbxNQKk1EenLTZ8JfOJwVI7D5vTIh3ZtneR5Te3TlhYb-LEWQfQ/exec',
//   );
//   xhr.setRequestHeader('cache-control', 'no-cache');
//   xhr.setRequestHeader('postman-token', '663fb9b0-5629-9d37-a843-34ec4269c1be');

//   xhr.send(data);
// };

export const submitAssessment = ({assessmentAnswers}) =>
  new Promise((resolve, reject) => {
    axios({
      url: ASSESSMENT_LINK_API,

      data: {assessmentAnswers},
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded"',
      },
    })
      .then(function (response) {
        // handle success
        console.log('response.datxc', response.data);
        showOkMsg({});
        // resolve(response.data);
      })
      .catch(function (error) {
        // handle error
        showErrMsg({});

        console.log(error);
      })
      .then(function () {
        // resolve('response.data');
        // always executed
      });
  });
