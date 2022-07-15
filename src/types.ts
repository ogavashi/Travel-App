export type TripProps = {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image: string;
};

export type FilterProps = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export type TripsProps = {
  trips: TripProps[];
};
