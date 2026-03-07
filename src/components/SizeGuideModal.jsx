import "../styles/SizeGuideModal.css";
import measureImg from "../assets/feet.png"; // foot measurement image
import Table from '../assets/table.png'
import { FaTimes } from "react-icons/fa";

const SizeGuideModal = ({ close }) => {
  return (
    <div className="size-modal-overlay">

      <div className="size-modal">

        <div className="size-modal-header">
          <button onClick={close}>
            <FaTimes />
          </button>
          <h3>SIZE GUIDE</h3>
        </div>

        <div className="size-modal-body">

          {/* SIZE TABLE */}
            <img src={Table} alt="table-size" />

          {/* <table className="size-table">
            <tbody>

              <tr>
                <td>Size</td>
                <td>39</td><td>40</td><td>41</td><td>42</td><td>43</td>
                <td>44</td><td>45</td><td>46</td><td>47</td><td>48</td>
              </tr>

              <tr>
                <td>US</td>
                <td>6</td><td>7</td><td>8</td><td>9</td><td>10</td>
                <td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
              </tr>

              <tr>
                <td>EUR</td>
                <td>39</td><td>40</td><td>41</td><td>42</td><td>43</td>
                <td>44</td><td>45</td><td>46</td><td>47</td><td>48</td>
              </tr>

              <tr>
                <td>UK</td>
                <td>5</td><td>6</td><td>7</td><td>8</td><td>9</td>
                <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td>
              </tr>

              <tr>
                <td>JP</td>
                <td>26</td><td>26.5</td><td>27</td><td>27.5</td><td>28.5</td>
                <td>29</td><td>29.5</td><td>30</td><td>30.5</td><td>31</td>
              </tr>

              <tr>
                <td>KR</td>
                <td>245</td><td>250</td><td>260</td><td>270</td><td>280</td>
                <td>290</td><td>300</td><td>310</td><td>320</td><td>330</td>
              </tr>

            </tbody>
          </table> */}

          {/* HOW TO MEASURE */}

          <h4>HOW TO MEASURE</h4>

          <p>
            In order to select the correct hoe size, we recommend
            you measure your feet using the following guidelines.
          </p>

          <img src={measureImg} alt="measure foot" className="measure-img"/>

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