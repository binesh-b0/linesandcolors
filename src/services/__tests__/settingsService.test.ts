import {
  fetchUserSettings,
  saveUserSettings,
  fetchBillingDetails,
  saveBillingDetails,
  addAddress,
  updateAddress,
  deleteAddress,
} from '@/services/settingsService'; // Import service functions to test
import { getUserSettings, updateUserSettings, getBillingDetails, updateBillingDetails } from '@/models/Settings'; // Mocked model functions
import { AddressModel } from '@/models/Address'; // Mocked model functions for address

// Mocking the models
jest.mock('@/models/Settings');
jest.mock('@/models/Address');

describe('Settings Service', () => {
  const mockUserId = 'user-1';
  const mockSettings = {
    id: 'settings-1',
    user_id: mockUserId,
    dark_mode: true,
    email_updates: false,
    sms_notifications: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const mockBillingDetails = {
    id: 'billing-1',
    user_id: mockUserId,
    billing_address_id: 'address-1',
    payment_method: 'credit_card',
    created_at: new Date(),
    updated_at: new Date(),
  };
  const mockAddress = {
    id: 'address-1',
    user_id: mockUserId,
    title: 'Home',
    address_line_1: '123 Main St',
    address_line_2: '',
    country: 'USA',
    city: 'New York',
    postal_code: '10001',
    landmark: '',
    phone_number: '1234567890',
    created_at: new Date(),
    deleted_at: null,
  };

  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test fetchUserSettings
  describe('fetchUserSettings', () => {
    it('should fetch user settings by user ID', async () => {
      (getUserSettings as jest.Mock).mockResolvedValue(mockSettings);

      const settings = await fetchUserSettings(mockUserId);

      expect(getUserSettings).toHaveBeenCalledWith(mockUserId);
      expect(settings).toEqual(mockSettings);
    });
  });

  // Test saveUserSettings
  describe('saveUserSettings', () => {
    it('should update user settings', async () => {
      (updateUserSettings as jest.Mock).mockResolvedValue(mockSettings);

      const updatedSettings = await saveUserSettings(mockSettings);

      expect(updateUserSettings).toHaveBeenCalledWith(mockSettings);
      expect(updatedSettings).toEqual(mockSettings);
    });
  });

  // Test fetchBillingDetails
  describe('fetchBillingDetails', () => {
    it('should fetch billing details by user ID', async () => {
      const mockResult = {
        billingDetails: mockBillingDetails,
        addresses: [mockAddress],
      };
      (getBillingDetails as jest.Mock).mockResolvedValue(mockResult);

      const billingDetails = await fetchBillingDetails(mockUserId);

      expect(getBillingDetails).toHaveBeenCalledWith(mockUserId);
      expect(billingDetails).toEqual(mockResult);
    });
  });

  // Test saveBillingDetails
  describe('saveBillingDetails', () => {
    it('should update billing details', async () => {
      (updateBillingDetails as jest.Mock).mockResolvedValue(mockBillingDetails);

      const updatedBillingDetails = await saveBillingDetails(mockBillingDetails);

      expect(updateBillingDetails).toHaveBeenCalledWith(mockBillingDetails);
      expect(updatedBillingDetails).toEqual(mockBillingDetails);
    });
  });

  // Test addAddress
  describe('addAddress', () => {
    it('should add a new address', async () => {
      (AddressModel.createAddress as jest.Mock).mockResolvedValue(mockAddress);

      const newAddress = await addAddress(mockAddress);

      expect(AddressModel.createAddress).toHaveBeenCalledWith(mockAddress);
      expect(newAddress).toEqual(mockAddress);
    });
  });

  // Test updateAddress
  describe('updateAddress', () => {
    it('should update an existing address', async () => {
      (AddressModel.updateAddress as jest.Mock).mockResolvedValue(mockAddress);

      const updatedAddress = await updateAddress(mockAddress.id, mockAddress);

      expect(AddressModel.updateAddress).toHaveBeenCalledWith(mockAddress.id, mockAddress);
      expect(updatedAddress).toEqual(mockAddress);
    });
  });

  // Test deleteAddress
  describe('deleteAddress', () => {
    it('should delete an address by ID', async () => {
      (AddressModel.deleteAddress as jest.Mock).mockResolvedValue(undefined);

      await deleteAddress(mockAddress.id);

      expect(AddressModel.deleteAddress).toHaveBeenCalledWith(mockAddress.id);
    });
  });
});
