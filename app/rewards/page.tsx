"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Rewards = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return <div></div>;
};

export default Rewards;
