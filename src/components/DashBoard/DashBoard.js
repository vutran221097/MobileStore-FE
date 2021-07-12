import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import url from '../../setup';
import axios from 'axios';

function DashBoard() {
    const [labels,] = useState(['Thống kê sản phẩm'])
    const [, setProduct] = useState([])
    const [, setOrders] = useState([])
    const [iphone, setIphone] = useState(null)
    const [oppo, setOppo] = useState(null)
    const [samsung, setSamsung] = useState(null)
    const [lg, setLg] = useState(null)
    const [xiaomi, setXiaomi] = useState(null)
    const [sony, setSony] = useState(null)
    const [tablet, setTablet] = useState(null)
    const [accessories, setAccessories] = useState(null)

    const [totalDone, setTotalDone] = useState(null)
    const [totalProccess, setTotalProcess] = useState(null)


    useEffect(() => {
        async function getProduct() {
            try {
                const res = await axios.get(`${url}/products`);
                if (res.status === 200) {
                    setProduct(res.data.allProduct);
                    setIphone(res.data.allProduct.filter((item) => { return item.category === "apple" }).length)
                    setOppo(res.data.allProduct.filter((item) => { return item.category === "oppo" }).length)
                    setSamsung(res.data.allProduct.filter((item) => { return item.category === "samsung" }).length)
                    setLg(res.data.allProduct.filter((item) => { return item.category === "lg" }).length)
                    setXiaomi(res.data.allProduct.filter((item) => { return item.category === "xiaomi" }).length)
                    setSony(res.data.allProduct.filter((item) => { return item.category === "sony" }).length)
                    setTablet(res.data.allProduct.filter((item) => { return item.category === "tablet" }).length)
                    setAccessories(res.data.allProduct.filter((item) => { return item.category === "accessories" }).length)
                }
            } catch (error) {
                console.log(error)
            }
        }

        async function getOrder() {
            try {
                const res = await axios.get(`${url}/order`);
                if (res.status === 200) {
                    setOrders(res.data.allOrder);
                    setTotalDone(res.data.allOrder.filter((item) => { return item.status === 0 }).length)
                    setTotalProcess(res.data.allOrder.filter((item) => { return item.status === 1 }).length)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getOrder()
        getProduct()
    }, [])

    const datasets = [{
        label: 'Iphone',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [iphone]
    }, {
        label: 'Oppo',
        backgroundColor: 'rgba(0,255,0,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [oppo]
    }, {
        label: 'Samsung',
        backgroundColor: 'rgba(0,0,255,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [samsung]
    }, {
        label: 'LG',
        backgroundColor: 'rgba(192,192,192,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [lg]
    }, {
        label: 'Xiaomi',
        backgroundColor: 'rgba(255,255,0,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [xiaomi]
    }, {
        label: 'Sony',
        backgroundColor: 'rgba(255,0,255,0.3)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [sony]
    }, {
        label: 'Máy tính bảng',
        backgroundColor: 'rgba(255, 147, 71, 0.5)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [tablet]
    }, {
        label: 'Phụ kiện',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [accessories]
    }]

    const state = { labels, datasets }

    const donut = {
        labels: ['Đang xử lý', 'Đã giao hàng'],
        datasets: [
            {
                backgroundColor: ['rgba(0, 255, 59, 0.3)','rgba(255, 0, 0, 0.7)'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [totalProccess, totalDone]
            }
        ]
    }

    return (
        <div>
            <div>
                <Bar
                    data={state}
                    height={"70%"}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div className="mt-5">
                <Pie
                    data={donut}
                    height={"400%"}
                    width={"400%"}
                    options={{
                        title: {
                            display: true,
                            text: 'AAAAAAAAAAAAA',
                            fontSize: 100
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
            <p className="text-center mt-2">Thống kê tình trạng đơn hàng</p>

        </div>
    )
}

export default DashBoard