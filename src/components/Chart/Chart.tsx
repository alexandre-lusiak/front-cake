import { Grid } from '@mantine/core';
import { tab } from '@testing-library/user-event/dist/tab';
import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts";
import cakeRequest from '../../axios/cake';
import useApi from '../../hooks/useApi';
import Navigation from '../Navigation/Navigation';
import './Chart.css'
const ChartAdmin = () => {
    const { data: dataCakes, request: requestGetAllCake } = useApi(cakeRequest.getCakes)
    const [cakes, setCakes] = useState([]);
    const [datas, setDatas] = useState([]);
   
    useEffect(() => {
        requestGetAllCake().then((res) => {
            setCakes(res?.data?.data)
    
        });
    }, []);

 


    
      const data = [
        ["Gateaux", "Like", "comment"],
        ["New York City, NY", 8175000, 0],
      ];

     

     const options = {
        chart: {
          backgroundColor:'red',
        },
        bars: "vertical",
        bar: { groupWidth: "10%" },
        showRowNumber: false,
       
       
      };
      
    return (
<>
        <div style={{display:'flex',flexWrap:'wrap'}}>
      { cakes.map((cake:any) => 
            <div style={{padding:'100px'}}>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={[
                    [`${cake.name}`, 'commentaires', 'likes'],
                    [`Gateaux`, cake.comments.length, cake.cakeLikes.length],
                    
                  ]}
                  options={options}
                />
            </div>    
    )
    }
    </div>
    </>

    )
}

export default ChartAdmin;

