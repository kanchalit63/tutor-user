import { useState, useEffect } from "react"
import { Rate } from "antd"
import axios from "axios"
import { apiConfig } from "../../config/api.config"
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik"


function Rating() {
  const { id } = useParams();
  const [detailReview, setDetailReview] = useState(null);
  const desc = ["แย่มาก", "พอใช้", "ปานกลาง", "ดีมาก", "สุดยอดมากที่สุด"];
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getDataReview();
  }, []);

  const getDataReview = () => {
    axios
      .get(`${apiConfig.baseURL}/getReviewTutor/${id}`)
      .then((res) => {
        setDetailReview(res.data.data);
      })
      .catch((err) => {
        console.log('Error fetching tutor data', err);
      });
  };

  const addReview = () => {
    axios.post(`${apiConfig.baseURL}/addReviewTutor`, {
      tutor_id: detailReview.tutor_id,
      user_id: detailReview.user_id,
      booking_id: detailReview.booking_id,
      rating: formik.values.rating,
      review: formik.values.review
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log('Error adding review', err);
    });
  };

  const initialValues = {
    tutor_id: "",
    user_id: "",
    booking_id: detailReview?.booking_id || "",
    rating: value,
    review: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      addReview();
      navigate(`/check-booking`);
    }
  });

  return (
    <div className="flex justify-center bg-gray  space-y-4  py-32">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex items-center space-x-6">
          {detailReview && (
            <div className="flex items-center space-x-6">
              <img src={detailReview.image} alt="" className="w-52 h-52 object-cover rounded-full" />
              <p className="text-2xl font-bold">{detailReview.tutor_firstname} {detailReview.tutor_lastname}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-4 items-center mt-4 mx-2">
          <p>กรอกคะแนนความพึ่งพอใจ</p>
          <Rate
            tooltips={desc}
            onChange={(value) => formik.setFieldValue('rating', value)}
            value={formik.values.rating}
          />
        </div>
        <textarea
          id="review"
          cols="30"
          rows="5"
          placeholder="แสดงความคิดเห็น"
          className="p-2 border-2 rounded-xl my-4 w-[800px]"
          value={formik.values.review}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex justify-end">
          <button className="p-2 text-white w-32 rounded bg-blue-500">ส่งข้อมูล</button>
        </div>
      </form>
    </div>
  );
}

export default Rating;
