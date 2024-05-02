import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import axios from 'axios'
import { useFormik } from "formik"
import * as Yup from "yup"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { apiConfig } from "../../config/api.config";


export default function Navbar() {
    const token = Cookies.get('user-token')
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        fetchProfileUser();
    }, []);

    const fetchProfileUser = async () => {
        {
            const tokenFromCookie = Cookies.get("user-token");
            if (!tokenFromCookie) {
                throw new Error("Token not found in cookies");
            }
            const token = tokenFromCookie.replace("Bearer ", "");

            const response = await axios.get(`${apiConfig.baseURL}/userprofile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUserProfile(response.data.data);
            } else {
                throw new Error("Failed to fetch profile data");
            }
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const { TextArea } = Input;

    const initialValues = {
        name: "",
        tel: "",
        detail: "",
    }

    const schema = Yup.object({
        name: Yup.string().required("กรุณากรอกชื่อผู้ที่ติดต่อ"),
        tel: Yup.string().required("กรุณากรอกเบอร์โทร"),
        detail: Yup.string().required("กรุณากรอกข้อความที่ต้องการติดต่อ"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
            const { name, tel, detail } = values
            axios.post('http://localhost:8080/add-contact', {
                name: name,
                tel: tel,
                detail: detail
            }).then((response) => {
                if (response.status === 200) {
                    alert("ยืนยันการส่งข้อมูลการติดต่อ ทางเราจะตอบกลับเร็วที่สุด")
                    setIsModalOpen(false)
                } else {
                    console.log("เกิดข้อผิดพลาดในการส่งข้อมูล Contact ")
                }
            })
                .catch((error) => {
                    console.log("Err", error)
                })
            formik.resetForm()
        },
    })

    const handleLogout = () => {
        Cookies.remove('user-token'); // ลบ Token ออกจาก cookies
        navigate('/'); // นำทางไปยังหน้า /login โดยใช้ useNavigate
    }





    return (
        <div>
            <Modal
                title={<div className="text-3xl font-bold">ติดต่อเรา</div>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <form className="mt-8" onSubmit={formik.handleSubmit}>
                    <label className="text-xl">ชื่อ-นาสกุล</label>
                    <Input
                        placeholder="ชื่อ-นาสกุล"
                        className="my-1"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <small className="text-red-500">{formik.errors.name}</small>
                    ) : null}
                    <p className="text-xl">เบอร์ติดต่อ</p>
                    <Input
                        placeholder="เบอร์ติดต่อ"
                        className="my-1"
                        id="tel"
                        value={formik.values.tel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.tel && formik.errors.tel ? (
                        <small className="text-red-500">{formik.errors.tel}</small>
                    ) : null}
                    <p className="text-xl">ข้อความที่ต้องการจะติดต่อ</p>
                    <TextArea
                        rows={4}
                        placeholder="ข้อความที่ต้องการจะติดต่อ"
                        className="my-1"
                        id="detail"
                        value={formik.values.detail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.detail && formik.errors.detail ? (
                        <small className="text-red-500">{formik.errors.detail}</small>
                    ) : null}
                    <p className="mt-2 text-red-500">* หมายเหตุ ทางเราจะทำการติดต่อกลับหลังจากได้รับข้อความไม่เกิน 48 ชั่วโมง</p>
                    <div className="space-x-4  flex items-end justify-end mt-3">
                        <button
                            type="submit"
                            className="bg-blue-500 w-24 h-8 text-white rounded-md hover:bg-main-green transition delay-[30ms]"

                        >
                            ส่งข้อมูล
                        </button>
                        <button type="button" className="bg-red-500 w-24 h-8 text-white rounded-md" onClick={handleCancel}>
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </Modal>


            <div className="flex justify-between py-4 px-16 bg-main-green ">
                <div>
                    <Link to="/"><img src="/assets/Logo.png" alt='' className='w-52' /></Link>
                </div>
                {token ?
                    (
                        <div className="relative inline-block text-left px-28">
                            {userProfile?.profile_image && userProfile.profile_image !== "http://localhost:8080/images/" ? (
                                <img
                                    src={userProfile.profile_image}
                                    alt="โปรไฟล์"
                                    className="w-12 h-12 rounded-full object-cover"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            ) : (
                                <img
                                    src="../../../public/assets/user/profile/profile2.png"
                                    alt="โปรไฟล์"
                                    className="w-12 h-12 rounded-full object-cover"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            )}


                            {isOpen && (
                                <div className="absolute z-10 mt-2 w-[11rem] rounded-md shadow-lg bg-white ">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <Link to="/userprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={() => setIsOpen(!isOpen)}>ข้อมูลส่วนตัว</Link>
                                        <Link to="/check-booking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={() => setIsOpen(!isOpen)}>ตรวจสอบการจอง</Link>
                                        <a href="/check-payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={() => setIsOpen(!isOpen)}>ตรวจสอบชำระเงิน</a>
                                        <a className="block px-4 cursor-pointer py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-500" role="menuitem" onClick={handleLogout}>Logout</a>
                                    </div>
                                </div>
                            )}
                        </div>

                    ) : (
                        <div className="flex justify-center items-center">
                            <ul className="flex items-center cursor-pointer font-normal ">
                                <Link to="/" className="px-4 hover:bg-blue-500 hover:text-white rounded-lg h-10 w-24 flex items-center justify-center ">หน้าแรก </Link>
                                <Link to="/registerfortutor" className="px-4 hover:bg-blue-500 hover:text-white rounded-lg h-10 w-32 flex items-center justify-center"> สมัครติวเตอร์ </Link>
                                <Link to="/aboutus" className="px-4 hover:bg-blue-500 hover:text-white rounded-lg h-10 w-32 flex items-center justify-center">  เกี่ยวกับเรา </Link>
                                <li onClick={showModal} className="px-4 hover:bg-blue-500 hover:text-white rounded-lg h-10 w-24 flex items-center justify-center mr-2">ติดต่อเรา</li>
                                <Link to="/login" className=" px-4 bg-blue-500 w-32 h-10 flex items-center justify-center rounded-lg text-white">เข้าสู่ระบบ</Link>
                            </ul>
                        </div>
                    )}


            </div>


        </div>
    )
}
