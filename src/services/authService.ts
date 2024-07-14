import { supabase } from '@/config/supabaseClient';
import { UserAttributes } from '@supabase/supabase-js';
import { UserModel,User } from '@/models/User';
import { AuthError } from '@supabase/supabase-js';

/**
 * Get the current session.
 * @returns The current user object.
 * @throws Will throw an error if fetching session fails.
 * @returns
 */
export const getSession = async (): Promise<User> => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) throw new Error(error.message || 'No session found');
  return data.session
};

/**
 * Sign up a new user.
 * @param email - The user's email.
 * @param password - The user's password.
 * @param firstName - The user's first name.
 * @param lastName - The user's last name.
 * @returns The signed-up user's data and any error encountered.
 */
export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  if (error) throw new Error(error.message);
  // Create the user in the database
  const user = data.user;
  if (user) {
    await UserModel.createUser({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: user.email,
      created_at: new Date(),
      updated_at: new Date(),
      // Add any other necessary fields
    });
  }
  return data;
};

/**
 * Verify the user's email.
 * @param accessToken - The user's access token.
 * @returns The updated user data.
 */
export const verifyEmail = async (accessToken: UserAttributes) => {
  const { data, error } = await supabase.auth.updateUser(accessToken, { email_confirm: true });
  if (error) throw new Error(error.message);
  return data;
};

/**
 * Sign in a user with email and password.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The signed-in user's data and any error encountered.
 */
export const signInWithPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data.user;
};

/**
 * Send a password reset email to the user.
 * @param email - The user's email.
 */
export const sendPasswordResetEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
};

/**
 * Reset the user's password.
 * @param token - The password reset token.
 * @param newPassword - The new password.
 */
export const resetPassword = async (token: string, newPassword: string) => {
  const { error } = await supabase.auth.updateUser(token, { password: newPassword });
  if (error) throw new Error(error.message);
};

/**
 * Sign out the current user.
 */
export const signOut = async () => {
  console.log("signining ouuut")
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

/**
 * Delete the user
 * @param userId 
 */
export const deleteUserAccount = async (userId: string) => {
  await UserModel.deleteUser(userId);
  console.log('User deleted');
};

/**
 * 
 * @param userId 
 * @returns User
 */
export const getUserDetails = async (userId:string) => {
  const user: User | null = await UserModel.getUserById(userId);
  console.log("returned user",user)
  return user;
}