"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

const Home = () => {
  const [walletState, setWalletState] = useState("");
  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    console.log(wallet.publicKey);
    if (wallet.publicKey) {
      router.push("/dashboard");
    }
  }, [wallet, router]);

  return (
    <main className="text-white bg-black">
      <div className="dark h-screen overflow-hidden justify-center w-full bg-blue-950 bg-opacity-60">
        <div className=" w-auto md:w-[30vw] text-center flex-col rounded-2xl container mx-auto border mt-10 p-10 flex items-center justify-center">
          <h1 className="text-lg flex flex-col mb-10">
            <strong className="text-2xl">Voxvil3</strong>{" "}
            <span>Community Panel</span>
          </h1>

          <WalletMultiButton />

          <p className="mt-10 text-neutral-300 text-xs">
            {`After connecting a wallet you'll be redirect to the dashboard`}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
