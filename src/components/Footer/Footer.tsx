import { Typography } from "@mui/material";
import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <Typography variant="h6">Federico Verly</Typography>
    </div>
  );
};

Footer.displayName = "Footer";
