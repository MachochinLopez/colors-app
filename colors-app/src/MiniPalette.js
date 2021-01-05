import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'

function MiniPalette(props) {
  const { classes, colors, emoji, handleClick, id, paletteName } = props;
  const miniColorBoxes = colors.map(color => {
    return (
    <div 
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />);
  });

  const deletePalette = (e) => {
    e.stopPropagation();
    props.openDialog(id);
  };
  
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete}>
      <DeleteIcon
        className={classes.deleteIcon}
        onClick={deletePalette}
      />
      </div>
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <div className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </div>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);
