import { ErrorMessages } from "../../../utils/constants";

/* returns doggy based on id */
export default defineEventHandler(async (event) => {
  if (!event.context.params?.id)
    throw createError({
      statusCode: 400,
      message: ErrorMessages.TOKEN_ID_MISSING,
    });

  if (isNaN(Number(event.context.params.id)))
    throw createError({
      statusCode: 404,
      message: ErrorMessages.TOKEN_NOT_FOUND,
      data: {
        tokenId: event.context.params.id,
      },
    });

  const contract = Contract.getInstance().getContract();

  if (!contract) {
    console.error(ServerErrorMessages.NO_CONTRACT);

    throw createError({
      statusCode: 500,
      message: ErrorMessages.DEFAULT,
    });
  }

  return getDoggie(Number(event.context.params.id), contract);
});
