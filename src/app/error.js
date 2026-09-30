'use client';

export default function Error({ reset }) {
  return (
    <main>
      <img src="/error.jpeg" alt="오류 발생" />
      <p>데이터를 불러오는 중 오류가 발생했습니다.</p>

      <button onClick={() => reset()}>
        다시 시도
      </button>
    </main>
  );
}