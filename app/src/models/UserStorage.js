"use Strict";

const db = require("../config/db");

class UserStorage {
   static #getUserInfo(data, id) {
      const users = JSON.parse(data);
      const idx = users.id.indexOf(id);
      const userInfo = Object.keys(users).reduce((newUser, info) => {
         newUser[info] = users[info][idx];
         return newUser;
      }, {});

      return userInfo;
   }

   static #getUsers(data, isAll, fields) {
      const users = JSON.parse(data);
      if (isAll) return users;

      const newUsers = fields.reduce((newUsers, filed) => {
         if (users.hasOwnProperty(filed)) {
            newUsers[filed] = users[filed];
         }
         return newUsers;
      }, {});
      return newUsers;
   }

   static getUserInfo(id) {
      return new Promise((resolve, reject) => {
         const query = "SELECT * FROM users WHERE id = ?;";
         db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            else resolve(data[0]);
         });
      });
   }

   static async save(userInfo) {
      return new Promise((resolve, reject) => {
         const query = "INSERT INTO users(id, name, psword) VALUES (?, ?, ?);";
         db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
            if (err) reject(`${err}`);
            else resolve({ success: true });
         });
      });
   }
}

module.exports = UserStorage;
