import React from 'react';
import error_404 from '../assets/error-404.png'

const Error404 = () => {
    return (
        <div className='pt-20'>
                    <div className=''>
                        <img className='mx-auto' src={error_404} alt="item not found error message" />
                    </div>
                    <h3 className='text-5xl font-bold text-center text-purple-500 mt-10'>Page not Found and unauthorized access.</h3>
                </div>
    );
};

export default Error404;