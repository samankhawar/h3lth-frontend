import React, { useLayoutEffect, useRef, useState } from 'react'
import "./ChatAdmin.css"
import { useEffect } from 'react'
import Axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import { useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancelScheduleSend } from "react-icons/md";

const ChatAdmin = () => {
  const [messagein, setMessagein] = useState("");
  const [chatresponsedata, setChatresponsedata] = useState([])
  const [scrollmanage, setScrollManage] = useState(false)
  const [messageresponse, setMessageresponse] = useState("")
  const [Lodingmessage, setLoadingmessage] = useState(false);
  const [getuserdata, setgetuserdata] = useState("");
  const [gettingchatdataparsenew, setgettingchatdataparse] = useState("");
  const [Newobjectdata, setNewobjectdata] = useState({});
  const containerRef = useRef(null);


  const [Questions, setQuestions] = useState([])
  const [Answers, setAnswers] = useState([])
  const user = useSelector((state) => state?.Auth?.user?.id);

  useEffect(() => {
    const gwttinguserdata = localStorage.getItem("userId");
    const gettingchatdata = localStorage.getItem("chatdetail");
    const gwttinguserdataparse = parseInt(gwttinguserdata);
    const gettingchatdataparsenew = JSON.parse(gettingchatdata);

    setgetuserdata(gwttinguserdataparse);
    setgettingchatdataparse(gettingchatdataparsenew)
  }, [])

  useEffect(() => {
    const getdocuments = JSON.parse(localStorage.getItem("chat_pictures_fr_chat"))
    const questionsanswers = JSON.parse(localStorage.getItem("Questions_fr_chat"))
    setQuestions(getdocuments)
    setAnswers(questionsanswers)
  }, [])


  console.log("gettingchatdataparsenew", gettingchatdataparsenew)

  useLayoutEffect(() => {

    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }

  }, [messagein, scrollmanage]);

  const handlePostRequest = async () => {
    setLoadingmessage(true);
    try {
      // Generate dynamic data here
      const postData = {
        userId: getuserdata,
        chat: gettingchatdataparsenew?.request_chat_id,
        doctor: user,
        doctor_question: messagein,
        response_type: "doctor"
      };

      const response = await Axios.post('https://api.backend.h3lth.net/doctor-chat/api/thread/doctorpost', postData);
      console.log('Response from server:', response.data);
      setMessageresponse(response.data)
      setMessagein("")
      setLoadingmessage(false);
      // Handle the response as needed
    } catch (error) {
      console.error('Error making POST request:', error.message);
      setLoadingmessage(false);
      // Handle the error as needed
    }
  };

  useEffect(() => {
    const handleGetRequest = async () => {
      try {
        const response = await Axios.get(`https://api.backend.h3lth.net/doctor-chat/api/thread/doctorget?chatId=${gettingchatdataparsenew?.request_chat_id}&doctor=${user}`);
        console.log('Response from server:', response.data.data);
        setChatresponsedata(response.data.data);
        setScrollManage(!scrollmanage)
        // setResponseData(response.data);
        // Handle the response as needed
      } catch (error) {
        console.error('Error making GET request:', error.message);
        // Handle the error as needed
      }
    };
    handleGetRequest();
    const intervalId = setInterval(() => {
      handleGetRequest();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [messageresponse, gettingchatdataparsenew?.request?.doctors[0], gettingchatdataparsenew?.request_chat_id, user])


  useEffect(() => {
    const localdata = localStorage.getItem("userviewticket");
    setNewobjectdata(JSON.parse(localdata))
  }, [])


  console.log("chatresponsedata", chatresponsedata);
  console.log("Newobjectdata", Newobjectdata)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePostRequest();
    }
  };

  function formatDate(apiDate) {
    const date = new Date(apiDate);

    const day = date.getDate();
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${day} ${weekday} ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
    return formattedDate;
  }



  return (
    <div className='col-md-12 background_chat_main '>
      <div className='row px-3 py-4'>
        <div className='col-md-12 height_of_chat2'>
          <div className='col-md-12 background_chat_head'>
            <div className='col-md-12 py-2'>
              <div className='row'>
                <div className='col-md-1 px-0'>
                  <img className='img-fluid rounded-circle  img_height_width' src='/images/avatar.webp' />
                </div>
                <div className='col-md-2 pt-4 px-0'> <p className='m-0 p-0 name_person'> {gettingchatdataparsenew?.request?.request?.mainuser?.user?.name} </p></div>
                <div className='col-md-9 m-auto'>
                  {Questions?.map((item, index) => {
                    console.log("item", Questions)
                    return (
                      <a href={`${item}`} target='_blank' className='text_dec_none'>
                        <img className='img-fluid height_of_chat_pic' src={`${item}`} />
                      </a>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12 background_chat_head mt-2'>
            <div className='col-md-12 py-2'>
              <div className='row'>
                <div className='col-md-3 px-0'> <p className='m-0 p-0 name_person'>Gender :</p><span>
                  {Newobjectdata?.request?.is_sub_user === false ?
                    <>{Newobjectdata?.request?.mainuser?.gender} </> :
                    <>{Newobjectdata?.request?.user?.gender} </>
                  }
                </span></div>
                <div className='col-md-3 px-0'> <p className='m-0 p-0 name_person'>Date & Time :</p><span>
                  <Moment format="YYYY-MM-DD / HH:mm:ss A" >
                    {Newobjectdata?.created_date}
                  </Moment>
                </span></div>
                <div className='col-md-3 px-0'> <p className='m-0 p-0 name_person'>Form Title :</p><span>
                  {Newobjectdata?.request?.form?.title}
                </span></div>
                <div className='col-md-3 px-0'> <p className='m-0 p-0 name_person'>Height :</p><span>
                  {Newobjectdata?.request?.is_sub_user === false ?
                    <>{Newobjectdata?.request?.mainuser?.height} {Newobjectdata?.request?.mainuser?.height_unit} </> :
                    <>{Newobjectdata?.request?.user?.height} {Newobjectdata?.request?.user?.height_unit} </>
                  }
                </span></div>
                <div className='col-md-3 mt-2 px-0'> <p className='m-0 p-0 name_person'>Catagory :</p><span> {Newobjectdata?.request?.form?.category?.title}</span></div>
                <div className='col-md-3 mt-2 px-0'> <p className='m-0 p-0 name_person'>Weight :</p><span>
                  {Newobjectdata?.request?.is_sub_user === false ?
                    <>{Newobjectdata?.request?.mainuser?.weight} {Newobjectdata?.request?.mainuser?.weight_unit}</> :
                    <>{Newobjectdata?.request?.user?.weight} {Newobjectdata?.request?.user?.weight_unit}</>
                  }
                </span></div>
              </div>
            </div>
          </div>
          <div className='col-md-12 height_of_msg py-4 px-2' id='style-3' ref={containerRef}>
            <div className='row'>


              {Answers?.map((item, index) => {

                return (
                  <>
                    {item?.typeQ !== "Document" ? (
                      <React.Fragment key={index}>
                        <div className='col-md-6'>
                          <div className='col-md-12 color_blue_text1'>
                            <h6 className='mt-3  px-3 py-2 mb-1'><b>Question: </b>{item?.question?.question}</h6>
                          </div>
                        </div>
                        <div className='col-md-6'>
                        </div>
                      </React.Fragment>
                    ) : null}
                    {item?.typeQ === "Document" ?
                      <>
                      </>
                      :
                      <>
                        <div className='col-md-6'>
                          <div className='col-md-12 color_blue_text1'>
                            <h6 className='mt-3 px-3 py-2 mb-1 '><b>Answer: </b>{item?.answer}</h6>
                          </div>
                        </div>
                        <div className='col-md-6'>
                        </div>
                      </>
                    }
                  </>
                )
              })}
            </div>
            {chatresponsedata?.map((index, item) => {
              console.log("indexx12", index)
              return (
                <>
                  {index?.patient_answer &&
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='col-md-12 color_blue_text1 mt-2'>
                          <h6 className='mt-2  px-3 py-2 '>{index?.patient_answer}</h6>
                        </div>
                        <div className='col-md-12 '>
                          <p className='m-0 p-0 chat_text_date_format'>{formatDate(index?.createdAt)}</p>
                        </div>
                      </div>
                      <div className='col-md-6'>
                      </div>
                    </div>
                  }
                  {index?.doctor_question && index?.patient_answer === null &&
                    <div className='row'>
                      <div className='col-md-6'>
                      </div>
                      <div className='col-md-6  '>
                        <div className='col-md-12 color_blue_text py-1 mt-2'>
                          <h6 className=' mt-2 rounded-pill '><span className=' px-3 py-1 mt-3 ' dangerouslySetInnerHTML={{ __html: index?.doctor_question }} /></h6>
                        </div>
                        <div className='col-md-12 text-right '>
                          <p className='m-0 p-0 chat_text_date_format'>{formatDate(index?.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  }
                </>
              )
            })}

          </div>
          <div className='col-md-12 bg-white py-2 input_bottom d-flex'>
            <input disabled={Lodingmessage} className='form-control new_place_holder w-100' onKeyDown={messagein.length != 0 && handleKeyDown} value={messagein} onChange={(e) => setMessagein(e.target.value)} placeholder='Enter message here' />
            {messagein.length === 0 ?
              <button className='btn btn-primary ml-2' disabled >{Lodingmessage === false ? <MdOutlineCancelScheduleSend /> :
                <div className="spinner-border spinner-border-sm text-white" role="status">
                </div>

              }</button>
              :
              <button className='btn btn-primary ml-2' onClick={handlePostRequest}>{Lodingmessage === false ? <IoIosSend /> :
                <div className="spinner-border spinner-border-sm text-white" role="status">
                </div>

              }</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAdmin