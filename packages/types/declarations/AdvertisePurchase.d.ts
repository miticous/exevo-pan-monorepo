export declare type PaymentMethods = "TIBIA_COINS" | "PIX";

export declare type PixObject = {
  payload: string;
  qrCode: string;
};

export declare interface AdvertisePurchase {
  selectedCharacter: CharacterObject;
  selectedDates: string[];
  paymentMethod: PaymentMethods;
  email: string;
  paymentCharacter: string;
  locale: string;
}

export declare type HighlightedAuctionData = {
  id: number;
  days: string[];
};
