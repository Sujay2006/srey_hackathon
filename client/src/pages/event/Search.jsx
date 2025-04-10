import EventCard from '@/components/event/EventCard';
import { Input } from '@/components/ui/input';
import { getSearchResult, resetSearchResult } from '@/store/event-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResult, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    } else {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(resetSearchResult());
      }
  }, [keyword]);
  console.log(searchResult);
  const handleCardClick = (eventId) => {
    navigate(`/event/detail/${eventId}`);
  };
  
  return (
    <div className="mx-auto container md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
          <div className="w-full flex items-center">
                    <Input 
                    value = {keyword}
                    onChange={(event)=> setKeyword(event.target.value)}
                    name = 'keyword'
                    placeholder='Search Culture & Heritage....' 
                    className="py-6"/>
            </div>
        </div>
        {!searchResult.length ? (
                <h1 className="text-5xl font-extrabold">No result found!</h1>
            ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {searchResult.map((event) => (
                 <EventCard key={event._id} event={event} onClick={() => handleCardClick(event._id)} />
                ))}
          </div>
      
    </div>
  )
}

export default Search
