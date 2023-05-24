import BodyHeading from "@/components/BodyHeading";
import Head from "next/head";
// import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
// import Widgets from "../components/Widgets";
import Searchbar from "@/components/Searchbar";
import Preview from "@/components/Preview";
import HelpCenter from "@/components/HelpCenter";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";

export default function Home() {
  const homeHeaderText = "Welcome, Ashpreet";
  return (
    <div>
      

      <main className="flex flex-auto h-full">
          <ThreeColumnLayout headerText={homeHeaderText}>

          </ThreeColumnLayout>
      </main>
    </div>
  );
}

// API endpoint (without API key requirement)
// getServerSideProps is built in, now taking this as props in Home() above
// const url =
//   "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json";

// export async function getServerSideProps() {
//   const newsResults = await fetch(url).then((res) => res.json());

//   // "Who to follow" in Widgets section
//   const urlForUsers =
//     "https://randomuser.me/api/?results=30&inc=name,login,picture";
//   const randomUsersResults = await fetch(urlForUsers).then((res) => res.json());

//   return {
//     props: {
//       newsResults,
//       randomUsersResults,
//     },
//   };
// }