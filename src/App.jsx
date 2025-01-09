import {Text, Container, TextArea } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import Cabecalho from "./componentes/Cabecalho";
import Formulario from "./componentes/Formulario";
import { useState } from "react";


function App() {
  // Inicia nosso estado de conteúdo do textarea como vazio
  const [ conteudoArquivo, setConteudoArquivo ] = useState("");

  function leituraArquivo(event) 
  {
      const arquivo = event.target.files[0];

      if (arquivo) 
        {
          const lerArquivo = new FileReader(); // Cria um novo objeto FileReader

          // Lê o conteúdo do arquivo
          lerArquivo.onload = function() 
          {
            const conteudo = lerArquivo.result; // Armazena o conteúdo do arquivo
            setConteudoArquivo(conteudo); // Atualiza o estado do textarea com o conteúdo do arquivo
          }
          // Inicia a leitura do arquivo como texto
          lerArquivo.readAsText(arquivo);
        }
  }

  return (
    <Container height="auto">
      <Cabecalho />
      <Text as="p" style={{padding: "20px"}}>Faça o upload do arquivo ZPL e clique em converter para gerar o PDF.</Text>
      <Text as="p" size="3" weight="bold" style={{padding: "10px 20px"}}>Código ZPL:</Text>
      <TextArea radius="large" resize="vertical" style={{minHeight: "300px"}} value={conteudoArquivo} readOnly/>
      <Formulario leituraArquivo={leituraArquivo}/>
    </Container>
  )
}

export default App
