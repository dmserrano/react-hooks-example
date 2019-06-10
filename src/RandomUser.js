import React, { useEffect, useState } from "react";

const RandomUser = () => {
    const [ isFetching, setIsFetching ] = useState(false);
    const [ randomUser, setRandomUser ] = useState(null);
    const [ randomUserCount, setRandomUserCount ] = useState(0);

    const capitalize = string => {
        const [ firstLetter, ...restOfString ] = string;
        return firstLetter.toUpperCase() + restOfString.join("");
    };

    const getRandomUser = async () => {
        setIsFetching(true);
        const response = await fetch("https://randomuser.me/api/");
        const { results: [ user ] } = await response.json();
        setRandomUser(user);
        setIsFetching(false);
    };

    const handleNewUserClick = () => {
        setRandomUser(null);
        getRandomUser();
    };

    // This useEffect will only run on component mount.
    useEffect(() => {
        getRandomUser();
    }, []);

    // This useEffect hook will fire anytime that the "randomUser" variable changes.
    // This would be the equivalent of "componentDidUpdate"
    useEffect(() => {
        // If the random user has been reset, do not continue.
        if (!randomUser) return;

        setRandomUserCount(prevCount => prevCount + 1);
    }, [ randomUser ]);

    const displayFirstName = () => {
        const { name: { title, first, last }} = randomUser;
        return `${capitalize(title)} ${capitalize(first)} ${capitalize(last)}`;
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <button
                className="btn btn-primary mb-4"
                onClick={handleNewUserClick}
            >
                Get New Random User
            </button>

            {isFetching && <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
            </div>}

            {randomUserCount > 0 && randomUser && <p>{randomUserCount} user(s) have been fetched.</p>}

            {randomUser && <div>
                <p>{displayFirstName()}</p>
            </div>}
        </div>
    );
};

export default RandomUser;