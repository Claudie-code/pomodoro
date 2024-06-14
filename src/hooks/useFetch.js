import { useEffect, useState } from "react";

const useFetch = (url, dependencies) => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, dependencies);
  return { data, error, loading };
};

export default useFetch;
