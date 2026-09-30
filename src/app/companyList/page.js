import axios from 'axios';

import CompanyListClient from './CompanyList';

export default async function CompanyList({ searchParams }) {

  const { type = 'all', keyword = '' } = await searchParams;

  const response = await axios.get(
    'http://localhost:3001/jobs'
  );

  const jobs = response.data;

  const applicationResponse = await axios.get(
    'http://localhost:3001/applications'
  );

  const applications = applicationResponse.data;

  const favoritesResponse = await axios.get(
    'http://localhost:3001/favorites'
  );

  const favorites = favoritesResponse.data;

  return (
    <CompanyListClient
      initialJobs={jobs}
      initialApplications={applications}
      initialFavorites={favorites}
      type={type}
      keyword={keyword}
    />
  );
}