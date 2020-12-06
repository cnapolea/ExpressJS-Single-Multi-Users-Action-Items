import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    listNameInput: {
        width: '50% !important'
    },
    formButtons:{
        margin: theme.spacing(1),
    },
    cancelBtn:{
      margin: theme.spacing(1)
    }
  }));

  export default useStyles;