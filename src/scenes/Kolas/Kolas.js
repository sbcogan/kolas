// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import KolasStore from './KolasStore';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select } from 'antd';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { VictoryChart, VictoryBar } from 'victory';

const Option = Select.Option;

type Props = {};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points'
  }
];

const data = [
  { name: 1, points: 13000 },
  { name: 2, points: 16500 },
  { name: 3, points: 14250 },
  { name: 4, points: 19000 }
];

@observer
class Kolas extends React.Component<Props> {
  store: KolasStore;

  constructor(props: Props) {
    super(props);
    this.store = new KolasStore();
  }

  componentDidMount() {
    this.store.getRankings();
  }

  handleGenderChange = () => {};

  render() {
    return (
      <Layout>
        <Flex column auto>
          <VictoryChart>
            <VictoryBar
              data={data}
              // data accessor for x values
              x="name"
              // data accessor for y values
              y="points"
              width="300px"
            />
          </VictoryChart>
          <InputRow>
            <PaddedInput size="large" placeholder="filter teams" />
            <PaddedSelect
              defaultValue="all"
              size="large"
              stylelucy={{ width: 120 }}
              onChange={this.handleGenderChange}
            >
              <Option value="all">All Divisions</Option>
              <Option value="northeast">Northeast</Option>
              <Option value="midatlantic">Midatlantic</Option>
              <Option value="south">South</Option>
            </PaddedSelect>
            <PaddedSelect
              defaultValue="mens"
              size="large"
              style={{ width: 120 }}
              onChange={this.store.changeGender}
            >
              <Option value="mens">Men's</Option>
              <Option value="womens">Women's</Option>
            </PaddedSelect>
            <Button
              type="primary"
              size="large"
              onClick={this.store.getRankings}
            >
              Predict Bids
            </Button>
          </InputRow>
          <FlexTable
            bordered
            title={() => 'Predicted at Large Bids'}
            dataSource={
              this.store.activeGender === 'mens'
                ? this.store.mensRankings
                : this.store.womensRankings
            }
            columns={columns}
            pagination={{
              defaultPageSize: 10
            }}
          />
        </Flex>
      </Layout>
    );
  }
}

const PaddedSelect = styled(Select)`
  margin-right: 10px;
`;

const PaddedInput = styled(Input)`
  margin-right: 10px;
`;

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

export { Kolas };
export default Kolas;
