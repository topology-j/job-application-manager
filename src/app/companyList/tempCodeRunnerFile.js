import axios from 'axios';
import Link from 'next/link';
import { applyJob } from './actions';

export default async function CompanyList() {
  const response = await axios.get('http://localhost:3001/jobs');

  const jobs = response.data;

  return (
    <main>
      <h1>채용 회사 리스트</h1>
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
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.companyName}</td>
              <td>
                <Link href={`/companyList/${job.id}`}>{job.title}</Link></td>
              <td>
                <form action={applyJob.bind(null, job.id)}>
                  <button type="submit">지원</button>
                  </form></td>
              <td><button>찜</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}