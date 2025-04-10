import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from '@/hooks/use-toast'
import { getEventsByUserId, uploadEvent } from './../../store/event-slice/index';

const AddEventSheet = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {toast} = useToast();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    heading: "",
    paragraph: "",
    location: "",
    images: null,
    isCultureExtincting: false, 
  });
  const [exting, setExting] = useState(false);

  const resetForm = () => {
    setFormData({
      heading: "",
      paragraph: "",
      location: "",
      images: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, formData,"user");
    

    const data = new FormData();
    data.append("heading", formData.heading);
    data.append("paragraph", formData.paragraph);
    data.append("location", formData.location);
    data.append("userId", user.id);
    data.append("isCultureExtincting", formData.isCultureExtincting);
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }
    }

    try {
      await dispatch(uploadEvent(data)).unwrap().then((data)=>{
        setOpen(false);
        resetForm();
      });
      dispatch(getEventsByUserId(user.id));
      toast({ title: "Event Added!" });
    } catch (error) {
      toast({ title: "Failed to add event", description: error.message, variant: "destructive" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add New Event</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto ">
        <SheetHeader>
          <SheetTitle>Add Event</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div>
            <Label>Heading</Label>
            <Input
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Paragraph</Label>
            <Textarea
              value={formData.paragraph}
              onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Images</Label>
            <Input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, images: e.target.files })}
              accept="image/*"
            />
          </div>
          <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCultureExtincting"
            checked={formData.isCultureExtincting}
            onChange={(e) => {
              setFormData({ ...formData, isCultureExtincting: e.target.checked });
              setExting(!exting);
            }}
            
          />
          <label htmlFor="isCultureExtincting" className="text-sm">
            Is the culture & heritage extinguishing?
          </label>
        </div>
        {exting && (
          <div>
            <Label>Upload Supporting Document</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              // onChange={(e) =>
              //   setFormData({ ...formData, document: e.target.files[0] })
              // }
            />
          </div>
        )}
          <Button type="submit">Submit</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddEventSheet;
