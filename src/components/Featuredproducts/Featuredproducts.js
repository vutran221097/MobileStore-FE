import React,{ useState, useEffect} from 'react'
import './Featuredproducts.css'
import axios from 'axios';

function Featuredproducts() {
    // const [phoneList,setPhoneList] = useState([])
    const getPhoneList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/tutorials');
            console.log(res);
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(()=>{
        getPhoneList();
    })

    return (
        <div className='feature-dproducts'>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Featuredproducts