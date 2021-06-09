export interface User {
  ref: {
    id: string;
  };
  data: {
    email: string;
    stripe_customer_id: string;
  };
}
