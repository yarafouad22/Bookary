import { Container } from "react-bootstrap";
import Header from "../../Component/Shared/Header/Header";
import styles from "./style.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../../Component/Shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default MainLayout;
