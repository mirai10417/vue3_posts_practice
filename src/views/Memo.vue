# unplugin-vue-components 1. 글로벌 컴포넌트의 선언을 자동으로 vue전체에
주입시켜준다. >> main.js에서 import및 .use(컴포넌트명) 생략 가능 2.
vite.config.js에서 import 후 사용 ex) 1. import 추가 >> import Components from
"unplugin-vue-components/vite"; // Vite용으로 명시적으로 import 2. plugin에 추가
>> plugins: [ Components({ dirs: "src/components/app", //자동으로 가져오길
원하는 컴포넌트의 디렉토리를 입력해주면 특정 컴포넌트의 글로벌 컴포넌트만
가져온다. dts: true, // 자동 생성된 타입 정의 파일 사용 }), ],
