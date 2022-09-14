import { Box } from '@mui/material';
import * as React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  titleRightContent?: React.ReactNode;
  content?: React.ReactNode;
}

function MainCard(props: Props) {
  return (
    <Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <h2 className="card-title">{props.title}</h2>

        <div>{props.titleRightContent}</div>
      </div>

      <div
        className="card-subtitle"
        style={{
          color: '#667085',
          fontWeight: '40',
        }}
      >
        {props.subtitle}
      </div>

      <div style={{ marginTop: '2rem' }}>{props.content}</div>
    </Box>
  );
}

export default MainCard;
