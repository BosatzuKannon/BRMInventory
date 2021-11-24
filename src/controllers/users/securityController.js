// // const Session = require('../models').sesiones_wiser;
// const User = require('../../models/users').users;
// // const Unit = require('../../commons/models').unidad;
// // const UnitUser = require('../models').unidadusuario;
// // const Permission = require('../models').permisos_wiser
// // const Module = require('../models').modulos_wiser
// // const Utils = require('../../commons/utils');
// // const pgsql = require('../../commons/postgresql/connection')
// const passport = require('passport')
// const jwt = require('jsonwebtoken')
// // const bcrypt = require('bcrypt');
// // const { QueryTypes } = require('sequelize')
// const config = require('../../config/config.js')
// const Utils = require('../../controllers/commons/utils')
// // const { format } = require('date-fns')
// // const moment = require('moment')
// // const connecction = require('../../commons/mongo/connection')

// module.exports = {
    
//     async login(req, res, next){
//       passport.authenticate('login', async (err, user, info) => {
//         try {
//           if (err || !user) {
//             return res.json({ 
//               error: info,
//               result: ""
//             })
//           }
    
//           req.login(user, { session: false }, async (e) => {
//             if (e) {
//               return next(e)
//             }
//             // const { unitId } = req.body
//             // const [unit] = await pgsql.query(`SELECT * FROM unidad WHERE id = '${unitId}';`, { type: QueryTypes.SELECT })
//             //const userModel = await Utils.getModel('public',User);
//             // if (!unit) {
//             //   return done(null, false, { message: 'Este usuario no tiene unidades asignadas' })
//             // } else {
//             //   if (unit.hasOwnProperty('vicidial')) delete unit.vicidial;
//             //   if (unit.hasOwnProperty('id')) delete unit.id;
//             //   if (unit.hasOwnProperty('fechacreacion')) delete unit.fechacreacion;
//             // }
//             const unitUser = await userModel.findAll({
//               where: {
//                 idusuario: user.id
//               },
//               raw: true
//             })

//             // const permissionModel = await Utils.getModel('public',Permission)
//             // const moduleModel = await Utils.getModel('public',Module)

//             // const permission = await permissionModel.findAll({
//             //   where: {perfil_id:user.perfil_id},
//             //   attributes: [],
//             //   include: [
//             //     {model: moduleModel, as: 'modulo'}
//             //   ]
//             // },{raw: true})
            
//             if (user.hasOwnProperty("password")) {
//               delete user.password
//             }
//             const payload = {
//               id: user.id,
//               username: user.nombre,
//               permission
//             }
//             const token = jwt.sign({ user: payload }, config.jwtSecret, { expiresIn: "24h"})
            
//             // Save login date and time
//             // const currentDate = new Date()
//             // const customCurrentDate = format(currentDate, 'yyyy/MM/dd')
//             // const currentHour = format(currentDate, 'HH:mm:ss')
            
//             // let Model = await Utils.getModel('public', Session);
//             // await Model.create({
//             //   usuario_id: user.id,
//             //   tipo: "login",
//             //   fecha: customCurrentDate,
//             //   hora: currentHour,
//             //   unidad: unitId
//             // })
//             // const conn = await connecction('cbpo_claro_wiser').db
//             // conn.close()
//             return res.json({ token, user})
    
//           })
    
//         } catch (error) {
//           next(error)
//         }
//       })(req, res, next)
//     },

//     // async logout(req, res){
//     //   // Save login date and time
//     //   const { userId }= req.query
//     //   const currentDate = new Date()
//     //   const customCurrentDate = format(currentDate, 'yyyy/MM/dd')
//     //   const currentHour = format(currentDate, 'HH:mm:ss')
      
//     //   let Model = await Utils.getModel('public', Session);
//     //   await Model.create({
//     //     usuario_id: userId,
//     //     tipo: "logout",
//     //     fecha: customCurrentDate,
//     //     hora: currentHour
//     //   })

//     //   return res.json({
//     //     message: "Logout realizado exitosamente",
//     //     result: ""
//     //   })
//     // },

//     // async changePassword(req, res){
//     //   const { user, newPassword } = req.body;
//     //   let statusCode, result, message;

//     //   const UserModel = await Utils.getModel('public', User)
//     //   const userRecord = await UserModel.findOne({
//     //     where: {
//     //       id: user
//     //     },
//     //     raw: true
//     //   })
      
//     //   if (userRecord) {
//     //     statusCode = 201
//     //     message = "Contraseña actualizada correctamente"
//     //     const hashedPassword = await bcrypt.hash(newPassword, 10)
//     //     const password_expiration = moment().add(43,'d').format('YYYY-MM-DD')
//     //     result = await UserModel.update({ password: hashedPassword,password_expiration}, {
//     //       where: {
//     //         id: user
//     //       },
//     //       raw: true
//     //     })

//     //   }
//     //   else {
//     //     statusCode = 404
//     //     message = "No se ha encontrado este usuario"
//     //   }

//     //   return res.status(200).send({
//     //     status: statusCode,
//     //     message: message || "",
//     //     result: result || ""
//     //   })

//     // },

//     // async resetPassword(req, res){
//     //       //const { user } = req.query;
//     //       const user = req.query.user
//     //       let statusCode, message, result;
//     //       const UserModel = await Utils.getModel('public', User)
//     //       //console.log(`aquí vamos`)
//     //       const userRecord = await UserModel.findOne({
//     //         where: {
//     //           id: user
//     //         },
//     //         raw: true
//     //       })
//     //       //console.log(`${JSON.stringify(userRecord)}`)
//     //   if (userRecord) {
//     //     try {
//     //       statusCode = 200
//     //       message = "Contraseña reseteada correctamente"
//     //       const password_expiration = moment().add(43,'d').format('YYYY-MM-DD')
//     //       const hashedPassword = await bcrypt.hash(String(userRecord.id), 10)
          
//     //       result = await UserModel.update({password: hashedPassword,password_expiration}, {
//     //         where: {
//     //           id: user
//     //         }
//     //       })

//     //       return res.status(200).send({
//     //         status: statusCode,
//     //         message: message || "",
//     //         result: result || ""
//     //       })
//     //     } catch (error) {
//     //       console.log(error)
//     //       return res.status(400).send({
//     //         status: "400",
//     //         message: "Error al resetear contraseña",
//     //         result: result || ""
//     //       })
//     //     }
//     //   }
//     //   else{
//     //     return res.status(220).send({
//     //       status: "220",
//     //       message: message || "El usuario no se encontro",
//     //       result: result || ""
//     //     })
//     //   }

      
//     // }
// }