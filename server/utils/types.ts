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
  attributes: Object;
  [x: string | number | symbol]: unknown;
};
