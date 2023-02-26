import "../App.css";
import { BsWhatsapp } from "react-icons/bs";

export const AddLocationText = () => {
  return (
    <div className="addLocationText">
      <div>
        Do you need a new location on 'Search paragliding spot' or 'Search
        outdoor location'? Just let me know...{" "}
        <span>
          <a
            href="https://api.whatsapp.com/send?phone=40734407892"
            target="blank"
            style={{ color: "rgb(2, 145, 2)" }}
          >
            <BsWhatsapp />
          </a>
        </span>
      </div>
    </div>
  );
};
