import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageManager {
  constructor() {}

  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`Data for key "${key}" successfully stored!`);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null; // Parse if not null
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  async updateItem(key, newValue) {
    try {
      const oldValue = await this.getItem(key);
      if (oldValue !== null) {
        const updatedValue = {...oldValue, ...newValue}; // Merge changes
        await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
        console.log(`Data for key "${key}" successfully updated!`);
      } else {
        console.warn(`Key "${key}" not found for update.`);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data for key "${key}" successfully deleted!`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
}

// Usage example (remains unchanged)
export const storageManager = new AsyncStorageManager();
