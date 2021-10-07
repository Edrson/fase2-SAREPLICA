"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resGen_1 = require("./../models/resGen");
//paquete de mongodb
const { MongoClient } = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
class UserDB {
    //^Agregar usuario a la base de datos
    DB_AddUser(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let rg = new resGen_1.resGen();
            try {
                yield client.connect();
                rg = yield this.excuteAddUserDb(client, item);
                //rg.data = result.data;
                //rg.message = result.message;
                //rg.valid = result.valid;
                //rg.valid = true;
            }
            catch (e) {
                rg.valid = false;
                rg.message = e.message;
            }
            finally {
                return rg;
            }
        });
    }
    //^Ejecutar llamada a la base de datos para insertar usuario
    excuteAddUserDb(client, objeto) {
        return __awaiter(this, void 0, void 0, function* () {
            let rg = new resGen_1.resGen();
            try {
                //const result = await client.db("SAProject").collection("Usuario").insertOne(objeto);
                const result = yield client.db("SAProject").collection("Usuario").insertOne(objeto);
                //console.log(result);
                rg.valid = true;
                rg.data = result;
                rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
            }
            catch (e) {
                rg.valid = false;
                if (e.message.includes("duplicate")) {
                    //console.error("el correo ya esta registrado");
                    rg.message = "El correo ya se encuentra registrado";
                }
                else {
                    rg.message = e.message;
                }
                //console.error(error);
            }
            finally {
                return rg;
            }
        });
    }
}
exports.default = UserDB;
//# sourceMappingURL=UserDB.js.map