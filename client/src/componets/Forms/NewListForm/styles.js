import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '80%',
      },
    },
    listNameInput: {
        width: '50% !important'
    },
    createBtn:{
        margin:'19px 3px 0 0 !important'
    }
  }));

  export default useStyles;