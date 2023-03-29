export default defineEventHandler(async (event) => {
  if (!event.context.params?.id)
    throw createError({
      statusCode: 400,
      statusMessage: ERROR_MESSAGE_TOKEN_ID_MISSING,
    });

  const contract = Contract.getInstance().getContract();

  if (!contract) {
    console.error(ERROR_MESSAGE_SERVER_NO_CONTRACT);

    throw createError({
      statusCode: 500,
      statusMessage: ERROR_MESSAGE_DEFAULT,
    });
  }

  return getDoggie(event.context.params.id, contract);
});
