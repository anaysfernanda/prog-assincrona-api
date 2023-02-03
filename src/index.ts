import express, { Request, Response } from "express";
import axios from "axios";

const app = express();

app.listen(2727, () => {
  console.log("API está rodando");
});

//ex. 1
export async function getUserFromGithub(user: string) {
  await axios
    .get(`https://api.github.com/users/${user}`)
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log("Usuário não existe");
    });
}

getUserFromGithub("djunior97");
getUserFromGithub("djunioriqdivqv97");

export async function getRepositories(repo: string) {
  await axios
    .get(`https://api.github.com/repos/${repo}`)
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log("Repositório não existe" + error);
    });
}

getRepositories("marcelo-growdev/scrapbook-es6");
getRepositories("marcelo-growdev/qdbqqbqwn");

//ex.2

app.get("/calculadora", (req: Request, res: Response) => {
  const operacao = req.query.operacao;
  const valorA = Number(req.query.valorA);
  const valorB = Number(req.query.valorB);

  if (operacao === "somar") {
    return res.send({
      soma: valorA + valorB,
    });
  } else if (operacao === "subtraicao") {
    return res.send({
      subtracao: valorA - valorB,
    });
  } else if (operacao === "divisao") {
    return res.send({
      divisao: valorA / valorB,
    });
  } else if (operacao === "multiplicacao") {
    return res.send({
      multiplicacao: valorA * valorB,
    });
  } else {
    res.send({
      message: "Passe alguma operação válida",
    });
  }
});

//ex.3

let contador: number = 0;

app.get("/contador", (req: Request, res: Response) => {
  if (contador < 10) {
    contador++;
    return res.send({
      contador: contador,
    });
  } else {
    contador = 0;
    return res.send({
      message: "Chegou à 10!",
    });
  }
});

//ex.4

app.get("/numeral", (req: Request, res: Response) => {
  const numero = Number(req.query.numero);
  let operacao2 = req.query.operacao2;

  if (operacao2 === "anterior") {
    let resultado = numero - 1;
    return res.send({
      operacao: operacao2,
      numero: numero,
      resultado: resultado,
    });
  } else if (operacao2 === "proximo") {
    let resultado = numero + 1;
    return res.send({
      operacao: operacao2,
      numero: numero,
      resultado: resultado,
    });
  } else {
    return res.send({
      message: "Passe uma operacão válida!",
    });
  }
});

//ex.5
app.get("/inverter-string", (req: Request, res: Response) => {
  const valor = req.query.valor;

  if (valor) {
    let inverter = valor?.toString().split("").reverse().join("");
    return res.send({
      message: inverter,
    });
  }
});

//ex.6

app.get("/remover-vogais", (req: Request, res: Response) => {
  let valor2 = req.query.valor2?.toString();
  let array: string[] = [];

  if (valor2) {
    let consoantes = valor2.replace(/[aeiouà-ú]/gi, "");

    array.push(consoantes);

    return res.send({
      valor: valor2,
      lista: array,
    });
  }
});
