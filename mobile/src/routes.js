import { createAppContainer, createSwitchNavigator  } from 'react-navigation'; // switchNavigator é um tipo de navegação continua em que quando o usuario vai para a proxima tela a anterior "deixa de existir"

import Login from './pages/Login';
import Book from './pages/Book';
import List from './pages/List';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
    })
);

export default Routes;