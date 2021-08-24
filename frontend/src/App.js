import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import Home from "./screens/HomePage/Home";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import SavedForms from "./screens/SavedForms/SavedForms";
import Admissions from "./screens/Admissions/Admissions";
import Kpi4_5 from "./screens/Kpi/Kpi4_5";
import EditForms from "./screens/EditForms/EditForms";
import Kpi4_5New from "./screens/Kpi/Kpi4_5New";
import HodPage from "./screens/HodPage/HodPage";
import HodViewPage from "./screens/HodViewPage/HodViewPage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/savedforms" component={SavedForms} />
        <Route exact path="/editform/:id" component={EditForms} />
        {/* <Route exact path="/admissions" component={Admissions} /> */}
        <Route exact path="/kpi4_5" component={Kpi4_5} />
        <Route exact path="/kpi4_5new" component={Kpi4_5New} />
        <Route exact path="/hod" component={HodPage} />
        <Route exact path="/hod/view/:id" component={HodViewPage} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
