import React from "react";
import { DataTable } from "@saas-ui/react";

type Member = {
  id: number;
  name: string;
  xp: string;
  wallet_address: string;
  notes: string;
  status: string;
  edit: string;
  twitter: string;
};

type UsertableProps = {
  members: Member[];
};

const Usertable: React.FC<UsertableProps> = ({ members }) => {
  return (
    <div className=" bg-white bg-opacity-5 rounded-xl">
      <DataTable
        columns={[
          { accessorKey: "id", header: "#" },
          { accessorKey: "name", header: "Name" },
          { accessorKey: "twitter", header: "Twitter" },
          { accessorKey: "wallet_address", header: "Wallet ID" },
          { accessorKey: "notes", header: "Notes" },
          { accessorKey: "brand_name", header: "Community" },
          // { accessorKey: "edit", header: " " },
        ]}
        data={members}
      />
    </div>
  );
};

export default Usertable;
