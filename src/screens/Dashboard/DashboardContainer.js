import { compose, setDisplayName } from 'recompose';
import DashboardPresenter from './DashboardPresenter';

export default compose(
  setDisplayName('DashboardContainer'),
)(DashboardPresenter);
