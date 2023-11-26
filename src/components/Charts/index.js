import { Line, Pie } from '@ant-design/charts';
import React from 'react';
import './styles.css'
import { Card, Row } from 'antd';
import moment from 'moment';



function Charts({transactions,sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return{ date:item.date, amount: item.amount}
    }) ;

    const pieChartData = () => {

        const spendingData = {};

        transactions.forEach((transaction) => {
          const tag = transaction.tag;
            if (spendingData[tag]) {
              spendingData[tag] += transaction.amount;
            } else {
              spendingData[tag] = transaction.amount;
            }
          });
        const spendingDataArray = Object.keys(spendingData).map((key) => ({
          category: key,
          value: spendingData[key],
        }));
    
        return {spendingDataArray };
      };
    
    const {spendingDataArray} = pieChartData();

    const config = {
        data: data,
        autoFit : true,
        xField: "date",
        yField: "amount",
      };
    
      const spendingConfig = {
        data: spendingDataArray,
        angleField: "value",
        colorField: "category",
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
            <h2>Your Spendings</h2>
            <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (pieChart = chartInstance)}
            />
        </div>
        
    </div>
  )
}

export default Charts