import { Link,useNavigate  } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "@mdi/react";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import { useState } from "react";
import axios from "axios";
import { apiConfig } from "../../config/api.config";
import Toastifycon from "../../../global-components/Toastcon";
import { toast } from "react-toastify"
import Cookies from "js-cookie"; 

function Login() {
    const [password, setPassword] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const schema = Yup.object({
        username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
        password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
    });

    console.log(schema)

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: () => {
            axios.post(`${apiConfig.baseURL}/user-login`,{
                username: formik.values.username,
                password: formik.values.password
            })
            .then(response => {
                if(response.status === 200){
                    const token = response.data.data.token;
                    Cookies.set("user-token", token, { expires: 1 });
                    formik.resetForm(); 
                    navigate("/");
                } else {
                    console.error("Login failed. Status:", response.status);
                }
            })
            .catch(error => {
                toast.error("ชื่อผู้ใช้งานหรือรหัสผ่านผิดพลาด กรุณาลองใหม่อีกครั้ง")
                console.error("Login failed:", error);
            });
        },
    });

    return (
        <div>
            <Toastifycon />
            <div className="bg-[#37DD95] h-[100vh] flex items-center justify-center">
                <div className="bg-white py-32 w-[500px] rounded-xl flex flex-col justify-center">
                    <form className="flex flex-col px-16" onSubmit={formik.handleSubmit}>
                        <h1 className="text-4xl font-bold mb-6">เข้าสู่ระบบ</h1>
                        <label htmlFor="">ชื่อผู้ใช้งาน</label>
                        <input
                            type="text"
                            name="username"
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
                        <label htmlFor="">รหัสผ่าน</label>
                        <div className="relative">
                            <input
                                type={password ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="กรุณากรอก Password"
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

                        <button type="submit" className="bg-blue-500 text-white rounded-lg h-10 my-3">
                            เข้าสู่ระบบ
                        </button>
                        <div className="space-y-1">

                            <p className="">
                                ยังไม่ได้ลงทะเบียน{" "}
                                <Link to="/register" className="text-blue-700 underline">
                                    ลงทะเบียน
                                </Link>
                            </p>
                            <p className=" text-blue-700 underline">ลืมรหัสผ่าน?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
