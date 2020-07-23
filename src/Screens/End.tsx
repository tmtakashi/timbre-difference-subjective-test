import React from "react";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

const End: React.FC = () => {
  const history = useHistory();
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1>Experiment ended!</h1>
      <Button
        style={{ marginTop: "50px" }}
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/");
        }}
        startIcon={<HomeIcon />}
      >
        Go Back to Home
      </Button>
    </div>
  );
};

export default End;
