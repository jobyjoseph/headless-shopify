declare module "multipassify" {
  export type MultipassCustomerData = {
    email: string;
    [key: string]: unknown;
  };

  export default class Multipassify {
    constructor(secret: string);
    encode(payload: MultipassCustomerData): string;
  }
}
