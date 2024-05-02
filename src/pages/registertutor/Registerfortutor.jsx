import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { apiConfig } from "../../config/api.config"
import { useFormik } from "formik"
import * as Yup from "yup"
import Icon from "@mdi/react"
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js"

function Registerfortutor() {
  const navigate = useNavigate()
  const [password, setPassword] = useState(false)
  const [confirmpassword, setConfirmPassword] = useState(false)



  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    description: "",
    document: "",
  }

  const schema = Yup.object({
    firstname: Yup.string().required("กรุณากรอกชื่อจริง"),
    lastname: Yup.string().required("กรุณากรอกนาสกุล"),
    username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
    confirmPassword: Yup.string()
      .required("กรุณากรอกยืนยันรหัสผ่าน")
      .oneOf([Yup.ref("password"), null], "รหัสผ่านไม่ตรงกัน"),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    description: Yup.string().required("กรุณากรอกข้อมูลกล่าวแนะนำตัวเอง"),
    document: Yup.string().required("กรุณาเพิ่มรูปภาพเพื่อยืนยันตัวตน"),
    tel: Yup.string()
      .matches(/^\d+$/, { message: "กรุณากรอกเบอร์โทรศัพท์ให้เป็นตัวเลขเท่านั้น" })
      .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก")
      .max(10, "กรุณากรอกเบอร์โทรศัพท์ 10 หลักเท่านั้น")
      .required("กรุณากรอกเบอร์โทรศัพท์"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const { firstname, lastname, username, password, address, tel, description, document } = values;
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("tel", tel);
      formData.append("image", "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
      formData.append("description", description);
      formData.append("document", document);
      axios
        .post(`${apiConfig.baseURL}/add-tutor`, formData)
        .then((response) => {
          if (response.status === 200) {
            alert("สมัครติวเตอร์สำเร็จกรุณารอตรวจสอบ");
            navigate("/");
          } else {
            console.log("เกิดข้อผิดพลาดในการสร้างสมาชิกของตัวเตอร์");
          }
        })
        .catch((error) => {
          console.log("Err", error);
        });
  
      formik.resetForm();
    },
  });
  

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="bg-white  rounded-xl flex flex-col justify-center py-4 w-[800px] ">
            <form className="flex flex-col px-16 space-y-2 bg-gray-300 py-10 rounded-xl" onSubmit={formik.handleSubmit}>
              <h1 className="text-4xl font-bold mb-6">สมัครติวเตอร์</h1>
              <div className="grid grid-cols-2">
                <div className="flex flex-col mr-2">
                  <label htmlFor="">ชื่อ</label>
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
                <div className="flex flex-col">
                  <label htmlFor="">นามสกุล</label>
                  <input
                    type="text"
                    id="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="กรุณากรอกนามสกุล"
                    className="border-2 p-2 rounded-md"
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <small className="text-red-500">{formik.errors.lastname}</small>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="">ชื่อผู้ใช้งาน</label>
                <input
                  type="text"
                  name=""
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="กรุณากรอกชื่อผู้ใช้"
                  className="border-2 p-2 rounded-md w-full"
                />
                {formik.touched.username && formik.errors.username ? (
                  <small className="text-red-500">{formik.errors.username}</small>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  name=""
                  id="tel"
                  value={formik.values.tel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="กรุณากรอกชื่อผู้ใช้"
                  className="border-2 p-2 rounded-md w-full"
                />
                {formik.touched.tel && formik.errors.tel ? (
                  <small className="text-red-500">{formik.errors.tel}</small>
                ) : null}
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col mr-2">
                  <label htmlFor="">รหัสผ่าน</label>
                  <div className="relative">
                    <input
                      type={password ? "text" : "password"}
                      name=""
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
                <div className="flex flex-col">
                  <label htmlFor="">ยืนยันรหัสผ่าน</label>
                  <div className="relative">
                    <input
                      type={confirmpassword ? "text" : "password"}
                      name=""
                      id="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="กรุณายืนยันรหัสผ่าน"
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
              </div>
              <div className="flex flex-col">
                <label htmlFor="">ที่อยู่</label>
                <textarea
                  name=""
                  id="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                  className="border-2 p-2 rounded-md"
                  placeholder="กรุณากรอกที่อยู่"

                />
                {formik.touched.address && formik.errors.address ? (
                  <small className="text-red-500">{formik.errors.address}</small>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">กล่าวแนะนำตัวเองพอสังเขป</label>
                <textarea
                  name=""
                  id="description"
                  cols=""
                  rows="3"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-2 p-2 rounded-md"
                  placeholder="กรุณากรอกรายละเอียด"
                />
                {formik.touched.description && formik.errors.description ? (
                  <small className="text-red-500">{formik.errors.description}</small>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">กรุณากรอกอัพโหลดภาพสำเนาบัตรประชาชน</label>
                <div className="flex flex-col mb-4">
                  <input
                    type="file"
                    id="document"
                    onChange={(event) => formik.setFieldValue("document", event.currentTarget.files[0])}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.document && formik.errors.document ? (
                    <small className="text-red-500">{formik.errors.document}</small>
                  ) : null}
                </div>

                <p className="text-red-500">*หมายเหตุ เขียนกำกับใช้สำหรับสมัครติวเตอร์ของแพลตฟอร์มจัดหาติวเตอร์ลิส</p>
              </div>
              <div>
                <input type="checkbox" name="" id="" required /> ฉันได้อ่านและยอมรับ
                <Link to="/policy" target="blank" className="text-blue-700 underline">
                  ข้อตกลงและเงื่อนไขการใช้งาน
                </Link>
                ของ Tutorlist แล้ว
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-main-green w-40 h-10 rounded-md">
                  ส่งข้อมูลการสมัคร
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registerfortutor
