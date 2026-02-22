import React, { useState, useEffect } from 'react';
import { Button } from '@/dev/button/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '../calendar/calendar';

const DatePicker: React.FC<{ onApply?: (date: Date) => void; initialDate?: Date }> = ({
  onApply,
  initialDate,
}) => {
  const now = new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate || now);
  const [hour, setHour] = useState((selectedDate.getHours() % 12 || 12).toString().padStart(2, '0'));
  const [minute, setMinute] = useState(selectedDate.getMinutes().toString().padStart(2, '0'));
  const [ampm, setAmPm] = useState(selectedDate.getHours() >= 12 ? 'PM' : 'AM');

  // Update selectedDate when month changes
  const handleMonthChange = (month: number) => {
    const updated = new Date(selectedDate);
    updated.setMonth(month);
    setSelectedDate(updateDateTime(updated, hour, minute, ampm));
  };

  // Update selectedDate when year changes
  const handleYearChange = (year: number) => {
    const updated = new Date(selectedDate);
    updated.setFullYear(year);
    setSelectedDate(updateDateTime(updated, hour, minute, ampm));
  };

  // Update selectedDate when day is clicked
  const handleDayClick = (day: number) => {
    const updated = new Date(selectedDate);
    updated.setDate(day);
    setSelectedDate(updateDateTime(updated, hour, minute, ampm));
  };

  // Time input handlers
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(e.target.value);
  };

  const handleAmPmChange = (val: 'AM' | 'PM') => {
    setAmPm(val);
  };

  // Helper to update date with time
  function updateDateTime(date: Date, h: string, m: string, am: string) {
    let hourNum = parseInt(h, 10);
    let minuteNum = parseInt(m, 10);

    if (isNaN(hourNum) || hourNum < 1) hourNum = 1;
    else if (hourNum > 12) hourNum = 12;

    if (isNaN(minuteNum) || minuteNum < 0) minuteNum = 0;
    else if (minuteNum > 59) minuteNum = 59;

    if (am === 'PM' && hourNum !== 12) hourNum += 12;
    if (am === 'AM' && hourNum === 12) hourNum = 0;

    const updatedDate = new Date(date);
    updatedDate.setHours(hourNum, minuteNum, 0, 0);
    return updatedDate;
  }

  // Sync selectedDate with time input changes
  useEffect(() => {
    setSelectedDate(updateDateTime(selectedDate, hour, minute, ampm));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, ampm]);

  // Today button resets all
  const handleToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setHour((now.getHours() % 12 || 12).toString().padStart(2, '0'));
    setMinute(now.getMinutes().toString().padStart(2, '0'));
    setAmPm(now.getHours() >= 12 ? 'PM' : 'AM');
  };

  // Apply button calls parent's callback
  const handleApply = () => {
    if (onApply) onApply(selectedDate);
  };

  return (
    <div className="bg-white p-5 rounded-xl w-80 shadow-lg space-y-4">
      <h2 className="text-sm text-gray-500 font-medium">Calendar</h2>

      <Calendar
        selectedDate={selectedDate}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        onDayClick={handleDayClick}
      />

      {/* Time Picker */}
      <div className="flex space-x-2 mt-3">
        <input
          type="number"
          className="w-12 px-2 py-1 border rounded text-center"
          value={hour}
          min={1}
          max={12}
          onChange={handleHourChange}
        />
        <span className="pt-1">:</span>
        <input
          type="number"
          className="w-12 px-2 py-1 border rounded text-center"
          value={minute}
          min={0}
          max={59}
          onChange={handleMinuteChange}
        />
        <div className="flex space-x-1">
          {['AM', 'PM'].map((val) => (
            <button
              key={val}
              className={`px-2 py-1 rounded ${
                ampm === val ? 'bg-blue-500 text-white' : 'border border-gray-300'
              }`}
              onClick={() => handleAmPmChange(val as 'AM' | 'PM')}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handleToday} variant="transparent">
          <CalendarIcon /> Today
        </Button>
        <Button rounded="full" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export {DatePicker};
