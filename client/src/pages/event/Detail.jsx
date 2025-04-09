import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetail } from '@/store/event-slice';
import { format } from 'date-fns';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetail, isLoading } = useSelector((state) => state.event);

  const formatDate = (isoString) => {
    if (!isoString) return 'Invalid Date';
  
    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid Date';
  
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };
  
  useEffect(() => {
    if (id) dispatch(getEventDetail(id));
  }, [id]);

  if (isLoading || !eventDetail) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { heading, images, paragraph, createdAt } = eventDetail;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4 text-center">{heading}</h1>

      {/* Carousel */}
      {Array.isArray(images) && images.length > 0 && (
      <div className="w-full overflow-hidden rounded-xl shadow-md mb-6">
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Event image ${index + 1}`}
              className="w-full h-[300px] flex-shrink-0 snap-center object-contain"
            />
          ))}
        </div>
      </div>
    )}
      {/* Paragraph */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{paragraph}</p>

      {/* Timestamp */}
      <p className="text-sm text-gray-500 text-right">
        Created on: {formatDate(eventDetail?.createdAt)}
      </p>
    </div>
  );
}

export default Detail;
