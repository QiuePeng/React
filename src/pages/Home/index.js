import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants"

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";


//API取值
async function fetchData(setData) {
    const res = await fetch(API_GET_DATA)
    const {data} = await res.json()
    setData(data)
} 


async function fetchSetData(data) {
    const res = await fetch(API_GET_DATA, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ data })
    })
}


const Home = () => {
  const [data, setData] = useState([]);
  const submittingData = useRef(false);

  useEffect(() => {
    if (!submittingData.current) {
        return
    }
    fetchSetData(data).then(data => submittingData.current =false)
  },[data])

  //進入頁面渲染一次，將值帶入setData
  useEffect(() => {
    fetchData(setData)
  },[])

  return (
    <div className="app">
      <Edit add={setData} submittingData={submittingData}/>
      <List listData={data} deleteData={setData} submittingData={submittingData}/>
    </div>
  );
};

export default Home;
