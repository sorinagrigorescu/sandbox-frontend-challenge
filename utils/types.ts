export type TGetDoggyResponse = {
  name: string;
  owner: string;
  description: string;
  imageUrl: string;
  attributes: Object;
  [x: string | number | symbol]: unknown;
};
