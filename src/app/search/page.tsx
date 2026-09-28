import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SearchResults from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Find Your Next Course",
  description: "Search ByteSpace courses by topic, level and category.",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

  return (
    <>
      <Header />
      <main>
        <SearchResults initialQuery={query} />
      </main>
      <Footer bordered />
    </>
  );
}
