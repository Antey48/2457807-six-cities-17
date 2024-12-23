import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Rating from '../../components/rating/rating';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import PlaceCardsList from '../../components/place-card-list/place-card-list';
import { PageNames } from '../../constants';
import { fullOffer } from '../../mock/full-offer';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { offers } from '../../mock/offers';
import FormReviews from '../../components/form-reviews/form-reviews';
import UserProfile from '../../components/user-profile/user-profile';
import { UserProfileAttributes } from '../../style-options';
import ReviewsList from '../../components/reviews-list/reviews-list';

type OfferGoodItemProps = {
  offerGoodItem: string;
}

function OfferGoodItem({offerGoodItem}:OfferGoodItemProps):JSX.Element{
  return (
    <li className="offer__inside-item">
      {offerGoodItem}
    </li>
  );
}

function FullOfferPage(): JSX.Element{
  return (
    <div className="page">
      <Helmet>
        <title>Страница предложения</title>
      </Helmet>
      <Header pageNames={PageNames.Offer} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {fullOffer.images.slice(0,6).map((imageGallery) => <OfferGallery key={crypto.randomUUID()} imageGallery={imageGallery}/>)}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {fullOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
              Beautiful & luxurious studio at great location
                </h1>
                <BookmarkButton bookmarkClass={PageNames.Offer}/>
              </div>
              <Rating
                ratingClass={'offer'}
                ratingValue={fullOffer.rating}
              />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {fullOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {fullOffer.bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {fullOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{fullOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&#39; inside</h2>
                <ul className="offer__inside-list">
                  {fullOffer.goods.map((offerGood) => <OfferGoodItem key={crypto.randomUUID()} offerGoodItem={offerGood}/>)}
                </ul>
              </div>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <UserProfile userDate={fullOffer.host} userProfileStyle={UserProfileAttributes.host}/>
              <div className="offer__description">
                <p className="offer__text">
                  {fullOffer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <ReviewsList/>
              <FormReviews/>
            </section>
          </div>
          <Map mapClass={PageNames.Offer}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardsList offers = {offers} pageNames= {PageNames.Offer}/>
            </div>
          </section>
        </div>


      </main>
    </div>
  );
}

export default FullOfferPage;
