import React from 'react';
import item_not_found from '../assets/App-Error.png'

const NotFound = () => {
    return (
        <div className='mt-20'>
            <div className=''>
                <img className='mx-auto' src={item_not_found} alt="item not found error message" />
            </div>
            <h3 className='text-5xl font-bold text-center text-primary mt-10'>No Review Has Found.</h3>
        </div>
    );
};

export default NotFound;