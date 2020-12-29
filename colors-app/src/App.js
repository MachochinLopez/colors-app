import Palette from './Palette';
import seedColors from './seedColors';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';

const findPalette = id => {
  return seedColors.find(palette => {
    return palette.id === id;
  });
};

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>PALETTE LIST</h1>} />
      <Route 
        exact
        path="/palette/:id"
        render={routeProps => { 
          const { id } = routeProps.match.params;
          return <Palette palette={ generatePalette( findPalette(id) ) } />}
        } 
      />
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
