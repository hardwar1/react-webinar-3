import { useEffect } from "react";
import Main from "./main";
import ProductDetail from "./product-detail";
// import useSelector from "../../store/use-selector";
import { Routes, Route, useParams } from "react-router-dom";


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const id = useParams();
  useEffect(() => {
    console.log('id', id);
  }, [id])

  // const select = useSelector(state => ({
  //   list: state.catalog.product,
  // }));


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
    </>
  );
}

export default App;
