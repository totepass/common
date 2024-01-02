export type Address = {
  id: string;
  name: string;
  coordinates: [number, number];
  address: {
    address: string;
    city: string;
    zip: string;
    region: string;
    country: string;
    countryCode: string;
  };
  timezone: string;
  context: { [key: string]: any };
};
