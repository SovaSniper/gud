export interface GooglePlacesSearchTextRequest {
    textQuery: string
}

export interface GooglePlacesSearchTextResponse {
    places: GooglePlace[];
}

export interface GooglePlace {
    id: string;
    formattedAddress: string;
    displayName: GooglePlaceDisplayName;
}

export interface GooglePlaceDisplayName {
    text: string;
    languageCode: string;
}

export const placesSearchText = async (resquest: GooglePlacesSearchTextRequest): Promise<GooglePlacesSearchTextResponse> => {
    return {
        "places": [
            {
                "id": "ChIJe7xA6xGWEmsRV38_Ro9DX5c",
                "formattedAddress": "1 Bartley St, Canley Vale NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra-Vale Diggers Club",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJp20b_Q6WEmsRmBeYUS49gZw",
                "formattedAddress": "82 Longfield St, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra Bowls",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJpyFicEGXEmsRwOtS5NlIRNE",
                "formattedAddress": "level 1, Shop 6/50 Park Rd, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Zaap by Chang Thai Lao Restaurant",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJ52BJ3J-XEmsRx-40cjlAFaQ",
                "formattedAddress": "1 Bartley St, Canley Vale NSW 2166, Australia",
                "displayName": {
                    "text": "Sports Arena Cabra-Vale",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJi_Gyng6XEmsRWkLuN-e5J6U",
                "formattedAddress": "shop 16/180 Railway Pde, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Krazy Bird Cabramatta",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJ11QQg-6XEmsRe1neJOwKs6k",
                "formattedAddress": "shop 4/246 Cabramatta Rd W, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra Muay Thai",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJIXPL8A6WEmsRULwV2ikznME",
                "formattedAddress": "174-176 Cabramatta Rd W, Cabramatta West NSW 2166, Australia",
                "displayName": {
                    "text": "Cabramatta Hotel",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJjZcD43SXEmsRd7N9l0i-8Ns",
                "formattedAddress": "shop 12/47 Park Rd, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Hương Quê",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJRdBgBtAsDogRyPCWhE3hjeo",
                "formattedAddress": "200 N Green St, Chicago, IL 60607, USA",
                "displayName": {
                    "text": "Cabra",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJ8RjY-QuWEmsR8EQ_LZw9MWM",
                "formattedAddress": "Unit 4 First Floor/175 Hume Hwy, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra Kai Academy",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJEZOtOXiXEmsRPXR7LfuW8zs",
                "formattedAddress": "1/4 Hughes St, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cô Ba Cabramatta",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJd3ot64mXEmsRqga27YAZnoA",
                "formattedAddress": "3/225 Cabramatta Rd W, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "3Q QUAY QUAN QUAN",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJWTJ01wqXEmsR5Yhe4MMdMcw",
                "formattedAddress": "82 Longfield St, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra Fight Store",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJ72maiVuXEmsRiaSIAon5axA",
                "formattedAddress": "50 Park Rd, Cabramatta NSW 2166, Australia",
                "displayName": {
                    "text": "Cabra Juice",
                    "languageCode": "en"
                }
            },
            {
                "id": "ChIJi4RTQFC9EmsRQOHdFodjyww",
                "formattedAddress": "50 Vine St, Fairfield NSW 2165, Australia",
                "displayName": {
                    "text": "Cabra Vale Diggers Fairfield Athletics",
                    "languageCode": "en"
                }
            }
        ]
    }
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("X-Goog-Api-Key", process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "");
    // myHeaders.append("X-Goog-FieldMask", "places.id,places.displayName,places.formattedAddress");

    // const raw = JSON.stringify(resquest);

    // try {
    //     const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "manual"
    //     });
    //     const result: GooglePlacesSearchTextResponse = await response.json();
    //     return result;
    // } catch (error) {
    //     console.error(error);
    //     return { places: [] }
    // };
}