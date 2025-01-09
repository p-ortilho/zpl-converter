import { Heading, Text } from "@radix-ui/themes";

const Cabecalho = () => {
    return (
        <Heading size="8" style={{ color: '#000000', padding: '20px' }} align={'center'}>
            <img src="./imagens/zebra.png" alt="Logo de uma zebra" style={{ width: '100px', height: '100px' }} />
            <Text>Conversor de ZPL para PDF</Text>
        </Heading>
    );
};

export default Cabecalho;