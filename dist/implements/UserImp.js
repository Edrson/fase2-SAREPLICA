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
class UserImp {
    constructor(Adduser) {
        this.AddUser = Adduser;
    }
    FGUserAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rg = new resGen_1.resGen();
            try {
                rg = yield this.AddUser.DB_AddUser(req.body);
                if (rg.valid == true) {
                    res.json({ statusCode: res.statusCode, message: "OPERATION_SUCCESFULL", body: req.body });
                    return;
                }
                else {
                    res.statusCode = 500;
                    res.json({ statusCode: res.statusCode, message: rg.message });
                    return;
                }
            }
            catch (error) {
                res.statusCode = 500;
                res.json({ statusCode: res.statusCode, message: rg.message });
                return;
            }
        });
    }
}
exports.default = UserImp;
//# sourceMappingURL=UserImp.js.map