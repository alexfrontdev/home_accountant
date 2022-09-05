import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionsList';
 

  
function App() {
  
  const balance = useSelector(state => state.balance);
     
  return (
    <div className="App">
      <div className="header">
        <div className="appname">Домашний бухгалтер</div>
         <div className="balance">Ваш текущий баланс : <div className={balance <= 0 ? 'expense':'gain'}> {balance}</div> руб.</div>
      </div>
 
    <TransactionForm/>

    <div className="transactions_list">
    <TransactionsList/>
    </div>

    </div>
  );
}

export default App;
