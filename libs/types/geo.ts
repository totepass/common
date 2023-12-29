export type Address = {
  id: string;
  name: string;
  coordinates: [number, number];
  address: {
    street: string;
    number?: string;
    city: string;
    country: string;
    zip: string;
  };
  timezone: string;
  context: { [key: string]: any };
};
