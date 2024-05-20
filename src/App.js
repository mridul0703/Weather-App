import Navbar from './Components/navbar';
import Navigation from './Components/navigation'
import RowLeft from './Components/rowleft'
import RowRight from './Components/rowright'
import './styles.css';



function App() { 
    return (
        <>
        <Navbar />
        <Navigation />
        <div className="weatherbody" id="weatherbody">
            <RowLeft />
            <RowRight />
        </div>
        </>
    )
}

export default App;
