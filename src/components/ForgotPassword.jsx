import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import api from "../assets/api";

function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async () => {
    try {
      if (cooldown > 0) return;

      setLoading(true);
      setAlert("");

      const sekyoResponse = await api.get("/api/sekyo/");
      const matchedSekyo = sekyoResponse.data.find(
        (item) => item.phone_number === phoneNumber,
      );

      if (!matchedSekyo) {
        setAlert("Mobile number not found.");
        return;
      }

      await api.post(`/api/send-sekyo-sms/${phoneNumber}/`);

      setAlert("Password recovery SMS has been sent successfully.");
      setPhoneNumber("");
      setCooldown(30);
    } catch {
      setAlert("Failed to send SMS.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || cooldown > 0;

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="text-blue-600 mt-1 font-semibold text-sm hover:underline cursor-pointer"
      >
        Forgot Password
      </p>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>

            <p className="text-gray-500 mb-5">Enter your mobile number.</p>

            {alert && <div className="mb-4 text-sm font-medium">{alert}</div>}

            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09xxxxxxxxx"
              className="w-full border rounded-xl p-3 outline-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 border rounded-xl py-3 hover:bg-red-500 duration-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className="flex-1 bg-black hover:bg-white duration-300 hover:text-black cursor-pointer text-white rounded-xl py-3 disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : cooldown > 0
                    ? `Wait ${cooldown}s`
                    : "Send SMS"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ForgotPassword;
