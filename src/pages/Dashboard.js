import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts'
// import { Stack } from 'react-bootstrap';



const Dashboard = () => {
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const urlPath = "http://localhost:3200/Todo"
    const [todoData, setTodoData] = useState([])
    const PendingCount = todoData.filter((item) => item.status === "Pending").length
    const CompletedCount = todoData.filter((item) => item.status === "Completed").length

    //To Display the list of ToDo on React-apex-chart
    const SundayCount = todoData.filter((item) => item.day === "Sunday").length
    const MondayCount = todoData.filter((item) => item.day === "Monday").length
    const TuesdayCount = todoData.filter((item) => item.day === "Tuesday").length
    const WednesdayCount = todoData.filter((item) => item.day === "Wednesday").length
    const ThursdayCount = todoData.filter((item) => item.day === "Thursday").length
    const FridayCount = todoData.filter((item) => item.day === "Friday").length
    const SaturdayCount = todoData.filter((item) => item.day === "Saturday").length


    const getTodoData = () => {
        axios.get(urlPath).then((res) => {
            setTodoData(res.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getTodoData()
    }, [])



    return (
        <div className="main-content" >
            <div className="page-content">
                <div className="container-fluid ">
                    {/* <!-- start page title --> */}

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Dashboard</h4>
                            </div>
                        </div>
                    </div>
                    {/* // Main Start  */}


                    {/*------------------------------ Count Board ------------------------------- */}
                    <div className='my-5 col-12 mb-5 p-3 container d-flex flex-column gap-2'>

                        <div className="col-auto shadow-lg bg-white rounded " style={{}}>
                            <div className="">
                                <Chart type="pie" height={500} width={500}
                                    series={[PendingCount, CompletedCount]}
                                    options={{
                                        color: ["#ffc107", "#198754"],
                                        labels: ["Pending", "Completed"],
                                        title: {
                                            text: "Count Board",
                                            style: {
                                                fontSize: 20,
                                                fontWeight: "bold"
                                            }
                                        },

                                    }}>
                                </Chart>
                            </div>
                        </div>
                        {/*------------------------------ Count Board ------------------------------- */}


                        {/*------------------------------ days Board ------------------------------- */}
                        <div className="d-flex col-auto shadow-lg bg-black rounded ">
                            <div className="ps-3 mt-3">
                                <Chart type="bar" height={500} width={600}
                                    series={[
                                        {
                                            name: "Todo",
                                            data: [SundayCount, MondayCount, TuesdayCount, WednesdayCount, ThursdayCount, FridayCount, SaturdayCount]
                                        }
                                    ]}
                                    options={{
                                        fill: {
                                            colors: ["#00B1F2"]
                                            // colors: ["#FF9800"]
                                        },
                                        xaxis: {
                                            tickPlacement: "on",
                                            categories: ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"],
                                            style: {
                                                color: ["#fff"]
                                            },
                                            title: {
                                                text: "Days of the Week",
                                                style: {
                                                    fontSize: 15,
                                                    fontWeight: "bold",
                                                }
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Counting',
                                                style: {
                                                    fontSize: 15,
                                                    fontWeight: "bold",
                                                }
                                            }
                                        },
                                        title: {
                                            text: "Bar Chart",
                                            style: {
                                                fontSize: 20,
                                                fontWeight: "bold",
                                            }
                                        },
                                        chart: {
                                            stacked: true
                                        },

                                    }}>
                                </Chart>
                            </div>
                        </div>




                    </div>
                    {/*------------------------------ days Board ------------------------------- */}





                    {/* --------------------------------------------- */}




                    {/* // Main End  */}
                </div>

            </div>


        </div>
    )
}

export default Dashboard;