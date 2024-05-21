import Navbar from './Components/navbar';
import RowLeft from './Components/rowleft'
import './styles.css';
import './App.css';


function App() { 
    return (
        <>
        <Navbar />
        <div style={{display : 'flex',justifyContent : 'center',overflowx: 'hidden'}}>
        <div className="weatherbody" id="weatherbody">
            <RowLeft />
            <div className="rightcol">
                <div className="card rcard no1"></div>
                <div className="card rcard no2"></div>
            </div>
        </div>
        </div>
        </>
    )
}

export default App;
