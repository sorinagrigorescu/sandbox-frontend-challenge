import { Attribute } from "../../utils/types";

/* Etherscan API Response type */
export type TEtherscanResponse = {
  status: string;
  message: string;
  result: string;
};

export type TDoggyURIResponse = {
  name: string;
  description: string;
  imageUrl: string;
  attributes: Attribute[];
  [x: string | number | symbol]: unknown;
};
