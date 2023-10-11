"use client";
import { SetStateAction, useState } from "react";

import { Avatar, Button, Input, User } from "@nextui-org/react";
import { SearchIcon } from "@saas-ui/react";
import Image from "next/image";
import DropdownButton from "./components/dropdown";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { Box } from "@chakra-ui/react";
import Usertable from "./components/usertable";
import MyCommunity from "./my-community/page";
import Rewards from "./rewards/page";
import Merch from "./merch/page";
import { ClassNames } from "@emotion/react";

export default function Home() {
  const [showCommunity, setShowCommunity] = useState(false);
  const [showMembers, setShowMembers] = useState(true);
  const [showMerch, setShowMerch] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  const handleCommunityClick = () => {
    setShowCommunity(true);
    setShowMerch(false);
    setShowRewards(false);
    setShowMembers(false);
  };
  const handleMembersClick = () => {
    setShowMembers(true);
    setShowCommunity(false);
    setShowRewards(false);
    setShowMerch(false);
  };
  const handleMerchClick = () => {
    setShowCommunity(false);
    setShowMerch(true);
    setShowRewards(false);
    setShowMembers(false);
  };
  const handleRewardsClick = () => {
    setShowCommunity(false);
    setShowMerch(false);
    setShowRewards(true);
    setShowMembers(false);
  };

  return (
    <main className="dark">
      <div className="admin-pane min-h-screen bg-blue-950 bg-opacity-60 px-20">
        <div className="navbar flex justify-between items-center border-b-2 border-blue-300 border-opacity-25">
          <div className="title">Community Admin</div>
          <div className="user-info flex items-center py-8">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[15rem] h-10 px-4 rounded-xl",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="lg"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
            <div className="">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </div>
            <div className=" pl-2 min-w-max">
              <div className="name mr-2">John Doe</div>
              <div className="xp mr-2">110 XP</div>
            </div>
            <div className="dropdown-icon">
              <DropdownButton />
            </div>
          </div>
        </div>
        <div className="page-selector flex justify-between items-center py-8">
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
              onClick={handleRewardsClick}
              className={`mr-4 text-xl text-white hover:cursor-pointer hover:text-opacity-75 ${
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
          </div>
          {showMembers ? (
            <Button color="secondary">Add new members</Button>
          ) : (
            ""
          )}
        </div>

        <Box>
          {showCommunity ? (
            <MyCommunity />
          ) : showMembers ? (
            <Usertable />
          ) : showMerch ? (
            <Merch />
          ) : showRewards ? (
            <Rewards />
          ) : (
            <Usertable />
          )}
        </Box>
      </div>
    </main>
  );
}
