import  { useState } from 'react'
import Datetime from 'react-datetime';
import Modal from 'react-modal'
const AddEventModal = ({isOpen,onClose,onEventAdded}) => {
    const [title,setTitle] = useState("");
    const [start,setStart]:any = useState(new Date());
    const [end,setEnd]:any = useState(new Date())
    const onSubmit = (e:any) =>{
        e.preventDefault();
        onEventAdded({
            title,start,end
        })
        onClose();
    }
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
<form onSubmit={onSubmit} className="w-50">
    <input value={title} onChange={e=>setTitle(e.target.value)} className="mb-3" style={{marginLeft:"100%"}}></input>
    <Datetime value={start} onChange={date=>setStart(date)} className="mb-3 w-50"/>
    <Datetime value={end} onChange={date=>setEnd(date)} className="w-50"/>
    <button className='w-25 mt-3 btn btn-primary shadow-none'  style={{marginLeft:"98%"}}>Add Event</button>
</form>
    </Modal>
  )
}

export default AddEventModal