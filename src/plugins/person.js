export default {
  install(app, options) {
    const person = {
      name: "안녕하세요 person.js 플러그인입니다.",
      say() {
        alert(this.name);
      },
      ...options,
    };
    app.config.globalProperties.$person = person;
    app.provide("person", person);
  },
};
