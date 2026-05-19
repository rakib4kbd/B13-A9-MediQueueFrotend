const fetchTutors = async ({ limit }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors?limit=${limit}`,
  );
  const data = await res.json();
  return data;
};

export default fetchTutors;
