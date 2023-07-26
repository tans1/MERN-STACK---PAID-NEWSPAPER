import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './pages/details';
import Home from './pages/home';
import LogIn from './pages/login';
import PaymentOption from './pages/paymentOption';
import Signup from './pages/signup';
import MakePayment from './pages/makePayment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details' element= {<Details />} />
          <Route path='/payment-option' element= {<PaymentOption />} />
          <Route path='/signup' element= {<Signup />} />
          <Route path='/login' element= {<LogIn />} />
          <Route path='/make-payment' element = {<MakePayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
