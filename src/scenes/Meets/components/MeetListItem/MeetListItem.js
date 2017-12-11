// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

type Props = {
  meet: Object,
  className?: string
};

const MeetListItem = ({ meet, className }: Props) => {
  return (
    <Link to={`/meets/${meet.ID}`}>
      <MeetItem justify="space-between">
        <Flex>
          {meet.name}
        </Flex>
        <Flex>
          {meet.date}
        </Flex>
      </MeetItem>
    </Link>
  );
};

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

export default MeetListItem;
