import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();

  return (
    <AppBar
      position="static"
      style={{
        background: "#2E3B55",
      }}
    >
      <CssBaseline />
      <Toolbar>
        <Typography
          onClick={() => router.push("/")}
          variant="h4"
          style={{
            flexGrow: "1",
            cursor: "pointer",
          }}
        >
          Navbar
        </Typography>
        {router.asPath === "/tasks/new" ? (
          <div style={{ display: "flex", marginLeft: "10px" }}></div>
        ) : (
          <div style={{ display: "flex", marginLeft: "10px" }}>
            <Link
              href={"/tasks/new"}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
                marginLeft: "20px",
              }}
            >
              New
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
