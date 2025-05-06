import React from "react";
import { useLocation } from "react-router-dom";
import { tickets } from "../helper/data_Helper";

const UserDetails = () => {
  const { state } = useLocation();
  const scannedText = state?.scannedText || "No data";

  const UserTicket = tickets.find((res) => res.ticket_id === scannedText);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Details</h2>

        {UserTicket ? (
          <div className="text-left space-y-4 text-lg text-gray-800">
            <div>
              <span className="font-semibold text-gray-600">👤 Name:</span> {UserTicket.name}
            </div>
            <div>
              <span className="font-semibold text-gray-600">🎟️ Ticket ID:</span> {UserTicket.ticket_id}
            </div>
            <div>
              <span className="font-semibold text-gray-600">📅 Date:</span> {UserTicket.date}
            </div>
            <div>
              <span className="font-semibold text-gray-600">🛫 From:</span> {UserTicket.from}
            </div>
            <div>
              <span className="font-semibold text-gray-600">🛬 To:</span> {UserTicket.to}
            </div>

            {UserTicket.extra_luggage ? (
              <>
                <div>
                  <span className="font-semibold text-gray-600">💼 Extra Luggage:</span> {UserTicket.extra_luggage_weight}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">💰 Extra Luggage Price:</span> ₹{UserTicket.extra_luggage_price}
                </div>
              </>
            ) : (
              <div className="text-gray-500 italic">No extra luggage ... </div>
            )}
          </div>
        ) : (
          <div className="text-red-500 text-center text-xl font-medium">Ticket not found!</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
