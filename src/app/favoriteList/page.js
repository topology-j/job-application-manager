import axios from 'axios';
import Link from 'next/link';

import { cancelFavoriteList, favoriteJob } from '../companyList/actions';

export default async function FavoriteList() {

    const favoriteResponse = await axios.get(
        'http://localhost:3001/favorites'
    );
    const favorites = favoriteResponse.data;

    const jobResponse = await axios.get(
        'http://localhost:3001/jobs'
    );

    const jobs = jobResponse.data;

    const favoriteJobs = jobs.filter((job) =>
        favorites.some((fav) => fav.jobId === job.id)
    );

    return (
        <main className="favorite-page">
            <h1>찜 리스트</h1>

            <table>
                <thead>
                    <tr>
                        <th>회사명</th>
                        <th>공고명</th>
                        <th>찜</th>
                    </tr>
                </thead>

                <tbody>
                    {favoriteJobs.length === 0 ? (
                        <tr>
                            <td colSpan="3">
                                <div className="empty-state">
                                    <img
                                        src="/empty.jpeg"
                                        alt="찜 내역 없음"
                                    />
                                    <p>찜한 채용공고가 없습니다.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        favoriteJobs.map((job) => {

                            const fav = favorites.find(
                                (fav) => fav.jobId === job.id
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
                                        {fav ? (
                                            <form
                                                action={cancelFavoriteList.bind(
                                                    null,
                                                    fav.id
                                                )}
                                            >
                                                <button>
                                                    찜 취소
                                                </button>
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
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </main>
    );
}