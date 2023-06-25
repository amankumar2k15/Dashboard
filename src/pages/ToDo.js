import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import emailjs from 'emailjs-com';
import Toast from "../common/Toast";
// import moment from "moment/moment";
import { SERVER_URL } from '../constants';



const ToDo = () => {



    // code start 
    const urlPath = `${SERVER_URL}/Todo`
    var date = new Date()
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    const day = date.getDay();
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    const [todoName, setTodoName] = useState(null);
    const [todoData, setTodoData] = useState([])
    const [editButtonToggle, setEditButtonToggle] = useState(false)
    const [editInputSpanToggle, setEditInputSpanToggle] = useState(false)
    const [rowIndex, setRowIndex] = useState(null)
    const [inputTodo, setInputTodo] = useState(null)
    const [searchVal, setSearchVal] = useState("")

    const PendingCount = todoData.filter((item) => item.status === "Pending").length
    const CompletedCount = todoData.filter((item) => item.status === "Completed").length

    // Email.js
    const USER_ID = "V7MAXBMie3CQ9wRFH";
    const TEMPLATE_ID = "template_pm4qf9h";
    const SERVICE_ID = "amankumar2k15"
    // email.js ends


    const handleSubmitTodo = () => {
        if (todoName) {
            axios.post(urlPath, {
                todo: todoName,
                createdAt: (`${date.toLocaleDateString()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${am_pm}`),
                updatedAt: null,
                status: "Pending",
                itemCount: 0,
                day: `${daylist[day]}`,
                timeTaken: null

            }).then((res) => {
                // console.log(res)
                setTodoName(null)
                document.getElementById('todo').value = ""
                getTodoData()
                toast.success(`${todoName} added successfully`)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            alert('Please fill todo')
        }
    }

    const getTodoData = () => {
        axios.get(urlPath).then((res) => {
            setTodoData(res.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getTodoData()
    }, [])

    const handleDeleteTodo = (data) => {
        axios.delete(`${urlPath}/${data.id}`).then((res) => {
            console.log(res)
            getTodoData()
            // toast.error(`${data.todo} deleted successfully`)
            Toast(true, `${data.todo} deleted successfully`)
        }).catch((err) => {
            console.log(err)
        })
    }



    const handleEditTodo = (data, index) => {
        setInputTodo(data.todo)
        setEditButtonToggle(true)
        setEditInputSpanToggle(true)
        setRowIndex(index)
    }

    const handleUpdateTodo = (data) => {
        axios.patch(`${urlPath}/${data.id}`, {
            todo: inputTodo,
            itemCount: data.itemCount + 1
        }).then((res) => {
            console.log(res.data)
            setEditButtonToggle(false)
            setEditInputSpanToggle(false)
            toast.success("Item updated successfully")
            getTodoData()
            setInputTodo(null)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleCancelTodo = () => {
        setEditButtonToggle(false)
        setEditInputSpanToggle(false)
    }



    const handleTimeTaken = (createdAt, updateAt) => {
        let [startHour, startMinute] = createdAt.split(',')[1].slice(0, 6).split(":")
        let [endHour, endMinute] = updateAt.split(',')[1].slice(0, 6).split(":")

        // Convert the hours and minutes of both readings to minutes
        const totalMinutes1 = +startMinute + +(startHour * 60);
        const totalMinutes2 = +endMinute + +(endHour * 60);

        // Calculate the time difference
        let timeDifference = totalMinutes2 - totalMinutes1;
        console.log(timeDifference)

        // Handle negative time difference (spanning across two days)
        if (timeDifference < 0) {
            timeDifference = Math.abs(timeDifference * 60); // Assuming a 24-hour day
        }

        // Convert time difference back to hours and minutes format
        const diffHours = Math.floor(timeDifference / 60);
        const diffMinutes = timeDifference % 60;

        return (`${diffHours} hr ${diffMinutes} min`)
    }


    const handleCheckBox = (data) => {
        let updateAtValue = `${date.toLocaleDateString()},${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${am_pm}`
        axios.patch(`${urlPath}/${data.id}`, {
            status: "Completed",
            updatedAt: updateAtValue,
            timeTaken: handleTimeTaken(data.createdAt, updateAtValue)
        }).then((res) => {
            // //Send completed todo on email
            // if (res) {
            //     let data = {
            //         to_email: localStorage.getItem('email'),
            //         from_name: localStorage.getItem('username'),
            //         todo: res.data.todo
            //     };
            //     emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
            //         function (response) {
            //             console.log(response.status, response.text);
            //         },
            //         function (err) {
            //             console.log(err);
            //         }
            //     );
            // }
            getTodoData()
        }).catch((err) => console.log(err))
    }


    const filterPendingData = () => {
        const filterPending = todoData?.filter((item) => item.status === "Pending")
        setTodoData(filterPending)
    }

    const filterCompletedData = () => {
        const filterComplete = todoData?.filter((item) => item.status === "Completed")
        setTodoData(filterComplete)
    }


    return (
        <>

            <div className="main-content ">
                <div className="page-content">
                    <div className="container-fluid " >

                        {/*Title Section--> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-20">To Do</h4>
                                </div>
                            </div>
                        </div>


                        {/* Main Section Start*/}
                        <section >
                            <div className="d-flex justify-content-between align-items-center px-3" style={{ background: "rgb(225 225 225)" }} >
                                <div className="d-flex flex-row gap-3">
                                    <h1 className="text-black py-2 fa-2x">To Do </h1>
                                    <div className="d-flex flex-row  align-items-center gap-2">
                                        <input type="text" className="form-control form-control-lg text-black "
                                            placeholder="Search"
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="d-flex flex-row align-items-center gap-2 ">
                                    <a href="#!" data-mdb-toggle="tooltip" title="Pending todo">
                                        <div className="">
                                            <button type="button" className="btn border-0 btn-primary" onClick={filterPendingData} style={{ backgroundColor: "rgb(22 129 46)" }}>Pending {PendingCount}</button>
                                        </div>
                                    </a>
                                    <a href="#!" data-mdb-toggle="tooltip" title="Complete todo">
                                        <div>
                                            <button type="button" className="btn border-0 btn-primary " onClick={filterCompletedData} style={{ backgroundColor: "crimson" }}>Completed {CompletedCount}</button>
                                        </div>
                                    </a>

                                    <div className="card-body">
                                        <div className="d-flex flex-row align-items-center gap-2">
                                            <input type="text" className="form-control form-control-lg text-black " id="todo"
                                                placeholder="Add new . . . " onChange={(e) => setTodoName(e.target.value)} />

                                            <div>
                                                {/* <!-- Button trigger modal --> */}
                                                <button type="button" className="btn btn-primary" title="Add ToDo" data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: "#0d61d6", width: "100px" }}
                                                    onClick={handleSubmitTodo}>
                                                    Add ToDo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className=" text-white " style={{ background: "#3c3f4c" }} >
                                <ul className="flex-row d-flex justify-content-evenly w-100 mb-0" style={{ borderBottom: "1px solid white" }}>
                                    <li className=" lead fw-bolder mb-0 font-size-14 py-2  w-25 list-group" style={{ marginLeft: "-20px" }}>ID</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2  w-50 list-group-item " style={{ marginLeft: "-20px" }}>Status</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-75 list-group-item ">Task</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-75 list-group-item ">Created At</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-75 list-group-item ">Updated At</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-75 list-group-item ">Time Taken</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-50 list-group-item ">Day</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-50 list-group-item ">Mark As Done</li>
                                    <li className="lead fw-bolder mb-0 font-size-14 py-2 w-75 list-group-item">Actions Button</li>
                                </ul>

                                {
                                    todoData.filter((item) => item.todo.toLowerCase().includes(searchVal)).map((item, index) => {
                                        const crimsonColor = { backgroundColor: "crimson" }

                                        return (

                                            <ul key={item.todo} className="flex-row d-flex justify-content-evenly py-2 w-100 mb-0 border-light" style={{ borderBottom: "1px solid white" }}>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-25 list-group" style={{ marginLeft: "-20px" }}>
                                                    {item.id}
                                                </li>
                                                <li className={`${item.status === "Pending" ? "text-warning" : item.status === "Completed" && { crimsonColor }} lead mb-0 font-size-14 fw-medium py-2 w-50 list-group-item `} style={{ color: "crimson", marginLeft: "-20px" }}>
                                                    {item.status}
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-75 list-group-item ">
                                                    {
                                                        editInputSpanToggle && rowIndex === index ?
                                                            <input autoFocus defaultValue={item.todo} type="text" className="w-75 form-control fa-medium font-size-14 form-control-sm text-black "
                                                                onChange={(e) => setInputTodo(e.target.value)} />
                                                            :
                                                            <span className=" w-25 font-size-14  mb-0">{item.todo}</span>
                                                    }
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-75 list-group-item ">
                                                    {item.createdAt}
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-75 list-group-item ">
                                                    {item.updatedAt}
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-75 list-group-item ">
                                                    {item.timeTaken}
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-50 list-group-item ">
                                                    {item.day}
                                                </li>
                                                <li className="lead mb-0 font-size-13 fw-medium py-2 w-50  list-group-item ">
                                                    <input className="form-check-input me-0" disabled={item.status === "Completed" && true} type="checkbox" defaultChecked={item.status === "Completed" && true} id="checkbox"
                                                        aria-label="..." onClick={() => handleCheckBox(item)} />
                                                </li>
                                                <li className="w-75 list-group-item">
                                                    <div className="d-flex flex-row align-items-center gap-2 ">

                                                        {
                                                            editButtonToggle && rowIndex === index ?
                                                                <>
                                                                    <a href="#!" data-mdb-toggle="tooltip" title="Edit todo">
                                                                        <button type="button" className="btn border-0 btn-primary  " style={{ backgroundColor: "#091bb8" }}
                                                                            onClick={handleCancelTodo}> Cancel</button>
                                                                    </a>

                                                                    <a href="#!" data-mdb-toggle="tooltip" title="Delete todo">
                                                                        <button type="button" className="btn border-0 btn-primary " style={{ backgroundColor: "crimson" }}
                                                                            onClick={() => handleUpdateTodo(item)}>Save</button>
                                                                    </a>
                                                                </>
                                                                :
                                                                <>
                                                                    <a href="#!" data-mdb-toggle="tooltip" title="Edit todo">
                                                                        <button type="button" className="btn border-0 btn-primary" disabled={item.status === "Completed" && true || item.itemCount === 2 && true} style={{ backgroundColor: "#091bb8" }}
                                                                            onClick={() => handleEditTodo(item, index)}>Edit</button>
                                                                    </a>

                                                                    <a href="#!" data-mdb-toggle="tooltip" title="Delete todo">
                                                                        <button type="button" className="btn border-0 btn-primary " style={{ backgroundColor: "crimson" }}
                                                                            onClick={() => handleDeleteTodo(item)}>Delete</button>
                                                                    </a>
                                                                </>
                                                        }
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>

                        </section>
                        {/* Main Section End  */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ToDo;
