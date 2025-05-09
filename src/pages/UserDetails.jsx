import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleUserData } from "../config/api_helper";
import _ from "lodash";
import Icon_Helper from "../helper/Icon_Helper";
import { Spin } from "antd";


const UserDetails = () => {
  const { state } = useLocation();
  const id = state?.scannedText || "No data";
  const [userData, setUserData] = useState(null);
  const [loading, setloading] = useState(false);
  const handLuggage = "7";
  const checkingWeight = "40";
  const Kg_Price = 100;

  const [isChecked, setIsChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const fetchUserDetails = async (userId) => {
    try {
      setloading(true);
      const response = await getSingleUserData(userId);
      const user = _.get(response, "data.data.[0].user", {});
      if (user) {
        setUserData(user);
      } else {
        console.warn("User not found in API response.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (id !== "No data") {
      fetchUserDetails(id);
    }
  }, [id]);

  const handleCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecked(true);
      setIsChecking(false);
    }, 1000); // Simulate a 1 second "processing"
  };

  const renderInput = (IconComponent, label, value) => (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <IconComponent className="w-5 h-5 text-indigo-600" />
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-500">{label}</label>
        <input type="text" readOnly className="text-gray-800 font-medium bg-transparent outline-none" value={value} />
      </div>
    </div>
  );

  return (
    <Spin spinning={loading} className="bg-white">
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-start justify-center p-8 gap-8 bg-gradient-to-br from-gray-100 to-gray-200">
        {/* User Details */}
        <div className="lg:w-1/2 w-full bg-white border border-gray-300 shadow-xl p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">Passenger Information</h2>

          {userData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput(Icon_Helper.User_Icon, "Name", userData.name || "N/A")}
              {renderInput(Icon_Helper.Badge_Icon, "Passport ID", userData.passportId || "N/A")}
              {renderInput(Icon_Helper.Calendar_Icon, "DOB", userData.dataofbirth || "N/A")}
              {renderInput(Icon_Helper.CalendarCheck_Icon, "Expiry", userData.dataofexpiry || "N/A")}
              {renderInput(Icon_Helper.CalendarClock_Icon, "Issued", userData.dateofissue || "N/A")}
              {renderInput(Icon_Helper.Globe_Icon, "Nationality", userData.Nationality || "N/A")}
              {renderInput(Icon_Helper.Mail_Icon, "Email", userData.email || "N/A")}
              {renderInput(Icon_Helper.PlaneTakeoff_Icon, "From", userData.from || "N/A")}
              {renderInput(Icon_Helper.PlaneLanding_Icon, "To", userData.to || userData.travel_to || "N/A")}
              {renderInput(Icon_Helper.Users_Icon, "Name of Others", userData.nameofothers || "N/A")}
              {renderInput(Icon_Helper.PackageSearch_Icon, "Barcode ID", userData.barcodeId || "N/A")}
              {renderInput(Icon_Helper.ClipboardList_Icon, "Booking Serial", userData.booking_serial || "N/A")}
              {renderInput(Icon_Helper.CalendarDays_Icon, "Date", userData.date || "N/A")}
              {renderInput(Icon_Helper.Weight_Icon, "Pre Weight", userData.preWeight || 0)}
            </div>
          ) : (
            <div className="text-red-500 text-center font-semibold text-lg mt-4">⚠️ User data not available</div>
          )}
        </div>

        {/* Luggage Checker */}
        <div className="lg:w-1/2 w-full space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Luggage Weight Checker</h2>

            <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
              <p>
                Minimum Weight : Total ( <span className="text-green-500 font-bold">22 Kg Free</span> )
              </p>
              <p>
                Maximum Allowed : <span className="text-red-500 font-bold">65 Kg</span>
              </p>
            </div>

            <div className="flex flex-row items-center justify-between text-sm text-gray-600 font-medium mb-6">
              <p>
                Hand Luggage : <span className="text-indigo-600 font-bold">7 Kg Free</span>
              </p>
              <p>
                Primary Luggage : <span className="text-indigo-600 font-bold">15 Kg Free</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                {renderInput(Icon_Helper.Weight_Icon, "Pre Weight", userData?.preWeight || 0)}
                <p className="text-center text-gray-500 text-xs mt-1">Booked Weight</p>
              </div>
              <div>
                {renderInput(Icon_Helper.Weight_Icon, "Checked Weight", checkingWeight)}
                <p className="text-center text-gray-500 text-xs mt-1">Primary Luggage Weight</p>
              </div>
              <div>
                {renderInput(Icon_Helper.Weight_Icon, "Hand Luggage ", handLuggage)}
                <p className="text-center text-gray-500 text-xs mt-1">Hand Luggage Weight</p>
              </div>
            </div>

            {!isChecked && (
              <div>
                <button onClick={handleCheck} className="w-full h-auto mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded text-white font-semibold shadow-md" disabled={isChecking}>
                  {isChecking ? "Checking..." : "Check"}
                </button>
              </div>
            )}

            {isChecked && (
              <div className="mt-6 text-center">
                {userData?.preWeight !== undefined && userData?.preWeight !== null ? (
                  Number(userData.preWeight) >= Number(checkingWeight) ? (
                    <div className="text-green-600 font-semibold text-lg">✅ Ready to Travel</div>
                  ) : (
                    <div>
                      <div className="flex flex-row items-center justify-between">
                        <div className="text-red-600 font-bold text-lg">Extra Weight: {Math.abs(Number(checkingWeight) - Number(userData.preWeight))} Kg</div>
                        <div className="text-indigo-700 font-bold text-lg">Total Price: ₹{Math.abs(Number(checkingWeight) - Number(userData.preWeight)) * Kg_Price}</div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded text-white font-semibold shadow-md">💳 Pay Now</button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-gray-500 font-medium">⚠️ Invalid weight data</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default UserDetails;
