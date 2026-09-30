import axios from "axios";
import {
    applyJob,
    cancelApplication,
    favoriteJob,
    cancelFavoriteList
} from "../actions";

export default async function JobDetail({ params }) {
    const { id } = await params;

    const response = await axios.get(`http://localhost:3001/jobs/${id}`);

    const job = response.data;

    const applicationResponse = await axios.get(
        'http://localhost:3001/applications'
    );

    const favoriteResponse = await axios.get(
        'http://localhost:3001/favorites'
    );

    const applications = applicationResponse.data;
    const favorites = favoriteResponse.data;

    const application = applications.find(
        (app) => app.jobId === job.id
    );

    const favorite = favorites.find(
        (fav) => fav.jobId === job.id
    );

    return (
        <main className="detail-page">
            <h1>{job.companyName}</h1>
            <h2>{job.title}</h2>
            <p>모집직무: {job.position}</p>
            <p>담당 업무: {job.duties}</p>
            <p>자격 요건: {job.requirements}</p>
            <p>고용형태: {job.employmentType}</p>
            <p>경력: {job.career}</p>
            <p>전화번호: {job.phone ?? '미등록'}</p>
            <p>주소: {job.location}</p>
            <p>사원수: {job.employeeCount}명</p>
            <p>채용 마감일: {job.deadline}</p>
            {favorite ? (
                <form action={cancelFavoriteList.bind(null, favorite.id)}>
                    <button>찜취소</button>
                </form>
            ) : (
                <form action={favoriteJob.bind(null, job.id)}>
                    <button type="submit">찜하기</button>
                </form>
            )}

            {application ? (
                <form action={cancelApplication.bind(null, application.id)}>
                    <button>지원취소</button>
                </form>
            ) : (
                <form action={applyJob.bind(null, job.id)}>
                    <button type="submit">지원하기</button>
                </form>
            )}
        </main>
    );


}