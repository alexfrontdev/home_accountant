import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addSumAction,subtractSumAction,addTransactionAction} from '../store/actionCreators.js';

const TransactionForm = () => {
 

  const sum_regexp = /^[0-9]+$/;

  const balance = useSelector(state => state.balance);
  const dispatch = useDispatch();
  const [transactionName,setTransactionName] = useState('');
  const [transactionSum,setTransactionSum]  = useState('');
  const [transactionStatus,setTransactionStatus] = useState('');
  const [nameDirty,setNameDirty] = useState(false);
  const [sumDirty,setSumDirty] = useState(false);
  const [selectDirty,setSelectDirty] = useState(false);
  const [nameError,setNameError] = useState('введите название');
  const [sumError,setSumError] = useState('введите корректное значение');
  const [selectError,setSelectError] = useState('выберите тип транзакции');
  
  
  
  const date = new Date();

  const addTransaсtion = () => {
 
    const checkSumInput = sum_regexp.test(transactionSum);
 
    if ((transactionStatus == 1 || transactionStatus == 2) && transactionName && checkSumInput   ) {
        if (transactionStatus == 1) {
            const newBalance = balance - (+transactionSum);
             
          dispatch( subtractSumAction(newBalance)  )
        }
        if (transactionStatus == 2) {
            
            const newBalance = balance + (+transactionSum); 
          dispatch( addSumAction(newBalance));
        }
        
        dispatch(
            addTransactionAction(
                    {
                    id: Date.now(),
                    name: transactionName,
                    sum: transactionSum,
                    status: +transactionStatus,
                    date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} `,
                    }
            )
             
          );
          setTransactionName('');
          setTransactionSum('');
    }
    if (!transactionName) {
        setNameDirty(true);
    }
    if (!transactionSum || !checkSumInput) {
        setSumDirty(true);
    }
   
    if (!transactionStatus) {
        setSelectDirty(true);
    }
 
  } 
  
  const nameHandler = e => {
    
      setTransactionName(e.target.value);
      
        setNameDirty(false);
    }
  const  sumHandler = e => {
    const checkSumInput = sum_regexp.test(transactionSum);
        setTransactionSum(e.target.value)
        if (checkSumInput) {
            setSumDirty(false);
        }
  } 
  const typeHandler = e => {
      
        setTransactionStatus(e.target.value);
     setSelectDirty(false);
   
  }
  return (
    <div className="transaction">
        <div>
        
        <input   name="transaction_name"   className='transaction_name' type="text" value={transactionName} placeholder="Статья доходов/расходов" onChange={ nameHandler } />
        <label htmlFor="transaction_name">
        {(nameDirty && nameError) && <div style={{color: 'red',fontSize:'11px'}}>{nameError}</div> }
        </label>
        </div>
       
       <div>
      
        <input  name="transaction_sum" type="text" className='transaction_sum'   placeholder="цифра в рублях" value={transactionSum} onChange={ sumHandler } />
        {(sumDirty && sumError) && <div style={{color: 'red',fontSize:'11px'}}>{sumError}</div> }
       </div>
      
      <div>
            <select  name="transaction_type" className='transaction_type'  id="" value={transactionStatus} onChange={ typeHandler}>
          <option value=""  disabled>выбрать тип</option>
          <option value="1">расход</option>  
          <option value="2">доход</option>  
        </select>

        <label htmlFor="transaction_type">{(selectDirty && selectError) && <div style={{color: 'red',fontSize:'11px'}}>{selectError}</div> }</label>
       
      </div>
        
        <button onClick={ addTransaсtion } className='transaction_add'>добавить</button>
        
    </div>
  )
}

export default TransactionForm