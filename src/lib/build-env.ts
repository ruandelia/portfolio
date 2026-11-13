// Valores fixados no build pelo CI. Com `output: "export"` não há servidor:
// o que estiver no ambiente durante o `next build` vai para o HTML, e mudar
// a variável depois exige um novo build.
//
// O acesso é sempre `process.env.NOME` literal, porque o Next só substitui
// as variáveis NEXT_PUBLIC_ escritas assim (desestruturar quebra a troca).

// Só "true" libera a indexação. Ausente, vazia ou com erro de digitação
// cai em "não indexar": publicar sem querer é pior que atrasar a indexação.
export const siteIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

// Regra de evidência: a versão exibida vem da tag do Git, preenchida pelo CI.
// Fora do CI (build local, dev) aparece "dev", e nunca um número inventado.
export const siteVersion = process.env.NEXT_PUBLIC_SITE_VERSION?.trim() || "dev";
