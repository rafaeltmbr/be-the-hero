import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {AppRegistry} from 'react-native';
import Routes from './src/routes';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Routes);
