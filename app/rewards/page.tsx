"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Rewards = () => {
  const router = useRouter();
  router.push("/dashboard");
  return <div></div>;
};

export default Rewards;
