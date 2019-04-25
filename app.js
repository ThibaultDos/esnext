let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);


const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
//citiesId = [];
citiesId.push("tokyo");
console.log(citiesId);

let getWeather = (cityId) => {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}

console.log(getWeather(favoriteCityId));
// console.log(getWeather("new-york")); // { city: 'NEW-YORK', temperature: 20 }

const weather = getWeather(favoriteCityId);

console.log(weather);

const city = weather.city;
const temperature = weather.temperature;

console.log(city);
console.log(temperature);

/* Rest operator :
affecte les constantes parisId, nycId et othersCitiesId
par les valeurs du tableau citiesId :
parisId prend la valeur de citiesId[0]
nycId prend la valeur de citiesId[1]
othersCitiesId prend la valeur du reste du tableau ;
soit othersCities = [citiesId[2], citiesId[3], citiesId[4]]
*/
const [parisId, nycId, ...othersCitiesId] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

class Trip {
    constructor(id, name, imageUrl) {
        this._id = id;
        this._name = name;
        this._imageUrl = imageUrl;
    }

    toString() {
        return `Trip [${this._id}, ${this._name}, ${this._imageUrl}, ${this._price}]`;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}

const parisTrip = new Trip("paris", "Paris", "img/paris.jpg");

console.log(parisTrip);
console.log(parisTrip.toString());

parisTrip._price = 100;
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

class FreeTrip extends Trip {
    constructor(id, name, imageUrl, price) {
        super(id, name, imageUrl);
        this._price = price || 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");
console.log(freeTrip.toString());

class TripService {

    constructor() {
        // TODO Set of 3 trips
        this._trips = new Set();
        this._trips.add(parisTrip);
        this._trips.add(freeTrip);
        this._trips.add(defaultTrip);
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                let tripFound = false;
                this._trips.forEach(trip => {
                    if (trip._name == tripName) {
                        tripFound = true;
                        resolve(trip);
                    }
                });
                if (!tripFound) {
                    reject(`No trip with name ${tripName}`);
                }
            }, 2000)
        });
    }
}

const tripByName = new TripService();
const promiseParis$ = tripByName.findByName("Paris"); // promesse OK
const promiseToulouse$ = tripByName.findByName("Toulouse"); // promesse NOK

promiseParis$
    .then(trip => console.log(`Trip found : ${trip.toString()}`))
    .catch((error) => console.error(`I AM ERROR.\n${error}`));

promiseToulouse$
    .then(trip => console.log(`Trip found : ${trip.toString()}`))
    .catch((error) => console.error(`I AM ERROR.\n${error}`));

class PriceService {

    constructor() {
        // TODO Map of 2 trips
        this._priceMap = new Map();
        this._priceMap.set('paris', 100);
        this._priceMap.set('rio-de-janeiro', 800);
        this._priceMap.set('nantes'); // no price for 'nantes'
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone

                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                let tripIdFound = false;
                if (this._priceMap.has(tripId)) {
                    tripIdFound == true;
                    const price = this._priceMap.get(tripId);
                    resolve(price);
                } else {
                    reject(`No price for trip id ${tripId}`);
                }

            }, 2000)
        });
    }
}

const priceById = new PriceService();
// promesse OK
const promiseRio$ = priceById.findPriceByTripId("rio-de-janeiro");
// promesse NOK
const promiseNantes$ = priceById.findPriceByTripId("Nantes");

promiseRio$
    .then(price => console.log(`Price found : ${price}`))
    .catch((error) => console.error(`I AM ERROR.\n${error}`));

promiseNantes$
    .then(price => console.log(`Price found : ${price}`))
    .catch((error) => console.error(`I AM ERROR.\n${error}`));

// recherche de l'objet trip correspondant au nom entré en paramètre
const promisePriceByName$ = tripByName.findByName("Rio de Janeiro"); 
promisePriceByName$
    .then(trip =>priceById.findPriceByTripId(`${trip._id}`))
    .then(price => console.log(`Price found : ${price}`))
    .catch((error) => console.error(`I AM ERROR.${error}`));