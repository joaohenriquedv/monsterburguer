# Monster Burguer

Site independente feito com HTML, CSS e JavaScript puro (sem React).

## Abrir localmente

Abra `index.html` no navegador. Antes de publicar, edite `app.js` e configure `STORE_WHATSAPP` (DDI + DDD + telefone, somente números, exemplo `5585999999999`) e/ou `STORE_EMAIL` com o contato real da loja. O WhatsApp é o caminho recomendado para receber pedidos na primeira versão; o e-mail funciona como alternativa.

## Ajustar o cardápio

Os itens, categorias, descrições, preços e imagens de demonstração ficam no array `products` em `app.js`.

## Situação desta versão

Esta é a primeira versão visual/interativa: busca, filtros, sacola e formulário funcionam no navegador. O Pix de demonstração monta localmente um BR Code com o valor dos itens, QR e Copia e Cola; a chave CPF deve ser substituída pela chave comercial correta antes de publicar. O QR pode receber dinheiro real, mas o site não verifica o pagamento nem confirma o pedido. Com o contato configurado, o pedido também pode ser encaminhado ao WhatsApp. Ainda não inclui banco de dados, autenticação administrativa ou painel de pedidos compartilhado entre dispositivos; esses recursos e um provedor de pagamento com confirmação via webhook são necessários para operar como loja real.

As fotos atuais são imagens remotas de demonstração. Substitua-as por fotos autorizadas do restaurante antes de publicar a versão comercial.
