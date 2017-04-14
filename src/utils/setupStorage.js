import MemoryStorage from 'memorystorage';
import { isLocalStorageAvailable } from './checkers';
import { storage } from '../constants';

export const setupStorage = () => {
  storage.value = (isLocalStorageAvailable()) ? global.localStorage : new MemoryStorage();
};
