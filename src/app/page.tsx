// TEMPORÁRIO: seções vazias para testar a navegação do Header
import { site } from "@/content/pt/site";

export default function Home() {
  return (
    <>
      <h1>{site.name}</h1>
      {site.header.nav.map((item) => (
        <section key={item.id} id={item.id} aria-labelledby={`${item.id}-titulo`}
          style={{ minHeight: "100vh" }} // provisório, até o CSS das seções
        >
          <h2 id={`${item.id}-titulo`}>{item.label}</h2>
        </section>
      ))}
    </>
  );
}