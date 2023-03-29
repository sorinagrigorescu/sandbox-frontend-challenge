import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { TEtherscanResponse } from "../utils/types";

export default defineNitroPlugin(async (nitroApp) => {
  /* Download ABI on server startup */
  if (Contract.getInstance().getContract()) return;

  const runtimeConfig = useRuntimeConfig();
  const web3 = new Web3(runtimeConfig.ethProvider);

  const data: TEtherscanResponse = await $fetch("/api", {
    method: "get",
    baseURL: "https://api.etherscan.io",
    params: {
      module: "contract",
      action: "getabi",
      address: runtimeConfig.public.contractAddress,
    },
  });

  let abi: AbiItem | null;
  try {
    abi = JSON.parse(data.result) as AbiItem;
  } catch (e) {
    console.error(ERROR_MESSAGE_SERVER_ABI, data.message);
    return;
  }

  Contract.getInstance().setContract(
    new web3.eth.Contract(abi, runtimeConfig.public.contractAddress)
  );
});
