import { Table, Input } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiConfig } from '../../config/api.config';
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"
import dayjs from "dayjs";

function Rejected() {

  const [dataReject, setDataReject] = useState(null)
  const [searchText, setSearchText] = useState('');
  const token = Cookies.get('user-token')
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    getBookingPending();
  }, []);

  const getBookingPending = () => {
    axios.get(`${apiConfig.baseURL}/listbookingreject/${userId}`)
      .then((res) => {
        setDataReject(res.data.data)
      })
      .catch((err) => {
        console.log("Error fetching tutor data", err);
      });
  }

  const columns =[
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

  const dataSource = dataReject ? dataReject.map(item => ({
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
    status: item.status === 3 ? <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">ปฏิเสธการจอง</span> : 'อื่นๆ',
    edit: <button className="bg-blue-500 text-white p-2 rounded-md">ขอคืนเงิน</button>
  })) : [];

  const filteredDataSource = dataSource.filter(item =>
    item.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tel.toLowerCase().includes(searchText.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    item.tutorname.toLowerCase().includes(searchText.toLowerCase()) ||
    item.study_place.toLowerCase().includes(searchText.toLowerCase()) ||
    (item.status === 3 && 'ปฏิเสธงาน'.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div>
      <Input
        placeholder="ค้นหา"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Table dataSource={filteredDataSource} columns={columns} />
    </div>
  )
}

export default Rejected;
