/**
 * App component to render pages.
 */
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LogInPage from './Pages/LogIn/LogIn';
import LogOutPage from './Pages/LogOut/LogOut';
import ExpensePage from './Pages/Expense/Expense';
import './Asserts/FontAwesome';
import './App.scss';
// To overwrite the bootstrap class
import './Custom.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" component={LogInPage} exact />
          <Route path="/expense" component={ExpensePage} exact />
          <Route path="/logout" component={LogOutPage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
