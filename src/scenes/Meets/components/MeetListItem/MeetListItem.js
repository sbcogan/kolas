// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';

type Props = {
  meet: Object,
  className?: string
};

const MeetListItem = ({ meet, className }: Props) => {
  return (
    <FlexCard
      className={className}
      title={
        <Link to={`/meets/${meet.ID}`}>
          {meet.name}
        </Link>
      }
      extra={
        <span>
          {meet.date}
        </span>
      }
    />
  );
};

const FlexCard = styled(Card)`
  flex: 1 1 auto;
`;

export default MeetListItem;
