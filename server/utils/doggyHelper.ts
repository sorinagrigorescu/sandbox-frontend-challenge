import { Contract as Web3Contract } from "web3-eth-contract";
import { ErrorMessages } from "~/utils/constants";
import { TGetDoggyResponse } from "~/utils/types";
import humps from "humps";

/* Get doggy based on id and doggy smart contract */
export const getDoggie = async (
  id: number,
  contract: Web3Contract,
): Promise<TGetDoggyResponse> => {
  try {
    const doggyURI = contract.methods.tokenURI(id).call();
    const doggyOwner = contract.methods.ownerOf(id).call();

    // @ts-ignore
    return humps.camelizeKeys({
      ...(await $fetch<TDoggyURIResponse>(await doggyURI)),
      owner: await doggyOwner,
    });
  } catch (err: any) {
    /* no token with the provided id was found */
    if (err.message.includes("nonexistent token"))
      throw createError({
        statusCode: 404,
        message: ErrorMessages.TOKEN_NOT_FOUND,
        data: {
          tokenId: id,
        },
      });

    /* generic server error */
    console.error(err);

    throw createError({
      statusCode: 500,
      message: ErrorMessages.DEFAULT,
    });
  }
};
