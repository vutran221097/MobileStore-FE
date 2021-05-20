import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js'
import Branding from './components/Branding/Branding.js';
import Navbar from './components/Navbar/Navbar.js'

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Branding />
      <Navbar />
    </div>
  );
}

export default HomePage;
