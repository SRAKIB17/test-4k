import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
const Loader = () => {
      return (
            <div className='flex justify-center items-center h-[300px]'>
                  <ScaleLoader color="#36d7b7" />
            </div>
      );
};

export default Loader;