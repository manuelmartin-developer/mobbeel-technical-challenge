import { ToastContainer } from "react-toastify";

import styles from "./Layout.module.scss";
import "react-toastify/dist/ReactToastify.css";

import Header from "../header/Header";

type Props = {
  /**
   * The children to render inside the layout
   * @type {React.ReactNode}
   * @memberof LayoutProps
   * @required
   * @example
   * <Layout>
   * <div>Content</div>
   * </Layout>
   * */
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggablePercent={60}
        closeButton={true}
        theme="colored"
      />
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
