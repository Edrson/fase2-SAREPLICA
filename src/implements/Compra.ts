import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const { MongoClient } = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
var nodemailer = require('nodemailer');

class Compra {

  //^ Realizar la compra de uno o varios productos  ---------------------------------------------------------------------------------
  async FGRegistraCompra(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      //console.log(req.body);
      rg = await this.FGRegistraCompraBD(req);
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
      console.log("Error en metodo FGRegistraCompra");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGRegistraCompraBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
        const result = await client.db("SAProject").collection("Compra").insertOne(req.body);
        rg.valid = true;
        rg.data = result;
        await this.Notificacion(req.body.cliente, JSON.stringify(req.body, null, 2));
        //rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
    } finally {
      return rg;
    }
  }

  
   //CONSULTA COMPRAS POR CLIENTE
   async FGConsultaCompraCliente(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGConsultaCompraClienteBD(req.params.idcliente);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL - CONSULTA COMPRA CLIENTE",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Error en metodo FGConsultaSubastaID");
      res.statusCode = 500;
    }
  }

  async FGConsultaCompraClienteBD(id:string): Promise<any> {
    const rg = new resGen();
    try {
   
      const cursor = await client.db("SAProject").collection("Compra").find({"cliente":id});
      const result = await cursor.toArray();
      
      rg.valid = true;
      rg.data = result;
      
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }

   //CONSULTA COMPRAS POR VENDEDOR
   async FGConsultaVenta(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGConsultaVentaBD(req.params.idproveedor);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL - CONSULTA VENTA",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Error en metodo FGConsultaSubastaID");
      res.statusCode = 500;
    }
  }

  async FGConsultaVentaBD(id:string): Promise<any> {
    const rg = new resGen();
    try {
   

      const cursor = await client.db("SAProject").collection("Compra").aggregate([
        {
          $unwind: "$detalle"
        },
        {
          $match: {"detalle.proveedor": id}
        }
      ])
      const result = await cursor.toArray();
      
      rg.valid = true;
      rg.data = result;
      
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }
  //^ Enviar notificacion de compra ---------------------------------------------------------------------------------
  async Notificacion(receptor:string, compra:string): Promise<any> {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '451432@gmail.com',
        pass: '59580532'
      }
    });
    
    var mailOptions = {
      from: 'AdministradorTangoCart@gmail.com',
      to: receptor,
      subject: 'Notificación de Compra',
      text: compra
    };

    transporter.sendMail(mailOptions, function(error: Error, info: any){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

}

export default Compra;
