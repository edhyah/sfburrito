import Header from './Header';
import Footer from './Footer';
import TacqueriaList from './TacqueriaList';

function App() {
    return (
        <div className="relative flex flex-col min-h-screen bg-orange-50 font-sourcesanspro">
            <Header />
            <TacqueriaList />
            <Footer />
        </div>
    );
};

export default App;
