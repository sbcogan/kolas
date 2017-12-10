// @flow
import React from 'react';
import Layout from 'components/Layout';
import { observer } from 'mobx-react';
import { Route, withRouter } from 'react-router';
import MeetListView from './components/MeetListView';
import MeetDetail from './components/MeetDetail';
import MeetsStore from './MeetsStore';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select } from 'antd';
//import Layout from 'components/Layout';
import styled from 'styled-components';

type Props = {
  location: Object
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Date',
    dataIndex: 'meet_date',
    key: 'meet_date'
  }
];

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
          hasId ? <span>{this.store.activeMeet.name || ''}</span> : undefined
        }
      >
        <Flex column auto>
          <InputRow>
            {!hasId && <MeetListView meets={this.store.meets} />}
            <Route
              path="/meets/:id"
              component={() => <MeetDetail meets={this.store.activeMeet} />}
            />
          </InputRow>
        </Flex>
      </Layout>
    );
  }
}

const InputRow = styled(Flex)`
  margin: 30px;
  margin-bottom: 10px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  margin-top: 0px;
  .ant-table {
    background: #fff;
  }
`;

export default withRouter(Meets);
