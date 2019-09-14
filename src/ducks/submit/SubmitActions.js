import { STAGE_NEW_SUBMISSION, CLEAR_BACKLOG } from './SubmitTypes';

export const stageNewSubmission = (submission) => {
  return {
    type: STAGE_NEW_SUBMISSION,
    submission,
  }
}

export const clearBacklog = () => {
  return {
    type: CLEAR_BACKLOG,
  };
}