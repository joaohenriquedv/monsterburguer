# Monster Burguer

Site independente feito com HTML, CSS e JavaScript puro (sem React).

## Abrir localmente

Abra `index.html` no navegador. Antes de publicar, edite `app.js` e configure `STORE_WHATSAPP` (DDI + DDD + telefone, somente números, exemplo `5585999999999`) e/ou `STORE_EMAIL` com o contato real da loja. O WhatsApp é o caminho recomendado para receber pedidos na primeira versão; o e-mail funciona como alternativa.

## Publicação no Render

O `render.yaml` e o `build.js` preparam este site estático para o Render. Depois de enviar este repositório ao GitHub, crie um Blueprint no Render apontando para ele; o serviço publica a pasta `dist/` e ganha um endereço `onrender.com`.

## Ajustar o cardápio

Os itens, categorias, descrições, preços e imagens de demonstração ficam no array `products` em `app.js`.

## Situação desta versão

Esta é a primeira versão visual/interativa: busca, filtros, sacola e formulário funcionam no navegador. O Pix de demonstração monta localmente um BR Code com o valor dos itens, QR e Copia e Cola. **A chave CPF atualmente configurada é real e o QR pode receber dinheiro; remova/substitua essa chave antes de publicar o link para clientes.** O site não verifica o pagamento nem confirma o pedido. Com o contato configurado, o pedido também pode ser encaminhado ao WhatsApp. Ainda não inclui banco de dados, autenticação administrativa ou painel de pedidos compartilhado entre dispositivos; esses recursos e um provedor de pagamento com confirmação via webhook são necessários para operar como loja real.

As fotos atuais são imagens remotas de demonstração. Substitua-as por fotos autorizadas do restaurante antes de publicar a versão comercial.
