import { createStackNavigator, createAppContainer } from 'react-navigation';
import DataScreen from './screens/dataScreen.js';
import SearchScreen from './screens/searchScreen.js';

const MainNavigator = createStackNavigator({
  Home: { screen: SearchScreen },
  Data: { screen: DataScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
