import { TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '.5rem',
        minHeight: '95vh',
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.sriftoSpalva
    },
    pastaba: {
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '4px',
        width: '100%',
    },
    cssOutlinedInput: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
    },
    cssFocused: {
        border: 'none',
        outline: 'none',
    },
    notchedOutline: {
        border: 'none',
        outline: 'none',
    },
    LinkParent: {
        padding: '.3rem 1rem',
        margin: '1rem 0', 
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        borderRadius: '4px'
    },
    image: {
        height: '3rem',
        width: '3rem',
        objectFit: 'contain',
        marginRight: '1rem'
    },
}));

const SearchPage = ({searchValue, handlesearchValueChange, searchResult, setSearchValue, setSearchResult}) => {

    const classes = useStyles();
    const history = useHistory();

    const linkTo = (link) => {
        history.push(`/products/${link}`);
        window.scrollTo({top: 0, left: 0});
        setSearchValue('');
        setSearchResult([]);
      };

    return (
        <Box classes={{root: classes.root}}>
            <TextField 
                id="paieska" 
                variant="outlined" 
                classes={{root: classes.pastaba}}
                placeholder='Ieškoti...'
                value={searchValue}
                onChange={handlesearchValueChange}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
            />
            {searchResult.length > 0 && 
                <Box>
                    {searchResult.slice(0, 7).map((item) => 
                        <Box classes={{root: classes.LinkParent}} onClick={() => linkTo(item.link)}>
                            
                            <img src={item.image} alt={`${item.name} paveikslelis`} className={classes.image}/>
                            
                            <p>{item.name}</p>
                        </Box>
                    )}
                </Box>
            }
        </Box>
    )
}

export default SearchPage
