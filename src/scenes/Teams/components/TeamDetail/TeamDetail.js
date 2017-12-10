import * as React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import TeamDetailStore from './TeamDetailStore';

type Props = {
  match: Object
};

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
      <Flex column>
        <h3>Recent Meets</h3>
        <Flex>
          {this.store.team.map((meet, i) =>
            <div key={i}>
              {meet.meet}
            </div>
          )}
        </Flex>
      </Flex>
    );
  }
}

export default withRouter(TeamDetail);
