import * as React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import TeamDetailStore from './TeamDetailStore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  match: Object
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
    const { match: { params: { id } } } = props;
    this.store = new TeamDetailStore({ id });
  }

  componentDidMount() {
    this.store.getTeam();
  }

  render() {
    if (this.store.loading) {
      return null;
    }
    return (
      <Flex auto>
        <Flex auto column>
          <MeetsHeader>Recent Meets</MeetsHeader>
          <Flex column>
            {this.store.team.map((meet, i) =>
              <MeetListItem key={i} meet={meet} />
            )}
          </Flex>
        </Flex>
        <Flex auto>testing</Flex>
      </Flex>
    );
  }
}

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

export default withRouter(TeamDetail);
