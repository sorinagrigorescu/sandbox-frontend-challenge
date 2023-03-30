export type Attribute = {
  traitType: string;
  value: string;
};

export type TGetDoggyResponse = {
  name: string;
  owner: string;
  description: string;
  image_url: string;
  attributes: Attribute[];
  [x: string | number | symbol]: unknown;
};
