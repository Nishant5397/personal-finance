import { Line, Pie } from '@ant-design/charts';
import React, { useState } from 'react';
import './styles.css'
import { Select} from "antd";



function Charts({sortedTransactions}) {
    // const data = sortedTransactions.map((item)=>{
    //     return{ date:item.date, amount: item.amount}
    // }) ;

    // const pieChartData = () => {

    //     const spendingData = {};

    //     transactions.forEach((transaction) => {
    //       const tag = transaction.tag;
    //         if (spendingData[tag]) {
    //           spendingData[tag] += transaction.amount;
    //         } else {
    //           spendingData[tag] = transaction.amount;
    //         }
    //       });
    //     const spendingDataArray = Object.keys(spendingData).map((key) => ({
    //       category: key,
    //       value: spendingData[key],
    //     }));
    
    //     return {spendingDataArray };
    //   };
    
    // const {spendingDataArray} = pieChartData();

    const { Option } = Select;
    const [pieType,setPieType]=useState("expense");
  
    let finalAmount=0;
    const data = sortedTransactions.map((item) => {
      if(item.type==="income"){
          finalAmount+=item.amount;
      }else if(item.type==="expense"){
        finalAmount-=item.amount;
      }
      return { date: item.date, amount: finalAmount };
    });
  
    const pieData = sortedTransactions.filter((transaction) => {
      
      if (transaction.type === pieType) {
        return { tag: transaction.tag, amount: transaction.amount };
      }
    });
  
    let finalSpendings = pieData.reduce((acc, obj) => {
      let key = obj.tag;
      if(!acc[key]) {
        acc[key] = { tag: obj.tag, amount: obj.amount }; // create a new object with the same properties
      } else {
        acc[key].amount += obj.amount;
      }
      return acc;
    }, {});

    const config = {
        data: data,
        autoFit : true,
        xField: "date",
        yField: "amount",
      };
    
      const spendingConfig = {
        data: Object.values(finalSpendings),
        angleField: "amount",
        colorField: "tag", 
      };
      let chart;
      let pieChart;
  return (
    <div className='charts-wrapper'>
        <div className='line-chart'>
            <h2 style={{marginTop:0}}>Your Transactions</h2>
            <Line
            {...config}
            onReady={(chartInstance)=>(chart = chartInstance)}
            />
        </div>
        <div className='pie-chart'>
        <div className="pie-filter">
          <h2>Your Spendings & Earnings</h2>
          <Select
              className="select-input"
              onChange={(value) => setPieType(value)}
              value={pieType}
              placeholder="Filter Type"
              allowClear
              >
              <Option value="income">Income</Option>
              <Option value="expense">Expense</Option>
          </Select>
        </div>
        
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
        </div>
        
    </div>
  )
}

export default Charts;