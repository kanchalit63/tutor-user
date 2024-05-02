import { Table, Button, Input,Badge } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiConfig } from '../../config/api.config';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { toast, ToastContainer } from 'react-toastify';

function Pending() {
  const [dataPending, setDataPending] = useState(null);
  const [searchText, setSearchText] = useState('');
  const token = Cookies.get('user-token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    getBookingPending();
  }, []);

  const getBookingPending = () => {
    axios.get(`${apiConfig.baseURL}/listbookingpending/${userId}`)
      .then((res) => {
        setDataPending(res.data.data);
      })
      .catch((err) => {
        console.log("Error fetching tutor data", err);
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios.patch(`${apiConfig.baseURL}/updateUserBookingReject`, { id: bookingId })
      .then(() => {
        toast.success('ยกเลิกการจองสำเร็จ');
        getBookingPending();
      })
      .catch((err) => {
        console.log("Error canceling booking", err);
      });
  };

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'นาสกุล',
      dataIndex: 'lastname',
      key: 'lastname'
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'tel',
      key: 'tel'
    },
    {
      title: 'วิชา',
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      key: 'techdate',
      title: 'วันที่',
      dataIndex: 'techdate',
      render: (createdAt) => (
        createdAt ? dayjs(createdAt).add(543, 'year').format('DD-MM-YYYY') : '' 
      ),
    },
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'ชื่อติวเตอร์',
      dataIndex: 'tutorname',
      key: 'tutorname'
    },
    {
      title: 'ประเภทการเรียน',
      dataIndex: 'study_place',
      key: 'study_place'
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'จัดการ',
      dataIndex: 'edit',
      key: 'edit'
    },
  ];

  const dataSource = dataPending ? dataPending.map(item => ({
    key: item.id,
    firstname: item.user_firstname,
    lastname: item.user_lastname,
    tel: item.user_tel,
    subject: item.subject_name,
    techdate: `${item.date}`,
    time: `${item.time}`,
    price: `${item.subject_price} บาท`,
    tutorname: item.tutor_name,
    study_place: item.study_place,
    status: item.status === 1 ? (
      <Button type='link' href='/check-payment'>รอชำระเงิน</Button>
    ) : null,
    edit: item.status === 1 ? (
      <Button type='text' danger onClick={() => handleCancelBooking(item.id)}>ยกเลิกการจอง</Button>
    ) : null,
  })) : [];

  const filteredDataSource = dataSource.filter(item =>
    item.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tel.toLowerCase().includes(searchText.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tutorname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.study_place.toLowerCase().includes(searchText.toLowerCase()) ||
    (item.status === 1 && 'รอชำระเงิน'.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <ToastContainer />
      <Input
        placeholder="ค้นหา"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Table dataSource={filteredDataSource} columns={columns} />
    </div>
  );
}

export default Pending;
