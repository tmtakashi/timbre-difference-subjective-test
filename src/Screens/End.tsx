import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const End: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      Experiment ended!
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        Go Back to Home
      </Button>
    </div>
  );
};

export default End;
