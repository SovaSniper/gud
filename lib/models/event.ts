export interface Event {
    sharableId: string;         // Used for get and share. NanoId    
    imageId?: string;            // id reference from image storage    
    creatorId: string;
    title: string;
    description?: string;
    location: Place;            // This comes from Google Places
    startTime: Date;
    endTime?: Date;
    visibility: string;
    createdAt: Date;
}

export interface Place {
    id: string;
    formattedAddress: string;
    displayName: GooglePlaceDisplayName;
}

export interface GooglePlaceDisplayName {
    text: string;
    languageCode: string;
}
