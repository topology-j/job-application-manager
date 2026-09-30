import axios from 'axios';
import Link from 'next/link';
import ConfirmSubmitButton from './ConfirmSubmitButton';

import {
    cancelApplication,
    submitResume,
    cancelResume,
    favoriteJob,
    cancelFavoriteList,
    saveMemo,
    updateMemo,
    deleteMemo
} from '../companyList/actions';


export default async function ApplicationList() {

    const applicationResponse = await axios.get(
        'http://localhost:3001/applications'
    );

    const jobResponse = await axios.get(
        'http://localhost:3001/jobs'
    );

    const resumeResponse = await axios.get(
        'http://localhost:3001/resumeSubmissions'
    );

    const favoriteResponse = await axios.get(
        'http://localhost:3001/favorites'
    );

    const memoResponse = await axios.get(
        'http://localhost:3001/memos'
    );

    const applications = applicationResponse.data;
    const jobs = jobResponse.data;
    const resumes = resumeResponse.data;
    const favorites = favoriteResponse.data;
    const memos = memoResponse.data;

    const appliedJobs = jobs.filter((job) =>
        applications.some((app) => app.jobId === job.id)
    );

    return (
        <main className="application-page">
            <h1>지원 리스트</h1>

            <table>
                <thead>
                    <tr>
                        <th>회사명</th>
                        <th>공고명</th>
                        <th>지원</th>
                        <th>찜</th>
                        <th>메모</th>
                        <th>이력서</th>
                    </tr>
                </thead>

                <tbody>
                    {appliedJobs.length === 0 ? (
                        <tr>
                            <td colSpan="6">
                                <div className="empty-state">
                                    <img
                                        src="/empty.jpeg"
                                        alt="지원 내역 없음"
                                    />
                                    <p>지원한 채용공고가 없습니다.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        appliedJobs.map((job) => {

                            const application = applications.find(
                                (app) => app.jobId === job.id
                            );

                            const favorite = favorites.find(
                                (fav) => fav.jobId === job.id
                            );

                            const resume = resumes.find(
                                (res) => res.jobId === job.id
                            );

                            const memo = memos.find(
                                (memo) => memo.jobId === job.id
                            );

                            return (
                                <tr key={job.id}>
                                    <td>{job.companyName}</td>

                                    <td>
                                        <Link href={`/companyList/${job.id}`}>
                                            {job.title}
                                        </Link>
                                    </td>

                                    <td>
                                        <form
                                            action={cancelApplication.bind(
                                                null,
                                                application.id
                                            )}
                                        >
                                            <button>지원취소</button>
                                        </form>
                                    </td>

                                    <td>
                                        {favorite ? (
                                            <form
                                                action={cancelFavoriteList.bind(
                                                    null,
                                                    favorite.id
                                                )}
                                            >
                                                <button>찜취소</button>
                                            </form>
                                        ) : (
                                            <form
                                                action={favoriteJob.bind(
                                                    null,
                                                    job.id
                                                )}
                                            >
                                                <button type="submit">
                                                    찜
                                                </button>
                                            </form>
                                        )}
                                    </td>

                                    <td>
                                        {memo ? (
                                            <>
                                                <form
                                                    action={updateMemo.bind(
                                                        null,
                                                        memo.id
                                                    )}
                                                >
                                                    <textarea
                                                        name="content"
                                                        defaultValue={memo.content}
                                                        style={{ display: "block" }}
                                                    />
                                                    <button type="submit">
                                                        수정
                                                    </button>
                                                </form>

                                                <form
                                                    action={deleteMemo.bind(
                                                        null,
                                                        memo.id
                                                    )}
                                                >
                                                    <button type="submit">
                                                        삭제
                                                    </button>
                                                </form>
                                            </>
                                        ) : (
                                            <form
                                                action={saveMemo.bind(
                                                    null,
                                                    job.id
                                                )}
                                            >
                                                <textarea
                                                    name="content"
                                                    placeholder="메모를 입력하세요"
                                                    style={{ display: "block" }}
                                                />
                                                <button type="submit">
                                                    저장
                                                </button>
                                            </form>
                                        )}
                                    </td>

                                    <td>
                                        {resume ? (
                                            <form
                                                action={cancelResume.bind(
                                                    null,
                                                    resume.id
                                                )}
                                            >
                                                <button>
                                                    이력서 제출 취소
                                                </button>
                                            </form>
                                        ) : (
                                            <form
                                                action={submitResume.bind(
                                                    null,
                                                    job.id
                                                )}
                                            >
                                                <ConfirmSubmitButton />
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