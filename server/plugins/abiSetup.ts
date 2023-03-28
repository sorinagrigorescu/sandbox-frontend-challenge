/* Download ABI on server startup */
import Web3 from 'web3';
import { AbiItem } from 'web3-utils'

export default defineNitroPlugin(async (nitroApp) => {
  const runtimeConfig = useRuntimeConfig();
  const web3 = new Web3('ws://localhost:8546');

  const data = await $fetch("/api", {
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
    if (!abi)
      throw Error;
  } catch (e) {
    console.log("ABI Setup Plugin: Error in retrieving or processing the ABI.\nEtherscan API response: ", data.message);
    return;
  }

  let contract = new web3.eth.Contract(abi, runtimeConfig.public.contractAddress);
});
