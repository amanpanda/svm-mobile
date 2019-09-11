import { compose, setDisplayName } from 'recompose';
import SubmitPresenter from './SubmitPresenter';

export default compose(
  setDisplayName('SubmitContainer'),
)(SubmitPresenter);
