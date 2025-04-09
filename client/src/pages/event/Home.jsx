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
    navigate(`/event/detail/${eventId}`);
  };
  console.log(events);
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">All Culture & Heritage</h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading && events?.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} onClick={() => handleCardClick(event._id)} />
          ))
        ) : (
          <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
          Looks like your event space is still waiting for its first story! Whether it's a Travel, a celebration, or something exciting — go ahead and create your first event.
        </p>
        )}
      </div>
    </div>
  );
};

export default Home;
