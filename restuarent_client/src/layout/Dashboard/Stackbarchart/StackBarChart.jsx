import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import OrderData from '../../../CustomHooks/OrderData/OrderData';
import Loader from '../../../Componets/Loader';
import useMostSoldItem from '../../../CustomHooks/GetMostSoldItem';


const StackBarChart = ({data}) => {
  const [mostSoldItem]= useMostSoldItem()
  const { order,isLoading } =OrderData();
  if(isLoading){
    return <Loader/>
  }

  // Prepare data for the stacked bar chart
  const categoryData = {}; // Example: { "Category1": 100, "Category2": 200, ... }
  data.forEach(orderItem => {
    orderItem.foodInfo.forEach(item => {
      const category = item.category || "Uncategorized";
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += item.price * item.quantity;
    });
  });

  const categoryChartData = Object.entries(categoryData).map(([category, totalPrice]) => ({
    foodCategory: category,
    totalPrice: totalPrice
  }));


  console.log(categoryChartData);
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={categoryChartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="foodCategory" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalPrice" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackBarChart;
