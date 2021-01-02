// jshint esversion:6

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root:{
        margin:'0',
    },
    searchBar: {
        margin: '0',

    },

    listFoundGrid: {
        width:'100%',
        paddingTop:'0 !important',
    },
    listsFoundContainer: {
        backgroundColor: '#fff',
        listStyle: 'none',
        fontSize: '1rem',
        margin:0,
    },

    showList: {
        hidden: 'true',
    }
});
