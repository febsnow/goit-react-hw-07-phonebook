import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Preloader = ()=> {
  return (
      <Loader
        style={{ backgroundColor: "rgba(255,255,255,0.9)", textAlign: "center", position: "fixed", zIndex: "10", top: "0", left: "0", right: "0", bottom: "0" }}
    
        type="TailSpin"
        color="rgba(250, 187, 14, 0.952)"
        height={300}
        width={300}
      />
    );
  
}
