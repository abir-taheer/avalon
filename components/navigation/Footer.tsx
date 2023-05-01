import { makeStyles } from "tss-react/mui";
import { Divider, Stack } from "@mui/material";

/*
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer img {
  margin-left: 0.5rem;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 1em;
  margin-right: 0.3em;
}
 */

const useStyles = makeStyles()((theme) => ({
  Footer: {
    width: "100%",
    height: "100px",
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  FooterA: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  FooterLogo: {
    height: "1em",
    marginRight: "0.3em",
    marginLeft: "0.5rem",
  },
}));

export const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.Footer}>
      <a
        href="https://github.com/abir-taheer/avalon"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.FooterA}
      >
        View source on
        <img
          src="/github-logo.png"
          alt="Github Logo"
          className={classes.FooterLogo}
        />{" "}
        <b>GitHub</b>
      </a>
    </footer>
  );
};
