import Http from "@/services/Api";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!url) {
			setLoading(false);
			return;
		}
		Http.get(url)
			.then((res) => {
				setLoading(false);
				if (res.status === 200) {
					setData(res.data.data);
					setError(null);
				} else {
					throw new Error('Error fetching data');
				}
			})
			.catch(error => {
				console.log(error);
				setError(error);
				setLoading(false);
			});
	}, [url]);

	return { data, loading, error };
}
