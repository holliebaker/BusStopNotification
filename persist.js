import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_SERVICES = 'fav_services'

export const readFavourites = () => 
    AsyncStorage.getItem(FAV_SERVICES)
    .then(s => JSON.parse(s) || [])

export const storeFavourite = favourite => 
    readFavourites().then(favs => 
        AsyncStorage.setItem(FAV_SERVICES, JSON.stringify([favourite, ...favs]))
    )

export const removeStoredFavourite = serviceId =>
    readFavourites().then(favs => 
        AsyncStorage.setItem(FAV_SERVICES, JSON.stringify(favs.filter(({ id }) => id === serviceId)))
    )

export const clearStoredFavourites = () =>
    AsyncStorage.setItem(FAV_SERVICES, JSON.stringify([]))

    