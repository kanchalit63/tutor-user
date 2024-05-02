import { Button } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiConfig } from "../../config/api.config";
import { Select } from "antd";

function ProfileUser() {
    const [userProfile, setUserProfile] = useState(null);
    const [selectedBank, setSelectedBank] = useState(null);
    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        fetchProfileUser();
    }, []);

    const fetchProfileUser = async () => {
        try {
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
                setUsername(response.data.data.username);
            } else {
                throw new Error("Failed to fetch profile data");
            }
        } catch (error) {
            toast.error("Failed to fetch profile data");
        }
    };

    useEffect(() => {
        if (userProfile) {
            setSelectedBank(userProfile.bank || null);
            formik.setValues({
                email: userProfile.email || "",
                firstname: userProfile.firstname || "",
                lastname: userProfile.lastname || "",
                tel: userProfile.tel || "",
                bankaccount: userProfile.bankaccount || "",
                bank: userProfile.bank || null,
            });
        }
    }, [userProfile]);


    const schema = Yup.object({
        email: Yup.string().required("กรุณากรอกอีเมลล์"),
        firstname: Yup.string().required("กรุณากรอกชื่อจริง"),
        lastname: Yup.string().required("กรุณากรอกนามสกุล"),
        tel: Yup.string().required("กรุณากรอกเบอร์โทร"),
    });

    const bankOptions = [
        { label: "ธนาคารกรุงเทพ", value: "ธนาคารกรุงเทพ" },
        { label: "ธนาคารกสิกรไทย", value: "ธนาคารกสิกรไทย" },
        { label: "ธนาคารกรุงไทย", value: "ธนาคารกรุงไทย" },
        { label: "ธนาคารไทยพาณิชย์", value: "ธนาคารไทยพาณิชย์" },
        { label: "ธนาคารทหารไทย", value: "ธนาคารทหารไทย" },
        { label: "ธนาคารออมสิน", value: "ธนาคารออมสิน" },
    ];

    const formik = useFormik({
        initialValues: {
            id: "",
            email: "",
            firstname: "",
            lastname: "",
            tel: "",
            bankaccount: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const tokenFromCookie = Cookies.get("user-token");
                if (!tokenFromCookie) {
                    throw new Error("Token not found in cookies");
                }
                const token = tokenFromCookie.replace("Bearer ", "");

                await updateUserProfile({
                    ...values,
                    bank: selectedBank, // เพิ่มค่าธนาคารที่ผู้ใช้เลือกเข้าไปในข้อมูลที่จะส่ง
                }, token);
            } catch (error) {
                console.error(error);
                toast.error("เกิดข้อผิดพลาด: " + error.message);
            }
        },
    });

    const updateUserProfile = async (values, token) => {
        try {
            const response = await axios.patch(
                `${apiConfig.baseURL}/updateUserProfile`,
                {
                    id: userProfile.id,
                    username: username,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    tel: values.tel,
                    bankaccount: values.bankaccount,
                    bank: values.bank,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("อัปเดตข้อมูลผู้ใช้งานสำเร็จ");
            } else {
                console.log("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
            }
        } catch (error) {
            toast.error("Failed to update profile data");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
    };

    const handleUploadImage = async () => {
        try {
            if (!profileImage) {
                toast.error("กรุณาเลือกรูปภาพก่อนทำการอัปโหลด");
                return;
            }

            const tokenFromCookie = Cookies.get("user-token");
            if (!tokenFromCookie) {
                throw new Error("Token not found in cookies");
            }
            const token = tokenFromCookie.replace("Bearer ", "");

            const formData = new FormData();
            formData.append("userId", userProfile.id);
            formData.append("image", profileImage);

            await axios.patch(`${apiConfig.baseURL}/updateUserImage`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Clear profileImage state after successful upload
            window.location.reload();
            setProfileImage(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload profile image");
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="flex justify-center">
                <div className="my-16">
                    <div className="mb-2 space-x-4">
                        <span>โปรไฟล์</span>
                    </div>
                    <div className="bg-gray-200 w-full h-[3px] mb-2"></div>
                    <div className="flex">
                        <div className="rounded-lg border-2 drop-shadow-md pb-10 space-y-4 mr-16">
                            <div className="bg-main-green w-96 h-10 flex items-center px-4 rounded-t-lg text-xl">
                                รูปภาพโปรไฟล์
                            </div>
                            <div className="flex justify-center mt-4 ">
                                {profileImage ? (
                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="โปรไฟล์"
                                        className="w-40 h-40 rounded-full object-cover"
                                    />
                                ) : userProfile?.image && userProfile.image !== "http://localhost:8080/images/" ? (
                                    <img
                                        src={userProfile.image}
                                        alt="โปรไฟล์"
                                        className="w-40 h-40 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src="./public/assets/user/profile/profile2.png"
                                        alt="โปรไฟล์"
                                        className="w-40 h-40 rounded-full object-cover"
                                    />
                                )}
                            </div>


                            <p className="text-center mt-4">
                                รูปภาพเป็น JPG หรือ PNG เท่านั้นขนาดไม่เกิน 5 MB
                            </p>
                            <div className="flex justify-center">
                                <input
                                    className="w-52"
                                    type="file"
                                    accept="image/png, image/jpeg" 
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button type="link" onClick={handleUploadImage}>
                                    บันทึกรูปภาพโปรไฟล์
                                </Button>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="w-[600px] rounded-lg border-2 pb-10">
                                <div className="bg-main-green  h-10 flex items-center px-4 rounded-t-lg text-">
                                    รายละเอียดโปรไฟล์
                                </div>
                                <div className="px-4 mt-8">
                                    <div>
                                        <p>อีเมลล์</p>
                                        <input
                                            type="text"
                                            id="email"
                                            className="border-2 p-2 rounded-md w-full"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="กรุณากรอกอีเมลล์ที่ต้องการแก้ไข"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <small className="text-red-500">
                                                {formik.errors.email}
                                            </small>
                                        ) : null}
                                    </div>
                                    <div className="flex">
                                        <div className="w-full">
                                            <p>ชื่อจริง</p>
                                            <input
                                                type="text"
                                                id="firstname"
                                                value={formik.values.firstname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border-2 p-2 rounded-md w-[95%]"
                                                placeholder="กรุณากรอกชื่อจริงที่ต้องการแก้ไข"
                                            />
                                            {formik.touched.firstname && formik.errors.firstname ? (
                                                <small className="text-red-500">
                                                    {formik.errors.firstname}
                                                </small>
                                            ) : null}
                                        </div>
                                        <div className="w-full">
                                            <p>นามสกุล</p>
                                            <input
                                                type="text"
                                                name=""
                                                id="lastname"
                                                value={formik.values.lastname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border-2 p-2 rounded-md w-full "
                                                placeholder="กรุณากรอกนาสกุลที่ต้องการแก้ไข"
                                            />
                                            {formik.touched.lastname && formik.errors.lastname ? (
                                                <small className="text-red-500">
                                                    {formik.errors.lastname}
                                                </small>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 w-full">
                                        <div>
                                            <p htmlFor="">เบอร์มือถือ</p>
                                            <input
                                                type="text"
                                                name=""
                                                id="tel"
                                                value={formik.values.tel}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border-2 p-2 rounded-md w-full"
                                                placeholder="กรุณากรอกเบอร์โทรที่ต้องการแก้ไข"
                                            />
                                            {formik.touched.tel && formik.errors.tel ? (
                                                <small className="text-red-500">{formik.errors.tel}</small>
                                            ) : null}
                                        </div>
                                        <div>
                                            <p>หมายเลขบัญชี</p>
                                            <input
                                                type="text"
                                                name=""
                                                id="bankaccount"
                                                value={formik.values.bankaccount}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="border-2 p-2 rounded-md w-full"
                                                placeholder="กรุณากรอกหมายเลขธนาคาร"
                                            />
                                            {formik.touched.bankaccount && formik.errors.bankaccount ? (
                                                <small className="text-red-500">{formik.errors.bankaccount}</small>
                                            ) : null}
                                        </div>
                                        <div>
                                            <p>ธนาคาร</p>
                                            <Select
                                                value={selectedBank || "กรุณาเลือกธนาคาร"}
                                                onChange={(value) => setSelectedBank(value)}
                                                className="w-44 h-11"
                                            >
                                                {bankOptions.map(option => (
                                                    <Select.Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </div>

                                    </div>


                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white rounded-lg h-10  w-32"
                                        >
                                            บันทึกข้อมูล
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;
