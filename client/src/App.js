import Header from './Header';
import Footer from './Footer';
import { supabase, SupabaseContext } from './Supabase';
import TaqueriaList from './TaqueriaList';

export default function App() {
    return (
        <SupabaseContext.Provider value={supabase}>
            <div className="relative flex flex-col min-h-screen bg-orange-50 font-sourcesanspro">
                <Header />
                <TaqueriaList />
                <Footer />
            </div>
        </SupabaseContext.Provider>
    );
}
