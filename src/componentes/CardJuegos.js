import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, fade } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import logo from "./path10.png";
import face from "./sadface.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const url = "http://100.25.109.105:2000/consultarJuegos";
const baseUrl = "http://100.25.109.105:2000/importar";

//Material UI estilo de card
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 270,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  barraRoot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AgregarJuego = () => {
  const [titulo, setTitulo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [link, setLink] = React.useState("");
  const [imagen, setImagen] = React.useState("");
  const [errorTitulo, setErrorTitulo] = React.useState(false);
  const [errorDesc, seterrorDesc] = React.useState(false);
  const [leyenda1, setLeyenda1] = React.useState("");
  const [leyenda2, setLeyenda2] = React.useState("");
  const [verificar, setVerificar] = React.useState(false);

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    if (titulo != "" && descripcion != "" && link != "" && imagen != "") {
      setVerificar(false);
      setState({ open: true, ...newState });
      peticionPost();
    } else {
      setVerificar(true);
      setState({ open: true, ...newState });
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const peticionPost = async () => {
    await axios
      .post(baseUrl, {
        titulo: titulo,
        descripcion: descripcion,
        link: link,
        imagen: imagen,
      })
      .then((response) => {
        console.log("Listo....");
      });
  };

  return (
    <CssBaseline>
      <Grid container direction="column" justify="center" alignContent="center">
        <Typography
          variant="overline"
          style={{ marginTop: 10, alignSelf: "center", fontSize: 20 }}
        >
          Agregar un juego
        </Typography>
        <TextField
          label="Título del juego"
          variant="outlined"
          error={errorTitulo}
          multiline
          helperText={leyenda1}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (titulo.length > 45) {
              setErrorTitulo(true);
              setLeyenda1("El título contiene mas de 45 carácteres.");
            } else {
              setErrorTitulo(false);
              setLeyenda1("");
            }
          }}
          style={{ margin: 20, alignSelf: "center", width: 450 }}
        />
        <TextField
          label="Descripción del juego"
          variant="outlined"
          multiline
          error={errorDesc}
          helperText={leyenda2}
          onChange={(e) => {
            setDescripcion(e.target.value);
            if (descripcion.length > 128) {
              seterrorDesc(true);
              setLeyenda2("La descripción contiene mas de 128 carácteres.");
            } else {
              seterrorDesc(false);
              setLeyenda2("");
            }
          }}
          style={{ margin: 20, alignSelf: "center", width: 450 }}
        />
        <TextField
          label="Link del juego"
          variant="outlined"
          multiline
          onChange={(e) => {
            setLink(e.target.value);
          }}
          style={{ margin: 20, alignSelf: "center", width: 450 }}
        />
        <TextField
          label="Link de imagen"
          variant="outlined"
          multiline
          onChange={(e) => {
            setImagen(e.target.value);
          }}
          style={{ margin: 20, alignSelf: "center", width: 450 }}
        />
        <Button
          variant="contained"
          style={{ margin: 20, alignSelf: "center", width: 250 }}
          onClick={handleClick({ vertical: "bottom", horizontal: "left" })}
        >
          Agregar
        </Button>
      </Grid>

      {verificar === false ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            ¡Registro exitoso!
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="warning">
            ¡Rellene todos los campos!
          </Alert>
        </Snackbar>
      )}
    </CssBaseline>
  );
};

const Juegos = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [buscar, setBuscar] = useState("");

  const [listaFiltrada, setlistaFiltrada] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [idJuego, setIdJuego] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    peticionBorrar(idJuego);
    setOpen(false);
  };

  const handleCloseTwo = () => {
    setOpen(false);
  };

  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  useEffect(async () => {
    await peticionGet();
  }, []);

  const peticionBorrar = async (id) => {
    const url = `http://100.25.109.105:2000/eliminar/${id}`;
    await axios.delete(url).then((response) => {
      console.log("Se borro con exito :D");
      peticionGet();
    });
  };

  useEffect(() => {
    setlistaFiltrada(
      data.filter((juego) => {
        return juego.titulo.toLowerCase().includes(buscar.toLocaleLowerCase());
      })
    );
  }, [buscar, data]);

  return (
    <div>
      <CssBaseline />
      <Container fixed>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"¿Está seguro de eliminar?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Recuerde que esta operación es irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseTwo}
                variant="contained"
                color="secondary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <TextField
            onChange={(e) => setBuscar(e.target.value)}
            label="Buscar un juego"
            variant="outlined"
            style={{ margin: 20, alignSelf: "center", width: 350 }}
          />
        </Grid>
        <Grid container spacing={16} justify="center">
          {listaFiltrada.length === 0 ? (
            <Grid
              container
              direction="column"
              justify="center"
              alignContent="center"
            >
              <Typography variant="overline">
                No se encontro ningún resultado
              </Typography>
              <img
                src={face}
                width="200"
                height="200"
                style={{ alignSelf: "center", marginTop: 30 }}
              />
            </Grid>
          ) : (
            ""
          )}
          {listaFiltrada.map((juego) => {
            return (
              <Card
                className={classes.root}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardActionArea
                  style={{
                    display: "flex",
                    flex: "1 0 auto",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={juego.titulo}
                    height="160"
                    image={juego.imagen}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="overline">
                      {juego.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {juego.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    href={juego.link}
                    target="blank"
                  >
                    COMPRAR
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    target="blank"
                    onClick={() => {
                      handleClickOpen();
                      setIdJuego(juego.id);
                    }}
                  >
                    ELIMINAR
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

const Gogster = () => {
  return (
    <CssBaseline>
      <Grid container direction="column" justify="center" alignContent="center">
        <img
          src={logo}
          width="200"
          height="200"
          style={{ alignSelf: "center", marginTop: 30 }}
        />
        <Typography variant="h4" style={{ marginTop: 10, alignSelf: "center" }}>
          GOGSTER
        </Typography>
        <Typography
          variant="subtitle1"
          paragraph
          style={{ alignSelf: "center" }}
        >
          Una página simple para juegos sin DRM
        </Typography>
      </Grid>
    </CssBaseline>
  );
};

const CardJuegos = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.barraRoot}>
        <AppBar position="static" style={{ background: "#FF8D33" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              href="https://www.youtube.com/c/Sterplay2010"
              target="blank"
              color="inherit"
              aria-label="menu"
            >
              <SportsEsportsIcon />
            </IconButton>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Typography
                variant="overline"
                className={classes.title}
                style={{ alignSelf: "center", margin: 10 }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/gogster"
                >
                  Gogster
                </Link>
              </Typography>

              <Typography
                variant="overline"
                style={{ alignSelf: "center", margin: 10 }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/juegos"
                >
                  Juegos
                </Link>
              </Typography>

              <Typography
                variant="overline"
                style={{ alignSelf: "center", margin: 10 }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/agregar"
                >
                  Agregar
                </Link>
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/gogster">
            <Gogster />
          </Route>
          <Route path="/juegos">
            <Juegos />
          </Route>
          <Route path="/agregar">
            <AgregarJuego />
          </Route>
          <Route path="/">
            <Gogster />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default CardJuegos;

//<TextField label="Busca un juego" variant="filled" style={{margin:20, alignSelf:'center'}}/>

/*

 <div className={classes.barraRoot}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              href="https://www.youtube.com/c/Sterplay2010"
              target="blank"
              color="inherit"
              aria-label="menu"
            >
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
                onChange={(e) => setBuscar(e.target.value)}
                placeholder="Buscar…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>

*/
