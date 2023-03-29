export default defineEventHandler(async (event) => {
  if (!event.context.params?.id || isNaN(Number(event.context.params.id)))
    throw createError({
      statusCode: 400,
      message: ErrorMessages.TOKEN_ID_MISSING,
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
