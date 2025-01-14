import {Text, Container, TextArea, Button } from "@radix-ui/themes";
import './App.css';
import '@radix-ui/themes/styles.css';
import Cabecalho from "./componentes/Cabecalho";
import Formulario from "./componentes/Formulario";
import { useState } from "react";


function App() {
  // Inicia nosso estado de conteúdo do textarea como vazio
  const [ conteudoArquivo, setConteudoArquivo ] = useState("");
  // Inicia o estado da URL do PDF como vazio
  const [pdfUrl, setPdfUrl] = useState("");
  // Inicia o estado do botao como falso
  const [botaoVisivel, setBotaoVisivel] = useState(false);

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
      requisicaoAPI(arquivo);
  }

  async function requisicaoAPI(arquivo)
  {
    try{
        const formData = new FormData();
        formData.append("file", arquivo);

        const resposta = await fetch("http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/",
          {
            method: "POST",
            headers: {
              "Accept": "application/pdf"
            },
            body: formData
          }
        );

        const pdf = await resposta.blob(); // arquivo PDF
        const url = window.URL.createObjectURL(pdf); // URL do arquivo PDF
        setPdfUrl(url); // atualiza o estado com a URL do PDF
        setBotaoVisivel(true);  // exibe o botão de download
    }
    catch(error){
      return error;
    }
  }

  function downloadPDF()
  {
    const link = document.createElement("a"); // criando o elemento de link
    link.href = pdfUrl; // definindo o atributo href do link com a URL do PDF
    link.download = "etiqueta.pdf"; // definindo o atributo download do link com o nome do arquivo
    document.body.appendChild(link); // adicionando o link ao corpo do documento
    link.click(); // acionando o evento de clique no link
    document.body.removeChild(link); // removendo o link do corpo do documento
    window.URL.revokeObjectURL(pdfUrl); // revogando a URL do PDF
    setBotaoVisivel(false); // oculta o botão de download
    setConteudoArquivo(""); // limpa o conteúdo do textarea
  }

  return (
    <Container height="auto">
      <Cabecalho />
      <Text as="p" style={{padding: "20px"}}>Faça o upload do arquivo ZPL e clique em converter para gerar o PDF.</Text>
      <Text as="p" size="3" weight="bold" style={{padding: "10px 20px"}}>Código ZPL:</Text>
      <TextArea radius="large" resize="vertical" style={{minHeight: "300px"}} value={conteudoArquivo} readOnly/>
      <Formulario leituraArquivo={leituraArquivo}/>
      {botaoVisivel && (
        <Button color="jade" radius="medium" variant="solid" size="3" onClick={downloadPDF} id="botaoDownload">
          Baixar
        </Button>
      )}
    </Container>
  )
}

export default App
