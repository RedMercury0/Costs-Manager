const idb_module = {
    db: null,

    openCostsDB: async (dbName, dbVersion) => {
        if (!idb_module.db) {
            idb_module.db = await new Promise((resolve, reject) => {
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
        return idb_module;
    },

    addCost: async ({ sum, category, description, day, month, year }) => {
        const db = await idb_module.openCostsDB("costsdb", 1);
        return new Promise((resolve, reject) => {
            const transaction = db.db.transaction(['costs'], 'readwrite');
            const objectStore = transaction.objectStore('costs');

            // Check if all required parameters are provided and valid
            if (!sum || isNaN(sum) || !category || !description ) {
                throw new Error("Missing or invalid parameters");
            }


            // Get current date if not provided
            if(!day && !month && !year){
                const currentDate = new Date();
                day = currentDate.getDate();
                month = currentDate.getMonth() + 1; // Month is 0-based
                year = currentDate.getFullYear();
            }
            // Check if the date is valid
            else if (
                day < 1 || day > 31 ||
                month < 1 || month > 12 ||
                year < 1970 || year > 2100) {
                throw new Error("Invalid date");
            }


            const requestAdd = objectStore.add({
                sum,
                category,
                description,
                day,
                month,
                year
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
        // Check if the month and year are provided and if they are valid
        if (!month || isNaN(month) || !year || isNaN(year)) {
            throw new Error("Invalid month or year");
        }

        // Check if there are records for the month and year specified
        const db = await idb_module.openCostsDB("costsdb", 1);
        return new Promise((resolve, reject) => {
            const transaction = db.db.transaction(['costs'], 'readonly');
            const objectStore = transaction.objectStore('costs');
            const request = objectStore.getAll();

            request.onsuccess = () => {
                const allCosts = request.result;
                const filteredCosts = allCosts.filter(cost => parseInt(cost.year) === parseInt(year) && parseInt(cost.month) === parseInt(month));
                if (filteredCosts.length === 0) {
                    reject("No records exists for the specified date");
                } else {
                    resolve(filteredCosts);
                }
            };

            request.onerror = () => {
                reject("Error fetching costs");
            };
        });
    }

};

export default idb_module;
