import "../styles/SizeGuideModal.css";
import measureImg from "../assets/feet.png";
import Table from "../assets/table.png";
import { FaTimes } from "react-icons/fa";

const SizeGuideModal = ({ open, close }) => {
  return (
    <div className={`size-guide-drawer ${open ? "open" : ""}`}>

      {/* HEADER */}

      <div className="size-guide-header">
        <button onClick={close}>
          <FaTimes />
        </button>

        <h3>SIZE GUIDE</h3>
      </div>

      {/* BODY */}

      <div className="size-guide-body">

        <img src={Table} alt="size table" className="size-table-img"/>

        <h4>HOW TO MEASURE</h4>

        <p className="measure-desc">
          In order to select the correct shoe size, we recommend
          you measure your feet using the following guidelines.
        </p>

        <img src={measureImg} alt="measure foot" className="measure-img"/>

        <div className="measure-text">

          <p>
            Wear the kind of socks or tights you would normally
            wear with this type of shoe.
          </p>

          <p>
            Stand up straight on a flat surface with your heel
            against a wall. If necessary, ask someone else to help
            you take the measurements.
          </p>

          <p>
            Measure from the base of your heel, keeping it passed
            against the wall, to the tip of your longest toe.
          </p>

          <p>
            Always measure both feet and use your longest foot
            as your benchmark.
          </p>

        </div>

      </div>

    </div>
  );
};

export default SizeGuideModal;