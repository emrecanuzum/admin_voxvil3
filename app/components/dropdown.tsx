import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { StatDownArrow } from "@chakra-ui/react";

const DropdownButton = () => {
  return (
    <Dropdown className="dark">
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <StatDownArrow />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">My Profile</DropdownItem>
        <DropdownItem key="copy">My Earnings</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
