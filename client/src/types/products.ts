export interface Product {
  shop_id: number;
  shop_name: string;
  shop_type: 'mall' | 'flagship' | 'official' | 'standard';
  shop_link: string;
  shop_image: string;
  shop_banner: string[];
  offer_name: string;
  country: string;
  period_start_time: string;
  period_end_time: string | null;
  commission_rate: string;
  tracking_link: string;
}