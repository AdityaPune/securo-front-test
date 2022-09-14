import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import './style.scss';

interface ISecuroButtonWithLoaderProps {
  text: string;
  color?: any;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  successText?: string;
  style?: any;
  classes?: string;
}

export default function SecuroButtonWithLoader({
  text,
  loading,
  loadingText,
  disabled,
  style,
  classes,
}: ISecuroButtonWithLoaderProps) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      className={classes}
      style={style}
    >
      {loading && (
        <CircularProgress
          size={20}
          thickness={5}
          color="info"
          style={{ marginRight: '1rem' }}
        />
      )}
      {loading && loadingText ? loadingText : text}
    </Button>
  );
}
