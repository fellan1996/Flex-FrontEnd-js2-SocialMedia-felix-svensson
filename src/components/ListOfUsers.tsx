import React, { useEffect, useState } from 'react';
import db from '../firebase';
import {
    collection,
    getDocs,
} from "@firebase/firestore";

const ListOfUsers: React.FC<{keyProp: number}> = ({keyProp}) => {
    const [usernames, setUsernames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const fetchUserNames = async (): Promise<void> => {
            const docRefUsers = collection(db, "users");
            try {
                const querySnapshot = await getDocs(docRefUsers);
                const usersArr: string[] = [];
                querySnapshot.forEach((doc) => {
                    usersArr.push(doc.id);
                });
                setUsernames(usersArr);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUserNames();
    }, [keyProp]);

    return (
        <div id='users-list'>
            {loading ? <p>Loading...</p> :
                usernames.map((username) => (
                    <a className="user-in-list" key={username}>{username}</a>
                ))
            }
        </div>
    );
};

export default ListOfUsers;
