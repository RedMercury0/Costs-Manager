const idb = {
    db: null,

    openCostsDB: async (dbName, dbVersion) => {
        if (!idb.db) {
            idb.db = await new Promise((resolve, reject) => {
                const request = indexedDB.open(dbName, dbVersion);

                request.onerror = (event) => {
                    reject("Error opening database");
                };

                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('costs')) {
                        db.createObjectStore('costs', { keyPath: 'id', autoIncrement: true });
                    }
                };
            });
        }
        return idb;
    },

    addCost: async ({ sum, category, description, day, month, year }) => {
        const db = await idb.openCostsDB("costsdb", 1);
        return new Promise((resolve, reject) => {
            const transaction = db.db.transaction(['costs'], 'readwrite');
            const objectStore = transaction.objectStore('costs');

            // Get current date if not provided
            const currentDate = new Date();
            const currentDay = day || currentDate.getDate();
            const currentMonth = month || currentDate.getMonth() + 1; // Month is 0-based
            const currentYear = year || currentDate.getFullYear();

            const requestAdd = objectStore.add({
                sum,
                category,
                description,
                day: currentDay,
                month: currentMonth,
                year: currentYear
            });

            requestAdd.onsuccess = () => {
                resolve("Cost added successfully");
            };

            requestAdd.onerror = () => {
                reject("Error adding cost");
            };
        });
    },

    getCostsByMonthAndYear: async (month, year) => {
        const db = await idb.openCostsDB("costsdb", 1);
        return new Promise((resolve, reject) => {
            const transaction = db.db.transaction(['costs'], 'readonly');
            const objectStore = transaction.objectStore('costs');
            const request = objectStore.getAll();

            request.onsuccess = () => {
                const allCosts = request.result;
                const filteredCosts = allCosts.filter(cost => parseInt(cost.year) === parseInt(year) && parseInt(cost.month) === parseInt(month));
                resolve(filteredCosts);
            };

            request.onerror = () => {
                reject("Error fetching costs");
            };
        });
    }



};

// Expose idb globally
window.idb = idb;