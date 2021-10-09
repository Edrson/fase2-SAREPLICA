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
const axios = require('axios');
class UserLogin {
    //^Verifica las credenciales de un usuario para permitirlo ingresar al sistema
    FGLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGLoginBD(req);
                if (rg.valid == true) {
                    //TODO verificar la respuesta de la base de datos, si las credenciales son correctas o incorrectas, y verificar tipo de usuario
                    //^Si las credenciales son correctas setear variable log en true
                    let log = true;
                    //se hace post al endpoint del jwt para obtener un token
                    // axios.post('http://localhost:3001/jwt/login', {
                    //   username: req.body._id
                    // })
                    // .then((resp: any) => {
                    //   //console.log(`statusCode: ${resp.status}`)
                    //   console.log(resp.data.token)
                    //   res.json({
                    //     statusCode: res.statusCode,
                    //     message: "OPERATION_SUCCESFULL",
                    //     login: {
                    //       correct: log,
                    //       userType: rg.data.tipo,
                    //       token: resp.data.token
                    //     },
                    //   });
                    // })
                    // .catch((error: any) => {
                    //   console.error(error)
                    // })
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        login: {
                            correct: log,
                            userType: rg.data.tipo,
                        },
                    });
                }
                else {
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                        login: {
                            correct: false,
                            userType: null,
                            token: null
                        },
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGLogin");
                res.statusCode = 500;
                res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGLoginBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //console.log();
                const result = yield client.db("SAProject").collection("Usuario").findOne({ _id: req.body._id, password: req.body.password });
                if (result) {
                    rg.valid = true;
                    rg.data = result;
                }
                else {
                    rg.valid = false;
                    //rg.data = result;
                    rg.message = "Credenciales no válidas";
                }
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
exports.default = UserLogin;
//# sourceMappingURL=UserLogin.js.map