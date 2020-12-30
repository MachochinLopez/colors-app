import { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColorFormat = this.changeColorFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeColorFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { classes } = this.props;
    const { level, format } = this.state;
    const paletteId = this.props.palette.id;
    const colorBoxes = colors[level].map(color => {
      const { name, id } = color;
      return <ColorBox
        key={id}
        background={color[format]}
        name={name}
        showingFullPalette
        id={id}
        paletteId={paletteId}
        moreUrl={`/palette/${paletteId}/${id}`}
      />;
    });

    return (
      <div className={classes.Palette}>
        <Navbar
          showingSlider
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeColorFormat}
        />
        <div className={classes.colors}>
          { colorBoxes }
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);