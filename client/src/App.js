import Header from './Header';
import Footer from './Footer';
import TaqueriaList from './TaqueriaList';

export default function App() {
    return (
        <div className="relative flex flex-col min-h-screen bg-orange-50 font-sourcesanspro">
            <Header />
            <TaqueriaList />
            <Footer />
        </div>
    );
}
