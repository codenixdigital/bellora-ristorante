# BELLORA | Ristorante Italiano

Projeto **demonstrativo e fictício** desenvolvido pela **CODENIX DIGITAL** para o portfólio da agência. O restaurante não existe: nenhum pedido, reserva ou contato é real.

## Tecnologias
HTML5, CSS3 e JavaScript puro (sem frameworks, sem backend, sem bibliotecas). Fontes Playfair Display e Inter via Google Fonts.

## Funcionalidades
- Cardápio com 18 pratos, filtros por categoria e busca por nome
- Pedido com adicionar, remover, alterar quantidades, subtotal em BRL e persistência no LocalStorage
- Checkout demonstrativo com validação e resumo copiável
- Reservas simuladas (bloqueia datas passadas, horários configuráveis) com resumo copiável
- Galeria com visualização ampliada, setas e Escape
- Formulário de contato que apenas gera um texto de exemplo
- Menu mobile, reveal ao rolar, voltar ao topo e suporte a `prefers-reduced-motion`

## Estrutura
```
bellora-ristorante/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/ (images, icons)
```

## Executar localmente
Abra a pasta no VS Code e use **Open with Live Server** em `index.html`.

## Como configurar
- **Imagens:** em `script.js`, preencha o campo `img` de cada prato (`MENU`) e da `GALERIA` com caminhos como `assets/images/carbonara.jpg`. Sem `img`, aparece um placeholder. Use fotos próprias ou de bancos gratuitos com licença verificada (Unsplash, Pexels).
- **Foto do hero:** em `style.css`, defina `--hero-img: url("assets/images/hero.jpg");`.
- **Horários e limite de pessoas:** objeto `CONFIG` no topo do `script.js`.
- **Contatos e link da agência:** substitua os textos `[... demonstrativo]` no `index.html` e descomente o link da CODENIX no rodapé.

## Limitações
Por ser estático, nada é enviado: pedidos, reservas e mensagens geram apenas um resumo para copiar. Não há pagamento, disponibilidade real de mesas nem e-mail. A estrutura (`validar`, `resultado`) está pronta para ligar a um backend no futuro.

## Publicar no GitHub Pages
Envie os arquivos para a raiz de um repositório público, abra **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.

## Créditos
Projeto demonstrativo da CODENIX DIGITAL.
