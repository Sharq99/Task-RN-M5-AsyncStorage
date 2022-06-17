import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }
  addItem = async (item) => {
    this.items.push(item);
    await AsyncStorage.setItem('items', JSON.stringify(this.items));
  };

  getItemsCount() {
    return this.items.length;
  }
  getTotalPrice() {
    if (this.items.length === 0) {
      return 0;
    }
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getItems = () => {
    return this.items;
  };

  fetchItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('items')
      if(jsonValue !== null) return this.items = JSON.parse(jsonValue);
      else return this.items = [];
    } catch(e) {
      console.error(e);
    }
  };

  clearCart = async () => {
    try {
      await AsyncStorage.removeItem('items');
      this.items = [];
      // await AsyncStorage.setItem('items', JSON.stringify(this.items))
    } catch(e) {
      console.error(e);
    }
  
    
  }
}

const cartStore = new CartStore();
cartStore.fetchItems();

export default cartStore;
