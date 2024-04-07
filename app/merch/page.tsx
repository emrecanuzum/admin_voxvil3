"use client";
import React, { useEffect, useState } from "react";
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

interface Asset {
  category?: string;
  description?: string;
  manufacturer?: string;
  price?: string;
  quantity?: string;
  inventoryStatus?: string;
  supplier?: string;
}

const Merch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [supplier, setSupplier] = useState("");
  const [inventoryStatus, setInventoryStatus] = useState("");
  const [assets, setAssets] = useState<any>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data } = await axios.get(
          "https://budgetblock-a59f6a9a244d.herokuapp.com/assets"
        );
        setAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const handleSaveClick = async () => {
    const payload = {
      quantity: parseInt(quantity, 10),
      category,
      created_at: new Date().toISOString(),
      description,
      weight: 1.5,
      price: parseFloat(price),
      manufacturer,
      supplier,
      inventoryStatus,
      brands_id: 1,
      lastbuy_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "https://budgetblock-a59f6a9a244d.herokuapp.com/assets",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (Array.isArray(response.data)) {
        console.log(response.data);
        setAssets(response.data);
      } else {
        console.error("Expected an array, got:", response.data);
        setAssets([]);
        console.log(response.data);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error posting new merch:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-6 grid-flow-row">
      <div className="">
        <Button
          className="w-full min-h-[100px] text-lg font-semibold"
          color="secondary"
          onClick={() => setIsOpen(true)}
        >
          + Add New Merch
        </Button>
      </div>
      {Array.isArray(assets) && (
        <div className="">
          {assets?.map((asset: Asset, index: number) => (
            <div key={index} className="border rounded-xl p-4">
              <p>Category: {asset.category}</p>
              <p>Description: {asset.description}</p>
              <p>Price: {asset.price}</p>
              <p>Quantity: {asset.quantity}</p>
              <p>Manufacturer: {asset.manufacturer}</p>
            </div>
          ))}
        </div>
      )}

      <Modal
        className="dark text-neutral-100"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="text-white">Add Merch</ModalHeader>
          <ModalBody>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            <Input
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Manufacturer"
            />
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Supplier"
            />
            <Input
              value={inventoryStatus}
              onChange={(e) => setInventoryStatus(e.target.value)}
              placeholder="Inventory Status"
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

export default Merch;
