'use client';

export default function ConfirmSubmitButton() {
    const handleClick = (e) => {
        if (!window.confirm('이력서를 제출하시겠습니까?')) {
            e.preventDefault();
        }
    };

    return (
        <button type="submit" onClick={handleClick}>
            이력서 제출
        </button>
    );
}