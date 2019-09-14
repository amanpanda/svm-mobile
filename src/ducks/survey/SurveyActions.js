import {
  SET_GENERAL_SURVEYS,
  SET_ASSET_SURVEYS,
  SET_META_DATA,
} from './SurveyTypes';


export const setGeneralSurveys = (surveyList) => {
  return {
    type: SET_GENERAL_SURVEYS,
    surveyList,
  }
}

export const setAssetSurveys = (surveyList) => {
  return {
    type: SET_ASSET_SURVEYS,
    surveyList,
  }
}

export const setMetaData = (meta) => {
  return {
    type: SET_META_DATA,
    meta,
  }
}
