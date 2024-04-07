"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Avatar, Button, Input, User, useDisclosure } from "@nextui-org/react";
import { SearchIcon } from "@saas-ui/react";
import DropdownButton from "../components/dropdown";
import { Box } from "@chakra-ui/react";
import Usertable from "../components/usertable";
import MyCommunity from "../my-community/page";
import Rewards from "../rewards/page";
import Merch from "../merch/page";
import { AES, enc } from "crypto-ts";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { useUserContext } from "../userContext";
import NFTPage from "../nft/page";

const aesSecretKey = {
  secret: "DnGotT9Rk1VXiebPjKMhs7ntQYwGooVw",
};

export default function Dashboard() {
  const { setAccessToken } = useUserContext();
  const { accessToken } = useUserContext();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(); // onClose ekleyin
  const [access, setAccess] = useState("");

  const [name, setName] = useState("");
  const [walletId, setWalletId] = useState("");
  const [notes, setNotes] = useState("");

  const [showCommunity, setShowCommunity] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [showMerch, setShowMerch] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showNft, setShowNft] = useState(false);

  const wallet = useWallet();
  const router = useRouter();

  const handleCommunityClick = () => {
    setShowCommunity(true);
    setShowMerch(false);
    setShowRewards(false);
    setShowMembers(false);
    setShowNft(false);
  };
  const handleMembersClick = () => {
    setShowMembers(true);
    setShowCommunity(false);
    setShowRewards(false);
    setShowMerch(false);
    setShowNft(false);
  };
  const handleMerchClick = () => {
    setShowCommunity(false);
    setShowMerch(true);
    setShowRewards(false);
    setShowMembers(false);
    setShowNft(false);
  };
  const handleRewardsClick = () => {
    setShowCommunity(false);
    setShowMerch(false);
    setShowRewards(true);
    setShowMembers(false);
    setShowNft(false);
  };
  const handleNftClick = () => {
    setShowCommunity(false);
    setShowMerch(false);
    setShowRewards(false);
    setShowMembers(false);
    setShowNft(true);
  };

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://budgetblock-a59f6a9a244d.herokuapp.com/users/all"
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveClick = (name: string, walletId: string, notes: string) => {
    setMembers([
      ...members,
      {
        id: members.length + 1,
        name: name,
        xp: "100 XP",
        wallet_address: walletId,
        notes: notes,
        status: "Active",
        edit: "...",
      },
    ]);
  };

  useEffect(() => {
    if (!wallet.publicKey || !accessToken) {
      router.push("/");
    }
  }, [wallet.publicKey, router, accessToken]);

  if (wallet.publicKey && accessToken) {
    const postData = async () => {
      const data = {
        wallet_address: wallet.publicKey ? wallet.publicKey.toBase58() : "",
        street_address: "ALTINTEPSİ MAH. UYGUR CADDESİ NO:2/1 BAYRAMPAŞA",
        nft_address: "0x32c23bc539400BB79aA7cc2a028Bc21315123",
      };

      try {
        const response = await axios.post(
          "https://budgetblock-a59f6a9a244d.herokuapp.com/auth/register",
          data
        );

        setAccessToken(response.data.access_token);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <main className="text-white bg-black">
        <div className="dark min-h-screen bg-blue-950 bg-opacity-60 px-20">
          <div className="navbar flex justify-between items-center border-b-2 border-blue-300 border-opacity-25">
            <div className="text-xl">Community Admin</div>

            <div className="user-info flex items-center py-8">
              <WalletMultiButton />
              <div className="ml-4">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </div>
              {/* <div className=" pl-2 min-w-max">
                <div className="name mr-2">John Doe</div>
                <div className="xp mr-2">110 XP</div>
              </div>
              <div className="dropdown-icon">
                <DropdownButton />
              </div> */}
            </div>
          </div>
          <div className="page-selector flex justify-between items-center my-14">
            <div className="pages flex text-xl font-bold">
              <div
                onClick={handleCommunityClick}
                className={`mr-4 text-xl text-white hover:cursor-pointer hover:text-opacity-75 ${
                  showCommunity ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                MY COMMUNITY
              </div>
              <div
                onClick={handleMembersClick}
                className={`mr-4 text-xl text-white hover:cursor-pointer hover:text-opacity-75 ${
                  showMembers ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                MEMBERS
              </div>
              <div
                // onClick={handleRewardsClick}
                className={`mr-4 text-xl text-white hover:cursor-not-allowed hover:text-opacity-75 hover:text-red-400 ${
                  showRewards ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                REWARDS
              </div>
              <div
                onClick={handleMerchClick}
                className={`mr-4 text-xl text-white hover:cursor-pointer hover:text-opacity-75 ${
                  showMerch ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                MERCH
              </div>
              <div
                onClick={handleNftClick}
                className={`mr-4 text-xl text-white hover:cursor-pointer hover:text-opacity-75 ${
                  showNft ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                NFT
              </div>
            </div>
            {showMembers ? (
              <Button className="mt-[-4]" onPress={onOpen} color="secondary">
                Add new members
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="">
            <Modal
              className="dark text-neutral-100"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col text-white">
                      ADD NEW MEMBER
                    </ModalHeader>
                    <ModalBody className=" gap-1">
                      <Input
                        autoFocus
                        label="Name"
                        placeholder="Name"
                        variant="bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        label="Wallet ID"
                        placeholder="Type your wallet"
                        type="wallet"
                        variant="bordered"
                        value={walletId}
                        onChange={(e) => setWalletId(e.target.value)}
                      />
                      <Input
                        label="Notes"
                        placeholder=""
                        type="wallet"
                        variant="bordered"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          handleSaveClick(name, walletId, notes);
                          onClose(); // Close the modal
                          setName(""); // Clear the name field
                          setWalletId(""); // Clear the walletId field
                          setNotes(""); // Clear the notes field
                        }}
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <Box>
            {showCommunity ? (
              <MyCommunity />
            ) : showMembers ? (
              <Usertable members={members} />
            ) : showMerch ? (
              <Merch />
            ) : showRewards ? (
              <Rewards />
            ) : showNft ? (
              <NFTPage />
            ) : (
              <Usertable members={members} />
            )}
          </Box>
        </div>
      </main>
    );
  } else {
    return (
      <main className="text-white bg-black">
        <div className="dark h-screen overflow-hidden justify-center w-full bg-blue-950 bg-opacity-60">
          <div className=" w-auto md:w-[30vw] text-center  rounded-2xl container mx-auto  mt-10 p-10 flex items-center justify-center">
            <div className="loader animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </main>
    );
  }
}
