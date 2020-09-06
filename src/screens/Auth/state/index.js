// const getQuestions

import {useReducer, useEffect} from 'react';
import ASSESSMENT_INITIAL_STATE from './initState';
import {fetchAssessment, submitAssessment} from './api';
import {ASSESSMENT_ACTIONS} from './actions';
import {assessmentReducer} from './reducer';
import {showErrMsg, showOkMsg} from '../../../utils';
import {getWLang} from '../../../resources/lang/methods';
import {WORDS} from '../../../resources/lang/data/constants';

/**Helper component for reducer and app ui
 * This is an attempt to separate logic from UI and to make state management easy
 *
 * @param {*} param0
 */
const AppState = ({}) => {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    ASSESSMENT_INITIAL_STATE,
  );

  useEffect(() => {
    //componentDIdMount
    fetchAssessment({}).then((data) => {
      dispatch({type: ASSESSMENT_ACTIONS.SET_ASSSESSMENT, data});
    });
  }, [0]);

  /**
   *
   * @param {*} param0
   */
  const onChange = ({index, item, value}) => {
    let {assessmentAnswers, isWorking} = state;

    if (isWorking) return showMsg('Please wait...', 'warning');

    let newAnswer = {};
    if (item.type.isCheckbox) {
      if (value) {
        delete assessmentAnswers[item.id];
      } else {
        const newEntry = {[item.id]: value};
        newAnswer[[item.id]] = assessmentAnswers[item.id] =
          (assessmentAnswers[item.id] && {
            ...assessmentAnswers[item.id],
            ...newEntry,
          }) ||
          newEntry;
      }
    } else {
      newAnswer[item.id] = {value, index, type: item.type};
    }

    dispatch({
      type: ASSESSMENT_ACTIONS.SET_ASSSESSMENT_ANSWER,
      newAnswer,
      currentQuestionIndex: index + 1,
    });
  };

  const onSlideChange = ({index, lastIndex, onSlideCheat, slider}) => {
    const {testQuestions, assessmentAnswers, currentQuestionIndex} = state;
    const question = testQuestions[index - 1]
      ? testQuestions[index - 1]
      : testQuestions[0];

    // console.log('assessmentAnswers', assessmentAnswers);
    // alert(question.type);
    // TODO: question.type on the first page has a wrong reference

    if (
      !testQuestions[question] &&
      !assessmentAnswers[question.id] &&
      question.type !== 'PAGE_BREAK'
    ) {
      // onSlideCheat && onSlideCheat();
      showErrMsg({text1: getWLang({word: WORDS.nxt_q_err})});

      return slider && slider.goToSlide(currentQuestionIndex);
    }

    dispatch({
      type: ASSESSMENT_ACTIONS.SET_ASSSESSMENT_CURRENT_INDEX,
      currentQuestionIndex: index,
    });
  };

  //submitAssessment start

  /**Submit assessment to the server
   * At the time of writing this was been sent to google forms awaiting strapi server
   * @param {*} param0
   */
  const _submitAssessment = ({}) => {
    const assessmentAnswers = state.assessmentAnswers;
    submitAssessment({assessmentAnswers});
  };

  //submitAssessment end

  return {state, dispatch, onChange, onSlideChange, _submitAssessment};
};

export default AppState;
