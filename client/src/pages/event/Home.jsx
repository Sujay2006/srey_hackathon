import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from './../../components/event/EventCard';
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "@/store/event-slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };
  console.log(events);
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">All Events</h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading && events?.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} onClick={() => handleCardClick(event._id)} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
