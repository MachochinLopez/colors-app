import React from 'react';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import PaletteFormNav from './PaletteFormNav';
// Material UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
// Drag N Drop
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const defaultProps = {
    maxColors: 20
  };
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [open, setOpen] = React.useState(false);
  const paletteIsFull = colors.length >= defaultProps.maxColors;

  /*******************
   *    FUNCTIONS    *
   *******************/

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // COLOR BOX
  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(() => {
      return arrayMove(colors, oldIndex, newIndex);
    });
  };

  const deleteColorBox = colorName => {
    setColors(colors.filter(color => {
      return color.name !== colorName;
    }));
  };

  // GUARDAR PALETA
  const savePalette = (paletteName) => {
    const newPalette = { 
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors
    };

    props.savePalette(newPalette);
    props.history.push("/");
  };

  /****************
   *    RENDER    *
   ****************/

  return (
    <div className={classes.root}>
      <PaletteFormNav
        history={props.history}
        open={open}
        setOpen={setOpen}
        classes={classes}
        palettes={props.palettes}
        savePalette={savePalette}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{paper: classes.drawerPaper}}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design your palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
          <Button variant="contained" color="primary"  onClick={addRandomColor} disabled={paletteIsFull} >Random Color</Button>
        </div>
        <ColorPickerForm addNewColor={addNewColor} colors={colors} paletteIsFull={paletteIsFull} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          axis="xy"
          colors={colors}
          deleteColorBox={deleteColorBox}
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}