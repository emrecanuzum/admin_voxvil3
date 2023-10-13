"use client";
import React from "react";
import { useState } from "react";
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

const MyCommunity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [submissionType, setSubmissionType] = useState("");
  const [action, setAction] = useState("");
  const [description, setDescription] = useState("");
  const [xpRewards, setXpRewards] = useState("");
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

  const handleSaveClick = () => {
    setCampaigns([
      ...campaigns,
      {
        name: campaignName,
        submissionType: submissionType,
        action: action,
        description: description,
        xpRewards: xpRewards,
      },
    ]);
    setIsOpen(false);
  };

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
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Campaign name"
            />
            <Select
              className="dark"
              placeholder="Submission Type"
              onChange={(e) => setSubmissionType(e.target.value)}
            >
              <SelectItem className="dark" value="Twitter" key={submissionType}>
                Twitter
              </SelectItem>
              <SelectItem className="dark" value="Discord" key={submissionType}>
                Discord
              </SelectItem>
            </Select>
            <Select
              className="dark"
              placeholder="Action"
              onChange={(e) => setAction(e.target.value)}
            >
              <SelectItem value="Twitter" key={submissionType}>
                Twitter
              </SelectItem>
              <SelectItem value="Discord" key={submissionType}>
                Discord
              </SelectItem>
            </Select>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descriptipn"
            />
            <Input
              value={xpRewards}
              onChange={(e) => setXpRewards(e.target.value)}
              placeholder="XP"
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
      {campaigns.map((campaign, index) => (
        <div
          key={index}
          className="flex items-start justify-between my-4 px-10 py-5 rounded-lg bg-blue-950 bg-opacity-30"
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{campaign.name}</h2>
            <p>{campaign.description}</p>
          </div>
          <Button color="secondary">Join</Button>
        </div>
      ))}
    </main>
  );
};

export default MyCommunity;
