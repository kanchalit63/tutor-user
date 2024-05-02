import { Link } from "react-router-dom"


function PasswordUser() {
  return (
    <>
      <div className="flex justify-center ">
        <div className='my-16'>
          {/* Makeing A Tab */}
          <div className='mb-2 space-x-4'>
            <Link to="/userprofile">โปรไฟล์</Link>
            <span className="underline">ความปลอดภัย</span>
          </div>
          {/* Ending Tab */}
          <div className='bg-gray-200 w-full h-[3px] mb-2'></div>

          <div className="flex space-x-32">
            <div>
              <div className='w-[600px] rounded-lg border-2 pb-10' >
                <div className="bg-main-green  h-10 flex items-center px-4 rounded-t-lg text-xl">รายละเอียดโปรไฟล์</div>
                <div className='px-4 mt-8'>
                  <div>
                    <p>รหัสผ่านเดิม</p>
                    <input type="text" name="" id="" className="border-2 p-2 rounded-md w-full" placeholder='กรุณารหัสผ่านเดิม' />
                  </div>
                  <div>
                    <p>รหัสผ่านใหม่</p>
                    <input type="text" name="" id="" className="border-2 p-2 rounded-md w-full" placeholder='กรุณากรอกรหัสผ่านใหม่' />
                  </div>
                  <div>
                    <p>ยืนยันรหัสผ่านใหม่</p>
                    <input type="text" name="" id="" className="border-2 p-2 rounded-md w-full" placeholder='กรุณายืนยันรหัสผ่าน' />
                  </div>
                  <div className='flex justify-end mt-6'>
                    <button className="bg-blue-500 text-white rounded-lg h-10  w-32">บันทึกข้อมูล</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-96 border-2 h-56 rounded-xl">
              <div className='bg-red-400 h-10 flex items-center px-4 rounded-t-lg'>
                <p className='text-xl'>ต้องการที่จะลบข้อมูล?</p>
              </div>
              <div className="p-4">
                <p>
                  *หมายเหตุ: การลบบัญชีของคุณเป็นการดำเนินการถาวรและไม่สามารถยกเลิกได้ หากคุณแน่ใจว่าต้องการลบบัญชีของคุณ ให้เลือกปุ่มด้านล่าง
                </p>
              </div>
              <div className='flex justify-end mt-6 px-2'>
                <button className="bg-red-500 text-white rounded-lg h-10  w-32">บันทึกข้อมูล</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default PasswordUser