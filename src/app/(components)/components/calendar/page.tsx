"use client";
import { Calendar } from "@/dev/calendar/calendar";
import { useState } from "react";

export default function CalendarPage() {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now);

  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow space-y-4">
      <h1 className="text-2xl font-bold">Calendar Component</h1>
      <div className="border border-gray-300 p-2 rounded-lg w-full">
        <Calendar
          selectedDate={selectedDate}
          onMonthChange={() => {}}
          onYearChange={() => {}}
          onDayClick={(date) => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date))}
        />
      </div>
    </div>
  );
}
