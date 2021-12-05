export interface Address {
  _id: string;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  apartment?: string;
  pincode: string;
  deliveryInstructions?: string;
  isDeleted: boolean;
}

export interface ManageAddressParams {
  _id?: string;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  apartment?: string;
  pincode: string;
  deliveryInstructions?: string;
}
