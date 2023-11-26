import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Index'
import Cards from '../components/Cards'
import { Modal } from 'antd';
import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";
import TransactionsTable from '../components/TransactionsTable';

function Dashboard() {
const [user] = useAuthState(auth);
const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(false);
const [currentBalance, setCurrentBalance] = useState(0);
const [income, setIncome] = useState(0);
const [expenses, setExpenses] = useState(0);

const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish= (values,type)=>{
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  }
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        toast.success("Transaction Added!");
      }
      let newArr = [...transactions];
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }
  useEffect(()=>{
    fetchTransactions();
  },[]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };
  const arrayData = Object.values(transactions);
  return (
    <div>
      <Header/>
      {loading?<p>Loading...</p> : 
      <>
        <Cards
        income ={income}
        expenses = {expenses}
        currentBalance = {currentBalance}
        showExpenseModal = {showExpenseModal}
        showIncomeModal = {showIncomeModal}
        // handleExpenseCancel = {handleExpenseCancel}
        // handleIncomeCancel = {handleIncomeCancel}
        />
        <AddExpense 
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}/>
        <AddIncome 
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}/>

        <TransactionsTable transactions={transactions}/>
      </>
      
      }
    </div>
  )
}

export default Dashboard