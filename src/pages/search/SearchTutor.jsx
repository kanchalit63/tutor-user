

export default function SearchTutor() {
    return (
        <div >
            <div className="bg-[url('/assets/tutor.jpg')] h-[100vh] bg-cover">
                <div className='flex justify-center items-center space-x-2 pt-56'>
                    <input type="search" name="" id="" placeholder='คุณกำลังมองหาวิชาอะไรอยู่กันหล่ะ?' className='w-[600px] h-14 rounded-full p-4' />
                    <button className='bg-main-green w-40 h-14 rounded-full hover:bg-blue-500'>ค้นหา</button>
                </div>
                <div>
                    <p className='text-xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] pl-[500px] mt-10'>วิชาที่แนะนำ</p>
                    <div className='flex justify-center'>
                        <div className="flex justify-center items-center space-x-10 mt-4">
                            <div className="w-36 h-44 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                                <img src="/assets/home/english.png"  alt="" className="w-16 h-16" />
                                <p className="text-xl">ภาษาอังกฤษ</p>
                            </div>
                            <div className="w-36 h-44 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                                <img src="/assets/home/maths.png"  alt="" className="w-16 h-16" />
                                <p className="text-xl">คณิตศาสตร์</p>
                            </div>
                            <div className="w-36 h-44 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                                <img src="/assets/home/flask.png"  alt="" className="w-16 h-16" />
                                <p className="text-xl">วิทยาศาสตร์</p>
                            </div>
                            <div className="w-36 h-44 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                                <img src="/assets/home/coding-book.png"  alt="" className="w-16 h-16" />
                                <p className="text-xl">คอมพิวเตอร์</p>
                            </div>
                            <div className="w-36 h-44 bg-main-green rounded-2xl flex justify-center items-center flex-col space-y-4">
                                <img src="/assets/home/chinese-flag.png"  alt="" className="w-16 h-16" />
                                <p className="text-xl">ภาษาจีน</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
