import { validationResult } from "express-validator";

export const applyValidations = (req, res, next) => {
  const errores = validationResult(req);
  let lista = []
  if (!errores.isEmpty()) {
  errores.array().forEach(element => {
      const indice = lista.findIndex((e)=>(e.type == element.path))
      if (indice == -1){
          lista.push({"type":`${element.path}`,"error":[`${element.msg}`]})
      }else{
          lista[indice].error.push(`${element.msg}`)
      }
  });
  res.send(lista)
  }else{
    next()
  }
};

// [
//   {
//     path: "title",
//     errors: [],
//   },
// ];
