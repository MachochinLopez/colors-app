import React from 'react';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import PaletteFormNav from './PaletteFormNav';
import useStyles, { drawerWidth } from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';
// Material UI
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
// Drag N Drop
import { arrayMove } from 'react-sortable-hoc';

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const defaultProps = {
    maxColors: 20
  };
  const [colors, setColors] = React.useState(seedColors[0].colors);
  const [open, setOpen] = React.useState(true);
  const paletteIsFull = colors.length >= defaultProps.maxColors;

  /*******************
   *    FUNCTIONS    *
   *******************/

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map(palette => palette.colors).flat();
    let rand, randomColor;
    let isDuplicateColor = true;
    while(isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(color => {
        return color.name === randomColor.name;
      });
    }
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
  const savePalette = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;

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
        drawerWidth={drawerWidth}
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
        <div className={classes.drawerContainer}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary" 
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary" 
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm addNewColor={addNewColor} colors={colors} paletteIsFull={paletteIsFull} />
        </div>
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