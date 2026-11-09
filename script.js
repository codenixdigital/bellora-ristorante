/* BELLORA | script.js (projeto demonstrativo CODENIX DIGITAL) */
"use strict";

/* ---------- CONFIGURAÇÃO ---------- */
const CONFIG = {
  horarios: ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"], // horários ilustrativos
  maxPessoas: 10,
  chaveCarrinho: "bellora-carrinho"
};

/* ---------- DADOS DO CARDÁPIO ----------
   Para usar fotos: preencha "img" com o caminho, ex.: "assets/images/carbonara.jpg" */
const CATS = { antipasti: "Antipasti", pasta: "Pasta", pizza: "Pizza", risotti: "Risotti", dolci: "Dolci", bevande: "Bevande" };
const MENU = [
  { id: "ant-01", nome: "Bruschetta Classica", cat: "antipasti", desc: "Pão rústico tostado com tomate, manjericão e azeite.", preco: 28, img: "", extra: "" },
  { id: "ant-02", nome: "Caprese", cat: "antipasti", desc: "Tomate, muçarela de búfala, manjericão e azeite.", preco: 34, img: "", extra: "" },
  { id: "ant-03", nome: "Arancini", cat: "antipasti", desc: "Bolinhos de arroz crocantes com recheio cremoso.", preco: 32, img: "", extra: "Contém glúten e laticínios" },
  { id: "pas-01", nome: "Spaghetti alla Carbonara", cat: "pasta", desc: "Espaguete com ovos, queijo pecorino, pimenta-do-reino e bacon.", preco: 56, img: "", extra: "" },
  { id: "pas-02", nome: "Fettuccine Alfredo", cat: "pasta", desc: "Fettuccine com molho cremoso de manteiga e parmesão.", preco: 52, img: "", extra: "" },
  { id: "pas-03", nome: "Lasagna alla Bolognese", cat: "pasta", desc: "Camadas de massa, ragù e molho bechamel gratinado.", preco: 58, img: "", extra: "" },
  { id: "pas-04", nome: "Gnocchi al Pesto", cat: "pasta", desc: "Nhoque de batata com pesto de manjericão.", preco: 50, img: "", extra: "" },
  { id: "piz-01", nome: "Pizza Margherita", cat: "pizza", desc: "Molho de tomate, muçarela e manjericão fresco.", preco: 48, img: "", extra: "" },
  { id: "piz-02", nome: "Pizza Quattro Formaggi", cat: "pizza", desc: "Quatro queijos selecionados sobre massa fina.", preco: 58, img: "", extra: "" },
  { id: "piz-03", nome: "Pizza Prosciutto", cat: "pizza", desc: "Presunto, muçarela e molho de tomate.", preco: 54, img: "", extra: "" },
  { id: "ris-01", nome: "Risotto ai Funghi", cat: "risotti", desc: "Arroz arbóreo cremoso com cogumelos e parmesão.", preco: 60, img: "", extra: "" },
  { id: "ris-02", nome: "Risotto al Pomodoro", cat: "risotti", desc: "Arroz arbóreo com tomate e manjericão.", preco: 48, img: "", extra: "" },
  { id: "dol-01", nome: "Tiramisù", cat: "dolci", desc: "Camadas de biscoito, creme de mascarpone e café.", preco: 30, img: "", extra: "Contém café" },
  { id: "dol-02", nome: "Panna Cotta", cat: "dolci", desc: "Creme delicado com calda de frutas vermelhas.", preco: 26, img: "", extra: "" },
  { id: "dol-03", nome: "Gelato Artigianale", cat: "dolci", desc: "Sorvete artesanal, duas bolas à escolha.", preco: 24, img: "", extra: "" },
  { id: "bev-01", nome: "Limonata Siciliana", cat: "bevande", desc: "Limonada siciliana gelada com hortelã.", preco: 16, img: "", extra: "" },
  { id: "bev-02", nome: "Água com gás", cat: "bevande", desc: "Água mineral com gás, 500 ml.", preco: 9, img: "", extra: "" },
  { id: "bev-03", nome: "Suco natural", cat: "bevande", desc: "Suco natural do dia, 400 ml.", preco: 14, img: "", extra: "" }
];
const DESTAQUES = ["pas-01", "piz-01", "dol-01"];
// Galeria: preencha "img" com fotos locais (assets/images/...) ou de bancos gratuitos com licença verificada
const GALERIA = [
  { t: "Massas artesanais", img: "" }, { t: "Pizza saindo do forno", img: "" }, { t: "Sobremesas italianas", img: "" },
  { t: "Ambiente do salão", img: "" }, { t: "Antipasti da casa", img: "" }, { t: "Mesa posta", img: "" }
];

/* ---------- UTILITÁRIOS ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Cria elementos com textContent: nunca insere texto do usuário como HTML
function h(tag, cls, txt) { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
document.documentElement.classList.add("js");

function thumb(src, alt) {
  const w = h("div", "thumb");
  if (src) { const i = document.createElement("img"); i.src = src; i.alt = alt; i.loading = "lazy"; i.width = 800; i.height = 600; w.append(i); }
  else { w.classList.add("ph"); w.setAttribute("role", "img"); w.setAttribute("aria-label", "Imagem ilustrativa: " + alt); w.append(h("span", "", alt)); }
  return w;
}

/* ---------- REVEAL ---------- */
const io = ("IntersectionObserver" in window && !reduce)
  ? new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); o.unobserve(e.target); } }), { threshold: .12 }) : null;
function reveal(el) { io ? io.observe(el) : el.classList.add("visible"); }
$$(".reveal").forEach(reveal);

/* ---------- CARDÁPIO ---------- */
function dishCard(it, big) {
  const a = h("article", "dish reveal" + (big ? " dish--big" : ""));
  a.dataset.id = it.id;
  const b = h("div", "dish__body");
  b.append(h("h3", "", it.nome), h("p", "", it.desc));
  if (it.extra) b.append(h("small", "", it.extra));
  const f = h("div", "dish__foot");
  const btn = h("button", "btn btn--gold btn--sm", "Adicionar ao pedido");
  btn.type = "button"; btn.dataset.add = it.id; btn.setAttribute("aria-label", "Adicionar " + it.nome + " ao pedido");
  f.append(h("strong", "", brl.format(it.preco)), btn);
  b.append(f); a.append(thumb(it.img, it.nome), b);
  return a;
}
let filtro = "todos", busca = "";
function renderMenu() {
  const grid = $("#menu-grid"); grid.replaceChildren();
  const q = busca.trim().toLowerCase();
  const lista = MENU.filter(m => (filtro === "todos" || m.cat === filtro) && m.nome.toLowerCase().includes(q));
  lista.forEach(m => { const c = dishCard(m); grid.append(c); reveal(c); });
  $("#menu-vazio").hidden = lista.length > 0;
  marcar();
}
function renderFiltros() {
  const box = $("#filtros");
  [["todos", "Tudo"], ...Object.entries(CATS)].forEach(([k, v]) => {
    const b = h("button", "", v); b.type = "button"; b.setAttribute("aria-pressed", k === filtro);
    b.addEventListener("click", () => { filtro = k; $$("button", box).forEach(x => x.setAttribute("aria-pressed", x === b)); renderMenu(); });
    box.append(b);
  });
}
$("#busca").addEventListener("input", e => { busca = e.target.value; renderMenu(); });
function renderDestaques() {
  const g = $("#destaques-grid");
  DESTAQUES.forEach(id => { const c = dishCard(MENU.find(m => m.id === id), true); g.append(c); reveal(c); });
}
$("#foot-cats").append(...Object.values(CATS).map(c => { const li = h("li"); const a = h("a", "", c); a.href = "#cardapio"; li.append(a); return li; }));

/* ---------- CARRINHO ---------- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem(CONFIG.chaveCarrinho)) || {}; } catch { cart = {}; }
// Mantém só itens válidos (protege contra dados alterados no LocalStorage)
cart = Object.fromEntries(Object.entries(cart).filter(([id, q]) => MENU.some(m => m.id === id) && Number.isInteger(q) && q > 0 && q <= 20));
const salvar = () => { try { localStorage.setItem(CONFIG.chaveCarrinho, JSON.stringify(cart)); } catch { /* storage indisponível: segue sem persistir */ } };
const item = id => MENU.find(m => m.id === id);
const totalCarrinho = () => Object.entries(cart).reduce((s, [id, q]) => s + item(id).preco * q, 0);
const qtdTotal = () => Object.values(cart).reduce((s, q) => s + q, 0);

function setQty(id, q) { if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 20); salvar(); renderCart(true); }
function marcar() { $$(".dish").forEach(d => d.classList.toggle("selected", !!cart[d.dataset.id])); }

function renderCart(animar) {
  const n = qtdTotal(), c = $("#cart-count");
  c.textContent = n;
  if (animar && !reduce) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
  const ul = $("#cart-lines"); ul.replaceChildren();
  Object.entries(cart).forEach(([id, q]) => {
    const it = item(id), li = h("li");
    const q1 = h("div", "qty");
    const mk = (txt, label, fn) => { const b = h("button", "", txt); b.type = "button"; b.setAttribute("aria-label", label + " " + it.nome); b.addEventListener("click", fn); return b; };
    const rm = mk("Remover", "Remover", () => setQty(id, 0)); rm.classList.add("rm");
    q1.append(mk("−", "Diminuir", () => setQty(id, q - 1)), h("span", "", String(q)), mk("+", "Aumentar", () => setQty(id, q + 1)), rm);
    li.append(h("span", "", it.nome), h("strong", "", brl.format(it.preco * q)), q1);
    ul.append(li);
  });
  $("#cart-empty").hidden = n > 0;
  $("#cart-total").textContent = brl.format(totalCarrinho());
  $("#cart-clear").hidden = n === 0;
  marcar();
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-add]");
  if (!b) return;
  setQty(b.dataset.add, (cart[b.dataset.add] || 0) + 1);
  const old = b.textContent; b.textContent = "Adicionado ✓";
  setTimeout(() => { b.textContent = old; }, 1200);
});
$("#cart-clear").addEventListener("click", () => { cart = {}; salvar(); renderCart(true); });

/* ---------- DIÁLOGOS (foco e Escape nativos do <dialog>) ---------- */
const cartDlg = $("#cart"), resDlg = $("#result"), lbDlg = $("#lightbox");
$("#btn-cart").addEventListener("click", () => cartDlg.showModal());
$$("dialog").forEach(d => {
  d.addEventListener("click", e => { if (e.target === d) d.close(); }); // clique no fundo fecha
  $$("[data-close]", d).forEach(b => b.addEventListener("click", () => d.close()));
});

function resultado(titulo, aviso, texto) {
  $("#res-t").textContent = titulo; $("#res-aviso").textContent = aviso;
  $("#res-texto").textContent = texto; $("#res-msg").textContent = "";
  resDlg.showModal();
}
$("#res-copy").addEventListener("click", async () => {
  const msg = $("#res-msg");
  try { await navigator.clipboard.writeText($("#res-texto").textContent); msg.textContent = "Resumo copiado."; }
  catch { msg.textContent = "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente."; }
});

/* ---------- VALIDAÇÃO GENÉRICA ---------- */
function validar(form, regras) {
  let ok = true, primeiro = null;
  for (const [nome, fn] of Object.entries(regras)) {
    const el = form.elements[nome], msg = fn(el.value.trim());
    el.closest(".field").classList.toggle("invalid", !!msg);
    el.setAttribute("aria-invalid", String(!!msg));
    $(`[data-err="${nome}"]`, form).textContent = msg || "";
    if (msg) { ok = false; primeiro = primeiro || el; }
  }
  if (primeiro) primeiro.focus();
  return ok;
}
const r = {
  nome: v => v.length >= 3 ? "" : "Informe o nome (mínimo 3 letras).",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Informe um e-mail válido.",
  tel: v => { const d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 11 ? "" : "Informe DDD + número (10 ou 11 dígitos)."; },
  obrig: msg => v => v ? "" : msg
};

/* ---------- CHECKOUT DEMONSTRATIVO ---------- */
const fp = $("#form-pedido");
fp.elements.mod.addEventListener("change", e => { $("#p-end-f").hidden = e.target.value !== "entrega"; });
fp.addEventListener("submit", e => {
  e.preventDefault();
  if (!qtdTotal()) { resultado("Pedido vazio", "Adicione pratos antes de ver o resumo.", "Nenhum item no pedido."); return; }
  const entrega = fp.elements.mod.value === "entrega";
  const regras = { nome: r.nome, tel: r.tel, end: v => !entrega || v.length >= 8 ? "" : "Informe o endereço de entrega." };
  if (!validar(fp, regras)) return;
  const f = fp.elements;
  const linhas = Object.entries(cart).map(([id, q]) => `${q}x ${item(id).nome} - ${brl.format(item(id).preco * q)}`);
  const texto = ["PEDIDO DEMONSTRATIVO - BELLORA", "", `Cliente: ${f.nome.value.trim()}`, `Telefone: ${f.tel.value.trim()}`,
    `Modalidade: ${entrega ? "Entrega" : "Retirada"}`, ...(entrega ? [`Endereço: ${f.end.value.trim()}`] : []),
    ...(f.obs.value.trim() ? [`Observações: ${f.obs.value.trim()}`] : []), "", ...linhas, "", `Total: ${brl.format(totalCarrinho())}`].join("\n");
  resultado("Resumo do pedido", "Demonstração: este pedido não foi enviado a nenhum restaurante, não foi confirmado e nenhum pagamento foi processado.", texto);
});

/* ---------- RESERVAS DEMONSTRATIVAS ---------- */
const fr = $("#form-reserva");
const hoje = new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD no fuso local
fr.elements.data.min = hoje;
CONFIG.horarios.forEach(t => fr.elements.hora.append(new Option(t, t)));
for (let i = 1; i <= CONFIG.maxPessoas; i++) fr.elements.pessoas.append(new Option(i === 1 ? "1 pessoa" : i + " pessoas", String(i)));
fr.addEventListener("submit", e => {
  e.preventDefault();
  const ok = validar(fr, {
    nome: r.nome, email: r.email, tel: r.tel,
    data: v => !v ? "Escolha uma data." : v < hoje ? "A data não pode ser anterior a hoje." : "",
    hora: r.obrig("Escolha um horário."), pessoas: r.obrig("Informe a quantidade de pessoas.")
  });
  if (!ok) return;
  const f = fr.elements, [a, m, d] = f.data.value.split("-");
  const texto = ["SOLICITAÇÃO DE RESERVA (SIMULAÇÃO) - BELLORA", "", `Nome: ${f.nome.value.trim()}`, `E-mail: ${f.email.value.trim()}`, `Telefone: ${f.tel.value.trim()}`,
    `Data: ${d}/${m}/${a}`, `Horário: ${f.hora.value}`, `Pessoas: ${f.pessoas.value}`,
    ...(f.ocasiao.value.trim() ? [`Ocasião: ${f.ocasiao.value.trim()}`] : []), ...(f.obs.value.trim() ? [`Observações: ${f.obs.value.trim()}`] : [])].join("\n");
  resultado("Resumo da reserva", "Esta é uma simulação de reserva para demonstração do sistema. Nenhuma mesa foi reservada.", texto);
});

/* ---------- CONTATO (somente gera texto, não envia) ---------- */
const fc = $("#form-contato");
fc.addEventListener("submit", e => {
  e.preventDefault();
  if (!validar(fc, { nome: r.nome, email: r.email, assunto: r.obrig("Informe o assunto."), mensagem: v => v.length >= 10 ? "" : "Escreva ao menos 10 caracteres." })) return;
  const f = fc.elements;
  resultado("Mensagem de exemplo", "Demonstração: a mensagem não foi enviada a ninguém.",
    [`De: ${f.nome.value.trim()} <${f.email.value.trim()}>`, `Assunto: ${f.assunto.value.trim()}`, "", f.mensagem.value.trim()].join("\n"));
});

/* ---------- GALERIA ---------- */
let gi = 0;
const gal = $("#galeria-grid");
GALERIA.forEach((g, i) => {
  const b = h("button", "reveal"); b.type = "button"; b.setAttribute("aria-label", "Ampliar: " + g.t);
  b.append(thumb(g.img, g.t)); b.addEventListener("click", () => { mostrarFoto(i); lbDlg.showModal(); });
  gal.append(b); reveal(b);
});
function mostrarFoto(i) {
  gi = (i + GALERIA.length) % GALERIA.length;
  const g = GALERIA[gi];
  $("#lb-t").textContent = g.t; $("#lb-pos").textContent = `${gi + 1} / ${GALERIA.length}`;
  $("#lb-img").replaceChildren(thumb(g.img, g.t));
}
$("#lb-prev").addEventListener("click", () => mostrarFoto(gi - 1));
$("#lb-next").addEventListener("click", () => mostrarFoto(gi + 1));
lbDlg.addEventListener("keydown", e => { if (e.key === "ArrowLeft") mostrarFoto(gi - 1); if (e.key === "ArrowRight") mostrarFoto(gi + 1); });

/* ---------- HEADER, MENU MOBILE, NAVEGAÇÃO ATIVA ---------- */
const header = $("#header"), totop = $("#totop"), nav = $("#nav"), burger = $("#burger");
function onScroll() { header.classList.toggle("scrolled", scrollY > 30); totop.hidden = scrollY < 600; }
addEventListener("scroll", onScroll, { passive: true }); onScroll();
totop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
function setMenu(o) { nav.classList.toggle("open", o); burger.setAttribute("aria-expanded", String(o)); burger.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu"); }
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
$$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
const links = $$(".nav a[href^='#']:not(.btn)");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach(a => { const s = $(a.getAttribute("href")); if (s) spy.observe(s); });
}

/* ---------- INÍCIO ---------- */
$("#ano").textContent = new Date().getFullYear();
renderFiltros(); renderMenu(); renderDestaques(); renderCart();
