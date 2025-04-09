import { Card, CardContent } from "@/components/ui/card";

const EventCard = ({ event, onClick }) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition">
      <CardContent className="p-4">
      {event.images?.[0] && (
          <img src={event.images[0]} alt="event" className="mt-2 w-full h-40 object-contain rounded-md" />
        )}
        <h2 className="text-lg font-semibold">{event.heading}</h2>
        <p className="text-sm text-muted-foreground">Location: {event.location}</p>
        <p className="line-clamp-2 mt-2">{event.paragraph}</p>
        
      </CardContent>
    </Card>
  );
};

export default EventCard;
