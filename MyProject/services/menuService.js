import * as SQLite from 'expo-sqlite';

const url = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API';
const db = SQLite.openDatabase("little_lemon");

export const fetchMenu = async () => {
    try {
      const response = await fetch(`${url}/main/capstone.json`);
      const jsonResp = await response.json();
      return jsonResp;
    }
    catch(error){
      console.log('error', error);
      return [];
    }
}

export const saveMenuInDB = async (menu) =>
{
  return new Promise((resolve, reject) => {
  try{

    db.transaction(async (tx) => {
      tx.executeSql(
        ` CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price NUMERIC NOT NULL, description TEXT NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL
            );`
      );
     let success = true;
      // Use Promise.all to wait for all insertions to complete
      await Promise.all(menu.map(async (item) => {
        return new Promise((resolve, reject) => {
          tx.executeSql(
            'insert into menu_items (name, price, description, image, category) values(?, ?, ?, ?, ?)',
            [item.name, item.price, item.description, item.image, item.category],
            (tx, results) => {
              console.log('Insertion successful', results);
              resolve(results);
            },
            (tx, error) => {
              console.log('Error inserting data', error);
              success=false;
              reject(error);
            }
          );
        });
      }));
      resolve(success)
    });
  } catch (error) {
    console.error('Error saving menu items:', error);
    reject(error)
  }
});

}




export const getMenuItems = (categoryFilters,matchText) => {
  return new Promise((resolve, reject) => {
    let whereFilter = '';
    if(categoryFilters.length > 0)
    {
      whereFilter = `WHERE category IN (${categoryFilters.map(filter => `'${filter}'`).join(',')})`;
    }
    if(matchText !== '')
    {
      whereFilter = whereFilter.concat(whereFilter == ''?'WHERE':' AND').concat(` name LIKE '%${matchText}%'`);
    }
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS menu_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, price NUMERIC NOT NULL, description TEXT NOT NULL,
                  image TEXT NOT NULL, category TEXT NOT NULL
                  );`
        );
        tx.executeSql(`select * from menu_items ${whereFilter};`, [], (_, { rows }) => {
          const menu = rows._array;
          resolve(menu);
        });
      } catch (error) {
        console.error("ERROR GETTING MENU", error);
        reject(error);
      }
    });
  });
};


export const cleanTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      try {
        tx.executeSql(`DELETE FROM menu_items;`
        );
          resolve();
      } catch (error) {
        console.error("ERROR CLEANING TABLE", error);
        reject(error);
      }
    });
  });
};

export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};