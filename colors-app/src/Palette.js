import { Component } from 'react';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider from 'rc-slider';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => {
      const { name, hex } = color;
      return <ColorBox key={name} background={hex} name={name} />;
    });

    return (
      <div className="Palette">
        <div className="slider">
          <Slider 
            defaultValue={level}
            min={100}
            max={900}
            onAfterChange={this.changeLevel}
            step={100}
          />
        </div>
        {/* Navbar goes here */}
        <div className="Palette-colors">
          { colorBoxes }
        </div>
        {/* Footer */}
      </div>
    );
  }
}

export default Palette;