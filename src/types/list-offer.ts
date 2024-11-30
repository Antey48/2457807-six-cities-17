import { LOCATIONS, PageNames } from '../constans';

type OfferType = 'room' | 'house' | 'hotel' | 'apartment';
// type CitiesType = 'Paris' | 'Cologne' | 'Brussels' |
// 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

type LocationType = {
    'latitude': number;
    'longitude': number;
    'zoom': number;
  };

  type CityType = {
    'name': string;
    'location': LocationType;
  };

  type CitiesType = typeof LOCATIONS;
  type TypesPage = (typeof PageNames)[keyof typeof PageNames];

  type ListOfferType = {
    'id': string;
    'title': string;
    'type': string;
    'price': number;
    'city':CityType;
    'location': LocationType;
    'isFavorite': boolean;
    'isPremium': boolean;
    'rating': number;
    'previewImage'?: string;
  };

export type { ListOfferType, CityType, CitiesType,
  LocationType, TypesPage, OfferType };


