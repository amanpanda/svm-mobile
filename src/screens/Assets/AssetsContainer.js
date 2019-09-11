import { compose, setDisplayName } from 'recompose';
import AssetsPresenter from './AssetsPresenter';

export default compose(
  setDisplayName('AssetsContainer'),
)(AssetsPresenter);
