import { Box } from '@mui/material';
import { Card, CardContent } from '@mui/material';

export default function MainContainer(props: any) {
  return (
    <Box
      mt={2}
      sx={{
        width: '100%',
        marginLeft: '38px',
        marginRight: '30px',
      }}
    >
      <Card
        sx={{
          background: '#ffffff',
          boxShadow: '0px 4px 28px -8px rgba(118, 209, 191, 0.27)',
          borderRadius: '10px',
        }}
      >
        <CardContent>{props.children}</CardContent>
      </Card>
    </Box>
  );
}
