import { useEffect, useState } from 'react'
import './App.css'
import { asyncGet } from './utils/fetch'
import { Reservation } from './interfaces/Reservations'
import { api } from './enum/api'

function App() {
  const [Reservation, setReservation] = useState<Reservation[]>([])
  const fetchRevation = async () => {
    try {
      const response = await asyncGet(api.getAllReservations);
      if (response) {
        setReservation(response.data);
      } else {
        console.log("Failed to fetch reservations");
      }
    } catch (error) {
      console.log(`Server error: ${error}`);
    }
  }

  const formatDataTime = (dateTimeStr: string): string => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    fetchRevation();
  }, [])

  return (
    <div className='container'>
      <h1 className='title'>預約紀錄</h1>
      <div className='table-container'>
        <table className='reservation-table'>
          <thead>
            <tr>
              <th>預約 ID</th>
              <th>學生資訊</th>
              <th>座位</th>
              <th>時段</th>
              <th>建立時間</th>
            </tr>
          </thead>
          <tbody>
          {Reservation.map((item) => (
                <tr key={item.reservation_id} className="table-row">
                  <td>{item.reservation_id}</td>
                  <td>
                    <div>{item.student.student_name}</div>
                    <div className="student-id">{item.student.student_id}</div>
                  </td>
                  <td>
                    {item.seat.row_label}-{item.seat.seat_number}
                  </td>
                  <td>
                    {item.timeslot.start_time} - {item.timeslot.end_time}
                  </td>
                  <td>
                    {formatDataTime(item.create_time)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
