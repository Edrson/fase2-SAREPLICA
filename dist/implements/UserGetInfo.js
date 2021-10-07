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
const resGen_1 = require("../models/resGen");
//paquete de mongodb
const { MongoClient } = require('mongodb');
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
class UserGetInfo {
    //^Obtiene los datos de un usuario
    FGGetInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGGetInfoBD(req.params.iduser);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({ statusCode: res.statusCode, message: rg.message });
                }
            }
            catch (error) {
                console.log("Error en metodo FGGetInfo");
                //console.log(error);
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGGetInfoBD(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                const result = yield client.db("SAProject").collection("Usuario").findOne({ _id: user });
                rg.valid = true;
                //rg.data = { nombre: result.nombre + ' ' + result.apellido, _id: result._id };
                rg.data = result;
            }
            catch (error) {
                rg.valid = false;
                rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
}
exports.default = UserGetInfo;
//# sourceMappingURL=UserGetInfo.js.map