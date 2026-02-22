import React from "react";

interface CalendarProps {
  selectedDate: Date;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onDayClick: (day: number) => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 10 }, (_, i) => 2023 - i);

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onMonthChange,
  onYearChange,
  onDayClick,
}) => {
  const [monthDropdown, setMonthDropdown] = React.useState(false);
  const [yearDropdown, setYearDropdown] = React.useState(false);

  const daysInMonth = getDaysInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear()
  );

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  // Adjust so Monday = 0, Sunday = 6
  const paddingDays = (firstDayOfMonth + 6) % 7;

  return (
    <div>
      {/* Month / Year Picker */}
      <div className="flex items-center justify-start space-x-4 text-lg font-bold">
        {/* Month dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1"
            onClick={() => setMonthDropdown(!monthDropdown)}
          >
            {months[selectedDate.getMonth()]} ▼
          </button>
          {monthDropdown && (
            <ul className="absolute z-10 bg-white border rounded shadow w-32 max-h-48 overflow-y-auto">
              {months.map((m, idx) => (
                <li
                  key={m}
                  className={`p-2 hover:bg-blue-100 cursor-pointer ${
                    idx === selectedDate.getMonth()
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    onMonthChange(idx);
                    setMonthDropdown(false);
                  }}
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1"
            onClick={() => setYearDropdown(!yearDropdown)}
          >
            {selectedDate.getFullYear()} ▼
          </button>
          {yearDropdown && (
            <ul className="absolute z-10 bg-white border rounded shadow w-24 max-h-48 overflow-y-auto">
              {years.map((y) => (
                <li
                  key={y}
                  className={`p-2 hover:bg-blue-100 cursor-pointer ${
                    y === selectedDate.getFullYear()
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    onYearChange(y);
                    setYearDropdown(false);
                  }}
                >
                  {y}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mt-3">
        <div className="col-span-7 grid grid-cols-7 bg-gray-100 rounded px-2 py-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="font-medium text-center text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Padding days */}
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => onDayClick(day)}
              className={`w-8 h-8 rounded-full ${
                day === selectedDate.getDate()
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
