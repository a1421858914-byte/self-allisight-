import { WorkItem } from '../types';

const DB_NAME = 'AllInsightDB';
const STORE_NAME = 'works';
const VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const saveWork = async (work: WorkItem): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(work);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getAllWorks = async (): Promise<WorkItem[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    // Get all and sort by date descending manually or via index if we added one
    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result as WorkItem[];
      // Sort in memory for simplicity
      resolve(result.sort((a, b) => b.createdAt - a.createdAt));
    };
    request.onerror = () => reject(request.error);
  });
};