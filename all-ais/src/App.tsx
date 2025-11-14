import './App.css'
import Header from "./components/layout/Header.tsx";
import Hero from "./components/home/Hero.tsx";
import StatsSection from "./components/home/StatsSection.tsx";
import AiGrid from "./components/ai/AiGrid.tsx";
import Footer from "./components/layout/Footer.tsx";

function App() {

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50">
            <Header />
            <main>
                <Hero />
                <StatsSection />
                <AiGrid />
            </main>
            <Footer />
        </div>
    );
}

export default App
