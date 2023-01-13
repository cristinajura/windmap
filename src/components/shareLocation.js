import "../App.css";
import { BsWhatsapp } from "react-icons/bs";

const ShareLocation = (props) => {
  let url = `https://api.whatsapp.com/send?text=${props.popup}, GPS: ${props.marker[0]}, ${props.marker[1]}`;

  return (
    <div className="shareLocationText">
      The location marker is placed on {props.popup}, GPS: {props.marker[0]},{" "}
      {props.marker[1]}. Location can be shared via{"  "}
      <a href={url} target="blank">
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default ShareLocation;
