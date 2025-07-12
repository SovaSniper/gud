import { Event } from "./event";
import { User } from "./user";

/**
 * A public-facing user object without sensitive data
 */
export interface PublicUser extends Omit<User, 'hashedPassword'> {
  events?: Event[];
}