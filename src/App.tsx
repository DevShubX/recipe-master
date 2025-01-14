import {BrowserRouter as Router,Route,Routes} from 'react-router'
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/details/:id' element={<DetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
