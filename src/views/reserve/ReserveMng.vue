<template>
  <div class="container">
    <div class="firstDiv">
      <h3>Room 생성</h3>
      <div>
        <button class="btn btn-primary" type="button" @click="toggleModal">
          저장
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Room 명</th>
            <th scope="col">좌석 수</th>
            <th scope="col">시간단위</th>
            <th scope="col">운영시작시간</th>
            <th scope="col">운영종료시간</th>
            <th scope="col">사용여부</th>
            <th scope="col">삭제여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Room 명">
              <input type="text" class="form-control" v-model="roomName" />
            </td>
            <td data-label="좌석 수">
              <input
                type="number"
                class="form-control"
                v-model="defaultSeatCount"
                @input="onSeatCountChange"
              />
            </td>
            <td data-label="시간단위">
              <select
                class="form-select"
                v-model="defaultOperUnit"
                @input="onOperUnitDateChange"
              >
                <option value="60">1시간</option>
              </select>
            </td>
            <td data-label="운영시작시간">
              <hour v-model="defaultOperStartTime" />
            </td>
            <td data-label="운영종료시간">
              <hour v-model="defaultOperEndTime" />
            </td>
            <td data-label="사용여부">
              <select class="form-select" v-model="useYn">
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </td>
            <td data-label="삭제여부">
              <select class="form-select" v-model="delYn">
                <option value="N">N</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 좌석 모달 -->
    <Modal
      :isModalOpen="isModalOpen"
      :toggleModal="toggleModal"
      :saveSeats="saveSeats"
      modalTitle="좌석 확인"
    >
      <!-- slot을 사용하여 모달 body를 동적으로 설정 -->
      <div>
        <div class="dc">
          <div v-if="Object.values(validMessage).some((msg) => msg !== '')">
            <p
              class="error-message"
              v-for="(msg, index) in Object.values(validMessage)"
              :key="index"
            >
              {{ msg }}
            </p>
          </div>
          <span class="ms-5">좌석수</span>
          <input
            type="number"
            v-model="defaultSeatCount"
            @input="onSeatCountChange"
            class="mb-3 ms-5"
          />
          <button class="btn btn-primary ms-5" @click="saveSeats">저장</button>
        </div>
        <div class="seat-container">
          <div
            class="seat seat-box selected"
            v-for="seat in seats"
            :key="seat.id"
          >
            <div class="seat-number">{{ seat.number }}</div>
          </div>
        </div>
      </div>
    </Modal>
    <div>
      <h3>Room 리스트</h3>
      <table class="table table-striped roomList">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">Room 명</th>
            <th scope="col">좌석 수</th>
            <th scope="col">시간단위</th>
            <th scope="col">운영시작시간</th>
            <th scope="col">운영종료시간</th>
            <th scope="col">사용여부</th>
            <th scope="col">삭제여부</th>
            <th scope="col">등록자</th>
            <th scope="col">등록일</th>
            <th scope="col">수정자</th>
            <th scope="col">수정일</th>
            <th scope="col">관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getReserve" :key="item.id">
            <td>{{ item.roomId }}</td>
            <td>{{ item.roomName }}</td>
            <td>{{ item.defaultSeatCount }}</td>
            <td>{{ item.defaultOperUnit }}</td>
            <td>{{ item.defaultOperStartTime }}</td>
            <td>{{ item.defaultOperEndTime }}</td>
            <td>{{ item.useYn }}</td>
            <td>{{ item.delYn }}</td>
            <td>{{ item.createdId }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.updatedId }}</td>
            <td>{{ item.updatedAt }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary btn-success">
                관리
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ul></ul>
    </div>
    <div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="
          (page) => {
            currentPage = page;
            getList(page);
          }
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import Flatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import { useFlatpickr } from "@/composables/useFlatpickr"; // comosable import
import hour from "@/components/reserve/selectHour.vue";
import axios from "axios";
import Modal from "@/components/modal.vue";
import Pagination from "@/components/reserve/Pagination.vue";

const roomName = ref(""); // Room 명
const defaultSeatCount = ref(0); // 좌석 수
const defaultOperUnit = ref(60); // 시간단위
const defaultOperStartTime = ref("00"); // 운영시작시간
const defaultOperEndTime = ref("00"); // 운영종료시간
const roomType = ref("rect"); // Room 배치유형
const useYn = ref("Y"); // 사용여부
const delYn = ref("N");

const { flatpickrOptions } = useFlatpickr(defaultOperUnit.value);

const getReserve = ref([]);
const currentPage = ref(1); // ref로 선언
const pageSize = ref(10); // ref로 선언
const totalPages = ref(0); // ref로 선언

const getList = async () => {
  console.log(currentPage.value, typeof currentPage);
  console.log(pageSize.value, typeof pageSize);
  try {
    const response = await axios.get("/api/getReserveList", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        currentPage: currentPage.value, // ref 값을 .value로 참조
        pageSize: pageSize.value, // ref 값을 .value로 참조
      },
    });
    getReserve.value = response.data.data;
    currentPage.value = response.data.currentPage; // .value 사용해야 함
    totalPages.value = response.data.totalPages; // .value 사용해야 함
  } catch (error) {
    console.error("Error: ", error);
  }
};

// 페이지 최초 호출
getList();

const seats = ref([]);
const isModalOpen = ref(false);

// 좌석 데이터를 생성 (좌석 수에 맞춰 동적으로 생성)
const generateSeats = () => {
  seats.value = [];
  for (let i = 1; i <= defaultSeatCount.value; i++) {
    seats.value.push({ id: i, number: i });
  }
};

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  if (isModalOpen.value) {
    generateSeats();
  }
};

// 저장 버튼 클릭 시 선택된 좌석 저장
const saveSeats = async () => {
  if (!valid()) {
    return false;
  }

  const data = {
    roomName: roomName.value, // 반응형 속성의 값을 사용
    defaultSeatCount: defaultSeatCount.value,
    defaultOperUnit: defaultOperUnit.value,
    defaultOperStartTime: defaultOperStartTime.value,
    defaultOperEndTime: defaultOperEndTime.value,
    roomType: roomType.value,
    useYn: useYn.value,
    delYn: delYn.value,
  };

  try {
    const response = await axios.post("/api/reserve", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toggleModal();

    getReserve.value = [response.data, ...getReserve.value];
    getList(currentPage, pageSize);
  } catch (error) {
    console.error("Error: ", error);
  }
};

const onSeatCountChange = () => {
  let seatCnt = defaultSeatCount.value;
  seatCnt < 0 ? (defaultSeatCount.value = 0) : seatCnt;
  generateSeats();
};

const validMessage = ref({
  roomName: "",
  defaultSeatCount: "",
});

const valid = () => {
  // 초기화
  validMessage.value.roomName = "";
  validMessage.value.defaultSeatCount = "";

  // 검증 로직
  if (roomName.value.trim() === "") {
    validMessage.value.roomName = "Room명을 입력하세요.";
  }

  if (defaultSeatCount.value === 0) {
    validMessage.value.defaultSeatCount = "좌석을 입력하세요.";
  }

  // 유효성 검증 결과 반환
  return Object.values(validMessage.value).every((msg) => msg === "");
};
</script>

<style lang="scss" scoped>
body {
  min-width: 532px;
}
.container {
  margin-top: 20px;
}

.dc {
  text-align: center;
}

/* 좌석 그리드 */
.seat-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  gap: 10px;
  margin-bottom: 20px;
}

.seat-box {
  width: 100%;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.seat-box:hover {
  background-color: #e0e0e0;
}

.seat-box.selected {
  background-color: #007bff;
  color: white;
}

.seat-number {
  font-size: 1.2em;
  font-weight: bold;
}

/* 모달 닫기 버튼 */
.btn-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

/* 기본 테이블 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  table-layout: fixed; /* 고정 너비로 만들기 */
}

th,
th:first-child {
  padding: 12px 15px;
  text-align: center;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

td {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

/* 반응형 처리 */
@media (max-width: 768px) {
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  thead,
  tbody {
    display: block;
  }

  thead {
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  tbody {
    display: block;
    max-height: 400px; /* 최대 높이를 설정하여 스크롤이 생기게 합니다 */
    overflow-y: auto; /* 세로 스크롤 */
    width: 100%;
  }

  th,
  td {
    display: inline-block; /* th와 td를 인라인 블록으로 설정 */
    width: 100%; /* 100% 너비로 고정 */
  }

  th {
    background-color: #e9ecef;
    display: none;
  }

  td {
    display: block;
    text-align: right;
    position: relative;
    padding-left: 50%; /* 좌측에 라벨을 추가할 공간 */
    width: 450px;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    font-weight: bold;
    text-align: left;
  }
}

@media (max-width: 480px) {
  th,
  td {
    font-size: 12px;
    padding: 8px;
  }

  td {
    padding-left: 40%; /* 작은 화면에서 더 많은 공간을 확보 */
  }

  td::before {
    font-size: 12px;
  }
}

.firstDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.roomList td:first-child {
  text-align: center;
}
</style>
