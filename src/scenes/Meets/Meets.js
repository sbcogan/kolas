// @flow
import React from 'react';
import Layout from 'components/Layout';
import { observer } from 'mobx-react';
import { Route, withRouter } from 'react-router';
import MeetListView from './components/MeetListView';
import MeetDetail from './components/MeetDetail';
import MeetsStore from './MeetsStore';

type Props = {
  location: Object
};

@observer
class Meets extends React.Component<Props> {
  store: MeetsStore;

  constructor(props) {
    super(props);
    this.store = new MeetsStore();
  }

  componentDidMount() {
    this.store.getMeets();
  }

  render() {
    const { location } = this.props;
    const hasId = /meets\/[0-9]*/.test(location.pathname);
    if (hasId) {
      this.store.setActiveMeet(
        parseInt(/meets\/([0-9])*/.exec(location.pathname)[1], 10)
      );
    }
    return (
      <Layout
        subheader={
          hasId
            ? <span>
                {this.store.activeMeet.name || ''}
              </span>
            : undefined
        }
      >
        {!hasId && <MeetListView store={this.store} />}
        <Route
          path="/meets/:id"
          component={() => <MeetDetail meets={this.store.activeMeet} />}
        />
      </Layout>
    );
  }
}

export default withRouter(Meets);
