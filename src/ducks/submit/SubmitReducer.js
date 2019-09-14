import { STAGE_NEW_SUBMISSION } from './SubmitTypes';

const initialState = {
  backlog: [],
};

const submitReducer = (state=initialState, action) => {
  switch (action.type) {
    case STAGE_NEW_SUBMISSION:
      return {
        backlog: [
          ...state.backlog,
          action.submission,
        ],
      };
    case 'LOG_OUT':
      return {
        backlog: [],
      }
    default:
      return {
        ...state,
      };
  }
};

export default submitReducer;
