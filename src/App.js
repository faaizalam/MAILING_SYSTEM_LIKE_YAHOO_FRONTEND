

import { Header } from "./Components/Header";

import {BrowserRouter,Link ,Route,Routes} from "react-router-dom"
import { Login} from "./Screen/Loginpage";
// import { Main } from "./Screen/";
import { Compose } from "./Screen/Compose";
import { SentScreen } from "./Screen/SentScreen";

import Draft from "./Screen/Draft";
import { ReplyMail } from "./Screen/ReplyMail";
import {Inbox} from "./Screen/Inbox";
import ErrorPage from "./Screen/ErrorPage";
import Spam from "./Screen/Spam";
import { SIGNUP } from "./Screen/Signup";
import { Archive } from "./Screen/Archive";
import Trash from "./Screen/Trash";
import { Forget } from "./Screen/Foget";


function App() {
  return (
    <BrowserRouter>
 <div className="App">
  
 <Header/>
 <Routes>
 <Route path="/" element={<Login/>}></Route>
 <Route path="/Signup" element={<SIGNUP/>}></Route>
 <Route path="/Inbox" element={<Inbox/>} ></Route>
 {/* <Route path="/compose" element={<Compose/>} ></Route> */}
 <Route path="/send" element={<SentScreen/>} ></Route>
 <Route path="/Reply/:id" element={<ReplyMail/>} ></Route>
 <Route path="/draft" element={<Draft/>} ></Route>
 <Route path="/compose/:id" element={<Compose/>} ></Route>
 <Route path="/sent" element={<SentScreen/>} ></Route>
 <Route path="/trash" element={<Trash/>} ></Route>
 <Route path="/Spam" element={<Spam/>} ></Route>
 <Route path="/Archive" element={<Archive/>} ></Route>
 <Route path="/Forget" element={<Forget/>} ></Route>
 
 <Route path="*" element={<ErrorPage/>} ></Route>
 {/* <Route path='*' element={<Erroroage></Erroroage>}></Route> */}
 {/* <Route path="/draft/:id" element={<Draft/>} ></Route> */}

 </Routes>
  
  </div>
    </BrowserRouter>
  // <Container>
    
  //     <Row className="banner">
        
  //       <Col xs={9}>Banner</Col>
  //     </Row>
  //     <Row className="header">
        
  //       <Col xs={9}>hedaer</Col>
  //     </Row>
  //     <Row>
  //       <Col>1 sidebar</Col>
  //       <Col>2 main</Col>
  //       <Col>3 last</Col>
  //     </Row>
  //   </Container>


    // </div>
  );
}

export default App;
