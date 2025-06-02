import Http from "@/services/Api";
import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);

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
				} else {
					throw new Error('Error fetching data');
				}
			})
			.catch(error => { console.log(error); setLoading(false); });
	}, [url]);

	return { data, loading };
}