import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddEventSheet from './../../components/event/AddEventSheet';
import EventCard from './../../components/event/EventCard';
import { getEventsByUserId } from './../../store/event-slice/index';

const User = () => {
  const { user } = useSelector((state) => state.auth);
  const { userEvents, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user?.id) {
      dispatch(getEventsByUserId(user.id));
    }
  }, [user,dispatch]);

  const handleCardClick = (eventId) => {
    navigate(`/event/detail/${eventId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
        <AddEventSheet />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoading && userEvents.length > 0 ? (
          userEvents.map((event) => (
            <EventCard key={event._id} event={event} onClick={() => handleCardClick(event._id)} />
          ))
        ) : (
          <p className="text-gray-600 text-lg mb-6 ">
          Looks like your event space is still waiting for its first story! Whether it's a Travel, a celebration, or something exciting — go ahead and create your first event.
        </p>
        )}
      </div>
    </div>
  );
};

export default User;
