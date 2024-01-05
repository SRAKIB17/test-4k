import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderTab from './OrderTab/OrderTab';
import MenuData from '../../CustomHooks/MenuData/MenuData';
import useCategory from '../../CustomHooks/GetCategories';

const MenuItem = () => {
  const { menu, isLoading } = MenuData();
  const [allCategories, isCategoryLoading] = useCategory()
  let [items, setItems] = useState([])

  if (isLoading || isCategoryLoading) {
    return <div className=' flex justify-center items-center h-screen'>
      <span className="loading loading-spinner loading-lg text-center mx-auto"></span>
    </div>;
  }




  const filterCategory = allCategories?.filter(category => category.status !== 'close')


  // console.log(menu);

  

  const handleCategory = (category) => {
    items = menu?.filter(item => (item.category).toLowerCase() === category?.toLowerCase());
    setItems(items);

  }


  return (
    <div className="mx-auto w-full">

      <div className=' '>
        <Tabs>
          <TabList className="flex flex-wrap shadow-2xl w-[100%] font-serif rounded-full bg-gray-300 rounded-lg p-2 justify-between">
            <Tab className="py-2 px-4 cursor-pointer transition-colors rounded-2xl hover:bg-gray-500 uppercase">
              All

            </Tab>
            {
              filterCategory?.map((category, index) =>

                <Tab key={index} onClick={() => handleCategory(category.category_name)} className="py-2 px-4 cursor-pointer transition-colors rounded-2xl hover:bg-gray-500 uppercase">
                  {category?.category_name}

                </Tab>)
            }


          </TabList>


          <TabPanel >
            <OrderTab items={menu}></OrderTab>
          </TabPanel>
          {
            filterCategory.map((category, index) =>
              <TabPanel key={index} >
                <OrderTab items={items}></OrderTab>
              </TabPanel>)
          }


        </Tabs>
      </div>


    </div>
  );
};

export default MenuItem;
