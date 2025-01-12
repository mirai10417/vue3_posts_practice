// src/composables/useFlatpickr.js
export const useFlatpickr = () => {
  const flatpickrOptions = {
    enableTime: true,
    dateFormat: "Y-m-d H:i", // YYYY-MM-DD HH:mm 형식
    minuteIncrement: 60, // 30분 단위
    locale: {
      firstDayOfWeek: 0,
      weekdays: {
        shorthand: ["일", "월", "화", "수", "목", "금", "토"],
        longhand: [
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일",
        ],
      },
      months: {
        shorthand: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
        longhand: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ],
      },
    },
  };

  return { flatpickrOptions };
};
