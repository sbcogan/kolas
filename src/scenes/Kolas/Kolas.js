// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import KolasStore from './KolasStore';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select, Card, Row, Col } from 'antd';
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
          <InputRow>
            <PaddedInput size="large" placeholder="Filter Teams" />
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
          <TitleRow>
            <h1>Predicted Rankings</h1>
          </TitleRow>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  title="Teams in the Championship"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>31</h1>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Auto Teams"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>18</h1>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="At Large Teams"
                  bordered={false}
                  style={{ 'text-align': 'center' }}
                >
                  <h1>13</h1>
                </Card>
              </Col>
            </Row>
          </div>
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

const TitleRow = styled(Flex)`
  margin: 30px;
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
