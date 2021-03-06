import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH as drawerWidth } from '../constants';
import sizes from "./sizes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    [sizes.down("xs")]: {
      height: "56px"
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navBtns: {
    marginRight: "0 0.2rem",
    [sizes.down("xs")]: {
      marginRight: 0,
      padding: "0.3rem"
    }
  },
  button: {
    margin: "0 0.5rem"
  }
}));

export default useStyles;