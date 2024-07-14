import { Address,AddressModel } from '@/models/Address';
import { getUserSettings, updateUserSettings, getBillingDetails, updateBillingDetails, Settings, BillingDetails } from '@/models/Settings';



/**
 * Fetch user settings by user ID
 * @param userId - User ID
 * @returns User settings
 */
export const fetchUserSettings = async (userId: string) => {
  console.log("fetchUserSettings")
  return await getUserSettings(userId);
};

/**
 * Update user settings
 * @param settings - Partial settings object
 * @returns Updated user settings
 */
export const saveUserSettings = async (settings: Partial<Settings>) => {
  return await updateUserSettings(settings);
};

/**
 * Fetch billing details by user ID
 * @param userId - User ID
 * @returns Billing details
 */
export const fetchBillingDetails = async (userId: string) => {
  return await getBillingDetails(userId);
};

/**
 * Update billing details
 * @param details - Partial billing details object
 * @returns Updated billing details
 */
export const saveBillingDetails = async (details: Partial<BillingDetails>) => {
  return await updateBillingDetails(details);
};
/**
 * Adds address into address table
 * @param address 
 * @returns new address
 */
export const addAddress = async (address: Partial<Address>) => {
  return await AddressModel.createAddress(address);
};
/**
 * Updates address in address table
 * @param id 
 * @param updates 
 * @returns updated address
 */
export const updateAddress = async (id: string, updates: Partial<Address>) => {
  return await AddressModel.updateAddress(id, updates);
};
/**
 * 
 * @param id 
 * @returns 
 */
export const deleteAddress = async (id: string) => {
  return await AddressModel.deleteAddress(id);
};