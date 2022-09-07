import express from "express";
import cors from "cors";

// import connection from "./connection";
import { AddressInfo } from "net";

const app = express();

app.use(express.json()); //para o express conseguir fazer um parse dos bodys que vem das requisições
app.use(cors()); //para não tomar bloqueio ao fazer requisições do front para o back

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
export default app