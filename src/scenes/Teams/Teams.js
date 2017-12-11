// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Route, withRouter } from 'react-router';
import { Flex } from 'reflexbox';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Input, Spin } from 'antd';
import styled from 'styled-components';
import TeamsStore from './TeamsStore';
import TeamDetail from './components/TeamDetail';

type Props = {
  location: Object
};

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
    const { location } = this.props;
    const hasId = /teams\/[0-9]*/.test(location.pathname);
    if (hasId) {
      this.store.setActiveTeam(
        parseInt(/teams\/([0-9]+)*/.exec(location.pathname)[1], 10)
      );
    }
    return (
      <Layout
        subheader={
          hasId
            ? <span>
                {this.store.activeTeam.name || ''}
              </span>
            : undefined
        }
      >
        <Flex column auto>
          {this.store.loading
            ? <Spin />
            : <Flex column m={3}>
                {!hasId &&
                  <Flex column>
                    <PaddedSearch
                      size="large"
                      placeholder="Search for a Team"
                      onSearch={this.store.changeQueryString}
                    />
                    {this.store.visibleTeams.map((team, i) =>
                      <TeamListItem team={team} key={i} />
                    )}
                  </Flex>}
                <Route path="/teams/:id" component={() => <TeamDetail />} />
              </Flex>}
        </Flex>
      </Layout>
    );
  }
}

const PaddedSearch = styled(Input.Search)`
  margin-bottom: 15px;
`;

const TeamItem = styled(Flex)`
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: transparent;
  } 
`;

export default withRouter(Teams);
