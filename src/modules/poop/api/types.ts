export const enum PoopType {
  Normal = "normal",
  Liquid = "liquid",
  Nothing = "nothing"
}

export interface PoopRequest {
  readonly type: PoopType;
  readonly date?: Date;
}

export interface PoopResponse {
  readonly type: PoopType;
  readonly date: Date;
}

export interface PoopsResponse {
  readonly poops: PoopResponse[];
}
