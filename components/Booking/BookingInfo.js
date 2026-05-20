"use client";
import { LockOpen } from "lucide-react";
import { Lock } from "lucide-react";
import { CircleAlertIcon } from "lucide-react";

const BookingInfo = ({ tutor }) => {
  return (
    <div className="bg-base-100">
      {tutor.totalSlot > 0 ? (
        <div className="flex items-center justify-center gap-2 p-2 bg-warning m-2 rounded-lg text-sm">
          <CircleAlertIcon /> {tutor.totalSlot} Slots Remaining
          <span className="text-error">High Demand</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 p-2 bg-error m-2 rounded-lg text-sm">
          <CircleAlertIcon /> No Slots Available
        </div>
      )}
      {new Date(tutor.sessionStartDate) < new Date() ? (
        <div className="flex items-center justify-center gap-2 p-2 bg-success m-2 rounded-lg text-sm">
          <LockOpen /> Booking is open for this tutor
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 p-2 bg-info m-2 rounded-lg text-sm">
          <Lock /> Booking is not available yet for this tutor
        </div>
      )}
    </div>
  );
};

export default BookingInfo;
