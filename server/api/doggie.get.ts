import { ServerErrorMessages } from "../utils/constants";

/* returns random doggie */
export default defineEventHandler(async () => {
  const contract = Contract.getInstance().getContract();

  if (!contract) {
    console.error(ServerErrorMessages.NO_CONTRACT);

    throw createError({
      statusCode: 500,
      message: ErrorMessages.DEFAULT,
    });
  }

  try {
    /* compute a random doggie id */
    const totalSupply = await contract.methods.totalSupply().call();
    const randomDoggieId = Math.ceil(Math.random() * totalSupply);

    /* get doggie data */
    return getDoggie(randomDoggieId, contract);
  } catch (err) {
    /* errors related to the token should not reach the end user because the server provides the doggie id */
    console.error(err);

    throw createError({
      statusCode: 500,
      message: ErrorMessages.DEFAULT,
    });
  }
});
