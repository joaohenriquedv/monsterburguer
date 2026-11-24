# Monster Burguer

Site independente feito com HTML, CSS e JavaScript puro (sem React).

## Abrir localmente

Abra `index.html` no navegador. Antes de publicar, edite `app.js` e configure `STORE_WHATSAPP` (DDI + DDD + telefone, somente números, exemplo `5585999999999`) e/ou `STORE_EMAIL` com o contato real da loja. O WhatsApp é o caminho recomendado para receber pedidos na primeira versão; o e-mail funciona como alternativa.

## Ajustar o cardápio

Os itens, categorias, descrições, preços e imagens de demonstração ficam no array `products` em `app.js`.

## Situação desta versão

Esta é a primeira versão visual/interativa: busca, filtros, sacola, seleção de Pix/cartão/dinheiro e formulário funcionam no navegador. Com os contatos configurados, o pedido abre uma mensagem pronta para enviar por WhatsApp ou e-mail. Sem contatos, o site mostra uma prévia copiável para demonstração. A escolha de pagamento é enviada como preferência; não há cobrança online. Ainda não inclui banco de dados, autenticação administrativa ou painel de pedidos compartilhado entre dispositivos; esses recursos precisam de um backend antes de operar como loja real.

As fotos atuais são imagens remotas de demonstração. Substitua-as por fotos autorizadas do restaurante antes de publicar a versão comercial.
