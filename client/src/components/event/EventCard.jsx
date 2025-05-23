import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Pin,
} from "lucide-react";

const EventCard = ({ event, onClick }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(null); // null | "like" | "dislike"

  useEffect(() => {
    if (event.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % event.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [event.images]);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(liked === "like" ? null : "like");
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setLiked(liked === "dislike" ? null : "dislike");
  };

  return (
    <Card
      onClick={onClick}
      className="relative cursor-pointer hover:shadow-lg transition rounded-2xl overflow-hidden"
    >
      {/* Pin icon if isCultureExtincting is true */}
      {event.isCultureExtincting && (
  <div className="absolute top-0 right-0 group">
    <div className="bg-yellow-200 text-yellow-800 rounded-full p-1 shadow-md">
      <Pin className="w-4 h-4" />
    </div>
    {/* Tooltip */}
    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10">
      This event is about an extincting culture
    </div>
  </div>
)}

      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between gap-2 capitalize text-lg text-muted-foreground">
            <span> {event.userId?.userName || "Unknown"}</span>
            <span>{event.location}</span>
          </div>
        </div>

        {event.images?.length > 0 && (
          <img
            src={event.images[currentImage]}
            alt="event"
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">{event.heading}</h2>
          </div>

          <p className="line-clamp-2 mt-3 text-sm text-gray-600">
            {event.paragraph}
          </p>

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
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
