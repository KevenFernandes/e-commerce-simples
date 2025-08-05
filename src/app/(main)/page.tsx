import { Catalog } from "@/components/Catalog";
import { Container } from "@/components/Container";
import { ProductList } from "@/components/ProducList";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="text-[#1f1c0d]">
      <main>
        <Container>
          <Catalog />
          <ProductList />
        </Container>
      </main>
    </div>
  );
}
