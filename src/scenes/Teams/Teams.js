// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Route, withRouter } from 'react-router';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { Table, Spin } from 'antd';
import styled from 'styled-components';
import TeamsStore from './TeamsStore';
import TeamDetail from './components/TeamDetail';

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
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  }
];

@observer
class Teams extends React.Component<Props> {
  store: TeamsStore;

  constructor(props: Props) {
    super(props);
    this.store = new TeamsStore();
  }

  componentDidMount() {
    this.store.getTeams();
  }

  render() {
    const { location } = this.props;
    const hasId = /teams\/[0-9]*/.test(location.pathname);
    if (hasId) {
      this.store.setActiveMeet(
        parseInt(/teams\/([0-9])*/.exec(location.pathname)[1], 10)
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
        <Flex column auto>
          {this.store.loading
            ? <Spin />
            : <div>
                {!hasId &&
                  <FlexTable
                    bordered
                    title={() => 'Teams'}
                    dataSource={this.store.teams}
                    columns={columns}
                    pagination={{
                      defaultPageSize: 10
                    }}
                  />}
                <Route path="/teams/:id" component={() => <TeamDetail />} />
              </div>}
        </Flex>
      </Layout>
    );
  }
}

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export default withRouter(Teams);
