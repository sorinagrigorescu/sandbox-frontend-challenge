import { Contract as Web3Contract } from "web3-eth-contract";
import { ErrorMessages } from "~~/utils/constants";

export const getDoggie = async (id: number, contract: Web3Contract) => {
  try {
    const doggieURI = contract.methods.tokenURI(id).call();
    const doggieOwner = contract.methods.ownerOf(id).call();
    return {
      ...(await $fetch<Object>(await doggieURI)),
      owner: await doggieOwner,
    };
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
