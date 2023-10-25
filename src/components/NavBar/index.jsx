import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"; // Zaimportuj odpowiednie style

const Navbar = ({ isAuthenticated, logoutUser }) => {
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Rezerwacja usług</h1>
        <div className={styles.navbar_right}>
          {isAuthenticated ? (
            <button type="button" className={styles.white_btn} onClick={logoutUser}>
              Wyloguj
            </button>
          ) : (
            <>
              <Link to="/login" className={styles.nav_link}>
                <button type="button" className={styles.white_btn}>
                  Logowanie
                </button>
              </Link>
              <Link to="/register" className={styles.nav_link}>
                <button type="button" className={styles.white_btn}>
                  Rejestracja
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
