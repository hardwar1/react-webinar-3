import { useEffect } from "react";
import Main from "./main";
import ProductDetail from "./product-detail";
// import useSelector from "../../store/use-selector";
import { Routes, Route, useParams } from "react-router-dom";
import Basket from "./basket";
import useSelector from "../store/use-selector";
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const id = useParams();
  useEffect(() => {
    console.log('id', id);
  }, [id])


  return (
    <>
      <Routes>
        <Route path="/" element={
          <Main />
        } >
        </Route>

        <Route path="/product/:id" element={
          <ProductDetail />
        } />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
