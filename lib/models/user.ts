/**
 * Represents a registered user in the system.
 */
export interface User {
  /**
   * Unique public username or identifier (e.g. @johndoe)
   */
  handler: string;

  /**
   * 
   */
  email: string;

  /**
   * User's first name
   */
  firstName: string;

  /**
   * User's last name or surname
   */
  surname: string;

  /**
   * Securely hashed password
   */
  hashedPassword: string;

  /**
   * Optional short biography or profile description
   */
  bio?: string;

  /**
   * Date when the user account was created
   */
  createdAt: Date;

  // Linked or Socials todo
}
