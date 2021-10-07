import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const { MongoClient } = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
var ObjectID = require('mongodb').ObjectId;


class Puja {

  //^ Agregar una puja a una subasta especifica -----------------------------------------------------------------------------
  async FGRegistraPuja(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      console.log(req.body);
      rg = await this.FGRegistraPujaBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Error en metodo FGRegistraPuja");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGRegistraPujaBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      const result = await client
        .db("SAProject")
        .collection("Subasta")
        .updateOne(
          { _id: ObjectID(req.body.id) },
          {
            $push: {
              pujas: {
                usuario: req.body.usuario,
                puja: req.body.puja,
                fecha_hora: req.body.fecha_hora
              },
            },
          }
        );
      rg.valid = true;
      rg.data = result;
      //rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }
}

export default Puja;
