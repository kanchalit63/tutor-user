import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { apiConfig } from "../../config/api.config"
import { useFormik } from "formik"
import * as Yup from "yup"
import Icon from "@mdi/react"
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js"
import { useState } from "react"

function Register() {
    const navigate = useNavigate()
    const [password, setPassword] = useState(false)
    const [confirmpassword, setConfirmPassword] = useState(false)


    const initialValues = {
        username: "",
        firstname: "",
        lastname: "",
        tel: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const schema = Yup.object({
        username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
        firstname: Yup.string().required("กรุณากรอกชื่อจริง"),
        lastname: Yup.string().required("กรุณากรอกนามสกุล"),
        tel: Yup.string()
            .matches(/^\d+$/, { message: "กรุณากรอกเบอร์โทรศัพท์ให้เป็นตัวเลขเท่านั้น" })
            .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก")
            .max(10, "กรุณากรอกเบอร์โทรศัพท์ 10 หลักเท่านั้น")
            .required("กรุณากรอกเบอร์โทรศัพท์"),
        email: Yup.string().email("กรุณากรอกอีเมลให้ถูกต้อง").required("กรุณากรอกอีเมล์"),
        password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
        confirmPassword: Yup.string()
            .required("กรุณายืนยันรหัสผ่านให้ถูกต้อง")
            .oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: (values) => {
            const { email, username, firstname, lastname, password, tel } = values;
            axios
                .post(`${apiConfig.baseURL}/register`, {
                    email: email,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    tel: tel,
                })
                .then(() => {
                    alert("สมัครสมาชิกสำเร็จ");
                    navigate("/login");
                })
                .catch((error) => {
                    if (error.response && error.response.status === 500) {
                        alert("เกิดข้อผิดพลาดในการสร้างสมาชิก โปรดลองอีกครั้งในภายหลัง");
                    } else {
                        console.log("Error", error);
                        console.log("เกิดข้อผิดพลาดในการสร้างสมาชิก");
                    }
                });
            formik.resetForm();
        },

    })

    return (
        <>
            <div className="bg-[#37DD95] h-[100vh] items-center flex justify-center ">
                <div className="bg-white rounded-xl py-10 w-[600px]">
                    <form className="px-16" onSubmit={formik.handleSubmit}>
                        <h1 className="text-4xl font-bold mb-6">สมัครสมาชิก</h1>
                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>ชื่อผู้ใช้งาน</label>
                            <input
                                type="text"
                                id="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอก Username"
                                className="border-2 p-2 rounded-md"
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <small className="text-red-500">{formik.errors.username}</small>
                            ) : null}
                        </div>

                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>ชื่อ</label>
                            <input
                                type="text"
                                id="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอกชื่อ"
                                className="border-2 p-2 rounded-md"
                            />
                            {formik.touched.firstname && formik.errors.firstname ? (
                                <small className="text-red-500">{formik.errors.firstname}</small>
                            ) : null}
                        </div>

                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>นามสกุล</label>
                            <input
                                type="text"
                                id="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอกนาสกุล"
                                className="border-2 p-2 rounded-md"
                            />
                            {formik.touched.lastname && formik.errors.lastname ? (
                                <small className="text-red-500">{formik.errors.lastname}</small>
                            ) : null}
                        </div>

                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>เบอร์โทรศัพท์</label>
                            <input
                                type="text"
                                id="tel"
                                value={formik.values.tel}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                className="border-2 p-2 rounded-md"
                            />
                            {formik.touched.tel && formik.errors.tel ? (
                                <small className="text-red-500">{formik.errors.tel}</small>
                            ) : null}
                        </div>

                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>อีเมล</label>
                            <input
                                type="text"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอกอีเมล"
                                className="border-2 p-2 rounded-md"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <small className="text-red-500">{formik.errors.email}</small>
                            ) : null}
                        </div>

                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>รหัสผ่าน</label>
                            <div className="relative">
                                <input
                                    type={password ? "text" : "password"}
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="กรุณากรอกรหัสผ่าน"
                                    className="border-2 p-2 rounded-md w-full"
                                />
                                <Icon
                                    path={password ? mdiEyeOutline : mdiEyeOffOutline}
                                    size={0.8}
                                    className="absolute bottom-[11px] right-3 text-gray-400 cursor-pointer"
                                    onClick={() => setPassword(!password)}
                                />
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <small className="text-red-500">{formik.errors.password}</small>
                            ) : null}
                        </div>

                        
                        
                        <div className="flex flex-col mr-2">
                            <label htmlFor=""><span className="text-red-500">*</span>ยืนยันรหัสผ่าน</label>
                            <div className="relative">
                                <input
                                    type={confirmpassword ? "text" : "password"}
                                    id="confirmPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="ยืนยันรหัสผ่าน"
                                    className="border-2 p-2 rounded-md w-full"
                                />
                                <Icon
                                    path={confirmpassword ? mdiEyeOutline : mdiEyeOffOutline}
                                    size={0.8}
                                    className="absolute bottom-[11px] right-3 text-gray-400 cursor-pointer"
                                    onClick={() => setConfirmPassword(!confirmpassword)}
                                />
                            </div>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <small className="text-red-500">{formik.errors.confirmPassword}</small>
                            ) : null}
                        </div>

                        <button type="submit" className="bg-blue-500 text-white rounded-lg h-10 my-2 w-full">
                            สร้างบัญชี
                        </button>
                        <p className="text-center">
                            มีบัญชีผู้ใช้อยู่แล้ว?
                            <Link to="/login" className="text-blue-700 underline">
                                เข้าสู่ระบบ
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
