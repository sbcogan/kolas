import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import QualificationStore from 'stores/QualificationStore';
import TeamDetailStore from './TeamDetailStore';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import styled from 'styled-components';

type Props = {
  match: Object,
  qual: QualificationStore
};

type MeetListItemProps = {
  meet: {
    meet: string,
    meet_id: string
  }
};

const MeetListItem = ({ meet: { meet, meet_id } }: MeetListItemProps) =>
  <Link to={`/meets/${meet_id}`}>
    <MeetItem>
      {meet}
    </MeetItem>
  </Link>;

@observer
class TeamDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const { qual, match: { params: { id } } } = props;
    this.store = new TeamDetailStore({ id, qual });
  }

  componentDidMount() {
    this.store.getTeam();
  }

  get qualified(): boolean {
    const { qual } = this.props;
    if (
      this.store.loading ||
      !qual ||
      !qual.mensRankings ||
      !qual.womensRankings ||
      qual.loading
    )
      return false;
    if (this.store.team.gender === 'mens') {
      return qual.mensRankings
        .map(team => team.name)
        .includes(this.store.team.name);
    } else {
      return qual.womensRankings
        .map(team => team.name)
        .includes(this.store.team.name);
    }
  }

  render() {
    if (this.store.loading) {
      return null;
    }
    return (
      <Flex auto column>
        <MeetsHeader>Qualification for Nationals</MeetsHeader>
        <StyledAlert
          message={`Based on their record this team will most likely ${this
            .qualified
            ? ''
            : 'not'} qualify for nationals`}
          type={this.qualified ? 'success' : 'error'}
        />
        <MeetsHeader>Recent Meets</MeetsHeader>
        <Flex column>
          {this.store.recentMeets.map((meet, i) =>
            <MeetListItem key={i} meet={meet} />
          )}
        </Flex>
      </Flex>
    );
  }
}

const StyledAlert = styled(Alert)`
  margin-bottom: 10px;
`;

const MeetsHeader = styled.h3`margin-bottom: 10px;`;

const MeetItem = styled(Flex)`
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

export default withRouter(inject('qual')(TeamDetail));
