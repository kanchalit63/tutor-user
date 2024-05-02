import { Rate } from "antd";
import axios from "axios";
import { apiConfig } from "../../config/api.config";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

function Listtutor() {
  const [subject, setSubject] = useState([]);
  const [profileTutor, setProfileTutor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  console.log("profileTutor", profileTutor);

  useEffect(() => {
    getSubject();
    getTutorList();
  }, []);

  const getSubject = () => {
    axios.get(`${apiConfig.baseURL}/subject`)
      .then((res) => {
        setSubject(res.data.data);
      })
      .catch((err) => {
        console.log("เกิดข้อผิดพลาดในการแสดงผลรายวิชา", err);
      });
  };

  const level = [
    { label: "ประถม", value: "ประถม" },
    { label: "มัธยมต้น", value: "มัธยมต้น" },
    { label: "มัธยมปลาย", value: "มัธยมปลาย" },
    { label: "มหาลัย", value: "มหาลัย" },
    { label: "วัยทำงาน", value: "วัยทำงาน" },
  ];

  const getTutorList = async () => {
    try {
      const response = await axios.get(`${apiConfig.baseURL}/listtutor`);
      if (response.status === 200) {
        setProfileTutor(response.data.data);
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching tutor list:', error);
    }
  };

  const handleViewDetails = (item) => {
    const token = Cookies.get('user-token');
    if (token) {
      window.location.href = `/detailtutor/${item.id}`;
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="flex justify-center mb-96">
        <div className="w-[65%] ">
          <div className="flex space-x-4 mt-16">
            <div>
              <p>ค้นหา</p>
              <input
                type="text"
                className="w-72 h-8 pl-2 rounded-md border-2 border-gray-500"
                placeholder="กรุณากรอกรายการที่ต้องการค้นหา"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <p>ระดับชั้น</p>
              <select
                className="w-32 h-8 bg-blue-200 rounded-md border-2 border-black"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">ทั้งหมด</option>
                {level.map((item, index) => (
                  <option key={index} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="">
              <p>วิชา</p>
              <select
                className="w-32 h-8 bg-blue-200 rounded-md border-2 border-black"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">ทั้งหมด</option>
                {subject.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          {profileTutor && profileTutor.length > 0 ? (
            profileTutor
              .filter((item) =>
                item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedLevel ? item.level === selectedLevel : true) &&
                (selectedSubject ? item.subject_names.includes(selectedSubject) : true)
              )
              .map((item) => (
                <div key={item.id} className="my-10 space-y-6 ">
                  <div>
                    <div className="bg-white items-center flex rounded-md drop-shadow-md py-8">
                      <div className="">
                        <div className="">
                          <img
                            src={item.image || "./public/assets/listtutor/Profile-Boy.png"} // แก้ไขตรงนี้ให้เป็น / แทน ./ หรือใส่ public ลงไปใน path ที่ชัดเจน
                            alt=""
                            className="mx-6 w-64 h-52 rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-[1500px] px-16 space-y-3">
                        <div className="flex items-center space-x-9">
                          <h3 className="text-4xl"> TUTOR : {item.firstname}</h3>
                          <span className="flex items-center">
                            RATING: {item.avg_rating ? (
                              <>
                                <Rate value={item.avg_rating} disabled />
                                <p className="ml-2">({item.avg_rating})</p>
                              </>
                            ) : (
                              <>
                                <Rate value={0} disabled />
                                <p className="ml-2">(0)</p>
                              </>
                            )}
                          </span>

                        </div>
                        <div className="flex space-x-2">
                          {item.subject_names.split(',').map((subject, index) => (
                            <p key={index} className="bg-main-green px-4 rounded-2xl">{subject.trim()}</p>
                          ))}
                        </div>

                        <div className="line-clamp-3">
                          {item.description}
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="bg-blue-500 text-white w-40 h-8 rounded-md"
                            onClick={() => handleViewDetails(item)}
                          >
                            ดูรายละเอียดเพิ่มเติม
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="h-[50vh] text-3xl font-bold flex justify-center items-center">
              <p>ไม่มีติวเตอร์คนนี้ในระบบ</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Listtutor;
