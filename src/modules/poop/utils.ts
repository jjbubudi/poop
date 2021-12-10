import { PoopType } from "./api/types";

export const TypeToName: Record<PoopType, string> = {
  [PoopType.Normal]: "Normal 💩",
  [PoopType.Liquid]: "Liquid 🤢",
  [PoopType.Nothing]: "Nothing ❌"
};
