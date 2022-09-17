import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Dashboard(props) {
  const [currPatient, setCurrPatient] = useState('');
  const location = useLocation();
  const clinicName = location.state.clinic;
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/clinicQueue", { clinicName })
      .then((response) => {
        setQueue(response.data);
        setCurrPatient(response.data[0].currUserName);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const removeHandler = (e) => {
    const userName = e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
    axios
      .post("http://localhost:3001/deleteAppointment", { clinicName, userName })
      .then((response) => {
        console.log(response.data);
        setQueue(response.data);
        setCurrPatient(response.data[0].currUserName);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let c = () => {
    if (props.mode === "dark") return "white";
    else return "black";
  };

  return (
    <>
      <div className="main" style={{ textAlign: "center", color: c() }}>
        <div
          id="top"
          style={{
            fontSize: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "50px",
            alignItems: "center",
            font: "caption",
          }}
        >
          <span> {clinicName}'s Dashboard</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: "50px",
            alignItems: "center",
            font: "caption",
            marginBottom: "120px",
          }}
        >
          <div id="time">
            Dr. {location.state.name}, your next Appointment
            <br />
            is with: <span id="appoint">{currPatient}</span>
          </div>
          <div className="line-in-middle"></div>
          <div>
            <h1>Queue Status:</h1>

            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-bordered table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((queueItem, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td className="oneN">
                          <span>{queueItem.currUserName}</span>
                          <span>
                            <button className="btn shadow-none" onClick={removeHandler}>
                              <img
                                src="https://img.icons8.com/color/30/000000/remove-user-male--v1.png"
                                width="80%"
                              />
                            </button>
                          </span>
                        </td>
                        <td className="oneC">{queueItem.currUserContact}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}