import { Provider } from 'react-redux';
import Body from './components/Body';
import aapStore from './utils/appStore';

function App() {
  return (
    <Provider store={aapStore}>
      <Body/>
    </Provider>
    
  );
}

export default App;
