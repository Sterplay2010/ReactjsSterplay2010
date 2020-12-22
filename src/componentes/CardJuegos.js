import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const url = "http://localhost:2000/consultarJuegos";

//Material UI estilo de card
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 270,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    barraRoot: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function CardJuegos() {
    const classes = useStyles();

    const [data, setData] = useState([]);

    const [buscar, setBuscar] = useState('');

    const [listaFiltrada, setlistaFiltrada] = useState([]);

    const peticionGet = async () => {
        await axios.get(url)
            .then(response => {
                setData(response.data);
            })
    }

    useEffect(async () => {
        await peticionGet();
    }, []);


    useEffect(() => {
        setlistaFiltrada(
            data.filter(juego => {
                return juego.titulo.toLowerCase().includes(buscar.toLocaleLowerCase())
            })
        )
    }, [buscar, data])



    return (
        <div>

            <div className={classes.barraRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} href="https://www.youtube.com/c/Sterplay2010" target="blank" color="inherit" aria-label="menu">
                            <SportsEsportsIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Gogster
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={e => setBuscar(e.target.value)}
                                placeholder="Buscar…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

            <CssBaseline />
            <Container fixed>
                <Grid container spacing={16} justify="center">
                    {listaFiltrada.map(juego => {
                        return <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={juego.titulo}
                                    height="160"
                                    image={juego.imagen}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {juego.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {juego.descripcion}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" href={juego.link} target="blank">
                                    Descargar
							</Button>
                            </CardActions>
                        </Card>
                    })}
                </Grid>
            </Container>
            
        </div>
    );
}


