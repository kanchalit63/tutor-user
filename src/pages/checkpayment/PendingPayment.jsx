import { Modal } from 'antd';
import { Table, Button } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { apiConfig } from '../../config/api.config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';


const PendingPayment = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataPending, setDataPending] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // เพิ่ม state สำหรับเก็บรูปภาพที่เลือก
    const [modalType, setModalType] = useState(null); // เพิ่ม state เพื่อเก็บประเภทของ Modal
    const token = Cookies.get('user-token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    console.log(selectedRow)


    const handleRowClick = (record) => {
        setSelectedRow(record);
        setModalType(record.status === "รอชำระเงิน" ? 'payment' : 'proof'); // กำหนดประเภทของ Modal ตามสถานะของการชำระเงิน
        setModalVisible(true);
    };


    const handleModalClose = () => {
        setSelectedRow(null);
        setModalVisible(false);
    };

    useEffect(() => {
        getBookingPending();
    }, []);

    const getBookingPending = () => {
        axios.get(`${apiConfig.baseURL}/getpaymentbooking/${userId}`)
            .then((res) => {
                setDataPending(res.data.data);
            })
            .catch((err) => {
                console.log("Error fetching tutor data", err);
            });
    };

    const addPayment = () => {
        if (!selectedRow) {
            console.log("No row selected");
            return;
        }

        const formData = new FormData();
        formData.append('tutor_id', selectedRow.tutor_id);
        formData.append('user_id', userId);
        formData.append('booking_id', selectedRow.id);
        formData.append('tutor_subject_id', selectedRow.tutor_subject_id);
        formData.append('image', selectedImage);

        axios.post(`${apiConfig.baseURL}/addpayment`, formData)
            .then((res) => {
                console.log(res);
                handleModalClose();
                toast.success("ชำระเงินสำเร็จ");
                getBookingPending();
            })
            .catch((err) => {
                console.log("Error adding payment", err);
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
            key: 'status',
            render: (status) => {
                if (status === "รอชำระเงิน") {
                    return (
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">รอชำระเงิน</span>
                    );
                } else if (status === "ชำระเงินสำเร็จ") {
                    return (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">ชำระเงินสำเร็จ</span>
                    );
                } else if (status === "ปฏิเสธการจ่ายเงิน") {
                    return (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">ปฏิเสธการจ่ายเงิน</span>
                    );
                } else {
                    return (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">รอยืนยัน</span>
                    );
                }
            },
        },

        {
            title: 'จัดการ',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <Button type="link" onClick={() => handleRowClick(record)}>
                    {record.status === "รอชำระเงิน" ? 'ชำระเงิน' : 'หลักฐาน'}
                </Button>
            ),
        },
    ];

    const dataSource = dataPending ? dataPending.map(item => ({
        key: item.id,
        tutor_id: item.tutor_id,
        tutor_subject_id: item.tutor_subject_id,
        id: item.id,
        firstname: item.user_firstname,
        lastname: item.user_lastname,
        tel: item.user_tel,
        subject: item.subject_name,
        techdate: `${item.date}`,
        time: `${item.time}`,
        price: `${item.subject_price} บาท`,
        image: item.imageUrl,
        tutorname: item.tutor_name,
        study_place: item.study_place,
        status: item.status === 1 ? "รอชำระเงิน" : item.status === 6 ? "รอตรวจสอบ" : item.status === 7 ? "ชำระเงินสำเร็จ" : item.status === 9 ? "ปฏิเสธการจ่ายเงิน" : "รอยืนยัน",
    })) : [];

    return (
        <div className='mb-16'>
            <ToastContainer />
            <Table dataSource={dataSource} columns={columns} />

            <Modal title="รูปภาพการชำระเงิน" open={modalVisible} onCancel={handleModalClose} footer={null}>
                {selectedRow && modalType === 'payment' && (
                    <div>
                        <div className='mb-4'>
                            <p className='text-xl mb-4'>รายละเอียดการจอง</p>
                            <div className='text-lg'>
                                <p>ชื่อ-นามสกุล: {selectedRow.firstname} {selectedRow.lastname}</p>
                                <p>เบอร์โทร: {selectedRow.tel}</p>
                                <p>ชื่อติวเตอร์: {selectedRow.tutorname}</p>
                                <p>วิชา: {selectedRow.subject}</p>
                                <p>ราคา: {selectedRow.price}</p>
                            </div>

                        </div>
                        <div className='mb-4'>
                            <p className='text-xl mb-4'>ขั้นตอนการชำระเงิน</p>
                            <div className='text-lg'>
                                <p>โอนเงินชำระที่บัญชี 0628160805 ธนาคารกสิกรไทย</p>
                                <p>ชื่อ นายกานต์ชลิต บางขะกูล</p>
                                <p>จำนวน {selectedRow.price} บาท</p>
                                <img src="https://kontueleks.com/wp-content/uploads/2021/01/004999005973770_20210117_190054.jpeg" alt="" />
                            </div>


                        </div>
                        <div className='space-y-2 mb-2'>
                            <p className='text-lg'>หากชำระเงินแล้วแนบไฟล์ลงมาในข้างล่าง</p>
                            <input type="file" name="image" id="image" className='mb-5' onChange={(e) => setSelectedImage(e.target.files[0])} />
                        </div>
                        <p className='text-red-500'>* หมายเหตุหากติวเตอร์เกิดสถานะยกเลิกงาน ทางระบบจะติดต่อเพื่อคืนเงินให้</p>
                        <div className='flex justify-end mt-5'>
                            <Button type='link' className='mr-2' onClick={addPayment}>ยืนยันการชำระเงิน</Button>
                            <Button type='danger' onClick={handleModalClose}>ยกเลิกการชำระเงิน</Button>
                        </div>
                    </div>
                )}
                {selectedRow && modalType === 'proof' && (
                    <div>
                        <div className='mb-4'>
                            <p className='text-xl mb-4'>รายละเอียดการจอง</p>
                            <div className='text-lg'>
                                <p>ชื่อ-นามสกุล: {selectedRow.firstname} {selectedRow.lastname}</p>
                                <p>เบอร์โทร: {selectedRow.tel}</p>
                                <p>ชื่อติวเตอร์: {selectedRow.tutorname}</p>
                                <p>วิชา: {selectedRow.subject}</p>
                                <p>ราคา: {selectedRow.price}</p>
                                <img src={selectedRow.image} alt="" />
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

        </div>


    );
}

export default PendingPayment;
