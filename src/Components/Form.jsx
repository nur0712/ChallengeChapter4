import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputIcon from '@mui/icons-material/Input';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

function Form() {

    const [task, setTask] = useState("")
    const navigate = useNavigate();
    const params = useParams();
    useEffect(()=>{
      if(params.id){
          axios.get(`  https://fake-api-coba.herokuapp.com/todos/${params.id}`)
          .then((response) => {
              setTask(response.data.task)
            });
          }
    }, [params.id])
    const postData = (e) => {
        e.preventDefault();
        fetch(' https://fake-api-coba.herokuapp.com/todos/', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            task,
            complete: false,
        })
        }).then(() => {
          setTask('')
        })
      }
      const editData = (e) => {
        e.preventDefault();
        fetch(`https://fake-api-coba.herokuapp.com/todos/${params.id}`, {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({task})
        }).then(() => {
          navigate('/')
        })
      }  

    return (
    <div className="App">
    {params.id ? (<h1>ToDo Edit</h1>)
    : (<h1>ToDo Input</h1>)}
    <Paper
        component="form" 
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: 5 }}
        >
        <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Input ToDo/Edit ToDo" value={task} onChange={(e) => setTask(e.target.value)}/>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <InputIcon />
        </IconButton>
    </Paper>
    <div className='new-task'>
        {params.id ? (<Button variant="contained" color="success" endIcon={<EditIcon margin="5px" />} onClick={editData}>Edit Task</Button>)
        : (<Button variant="contained" color="success" endIcon={<AddCircleIcon margin="5px" />} onClick={postData}>Add New Task</Button>)}
        <Button variant="contained" startIcon={<ArrowBackIcon margin="5px" />} onClick={(e) => {
          e.preventDefault();
          navigate("/")
        }}>Back</Button>
      </div>
    </div>
    )
}

export default Form;