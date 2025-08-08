import { PageHome } from "@/components/home";
import { NavBar } from "@/components/navbar";

export default async function Home() {
  return (
    <>
      <NavBar />
      <PageHome />
    </>
  );
}
