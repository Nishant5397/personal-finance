import React, { useState } from 'react';
import { toast } from "react-toastify";
import { Input, Table, Select, Radio } from "antd";
import searchImg from '../../assets/search.svg';
import './styles.css';
import { parse, unparse } from 'papaparse';
const { Option } = Select;

function TransactionsTable({transactions, fetchTransactions, addTransaction}) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState('');
    const [sortKey, setSortKey] = useState('');

    function importFromCsv(event) {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {
              // Now results.data is an array of objects representing your CSV rows
              for (const transaction of results.data) {
                // Write each transaction to Firebase, you can use the addTransaction function here
                console.log("Transactions", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseInt(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }
            },
          });
          toast.success("All Transactions Added");
          fetchTransactions();
          event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
      }
    
    function exportToCsv() {
        const csv = unparse( 
        {fields: ["name", "type", "date", "amount", "tag"],
        data: transactions});
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
      ];
    let filteredTransactions = transactions.filter((item)=>
      item.name.toLowerCase().includes(search.toLowerCase()) 
      && item.type.includes(typeFilter));

    let sortedTransactions = filteredTransactions.sort((a, b) => {
        if (sortKey === "date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
          return a.amount - b.amount;
        } else {
          return 0;
        }
      });

  return (
    <div className='table-container'>
    <div className='search-box'>
        <div className="input-flex">
          <img src={searchImg} width="16" />
          <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='search by name'
            />
        </div>
       
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
        </div>
        <div className="my-table" >
        <h2>My Transactions</h2>
        <Select
          className="select-sort"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
          placeholder="Filter"
          allowClear
        >
          <Option value="">No Sort</Option>
          <Option value="date">Sort by Date</Option>
          <Option value="amount">Sort by Amount</Option>
        </Select>
        <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" 
                onClick={exportToCsv}
            >
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedTransactions} columns={columns} />; 
    </div>
  )
}

export default TransactionsTable