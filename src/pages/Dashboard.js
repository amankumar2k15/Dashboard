import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { SERVER_URL } from '../constants';
import "./pages.css"



const Dashboard = () => {
    // console.log(SERVER_URL)
    const urlPath = `${SERVER_URL}/Todo`;
    const [todoData, setTodoData] = useState([])
    const PendingCount = todoData.filter((item) => item.status === "Pending").length
    const CompletedCount = todoData.filter((item) => item.status === "Completed").length

    //To Display the list of ToDo on React-apex-chart
    const SundayCount = todoData.filter((item) => item.day === "Sunday").length
    console.log(SundayCount)
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
            {console.log(todoData)}
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
                    <div className='my-5 container d-flex flex-column w-100  gap-2'>

                        <div className="col-auto shadow-lg  bg-white rounded ">
                            <div className="count_chart">
                                <Chart type="pie"
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


                        {/*------------------------------ Bar Chart ------------------------------- */}
                        <div className="d-flex col-auto shadow-lg rounded ">
                            <div className="bar_chart">
                                <Chart type="bar"
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
                                            categories: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
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
                    {/*------------------------------ Bar Chart ------------------------------- */}

                    {/* // Main End  */}
                </div>

            </div>


        </div>
    )
}

export default Dashboard;