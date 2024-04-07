"use client";
import React, { useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [formData, setFormData] = useState({
    wallet_address: wallet.publicKey?.toBase58,
    street_address: "",
    notes: "",
    twitter: "",
    discord: "",
    phone_number: "",
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://budgetblock-a59f6a9a244d.herokuapp.com/auth/register`,
        formData
      );
      console.log(response.data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="h-screen">
      <form
        className="flex flex-col text-black pt-10 w-[33vw] mx-auto gap-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="street_address"
          value={formData.street_address}
          onChange={handleChange}
          placeholder="Street Address"
          required
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
        ></textarea>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="Twitter Username"
        />
        <input
          type="text"
          name="discord"
          value={formData.discord}
          onChange={handleChange}
          placeholder="Discord Username"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button
          className="border w-[33%] mx-auto bg-white text-black"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
