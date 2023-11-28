import { Card, Popconfirm, Row } from 'antd';
import React from 'react';
import './styles.css';
import Button from '../Button';

function Cards({income, expenses,currentBalance ,showExpenseModal, showIncomeModal, reset}) {

  const cancel = (e) => {
    console.log(e);
    console.log('Click on No');
};
  
  return (
    <div>
        <Row className='my-row'>
        <Card bordered={true} className="my-card">
            <h2>Current Balance</h2>
            <p>₹ {currentBalance}</p>
            <Popconfirm
                        title="Reset the Transaction"
                        description="Are you sure to reset the transactions?"
                        onConfirm={reset}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button text="Reset Balance" blue={true} onClick={reset}/>
                    </Popconfirm>
        </Card>
        <Card bordered={true} className="my-card">
            <h2>Total Income</h2>
            <p>₹ {income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}  />
              
           

        </Card>
        <Card bordered={true} className="my-card">
            <h2> Total Expenses</h2>
            <p>₹ {expenses}</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>

        </Row>
        
    </div>
  )
}

export default Cards