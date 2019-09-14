import {
  SET_GENERAL_SURVEYS,
  SET_ASSET_SURVEYS,
  SET_META_DATA,
} from './SurveyTypes';

const initialState = {
  general: [],
  assets: [],
  meta: {},
};

const surveyReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_GENERAL_SURVEYS:
      return {
        ...state,
        general: action.surveyList,
      }
    case SET_ASSET_SURVEYS:
      return {
        ...state,
        assets: action.surveyList,
      }
    case SET_META_DATA:
      return {
        ...state,
        meta: action.meta,
      }
    case 'LOG_OUT':
      return {
        general: [],
        assets: [],
        meta: {},
      }
    default:
      return {
        ...state,
      };
  }
};

export default surveyReducer;
