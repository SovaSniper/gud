export interface User {
  username: string;         // For login or public handle
  password: string;         // Hashed password (never store plain text)
  gender: string;           // e.g., 'male', 'female', 'non-binary'
  age: number;              // Can validate 18+
  location?: string;        // Optional (city, geo info, etc.)
  bio?: string;             // Optional user description
  photos: string[];         // Array of image URLs
  createdAt?: Date;         // Optional timestamp
}