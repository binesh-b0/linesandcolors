// import {supabase} from '@/config/supabaseClient';
// import { UserModel } from '@/models/User';

// // Get user session
// export const getSession = async () => {
//   const { data: { session } } = await supabase.auth.getSession();
//   return session;
// };

// export const getUser =async () => {
//   const { data: { user } } = await supabase.auth.getUser();
//   return user;
  
// }

// // Get user details
// export const getUserDetails = async () => {
//   const session = await getSession();
//   if (!session) return null;

//   const { data, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('id', session.user.id)
//     .single();
  
//   if (error) {
//     throw new Error(error.message);
//   }
  
//   return data;
// };

// // Update user details
// export const updateUserDetails = async (details) => {
//   const { error } = await supabase.from('users').update(details).eq('id', details.id);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Change user password
// export const changePassword = async (newPassword) => {
//   const { error } = await supabase.auth.updateUser({ password: newPassword });
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Delete user account
// export const deleteUserAccount = async () => {
//   const session = await getSession();
//   if (!session) return;

//   const { error } = await supabase.auth.api.deleteUser(session.access_token);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Get user preferences
// export const getPreferences = async () => {
//   const session = await getSession();
//   if (!session) return null;

//   const { data, error } = await supabase
//     .from('preferences')
//     .select('*')
//     .eq('user_id', session.user.id)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

// // Update user preferences
// export const updatePreferences = async (preferences) => {
//   const { error } = await supabase.from('preferences').update(preferences).eq('user_id', preferences.user_id);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Get notification settings
// export const getNotificationSettings = async () => {
//   const session = await getSession();
//   if (!session) return null;

//   const { data, error } = await supabase
//     .from('notification_settings')
//     .select('*')
//     .eq('user_id', session.user.id)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

// // Update notification settings
// export const updateNotificationSettings = async (settings) => {
//   const { error } = await supabase.from('notification_settings').update(settings).eq('user_id', settings.user_id);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Get billing details
// export const getBillingDetails = async () => {
//   const session = await getSession();
//   if (!session) return null;

//   const { data, error } = await supabase
//     .from('billing_details')
//     .select('*')
//     .eq('user_id', session.user.id)
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

// // Update billing details
// export const updateBillingDetails = async (details) => {
//   const { error } = await supabase.from('billing_details').update(details).eq('user_id', details.user_id);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// // Fetch user by ID
// const fetchUser = async (userId: string) => {
//   const user = await UserModel.getUserById(userId);
//   if (user) {
//     console.log('User:', user);
//   }
// };

// // Create a new user
// const createUser = async () => {
//   const newUser = {
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'johndoe',
//     email: 'john.doe@example.com',
//     password: 'securepassword',
//   };
//   const user = await UserModel.createUser(newUser);
//   if (user) {
//     console.log('Created User:', user);
//   }
// };

// // Update an existing user
// const updateUser = async (userId: string) => {
//   const updates = {
//     first_name: 'Jane',
//     last_name: 'Doe',
//   };
//   const user = await UserModel.updateUser(userId, updates);
//   if (user) {
//     console.log('Updated User:', user);
//   }
// };

// // Delete a user
// const deleteUser = async (userId: string) => {
//   await UserModel.deleteUser(userId);
//   console.log('User deleted');
// };
