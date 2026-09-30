'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// 지원
export async function applyJob(jobId) {

    const response = await axios.post(
        'http://localhost:3001/applications',
        {
            jobId: jobId
        }
    );

    revalidatePath('/companyList');

    return response.data;
}


// 지원 취소
export async function cancelApplication(applicationId) {

    await axios.delete(
        `http://localhost:3001/applications/${applicationId}`
    );

    revalidatePath('/companyList');
    revalidatePath('/applicationList');
}


// 이력서 제출
export async function submitResume(jobId) {

    await axios.post(
        'http://localhost:3001/resumeSubmissions',
        {
            jobId: jobId
        }
    );

    revalidatePath('/companyList');
}


// 이력서 제출 취소
export async function cancelResume(resumeId) {

    await axios.delete(
        `http://localhost:3001/resumeSubmissions/${resumeId}`
    );

    revalidatePath('/applicationList');
    redirect('/applicationList');
}


// 찜
export async function favoriteJob(jobId) {

    const response = await axios.post(
        'http://localhost:3001/favorites',
        {
            jobId: jobId
        }
    );

    revalidatePath('/companyList');
    revalidatePath('/favoriteList');

    return response.data;
}


// 찜 취소
export async function cancelFavoriteList(favoriteId) {

    await axios.delete(
        `http://localhost:3001/favorites/${favoriteId}`
    );

    revalidatePath('/companyList');
    revalidatePath('/favoriteList');
}


// 메모 저장
export async function saveMemo(jobId, formData) {

    const content = formData.get('content');

    if (!content.trim()) {
        return;
    }

    await axios.post(
        'http://localhost:3001/memos',
        {
            jobId: jobId,
            content: content
        }
    );

    revalidatePath('/applicationList');
}


// 메모 수정
export async function updateMemo(memoId, formData) {

    const content = formData.get('content');

    await axios.patch(
        `http://localhost:3001/memos/${memoId}`,
        {
            content: content
        }
    );

    revalidatePath('/applicationList');
}


// 메모 삭제
export async function deleteMemo(memoId) {

    await axios.delete(
        `http://localhost:3001/memos/${memoId}`
    );

    revalidatePath('/applicationList');
}