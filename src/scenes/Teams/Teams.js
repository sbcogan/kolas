// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { Table, Spin } from 'antd';
import styled from 'styled-components';
import TeamsStore from './TeamsStore';

type Props = {};

const columns = [
  {
    title: 'Name',
    dataIndex: 'team_name',
    key: 'team_name'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  },
  {
    title: 'Region Rank',
    dataIndex: 'team_rank',
    key: 'team_rank'
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
    return (
      <Layout>
        <Flex column auto>
          {this.store.loading
            ? <Spin />
            : <FlexTable
                bordered
                title={() => 'Teams'}
                dataSource={this.store.teams}
                columns={columns}
                pagination={{
                  defaultPageSize: 5
                }}
              />}
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

export default Teams;
