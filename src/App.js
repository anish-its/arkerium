import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Main/Dashboard/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Profile from './components/Main/Profile/Profile';
import Pyp from './components/Main/Packages/Pyp/Pyp';
import Liqpool from './components/Main/Liqpool/Liqpool';
import Transactions from './components/Main/Finance/Transactions/Transactions';
import Account_Statement from './components/Main/Finance/Account_Statement/Account_Statement';
import Deposit from './components/Main/Finance/Deposit/Deposit';
import Withdraw from './components/Main/Finance/Withdraw/Withdraw';
import Two_Team from './components/Main/Network/Two_Team/Two_Team';
import Direct_Referrals from './components/Main/Network/Direct_Referrals/Direct_Referrals';
import Team_View from './components/Main/Network/Team_View/Team_View';
import Unilevel_Tree from './components/Main/Network/Unilevel_Tree/Unilevel_Tree';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/account_statement' element={<Account_Statement/>}/>
        <Route path='/deposit' element={<Deposit/>}/>
        <Route path='/withdraw' element={<Withdraw/>}/>
        <Route path='/twoteam' element={<Two_Team/>}/>
        <Route path='/direct_referrals' element={<Direct_Referrals/>}/>
        <Route path='/team_view' element={<Team_View/>}/>
        <Route path='/unilevel_tree' element={<Unilevel_Tree/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/pyp' element={<Pyp/>}/>
        <Route path='/liqpool' element={<Liqpool/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
