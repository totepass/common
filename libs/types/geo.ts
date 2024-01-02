export type Address = {
  id: string;
  name: string;
  coordinates: [number, number];
  address: {
    address: string;
    city: string;
    region: string;
    country: string;
    zip: string;
  };
  timezone: string;
  context: { [key: string]: any };
};
