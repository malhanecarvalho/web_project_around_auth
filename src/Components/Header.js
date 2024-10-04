import logo from '../images/Vector.svg';
import line from '../images/linha.jpg';

function Header(){
    return(
    <>
     <header className="header">
        <img src={logo} className="logo" alt="imagem Around the U.S." />
        <img src={line} className="linha" alt="imagem linha horizontal"/>
      </header>
    </>
    )
}

export default Header;