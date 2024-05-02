

export default function Level() {
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">ระดับชั้นที่สอน</h2>
            <div className="grid grid-cols-2 items-center mx-32 my-16 space-y-5">

                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl  items-center flex">
                        <div className="px-4">
                            <img src="/assets/home/1.png"  alt="" className="w-24 h-24" />
                            <h2 className="text-2xl py-4 font-bold">เตรียมอนุบาล - อนุบาล</h2>
                            <p className="text-lg">วิชาพื้นฐานทั้วไป คณิตศาสตร์ การนับเลข บวกลบเลข ภาษาอังกฤษ ภาษาไทย รู้จักตัวอักษร สระ วรรณยุกต์ การออกเสียง การฟัง ฝึกการเขียน เชาว์ปัญญา และวิชาอื่น ๆ </p>
                        </div>
                    </div>
                </div>

                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl items-center flex">
                        <div className="px-4">
                            <img src="/assets/home/elementary-school.png"  alt="" className="w-24 h-24" />
                            <h2 className="text-2xl py-4 font-bold">ประถมศึกษา</h2>
                            <p className="text-lg">วิชาคณิตศาสตร์ วิทยาศาสตร์ ภาษาอังกฤษ ภาษาไทย ศิลปะ คอมพิวเตอร์ กิจกรรมเสริมการเรียนรู้ ทบทวนเนื้อหา สอนการบ้านทั่วไป</p>
                        </div>
                    </div>
                </div>

                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl items-center flex">
                        <div className="px-4">
                            <div className="flex">
                                <img src="/assets/home/student.png" alt="" className="w-24 h-24" />
                                <img src="/assets/home/student (1).png"  alt="" className="w-24 h-24 relative right-10" />
                            </div>
                            <h2 className="text-2xl py-4 font-bold">มัธยมศึกษาตอนต้น</h2>
                            <p className="text-lg">เตรียมตัวปรับพื้นฐานเนื้อหาระดับมัธยมศึกษา วิชาคณิตศาสตร์ วิทยาศาสตร์ ภาษาอังกฤษ ภาษาไทย สังคมศึกษา ทบทวนเนื้อหาเตรียมสอบ ติวสอบเข้าระดับ ม.ปลาย ติวสอบแข่งขัน</p>
                        </div>
                    </div>
                </div>


                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl items-center flex">
                        <div className="px-4">
                            <img src="/assets/home/student (2).png" alt="" className="w-24 h-24" />
                            <h2 className="text-2xl py-4 font-bold">มัธยมศึกษาตอนปลาย</h2>
                            <p className="text-lg">ปรับพื้นฐาน ฝึกวิเคราะห์โจทย์ ฝึกแก้ปัญหา เทคนิคการทำข้อสอบ เตรียมสอบแข่งขันระดับประเทศ TGAT, TPAT, TCAS, O-NET, A-LEVEL(9 วิชาสามัญ) วิชาสอบเข้าคณะ/สาขาเฉพาะทาง </p>
                        </div>
                    </div>
                </div>



                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl items-center flex">
                        <div className="px-4">
                            <img src="/assets/home/student (3).png" alt="" className="w-24 h-24" />
                            <h2 className="text-2xl py-4 font-bold">มหาวิทยาลัย</h2>
                            <p className="text-lg">หาติวเตอร์ปรับพื้นฐานวิชาเฉพาะทางแต่ละคณะ / สาขา วิชาแคลลูลัส สถิติ ฟิสิก์ เคมี ชีวะ บัญชี ภาษาต่างประเทศ ความถนัดทางวิศกรรม ความถนัดทางการแพทย์ วิชาเฉพาะทางอื่น ๆ</p>
                        </div>
                    </div>
                </div>

                <div className="justify-center flex">
                    <div className="w-[440px] h-[380px] border-4 border-main-green rounded-xl items-center flex">
                        <div className="px-4">
                            <img src="/assets/home/ancestors.png"  alt="" className="w-24 h-24" />
                            <h2 className="text-2xl py-4 font-bold">วัยทำงาน / บุคคลทั่วไป</h2>
                            <p className="text-lg">การเรียนภาษาเพื่อการสื่อสาร การทำงานในองค์กรต่างประเทศ หาติวเตอร์ติวสอบ TOEIC, TOEFL, IELTS ภาษาไทยชาวต่างชาติ วิชาเฉพาะทางในสายงานต่าง ๆ</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
