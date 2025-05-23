import { PlutusDataType } from "../data";
import {
  Asset,
  BuilderData,
  DeserializedAddress,
  DeserializedScript,
  MeshTxBuilderBody,
  NativeScript,
  Output,
  PlutusScript,
  Protocol,
} from "../types";

export interface IMeshTxSerializer {
  serializeTxBody(
    txBuilderBody: MeshTxBuilderBody,
    protocolParams: Protocol,
  ): string;
  serializeTxBodyWithMockSignatures(
    txBuilderBody: MeshTxBuilderBody,
    protocolParams: Protocol,
  ): string;
  addSigningKeys(txHex: string, signingKeys: string[]): string;
  resolver: IResolver;
  deserializer: IDeserializer;
  serializeData(data: BuilderData): string;
  serializeAddress(address: DeserializedAddress, networkId?: 0 | 1): string;
  serializePoolId(hash: string): string;
  serializeRewardAddress(
    stakeKeyHash: string,
    isScriptHash?: boolean,
    network_id?: 0 | 1,
  ): string;
  serializeOutput(output: Output): string;
  serializeValue(value: Asset[]): string;
}
export interface IResolver {
  keys: {
    resolvePrivateKey(words: string[]): string;
    resolveRewardAddress(bech32: string): string;
    resolveEd25519KeyHash(bech32: string): string;
    resolveStakeKeyHash(bech32: string): string;
  };
  tx: {
    resolveTxHash(txHex: string): string;
  };
  data: {
    resolveDataHash(
      rawData: BuilderData["content"],
      type?: PlutusDataType,
    ): string;
  };
  script: {
    resolveScriptRef(script: NativeScript | PlutusScript): string;
  };
}

export interface IDeserializer {
  key: {
    deserializeAddress(bech32: string): DeserializedAddress;
  };
  script: {
    deserializeNativeScript(script: NativeScript): DeserializedScript;
    deserializePlutusScript(script: PlutusScript): DeserializedScript;
  };
  cert: {
    deserializePoolId(poolId: string): string;
  };
}
