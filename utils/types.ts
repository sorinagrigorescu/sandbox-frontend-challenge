import { TDoggyURIResponse } from "../server/utils/types";

export type Attribute = {
  traitType: string;
  value: string;
};

export type TGetDoggyResponse = {
  owner: string;
} & TDoggyURIResponse;
