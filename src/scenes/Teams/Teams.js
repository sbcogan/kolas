// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Flex } from 'reflexbox';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Spin } from 'antd';
import styled from 'styled-components';
import TeamsStore from './TeamsStore';

type Props = {};

type TeamListItemProps = {
  team: {
    ID: string,
    name: string,
    gender: string
  }
};

const TeamListItem = ({ team: { ID, name, gender } }: TeamListItemProps) =>
  <Link to={`/teams/${ID}`}>
    <TeamItem>
      <h3>
        {name}
      </h3>
      <span>
        {gender}
      </span>
    </TeamItem>
  </Link>;

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
            : <Flex column m={3}>
                {this.store.teams.map((team, i) =>
                  <TeamListItem team={team} key={i} />
                )}
              </Flex>}
        </Flex>
      </Layout>
    );
  }
}

const TeamItem = styled(Flex)`
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer
  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: transparent;
  } 
`;

export default Teams;
