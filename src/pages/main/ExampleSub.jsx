
export default function ExampleSub() {
  return (

        <div className="w-auto h-[400px] bg-blue-300 ">
            <h2 className="text-4xl font-bold text-center pt-8">ตัวอย่างรายวิชาที่มีสอน</h2>
            <div className="flex justify-center items-center space-x-10 py-16">
                <div className="w-48 h-60 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                    <img src="/assets/home/english.png"  alt="" className="w-32 h-32"/>
                    <p className="text-xl">ภาษาอังกฤษ</p>
                </div>
                <div className="w-48 h-60 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                    <img src="/assets/home/maths.png" alt="" className="w-32 h-32"/>
                    <p className="text-xl">คณิตศาสตร์</p>
                </div>
                <div className="w-48 h-60 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                    <img src="/assets/home/flask.png"  alt="" className="w-32 h-32"/>
                    <p className="text-xl">วิทยาศาสตร์</p>
                </div>
                <div className="w-48 h-60 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                    <img src="/assets/home/coding-book.png"  alt="" className="w-32 h-32"/>
                    <p className="text-xl">คอมพิวเตอร์</p>
                </div>
                <div className="w-48 h-60 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                    <img src="/assets/home/chinese-flag.png"  alt="" className="w-32 h-32"/>
                    <p className="text-xl">ภาษาจีน</p>
                </div>
            </div>
        </div>

  )
}
