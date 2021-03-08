import React from "react";
import styles from "./Logo.module.css";
export default function Logo({ title }) {
  return <h1 className={styles.logo}>{title}</h1>;
}
