import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetail } from '@/store/event-slice';
import { Flag, ThumbsDown, ThumbsDownIcon, ThumbsUp, ThumbsUpIcon } from 'lucide-react';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetail, isLoading } = useSelector((state) => state.event);
  const [liked, setLiked] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [reported, setReported] = useState(false);
  const handleReport = () => {
    setReported(!reported);
  };

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
  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(liked === "like" ? null : "like");
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setLiked(liked === "dislike" ? null : "dislike");
  };
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
      <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                liked === "like" ? "text-green-600" : "text-gray-500"
              } hover:scale-105 transition`}
            >
              {liked === "like" ? (
                <ThumbsUpIcon className="h-4 w-4 fill-green-600" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 text-sm ${
                liked === "dislike" ? "text-red-600" : "text-gray-500"
              } hover:scale-105 transition`}
            >
              {liked === "dislike" ? (
                <ThumbsDownIcon className="h-4 w-4 fill-red-600" />
              ) : (
                <ThumbsDown className="h-4 w-4" />
              )}
            </button>
          </div>
        <p className="text-sm text-gray-500 text-right">
          Created on: {formatDate(createdAt)}
        </p>
        <button onClick={handleReport} className="hover:scale-105 transition">
          <Flag
            className={`h-4 w-4 ${
              reported ? "fill-red-600 text-red-600" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      
    </div>
  );
}

export default Detail;
