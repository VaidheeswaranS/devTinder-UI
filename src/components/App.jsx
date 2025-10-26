import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import ConnectionRequests from "./ConnectionRequests";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<ConnectionRequests />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      {/* <h1 className="text-3xl font-bold">Hello world!</h1> */}
    </>
  );
}

export default App;
