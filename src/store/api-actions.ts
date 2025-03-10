import { createAsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { AxiosInstance } from 'axios';
import { redirectToRoute} from './action';
import { dropToken, saveToken } from '../services/token';
import { AppDispatch, State } from '../types/state';
import { ListOfferType } from '../types/offers';
import { FullOfferType } from '../types/full-offer';
import { CommentType, OfferReviewType } from '../types/comment';
import { AuthData, AuthorizedUserType} from '../types/authorized-user';
import { APIRoute, AppRoute, NameSpace, PageNames} from '../constants';

type toggleFavoriteActionPayload = {
  offerId: string;
  isFavorite: boolean | undefined;
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();


export const toggleFavoriteAction = createAppAsyncThunk<ListOfferType, toggleFavoriteActionPayload>(
  `${NameSpace.Offers}/toggleFavorite`,
  async({offerId: id, isFavorite}, {extra: api}) => {
    const path = generatePath(APIRoute.Favorite, {offerId: id, status: `${isFavorite ? 0 : 1}`});
    const {data} = await api.post<ListOfferType>(path);
    return data;
  }
);

export const fetchFavoriteOffersAction = createAppAsyncThunk<ListOfferType[], undefined>(
  `${NameSpace.Offers}/fetchFavoriteOffers`,
  async(_arg, { extra: api}) => {
    const {data} = await api.get<ListOfferType[]>(APIRoute.FavoritesLoad);
    return data;
  }
);

export const fetchOffersAction = createAppAsyncThunk<ListOfferType[], undefined>(
  `${NameSpace.Offers}/fetchOffers`,
  async(_arg, { extra: api}) => {
    const {data} = await api.get<ListOfferType[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferInfoByIDAction = createAppAsyncThunk<FullOfferType, string | null>(
  `${NameSpace.Offers}/fetchOfferInfo`,
  async(id, {extra: api}) => {
    const path = generatePath(APIRoute.Offer, {offerId: id});
    const {data} = await api.get<FullOfferType>(path);
    return data;
  }
);

export const fetchOffesNearAction = createAppAsyncThunk<ListOfferType[], string | null>(
  `${NameSpace.Offers}/fetchOffersNear`,
  async(id, { extra: api}) => {
    const path = generatePath(APIRoute.NearbyOffers, {offerId: id});
    const {data} = await api.get<ListOfferType[]>(path);
    return data;
  }
);

export const fetchOfferReviewListAction = createAppAsyncThunk<CommentType[], string | null>(
  `${NameSpace.Offers}/fetchOfferReviewList`,
  async(id, { extra: api}) => {
    const path = generatePath(APIRoute.Comments, {offerId: id});
    const {data} = await api.get<CommentType[]>(path);
    return data;
  }
);

export const submitToOfferReviewAction = createAppAsyncThunk<CommentType, OfferReviewType>(
  `${NameSpace.Offers}/postOfferReview`,
  async({offerId: id, comment, rating}, { extra: api}) => {
    const path = generatePath(APIRoute.Comments, {offerId: id});
    const {data} = await api.post<CommentType>(path, {comment, rating});
    return data;
  }
);

export const checkAuthAction = createAppAsyncThunk<AuthorizedUserType, undefined>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthorizedUserType>(APIRoute.Login);
    return data;
  }
);

export const logInAction = createAppAsyncThunk<AuthorizedUserType, AuthData>(
  `${NameSpace.User}/login`,
  async({login: email, password}, {dispatch, extra: api}) => {

    const {data: user} = await api.post<AuthorizedUserType>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return user;

  }
);

export const logOutAction = createAppAsyncThunk<void, string>(
  `${NameSpace.User}/logout`,
  async(pageNames, { dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();

    if(pageNames === PageNames.Favorites){
      dispatch(redirectToRoute(AppRoute.Login));
    }
  }
);

