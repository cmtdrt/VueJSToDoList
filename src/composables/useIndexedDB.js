export function useIndexedDB(dbName, storeName) {
  return {
    async saveToDB(data) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          store.put(data, 'todos');
          transaction.oncomplete = () => resolve();
          transaction.onerror = (error) => reject(error);
        };

        request.onerror = (error) => reject(error);
      });
    },

    async loadFromDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const getRequest = store.get('todos');

          getRequest.onsuccess = () => {
            resolve(getRequest.result || []);
          };

          getRequest.onerror = (error) => reject(error);
        };

        request.onerror = (error) => reject(error);
      });
    },
  };
}
