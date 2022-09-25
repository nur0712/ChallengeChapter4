import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Home() {
  const [data, setData] = useState([])
  const [task, setTask] = useState("")
  const [refetchData, setRefetchData] = useState(true);
  const fetchData = async () => {
        try {
          const res = await axios.get('https://fake-api-coba.herokuapp.com/todos/');
          setData(res?.data);
        } catch (error) {
          console.log(error);
        } finally {
          setRefetchData(false);
        }
      };

  useEffect(() => {
    if (refetchData) {
      fetchData();
    }
  }, [refetchData]);

  const all = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: "  https://fake-api-coba.herokuapp.com/todos/",
      });
      setData(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const done = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: "  https://fake-api-coba.herokuapp.com/todos?complete=true",
      });
      setData(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const todo = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: "  https://fake-api-coba.herokuapp.com/todos?complete=false",
      });
      setData(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const search = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `  https://fake-api-coba.herokuapp.com/todos?q=${task}`,
      });
      setData(res?.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: `  https://fake-api-coba.herokuapp.com/todos/${id}`,
      });
      setRefetchData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const markDone = (data) => {
      axios.put(`  https://fake-api-coba.herokuapp.com/todos/${data.id}`, {
        ...data,
        complete: !data.complete,
      }).then(()=>{
        setRefetchData(true)
      })
  };

  const idDone = data?.filter(todo=>todo.complete===true).map(item=>item.id)
  const idAll = data?.map(item=>item.id)

  const handleDeleteDone = () => {
    Promise.all(
      idDone.map((id) => 
        fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
          method: "DELETE",
        }).then((res)=>res)
        .then((data)=>data.complete)
      )
    ).then(()=>{
      setRefetchData(true)
    })
  }

  const handleDeleteAll = () => {
    Promise.all(
      idAll.map((id) => 
        fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
          method: "DELETE",
        }).then((res)=>res)
        .then((data)=>data.complete)
      )
    ).then(()=>{
      setRefetchData(true)
    })
  }

  const navigate = useNavigate();

  const arr = data.map((data, index) => {
    return (
        <React.Fragment key = {data.id}>
            <div className="col taskBg">
              <div className={ data.complete ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{data.task}</span>
              </div>
              <div className="iconsWrap">
                  { data.complete ? ( <Checkbox onChange={ (e) => { 
                    e.preventDefault();
                    markDone(data)}} defaultChecked/> ) : ( 
                    <Checkbox onChange={ (e) => { 
                      e.preventDefault();
                      markDone(data)}}/>
                  )}
                  
                  <span title="Edit"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/form/${data.id}`)
                  }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                
                <span title="Delete"
                  onClick={() => handleDelete(data.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
      </React.Fragment>
    )
  })

  return (
    <>
    <div className="App">
      <h1>ToDo Search</h1>
      <div className='search'>
        <span className='cari'>
        <Paper
          component="form" 
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: 5 }}
          >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search ToDo"
            value={task} onChange={(e) => setTask(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        </span>
      </div>
      <div className='new-task'>
        <Button variant="contained" endIcon={<SearchIcon margin="5px" />} onClick={search}>Search</Button>
      </div>
      <h1>ToDo List</h1>
      <div className='to-do-list'>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={all}>All</Button>
          <Button onClick={done}>Done</Button>
          <Button onClick={todo}>ToDo</Button>
        </ButtonGroup>
      </div>
      <div className='new-task'>
        <Button variant="contained" color="success" endIcon={<AddCircleIcon margin="5px" />} onClick={(e) => {
          e.preventDefault();
          navigate("/form")
        }}>Add New Task</Button>
      </div>
        {arr}
        <div className='new-task'>
          <Button variant="contained" color="error" endIcon={<HighlightOffIcon margin="5px" />} onClick={handleDeleteDone}>Delete Complete Task</Button>
          <Button variant="contained" color="error" startIcon={<DeleteForeverIcon margin="5px" />} onClick={handleDeleteAll}>Delete All Task</Button>
        </div>
    </div>
    </>
  )
}

export default Home;