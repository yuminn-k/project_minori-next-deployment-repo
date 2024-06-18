'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar, Autoplay} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import deleteFeedback from '@/src/api/feedback/deleteFeedback';
import {feedback} from '@/src/interfaces/feedback';

const FeedbackList = ({feedbacks}: {feedbacks: feedback[]}) => {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  const handleClickDelete = (fId: number) => {
    deleteFeedback(4, fId).then(res => {
      console.log(res);
    });
  };

  return (
    <div className="flex justify-center relative">
      <div className="w-[650px]">
        <Swiper
          slidesPerView={1} // 表示されるスライス数
          navigation={true} // prev, next button
          centeredSlides={true} // 中央揃え
        >
          {feedbacks.map(feedback => (
            <SwiperSlide key={feedback.id}>
              <div className="w-[500px] h-[400px] bg-green-300 drop-shadow-lg overflow-scroll m-auto my-3">
                <div className="p-2 text-start">
                  {feedback.content.split('\n').map((content, index) => {
                    return (
                      <div key={index} className="text-lg">
                        {content}
                      </div>
                    );
                  })}
                </div>
                <div className="w-full p-2">
                  <button
                    className="bg-red-400 p-2 text-white"
                    onClick={() => handleClickDelete(feedback.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeedbackList;
