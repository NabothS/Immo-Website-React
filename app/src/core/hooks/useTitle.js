import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Froooty`;
    }, [title]);
};

export default useTitle;
