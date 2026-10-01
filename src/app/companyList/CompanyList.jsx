'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
    applyJob,
    cancelApplication,
    favoriteJob,
    cancelFavoriteList
} from './actions';

export default function CompanyList({
    initialJobs,
    initialApplications,
    initialFavorites,
    type,
    keyword
}) {

    const jobs = initialJobs;
    const [applications, setApplications] = useState(initialApplications);
    const [favorites, setFavorites] = useState(initialFavorites);


    // 지원
    const handleApply = async (jobId) => {

        const newApplication = await applyJob(jobId);

        setApplications((prev) => [
            ...prev,
            newApplication
        ]);
    };


    // 지원 취소
    const handleCancelApplication = async (applicationId) => {

        await cancelApplication(applicationId);

        setApplications((prev) =>
            prev.filter(
                (app) => app.id !== applicationId
            )
        );
    };


    // 찜
    const handleFavorite = async (jobId) => {

        const newFavorite = await favoriteJob(jobId);

        setFavorites((prev) => [
            ...prev,
            newFavorite
        ]);
    };


    // 찜 취소
    const handleCancelFavorite = async (favoriteId) => {

        await cancelFavoriteList(favoriteId);

        setFavorites((prev) =>
            prev.filter(
                (fav) => fav.id !== favoriteId
            )
        );
    };


    // 검색
    const filteredJobs = jobs.filter((job) => {

        if (!keyword) {
            return true;
        }

        if (type === 'all') {
            return (
                job.companyName.includes(keyword) ||
                job.title.includes(keyword) ||
                job.career.includes(keyword) ||
                job.employmentType.includes(keyword) ||
                job.location.includes(keyword) ||
                job.position.includes(keyword)
            );
        }

        return job[type]?.includes(keyword);
    });


    return (
        <main className="company-page">

            <h1>채용 회사 리스트</h1>

            <form>

                <select
                    name="type"
                    defaultValue={type}
                >
                    <option value="all">
                        전체
                    </option>

                    <option value="companyName">
                        회사명
                    </option>

                    <option value="title">
                        공고명
                    </option>

                    <option value="career">
                        경력
                    </option>

                    <option value="employmentType">
                        고용형태
                    </option>

                    <option value="location">
                        지역
                    </option>

                    <option value="position">
                        모집직무
                    </option>

                </select>


                <input
                    name="keyword"
                    defaultValue={keyword}
                    placeholder="검색어를 입력하세요"
                />


                <button type="submit">
                    검색
                </button>

            </form>


            <table>

                <thead>
                    <tr>
                        <th>회사명</th>
                        <th>공고명</th>
                        <th>지원</th>
                        <th>찜</th>
                    </tr>
                </thead>


                <tbody>

                    {filteredJobs.length === 0 ? (

                        <tr>
                            <td colSpan="4">

                                <div className="empty-state">

                                    <img
                                        src="/empty.jpeg"
                                        alt="검색 결과 없음"
                                    />

                                    <p>
                                        검색 결과가 없습니다.
                                    </p>

                                </div>

                            </td>
                        </tr>

                    ) : (

                        filteredJobs.map((job) => {

                            const application =
                                applications.find(
                                    (app) =>
                                        app.jobId === job.id
                                );


                            const favorite =
                                favorites.find(
                                    (fav) =>
                                        fav.jobId === job.id
                                );


                            return (

                                <tr key={job.id}>

                                    <td>
                                        {job.companyName}
                                    </td>


                                    <td>

                                        <Link
                                            href={`/companyList/${job.id}`}
                                        >
                                            {job.title}
                                        </Link>

                                    </td>


                                    <td>

                                        {application ? (

                                            <form
                                                action={
                                                    handleCancelApplication.bind(
                                                        null,
                                                        application.id
                                                    )
                                                }
                                            >

                                                <button type="submit">
                                                    지원취소
                                                </button>

                                            </form>

                                        ) : (

                                            <form
                                                action={
                                                    handleApply.bind(
                                                        null,
                                                        job.id
                                                    )
                                                }
                                            >

                                                <button type="submit">
                                                    지원
                                                </button>

                                            </form>

                                        )}

                                    </td>


                                    <td>

                                        {favorite ? (

                                            <form
                                                action={
                                                    handleCancelFavorite.bind(
                                                        null,
                                                        favorite.id
                                                    )
                                                }
                                            >

                                                <button type="submit">
                                                    찜취소
                                                </button>

                                            </form>

                                        ) : (

                                            <form
                                                action={
                                                    handleFavorite.bind(
                                                        null,
                                                        job.id
                                                    )
                                                }
                                            >

                                                <button type="submit">
                                                    찜
                                                </button>

                                            </form>

                                        )}

                                    </td>

                                </tr>
                            );
                        })

                    )}

                </tbody>

            </table>

        </main>
    );
}