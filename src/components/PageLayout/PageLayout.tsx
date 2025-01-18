import React, { ReactNode } from "react";
import styles from "./PageLayout.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.appStyles}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

PageLayout.displayName = "PageLayout";
