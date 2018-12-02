document.addEventListener('DOMContentLoaded', function () {

  var titles = [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
  ];

  var types = [
    "palace",
    "flat",
    "house",
    "bungalo"
  ];

  var checkins = [
    "12:00",
    "13:00",
    "14:00"
  ];

  var checkouts = [
    "12:00",
    "13:00",
    "14:00"
  ];

  var features = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];

  var photos = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];

  var createCard = function (avatarSrc, title, address, price, type, rooms, guests, checkin, checkout, features, description, photos) {
    var card = document.createElement('article');
    card.classList.add('map__card', 'popup');

    var cardImg = document.createElement('img');
    cardImg.src = avatarSrc;
    cardImg.classList.add('popup__avatar');
    cardImg.width = 70;
    cardImg.height = 70;
    cardImg.alt = 'Аватар пользователя';
    card.appendChild(cardImg);

    var cardButton = document.createElement('button');
    cardButton.type = 'button';
    cardButton.classList.add('popup__close');
    cardButton.innerHTML = 'Закрыть';
    card.appendChild(cardButton);

    var cardH3 = document.createElement('h3');
    cardH3.classList.add('popup__title');
    cardH3.innerHTML = title;
    card.appendChild(cardH3);

    var cardAddress = document.createElement('p');
    cardAddress.classList.add('popup__text', 'popup__text--address');
    cardAddress.innerHTML = address;
    card.appendChild(cardAddress);

    var cardPrice = document.createElement('p');
    cardPrice.classList.add('popup__text', 'popup__text--price');
    cardPrice.innerHTML = price + '&#x20bd;';

    var cardPriceSpan = document.createElement('span');
    cardPriceSpan.innerHTML = '/Ночь';
    cardPrice.appendChild(cardPriceSpan);
    card.appendChild(cardPrice);

    var cardType = document.createElement('h4');
    cardType.classList.add('popup__type');
    cardType.innerHTML = type;
    card.appendChild(cardType);

    var cardCapacity = document.createElement('p');
    cardCapacity.classList.add('popup__text', 'popup__text--capacity');
    cardCapacity.innerHTML = rooms + ' комнаты для ' + guests + ' гостей';
    card.appendChild(cardCapacity);

    var cardTime = document.createElement('p');
    cardTime.classList.add('popup__text', 'popup__text--time');
    cardTime.innerHTML = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    card.appendChild(cardTime);

    var cardFeatures = document.createElement('ul');
    cardFeatures.classList.add('popup__features');

    for (var i = 0; i <= features.length - 1; i++) {
      var cardFeaturesItems = document.createElement('li');
      cardFeaturesItems.classList.add('popup__feature');

      var cardFeaturesItemsClass = 'popup__feature--' + features[i];
      cardFeaturesItems.classList.add(cardFeaturesItemsClass);

      cardFeatures.appendChild(cardFeaturesItems);
    };
    card.appendChild(cardFeatures);

    var cardDescription = document.createElement('p');
    cardDescription.classList.add('popup__description');
    cardDescription.innerHTML = description;
    card.appendChild(cardDescription);

    var cardPhotos = document.createElement('div');
    cardPhotos.classList.add('popup__photos');

    for (var i = 0; i <= photos.length - 1; i++) {
      var cardPhotosImg = document.createElement('img');
      cardPhotosImg.classList.add('popup__photo');
      cardPhotosImg.src = photos[i];
      cardPhotosImg.width = 45;
      cardPhotosImg.height = 40;
      cardPhotosImg.alt = 'Фотография жилья';

      cardPhotos.appendChild(cardPhotosImg);
    }
    card.appendChild(cardPhotos);

    return card;
  };

  var createPin = function(locationX, locationY, avatar, title) {
    var pin = document.createElement('button');
    pin.type = 'button';
    pin.classList.add('map__pin');
    pin.style = 'left: ' + locationY + 'px; ' + 'top: ' + locationX + 'px;';

    var pinImg = document.createElement('img');
    pinImg.src = avatar;
    pinImg.width = 40;
    pinImg.height = 40;
    pinImg.draggable = false;
    pinImg.alt = title;

    pin.appendChild(pinImg);

    return pin;
  };

  var generatePhotos = function (innerNumber) {
    var numberOfPhotos = generateNumber(0, photos.length - 1);
    var currentArrayOfPhotos = [];

    for (var i = 0; i <= numberOfPhotos; i++) {
      if (innerNumber >= photos.length - 1) {
        innerNumber = generateNumber(0, photos.length - 1);
      } else {
        innerNumber++;
      }
      currentArrayOfPhotos.push(photos[innerNumber]);
    }
    return currentArrayOfPhotos;
  };

  var generateFeatures = function (innerNumber){
    var numberOfFeatures = generateNumber(0, features.length - 1);
    var currentArrayOfFeatures = [];

    for (var i = 0; i <= numberOfFeatures; i++) {
      if (innerNumber >= features.length - 1) {
        innerNumber = generateNumber(0, features.length - 1);
      } else {
        innerNumber++;
      }
      currentArrayOfFeatures.push(features[innerNumber]);
    }
    return currentArrayOfFeatures;
  };

  var generateCheckout = function (innerNumber) {
    if(innerNumber < 0 || innerNumber >= checkouts.length - 1){
      innerNumber = generateNumber(0, checkouts.length - 1);
    }

    return checkouts[innerNumber];
  };

  var generateCheckin = function (innerNumber) {
    if(innerNumber < 0 || innerNumber >= checkins.length - 1){
      innerNumber = generateNumber(0, checkins.length - 1);
    }

    return checkins[innerNumber];
  };

  var generateType = function (innerNumber) {
    if(innerNumber < 0 || innerNumber > types.length - 1){
      innerNumber = generateNumber(0, types.length - 1);
    }

    return types[innerNumber];
  };

  var generateNumber = function (maxNumber, minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  };

  var calculateUserNumber = function (innerNumber) {

    if (innerNumber === undefined || innerNumber === 0) {
      innerNumber = 1;
    } else {
      innerNumber++;
    }

    return innerNumber = '0' + innerNumber;
  };

  var generateUser = function (userNumber, addressX, addressY) {
    var user = {
      author: {
        avatar: 'img/avatars/user' + calculateUserNumber(userNumber) + '.png'
      },
      offer: {
        title: titles[userNumber],
        address: addressX + ', ' + addressY,
        price: generateNumber(1000, 1000000),
        type: generateType(userNumber),
        rooms: generateNumber(1, 5),
        guests: generateNumber(1, 10),
        checkin: generateCheckin(userNumber),
        checkout: generateCheckout(userNumber),
        features: generateFeatures(userNumber),
        description: '',
        photos: generatePhotos(userNumber),
        location: {
          x: generateNumber(0, document.querySelector('.map__pins').offsetWidth),
          y: generateNumber(130, 630)
        }
      }
    };

    return user;
  };

  var users = [];

  for (var i = 0; i < 8; i++) {
    users.push(generateUser(i, 600, 350));
  };
  console.log(users);

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < users.length - 1; i++) {
    var userPin = createPin(
      users[i].offer.location.x,
      users[i].offer.location.y,
      users[i].author.avatar,
      users[i].offer.title
    );
    mapPins.appendChild(userPin);

    var userCard = createCard(
      users[i].author.avatar,
      users[i].offer.title,
      users[i].offer.address,
      users[i].offer.price,
      users[i].offer.type,
      users[i].offer.rooms,
      users[i].offer.guests,
      users[i].offer.checkin,
      users[i].offer.checkout,
      users[i].offer.features,
      users[i].offer.description,
      users[i].offer.photos
    );
    map.insertBefore(userCard, map.querySelector('.map__filters-container'));
  };
});
