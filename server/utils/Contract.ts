import { Contract as Web3Contract } from "web3-eth-contract";

export class Contract {
  private static instance: Contract;
  private value: Web3Contract | null;

  private constructor() {
    this.value = null;
  }

  public static getInstance(): Contract {
    if (!Contract.instance) {
      Contract.instance = new Contract();
    }

    return Contract.instance;
  }

  public getContract() {
    return this.value;
  }

  public setContract(contract: Web3Contract) {
    this.value = contract;
  }
}
