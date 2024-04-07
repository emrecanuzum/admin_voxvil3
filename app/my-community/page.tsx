"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import { BsDiscord, BsLink45Deg } from "react-icons/bs";
import BaseImg from "../../public/base.png";

interface Campaign {
  campain_name: string;
  description: string;
}

const MyCommunity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [xpRewards, setXpRewards] = useState("");
  const [getCampaigns, setGetCampaigns] = useState<any>([]);

  const startDate = new Date().toISOString();

  const handleSaveClick = async () => {
    const newCampaign = {
      start_date: startDate,
      end_date: startDate,
      campaign_name: campaignName,
      description: description,
      amount_xp: parseInt(xpRewards, 10),
      brand_id: 1,
    };

    try {
      const response = await axios.post(
        "https://budgetblock-a59f6a9a244d.herokuapp.com/campain",
        newCampaign,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting new campaign:", error);
    }

    // Reset form fields and close the modal
    setIsOpen(false);
    setCampaignName("");
    setEndDate("");
    setDescription("");
    setXpRewards("");
  };
  const [campaigns, setCampaigns] = useState<
    {
      name: string;
      submissionType: string;
      action: string;
      description: string;
      xpRewards: string;
    }[]
  >([
    {
      name: "Retweet to XP",
      submissionType: "twitter",
      action: "twitter",
      description: "just retweet our lastest post and gain xp",
      xpRewards: "35",
    },
  ]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "https://budgetblock-a59f6a9a244d.herokuapp.com/campain"
        );
        setGetCampaigns(response.data); // Assuming the response data is the array of campaigns
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);
  return (
    <main className="dark mx-[20%]">
      <div className="flex items-center px-10 pb-5  mb-4 rounded-lg bg-blue-950 bg-opacity-30">
        <Image
          src={BaseImg}
          alt="base"
          width={32}
          height={32}
          className="w-32 h-32 mr-4 pt-0"
        />
        <div>
          <h2 className="pt-5 text-lg font-bold">Superteam TR</h2>
          <p className="text-sm">
            We help the most promising projects in the Solana ecosystem in
            Turkey launch and grow. We are organized as a co-operative of
            creatives, developers, and operators who are experienced in
            launching and growing technology businesses. We value the
            sovereignty that comes with founding a company, the skin in the game
            that comes with investing, and the joy that comes with getting sh*t
            done. In a pre-crypto world, we had to fit into broiler categories —
            founder, investor, or employee. Crypto allows us to be free-range
            and be all 3 at the same time.
          </p>
          <div className="pt-2">
            <Button className="mr-2" variant="light" isIconOnly>
              <BsDiscord name="edit" size={24} />
            </Button>
            <Button className="mx-2" variant="light" isIconOnly>
              <BsLink45Deg name="delete" size={24} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="w-full h-20 text-lg font-semibold"
        color="secondary"
        onClick={() => setIsOpen(true)}
      >
        + Add New Campaign
      </Button>
      <Modal
        className="dark text-neutral-100"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="text-white">Add Campaign</ModalHeader>
          <ModalBody>
            {/* Campaign Name Input */}
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Campaign Name"
            />
            {/* End Date Input */}
            <Input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            {/* Description Input */}
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            {/* XP Rewards Input */}
            <Input
              type="number"
              value={xpRewards}
              onChange={(e) => setXpRewards(e.target.value)}
              placeholder="XP Rewards"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {getCampaigns.map((campaign: Campaign, index: number) => (
        <div
          key={index}
          className="flex items-start justify-between my-4 px-10 py-5 rounded-lg bg-blue-950 bg-opacity-30"
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{campaign.campain_name}</h2>
            <p>{campaign.description}</p>
          </div>
          <Button color="secondary">Join</Button>
        </div>
      ))}
      <div className="my-10 h-12"></div>
    </main>
  );
};

export default MyCommunity;
