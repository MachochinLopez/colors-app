import { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css';

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
        <Navbar level={level} changeLevel={this.changeLevel} />
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