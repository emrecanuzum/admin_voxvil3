import React from "react";
import { DataTable } from "@saas-ui/react";

const Usertable = () => {
  return (
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
  );
};

export default Usertable;
