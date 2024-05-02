import { Link } from "react-router-dom";


export default function Banner() {
  return (
    <div>
        <div>
            <div className="bg-[url('/assets/home/hero.jpg')] h-[100vh] bg-no-repeat bg-cover text-white flex flex-col justify-center px-32 ">
                <h2 className="text-7xl 	drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">TUTORLIST</h2>
                <p className="w-[500px] text-3xl py-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">กำลังหาติวเตอร์อยู่ใช่ไหม... หาติวเตอรที่ใช่ หาประสบการณ์ที่โดนใจ สามารถเรียนตัวต่อตัวหรือออนไลน์ก็ได้พร้อมรับฟังคำแนะนำต่าง ๆ จากผู้ที่มีประสบการณ์มากมืออาชีพ</p>
                <Link to="/listtutor" className="flex justify-center items-center bg-main-green w-52 h-12 text-xl font-bold text-black rounded-xl hover:bg-blue-500 hover:text-white">ค้นหาติวเตอร์</Link>
            </div>
        </div>
    </div>
  )
}
