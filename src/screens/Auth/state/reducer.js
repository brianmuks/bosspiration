import {ASSESSMENT_ACTIONS} from './actions';

export const assessmentReducer = (state, action) => {
  switch (action.type) {
    case ASSESSMENT_ACTIONS.SET_ASSSESSMENT:
      const introPage = {
        // title: action.data.title,
        description: action.data.description,
        type: 'PAGE_BREAK',
      };
      return {
        ...state,
        testQuestions: [introPage, ...action.data.items.slice(0, 6)],
        //remove Questions
        questionsMetaData: {...action.data, items: undefined},
        title: action.data.title,
        description: action.data.description,
      };
    case ASSESSMENT_ACTIONS.SET_ASSSESSMENT_ANSWER:
      // save new answer and replace any previous answer for this question
      return {
        ...state,
        assessmentAnswers: {...state.assessmentAnswers, ...action.newAnswer},
        //NOTE we add one to state.assessmentAnswers because we are picking previous state.
        isShowDoneBtn: state.currentQuestionIndex == state.testQuestions.length,
      };
    case ASSESSMENT_ACTIONS.SET_ASSSESSMENT_CURRENT_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.currentQuestionIndex,
      };
    default:
      return state;
  }
};
