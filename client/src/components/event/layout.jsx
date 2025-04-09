import { Outlet } from "react-router-dom";
import EventHeader from "./header";

function EventLayout() {
    return(
        <div className="flex flex-col bg-white overflow-hidden">
            {/* common header  */}
            <EventHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>
        </div>
    )
}

export default EventLayout;