import { useState } from 'react';
import { Button } from '@/components/ui/button';

function Disabilitas() {
  const[file,setFile]=useState("");
  async function App(){
    console.warn(file);
    const formData=new FormData;
    formData.append('file',file);
    let result = await fetch("http://127.0.0.1:8000/api/elderly",{
      method:'POST',body :formData
    });
    alert("data added");
  }
  return (
    <div className="App">
     <input type="file" onChange={(e)=>setFile(e.target.files[0])}  ></input> 
     <Button className='btn btnbtn-primary-' onClick={App}>Submit</Button> 
    </div>
  );
  
    }
export default Disabilitas;
          