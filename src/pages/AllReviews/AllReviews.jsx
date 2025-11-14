import React, { useEffect, useState } from 'react';
import useAxios from '../../hook/useAxios';
import ReviewCard from '../../components/ReviewCard';
import useAuth from '../../hook/useAuth';
import Spinner from '../../components/Spinner';

const AllReviews = () => {
    const axiosInstance = useAxios();
    const {loading}= useAuth()
    const [reviews, setReviews]=useState([]);
    // const [search, setSearch]=useState('')
    useEffect(()=>{ 
        axiosInstance.get(`/reviews`).then(data=>setReviews(data.data))
    },[axiosInstance])

    const handleSearch=(e)=>{
        e.preventDefault();
        const search_text = e.target.search.value;
        const search = search_text
        axiosInstance.get(`reviews?foodName=${search}`).then(data=>setReviews(data.data))
        
        
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <div className='max-w-10/12 mx-auto pt-10'>
            <h1 className='text-4xl font-bold text-center text-primary mb-10'>All Reviews</h1>
            <form onSubmit={handleSearch} className='my-5 flex justify-center'>
                <input type="text" name='search' placeholder='Search By food Name' className='outline-2 outline-primary px-4 py-2'/>
                <input type="submit" value="Search" className='bg-primary text-white outline-2 outline-primary font-bold px-4' />
            </form>
            <div className='grid grid-cols-3 gap-5'>
                
                {
                    reviews.length<1?'':reviews.map(review=> <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default AllReviews;