import { useState } from 'react';

export default function useBusRoute() {
    const [selectedStop, setSelectedStop] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPathLine, setSelectedPathLine] = useState(null);
    const [listRoutes, setListRoutes] = useState([]);

    const [reviewList, setReviewList] = useState([]);
    const [averageReview, setAverageReview] = useState(null);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchReviews = async (routeId) => {
        setReviewLoading(true);
        setReviewError(null);
        try {
            const [listRes, avgRes] = await Promise.all([
                axios.get(route('api.routes.reviews', routeId)),
                axios.get(route('api.routes.average_reviews', routeId)),
            ]);
            setReviewList(listRes.data);
            setAverageReview(avgRes.data);
        } catch (err) {
            setReviewError(err);
        } finally {
            setReviewLoading(false);
        }
    };

    const loadMoreReviews = async () => {
        if (!reviewList?.links?.next) return;
        setIsLoadingMore(true);
        try {
            const res = await axios.get(reviewList.links.next);
            setReviewList((prev) => ({
                ...res.data,
                data: [...prev.data, ...res.data.data],
            }));
        } finally {
            setIsLoadingMore(false);
        }
    };

    return {
        selectedStop,
        setSelectedStop,
        selectedRoute,
        setSelectedRoute,
        selectedVariant,
        setSelectedVariant,
        selectedPathLine,
        setSelectedPathLine,
        listRoutes,
        setListRoutes,
        reviewList,
        setReviewList,
        averageReview,
        setAverageReview,
        reviewLoading,
        setReviewLoading,
        reviewError,
        setReviewError,
        fetchReviews,
        loadMoreReviews,
    };
}
