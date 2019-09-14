import { STAGE_NEW_SUBMISSION } from './SubmitTypes';

export const stageNewSubmission = (submission) => {
  return {
    type: STAGE_NEW_SUBMISSION,
    submission,
  }
}