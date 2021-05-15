import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js'
import Navbar from './components/Navbar/Navbar.js'

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Navbar />
    </div>
  );
}

export default HomePage;
