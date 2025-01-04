import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { toast } from "sonner";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleSelectEvent = (event) => {
    toast.success(`Event: ${event.title}`);
  };

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">My Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        onSelectEvent={handleSelectEvent}
        views={['month', 'week', 'day']}
      />
    </div>
  );
};

export default CalendarComponent;