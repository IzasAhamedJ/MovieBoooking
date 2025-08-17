import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon, Tornado } from 'lucide-react';
import isotimeFormat from '../libraries/isoTimeFormta';
import Blur from '../components/Blur';
import toast from 'react-hot-toast';

function SeatLayout() {

    const { id, date } = useParams();

    const [selectedSeat, setSelectSeat] = useState([]);

    const [selectedTime, setSelectedTime] = useState(null);

    const [show, setShow] = useState(null);

    const navigate = useNavigate();

    const groupSeat=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]];


    


    const getShow = () => {
        const show =dummyShowsData.find(data => data._id === id);
        if (show) {
            setShow(
                {
                    showMoview: show,
                    dateTime: dummyDateTimeData
                }
            )
        }
    }

    const handleSeatClick=(seatId)=>{
       if(!selectedTime){
        return toast('Please Select The Time')
       }
       if(!selectedSeat.includes(seatId) && selectedSeat.length>7){
            return toast('You can only select Seven seat')
       }
       setSelectSeat(prev=>prev.includes(seatId)? prev.filter(seat=>seat!==seatId):[...prev,seatId]);
    }

    const handleProceedCheckOut=()=>{
      if(selectedSeat.length===0){
        return toast('Please Select Your Seat')
      }
      navigate('/mybookings')
      
    }

    const renderSeats=(row,count=9)=>(
       <div key={row} className='flex items-center gap-2 mt-2'>
        <div>
            {row}
        </div>
        <div className='flex flex-wrap items-center justify-center gap-2'>
           {
            Array.from({length:count},(_,i)=>{
                const seatId=`${row}${i+1}`;
                return(
                    <button key={seatId} onClick={()=>handleSeatClick(seatId)}
                    className={`h-8 w-8 bg-gray-700 rounded border cursor-pointer ${selectedSeat.includes(seatId) && 'bg-pink-700'}`}>
                          {seatId}                    
                    </button>
                )
            })
           }
        </div>
       </div>
    )

    useEffect(()=>{
       getShow();
      
    },[id])





    return show?(
     <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30
     md:py-50'>

        <div className='w-60 bg-gray-700 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
               <p className='text-lg font-semibold px-6 mb-3'>Available Timing</p>
               <div>
                  {show.dateTime[date].map((showTime)=>(
                    <div className={`flex items-center cursor-pointer py-2 gap-3 ${selectedTime===showTime.time?'bg-pink-500':''}`} onClick={()=>setSelectedTime(showTime.time)}>
                         <ClockIcon className='w-4 h-4'/>
                         <p>{isotimeFormat(showTime.time)}</p>
                    </div>
                  ))}
               </div>
        </div>


          {/* Seat Layout*/}
        <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
          <Blur top='-100px' left='-100px'/>
          <Blur bottom='0' right='0'/>
          <h1 className='text-2xl font-semibold mb-4'>Select Your Seat</h1>
          <img src={assets.screenImage} alt="" />
          <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
          <div className='flex flex-col items-center mt-10 text-gray-300'>
              <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                {groupSeat[0].map(seat => renderSeats(seat))}
              </div>

                <div className='grid grid-cols-2 gap-11'>
              {groupSeat.slice(1).map((group)=>(
                group.map(seat => renderSeats(seat))
              ))}
          </div>
          </div>
          

          <button className='flex items-center justify-center cursor-pointer bg-pink-500 mt-20 rounded-lg p-3 active:scale-95' onClick={handleProceedCheckOut}>Proceed To Checkout 
            <ArrowRightIcon strokeWidth={3} className='w-4 h-4'/>
          </button>
        
        </div>

     </div>
    ):(
        <Loading/>
    )
}

export default SeatLayout
