// @flow
import React from 'react';
import MeetListItem from '../MeetListItem';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import MeetsStore from '../../MeetsStore';

const Search = Input.Search;

type Props = {
  store: MeetsStore
};

const MeetListView = ({ store }: Props) => {
  return (
    <Flex auto column m={3}>
      <PaddedSearch
        size="large"
        placeholder="Search for a Meet"
        onSearch={store.changeQueryString}
      />
      {store.visibleMeets.map((meet, i) =>
        <StyledMeetItem key={i} meet={meet} />
      )}
    </Flex>
  );
};

const StyledMeetItem = styled(MeetListItem)`
  margin-bottom: 20px;
`;

const PaddedSearch = styled(Search)`
  margin-bottom: 15px;
`;

export default observer(MeetListView);
