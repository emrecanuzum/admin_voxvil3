"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";

import { AES, enc } from "crypto-ts";
import { useUserContext } from "./userContext";
require("@solana/wallet-adapter-react-ui/styles.css");

const Home = () => {
  const [walletState, setWalletState] = useState("");
  const { accessToken } = useUserContext();
  const { setAccessToken } = useUserContext();
  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    // console.log(wallet.publicKey);
    if (wallet.publicKey) {
      const WalletAES = AES.encrypt(
        wallet.publicKey?.toBase58(),
        process.env.SECRET_AES || "DnGotT9Rk1VXiebPjKMhs7ntQYwGooVw"
      ).toString();

      const postDataLogin = async () => {
        const data = {
          wallet_address: wallet.publicKey ? wallet.publicKey.toBase58() : "",
          aes_hashed: WalletAES,
        };

        try {
          const response = await axios.post(
            `https://budgetblock-a59f6a9a244d.herokuapp.com/auth/login`,
            data
          );
          setAccessToken(response.data.access_token);
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
          router.push("/register");
        }
      };

      postDataLogin();
    }
  }, [wallet, router, accessToken, setAccessToken]);

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
