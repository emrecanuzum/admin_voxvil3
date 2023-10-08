"use client";
import { StatDownArrow } from "@chakra-ui/react";
import { Avatar, Button, Input } from "@nextui-org/react";
import { DataTable, SearchIcon } from "@saas-ui/react";
import Image from "next/image";
import GoChevronDown from "react-icons/go";

export default function Home() {
  return (
    <main>
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
              <StatDownArrow />
            </div>
          </div>
        </div>
        <div className="page-selector flex justify-between items-center py-8">
          <div className="pages flex text-xl font-bold">
            <div className="page mr-4  text-white text-opacity-50 hover:text-opacity-100">
              MY COMMUNITY
            </div>
            <div className="page mr-4  text-white text-opacity-100 hover:text-opacity-70">
              MEMBERS
            </div>
            <div className="page mr-4  text-white text-opacity-50 hover:text-opacity-100">
              REWARDS
            </div>
            <div className="page  text-white text-opacity-50 hover:text-opacity-100">
              MERCH
            </div>
          </div>
          <Button color="secondary">Add new members</Button>
        </div>
        <div className=" bg-white bg-opacity-5 rounded-xl">
          <DataTable
            columns={[
              { accessorKey: "id", header: "#" },
              { accessorKey: "name", header: "Name" },
              { accessorKey: "xp", header: "XP" },
              { accessorKey: "wallet_address", header: "Wallet ID" },
              { accessorKey: "notes", header: "Notes" },
              { accessorKey: "status", header: "Status" },
              { accessorKey: "edit", header: " " },
            ]}
            data={[
              {
                id: 1,
                name: "John Doe",
                xp: "100 XP",
                wallet_address: "0x1234...",
                notes: "Kötü Üye",
                status: "Deactive",
                edit: "...",
              },
              {
                id: 2,
                name: "Emrecan Üzüm",
                xp: "999 XP",
                wallet_address: "0x8wJs...",
                notes: "Harika üye",
                status: "Active",
                edit: "...",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
