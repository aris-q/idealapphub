import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AINewsSection from "../components/AINewsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getHackerNewsAI, getAllInVideos, bucketByDate } from "../lib/aiNews";

export const dynamic = "force-dynamic";

async function getOwnNews() {
  try {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const news = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        body: data.body,
        link: data.link || null,
        highlight: !!data.highlight,
        source: "IdealAppHub",
        ts: Date.parse(data.date) || Date.now(),
      };
    });
    console.log("[HOME] Own news fetched:", news.length);
    return news;
  } catch (err) {
    console.error("[HOME] News fetch error:", err.message);
    return [];
  }
}

export default async function Home() {
  const [ownNews, hnNews, allInNews] = await Promise.all([
    getOwnNews(),
    getHackerNewsAI(),
    getAllInVideos(),
  ]);

  const highlights = ownNews.filter((item) => item.highlight);
  const rest = ownNews.filter((item) => !item.highlight);
  const { today, week } = bucketByDate([...rest, ...hnNews, ...allInNews]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AINewsSection highlights={highlights} today={today} week={week} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
