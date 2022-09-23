import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import AddEventModal from './AddEventModal'
import { useRef, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'


const Calendar = () => {
  const [modalOpen,setModalOpen] = useState(false)
  const [events,setEvents] = useState([])
  const calendarRef = useRef(null)
  const onEventAdded = (event) =>{
    let calenderApi = calendarRef.current.getApi()
    calenderApi.addEvent({
      start:moment(event.start).toDate(),
      end:moment(event.end).toDate(),
      title:event.title

  });
  }
  const handleEventAdd = async (data) =>{
    await axios.post("http://localhost:5000/api/calendar/createEvent",data.event)
    
  }
  const handleDatesSet = async (data) =>{
    const response = await axios.get("http://localhost:5000/api/calendar/getEvent?start="+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
    setEvents(response.data)
  }

  return (
   <section>
    <button onClick={()=>setModalOpen(!modalOpen)} className="w-25 btn btn-danger mt-3 shadow-none" style={{marginLeft:"35%"}}>Add Event</button>
    <div style={{position:"relative",zIndex:0}}>
       <FullCalendar
       ref={calendarRef}
       events={events}
        plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        eventAdd={(event)=>handleEventAdd(event)}
        datesSet={(date)=>handleDatesSet(date)}
        
      />
      </div>
      <AddEventModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} onEventAdded={event =>onEventAdded(event)}></AddEventModal>
   </section>
  )
}

export default Calendar