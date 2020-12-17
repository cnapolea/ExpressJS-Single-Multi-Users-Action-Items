import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    editInput: {
      width: '52%',
      fontSize: '20px',
      border: 'inherit',
      backgroundColor: 'inherit',
      color: 'inherit'
    },
    
  }));

export default useStyles;