

export default function LocationStudy() {
  return (
    <div>
    <div className="grid grid-cols-2 px-16 py-28">
      <div className="flex flex-col items-center space-y-4" >
        <h2 className="text-3xl font-bold ">เรียนนอกสถานที่ / เรียนที่บ้าน</h2>
        <p className="text-2xl font-bold">เรียนแบบนี้ดีอย่างไร?</p>
        <ul className="list-disc text-xl">
          <li>สามารถหาติวเตอร์ที่ตัวเองสนใจและตรงตามหัวข้อการเรียนที่ตัวเองสนใจ</li>
          <li>สอบถามเนื้อหาหรือหัวข้อที่ตัวเองไม่เข้าใจ</li>
          <li>กำหนดเวลาหรือเรียนเวลาไหนก็ได้เมื่อตัวเองว่าง</li>
          <li>มีสมาธิปและจดจ่อกับการเรียนได้ดียิ่งขึ้น</li>
          <li>ชำระเงินเป็นคอร์สหรือต่อคั้งตามตกลงกับติวเตอร์</li>
        </ul>
      </div>
      <div className="flex justify-center">
        <img src="/assets/home/content2-1.jpg"  alt="" className="w-48 h-48 rounded-2xl rotate-[-30deg]" />
        <img src="/assets/home/content2-3.jpg"  alt="" className="w-48 h-48 rounded-2xl rotate-[30deg] mt-9" />
      </div>
    </div>
  </div>
  )
}
