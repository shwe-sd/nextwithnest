export interface Conversion {
  conversion_id: number;
  offer_name: string;
  offer_id: number;
  merchant_id: number;
  sale_amount: string;
  currency: string;
  payout: string;
  base_payout: string;
  bonus_payout: string;
  aff_sub1: string | null;
  aff_sub2: string | null;
  aff_sub3: string | null;
  aff_sub4: string | null;
  aff_sub5: string | null;
  adv_sub1: string;
  adv_sub2: string;
  adv_sub3: string;
  adv_sub4: string;
  adv_sub5: string;
  datetime_conversion: string;
  conversion_status: string;
  affiliate_remarks: string;
  affiliate_id: number;
  user_id: number;
  user_email: string;
}