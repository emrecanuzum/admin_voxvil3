"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";

const NFTPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [brandId, setBrandId] = useState("");
  const [userId, setUserId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [response, setResponse] = useState<any>();
  const handleAddItem = () => {
    setItems([...items, { key: "", value: "" }]);
  };

  const handleItemChange = (index: any, key: any, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleSaveClick = async () => {
    const payload = {
      item: items,
      brand_id: brandId,
      user_id: userId,
      imgUrl: imgUrl,
    };

    try {
      console.log(payload);
      const response = await axios.post(
        "https://budgetblock-a59f6a9a244d.herokuapp.com/web3/solana/nft",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsOpen(false);
      setResponse(true);
    } catch (error) {
      setResponse(false);
      console.error("Error posting new NFT:", error);
    }
  };

  return (
    <div className="text-center justify-center mx-auto">
      <Button
        color="secondary"
        className="h-20 w-40"
        onClick={() => setIsOpen(true)}
      >
        Add NFT
      </Button>
      <Modal
        className="dark text-neutral-100"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="text-white">Add NFT Attributes</ModalHeader>
          <ModalBody>
            {items.map((item: any, index: any) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={item.key}
                  onChange={(e) =>
                    handleItemChange(index, "key", e.target.value)
                  }
                  placeholder="Key"
                />
                <Input
                  value={item.value}
                  onChange={(e) =>
                    handleItemChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
                />
              </div>
            ))}
            <Button onClick={handleAddItem}>Add Attribute</Button>
            <Input
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              placeholder="Brand Id"
            />
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User Id"
            />
            <Input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              placeholder="Image Url"
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
    </div>
  );
};

export default NFTPage;
