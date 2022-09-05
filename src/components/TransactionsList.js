import { useSelector } from "react-redux";
 

const TransactionsList = () => {
    const transactions = useSelector(state => state.transactions);
    if (!transactions.length) {
      return <div className='empty_list'>пусто</div> ;
    }
    return (
      <ul>
        {transactions.map(transaction => <li className="transaction_item" key={transaction.id}>
        <div>  { transaction.date}  </div>
            <div> {transaction.name} </div>
           <div> <span className={transaction.status == 2 ? 'gain': 'expense'}> {  transaction.status == 2 ? '+' : '-' }{ transaction.sum}</span> руб. </div>
          
            </li> )}
      </ul>
    )
    }

    export default TransactionsList;