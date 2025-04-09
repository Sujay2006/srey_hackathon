import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetail } from '@/store/event-slice';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetail, isLoading } = useSelector((state) => state.event);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (id) dispatch(getEventDetail(id));
  }, [id]);

  useEffect(() => {
    if (eventDetail?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % eventDetail.images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [eventDetail?.images]);

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

  if (isLoading || !eventDetail) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const { heading, images, paragraph, createdAt } = eventDetail;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Heading */}
      <h1 className="text-3xl capitalize font-bold mb-4 text-center">{heading}</h1>

      {/* Auto Changing Images */}
      {Array.isArray(images) && images.length > 0 && (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md mb-6 h-[300px]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Event image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      )}

      {/* Paragraph */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{paragraph}</p>

      {/* Timestamp */}
      <p className="text-sm text-gray-500 text-right">
        Created on: {formatDate(createdAt)}
      </p>
    </div>
  );
}

export default Detail;
