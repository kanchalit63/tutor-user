import { useState, useEffect } from 'react';
import { Modal, DatePicker, Rate } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { apiConfig } from '../../config/api.config';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';

function DetailTutor() {
  const { id } = useParams();
  const [detailtutor, setDetailtutor] = useState(null);
  const [reviewUser, setReviewUser] = useState([]);
  const [studyPlace, setStudyPlace] = useState('');
  const [note, setNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorId, setTutorId] = useState('');
  const token = Cookies.get('user-token');
  const decodedToken = jwtDecode(token);

  const handleStudyPlaceChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'studyPlace') {
      if (checked) {
        setStudyPlace(value);
      } else {
        setStudyPlace('');
      }
    } else if (name === 'homeAddress' || name === 'outsideAddress') {
      setNote(value);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  };

  useEffect(() => {
    getTutorList();
    getReviewUser()
  }, []);

  const getTutorList = () => {
    axios
      .get(`${apiConfig.baseURL}/listtutor/${id}`)
      .then((res) => {
        setDetailtutor(res.data.data);
        setTutorId(id);
      })
      .catch((err) => {
        console.log('Error fetching tutor data', err);
      });
  };

  const getReviewUser = () => {
    axios.get(`${apiConfig.baseURL}/reviewuser/${decodedToken.id}/${id}`, {
    }).then((res) => {
      setReviewUser(res.data.data);
    }).catch((err) => {
      console.log('Error fetching tutor data', err);
    });
  }



  const addBookingTutor = (values) => {
    axios
      .post(`${apiConfig.baseURL}/addbooking`, values)
      .then((res) => {
        console.log('res', res);
        setIsModalOpen(false);
        toast.success('จองติวเตอร์สำเร็จ');
        formik.resetForm();
      })
      .catch((err) => {
        console.log('Error fetching tutor data', err);
      });
  };



  const initialValues = {
    user_id: '',
    tutor_id: tutorId,
    tutor_subject_id: '',
    date: '',
    time: '',
    study_place: '',
    note: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.study_place = studyPlace;
      values.user_id = decodedToken.id;
      values.tutor_id = id;
      values.note = note;

      addBookingTutor(values);
    },
  });

  const timeValue = [
    { label: '08:00น. - 10:00น.', value: '08:00น. - 10:00น.' },
    { label: '10:00น. - 12:00น.', value: '10:00น. - 12:00น.' },
    { label: '12:00น. - 14:00น.', value: '12:00น. - 14:00น.' },
    { label: '14:00น. - 16:00น.', value: '14:00น. - 16:00น.' },
    { label: '16:00น. - 18:00น.', value: '16:00น. - 18:00น.' },
    { label: '18:00น. - 20:00น.', value: '18:00น. - 20:00น.' },
    { label: '20:00น. - 22:00น.', value: '20:00น. - 22:00น.' },
  ];

  return (
    <>
      <ToastContainer />
      <div className="mt-8 grid-cols-2 px-16 flex justify-between w-full my-16">
        {/* Section Left */}
        <section className="w-[75%]">
          <div className="space-y-8">
            <div className="bg-gray-100 items-center flex rounded-md drop-shadow-md py-8">
              <div className="w-[500px] flex justify-center">
                <img src={detailtutor?.image} alt="" className="w-52 h-52 rounded-full object-cover" />
              </div>
              <div className="w-[1500px] px-16 space-y-3">
                <div className="flex items-center space-x-9">
                  <h3 className="text-4xl"> TUTOR : {detailtutor?.firstname}</h3>
                  <div>
                    <span className="flex items-center">
                      RATING: {detailtutor?.avg_rating ? (
                        <>
                          <Rate value={detailtutor?.avg_rating} disabled />
                          <p className="ml-2">({detailtutor?.avg_rating})</p>
                        </>
                      ) : (
                        <>
                          <Rate value={0} disabled />
                          <p className="ml-2">(0)</p>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {detailtutor?.subject_names.split(',').map((subject, index) => (
                    <p key={index} className="bg-main-green px-4 rounded-2xl">{subject}</p>
                  ))}
                </div>
                <div>
                  {detailtutor?.description}
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg">
              <p className="bg-main-green pl-8 h-10 text-2xl flex items-center rounded-t-lg">ประสบการณ์ในการสอน</p>
              <div className="p-4">
                {detailtutor?.experience ? (
                  <p>{detailtutor?.experience}</p>
                ) : (
                  <p>ไม่มีประสบการณ์สอน</p>
                )}
              </div>
            </div>
            {reviewUser.length > 0 ? (
              reviewUser.map((review, index) => (
                <div key={index} className="bg-gray-100 rounded-lg">
                  <p className="bg-main-green pl-8 h-10 text-2xl flex items-center rounded-t-lg">รีวิวจากลูกค้าท่านอื่น</p>
                  <div className="p-8 space-y-4">
                    <p> - {review?.latest_review}</p>
                    <div className="flex items-center">
                      <Rate defaultValue={review?.average_rating} disabled />
                      <p className="pl-4">{review?.user_firstname} {review.user_lastname}</p>
                    </div>
                    <hr />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-100 rounded-lg">
                <p className="bg-main-green pl-8 h-10 text-2xl flex items-center rounded-t-lg">รีวิวจากลูกค้าท่านอื่น</p>
                <div className="p-8">
                  <p>ไม่มีรีวิวสำหรับติวเตอร์คนนี้</p>
                </div>
              </div>
            )}


          </div>
        </section>
        {/* End Section Left */}

        {/* Section Right */}
        <section className="space-y-4 w-[20%]">
          <div className="w-[300px] bg-gray-100 border-2 rounded-xl">
            <p className="bg-main-green rounded-t-xl pl-4 h-8 flex items-center">รูปแบบการสอน</p>
            <div className="my-4 space-y-4 ">
              <div className="pl-6 space-y-4 text-2xl font-bold">
                {detailtutor && typeof detailtutor.teach_style === 'string' ?
                  detailtutor.teach_style
                    .replace(/"/g, '') // ลบเครื่องหมายคำพูดทั้งหมด
                    .replace(/\\/g, '') // ลบเครื่องหมาย backslash
                    .slice(1, -1) // ตัดวงเล็บเหลี่ยมข้างนอกทิ้ง
                    .split(',') // แยกข้อมูลด้วย comma
                    .map((style, index) => (
                      <p key={index}>{style && style.trim()}</p> // ตรวจสอบ style ก่อนใช้งาน .trim()
                    ))
                  : null
                }
              </div>
              <div className="flex justify-center ">
                <button className="bg-blue-500 text-white w-full mx-4 h-8 rounded-md" onClick={() => setIsModalOpen(true)}>จองติวเตอร์</button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-bold mb-4 text-2xl">ราคา</p>
            <div className="text-xl space-y-2">
              {detailtutor?.prices.split(',').map((price, index) => (
                <div key={index}>
                  <p>{detailtutor?.subject_names.split(',')[index]} {price} บาท ต่อ ชั่วโมง</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold mb-4 text-2xl">วันที่ว่างสอน</p>
            <div className="text-xl">
              {detailtutor?.teach_date.replace(/"/g, '').split(', ').join(', ').slice(1, -1)}
            </div>
          </div>
        </section>
        {/* End Section Right */}
      </div>

      <Modal title={<span style={{ fontSize: '30px' }}>จองติวเตอร์</span>} open={isModalOpen} onCancel={handleCancel} footer={null} width={800} style={{ top: 20 }}>
        <form onSubmit={formik.handleSubmit}>
          {/* ข้อมูลติวเตอร์ */}
          <div>
            <p className="text-xl font-bold mb-2">ข้อมูลติวเตอร์</p>
            <div className="flex w-full ">
              <div className="w-[70%]">
                <p className="text-lg">ชื่อติวเตอร์</p>
                <input type="text" className="border-2 rounded-md pl-3 h-10 w-full text-lg" placeholder="ชื่อติวเตอร์" value={detailtutor?.firstname} disabled />
              </div>
              <div className="w-[30%] pl-2">
                <span className="text-lg">ราคา<span className="text-red-500">* (บาท)</span></span>
                <input
                  type='text'
                  className='border-2 rounded-md pl-3 h-10 w-full text-lg'
                  placeholder='ราคา (บาท)'
                  value={formik.values.price}
                  onChange={(event) => formik.setFieldValue('price', event.target.value)}
                  disabled
                />
              </div>
            </div>
          </div>
          <p className="mt-4 font-bold text-lg">ข้อมูลการจอง</p>
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-lg">วิชาที่ต้องการจะเรียน<span className="text-red-500">*</span></p>
              <select
                className="border-2 w-52 h-8 rounded-md"
                name="tutor_subject_id"
                value={formik.values.tutor_subject_id}
                onChange={(event) => {
                  formik.handleChange(event);
                  const selectedSubjectId = event.target.value.trim();
                  const subjectIndex = detailtutor?.tutor_subject_ids.split(',').indexOf(selectedSubjectId);
                  const selectedPrice = subjectIndex !== -1 ? detailtutor?.prices.split(',')[subjectIndex] : '';
                  formik.setFieldValue('price', selectedPrice);
                }}
              >
                <option>-- เลือกวิชา --</option>
                {detailtutor?.tutor_subject_ids.split(',').map((subjectId, index) => (
                  <option key={index} value={subjectId.trim()}>
                    {detailtutor?.subject_names.split(',')[index].trim()}
                  </option>
                ))}
              </select>


            </div>
            <div className="mt-4 space-y-2">
              <div className="space-x-2">
                <span className="text-lg">วันที่เรียน<span className="text-red-500">*</span></span>
                <DatePicker
                  value={formik.values.date}
                  onChange={(value) => formik.setFieldValue('date', value)}
                  disabledDate={disabledDate}
                />
              </div>
              <div className="space-x-2">
                <span className="text-lg">ช่วงเวลาที่ต้องการเรียน<span className="text-red-500">*</span></span>
                <select
                  name="time"
                  className="border-2 w-52 h-8 rounded-md pl-2"
                  value={formik.values.time}
                  onChange={(event) => formik.setFieldValue('time', event.target.value)}
                >
                  <option>-- เลือกเวลาเรียน --</option>
                  {timeValue.map((time, index) => (
                    <option key={index} value={time.value}>{time.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="mt-4 space-y-2">
                <p className="text-lg mt-2">สถานที่เรียน</p>
                <div>
                  <input
                    type="checkbox"
                    name="studyPlace"
                    id="online"
                    value="ออนไลน์"
                    checked={studyPlace === 'ออนไลน์'}
                    onChange={handleStudyPlaceChange}
                  />
                  <label htmlFor="online" className="text-base">เรียนออนไลน์</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="studyPlace"
                    id="atHome"
                    value="เรียนที่บ้าน"
                    checked={studyPlace === 'เรียนที่บ้าน'}
                    onChange={handleStudyPlaceChange}
                  />
                  <label htmlFor="atHome" className="text-base">เรียนที่บ้าน <span className="text-red-500">*หมายเหตุ เฉพาะเมื่อเลือกเรียนที่บ้าน</span></label>
                  <input
                    type="text"
                    className="border-2 rounded-md pl-3 h-10 w-full mt-2"
                    name="homeAddress"
                    placeholder="ที่อยู่"
                    value={studyPlace === 'เรียนที่บ้าน' ? note : ''}
                    onChange={handleStudyPlaceChange}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="studyPlace"
                    id="atOutside"
                    value="เรียนนอกบ้าน"
                    checked={studyPlace === 'เรียนนอกบ้าน'}
                    onChange={handleStudyPlaceChange}
                  />
                  <label htmlFor="atOutside" className="text-base">เรียนนอกบ้าน <span className="text-red-500">*หมายเหตุ เฉพาะเมื่อเลือกเรียนนอกบ้าน</span></label>
                  <input
                    type="text"
                    className="border-2 rounded-md pl-3 h-10 w-full mt-2"
                    name="outsideAddress"
                    placeholder="สถานที่"
                    value={studyPlace === 'เรียนนอกบ้าน' ? note : ''}
                    onChange={handleStudyPlaceChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-main-green px-8 py-3 text-white rounded-md mt-6"
              disabled={!formik.isValid || !formik.dirty}
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DetailTutor;
