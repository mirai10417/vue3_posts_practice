export default {
  install(app, options) {
    // 유틸리티 메서드 (YYYY-MM-DD 형식으로 변환)
    const formatDate = (date, format = "YYYY-MM-DD") => {
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = (d.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const dd = d.getDate().toString().padStart(2, "0");

      if (format === "YYYY-MM-DD") {
        return `${yyyy}-${mm}-${dd}`;
      }

      // 추가적인 포맷이 필요하면 여기서 추가 로직을 구현
      return `${yyyy}-${mm}-${dd}`; // 기본 포맷
    };

    // provide로 전역 함수 제공
    app.provide("formatDate", formatDate);
  },
};
